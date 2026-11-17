# Draft: Pennies & Nickels (coins1)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Pennies & Nickels (coins1), grade 1, the little pet
Idea: Add what each coin is worth, not how many coins.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill your coin purse. Use any coins you like!
Name it:
  - You chose {n} coins.
  - They are worth {value} cents.
  - Add what each coin is worth, not how many coins.
Together:
  - Put {value} cents in the purse. Biggest coins first.
  - Look at the {n} coins. Count by what each is worth.
  - Add what each of the {n} coins is worth.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef shop needs coins. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How many cents are three nickels and two pennies?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- "Each coin is worth {value} cents" was wrong ({value} is all the coins together); the pet now speaks for itself in its reason.
- Tonight's question made shorter (90 characters at most, like the hand-written lessons).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "coins1",
 "t": "Pennies & Nickels",
 "grade": 1,
 "age": "little",
 "idea": "Add what each coin is worth, not how many coins.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Fill your coin purse. Use any coins you like!"
  ],
  "name": [
   "You chose {n} coins.",
   "They are worth {value} cents.",
   "Add what each coin is worth, not how many coins."
  ],
  "together": [
   "Put {value} cents in the purse. Biggest coins first.",
   "Look at the {n} coins. Count by what each is worth.",
   "Add what each of the {n} coins is worth."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The reef shop needs coins. How many cents?"
  ]
 },
 "reasons": {
  "count": [
   "I counted the coins. Add what each one is worth!"
  ]
 },
 "home": "Ask {name}: \"How many cents are three nickels and two pennies?\""
}
```

<details><summary>The API's first draft</summary>

```text
Pennies & Nickels (coins1), grade 1, the little pet
Idea: Add what each coin is worth, not how many coins.

Remember:
  - Do you remember this? Skip count by {k}.
Explore:
  - Fill your coin purse. Use any coins you like!
Name it:
  - You chose {n} coins.
  - Each coin is worth {value} cents.
  - Add what each coin is worth, not how many coins.
Together:
  - Put coins worth {value} cents in the purse.
  - How many cents for these {n} coins?
  - Add the values of these {n} coins.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The fish food needs these {n} coins. How many cents?
Reasons the pet gives when it is caught:
  count: You counted the coins instead of adding their values. | Look again. Add what each is worth.
Tonight's question: Ask {name}: "If I have three nickels and two pennies, how many cents do I have?"
About 3.3 minutes.
```

</details>
