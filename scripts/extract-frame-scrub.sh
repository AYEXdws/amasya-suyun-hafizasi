#!/usr/bin/env bash
set -euo pipefail

input="${1:?Usage: scripts/extract-frame-scrub.sh <video.mp4> <output-folder> [fps]}"
output_dir="${2:?Usage: scripts/extract-frame-scrub.sh <video.mp4> <output-folder> [fps]}"
fps="${3:-4}"

rm -rf "$output_dir"
mkdir -p "$output_dir"

ffmpeg -hide_banner -loglevel error -nostdin -y \
  -i "$input" \
  -vf "fps=${fps},scale=1920:-2" \
  -an \
  -q:v 2 \
  "$output_dir/%04d.jpg"

count="$(find "$output_dir" -maxdepth 1 -type f -name '*.jpg' | wc -l | tr -d ' ')"
printf '{"count":%s,"fps":%s,"width":1920,"format":"jpg"}\n' "$count" "$fps" > "$output_dir/manifest.json"
echo "Extracted $count frames to $output_dir"
