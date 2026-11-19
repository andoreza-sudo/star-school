# Draft: Kinds of Angles (ang1)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Kinds of Angles (ang1), grade 4, the kid pet
Idea: Compare an angle with a square corner: less is acute, more is obtuse.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Open the angle any amount you like. I will tell you its kind.
Name it:
  - Your angle is {a} degrees.
  - A right angle is a square corner.
  - Less than that is acute. More is obtuse. A flat line is straight.
Together:
  - Open the angle until it is the kind I name.
  - Compare it with a square corner. Then pick its kind.
  - No picture now. Think of a square corner.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert gate needs angles of the right kinds. Make this one.
  - Make one more angle for the gate.
Reasons the pet gives when it is caught:
  angSw: Oops. I mixed up acute and obtuse. Acute is the small one.
  rtAng: Oops. It was close to a square corner, but not exactly.
Tonight's question: Ask {name} to find a square corner at home, then a smaller angle.
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together 1 said "like the one I name" (the pet does not show an angle).
- Tonight's question was fine but long; shorter.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ang1",
 "t": "Kinds of Angles",
 "grade": 4,
 "age": "kid",
 "idea": "Compare an angle with a square corner: less is acute, more is obtuse.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Open the angle any amount you like. I will tell you its kind."
  ],
  "name": [
   "Your angle is {a} degrees.",
   "A right angle is a square corner.",
   "Less than that is acute. More is obtuse. A flat line is straight."
  ],
  "together": [
   "Open the angle until it is the kind I name.",
   "Compare it with a square corner. Then pick its kind.",
   "No picture now. Think of a square corner."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The desert gate needs angles of the right kinds. Make this one.",
   "Make one more angle for the gate."
  ]
 },
 "reasons": {
  "angSw": [
   "Oops. I mixed up acute and obtuse. Acute is the small one."
  ],
  "rtAng": [
   "Oops. It was close to a square corner, but not exactly."
  ]
 },
 "home": "Ask {name} to find a square corner at home, then a smaller angle."
}
```

<details><summary>The API's first draft</summary>

```text
Kinds of Angles (ang1), grade 4, the kid pet
Idea: A right angle is a square corner. Acute is less. Obtuse is more.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Open an angle any amount you like. See what kind it is.
Name it:
  - You made an angle of {a} degrees.
  - A right angle is a square corner.
  - Acute is less. Obtuse is more. Straight is a flat line.
Together:
  - Open an angle like the one I name.
  - Choose the kind this picture shows.
  - What kind is an angle of this many degrees?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Open some angles to finish the gate in the desert.
Reasons the pet gives when it is caught:
  angSw: Look closer. Acute angles are less than right. Obtuse are more.
  rtAng: This one is close but not quite a square corner.
Tonight's question: Ask {name}: What does a right angle look like in our house?
About 3.4 minutes.
```

</details>
