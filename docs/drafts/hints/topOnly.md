# Hint: topOnly

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies the tops and keeps one bottom. Grades: 5.

## As the child sees it

- Fraction Math (fop5): "1 third times 1 half. The picture shows the rows and the columns. Write the answer as a fraction." answered 1/3: "Multiply the tops, and multiply the bottoms too."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "topOnly",
 "line": "Multiply the tops, and multiply the bottoms too.",
 "api": "Multiply tops and bottoms then simplify. Check {v}.",
 "notes": "Draft added \"then simplify\", which is not this mistake."
}
```
