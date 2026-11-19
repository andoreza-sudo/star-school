# Draft: Build Sentences (sent3)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Build Sentences (sent3), grade 2, the little pet
Idea: Words go in an order that makes sense.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Put the words in order. Then read it to me.
Name it:
  - Read it out loud.
  - The words go in an order that makes sense.
Together:
  - Put the words in order. Start with the capital.
  - Which one makes sense, with the right end mark?
  - Read each one out loud. Which sounds right?
Check me:
  - My turn. Check me!
  - I pick this one: {ans} Am I right?
Show:
  - The space station needs messages. Build each one!
Reasons the pet gives when it is caught:
  wOrder: Oops. I mixed up the order of the words.
  endMk: Oops. I used the wrong end mark.
Tonight's question: Ask {name} to make a sentence with "dog", "the" and "runs".
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The API wrote a lesson about ABC order (letters, what comes after), not about building sentences: every line is rewritten for word order.
- The reasons were said to the child ("The order is wrong"); they are now the pet's slips.
- Tonight's question asked for a letter after G; it now asks for a sentence from three words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sent3",
 "t": "Build Sentences",
 "grade": 2,
 "age": "little",
 "idea": "Words go in an order that makes sense.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Put the words in order. Then read it to me."
  ],
  "name": [
   "Read it out loud.",
   "The words go in an order that makes sense."
  ],
  "together": [
   "Put the words in order. Start with the capital.",
   "Which one makes sense, with the right end mark?",
   "Read each one out loud. Which sounds right?"
  ],
  "check": [
   "My turn. Check me!",
   "I pick this one: {ans} Am I right?"
  ],
  "show": [
   "The space station needs messages. Build each one!"
  ]
 },
 "reasons": {
  "wOrder": [
   "Oops. I mixed up the order of the words."
  ],
  "endMk": [
   "Oops. I used the wrong end mark."
  ]
 },
 "home": "Ask {name} to make a sentence with \"dog\", \"the\" and \"runs\"."
}
```

<details><summary>The API's first draft</summary>

```text
Build Sentences (sent3), grade 2, the little pet
Idea: Each letter has its place in the ABC.

Remember:
  - Do you remember this? What comes after the letter?
Explore:
  - Put these letters in ABC order.
Name it:
  - Listen as we sing them in order.
  - Each letter has its place in the ABC.
Together:
  - Build the order with the letter tiles.
  - Look at the ABC strip. What comes after this?
  - What comes after this letter?
Check me:
  - My turn. Check me!
  - I pick this one: {ans} Am I right?
Show:
  - The space station needs labels in ABC order. Tap the next letter!
Reasons the pet gives when it is caught:
  wOrder: Look again. The order is wrong.
  endMk: Look again. We need the right end mark.
Tonight's question: Ask {name}: "What letter comes after G in the ABC?"
About 3.3 minutes.
```

</details>
