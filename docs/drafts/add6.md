# Draft: Mental Math (add6)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Mental Math (add6), grade 1, the little pet
Idea: Ten more or ten less changes the tens digit.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in a rod, or take one away. Any way you like!
Name it:
  - You had {a}. Now you have {sum}.
  - Ten more or ten less changes the tens digit.
Together:
  - Start with {a}. Change it by {b}.
  - Look at the blocks. Which digit changes?
  - Do it in your head. Watch the tens.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The clock tower needs flags. Work them out in your head.
Reasons the pet gives when it is caught:
  ten: I counted the rod as one. A rod is ten!
  op: I did the wrong one. Look at the sign.
Tonight's question: Ask {name}: "What is 45 plus 10? And 45 minus 10?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- "They had" became "You had"; Together and Show lines no longer assume every item adds ten; reasons fit both adding and taking away.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "add6",
 "t": "Mental Math",
 "grade": 1,
 "age": "little",
 "idea": "Ten more or ten less changes the tens digit.",
 "beats": {
  "remember": [
   "Do you remember this? Rods are tens, cubes are ones."
  ],
  "explore": [
   "Put in a rod, or take one away. Any way you like!"
  ],
  "name": [
   "You had {a}. Now you have {sum}.",
   "Ten more or ten less changes the tens digit."
  ],
  "together": [
   "Start with {a}. Change it by {b}.",
   "Look at the blocks. Which digit changes?",
   "Do it in your head. Watch the tens."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The clock tower needs flags. Work them out in your head."
  ]
 },
 "reasons": {
  "ten": [
   "I counted the rod as one. A rod is ten!"
  ],
  "op": [
   "I did the wrong one. Look at the sign."
  ]
 },
 "home": "Ask {name}: \"What is 45 plus 10? And 45 minus 10?\""
}
```

<details><summary>The API's first draft</summary>

```text
Mental Math (add6), grade 1, the little pet
Idea: Adding or taking ten changes only the tens digit.

Remember:
  - Do you remember this? Make {n} with rods and cubes.
Explore:
  - Add or take one rod. Any way you like!
Name it:
  - They had {a}. The rod changed it to {sum}.
  - Adding a ten changes only the tens digit.
  - Taking a ten changes only the tens digit.
Together:
  - Change these blocks by adding a ten or taking a ten.
  - Look at the blocks. What is the new number?
  - Add or take ten in your head.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The clock tower door needs help. Fix {a} by adding ten.
  - Now fix {a} by taking ten from it.
Reasons the pet gives when it is caught:
  ten: The tens digit did not change. Look again!
  op: That would be taking away. We are adding a ten.
Tonight's question: Ask {name}: "What is 45 plus 10?"
About 3.4 minutes.
```

</details>
