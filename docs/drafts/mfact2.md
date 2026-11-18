# Draft: Times 3 & 4 (mfact2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Times 3 & 4 (mfact2), grade 3, the kid pet
Idea: Rows times how many in each row.

Remember:
  - Remember this one? Count by {k}.
Explore:
  - Make any array you like with the steppers.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - It makes {sum} in all.
Together:
  - Build {a} rows of {b} here.
  - How many in all on this picture?
  - What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs blocks. {a} groups of {b}. How many?
  - The cave has {a} rows of {b} rocks. How many rocks?
Reasons the pet gives when it is caught:
  skip: One group too few. Count the groups again. | One group too many. Look closer at the rows.
  mulAdd: We multiply not add. Try again with the picture.
Tonight's question: Ask {name}: "What is four times six?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "mfact2",
 "t": "Times 3 & 4",
 "grade": 3,
 "age": "kid",
 "idea": "Rows times how many in each row.",
 "beats": {
  "remember": [
   "Remember this one? Count by {k}."
  ],
  "explore": [
   "Make any array you like with the steppers."
  ],
  "name": [
   "You made {a} rows of {b}.",
   "That is {a} times {b}.",
   "It makes {sum} in all."
  ],
  "together": [
   "Build {a} rows of {b} here.",
   "How many in all on this picture?",
   "What is {a} times {b}?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs blocks. {a} groups of {b}. How many?",
   "The cave has {a} rows of {b} rocks. How many rocks?"
  ]
 },
 "reasons": {
  "skip": [
   "One group too few. Count the groups again.",
   "One group too many. Look closer at the rows."
  ],
  "mulAdd": [
   "We multiply not add. Try again with the picture."
  ]
 },
 "home": "Ask {name}: \"What is four times six?\""
}
```
