# Star School Progress Log

The running record of what has shipped. Newest entry first. Every chunk adds one entry (see CONTRIBUTING.md section 5).

**Next up:** P1-01 (done on a parallel branch, merging), then P5-04, P1-02, P4-02.

**Current version:** v37

## Chunk status

Mark a chunk here when it ships: `P0-01 v31`. Anything not listed is not done.

- P0-01 v31
- P0-02 v32
- P0-03 v33
- P0-04 v34
- P0-05 v35
- P5-01 v36
- P4-01 v37

## Handoff notes

(none)

## Ideas and issues

Things noticed while working that are outside the current chunk. One line each, with the chunk that noticed it.

- (P0-01) `node tools/smoke.js` takes about 95 s because the bot waits for the app's own 1.2 s between questions. Fine for now; a later chunk could shorten it with a fake clock.
- (P0-01) `node tools/test.js` only prints and always exits 0 until P0-04 makes it a real check.
- (P0-01) `python3 tools/build.py` re-draws the icons with Pillow, so `icon-*.png` can show as modified in git after a rebuild even when nothing changed visually.
- (P0-02) CONTRIBUTING 3.2 says boot.js is lines 2438-2439 and the CSS split is "near 58 and 162"; used 58 and 163 (line 162 is a blank line kept with 30-learn.css). All JS ranges matched the real markers. 46-home.js (734) and 00-core.js (322) have no marker comment; cut by the documented line numbers.
- (P0-02) CONTRIBUTING 3.1/3.2 still describe the pre-split layout as "today"; a later docs pass could update the 3.1 text. `src/data/` holds only a `.gitkeep` until the first data file exists.
- (P4-01) Fredoka (display font) not added: no network in this environment to fetch a subset woff2, so display text uses Andika 700 (`--font-display` is the single switch point for later).
- (P4-01) `30-learn.css` (36 hex) and `40-games.css` (157 hex) still contain raw hex colours; the check.sh guard covers only 20-base.css and grows as P4 chunks migrate screens. Legacy aliases (`--bg`, `--blue`, `--green`, `--red`, `--muted`, `--card`, `--big`) remain until P4-17; old `--math`/`--read` were light tints and are now the DS base colours (`.tile.math/.read` use `-tint`).
- (P4-01) `.petbig`/`.pet.aura` still use `filter: drop-shadow` (old code, forbidden by CONTRIBUTING 7); to be removed with the pet rig (P4-05).
- (P4-01) `html.calm` rules exist but nothing sets the class yet; the Grown-ups toggle comes with a later chunk (P4-12 / P6-01).
- (P0-03) ROADMAP section 9 says a missing `S.v` means 2, but both folded migrations must still run on v30 saves (single-map saves have no `S.maps`; index-keyed maps have no `S.mapv`). Code treats a missing `S.v` as 1 and runs migrations 1 and 2, each guarded by its own marker; latest is 3. A later docs pass could align section 9.
- (P0-03) `migrate()` is called from `src/js/42-paths.js` (not 00-core.js) because the map migrations need `NODES`, which only exists there; no file before it reads `S` at load time.
- (P0-05) A save corrupt message is now shown in the App log (resolves the P0-03 note below). Round recovery only triggers when `G` is live and `#prompt` is on screen; errors in games (Hill Climb etc.) are logged but show no overlay.
- (P0-03) A corrupt save is kept in `starschool-v2-corrupt` and `SAVE_CORRUPT` is set, but nothing shows it yet; P0-05's App log should display it. `SAVE_FAILED` is shown in Grown-ups.
- (P0-03) `node tools/test.js` still always exits 0 except for the new migration block, which sets exit code 1 on failure; P0-04 should fold it into named checks.
- (P5-01) Speed Race (`54-race.js`) and Fact Sprint overlap (both are 60-second math facts); a later chunk could fold Race's math category into Fact Sprint. Their progress bar (`.prog` inside `.top`) also does not show at 380x780.
- (P5-01) Game time for Fact Sprint is once per set per day (tracked in `S.flu[set].paid`), and a new record always adds +1 min even on a later sprint the same day. P5-09 should review these amounts.
- (P5-01) `mul`/`div` sets: add entries to `FLU.SETS` in `57-fluency.js` (each has an `ok()` unlock test and a `gen()`), nothing else needed.
- (P0-03) A save file that is literally `{}` (not the same as no save) would still crash `PETS[S.pet]`; not handled (pre-existing).
- (P0-04) Known exception in `tools/test.js` KNOWN: the 9 Spanish level 2 skills (`es_greet`, `es_color`, `es_num`, `es_teen`, `es_animal`, `es_food`, `es_body`, `es_family`, `es_mix`) have no `say` on purpose (a picture asks "How do you say it in Spanish?"; speaking the word would give the answer away), so the "say present" check lists them. A later chunk could give them a `say` for the question text or add a flag for silent-on-purpose questions, then delete the KNOWN entry.
- (P0-04) The emoji allowlist was seeded with all 309 sequences found in `src/` at v33. 13 are newer than Unicode 11 and marked `# risky` (may be empty boxes on old Android): wheel, pickup truck, large blue and green squares, ice cube, kite, magic wand, pinata, ringed planet, coin, mirror, bucket, rock. The coin (used 20 times: 38-skills, 46-home, 48-shop) is the most visible; P4-02 or P4-13+ should replace these with SVG.
- (P0-04) The "risky" test only knows Unicode 12+ ranges from a table in `tools/test.js`; it is a safety net for new emoji, not a full emoji-version database. CSS `content:'\1F...'` escapes are not scanned (none exist today).
- (P0-04) `node tools/test.js` needs a built `index.html` for the size check (it fails with a message if missing); `check.sh` builds first. The size budget (warn 1.2 MB, fail 1.5 MB) lives only in `tools/test.js`.

