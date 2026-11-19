# Draft: Rhyme Time (rhyme1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Rhyme Time (rhyme1), grade 0, the little pet
Idea: Words that rhyme sound the same at the end.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Say each picture with {word}. Does it rhyme?
Name it:
  - {a} and {b} sound the same at the end.
  - That is a rhyme!
  - Words that rhyme sound the same at the end.
Together:
  - Say {word}. Then find the one that rhymes.
  - Listen to the end of {word}.
  - Listen to the word. Then find its rhyme.
Check me:
  - My turn. Check me!
  - I pick {ans}. It rhymes with {word}!
Show:
  - The garden needs rhyme labels. Find each rhyme!
Reasons the pet gives when it is caught:
  rFirst: Oops. It starts the same, but the end is different.
  rVow: Oops. Same middle sound, but the end is different.
Tonight's question: Ask {name}: "What rhymes with dog?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons said the pet "missed the first sound" or "the middle sound": a rhyme is about the end, so each now says what the pet's pick shares and that the end differs.
- Explore did not name the word to rhyme with; this line is the task the app says with the sorter, so it now names {word}.
- Together line 2 ("Look at this picture") fits the picture item; now it points at the end of the word, which is the skill.
- Show is the job line; "signs" became rhyme labels.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "rhyme1",
 "t": "Rhyme Time",
 "grade": 0,
 "age": "little",
 "idea": "Words that rhyme sound the same at the end.",
 "beats": {
  "remember": [
   "Do you remember this? Listen for the first sound."
  ],
  "explore": [
   "Say each picture with {word}. Does it rhyme?"
  ],
  "name": [
   "{a} and {b} sound the same at the end.",
   "That is a rhyme!",
   "Words that rhyme sound the same at the end."
  ],
  "together": [
   "Say {word}. Then find the one that rhymes.",
   "Listen to the end of {word}.",
   "Listen to the word. Then find its rhyme."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. It rhymes with {word}!"
  ],
  "show": [
   "The garden needs rhyme labels. Find each rhyme!"
  ]
 },
 "reasons": {
  "rFirst": [
   "Oops. It starts the same, but the end is different."
  ],
  "rVow": [
   "Oops. Same middle sound, but the end is different."
  ]
 },
 "home": "Ask {name}: \"What rhymes with dog?\""
}
```

<details><summary>The API's first draft</summary>

```text
Rhyme Time (rhyme1), grade 0, the little pet
Idea: Words that rhyme sound the same at the end.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Let's sort the pictures. Listen to the end of each word.
Name it:
  - {a} and {b} sound the same at the end.
  - That is a rhyme!
  - Words that rhyme sound the same at the end.
Together:
  - Listen to {word}. Pick the one that rhymes.
  - Look at this picture. Find its rhyme.
  - Listen to the word. Pick its rhyme.
Check me:
  - My turn. Check me!
  - I pick {ans}. It rhymes with {word}!
Show:
  - The garden needs signs. Find the rhymes!
Reasons the pet gives when it is caught:
  rFirst: Look again. I missed the first sound.
  rVow: Look again. I missed the middle sound.
Tonight's question: Ask {name}: "What rhymes with dog?"
About 3.3 minutes.
```

</details>
