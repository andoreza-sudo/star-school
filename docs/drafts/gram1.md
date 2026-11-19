# Draft: Capitals & End Marks (gram1)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Capitals & End Marks (gram1), grade 1, the little pet
Idea: A sentence starts with a capital and ends with a mark.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Fix it: tap for a capital, then tap an end mark.
Name it:
  - A sentence starts with a capital letter.
  - Telling ends with a period.
  - Asking ends with a question mark.
Together:
  - Fix it with me: a capital, then the end mark.
  - Look at the picture. Which way is written right?
  - Which way is written right? Check the start and the end.
Check me:
  - My turn. Check me!
  - I pick this one: {ans} Am I right?
Show:
  - The reef shop needs signs. Pick the one written right!
Reasons the pet gives when it is caught:
  capOff: Oops. I forgot the capital letter at the start.
  endMk: Oops. I used the wrong end mark.
Tonight's question: Ask {name} to point to the capital and the end mark in a sentence.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea was 18 words, too long for the little pet; it is now the fallback's one sentence.
- Each reason began with "You caught my mistake!", which the app says itself: removed.
- Explore said "Look at the picture. Fix its sentence"; this line is what the app says with the fixer, so it now says how (the capital button, then a mark).
- Name it said "This sentence ... This one ..." with no sentence pointed at; it now states the three rules shown.
- Together line 1 said "Listen to my sentence": the fixer is read, not heard; the lines now say what to check.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "gram1",
 "t": "Capitals & End Marks",
 "grade": 1,
 "age": "little",
 "idea": "A sentence starts with a capital and ends with a mark.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Fix it: tap for a capital, then tap an end mark."
  ],
  "name": [
   "A sentence starts with a capital letter.",
   "Telling ends with a period.",
   "Asking ends with a question mark."
  ],
  "together": [
   "Fix it with me: a capital, then the end mark.",
   "Look at the picture. Which way is written right?",
   "Which way is written right? Check the start and the end."
  ],
  "check": [
   "My turn. Check me!",
   "I pick this one: {ans} Am I right?"
  ],
  "show": [
   "The reef shop needs signs. Pick the one written right!"
  ]
 },
 "reasons": {
  "capOff": [
   "Oops. I forgot the capital letter at the start."
  ],
  "endMk": [
   "Oops. I used the wrong end mark."
  ]
 },
 "home": "Ask {name} to point to the capital and the end mark in a sentence."
}
```

<details><summary>The API's first draft</summary>

```text
Capitals & End Marks (gram1), grade 1, the little pet
Idea: Sentences start with a capital. Telling ones end with a period. Asking ones end with a question mark.

Remember:
  - Do you remember this? Read the sight word.
Explore:
  - Look at the picture. Fix its sentence.
Name it:
  - This sentence starts with a capital letter.
  - This one tells something. It ends with a period.
  - This one asks something. It ends with a question mark.
Together:
  - Listen to my sentence. Fix it with me.
  - Look at the picture. Which way is right?
  - Which way is right?
Check me:
  - My turn. Check me!
  - I pick this one: {ans} Am I right?
Show:
  - The ocean reef needs signs. Fix each one!
Reasons the pet gives when it is caught:
  capOff: You caught my mistake! | I forgot the capital at the start.
  endMk: You caught my mistake! | I used the wrong end mark.
Tonight's question: Ask {name}: "Can you read me a telling sentence and an asking sentence?"
About 3.3 minutes.
```

</details>
