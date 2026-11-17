# Draft: Clocks to 5 Minutes (time4)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Clocks to 5 Minutes (time4), grade 2, the little pet
Idea: The long hand shows the minutes past the hour.

Remember:
  - Do you remember this? Set an o'clock time.
Explore:
  - Move the hands. Set any time you like.
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - The long hand shows the minutes past the hour.
Together:
  - Set the clock to {time}. Long hand for minutes.
  - Look at the long hand. Count the minutes.
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship sails soon. Set the clock!
  - Another ship sails soon. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The long hand shows the minutes.
Tonight's question: Ask {name}: "Can you show me 4:25 on our clock?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Tonight's question was about half past (another stop); the Show lines do not repeat the time.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "time4",
 "t": "Clocks to 5 Minutes",
 "grade": 2,
 "age": "little",
 "idea": "The long hand shows the minutes past the hour.",
 "beats": {
  "remember": [
   "Do you remember this? Set an o'clock time."
  ],
  "explore": [
   "Move the hands. Set any time you like."
  ],
  "name": [
   "You set {time}.",
   "The short hand shows the hour.",
   "The long hand shows the minutes past the hour."
  ],
  "together": [
   "Set the clock to {time}. Long hand for minutes.",
   "Look at the long hand. Count the minutes.",
   "Think of the clock at {time}."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The ship sails soon. Set the clock!",
   "Another ship sails soon. Set the clock!"
  ]
 },
 "reasons": {
  "hands": [
   "I mixed up the hands. The long hand shows the minutes."
  ]
 },
 "home": "Ask {name}: \"Can you show me 4:25 on our clock?\""
}
```

<details><summary>The API's first draft</summary>

```text
Clocks to 5 Minutes (time4), grade 2, the little pet
Idea: The long hand shows minutes past the hour.

Remember:
  - Do you remember this? Set the clock to {time}.
Explore:
  - Move the hands. Set any time you like.
Name it:
  - You set {time}.
  - The short hand shows the {hour}.
  - The long hand shows minutes past the hour.
Together:
  - Set the clock to show {time}.
  - Which time does this clock show?
  - At {time} which number does the long hand point to?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs the right time to sail. Set {time}.
  - One more ship needs the right time. Set {time}.
Reasons the pet gives when it is caught:
  hands: The long hand shows minutes. The short hand shows the hour.
Tonight's question: Ask {name}: "Can you show me half past 4 on our clock?"
About 3.3 minutes.
```

</details>
