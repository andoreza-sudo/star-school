# Hint: dig

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads two letters that make one sound as one letter (ship as sip). Grades: 1, 2, 3, 4, 5, 6.

## As the child sees it

- Picture Words (pic2): "Which word is this?" answered sell: "Some letters go together to make one sound. Look again."
- Build a Word (build2): "fish" answered fis: "Some letters go together to make one sound. Look again."
- Spelling (spell2): "brush. Brush your teeth twice a day. brush." answered brus: "Some letters go together to make one sound. Look again."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "dig",
 "line": "Some letters go together to make one sound. Look again.",
 "api": "{o} uses two letters for one sound. Try again.",
 "notes": "Draft wrote \"two\" as a word."
}
```
