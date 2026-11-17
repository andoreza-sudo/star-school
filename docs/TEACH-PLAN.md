# TEACH: a plan to make Star School a teacher, not only a quiz

Design plan, 2026-11-17. Read against `main` at v171 (commit d89495c). Nothing in the repo was changed, and no build or test was run. Size and probability figures below were calculated from the built files and the code; nothing here was tried on a tablet.

## Plain-language summary

**What happens today.** Star School asks a question, says "Try again" with a hint after a first miss, shows the answer after a second miss, and asks the missed question once more at the end of the round. It already has good parts of a teacher: step-by-step hints for big sums, a short "why" sentence for 11 skills, easier questions after three misses in a row, and a review system that brings missed questions back after 1, 3, 7 and 21 days. What it lacks is the teaching itself. A new stop starts with question 1, with no explanation first (only the first Spanish stops have a "Let's learn!" screen). Nothing notices a child who is tapping without thinking. A right answer by luck counts the same as a right answer by knowing.

**How much guessing pays today.** On a four-button question, random tapping almost never passes a stop (about 1 round in 300). On a two-button question it does: a Kindergartner tapping at random passes a two-choice stop about 1 round in 3, and a 1st grader about 1 in 6. Rounds can be replayed freely, so a patient guesser gets through. Also, on any two-button question the second try is always right, because the wrong button is switched off.

**What this plan changes.** Five things, in this order of value:
1. **Notice rushing and slow it down kindly.** No scolding and no lost stars: the pet says "Let's look first!", the buttons wait two seconds (or until the question has been read aloud), and a lucky answer counts half.
2. **Explain after a miss.** A second miss no longer only shows the answer. The pet shows why on a picture, the child enters the answer, then gets a twin question right away. After repeated misses the pet works a similar problem step by step, then steps back to an easier skill the hard one depends on, then returns.
3. **Teach before testing.** The first time a child opens a stop, the pet gives a 20 to 40 second "Watch me" on the pictures the app already draws (ten frames, blocks, number lines, clocks, coins, fraction bars), then one "your turn with me", then the round.
4. **Ask for answers that need understanding.** More "build it" and typed answers when rushing is seen, one try on two-choice questions, and a short "How do you know?" after some right answers.
5. **Check that it stuck.** A passed stop comes back for two questions after 2, 5, 12, 30 and 60 days. Grown-ups see "practiced" and "learned" as different things, and see when the child was rushing.

**What it costs.** Batch 1 is small and gives the biggest gain: it uses parts that already exist. Lessons for every stop are the large job, so they come in stages: math K to 2 first, where the pictures are ready. Everything stays offline, stays on the tablet, and uses the tablet's own voice; no microphone is used anywhere in this plan.

**Two things the owner should decide** (section 11): whether a lucky-looking answer should count half toward passing a stop, and whether the in-progress badges should be won on a later day rather than straight after practice.

---

## 0. What the code does now (the parts this plan builds on)

| Area | Where | What it does | Gap |
|---|---|---|---|
| Round and scoring | `50-round.js` `check()`, `next()`, `finish()` | Two tries. Only a first try scores. Pass at 7 of 10 (Pre-K 4 of 6, K 5 of 8: `gradeCfg().n`). Missed questions are re-asked at the end (`G.missed`, `G.retry`). | The second try on a 2-choice question is forced right. A reveal is passive: the answer is shown and said, then the next question comes after 2.6 s. |
| Answer time | `51-mastery.js` `mastShow()` sets `G.qt`; `mastTry()` records `ms`; `S.mast[nid].ms` | Used only to offer harder questions (5 of 5 right and fast). | A fast wrong answer means nothing to the app. |
| In-round adapting | `51-mastery.js` `mastMode`, `mastPick`, `easier()` | 2 or fewer of the first 5: hint before each try and every other question from the previous level of the same skill. 3 wrong in a row: one easier question. | "Easier" is only the same skill one level down on the same path. A level 1 stop has nothing to step back to. No link between skills. |
| Hints | `39-hints.js` `hintHTML`, `39b-steps.js` step builders | Step-by-step boards for column add, subtract, multiply, divide, fractions, decimals, stories (about 35 call sites in grades 2 to 6). Blocks and pictures for early sums. Most other hints are one line of text. | Steps describe this question. Nothing shows a worked example of a similar one. |
| Why feedback | `49b-kinds2.js` `K2WHY`, `k2WhyOf`, the `check` wrap | A sentence about the likely mistake, for 11 skills. Spoken for Pre-K to 1st. | Covers few K to 2 skills, where most guessing happens. |
| Question kinds | `49-kinds.js` `KIND`, `49b-kinds2.js` `K2GEN`, `pickQ` | choice, num, build, multi, order, match, tap, spell, trace, sort, mark, line, make. Share per stop is a number or a function. Never three of a kind in a row. | The share does not change with what the child has shown. Many Reading, Spanish and Discover stops are still nearly all choice (KINDS2-SPEC section 1). |
| Pictures | `23-viz.js` `VIZ.*` | Ten frame, base ten, number line with hops, fraction bar and circle, clock, array, coins, balance, area grid and more. Pure SVG strings. | Static. Step hints animate with CSS classes, so the method exists. |
| Review | `59-review.js` `S.rev`, `revSlot`, Daily Review; `mixGroups` in `50-round.js` | Leitner boxes over missed questions only: 0, 1, 3, 7, 21 days. Slots at questions 2, 4, 6, 8. Questions 4 and 8 fall back to a random older stop. | A question answered right is never scheduled, even if it was luck or hinted. No schedule per stop. Skipped stops (placement, test out) are never checked. |
| Mastery | `51-mastery.js` `masteryState` | "Mastered" = 90% over 20 tries on 2 or more days. | Two days can be two days in a row. No delayed check. |
| Check-ins (in progress, `mastery` worktree) | `51b-checkin.js` `CHK` | 5 questions, no hints, one try, 4 right wins a badge. Offered after 12 tries at 70%. | Offered right after practice, which measures today's performance, not learning. See section 5. |
| Teach first | `46-home.js` `learn()` | Spanish level 1 stops: cards to tap and hear before the round. | Only Spanish. `47-trace.js` `TR.demo` is the other "watch me" in the app. |
| Voice | `12-speech.js` `say()`, `speakBusy()` | Tablet speech for English. Recorded Spanish (670 files) and recorded praise in six voices (438 files). Pre-K and K prompts are read aloud 400 ms after the question shows. | A child can answer before the prompt has been read. `say()` has no "finished" callback; `speakBusy()` can be polled. |
| Grown-ups | `82-report.js` `REP`, `53-activity.js` `S.log`, `80-grown.js` | Minutes, rounds, accuracy, mastery by strand, needs practice, "Practise this next" (`S.pin`). | Nothing about rushing, hints used, lessons, or whether skills were kept. |

