# TAP-10: touch the model directly (BEST-APP roadmap 10)

Branch `tap10`, from v197 with items 4, 8 and 9 merged. Line numbers are those of this branch.

## 1. Audit

### 1.1 What is already tappable

The make kind (KINDS2-C) is the machinery. It has one card with a model, the − and + buttons, and a Check button. The
child taps the drawing (ten-frame cells or fraction parts), and the buttons do the same job for the keyboard. Scoring, two
tries, "Too many / Not enough yet", reveal and the a11y signal are all shared.

- `K2MM` models: `src/js/49b-kinds2.js:932`. Kind contract: `:1004`.
- Cell and part taps go through `bind`'s `act`. A parts model under 48 px gets `mm-notap` and is answered with the buttons
  (`:1063`, `src/css/37b-kinds-c.css:124`).

| Model | Where it is tappable in Practice (K2GEN, `49b-kinds2.js:1780ff`) | Share |
|---|---|---|
| Ten frame (`frame`; cells `VIZ.tenFrame(..., {cells:1})`) | tenf 1-3, pk_count 3, add 4 (K) | 45% |
| Base-ten blocks (`b10`, steppers) | pv 1, pv 2, big 1 | 40% |
| Coins (`coins`, tray and purse) | coins 1-3, 5 | 40-45% |
| Clock (`clock`, steppers) | time 1-5 | 40% |
| Array (`array`, steppers) | arr 1-2, mult 1-2, mfact 1-3 | 25-40% |
| Fraction bar / circle / grid (`parts`, tap a part) | frac 1, frac 2, geo 2, dec 1 | 30-40% |
| Number line pin (`line`) | cnt 1/4, round 1-4, frac 3, dec 1-2, pv 5, int 1-2 | 30-50% |

These models are tappable in **lessons only**:

- `frame2`: two colours (`src/js/52b-know.js:280`).
- `b10r`: blocks with trades (`52f-bench.js:64`).
- `bars2`: two fraction bars, with a locked top bar for equal fractions (`52i-bench35.js:259`; `mm-notap` comes from 49b).
- `pvc`: a place-value chart (`52i-bench35.js:280`).

These are in lazy parts that Practice never loads. The lessons also already build sub 1, miss 1, add 1 and the grade 1 facts on
the frame:

- `52c-scripts.js:141`, `:157-159`, `:176`;
- `52g-drafted.js:173-213` (lsFactStop and lsMiss).

### 1.2 Display-only models that would make good tap answers

Survey: 200 seeds per math stop.

| Stop (grade) | What it shows today | Kind mix before | Evidence |
|---|---|---|---|
| add 1 (K) | equation, blocks hint | num 100% | `30-gen-math.js:2-6`; lesson builds it on the frame `52c-scripts.js:141` |
| sub 1 (K) | equation, blocks hint | num 100% | `30-gen-math.js:12-13`; lesson frame with counters in `52c-scripts.js:159` |
| miss 1 (K) | `a + ? = c` | num 100% | `30-gen-math.js:7-11`; lesson frame `52c-scripts.js:176` |
| add 2, add 3 (1st) | equation; ten-frame strategy hints (factHint) | num 100% | `30-gen-math.js:2-6`, `:22-50`; lessons `52g-drafted.js:197` |
| sub 2, miss 2 (1st) | equation; ten-frame hints | num 100% | `30-gen-math.js:12-18`; lessons `52g-drafted.js:180`, `:212` |
| big 2 (1st) | 2-digit sum, no regrouping | num 100% | `30-gen-math.js:65` |
| frac 5 (3rd) | equal fractions, bars drawn (`fracEquiv`) | choice 49% num 52% | `33-gen-math-mid.js:211-229` |
| frac 4 (3rd) | two bars to compare | choice 62% sort 39% | `33-gen-math-mid.js:191-208`; the answer is a symbol, so not a tap model |
| fop 1, fop 2 (4th) | bars in the hint / repeated bars (`dsRep`) | num 77-100% | `35-gen-math-upper.js:285-300`, `:349-372` |
| tenf 1-3 (K) | counters to count | num 55-60% | `31-gen-math-early.js:424-455` (already 45% make) |
| ratio 1 (6th) | two-colour frame (dots) | choice | `35-gen-math-upper.js:1561`; a ratio, not a count to build |

### 1.3 Where the value is

1. **K add 1, sub 1, miss 1.** Every Kindergartner meets these. They are 100% number pad today, and the lesson already teaches
   them on the frame with words written for them. This is the biggest gain.
2. **1st grade add 2, add 3, sub 2, miss 2.** These are the make-ten stops, and the frame is the strategy taught. They are
   fluency stops, so the share stays modest.
3. **frac 5.** Shading n/d on a bar cut into D parts is the model of an equal fraction. Its hint already draws the two bars.
4. **big 2.** The blocks model and its words already exist (k2B10, big 1).

Not done:

- frac 4, ratio 1: the answer is not a quantity to build.
- fop 1, fop 2: need a new sentence (2.3).
- frac 5 with 9, 10 or 12 parts: bars are capped at 6 parts so each is 48 px.

## 2. What was built

- **Converters:** `src/js/49c-tap10.js`, in the `gen` part, because gen2 is at its 400 KB warning. They are listed in `K2GEN`
  (`49b-kinds2.js`).
- **New model option:** `m.from` on the frame (counters already in, to take away). It is validated: more than the answer, fits
  the frame, never with `m.fixed`.

