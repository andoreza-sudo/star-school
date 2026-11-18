# Draft: Divide by 6 to 9 (dfact3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Divide by 6 to 9 (dfact3), grade 3, the kid pet
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this fact? What is {a} times {b}?
Explore:
  - Make an array of {n} dots any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - We have {n} dots to put in rows of {b}.
  - Look at the picture. How many rows?
  - Write the division for this array.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones in groups of {b}. How many groups?
  - The cave has {n} gems to share in piles of {b}. How many piles?
Reasons the pet gives when it is caught:
  fact: Look closer. I slipped there. | One group too many or too few.
  given: I said the number I could see. | Count all the dots to start.
Tonight's question: Ask {name}: How many in each if we share 24 flowers in 8 vases?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "dfact3",
 "t": "Divide by 6 to 9",
 "grade": 3,
 "age": "kid",
 "idea": "Dividing finds how many rows or how many in each row.",
 "beats": {
  "remember": [
   "Do you remember this fact? What is {a} times {b}?"
  ],
  "explore": [
   "Make an array of {n} dots any way you like."
  ],
  "name": [
   "You made {n} dots in {a} rows of {b}.",
   "Dividing finds how many rows or how many in each row."
  ],
  "together": [
   "We have {n} dots to put in rows of {b}.",
   "Look at the picture. How many rows?",
   "Write the division for this array."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs {n} stones in groups of {b}. How many groups?",
   "The cave has {n} gems to share in piles of {b}. How many piles?"
  ]
 },
 "reasons": {
  "fact": [
   "Look closer. I slipped there.",
   "One group too many or too few."
  ],
  "given": [
   "I said the number I could see.",
   "Count all the dots to start."
  ]
 },
 "home": "Ask {name}: How many in each if we share 24 flowers in 8 vases?"
}
```
