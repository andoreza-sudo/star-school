# Draft: Read Sentences (sent2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Read Sentences (sent2), grade 1, the little pet
Idea: Read each word then the whole sentence.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the start.
Name it:
  - {a} and {b} both start with {letter}.
  - Read each word, then the whole sentence.
Together:
  - Look at the picture. Build {word} with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The candy shop needs signs. Read each one!
Reasons the pet gives when it is caught:
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
  mid: Oops. I read the middle sound wrong.
  blend: Oops. I left out a letter of the blend.
Tonight's question: Ask {name}: "Can you read me a sentence from a book?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember fits the warm-up; Name it fits the sort (blends at the start).
- Reasons: "missed" for a sound the pet read wrong.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sent2",
 "t": "Read Sentences",
 "grade": 1,
 "age": "little",
 "idea": "Read each word then the whole sentence.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the start."
  ],
  "name": [
   "{a} and {b} both start with {letter}.",
   "Read each word, then the whole sentence."
  ],
  "together": [
   "Look at the picture. Build {word} with me.",
   "Listen to {word}. Which word matches the picture?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The candy shop needs signs. Read each one!"
  ]
 },
 "reasons": {
  "first": [
   "Oops. I read the first sound wrong."
  ],
  "last": [
   "Oops. I read the last sound wrong."
  ],
  "mid": [
   "Oops. I read the middle sound wrong."
  ],
  "blend": [
   "Oops. I left out a letter of the blend."
  ]
 },
 "home": "Ask {name}: \"Can you read me a sentence from a book?\""
}
```

<details><summary>The API's first draft</summary>

```text
Read Sentences (sent2), grade 1, the little pet
Idea: Read each word then the whole sentence.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures into the right pattern bin.
Name it:
  - Look at {letter} in {a} and {b}.
  - Both words have that pattern.
  - Read each word then the whole sentence.
Together:
  - Look at the picture. Build {word} with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The candy shop needs signs. Read each one!
Reasons the pet gives when it is caught:
  first: Look again. I missed the first sound. Say it slowly.
  last: Look again. I missed the last sound. Say it slowly.
  mid: Look again. I missed the middle sound. Say it slowly.
  blend: Look again. I missed a letter in the blend. Say it slowly.
Tonight's question: Ask {name}: "Can you read me a sentence from a book?"
About 3.3 minutes.
```

</details>
