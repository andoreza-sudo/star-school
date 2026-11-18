# Draft: 3-Digit Times 2-Digit (mbig5)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
3-Digit Times 2-Digit (mbig5), grade 5, the teen pet
Idea: Multiply each part then add the parts.

Remember:
  - Do you remember this times fact? What is {a} times {b}?
Explore:
  - Pick any numbers. Build them with the steppers any way you like.
Name it:
  - You picked {a} and {b}.
  - Each part has its own product.
  - Multiply each part then add the parts to get {sum}.
Together:
  - Picture the parts of {a} times {b}.
  - Find the product of each part then add them.
  - Now do {a} times {b} with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab packs trays. How many in all?
Reasons the pet gives when it is caught:
  tens0: I worked a tens part as ones. A tens part ends in zero.
  part: One part of the product is missing. Look again.
  slip: That one is close. Check this step once more.
Tonight's question: Ask {name}: What is the product of 124 times 13?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line said "the second tray" with only one Show line; the "tens0" reason did not say the mistake.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "mbig5",
 "t": "3-Digit Times 2-Digit",
 "grade": 5,
 "age": "teen",
 "idea": "Multiply each part then add the parts.",
 "beats": {
  "remember": [
   "Do you remember this times fact? What is {a} times {b}?"
  ],
  "explore": [
   "Pick any numbers. Build them with the steppers any way you like."
  ],
  "name": [
   "You picked {a} and {b}.",
   "Each part has its own product.",
   "Multiply each part then add the parts to get {sum}."
  ],
  "together": [
   "Picture the parts of {a} times {b}.",
   "Find the product of each part then add them.",
   "Now do {a} times {b} with symbols only."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab packs trays. How many in all?"
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
   "That one is close. Check this step once more."
  ]
 },
 "home": "Ask {name}: What is the product of 124 times 13?"
}
```

<details><summary>The API's first draft</summary>

```text
3-Digit Times 2-Digit (mbig5), grade 5, the teen pet
Idea: Multiply each part then add the parts.

Remember:
  - Do you remember this times fact? What is {a} times {b}?
Explore:
  - Pick any numbers. Build them with the steppers any way you like.
Name it:
  - You picked {a} and {b}.
  - Each part has its own product.
  - Multiply each part then add the parts to get {sum}.
Together:
  - Picture the parts of {a} times {b}.
  - Find the product of each part then add them.
  - Now do {a} times {b} with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Now make the second tray with {a} times {b}.
Reasons the pet gives when it is caught:
  tens0: This part is in the tens. The value is more than that.
  part: One part of the product is missing. Look again.
  slip: That one is close. Check this step once more.
Tonight's question: Ask {name}: What is the product of 124 times 13?
About 3.4 minutes.
```
</details>
