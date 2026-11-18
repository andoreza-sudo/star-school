# Draft: Tenths & Hundredths (dec1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Tenths & Hundredths (dec1), grade 4, the kid pet
Idea: The first place after the point is tenths. The next is hundredths.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any squares. Ten squares make one whole.
Name it:
  - You shaded {n} squares.
  - That is {n} tenths.
  - The first place after the point shows tenths.
Together:
  - Shade part of the whole to match this.
  - Type the decimal for the shaded bar.
  - Write this fraction as a decimal.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert trail needs a sign. Type the length as a decimal.
  - Now type this length as a decimal for the map.
Reasons the pet gives when it is caught:
  dzero: Look closer. The first place is tenths. The next is hundredths.
  given: I said the number I could see. Count the shaded squares.
Tonight's question: Ask {name}: "Can you point out the tenths place in a decimal number?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "dec1",
 "t": "Tenths & Hundredths",
 "grade": 4,
 "age": "kid",
 "idea": "The first place after the point is tenths. The next is hundredths.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade any squares. Ten squares make one whole."
  ],
  "name": [
   "You shaded {n} squares.",
   "That is {n} tenths.",
   "The first place after the point shows tenths."
  ],
  "together": [
   "Shade part of the whole to match this.",
   "Type the decimal for the shaded bar.",
   "Write this fraction as a decimal."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The desert trail needs a sign. Type the length as a decimal.",
   "Now type this length as a decimal for the map."
  ]
 },
 "reasons": {
  "dzero": [
   "Look closer. The first place is tenths. The next is hundredths."
  ],
  "given": [
   "I said the number I could see. Count the shaded squares."
  ]
 },
 "home": "Ask {name}: \"Can you point out the tenths place in a decimal number?\""
}
```
