#!/usr/bin/env bash
# One command to check a release: build, generator tests, smoke bot, sizes.
# Run from anywhere: bash tools/check.sh
set -euo pipefail
cd "$(dirname "$0")/.."
if [ ! -d tools/node_modules/playwright-core ]; then
  echo "== installing playwright-core (no browser download)"
  (cd tools && npm install --no-audit --no-fund)
fi
echo "== build"
python3 tools/build.py > /dev/null
echo "== test.js"
node tools/test.js | tail -n +1 | head -n 1
node tools/test.js > /dev/null
echo "== smoke.js"
node tools/smoke.js
echo "== sizes (bytes)"
for f in src/src.html index.html sw.js manifest.json icon-192.png icon-512.png; do
  [ -f "$f" ] && printf '%10d  %s\n' "$(wc -c < "$f")" "$f"
done
size=$(wc -c < index.html)
if [ "$size" -gt 1500000 ]; then echo "FAIL: index.html over 1.5 MB"; exit 1; fi
if [ "$size" -gt 1200000 ]; then echo "WARN: index.html over 1.2 MB"; fi
echo "== check OK"
