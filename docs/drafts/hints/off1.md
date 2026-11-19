# Hint: off1

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

counts one too many or one too few (a thing counted twice, or one missed). Grades: Pre-K, K, 1.

## As the child sees it

- Count Things (pk_count1): "How many balloons?" answered 4: "Touch each one as you count. Count each one just once."
- Ten Frames (tenf1): "How many counters?" answered 7: "Touch each one as you count. Count each one just once."
- Measuring (meas2): "How many cubes long is the paper strip?" answered 9: "Touch each one as you count. Count each one just once."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "off1",
 "line": "Touch each one as you count. Count each one just once.",
 "api": "Count each one once more. Check how many you said.",
 "notes": "Made it the lesson idea (each thing counted once)."
}
```
