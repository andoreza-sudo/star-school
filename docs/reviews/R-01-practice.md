# R-01 Practice systems: teaching and engagement review

Review of the systems that sit across the subjects: Fact Sprint, Fact Race, Daily Review (spaced review), Mixed Practice,
placement ("Find my level"), challenge and support rounds (mastery and adaptation), streaks, daily missions, rewards and game time,
as of v138 (56d3d17). Written 2026-11-11 by Claude for Andy. No app changes were made.

R-02 (games) already covered the game-time economy, Fact Race's game-time loop, pet meters, stickers and the Pet Shop; this
review does not repeat those and looks at the teaching side.

---

## Part 1. For parents: the short version

### What works well

- **Mistakes come back on a schedule.** A question your child gets wrong is saved and asked again later the same day, then after 1,
  3, 7 and 21 days. Five right answers spread over about a month take it off the list. This "spaced retrieval" is one of the
  best-supported ways to make learning stick.
- **Rounds adjust to the child.** After 5 questions, a child who got all 5 right quickly gets "Challenge!" questions from the next
  level (and is not marked down for missing them); a child who got 2 or fewer gets the hint shown first and some easier questions.
  Three misses in a row bring an easier question with a hint. The child never sees "you are behind".
- **Feedback is immediate and kind.** A wrong answer shows a hint and allows a second try; a second miss shows the answer and asks the
  question again at the end of the round. A low score says "Good job! Keep practicing! Get 7 right to open the next stop. You can
  do it!" No red, no shaming, no lost progress.
- **Fluency practice is built on understanding.** Fact Sprint's subtraction, adding to 20, times and divide sets only open after the
  child has passed the matching lessons, and it only compares the child with their own best.
- **Placement is quick and gentle.** "Find my level" asks 4 to 20 questions with no stars, no buzzers and no hints, says "Some may be
  tricky, and that's OK", and never takes anything away. In my simulations it puts a typical child in the right world about 85-90%
  of the time and within one world 95% of the time.
- **Motivation without pressure, mostly.** The streak forgives one rest day a week and never warns or nags; missions are learning
  tasks; nothing happens while the app is closed except pet meters (R-02).

### What to improve, in priority order

Sizes: **S** = an hour or two, **M** = about a day, **L** = several days.

**Must fix**
1. **Fact Sprint is offered to Pre-K and Kindergarten children (S).** The Fact Sprint tile is on every child's Home screen and
   "Adding to 10" is always open (`ok: () => true`), so a 4-year-old can start a 60-second race of written sums with a ticking
   clock and no spoken prompts. From Kindergarten, "Do a Fact Sprint" can be one of the three daily missions. Timed fact drills are
   for facts a child already knows by strategy (grade 1 up), and timed tests are linked to early maths anxiety. Show Fact Sprint from
   grade 1, open "Adding to 10" only after the first adding stop is passed, and leave the sprint mission out before grade 1.
   `FLU.SETS` in `src/js/57-fluency.js`, `hmToday` in `46-home.js`, mission draw in `55-missions.js`.

**Should fix**
2. **Mixed Practice is mostly old, easy material (S).** It fills the round with random stops from everything the child has reached,
   evenly. For a 3rd grader 90 stops into maths and 60 into reading, 59% of Mixed Practice questions come from 26 or more stops back,
   38% are Pre-K or Kindergarten content, and only 10% are at the child's grade. Weight the pick toward the last 10 stops of each
   path and stops not yet mastered (for example 50% recent, 30% weak, 20% older). `mixQs` in `src/js/50-round.js`.
3. **Placement can put a struggling child 2-3 worlds too high (S).** One lucky set of 4 (3 right by guessing) at the start world
   moves the child up. In simulation, a child whose right world is 2-3 worlds below the start world is placed too high 14-28% of
   the time, and 3 or more worlds too high about 1 time in 10. Confirm the first "pass" with a second set before moving up,
   or pass the start world only at 4 of 4. `PLACE.step` in `src/js/45-placement.js`. (R-01 math also suggests one question per
   topic strand, so whole topics are not skipped unasked.)
