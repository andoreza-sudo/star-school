# "Ask the pet" read-through (ASK-01)

8 questions (8 reviewed). A child taps the Ask button beside the pet (on Home, and
beside the pet on a map), picks a question from a short menu, and the pet says the answer in the tablet's voice; the answer is
also written in the pet's speech bubble. No typing and no talking to the tablet: only these questions, only these answers.

Each answer is chosen by simple rules from what is true for the child right now, and its {slots} are filled from the app:
the next stop on the map, the game time in the bank, the hint for the child's last mistake, the idea line of the lesson.
The pet answers in its age's tone: the little pet (Pre-K to 2nd grade, 12 words at most), the older kid (3rd and 4th,
16 words) and the teen-like partner (5th and 6th, 20 words). Below, every answer with example slots (Mia, her pet Sparky).

A question only shows when it fits: "How do I do ...?" only at a stop that has a lesson for the child's grade;
"Why did I get that wrong?" only after a mistake in a Practice round this session. Ask is not inside a round, and the
"why" answer never says the answer of the question it is about (the app checks every filled answer).

Also on the screen (button and title words, not the pet's answers): the button is read as "Ask <pet> a question";
the sheet says "Ask <pet>", then "Pick a question." until a question is tapped, and has a Close button (read as "Close").

For children who cannot read yet (ASK-READ): when the sheet opens, the pet reads the menu aloud ("You can ask me:", then each
question in order, its button lit while it is said; a tap anywhere stops it), and "Hear the questions again" reads it again.
A tapped question is said first, then its answer, so a child who tapped the wrong one hears what they picked. Each question
has its own picture. The little pet (Pre-K to 2nd grade) shows at most 5 questions, so the whole menu is heard quickly:

- What should I do next? (next)
- Why did I get that wrong? (why)
- How much game time do I have? (time)
- When will you grow? (grow)
- How are you feeling? (feel)

It leaves out (the older pets keep them):

- How do I do {stop}? (how)
- How do I get more game time? (earn)
- What if it is too hard? (stuck)

The sheet's own two lines are at the end of this page (unreviewed).

Until you approve a question it is not on the menu, and with none approved there is no Ask button at all.
To change a word: edit the JSON in docs/drafts/ask/<id>.md. When you are happy, say so, or run:

`node tools/author.js --ask-approve <id ...|all> --by <your name>`

Not built (later steps in ROADMAP ASK-01, for the owner to look at again): typed questions, asking out loud, and any
on-device model.

## What should I do next? (next) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it) (here: {stop} = Make Ten, {world} = Shape Garden):
    "Next is Make Ten. Let's learn it together first!"
- when the next stop to play on the map is {stop}, in the world {world} (here: {stop} = Take Away, {world} = Number Meadow):
    "Let's play Take Away next! It's right next to me on the map."
- when every stop on this map ({subject}) is done (here: {subject} = Math):
    "You did every Math stop, Mia! Let's pick another map."

Answers of the older kid pet (3rd and 4th grade):
- when the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it) (here: {stop} = Make Ten, {world} = Shape Garden):
    "Next up is Make Ten, in Shape Garden. We do its lesson together first, then you practice."
- when the next stop to play on the map is {stop}, in the world {world} (here: {stop} = Take Away, {world} = Number Meadow):
    "Next up is Take Away, in Number Meadow. It's the stop right next to me on the map."
- when every stop on this map ({subject}) is done (here: {subject} = Math):
    "Every Math stop is done. Nice work, Mia. Pick another map to keep going."

Answers of the teen-like pet (5th and 6th grade):
- when the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it) (here: {stop} = Make Ten, {world} = Shape Garden):
    "Next is Make Ten, in Shape Garden. We start with its lesson, then the practice opens."
- when the next stop to play on the map is {stop}, in the world {world} (here: {stop} = Take Away, {world} = Number Meadow):
    "Next is Take Away, in Number Meadow. It's the stop next to me on the map."
- when every stop on this map ({subject}) is done (here: {subject} = Math):
    "Every Math stop is done. Another map has more for you."
