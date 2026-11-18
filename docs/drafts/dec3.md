# Draft: Add/Subtract Decimals (dec3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Add/Subtract Decimals (dec3), grade 5, the teen pet
Idea: Line up the points.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the place value chart. Make any number you like.
Name it:
  - You made {n}.
  - A whole number has its point at the end.
  - Line up the points.
Together:
  - We add these. Line up the points first.
  - Now in columns with the points lined up.
  - Now the symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs these amounts mixed. How much in all?
  - The lab needs these amounts mixed. How much in all?
Reasons the pet gives when it is caught:
  point: The points must line up in a column.
  slip: Look again. That one was wrong.
Tonight's question: Ask {name}: "What is 3.25 plus 4.7?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "dec3",
 "t": "Add/Subtract Decimals",
 "grade": 5,
 "age": "teen",
 "idea": "Line up the points.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Use the place value chart. Make any number you like."
  ],
  "name": [
   "You made {n}.",
   "A whole number has its point at the end.",
   "Line up the points."
  ],
  "together": [
   "We add these. Line up the points first.",
   "Now in columns with the points lined up.",
   "Now the symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab needs these amounts mixed. How much in all?",
   "The lab needs these amounts mixed. How much in all?"
  ]
 },
 "reasons": {
  "point": [
   "The points must line up in a column."
  ],
  "slip": [
   "Look again. That one was wrong."
  ]
 },
 "home": "Ask {name}: \"What is 3.25 plus 4.7?\""
}
```
