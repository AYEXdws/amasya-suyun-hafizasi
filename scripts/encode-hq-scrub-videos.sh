#!/usr/bin/env bash
set -euo pipefail

src_dir="${1:-public/assets/videos}"
force_rebuild="${FORCE_REBUILD:-0}"

find "$src_dir" -maxdepth 1 -type f -name "*.mp4" \
  ! -name "*-scrub-720.mp4" \
  ! -name "*-scrub-1080.mp4" \
  ! -name "*-scrub-hq-1080.mp4" \
  -print0 |
  while IFS= read -r -d "" input; do
    output="${input%.mp4}-scrub-hq-1080.mp4"

    if [[ "$force_rebuild" != "1" && -f "$output" && "$output" -nt "$input" ]]; then
      echo "Skipping $(basename "$output")"
      continue
    fi

    echo "Encoding $(basename "$input") -> $(basename "$output")"
    ffmpeg -hide_banner -loglevel error -nostdin -y \
      -i "$input" \
      -vf "scale=-2:1080" \
      -an \
      -c:v libx264 \
      -preset medium \
      -crf 18 \
      -g 10 \
      -keyint_min 10 \
      -sc_threshold 0 \
      -profile:v high \
      -level 4.2 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      "$output"
  done
