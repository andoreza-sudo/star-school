# Ask the pet: When will you grow? (grow)

status: unreviewed
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: When will you grow?

Answers of the little pet (Pre-K to 2nd grade):
- when the pet is still an egg; {stars} until it hatches (stars come from learning) (here: {stars} = 12 more stars):
    "I'm still in my egg! 12 more stars and I hatch!"
- when the pet grows to its next stage in {stars} (stars come from learning) (here: {stars} = 40 more stars):
    "40 more stars and I grow bigger! Stars come from learning."
- when the pet is fully grown (a super pet):
    "I'm all grown up, Mia! Thanks for taking care of me."

Answers of the older kid pet (3rd and 4th grade):
- when the pet is still an egg; {stars} until it hatches (stars come from learning) (here: {stars} = 12 more stars):
    "I'm still in my egg. Get 12 more stars and I hatch. Learning earns stars."
- when the pet grows to its next stage in {stars} (stars come from learning) (here: {stars} = 40 more stars):
    "I grow again after 40 more stars. Every learning round earns some."
- when the pet is fully grown (a super pet):
    "I'm fully grown now. Thanks for all the stars, Mia."

Answers of the teen-like pet (5th and 6th grade):
- when the pet is still an egg; {stars} until it hatches (stars come from learning) (here: {stars} = 12 more stars):
    "Still in the egg. 12 more stars and I hatch."
- when the pet grows to its next stage in {stars} (stars come from learning) (here: {stars} = 40 more stars):
    "40 more stars until my next stage. Learning rounds earn them."
- when the pet is fully grown (a super pet):
    "Fully grown. Thanks for sticking with me, Mia."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "grow",
 "q": "When will you grow?",
 "a": {
  "little": {
   "egg": [
    "I'm still in my egg!",
    "{stars} and I hatch!"
   ],
   "grow": [
    "{stars} and I grow bigger!",
    "Stars come from learning."
   ],
   "big": [
    "I'm all grown up, {name}!",
    "Thanks for taking care of me."
   ]
  },
  "kid": {
   "egg": [
    "I'm still in my egg.",
    "Get {stars} and I hatch. Learning earns stars."
   ],
   "grow": [
    "I grow again after {stars}.",
    "Every learning round earns some."
   ],
   "big": [
    "I'm fully grown now.",
    "Thanks for all the stars, {name}."
   ]
  },
  "teen": {
   "egg": [
    "Still in the egg.",
    "{stars} and I hatch."
   ],
   "grow": [
    "{stars} until my next stage.",
    "Learning rounds earn them."
   ],
   "big": [
    "Fully grown.",
    "Thanks for sticking with me, {name}."
   ]
  }
 },
 "api": {
  "q": "When will you grow?",
  "a": {
   "little": {
    "egg": [
     "We need {stars} to hatch, {name}!",
     "Let's get {stars} together!"
    ],
    "grow": [
     "We need {stars} to grow, {name}.",
     "Let's earn {stars} and grow!"
    ],
    "big": [
     "I'm all grown now, {name}!",
     "We did it together, {name}."
    ]
   },
   "kid": {
    "egg": [
     "I still need {stars} before I can hatch.",
     "Help me reach {stars} so I can come out."
    ],
    "grow": [
     "I'll grow after we get {stars}.",
     "Looks like I need {stars} to level up."
    ],
    "big": [
     "I'm fully grown now, {name}.",
     "No more growing left for me."
    ]
   },
   "teen": {
    "egg": [
     "I need {stars} before I hatch.",
     "That's how many stars until I'm out."
    ],
    "grow": [
     "I still need {stars} to reach the next stage.",
     "Once we collect {stars} I'll grow."
    ],
    "big": [
     "I'm done growing, {name}.",
     "This is as big as I get."
    ]
   }
  }
 },
 "notes": "The API said {stars} twice per answer and \"level up\" (a game word the app does not use). {stars} reads \"12 more stars\" or \"1 more star\", so the lines say it once. Nothing about changing into something else: the pet grows bigger, as on Home."
}
```
