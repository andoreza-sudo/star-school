# Draft: 2-Digit Take Away (sub3)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
2-Digit Take Away (sub3), grade 1, the little pet
Idea: Take away the ones, then take away the tens.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Here are {a}. Take some away. Any way you like!
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - Take away the ones, then take away the tens.
Together:
  - Take {b} away from {a}. Ones first.
  - Look at the blocks for {a}. What is left?
  - Take away in columns: ones, then tens.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Shells float away from the reef. How many are left?
Reasons the pet gives when it is caught:
  op: I added. We are taking away!
  given: I said a number I could see. Find what is left.
Tonight's question: Ask {name}: "What is 45 take away 20?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Clearer Together lines; the Show line no longer tells its own numbers.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sub3",
 "t": "2-Digit Take Away",
 "grade": 1,
 "age": "little",
 "idea": "Take away the ones, then take away the tens.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Here are {a}. Take some away. Any way you like!"
  ],
  "name": [
   "You had {a}. You took {b}. {diff} are left.",
   "Take away the ones, then take away the tens."
  ],
  "together": [
   "Take {b} away from {a}. Ones first.",
   "Look at the blocks for {a}. What is left?",
   "Take away in columns: ones, then tens."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "Shells float away from the reef. How many are left?"
  ]
 },
 "reasons": {
  "op": [
   "I added. We are taking away!"
  ],
  "given": [
   "I said a number I could see. Find what is left."
  ]
 },
 "home": "Ask {name}: \"What is 45 take away 20?\""
}
```

<details><summary>The API's first draft</summary>

```text
2-Digit Take Away (sub3), grade 1, the little pet
Idea: Take away from the tens and ones.

Remember:
  - Do you remember this? Make {n} with rods and cubes.
Explore:
  - Take some away from these {a} blocks. Any way you like!
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - Take away from the tens and ones.
Together:
  - Take {b} away from these {a} blocks.
  - Look at these {a} blocks. What is left?
  - Take {b} from {a} in columns.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef needs {a} shells. {b} float away. How many now?
Reasons the pet gives when it is caught:
  op: I added instead of taking away. Let's count back.
  given: I said a number we could see. Count what is left.
Tonight's question: Ask {name}: "What is 45 take away 20?"
About 3.3 minutes.
```

</details>
