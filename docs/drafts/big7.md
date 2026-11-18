# Draft: Add Big Numbers (big7)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Add Big Numbers (big7), grade 4, the kid pet
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this one? Make the number {n} with blocks.
Explore:
  - Make any number on the chart. Use the thousands too. Any way you like.
Name it:
  - You made {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones. Trade when needed.
Together:
  - Let's add these on the chart. Type the total.
  - Now add these in columns. Type the total.
  - Now add these written in a row. Type the total.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory adds big orders. Find the total.
  - One more job. Add to find the total parts.
Reasons the pet gives when it is caught:
  nocarry: The ten from the ones needs to go to the tens place.
  cat: We add each place then trade. Do not write them side by side.
  slip: Look closer. One place is off by a ten.
Tonight's question: Ask {name}: What is 456 plus 278?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore had a number word ("four digit"); a Show line used {a} as a count of boxes ({a} is the first number).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "big7",
 "t": "Add Big Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Line up the places. Work from the ones. Trade when a place needs it.",
 "beats": {
  "remember": [
   "Do you remember this one? Make the number {n} with blocks."
  ],
  "explore": [
   "Make any number on the chart. Use the thousands too. Any way you like."
  ],
  "name": [
   "You made {n}.",
   "Its thousands digit is {a}.",
   "Line up the places. Work from the ones. Trade when needed."
  ],
  "together": [
   "Let's add these on the chart. Type the total.",
   "Now add these in columns. Type the total.",
   "Now add these written in a row. Type the total."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory adds big orders. Find the total.",
   "One more job. Add to find the total parts."
  ]
 },
 "reasons": {
  "nocarry": [
   "The ten from the ones needs to go to the tens place."
  ],
  "cat": [
   "We add each place then trade. Do not write them side by side."
  ],
  "slip": [
   "Look closer. One place is off by a ten."
  ]
 },
 "home": "Ask {name}: What is 456 plus 278?"
}
```

<details><summary>The API's first draft</summary>

```text
Add Big Numbers (big7), grade 4, the kid pet
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this one? Make the number {n} with blocks.
Explore:
  - Make any four digit number on the place value chart. Any way you like.
Name it:
  - You made {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones. Trade when needed.
Together:
  - Let's add these on the chart. Type the total.
  - Now add these in columns. Type the total.
  - Now add these written in a row. Type the total.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs parts from {a} boxes. Add to find the total.
  - One more job. Add to find the total parts.
Reasons the pet gives when it is caught:
  nocarry: The ten from the ones needs to go to the tens place.
  cat: We add each place then trade. Do not write them side by side.
  slip: Look closer. One place is off by a ten.
Tonight's question: Ask {name}: What is 456 plus 278?
About 3.5 minutes.
```
</details>
