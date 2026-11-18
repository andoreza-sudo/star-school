# Draft: Divide Big Numbers (dbig3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Divide Big Numbers (dbig3), grade 4, the kid pet
Idea: Share the biggest place first. Leftovers break into the next place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number. Pick how many equal groups to share it into.
Name it:
  - You shared {n} into {b} groups.
  - Each group has {a} with {k} left over.
  - Share the biggest place first. Leftovers break into the next place.
Together:
  - Let us share {n} into {b} equal groups.
  - Here is a picture of the blocks. How many in each group?
  - Now write the division in symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs to share the new parts into equal boxes.
  - Share {n} into {b} equal groups.
Reasons the pet gives when it is caught:
  drop: I shared each place but dropped what was left over. | The leftovers must break into the next smaller place.
  zero0: A zero is missing inside the answer. | Check each place. The zero shows no groups there.
  remBig: The leftover is as big as a full group. | Share one more into the groups. The leftover must stay smaller.
  slip: That step is one off. Look again at the blocks.
Tonight's question: Ask {name}: "Share 84 toy parts into 4 equal groups. How many in each?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "dbig3",
 "t": "Divide Big Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Share the biggest place first. Leftovers break into the next place.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Pick a number. Pick how many equal groups to share it into."
  ],
  "name": [
   "You shared {n} into {b} groups.",
   "Each group has {a} with {k} left over.",
   "Share the biggest place first. Leftovers break into the next place."
  ],
  "together": [
   "Let us share {n} into {b} equal groups.",
   "Here is a picture of the blocks. How many in each group?",
   "Now write the division in symbols only."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory needs to share the new parts into equal boxes.",
   "Share {n} into {b} equal groups."
  ]
 },
 "reasons": {
  "drop": [
   "I shared each place but dropped what was left over.",
   "The leftovers must break into the next smaller place."
  ],
  "zero0": [
   "A zero is missing inside the answer.",
   "Check each place. The zero shows no groups there."
  ],
  "remBig": [
   "The leftover is as big as a full group.",
   "Share one more into the groups. The leftover must stay smaller."
  ],
  "slip": [
   "That step is one off. Look again at the blocks."
  ]
 },
 "home": "Ask {name}: \"Share 84 toy parts into 4 equal groups. How many in each?\""
}
```
