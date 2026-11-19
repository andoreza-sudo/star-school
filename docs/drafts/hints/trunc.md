# Hint: trunc

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

always rounds down: drops the digits after the place. Grades: 3, 4, 5.

## As the child sees it

- Rounding (round1): "Round 845 to the nearest 10." answered 840: "The next digit is 5. That is enough to round up."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "trunc",
 "line": "The next digit is {d}. That is enough to round up.",
 "api": "The digit after is {d}. Look at that digit to round.",
 "notes": "Draft did not say which way; with this mistake the next digit is always 5 or more."
}
```
