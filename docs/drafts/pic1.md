# Draft: Picture Words (pic1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Picture Words (pic1), grade 0, the little pet
Idea: Say each sound, then blend them into a word.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Say each sound, then blend them.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The little farm needs signs. Read each one!
Reasons the pet gives when it is caught:
  first: Oops. I read the first sound wrong. Say it slowly.
  last: Oops. I read the last sound wrong. Say it slowly.
  mid: Oops. I read the middle sound wrong. Say it slowly.
Tonight's question: Ask {name}: "What is the first sound of cat?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named a word ("sun"): the warm-up picks its own.
- Name it said "Both start with the same sound", but this sort is by the middle sound.
- Reasons: "missed" for a sound the pet read wrong.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pic1",
 "t": "Picture Words",
 "grade": 0,
 "age": "little",
 "idea": "Say each sound, then blend them into a word.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the middle sound."
  ],
  "name": [
   "{a} and {b} have {letter} in the middle.",
   "Say each sound, then blend them."
  ],
  "together": [
   "Look at this picture. Build the word with me.",
   "Listen to {word}. Which word matches the picture?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The little farm needs signs. Read each one!"
  ]
 },
 "reasons": {
  "first": [
   "Oops. I read the first sound wrong. Say it slowly."
  ],
  "last": [
   "Oops. I read the last sound wrong. Say it slowly."
  ],
  "mid": [
   "Oops. I read the middle sound wrong. Say it slowly."
  ]
 },
 "home": "Ask {name}: \"What is the first sound of cat?\""
}
```

<details><summary>The API's first draft</summary>

```text
Picture Words (pic1), grade 0, the little pet
Idea: Say each sound then blend them to read the word.

Remember:
  - Do you remember this? Listen for the first sound of sun.
Explore:
  - Let's sort the pictures. Put each one with its letter pattern.
Name it:
  - Look at {letter}. Here are {a} and {b}.
  - Both start with the same sound.
  - Say each sound then blend them to read the word.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The little farm needs signs. Read each one!
Reasons the pet gives when it is caught:
  first: Look again. I missed the first sound. Say it slowly.
  last: Oops. I missed the last sound. Say it slowly.
  mid: Look again. I missed the middle sound. Say it slowly.
Tonight's question: Ask {name}: "What is the first sound of cat?"
About 3.3 minutes.
```

</details>
