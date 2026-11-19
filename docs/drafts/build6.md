# Draft: Build Vowel Teams 2 (build6)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Build Vowel Teams 2 (build6), grade 2, the little pet
Idea: Both letters of a team go in the word.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - {a} and {b} both have {letter}.
  - Both letters of the team go in.
  - Both letters of a team go in the word.
Together:
  - Look at this picture. Build the word with me.
  - Look at the picture. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The workshop needs labels. Build each word!
Reasons the pet gives when it is caught:
  mid: Oops. I read the team in the middle wrong.
  blend: Oops. I left out a letter at the start.
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name} to write "cloud" and point to the team.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "Look at {letter} and {a} and {b}" (not a sentence).
- Together 1 said "Build {word}" and then the app says the word again.
- The blend reason said "Both letters of the team go in" (a blend is not a team).
- Tonight's question asked for "the sound in book" with no word to write.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "build6",
 "t": "Build Vowel Teams 2",
 "grade": 2,
 "age": "little",
 "idea": "Both letters of a team go in the word.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each one with its letter team."
  ],
  "name": [
   "{a} and {b} both have {letter}.",
   "Both letters of the team go in.",
   "Both letters of a team go in the word."
  ],
  "together": [
   "Look at this picture. Build the word with me.",
   "Look at the picture. Which word is it?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The workshop needs labels. Build each word!"
  ]
 },
 "reasons": {
  "mid": [
   "Oops. I read the team in the middle wrong."
  ],
  "blend": [
   "Oops. I left out a letter at the start."
  ],
  "first": [
   "Oops. I read the first sound wrong."
  ],
  "last": [
   "Oops. I read the last sound wrong."
  ]
 },
 "home": "Ask {name} to write \"cloud\" and point to the team."
}
```

<details><summary>The API's first draft</summary>

```text
Build Vowel Teams 2 (build6), grade 2, the little pet
Idea: Both letters of the team go in the word.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Let's sort the pictures. Put each with its pattern.
Name it:
  - Look at {letter} and {a} and {b}.
  - Both letters of the team go in the word.
Together:
  - Look at the picture. Build {word} with me.
  - Look at the picture. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The toy shop needs signs. Build each one!
Reasons the pet gives when it is caught:
  mid: Oops. Listen to the middle sound again.
  blend: Look again. Both letters of the team go in.
  first: Oops. I missed the first sound. Say it slowly.
  last: Oops. I missed the last sound. Say it slowly.
Tonight's question: Ask {name}: "Can you find something with the sound in book?"
About 3.3 minutes.
```

</details>
