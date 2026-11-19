# Hint: apow

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies the base by the power (7^2 as 14). Grades: 5, 6.

## As the child sees it

- Place Value (pv6): "10 to the power 5 equals what?" answered 50: "The small raised number says how many times to use the base."
- Order of Operations (ooo2): "9 times 2 cubed equals what?" answered 54: "The small raised number says how many times to use the base."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "apow",
 "line": "The small raised number says how many times to use the base.",
 "api": "Count how many times to use the base in {v}.",
 "notes": "Draft \"in {v}\" pointed at the answer, not the power."
}
```
