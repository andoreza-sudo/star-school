# Hint: size

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

picks the smallest when asked for the biggest (or the other way round). Grades: Pre-K, K.

## As the child sees it

- Sort and Compare (sort2): "Tap the shortest tower." answered 1: "Is the question asking for the big end or the small end?"
- Measuring (meas1): "Tap the tallest tower." answered 0: "Is the question asking for the big end or the small end?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "size",
 "line": "Is the question asking for the big end or the small end?",
 "api": "Try the other end from {v} this time.",
 "notes": "Draft named the child's answer, which is a place number here (0, 1, 2), not something they saw."
}
```