```

What changed after the API draft: Rewrote every line. The API had the pet say "with {pet}" about itself, told the child the same stop twice in one answer, and said "We finished all of {subject}" twice over. Now one answer per situation (one or two lines said together); the lesson stop is "learn it together first" (the map shows "Learn with <pet>" in front of the stop); "next to me on the map" is true: the pet stands beside the stop curNode() picks, which is what fills {stop}.

## How do I do {stop}? (how) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson (here: {idea} = Two parts make ten., {stop} = Make Ten):
    "Here is the big idea: Two parts make ten. Let's learn it together!"

Answers of the older kid pet (3rd and 4th grade):
- when the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson (here: {idea} = Two parts make ten., {stop} = Make Ten):
    "Here's the main idea: Two parts make ten. The lesson shows it step by step."

Answers of the teen-like pet (5th and 6th grade):
- when the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson (here: {idea} = Two parts make ten., {stop} = Make Ten):
    "The key idea: Two parts make ten. The lesson walks through it if you want it."
```

What changed after the API draft: The API answered under a variant "0" (no such situation) and wrapped the idea in "It shows {idea}" / "It says {idea}", which reads badly with a full sentence. Now the idea line is said as it is (the approved line of the stop's lesson), then a pointer to the lesson. Only shown at a stop whose lesson the child has not passed, so "the lesson shows it" is true.

## Why did I get that wrong? (why) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question's usual hint), one or two sentences (here: {hint} = Line up the ones. Then add the tens.):
    "Mistakes help us learn! Here is a tip: Line up the ones. Then add the tens."
- when the child got a Practice question wrong, but there is no hint that can be said without giving its answer away:
    "Mistakes help us learn! Next time, tap Help. We'll look together."

Answers of the older kid pet (3rd and 4th grade):
- when the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question's usual hint), one or two sentences (here: {hint} = Line up the ones. Then add the tens.):
    "Good question to ask. Here's a tip for that question: Line up the ones. Then add the tens."
- when the child got a Practice question wrong, but there is no hint that can be said without giving its answer away:
    "Good question to ask. Next time, tap Help and we'll look at the hint."

Answers of the teen-like pet (5th and 6th grade):
- when the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question's usual hint), one or two sentences (here: {hint} = Line up the ones. Then add the tens.):
    "Fair question. Here's what to check next time: Line up the ones. Then add the tens."
- when the child got a Practice question wrong, but there is no hint that can be said without giving its answer away:
    "Fair question. Next time, tap Help and work through the hint."
```

What changed after the API draft: The API treated {hint} as a thing ("Let's look at the {hint}", "The {hint} might help"), but it is a whole sentence (the approved HINT-01 line for the mistake, else the question's usual hint), so it now comes last, after a colon. "We can try again" was dropped: the question is over by the time the child is on Home or the map. The look answer (no hint can be said without its answer) points to the Help button instead of "read it again slowly".

## How much game time do I have? (time) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when the child has {time} of game time to spend now (here: {time} = 4 and a half minutes):
    "You have 4 and a half minutes of game time! Tap Games to play."
- when the child has no game time saved yet:
    "No game time yet. Let's learn and earn some!"
- when a grown-up set a rule: learn {more} more today before the Game Room opens (here: {more} = 6 minutes):
    "Let's learn for 6 minutes more first. Then the games open!"
- when today's game time is used up (the daily limit is {max}); more tomorrow (here: {max} = 30 minutes):
    "You played all 30 minutes for today! More game time tomorrow."
- when a grown-up has paused game time:
    "A grown-up paused game time. Let's learn together for now!"

Answers of the older kid pet (3rd and 4th grade):
- when the child has {time} of game time to spend now (here: {time} = 4 and a half minutes):
    "You've got 4 and a half minutes of game time. Spend it now or save it for later."
- when the child has no game time saved yet:
    "Your game time bank is empty right now. Finish a learning round and it fills up."
- when a grown-up set a rule: learn {more} more today before the Game Room opens (here: {more} = 6 minutes):
    "Learn for 6 minutes more first. Then the Game Room opens."
- when today's game time is used up (the daily limit is {max}); more tomorrow (here: {max} = 30 minutes):
    "You've used today's 30 minutes of game time. It opens again tomorrow."
- when a grown-up has paused game time:
    "A grown-up has paused game time. They can turn it back on."

Answers of the teen-like pet (5th and 6th grade):
- when the child has {time} of game time to spend now (here: {time} = 4 and a half minutes):
    "You have 4 and a half minutes in the bank. Your call when to use it."
- when the child has no game time saved yet:
    "Nothing in the bank yet. A learning round or a lesson earns some."
- when a grown-up set a rule: learn {more} more today before the Game Room opens (here: {more} = 6 minutes):
    "The rule today: 6 minutes more of learning first. Then the Game Room opens."
- when today's game time is used up (the daily limit is {max}); more tomorrow (here: {max} = 30 minutes):
    "You've hit today's limit of 30 minutes. It resets tomorrow."
- when a grown-up has paused game time:
    "Game time is paused by a grown-up. Ask them if you want it back on."
```

What changed after the API draft: Rewrote every line. The API said each slot twice ("We have {time} ... our {time}"), said "It will start again soon" for a pause (only the grown-up decides), and lower-cased the Game Room. {time} is said in minutes ("4 and a half minutes", "half a minute"), not "4:30". "Tap Games" names the bar button.

## How do I get more game time? (earn) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too (here: {min} = 5 minutes):
    "Pass a new lesson with me to earn 5 minutes! Finishing rounds earns time too."
- when how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing):
    "Finish learning rounds to earn game time! Perfect rounds earn a bit more."

