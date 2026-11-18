# Draft: Hear a Number (pk_num1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Hear a Number (pk_num1), grade -1, the little pet
Idea: A number tells how many.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with counters. Any way you like!
Name it:
  - You put {n} in the frame.
  - This says {n}.
  - A number tells how many.
Together:
  - Make {n} in the frame.
  - Count the dots. Tap their number.
  - Listen. Tap the number you hear.
Check me:
  - My turn. Check me!
  - I think it is {ans}.
Show:
  - The path needs {n} stones. Put them in the frame.
Reasons the pet gives when it is caught:
  look: Oops. Those numbers look alike. Look closely.
  off1: Oops. I was one off. Count again.
Tonight's question: Ask {name} to show you 3 fingers, then find the number 3.
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- "Numeral" is not a Pre-K word: "number".
- Reasons fit both ways; the first reason for look said what to do.
- Tonight's question was about steps to bed (hard to check): now the hand-written one.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pk_num1",
 "t": "Hear a Number",
 "grade": -1,
 "age": "little",
 "idea": "A number tells how many.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Fill the frame with counters. Any way you like!"
  ],
  "name": [
   "You put {n} in the frame.",
   "This says {n}.",
   "A number tells how many."
  ],
  "together": [
   "Make {n} in the frame.",
   "Count the dots. Tap their number.",
   "Listen. Tap the number you hear."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}."
  ],
  "show": [
   "The path needs {n} stones. Put them in the frame."
  ]
 },
 "reasons": {
  "look": [
   "Oops. Those numbers look alike. Look closely."
  ],
  "off1": [
   "Oops. I was one off. Count again."
  ]
 },
 "home": "Ask {name} to show you 3 fingers, then find the number 3."
}
```

<details><summary>The API's first draft</summary>

```text
Hear a Number (pk_num1), grade -1, the little pet
Idea: A number tells how many.

Remember:
  - Do you remember this? Show me how many.
Explore:
  - Fill the frame with counters. Any way you like!
Name it:
  - You put {n} in the frame.
  - This says {n}.
  - A number tells how many.
Together:
  - Make {n} in the frame.
  - Look at the dots. Tap the numeral.
  - Hear the number. Tap its numeral.
Check me:
  - My turn. Check me!
  - I think it is {ans}.
Show:
  - The path needs {n} stones. Put them in the frame.
Reasons the pet gives when it is caught:
  look: Look again. They look alike.
  off1: One too many. Look once more.
Tonight's question: Ask {name}: How many steps did you take to your bed?
About 3.2 minutes.
```

</details>
