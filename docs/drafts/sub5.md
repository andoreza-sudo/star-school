# Draft: Take Away 3-Digit (sub5)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Take Away 3-Digit (sub5), grade 2, the little pet
Idea: Break a ten when there are not enough ones.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Here are {a}. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - No more ones? Break a ten into ten ones.
Together:
  - Take {b} from {a}. Break a ten if you need.
  - Look at {a}. Are there enough ones?
  - Take away in columns: ones, tens, then hundreds.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship unloads supplies. How many are left?
  - One more load comes off. How many are left?
Reasons the pet gives when it is caught:
  col: I took the small from the big. Top take away bottom!
  keep: I broke a ten, but kept the tens the same.
Tonight's question: Ask {name}: "What is 243 take away 158?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The "col" reason described the right way, not the pet's mistake; the Show lines repeated the numbers the app says next.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sub5",
 "t": "Take Away 3-Digit",
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
   "Take {b} from {a}. Break a ten if you need.",
   "Look at {a}. Are there enough ones?",
   "Take away in columns: ones, tens, then hundreds."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The ship unloads supplies. How many are left?",
   "One more load comes off. How many are left?"
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
 "home": "Ask {name}: \"What is 243 take away 158?\""
}
```

<details><summary>The API's first draft</summary>

```text
Take Away 3-Digit (sub5), grade 2, the little pet
Idea: Take from the tens when there are not enough ones.

Remember:
  - Do you remember this? Make {n} with rods and cubes.
Explore:
  - Here are {a} blocks. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. Now {diff} are left.
  - Take from the tens when there are not enough ones.
Together:
  - Take {b} from {a}'s blocks. Break a ten if you need.
  - Here are {a}'s blocks. Type what is left.
  - Take {b} away from {a}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs supplies. Take {b} from {a} here.
  - Now take {b} from {a} over here.
Reasons the pet gives when it is caught:
  col: Look! We take from the tens when there are not enough ones.
  keep: Look! We take one ten away when we borrow for the ones.
Tonight's question: Ask {name}: "What is 243 take away 158?"
About 3.4 minutes.
```

</details>
