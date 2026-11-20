# Draft: Unit Rates (ratio2)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Unit Rates (ratio2), grade 6, the teen pet
Idea: A unit rate is how much for one: share the total by the number of items.

Remember:
  - A times fact from before.
Explore:
  - Build any bar of equal boxes: pick the boxes and what goes in each.
Name it:
  - Your bar holds {sum}, in equal boxes of {b}.
  - One box is {b}: the rate for one.
  - Share the total by the number of items, then multiply for more items.
Together:
  - One box for each item. What goes in each?
  - The total is on top. Share it out.
  - Find the rate for one first, then scale up.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The Sky City planners run on rates. Work these out.
Reasons the pet gives when it is caught:
  wrongOp: I multiplied, but the story shares the total out.
  addRat: I added or took away the same amount. Rates scale by multiplying.
Tonight's question: Ask {name}: "4 pounds cost $12. How much is 1 pound? And 7 pounds?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "{a} boxes", which reads "1 boxes" for a one-box bar; it now names the total and the box.
- Together line 1 began "Let's"; line 2 asked for the rate where the box already showed "?".
- Show said "Find the unit rate and use it" twice; the two Show items may both ask for one item, so one line is kept.
- The addRat reason said "multiply both parts of the ratio" in a lesson with no ratio table; it now says what the pet did.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ratio2",
 "t": "Unit Rates",
 "grade": 6,
 "age": "teen",
 "idea": "A unit rate is how much for one: share the total by the number of items.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Build any bar of equal boxes: pick the boxes and what goes in each."
  ],
  "name": [
   "Your bar holds {sum}, in equal boxes of {b}.",
   "One box is {b}: the rate for one.",
   "Share the total by the number of items, then multiply for more items."
  ],
  "together": [
   "One box for each item. What goes in each?",
   "The total is on top. Share it out.",
   "Find the rate for one first, then scale up."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The Sky City planners run on rates. Work these out."
  ]
 },
 "reasons": {
  "wrongOp": [
   "I multiplied, but the story shares the total out."
  ],
  "addRat": [
   "I added or took away the same amount. Rates scale by multiplying."
  ]
 },
 "home": "Ask {name}: \"4 pounds cost $12. How much is 1 pound? And 7 pounds?\""
}
```

<details><summary>The API's first draft</summary>

```text
Unit Rates (ratio2), grade 6, the teen pet
Idea: A unit rate is how much for one.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build a bar of equal boxes. Pick how many boxes and how many in each.
Name it:
  - You built {a} boxes with {b} in each. The total is {sum}.
  - A unit rate is how much for one.
  - Share the total equally by the number of items.
Together:
  - Let's make a bar for this story.
  - Now find the rate for one.
  - Use the rate to solve a new story.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The towers need supplies. Find the unit rate and use it.
  - One more job. Find the unit rate and use it.
Reasons the pet gives when it is caught:
  wrongOp: We need to share equally. Try dividing.
  addRat: We multiply both parts of the ratio. Try that.
Tonight's question: Ask {name}: How much does one pencil cost if four cost eight dollars?
About 3.5 minutes.
```

</details>
