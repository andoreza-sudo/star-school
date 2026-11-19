# Hint: mcarry

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

multiplies each place but forgets to add the ten it carried. Grades: 4.

## As the child sees it

- Times Facts (mfact5): "12 times 8 equals what?" answered 86: "2 × 8 = 16. Add what you carry to the next place."
- Times Tens (mbig2): "27 times 4 equals what?" answered 88: "7 × 4 = 28. Add what you carry to the next place."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "mcarry",
 "line": "{x} × {b} = {n}. Add what you carry to the next place.",
 "api": "Add the {n} you carried from the {x}s.",
 "notes": "Draft \"Add the 16 you carried from the 2s\" was untrue (only the tens of 16 are carried)."
}
```
