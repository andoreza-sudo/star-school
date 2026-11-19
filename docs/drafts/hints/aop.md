# Hint: aop

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

does the sign's operation again instead of undoing it (m + 33 = 98 gives 131). Grades: 6.

## As the child sees it

- Equations (alg1): "Solve the equation. x plus 8 equals 39. What is x?" answered 47: "To find the letter, undo the plus: do the opposite."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "aop",
 "line": "To find the letter, undo the {sign}: do the opposite.",
 "api": "Undo the {sign} to fix {v}.",
 "notes": "Draft \"undo the plus to fix 47\" kept, plainer."
}
```
