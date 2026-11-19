# Hint: swap

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

writes the tens and ones the wrong way round (14 as 41). Grades: K, 1, 2, 3, 4.

## As the child sees it

- Hear a Number (pk_num3): "Tap the number eighteen." answered 81: "Look at 81. Which digit is the tens?"
- Ten Frames (tenf3): "How many in all?" answered 41: "Look at 41. Which digit is the tens?"
- Adding (add2): "10 plus 8 equals what?" answered 81: "Look at 81. Which digit is the tens?"
- Story Problems (story2): "Sparky has 4 pencils. Mia gives Sparky 8 more. How many pencils does Sparky have now?" answered 21: "Look at 21. Which digit is the tens?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "swap",
 "line": "Look at {v}. Which digit is the tens?",
 "api": "The tens and ones in {v} are swapped. Try again.",
 "notes": "Draft stated the digits \"are swapped\" and said \"Try again\" (the round says it already)."
}
```
