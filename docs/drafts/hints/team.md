# Hint: team

status: unreviewed
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

reads a vowel team as one short vowel (boat as bat), or as another team. Grades: 2, 3, 4, 5, 6.

## As the child sees it

- Picture Words (pic4): "Which word is this?" answered got: "Vowels side by side make one sound. Look at the vowels."
- Build a Word (build4): "pie" answered pi: "Vowels side by side make one sound. Look at the vowels."
- Spelling (spell3): "cheese. I like cheese on my pizza. cheese." answered chese: "Vowels side by side make one sound. Look at the vowels."

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "team",
 "line": "Vowels side by side make one sound. Look at the vowels.",
 "api": "{o} has a vowel team. Try again.",
 "notes": "Draft said the child's word has a vowel team (it does not)."
}
```
