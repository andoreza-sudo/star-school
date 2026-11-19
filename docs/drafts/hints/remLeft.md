# Hint: remLeft

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

gives how many groups when the question asks what is left over. Grades: 4.

## As the child sees it

- Story Problems (story7): "64 cookies are shared equally among 7 friends. How many cookies are left over?" answered 9: "That is how many groups. The question asks what is left over."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "remLeft",
 "line": "That is how many groups. The question asks what is left over.",
 "api": "That is how many each gets check the left over in {v}.",
 "notes": "Kept the idea, with full stops."
}
```
