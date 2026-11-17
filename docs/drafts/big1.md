# Draft: Tens & Hundreds (big1)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Tens & Hundreds (big1), grade 1, the little pet
Idea: A hundred is ten tens.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Make any number you like with the blocks.
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - A hundred is ten tens.
Together:
  - Add {a} and {b}. Count the rods or the flats.
  - Look at the blocks. Count by tens, or by hundreds.
  - Think in tens or hundreds, just like ones.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon trail needs steps. Add them up!
Reasons the pet gives when it is caught:
  ten: I counted the tens like ones. A rod is ten!
  given: I said a number I could see. Add them both.
Tonight's question: Ask {name}: "How many tens make one hundred?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together and Show lines no longer say the answer; a comma in Name it.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "big1",
 "t": "Tens & Hundreds",
 "grade": 1,
 "age": "little",
 "idea": "A hundred is ten tens.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Make any number you like with the blocks."
  ],
  "name": [
   "You made {n}.",
   "It has {top} hundreds, {tens} tens and {ones} ones.",
   "A hundred is ten tens."
  ],
  "together": [
   "Add {a} and {b}. Count the rods or the flats.",
   "Look at the blocks. Count by tens, or by hundreds.",
   "Think in tens or hundreds, just like ones."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The canyon trail needs steps. Add them up!"
  ]
 },
 "reasons": {
  "ten": [
   "I counted the tens like ones. A rod is ten!"
  ],
  "given": [
   "I said a number I could see. Add them both."
  ]
 },
 "home": "Ask {name}: \"How many tens make one hundred?\""
}
```

<details><summary>The API's first draft</summary>

```text
Tens & Hundreds (big1), grade 1, the little pet
Idea: A hundred is ten tens.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Make any number you like with the blocks.
Name it:
  - You made {n}.
  - It has {top} hundreds {tens} tens and {ones} ones.
  - A hundred is ten tens.
Together:
  - Add {a} and {b} with the blocks.
  - Show the blocks you built.
  - Now write the sum.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs {a} and {b} more steps. How many in all?
Reasons the pet gives when it is caught:
  ten: Look again. A flat is ten tens.
  given: I said the number I could see. Count all the blocks.
Tonight's question: Ask {name}: "How many tens make one hundred?"
About 3.2 minutes.
```

</details>
