# Draft: Perimeter (geo1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Perimeter (geo1), grade 3, the kid pet
Idea: Perimeter is the distance around.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any rectangle with the dots. Any way works.
Name it:
  - You made a rectangle with sides {a} and {b}.
  - The distance around is {sum}.
  - Perimeter is the distance around. Add all the sides.
Together:
  - Add all the sides to find the perimeter.
  - Opposite sides match. Add all the sides.
  - No picture this time. Add every side.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a fence all the way around. The sides are {a} and {b}.
Reasons the pet gives when it is caught:
  area: I found the space inside. We want the distance around.
  half: I added only some of the sides. Add them all.
Tonight's question: Ask {name}: "A rug is 4 by 6. How far around is it?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- All three Together lines were the same; the "half" reason had a number word; tonight's question was too long.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "geo1",
 "t": "Perimeter",
 "grade": 3,
 "age": "kid",
 "idea": "Perimeter is the distance around.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Make any rectangle with the dots. Any way works."
  ],
  "name": [
   "You made a rectangle with sides {a} and {b}.",
   "The distance around is {sum}.",
   "Perimeter is the distance around. Add all the sides."
  ],
  "together": [
   "Add all the sides to find the perimeter.",
   "Opposite sides match. Add all the sides.",
   "No picture this time. Add every side."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs a fence all the way around. The sides are {a} and {b}."
  ]
 },
 "reasons": {
  "area": [
   "I found the space inside. We want the distance around."
  ],
  "half": [
   "I added only some of the sides. Add them all."
  ]
 },
 "home": "Ask {name}: \"A rug is 4 by 6. How far around is it?\""
}
```

<details><summary>The API's first draft</summary>

```text
Perimeter (geo1), grade 3, the kid pet
Idea: Perimeter is the distance around.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any rectangle with the dots. Any way works.
Name it:
  - You made a rectangle with sides {a} and {b}.
  - The distance around is {sum}.
  - Perimeter is the distance around. Add all the sides.
Together:
  - Add the sides to find the perimeter.
  - Add the sides to find the perimeter.
  - Add the sides to find the perimeter.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a fence all the way around. The sides are {a} and {b}.
Reasons the pet gives when it is caught:
  area: That is the space inside. We want the distance around.
  half: Add all the sides. Not just two.
Tonight's question: Ask {name}: "If a rectangle has sides of four and six, what is its perimeter?"
About 3.4 minutes.
```
</details>
