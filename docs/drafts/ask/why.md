# Ask the pet: Why did I get that wrong? (why)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: Why did I get that wrong?

Answers of the little pet (Pre-K to 2nd grade):
- when the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question's usual hint), one or two sentences (here: {hint} = Line up the ones. Then add the tens.):
    "Mistakes help us learn! Here is a tip: Line up the ones. Then add the tens."
- when the child got a Practice question wrong, but there is no hint that can be said without giving its answer away:
    "Mistakes help us learn! Next time, tap Help. We'll look together."

Answers of the older kid pet (3rd and 4th grade):
- when the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question's usual hint), one or two sentences (here: {hint} = Line up the ones. Then add the tens.):
    "Good question to ask. Here's a tip for that question: Line up the ones. Then add the tens."
- when the child got a Practice question wrong, but there is no hint that can be said without giving its answer away:
    "Good question to ask. Next time, tap Help and we'll look at the hint."

Answers of the teen-like pet (5th and 6th grade):
- when the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question's usual hint), one or two sentences (here: {hint} = Line up the ones. Then add the tens.):
    "Fair question. Here's what to check next time: Line up the ones. Then add the tens."
- when the child got a Practice question wrong, but there is no hint that can be said without giving its answer away:
    "Fair question. Next time, tap Help and work through the hint."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "why",
 "q": "Why did I get that wrong?",
 "a": {
  "little": {
   "tip": [
    "Mistakes help us learn!",
    "Here is a tip: {hint}"
   ],
   "look": [
    "Mistakes help us learn!",
    "Next time, tap Help. We'll look together."
   ]
  },
  "kid": {
   "tip": [
    "Good question to ask.",
    "Here's a tip for that question: {hint}"
   ],
   "look": [
    "Good question to ask.",
    "Next time, tap Help and we'll look at the hint."
   ]
  },
  "teen": {
   "tip": [
    "Fair question.",
    "Here's what to check next time: {hint}"
   ],
   "look": [
    "Fair question.",
    "Next time, tap Help and work through the hint."
   ]
  }
 },
 "api": {
  "q": "Why did I get that wrong?",
  "a": {
   "little": {
    "tip": [
     "Let's look at the {hint} together.",
     "We can try again {name}."
    ],
    "look": [
     "Let's read it again slowly.",
     "We will get it next time."
    ]
   },
   "kid": {
    "tip": [
     "The {hint} might help us here.",
     "Want to give it another try {name}?"
    ],
    "look": [
     "Sometimes these are tricky.",
     "Let's look at it again together."
    ]
   },
   "teen": {
    "tip": [
     "The {hint} could point us in the right direction.",
     "We can check it again {name}."
    ],
    "look": [
     "These can be tricky sometimes.",
     "Let's take another look at it."
    ]
   }
  }
 },
 "notes": "The API treated {hint} as a thing (\"Let's look at the {hint}\", \"The {hint} might help\"), but it is a whole sentence (the approved HINT-01 line for the mistake, else the question's usual hint), so it now comes last, after a colon. \"We can try again\" was dropped: the question is over by the time the child is on Home or the map. The look answer (no hint can be said without its answer) points to the Help button instead of \"read it again slowly\"."
}
```
