# Draft: Sky & Earth (sci_earth1)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52s-words5.js). -->

## Read-through

```text
Sky & Earth (sci_earth1), grade 0, the little pet
Idea: Sunlight warms things up. Ice in the sun melts first.

Remember:
  - Do you remember this one?
Explore:
  - Guess which ones will melt in the hot sun. Any guess works.
Name it:
  - Look! The {a} melted.
  - The {b} stayed the same.
  - Sunlight warms things up. Ice in the sun melts first.
Together:
  - Sort them again. Is it something frozen?
  - Think: where is it warmer?
  - Now pick the reason.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - Help the park ranger plan for a hot sunny day.
Reasons the pet gives when it is caught:
  dSun: Oops. The sun warms things more than the shade does.
  dAll: Oops. Only frozen things melt in the sun. The rest stay.
Tonight's question: Ask {name}: where would ice melt first, in the sun or the shade?
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

The first draft's lines were read one by one. Changes:
- The idea "Sunlight warms things. Some melt. Some stay." did not say which melt; it now names the sun and the shade, the lesson's prediction.
- Remember asked "What warms things up?", but the warm-up is about living things; it now just says the item is from before.
- Explore said "Let's sort": it is a guess, so it says any guess is fine.
- Name it: "The {a} melted." kept short: the look picture shows ice and snow turning into water (ice cream just melts).
- Together lines 2 and 3 asked "What will happen to this one?" and "Why does this one change?", which did not fit every item (some are about the sun and the shade, some about a rock that does not change); they now coach the idea.
- Show said "Pick what melts in the sun", but Show may ask a reason; it is now a job that fits both.
- The reasons said "Look again..." to the child; each is now the pet's slip.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sci_earth1",
 "t": "Sky & Earth",
 "grade": 0,
 "age": "little",
 "idea": "Sunlight warms things up. Ice in the sun melts first.",
 "beats": {
  "remember": [
   "Do you remember this one?"
  ],
  "explore": [
   "Guess which ones will melt in the hot sun. Any guess works."
  ],
  "name": [
   "Look! The {a} melted.",
   "The {b} stayed the same.",
   "Sunlight warms things up. Ice in the sun melts first."
  ],
  "together": [
   "Sort them again. Is it something frozen?",
   "Think: where is it warmer?",
   "Now pick the reason."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. Am I right?"
  ],
  "show": [
   "Help the park ranger plan for a hot sunny day."
  ]
 },
 "reasons": {
  "dSun": [
   "Oops. The sun warms things more than the shade does."
  ],
  "dAll": [
   "Oops. Only frozen things melt in the sun. The rest stay."
  ]
 },
 "home": "Ask {name}: where would ice melt first, in the sun or the shade?"
}
```

<details><summary>The API's first draft</summary>

```text
Sky & Earth (sci_earth1), grade 0, the little pet
Idea: Sunlight warms things. Some melt. Some stay.

Remember:
  - Do you remember this? What warms things up?
Explore:
  - Let's sort the pictures. Which melt in the hot sun?
Name it:
  - The {a} melted.
  - The {b} stayed the same.
  - Sunlight warms things.
Together:
  - Let's sort these again.
  - What will happen to this one?
  - Why does this one change?
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The trail needs help. Pick what melts in the sun.
Reasons the pet gives when it is caught:
  dSun: Look again. The sun warms more than the shade.
  dAll: Look again. Not everything melts in the sun.
Tonight's question: Ask {name}: "What melts in the sun at our house?"
About 3.2 minutes.
```

</details>
