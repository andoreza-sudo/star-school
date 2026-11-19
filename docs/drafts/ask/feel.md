# Ask the pet: How are you feeling? (feel)

status: unreviewed
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: How are you feeling?

Answers of the little pet (Pre-K to 2nd grade):
- when the pet is hungry (Pet Care: feed it):
    "My tummy is rumbling! Can we visit Pet Care for a snack?"
- when the pet needs a bath (Pet Care: wash it):
    "I feel a bit muddy! Can we visit Pet Care for a bath?"
- when the pet wants to play (Pet Care: play with it):
    "I want to play! Can we visit Pet Care and play?"
- when the pet is happy and cared for:
    "I feel happy, Mia! I like learning with you."

Answers of the older kid pet (3rd and 4th grade):
- when the pet is hungry (Pet Care: feed it):
    "Honestly? Hungry. A snack in Pet Care would be great."
- when the pet needs a bath (Pet Care: wash it):
    "A little messy, to be honest. A bath in Pet Care would help."
- when the pet wants to play (Pet Care: play with it):
    "A bit bored. Want to play with me in Pet Care?"
- when the pet is happy and cared for:
    "Pretty great, Mia. Learning with you is fun."

Answers of the teen-like pet (5th and 6th grade):
- when the pet is hungry (Pet Care: feed it):
    "Hungry, honestly. Pet Care has food, if you have a minute."
- when the pet needs a bath (Pet Care: wash it):
    "Could use a bath. Pet Care, when you get a chance."
- when the pet wants to play (Pet Care: play with it):
    "A bit restless. A quick game in Pet Care would help."
- when the pet is happy and cared for:
    "Good. Things are going well. Thanks for asking, Mia."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "feel",
 "q": "How are you feeling?",
 "a": {
  "little": {
   "hungry": [
    "My tummy is rumbling!",
    "Can we visit Pet Care for a snack?"
   ],
   "messy": [
    "I feel a bit muddy!",
    "Can we visit Pet Care for a bath?"
   ],
   "bored": [
    "I want to play!",
    "Can we visit Pet Care and play?"
   ],
   "happy": [
    "I feel happy, {name}!",
    "I like learning with you."
   ]
  },
  "kid": {
   "hungry": [
    "Honestly? Hungry.",
    "A snack in Pet Care would be great."
   ],
   "messy": [
    "A little messy, to be honest.",
    "A bath in Pet Care would help."
   ],
   "bored": [
    "A bit bored.",
    "Want to play with me in Pet Care?"
   ],
   "happy": [
    "Pretty great, {name}.",
    "Learning with you is fun."
   ]
  },
  "teen": {
   "hungry": [
    "Hungry, honestly.",
    "Pet Care has food, if you have a minute."
   ],
   "messy": [
    "Could use a bath.",
    "Pet Care, when you get a chance."
   ],
   "bored": [
    "A bit restless.",
    "A quick game in Pet Care would help."
   ],
   "happy": [
    "Good. Things are going well.",
    "Thanks for asking, {name}."
   ]
  }
 },
 "api": {
  "q": "How are you feeling?",
  "a": {
   "little": {
    "hungry": [
     "My tummy feels empty {name}.",
     "Let's eat together {pet}!"
    ],
    "messy": [
     "I feel sticky {name}.",
     "We can wash up now."
    ],
    "bored": [
     "I feel a bit lonely {name}.",
     "Let's play together {pet}."
    ],
    "happy": [
     "I feel so happy {name}.",
     "We are best friends."
    ]
   },
   "kid": {
    "hungry": [
     "My stomach is growling {name}.",
     "Time to grab a snack {pet}."
    ],
    "messy": [
     "I feel pretty messy {name}.",
     "A bath would feel nice."
    ],
    "bored": [
     "I'm a little bored {name}.",
     "Want to play with me {pet}?"
    ],
    "happy": [
     "I feel really happy {name}.",
     "This is a good day {pet}."
    ]
   },
   "teen": {
    "hungry": [
     "My stomach feels empty right now {name}.",
     "I could use something to eat {pet}."
    ],
    "messy": [
     "I feel pretty messy today {name}.",
     "A bath sounds like a plan."
    ],
    "bored": [
     "I'm kind of bored at the moment {name}.",
     "Want to hang out and play {pet}?"
    ],
    "happy": [
     "I feel pretty happy right now {name}.",
     "Hanging out with you is the best {pet}."
    ]
   }
  }
 },
 "notes": "The API had the pet talk to itself (\"Let's eat together {pet}!\", \"Want to play with me {pet}?\") and said \"lonely\" for a pet that wants to play (sad, and not what the care meter means). Each need now names where to fix it (Pet Care), as Home's thought bubble does."
}
```
