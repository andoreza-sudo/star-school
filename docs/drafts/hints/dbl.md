# Hint: dbl

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes one letter where the word has two the same (hill as hil). Grades: K, 1, 2, 3, 4, 5, 6.

## As the child sees it

- Build a Word (build1): "egg" answered eg: "This word has a double letter. Look again."
- Spelling (spell1): "egg. She cracked the egg into a bowl. egg." answered eg: "This word has a double letter. Look again."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "dbl",
 "line": "This word has a double letter. Look again.",
 "api": "{o} has two same letters together. Try again.",
 "notes": "Draft wrote \"two\" as a word."
}
```
