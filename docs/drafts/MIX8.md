# MIX-8: Break up practice (BEST-APP roadmap item 8)

Roadmap: "mixed question shapes, no more than two alike in a row, misses returned inside the round, a shorter round after a hard
start". Owner decision needed: none, as long as no new wording is added. This change adds no sentence a child sees or hears.

Sources read: `src/js/50-round.js` (v197), `49b-kinds2.js`, `51-mastery.js`, `52-lesson.js`, `59-review.js`, `51b-checkin.js`,
`57-fluency.js`, `docs/KINDS2-SPEC.md` section 4, `docs/reviews/R-01-practice.md` (the practice review; it has no design for (b) to
(d); its "What works well" names the misses "asked again at the end of the round", and its Fact Sprint section the requeue after 3
other facts). `docs/drafts/` has no practice draft (grep PRACTICE / AUDIT finds only the word audit).

## Gap table (v197, before this change)

Line numbers are v197's `50-round.js` (`git show v197:src/js/50-round.js`) unless a file is named.

| Part | State at v197 | Evidence |
|---|---|---|
| (a) mix the question shapes in a round | **Partly done.** KINDS2 converts a share of many stops' questions to other kinds; LESSON-STAGE `lsMix` gives a learned math stop's lesson item in another kind as the third in a row; the review slots (questions 2, 4, 6, 8), the older-stop question (4, 8) and mastery's challenge / support / easier questions bring other stops' questions. Left: 176 of the 302 stops (own draws, 60 seeds each) give only one kind (math 79 of 167, reading 44 of 62, Spanish 53 of 58, Discover 0 of 15). Giving them another shape needs new items or prompts, so it is content work with owner review, not this item. | `49b-kinds2.js:1784-1814` (K2GEN, k2Wrap), `52-lesson.js:682-704` (lsMix), `50-round.js:50-53` (slots), `51-mastery.js:124-131` (mastQ), `59-review.js:167-181` (revSlot) |
| (b) no more than two of one shape in a row | **Partly done.** `pickQ` redraws the stop's own question (up to 10 draws, then lsMix) so a third of one kind is rare. Not covered: review-slot and older-stop questions are never redrawn (KINDS2 spec 4: "only count in the history"), so they can be the third in a row; Tricky Mix and Daily Review pools are asked in their drawn / urgency order; the misses at the end are not counted. | `49b-kinds2.js:1816-1834` (pickQ), `50-round.js:45` (makeQ pushes G.kh), `50-round.js:50-53` (slots not rerolled), `50-round.js:32` and `59-review.js:194` (pools) |
| (c) a missed question comes back in the same round | **Partly done.** A revealed miss is pushed to `G.missed` and asked again only after the last new question, so the round is longest for the child having the worst time (BEST-APP gap 5). A wrong try at a retry was booked again as a miss (tally and review item `n`). Fact Sprint already requeues inside the set (after 3 other facts). | `50-round.js:59` (end only), `50-round.js:176` (push), `50-round.js:128,167` (addMiss on the retry's first wrong try), `57-fluency.js:52-66` |
| (d) a shorter round after a hard start | **Missing.** Round length is fixed per grade (6, 8, 10); mastery only steps down (support, an easier question after 3 misses in a row) and its header says round length never changes. | `42-paths.js:96` (gradeCfg n), `51-mastery.js:19-31` |

Left alone, as asked and because the analysis gives no reason to touch them: boss rounds (no retries; "Try again!" only), test out
(misses keep coming back at the end; 9 of 10 is its own rule), check-ins (one try, no retry), Fact Race and Brain Teasers (not
`50-round.js` rounds), passages (a skill's own question list: its order is the story's).

## What changed (all in `src/js/50-round.js` unless named)

- **(b) run cap, a reordering.** A review question (`q.review`) that would be the third of its kind in a row waits: the stop's next
  question comes first and the review question is asked as soon as it is not a third in a row, at the latest as the last new
  question, so it is never lost. While it waits, the questions made are the stop's own (`G.nos`: no other review slot is filled then,
  so a due item that slot would have taken stays due for the next round or Daily Review). It never waits at a stop known to give one
  kind (`KMONO`), where waiting cannot help; there the review slots stay at questions 2, 4, 6, 8. Tricky Mix and Daily Review pools
  are reordered once at the start (`runCap`, a pure permutation: each next question is the first one left that is not a third in a
  row). Passages, boss, test out and check-ins keep their order.
