# Draft: Mean, Median, Mode (data5)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Mean, Median, Mode (data5), grade 6, the teen pet
Idea: The mean shares the total equally; the median is the middle of the numbers in order.

Remember:
  - A times fact from before.
Explore:
  - Move the level line. Watch the blocks above and the gaps below.
Name it:
  - At {k}, there are {a} blocks above and {b} gaps below.
  - When those match, the line is at the mean.
  - The median is different: the middle number once they are in order.
Together:
  - Move the line until the extra blocks fill the gaps.
  - Mean: add and share. Median: order, then the middle.
  - Check which one it asks for before you start.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The crew logged new readings. Work these out.
Reasons the pet gives when it is caught:
  meanSum: I gave the total. It still had to be shared out.
  medSort: I took the middle before putting them in order.
Tonight's question: Ask {name}: "What is the mean of 2, 5, 3 and 6?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Show said "Find the mean and the median" (a Show item may ask the range or the mode).
- Reasons were advice to the child; they are now the pet's slip.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "data5",
 "t": "Mean, Median, Mode",
 "grade": 6,
 "age": "teen",
 "idea": "The mean shares the total equally; the median is the middle of the numbers in order.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Move the level line. Watch the blocks above and the gaps below."
  ],
  "name": [
   "At {k}, there are {a} blocks above and {b} gaps below.",
   "When those match, the line is at the mean.",
   "The median is different: the middle number once they are in order."
  ],
  "together": [
   "Move the line until the extra blocks fill the gaps.",
   "Mean: add and share. Median: order, then the middle.",
   "Check which one it asks for before you start."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The crew logged new readings. Work these out."
  ]
 },
 "reasons": {
  "meanSum": [
   "I gave the total. It still had to be shared out."
  ],
  "medSort": [
   "I took the middle before putting them in order."
  ]
 },
 "home": "Ask {name}: \"What is the mean of 2, 5, 3 and 6?\""
}
```

<details><summary>The API's first draft</summary>

```text
Mean, Median, Mode (data5), grade 6, the teen pet
Idea: The mean is the total shared equally. The median is the middle of the numbers in order.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Move the level line on these towers. Find where the blocks above fill the gaps below.
Name it:
  - You set the line at {k}.
  - There are {a} blocks above and {b} gaps below.
  - The mean shares the total equally. The median is the middle in order.
Together:
  - Picture the level where the blocks above fill the gaps below.
  - Use the model to find the mean or the median.
  - Now find the mean, median, mode or range.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space crew has new readings. Find the mean and the median.
Reasons the pet gives when it is caught:
  meanSum: That is the total. Share it out equally to find the mean.
  medSort: Put the list in order first. Then find the middle.
Tonight's question: Ask {name}: What is the mean of four and six?
About 3.5 minutes.
```

</details>
