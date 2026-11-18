# Draft: Time to the Minute (time5)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Time to the Minute (time5), grade 3, the kid pet
Idea: Count the long hand by fives to the last number then on by ones.

Remember:
  - Do you remember this? Set the clock to {time}.
Explore:
  - Move the hands. Set any time you like. Any way works.
Name it:
  - You set {time}.
  - The hour is {hour}.
  - Count the long hand by fives to the last number then on by ones.
Together:
  - Set the clock to show {time}.
  - Look at this clock. Pick its time.
  - Look where the long hand points. Work out the minute.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The forest clock shows when the animals eat. What minute is it?
Reasons the pet gives when it is caught:
  minute: Look closer at the long hand. It shows minutes. | Count by fives then ones from the long hand.
  given: That number is already on the clock. Count the minutes.
Tonight's question: Ask {name}: "Can you tell me what time the kitchen clock shows right now?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- A tone line the app says itself was in Remember; the Show line said "set the clock", but Show asks for the minute.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "time5",
 "t": "Time to the Minute",
 "grade": 3,
 "age": "kid",
 "idea": "Count the long hand by fives to the last number then on by ones.",
 "beats": {
  "remember": [
   "Do you remember this? Set the clock to {time}."
  ],
  "explore": [
   "Move the hands. Set any time you like. Any way works."
  ],
  "name": [
   "You set {time}.",
   "The hour is {hour}.",
   "Count the long hand by fives to the last number then on by ones."
  ],
  "together": [
   "Set the clock to show {time}.",
   "Look at this clock. Pick its time.",
   "Look where the long hand points. Work out the minute."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The forest clock shows when the animals eat. What minute is it?"
  ]
 },
 "reasons": {
  "minute": [
   "Look closer at the long hand. It shows minutes.",
   "Count by fives then ones from the long hand."
  ],
  "given": [
   "That number is already on the clock. Count the minutes."
  ]
 },
 "home": "Ask {name}: \"Can you tell me what time the kitchen clock shows right now?\""
}
```

<details><summary>The API's first draft</summary>

```text
Time to the Minute (time5), grade 3, the kid pet
Idea: Count the long hand by fives to the last number then on by ones.

Remember:
  - Hey {name}. New idea today.
  - Do you remember this? Set the clock to {time}.
Explore:
  - Move the hands. Set any time you like. Any way works.
Name it:
  - You set {time}.
  - The hour is {hour}.
  - Count the long hand by fives to the last number then on by ones.
Together:
  - Set the clock to show {time}.
  - Look at this clock. Pick its time.
  - Look where the long hand points. Work out the minute.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The forest clock shows when the animals eat. Set the right time.
Reasons the pet gives when it is caught:
  minute: Look closer at the long hand. It shows minutes. | Count by fives then ones from the long hand.
  given: That number is already on the clock. Count the minutes.
Tonight's question: Ask {name}: "Can you tell me what time the kitchen clock shows right now?"
About 3.4 minutes.
```
</details>
