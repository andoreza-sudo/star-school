# DEEP-15: deepen Discover and Spanish before adding any subject (BEST-APP roadmap 15, "Gap 7")

Written 2026-11-27 by Claude, in the worktree `deep15` (VER v198). The new items are drafted and **gated**: nothing reaches a child until the
owner reads `docs/drafts/DEEP15-READ.md` and flips its status line. With the gate off the app is byte-for-byte the same in behaviour (the
DEEP-15 check compares it with an app built without the new files).

## 1. Earlier reviews

- **BEST-APP gap 7, "Thin edges"**: "Discover has 18 stops; Spanish has known gaps ... Depth beats breadth." (18 counts the three bosses;
  there are 15 stops.)
- **R-01 Discover review** (`docs/reviews/R-01-discover.md`), Should 9 and 10: no history at all, no goods and services, thin weather data,
  "Big jumps between grades": worlds only for K, 3 and 5, so "a first or second grader replays the same K-2 stops (51 to 95 questions each)
  that a kindergartener had"; "Add worlds (or levels) for grades 1-2, 4 and 6." Its standards table marks K-2 thin or missing: weather
  patterns and forecasts (K-ESS2-1, K-ESS3-2), sunlight warming (K-PS3-1), plants' needs and seed spreading (2-LS2), properties of
  materials (2-PS1), fast and slow Earth changes (2-ESS1), past and present (D2.His.1-3.K-2), goods and services (D2.Eco.1-3.K-2).
- **R-01 Spanish review** (`docs/reviews/R-01-spanish.md`): "Missing 'buenas tardes'"; single-word units are thin before Los Cuentos.

## 2. Depth audit (measured on v198 with `genQ`, the live bank memory and `pickQ`, as a round draws)

How it was measured: every stop of each path; distinct questions = distinct labels over 1,500 seeds; repeats = questions seen a second
time in a live round of 10 (least recently shown first, kinds by share), averaged over 30 to 60 rounds at the default grade.

### Gap table

| Subject | Grade | Stops of its own | Distinct items per stop | Repeats in a round of 10 | Notes |
|---|---|---|---|---|---|
| Math | Pre-K / K / 1 / 2 | 10 / 20 / 23 / 23 | median 579 (generated; 4 to 1,500) | median 0.13 | |
| Math | 3 / 4 / 5 / 6 | 27 / 28 / 19 / 18 | | | |
| Reading | Pre-K / K / 1 / 2 | 7 / 8 / 16 / 18 | median 46 (12 to 1,401) | median 0.70 | |
| Reading | 3 / 4 / 5 / 6 | 7 / 8 / 5 / 5 | | | |
| **Discover** | **K-2** (one world) | **5 for three grades** | 62 to 106 (51 to 95 choice; per topic 10 to 19) | **0.27 to 0.77** | Grades 1 and 2 have no stop of their own; Nature Trail is a K world |
| Discover | 3-4 (one world) | 5 for two grades | 74 to 176 | 0.27 to 0.67 | Grade 4 has no stop of its own |
| Discover | 5-6 (one world) | 5 for two grades | 72 to 86 | 0.30 to 0.63 | Grade 6 has no stop of its own |
| **Spanish** | every grade (one path) | 61 stops in 8 worlds | **7 to 20 words per word unit** (greet 8, body 8, family 7, color 10, food 10, clothes 10, school 10, trans 10) | **1.7 to 4.4** (median 2.8) | Grammar and story stops are deep (14 to 1,011) |

What the numbers say:

1. **Discover is not thin per stop; it is thin per grade.** Each stop already has 60 to 176 items (well over the 20 the brief asked for),
   but a 1st or 2nd grader has the same five K stops as a kindergartner: 5 stops for three grades, against 66 math and 42 reading stops for
   Pre-K to 2. The topics the standards list for grades 1-2 are missing.
2. **Discover's repeats come from the small kinds pools.** A round draws match items 15% and order items 10% of the time, but every stop
   has only 2 match items and 1 order item, so they come back within a round (the choice items, 50 to 160 per stop, never repeat).
3. **Spanish word units are the thinnest content in the app.** A round of 10 draws from 7 to 13 words with only "not the same word twice in
   a row", so a child sees about 3 repeats a round (family: 4.4). Some words a child needs are missing (buenas tardes, gris), and there
   is no unit for nature or toys.

