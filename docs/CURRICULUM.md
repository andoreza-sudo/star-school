# Star School Curriculum: Scope and Sequence, PreK to 6

What the app teaches, in what order, and exactly what each skill level must generate.
Loosely aligned to Common Core (CCSS) Math and ELA, and ACTFL Novice levels for Spanish. "Loosely" means: same topics in the
same grades, without claiming full standards coverage.

How to use this doc: a content chunk in ROADMAP.md names one section here (for example `M-3a`). Read section 1 (rules), the world
table rows for your world in section 2, and your section. Nothing else is needed.

Grade codes: `PK` = -1, `K` = 0, `1`..`6`.

---

## 1. Rules for every generator

### 1.1 Question object (returned by `SK[id].gen(level)`)

| Field | Required | Meaning |
|-------|----------|---------|
| `kind` | yes | One of the kinds in 1.2 |
| `html` | yes | Prompt markup. Use `SLOT` for the answer blank in `num` questions. Use `VIZ.*` for pictures. |
| `say` | yes | Text for speech. Write numbers and symbols as words where the voice would stumble ("3 fourths", "5 times 4"). |
| `ans` | yes | String (or sorted array for `multi`, ordered array for `order`). |
| `label` | yes | Short unique text for this exact item, under 60 chars, e.g. `7 × 8`. Used in reports and review. Same item must always give the same label. |
| `hint` | yes | `{k:'text', s}`, `{k:'steps', steps}`, `{k:'say', w, s}`, or a picture hint kind. Must teach the method, never state the answer. |
| `choices` | for choice kinds | `[{l: label, v: value, h?: 1 if l is HTML}]`, 2 to 4 entries (3 max for PK), all `v` unique, exactly one equals `ans`. |
| `auto` | optional | `true` = speak prompt on show, `'must'` = listening is the task. Forced on for PK and K. |
| `after` | optional | Text spoken after a right answer (the word, the full fact). |
| `pad`, `eq`, `max`, `sep` | optional | `num` pad options, see 1.2 |
| `ctx` | optional | Context HTML shown in the passage panel |

Use only `rnd()`, `R(a,b)`, `pick`, `shuffle`, `coin()` for randomness (never `Math.random`), so questions can be regenerated from a seed.

### 1.2 Question kinds

| Kind | Input | Use for | Notes |
|------|-------|---------|-------|
| `num` | Number pad | Any numeric answer | `pad:'int'` default; `'dec'` adds a point; `'neg'` adds a sign key; `'frac'` gives two slots (answer `'3/4'`); `sep:'R'` gives quotient and remainder slots (answer `'9R2'`). `eq:'value'` accepts equal values (`2/4` for `1/2`); leave it off when simplest form is the point. `max` = max digits (default 4). |
| `choice` | 2-4 buttons | Pick one | `cls:'pics'` picture buttons, `'syms'` big symbols, `'wide'` long text |
| `multi` | Toggle buttons + Check | Pick all that apply | 4 to 6 options, 2 to 3 correct |
| `build` / `order` | Tap tiles into slots | Spell a word, order words or numbers | `order` takes `tiles` and `ans` array |
| `match` | Two columns | Pair words with pictures, fractions with decimals | 3 to 5 pairs |
| `tap` | Tap part of the prompt | Number line point, a word in a sentence, a shape in a scene | Elements carry `data-v` |
| `spell` | In-app keyboard | Hear and type a word | Never opens the system keyboard |
| `trace` | Finger drawing | Letters and digits | PK-K only |

### 1.3 Distractor rules

Wrong choices must be plausible mistakes, not random noise.

| Content | Distractors come from |
|---------|----------------------|
| Arithmetic results | off by 1; off by 10; wrong operation (a+b for a×b); forgot to regroup; digit reversal (36 / 63) |
| Place value | value of a neighbouring digit; the digit itself instead of its value |
| Fractions | numerator and denominator swapped; added tops and bottoms (1/2+1/3 = 2/5); unsimplified twin only when `eq` is off and the question says "simplest form" |
| Decimals | point shifted one place; longer-is-bigger error (0.25 > 0.3) |
| Time | hour and minute hands swapped; next hour; 5-minute neighbour |
| Words (reading) | same first letter, same length, same rime, one vowel changed. Must be real-looking, must pass the `BAD` word filter |
| Grammar | the common real error (goed, mouses, their/there) |
| Comprehension | a detail from the passage that answers a different question; a sensible guess not in the passage; the opposite |
| Spanish | other words from the same unit first, then earlier units |

Never: two correct choices, negative numbers before grade 6, an answer visible in the prompt, "all of the above".

### 1.4 Audio-first rule (PK and K)

No reading required. Prompt is spoken automatically and has a replay button. Choices are pictures, shapes, dots or numerals.
Hints are spoken. Round length 6 (PK) or 8 (K). Counting pictures use `VIZ.dots` or object art, at most 20 objects, never overlapping.

### 1.5 Level numbers are permanent

Existing levels (marked "exists") must not change. New levels get the next number even if they are easier (for example `add` level 4 is
kindergarten). Order of difficulty is the order of stops on the map, not the level number.

---

## 2. Worlds and stop order

Stops are listed in map order. `(x)` after a stop = exists today. Each world ends with a boss automatically.
A chunk adds its own stops at the positions shown; stops from chunks not yet shipped are simply absent.

### 2.1 Math path

| # | World id | Name | g | Stops in order (`skill level`) | Chunk |
|---|----------|------|---|-------------------------------|-------|
| 1 | `m_tiny` | Tiny Town | PK | pk_count 1, shape 1, pk_num 1, sort 1, pk_more 1, pk_count 2, pat 1, pk_num 2, sort 2, trace 1 | P2-01 (trace 1 from P2-16) |
| 2 | `m_shape` | Shape Garden | K | pk_count 3, pk_num 3, tenf 1, pk_more 2, shape 2, add 4, pat 2, tenf 2, cnt 4, shape 3, sort 3, pos 1, meas 1, tenf 3 | P2-02 |
| 3 | `m_meadow` | Number Meadow | K | add 1, cnt 1, eo 1, miss 1, sub 1, story 1 (all x) | exists |
| 4 | `m_candy` | Candy Canyon | 1 | add 2, big 1, cnt 2, cmp 1, miss 2, sub 2, story 2 (all x) | exists |
| 5 | `m_clock` | Clock Tower | 1 | pv 1, add 5, meas 2, add 6, data 1, shape 4, frac 1 | P2-03 |
| 6 | `m_reef` | Ocean Reef | 1 | add 3, time 1, big 2, coins 1, eo 2, cmp 2, time 2, sub 3, story 3 (all x) | exists |
| 7 | `m_space` | Space Station | 2 | big 3, mult 1, coins 2, cnt 3, sub 4, time 3, big 4, mult 2, cmp 3, coins 3 (all x) | exists |
| 8 | `m_bay` | Treasure Bay | 2 | pv 2, big 5, pv 3, sub 5, time 4, coins 4, meas 3, data 2, arr 1, cnt 5, coins 5, story 4 | P2-04 |
| 9 | `m_mult` | Multiply Mountain | 3 | arr 2, mfact 1, mfact 2, dfact 1, mfact 3, dfact 2, mfact 4, dfact 3, dfact 4, mbig 1, story 5 | P2-05 |
| 10 | `m_frac` | Fraction Forest | 3 | frac 2, round 1, frac 3, sub 6, geo 1, frac 4, round 2, time 5, geo 2, frac 5, sub 7, data 3, shape 5, time 6, meas 4, story 6 | P2-06 (frac), P2-07 (rest) |
| 11 | `m_factory` | Factor Factory | 4 | mfact 5, pv 4, mbig 2, big 6, dbig 1, mbig 3, sub 8, dbig 2, fact 1, mbig 4, big 7, dbig 3, fact 2, round 3 | P2-09 |
| 12 | `m_desert` | Decimal Desert | 4 | frac 6, frac 7, fop 1, frac 8, fop 2, dec 1, dec 2, ang 1, ang 2, geo 3, shape 6, meas 5, pat 4, story 7 | P2-10 |
| 13 | `m_volcano` | Volcano Lab | 5 | pv 5, mbig 5, dec 3, pv 6, dbig 4, dec 4, round 4, ooo 1, dec 5 | P2-11 |
| 14 | `m_caves` | Crystal Caves | 5 | fop 3, fop 4, geo 4, fop 5, coord 1, fop 6, meas 6, data 4, pat 5, story 8 | P2-12 |
| 15 | `m_sky` | Sky City | 6 | ratio 1, ratio 2, int 1, ratio 3, int 2, ratio 4, fop 7, int 3 | P2-13 |
| 16 | `m_galaxy` | Galaxy Core | 6 | ooo 2, alg 1, ooo 3, alg 2, geo 5, coord 2, fact 3, data 5, alg 3, story 9 | P2-14 |