**Size limits that shape the work** (calculated from the v171 files):
- `index.html` is 943,632 bytes; limit 1,000,000. Keep new code out of it, as the task says.
- **Loaded at start** (index.html + gen + gen2 + bt + data) is about 2,930,657 bytes; `tools/test.js` fails at 3,000,000. That leaves about 69 KB, and the check-in and Discover branches will use some. This is the tighter limit.
- Audio is 2,987,023 bytes of a 4,500,000 limit, so about 1.5 MB is free. At the current recipe (Opus, 16 kbit/s, about 2 KB per second) that is roughly 150 recorded lines of five seconds.

**How new code attaches without growing index.html.** `49b-kinds2.js` already wraps `check`, `hintHTML` and `kindProblems` from a part file. The same works for `renderQ`, `next`, `makeQ1`, `start`, `open` and `pickQ`: all are function declarations. It does not work for `const` values (`easier`, `MAST`, `REV`), so those need a one-line hook in index.html. Each such hook is named below.

**Proposed files**
- `src/js/51c-guess.js`, about 5 KB, in the `gen2` part (loaded at start: it must be present for every question).
- `src/js/51d-teach.js` + `src/css/51d-teach.css` (the lesson tables live in the same JS file, not in `src/data`, which loads at start), as a **new part `teach` in `LAZY`** (`tools/build.py` and `LAZY_PARTS` in `90-app.js`). Load it with `partsThen(['teach'], ...)` when a map opens, so it is ready before a stop is tapped. If it has not loaded, the round starts as it does today.
- One switch, `TEACH.off`, that makes every round exactly what it is in v171 (the `K2.off` pattern), so the old seed-hash tests keep passing.

If the start-up total is under 30 KB after the two in-progress branches merge, do a room chunk first. The obvious candidate is the `bt` part (583,560 bytes of Brain Teaser puzzle types, loaded at start). Home only calls `BT.dailyInfo()` and `BT.get()`; whether those work without the puzzle-type files needs checking before promising it.

---

## 1. Detecting guessing, and responding kindly

**Learning science.** Very fast answers are the best cheap signal of low effort (Wise and Kong 2005, response-time effort). Children "game" tutoring software mostly on material they find hard (Baker et al. 2004), so guessing is a sign that teaching is needed, not a discipline problem. A short pause and a format change raise effort; penalties and warnings to young children do not.

**What the child experiences**
- Nothing, if they answer at a normal pace. Fast and right on a skill they know is fluency and is left alone.
- After two rushed answers in the last four: the pet says "Let's look first!" (spoken, no text needed). On the next questions the answer buttons are dim for about 2 seconds while a ring fills, or until the question has been read aloud. Three unhurried answers in a row turn it off again.
- If it continues: the next questions change format to build-it, number line, sort or typed answers (section 4), and then a "Watch me" lesson plays (section 2).
- The child never sees the word "guess", never loses stars already won, and is never told off.

**The three signals** (all on first tries, kept for the round in `G.gs`)

| Signal | Rule | Notes |
|---|---|---|
| Rapid | Answered in under `GUESS.FAST` ms: 1,500 for choice and tap in 1st grade and up; for Pre-K and K, under 2,000 ms or while the prompt is still being spoken (`speakBusy()` at the moment of the tap). | A mark only when the answer is wrong, **or** right while the stop's accuracy `S.mast[nid].p` is under 0.6. Never a mark on a stop at 0.8 or better. |
| Cycling | The second try comes under 1,000 ms after the first miss. For `sort` and `multi`: Check pressed again under 1,500 ms with one change. | Tapping through the buttons until one is right. |
| Position | Choice questions with 3 or more buttons: the same button position on 4 first tries in a row, or a strict rotation (0, 1, 2, 3). | Position = index of `el` among the `.choices` buttons, read in the `check` wrap. Generators shuffle, so the same position being right four times by chance is about 1 in 64. |

Guess mode is on at 2 marks within the last 4 first tries, and off after 3 unmarked first tries in a row.

**The responses, in order**
1. **Listen first** (always on for Pre-K and K, not only in guess mode): answer buttons are locked until the first reading of the prompt ends, with a 6 s cap. This removes the most common way a non-reader guesses, tapping before listening.
2. **Slow start**: in guess mode, a 2 s lock with a visible ring (`.inp.wait`, `pointer-events: none`, `aria-disabled`).
3. **Half credit**: a marked right answer counts 0.5 in the mastery record, the same mechanism as an answer given with the hint showing (`mastAdd(k, .5, ms)`), and it does not move a review item up a box.
4. **Change the format**: `pickQ(sk, lv, want)` prefers kinds that cannot be tapped through (section 4).
5. **Teach**: the third time guess mode turns on in a round, the ladder's worked example plays (section 3).

