# Draft: Coordinate Grid (coord1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Coordinate Grid (coord1), grade 5, the teen pet
Idea: An ordered pair is across first, then up, both from zero.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Move point A anywhere on the grid.
Name it:
  - Your point is {x} across and {y} up.
  - So its pair is {x} then {y}.
  - Across first, then up, both counted from zero.
Together:
  - Go across first, then up. Place the point.
  - Read across first, then up.
  - No grid now. Picture the moves.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave map needs its points named. Read this one.
  - One more point for the map.
Reasons the pet gives when it is caught:
  swapXY: Oops. I went up first. Across comes first.
  gridOff: Oops. I started counting at one. The corner is zero.
Tonight's question: Ask {name} to mark (3, 5) on squared paper.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together 1 said the point's place ("across {x} and up {y}") and then the app says it again.
- A reason began "Fair." and told the child to fix it.
- Tonight's question was too long and used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "coord1",
 "t": "Coordinate Grid",
 "grade": 5,
 "age": "teen",
 "idea": "An ordered pair is across first, then up, both from zero.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Move point A anywhere on the grid."
  ],
  "name": [
   "Your point is {x} across and {y} up.",
   "So its pair is {x} then {y}.",
   "Across first, then up, both counted from zero."
  ],
  "together": [
   "Go across first, then up. Place the point.",
   "Read across first, then up.",
   "No grid now. Picture the moves."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The cave map needs its points named. Read this one.",
   "One more point for the map."
  ]
 },
 "reasons": {
  "swapXY": [
   "Oops. I went up first. Across comes first."
  ],
  "gridOff": [
   "Oops. I started counting at one. The corner is zero."
  ]
 },
 "home": "Ask {name} to mark (3, 5) on squared paper."
}
```

<details><summary>The API's first draft</summary>

```text
Coordinate Grid (coord1), grade 5, the teen pet
Idea: An ordered pair says across first then up from zero.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Move the point anywhere on the grid. Use the across and up controls.
Name it:
  - You placed it at across {x} and up {y}.
  - The ordered pair is {x} {y}.
  - Across first then up both from zero.
Together:
  - Place a point at across {x} and up {y}.
  - Read the point shown on the grid.
  - Move the point as I say then tell where it ends.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Help build the cave map. Read these points.
Reasons the pet gives when it is caught:
  swapXY: Look again. Across comes first in the pair. | Fair. I swapped across and up. Fix it.
  gridOff: Count from zero not from one on the lines. | I started at one. Check from zero.
Tonight's question: Ask {name}: "If a point is at across four up two what pair is it?"
About 3.4 minutes.
```

</details>
