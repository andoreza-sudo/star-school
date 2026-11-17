# TEACH 2: Star School as a teacher

Design plan, 2026-11-17. Read against `main` at v171 plus `docs/TEACH-PLAN.md`. Nothing in the repo was changed and nothing was built or run. Every size below is an estimate from reading the code, not a measurement, and every threshold is a starting guess to be tuned with the simulated children described in section 2.

**The one idea.** The first plan kept the quiz round as the product and added teaching around it. This plan makes the **lesson** the product. A lesson is a short class that the pet runs: remember, explore, name the idea, practise together, check the pet's work, show what you know. Questions still exist, but each one has a job inside the lesson. The old round stays as "Practice", one tap away, unchanged.

---

## 1. What a session feels like

### Today

A child taps a stop called "Make Ten". Question 1 appears. Four buttons. Tap, "Try again", tap, next. Ten questions later there are stars. Nobody showed the child what ten is made of, and nobody found out what the child was thinking when they missed.

### A Kindergartner, ten minutes with Sparky (nothing needs reading)

**0:00** Home has one big card: Sparky the dragon holding a notebook. Mia taps it. Sparky says, "Hi Mia! Yesterday you taught me to count on a ten frame. Let's see if I remember."

**0:30 Remember.** Sparky fills a frame with six counters and says "Seven!" Mia taps the frame down to check, laughs, and taps the cross. Sparky: "Oops. Show me how many." She counts and sets it to six. Two more quick ones from last week, each a thing to build or fix. None has four buttons.

**2:00 Explore.** A ten frame and two pots of counters, red and yellow. "Fill the whole frame. Use both colours. Any way you like." Mia makes 8 red and 2 yellow. There is no wrong answer. "Now fill it a different way." She makes 5 and 5.

**3:30 Name it.** Sparky puts her two frames side by side. "You made 8 and 2. You made 5 and 5. Both make ten." Under each frame the numbers appear for the first time: 8 + 2 = 10. The picture came first and the symbols are written on top of what she built.

**4:30 Together.** "I put in 7 red. You finish it." She adds yellow until it is full: 3. Next the frame is a picture she cannot touch, with 6 shown; she types 4. Next there is no frame at all: "9 and how many make ten?" She types 2. Sparky does not say "wrong". It brings the frame back with 9 in it: "Count the empty ones." One. She fixes it.

**6:30 Check me.** "My turn! 6 and... 5 make ten." Sparky's frame shows 6 red and 5 yellow, one counter hanging off the edge. Mia takes one away. "Why was I wrong?" Two pictures: a frame that is too full, and a frame with a hole. She taps the too-full one.

**8:00 Show what you know.** The bridge in Shape Garden needs ten planks. Three jobs with no help: 4 planks are down, how many more? One of the three is from last week (count to 20). The bridge gets its planks on the map.

**9:30** Sparky writes "Two parts make ten" in its notebook with a picture of her 8 and 2. Tonight the Grown-ups screen shows one line: *Ask Mia: "If I have 7 fingers up, how many more to make 10?"*

### A 4th grader, ten minutes

**0:00** "Today: which fraction is bigger?" **Remember:** type 6 × 7; find the mistake in Sparky's column subtraction (a thing she got wrong on Monday); place 3/4 on a number line.

**2:00 Explore.** Two blank fraction bars. "Shade 1/3 on one and 1/5 on the other. Which is more? Now find a fraction with a bigger bottom number that is still the bigger one." She tries, fails once (1/8), tries 4/5. No score, but the app notes that she first reached for 1/5 as the bigger one.

**3:30 Name it.** "More parts means smaller parts. So the bottom number alone cannot tell you. Compare both to one half."

**4:30 Together.** Build both bars and pick the sign; then bars as pictures only; then symbols only, typed sign. On her miss (3/8 > 1/2) the bars come back, because the app has now seen her choose the bigger bottom number three times and knows which gap to teach.

**6:30 Check me.** Sparky: "5/12 is bigger than 1/2, because 12 is bigger than 2." She marks it wrong, then builds the reason from word tiles: "5 is less than half of 12."

