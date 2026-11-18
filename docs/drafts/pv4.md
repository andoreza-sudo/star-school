# Draft: Place Value to 999,999 (pv4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Place Value to 999,999 (pv4), grade 4, the kid pet
Idea: Each place is worth ten times the place to its right.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Make any number you like on the place value chart. Any way works.
Name it:
  - You built {n}.
  - Look at the {a}. It is worth {value}.
  - Each place is worth ten times the place to its right.
Together:
  - Let us build {n} on the chart.
  - Look at this chart. What is the {a} worth?
  - In symbols what is the {a} worth in {n}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a part number. What is the {a} worth in {n}?
Reasons the pet gives when it is caught:
  given: I said the number I could see. Look closer at the chart!
  place: I mixed up the places. Check the chart again.
Tonight's question: Ask {name}: What is the value of the digit four in forty two thousand?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "pv4",
 "t": "Place Value to 999,999",
 "grade": 4,
 "age": "kid",
 "idea": "Each place is worth ten times the place to its right.",
 "beats": {
  "remember": [
   "Do you remember this? Make {n} with blocks."
  ],
  "explore": [
   "Make any number you like on the place value chart. Any way works."
  ],
  "name": [
   "You built {n}.",
   "Look at the {a}. It is worth {value}.",
   "Each place is worth ten times the place to its right."
  ],
  "together": [
   "Let us build {n} on the chart.",
   "Look at this chart. What is the {a} worth?",
   "In symbols what is the {a} worth in {n}?"
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory needs a part number. What is the {a} worth in {n}?"
  ]
 },
 "reasons": {
  "given": [
   "I said the number I could see. Look closer at the chart!"
  ],
  "place": [
   "I mixed up the places. Check the chart again."
  ]
 },
 "home": "Ask {name}: What is the value of the digit four in forty two thousand?"
}
```
