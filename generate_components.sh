#!/bin/bash
set -e

echo "🎨 Creating all React components..."

# Create directories
mkdir -p src/components
mkdir -p src/app/dashboard
mkdir -p src/app/privacy
mkdir -p src/app/disclosures

# Copy all components from the original repo if they exist
if [ -d "../KustodyFI/src/components" ]; then
  echo "📦 Copying components from original repo..."
  cp -f ../KustodyFI/src/components/*.tsx src/components/ 2>/dev/null || true
fi

if [ -d "../KustodyFI/src/app" ]; then
  echo "📦 Copying pages from original repo..."
  cp -f ../KustodyFI/src/app/page.tsx src/app/ 2>/dev/null || true
  cp -f ../KustodyFI/src/app/dashboard/page.tsx src/app/dashboard/ 2>/dev/null || true
  cp -f ../KustodyFI/src/app/privacy/page.tsx src/app/privacy/ 2>/dev/null || true
  cp -f ../KustodyFI/src/app/disclosures/page.tsx src/app/disclosures/ 2>/dev/null || true
fi

echo "✅ Component copy attempted"

# Check what we have
echo ""
echo "📋 Current components:"
ls -1 src/components/ 2>/dev/null || echo "No components yet"
echo ""
echo "📋 Current pages:"
find src/app -name "page.tsx" 2>/dev/null || echo "No pages yet"

