# Star School Progress Log

The running record of what has shipped. Newest entry first. Every chunk adds one entry (see CONTRIBUTING.md section 5).

**Next up:** wave 3: P1-03 and P1-11 in progress; P1-06 next (grade pick, builds on setGrade/gradeOf from P1-05).

**Current version:** v46

## Chunk status

Mark a chunk here when it ships: `P0-01 v31`. Anything not listed is not done.

- P0-01 v31
- P0-02 v32
- P0-03 v33
- P0-04 v34
- P0-05 v35
- P5-01 v36
- P4-01 v37
- P1-01 v38
- P5-04 v39
- P4-02 v40
- P1-02 v41
- FIX number pad reveal v42
- P1-09 v43
- P1-04 v44
- P1-10 v45
- P1-05 v46

## Handoff notes

(none)

## Ideas and issues

Things noticed while working that are outside the current chunk. One line each, with the chunk that noticed it.

- (P1-02, FIXED in v42) Old bug, kept on purpose (the chunk must not change behaviour): after the second wrong try on a `num` question the slot shows the child's wrong number in the orange "answer" style, not the right one (the pad handler writes `st.typed` into `#slot` after `submit` has revealed the answer; same in Speed Race after a wrong "check" tap). Fix in `KIND.num.bind` (49-kinds.js): skip the slot write when `st.lock` became true during `submit`. The voice already says the right answer.
- (P1-04) The spell keyboard is QWERTY with 10 keys in the top row; at 380 px wide each key is about 34 px wide (48 px tall). The roadmap's "44 px min keys in portrait" cannot hold for 10 columns at 380; height and gaps are as large as fits. A later pass could offer a 2-row-per-half layout if tablets in portrait complain (they get about 56 px keys at 600).
- (P1-04) Spell hint: `hintHTML` k 'next' reads `G.built`/`q.tiles` (build only); spell questions must use `{k:'say', w, s}` (validate rejects 'next').
- (P1-04) `tap` html is shown inside `.prompt`, whose font size is the huge `--big`; generators wrap content in `.tpz` (fs-6) and use `.tp` (48 px) for targets. A number line of more than 7 ticks does not fit 380 px at 48 px each.
- (P1-04) smoke/shots drive the new kinds by putting a sample into `G.q` and calling `renderQ()`; stale `next()` timers from a previous sample hit the new round, so smoke waits 2.8 s between samples.
- (P1-02) Fact Sprint (`57-fluency.js`) builds its own number pad (no check key) instead of `KIND.num`; P4-10 (keypad redesign) should move it onto `KIND.num.render/bind` so all pads stay alike.
- (P1-02) `KIND.*.right/reveal` find the answer area by fixed ids (`#slot`, `#ls0..`, `.ch`), so only one question can be on screen at a time. Fine for rounds and races; a two-question layout would need a root element passed in.

- (P1-01) `makeQ` in 50-round.js still reads `Math.random()<.3` to choose between a stored miss and a fresh question, and copies stored miss questions with `{...q}`; both are for P5-02 (spaced review), which should store `{sk,lv,seed}` and rebuild with `genQ`. Old stored misses have no `seed`.
- (P1-01) `makeQ` still declared an unused `s=SK[G.sk]` after the genQ change; removed in P1-02.
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

