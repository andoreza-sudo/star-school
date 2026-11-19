# Hint: dfact

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gives a neighbouring fact when dividing (or finding a missing factor): one too many or too few. Grades: 3, 4.

## As the child sees it

- Dividing Facts (dfact1): "12 divided by 2 equals what?" answered 5: "Multiply back to check. Does 5 × 2 make 12?"
- Times Facts (mfact4): "4 times what equals 8?" answered 1: "Multiply back to check. Does 1 × 4 make 8?"
- Story Problems (story5): "Ben puts 10 crayons into bags, 2 in each bag. How many bags is that?" answered 4: "Multiply back to check. Does 4 × 2 make 10?"
- Long Division (dbig1): "80 divided by 5 equals what?" answered 15: "Multiply back to check. Does 15 × 5 make 80?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "dfact",
 "line": "Multiply back to check. Does {v} × {b} make {a}?",
 "api": "Try the fact right next to {v} with {a} and {b}.",
 "notes": "New code (dividing and missing factors). Draft \"try the fact next to v\" was vague."
}
```
