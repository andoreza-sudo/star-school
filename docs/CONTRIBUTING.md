# Contributing to Star School

How anyone (Andy, another person, another account, or an AI model) picks up one chunk of the roadmap and ships it.

Read this file first, every time. Then read only your chunk in [ROADMAP.md](ROADMAP.md) and the one section it points to.

---

## 1. How Andy runs this (plain language)

1. Open [PROGRESS.md](PROGRESS.md). The top says which chunk is next.
2. Start a **new** session in the `star-school` repo. Pick the model the chunk names: Sonnet for most, Opus only where the roadmap says Opus.
3. Paste the prompt from section 8 below and fill in the chunk ID. That is the whole instruction.
4. Let it work. It will build, test, commit and push, then give a short report.
5. On a tablet with wifi: open the app, close it, open it again. The version number at the bottom of the home screen should match the report. Tap around the thing that changed.
6. If something looks wrong, say so in the same session. If the session is long already, start a new one and paste the "fix" prompt from section 8.
7. One chunk per session. Start fresh for the next one. That is what keeps the cost down.

Someone else helping (different account or person): they need the GitHub repo (as a collaborator, or a fork plus a pull request) and this file. Nothing else.

Only one chunk should be in progress on `main` at a time. If two people work at once, each uses a branch (section 6).

## 2. Setup

| Need | Why | Check |
|------|-----|-------|
| Python 3 + Pillow (`pip install pillow`) | `tools/build.py` (Pillow draws the app icons) | `python3 -c "import PIL"` |
| Node 18 or newer | tests and harness | `node -v` |
| Google Chrome or Chromium | screenshots and smoke test | `/usr/bin/google-chrome --version`, or set `CHROME=/path/to/chrome` |
| `cd tools && npm install` (after chunk P0-01 exists) | installs `playwright-core` only; no browser download | `tools/node_modules` exists |

No other dependencies. Nothing is installed for the app itself.

## 3. Repo layout

### 3.1 Today (v30, before chunk P0-02)

```
src/src.html        THE source: HTML + CSS + one <script>, 2,442 lines, 323 KB
tools/build.py      builds index.html (fonts embedded), sw.js, manifest.json, icons into the repo root
tools/test.js       fuzzes every question generator
tools/fonts/        Andika woff2 (SIL OFL)
index.html, sw.js, manifest.json, icon-*.png    BUILT output, committed (GitHub Pages serves the repo root)
docs/               this plan
```

### 3.2 After chunk P0-02 (the layout every later chunk assumes)

```
src/shell.html      head, body skeleton; markers where CSS and JS are inserted
src/css/NN-name.css concatenated in filename order
src/js/NN-name.js   code, concatenated in filename order into ONE <script> (one global scope, no import/export); puzzle types
                    (NN-bt-*.js) and Game Room games go into bt.<VER>.js and games.<VER>.js instead (A11b, section 3.3)
src/data/d-name.js  data only (word lists, banks, passages, puzzle banks); concatenated, in filename order, into the second built file data.<VER>.js (A11)
src/boot.js         the start-up lines: if dataReady() then loadClips(); home(true); else dataMissing(); always last
tools/              build.py, test.js, shots.js, smoke.js, check.sh, lib/, fixtures/, puzzles/ (dev-time generators)
```

CSS files: `20-base.css`, `30-learn.css`, `40-games.css` from the split (cut at rule boundaries near source lines 58 and 162).
Added later: `00-tokens.css` (P4-01), `10-components.css` (P4-04).

JS files created by the split, with the source line ranges of `src/src.html` at v30:

