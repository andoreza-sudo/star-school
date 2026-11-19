# Hint: step1

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

stops after the first step of a two-step problem. Grades: 2, 3.

## As the child sees it

- Story Problems (story4): "Ben has 15 crayons. Mia has 11 fewer than Ben. How many crayons do they have together?" answered 4: "That is the first step. Now finish the second step."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "step1",
 "line": "That is the first step. Now finish the second step.",
 "api": "Now use that to find the total in {v}.",
 "notes": "Draft \"find the total in 4\" was unclear."
}
```
