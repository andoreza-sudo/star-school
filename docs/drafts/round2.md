# Draft: Round to 100 (round2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Round to 100 (round2), grade 3, the kid pet
Idea: Find the hundreds a number sits between, then pick the nearer one. Halfway rounds up.

Remember:
  - Do you remember this? What comes next counting by tens from {k}?
Explore:
  - Put a pin anywhere on this number line.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - We round to the nearer hundred.
Together:
  - Find the hundreds around {n}.
  - Now slide the pin to the nearer hundred.
  - Type the number we round to.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs a sign at each hundred. Round {n} to the nearest hundred.
Reasons the pet gives when it is caught:
  trunc: It is halfway or past it. Round up to the next hundred.
  rup: It is not halfway yet. Round down to the lower hundred.
Tonight's question: Ask {name}: "What would you round 730 to, the nearest hundred?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea had a number word ("two"); Name it used {a} as the hundred below; the Show line was unclear.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "round2",
 "t": "Round to 100",
 "grade": 3,
 "age": "kid",
 "idea": "Find the hundreds a number sits between, then pick the nearer one. Halfway rounds up.",
 "beats": {
  "remember": [
   "Do you remember this? What comes next counting by tens from {k}?"
  ],
  "explore": [
   "Put a pin anywhere on this number line."
  ],
  "name": [
   "Your number is {n}.",
   "It rounds to {a}.",
   "We round to the nearer hundred."
  ],
  "together": [
   "Find the hundreds around {n}.",
   "Now slide the pin to the nearer hundred.",
   "Type the number we round to."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs a sign at each hundred. Round {n} to the nearest hundred."
  ]
 },
 "reasons": {
  "trunc": [
   "It is halfway or past it. Round up to the next hundred."
  ],
  "rup": [
   "It is not halfway yet. Round down to the lower hundred."
  ]
 },
 "home": "Ask {name}: \"What would you round 730 to, the nearest hundred?\""
}
```

<details><summary>The API's first draft</summary>

```text
Round to 100 (round2), grade 3, the kid pet
Idea: Find the two round numbers a number sits between then pick the nearer one.

Remember:
  - Do you remember this? What comes next counting by tens from {k}?
Explore:
  - Put a pin anywhere on this number line.
Name it:
  - Your number is {n}. It sits between {a} and another hundred.
  - Which is nearer to {n}?
  - We round to the nearer hundred.
Together:
  - Find the hundreds around {n}.
  - Now slide the pin to the nearer hundred.
  - Type the number we round to.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs a sign at each hundred. Put the right sign by {n}.
Reasons the pet gives when it is caught:
  trunc: It is past halfway. Round up to the next hundred.
  rup: It is not halfway yet. Round down to the lower hundred.
Tonight's question: Ask {name}: "What would you round 73 to, the nearest ten?"
About 3.3 minutes.
```
</details>

Fixed after review (2026-11-18): rounding lines now say halfway rounds up, and tonight's question is about hundreds; the owner had approved this lesson, these are factual corrections only.
