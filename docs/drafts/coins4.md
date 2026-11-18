# Draft: Dollars & Coins (coins4)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Dollars & Coins (coins4), grade 2, the little pet
Idea: A dollar is worth a hundred cents.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill your purse with any coins you like.
Name it:
  - You chose {n} coins.
  - They are worth {value} cents.
  - A dollar is worth a hundred cents.
Together:
  - Put {value} cents in the purse. Biggest coins first.
  - Look at the money. Count the dollar first.
  - Add what each one is worth.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs money for the trip. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How much is a quarter, a dime and a nickel?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea now says what this stop adds (the dollar); "Each coin is worth {value} cents" was wrong; the Show line asked nothing.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "coins4",
 "t": "Dollars & Coins",
 "grade": 2,
 "age": "little",
 "idea": "A dollar is worth a hundred cents.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Fill your purse with any coins you like."
  ],
  "name": [
   "You chose {n} coins.",
   "They are worth {value} cents.",
   "A dollar is worth a hundred cents."
  ],
  "together": [
   "Put {value} cents in the purse. Biggest coins first.",
   "Look at the money. Count the dollar first.",
   "Add what each one is worth."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The ship needs money for the trip. How many cents?"
  ]
 },
 "reasons": {
  "count": [
   "I counted the coins. Add what each one is worth!"
  ]
 },
 "home": "Ask {name}: \"How much is a quarter, a dime and a nickel?\""
}
```

<details><summary>The API's first draft</summary>

```text
Dollars & Coins (coins4), grade 2, the little pet
Idea: Add what each coin is worth not how many coins.

Remember:
  - Do you remember this? Skip count by {k}.
Explore:
  - Fill your purse with any coins you like.
Name it:
  - You chose {n} coins.
  - Each coin is worth {value} cents.
  - Add what each coin is worth not how many coins.
Together:
  - Put coins worth {value} cents in the purse.
  - Look at these {n} coins. How many cents?
  - Add the values of these {n} coins.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs coins. Here are {n} coins.
Reasons the pet gives when it is caught:
  count: I counted the coins instead of adding their values. | Count the value of each coin.
Tonight's question: Ask {name}: How much is a quarter a dime and a nickel?
About 3.3 minutes.
```

</details>
