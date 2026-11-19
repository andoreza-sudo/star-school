# Hint: longer

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

thinks a decimal with more digits is bigger. Grades: 4.

## As the child sees it

- Decimals (dec2): "Is 0 point 3 2 1 less than, equal to, or greater than 0 point 9 2?" answered >: "More digits does not mean bigger. Compare the tenths first."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "longer",
 "line": "More digits does not mean bigger. Compare the tenths first.",
 "api": "Look at {x} and {y}. Which has more digits after the point?",
 "notes": "Draft asked \"which has more digits after the point?\", which teaches the mistake."
}
```
