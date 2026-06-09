#!/usr/bin/env bash
set -euo pipefail

bucket="${1:-}"
prefix="${2:-assets}"
cache_control="public, max-age=31536000, immutable"

if [[ -z "$bucket" ]]; then
  echo "Usage: scripts/upload-media-r2.sh <r2-bucket-name> [prefix]"
  echo "Example: scripts/upload-media-r2.sh amasya-media assets"
  exit 1
fi

for type in images videos sounds; do
  dir="public/assets/$type"
  [[ -d "$dir" ]] || continue

  find "$dir" -type f ! -name ".gitkeep" ! -name ".DS_Store" ! -name "*.mov" -print0 |
    while IFS= read -r -d "" file; do
      name="$(basename "$file")"
      key="$prefix/$type/$name"
      mime="$(file --mime-type -b "$file")"

      echo "Uploading $key"
      npx wrangler r2 object put "$bucket/$key" \
        --remote \
        --file "$file" \
        --content-type "$mime" \
        --cache-control "$cache_control"
    done
done
