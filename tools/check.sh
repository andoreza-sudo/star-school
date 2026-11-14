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
echo "== perf.js (P6-02: 6x CPU throttle, best of 3 runs; fails only when start to interactive is over 2.5 s)"
node tools/perf.js
echo "== sizes (bytes; budgets in tools/test.js: index.html warn 1.2 MB / fail 1.5 MB, each part file warn 400 KB / fail 800 KB,"
echo "   data warn 1 MB / fail 2 MB, loaded at start warn 2 MB / fail 3.0 MB, precached (every file) fail 3.6 MB)"
# the files index.html loads at start, in its order (A11, A11b, A11c): gen.<VER>.js, gen2.<VER>.js, bt.<VER>.js, data.<VER>.js;
# P6-02: games.<VER>.js and games2.<VER>.js load on demand (the Game Room) and are precached by sw.js
files=$(grep -o '<script src="[^"]*"' index.html | sed 's/<script src="//; s/"$//')
lazy=$(grep -o "'\./[a-z0-9]*\.v[0-9]*\.js'" sw.js | tr -d "'" | sed 's#^\./##' | grep -v -x -F "$files" || true)
total=$(wc -c < index.html)
for f in index.html $files $lazy sw.js manifest.json icon-192.png icon-512.png; do
  [ -f "$f" ] && printf '%10d  %s\n' "$(wc -c < "$f")" "$f"
done
for f in $files; do total=$(( total + $(wc -c < "$f") )); done
printf '%10d  %s\n' "$total" "loaded at start: index.html + $(echo $files | sed 's/ / + /g') (A11, A11b, A11c, P6-02)"
cache=$total
for f in $lazy; do cache=$(( cache + $(wc -c < "$f") )); done
printf '%10d  %s\n' "$cache" "precached: the above + $(echo $lazy | sed 's/ / + /g') (loaded on demand, P6-02)"
echo "== check OK"