## Log

### P4-01 Tokens and base layer (v37, 2026-11-10, Claude)
- What changed: new `src/css/00-tokens.css` (colour, subject colours, type scale, space, radius, ledge/shadow, tap sizes, motion, legacy aliases); `20-base.css` now uses tokens only (zero raw hex), adds `:focus-visible` ring, `touch-action`, safe-area padding on `#app`, tabular-nums on the stars chip, reduced-motion and `html.calm` rules (animations 0.01 ms, confetti hidden); `tools/contrast.js` checks 42 token pairs and runs from check.sh together with a no-hex guard on 20-base.css. Contrast fixes recorded in DESIGN_SYSTEM 2.1: `--math` #2D6BE4, `--read` #CD3168, `--good` #20A556, `--good-ink` #147A3C. Big green button now `--good-ink` fill for white-text contrast.
- Files: src/css/00-tokens.css (new), src/css/20-base.css, tools/contrast.js (new), tools/check.sh, tools/build.py (VER), docs/DESIGN_SYSTEM.md (4 hex), docs/PROGRESS.md, built output.
- Tests: test.js ok / smoke.js ok / contrast.js 42 pairs pass / index.html 379 KB
- Screenshots checked: home and question at 600x960 before/after: same layout; text slightly bluer ink, pet meter ends in deeper red, green buttons slightly darker. Map not changed by this chunk (no base-layer rule), not viewed separately.
- Checklist 7.1: all ticked (no-network and midway fixture covered by smoke; no emoji added). Built on a parallel branch and merged after P5-01 as v37 (no renumber needed).
- Left over / notes: Fredoka skipped (see Ideas and issues).

