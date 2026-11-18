# Draft: All Times Facts (mfact4)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
All Times Facts (mfact4), grade 3, the kid pet
Idea: Rows times how many in each row tells how many in all.

Remember:
  - Do you remember this? Count on by {k}.
Explore:
  - Make any array you like. Use the steppers any way that works.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - It has {sum} in all.
Together:
  - Build {a} rows of {b} on the array.
  - How many in all in this picture?
  - What does {a} times {b} equal?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs plants. Put in {a} rows of {b}. How many plants?
Reasons the pet gives when it is caught:
  skip: One group too few. Count every row again. | One group too many. Check each row.
  mulAdd: We multiply these numbers. Try again.
Tonight's question: Ask {name}: "What is six times seven?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "mfact4",
 "t": "All Times Facts",
 "grade": 3,
 "age": "kid",
 "idea": "Rows times how many in each row tells how many in all.",
 "beats": {
  "remember": [
   "Do you remember this? Count on by {k}."
  ],
  "explore": [
   "Make any array you like. Use the steppers any way that works."
  ],
  "name": [
   "You made {a} rows of {b}.",
   "That is {a} times {b}.",
   "It has {sum} in all."
  ],
  "together": [
   "Build {a} rows of {b} on the array.",
   "How many in all in this picture?",
   "What does {a} times {b} equal?"
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs plants. Put in {a} rows of {b}. How many plants?"
  ]
 },
 "reasons": {
  "skip": [
   "One group too few. Count every row again.",
   "One group too many. Check each row."
  ],
  "mulAdd": [
   "We multiply these numbers. Try again."
  ]
 },
 "home": "Ask {name}: \"What is six times seven?\""
}
```
