# Draft: Fractions on a Line (frac3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Fractions on a Line (frac3), grade 3, the kid pet
Idea: A fraction is a point on the line.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Mark any spot on the line. Tap the pin.
Name it:
  - Your mark shows {top} of {bottom}.
  - A fraction is a point on the line.
Together:
  - Mark {top} of {bottom} on this line.
  - What fraction is marked here?
  - Name this fraction.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail has marks on a line. Type the fraction at each mark.
Reasons the pet gives when it is caught:
  ticks: Count the jumps. Not the marks.
  flip: The top tells jumps from zero.
Tonight's question: Ask {name}: "Show me half way on a line from zero to one."
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line said "Tap it", but Show is typed.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "frac3",
 "t": "Fractions on a Line",
 "grade": 3,
 "age": "kid",
 "idea": "A fraction is a point on the line.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Mark any spot on the line. Tap the pin."
  ],
  "name": [
   "Your mark shows {top} of {bottom}.",
   "A fraction is a point on the line."
  ],
  "together": [
   "Mark {top} of {bottom} on this line.",
   "What fraction is marked here?",
   "Name this fraction."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The trail has marks on a line. Type the fraction at each mark."
  ]
 },
 "reasons": {
  "ticks": [
   "Count the jumps. Not the marks."
  ],
  "flip": [
   "The top tells jumps from zero."
  ]
 },
 "home": "Ask {name}: \"Show me half way on a line from zero to one.\""
}
```

<details><summary>The API's first draft</summary>

```text
Fractions on a Line (frac3), grade 3, the kid pet
Idea: A fraction is a point on the line.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Mark any spot on the line. Tap the pin.
Name it:
  - Your mark shows {top} of {bottom}.
  - A fraction is a point on the line.
Together:
  - Mark {top} of {bottom} on this line.
  - What fraction is marked here?
  - Name this fraction.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a mark at the right spot. Tap it.
Reasons the pet gives when it is caught:
  ticks: Count the jumps. Not the marks.
  flip: The top tells jumps from zero.
Tonight's question: Ask {name}: "Show me half way on a line from zero to one."
About 3.2 minutes.
```
</details>
