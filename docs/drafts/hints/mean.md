# Hint: mean

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds the numbers and forgets to share the total out. Grades: 6.

## As the child sees it

- Picture Graphs (data5): "Each dot is one of 5 friends. It shows the number of books read. What is the mean?" answered 20: "That is the total. Now share it equally among the numbers."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "mean",
 "line": "That is the total. Now share it equally among the numbers.",
 "api": "Share the total out equally among the friends.",
 "notes": "Draft said \"among the friends\" (the data is not always friends)."
}
```