- (P4-02) Coin icon swapped only in chrome chips/prices (home, shop, pet care, grown-ups). `🪙` remains in `38-skills.js` (Coins skill `e`, a map node picture; P4-03 skill icons), `50-round.js` (world-finished toast "+20 🪙"; left alone because P1-02 is refactoring that file), `52-balloons.js`, and games 60/62/72 (out of scope). The other 12 risky emoji are untouched.
- (P4-02) The `.stars` chip line in `46-home.js` (stars + coins) was edited for the coin icon; P5-04 also adds to the home stat row, so expect a one-line merge there.
- (P4-02) The icon sheet is built inside `tools/shots.js` (no dev screen in the app). Icons are drawn for the 24 grid with the recipe in the `15-icons.js` header; `close` and `times` are nearly the same shape on purpose (times is slightly smaller).
- (P1-10) `VIZ.clock` is not used by `genTime` yet: the old `clockSVG` (32-gen-read.js) has raw hex colours and a different look, and the chunk allows replacing it only if identical. The new clock keeps "short red hour hand, long blue minute hand", so the hint text still fits; P2-03 (Clock Tower) should switch `genTime` to `VIZ.clock` and delete `clockSVG` and the `.clock` rule in 40-games.css.
- (P1-10) Tap visuals wider than about 340 units shrink on a 380 px phone (max-width), so their targets drop under 48 px: a fraction bar with 7-8 tap parts, or a number line with more than 6 tap values. Generators for the `tap` kind should stay within that (documented in the 23-viz.js header); P1-03/P1-04 could add a check.
- (P1-10) Number-line hops (`jumps`, arcs for "+3" on a line) are not in VIZ yet; grade 1-2 addition on a number line (P2-03/P2-04) will want them. Small add-on to `numLine` in the same style.
- (P1-10) `VIZ.base10(999)` is 404 units wide, so on a 380 px phone it scales to about 0.88 (cells about 5 px). Readable; a later chunk could stack flats when n > 599 if it looks small on a real phone.

- (P1-09) The finish screen text "Get 7 right to open the next stop" is fixed; on a 5-question passage round the pass mark is 4 (`floor(n*.7+.01)`). Reword the message from `n` when a passage skill ships (P2-25).
- (P1-09) Stored misses in `makeQ` (`{...pick(ms).q}`) keep `q.ctx` and `q.bk`, so a missed passage question comes back with its passage; P5-02 should rebuild with `bankRebuild(q.bk)` (or `genQ`) instead of copying.
- (P1-09) Forms `order`, `match`, `multi` are validated but never drawn until P1-03/P1-04 add the kinds and register `BANKF.order/match/multi=(item,id)=>question`; the data shape in CURRICULUM section 8 (`order`, `pairs`, `a` as a list) is what the builders receive.
- (P1-09) Passage rounds skip the "review an older stop at question 4 and 8" step of `makeQ` (the round is a fixed list). Boss, mix and test-out rounds use the skill's `gen`, which asks a single passage question with its panel.
- (P1-09) `tools/node_modules` is not in a fresh worktree; `check.sh` runs `npm install` itself, which needs the network.

