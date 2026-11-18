# Draft: Times 6 to 9 (mfact3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Times 6 to 9 (mfact3), grade 3, the kid pet
Idea: Rows times how many in each row.

Remember:
  - Do you remember this? Count by {k}.
Explore:
  - Make any rows of dots. Use the steppers any way you like.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - {sum} in all.
Together:
  - Build {a} rows of {b} here.
  - How many in all?
  - What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs groups of rocks. How many in all?
  - The tower needs layers of blocks. How many in all?
Reasons the pet gives when it is caught:
  skip: One group too few. Count every row. | One group too many. Count every row.
  mulAdd: We multiply not add. Rows times in each row.
Tonight's question: Ask {name}: "What is six times eight?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "mfact3",
 "t": "Times 6 to 9",
 "grade": 3,
 "age": "kid",
 "idea": "Rows times how many in each row.",
 "beats": {
  "remember": [
   "Do you remember this? Count by {k}."
  ],
  "explore": [
   "Make any rows of dots. Use the steppers any way you like."
  ],
  "name": [
   "You made {a} rows of {b}.",
   "That is {a} times {b}.",
   "{sum} in all."
  ],
  "together": [
   "Build {a} rows of {b} here.",
   "How many in all?",
   "What is {a} times {b}?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs groups of rocks. How many in all?",
   "The tower needs layers of blocks. How many in all?"
  ]
 },
 "reasons": {
  "skip": [
   "One group too few. Count every row.",
   "One group too many. Count every row."
  ],
  "mulAdd": [
   "We multiply not add. Rows times in each row."
  ]
 },
 "home": "Ask {name}: \"What is six times eight?\""
}
```
