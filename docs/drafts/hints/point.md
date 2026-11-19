# Hint: point

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

lines up the last digits instead of the decimal points. Grades: 5.

## As the child sees it

- Decimals (dec3): "42.11 minus 31 equals what?" answered 41.8: "Line up the points of 42.11 and 31, not the last digits."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "point",
 "line": "Line up the points of {a} and {b}, not the last digits.",
 "api": "Line up the decimal points in {a} and {b} first.",
 "notes": "Kept the idea; named the mistake (lining up the last digits)."
}
```
