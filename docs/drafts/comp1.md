# Draft: Story Time (comp1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Story Time (comp1), grade 1, the little pet
Idea: A story tells who, what and where. Listen for each one.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the pictures: who, what or where?
Name it:
  - The {a} is a who.
  - The {b} is a what.
  - A story tells who, what and where.
Together:
  - Look at the pictures as you listen.
  - Listen to the story. Then answer.
  - Listen, then read the words to answer.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The candy shop has story time. Answer each question!
Reasons the pet gives when it is caught:
  stWho: Oops. I mixed up who did what.
  stOut: Oops. That was not in the story.
Tonight's question: Ask {name}: "Who was in a story you heard today?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Each reason began with "You caught my mistake!", which the app already says when the child catches the pet: removed.
- Together line 1 asked "What is the story?" before a question about it; the lines now say how to listen (pictures, every part, then read the answers).
- Name it says who and what as "The dog is a who", as the app's own reaction does.
- Remember said "Look for the sight word"; the warm-up says its word, so it is now "Tap it".
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "comp1",
 "t": "Story Time",
 "grade": 1,
 "age": "little",
 "idea": "A story tells who, what and where. Listen for each one.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Sort the pictures: who, what or where?"
  ],
  "name": [
   "The {a} is a who.",
   "The {b} is a what.",
   "A story tells who, what and where."
  ],
  "together": [
   "Look at the pictures as you listen.",
   "Listen to the story. Then answer.",
   "Listen, then read the words to answer."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. Am I right?"
  ],
  "show": [
   "The candy shop has story time. Answer each question!"
  ]
 },
 "reasons": {
  "stWho": [
   "Oops. I mixed up who did what."
  ],
  "stOut": [
   "Oops. That was not in the story."
  ]
 },
 "home": "Ask {name}: \"Who was in a story you heard today?\""
}
```

<details><summary>The API's first draft</summary>

```text
Story Time (comp1), grade 1, the little pet
Idea: Stories tell us who, what and where.

Remember:
  - Do you remember this? Look for the sight word.
Explore:
  - Let's sort the pictures. Who, what and where.
Name it:
  - {a} is the who. {b} is the what.
  - The pictures show who, what and where.
  - Stories tell us who, what and where.
Together:
  - Look at the pictures. What is the story?
  - Listen to the story. Pick the answer.
  - Read the story. Then pick the answer.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The candy shop needs signs. Listen to each story!
Reasons the pet gives when it is caught:
  stWho: You caught my mistake! | I mixed up who did what.
  stOut: You caught my mistake! | I picked something not in the story.
Tonight's question: Ask {name}: "Who was in your story today?"
About 3.3 minutes.
```

</details>