### P5-01: Fact Sprint (v36), 2026-11-10, Claude
- What changed: home button "Fact Sprint" (6th action tile). Sets by progress: add10 always, sub10 once `sub` level 1 is passed, add20 once `add` level 2, sub20 once `sub` level 2. Two modes per set: 60 seconds (most right) and 20 facts (fastest time). Big keypad, auto-submit when the digit count matches, no hints. A wrong answer shows the fact for 1 s and it returns after 3 other facts; the same fact never appears twice in a row. End screen: score, best, 7-day sparkline, "NEW RECORD!" with confetti. Game time: 1 min for the first sprint of each set per day (60 s mode needs 5 right), +1 min for any new record; extra sprints are free practice. The clock does not count time while the tab is hidden. Timers are stopped by `view()` via `stopFlu()`.
- Saved: `S.flu = {key: {best, hist: [[day, sec, right]] (30)}}`; key is the set id (60 s) or set id + `-20`; `S.flu[set].paid` is the day game time was last earned. No migration: absent field reads as empty (additive, section 9 rule 6). `S.v` unchanged.
- Files: new `src/js/57-fluency.js`; `46-home.js` (button), `40-view.js` (calls `stopFlu`), `58-playtime.js` (one line in the Game Room earn list), `tools/test.js` (block at the end, `// ---- P5-01 fact sprint ----`), `tools/smoke.js` (plays a 20-facts sprint), `tools/shots.js` (`fluency`, `fluency-modes`, `sprint`, `sprint-end`), `tools/build.py` (v36).
- Tests: test.js 0 errors (fact ranges, no repeats, requeue gap, record logic incl. first run and ties, history trim, game-time rules, hidden-tab clock, 7-day view, missing `S.flu`); smoke.js OK incl. a sprint; check.sh OK; index.html 388,861 bytes.
- Screenshots checked: fluency 600x960, sprint 1024x600 and 380x780, sprint-end 380x780.
- Emoji used (all already in the source): 🔢 ⚡ ➕ ➖ 🏆 🎟️ 🎉 🏠 ◀ ⌫.
- Checklist 7.1: all ticked (emoji allowlist check arrives with P0-04). Left over: none. Built on a parallel branch, merged after P0-05 (renumbered v35 -> v36).

### P0-05: Error guard and on-device debug log (v35), 2026-11-10, Claude
- `src/js/00-core.js`: `logErr(msg)` plus `error` and `unhandledrejection` listeners push `{t,msg,ver}` to `S.err` (ring of 20, message cut at 200 chars, default `[]` when absent; no schema bump needed). Nothing leaves the device.
- `src/js/50-round.js`: `roundOops()` (called by `logErr`): if a round is live, marks it dead and shows an overlay with a big "Oops, let's go home" button that goes to `home(true)`.
- `src/js/80-grown.js`: collapsed "App log" card: version, save size in KB, storage status (`SAVE_FAILED`, and `SAVE_CORRUPT` now shown), last errors newest first, all escaped.
- `tools/test.js`: block `// ---- P0-05 error guard ----` (ring cap, order, shape, truncation, default). `tools/smoke.js`: step 5 throws mid-round, checks the button, recovery to home, `S.err`, App log text; that one injected page error is removed from the error list, any other console error still fails the run.
- Tests: test.js ok / smoke.js ok / index.html 378,320 bytes
- Screenshots checked: grown with App log open (600x960), oops overlay mid-round (600x960)
- Checklist 7.1: all ticked
- Left over / notes: built on a parallel branch, merged after P0-04 and renumbered v36 -> v35.

