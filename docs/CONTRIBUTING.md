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
src/js/NN-name.js   code, concatenated in filename order into ONE <script> (one global scope, no import/export)
src/data/d-name.js  data only (word lists, banks, passages, puzzle banks); concatenated after all of src/js
src/boot.js         the two start-up lines (loadClips(); home(true);); always last
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
| `54-race.js` | 1045-1085 | Speed Race |
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
| `90-app.js` | 2427-2437 | Fullscreen, install, service worker registration |
| `src/boot.js` | 2438-2439 | `loadClips(); home(true);` (not in `src/js`; the tests leave it out) |

Files added by later chunks (names are fixed by the roadmap so everyone agrees):

| File | Chunk | Contents |
|------|-------|----------|
| `14-ui.js` | P4-04 | `UI.*` helpers that return component markup (classes in `src/css/10-components.css`) |
| `15-icons.js`, `15-pics.js`, `16-art-*.js`, `17-pets-svg.js` | P4-02, pre-wave 5, P4-13+, P4-05 | Icon sprite; `ART`/`picArt`/`picFor`; object art (`Object.assign(ART, {...})`); pet rig |
| `23-viz.js` | P1-10 | Math visuals |
| `31-gen-math-early.js`, `33-gen-math-mid.js`, `35-gen-math-upper.js` | P2-01+ | New math generators |
| `37-bank.js` | P1-09 | Content bank engine |
| `src/data/d-*.js` (`d-spell`, `d-gram`, `d-vocab`, `d-comp`, `d-es`, `d-disc`, `d-trace`, `d-puz-*`) | P2, P3 | Data only. Loaded after all code, so code may read them only inside functions (at run time), never while the script is first loading |
| `45-placement.js`, `47-trace.js`, `49-kinds.js`, `51-mastery.js`, `57-fluency.js`, `59-review.js` | P1, P2, P5 | Engines |
| `74-teasers.js`, `75-bt-*.js` | P3 | Brain Teasers |

Build order is: `src/js/*.js` sorted by name, then `src/data/*.js` sorted by name, then `src/boot.js`.

## 4. Build, test, look

Run from anywhere:

```bash
python3 tools/build.py           # writes index.html, sw.js, manifest.json, icons to the repo root
node tools/test.js               # generator fuzz + data checks; must exit 0
node tools/smoke.js              # bot plays through the app in headless Chrome; must exit 0   (after P0-01)
node tools/shots.js home map question   # screenshots to tools/out/ at 600x960, 1024x600, 380x780   (after P0-01)
bash tools/check.sh              # all of the above plus size report                                (after P0-01)
```

Smoke runs on a virtual clock (fixed day 2026-06-15 10:00, timers and `Date` run at `SMOKE_SPEED` times real time, default 8, see `tools/lib/browser.js`). Run `SMOKE_SPEED=1 node tools/smoke.js` for the real clock.

Rules:
- Never edit `index.html`, `sw.js` or `manifest.json` by hand. They are build output. Edit `src/` or `tools/build.py`, then build.
- Never open `index.html` in an editor or print it: it contains two base64 fonts.
- Built files are committed, because GitHub Pages serves the repo root of `main`.
- To try the app in a browser: open `index.html` directly (`file://`). The service worker only registers over http(s).

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
| Kid safety | No links out, no input that leaves the device, word lists must pass the `BAD` filter, nothing scary or rude. |
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
