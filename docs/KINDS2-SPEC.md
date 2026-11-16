# KINDS2: design spec for new question kinds (Fable design review, 2026-11-16)

Read-only work; nothing in the repo changed. Checked against the current tree (v169, commit 0995120). Per-stop kind counts below come from sampling 20 questions per stop in the built app.

## 0. Four facts that shape the design

1. **`K.same(q, v)` is answer correctness, not question identity.** Review identity is `revKey` = `sk|lv|label` (`59-review.js`). Repeat-avoidance is `q.label === G.last` (`50-round.js:43`, `51-mastery.js:128`). The "sameness" rules below are therefore label rules.
2. **`index.html` is 992,077 bytes; test.js fails at 1,000,000** (`tools/test.js:7974`). There is no room for the new kinds in `49-kinds.js`.
   - Put them in new files `src/js/49b-kinds2.js` and `src/css/37b-kinds-c.css`, as `KIND.sort = {...}` assignments (the contract allows this).
   - Add both to the `gen2` entry of `PARTS` in `tools/build.py`. `gen2` is 241 KB and loads at start, so the kinds exist before the first question.
   - Update the "parts split A11c" check's file list.
   - Budget for edits that stay in `index.html` (`50-round.js`, `51-mastery.js`, `39-hints.js`): 2 KB total.
3. **No `BANKF` builder is registered anywhere.** `bankCan()` (`37-bank.js:73`) therefore never draws bank items of form `order`, `match` or `multi`, and form `tap` is built as a `choice` over the sentence's words. Registering builders is part of this work; it is the cheapest variety win for Reading and Discover.
4. **Review rebuilds by seed** (`genQ(sk, lv, seed)`) or by `bk` for bank items. If the rebuilt label differs, `revQ` already falls back to a fresh question and keeps the item. So changing a generator is safe, with one rule (section 4).

## 1. What to build, in order

| # | Kind | Why this position |
|---|---|---|
| 1 | **`sort`**: put items into 2–3 bins | Widest reach: replaces two-option `choice` in Math, and is the main fix for Reading g3–6 (86–100% choice), Spanish (92%) and Discover (100%). Tap-only by nature. Also lands the `BANKF` plumbing. |
| 2 | **`mark`**: tap word(s) in a sentence, plus `BANKF` builders for `order`, `match`, `multi` | Tiny code. Converts the existing bank `tap` items (`d-gram.js`: "Tap the verb", "Tap the word that needs a capital") from fake choice to real tapping. Unlocks the existing kinds for banks. |
| 3 | **`line`**: place a pin on a number line | Main fix for number-pad monotony in g3–6 (rounding, fractions, decimals, integers); teaches magnitude, which typing does not. |
| 4 | **`make`**: build a quantity with a model (ten frame, base-ten, coins, shaded parts, array, clock) | Main fix for K–2 Math (g0–g2 are 60–80% number pad). All steppers and toggles, no drag. |
| 5 | **"find the mistake"**: not a new kind | Generators that emit the existing `tap` kind over the lines of a worked example, or `mark` with `one: true` for sentences. Breaks up the 100% number-pad computation stops in g2–g6. |

There is no separate clock kind; it is a `make` model.

## 2. Kind specs

Rules for all four:
- **Tap-only is the base interaction.** Drag is an enhancement on `sort` and `line` only: start after 8 px of pointer movement, use `setPointerCapture`, `touch-action: none` on the dragged element only.
- **Submit through a Check button.** Reuse `multi`'s `UI.btn('Check', {id: 'mcheck', cls: 'mgo', off: true})` and call `submit(value, null)`.
- **Two tries, as the engine has them.** There is no partial score; "partial" is feedback only.
- **Keyboard:** every target is a `<button>` or has `role` and `tabindex="0"`, with Enter/Space as in `tap.bind`.
- **Interactive parts go in `K.render()` (inside `.inp`), never in `#prompt`.** `fit()` shrinks the prompt to `--k` 0.42, which would shrink targets.

### 2.1 `sort`

