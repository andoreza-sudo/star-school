# Draft: Integer Add & Subtract (int3)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Integer Add & Subtract (int3), grade 6, the teen pet
Idea: Adding moves right on the line; taking away, or adding a negative, moves left.

Remember:
  - A times fact from before.
Explore:
  - Start at the mark. Move the dot anywhere and watch the hop.
Name it:
  - You moved {n} steps and landed on {x}.
  - Right is adding, left is taking away.
  - Adding a negative number moves left too.
Together:
  - Start at the first number, then move the dot.
  - Start at the mark and count the steps in your head.
  - Picture the line: which way, and how far?
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The tower lift goes above and below the ground. Track it.
Reasons the pet gives when it is caught:
  negDir: I moved the wrong way on the line. Check the sign first.
  negIgn: I dropped the minus sign of the start number.
Tonight's question: Ask {name}: "It is -4 degrees, then 9 degrees warmer. What now?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "Start at negative {x}" (a slot Explore does not have, and the start is fixed).
- Both reasons were "Look again. That one was wrong." (the engine's own line) and a fragment.
- Show said "Figure both ways", which is not what Show asks.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "int3",
 "t": "Integer Add & Subtract",
 "grade": 6,
 "age": "teen",
 "idea": "Adding moves right on the line; taking away, or adding a negative, moves left.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Start at the mark. Move the dot anywhere and watch the hop."
  ],
  "name": [
   "You moved {n} steps and landed on {x}.",
   "Right is adding, left is taking away.",
   "Adding a negative number moves left too."
  ],
  "together": [
   "Start at the first number, then move the dot.",
   "Start at the mark and count the steps in your head.",
   "Picture the line: which way, and how far?"
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The tower lift goes above and below the ground. Track it."
  ]
 },
 "reasons": {
  "negDir": [
   "I moved the wrong way on the line. Check the sign first."
  ],
  "negIgn": [
   "I dropped the minus sign of the start number."
  ]
 },
 "home": "Ask {name}: \"It is -4 degrees, then 9 degrees warmer. What now?\""
}
```

<details><summary>The API's first draft</summary>

```text
Integer Add & Subtract (int3), grade 6, the teen pet
Idea: Adding moves right. Taking away moves left. Adding a negative moves left too.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Start at negative {x}. Move the dot any way you like.
Name it:
  - You landed at {x} after {n} steps.
  - Adding moves right. Taking away moves left.
  - Adding a negative number moves left too.
Together:
  - Start here and move by that amount.
  - Where do you land on the line?
  - Now try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The tower lift needs to move up and down to reach every floor. Figure both ways.
Reasons the pet gives when it is caught:
  negDir: Look again. That one was wrong. | Moving the wrong way on the line.
  negIgn: Look again. That one was wrong. | The sign matters.
Tonight's question: Ask {name}: "Start at five. Add negative three. Where do we land?"
About 3.4 minutes.
```

</details>
