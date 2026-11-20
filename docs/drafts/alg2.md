# Draft: Solve with × and ÷ (alg2)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Solve with × and ÷ (alg2), grade 6, the teen pet
Idea: Equal boxes share a total, so divide; a whole cut into boxes, so multiply.

Remember:
  - A times fact from before.
Explore:
  - Build any bar: pick the boxes, and what goes in each.
Name it:
  - Your bar holds {sum} in equal boxes of {x}.
  - If {a}x is {sum}, divide to find x.
  - If x is cut into boxes, multiply to find the whole.
Together:
  - Build the bar: the boxes, then what is in each.
  - Is x one box or the whole bar? Then undo.
  - Undo times with divide, and divide with times.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The core's power rods split their charge equally. Solve these.
Reasons the pet gives when it is caught:
  undo: I did the same operation again. Undo it with the opposite.
  slip: I slipped by one working it out.
Tonight's question: Ask {name}: "6x = 54. What is x?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember repeated the pet's hello and the warm-up line the engine says.
- Name it said "In {a} times {x} the boxes share the total" about any bar the child built.
- The slip reason said "That one was actually right" (the pet is wrong when caught).
- Tonight's question was too long.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "alg2",
 "t": "Solve with × and ÷",
 "grade": 6,
 "age": "teen",
 "idea": "Equal boxes share a total, so divide; a whole cut into boxes, so multiply.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Build any bar: pick the boxes, and what goes in each."
  ],
  "name": [
   "Your bar holds {sum} in equal boxes of {x}.",
   "If {a}x is {sum}, divide to find x.",
   "If x is cut into boxes, multiply to find the whole."
  ],
  "together": [
   "Build the bar: the boxes, then what is in each.",
   "Is x one box or the whole bar? Then undo.",
   "Undo times with divide, and divide with times."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The core's power rods split their charge equally. Solve these."
  ]
 },
 "reasons": {
  "undo": [
   "I did the same operation again. Undo it with the opposite."
  ],
  "slip": [
   "I slipped by one working it out."
  ]
 },
 "home": "Ask {name}: \"6x = 54. What is x?\""
}
```

<details><summary>The API's first draft</summary>

```text
Solve with × and ÷ (alg2), grade 6, the teen pet
Idea: Equal groups share the total so divide. The whole bar multiplies.

Remember:
  - Hey {name}. Here is today's idea.
  - Warm-up first. What is {a} times {b}?
Explore:
  - Picture it first. Build a bar of equal boxes. Pick how many boxes and what is in each.
Name it:
  - Look at the bar you built.
  - In {a} times {x} the boxes share the total so divide.
  - In {x} divided by {a} the whole bar multiplies.
Together:
  - Build the bar that fits this equation.
  - Now picture it and type what x stands for.
  - Now solve it with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - In the galaxy core the power rods must balance. Solve these.
Reasons the pet gives when it is caught:
  undo: Look again. That one was wrong. | Fix it. The bar shows the opposite operation.
  slip: That one was actually right. | Look again. That one was wrong.
Tonight's question: Ask {name}: What does a bar model show you when you solve six times x equals forty eight?
About 3.4 minutes.
```

</details>
