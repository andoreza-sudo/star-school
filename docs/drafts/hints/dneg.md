# Hint: dneg

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

treats taking away a negative number as taking away. Grades: 6.

## As the child sees it

- Integers (int3): "negative 7 minus negative 11. What is the answer?" answered -18: "Taking away a negative is the same as adding."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "dneg",
 "line": "Taking away a negative is the same as adding.",
 "api": "Adding the second negative changes {v}.",
 "notes": "Draft \"adding the second negative changes it\" was unclear."
}
```
