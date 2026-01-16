# ASTA Action

A GitHub Action for running automated web application tests using the ASTA (Automated Software Testing Assistant) platform.

## Overview

This action allows you to integrate ASTA web application testing into your CI/CD pipeline. It can start test runs, monitor their progress, and report results directly in your GitHub workflows.

**Note**: This action is full featured and flexible.  If you just want a script to run ASTA tests from the command line, see the scripts in the `scripts/simple-runner` folder.

## Features

-   🚀 Start automated test runs on your web applications
-   📊 Real-time monitoring of test progress and logs
-   ✅ Automatic pass/fail reporting in GitHub workflows
-   🎯 **Detailed error reporting by impact level** (critical, serious, moderate, minor)
-   🔗 Direct links to detailed test results in the ASTA companion app
-   🛠️ Flexible configuration with run templates or custom parameters
-   📋 Support for both simple and complex test configurations

## Quick Start

### Basic Usage

```yaml
name: ASTA Web Tests
on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - name: Run ASTA Tests
              uses: your-org/asta-action@v1
              with:
                  pat: ${{ secrets.ASTA_PAT }}
                  variantId: 'your-variant-id'
                  parameters: 'your-run-template-id'
```

## Inputs

| Input           | Description                                               | Required | Default             |
| --------------- | --------------------------------------------------------- | -------- | ------------------- |
| `pat`           | Personal Access Token for ASTA authentication             | ✅ Yes   | -                   |
| `variantId`     | The ID or name of the application variant to test         | ✅ Yes   | -                   |
| `parameters`    | Run template ID (string) or custom parameters (YAML/JSON) | ✅ Yes   | -                   |
| `repositoryUrl` | ASTA repository base URL                                  | ❌ No    | `https://sqabot.ai` |
| `expectFailure` | Set to `true` if the test is expected to fail             | ❌ No    | `false`             |

## Outputs

| Output   | Description                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `run-id` | The unique ID of the ASTA test run                                                                                          |
| `errors` | JSON object containing error counts by impact level: `{"total": 5, "critical": 1, "serious": 2, "moderate": 1, "minor": 1}` |

## Configuration Options

### Option 1: Using a Run Template (Recommended)

The simplest way to configure tests is using an existing run template:

```yaml
- name: Run ASTA Tests
  uses: your-org/asta-action@v1
  with:
      pat: ${{ secrets.ASTA_PAT }}
      variantId: 'my-app-variant'
      parameters: 'my-run-template-id'
```

### Option 2: Custom Parameters (YAML)

For more control, you can specify custom test parameters in YAML format:

```yaml
- name: Run Custom ASTA Tests
  uses: your-org/asta-action@v1
  with:
      pat: ${{ secrets.ASTA_PAT }}
      variantId: 'my-app-variant'
      parameters: |
          name: "Custom Test Run"
          path: "https://myapp.com"
          depth: 3
          duration: 300
          testableDomains:
            - myapp.com
            - api.myapp.com
          extensions:
            accessibility: true
            functional: true
            performance: false
          assets:
            rules: []
            data: []
            activities: []
          workQueue: []
```

### Option 3: Custom Parameters (JSON)

You can also use JSON format for parameters:

```yaml
- name: Run ASTA Tests with JSON Config
  uses: your-org/asta-action@v1
  with:
      pat: ${{ secrets.ASTA_PAT }}
      variantId: 'my-app-variant'
      parameters: |
          {
            "name": "JSON Test Run",
            "path": "https://myapp.com",
            "depth": 2,
            "duration": 180,
            "testableDomains": ["myapp.com"],
            "extensions": {
              "accessibility": true,
              "functional": true
            }
          }
```

## Environment Variables

You can also configure the action using environment variables:

-   `ASTA_REPOSITORY_URL`: Alternative to `repositoryUrl` input
-   `ASTA_EXPECT_FAILURE`: Alternative to `expectFailure` input

## Complete Workflow Examples

### Basic Workflow