## 3. Plan, ranked by value per effort

| Rank | Item | Value | Effort | Done here |
|---|---|---|---|---|
| 1 | Spanish: more words in the thin units (greet, body, family, color, food, animal, house, clothes, school, transport, places, verbs, opposites) | High: the thinnest content, 3 repeats a round | S: rows only, pictures exist | **Yes: 55 words in 13 units** |
| 2 | Discover: Nature Trail match and order top-up (2 more match, 1 more order per stop) | Medium: fewer repeats in the K-2 core | S | **Yes: 15 items** (repeats now 0.17 to 0.35 a round) |
| 3 | Discover: a world for grades 1-2, Discovery Garden, with the missing K-2 standards | High: grades 1-2 get their own stops; history and economics appear for the first time | M | **Yes: 6 stops, 188 items** |
| 4 | Spanish: two new units, Nature and Toys & Play | Medium | S | **Yes: 27 words** |
| 5 | Record the new lines | High for non-readers, but the audio budget is full | M plus a budget decision | No: estimate in section 6 |
| 6 | Discover worlds for grades 4 and 6 (Science Lab and Star Observatory each cover two grades) | Medium | L | No: next |
| 7 | Spanish units whose words need confuse lists (more weather and feelings words) | Low | S, but R-01s pins the confuse lists | No: left on purpose |
| 8 | Spanish culture items (R-01 Spanish Should 15) | Medium | M | No |

## 4. What was drafted

All items are in `src/data/d-deep15.js` and listed, each with its reason, in `docs/drafts/DEEP15-READ.md`.

**Discover, Discovery Garden (grades 1-2, inserted after Nature Trail; read aloud with the choices, as Nature Trail is):**

| Stop | Choice items | Sort | Match | Order | Total | Standards |
|---|---|---|---|---|---|---|
| Seeds & Plants (`sci_plant` 1) | 24 | 4 | 3 | 2 | 33 | 1-LS1, 1-LS3, 2-LS2 |
| Weather Watch (`sci_wx` 1) | 23 | 4 | 3 | 2 | 32 | K-ESS2-1, K-ESS3-2, K-PS3-1, 1-ESS1 |
| Rocks, Soil & Sand (`sci_rock` 1) | 22 | 4 | 3 | 2 | 31 | 2-PS1, 2-ESS1, 2-ESS2 |
| Ramps & Wheels (`sci_mach` 1) | 22 | 4 | 3 | 2 | 31 | K-PS2, simple machines |
| Long Ago & Today (`civ_past` 1) | 22 | 4 | 3 | 2 | 31 | C3 D2.His.1-3.K-2 |
| Goods & Jobs (`civ_work` 1) | 21 | 4 | 3 | 2 | 30 | C3 D2.Eco.1-3.K-2 |
| **Discovery Garden** | **134** | **24** | **18** | **12** | **188** | |
| Nature Trail top-up (5 stops) | | | 10 | 5 | 15 | |

Discover total: 203 items. The science list follows the
no-evolution rule: no item teaches change over time in living things; "fast and slow changes" are changes to the land, "long ago and
today" is how people lived, and fossils appear only as things found in rock.

**Spanish (the format of every unit: article, word, English, picture):**

| Unit | Words before | New | After |
|---|---|---|---|
| animal | 12 | 8 | 20 |
| food | 10 | 8 | 18 |
| body | 8 | 4 | 12 |
| family | 7 | 1 | 8 |
| color | 10 | 1 | 11 |
| greet | 8 | 2 | 10 |
| house | 11 | 6 | 17 |
| clothes | 10 | 3 | 13 |
| school | 10 | 6 | 16 |
| trans | 10 | 2 | 12 |
| place | 11 | 4 | 15 |
| verb | 12 | 6 | 18 |
| adj | 13 | 4 | 17 |
| **nature** (new; end of La Ciudad) | 0 | 14 | 14 |
| **toy** (new; end of La Casa) | 0 | 13 | 13 |
| **Total** | | **82** | |

Family stays thin: every other family word (tío, prima, niño ...) would share a picture with a word already there. Weather, feelings,
days, months and numbers are closed sets or need new confuse lists (pinned by the R-01s check), so they are left as they are.

## 5. The gate and the lazy load

