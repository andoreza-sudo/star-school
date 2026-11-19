# Hint: esper

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

uses the verb form of another person (soy for es). Grades: Pre-K.

## As the child sees it

- Ser, Estar, Tener (es_ser1): "My sister is very nice." answered soy: "Soy goes with yo. Who is the sentence about?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "esper",
 "line": "{o} goes with {w}. Who is the sentence about?",
 "api": "use the right word for he or she",
 "notes": "Draft \"the right word for he or she\" was untrue when the sentence is about tú or ellos."
}
```
