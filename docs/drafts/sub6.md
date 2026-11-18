# Draft: 3-Digit Take Away (sub6)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
3-Digit Take Away (sub6), grade 3, the kid pet
Idea: When a place runs out, break one from the next place.

Remember:
  - Do you remember this one? Make {n} with the blocks.
Explore:
  - Here are some blocks. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. Now {diff} are left.
  - When a place runs out, break one from the next place.
Together:
  - Take {b} from {a}. Break a hundred or a ten if you need to.
  - Look at the picture of the blocks. Type what is left.
  - Now try it with the columns.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs clearing. Take {b} logs from the pile of {a}.
  - One more job. Take {b} from {a}.
Reasons the pet gives when it is caught:
  col: I took the smaller digit from the bigger one. Top take away bottom.
  keep: I broke a ten but did not take it from the tens.
  slip: Look closer. I slipped there.
Tonight's question: Ask {name}: "What is 430 take away 125?"
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons did not say the mistake ("Fix it for me?").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sub6",
 "t": "3-Digit Take Away",
 "grade": 3,
 "age": "kid",
 "idea": "When a place runs out, break one from the next place.",
 "beats": {
  "remember": [
   "Do you remember this one? Make {n} with the blocks."
  ],
  "explore": [
   "Here are some blocks. Take away as many as you like."
  ],
  "name": [
   "You had {a}. You took {b}. Now {diff} are left.",
   "When a place runs out, break one from the next place."
  ],
  "together": [
   "Take {b} from {a}. Break a hundred or a ten if you need to.",
   "Look at the picture of the blocks. Type what is left.",
   "Now try it with the columns."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs clearing. Take {b} logs from the pile of {a}.",
   "One more job. Take {b} from {a}."
  ]
 },
 "reasons": {
  "col": [
   "I took the smaller digit from the bigger one. Top take away bottom."
  ],
  "keep": [
   "I broke a ten but did not take it from the tens."
  ],
  "slip": [
   "Look closer. I slipped there."
  ]
 },
 "home": "Ask {name}: \"What is 430 take away 125?\""
}
```

<details><summary>The API's first draft</summary>

```text
3-Digit Take Away (sub6), grade 3, the kid pet
Idea: When a place runs out, break one from the next place.

Remember:
  - Do you remember this one? Make {n} with the blocks.
Explore:
  - Here are some blocks. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. Now {diff} are left.
  - When a place runs out, break one from the next place.
Together:
  - Take {b} from {a}. Break a hundred or a ten if you need to.
  - Look at the picture of the blocks. Type what is left.
  - Now try it with the columns.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs clearing. Take {b} logs from the pile of {a}.
  - One more job. Take {b} from {a}.
Reasons the pet gives when it is caught:
  col: Look closer. Take from each place the right way.
  keep: Good catch. I slipped there. | Fix it for me?
  slip: Look closer. I slipped there.
Tonight's question: Ask {name}: "What is four hundred thirty minus one hundred twenty five?"
About 3.5 minutes.
```
</details>
