# Draft: Plurals (gram3)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Plurals (gram3), grade 2, the little pet
Idea: More than one: add s, or es after x, s, sh, ch.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the pictures: add s, or add e s?
Name it:
  - More than one {b}: add s.
  - More than one {a}: add e and s.
  - Words that end in x, s, sh or ch add e s.
Together:
  - Build the word for more than one {word}.
  - Say the word for more than one {word}.
  - Read it. Which word means more than one {word}?
Check me:
  - My turn. Check me!
  - For more than one, I pick {ans}. Am I right?
Show:
  - The pet shop counts toys. Pick the word for more than one!
Reasons the pet gives when it is caught:
  plEs: Oops. I only added s. This word needs e s.
  plE: Oops. I added e s. This word just needs s.
  plNo: Oops. I forgot the ending for more than one.
Tonight's question: Ask {name}: "One box, two what? One cat, two what?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The plEs reason said "We add es only after x s sh or ch" for a word that DOES end that way (the pet added only s); each reason now says what the pet did.
- Check me said only "{ans}. Am I right?"; it now says it is the word for more than one.
- The idea had no commas ("x s sh or ch"); it is now the fallback's.
- Name it said "Look at {a} and {b}"; it now says each one's ending and the rule.
- Together lines 2 and 3 said "Which word fits?"; they now name the word for one.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "gram3",
 "t": "Plurals",
 "grade": 2,
 "age": "little",
 "idea": "More than one: add s, or es after x, s, sh, ch.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Sort the pictures: add s, or add e s?"
  ],
  "name": [
   "More than one {b}: add s.",
   "More than one {a}: add e and s.",
   "Words that end in x, s, sh or ch add e s."
  ],
  "together": [
   "Build the word for more than one {word}.",
   "Say the word for more than one {word}.",
   "Read it. Which word means more than one {word}?"
  ],
  "check": [
   "My turn. Check me!",
   "For more than one, I pick {ans}. Am I right?"
  ],
  "show": [
   "The pet shop counts toys. Pick the word for more than one!"
  ]
 },
 "reasons": {
  "plEs": [
   "Oops. I only added s. This word needs e s."
  ],
  "plE": [
   "Oops. I added e s. This word just needs s."
  ],
  "plNo": [
   "Oops. I forgot the ending for more than one."
  ]
 },
 "home": "Ask {name}: \"One box, two what? One cat, two what?\""
}
```

<details><summary>The API's first draft</summary>

```text
Plurals (gram3), grade 2, the little pet
Idea: Add s for more than one. Add es after x s sh or ch.

Remember:
  - Do you remember this? Read the sight word.
Explore:
  - Sort the pictures into add s and add es.
Name it:
  - Look at {a} and {b}.
  - We add es to {a}.
  - We add s to {b}.
Together:
  - Look at the picture. Build the word for more than one.
  - Look at the pictures. Which word fits?
  - Look at the word. Which word fits?
Check me:
  - My turn. Check me!
  - {ans}. Am I right?
Show:
  - The pet shop needs signs. Pick the right word for each!
Reasons the pet gives when it is caught:
  plEs: Look again. We add es only after x s sh or ch.
  plE: Look again. We add only s to most words.
  plNo: Look again. Add s or es for more than one.
Tonight's question: Ask {name}: "What is the word for more than one box?"
About 3.3 minutes.
```

</details>
