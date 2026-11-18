# Draft: Silent E (pic3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Silent E (pic3), grade 1, the little pet
Idea: A quiet e at the end makes the vowel say its name.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each with its letter pattern.
Name it:
  - {a} and {b} both have {letter}.
  - The e is quiet, but it helps the vowel say its name.
Together:
  - Look at this picture. Build the word with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The sea needs signs. Read each one!
Reasons the pet gives when it is caught:
  silent: Oops. I left off the quiet e at the end.
  mid: Oops. I read the vowel wrong.
Tonight's question: Ask {name}: "Can you find a word with a silent e?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it read "Look at {letter} and {a} and {b}"; the first reasons were the engine's line.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pic3",
 "t": "Silent E",
 "grade": 1,
 "age": "little",
 "idea": "A quiet e at the end makes the vowel say its name.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each with its letter pattern."
  ],
  "name": [
   "{a} and {b} both have {letter}.",
   "The e is quiet, but it helps the vowel say its name."
  ],
  "together": [
   "Look at this picture. Build the word with me.",
   "Say the word slowly. Which word is it?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The sea needs signs. Read each one!"
  ]
 },
 "reasons": {
  "silent": [
   "Oops. I left off the quiet e at the end."
  ],
  "mid": [
   "Oops. I read the vowel wrong."
  ]
 },
 "home": "Ask {name}: \"Can you find a word with a silent e?\""
}
```

<details><summary>The API's first draft</summary>

```text
Silent E (pic3), grade 1, the little pet
Idea: The silent e at the end makes the vowel say its name.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Let's sort the pictures. Put each with its letter pattern.
Name it:
  - Look at {letter} and {a} and {b}.
  - The e is silent but it helps the vowel say its name.
Together:
  - Look at this picture. Build the word with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The sea needs signs. Read each one!
Reasons the pet gives when it is caught:
  silent: You caught my mistake! | I left off the silent e at the end.
  mid: You caught my mistake! | I read the middle vowel wrong.
Tonight's question: Ask {name}: "Can you find a word with a silent e?"
About 3.3 minutes.
```

</details>
