# Draft: Numbers to 10 (pk_num2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Numbers to 10 (pk_num2), grade -1, the little pet
Idea: A number tells how many.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with any counters you like.
Name it:
  - You put {n} in the frame.
  - This says {n}.
  - Every number has its own shape.
Together:
  - Put {n} in the frame for me.
  - Count the dots. Tap their number.
  - Listen. Tap the number you hear.
Check me:
  - My turn. Check me!
  - I think it is {ans}.
Show:
  - The path needs {n} stones. Put them in the frame.
  - The shop needs {n} apples. Put them in the frame.
Reasons the pet gives when it is caught:
  look: Oops. Those numbers look alike. Look closely.
  off1: Oops. I was one off. Count again.
Tonight's question: Ask {name} to find a 7 on a clock or a page.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- "Numeral" is not a Pre-K word.
- The first off1 reason said "take one out" (true only one way).
- Tonight's question was the same as Count to 5's.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pk_num2",
 "t": "Numbers to 10",
 "grade": -1,
 "age": "little",
 "idea": "A number tells how many.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Fill the frame with any counters you like."
  ],
  "name": [
   "You put {n} in the frame.",
   "This says {n}.",
   "Every number has its own shape."
  ],
  "together": [
   "Put {n} in the frame for me.",
   "Count the dots. Tap their number.",
   "Listen. Tap the number you hear."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}."
  ],
  "show": [
   "The path needs {n} stones. Put them in the frame.",
   "The shop needs {n} apples. Put them in the frame."
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
 "home": "Ask {name} to find a 7 on a clock or a page."
}
```

<details><summary>The API's first draft</summary>

```text
Numbers to 10 (pk_num2), grade -1, the little pet
Idea: A number tells how many.

Remember:
  - Do you remember this? Show me how many you see.
Explore:
  - Fill the frame with any counters you like.
Name it:
  - You put {n} in the frame.
  - This says {n}.
  - The numeral shows how many.
Together:
  - Put {n} in the frame for me.
  - Look at the dots. Tap its numeral.
  - Hear the number. Tap its numeral.
Check me:
  - My turn. Check me!
  - I think it is {ans}.
Show:
  - The path needs {n} stones. Put them in the frame.
  - The shop needs {n} apples. Put them in the frame.
Reasons the pet gives when it is caught:
  look: That looks like another numeral. Look again.
  off1: One too many. Take one out. | One is missing. Put one in.
Tonight's question: Ask {name}: "Can you show me four fingers?"
About 3.3 minutes.
```

</details>
