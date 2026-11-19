# Hint: divMul

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies when it should divide. Grades: 3, 4, 5.

## As the child sees it

- Dividing Facts (dfact1): "12 divided by 2 equals what?" answered 24: "Look at the sign. We share, we do not multiply."
- Long Division (dbig1): "80 divided by 5 equals what?" answered 400: "Look at the sign. We share, we do not multiply."
- Decimals (dec5): "43 divided by 5 equals what?" answered 215: "Look at the sign. We share, we do not multiply."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "divMul",
 "line": "Look at the sign. We share, we do not multiply.",
 "api": "Try dividing {a} by {b} this time.",
 "notes": "Draft only said \"try dividing\"."
}
```
