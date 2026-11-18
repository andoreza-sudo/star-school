# Draft: All Dividing (dfact4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
All Dividing (dfact4), grade 3, the kid pet
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Make an array of {n} dots. Any way you like!
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - We have {n} dots to put in rows of {b}.
  - Look at the picture. How many rows?
  - Write the division for this array.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - The den has {n} nuts to share in {b} bags. How many in each bag?
Reasons the pet gives when it is caught:
  fact: Look closer. That is a near fact. Count the rows again.
  given: I said a number I could see. Count the rows instead.
Tonight's question: Ask {name}: "We have 24 flowers. How many rows of 6?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The "given" reason said "Count the empty rows!", which means nothing on an array.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "dfact4",
 "t": "All Dividing",
 "grade": 3,
 "age": "kid",
 "idea": "Dividing finds how many rows or how many in each row.",
 "beats": {
  "remember": [
   "Do you remember this one? What is {a} times {b}?"
  ],
  "explore": [
   "Make an array of {n} dots. Any way you like!"
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
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs {n} stones set in groups of {b}. How many groups?",
   "The den has {n} nuts to share in {b} bags. How many in each bag?"
  ]
 },
 "reasons": {
  "fact": [
   "Look closer. That is a near fact. Count the rows again."
  ],
  "given": [
   "I said a number I could see. Count the rows instead."
  ]
 },
 "home": "Ask {name}: \"We have 24 flowers. How many rows of 6?\""
}
```

<details><summary>The API's first draft</summary>

```text
All Dividing (dfact4), grade 3, the kid pet
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Make an array of {n} dots. Any way you like!
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - We have {n} dots to put in rows of {b}.
  - Look at the picture. How many rows?
  - Write the division for this array.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - The den has {n} nuts to share in {b} bags. How many in each bag?
Reasons the pet gives when it is caught:
  fact: Look closer. That is a near fact. Count the rows again.
  given: I said the number I could see. Count the empty rows!
Tonight's question: Ask {name}: "We have 24 flowers. How many rows of 6?"
About 3.4 minutes.
```
</details>
