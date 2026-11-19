# Hint: isign

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gets the size right but the sign wrong. Grades: 6.

## As the child sees it

- Integers (int3): "12 minus 13. What is the answer?" answered 1: "The size is right. Check the sign: plus or minus?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "isign",
 "line": "The size is right. Check the sign: plus or minus?",
 "api": "The size is good now flip the sign on {v}.",
 "notes": "Kept the idea."
}
```
