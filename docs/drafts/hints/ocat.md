# Hint: ocat

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads a number next to a letter as two digits (5n with n = 3 as 53). Grades: 6.

## As the child sees it

- Order of Operations (ooo3): "p equals 6. What is 8 p plus 9?" answered 95: "A number next to p means times p."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "ocat",
 "line": "A number next to {x} means times {x}.",
 "api": "Try {x} times the letter then add in {v}.",
 "notes": "Draft was unclear (\"times the letter then add\")."
}
```
