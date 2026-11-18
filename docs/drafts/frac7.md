# Draft: Simplest Form (frac7)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Simplest Form (frac7), grade 4, the kid pet
Idea: The simplest form has the fewest biggest parts.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade the same amount on both bars. Any way works.
Name it:
  - You shaded the same amount.
  - That is {a} of {x} parts on top and {b} of {y} below.
  - The simplest form has the fewest biggest parts.
Together:
  - Shade the bottom bar to match the top bar.
  - Type the missing number to match.
  - Write the same fraction in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs the simplest form. Write {top} over {bottom} in simplest form.
Reasons the pet gives when it is caught:
  oneSide: We divide the top and the bottom by the same number.
  flip: The top tells the shaded parts. The bottom tells all the parts.
Tonight's question: Ask {name}: "Can you draw a picture for four sixths in simplest form?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line asked "What is {top} of {bottom}?".
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "frac7",
 "t": "Simplest Form",
 "grade": 4,
 "age": "kid",
 "idea": "The simplest form has the fewest biggest parts.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Shade the same amount on both bars. Any way works."
  ],
  "name": [
   "You shaded the same amount.",
   "That is {a} of {x} parts on top and {b} of {y} below.",
   "The simplest form has the fewest biggest parts."
  ],
  "together": [
   "Shade the bottom bar to match the top bar.",
   "Type the missing number to match.",
   "Write the same fraction in symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs the simplest form. Write {top} over {bottom} in simplest form."
  ]
 },
 "reasons": {
  "oneSide": [
   "We divide the top and the bottom by the same number."
  ],
  "flip": [
   "The top tells the shaded parts. The bottom tells all the parts."
  ]
 },
 "home": "Ask {name}: \"Can you draw a picture for four sixths in simplest form?\""
}
```

<details><summary>The API's first draft</summary>

```text
Simplest Form (frac7), grade 4, the kid pet
Idea: The simplest form has the fewest biggest parts.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade the same amount on both bars. Any way works.
Name it:
  - You shaded the same amount.
  - That is {a} of {x} parts on top and {b} of {y} below.
  - The simplest form has the fewest biggest parts.
Together:
  - Shade the bottom bar to match the top bar.
  - Type the missing number to match.
  - Write the same fraction in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs the simplest form. What is {top} of {bottom}?
Reasons the pet gives when it is caught:
  oneSide: We divide the top and the bottom by the same number.
  flip: The top tells the shaded parts. The bottom tells all the parts.
Tonight's question: Ask {name}: "Can you draw a picture for four sixths in simplest form?"
About 3.4 minutes.
```
</details>
