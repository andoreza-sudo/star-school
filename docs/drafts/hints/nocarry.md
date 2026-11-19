# Hint: nocarry

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds each column and drops the extra ten (forgot to carry). Grades: 1, 2, 4.

## As the child sees it

- Story Problems (story3): "Ava has 12 ducks. Mia gives Ava 8 more. How many ducks does Ava have now?" answered 10: "2 + 8 = 10. Carry one to the next place."
- Big Numbers (big3): "13 plus 37 equals what?" answered 40: "3 + 7 = 10. Carry one to the next place."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "nocarry",
 "line": "{x} + {y} = {n}. Carry one to the next place.",
 "api": "The {place} in {a} and {b} make {n}. Write that {place} and carry the ten.",
 "notes": "Draft was 15 words (the little pet: 12). \"Carry the ten\" is untrue when the column is the tens (it carries a hundred): \"carry one to the next place\" is true in every column."
}
```
