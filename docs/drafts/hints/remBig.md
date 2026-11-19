# Hint: remBig

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

leaves a remainder as big as the divisor, or bigger. Grades: 4, 5.

## As the child sees it

- Long Division (dbig2): "70 divided by 8. How many whole groups, and what is left over?" answered 7R14: "The leftover must be smaller than 8. Can one more group fit?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "remBig",
 "line": "The leftover must be smaller than {b}. Can one more group fit?",
 "api": "The left over must be smaller than {b}.",
 "notes": "Kept; added the question that fixes it."
}
```
