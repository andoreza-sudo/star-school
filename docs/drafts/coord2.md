# Draft: Four Quadrants (coord2)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Four Quadrants (coord2), grade 6, the teen pet
Idea: Across first, then up; left of zero and below zero are negative.

Remember:
  - A times fact from before.
Explore:
  - Move point A anywhere, into any quadrant.
Name it:
  - Your point is {x} across and {y} up.
  - The signs of the numbers tell the quadrant.
  - Across first, then up; left and down are negative.
Together:
  - Across first, then up. Watch the minus signs.
  - Count from zero along the axis to read it.
  - Picture the grid: which way does each sign point?
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - Read these points off the star map.
Reasons the pet gives when it is caught:
  signFlip: I dropped a minus sign. Left and down are negative.
  swapXY: I read up before across. Across comes first.
Tonight's question: Ask {name}: "Which quadrant is (-2, 3) in?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "across {x} and up {y}" as one run; Together line 1 "Now we use negative numbers too" did not say what to do.
- Reasons were fragments ("Check the sign on each number."); they are now the pet's slip.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "coord2",
 "t": "Four Quadrants",
 "grade": 6,
 "age": "teen",
 "idea": "Across first, then up; left of zero and below zero are negative.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Move point A anywhere, into any quadrant."
  ],
  "name": [
   "Your point is {x} across and {y} up.",
   "The signs of the numbers tell the quadrant.",
   "Across first, then up; left and down are negative."
  ],
  "together": [
   "Across first, then up. Watch the minus signs.",
   "Count from zero along the axis to read it.",
   "Picture the grid: which way does each sign point?"
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "Read these points off the star map."
  ]
 },
 "reasons": {
  "signFlip": [
   "I dropped a minus sign. Left and down are negative."
  ],
  "swapXY": [
   "I read up before across. Across comes first."
  ]
 },
 "home": "Ask {name}: \"Which quadrant is (-2, 3) in?\""
}
```

<details><summary>The API's first draft</summary>

```text
Four Quadrants (coord2), grade 6, the teen pet
Idea: Across first then up. Signs tell the quadrant.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Move the point anywhere on the grid. Try all sides.
Name it:
  - You put it at across {x} and up {y}.
  - Across first then up. Left of zero and below zero are negative.
  - The signs show which quadrant.
Together:
  - Now we use negative numbers too.
  - Read one number of this point.
  - Tell the quadrant or the reflection in words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Find these points in the space station map.
Reasons the pet gives when it is caught:
  signFlip: The sign shows the direction from zero. | Check the sign on each number.
  swapXY: Across first then up. | The first number is across.
Tonight's question: Ask {name}: "A point is at across five up negative three. Which quadrant?"
About 3.3 minutes.
```

</details>