`pat 3` (growing number patterns, grade 2-3) is placed at the end of `m_bay` by P2-04 after `story 4`.

### 2.2 Reading path

| # | World id | Name | g | Stops in order | Chunk |
|---|----------|------|---|----------------|-------|
| 1 | `r_abc` | ABC Beach | PK | abc 1, abc 2, trace 2, abc 3, syl 1, trace 3, abc 4 | P2-15 (trace from P2-17) |
| 2 | `r_meadow` | Letter Meadow | K | sound 1, sight 1, rhyme 1, pic 1, sound 2, build 1, sent 1 (all x), then sound 3 | exists + P2-15 |
| 3 | `r_candy` | Candy Canyon | 1 | sight 2, rhyme 2, pic 2, build 2, sent 2, comp 1 (all x), then sound 4, syl 2, spell 1 | exists + P2-15, P2-19 |
| 4 | `r_reef` | Ocean Reef | 1 | sight 3, pic 3, build 3, comp 2 (all x), then spell 2, vocab 1, gram 1 | exists + P2-19, P2-22, P2-20 |
| 5 | `r_space` | Space Station | 2 | pic 4, build 4 (x), then sight 4, pic 5, build 5, spell 3, sent 3 | exists + P2-18, P2-19, P2-24 |
| 6 | `r_workshop` | Word Workshop | 2 | sight 5, pic 6, build 6, gram 2, vocab 2, sent 4, vocab 3, gram 3, sent 5, comp 3, info 1 | P2-18, 20, 22, 24, 25 |
| 7 | `r_summit` | Story Summit | 3 | spell 4, gram 4, vocab 4, gram 5, vocab 5, comp 4, info 2 | P2-19, 20, 22, 26 |
| 8 | `r_library` | Dragon Library | 4 | spell 5, gram 6, vocab 6, vocab 7, gram 7, vocab 8, comp 5, info 3 | P2-19, 21, 23, 27 |
| 9 | `r_island` | Author Island | 5 | spell 6, gram 8, vocab 9, comp 6, info 4 | P2-19, 21, 23, 28 |
| 10 | `r_legend` | Legend Lab | 6 | spell 7, gram 9, vocab 10, comp 7, info 5 | P2-19, 21, 23, 29 |

### 2.3 Spanish path (level based: every world has `g: -1`, so only order gates it)

| # | World id | Name | Stops | Chunk |
|---|----------|------|-------|-------|
| 1 | `e_plaza` | Hola Plaza | exists | |
| 2 | `e_fiesta` | Fiesta Island | exists | |
| 3 | `e_repaso` | Gran Repaso | exists | |
| 4 | `e_casa` | La Casa | es_house 1-2, es_clothes 1-2, es_school 1-2, es_feel 1-2, then es_house 3, es_clothes 3, es_school 3 | P2-31 |
| 5 | `e_tiempo` | El Tiempo | es_days 1-2, es_months 1-2, es_weather 1-2, es_big 1-2, es_time 1-2 | P2-32 |
| 6 | `e_ciudad` | La Ciudad | es_place 1-2, es_trans 1-2, es_verb 1-2, es_adj 1-2 | P2-33 |
| 7 | `e_frases` | Las Frases | es_phrase 1-2, es_art 1-2, es_ser 1-3, es_gusta 1-2, es_sent 1-2 | P2-34 |
| 8 | `e_cuentos` | Los Cuentos | es_story 1-3 | P2-35 |

### 2.4 Discover path (stretch)

| # | World id | Name | g | Stops | Chunk |
|---|----------|------|---|-------|-------|
| 1 | `d_nature` | Nature Trail | K | sci_life 1, sci_earth 1, sci_phys 1, geo_world 1, civ 1 | P2-36 (geo, civ by P2-37) |
| 2 | `d_lab` | Science Lab | 3 | sci_life 2, sci_earth 2, sci_phys 2, geo_us 1, geo_world 2 | P2-37 |
| 3 | `d_cosmos` | Star Observatory | 5 | sci_life 3, sci_earth 3, sci_phys 3, geo_us 2, civ 2 | P2-37 |

---

## 3. Math

Existing skills and what their levels mean today (frozen):

| Skill | Levels that exist |
|-------|-------------------|
| `add` | 1 sums to 10; 2 +9, +8, +10 and doubles; 3 all single-digit facts |
| `miss` | 1 missing addend to 10; 2 to 18 |
| `sub` | 1 within 10; 2 within 18; 3 two-digit no borrowing; 4 two-digit with borrowing |
| `big` | 1 add tens or hundreds; 2 two-digit no carry; 3 two-digit with carry; 4 three-digit no carry |
| `eo` | 1 even/odd 0-20; 2 21-99 |
| `cnt` | 1 by 1s and 10s; 2 by 2s, 5s, 10s; 3 mixed, larger starts |
| `story` | 1 add to 10; 2 add/subtract to 18; 3 slightly larger |
| `cmp` | 1 compare 0-20; 2 10-99; 3 100-999 |
| `time` | 1 o'clock; 2 half past; 3 quarter hours |
| `coins` | 1 pennies, nickels; 2 + dimes; 3 + quarters (to 99 cents) |
| `mult` | 1 equal groups of 2, 5, 10; 2 groups up to 5x5 |

### M-PK: Pre-K (chunk P2-01)

| Skill | Lv | Spec | Kind | Sample (spoken) | Hint |
|-------|----|------|------|-----------------|------|
| `pk_count` | 1 | 1-5 identical objects in a row. Choices: 3 numerals (answer, answer±1 within 1-5, one other). | choice syms | "How many ducks?" [3 ducks] -> 2, 3, 4 | Objects pulse one at a time while the voice counts |
| `pk_count` | 2 | 1-10 objects, scattered (non-overlapping grid jitter). Choices: answer, ±1, ±2. | choice syms | "How many stars?" | same |
| `pk_num` | 1 | Hear a number 0-5, tap the numeral. 3 choices. | choice syms, `auto:'must'` | "Tap the number four." | Show that many dots |
| `pk_num` | 2 | 0-10. Distractors include look-alikes (6/9, 1/7). | same | "Tap the number nine." | same |
| `pk_more` | 1 | Two groups of 1-5 objects, difference >= 2. Ask "Which has more?" Tap a group. | tap | "Which plate has more cookies?" | Line the objects up in two rows |
| `sort` | 1 | 4 items, 3 share colour or shape, 1 differs. | choice pics | "Which one does not belong?" | "Look at the colours." |
| `sort` | 2 | Size and length: big/small, long/short, tall/short. 2-3 choices. | choice pics | "Tap the biggest ball." | |
| `shape` | 1 | Hear circle, square, triangle or rectangle; tap it. 3 choices, random colours, upright. | choice pics | "Tap the triangle." | "A triangle has 3 sides." with sides flashing |
| `pat` | 1 | AB pattern of 5 items (colours or shapes), pick the 6th. 2-3 choices. | choice pics | "What comes next?" red blue red blue red ? | Voice chants the pattern |

