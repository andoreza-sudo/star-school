# Hint: impAdd

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds the whole, the top and the bottom instead of multiplying. Grades: 4.

## As the child sees it

- Fractions (frac8): "1 and 8 ninths equals how many ninths?" answered 18: "Multiply the whole by the bottom, then add the top."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "impAdd",
 "line": "Multiply the whole by the bottom, then add the top.",
 "api": "Multiply the whole by the bottom then add the top. Try {v} again.",
 "notes": "Kept."
}
```
