#!/usr/bin/env bash
set -euo pipefail

src_dir="${1:-public/assets/videos}"

find "$src_dir" -maxdepth 1 -type f -name "*.mp4" \
  ! -name "*-scrub-720.mp4" \
  ! -name "*-scrub-1080.mp4" \
  ! -name "*-mobile.mp4" \
  -print0 |
  while IFS= read -r -d "" input; do
    output="${input%.mp4}-mobile.mp4"

    if [[ -f "$output" && "$output" -nt "$input" ]]; then
      echo "Skipping $(basename "$output")"
      continue
    fi

    echo "Encoding $(basename "$input") -> $(basename "$output")"
    ffmpeg -hide_banner -loglevel error -nostdin -y \
      -i "$input" \
      -vf "scale=-2:1920,crop=1080:1920" \
      -an \
      -c:v libx264 \
      -preset veryfast \
      -crf 25 \
      -g 15 \
      -keyint_min 15 \
      -sc_threshold 0 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      "$output"
  done
