# Draft: Two Rules (pat5)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Two Rules (pat5), grade 5, the teen pet
Idea: Find how each number of pattern B comes from its partner in A.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Set any rule. See what it does to each number.
Name it:
  - Your rule turns {a} into {sum}.
  - A rule links each number to its partner.
  - Find the rule from A to B, then use it.
Together:
  - Look across each row. Set the rule from A to B.
  - Find the rule across, then use it on the new A.
  - No table now. Find how B is made from A.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave lights follow patterns. Find the missing number.
  - One more pattern for the lights.
Reasons the pet gives when it is caught:
  rowJump: Oops. I added the gap between the patterns. B is a number of times A.
  skip: Oops. I was one step off. I should check the rule again.
Tonight's question: Ask {name}: "Count by 3s and by 6s. How do the lists match?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it and Show said "{k} patterns" (no number there).
- Explore called it an in and out table (this lesson's table is A and B).
- The reasons were not the pet's own slip.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pat5",
 "t": "Two Rules",
 "grade": 5,
 "age": "teen",
 "idea": "Find how each number of pattern B comes from its partner in A.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Set any rule. See what it does to each number."
  ],
  "name": [
   "Your rule turns {a} into {sum}.",
   "A rule links each number to its partner.",
   "Find the rule from A to B, then use it."
  ],
  "together": [
   "Look across each row. Set the rule from A to B.",
   "Find the rule across, then use it on the new A.",
   "No table now. Find how B is made from A."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The cave lights follow patterns. Find the missing number.",
   "One more pattern for the lights."
  ]
 },
 "reasons": {
  "rowJump": [
   "Oops. I added the gap between the patterns. B is a number of times A."
  ],
  "skip": [
   "Oops. I was one step off. I should check the rule again."
  ]
 },
 "home": "Ask {name}: \"Count by 3s and by 6s. How do the lists match?\""
}
```

<details><summary>The API's first draft</summary>

```text
Two Rules (pat5), grade 5, the teen pet
Idea: Find how each number of one is made from the number beside it.

Remember:
  - Do you remember this fact? What is {a} times {b}?
Explore:
  - Here is an in and out table. Set any sign and number as the rule. Watch what it does.
Name it:
  - Your rule turns {a} into {sum}.
  - Look at {k} patterns from zero.
  - Find how each number of one is made from the number beside it.
Together:
  - Look at this table. What rule makes it true?
  - One out is missing. Type what fits.
  - Now the rule and an in number in words only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave needs {k} patterns filled. Show what you know.
Reasons the pet gives when it is caught:
  rowJump: That follows the jump down instead of the rule from in to out.
  skip: That has one group too many or too few.
Tonight's question: Ask {name}: What rule turns four into twelve and six into eighteen?
About 3.4 minutes.
```

</details>
