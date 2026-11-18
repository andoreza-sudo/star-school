# Draft: Find the Shape (shape1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Find the Shape (shape1), grade -1, the little pet
Idea: We can name shapes by how they look.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Put each shape with its group.
Name it:
  - You sorted the {a} and the {b}.
  - We can name shapes by how they look.
Together:
  - Sort the shapes with me.
  - Listen. Then tap the shape I name.
  - Some shapes look alike. Look closely.
Check me:
  - My turn. Check me!
  - This is the {ans}!
Show:
  - Find the right shape for the door in Tiny Town.
Reasons the pet gives when it is caught:
  look: Look again. They look alike but they are not the same.
Tonight's question: Ask {name}: "Can you find a triangle in our house?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember and Explore used {a}, which those beats do not have (the warm-up counts; the sort names its own shapes).
- Together line 1 was the engine's own line ("Now let's do some together."), and lines 2 and 3 were the same: each now fits its item (a sort, three shapes, four with look-alikes).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "shape1",
 "t": "Find the Shape",
 "grade": -1,
 "age": "little",
 "idea": "We can name shapes by how they look.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Put each shape with its group."
  ],
  "name": [
   "You sorted the {a} and the {b}.",
   "We can name shapes by how they look."
  ],
  "together": [
   "Sort the shapes with me.",
   "Listen. Then tap the shape I name.",
   "Some shapes look alike. Look closely."
  ],
  "check": [
   "My turn. Check me!",
   "This is the {ans}!"
  ],
  "show": [
   "Find the right shape for the door in Tiny Town."
  ]
 },
 "reasons": {
  "look": [
   "Look again. They look alike but they are not the same."
  ]
 },
 "home": "Ask {name}: \"Can you find a triangle in our house?\""
}
```

<details><summary>The API's first draft</summary>

```text
Find the Shape (shape1), grade -1, the little pet
Idea: We can name shapes by how they look.

Remember:
  - Do you remember this? Look at these {a}.
Explore:
  - Sort the shapes into {a} groups by their kind.
Name it:
  - You sorted the {a} and the {b}.
  - We can name shapes by how they look.
Together:
  - Now let's do some together.
  - Tap the shape I name.
  - Tap the shape I name.
Check me:
  - My turn. Check me!
  - This is the {ans}!
Show:
  - Find the right shape for the door in Tiny Town.
Reasons the pet gives when it is caught:
  look: Look again. They look alike but they are not the same.
Tonight's question: Ask {name}: "Can you find a triangle in our house?"
About 3.2 minutes.
```

</details>
