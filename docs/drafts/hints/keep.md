# Hint: keep

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

trades a ten for the ones but does not take it from the tens. Grades: K, 1, 2, 3, 4.

## As the child sees it

- Take Away (sub1): "10 minus 7 equals what?" answered 13: "You traded from the tens. Now the tens have one less."
- Story Problems (story1): "Leo had 10 cookies. Leo gave 9 to Mia. How many cookies are left?" answered 11: "You traded from the tens. Now the tens have one less."
- Coins (coins5): "An apple costs 15 cents. You pay 1 dollar. How many cents do you get back? Put the change in the purse." answered 195: "You traded from the tens. Now the tens have one less."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "keep",
 "line": "You traded from the {place}. Now the {place} have one less.",
 "api": "Trade one from the {place} in {a} for the ones too.",
 "notes": "Draft said \"trade one from the place for the ones too\": unclear, and wrong when the trade is for the tens."
}
```
