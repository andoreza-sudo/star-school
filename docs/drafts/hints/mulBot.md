# Hint: mulBot

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies the bottom number too (3 × 2/5 as 6/15). Grades: 4.

## As the child sees it

- Fraction Math (fop2): "8 times 8 ninths. Write the answer as a fraction." answered 64/72: "A whole number times parts: multiply the top only."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "mulBot",
 "line": "A whole number times parts: multiply the top only.",
 "api": "Multiply only the tops. The bottom stays the same. Look at {v}.",
 "notes": "Kept the idea, plainer."
}
```
