# Draft: Build Silent E (build3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Build Silent E (build3), grade 1, the little pet
Idea: Do not forget the quiet e at the end.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the vowel.
Name it:
  - {a} and {b} both have {letter}.
  - The quiet e goes in, though we do not hear it.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The ocean reef needs signs. Build each word!
Reasons the pet gives when it is caught:
  silent: Oops. I left off the quiet e at the end.
  mid: Oops. I built the vowel wrong.
Tonight's question: Ask {name}: "Can you find a word with silent e?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "Look at {letter} and {a}"; the first reasons were the engine's lines ("Look again. I made a mistake!").
- Together line 2 said "this picture of {word}": the app says the word itself.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "build3",
 "t": "Build Silent E",
 "grade": 1,
 "age": "little",
 "idea": "Do not forget the quiet e at the end.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the vowel."
  ],
  "name": [
   "{a} and {b} both have {letter}.",
   "The quiet e goes in, though we do not hear it."
  ],
  "together": [
   "Look at this picture. Build the word with me.",
   "Listen to {word}. Which word matches?",
   "Read the word. Then tap its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The ocean reef needs signs. Build each word!"
  ]
 },
 "reasons": {
  "silent": [
   "Oops. I left off the quiet e at the end."
  ],
  "mid": [
   "Oops. I built the vowel wrong."
  ]
 },
 "home": "Ask {name}: \"Can you find a word with silent e?\""
}
```

<details><summary>The API's first draft</summary>

```text
Build Silent E (build3), grade 1, the little pet
Idea: The silent e at the end makes the vowel say its name.

Remember:
  - Do you remember this? Find the first sound.
Explore:
  - Sort each picture into its letter pattern bin.
Name it:
  - Look at {letter} and {a}.
  - {a} and {b} both end with silent e.
  - The silent e at the end makes the vowel say its name.
Together:
  - Look at this picture. Build the word with me.
  - Look at this picture of {word}. Which word matches?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The ocean reef needs signs. Build each word!
Reasons the pet gives when it is caught:
  silent: You caught my mistake! | I left off the silent e at the end.
  mid: Look again. I made a mistake! | I used the wrong middle sound.
Tonight's question: Ask {name}: "Can you find a word with silent e?"
About 3.3 minutes.
```

</details>
