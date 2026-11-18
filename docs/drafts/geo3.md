# Draft: Find the Missing Side (geo3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Find the Missing Side (geo3), grade 4, the kid pet
Idea: Half the perimeter is one long side and one short side.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any rectangle you like with the dots.
Name it:
  - Your rectangle has sides {a} and {b}.
  - The distance around is {sum}.
  - Half the perimeter is one long side and one short side.
Together:
  - Here is a side and the distance around.
  - Here is the same as a sum with a box.
  - Now the same told in words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs a fence on every side. How long is the missing side?
Reasons the pet gives when it is caught:
  sideP: I took one side from the whole perimeter. Halve it first.
  half: I halved the wrong number. Half the perimeter is one long and one short side.
Tonight's question: Ask {name}: "Perimeter 24, one side 5. What is the other side?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The two Show lines split one sentence; the reasons did not say the pet's mistake; tonight's question was too long.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "geo3",
 "t": "Find the Missing Side",
 "grade": 4,
 "age": "kid",
 "idea": "Half the perimeter is one long side and one short side.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Make any rectangle you like with the dots."
  ],
  "name": [
   "Your rectangle has sides {a} and {b}.",
   "The distance around is {sum}.",
   "Half the perimeter is one long side and one short side."
  ],
  "together": [
   "Here is a side and the distance around.",
   "Here is the same as a sum with a box.",
   "Now the same told in words only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The trail needs a fence on every side. How long is the missing side?"
  ]
 },
 "reasons": {
  "sideP": [
   "I took one side from the whole perimeter. Halve it first."
  ],
  "half": [
   "I halved the wrong number. Half the perimeter is one long and one short side."
  ]
 },
 "home": "Ask {name}: \"Perimeter 24, one side 5. What is the other side?\""
}
```

<details><summary>The API's first draft</summary>

```text
Find the Missing Side (geo3), grade 4, the kid pet
Idea: Half the perimeter is one long side and one short side.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any rectangle you like with the dots.
Name it:
  - Your rectangle has sides {a} and {b}.
  - The distance around is {sum}.
  - Half the perimeter is one long side and one short side.
Together:
  - Here is a side and the distance around.
  - Here is the same as a sum with a box.
  - Now the same told in words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs a fence on every side.
  - One side is {a} and the distance around is {n}.
Reasons the pet gives when it is caught:
  sideP: That takes one side from the whole distance around. | Add the missing side too.
  half: That is half of one side only. | Half the distance around needs one long and one short.
Tonight's question: Ask {name}: "A rectangle has perimeter 24 and one side 5. What is the other side?"
About 3.4 minutes.
```
</details>
