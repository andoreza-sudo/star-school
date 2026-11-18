# Draft: Mixed Numbers (frac8)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Mixed Numbers (frac8), grade 4, the kid pet
Idea: Every full bar is one whole. The parts left over make the fraction.

Remember:
  - Do you remember this? Name the shaded fraction.
Explore:
  - Shade any parts you like on both bars.
Name it:
  - You shaded {a} parts.
  - Every full bar is one whole.
  - The parts left over make the fraction.
Together:
  - Type the whole bars and the parts left over.
  - Now find it on the number line.
  - Write it with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs mixed numbers marked. Type what you know.
  - One more to mark on the map. Show what you know.
Reasons the pet gives when it is caught:
  mixTop: I kept all the parts on top. Take the whole bars out first.
  slip: I counted one whole bar wrong.
Tonight's question: Ask {name}: "How many wholes are in 11 fourths?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore had a number word ("fourths"); the "mixTop" reason said the opposite of the right way; tonight's question asked for a drawing, not the idea.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "frac8",
 "t": "Mixed Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Every full bar is one whole. The parts left over make the fraction.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded fraction."
  ],
  "explore": [
   "Shade any parts you like on both bars."
  ],
  "name": [
   "You shaded {a} parts.",
   "Every full bar is one whole.",
   "The parts left over make the fraction."
  ],
  "together": [
   "Type the whole bars and the parts left over.",
   "Now find it on the number line.",
   "Write it with symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The trail needs mixed numbers marked. Type what you know.",
   "One more to mark on the map. Show what you know."
  ]
 },
 "reasons": {
  "mixTop": [
   "I kept all the parts on top. Take the whole bars out first."
  ],
  "slip": [
   "I counted one whole bar wrong."
  ]
 },
 "home": "Ask {name}: \"How many wholes are in 11 fourths?\""
}
```

<details><summary>The API's first draft</summary>

```text
Mixed Numbers (frac8), grade 4, the kid pet
Idea: Every full bar is one whole. The parts left over make the fraction.

Remember:
  - Do you remember this? Name the shaded fraction.
Explore:
  - Shade any parts you like on each bar cut in fourths.
Name it:
  - You shaded {a} parts.
  - Every full bar is one whole.
  - The parts left over make the fraction.
Together:
  - Type the whole bars and the parts left over.
  - Now find it on the number line.
  - Write it with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs mixed numbers marked. Type what you know.
  - One more to mark on the map. Show what you know.
Reasons the pet gives when it is caught:
  mixTop: The top stays as parts only. | Keep the top as just the shaded pieces.
  slip: Look closer. One part is off.
Tonight's question: Ask {name}: "Can you draw a bar showing two and three fourths?"
About 3.4 minutes.
```
</details>
