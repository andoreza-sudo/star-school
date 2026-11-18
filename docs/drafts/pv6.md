# Draft: Powers of Ten (pv6)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Powers of Ten (pv6), grade 5, the teen pet
Idea: Times ten moves every digit one place to the left.

Remember:
  - Do you remember this? Make {n} with the blocks.
Explore:
  - Make any number you like on the place value chart.
Name it:
  - You built {n}.
  - Here is {n} times ten. It is {value}.
  - Times ten moves every digit one place to the left.
Together:
  - Build {n} on the chart then times it by {k}.
  - Look at this chart of {n}. What do you get times {k}?
  - Now try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs the reading worked out. Use {n} and {k}.
Reasons the pet gives when it is caught:
  place: I moved the digits one place too far, or not far enough.
  given: I left the number as it was. Every digit must move.
Tonight's question: Ask {name}: "What number is ten times bigger than four hundred?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Reasons were the pet's general tone lines; the Show line "Change {n} by {k}" was unclear.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pv6",
 "t": "Powers of Ten",
 "grade": 5,
 "age": "teen",
 "idea": "Times ten moves every digit one place to the left.",
 "beats": {
  "remember": [
   "Do you remember this? Make {n} with the blocks."
  ],
  "explore": [
   "Make any number you like on the place value chart."
  ],
  "name": [
   "You built {n}.",
   "Here is {n} times ten. It is {value}.",
   "Times ten moves every digit one place to the left."
  ],
  "together": [
   "Build {n} on the chart then times it by {k}.",
   "Look at this chart of {n}. What do you get times {k}?",
   "Now try this one with symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab needs the reading worked out. Use {n} and {k}."
  ],
  "why": [
   "Now the reason, in words."
  ]
 },
 "reasons": {
  "place": [
   "I moved the digits one place too far, or not far enough."
  ],
  "given": [
   "I left the number as it was. Every digit must move."
  ]
 },
 "home": "Ask {name}: \"What number is ten times bigger than four hundred?\""
}
```

<details><summary>The API's first draft</summary>

```text
Powers of Ten (pv6), grade 5, the teen pet
Idea: Times ten moves every digit one place to the left.

Remember:
  - Do you remember this? Make {n} with the blocks.
Explore:
  - Make any number you like on the place value chart.
Name it:
  - You built {n}.
  - Here is {n} times ten. It is {value}.
  - Times ten moves every digit one place to the left.
Together:
  - Build {n} on the chart then times it by {k}.
  - Look at this chart of {n}. What do you get times {k}?
  - Now try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs the right power reading. Change {n} by {k}.
Reasons the pet gives when it is caught:
  place: The digit moved but its place value changed too. | Look again. That one was wrong.
  given: That number is already on the chart. | Picture it first.
Tonight's question: Ask {name}: "What number is ten times bigger than four hundred?"
About 3.4 minutes.
```
</details>
