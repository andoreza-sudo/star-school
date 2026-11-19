# Hint: ten

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

forgets the full ten frame (or counts it as one). Grades: K.

## As the child sees it

- Count Things (pk_count3): "How many balloons?" answered 9: "A full frame is ten. Count the ten first, then the rest."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "ten",
 "line": "A full frame is ten. Count the ten first, then the rest.",
 "api": "The full ten frame is {v} more. Add that too.",
 "notes": "Draft was untrue (\"the full ten frame is 9 more\")."
}
```
