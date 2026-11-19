# Hint: pvcat

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes the parts side by side (70 + 2 as 702). Grades: 1, 2, 4.

## As the child sees it

- Adding (add2): "10 plus 8 equals what?" answered 108: "The parts share places. Each digit takes the place of a zero."
- Place Value (pv1): "80 plus 7 equals what?" answered 807: "The parts share places. Each digit takes the place of a zero."
- Story Problems (story3): "Mia has 10 balls. Sparky has 8 more than Mia. How many balls does Sparky have?" answered 108: "The parts share places. Each digit takes the place of a zero."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "pvcat",
 "line": "The parts share places. Each digit takes the place of a zero.",
 "api": "Look at {v} again. Try writing the parts one above the other.",
 "notes": "Draft (\"write the parts one above the other\") was a method, not why 70 + 2 is not 702."
}
```
