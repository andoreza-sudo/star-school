# Hint: rup

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

rounds up when the next digit is below five. Grades: 3, 4, 5.

## As the child sees it

- Rounding (round1): "Round 34 to the nearest 10. The dot shows 34. Slide the pin to the rounded number." answered 40: "The next digit is 4. That is not enough to round up."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "rup",
 "line": "The next digit is {d}. That is not enough to round up.",
 "api": "The digit after is {d}. Is that five or higher?",
 "notes": "Draft wrote \"five\" as a word."
}
```
