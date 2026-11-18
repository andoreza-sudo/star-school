#!/usr/bin/env bash
# One command to check a release: build, generator tests, smoke bot, a11y, perf, sizes.
# Run from anywhere: bash tools/check.sh
#
# Default (KEEP_GOING=1): build, contrast, the hex-colour guard and the smoke shard plan run first and stop the run if they fail
# (everything else needs them). Then the test.js, smoke.js and a11y.js shards run side by side (test.js is Node only, no browser; each
# smoke and a11y shard is its own node and its own Chrome with fresh pages; http servers use ephemeral ports and temp dirs are per
# step, so nothing is shared), then the timed smoke shards, then perf.js runs ALONE and LAST because it measures time. A failure does not stop the others. Every
# step and shard writes its own log under a temp dir; one table at the end gives step, pass/fail, minutes and the log path, and a test,
# smoke and a11y row sum up their shards (pass when every shard passed; minutes from the first start to the last end). Exit status is
# non-zero if any step failed.
# SHARDS: smoke.js --shard i/N runs the segments tools/lib/smoke-shards.js gives shard i (every step block in exactly one shard: the
# smoke_plan step and the test.js check "smoke shards" refuse anything else); a11y.js --shard=i/N scans every N-th screen x size;
# test.js --shard=i/N runs its checks of shard i (the test row also checks that the shards' check counts add up).
#   With 4+ CPUs: TEST_SHARDS 2, A11Y_SHARDS 2, SMOKE_SHARDS 8, JOBS 5 (processes at once; fewer when free memory is short, about
#   1 GB each). The queue is the test shards, the a11y shards, then the smoke shards. a11y.js runs at nice 10 (no time limits in it):
#   the smoke bot's taps race the app's (8x sped-up) timers and test.js has time limits, so they get the CPU first.
#   The smoke steps that measure real time against a limit (TIMED in tools/lib/smoke-shards.js: frame times at a CPU
#   throttle, tap latency, sound gaps, WebGL on the CPU) are not in those shards (steps that only read a short window of
#   the app read it in the page at its moment, CHK-FAST): TIMED_SHARDS (2) timed shards run after them, with nothing else
#   beside them but the timed test.js shard (its checks with time limits, TEST_TIMED in tools/test.js), then perf.js alone.
#   With 2-3 CPUs: 1, 1, 3 shards, JOBS 3 and 1 timed shard; with 1 CPU everything one after another. A11Y_PAR: pages at once in each
#   a11y shard (2: it waits on the real clock most of the time).
# KEEP_GOING=0: the old behaviour: one step after another, output on the terminal, stop at the first failure, test.js, smoke.js and
# a11y.js each in one process (no shards).
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
  echo "$t0 $(date +%s)" > "$LOGS/$n.span"
  echo "== $n: $([ "$rc" = 0 ] && echo pass || echo FAIL) ($(( $(date +%s) - t0 )) s) $LOGS/$n.log"
  return "$rc"
}

summary() {
  local rc=0 n r c s extra
  echo
  printf '%-12s %-6s %8s  %s\n' step result minutes log
  for n in "${ORDER[@]}"; do
    # a smoke row says its steps (lines "- ..."); a row that sums up shards says so instead of a log
    extra="$LOGS/$n.log"
    if [ -f "$LOGS/$n.sum" ]; then extra=$(cat "$LOGS/$n.sum")
    elif [[ "$n" == smoke || "$n" == smoke-* ]] && [ -f "$LOGS/$n.log" ]; then extra="$extra  ($(grep -c '^- ' "$LOGS/$n.log") steps)"; fi
    if [ -f "$LOGS/$n.res" ]; then
      read -r c s < "$LOGS/$n.res"
      if [ "$c" = 0 ]; then r=pass; else r=FAIL; rc=1; fi
      printf '%-12s %-6s %8s  %s\n' "$n" "$r" "$(awk -v s="$s" 'BEGIN{printf "%.1f", s/60}')" "$extra"
    else
      printf '%-12s %-6s %8s  %s\n' "$n" "-" "-" "(not run)"
    fi
  done
  printf 'total wall time: %s minutes\n' "$(awk -v s=$(( $(date +%s) - T_ALL )) 'BEGIN{printf "%.1f", s/60}')"
  if [ "$rc" = 0 ]; then echo "== check OK"; else echo "== check FAILED (see the logs above)"; fi
  return "$rc"
}