Answers of the older kid pet (3rd and 4th grade):
- when how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too (here: {min} = 5 minutes):
    "Pass a new lesson with me and you earn 5 minutes. Rounds, new stops and bosses earn time too."
- when how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing):
    "Finish learning rounds to fill your bank. New stops, perfect scores and bosses add extra."

Answers of the teen-like pet (5th and 6th grade):
- when how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too (here: {min} = 5 minutes):
    "A new lesson passed with me pays 5 minutes. Rounds, new stops, bosses and Brain Teasers add more."
- when how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing):
    "Learning rounds fill the bank. New stops, perfect scores, bosses and Brain Teasers pay extra."
```

What changed after the API draft: The API's "paused" answer ("We will earn more once it starts again") was not true: rounds still add to the bank while a grown-up pauses spending (ptEarn), so that situation is gone and the question answers the same way then. "Pass a lesson" is now "a new lesson" (only the first pass pays the full time, lsPrice). The extras named are the Game time card's own list (ptEarnList).

## When will you grow? (grow) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when the pet is still an egg; {stars} until it hatches (stars come from learning) (here: {stars} = 12 more stars):
    "I'm still in my egg! 12 more stars and I hatch!"
- when the pet grows to its next stage in {stars} (stars come from learning) (here: {stars} = 40 more stars):
    "40 more stars and I grow bigger! Stars come from learning."
- when the pet is fully grown (a super pet):
    "I'm all grown up, Mia! Thanks for taking care of me."

Answers of the older kid pet (3rd and 4th grade):
- when the pet is still an egg; {stars} until it hatches (stars come from learning) (here: {stars} = 12 more stars):
    "I'm still in my egg. Get 12 more stars and I hatch. Learning earns stars."
- when the pet grows to its next stage in {stars} (stars come from learning) (here: {stars} = 40 more stars):
    "I grow again after 40 more stars. Every learning round earns some."
- when the pet is fully grown (a super pet):
    "I'm fully grown now. Thanks for all the stars, Mia."

Answers of the teen-like pet (5th and 6th grade):
- when the pet is still an egg; {stars} until it hatches (stars come from learning) (here: {stars} = 12 more stars):
    "Still in the egg. 12 more stars and I hatch."
- when the pet grows to its next stage in {stars} (stars come from learning) (here: {stars} = 40 more stars):
    "40 more stars until my next stage. Learning rounds earn them."
- when the pet is fully grown (a super pet):
    "Fully grown. Thanks for sticking with me, Mia."
```

What changed after the API draft: The API said {stars} twice per answer and "level up" (a game word the app does not use). {stars} reads "12 more stars" or "1 more star", so the lines say it once. Nothing about changing into something else: the pet grows bigger, as on Home.

## How are you feeling? (feel) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when the pet is hungry (Pet Care: feed it):
    "My tummy is rumbling! Can we visit Pet Care for a snack?"
- when the pet needs a bath (Pet Care: wash it):
    "I feel a bit muddy! Can we visit Pet Care for a bath?"
- when the pet wants to play (Pet Care: play with it):
    "I want to play! Can we visit Pet Care and play?"
