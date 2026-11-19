# Draft: Mixed Numbers (fop4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Mixed Numbers (fop4), grade 5, the teen pet
Idea: Work the parts, then the wholes. Trade or break a whole when you need to.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - Make any mixed number with whole bars and parts.
Name it:
  - Whole bars: {a}. Parts: {b}.
  - Enough parts make a whole. Trade them.
  - Not enough parts? Break a whole into parts.
Together:
  - Build the answer with the bars. Trade or break a whole as you go.
  - Look at the bars. Work the parts first, then the wholes.
  - Symbols only now. Parts first, then wholes.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave crew is cutting crystal rods. Work this one out.
  - One more for the cave crew.
Reasons the pet gives when it is caught:
  mixSub: Oops. I took the small part from the big one. I should break a whole.
  addBot: Oops. I added the bottom numbers. The part size stays the same.
Tonight's question: Ask {name}: "What is 3 1/4 take away 1 3/4?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "{b} fourths" (a number word; the parts are fourths only in Explore).
- Show lines said "Add" and "Take away" (Show items may be either).
- The reasons were untrue ("The parts stay bigger than the whole", "Not both at once").
- Tonight's question was about drawing fourths, not adding mixed numbers.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop4",
 "t": "Mixed Numbers",
 "grade": 5,
 "age": "teen",
 "idea": "Work the parts, then the wholes. Trade or break a whole when you need to.",
 "beats": {
  "remember": [
   "Quick warm-up. Name the shaded fraction."
  ],
  "explore": [
   "Make any mixed number with whole bars and parts."
  ],
  "name": [
   "Whole bars: {a}. Parts: {b}.",
   "Enough parts make a whole. Trade them.",
   "Not enough parts? Break a whole into parts."
  ],
  "together": [
   "Build the answer with the bars. Trade or break a whole as you go.",
   "Look at the bars. Work the parts first, then the wholes.",
   "Symbols only now. Parts first, then wholes."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The cave crew is cutting crystal rods. Work this one out.",
   "One more for the cave crew."
  ]
 },
 "reasons": {
  "mixSub": [
   "Oops. I took the small part from the big one. I should break a whole."
  ],
  "addBot": [
   "Oops. I added the bottom numbers. The part size stays the same."
  ]
 },
 "home": "Ask {name}: \"What is 3 1/4 take away 1 3/4?\""
}
```

<details><summary>The API's first draft</summary>

```text
Mixed Numbers (fop4), grade 5, the teen pet
Idea: Add or take away the parts then the wholes. Trade parts for a whole or break a whole when needed.

Remember:
  - Do you remember this? Name the shaded fraction.
Explore:
  - Use the bars and steppers. Make any mixed number you like. Trade or break a whole any way.
Name it:
  - You made {a} and {b} fourths.
  - Add or take away the parts then the wholes.
  - Trade parts for a whole or break a whole when needed.
Together:
  - Build the answer with bars. Trade or break a whole as you need.
  - Look at this picture of bars. Type the mixed number.
  - Now the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The cave needs more light crystals. Add the mixed numbers.
  - The tunnel is too long. Take away the mixed numbers.
Reasons the pet gives when it is caught:
  mixSub: The parts stay bigger than the whole. Break a whole to make more parts. | Compare these. The parts must be smaller than the whole.
  addBot: We add only the parts or only the wholes. Not both at once. | Picture it first. Add the parts then the wholes.
Tonight's question: Ask {name}: "Can you draw a bar split into fourths and color five parts?"
About 3.5 minutes.
```

</details>
