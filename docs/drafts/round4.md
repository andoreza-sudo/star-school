# Draft: Round Decimals (round4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Round Decimals (round4), grade 5, the teen pet
Idea: Find the round numbers a decimal sits between, then pick the nearer one.

Remember:
  - Do you remember this? What comes next counting by tens from {k}?
Explore:
  - Put the pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - Halfway rounds up.
Together:
  - Mark {n} on the line then slide the pin to the nearer round number.
  - Here is the line. What does it round to?
  - Round {n} with no line.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lava needs a round number for the next step. Round {n}.
Reasons the pet gives when it is caught:
  trunc: Look again. We round up at half.
  rup: This one is not halfway. It is closer to the lower round number.
Tonight's question: Ask {name}: "What is three point seven rounded to the nearest whole number?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea had a number word ("two"); Name it used {a} as the number below.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "round4",
 "t": "Round Decimals",
 "grade": 5,
 "age": "teen",
 "idea": "Find the round numbers a decimal sits between, then pick the nearer one.",
 "beats": {
  "remember": [
   "Do you remember this? What comes next counting by tens from {k}?"
  ],
  "explore": [
   "Put the pin anywhere on this number line between {a} and {b}."
  ],
  "name": [
   "Your number is {n}.",
   "It rounds to {a}.",
   "Halfway rounds up."
  ],
  "together": [
   "Mark {n} on the line then slide the pin to the nearer round number.",
   "Here is the line. What does it round to?",
   "Round {n} with no line."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lava needs a round number for the next step. Round {n}."
  ]
 },
 "reasons": {
  "trunc": [
   "Look again. We round up at half."
  ],
  "rup": [
   "This one is not halfway. It is closer to the lower round number."
  ]
 },
 "home": "Ask {name}: \"What is three point seven rounded to the nearest whole number?\""
}
```

<details><summary>The API's first draft</summary>

```text
Round Decimals (round4), grade 5, the teen pet
Idea: Find the two round numbers a decimal sits between then pick the nearer one. Halfway rounds up.

Remember:
  - Do you remember this? What comes next counting by tens from {k}?
Explore:
  - Put the pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It sits between {a} and the next round number.
  - The nearer one is {a}.
Together:
  - Mark {n} on the line then slide the pin to the nearer round number.
  - Here is the line. What does it round to?
  - Round {n} with no line.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lava needs a round number for the next step. Round {n}.
Reasons the pet gives when it is caught:
  trunc: Look again. We round up at half.
  rup: This one is not halfway. It is closer to the lower round number.
Tonight's question: Ask {name}: "What is three point seven rounded to the nearest whole number?"
About 3.4 minutes.
```
</details>
