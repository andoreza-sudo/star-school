# Draft: Build a Word (build1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Build a Word (build1), grade 0, the little pet
Idea: Build a word one sound at a time: first, middle, last.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Build a word one sound at a time.
Together:
  - Look at this picture. Build {word} with me.
  - Listen to {word}. Which word matches it?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The path needs signs. Build each word for me!
Reasons the pet gives when it is caught:
  first: Oops. I built the first sound wrong.
  last: Oops. I built the last sound wrong.
  mid: Oops. I built the middle sound wrong.
Tonight's question: Ask {name}: "What is the last sound in dog?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named a word; Name it said "Both start with the same sound" (this sort is by the middle sound).
- Reasons say what the pet built wrong.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "build1",
 "t": "Build a Word",
 "grade": 0,
 "age": "little",
 "idea": "Build a word one sound at a time: first, middle, last.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the middle sound."
  ],
  "name": [
   "{a} and {b} have {letter} in the middle.",
   "Build a word one sound at a time."
  ],
  "together": [
   "Look at this picture. Build {word} with me.",
   "Listen to {word}. Which word matches it?",
   "Read the word. Then tap its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The path needs signs. Build each word for me!"
  ]
 },
 "reasons": {
  "first": [
   "Oops. I built the first sound wrong."
  ],
  "last": [
   "Oops. I built the last sound wrong."
  ],
  "mid": [
   "Oops. I built the middle sound wrong."
  ]
 },
 "home": "Ask {name}: \"What is the last sound in dog?\""
}
```

<details><summary>The API's first draft</summary>

```text
Build a Word (build1), grade 0, the little pet
Idea: Build short words one sound at a time.

Remember:
  - Do you remember this? Find the first sound of sun.
Explore:
  - Let's sort the pictures. Put each with its letter pattern.
Name it:
  - Look at {letter}. See {a} and {b}.
  - Both start with the same sound.
  - Build short words one sound at a time.
Together:
  - Look at this picture. Build {word} with me.
  - Listen to {word}. Which word matches it?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The path needs signs. Build each word for me!
Reasons the pet gives when it is caught:
  first: Look again. I missed the first sound.
  last: Look again. I missed the last sound.
  mid: Look again. I missed the middle sound.
Tonight's question: Ask {name}: "What is the last sound in dog?"
About 3.3 minutes.
```

</details>
