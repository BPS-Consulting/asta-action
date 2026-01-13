# ----------------------------------------------------------------------------
# Description: Template script for starting one or more ASTA test runs.
#   Intended to be copied and modified as needed, then used in a local or CI/CD environment.
# Usage: powershell -File run-asta-tests-main.ps1
# Dependencies: 
# 	run-asta-tests.ps1 - The script that actually runs the tests.
#	The following environment variables, or a .env file (in the script directory) with their assigments
#	ASTA_USER_PAT - The ASTA user personal access token.
#   ASTA_VARIANT_ID - Thee ASTA app variant ID to run tests against.
#   ASTA_API_URL - (Optional) The ASTA API URL. See called script for default.
#   The specified ASTA_USER must have access to the specified variant and run template.
# Author: Business Performance Systems
# Copyright: None. Free to use and share.
# ----------------------------------------------------------------------------

$ErrorActionPreference = 'Stop' # Stop on errors

# Set PAT and app variant from a .env file or set it directly here for local testing.
# Comment or remove the lines below if running in CI/CD where env variables are already set
Get-Content .env | ForEach-Object {
	if ($_ -match '^([^#][^=]+)=(.*)$') {
		Set-Item -Path "env:$($matches[1].Trim())" -Value $matches[2].Trim()
	}
}

# Call the main script to run the specified test
$testParams = @{
	RunTemplate = "your_run_template_id_or_name_here"
	# Optional parameters.  See run-asta-tests.ps1 for defaults.
	WaitTimeMinutes = wait_time_in_minutes_here
	ErrorThresholds = @{Critical=0; High=0; Medium=5; Low=10}
}
.\run-asta-tests.ps1 @testParams
# Repeat the above lines with different parameters as needed to run other tests