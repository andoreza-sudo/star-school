# Hint: tot

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds the two numbers it sees when a part is missing. Grades: K, 1.

## As the child sees it

- Ten Frames (tenf2): "How many more to make ten?" answered 18: "10 is the total. What goes with 8 to make it?"
- Missing Number (miss1): "8 plus what equals 9?" answered 17: "9 is the total. What goes with 8 to make it?"
- Story Problems (story2): "Leo has 7 fish. Mia gives Leo some more. Now Leo has 11 fish. How many fish did Mia give Leo?" answered 18: "11 is the total. What goes with 7 to make it?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "tot",
 "line": "{b} is the total. What goes with {a} to make it?",
 "api": "One number is missing. Count on from {a} to find it.",
 "notes": "Draft (\"count on from a\") pointed at a way, not at the mistake (adding the two numbers seen)."
}
```