### P0-04: Generator test upgrade, emoji allowlist, size budget (v34), 2026-11-10, Claude
- `tools/test.js` restructured into 10 named checks, each returning its problems; the run prints ok/FAIL per check and exits 1 if any fails. Checks: generators (answers, choices, BAD filter, hints), label present and under 60 chars, `say` present, no undefined/NaN in html/label/say/choices, 2 to 4 choices, nodes point at an existing skill and level, every skill level reachable from a node, emoji allowlist, size budget, migrations (the P0-03 block, unchanged, now a named check). Fuzz is still 3,000 questions per skill level (207,000).
- New `tools/emoji-allow.txt`: 309 sequences (all emoji used in `src/` at v33, matched ignoring U+FE0F; keycaps included), 13 marked `# risky` (Unicode 12 or newer). The test also fails if a Unicode 12+ emoji is listed without `# risky`.
- Size budget lives in one place, `tools/test.js` (`SIZE_WARN` 1.2 MB, `SIZE_FAIL` 1.5 MB). `tools/check.sh` now runs `test.js` once (full output) and no longer has its own size check; it still lists sizes.
- Known exceptions (`KNOWN` in test.js, commented): 9 Spanish level 2 skills have no `say` by design. See Ideas and issues.
- Proved the suite fails: broke the story generator answer (`ans+'x'`): `node tools/test.js` exited 1 with 46 problems; also appended an unlisted emoji to `90-app.js`: exit 1. Both reverted; `git diff` shows no app change under `src/`.
- Acceptance: test.js exit 0 (10 checks), smoke OK (midway intact: 85 stars, 64 coins), check.sh OK, index.html 376,570 bytes. Looked at home-600x960 (nothing visual changed).
- 7.1 checklist: only chunk files changed [x]; VER v34 [x]; built [x]; test.js 0 [x]; smoke 0, no console errors [x]; screenshot taken and looked at [x]; midway fixture intact [x]; size under 1.5 MB [x]; no network requests (smoke) [x]; no new emoji [x]; this entry [x]; one commit, pushed [x].

### P0-03: Save schema version and migrations (v33), 2026-11-10, Claude
- `src/js/00-core.js`: `loadSave(raw)`, `LATEST` (3), `MIGRATIONS`, `migrate()`. `S.v` is the schema version; a new save starts at 3. The inline `S.maps` and `S.mapv` migrations from 42-paths.js are now migrations 1 and 2, same code (the only addition: migration 2 first fills missing `S.maps[p]`, which the old line 33 did before it ran; their `save()` calls became one at the end of `migrate()`).
- Before any migration runs, the old raw string is copied to `starschool-v2-bak`. Corrupt or non-object JSON is kept in `starschool-v2-corrupt`, a fresh save starts, and `starschool-v2` is not written until the first `save()`. A save newer than this app is left untouched.
- `save()` sets `SAVE_FAILED` when storage throws (quota); `src/js/80-grown.js` shows one line in Grown-ups when it is set. Storage key unchanged.
- `src/js/42-paths.js`: the two inline migrations removed, one `migrate();` call in their place (first point where `NODES` exists; nothing earlier reads `S` at load).
- `tools/test.js`: new migration block with fake storage. Runs midway, maxed and two new fixtures (`tools/fixtures/legacy-single-map.json`, `legacy-index-maps.json`) plus empty, corrupt, non-object and newer saves. Checks stars, coins, pet, name unchanged, `S.v` latest, backup written, idempotent, map progress carried, corrupt kept and not overwritten, `save()` failure flag.
- Acceptance: test.js 0 errors incl. migration tests (0); smoke OK (midway intact: 85 stars, 64 coins); check.sh OK; index.html 376,570 bytes. Looked at grown-600x960 and home-600x960.

Checklist 7.1: [x] only chunk files changed (plus 2 new fixtures) [x] VER bumped v33 [x] built [x] test.js 0 [x] smoke.js 0, no console errors [x] screenshots looked at (grown, home 600x960; failure line only appears on a failed save, covered by test) [x] midway fixture intact [x] size 377 KB [x] no network requests [x] no new emoji [x] entry added [x] one commit

