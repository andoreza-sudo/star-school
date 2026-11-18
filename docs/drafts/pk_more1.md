# Draft: Which Has More (pk_more1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Which Has More (pk_more1), grade -1, the little pet
Idea: Match them up. The one with some left over has more.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with blue and orange. Any way you like!
Name it:
  - You put in {a} blue and {b} orange.
  - Match them up, one and one.
  - The one with some left over has more.
Together:
  - Match each dot. Then put in more.
  - Look at both plates.
  - Look at every plate.
Check me:
  - My turn. Check me!
  - I pick {ans}. It has the most!
Show:
  - Help set the tables. Tap the plate with the most.
Reasons the pet gives when it is caught:
  fewer: Oops. That plate has fewer. Match them up.
Tonight's question: Ask {name}: "Who has more grapes, you or me?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "The blue has some left over" whatever the child built (orange may have more, or they may be the same).
- Together lines 2 and 3 repeated the question the app asks itself; line 1 now fits the build (more than the dots).
- Tonight's question had no quotes and nothing to compare.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pk_more1",
 "t": "Which Has More",
 "grade": -1,
 "age": "little",
 "idea": "Match them up. The one with some left over has more.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Fill the frame with blue and orange. Any way you like!"
  ],
  "name": [
   "You put in {a} blue and {b} orange.",
   "Match them up, one and one.",
   "The one with some left over has more."
  ],
  "together": [
   "Match each dot. Then put in more.",
   "Look at both plates.",
   "Look at every plate."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. It has the most!"
  ],
  "show": [
   "Help set the tables. Tap the plate with the most."
  ]
 },
 "reasons": {
  "fewer": [
   "Oops. That plate has fewer. Match them up."
  ]
 },
 "home": "Ask {name}: \"Who has more grapes, you or me?\""
}
```

<details><summary>The API's first draft</summary>

```text
Which Has More (pk_more1), grade -1, the little pet
Idea: Match them up. The one with some left over has more.

Remember:
  - Do you remember this? Look at these.
Explore:
  - Fill the frame with blue and orange. Any way you like!
Name it:
  - You put in {a} blue and {b} orange.
  - The blue has some left over.
  - The one with some left over has more.
Together:
  - Let's put counters on the dots.
  - Tap the plate with more.
  - Tap the one with the most.
Check me:
  - My turn. Check me!
  - I pick {ans}. It has the most!
Show:
  - Help set the tables. Tap the plate with the most.
Reasons the pet gives when it is caught:
  fewer: Look again. That one has less. | The other one has some left over.
Tonight's question: Ask {name}: Which plate has more?
About 3.3 minutes.
```

</details>
