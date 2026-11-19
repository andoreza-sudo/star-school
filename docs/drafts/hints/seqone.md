# Hint: seqone

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

counts on by one instead of by the pattern's step. Grades: K, 1, 2.

## As the child sees it

- Count By (cnt1): "Count by 10s. 40, 50, 60, what, 80" answered 61: "Each jump here is 10, not one. Look at the pattern."
- Patterns (pat3): "46, 37, 28, 19, what comes next?" answered 18: "Each jump here is 9, not one. Look at the pattern."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "seqone",
 "line": "Each jump here is {n}, not one. Look at the pattern.",
 "api": "Count by {n}s. Look at how much to add or subtract each time.",
 "notes": "Draft was 13 words; \"add or subtract\" made shorter."
}
```
