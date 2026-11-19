# Hint: sideP

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

takes one side from the whole perimeter (forgets to halve it). Grades: 4.

## As the child sees it

- Perimeter and Area (geo3): "A rectangle has a perimeter of 26 inches. One side is 7 inches. How long is the other side?" answered 19: "Half the perimeter is one long side and one short side."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "sideP",
 "line": "Half the perimeter is one long side and one short side.",
 "api": "Halve the leftover perimeter after using one side.",
 "notes": "Draft \"halve the leftover perimeter after using one side\" was the method in the wrong order."
}
```