- (P1-05) CURRICULUM 2.3 says the Spanish worlds have `g: -1` "so only order gates it", but the ROADMAP 3.2 rule (a world with `g <= S.grade` is open) would open every Spanish world for any child. Resolved with a path flag: `PATHS.es.byLevel = true` turns the grade rule off for that path (worlds open by order, progress, skip). The Discover path (P2-36) must pick one: graded (like math) or `byLevel`.
- (P1-05) Migrations 1 and 2 now read old index keys through the frozen table `MAP_V42` (00-core.js) instead of the live `NODES`. Output is identical today (test.js checks `MAP_V42` against today's maps), but with the old code, inserting Tiny Town (P2-01) would have silently moved every legacy index-keyed save's stars to the wrong stops. ROADMAP 9 rule 3 says migrations are never edited; this edit is behaviour-preserving and the only safe fix.
- (P1-05) Boss character and boss prize still come from the world index (`BOSSES[wi%4]`, `BPRIZE[(pi*4+wi)%12]` in 42-paths.js), so inserting a world changes which boss and prize a world shows (cosmetic; owned prizes stay owned and the stars are keyed by world id). P2-01 or P4-09 could pin a boss per world id.
- (P1-05) Migration 3 copies `boss<k>` to `boss_<worldId>` and `math0` to `m_meadow` and keeps the old keys, so an older cached app on an offline tablet still reads the save (rule 9). A much later compaction migration may drop them.
- (P1-05) The v42 lock rule did not open a passed stop whose previous stop was unpassed (possible only in v30 single-map saves). Passed stops are now always open, so `legacy-single-map` shows 3 more open read stops (more open, never fewer). midway, maxed and fresh are identical stop for stop.
- (P1-05) `startMix` (50-round.js) calls `curNode(p)` once per stop (quadratic). Fine at 150 stops; hoist it if the mix screen ever feels slow.
- (P1-05) Map draw with 16 fake worlds (156 stops) at 6x CPU throttle: median about 29 ms (limit 50), single runs up to about 49 ms. The strip recomputes `worldOpen`/`worldFinished` per chip and `unlocked` scans the world; a memo per draw is the next step if P4-09 adds weight.

## Log

### P1-05 Stable world IDs, grade tags, world gating, long maps (v46, 2026-11-10, Claude)
- What changed: every world has a permanent `id` and grade tag `g` (CURRICULUM 2: `m_meadow` K, `m_candy` 1, `m_reef` 1, `m_space` 2, `r_meadow` K, `r_candy` 1, `r_reef` 1, `r_space` 2, `e_plaza`/`e_fiesta`/`e_repaso` -1 with `byLevel`). Nodes carry `wid`; a boss is keyed `boss_<worldId>`; `S.wdone`, `S.skip` and the game-time repeat keys use world ids. Gating per ROADMAP 3.2 in 42-paths.js: a world is open if it is first, `g <= grade` (not on `byLevel` paths), skipped, the previous world is finished (boss beaten, all passed, or skipped), or it has progress; passed stops are always open; a stop behind the child's progress is never locked; unpassed stops in a world whose boss is beaten show a NEW tag. Test out also writes `S.skip`.
- Long maps (46-home.js): a world strip above the map (one chip per world, grouped by grade label, check or lock icon, design tokens and `ico()`), the map draws only the picked world and its neighbours, "more worlds" buttons at the ends, opens on the child's current world (or the one just played). `ptCalc` "harder world" uses `worldStep()` (grade-relative; equals the old index rule when no grade is set).
- API for P1-06 (42-paths.js header): `GRADES`, `gradeLabel(g)`, `gradeOf()` (S.grade, else 0 = K), `setGrade(g)` (validates, saves), `worldOpen`, `worldFinished`, `unlocked`, `stopNew`, `startWorld`, `curNode`, `curWorld`, `worldStep`, `worldHasProgress`, `worldId`, `buildNodes(p)` (tests).
- Saved data: migration 3 (LATEST 4): boss stars `boss<k>` copied to `boss_<worldId>`, `S.wdone` `math0` keys copied to world ids, fully passed worlds marked done, `S.ptRep` index keys (shared by all paths) moved to every path's world key. Old keys kept (rule 9). Index k always means world k of the frozen `MAP_V42` table; migrations 1 and 2 now use the same table (identical output today).
- Files: src/js/00-core.js, 42-paths.js, 46-home.js, 50-round.js, 58-playtime.js, src/css/40-games.css (strip rules, tokens only), tools/test.js (check 17 "worlds"; migration check compares key by key), tools/smoke.js (step 8), tools/shots.js (`map-worlds`), tools/build.py (VER), built output.
- Tests: test.js 17 of 17 ok (worlds: every fixture keeps every stop's stars, midway/maxed/fresh keep exact locks and current stop, legacy saves only gain open stops, migration 3 idempotent, ptRep re-key, grade gating for all 8 grades, S.skip, worldStep, a fake PreK world inserted at index 0 of every path for 5 fixtures x 6 grades = 2,400 stop checks with nothing re-locked, a stop added to a finished world is open and NEW) / contrast ok / smoke.js ok (step 8: midway math map opens on Candy Canyon at stop 9 with 4 chips, chip and "more worlds" taps switch worlds, locked stop stays locked; 16 worlds, 156 stops at 6x throttle: median 29 ms) / index.html 431 KB.
- Before/after: a scratch dump of every stop on all three maps (lock, done, current, label, stars, world titles, test-out buttons) for fresh, midway, maxed and both legacy fixtures on v42 and v46: identical for fresh, midway and maxed; legacy-single-map read gains 3 open stops (see Ideas). Screenshots map, map-read, map-es with midway and maxed at 600x960 before and after looked at side by side: same stars, locks, current stop and pet; the strip is the only new thing. Also map-worlds 380x780 and map 1024x600.
- Checklist 7.1: only P1-05 files (plus the strip CSS rules in 40-games.css, tests, built output); VER bumped; build ran; test.js and smoke.js exit 0 with no console errors and no network; screenshots looked at; midway fixture same stars, coins, pet and map progress; 431 KB; no new emoji; no new hard-coded colours. Not pushed: branch P1-05-worlds for merge; VER v46 is provisional.
- Merge: built on a parallel branch, renumbered v43 -> v46 at merge.

### P1-10 Math visuals library, core (v45, 2026-11-10, Claude)
- What changed: new `src/js/23-viz.js` with `VIZ.tenFrame(n, total, o)`, `base10(n)`, `numLine({min, max, step, labels, marks, hide, tapValues, den, w})`, `fracBar(n, d, {unit, tap, w})`, `fracCircle(n, d, {tap})`, `clock(h, m, {nums})`, `array(rows, cols)`, `dots(n, 'row'|'ten'|'dice'|'scatter', {seed, b, fade})`. Each returns one inline `<svg class="viz">` string (viewBox in phone px, no ids, defs, filters or Math.random; same input, same markup). The visual language (structure lines in ink, quantities in `--math` with a `--math-shade` rim, second set `--play`, faded = opacity .3, unknown = dashed `--brand` "?" box, round joins) and the tap-target contract (`.vt` + `data-v`, states `.sel/.right/.wrong/.vx`, 48 units) are documented in the file header for P1-11 and Phase 2. New `src/css/32-viz.css` (tokens only): sizes by `--vw` x `--vz` (1.3 on tablets) x the prompt's `--k`; interactive visuals ignore `--k`.
- Not used in generators (chunk Out). `clockSVG` in 32-gen-read.js left alone (not identical; see Ideas).
- Files: src/js/23-viz.js (new), src/css/32-viz.css (new), tools/test.js (new check "viz"), tools/shots.js (`viz` sheet, `viz-q` a ten frame in a real question), tools/check.sh (hex guard covers 32-viz.css), tools/contrast.js (6 "viz graphic on surface" 3:1 pairs), tools/build.py (VER), built output.
- Tests: check.sh ok: contrast 48 pairs / test.js 17 of 17 (viz: 893 visuals; typical inputs all under 2.5 KB, largest base10(999) 1.7 KB; tags balance, no NaN, deterministic, no filter/id/url/raw colour, tap targets at least 48x48, scatter dots never overlap over 380 layouts) / smoke ok / index.html 441,993 bytes (+22.7 KB: 23-viz.js 19.9 KB, half of it the header documentation; 32-viz.css 2.7 KB).
- Screenshots: viz and viz-q at 600x960, 1024x600, 380x780. Looked at the viz sheet (600x960 and 380x780), a clock crop after shortening the hands, viz-q at 380x780 and 1024x600: all visuals readable at 380 px, fraction and negative labels clear, tap states distinct.
- Checklist 7.1: all ticked (new files plus tests/tools and built output; midway fixture and no-network covered by smoke; no emoji added; no raw colours). Not pushed: built on branch P1-10-viz for merge; VER v45 is provisional.
- Merge: built on a parallel branch, renumbered v44 -> v45 at merge.

### P1-04 New kinds B: match, tap, spell (v44, 2026-11-10, Claude)
- What changed: three new entries at the end of `KIND` in `src/js/49-kinds.js` (marked `// ---- P1-04 kinds ----`), each with render/bind/right/retry/reveal/spoken/validate. `match`: `items` and shuffled `opts` ([{v,l,h}], 3 to 5 pairs), tap one then its partner, matched pairs get their own colour; a wrong pair submits `'!'` (first one = miss and retry, second = reveal all pairs), all pairs right submits `q.ans` (sorted values joined by `|`). `tap`: `q.html` holds elements with `data-v`; tapping submits the value (they get role=button, tabindex, Enter/Space). `spell`: `word`, optional `lang:'es'` (adds the n/accent row), `.lslots` slots in html plus a visible clue, in-app QWERTY keyboard with a backspace icon key; wrong word keeps the right start (like build). No engine change: all three use `submit(value, el)` and the existing compare.
- Files: src/js/49-kinds.js, src/css/37-kinds-b.css (new, tokens only), tools/lib/kb-samples.js (new, sample questions), tools/test.js (new check 13 plus samples in check 12), tools/shots.js (group kb-*), tools/smoke.js (step 8), tools/build.py (VER), built output.
- Tests: test.js 18 checks (see below) / smoke.js ok (steps 1-8; new: match wrong pair then pass, match two misses reveal, tap wrong then right, spell cat after a wrong start, spell es niño via the accent key; 48 px key height) / sizes in check.sh output.
- Screenshots: kb-match-half, kb-tap-word, kb-tap-line, kb-spell, kb-spell-es at the three sizes; looked at match-half 380x780 and 1024x600, spell-es 380x780, spell 1024x600, tap-line 380x780 (fixed a 7-tick row that overflowed by 8 px, and made the selected match button distinct from pair colour).
- Checklist 7.1: all ticked (midway fixture and no-network covered by smoke; no emoji added; no raw hex in new CSS).
- Left over / notes: see "Ideas and issues" (key width at 380, spell hint kind, tap font, smoke timers). Built on branch P1-04-kinds-b for merge with P1-03 (also appends to KIND); VER v44 is provisional.
- Merge: built on a parallel branch, renumbered v46 -> v44 at merge.

### P1-09 Content bank format, round hook, passage panel (v43, 2026-11-10, Claude)
- What changed: new `src/js/37-bank.js`: `BANK[id]` items and `PASS[id]` passages (format in the file header and CURRICULUM section 8), `genBank(id, lv)` (forms choice, wide, tap, spell now; order, match, multi once their kinds register `BANKF.form`), `genPassage(id, lv)` (one passage question, for gen), `passageRound(sk, id, lv)` (the round list), `bankRebuild(q.bk)`, `bankCtx(ctx)` (panel HTML), and the validators `bankItemProblems`, `bankProblems(id, {levels, min})`, `passageProblems(id)`. Item choice: live play shows never-shown items first, then least recently shown; without a round it depends on the seed only, so `genQ(sk, lv, seed)` stays reproducible. New `src/css/38-bank.css` (tokens only) and `src/data/d-demo.js` (6 demo items, 1 demo passage; no demo skill in SK).
- Round hook (50-round.js, 4 small edits): `newG` calls `bankRound()`; `start()` after `newG`: `if(SK[n.sk].round){G.pool=SK[n.sk].round(n.lv);G.n=G.pool.length}`; `renderQ` shows `${q.ctx?bankCtx(q.ctx):''}` above `#prompt`; `finish` star thresholds use `n` (10 / 8 / 7 of 10 unchanged; 5 / 4 / 3 of 5).
- Tests: test.js check "banks" (validate demo data, every question through its kind validator, seed reproducibility, `bankRebuild`, memory order, round list, panel escaping, 26 seeded bad items caught); smoke step 8 (passage round of 5, panel hide/show, 5 of 5 = 3 stars).
- Files: src/js/37-bank.js, src/js/50-round.js, src/css/38-bank.css, src/data/d-demo.js, tools/test.js, tools/smoke.js, tools/shots.js (group bank-*), tools/build.py (VER v47), built output, this file.
- Screenshots checked: bank-passage 380x780 and 1024x600, bank-passage-closed 380x780, bank-tap 380x780 (also wrote choice, spell at all sizes).
- Checklist 7.1: all ticked (midway fixture and no-network covered by smoke; no emoji added; no raw hex in new CSS; 437 KB).
- Merge: built on a parallel branch, merged after the v42 fix (renumbered v47 -> v43).

### FIX: number pad reveal shows the wrong number (v42, 2026-11-10, Claude)
- Cause: in `KIND.num.bind` (49-kinds.js) the slot was written with the typed value after `submit()`. On the second wrong try `submit()` reveals the answer, then that write put the child's wrong number back (orange "answer" style). Same in Speed Race. Pre-existing since v30; kept as-is through P1-02 on purpose.
- Fix: after a "go" tap that locked the question, leave the slot to the engine (one line).
- Test: smoke step 7 plays a math round to the first number question, enters a wrong number twice, and checks the slot shows the right answer. Proved it fails without the fix ("shows 9, expected 3").
- Tests: check.sh ok.

### P1-02 Question-kind registry (v41, 2026-11-10, Claude)
- What changed: new `src/js/49-kinds.js` with `KIND = {num, choice, build}`; each kind has `render(q)`, `bind(q, st, submit, o)`, `right(q)`, `retry(q, st, ready)`, `reveal(q)`, `spoken(q)`, `validate(q)`, and `kindProblems(q)` also reports an unknown kind. The question-object contract is documented at the top of the file. `renderQ`, `check` (right, first wrong try, reveal, spoken answer) in 50-round.js go through `KIND`; `drawBuilt` moved to `KIND.build.draw`; unused `s=SK[G.sk]` in `makeQ` removed. Speed Race (54-race.js) uses the same `render/bind/right/reveal` with options `{max:3, auto:true, quiet:true}` (its old 3-digit, auto-answer, no del sound/bump behaviour). No new kinds, no visual change, nothing in S changed.
- Files: src/js/49-kinds.js (new), src/js/50-round.js, src/js/54-race.js, tools/test.js (new check 14 "kinds"), tools/build.py (VER), built output.
- Tests: test.js 14 of 14 ok / smoke.js ok (math, read, es rounds 10/10) / index.html 398 KB
- Before/after (risk R8): a scratch harness with a seeded `Math.random` captured 419 DOM + state snapshots before and after: every skill and level at two seeds (render and hint), num/choice/build flows (del, 5-digit overflow, empty check, undo, wrong, rebuild after wrong, reveal, retry, right), a boss fight and Speed Race math/sight/es. All 419 identical. Deterministic screenshots of question, question-read, question-es, build, boss, boss question, finish, race and the three reveal states at 600x960, 1024x600, 380x780: pixel-identical except the num reveal, which also differs between two runs of the old build (prompt fit timing).
- Screenshots checked: num reveal 380x780 (before/after), build + build reveal + es question 600x960, choice reveal + race 1024x600.
- Checklist 7.1: all ticked (midway fixture and no-network covered by smoke; no emoji added; no colours added).
- Left over / notes: see "Ideas and issues" (num reveal shows the typed number, kept as is; Fact Sprint pad).
- Merge: built on a parallel branch, merged after P4-02 (renumbered v39 -> v41).

### P4-02 Icon system and first 40 icons (v40, 2026-11-10, Claude)
- What changed: new `src/js/15-icons.js`: `ICONS` (the 40 icons of DS 5.3 as SVG strings), `icoSprite()` (one hidden `<svg id="ico-sprite">` with a `<symbol id="i-name">` per icon, added before `#app` at load), and `ico(name, size=24, cls='')` returning `<svg class="ic" ...><use href="#i-name"/></svg>`. House style (header of 15-icons.js, row added to DS 5.2): solid currentColor shapes, rounded corners by stroking the inset shape, cut-outs with evenodd, second tone `var(--ic2,#fff)` only where needed. `.ic` and `.ic-coin` (gold coin: `--star-shade` with `--star-tint` face) in 20-base.css (tokens only). The risky coin emoji in chrome is now the SVG coin: home stat chip, Pet Shop chip and prices, Pet Care chip and snack prices, Grown-ups summary. Icon sheet: `node tools/shots.js icons` (every icon at 20/32/64 px on white and on `--brand`, full-page shot); shots.js gained a `care` screen and a `full` option.
- Files: src/js/15-icons.js (new), src/css/20-base.css, src/js/46-home.js, 48-shop.js, 56-petcare.js, 80-grown.js (coin swaps only), tools/test.js (new check 12), tools/shots.js (P4-02 group), tools/build.py (VER), docs/DESIGN_SYSTEM.md (one row in 5.2), docs/PROGRESS.md, built output.
- Tests: test.js 14 of 14 ok (icons: 40 icons, 6 ico() uses) / contrast ok / smoke.js ok / index.html 407,501 bytes (+13.4 KB; the 40 icons are about 10 KB)
- Screenshots: before in tools/out/before/ (home, shop, care at 600x960, 1024x600, 380x780); after: icons, home, shop, care, grown at all three sizes. Looked at icons-600x960 (sheet), home-600x960, shop-600x960, care-380x780, grown-600x960: coin chips/prices show the gold SVG coin in place of the emoji, same layout, no overflow.
- Checklist 7.1: all ticked (only P4-02 files plus the coin swaps; midway fixture and no-network covered by smoke; no emoji added; no raw hex in 20-base.css). Not pushed: built on branch P4-02-icons for merge; VER v40 is provisional.
- Left over / notes: see "Ideas and issues" (remaining coin uses; home stat row merge with P5-04). Merged after P5-04: the home streak chip now uses `ico('flame')` too.

### P5-04 Streak calendar (v39, 2026-11-10, Claude)
- What changed: new `src/js/55-streak.js` (`STRK` object: date helpers, `calc` pure streak count, `tick`, month `grid`; `streakTick()`, `streakCal(off)` screen) and `src/css/35-streak.css` (tokens only). `finish()` in 50-round.js calls `streakTick()` once per finished learning round (one line) and shows the reward line in the finish messages (one line). Home gets a flame chip (`#stkb`) beside the coins chip; tapping opens the month grid (stars on active days, moon on rest days, today outlined, back up to 4 months). Rest rule: one missed day is forgiven if the day before it was played and no other rest day is in the 7 days before it. Rewards at 3, 7, 14, 30 days: +5, +10, +20, +50 coins and a sticker, once per run (`rw` resets when the streak breaks).
- Saved: `S.streak = {days: {'Y-M-D': rounds}, best, rw}`; days trimmed to 120; read with defaults when missing or damaged (`STRK.get()`), no migration needed (additive; LATEST stays 3). Keys use the same local-time format as `today()`; day arithmetic is UTC on the calendar date so daylight saving cannot shift a day. Future-dated keys (clock set back) are ignored, never counted.
- Files: src/js/55-streak.js, src/css/35-streak.css, src/js/46-home.js, src/js/50-round.js, tools/test.js (new check 14), tools/smoke.js (step 6), tools/shots.js (`streak`, `streak-home`), tools/build.py (VER, provisional), docs/PROGRESS.md, built output.
- Tests: test.js 14 of 14 ok / smoke.js ok / index.html 401 KB
- Screenshots checked: streak (month grid) and streak-home at 380x780
- Emoji: only 🔥 ⭐ 🌙 🪙 (all already in tools/emoji-allow.txt; allowlist unchanged)
- Checklist 7.1: all ticked (midway fixture and no-network covered by smoke)
- Left over: the in-round "streak" (answers in a row) and this day streak share the word; the flame chip is plain emoji until the icon system (P4-02) lands.

### P1-01 Seedable randomness and question identity (v38, 2026-11-10, Claude)
- What changed: `mulberry32`, `let RNG`, `rnd()` in 00-core.js; `R`, `pick`, `shuffle`, `coin` now use `rnd()`. The two direct `Math.random` calls in generator files (`coin`, `genCmp` equal-roll) now use `rnd()`. New `genQ(sk,lv,seed)` in 22-qhelpers.js: seeds RNG, calls `SK[sk].gen(lv)`, restores RNG in a `finally`, stamps `q.sk`, `q.lv`, `q.seed` (uint32, random when omitted). Round engine (`startMix`, `worldPool`, review insert, `makeQ`) and Speed Race sight/Spanish questions go through `genQ`. Games, art, sound still use `Math.random`. No generator output changed; nothing in S changed (no migration).
- Files: src/js/00-core.js, 22-qhelpers.js, 32-gen-read.js, 50-round.js, 54-race.js, tools/test.js (new check 11), tools/build.py (VER).
- Tests: test.js 11 of 11 ok / smoke.js ok / index.html 377 KB
- Screenshots checked: question screen
- Checklist 7.1: all ticked
- Left over / notes: see "Ideas and issues" (P5-02 should store sk/lv/seed). Speed Race math questions are inline (not skills) and use R/coin, so they are not seedable by genQ.

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
