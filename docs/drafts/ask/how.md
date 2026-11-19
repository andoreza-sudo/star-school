# Ask the pet: How do I do {stop}? (how)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --ask-draft (xAI API, grok-4.20-0309-non-reasoning)

<!-- For the owner: read the question and its answers below as the child sees and hears them, change any wording in the JSON
     ("q" and "a"), then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --ask-approve <id> --by <name>).
     Until then this question is never on the Ask menu, and with no question reviewed there is no Ask button at all: tools/build.py
     copies reviewed questions only (src/js/39s-askw.js). After editing the JSON, node tools/author.js --ask-fix redraws this page. -->

## As the child sees and hears it (example slots)

```text
Question: How do I do Make Ten?

Answers of the little pet (Pre-K to 2nd grade):
- when the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson (here: {idea} = Two parts make ten., {stop} = Make Ten):
    "Here is the big idea: Two parts make ten. Let's learn it together!"

Answers of the older kid pet (3rd and 4th grade):
- when the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson (here: {idea} = Two parts make ten., {stop} = Make Ten):
    "Here's the main idea: Two parts make ten. The lesson shows it step by step."

Answers of the teen-like pet (5th and 6th grade):
- when the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson (here: {idea} = Two parts make ten., {stop} = Make Ten):
    "The key idea: Two parts make ten. The lesson walks through it if you want it."
```

## Checks

- All checks pass (slots, the tone of each pet age, numbers, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "how",
 "q": "How do I do {stop}?",
 "a": {
  "little": {
   "idea": [
    "Here is the big idea: {idea}",
    "Let's learn it together!"
   ]
  },
  "kid": {
   "idea": [
    "Here's the main idea: {idea}",
    "The lesson shows it step by step."
   ]
  },
  "teen": {
   "idea": [
    "The key idea: {idea}",
    "The lesson walks through it if you want it."
   ]
  }
 },
 "api": {
  "q": "How do I do {stop}?",
  "a": {
   "little": [
    "Let's look at the lesson together {name}. {idea} We can do it!"
   ],
   "kid": [
    "Check the lesson {name}. It shows {idea}. We will figure it out."
   ],
   "teen": [
    "The lesson explains it. It says {idea}. Let's look there together."
   ]
  }
 },
 "notes": "The API answered under a variant \"0\" (no such situation) and wrapped the idea in \"It shows {idea}\" / \"It says {idea}\", which reads badly with a full sentence. Now the idea line is said as it is (the approved line of the stop's lesson), then a pointer to the lesson. Only shown at a stop whose lesson the child has not passed, so \"the lesson shows it\" is true."
}
```