**Fields**
- `bins: [{v, l, h}]`, 2 or 3.
- `items: [{v, l, h, b}]`, 3–6; `b` is a bin's `v`.
- `ans`: the items' `b` values in item order, joined with `|`.
- `binSay` (optional): spoken bin names.

**Layout**
- 360 px: bins in one row on top (2 bins about 156 × 96 px each; 3 bins about 101 × 96 px, labels 9 characters or fewer, or a picture). Chip tray under it, wrapping; chips at least 48 px high. Check below.
- 800 px: same structure; bins 120 px high, chips `--fs-5`.
- Placed chips show small inside their bin, with a count badge on the bin.

**Interaction**
- Tap a chip to select it (`.sel`, `aria-pressed`). Tap a bin to move it there. Tapping another chip moves the selection.
- Tap a placed chip to send it back to the tray.
- Drag: drop on the bin under the pointer (`elementFromPoint`); dropped anywhere else, it returns.
- Check is enabled when the tray is empty. It submits the array of chosen bin values in item order.

**Right, near, miss**
- Right: every item is in its bin.
- First miss (`retry`): correct chips lock (`.done` plus a check icon). Wrong chips shake and return to the tray. Message: "3 of 5 are home. Try the others!"
- Second miss (`reveal`): the remaining chips move to their bins with `.rev`.

**`spoken`:** `q.ansSay`, or per bin: "Even: 4, 8, 12. Odd: 7, 9."

**`same`:** `Array.isArray(v) && v.map(String).join('|') === q.ans`.

**Label:** bin names plus the sorted item set, under 60 characters, for example `sort even/odd 4,7,8,9,12`.

**`validate`:** 2–3 bins, 3–6 items, every `b` is a bin, every bin has at least one item (so "all in one bin" is never right), no duplicate labels, `ans` matches.

**Reuses from 23-viz.js:** nothing directly. Items can carry `VIZ.shape()` or `VIZ.dots()` markup with `h: true`; pictures go through `picFor`.

### 2.2 `mark`

**Fields**
- `words: [string]`: tokens with punctuation attached; at most 14 tokens and 90 characters.
- `ans`: array of token indexes as strings, sorted with `kindSort`.
- `one: true` when exactly one word is right.
- `html`: the instruction only. The sentence is rendered by `K.render()`.

**Layout:** words as inline-flex chips, min-height `var(--tap)`, min-width `var(--tap)`, padding `0 var(--s-2)`, line gap 6 px. Three to four lines at 360 px, one to two at 800 px.

**Interaction**
- `one`: a tap submits `[i]` immediately, like `tap`.
- Otherwise a tap toggles `.sel`; Check is enabled with one or more selected; it submits the sorted index array.

**Right, near, miss**
- First miss: correct picks lock `.right`; wrong picks shake and unselect. Message: "You found 2 of 3." Words not yet found are not shown.
- Second miss: all answers get `.right .rev`.

**`spoken`:** `q.ansSay`, or the answer words joined ("dog, park").

**`same`:** arrays equal after `kindSort`.

**Label:** the bank item's own label, unchanged, so existing review items still match.

**Bank builders**
- `BANKF.tap` builds `mark` with `one: true` from `it.sent`.
- A list in `it.a` builds a multi-word `mark`.
- Change `bankCan` to cover the new forms.
- Register `BANKF.order`, `BANKF.match`, `BANKF.multi` as thin mappers to the existing kinds, and `BANKF.sort` from `it.bins: {name: [items]}`.

**Reuses from 23-viz.js:** nothing.

### 2.3 `line`

**Fields**
- `line`: the options object passed to `VIZ.numLine` (`min`, `max`, `step`, `labels`, `marks`, `hide`, `den`, `hops`).
- `snap`: step between pin stops; **at most 11 stops** (10 intervals is about 29 px each at 360 px).
- `start`: the pin's first stop (default `min`; never the answer).
- `ans`: a string value, `'n/d'` allowed.
- `ansSay`.

**Rendering**
- Add `o.pin` to `VIZ.numLine`: it emits `<g class="vpin">` inside the same svg, and writes `data-min`, `data-max`, `data-x0`, `data-x1` on the `<svg>`.
- Give the svg class `vi` so it ignores `--k`.
- The markup must stay deterministic: no ids, no `Math.random` (the VIZ rule).
- The pin's hit area is a transparent 48 × 48 rect.

