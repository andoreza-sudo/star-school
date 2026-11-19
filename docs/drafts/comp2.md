# Draft: Story Time 2 (comp2)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Story Time 2 (comp2), grade 1, the little pet
Idea: Listen to the whole story. Each part tells us something.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the pictures: who, what or where?
Name it:
  - The {a} is a who.
  - The {b} is a what.
  - Each part of the story tells us something.
Together:
  - Look at the pictures as you listen.
  - Listen to every part. Then answer.
  - Listen, then read the words to answer.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The reef has story time. Answer each question!
Reasons the pet gives when it is caught:
  stWho: Oops. I mixed up who found it and who got it.
  stOut: Oops. That was not in the story.
Tonight's question: Ask {name} to tell you a story about a dog, then ask "where?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons said "Look again" to the child; each is now the pet's own slip, and the who reason names the two who of these stories (who found, who got).
- Explore said "Listen to the story" before the sort; the app tells the story itself, so the line is now the task.
- Name it said "This is the where" with no place named; it now names who and what (the picture shows where).
- Together line 1 asked "What is the story?" before a question about it; the lines now say how to listen (pictures, every part, then read the answers).
- Tonight's question asked who gave something to a friend today (not about a story); it now asks for a story and its where.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "comp2",
 "t": "Story Time 2",
 "grade": 1,
 "age": "little",
 "idea": "Listen to the whole story. Each part tells us something.",
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
   "Each part of the story tells us something."
  ],
  "together": [
   "Look at the pictures as you listen.",
   "Listen to every part. Then answer.",
   "Listen, then read the words to answer."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. Am I right?"
  ],
  "show": [
   "The reef has story time. Answer each question!"
  ]
 },
 "reasons": {
  "stWho": [
   "Oops. I mixed up who found it and who got it."
  ],
  "stOut": [
   "Oops. That was not in the story."
  ]
 },
 "home": "Ask {name} to tell you a story about a dog, then ask \"where?\""
}
```

<details><summary>The API's first draft</summary>

```text
Story Time 2 (comp2), grade 1, the little pet
Idea: Stories tell who did what and where.

Remember:
  - Do you remember this?
Explore:
  - Listen to the story. Sort the pictures into who, what and where.
Name it:
  - {a} is the who. {b} is the what.
  - This is the where.
  - Stories tell who did what and where.
Together:
  - Look at the pictures. Who is in the story?
  - Listen to the story. Pick the right answer.
  - Read the story. Then pick the right answer.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The ocean reef needs signs. Answer each question!
Reasons the pet gives when it is caught:
  stWho: Look again. That is not who did it.
  stOut: Look again. That is not in the story.
Tonight's question: Ask {name}: "Who gave something to a friend today?"
About 3.3 minutes.
```

</details>
