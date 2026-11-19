# Hint: dpt

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

puts the decimal point one place off. Grades: 5.

## As the child sees it

- Place Value (pv6): "65.7 times 10 equals what?" answered 6570: "Count the digits after the points. Where does the point go?"
- Decimals (dec4): "2.4 times 4 equals what?" answered 96: "Count the digits after the points. Where does the point go?"
- Measuring (meas6): "2 point 5 kilograms is how many grams?" answered 25000: "Count the digits after the points. Where does the point go?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "dpt",
 "line": "Count the digits after the points. Where does the point go?",
 "api": "Look at where you put the point in {v}.",
 "notes": "Draft only pointed at the answer."
}
```
