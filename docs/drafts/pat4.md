# Draft: In and Out Tables (pat4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
In and Out Tables (pat4), grade 4, the kid pet
Idea: The rule goes across, from each in number to its out number.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Set any rule you like. Watch what it does to each in number.
Name it:
  - Your rule turns {a} into {sum}.
  - A rule goes across, from in to out.
  - Test a rule on every row.
Together:
  - Look across each row. Set the rule that works on every row.
  - Find the rule first. Then use it on the new number.
  - No table now. Just use the rule.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert market has a price table. Find the missing number.
  - One more table for the market.
Reasons the pet gives when it is caught:
  rowJump: Oops. I followed the jumps down the out column. The rule goes across.
  mulAdd: Oops. I added when the rule multiplies.
Tonight's question: Ask {name}: "In 2, out 8. In 3, out 12. What is the rule?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together 3 said "The rule is in words only" (not a line a child understands).
- The rowJump reason said "The out column has the answers" (untrue: that is the mistake).
- The mulAdd reason did not say the pet's slip.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pat4",
 "t": "In and Out Tables",
 "grade": 4,
 "age": "kid",
 "idea": "The rule goes across, from each in number to its out number.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Set any rule you like. Watch what it does to each in number."
  ],
  "name": [
   "Your rule turns {a} into {sum}.",
   "A rule goes across, from in to out.",
   "Test a rule on every row."
  ],
  "together": [
   "Look across each row. Set the rule that works on every row.",
   "Find the rule first. Then use it on the new number.",
   "No table now. Just use the rule."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The desert market has a price table. Find the missing number.",
   "One more table for the market."
  ]
 },
 "reasons": {
  "rowJump": [
   "Oops. I followed the jumps down the out column. The rule goes across."
  ],
  "mulAdd": [
   "Oops. I added when the rule multiplies."
  ]
 },
 "home": "Ask {name}: \"In 2, out 8. In 3, out 12. What is the rule?\""
}
```

<details><summary>The API's first draft</summary>

```text
In and Out Tables (pat4), grade 4, the kid pet
Idea: The rule goes across from each in number to its out number.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Set any rule you like. Watch what it does to each in number.
Name it:
  - The rule goes from each in number to its out number.
  - Your rule takes {a} to {sum}.
  - Test the rule on every row.
Together:
  - Set the rule that makes this table true.
  - Find the missing out number.
  - The rule is in words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The desert map needs tables filled. Help finish them.
Reasons the pet gives when it is caught:
  rowJump: The out column has the answers. Follow the rule across from in to out.
  mulAdd: That adds the numbers. Use the rule to change each in number.
Tonight's question: Ask {name}: What rule could turn five into ten and six into twelve?
About 3.3 minutes.
```

</details>