| File | Lines | Contents |
|------|-------|----------|
| `00-core.js` | 322-335 | `$`, `$$`, `R`, `pick`, `shuffle`, `esc`, state `S`, `save()`, `P()`, `today()`, `day()` |
| `05-pets.js` | 336-345 | `PETS`, growth stages, stickers list |
| `10-sfx.js` | 346-387 | Sound engine `SFX`, `tone()`, `noise()`, music |
| `12-speech.js` | 388-407 | `say()`, voices, `fb()` toast |
| `20-words.js` | 408-421 | Word lists `DOL`, `CVC`, `BLEND`, `MAGICE`, `TEAMS`, `BAD` filter |
| `22-qhelpers.js` | 422-432 | `SLOT`, `mathQ()`, `coin()` |
| `30-gen-math.js` | 433-483 | `genAdd`, `genMiss`, `genSub`, `genBig`, `genEO`, `genCnt`, `genStory` |
| `32-gen-read.js` | 484-573 | Reading generators; also `genCmp`, `genTime`, `genCoins`, `genMult` (they sit here today) |
| `34-gen-es.js` | 574-593 | Spanish data `SPN`, `genEs` |
| `36-gen-phonics.js` | 594-608 | `genSound`, `genRhyme` |
| `38-skills.js` | 609-637 | `SK` skill table |
| `39-hints.js` | 638-656 | `hintHTML()` |
| `40-view.js` | 657-661 | `view()`, pet phrases |
| `42-paths.js` | 662-704 | `PATHS`, `NODES`, map state helpers, shop data |
| `44-clips.js` | 705-733 | Recorded voice clips (IndexedDB) |
| `46-home.js` | 734-816 | `setup()`, `home()`, `pathMap()`, `drawMap()`, `learn()` |
| `48-shop.js` | 817-836 | Pet shop |
| `50-round.js` | 837-1004 | Round engine: `start`, `makeQ`, `renderQ`, `check`, `finish`, boss, test out |
| `52-balloons.js` | 1005-1044 | Balloon bonus game |
| `54-race.js` | 1045-1085 | Fact Race (called Speed Race until G-02; ids and `S.race` unchanged) |
| `56-petcare.js` | 1086-1106 | Pet care |
| `58-playtime.js` | 1107-1140 | Game time (`ptCfg`, `pt`, `ptLeft`, `ptEarn`, `ptCalc`), `gameRoom()` |
| `60-blocks.js` | 1141-1424 | Block Builder |
| `62-hill.js` | 1425-1865 | 4x4 Hill Climb |
| `64-gtimer.js` | 1866-1875 | Shared game timer |
| `66-colornum.js` | 1876-1927 | Color by number |
| `68-lowpoly.js` | 1928-2001 | Low-poly animal art |
| `70-art.js` | 2002-2156 | Art Studio |
| `72-shapes.js` | 2157-2368 | Shape coloring pages |
| `80-grown.js` | 2369-2426 | Grown-ups area |
| `81-backup.js` (P5-07) | | `BAK`: save a backup file, check and load one, undo the last load; used by the Grown-ups Backup card |
| `90-app.js` | 2427-2437 | Fullscreen, install, service worker registration |
| `src/boot.js` | 2438-2439 | `loadClips(); home(true);` (not in `src/js`; the tests leave it out) |

Files added by later chunks (names are fixed by the roadmap so everyone agrees):