### M-K: Kindergarten (chunk P2-02) (CCSS K.CC, K.OA, K.NBT, K.MD, K.G)

| Skill | Lv | Spec | Kind | Sample | Hint |
|-------|----|------|------|--------|------|
| `pk_count` | 3 | 11-20 objects in ten-frame layout (rows of 5). | num | "How many?" [14] | "One full ten and 4 more." |
| `pk_num` | 3 | Hear 11-20, tap numeral. Distractors: reversed (12/21), teen/ty (13/30). 4 choices. | choice | "Tap fifteen." | |
| `pk_more` | 2 | Groups 1-10, difference >= 1, ask more, fewer, or same (same in 15% of items). | tap / choice | "Which has fewer?" | pair up objects |
| `tenf` | 1 | Ten frame with n counters 0-10. How many? | num | [7 on frame] | "5 on top, then count on." |
| `tenf` | 2 | Ten frame with n (1-9). How many more to make 10? | num | [6] -> 4 | "Count the empty boxes." |
| `tenf` | 3 | Two frames: full ten + n (1-9). What number? Also reverse: "10 and how many make 16?" | num | [10 + 3] -> 13 | |
| `add` | 4 | Sums within 5, including +0. Horizontal with dot pictures. | num | 2 + 3 = ? | blocks |
| `cnt` | 4 | Count on or back by 1 within 0-20 from any start; one blank among 5 numbers; 40% backward. | num | 13, 12, _, 10, 9 | "Counting back: one less each time." |
| `shape` | 2 | Add hexagon, rhombus, trapezoid, oval. Shapes rotated and stretched. "Tap the hexagon." 4 choices. | choice pics | | "A hexagon has 6 sides." |
| `shape` | 3 | Solids: cube, sphere, cone, cylinder. Name -> picture, and real object -> solid (ball, can, box, party hat). | choice pics | "Which one is shaped like a can?" | |
| `pat` | 2 | AAB, ABB, ABC patterns, 6-7 shown, pick next. 3 choices. | choice pics | | |
| `sort` | 3 | Category: 3 of one kind (animals, food, vehicles, clothes) + 1 other. | choice pics | "Which does not belong?" | "Three of these are animals." |
| `pos` | 1 | Scene with an object above, below, beside, in front of, behind, between. "Tap the one ABOVE the table." | tap | | word spoken slowly |
| `meas` | 1 | Two or three bars or objects: longer, shorter, taller, heavier (scale tipped). | tap | "Tap the longer pencil." | align left edges |

### M-1: Grade 1 gaps (chunk P2-03) (1.NBT, 1.OA, 1.MD, 1.G)

| Skill | Lv | Spec | Kind | Sample | Hint |
|-------|----|------|------|--------|------|
| `pv` | 1 | Base-ten picture (1-9 rods, 0-9 units) -> number; "How many tens in 47?"; "30 + 6 = ?" Mix evenly. | num | [4 rods, 7 units] -> 47 | "Count the rods by tens first." |
| `add` | 5 | Three addends, sum <= 20, two of them make ten or a double in 60% of items. | num | 6 + 3 + 4 = ? | "Look for a pair that makes 10." |
| `add` | 6 | Mental: two-digit +10, -10, + multiple of 10 (sum <= 99), +/- within the same ten (34 + 5). | num | 47 + 10 = ? | "Only the tens digit changes." |
| `meas` | 2 | Object above a row of unit cubes or paper clips (1-12 units). How many units long? | num | [pencil over 7 cubes] | |
| `data` | 1 | Picture graph, 3 categories, values 1-8, one symbol = 1. Ask: how many X; most/least; how many more X than Y; total of two. | num / choice | "How many more cats than dogs?" | "Count each row, then find the difference." |
| `shape` | 4 | "How many sides?" / "How many corners?" for triangle, square, rectangle, pentagon, hexagon, trapezoid; and "Which shape has 4 sides?" | num / choice | | sides flash one by one |
| `frac` | 1 | Circles and rectangles cut in 2 or 4 parts, equal or unequal. "Which shows halves?" "Which shows fourths?" "Is it cut into equal parts?" | choice pics | | "Equal shares are the same size." |

### M-2: Grade 2 gaps (chunk P2-04) (2.NBT, 2.MD, 2.OA, 2.G)

| Skill | Lv | Spec | Kind | Sample | Hint |
|-------|----|------|------|--------|------|
| `pv` | 2 | Base-ten picture with flats, rods, units (100-999, include zeros in tens or ones 30% of items) -> number; "What is the value of the 5 in 352?" (choice: 5, 50, 500). | num / choice | | |
| `pv` | 3 | Expanded form to 999: `400 + 30 + 7 = ?`; `600 + ? + 2 = 652`; "Which is 508?" | num | | "Hundreds, then tens, then ones." |
| `big` | 5 | 3-digit + 3-digit, regroup in ones and/or tens, sum <= 999. Vertical. | num | 367 + 258 | steps |
| `sub` | 5 | 3-digit - 3-digit, no regrouping. Vertical. | num | 786 - 432 | |
| `time` | 4 | Analog clock to the nearest 5 minutes -> pick digital time (4 choices, distractors per 1.3). | choice | | "The minute hand: count by 5s from the 12." |
| `coins` | 4 | Dollar bills (1, 5) and coins up to $9.99. "How much?" Pick from 4 amounts written `$3.45`. | choice | | count big to small |
| `coins` | 5 | Making change: price P (5 to 95 cents, multiples of 5), paid $1.00. Change in cents? Later half: paid $5, price whole dollars + 50 cents. | num | "A toy costs 65 cents. You pay 1 dollar." -> 35 | "Count up from 65 to 100." |
| `meas` | 3 | Ruler picture (inches 0-12 or cm 0-20), object starting at 0 (70%) or at a non-zero mark (30%). Length? | num | | "Subtract where it starts from where it ends." |
| `data` | 2 | Bar graph, 4 categories, scale 1, values 0-10. Same question set as `data 1` plus "how many in all". | num | | |
| `arr` | 1 | Array of dots r x c, r and c in 2-5. "How many in all?" with "3 rows of 4" shown. | num | | "Add 4 + 4 + 4." |
| `cnt` | 5 | Skip count by 3s, 4s, 100s; 5 terms within 1000, one blank. | num | 300, 400, _, 600 | |
| `story` | 4 | Two-step add/subtract within 100, names from `S.name`/buddy. Templates: get some then lose some; compare then total. | num | "Mia has 34 stickers. She gets 20 more, then gives away 12." | "Do one step at a time." steps |
| `pat` | 3 | Growing number pattern, rule +2..+10 or -2..-10, start 0-50, 4 terms shown, give the 5th. | num | 7, 12, 17, 22, ? | "What is added each time?" |

### M-3a: Grade 3 multiplication and division (chunk P2-05) (3.OA)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `arr` | 2 | Array up to 6x9 -> choose the multiplication sentence (distractors: r+c, (r+1)xc, rxr); and "4 x 6 = 6 x ?" | choice / num | |
| `mfact` | 1 | a x b with one factor in {0, 1, 2, 5, 10}, other 0-10. Horizontal and vertical. | num | 5 x 7 |
| `mfact` | 2 | One factor in {3, 4}, other 0-10. 20% review of level 1. | num | 4 x 8 |
| `mfact` | 3 | One factor in {6, 7, 8, 9}, other 2-10. 20% review. | num | 7 x 8 |
| `mfact` | 4 | All facts 0-10; 35% as missing factor `6 x ? = 42`. | num | |
| `dfact` | 1 | Dividend = d x q, d in {1, 2, 5, 10}, q in 1-10. | num | 35 ÷ 5 |
| `dfact` | 2 | d in {3, 4}. | num | |
| `dfact` | 3 | d in {6, 7, 8, 9}. | num | |
| `dfact` | 4 | All; 35% as `? ÷ 7 = 6` or `42 ÷ ? = 6`. | num | |
| `mbig` | 1 | One digit x multiple of 10 (10-90), then x multiple of 100. | num | 6 x 40 |
| `story` | 5 | One-step x or ÷ within 100: equal groups, arrays, sharing. 4 templates each. | num | "24 cookies shared by 4 friends. How many each?" |

