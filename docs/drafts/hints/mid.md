# Hint: mid

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads (or hears) the middle vowel wrong (cat as cut). Grades: K, 1, 2, 3, 4, 5, 6.

## As the child sees it

- Letter Sounds (sound3): "box. Which vowel is in the middle of box?" answered a: "Say it slowly. Listen to the middle sound."
- Picture Words (pic1): "Which word is this?" answered pan: "Say it slowly. Listen to the middle sound."
- Build a Word (build1): "pin" answered pen: "Say it slowly. Listen to the middle sound."
- Spelling (spell1): "wet. The dog got wet in the rain. wet." answered wat: "Say it slowly. Listen to the middle sound."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "mid",
 "line": "Say it slowly. Listen to the middle sound.",
 "api": "Listen for the middle vowel in {o}. Try again.",
 "notes": "As first."
}
```