**How it fits the code**
- `51c-guess.js` wraps `check` (as `49b-kinds2.js` does): before calling the old `check` it reads `Date.now() - G.qt`, `speakBusy()`, the button index and `G.tries`; it sets `G.gm` (the mark for this question).
- Half credit needs `mastTry(q, ok, ms, helped)` to see the mark. `check()` passes `G.hq` as `helped`, so the wrap sets `G.hq = true` for a marked right answer before calling through. No change in index.html. Side effect: `finish()` already takes half off for helped answers when rating the round, so a marked answer counts half toward the pass too. That is intended; see the decision in section 11.
- `revRight` guard: one condition in `check()`: `if(first&&!G.gm&&!G.hq&&revRight(q))` (about 15 bytes in index.html).
- Locks: wrap `renderQ`; add the class after `K.bind`, remove it on a timer or when `speakBusy()` turns false (poll every 150 ms).
- Saved data: `S.log[day].g` (marked first tries) and `S.teach[nid].g`; both optional fields read with defaults, as `S.mast` is.
- Fact Sprint, Fact Race, placement and the Game Room do not go through `check()` and are unaffected. Boss rounds, test out and check-ins: detect and record, but only the listen-first lock applies.

**Size:** S to M (about 5 KB).

**Risks**
- False alarms on fast, able children. The rule only marks fast-and-wrong, or fast-and-right on a weak stop. Thresholds are constants in one object (`GUESS`) so they can be tuned.
- The lock annoys. It is 2 s, shown as a filling ring, and ends after three calm answers.
- Tablet speech that never reports its end (the code already works around this in `ttsPoll`). The 6 s cap covers it; with no voice at all the lock is 1 s.
- Tests rely on "the same answers give the same questions". Time now matters, so the detector reads time through `GUESS.now()` and tests set it.

**How to test**
- `tools/test.js`: a pure function `guessMarks(tries)` with fixtures. Three simulated children over 500 rounds each, in the style of the placement simulation in R-01-practice: a random tapper (400 ms answers), a fast expert (900 ms, 95% right), a slow learner (6 s, 55% right). Assert: the tapper is in guess mode by question 6 in 95% of rounds and passes under 2% of four-choice stops; the expert is never marked; the learner is never marked.
- `tools/smoke.js`: a round with the clock stubbed; check the lock class appears and clears, and that stars are unchanged.
- `tools/a11y.js`: the locked state on the question screen. Screenshots at the three usual sizes.

---

## 2. Teach-first mini lessons ("Watch me")

