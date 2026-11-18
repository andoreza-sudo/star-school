# Draft: Making Change (coins5)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Making Change (coins5), grade 2, the little pet
Idea: Change is what is left of a dollar after the price.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill your purse with any coins you like.
Name it:
  - You chose coins worth {value} cents.
  - You used {n} coins.
  - Change is what is left of a dollar after the price.
Together:
  - It costs {a} cents. Count up to a dollar.
  - It costs {a} cents. You pay a dollar.
  - A dollar is a hundred cents. Take away the price.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The shell shop gives change. How much?
  - The boat shop gives change too. How much?
Reasons the pet gives when it is caught:
  col: I took the small from the big. Top take away bottom!
  keep: I borrowed a ten but did not take it away.
Tonight's question: Ask {name}: "If a toy costs 65 cents, how much change from a dollar?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 2 did not fit; the Show lines repeated the price the app says next; the "col" reason matches the other lessons.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "coins5",
 "t": "Making Change",
 "grade": 2,
 "age": "little",
 "idea": "Change is what is left of a dollar after the price.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Fill your purse with any coins you like."
  ],
  "name": [
   "You chose coins worth {value} cents.",
   "You used {n} coins.",
   "Change is what is left of a dollar after the price."
  ],
  "together": [
   "It costs {a} cents. Count up to a dollar.",
   "It costs {a} cents. You pay a dollar.",
   "A dollar is a hundred cents. Take away the price."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The shell shop gives change. How much?",
   "The boat shop gives change too. How much?"
  ]
 },
 "reasons": {
  "col": [
   "I took the small from the big. Top take away bottom!"
  ],
  "keep": [
   "I borrowed a ten but did not take it away."
  ]
 },
 "home": "Ask {name}: \"If a toy costs 65 cents, how much change from a dollar?\""
}
```

<details><summary>The API's first draft</summary>

```text
Making Change (coins5), grade 2, the little pet
Idea: Change from a dollar is what is left after the price.

Remember:
  - Do you remember this? Skip count by {k}.
Explore:
  - Fill your purse with any coins you like.
Name it:
  - You chose coins worth {value} cents.
  - You used {n} coins.
  - Change is what is left of a dollar after the price.
Together:
  - We buy something that costs {a} cents.
  - How much change from a dollar?
  - A dollar is a hundred cents. Take away the price.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The shell costs {a} cents. How much change from a dollar?
  - The boat costs {a} cents. How much change from a dollar?
Reasons the pet gives when it is caught:
  col: Look again. I took the smaller from the bigger in each column.
  keep: I borrowed a ten but did not take it from the tens.
Tonight's question: Ask {name}: "If a toy costs 65 cents, how much change from a dollar?"
About 3.4 minutes.
```

</details>
