# Draft: Dimes Too (coins2)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Dimes Too (coins2), grade 2, the little pet
Idea: Add what each coin is worth, not how many coins.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Put any coins you like in the purse. Any way is fine!
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
  - The space station shop needs coins. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How much are a dime and two nickels?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- "Each coin is worth {value} cents" was wrong; a comma in the idea; quotes in tonight's question.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "coins2",
 "t": "Dimes Too",
 "grade": 2,
 "age": "little",
 "idea": "Add what each coin is worth, not how many coins.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Put any coins you like in the purse. Any way is fine!"
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
   "The space station shop needs coins. How many cents?"
  ]
 },
 "reasons": {
  "count": [
   "I counted the coins. Add what each one is worth!"
  ]
 },
 "home": "Ask {name}: \"How much are a dime and two nickels?\""
}
```

<details><summary>The API's first draft</summary>

```text
Dimes Too (coins2), grade 2, the little pet
Idea: Add what each coin is worth not how many coins.

Remember:
  - Do you remember this? Skip count by {k}.
Explore:
  - Put any coins you like in the purse. Any way is fine!
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
  - The space station needs supplies. Buy with these {n} coins.
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each is worth! | Count the value not the coins.
Tonight's question: Ask {name}: How much are a dime and two nickels?
About 3.3 minutes.
```

</details>