Everything else is the make kind unchanged:

- cell taps (an empty cell adds a counter, a filled cell takes one out);
- the − and + buttons with their existing labels;
- Check, two tries, "Too many / Not enough yet", reveal;
- the 48 px rule.

### 2.1 Stops and rates

The rates are shares of each stop's questions, measured over 400 seeds. As in KINDS2, a share is a seeded draw made after the
fact. A share that is a function converts only the facts the model can show, and is raised to reach the plan.

| Stop | Model | Plan | Measured | Only these facts |
|---|---|---|---|---|
| add 1 (K) | frame 5/10 (k2AddFrame, as add 4) | 40% | 39% | a, b ≥ 1 |
| sub 1 (K) | frame 10, starts with a counters in | 40% | 41% | 1 ≤ b < a |
| miss 1 (K) | frame 10, a in (fixed) | 30% | 31% | a + ? = c, 1 ≤ a < c |
| add 2, add 3 (1st) | frame 20 | 25% | 23-24% | a, b ≥ 1 |
| sub 2 (1st) | frame 20, a in | 25% | 22% | |
| miss 2 (1st) | frame 20, a fixed | 25% | 25-27% | a + ? = c |
| big 2 (1st) | blocks, tens and ones | 40% | 39% | |
| frac 5 (3rd) | bar of ≤ 6 parts or circle of 8 | 30% | 30% | D ≤ 6 or D = 8 |

- **miss 1 is 30%, not 40%.** A make question carries no why sentence. KINDS2-D wants a why on at least 50% of miss 1, and
  30% keeps it at 54%.
- **Mix.** pickQ is unchanged, so MIX-8's cap of two of a kind in a row still holds.
- **Unchanged:** stars, pass, game time and coins. TAP-10 adds no scoring code.

### 2.2 Words: none new

| Stop | Prompt (screen / spoken) | Source |
|---|---|---|
| add 1 | "Put in a, then b more." / "a plus b. Tap the frame to put in a, then b more." | k2AddFrame, the add 1 lesson |
| sub 1 | "Take away b." / "There are a. Take away b." | `52c-scripts.js:159` |
| miss 1 | "Put in more to make c." / "a and how many make c? Put in more to make c." | `52c-scripts.js:176` |
| add 2-3 | "Make the answer on the frame." / "a plus b. Make the answer on the frame." | `52g-drafted.js:197` |
| sub 2 | "Take away b." / "a minus b. Take away b." | `52g-drafted.js:197` |
| miss 2 | "Put in more to make c." / "a plus what makes c? Put in more to make c." | `52g-drafted.js:212` |
| big 2 | "Make the answer with blocks." | k2B10 |
| frac 5 | "Shade n/d of the bar." / "Tap the parts to shade n d's of the bar." | k2FracShade |

The answer spoken on reveal is also an existing line:

- "a and b make c" (k2AddFrame);
- "a take away b leaves c." (the sub 1 lesson);
- "n is t tens and u ones" (k2B10);
- "k Ds" (fcSay).

The hint is the fact's own hint (q0.hint), or the reused converter's existing hint. The TAP-10 check tests every say, screen
text and spoken answer against these patterns, and checks that the phrases appear in the lesson sources.

### 2.3 Wording for owner approval (not built)

- **`? + b = c` on the frame** (miss 1, miss 2, the other half of each stop). The lesson words name the part already in first
  ("a and how many make c?"). For this form the spoken line would have to be: "What and b make c? Put in more to make c." It is
  not built.
- **fop 1, like fractions added on a bar.** It needs a prompt such as: "Shade a/d, then b/d more." It is not built.
- **fop 2, a whole number times a fraction.** It needs a prompt such as: "Shade n/d on each bar." It is not built.

## 3. Tests

**test.js `TAP-10`** reuses the KINDS2-C harness (k2BC). It checks:

- **Shares:** each stop is within 12 points of its plan, and no kind is over 65% except on the fluency stops.
- **Validity:** every new question passes `validate`, and its render is deterministic.
- **K2.off:** gives the pre-TAP-10 questions (TAP10_OFF, hashes from cc327f1).
- **Review:** the round trip works.
- **Per question:**
  - the model's own steps reach the answer from the start state;
  - every state one step off is judged wrong;
  - a frac 5 shading in other parts is still right;
  - the take-away frame starts full;
  - the hint renders;
  - the same seed gives the same question;
  - the words and the spoken answer match the lesson lines.
- **Validator:** the `m.from` rules.

**smoke `TAP-10`**, at 360x740 and 800x1280:

- real questions of all nine stops, answered by taps on cells and parts (the blocks by their steppers), with the fit checked;
- take away with one too few taken: "Too many", the hint, then right on the second try;
- take away by the keyboard;
- `answer()` on miss 2 and add 1.

**a11y screens:** `make-take`, `make-take-miss`, `make-frame20`, `make-equal`.

**Other test changes:**

- "Brain Teasers and practice fixes R-01b": its round simulation stubs the number kind and plays add 1. It now runs with
  `K2.off`, the existing K2OLD pattern ("old tests check old").
- `docs/drafts/HINTS-READ.md` is regenerated with `node tools/author.js --hints-read`. Two example questions (swap, pvcat on
  add 2) are now the frame form. No hint changed.

**Fixture:** `tools/lib/kinds2-seeds.json` is unchanged. The labels of add 1-3, sub 1-2 and miss 1-2 are kept by the
converters.
