# Draft: Shape Families (shape5)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Shape Families (shape5), grade 3, the kid pet
Idea: Sort shapes by their sides and corners. A square is a rectangle too.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Here is a rectangle. Tap the facts you think are true. Any way is fine.
Name it:
  - Here are a square, a rectangle and a rhombus.
  - A square has square corners like a rectangle.
  - It has equal sides like a rhombus. So it is both.
Together:
  - Check the sides, then the corners. Tap every true fact.
  - Look at the sides and corners. Pick the best name.
  - No picture now. Listen to the facts and pick the name.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden gate needs the right shapes. Tap the true facts.
  - One more shape for the gate.
Reasons the pet gives when it is caught:
  propMix: Oops. I mixed up the sides and the corners. I will check each one.
Tonight's question: Ask {name}: "Is a square a rectangle? Why?"
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it was one long line; it is now three lines on the picture of the square, rectangle and rhombus.
- Explore said the shape's facts are all true for it ("every true fact"); it is open: any taps are fine.
- Tonight's question asked for a square at home, not about families of shapes.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "shape5",
 "t": "Shape Families",
 "grade": 3,
 "age": "kid",
 "idea": "Sort shapes by their sides and corners. A square is a rectangle too.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Here is a rectangle. Tap the facts you think are true. Any way is fine."
  ],
  "name": [
   "Here are a square, a rectangle and a rhombus.",
   "A square has square corners like a rectangle.",
   "It has equal sides like a rhombus. So it is both."
  ],
  "together": [
   "Check the sides, then the corners. Tap every true fact.",
   "Look at the sides and corners. Pick the best name.",
   "No picture now. Listen to the facts and pick the name."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The garden gate needs the right shapes. Tap the true facts.",
   "One more shape for the gate."
  ]
 },
 "reasons": {
  "propMix": [
   "Oops. I mixed up the sides and the corners. I will check each one."
  ]
 },
 "home": "Ask {name}: \"Is a square a rectangle? Why?\""
}
```

<details><summary>The API's first draft</summary>

```text
Shape Families (shape5), grade 3, the kid pet
Idea: Shapes are sorted by sides and corners.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Tap every true fact about this shape.
Name it:
  - Shapes are sorted by sides and corners. A square is a rectangle and a rhombus too.
Together:
  - Tap every fact that is true for this shape.
  - Which name fits this shape best?
  - Choose its best name from the words.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Help build the forest path. Tap the true facts for each shape.
Reasons the pet gives when it is caught:
  propMix: Look closer. Which shapes have equal sides? Which have right angles?
Tonight's question: Ask {name}: "Can you find a square at home?"
About 3.3 minutes.
```

</details>