**7:30 Your problem.** "Give me a hard one." She sets two fractions with steppers. Sparky answers and she judges it.

**8:30 Show what you know.** Three unassisted comparisons inside a job (cutting planks for the Decimal Desert bridge), one mixed with a rounding question from last month.

**9:30** Notebook: "Compare to one half." Grown-up card: *Ask Ana why 1/3 is bigger than 1/5.*

### What changed

| Today | With lessons |
|---|---|
| The child picks a stop and grinds it | The pet picks today's lesson from what the child knows |
| Question first | Hands-on first, then the idea, then symbols |
| Mostly tap one of four | Build, place, type, fix, give a reason |
| A miss gets "Try again" | A miss brings back the picture, and repeated misses of one type change tomorrow's lesson |
| Review is a separate tile | Every lesson starts with remembering and ends with a mixed check |
| "Passed" | "Taught", "practising", "learned", "still knows it" |

---

## 2. The core systems

New code lives in one lazy part, `teach` (added to `PARTS` and `LAZY` in `tools/build.py` and `LAZY_PARTS` in `src/js/90-app.js`). Home loads it after first paint with `partsThen(['teach'], ...)`. The start-up cost is the home card only, about 2 KB of the 69 KB that is free. If the part has not arrived, the card opens the map as today.

The lesson is a **new screen with its own state object**, in the way placement (`PL`, `45-placement.js`) and Speed Race (`RC`, `54-race.js`) already render `KIND[q.kind]` outside a round. It does not wrap `check()`, `next()` or `finish()`. That is the main engineering difference from the first plan: the old round is untouched, its seed-pinned tests stay valid, and there are no merge conflicts with the `mastery` branch.

### System A. The lesson (the six beats)

**What the child sees.** Section 1. Six beats, always in this order, each skippable by the tutor, never by a button the child has to find:

| Beat | Length | Purpose | Scored? |
|---|---|---|---|
| Remember | 3 or 4 items | Bring back older lessons | Feeds memory schedule |
| Explore | 1 or 2 open tasks | Meet the idea with hands before words | No. Recorded as a "before" sample |
| Name it | 2 or 3 spoken lines | Tie the child's own work to the idea and its symbols | No |
| Together | 4 to 6 items | Practise with help that fades: build, then picture, then symbols | Feeds the learner model |
| Check me | 1 or 2 items | The child teaches: find, fix and explain the pet's mistake | Feeds the learner model |
| Show | 3 items, no help | Evidence of today's learning, inside a world job | Passes the stop |

A stop usually takes one lesson. If Show goes badly the stop stays open and tomorrow's lesson on it skips Explore and starts from the picture stage. A child who gets every Together item right at the symbol stage jumps straight to Check me. A child can leave at any beat; `S.les = {nid, beat, seed}` lets the lesson resume.

**How it fits the code.**
- `src/js/52-lesson.js` (part `teach`): `LS.start(nid)`, `LS.beat()`, `LS.answer(v)`. Items are ordinary question objects from `genQ` and the `k2*` converters, rendered with `KIND[kind].render/bind` against `LS` as the state object.
- Fading in Together is a kind choice, not new content: stage 1 asks the stop's `make` form (`k2Frame`, `k2AddFrame`, `k2B10`, `k2Coins`, `k2Clock`, `k2Array`, `k2FracShade`), stage 2 the same question with the model drawn by `VIZ` and a number pad, stage 3 the plain `num` form. A miss drops one stage for the next item and the picture returns.
- For grades 2 to 6, Name it and the stage 1 help come free from `39b-steps.js`: `stepsAdd`, `stepsSub`, `stepsMul`, `stepsDiv`, `stepsEquivFrac`, `stepsCommonDen` already give `{html, say}` per step.
- Ending a lesson writes the same stop record `finish()` writes (so `passed(p, i)`, the map, unlocks, bosses and missions keep working) and reuses the reward card (`RW.done`). The exact fields need reading from `finish()` when batch 1 starts.
- Lesson scripts are data, one entry per stop (system F).

**Size.** Engine M (about 18 KB with CSS), in the lazy part.

