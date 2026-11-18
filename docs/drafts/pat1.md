# Draft: What Comes Next (pat1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
What Comes Next (pat1), grade -1, the little pet
Idea: Patterns repeat so we know what comes next.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Put each shape with its group.
Name it:
  - Look at these shapes.
  - The pattern repeats.
  - We know what comes next.
Together:
  - Look at the pattern. Say it with me.
  - Say the pattern. What comes next?
  - Say it once more, then keep going.
Check me:
  - My turn. Check me!
  - Next comes the {ans}!
Show:
  - The path in Tiny Town needs a pattern. Which comes next?
Reasons the pet gives when it is caught:
  rep: Oops. I said the last one again. What comes next?
Tonight's question: Ask {name}: "What comes next in this pattern: dog cat dog cat?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember said the engine's "Let's play first"; the sort is not "any way you like" (each shape has its group).
- Together line 1 was the engine's own line; the reason spoke to the child ("You said") when the pet made the slip.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pat1",
 "t": "What Comes Next",
 "grade": -1,
 "age": "little",
 "idea": "Patterns repeat so we know what comes next.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Put each shape with its group."
  ],
  "name": [
   "Look at these shapes.",
   "The pattern repeats.",
   "We know what comes next."
  ],
  "together": [
   "Look at the pattern. Say it with me.",
   "Say the pattern. What comes next?",
   "Say it once more, then keep going."
  ],
  "check": [
   "My turn. Check me!",
   "Next comes the {ans}!"
  ],
  "show": [
   "The path in Tiny Town needs a pattern. Which comes next?"
  ]
 },
 "reasons": {
  "rep": [
   "Oops. I said the last one again. What comes next?"
  ]
 },
 "home": "Ask {name}: \"What comes next in this pattern: dog cat dog cat?\""
}
```

<details><summary>The API's first draft</summary>

```text
What Comes Next (pat1), grade -1, the little pet
Idea: Patterns repeat so we know what comes next.

Remember:
  - Do you remember this? Let's play first.
Explore:
  - Sort the shapes into the groups. Any way you like!
Name it:
  - Look at these shapes.
  - The pattern repeats.
  - We know what comes next.
Together:
  - Now let's do some together.
  - Look at the pattern. What comes next?
  - Look again. Which one comes next?
Check me:
  - My turn. Check me!
  - Next comes the {ans}!
Show:
  - The path in Tiny Town needs a pattern. Which comes next?
Reasons the pet gives when it is caught:
  rep: You said the last one again. | Look again. What comes next in the pattern?
Tonight's question: Ask {name}: "What comes next in this pattern: dog cat dog cat?"
About 3.2 minutes.
```

</details>
