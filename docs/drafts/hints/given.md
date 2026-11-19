# Hint: given

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

answers with a number that is already in the problem. Grades: K, 1, 2, 3, 4, 6.

## As the child sees it

- Adding (add4): "2 plus 1. Tap the frame to put in 2, then 1 more." answered 2: "2 is in the problem already. Find the missing number."
- Ten Frames (tenf2): "How many more to make ten?" answered 8: "8 is in the problem already. Find the missing number."
- Missing Number (miss1): "8 plus what equals 9?" answered 8: "8 is in the problem already. Find the missing number."
- Take Away (sub1): "9 minus 8 equals what?" answered 9: "9 is in the problem already. Find the missing number."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "given",
 "line": "{v} is in the problem already. Find the missing number.",
 "api": "The answer is not {v}. It is not in the question.",
 "notes": "Draft was untrue: \"It is not in the question\" (it is)."
}
```
