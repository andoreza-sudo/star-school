# Draft: Name the Fraction (frac2)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Name the Fraction (frac2), grade 3, the kid pet
Idea: The bottom number counts the equal parts. The top counts the parts we mean.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade any parts you like on the bar. Any way works.
Name it:
  - The bottom counts the equal parts. The top counts the parts we mean.
  - You shaded {top} of {bottom} parts.
Together:
  - Shade {top} of the {bottom} parts on this bar.
  - What fraction does this bar show?
  - Now write the fraction these words tell.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail needs signs at the right spots. Name each fraction you see.
Reasons the pet gives when it is caught:
  unshaded: Look closer. Those parts are not shaded. | Count only the shaded parts for the top.
  fpart: The bottom counts all the equal parts. | The top goes over all the parts in the bar.
Tonight's question: Ask {name}: "Can you find something that shows one half?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 1 said "Shade the top of the bottom parts"; line 3 asked for words where the child types a fraction.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "frac2",
 "t": "Name the Fraction",
 "grade": 3,
 "age": "kid",
 "idea": "The bottom number counts the equal parts. The top counts the parts we mean.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Shade any parts you like on the bar. Any way works."
  ],
  "name": [
   "The bottom counts the equal parts. The top counts the parts we mean.",
   "You shaded {top} of {bottom} parts."
  ],
  "together": [
   "Shade {top} of the {bottom} parts on this bar.",
   "What fraction does this bar show?",
   "Now write the fraction these words tell."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The trail needs signs at the right spots. Name each fraction you see."
  ]
 },
 "reasons": {
  "unshaded": [
   "Look closer. Those parts are not shaded.",
   "Count only the shaded parts for the top."
  ],
  "fpart": [
   "The bottom counts all the equal parts.",
   "The top goes over all the parts in the bar."
  ]
 },
 "home": "Ask {name}: \"Can you find something that shows one half?\""
}
```

<details><summary>The API's first draft</summary>

```text
Name the Fraction (frac2), grade 3, the kid pet
Idea: The bottom number counts the equal parts. The top counts the parts we mean.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade any parts you like on the bar. Any way works.
Name it:
  - The bottom counts the equal parts. The top counts the parts we mean.
  - You shaded {top} of {bottom} parts.
Together:
  - Shade the top of the bottom parts on this bar.
  - What fraction does this bar show?
  - Tell me the same fraction in words.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail needs signs at the right spots. Name each fraction you see.
Reasons the pet gives when it is caught:
  unshaded: Look closer. Those parts are not shaded. | Count only the shaded parts for the top.
  fpart: The bottom counts all the equal parts. | The top goes over all the parts in the bar.
Tonight's question: Ask {name}: "Can you find something that shows one half?"
About 3.3 minutes.
```
</details>
