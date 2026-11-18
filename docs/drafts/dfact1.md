# Draft: Easy Dividing (dfact1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Easy Dividing (dfact1), grade 3, the kid pet
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Make an array with all the dots. Any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - Build rows of {b} with all {n} dots.
  - How many rows from {n} dots in rows of {b}?
  - Write the division for {n} dots in rows of {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - Share {n} leaves into bags of {b}. How many bags?
Reasons the pet gives when it is caught:
  fact: Look closer. That is a neighbor fact. | Try again. One group too many or too few.
  given: That number is already there. Use the dots to find a new one.
Tonight's question: Ask {name}: How many bags from 20 apples if each holds 5?
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "dfact1",
 "t": "Easy Dividing",
 "grade": 3,
 "age": "kid",
 "idea": "Dividing finds how many rows or how many in each row.",
 "beats": {
  "remember": [
   "Do you remember this one? What is {a} times {b}?"
  ],
  "explore": [
   "Make an array with all the dots. Any way you like."
  ],
  "name": [
   "You made {n} dots in {a} rows of {b}.",
   "Dividing finds how many rows or how many in each row."
  ],
  "together": [
   "Build rows of {b} with all {n} dots.",
   "How many rows from {n} dots in rows of {b}?",
   "Write the division for {n} dots in rows of {b}."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs {n} stones set in groups of {b}. How many groups?",
   "Share {n} leaves into bags of {b}. How many bags?"
  ]
 },
 "reasons": {
  "fact": [
   "Look closer. That is a neighbor fact.",
   "Try again. One group too many or too few."
  ],
  "given": [
   "That number is already there. Use the dots to find a new one."
  ]
 },
 "home": "Ask {name}: How many bags from 20 apples if each holds 5?"
}
```
