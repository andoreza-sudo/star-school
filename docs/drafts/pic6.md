# Draft: Vowel Teams 2 (pic6)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Vowel Teams 2 (pic6), grade 2, the little pet
Idea: Some letter teams make one new sound: oo, ou, ow.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - {a} and {b} both have {letter}.
  - Both letters make one sound together.
  - Some letter teams make one new sound.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The workshop needs its signs read. Read each one!
Reasons the pet gives when it is caught:
  mid: Oops. I read the team in the middle wrong.
  blend: Oops. I left out a letter at the start.
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name} for words with "ou" in them, like house.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember named the word sun (the warm-up picks its own word).
- Name it said "Look at {letter} in {a} and {b}"; now it says what both pictures share.
- Show was two sentences about the moon and a house (Show reads its own sentence); it is now the job line.
- "Both letters work together" was said twice.
- Tonight's question used a pattern word in quotes; kept, with house.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pic6",
 "t": "Vowel Teams 2",
 "grade": 2,
 "age": "little",
 "idea": "Some letter teams make one new sound: oo, ou, ow.",
 "beats": {
  "remember": [
   "Do you remember this? Listen to the first sound."
  ],
  "explore": [
   "Let's sort the pictures. Put each one with its letter team."
  ],
  "name": [
   "{a} and {b} both have {letter}.",
   "Both letters make one sound together.",
   "Some letter teams make one new sound."
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
   "The workshop needs its signs read. Read each one!"
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
 "home": "Ask {name} for words with \"ou\" in them, like house."
}
```

<details><summary>The API's first draft</summary>

```text
Vowel Teams 2 (pic6), grade 2, the little pet
Idea: Both letters work together to make one sound.

Remember:
  - Do you remember this? Listen for the first sound of sun.
Explore:
  - Let's sort the pictures. Put each with its letter pattern.
Name it:
  - Look at {letter} in {a} and {b}.
  - Both letters make one sound together.
  - Both letters work together to make one sound.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The moon is up. The house is quiet.
Reasons the pet gives when it is caught:
  mid: Look again. I missed the middle sound.
  blend: Oops. I left out one letter in the blend.
  first: Look again. I missed the first sound.
  last: Oops. I missed the last sound.
Tonight's question: Ask {name}: "Can you find a word with oo like in moon?"
About 3.3 minutes.
```

</details>
