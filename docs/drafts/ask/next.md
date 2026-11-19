# Ask the pet: What should I do next? (next)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: What should I do next?

Answers of the little pet (Pre-K to 2nd grade):
- when the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it) (here: {stop} = Make Ten, {world} = Shape Garden):
    "Next is Make Ten. Let's learn it together first!"
- when the next stop to play on the map is {stop}, in the world {world} (here: {stop} = Take Away, {world} = Number Meadow):
    "Let's play Take Away next! It's right next to me on the map."
- when every stop on this map ({subject}) is done (here: {subject} = Math):
    "You did every Math stop, Mia! Let's pick another map."

Answers of the older kid pet (3rd and 4th grade):
- when the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it) (here: {stop} = Make Ten, {world} = Shape Garden):
    "Next up is Make Ten, in Shape Garden. We do its lesson together first, then you practice."
- when the next stop to play on the map is {stop}, in the world {world} (here: {stop} = Take Away, {world} = Number Meadow):
    "Next up is Take Away, in Number Meadow. It's the stop right next to me on the map."
- when every stop on this map ({subject}) is done (here: {subject} = Math):
    "Every Math stop is done. Nice work, Mia. Pick another map to keep going."

Answers of the teen-like pet (5th and 6th grade):
- when the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it) (here: {stop} = Make Ten, {world} = Shape Garden):
    "Next is Make Ten, in Shape Garden. We start with its lesson, then the practice opens."
- when the next stop to play on the map is {stop}, in the world {world} (here: {stop} = Take Away, {world} = Number Meadow):
    "Next is Take Away, in Number Meadow. It's the stop next to me on the map."
- when every stop on this map ({subject}) is done (here: {subject} = Math):
    "Every Math stop is done. Another map has more for you."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "next",
 "q": "What should I do next?",
 "a": {
  "little": {
   "lesson": [
    "Next is {stop}.",
    "Let's learn it together first!"
   ],
   "stop": [
    "Let's play {stop} next!",
    "It's right next to me on the map."
   ],
   "done": [
    "You did every {subject} stop, {name}!",
    "Let's pick another map."
   ]
  },
  "kid": {
   "lesson": [
    "Next up is {stop}, in {world}.",
    "We do its lesson together first, then you practice."
   ],
   "stop": [
    "Next up is {stop}, in {world}.",
    "It's the stop right next to me on the map."
   ],
   "done": [
    "Every {subject} stop is done. Nice work, {name}.",
    "Pick another map to keep going."
   ]
  },
  "teen": {
   "lesson": [
    "Next is {stop}, in {world}.",
    "We start with its lesson, then the practice opens."
   ],
   "stop": [
    "Next is {stop}, in {world}.",
    "It's the stop next to me on the map."
   ],
   "done": [
    "Every {subject} stop is done.",
    "Another map has more for you."
   ]
  }
 },
 "api": {
  "q": "What should I do next?",
  "a": {
   "little": {
    "lesson": [
     "Let's learn {stop} with {pet} in {world}, {name}!",
     "Come on {name}! We learn {stop} with {pet} first."
    ],
    "stop": [
     "Let's go play {stop} in {world}, {name}!",
     "Time for {stop} with me in {world}!"
    ],
    "done": [
     "We finished all of {subject}, {name}!",
     "{name} we did every stop in {subject}."
    ]
   },
   "kid": {
    "lesson": [
     "First we learn {stop} with {pet} in {world}.",
     "Ready to learn {stop} with {pet} in {world}, {name}?"
    ],
    "stop": [
     "Next up is {stop} inside {world}.",
     "Let's jump into {stop} in {world}, {name}."
    ],
    "done": [
     "We finished the whole {subject} map.",
     "Every stop in {subject} is done now."
    ]
   },
   "teen": {
    "lesson": [
     "The next stop is learning {stop} with {pet} in {world}.",
     "We start with the {stop} lesson using {pet} in {world}."
    ],
    "stop": [
     "Time to play {stop} in {world}.",
     "Next activity is {stop} inside {world}."
    ],
    "done": [
     "We completed every stop in {subject}.",
     "All the {subject} stops are finished."
    ]
   }
  }
 },
 "notes": "Rewrote every line. The API had the pet say \"with {pet}\" about itself, told the child the same stop twice in one answer, and said \"We finished all of {subject}\" twice over. Now one answer per situation (one or two lines said together); the lesson stop is \"learn it together first\" (the map shows \"Learn with <pet>\" in front of the stop); \"next to me on the map\" is true: the pet stands beside the stop curNode() picks, which is what fills {stop}."
}
```
