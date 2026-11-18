# Draft: Times Tens & Hundreds (mbig1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Times Tens & Hundreds (mbig1), grade 3, the kid pet
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any number with the blocks. I will tell you what that many groups makes.
Name it:
  - You made {n}. Here are {b} groups. That makes {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Let's build {a} times {b}. Put in every group then trade.
  - Now look at the blocks and type what it makes.
  - Now just the symbols. What does it make?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The tower needs blocks for the top. How many for {a} times {b}?
Reasons the pet gives when it is caught:
  tens0: That works a tens part as ones. Multiply the place value.
  zeros: Count the zeros in each place. Write the right number.
Tonight's question: Ask {name}: "What is twenty times thirty?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "mbig1",
 "t": "Times Tens & Hundreds",
 "grade": 3,
 "age": "kid",
 "idea": "Multiply each place then trade ten of a place for one of the next.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Make any number with the blocks. I will tell you what that many groups makes."
  ],
  "name": [
   "You made {n}. Here are {b} groups. That makes {sum}.",
   "Multiply each place then trade ten of a place for one of the next."
  ],
  "together": [
   "Let's build {a} times {b}. Put in every group then trade.",
   "Now look at the blocks and type what it makes.",
   "Now just the symbols. What does it make?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The tower needs blocks for the top. How many for {a} times {b}?"
  ]
 },
 "reasons": {
  "tens0": [
   "That works a tens part as ones. Multiply the place value."
  ],
  "zeros": [
   "Count the zeros in each place. Write the right number."
  ]
 },
 "home": "Ask {name}: \"What is twenty times thirty?\""
}
```
