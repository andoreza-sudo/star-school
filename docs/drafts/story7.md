# Draft: Remainder Stories (story7)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Remainder Stories (story7), grade 4, the kid pet
Idea: After dividing, ask what the leftovers mean in the story.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Pick a number and a group size. I will make the groups.
Name it:
  - {n} in groups of {b} is {a} full groups.
  - {k} are left over.
  - Then ask: what do the leftovers mean in the story?
Together:
  - Make the groups the story needs. Think about the leftovers.
  - The groups are drawn. What does the story ask for?
  - No picture now. Divide, then think about the leftovers.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The camel train is packing for a trip. Solve this story.
  - One more story for the camel train.
Reasons the pet gives when it is caught:
  remDrop: Oops. I forgot about the leftovers. The story needed them.
  remUp: Oops. I made a group for the leftovers. They are not a full one.
Tonight's question: Ask {name}: "26 kids, 4 in each car. How many cars?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea and Name it said "The leftovers are the answer": untrue for two of the three kinds of story (cars needed, full boxes).
- The remDrop reason said the leftovers are the answer, which is wrong for car stories.
- Explore said "Build it any way" (the child picks numbers, the app makes the groups).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "story7",
 "t": "Remainder Stories",
 "grade": 4,
 "age": "kid",
 "idea": "After dividing, ask what the leftovers mean in the story.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Pick a number and a group size. I will make the groups."
  ],
  "name": [
   "{n} in groups of {b} is {a} full groups.",
   "{k} are left over.",
   "Then ask: what do the leftovers mean in the story?"
  ],
  "together": [
   "Make the groups the story needs. Think about the leftovers.",
   "The groups are drawn. What does the story ask for?",
   "No picture now. Divide, then think about the leftovers."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The camel train is packing for a trip. Solve this story.",
   "One more story for the camel train."
  ]
 },
 "reasons": {
  "remDrop": [
   "Oops. I forgot about the leftovers. The story needed them."
  ],
  "remUp": [
   "Oops. I made a group for the leftovers. They are not a full one."
  ]
 },
 "home": "Ask {name}: \"26 kids, 4 in each car. How many cars?\""
}
```

<details><summary>The API's first draft</summary>

```text
Remainder Stories (story7), grade 4, the kid pet
Idea: The leftovers are the answer.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number and a group size. Build it any way you like.
Name it:
  - You split {n} into groups of {b}.
  - That made {a} full groups with {k} left.
  - The leftovers are the answer.
Together:
  - A story needs a bar model. Build one with me.
  - Look at the bar model. What does it show?
  - Now read the story. What is the answer?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert lizards need homes in the rocks.
  - Now the camels need water from the oasis.
Reasons the pet gives when it is caught:
  remDrop: The story asks for the leftovers. Those are the answer.
  remUp: The leftovers cannot fill a full group. Keep them as they are.
Tonight's question: Ask {name}: 17 apples in bags of 5. How many left?
About 3.4 minutes.
```

</details>
