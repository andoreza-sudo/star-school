# Hint: hnext

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads the hour the short hand is moving towards, not the one it has passed. Grades: 1, 2, 3.

## As the child sees it

- Clocks (time2): "What time does the clock show?" answered 11:30: "The short hand has not reached 11 yet. Look again."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "hnext",
 "line": "The short hand has not reached {n} yet. Look again.",
 "api": "The short hand has passed {n}. What hour did it pass?",
 "notes": "Draft was untrue: \"The short hand has passed 11\" (it has not reached it)."
}
```
