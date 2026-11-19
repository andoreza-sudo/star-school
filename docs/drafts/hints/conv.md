# Hint: conv

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds instead of multiplying when changing to a smaller unit. Grades: 4.

## As the child sees it

- Measuring (meas5): "17 minutes is how many seconds?" answered 77: "Smaller units need more of them. Multiply, do not add."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "conv",
 "line": "Smaller units need more of them. Multiply, do not add.",
 "api": "Multiply to change from {u} to {w}.",
 "notes": "Kept the idea; named the mistake."
}
```
