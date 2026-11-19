# Hint: cat

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes each column total side by side (27 + 15 as 312). Grades: 1, 2, 4.

## As the child sees it

- Story Problems (story3): "Ava has 12 ducks. Mia gives Ava 8 more. How many ducks does Ava have now?" answered 110: "2 + 8 = 10. Only one digit fits in the ones."
- Big Numbers (big3): "13 plus 37 equals what?" answered 410: "3 + 7 = 10. Only one digit fits in the ones."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "cat",
 "line": "{x} + {y} = {n}. Only one digit fits in the {place}.",
 "api": "Look at the {place} in {a} and {b}. Add those next.",
 "notes": "The draft (\"Add those next\") did not name the mistake: the child wrote the whole column total in one place."
}
```