4. **Only mistakes are reviewed (M).** Things a child got right are never scheduled again, and stops skipped by placement or test
   out never get review. Forgetting is fastest in the first weeks; a short check of each passed stop after about 1, 7 and 30 days
   (one question each, in the review slots that already exist) would keep them. `59-review.js`.
5. **Review asks the very same question again (S).** "9: even or odd?" comes back as exactly "9: even or odd?". For number facts that is
   right (the fact is the thing to learn), but for two-choice questions, word problems and multi-step skills the child can
   remember the answer to that one item. Use a fresh question of the same skill and level for everything that is not a single fact.
   `revQ` in `59-review.js`.
6. **A "perfect round" daily mission, even for Pre-K on day one (S).** "Get a perfect round: Every answer right!" rewards never
   making a mistake. Missions that reward effort and fixing mistakes ("Fix 3 tricky ones", "Try a Challenge question", "Use a hint and
   then get it right") build better habits. `MIS` in `src/js/55-missions.js`.
7. **Answers given with the hint already showing count as full right answers (S).** In support mode the hint shows before the first
   try (and any child can open it with Help), and those answers count towards the stop's pass, its stars and the mastery record. Count them half, or not at all,
   towards mastery. `mastTry` in `src/js/51-mastery.js`.
8. **A stop opens the next one at 7 of 10 (S, a design decision).** Mastery learning research uses 80-90%. The mastery record already
   knows when a stop is really learned (90% over 20 tries on 2 days); use it, for example by asking a mastered-check question from
   any stop passed below 8 of 10 in the next rounds, rather than raising the bar and blocking children.
9. **"Best streak: 10 in a row!" after 6 of 10 (S).** The in-round streak also counts the missed questions answered at the end, so a
   6-of-10 round celebrated a "New Best streak: 10 in a row!". Count first tries only. `check` in `50-round.js`.
10. **The Review tile shows the whole backlog as a red number (S).** A child with 21 items due sees a red "21" bubble, the way phones
    show unread messages. Show the round size ("10 to review") in a calm colour. `hmToday` in `46-home.js`.
11. **Fact Race pays coins every race (S).** Half a coin per right answer plus 5 for a record, with no daily limit (R-02 fixed the
    game time, not the coins), and its 60-second clock keeps running when the app is in the background. Pay coins for the first
    race of the day only; pause the clock when hidden like Fact Sprint. `race` in `src/js/54-race.js`.
12. **Fact Sprint forgets which facts are slow (M).** Already in R-01 math (Could 17): keep per-fact misses and times, and ask the
    weak facts more often.

**Could do**
13. A review slip puts an item back to the start (box 0) even after 21 days; stepping back one or two boxes is kinder and as
    effective (S).
14. Praise is mostly about the child or the result ("Brilliant!", "Nailed it!"); add process praise for hard-won answers ("You fixed
    it!", "You used the hint well!") (S).
15. Streak prizes stop at 30 days; the streak milestone message still uses emoji (flame, coin); the placement question shows an emoji speaker
    (S, P4-18 style tidy).
16. Explain Fact Sprint's purpose to grown-ups in the report card: speed on known facts, not a test (S).

---

## Part 2. Detailed findings

### 2.1 How the review was done

- **Read**: ROADMAP R-01, R-01-math.md and R-02-games.md, the PROGRESS entries for P1-07, P1-08, P5-01 to P5-09, and the code:
  57-fluency.js, 54-race.js, 59-review.js, 50-round.js (rounds, Mixed Practice, feedback, finish), 51-mastery.js, 45-placement.js,
  55-streak.js, 55-missions.js, 58-playtime.js, 46-home.js (Today row), 42-paths.js (pass rules), 18-reward-art.js.
- **tools/test.js**: 122 checks pass on 56d3d17, including fact sprint, streak, placement, review, daily review, missions and game time.
- **Simulated** (code loaded as tools/test.js does; scripts in the session scratchpad `h/`):
  - Placement: `PLACE.sim` on the 16 math worlds and the reading worlds, grades 1, 3 and 5, students whose true level is 3 below to
    4 above the start world, 400 quizzes each, with three answer models (knows 90% / guesses 30%; 80% / 33%; 95% / 25%).
  - Mixed Practice: 300 rounds (3,000 questions) of `mixQs()` for a 3rd grader at maths stop 90 and reading stop 60.
  - Fact Sprint, review and mastery rules read and exercised through their pure functions.
- **Played** in the built app with Playwright at 380 x 780 and 1024 x 600 (deviceScaleFactor 2, real taps): a fresh Pre-K child's
  Home, Fact Sprint menu, a 60-second sprint with a wrong answer and the end card; the "tricky" fixture's Home (21 due), Daily Review
  with a wrong answer and its end, Mixed Practice; a grade-2 child's stop round in support mode (3 wrong of the first 5) and in
  challenge mode (5 right fast), a 6-of-10 round to the end card, the streak calendar, the placement intro and first question.
  Screenshots in the scratchpad `r01-btp/` folder, names starting `pr-` (for example `pr-home-prek-380x780.png`,
  `pr-review-q1-380x780.png`, `pr-round-support-380x780.png`, `pr-round-challenge-380x780.png`, `pr-round-end-380x780.png`).

### 2.2 Evidence base used

| Practice | Source | What it asks of an app |
|---|---|---|
| Retrieval practice | Roediger & Karpicke 2006, *Psychological Science*; Karpicke & Roediger 2008, *Science*; Dunlosky, Rawson, Marsh, Nathan & Willingham 2013, *Psych. Science in the Public Interest*; Agarwal, Nunes & Blunt 2021, *Educational Psychology Review* | Recall from memory, often, with feedback; review learned material, not only errors |
| Spacing | Cepeda, Pashler, Vul, Wixted & Rohrer 2006, *Psychological Bulletin*; Cepeda, Vul, Rohrer, Wixted & Pashler 2008, *Psychological Science*; Kang 2016, *Policy Insights from the Behavioral and Brain Sciences* | Expanding gaps; the best gap grows with how long it must be remembered |
| Interleaving | Rohrer & Taylor 2007, *Instructional Science*; Taylor & Rohrer 2010 (4th graders), *Applied Cognitive Psychology*; Rohrer, Dedrick & Stershic 2015, *J. Educational Psychology*; Brunmair & Richter 2019, *Psychological Bulletin* (meta-analysis) | Mix problem types that need different methods, from recent units, so the child must choose the method |
| Mastery learning | Bloom 1968, *Evaluation Comment*; Kulik, Kulik & Bangert-Drowns 1990, *Review of Educational Research*; Guskey 2007 | A high criterion (80-90%) with correction before moving on; higher criteria gave larger effects |
| Desirable difficulty and adaptivity | Bjork 1994; Wood, Bruner & Ross 1976; Kalyuga, Ayres, Chandler & Sweller 2003 (expertise reversal), *Educational Psychologist* | Practice near the edge of ability; fade support as skill grows; do not count supported answers as independent |
| Fact fluency | Baroody 2006, *Teaching Children Mathematics*; NCTM 2014, *Principles to Actions*; Fuchs et al. 2021, IES/WWC 2021-006; Boaler 2014, *Teaching Children Mathematics* ("Research suggests that timed tests cause math anxiety"); Ramirez, Gunderson, Levine & Beilock 2013, *J. Cognition and Development* | Strategies first, then brief timed practice of known facts; avoid timed pressure for young children |
| Placement and testing | Wainer & Kiely 1987 (testlets), *J. Educational Measurement*; Wainer et al. 2000, *Computerized Adaptive Testing: A Primer* | Short adaptive testlets work; guessing on 3-4 choices needs a confirmation step |
| Feedback | Hattie & Timperley 2007, *Review of Educational Research*; Shute 2008, *Review of Educational Research* | Immediate, specific, task-focused feedback with a second try |
| Praise and goals | Mueller & Dweck 1998, *J. Personality and Social Psychology*; Gunderson, Gripshover, Romero et al. 2013, *Child Development*; Ames 1992, *J. Educational Psychology* | Praise process, not person; mastery goals over "be perfect" goals |
| Rewards | Deci, Koestner & Ryan 1999, *Psychological Bulletin*; Cameron & Pierce 1994, *Review of Educational Research* | Expected tangible rewards can lower interest; rewards tied to effort and progress, and informational feedback, are safer |
| Healthy design for children | UK ICO *Age Appropriate Design Code* 2020 (standard 13, nudge techniques); Radesky, Hiniker, McLaren et al. 2022, *JAMA Network Open* (manipulative design in children's apps) | No pressure to return, no badge counts that create urgency, no streak loss threats |

### 2.3 Fact Sprint (57-fluency.js)

- **Design**: sets add10, sub10, add20, sub20, times facts, divide facts; 60 seconds or 20 facts; a missed fact shows its answer for
  1 s and comes back after 3 others; personal best, a 7-day sparkline; game time once a set a day plus records.
- **Strong**: sets beyond add10 open only after the matching stop is passed (understanding first, Baroody 2006; NCTM 2014). Immediate
  correction and requeue of a miss. The clock pauses when the app is hidden. No comparison with other children.
- **Must 1**: `add10` has `ok: () => true` and the Home tile is shown for every grade. A fresh Pre-K child ("Mia", grade −1) sees
  Fact Sprint on Home and can start "Adding to 10" [pr-home-prek-380x780, pr-flu-menu-prek-380x780, pr-flu-play-380x780]. The
  sprint shows "1 + 8 = ?" with no voice. The daily mission pool adds "Do a Fact Sprint" from Kindergarten (`sprint (grade K and up)`).
  NCTM and Boaler 2014 warn against timed fact tests for young children; Ramirez et al. 2013 found maths anxiety already in grades
  1-2. Fuchs et al. 2021 recommend timed practice of known facts as part of grade 1 up intervention.
- Should 12 (and R-01 math Could 17): facts are drawn evenly at random from the set; nothing is kept per fact.
- The 20-facts mode also times the child (fastest seconds); fine from grade 2, but it is not an untimed option.

### 2.4 Fact Race (54-race.js)

- R-02 M5 (game time every race) was fixed in P5-09: the first race a day per category pays 1 min.
- Should 11: coins `floor(score / 2) + 5` for a record are paid every race with no limit; a 60-second race with 20 right pays 10 coins,
  so the Pet Shop can be bought from races alone. The countdown is a plain `setInterval` that does not pause when the page is hidden
  (Fact Sprint's does). A missed item is shown for 0.8 s and not asked again (Fact Sprint requeues it).
- Math races use facts with 0 and sums to 18 once "add 1" is passed; sight word and Spanish races are listening items with a 60 s
  clock, which suits them less (each item needs the word to be heard).

### 2.5 Daily Review and the review engine (59-review.js)

- **Design**: Leitner boxes over first-try misses; intervals 0, 1, 3, 7, 21 days; right while due moves up, right in box 4 leaves;
  any miss resets to box 0; max 150 items; Daily Review asks the 10 most urgent; stop rounds ask a due item of the stop at questions
  2 and 6 and of the path at 4 and 8.
- **Strong**: an expanding schedule and in-round slots are what spacing research recommends (Cepeda 2006, 2008; Kang 2016). Daily Review
  pays a full round of game time, so review is not second class. "All caught up!" is a kind empty state.
- Should 4: nothing enters review unless it was missed. Learned stops get only the random "older stop" question at question 4 or 8
  when nothing is due, and Mixed Practice. Skipped worlds (placement, test out) are never reviewed. Retrieval practice research
  (Roediger & Karpicke 2006; Agarwal et al. 2021) is about recalling what was learned, not only what was missed.
- Should 5: `revQ` rebuilds the item from its seed, so the same numbers come back. Tricky fixture Daily Review question 1: "9 Even or
  odd?" [pr-review-q1-380x780]; after a wrong tap it shows the dot picture hint and allows a second try [pr-review-wrong-380x780].
  For two-choice items the child can learn "9 is odd" without learning even and odd.
- Should 10: the Home tile shows the whole backlog in a red count bubble (21 for the tricky fixture) [pr-home-tricky-380x780].
- Could 13: a single slip from box 4 (21 days) goes back to box 0 (due today).

### 2.6 Mixed Practice (50-round.js `mixQs`)

- **Design**: up to 7 due review items, then random questions from every stop the child has unlocked up to its current stop on every
  path, shuffled; no stars or map progress; pays 60% of a round, +30 s per fixed item.
- **Interleaving**: mixing subjects is cumulative review, not the interleaving that the research tests (Rohrer & Taylor 2007; Brunmair &
  Richter 2019): that is mixing problem types inside a subject that need different methods (add or subtract, area or perimeter), from
  recent units.
- Should 2, measured: a 3rd grader at maths stop 90 of 184 and reading stop 60 of 84, 3,000 Mixed Practice questions: maths 52%,
  reading 37%, Spanish 6%, Discover 5%; by distance from the current stop 0-3 back 8%, 4-10 back 16%, 11-25 back 18%, 26+ back 59%;
  by the world's grade Pre-K 17%, K 22%, grade 1 26%, grade 2 25%, grade 3 10%.

### 2.7 Placement, "Find my level" (45-placement.js)

- **Design**: start one grade below; testlets of 4 questions from one world; 3-4 right up, 0-1 down, 2 = one more testlet (6 of 8);
  stop at a pass/fail boundary, an end, or 20 questions; worlds below the result marked skipped (still playable); nothing removed.
- **Screens**: kind intro ("A few Reading questions. Some may be tricky, and that's OK. Just do your best! No stars to win or lose.
  You can stop any time.") [pr-place-intro-380x780]; one try per question, no feedback (right for a test) [pr-place-q-380x780].
- **Accuracy** (400 simulated quizzes per cell, maths path; reading is similar):

| Child (knows 90%, guesses 30%) | Exact | Within 1 world | Placed too high | Questions |
|---|---|---|---|---|
| right world = the start world, grade 1 | 90% | 100% | 9% | 9 |
| right world 1 below the start, grade 3 | 89% | 99% | 9% | 10 |
| right world 2 below the start, grade 3 | 84% | 92% | 14% | 14 |
| right world 3 below the start, grade 3 | 74% | 82% | 24% (11% by 3 worlds or more) | 17 |
| right world 3 below the start, grade 5 | 76% | 86% | 23% (9% by 3 worlds or more) | 17 |
| right world 4 above the start, grade 1 | 87% | 96% | 7% | 20 |
| right world 5 above the start (cap of 5 testlets) | 75-78% | 91-93% | 0% (placed low) | 20 |

  With a less steady child (knows 80%, guesses 33%) exact placement drops to 63-82% near the start, and children far above the
  start are placed 1-5 worlds too low (cap of 20 questions; harmless, they can test out).
- Should 3: over-placement comes from a first testlet passed by luck at 3 of 4. A struggling child placed 3 worlds up meets work
  well above them on day one. Confirm a first pass (second testlet, or 4 of 4) before going up.

### 2.8 Challenge and support rounds, mastery (51-mastery.js, 50-round.js)

- **Design**: after 5 questions, 5 of 5 with a median under 12 s (16 s Pre-K/K) = challenge (harder stop, tagged, misses forgiven
  for stars); 2 or fewer = support (hint first, every other question from the easier stop); 3 misses in a row = an easier question
  with the hint; mastery record per stop (accuracy, speed, days).
- **Played**: support round, grade 2: after 3 misses the next question is from the easier stop with the hint already open ("Add 1
  each time. What comes after 2?") [pr-round-support-380x780]; challenge round: a purple "Challenge!" tag on a count-by-10s question
  [pr-round-challenge-380x780]. Both read well at 380 and 1024.
- **Strong**: adaptation within the zone of proximal development (Vygotsky; Wood et al. 1976), forgiving challenge misses, and the
  same answers always giving the same path (testable).
- Should 7: `mastTry` records support answers (hint visible before trying) as plain right answers; those also count to the 7-of-10
  pass and stars (expertise reversal and fading: Kalyuga et al. 2003).
- Should 8: pass bar 7 of 10 (1 star), 8 for 2 stars, 10 for 3. Bloom's mastery learning and Kulik et al. (1990) used 80-90%. The
  "mastered" state (90%, 20 tries, 2 days) exists but nothing acts on a stop that was passed and never mastered.
- Low-score card: kind and specific ("Get 7 right to open the next stop. You can do it!") [pr-round-end-380x780]; Should 9: the same
  card said "New Best streak: 10 in a row!" for a 6-of-10 round (`G.streak` counts retries).

### 2.9 Streaks (55-streak.js)

- One round a day lights the day; one rest day per 7 is forgiven; prizes at 3, 7, 14 and 30 days (coins and a sticker); no warning,
  no loss message, a calm calendar [pr-streak-380x780]. This is the gentle end of streak design (ICO Children's Code standard 13
  names streaks as a nudge; Star School has no loss framing).
- Could 15: no prize after 30 days (fine: the streak should not become the goal); the milestone line uses emoji.

### 2.10 Missions (55-missions.js)

- Three a day, always one round in the weakest subject (good: it steers practice to need), the others from what the child can do.
- Should 6: "Get a perfect round: Every answer right!" appeared for a fresh Pre-K child on day one [pr-home-prek-380x780]. It is a
  performance goal (Ames 1992); children may pick easy stops or feel failure at one slip. Replace with effort and repair goals.
- Must 1: the sprint mission from K.

### 2.11 Rewards and game time (58-playtime.js, 50-round.js, 18-reward-art.js)

- Round pay: 1, 2 or 3 min by accuracy (under 50% still pays 1 min, "Keep trying"), +1 min new stop, +½ min beat your score,
  up to +1½ min harder world, +1 min perfect, +2 min boss, +20 s per old mistake fixed; repeats of a stop pay less; mastered stops pay
  1 min. This rewards progress and repair, not only perfection, and R-02's economy notes stand.
- Feedback words: PRAISE is "Great job!", "Awesome!", "Brilliant!", "Nailed it!"; "3 in a row! You're on fire!". Mostly
  outcome praise; Could 14 adds process praise (Mueller & Dweck 1998; Gunderson et al. 2013).
- Help in learning rounds is free: it shows the hint at no cost, and a right answer after Help counts as a right first try. That is
  kind and encourages asking for help, but the mastery record then cannot tell helped from independent answers (Should 7 applies to
  Help as well as support mode). Brain Teasers do the opposite and halve game time for hints (R-01-brain-teasers.md Should 6).

### 2.12 Top 10 for the practice systems

1. Fact Sprint from grade 1 only, after the first adding stop; no sprint mission before grade 1 (Must 1, S).
2. Weight Mixed Practice to recent and weak stops (S).
3. Confirm a first placement pass before moving up (S).
4. Schedule learned and skipped stops for spaced check-ins, not only mistakes (M).
5. Fresh questions of the same skill in review, except single facts (S).
6. Replace "perfect round" missions with effort and repair missions (S).
7. Count hint-first support answers as supported, not mastered (S).
8. Act on "passed but not mastered" stops (S-M).
9. Count first tries only in the in-round streak (S).
10. Calm review count ("10 to review") and daily coin cap plus hidden-tab pause for Fact Race (S).
