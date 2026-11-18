# Draft: Add & Subtract Parts (fop1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Add & Subtract Parts (fop1), grade 4, the kid pet
Idea: Same-size parts add like things: add the tops, the bottom stays.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade some parts on each bar. Any way you like.
Name it:
  - You shaded {a} and {b} parts of the {x}.
  - {a} and {b} is {sum} over {x}.
  - Same-size parts add like things: add the tops, the bottom stays.
Together:
  - Shade {a} parts then shade {b} more on one bar.
  - How many parts are shaded now?
  - Add the tops. The bottom stays the same.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs sand in parts. Work it out for me.
  - One more load of sand. How much now?
Reasons the pet gives when it is caught:
  addBot: The bottom stays the same. Add only the tops. | We add the shaded parts. The total parts do not change.
  slip: Look closer. One part too many or too few.
Tonight's question: Ask {name}: What is three fifths plus one fifth?
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The second Show line always said "take some sand away", but a Show item may add.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop1",
 "t": "Add & Subtract Parts",
 "grade": 4,
 "age": "kid",
 "idea": "Same-size parts add like things: add the tops, the bottom stays.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade some parts on each bar. Any way you like."
  ],
  "name": [
   "You shaded {a} and {b} parts of the {x}.",
   "{a} and {b} is {sum} over {x}.",
   "Same-size parts add like things: add the tops, the bottom stays."
  ],
  "together": [
   "Shade {a} parts then shade {b} more on one bar.",
   "How many parts are shaded now?",
   "Add the tops. The bottom stays the same."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs sand in parts. Work it out for me.",
   "One more load of sand. How much now?"
  ]
 },
 "reasons": {
  "addBot": [
   "The bottom stays the same. Add only the tops.",
   "We add the shaded parts. The total parts do not change."
  ],
  "slip": [
   "Look closer. One part too many or too few."
  ]
 },
 "home": "Ask {name}: What is three fifths plus one fifth?"
}
```

<details><summary>The API's first draft</summary>

```text
Add & Subtract Parts (fop1), grade 4, the kid pet
Idea: Same-size parts add like things: add the tops, the bottom stays.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade some parts on each bar. Any way you like.
Name it:
  - You shaded {a} and {b} parts of the {x}.
  - {a} and {b} is {sum} over {x}.
  - Same-size parts add like things: add the tops, the bottom stays.
Together:
  - Shade {a} parts then shade {b} more on one bar.
  - How many parts are shaded now?
  - Add the tops. The bottom stays the same.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs sand in {x} parts. Add them for me.
  - Now take some sand away from the path. How much is left?
Reasons the pet gives when it is caught:
  addBot: The bottom stays the same. Add only the tops. | We add the shaded parts. The total parts do not change.
  slip: Look closer. One part too many or too few.
Tonight's question: Ask {name}: What is three fifths plus one fifth?
About 3.5 minutes.
```
</details>
