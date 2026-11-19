# Draft: Push, Pull & Stuff (sci_phys1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52s-words5.js). -->

## Read-through

```text
Push, Pull & Stuff (sci_phys1), grade 0, the little pet
Idea: Size does not decide. Light for its size floats.

Remember:
  - Do you remember this one?
Explore:
  - Guess: will it float or sink? Any guess is fine.
Name it:
  - Look! The {a} floats. The {b} sinks.
  - Size does not decide.
  - Light for its size floats. Heavy for its size sinks.
Together:
  - Sort them again. Light or heavy for its size?
  - Do not go by size alone.
  - Now pick the reason.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - We are packing for a pond trip. Show me what you know.
Reasons the pet gives when it is caught:
  dBig: Oops. I went by size. Light for its size floats.
Tonight's question: Ask {name} to guess what floats in the bath, then try it.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

The first draft's lines were read one by one. Changes:
- The idea was the Name it line; it now leads with the lesson's point (size does not decide), as the fallback does.
- Remember asked "Which one floats?", but the warm-up is the lesson before (melting); it now just says the item is from before.
- Together line 2 "Look at these. What do you think?" and line 3 "Why does it float or sink?" now coach the idea and say to pick the reason.
- Show said "Pick what floats or sinks!", but Show may ask a reason; it is now a job that fits both.
- The reason "Look again. Size does not decide." is now the pet's own slip.
- Tonight's question "What floats and why?" became a guess-then-try at bath time.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sci_phys1",
 "t": "Push, Pull & Stuff",
 "grade": 0,
 "age": "little",
 "idea": "Size does not decide. Light for its size floats.",
 "beats": {
  "remember": [
   "Do you remember this one?"
  ],
  "explore": [
   "Guess: will it float or sink? Any guess is fine."
  ],
  "name": [
   "Look! The {a} floats. The {b} sinks.",
   "Size does not decide.",
   "Light for its size floats. Heavy for its size sinks."
  ],
  "together": [
   "Sort them again. Light or heavy for its size?",
   "Do not go by size alone.",
   "Now pick the reason."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. Am I right?"
  ],
  "show": [
   "We are packing for a pond trip. Show me what you know."
  ]
 },
 "reasons": {
  "dBig": [
   "Oops. I went by size. Light for its size floats."
  ]
 },
 "home": "Ask {name} to guess what floats in the bath, then try it."
}
```

<details><summary>The API's first draft</summary>

```text
Push, Pull & Stuff (sci_phys1), grade 0, the little pet
Idea: Light for its size floats. Heavy for its size sinks.

Remember:
  - Do you remember this? Which one floats?
Explore:
  - Let's sort the pictures. Guess what floats and sinks.
Name it:
  - The {a} floats. The {b} sinks.
  - Size does not decide.
  - Light for its size floats. Heavy for its size sinks.
Together:
  - Let's sort these again.
  - Look at these. What do you think?
  - Why does it float or sink?
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The trail needs help. Pick what floats or sinks!
Reasons the pet gives when it is caught:
  dBig: Look again. Size does not decide.
Tonight's question: Ask {name}: "What floats and why?"
About 3.2 minutes.
```

</details>
