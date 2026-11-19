# Draft: Divide by 2-Digit (dbig4)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Divide by 2-Digit (dbig4), grade 5, the teen pet
Idea: Guess how many fit, multiply back, then check what is left.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Pick a number to divide, and a divisor. I will work it out.
Name it:
  - {n} divided by {b} is {a}.
  - {k} are left over, less than {b}.
  - Guess, multiply back, then check what is left.
Together:
  - Try a number. Too much? Try fewer. Room left? Try more.
  - Use the table of tens to get close. Then finish.
  - Long division now. Same idea: guess, multiply back, check.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab is packing samples into crates. Divide this one.
  - One more crate count.
Reasons the pet gives when it is caught:
  remBig: Oops. My leftover was bigger than the divisor. Another one fits.
  slip: Oops. I was off by one. Multiply back to check.
Tonight's question: Ask {name}: "How many 24s fit in 500?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "a {tens} digit divisor" (no such slot).
- Show lines said {b} and {n} and then the app says the problem again with them; now a scene only.
- The slip reason said "Compare to the model" (there is none in Check me).
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "dbig4",
 "t": "Divide by 2-Digit",
 "grade": 5,
 "age": "teen",
 "idea": "Guess how many fit, multiply back, then check what is left.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Pick a number to divide, and a divisor. I will work it out."
  ],
  "name": [
   "{n} divided by {b} is {a}.",
   "{k} are left over, less than {b}.",
   "Guess, multiply back, then check what is left."
  ],
  "together": [
   "Try a number. Too much? Try fewer. Room left? Try more.",
   "Use the table of tens to get close. Then finish.",
   "Long division now. Same idea: guess, multiply back, check."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab is packing samples into crates. Divide this one.",
   "One more crate count."
  ]
 },
 "reasons": {
  "remBig": [
   "Oops. My leftover was bigger than the divisor. Another one fits."
  ],
  "slip": [
   "Oops. I was off by one. Multiply back to check."
  ]
 },
 "home": "Ask {name}: \"How many 24s fit in 500?\""
}
```

<details><summary>The API's first draft</summary>

```text
Divide by 2-Digit (dbig4), grade 5, the teen pet
Idea: Guess how many fit. Multiply back. Check what is left.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number and a {tens} digit divisor. Use the steppers any way you like.
Name it:
  - You picked {n} and {b}. It fits {a} times.
  - Multiply back to check. What is left is {k}.
  - The left over is less than the divisor.
Together:
  - Guess how many fit into {n} with this divisor.
  - Use the table of tens times the divisor to find the answer and what is left.
  - Now write the division in symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab needs supplies. It takes {b} of one kind to fill a shelf. How many shelves fit in {n}?
  - Another crate holds {b} rocks. How many full crates fit in {n}?
Reasons the pet gives when it is caught:
  remBig: The left over must be less than the divisor. | Fix it so what is left is smaller.
  slip: Look again. That one was off by one. | Compare to the model and fix it.
Tonight's question: Ask {name}: How many full boxes of twenty four fit in one hundred fifty?
About 3.6 minutes.
```

</details>
