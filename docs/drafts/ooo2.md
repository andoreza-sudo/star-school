# Draft: Exponents (ooo2)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Exponents (ooo2), grade 6, the teen pet
Idea: The exponent says how many times the base is used as a factor.

Remember:
  - A times fact from before.
Explore:
  - Pick a base, and how many times to use it as a factor.
Name it:
  - {a} used {n} times makes {sum}.
  - The small number counts the factors.
  - It never means the base times that number.
Together:
  - Set the base, then how many times it is used.
  - Count the squares, or the cubes, layer by layer.
  - Brackets first, then powers, then the rest in order.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The station's power readings use exponents. Work them out.
Reasons the pet gives when it is caught:
  powMul: I multiplied the base by the small number. It counts factors.
  order: I did the steps out of order. Powers come before times and plus.
Tonight's question: Ask {name}: "Is 4 cubed the same as 4 times 3? Why not?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember said "Show me {a} times {b}" (a typed fact, nothing to show).
- Name it said "{a} to the {n}"; it now says what the child built.
- Together line 3 "Find the value of the power" came before an expression with brackets and a power.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ooo2",
 "t": "Exponents",
 "grade": 6,
 "age": "teen",
 "idea": "The exponent says how many times the base is used as a factor.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Pick a base, and how many times to use it as a factor."
  ],
  "name": [
   "{a} used {n} times makes {sum}.",
   "The small number counts the factors.",
   "It never means the base times that number."
  ],
  "together": [
   "Set the base, then how many times it is used.",
   "Count the squares, or the cubes, layer by layer.",
   "Brackets first, then powers, then the rest in order."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The station's power readings use exponents. Work them out."
  ]
 },
 "reasons": {
  "powMul": [
   "I multiplied the base by the small number. It counts factors."
  ],
  "order": [
   "I did the steps out of order. Powers come before times and plus."
  ]
 },
 "home": "Ask {name}: \"Is 4 cubed the same as 4 times 3? Why not?\""
}
```

<details><summary>The API's first draft</summary>

```text
Exponents (ooo2), grade 6, the teen pet
Idea: The exponent says how many times to use the base as a factor.

Remember:
  - Do you remember this? Show me {a} times {b}.
Explore:
  - Use the steppers. Build the power any way you like.
Name it:
  - You built {a} to the {n}.
  - That makes {sum}.
  - The exponent says how many times to use the base as a factor.
Together:
  - Build this power with the steppers.
  - Now picture the square or cube.
  - Find the value of the power.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power readings. Find each value.
Reasons the pet gives when it is caught:
  powMul: The exponent is not a multiplier. It counts the factors.
  order: Powers first. Multiply after.
Tonight's question: Ask {name}: What does four to the three mean?
About 3.3 minutes.
```

</details>
