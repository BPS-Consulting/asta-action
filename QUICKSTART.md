# Quick Start Guide - Running ASTA Action Locally

This guide helps you quickly get started with running the ASTA action locally for testing and development.

## 🚀 Super Quick Start (3 Steps)

### Step 1: Clone and Setup

```bash
git clone <repository-url>
cd asta-action
```

### Step 2: Configure Your Credentials

**Option A: Environment File (Recommended)**

```bash
# Copy the example environment file
cp env.example .env.local

# Edit with your actual values
nano .env.local  # or use your favorite editor
```

**Option B: Command Line Arguments**

Skip the `.env.local` file and provide values directly when running.

### Step 3: Run the Action

```bash
# Run with interactive prompts (if .env.local not configured)
./run-local.sh

# Or run with command line arguments
./run-local.sh --pat "your-token" --variant "variant-id" --template "template-id"

# Or run with custom parameters file
./run-local.sh --pat "your-token" --variant "variant-id" --custom example-params.json
```

## 📋 What You Need

Before running, you'll need:

1. **Personal Access Token (PAT)** - Get this from your ASTA profile settings
2. **Variant ID** - The ID or name of your application variant to test
3. **Parameters** - Either:
    - A run template ID (simple), OR
    - A custom parameters JSON/YAML file (advanced)

## 🔧 Configuration Options

### Using Environment Variables

Create a `.env.local` file with:

```bash
INPUT_PAT=your-pat-token-here
INPUT_VARIANTID=your-variant-id-here
INPUT_PARAMETERS=your-template-id-here
INPUT_REPOSITORYURL=https://sqabot.ai  # Optional
INPUT_EXPECTFAILURE=false             # Optional
```

### Using Command Line Arguments

```bash
./run-local.sh \
  --pat "your-token" \
  --variant "variant-id" \
  --template "template-id" \
  --repository "https://sqabot.ai"  # Optional
```

### Using Custom Parameters File

Create a JSON file (or use `example-params.json`):

```json
{
    "name": "My Local Test",
    "path": "https://myapp.com",
    "depth": 3,
    "duration": 300,
    "testableDomains": ["myapp.com"],
    "extensions": {
        "accessibility": true,
        "functional": true
    }
}
```

Then run:

```bash
./run-local.sh --pat "token" --variant "id" --custom my-params.json
```

## 🎯 Common Use Cases

### Test with a Template

```bash
./run-local.sh \
  --pat "abc123..." \
  --variant "my-app-variant" \
  --template "production-smoke-test"
```

### Test with Custom Configuration

```bash
./run-local.sh \
  --pat "abc123..." \
  --variant "my-app-variant" \
  --custom custom-test-config.json
```

### Test on Custom ASTA Instance

```bash
./run-local.sh \
  --pat "abc123..." \
  --variant "my-app" \
  --template "test-123" \
  --repository "https://custom-asta.company.com"
```

### Run Without Building (for faster iterations)

```bash
./run-local.sh --skip-build --pat "token" --variant "id" --template "template"
```

## 💡 Tips

1. **First Run**: The script will automatically:

    - Check Node.js version (requires 16+)
    - Install dependencies if needed
    - Build the project if needed
    - Run the test

2. **Subsequent Runs**: Use `--skip-build` if you haven't changed the code:

    ```bash
    ./run-local.sh --skip-build
    ```

3. **Interactive Mode**: Just run `./run-local.sh` without arguments to be prompted for required values

4. **Security**: Never commit `.env.local` - it's already in `.gitignore`

5. **Example File**: Use `example-params.json` as a starting point for custom configurations

## 🔍 Troubleshooting

### Script Permission Error

```bash
chmod +x run-local.sh
```

### Node.js Version Error

Ensure you have Node.js 16 or higher:

```bash
node -v  # Should show v16.x.x or higher
```

### Missing Dependencies

```bash
yarn install
```

### Build Errors

```bash
yarn build
```

## 📚 More Information

For detailed documentation, see the main [README.md](README.md)

For help with the script:

```bash
./run-local.sh --help
```
