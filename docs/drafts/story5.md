# Draft: Story Problems 5 (story5)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Story Problems 5 (story5), grade 3, the kid pet
Idea: Equal boxes make a times story. Sharing into equal boxes is a dividing story.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Build any bar model you like. Pick the boxes, then how many go in each.
Name it:
  - You built {a} boxes with {b} in each.
  - That makes {sum} in all.
  - Equal boxes make a times story. Sharing into equal boxes is dividing.
Together:
  - Listen to the story, then build its bar model.
  - The bar model is drawn for you. What is the answer?
  - No picture this time. See the boxes in your head.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail crew packs supplies in equal boxes. Solve this story.
  - One more box story for the crew.
Reasons the pet gives when it is caught:
  wrongOp: Oops. I did the wrong thing for this story. Picture the boxes first.
  skip: Oops. I was one off. I should count the boxes again.
Tonight's question: Ask {name}: "4 bags with 6 apples in each. How many apples?"
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember asked "What is {a} times {b}?" on top of the app's own question; it is now a short lead-in.
- Together lines only named the item ("Here is a story on its own"); they now coach.
- Show lines asked for groups and sharing that the Show stories may not ask; now one line fits every story.
- The skip reason spoke to the child ("slips the answer"); the wrongOp reasons said "try dividing" for stories that multiply.
- Tonight's question ("count by sevens") had nothing to do with equal boxes.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "story5",
 "t": "Story Problems 5",
 "grade": 3,
 "age": "kid",
 "idea": "Equal boxes make a times story. Sharing into equal boxes is a dividing story.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Build any bar model you like. Pick the boxes, then how many go in each."
  ],
  "name": [
   "You built {a} boxes with {b} in each.",
   "That makes {sum} in all.",
   "Equal boxes make a times story. Sharing into equal boxes is dividing."
  ],
  "together": [
   "Listen to the story, then build its bar model.",
   "The bar model is drawn for you. What is the answer?",
   "No picture this time. See the boxes in your head."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The trail crew packs supplies in equal boxes. Solve this story.",
   "One more box story for the crew."
  ]
 },
 "reasons": {
  "wrongOp": [
   "Oops. I did the wrong thing for this story. Picture the boxes first."
  ],
  "skip": [
   "Oops. I was one off. I should count the boxes again."
  ]
 },
 "home": "Ask {name}: \"4 bags with 6 apples in each. How many apples?\""
}
```

<details><summary>The API's first draft</summary>

```text
Story Problems 5 (story5), grade 3, the kid pet
Idea: Equal boxes make a times story. Sharing a whole into equal boxes is a dividing story.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Build any bar model you like with the steppers.
Name it:
  - You built {a} boxes with {b} in each.
  - That makes {sum} in all.
  - Equal boxes make a times story.
Together:
  - Here is a story about boxes. Build its bar model.
  - Here is a story with its bar model drawn.
  - Here is a story on its own.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs equal stones in groups. How many in each?
  - The trail has equal rocks to share. How many groups?
Reasons the pet gives when it is caught:
  wrongOp: That story asks to share. Try dividing instead. | This one multiplies. Look for equal groups to make.
  skip: Count the groups again. One too many or too few slips the answer.
Tonight's question: Ask {name}: How many days until our next trip if we count by sevens?
About 3.4 minutes.
```

</details>
