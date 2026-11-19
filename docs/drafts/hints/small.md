# Hint: small

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

turns the sign round (picks the smaller one as bigger). Grades: 1, 2, 3, 4, 6.

## As the child sees it

- Compare (cmp1): "Is 16 greater than, less than, or equal to 17?" answered >: "The open side faces the bigger number. Look again."
- Fractions (frac4): "Is 1 fourth less than, equal to, or greater than 2 fourths?" answered >: "The open side faces the bigger number. Look again."
- Place Value (pv4): "Is 753684 greater than, less than, or equal to 867694?" answered >: "The open side faces the bigger number. Look again."
- Decimals (dec2): "Is 0 point 9 less than, equal to, or greater than 0 point 9 6?" answered >: "The open side faces the bigger number. Look again."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "small",
 "line": "The open side faces the bigger number. Look again.",
 "api": "Is {x} greater than, less than, or equal to {y}?",
 "notes": "Draft only read the question back. Same line as the lessons."
}
```
