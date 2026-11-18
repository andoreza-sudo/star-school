# Draft: Count to 10 (pk_count2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Count to 10 (pk_count2), grade -1, the little pet
Idea: Each thing gets one number.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with counters. Any way you like!
Name it:
  - You put in {n}.
  - Each thing gets one number.
  - The last number tells how many.
Together:
  - Put in {n} counters with me.
  - Count each one in the picture.
  - Listen. Tap the number you hear.
Check me:
  - My turn. Check me!
  - I count {ans}. Am I right?
Show:
  - The shop needs {n} apples. Put them in the frame!
  - The pond needs {n} fish. Put them in the frame!
Reasons the pet gives when it is caught:
  off1: Oops. I was one off. Count again, one by one.
Tonight's question: Ask {name}: "Can you count 8 things for me?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "We count to {n}" (not the idea): now the last number tells how many.
- Together line 2 said "toys" (the pictures are ducks, apples, stars ...).
- The first reason said "one is left over" (true only one way).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pk_count2",
 "t": "Count to 10",
 "grade": -1,
 "age": "little",
 "idea": "Each thing gets one number.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Fill the frame with counters. Any way you like!"
  ],
  "name": [
   "You put in {n}.",
   "Each thing gets one number.",
   "The last number tells how many."
  ],
  "together": [
   "Put in {n} counters with me.",
   "Count each one in the picture.",
   "Listen. Tap the number you hear."
  ],
  "check": [
   "My turn. Check me!",
   "I count {ans}. Am I right?"
  ],
  "show": [
   "The shop needs {n} apples. Put them in the frame!",
   "The pond needs {n} fish. Put them in the frame!"
  ]
 },
 "reasons": {
  "off1": [
   "Oops. I was one off. Count again, one by one."
  ]
 },
 "home": "Ask {name}: \"Can you count 8 things for me?\""
}
```

<details><summary>The API's first draft</summary>

```text
Count to 10 (pk_count2), grade -1, the little pet
Idea: Each thing gets one number.

Remember:
  - Do you remember this? Show me how you count.
Explore:
  - Fill the frame with counters. Any way you like!
Name it:
  - You put in {n}.
  - Each thing gets one number.
  - We count to {n}.
Together:
  - Put in {n} counters with me.
  - Count the toys with me.
  - Hear a number and tap it.
Check me:
  - My turn. Check me!
  - I count {ans}. Am I right?
Show:
  - The shop needs {n} apples. Put them in the frame!
  - The pond needs {n} fish. Put them in the frame!
Reasons the pet gives when it is caught:
  off1: One is left over. | One is still missing.
Tonight's question: Ask {name}: "Can you count 8 things for me?"
About 3.3 minutes.
```

</details>
