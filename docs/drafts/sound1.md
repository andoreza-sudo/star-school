# Draft: First Sounds (sound1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
First Sounds (sound1), grade 0, the little pet
Idea: Listen to the first sound. It tells the first letter.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the first sound of each word.
Name it:
  - {a} and {b} both start with {letter}.
  - Listen to the first sound of each word.
Together:
  - Listen to {word}. Build its first sound with me.
  - Say {word} slowly. Which sound is first?
  - Look at the letter. Find a picture that starts with it.
Check me:
  - My turn. Check me!
  - {word} starts with {ans}.
Show:
  - The meadow gate needs signs. Tap the right picture for each letter!
Reasons the pet gives when it is caught:
  first: Oops. I missed the first sound. Say it slowly.
Tonight's question: Ask {name}: "What is the first sound in dog?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Every line read; only the idea changed (the draft's did not say what the sound is for).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sound1",
 "t": "First Sounds",
 "grade": 0,
 "age": "little",
 "idea": "Listen to the first sound. It tells the first letter.",
 "beats": {
  "remember": [
   "Do you remember this? Find the letter {letter}."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the first sound of each word."
  ],
  "name": [
   "{a} and {b} both start with {letter}.",
   "Listen to the first sound of each word."
  ],
  "together": [
   "Listen to {word}. Build its first sound with me.",
   "Say {word} slowly. Which sound is first?",
   "Look at the letter. Find a picture that starts with it."
  ],
  "check": [
   "My turn. Check me!",
   "{word} starts with {ans}."
  ],
  "show": [
   "The meadow gate needs signs. Tap the right picture for each letter!"
  ]
 },
 "reasons": {
  "first": [
   "Oops. I missed the first sound. Say it slowly."
  ]
 },
 "home": "Ask {name}: \"What is the first sound in dog?\""
}
```

<details><summary>The API's first draft</summary>

```text
First Sounds (sound1), grade 0, the little pet
Idea: Listen to the first sound of a word.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the first sound of each word.
Name it:
  - {a} and {b} both start with {letter}.
  - Listen to the first sound of each word.
Together:
  - Listen to {word}. Build its first sound with me.
  - Say {word} slowly. Which sound is first?
  - Look at the letter. Find a picture that starts with it.
Check me:
  - My turn. Check me!
  - {word} starts with {ans}.
Show:
  - The meadow gate needs signs. Tap the right picture for each letter!
Reasons the pet gives when it is caught:
  first: Oops. I missed the first sound. Say it slowly.
Tonight's question: Ask {name}: "What is the first sound in dog?"
About 3.3 minutes.
```

</details>
