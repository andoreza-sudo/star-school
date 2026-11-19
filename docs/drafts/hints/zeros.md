# Hint: zeros

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes one zero too many or too few. Grades: 2, 3, 4, 5.

## As the child sees it

- Equal Groups (mult1): "4 groups of 10. How many in all?" answered 400: "Count the zeros in the problem, then in 400."
- Times Facts (mfact1): "10 times 7 equals what?" answered 700: "Count the zeros in the problem, then in 700."
- Dividing Facts (dfact1): "90 divided by 10 equals what?" answered 90: "Count the zeros in the problem, then in 90."
- Times Tens (mbig1): "5 times 100 equals what?" answered 5000: "Count the zeros in the problem, then in 5000."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "zeros",
 "line": "Count the zeros in the problem, then in {v}.",
 "api": "Count the zeros in {v} again.",
 "notes": "Draft only said count the zeros in the answer."
}
```
