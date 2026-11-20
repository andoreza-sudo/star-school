# Draft: Triangles & Trapezoids (geo5)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Triangles & Trapezoids (geo5), grade 6, the teen pet
Idea: A triangle is half of its rectangle: base times height, then half.

Remember:
  - A times fact from before.
Explore:
  - Set any base and height. The dashed rectangle fits around it.
Name it:
  - Base {a} and height {b}: the rectangle is {n}.
  - The triangle is half of it, {sum}.
  - A parallelogram skips the half; a trapezoid adds both bases first, then halves.
Together:
  - Set the base, then the height straight up.
  - Use the height, not the slanted side.
  - Picture the shape in its rectangle first.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The station's panels need covering. Find each area.
Reasons the pet gives when it is caught:
  noHalf: I found the whole rectangle and forgot to halve it.
  slant: I used the slanted side. The height stands straight up.
Tonight's question: Ask {name}: "A triangle has base 8 and height 5. What is its area?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "on this triangle" as if the shape were fixed; the child sets both.
- Name it said nothing about parallelograms and trapezoids, which Together and Show ask.
- Together line 2 "Find the area of this shape" repeated the question.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "geo5",
 "t": "Triangles & Trapezoids",
 "grade": 6,
 "age": "teen",
 "idea": "A triangle is half of its rectangle: base times height, then half.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Set any base and height. The dashed rectangle fits around it."
  ],
  "name": [
   "Base {a} and height {b}: the rectangle is {n}.",
   "The triangle is half of it, {sum}.",
   "A parallelogram skips the half; a trapezoid adds both bases first, then halves."
  ],
  "together": [
   "Set the base, then the height straight up.",
   "Use the height, not the slanted side.",
   "Picture the shape in its rectangle first."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The station's panels need covering. Find each area."
  ]
 },
 "reasons": {
  "noHalf": [
   "I found the whole rectangle and forgot to halve it."
  ],
  "slant": [
   "I used the slanted side. The height stands straight up."
  ]
 },
 "home": "Ask {name}: \"A triangle has base 8 and height 5. What is its area?\""
}
```

<details><summary>The API's first draft</summary>

```text
Triangles & Trapezoids (geo5), grade 6, the teen pet
Idea: A triangle is half of its rectangle. Base times height then half.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Set the base and height on this triangle inside its rectangle.
Name it:
  - This triangle has base {a} and height {b}.
  - Its area is {sum}. The rectangle area is {n}.
  - A triangle is half of its rectangle. Base times height then half.
Together:
  - Build a shape with this base and height.
  - Find the area of this shape.
  - Now find the area from the words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs its panels covered. Find the area of each.
Reasons the pet gives when it is caught:
  noHalf: Remember to take half at the end. | Check the last step. Half of the rectangle.
  slant: Use the height straight up. Not the slanted side.
Tonight's question: Ask {name}: What is the area of a triangle with base seven and height four?
About 3.4 minutes.
```

</details>
