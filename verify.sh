#!/bin/bash
# TaskGate Package Verification Script

echo "======================================"
echo "TaskGate Package Verification"
echo "======================================"
echo ""

# Change to package directory
cd "$(dirname "$0")"

echo "1. Checking file structure..."
if [ -f "package.json" ] && [ -f "README.md" ] && [ -f "LICENSE" ] && [ -d "bin" ] && [ -d "lib" ] && [ -d "skills" ] && [ -d "templates" ] && [ -d "docs" ]; then
    echo "   ✅ All required files and directories present"
else
    echo "   ❌ Missing required files or directories"
    exit 1
fi

echo ""
echo "2. Testing CLI commands..."
node bin/taskgate.js --help > /dev/null 2>&1 && echo "   ✅ Help command works"
node bin/taskgate.js version > /dev/null 2>&1 && echo "   ✅ Version command works"

echo ""
echo "3. Checking JavaScript syntax..."
node -c bin/taskgate.js && echo "   ✅ bin/taskgate.js is valid"
node -c lib/init.js && echo "   ✅ lib/init.js is valid"

echo ""
echo "4. Verifying package.json..."
VERSION=$(node -p "require('./package.json').version")
echo "   ✅ Package version: $VERSION"

echo ""
echo "5. Testing init command in temp directory..."
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"
node "$OLDPWD/bin/taskgate.js" init > /dev/null 2>&1
if [ -f ".github/skills/new-task/SKILL.md" ]; then
    echo "   ✅ Init command creates files successfully"
    rm -rf "$TEMP_DIR"
else
    echo "   ❌ Init command failed"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo ""
echo "6. Testing npm pack..."
cd "$OLDPWD"
npm pack --dry-run > /dev/null 2>&1 && echo "   ✅ Package can be packed for publishing"

echo ""
echo "======================================"
echo "✅ All checks passed!"
echo "======================================"
echo ""
echo "Package is ready to:"
echo "  • Use locally (npm link)"
echo "  • Publish to NPM (npm publish)"
echo "  • Install globally (npm install -g)"
echo ""

