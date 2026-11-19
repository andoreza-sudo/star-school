# Hint: abc

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

picks the letter before instead of the letter after. Grades: Pre-K.

## As the child sees it

- ABC Letters (abc4): "What letter comes after q?" answered p: "That letter comes before. Which letter comes after?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "abc",
 "line": "That letter comes before. Which letter comes after?",
 "api": "Find the letter that comes after {v}.",
 "notes": "Draft was untrue: \"Find the letter that comes after p\" (p is the child's pick)."
}
```
