# Draft: Volume of a Box (geo4)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Volume of a Box (geo4), grade 5, the teen pet
Idea: Volume counts the cubes inside a box.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build any box you like with the cubes. Take your time.
Name it:
  - One layer of {a} by {b} holds {sum} cubes.
  - Volume counts the cubes: one layer times how many layers.
Together:
  - Here is one layer of a box and how many layers. How many cubes?
  - Look at this picture of the box. How many cubes fill it?
  - The sides are told in words only. Find the volume.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The crystal box needs filling. How many cubes fit?
  - Build a box for the crystals. Sides {a} and {b}, {k} layers. How many fit?
Reasons the pet gives when it is caught:
  layer: Count every layer, not just the top one.
  mulAdd: I added the sides. Volume multiplies length, width and height.
Tonight's question: Ask {name}: What is the volume of a box 4 by 5 by 3?
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 1 asked how many layers (the item asks for the cubes); a Show line asked "How high?"; a reason said "{k} numbers" ({k} is the layers); Name it described a box where the child made one layer.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "geo4",
 "t": "Volume of a Box",
 "grade": 5,
 "age": "teen",
 "idea": "Volume counts the cubes inside a box.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Build any box you like with the cubes. Take your time."
  ],
  "name": [
   "One layer of {a} by {b} holds {sum} cubes.",
   "Volume counts the cubes: one layer times how many layers."
  ],
  "together": [
   "Here is one layer of a box and how many layers. How many cubes?",
   "Look at this picture of the box. How many cubes fill it?",
   "The sides are told in words only. Find the volume."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The crystal box needs filling. How many cubes fit?",
   "Build a box for the crystals. Sides {a} and {b}, {k} layers. How many fit?"
  ]
 },
 "reasons": {
  "layer": [
   "Count every layer, not just the top one."
  ],
  "mulAdd": [
   "I added the sides. Volume multiplies length, width and height."
  ]
 },
 "home": "Ask {name}: What is the volume of a box 4 by 5 by 3?"
}
```

<details><summary>The API's first draft</summary>

```text
Volume of a Box (geo4), grade 5, the teen pet
Idea: Volume counts the cubes inside a box.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build any box you like with the cubes. Take your time.
Name it:
  - You built a box with sides {a} and {b}.
  - It holds {sum} cubes in all.
  - Volume counts the cubes: one layer times how many layers.
Together:
  - Here is a box with length {a} and width {b}. How many layers does it have?
  - Look at this picture of the box. How many cubes fill it?
  - The sides are told in words only. Find the volume.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The crystal box needs a cover. One side is {a}. Next is {b}. How high?
  - Build a box for the crystals. Sides {a} {b} and {k} layers. How many fit?
Reasons the pet gives when it is caught:
  layer: Count every layer not just the top one. | The height tells how many layers fill the box.
  mulAdd: We multiply the sides not add them. | Volume multiplies the {k} numbers.
Tonight's question: Ask {name}: What is the volume of a box 4 by 5 by 3?
About 3.6 minutes.
```
</details>
