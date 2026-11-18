# Draft: Times 11 & 12 (mfact5)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Times 11 & 12 (mfact5), grade 4, the kid pet
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Remember this one? What is {a} times {b}?
Explore:
  - Make a number with rods and cubes. Any way works.
Name it:
  - You made {n}. Now {b} groups of it.
  - The blocks show {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Build the groups and trade.
  - Now look at the picture and type what you get.
  - Now the symbols only. You know what to do.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The tower needs blocks for the top. How many?
Reasons the pet gives when it is caught:
  mcarry: I left out the ten from the trade.
  skip: One group too few. Count the groups again.
  tens0: I worked the tens part as ones.
Tonight's question: Ask {name}: "What is eleven times nine?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Tone lines the app says itself were in Remember, Explore, Together and Show; reasons spoke to the child.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "mfact5",
 "t": "Times 11 & 12",
 "grade": 4,
 "age": "kid",
 "idea": "Multiply each place then trade ten of a place for one of the next.",
 "beats": {
  "remember": [
   "Remember this one? What is {a} times {b}?"
  ],
  "explore": [
   "Make a number with rods and cubes. Any way works."
  ],
  "name": [
   "You made {n}. Now {b} groups of it.",
   "The blocks show {sum}.",
   "Multiply each place then trade ten of a place for one of the next."
  ],
  "together": [
   "Build the groups and trade.",
   "Now look at the picture and type what you get.",
   "Now the symbols only. You know what to do."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The tower needs blocks for the top. How many?"
  ]
 },
 "reasons": {
  "mcarry": [
   "I left out the ten from the trade."
  ],
  "skip": [
   "One group too few. Count the groups again."
  ],
  "tens0": [
   "I worked the tens part as ones."
  ]
 },
 "home": "Ask {name}: \"What is eleven times nine?\""
}
```

<details><summary>The API's first draft</summary>

```text
Times 11 & 12 (mfact5), grade 4, the kid pet
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Hey {name}. New idea today.
  - Remember this one? What is {a} times {b}?
Explore:
  - First show me what you already know.
  - Make a number with rods and cubes. Any way works.
Name it:
  - You made {n}. Now {b} groups of it.
  - The blocks show {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Now a few with me. Build the groups and trade.
  - Now look at the picture and type what you get.
  - Now the symbols only. You know what to do.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Looks like you know this. Prove it!
  - The tower needs blocks for the top. How many for {a} times {b}?
Reasons the pet gives when it is caught:
  mcarry: You left out the ten from the trade. Add it next time.
  skip: One group too few. Count the groups again.
  tens0: You worked the tens part as ones. Try it once more.
Tonight's question: Ask {name}: "What is eleven times nine?"
About 3.5 minutes.
```
</details>
