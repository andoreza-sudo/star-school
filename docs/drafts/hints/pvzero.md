# Hint: pvzero

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

leaves out the zero of an empty place (800 + 7 as 87). Grades: 2, 4.

## As the child sees it

- Place Value (pv3): "300 plus 6 equals what?" answered 36: "Each place needs a digit. Put a zero in an empty place."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "pvzero",
 "line": "Each place needs a digit. Put a zero in an empty place.",
 "api": "Put a zero in the empty place in {v}.",
 "notes": "Draft named the child's answer in a way that read oddly; same idea."
}
```
