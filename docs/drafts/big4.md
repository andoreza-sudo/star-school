# Draft: 3-Digit Adding (big4)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
3-Digit Adding (big4), grade 2, the little pet
Idea: Add the ones, then the tens, then the hundreds.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in blocks for {a} and {b}. Any way you like!
Name it:
  - You put in {tens} tens and {ones} ones.
  - Together they make {sum}.
  - Add the ones, then the tens, then the hundreds.
Together:
  - Add {a} and {b} with the blocks.
  - Look at the blocks. Add each place.
  - Add in columns: ones, tens, then hundreds.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power cells. Add them up!
Reasons the pet gives when it is caught:
  op: I took away. Look at the sign: we add!
  given: I said a number I could see. Add them both.
Tonight's question: Ask {name}: "What is 124 plus 135?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "we trade ten ones for a ten" in a lesson with nothing to carry; commas.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "big4",
 "t": "3-Digit Adding",
 "grade": 2,
 "age": "little",
 "idea": "Add the ones, then the tens, then the hundreds.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Put in blocks for {a} and {b}. Any way you like!"
  ],
  "name": [
   "You put in {tens} tens and {ones} ones.",
   "Together they make {sum}.",
   "Add the ones, then the tens, then the hundreds."
  ],
  "together": [
   "Add {a} and {b} with the blocks.",
   "Look at the blocks. Add each place.",
   "Add in columns: ones, tens, then hundreds."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The space station needs power cells. Add them up!"
  ]
 },
 "reasons": {
  "op": [
   "I took away. Look at the sign: we add!"
  ],
  "given": [
   "I said a number I could see. Add them both."
  ]
 },
 "home": "Ask {name}: \"What is 124 plus 135?\""
}
```

<details><summary>The API's first draft</summary>

```text
3-Digit Adding (big4), grade 2, the little pet
Idea: We can add hundreds tens and ones.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Put blocks for these numbers. Any way you like!
Name it:
  - You put {tens} tens and {ones} ones.
  - We trade ten ones for a ten.
  - We can add hundreds tens and ones.
Together:
  - We add these numbers with blocks.
  - Look at the blocks then type the sum.
  - Now add them in columns.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs more power cells. Add these.
Reasons the pet gives when it is caught:
  op: Look again. We add not take away.
  given: That number is already here. Add them both.
Tonight's question: Ask {name}: "What is 124 plus 135?"
About 3.3 minutes.
```

</details>
