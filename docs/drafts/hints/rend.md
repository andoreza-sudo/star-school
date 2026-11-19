# Hint: rend

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads the number at the end of the thing, not how far it is from the start. Grades: 2.

## As the child sees it

- Measuring (meas3): "How long is the paper strip? Say how many inches." answered 12: "It does not start at zero. Count the spaces from its start."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "rend",
 "line": "It does not start at zero. Count the spaces from its start.",
 "api": "Count from the start of the strip to its end.",
 "notes": "Draft \"count from the start of the strip\" (the thing is not always a strip)."
}
```
