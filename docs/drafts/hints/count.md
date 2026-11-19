# Hint: count

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

counts the coins instead of adding their values. Grades: 1, 2.

## As the child sees it

- Coins (coins1): "How many cents?" answered 3: "You counted 3 coins. Add what each coin is worth."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "count",
 "line": "You counted {n} coins. Add what each coin is worth.",
 "api": "Count the value of each coin. Add the values instead.",
 "notes": "Draft was fine; named the count so the child sees what they did."
}
```