Hints: `mfact` shows the skip-count row and, for 6-9, a known-fact strategy ("7 x 8 = 7 x 7 + 7"). `dfact` hint: "Think: 5 times what makes 35?"

### M-frac: Fractions core (chunk P2-06) (3.NF)

`frac 1` ships in P2-03. P2-06 writes the generators for levels 2-8 and adds stops 2-5; P2-10 only adds the stops for levels 6-8. Fractions are written stacked using a `.fr` span (numerator over a bar over denominator), spoken as "3 fourths".

| Lv | G | Spec | Kind | Sample |
|----|---|------|------|--------|
| 2 | 3 | Bar or circle with d parts (2, 3, 4, 6, 8), n shaded. "What fraction is shaded?" Also name -> picture. | num frac / choice pics | 3/8 |
| 3 | 3 | Number line 0-1 (later 0-2) with d equal parts; tap the point for n/d, or read the marked point. | tap / num frac | |
| 4 | 3 | Compare two fractions with the same denominator or the same numerator, with bars shown. `<`, `=`, `>`. | choice syms | 3/8 ? 5/8 |
| 5 | 3-4 | Equivalent fractions: `1/2 = ?/8` (denominators 2-12, multiplier 2-4); "Which equals 2/3?" with bars. | num / choice | |
| 6 | 4 | Compare unlike fractions (denominators 2-12), no picture; use benchmark 1/2 or common denominator. | choice syms | 3/5 ? 4/7 |
| 7 | 4-5 | Simplest form: n/d with GCF 2-6, d <= 48. `eq` off. | num frac | 12/18 -> 2/3 |
| 8 | 4-5 | Mixed <-> improper: `2 3/4 = ?/4`; `11/4 =` whole and remainder parts (pad `sep`). | num | |

### M-3b: Grade 3 other topics (chunk P2-07) (3.NBT, 3.MD, 3.G)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `round` | 1 | Round 2- and 3-digit numbers to the nearest 10. Number line hint with the two tens. | num | 347 -> 350 |
| `round` | 2 | Round 3- and 4-digit numbers to the nearest 100. | num | 2,451 -> 2,500 |
| `sub` | 6 | 3-digit - 3-digit with regrouping in one or two places (no zeros in the top number). | num | 632 - 478 |
| `sub` | 7 | Subtract across zeros: top number has 1 or 2 zeros (500, 703, 1,000). | num | 703 - 286 |
| `time` | 5 | Analog clock to the minute -> digital, 4 choices; half the items reverse (digital -> pick clock). | choice | |
| `time` | 6 | Elapsed time: start and end clock or times within 12 hours, answer in minutes (<= 120) or "what time will it be 45 minutes after 2:30?" | num / choice | |
| `geo` | 1 | Perimeter of rectangles and other polygons (3-6 sides, sides 1-20) with labelled sides; rectangles give only 2 sides. | num | |
| `geo` | 2 | Area of rectangles: count unit squares (to 6x8), then `l x w` with labels (to 12x12). Answer in square units. | num | |
| `shape` | 5 | Classify: "Which is a quadrilateral?", "Which is NOT a rhombus?", "How many right angles?", polygons by side count (pentagon, hexagon, octagon). | choice pics / num | |
| `data` | 3 | Scaled bar graph or pictograph (scale 2, 5 or 10; half symbols allowed for scale 2 and 10). Compare, total, difference. | num | |
| `meas` | 4 | Ruler to the half or quarter inch -> choice of 4 lengths; mass and volume reading (g, kg, mL, L scale pictures). | choice | 3 1/2 in |
| `story` | 6 | Two-step with all four operations within 1,000 (multiply then add, total then share). | num | |

### M-hints: step hints (chunk P2-08, Opus)

`hint: {k:'steps', steps:[{html, say}]}`. One step is revealed per tap on the hint button. The last step never shows the final answer;
it shows the final small computation ("Now add 120 + 18"). Step builders required: `stepsAdd(a,b)`, `stepsSub(a,b)` (with regrouping
marks), `stepsMul(a,b)` (partial products for up to 3x2 digits), `stepsDiv(a,b)` (long division rounds), `stepsEquivFrac`, `stepsCommonDen`,
`stepsStory(list)`. All multi-digit skills from here on must use them.
As shipped (`src/js/39b-steps.js`): each builder returns the whole hint, so a generator writes `hint: stepsAdd(a, b)`.
`stepsAdd(a, b, ...)` takes 2+ addends and decimal strings ('3.4', '12.75'); `stepsSub(a, b)` needs a >= b, decimals too;
`stepsMul(a, b, how)` with how 'pp' (default up to 3x2 digits) or 'std'; `stepsDiv(a, b)` needs a >= b, whole numbers, remainder
as the last step (pair it with `sep:'R'`); `stepsEquivFrac(n, d, n2, d2)` with one of n2, d2 null; `stepsCommonDen(a, b, c, d, op)`
with op '+', '-' or 'cmp'. Prompts: `ST.vert(nums, op)` (stacked, points lined up) and `ST.ldiv(a, b, slot)` (long division).

### M-4a: Grade 4 whole numbers (chunk P2-09) (4.NBT, 4.OA)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `mfact` | 5 | Facts with 11 and 12, then all facts to 12x12 mixed, 30% missing factor. | num | 12 x 9 |
| `pv` | 4 | Numbers to 999,999 with commas: value of a digit (choice), expanded form -> number, number in words (spoken) -> digits, compare two numbers (`<`,`=`,`>`). | num / choice | "value of 7 in 472,019" |
| `mbig` | 2 | 2-digit x 1-digit, vertical. | num | 47 x 6 |
| `mbig` | 3 | 3- and 4-digit x 1-digit. `max` 5. | num | 1,286 x 4 |
| `mbig` | 4 | 2-digit x 2-digit. Partial-product steps. | num | 34 x 27 |
| `big` | 6 | Add two 4-digit numbers with regrouping. | num | |
| `big` | 7 | Add 5- and 6-digit numbers; some with 3 addends. `max` 7. | num | |
| `sub` | 8 | Subtract 4- to 6-digit numbers with regrouping, including zeros. | num | |
| `dbig` | 1 | 2-digit ÷ 1-digit, no remainder (quotient 11-49). | num | 84 ÷ 6 |
| `dbig` | 2 | 2-digit ÷ 1-digit with remainder. Pad `sep:'R'`. | num | 47 ÷ 5 -> 9 R 2 |
| `dbig` | 3 | 3- and 4-digit ÷ 1-digit, with or without remainder. | num | |
| `fact` | 1 | Factor pairs to 100: "Which is a factor of 36?" (choice); "List: tap ALL factors of 24" (multi from 6 options); multiples: "Which is a multiple of 7?" | choice / multi | |
| `fact` | 2 | Prime or composite for 2-100 (choice of 2); "Which number is prime?" (4 choices). | choice | |
| `round` | 3 | Round numbers to 999,999 to any named place. | num | "Round 48,372 to the nearest thousand" |

