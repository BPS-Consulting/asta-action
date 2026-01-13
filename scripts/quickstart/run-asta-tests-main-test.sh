#!/usr/bin/env bash
# ----------------------------------------------------------------------------
# Script Name: run-asta-tests-main.sh
# Description: Starts one or more ASTA test runs using the run-asta-tests.sh script.
# Usage: ./run-asta-tests-main.sh
# Dependencies:
#   - run-asta-tests.sh (must be in the same directory)
#   - .env file (optional) containing:
#   - ASTA_USER_PAT - An environment variable containing the ASTA user personal access token.
#   - ASTA_VARIANT_ID - An environment variable containing the ASTA app variant ID to run tests against.
#   - ASTA_API_URL - (Optional) An environment variable containing the ASTA API URL. See called script for default.
#	- bash
# Author: Business Performance Systems
# Copyright: None. Free to use and share.
# ----------------------------------------------------------------------------

set -euo pipefail

# Test error thresholds (-1 = ignore)
ERROR_THRESHOLDS="0,0,-1,-1,-1" # critical, serious, moderate, minor, total

# Script directory, which may be different from the current working directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Set PAT and variant ID from .env file if present
# Otherwise, they must be set in the environment before running this script
if [[ -f "${SCRIPT_DIR}/.env" ]]; then
	export $(grep -v '^#' "${SCRIPT_DIR}/.env" | sed 's/[[:space:]]*#.*$//' | xargs)
fi

echo "Calling run-asta-tests.sh to start ASTA test runs..."
${SCRIPT_DIR}/run-asta-tests.sh "Quick%20Test" 1 "${ERROR_THRESHOLDS}"

# Add additional test runs as needed