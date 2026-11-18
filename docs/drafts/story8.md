# Draft: Fraction Stories (story8)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Fraction Stories (story8), grade 5, the teen pet
Idea: For a fraction of an amount, divide by the bottom, then multiply by the top.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - This bar is {n}, cut into equal parts. Shade any parts you like.
Name it:
  - {a} parts of {n} shaded are worth {sum}.
  - Each part is the same share of {n}.
  - Divide by the bottom, then multiply by the top.
Together:
  - Shade the fraction the story names on the bar.
  - The bar is drawn. Find one part, then the parts asked for.
  - No bar now. Divide by the bottom, then multiply by the top.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave team is sharing out supplies. Solve this story.
  - One more story for the team.
Reasons the pet gives when it is caught:
  unitOnly: Oops. I found only one part. The story asked for more parts.
  fracTop: Oops. I multiplied by the top but forgot to divide by the bottom.
Tonight's question: Ask {name}: "What is 3/4 of 24?"
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "cut into {word}" (a reading slot; no word here).
- The idea and Name it were in note form ("Fraction of amount: divide by bottom").
- Show said "{k} stories" (no number).
- Tonight's question (half of twenty) used number words and only a unit fraction.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "story8",
 "t": "Fraction Stories",
 "grade": 5,
 "age": "teen",
 "idea": "For a fraction of an amount, divide by the bottom, then multiply by the top.",
 "beats": {
  "remember": [
   "Quick warm-up. Name the shaded fraction."
  ],
  "explore": [
   "This bar is {n}, cut into equal parts. Shade any parts you like."
  ],
  "name": [
   "{a} parts of {n} shaded are worth {sum}.",
   "Each part is the same share of {n}.",
   "Divide by the bottom, then multiply by the top."
  ],
  "together": [
   "Shade the fraction the story names on the bar.",
   "The bar is drawn. Find one part, then the parts asked for.",
   "No bar now. Divide by the bottom, then multiply by the top."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The cave team is sharing out supplies. Solve this story.",
   "One more story for the team."
  ]
 },
 "reasons": {
  "unitOnly": [
   "Oops. I found only one part. The story asked for more parts."
  ],
  "fracTop": [
   "Oops. I multiplied by the top but forgot to divide by the bottom."
  ]
 },
 "home": "Ask {name}: \"What is 3/4 of 24?\""
}
```

<details><summary>The API's first draft</summary>

```text
Fraction Stories (story8), grade 5, the teen pet
Idea: Fraction of amount: divide by bottom to find one part then take top number of parts.

Remember:
  - Do you remember this? Name the shaded fraction.
Explore:
  - Here is a bar of {n} cut into {word}. Shade any parts you like.
Name it:
  - You built {n}. You shaded {a} parts worth {sum}.
  - Fraction of amount: divide by bottom to find one part then take top number of parts.
Together:
  - Picture the story first with a bar model.
  - Now picture this story with its bar model drawn.
  - Here is a story alone. Use the model in your mind.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The caves need supplies. Solve these {k} stories.
Reasons the pet gives when it is caught:
  unitOnly: You found one part. Now take the number of parts the top asks for.
  fracTop: That multiplies by the top only. First divide the whole by the bottom to find one part.
Tonight's question: Ask {name}: What is half of twenty?
About 3.4 minutes.
```

</details>