### M-4b: Grade 4 fractions, decimals, geometry (chunk P2-10) (4.NF, 4.MD, 4.G)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `frac` | 6, 7, 8 | See M-frac. | | |
| `fop` | 1 | Add and subtract like denominators (2-12); answers may exceed 1 (give as improper or mixed, `eq:'value'`); mixed numbers with like denominators in the last third. | num frac | 3/8 + 4/8 |
| `fop` | 2 | Whole number x fraction (whole 2-9, unit and non-unit fractions), with repeated-addition bar picture. | num frac | 4 x 2/3 |
| `dec` | 1 | Tenths and hundredths: fraction -> decimal (7/10, 43/100), decimal -> fraction, grid picture -> decimal, number line to hundredths. | num dec / choice | |
| `dec` | 2 | Compare decimals to hundredths (G4) and thousandths (second half), unequal lengths on purpose. | choice syms | 0.3 ? 0.25 |
| `ang` | 1 | Classify angle picture: acute, right, obtuse, straight. Estimate against a right-angle marker. | choice | |
| `ang` | 2 | Read a protractor picture (multiples of 5, later any degree); missing angle from a sum (two angles make 90 or 180, or a given whole). | num | |
| `geo` | 3 | Rectangle: given area and one side find the other; given perimeter and one side find the other; composite L-shapes (two rectangles) area. | num | |
| `shape` | 6 | Lines of symmetry (count 0-6, or yes/no), parallel vs perpendicular lines, triangle by angles and sides (right, acute, obtuse; equilateral, isosceles, scalene). | choice / num | |
| `meas` | 5 | One-step conversions, larger to smaller: ft->in, yd->ft, m->cm, km->m, kg->g, L->mL, hr->min, min->sec, lb->oz, gal->qt. Table shown in hint only. | num | 4 ft = ? in |
| `pat` | 4 | In/out table with one rule (+n, -n, xn, ÷n); 3 rows given, fill the 4th; or pick the rule. | num / choice | |
| `story` | 7 | Multi-step with remainders that must be interpreted (round up, drop, or the remainder is the answer). | num | "30 kids, 4 per car. How many cars?" -> 8 |

### M-5a: Grade 5 decimals and whole-number fluency (chunk P2-11) (5.NBT, 5.OA)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `pv` | 5 | Decimals to thousandths: value of a digit, expanded form, word form (spoken) -> decimal. | num dec / choice | |
| `pv` | 6 | Multiply and divide by 10, 100, 1,000 (whole and decimal); powers of ten `10^3 = ?`; "4.2 x 10^2". | num dec | |
| `mbig` | 5 | 3-digit x 2-digit, standard algorithm. `max` 6. | num | 348 x 26 |
| `dbig` | 4 | 3- and 4-digit ÷ 2-digit (divisors 11-50), remainders in half the items. | num | 864 ÷ 24 |
| `dec` | 3 | Add and subtract decimals to hundredths, ragged lengths (3.4 + 12.75), vertical with aligned points. | num dec | |
| `dec` | 4 | Multiply decimal x whole, then decimal x decimal (tenths x tenths, tenths x hundredths). | num dec | 0.6 x 0.4 |
| `dec` | 5 | Divide decimals: decimal ÷ whole (exact), whole ÷ whole with decimal quotient (÷2, 4, 5, 8), then ÷ tenths. | num dec | 7.2 ÷ 8 |
| `round` | 4 | Round decimals to the nearest whole, tenth, hundredth. | num dec | |
| `ooo` | 1 | Expressions with parentheses and two or three operations, whole numbers, results 0-200, integer intermediate values. Also "write the expression": pick the expression for "add 8 and 7, then multiply by 2". | num / choice | 3 x (4 + 5) - 6 |

### M-5b: Grade 5 fractions, volume, coordinates (chunk P2-12) (5.NF, 5.MD, 5.G)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `fop` | 3 | Add and subtract unlike denominators (2-12; LCD <= 60). Simplest form required (`eq` off) in the second half only. | num frac | 2/3 + 1/4 |
| `fop` | 4 | Add and subtract mixed numbers with unlike denominators, regrouping in subtraction. Answer as whole + fraction slots. | num | 3 1/4 - 1 2/3 |
| `fop` | 5 | Fraction x fraction and fraction x mixed number; area-model picture for the first. | num frac | 2/3 x 3/5 |
| `fop` | 6 | Unit fraction ÷ whole and whole ÷ unit fraction, with bar picture. | num frac | 4 ÷ 1/3 |
| `geo` | 4 | Volume: count unit cubes in a drawn rectangular prism (to 4x4x4), then `l x w x h` with labels (to 12), then two joined prisms. | num | |
| `coord` | 1 | First quadrant grid 0-10: tap the point (x, y); read the coordinates of a marked point (two slots); distance between two points on the same line. | tap / num | |
| `meas` | 6 | Conversions both directions and two-step (yd -> in, hr -> sec), with decimals for metric (2.5 km = ? m). | num dec | |
| `data` | 4 | Line plot of fractional measurements (halves, quarters, eighths): how many at a value, total, difference between largest and smallest. | num frac | |
| `pat` | 5 | Two rules: generate two sequences and relate them ("the second is always 3 times the first"); pick the rule `y = 2x + 1` for a table. | choice / num | |
| `story` | 8 | Fraction and decimal problems: money with tax-free totals, recipes scaled by 1/2 or 3, distances. | num dec / frac | |

### M-6a: Grade 6 ratios and integers (chunk P2-13) (6.RP, 6.NS)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `ratio` | 1 | Ratio from a picture or sentence (a:b, a to b); equivalent ratios table with one blank. | choice / num | "3 red to 5 blue. 9 red to ? blue" |
| `ratio` | 2 | Unit rates: price per item, miles per hour; "which is the better buy" (choice). | num dec / choice | "$12 for 4 lb. Cost of 1 lb?" |
| `ratio` | 3 | Percent of a number (10, 20, 25, 50, 75, then any multiple of 5; whole-number answers), find the whole given a part and percent. | num | 25% of 80 |
| `ratio` | 4 | Fraction <-> decimal <-> percent matching and conversion (denominators 2, 4, 5, 10, 20, 25, 50, 100). | match / num | |
| `int` | 1 | Integers on a number line -10..10: tap the number; compare two integers; order three (kind `order`). Real contexts (temperature, floors). | tap / choice / order | |
| `int` | 2 | Absolute value; opposite of a number; distance between two integers on the line. | num neg | \|-7\| |
| `int` | 3 | Add and subtract integers -20..20 with a number-line hint. | num neg | -4 + 9 |
| `fop` | 7 | Divide fractions by fractions and mixed numbers; simplest form. | num frac | 3/4 ÷ 2/5 |

### M-6b: Grade 6 expressions, equations, geometry, statistics (chunk P2-14) (6.EE, 6.G, 6.SP)

| Skill | Lv | Spec | Kind | Sample |
|-------|----|------|------|--------|
| `ooo` | 2 | Order of operations with exponents (squares to 12, cubes to 5) and parentheses. | num | 2 x 3^2 + (10 - 4) |
| `ooo` | 3 | Evaluate expressions for a given value: `3x + 4` when x = 5; two variables in the last third. | num | |
| `alg` | 1 | One-step equations `x + a = b`, `x - a = b`, whole-number solutions 0-99. Balance-scale picture hint. | num | x + 17 = 42 |
| `alg` | 2 | One-step `ax = b`, `x / a = b`; solutions whole numbers. | num | 6x = 54 |
| `alg` | 3 | Two-step `ax + b = c`; and inequalities: pick the number line for `x > 3`. | num / choice | |
| `geo` | 5 | Area of triangles, parallelograms, trapezoids with labelled base and height (even products so answers are whole or end in .5). | num dec | |
| `coord` | 2 | Four quadrants -6..6: tap the point; name the quadrant; reflect across an axis. | tap / choice | |
| `fact` | 3 | GCF and LCM of two numbers (2-36; LCM <= 144). | num | GCF(18, 24) |
| `data` | 5 | Mean, median, mode, range of 5-7 whole numbers (mean is whole). | num | |
| `story` | 9 | Ratio, rate and percent problems; one-step equation problems. | num dec | |

