# Hint: homo

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

picks a word that sounds the same but is spelt differently and means something else. Grades: 1, 2, 3, 4, 5.

## As the child sees it

- Spelling (spell1): "red. My kite is red. red." answered read: "Read sounds right, but it means something else. Look again."
- Grammar (gram5): "Which is the short way to write "you are"?" answered your: "Your sounds right, but it means something else. Look again."
- Vocabulary (vocab6): "We walked on the sand in our blank feet." answered bear: "Bear sounds right, but it means something else. Look again."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "homo",
 "line": "{o} sounds right, but it means something else. Look again.",
 "api": "check the spelling of {o} for the right meaning",
 "notes": "Draft \"check the spelling of ... for the right meaning\" was unclear."
}
```
