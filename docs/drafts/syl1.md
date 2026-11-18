# Draft: Clap the Syllables (syl1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Clap the Syllables (syl1), grade -1, the little pet
Idea: Words have parts. Clap once for each part.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Let's sort the pictures. Clap once for each part.
Name it:
  - Listen. Ba, na, na. Clap with me!
  - Clap once for each part.
  - Words have parts. Clap once for each part.
Together:
  - Clap each word. Then put it in its bin.
  - Say the word and clap with me.
  - Say it slowly. Clap each part.
Check me:
  - My turn. Check me!
  - I clap {ans}. Am I right?
Show:
  - The beach needs signs. Clap and pick the right one!
Reasons the pet gives when it is caught:
  clap: Oops. I clapped wrong. Clap once for each part.
Tonight's question: Ask {name}: "Can you clap the parts in banana?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it had a slot it has no number for ("{ans} parts", and "Sun. Ny." for a word that is not shown); the card shows banana: now clapped.
- Remember fits the warm-up (a counting frame).
- The reason said "one too many" (true only one way).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "syl1",
 "t": "Clap the Syllables",
 "grade": -1,
 "age": "little",
 "idea": "Words have parts. Clap once for each part.",
 "beats": {
  "remember": [
   "Do you remember this? Count with me."
  ],
  "explore": [
   "Let's sort the pictures. Clap once for each part."
  ],
  "name": [
   "Listen. Ba, na, na. Clap with me!",
   "Clap once for each part.",
   "Words have parts. Clap once for each part."
  ],
  "together": [
   "Clap each word. Then put it in its bin.",
   "Say the word and clap with me.",
   "Say it slowly. Clap each part."
  ],
  "check": [
   "My turn. Check me!",
   "I clap {ans}. Am I right?"
  ],
  "show": [
   "The beach needs signs. Clap and pick the right one!"
  ]
 },
 "reasons": {
  "clap": [
   "Oops. I clapped wrong. Clap once for each part."
  ]
 },
 "home": "Ask {name}: \"Can you clap the parts in banana?\""
}
```

<details><summary>The API's first draft</summary>

```text
Clap the Syllables (syl1), grade -1, the little pet
Idea: Words have parts. Clap once for each part.

Remember:
  - Do you remember this? Clap with me!
Explore:
  - Let's sort the pictures. Clap once for each part.
Name it:
  - Listen. Clap with me. Sun. Ny. {ans} parts!
  - That word has both parts.
  - Words have parts. Clap once for each part.
Together:
  - Now let's clap some words together.
  - Listen to this picture. Clap with me.
  - Look at these. Clap each one.
Check me:
  - My turn. Check me!
  - I clap {ans}. Am I right?
Show:
  - The beach needs signs. Clap and pick the right one!
Reasons the pet gives when it is caught:
  clap: Oops. I clapped one too many. Listen again.
Tonight's question: Ask {name}: "Can you clap the parts in banana?"
About 3.3 minutes.
```

</details>
