# Hint: oddPrime

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

thinks every odd number is prime. Grades: 4.

## As the child sees it

- Factors & Primes (fact2): "Which number is prime?" answered 35: "35 is odd, but it has other factors. Look again."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "oddPrime",
 "line": "{o} is odd, but it has other factors. Look again.",
 "api": "Not every odd number like {o} is prime try again.",
 "notes": "Kept the idea, with full stops."
}
```
