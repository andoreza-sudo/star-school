# Draft: One-Step Equations (alg1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
One-Step Equations (alg1), grade 6, the teen pet
Idea: Undo what is done to x: do the opposite to both sides.

Remember:
  - A take-away fact from before.
Explore:
  - Set x to any number and watch both bars.
Name it:
  - With x as {x}, the bottom bar is {sum}.
  - The bars match when both sides are equal.
  - To get x alone, do the opposite to both sides.
Together:
  - Set x until both bars are the same length.
  - The bars show the parts. Undo the known one.
  - Undo it in your head: the opposite operation.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The gate code is the value of x. Crack both.
Reasons the pet gives when it is caught:
  undo: I did the same operation again instead of undoing it.
  slip: I slipped by one working it out.
Tonight's question: Ask {name}: "x + 17 = 42. What is x? How do you know?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea had a slot ("An equation is {sum} equal amounts": the model meant "two") and Name it used {other}, which this lesson does not have.
- Explore said "Set the bar so both sides match" (any x is fine in Explore).
- A reason said "Fix it.", the engine's own step.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "alg1",
 "t": "One-Step Equations",
 "grade": 6,
 "age": "teen",
 "idea": "Undo what is done to x: do the opposite to both sides.",
 "beats": {
  "remember": [
   "A take-away fact from before."
  ],
  "explore": [
   "Set x to any number and watch both bars."
  ],
  "name": [
   "With x as {x}, the bottom bar is {sum}.",
   "The bars match when both sides are equal.",
   "To get x alone, do the opposite to both sides."
  ],
  "together": [
   "Set x until both bars are the same length.",
   "The bars show the parts. Undo the known one.",
   "Undo it in your head: the opposite operation."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The gate code is the value of x. Crack both."
  ]
 },
 "reasons": {
  "undo": [
   "I did the same operation again instead of undoing it."
  ],
  "slip": [
   "I slipped by one working it out."
  ]
 },
 "home": "Ask {name}: \"x + 17 = 42. What is x? How do you know?\""
}
```

<details><summary>The API's first draft</summary>

```text
One-Step Equations (alg1), grade 6, the teen pet
Idea: An equation is {sum} equal amounts.

Remember:
  - Do you remember this? What is {a} take away {b}?
Explore:
  - Set the bar so both sides match.
Name it:
  - You found {x}.
  - {x} and {other} make {sum}.
  - An equation is {sum} equal amounts. Undo what is done to the letter by doing the opposite to both sides.
Together:
  - Make both bars the same length first.
  - Find what belongs in place of the mark.
  - Now write the symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space gate needs its code. Solve both and open the lock.
Reasons the pet gives when it is caught:
  undo: Undo what is joined to the letter. | Fix it. Do the opposite on both sides.
  slip: Look again. That one was off by one.
Tonight's question: Ask {name}: "What number plus nine equals twenty?"
About 3.4 minutes.
```

</details>
