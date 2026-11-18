# Draft: Order of Operations (ooo1)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Order of Operations (ooo1), grade 5, the teen pet
Idea: Times and divide come before plus and minus.

Remember:
  - Do you remember this fact? What is {a} times {b}?
Explore:
  - Pick the numbers. Build a problem like this. Any way you like.
Name it:
  - You built {a} plus {b} times {k}.
  - The answer is {sum}.
  - Times comes before plus.
Together:
  - First work out the times part.
  - Now the full problem with the times marked.
  - Now the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs some readings. Solve this one.
  - One more for the notes. Solve this one.
Reasons the pet gives when it is caught:
  order: Order matters. Times first then plus. | Look again. Times before plus.
  slip: That step is off. Look once more.
Tonight's question: Ask {name}: What is four plus five times two?
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## Words (the draft itself)

```json
{
 "id": "ooo1",
 "t": "Order of Operations",
 "grade": 5,
 "age": "teen",
 "idea": "Times and divide come before plus and minus.",
 "beats": {
  "remember": [
   "Do you remember this fact? What is {a} times {b}?"
  ],
  "explore": [
   "Pick the numbers. Build a problem like this. Any way you like."
  ],
  "name": [
   "You built {a} plus {b} times {k}.",
   "The answer is {sum}.",
   "Times comes before plus."
  ],
  "together": [
   "First work out the times part.",
   "Now the full problem with the times marked.",
   "Now the problem in symbols only."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The lab needs some readings. Solve this one.",
   "One more for the notes. Solve this one."
  ]
 },
 "reasons": {
  "order": [
   "Order matters. Times first then plus.",
   "Look again. Times before plus."
  ],
  "slip": [
   "That step is off. Look once more."
  ]
 },
 "home": "Ask {name}: What is four plus five times two?"
}
```
