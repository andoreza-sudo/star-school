# Hint: rplace

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

rounds to the wrong place (to the hundreds when asked for tens). Grades: 3, 4, 5.

## As the child sees it

- Rounding (round1): "Round 845 to the nearest 10." answered 800: "We round to the tens here. Find that place first."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "rplace",
 "line": "We round to the {place} here. Find that place first.",
 "api": "Round to the {place} place. Look at the place asked for.",
 "notes": "Draft said \"the tens place place\" (slot) and repeated itself."
}
```
