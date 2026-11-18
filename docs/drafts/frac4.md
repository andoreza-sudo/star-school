# Draft: Compare Fractions (frac4)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Compare Fractions (frac4), grade 3, the kid pet
Idea: Compare how much of the same whole is shaded. More parts means smaller pieces.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any parts on each bar. Any way you like!
Name it:
  - You shaded {a} of {x} on top and {b} of {y} below.
  - Compare how much of the same whole is shaded.
  - More parts means smaller pieces.
Together:
  - Shade the fractions on the bars.
  - Which bar shows more shaded part?
  - Which fraction is greater?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs the bigger piece. Type the bigger fraction.
Reasons the pet gives when it is caught:
  bigden: Look closer. Bigger bottom number means smaller pieces.
  small: The sign is turned round. This one is actually smaller.
Tonight's question: Ask {name}: Which is bigger, three fourths or five sixths?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Show now says what the child does (types the bigger fraction).
- The first draft from the API is kept below as it came, for comparison.

## The earlier words (batch 2)

- In batch 2 the owner approved words for this stop before it had any lesson code (2026-11-17, in chat). Batch 3 wrote the code (two fraction bars, a typed
  "bigger fraction" item, the pet's answer said in Check me). Those words do not fit it: Check me had no line that says the pet's answer ({ans}), and Name it
  said "One half is shaded" whatever the child shaded. So this stop was drafted again and needs a fresh read. The approved words are kept here:

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

## Words (the draft itself)

```json
{
 "id": "frac4",
 "t": "Compare Fractions",
 "grade": 3,
 "age": "kid",
 "idea": "Compare how much of the same whole is shaded. More parts means smaller pieces.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade any parts on each bar. Any way you like!"
  ],
  "name": [
   "You shaded {a} of {x} on top and {b} of {y} below.",
   "Compare how much of the same whole is shaded.",
   "More parts means smaller pieces."
  ],
  "together": [
   "Shade the fractions on the bars.",
   "Which bar shows more shaded part?",
   "Which fraction is greater?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs the bigger piece. Type the bigger fraction."
  ]
 },
 "reasons": {
  "bigden": [
   "Look closer. Bigger bottom number means smaller pieces."
  ],
  "small": [
   "The sign is turned round. This one is actually smaller."
  ]
 },
 "home": "Ask {name}: Which is bigger, three fourths or five sixths?"
}
```

<details><summary>The API's first draft</summary>

```text
Compare Fractions (frac4), grade 3, the kid pet
Idea: Compare how much of the same whole is shaded. More parts means smaller pieces.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any parts on each bar. Any way you like!
Name it:
  - You shaded {a} of {x} on top and {b} of {y} below.
  - Compare how much of the same whole is shaded.
  - More parts means smaller pieces.
Together:
  - Shade the fractions on the bars.
  - Which bar shows more shaded part?
  - Which fraction is greater?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs the bigger fraction shaded. Which one?
Reasons the pet gives when it is caught:
  bigden: Look closer. Bigger bottom number means smaller pieces.
  small: The sign is turned round. This one is actually smaller.
Tonight's question: Ask {name}: Which is bigger, three fourths or five sixths?
About 3.3 minutes.
```
</details>
