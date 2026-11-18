# Draft: Round Big Numbers (round3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Round Big Numbers (round3), grade 4, the kid pet
Idea: Find the round numbers a number sits between then pick the nearer one. Halfway rounds up.

Remember:
  - Remember this one? What comes next counting by tens from {k}?
Explore:
  - Put a pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - Halfway rounds up.
Together:
  - Find the round numbers {n} sits between.
  - Slide the pin to the nearer round number.
  - What does {n} round to?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory orders parts in round numbers. Round this one.
Reasons the pet gives when it is caught:
  trunc: Look closer. We round up at halfway. | The nearer round number is higher here.
  rup: Look closer. We do not always round up. | The nearer round number is lower here.
Tonight's question: Ask {name}: "What does 472 round to, the nearest hundred?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line said "nearest hundred" (this stop rounds to thousands); Name it used {a} as the number below.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "round3",
 "t": "Round Big Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Find the round numbers a number sits between then pick the nearer one. Halfway rounds up.",
 "beats": {
  "remember": [
   "Remember this one? What comes next counting by tens from {k}?"
  ],
  "explore": [
   "Put a pin anywhere on this number line between {a} and {b}."
  ],
  "name": [
   "Your number is {n}.",
   "It rounds to {a}.",
   "Halfway rounds up."
  ],
  "together": [
   "Find the round numbers {n} sits between.",
   "Slide the pin to the nearer round number.",
   "What does {n} round to?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory orders parts in round numbers. Round this one."
  ]
 },
 "reasons": {
  "trunc": [
   "Look closer. We round up at halfway.",
   "The nearer round number is higher here."
  ],
  "rup": [
   "Look closer. We do not always round up.",
   "The nearer round number is lower here."
  ]
 },
 "home": "Ask {name}: \"What does 472 round to, the nearest hundred?\""
}
```

<details><summary>The API's first draft</summary>

```text
Round Big Numbers (round3), grade 4, the kid pet
Idea: Find the round numbers a number sits between then pick the nearer one. Halfway rounds up.

Remember:
  - Remember this one? What comes next counting by tens from {k}?
Explore:
  - Put a pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It sits between {a} and the next round number.
  - The nearer round number is {a}.
Together:
  - Find the round numbers {n} sits between.
  - Slide the pin to the nearer round number.
  - What does {n} round to?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs round boxes of parts. Round {n} to the nearest hundred for the order.
Reasons the pet gives when it is caught:
  trunc: Look closer. We round up at halfway. | The nearer round number is higher here.
  rup: Look closer. We do not always round up. | The nearer round number is lower here.
Tonight's question: Ask {name}: "What does 472 round to, the nearest hundred?"
About 3.4 minutes.
```
</details>
