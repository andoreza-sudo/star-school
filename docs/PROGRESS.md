# Star School Progress Log

The running record of what has shipped. Newest entry first. Every chunk adds one entry (see CONTRIBUTING.md section 5).

**Next up:** P0-04, P5-01.

**Current version:** v33

## Chunk status

Mark a chunk here when it ships: `P0-01 v31`. Anything not listed is not done.

- P0-01 v31
- P0-02 v32
- P0-03 v33

## Handoff notes

(none)

## Ideas and issues

Things noticed while working that are outside the current chunk. One line each, with the chunk that noticed it.

- (P0-01) `node tools/smoke.js` takes about 95 s because the bot waits for the app's own 1.2 s between questions. Fine for now; a later chunk could shorten it with a fake clock.
- (P0-01) `node tools/test.js` only prints and always exits 0 until P0-04 makes it a real check.
- (P0-01) `python3 tools/build.py` re-draws the icons with Pillow, so `icon-*.png` can show as modified in git after a rebuild even when nothing changed visually.
- (P0-02) CONTRIBUTING 3.2 says boot.js is lines 2438-2439 and the CSS split is "near 58 and 162"; used 58 and 163 (line 162 is a blank line kept with 30-learn.css). All JS ranges matched the real markers. 46-home.js (734) and 00-core.js (322) have no marker comment; cut by the documented line numbers.
- (P0-02) CONTRIBUTING 3.1/3.2 still describe the pre-split layout as "today"; a later docs pass could update the 3.1 text. `src/data/` holds only a `.gitkeep` until the first data file exists.
- (P0-03) ROADMAP section 9 says a missing `S.v` means 2, but both folded migrations must still run on v30 saves (single-map saves have no `S.maps`; index-keyed maps have no `S.mapv`). Code treats a missing `S.v` as 1 and runs migrations 1 and 2, each guarded by its own marker; latest is 3. A later docs pass could align section 9.
- (P0-03) `migrate()` is called from `src/js/42-paths.js` (not 00-core.js) because the map migrations need `NODES`, which only exists there; no file before it reads `S` at load time.
- (P0-03) A corrupt save is kept in `starschool-v2-corrupt` and `SAVE_CORRUPT` is set, but nothing shows it yet; P0-05's App log should display it. `SAVE_FAILED` is shown in Grown-ups.
- (P0-03) `node tools/test.js` still always exits 0 except for the new migration block, which sets exit code 1 on failure; P0-04 should fold it into named checks.
- (P0-03) A save file that is literally `{}` (not the same as no save) would still crash `PETS[S.pet]`; not handled (pre-existing).

## Log

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
