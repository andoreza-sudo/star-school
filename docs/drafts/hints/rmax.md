# Hint: rmax

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gives the biggest number instead of the range. Grades: 6.

## As the child sees it

- Picture Graphs (data5): "Pets at home: 9, 19, 5, 17, 1, 14, 19. What is the range?" answered 19: "The range is the biggest take away the smallest."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "rmax",
 "line": "The range is the biggest take away the smallest.",
 "api": "Subtract the smallest from the largest number.",
 "notes": "Kept."
}
```
