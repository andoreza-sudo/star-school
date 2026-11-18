# Draft: Multiply Fractions (fop5)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Multiply Fractions (fop5), grade 5, the teen pet
Idea: Part of a part: multiply the tops and multiply the bottoms.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any squares in the grid. Any way you like.
Name it:
  - You shaded {sum} of {x} squares.
  - Part of a part: multiply the tops and multiply the bottoms.
Together:
  - Shade the overlap of these rows and columns.
  - Now write the fraction for the shaded part.
  - Try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs some pieces. Find each as a fraction.
  - One more for the map. What part is that?
Reasons the pet gives when it is caught:
  mixAdd: We multiply here. Add when the bottoms match.
  topOnly: Both tops and both bottoms. Try that again.
Tonight's question: Ask {name}: "We need half of half a pie. What fraction is that?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "{a} rows of {b}" for a build of any squares.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop5",
 "t": "Multiply Fractions",
 "grade": 5,
 "age": "teen",
 "idea": "Part of a part: multiply the tops and multiply the bottoms.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade any squares in the grid. Any way you like."
  ],
  "name": [
   "You shaded {sum} of {x} squares.",
   "Part of a part: multiply the tops and multiply the bottoms."
  ],
  "together": [
   "Shade the overlap of these rows and columns.",
   "Now write the fraction for the shaded part.",
   "Try this one with symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs some pieces. Find each as a fraction.",
   "One more for the map. What part is that?"
  ]
 },
 "reasons": {
  "mixAdd": [
   "We multiply here. Add when the bottoms match."
  ],
  "topOnly": [
   "Both tops and both bottoms. Try that again."
  ]
 },
 "home": "Ask {name}: \"We need half of half a pie. What fraction is that?\""
}
```

<details><summary>The API's first draft</summary>

```text
Multiply Fractions (fop5), grade 5, the teen pet
Idea: Part of a part: multiply the tops and multiply the bottoms.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any squares in the grid. Any way you like.
Name it:
  - You shaded {a} rows of {b} in a grid of {x}.
  - That is {sum} over {x} times {x}.
  - Part of a part: multiply the tops and multiply the bottoms.
Together:
  - Shade the overlap of these rows and columns.
  - Now write the fraction for the shaded part.
  - Try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs some pieces. Find each as a fraction.
  - One more for the map. What part is that?
Reasons the pet gives when it is caught:
  mixAdd: We multiply here. Add when the bottoms match.
  topOnly: Both tops and both bottoms. Try that again.
Tonight's question: Ask {name}: "We need half of half a pie. What fraction is that?"
About 3.4 minutes.
```
</details>
