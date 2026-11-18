# Draft: Vowel Teams (pic4)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Vowel Teams (pic4), grade 2, the little pet
Idea: Vowel teams are vowels side by side that make one sound.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its vowel team.
Name it:
  - {a} and {b} both have {letter}.
  - Those vowels work as a team.
  - Vowels side by side can make one sound.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space station needs signs. Read each one!
Reasons the pet gives when it is caught:
  team: Oops. I read only one vowel of the team.
  mid: Oops. I read the middle vowel wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name}: "Can you find a word with a vowel team like boat?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named a word ("boat").
- The mid and last reasons were not true ("The last sound is part of the vowel team").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pic4",
 "t": "Vowel Teams",
 "grade": 2,
 "age": "little",
 "idea": "Vowel teams are vowels side by side that make one sound.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each one with its vowel team."
  ],
  "name": [
   "{a} and {b} both have {letter}.",
   "Those vowels work as a team.",
   "Vowels side by side can make one sound."
  ],
  "together": [
   "Look at this picture. Build the word with me.",
   "Listen to {word}. Which word matches the picture?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The space station needs signs. Read each one!"
  ]
 },
 "reasons": {
  "team": [
   "Oops. I read only one vowel of the team."
  ],
  "mid": [
   "Oops. I read the middle vowel wrong."
  ],
  "last": [
   "Oops. I read the last sound wrong."
  ]
 },
 "home": "Ask {name}: \"Can you find a word with a vowel team like boat?\""
}
```

<details><summary>The API's first draft</summary>

```text
Vowel Teams (pic4), grade 2, the little pet
Idea: Vowel teams are vowels side by side that make one sound.

Remember:
  - Do you remember this? Find the first sound of boat.
Explore:
  - Let's sort the pictures. Put each one with its vowel team.
Name it:
  - Look at {letter} in {a} and {b}.
  - Both have the same vowel team.
  - Vowel teams are vowels side by side that make one sound.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space station needs signs. Read each one!
Reasons the pet gives when it is caught:
  team: Look again. The vowel team makes one sound.
  mid: The middle sound uses the vowel team.
  last: The last sound is part of the vowel team.
Tonight's question: Ask {name}: "Can you find a word with a vowel team like boat?"
About 3.3 minutes.
```

</details>
