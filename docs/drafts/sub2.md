# Draft: Take Away to 18 (sub2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Take Away to 18 (sub2), grade 1, the little pet
Idea: Take away to ten first, then the rest.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Use both colors on the double frame. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Take away {b} and {a} are left.
Together:
  - Start with {a}. Take away {b}.
  - Look at the frame. How many are left?
  - {a} take away {b}. Go back to ten first.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon shop sells candy. How many are left?
Reasons the pet gives when it is caught:
  op: I added. We are taking away!
  off1: I was one off. Count what is left again.
Tonight's question: Ask {name}: "We had 12 candies and ate 5. How many are left?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Name it now ties the two colours to taking away; the Show line had the numbers the wrong way round.
- The first draft from the API is kept below as it came, for comparison.
- RC-1 (v188, 2026-11-19): spelling only, after the owner's review: "colours" -> "colors" (US spelling). Status kept.

## Words (the draft itself)

```json
{
 "id": "sub2",
 "t": "Take Away to 18",
 "grade": 1,
 "age": "little",
 "idea": "Take away to ten first, then the rest.",
 "beats": {
  "remember": [
   "Do you remember this? Let's make ten."
  ],
  "explore": [
   "Use both colors on the double frame. Any way you like!"
  ],
  "name": [
   "You made {a} and {b}.",
   "{a} and {b} make {sum}.",
   "Take away {b} and {a} are left."
  ],
  "together": [
   "Start with {a}. Take away {b}.",
   "Look at the frame. How many are left?",
   "{a} take away {b}. Go back to ten first."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The canyon shop sells candy. How many are left?"
  ]
 },
 "reasons": {
  "op": [
   "I added. We are taking away!"
  ],
  "off1": [
   "I was one off. Count what is left again."
  ]
 },
 "home": "Ask {name}: \"We had 12 candies and ate 5. How many are left?\""
}
```

<details><summary>The API's first draft</summary>

```text
Take Away to 18 (sub2), grade 1, the little pet
Idea: Take away to find how many are left.

Remember:
  - Do you remember this? Fill the frame to make ten from {n}.
Explore:
  - Use both colours on the double frame. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Take away to find how many are left.
Together:
  - Start with {a}. Take away {b}.
  - How many are left on the frame?
  - {a} take away {b} is how many?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs {a} candies. {b} fell off. How many are left?
Reasons the pet gives when it is caught:
  op: I added instead of taking away. Let's count back. | We take away. Count back from the start.
  off1: One too many or one too few. Let's count again. | Check each spot. Did we miss one or count twice?
Tonight's question: Ask {name}: "We had 12 candies and ate 5. How many are left?"
About 3.3 minutes.
```

</details>