### P0-02: Split source into ordered files (v32), 2026-11-10, Claude
- `src/src.html` cut by script into `src/shell.html` (two marker lines `/*@@CSS@@*/` and `/*@@JS@@*/`), `src/css/{20-base,30-learn,40-games}.css`, 31 files in `src/js/` (names and ranges from CONTRIBUTING 3.2), `src/boot.js` and an empty `src/data/` (`.gitkeep`). No code edited, renamed, reordered or reformatted.
- `tools/build.py` concatenates shell + sorted css + sorted js + sorted data + boot.js, then the existing `__VER__`/font replacement. `tools/test.js` reads the same js + data concatenation without boot.js. `tools/check.sh` no longer lists `src/src.html` in sizes.
- Acceptance: index.html SHA-256 at v31 before and after the split is identical (0a2ebfa9de6837e6d051b160bd654116a574b616697394040584c942584d8224). Then VER bumped to v32.
- Largest JS: 62-hill.js 67 KB, 60-blocks.js 47 KB, 72-shapes.js 30 KB; the rest are under 25 KB.
- check.sh passes (test.js 207000 generated, 0 errors; smoke OK incl. midway fixture; index.html 374,697 bytes). Looked at home-600x960 only.

Checklist 7.1: [x] only chunk files changed [x] VER bumped [x] built [x] test.js 0 [x] smoke.js 0, no console errors [x] screenshot looked at (home 600x960; layout is unchanged, hash identical at v31) [x] midway fixture intact [x] size 375 KB [x] no network requests [x] no new emoji [x] entry added [x] one commit

### P0-01: Test and screenshot harness (v31), 2026-11-10, Claude
- New `tools/package.json` (devDependency `playwright-core` only, uses system Chrome via `CHROME` or `/usr/bin/google-chrome`, no browser download) and `.gitignore` (`tools/node_modules`, `tools/out`).
- `tools/lib/browser.js`: launches Chrome headless, opens built `index.html` over `file://`, seeds `localStorage['starschool-v2']` from a fixture, blocks and records all http(s) requests, collects console errors and uncaught exceptions.
- `tools/shots.js [--fixture=name] <screen...>`: PNGs to `tools/out/` at 600x960, 1024x600, 380x780. Screens: setup, home, map, map-read, map-es, question, question-read, boss, finish, gameroom, grown, shop, stickers.
- `tools/smoke.js`: bot does fresh setup, one full 10/10 round on each path through the real UI (reads `G.q.ans`), Game Room, Grown-ups (long press on the gear), loads the `midway` fixture and checks stars, coins, pet hat and map progress; fails on any console error, exception or network request.
- `tools/fixtures/fresh.json`, `midway.json` (v30 save: progress in all three paths, misses, coins, wearables), `maxed.json`.
- `tools/check.sh`: build, `test.js`, `smoke.js`, size report (fails over 1.5 MB, warns over 1.2 MB).
- No app code changed. `VER` v30 -> v31.
- Results: `bash tools/check.sh` exit 0; test.js 207000 generated, 0 errors; smoke OK, zero console errors, zero network requests; index.html 374,697 bytes. Looked at home 600x960, question 380x780, finish 1024x600.

Checklist 7.1:
- [x] Only the files named in the chunk were changed (plus built output).
- [x] `VER` bumped by one.
- [x] Build ran; `index.html`, `sw.js`, `manifest.json` rebuilt.
- [x] `node tools/test.js` exits 0.
- [x] `node tools/smoke.js` exits 0 with zero console errors.
- [x] Screenshots at all three sizes taken; three looked at.
- [x] `midway` fixture loads with the same stars, coins, pet and map progress.
- [x] Built size printed; under 1.5 MB.
- [x] No network requests at runtime (smoke runs with http(s) blocked and records attempts).
- [x] No new emoji or colors in app code (no app code changed).
- [x] PROGRESS.md entry added.
- [x] One commit `P0-01: Test and screenshot harness (v31)`.

### Plan written (v30)
- Added docs: ROADMAP, CURRICULUM, BRAIN_TEASERS, DESIGN_SYSTEM, CONTRIBUTING, this log.
- No app code changed.

Entry template:

```
### P#-## Title (vNN, date, who/model)
- What changed:
- Files:
- Tests: test.js ok / smoke.js ok / index.html NNN KB
- Screenshots checked:
- Checklist 7.1: all ticked (or list exceptions)
- Left over / notes:
```
