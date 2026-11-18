# Draft: Divide Decimals (dec5)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Divide Decimals (dec5), grade 5, the teen pet
Idea: Divide as if there were no point then put the point back in the same place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the place value chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Divide as if there were no point.
  - Then put the point back in the same place.
Together:
  - First divide the digits without the point.
  - Now put the point in the answer.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab shares powder evenly between jars. How much does each get?
  - One more batch to share.
Reasons the pet gives when it is caught:
  dpt: I put the point in the wrong place. It stays where it was.
  slip: I slipped in the dividing. Check that step.
Tonight's question: Ask {name}: "What is 4.8 divided by 2?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons were the pet's general tone line; the first Show line had no question.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "dec5",
 "t": "Divide Decimals",
 "grade": 5,
 "age": "teen",
 "idea": "Divide as if there were no point then put the point back in the same place.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Use the place value chart. Make any decimal you like."
  ],
  "name": [
   "You made {n}.",
   "Divide as if there were no point.",
   "Then put the point back in the same place."
  ],
  "together": [
   "First divide the digits without the point.",
   "Now put the point in the answer.",
   "Now try the problem in symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab shares powder evenly between jars. How much does each get?",
   "One more batch to share."
  ]
 },
 "reasons": {
  "dpt": [
   "I put the point in the wrong place. It stays where it was."
  ],
  "slip": [
   "I slipped in the dividing. Check that step."
  ]
 },
 "home": "Ask {name}: \"What is 4.8 divided by 2?\""
}
```

<details><summary>The API's first draft</summary>

```text
Divide Decimals (dec5), grade 5, the teen pet
Idea: Divide as if there were no point then put the point back in the same place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the place value chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Divide as if there were no point.
  - Then put the point back in the same place.
Together:
  - First divide the digits without the point.
  - Now put the point in the answer.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - In the lab we need to share the powder evenly.
  - How much does each get?
Reasons the pet gives when it is caught:
  dpt: Look again. That one was wrong. | The point belongs in the same place as before.
  slip: Look again. That one was wrong. | Check each step once more.
Tonight's question: Ask {name}: "What is 4.8 divided by 2?"
About 3.3 minutes.
```
</details>