---

## 4. Reading and Language Arts

Existing (frozen): `sound` 1 first sound, 2 last sound; `rhyme` 1 pictures, 2 words; `sight` 1-3 Dolch pre-primer, primer, first;
`pic` and `build` 1 CVC, 2 blends, 3 magic e, 4 vowel teams; `sent` 1-2 read a sentence and match a picture; `comp` 1-2 very short stories.

Word-list rules: common, concrete, kid-safe words; no homographs that confuse (lead, wind) below grade 4; every list passes the
`BAD` filter; picture words need a picture from the object art set or the emoji allowlist.
Speech rule: never ask the voice to say an isolated phoneme. Always use whole words ("Which word starts like **sun**?").

### E-PK and E-K: letters and early phonics (chunk P2-15) (RF.K.1-3)

| Skill | Lv | G | Spec | Kind |
|-------|----|---|------|------|
| `abc` | 1 | PK | Hear a letter name, tap the uppercase letter. 3 choices; distractors are look-alikes (E/F, M/W, O/Q, P/R). Letters introduced in the order S A T P I N M D G O C K E U R H B F L J V W X Y Z Q (first 13 appear twice as often). | choice syms, `auto:'must'` |
| `abc` | 2 | PK-K | Same with lowercase; look-alikes b/d/p/q, n/h, i/l, u/n. 4 choices. | choice syms |
| `abc` | 3 | K | Match uppercase to lowercase: 4 pairs. | match |
| `abc` | 4 | K | Alphabet order: "What comes after m?" (3 choices) and fill the gap `d, e, _, g`. | choice / build |
| `sound` | 3 | K | Middle vowel of a CVC picture word: choices a, e, i, o, u (show 3). Word spoken slowly in the hint. | choice syms |
| `sound` | 4 | 1 | Digraphs: picture word starting or ending with sh, ch, th, wh, ck. "Which letters start **ship**?" Choices are digraphs. | choice syms |
| `syl` | 1 | K | Picture + spoken word, 1-3 syllables. "How many claps?" Buttons 1, 2, 3 shown as clap icons. 40 words. | choice |
| `syl` | 2 | 1 | 1-4 syllables, no picture needed, word printed. 60 words. | choice |

### E-trace: tracing (chunks P2-16, P2-17)

| Lv | Content | Guide levels |
|----|---------|--------------|
| 1 | Digits 0-9 (placed in math world `m_tiny`) | Round of 5 glyphs: 1) watch demo and trace over solid guide, 2) dotted guide with start dot, 3) start dot only |
| 2 | Uppercase A-Z, same letter order as `abc 1` | same |
| 3 | Lowercase a-z | same |

Stroke data: each glyph is 1-4 strokes; each stroke is a list of points in a 100x100 box; drawn in standard manuscript order
(top to bottom, left to right). Tolerance: 14 units for PK, 10 for K and up. Stars per glyph: 3 = no restarts.

### E-phon: phonics and sight words, grades 1-2 (chunk P2-18) (RF.1.3, RF.2.3)

