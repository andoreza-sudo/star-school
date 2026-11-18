# Draft: Letter Teams (sound4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Letter Teams (sound4), grade 1, the little pet
Idea: Some letters work as a team. Together they make one sound.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - {a} and {b} both start with {letter}.
  - Those letters work as a team.
Together:
  - Look at the picture. Build {word} with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - Candy Canyon needs signs. Read each one!
Reasons the pet gives when it is caught:
  dig: Oops. I read the team as one letter.
  mid: Oops. I read the middle vowel wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name}: "Can you find a word with the letter team ch?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named a word; the idea read "letter teams are both letters".
- The mid and last reasons said the team makes those sounds (it does not).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sound4",
 "t": "Letter Teams",
 "grade": 1,
 "age": "little",
 "idea": "Some letters work as a team. Together they make one sound.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each one with its letter team."
  ],
  "name": [
   "{a} and {b} both start with {letter}.",
   "Those letters work as a team."
  ],
  "together": [
   "Look at the picture. Build {word} with me.",
   "Say the word slowly. Which word is it?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "Candy Canyon needs signs. Read each one!"
  ]
 },
 "reasons": {
  "dig": [
   "Oops. I read the team as one letter."
  ],
  "mid": [
   "Oops. I read the middle vowel wrong."
  ],
  "last": [
   "Oops. I read the last sound wrong."
  ]
 },
 "home": "Ask {name}: \"Can you find a word with the letter team ch?\""
}
```

<details><summary>The API's first draft</summary>

```text
Letter Teams (sound4), grade 1, the little pet
Idea: Letter teams are both letters that make one sound together.

Remember:
  - Do you remember this? Find the first sound of sun.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - Look at {letter} in {a} and {b}.
  - Both letters work as a team.
  - Letter teams are both letters that make one sound together.
Together:
  - Look at the picture. Build {word} with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - Candy Canyon needs signs. Read each one!
Reasons the pet gives when it is caught:
  dig: Look again. I read the letter team as one letter.
  mid: Oops. I missed the sound the team makes in the middle.
  last: Oops. I missed the sound the team makes at the end.
Tonight's question: Ask {name}: "Can you find a word with the letter team ch?"
About 3.3 minutes.
```

</details>
