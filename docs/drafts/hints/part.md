# Hint: part

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

leaves out the zero when multiplying by the tens digit (forgets it is tens). Grades: 4, 5.

## As the child sees it

- Times Facts (mfact5): "11 times 12 equals what?" answered 33: "Multiplying by the tens digit? Write a zero in the ones first."
- Times Tens (mbig4): "81 times 84 equals what?" answered 972: "Multiplying by the tens digit? Write a zero in the ones first."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "part",
 "line": "Multiplying by the tens digit? Write a zero in the ones first.",
 "api": "Try again and add a zero for the tens.",
 "notes": "Draft \"add a zero for the tens\" was close; made it say where the zero goes."
}
```
