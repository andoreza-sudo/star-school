# Draft: Convert Both Ways (meas6)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Convert Both Ways (meas6), grade 5, the teen pet
Idea: To a smaller unit, multiply. To a bigger unit, divide.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Pick how many feet. I will tell you the inches, and back again.
Name it:
  - {n} feet is {sum} inches.
  - Smaller units need more of them, so multiply.
  - Going back to feet, divide.
Together:
  - Use the table. It counts up one unit at a time.
  - Bigger or smaller unit? Then multiply or divide.
  - No help now. Which way is the unit going?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The bridge builders measure rope in different units. Convert this.
  - One more for the bridge.
Reasons the pet gives when it is caught:
  convDir: Oops. I multiplied, but the new unit is bigger. I should divide.
  conv: Oops. I added. Changing units means multiplying or dividing.
Tonight's question: Ask {name}: "How many feet is 36 inches?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reasons were "Look again. That one was wrong." (no reason).
- Remember had two lines; only one is said.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "meas6",
 "t": "Convert Both Ways",
 "grade": 5,
 "age": "teen",
 "idea": "To a smaller unit, multiply. To a bigger unit, divide.",
 "beats": {
  "remember": [
   "Quick warm-up. A times fact first."
  ],
  "explore": [
   "Pick how many feet. I will tell you the inches, and back again."
  ],
  "name": [
   "{n} feet is {sum} inches.",
   "Smaller units need more of them, so multiply.",
   "Going back to feet, divide."
  ],
  "together": [
   "Use the table. It counts up one unit at a time.",
   "Bigger or smaller unit? Then multiply or divide.",
   "No help now. Which way is the unit going?"
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The bridge builders measure rope in different units. Convert this.",
   "One more for the bridge."
  ]
 },
 "reasons": {
  "convDir": [
   "Oops. I multiplied, but the new unit is bigger. I should divide."
  ],
  "conv": [
   "Oops. I added. Changing units means multiplying or dividing."
  ]
 },
 "home": "Ask {name}: \"How many feet is 36 inches?\""
}
```

<details><summary>The API's first draft</summary>

```text
Convert Both Ways (meas6), grade 5, the teen pet
Idea: To a smaller unit you need more of them so multiply. To a bigger unit you need fewer so divide.

Remember:
  - Hey {name}. Here is today's idea.
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the stepper. Pick how many feet. See how many inches that is. Try going back the other way too.
Name it:
  - You picked {n} feet. That is {sum} inches.
  - To change to a smaller unit you need more of them so multiply.
  - To change to a bigger unit you need fewer so divide.
Together:
  - Let's build up by one unit at a time.
  - Now picture one unit's size and solve.
  - Now just the symbols.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The bridge needs new rope measured both ways. Show what you know.
Reasons the pet gives when it is caught:
  convDir: Look again. That one was wrong. | Try the other way round.
  conv: Look again. That one was wrong. | Which unit is bigger?
Tonight's question: Ask {name}: "If a rope is 6 feet long how many inches is that?"
About 3.5 minutes.
```

</details>
