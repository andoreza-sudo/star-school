# Hint: area

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies the sides (finds the area, not the perimeter). Grades: 3.

## As the child sees it

- Perimeter and Area (geo1): "A rectangle is 3 centimeters long and 7 centimeters wide. What is the perimeter?" answered 21: "Perimeter goes all the way around. Add every side."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "area",
 "line": "Perimeter goes all the way around. Add every side.",
 "api": "Add all four sides of the rectangle using {a} and {b}.",
 "notes": "Draft wrote \"four\" as a word."
}
```
