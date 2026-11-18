# Draft: Equal Fractions (frac5)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Equal Fractions (frac5), grade 3, the kid pet
Idea: Multiply the top and bottom by the same number and the fraction stays the same.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade the same amount on both bars. Any way you like!
Name it:
  - You shaded the same amount.
  - It is {a} of {x} on top and {b} of {y} below.
  - Multiply the top and bottom by the same number and the fraction stays the same.
Together:
  - Shade the bottom bar to match {top} of {bottom} on the top bar.
  - Type the missing number so both bars match.
  - Type the missing number so both match in symbols.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs equal fractions. Type the missing top number.
Reasons the pet gives when it is caught:
  addEq: Look closer. I added the same number to the top and bottom.
  given: I said a number that was already shown. Look again.
Tonight's question: Ask {name}: "Can four eighths be the same as one half?"
About 3.5 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line asked "Is this pair the same?", but Show asks for the missing number.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "frac5",
 "t": "Equal Fractions",
 "grade": 3,
 "age": "kid",
 "idea": "Multiply the top and bottom by the same number and the fraction stays the same.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Shade the same amount on both bars. Any way you like!"
  ],
  "name": [
   "You shaded the same amount.",
   "It is {a} of {x} on top and {b} of {y} below.",
   "Multiply the top and bottom by the same number and the fraction stays the same."
  ],
  "together": [
   "Shade the bottom bar to match {top} of {bottom} on the top bar.",
   "Type the missing number so both bars match.",
   "Type the missing number so both match in symbols."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The path needs equal fractions. Type the missing top number."
  ]
 },
 "reasons": {
  "addEq": [
   "Look closer. I added the same number to the top and bottom."
  ],
  "given": [
   "I said a number that was already shown. Look again."
  ]
 },
 "home": "Ask {name}: \"Can four eighths be the same as one half?\""
}
```

<details><summary>The API's first draft</summary>

```text
Equal Fractions (frac5), grade 3, the kid pet
Idea: Multiply the top and bottom by the same number and the fraction stays the same.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade the same amount on both bars. Any way you like!
Name it:
  - You shaded the same amount.
  - It is {a} of {x} on top and {b} of {y} below.
  - Multiply the top and bottom by the same number and the fraction stays the same.
Together:
  - Shade the bottom bar to match {top} of {bottom} on the top bar.
  - Type the missing number so both bars match.
  - Type the missing number so both match in symbols.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs equal signs. Is this pair the same?
Reasons the pet gives when it is caught:
  addEq: Look closer. I added the same number to the top and bottom.
  given: I said a number that was already shown. Look again.
Tonight's question: Ask {name}: "Can four eighths be the same as one half?"
About 3.5 minutes.
```
</details>
