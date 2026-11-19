# Hint: radd

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds the same amount instead of multiplying (ratio tables). Grades: 6.

## As the child sees it

- Ratios and Rates (ratio1): "8 pens to 1 pencil. Make an equal ratio. What number goes with 40 pens?" answered 33: "Ratios grow by multiplying, not by adding the same amount."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "radd",
 "line": "Ratios grow by multiplying, not by adding the same amount.",
 "api": "Look at the ratio table. What number goes with {v}?",
 "notes": "Draft \"what number goes with 33\" was unclear."
}
```
