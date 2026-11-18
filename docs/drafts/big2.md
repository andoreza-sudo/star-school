# Draft: 2-Digit Adding (big2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
2-Digit Adding (big2), grade 1, the little pet
Idea: Add the ones, then add the tens.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in blocks for {a} and {b}. Any way you like!
Name it:
  - You put in {tens} tens and {ones} ones.
  - Together they make {sum}.
  - Add the ones, then add the tens.
Together:
  - Let's add {a} and {b} with blocks.
  - Count the ones, then the tens.
  - Add the ones column, then the tens column.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef needs shells and rocks. Add them up!
Reasons the pet gives when it is caught:
  op: I took away. Look at the sign: we add!
  swap: I swapped the tens and the ones. Tens go first.
Tonight's question: Ask {name}: "What is 23 plus 14?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- One reason line per mistake (the second line of each was a different thought); clearer Together lines.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "big2",
 "t": "2-Digit Adding",
 "grade": 1,
 "age": "little",
 "idea": "Add the ones, then add the tens.",
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
   "Add the ones, then add the tens."
  ],
  "together": [
   "Let's add {a} and {b} with blocks.",
   "Count the ones, then the tens.",
   "Add the ones column, then the tens column."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The reef needs shells and rocks. Add them up!"
  ]
 },
 "reasons": {
  "op": [
   "I took away. Look at the sign: we add!"
  ],
  "swap": [
   "I swapped the tens and the ones. Tens go first."
  ]
 },
 "home": "Ask {name}: \"What is 23 plus 14?\""
}
```

<details><summary>The API's first draft</summary>

```text
2-Digit Adding (big2), grade 1, the little pet
Idea: We can add tens and ones.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Put blocks for {a} and {b} any way you like.
Name it:
  - You put {tens} tens and {ones} ones.
  - Together they make {sum}.
  - We can add tens and ones.
Together:
  - Let us add {a} and {b} with our blocks.
  - Now look at the blocks and type the sum.
  - Let us add them in columns.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef needs more shells and rocks. How many in all?
Reasons the pet gives when it is caught:
  op: I added when I should take away. | Let us check the sign.
  swap: I swapped the tens and ones. | Let us look at the places again.
Tonight's question: Ask {name}: "What is 23 plus 14?"
About 3.3 minutes.
```

</details>
