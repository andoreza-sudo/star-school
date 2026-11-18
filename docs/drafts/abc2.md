# Draft: Little Letters (abc2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Little Letters (abc2), grade -1, the little pet
Idea: Little letters have the same names. Some face a different way.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures by the first sound of each word.
Name it:
  - This is the letter {letter}.
  - {a} and {b} both start with {letter}.
  - Little letters have the same names as big ones.
Together:
  - Listen to the first sound of {word}.
  - Look at the picture. Tap the letter it starts with.
  - Hear the letter name. Tap that little letter.
Check me:
  - My turn. Check me!
  - That is {ans}!
Show:
  - The beach needs signs. Find each little letter!
Reasons the pet gives when it is caught:
  look: Oops. Those letters look alike. Which way does it face?
Tonight's question: Ask {name}: "Can you find the letter a in a book?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "{letter} says its name at the start" (untrue: apple does not start with the name of a).
- Show named one letter for both items: now general.
- The reasons were the engine's lines.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "abc2",
 "t": "Little Letters",
 "grade": -1,
 "age": "little",
 "idea": "Little letters have the same names. Some face a different way.",
 "beats": {
  "remember": [
   "Do you remember this? Find the letter {letter}."
  ],
  "explore": [
   "Let's sort the pictures by the first sound of each word."
  ],
  "name": [
   "This is the letter {letter}.",
   "{a} and {b} both start with {letter}.",
   "Little letters have the same names as big ones."
  ],
  "together": [
   "Listen to the first sound of {word}.",
   "Look at the picture. Tap the letter it starts with.",
   "Hear the letter name. Tap that little letter."
  ],
  "check": [
   "My turn. Check me!",
   "That is {ans}!"
  ],
  "show": [
   "The beach needs signs. Find each little letter!"
  ]
 },
 "reasons": {
  "look": [
   "Oops. Those letters look alike. Which way does it face?"
  ]
 },
 "home": "Ask {name}: \"Can you find the letter a in a book?\""
}
```

<details><summary>The API's first draft</summary>

```text
Little Letters (abc2), grade -1, the little pet
Idea: Little letters have names and words that start with them.

Remember:
  - Do you remember this? Let's look at a letter.
Explore:
  - Let's sort the pictures by the first sound of each word.
Name it:
  - This is the letter {letter}.
  - {a} and {b} both start with {letter}.
  - The letter {letter} says its name at the start.
Together:
  - Listen to the first sound of {word}.
  - Look at the picture. Tap the letter it starts with.
  - Hear the letter name. Tap that little letter.
Check me:
  - My turn. Check me!
  - That is {ans}!
Show:
  - The beach needs signs. Find the letter {letter} for each!
Reasons the pet gives when it is caught:
  look: Look! Let me help. | They look alike. Watch this.
Tonight's question: Ask {name}: "Can you find the letter a in a book?"
About 3.3 minutes.
```

</details>
