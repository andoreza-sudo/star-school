# Draft: 2-Digit Times 2-Digit (mbig4)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
2-Digit Times 2-Digit (mbig4), grade 4, the kid pet
Idea: Multiply each part then add the parts.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Pick any numbers. Use the steppers to build them any way you like.
Name it:
  - You picked {a} and {b}.
  - Each part times each part then add them.
  - {a} times {b} is {sum}.
Together:
  - First break it into parts and multiply each part.
  - Now find each part then add them all.
  - Now do it with the symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs rows of boxes. How many if there are {a} rows of {b}?
Reasons the pet gives when it is caught:
  tens0: I worked a tens part as ones. A tens part ends in zero.
  part: One part of the product is missing. Look again.
  slip: That is close. Check this step one more time.
Tonight's question: Ask {name}: "What is twenty three times thirty four?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The "tens0" reason did not say the mistake.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "mbig4",
 "t": "2-Digit Times 2-Digit",
 "grade": 4,
 "age": "kid",
 "idea": "Multiply each part then add the parts.",
 "beats": {
  "remember": [
   "Do you remember this one? What is {a} times {b}?"
  ],
  "explore": [
   "Pick any numbers. Use the steppers to build them any way you like."
  ],
  "name": [
   "You picked {a} and {b}.",
   "Each part times each part then add them.",
   "{a} times {b} is {sum}."
  ],
  "together": [
   "First break it into parts and multiply each part.",
   "Now find each part then add them all.",
   "Now do it with the symbols only."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory needs rows of boxes. How many if there are {a} rows of {b}?"
  ]
 },
 "reasons": {
  "tens0": [
   "I worked a tens part as ones. A tens part ends in zero."
  ],
  "part": [
   "One part of the product is missing. Look again."
  ],
  "slip": [
   "That is close. Check this step one more time."
  ]
 },
 "home": "Ask {name}: \"What is twenty three times thirty four?\""
}
```

<details><summary>The API's first draft</summary>

```text
2-Digit Times 2-Digit (mbig4), grade 4, the kid pet
Idea: Multiply each part then add the parts.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Pick any numbers. Use the steppers to build them any way you like.
Name it:
  - You picked {a} and {b}.
  - Each part times each part then add them.
  - {a} times {b} is {sum}.
Together:
  - First break it into parts and multiply each part.
  - Now find each part then add them all.
  - Now do it with the symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs rows of boxes. How many if there are {a} rows of {b}?
Reasons the pet gives when it is caught:
  tens0: The tens part is more than the ones. Try it again.
  part: One part of the product is missing. Look again.
  slip: That is close. Check this step one more time.
Tonight's question: Ask {name}: "What is twenty three times thirty four?"
About 3.4 minutes.
```
</details>
