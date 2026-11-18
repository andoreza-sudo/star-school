# Draft: Match Big & Little (abc3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Match Big & Little (abc3), grade -1, the little pet
Idea: Each big letter has a little partner.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's put little letters under their big partners.
Name it:
  - Look at {letter} and {other}.
  - They are partners!
Together:
  - Put each little letter with its big partner.
  - Find its little partner.
  - Find its big partner.
Check me:
  - My turn. Check me!
  - Its little partner is {ans}!
Show:
  - The beach needs signs. Find each little partner!
Reasons the pet gives when it is caught:
  look: Look again. They look alike but they are not partners.
Tonight's question: Ask {name}: "Can you find a big B and little b at home?"
About 3.1 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember fits the warm-up (find a letter); Together line 1 was the engine's own line.
- Show said "match", but the child taps one letter of four.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "abc3",
 "t": "Match Big & Little",
 "grade": -1,
 "age": "little",
 "idea": "Each big letter has a little partner.",
 "beats": {
  "remember": [
   "Do you remember this? Find the letter {letter}."
  ],
  "explore": [
   "Let's put little letters under their big partners."
  ],
  "name": [
   "Look at {letter} and {other}.",
   "They are partners!"
  ],
  "together": [
   "Put each little letter with its big partner.",
   "Find its little partner.",
   "Find its big partner."
  ],
  "check": [
   "My turn. Check me!",
   "Its little partner is {ans}!"
  ],
  "show": [
   "The beach needs signs. Find each little partner!"
  ]
 },
 "reasons": {
  "look": [
   "Look again. They look alike but they are not partners."
  ]
 },
 "home": "Ask {name}: \"Can you find a big B and little b at home?\""
}
```

<details><summary>The API's first draft</summary>

```text
Match Big & Little (abc3), grade -1, the little pet
Idea: Each big letter has a little partner.

Remember:
  - Do you remember this? Look at these.
Explore:
  - Let's put little letters under their big partners.
Name it:
  - Look at {letter} and {other}.
  - They are partners!
Together:
  - Now let's do some together.
  - Find its little partner.
  - Find its big partner.
Check me:
  - My turn. Check me!
  - Its little partner is {ans}!
Show:
  - The sand needs signs. Match each big letter.
Reasons the pet gives when it is caught:
  look: Look again. They look alike but they are not partners.
Tonight's question: Ask {name}: "Can you find a big B and little b at home?"
About 3.1 minutes.
```

</details>
