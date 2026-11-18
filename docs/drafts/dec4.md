# Draft: Multiply Decimals (dec4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Multiply Decimals (dec4), grade 5, the teen pet
Idea: Multiply as if there were no points then count the digits after both points.

Remember:
  - Do you remember this times fact? Show me {a} times {b}.
Explore:
  - Use the place value chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Multiply as if there were no points.
  - Then count the digits after both points.
Together:
  - First multiply the same digits without the points.
  - Next put the point into the answer.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs some mixes. Find each amount.
  - The lab needs more mixes. Find each amount.
Reasons the pet gives when it is caught:
  dpt: I put the point in the wrong place. Count the digits after both points.
  slip: I slipped in the multiplying. Check that step.
Tonight's question: Ask {name}: What is four and two tenths times three?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Both reasons were the pet's general tone lines and did not say the mistake.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "dec4",
 "t": "Multiply Decimals",
 "grade": 5,
 "age": "teen",
 "idea": "Multiply as if there were no points then count the digits after both points.",
 "beats": {
  "remember": [
   "Do you remember this times fact? Show me {a} times {b}."
  ],
  "explore": [
   "Use the place value chart. Make any decimal you like."
  ],
  "name": [
   "You made {n}.",
   "Multiply as if there were no points.",
   "Then count the digits after both points."
  ],
  "together": [
   "First multiply the same digits without the points.",
   "Next put the point into the answer.",
   "Now try the problem in symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab needs some mixes. Find each amount.",
   "The lab needs more mixes. Find each amount."
  ]
 },
 "reasons": {
  "dpt": [
   "I put the point in the wrong place. Count the digits after both points."
  ],
  "slip": [
   "I slipped in the multiplying. Check that step."
  ]
 },
 "home": "Ask {name}: What is four and two tenths times three?"
}
```

<details><summary>The API's first draft</summary>

```text
Multiply Decimals (dec4), grade 5, the teen pet
Idea: Multiply as if there were no points then count the digits after both points.

Remember:
  - Do you remember this times fact? Show me {a} times {b}.
Explore:
  - Use the place value chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Multiply as if there were no points.
  - Then count the digits after both points.
Together:
  - First multiply the same digits without the points.
  - Next put the point into the answer.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs some mixes. Find each amount.
  - The lab needs more mixes. Find each amount.
Reasons the pet gives when it is caught:
  dpt: Look again. That one was wrong. | Picture it first.
  slip: Look again. That one was wrong. | Use the model.
Tonight's question: Ask {name}: What is four and two tenths times three?
About 3.3 minutes.
```
</details>
