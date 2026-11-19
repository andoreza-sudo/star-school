# Ask the pet: How do I get more game time? (earn)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: How do I get more game time?

Answers of the little pet (Pre-K to 2nd grade):
- when how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too (here: {min} = 5 minutes):
    "Pass a new lesson with me to earn 5 minutes! Finishing rounds earns time too."
- when how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing):
    "Finish learning rounds to earn game time! Perfect rounds earn a bit more."

Answers of the older kid pet (3rd and 4th grade):
- when how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too (here: {min} = 5 minutes):
    "Pass a new lesson with me and you earn 5 minutes. Rounds, new stops and bosses earn time too."
- when how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing):
    "Finish learning rounds to fill your bank. New stops, perfect scores and bosses add extra."

Answers of the teen-like pet (5th and 6th grade):
- when how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too (here: {min} = 5 minutes):
    "A new lesson passed with me pays 5 minutes. Rounds, new stops, bosses and Brain Teasers add more."
- when how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing):
    "Learning rounds fill the bank. New stops, perfect scores, bosses and Brain Teasers pay extra."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "earn",
 "q": "How do I get more game time?",
 "a": {
  "little": {
   "lesson": [
    "Pass a new lesson with me to earn {min}!",
    "Finishing rounds earns time too."
   ],
   "round": [
    "Finish learning rounds to earn game time!",
    "Perfect rounds earn a bit more."
   ]
  },
  "kid": {
   "lesson": [
    "Pass a new lesson with me and you earn {min}.",
    "Rounds, new stops and bosses earn time too."
   ],
   "round": [
    "Finish learning rounds to fill your bank.",
    "New stops, perfect scores and bosses add extra."
   ]
  },
  "teen": {
   "lesson": [
    "A new lesson passed with me pays {min}.",
    "Rounds, new stops, bosses and Brain Teasers add more."
   ],
   "round": [
    "Learning rounds fill the bank.",
    "New stops, perfect scores, bosses and Brain Teasers pay extra."
   ]
  }
 },
 "api": {
  "q": "How do I get more game time?",
  "a": {
   "little": {
    "lesson": [
     "We pass a lesson and earn {min} together {name}!",
     "Let's finish our rounds to get more time too."
    ],
    "round": [
     "We finish learning rounds and earn more time {name}.",
     "Let's keep going so we can play longer."
    ],
    "paused": [
     "A grown-up paused our time for now.",
     "We can play again when it starts."
    ]
   },
   "kid": {
    "lesson": [
     "Passing a lesson gives us {min} of game time {name}.",
     "Finishing rounds earns us extra time too."
    ],
    "round": [
     "We earn more game time by finishing our rounds.",
     "Let's complete a few and get back to playing."
    ],
    "paused": [
     "A grown-up has paused our game time right now.",
     "It will start again when they turn it back on."
    ]
   },
   "teen": {
    "lesson": [
     "Passing a lesson earns us {min} of game time {name}.",
     "We also get time when we finish learning rounds."
    ],
    "round": [
     "Finishing our learning rounds is how we earn more time.",
     "Let's get through them and unlock some play time."
    ],
    "paused": [
     "A grown-up paused the game time for now.",
     "We will earn more once it starts again."
    ]
   }
  }
 },
 "notes": "The API's \"paused\" answer (\"We will earn more once it starts again\") was not true: rounds still add to the bank while a grown-up pauses spending (ptEarn), so that situation is gone and the question answers the same way then. \"Pass a lesson\" is now \"a new lesson\" (only the first pass pays the full time, lsPrice). The extras named are the Game time card's own list (ptEarnList)."
}
```
