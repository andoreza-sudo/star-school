# Draft: Count by 2s & 5s (cnt2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Count by 2s & 5s (cnt2), grade 1, the little pet
Idea: Skip count to find how many.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make equal groups any way you like.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum}.
  - Skip count to find how many.
Together:
  - Help me make {a} groups of {b}.
  - Skip count the groups. How many in all?
  - Keep skip counting by {b}s.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The candy shop packs bags. Skip count them!
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each group.
Tonight's question: Ask {name}: "Count your fingers by fives. How many on two hands?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember line fits the skip-count warm-up; Together lines fit each kind of item; the Show line no longer gives the numbers twice.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "cnt2",
 "t": "Count by 2s & 5s",
 "grade": 1,
 "age": "little",
 "idea": "Skip count to find how many.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Make equal groups any way you like."
  ],
  "name": [
   "You made {a} groups of {b}.",
   "{a} groups of {b} is {sum}.",
   "Skip count to find how many."
  ],
  "together": [
   "Help me make {a} groups of {b}.",
   "Skip count the groups. How many in all?",
   "Keep skip counting by {b}s."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The candy shop packs bags. Skip count them!"
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
 "home": "Ask {name}: \"Count your fingers by fives. How many on two hands?\""
}
```

<details><summary>The API's first draft</summary>

```text
Count by 2s & 5s (cnt2), grade 1, the little pet
Idea: Skip count to find how many.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Make equal groups any way you like.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum}.
  - Skip count to find how many.
Together:
  - Help me make {a} groups of {b}.
  - How many in all?
  - How many is {a} groups of {b}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs candy. {a} bags hold {b} each. How many?
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count all the dots!
  off1: One too many. Look again. | One is still missing.
Tonight's question: Ask {name}: "If a bag holds 5 candies, how many in 4 bags?"
About 3.2 minutes.
```

</details>
