# Hint: opst

status: reviewed owner 2026-11-19
made: 2026-11-18 by tools/author.js --hints-draft (xAI API); read and fixed by hand

<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this
     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->

## What the child did

adds when the story takes away, or takes away when it adds. Grades: K, 1, 2.

## As the child sees it

- Story Problems (story1): "Ben had 3 crayons. Ben gave 1 to Mia. How many crayons are left?" answered 4: "Read it again. Are things joining, or going away?"
- Coins (coins5): "A pencil costs 3 dollars and 50 cents. You pay 5 dollars. How many cents do you get back?" answered 850: "Read it again. Are things joining, or going away?"

## Checks

- All checks pass (slots, numbers, themes, kid-safe, the pet's tone for every grade it shows in).

## Words

```json
{
 "code": "opst",
 "line": "Read it again. Are things joining, or going away?",
 "api": "Look at the story again with {a} and {b}.",
 "notes": "New code: a story problem shows no sign, so \"the sign says\" would be untrue. The draft (\"Look at the story again with a and b\") gave no idea to look for."
}
```