```yaml
name: ASTA Tests
on:
    push:
        branches: [main, develop]
    pull_request:
        branches: [main]

jobs:
    asta-tests:
        name: Run ASTA Web Tests
        runs-on: ubuntu-latest

        steps:
            - name: Run ASTA Tests
              uses: your-org/asta-action@v1
              with:
                  pat: ${{ secrets.ASTA_PAT }}
                  variantId: ${{ vars.ASTA_VARIANT_ID }}
                  parameters: ${{ vars.ASTA_TEMPLATE_ID }}

            - name: Comment PR with Results
              if: github.event_name == 'pull_request'
              uses: actions/github-script@v6
              with:
                  script: |
                      const runId = '${{ steps.asta-tests.outputs.run-id }}';
                      const errors = JSON.parse('${{ steps.asta-tests.outputs.errors }}');

                      let body = `🤖 ASTA test run completed: ${runId}\n\n`;
                      if (errors.total > 0) {
                        body += `❌ **${errors.total} errors found:**\n`;
                        if (errors.critical > 0) body += `- 🔴 Critical: ${errors.critical}\n`;
                        if (errors.serious > 0) body += `- 🟠 Serious: ${errors.serious}\n`;
                        if (errors.moderate > 0) body += `- 🟡 Moderate: ${errors.moderate}\n`;
                        if (errors.minor > 0) body += `- 🔵 Minor: ${errors.minor}\n`;
                      } else {
                        body += `✅ No errors found!`;
                      }

                      github.rest.issues.createComment({
                        issue_number: context.issue.number,
                        owner: context.repo.owner,
                        repo: context.repo.repo,
                        body: body
                      });
```

### Advanced Workflow with Multiple Environments

```yaml
name: ASTA Multi-Environment Tests
on:
    workflow_dispatch:
        inputs:
            environment:
                description: 'Environment to test'
                required: true
                default: 'staging'
                type: choice
                options:
                    - staging
                    - production

jobs:
    test-staging:
        if: github.event.inputs.environment == 'staging'
        runs-on: ubuntu-latest
        steps:
            - name: Test Staging Environment
              uses: your-org/asta-action@v1
              with:
                  pat: ${{ secrets.ASTA_PAT }}
                  variantId: ${{ vars.STAGING_VARIANT_ID }}
                  parameters: |
                      name: "Staging Environment Test"
                      path: "https://staging.myapp.com"
                      depth: 3
                      duration: 600
                      testableDomains:
                        - staging.myapp.com
                      extensions:
                        accessibility: true
                        functional: true
                        performance: true

    test-production:
        if: github.event.inputs.environment == 'production'
        runs-on: ubuntu-latest
        steps:
            - name: Test Production Environment
              uses: your-org/asta-action@v1
              with:
                  pat: ${{ secrets.ASTA_PAT }}
                  variantId: ${{ vars.PRODUCTION_VARIANT_ID }}
                  parameters: |
                      name: "Production Smoke Test"
                      path: "https://myapp.com"
                      depth: 1
                      duration: 300
                      testableDomains:
                        - myapp.com
                      extensions:
                        functional: true
```

## Error Reporting and Impact Levels

The ASTA Action provides detailed error reporting with impact level categorization. This helps teams prioritize fixes based on the severity of issues found during testing.

### Impact Levels

Errors are categorized into four impact levels:

-   **🔴 Critical**: Severe issues that prevent core functionality or create major accessibility barriers
-   **🟠 Serious**: Significant problems that impact user experience or accessibility
-   **🟡 Moderate**: Noticeable issues that should be addressed but don't prevent basic functionality
-   **🔵 Minor**: Small improvements or minor accessibility enhancements

### Console Output

During test execution, you'll see error counts logged to the console:

```
Error counts by impact: critical 2, serious 5, moderate 1, minor 3
```

### Using Error Outputs in Workflows

You can use the error count outputs to create conditional logic in your workflows:

