# Hint: impTop

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies the whole by the bottom and forgets to add the top. Grades: 4.

## As the child sees it

- Fractions (frac8): "1 and 8 ninths equals how many ninths?" answered 9: "You multiplied. Now add the top number too."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "impTop",
 "line": "You multiplied. Now add the top number too.",
 "api": "Multiply the whole by the bottom then add the top. Look at {v}.",
 "notes": "Draft repeated impAdd's line; this mistake already multiplied."
}
```
