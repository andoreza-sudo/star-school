# Hint: idist

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

takes one number from the other without the minus sign (distance across zero). Grades: 6.

## As the child sees it

- Integers (int2): "How many steps apart are negative 8 and 5 on the number line?" answered 3: "One number is below zero. Count to zero, then past it."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "idist",
 "line": "One number is below zero. Count to zero, then past it.",
 "api": "Look at how far {v} is from zero on each side of the number line.",
 "notes": "Draft was unclear."
}
```
