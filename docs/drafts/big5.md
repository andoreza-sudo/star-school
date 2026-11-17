# Draft: Add 3-Digit Numbers (big5)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Add 3-Digit Numbers (big5), grade 2, the little pet
Idea: When the ones make ten or more, carry a ten.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in blocks for {a} and {b}. Any way you like!
Name it:
  - You put in {tens} tens and {ones} ones.
  - Together they make {sum}.
  - When the ones make ten or more, carry a ten.
Together:
  - Trade ten ones for a ten. Then check.
  - Look at the ones. More than {n}? Carry!
  - Add in columns. Carry the ten.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs supplies. Add these loads.
  - One more load for the ship. Add it up!
Reasons the pet gives when it is caught:
  nocarry: I forgot to carry the ten from the ones.
  cat: Oops. I wrote both column totals side by side.
Tonight's question: Ask {name}: "What is 245 plus 317?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Line 2 of Together (trading) belongs to the build; the "nocarry" reason had a slot; reasons match Carry the 1.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "big5",
 "t": "Add 3-Digit Numbers",
 "grade": 2,
 "age": "little",
 "idea": "When the ones make ten or more, carry a ten.",
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
   "When the ones make ten or more, carry a ten."
  ],
  "together": [
   "Trade ten ones for a ten. Then check.",
   "Look at the ones. More than {n}? Carry!",
   "Add in columns. Carry the ten."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The ship needs supplies. Add these loads.",
   "One more load for the ship. Add it up!"
  ]
 },
 "reasons": {
  "nocarry": [
   "I forgot to carry the ten from the ones."
  ],
  "cat": [
   "Oops. I wrote both column totals side by side."
  ]
 },
 "home": "Ask {name}: \"What is 245 plus 317?\""
}
```

<details><summary>The API's first draft</summary>

```text
Add 3-Digit Numbers (big5), grade 2, the little pet
Idea: We can add hundreds tens and ones.

Remember:
  - Do you remember this? Make {n} with rods and cubes.
Explore:
  - Add these numbers with rods and cubes. Any way you like!
Name it:
  - You put {tens} tens and {ones} ones.
  - Together they make {sum}.
  - We can add hundreds tens and ones.
Together:
  - Let us add these with the blocks.
  - Now trade for a ten if you have more than {n} ones.
  - Let us add these in columns.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs supplies. Add these numbers.
  - One more load for the ship. Add these numbers.
Reasons the pet gives when it is caught:
  nocarry: Look again. Carry a ten when more than {n} ones.
  cat: We add each place not put the answers side by side.
Tonight's question: Ask {name}: What is 245 plus 317?
About 3.4 minutes.
```

</details>