**Learning science.** Novices learn more from studying a worked example than from solving the same problem (Sweller and Cooper 1985). The steps should then fade: a full example, then one with the last step left to the learner, then practice (Renkl and Atkinson 2003). Words spoken over a picture beat words printed beside it (Mayer's modality principle), which also suits non-readers. Start with objects, then pictures, then symbols (concrete, representational, abstract; Fyfe et al. 2014).

**What the child experiences**
1. Taps a new stop. The pet stands beside a board: "Watch me!"
2. **I do** (two or three beats, 5 to 8 s each): the picture builds itself while the pet talks. For "Make Ten": seven counters drop into a ten frame one by one, the pet counts, the empty boxes glow, "three more make ten".
3. **We do** (one beat): the same picture with a new number and the last step left open. The child does it, with the answer area they will use in the round (`make`, `line`, or the number pad). A miss here just shows the step again. It is not scored.
4. "Your turn!" The round begins. Total 20 to 40 seconds; Pre-K at most 20.
- A "Skip" button appears after the first beat (a child placed above the stop does not need it). A "Show me again" button sits on the Help button's row during the round, and on the stop's card on the map.

**When a lesson plays (triggers)**
| Trigger | Lesson |
|---|---|
| First round ever at a stop (`!mastRec(nid)` and the stop not passed) | Full lesson. |
| Back at an unmastered stop after 14 or more days (`S.mast[nid].last`) | First beat only, as a reminder. |
| Ladder rung 2 (section 3): repeated misses in a round | Worked example of a similar problem. |
| Guess mode turns on a third time in a round | Same as rung 2. |
| The child taps "Show me again" | Full lesson. Counts as help for the next question (`G.hq`). |
Never in a boss fight, test out, check-in, Daily Review or Mixed Practice. At most one full lesson and one re-teach per round.

**Where lessons come from (three sources, cheapest first)**
1. **Free, from step hints.** Any stop whose questions carry `hint.k == 'steps'` gets a lesson made by code: draw a fresh question of the stop (`genQ`), play its steps one after another with the voice (the builders in `39b-steps.js` already give `{html, say}` per step), then draw a second question and play all but the last step. That covers the multi-digit stops of grades 2 to 6 with no authoring.
2. **Picture templates** for K to 3 math: about ten small functions, each a list of beats over one `VIZ` model, taking numbers as arguments. One table maps stops to them:
   ```js
   // 51d-teach.js
   const LESSON = {           // nid -> [template, ...arguments]
     tenf1: ['frameCount', 7],   tenf2: ['makeTen', 7],      add4: ['frameAdd', 3, 2],
     cnt4:  ['hops', 6, 3],      sub1:  ['frameTake', 8, 3], pv1:  ['tensOnes', 34],
     big3:  ['carry', 38, 47],   mult1: ['groups', 3, 4],    arr1: ['array', 3, 5],
     frac2: ['fracName', 3, 4],  time1: ['clockHour', 4],    coins1: ['coinCount', [5, 1, 1]],
   };
   ```
   Templates: `frameCount`, `makeTen`, `frameAdd`, `frameTake`, `hops` (number line: count on, back, skip count, round), `tensOnes`, `carry` and `trade` (base ten), `groups` and `array`, `fracName` and `fracCompare` (bars), `clockHour`, `coinCount`, `balance` (missing number, one-step equations). Roughly 60 math stops for about 15 KB.
3. **Card lessons** for Reading, Spanish and Discover: `learn()` in `46-home.js` made general. A rule in one spoken sentence, two examples and one "not this" (examples with a non-example teach a category better than examples alone), then the round. Phonics lessons use sound boxes: a box per sound lights as it is said, then the word is blended. This is content work per stop; see batch 4. The in-progress Discover content is a good place to add a spoken `teach` line per item (R-01-discover "Should 5" asks for the same thing).

**How it fits the code**
- Wrap `start(p, i)` from the `teach` part: if a trigger holds and `TEACH.lessonFor(nd)` returns beats, show the lesson screen with `view()`, then call the old `start`. `open()` already branches to `learn()` for Spanish this way.
- Lesson screen: the round's top bar and prompt card classes (`.qarea`, `.prompt`) so `fit()` and the subject colours work. A beat is `{html, say, cap, wait}`; `html` comes from `VIZ.*` or a step board. Animation is CSS only (opacity and transform on classes added per beat), as in `39-steps.css`.
- Pacing: call `say(beat.say)`, then poll `speakBusy()` every 150 ms; advance when it is false and at least `beat.wait` ms have passed. Tapping anywhere goes to the next beat. No change to `12-speech.js`.
- The "we do" beat reuses a real kind: build a question with the existing converters (`k2Frame`, `k2AddFrame`, `k2B10`, `k2Clock`, `k2Array`, `k2Cnt`...) and render it with `KIND[q.kind].render/bind` using a local state object, as placement (`PL`) and Speed Race (`RC`) already do.
- Saved data: `S.teach[nid] = {l: day of first lesson, n: lessons seen, ...}`.
- Wording rules: the pet teaches ("Watch me", "Your turn"). No wizard, wand or spell wording in any line, and "silent e", never "magic e", in phonics lessons. Lesson lines go through the same kid-safe word check as `why` sentences (`BAD` in `k2WhyProblems`).

**Size:** player M (about 12 KB with CSS); step-hint lessons S; picture templates M to L; card lessons L (content).

**Risks**
- Children skip it. Keep it short, make the "we do" beat a thing to do, and show Skip only after the first beat. Measure skips (section 8).
- Tablet voices differ in speed, and some tablets have none. Beats advance on a timer when there is no voice; captions of four words or fewer carry the idea for readers.
- A lesson that is wrong teaches the wrong thing. Templates take their numbers from arguments and recompute every spoken number, and tests check them the way the step builders are checked (3,000 random inputs each).
- Cheap tablets: one SVG and CSS transitions only; no canvas, no timers faster than 150 ms.

**How to test**
- `tools/test.js`: every `LESSON` key is a real stop; every template's beats have non-empty `say` with no symbols or markup; numbers said match numbers drawn; lesson length 2 to 5 beats.
- `tools/shots.js`: one screenshot per template beat at 380x780, 600x960 and 1024x600, looked at.
- `tools/smoke.js`: open a new stop, lesson shows, Skip works, round starts; open it again, no lesson.
- `tools/perf.js`: the lesson's first frame on the throttled profile.

---

## 3. A remediation ladder after misses

**Learning science.** Feedback that explains beats feedback that only marks right or wrong, and it works best when the learner then does something with it (Hattie and Timperley 2007). Mastery learning (Bloom) says to fix a gap before building on it. Some struggle is useful when help follows; repeated failure without help is not (Kapur's productive failure assumes instruction after the attempt).

**What the child experiences**

| Rung | When | What happens | Exists today? |
|---|---|---|---|
| 0. Hint and why | First miss on a question | "Try again", the hint, and the why sentence where there is one. | Yes. Extend `K2WHY` (below). |
| 1. Explain the answer | Second miss on a question | The answer is shown **on the picture** with one spoken reason. The child then enters that answer (taps it or types it), so they produce it once. The very next question is a twin: same stop, other numbers, hint showing. The missed question still returns at the end of the round. | Partly: today it is shown and said, with no action and no twin. |
| 2. Worked example | 2 questions revealed in a round, or 3 wrong first tries in a row (`MAST.RUN`; today that gives one easier question, which still follows the example) | "Let me show you one." A 20 s worked example of a similar problem (section 2, sources 1 and 2), then one with the last step left open. | No. |
| 3. Step back | Still missing after rung 2 (another wrong run, or 2 or fewer right of 5) | "Let's get ready for this one." Two or three questions from the skill this one depends on, with their pictures. If they go well, a one-line bridge ("Tens and ones: that's what we trade here") and back to the stop. If they also go badly, the round ends early and kindly, with stars and coins for what was right, and the map points at the earlier stop. | Only "previous level of the same skill". |
| 4. Return | Next day | The stop is due again (`S.sp`, section 5); its first question comes with the hint. | No. |

**Prerequisite links between stops**

Today the only link is `easier(nd)`: the same skill, one level down, same path. It has nothing for a level 1 stop, and cannot say that borrowing needs place value. Add one table, keyed by the stop ids the save already uses (`nid` = skill + level, for example `sub4`):

```js
// 51d-teach.js. nid -> the stops it depends on, most important first.
// The previous level of the same skill is implied and tried last.
const PRE = {
  add4: ['tenf1'],            sub1: ['add1'],             miss1: ['add1'],
  big3: ['pv1', 'add3'],      sub4: ['pv1', 'sub2'],      pv2: ['pv1', 'big1'],
  mult1: ['cnt2'],            arr1: ['mult1'],            mfact1: ['mult2', 'arr1'],
  dfact1: ['mfact1'],         mbig2: ['mfact4', 'pv2'],   dbig1: ['dfact4'],
  time4: ['cnt2', 'time2'],   coins2: ['cnt2', 'coins1'], round1: ['pv1', 'cnt1'],
  frac4: ['frac2'],           frac5: ['frac2', 'mfact2'], fop3: ['frac5', 'fact1'],
  dec1: ['frac2', 'pv2'],     alg1: ['miss2'],            ratio1: ['mfact4', 'frac5'],
  build1: ['sound1', 'sound3'], pic3: ['pic1'],           spell1: ['build1'],
};
function stepBack(nd) { /* the first PRE stop that exists on a map, else easier(nd), else null */ }
```
- About 40 links cover K to 4 math and early reading, where a missing foundation hurts most. The list above is a starting draft and needs a pass by someone checking each against `docs/CURRICULUM.md`.
- `tools/test.js` rule: every key and value is a real stop; no loops; a prerequisite sits earlier on its path than the stop that needs it, or in a world of a lower grade.
- A second use: the Grown-ups report can say "Borrowing is hard because Tens and Ones is not solid yet".

**How it fits the code**
- State for the round: `G.lad = {rev: questions revealed, rung, back}`. Driven from the `check` wrap (rungs 0 to 2) and a `makeQ1` wrap (twin question, step-back questions).
- Rung 1: wrap `check`; on the reveal path, after `K.reveal(q)`, keep the question on screen with one enabled target (the right choice, or the pad with the answer ghosted in the slot) instead of the fixed 2.6 s `setTimeout(next, 2600)`. That timer is inside `check()` in index.html, so this needs a small hook there: `if(!(G.hold&&G.hold(q)))setTimeout(next,2600)` (about 30 bytes).
- Rung 3: `mastPick()` calls `easier(nd)`, a `const`, so it cannot be wrapped. One-line edit in `51-mastery.js` (index.html, about 60 bytes): `const e = own ? null : (typeof stepBack == 'function' ? stepBack(nd) : easier(nd))`. Questions from another stop already get tagged and recorded correctly (`G.mq`, `mastTag`), and `revMiss` already files a miss under the question's own skill.
- Early end of a round: set `G.n = G.done` and `G.missed = []`, then `next()` reaches `finish()`; add a kind line to the end card ("Let's build up to this") through `RW.done`'s `tip`. Set `S.pin` to the prerequisite stop, the field the report's "Practise this next" already uses.
- More why sentences, added to `K2WHY` in `49b-kinds2.js` (gen2): `add` 1 to 3 (off by one when counting on), `sub` 1 and 2 (added instead of taking away), `cmp` (the sign reversed), `time` 1 to 3 (hands swapped), `coins` (counted the coins, not their value), `pk_count` (skipped one or counted one twice), `frac2` (top and bottom swapped; counted the unshaded parts), `mfact` (added instead of multiplying; the fact next door), `sound` (first sound given for the last), `abc` (b and d, p and q).

**Size:** rung 1 S; rung 2 S once the lesson player exists; rung 3 with `PRE` M; why sentences M (each needs its test).

**Risks**
- The round gets long. Ladder steps do not count as questions; cap the extra time at one re-teach and one step back per round.
- The step back feels like being sent down. It is framed as "getting ready", uses pictures, and returns the same round when it goes well.
- A wrong link wastes time. The table is small, tested for order, and each use is logged (`S.teach[nid].back`) so a link that never helps shows up in the numbers (section 8, measure 2).
- The mastery branch is editing `check()` and `finish()` now. Build after it merges, and keep to wraps plus the two one-line hooks.

**How to test**
- `tools/test.js`: the `PRE` rules; ladder state as a pure function of a list of results; the simulated slow learner reaches rung 2 and rung 3 in the expected places.
- `tools/smoke.js`: scripted misses reach each rung; the early end still gives the chest and saves.
- Check on a phone-sized screen that the explained reveal fits above the pad (the R-01m hint scrolling problem).

---

## 4. Making answers require understanding

**Learning science.** Producing an answer strengthens memory more than recognising one (the generation effect; Karpicke and Roediger 2008 on retrieval). Explaining why an answer is right improves transfer to new problems (Chi et al. 1989; Rittle-Johnson 2006).

A note on "fewer choices": removing buttons makes a lucky answer more likely, not less (2 buttons is a coin flip). Use fewer choices only as support after a miss, and always with one try. To stop guessing, take the buttons away entirely.

**What the child experiences, and how it fits**

| Change | Child sees | Code | Size |
|---|---|---|---|
| **One try on two-choice questions** | A miss on a yes/no or el/la question goes straight to the explained answer (rung 1). No free second try. | `check` wrap, for `q.kind == 'choice' && q.choices.length <= 2`: let the first miss be recorded as now (`mastTry` and `addMiss` both depend on `G.tries == 0`), then send the same value through the old `check` once more so it takes the reveal path. Check that `K.retry` running in between leaves nothing odd on screen; if it does, use a one-condition hook in `check()` instead. `revFact` already treats two-choice questions specially. | S |
| **Typed instead of tapped** | In guess mode, a question whose buttons are all numbers arrives with the number pad. | `k2Typed(q)` in `51c-guess.js`: a `choice` question whose choice values are all whole numbers becomes `{kind: 'num', ans}` with the same prompt plus a slot. Applied in the `pickQ` wrap. | S |
| **Build-it preferred** | In guess mode and for the last two questions of a round, the stop's `make`, `line`, `sort`, `order`, `build` forms come first. | `pickQ(sk, lv, want)`: the draw loop already retries up to 10 times for kind; add a wanted set. Stops that only have choice are remembered in `KMONO`. | S |
| **Lock it in** | In guess mode on choice questions: the first tap selects a button and says it aloud; a Check button confirms. | A flag read by `KIND.choice.bind`; that code is in index.html (`49-kinds.js`). Better: wrap `KIND.choice.bind` from gen2, reuse `multi`'s `#mcheck` button. | S to M |
| **Show me** | After a right typed answer in K to 2, sometimes: "Show 8 + 5 on the ten frames." | The `make` converters exist (`k2AddFrame`, `k2Frame`, `k2B10`, `k2Coins`, `k2Clock`, `k2Array`). A follow-up question built from the one just answered, not counted in the 10. | M |
| **How do you know?** | After some right answers (one or two a round, and after any marked answer): two or three reasons to pick from. "1/4 is bigger than 1/8. Why?" "Fewer parts, so each part is bigger" / "4 is smaller than 8". For non-readers the reasons are pictures: "Which picture shows it?" | New optional field `q.because = {ok, no: [...]}`, filled by the same functions that write `q.why` (they already hold the misconception sentences). Rendered as a `choice` question on the same screen. Not scored for stars; recorded in `S.teach[nid].x` as evidence of understanding. | M |
| **Pictures first, then numbers** | The first rounds at a stop have more build-it and picture questions; later rounds more plain number questions. | `K2GEN` shares can already be functions. Multiply the share by a stage factor from the mastery record: about 1.5 while `n < 10`, 1 after, 0.5 once `p >= .8`. One helper, `k2Stage(sk, lv)`, used in `k2Wrap`. | S to M |

**Risks**
- Slower rounds for children who do know. Everything except "one try on two choices" and "pictures first" is tied to guess mode or limited to one or two per round.
- "How do you know?" becomes one more thing to guess at. It is never scored, its wrong reasons are real misconceptions, and a wrong pick leads to the picture explanation.
- Changing which kind is drawn changes the random draws. Tests that pin seeds must run with `TEACH.off`, as `K2.off` does for KINDS2.
- Review rebuilds a question from its seed; a converted question must keep its `label` so `revQ` still matches it (KINDS2-SPEC fact 4).

**How to test**
- `tools/test.js`: `k2Typed` and `because` pass `kindProblems`; every `because.ok` is true for its question (recomputed) and no `no` entry is; the stage factor keeps each stop's kind mix inside the KINDS2 limits.
- `tools/kinds-samples.js`: kind counts per stop at stage 1, 2 and 3.
- Smoke: a two-choice miss goes to the explained answer; Check appears in guess mode only.

---

## 5. Spacing and review scheduling

**Learning science.** Practice spread over days beats the same practice in one sitting (Cepeda et al. 2006). Mixing problem types makes practice feel harder and tests come out better (Rohrer and Taylor 2007). How well a child does during practice is a poor guide to what they will know next week (Soderstrom and Bjork 2015), so learning has to be checked after a gap.

**What exists**
- `S.rev`: Leitner boxes for **missed questions** (0, 1, 3, 7, 21 days), cap 150, asked at questions 2, 4, 6, 8 of a normal round and in Daily Review.
- Questions 4 and 8 fall back to a random older passed stop when nothing is due.
- Mixed Practice: 50% recent stops, 30% weak, 20% older.
- "Mastered" needs practice on 2 different days. Check-ins (in progress) are offered by tries and accuracy.

**What is missing**
1. Only misses are scheduled. A stop passed by luck or with hints is never looked at again unless chance picks it.
2. Nothing checks a whole skill after a gap, so there is no measure of retention.
3. Worlds skipped by placement or test out are never sampled.
4. A hinted or lucky right answer promotes a review item.
5. New skills are practised in a block and then left; mixing is two slots a round.

**What should change**

| Change | Child sees | Code | Size |
|---|---|---|---|
| **A schedule per stop** | Two "Remember this one?" questions from a stop passed a few days ago, inside normal rounds. | `S.sp = {nid: {b, due}}`. On a first pass (`finish()`, `newPass`): `b = 0`, due in 2 days. Intervals 2, 5, 12, 30, 60 days. In `makeQ1` the fallback `pick(old)` at questions 4 and 8 becomes "the most overdue stop in `S.sp`"; that line is in index.html, so wrap `makeQ1` instead: at those two slots, in a normal stop round with no review item due on the path (`dueItems(1, G.path)` is empty), return a spaced question before the old function runs. Right, first try, no hint, no mark: up a box. Wrong: down a box and rung 1. | M |
| **Clean promotions** | Nothing visible. | A `S.rev` item moves up only on an unhelped, unmarked first try (section 1). | S |
| **Sample skipped worlds** | Now and then a question from a world they tested out of. | Stops of `S.skip` worlds enter `S.sp` due now, at most one per round. A miss sets `S.pin` and shows in the report. This is "practice Should 4" from R-01. | S |
| **Mixed replays** | Replaying a stop they are good at (`p >= .8` over 10 tries) mixes in about 3 questions from sister stops of the same strand. | `makeQ1` wrap. The first pass of a new stop stays unmixed: a beginner needs the block. | S to M |
| **Sooner first repeat** | A fact just taught or just explained comes back 3 questions later, not only at the end of the round. | Push the twin's label into a short queue read by the `makeQ1` wrap. | S |
| **A cap** | New learning is never crowded out. | At most 3 of 10 questions are review or spaced; the rest wait for Daily Review, whose card count adds due stops. | S |

**Check-ins and badges (in progress): one suggestion.** `CHK.ready` offers the badge check-in after 12 tries at 70%, which is usually minutes after practice. A badge would mean more if the check-in were offered when the stop is next due in `S.sp` (two or more days later). The child still gets the badge moment; it then certifies that the skill was kept. That makes the badge the plan's definition of "learned" (section 7), and it gives the retention number in section 8 for free. This is a change of one condition in `CHK.ready` plus the `S.sp` store; it should be agreed with whoever is finishing that branch.

**Risks:** save size (`S.sp` for about 250 stops is under 10 KB; add a size check like the 40 KB one for `S.rev`); the tablet's clock being set back (use `revDue`'s rule: an item due further ahead than the longest interval is treated as due); too much old material for a child racing ahead (the cap).

**How to test:** `tools/test.js` with a fake day counter (the review tests already do this): a stop moves through all five boxes; a wrong answer moves it down; the cap holds; a year of simulated daily play never asks more than 3 spaced questions in a round and never loses a stop.

---

## 6. For non-readers (Pre-K and K): voice first

**What the child experiences**
- **Listen, then answer.** Buttons wake up when the question has been read (section 1). The big speaker button replays it at any time.
- **Lessons with almost no text.** The pet talks; the picture moves; counting is heard one number at a time as each counter lands. Captions are a numeral or up to four words.
- **Touch to hear.** On picture choices, the first tap says the name of the picture and selects it; a large green tick confirms. (Bank items already support spoken choices with `aloud`.) Used for Pre-K always, for K in guess mode.
- **Spoken explanations.** Every why sentence and every explained answer is spoken for Pre-K to 1st (the why wrap already does this for `gradeOf() <= 1`).
- **"Say it with me."** A lesson beat can invite the child to count or say the sound aloud. The app does not listen and does not open the microphone; saying it is its own benefit.
- **Shorter everything.** Rounds are already 6 questions for Pre-K and 8 for K. Lessons at most 20 seconds and 3 beats; one step back at most.
- **No reading needed to recover.** "Let's look first", "Watch me", "Your turn", "Let me show you" are all spoken, and each has a picture cue (the pet looks at the board; a hand points).

**Voice: tablet speech or recordings?**
- Default: the tablet's own voice through `say()`, as for all questions and hints now. It works offline and costs no bytes.
- Tablet voices vary, and some tablets have none (`noVoice`). Lessons must work silently: beats advance on a timer, and the pointing hand and counting pips carry the idea.
- For the 20 to 30 Pre-K and K lessons, record the fixed lines with the existing pipeline (`tools/en-audio.js`, `tools/voice-audio.js`, a new kind `teach`, one voice). About 150 five-second lines fit in the free audio budget. Number words 0 to 20 are recorded once and joined, the way `enPlan` already splits a line into recorded sentences plus the rest. This is batch 4: lessons ship first with the tablet voice.
- Spanish lessons use the recorded Spanish that exists (`esFiles`), as `learn()` does.

**How it fits the code:** all in the `teach` part and `51c-guess.js`; `pkQ` questions (`q.pk`) already mark Pre-K layouts with the big speaker and bulb buttons. **Size:** S on top of sections 1 and 2; recordings M. **Risks:** speech that starts late or not at all (caps on every lock); a lock that outlasts a child's patience (6 s at most, and the ring shows it is coming). **How to test:** smoke with the speech engine stubbed three ways (normal, never ends, missing); screenshots of Pre-K lesson beats; a real-tablet pass, since voice timing cannot be trusted from a desktop run.

---

## 7. What grown-ups see

**In the report card** (`82-report.js`, `REP.data()` and `REP.html()`; it lives in the `gen` part, so it has room)

- **Practiced and learned are separate columns.**
  - *Taught*: the lesson was seen.
  - *Practicing*: tried, not yet passed.
  - *Passed*: 7 of 10 in a round.
  - *Learned*: passed a check two or more days later without help (the `S.sp` box 1 promotion, or the badge if section 5's suggestion is taken).
  - The existing "mastered" state stays as the top level. One line under the table: "Learned means your child still knew it days later."
- **Rushing**, in plain, blame-free words: "Answered very quickly on 14 of 60 questions this week, mostly in Even or Odd. Star School slowed down and showed a lesson. Tip: sit together for one round of Even or Odd." Shown only above a small threshold (say 10% of the week's first tries).
- **Needed a step back**: "Borrowing: went back to Tens and Ones twice." With the existing "Practise this next" button (`S.pin`).
- **Help used**: share of right answers given with a hint showing (`G.helped` is already counted per round; add it to `S.log` as `h`).
- **Still knows it**: "Remembered after a week: 14 of 18 skills."
- **Lessons**: how many watched and how many skipped.

**In settings** (`80-grown.js`, a "Teaching" card beside "Sound and voice")
- Lessons before new stops: On / Short / Off.
- Slow down fast tapping: On / Off.
- Ask "How do you know?": On / Off.
- All default to On. These double as the kill switch if something misbehaves on a real tablet.

**Size:** S for the rushing and help lines (batch 1); M for the full table and settings. **Risks:** a parent reads "rushing" as "lazy" (wording, plus the tip); numbers from very little data (show a line only with 20 or more first tries behind it). **How to test:** `REP.data()` and `REP.html()` run without a browser, so `tools/test.js` can feed saves and check each line; old saves with none of the new fields must give the empty-state lines; `tools/a11y.js` on the report.

---

## 8. How to measure that it teaches better, offline

Everything is counted on the tablet, per child, in the save. It appears in the Grown-ups report and travels in the existing backup file (`81-backup.js`), so a family can hand the owner a file by choice. Nothing is sent anywhere.

| # | Question | Measure | Where stored |
|---|---|---|---|
| 1 | Do lessons help? | **Before and after on the same stop.** For 1 stop in 5 (chosen by a fixed hash of the stop id and child id), the lesson plays after question 3 instead of before question 1. Compare first-try accuracy on questions 1 to 3 with questions 4 to 8. No child goes without a lesson, and trying first is sound teaching in itself (the pretesting effect). Also compare with the same child's stops where the lesson came first. | `S.teach[nid] = {pre: [right, n], post: [right, n]}` |
| 2 | Does re-teaching help? | First-try accuracy on the 3 questions before a worked example or step back and the 3 after. Per `PRE` link, so weak links can be fixed. | `S.teach[nid].r` |
| 3 | Is it kept? | First-try accuracy of spaced questions by gap: 2, 5, 12, 30, 60 days. The headline number. | `S.ret = {b0: [right, n], ...}` |
| 4 | Is guessing going down? | Marked first tries as a share of all first tries, per week. Also: accuracy on the question after a slow start compared with the question before. | `S.log[day].g` |
| 5 | Is the child leaning on hints? | Helped right answers as a share of right answers, per week. | `S.log[day].h` |
| 6 | Do they learn from the explanation? | How often the re-asked question at the end of the round is right; how often the twin is right. | `S.log[day].tw` |
| 7 | How long does learning take? | First tries from first sight to "learned", per stop. | from `S.mast[nid].n` at the time |

**Before any child sees it:** the three simulated children of section 1 run in `tools/test.js` against the whole round engine with a fake clock. Add a fourth, a "learner" whose chance of a right answer rises after a lesson and after an explanation, to check the ladder ends and the schedule behaves over a simulated month.

**Honest limits.** One child's numbers are noisy; a stop has 10 to 30 first tries. The report should show measures 1 to 3 only as totals over many stops. Proving the app teaches better across children needs several families' backup files and is outside what the app can do alone.

**Size:** S for counters (each is two numbers); M for the holdout rule and the simulated learner. **Risk:** save size; all of section 8 is under about 20 KB for 250 stops, and should get a size test.

---

## 9. Recommended build order

Start after the `mastery` and `discover2` branches merge, since both touch `50-round.js`, `82-report.js` and the size budgets.

### Batch 1: stop rewarding guesses, explain every miss (highest gain, least work)
All small, no content authoring, about 12 KB.
1. `51c-guess.js`: the three signals, guess mode, listen-first lock for Pre-K and K, slow start, half credit, clean review promotions. (S to M)
2. One try on two-choice questions. (S)
3. Ladder rung 1: explained answer the child enters, then a twin question. (S)
4. Ladder rung 2 for stops with step hints: a worked example made by code from `39b-steps.js`. (S to M)
5. Counters in `S.log` and two report lines: rushing and help used. The `TEACH.off` switch and the "Slow down fast tapping" setting. (S)
6. Simulated tapper, expert and slow learner in `tools/test.js`. (S)

Why first: it closes the two-choice loophole, turns every second miss into teaching, and gives a guessing number to watch, all with code that exists.

### Batch 2: teach first, math K to 2
1. The `teach` lazy part and the lesson player. (M)
2. The ten picture templates and the `LESSON` table for about 60 math stops. (M to L)
3. Lesson triggers, Skip, "Show me again". (S)
4. Voice-first rules of section 6 on the tablet voice. (S)
5. Rung 2 for picture stops (uses the templates). (S)
6. About ten new why sentences for K to 2 skills. (M)
7. Measure 1 (before and after). (S)

### Batch 3: step back, harder-to-guess answers, spacing
1. `PRE` table, `stepBack`, rung 3, early kind end of round. (M)
2. Typed instead of tapped, build-it preferred, lock it in. (S to M)
3. Pictures first, then numbers (`k2Stage`). (S to M)
4. "Show me" and "How do you know?". (M)
5. `S.sp` per-stop schedule, skipped-world sampling, the cap; agree the check-in timing with the badge work. (M)
6. Report: practiced and learned, step backs, "still knows it". (M)

### Batch 4: the rest of the subjects, and polish
1. Card lessons for Reading (sound boxes for phonics), Spanish grammar stops and Discover; a spoken `teach` line per Discover item. (L, content)
2. Recorded narration for Pre-K and K lessons. (M)
3. Mixed replays of strong stops. (S to M)
4. Lessons for grades 3 to 6 stops that have no step hints (geometry, data, ratio). (M to L)
5. The simulated learner over a month; tuning of thresholds from real backup files. (M)

---

## 10. Risks across the whole plan

- **Size.** About 69 KB is free at start-up before the in-progress branches land. Only `51c-guess.js` (about 5 KB) must load at start; lessons go in a lazy part. Check the number first, and do a room chunk if needed.
- **Old tests pin random draws and "same answers, same questions".** Everything new sits behind `TEACH.off`, and time is read through one function tests can set.
- **Merge conflicts in `check()` and `finish()`.** Use wraps from part files; the plan needs only three small edits in index.html (the reveal timer hook, `stepBack` in `mastPick`, the review promotion guard), under 150 bytes together.
- **A slower app feels worse to a child who knows the work.** Every slowing step is tied to evidence of rushing or missing, and each has a grown-up switch.
- **Real tablets.** Speech timing, the lock, and lesson animation need a pass on the cheap tablet before each batch is called done; desktop runs cannot show these.

## 11. Decisions for the owner

1. **Should a lucky-looking right answer count half toward passing a stop?** The plan says yes: it uses the rule that already halves answers given with the hint showing, and stars already collected in the round are not taken away. The risk is a fast, able child on a weak day needing one more round. The alternative is to count it fully for the pass and half only in the mastery record.
2. **Should the badge check-in wait a couple of days?** The plan suggests yes (section 5): a badge then means "still knows it". The cost is that a child cannot win the badge the same day they practise.
3. **Step back by ending a round early**: acceptable, or should a round always run to its last question?
