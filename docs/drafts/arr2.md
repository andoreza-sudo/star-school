# Draft: Arrays (arr2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Arrays (arr2), grade 3, the kid pet
Idea: Rows times how many in each row.

Remember:
  - Remember this one? Count by {k}.
Explore:
  - Make any array you like with the steppers.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - It makes {sum} in all.
  - Rows times how many in each row.
Together:
  - Build {a} rows of {b} in the array.
  - How many in all in this picture?
  - What does {a} times {b} equal?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs groups of rocks. How many for {a} groups of {b}?
  - The tower needs layers of blocks. How many for {a} layers of {b}?
Reasons the pet gives when it is caught:
  skip: One group too many. Count the rows again. | One group too few. Check the rows.
  mulAdd: That adds the numbers. Multiply them instead.
Tonight's question: Ask {name}: "We plant 4 rows with 6 in each. How many in all?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "arr2",
 "t": "Arrays",
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
   "It makes {sum} in all.",
   "Rows times how many in each row."
  ],
  "together": [
   "Build {a} rows of {b} in the array.",
   "How many in all in this picture?",
   "What does {a} times {b} equal?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs groups of rocks. How many for {a} groups of {b}?",
   "The tower needs layers of blocks. How many for {a} layers of {b}?"
  ]
 },
 "reasons": {
  "skip": [
   "One group too many. Count the rows again.",
   "One group too few. Check the rows."
  ],
  "mulAdd": [
   "That adds the numbers. Multiply them instead."
  ]
 },
 "home": "Ask {name}: \"We plant 4 rows with 6 in each. How many in all?\""
}
```
