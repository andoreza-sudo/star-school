# Hint: op

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds instead of taking away, or takes away instead of adding. Grades: K, 1, 2, 3, 4, 5.

## As the child sees it

- Adding (add4): "2 plus 1. Tap the frame to put in 2, then 1 more." answered 1: "Look at the sign. It says add."
- Take Away (sub1): "9 minus 8 equals what?" answered 17: "Look at the sign. It says take away."
- Big Numbers (big1): "700 plus 200 equals what?" answered 500: "Look at the sign. It says add."
- Place Value (pv1): "80 plus 7 equals what?" answered 73: "Look at the sign. It says add."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "op",
 "line": "Look at the sign. It says {sign}.",
 "api": "The sign says {sign}. Do that with {a} and {b}.",
 "notes": "Shortened; true for every question with a sign shown. Story problems have their own hint (opst), because they show no sign."
}
```
