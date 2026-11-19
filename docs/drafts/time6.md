# Draft: How Much Time Passed (time6)

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
How Much Time Passed (time6), grade 3, the kid pet
Idea: Count the minutes up to the next hour, then on from it.

Remember:
  - Warm up. Set the clock to this time.
Explore:
  - The clock shows the start time. Move the hands to any later time.
Name it:
  - You set the clock to {time}.
  - That is {n} minutes after the start.
  - Count up to the next hour, then on from it.
Together:
  - Move the long hand forward. Watch the hour change.
  - Count from the start to the next hour, then on.
  - No clocks this time. Count up to the hour first.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The fox family timed their walk. How long was it?
  - One more time for the fox family.
Reasons the pet gives when it is caught:
  hr100: Oops. I counted an hour as a hundred minutes. That is too many.
  minOnly: Oops. I only took away the minutes. I forgot the hour.
Tonight's question: Ask {name}: "How long is it from 2:40 to 3:15?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore used {time}, which has no number there (the start is on the clock).
- Name it said "{n} minutes from {time}" (from the time to itself).
- The hr100 reason said "There are {n}" (a slot with no number).
- Tonight's question was too long.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "time6",
 "t": "How Much Time Passed",
 "grade": 3,
 "age": "kid",
 "idea": "Count the minutes up to the next hour, then on from it.",
 "beats": {
  "remember": [
   "Warm up. Set the clock to this time."
  ],
  "explore": [
   "The clock shows the start time. Move the hands to any later time."
  ],
  "name": [
   "You set the clock to {time}.",
   "That is {n} minutes after the start.",
   "Count up to the next hour, then on from it."
  ],
  "together": [
   "Move the long hand forward. Watch the hour change.",
   "Count from the start to the next hour, then on.",
   "No clocks this time. Count up to the hour first."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The fox family timed their walk. How long was it?",
   "One more time for the fox family."
  ]
 },
 "reasons": {
  "hr100": [
   "Oops. I counted an hour as a hundred minutes. That is too many."
  ],
  "minOnly": [
   "Oops. I only took away the minutes. I forgot the hour."
  ]
 },
 "home": "Ask {name}: \"How long is it from 2:40 to 3:15?\""
}
```

<details><summary>The API's first draft</summary>

```text
How Much Time Passed (time6), grade 3, the kid pet
Idea: Count the minutes up to the next hour then on from it.

Remember:
  - Do you remember this one? Set the clock to {time}.
Explore:
  - The clock shows {time}. Move the hands to any later time you like.
Name it:
  - You set the clock to {time}.
  - That is {n} minutes from {time}.
  - Count the minutes up to the next hour then on from it.
Together:
  - Let's move the hands a few minutes later.
  - Look at these clocks. How many minutes passed?
  - Look at these times. How many minutes passed?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The fox needs to know how much time passed. Tell me for each pair.
Reasons the pet gives when it is caught:
  hr100: An hour is not a hundred minutes. There are {n}.
  minOnly: We need both the hours and the minutes.
Tonight's question: Ask {name}: "If it is three now and we eat at half past five how much time will pass?"
About 3.4 minutes.
```

</details>
