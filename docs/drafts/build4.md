# Draft: Build Vowel Teams (build4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Build Vowel Teams (build4), grade 2, the little pet
Idea: Both vowels go in a vowel team.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each with its pattern.
Name it:
  - {a} and {b} both have {letter}.
  - Both vowels of a team go in the word.
Together:
  - Look at the picture. Build {word} with me.
  - Listen to {word}. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space lab needs signs. Build each one!
Reasons the pet gives when it is caught:
  team: Oops. I left out a vowel of the team.
  mid: Oops. I built the middle vowel wrong.
  last: Oops. I built the last sound wrong.
Tonight's question: Ask {name}: "What word has the team in boat?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said one line twice.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "build4",
 "t": "Build Vowel Teams",
 "grade": 2,
 "age": "little",
 "idea": "Both vowels go in a vowel team.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each with its pattern."
  ],
  "name": [
   "{a} and {b} both have {letter}.",
   "Both vowels of a team go in the word."
  ],
  "together": [
   "Look at the picture. Build {word} with me.",
   "Listen to {word}. Which word is it?",
   "Read the word. Then find its picture."
  ],
  "check": [
   "My turn. Check me!",
   "I built {ans}. Am I right?"
  ],
  "show": [
   "The space lab needs signs. Build each one!"
  ]
 },
 "reasons": {
  "team": [
   "Oops. I left out a vowel of the team."
  ],
  "mid": [
   "Oops. I built the middle vowel wrong."
  ],
  "last": [
   "Oops. I built the last sound wrong."
  ]
 },
 "home": "Ask {name}: \"What word has the team in boat?\""
}
```

<details><summary>The API's first draft</summary>

```text
Build Vowel Teams (build4), grade 2, the little pet
Idea: Both vowels go in a vowel team.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Let's sort the pictures. Put each with its pattern.
Name it:
  - Look at {letter}. Here are {a} and {b}.
  - Both vowels go in a vowel team.
  - Both vowels go in a vowel team.
Together:
  - Look at the picture. Build {word} with me.
  - Listen to {word}. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space lab needs signs. Build each one!
Reasons the pet gives when it is caught:
  team: Look again. I missed a vowel in the team.
  mid: Oops. I picked the wrong middle sound. Listen again.
  last: Oops. I missed the last sound. Say it slowly.
Tonight's question: Ask {name}: "What word has the team in boat?"
About 3.3 minutes.
```

</details>
