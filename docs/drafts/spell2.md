# Draft: Spell Blends (spell2)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Spell Blends (spell2), grade 1, the little pet
Idea: In a blend we hear both letters. Write both of them.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Listen: {word}. Build it with the tiles any way you think.
Name it:
  - Look at {word}.
  - Both letters of {letter} are there.
  - In a blend we hear both letters. Write both.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is right?
  - Listen to {word}. Say both blend letters as you build.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The sea animals need name tags. Build each word I say!
Reasons the pet gives when it is caught:
  blend: Oops. I left out a letter of the blend.
  mid: Oops. I wrote the middle sound wrong.
Tonight's question: Say "frog" and ask {name} to write it.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea "Both letters go in a blend" is now the fallback's, which says we hear both.
- The mid reason ("Listen to the middle sound of {word}") was said to the child; it is now the pet's slip.
- Name it repeated "both letters go in" twice; the second line is now the idea.
- The code now finds the blend at the end of a word too (milk, hand), so {letter} is always the word's blend.
- Explore said "any way you like"; the build checks the word, so it is now "any way you think" (try it), and it says the word first (this line is what the app says).
- Together line 2 comes before three written words to pick from; it now asks which word is right.
- Tonight's question asked for a word that starts with fr; it now asks the child to write one.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "spell2",
 "t": "Spell Blends",
 "grade": 1,
 "age": "little",
 "idea": "In a blend we hear both letters. Write both of them.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Listen: {word}. Build it with the tiles any way you think."
  ],
  "name": [
   "Look at {word}.",
   "Both letters of {letter} are there.",
   "In a blend we hear both letters. Write both."
  ],
  "together": [
   "Listen to {word}. Build it with me.",
   "Listen to {word}. Which word is right?",
   "Listen to {word}. Say both blend letters as you build."
  ],
  "check": [
   "My turn. Check me!",
   "I wrote {ans}. Am I right?"
  ],
  "show": [
   "The sea animals need name tags. Build each word I say!"
  ]
 },
 "reasons": {
  "blend": [
   "Oops. I left out a letter of the blend."
  ],
  "mid": [
   "Oops. I wrote the middle sound wrong."
  ]
 },
 "home": "Say \"frog\" and ask {name} to write it."
}
```

<details><summary>The API's first draft</summary>

```text
Spell Blends (spell2), grade 1, the little pet
Idea: Both letters go in a blend.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Listen to {word}. Build it any way you like.
Name it:
  - Look at {word}.
  - Both letters go in the blend {letter}.
  - Both letters go in a blend.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is it?
  - Listen to {word}. Build it from the tiles.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The sea animals need name tags. Build each one!
Reasons the pet gives when it is caught:
  blend: Look again. Both letters go in the blend.
  mid: Listen to the middle sound of {word}.
Tonight's question: Ask {name}: "Can you think of a word that starts with the blend fr?"
About 3.3 minutes.
```

</details>