**Risks.** A lesson is longer than a round and a child may leave half way: resume covers it, and Remember plus Explore alone are still worth doing. Sameness: six beats every day could feel like a ritual, so the tutor drops Explore on a repeat lesson and drops Check me to one item when the child is flying. Tablet speech pacing: lines are 12 words or fewer, advance on `speakBusy()` polling with a timer cap, and work silently with captions.

**How to test.** `tools/test.js`: `LS` as a pure state machine fed answer lists; every beat reachable; resume from each beat; the stop record equals what `finish()` would write for the same Show result. `tools/smoke.js`: one full lesson by script. `tools/shots.js` at the three sizes for each beat. `tools/perf.js` first frame of the lesson on the throttled profile.

### System B. The workbench (hands before symbols, answers that cannot be guessed)

**What the child sees.** The six models that `make` already has (ten frame, base ten blocks, coin purse, shaded parts, array, clock) plus the number line (`line` kind), used three new ways:
1. **Open tasks.** "Fill it your own way." "Make 24 with as few blocks as you can." "Show a time after 3 o'clock." Many states are right.
2. **Fix the pet's build.** The model starts in the pet's wrong state and the child repairs it. This gives Kindergarten a find-the-mistake task that needs no reading. (Today `k2Fix*` covers only written working, grade 2 up.)
3. **Your problem.** The child sets the numbers with the steppers; the pet answers; the child judges.

Multiple choice remains for one thing: choosing a reason. For non-readers the reasons are two pictures. From grade 3 the reason is built from word tiles in a sentence frame (the `order` kind), which cannot be tapped through.

**How it fits the code.** Small extensions to `K2MM` in `49b-kinds2.js`, done in the `teach` part by adding keys, not by editing:
- `q.goal`: the name of a checker from a fixed menu in code (`fills`, `sum`, `value`, `fewest`, `differentFrom`). `KIND.make.same` is consulted only when `q.goal` is absent, so existing questions do not change.
- `q.s0`: a start state, for the pet's wrong build.
- A two-colour ten frame model, `frame2` (state `[a, b]`; `VIZ.tenFrame` already takes a second-colour count `b`).
- Two bars in one question for fraction comparison (`VIZ.fracBar` twice; state is two `parts` states).
- Hops on the number line for counting on and back (extends `line`).

**Size.** M (about 10 KB).

**Risks.** Steppers are slower than dragging, but they exist, they are tested for touch and keyboard, and they cost nothing on a weak tablet; dragging is rejected for now. Open tasks can confuse a child who expects a right answer: the pet always says "any way you like" and reacts to what was made ("You used 8 red!").

**How to test.** `kindProblems` extended: every `goal` has a reachable state within the stepper limits; every `s0` is wrong and repairable. `tools/kinds-samples.js` lists kind counts per lesson and asserts that at most one item in ten is a choice, and that any choice is a reason. `tools/a11y.js` on each model in open mode.

### System C. What the tutor knows about the child (diagnosis)

**What the child sees.** Nothing directly. They notice that the pet seems to know them: its mistakes in Check me are the mistakes they make, and the picture that comes back after a miss is the right one for their slip.

**The record.** `S.know[nid]`, a few numbers per stop:
- stage reached: taught, practising, learned (passed Show with no help), kept (right again on a later day);
- right and tried counts at each of the three levels: built, picture, symbols;
- a tally per **misconception code** for this skill;
- next due day and memory box (system D).

**Misconception codes.** A small library, `BUGS`, keyed by skill. Each entry is a function that says what a child holding that wrong idea would answer to a given question. Examples: adding by counting the first number twice (off by one); taking the smaller digit from the larger in each column; reading 14 as 41; "bigger bottom number means bigger fraction"; "longer decimal is bigger"; clock hands swapped; counting coins instead of their value; rounding by looking at the wrong digit. Eleven of these already exist as the `k2Why*` functions behind `K2WHY`, which map a wrong value to a sentence. They gain a code beside the sentence.

**The rule (how a teacher reads a page of work, not one answer).** A wrong answer that a code predicts adds one to its tally. The tutor says the child *holds* a misconception when it explains at least 3 of their last 8 wrong answers on that skill, across at least 2 different problems, and no other code explains as many. Typed and built answers make this possible; a tapped button cannot carry this information, which is the practical reason this plan removes most multiple choice.

