# ASTA Action

A GitHub Action for running automated web application tests using the ASTA (Automated Software Testing Assistant) platform.

## Overview

This action allows you to integrate ASTA web application testing into your CI/CD pipeline. It can start test runs, monitor their progress, and report results directly in your GitHub workflows.

## Features

-   🚀 Start automated test runs on your web applications
-   📊 Real-time monitoring of test progress and logs
-   ✅ Automatic pass/fail reporting in GitHub workflows
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

| Output   | Description                        |
| -------- | ---------------------------------- |
| `run-id` | The unique ID of the ASTA test run |

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
                      github.rest.issues.createComment({
                        issue_number: context.issue.number,
                        owner: context.repo.owner,
                        repo: context.repo.repo,
                        body: `🤖 ASTA test run completed: ${runId}`
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

## Running from Console/CLI

### Prerequisites

1. **Node.js**: Version 16 or higher
2. **Dependencies**: Install with `yarn install`
3. **Environment Setup**: Configure required environment variables

### Development Setup

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

### Environment Configuration

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

### Running the Action

```bash
# Run the built action
node dist/index.js
```

### Alternative: Direct Node.js Execution

```bash
# Build and run TypeScript directly
yarn build && node dist/index.js
```

### Console Example with Custom Parameters

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
