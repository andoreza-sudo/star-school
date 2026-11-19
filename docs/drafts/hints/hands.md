# Hint: hands

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads the long hand as the hour and the short hand as the minutes. Grades: 1, 2, 3.

## As the child sees it

- Clocks (time1): "Show 10 o'clock on the clock." answered 12:50: "The short hand shows the hour. The long hand shows minutes."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "hands",
 "line": "The short hand shows the hour. The long hand shows minutes.",
 "api": "The short hand shows the hour. Check the short hand again.",
 "notes": "Kept; says what each hand does."
}
```
