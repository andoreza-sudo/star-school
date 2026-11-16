#!/usr/bin/env bash
# One command to check a release: build, generator tests, smoke bot, a11y, perf, sizes.
# Run from anywhere: bash tools/check.sh
#
# Default (KEEP_GOING=1): build, contrast and the hex-colour guard run first and stop the run if they fail (everything else needs
# them). Then test.js, smoke.js and a11y.js run at the same time (test.js is Node only, no browser; http servers use ephemeral
# ports and temp dirs are per step, so nothing is shared), then perf.js runs ALONE and LAST because it measures time. A failure
# does not stop the others. Every step writes its own log under a temp dir; one table at the end gives step, pass/fail, minutes
# and the log path. Exit status is non-zero if any step failed.
# KEEP_GOING=0: the old behaviour: one step after another, output on the terminal, stop at the first failure.
# CPUs: with 4 or more, test + smoke + a11y run together (a11y with A11Y_PAR = CPUs - 2, at most 2, unless you set A11Y_PAR);
# with 2 or 3, test + smoke together and a11y after test; with 1, everything one after another.
set -uo pipefail
cd "$(dirname "$0")/.."
KEEP_GOING=${KEEP_GOING:-1}
CPUS=$(nproc 2>/dev/null || echo 1)
LOGS=$(mktemp -d "${TMPDIR:-/tmp}/star-check.XXXXXX")
ORDER=()
T_ALL=$(date +%s)

if [ ! -d tools/node_modules/playwright-core ]; then
  echo "== installing playwright-core (no browser download)"
  (cd tools && npm install --no-audit --no-fund) || exit 1
fi

# run_step NAME CMD...: runs CMD with its output in $LOGS/NAME.log (also on the terminal when KEEP_GOING=0) and records
# "exit-code seconds" in $LOGS/NAME.res. Each step gets its own TMPDIR so parallel steps never share temp files.
run_step() {
  local n=$1; shift
  local t0 rc; t0=$(date +%s)
  mkdir -p "$LOGS/tmp-$n"
  if [ "$KEEP_GOING" = 0 ]; then
    TMPDIR="$LOGS/tmp-$n" "$@" 2>&1 | tee "$LOGS/$n.log"; rc=${PIPESTATUS[0]}
  else
    TMPDIR="$LOGS/tmp-$n" "$@" >"$LOGS/$n.log" 2>&1; rc=$?
  fi
  echo "$rc $(( $(date +%s) - t0 ))" > "$LOGS/$n.res"
  echo "== $n: $([ "$rc" = 0 ] && echo pass || echo FAIL) ($(( $(date +%s) - t0 )) s) $LOGS/$n.log"
  return "$rc"
}

summary() {
  local rc=0 n r c s
  echo
  printf '%-12s %-6s %8s  %s\n' step result minutes log
  for n in "${ORDER[@]}"; do
    if [ -f "$LOGS/$n.res" ]; then
      read -r c s < "$LOGS/$n.res"
      if [ "$c" = 0 ]; then r=pass; else r=FAIL; rc=1; fi
      printf '%-12s %-6s %8s  %s\n' "$n" "$r" "$(awk -v s="$s" 'BEGIN{printf "%.1f", s/60}')" "$LOGS/$n.log"
    else
      printf '%-12s %-6s %8s  %s\n' "$n" "-" "-" "(not run)"
    fi
  done
  printf 'total wall time: %s minutes\n' "$(awk -v s=$(( $(date +%s) - T_ALL )) 'BEGIN{printf "%.1f", s/60}')"
  if [ "$rc" = 0 ]; then echo "== check OK"; else echo "== check FAILED (see the logs above)"; fi
  return "$rc"
}

build() { python3 tools/build.py > /dev/null; }
contrast() { node tools/contrast.js | tail -n 1; node tools/contrast.js > /dev/null; }
# raw hex colours are allowed only in the token file and in files not yet migrated (30-learn, 40-games; see PROGRESS.md)
token_guard() {
  if grep -nE '#[0-9a-fA-F]{3,8}\b' $(ls src/css/*.css | grep -v -e 00-tokens -e 30-learn -e 40-games); then echo "FAIL: raw hex in migrated CSS"; return 1; fi
}
sizes() {
  echo "== sizes (bytes; budgets in tools/test.js: index.html warn 1.2 MB / fail 1.5 MB, each part file warn 400 KB / fail 800 KB,"
  echo "   data warn 1 MB / fail 2 MB, loaded at start warn 2 MB / fail 3.0 MB, precached (every file) fail 4.5 MB; audio fail 4.5 MB)"
  # the files index.html loads at start, in its order (A11, A11b, A11c): gen.<VER>.js, gen2.<VER>.js, bt.<VER>.js, data.<VER>.js;
  # P6-02: games.<VER>.js, rally.<VER>.js (G-RALLY2) and games2.<VER>.js load on demand (the Game Room) and are precached by sw.js
  local files lazy total cache f
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
  printf '%10d  %s\n' "$(cat audio/es/*.ogg | wc -c)" "audio: $(ls audio/es | wc -l) recordings in audio/es (ES-AUDIO; precached, never loaded at start)"
  printf '%10d  %s\n' "$(cat audio/en/*.ogg | wc -c)" "audio: $(ls audio/en | wc -l) recordings in audio/en (EN-PRAISE, 6 voices; precached, never loaded at start)"
}

# ---- stage 1: everything else depends on these, so a failure here always stops the run ----
for st in build contrast token_guard; do
  ORDER+=("$st")
  if ! run_step "$st" "$st"; then
    [ "$KEEP_GOING" = 0 ] || cat "$LOGS/$st.log"
    summary; exit 1
  fi
done

# ---- stage 2: test.js (named checks, Node only), smoke.js (Playwright), a11y.js (Playwright) ----
ORDER+=(test smoke a11y)
if [ "$KEEP_GOING" = 0 ]; then
  for st in test smoke a11y; do
    run_step "$st" node "tools/$st.js" || { summary; exit 1; }
  done
else
  A11Y_PAR_DEFAULT=$(( CPUS / 4 )); [ "$A11Y_PAR_DEFAULT" -gt 2 ] && A11Y_PAR_DEFAULT=2; [ "$A11Y_PAR_DEFAULT" -lt 1 ] && A11Y_PAR_DEFAULT=1
  export A11Y_PAR=${A11Y_PAR:-$A11Y_PAR_DEFAULT}
  # all three at once crashed Chrome in smoke on a 4-CPU box (the browser-closed error in P2-07), so that needs 8 CPUs
  if [ "$CPUS" -ge 8 ]; then
    run_step test node tools/test.js & p1=$!
    run_step smoke node tools/smoke.js & p2=$!
    run_step a11y node tools/a11y.js & p3=$!
    wait $p1 $p2 $p3
  elif [ "$CPUS" -ge 2 ]; then
    run_step smoke node tools/smoke.js & p2=$!
    run_step test node tools/test.js
    run_step a11y node tools/a11y.js
    wait $p2
  else
    run_step test node tools/test.js
    run_step smoke node tools/smoke.js
    run_step a11y node tools/a11y.js
  fi
fi

# ---- stage 3: perf.js alone and last (it measures time, so nothing else may be running), then the size report ----
ORDER+=(perf sizes)
if ! run_step perf node tools/perf.js && [ "$KEEP_GOING" = 0 ]; then summary; exit 1; fi
run_step sizes sizes
[ "$KEEP_GOING" = 0 ] || cat "$LOGS/sizes.log"
summary
