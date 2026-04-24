#!/usr/bin/env bash
set -e

if [ -f "$(dirname "$0")/../.env" ]; then
  export $(grep -v '^#' "$(dirname "$0")/../.env" | xargs)
fi

if [ -z "$SHOPIFY_STORE" ] || [ -z "$DEBUG_THEME_ID" ]; then
  echo "ERROR: Set SHOPIFY_STORE and DEBUG_THEME_ID in your .env file"
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "Debug" ]; then
  echo "WARNING: You are on branch '$BRANCH', not 'Debug'."
  read -p "Deploy anyway? (yes/no): " confirm
  if [ "$confirm" != "yes" ]; then
    echo "Aborted. Switch to Debug branch first: git checkout Debug"
    exit 0
  fi
fi

echo "Deploying to Debug theme ($DEBUG_THEME_ID) on $SHOPIFY_STORE..."
shopify theme push \
  --store="$SHOPIFY_STORE" \
  --password="$SHOPIFY_PASSWORD" \
  --theme="$DEBUG_THEME_ID"

echo "Done! Preview: https://$SHOPIFY_STORE?preview_theme_id=$DEBUG_THEME_ID"
