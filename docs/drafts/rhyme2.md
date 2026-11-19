# Draft: Rhyme & Read (rhyme2)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Rhyme & Read (rhyme2), grade 1, the little pet
Idea: Words that rhyme sound the same at the end.

Remember:
  - Do you remember this? Find the first sound.
Explore:
  - Say each picture with {word}. Rhyme, or no rhyme?
Name it:
  - {a} and {b} rhyme.
  - Listen: they sound the same at the end.
  - Words that rhyme sound the same at the end.
Together:
  - Say {word}. Which picture rhymes?
  - Read the words. Which one rhymes with {word}?
  - Read the first word. Then find its rhyme.
Check me:
  - My turn. Check me!
  - I pick {ans}. It rhymes with {word}!
Show:
  - The candy shop needs rhyme labels. Read and find each rhyme!
Reasons the pet gives when it is caught:
  rFirst: Oops. That starts the same. Rhymes end the same.
  rVow: Oops. Same middle, but the end is different.
Tonight's question: Ask {name} to read "dog" and "frog" and say why they rhyme.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons said the pet "missed the first sound" or "the middle sound": a rhyme is about the end, so each now says what the pet's pick shares and that the end differs.
- Name it said the rhyming part as letters ({letter}); for pairs like bear and chair the letters differ, so it now says they sound the same at the end.
- Explore did not name the word to rhyme with; this line is the task the app says with the sorter, so it now names {word}.
- Together line 3 comes before a written word with written choices: it now says to read the first word.
- Tonight's question now asks the child to read the two words, which is this stop.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "rhyme2",
 "t": "Rhyme & Read",
 "grade": 1,
 "age": "little",
 "idea": "Words that rhyme sound the same at the end.",
 "beats": {
  "remember": [
   "Do you remember this? Find the first sound."
  ],
  "explore": [
   "Say each picture with {word}. Rhyme, or no rhyme?"
  ],
  "name": [
   "{a} and {b} rhyme.",
   "Listen: they sound the same at the end.",
   "Words that rhyme sound the same at the end."
  ],
  "together": [
   "Say {word}. Which picture rhymes?",
   "Read the words. Which one rhymes with {word}?",
   "Read the first word. Then find its rhyme."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. It rhymes with {word}!"
  ],
  "show": [
   "The candy shop needs rhyme labels. Read and find each rhyme!"
  ]
 },
 "reasons": {
  "rFirst": [
   "Oops. That starts the same. Rhymes end the same."
  ],
  "rVow": [
   "Oops. Same middle, but the end is different."
  ]
 },
 "home": "Ask {name} to read \"dog\" and \"frog\" and say why they rhyme."
}
```

<details><summary>The API's first draft</summary>

```text
Rhyme & Read (rhyme2), grade 1, the little pet
Idea: Words that rhyme sound the same at the end.

Remember:
  - Do you remember this? Find the first sound.
Explore:
  - Let's sort the pictures. Put each with the rhyme or no.
Name it:
  - Look at {a} and {b}.
  - They sound the same at the end.
  - That part is {letter}.
Together:
  - Listen to {word}. Which one rhymes?
  - Look at the pictures. Which word rhymes with {word}?
  - Read this word. Which one rhymes?
Check me:
  - My turn. Check me!
  - I pick {ans}. It rhymes with {word}!
Show:
  - The candy shop needs signs. Read and pick the rhyme!
Reasons the pet gives when it is caught:
  rFirst: Look again. I missed the first sound.
  rVow: Look again. I picked the middle sound.
Tonight's question: Ask {name}: "What rhymes with dog?"
About 3.3 minutes.
```

</details>
