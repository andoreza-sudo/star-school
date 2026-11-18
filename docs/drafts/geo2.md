# Draft: Area (geo2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Area (geo2), grade 3, the kid pet
Idea: Area counts the squares inside.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade any squares on the grid. Any way you like!
Name it:
  - You shaded {sum} squares.
  - Area counts the squares inside.
Together:
  - Build a rectangle with sides {a} and {b}.
  - Count the squares inside this one.
  - Find the area with sides {a} and {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden needs new grass. It has sides {a} and {b}. What is its area?
Reasons the pet gives when it is caught:
  perim: That counts around the edge. We need squares inside. | Try counting the squares inside instead.
  mulAdd: We multiply the sides. Not add them. | The sides tell us rows and how many in each row.
Tonight's question: Ask {name}: What is the area of our table?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "a shape with sides {a} and {b}"; the Explore build is any squares, not a rectangle.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "geo2",
 "t": "Area",
 "grade": 3,
 "age": "kid",
 "idea": "Area counts the squares inside.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Shade any squares on the grid. Any way you like!"
  ],
  "name": [
   "You shaded {sum} squares.",
   "Area counts the squares inside."
  ],
  "together": [
   "Build a rectangle with sides {a} and {b}.",
   "Count the squares inside this one.",
   "Find the area with sides {a} and {b}."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The garden needs new grass. It has sides {a} and {b}. What is its area?"
  ]
 },
 "reasons": {
  "perim": [
   "That counts around the edge. We need squares inside.",
   "Try counting the squares inside instead."
  ],
  "mulAdd": [
   "We multiply the sides. Not add them.",
   "The sides tell us rows and how many in each row."
  ]
 },
 "home": "Ask {name}: What is the area of our table?"
}
```

<details><summary>The API's first draft</summary>

```text
Area (geo2), grade 3, the kid pet
Idea: Area counts the squares inside.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade any squares on the grid. Any way you like!
Name it:
  - You shaded a shape with sides {a} and {b}.
  - It covers {sum} squares inside.
  - Area counts the squares inside.
Together:
  - Build a rectangle with sides {a} and {b}.
  - Count the squares inside this one.
  - Find the area with sides {a} and {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden needs new grass. It has sides {a} and {b}. What is its area?
Reasons the pet gives when it is caught:
  perim: That counts around the edge. We need squares inside. | Try counting the squares inside instead.
  mulAdd: We multiply the sides. Not add them. | The sides tell us rows and how many in each row.
Tonight's question: Ask {name}: What is the area of our table?
About 3.3 minutes.
```
</details>
