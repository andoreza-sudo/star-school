# Hint: look

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

picks a letter or number that looks alike (b for d, M for W, 6 for 9). Grades: Pre-K.

## As the child sees it

- Hear a Number (pk_num2): "Tap the number one." answered 7: "7 looks a lot like it. Look closely at its shape."
- ABC Letters (abc1): "Find the big letter P." answered R: "R looks a lot like it. Look closely at its shape."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "look",
 "line": "{l} looks a lot like it. Look closely at its shape.",
 "api": "Look again at {l}. Tap it.",
 "notes": "Draft \"Look again at R. Tap it.\" told the child to tap the wrong letter."
}
```
