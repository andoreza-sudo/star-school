# Draft: Fractions and Percents (ratio4)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Fractions and Percents (ratio4), grade 6, the teen pet
Idea: To write a fraction as a percent, rename it out of a hundred.

Remember:
  - A fraction from before.
Explore:
  - The grid has a hundred squares. Shade as many as you like.
Name it:
  - You shaded {n} squares out of a hundred.
  - So that is {n} percent.
  - Rename a fraction out of a hundred; then the top is the percent.
Together:
  - Shade the same amount of the hundred grid.
  - Think: how many hundredths is that bar?
  - Rename it out of a hundred, then read the top.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The paint shop labels its tins in percents. Convert these.
Reasons the pet gives when it is caught:
  pctTop: I used the top number as it was. The bottom had to be a hundred first.
  pctCat: I stuck the top and the bottom together. That is not a percent.
Tonight's question: Ask {name}: "What percent is 3/4? And 2/5?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 2 said "shade the fraction bar" before a picture item where the child types the percent.
- Show asked "What percent is shaded here?" but Show has no picture.
- Reasons told the child what to do; they are now the pet's slip.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ratio4",
 "t": "Fractions and Percents",
 "grade": 6,
 "age": "teen",
 "idea": "To write a fraction as a percent, rename it out of a hundred.",
 "beats": {
  "remember": [
   "A fraction from before."
  ],
  "explore": [
   "The grid has a hundred squares. Shade as many as you like."
  ],
  "name": [
   "You shaded {n} squares out of a hundred.",
   "So that is {n} percent.",
   "Rename a fraction out of a hundred; then the top is the percent."
  ],
  "together": [
   "Shade the same amount of the hundred grid.",
   "Think: how many hundredths is that bar?",
   "Rename it out of a hundred, then read the top."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The paint shop labels its tins in percents. Convert these."
  ]
 },
 "reasons": {
  "pctTop": [
   "I used the top number as it was. The bottom had to be a hundred first."
  ],
  "pctCat": [
   "I stuck the top and the bottom together. That is not a percent."
  ]
 },
 "home": "Ask {name}: \"What percent is 3/4? And 2/5?\""
}
```

<details><summary>The API's first draft</summary>

```text
Fractions and Percents (ratio4), grade 6, the teen pet
Idea: Percent means out of a hundred.

Remember:
  - Do you remember this? Name the shaded part as a fraction.
Explore:
  - Shade any squares you like on the hundred grid. Use the steppers.
Name it:
  - You shaded {n} squares.
  - That is {n} percent.
  - Percent means out of a hundred so rename a fraction with bottom a hundred and read the top.
Together:
  - Picture this fraction on the hundred grid.
  - Now shade the fraction bar to match.
  - Write the percent for this fraction.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The tower needs a new coat of paint. What percent is shaded here?
Reasons the pet gives when it is caught:
  pctTop: That is the top number only. Percent is the top after the bottom is a hundred.
  pctCat: Do not put top and bottom side by side. Rename so bottom is a hundred then read top.
Tonight's question: Ask {name}: What percent of a dollar is fifty cents?
About 3.4 minutes.
```

</details>