# SHARDS: sum_shards NAME STEP...: one row for the shards (STEP...) of NAME (test, smoke or a11y): pass when every shard passed,
# minutes from the first start to the last end; smoke: the steps of all shards together; test: the checks of all shards, which must
# add up (each shard prints its own count and the count of the others)
sum_shards() {
  local n=$1 i c s a b rc=0 steps=0 t0='' t1=0 tot=0 x y note k
  local -a whole=()
  shift; k=$#
  for i in "$@"; do
    if [ -f "$LOGS/$i.res" ]; then read -r c s < "$LOGS/$i.res"; [ "$c" = 0 ] || rc=1; else rc=1; continue; fi
    read -r a b < "$LOGS/$i.span"
    if [ -z "$t0" ] || [ "$a" -lt "$t0" ]; then t0=$a; fi
    [ "$b" -gt "$t1" ] && t1=$b
    [ "$n" = smoke ] && steps=$(( steps + $(grep -c '^- ' "$LOGS/$i.log") ))
    if [ "$n" = test ]; then
      x=$(tail -n 1 "$LOGS/$i.log" | sed -nE 's/^(all ([0-9]+) checks passed|[0-9]+ of ([0-9]+) checks FAILED).*; ([0-9]+) checks in the other shards\).*$/\2\3 \4/p')
      read -r x y <<< "$x"
      if [ -z "$x" ]; then rc=1; else tot=$(( tot + x )); whole+=($(( x + y ))); fi
    fi
  done
  echo "$rc $(( t1 - ${t0:-$t1} ))" > "$LOGS/$n.res"
  note="$k shards ($1 .. ${!#} above)"
  [ "$n" = smoke ] && note="$note, $steps steps in all"
  if [ "$n" = test ]; then
    for x in "${whole[@]}"; do [ "$x" = "$tot" ] || { rc=1; echo "$rc $(( t1 - ${t0:-$t1} ))" > "$LOGS/$n.res"; note="$note, CHECK COUNTS DO NOT ADD UP"; }; done
    note="$note, $tot checks in all"
  fi
  echo "$note" > "$LOGS/$n.sum"
}

