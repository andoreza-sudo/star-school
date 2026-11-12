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
echo "== contrast + token guard"
node tools/contrast.js | tail -n 1
node tools/contrast.js > /dev/null
# raw hex colours are allowed only in the token file and in files not yet migrated (30-learn, 40-games; see PROGRESS.md)
if grep -nE '#[0-9a-fA-F]{3,8}\b' $(ls src/css/*.css | grep -v -e 00-tokens -e 30-learn -e 40-games); then echo "FAIL: raw hex in migrated CSS"; exit 1; fi
echo "== test.js (named checks; includes the size budget, which lives in tools/test.js)"
node tools/test.js
echo "== smoke.js"
node tools/smoke.js
echo "== a11y.js (P6-01: DESIGN_SYSTEM 10 on the named screens at 380x780 and 1024x600; zero failures)"
node tools/a11y.js
echo "== sizes (bytes; budgets in tools/test.js: index.html warn 1.2 MB / fail 1.5 MB, each part file warn 400 KB / fail 800 KB,"
echo "   data warn 1 MB / fail 2 MB, total warn 2 MB / fail 3.3 MB)"
# the files index.html loads, in its order (A11, A11b): gen.<VER>.js, gen2.<VER>.js, bt.<VER>.js, games.<VER>.js, data.<VER>.js
files=$(grep -o '<script src="[^"]*"' index.html | sed 's/<script src="//; s/"$//')
total=$(wc -c < index.html)
for f in index.html $files sw.js manifest.json icon-192.png icon-512.png; do
  [ -f "$f" ] && printf '%10d  %s\n' "$(wc -c < "$f")" "$f"
done
for f in $files; do total=$(( total + $(wc -c < "$f") )); done
printf '%10d  %s\n' "$total" "total: index.html + $(echo $files | sed 's/ / + /g') (A11, A11b, A11c)"
echo "== check OK"
