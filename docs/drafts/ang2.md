# Draft: Measure Angles (ang2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Measure Angles (ang2), grade 4, the kid pet
Idea: Start at zero on the side the angle starts, then count up that scale.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Open the angle on the protractor any amount you like.
Name it:
  - Your angle measures {a} degrees.
  - It starts on the right, so we count from the zero there.
  - Start at zero on the side the angle starts.
Together:
  - Find the zero on the starting side. Open the angle to the number.
  - Find the zero on the side the angle starts. Count up from there.
  - No protractor now. Think about the whole angle first.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The carpenter needs these angles measured. Read this one.
  - One more angle for the carpenter.
Reasons the pet gives when it is caught:
  proto: Oops. I read the other scale. I should start from the zero on its side.
  sup: Oops. I took it from the wrong whole. A square corner or a flat line?
  slip: Oops. I was one mark off. I should count the marks again.
Tonight's question: Ask {name}: "A flat line split into two angles: one is 50°. The other?"
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "Watch the number change": the protractor lesson hides the number on purpose.
- Together 3 said "the story" (it is a missing angle, not a story).
- Reasons said "Good catch" and "Try again" (the app's own lines, and the child is not trying again).
- The sup reason said it is a straight angle, which is untrue for half the items.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "ang2",
 "t": "Measure Angles",
 "grade": 4,
 "age": "kid",
 "idea": "Start at zero on the side the angle starts, then count up that scale.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Open the angle on the protractor any amount you like."
  ],
  "name": [
   "Your angle measures {a} degrees.",
   "It starts on the right, so we count from the zero there.",
   "Start at zero on the side the angle starts."
  ],
  "together": [
   "Find the zero on the starting side. Open the angle to the number.",
   "Find the zero on the side the angle starts. Count up from there.",
   "No protractor now. Think about the whole angle first."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The carpenter needs these angles measured. Read this one.",
   "One more angle for the carpenter."
  ]
 },
 "reasons": {
  "proto": [
   "Oops. I read the other scale. I should start from the zero on its side."
  ],
  "sup": [
   "Oops. I took it from the wrong whole. A square corner or a flat line?"
  ],
  "slip": [
   "Oops. I was one mark off. I should count the marks again."
  ]
 },
 "home": "Ask {name}: \"A flat line split into two angles: one is 50°. The other?\""
}
```

<details><summary>The API's first draft</summary>

```text
Measure Angles (ang2), grade 4, the kid pet
Idea: Put the zero on the side the angle starts then count up that scale.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Open this angle any amount you like. Watch the number change.
Name it:
  - You made an angle of {a} degrees.
  - Put the zero on the side the angle starts then count up that scale.
Together:
  - Let us make an angle of a number of degrees.
  - Let us read this angle on the tool.
  - Let us find the angle the story asks for.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Help the builder measure some angles to cut the wood just right.
Reasons the pet gives when it is caught:
  proto: Look closer. I read the other scale. | The numbers go up this way. Try again.
  sup: Good catch. I slipped there. That is a straight angle not a right one.
  slip: Look closer. I slipped there. | One off. Count each mark carefully.
Tonight's question: Ask {name}: "Can you find a right angle in our house?"
About 3.4 minutes.
```

</details>
