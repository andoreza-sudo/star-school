# Parent corner: read-through (PARENT-11)

BEST-APP roadmap item 11. A new first card on the report card, in Grown-ups behind the PIN: "This week your child learned...", two
questions to ask at dinner, and a certificate to print. Nothing new on the child's side.

status: unreviewed

Status: **pending owner approval**. The code uses the proposed text below, but the corner stays hidden until the owner approves it.

## How to approve (the one-line flip)

Change the status line above from `status: unreviewed` to `status: reviewed <your name> <YYYY-MM-DD>` (for example
`status: reviewed Sam 2026-11-27`), then run `python3 tools/build.py`. The build writes `src/js/82a-parenton.js` with
`PARENT_ON = 1` and the report card shows the Parent corner. With any other status line it writes `PARENT_ON = 0` and the report
card is exactly as before. To change a sentence, change it in `src/js/41d-parent.js` (PCW or PCQ) and in the tables below;
tools/test.js (PARENT-11) checks that every sentence of the corner is in this file.

## How it works

- **This week (the summary).** Built only from what the app already keeps, for the last 7 days ending today: minutes and days from
  the activity log, the stops passed that were played this week (the mastery record's last day and the stop's stars; the app keeps
  no date for a pass), the lessons finished (the lessons' record), and the skills that got stronger (a stop mastered, or a check-in
  badge won, this week). Nothing new is saved.
