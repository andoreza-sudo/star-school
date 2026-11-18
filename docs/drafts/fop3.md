# Draft: Unlike Denominators (fop3)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Unlike Denominators (fop3), grade 5, the teen pet
Idea: Make the bottoms the same first then add the tops.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade the same amount on both bars. Any way you like.
Name it:
  - You shaded {a} and {b} out of {x}.
  - {sum} out of {x} in all.
  - Make the bottoms the same first then add the tops.
Together:
  - Rename the first fraction to match the bottom bar.
  - Both bars are cut the same now. Type the total.
  - Add these in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The caves need light of each kind. How much in all?
Reasons the pet gives when it is caught:
  addBot: I added the bottoms too. Rename to match first.
  renameTop: I changed the bottom but not the top. Keep the value the same.
  slip: That one was off by one. Look again.
Tonight's question: Ask {name}: "What is one half plus one fourth?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line used {x} as the bottom of both fractions; Together line 2 asked to shade where the child types.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fop3",
 "t": "Unlike Denominators",
 "grade": 5,
 "age": "teen",
 "idea": "Make the bottoms the same first then add the tops.",
 "beats": {
  "remember": [
   "Do you remember this? Name the shaded part."
  ],
  "explore": [
   "Shade the same amount on both bars. Any way you like."
  ],
  "name": [
   "You shaded {a} and {b} out of {x}.",
   "{sum} out of {x} in all.",
   "Make the bottoms the same first then add the tops."
  ],
  "together": [
   "Rename the first fraction to match the bottom bar.",
   "Both bars are cut the same now. Type the total.",
   "Add these in symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The caves need light of each kind. How much in all?"
  ]
 },
 "reasons": {
  "addBot": [
   "I added the bottoms too. Rename to match first."
  ],
  "renameTop": [
   "I changed the bottom but not the top. Keep the value the same."
  ],
  "slip": [
   "That one was off by one. Look again."
  ]
 },
 "home": "Ask {name}: \"What is one half plus one fourth?\""
}
```

<details><summary>The API's first draft</summary>

```text
Unlike Denominators (fop3), grade 5, the teen pet
Idea: Make the bottoms the same first then add the tops.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade the same amount on both bars. Any way you like.
Name it:
  - You shaded {a} and {b} out of {x}.
  - {sum} out of {x} in all.
  - Make the bottoms the same first then add the tops.
Together:
  - Rename the first bar to match the second.
  - Shade and name the total.
  - Add these in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The first cave needs {a} of {x} more light. The second needs {b} of {x}. How much in all?
Reasons the pet gives when it is caught:
  addBot: I added the bottoms too. Rename to match first.
  renameTop: I changed the bottom but not the top. Keep the value the same.
  slip: That one was off by one. Look again.
Tonight's question: Ask {name}: "What is one half plus one fourth?"
About 3.4 minutes.
```
</details>
