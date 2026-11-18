# Draft: Last Sounds (sound2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Last Sounds (sound2), grade 0, the little pet
Idea: Listen to the last sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the last sound of each word.
Name it:
  - {a} and {b} end with {letter}.
  - Listen to the last sound.
Together:
  - Listen to {word}. Build the last sound with me.
  - Say {word} slowly. Which sound is last?
  - Look at {letter}. Find a picture that ends with it.
Check me:
  - My turn. Check me!
  - {word} ends with {ans}.
Show:
  - The meadow needs signs. Listen for the last sound!
Reasons the pet gives when it is caught:
  last: Oops. I missed the last sound. Say it slowly.
Tonight's question: Ask {name}: "What is the last sound in dog?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said one line twice, and "Both end with" without the words.
- Together line 3 said "the last sound of {letter}" (a letter has no last sound).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sound2",
 "t": "Last Sounds",
 "grade": 0,
 "age": "little",
 "idea": "Listen to the last sound.",
 "beats": {
  "remember": [
   "Do you remember this? Find the letter {letter}."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the last sound of each word."
  ],
  "name": [
   "{a} and {b} end with {letter}.",
   "Listen to the last sound."
  ],
  "together": [
   "Listen to {word}. Build the last sound with me.",
   "Say {word} slowly. Which sound is last?",
   "Look at {letter}. Find a picture that ends with it."
  ],
  "check": [
   "My turn. Check me!",
   "{word} ends with {ans}."
  ],
  "show": [
   "The meadow needs signs. Listen for the last sound!"
  ]
 },
 "reasons": {
  "last": [
   "Oops. I missed the last sound. Say it slowly."
  ]
 },
 "home": "Ask {name}: \"What is the last sound in dog?\""
}
```

<details><summary>The API's first draft</summary>

```text
Last Sounds (sound2), grade 0, the little pet
Idea: Listen to the last sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the last sound of each word.
Name it:
  - Both end with {letter}.
  - Listen to the last sound.
  - Listen to the last sound.
Together:
  - Listen to {word}. Build the last sound with me.
  - Say {word} slowly. Which sound is last?
  - Look for the last sound of {letter}.
Check me:
  - My turn. Check me!
  - {word} ends with {ans}.
Show:
  - The meadow needs signs. Listen for the last sound!
Reasons the pet gives when it is caught:
  last: Oops. I missed the last sound. Say it slowly.
Tonight's question: Ask {name}: "What is the last sound in dog?"
About 3.3 minutes.
```

</details>
