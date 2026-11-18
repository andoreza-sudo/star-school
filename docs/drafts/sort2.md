# Draft: Big and Small (sort2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Big and Small (sort2), grade -1, the little pet
Idea: Some things are bigger. Some things are smaller.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Sort these into big ones and small ones. Any way you like!
Name it:
  - Look at these.
  - This one is bigger.
  - This one is smaller.
Together:
  - Sort the big ones and the small ones.
  - Look at both. Which takes more room?
  - Look at all of them first.
Check me:
  - My turn. Check me!
  - I pick {ans}!
Show:
  - The toy shop needs help. Find the one I ask for.
Reasons the pet gives when it is caught:
  size: Oops. I picked the wrong one. Look at the sizes.
Tonight's question: Ask {name} to line up 3 shoes from smallest to biggest.
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 3 and Show said "biggest" and "smallest", but the app asks for either: now general.
- The reason said "This one is bigger!" (wrong when the question asked for the smallest).
- Remember fits the warm-up (a counting frame).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sort2",
 "t": "Big and Small",
 "grade": -1,
 "age": "little",
 "idea": "Some things are bigger. Some things are smaller.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Sort these into big ones and small ones. Any way you like!"
  ],
  "name": [
   "Look at these.",
   "This one is bigger.",
   "This one is smaller."
  ],
  "together": [
   "Sort the big ones and the small ones.",
   "Look at both. Which takes more room?",
   "Look at all of them first."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}!"
  ],
  "show": [
   "The toy shop needs help. Find the one I ask for."
  ]
 },
 "reasons": {
  "size": [
   "Oops. I picked the wrong one. Look at the sizes."
  ]
 },
 "home": "Ask {name} to line up 3 shoes from smallest to biggest."
}
```

<details><summary>The API's first draft</summary>

```text
Big and Small (sort2), grade -1, the little pet
Idea: Some things are bigger. Some things are smaller.

Remember:
  - Do you remember this? Show me the big one.
Explore:
  - Sort these into big ones and small ones. Any way you like!
Name it:
  - Look at these.
  - This one is bigger.
  - This one is smaller.
Together:
  - Now let's sort these.
  - Tap the bigger one.
  - Tap the biggest one.
Check me:
  - My turn. Check me!
  - I pick {ans}!
Show:
  - Find the smallest one in each row.
Reasons the pet gives when it is caught:
  size: I picked the small one. This one is bigger!
Tonight's question: Ask {name}: Which toy at home is the biggest?
About 3.1 minutes.
```

</details>
