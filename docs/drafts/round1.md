# Draft: Round to 10 (round1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Round to 10 (round1), grade 3, the kid pet
Idea: Find the nearer ten on the number line. Halfway rounds up.

Remember:
  - Do you remember this one? What comes next counting by tens from {k}?
Explore:
  - Put the pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - Halfway goes up.
Together:
  - First find the tens it sits between.
  - Now slide the pin to the nearer ten.
  - Type the nearer ten for this number.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a round number of steps. How many for this one?
Reasons the pet gives when it is caught:
  trunc: Look closer. At halfway or past it, we round up.
  rup: Look closer. It is not halfway yet so round down.
Tonight's question: Ask {name}: "What is thirty four rounded to the nearest ten?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "{n} sits between {a} and the next ten", but {a} is the rounded number, which can be the ten above.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "round1",
 "t": "Round to 10",
 "grade": 3,
 "age": "kid",
 "idea": "Find the nearer ten on the number line. Halfway rounds up.",
 "beats": {
  "remember": [
   "Do you remember this one? What comes next counting by tens from {k}?"
  ],
  "explore": [
   "Put the pin anywhere on this number line between {a} and {b}."
  ],
  "name": [
   "Your number is {n}.",
   "It rounds to {a}.",
   "Halfway goes up."
  ],
  "together": [
   "First find the tens it sits between.",
   "Now slide the pin to the nearer ten.",
   "Type the nearer ten for this number."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs a round number of steps. How many for this one?"
  ]
 },
 "reasons": {
  "trunc": [
   "Look closer. At halfway or past it, we round up."
  ],
  "rup": [
   "Look closer. It is not halfway yet so round down."
  ]
 },
 "home": "Ask {name}: \"What is thirty four rounded to the nearest ten?\""
}
```

<details><summary>The API's first draft</summary>

```text
Round to 10 (round1), grade 3, the kid pet
Idea: Find the nearer ten on the number line.

Remember:
  - Do you remember this one? What comes next counting by tens from {k}?
Explore:
  - Put the pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}. It sits between {a} and the next ten.
  - Which ten is nearer to {n}?
  - The nearer ten is {a}.
Together:
  - First find the tens it sits between.
  - Now slide the pin to the nearer ten.
  - Type the nearer ten for this number.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a round number of steps. How many for this one?
Reasons the pet gives when it is caught:
  trunc: Look closer. It is past halfway so round up.
  rup: Look closer. It is not halfway yet so round down.
Tonight's question: Ask {name}: "What is thirty four rounded to the nearest ten?"
About 3.4 minutes.
```
</details>

Fixed after review (2026-11-18): rounding lines now say halfway rounds up; the owner had approved this lesson, these are factual corrections only.
