# Draft: Unit Fraction Division (fop6)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Unit Fraction Division (fop6), grade 5, the teen pet
Idea: Dividing by a unit fraction counts how many of those pieces fit.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - Cut each bar into any number of equal parts.
Name it:
  - {n} bars cut into {b} parts each make {sum} pieces.
  - So {n} divided by one of those parts is {sum}.
  - Dividing by a unit fraction counts the pieces that fit.
Together:
  - Cut every bar into the parts the problem names. Count the pieces.
  - Count the pieces in the picture.
  - Symbols only now. Picture the pieces.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The crystal cutters need to know how many pieces they get. Solve this.
  - One more for the cutters.
Reasons the pet gives when it is caught:
  flipDiv: Oops. I divided the wrong way round. Count the pieces that fit.
  mulFrac: Oops. I multiplied. This problem divides.
  slip: Oops. I was off by one piece. Count again.
Tonight's question: Ask {name}: "How many quarter pizzas are in 3 pizzas?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea was 23 words (the teen pet's lines are 20 at most).
- The flipDiv reason said "The fraction is upside down" (the pet divided the wrong way, it did not flip a fraction).
- Tonight's question (one pie shared by four) asked about 1 ÷ 4, not the lesson's whole number ÷ unit fraction.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop6",
 "t": "Unit Fraction Division",
 "grade": 5,
 "age": "teen",
 "idea": "Dividing by a unit fraction counts how many of those pieces fit.",
 "beats": {
  "remember": [
   "Quick warm-up. Name the shaded fraction."
  ],
  "explore": [
   "Cut each bar into any number of equal parts."
  ],
  "name": [
   "{n} bars cut into {b} parts each make {sum} pieces.",
   "So {n} divided by one of those parts is {sum}.",
   "Dividing by a unit fraction counts the pieces that fit."
  ],
  "together": [
   "Cut every bar into the parts the problem names. Count the pieces.",
   "Count the pieces in the picture.",
   "Symbols only now. Picture the pieces."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The crystal cutters need to know how many pieces they get. Solve this.",
   "One more for the cutters."
  ]
 },
 "reasons": {
  "flipDiv": [
   "Oops. I divided the wrong way round. Count the pieces that fit."
  ],
  "mulFrac": [
   "Oops. I multiplied. This problem divides."
  ],
  "slip": [
   "Oops. I was off by one piece. Count again."
  ]
 },
 "home": "Ask {name}: \"How many quarter pizzas are in 3 pizzas?\""
}
```

<details><summary>The API's first draft</summary>

```text
Unit Fraction Division (fop6), grade 5, the teen pet
Idea: A whole divided by a unit fraction tells how many pieces fit. A unit fraction divided by a whole cuts one piece smaller.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Cut each whole bar into equal parts. Any number of parts is fine.
Name it:
  - You cut {n} bars into {b} parts each.
  - That makes {sum} pieces in all.
  - A whole divided by a unit fraction tells how many pieces fit.
Together:
  - First cut the whole bars into the parts the problem names.
  - Now picture the cut bars and type what fits.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Find the answers and finish the cave map.
Reasons the pet gives when it is caught:
  flipDiv: The fraction is upside down. The unit fraction is the divisor.
  mulFrac: We divide here. Multiply only when the story asks to multiply.
  slip: Look again. That one was off by one.
Tonight's question: Ask {name}: "If we share one pie equally among four friends what fraction does each get?"
About 3.4 minutes.
```

</details>
