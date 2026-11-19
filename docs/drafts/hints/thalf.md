# Hint: thalf

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

forgets to halve for a triangle (base times height only). Grades: 6.

## As the child sees it

- Perimeter and Area (geo5): "A triangle has a base of 4 meters and a height of 6 meters. What is its area in square meters?" answered 24: "A triangle is half a rectangle. Halve base times height."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "thalf",
 "line": "A triangle is half a rectangle. Halve base times height.",
 "api": "Multiply the base and height then halve the result.",
 "notes": "Kept the idea."
}
```
