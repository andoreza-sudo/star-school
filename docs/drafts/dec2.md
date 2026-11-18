# Draft: Compare Decimals (dec2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Compare Decimals (dec2), grade 4, the kid pet
Idea: Compare the ones then tenths then hundredths. More digits does not mean bigger.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Use the chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Compare the ones first then the tenths then the hundredths.
  - More digits does not mean bigger.
Together:
  - Now let's compare on the number line.
  - Now let's compare with the place value chart.
  - Now let's compare these.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Which is bigger in the sand castle plan?
  - Which is bigger for the desert path?
Reasons the pet gives when it is caught:
  longer: Look closer. More digits does not mean bigger.
  small: I turned the sign round. The open side faces the bigger number.
Tonight's question: Ask {name}: Which is bigger, four tenths or thirty five hundredths?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The "small" reason was hard to follow.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "dec2",
 "t": "Compare Decimals",
 "grade": 4,
 "age": "kid",
 "idea": "Compare the ones then tenths then hundredths. More digits does not mean bigger.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Use the chart. Make any decimal you like."
  ],
  "name": [
   "You made {n}.",
   "Compare the ones first then the tenths then the hundredths.",
   "More digits does not mean bigger."
  ],
  "together": [
   "Now let's compare on the number line.",
   "Now let's compare with the place value chart.",
   "Now let's compare these."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "Which is bigger in the sand castle plan?",
   "Which is bigger for the desert path?"
  ]
 },
 "reasons": {
  "longer": [
   "Look closer. More digits does not mean bigger."
  ],
  "small": [
   "I turned the sign round. The open side faces the bigger number."
  ]
 },
 "home": "Ask {name}: Which is bigger, four tenths or thirty five hundredths?"
}
```

<details><summary>The API's first draft</summary>

```text
Compare Decimals (dec2), grade 4, the kid pet
Idea: Compare the ones then tenths then hundredths. More digits does not mean bigger.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Use the chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Compare the ones first then the tenths then the hundredths.
  - More digits does not mean bigger.
Together:
  - Now let's compare on the number line.
  - Now let's compare with the place value chart.
  - Now let's compare these.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Which is bigger in the sand castle plan?
  - Which is bigger for the desert path?
Reasons the pet gives when it is caught:
  longer: Look closer. More digits does not mean bigger.
  small: This one is right. The sign is turned round.
Tonight's question: Ask {name}: Which is bigger, four tenths or thirty five hundredths?
About 3.3 minutes.
```
</details>
