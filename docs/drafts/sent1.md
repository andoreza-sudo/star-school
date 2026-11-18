# Draft: Read & Match (sent1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Read & Match (sent1), grade 0, the little pet
Idea: Read one word at a time. The words tell the picture.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Read one word at a time.
Together:
  - Look at the picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The animals need help in the meadow. Read each sentence!
Reasons the pet gives when it is caught:
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
  mid: Oops. I read the middle sound wrong.
Tonight's question: Ask {name}: "Can you read me a sentence from a book?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 3 said "Read the sentence" before a single word; Name it fits the sort (the middle sound).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sent1",
 "t": "Read & Match",
 "grade": 0,
 "age": "little",
 "idea": "Read one word at a time. The words tell the picture.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the middle sound."
  ],
  "name": [
   "{a} and {b} have {letter} in the middle.",
   "Read one word at a time."
  ],
  "together": [
   "Look at the picture. Build the word with me.",
   "Listen to {word}. Which word matches the picture?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The animals need help in the meadow. Read each sentence!"
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
  ]
 },
 "home": "Ask {name}: \"Can you read me a sentence from a book?\""
}
```

<details><summary>The API's first draft</summary>

```text
Read & Match (sent1), grade 0, the little pet
Idea: Read the sentence and match it to the picture.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter pattern.
Name it:
  - Look at {letter}.
  - {a} and {b} both use {letter}.
  - Read the sentence and match it to the picture.
Together:
  - Look at the picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the sentence. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The animals need help in the meadow. Read each sentence!
Reasons the pet gives when it is caught:
  first: Look again. I missed the first sound.
  last: Look again. I missed the last sound.
  mid: Look again. I missed the middle sound.
Tonight's question: Ask {name}: "Can you read me a sentence from a book?"
About 3.3 minutes.
```

</details>
