# Draft: Ratios and Tables (ratio1)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Ratios and Tables (ratio1), grade 6, the teen pet
Idea: A ratio table grows by multiplying both rows by the same number.

Remember:
  - A times fact from before.
Explore:
  - Every group has the same red and blue beads. Add as many groups as you like.
Name it:
  - Your table reaches {a} red and {b} blue.
  - That is the first column times {k}, in both rows.
  - A ratio table grows by multiplying both rows, never by adding the same amount.
Together:
  - Build it out one column at a time.
  - Every column follows one rule. Use it for the empty box.
  - No table this time. Picture it, then multiply.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The bead shop mixes its colors by the ratio. Work out the order.
Reasons the pet gives when it is caught:
  addRat: I added the same amount to both rows. A ratio grows by times.
  ratSwap: I took the number from the wrong row. Each amount stays in its own row.
Tonight's question: Ask {name}: "3 red for every 5 blue. How many blue with 12 red?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember said "Do you remember this? What is {a} times {b}?": the engine already says the warm-up line and the app says the fact.
- Name it opened with "Look at the table you built" and never used the child's numbers; it now names the table they built.
- Together line 1 said "Let's build ..." and line 3 "make the table" before an item with no table; Show asked "How many of each?" when Show asks one number.
- The reasons spoke to the child ("We multiply ...", "Check which ..."); they are now the pet's own slip.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ratio1",
 "t": "Ratios and Tables",
 "grade": 6,
 "age": "teen",
 "idea": "A ratio table grows by multiplying both rows by the same number.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Every group has the same red and blue beads. Add as many groups as you like."
  ],
  "name": [
   "Your table reaches {a} red and {b} blue.",
   "That is the first column times {k}, in both rows.",
   "A ratio table grows by multiplying both rows, never by adding the same amount."
  ],
  "together": [
   "Build it out one column at a time.",
   "Every column follows one rule. Use it for the empty box.",
   "No table this time. Picture it, then multiply."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The bead shop mixes its colors by the ratio. Work out the order."
  ]
 },
 "reasons": {
  "addRat": [
   "I added the same amount to both rows. A ratio grows by times."
  ],
  "ratSwap": [
   "I took the number from the wrong row. Each amount stays in its own row."
  ]
 },
 "home": "Ask {name}: \"3 red for every 5 blue. How many blue with 12 red?\""
}
```

<details><summary>The API's first draft</summary>

```text
Ratios and Tables (ratio1), grade 6, the teen pet
Idea: A ratio table grows by multiplying both rows by the same number.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build the table. Add groups of red and blue beads any way you like.
Name it:
  - Look at the table you built.
  - Each group has the same ratio.
  - A ratio table grows by multiplying both rows by the same number, never by adding the same amount.
Together:
  - Let's build a table out to the amount we need.
  - Now fill the empty box in this table.
  - Now make the table from the ratio in words.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The tower needs red and blue beads in the right ratio. How many of each?
Reasons the pet gives when it is caught:
  addRat: We multiply both parts by the same number. We never add the same amount.
  ratSwap: Check which number belongs with red and which with blue.
Tonight's question: Ask {name}: "Two flour to three water. How much flour for nine water?"
About 3.5 minutes.
```

</details>
