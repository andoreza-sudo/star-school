# Ask the pet: What if it is too hard? (stuck)

status: unreviewed
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: What if it is too hard?

Answers of the little pet (Pre-K to 2nd grade):
- when what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn:
    "Tap Help to see a hint. Mistakes help us learn. Let's go slow!"

Answers of the older kid pet (3rd and 4th grade):
- when what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn:
    "Tap Help for a hint, and take it slow. You can ask a grown-up, or try an easier stop."

Answers of the teen-like pet (5th and 6th grade):
- when what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn:
    "Tap Help and work through the hint. Slow down, ask a grown-up, or go back a stop. Mistakes are how you learn."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "stuck",
 "q": "What if it is too hard?",
 "a": {
  "little": {
   "help": [
    "Tap Help to see a hint.",
    "Mistakes help us learn. Let's go slow!"
   ]
  },
  "kid": {
   "help": [
    "Tap Help for a hint, and take it slow.",
    "You can ask a grown-up, or try an easier stop."
   ]
  },
  "teen": {
   "help": [
    "Tap Help and work through the hint.",
    "Slow down, ask a grown-up, or go back a stop. Mistakes are how you learn."
   ]
  }
 },
 "api": {
  "q": "What if it is too hard?",
  "a": {
   "little": {
    "help": [
     "Let's tap Help for a picture.",
     "Take a breath. We go slow together {name}."
    ]
   },
   "kid": {
    "help": [
     "Tap the Help button for a picture.",
     "Take a breath and go slow. We can ask a grown-up too."
    ]
   },
   "teen": {
    "help": [
     "Try tapping Help to see a picture.",
     "Take a breath and go slowly. You can ask a grown-up or try an easier step."
    ]
   }
  }
 },
 "notes": "Kept the API's idea (Help, go slowly, a grown-up, an easier stop). \"Help for a picture\" became \"a hint\": not every question's hint is a picture."
}
```
