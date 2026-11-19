# Hint: addUnl

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds (or takes away) the tops and the bottoms when the bottoms are different. Grades: 5.

## As the child sees it

- Fraction Math (fop3): "3 fourths plus 7 tenths. Write the answer as a fraction." answered 10/14: "Make the bottom numbers the same first. Then work with the tops."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "addUnl",
 "line": "Make the bottom numbers the same first. Then work with the tops.",
 "api": "Change the bottoms to match before you add the tops.",
 "notes": "New code: with different bottoms \"the bottom stays the same\" is untrue. Kept the draft's idea."
}
```
