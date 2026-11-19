# Draft: Rulers & Scales (meas4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Rulers & Scales (meas4), grade 3, the kid pet
Idea: Find what one mark is worth, then count by it.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Each mark on this scale is {k} grams. Move the needle to any mark.
Name it:
  - Each mark is worth {k} grams.
  - Your needle shows {n} grams.
  - Find what one mark is worth, then count by it.
Together:
  - Count by the marks to make it show the amount.
  - Find what one mark is worth. Then read it.
  - No picture now. Count by the marks in your head.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The bakery needs its flour and water measured. Read this one.
  - One more reading for the bakery.
Reasons the pet gives when it is caught:
  mark1: Oops. I counted each mark as one. Each mark is worth more.
  rEnd: Oops. I read the end of the ruler. It did not start at zero.
  skip: Oops. I was one mark off. I should count the marks again.
Tonight's question: Ask {name} to read the marks on a measuring cup.
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember had two lines ("Hey {name}. New idea today."); only one is said.
- Show 2 asked to read a shelf on a ruler; Show items may be a scale, a jug or a ruler, so the lines no longer name one.
- The skip reasons were not the pet's slip ("One group too many").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "meas4",
 "t": "Rulers & Scales",
 "grade": 3,
 "age": "kid",
 "idea": "Find what one mark is worth, then count by it.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Each mark on this scale is {k} grams. Move the needle to any mark."
  ],
  "name": [
   "Each mark is worth {k} grams.",
   "Your needle shows {n} grams.",
   "Find what one mark is worth, then count by it."
  ],
  "together": [
   "Count by the marks to make it show the amount.",
   "Find what one mark is worth. Then read it.",
   "No picture now. Count by the marks in your head."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The bakery needs its flour and water measured. Read this one.",
   "One more reading for the bakery."
  ]
 },
 "reasons": {
  "mark1": [
   "Oops. I counted each mark as one. Each mark is worth more."
  ],
  "rEnd": [
   "Oops. I read the end of the ruler. It did not start at zero."
  ],
  "skip": [
   "Oops. I was one mark off. I should count the marks again."
  ]
 },
 "home": "Ask {name} to read the marks on a measuring cup."
}
```

<details><summary>The API's first draft</summary>

```text
Rulers & Scales (meas4), grade 3, the kid pet
Idea: Find what one mark is worth then count by it.

Remember:
  - Hey {name}. New idea today.
  - Do you remember this? What is {a} times {b}?
Explore:
  - Move the needle on this scale. Any mark works.
Name it:
  - The marks are worth {k} grams each.
  - The needle shows {n} grams.
  - Find what one mark is worth then count by it.
Together:
  - Get the scale ready for this amount.
  - Read how much the scale shows.
  - Now read this one told in words only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The recipe needs this much sugar. Read the scale.
  - The shelf is this long. Read the ruler.
Reasons the pet gives when it is caught:
  mark1: Each mark is worth more than one gram. | Count by the mark value.
  rEnd: The object does not start at zero. | Start where the object starts.
  skip: One group too many. | Count each mark once.
Tonight's question: Ask {name}: How many grams if each mark is 25?
About 3.4 minutes.
```

</details>
