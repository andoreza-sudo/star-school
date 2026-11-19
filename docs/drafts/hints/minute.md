# Hint: minute

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

counts the minute marks one five off (or one mark off). Grades: 2, 3.

## As the child sees it

- Clocks (time4): "Show half past 10 on the clock." answered 10:25: "Count by fives to the last number, then count on."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "minute",
 "line": "Count by fives to the last number, then count on.",
 "api": "Count by fives around the clock. Try counting the marks again.",
 "notes": "For one-minute clocks \"count the marks again\" was not enough; now fits both clock kinds."
}
```