**Gate (the review-gate pattern of PARENT-11, STORIES-7 and OLDER-14).** `docs/drafts/DEEP15-READ.md` has one line `status: unreviewed`.
`tools/build.py` (`deep15_on`) writes `src/js/42d-deep15on.js` with `let DEEP15_ON = 0;` until that line says
`status: reviewed <name> <YYYY-MM-DD>`, then `1`. `--words-only` and `--words-check` cover it. Tests and the smoke test set the `let` to 1.

**Where the data lives.** Discover's and Spanish's own data (`d-disc*.js`, `d-es*.js`) are in `data.v198.js`, which loads at start, so the
new items could not go there (start-up is about 2,477 KB of the 2,500 KB cap). They go in the existing lazy part **teaches** (the Spanish
and Discover lessons), which the Discover and Spanish maps already load (`teachWarm`, with teach, teach12 and teachrd):

- `src/data/d-deep15.js` (the items, 41.5 KB) and `src/js/52y-deep15.js` (`deep15Apply`, 3.7 KB) are in teaches (49,192 -> 94,416 bytes,
  under its 400 KB warning). Their last line calls `deep15Apply()`, which does nothing with the gate off.
- In `index.html`, only `42d-deep15on.js` (the flag) and `42e-deep15.js` (the hooks, 1.4 KB) and two calls in `46-home.js`:
  `d15Warm(p)` when the Discover or Spanish map opens (it loads the four parts even with lessons off, applies, and opens the map again where the child now starts)
  and `d15Open(p, i)` at the top of `open()`: a stop tapped before the part is in waits on the usual "Getting ... ready" screen
  ("Getting the new stops ready..."), then opens **by its stop id**, since the new world moves stop indexes.
- `deep15Apply` adds items at the END of existing banks and units (a saved review item keeps its bank index), defines the six new skills
  only then (so with the part not loaded, `revOk` skips their review items and nothing can draw from a missing bank), inserts the world,
  rebuilds `NODES` and moves the running round's `G.node` and the strip's `MAPW` to the same stop and world. Stars are saved by stop id,
  so none move.

**Sizes.** Start-up (index.html + gen, gen2 and data): 2,477,148 -> 2,479,031 bytes (+1,883, all in index.html; data.v198.js unchanged),
under the 2,500,000 cap. index.html 987,358 bytes (under its 1,000,000 check). teaches.v198.js 49,192 -> 94,416 bytes.

## 6. Audio estimate (needs an owner budget decision)

The audio budget is full: 9,490,378 of 9,500,000 bytes. Nothing was recorded and no budget was changed; until recorded, the tablet's voice
reads these lines (as it does for any line without a file).

| Lines | Count | Characters | Bytes per character (measured) | Estimate |
|---|---|---|---|---|
| Spanish words (81 of 82 have no recording; "la familia"... each new word's full form) | 81 | 709 | 244 for short Spanish lines (196 over all 798 Spanish lines) | about 173 KB |
| Discover: each new prompt with its choices, its hint, and every sort chip, match word and order tile (teacher voice) | 629 | 26,576 | 144.3 (1,510 teacher lines) | about 3.8 MB |
| **Total** | | | | **about 4.0 MB** |

Discover's existing questions are not recorded either (the teacher voice records lessons), so recording the Discover lines is a new
choice, not a gap of this item. The Spanish words alone (0.17 MB) are the cheap, high-value part.

## 7. Tests

- `node tools/test.js --only DEEP-15`: the gate off (state and 12 seeded questions of every Discover and Spanish stop equal to an app
  without the DEEP-15 files; the hooks do nothing); every new item well formed and answerable (one right answer, no repeated choice, no
  duplicate of an existing Discover question); the Discover rules (hint never names the answer, answer not in the prompt, read aloud in
  order, pictures on the allow list, longest-answer share under 40% per stop, no joke choices, no evolution or magic); the Spanish rules
  (article, NFC, one picture per word, no two right answers by value or picture over 400 seeds per level and grade, English plurals);
  old stars, a running round and the picked world keep their stops; repeats per round; the lazy load on a fresh page (lazyPage);
  determinism; the gate follows the status line; the read-through lists every item.
- Smoke segment `DEEP-15` (380x780 and 1024x600): gate off adds nothing; gate on, a 1st grader taps Discover, the part loads and the map
  opens on Discovery Garden, a round of Seeds & Plants by real taps, then the Spanish Toys stop (learn screen and a round).
