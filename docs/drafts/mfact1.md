# Draft: Easy Times Facts (mfact1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Easy Times Facts (mfact1), grade 3, the kid pet
Idea: Rows times how many in each row.

Remember:
  - Remember this one? Count by {k}.
Explore:
  - Make any array you like with the steppers.
Name it:
  - You made {a} rows of {b}.
  - That makes {sum} in all.
  - Rows times how many in each row.
Together:
  - Build {a} rows of {b} on the array.
  - How many in all in this picture?
  - Now the fact in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs groups of rocks. How many in all?
  - The tower needs layers of blocks. How many in all?
Reasons the pet gives when it is caught:
  skip: One group too many. Count the rows again. | One group too few. Check the rows.
  mulAdd: That adds the numbers. We multiply them.
Tonight's question: Ask {name}: How many are in four rows of five?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "mfact1",
 "t": "Easy Times Facts",
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
   "That makes {sum} in all.",
   "Rows times how many in each row."
  ],
  "together": [
   "Build {a} rows of {b} on the array.",
   "How many in all in this picture?",
   "Now the fact in symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs groups of rocks. How many in all?",
   "The tower needs layers of blocks. How many in all?"
  ]
 },
 "reasons": {
  "skip": [
   "One group too many. Count the rows again.",
   "One group too few. Check the rows."
  ],
  "mulAdd": [
   "That adds the numbers. We multiply them."
  ]
 },
 "home": "Ask {name}: How many are in four rows of five?"
}
```