**Interaction**
- Tapping anywhere on the line band (a 56 px high transparent rect) moves the pin to the nearest stop. This is the tap path.
- Dragging the pin follows the finger and snaps on release. Pointer x converts to svg units through `getBoundingClientRect()`.
- Keyboard: the pin has `role="slider"`, `aria-valuemin/max/now` and an `aria-valuetext` that reads the stop ("3 fourths"). Arrow keys step; Home and End jump.
- Check is enabled once the pin has moved. It submits the stop's value as a string.

**Right, near, miss**
- Right: numerically equal.
- Near (one stop away, first try): still a miss, with the message "So close! One step away."
- Reveal: the pin slides to the answer, and that tick's label gets `.right` plus a check glyph.

**Hint:** the same line with `hops`, or the nearer-end arc for rounding.

**`spoken`:** `q.ansSay`; default `String(q.ans)`.

**`same`:** `Math.abs(val(v) - val(q.ans)) < 1e-9`, where `val` parses `'n/d'`.

**Label:** keep the stop's existing fact label where there is one (`round 13 to 10`), so identity and review are the same across kinds.

**Rounding model (the main use):** the line runs between the two candidates with 11 stops (10…20, or 5700…5800 by tens). The number is pre-marked with `marks`; snap it to the nearest stop and state the exact number in the prompt. The task is "Slide the pin to the nearest ten." The halfway case is handled in the hint text.

**v1 scope:** exact snap only. Estimation on unlabelled lines with a tolerance comes later.

### 2.4 `make`

**Fields**
- `model: 'frame' | 'b10' | 'coins' | 'parts' | 'array' | 'clock'`.
- `m`: model options.
- `ans`: the target as a string.
- `eq: 'value'` (default: compare totals) or `'exact'` (compare the state vector).

The state is a small vector of counts. Every change redraws the svg from VIZ. Check is enabled when the state differs from the start state.

| Model | State and controls (all at least 48 px) | Value | Drawing |
|---|---|---|---|
| `frame` | Tap an empty cell to add a counter (fills the next cell in row order); tap a filled cell or "−" to remove. `m.total` 5/10/20, `m.fixed` pre-placed counters in the first colour, the child's in the second | counters, or counters added when `m.fixed` | `VIZ.tenFrame(n, total, {b})` with a transparent `.vt` overlay rect per cell |
| `b10` | Three steppers (hundreds, tens, ones), each `− n +`, range 0–9 | 100h + 10t + u | `VIZ.base10(n)`; split only the stepper row at 360 px if needed |
| `coins` | A tray of coin buttons (penny, nickel, dime, quarter, as the grade allows) adds to a purse; tap a purse coin to remove; at most 12 coins | cents | the existing coin art from `genCoins` |
| `parts` | Tap parts to toggle shading | count shaded | `VIZ.fracBar(n, d, {tap})`, `fracCircle(..., {tap})`, `areaGrid` |
| `array` | Two steppers, rows and columns (1–10) | `'r×c'` with `eq: 'exact'`; a commuted answer is right only when the prompt allows it | `VIZ.array(rows, cols)` |
| `clock` | Stepper pairs: hour ±1; minute ±5 (g1–2) or ±1 and ±5 (g3). The hour hand moves with the minutes | `'h:mm'`, exact | `VIZ.clock(h, m)` |

**Right, near, miss**
- Right as in the table.
- First miss keeps the state and shows "Too many" or "Not enough yet" from the sign of the difference. For `b10`, if the digits are swapped: "Check your tens and ones."
- Reveal: redraw at the answer with `.rev`, the steppers show the answer, and the difference pulses once.

**`spoken`:** `q.ansSay`, for example "72 is 7 tens and 2 ones" or "Half past three".

**`same`:** `eq: 'value'` compares numbers; `'exact'` compares strings.

**Label:** the stop's existing label style (`frame 6`, `pv tens in 72`, `coins 25+25+5` becomes `make 55c`).

**`validate`:** the target is reachable within the control limits; the start state is not the answer; the model's ranges hold.