- when the pet is happy and cared for:
    "I feel happy, Mia! I like learning with you."

Answers of the older kid pet (3rd and 4th grade):
- when the pet is hungry (Pet Care: feed it):
    "Honestly? Hungry. A snack in Pet Care would be great."
- when the pet needs a bath (Pet Care: wash it):
    "A little messy, to be honest. A bath in Pet Care would help."
- when the pet wants to play (Pet Care: play with it):
    "A bit bored. Want to play with me in Pet Care?"
- when the pet is happy and cared for:
    "Pretty great, Mia. Learning with you is fun."

Answers of the teen-like pet (5th and 6th grade):
- when the pet is hungry (Pet Care: feed it):
    "Hungry, honestly. Pet Care has food, if you have a minute."
- when the pet needs a bath (Pet Care: wash it):
    "Could use a bath. Pet Care, when you get a chance."
- when the pet wants to play (Pet Care: play with it):
    "A bit restless. A quick game in Pet Care would help."
- when the pet is happy and cared for:
    "Good. Things are going well. Thanks for asking, Mia."
```

What changed after the API draft: The API had the pet talk to itself ("Let's eat together {pet}!", "Want to play with me {pet}?") and said "lonely" for a pet that wants to play (sad, and not what the care meter means). Each need now names where to fix it (Pet Care), as Home's thought bubble does.

## What if it is too hard? (stuck) (reviewed)

```text
Answers of the little pet (Pre-K to 2nd grade):
- when what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn:
    "Tap Help to see a hint. Mistakes help us learn. Let's go slow!"

Answers of the older kid pet (3rd and 4th grade):
- when what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn:
    "Tap Help for a hint, and take it slow. You can ask a grown-up, or try an easier stop."

Answers of the teen-like pet (5th and 6th grade):
- when what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn:
    "Tap Help and work through the hint. Slow down, ask a grown-up, or go back a stop. Mistakes are how you learn."
