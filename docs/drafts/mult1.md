# Draft: Equal Groups (mult1)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Equal Groups (mult1), grade 2, the little pet
Idea: Equal groups have the same number in each group.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make any equal groups you like.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum} in all.
  - Equal groups have the same number in each group.
Together:
  - Let's make {a} groups of {b} stars.
  - Skip count by {b}s. How many in all?
  - Add {b} again and again.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station packs supplies in equal groups. How many?
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each group.
Tonight's question: Ask {name}: "How many toys in 3 groups of 4?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- "Space lab" taken out of Explore; the Show line no longer asks the child to build (Show items are typed).
- Tonight's question made shorter (90 characters at most, like the hand-written lessons).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "mult1",
 "t": "Equal Groups",
 "grade": 2,
 "age": "little",
 "idea": "Equal groups have the same number in each group.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Make any equal groups you like."
  ],
  "name": [
   "You made {a} groups of {b}.",
   "{a} groups of {b} is {sum} in all.",
   "Equal groups have the same number in each group."
  ],
  "together": [
   "Let's make {a} groups of {b} stars.",
   "Skip count by {b}s. How many in all?",
   "Add {b} again and again."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The space station packs supplies in equal groups. How many?"
  ]
 },
 "reasons": {
  "given": [
   "I said a number I could see. Count every dot!"
  ],
  "off1": [
   "I was one off. Skip count each group."
  ]
 },
 "home": "Ask {name}: \"How many toys in 3 groups of 4?\""
}
```

<details><summary>The API's first draft</summary>

```text
Equal Groups (mult1), grade 2, the little pet
Idea: Equal groups help us multiply.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Make any equal groups you like in the space lab.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum} in all.
  - Equal groups help us multiply.
Together:
  - Let's make {a} groups of {b} stars.
  - How many stars in all?
  - How many is {a} groups of {b}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs equal solar panels. Make {a} groups of {b}.
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: One too many. Let us count again together.
Tonight's question: Ask {name}: "If we have 3 equal groups of 4 toys, how many toys in all?"
About 3.3 minutes.
```

</details>