### 2.5 "Find the mistake" (generators only)
- Math: a worked example of 3–4 lines, each a `.tp` element with `data-v="0..n"`, exactly one wrong. `ans` is the wrong line's index. `ansSay` says the fix ("8 plus 7 is 15, so write 5 and carry 1"). Kind `tap`.
- Language: `mark` with `one: true` over a sentence with one error.
- Label: `fix: 38+47 carry`.

## 3. Which stops switch first

**Rule:** mix, do not replace. A generator makes its fact exactly as it does today, then picks a format with one extra seeded draw (section 4). The percentages are the share of that stop's questions.

**Do not touch** `sight` levels 1–3, `es_*` level 1, or `raceQ`: `54-race.js` feeds those generators straight into Fact Race. Fact Sprint (`57-fluency.js`) keeps the number pad.

### `sort`
| Grade | Stops | Bins | Share |
|---|---|---|---|
| Pre-K, K | `sort2`, `sort3` | big/small; two kinds (3–4 picture items) | 50% |
| K | `sound1`, `sound2` | two letter bins by first or last sound | 40% |
| K | `rhyme1` | rhymes with X / does not | 40% |
| K–1 | `eo1`, `eo2` | even / odd | 60% |
| Pre-K, 1 | `syl1`, `syl2` | 1 / 2 / 3 claps | 50% |
| 1–2 | `pic3`, `pic4` | short / long vowel | 40% |
| 2, 5 | `gram2`, `gram8` | noun / verb (/ adjective) | 40% |
| 3 | `gram4` | past / now / future | 50% |
| 4 | `fact2` | prime / composite | 60% |
| 4 | `fact1` | factor of N / not | 40% |
| 4 | `ang1` | acute / right / obtuse (drawn) | 50% |
| 3–4 | `frac4`, `dec2` | less than ½ / more than ½ | 30% |
| 4 | `vocab8` | literal / figurative | 40% |
| Spanish | `es_art1`, `es_art2` | el / la; un / una | 60% |
| Spanish | `es_ser2`, `es_gusta2` | ser / estar; gusta / gustan | 40–50% |
| Spanish | `es_mix2` | animales / comida / colores | 50% |
| Discover | all 15 stops | new bank items with `bins` (living / non-living, solid / liquid / gas, push / pull, needs / wants, goods / services, city / state / country, producer / consumer) | 25% |

Discover also gets about 15% `match` and 10% `order` through the new `BANKF` builders, leaving `choice` near 50%. The items are content work, about 15 per level (a Sonnet task).

### `mark`
- Every bank item that has `sent`: `gram1`, `gram2`, `gram8` and others.
- New items, about 20–30% of each stop: `gram5` (tap the verb that does not agree), `gram7` (tap where the comma goes: the word before it), `vocab7` (tap the clue word), `gram6`.

### `line`
| Grade | Stops | Task | Share |
|---|---|---|---|
| K | `cnt1`, `cnt4` | put the missing number on a 0–10 or 10–20 line | 30% |
| 3–5 | `round1`–`round4` | the rounding model | 50% |
| 3 | `frac3` | place k/d; replaces its 6-target `tap` variant | 50% |
| 4–5 | `dec1`, `dec2`, `pv5` | place a decimal (tenths; hundredths on a zoomed tenth) | 30% |
| 6 | `int1`, `int2` | place an integer; distance from zero | 40% |

### `make`
| Grade | Stops | Model | Share |
|---|---|---|---|
| K | `tenf1`–`tenf3`, `pk_count3`, `add4` | frame (make ten uses `m.fixed`) | 40–50% |
| 1–2 | `pv1`, `pv2`, `big1` | b10 | 40% |
| 1–2 | `coins1`–`coins3`, `coins5` | coins (same total by any coins) | 40% |
| 1–3 | `time1`–`time5` | clock (these stops are 100% choice today) | 40% |
| 2–3 | `arr1`, `arr2`, `mult1`, `mult2`, `mfact1`–`mfact3` | array | 25% |
| 1, 3, 4 | `frac1`, `frac2`, `geo2`, `dec1` | parts | 30% |

