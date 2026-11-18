# Draft: Take Away Across Zeros (sub7)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Take Away Across Zeros (sub7), grade 3, the kid pet
Idea: When a place runs out break one from the next place.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Take away as many as you like from {a} blocks.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - When a place runs out break one from the next place.
Together:
  - Take {b} away from {a} blocks. Break when you need to.
  - Look at the picture of {a}. Type what is left.
  - Now try it in columns.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs clearing. Take {b} from {a} logs.
  - The bridge needs fixing. Take {b} from {a} boards.
Reasons the pet gives when it is caught:
  col: I took the smaller digit from the bigger one. Top take away bottom.
  keep: I broke a ten but did not take it from the next place.
  slip: Look closer. One off in this step.
Tonight's question: Ask {name}: "What is 200 take away 125?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The "col" reason said it the wrong way round; "keep" spoke to the child.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sub7",
 "t": "Take Away Across Zeros",
 "grade": 3,
 "age": "kid",
 "idea": "When a place runs out break one from the next place.",
 "beats": {
  "remember": [
   "Do you remember this? Make {n} with blocks."
  ],
  "explore": [
   "Take away as many as you like from {a} blocks."
  ],
  "name": [
   "You had {a}. You took {b}. {diff} are left.",
   "When a place runs out break one from the next place."
  ],
  "together": [
   "Take {b} away from {a} blocks. Break when you need to.",
   "Look at the picture of {a}. Type what is left.",
   "Now try it in columns."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs clearing. Take {b} from {a} logs.",
   "The bridge needs fixing. Take {b} from {a} boards."
  ]
 },
 "reasons": {
  "col": [
   "I took the smaller digit from the bigger one. Top take away bottom."
  ],
  "keep": [
   "I broke a ten but did not take it from the next place."
  ],
  "slip": [
   "Look closer. One off in this step."
  ]
 },
 "home": "Ask {name}: \"What is 200 take away 125?\""
}
```

<details><summary>The API's first draft</summary>

```text
Take Away Across Zeros (sub7), grade 3, the kid pet
Idea: When a place runs out break one from the next place.

Remember:
  - Hey {name}. New idea today.
  - Do you remember this? Make {n} with blocks.
Explore:
  - Take away as many as you like from {a} blocks.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - When a place runs out break one from the next place.
Together:
  - Take {b} away from {a} blocks. Break when you need to.
  - Look at the picture of {a}. Type what is left.
  - Now try it in columns.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs clearing. Take {b} from {a} logs.
  - The bridge needs fixing. Take {b} from {a} boards.
Reasons the pet gives when it is caught:
  col: Take the top from the bottom in each column.
  keep: You borrowed but did not take from the next place.
  slip: Look closer. One off in this step.
Tonight's question: Ask {name}: "What is 200 take away 125?"
About 3.4 minutes.
```
</details>
