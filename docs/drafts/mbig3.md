# Draft: Big Times 1-Digit (mbig3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Big Times 1-Digit (mbig3), grade 4, the kid pet
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Remember this one? What is {a} times {b}?
Explore:
  - Make any number with the blocks. Any way works.
Name it:
  - You made {n}.
  - {b} groups of {n} is {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Build every group then trade.
  - Look at the picture. Type what it shows.
  - Now the symbols only. What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - In the factory we need parts. How many for {a} times {b}?
  - One more job. What is {a} times {b}?
Reasons the pet gives when it is caught:
  mcarry: I left out the ten I traded. It goes to the next place.
  tens0: I worked a tens part as ones. A tens part ends in zero.
  slip: Good catch. I slipped there. | Look closer. I slipped.
Tonight's question: Ask {name}: What is 23 times 4?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Tone lines the app says itself were in Remember, Explore and Together; reasons spoke to the child ("You left out") or did not say the mistake.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "mbig3",
 "t": "Big Times 1-Digit",
 "grade": 4,
 "age": "kid",
 "idea": "Multiply each place then trade ten of a place for one of the next.",
 "beats": {
  "remember": [
   "Remember this one? What is {a} times {b}?"
  ],
  "explore": [
   "Make any number with the blocks. Any way works."
  ],
  "name": [
   "You made {n}.",
   "{b} groups of {n} is {sum}.",
   "Multiply each place then trade ten of a place for one of the next."
  ],
  "together": [
   "Build every group then trade.",
   "Look at the picture. Type what it shows.",
   "Now the symbols only. What is {a} times {b}?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "In the factory we need parts. How many for {a} times {b}?",
   "One more job. What is {a} times {b}?"
  ]
 },
 "reasons": {
  "mcarry": [
   "I left out the ten I traded. It goes to the next place."
  ],
  "tens0": [
   "I worked a tens part as ones. A tens part ends in zero."
  ],
  "slip": [
   "Good catch. I slipped there.",
   "Look closer. I slipped."
  ]
 },
 "home": "Ask {name}: What is 23 times 4?"
}
```

<details><summary>The API's first draft</summary>

```text
Big Times 1-Digit (mbig3), grade 4, the kid pet
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Hey {name}. New idea today.
  - Remember this one? What is {a} times {b}?
Explore:
  - First show me what you already know.
  - Make any number with the blocks. Any way works.
Name it:
  - You made {n}.
  - {b} groups of {n} is {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Now a few with me. Build every group then trade.
  - Look at the picture. Type what it shows.
  - Now the symbols only. What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - In the factory we need parts. How many for {a} times {b}?
  - One more job. What is {a} times {b}?
Reasons the pet gives when it is caught:
  mcarry: You left out the ten from the last place. | Add the ten you traded from the place before.
  tens0: The tens part works like the ones. Try it again.
  slip: Good catch. I slipped there. | Look closer. I slipped.
Tonight's question: Ask {name}: What is 23 times 4?
About 3.5 minutes.
```
</details>
