# Draft: Story Problems 6 (story6)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Story Problems 6 (story6), grade 3, the kid pet
Idea: Some stories have more than one step: equal boxes first, then add or take away.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Build any equal boxes. One more box of {k} is there too.
Name it:
  - You built {a} boxes of {b}, and one more box of {k}.
  - That makes {sum} in all.
  - First the equal boxes, then the extra box.
Together:
  - First, build the equal boxes of the story.
  - The bar model is drawn. Do both steps.
  - No picture now. Do the first step, then the next.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The animals are stocking the forest store. Solve this story.
  - One more story for the store.
Reasons the pet gives when it is caught:
  oneStep: Oops. I stopped after the first step. The story has more.
  wrongOp: Oops. I added when I should take away, or the other way.
Tonight's question: Ask {name}: "3 boxes of 8 crayons, and 5 more. How many?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea and Name it said "A {k}-step story" (k is the extra box, not the steps).
- Together 1 was the engine's own line ("Now let's do some together."), so the build had no line.
- Show said "{k} jobs" (no number there).
- A reason said "The story has {k} steps".
- Tonight's question (legs of birds and squirrels) was not a two-step box story.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "story6",
 "t": "Story Problems 6",
 "grade": 3,
 "age": "kid",
 "idea": "Some stories have more than one step: equal boxes first, then add or take away.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Build any equal boxes. One more box of {k} is there too."
  ],
  "name": [
   "You built {a} boxes of {b}, and one more box of {k}.",
   "That makes {sum} in all.",
   "First the equal boxes, then the extra box."
  ],
  "together": [
   "First, build the equal boxes of the story.",
   "The bar model is drawn. Do both steps.",
   "No picture now. Do the first step, then the next."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The animals are stocking the forest store. Solve this story.",
   "One more story for the store."
  ]
 },
 "reasons": {
  "oneStep": [
   "Oops. I stopped after the first step. The story has more."
  ],
  "wrongOp": [
   "Oops. I added when I should take away, or the other way."
  ]
 },
 "home": "Ask {name}: \"3 boxes of 8 crayons, and 5 more. How many?\""
}
```

<details><summary>The API's first draft</summary>

```text
Story Problems 6 (story6), grade 3, the kid pet
Idea: A {k}-step story has an equal part then add or take away.

Remember:
  - Hey {name}. New idea today.
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build a bar of equal boxes and one more box of {k}. Any way works.
Name it:
  - You built {a} boxes of {b} and one more of {k}.
  - That makes {sum} in all.
  - A {k}-step story has an equal part then add or take away.
Together:
  - Now let's do some together.
  - Build the bar for this story.
  - Now find the answer for this story.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The forest animals need help with {k} jobs.
  - Solve both stories to finish the jobs.
Reasons the pet gives when it is caught:
  oneStep: You found the first part. Now finish the whole story. | The story has {k} steps. Check the last part too.
  wrongOp: The story asks to add or take away. Try that instead.
Tonight's question: Ask {name}: How many legs do four birds and two squirrels have?
About 3.4 minutes.
```

</details>
