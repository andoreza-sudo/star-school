# Ask the pet: How much game time do I have? (time)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: How much game time do I have?

Answers of the little pet (Pre-K to 2nd grade):
- when the child has {time} of game time to spend now (here: {time} = 4 and a half minutes):
    "You have 4 and a half minutes of game time! Tap Games to play."
- when the child has no game time saved yet:
    "No game time yet. Let's learn and earn some!"
- when a grown-up set a rule: learn {more} more today before the Game Room opens (here: {more} = 6 minutes):
    "Let's learn for 6 minutes more first. Then the games open!"
- when today's game time is used up (the daily limit is {max}); more tomorrow (here: {max} = 30 minutes):
    "You played all 30 minutes for today! More game time tomorrow."
- when a grown-up has paused game time:
    "A grown-up paused game time. Let's learn together for now!"

Answers of the older kid pet (3rd and 4th grade):
- when the child has {time} of game time to spend now (here: {time} = 4 and a half minutes):
    "You've got 4 and a half minutes of game time. Spend it now or save it for later."
- when the child has no game time saved yet:
    "Your game time bank is empty right now. Finish a learning round and it fills up."
- when a grown-up set a rule: learn {more} more today before the Game Room opens (here: {more} = 6 minutes):
    "Learn for 6 minutes more first. Then the Game Room opens."
- when today's game time is used up (the daily limit is {max}); more tomorrow (here: {max} = 30 minutes):
    "You've used today's 30 minutes of game time. It opens again tomorrow."
- when a grown-up has paused game time:
    "A grown-up has paused game time. They can turn it back on."

Answers of the teen-like pet (5th and 6th grade):
- when the child has {time} of game time to spend now (here: {time} = 4 and a half minutes):
    "You have 4 and a half minutes in the bank. Your call when to use it."
- when the child has no game time saved yet:
    "Nothing in the bank yet. A learning round or a lesson earns some."
- when a grown-up set a rule: learn {more} more today before the Game Room opens (here: {more} = 6 minutes):
    "The rule today: 6 minutes more of learning first. Then the Game Room opens."
- when today's game time is used up (the daily limit is {max}); more tomorrow (here: {max} = 30 minutes):
    "You've hit today's limit of 30 minutes. It resets tomorrow."
- when a grown-up has paused game time:
    "Game time is paused by a grown-up. Ask them if you want it back on."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "time",
 "q": "How much game time do I have?",
 "a": {
  "little": {
   "ok": [
    "You have {time} of game time!",
    "Tap Games to play."
   ],
   "empty": [
    "No game time yet.",
    "Let's learn and earn some!"
   ],
   "learn": [
    "Let's learn for {more} more first.",
    "Then the games open!"
   ],
   "max": [
    "You played all {max} for today!",
    "More game time tomorrow."
   ],
   "paused": [
    "A grown-up paused game time.",
    "Let's learn together for now!"
   ]
  },
  "kid": {
   "ok": [
    "You've got {time} of game time.",
    "Spend it now or save it for later."
   ],
   "empty": [
    "Your game time bank is empty right now.",
    "Finish a learning round and it fills up."
   ],
   "learn": [
    "Learn for {more} more first.",
    "Then the Game Room opens."
   ],
   "max": [
    "You've used today's {max} of game time.",
    "It opens again tomorrow."
   ],
   "paused": [
    "A grown-up has paused game time.",
    "They can turn it back on."
   ]
  },
  "teen": {
   "ok": [
    "You have {time} in the bank.",
    "Your call when to use it."
   ],
   "empty": [
    "Nothing in the bank yet.",
    "A learning round or a lesson earns some."
   ],
   "learn": [
    "The rule today: {more} more of learning first.",
    "Then the Game Room opens."
   ],
   "max": [
    "You've hit today's limit of {max}.",
    "It resets tomorrow."
   ],
   "paused": [
    "Game time is paused by a grown-up.",
    "Ask them if you want it back on."
   ]
  }
 },
 "api": {
  "q": "How much game time do I have?",
  "a": {
   "little": {
    "ok": [
     "We have {time} to play together {name}!",
     "Let's go have fun with our {time} {name}."
    ],
    "empty": [
     "We have no time saved yet {name}.",
     "Let's earn some time {name}."
    ],
    "learn": [
     "We need {more} of learning first {name}.",
     "Let's do {more} of learning then play."
    ],
    "max": [
     "We used all {max} for today {name}.",
     "More time comes tomorrow {name}."
    ],
    "paused": [
     "Our game time is paused right now.",
     "It will start again soon {name}."
    ]
   },
   "kid": {
    "ok": [
     "You have {time} ready to go {name}.",
     "We can jump in and use that {time}."
    ],
    "empty": [
     "You do not have any time saved yet.",
     "Time to earn some more {name}."
    ],
    "learn": [
     "You still need {more} of learning first.",
     "Get that {more} done then we play."
    ],
    "max": [
     "You have used up all {max} today.",
     "We will get more time tomorrow."
    ],
    "paused": [
     "Game time is paused by a grown-up.",
     "It should start again soon."
    ]
   },
   "teen": {
    "ok": [
     "You have {time} available right now {name}.",
     "Ready to use that {time} together."
    ],
    "empty": [
     "There is no game time saved yet.",
     "Time to build some up {name}."
    ],
    "learn": [
     "You need {more} of learning before the game room opens.",
     "Finish that {more} then we can play."
    ],
    "max": [
     "You have reached the {max} limit for today.",
     "We can continue tomorrow."
    ],
    "paused": [
     "Game time has been paused.",
     "It will resume when the pause ends."
    ]
   }
  }
 },
 "notes": "Rewrote every line. The API said each slot twice (\"We have {time} ... our {time}\"), said \"It will start again soon\" for a pause (only the grown-up decides), and lower-cased the Game Room. {time} is said in minutes (\"4 and a half minutes\", \"half a minute\"), not \"4:30\". \"Tap Games\" names the bar button."
}
```
