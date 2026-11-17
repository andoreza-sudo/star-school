# Draft: Borrowing (sub4)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Borrowing (sub4), grade 2, the little pet
Idea: Break a ten when there are not enough ones.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Here are {a}. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - No more ones? Break a ten into ten ones.
Together:
  - Take {b} from {a}. Break a ten if you need to.
  - Look at {a}. Are there enough ones?
  - Write it in columns. Ones first.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power. Take these away.
  - One more job for the station. Take these away.
Reasons the pet gives when it is caught:
  col: I took the small from the big. Top take away bottom!
  keep: I broke a ten, but kept the tens the same.
Tonight's question: Ask {name}: "What is 52 take away 37?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The "col" reason did not say the mistake; the "keep" reason began with the line the app says already; Name it said "you broke a ten" even when the child had not.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sub4",
 "t": "Borrowing",
 "grade": 2,
 "age": "little",
 "idea": "Break a ten when there are not enough ones.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Here are {a}. Take away as many as you like."
  ],
  "name": [
   "You had {a}. You took {b}. {diff} are left.",
   "No more ones? Break a ten into ten ones."
  ],
  "together": [
   "Take {b} from {a}. Break a ten if you need to.",
   "Look at {a}. Are there enough ones?",
   "Write it in columns. Ones first."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The space station needs power. Take these away.",
   "One more job for the station. Take these away."
  ]
 },
 "reasons": {
  "col": [
   "I took the small from the big. Top take away bottom!"
  ],
  "keep": [
   "I broke a ten, but kept the tens the same."
  ]
 },
 "home": "Ask {name}: \"What is 52 take away 37?\""
}
```

<details><summary>The API's first draft</summary>

```text
Borrowing (sub4), grade 2, the little pet
Idea: Break a ten to help take away.

Remember:
  - Do you remember this? Make {n} with rods and cubes.
Explore:
  - Take away as many as you like from {a}.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - You broke a ten when you needed more ones.
  - Break a ten to help take away.
Together:
  - Take {b} from {a}. Break a ten if you need to.
  - Look at {a}. Type what is left.
  - Write it in the columns.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power. Take {b} from {a}.
  - One more job. Take {b} from {a}.
Reasons the pet gives when it is caught:
  col: Look again. Take from the ones first.
  keep: You caught my mistake! I forgot to take one ten.
Tonight's question: Ask {name}: "What is 52 take away 37?"
About 3.4 minutes.
```

</details>
