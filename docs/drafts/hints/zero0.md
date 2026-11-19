# Hint: zero0

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

drops a zero inside the answer (624 ÷ 6 as 14). Grades: 4, 5.

## As the child sees it

- Long Division (dbig3): "8124 divided by 4 equals what?" answered 231: "When a place has nothing to share, write a zero there."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "zero0",
 "line": "When a place has nothing to share, write a zero there.",
 "api": "Look again at {v} and try not dropping any zero.",
 "notes": "Draft \"try not dropping any zero\" was unclear."
}
```
