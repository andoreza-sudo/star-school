# Draft: Divide Fractions (fop7)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Divide Fractions (fop7), grade 6, the teen pet
Idea: Dividing by a fraction counts how many of it fit: same size parts first.

Remember:
  - A fraction from before.
Explore:
  - Mark groups over the shaded part, as many as you like.
Name it:
  - {n} groups cover {a} parts of the bar.
  - Dividing by a fraction asks how many of it fit.
  - With same size parts, just divide the tops.
Together:
  - Mark groups until the shaded part is covered.
  - The parts already match. Count how many groups fit.
  - Rename to same size parts, then divide the tops.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The panel crew cuts strips into pieces. How many fit?
Reasons the pet gives when it is caught:
  noRename: I divided the tops before the parts were the same size.
  flipDiv: I turned it upside down. It asks how many fit: a whole count.
Tonight's question: Ask {name}: "How many 1/6 cups fit in 2/3 of a cup?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "groups of {a} eighths": a number word and a slot Explore does not have.
- Together lines were "Picture the bar first" and "Use the model"; they now say what to do on each kind of item.
- The flipDiv reason ("That flips the fraction the wrong way") did not say what the pet did.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop7",
 "t": "Divide Fractions",
 "grade": 6,
 "age": "teen",
 "idea": "Dividing by a fraction counts how many of it fit: same size parts first.",
 "beats": {
  "remember": [
   "A fraction from before."
  ],
  "explore": [
   "Mark groups over the shaded part, as many as you like."
  ],
  "name": [
   "{n} groups cover {a} parts of the bar.",
   "Dividing by a fraction asks how many of it fit.",
   "With same size parts, just divide the tops."
  ],
  "together": [
   "Mark groups until the shaded part is covered.",
   "The parts already match. Count how many groups fit.",
   "Rename to same size parts, then divide the tops."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The panel crew cuts strips into pieces. How many fit?"
  ]
 },
 "reasons": {
  "noRename": [
   "I divided the tops before the parts were the same size."
  ],
  "flipDiv": [
   "I turned it upside down. It asks how many fit: a whole count."
  ]
 },
 "home": "Ask {name}: \"How many 1/6 cups fit in 2/3 of a cup?\""
}
```

<details><summary>The API's first draft</summary>

```text
Divide Fractions (fop7), grade 6, the teen pet
Idea: Dividing by a fraction counts how many fit. Make parts the same size first then divide the tops.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Mark any groups of {a} eighths over the bar. Any way you like.
Name it:
  - You marked {n} groups. They cover {a} parts.
  - Dividing by a fraction counts how many fit.
  - Make the parts the same size first then divide the tops.
Together:
  - Picture the bar first.
  - Use the model to see how many fit.
  - Now try the division in symbols.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - In Sky City the towers need panels. How many fit in each space?
Reasons the pet gives when it is caught:
  noRename: The parts must be the same size first.
  flipDiv: That flips the fraction the wrong way.
Tonight's question: Ask {name}: How many halves fit inside three quarters?
About 3.4 minutes.
```

</details>
