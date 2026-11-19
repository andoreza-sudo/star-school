# Hint: fpart

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes shaded parts over unshaded parts, not over all the parts. Grades: 3.

## As the child sees it

- Fractions (frac2): "The shape has 2 equal parts. What fraction is shaded?" answered 1/1: "The bottom number counts all the parts, shaded or not."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "fpart",
 "line": "The bottom number counts all the parts, shaded or not.",
 "api": "The bottom is all the equal parts. Check {v}.",
 "notes": "Kept the idea; dropped \"Check {v}\"."
}
```
