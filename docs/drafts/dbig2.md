# Draft: Divide with Leftovers (dbig2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Divide with Leftovers (dbig2), grade 4, the kid pet
Idea: Share the biggest place first. Leftovers break into the next place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number. Share it into equal groups. Any way works.
Name it:
  - You shared {n} into {b} groups.
  - Each group has {a}. There are {k} left.
  - Share the biggest place first. Leftovers break into the next place.
Together:
  - Let's share {n} into {b} equal groups.
  - Look at the picture. How many in each group?
  - Now write the division.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory packs {n} toys into {b} boxes. How many in each?
  - Share {n} blocks into {b} equal groups.
Reasons the pet gives when it is caught:
  remBig: The remainder cannot be as big as a group. Share one more.
  drop: Do not drop the leftovers. They make part of the next place.
Tonight's question: Ask {name}: "Share 47 apples by 5 friends. How many each, how many left?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Tonight's question was over 90 characters; shortened (words only).

## Words (the draft itself)

```json
{
 "id": "dbig2",
 "t": "Divide with Leftovers",
 "grade": 4,
 "age": "kid",
 "idea": "Share the biggest place first. Leftovers break into the next place.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Pick a number. Share it into equal groups. Any way works."
  ],
  "name": [
   "You shared {n} into {b} groups.",
   "Each group has {a}. There are {k} left.",
   "Share the biggest place first. Leftovers break into the next place."
  ],
  "together": [
   "Let's share {n} into {b} equal groups.",
   "Look at the picture. How many in each group?",
   "Now write the division."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory packs {n} toys into {b} boxes. How many in each?",
   "Share {n} blocks into {b} equal groups."
  ]
 },
 "reasons": {
  "remBig": [
   "The remainder cannot be as big as a group. Share one more."
  ],
  "drop": [
   "Do not drop the leftovers. They make part of the next place."
  ]
 },
 "home": "Ask {name}: \"Share 47 apples by 5 friends. How many each, how many left?\""
}
```
