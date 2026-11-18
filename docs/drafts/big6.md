# Draft: Add 4-Digit Numbers (big6)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Add 4-Digit Numbers (big6), grade 4, the kid pet
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this one? Make the number {n} with blocks.
Explore:
  - Make any number on the chart. Use the thousands too. Any way works.
Name it:
  - You made the number {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones. Trade when a place needs it.
Together:
  - Both numbers are on the chart. Add from the ones.
  - Here they are in columns. Add from the ones.
  - Now the problem in a row.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory counts loads of parts. How many in all?
  - One more order. Add the loads.
Reasons the pet gives when it is caught:
  nocarry: The ten from the ones is missing. Add it to the next place.
  cat: The places got mixed. Add each column and trade the ten up.
  slip: Good catch. I slipped there. | Look closer. I slipped.
Tonight's question: Ask {name}: "What is 2,475 plus 1,368?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "{a} places" ({a} is no number there); Together said "these {a} numbers" ({a} is the first number); a Show line used {a} as a count of crates; tonight's question was too long.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "big6",
 "t": "Add 4-Digit Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Line up the places. Work from the ones. Trade when a place needs it.",
 "beats": {
  "remember": [
   "Do you remember this one? Make the number {n} with blocks."
  ],
  "explore": [
   "Make any number on the chart. Use the thousands too. Any way works."
  ],
  "name": [
   "You made the number {n}.",
   "Its thousands digit is {a}.",
   "Line up the places. Work from the ones. Trade when a place needs it."
  ],
  "together": [
   "Both numbers are on the chart. Add from the ones.",
   "Here they are in columns. Add from the ones.",
   "Now the problem in a row."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory counts loads of parts. How many in all?",
   "One more order. Add the loads."
  ]
 },
 "reasons": {
  "nocarry": [
   "The ten from the ones is missing. Add it to the next place."
  ],
  "cat": [
   "The places got mixed. Add each column and trade the ten up."
  ],
  "slip": [
   "Good catch. I slipped there.",
   "Look closer. I slipped."
  ]
 },
 "home": "Ask {name}: \"What is 2,475 plus 1,368?\""
}
```

<details><summary>The API's first draft</summary>

```text
Add 4-Digit Numbers (big6), grade 4, the kid pet
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this one? Make the number {n} with blocks.
Explore:
  - Make any number with {a} places on the chart. Use the steppers. Any way works.
Name it:
  - You made the number {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones. Trade when a place needs it.
Together:
  - We add these {a} numbers. Watch the places.
  - Here they are in columns. Watch me add.
  - Now the problem in a row. Watch how I add.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs {a} crates filled. Add the big numbers to find how many parts.
  - One more job. Add these to finish the order.
Reasons the pet gives when it is caught:
  nocarry: The ten from the ones is missing. Add it to the next place.
  cat: The places got mixed. Add each column and trade the ten up.
  slip: Good catch. I slipped there. | Look closer. I slipped.
Tonight's question: Ask {name}: "What is two thousand four hundred fifty six plus one thousand seven hundred eighty nine?"
About 3.5 minutes.
```
</details>
