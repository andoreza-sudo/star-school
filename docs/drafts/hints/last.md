# Hint: last

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

hears or reads the last sound wrong (cat as cap). Grades: K, 1, 2, 3, 4, 5, 6.

## As the child sees it

- Picture Words (pic1): "Which word is this?" answered pig: "Say it slowly. Listen to the very end."
- Letter Sounds (sound2): "leg. What sound does leg end with?" answered l: "Say it slowly. Listen to the very end."
- Build a Word (build1): "pin" answered pik: "Say it slowly. Listen to the very end."
- Spelling (spell1): "wet. The dog got wet in the rain. wet." answered wew: "Say it slowly. Listen to the very end."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "last",
 "line": "Say it slowly. Listen to the very end.",
 "api": "Listen for the last sound in {o}. Try again.",
 "notes": "As first. Same line as the lessons."
}
```
