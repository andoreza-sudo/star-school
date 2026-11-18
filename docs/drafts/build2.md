# Draft: Build Blends (build2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Build Blends (build2), grade 1, the little pet
Idea: Both letters of the blend go in the word.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its blend pattern.
Name it:
  - {a} and {b} both start with {letter}.
  - Both letters of the blend go in the word.
Together:
  - Look at the picture. Build {word} with me.
  - Say {word} slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The candy shop needs signs. Build each word!
Reasons the pet gives when it is caught:
  blend: Oops. I left out one letter of the blend.
  mid: Oops. I built the middle sound wrong.
Tonight's question: Ask {name} to say the letters in "flag", in order.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said one line twice.
- Tonight's question ("the blend in stop") is hard to ask: now the hand-written one.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "build2",
 "t": "Build Blends",
 "grade": 1,
 "age": "little",
 "idea": "Both letters of the blend go in the word.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each one with its blend pattern."
  ],
  "name": [
   "{a} and {b} both start with {letter}.",
   "Both letters of the blend go in the word."
  ],
  "together": [
   "Look at the picture. Build {word} with me.",
   "Say {word} slowly. Which word is it?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The candy shop needs signs. Build each word!"
  ]
 },
 "reasons": {
  "blend": [
   "Oops. I left out one letter of the blend."
  ],
  "mid": [
   "Oops. I built the middle sound wrong."
  ]
 },
 "home": "Ask {name} to say the letters in \"flag\", in order."
}
```

<details><summary>The API's first draft</summary>

```text
Build Blends (build2), grade 1, the little pet
Idea: Both letters of the blend go in the word.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Let's sort the pictures. Put each one with its blend pattern.
Name it:
  - Look at {letter}. Here are {a} and {b}.
  - Both letters of the blend go in the word.
  - Both letters of the blend go in the word.
Together:
  - Look at the picture. Build {word} with me.
  - Say {word} slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The candy shop needs signs. Build each word!
Reasons the pet gives when it is caught:
  blend: Look again. I left out one letter of the blend.
  mid: Oops. I missed the middle sound. Say it slowly.
Tonight's question: Ask {name}: "Can you name a word that starts with the blend in stop?"
About 3.3 minutes.
```

</details>
