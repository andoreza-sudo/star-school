# Draft: Count the Claps (syl2)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Count the Claps (syl2), grade 1, the little pet
Idea: Words have parts. Clap once for each part you say.

Remember:
  - Do you remember this? Clap the parts of the word.
Explore:
  - {word}! Say it slowly and clap each part.
Name it:
  - {word} has {n} parts.
  - We clapped once for each part.
  - Words have parts. Clap once for each part.
Together:
  - Clap {word} with me. Tap Clap for each part.
  - Say {word} slowly. Count your claps.
  - Read {word} and say it. Count the claps.
Check me:
  - My turn. Check me!
  - I clap {ans}. Am I right?
Show:
  - The candy shop has a clapping game. Clap each word!
Reasons the pet gives when it is caught:
  clap: Oops. I clapped one too many or too few.
Tonight's question: Ask {name} to clap "butterfly". How many claps?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The reason said "one too many": the pet can also clap one too few, so it now says both.
- Explore did not name the word; this line is what the app says with the clap model, so it names {word}.
- Name it said "{word} has {n} claps"; it now says parts, then the claps, then the idea.
- Together lines 2 and 3 were the same; line 3 now reads the word first (it comes before a written word).
- Show said "needs signs"; it is now a clapping game, which is what Show asks.
- Tonight's question used elephant; now butterfly, as the fallback.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "syl2",
 "t": "Count the Claps",
 "grade": 1,
 "age": "little",
 "idea": "Words have parts. Clap once for each part you say.",
 "beats": {
  "remember": [
   "Do you remember this? Clap the parts of the word."
  ],
  "explore": [
   "{word}! Say it slowly and clap each part."
  ],
  "name": [
   "{word} has {n} parts.",
   "We clapped once for each part.",
   "Words have parts. Clap once for each part."
  ],
  "together": [
   "Clap {word} with me. Tap Clap for each part.",
   "Say {word} slowly. Count your claps.",
   "Read {word} and say it. Count the claps."
  ],
  "check": [
   "My turn. Check me!",
   "I clap {ans}. Am I right?"
  ],
  "show": [
   "The candy shop has a clapping game. Clap each word!"
  ]
 },
 "reasons": {
  "clap": [
   "Oops. I clapped one too many or too few."
  ]
 },
 "home": "Ask {name} to clap \"butterfly\". How many claps?"
}
```

<details><summary>The API's first draft</summary>

```text
Count the Claps (syl2), grade 1, the little pet
Idea: Clap once for each part of a word.

Remember:
  - Do you remember this? Clap the parts of the word.
Explore:
  - Clap once for each part of the word.
Name it:
  - {word} has {n} claps.
  - Clap once for each part of a word.
Together:
  - Clap with me for {word}.
  - Clap once for each part of {word}.
  - Clap once for each part of {word}.
Check me:
  - My turn. Check me!
  - I clap {ans}. Am I right?
Show:
  - The candy shop needs signs. Clap each one!
Reasons the pet gives when it is caught:
  clap: Oops. I clapped one too many. Let me try again.
Tonight's question: Ask {name}: "Clap the parts of the word elephant."
About 3.2 minutes.
```

</details>
