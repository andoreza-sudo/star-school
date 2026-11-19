# Hint: pway

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

moves the digits the wrong way (multiplies when it should divide by ten, or the other way). Grades: 3, 4, 5.

## As the child sees it

- Times Facts (mfact1): "10 times 10 equals what?" answered 1: "Multiplying by ten makes a number bigger. Dividing makes it smaller."
- Dividing Facts (dfact1): "90 divided by 10 equals what?" answered 900: "Multiplying by ten makes a number bigger. Dividing makes it smaller."
- Place Value (pv6): "65.7 times 10 equals what?" answered 6.57: "Multiplying by ten makes a number bigger. Dividing makes it smaller."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "pway",
 "line": "Multiplying by ten makes a number bigger. Dividing makes it smaller.",
 "api": "Check the way you moved for {sign}.",
 "notes": "Draft \"check the way you moved for times\" was unclear."
}
```
