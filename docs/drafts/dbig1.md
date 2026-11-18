# Draft: Divide 2-Digit Numbers (dbig1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Divide 2-Digit Numbers (dbig1), grade 4, the kid pet
Idea: Share the biggest place first. Leftovers break into the next place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number. Pick how many equal groups to share it into. Any way works.
Name it:
  - You shared {n} into {b} groups.
  - Each group has {a}. There are {k} left.
  - Share the biggest place first. Leftovers break into the next place.
Together:
  - Let us share {n} into {b} equal groups.
  - Here is a picture of the blocks.
  - Now the symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs equal boxes of parts. Share {n} into {b} boxes.
  - Now share a new number into a new number of boxes.
Reasons the pet gives when it is caught:
  drop: I shared each place and dropped what was left over. | The leftovers need to break into the next place.
  remBig: The remainder cannot be as big as the groups. | Share more so the remainder is smaller.
  slip: That step is one off. Look closer at the blocks.
Tonight's question: Ask {name}: How would you share 48 toy cars into 4 equal groups?
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "dbig1",
 "t": "Divide 2-Digit Numbers",
 "grade": 4,
 "age": "kid",
 "idea": "Share the biggest place first. Leftovers break into the next place.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Pick a number. Pick how many equal groups to share it into. Any way works."
  ],
  "name": [
   "You shared {n} into {b} groups.",
   "Each group has {a}. There are {k} left.",
   "Share the biggest place first. Leftovers break into the next place."
  ],
  "together": [
   "Let us share {n} into {b} equal groups.",
   "Here is a picture of the blocks.",
   "Now the symbols only."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory needs equal boxes of parts. Share {n} into {b} boxes.",
   "Now share a new number into a new number of boxes."
  ]
 },
 "reasons": {
  "drop": [
   "I shared each place and dropped what was left over.",
   "The leftovers need to break into the next place."
  ],
  "remBig": [
   "The remainder cannot be as big as the groups.",
   "Share more so the remainder is smaller."
  ],
  "slip": [
   "That step is one off. Look closer at the blocks."
  ]
 },
 "home": "Ask {name}: How would you share 48 toy cars into 4 equal groups?"
}
```
