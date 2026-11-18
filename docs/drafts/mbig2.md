# Draft: 2-Digit Times 1-Digit (mbig2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
2-Digit Times 1-Digit (mbig2), grade 4, the kid pet
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build any number with rods and cubes. I will tell you what that many groups make.
Name it:
  - You built {n}. We made {b} groups.
  - That gives us {sum} in all.
  - Multiply each place then trade ten for one of the next.
Together:
  - Let's build every group. Trade ten for one of the next place.
  - Now look at the picture. What is the product?
  - Here is the problem in symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory packs {a} boxes with {b} toys each. How many toys?
Reasons the pet gives when it is caught:
  mcarry: I forgot to add the ten from the ones place.
  tens0: I worked the tens part as ones.
  slip: Look closer. I slipped there.
Tonight's question: Ask {name}: "What is 24 times 3?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "mbig2",
 "t": "2-Digit Times 1-Digit",
 "grade": 4,
 "age": "kid",
 "idea": "Multiply each place then trade ten of a place for one of the next.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Build any number with rods and cubes. I will tell you what that many groups make."
  ],
  "name": [
   "You built {n}. We made {b} groups.",
   "That gives us {sum} in all.",
   "Multiply each place then trade ten for one of the next."
  ],
  "together": [
   "Let's build every group. Trade ten for one of the next place.",
   "Now look at the picture. What is the product?",
   "Here is the problem in symbols only."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory packs {a} boxes with {b} toys each. How many toys?"
  ]
 },
 "reasons": {
  "mcarry": [
   "I forgot to add the ten from the ones place."
  ],
  "tens0": [
   "I worked the tens part as ones."
  ],
  "slip": [
   "Look closer. I slipped there."
  ]
 },
 "home": "Ask {name}: \"What is 24 times 3?\""
}
```
