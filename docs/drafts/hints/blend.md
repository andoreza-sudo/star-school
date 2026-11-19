# Hint: blend

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

leaves out one letter of a blend (frog as fog). Grades: K, 1, 2, 3, 4, 5, 6.

## As the child sees it

- Build a Word (build1): "ant" answered an: "Say each sound slowly. Did you hear every letter?"
- Picture Words (pic2): "Which word is this?" answered led: "Say each sound slowly. Did you hear every letter?"
- Spelling (spell2): "brush. Brush your teeth twice a day. brush." answered rush: "Say each sound slowly. Did you hear every letter?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "blend",
 "line": "Say each sound slowly. Did you hear every letter?",
 "api": "{o} has all its letters. Try again.",
 "notes": "Draft \"has all its letters\" was untrue (a letter was left out)."
}
```
