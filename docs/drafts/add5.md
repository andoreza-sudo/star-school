# Draft: Add Three (add5)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Add Three (add5), grade 1, the little pet
Idea: Look for a ten, then add the last number.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill the double frame. Use both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Look for a ten, then add the last number.
Together:
  - Put in {a}, then {b}, then {k}.
  - Look at the frame. How many in all?
  - Add {a}, {b} and {k}. Look for a ten.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The clock tower needs bells. How many in all?
Reasons the pet gives when it is caught:
  given: I left a number out. Add them all!
  off1: I was one off. Count each one once.
Tonight's question: Ask {name}: "What is 4 and 6 and 3?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea says how to add three numbers; the "given" reason now says what that mistake is here (one number left out).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "add5",
 "t": "Add Three",
 "grade": 1,
 "age": "little",
 "idea": "Look for a ten, then add the last number.",
 "beats": {
  "remember": [
   "Do you remember this? Let's make ten."
  ],
  "explore": [
   "Fill the double frame. Use both colours. Any way you like!"
  ],
  "name": [
   "You made {a} and {b}.",
   "{a} and {b} make {sum}.",
   "Look for a ten, then add the last number."
  ],
  "together": [
   "Put in {a}, then {b}, then {k}.",
   "Look at the frame. How many in all?",
   "Add {a}, {b} and {k}. Look for a ten."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The clock tower needs bells. How many in all?"
  ]
 },
 "reasons": {
  "given": [
   "I left a number out. Add them all!"
  ],
  "off1": [
   "I was one off. Count each one once."
  ]
 },
 "home": "Ask {name}: \"What is 4 and 6 and 3?\""
}
```

<details><summary>The API's first draft</summary>

```text
Add Three (add5), grade 1, the little pet
Idea: Parts can make a sum.

Remember:
  - Do you remember this? Fill to make ten with {n}.
Explore:
  - Fill the double frame. Use both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Parts can make a sum.
Together:
  - We add {a} and {b} and {k}. Build it on the frame.
  - Look at the frame. How many in all?
  - Write the fact for {a} and {b} and {k}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The clock needs hands. Put on {a} then {b} then {k}.
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count all the pieces!
  off1: One too many. Take one away. | One is still missing. Add one more.
Tonight's question: Ask {name}: "What is 4 and 5 and 3?"
About 3.3 minutes.
```

</details>
