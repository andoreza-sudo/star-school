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
echo "== test.js (named checks; includes the size budget, which lives in tools/test.js)"
node tools/test.js
echo "== smoke.js"
node tools/smoke.js
echo "== sizes (bytes)"
for f in index.html sw.js manifest.json icon-192.png icon-512.png; do
  [ -f "$f" ] && printf '%10d  %s\n' "$(wc -c < "$f")" "$f"
done
echo "== check OK"
