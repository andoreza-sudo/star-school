# Draft: All the Facts (add3)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
All the Facts (add3), grade 1, the little pet
Idea: Make a ten to add bigger facts.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill this double frame. Use both colors. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Make a ten to add bigger facts.
Together:
  - Put in {a}, then {b} more. Fill a ten first.
  - Look at the frame. How many in all?
  - Add {a} and {b}. Make a ten in your head.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef shop counts shells. How many in all?
Reasons the pet gives when it is caught:
  off1: I was one off. Count each one once.
  op: I took away. This one adds!
Tonight's question: Ask {name}: "What is 8 plus 7? Can you make a ten first?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The Show line no longer tells a different story from the problem; Together lines teach making a ten.
- The first draft from the API is kept below as it came, for comparison.
- RC-1 (v188, 2026-11-19): spelling only, after the owner's review: "colours" -> "colors" (US spelling). Status kept.

## Words (the draft itself)

```json
{
 "id": "add3",
 "t": "All the Facts",
 "grade": 1,
 "age": "little",
 "idea": "Make a ten to add bigger facts.",
 "beats": {
  "remember": [
   "Do you remember this? Let's make ten."
  ],
  "explore": [
   "Fill this double frame. Use both colors. Any way you like!"
  ],
  "name": [
   "You made {a} and {b}.",
   "{a} and {b} make {sum}.",
   "Make a ten to add bigger facts."
  ],
  "together": [
   "Put in {a}, then {b} more. Fill a ten first.",
   "Look at the frame. How many in all?",
   "Add {a} and {b}. Make a ten in your head."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The reef shop counts shells. How many in all?"
  ]
 },
 "reasons": {
  "off1": [
   "I was one off. Count each one once."
  ],
  "op": [
   "I took away. This one adds!"
  ]
 },
 "home": "Ask {name}: \"What is 8 plus 7? Can you make a ten first?\""
}
```

<details><summary>The API's first draft</summary>

```text
All the Facts (add3), grade 1, the little pet
Idea: Parts can make a whole.

Remember:
  - Do you remember this? Fill the frame to make ten with {n}.
Explore:
  - Fill this double frame. Use both colours any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Parts can make a whole.
Together:
  - Put {a} and {b} on the frame.
  - How many do you see?
  - {a} and {b} make how many?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef needs {a} more fish. {b} are here. How many now?
Reasons the pet gives when it is caught:
  off1: Count again. One is left over. | One space is still empty.
  op: We add to join parts. Try again with both.
Tonight's question: Ask {name}: "What is four and five?"
About 3.3 minutes.
```

</details>