### Find the mistake, and existing kinds on fact stops
- `big3`–`big7`, `sub4`–`sub8`, `mbig2`–`mbig5`, `dbig1`–`dbig3`, `dec3`–`dec4`, `fop1`, `fop3`, `ooo1`, `alg1`–`alg3`: 20% find-the-mistake.
- `mfact*`, `dfact*`: 15% existing `match` (fact to product).
- `cmp2`, `cmp3`: 40% existing `order` (smallest first).

### Expected result and exemptions
- g0–g2 Math: number pad about 45–55%.
- g3–g6 Math: number pad about 60–65%. Computation stops will not go lower without hurting fluency practice.
- Reading g2–g6: choice about 55–65%.
- Spanish: about 65%.
- Discover: about 50%.
- Passage rounds (`comp`, `info`), boss rounds and test-out are pool-based and exempt. Later content work can add one `order` (sequence) and one `mark` (evidence) question per passage.

## 4. The "not three in a row" rule

**Implementation:** one small helper, used by both `makeQ` (`50-round.js:43`) and `mastQ` (`51-mastery.js:128`):

```js
function pickQ(sk,lv){const h=G.kh||(G.kh=[]),two=h.length>1&&h[h.length-1]===h[h.length-2]?h[h.length-1]:null,id=sk+lv;let q,alt;
  for(let t=0;t<10;t++){q=genQ(sk,lv);if(q.label===G.last)continue;if(!two||KMONO[id]||q.kind!==two)return q;alt=alt||q}
  if(alt)KMONO[id]=1;return alt||q}
```

- `KMONO = {}` is a session memo of single-kind stops, so they do not pay ten extra `genQ` calls on every question.
- `makeQ` pushes `q.kind` onto `G.kh` for every question it returns, whatever the source: pool, review slot, older-stop slot, mastery. Review and pool questions are never rerolled; they only count in the history.
- A retry at the end of the round does not push.

**Determinism**
- "Same answers give the same questions' stops" concerns which stop `mastPick` chooses. That is untouched. Seeds were already random on each call. The DOM-less tests at `tools/test.js:1323`, `1455` and `1734` call `makeQ` and should still pass. Grep for any test that counts `genQ` calls or stubs `Math.random` around `makeQ`.
- **Rule for every changed generator:** make all the existing draws first, in their current order, then make the new format draw last, using `R`, `rnd` or `pick` (the seeded `RNG`; never `Math.random`). Keep the fact's label the same in every format. The same seed then rebuilds the same fact with the same label.

**Review risk**
- Exact-fact review items (`revFact`: `7 + 5 = ?`, `hear "said"`) saved under v169 keep rebuilding to the same label, as long as the rule above is followed. They may come back in a new format. That is fine: the item tracks the fact.
- Where a generator's draw order cannot be kept, old items fall back to a fresh question at the same stop, as `revQ` documents. Acceptable for stops that are not number facts. **Not acceptable** for `add1–3`, `sub1–2`, `miss1–2`, `mfact*`, `dfact*`.
- Bank items rebuild by `bk`, not by seed, so they are unaffected. `bankRebuild` must route through the new `BANKF` builders.
- New-kind questions are not facts under `revFact` (their labels do not match `REV_ARITH` or `REV_WORD`), so review asks a fresh question of that stop. No change is needed.

## 5. Misconception feedback (`why`)

