# Draft: Percent of a Number (ratio3)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Percent of a Number (ratio3), grade 6, the teen pet
Idea: Percent means out of a hundred: find one tenth, then take as many tenths as you need.

Remember:
  - A times fact from before.
Explore:
  - Each box of this bar is ten percent. Shade any amount you like.
Name it:
  - You shaded {n} percent of {k}.
  - That part is worth {a}.
  - Find one tenth first, then take as many tenths as the percent says.
Together:
  - Each box is ten percent. Shade the boxes you need.
  - Find what one box is worth, then add up the shaded part.
  - No bar now. One tenth first, then scale.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The supply depot hands out shares by percent. Work them out.
Reasons the pet gives when it is caught:
  pctNum: I gave the percent itself, not that part of the number.
  pct10: I found ten percent and stopped. I needed more tenths than that.
Tonight's question: Ask {name}: "What is 30% of 70?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea was only "Percent means out of a hundred" (the method was missing).
- Together lines were "Picture the bar first." before a build; they now say what to do on each kind of item.
- A reason told the child to "use the bar"; reasons are now the pet's own slip.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ratio3",
 "t": "Percent of a Number",
 "grade": 6,
 "age": "teen",
 "idea": "Percent means out of a hundred: find one tenth, then take as many tenths as you need.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Each box of this bar is ten percent. Shade any amount you like."
  ],
  "name": [
   "You shaded {n} percent of {k}.",
   "That part is worth {a}.",
   "Find one tenth first, then take as many tenths as the percent says."
  ],
  "together": [
   "Each box is ten percent. Shade the boxes you need.",
   "Find what one box is worth, then add up the shaded part.",
   "No bar now. One tenth first, then scale."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The supply depot hands out shares by percent. Work them out."
  ]
 },
 "reasons": {
  "pctNum": [
   "I gave the percent itself, not that part of the number."
  ],
  "pct10": [
   "I found ten percent and stopped. I needed more tenths than that."
  ]
 },
 "home": "Ask {name}: \"What is 30% of 70?\""
}
```

<details><summary>The API's first draft</summary>

```text
Percent of a Number (ratio3), grade 6, the teen pet
Idea: Percent means out of a hundred.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the bar to shade any percent you like.
Name it:
  - You shaded {n} percent of {k}. That is {a}.
  - Percent means out of a hundred.
  - Ten percent is one tenth so take as many as the percent says.
Together:
  - Picture the bar first.
  - Now find the part of the bar.
  - Use the same idea with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The tower needs supplies. Find the part each crew gets.
Reasons the pet gives when it is caught:
  pctNum: The percent is not the part. Use the bar to find the part of the number.
  pct10: Ten percent is one tenth. Keep going for the full percent.
Tonight's question: Ask {name}: What is fifty percent of twenty?
About 3.3 minutes.
```

</details>
