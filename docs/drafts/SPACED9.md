# SPACED-9: Spaced check-ins for learned and skipped stops (BEST-APP roadmap item 9)

Roadmap: "Spaced check-ins for learned and skipped stops (already designed in the practice review)". Why: children forget, so review
must cover the stops a child passed, and the stops they skipped by placement or Test out, not only the questions they missed.
Owner decision needed: none, as long as no new wording is added. This change adds no sentence a child sees or hears (see "Wording").

Sources read: `docs/reviews/R-01-practice.md` (Should 4, section 2.5, Top 10 item 4), `src/js/59-review.js`, `51b-checkin.js`,
`50-round.js`, `51-mastery.js`, `58-playtime.js`, `45-placement.js`, `42-paths.js`, `00-core.js` (migrate), and
`docs/drafts/AUDIT-WORDS-READ.md` (owner decision P6).

## The design (R-01, v138)

- Should 4 (R-01-practice.md:60-62): "Only mistakes are reviewed (M). Things a child got right are never scheduled again, and stops
  skipped by placement or test out never get review. Forgetting is fastest in the first weeks; a short check of each passed stop after
  about 1, 7 and 30 days (one question each, in the review slots that already exist) would keep them. `59-review.js`."
- Section 2.5 (R-01-practice.md:168-171): "nothing enters review unless it was missed. Learned stops get only the random 'older stop'
  question at question 4 or 8 when nothing is due, and Mixed Practice. Skipped worlds (placement, test out) are never reviewed."
- The R-01b status line (R-01-practice.md:7) lists Should 4 as not done; it was still not done at v197.

## Gap table (v197, before this change)

Line numbers are v197 (`git show f1aca22:<file>`).

| Part | State at v197 | Evidence |
|---|---|---|
| Review of missed questions | **Done.** Leitner boxes over first-try misses, intervals 0, 1, 3, 7, 21 days; right while due moves up, right in box 4 leaves. | `59-review.js:38` (REV.INT), `:88` (revMiss), `:107` (revRight) |
| Review slots in a round | **Done, for misses only.** Questions 2 and 6 ask a due miss of the round's own stop, 4 and 8 a due miss of the path; with none due at 4 or 8, a random passed older stop of the path (no schedule, no record). | `59-review.js:43` (SLOTS_PATH), `:167-181` (revSlot); `50-round.js:99` (revSlot first), `:101-102` (random older stop) |
| Daily Review | **Done, misses only.** Asks up to 10 due miss items; pays by size (owner P4: 10 = a full round) plus 30 s per fixed item. | `59-review.js:186-204`; `58-playtime.js:57` |
| Mixed Practice | **Done, misses only, then random.** Up to 7 due miss items, then weighted random stops. | `50-round.js:29-31` (mixQs) |
| Badge check-ins (G.chk) | **Done, but not spaced.** 5 questions of one stop, offered once the stop is passed with 12+ first tries at 70%+; once the badge is won it is never offered again. Pays coins and, by owner decision P6, game time as a round of the stop. | `51b-checkin.js:20-40` (CHK.ready, MIN 12, no offer after a badge), `:124` (ptCalc, P6); `AUDIT-WORDS-READ.md:20` (P6) |
| Mastery record | **Done.** Per stop: first tries, accuracy, days, last day practised; it records any first try, a review question's too. It has no due date and asks nothing. | `51-mastery.js:2-14`, `:82` (mastAdd) |
| Placement and Test out | **Done.** Worlds below the result (or tested out) are marked `S.skip[worldId] = 1`; Test out also gives every stop of the world 2 stars. Nothing ever checks those stops again. | `45-placement.js:99`; `50-round.js:254-255` |
| **Spaced check-ins of passed stops** | **Missing.** Nothing schedules a stop the child got right; the slot 4 / 8 older-stop question is random and only when no miss is due. | as above |
| **Check-ins of skipped stops** | **Missing.** A mis-placed child is caught only if they happen to replay a skipped stop. | as above |
| A daily cap, old saves | **Missing** (nothing to cap). `migrate()` adds new fields as defaults by id (`S.chk = {}`). | `00-core.js:214` |

Why not reuse the badge check-in for this: it is 5 questions, offered only after 12 first tries at the stop, says "Get 4 right to win
a badge!", and pays game time as a round (P6). Re-offering it on a schedule would need a new line ("Check your badge again?") and would
change what the app pays per day. The design asks for one question in the slots that exist, which needs neither.

## The rule implemented (`src/js/59-review.js`, SPC)

**Where a check-in is asked.** One question of the stop's own level (`genQ(sk, lv)`), in the review slots that already exist:

- question 8 of a stop round (done 7) of a path the stop is on: a due check-in first, else the due miss item as before;
- question 4 of such a round (done 3): the due miss item first as before, else a due check-in, else the random older stop as before;
- Mixed Practice: after its (up to 7) miss items, up to `SPC.MIX` = 2 due check-ins, then the random stops as before.

Never the round's own stop; never in Daily Review, boss, Test out, placement, badge check-in or passage rounds. It shows exactly as the
review question it replaces: the "Remember this one?" tag and the pet's "Remember this?" in a stop round, nothing in Mixed Practice.