| File | Chunk | Contents |
|------|-------|----------|
| `14-ui.js` | P4-04 | `UI.*` helpers that return component markup (classes in `src/css/10-components.css`) |
| `15-icons.js`, `15-pics.js`, `16-art-*.js`, `17-pets-svg.js` | P4-02, pre-wave 5, P4-13+, P4-05 | Icon sprite; `ART`/`picArt`/`picFor`; object art (`Object.assign(ART, {...})`; set A in `16-art-a.js`, sets B and C and later in `src/data/d-art-b.js`, `d-art-c.js` ...); pet rig |
| `18-reward-art.js` | P4-11 | Reward art (chest, stars, bosses, prize rosette) and the reward screens' markup (`RW.*`); CSS in `src/css/42-rewards.css` |
| `17-wear.js`, `src/data/d-wear.js` | P4-07 | Wearables: helpers, names, `wearOf` / `wearPic` / `wearBox` (code), and the drawings `WEAR` / `WEAR_EMB` keyed by the saved item ids (data file); Pet Shop and sticker book CSS in `src/css/43-shop.css` |
| `59-game-hub.js`, `src/css/48-game-hub.css` | P4-16 | Game Room hub (`GH.hub`, called by `gameRoom()`), the game registry (`GH.reg`), the drawn hub scene, ticket and game pictures, and the shared game chrome: top bar `GH.top`/`GH.wire`, pause sheet `GH.pause`, end card `GH.end`. Both go into `games.<VER>.js` (section 3.3, "Adding a game") |
| `63-game-race.js`, `src/css/49-game-race.css` | G-02 | Star Rally, the racing game (games file): places and tracks, rivals and catch-up, the race simulation (`rlNew`, `rlStep`; no DOM, the tests run whole races), the canvas renderer (sprites from SVG, the road as one path per colour), menu, garage, race and end card; save `S.rally` |
| `23-viz.js` | P1-10 | Math visuals |
| `31-gen-math-early.js`, `33-gen-math-mid.js`, `35-gen-math-upper.js` | P2-01+ | New math generators |
| `37-bank.js` | P1-09 | Content bank engine |
| `39b-steps.js` | P2-08 | Step-hint builders (`stepsAdd`, `stepsSub`, `stepsMul`, `stepsDiv`, `stepsEquivFrac`, `stepsCommonDen`, `stepsStory`) and prompt layouts `ST.vert`, `ST.ldiv`; the renderer is in `39-hints.js`, CSS in `src/css/39-steps.css` |
| `src/data/d-*.js` (`d-spell`, `d-gram`, `d-vocab`, `d-comp`, `d-es`, `d-disc`, `d-trace`, `d-puz-*`) | P2, P3 | Data only. Built into `data.<VER>.js` (A11, section 3.3), which loads after all code, so code may read them only inside functions (at run time), never while the script is first loading |
| `45-placement.js`, `47-trace.js`, `49-kinds.js`, `51-mastery.js`, `57-fluency.js`, `59-review.js` | P1, P2, P5 | Engines |
| `74-teasers.js`, `NN-bt-*.js` | P3 | Brain Teasers: the framework (index.html) and one file per puzzle type (built into `bt.<VER>.js`, section 3.3) |

Build order is: `src/js/*.js` sorted by name (minus the part files), then each part file (bt, games; their `src/js` sorted by name),
then `src/data/*.js` sorted by name, then `src/boot.js`.

### 3.3 Built output: index.html and five more files (A11 since v97, A11b since v105, A11c since v126)

```
index.html        shell + CSS + fonts + <script>src/js</script>                      (src minus the PARTS files below)
                  + <script src="gen.<VER>.js"></script> + <script src="gen2.<VER>.js"></script>
                  + <script src="bt.<VER>.js"></script> + <script src="games.<VER>.js"></script>
                  + <script src="data.<VER>.js"></script> + <script>src/boot.js</script>
gen.<VER>.js      question generators, part 1 (A11c): src/js/23-viz, 30-gen-math, 31-gen-math-early, 32-gen-read, 33-gen-math-mid,
                  34-gen-es, then  var GEN_VER='<VER>';
gen2.<VER>.js     question generators, part 2 (A11c): src/js/35-gen-math-upper, 36-gen-phonics, 37-bank, 37-comp, 39b-steps,
                  then  var GEN2_VER='<VER>';
bt.<VER>.js       Brain Teaser puzzle types: a <style> with src/css/NN-bt-*.css, then src/js/NN-bt-*.js, then  var BT_VER='<VER>';
games.<VER>.js    the Game Room: src/js/60-blocks, 62-hill, 64-gtimer, 66-colornum, 68-lowpoly, 70-art, 72-shapes and any NN-game-*.js (59-game-hub, 63-game-race),
                  then  var GAMES_VER='<VER>';
data.<VER>.js     src/data/*.js in filename order, then the last line  var DATA_VER='<VER>';
sw.js             cache 'starschool-<VER>', precaches ./, index.html, gen/gen2/bt/games/data.<VER>.js, manifest.json, icons
```

(The text below says "part" for gen, gen2, bt and games alike. Load order is the order of PARTS: gen, gen2, bt, games, then data.)

