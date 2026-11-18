# Draft: Expanded Form (pv3)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Expanded Form (pv3), grade 2, the little pet
Idea: A number is its hundreds plus its tens plus its ones.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Use the blocks. Make any number you like.
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - A number is its hundreds plus its tens plus its ones.
Together:
  - Build {n} from its parts with blocks.
  - Count the flats, the rods, then the cubes.
  - Put the parts together into one number.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The map shows the treasure in parts. Put them together!
Reasons the pet gives when it is caught:
  given: I only said one part. Add all the parts!
  swap: I swapped the tens and the ones. Look again.
Tonight's question: Ask {name}: "What is 200 plus 40 plus 3?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The symbols line did not say what to do; the Show line asked for the opposite of the Show items; the "given" reason fits this mistake.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pv3",
 "t": "Expanded Form",
 "grade": 2,
 "age": "little",
 "idea": "A number is its hundreds plus its tens plus its ones.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Use the blocks. Make any number you like."
  ],
  "name": [
   "You made {n}.",
   "It has {top} hundreds, {tens} tens and {ones} ones.",
   "A number is its hundreds plus its tens plus its ones."
  ],
  "together": [
   "Build {n} from its parts with blocks.",
   "Count the flats, the rods, then the cubes.",
   "Put the parts together into one number."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The map shows the treasure in parts. Put them together!"
  ]
 },
 "reasons": {
  "given": [
   "I only said one part. Add all the parts!"
  ],
  "swap": [
   "I swapped the tens and the ones. Look again."
  ]
 },
 "home": "Ask {name}: \"What is 200 plus 40 plus 3?\""
}
```

<details><summary>The API's first draft</summary>

```text
Expanded Form (pv3), grade 2, the little pet
Idea: A number can be shown as hundreds plus tens plus ones.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Use the blocks. Make any number you like.
Name it:
  - You made {n}.
  - It has {top} hundreds {tens} tens and {ones} ones.
  - A number can be shown as hundreds plus tens plus ones.
Together:
  - Build this number from its parts with blocks.
  - Count the blocks in this picture.
  - Add the parts shown in symbols.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The map shows a path. Write its number in parts.
Reasons the pet gives when it is caught:
  given: I said a number I could see. Look at all the parts!
  swap: I swapped the tens and ones. Look again at each place.
Tonight's question: Ask {name}: "What is 243 in expanded form?"
About 3.3 minutes.
```

</details>
