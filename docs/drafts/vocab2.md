# Draft: Synonyms (vocab2)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Synonyms (vocab2), grade 2, the little pet
Idea: Some words mean almost the same: big and huge.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Match each word to one that means the same.
Name it:
  - {a} and {b} mean almost the same.
  - They are synonyms!
  - Some words mean almost the same.
Together:
  - Match each word to one that means the same.
  - Listen to {word}. Which word means the same?
  - Read the word. Which one means the same?
Check me:
  - My turn. Check me!
  - I think {ans} means the same as {word}.
Show:
  - The toy shop needs labels. Find each word that means the same!
Reasons the pet gives when it is caught:
  synOpp: Oops. I picked the opposite, not the same.
Tonight's question: Ask {name} for another word for "happy".
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named the word "look"; the warm-up picks its own word, so it now says "Tap it".
- The reason began "Look again"; it is now the pet's slip.
- Together line 1 said "Let's match words that mean the same"; it now says the task as the app shows it.
- The idea now gives an example pair (big and huge).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "vocab2",
 "t": "Synonyms",
 "grade": 2,
 "age": "little",
 "idea": "Some words mean almost the same: big and huge.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Match each word to one that means the same."
  ],
  "name": [
   "{a} and {b} mean almost the same.",
   "They are synonyms!",
   "Some words mean almost the same."
  ],
  "together": [
   "Match each word to one that means the same.",
   "Listen to {word}. Which word means the same?",
   "Read the word. Which one means the same?"
  ],
  "check": [
   "My turn. Check me!",
   "I think {ans} means the same as {word}."
  ],
  "show": [
   "The toy shop needs labels. Find each word that means the same!"
  ]
 },
 "reasons": {
  "synOpp": [
   "Oops. I picked the opposite, not the same."
  ]
 },
 "home": "Ask {name} for another word for \"happy\"."
}
```

<details><summary>The API's first draft</summary>

```text
Synonyms (vocab2), grade 2, the little pet
Idea: Synonyms are words that mean almost the same.

Remember:
  - Do you remember this? Find the word look.
Explore:
  - Let's match each word to its partner that means the same.
Name it:
  - {a} and {b} mean almost the same.
  - They are synonyms!
  - Synonyms are words that mean almost the same.
Together:
  - Let's match words that mean the same.
  - Listen to {word}. Which word means the same?
  - Read this word. Pick the one that means the same.
Check me:
  - My turn. Check me!
  - I think {ans} means the same as {word}.
Show:
  - The toy shop needs signs. Pick the right word for each!
Reasons the pet gives when it is caught:
  synOpp: Look again. I picked a word that means the opposite.
Tonight's question: Ask {name}: "What word means almost the same as happy?"
About 3.3 minutes.
```

</details>
