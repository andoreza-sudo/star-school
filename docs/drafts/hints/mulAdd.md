# Hint: mulAdd

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds the numbers instead of multiplying them. Grades: 2, 3, 4, 5.

## As the child sees it

- Equal Groups (mult1): "4 groups of 10. How many in all?" answered 14: "4 × 10 means 4 groups of 10, not 4 + 10."
- Arrays (arr1): "5 rows of 5. How many in all?" answered 10: "5 × 5 means 5 groups of 5, not 5 + 5."
- Times Facts (mfact1): "10 times 7 equals what?" answered 17: "10 × 7 means 10 groups of 7, not 10 + 7."
- Times Tens (mbig1): "800 times 8 equals what?" answered 808: "800 × 8 means 800 groups of 8, not 800 + 8."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "mulAdd",
 "line": "{a} × {b} means {a} groups of {b}, not {a} + {b}.",
 "api": "Try {sign} {a} and {b} this time.",
 "notes": "Draft used a slot this code does not have ({sign})."
}
```
