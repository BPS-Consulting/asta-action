#!/usr/bin/env bash
# ----------------------------------------------------------------------------
# Description: Starts an ASTA test run via API call. For use in a deployment pipeline.
# Usage: ./run-asta-tests-jq.sh <RUN_TEMPLATE_ID_OR_NAME> [WAIT_FOR_COMPLETION_MINUTES] [ERROR_THRESHOLDS_STRING]
# Dependencies:
#   - bash, curl, jq (auto-installed if missing)
#   - The following environment variables must be set:
#	- ASTA_USER_PAT - The ASTA user personal access token
#	- ASTA_VARIANT_ID - The ASTA app variant ID to run tests against.
#	- ASTA_API_URL - (Optional) The ASTA API URL. See below for default.
# Note: The specified ASTA_USER must have access to the specified variant and run template.
# Author: Business Performance Systems
# Copyright: None. Free to use and share.
# ----------------------------------------------------------------------------

set -euo pipefail

# Inputs
RUN_TEMPLATE_ID_OR_NAME="${1:-}"
WAIT_FOR_COMPLETION_MINUTES="${2:-10}"   # 0 = do not wait
ERROR_THRESHOLDS_STRING="${3:-"0,0,-1,-1,-1"}" # critical, serious, moderate, minor, total; -1 = ignore

# Parse error thresholds into associative array
IFS=',' read -r -a etarray <<< "$ERROR_THRESHOLDS_STRING"

declare -A ERROR_THRESHOLDS=(
	[critical]="${etarray[0]:-0}"
	[serious]="${etarray[1]:-0}"
	[moderate]="${etarray[2]:--1}"
	[minor]="${etarray[3]:--1}"
	[total]="${etarray[4]:--1}"
)

# -----------------------------
# Logging helpers
log()       { echo "$@"; }
log_info()  { echo "[INFO] $@"; }
log_debug() { echo "[DEBUG] $@"; }
error_exit(){ echo "[ERROR] $@" >&2; exit 1; }

# -----------------------------
# Validate inputs (args and env vars)
if [[ -z "$RUN_TEMPLATE_ID_OR_NAME" ]]; then
	log_info "Missing required arguments."
	error_exit "Usage: $0 <RUN_TEMPLATE_ID_OR_NAME> [WAIT_FOR_COMPLETION_MINUTES] [ERROR_THRESHOLDS_STRING]"
fi

if [[ -z "${ASTA_USER_PAT:-}" || -z "${ASTA_VARIANT_ID:-}" ]]; then
  error_exit "Missing required environment variables ASTA_USER_PAT or ASTA_VARIANT_ID."
fi

# -----------------------------
# Ensure jq is installed
if ! command -v jq >/dev/null 2>&1; then
  log_info "jq not found. Attempting to install..."

  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update -y && sudo apt-get install -y jq
  elif command -v yum >/dev/null 2>&1; then
    sudo yum install -y jq
  elif command -v apk >/dev/null 2>&1; then
    apk add --no-cache jq
  else
    error_exit "jq is required but no supported package manager found."
  fi
fi

# -----------------------------
# Config
ASTA_API_URL="https://sqabot.ai/api/v2"
AUTH_HEADER="Authorization: Bearer $ASTA_USER_PAT"
CONTENT_HEADER="Content-Type: application/json"

# -----------------------------
# Start ASTA run
log_info "Starting ASTA test run on variant $ASTA_VARIANT_ID with template $RUN_TEMPLATE_ID_OR_NAME..."

start_response=$(curl -s -X POST \
  -H "$AUTH_HEADER" \
  -H "$CONTENT_HEADER" \
  "$ASTA_API_URL/start/template/$ASTA_VARIANT_ID/$RUN_TEMPLATE_ID_OR_NAME" \
  -d '{}')

RUN_ID=$(echo "$start_response" | jq -r '.runId')
RUN_NUMBER=$(echo "$start_response" | jq -r '.runNumber')

if [[ -z "$RUN_ID" || "$RUN_ID" == "null" ]]; then
  error_exit "Failed to start ASTA run. Response: $start_response"
fi

log_info "Test run number $RUN_NUMBER started (runId=$RUN_ID)"

# -----------------------------
# Wait for completion
if [[ "$WAIT_FOR_COMPLETION_MINUTES" -gt 0 ]]; then
  log_debug "Waiting for test completion..."

  POLL_ATTEMPTS=5
  POLL_INTERVAL=$(( WAIT_FOR_COMPLETION_MINUTES * 60 / POLL_ATTEMPTS ))

  for ((i=1; i<=POLL_ATTEMPTS; i++)); do
    sleep "$POLL_INTERVAL"

    status_response=$(curl -s -H "$AUTH_HEADER" \
      "$ASTA_API_URL/run/$RUN_ID/status/$ASTA_VARIANT_ID")

    status=$(echo "$status_response" | jq -r '.status')
    log_debug "Status check $i/$POLL_ATTEMPTS: $status"

    if [[ "$status" == "stopped" ]]; then
      break
    fi

    if [[ "$i" -eq "$POLL_ATTEMPTS" ]]; then
      error_exit "Max wait time exceeded. Test still running."
    fi
  done
else
  log_info "WAIT_FOR_COMPLETION_MINUTES=0, exiting without waiting."
  exit 0
fi

# -----------------------------
# Process results

# Fetch final status with error counts
status_response=$(curl -s -H "$AUTH_HEADER" \
  "$ASTA_API_URL/run/$RUN_ID/status/$ASTA_VARIANT_ID?includeErrorCount=true")
# log_debug "Final status response: $status_response"

# Extract error counts
declare -A error_counts
for level in critical serious moderate minor total; do
	error_counts[$level]=$(echo "$status_response" | jq -r ".errors.$level // 0")
done

log_debug "Error counts: ${error_counts[*]} (critical, serious, moderate, minor, total)"
log_debug "Error thresholds: ${ERROR_THRESHOLDS[*]} (critical, serious, moderate, minor, total)"

# Compare against thresholds
for level in critical serious moderate minor total; do
	[[ "${ERROR_THRESHOLDS[$level]}" -ge 0 && "${error_counts[$level]}" -gt "${ERROR_THRESHOLDS[$level]}" ]] && \
		error_exit "Test run FAILED: $level errors (${error_counts[$level]}) exceed threshold (${ERROR_THRESHOLDS[$level]})."
done

log "Test run PASSED: no error thresholds exceeded."
exit 0