- **(c) misses back inside the round.** A revealed miss gets `q.back = done + 2` (`BACK`) and comes back after two more new
  questions: one retry between two new questions, never right after another retry, never as a third of a kind in a row (unless the
  stop is one kind only), and not while a review question waits. What is left at the end comes back then, as before. Test out keeps
  its misses for the end.
- **(d) hard start.** `hardStart(g)` after every first-try result (both branches of `check`).
- `finish()`: the end card's "Get N right to open the next stop" uses `starNeed(g.n0 || n, .7)`, the length the next full round has.
- `59-review.js`: the Daily Review pool goes through `runCap`.
- `51-mastery.js`: header comment notes that a hard start can shorten a round.
- `MIX8.off` (test only, never set by the app) gives the v197 round, so tools/test.js MIX-8 can play every round both ways.

## Rules chosen

**Requeue scoring.** A question coming back is a retry, exactly as the end-of-round retries were: it never adds to the score,
stars, coins, `done`, the dots, the mastery record (`mastTry` runs on a first try that is not a retry) or a review box (`revRight`
only on a first try). New: a wrong try at a retry is not booked again as a miss (`addMiss` returns for the retry being asked), so a
miss counts once in the tally and in the review item's `n`. A retry missed again does not come back a second time (unchanged).
The in-a-row count is first tries only (R-01b): a retry, right or wrong, leaves it as it was (v197 set it to 0 on a right retry,
harmless at the end of the round, but mid-round it would break a run the end would not have broken). P1-08 is unchanged: a wrong
Challenge answer adds to `G.forgive`, which finish() adds back for the star rating only.

**Hard start.** In a stop's own round of 8 or more questions (no pool, boss, test out, check-in or mix), within its first half
(`done * 2 <= n`), the first tries so far leave 1 star out of reach even if every question left is right on the first try with no
hint: `score - helped/2 + forgiven + (n - done) < starNeed(n, .7)` (the score as finish() rates it). Grade 1 and up (10
questions): 4 misses in the first 4 or 5. Kindergarten (8): 3 misses in the first 3 or 4. Pre-K (6): never. The round is then cut
to `ceil(60%)` of its length (6 of 10, 5 of 8), never before the next question, once per round.

Why this and not "3 of the first 4": with the existing bars, any shorter round after 3 misses cannot reach 1 star, while the full
round of 10 still can (7 of 10 after 3 misses needs the 6 left right). Firing at 3 of 4 would take that pass away. Firing only once
1 star is out of reach takes nothing away: the cut round's `starNeed` on its own length is out of reach too (`starNeed` grows by at
most 1 per question), so stars and pass are 0 either way, as tools/test.js MIX-8 checks against the v197 round. What changes is
length: a child who has missed 4 of the first 4 answers 2 more new questions instead of 6 (plus the misses coming back).
Stars, coins and game time use the same formulas on `sc` of the shorter `n` (game time is "Keep trying" or "Round done" by
`sc / n` as before). The star thresholds go through `starNeed` unchanged; short rounds round up (owner decision P2).

## Expected values changed in tools/test.js (each because of this item)

- "daily review": the round is the same 10 most urgent items, in urgency order except that an item which would be the third of one
  kind in a row waits for the next item of another kind (`runCap`); it checked urgency order only.
- "practice audit fixes" end card 6: the round missing its first 6 is a hard start, so it ends at 6: "0 out of 6: Nice try!
  Practice makes you stronger!" (was "4 out of 10", the same approved line).
- "practice audit fixes" learn first: every answer wrong is a hard start: 6 questions of 20 s, about 120 s logged (was 10, about
  200 s), with the same 90% floor (108; was 180).
- "practice audit fixes" review slots in a challenge round: the path's review question is at question 4 and 8 as before, or later
  only when it would be the third of its kind in a row there (the check now verifies that reason); the other questions are the same
  (was exactly `---r-ccrcc`, which the run cap can change to e.g. `---r-cccrc`).

No hash, threshold, KNOWN list or fixture changed.
