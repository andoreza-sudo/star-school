# Draft: Symmetry & Lines (shape6)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Symmetry & Lines (shape6), grade 4, the kid pet
Idea: A line of symmetry folds a shape into matching halves.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Here is a square. Tap the lines you think fold it into matching halves.
Name it:
  - A square has {n} lines of symmetry.
  - Each one folds it into halves that match.
  - Slanted lines can fold a shape too.
Together:
  - Fold it in your mind along each line. Tap every one that works.
  - Picture each fold. Count the ones where the halves match.
  - No picture now. Picture the shape and fold it in your mind.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert signs must match when folded. Count the lines on this one.
  - One more sign to check.
Reasons the pet gives when it is caught:
  diag: Oops. I thought a slanted line folds it. The halves do not match.
  axis: Oops. I only counted the straight lines. Slanted ones fold it too.
Tonight's question: Ask {name} to fold a paper square every way that makes matching halves.
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "You found {n} lines" (n is the square's four lines, not what the child tapped).
- Together 3 asked about a circle (the lesson never shows one; a circle has more lines than can be typed).
- The axis reason was spoken to the child ("Good catch").
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "shape6",
 "t": "Symmetry & Lines",
 "grade": 4,
 "age": "kid",
 "idea": "A line of symmetry folds a shape into matching halves.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Here is a square. Tap the lines you think fold it into matching halves."
  ],
  "name": [
   "A square has {n} lines of symmetry.",
   "Each one folds it into halves that match.",
   "Slanted lines can fold a shape too."
  ],
  "together": [
   "Fold it in your mind along each line. Tap every one that works.",
   "Picture each fold. Count the ones where the halves match.",
   "No picture now. Picture the shape and fold it in your mind."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The desert signs must match when folded. Count the lines on this one.",
   "One more sign to check."
  ]
 },
 "reasons": {
  "diag": [
   "Oops. I thought a slanted line folds it. The halves do not match."
  ],
  "axis": [
   "Oops. I only counted the straight lines. Slanted ones fold it too."
  ]
 },
 "home": "Ask {name} to fold a paper square every way that makes matching halves."
}
```

<details><summary>The API's first draft</summary>

```text
Symmetry & Lines (shape6), grade 4, the kid pet
Idea: A line of symmetry folds a shape into matching halves.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Here is a square with fold lines. Tap each one you think folds it in half.
Name it:
  - You found {n} lines.
  - Each line folds the square into matching halves.
  - A line of symmetry folds a shape into matching halves.
Together:
  - Look at this shape. Tap every line of symmetry you see.
  - Here is a picture of a new shape. How many lines of symmetry does it have?
  - Now only the name. How many lines of symmetry does a circle have?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert needs matching signs. Count the lines of symmetry on each one.
Reasons the pet gives when it is caught:
  diag: Look closer. That slant does not fold the shape into matching halves.
  axis: Good catch. Those straight folds are only part of the lines we need.
Tonight's question: Ask {name}: How many lines of symmetry does a square have?
About 3.5 minutes.
```

</details>
