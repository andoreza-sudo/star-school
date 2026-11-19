# Hint: tensOnes

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gives the ones digit when asked how many tens. Grades: 1.

## As the child sees it

- Place Value (pv1): "How many tens are in 74?" answered 4: "That is the ones digit. Look for the tens digit."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "tensOnes",
 "line": "That is the ones digit. Look for the tens digit.",
 "api": "Count the tens place in {v} not the ones.",
 "notes": "New code. Draft \"Count the tens place in 4\" made no sense."
}
```
