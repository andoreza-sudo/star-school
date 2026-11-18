# Draft: Convert Units (meas5)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Convert Units (meas5), grade 4, the kid pet
Idea: A smaller unit needs more of it so multiply.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick how many feet you need for the desert path. Any number works!
Name it:
  - You picked {n} feet.
  - That is {sum} inches.
  - A smaller unit needs more of it so multiply.
Together:
  - We need {n} big units. Let's count up by the small unit size.
  - One big unit is this many small units. How many for {n}?
  - Now try the symbols. How many small units?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The desert trail needs supplies. How many small units for {n} big ones?
Reasons the pet gives when it is caught:
  conv: I added. To change to a smaller unit, multiply.
  skip: I counted one unit too many. Check the table.
Tonight's question: Ask {name}: How many inches are in 5 feet?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons did not say what the pet did.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "meas5",
 "t": "Convert Units",
 "grade": 4,
 "age": "kid",
 "idea": "A smaller unit needs more of it so multiply.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Pick how many feet you need for the desert path. Any number works!"
  ],
  "name": [
   "You picked {n} feet.",
   "That is {sum} inches.",
   "A smaller unit needs more of it so multiply."
  ],
  "together": [
   "We need {n} big units. Let's count up by the small unit size.",
   "One big unit is this many small units. How many for {n}?",
   "Now try the symbols. How many small units?"
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The desert trail needs supplies. How many small units for {n} big ones?"
  ]
 },
 "reasons": {
  "conv": [
   "I added. To change to a smaller unit, multiply."
  ],
  "skip": [
   "I counted one unit too many. Check the table."
  ]
 },
 "home": "Ask {name}: How many inches are in 5 feet?"
}
```

<details><summary>The API's first draft</summary>

```text
Convert Units (meas5), grade 4, the kid pet
Idea: A smaller unit needs more of it so multiply.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick how many feet you need for the desert path. Any number works!
Name it:
  - You picked {n} feet.
  - That is {sum} inches.
  - A smaller unit needs more of it so multiply.
Together:
  - We need {n} big units. Let's count up by the small unit size.
  - One big unit is this many small units. How many for {n}?
  - Now try the symbols. How many small units?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The desert trail needs supplies. How many small units for {n} big ones?
Reasons the pet gives when it is caught:
  conv: We multiply to change to a smaller unit. Try again with that.
  skip: Counted one group too many. Look closer at the jumps.
Tonight's question: Ask {name}: How many inches are in 5 feet?
About 3.4 minutes.
```
</details>
