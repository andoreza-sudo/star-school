# Draft: Unlike Fractions (frac6)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Unlike Fractions (frac6), grade 4, the kid pet
Idea: Compare how much of the same whole is shaded. More parts means smaller pieces.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any parts on each bar. Any way works!
Name it:
  - You shaded {a} of {x} parts on the top bar.
  - You shaded {b} of {y} parts on the bottom bar.
  - Compare how much of the same whole is shaded. More parts means smaller pieces.
Together:
  - Now shade these fractions on the bars.
  - Which bar shows more shaded part?
  - Which fraction is greater than the other?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail needs the bigger fraction of water. Which one?
Reasons the pet gives when it is caught:
  bigden: A bigger bottom number means smaller pieces. | Look closer at the size of each piece.
  small: The sign is turned round. Check which shaded part is larger.
Tonight's question: Ask {name}: "Which is bigger, three fourths or five sixths?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "frac6",
 "t": "Unlike Fractions",
 "grade": 4,
 "age": "kid",
 "idea": "Compare how much of the same whole is shaded. More parts means smaller pieces.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade any parts on each bar. Any way works!"
  ],
  "name": [
   "You shaded {a} of {x} parts on the top bar.",
   "You shaded {b} of {y} parts on the bottom bar.",
   "Compare how much of the same whole is shaded. More parts means smaller pieces."
  ],
  "together": [
   "Now shade these fractions on the bars.",
   "Which bar shows more shaded part?",
   "Which fraction is greater than the other?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The trail needs the bigger fraction of water. Which one?"
  ]
 },
 "reasons": {
  "bigden": [
   "A bigger bottom number means smaller pieces.",
   "Look closer at the size of each piece."
  ],
  "small": [
   "The sign is turned round. Check which shaded part is larger."
  ]
 },
 "home": "Ask {name}: \"Which is bigger, three fourths or five sixths?\""
}
```
