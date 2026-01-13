# ----------------------------------------------------------------------------
# Description: Test script to start an short ASTA test run for development verification.
# Usage: powershell -File run-asta-tests-main-test.ps1
# Dependencies: 
# 	run-asta-tests.ps1 - The script that actually runs the tests.
# Author: Business Performance Systems
# Copyright: None. Free to use and share.
# ----------------------------------------------------------------------------

$ErrorActionPreference = 'Stop' # Stop on errors

# Get user PAT and app variant from a .env file or set it directly here for local testing.
Get-Content .env | ForEach-Object {
	if ($_ -match '^([^#][^=]+)=([^#\s]+)') {
		Set-Item -Path "env:$($matches[1].Trim())" -Value $matches[2].Trim()
	}
}

# Now call the main script to run the tests
.\run-asta-tests.ps1 "Quick%20Test" 1
