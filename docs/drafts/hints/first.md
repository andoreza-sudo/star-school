# Hint: first

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

hears or reads the first sound wrong (sun as bun). Grades: K, 1, 2, 3, 4, 5, 6.

## As the child sees it

- Letter Sounds (sound1): "fish. What sound does fish start with?" answered h: "Listen to the very first sound again. Say it slowly."
- Picture Words (pic1): "Which word is this?" answered nap: "Listen to the very first sound again. Say it slowly."
- Build a Word (build1): "pin" answered kin: "Listen to the very first sound again. Say it slowly."
- Spelling (spell1): "wet. The dog got wet in the rain. wet." answered bet: "Listen to the very first sound again. Say it slowly."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "first",
 "line": "Listen to the very first sound again. Say it slowly.",
 "api": "Listen for the first sound in {o}. Try again.",
 "notes": "Draft said \"the first sound in {o}\" (the child's word, not the one asked)."
}
```
