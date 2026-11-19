# Hint: fact

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gives a neighbouring times fact: one group too many or too few. Grades: 2, 3, 4.

## As the child sees it

- Equal Groups (mult1): "4 groups of 10. How many in all?" answered 36: "Check: is 36 really 4 groups of 10? Count on once more."
- Arrays (arr1): "5 rows of 5. How many in all?" answered 20: "Check: is 20 really 5 groups of 5? Count on once more."
- Times Facts (mfact1): "10 times 7 equals what?" answered 60: "Check: is 60 really 10 groups of 7? Count on once more."
- Times Tens (mbig1): "10 times 9 equals what?" answered 80: "Check: is 80 really 10 groups of 9? Count on once more."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "fact",
 "line": "Check: is {v} really {a} groups of {b}? Count on once more.",
 "api": "Look again at {a} groups of {b}.",
 "notes": "Draft \"look again at a groups of b\" kept; added a way to check."
}
```
