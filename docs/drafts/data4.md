# Draft: Line Plots (data4)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Line Plots (data4), grade 5, the teen pet
Idea: Each dot is a length. To find a total, add the lengths, not the dots.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - Put dots on any marks of the line plot.
Name it:
  - You put {n} dots on the line plot.
  - Each dot stands for one length.
  - For a total, add the lengths, not the dots.
Together:
  - Put one dot on the line plot for each length.
  - Find the dots on that mark. Add their lengths.
  - No plot now. Add the lengths.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden crew measured their seedlings. Find this total.
  - One more total for the crew.
Reasons the pet gives when it is caught:
  dotsVal: Oops. I counted the dots. I should add their lengths.
  addBot: Oops. I added the bottom numbers. The part size stays the same.
Tonight's question: Ask {name} to measure 5 pencils to the nearest half inch.
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together 3 said "say the total in words only" (the child types it).
- The addBot reason told the child what to add; it is now the pet's own slip.
- Tonight's question ("Draw a line plot with four marks") used a number word and no data.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "data4",
 "t": "Line Plots",
 "grade": 5,
 "age": "teen",
 "idea": "Each dot is a length. To find a total, add the lengths, not the dots.",
 "beats": {
  "remember": [
   "Quick warm-up. Name the shaded fraction."
  ],
  "explore": [
   "Put dots on any marks of the line plot."
  ],
  "name": [
   "You put {n} dots on the line plot.",
   "Each dot stands for one length.",
   "For a total, add the lengths, not the dots."
  ],
  "together": [
   "Put one dot on the line plot for each length.",
   "Find the dots on that mark. Add their lengths.",
   "No plot now. Add the lengths."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The garden crew measured their seedlings. Find this total.",
   "One more total for the crew."
  ]
 },
 "reasons": {
  "dotsVal": [
   "Oops. I counted the dots. I should add their lengths."
  ],
  "addBot": [
   "Oops. I added the bottom numbers. The part size stays the same."
  ]
 },
 "home": "Ask {name} to measure 5 pencils to the nearest half inch."
}
```

<details><summary>The API's first draft</summary>

```text
Line Plots (data4), grade 5, the teen pet
Idea: Each dot shows one length. Add the lengths of the dots.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Use the stepper. Put any dots you like on the marks.
Name it:
  - You made a line plot with {n} dots.
  - Each dot is one length.
  - Add the lengths of the dots to find a total.
Together:
  - Put a dot on the line plot for each length.
  - Read the line plot. What is the total length?
  - Now say the total in words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Find the total length of the path pieces.
Reasons the pet gives when it is caught:
  dotsVal: Look again. Add the lengths. Do not count the dots.
  addBot: The bottom number is the size of each part. Add only the top numbers.
Tonight's question: Ask {name}: "Draw a line plot with four marks."
About 3.3 minutes.
```

</details>
