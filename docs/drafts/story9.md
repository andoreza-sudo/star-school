# Draft: Rate & Percent Stories (story9)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Rate & Percent Stories (story9), grade 6, the teen pet
Idea: Picture the story first: a rate grows by equal groups, a percent takes tenths of the whole.

Remember:
  - A percent from before.
Explore:
  - Shade any percent of the bar you like.
Name it:
  - You shaded {n} percent of the bar.
  - That part is worth {a}.
  - Picture the story: equal groups make a rate, tenths make a percent.
Together:
  - Rate story: build the table. Percent story: shade the bar.
  - Use the model to find the missing number.
  - Picture the story first, then pick the operation.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The ship's crew has orders and sales to settle. Work them out.
Reasons the pet gives when it is caught:
  addRat: I added the same amount. A rate grows by times.
  pctNum: I gave the percent, not that part of the whole.
  wrongOp: I used the wrong operation for the story.
Tonight's question: Ask {name}: "A $40 jacket is 25% off. How much do you save?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember and Explore used {a}, a slot those beats do not have.
- Name it said "That is {a} of {a}".
- The idea was only "Picture the story first."
- Tonight's question was too long and used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "story9",
 "t": "Rate & Percent Stories",
 "grade": 6,
 "age": "teen",
 "idea": "Picture the story first: a rate grows by equal groups, a percent takes tenths of the whole.",
 "beats": {
  "remember": [
   "A percent from before."
  ],
  "explore": [
   "Shade any percent of the bar you like."
  ],
  "name": [
   "You shaded {n} percent of the bar.",
   "That part is worth {a}.",
   "Picture the story: equal groups make a rate, tenths make a percent."
  ],
  "together": [
   "Rate story: build the table. Percent story: shade the bar.",
   "Use the model to find the missing number.",
   "Picture the story first, then pick the operation."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The ship's crew has orders and sales to settle. Work them out."
  ]
 },
 "reasons": {
  "addRat": [
   "I added the same amount. A rate grows by times."
  ],
  "pctNum": [
   "I gave the percent, not that part of the whole."
  ],
  "wrongOp": [
   "I used the wrong operation for the story."
  ]
 },
 "home": "Ask {name}: \"A $40 jacket is 25% off. How much do you save?\""
}
```

<details><summary>The API's first draft</summary>

```text
Rate & Percent Stories (story9), grade 6, the teen pet
Idea: Picture the story first.

Remember:
  - Do you remember this? Ten percent of {a}.
Explore:
  - Shade any percent you like on the bar for {a}.
Name it:
  - You shaded {n} percent.
  - That is {a} of {a}.
  - Picture the story first.
Together:
  - Picture this story first.
  - Build the table or shade the bar.
  - Now find the missing part.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Help fix the star charts on the new ship.
  - One more chart to finish the job.
Reasons the pet gives when it is caught:
  addRat: That adds the parts. Try multiplying both by the same number.
  pctNum: That is the percent. Find that part of the whole number.
  wrongOp: Check the story. Does it ask for groups or for a part of the whole?
Tonight's question: Ask {name}: "If a store has a twenty percent off sale, how would you find the discount on a seventy dollar jacket?"
About 3.3 minutes.
```

</details>
