# Hint: seqdir

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

counts the wrong way (on instead of back, or back instead of on). Grades: K, 1, 2.

## As the child sees it

- Count By (cnt4): "Count on. 14, 15, 16, what, 18" answered 15: "Do the numbers go up or down? Keep going the same way."
- Patterns (pat3): "46, 37, 28, 19, what comes next?" answered 28: "Do the numbers go up or down? Keep going the same way."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "seqdir",
 "line": "Do the numbers go up or down? Keep going the same way.",
 "api": "Count on or count back? Look at the direction the numbers go.",
 "notes": "Kept the idea."
}
```