build() { python3 tools/build.py > /dev/null; }
contrast() { node tools/contrast.js | tail -n 1; node tools/contrast.js > /dev/null; }
# raw hex colours are allowed only in the token file and in files not yet migrated (30-learn, 40-games; see PROGRESS.md)
token_guard() {
  if grep -nE '#[0-9a-fA-F]{3,8}\b' $(ls src/css/*.css | grep -v -e 00-tokens -e 30-learn -e 40-games); then echo "FAIL: raw hex in migrated CSS"; return 1; fi
}
sizes() {
  echo "== sizes (bytes; budgets in tools/test.js: index.html warn 1.2 MB / fail 1.5 MB, each part file warn 400 KB / fail 800 KB,"
  echo "   data warn 1 MB / fail 2 MB, loaded at start warn 2 MB / fail 3.0 MB, precached (every file) fail 8 MB; audio fail 4.5 MB)"
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
  printf '%10d  %s\n' "$(cat audio/teach/*.ogg | wc -c)" "audio: $(ls audio/teach | wc -l) recordings in audio/teach (TEACH-4 teacher lines; precached, never loaded at start)"
}

# ---- stage 1: everything else depends on these, so a failure here always stops the run ----
# SHARDS: the smoke shards' plan (every step block of smoke.js is a segment, each in exactly one shard); no browser
smoke_plan() { node tools/smoke.js --plan "$SMOKE_SHARDS" "$TIMED_SHARDS"; }
TIMED_SHARDS=${TIMED_SHARDS:-2}; [ "$CPUS" -ge 4 ] || TIMED_SHARDS=1
if [ "$KEEP_GOING" = 0 ]; then SMOKE_SHARDS=1; A11Y_SHARDS=1; TEST_SHARDS=1; JOBS=1
elif [ "$CPUS" -ge 4 ]; then SMOKE_SHARDS=${SMOKE_SHARDS:-8}; A11Y_SHARDS=${A11Y_SHARDS:-2}; TEST_SHARDS=${TEST_SHARDS:-2}; JOBS=${JOBS:-5}
elif [ "$CPUS" -ge 2 ]; then SMOKE_SHARDS=${SMOKE_SHARDS:-3}; A11Y_SHARDS=${A11Y_SHARDS:-1}; TEST_SHARDS=${TEST_SHARDS:-1}; JOBS=${JOBS:-3}
else SMOKE_SHARDS=${SMOKE_SHARDS:-1}; A11Y_SHARDS=${A11Y_SHARDS:-1}; TEST_SHARDS=${TEST_SHARDS:-1}; JOBS=${JOBS:-1}; fi

for st in build contrast token_guard smoke_plan; do
  ORDER+=("$st")
  if ! run_step "$st" "$st"; then
    [ "$KEEP_GOING" = 0 ] || cat "$LOGS/$st.log"
    summary; exit 1
  fi
done

# ---- stage 2: test.js (named checks, Node only), the smoke.js shards and the a11y.js shards (Playwright) ----
if [ "$KEEP_GOING" = 0 ]; then
  ORDER+=(test smoke a11y)
  for st in test smoke a11y; do
    run_step "$st" node "tools/$st.js" || { summary; exit 1; }
  done
else
  export A11Y_PAR=${A11Y_PAR:-2}
  # the queue: the test shards (Node, CPU bound), the a11y shards (real-time clock), then the smoke shards
  Q=()
  for i in $(seq 1 "$TEST_SHARDS"); do Q+=("test-$i node tools/test.js --shard=$i/$TEST_SHARDS"); done
  for i in $(seq 1 "$A11Y_SHARDS"); do Q+=("a11y-$i nice -n 10 node tools/a11y.js --shard=$i/$A11Y_SHARDS"); done
  for i in $(seq 1 "$SMOKE_SHARDS"); do Q+=("smoke-$i node tools/smoke.js --shard $i/$SMOKE_SHARDS"); done
  # JOBS: processes at once; each one with its Chrome takes up to about 1 GB, so fewer when free memory is short. With more at once on
  # 4 CPUs (8 or 9 in earlier plans) the smoke bot misses the app's short (8x sped-up) timers and steps fail, and test.js misses its
  # time limits; before the shards, test + smoke + a11y at once once crashed Chrome in smoke (the browser-closed error in P2-07).
  MEM_GB=$(awk '/MemAvailable/ {printf "%d", $2 / 1048576}' /proc/meminfo 2>/dev/null || echo 8)
  [ "$JOBS" -gt $(( MEM_GB - 1 )) ] && JOBS=$(( MEM_GB - 1 )); [ "$JOBS" -lt 1 ] && JOBS=1
  for q in "${Q[@]}"; do ORDER+=("${q%% *}"); done
  echo "== stage 2: $TEST_SHARDS test, $A11Y_SHARDS a11y (A11Y_PAR=$A11Y_PAR) and $SMOKE_SHARDS smoke shards, $JOBS at once ($CPUS CPUs, ${MEM_GB} GB free)"
  running=0
  for q in "${Q[@]}"; do
    if [ "$running" -ge "$JOBS" ]; then wait -n; running=$(( running - 1 )); fi
    # shellcheck disable=SC2086
    run_step $q &
    running=$(( running + 1 ))
  done
  wait
fi

# ---- stage 3: the timed smoke shards and the timed test.js shard (time limits), then perf.js alone and last (it measures time, so
# nothing else may be running), then the size report ----
if [ "$KEEP_GOING" != 0 ]; then
  for i in $(seq 1 "$TIMED_SHARDS"); do ORDER+=("smoke-t$i"); run_step "smoke-t$i" node tools/smoke.js --shard "t$i/$TIMED_SHARDS" & done
  ORDER+=(test-t); run_step test-t node tools/test.js --shard=t &
  wait
  ORDER+=(test smoke a11y)
  sum_shards test $(for i in $(seq 1 "$TEST_SHARDS"); do echo "test-$i"; done) test-t
  sum_shards smoke $(for i in $(seq 1 "$SMOKE_SHARDS"); do echo "smoke-$i"; done) $(for i in $(seq 1 "$TIMED_SHARDS"); do echo "smoke-t$i"; done)
  sum_shards a11y $(for i in $(seq 1 "$A11Y_SHARDS"); do echo "a11y-$i"; done)
fi

ORDER+=(perf sizes)
if ! run_step perf node tools/perf.js && [ "$KEEP_GOING" = 0 ]; then summary; exit 1; fi
run_step sizes sizes
[ "$KEEP_GOING" = 0 ] || cat "$LOGS/sizes.log"
summary
