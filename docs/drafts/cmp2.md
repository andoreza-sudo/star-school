# Draft: Compare to 100 (cmp2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Compare to 100 (cmp2), grade 1, the little pet
Idea: Look at the tens first to see which is bigger.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Use any blocks you like to make a number.
Name it:
  - You made {n}.
  - It has {tens} tens and {ones} ones.
  - Look at the tens first to see which is bigger.
Together:
  - Make a number bigger than this one.
  - Look at the blocks for {a} and {b}.
  - Compare {a} and {b}. Tens first.
Check me:
  - My turn. Check me!
  - I think {ans}. Am I right?
Show:
  - The reef gate opens for the bigger number.
Reasons the pet gives when it is caught:
  small: I picked the smaller one. Look at the tens!
Tonight's question: Ask {name}: "Which is bigger, 67 or 76?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea now says how to compare; no "hundreds" in a lesson to 100; the pet says its whole comparison; the second reason line was not a reason.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "cmp2",
 "t": "Compare to 100",
 "grade": 1,
 "age": "little",
 "idea": "Look at the tens first to see which is bigger.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Use any blocks you like to make a number."
  ],
  "name": [
   "You made {n}.",
   "It has {tens} tens and {ones} ones.",
   "Look at the tens first to see which is bigger."
  ],
  "together": [
   "Make a number bigger than this one.",
   "Look at the blocks for {a} and {b}.",
   "Compare {a} and {b}. Tens first."
  ],
  "check": [
   "My turn. Check me!",
   "I think {ans}. Am I right?"
  ],
  "show": [
   "The reef gate opens for the bigger number."
  ]
 },
 "reasons": {
  "small": [
   "I picked the smaller one. Look at the tens!"
  ]
 },
 "home": "Ask {name}: \"Which is bigger, 67 or 76?\""
}
```

<details><summary>The API's first draft</summary>

```text
Compare to 100 (cmp2), grade 1, the little pet
Idea: Compare numbers to one hundred.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Use any blocks you like to build a big number.
Name it:
  - You made {n}.
  - It has {top} hundreds {tens} tens and {ones} ones.
  - Compare numbers to one hundred.
Together:
  - Make a number bigger than the one we see.
  - Look at these. Which is bigger?
  - Which is bigger {a} or {b}?
Check me:
  - My turn. Check me!
  - I think {ans} is bigger. Am I right?
Show:
  - The reef gate needs the bigger one. Which {a} or {b}?
Reasons the pet gives when it is caught:
  small: Look again. The sign points the wrong way. | This one is right.
Tonight's question: Ask {name}: "Which is bigger 67 or 89?"
About 3.3 minutes.
```

</details>
