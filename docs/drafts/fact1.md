# Draft: Factors & Multiples (fact1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Factors & Multiples (fact1), grade 4, the kid pet
Idea: Rows and row length are factors of the number.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array of {n} dots. Any way you like!
Name it:
  - You made {n} dots in {a} rows of {b}.
  - The rows and row length are factors of {n}.
Together:
  - Build {n} dots in {a} rows.
  - How many dots fill each row?
  - Write it with a times sign.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a box for {n} parts in {a} rows. How long is each row?
Reasons the pet gives when it is caught:
  fact: I was one row off. Multiply back to check.
  given: I said the number of rows. The answer is how many in each row.
Tonight's question: Ask {name}: "Can you find two factors of twenty four?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- A reason said "Count the empty spaces!"; the slip reason was the pet's tone line.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fact1",
 "t": "Factors & Multiples",
 "grade": 4,
 "age": "kid",
 "idea": "Rows and row length are factors of the number.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Make an array of {n} dots. Any way you like!"
  ],
  "name": [
   "You made {n} dots in {a} rows of {b}.",
   "The rows and row length are factors of {n}."
  ],
  "together": [
   "Build {n} dots in {a} rows.",
   "How many dots fill each row?",
   "Write it with a times sign."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory needs a box for {n} parts in {a} rows. How long is each row?"
  ]
 },
 "reasons": {
  "fact": [
   "I was one row off. Multiply back to check."
  ],
  "given": [
   "I said the number of rows. The answer is how many in each row."
  ]
 },
 "home": "Ask {name}: \"Can you find two factors of twenty four?\""
}
```

<details><summary>The API's first draft</summary>

```text
Factors & Multiples (fact1), grade 4, the kid pet
Idea: Rows and row length are factors of the number.

Remember:
  - Hey {name}. New idea today.
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array of {n} dots. Any way you like!
Name it:
  - You made {n} dots in {a} rows of {b}.
  - The rows and row length are factors of {n}.
Together:
  - Build {n} dots in {a} rows.
  - How many dots fill each row?
  - Write it with a times sign.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a box for {n} parts in {a} rows. How long is each row?
Reasons the pet gives when it is caught:
  fact: Look closer. I slipped. | One group too many or too few.
  given: I said the number I could see. | Count the empty spaces!
Tonight's question: Ask {name}: "Can you find two factors of twenty four?"
About 3.4 minutes.
```
</details>
