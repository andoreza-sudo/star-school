# Hint: xyswap

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

switches the x and y numbers of a point. Grades: 5.

## As the child sees it

- Coordinates (coord1): "Tap the point 2, 1. Go 2 across, then 1 up." answered 1,2: "Go across first, then up. The first number is across."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "xyswap",
 "line": "Go across first, then up. The first number is across.",
 "api": "The first number tells how far across then the second tells how far up.",
 "notes": "Kept."
}
```