| Skill | Lv | Content | Size |
|-------|----|---------|------|
| `sight` | 4 | Dolch second-grade list (46 words: always, around, because, been, before, best, both, buy, call, cold, does, don't, fast, first, five, found, gave, goes, green, its, made, many, off, or, pull, read, right, sing, sit, sleep, tell, their, these, those, upon, us, use, very, wash, which, why, wish, work, would, write, your) | 46 |
| `sight` | 5 | Dolch third-grade list (41 words: about, better, bring, carry, clean, cut, done, draw, drink, eight, fall, far, full, got, grow, hold, hot, hurt, if, keep, kind, laugh, light, long, much, myself, never, only, own, pick, seven, shall, show, six, small, start, ten, today, together, try, warm) | 41 |
| `pic`, `build` | 5 | R-controlled vowels: ar, or, er, ir, ur. 24 picture words (car, star, farm, barn, shark, horn, corn, fork, storm, bird, girl, shirt, fern, nurse, purse, turtle...). Distractors swap the r-vowel (bird/bard/burd). | 24 |
| `pic`, `build` | 6 | Other vowel teams and diphthongs: oo, ou, ow, oi, oy, aw, ew. 24 picture words (moon, spoon, book, foot, house, mouse, cloud, cow, crown, coin, boy, toy, saw, paw, screw...). | 24 |

### E-spell: spelling (chunk P2-19) (L.1.2 to L.6.2)

Kind `spell`: the word is spoken, then spoken in a short sentence, then again. Hint 1: number of letters and first letter. Hint 2: show the word for 2 seconds, then hide.
A missed word is always re-asked later in the round.

| Lv | G | Word list (author 60 words per level, 40 for level 1) | Patterns |
|----|---|-----------|----------|
| 1 | 1 | CVC and short-vowel words | cat, bed, pig, hot, sun |
| 2 | 1 | Blends and digraphs, -ck, -ll, -ss | ship, chat, thin, frog, duck, bell |
| 3 | 2 | Silent e, vowel teams, -ing/-ed without change | cake, rain, boat, jumped |
| 4 | 3 | r-controlled, diphthongs, doubling and drop-e rules, plurals -es/-ies, common irregulars | first, cloud, hopping, making, babies, friend |
| 5 | 4 | Prefix/suffix words, homophones in sentences, silent letters | unhappy, careful, knight, their/there |
| 6 | 5 | -tion/-sion, -able/-ible, Greek/Latin pieces, commonly misspelled | nation, possible, separate, necessary |
| 7 | 6 | Academic vocabulary and tricky doubles | accommodate, rhythm, environment, definitely |

Each entry: `[word, sentence]`. Homophones must have a sentence that disambiguates.

### E-gram: grammar and conventions (chunks P2-20, P2-21) (L.1.1 to L.6.2)

Bank skill `gram`. Each level: at least 40 authored items, plus templated items where noted. Item forms: pick the correct sentence
(choice wide), pick the word that fits (cloze), tap the word that is a noun/verb/etc. (tap), fix-it (pick the corrected version).

| Lv | G | Topic | Item forms and notes |
|----|---|-------|----------------------|
| 1 | 1 | Capital letters and end marks | "Which sentence is written correctly?" (3 versions); pick `.`, `?` or `!` for a sentence |
| 2 | 2 | Nouns, verbs, adjectives | Tap the noun/verb/adjective in a 4-6 word sentence; "Which word is a verb?" |
| 3 | 2-3 | Plurals | Regular -s/-es, y->ies, f->ves, irregular (men, feet, mice, children, teeth, geese, sheep). Choice with wrong forms (mouses, foots) |
| 4 | 3 | Verb tense | Past, present, future cloze; irregular past (went, saw, ate, ran, took, gave, came, bought, thought, wrote) |
| 5 | 3 | Subject-verb agreement; simple contractions | "The dogs ___ (run/runs)"; is/are, was/were, has/have; don't, can't, it's, we're |
| 6 | 4 | Pronouns, possessives, confusable words | its/it's, their/there/they're, your/you're, to/too/two; whose/who's; pronoun matches noun |
| 7 | 4-5 | Commas and quotation marks | Series, dates, addresses, direct address, introductory words; punctuate dialogue (pick the correct version) |
| 8 | 5 | More parts of speech | Adverbs, conjunctions, prepositions, interjections: tap or classify; perfect tenses (has eaten / had eaten) |
| 9 | 6 | Sentence craft | Fragment vs complete vs run-on; combine two sentences correctly; pronoun case (I/me, who/whom basic); vague pronoun fix |

### E-vocab: vocabulary (chunks P2-22, P2-23) (L.x.4-6)

Bank skill `vocab`. At least 40 items per level.

| Lv | G | Topic | Item form |
|----|---|-------|-----------|
| 1 | 1 | Opposites | "What is the opposite of **hot**?" 3 choices (picture + word) |
| 2 | 2 | Synonyms | "Which word means the same as **happy**?" |
| 3 | 2 | Compound words | Build from two tiles (`order`), or "Which two words make **rainbow**?" |
| 4 | 3 | Prefixes un-, re-, pre-, dis-, mis- | "What does **reread** mean?"; add the right prefix to match a meaning |
| 5 | 3 | Suffixes -ful, -less, -ly, -er, -est, -able | same pattern |
| 6 | 3-4 | Homophones | Cloze: "I can ___ the ocean." (see/sea) 30 pairs |
| 7 | 4 | Context clues | 1-2 sentences with a harder word in bold; pick its meaning (4 choices) |
| 8 | 4-5 | Figurative language | Simile, metaphor, idiom, personification: "What does **it's raining cats and dogs** mean?"; classify the type |
| 9 | 5 | Greek and Latin roots | bio, geo, graph, tele, photo, aqua, port, rupt, spect, struct, scrib, dict, micro, therm: root meaning and word meaning |
| 10 | 6 | Analogies and shades of meaning | "hot : cold :: up : ?"; order by strength (`order`): warm, hot, scorching |

### E-sent: sentences (chunk P2-24)

| Lv | G | Spec | Kind |
|----|---|------|------|
| 3 | 1-2 | Unscramble 4-6 word sentence tiles (first word capitalised, last has the end mark, so there is one right order). 40 sentences. | order |
| 4 | 2 | Cloze with a picture or context: pick the word that makes sense (3 choices, same part of speech). 40 sentences. | choice |
| 5 | 2-3 | Which sentence matches the picture/scene description; sequence 3 sentences into story order. | choice wide / order |

### E-comp: comprehension passages (chunks P2-25 to P2-29) (RL and RI standards)

Two skills share the passage engine: `comp` = stories (fiction), `info` = informational (nonfiction).
`comp` levels 3-7 and `info` levels 1-5 map to grades 2-6. Each chunk writes 5 fiction + 5 nonfiction passages for its grade.

| Grade | `comp` lv | `info` lv | Words per passage | Questions per passage | Required question types (one of each, then any) |
|-------|-----------|-----------|-------------------|----------------------|--------------------------------------------------|
| 2 | 3 | 1 | 60-90 | 5 | detail, sequence, vocabulary, main idea, simple inference |
| 3 | 4 | 2 | 90-130 | 5 | main idea, detail, cause/effect, vocabulary in context, character feeling or text feature |
| 4 | 5 | 3 | 130-180 | 5 | main idea, inference, summary choice, vocabulary, theme (fiction) or text structure (nonfiction) |
| 5 | 6 | 4 | 180-230 | 5 | inference with evidence, compare two things, point of view, vocabulary, theme or author's purpose |
| 6 | 7 | 5 | 230-300 | 5 | central idea, inference, author's purpose/claim, figurative meaning, best evidence ("which sentence shows...") |

Round = 2 passages x 5 questions. The passage stays available in the panel while answering. Nonfiction topics: animals, space,
weather, inventions, how things are made, places, the human body, history that is settled fact. Fiction: original short stories with a
clear problem and solution. No brands, no real living people, nothing scary, no holidays tied to one religion.

Passage data format (in `d-comp.js`):
```js
{id:'g3f01', g:3, type:'f', title:'The Lost Kite', text:['Sentence one.','Sentence two.', ...],
 qs:[{t:'main', q:'What is this story mostly about?', a:'...', d:['...','...','...'], ev:[2,5]}, ...]}
```
`text` is an array of sentences so that `ev` (evidence sentence indexes) can be tested and used in hints ("Look at this part again" highlights them).

---

## 5. Spanish (ACTFL Novice Low to Novice High)

Existing pattern (frozen): each unit skill `es_<unit>` has level 1 = hear the word, tap the picture; level 2 = read the word, tap the picture/meaning.

### S-frame (chunk P2-30)

- Unit data lives in `d-es.js` (`ES_UNITS`, shipped in P2-30; format in the file header): items `[spanish, english, picture, article, art?, say?]`, `article` = `el`/`la`/`los`/`las`/`''`. Existing units keep their words; a unit with `spell:1` has level 3.
- New level 3 for vocabulary units: hear the word and spell it (`spell` kind with the accent row). Level 3 exists only where listed in section 2.3.
- New item types for phrase units: hear a phrase -> pick the meaning; read a question -> pick the best reply; fill the blank; build the sentence (`order`).
- If no Spanish voice is installed: show the word in text and a small "no Spanish voice on this tablet" note once per session.

### S-units: vocabulary (chunks P2-31 to P2-33)

10 to 14 words per unit, each with a picture.

| Chunk | Unit skill | Words (author the full list; these are the anchors) |
|-------|-----------|------------------------------------------------------|
| P2-31 | `es_house` | la casa, la puerta, la ventana, la mesa, la silla, la cama, la cocina, el baño, el jardín, la lámpara |
| P2-31 | `es_clothes` | la camisa, los pantalones, el vestido, los zapatos, el sombrero, la chaqueta, los calcetines, la falda |
| P2-31 | `es_school` | el libro, el lápiz, la mochila, el papel, la maestra, el maestro, la escuela, la clase, las tijeras, el borrador |
| P2-31 | `es_feel` | feliz, triste, enojado, cansado, asustado, enfermo, emocionado, tranquilo (faces) |
| P2-32 | `es_days` | lunes to domingo, hoy, mañana, ayer |
| P2-32 | `es_months` | enero to diciembre; seasons: primavera, verano, otoño, invierno |
| P2-32 | `es_weather` | hace sol, hace calor, hace frío, hace viento, llueve, nieva, está nublado |
| P2-32 | `es_big` | lv1 tens: veinte to cien; lv2 any 21-99 (treinta y cinco), heard -> numeral and numeral -> word |
| P2-32 | `es_time` | lv1 "Es la una / Son las tres" (o'clock, clock picture); lv2 "y media", "y cuarto" |
| P2-33 | `es_place` | el parque, la tienda, la biblioteca, el hospital, la playa, el restaurante, la iglesia, el mercado, la calle |
| P2-33 | `es_trans` | el carro, el autobús, el tren, el avión, la bicicleta, el barco, el camión |
| P2-33 | `es_verb` | correr, saltar, comer, beber, dormir, leer, escribir, jugar, cantar, bailar, nadar, caminar (action pictures) |
| P2-33 | `es_adj` | grande, pequeño, alto, bajo, rápido, lento, nuevo, viejo, caliente, frío, bonito, limpio, sucio |

### S-gram: phrases and first grammar (chunk P2-34)

| Skill | Lv | Spec |
|-------|----|------|
| `es_phrase` | 1 | Hear and read a phrase, pick the English meaning: ¿Cómo te llamas?, Me llamo..., ¿Cómo estás?, Estoy bien, ¿Cuántos años tienes?, Tengo ... años, ¿Dónde está...?, Mucho gusto, De nada, Lo siento, Hasta luego, ¿Qué es esto? |
| `es_phrase` | 2 | Read or hear a question, pick the reply that fits (3 Spanish choices) |
| `es_art` | 1 | Pick `el` or `la` for a known noun (uses the `article` field) |
| `es_art` | 2 | `un/una`, and plurals `los/las` + -s/-es (el gato -> los gatos) |
| `es_ser` | 1 | soy, eres, es with name, origin, description: "Yo ___ alto." |
| `es_ser` | 2 | estar for feelings and places: "Ella ___ triste." (está), "Estoy en la escuela." |
| `es_ser` | 3 | tener: tengo, tienes, tiene + hambre, sed, frío, calor, años |
| `es_gusta` | 1 | "Me gusta + singular noun" vs "No me gusta": hear, pick the picture with a happy or unhappy face |
| `es_gusta` | 2 | gusta vs gustan with plural nouns |
| `es_sent` | 1 | Build a 3-4 word sentence from tiles: "El gato es negro." (adjective after noun, agreement in gender) |
| `es_sent` | 2 | Build 4-6 word sentences with a verb and place: "Yo como en la cocina." |

Agreement must be correct everywhere (la casa blanca, el perro negro, los zapatos rojos). Mexican Spanish vocabulary (carro, not coche).

### S-story: mini dialogues (chunk P2-35)

12 dialogues of 3-6 short lines using only taught words, each with 3 questions. Level 1: questions in English. Level 2: questions in
Spanish with picture answers. Level 3: Spanish questions and Spanish text answers. Lines are tappable to hear.

---

## 6. Discover: science, geography, civics (stretch; chunks P2-36, P2-37)

All bank-driven (section 8). At least 40 items per skill level. Every fact must be settled, non-controversial, and stated the way a
school textbook would. Loosely follows NGSS topics and typical state social-studies sequences. Each item carries a `topic` tag.

| Skill | Lv 1 (K-2) | Lv 2 (3-4) | Lv 3 (5-6) |
|-------|-----------|-----------|-----------|
| `sci_life` | living vs non-living, animal babies and coverings, habitats, plant parts, needs of living things, senses | life cycles, food chains, adaptations, classification of animals, plant functions, fossils | cells basics, ecosystems, photosynthesis, human body systems, inheritance of traits |
| `sci_earth` | weather, seasons, day and night, sun and moon, land and water | water cycle, rocks and soil, erosion, natural resources, moon phases, planets in order | plate movement, rock cycle, atmosphere layers, solar system scale, Earth's rotation and revolution |
| `sci_phys` | push and pull, materials and their properties, sound and light basics, solids and liquids | states of matter, forces and magnets, simple machines, energy forms, electricity circuits | mixtures and solutions, physical vs chemical change, gravity, energy transfer, waves |
| `geo_world` | map words (north/south/east/west on a grid), land forms, continents and oceans names | reading a grid map with coordinates and a key, hemispheres, equator, climate zones, major mountains and rivers | n/a |
| `geo_us` | n/a | US regions, states and capitals (both directions, generated from a table of 50), neighbours "which state borders..." (from a table) | landmarks, major rivers and mountain ranges, time zones |
| `civ` | community helpers, rules and why, symbols (flag, Statue of Liberty), needs vs wants | n/a | three branches, what a constitution is, rights and responsibilities, goods/services, supply and demand basics |

Map skills use generated grid maps (`VIZ.coordGrid` with icons), not geographic outlines.

Shipped (P2-37): the level numbers of a skill count only the grade bands it has, so they match the stop table in 2.4: `geo_world` 1-2 (K-2, 3-4), `geo_us` 1-2 (3-4, 5-6), `civ` 1-2 (K-2, 5-6), the three sciences 1-3. Each item carries its band in `grade`. Map skills are asked in words (map words, coordinates written as pairs like (3, 2), a key described in a sentence), so no question needs a map image.

---

## 7. Scope and sequence at a glance

| Grade | Math | Reading and Language | Spanish (if chosen) | Brain Teasers band |
|-------|------|----------------------|---------------------|--------------------|
| PK | Count to 10, numerals, more/fewer, shapes, AB patterns, sorting, trace digits | Letter names upper and lower, trace letters, syllable claps | Listening only: greetings, colours, numbers | A |
| K | Count to 20, ten frames, add within 5 and 10, subtract within 10, shapes and solids, compare lengths | Letter sounds first/last/middle, rhymes, CVC words, sight words 1, simple sentences | + animals, food, family | A |
| 1 | Facts to 20, place value tens/ones, 2-digit add/subtract, time to half hour, coins, picture graphs, halves and fourths | Blends, digraphs, magic e, sight words 2-3, spelling 1-2, opposites, capitals and end marks, short stories | + body, numbers to 20, home | B |
| 2 | Regrouping, 3-digit numbers, time to 5 min, money, rulers, bar graphs, arrays, 2-step stories | Vowel teams, r-controlled, sight words 4-5, spelling 3, nouns/verbs/adjectives, plurals, synonyms, compound words, passages (60-90 words) | + clothes, school, feelings, days, weather | B |
| 3 | Multiplication and division facts, fractions, area and perimeter, rounding, elapsed time, scaled graphs | Spelling 4, tenses, agreement, prefixes, suffixes, homophones, passages (90-130) | + numbers to 100, time, places | C |
| 4 | Multi-digit multiply/divide, factors and primes, fraction equivalence and operations, decimals, angles, conversions | Spelling 5, pronouns, confusables, commas, quotations, context clues, figurative language, passages (130-180) | + verbs, descriptions, phrases | C |
| 5 | Decimal operations, fraction operations, volume, coordinates, order of operations | Spelling 6, all parts of speech, roots, passages (180-230) | + ser/estar/tener, gustar, sentences | D |
| 6 | Ratios, rates, percent, integers, expressions, one- and two-step equations, area of polygons, statistics | Spelling 7, sentence craft, analogies, passages (230-300) | + dialogues | D |

## 8. Content bank format (implemented by P1-09)

```js
BANK.gram = [
  // minimal item: question, answer, 3 distractors, level
  {lv:3, q:'One mouse, two ___.', a:'mice', d:['mouses','mices','mouse']},
  // optional fields
  {lv:2, q:'Tap the verb.', sent:'The dog runs fast.', a:'runs', form:'tap'},          // tap a word in a sentence
  {lv:7, q:'Which sentence uses commas correctly?', a:'...', d:['...','...'], form:'wide', topic:'series'},
  {lv:10, q:'Put these in order from weakest to strongest.', order:['warm','hot','scorching'], form:'order'},
  {lv:4, pairs:[['re-','again'],['un-','not'],['pre-','before']], form:'match'}
];
```

| Field | Meaning |
|-------|---------|
| `lv` | skill level |
| `q` | question text (also spoken, unless `say` is given) |
| `a` | correct answer |
| `d` | 2 or 3 distractors (no duplicates, none equal to `a`) |
| `form` | `choice` (default), `wide`, `tap`, `order`, `match`, `multi`, `spell` |
| `topic` | strand tag for the report card |
| `hint` | optional teaching hint; if missing, the level's default hint text is used |
| `pic` | optional icon or object-art name |

Validator rules (run by `tools/test.js`): required fields per form; lengths (`q` <= 140 chars, choices <= 60); no `BAD` words;
at least 40 items per level unless the level is generator-based; no two items with the same `q` + `a`.

## 9. Strands for the report card

Every skill belongs to one strand. The report card (P5-06) groups mastery by strand.

| Strand | Skills |
|--------|--------|
| Counting and number sense | pk_count, pk_num, pk_more, cnt, eo, cmp, tenf, pv, round |
| Addition and subtraction | add, miss, sub, big |
| Multiplication and division | mult, arr, mfact, dfact, mbig, dbig, fact |
| Fractions and decimals | frac, fop, dec |
| Ratios, integers, algebra | ratio, int, ooo, alg, pat |
| Measurement and data | time, coins, meas, data |
| Geometry | shape, sort, pos, geo, ang, coord |
| Problem solving | story |
| Letters and phonics | abc, trace, sound, rhyme, syl, pic, build |
| Sight words and spelling | sight, spell |
| Grammar | gram, sent |
| Vocabulary | vocab |
| Comprehension | comp, info |
| Spanish words | es_* vocabulary units |
| Spanish sentences | es_phrase, es_art, es_ser, es_gusta, es_sent, es_story |
| Science | sci_life, sci_earth, sci_phys |
| Geography and civics | geo_world, geo_us, civ |
