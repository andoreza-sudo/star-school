# Draft: Spell Short Words (spell1)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Spell Short Words (spell1), grade 1, the little pet
Idea: Listen to each sound. Write a letter for each one.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Listen: {word}. Build it with the tiles any way you think.
Name it:
  - Look at {word}.
  - Every sound you hear got its letter.
  - Listen to each sound. Write a letter for each one.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is right?
  - Listen to {word}. Say each sound as you build.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The candy shop needs name tags. Build each word I say!
Reasons the pet gives when it is caught:
  first: Oops. I wrote the first sound wrong.
  last: Oops. I wrote the last sound wrong.
  mid: Oops. I wrote the middle sound wrong.
Tonight's question: Say "map" and ask {name} to write it.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea had a number word ("three sounds"); it is now the fallback's idea, one letter for each sound.
- Name it said "It has the sounds {letter}", but {letter} is only the middle vowel; it now says every sound got its letter.
- The reasons said the pet "missed" a sound or told the child to look again; the pet wrote a wrong letter, so each now says what it wrote wrong.
- Explore said "any way you like"; the build checks the word, so it is now "any way you think" (try it), and it says the word first (this line is what the app says).
- Together line 2 comes before three written words to pick from; it now asks which word is right.
- Tonight's question asked for a word starting with m; it now asks the child to write a word heard, which is this stop.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "spell1",
 "t": "Spell Short Words",
 "grade": 1,
 "age": "little",
 "idea": "Listen to each sound. Write a letter for each one.",
 "beats": {
  "remember": [
   "Do you remember this? Listen for the first sound."
  ],
  "explore": [
   "Listen: {word}. Build it with the tiles any way you think."
  ],
  "name": [
   "Look at {word}.",
   "Every sound you hear got its letter.",
   "Listen to each sound. Write a letter for each one."
  ],
  "together": [
   "Listen to {word}. Build it with me.",
   "Listen to {word}. Which word is right?",
   "Listen to {word}. Say each sound as you build."
  ],
  "check": [
   "My turn. Check me!",
   "I wrote {ans}. Am I right?"
  ],
  "show": [
   "The candy shop needs name tags. Build each word I say!"
  ]
 },
 "reasons": {
  "first": [
   "Oops. I wrote the first sound wrong."
  ],
  "last": [
   "Oops. I wrote the last sound wrong."
  ],
  "mid": [
   "Oops. I wrote the middle sound wrong."
  ]
 },
 "home": "Say \"map\" and ask {name} to write it."
}
```

<details><summary>The API's first draft</summary>

```text
Spell Short Words (spell1), grade 1, the little pet
Idea: Short words of three sounds have one letter for each sound.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Listen to {word}. Build it with the letters any way you like.
Name it:
  - Look at {word}.
  - It has the sounds {letter}.
  - Each sound gets one letter.
Together:
  - Listen to {word}. Build it with me.
  - Look at the picture of {word}. Which word is it?
  - Listen to {word}. Build it from the sounds.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The candy shop needs signs. Build each word!
Reasons the pet gives when it is caught:
  first: Look again. I missed the first sound.
  last: Look again. I missed the last sound.
  mid: Look again. I missed the middle sound.
Tonight's question: Ask {name}: "What is a short word that starts with the sound of m?"
About 3.3 minutes.
```

</details>
