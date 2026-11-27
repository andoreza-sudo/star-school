# An older look for grades 4 to 6: read-through (OLDER-14)

BEST-APP roadmap item 14. For a child in grade 4, 5 or 6: the round ends on a score card with a personal best for that stop, with no
treasure chest to tap, and a Grown-ups switch can hide the pet. Grades below 4 are unchanged. The audit and plan are in
`docs/drafts/OLDER14.md`.

status: unreviewed

Status: **pending owner approval**. The code uses the proposed words below, but every grade keeps the chest and the pet until the owner
approves them.

## How to approve (the one-line flip)

Change the status line above from `status: unreviewed` to `status: reviewed <your name> <YYYY-MM-DD>` (for example
`status: reviewed Sam 2026-11-27`), then run `python3 tools/build.py`. The build writes `src/js/50a-olderon.js` with `OLDER_ON = 1` and
grades 4 to 6 get the new look. With any other status line it writes `OLDER_ON = 0` and the app is exactly as before. To change a
sentence, change it in `src/js/50b-older.js` (OLDW) and in the table below; tools/test.js (OLDER-14) checks that every sentence is here.

## The new words

| Where | Words | Notes |
|---|---|---|
| Score card, a row | Time | The round's time as minutes and seconds, for example 1:42 |
| Score card, a row | Your best | The best round of this stop |
| Score card, the best | {sc} out of {n} in {t} | For example "9 out of 10 in 1:42"; the same "out of" form as the approved score |
| Score card, a badge | New best! | Only when an earlier best of this stop was beaten (the first round just sets the best) |
| Score card, praise | Excellent round! | Replaces "You are a superstar!" (90% right and up) on the score card only. BEST-APP gap 6 names that line as the babyish one |
| Round end, coin row | +{n} coins! | Only with the pet hidden, in place of "+{n} coins for the pet shop!" (the shop is hidden then) |
| Grown-ups, switch | Show my pet | In the Grade and level card, for grades 4 to 6. On by default |
| Grown-ups, under it | Grades 4 to 6. Off hides the pet on Home, on the map and at the end of a round. Nothing is deleted: the pet, its costumes and the coins are kept for when it is back on. | A note under the switch |

## The approved words the card keeps

- The score: "{sc} out of {n}".
- The lines: "Fantastic work!" (70% and up), "Good job! Keep practicing!" (50% and up), "Nice try! Practice makes you stronger!".
- The tips under a low score, the game time rows, "+{n} coins for the pet shop!" (with the pet shown), every message card, Play again,
  Next, Home and Bonus game.
- The stars drawing (its spoken name "2 of 3 stars").

## What goes away for grades 4 to 6

- "Round complete!", the closed chest and "Tap the treasure chest!" (the chest step), the open chest beside the stickers.
- With the pet hidden: the pet on Home and the map, "N more stars until Pet grows!", Pet Care, Pet Shop and the My Pet tab, the cheering
  pet at the round end and the "Pet grew up!" overlay. Nothing is deleted.
