# Draft: Count to 5 (pk_count1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Count to 5 (pk_count1), grade -1, the little pet
Idea: One number for each thing.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame any way you like!
Name it:
  - You put in {n}.
  - Count each one.
  - One number for each thing.
Together:
  - Put in {n} counters with me.
  - Count each one in the row.
  - Hear the number. Tap it.
Check me:
  - My turn. Check me!
  - I count {ans}. Am I right?
Show:
  - The path needs {n} rocks. Put them in the frame.
  - The shop needs {n} apples. Put them in the frame.
Reasons the pet gives when it is caught:
  off1: Oops. I was one off. Touch each one as you count.
Tonight's question: Ask {name}: "Can you show me four fingers?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember made general (Count to 5 is the first stop: there is no warm-up yet, so the line waits for later lessons).
- The pet's reason fits both ways (it may count one too many or one too few).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "pk_count1",
 "t": "Count to 5",
 "grade": -1,
 "age": "little",
 "idea": "One number for each thing.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Fill the frame any way you like!"
  ],
  "name": [
   "You put in {n}.",
   "Count each one.",
   "One number for each thing."
  ],
  "together": [
   "Put in {n} counters with me.",
   "Count each one in the row.",
   "Hear the number. Tap it."
  ],
  "check": [
   "My turn. Check me!",
   "I count {ans}. Am I right?"
  ],
  "show": [
   "The path needs {n} rocks. Put them in the frame.",
   "The shop needs {n} apples. Put them in the frame."
  ]
 },
 "reasons": {
  "off1": [
   "Oops. I was one off. Touch each one as you count."
  ]
 },
 "home": "Ask {name}: \"Can you show me four fingers?\""
}
```

<details><summary>The API's first draft</summary>

```text
Count to 5 (pk_count1), grade -1, the little pet
Idea: One number for each thing.

Remember:
  - Do you remember this? Show me how many.
Explore:
  - Fill the frame any way you like!
Name it:
  - You put in {n}.
  - Count each one.
  - One number for each thing.
Together:
  - Put in {n} counters with me.
  - Count each one in the row.
  - Hear the number. Tap it.
Check me:
  - My turn. Check me!
  - I count {ans}. Am I right?
Show:
  - The path needs {n} rocks. Put them in the frame.
  - The shop needs {n} apples. Put them in the frame.
Reasons the pet gives when it is caught:
  off1: One too many. Let us count again. | One is left over. Let us count again.
Tonight's question: Ask {name}: "Can you show me four fingers?"
About 3.3 minutes.
```

</details>