```yaml
- name: Run ASTA Tests
  id: asta-tests
  uses: your-org/asta-action@v1
  with:
      pat: ${{ secrets.ASTA_PAT }}
      variantId: ${{ vars.ASTA_VARIANT_ID }}
      parameters: ${{ vars.ASTA_TEMPLATE_ID }}

- name: Check Critical Errors
  if: fromJson(steps.asta-tests.outputs.errors).critical > 0
  run: |
      echo "❌ Found ${{ fromJson(steps.asta-tests.outputs.errors).critical }} critical errors!"
      echo "This requires immediate attention before deployment."
      exit 1

- name: Report Error Summary
  run: |
      echo "📊 Test Results Summary:"
      echo "Total Errors: ${{ fromJson(steps.asta-tests.outputs.errors).total }}"
      echo "Critical: ${{ fromJson(steps.asta-tests.outputs.errors).critical }}"
      echo "Serious: ${{ fromJson(steps.asta-tests.outputs.errors).serious }}"
      echo "Moderate: ${{ fromJson(steps.asta-tests.outputs.errors).moderate }}"
      echo "Minor: ${{ fromJson(steps.asta-tests.outputs.errors).minor }}"

- name: Create Quality Gate
  if: fromJson(steps.asta-tests.outputs.errors).critical > 0 || fromJson(steps.asta-tests.outputs.errors).serious > 10
  run: |
      echo "Quality gate failed: Too many high-impact errors"
      exit 1
```

### Slack/Teams Integration Example

```yaml
- name: Send Results to Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
      status: ${{ job.status }}
      custom_payload: |
          {
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "🤖 ASTA Test Results for `${{ github.repository }}`"
                }
              },
              {
                "type": "section",
                "fields": [
                  {
                    "type": "mrkdwn",
                    "text": "*Total Errors:* ${{ fromJson(steps.asta-tests.outputs.errors).total }}"
                  },
                  {
                    "type": "mrkdwn", 
                    "text": "*Critical:* ${{ fromJson(steps.asta-tests.outputs.errors).critical }}"
                  },
                  {
                    "type": "mrkdwn",
                    "text": "*Serious:* ${{ fromJson(steps.asta-tests.outputs.errors).serious }}"
                  },
                  {
                    "type": "mrkdwn",
                    "text": "*Moderate:* ${{ fromJson(steps.asta-tests.outputs.errors).moderate }}"
                  }
                ]
              }
            ]
          }
  env:
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Running from Console/CLI

### Quick Start (Automated)

The easiest way to run the action locally is using the provided `run-local.sh` script:

```bash
# Clone the repository
git clone <repository-url>
cd asta-action

# Make the script executable (if not already)
chmod +x run-local.sh

# Run in interactive mode (prompts for inputs)
./run-local.sh

# Or provide all parameters via command line
./run-local.sh --pat "your-token" --variant "variant-id" --template "template-id"

# Or use a custom parameters file
./run-local.sh --pat "your-token" --variant "variant-id" --custom example-params.json
```

#### Using Environment Variables

Create a `.env.local` file from the example:

```bash
# Copy the example file
cp env.example .env.local

# Edit with your values
nano .env.local
```

Then run without parameters:

```bash
./run-local.sh
```

#### Script Options

```
Usage: ./run-local.sh [OPTIONS]

