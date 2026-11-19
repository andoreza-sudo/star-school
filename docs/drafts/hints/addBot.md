# Hint: addBot

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds (or takes away) the bottom numbers too, when the bottoms are the same. Grades: 4.

## As the child sees it

- Fraction Math (fop1): "1 fourth plus 2 fourths. Write the answer as a fraction." answered 3/8: "Same-size parts: the bottom number stays the same."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "addBot",
 "line": "Same-size parts: the bottom number stays the same.",
 "api": "Add only the tops. The bottoms stay the same. Check {v}.",
 "notes": "Draft said \"add only the tops\" also for taking away."
}
```
