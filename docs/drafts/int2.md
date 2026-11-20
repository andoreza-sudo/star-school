# Draft: Absolute Value (int2)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Absolute Value (int2), grade 6, the teen pet
Idea: Absolute value is the distance from zero, so it is never negative.

Remember:
  - A times fact from before.
Explore:
  - Move the dot anywhere. The hop always starts at zero.
Name it:
  - Your dot is at {x}.
  - The hop from zero is {n} long.
  - Absolute value is that distance, so it is never negative.
Together:
  - Hop from zero to the number.
  - Count the steps of the hop.
  - Picture the line. Across zero, add both distances.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The cable crew measures distances across zero. Find them.
Reasons the pet gives when it is caught:
  absNeg: I kept the minus sign. A distance is never negative.
  absDist: I took one distance from the other. Across zero they add.
Tonight's question: Ask {name}: "How far apart are -4 and 5 on a number line?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 1 "Watch the hop" came before a build where the child makes the hop; line 2 repeated the question the app asks.
- Show talked about cables of the same length, which is not what Show asks.
- Reasons spoke about distance in general; they now say the pet's own slip.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "int2",
 "t": "Absolute Value",
 "grade": 6,
 "age": "teen",
 "idea": "Absolute value is the distance from zero, so it is never negative.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Move the dot anywhere. The hop always starts at zero."
  ],
  "name": [
   "Your dot is at {x}.",
   "The hop from zero is {n} long.",
   "Absolute value is that distance, so it is never negative."
  ],
  "together": [
   "Hop from zero to the number.",
   "Count the steps of the hop.",
   "Picture the line. Across zero, add both distances."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The cable crew measures distances across zero. Find them."
  ]
 },
 "reasons": {
  "absNeg": [
   "I kept the minus sign. A distance is never negative."
  ],
  "absDist": [
   "I took one distance from the other. Across zero they add."
  ]
 },
 "home": "Ask {name}: \"How far apart are -4 and 5 on a number line?\""
}
```

<details><summary>The API's first draft</summary>

```text
Absolute Value (int2), grade 6, the teen pet
Idea: The absolute value is the distance from zero so it is never negative.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Move the dot anywhere on the number line. Make any hop you like from zero.
Name it:
  - Your dot is at {x}.
  - The hop is {n} long.
  - The absolute value is the distance from zero so it is never negative.
Together:
  - Watch the hop from zero to the dot.
  - How far is the dot from zero?
  - Write the distance or the absolute value.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The tower needs some cables the same length. How long is each one?
Reasons the pet gives when it is caught:
  absNeg: The distance stays positive even across zero. | Distance never gets a minus sign.
  absDist: Find the distance on each side of zero then add them.
Tonight's question: Ask {name}: "On a number line what is the absolute value of negative four?"
About 3.4 minutes.
```

</details>
