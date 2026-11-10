# Star School Roadmap: PreK to 6th Grade

Master plan for turning Star School into a polished, professional, fully offline learning app.
Written so that any person or AI model can pick up one small chunk and ship it without other context.

Companion docs: [CURRICULUM.md](CURRICULUM.md) (what to teach), [BRAIN_TEASERS.md](BRAIN_TEASERS.md) (puzzles),
[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (look and feel), [CONTRIBUTING.md](CONTRIBUTING.md) (how to do a chunk, prompt template),
[PROGRESS.md](PROGRESS.md) (log of what has shipped).

Baseline when this plan was written: `VER = 'v30'`, one source file `src/src.html` (2,442 lines, 323 KB), built `index.html` 375 KB.

---

## 1. Vision and principles

Star School is the app a careful parent would build: a child opens a cheap tablet with no wifi, learns real grade-level
material for 15 to 20 minutes, and earns a fair amount of fun.

| # | Principle | What it means in practice |
|---|-----------|---------------------------|
| 1 | Offline always | After the first load, zero network. No CDN, no web fonts, no remote images. Everything is in the one built `index.html`. |
| 2 | Tablet first | Designed for a 7-inch, 600x960 CSS px, low-end Android tablet in Chrome. Portrait and landscape both work. Phone (380x780) must not break. |
| 3 | Kid safe | No accounts, no servers, no ads, no tracking, no links out, no free-text sharing. Grown-up area behind a hold gesture. |
| 4 | Fun first, learning real | Learning rounds are short (10 questions). Fun is earned by effort, not by grinding easy stops. |
| 5 | Mastery based | A child moves on by showing they know it. Missed items come back later (spaced review). Hints teach, they do not just reveal. |
| 6 | Never lose progress | Save data is versioned and migrated. No release may wipe or corrupt a child's stars, map or pet. |
| 7 | Audio first for little kids | PreK and K screens never require reading. Every prompt is spoken. |
| 8 | Small and fast | Built file stays under 1.5 MB. 60 fps is not required, but every tap responds within 100 ms. |
| 9 | Boring technology | Plain HTML, CSS, JS. No framework, no bundler, no runtime dependencies. Build is one Python script. |

Non-goals: accounts or cloud sync, multiplayer, teacher dashboards, typing tutor (tablets have no keyboard),
open-ended writing grading, any generative AI at runtime.

## 2. Scope decision: subjects

| Subject | In scope | Grades | Why |
|---------|----------|--------|-----|
| Math | Yes, core | PreK-6 | Fully generatable, biggest payoff, already the strongest part. |
| Reading and Language Arts | Yes, core | PreK-6 | Phonics, sight words, spelling, grammar, vocabulary, comprehension. Needs authored word lists and passages. |
| Spanish | Yes, core | Level based (any grade) | Already exists. Grows from words to phrases and simple sentences (ACTFL Novice Low to Novice High). |
| Brain Teasers | Yes, core | PreK-6 in 4 bands | Requested. Logic, spatial and number puzzles. See BRAIN_TEASERS.md. |
| Handwriting (letter and number tracing) | Yes, small | PreK-K | Touch screens are ideal for it, and it is the main missing PreK skill. |
| Discover (science, geography, civics) | Yes, stretch | K-6 | Fact banks, not generators. Useful but lower priority and every fact needs review. Ships last in Phase 2. |
| Typing | No | | No physical keyboard. Spelling uses an in-app letter pad instead. |
| Writing/composition | No | | Cannot be checked offline without AI. |

## 3. Grade bands, placement and adaptation

### 3.1 Grade values

`S.grade` is a number: `-1` PreK, `0` K, `1`..`6` for 1st to 6th. Every world on a map has a grade tag `g`.

| g | Label | Typical age | Reading assumption | Round rules |
|---|-------|-------------|--------------------|-------------|
| -1 | Pre-K | 3-5 | None. Audio only. | 6 questions, 3 choices max, big pictures |
| 0 | K | 5-6 | Letters, a few sight words | 8 questions, audio on every prompt |
| 1 | 1st | 6-7 | Simple sentences | 10 questions, audio auto-plays |
| 2 | 2nd | 7-8 | Short paragraphs | 10 questions, audio on tap |
| 3-4 | 3rd-4th | 8-10 | Independent reader | 10 questions |
| 5-6 | 5th-6th | 10-12 | Independent reader | 10 questions, multi-step items |

### 3.2 How a child is placed

1. **Setup**: grown-up or child picks a grade (one tap, 8 big buttons). Stored in `S.grade`.
2. **World gating** (chunk P1-05): a world is open if it is the first world, or its grade `g <= S.grade`, or the previous world is
   finished/skipped, or the child already has progress in it. Nothing at or below the child's grade is ever locked.
3. **Placement quiz** (chunk P1-07), optional, per subject, not offered for PreK:
   - Starts one grade below `S.grade`. Asks 4 questions sampled from one world ("testlet").
   - 3 or 4 right: move up one world. 0 or 1 right: move down one world. 2 right: one more testlet at the same world (pass at 6 of 8).
   - Stops when a failed world sits directly above a passed world, or after 5 testlets (20 questions).
   - Result: the map starts at the lowest world not passed. Earlier worlds get a "skipped" check mark (not stars) and stay playable.
   - No "wrong" feedback during placement, only neutral "Got it". Can be re-run from Grown-ups.
4. **Test out** (exists today): 9 of 10 on a world skips it. Stays.

### 3.3 How difficulty adapts (chunk P1-08)

- Per stop (`skill + level`) the app keeps a mastery record: attempts, first-try accuracy as a moving average, median answer time, days practised.
- States: `new` -> `learning` -> `practised` (>= 70% over 10+ tries) -> `mastered` (>= 90% over 20+ tries on 2+ different days).
- Inside a round, after question 5:
  - 5 of 5 first-try and fast: remaining questions become **challenge** questions from the next harder stop of the same skill. Wrong challenge answers do not cost stars.
  - 2 or fewer of 5: **support** mode. Hint shows before the first try, and half the remaining questions come from the previous level of the same skill.
- 3 wrong in a row at any time: pet offers a hint and the next question is an easier one.
- Mastered stops earn less game time on replay (already true in `ptCalc`), and are the source of spaced review questions.

## 4. Architecture decisions (already made, do not reopen without cause)

| # | Decision | Reason |
|---|----------|--------|
| A1 | Output stays ONE `index.html`. Source is split into ordered files under `src/css` and `src/js`, concatenated by `tools/build.py` in filename order. No ES modules: everything stays in one global script scope. | The single biggest cost of every AI session is reading a 323 KB file. Small files fix that. Concatenation is byte-identical to today, so risk is near zero. Service worker stays unchanged. |
| A2 | No framework, no npm runtime deps. Dev-only deps allowed in `tools/` (playwright-core). | Offline, small, long-lived. |
| A3 | Save data has a schema number `S.v` and an ordered list of migrations. Storage key `starschool-v2` never changes. | Never wipe progress. |
| A4 | Skill IDs and the meaning of each `(skill, level)` are frozen forever. New material = new level number or new skill ID. Skill IDs must not end in a digit. | Progress is keyed by `skill + level` (for example `add1`). |
| A5 | Worlds get stable string IDs (`m_meadow`). Anything saved per world uses the ID, never the index. | Lets us insert PreK worlds before existing ones. |
| A6 | Question kinds live in a registry `KIND[name] = {render, bind, reveal, validate}`. Generators only return data. | Adding kinds without touching the round engine; one validator per kind for tests. |
| A7 | All generator randomness goes through a seedable `rnd()`. A question can be regenerated from `(skill, level, seed)`. | Spaced review stores 3 small values instead of stale HTML; tests are reproducible. |
| A8 | Puzzles that need a unique solution (sudoku, MathDoku, logic grids) are generated and verified at dev time by Node tools and shipped as compact banks. Runtime only transforms and checks them. | No heavy solver on a slow tablet; uniqueness is proven by tests. |
| A9 | Fact content (grammar, vocabulary, passages, science) lives in data files `src/data/d-*.js` using one bank format, consumed by one generic generator. | Content chunks become pure data entry that Sonnet does well, and audits are easy. |
| A10 | UI chrome uses an inline SVG icon sprite and design tokens. Emoji are allowed only as content pictures, and only from an allowlist known to render on old Android. | Professional look; cheap tablets show blank boxes for newer emoji. |
| A11 | If built `index.html` passes 1.5 MB, move data banks to a second precached file. Not before. | Keep the simple model until it hurts. |

### Data model additions (all optional fields, added by migrations)

| Field | Added by | Shape |
|-------|----------|-------|
| `S.v` | P0-03 | integer schema version (3 after P0-03) |
| `S.err` | P0-05 | ring of last 20 `{t, msg, ver}` |
| `S.wdone` (re-keyed) | P1-05 | `{worldId: 1}` |
| `S.skip` | P1-05/07 | `{worldId: 1}` skipped by placement or test out |
| `S.grade` | P1-06 | -1..6 |
| `S.place` | P1-07 | `{path: {world, date, asked, right}}` |
| `S.mast` | P1-08 | `{nid: {n, p, ms, d, last}}` attempts, accuracy EWMA, median ms, distinct days, last day |
| `S.flu` | P5-01 | `{setId: {best, hist: [[day, sec, right]] (last 30)}}` |
| `S.rev` | P5-02 | `[{sk, lv, seed, label, box, due, n}]` max 150 |
| `S.streak` | P5-04 | `{days: {'YYYY-M-D': rounds}, best}` last 120 days |
| `S.log` | P5-05 | `[{d, sec, rounds, by: {math, read, es, bt, disc}}]` last 60 days |
| `S.bt` | P3-01 | `{type: {lvl, stars, seen: [], best}}`, plus `S.bt.daily` |

## 5. Phases

| Phase | Goal | Chunks | Opus |
|-------|------|--------|------|
| 0 Foundation and tooling | Safe, cheap sessions: tests, screenshots, split source, save versioning | 5 | 0 |
| 1 Architecture and content framework | Everything content needs: question kinds, grades, placement, adaptivity, visuals library | 11 | 5 |
| 2 Curriculum expansion | Math, ELA, Spanish, Discover from PreK to 6 | 37 | 2 |
| 3 Brain Teasers | Puzzle hub and 12 puzzle families | 17 | 4 |
| 4 Visual redesign | Tokens, icons, mascots, every screen restyled | 17 | 3 |
| 5 Retention | Fluency sprint, spaced review, streaks, report card, backup | 10 | 2 |
| 6 QA and release | Accessibility, performance, content audits, 1.0 | 5 | 3 |
| **Total** | | **102** | **19 (19%)** |

Sonnet does 83 chunks (81%). Opus gets only the hard cores: engine refactors, adaptive logic, solvers, and the three visual systems
that set the style everyone else copies.

The count is above a typical 40-80 because the scope is nine grade levels in four subjects and every chunk is deliberately small.
Chunks marked **STRETCH** (6 of them) can be skipped for a 1.0 release.

### 5.1 Execution order (waves)

Phase numbers group work by topic. This is the order to actually do it in. Within a wave, chunks can be done in any order
that respects the "Deps" line, but only one chunk at a time lands on `main`.

| Wave | Chunks | What the child or parent notices |
|------|--------|-----------------------------------|
| **1. Start here** | **P0-01, P0-02, P0-03, P0-04, P5-01** | Nothing breaks, then a daily "Beat your time" math sprint |
| 2 | P0-05, P5-04, P1-01, P1-02, P4-01, P4-02 | Streak calendar; first new icons |
| 3 | P1-03, P1-04, P1-05, P1-06, P1-09, P1-10, P1-11 | Grade pick at setup; nothing locked below grade |
| 4 | P1-07, P1-08, P5-02, P5-03, P5-05, P5-06 | Placement quiz, smarter rounds, spaced review, report card |
| 5 | P2-01 to P2-07 (math PreK-3), P2-15, P2-18, P2-19, P4-13 | Big content jump for younger grades, with drawn pictures for counting and core nouns |
| 6 | P4-03, P4-04, P4-05, P4-08, P4-10, P4-11 | App looks new on the main screens |
| 7 | P2-08 to P2-14 (math 4-6), P2-20 to P2-29 (ELA) | Upper grades |
| 8 | P3-01 to P3-10 | Brain Teasers open |
| 9 | P4-06, P4-07, P4-09, P4-12, P4-14 to P4-17, P2-16, P2-17 | Rest of the redesign, tracing |
| 10 | P2-30 to P2-37, P3-11 to P3-17, P5-07 to P5-10 | Spanish growth, Discover, remaining puzzles |
| 11 | P6-01 to P6-05 | Version 1.0 |

Rule for anything built after P4-01 and P4-02 land: new UI must use design tokens and `ico()` icons, never new hard-coded colors or emoji chrome.
Content pictures go through `picFor(word, emoji)` (`src/js/15-pics.js`, added before wave 5) so object art replaces emoji everywhere without touching generators. P4-13 moved from wave 9 to wave 5 for the same reason.

## 6. Chunk catalog

### How to read a chunk

- **Model**: Sonnet or Opus.
- **Size**: S = up to about 150 changed lines, M = 150 to 500, L = 500 to 900. Anything bigger must be split before starting. All sizes fit one session if the budget rules in section 10 are followed.
- **Deps**: chunks that must be shipped first.
- **Files**: names assume the split layout from P0-02 (see CONTRIBUTING.md, "Repo layout"). Code files are in `src/js/`, data files named `d-*.js` are in `src/data/`. Before P0-02, the same code is in `src/src.html`.
- **Accept**: must all be true before commit. Every chunk also has to pass the release checklist in section 7.
- **Out**: things you must not do in this chunk.

Every chunk is independently shippable: build, test, bump `VER`, commit, push. `main` must never be broken.

---

### Phase 0: Foundation and tooling

| ID | Title | Model | Size | Deps |
|----|-------|-------|------|------|
| P0-01 | Test and screenshot harness | Sonnet | M | none |
| P0-02 | Split source into ordered files (byte-identical build) | Sonnet | M | P0-01 |
| P0-03 | Save schema version, migration runner, backup | Sonnet | S | P0-02 |
| P0-04 | Generator test upgrade, emoji allowlist, size budget | Sonnet | S | P0-02 |
| P0-05 | Error guard and on-device debug log | Sonnet | S | P0-03 |

**P0-01 · Test and screenshot harness** · Sonnet · M · **DO FIRST**
- Files: new `tools/package.json` (devDependency `playwright-core` only), `tools/lib/browser.js`, `tools/shots.js`, `tools/smoke.js`, `tools/check.sh`, `tools/fixtures/*.json`, `.gitignore` (`tools/node_modules`, `tools/out`).
- Scope: `browser.js` launches system Chrome (`CHROME` env or `/usr/bin/google-chrome`), opens the built `index.html` via `file://`, can pre-seed `localStorage['starschool-v2']` from a fixture, collects console errors. `shots.js <screen...>` saves PNGs to `tools/out/` at 600x960, 1024x600, 380x780; screens are named entries that call existing globals (`home()`, `pathMap('math')`, `start('math',0)`, `gameRoom()`, `grown()`, finish screen, setup). `smoke.js` is a bot: fresh setup, plays one full round on each path by reading `G.q.ans` and tapping the right UI, opens Game Room, Grown-ups; fails on any console error or uncaught exception. Fixtures: `fresh.json`, `midway.json` (a v30 save with progress in all three paths, misses, coins, wearables), `maxed.json`. `check.sh` runs build, `test.js`, `smoke.js`, prints file sizes.
- Accept: `bash tools/check.sh` exits 0 on v30 code; `node tools/shots.js home map question` writes 9 PNGs; README section in CONTRIBUTING already describes these commands, keep names identical.
- Out: no app code changes; no browser download (use system Chrome).

**P0-02 · Split source into ordered files** · Sonnet · M · **DO SECOND**
- Files: `src/shell.html`, `src/css/*.css`, `src/js/*.js`, `src/boot.js`, empty `src/data/`, `tools/build.py`, `tools/test.js`; delete `src/src.html`.
- Scope: cut `src/src.html` at the existing `/* ---------- name ---------- */` markers into the files listed in CONTRIBUTING.md "Repo layout" (line ranges given there). `build.py` concatenates `shell` head + all `src/css/*.css` (sorted) + middle + all `src/js/*.js` (sorted) + all `src/data/*.js` (sorted, none yet) + `src/boot.js` + tail, then does the existing `__VER__`/font replacement. `test.js` reads the same concatenation without `boot.js` (replacing today's string-strip of the boot lines). Use a script to do the cutting, do not retype code.
- Accept: with `VER` unchanged, the new build's `index.html` has the same SHA-256 as the old one (record both hashes in the commit message). Then bump `VER`. `tools/check.sh` passes. No JS file over 60 KB except `60-blocks.js`, `62-hill.js`, `72-shapes.js`.
- Out: no code edits, no renames, no reordering, no reformatting.

**P0-03 · Save schema version and migrations** · Sonnet · S · **DO THIRD**
- Files: `src/js/00-core.js`, `tools/test.js`, `tools/fixtures/`.
- Scope: implement section 9 of this doc: `S.v`, `MIGRATIONS` array, `migrate()` run once at load before any other code reads `S`, one-time backup to `starschool-v2-bak` before migrating, `save()` reports failure (quota) via a flag shown in Grown-ups. Fold the two existing inline migrations (`S.maps`, `S.mapv`) in as migrations 1 and 2 without changing their behaviour. New saves start at the latest version.
- Accept: test loads each fixture (plus an empty save and a corrupt-JSON save) through `migrate()` and asserts stars, coins, maps and pet are unchanged and `S.v` is latest; corrupt JSON does not crash and does not overwrite the bad data until first `save()` (keep it in `starschool-v2-corrupt`).
- Out: no new features; do not rename the storage key.

**P0-04 · Generator test upgrade, emoji allowlist, size budget** · Sonnet · S · **DO FOURTH**
- Files: `tools/test.js`, new `tools/emoji-allow.txt`, `tools/check.sh`.
- Scope: restructure `test.js` into named checks with a non-zero exit code on failure (today it only prints). Add: every `NODES` entry points at an existing skill and level; every skill level is reachable from some node; `label` is non-empty and under 60 chars; `say` exists for every question; no `undefined`/`NaN` in `html`; choice count 2 to 4. Emoji check: every pictographic character in the source must be in `emoji-allow.txt` (seed it with what v30 uses; mark any above Unicode 11 with `# risky`). Size budget: fail if `index.html` > 1.5 MB, warn > 1.2 MB.
- Accept: `node tools/test.js` exits 0 on current code and exits 1 when a generator is deliberately broken (prove once, then revert).
- Out: do not fix content issues found; list them in PROGRESS.md.

**P0-05 · Error guard and debug log** · Sonnet · S
- Files: `src/js/00-core.js`, `src/js/80-grown.js`.
- Scope: `window.onerror` and `unhandledrejection` push `{t, msg, ver}` to `S.err` (ring of 20). If an error happens during a round, show a friendly "Oops, let's go home" button instead of a frozen screen. Grown-ups gets a collapsed "App log" section showing version, save size in KB, storage errors, last errors.
- Accept: smoke test injects a thrown error mid-round and recovers to home; log shows it.
- Out: no remote reporting of any kind.

---

### Phase 1: Architecture and content framework

| ID | Title | Model | Size | Deps |
|----|-------|-------|------|------|
| P1-01 | Seedable randomness and question identity | Sonnet | M | P0-04 |
| P1-02 | Question-kind registry | **Opus** | M | P1-01 |
| P1-03 | New kinds A: number pads, multi-select, order | Sonnet | M | P1-02 |
| P1-04 | New kinds B: match, tap, spell | Sonnet | M | P1-02 |
| P1-05 | Stable world IDs, grade tags, world gating, long maps | **Opus** | L | P0-03 |
| P1-06 | Grade pick at setup and in Grown-ups | Sonnet | M | P1-05 |
| P1-07 | Placement quiz | **Opus** | M | P1-06 |
| P1-08 | Mastery tracking and in-round adaptation | **Opus** | M | P1-01, P1-05 |
| P1-09 | Content bank format, round hook, passage panel | Sonnet | M | P1-02 |
| P1-10 | Math visuals library, core | **Opus** | M | P4-01 |
| P1-11 | Math visuals library, part 2 | Sonnet | M | P1-10 |

**P1-01 · Seedable randomness** · Sonnet · M
- Files: `00-core.js`, all `3x-gen-*.js`, `22-qhelpers.js`, `tools/test.js`.
- Scope: add `mulberry32`, `let RNG=Math.random`, `rnd()`. Make `R`, `pick`, `shuffle`, `coin` use `rnd()`. Replace every direct `Math.random` inside generator files with `rnd()`. Add `genQ(sk, lv, seed)`: sets `RNG` to a seeded generator, calls `SK[sk].gen(lv)`, restores `RNG`, stamps `q.sk`, `q.lv`, `q.seed`. Replace direct `SK[..].gen(..)` call sites in the round engine, race and boss with `genQ` (random seed when none given).
- Accept: test: for every skill and level, `genQ(sk, lv, s)` called twice gives deep-equal questions for 200 seeds; games and art code still use `Math.random` (do not touch files 52 and up).
- Out: do not change what any generator produces; do not change how misses are stored (that is P5-02).

**P1-02 · Question-kind registry** · Opus · M
- Files: `50-round.js`, `54-race.js`, new `49-kinds.js`, `tools/test.js`.
- Scope: design and implement `KIND = {num, choice, build}` where each kind has `render(q)` (returns input-area HTML), `bind(q, submit)` (wires events, calls `submit(value, el)`), `reveal(q)` (shows the answer), `retry(q)` (state after a wrong try), `validate(q)` (returns list of problems, used by tests). Rewrite `renderQ`, `check` and the reveal path to go through `KIND`. Speed Race uses the same `render/bind`. Document the question-object contract at the top of `49-kinds.js`.
- Accept: behaviour identical for all existing skills (smoke test plus before/after screenshots of one `num`, one `choice`, one `build` question in portrait and landscape); `test.js` calls `KIND[q.kind].validate`; unknown kind fails the test.
- Out: no new kinds, no visual changes.

**P1-03 · New kinds A** · Sonnet · M
- Files: `49-kinds.js`, `src/css/30-learn.css`, test.
- Scope: (1) `num` gets `q.pad`: `'int'` (default), `'dec'` (adds `.`), `'neg'` (adds `±`), `'frac'` (two stacked slots, numerator then denominator, answer string `'3/4'`); `q.sep:'R'` (two side-by-side slots for quotient and remainder, answer `'9R2'`; also used for whole + fraction); `q.eq:'value'` compares numerically (so `0.50` = `.5`, `2/4` = `1/2`) while default stays exact string. Max length `q.max` (default 4, allow up to 9). (2) `multi`: choose all that apply; `q.ans` is a sorted array of values; a "Check" button. (3) `order`: tap tiles to arrange words or numbers in order; generalizes `build` (keep `build` working). Each kind has `validate`.
- Accept: a hidden dev skill `zz_demo` (in a file excluded from maps) exercises each new kind; screenshots at the three sizes show nothing clipped; keypad keys at least 48 px.
- Out: no curriculum content.

**P1-04 · New kinds B** · Sonnet · M
- Scope: (1) `match`: two columns of 3 to 5 items, tap one then its partner; all pairs right to pass; one wrong tap counts as a miss. (2) `tap`: `q.html` contains elements with `data-v`; tapping one submits its value (number line ticks, parts of a picture, a word in a sentence). (3) `spell`: in-app A-Z keyboard (QWERTY rows, 44 px min keys in portrait, plus `ñ á é í ó ú ü` row when `q.lang=='es'`), word spoken via `say`, slots like `build`; no system keyboard ever opens.
- Accept and Out: as P1-03.

**P1-05 · Stable world IDs, grade tags, gating, long maps** · Opus · L
- Files: `42-paths.js`, `46-home.js` (`pathMap`, `drawMap`), `50-round.js` (`finish`, `testOut`, `worldPool`), `58-playtime.js` (`ptCalc` uses `nd.wi`), `00-core.js` (migration 3).
- Scope: add `id` and `g` to every world (IDs and grades are fixed in CURRICULUM.md section 2). Migration: re-key `S.wdone` from `path+index` to world id; boss progress `boss0..3` in `S.maps[path]` re-keyed to `boss_<worldId>`; `S.ptRep` keys. Gating rule from section 3.2, with `S.skip`. Passed stops are always replayable. Stops added later to a finished world show a "NEW" tag and never re-lock anything. Map: must stay fast with 16 worlds and 150 stops: show a world picker strip (one chip per world, grouped by grade) and render only the selected world plus neighbours; open on the child's current world. `ptCalc` "harder world" bonus uses grade relative to `S.grade` instead of raw index.
- Accept: fixtures `midway` and `maxed` migrate with identical visible progress (screenshot compare of all three maps before and after); a test inserts a fake world at index 0 and asserts no stop that was open becomes locked; map draw under 50 ms at 6x CPU throttle with 16 fake worlds.
- Out: no new content worlds; no visual redesign of the map (P4-09).

**P1-06 · Grade pick** · Sonnet · M
- Files: `46-home.js` (`setup`), `80-grown.js`, `00-core.js` (migration: infer `S.grade` for existing saves from the highest world with progress).
- Scope: setup gains a grade step (8 buttons, spoken labels). Grown-ups can change grade. `gradeCfg(g)` returns round length and audio rules from section 3.1; round engine uses it (`n` 6/8/10; `auto` speech forced on for g <= 0).
- Accept: fresh setup at each of the 8 grades opens the right world; existing saves get a sensible grade and lose nothing; smoke test covers PreK (6 questions) and 3rd (10).
- Out: placement quiz.

**P1-07 · Placement quiz** · Opus · M
- Files: new `45-placement.js`, `46-home.js`, `80-grown.js`.
- Scope: implement section 3.2 step 3 as a small state machine that is pure (takes world list and answers, returns next testlet or result) plus a thin UI on the round engine (no stars, no wrong buzz, progress dots). Offer after setup and from Grown-ups ("Find my level"). Writes `S.place`, `S.skip`.
- Accept: unit tests simulate students of known level (answers right with p=0.95 below their level and p=0.2 above): placed within one world of truth in 95% of 2,000 runs, never more than 20 questions; quitting midway changes nothing.
- Out: per-skill diagnostics.

**P1-08 · Mastery and adaptation** · Opus · M
- Files: new `51-mastery.js`, `50-round.js`, `58-playtime.js`.
- Scope: implement section 3.3. `S.mast` updated on every first try. `harder(node)`/`easier(node)` = next/previous stop of the same skill in path order. Challenge and support modes inside `makeQ`. `masteryState(nid)` exported for the report card and map (small badge). Keep star thresholds unchanged.
- Accept: simulation tests: a 100%-fast bot gets challenge questions from question 6; a 30% bot gets support questions and auto hints; `S.mast` stays under 30 KB with 400 stops; no change for a middling bot.
- Out: spaced review (P5-02), UI redesign.

**P1-09 · Content bank format, round hook, passage panel** · Sonnet · M
- Files: new `37-bank.js`, `50-round.js`, `49-kinds.js`.
- Scope: implement the bank format in CURRICULUM.md section 8: `BANK[id] = [items]`, `genBank(id, lv)` picks an unseen item (per-round memory, then least-recently-seen) and builds a `choice`, `multi`, `order`, `match` or `spell` question; `SK[id].round(lv)` optional hook returning a whole round (used for passages: one passage, 5 questions); `q.ctx` renders a collapsible, scrollable context panel above the prompt (passage text with tap-to-hear words). Bank validator in `test.js`: answer present, 3 distractors distinct from answer and each other, no bad words, length limits.
- Accept: demo bank of 6 items and one demo passage render correctly at all three sizes; validator catches a seeded bad item.
- Out: real content.

**P1-10 · Math visuals library, core** · Opus · M
- Files: new `23-viz.js`, `src/css/30-learn.css`.
- Scope: `VIZ` functions that return compact inline SVG strings sized by viewBox and styled with design tokens: `tenFrame(n, total)`, `base10(n)` (flats, rods, units up to 999), `numLine({min, max, step, marks, hide, tapValues})`, `fracBar(n, d, opts)`, `fracCircle(n, d)`, `clock(h, m)` (replace the current one only if identical in look), `array(rows, cols)`, `dots(n, layout)` for counting. Set the visual language: stroke weights, colors, rounded joins, how "selected" and "faded" look. Add a dev sheet `tools/shots.js viz`.
- Accept: sheet screenshot reviewed; each SVG under 2.5 KB for typical inputs; no `filter` usage; readable at 380 px width.
- Out: using them in generators.

**P1-11 · Math visuals library, part 2** · Sonnet · M
- Scope: following P1-10's style exactly: `ruler(len, unit, obj)`, `barGraph(data, scale)`, `pictograph`, `linePlot`, `shape(name, opts)` (2D set from CURRICULUM M-shape plus 3D solids), `areaGrid(w, h)`, `rectSides(w, h, labels)`, `angle(deg)`, `coordGrid({quadrants, points})`, `balance(left, right)`, `coinSVG(v)`, `tally(n)`, `tableInOut(rows)`.
- Accept and Out: as P1-10.

---

### Phase 2: Curriculum expansion

Every content chunk follows the same recipe:
1. Read the named section of CURRICULUM.md. Implement exactly those skill levels as generators in the named file.
2. Register them in `38-skills.js`, add the stops to the named world in the order given in CURRICULUM.md section 2 (create the world if it does not exist).
3. Hints for every level (`hint.k`), `say` text for every question, `label` unique per item.
4. `node tools/test.js` (3,000 samples per level, zero errors), smoke test, one screenshot per new level at 600x960 and one at 380x780.
5. Shared "Out": do not change existing levels; do not add skills not listed; no new question kinds.
6. A content chunk that is running long may ship in two commits (first half of the stops, then the rest). Each commit must pass the checklist and leave the world playable.

#### 2A Math

| ID | Title | Model | Size | Deps | Curriculum section | New file |
|----|-------|-------|------|------|--------------------|----------|
| P2-01 | PreK math: world Tiny Town | Sonnet | M | P1-06, P1-10 | M-PK | `31-gen-math-early.js` |
| P2-02 | K math: world Shape Garden | Sonnet | M | P2-01, P1-11 | M-K | same |
| P2-03 | 1st grade gaps: world Clock Tower | Sonnet | M | P1-11, P1-03 | M-1 | same |
| P2-04 | 2nd grade gaps: world Treasure Bay | Sonnet | M | P2-03 | M-2 | same |
| P2-05 | 3rd: world Multiply Mountain (facts) | Sonnet | M | P1-03 | M-3a | `33-gen-math-mid.js` |
| P2-06 | Fractions core (`frac` 2-8 generators; stops 2-5) | Sonnet | M | P1-10, P1-04 | M-frac | `33-gen-math-mid.js` |
| P2-07 | 3rd: world Fraction Forest | Sonnet | M | P2-06, P1-11 | M-3b | same |
| P2-08 | Step-by-step hint engine | **Opus** | M | P1-02 | M-hints | `39-hints.js` |
| P2-09 | 4th: world Factor Factory | Sonnet | M | P2-08, P2-05 | M-4a | `35-gen-math-upper.js` |
| P2-10 | 4th: world Decimal Desert | Sonnet | M | P2-07, P2-08 | M-4b | same |
| P2-11 | 5th: world Volcano Lab | Sonnet | M | P2-09 | M-5a | same |
| P2-12 | 5th: world Crystal Caves | Sonnet | M | P2-10 | M-5b | same |
| P2-13 | 6th: world Sky City | Sonnet | M | P2-12 | M-6a | same |
| P2-14 | 6th: world Galaxy Core | Sonnet | M | P2-13 | M-6b | same |

Extra notes:
- **P2-01** also adds the audio-first presentation: prompts auto-spoken, a big replay button, picture choices, no text needed. Accept: a non-reader can finish a round (smoke bot run with all text hidden via a debug flag still succeeds by tapping pictures after listening is simulated).
- **P2-05** depends on fact fluency sets from P5-01 if already shipped: add `mfact` and `dfact` sets to the sprint.
- **P2-08 (Opus)**: a generic `hint.k='steps'` renderer plus step builders for column addition and subtraction with regrouping, multi-digit multiplication (partial products and standard), long division (divide, multiply, subtract, bring down), equivalent fractions, common denominators. A step is `{html, say}`; the hint panel reveals one step per tap. Accept: 500 random problems per algorithm produce steps whose final line equals the answer (tested); panel fits at 380 px.
- **P2-09 to P2-14**: every multi-digit skill uses the vertical layout and step hints from P2-08. Answers with more than 4 digits use `q.max`.

#### 2B Reading and Language Arts

| ID | Title | Model | Size | Deps | Curriculum section | Files |
|----|-------|-------|------|------|--------------------|-------|
| P2-15 | Letters and early phonics: world ABC Beach | Sonnet | M | P1-06 | E-PK, E-K | `32-gen-read.js`, `20-words.js` |
| P2-16 | Tracing engine and digits 0-9 | **Opus** | M | P1-02 | E-trace | new `47-trace.js`, `d-trace.js` |
| P2-17 | Tracing data: A-Z and a-z | Sonnet | M | P2-16 | E-trace | `d-trace.js` |
| P2-18 | Phonics 1st-2nd: r-controlled, diphthongs, sight words 4-5 | Sonnet | M | P1-04 | E-phon | `20-words.js`, `32-gen-read.js` |
| P2-19 | Spelling levels 1-7 | Sonnet | M | P1-04 | E-spell | new `d-spell.js` |
| P2-20 | Grammar A (levels 1-5) | Sonnet | M | P1-09 | E-gram | new `d-gram.js` |
| P2-21 | Grammar B (levels 6-9) | Sonnet | M | P2-20 | E-gram | `d-gram.js` |
| P2-22 | Vocabulary A (levels 1-5) | Sonnet | M | P1-09 | E-vocab | new `d-vocab.js` |
| P2-23 | Vocabulary B (levels 6-10) | Sonnet | M | P2-22 | E-vocab | `d-vocab.js` |
| P2-24 | Sentences: unscramble and cloze (`sent` 3-5) | Sonnet | S | P1-03 | E-sent | `32-gen-read.js` |
| P2-25 | Comprehension framework and 2nd grade passages | Sonnet | M | P1-09 | E-comp | new `d-comp.js` |
| P2-26 | 3rd grade passages | Sonnet | M | P2-25 | E-comp | `d-comp.js` |
| P2-27 | 4th grade passages | Sonnet | M | P2-25 | E-comp | `d-comp.js` |
| P2-28 | 5th grade passages | Sonnet | M | P2-25 | E-comp | `d-comp.js` |
| P2-29 | 6th grade passages | Sonnet | M | P2-25 | E-comp | `d-comp.js` |

Extra notes:
- **P2-16 (Opus)**: stroke format (ordered polylines in a 100x100 box with start dots and direction arrows), matching algorithm (finger must pass ordered waypoints within a tolerance that scales with grade; lifting between strokes allowed; scribble rejection), kind `trace`, guided mode (animated demo, then dotted guide, then no guide), digits 0-9 authored and screenshot-verified. Accept: unit tests feed ideal, noisy (8 px jitter) and wrong (reversed, scribble) synthetic paths; ideal and noisy pass, wrong fail.
- **P2-17**: author strokes for 52 letters in the manuscript style Andika shows. Accept: `tools/shots.js trace` sheet shows every glyph over the Andika letter at 30% opacity; strokes sit on the letter.
- **P2-25 to P2-29**: 10 original passages per grade, mix of fiction and nonfiction, word counts and question types exactly per CURRICULUM E-comp. No copyrighted text, no real living people, no brands. Each chunk's accept adds: bank validator passes; every answer is supported by a sentence in the passage (the author lists the supporting sentence index in the data as `ev`, test checks it exists).

#### 2C Spanish

| ID | Title | Model | Size | Deps | Curriculum section |
|----|-------|-------|------|------|--------------------|
| P2-30 | Spanish framework: unit data format, level 3 (spell), voice fallback | Sonnet | M | P1-04 | S-frame |
| P2-31 | Vocabulary units batch 1: world La Casa | Sonnet | M | P2-30 | S-units 1 |
| P2-32 | Vocabulary units batch 2: world El Tiempo | Sonnet | M | P2-30 | S-units 2 |
| P2-33 | Units batch 3: world La Ciudad | Sonnet | M | P2-30 | S-units 3 |
| P2-34 | Phrases and grammar: world Las Frases | Sonnet | M | P2-33, P1-03 | S-gram |
| P2-35 | Mini dialogues: world Los Cuentos | Sonnet | M | P2-34, P1-09 | S-story |

Files: `34-gen-es.js`, new `d-es.js`. Accept for all: every Spanish string uses correct accents and `ñ`; gender and article agree (test: each noun entry has an explicit `el`/`la`); questions work with speech off (text shown) and when no Spanish voice exists (existing `noVoice` path).

#### 2D Discover (STRETCH)

| ID | Title | Model | Size | Deps | Curriculum section |
|----|-------|-------|------|------|--------------------|
| P2-36 | Discover path shell and Science K-2 | Sonnet | M | P1-09 | section 6, Lv 1 column (science) |
| P2-37 | Science 3-6 and Geography/Civics | Sonnet | M | P2-36 | section 6, rest of the table |

Files: new `d-disc.js`, `42-paths.js`. Accept: bank validator passes; every item has a grade tag and a topic tag; no item depends on a map image.

---

### Phase 3: Brain Teasers

Full design in BRAIN_TEASERS.md. Section numbers below refer to it.

| ID | Title | Model | Size | Deps | BT section |
|----|-------|-------|------|------|-----------|
| P3-01 | Teaser hub and puzzle framework | Sonnet | M | P1-06, P4-01 | 2, 3, 9 |
| P3-02 | Dev-time solver core and sudoku banks | **Opus** | L | P0-04 | 5.1, 6 |
| P3-03 | Sudoku UI (4x4, 6x6, 9x9) | Sonnet | M | P3-01, P3-02 | 5.1 |
| P3-04 | MathDoku generator and banks | **Opus** | M | P3-02 | 5.2 |
| P3-05 | MathDoku UI | Sonnet | S | P3-03, P3-04 | 5.2 |
| P3-06 | Logic grid generator and banks | **Opus** | M | P3-02 | 5.3 |
| P3-07 | Logic grid UI | Sonnet | M | P3-01, P3-06 | 5.3 |
| P3-08 | Mazes | Sonnet | M | P3-01 | 5.4 |
| P3-09 | Patterns, matrices, odd one out | Sonnet | M | P3-01, P1-11 | 5.5 |
| P3-10 | Number puzzles: pyramids, balance, make-the-number | Sonnet | M | P3-01 | 5.6 |
| P3-11 | Tangram engine and 8 puzzles | **Opus** | L | P3-01 | 5.7 |
| P3-12 | Tangram pack (24 more) and Shape Fit | Sonnet | M | P3-11 | 5.7 |
| P3-13 | Robot Path (pre-coding) | Sonnet | M | P3-01 | 5.8 |
| P3-14 | Riddles, Memory Match, Copy Cat | Sonnet | M | P3-01 | 5.9 |
| P3-15 | Word Search and Unscramble (STRETCH) | Sonnet | M | P3-01 | 5.10 |
| P3-16 | Spatial: cube count, rotations, symmetry (STRETCH) | Sonnet | M | P3-01 | 5.11 |
| P3-17 | Puzzle of the Day and badges | Sonnet | S | 3 puzzle types shipped | 9 |

Shared accept for P3 puzzle chunks: generator property test (1,000 puzzles per band: solvable, unique where required, within size limits);
playable by touch at 600x960 and 380x780; three hint tiers work; win screen awards stars and game time through the framework; smoke bot solves one puzzle per band using the stored solution.

---

### Phase 4: Visual redesign

Spec in DESIGN_SYSTEM.md. Section numbers below refer to it.

| ID | Title | Model | Size | Deps | DS section |
|----|-------|-------|------|------|-----------|
| P4-01 | Tokens and base layer | Sonnet | M | P0-02 | 2, 3 |
| P4-02 | Icon system and first 40 icons | **Opus** | M | P4-01 | 5 |
| P4-03 | Remaining UI icons (about 60) | Sonnet | M | P4-02 | 5 |
| P4-04 | Core components | Sonnet | M | P4-02 | 4 |
| P4-05 | Pet rig and dragon (4 stages, 5 moods) | **Opus** | L | P4-01 | 6 |
| P4-06 | Dino, bird, sea pal on the rig | Sonnet | M | P4-05 | 6 |
| P4-07 | Wearables, Pet Shop and Stickers screens | Sonnet | M | P4-05 | 6.4, 9 row 7 |
| P4-08 | Home screen | Sonnet | M | P4-04 | 9 row 2 |
| P4-09 | Map and world scenes | **Opus** | M | P4-04, P1-05 | 7, 9 row 3 |
| P4-10 | Question screen, keypads, feedback | Sonnet | M | P4-04, P1-02 | 9 row 4 |
| P4-11 | Rewards: finish, chest, stars, bosses | Sonnet | M | P4-04 | 6.3, 9 row 5 |
| P4-12 | Setup, Grown-ups, Pet Care, app icon | Sonnet | M | P4-04, P4-05 | 9 rows 1, 6, 10 |
| P4-13 | Object art set A (40 pictures) | Sonnet | M | P4-02 | 6.5 |
| P4-14 | Object art set B (40 pictures) | Sonnet | M | P4-13 | 6.5 |
| P4-15 | Object art set C (40 pictures) (STRETCH) | Sonnet | M | P4-14 | 6.5 |
| P4-16 | Game Room hub and shared game chrome | Sonnet | S | P4-04 | 9 row 8 |
| P4-17 | Motion and sound polish | Sonnet | M | P4-08, P4-10, P4-11 | 8 |

Shared accept for P4: before and after screenshots at all three sizes attached to PROGRESS.md entry by filename; no layout overflow;
contrast script passes; no new hard-coded hex colors outside the token file (grep check in `check.sh`); frame time not worse
(run `tools/perf.js` once it exists, see P6-02).
Shared out: no behaviour changes, no content changes, do not touch game internals in files 60 to 72.

Notes:
- **P4-02 (Opus)** sets the icon drawing style, the `ico(name, size)` helper, the sprite, and an icon sheet (`tools/shots.js icons`). The 40 icons are the ones on home, map and question screens (list in DS 5.3).
- **P4-05 (Opus)** builds the reusable character rig: body parts as SVG symbols, moods by swapping eyes and mouth, idle/jump/sad/cheer animations as CSS on groups, growth stages by proportions. The dragon is the reference character.
- **P4-09 (Opus)** builds the scene generator: one function draws a world backdrop from a small recipe (sky gradient, 2 to 3 hill layers, 4 to 6 props), cheap to render, distinct per world.

---

### Phase 5: Retention features

| ID | Title | Model | Size | Deps |
|----|-------|-------|------|------|
| P5-01 | Fact Sprint: 60-second "beat your time" | Sonnet | M | P0-03 |
| P5-02 | Spaced review engine | **Opus** | M | P1-01, P1-08 |
| P5-03 | Daily Review and Tricky Mix on the new engine | Sonnet | S | P5-02 |
| P5-04 | Streak calendar | Sonnet | S | P0-03 |
| P5-05 | Activity log (time on task) | Sonnet | S | P0-03 |
| P5-06 | Grown-ups report card | Sonnet | M | P5-05, P1-08 |
| P5-07 | Backup: export, import, reset | Sonnet | S | P0-03 |
| P5-08 | Daily missions v2 | Sonnet | S | P5-04 |
| P5-09 | Game-time rules v2 | Sonnet | S | P5-01, P3-01 |
| P5-10 | Multiple child profiles (STRETCH) | **Opus** | M | P5-07 |

**P5-01 · Fact Sprint** · Sonnet · M · **DO FIFTH**
- Files: new `57-fluency.js`, `46-home.js` (home button), `58-playtime.js`.
- Scope: a home button "Fact Sprint". Child picks a set that matches progress: `add10` (sums to 10), `add20`, `sub10`, `sub20` now; `mul` and `div` sets appear once those skills exist. Two modes: "60 seconds: how many can you get?" and "20 facts: beat your time". Big keypad, auto-submit when digit count matches, no hints, wrong answer shows the fact for 1 second and re-queues it. End screen: score, personal best, a 7-day sparkline, "New record!" celebration. One sprint per set per day earns game time (1 min, +1 for a new record); extra sprints are free practice. Saves to `S.flu`.
- Accept: smoke bot plays a sprint; record logic unit-tested (first run is always a record; ties are not); works in portrait and landscape; no question repeats back to back; timer pauses if the tab is hidden.
- Out: multiplication content, leaderboard between children.

**P5-02 · Spaced review engine** · Opus · M
- Scope: Leitner boxes over missed questions. Item `{sk, lv, seed, label, box 0-4, due day, n}`; intervals 0, 1, 3, 7, 21 days; right answer on review moves up a box, wrong resets to 0; leaves the system after box 4. Cap 150 items (drop highest box first). Migration converts every existing `S.prog[sk].miss` entry (which stores full question objects) into the new form and deletes the old HTML to shrink the save. `dueItems(n, path)` API; in-round injection replaces the current "30% chance of an old miss" and the question 3 and 7 review slots. If a regenerated question's label differs from the stored label (generator changed), fall back to a fresh question of the same skill and level and keep the item.
- Accept: simulated 60-day calendar test (items reappear on the right days, cap holds, save stays under 40 KB for review data); fixtures migrate with the same number of tricky items showing on home.
- Out: UI changes beyond what is needed.

**P5-03 · Daily Review** · Sonnet · S: home card "Today's review: N due" using `dueItems`; Tricky Mix becomes this. Empty state when nothing is due. Accept: with a fixture that has 12 due items, the round asks them first.

**P5-04 · Streak calendar** · Sonnet · S: a day counts when at least one learning round is finished. Home shows a flame with the count; tapping opens a month grid with stars on active days. One "rest day" per week does not break the streak (kind to kids). Rewards at 3, 7, 14, 30 days (sticker plus coins). Accept: unit tests over date sequences including month and year change and clock set backwards (never crash, never negative).

**P5-05 · Activity log** · Sonnet · S: record seconds of active learning time per day per subject (count only time with a question on screen, cap 60 s per question), rounds, questions, first-try right. Keep 60 days. Accept: test that idle time does not count; save growth under 6 KB.

**P5-06 · Report card** · Sonnet · M: Grown-ups "Report card" screen: this week vs last week (minutes, rounds, accuracy), per subject a grade-level bar (where the child is working vs chosen grade), mastery table grouped by strand (from `S.mast` and the strand tags in CURRICULUM), "Needs practice" top 5 with example items, "Recently mastered" list, fact sprint bests, streak. Plain language, no jargon. Printable via the browser (print stylesheet). Accept: screenshots with `fresh`, `midway`, `maxed` fixtures; empty states read sensibly; nothing clipped at 600x960.

**P5-07 · Backup** · Sonnet · S: Grown-ups: "Save a backup" downloads `starschool-<name>-<date>.json`; "Restore" reads a file, validates it, shows what it contains, asks to confirm, then runs migrations. "Start over" needs typing the child's name. Accept: export then import on a fresh profile reproduces identical `S`; a damaged file is rejected with a clear message.

**P5-08 · Missions v2** · Sonnet · S: three daily missions drawn from a pool that fits the grade (one learning round in the weakest subject, a fact sprint, a brain teaser, clear today's review, a perfect round). Accept: missions never ask for a feature the child has not unlocked.

**P5-09 · Game-time rules v2** · Sonnet · S: extend `ptCalc` to Brain Teasers (by puzzle difficulty and hints used), Daily Review and missions; show the "why you earned this" lines everywhere. Add a grown-up setting "learning minutes needed before Game Room opens each day". Accept: table-driven unit tests for `ptCalc`.

**P5-10 · Profiles (STRETCH)** · Opus · M: up to 4 children per tablet. Save becomes `starschool-v2` = index plus one key per child; voice clips in IndexedDB get a profile prefix; migration wraps the existing child as profile 1. Accept: fixtures migrate; switching profiles never mixes data (test); backup works per child.

---

### Phase 6: QA, accessibility, performance, release

| ID | Title | Model | Size | Deps |
|----|-------|-------|------|------|
| P6-01 | Accessibility pass | Sonnet | M | Phase 4 screens done |
| P6-02 | Low-end performance pass | **Opus** | M | most content shipped |
| P6-03 | Content audit: math | **Opus** | M | Phase 2A done |
| P6-04 | Content audit: ELA, Spanish, Discover | **Opus** | M | Phase 2B-2D done |
| P6-05 | Release 1.0 | Sonnet | S | all non-stretch chunks |

- **P6-01**: checklist in DESIGN_SYSTEM.md section 10: contrast script over all token pairs, every tappable at least 48x48 CSS px (automated scan in `tools/a11y.js` over each screen), visible focus ring, `aria-label` on icon-only buttons, `prefers-reduced-motion` honoured plus an in-app "Calm mode" switch, sound never the only signal, text never below 16 px on child screens, color never the only signal for right/wrong. Accept: `a11y.js` reports zero failures on 12 named screens.
- **P6-02 (Opus)**: add `tools/perf.js` (Chrome with 6x CPU throttle: cold start to interactive, map open, question render, memory after 30 rounds). Budgets: start under 2.5 s throttled, question render under 100 ms, no long task over 200 ms outside game loads, heap growth under 5 MB over 30 rounds. Find and fix the top offenders (likely: big innerHTML swaps, `filter: drop-shadow`, timers not cleared in `view()`, SVG sprite size). Accept: budgets met and recorded in PROGRESS.md.
- **P6-03, P6-04 (Opus)**: `tools/sample.js <skill>` prints 25 questions per level as text. The auditor reads samples for every level and every bank item for: wrong answers, two right answers among choices, ambiguous wording, grade mismatch, awkward speech text, cultural or safety issues. Fixes small things directly; files anything large as a new chunk. Accept: an audit table per skill in PROGRESS.md (level, sampled, issues, fixed).
- **P6-05**: version `1.0.0` shown next to the build number; README and in-app "About" (licenses: Andika OFL, any other font); fresh-install test and upgrade-from-v30 test on a real tablet using the checklist in section 7.2; tag the release.

## 7. Release and QA checklist

### 7.1 Every chunk (copy into the PROGRESS.md entry)

- [ ] Only the files named in the chunk were changed (plus tests and built output).
- [ ] `VER` bumped by one in `tools/build.py`.
- [ ] `python3 tools/build.py` ran; `index.html`, `sw.js`, `manifest.json` rebuilt and staged.
- [ ] `node tools/test.js` exits 0.
- [ ] `node tools/smoke.js` exits 0 with zero console errors.
- [ ] Screenshots taken at 600x960, 1024x600, 380x780 for every screen the chunk touched, and looked at.
- [ ] Loading the `midway` fixture (an old save) still shows the same stars, coins, pet and map progress.
- [ ] Built size printed; under 1.5 MB.
- [ ] No network requests at runtime (smoke test runs with network blocked).
- [ ] No new emoji outside the allowlist; no new hard-coded colors after P4-01.
- [ ] PROGRESS.md entry added (chunk ID, version, date, what changed, anything left over).
- [ ] One commit, message `P#-##: title (vNN)`. Pushed. GitHub Pages shows the new version number at the bottom of the home screen.

### 7.2 On a real tablet (Andy, after each wave)

- [ ] Open the installed app on wifi, close it, open again: bottom of home shows the new version.
- [ ] Turn on airplane mode, force-close, reopen: app loads and a round can be played.
- [ ] Old progress is still there.
- [ ] Voice works; if the Spanish voice is missing the app says so instead of going silent.
- [ ] Rotate the tablet during a question: nothing is cut off.
- [ ] Hill Climb still runs smoothly.

## 8. Risk register

| # | Risk | Likelihood | Impact | Mitigation | Owner chunk |
|---|------|-----------|--------|------------|-------------|
| R1 | Built file grows past what a cheap tablet parses quickly | Medium | Medium | Size budget in tests (1.5 MB hard, 1.2 MB warn); compact data formats; decision A11 fallback | P0-04, P6-02 |
| R2 | A release damages or wipes a child's save | Low | Very high | Versioned migrations, automatic backup key, fixture tests on every chunk, export/import | P0-03, P5-07 |
| R3 | localStorage quota or eviction | Low | High | Save stays small (target under 300 KB; review items stored as seeds); `save()` failures surfaced; backup file | P0-03, P5-02 |
| R4 | Service worker serves a stale app (this already happened with cache-first) | Medium | High | Keep network-first for navigation; always bump `VER`; single output file so there is nothing else to go stale; version visible on home; never add a second cached JS file without updating the precache list and testing an upgrade | every chunk |
| R5 | Slow or janky on low-end tablets | Medium | High | Animate only transform and opacity; no blur filters; cap particles; render one world at a time; perf script with CPU throttle | P1-05, P6-02 |
| R6 | Speech voices missing or poor (especially es-MX, and isolated letter sounds) | High | Medium | Never require speech to answer; show text alternative; avoid tasks that need isolated phonemes (use whole words); existing recorded-voice feature can cover gaps | P2-15, P2-30 |
| R7 | Emoji show as empty boxes on old Android | High | Medium | Allowlist test; replace chrome with SVG; object art sets | P0-04, P4-13+ |
| R8 | Refactor of the round engine breaks existing play | Medium | High | Do it once, early, by Opus, with before/after screenshots and smoke bot | P1-02 |
| R9 | Wrong or ambiguous content (math answer keys, grammar, Spanish, science facts) | Medium | High | Generator fuzz tests, bank validator, evidence index for passages, two Opus audits | P6-03, P6-04 |
| R10 | Two people work at once and collide on `VER` or built files | Medium | Low | One chunk on `main` at a time; work on a branch; rebase, rebuild and bump `VER` last (CONTRIBUTING) | process |
| R11 | A session runs out of credit mid-chunk | Medium | Low | Small chunks; work on a branch; handoff note format in CONTRIBUTING | process |
| R12 | World insertion re-locks progress | Low | High | Gating by grade and sticky world completion; dedicated test | P1-05 |
| R13 | Hand-drawn SVG art looks amateur | Medium | Medium | Opus sets each style once with a sheet; Sonnet copies with screenshots; strict style rules | P4-02, P4-05 |
| R14 | Copyright in content | Low | High | Only original passages and word lists; public word lists (Dolch); traditional riddles; OFL fonts | P2-25+, P3-14 |
| R15 | Too much reading for young kids | Medium | Medium | Audio-first rule, grade config, PreK smoke test with text hidden | P1-06, P2-01 |

## 9. Save-data migration rules

1. The key is `starschool-v2` forever. Voice clips stay in IndexedDB `starschool`.
2. `S.v` is the schema version. Missing means 2 (v30 and earlier).
3. `MIGRATIONS[n]` is a function that upgrades `S` from version `n` to `n+1`. They run in order at startup, before anything else reads `S`.
   Each one is idempotent, never throws on missing fields, and is never edited after release (fix mistakes with a new migration).
4. Before the first migration of a session runs, the raw old string is copied to `starschool-v2-bak` (one slot, overwritten each time).
5. Migrations may add fields, re-key, or compact. They may never delete stars, coins, map progress, owned items, pet, stickers, recordings or settings.
6. New fields are read with defaults (`S.x || default`), so an old save without the field still works.
7. Skill IDs, level meanings and world IDs are permanent (decisions A4, A5). To retire content, hide the stop; keep the ID.
8. Every chunk that touches saved fields adds or updates a fixture and a test in `tools/test.js`.
9. A save from a newer version opened by older code (tablet offline with an old cached app): old code must not crash. Keep changes additive.
10. Corrupt JSON: keep the bad string under `starschool-v2-corrupt`, start fresh, tell the grown-up in the App log.

## 10. Credit-budget guidance (keeping every session small)

The expensive things are: reading big files, looking at many screenshots, and long conversations. Rules:

| Do | Do not |
|----|--------|
| Read CONTRIBUTING.md, then only your chunk's block in this file and the one section of the companion doc it names. | Read all five docs end to end. |
| Use `grep -n "name" src/js/*.js \| cut -c1-200` to find things; lines in this codebase are very long. | `cat` any file in `src/js` over 20 KB, or ever open `index.html` (it contains base64 fonts). |
| Read specific line ranges (`sed -n '120,180p' file \| cut -c1-400`). | Read games files (`60-` to `72-`) unless the chunk says so. |
| Put new code in new files where the chunk says so. | Refactor or "tidy" neighbouring code. |
| Let scripts check things (`test.js`, `smoke.js`, sizes, hashes). | Check by reading generated output yourself. |
| Look at no more than 6 screenshots per session, at 600x960 unless the bug is elsewhere. | Screenshot every screen "just in case". |
| Generate big data (word lists, banks) in one write, then validate with the script. | Rewrite a data file several times. |
| Stop when the chunk's acceptance list is green. | Add extras. Write them in PROGRESS.md as ideas instead. |

Targets per session: read under about 1,500 lines of source, change the files listed, one build-test loop per meaningful change, finish in one sitting.
If the context is more than about 60% used and the chunk is not done: commit work to a branch `wip/P#-##`, add a handoff note to PROGRESS.md
(what is done, what is left, what was tried), and stop. The next session continues from the note.

Choosing the model: use the model named on the chunk. If Sonnet fails the same acceptance item twice, stop and hand that one item to Opus with the handoff note; do not keep retrying.

## 11. Later ideas (not planned)

Nonogram puzzles, crosswords, world map graphics for geography, cursive tracing, a second language, teacher mode with several classes,
printable worksheets, recorded human phoneme audio packs.
