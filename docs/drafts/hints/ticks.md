# Hint: ticks

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

counts the tick marks instead of the jumps (spaces). Grades: 2, 3.

## As the child sees it

- Measuring (meas3): "How long is the paper strip? Say how many centimeters." answered 12: "Count the jumps between the marks, not the marks."
- Fractions (frac3): "Put the pin on 5 sixths." answered 5/7: "Count the jumps between the marks, not the marks."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "ticks",
 "line": "Count the jumps between the marks, not the marks.",
 "api": "Count the jumps between the ticks on the ruler. Look at {v}.",
 "notes": "Draft said \"on the ruler\" also for fraction number lines."
}
```