The rule lives in one place, `PARTS` in `tools/build.py`: a file stem and a regular expression on whole file names in `src/js` and
`src/css`. A matching file goes into `<stem>.<VER>.js` (in filename order) instead of into index.html:
- `bt`: every `src/js/NN-bt-*.js` and `src/css/NN-bt-*.css`. The framework `74-teasers.js` and `48-teasers.css` stay in index.html
  (Home needs `BT.list()` for its card, and `view()` calls `BT.stop()`).
- `gen`, `gen2` (A11c): the question generators and their helpers (`genAdd`, `genEs`, `genBank`, `genPassage`, the `VIZ` visuals, step hints ...).
  They load first, because bt, games and data may use them while loading (`d-es.js` calls `esReg`, `d-comp.js` writes `COMPSPEC`).
  Index.html's own code may call them only inside functions that run after start-up. The one table that named them at load time, `SK`
  in `38-skills.js`, wraps each generator in an arrow (`gen:lv=>genAbc(lv)`); keep doing that for a new skill whose generator is in these files.
  A new generator file named `NN-gen-*.js` is NOT picked up by itself: add it to the `gen` or `gen2` regular expression in build.py.
- `games`: the seven Game Room files listed above, and any new `src/js/NN-game-*.js` and `src/css/NN-game-*.css` (G-02: `63-game-race.js` and `49-game-race.css`, Star Rally; P4-16: `59-game-hub.js`,
  the hub and the shared game chrome, and `48-game-hub.css`). `58-playtime.js` (game time and `gameRoom()`, which calls `GH.hub()`)
  and `40-games.css` (shared by Home, the map and the rewards) stay in index.html.

How it fits together:
- All scripts are plain classic scripts: they run in this order, synchronously, and share one global scope (a `const` in one file is
  visible to the others the same way as before). This works over `file://` too, so open `index.html` directly as always.
- Load order: index.html's own code, gen, gen2, bt, games, data, boot. So a part file may use anything in index.html's code while it loads
  (`BT.reg`, `padHTML`, `ICONS`, `UI` ...), and the data file still loads after all code. index.html's code may call
  part code only inside functions that run after start-up (opening a puzzle or a game), never while loading: a `function` in a part
  file is not hoisted into index.html's script. Part code must not read data while loading either.
- A part's CSS is added by the file itself, as `<style id="css-bt">` appended to `<head>`, before its code runs. It lands after
  index.html's own CSS, which is where `49-bt-*.css` sorts anyway, so the cascade is the same as in one file. Nothing is on screen until
  `src/boot.js` runs, so the first paint already has it. Keep part CSS scoped to the part's own classes (`.mz`, `.pt-`, `.bn-` ...).
- Every file name carries `VER`, so an index.html can only ever ask for its own release's files, and no HTTP cache can hand it an older
  file under the same name. `tools/build.py` deletes every other `name.vNN.js` at the repo root.
- `src/boot.js` starts the app only if `dataReady()` (src/js/90-app.js): every stamp in `appFiles()` (`GEN_VER`, `GEN2_VER`, `BT_VER`,
  `GAMES_VER`, `DATA_VER`) exists, so the whole file ran, and equals the page's `VER`. Otherwise `dataMissing()` shows "Star School needs to finish
  updating. Connect to the internet, then tap Try again." and logs one line in the App log, such as `bt file missing (app v105)` or
  `games file v104 does not match (app v105)`. Nothing else in the save changes.
- Sizes (budgets in `tools/test.js`): index.html warn 1.2 MB / fail 1.5 MB (ROADMAP R1; the check `parts split A11c` wants it under 1.0 MB), each part file warn 400 KB / fail 800 KB,
  data file warn 1 MB / fail 2 MB, all files together warn 2 MB / fail 3 MB. `bash tools/check.sh` prints them all.
