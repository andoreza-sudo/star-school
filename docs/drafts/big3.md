# Draft: Carry the 1 (big3)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>". Until then tools/build.py refuses any script that names this draft. -->

## Read-through

```text
Carry the 1 (big3), grade 2, the little pet
Idea: When the sum is ten or more we carry a ten.

Remember:
  - Do you remember this? Show me a ten and some ones.
Explore:
  - Look at these. Build them with blocks.
  - Put them together. Make a new pile for each ten.
Name it:
  - We have {tens} tens and {ones} ones.
  - When the ones make ten we carry a ten.
Together:
  - Add these. The ones sum is more than {n}.
  - Write the ones. Carry the ten to the next column.
  - Add the tens. Do not forget the carried ten.
Check me:
  - My turn. Check me!
  - I added and got {ans}. Am I right?
Show:
  - The space station needs supplies. Add these loads.
  - Now add these big loads. Show me!
Reasons the pet gives when it is caught:
  nocarry: Look again. I forgot to carry the ten from the ones.
  col: I took the smaller from the bigger in each column.
Tonight's question: Ask {name}: "What is 38 plus 47?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "big3",
 "t": "Carry the 1",
 "grade": 2,
 "age": "little",
 "idea": "When the sum is ten or more we carry a ten.",
 "beats": {
  "remember": [
   "Do you remember this? Show me a ten and some ones."
  ],
  "explore": [
   "Look at these. Build them with blocks.",
   "Put them together. Make a new pile for each ten."
  ],
  "name": [
   "We have {tens} tens and {ones} ones.",
   "When the ones make ten we carry a ten."
  ],
  "together": [
   "Add these. The ones sum is more than {n}.",
   "Write the ones. Carry the ten to the next column.",
   "Add the tens. Do not forget the carried ten."
  ],
  "check": [
   "My turn. Check me!",
   "I added and got {ans}. Am I right?"
  ],
  "show": [
   "The space station needs supplies. Add these loads.",
   "Now add these big loads. Show me!"
  ]
 },
 "reasons": {
  "nocarry": [
   "Look again. I forgot to carry the ten from the ones."
  ],
  "col": [
   "I took the smaller from the bigger in each column."
  ]
 },
 "home": "Ask {name}: \"What is 38 plus 47?\""
}
```
