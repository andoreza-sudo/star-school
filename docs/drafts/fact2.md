# Draft: Prime or Composite (fact2)

status: reviewed owner 2026-11-18
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Prime or Composite (fact2), grade 4, the kid pet
Idea: A composite number makes more than one row. A prime makes only one.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array with {n} dots. Any way you like!
Name it:
  - Your array shows {n} dots in {a} rows of {b}.
  - A composite number makes an array with more than one row.
  - A prime number makes only one row.
Together:
  - Build an array for {n} in more than one row.
  - Is {n} prime or composite?
  - Is this number prime or composite?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a factor for {n} that is not one or the number itself.
Reasons the pet gives when it is caught:
  oddPrime: I thought every odd number is prime. Some odd numbers have factors.
Tonight's question: Ask {name}: "Is fifteen a prime number or a composite number?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea was 17 words; the reason "Every odd number is not prime" says something untrue.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "fact2",
 "t": "Prime or Composite",
 "grade": 4,
 "age": "kid",
 "idea": "A composite number makes more than one row. A prime makes only one.",
 "beats": {
  "remember": [
   "Do you remember this? What is {a} times {b}?"
  ],
  "explore": [
   "Make an array with {n} dots. Any way you like!"
  ],
  "name": [
   "Your array shows {n} dots in {a} rows of {b}.",
   "A composite number makes an array with more than one row.",
   "A prime number makes only one row."
  ],
  "together": [
   "Build an array for {n} in more than one row.",
   "Is {n} prime or composite?",
   "Is this number prime or composite?"
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The factory needs a factor for {n} that is not one or the number itself."
  ]
 },
 "reasons": {
  "oddPrime": [
   "I thought every odd number is prime. Some odd numbers have factors."
  ]
 },
 "home": "Ask {name}: \"Is fifteen a prime number or a composite number?\""
}
```

<details><summary>The API's first draft</summary>

```text
Prime or Composite (fact2), grade 4, the kid pet
Idea: A composite number makes an array with more than one row. A prime makes only one row.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array with {n} dots. Any way you like!
Name it:
  - Your array shows {n} dots in {a} rows of {b}.
  - A composite number makes an array with more than one row.
  - A prime number makes only one row.
Together:
  - Build an array for {n} in more than one row.
  - Is {n} prime or composite?
  - Is this number prime or composite?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a factor for {n} that is not one or the number itself.
Reasons the pet gives when it is caught:
  oddPrime: Every odd number is not prime. | Look closer. Some odd numbers are composite.
Tonight's question: Ask {name}: "Is fifteen a prime number or a composite number?"
About 3.4 minutes.
```
</details>