```

What changed after the API draft: Kept the API's idea (Help, go slowly, a grown-up, an easier stop). "Help for a picture" became "a hint": not every question's hint is a picture.

## The lines with their slots

{name} is the child, {pet} the pet; the other slots are filled by the app as described above.

### next: What should I do next?

- little lesson: Next is {stop}.
- little lesson: Let's learn it together first!
- little stop: Let's play {stop} next!
- little stop: It's right next to me on the map.
- little done: You did every {subject} stop, {name}!
- little done: Let's pick another map.
- kid lesson: Next up is {stop}, in {world}.
- kid lesson: We do its lesson together first, then you practice.
- kid stop: Next up is {stop}, in {world}.
- kid stop: It's the stop right next to me on the map.
- kid done: Every {subject} stop is done. Nice work, {name}.
- kid done: Pick another map to keep going.
- teen lesson: Next is {stop}, in {world}.
- teen lesson: We start with its lesson, then the practice opens.
- teen stop: Next is {stop}, in {world}.
- teen stop: It's the stop next to me on the map.
- teen done: Every {subject} stop is done.
- teen done: Another map has more for you.

### how: How do I do {stop}?

- little idea: Here is the big idea: {idea}
- little idea: Let's learn it together!
- kid idea: Here's the main idea: {idea}
- kid idea: The lesson shows it step by step.
- teen idea: The key idea: {idea}
- teen idea: The lesson walks through it if you want it.

### why: Why did I get that wrong?

- little tip: Mistakes help us learn!
- little tip: Here is a tip: {hint}
- little look: Mistakes help us learn!
- little look: Next time, tap Help. We'll look together.
- kid tip: Good question to ask.
- kid tip: Here's a tip for that question: {hint}
- kid look: Good question to ask.
- kid look: Next time, tap Help and we'll look at the hint.
- teen tip: Fair question.
- teen tip: Here's what to check next time: {hint}
- teen look: Fair question.
- teen look: Next time, tap Help and work through the hint.

### time: How much game time do I have?

- little ok: You have {time} of game time!
- little ok: Tap Games to play.
- little empty: No game time yet.
- little empty: Let's learn and earn some!
- little learn: Let's learn for {more} more first.
- little learn: Then the games open!
- little max: You played all {max} for today!
- little max: More game time tomorrow.
- little paused: A grown-up paused game time.
- little paused: Let's learn together for now!
- kid ok: You've got {time} of game time.
- kid ok: Spend it now or save it for later.
- kid empty: Your game time bank is empty right now.
- kid empty: Finish a learning round and it fills up.
- kid learn: Learn for {more} more first.
- kid learn: Then the Game Room opens.
- kid max: You've used today's {max} of game time.
- kid max: It opens again tomorrow.
- kid paused: A grown-up has paused game time.
- kid paused: They can turn it back on.
- teen ok: You have {time} in the bank.
- teen ok: Your call when to use it.
- teen empty: Nothing in the bank yet.
- teen empty: A learning round or a lesson earns some.
- teen learn: The rule today: {more} more of learning first.
- teen learn: Then the Game Room opens.
- teen max: You've hit today's limit of {max}.
- teen max: It resets tomorrow.
- teen paused: Game time is paused by a grown-up.
- teen paused: Ask them if you want it back on.

### earn: How do I get more game time?

- little lesson: Pass a new lesson with me to earn {min}!
- little lesson: Finishing rounds earns time too.
- little round: Finish learning rounds to earn game time!
- little round: Perfect rounds earn a bit more.
- kid lesson: Pass a new lesson with me and you earn {min}.
- kid lesson: Rounds, new stops and bosses earn time too.
- kid round: Finish learning rounds to fill your bank.
- kid round: New stops, perfect scores and bosses add extra.
- teen lesson: A new lesson passed with me pays {min}.
- teen lesson: Rounds, new stops, bosses and Brain Teasers add more.
- teen round: Learning rounds fill the bank.
- teen round: New stops, perfect scores, bosses and Brain Teasers pay extra.

### grow: When will you grow?

- little egg: I'm still in my egg!
- little egg: {stars} and I hatch!
- little grow: {stars} and I grow bigger!
- little grow: Stars come from learning.
- little big: I'm all grown up, {name}!
- little big: Thanks for taking care of me.
- kid egg: I'm still in my egg.
- kid egg: Get {stars} and I hatch. Learning earns stars.
- kid grow: I grow again after {stars}.
- kid grow: Every learning round earns some.
- kid big: I'm fully grown now.
- kid big: Thanks for all the stars, {name}.
- teen egg: Still in the egg.
- teen egg: {stars} and I hatch.
- teen grow: {stars} until my next stage.
- teen grow: Learning rounds earn them.
- teen big: Fully grown.
- teen big: Thanks for sticking with me, {name}.

### feel: How are you feeling?

- little hungry: My tummy is rumbling!
- little hungry: Can we visit Pet Care for a snack?
- little messy: I feel a bit muddy!
- little messy: Can we visit Pet Care for a bath?
- little bored: I want to play!
- little bored: Can we visit Pet Care and play?
- little happy: I feel happy, {name}!
- little happy: I like learning with you.
- kid hungry: Honestly? Hungry.
- kid hungry: A snack in Pet Care would be great.
- kid messy: A little messy, to be honest.
- kid messy: A bath in Pet Care would help.
- kid bored: A bit bored.
- kid bored: Want to play with me in Pet Care?
- kid happy: Pretty great, {name}.
- kid happy: Learning with you is fun.
- teen hungry: Hungry, honestly.
- teen hungry: Pet Care has food, if you have a minute.
- teen messy: Could use a bath.
- teen messy: Pet Care, when you get a chance.
- teen bored: A bit restless.
- teen bored: A quick game in Pet Care would help.
- teen happy: Good. Things are going well.
- teen happy: Thanks for asking, {name}.

### stuck: What if it is too hard?

- little help: Tap Help to see a hint.
- little help: Mistakes help us learn. Let's go slow!
- kid help: Tap Help for a hint, and take it slow.
- kid help: You can ask a grown-up, or try an easier stop.
- teen help: Tap Help and work through the hint.
- teen help: Slow down, ask a grown-up, or go back a stop. Mistakes are how you learn.

## The sheet's own words (unreviewed)

Written in src/js/39r-ask.js (ASK_SHEET); the same for every pet age. Change them there, or say which words you want.

```text
Said by the pet before it reads the questions aloud:
    "You can ask me:"
The button at the top of the sheet (a speaker picture; a tap reads the questions again):
    "Hear the questions again"
```

- intro: You can ask me:
- again: Hear the questions again
