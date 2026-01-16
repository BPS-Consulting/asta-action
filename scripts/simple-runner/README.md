# User Utilities

This directory contains utilities for running ASTA tests via API calls. These scripts are designed for use in both local development and CI/CD deployment pipelines. Both PowerShell and Bash versions are provided to accommodate different environments.  You do not need any other files from this repository to use these scripts.

## Files

### Core Script

#### `run-asta-tests`

The main script that executes ASTA test runs via API calls.

**Parameters:**

-   `RUN_TEMPLATE_ID_OR_NAME` (required) - The run template ID or name to use for the test run
-   `WAIT_FOR_COMPLETION` (optional, default: 10) - Minutes to wait for test completion. Set to 0 to skip waiting
-   `ERROR_THRESHOLDS` (optional) - Hashtable defining error thresholds by severity level. Set to -1 to ignore a level

**Required Environment Variables:**

-   `ASTA_USER_PAT` - Personal access token for ASTA authentication
-   `ASTA_VARIANT_ID` - The ASTA app variant ID to run tests against
-   `ASTA_API_URL` (optional) - The ASTA API URL (defaults to `https://sqabot.ai/api/v2`)

**Example Usage:**

```powershell
powershell -File run-asta-tests.ps1 -RUN_TEMPLATE_ID_OR_NAME "my-template" -WAIT_FOR_COMPLETION 15
```

```bash
bash run-asta-tests.sh "my-template" 15
```

### Template Files

#### `.env-template`

Template for local environment configuration. Copy this file to `.env` and fill in your credentials.  
Must be located in the same directory as `run-asta-tests.ps1`.

**Note:** The `.env` file should not be committed to version control.

#### `run-asta-tests-main-template.ps1`

Template script for orchestrating one or more ASTA test runs. Copy and customize this file for your specific testing needs.

## Notes

-   The user must have access to the specified variant and run template in ASTA
-   When `WAIT_FOR_COMPLETION` is set to 0, the script exits immediately after starting the test run
-   Test results can be viewed in the ASTA platform regardless of wait settings
-   Error thresholds can be customized to control script exit codes based on test results
