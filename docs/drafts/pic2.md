# Draft: Blends (pic2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Blends (pic2), grade 1, the little pet
Idea: In a blend we say both letters, one after the other.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each with its blend.
Name it:
  - {a} and {b} both start with {letter}.
  - We say both sounds in a blend.
Together:
  - Look at the picture. Build the word with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - Candy Canyon needs signs. Read each one!
Reasons the pet gives when it is caught:
  blend: Oops. I left out one sound of the blend.
  mid: Oops. I read the middle sound wrong.
Tonight's question: Ask {name}: "Can you find a word with a blend in a book?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named a word ("star").
- Name it read "Look at {letter} and {a} and {b}."
- The first reasons were the engine's line ("You caught my mistake!").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pic2",
 "t": "Blends",
 "grade": 1,
 "age": "little",
 "idea": "In a blend we say both letters, one after the other.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each with its blend."
  ],
  "name": [
   "{a} and {b} both start with {letter}.",
   "We say both sounds in a blend."
  ],
  "together": [
   "Look at the picture. Build the word with me.",
   "Say the word slowly. Which word is it?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "Candy Canyon needs signs. Read each one!"
  ]
 },
 "reasons": {
  "blend": [
   "Oops. I left out one sound of the blend."
  ],
  "mid": [
   "Oops. I read the middle sound wrong."
  ]
 },
 "home": "Ask {name}: \"Can you find a word with a blend in a book?\""
}
```

<details><summary>The API's first draft</summary>

```text
Blends (pic2), grade 1, the little pet
Idea: Consonants side by side make both sounds.

Remember:
  - Do you remember this? Find the first sound of star.
Explore:
  - Let's sort the pictures. Put each with its blend.
Name it:
  - Look at {letter} and {a} and {b}.
  - We say both sounds in the blend.
  - Consonants side by side make both sounds.
Together:
  - Look at the picture. Build the word with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - Candy Canyon needs signs. Read each one!
Reasons the pet gives when it is caught:
  blend: You caught my mistake! | I left out one sound in the blend.
  mid: You caught my mistake! | I said the middle sound wrong.
Tonight's question: Ask {name}: "Can you find a word with a blend in a book?"
About 3.3 minutes.
```

</details>