- **Two questions for dinner.** From the skills of the stops played this week (and the lessons' stops): the two skill groups with
  the most stops played, one question each (two from the same group when only one was played). The child's grade picks among a
  group's questions; the pick stays the same all week and changes the next week. The bank is below: 74 questions in 22 groups,
  2 to 4 per group (Math 35, Reading 17, Spanish 7, Discover 15).
- **The certificate.** A one-page card with the logo, the child's first name (a blank line to write it in when none is set), the
  stops passed in each subject so far, the lessons and the stops mastered so far, the date and a line to sign. Print uses the
  tablet's own print (window.print()); only the certificate prints, on one landscape page. No network, no PDF library; the name
  never leaves the tablet except on the paper. A picture of it: PARENT11-cert.png (print layout, approval switched on for the shot).
- The words and the certificate code are in the part `gate` (it loads with the Grown-ups PIN), not at start-up.

## New sentences: labels, the summary and the certificate (pending owner approval)

`{name}`, `{pet}`, `{min}`, `{days}`, `{n}`, `{list}`, `{a}`, `{b}`, `{stop}` and `{area}` are filled in by the app.

| Where | Proposed text | Why |
|---|---|---|
| Report card: the title of the new first card | Parent corner | The roadmap's name. It tells the grown-up this card is for them. |
| Parent corner: the line under the title | Talk with {name} about the week for a few minutes. Everything here stays on this tablet. | Says what the card is for and that nothing leaves the tablet. {name} is the child's name ("your child" when there is none). |
| Parent corner: heading of the week's summary | This week {name} learned | The roadmap's words. {name} is the child's name ("Your child" when there is none). |
| Parent corner, the summary: time | Time: {min} on {days} of the last 7 days. | Minutes and days from the activity log (the same numbers as "This week" on the report card). {min} is one of the three lines below. |
| Parent corner, the summary: minutes (2 or more) | {n} minutes | Plain plural. |
| Parent corner, the summary: one minute | 1 minute | Singular. |
| Parent corner, the summary: under a minute | less than a minute | "0 minutes" would read as nothing done. |
| Parent corner, the summary: stops passed | Stops passed: {list}. | The stops passed that were played in the last 7 days, by their map names; up to 4, then "and N more". |
| Parent corner, the summary: lessons | Lessons with {pet}: {list}. | The lessons finished in the last 7 days, by their stop names. {pet} is the pet's name, as on the report card's lessons card. |
| Parent corner, the summary: skills that got stronger | Skills that got stronger: {list}. | The stops mastered or with a check-in badge won in the last 7 days. The roadmap asks for "skills that got stronger". |
| Parent corner, the summary: nothing this week | Nothing was played in the last 7 days. This fills in after a round or a lesson. | A kind empty state; it says what fills it in. |
| Parent corner, the summary: the small print under it | A stop counts when it is passed and was played in the last 7 days. A skill got stronger when its stop was mastered or won a check-in badge. | The app keeps no date for a pass, so it says honestly what "passed" and "stronger" mean here. |
| Lists: the last two items | {a} and {b} | "Add to 5 and Take Away"; longer lists put commas before. |
| Lists: after the first 4 items | {n} more | Keeps a busy week to one line. |
| Parent corner: heading of the dinner questions | Two questions for dinner | The roadmap's idea, said plainly. |
| Parent corner: the line under it | Picked from what {name} played this week. It is a chat, not a test. | Tells the grown-up why these two and sets the tone: talk, no quiz. |
| Parent corner: the tag under each question | From this week: {stop} | Shows which stop the question comes from. {stop} is the stop's name on the map. |
| Parent corner: no questions yet | The questions appear after a week with some play. | A kind empty state for a week with no play. |
| Parent corner: heading of the certificate part | A certificate to print | Says what it is: something to print. |
| Parent corner: the line under it | One page with what {name} has done so far. | Says it is about everything so far, not just this week. |
| Parent corner: the button that opens the certificate | Make a certificate | Says what the button does. |
| Parent corner: no certificate yet | The certificate is ready once {name} passes a first stop. | A child with no stop passed has nothing to put on it yet. |
| The certificate screen: its title in the top bar | Certificate | Short; the screen holds one certificate. |
| Certificate: the title | Certificate of Learning | A familiar certificate title. |
| Certificate: above the name | This certificate is presented to | Classic certificate wording; a parent knows it at once. |
| Certificate: under the name | for learning and practicing with Whistlestop | Says what it is for without praise words that can sound babyish to a 10-year-old. |
| Certificate: one line per subject with a stop passed (2 or more) | Passed {n} stops in {area} | The roadmap's example, "finished 5 stops in Math", in the app's word for it ("passed"). {area} is Math, Reading, Spanish or Discover. |
| Certificate: the same, one stop | Passed 1 stop in {area} | Singular. |
| Certificate: lessons (2 or more) | Finished {n} lessons with {pet} | Lessons taught by the pet so far. {pet} is the pet's name. |
| Certificate: one lesson | Finished 1 lesson with {pet} | Singular. |
| Certificate: stops mastered (2 or more) | Mastered {n} skills | Mastered is the report card's word (20+ questions, 90% right, 2+ days). |
| Certificate: one stop mastered | Mastered 1 skill | Singular. |
| Certificate: the label under the date | Date | The date is written like "November 26, 2026". |
| Certificate: the label under the signature line | Signed | A line for the grown-up to sign, which makes it feel real. |
| Certificate: the spoken name of the blank name line (screen readers only) | Name | Only when no name is set; the grown-up writes the name in. |

## New sentences: the dinner questions (pending owner approval)

Each question is shown to the grown-up to ask out loud. Keyed to the skills of the stops (the skill ids in brackets) and to a grade
range. Every one is meant to be answerable at the table with what is there: no screen, no paper, no wrong-answer pressure. The
"Why" column gives the stops it fits and the answer, so each one can be checked.

| Where | Proposed text | Why |
|---|---|---|
| Math: counting, comparing, even and odd (pk_count, pk_num, pk_more, cnt, tenf, eo, cmp, math:trace), Pre-K to 1st | How many forks are on the table? Can you count them for me? | Counting real things one by one, as in Count to 5 and Count to 10. Any number of forks works. |
| Math: counting, comparing, even and odd (pk_count, pk_num, pk_more, cnt, tenf, eo, cmp, math:trace), Pre-K to 1st | Are there more cups or more plates on the table? How can we tell? | Comparing two groups (More, Fewer, Same). The child can line them up to check. |
| Math: counting, comparing, even and odd (pk_count, pk_num, pk_more, cnt, tenf, eo, cmp, math:trace), K to 3rd | Is the number of people at the table even or odd? How do you know? | Even and odd with real people: pairs, or one left over. Any table size works. |
| Math: counting, comparing, even and odd (pk_count, pk_num, pk_more, cnt, tenf, eo, cmp, math:trace), K to 2nd | Can we count by 10s together, all the way to 100? | Skip counting by 10s (Count by 1s & 10s). Said together, so it is a game. |
| Math: place value and rounding (pv, round), 1st to 6th | What is the biggest number you can say? What number comes right after it? | Big numbers and the next number (Tens & Hundreds, Place Value). Every answer is fine; the follow-up is "add 1". |
| Math: place value and rounding (pv, round), 2nd to 6th | If dinner cost 47 dollars, is that closer to 40 dollars or 50 dollars? | Rounding (Round to 10). Answer: 50 dollars (47 is 3 from 50 and 7 from 40). |
| Math: adding and taking away (add, miss, sub, big), Pre-K to 2nd | If 4 people sit down to eat and 2 friends join them, how many plates do we need? | Adding a small group (Add to 5). Answer: 6 plates. |
| Math: adding and taking away (add, miss, sub, big), K to 2nd | If you have 7 grapes and eat 3, how many are left? | Taking away (Take Away). Answer: 4 grapes. |
| Math: adding and taking away (add, miss, sub, big), 1st to 3rd | What is 9 + 6? How did you work it out in your head? | A fact past 10 (+9 & Doubles) and how they thought. Answer: 15; "9 + 1 + 5" or "10 + 6 − 1" are both good ways. |
| Math: adding and taking away (add, miss, sub, big), 2nd to 5th | A bag has 25 cherries and we eat 8. How many are left? | Two-digit take away (2-Digit Take Away). Answer: 17 cherries. |
| Math: story problems (story), K to 6th | Can you make up a story problem about our dinner for me to solve? | The child makes the problem; the grown-up solves it. Turns the tables, no right answer. |
| Math: story problems (story), 2nd to 6th | We have 3 bowls with 5 strawberries in each. How many strawberries is that? | A two-step or times story (Story Problems 4 on). Answer: 15 strawberries. |
| Math: times and dividing (mult, arr, mfact, dfact, mbig, dbig, fact), 2nd to 4th | Everyone at the table has 2 hands. How many hands are at the table? | Equal groups of 2 (Equal Groups). Answer: 2 × the number of people. |
| Math: times and dividing (mult, arr, mfact, dfact, mbig, dbig, fact), 2nd to 6th | We have 12 cookies to share equally among 4 people. How many does each person get? | Sharing equally (Easy Dividing). Answer: 3 cookies each. |
| Math: times and dividing (mult, arr, mfact, dfact, mbig, dbig, fact), 2nd to 6th | An egg box holds 6 eggs. How many eggs are in 3 boxes? | Equal groups (Groups to 5×5). Answer: 18 eggs. |
| Math: times and dividing (mult, arr, mfact, dfact, mbig, dbig, fact), 3rd to 6th | Can you find a number of cookies that 2, 3 or 4 people could share equally? | Common multiples, kept concrete (Factors & Multiples). Answers: 12, 24, 36 and so on. |
| Math: fractions and decimals (frac, fop, dec), 1st to 6th | If we cut a pizza into 4 equal slices and you eat 1, what fraction did you eat? | The roadmap's own example (Equal Parts, Name the Fraction). Answer: 1/4, one quarter. |
| Math: fractions and decimals (frac, fop, dec), 1st to 4th | Would you rather have half of a sandwich or a quarter of it? Why? | Comparing unit fractions; a half is more. Any reason is good talk. |
| Math: fractions and decimals (frac, fop, dec), 3rd to 6th | Is three quarters of a glass of water more or less than half a glass? | Comparing with one half (Compare Fractions). Answer: more. |
| Math: fractions and decimals (frac, fop, dec), 4th to 6th | Milk costs 2 dollars and 50 cents. How would you write that with a decimal point? | Money as a decimal (Tenths & Hundredths). Answer: $2.50. |
| Math: patterns, ratios, integers and equations (pat, ooo, alg, ratio, int), Pre-K to 2nd | Can you make a pattern with things on the table, like fork, spoon, fork, spoon? What comes next? | Repeating patterns (What Comes Next). The child makes one and says what comes next. |
| Math: patterns, ratios, integers and equations (pat, ooo, alg, ratio, int), 2nd to 6th | I am thinking of a number. I add 5 and get 12. What is my number? | A missing number (Missing Number, One-Step Equations). Answer: 7. |
| Math: patterns, ratios, integers and equations (pat, ooo, alg, ratio, int), 4th to 6th | If 2 bottles of juice cost 6 dollars, how much do 4 bottles cost? | Ratios and unit rates (Ratios and Tables, Unit Rates). Answer: 12 dollars. |
| Math: patterns, ratios, integers and equations (pat, ooo, alg, ratio, int), 5th to 6th | It is 3 degrees outside and it gets 5 degrees colder. What is the temperature now? | Integers below zero (Integer Add & Subtract). Answer: minus 2 degrees (2 degrees below zero). |
| Math: measuring and graphs (meas, data), Pre-K to 2nd | Which is longer, a spoon or a fork? How could we check? | Comparing lengths (Measure). The child lines them up; either answer is fine if they check. |
| Math: measuring and graphs (meas, data), K to 3rd | About how many spoons long is the table? Shall we guess first? | Measuring with a unit (Measure with Cubes). A guess, then counting spoons together. |
| Math: measuring and graphs (meas, data), 1st to 6th | If we asked everyone at the table for their favorite food, how could we show the answers in a picture? | Picture and bar graphs (Picture Graphs, Bar Graphs). Any picture or tally is a good answer. |
| Math: time and money (time, coins), 1st to 6th | What time do you think it is now? How could we check? | Telling time (O'Clock to Time to the Minute). Looking at a clock together checks it. |
| Math: time and money (time, coins), 1st to 5th | If dinner starts at 6 o'clock and lasts half an hour, what time does it end? | Half past (Half Past). Answer: 6:30, half past 6. |
| Math: time and money (time, coins), 1st to 4th | Which coins could you use to make 25 cents? | Coins (Pennies & Nickels to Quarters). Answers: a quarter; 2 dimes and a nickel; 5 nickels; and more. |
| Math: time and money (time, coins), 2nd to 5th | Something costs 75 cents and you pay with a dollar. How much change do you get? | Making change (Making Change). Answer: 25 cents. |
| Math: shapes, position and geometry (shape, sort, pos, geo, ang, coord), Pre-K to 3rd | What shapes can you see on the table? | Naming shapes around them (Find the Shape, Sides & Corners). Plates are circles, napkins squares, and so on. |
| Math: shapes, position and geometry (shape, sort, pos, geo, ang, coord), Pre-K to 1st | What is next to your cup? What is under your plate? | Position words (Where Is It). Any true answer. |
| Math: shapes, position and geometry (shape, sort, pos, geo, ang, coord), 2nd to 6th | Can you find a square corner on the table? What else has one? | Right angles (Kinds of Angles, Shape Families). Table corners, napkins, phones and books have one. |
| Math: shapes, position and geometry (shape, sort, pos, geo, ang, coord), 3rd to 6th | How could we measure the distance all the way around the table? | Perimeter (Perimeter). Answer: measure each side and add them up. |
| Reading: letters, sounds, rhymes and syllables (abc, sound, rhyme, syl, pic, build, read:trace), Pre-K to 1st | What sound does "cup" start with? Can you find something else on the table that starts with that sound? | First sounds (First Sounds). Cup starts with the "k" sound; carrot, corn and cookie do too. |
| Reading: letters, sounds, rhymes and syllables (abc, sound, rhyme, syl, pic, build, read:trace), Pre-K to 2nd | Can you think of a word that rhymes with "spoon"? | Rhymes (Rhyme Time). Answers: moon, soon, noon, June, tune. |
| Reading: letters, sounds, rhymes and syllables (abc, sound, rhyme, syl, pic, build, read:trace), Pre-K to 2nd | How many claps are in "spaghetti"? Shall we clap it together? | Syllables (Clap the Syllables). Answer: 3 claps (spa-ghet-ti). |
| Reading: letters, sounds, rhymes and syllables (abc, sound, rhyme, syl, pic, build, read:trace), Pre-K to 1st | What letter does your name start with? Who else do we know whose name starts with it? | Letters and names (Big Letters). Any answer. |
| Reading: sight words and spelling (sight, spell), K to 2nd | Can you find a word you know on a box or a jar in the kitchen? | Sight words in the world (Sight Words). Words on a cereal box or jar count. |
| Reading: sight words and spelling (sight, spell), 1st to 3rd | Can you spell "plate" out loud? | Spelling a silent e word (Spell Silent E & Teams). Answer: p-l-a-t-e. |
| Reading: sight words and spelling (sight, spell), 2nd to 6th | Which word do you think is the hardest to spell? How do you remember it? | Spelling strategies (Spell Tricky Sounds on). Any word; how they remember it is the talk. |
| Reading: sentences and grammar (gram, sent), K to 1st | Can you say a whole sentence about your dinner, like "I like the rice"? | Saying a whole sentence (Read & Match, Read Sentences). Any sentence about the meal. |
| Reading: sentences and grammar (gram, sent), 1st to 6th | Can you tell me one sentence about your day that uses the word "because"? | Joining ideas in a sentence (Build Sentences, Sentence Craft). Any sentence with "because". |
| Reading: sentences and grammar (gram, sent), 1st to 4th | What is one action word for what we are doing right now? | Verbs (Parts of Speech). Answers: eating, talking, sitting, drinking. |
| Reading: sentences and grammar (gram, sent), 1st to 3rd | If you wrote "we ate dinner" as a sentence, how would it start and how would it end? | Capitals and end marks (Capitals & End Marks). Answer: a capital W and a period. |
| Reading: word meanings (vocab), K to 3rd | What is the opposite of "hot"? Is there something hot and something cold on the table? | Opposites (Opposites). Answer: cold. |
| Reading: word meanings (vocab), 1st to 6th | Can you think of another word for "yummy"? | Synonyms (Synonyms). Answers: tasty, delicious, good. |
| Reading: word meanings (vocab), 3rd to 6th | What does "I could eat a horse" mean? Does it really mean that? | Figurative language (Figurative Language). Answer: "I am very hungry"; it is not meant for real. |
| Reading: stories and reading to learn (comp, info), 1st to 6th | Who was in a story you read this week, and what happened to them? | Retelling a story (Story Time, Read a Story). Any story they read. |
| Reading: stories and reading to learn (comp, info), 1st to 6th | What was the best part of something you read this week? Why? | Opinion and reasons about a story or text. Any answer. |
| Reading: stories and reading to learn (comp, info), 2nd to 6th | What is one new fact you learned from your reading this week? | Informational text (Learn About It). Any fact. |
| Spanish: Spanish words (every other es_ skill), Pre-K to 6th | Can you teach me one Spanish word you learned this week? | The child is the teacher, which children love. Any word from the week. |
| Spanish: Spanish words (every other es_ skill), Pre-K to 6th | How do you say "hello" and "thank you" in Spanish? | Greetings (¡Hola!). Answers: hola and gracias. |
| Spanish: Spanish words (every other es_ skill), Pre-K to 6th | Can we count to 5 in Spanish together? | Numbers 1 to 10 (Numbers 1–10). Uno, dos, tres, cuatro, cinco. |
| Spanish: Spanish words (every other es_ skill), Pre-K to 6th | Can you name something on the table in Spanish? | Food, home and more (Food, Casa Dulce Casa). Any word they know, such as agua, pan or la mesa. |
| Spanish: Spanish sentences (es_phrase, es_art, es_ser, es_gusta, es_sent, es_story), Pre-K to 6th | Can you tell me in Spanish one food you like? It starts with "Me gusta". | Me gusta (Me Gusta). For example: Me gusta la pizza. |
| Spanish: Spanish sentences (es_phrase, es_art, es_ser, es_gusta, es_sent, es_story), Pre-K to 6th | Can you teach me one Spanish sentence from this week? | The child teaches a sentence. Any sentence from the week. |
| Spanish: Spanish sentences (es_phrase, es_art, es_ser, es_gusta, es_sent, es_story), Pre-K to 6th | How would you ask "How are you?" in Spanish? | Phrases (¿Cómo Estás?, Phrases). Answer: ¿Cómo estás? |
| Discover: living things (sci_life), K to 6th | Which food on the table came from a plant, and which came from an animal? | Living things and food (Living Things, Life Cycles & Food). Bread and apples come from plants, milk and eggs from animals. |
| Discover: living things (sci_life), K to 3rd | What does a plant need to grow? | Plant needs (Living Things). Answers: water, light, air and soil. |
| Discover: living things (sci_life), 2nd to 6th | Can you name an animal that eats plants and one that eats other animals? | Food chains (Life Cycles & Food, Cells & Ecosystems). A rabbit eats plants; a fox or an owl eats other animals. |
| Discover: Earth and sky (sci_earth), K to 6th | Is the Moon out tonight? What shape do you think it will be? | Sky and Moon (Sky & Earth). A look outside together; any shape they see is right. |
| Discover: Earth and sky (sci_earth), K to 4th | Where do you think rain comes from? | The water cycle (Water, Rocks & Moon). Rain falls from clouds, made of water that rose from the ground and the sea. |
| Discover: Earth and sky (sci_earth), 3rd to 6th | Why do you think we have day and night? | Day and night (Earth & Space). Answer: the Earth spins, so our side faces the Sun, then away. |
| Discover: pushes, pulls and matter (sci_phys), K to 3rd | Can you name something you push and something you pull? | Pushes and pulls (Push, Pull & Stuff). Push a chair in, pull a door open. |
| Discover: pushes, pulls and matter (sci_phys), K to 6th | What happens to an ice cube in a warm drink? Why? | Melting (Push, Pull & Stuff, Forces & Matter). It melts because the warm drink warms it. |
| Discover: pushes, pulls and matter (sci_phys), 3rd to 6th | What makes a rolling ball slow down and stop? | Friction (Forces & Matter). Answer: friction with the ground (and the air) slows it. |
| Discover: maps and places (geo_world, geo_us), K to 3rd | Can you tell me how to get from here to your school, like a map in words? | Maps and directions (Maps & Land). Any route in words. |
| Discover: maps and places (geo_world, geo_us), K to 6th | If you could visit any country, which one would you pick? What do you know about it? | Countries and places (Maps & Land, Grids & Climate). Any country. |
| Discover: maps and places (geo_world, geo_us), 3rd to 6th | What state do we live in? Do you know its capital city? | States and capitals (States & Capitals). The family knows the answer. |
| Discover: community and government (civ), K to 4th | Who are some helpers in our town? How do they help us? | Community helpers (Our Community). Firefighters, nurses, teachers, bus drivers. |
| Discover: community and government (civ), K to 6th | Why do you think we have rules, like stopping at a red light? | Why rules matter (Our Community, Government & Money). Answer: to keep people safe and fair. |
| Discover: community and government (civ), 3rd to 6th | If you were in charge of our town for a day, what is one thing you would do? | Government and choices (Government & Money). Any kind idea. |

{ math: 35, read: 16, es: 7, disc: 15 } count:4 pv:2 add:4 story:2 mult:4 frac:4 alg:4 meas:3 time:4 geo:4 phon:4 spell:3 gram:3 vocab:3 comp:3 esw:4 ess:3 life:3 earth:3 phys:3 place:3 civ:3

## Reused, already approved (no change)

The buttons Back and Print, the line "Make sure the tablet is online to share or print." and its offline message, the subject
names (Math, Reading, Spanish, Discover), the stop names on the maps, the pet's name, "your child" / "Your child" when no name is
set, and "The report card could not be drawn." All of them are already on the report card.
