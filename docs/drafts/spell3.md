# Draft: Spell Silent E & Teams (spell3)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Spell Silent E & Teams (spell3), grade 2, the little pet
Idea: Some sounds need more letters: a quiet e, or a vowel team.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Listen: {word}. Build it with the tiles any way you think.
Name it:
  - Look at {letter} in {word}.
  - Some letters we do not hear. They still go in.
  - The letters we do not hear go in too.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is right?
  - Listen to {word}. Do not forget the quiet letters.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The space station needs labels. Build each word I say!
Reasons the pet gives when it is caught:
  silent: Oops. I forgot the quiet e at the end.
  team: Oops. I wrote only one letter of the vowel team.
  mid: Oops. I wrote the wrong vowel.
Tonight's question: Say "kite" and ask {name} to write it.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons were said to the child ("The quiet e goes at the end", "The vowel team stays together"); each is now the pet's slip.
- Name it said "Both letters go in even when we do not hear them": a quiet e is one letter; it now says some letters we do not hear still go in.
- Check me said "I built"; the pet writes from dictation here, so "I wrote", as the claim the app shows.
- Tonight's question asked for a word with a quiet e; it now asks the child to write kite.
- Explore said "any way you like"; the build checks the word, so it is now "any way you think" (try it), and it says the word first (this line is what the app says).
- Together line 2 comes before three written words to pick from; it now asks which word is right.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "spell3",
 "t": "Spell Silent E & Teams",
 "grade": 2,
 "age": "little",
 "idea": "Some sounds need more letters: a quiet e, or a vowel team.",
 "beats": {
  "remember": [
   "Do you remember this? Listen for the first sound."
  ],
  "explore": [
   "Listen: {word}. Build it with the tiles any way you think."
  ],
  "name": [
   "Look at {letter} in {word}.",
   "Some letters we do not hear. They still go in.",
   "The letters we do not hear go in too."
  ],
  "together": [
   "Listen to {word}. Build it with me.",
   "Listen to {word}. Which word is right?",
   "Listen to {word}. Do not forget the quiet letters."
  ],
  "check": [
   "My turn. Check me!",
   "I wrote {ans}. Am I right?"
  ],
  "show": [
   "The space station needs labels. Build each word I say!"
  ]
 },
 "reasons": {
  "silent": [
   "Oops. I forgot the quiet e at the end."
  ],
  "team": [
   "Oops. I wrote only one letter of the vowel team."
  ],
  "mid": [
   "Oops. I wrote the wrong vowel."
  ]
 },
 "home": "Say \"kite\" and ask {name} to write it."
}
```

<details><summary>The API's first draft</summary>

```text
Spell Silent E & Teams (spell3), grade 2, the little pet
Idea: The letters we do not hear go in too.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Listen to {word}. Build it any way you like.
Name it:
  - Look at {word}. The pattern is {letter}.
  - Both letters go in even when we do not hear them.
  - The letters we do not hear go in too.
Together:
  - Listen to {word}. Build it with me.
  - Look at the picture. Which word is it?
  - Listen to {word}. Build it from the tiles.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space station needs signs. Build each word!
Reasons the pet gives when it is caught:
  silent: Look again. The quiet e goes at the end.
  team: Look again. The vowel team stays together.
  mid: Look again. The middle vowel is different.
Tonight's question: Ask {name}: "What word has a quiet e at the end?"
About 3.3 minutes.
```

</details>