OPTIONS:
    -p, --pat <token>           Personal Access Token (required)
    -v, --variant <id>          Variant ID to test (required)
    -t, --template <id>         Run template ID (optional)
    -c, --custom <file>         Path to custom parameters file (optional)
    -r, --repository <url>      ASTA repository URL (default: https://sqabot.ai)
    -f, --expect-failure        Expect the test to fail
    --skip-build                Skip the build step
    --skip-install              Skip dependency installation check
    -h, --help                  Show help message
```

### Manual Setup (Advanced)

#### Prerequisites

1. **Node.js**: Version 16 or higher
2. **Dependencies**: Install with `yarn install`
3. **Environment Setup**: Configure required environment variables

#### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd asta-action

# Install dependencies
yarn install

# Build the project
yarn build

# Run tests
yarn test
```

#### Environment Configuration

Set up the required environment variables:

```bash
# Set your Personal Access Token
export INPUT_PAT="your-asta-pat-token"

# Set the variant ID to test
export INPUT_VARIANTID="your-variant-id"

# Set parameters (template ID or JSON/YAML)
export INPUT_PARAMETERS="your-template-id"

# Optional: Set custom repository URL
export INPUT_REPOSITORYURL="https://your-custom-asta-instance.com"

# Optional: Expect test failure
export INPUT_EXPECTFAILURE="false"
```

#### Running the Action

```bash
# Run the built action
node dist/index.js
```

#### Alternative: Direct Node.js Execution

```bash
# Build and run TypeScript directly
yarn build && node dist/index.js
```

#### Console Example with Custom Parameters

```bash
#!/bin/bash

# Set environment variables
export INPUT_PAT="your-pat-token"
export INPUT_VARIANTID="my-variant-123"
export INPUT_PARAMETERS='{
  "name": "Console Test Run",
  "path": "https://example.com",
  "depth": 2,
  "duration": 300,
  "testableDomains": ["example.com"],
  "extensions": {
    "accessibility": true,
    "functional": true
  },
  "assets": {
    "rules": [],
    "data": [],
    "activities": []
  },
  "workQueue": []
}'

# Run the action
node dist/index.js
```

## Authentication

### Setting up Personal Access Token (PAT)

1. Go to your ASTA profile
2. Scroll to "Personal Access Tokens"
3. Create a new token
4. Copy the token value

### Storing PAT in GitHub

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add a new repository secret named `ASTA_PAT`
4. Paste your PAT value

## Parameter Reference

### Core Parameters

| Parameter         | Type   | Description                     | Default |
| ----------------- | ------ | ------------------------------- | ------- |
| `name`            | string | Name for the test run           | -       |
| `path`            | string | Starting URL for the test       | -       |
| `depth`           | number | Maximum crawl depth             | 3       |
| `duration`        | number | Maximum test duration (seconds) | -       |
| `testableDomains` | array  | Domains allowed for testing     | -       |

### Extension Options

| Extension       | Description             |
| --------------- | ----------------------- |
| `accessibility` | Run accessibility tests |
| `functional`    | Run functional tests    |
| `performance`   | Run performance tests   |
| `brokenLinks`   | Check for broken links  |
| `resources`     | Test resource loading   |

### Advanced Options

| Parameter             | Type    | Description                       | Default |
| --------------------- | ------- | --------------------------------- | ------- |
| `stopAfterFlows`      | boolean | Stop testing after flows complete | false   |
| `fastTestTables`      | boolean | Use fast table testing mode       | false   |
| `stopOnFlowError`     | boolean | Stop on first flow error          | false   |
| `enableModeling`      | boolean | Enable application modeling       | true    |
| `pageLoadTimeout`     | number  | Page load timeout (ms)            | 3000    |
| `actionRetryAttempts` | number  | Number of retry attempts          | 1       |

## Troubleshooting

### Common Issues

**Authentication Failed**

-   Verify your PAT is correct and has necessary permissions
-   Check that the PAT hasn't expired
-   Ensure the PAT is properly stored in GitHub secrets

**Variant Not Found**

-   Verify the variant ID exists in your ASTA account
-   Check that you have access to the specified variant

**Invalid Parameters**

-   Validate your YAML/JSON syntax
-   Ensure all required fields are provided
-   Check parameter types match expected values

**Network Issues**

-   Verify the repository URL is accessible
-   Check for firewall or proxy restrictions

### Getting Help

-   Check the [ASTA Documentation](https://docs.sqabot.ai)
-   Review test logs in the ASTA companion app
-   Contact support for assistance with specific issues

## License

See [LICENSE.md](LICENSE.md) for details.
