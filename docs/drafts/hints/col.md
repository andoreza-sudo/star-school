# Hint: col

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

takes the smaller digit from the bigger one in each column. Grades: K, 1, 2, 3, 4.

## As the child sees it

- Take Away (sub1): "10 minus 7 equals what?" answered 17: "In the ones, 0 take away 7 needs a trade first."
- Story Problems (story1): "Leo had 10 cookies. Leo gave 9 to Mia. How many cookies are left?" answered 19: "In the ones, 0 take away 9 needs a trade first."
- Coins (coins5): "A pencil costs 3 dollars and 50 cents. You pay 5 dollars. How many cents do you get back?" answered 250: "In the tens, 0 take away 5 needs a trade first."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "col",
 "line": "In the {place}, {x} take away {y} needs a trade first.",
 "api": "Start with the bigger number in the {place} of {a}. Count up to {b}.",
 "notes": "Draft (\"start with the bigger number ... count up\") taught the mistake itself. The column where the top digit is smaller needs a trade."
}
```
