#!/bin/bash

# ASTA Action Local Runner
# This script makes it easy to run the ASTA action locally for testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to display usage
usage() {
    cat << EOF
Usage: ./run-local.sh [OPTIONS]

Run ASTA action locally for testing and development.

OPTIONS:
    -p, --pat <token>           Personal Access Token (required)
    -v, --variant <id>          Variant ID to test (required)
    -t, --template <id>         Run template ID (optional if using custom params)
    -c, --custom <file>         Path to custom parameters JSON/YAML file (optional)
    -r, --repository <url>      ASTA repository URL (default: https://sqabot.ai)
    -f, --expect-failure        Expect the test to fail (optional)
    --skip-build                Skip the build step
    --skip-install              Skip dependency installation check
    -h, --help                  Show this help message

EXAMPLES:
    # Using a run template
    ./run-local.sh --pat "your-token" --variant "variant-id" --template "template-id"

    # Using custom parameters from a file
    ./run-local.sh --pat "your-token" --variant "variant-id" --custom params.json

    # Using environment variables (see .env.example)
    ./run-local.sh

    # Interactive mode (prompts for missing values)
    ./run-local.sh

EOF
    exit 0
}

# Default values
SKIP_BUILD=false
SKIP_INSTALL=false
REPOSITORY_URL="https://sqabot.ai"
EXPECT_FAILURE="false"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--pat)
            PAT="$2"
            shift 2
            ;;
        -v|--variant)
            VARIANT_ID="$2"
            shift 2
            ;;
        -t|--template)
            TEMPLATE_ID="$2"
            shift 2
            ;;
        -c|--custom)
            CUSTOM_PARAMS_FILE="$2"
            shift 2
            ;;
        -r|--repository)
            REPOSITORY_URL="$2"
            shift 2
            ;;
        -f|--expect-failure)
            EXPECT_FAILURE="true"
            shift
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-install)
            SKIP_INSTALL=true
            shift
            ;;
        -h|--help)
            usage
            ;;
        *)
            print_error "Unknown option: $1"
            usage
            ;;
    esac
done

# Check for .env file and load it
if [ -f .env.local ]; then
    print_info "Loading environment from .env.local"
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Interactive mode if required values not provided
if [ -z "$PAT" ]; then
    if [ -n "$INPUT_PAT" ]; then
        PAT="$INPUT_PAT"
        print_info "Using PAT from environment"
    else
        read -p "$(echo -e ${BLUE}Enter your ASTA Personal Access Token:${NC} )" PAT
    fi
fi

if [ -z "$VARIANT_ID" ]; then
    if [ -n "$INPUT_VARIANTID" ]; then
        VARIANT_ID="$INPUT_VARIANTID"
        print_info "Using Variant ID from environment"
    else
        read -p "$(echo -e ${BLUE}Enter the Variant ID to test:${NC} )" VARIANT_ID
    fi
fi

# Determine parameters (template ID or custom params)
if [ -z "$TEMPLATE_ID" ] && [ -z "$CUSTOM_PARAMS_FILE" ]; then
    if [ -n "$INPUT_PARAMETERS" ]; then
        PARAMETERS="$INPUT_PARAMETERS"
        print_info "Using parameters from environment"
    else
        echo ""
        print_info "Choose parameter type:"
        echo "  1) Use a run template ID"
        echo "  2) Use custom parameters from a file"
        read -p "$(echo -e ${BLUE}Enter choice [1]:${NC} )" param_choice
        param_choice=${param_choice:-1}
        
        if [ "$param_choice" = "1" ]; then
            read -p "$(echo -e ${BLUE}Enter run template ID:${NC} )" TEMPLATE_ID
            PARAMETERS="$TEMPLATE_ID"
        else
            read -p "$(echo -e ${BLUE}Enter path to custom parameters file:${NC} )" CUSTOM_PARAMS_FILE
            if [ ! -f "$CUSTOM_PARAMS_FILE" ]; then
                print_error "File not found: $CUSTOM_PARAMS_FILE"
                exit 1
            fi
            PARAMETERS=$(cat "$CUSTOM_PARAMS_FILE")
        fi
    fi
elif [ -n "$TEMPLATE_ID" ]; then
    PARAMETERS="$TEMPLATE_ID"
elif [ -n "$CUSTOM_PARAMS_FILE" ]; then
    if [ ! -f "$CUSTOM_PARAMS_FILE" ]; then
        print_error "File not found: $CUSTOM_PARAMS_FILE"
        exit 1
    fi
    PARAMETERS=$(cat "$CUSTOM_PARAMS_FILE")
fi

# Validate required inputs
if [ -z "$PAT" ] || [ -z "$VARIANT_ID" ] || [ -z "$PARAMETERS" ]; then
    print_error "Missing required parameters"
    usage
fi

echo ""
print_info "ASTA Action Local Runner"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check if dependencies are installed
if [ "$SKIP_INSTALL" = false ]; then
    if [ ! -d "node_modules" ]; then
        print_info "Installing dependencies..."
        yarn install
        print_success "Dependencies installed"
    else
        print_success "Dependencies already installed"
    fi
fi

# Build the project
if [ "$SKIP_BUILD" = false ]; then
    if [ ! -f "dist/index.js" ] || [ "src" -nt "dist/index.js" ]; then
        print_info "Building project..."
        yarn build
        print_success "Build complete"
    else
        print_success "Build is up to date"
    fi
fi

# Set environment variables for the action
export INPUT_PAT="$PAT"
export INPUT_VARIANTID="$VARIANT_ID"
export INPUT_PARAMETERS="$PARAMETERS"
export INPUT_REPOSITORYURL="$REPOSITORY_URL"
export INPUT_EXPECTFAILURE="$EXPECT_FAILURE"

echo ""
print_info "Configuration:"
echo "  Variant ID: $VARIANT_ID"
echo "  Repository: $REPOSITORY_URL"
echo "  Expect Failure: $EXPECT_FAILURE"
if [ -n "$TEMPLATE_ID" ]; then
    echo "  Template ID: $TEMPLATE_ID"
elif [ -n "$CUSTOM_PARAMS_FILE" ]; then
    echo "  Custom Params: $CUSTOM_PARAMS_FILE"
fi

echo ""
print_info "Starting ASTA test run..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Run the action
if node dist/index.js; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_success "Test run completed successfully!"
    exit 0
else
    EXIT_CODE=$?
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_error "Test run failed with exit code $EXIT_CODE"
    exit $EXIT_CODE
fi

