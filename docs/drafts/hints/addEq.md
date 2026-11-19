# Hint: addEq

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds the same number to the top and the bottom of a fraction. Grades: 3.

## As the child sees it

- Fractions (frac5): "1 half equals how many fourths?" answered 3: "Multiply the top and bottom by the same number. Do not add."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "addEq",
 "line": "Multiply the top and bottom by the same number. Do not add.",
 "api": "Try multiplying the top and bottom by {n} instead of adding {d}.",
 "notes": "Draft used the fraction's own top and bottom as if they were the numbers to multiply and add by (untrue)."
}
```
