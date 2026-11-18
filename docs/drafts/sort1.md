# Draft: Which One Is Different (sort1)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Which One Is Different (sort1), grade -1, the little pet
Idea: Most are the same. One is different.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Put each picture with its group.
Name it:
  - You sorted them well.
  - Most are the same. One is different.
Together:
  - Look at these. Tap the one that is different.
  - Look again. Tap the one that is different.
  - Look at these shapes. Tap the one that is different.
Check me:
  - My turn. Check me!
  - I pick {ans}. It is different!
Show:
  - Help in the shop. Tap the one that is different.
Reasons the pet gives when it is caught:
  alike: Oops. That one matches the others. Find the odd one.
Tonight's question: Ask {name}: "Which of these is not a fruit?"
About 3.2 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea and Remember used {a} (this lesson has no number to say); "two groups" was a number word.
- The reasons were the engine's tone lines ("You caught my mistake!"): now the pet says what it did.
- Tonight's question now names something to look at.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sort1",
 "t": "Which One Is Different",
 "grade": -1,
 "age": "little",
 "idea": "Most are the same. One is different.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Put each picture with its group."
  ],
  "name": [
   "You sorted them well.",
   "Most are the same. One is different."
  ],
  "together": [
   "Look at these. Tap the one that is different.",
   "Look again. Tap the one that is different.",
   "Look at these shapes. Tap the one that is different."
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. It is different!"
  ],
  "show": [
   "Help in the shop. Tap the one that is different."
  ]
 },
 "reasons": {
  "alike": [
   "Oops. That one matches the others. Find the odd one."
  ]
 },
 "home": "Ask {name}: \"Which of these is not a fruit?\""
}
```

<details><summary>The API's first draft</summary>

```text
Which One Is Different (sort1), grade -1, the little pet
Idea: {a} are the same. One is different.

Remember:
  - Do you remember this? Look at these {a}.
Explore:
  - Sort these pictures into two groups.
Name it:
  - You sorted them well.
  - {a} are the same. One is different.
Together:
  - Look at these. Tap the one that is different.
  - Look again. Tap the one that is different.
  - Look at these shapes. Tap the one that is different.
Check me:
  - My turn. Check me!
  - I pick {ans}. It is different!
Show:
  - Help in the shop. Tap the one that is different.
Reasons the pet gives when it is caught:
  alike: Look again. I made a mistake! | You caught my mistake!
Tonight's question: Ask {name}: Which one is different?
About 3.2 minutes.
```

</details>
