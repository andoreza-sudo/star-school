# Draft: Whole × Fraction (fop2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Whole × Fraction (fop2), grade 4, the kid pet
Idea: A whole number times a fraction is that many copies of the fraction.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade some parts on each bar. Any way you like!
Name it:
  - You shaded {a} out of {x} on the first bar.
  - You shaded {b} out of {x} on the next bar.
  - A whole times a fraction is that many copies of the fraction: multiply the top.
Together:
  - Here are {a} copies of a bar shaded {b} out of {x}.
  - Count all the shaded parts. What fraction is that?
  - Now try it with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs sand in {a} sections. Shade each part. What fraction is shaded?
  - The wall has {a} windows. Shade {b} out of {x} in each. What fraction shows sky?
Reasons the pet gives when it is caught:
  mulBot: The bottom stays the same. Only multiply the top.
  slip: Look closer at the shaded parts. One is off.
Tonight's question: Ask {name}: "What is 3 times 2 fifths?"
About 3.6 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Tonight's question was not about a whole number times a fraction, and was too long.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop2",
 "t": "Whole × Fraction",
 "grade": 4,
 "age": "kid",
 "idea": "A whole number times a fraction is that many copies of the fraction.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade some parts on each bar. Any way you like!"
  ],
  "name": [
   "You shaded {a} out of {x} on the first bar.",
   "You shaded {b} out of {x} on the next bar.",
   "A whole times a fraction is that many copies of the fraction: multiply the top."
  ],
  "together": [
   "Here are {a} copies of a bar shaded {b} out of {x}.",
   "Count all the shaded parts. What fraction is that?",
   "Now try it with symbols only."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs sand in {a} sections. Shade each part. What fraction is shaded?",
   "The wall has {a} windows. Shade {b} out of {x} in each. What fraction shows sky?"
  ]
 },
 "reasons": {
  "mulBot": [
   "The bottom stays the same. Only multiply the top."
  ],
  "slip": [
   "Look closer at the shaded parts. One is off."
  ]
 },
 "home": "Ask {name}: \"What is 3 times 2 fifths?\""
}
```

<details><summary>The API's first draft</summary>

```text
Whole × Fraction (fop2), grade 4, the kid pet
Idea: A whole number times a fraction is that many copies of the fraction.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade some parts on each bar. Any way you like!
Name it:
  - You shaded {a} out of {x} on the first bar.
  - You shaded {b} out of {x} on the next bar.
  - A whole times a fraction is that many copies of the fraction: multiply the top.
Together:
  - Here are {a} copies of a bar shaded {b} out of {x}.
  - Count all the shaded parts. What fraction is that?
  - Now try it with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs sand in {a} sections. Shade each part. What fraction is shaded?
  - The wall has {a} windows. Shade {b} out of {x} in each. What fraction shows sky?
Reasons the pet gives when it is caught:
  mulBot: The bottom stays the same. Only multiply the top.
  slip: Look closer at the shaded parts. One is off.
Tonight's question: Ask {name}: "You eat three quarters of a pie. What fraction of a whole pie did you eat?"
About 3.6 minutes.
```
</details>
