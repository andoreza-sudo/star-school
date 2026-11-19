# Hint: remUp

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

forgets that the leftover still needs one more (a bus, a box). Grades: 4.

## As the child sees it

- Story Problems (story7): "Sparky has 8 boxes with 7 pencils in each box. Sparky puts them in bags of 5. How many bags are needed for all of them?" answered 11: "The ones left over need one more too."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "remUp",
 "line": "The ones left over need one more too.",
 "api": "Check if the leftover needs one more bag in {v}.",
 "notes": "Draft named a bag (the story may be boxes, cars or tables)."
}
```
