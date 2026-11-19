# Hint: fdivx

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies when dividing by a fraction (forgets to flip it). Grades: 5.

## As the child sees it

- Fraction Math (fop6): "1 third divided by 2. The first part of the bar is cut into 2 small pieces. Write the answer as a fraction." answered 2/3: "Dividing? Flip what you divide by, then multiply."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "fdivx",
 "line": "Dividing? Flip what you divide by, then multiply.",
 "api": "Flip the second fraction then multiply. Look at {v}.",
 "notes": "Draft \"flip the second fraction\" is untrue when you divide by a whole number (1/3 divided by 2): flip what you divide by."
}
```
