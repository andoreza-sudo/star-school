# Draft: Rows & Columns (arr1)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Rows & Columns (arr1), grade 2, the little pet
Idea: Rows of the same size make an array.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make any rows of dots you like.
Name it:
  - You made {a} rows of {b}.
  - {a} rows of {b} is {sum} in all.
  - Rows of the same size make an array.
Together:
  - Make {a} rows of {b}. Rows go across.
  - Skip count the rows. How many in all?
  - Times means rows of. Skip count the rows.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The boat needs flags in rows. How many flags?
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each row.
Tonight's question: Ask {name}: "How many shells in 4 rows of 5?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore asked for groups on an array; the symbols line said "groups" for rows; the Show line said the numbers twice.
- Tonight's question made shorter (90 characters at most, like the hand-written lessons).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "arr1",
 "t": "Rows & Columns",
 "grade": 2,
 "age": "little",
 "idea": "Rows of the same size make an array.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Make any rows of dots you like."
  ],
  "name": [
   "You made {a} rows of {b}.",
   "{a} rows of {b} is {sum} in all.",
   "Rows of the same size make an array."
  ],
  "together": [
   "Make {a} rows of {b}. Rows go across.",
   "Skip count the rows. How many in all?",
   "Times means rows of. Skip count the rows."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The boat needs flags in rows. How many flags?"
  ]
 },
 "reasons": {
  "given": [
   "I said a number I could see. Count every dot!"
  ],
  "off1": [
   "I was one off. Skip count each row."
  ]
 },
 "home": "Ask {name}: \"How many shells in 4 rows of 5?\""
}
```

<details><summary>The API's first draft</summary>

```text
Rows & Columns (arr1), grade 2, the little pet
Idea: Rows and columns make equal groups.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Make equal groups any way you like!
Name it:
  - You made {a} rows of {b}.
  - {a} rows of {b} is {sum} in all.
  - Rows and columns make equal groups.
Together:
  - Make {a} rows of {b} now.
  - How many in all do you see?
  - How many is {a} groups of {b}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The boat needs {a} rows of {b} flags. How many flags?
Reasons the pet gives when it is caught:
  given: That number is already there. Count the dots!
  off1: One too many. Look again. | One is missing. Count each dot.
Tonight's question: Ask {name}: "If we have 4 rows of 5 shells, how many shells in all?"
About 3.3 minutes.
```

</details>