**The schedule** (`SPC.INT = [2, 7, 21, 60]` days, boxes 0 to 3):

| Stop | First due | After a right first try | After a wrong first try |
|---|---|---|---|
| passed in a round | exactly 2 days after the pass (box 0) | box 0 -> due 7 days later (box 1) -> 21 days (box 2) -> 60 days (box 3) -> finished (`SPC.DONE`, kept so it is never added again) | back to box 0, due 2 days later; the question is a review item as always (`addMiss` -> `revMiss`) |
| skipped (placement or Test out, not played 5 times) | the light check-in: from the next day, nearest below the placement first, at most 1 new one a day | finished: one right answer is enough | onto the passed ladder: box 0, due 2 days later, and the miss is a review item |

So a passed stop answered right every time is checked on days 2, 9, 30 and 90 after the pass. A right first try with the hint
showing (support mode, Help) keeps its box and is due again after the same interval. A stop of a tested-out world has 2 stars from
Test out, but counts as skipped (light) until it has 5 first tries of its own (`SPC.OWN`, half a round): Test out's stars are not
learning. A skipped stop the child later plays and passes moves onto the passed ladder.

**Caps (no flood).**

- At most `SPC.CAP` = 3 check-ins are asked a day, all rounds together (counted when asked; `S.spc.day`, `S.spc.n`).
- At most 1 per stop round slot, 2 per stop round, 2 per Mixed Practice.
- Stops that enter together (an old save's passed stops, a loaded backup, a placement's or Test out's skipped stops) take the first
  day from their start with room: at most `SPC.ROOM.l` = 2 passed and `SPC.ROOM.k` = 1 skipped stops first fall due on one day.
- Missed questions keep priority at questions 2, 4 and 6, Daily Review and the first 7 of Mixed Practice. When more check-ins are due
  than the cap allows (a child passing several stops a day), the most overdue go first (then passed before skipped), and the rest wait.

**Old saves.** `migrate()` adds `S.spc = {}` as a default by id (as `S.chk`), and nothing else. The first time the schedule is read
(the first round's question 4 or 8, a Mixed Practice, or a pass) it finds every passed and skipped stop and spreads them: passed
stops from 2 days ahead, 2 a day, the ones not practised for longest first; skipped stops from the next day, 1 a day. Nothing is due
the day an old save is first read. Measured on the fixtures: `maxed` 69 stops over 36 days, `midway` and `tricky` 20 over 11 days, a
save with 120 passed stops over 61 days, never more than 2 first due on a day.

**The clock.** Everything is a day number from `mastDay()` (`today()`, the app's own clock). A clock set back moves every due date
back by the difference (`S.spc.t`, the latest day seen), so nothing waits for months; REV's "due when further ahead than the longest
interval" rule is not used here because the old-save spread is further ahead on purpose. No random draw decides a check-in (only the
question itself, as every question), so the same save and day give the same check-ins.

**Saved data.** `S.spc = {s: {nid: {b, d, k?}}, day, n, t}`: box, due day, skipped flag; the day and count for the cap; the latest day
seen. About 20 bytes a stop (all 400 stops: about 8 KB).

**Pay: unchanged.** A check-in in a stop round takes the place of the older-stop question, which already counted as a question of the
round: the score, stars, coins, game time (ptCalc) and missions are computed exactly as before. It is never counted as "fixed" (that
stays for miss items). Mixed Practice pays a flat 60% of a round whatever it asks. Daily Review asks no check-ins, so its size, its
pay (P4) and the Home count ("N due") are unchanged. Badge check-ins and their pay (P6) are untouched.

## Wording

No new sentence. The check-in reuses the review question's existing tag "Remember this one?" and the pet's "Remember this?"
(`50-round.js` renderQ). Nothing tells the child or the grown-up that a stop was a check-in or that a skipped stop was missed.

Optional, for owner approval (not built): a Grown-ups report line when a light check-in of a skipped stop is missed, so a parent can
see a possible mis-placement. Draft: "Checked a skipped stop: {stop name}. Practice it again." Not needed for this item: the missed
stop already comes back as a review item and on the 2-day ladder.

## Tests

- `tools/test.js` **SPACED-9** (new): the schedule (days 2, 9, 30, 90; wrong -> 2 days; helped keeps its box; a clock set back), the
  cap (60 due on one day: exactly 3 asked on each of two days of 5 rounds), every fixture and a 120-stop save migrated (S.spc = {},
  migrate idempotent, spread, none due the first day, at most 2 + 1 first due a day, oldest-practised first), placement and Test out
  (light check-ins, nearest first, right finishes, wrong goes on the ladder and is a review item), payouts (the same stop round,
  Mixed Practice and Daily Review with check-ins due and with none: the same game time, coins, stars, map and review count), and 8
  weeks of play (224 rounds) twice: never more than 3 a day, every check-in due when asked and moved exactly by the rule, replayed
  identically.
- No existing expectation changed. The placement check ("saves only add place and skip") holds because `placeApply` does not touch
  `S.spc`: the skipped stops join on the next read.
