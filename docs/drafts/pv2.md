# Draft: Place Value to 999 (pv2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Place Value to 999 (pv2), grade 2, the little pet
Idea: Each digit's place tells what it is worth.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Make any number you like with the blocks.
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - Each digit's place tells what it is worth.
Together:
  - Make {n} with blocks. Flats, rods, then cubes.
  - Count the flats, the rods, then the cubes.
  - Look at {n}. Find the place of the digit.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship's map has numbers. What is each digit worth?
Reasons the pet gives when it is caught:
  given: I said the digit. Its place makes it worth more!
  swap: I swapped the tens and the ones. Look again.
Tonight's question: Ask {name}: "What is the 5 worth in 352?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line said a number that is the answer; the "given" reason now says what the mistake is.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pv2",
 "t": "Place Value to 999",
 "grade": 2,
 "age": "little",
 "idea": "Each digit's place tells what it is worth.",
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
   "Each digit's place tells what it is worth."
  ],
  "together": [
   "Make {n} with blocks. Flats, rods, then cubes.",
   "Count the flats, the rods, then the cubes.",
   "Look at {n}. Find the place of the digit."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The ship's map has numbers. What is each digit worth?"
  ]
 },
 "reasons": {
  "given": [
   "I said the digit. Its place makes it worth more!"
  ],
  "swap": [
   "I swapped the tens and the ones. Look again."
  ]
 },
 "home": "Ask {name}: \"What is the 5 worth in 352?\""
}
```

<details><summary>The API's first draft</summary>

```text
Place Value to 999 (pv2), grade 2, the little pet
Idea: Hundreds tens and ones show a number.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Make any number you like with the blocks.
Name it:
  - You made {n}.
  - It has {top} hundreds {tens} tens and {ones} ones.
  - Hundreds tens and ones show a number.
Together:
  - Make {n} with blocks.
  - Count the blocks in this picture.
  - What is one digit of {n} worth?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs supplies. How many is {n}?
Reasons the pet gives when it is caught:
  given: I said the number I could see. Look at the blocks!
  swap: I swapped the tens and ones. Look again.
Tonight's question: Ask {name}: "What is the value of the 5 in 352?"
About 3.2 minutes.
```

</details>
