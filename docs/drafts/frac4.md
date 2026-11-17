# Draft: Compare Fractions (frac4)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>". Until then tools/build.py refuses any script that names this draft. -->

## Read-through

```text
Compare Fractions (frac4), grade 3, the kid pet
Idea: Pictures help us compare fractions.

Remember:
  - Do you remember this? Show me a half.
Explore:
  - Build equal parts. Shade one part. Any way you like!
Name it:
  - You shaded one part out of the whole.
  - One half is shaded.
  - Pictures help us compare fractions.
Together:
  - Look at these. Which picture shows more shaded?
  - This one has more shaded. It is bigger.
  - Compare these.
Check me:
  - My turn. Check my work!
  - I say this one is right. Am I right?
Show:
  - The path needs the bigger piece. Which one?
Reasons the pet gives when it is caught:
  small: Look closer. The bigger piece has more shaded. | The sign turned round. This one is bigger.
Tonight's question: Ask {name}: Which is bigger, one half or one fourth?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "frac4",
 "t": "Compare Fractions",
 "grade": 3,
 "age": "kid",
 "idea": "Pictures help us compare fractions.",
 "beats": {
  "remember": [
   "Do you remember this? Show me a half."
  ],
  "explore": [
   "Build equal parts. Shade one part. Any way you like!"
  ],
  "name": [
   "You shaded one part out of the whole.",
   "One half is shaded.",
   "Pictures help us compare fractions."
  ],
  "together": [
   "Look at these. Which picture shows more shaded?",
   "This one has more shaded. It is bigger.",
   "Compare these."
  ],
  "check": [
   "My turn. Check my work!",
   "I say this one is right. Am I right?"
  ],
  "show": [
   "The path needs the bigger piece. Which one?"
  ]
 },
 "reasons": {
  "small": [
   "Look closer. The bigger piece has more shaded.",
   "The sign turned round. This one is bigger."
  ]
 },
 "home": "Ask {name}: Which is bigger, one half or one fourth?"
}
```
