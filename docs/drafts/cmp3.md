# Draft: Compare to 999 (cmp3)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Compare to 999 (cmp3), grade 2, the little pet
Idea: Look at the hundreds first to see which is bigger.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Use the flats, rods and cubes. Make any number you like!
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - Look at the hundreds first to see which is bigger.
Together:
  - Make a number bigger than this one.
  - Look at the blocks for {a} and {b}.
  - Compare {a} and {b}. Hundreds first.
Check me:
  - My turn. Check me!
  - I think {ans}. Am I right?
Show:
  - The space station door opens for the bigger number.
Reasons the pet gives when it is caught:
  small: I picked the smaller one. Look at the hundreds!
Tonight's question: Ask {name}: "Which is bigger, 458 or 485?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The pet says its whole comparison; the idea says how to compare.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "cmp3",
 "t": "Compare to 999",
 "grade": 2,
 "age": "little",
 "idea": "Look at the hundreds first to see which is bigger.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Use the flats, rods and cubes. Make any number you like!"
  ],
  "name": [
   "You made {n}.",
   "It has {top} hundreds, {tens} tens and {ones} ones.",
   "Look at the hundreds first to see which is bigger."
  ],
  "together": [
   "Make a number bigger than this one.",
   "Look at the blocks for {a} and {b}.",
   "Compare {a} and {b}. Hundreds first."
  ],
  "check": [
   "My turn. Check me!",
   "I think {ans}. Am I right?"
  ],
  "show": [
   "The space station door opens for the bigger number."
  ]
 },
 "reasons": {
  "small": [
   "I picked the smaller one. Look at the hundreds!"
  ]
 },
 "home": "Ask {name}: \"Which is bigger, 458 or 485?\""
}
```

<details><summary>The API's first draft</summary>

```text
Compare to 999 (cmp3), grade 2, the little pet
Idea: Compare numbers with hundreds tens and ones.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Use the flats rods and cubes. Make any number you like!
Name it:
  - You made {n}.
  - It has {top} hundreds {tens} tens and {ones} ones.
  - We can compare any numbers.
Together:
  - Make a number bigger than this one.
  - Which is bigger {a} or {b} on the blocks?
  - Which is bigger {a} or {b}?
Check me:
  - My turn. Check me!
  - I think {ans} is bigger. Am I right?
Show:
  - The space station needs power. Which number is bigger {a} or {b}?
Reasons the pet gives when it is caught:
  small: Look again. Which has more hundreds? | The one with more hundreds is bigger.
Tonight's question: Ask {name}: Which is bigger 458 or 512?
About 3.3 minutes.
```

</details>
