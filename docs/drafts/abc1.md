# Draft: Big Letters (abc1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Big Letters (abc1), grade -1, the little pet
Idea: Big letters have names. Words start with a sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the first sound of each.
Name it:
  - {a} and {b} start with {letter}.
  - You know its name!
  - Big letters have names. Words start with a sound.
Together:
  - Listen to {word}. Tap its big letter with me.
  - Look at this picture. Tap its big letter.
  - Listen. Tap the big letter you hear.
Check me:
  - My turn. Check me!
  - That is {ans}!
Show:
  - The beach needs signs. Find each big letter!
Reasons the pet gives when it is caught:
  look: Oops. Those letters look alike. Look closely.
Tonight's question: Ask {name}: "What big letter starts your name?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it said "This big {letter} starts {a} and {b}" (not a sentence).
- The reasons were the engine's lines ("Look! Let me help.", "You caught my mistake!").
- Big Letters is the first stop of ABC Beach, so there is no warm-up yet; Remember waits for later lessons.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "abc1",
 "t": "Big Letters",
 "grade": -1,
 "age": "little",
 "idea": "Big letters have names. Words start with a sound.",
 "beats": {
  "remember": [
   "Do you remember this? Find the letter {letter}."
  ],
  "explore": [
   "Let's sort the pictures. Listen to the first sound of each."
  ],
  "name": [
   "{a} and {b} start with {letter}.",
   "You know its name!",
   "Big letters have names. Words start with a sound."
  ],
  "together": [
   "Listen to {word}. Tap its big letter with me.",
   "Look at this picture. Tap its big letter.",
   "Listen. Tap the big letter you hear."
  ],
  "check": [
   "My turn. Check me!",
   "That is {ans}!"
  ],
  "show": [
   "The beach needs signs. Find each big letter!"
  ]
 },
 "reasons": {
  "look": [
   "Oops. Those letters look alike. Look closely."
  ]
 },
 "home": "Ask {name}: \"What big letter starts your name?\""
}
```

<details><summary>The API's first draft</summary>

```text
Big Letters (abc1), grade -1, the little pet
Idea: Big letters have names. Words start with a sound.

Remember:
  - Do you remember this? Show me what you know.
Explore:
  - Let's sort the pictures. Listen to the first sound of each.
Name it:
  - This big {letter} starts {a} and {b}.
  - You know its name!
  - Big letters have names. Words start with a sound.
Together:
  - Listen to {word}. Tap its big letter with me.
  - Look at this picture. Tap its big letter.
  - Hear the letter name. Tap that big letter.
Check me:
  - My turn. Check me!
  - That is {ans}!
Show:
  - The beach needs signs. Find each big letter!
Reasons the pet gives when it is caught:
  look: Look! Let me help. | You caught my mistake!
Tonight's question: Ask {name}: "What big letter starts your name?"
About 3.3 minutes.
```

</details>
