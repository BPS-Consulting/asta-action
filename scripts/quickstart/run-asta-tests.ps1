# ----------------------------------------------------------------------------
# Description: Starts an ASTA test run via API call. For use in a deployment pipeline.
# Usage: powershell -File run-asta-tests.ps1 -RUN_TEMPLATE_ID_OR_NAME <template_id_or_name> [-WAIT_FOR_COMPLETION <minutes>] [-ERROR_THRESHOLDS <hashtable>]
# Dependencies: 
#	env:ASTA_USER_PAT - The ASTA user personal access token
#	env:ASTA_VARIANT_ID - The ASTA app variant ID to run tests against.
#	env:ASTA_API_URL - (Optional) The ASTA API URL. See below for default.
# Note: The specified ASTA_USER must have access to the specified variant and run template.
# Author: Business Performance Systems
# Copyright: None. Free to use and share.
# ----------------------------------------------------------------------------

param(
    [Parameter(Mandatory = $true)]
    [string]$RUN_TEMPLATE_ID_OR_NAME,	# The run template ID or name to use for the test run
    [Parameter()]
    [int]$WAIT_FOR_COMPLETION = 10,		# Minutes to wait for test completion. Set to 0 to not wait.
    [Parameter()]
    [hashtable]$ERROR_THRESHOLDS = @{	# Error thresholds. Set to -1 to ignore a level.
        "critical" = 0
        "serious"  = 0
        "moderate" = -1
        "minor"    = -1
        "total"    = -1
    }
)

$ErrorActionPreference = 'Stop' # Stop on errors
$InformationPreference = 'Continue' # Enable information messages
$DebugPreference = 'Continue' # Enable debug messages

# --------------------------------------------
# Helper Functions
function Log($msg) {Write-Host $msg}
function LogInfo($msg) {Write-Information "INFO: $msg"}
function LogDebug($msg) { Write-Debug "$msg" }
function ErrorExit($msg) {
    Write-Error "$msg"    
    exit 1
}

# --------------------------------------------
# Validate environment variables
if ([string]::IsNullOrEmpty($env:ASTA_USER_PAT)) {
    ErrorExit "The ASTA_USER_PAT environment variable is not set. Please configure it in your CI/CD environment."
}
if ([string]::IsNullOrEmpty($env:ASTA_VARIANT_ID)) {
    ErrorExit "The ASTA_VARIANT_ID environment variable is not set. Please configure it in your CI/CD environment."
}
if ([string]::IsNullOrEmpty($env:ASTA_API_URL)) {
	$env:ASTA_API_URL = "https://sqabot.ai/api/v2"	
	LogDebug "env:ASTA_API_URL not set. Using default: $env:ASTA_API_URL"
}

# --------------------------------------------
# Configuration

$headers = @{
    "Authorization" = "Bearer $env:ASTA_USER_PAT"
    "Content-Type"  = "application/json"
}

# --------------------------------------------
# Start the test run and wait for completion (if applicable).  

LogInfo "Starting ASTA test run on variant $env:ASTA_VARIANT_ID with template ${RUN_TEMPLATE_ID_OR_NAME}..."

$startResponse = Invoke-RestMethod `
    -Uri "$env:ASTA_API_URL/start/template/$env:ASTA_VARIANT_ID/$RUN_TEMPLATE_ID_OR_NAME" `
    -Method POST `
    -Headers $headers `
    -Body "{}"

LogInfo "Test run number $($startResponse.runNumber) started"

if ($WAIT_FOR_COMPLETION -gt 0) {
    LogDebug "Waiting for test completion..."

    $POLL_ATTEMPTS = 5  # Number of polling attempts
    $POLL_INTERVAL = $WAIT_FOR_COMPLETION * 60 / $POLL_ATTEMPTS  # seconds

    for ($i = 1; $i -le $POLL_ATTEMPTS; $i++) {
        Start-Sleep -Seconds $POLL_INTERVAL
        $statusResponse = Invoke-RestMethod `
            -Uri "$env:ASTA_API_URL/run/$($startResponse.runId)/status/$env:ASTA_VARIANT_ID" `
            -Headers $headers
		LogDebug "Status check $i of ${POLL_ATTEMPTS}: Test run status is '$($statusResponse.status)'."
        
		if ($statusResponse.status -eq "stopped") {
            break
        }
        if ($i -eq $POLL_ATTEMPTS) {
            ErrorExit "Max wait time exceeded.  Exiting script, but test is still running."
        }
    }
    
    # Get error counts and exit with error if any thresholds are exceeded
    $statusResponse = Invoke-RestMethod `
        -Uri "$env:ASTA_API_URL/run/$($startResponse.runId)/status/$($env:ASTA_VARIANT_ID)?includeErrorCount=true" `
        -Headers $headers
    LogDebug "Test run $($statusResponse.runNumber) completed with $($statusResponse.errors.total) errors."
    
    
    if ($statusResponse.errors.total -ne 0) {
        LogDebug "Error counts: $($statusResponse.errors).  See ASTA log for details."
        
        foreach ($level in $ERROR_THRESHOLDS.Keys) {
            $threshold = $ERROR_THRESHOLDS[$level]
            if ($threshold -ge 0) {
                if ($statusResponse.errors.$level -gt $threshold) {
                    ErrorExit "Test run FAILED: one or more error thresholds exceeded."
                }
            }
        }
    }
    Log "Test run PASSED: no error thresholds exceeded."
    exit 0
    
} else {
    # --------------------------------------------
    # Explicit message when not waiting for completion
    LogInfo "Script exiting without waiting for test run completion: see ASTA run log for results."
    exit 0
}
