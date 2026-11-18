# Draft: Middle Sounds (sound3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Middle Sounds (sound3), grade 0, the little pet
Idea: Listen to the middle sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen for the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Listen to the middle sound.
Together:
  - Listen to {word}. Build the middle letter with me.
  - Look at this picture. Find its middle letter.
  - Look at {letter}. Find a picture with it in the middle.
Check me:
  - My turn. Check me!
  - The middle letter is {ans}.
Show:
  - The meadow needs signs. Tap the right picture for each letter!
Reasons the pet gives when it is caught:
  mid: Look again. I missed the middle sound. Listen slowly.
Tonight's question: Ask {name}: "What is the middle sound in dog?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "This big {letter}" (the letter is small on the card).
- Together line 3 said "Find its picture" (any of the pictures could be "its").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sound3",
 "t": "Middle Sounds",
 "grade": 0,
 "age": "little",
 "idea": "Listen to the middle sound.",
 "beats": {
  "remember": [
   "Do you remember this? Find the letter {letter}."
  ],
  "explore": [
   "Let's sort the pictures. Listen for the middle sound."
  ],
  "name": [
   "{a} and {b} have {letter} in the middle.",
   "Listen to the middle sound."
  ],
  "together": [
   "Listen to {word}. Build the middle letter with me.",
   "Look at this picture. Find its middle letter.",
   "Look at {letter}. Find a picture with it in the middle."
  ],
  "check": [
   "My turn. Check me!",
   "The middle letter is {ans}."
  ],
  "show": [
   "The meadow needs signs. Tap the right picture for each letter!"
  ]
 },
 "reasons": {
  "mid": [
   "Look again. I missed the middle sound. Listen slowly."
  ]
 },
 "home": "Ask {name}: \"What is the middle sound in dog?\""
}
```

<details><summary>The API's first draft</summary>

```text
Middle Sounds (sound3), grade 0, the little pet
Idea: Listen to the middle sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen for the middle sound.
Name it:
  - This big {letter} is in the middle of {a} and {b}.
  - Listen to the middle sound.
Together:
  - Listen to {word}. Build the middle letter with me.
  - Look at this picture. Find its middle letter.
  - Look at big {letter}. Find its picture.
Check me:
  - My turn. Check me!
  - The middle letter is {ans}.
Show:
  - The meadow needs signs. Tap the right picture for each letter!
Reasons the pet gives when it is caught:
  mid: Look again. I missed the middle sound. Listen slowly.
Tonight's question: Ask {name}: "What is the middle sound in dog?"
About 3.3 minutes.
```

</details>