**Shape:** `q.why = {[String(wrongValue)]: 'one short sentence'}`. One map serves both `choice` (keyed by the choice's `v`) and `num` (keyed by the typed text; for `eq: 'value'`, look up by the same normalisation `same()` uses). Optional `q.whySay` map when the spoken wording differs.

**Bank items:** `d` entries may be `[text, why]` instead of a string. `bankQ` builds `q.why` from them; `validate` accepts both forms.

**Display:** about 6 lines in `check()`, in the `G.tries == 1` branch. If `q.why && q.why[String(v)]`, render `<div class="why">` (lightbulb icon, tokens only) above the normal hint in `#hint`. Say it when `gradeOf() <= 1 || S.voice`. Skip it when `mastTag(q) == 'ch'`. The hint still follows. Never show it on a right answer.

**Generators:** build the distractor from the misconception, then attach the `why`. Never two `why` texts for one value. If a misconception value equals the right answer, drop it.

**First ten**

| # | Stops | Wrong value comes from | Text |
|---|---|---|---|
| 1 | `sub4`, `sub5`, `sub6` | subtracting the smaller digit from the larger in each column (52 − 38 gives 26) | "Looks like 8 − 2. We can't flip them: trade a ten first." |
| 2 | `big3`, `big4`, `big5` | forgetting the carry (38 + 47 gives 75), or writing both digits (715) | "8 + 7 is 15. Write the 5 and carry the 1 ten." |
| 3 | `miss1`, `miss2`, `tenf2` | adding the two numbers shown (4 + ? = 12 gives 16) | "12 is the total. How many more from 4 up to 12?" |
| 4 | `pv1`, `pv2` | giving the digit, not its value (7 in 736 gives 7), or swapping tens and ones | "That 7 sits in the hundreds place, so it is worth 700." |
| 5 | `frac4`, `frac6` | "bigger bottom number means bigger fraction" (1/8 > 1/4) | "More parts means smaller parts. Eighths are smaller than fourths." |
| 6 | `fop1`, `fop3` | adding the tops and the bottoms (1/2 + 1/3 gives 2/5) | "Don't add the bottoms. Make the parts the same size first." |
| 7 | `dec2` | "longer decimal is bigger" (0.25 > 0.3) | "Compare tenths first: 3 tenths beats 2 tenths." |
| 8 | `round1`–`round4` | always rounding down, rounding the wrong place, or rounding 5 down | "Look at the digit to the right. 5 or more rounds up." |
| 9 | `ooo1` | working left to right (2 + 3 × 4 gives 20) | "Multiply before you add: 3 × 4 first." |
| 10 | `es_art1`, `es_art2` | choosing by the ending alone (el mano, la mapa), or el/la for a plural | "Most -a words take la, but mapa is el mapa. Learn this one." |

Next in line: `time2` and `time3` (hands swapped), `int3` (sign errors), `mbig2` (tens not multiplied), `vocab6` (their / there / they're), `sound1` (letter name versus sound, once recorded phonemes exist).

## 6. Acceptance tests

### `tools/test.js`
1. Extend `tools/kinds-samples.js` with two valid and two broken samples per new kind. Extend "kinds A" and "kinds B": the valid ones pass `validate` and `render` without the DOM; the broken ones fail (the bin with no item, 12 line stops, an unreachable `make` target, a `mark` index out of range).
2. The existing "kinds: every question passes KIND[q.kind].validate" check (line 514) covers the new generators without changes. Confirm its fuzz reaches every format: 3000 draws per stop already do.
3. **Kind mix.** For every non-pool stop, 400 seeded questions; record each kind's share. Fail when a stop the plan lists as switched has one kind above 65%. Print the per-grade table as a note.
4. **Three in a row.** Play 200 DOM-less rounds across 30 stops with the harness at line 1323. No three consecutive first-pass questions share a kind, unless the stop is single-kind (`KMONO`).
5. **Seed stability.** For `add1–3`, `sub1–2`, `miss1–2`, `mfact1–5`, `dfact1–4`: commit a fixture of 50 `(seed → label)` pairs taken from the v169 generators. The labels must be identical afterwards.
6. **Review round trip.** For each new kind: generate, `revMiss`, `revQ(item)` gives the same label and kind (seed path). The same for `bk` on bank `sort` and `mark` items.
7. **`same()` tables** per kind, including `line` `'2/4'` versus `'1/2'`, `make` coins by total, `make` array exact, `mark` in any order.
8. **`why`.** Every key of `q.why` is a wrong value (never satisfies `same`); the text is non-empty, 90 characters or fewer, and passes the kid-safe word filter. For `choice`, every key is one of the choices.
9. **Bank.** `BANKF` has `tap`, `order`, `match`, `multi`, `sort`. Every bank item of those forms is drawable (`bankCan`). Every Discover stop draws at least 3 kinds in 200 questions.
10. **Sizes.** `index.html` under 1,000,000 bytes; `gen2` under its 400 KB warning. Report the bytes added.
11. **Fact Race.** `raceQ` over 500 draws per category returns only `num` or `choice`.

### `tools/smoke.js`
1. Teach `answer(page)` the new kinds by taps: `sort` (chip then bin, then Check), `mark`, `line` (tap the answer's stop, then Check), `make` (steppers or toggles to the target, then Check).
2. One block per kind at **360 × 740 and 800 × 1280**:
   - right on the first try;
   - wrong then right: the hint shows, correct parts stay locked, and the `why` box shows for a known misconception value;
   - wrong twice: reveal is shown, `K.spoken` is said, and the question comes back at the end of the round.
3. Drag: `sort` and `line` once each with `page.mouse` down, move, up, giving the same result as tapping.
4. Keyboard: Tab plus Enter/Space completes a `sort`; arrow keys move the `line` pin.
5. Fit: on each new-kind screen at 360 × 740, `.qarea` and `.inp` do not overflow, every interactive element's box is at least 48 × 48, and no page scroll is needed to reach Check.
6. Zero console errors and zero network requests, as for every block.

### `tools/a11y.js` and `tools/shots.js`
- Add the four kinds (first-try and after-miss states) to the scanned screens, and extend its own answer and wrong-tap helper (lines 55–75), which throws on unknown kinds.
- Add `shots.js` entries for each kind in its fresh, hint and reveal states.

## 7. Pitfalls in this codebase

- **Size:** see section 0, point 2. Building the kinds into `index.html` fails the check on the first build.
- **`fit()`:** anything in `#prompt` scales down to 0.42. Interactive svg needs class `vi`; other interactive parts live in `.inp`. Call `fit()` after any change in `.inp` height (chips moving into bins, purse rows growing). On 360 × 740 with the hint open, the card can fold (`hs-fold`); keep `.inp` at or under about 300 px by capping items (6 chips, 12 coins, 14 words).
- **`check(v, el)` with an element** marks it `.wrong` and disables it. Pass `el = null` and do your own marking in `retry`, as `multi` does.
- **`K.retry` and re-render:** `renderQ` runs again for the end-of-round retry with `G.retry = true`. Keep all kind state on `st` (`st.sortAt`, `st.pin`, `st.mk`), initialise it in `bind`, and never keep it in module variables. Speed Race passes a different `st`.
- **`G.lock`:** ignore every pointer and key event while `st.lock` is true. Release pointer capture on `pointercancel`, and handle `view()` replacing the DOM in the middle of a drag.
- **a11y `signal` rule** (`a11y.js:522–530`): right and wrong must not be shown by colour alone. Add a check or retry icon, or a shape change, on `.right`, `.done`, `.rev` and wrong chips.
- **Contrast and the token guard:** no raw hex in the new CSS; `check.sh` greps for it. Use `--good`, `--try`, `--brand`, `--surface-2` and the `.v*` classes. Selected chips need 3:1 against the bin fill; run `contrast.js`.
- **VIZ rules:** no ids, no defs, no `Math.random`; `aria-label` never states the answer ("number line", not "pin at 7").
- **Speech:** every question needs a non-empty `say` (the fuzz fails otherwise). For Pre-K and K, `say` must name the bins or the task, since `gradeCfg().auto` is `'all'`. Chips should carry `data-say` so a tap can speak them, as `.w` does.
- **Labels:** under 60 characters (test.js fails at 60 or more), unique per fact, no `undefined` or `NaN`.
- **Pre-K choice limit:** `gradeCfg().choices` is 3 for Pre-K. Keep `sort` at 2 bins and 3–4 items there.
- **Do not edit guards to pass.** `KNOWN` lists, thresholds, `emoji-allow.txt` and fixtures stay as they are. The only legitimate tool edits are the ones named in section 6 and the `PARTS` and A11c file lists.

**Suggested batches:** A = `sort` + `mark` + `BANKF` + the rule in `makeQ`; B = `line`; C = `make`; D = `why` + find-the-mistake generators. Each can ship alone. The bank content for Discover and grammar can go to Sonnet in parallel once A's data format is fixed.