- The check `code split A11b (and data file split A11)` in `tools/test.js` covers all of this: script order, nothing of a part left in
  index.html, index.html's code loads alone and with only the data, each file's stamp, a missing or stale file refused, the precache
  list, no stale files, the budgets. It loads the built files in a fresh Node `vm` context, one script after the other, like the page.
- The check `parts split A11c` covers the generator parts: index.html under 1.0 MB, every part under its fail budget, the moved files
  in gen/gen2 and not in index.html, a fresh load of index.html + every part + data with every stamp equal to VER, a question built
  from each subject, and a missing or stale gen file refused.
- `tools/test.js` reads `PARTS` from build.py and evaluates the sources in the built order (`js` = index.html's src/js, then each part's,
  then src/data), so tests see every file.

Adding a puzzle type: name it `src/js/NN-bt-<id>.js` (and `src/css/49-bt-<id>.css`) and it goes into `bt.<VER>.js` by itself; no change
to build.py, sw.js, the shell or 90-app.js. At load it may call `BT.reg({...})` and anything else from index.html's code.

Adding a game (P4-16): name it `src/js/NN-game-<name>.js` (it goes into `games.<VER>.js`, after `59-game-hub.js`) and register it with one
`GH.reg({...})` call at load. That entry is the whole hook: the hub card, its drawn picture, the top-bar badge, the pause sheet and the end
card come from it, and the smoke `// P4-16` block and the test.js check "game room P4-16" pick it up by themselves.

```js
GH.reg({
  id: 'race', btn: 'grace', name: 'Kart Race', short: 'Race', icon: 'car', p: 'bt',      // p: play | read | es | math | disc | bt
  sky: ['sky-1', 'sky'],                       // two --sc-* scene tokens behind the picture
  art: () => '...',                            // SVG markup on a 240 x 100 grid, object-art roles var(--a-x) only (DESIGN_SYSTEM 6.5)
  sub: () => '<span>Race your kart</span>',    // one short line under the name (escape what is not a literal)
  open: () => raceMenu(),                      // the game's first screen
  lock: () => '',                              // optional: '' or why it cannot be opened yet
  tapToPlay: '[data-track="0"]',               // the button on the first screen that starts play (smoke taps it)
  saved: 'Your race is saved.',                // optional line on the time-up card
});
```

The four games registered today: Hill Climb, Coloring, Block Builder (in `59-game-hub.js`) and Star Rally (`63-game-race.js`, G-02: a
canvas game with its own loop, stopped by `view()` through `rlStop`, like `stopHC`; it is a worked example of a canvas game on `GH.reg`).

Every screen of the game starts its `view()` with `${GH.top('race', {...})}` (Back on menus; `{play: true}` gives Pause; `sub`, `tools`,
`chips`, `sound` as in 59-game-hub.js), then calls `GH.wire({quit: () => ...})` on a play screen (Quit runs it; `hold: on => ...` pauses
the game while the sheet is open). The game-time clock is `gtStart('#gtm', onEnd)` (64-gtimer.js); it holds by itself while the sheet is
open. End of a game: `GH.end('race', {title, stars, stats, lines, btns, win})`; time running out: `timeUpOverlay()`. CSS goes in
`src/css/NN-game-<name>.css`: since P4-16 the games rule also moves `NN-game-*.css` into `games.<VER>.js` (keep it scoped to the game's
own classes). Do not change `gameRoom()`; it only calls `GH.hub()`.

Adding another part file (only if a part passes its budget, or a big new on-demand area comes): one line in `PARTS` (build.py), one line
in `appFiles()` (90-app.js, same order), and the expected stems in the A11b check and smoke's `// A11` block. sw.js and the shell
follow from build.py.

Adding a data file:
1. Create `src/data/d-name.js` (data only; it may call code helpers such as `compAdd`, `GR` or `BANK.x = ...` at load time, because all
   code has already loaded). Name globals with a feature prefix. A bank shared by several files uses `var X = X || {};` (like `PUZ`).
2. Nothing in `src/js` may read it while loading: only inside functions. The A11b check loads the built code without the data file and
   fails if that throws.
