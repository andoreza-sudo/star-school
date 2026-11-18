# Draft: Divide by 3 & 4 (dfact2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Divide by 3 & 4 (dfact2), grade 3, the kid pet
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array of {n} dots any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - Put {n} dots in rows of {b}.
  - How many rows of {b} fit in {n}?
  - Now write the division for {n} divided by {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - The cave has {n} gems to share in bags of {b}. How many bags?
Reasons the pet gives when it is caught:
  fact: Look closer. I slipped. | That is a close fact but not the right one.
  given: I said the number I could see. Look at the full set.
Tonight's question: Ask {name}: How many groups of four do you see around the house?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- A tone line the app says itself was in Remember.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "dfact2",
 "t": "Divide by 3 & 4",
 "grade": 3,
 "age": "kid",
 "idea": "Dividing finds how many rows or how many in each row.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Make an array of {n} dots any way you like."
  ],
  "name": [
   "You made {n} dots in {a} rows of {b}.",
   "Dividing finds how many rows or how many in each row."
  ],
  "together": [
   "Put {n} dots in rows of {b}.",
   "How many rows of {b} fit in {n}?",
   "Now write the division for {n} divided by {b}."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs {n} stones set in groups of {b}. How many groups?",
   "The cave has {n} gems to share in bags of {b}. How many bags?"
  ]
 },
 "reasons": {
  "fact": [
   "Look closer. I slipped.",
   "That is a close fact but not the right one."
  ],
  "given": [
   "I said the number I could see. Look at the full set."
  ]
 },
 "home": "Ask {name}: How many groups of four do you see around the house?"
}
```

<details><summary>The API's first draft</summary>

```text
Divide by 3 & 4 (dfact2), grade 3, the kid pet
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Hey {name}. New idea today.
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array of {n} dots any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - Put {n} dots in rows of {b}.
  - How many rows of {b} fit in {n}?
  - Now write the division for {n} divided by {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - The cave has {n} gems to share in bags of {b}. How many bags?
Reasons the pet gives when it is caught:
  fact: Look closer. I slipped. | That is a close fact but not the right one.
  given: I said the number I could see. Look at the full set.
Tonight's question: Ask {name}: How many groups of four do you see around the house?
About 3.5 minutes.
```
</details>
