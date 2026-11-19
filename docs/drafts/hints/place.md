# Hint: place

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gives a digit the value of the place next to it. Grades: 2, 4, 5.

## As the child sees it

- Place Value (pv2): "What is the value of the 1 in 143?" answered 10: "Count the places again. The 1 is in the hundreds."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "place",
 "line": "Count the places again. The {d} is in the {place}.",
 "api": "Look at the {d} in the {place} place. Check its value.",
 "notes": "Draft was the same line as digit; this one says to count the places."
}
```
