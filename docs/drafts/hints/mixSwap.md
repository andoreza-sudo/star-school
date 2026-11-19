# Hint: mixSwap

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

swaps the wholes and the parts left over. Grades: 4.

## As the child sees it

- Fractions (frac8): "Write 37 over 10 as a whole number and a fraction." answered 7 3/10: "How many wholes fit? That goes first. The leftover goes on top."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "mixSwap",
 "line": "How many wholes fit? That goes first. The leftover goes on top.",
 "api": "The whole number comes first then the fraction. Check {v}.",
 "notes": "Draft \"the whole number comes first\" missed that the numbers were swapped."
}
```
