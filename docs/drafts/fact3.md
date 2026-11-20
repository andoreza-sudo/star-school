# Draft: GCF and LCM (fact3)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
GCF and LCM (fact3), grade 6, the teen pet
Idea: The GCF is the biggest number that divides both; the LCM is the first number both count to.

Remember:
  - A times fact from before.
Explore:
  - Try any group size. Watch for anything left over.
Name it:
  - Groups of {k}, for {a} and {b}.
  - The biggest size that splits both is the greatest common factor.
  - The first number both count to is the least common multiple.
Together:
  - Factor: the biggest group size. Multiple: hop until they meet.
  - Look for the number on both lists.
  - Factors divide in; multiples come from counting up.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The space crews need matching packs. Work these out.
Reasons the pet gives when it is caught:
  gcfLcm: I mixed them up. A factor goes in; a multiple is made from it.
  mulAll: I just multiplied them. They meet sooner than that.
Tonight's question: Ask {name}: "GCF of 18 and 24? LCM of 4 and 6?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "Here are {a} bars": a slot Explore does not have.
- Name it called any size the child tried "the greatest common factor".
- Both reasons were the engine's lines ("Look again. That one was wrong.", "Fair. I got that wrong.").
- Show said it needs both a GCF and an LCM; each Show item asks one.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fact3",
 "t": "GCF and LCM",
 "grade": 6,
 "age": "teen",
 "idea": "The GCF is the biggest number that divides both; the LCM is the first number both count to.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Try any group size. Watch for anything left over."
  ],
  "name": [
   "Groups of {k}, for {a} and {b}.",
   "The biggest size that splits both is the greatest common factor.",
   "The first number both count to is the least common multiple."
  ],
  "together": [
   "Factor: the biggest group size. Multiple: hop until they meet.",
   "Look for the number on both lists.",
   "Factors divide in; multiples come from counting up."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The space crews need matching packs. Work these out."
  ]
 },
 "reasons": {
  "gcfLcm": [
   "I mixed them up. A factor goes in; a multiple is made from it."
  ],
  "mulAll": [
   "I just multiplied them. They meet sooner than that."
  ]
 },
 "home": "Ask {name}: \"GCF of 18 and 24? LCM of 4 and 6?\""
}
```

<details><summary>The API's first draft</summary>

```text
GCF and LCM (fact3), grade 6, the teen pet
Idea: The greatest common factor splits both numbers evenly. The least common multiple is the first both count by to.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Here are {a} bars. Try different group sizes. Which ones split both evenly with nothing left over?
Name it:
  - You picked {k} for {a} and {b}.
  - That is the greatest common factor.
  - The least common multiple is the first both count by to.
Together:
  - Let's find the biggest group size that works for both.
  - List the factors or multiples and pick the right one.
  - Now write the greatest common factor or least common multiple with symbols.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Space station needs matching packs for crews. Find the greatest common factor and least common multiple to fit both.
Reasons the pet gives when it is caught:
  gcfLcm: Look again. That one was wrong. | Fair. I got that wrong.
  mulAll: Look again. That one was wrong. | Fair. I got that wrong.
Tonight's question: Ask {name}: What is the greatest common factor of twelve and eighteen?
About 3.5 minutes.
```

</details>
