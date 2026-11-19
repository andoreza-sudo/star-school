# Hint: lswap

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

puts two letters in the wrong order (from as form). Grades: K, 1, 2, 3, 4, 5, 6.

## As the child sees it

- Build a Word (build1): "pin" answered ipn: "Check the order of the letters in ipn."
- Spelling (spell1): "wet. The dog got wet in the rain. wet." answered ewt: "Check the order of the letters in ewt."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "lswap",
 "line": "Check the order of the letters in {o}.",
 "api": "look again at the order of the letters in {o}",
 "notes": "Kept, with a capital and a full stop."
}
```
