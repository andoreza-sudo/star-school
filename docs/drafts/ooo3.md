# Draft: Evaluate Expressions (ooo3)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Evaluate Expressions (ooo3), grade 6, the teen pet
Idea: Put the number in for x; a number next to x means times.

Remember:
  - A times fact from before.
Explore:
  - Build any boxes of x. The extra box stays as it is.
Name it:
  - With x as {x}, your bar comes to {sum}.
  - That is {a} times {x}, then the extra box.
  - A number next to x means times: put the number in, multiply, then add.
Together:
  - Build the boxes of x first.
  - The value of x is in each box. Times first, then add.
  - Put the number in for x. Times first.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The core's power cells run on these formulas. Work them out.
Reasons the pet gives when it is caught:
  catVar: I wrote the number and x side by side. Next to x means times.
  order: I added before multiplying. Times comes first.
  slip: I slipped by one in a step.
Tonight's question: Ask {name}: "What is 3x + 4 when x is 5?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore was 21 words and used a slot Explore does not have.
- Name it said "{a} groups", which reads "1 groups" for one box.
- Every reason began "Look again. That one was wrong." or "Fair. I got that wrong." (the engine's lines); a reason had a slot no reason has.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ooo3",
 "t": "Evaluate Expressions",
 "grade": 6,
 "age": "teen",
 "idea": "Put the number in for x; a number next to x means times.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Build any boxes of x. The extra box stays as it is."
  ],
  "name": [
   "With x as {x}, your bar comes to {sum}.",
   "That is {a} times {x}, then the extra box.",
   "A number next to x means times: put the number in, multiply, then add."
  ],
  "together": [
   "Build the boxes of x first.",
   "The value of x is in each box. Times first, then add.",
   "Put the number in for x. Times first."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The core's power cells run on these formulas. Work them out."
  ]
 },
 "reasons": {
  "catVar": [
   "I wrote the number and x side by side. Next to x means times."
  ],
  "order": [
   "I added before multiplying. Times comes first."
  ],
  "slip": [
   "I slipped by one in a step."
  ]
 },
 "home": "Ask {name}: \"What is 3x + 4 when x is 5?\""
}
```

<details><summary>The API's first draft</summary>

```text
Evaluate Expressions (ooo3), grade 6, the teen pet
Idea: Put the number in for x, and a number next to x means times.

Remember:
  - Do you remember this fact? What is {a} times {b}?
Explore:
  - Build a bar of equal boxes and one more box of {x}. Pick how many boxes and what is in each.
Name it:
  - Look at the bar you built. This shows {a} groups of {x}.
  - The total is {sum}.
  - A number next to x means times. So {a} x is {a} times x.
Together:
  - Build the bar for this expression and the value of x.
  - Now read the bar and find the value.
  - Work this one with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The core needs power cells. Find the value of each expression.
Reasons the pet gives when it is caught:
  catVar: Look again. That one was wrong. | {a} x is {a} times x, not side by side.
  order: Look again. That one was wrong. | Multiply before you add or take away.
  slip: Fair. I got that wrong. | Fix it.
Tonight's question: Ask {name}: What is four x plus six when x is five?
About 3.5 minutes.
```

</details>