**The probe.** When two codes fit equally, the next Together item is drawn so that the two codes predict different answers (draw up to 20 candidates from the stop's generator and keep the first that separates them). One answer then settles it.

**The repair.** A held misconception changes the plan (system D): the next lesson on that skill opens with a contrast on the model, such as two fraction bars where the bigger bottom number is plainly the smaller piece, and its Check me has the pet make exactly that mistake.

**How it fits the code.** `src/js/52b-know.js` in the `teach` part: `knowAdd(q, v, stage, helped)`, `knowHeld(nid)`, `knowProbe(nid, a, b)`. `BUGS` reuses `k2WhySub`, `k2WhyAdd`, `k2WhyPv`, `k2WhyFrac`, `k2WhyDec`, `k2WhyFop`, `k2WhyRound`, `k2WhyOoo`, `k2WhyMiss`. Practice rounds also feed the record through one `check` wrap installed when the part loads; if the part is absent nothing is lost but that evidence. Placement results seed stages for skipped worlds as "not yet seen by the tutor", so those skills appear in Remember early.

**Size.** M: code about 6 KB, library about 12 KB when it covers K to 5 math. Save size about 80 bytes per stop, under 25 KB for every stop; add a size test like the one for `S.rev`.

**Risks.** A wrong diagnosis teaches the wrong repair: the threshold is conservative, a repair is one contrast and one Check me item (cheap if wrong), and the tally fades (halved every 14 days). Careless slips look like misconceptions: require 2 different problems. Reading, Spanish and Discover have fewer computable misconceptions: there the record keeps stages and levels only, plus confusable pairs (b and d, ser and estar).

**How to test.** `tools/test.js` simulated children, as the placement simulation does today: a child with one known bug must be named within 10 answers in 90% of runs; a child with random slips at 15% must be named in under 5%; a child with two bugs gets a separating probe. Every `BUGS` function is checked on 3,000 generated questions: its predicted answer is wrong, and different from the right answer.

### System D. The plan book (today's lesson, memory built in)

**What the child sees.** One card on home: the pet, and "Today: Make Ten". After the lesson: "One more?" or free time (map, Practice, Game Room). The map is still there for a child who wants to choose.

**How the tutor chooses**, in order:
1. A stop whose lesson was started and not finished.
2. A repair, if a misconception is held on something the next stops depend on.
3. A prerequisite, if the next new stop depends on a stop that is not learned. This uses the `PRE` table drafted in the first plan, now as planning data and not as a mid-round step back.
4. Otherwise the next unlearned stop in the child's grade worlds, alternating subject by day (math, reading) once reading lessons exist.

**Memory.** Each learned stop has a due day: 2, 5, 12, 30, 60 days, moving up on an unhelped right answer and down on a miss. Remember takes the 3 or 4 most overdue stops, never today's skill, one item each, so it is mixed by construction. One of the three Show items also comes from an older stop of the same strand, so the child has to decide which idea applies. A stop becomes "kept" the first time it is right in Remember on a later day. This replaces the first plan's separate `S.sp` store, and it can replace Daily Review as a separate tile once lessons cover a child's grade.

**How it fits the code.** `planToday(S, day)` in `52b-know.js`: a pure function returning `{nid, kind: 'new' | 'again' | 'repair', remember: [nids], mixed: nid}`. Home card `hmLesson()` in `46-home.js`, beside `hmToday()`. The "round" daily mission (`55-missions.js`) counts a lesson. `S.pin` (a grown-up's "Practise this next") outranks rule 4.

**Size.** S to M (about 5 KB), plus `PRE` (about 40 links to start).

**Risks.** The tutor picks something the child finds dull or too hard: the map stays open, and two failed Shows on one stop trigger rule 3. A child racing ahead on the map leaves the planner behind: the planner treats any passed-but-never-taught stop as due in Remember.

**How to test.** `tools/test.js` with a fake day counter: a simulated year of daily lessons never repeats a learned stop as "new", never loses a due stop, keeps Remember to 4, and reaches every stop of a grade. `PRE` rules as in the first plan (real stops, no loops, earlier on the path or lower grade).

### System E. The pet as partner (learning by teaching)

**What the child sees.**
- **Check me** in every lesson. The pet's mistake is the child's own held misconception when there is one, otherwise the most common one for the skill. The child marks it, fixes it, and gives the reason.
- **"Do I remember?"** Remember items are framed as the pet recalling what the child taught it, about half the time with a mistake.
- **The notebook.** A page per learned idea: one sentence and a picture of something the child built. The child can open it from the pet. It is the child's view of "learned"; pages gain a star when the idea is kept.
- **Your problem**, from grade 2: the child sets a problem, the pet answers, the child judges.

**One rule that protects trust.** The pet is never wrong while it is teaching (Name it, and help in Together). It is wrong only in its own turn, which starts with a spoken cue ("My turn. Check me!") and its thinking face, and always ends with the right answer on the picture. Sometimes the pet is right, so the child must look and cannot assume a mistake.

**How it fits the code.** Pet moods exist (`petSVG` moods `idle`, `happy`, `oops`, `cheer` in `17-pets-svg.js`). `k2FixQ` already builds "one step has a mistake" from mutation lists; the pet's name replaces the `K2WHO` names inside lessons. Mistakes on models come from `BUGS` (the predicted wrong value becomes `q.s0`). Notebook: `S.know[nid].note = [seed]`, drawn again from the seed with `VIZ`, so no pictures are stored.

**Size.** M (about 8 KB). Theme check: the notebook fills and gains stars; nothing about powers or the pet changing form.

**Risks.** Some children enjoy the pet being wrong more than the lesson: one or two items, fixed place in the lesson. Reasons for non-readers must be pictures that really differ: each needs a screenshot review.

**How to test.** Every pet mistake is wrong, repairable, and matches its code; the "pet is right" share is between 20% and 35% over 1,000 lessons; `tools/shots.js` for each reason picture pair.

### System F. Lesson scripts, and what a build-time LLM is good for

**The script.** One small data entry per stop, in `src/js/52c-scripts.js` (part `teach`, so none of it loads at start):

```js
tenf2: {
  idea: 'Two parts make ten',
  model: 'frame2',
  explore: [{ask: 'Fill the whole frame. Use both colours. Any way you like.', goal: 'fills'},
            {ask: 'Now fill it a different way.', goal: 'differentFrom'}],
  name: ['You made {a} and {b}.', '{a} and {b} make ten.'],   // {a} {b} come from what the child built
  fade: ['make', 'pic', 'num'],
  bugs: ['off1', 'saysGiven'],
  reasons: {off1: ['Too many. One is left over.', 'One box is still empty.']},
  job: 'planks',
  home: 'Ask {name}: "If I have 7 fingers up, how many more to make 10?"'
}
```

Words are authored. **Numbers never are**: every number spoken or shown is a slot filled by code from the question or from the child's own build, so a script cannot state a wrong fact. Goals, models and bug codes are names from fixed menus in code.

**Does a build-time LLM help? Yes, for words. No, for logic.** There are about 250 stops. Each needs perhaps 15 short lines: explore prompts, naming lines, reason sentences per misconception, a job line, a wrap line, a grown-up prompt. That is several thousand lines of careful, kind, age-fitted wording, which is exactly what an LLM drafts well and what would otherwise take months. It also suits decodable sentences and short stories for reading lessons, written under a word-list limit.

How to use it safely:
- It is an **authoring tool the developer runs** (`tools/author.js`), not a build step. It reads `docs/CURRICULUM.md`, the stop list and the menus, and writes drafts to `tools/out/`. Approved drafts are committed as source. Builds stay deterministic and need no network or key. It never sees child data and never runs on the tablet.
- **Tests are the gate**, in `tools/test.js`: schema; every `{slot}` known; no digit or number word outside a slot; every model, goal and bug code exists; line length 90 characters or fewer and 12 words or fewer for Pre-K to 1; all words on the grade word list for lines a child must read; the kid-safe list (`d-kidsafe.js`); a banned-theme list (magic, spell, wizard, wand, evolve and their relatives, and "magic e"); for reading, every word decodable from the letter sounds taught up to that stop plus the sight words taught so far.
- **A person reads every script before it ships.** `tools/author.js --sheet` prints a lesson as plain text, one page per stop, for the owner to read.
- What it should not write: misconception functions, checkers, number choices, anything a test cannot verify. Those are code.

Batch 1 does not depend on this: its 12 scripts are few enough to write by hand, and they become the examples the tool imitates.

**Size.** Text about 0.6 to 1 KB per stop: 12 KB for batch 1, up to 200 KB for everything, which is why later subjects get their own lazy parts (`teach-read`, `teach-up`).

**Risks.** Bland or subtly wrong wording at scale: the slot rule removes numeric errors, the read-through catches tone, and scripts ship world by world. Review fatigue: 250 pages is real work for the owner, so it is spread over batches.

### System G. Purpose: jobs in the world

**What the child sees.** The Show beat is a job in the world the stop belongs to: planks for the Shape Garden bridge, shells for the Ocean Reef stall, fuel for the Space Station. The numbers of the job are the numbers of the questions. When the stop is learned, a small piece appears on the map band for that world and stays.

**How it fits the code.** A job is a sentence frame around ordinary Show questions (as `genStory` frames sums today) plus one prop stamped into the world scene by `SCN` (`43-scenes.js`, `d-scenes.js`), which already places props where stops and labels are not.

**What is rejected.** A running plot with characters and chapters. It is a large art and writing job, and decoration that does not carry the idea draws attention away from it. The job is kept to one line and one visible result.

**Size.** S for frames; M for map props (batch 4). **Risk:** props crowd small screens; cap at one per stop and check `tools/shots.js`. **Test:** deterministic scene output with and without props; a11y unchanged (props are `aria-hidden`).

### System H. Pre-K and Kindergarten: voice and touch

- Every beat is spoken. Captions are a numeral or four words at most. The lesson never needs reading.
- Answer controls wake when the prompt has finished (poll `speakBusy()`, cap 6 s; with no voice, 1 s). This is the one item kept from the first plan's guessing section, because it helps a non-reader hear the question.
- Reasons are pictures. Open tasks and fix-the-pet replace choice questions.
- "Say it with me": the pet counts aloud and invites the child to join. The app does not listen. No microphone is used anywhere in lessons.
- Voice: tablet speech by default, zero bytes. The teacher's fixed lines ("Your turn!", "Any way you like.", "My turn. Check me!", "Why was I wrong?", about 70 lines) can be recorded in one warm voice with `tools/en-audio.js`; at about 2 KB per second that is roughly 500 KB of the 1.5 MB that is free. A line is either all recorded or all tablet speech, never mixed mid-sentence; `enPlan` already splits by sentence.
- Lessons are shorter: 2 Remember items, 1 Explore, 3 Together, 1 Check me, 2 Show.

**Size.** S on top of A and B; recordings M. **Risk:** speech timing differs by tablet, so this needs a pass on a real cheap tablet before batch 1 is called done. **Test:** smoke with speech stubbed three ways (normal, never ends, missing).

### System I. Grown-ups as co-teachers

**What they see** (`82-report.js`, in the `gen` part, which has room):
- **Tonight's question**, one line at the top, from the script's `home` line for today's lesson: *Ask Mia: "If I have 7 fingers up, how many more to make 10?"* This is where the child explains aloud, to a person, which no offline tablet can judge.
- **Four columns per strand:** taught, practising, learned, still knows it. One line under them: "Learned means your child did it with no help. Still knows it means they did it again days later."
- **What we noticed**, only when a misconception is held: "Ana often picks the fraction with the bigger bottom number. We are working on it with fraction bars." With the existing "Practise this next" button.
- A switch: lessons On or Off (Off gives today's app exactly).

**Size.** S to M. **Risk:** a parent reads "what we noticed" as a fault; the wording names the idea and what is being done about it. **Test:** `REP.data()` and `REP.html()` run without a browser; old saves with no `S.know` give the empty-state lines; `tools/a11y.js` on the report.

---

## 3. What carries over from TEACH-PLAN.md, and what is dropped

**Kept, in a new place**
- Picture lessons on `VIZ` models and free worked examples from `39b-steps.js`: now the Name it and Together beats.
- The `PRE` prerequisite table: now planning data (system D).
- More why-sentences for K to 2: now misconception codes with reasons (system C).
- Per-stop spacing at 2, 5, 12, 30, 60 days, and only unhelped answers moving an item up: now inside `S.know`.
- "Practised" versus "learned" for grown-ups, extended to four stages.
- Listen-first for Pre-K and K. Concrete, then picture, then symbols.
- A lazy `teach` part, one off switch, simulated children in `tools/test.js`, on-tablet measures that travel only in the backup file. The headline measure stays "right again after a gap", and Explore gives a natural "before" sample to set against Show.
- The suggestion that the in-progress badge check-in be earned on a later day. Here that is simply the "kept" stage; the badge can be awarded at that moment. This should be agreed with whoever is finishing the `mastery` branch.

**Dropped, and why**
- **Guess detection (three signals, guess mode), the two-second lock ring, half credit for lucky answers, lock-it-in.** These police a quiz. When most answers are built or typed, and "learned" needs unhelped work today and again on a later day, a lucky tap has little to gain.
- **The remediation ladder inside a round (twin question, worked example, step back, early end).** Replaced by a lesson that teaches first, a picture that returns on a miss, and a plan that changes tomorrow.
- **The "rushing" line in the report.** Replaced by "what we noticed", which is about an idea and not about behaviour.
- **Wraps around `check()`, `next()`, `makeQ1()` and the hooks in `index.html`.** The lesson is its own screen.
- **The holdout experiment** (lesson after question 3 for one stop in five). Explore already gives a before sample for every lesson.

**Still worth doing for Practice rounds, small and separate:** one try on two-choice questions.

---

## 4. Build order

Start after `mastery` and `discover2` merge, because both move the size budgets and the report.

**Batch 1. "Sparky teaches": Kindergarten and 1st grade number, end to end.**
What a family sees after this batch: the home card, and twelve complete lessons, ten from Shape Garden and Number Meadow and two from the first 1st grade worlds: Count to 20, Ten Frames, Make Ten, Ten and More, Add to 5, Adding to 10, Take Away, Missing Number, Count On and Back, More Fewer Same, Tens and Ones, Bigger or Smaller.
- Lesson engine with all six beats (A). Workbench: open tasks, start states, two-colour frame, number-line hops, blocks (B).
- Check me on models, and "Do I remember?" (E, without the notebook screen).
- A first learner record: stages, levels, tallies for about eight codes covering these stops (C, without the probe).
- A simple plan: unfinished lesson, else the next of the twelve; Remember from the last learned stops with due days (D, without repair and prerequisites).
- Voice rules on tablet speech (H). Tonight's question in the report (I).
- Twelve hand-written scripts. Lessons pass stops, so the map moves.
Size: about 55 KB lazy, 2 KB at start. Done means a real Kindergartner has completed a lesson on the cheap tablet without help.

**Batch 2. The tutor's brain, and grades 1 to 2 math.**
Full diagnosis with the probe and repairs (C). Full planner with `PRE` and subject alternation (D). The notebook (E). The four-stage report and "what we noticed" (I). `tools/author.js` and its tests (F). About 30 more lessons: place value, two-digit adding and taking away, carrying, borrowing, clocks, coins, equal groups.

**Batch 3. Grades 3 to 5 math.**
Lessons built on step builders, arrays, fraction bars and number lines. The pet in `k2Fix*` find-the-mistake. Your problem. Word-tile reasons. Fraction comparison with two bars. About 60 lessons, in their own lazy part.

**Batch 4. Reading for K to 2, Pre-K, and the world.**
The phonics lesson shape: Explore is a sound sort with pictures, Name it shows the letter, Together builds words with tiles (`build`), Check me has the pet read "cat" as "cap" for the child to fix, Show is reading a decodable sentence and matching it to a picture. Pre-K lessons for Tiny Town and ABC Beach. Recorded teacher lines. Job props on the maps (G).

**Batch 5. The rest.**
Lesson shapes for Spanish (listen, sort, say with me, fix the pet's "el" or "la") and Discover (predict, look, explain). Grade 6. Retire the Daily Review tile where Remember covers it. Tune thresholds from backup files families choose to share.

---

## 5. Decisions for the owner

1. **Is "Today's lesson" the front door?** Recommended: yes. One large card on home, chosen by the pet, with the map and Practice beside it. The alternative is to keep the map as the main way in and offer lessons per stop, which is safer but will look like an add-on again.
2. **May the child's pet be wrong?** Recommended: yes, under the rule in system E (never wrong while teaching; wrong only in its own announced turn; always corrected). The alternative is a second, younger character who makes the mistakes, which keeps the pet "always right" but costs art and splits the child's affection.
3. **May lesson wording be drafted with an LLM at authoring time, with tests and your read-through as the gate?** Recommended: yes from batch 2. Without it the plan still works, but batches 2 to 5 take several times longer or cover fewer stops. No child data is involved either way, and nothing runs on the tablet.

---

## Owner decisions (2026-11-17)

These override anything above that disagrees.

1. **Kids still choose the subject.** There is no single "Today's lesson" front door. The child picks a subject (Math, Reading, Spanish, Discover), as now. Inside that subject, the pet suggests the next lesson and the map stays one tap away. `planToday()` plans within the chosen subject.
2. **Short sessions first.** A first lesson is about 3 minutes, not 10. The six beats shrink to fit: Remember is 1 item, Together is 2–3 items and Show is 2 items. Explore and Check me are one short task each. Lessons grow longer only as the child keeps coming back, and the app always ends on a win while the child still wants more. The goal is that kids want to use the app.
3. **The pet teaches the younger kids, and the pet grows up with the child.**
   - Pre-K to grade 2: the pet is a little one who teaches warmly and plays.
   - Grades 3–4: an older kid.
   - Grades 5–6: a teen-like partner, with a cooler look, a more grown-up voice and tone, less babyish praise, and more "check my work" and "give me a hard one".
   - The pet ages with the grade setting. It is not an evolution or transformation theme: it is the same friend, growing up.
   - Older kids get less hand-holding and more challenge from the same pet.
4. **Not yet answered:** whether the child's own pet may be wrong in its announced "Check me" turn, and whether an AI may draft lesson wording from batch 2 for the owner to read through. The default is the plan's recommendation; the owner can veto it.

### Additions agreed with the owner (2026-11-17, "do them all")

1. **Test-out.** A lesson opens with 2 "show me" items. A child who gets both right with no help skips the teaching beats and goes straight to Show; the stop is marked "learned" once Show passes. Strong kids are never made to sit through a lesson they don't need. Batch 1.
2. **Light guessing guard in Practice.** The old rounds stay as Practice, so give two-choice questions one try only: the second try is no longer a forced right answer. Reveal the answer with the picture instead. Keep it under `TEACH.off`. Batch 1.
3. **Teaching voice.** For Pre-K to 2, record about 70 fixed teacher lines, about 500 KB of the free audio, once the owner settles the voice question. The tablet voice fills in until then. Batch 4, or earlier if the voice is chosen sooner.
4. **The pet grows up, cheaply first.** Older stages start with changes to scale, proportions, outfit or accessory, voice pitch, and tone of wording. More detailed art comes later. Batch 1 ships the little-one stage, plus the tone and wording rules for all three stages. Batch 2 adds the visuals for the older stages.
5. **Words at scale.** The pet makes real kid mistakes in its own announced "Check me" turn, never while teaching. An AI drafts lesson wording from batch 2, at authoring time only, never on the tablet. Every script is gated by tests and the owner's read-through. Batch 1's 12 lessons are hand-written.
6. **Prove it teaches.** Keep the before-and-after measure: first-try accuracy on a stop before and after its lesson, and retention by day gap. Store it in the save, and add a short summary for grown-ups. Simulated children in `tools/test.js` must show a gain before a batch ships. The measure itself is in batch 1.