3. Build. It goes into `data.<VER>.js` automatically; no change to `tools/build.py`, `sw.js` or the shell. `tools/test.js` sees it too
   (tests evaluate `src/js` + `src/data`).
4. If a test reads a built file to see that your bank shipped, read `data.<VER>.js` (`DATA_FILE` in test.js), not index.html. Likewise
   puzzle and game code is in `PART_FILES` (test.js), not in index.html.

## 4. Build, test, look

Run from anywhere:

```bash
python3 tools/build.py           # writes index.html, bt/games/data.<VER>.js, sw.js, manifest.json, icons to the repo root
node tools/test.js               # generator fuzz + data checks; must exit 0
node tools/smoke.js              # bot plays through the app in headless Chrome; must exit 0   (after P0-01)
node tools/shots.js home map question   # screenshots to tools/out/ at 600x960, 1024x600, 380x780   (after P0-01)
bash tools/check.sh              # all of the above plus size report                                (after P0-01)
node tools/puzzles/build-banks.js [sudoku|mathdoku|logic|robot] # regenerate puzzle banks into src/data/d-puz-*.js from fixed seeds (after P3-02)
node tools/puzzles/build-banks.js --check    # regenerate in memory, compare with the committed bank files byte for byte
node tools/puzzles/verify-banks.js           # re-check every stored puzzle (also part of test.js)
```

Puzzle banks (`src/data/d-puz-*.js`) are generated, but committed so the build needs no Node step. Never edit them by hand:
change the generator in `tools/puzzles/`, rerun `build-banks.js`, then `node tools/test.js`. The solver core (`csp.js`,
`human.js`, `rng.js`) is documented in the header comment of each file; BRAIN_TEASERS.md section 6 lists the files.

Smoke runs on a virtual clock (fixed day 2026-06-15 10:00, timers and `Date` run at `SMOKE_SPEED` times real time, default 8, see `tools/lib/browser.js`). Run `SMOKE_SPEED=1 node tools/smoke.js` for the real clock.

Rules:
- Never edit `index.html`, `bt.<VER>.js`, `games.<VER>.js`, `data.<VER>.js`, `sw.js` or `manifest.json` by hand. They are build output. Edit `src/` or `tools/build.py`, then build.
- Never open `index.html` in an editor or print it: it contains two base64 fonts. Do not print the other built files either (140 to 235 KB each).
- Built files are committed, because GitHub Pages serves the repo root of `main`. That includes `bt.<VER>.js`, `games.<VER>.js` and
  `data.<VER>.js`, and the deletion of the previous ones (`git add -A` stages both).
- To try the app in a browser: open `index.html` directly (`file://`); `bt`, `games` and `data.<VER>.js` must sit next to it. The service worker only registers over http(s).

## 5. Release steps (every chunk)

1. Make the change in `src/` (and tests in `tools/`).
2. Bump `VER` in `tools/build.py` by one (`'v30'` -> `'v31'`). Every release, no exceptions: the service worker cache name and the number shown at the bottom of the home screen come from it.
3. `python3 tools/build.py`
4. `node tools/test.js` and `node tools/smoke.js` (or `bash tools/check.sh`).
5. Screenshots of what you touched; look at them.
6. Go through the checklist in ROADMAP.md section 7.1.
7. Add an entry at the top of the log in `docs/PROGRESS.md` and update its "Next up" line.
8. `git add -A && git commit -m "P#-##: short title (vNN)" && git push`
9. After a minute, https://andoreza-sudo.github.io/star-school/ shows the new version at the bottom of the home screen.

How updates reach tablets: the service worker fetches the page network-first, so a tablet on wifi gets the new version on the next open
(sometimes the one after). Offline tablets keep the last version they saw. This is why `VER` must change every time.

## 6. Branches and working in parallel

- Solo, one chunk at a time: working directly on `main` is fine.
- Two workers, or a chunk that may not finish in one session: use a branch named `P#-##-short-name`.
  Before merging: rebase on `main`, bump `VER` to one more than `main`'s, rebuild, retest, then merge. Built files will conflict on rebase; resolve by rebuilding, never by hand.
  The part and data files are named after `VER`, so a renumbered build writes new `bt/games/data.vNN.js` and deletes the old ones:
  stage both (`git add -A`).
