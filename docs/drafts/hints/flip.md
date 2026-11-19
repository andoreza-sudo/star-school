# Hint: flip

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes the fraction upside down. Grades: 3.

## As the child sees it

- Fractions (frac2): "The shape has 2 equal parts. What fraction is shaded?" answered 2/1: "The shaded parts go on top. All the parts go below."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "flip",
 "line": "The shaded parts go on top. All the parts go below.",
 "api": "Look at how many parts the shape has. Try again with {v}.",
 "notes": "Draft \"look at how many parts the shape has\" did not say what is upside down."
}
```
