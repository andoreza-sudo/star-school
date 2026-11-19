# Draft: Two-Step Equations (alg3)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Two-Step Equations (alg3), grade 6, the teen pet
Idea: Undo the steps in reverse: take away the number added, then divide.

Remember:
  - A one-step equation from before.
Explore:
  - Set x to any number and watch both bars.
Name it:
  - With x as {x}, the bottom bar is {sum}.
  - First take off the extra part, then share by the boxes.
  - Undo the steps in reverse order.
Together:
  - Set x until both bars are the same length.
  - Take off the known part, then split the rest.
  - Undo the plus or minus first, then the times.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The gate needs its codes. Solve for x.
Reasons the pet gives when it is caught:
  stop1: I stopped after one step. x was not alone yet.
  undo: I did the operation instead of undoing it.
  slip: I slipped by one in a step.
Tonight's question: Ask {name}: "3x + 4 = 19. What is x?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember said "Show me what you already know" (the warm-up is a one-step equation).
- Name it said "Your {x} is here" and repeated the idea.
- Reasons were two lines each of advice and the engine's lines; they are now the pet's slip.
- Tonight's question was not one a grown-up could check.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "alg3",
 "t": "Two-Step Equations",
 "grade": 6,
 "age": "teen",
 "idea": "Undo the steps in reverse: take away the number added, then divide.",
 "beats": {
  "remember": [
   "A one-step equation from before."
  ],
  "explore": [
   "Set x to any number and watch both bars."
  ],
  "name": [
   "With x as {x}, the bottom bar is {sum}.",
   "First take off the extra part, then share by the boxes.",
   "Undo the steps in reverse order."
  ],
  "together": [
   "Set x until both bars are the same length.",
   "Take off the known part, then split the rest.",
   "Undo the plus or minus first, then the times."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The gate needs its codes. Solve for x."
  ]
 },
 "reasons": {
  "stop1": [
   "I stopped after one step. x was not alone yet."
  ],
  "undo": [
   "I did the operation instead of undoing it."
  ],
  "slip": [
   "I slipped by one in a step."
  ]
 },
 "home": "Ask {name}: \"3x + 4 = 19. What is x?\""
}
```

<details><summary>The API's first draft</summary>

```text
Two-Step Equations (alg3), grade 6, the teen pet
Idea: Undo the steps in reverse order.

Remember:
  - Do you remember this? Show me what you already know.
Explore:
  - Picture it first. Set the unknown to make both bars the same length.
Name it:
  - Your {x} is here. The bottom bar shows {sum}.
  - Undo the steps in reverse order: first take away the number added, then divide by the number of boxes.
  - Undo the steps in reverse order.
Together:
  - First make both bars the same length.
  - Now find the unknown with the model.
  - Now solve the equation with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The space gate needs power. Solve each equation to open it.
Reasons the pet gives when it is caught:
  stop1: That finishes the first step only. Now undo the next step too. | We still need to undo the other step.
  undo: Try the opposite operation. Add to undo take away. | We undo in reverse order.
  slip: Look again. That one was wrong. | Fair. I got that wrong.
Tonight's question: Ask {name}: What does undo mean when we solve an equation?
About 3.4 minutes.
```

</details>
