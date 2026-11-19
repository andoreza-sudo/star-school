# Draft: Opposites (vocab1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Opposites (vocab1), grade 1, the little pet
Idea: Opposites are as different as can be: hot and cold.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Match each word to its opposite.
Name it:
  - {a} and {b} are opposites.
  - They are as different as can be.
Together:
  - Match each word to its opposite.
  - Listen to {word}. What is its opposite?
  - Read the word. Then find its opposite.
Check me:
  - My turn. Check me!
  - I think the opposite of {word} is {ans}.
Show:
  - The reef shop needs labels. Find each opposite!
Reasons the pet gives when it is caught:
  oppSame: Oops. That means about the same, not the opposite.
Tonight's question: Ask {name} for the opposite of "up".
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 1 was the app's own "Now let's do some together."; it now says the pairs task.
- Remember said "Look at these"; the warm-up is a sight word to hear and tap.
- The reason began "Look again"; it is now the pet's slip.
- The idea now gives an example pair (hot and cold).
- Tonight's question used big; now up, as the fallback.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "vocab1",
 "t": "Opposites",
 "grade": 1,
 "age": "little",
 "idea": "Opposites are as different as can be: hot and cold.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Match each word to its opposite."
  ],
  "name": [
   "{a} and {b} are opposites.",
   "They are as different as can be."
  ],
  "together": [
   "Match each word to its opposite.",
   "Listen to {word}. What is its opposite?",
   "Read the word. Then find its opposite."
  ],
  "check": [
   "My turn. Check me!",
   "I think the opposite of {word} is {ans}."
  ],
  "show": [
   "The reef shop needs labels. Find each opposite!"
  ]
 },
 "reasons": {
  "oppSame": [
   "Oops. That means about the same, not the opposite."
  ]
 },
 "home": "Ask {name} for the opposite of \"up\"."
}
```

<details><summary>The API's first draft</summary>

```text
Opposites (vocab1), grade 1, the little pet
Idea: Opposites are words that mean as different as can be.

Remember:
  - Do you remember this? Look at these.
Explore:
  - Let's match each word to its opposite.
Name it:
  - {a} and {b} are opposites.
  - They mean as different as can be.
Together:
  - Now let's do some together.
  - Listen for the opposite of {word}.
  - Read this word. Pick its opposite.
Check me:
  - My turn. Check me!
  - I think the opposite of {word} is {ans}.
Show:
  - The ocean reef needs signs. Help find each opposite!
Reasons the pet gives when it is caught:
  oppSame: Look again. I picked a word that means about the same.
Tonight's question: Ask {name}: "What is the opposite of big?"
About 3.2 minutes.
```

</details>
