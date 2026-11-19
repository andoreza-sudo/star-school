# Hint: ineg

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

compares negative numbers by their size without the minus sign. Grades: 6.

## As the child sees it

- Integers (int1): "Is 1 less than, equal to, or greater than negative 2?" answered <: "Below zero, the number farther from zero is smaller."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "ineg",
 "line": "Below zero, the number farther from zero is smaller.",
 "api": "Compare {x} and negative {y}. Which is farther left on the number line?",
 "notes": "Draft said \"negative {y}\" even when y is already negative (negative -2)."
}
```