- Unfinished work: push the branch as `wip/P#-##` and write a handoff note (section 9). Do not leave `main` half done.

## 7. Coding conventions for this codebase

| Topic | Convention |
|-------|-----------|
| Language | Plain browser JavaScript, one global scope. No modules, no classes needed, no build-time transforms, no TypeScript. |
| Helpers | Use what exists: `$`, `$$`, `R(a,b)`, `pick`, `shuffle`, `esc`, `view(html)`, `fb(text, kind)`, `say(text, btn, lang)`, `SFX.*`, `save()`. Grep for a helper before writing a new one. |
| Screens | A screen is a function that calls `view(templateString)` and then wires handlers with `$('#id').onclick = ...`. `view()` replaces the whole `#app`. |
| Cleanup | If a screen starts a timer, interval, animation frame or audio loop, it must have a stop function, and `view()` must call it (follow how `stopRace` and `stopHC` are done). |
| State | Everything persistent lives in `S`; call `save()` after changing it. New fields need defaults when read. Read ROADMAP.md section 9 before touching saved data. |
| Escaping | Anything that is not a literal (child's name, words, data) goes through `esc()` before entering HTML. |
| Randomness | In generators use `rnd()`, `R`, `pick`, `shuffle`, `coin` only (after P1-01). Games may use `Math.random`. |
| Style of new code | Existing code is very dense. New files should be readable: one statement per line, lines under 140 characters, short comments on anything non-obvious. Do not reformat old code. |
| Names | New global names get a feature prefix or live in one object (`BT.*`, `VIZ.*`, `FLU.*`). Skill IDs never end in a digit. |
| CSS | Use tokens (after P4-01). Classes are short and feature-prefixed. Animate only `transform` and `opacity`. No `filter`, no `backdrop-filter`. |
| Assets | No external URLs of any kind. No image files; pictures are inline SVG. No new emoji outside `tools/emoji-allow.txt`. |
| Content pictures | Any picture of a thing in a question (counting objects, picture words, vocabulary) goes through `picFor(word, emoji)` from `src/js/15-pics.js`, never a bare emoji in `q.html`. It returns the emoji today and the drawing once object art for that word exists (P4-13+). |
| Sound | Synthesized through `SFX`. No audio files. |
| Speech | `say()` may fail silently when a voice is missing. Never make speech the only way to get information, except listening tasks with a visible fallback. |
| Kid safety | No links out, no input that leaves the device, word lists must pass the `BAD` filter, nothing scary or rude. Wrong choices are real words from a checked list, never letters changed at random; any word code makes must pass `ksBad` and `ksLegal` (src/js/20-words.js; the blocklist is hashes only, in src/data/d-kidsafe.js, never write its words in a file). |
| Sharing needs a connection | The app works offline, but share, send, email, print and upload do not. Every such button shows `onlineNote()` ("Make sure the tablet is online to share or print.") and runs its action through `needOnline(action, {block})` from `src/js/88-online.js`: offline it shows a friendly message, then stops (share, send, upload) or carries on (print, which can still save a PDF). A named check in `tools/test.js` enforces this. |
| Sizes | Touch targets at least 48 px. Test at 600x960, 1024x600, 380x780. |
| Tests | Every new generator, bank or puzzle is covered by `tools/test.js`. Every new screen is reachable by `tools/smoke.js` and has a named entry in `tools/shots.js`. |

Staying cheap (see ROADMAP.md section 10 for the full list):
- Find things with `grep -n "name" src/js/*.js | cut -c1-200`. Lines here are long; always cut.
- Read line ranges, not files: `sed -n '120,180p' src/js/50-round.js | cut -c1-400`.
- Do not read files `60-` to `72-` (the games) unless your chunk is about them.
- Look at no more than 6 screenshots per session.

## 8. Copy-paste prompts

### 8.1 Start a chunk (Sonnet or Opus)

```
You are working on Star School, an offline kids' learning app (PWA) in this repo.
Your job is exactly one chunk of the roadmap: <CHUNK ID, e.g. P0-01>.

Read, in this order, and nothing else up front:
1. docs/CONTRIBUTING.md (all of it)
2. In docs/ROADMAP.md: section 6 "How to read a chunk", the block for <CHUNK ID>, section 7.1, section 9, section 10.
   Find the block with: grep -n "<CHUNK ID>" docs/ROADMAP.md
3. The one section of CURRICULUM.md, BRAIN_TEASERS.md or DESIGN_SYSTEM.md that the chunk names, if any.
4. The top 30 lines of docs/PROGRESS.md (what shipped last, any handoff note for this chunk).

Rules:
- Check that every chunk listed under "Deps" is marked done in PROGRESS.md. If not, stop and tell me.
- Stay inside the chunk's scope and its listed files. Do not tidy, rename or refactor anything else.
  If you see another problem, note it in PROGRESS.md under "Ideas and issues" instead of fixing it.
- Keep the session small: never print or open index.html; never read a whole large source file.
  Use grep with "| cut -c1-200" and read line ranges. Do not read the games files (60-72) unless the chunk says so.
- Never break saved progress. If you touch anything stored in S, follow ROADMAP section 9 and add a fixture test.
- The app must stay fully offline: no external URLs, fonts, images or scripts.
- Follow the release steps in CONTRIBUTING section 5: bump VER, build, test, smoke, screenshots, checklist,
  PROGRESS.md entry, one commit named "<CHUNK ID>: title (vNN)", push.
- If an acceptance item fails twice, or you are past roughly 60% of your context, stop: push your work to
  branch wip/<CHUNK ID> and write a handoff note in PROGRESS.md (CONTRIBUTING section 9).

When done, reply with a short report:
- chunk ID and new version number
- what changed (3 to 6 bullets) and files touched
- test results (test.js, smoke.js, sizes) and which screenshots you checked
- anything not done, and any ideas or issues you logged
- what I should tap on the tablet to see it
```

### 8.2 Continue an unfinished chunk

```
Continue Star School chunk <CHUNK ID> from the handoff note.
Read docs/CONTRIBUTING.md, then the handoff note for <CHUNK ID> at the top of docs/PROGRESS.md,
then the chunk block in docs/ROADMAP.md (grep -n "<CHUNK ID>" docs/ROADMAP.md).
Check out branch wip/<CHUNK ID>. Do only what the note lists as remaining.
Same rules and same final report as a normal chunk (CONTRIBUTING section 8.1).
```

### 8.3 Hand one hard item to Opus

```
Star School chunk <CHUNK ID> is stuck on one acceptance item: "<paste the item>".
Read docs/CONTRIBUTING.md, the chunk block in docs/ROADMAP.md, and the handoff note in docs/PROGRESS.md.
Branch: wip/<CHUNK ID>. Fix only that item, with the smallest change that makes it pass.
Explain the cause in two or three sentences in the PROGRESS.md entry. Then finish the release steps.
```

### 8.4 Fix something Andy noticed on the tablet

```
Star School, version <vNN>. On the tablet I see this problem: <describe what you tapped and what happened>.
Read docs/CONTRIBUTING.md. Find the cause with grep (do not read whole files), fix only that,
add a test or smoke step that would have caught it, then do the release steps in section 5.
Report: cause, fix, new version.
```

## 9. Handoff note format (in PROGRESS.md)

```
### HANDOFF P#-## (date, who/model)
Branch: wip/P#-##   Last good build: vNN (not released)
Done:      - ...
Remaining: - ...
Acceptance status: item 1 pass, item 2 fail (what happens), item 3 not started
Tried and did not work: - ...
Where to look: file:function, file:function
```

## 10. Definition of done

A chunk is done when every acceptance item in its roadmap block is true, the checklist in ROADMAP.md section 7.1 is ticked,
the commit is pushed, the live site shows the new version, and PROGRESS.md says so. Not before.
