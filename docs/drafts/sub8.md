# Draft: Take Away Big Numbers (sub8)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Take Away Big Numbers (sub8), grade 4, the kid pet
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this? Make the number {n} with blocks.
Explore:
  - Make any number on the chart. Use the thousands too. Any way you like.
Name it:
  - You made {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones and trade when needed.
Together:
  - We take away on the chart. Watch each trade.
  - Now we take away in columns. Watch each trade.
  - Now we take away in a row. Watch each trade.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory had {a} parts and used {b}. How many are left?
  - One more job. Take {b} away from {a}.
Reasons the pet gives when it is caught:
  col: We trade when the top digit is too small. | Take from the next place and trade for ten ones.
  keep: I borrowed a ten but did not take it from the tens place. | Remember to take one from the tens when you borrow.
  slip: Look closer at that step. One is off. | Good catch. I slipped there.
Tonight's question: Ask {name}: What is 452 minus 178?
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore had a number word ("four digit"); the Show lines had the numbers the wrong way round ("take away {a} from {b}").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sub8",
 "t": "Take Away Big Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Line up the places. Work from the ones. Trade when a place needs it.",
 "beats": {
  "remember": [
   "Do you remember this? Make the number {n} with blocks."
  ],
  "explore": [
   "Make any number on the chart. Use the thousands too. Any way you like."
  ],
  "name": [
   "You made {n}.",
   "Its thousands digit is {a}.",
   "Line up the places. Work from the ones and trade when needed."
  ],
  "together": [
   "We take away on the chart. Watch each trade.",
   "Now we take away in columns. Watch each trade.",
   "Now we take away in a row. Watch each trade."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory had {a} parts and used {b}. How many are left?",
   "One more job. Take {b} away from {a}."
  ]
 },
 "reasons": {
  "col": [
   "We trade when the top digit is too small.",
   "Take from the next place and trade for ten ones."
  ],
  "keep": [
   "I borrowed a ten but did not take it from the tens place.",
   "Remember to take one from the tens when you borrow."
  ],
  "slip": [
   "Look closer at that step. One is off.",
   "Good catch. I slipped there."
  ]
 },
 "home": "Ask {name}: What is 452 minus 178?"
}
```

<details><summary>The API's first draft</summary>

```text
Take Away Big Numbers (sub8), grade 4, the kid pet
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this? Make the number {n} with blocks.
Explore:
  - Make any four digit number on the place value chart. Any way you like.
Name it:
  - You made {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones and trade when needed.
Together:
  - We take away on the chart. Watch each trade.
  - Now we take away in columns. Watch each trade.
  - Now we take away in a row. Watch each trade.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs supplies. Take away {a} from {b} to find out how many are left.
  - One more job. Take away {a} from {b} to find out how many are left.
Reasons the pet gives when it is caught:
  col: We trade when the top digit is too small. | Take from the next place and trade for ten ones.
  keep: We borrowed a ten but did not take it from the tens place. | Remember to take one from the tens when you borrow.
  slip: Look closer at that step. One is off. | Good catch. I slipped there.
Tonight's question: Ask {name}: What is 452 minus 178?
About 3.5 minutes.
```
</details>
