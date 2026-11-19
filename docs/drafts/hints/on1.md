# Hint: on1

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

one too many or one too few when counting on or back. Grades: K, 1.

## As the child sees it

- Adding (add4): "2 plus 1. Tap the frame to put in 2, then 1 more." answered 4: "So close. Count again from 2, one step for each of 1."
- Ten Frames (tenf3): "How many in all?" answered 13: "So close. Count again from 10, one step for each of 4."
- Take Away (sub1): "9 minus 8 equals what?" answered 0: "So close. Count again from 9, one step for each of 8."
- Story Problems (story1): "Mia found 7 ducks in the yard and 1 more by the door. How many ducks in all?" answered 9: "So close. Count again from 7, one step for each of 1."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "on1",
 "line": "So close. Count again from {a}, one step for each of {b}.",
 "api": "Count on from {a} by {b} again. Check the last number.",
 "notes": "Draft \"count on from a by b\" is wrong for taking away (count back). This wording fits both."
}
```
