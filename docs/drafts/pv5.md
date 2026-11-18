# Draft: Decimal Place Value (pv5)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Decimal Place Value (pv5), grade 5, the teen pet
Idea: Each place is worth ten times the place to its right.

Remember:
  - Do you remember this? Show me {n} with the blocks.
Explore:
  - Make any number you like on the place value chart.
Name it:
  - You built {n}.
  - Look at the {a}. It is worth {value}.
  - Each place is worth ten times the place to its right.
Together:
  - Let's build {n} on the chart.
  - What is the {a} worth here?
  - What is the {a} worth in {n}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab needs a reading. What is the {a} worth in {n}?
Reasons the pet gives when it is caught:
  given: I said the number I could see. Look at the chart!
  place: I mixed up the places. Look again at the chart.
Tonight's question: Ask {name}: "What is the value of the 4 in 2.45?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "pv5",
 "t": "Decimal Place Value",
 "grade": 5,
 "age": "teen",
 "idea": "Each place is worth ten times the place to its right.",
 "beats": {
  "remember": [
   "Do you remember this? Show me {n} with the blocks."
  ],
  "explore": [
   "Make any number you like on the place value chart."
  ],
  "name": [
   "You built {n}.",
   "Look at the {a}. It is worth {value}.",
   "Each place is worth ten times the place to its right."
  ],
  "together": [
   "Let's build {n} on the chart.",
   "What is the {a} worth here?",
   "What is the {a} worth in {n}?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab needs a reading. What is the {a} worth in {n}?"
  ]
 },
 "reasons": {
  "given": [
   "I said the number I could see. Look at the chart!"
  ],
  "place": [
   "I mixed up the places. Look again at the chart."
  ]
 },
 "home": "Ask {name}: \"What is the value of the 4 in 2.45?\""
}
```
