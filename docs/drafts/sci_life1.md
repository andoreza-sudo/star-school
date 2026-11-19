# Draft: Living Things (sci_life1)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52s-words5.js). -->

## Read-through

```text
Living Things (sci_life1), grade 0, the little pet
Idea: Living things grow. Toys and rocks do not grow.

Remember:
  - Do you remember this one?
Explore:
  - Guess which ones will grow bigger. Any guess is fine.
Name it:
  - Look! The {a} grew. The {b} did not.
  - Living things grow. Toys and rocks do not grow.
Together:
  - Sort them again. Think: is it alive?
  - Remember, moving is not the same as growing.
  - Now pick the reason.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The trail needs a sign about living things. Help me.
Reasons the pet gives when it is caught:
  dMove: Oops. It moves, but it does not grow. It is not alive.
  dStill: Oops. A plant stays still, but it grows. It is alive.
Tonight's question: Ask {name}: is a tree alive? How do you know?
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

The first draft's lines were read one by one. Changes:
- Explore said "Let's sort the pictures": it is a guess (predict), so it says any guess is fine.
- Name it said "The {a} grew. The {b} did not grow." and the idea: kept, with "Look!" because this is the look step.
- Together line 2 asked "Will it grow?" about one thing, but the item has three pictures; it now names the kid idea the item tests (moving is not growing).
- Together line 3 asked "Why do you think so?" before a list of reasons: it now says to pick the reason.
- Both reasons were "Look again. I made a mistake!" (the engine already says that kind of line); each is now the pet's own slip, true for any thing the pet picks.
- Show: "The trail needs signs. Pick for each one." became a sign about living things.
- Tonight's question was "What grows in our yard?"; it now asks how we know a tree is alive (it grows).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sci_life1",
 "t": "Living Things",
 "grade": 0,
 "age": "little",
 "idea": "Living things grow. Toys and rocks do not grow.",
 "beats": {
  "remember": [
   "Do you remember this one?"
  ],
  "explore": [
   "Guess which ones will grow bigger. Any guess is fine."
  ],
  "name": [
   "Look! The {a} grew. The {b} did not.",
   "Living things grow. Toys and rocks do not grow."
  ],
  "together": [
   "Sort them again. Think: is it alive?",
   "Remember, moving is not the same as growing.",
   "Now pick the reason."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. Am I right?"
  ],
  "show": [
   "The trail needs a sign about living things. Help me."
  ]
 },
 "reasons": {
  "dMove": [
   "Oops. It moves, but it does not grow. It is not alive."
  ],
  "dStill": [
   "Oops. A plant stays still, but it grows. It is alive."
  ]
 },
 "home": "Ask {name}: is a tree alive? How do you know?"
}
```

<details><summary>The API's first draft</summary>

```text
Living Things (sci_life1), grade 0, the little pet
Idea: Living things grow. Toys and rocks do not.

Remember:
  - Do you remember this? Which one will grow?
Explore:
  - Let's sort the pictures. Which will grow?
Name it:
  - The {a} grew. The {b} did not grow.
  - Living things grow. Toys and rocks do not.
Together:
  - Sort these with me.
  - Look at this one. Will it grow?
  - Why do you think so?
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The trail needs signs. Pick for each one.
Reasons the pet gives when it is caught:
  dMove: Look again. I made a mistake!
  dStill: Look again. I made a mistake!
Tonight's question: Ask {name}: "What grows in our yard?"
About 3.2 minutes.
```

</details>
