/* Whistlestop teach12 v202. BUILT by tools/build.py from 52e-words.js, 52f-bench.js, 52g-drafted.js, d-teach-audio.js: never edit by hand.
   index.html v202 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v202.js. */
/* ---------- TEACH-2b: the words of the drafted lessons the owner has reviewed (part teach12) ----------
   BUILT by tools/build.py from docs/drafts/<stop>.md ("status: reviewed ...") for the scripts that name them (lsDraft, 52g-drafted.js):
   never edit by hand. A draft that is not reviewed is never here, so its lesson is not live. */
const LSW = {
  "add2": {"idea":"Make a ten first, or use a double.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill this frame with both colors. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Make a ten first, or use a double."],"together":["Build it on the frame. Fill the top ten first.","Look at the frame. How many in all?","Now just the numbers. Make a ten in your head."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon bridge needs boards. Add them up!"]},"reasons":{"off1":["I was one off. Count each one once."],"given":["I said a number I could see. Count them all."]},"home":"Ask {name}: \"What is 9 plus 6? How did you make a ten?\""},
  "add3": {"idea":"Make a ten to add bigger facts.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill this double frame. Use both colors. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Make a ten to add bigger facts."],"together":["Put in {a}, then {b} more. Fill a ten first.","Look at the frame. How many in all?","Add {a} and {b}. Make a ten in your head."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The reef shop counts shells. How many in all?"]},"reasons":{"off1":["I was one off. Count each one once."],"op":["I took away. This one adds!"]},"home":"Ask {name}: \"What is 8 plus 7? Can you make a ten first?\""},
  "add5": {"idea":"Look for a ten, then add the last number.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill the double frame. Use both colors. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Look for a ten, then add the last number."],"together":["Put in {a}, then {b}, then {k}.","Look at the frame. How many in all?","Add {a}, {b} and {k}. Look for a ten."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The clock tower needs bells. How many in all?"]},"reasons":{"given":["I left a number out. Add them all!"],"off1":["I was one off. Count each one once."]},"home":"Ask {name}: \"What is 4 and 6 and 3?\""},
  "add6": {"idea":"Ten more or ten less changes the tens digit.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Put in a rod, or take one away. Any way you like!"],"name":["You had {a}. Now you have {sum}.","Ten more or ten less changes the tens digit."],"together":["Start with {a}. Change it by {b}.","Look at the blocks. Which digit changes?","Do it in your head. Watch the tens."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The clock tower needs flags. Work them out in your head."]},"reasons":{"ten":["I counted the rod as one. A rod is ten!"],"op":["I did the wrong one. Look at the sign."]},"home":"Ask {name}: \"What is 45 plus 10? And 45 minus 10?\""},
  "arr1": {"idea":"Rows of the same size make an array.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Make any rows of dots you like."],"name":["You made {a} rows of {b}.","{a} rows of {b} is {sum} in all.","Rows of the same size make an array."],"together":["Make {a} rows of {b}. Rows go across.","Skip count the rows. How many in all?","Times means rows of. Skip count the rows."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The boat needs flags in rows. How many flags?"]},"reasons":{"given":["I said a number I could see. Count every dot!"],"off1":["I was one off. Skip count each row."]},"home":"Ask {name}: \"How many shells in 4 rows of 5?\""},
  "big1": {"idea":"A hundred is ten tens.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Make any number you like with the blocks."],"name":["You made {n}.","It has {top} hundreds, {tens} tens and {ones} ones.","A hundred is ten tens."],"together":["Add {a} and {b}. Count the rods or the flats.","Look at the blocks. Count by tens, or by hundreds.","Think in tens or hundreds, just like ones."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon trail needs steps. Add them up!"]},"reasons":{"ten":["I counted the tens like ones. A rod is ten!"],"given":["I said a number I could see. Add them both."]},"home":"Ask {name}: \"How many tens make one hundred?\""},
  "big2": {"idea":"Add the ones, then add the tens.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Put in blocks for {a} and {b}. Any way you like!"],"name":["You put in {tens} tens and {ones} ones.","Together they make {sum}.","Add the ones, then add the tens."],"together":["Let's add {a} and {b} with blocks.","Count the ones, then the tens.","Add the ones column, then the tens column."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The reef needs shells and rocks. Add them up!"]},"reasons":{"op":["I took away. Look at the sign: we add!"],"swap":["I swapped the tens and the ones. Tens go first."]},"home":"Ask {name}: \"What is 23 plus 14?\""},
  "big3": {"idea":"When the sum is ten or more we carry a ten.","beats":{"remember":["Do you remember this? Show me a ten and some ones."],"explore":["Look at these. Build them with blocks.","Put them together. Make a new pile for each ten."],"name":["We have {tens} tens and {ones} ones.","When the ones make ten we carry a ten."],"together":["Add these. The ones sum is more than {n}.","Write the ones. Carry the ten to the next column.","Add the tens. Do not forget the carried ten."],"check":["My turn. Check me!","I added and got {ans}. Am I right?"],"show":["The space station needs supplies. Add these loads.","Now add these big loads. Show me!"]},"reasons":{"nocarry":["Look again. I forgot to carry the ten from the ones."],"cat":["Oops. I wrote both column totals side by side."]},"home":"Ask {name}: \"What is 38 plus 47?\""},
  "big4": {"idea":"Add the ones, then the tens, then the hundreds.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Put in blocks for {a} and {b}. Any way you like!"],"name":["You put in {tens} tens and {ones} ones.","Together they make {sum}.","Add the ones, then the tens, then the hundreds."],"together":["Add {a} and {b} with the blocks.","Look at the blocks. Add each place.","Add in columns: ones, tens, then hundreds."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station needs power cells. Add them up!"]},"reasons":{"op":["I took away. Look at the sign: we add!"],"given":["I said a number I could see. Add them both."]},"home":"Ask {name}: \"What is 124 plus 135?\""},
  "big5": {"idea":"When the ones make ten or more, carry a ten.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Put in blocks for {a} and {b}. Any way you like!"],"name":["You put in {tens} tens and {ones} ones.","Together they make {sum}.","When the ones make ten or more, carry a ten."],"together":["Trade ten ones for a ten. Then check.","Look at the ones. More than {n}? Carry!","Add in columns. Carry the ten."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship needs supplies. Add these loads.","One more load for the ship. Add it up!"]},"reasons":{"nocarry":["I forgot to carry the ten from the ones."],"cat":["Oops. I wrote both column totals side by side."]},"home":"Ask {name}: \"What is 245 plus 317?\""},
  "cmp2": {"idea":"Look at the tens first to see which is bigger.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Use any blocks you like to make a number."],"name":["You made {n}.","It has {tens} tens and {ones} ones.","Look at the tens first to see which is bigger."],"together":["Make a number bigger than this one.","Look at the blocks for {a} and {b}.","Compare {a} and {b}. Tens first."],"check":["My turn. Check me!","I think {ans}. Am I right?"],"show":["The reef gate opens for the bigger number."]},"reasons":{"small":["I picked the smaller one. Look at the tens!"]},"home":"Ask {name}: \"Which is bigger, 67 or 76?\""},
  "cmp3": {"idea":"Look at the hundreds first to see which is bigger.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Use the flats, rods and cubes. Make any number you like!"],"name":["You made {n}.","It has {top} hundreds, {tens} tens and {ones} ones.","Look at the hundreds first to see which is bigger."],"together":["Make a number bigger than this one.","Look at the blocks for {a} and {b}.","Compare {a} and {b}. Hundreds first."],"check":["My turn. Check me!","I think {ans}. Am I right?"],"show":["The space station door opens for the bigger number."]},"reasons":{"small":["I picked the smaller one. Look at the hundreds!"]},"home":"Ask {name}: \"Which is bigger, 458 or 485?\""},
  "cnt2": {"idea":"Skip count to find how many.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Make equal groups any way you like."],"name":["You made {a} groups of {b}.","{a} groups of {b} is {sum}.","Skip count to find how many."],"together":["Help me make {a} groups of {b}.","Skip count the groups. How many in all?","Keep skip counting by {b}s."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The candy shop packs bags. Skip count them!"]},"reasons":{"given":["I said a number I could see. Count every dot!"],"off1":["I was one off. Skip count each group."]},"home":"Ask {name}: \"Count your fingers by fives. How many on two hands?\""},
  "coins1": {"idea":"Add what each coin is worth, not how many coins.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Fill your coin purse. Use any coins you like!"],"name":["You chose {n} coins.","They are worth {value} cents.","Add what each coin is worth, not how many coins."],"together":["Put {value} cents in the purse. Biggest coins first.","Look at the {n} coins. Count by what each is worth.","Add what each of the {n} coins is worth."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The reef shop needs coins. How many cents?"]},"reasons":{"count":["I counted the coins. Add what each one is worth!"]},"home":"Ask {name}: \"How many cents are three nickels and two pennies?\""},
  "coins2": {"idea":"Add what each coin is worth, not how many coins.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Put any coins you like in the purse. Any way is fine!"],"name":["You chose {n} coins.","They are worth {value} cents.","Add what each coin is worth, not how many coins."],"together":["Put {value} cents in the purse. Biggest coins first.","Look at the {n} coins. Count by what each is worth.","Add what each of the {n} coins is worth."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station shop needs coins. How many cents?"]},"reasons":{"count":["I counted the coins. Add what each one is worth!"]},"home":"Ask {name}: \"How much are a dime and two nickels?\""},
  "coins3": {"idea":"Add what each coin is worth, not how many coins.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Fill the purse with any coins you like from the tray."],"name":["You chose {n} coins.","They are worth {value} cents.","Add what each coin is worth, not how many coins."],"together":["Put {value} cents in the purse. Quarters first.","Look at the {n} coins. Count by what each is worth.","Add what each of the {n} coins is worth."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space shop takes quarters too. How many cents?"]},"reasons":{"count":["I counted the coins. Add what each one is worth!"]},"home":"Ask {name}: \"How much are three quarters worth?\""},
  "coins4": {"idea":"A dollar is worth a hundred cents.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Fill your purse with any coins you like."],"name":["You chose {n} coins.","They are worth {value} cents.","A dollar is worth a hundred cents."],"together":["Put {value} cents in the purse. Biggest coins first.","Look at the money. Count the dollar first.","Add what each one is worth."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship needs money for the trip. How many cents?"]},"reasons":{"count":["I counted the coins. Add what each one is worth!"]},"home":"Ask {name}: \"How much is a quarter, a dime and a nickel?\""},
  "coins5": {"idea":"Change is what is left of a dollar after the price.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Fill your purse with any coins you like."],"name":["You chose coins worth {value} cents.","You used {n} coins.","Change is what is left of a dollar after the price."],"together":["It costs {a} cents. Count up to a dollar.","It costs {a} cents. You pay a dollar.","A dollar is a hundred cents. Take away the price."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The shell shop gives change. How much?","The boat shop gives change too. How much?"]},"reasons":{"col":["I took the small from the big. Top take away bottom!"],"keep":["I borrowed a ten but did not take it away."]},"home":"Ask {name}: \"If a toy costs 65 cents, how much change from a dollar?\""},
  "miss2": {"idea":"Count on from one part to the whole.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill this frame with both colors. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Count on from one part to the whole."],"together":["There are {a}. Put in more to make {t}.","Count the empty boxes up to {t}.","Count on from {a} to {t}."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon path needs stones. How many more?"]},"reasons":{"op":["I added both numbers. We need the missing part."],"given":["I said a number I could see. Count on to find it."]},"home":"Ask {name}: \"I have 9 grapes. How many more make 15?\""},
  "mult1": {"idea":"Equal groups have the same number in each group.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Make any equal groups you like."],"name":["You made {a} groups of {b}.","{a} groups of {b} is {sum} in all.","Equal groups have the same number in each group."],"together":["Let's make {a} groups of {b} stars.","Skip count by {b}s. How many in all?","Add {b} again and again."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station packs supplies in equal groups. How many?"]},"reasons":{"given":["I said a number I could see. Count every dot!"],"off1":["I was one off. Skip count each group."]},"home":"Ask {name}: \"How many toys in 3 groups of 4?\""},
  "mult2": {"idea":"Skip count equal groups to find how many.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Make any equal groups you like with the dots."],"name":["You made {a} groups of {b}.","{a} groups of {b} is {sum} in all.","Skip count equal groups to find how many."],"together":["Let's make {a} groups of {b}.","Skip count by {b}s. How many in all?","Times means groups of. Skip count by {b}s."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station stacks power cells in equal groups."]},"reasons":{"given":["I said a number I could see. Count every dot!"],"off1":["I was one off. Skip count each group."]},"home":"Ask {name}: \"Show 4 groups of 3 fingers. How many fingers?\""},
  "pv2": {"idea":"Each digit's place tells what it is worth.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Make any number you like with the blocks."],"name":["You made {n}.","It has {top} hundreds, {tens} tens and {ones} ones.","Each digit's place tells what it is worth."],"together":["Make {n} with blocks. Flats, rods, then cubes.","Count the flats, the rods, then the cubes.","Look at {n}. Find the place of the digit."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship's map has numbers. What is each digit worth?"]},"reasons":{"given":["I said the digit. Its place makes it worth more!"],"swap":["I swapped the tens and the ones. Look again."]},"home":"Ask {name}: \"What is the 5 worth in 352?\""},
  "pv3": {"idea":"A number is its hundreds plus its tens plus its ones.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Use the blocks. Make any number you like."],"name":["You made {n}.","It has {top} hundreds, {tens} tens and {ones} ones.","A number is its hundreds plus its tens plus its ones."],"together":["Build {n} from its parts with blocks.","Count the flats, the rods, then the cubes.","Put the parts together into one number."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The map shows the treasure in parts. Put them together!"]},"reasons":{"given":["I only said one part. Add all the parts!"],"swap":["I swapped the tens and the ones. Look again."]},"home":"Ask {name}: \"What is 200 plus 40 plus 3?\""},
  "sub2": {"idea":"Take away to ten first, then the rest.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Use both colors on the double frame. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Take away {b} and {a} are left."],"together":["Start with {a}. Take away {b}.","Look at the frame. How many are left?","{a} take away {b}. Go back to ten first."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon shop sells candy. How many are left?"]},"reasons":{"op":["I added. We are taking away!"],"off1":["I was one off. Count what is left again."]},"home":"Ask {name}: \"We had 12 candies and ate 5. How many are left?\""},
  "sub3": {"idea":"Take away the ones, then take away the tens.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Here are {a}. Take some away. Any way you like!"],"name":["You had {a}. You took {b}. {diff} are left.","Take away the ones, then take away the tens."],"together":["Take {b} away from {a}. Ones first.","Look at the blocks for {a}. What is left?","Take away in columns: ones, then tens."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["Shells float away from the reef. How many are left?"]},"reasons":{"op":["I added. We are taking away!"],"given":["I said a number I could see. Find what is left."]},"home":"Ask {name}: \"What is 45 take away 20?\""},
  "sub4": {"idea":"Break a ten when there are not enough ones.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Here are {a}. Take away as many as you like."],"name":["You had {a}. You took {b}. {diff} are left.","No more ones? Break a ten into ten ones."],"together":["Take {b} from {a}. Break a ten if you need to.","Look at {a}. Are there enough ones?","Write it in columns. Ones first."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station needs power. Take these away.","One more job for the station. Take these away."]},"reasons":{"col":["I took the small from the big. Top take away bottom!"],"keep":["I broke a ten, but kept the tens the same."]},"home":"Ask {name}: \"What is 52 take away 37?\""},
  "sub5": {"idea":"Break a ten when there are not enough ones.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Here are {a}. Take away as many as you like."],"name":["You had {a}. You took {b}. {diff} are left.","No more ones? Break a ten into ten ones."],"together":["Take {b} from {a}. Break a ten if you need.","Look at {a}. Are there enough ones?","Take away in columns: ones, tens, then hundreds."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship unloads supplies. How many are left?","One more load comes off. How many are left?"]},"reasons":{"col":["I took the small from the big. Top take away bottom!"],"keep":["I broke a ten, but kept the tens the same."]},"home":"Ask {name}: \"What is 243 take away 158?\""},
  "time1": {"idea":"The short hand shows the hour.","beats":{"remember":["Do you remember counting on?"],"explore":["Move the hands. Make any time you like."],"name":["Look at your clock.","You set {time}.","The short hand shows the hour."],"together":["Set the clock to {time}. Short hand first.","Look at the short hand. What time is it?","Think of the clock at {time}."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The boat needs a time to leave. Set the clock!","The fish need a time to eat. Set the clock!"]},"reasons":{"hands":["I mixed up the hands. The short hand shows the hour."]},"home":"Ask {name}: \"Can you show me 5 o'clock on our clock?\""},
  "time2": {"idea":"Half past: the long hand points straight down.","beats":{"remember":["Do you remember this? Set an o'clock time."],"explore":["Move the hands to show any time you like."],"name":["You set {time}.","The short hand shows the hour.","Half past: the long hand points straight down."],"together":["Set the clock to {time}. Watch the long hand.","Look at the long hand. Is it up or down?","Think of the clock at {time}."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The crab wakes up soon. Set the clock!","The fish eat soon. Set the clock!"]},"reasons":{"hands":["I mixed up the hands. The long hand shows the minutes."]},"home":"Ask {name}: \"Where does the long hand point at half past 4?\""},
  "time3": {"idea":"The long hand shows the minutes past the hour.","beats":{"remember":["Do you remember this? Set an o'clock time."],"explore":["Move the hands on this clock. Set any time you like!"],"name":["You set {time}.","The short hand shows the hour.","The long hand shows the minutes past the hour."],"together":["Set the clock to {time}. Long hand for minutes.","Look at the long hand. Count the minutes.","Think of the clock at {time}."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship leaves soon. Set the clock!","The space walk starts soon. Set the clock!"]},"reasons":{"hands":["I mixed up the hands. The long hand shows the minutes."]},"home":"Ask {name}: \"What time does our clock show right now?\""},
  "time4": {"idea":"The long hand shows the minutes past the hour.","beats":{"remember":["Do you remember this? Set an o'clock time."],"explore":["Move the hands. Set any time you like."],"name":["You set {time}.","The short hand shows the hour.","The long hand shows the minutes past the hour."],"together":["Set the clock to {time}. Long hand for minutes.","Look at the long hand. Count the minutes.","Think of the clock at {time}."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship sails soon. Set the clock!","Another ship sails soon. Set the clock!"]},"reasons":{"hands":["I mixed up the hands. The long hand shows the minutes."]},"home":"Ask {name}: \"Can you show me 4:25 on our clock?\""},
};
/* ---------- TEACH-2b: the workbench pieces the grade 1 and 2 lessons build on (part teach12, after teach; TEACH-PLAN-2 system B) ----------
   Added as keys of K2MM (49b-kinds2.js) from here, so Practice and its questions never change. Each draws cheap inline SVG with the
   VIZ classes (32-viz.css), and its controls are the make kind's stepper buttons (48 px, keyboard and touch tested).
     b10r    base-ten blocks with regrouping: up to 19 in a place, and two trade buttons a place: "10 ones -> 1 ten" (a ten made from
             ten ones) and "1 ten -> 10 ones" (a ten broken up). State: counts, biggest place first ([tens, ones] or
             [hundreds, tens, ones]); raw (the lesson gets the state, so a checker can ask for ones of 9 or fewer). A start state q.s0
             puts both numbers' blocks in (adding) or the number to take from (taking away).
     groups  equal groups: circles with dots in them, a stepper for the groups and one for how many in each. State [groups, in each]; raw.
     hands   the clock with its two hands named on their steppers ("Short hand: the hour", "Long hand: the minutes"), drawn bigger;
             the clock model's behaviour otherwise (the minutes carry the hour hand). Value 'h:mm', compared exactly.
   The coin purse (coins), the array and the ten frames are the make kind's own. Every model here also tells the lesson how to show
   an answer on it (of: value -> state) and which answers it can show (fits), for the pet's work in Check me. */
const lsPlace = ['hundreds', 'tens', 'ones'];
// blocks for counts s (biggest place first; a place may hold up to 19), the last o.b of each place in the second colour
function lsBlocks(s, o = {}) {
  const p = s.length == 3 ? 7 : 10, c = p - 1, S = 10 * p + 1, sg = Math.round(p / 2), G = 2 * p, P = 2, b2 = o.b || [];
  const L = s.length == 3 ? s : [0].concat(s), [H, T, U] = L, B2 = b2.length == 3 ? b2 : [0].concat(b2);
  let bg = '', bg2 = '', cells = '', x = P;
  const tall = Math.max(H ? Math.ceil(H / 3) * (S + p) - p : 0, T ? S : 0, U ? Math.min(U, 5) * (p + 1 + sg) - sg : 0, p + 1);
  const bot = P + tall, blk = (bx, by, bw, bh, two) => { const d = `M${bx} ${by}h${bw}v${bh}h${-bw}z`; if (two) bg2 += d; else bg += d; };
  for (let i = 0; i < H; i++) {
    const bx = x + (i % 3) * (S + p), by = bot - S - Math.floor(i / 3) * (S + p);
    blk(bx, by, S, S, i >= H - (B2[0] || 0));
    for (let r = 0; r < 10; r++) cells += `M${bx + 1} ${by + 1 + r * p + c / 2}h${10 * p}`;
  }
  if (H) x += Math.min(H, 3) * (S + p) - p + G;
  for (let i = 0; i < T; i++) {
    const bx = x + i * (p + 1 + sg) + Math.floor(i / 5) * p;
    blk(bx, bot - S, p + 1, S, i >= T - (B2[1] || 0));
    cells += `M${bx + 1 + c / 2} ${bot - S + 1}v${10 * p}`;
  }
  if (T) x += T * (p + 1 + sg) - sg + Math.floor((T - 1) / 5) * p + G;
  for (let i = 0; i < U; i++) {
    const bx = x + Math.floor(i / 5) * (p + 1 + sg), by = bot - (i % 5 + 1) * (p + 1) - (i % 5) * sg;
    blk(bx, by, p + 1, p + 1, i >= U - (B2[2] || 0));
    cells += `M${bx + 1} ${by + 1 + c / 2}h${p}`;
  }
  if (U) x += Math.ceil(U / 5) * (p + 1 + sg) - sg + G;
  const w = Math.max(x - G + P, 2 * P + p + 1), h = tall + 2 * P;
  const body = (bg ? `<path class="vb" d="${bg}"/>` : '') + (bg2 ? `<path class="ls-b2" d="${bg2}"/>` : '')
    + (cells ? `<path class="vc" stroke-width="${c}" stroke-dasharray="${c} 1" d="${cells}"/>` : '');
  return `<svg class="viz viz-b10" viewBox="0 0 ${w} ${h}" style="--vw:${w}" role="img" aria-label="base ten blocks">${body}</svg>`;
}
// a number's blocks as counts ([tens, ones] or [hundreds, tens, ones])
const lsDigits = (n, pl) => String(n).padStart(pl, '0').slice(-pl).split('').map(Number);
// equal groups: g circles of n dots (at most 5 circles a row)
function lsGroupsSvg(g, n) {
  const per = Math.min(g, 5), cols = n <= 4 ? 2 : n <= 9 ? 3 : 4, rows = Math.ceil(n / cols), d = 14, R = Math.max(cols, rows) * d / 2 + 9;
  const W = per * (2 * R + 8) + 4, H = Math.ceil(g / per) * (2 * R + 8) + 4;
  let ring = '', dots = '';
  for (let k = 0; k < g; k++) {
    const cx = 4 + (k % per) * (2 * R + 8) + R, cy = 4 + Math.floor(k / per) * (2 * R + 8) + R;
    ring += `<circle class="vo" cx="${cx}" cy="${cy}" r="${R}"/>`;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols), inRow = Math.min(cols, n - r * cols), x = cx + (i % cols - (inRow - 1) / 2) * d, y = cy + (r - (rows - 1) / 2) * d;
      dots += `M${x} ${y}h.01`;
    }
  }
  return `<svg class="viz viz-grp" viewBox="0 0 ${W} ${H}" style="--vw:${W}" role="img" aria-label="equal groups">${ring}`
    + `<path class="ls-gd" stroke-width="11" stroke-linecap="round" d="${dots}"/></svg>`;
}
if (typeof K2MM != 'undefined') {
  const trade = (i, d, l) => `<button class="mmb ls-tr" data-i="${i}" data-d="${d}" aria-label="${l}">${esc(l)}</button>`;
  K2MM.b10r = {
    raw: true,
    s0: q => Array(q.m.places).fill(0),
    val: (q, s) => s.reduce((a, x) => a * 10 + x, 0),
    ans: q => lsDigits(q.ans, q.m.places),
    // i < places: a stepper (one block in or out, 0 to 19); i 10 + k: trade ten of place k for one of place k - 1 (d 1), or break one of
    // place k - 1 into ten of place k (d -1)
    step: (q, s, i, d) => {
      const o = s.slice();
      if (i < 10) { o[i] += d; return o[i] < 0 || o[i] > 19 ? null : o; }
      const k = i - 10;
      if (d > 0) { if (o[k] < 10 || o[k - 1] >= 19) return null; o[k] -= 10; o[k - 1]++; }
      else { if (o[k - 1] < 1 || o[k] > 9) return null; o[k - 1]--; o[k] += 10; }
      return o;
    },
    draw: (q, s) => lsBlocks(s),
    ctl: q => {
      const pl = q.m.places, n = lsPlace.slice(3 - pl), cap = w => w[0].toUpperCase() + w.slice(1);
      return `<div class="mmc mmcol">${n.map((l, i) => mmRow(cap(l), i, true)).join('')}<div class="mms ls-trs">`
        + n.slice(1).map((l, j) => trade(10 + j + 1, 1, `10 ${l} → 1 ${n[j].slice(0, -1)}`) + trade(10 + j + 1, -1, `1 ${n[j].slice(0, -1)} → 10 ${l}`)).join('') + '</div></div>';
    },
    of: (q, v) => lsDigits(v, q.m.places),
    fits: (q, v) => Number.isInteger(+v) && +v >= 0 && +v < Math.pow(10, q.m.places),
  };
  K2MM.groups = {
    raw: true,
    s0: () => [1, 1],
    val: (q, s) => s[0] * s[1],
    ans: q => [q.m.g, q.m.n],
    step: (q, s, i, d) => (s[i] + d < 1 || s[i] + d > (i ? 10 : 6) ? null : s.map((x, j) => (j == i ? x + d : x))),
    draw: (q, s) => lsGroupsSvg(s[0], s[1]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Groups', 0, true)}${mmRow('In each', 1, true)}</div>`,
    of: (q, v) => [q.m.g, Math.round(+v / q.m.g)],
    fits: (q, v) => Number.isInteger(+v / q.m.g) && +v / q.m.g >= 1 && +v / q.m.g <= 10,
  };
  K2MM.hands = Object.assign({}, K2MM.clock, {
    draw: (q, s) => VIZ.clock(s[0], s[1]).replace(/--vw:[\d.]+/, '--vw:220'),
    ctl: q => `<div class="mmc mmcol">${mmRow('Short hand: hour', 0, false).replace('<span class="mml">', '<span class="mml"><i class="ls-hh" aria-hidden="true"></i>')}`
      + `${mmRow('Long hand: minutes', 1, false, q.m.one ? [1, 5] : [5]).replace('<span class="mml">', '<span class="mml"><i class="ls-mh" aria-hidden="true"></i>')}</div>`,
    of: (q, v) => String(v).split(':').map(Number),
    fits: (q, v) => { const m = /^(1[0-2]|[1-9]):([0-5]\d)$/.exec(String(v)); return !!m && (q.m.one || +m[2] % 5 == 0); },
  });
  K2MM.clock.of = K2MM.hands.of;
  K2MM.clock.fits = K2MM.hands.fits;
  K2MM.coins.of = (q, v) => mmGreedy(q.m.types, +v);
  K2MM.b10.of = (q, v) => lsDigits(v, q.m.places);
  K2MM.b10.fits = (q, v) => Number.isInteger(+v) && +v > 0 && +v < Math.pow(10, q.m.places);
  K2MM.coins.fits = (q, v) => Number.isInteger(+v) && +v > 0 && mmSum(mmGreedy(q.m.types, +v)) <= 12;
  // the hands model is the clock to the make kind's checks, its first-miss words and its spoken answer
  const asClock = q => (q && q.model == 'hands' ? Object.assign({}, q, {model: 'clock'}) : q), MK = KIND.make;
  const v0 = MK.validate, r0 = MK.retry, s0 = MK.spoken;
  MK.validate = q => v0(asClock(q));
  MK.spoken = q => s0(asClock(q));
  MK.retry = (q, st) => { r0(asClock(q), st); if (q.model == 'hands') MK.draw(q, st); };
}
// the checkers the new models use (LSGOAL, 52b-know.js): a raw state, or a value for the simulated children of tools/test.js
const lsVal = (q, v) => (Array.isArray(v) ? K2MM[q.model].val(q, v) : +v);
Object.assign(LSGOAL, {
  // the target with every place 9 or fewer (traded): 4 tens and 15 ones is 55, but not yet traded
  regroup: (q, v) => Array.isArray(v) && lsVal(q, v) == q.m.target && v.every(x => x <= 9),
  value: (q, v) => lsVal(q, v) == q.m.target,
  fewer: (q, v) => lsVal(q, v) < lsVal(q, q.s0) && lsVal(q, v) >= 0,
  groups: (q, v) => (Array.isArray(v) ? v[0] == q.m.g && v[1] == q.m.n : +v == q.m.g * q.m.n),
  eqgrp: (q, v) => (Array.isArray(v) ? v[0] >= 2 && v[1] >= 2 : +v >= 4),
  moved: (q, v) => String(Array.isArray(v) ? K2MM[q.model].val(q, v) : v) !== String(K2MM[q.model].val(q, K2MM[q.model].s0(q))),
});
/* ---------- TEACH-2b: the grade 1 and 2 math lessons whose words were drafted (part teach12, after teach; TEACH-PLAN-2 batch 2) ----------
   A drafted lesson is two halves. The CODE is here: the stop, the questions at each stage (build, picture, symbols) with every number
   chosen by code, the open task of Explore, the picture of Name it, the misconception codes the pet may show, and a warm-up on the
   idea the stop builds on. The WORDS are a draft in docs/drafts/<stop>.md (tools/author.js --draft): the idea, the lines of the six
   beats, the pet's reasons, tonight's question. Words are lines with {slots}; the code fills each slot from the moment's numbers
   (q.sl for a question, ctx for what the child built), so a draft cannot state a wrong number.
   The gate: a draft is only words until the owner has read it. tools/build.py writes 52e-words.js (LSW) from the drafts marked
   "status: reviewed ..." and nothing else; lsDraft() makes a lesson live (LESSONS, LS_IDS) only when its words are in LSW. So a
   reviewed draft goes live at the next build, and an unreviewed one cannot ship (tools/author.js --approve marks drafts reviewed).
   Every script also says what its words are for (brief) and which slots each beat may use (slots); tools/author.js gives both to the
   drafting model and checks every draft against them.
   The questions carry their numbers for the computed misconception codes (52b-know.js): q.ab [a, b, '+' | '-'], q.coins, q.hm. */
const LS_DRAFTED = {};
// a drafted script: its code now, its words when reviewed (LSW from 52e-words.js)
function lsDraft(id, D) {
  D.id = id;
  LS_DRAFTED[id] = D;
  if (typeof LSW != 'undefined' && LSW[id]) lsEnable(id, LSW[id]);
}
// make a drafted script a live lesson with words W (the draft's JSON); tools/test.js uses this to run unreviewed drafts in Node only
function lsEnable(id, W) {
  const D = LS_DRAFTED[id];
  if (!D || !W || !W.beats) return null;
  const B = W.beats, L = {sk: D.sk, lv: D.lv, t: D.t, test: D.test, bugs: D.bugs, petSt: D.petSt, w: W, idea: W.idea, home: W.home, q: D.q, warm: D.warm,
    exp: r => {
      // the draft's Explore lines: the last is the task as said with the model (q.say), any before it are said first
      const e = D.exp(r), t = [].concat(B.explore || []).map(x => lsFill(x, e.q.sl)).filter(Boolean);
      if (t.length) { e.q.say = t.pop(); e.lines = t; }
      return e;
    },
    name: (c, r) => { const n = D.name(c, r); return {html: n.html, lines: [].concat(B.name || []).map(x => lsFill(x, n.sl)).filter(Boolean)}; }};
  LESSONS[id] = L;
  if (!LS_IDS.includes(id)) LS_IDS.push(id);
  return L;
}
const lsSk = (id, D) => Object.assign(D, {sk: id.replace(/\d+$/, ''), lv: +id.match(/\d+$/)[0]});
// a question of a drafted lesson (grade 1 and 2: the normal sizes, not Kindergarten's)
const lsDq = (D, st, o) => lsQ(D.sk, D.lv, st, Object.assign({pk: false}, o));
const lsCap = t => `<div class="sub">${t}</div>`;
const lsSeqQ = (D, st, s, k, say) => lsDq(D, st, {kind: 'num', ans: s + 3 * k, html: `<div class="seq">${s}, ${s + k}, ${s + 2 * k}, ${lsQm}</div>${SLOT}`,
  say: say || `Count by ${k}s. ${s}, ${s + k}, ${s + 2 * k}, what comes next?`, sl: {k}, bug: {off1: [s + 2 * k + 1]},
  hint: {k: 'text', s: `Count on ${k} more from ${s + 2 * k}.`}});
// the warm-ups (Remember, when nothing older is due): make a number with blocks; make ten; skip count; set an o'clock time
const lsWarmB10 = (D, lo, hi) => r => { const n = lsRi(r, lo, hi); return lsDq(D, 0, {kind: 'make', model: 'b10', m: {places: n > 99 ? 3 : 2}, eq: 'value', ans: n,
  html: lsEq(n) + lsCap(`Make ${n} with blocks.`), say: `Make ${n} with blocks.`, sl: {n}, hint: {k: 'text', s: 'Rods are tens. Little cubes are ones.'}}); };
const lsWarmTen = D => r => { const f = lsRi(r, 2, 8); return lsDq(D, 0, {kind: 'make', model: 'frame', m: {total: 10, fixed: f}, eq: 'value', ans: 10 - f,
  html: lsCap(`There are ${f}. Fill it to make 10.`), say: `There are ${f}. Put in more to make 10.`, sl: {n: f}, bug: {given: [f]}, hint: lsFrameHint(f, 10, {}, 'Count the empty boxes.')}); };
const lsWarmSeq = (D, k) => r => lsSeqQ(D, 0, k * lsRi(r, 1, 5), k);
const lsWarmHour = D => r => { const h = lsRi(r, 1, 11); return lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans: h + ':00', ansSay: mmTimeSay(h, 0), hm: [h, 0],
  html: lsEq(h + ':00') + lsCap('Set the clock.'), say: `Show ${h} o'clock.`, sl: {hour: h, min: 0, time: mmTimeSay(h, 0)}, hint: {k: 'text', s: 'The long hand points to the 12.'}}); };

/* ---- adding with blocks: 2-Digit Adding (no ten to carry), Carry the 1, 3-Digit Adding, Add 3-Digit Numbers (with carrying) ----
   Stage 0 builds the sum on the regrouping blocks: with carrying, both numbers' blocks start in and the child trades ten ones for a
   ten (goal regroup); stage 1 the two numbers' blocks in two colours and a typed sum; stage 2 the sum written in columns. */
const LS_BRIEF_ADD = `Explore: the child sees two numbers and puts their blocks in (rods are tens, little cubes ones), any way. Lines: the task, said while they build (slots {a} {b}).
Name it: the blocks of the sum, traded so every place has nine or fewer; lines about what they built (slots {a} {b} {sum} {tens} {ones}: the tens and ones they put in, maybe more than nine ones) and the idea.
Together (slots {a} {b} {n}, where {n} is nine: "more than {n}" means ten or more): line 1 before a build (the sum with blocks; with carrying, both numbers' blocks are in and they trade ten ones for a ten), line 2 before a picture (the blocks; they type the sum), line 3 before the sum in columns.
Remember: a warm-up: make a number with rods and cubes (slot {n}).
Show: two sums in columns to type, no help, inside a job in the world (slots {a} {b}).`;
function lsAddStop(id, t, pl, carry, bugs) {
  const D = lsSk(id, {t, test: 2, bugs, brief: LS_BRIEF_ADD, slots: {remember: ['n'], explore: ['a', 'b'], name: ['a', 'b', 'sum', 'tens', 'ones'], together: ['a', 'b', 'n'], check: ['ans'], show: ['a', 'b']}});
  // two numbers of pl digits whose ones (and, for 3 digits, sometimes tens) make a ten when carry; never a ten when not
  const pick = r => {
    for (;;) {
      const lo = pl == 2 ? 11 : 101, hi = pl == 2 ? 88 : 898, a = lsRi(r, lo, hi), b = lsRi(r, lo, Math.min(hi, (pl == 2 ? 99 : 999) - a));
      if (b < lo) continue;
      const x = lsDigits(a, pl), y = lsDigits(b, pl), c = x.map((v, i) => v + y[i]), co = c[pl - 1] >= 10;
      if (carry ? co && a % 10 && b % 10 : c.every(v => v <= 9)) return [a, b];
    }
  };
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a + b, sl = {a, b, n: 9, sum: c}, ab = [a, b, '+'], hint = {k: 'html', w: 'Add the ones first. Ten ones make a ten.',
      // fixRev (v184): the two numbers' blocks in two colours, as Together's picture, not the sum's blocks
      html: `<div class="pkhint">${lsBlocks(lsDigits(a, pl).map((v, i) => v + lsDigits(b, pl)[i]), {b: lsDigits(b, pl)})}<div>Add the ones first. Ten ones make a ten.</div></div>`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'regroup', eq: 'value', ans: c, ab, sl, hint,
      s0: carry ? lsDigits(a, pl).map((v, i) => v + lsDigits(b, pl)[i]) : null,
      html: lsEq(`${a} + ${b}`) + lsCap(carry ? 'All the blocks are in. Trade ten ones for a ten.' : 'Make the answer with blocks.'),
      say: carry ? `${a} plus ${b}. Trade ten ones for a ten, then check.` : `${a} plus ${b}. Make the answer with blocks.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, pl).map((v, i) => v + lsDigits(b, pl)[i]), {b: lsDigits(b, pl)})}</div>`
      + lsEq(`${a} + ${b} = ${SLOT}`), say: `${a} plus ${b} equals what?`});
    const m = mathQ(a, '+', b, c, 'c', true);
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, hint, html: m.html, say: m.say});
  };
  D.warm = lsWarmB10(D, pl == 2 ? 11 : 101, pl == 2 ? 49 : 499);
  D.exp = r => {
    const [a, b] = pick(r), c = a + b;
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'value', eq: 'value', ans: c, sl: {a, b},
      html: lsEq(`${a} + ${b}`) + lsCap(`Put in ${a}, then ${b}.`), say: `Put in blocks for ${a} and ${b}.`}), nudge: `Put in ${a} and ${b}, then check.`,
    react: v => { const s = Array.isArray(v) ? v : lsDigits(v, pl); return {ctx: {a, b, sum: c, tens: s[pl - 2], ones: s[pl - 1]}, lines: [`${a} and ${b} make ${c}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.sum, pl))}</div>` + lsEq(`${c.a} + ${c.b} = ${c.sum}`), sl: c});
  return D;
}

/* ---- taking away with blocks: 2-Digit Take Away (no ten to break), Borrowing, Take Away 3-Digit; and Mental Math (+ or - ten, or a
   few ones) ---- Stage 0 starts with the first number's blocks and the child takes the second away (breaking a ten when the ones run
   out); stage 1 the blocks and a typed answer; stage 2 the columns. */
const LS_BRIEF_SUB = `Explore: the child has a number's blocks (rods are tens, cubes ones) and takes away as many as they like.
Lines: the task, said while they work (slots {a}: the blocks they start with).
Name it: the blocks left; lines on what they did (slots {a} {b} {diff}: they had {a}, took {b}, {diff} are left) and the idea.
Together (slots {a} {b}): line 1 before a build (take {b} away from {a}'s blocks; when there are not enough ones, they break a ten into ten ones), line 2 before a picture ({a}'s blocks; they type what is left), line 3 before the problem in columns.
Remember: a warm-up: make a number with rods and cubes (slot {n}).
Show: two take-aways in columns to type, no help, inside a job in the world (slots {a} {b}).`;
function lsSubStop(id, t, pl, borrow, bugs) {
  const D = lsSk(id, {t, test: 2, bugs, brief: LS_BRIEF_SUB, slots: {remember: ['n'], explore: ['a'], name: ['a', 'b', 'diff'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => {
    for (;;) {
      const lo = pl == 2 ? 21 : 201, a = lsRi(r, lo, pl == 2 ? 98 : 989), b = lsRi(r, pl == 2 ? 11 : 101, a - 1), x = lsDigits(a, pl), y = lsDigits(b, pl);
      const need = x[pl - 1] < y[pl - 1], tens = x.slice(0, pl - 1).every((v, i) => v >= y[i] + (i == pl - 2 && need ? 1 : 0));
      if (borrow ? need && tens && a - b >= 10 : !x.some((v, i) => v < y[i])) return [a, b];
    }
  };
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a - b, sl = {a, b, diff: c}, ab = [a, b, '-'], hint = {k: 'html', w: 'Take away the ones first. Not enough? Break a ten.',
      html: `<div class="pkhint">${lsBlocks(lsDigits(a, pl))}<div>Take away the ones first. Not enough? Break a ten.</div></div>`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'value', eq: 'value', ans: c, ab, sl, hint, s0: lsDigits(a, pl),
      html: lsEq(`${a} − ${b}`) + lsCap(`Take away ${b}.`), say: `${a} take away ${b}. Take the blocks away.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, pl))}</div>` + lsEq(`${a} − ${b} = ${SLOT}`),
      say: `${a} minus ${b} equals what?`});
    const m = mathQ(a, '-', b, c, 'c', true);
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, hint, html: m.html, say: m.say});
  };
  D.warm = lsWarmB10(D, pl == 2 ? 21 : 201, pl == 2 ? 89 : 899);
  D.exp = r => {
    const a = pick(r)[0];
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl}, s0: lsDigits(a, pl), goal: 'fewer', eq: 'value', ans: a - 1, sl: {a},
      html: lsEq(a) + lsCap('Take some away!'), say: `Here are ${a}. Take away as many as you like.`}), nudge: 'Tap minus to take blocks away.',
    react: v => { const d = lsVal({model: 'b10r', m: {places: pl}}, v); return {ctx: {a, b: a - d, diff: d}, lines: [`${a} take away ${a - d} leaves ${d}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.diff, pl))}</div>` + lsEq(`${c.a} − ${c.b} = ${c.diff}`), sl: c});
  return D;
}
const LS_BRIEF_MENT = `Explore: the child has a number's blocks (rods are tens, cubes ones) and puts in or takes away one rod, any way (slot {a}).
Name it: lines on what changed (slots {a} {b} {sum}: they had {a}, the rod changed it to {sum}); adding or taking ten changes only the tens digit.
Together (slots {a} {b}, where {b} is the number added or taken away: ten, or a few ones; an item may add or take away): line 1 before a build (change {a}'s blocks), line 2 before a picture (the blocks; they type the answer), line 3 before the problem written out.
Remember: a warm-up: make a number with rods and cubes (slot {n}).
Show: two problems to type in their head, no help, inside a job in the world (slots {a} {b}).`;
function lsMentStop(id, t) {
  const D = lsSk(id, {t, test: 2, bugs: ['ten', 'op'], brief: LS_BRIEF_MENT, slots: {remember: ['n'], explore: ['a'], name: ['a', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => {
    const add = r() < .5, b = r() < .6 ? 10 : lsRi(r, 2, 5);
    for (;;) {
      const a = lsRi(r, 21, 88);
      if (b == 10 || (add ? a % 10 + b <= 9 : a % 10 >= b)) return [a, b, add];
    }
  };
  D.q = (st, r) => {
    const [a, b, add] = pick(r), c = add ? a + b : a - b, o = add ? '+' : '−', sl = {a, b}, ab = [a, b, add ? '+' : '-'],
      bug = b == 10 ? {ten: [add ? a + 1 : a - 1]} : {}, hint = {k: 'text', s: b == 10 ? 'Ten is one rod: only the tens change.' : 'Only the ones change.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 2, target: c}, goal: 'value', eq: 'value', ans: c, ab, sl, bug, hint, s0: lsDigits(a, 2),
      html: lsEq(`${a} ${o} ${b}`) + lsCap(add ? `Put in ${b} more.` : `Take away ${b}.`), say: `${a} ${add ? 'plus' : 'minus'} ${b}. ${add ? 'Put in' : 'Take away'} the blocks.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, 2))}</div>` + lsEq(`${a} ${o} ${b} = ${SLOT}`),
      say: `${a} ${add ? 'plus' : 'minus'} ${b} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: lsEq(`${a} ${o} ${b} = ${SLOT}`), say: `${a} ${add ? 'plus' : 'minus'} ${b} equals what?`});
  };
  D.warm = lsWarmB10(D, 21, 89);
  D.exp = r => {
    const a = lsRi(r, 31, 78);
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 2}, s0: lsDigits(a, 2), goal: 'moved', eq: 'value', ans: a + 10, sl: {a},
      html: lsEq(a) + lsCap('Put in a rod, or take one away!'), say: `Here are ${a}. Put in a rod, or take one away.`}), nudge: 'Change the tens, then check.',
    react: v => { const d = lsVal({model: 'b10r', m: {places: 2}}, v); return {ctx: {a, b: Math.abs(d - a), sum: d}, lines: [`${a} is now ${d}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.sum, 2))}</div>` + lsEq(`${c.a} ${c.sum >= c.a ? '+' : '−'} ${c.b} = ${c.sum}`), sl: c});
  return D;
}

/* ---- facts to 20 on the double ten frame: +9 & Doubles, All the Facts, Take Away to 18, Missing to 18, Add Three ---- */
const LS_BRIEF_FACT = `Explore: a double ten frame (two rows of ten). The child puts in counters in two colors, any way (no slots in the task).
Name it: the frame they made; lines on it (slots {a} {b} {sum}: {a} of one color and {b} of the other make {sum}) and the idea.
Together (SLOTS): line 1 before a build on the frame, line 2 before a picture of the frame (they type the answer), line 3 before the fact in symbols only.
Remember: a warm-up: fill a ten frame to make ten (slot {n}: the counters already in).
Show: two facts to type, no help, inside a job in the world (SLOTS).`;
function lsFactStop(id, t, kind, bugs) {
  const tg = kind == 'miss' ? ['a', 't'] : kind == 'add3' ? ['a', 'b', 'k'] : ['a', 'b'],
    say = {miss: '{a} the part already in, {t} the whole to make; never the missing part', add3: '{a} {b} {k}: the three numbers to add', sub: '{a} the start, {b} the number taken away'}[kind] || '{a} {b}: the two numbers';
  const D = lsSk(id, {t, test: 2, bugs, brief: LS_BRIEF_FACT.replace(/SLOTS/g, 'slots ' + say), slots: {remember: ['n'], explore: [], name: ['a', 'b', 'sum'], together: tg, check: ['ans'], show: tg}});
  D.q = (st, r) => {
    let a, b, c, eq, say, s0, built, ab, bug = {}, h, k3;
    if (kind == 'miss') { const t = lsRi(r, 11, 18); a = lsRi(r, t - 9, 9); return lsMiss(D, st, a, t - a, t, {given: [a, t], op: [a + t]}, `Count on from ${a} to ${t}.`); }
    if (kind == 'sub') { a = lsRi(r, 11, 18); b = lsRi(r, a - 9, 9); c = a - b; eq = `${a} − ${b}`; say = `${a} minus ${b}`; s0 = [a]; ab = [a, b, '-']; h = 'Take away to ten first, then the rest.'; }
    else if (kind == 'add3') { a = lsRi(r, 2, 8); b = lsRi(r, 2, 9); const d = lsRi(r, 1, Math.min(9, 20 - a - b)); c = a + b + d; k3 = d;
      eq = `${a} + ${b} + ${d}`; say = `${a} plus ${b} plus ${d}`; bug = {given: [a + b, b + d, a + d]}; h = 'Look for two that make ten. Add the last one on.'; }
    else {
      if (kind == 'all') { a = lsRi(r, 3, 9); b = lsRi(r, 11 - a, 9); h = 'Make a ten, then count on.'; }
      else if (r() < .5) { a = 9; b = lsRi(r, 2, 9); h = 'Nine is one less than ten. Make ten, then count on.'; }
      else { a = b = lsRi(r, 3, 9); h = 'A double: the same number twice.'; }
      c = a + b; eq = `${a} + ${b}`; say = `${a} plus ${b}`; ab = [a, b, '+'];
    }
    built = c;
    const sl = k3 ? {a, b, k: k3} : {a, b}, pic = kind == 'sub' ? VIZ.tenFrame(a, 20, {fade: b}) : VIZ.tenFrame(c, 20, {b: kind == 'add3' ? 0 : b}),
      // TEACH-UX (owner: "two colors yes"): the add facts' hint (and so the Remember model and Together's hint) draws the two
      // addends in two colours, a then b, as the picture stage does, so the child sees "make a ten"; Add Three keeps one colour
      // (three addends, two colours would pair the wrong two)
      // fixRev (v184): the hint draws the question's numbers, never the answer alone: take away the start with b faded (as its
      // Practice hint does); Add Three has no picture of its three numbers on one frame, so its result picture is never a model
      hint = kind == 'sub' ? lsFrameHint(a, 20, {fade: b}, h) : Object.assign(lsFrameHint(c, 20, kind == 'add3' ? {} : {b}, h), kind == 'add3' ? {mdl: false} : {});
    if (st == 0) return lsFrame(D.sk, D.lv, 0, built, 20, {s0, ab, sl, bug, hint, pk: false, html: lsEq(eq) + lsCap(kind == 'sub' ? `Take away ${b}.` : 'Make the answer on the frame.'),
      say: `${say}. ${kind == 'sub' ? `Take away ${b}.` : 'Make the answer on the frame.'}`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${pic}</div>` + lsEq(`${eq} = ${SLOT}`), say: `${say} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: lsEq(`${eq} = ${SLOT}`), say: `${say} equals what?`});
  };
  D.warm = lsWarmTen(D);
  D.exp = () => ({q: lsFrame2(D.sk, D.lv, 20, 'both', {pk: false, sl: {}, html: lsCap('Use both colors!'), say: 'Put in some blue and some orange.'}), nudge: 'Use both colors.',
    react: ([a, b]) => ({ctx: {a, b, sum: a + b}, lines: [`${a} and ${b} make ${a + b}.`]})});
  D.name = c => ({html: `<div class="pkq">${VIZ.tenFrame(c.sum, 20, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.sum}`), sl: c});
  return D;
}
// Missing to 18: a counters in, fill up to s (the missing part is what was put in)
function lsMiss(D, st, a, b, s, bug, h) {
  // fixRev (v184): the hint shows the part already in (the empty cells to count on), not the missing part in its own colour
  const sl = {a, t: s}, hint = lsFrameHint(a, 20, {}, h);
  if (st == 0) return lsFrame(D.sk, D.lv, 0, b, 20, {fixed: a, sl, bug, hint, pk: false, html: lsEq(`${a} + ${lsQm} = ${s}`) + lsCap(`Put in more to make ${s}.`),
    say: `${a} plus what makes ${s}? Put in more to make ${s}.`});
  if (st == 1) return lsDq(D, 1, {kind: 'num', ans: b, sl, bug, hint, html: `<div class="pkq">${VIZ.tenFrame(a, 20)}</div>` + lsEq(`${a} + ${SLOT} = ${s}`), say: `${a} plus what equals ${s}?`});
  return lsDq(D, 2, {kind: 'num', ans: b, sl, bug, hint, html: lsEq(`${a} + ${SLOT} = ${s}`), say: `${a} plus what equals ${s}?`});
}

/* ---- place value: Tens & Hundreds, Place Value to 999, Expanded Form; Compare to 100, Compare to 999 ---- */
const LS_BRIEF_PV = `Explore: base-ten blocks with hundreds (flats), tens (rods) and ones (cubes); the child makes any number they like (no slots in the task).
Name it: the blocks they made; lines on it (slots {n} the number, {top} the hundreds digit, {tens} the tens digit, {ones} the ones digit) and the idea.
Together (SLOTS): line 1 before a build with blocks, line 2 before a picture of blocks (they type), line 3 before symbols only.
Remember: a warm-up: make a number with blocks (slot {n}).
Show: two items to type, no help, inside a job in the world (SHOW).`;
function lsPvStop(id, t, kind, bugs) {
  // the slots that never give the answer away: the numbers shown on each stage
  const tg = kind == 'tens' || kind == 'cmp' ? ['a', 'b'] : kind == 'pv' ? [['n'], [], ['n']] : [['n'], [], []], sh = kind == 'tens' || kind == 'cmp' ? ['a', 'b'] : kind == 'pv' ? ['n'] : [];
  const what = {tens: 'line 1 adds {a} and {b} (whole tens, or whole hundreds) with blocks, line 2 shows their blocks, line 3 the sum; slots {a} {b}',
    cmp: 'line 1 makes a number bigger than one shown, line 2 compares {a} and {b} on blocks with a sign, line 3 compares them in symbols; slots {a} {b}',
    pv: 'line 1 makes {n} with blocks, line 2 counts the blocks in a picture (no slots: the number is the answer), line 3 asks what one digit of {n} is worth',
    exp: 'line 1 builds a number from its parts (hundreds + tens + ones) with blocks ({n}), line 2 counts the blocks in a picture (no slots), line 3 adds the parts in symbols (no slots)'}[kind];
  const D = lsSk(id, {t, test: kind == 'cmp' ? 3 : 2, bugs, brief: LS_BRIEF_PV.replace('SLOTS', what).replace('SHOW', sh.length ? 'slots ' + sh.map(x => '{' + x + '}').join(' ') : 'no slots'),
    slots: {remember: ['n'], explore: [], name: ['n', 'top', 'tens', 'ones'], together: tg, check: ['ans'], show: sh}});
  const pl = id == 'cmp2' ? 2 : 3;
  const b10 = (st, n, o) => lsDq(D, st, Object.assign({kind: 'make', model: 'b10', m: {places: pl}, eq: 'value', ans: n}, o));
  D.q = (st, r) => {
    if (kind == 'tens') { // Tens & Hundreds: add whole tens, or whole hundreds
      const u = r() < .5 ? 10 : 100, x = lsRi(r, 1, 8), y = lsRi(r, 1, 9 - x), a = x * u, b = y * u, c = a + b, sl = {n: c, a, b}, ab = [a, b, '+'], bug = {ten: [x + y]};
      const hint = {k: 'text', s: `${qN(x, u == 10 ? 'ten' : 'hundred')} and ${y} more ${qW(y, u == 10 ? 'ten' : 'hundred')}.`}; // WORDS-MATH W23: "1 hundred and 3 more hundreds."
      if (st == 0) return b10(0, c, {ab, sl, bug, hint, html: lsEq(`${a} + ${b}`) + lsCap('Make the answer with blocks.'), say: `${a} plus ${b}. Make the answer with blocks.`});
      if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${VIZ.base10(a)} ${VIZ.base10(b)}</div>` + lsEq(`${a} + ${b} = ${SLOT}`), say: `${a} plus ${b} equals what?`});
      return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: lsEq(`${a} + ${b} = ${SLOT}`), say: `${a} plus ${b} equals what?`});
    }
    if (kind == 'cmp') {
      const lo = pl == 2 ? 10 : 100, hi = pl == 2 ? 99 : 999;
      let a = lsRi(r, lo, hi), b = lsRi(r, lo, hi);
      if (r() < .4) b = +String(a).split('').reverse().join('') || b; // the same digits the other way round: the place matters
      if (b < lo || a == b) b = a < hi ? a + lsRi(r, 1, 9) : a - 1;
      if (b > hi) b = a - 1;
      const sl = {n: Math.max(a, b), a, b}, ans = a > b ? '>' : '<', hint = {k: 'text', s: 'Look at the biggest place first.'};
      if (st == 3) return lsDq(D, 2, {kind: 'num', ans: Math.max(a, b), sl, hint, bug: {small: [Math.min(a, b)]}, html: lsEq(`${a} or ${b}?`) + lsCap('Type the bigger number.') + SLOT,
        say: `Which is bigger, ${a} or ${b}? Type the bigger number.`});
      if (st == 0) { const m = lsRi(r, lo + 5, hi - 20); return b10(0, m + 1, {goal: 'gt', target: m, sl: {n: m, a: m, b: m}, bug: {given: [m]}, hint: {k: 'text', s: 'Put in one more cube, or more.'},
        html: lsEq(m) + lsCap(`Make a number bigger than ${m}.`), say: `Make any number bigger than ${m}.`}); }
      const html = (st == 1 ? `<div class="pkq">${VIZ.base10(a)} ${VIZ.base10(b)}</div>` : '') + lsEq(`${a} ${SLOT} ${b}`) + lsCap('Bigger, smaller, or the same?');
      return lsPick(D.sk, D.lv, st, ans, html, `Is ${a} greater than, less than, or equal to ${b}?`, [['<'], ['='], ['>']], {sl, hint, pk: false, bug: {small: [ans == '>' ? '<' : '>']},
        after: `${a} is ${ans == '>' ? 'greater than' : 'less than'} ${b}`});
    }
    // AUDIT-MATH M2: "what is the 2 worth?" needs its digit once in the number (not 922): the symbols item of Place Value to 999 draws
    // again until the hundreds digit, and the tens digit when it is not 0, each appear once (every other draw is as before)
    const one = x => { const ds = lsDigits(x, 3); return ds.filter(y => y == ds[0]).length == 1 && (!ds[1] || ds.filter(y => y == ds[1]).length == 1); };
    let n = lsRi(r, 102, 989);
    if (st == 2 && kind != 'exp') while (!one(n)) n = lsRi(r, 102, 989);
    const [h, te, o] = lsDigits(n, 3), sl = {n, a: h * 100, b: te * 10};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.base10(n)}<div>${qN(h, 'hundred')}, ${qN(te, 'ten')} and ${qN(o, 'one')}.</div></div>`, w: 'Flats are hundreds, rods are tens, cubes are ones.'};
    if (st == 0) return b10(0, n, {sl, hint, html: kind == 'exp' ? lsEq(`${h * 100} + ${te * 10} + ${o}`) + lsCap('Make it with blocks.') : lsEq(n) + lsCap(`Make ${n} with blocks.`),
      say: kind == 'exp' ? `${h * 100} plus ${te * 10} plus ${o}. Make it with blocks.` : `Make ${n} with blocks.`, bug: {swap: [h * 100 + o * 10 + te].filter(x => x != n)}});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: n, sl, hint, html: `<div class="pkq">${VIZ.base10(n)}</div>${SLOT}`, say: 'How many in all? Count the hundreds, the tens, then the ones.'});
    if (kind == 'exp') return lsDq(D, 2, {kind: 'num', ans: n, sl, hint, html: lsEq(`${h * 100} + ${te * 10} + ${o} = ${SLOT}`), say: `${h * 100} plus ${te * 10} plus ${o} equals what?`,
      bug: {given: [h * 100, h * 100 + te * 10], swap: [h * 100 + o * 10 + te].filter(x => x != n)}});
    // Place Value to 999: what a digit is worth
    const k = te && r() < .6 ? 1 : 0, d = [h, te][k], v = d * [100, 10][k];
    return lsDq(D, 2, {kind: 'num', ans: v, sl: {n, a: d, b: v}, hint, html: lsEq(n) + lsCap(`What is the ${d} worth?`) + SLOT, say: `In ${n}, what is the ${d} worth?`,
      bug: {given: [d], off1: []}});
  };
  D.warm = lsWarmB10(D, 11, 99);
  D.exp = () => ({q: b10(0, 999, {goal: 'any', sl: {}, html: lsCap('Make any number with blocks!'), say: 'Make any number you like with flats, rods and cubes!', demo: '234'}),
    react: v => { const [h, te, o] = lsDigits(+v, 3); return {ctx: {n: +v, top: h, tens: te, ones: o}, lines: [`You made ${+v}.`]}; }});
  D.name = c => { const n = c.n >= 100 ? c.n : 234, [h, te, o] = lsDigits(n, 3); return {html: `<div class="pkq">${VIZ.base10(n)}</div>` + lsEq(`${h * 100} + ${te * 10} + ${o} = ${n}`), sl: {n, top: h, tens: te, ones: o}}; };
  return D;
}

/* ---- clocks: O'Clock, Half Past, Quarter Hours, Clocks to 5 Minutes ---- (the clock with named hands, 52f-bench.js) */
const LS_BRIEF_TIME = `Explore: a clock with two hands the child moves (the short hand is the hour, the long hand the minutes); they set any time they like (no slots in the task).
Name it: the clock they set; lines on it (slots {time}: the time they set as it is said, such as "half past 4" or "4 o'clock"; {hour} the hour) and the idea.
Together: the items' times change (on the hour, or at the stop's minutes), so a line says {time} rather than "half past": line 1 before setting {time} on the clock, line 2 before reading a clock picture and picking its time (no slots: the time is the answer), line 3 before saying which number the long hand points to at {time}.
Remember: a warm-up (slot {n}).
Show: two times to set on the clock, no help, inside a job in the world (slot {time}).`;
function lsTimeStop(id, t, mins, warm) {
  const D = lsSk(id, {t, test: 0, petSt: 0, bugs: ['hands'], brief: LS_BRIEF_TIME.replace('(slot {n})', warm == 'hour' ? "(set an o'clock time: slot {time})" : '(what comes after a number: slot {n})'), slots: {remember: warm == 'hour' ? ['time'] : ['n'], explore: [], name: ['time', 'hour'], together: [['time'], [], ['time']], check: ['ans'], show: ['time']}});
  D.q = (st, r) => {
    const h = lsRi(r, 1, 12), m = mins[Math.floor(r() * mins.length)], mm = String(m).padStart(2, '0'), ans = `${h}:${mm}`, hm = [h, m], sl = {hour: h, min: m, time: mmTimeSay(h, m)};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.clock(h, m)}<div>${m ? `The long hand shows ${m} minutes.` : 'The long hand points to the 12.'} The short hand shows the hour.</div></div>`,
      w: 'The short hand shows the hour. The long hand shows the minutes.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans, ansSay: mmTimeSay(h, m), hm, sl, hint, html: lsEq(ans) + lsCap('Set the clock.'), say: `Show ${mmTimeSay(h, m)} on the clock.`});
    if (st == 1) {
      const ch = [...new Set([ans, BUGS.hands.f({hm})[0], `${h % 12 + 1}:${mm}`, `${(h + 10) % 12 + 1}:${mm}`].filter(Boolean))].slice(0, 3);
      return lsPick(D.sk, D.lv, 1, ans, `<div class="pkq">${VIZ.clock(h, m)}</div>` + lsCap('What time is it?') + SLOT, 'What time does the clock show?',
        ch.sort().map(x => [x]), {hm, sl, hint, pk: false, after: `It is ${mmTimeSay(h, m)}.`});
    }
    return lsDq(D, 2, {kind: 'num', ans: m ? m / 5 : 12, sl, hint, html: lsEq(ans) + lsCap('The long hand points to which number?') + SLOT,
      say: `At ${mmTimeSay(h, m)}, which number does the long hand point to?`, bug: {hands: [h].filter(x => x != (m ? m / 5 : 12)), off1: []}});
  };
  D.warm = warm == 'hour' ? lsWarmHour(D) : r => { const n = lsRi(r, 1, 10); return lsDq(D, 0, {kind: 'num', ans: n + 1, html: `<div class="seq">${n - 1 > 0 ? n - 1 + ', ' : ''}${n}, ${lsQm}</div>${SLOT}`,
    say: `What comes after ${n}?`, sl: {n}, hint: {k: 'text', s: `Count on from ${n}.`}, bug: {given: [n]}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans: '3:00', goal: 'moved', sl: {}, demo: '3:00',
    html: lsCap('Set any time you like!'), say: 'Move the hands to any time you like.'}), nudge: 'Move a hand, then check.',
  react: v => { const [h, m] = String(v).split(':').map(Number); return {ctx: {hour: h, min: m, time: mmTimeSay(h, m)}, lines: [`You made ${mmTimeSay(h, m)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.clock(c.hour, c.min)}</div>` + lsEq(`${c.hour}:${String(c.min).padStart(2, '0')}`), sl: c});
  return D;
}

/* ---- coins: Pennies & Nickels, Dimes Too, Quarters, Dollars & Coins; Making Change ---- (the coin purse) */
const LS_BRIEF_COIN = `Explore: a coin purse and a tray of coins; the child puts in any coins they like (no slots in the task).
Name it: the coins they chose; lines on them (slots {value}: what they are worth in cents, {n}: how many coins) and the idea: add what each coin is worth, not how many coins.
Together: line 1 before putting coins worth {value} cents in the purse, line 2 before a picture of {n} coins (they type how many cents; never say the cents), line 3 before adding {n} coins' values written out (never say the total).
Remember: a warm-up: skip counting (slot {k}: the step, such as 5 for fives).
Show: two coin pictures to total, no help, inside a job in the world (slot {n}: how many coins; never the total).`;
const LS_BRIEF_CHANGE = `Explore: a coin purse and a tray of coins; the child puts in any coins they like (no slots in the task).
Name it: lines on the coins they chose (slots {value}: what they are worth in cents, {n}: how many coins); change is what is left of a dollar after the price.
Together (slot {a}: the price in cents; never the change, which is the answer; a dollar is a hundred cents): line 1 before putting the change in the purse, line 2 before typing the change for a price, line 3 before the take-away written out.
Remember: a warm-up: skip counting (slot {k}: the step, such as 5 for fives).
Show: two prices to find the change for, no help, inside a job in the world (slot {a}).`;
// Explore on the purse: any coins (the state, so the count of coins is the child's own)
const lsCoinExp = (D, T) => ({q: lsDq(D, 0, {kind: 'make', model: 'coins', m: {types: T}, eq: 'value', ans: T[0], goal: 'moved', raw: 1, sl: {},
  html: lsCap('Put in any coins you like!'), say: 'Put any coins you like in the purse.'}), nudge: 'Tap a coin to put it in the purse.',
react: v => { const s = Array.isArray(v) ? v : mmGreedy(T, +v), x = K2MM.coins.val({m: {types: T}}, s); return {ctx: {value: x, n: mmSum(s)}, lines: [`Your coins make ${qN(x, 'cent')}.`]}; }});
function lsCoinStop(id, t, types, max) {
  const D = lsSk(id, {t, test: 1, petSt: 1, bugs: ['count'], brief: LS_BRIEF_COIN, slots: {remember: ['k'], explore: [], name: ['value', 'n'], together: [['value'], ['n'], ['n']], check: ['ans'], show: ['n']}});
  const coinsOf = r => { for (;;) { const cs = Array.from({length: lsRi(r, 3, 6)}, () => types[Math.floor(r() * types.length)]).sort((a, b) => b - a), v = cs.reduce((a, b) => a + b, 0);
    if (v <= max && v > cs.length && new Set(cs).size > 1) return [cs, v]; } };
  const T25 = types.filter(c => c <= 25);
  D.q = (st, r) => {
    let [cs, v] = coinsOf(r);
    while (st == 0 && mmSum(mmGreedy(T25, v)) > 12) [cs, v] = coinsOf(r);
    const sl = {value: v, n: cs.length}, hint = {k: 'text', s: 'Start with the coin worth the most. Count on by what each coin is worth.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'coins', m: {types: T25}, eq: 'value', ans: v, sl, hint, cents: 1,
      html: lsEq(v + '¢') + lsCap(`Put ${v}¢ in the purse.`), say: `Make ${v} cents. Tap the coins to put them in the purse.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: v, coins: cs, sl, hint, cents: 1, html: `<div class="pkq">${VIZ.coinSVG(cs)}</div>` + lsCap('How many cents?') + SLOT, say: 'How many cents are these coins worth?'});
    return lsDq(D, 2, {kind: 'num', ans: v, coins: cs, sl, hint, cents: 1, html: lsEq(cs.map(c => c >= 100 ? '$1' : c + '¢').join(' + ') + ' = ' + SLOT + '¢'),
      say: 'Add what the coins are worth. How many cents?'});
  };
  const k = types.includes(25) ? 25 : types.includes(10) ? 10 : 5;
  D.warm = lsWarmSeq(D, k);
  D.exp = () => lsCoinExp(D, T25);
  D.name = c => { const ty = T25, cs = []; mmGreedy(ty, c.value).forEach((n, i) => { for (let j = 0; j < n; j++) cs.push(ty[i]); });
    return {html: `<div class="pkq">${VIZ.coinSVG(cs)}</div>` + lsEq(cs.map(x => x + '¢').join(' + ') + ' = ' + c.value + '¢'), sl: c}; };
  return D;
}
function lsChangeStop(id, t) {
  const D = lsSk(id, {t, test: 1, petSt: 1, bugs: ['col', 'keep'], brief: LS_BRIEF_CHANGE, slots: {remember: ['k'], explore: [], name: ['value', 'n'], together: ['a'], check: ['ans'], show: ['a']}});
  const T = [25, 10, 5, 1];
  D.q = (st, r) => {
    let p;
    do p = 5 * lsRi(r, 3, 19); while (p % 10 == 0 && r() < .7);
    const c = 100 - p, sl = {a: p, diff: c}, ab = [100, p, '-'], hint = {k: 'text', s: `Count up from ${p} to 100.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'coins', m: {types: T}, eq: 'value', ans: c, ab, sl, hint, cents: 1,
      html: lsEq(`100¢ − ${p}¢`) + lsCap('Put the change in the purse.'), say: `It costs ${p} cents. Put the change from a dollar in.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, hint, cents: 1, html: `<div class="pkq">${VIZ.coinSVG(100)}</div>` + lsCap(`It costs ${p}¢. Change?`) + SLOT + '¢',
      say: `It costs ${p} cents. How much change from a dollar?`});
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, hint, cents: 1, html: lsEq(`100 − ${p} = ${SLOT}`), say: `100 minus ${p} equals what?`});
  };
  D.warm = r => { const s = 5 * lsRi(r, 3, 15); return lsSeqQ(D, 0, s, 5); };
  D.exp = () => lsCoinExp(D, T);
  D.name = c => { const cs = []; mmGreedy(T, c.value).forEach((n, i) => { for (let j = 0; j < n; j++) cs.push(T[i]); });
    return {html: `<div class="pkq">${VIZ.coinSVG(cs)}</div>` + lsEq(`${c.value}¢ + ${100 - c.value}¢ = 100¢`), sl: c}; };
  return D;
}

/* ---- equal groups: Count by 2s & 5s, Equal Groups, Groups to 5×5, Rows & Columns ---- (the groups model, 52f-bench.js; the array) */
const LS_BRIEF_GRP = `Explore: equal groups (circles with dots in them, or rows of dots); the child makes any equal groups they like (no slots in the task).
Name it: the groups they made; lines on them (slots {a}: how many groups or rows, {b}: how many in each, {sum}: how many in all) and the idea.
Together (slots {a} {b}; never how many in all, which is the answer): line 1 before making {a} groups (or rows) of {b}, line 2 before a picture of the groups (they type how many in all), line 3 before symbols only.
Remember: a warm-up: skip counting (slot {k}: the step).
Show: two pictures to total, no help, inside a job in the world (slots {a} {b}).`;
function lsGrpStop(id, t, kind) {
  const D = lsSk(id, {t, test: 1, petSt: 1, bugs: ['given', 'off1'], brief: LS_BRIEF_GRP, slots: {remember: ['k'], explore: [], name: ['a', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const arr = kind == 'arr';
  D.q = (st, r) => {
    const a = lsRi(r, 2, kind == 'cnt' ? 6 : 5), b = kind == 'cnt' ? (r() < .5 ? 2 : 5) : lsRi(r, 2, kind == 'mult1' ? 4 : 5), c = a * b, sl = {a, b, sum: c};
    const pic = arr ? VIZ.array(a, b) : lsGroupsSvg(a, b), bug = {given: [a, b]}, hint = {k: 'html', html: `<div class="pkhint">${pic}<div>Count by ${b}s: ${Array.from({length: a}, (_, i) => b * (i + 1)).join(', ')}.</div></div>`, w: `Count by ${b}s.`};
    if (st == 0) return arr ? lsDq(D, 0, {kind: 'make', model: 'array', m: {r: a, c: b}, eq: 'exact', ans: c, sl, bug, hint, html: lsCap(`Make ${a} rows of ${b}.`), say: `Make an array with ${a} rows of ${b}.`})
      : lsDq(D, 0, {kind: 'make', model: 'groups', m: {g: a, n: b, target: c}, goal: 'groups', eq: 'value', ans: c, sl, bug, hint, html: lsCap(`Make ${a} groups of ${b}.`), say: `Make ${a} groups with ${b} in each group.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${pic}</div>` + lsCap('How many in all?') + SLOT, say: `${a} ${arr ? 'rows' : 'groups'} of ${b}. How many in all?`});
    if (kind == 'cnt') return Object.assign(lsSeqQ(D, 2, b, b), {sl: {a: 4, b, k: b}});
    const e = kind == 'mult1' ? Array(a).fill(b).join(' + ') : `${a} × ${b}`;
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${e} = ${SLOT}`), say: kind == 'mult1' ? `${Array(a).fill(b).join(' plus ')} equals what?` : `${a} times ${b} equals what?`});
  };
  D.warm = kind == 'cnt' ? lsWarmSeq(D, 10) : lsWarmSeq(D, kind == 'mult1' ? 2 : 5);
  D.exp = () => ({q: arr ? lsDq(D, 0, {kind: 'make', model: 'array', m: {r: 2, c: 3}, eq: 'exact', ans: 6, goal: 'any', sl: {}, demo: '3×4', html: lsCap('Make any array you like!'), say: 'Make any rows of dots you like.'})
    : lsDq(D, 0, {kind: 'make', model: 'groups', m: {g: 2, n: 2, target: 4}, goal: 'eqgrp', eq: 'value', ans: 4, sl: {}, html: lsCap('Make equal groups!'), say: 'Make some equal groups, any way you like.'}),
  nudge: arr ? 'Set the rows, then check.' : 'Make two or more groups, two or more in each.',
  react: v => { const [a, b] = Array.isArray(v) ? v : /×/.test(v) ? String(v).split('×').map(Number) : [2, 3]; return {ctx: {a, b, sum: a * b}, lines: [`${qN(a, arr ? 'row' : 'group')} of ${b} ${a == 1 ? 'makes' : 'make'} ${a * b}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${arr ? VIZ.array(c.a, c.b) : lsGroupsSvg(c.a, c.b)}</div>` + lsEq(`${Array(c.a).fill(c.b).join(' + ')} = ${c.sum}`), sl: c});
  return D;
}

// ---- the lessons, in map order (Candy Canyon, Clock Tower, Ocean Reef: 1st grade; Space Station, Treasure Bay: 2nd grade) ----
lsDraft('add2', lsFactStop('add2', '+9 & Doubles', 'nine', ['off1', 'given']));
lsDraft('big1', lsPvStop('big1', 'Tens & Hundreds', 'tens', ['ten', 'given']));
lsDraft('cnt2', lsGrpStop('cnt2', 'Count by 2s & 5s', 'cnt'));
lsDraft('miss2', lsFactStop('miss2', 'Missing to 18', 'miss', ['op', 'given']));
lsDraft('sub2', lsFactStop('sub2', 'Take Away to 18', 'sub', ['op', 'off1']));
lsDraft('add5', lsFactStop('add5', 'Add Three', 'add3', ['given', 'off1']));
lsDraft('add6', lsMentStop('add6', 'Mental Math'));
lsDraft('add3', lsFactStop('add3', 'All the Facts', 'all', ['off1', 'op']));
lsDraft('time1', lsTimeStop('time1', "O'Clock", [0], 'count'));
lsDraft('big2', lsAddStop('big2', '2-Digit Adding', 2, false, ['op', 'swap']));
lsDraft('coins1', lsCoinStop('coins1', 'Pennies & Nickels', [5, 1], 40));
lsDraft('cmp2', lsPvStop('cmp2', 'Compare to 100', 'cmp', ['small']));
lsDraft('time2', lsTimeStop('time2', 'Half Past', [0, 30], 'hour'));
lsDraft('sub3', lsSubStop('sub3', '2-Digit Take Away', 2, false, ['op', 'given']));
lsDraft('big3', lsAddStop('big3', 'Carry the 1', 2, true, ['nocarry', 'cat']));
lsDraft('mult1', lsGrpStop('mult1', 'Equal Groups', 'mult1'));
lsDraft('coins2', lsCoinStop('coins2', 'Dimes Too', [10, 5, 1], 80));
lsDraft('sub4', lsSubStop('sub4', 'Borrowing', 2, true, ['col', 'keep']));
lsDraft('time3', lsTimeStop('time3', 'Quarter Hours', [0, 15, 30, 45], 'hour'));
lsDraft('big4', lsAddStop('big4', '3-Digit Adding', 3, false, ['op', 'given']));
lsDraft('mult2', lsGrpStop('mult2', 'Groups to 5×5', 'mult2'));
lsDraft('cmp3', lsPvStop('cmp3', 'Compare to 999', 'cmp', ['small']));
lsDraft('coins3', lsCoinStop('coins3', 'Quarters', [25, 10, 5, 1], 99));
lsDraft('pv2', lsPvStop('pv2', 'Place Value to 999', 'pv', ['given', 'swap']));
lsDraft('big5', lsAddStop('big5', 'Add 3-Digit Numbers', 3, true, ['nocarry', 'cat']));
lsDraft('pv3', lsPvStop('pv3', 'Expanded Form', 'exp', ['given', 'swap']));
lsDraft('sub5', lsSubStop('sub5', 'Take Away 3-Digit', 3, true, ['col', 'keep']));
lsDraft('time4', lsTimeStop('time4', 'Clocks to 5 Minutes', [5, 10, 20, 25, 35, 40, 50, 55], 'hour'));
lsDraft('coins4', lsCoinStop('coins4', 'Dollars & Coins', [100, 25, 10, 5, 1], 199));
lsDraft('arr1', lsGrpStop('arr1', 'Rows & Columns', 'arr'));
lsDraft('coins5', lsChangeStop('coins5', 'Making Change'));
/* ---------- TEACH-4: the pet's recorded teacher lines (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js --teach) ----------
   The fixed lines and sentences of every lesson, Pre-K to 6th grade (REC-ALL) -> their file, audio/teach/<file>.ogg (xAI text to speech,
   English, the voice luna, speed 0.95 (the little pet) or 1 (only the older pet), Opus 16 kbps mono). One voice: the pet is
   one speaker. Keys are esKey(text). 1510 lines. */
const EN_TEACH={dir:"audio/teach/",ext:".ogg",voice:"luna",lines:{
"A composite number makes an array with more than one row.":"58048b31f523",
"A doing word is something you can do.":"e8bac5d4bb0a",
"A dollar is a hundred cents.":"78566449e90f",
"A dollar is worth a hundred cents.":"231af26f465f",
"A few to work through.":"635025922121",
"A flat line is straight.":"18ee373a9fc1",
"A fraction from before.":"a0c3e1b44116",
"A fraction is a point on the line.":"476ac58acf9b",
"A full frame is ten. Count the ten first.":"4942db0f4b89",
"A hundred is ten tens.":"34bb6fd17186",
"A number is its hundreds plus its tens plus its ones.":"8eeae8adc8bc",
"A number next to x means times: put the number in, multiply, then add.":"5c103dd0a12a",
"A number tells how many.":"1bd1c42a04f3",
"A one-step equation from before.":"9f02775711fe",
"A parallelogram skips the half; a trapezoid adds both bases first, then halves.":"e2916b8f0b65",
"A percent from before.":"41b5eeef8941",
"A prime number makes only one row.":"a2e009808443",
"A ratio table grows by multiplying both rows, never by adding the same amount.":"996d3159a8b9",
"A right angle is a square corner.":"35f7d9f064d2",
"A rule goes across, from in to out.":"6789d52783fc",
"A rule links each number to its partner.":"dceb20701661",
"A sentence starts with a capital letter.":"ba23de65df4c",
"A smaller unit needs more of it so multiply.":"bd4389e16464",
"A square has square corners like a rectangle.":"f2497f31f6b9",
"A story tells who, what and where.":"5cfa54a3ef98",
"A take-away fact from before.":"dd806889b8ba",
"A times fact first.":"8aab0442a7c0",
"A times fact from before.":"a851c03a8ed8",
"A whole number has its point at the end.":"baba1d155d1d",
"A whole times a fraction is that many copies of the fraction: multiply the top.":"842747efc123",
"A, B, C, D.":"925c277d46f8",
"Absolute value is that distance, so it is never negative.":"07d769116f6a",
"Across first, then up, both counted from zero.":"2e4cd35fde3f",
"Across first, then up.":"48fe6436d807",
"Across first, then up; left and down are negative.":"813c41422f6f",
"Across zero, add both distances.":"8e9920f95618",
"Actually, I had it right.":"dc177c63d448",
"Add all the sides to find the perimeter.":"5b41ee8be712",
"Add all the sides.":"7c9b99c0c3ec",
"Add as many groups as you like.":"8e0b63d0491c",
"Add each place.":"922f0c1416a1",
"Add every side.":"e85aa34f679a",
"Add from the ones.":"bae85a243b28",
"Add in columns.":"f3a06a96aed2",
"Add in columns: ones, tens, then hundreds.":"65b0f75db382",
"Add it up!":"522c15a0b9b4",
"Add the loads.":"bb60c603dd9c",
"Add the ones column, then the tens column.":"f50a2bbc7d75",
"Add the ones, then add the tens.":"56f3c22c18da",
"Add the ones, then the tens, then the hundreds.":"54328c1aad02",
"Add the tens.":"fd0f2586c7cf",
"Add the tops.":"d052855ac824",
"Add them up!":"d4b8a567a231",
"Add these in symbols only.":"16871fd5b950",
"Add these loads.":"0846bdc41987",
"Add these.":"bb6bd0ec9377",
"Add to find the total parts.":"27f368479b30",
"Add what each coin is worth, not how many coins.":"2c54f9d00150",
"Add what each one is worth.":"3e14a043f3ce",
"Adding a negative number moves left too.":"9ca7eae3c139",
"After x, s, sh or ch, we add e and s.":"2842fbe62ef0",
"Again! Again!":"06270f368914",
"Am I right?":"c8bfcacf1871",
"An opposite is as different as it can be.":"c0ad431fc9d2",
"And you still know it!":"8f971cdef1d9",
"Another one.":"a74679d8db81",
"Another ship sails soon.":"fab06f07f6e8",
"Answer each question!":"2c93a4e7c8bf",
"Any guess is fine.":"cd05193d3b39",
"Any guess works.":"7151c4526715",
"Any number works!":"649a85ccba03",
"Any way is fine!":"cdc0aa41f83d",
"Any way is fine.":"e539417a3c12",
"Any way works!":"6be7bbf8f78c",
"Any way works.":"4b61d453a39a",
"Any way you like!":"d40d3f1997f3",
"Any way you like.":"cca2d54e7d0e",
"Are there enough ones?":"f75645e4a7ca",
"Area counts the squares inside.":"da8353262d79",
"Asking ends with a question mark.":"57821a505415",
"Asking ends with a question mark. Telling ends with a period.":"ed38036d4438",
"Ba, na, na.":"ea85f691104b",
"Back means smaller numbers. Count down.":"808a7ab39825",
"Big letters have names.":"09dec9afbad3",
"Bigger or smaller unit?":"78a6db971bc9",
"Biggest coins first.":"3b3d46b469c2",
"Both bars are cut the same now.":"ed5311152eee",
"Both letters make one sound together.":"9ec459513c10",
"Both letters of a team go in the word.":"18804d6c5549",
"Both letters of the blend go in the word.":"223b4f555ffa",
"Both letters of the team go in.":"38da8b02bdb0",
"Both numbers are on the chart.":"396ae7019dc1",
"Both vowels of a team go in the word.":"f11b233a5688",
"Brackets first, then powers, then the rest in order.":"595d612a67a0",
"Break a hundred or a ten if you need to.":"3f3603a7f351",
"Break a ten if you need to.":"6bae36fe1aef",
"Break a ten if you need.":"6c5edfce007d",
"Break a ten into ten ones.":"bc3fa8635680",
"Break a whole into parts.":"c3f77542eeb0",
"Break when you need to.":"86d7fb4bcfc5",
"Bubbles!":"642c9dcccc2a",
"Build a box for the crystals.":"937f1360ea4d",
"Build a problem like this.":"05d2a551491b",
"Build a word one sound at a time.":"aaa04d16bddc",
"Build any bar graph you like.":"34826136fac2",
"Build any bar model you like.":"bef1ed67ffb8",
"Build any bar of equal boxes: pick the boxes and what goes in each.":"0ae0013359b6",
"Build any bar: pick the boxes, and what goes in each.":"33217d54168b",
"Build any box you like with the cubes.":"b7491dc5055d",
"Build any boxes of x.":"bc4d2a931453",
"Build any equal boxes.":"c097f80415b2",
"Build any number with rods and cubes.":"419c211ca744",
"Build each one!":"26f25cf3f00d",
"Build each word I say!":"5620d6ccbf71",
"Build each word for me!":"ce649c3580f1",
"Build each word!":"592121e0dc2a",
"Build every group then trade.":"65cc69ed34c8",
"Build it on the frame.":"3d76c73f536a",
"Build it out one column at a time.":"1663020f761b",
"Build it with me.":"86df4922bb96",
"Build it with the tiles any way you think.":"558acb8f5377",
"Build its first sound with me.":"7328ceeb7876",
"Build the answer with the bars.":"c911e312180a",
"Build the bar: the boxes, then what is in each.":"c446ee897014",
"Build the boxes of x first.":"93121b84b238",
"Build the groups and trade.":"18547db38b9d",
"Build the last sound with me.":"4dff0cdbe939",
"Build the middle letter with me.":"f5af20dfcab7",
"Build the word with me.":"24164d67ae9a",
"Build them with blocks.":"6ba80336df9d",
"Build them with the steppers any way you like.":"b6ac7f068a09",
"Build this bar.":"8b6b31ab8913",
"Can you do it?":"7b84af735e2c",
"Can you fix it?":"278bce0f4b11",
"Candy Canyon needs signs.":"d33e7d39121f",
"Carry the ten to the next column.":"bede52cf9fa9",
"Carry the ten.":"750b8b78c466",
"Carry!":"f8f1423cfc4f",
"Catch my slip next time to earn game time.":"4584b0bea881",
"Change is what is left of a dollar after the price.":"53e719017479",
"Check me!":"3aad6d33e964",
"Check my work.":"7ea400a44a0f",
"Check the sides, then the corners.":"e4a4daf13c88",
"Check the start and the end.":"6c72c8161f51",
"Check what each line or picture stands for.":"7350b2c1da34",
"Check which one it asks for before you start.":"0e6ea9ea2d99",
"Clap and pick the right one!":"26058514915a",
"Clap each part.":"748a67d33dad",
"Clap each word!":"67d94718f196",
"Clap each word.":"78cb83528b4c",
"Clap each word. One clap or two?":"6995fc11b50e",
"Clap once for each part you say.":"24f0d21733c9",
"Clap once for each part.":"6ca0351c93a7",
"Clap the parts of the word.":"b1f4c8c61855",
"Clap with me!":"fd2fe47155be",
"Clean.":"9c1d0a60fcc3",
"Cold days and deep dives sit below zero.":"97fdc6964933",
"Compare how much of the same whole is shaded.":"cb9220065bce",
"Compare it with a square corner.":"6569998a1466",
"Compare the ones first then the tenths then the hundredths.":"4a6d309451cf",
"Compare these two.":"1fe342d60d78",
"Convert these.":"2bd5493100a3",
"Convert this.":"969bb9541e5d",
"Correct.":"461c2db4a4cc",
"Count all the shaded parts.":"3cac1dabaac6",
"Count back.":"8fb5f3960048",
"Count by tens, or by hundreds.":"e4cad72b9ca9",
"Count by the marks in your head.":"8ccf24cac9e8",
"Count by the marks to make it show the amount.":"e485be42c0db",
"Count by the scale as you go.":"c10cf67a0f22",
"Count by the scale, not by the squares.":"dc6ff4932d28",
"Count by what each is worth.":"3e1810f7b0bd",
"Count each one in the picture.":"f15871bcf5e3",
"Count each one in the row.":"92b34419aee7",
"Count each one once. Touch it as you count.":"d0ed5405ab0f",
"Count each one.":"61cf22611a78",
"Count from the start to the next hour, then on.":"6fbe652053fe",
"Count from zero along the axis to read it.":"0b8b1579f979",
"Count how many groups fit.":"d5fa98ab8c23",
"Count on from one part to the whole.":"082f5a4e3a7a",
"Count on from the nearest label to read the dot.":"54f1f17d5a37",
"Count on.":"d75a172bf124",
"Count the claps.":"a296e6ab69d1",
"Count the dollar first.":"d8b4c049b36b",
"Count the dots.":"dc3c191195bb",
"Count the flats, the rods, then the cubes.":"7b931d90819d",
"Count the lines on this one.":"674c348a0758",
"Count the long hand by fives to the last number then on by ones.":"f34ec782985f",
"Count the minutes.":"09b8da6ae526",
"Count the ones where the halves match.":"0eed25440edb",
"Count the ones, then the tens.":"1a6837856b5a",
"Count the pieces in the picture.":"0a71d1a56726",
"Count the pieces.":"331308980206",
"Count the rods or the flats.":"dcf4803d9c9b",
"Count the squares inside this one.":"b890936479a7",
"Count the squares, or the cubes, layer by layer.":"54cd2e075e72",
"Count the steps of the hop.":"5518f51b6ee4",
"Count up from there.":"fda9f93b0ee9",
"Count up to a dollar.":"e740f73fed9d",
"Count up to the hour first.":"5f6e62c4ad84",
"Count up to the next hour, then on from it.":"8536398e1c36",
"Count with me.":"cfc99091d370",
"Count your claps.":"c1e89e5474cc",
"Crack both.":"430aeb47ecaf",
"Crack crack!":"0fae1a9e6b4a",
"Cut each bar into any number of equal parts.":"142499a91a92",
"Cut every bar into the parts the problem names.":"7271453e6bc5",
"Delicious!":"79369f2c760a",
"Divide as if there were no point.":"2d4c3346d5f5",
"Divide by the bottom, then multiply by the top.":"fcb4e90a88ca",
"Divide this one.":"e2ad7d5e6f57",
"Divide, then think about the leftovers.":"ed48ee502f6e",
"Dividing by a fraction asks how many of it fit.":"de22cc33503f",
"Dividing by a unit fraction counts the pieces that fit.":"376507819179",
"Dividing finds how many rows or how many in each row.":"8cec100e5efd",
"Do both steps.":"72d64d50229b",
"Do it in your head.":"ab952bf0f266",
"Do not forget the carried ten.":"ba91f0f82cc5",
"Do not forget the quiet letters.":"90a2ff50ef74",
"Do not go by size alone.":"61d3882adc41",
"Do the first step, then the next.":"91a8f40364bd",
"Do they have the same number?":"08cc5dcf47d6",
"Do you remember counting on?":"4adf1911d5a0",
"Do you remember skip counting?":"b473924f038c",
"Do you remember this fact?":"b14a102dc142",
"Do you remember this one?":"13d7efc05cc1",
"Do you remember this times fact?":"193218647799",
"Do you remember this word?":"1d0648adb695",
"Do you remember this?":"196eb8f68e13",
"Does it rhyme?":"4e05def68a72",
"Done.":"ec91bf114d76",
"Drag each piece into its outline.":"bfb823172c56",
"Drag the bear to the flag.":"59d48de75077",
"Drag the pieces into the shape.":"c80d08721f49",
"Each box is ten percent.":"9e857eb5db31",
"Each box of this bar is ten percent.":"321e815e6a71",
"Each coin has a value. Add the values.":"9f7613da260c",
"Each digit's place tells what it is worth.":"3d3aa00cf220",
"Each dot stands for one length.":"2e76ecb73127",
"Each one folds it into halves that match.":"e52fcb4e5754",
"Each one has its own place.":"d36e9e9ba788",
"Each part has its own product.":"7fa8e1a292ae",
"Each part of the story tells us something.":"ff8312258c98",
"Each part times each part then add them.":"14bb551daecd",
"Each place is worth ten times the place to its right.":"4629ab5d474a",
"Each row, each column and each box needs every animal once.":"0c7aaf755ae0",
"Each thing gets one number.":"95a3c1a17788",
"Earn stars to hatch me!":"610c16ec8cff",
"Enough parts make a whole.":"2270140375d0",
"Equal boxes make a times story.":"c9b3d4bc7c01",
"Equal groups have the same number in each group.":"2f385b30e62b",
"Every column follows one rule.":"3b9e9a71a690",
"Every full bar is one whole.":"fa0a033d06b1",
"Every group has the same red and blue beads.":"f652f7ba6ecd",
"Every letter has its own place in the ABC.":"0a2cd396b8e8",
"Every number has its own shape.":"8b511abae9d3",
"Every sound you hear got its letter.":"d676bafb1987",
"Exactly.":"0453c73285c4",
"Factor: the biggest group size.":"217f3cf63930",
"Factors divide in; multiples come from counting up.":"a5fd5eeb318f",
"Fair.":"8995da66c226",
"Fill a ten first.":"9c966471531c",
"Fill the double frame.":"e1397f452a1d",
"Fill the frame any way you like!":"ec49836712c0",
"Fill the frame with any counters you like.":"c23a513f6eeb",
"Fill the frame with blue and orange.":"f7edf25b0cc2",
"Fill the frame with counters.":"da407ac58966",
"Fill the purse with any coins you like from the tray.":"7653aeb2a74e",
"Fill the top ten first.":"7fa9118a74c6",
"Fill this double frame.":"720a83de2d9f",
"Fill this frame with both colors.":"ce0e68826441",
"Fill your coin purse.":"ab2e4595aaee",
"Fill your purse with any coins you like.":"848c48597036",
"Find a picture that ends with it.":"3a5db22ae9ed",
"Find a picture that starts with it.":"d88c45bc9c88",
"Find a picture with it in the middle.":"b91e846e368d",
"Find each amount.":"9e76e3a8a36a",
"Find each area.":"812c216187a3",
"Find each as a fraction.":"a915c2199df5",
"Find each big letter!":"fdce36949c13",
"Find each little letter!":"80c8a22fd79d",
"Find each little partner!":"01c27e3665e1",
"Find each opposite!":"c63af3650535",
"Find each rhyme!":"0cb931af7056",
"Find each word I say!":"9e9fca21f6fe",
"Find each word that means the same!":"88e90ca0d962",
"Find each word!":"43fec608d6e9",
"Find how B is made from A.":"135b0ef889e6",
"Find its big partner.":"f6c7da63f02b",
"Find its little partner.":"97ff20b0dd29",
"Find its middle letter.":"8633b8eed576",
"Find my mistake next time to earn game time.":"83454918974c",
"Find my mistake!":"15ac6d9570ac",
"Find my slip.":"616809963310",
"Find one part, then the parts asked for.":"aed8ae8374cc",
"Find one tenth first, then take as many tenths as the percent says.":"6f62a9ded75e",
"Find that part of the story. Listen again.":"427dc64d4238",
"Find the dots on that mark.":"60c0de7a6bf2",
"Find the error next time to earn game time.":"913d9f9109fe",
"Find the error.":"abe3d774b6dc",
"Find the first sound.":"3784942c1b51",
"Find the letter.":"79088775eb16",
"Find the missing number.":"43fb67ea5c7d",
"Find the one I ask for.":"481f4b6b275b",
"Find the one that does not match the rest.":"b9a27d555453",
"Find the place of the digit.":"bf340214ce88",
"Find the product of each part then add them.":"48ab18f7b773",
"Find the rate for one first, then scale up.":"d5e7abab27b2",
"Find the right shape for the door in Tiny Town.":"b98ce2f2b4b2",
"Find the rule across, then use it on the new A.":"bdf026aca397",
"Find the rule first.":"a5062a2f43e6",
"Find the rule from A to B, then use it.":"dec9b1d4ec1a",
"Find the step that is off.":"e54af7e51e53",
"Find the total.":"064e3e052674",
"Find the volume.":"812ef18ce744",
"Find the zero on the side the angle starts.":"be5991267157",
"Find the zero on the starting side.":"efe7ad33937d",
"Find them.":"1aa34b2aa46e",
"Find this total.":"348c2b429476",
"Find two pictures that are the same.":"0384c4de3c1a",
"Find what one box is worth, then add up the shaded part.":"c2a25788cfc5",
"Find what one mark is worth, then count by it.":"5b16b5cbae62",
"Find what one mark is worth.":"1ed30fa09b9b",
"Fine.":"68ab832e2baf",
"Finish a learning round to earn game time!":"ccd7fba627b4",
"Finish a round or a picture to win a sticker!":"ec66bc68e6f2",
"Finish a round to light your flame!":"1bab694b7df3",
"Finish the stop before this one!":"2bb825566627",
"First break it into parts and multiply each part.":"154534727dca",
"First divide the digits without the point.":"04c0717d1048",
"First find the tens it sits between.":"2a403dbc03d1",
"First multiply the same digits without the points.":"8f395f898e86",
"First take off the extra part, then share by the boxes.":"cad2f5f2521e",
"First the equal boxes, then the extra box.":"ce32a95ceef7",
"First work out the times part.":"5f63536d0593",
"First, build the equal boxes of the story.":"e8170affc6aa",
"First, show me what you already know.":"85ac8eb9b335",
"First, show me what you know.":"8df3f569f1ce",
"Fix it for me?":"1e6717d4a238",
"Fix it with me: a capital, then the end mark.":"1b14ebf45ab6",
"Fix it.":"82079f13863f",
"Fix it: tap for a capital, then tap an end mark.":"ab6d9b3ea0d8",
"Fixed.":"ec6bd5fc4f2a",
"Flats, rods, then cubes.":"21bacc7a1e67",
"Fold it in your mind along each line.":"08b183e1b1b5",
"For a total, add the lengths, not the dots.":"adde4a0cea31",
"Game time earned.":"293f3be49241",
"Game time is almost up!":"0f17314959f1",
"Games":"0753f60ba2b5",
"Give me a hard one.":"50aeb1291127",
"Give me a problem to solve.":"39a4b75f4efb",
"Give me a problem!":"18a995fe5f80",
"Go Home?":"13ed94e61374",
"Go across first, then up.":"50b1c67a0819",
"Go back to ten first.":"75005ca94707",
"Going back to feet, divide.":"1fc91fa52495",
"Good catch.":"da25991b1d62",
"Great learning today!":"9091e8bd5fd0",
"Guess which ones will grow bigger.":"ca6f5b7b7e14",
"Guess which ones will melt in the hot sun.":"ac2d35ad52d7",
"Guess, multiply back, then check what is left.":"f6e9209f804c",
"Guess: will it float or sink?":"9f8142266f8c",
"Half past: the long hand points straight down.":"f892386c907d",
"Half the perimeter is one long side and one short side.":"28316cad8ee2",
"Halfway goes up.":"bfc3e47474b4",
"Halfway rounds up.":"483678a56a1e",
"Hear the letter name.":"65cabca9db83",
"Hear the number.":"1dcceb9bcf37",
"Heavy for its size sinks.":"caebda8b4880",
"Help in the shop.":"48bde616d073",
"Help me label the rooms and things.":"ea87716afa81",
"Help me.":"83301e786fb1",
"Help set the tables.":"ee5463ff2fdb",
"Help the park ranger plan for a hot sunny day.":"e55960c611ba",
"Here are a square, a rectangle and a rhombus.":"edca84b2d97a",
"Here are some blocks.":"b395287393ba",
"Here is a letter.":"a8a2d5b99b1b",
"Here is a picture of the blocks.":"8e67bf4daee4",
"Here is a picture to help.":"8aa6dfcb99b5",
"Here is a rectangle.":"76706f1ec243",
"Here is a side and the distance around.":"5106db54c205",
"Here is a square.":"db9580bd67f5",
"Here is a word from before.":"d4fa48db6448",
"Here is one layer of a box and how many layers.":"8f78487ef5aa",
"Here is one more for the rangers.":"14d6941640b9",
"Here is the line.":"594237203f73",
"Here is the problem in symbols only.":"dc57c8bc2657",
"Here is the same as a sum with a box.":"df09589a9214",
"Here is today's idea.":"833eb0afc3fa",
"Here they are in columns.":"8aec27f04cd5",
"Home":"3a2e8ed323a6",
"Hooray!":"dd634f17d21d",
"Hop from zero to the number.":"448b0d0c95a6",
"How long is each row?":"e6dd8af6cb69",
"How long is the missing side?":"9fef2c29a1a5",
"How long was it?":"9f1102cf24cf",
"How many apples?":"3167164496e2",
"How many are left?":"1fb548dc2235",
"How many are still on the table?":"3a6196ab33cf",
"How many bags?":"deeb3687a2f0",
"How many balloons?":"30b46376d9fd",
"How many balls?":"82c4f1d01aca",
"How many cars?":"7052cfb33f8d",
"How many cents?":"9944ae407a72",
"How many cookies?":"a73ccb965d19",
"How many counters?":"a1ed32f7d1b6",
"How many cubes fill it?":"1188d3706c25",
"How many cubes fit?":"9b535c13e28e",
"How many cubes?":"697758fb4a10",
"How many dots fill each row?":"1eaf2a13e0b2",
"How many dots? Tap the number.":"b5f3f20168f9",
"How many ducks?":"9b5480ec42f5",
"How many fish?":"6c6cf4fbc50d",
"How many fit?":"be50c20c15fe",
"How many flags?":"0b141ec63e78",
"How many flowers?":"6e46dc431952",
"How many for this one?":"0c454fea3095",
"How many frogs?":"8f98bcadd9db",
"How many groups?":"c9e391a90639",
"How many in all in this picture?":"ec778802bafb",
"How many in all on this picture?":"9cbdcebc9f73",
"How many in all?":"031d57f3a4da",
"How many in each bag?":"9f70df24d50c",
"How many in each group?":"3471673e58ee",
"How many in each?":"b791df3126db",
"How many more to make ten?":"3d1733cdc5bf",
"How many more?":"0e8e25d0ab2a",
"How many parts are shaded now?":"940f9b596c76",
"How many piles?":"96dcb303d98d",
"How many plants?":"8562efc2dc6b",
"How many rocks?":"68f2d4e42a5d",
"How many rows?":"bc17abe4b198",
"How many small units?":"0adb766c00fe",
"How many stars?":"cd6815d7458f",
"How many toys?":"a892c9ae2083",
"How many?":"2ab7650c0c2d",
"How much does each get?":"43f43ed2aa4f",
"How much in all?":"48de30edd792",
"How much now?":"9b3903cf8236",
"How much?":"d93970daba6c",
"Hundreds first.":"149c41f6e462",
"I am almost ready to hatch!":"a8558a57e88b",
"I got that wrong.":"1c77c1135936",
"I love it!":"0168194e3dfd",
"I love stars!":"ff78fa6ad11e",
"I made a mistake!":"72cda9b48553",
"I slipped there.":"91d560903394",
"I slipped.":"1888670f08fb",
"I was right this time!":"35b2e7ae38dd",
"I will make the groups.":"fe361e1e967f",
"I will tell you its kind.":"ccb6efbbfc7c",
"I will tell you the inches, and back again.":"3fa3ee8bece2",
"I will tell you what that many groups make.":"2bc85fe10c42",
"I will tell you what that many groups makes.":"8805a3f6bc91",
"I will work it out.":"6761c0a1d750",
"Ice in the sun melts first.":"8cae0ef5695c",
"Ice melts when it warms up. A rock stays a rock.":"ce28eef7e7e8",
"If x is cut into boxes, multiply to find the whole.":"e94e15986dd8",
"In a blend we hear both letters.":"5fae4deb9d3d",
"In the factory we need parts.":"9e1ee596215b",
"Is it something frozen?":"499fe22fdca1",
"Is it up or down?":"38d0ad3b22a3",
"Is this number prime or composite?":"fe6ad6ae0f1b",
"Is x one box or the whole bar?":"d82ada324988",
"It counts up one unit at a time.":"cceec73a0a40",
"It has equal sides like a rhombus.":"2e0c136a634b",
"It has the most!":"ec1df75f544a",
"It is different!":"4d3591f9bf40",
"It never means the base times that number.":"c0ea87217f68",
"It starts on the right, so we count from the zero there.":"49aa72ce219e",
"Just use the rule.":"18b876c3e3d3",
"Learn":"978e161634a8",
"Learn them together.":"781df865b7d8",
"Left of zero is negative, and further left is always less.":"223e2739bcdf",
"Leftovers break into the next place.":"9e31f64c25be",
"Less than that is acute.":"2c16b1b85a53",
"Let me help.":"b163316301ce",
"Let me try!":"807d4585fcd1",
"Let me work it out.":"6f0aab91b67e",
"Let's add these on the chart.":"28eb2c6e1704",
"Let's build every group.":"3d3e5f989f83",
"Let's count up by the small unit size.":"550f29d49016",
"Let's fill the missing spot in this row.":"6a5d3b68af02",
"Let's go on an adventure!":"8db0567a9ed4",
"Let's learn it together!":"8a649386b85e",
"Let's learn together and fill our notebook!":"ad8277b1c44d",
"Let's learn together.":"83b5f76ddc12",
"Let's look at it together.":"993efe70e1b6",
"Let's make ten.":"35db97b93f61",
"Let's play first.":"db8c12689502",
"Let's put little letters under their big partners.":"0200316fc3ae",
"Let's sort the pictures by the first sound of each word.":"f1171f682e79",
"Let's sort the pictures.":"313f557ec80d",
"Light for its size floats.":"7fc3082de1af",
"Light or heavy for its size?":"ef76da692f8d",
"Line up the places.":"aafb0fe626a3",
"Line up the points first.":"b5ef34f0f981",
"Line up the points.":"525a396b2560",
"Listen for the first sound.":"65e45a45ea30",
"Listen for the last sound!":"ff48c7b244a6",
"Listen for the middle sound.":"09b3e12e6b10",
"Listen to each sound.":"8afab055f010",
"Listen to every part.":"639ecb811647",
"Listen to the facts and pick the name.":"c691bf3a020f",
"Listen to the first sound of each word.":"0b9bcacf756c",
"Listen to the first sound of each.":"a5af86a60ea4",
"Listen to the first sound.":"4c7f5f3508dd",
"Listen to the last sound of each word.":"d1d18ee6785e",
"Listen to the last sound.":"413c0988b32f",
"Listen to the little word. Is it el or la?":"cb503c35f6f3",
"Listen to the middle sound.":"88effcc1375f",
"Listen to the start.":"3181077fa3ed",
"Listen to the story, then build its bar model.":"93a212135d7d",
"Listen to the story.":"88d647dffbe7",
"Listen to the very first sound.":"6be7000d4d7f",
"Listen to the vowel.":"d361ecb90746",
"Listen to the whole word again.":"45e6dc4374b6",
"Listen to the whole word.":"7ea546716c6f",
"Listen to the word.":"15d221b05cfa",
"Listen, then look at every letter.":"ccc99236e41a",
"Listen, then read the words to answer.":"4ec6747761f9",
"Listen.":"b28091f85ca2",
"Listen: they sound the same at the end.":"71906c444b3f",
"Little letters have the same names as big ones.":"1cf32931a0ea",
"Living things grow.":"657641417abd",
"Long division now.":"c1d10e43b64e",
"Long hand for minutes.":"e2b67fc58805",
"Look across each row.":"69f2f0523f35",
"Look again.":"9393e169225e",
"Look again. I made a mistake!":"ea7ea5ddf724",
"Look at all of them first.":"30aeca670f2b",
"Look at both plates.":"58f3a40b30bf",
"Look at both.":"d7223dc627de",
"Look at every letter, not just the first one.":"095015a6677e",
"Look at every plate.":"ac3a75ee0ad7",
"Look at the ABC strip.":"d7ad06e42999",
"Look at the bars.":"bc00731c29cc",
"Look at the blocks.":"b86012d8d0bf",
"Look at the frame.":"210c34c4d3be",
"Look at the hundreds first to see which is bigger.":"1e106736c034",
"Look at the letter in the middle.":"4e9d783bbcfe",
"Look at the letter.":"933a81cd865a",
"Look at the long hand.":"997ff5de8788",
"Look at the money.":"be1495fa21aa",
"Look at the ones.":"f5903fd5f950",
"Look at the pattern.":"d6dfc6b25a32",
"Look at the picture of the blocks.":"68d2aa9cab88",
"Look at the picture.":"0544fce4fbbd",
"Look at the pictures as you listen.":"dc711bb3c630",
"Look at the short hand.":"22f52aac7cf3",
"Look at the sides and corners.":"dc1cb3a42d94",
"Look at the sign. Are we adding or taking away?":"08e9a499fb8e",
"Look at the tens first to see which is bigger.":"e068bfc73fce",
"Look at these shapes.":"8cb8caab5365",
"Look at these two.":"7206a0ec4ca1",
"Look at these.":"216112c31385",
"Look at this chart.":"6396ee175a99",
"Look at this clock.":"df3b32f89217",
"Look at this picture of the box.":"f26439b67627",
"Look at this picture.":"b1879661082e",
"Look at your clock.":"e105fdf0ddc3",
"Look closely.":"0cbc2a755753",
"Look closely. Which way does it face?":"69934b660500",
"Look closer.":"53b5d8dc7a13",
"Look for a ten, then add the last number.":"278332bac5b8",
"Look for a ten.":"13de42b0de50",
"Look for the number on both lists.":"b05ba025f6ad",
"Look how tall each one is.":"da737318e5aa",
"Look where the long hand points.":"757d04bc75e0",
"Look!":"33c159295cf1",
"Look! Let me help.":"0d8da60f2611",
"Looking good!":"03eb8b6ae222",
"Looks like you know this.":"f3265d019b2e",
"Make a new pile for each ten.":"4c0439d6d2a1",
"Make a number bigger than this one.":"2139c59dd595",
"Make a number with rods and cubes.":"c5d06fd81393",
"Make a ten first, or use a double.":"630811e2f037",
"Make a ten in your head.":"d45d01e31bf0",
"Make a ten to add bigger facts.":"d6039ac326d8",
"Make an array with all the dots.":"604719af6986",
"Make any array you like with the steppers.":"52b734c166ea",
"Make any array you like.":"5e507cd6bf4a",
"Make any decimal you like.":"05804c18698d",
"Make any equal groups you like with the dots.":"59b83fd59bf3",
"Make any equal groups you like.":"5035f33d5f6a",
"Make any mixed number with whole bars and parts.":"19f4b1d6c73a",
"Make any number on the chart.":"6dd1924e44e4",
"Make any number with the blocks.":"db7b23b202d6",
"Make any number you like on the place value chart.":"80f4bc6154b7",
"Make any number you like with the blocks.":"e497d03151d4",
"Make any number you like!":"21ec83a6a58b",
"Make any number you like.":"5c6726e66fe7",
"Make any rectangle with the dots.":"df23d03c7740",
"Make any rectangle you like with the dots.":"ba7c1fa58350",
"Make any rows of dots you like.":"fab16533c076",
"Make any rows of dots.":"48690d0ba0c5",
"Make any time you like.":"a215970fd41e",
"Make equal groups any way you like.":"a0c1731f887b",
"Make one more angle for the gate.":"ac68b8beaccd",
"Make the bottoms the same first then add the tops.":"e0fe73f3ca04",
"Make the groups the story needs.":"8d34c4f1abb2",
"Make this one.":"61e95d469a79",
"Mark any spot on the line.":"8483eebb57c0",
"Mark groups over the shaded part, as many as you like.":"4baa1f8d88af",
"Mark groups until the shaded part is covered.":"a18a70aff7a1",
"Match each big letter to its little letter.":"e56dc1527a5e",
"Match each dot.":"3b3ec4694596",
"Match each word to its opposite.":"6c45fe5118ea",
"Match each word to one that means the same.":"5c550ce582b7",
"Match them up, one and one.":"54f9661041c8",
"Match them up.":"6af63efd6693",
"Match them up. More has some left over.":"265d8884c78a",
"Mean: add and share.":"9ffd1f81013c",
"Median: order, then the middle.":"7cb6f4980877",
"More digits does not mean bigger.":"7754340cbc32",
"More is obtuse.":"fea1060934f1",
"More parts means smaller pieces.":"110c7a08cabb",
"More than one? It needs an ending.":"50de882bbbaa",
"Most are the same.":"06e0955d27ed",
"Most words just add s.":"2abd2bfc6166",
"Move point A anywhere on the grid.":"3bf1127d401d",
"Move point A anywhere, into any quadrant.":"c8891e316cf2",
"Move the dot anywhere and watch the hop.":"efadbd6ebd83",
"Move the dot anywhere on the line, on either side of zero.":"ff0cd3b84f61",
"Move the dot anywhere.":"6388d58b2ba3",
"Move the hands on this clock.":"16d60b6885de",
"Move the hands to any later time.":"786421b3a9f1",
"Move the hands to show any time you like.":"0fa2711cdab4",
"Move the hands.":"af62c8b691f4",
"Move the level line.":"ae06e738ed30",
"Move the line until the extra blocks fill the gaps.":"b9047804aac0",
"Move the long hand forward.":"3a080db8ac61",
"Move the needle to any mark.":"e644865cdee7",
"Moving is not the same as growing. Living things grow.":"d1b16946b7ae",
"Multiple: hop until they meet.":"3f65f22c8646",
"Multiply as if there were no points.":"bbf4cffb5a8a",
"Multiply each place then trade ten for one of the next.":"49101be7741b",
"Multiply each place then trade ten of a place for one of the next.":"1d7180646811",
"Multiply the top and bottom by the same number and the fraction stays the same.":"2f1cd65ea634",
"My Pet":"468d6cf0bd75",
"My turn.":"c12cf5d35c5c",
"My turn. Check me!":"0b86cf7ebeae",
"Nailed it.":"f3bc72212cb1",
"Name each fraction you see.":"85b631f9de13",
"Name the shaded fraction.":"c078ba8b4fe1",
"Name the shaded part.":"f7be82d0a2d9",
"Name this fraction.":"f90e6306f7db",
"New idea today.":"48606a8b3bf3",
"Next put the point into the answer.":"53460feaf0b8",
"Nice work.":"fc37e79a19f0",
"Nice.":"f3702d656a24",
"No bar now.":"e8a0fc96f944",
"No clocks this time.":"1515cc812e96",
"No graph this time.":"6b8f43a06c02",
"No grid now.":"afe82a156706",
"No help now.":"94985e20d55e",
"No more ones?":"a6c8e76abb40",
"No picture now.":"75b7ed12fec0",
"No picture this time.":"33145679748f",
"No plot now.":"c625363d6c2c",
"No problem.":"0b2fc0127728",
"No protractor now.":"6abca2082c0b",
"No table now.":"4be238f894b1",
"No table this time.":"69494ba7ae7b",
"Not enough parts?":"bdcd5b1f702e",
"Now a few with me.":"6c98b549a1e8",
"Now add these big loads.":"063a9fc49316",
"Now add these in columns.":"64c887f5a4bd",
"Now add these written in a row.":"9849198371d3",
"Now build the reason.":"0cdb08be7852",
"Now do it with the symbols only.":"634ddfd4d5a7",
"Now find each part then add them all.":"02ccdf8b9e54",
"Now find it on the number line.":"fed9a25f1ed1",
"Now in columns with the points lined up.":"46549ae3e77e",
"Now just the numbers.":"ea83f0e40bd7",
"Now just the symbols.":"a68a6954473d",
"Now let's compare on the number line.":"61ab560b4ae7",
"Now let's compare these.":"ee654439e35b",
"Now let's compare with the place value chart.":"add8e026a0de",
"Now let's do some together.":"1013b9679933",
"Now look at the blocks and type what it makes.":"12ecc19fae06",
"Now look at the picture and type what you get.":"c2fe537b1317",
"Now look at the picture.":"793689f67204",
"Now pick the reason.":"a69749d629ce",
"Now put the point in the answer.":"1aa246502c40",
"Now shade these fractions on the bars.":"b16e3c316619",
"Now share a new number into a new number of boxes.":"e15564a72fa8",
"Now slide the pin to the nearer hundred.":"657dc9017fcf",
"Now slide the pin to the nearer ten.":"88299c19c6da",
"Now tell me why.":"ba7b4e1ec1a1",
"Now the fact in symbols only.":"0b9855387726",
"Now the full problem with the times marked.":"074d8f4d5e3c",
"Now the problem in a row.":"29a0ffabae43",
"Now the problem in symbols only.":"6da3d8d6b823",
"Now the reason, in words.":"649ef380dfee",
"Now the same told in words only.":"97243aadfd0c",
"Now the symbols only.":"815bca59a112",
"Now try it in columns.":"6ba214e06b93",
"Now try it with symbols only.":"17dec6491746",
"Now try it with the columns.":"b37bb9d0b4fb",
"Now try the problem in symbols only.":"f895d7556204",
"Now try the symbols.":"ebd72bd977a7",
"Now try this one with symbols only.":"391ae955e90a",
"Now type this length as a decimal for the map.":"2d618b6e3f8e",
"Now we take away in a row.":"7706e25ab0f1",
"Now we take away in columns.":"4bd847708a61",
"Now write the division in symbols only.":"8c166cc67edb",
"Now write the division.":"74033418116e",
"Now write the fraction for the shaded part.":"7688ff56343e",
"Now write the fraction these words tell.":"4e8880d1417a",
"One big unit is this many small units.":"6f0e467f7874",
"One box for each item.":"6ac70aee3361",
"One is different.":"19f4203ef1a4",
"One more angle for the carpenter.":"8d1ce762be2d",
"One more batch to share.":"0a73de92c383",
"One more box story for the crew.":"5b34d053fa08",
"One more crate count.":"47e405c888bc",
"One more for the bridge.":"5d505d88e95d",
"One more for the cave crew.":"cf73b508237a",
"One more for the cutters.":"6eca5db02997",
"One more for the map.":"ce1b3fec8667",
"One more for the notes.":"e9a0e06db782",
"One more job for the station.":"3d698b063a7a",
"One more job.":"bfd1481be34b",
"One more load comes off.":"3af9b1dacd8e",
"One more load for the ship.":"6e4a49a415ec",
"One more load of sand.":"e626f6904fcf",
"One more order.":"e74a59a25a94",
"One more pattern for the lights.":"3b2d921ea29c",
"One more point for the map.":"656c9a680f42",
"One more reading for the bakery.":"ef3bc431678f",
"One more shape for the gate.":"061e669576dd",
"One more sign to check.":"abc638596491",
"One more story for the camel train.":"3f7c33efa5b5",
"One more story for the store.":"b681eb669b65",
"One more story for the team.":"c829b79761ec",
"One more table for the market.":"6c5555d6a862",
"One more time for the fox family.":"04445e85a530",
"One more to mark on the map.":"c43f15c9e0e0",
"One more total for the crew.":"321384bb386f",
"One more with the model.":"dce0d70b2586",
"One more, together!":"8487acd6f039",
"One more, with the picture.":"ee339102115f",
"One more.":"40131f6c099c",
"One more. Find my mistake!":"ba4ccd1d6981",
"One number for each thing.":"ebfd99ca11ee",
"One tenth first, then scale.":"b57d7748299a",
"Ones first.":"b6cadbd1169e",
"Only one digit fits in each place.":"d0043afd78fd",
"Open the angle any amount you like.":"0da418c5e35e",
"Open the angle on the protractor any amount you like.":"305b78199adf",
"Open the angle to the number.":"a02ee39840a7",
"Open the angle until it is the kind I name.":"76add7025471",
"Opposite sides match.":"e4c43a74e8c9",
"Part of a part: multiply the tops and multiply the bottoms.":"3d999c5ae2c1",
"Parts first, then wholes.":"b8470d81314b",
"Percent story: shade the bar.":"17c1640a936c",
"Perimeter is the distance around.":"68645d59b824",
"Pick a base, and how many times to use it as a factor.":"1df04a0462f0",
"Pick a game!":"5929bf5b0ef6",
"Pick a number and a group size.":"760431d41761",
"Pick a number to divide, and a divisor.":"5b8ae29885e3",
"Pick a number.":"aad1ff2a4e2d",
"Pick any numbers.":"dee80418e10d",
"Pick how many equal groups to share it into.":"010868896323",
"Pick how many feet you need for the desert path.":"14c682c787ba",
"Pick how many feet.":"d7658a6e9893",
"Pick its time.":"e69687930c0e",
"Pick the best name.":"f294d6f9a340",
"Pick the boxes, then how many go in each.":"1942e43aff30",
"Pick the numbers.":"ad589144a9b1",
"Pick the one written right!":"14fa2f22974e",
"Pick the right words.":"f8679ddfba3f",
"Pick the word for more than one!":"be6146b604ac",
"Picture both on the line.":"5e26a5e558d6",
"Picture each fold.":"2661d85a5313",
"Picture it first.":"72c4a8c61fd0",
"Picture it, then multiply.":"5d2e25fdbe42",
"Picture the grid: which way does each sign point?":"e8196971a686",
"Picture the line.":"899da6c387cb",
"Picture the line: which way, and how far?":"fabe14dd7806",
"Picture the moves.":"176f1333e3d9",
"Picture the pieces.":"e97cce743908",
"Picture the shape and fold it in your mind.":"9f9b4f5c599c",
"Picture the shape in its rectangle first.":"ffb6d2f3776a",
"Picture the story first, then pick the operation.":"510b1ec8322a",
"Picture the story: equal groups make a rate, tenths make a percent.":"01c62d5bbcc2",
"Place it.":"d5bf126a0c02",
"Place the point.":"46b4a47bfd9a",
"Plants are alive. They grow, even if they stay still.":"0f9703cef5b6",
"Prove it!":"12cf379ac106",
"Put a pin anywhere on this number line.":"1a4d462c93df",
"Put any coins you like in the purse.":"9f47cc53b9f3",
"Put dots on any marks of the line plot.":"a1f20d5f15c6",
"Put each little letter with its big partner.":"9d452d2903ca",
"Put each one with its blend pattern.":"7c46757f6dd5",
"Put each one with its letter team.":"8d447c72737a",
"Put each one with its vowel team.":"d3ae4609c0c0",
"Put each picture with its group.":"c0044e685fa6",
"Put each shape with its group.":"beed818999a4",
"Put each with its blend.":"08ad3d5b7cab",
"Put each with its letter pattern.":"291372598a08",
"Put each with its pattern.":"fc33b7bc756b",
"Put in a rod, or take one away.":"216a91dcb088",
"Put in as many counters as you like!":"5ba64b76e358",
"Put in every group then trade.":"0b27113e6ca3",
"Put in more counters than the dots.":"f8147cf0f247",
"Put in some blue and some orange. Any way you like!":"a3429335b790",
"Put one dot on the line plot for each length.":"96b9c6e01917",
"Put the animals together and the food together.":"27b3c37bae49",
"Put the big ones in the big box and the small ones in the small box.":"959642806e2d",
"Put the big ones together and the small ones together.":"b1b045bc6177",
"Put the letters in ABC order. Sing it with me!":"bbf5a2172fcc",
"Put the number in for x.":"844773264d01",
"Put the parts together into one number.":"c22159d46d50",
"Put the pin on the missing number.":"7c0ae4f279c8",
"Put the words in order.":"691f3fbf52f9",
"Put them in the frame!":"330a6a99841c",
"Put them in the frame.":"675c8501ff45",
"Put them in the rhyme box.":"79653368be44",
"Put them together!":"c6fb137c3136",
"Put them together.":"ed382f8d6e64",
"Put these letters in ABC order on the sand.":"8edb83ebaa77",
"Puzzles":"ed8d82b5f390",
"Quarters first.":"125c636b2193",
"Quick one first, then we build!":"43d7a99d3217",
"Quick one from before.":"803d67f79918",
"Quick warm-up first.":"11b26a1e7b3f",
"Quick warm-up.":"171adb047f7a",
"Read across first, then up.":"a5d881747f8d",
"Read and find each rhyme!":"5f2470dbffec",
"Read each one out loud.":"9b7a04225cb1",
"Read each one!":"905daf2d2fe9",
"Read each sentence!":"e0a5659af485",
"Read each word, then the whole sentence.":"6f86ecabe510",
"Read it out loud.":"23321ceee569",
"Read it out loud. Does it sound right?":"84e6c41f60a6",
"Read it.":"5b192dc3e6cc",
"Read it. Then tap the picture that matches.":"e4eaa0facb7a",
"Read one word at a time.":"a7d53a97a66c",
"Read the first word.":"eb258f9cc025",
"Read the graph.":"58c3bdc5d852",
"Read the sentence.":"2198838de2ba",
"Read the word.":"ded3b64ce952",
"Read the word. Then tap its picture.":"a0d569f71d42",
"Read the words.":"c52c1aba982f",
"Read these points off the star map.":"5cd96ffe6544",
"Read this one.":"258fff093865",
"Ready for a quick challenge?":"ac84b557cacb",
"Ready when you are.":"240374108375",
"Remember this one?":"4fe62611b819",
"Remember, moving is not the same as growing.":"f3c59feff7d3",
"Rename a fraction out of a hundred; then the top is the percent.":"5be8a4be0ad5",
"Rename it out of a hundred, then read the top.":"94f0056f4722",
"Rename the first fraction to match the bottom bar.":"d8c265942140",
"Rename to same size parts, then divide the tops.":"403ee645e8e7",
"Rhyme, or no rhyme?":"42221fb67507",
"Right is adding, left is taking away.":"4a9471aa8273",
"Right on.":"0b4fd0dc6543",
"Rods are tens, cubes are ones.":"63fa0c35177d",
"Room left?":"73559b59f4be",
"Round this one.":"87f1afc3bcba",
"Rows go across.":"00b7e0cac205",
"Rows of the same size make an array.":"3eaa92c91f54",
"Rows times how many in each row.":"92d1878b789c",
"Same idea: guess, multiply back, check.":"fe12673d749a",
"Same means it says almost the same thing.":"c0e31aa1f7b9",
"Same-size parts add like things: add the tops, the bottom stays.":"9284806aee23",
"Say both blend letters as you build.":"4cea1b99676a",
"Say each one quietly.":"dba565663c1c",
"Say each sound as you build.":"a13d71256155",
"Say each sound, then blend them.":"57820f680557",
"Say each word.":"5a1169569a3e",
"Say every letter at the start. Both of them.":"1148b144284f",
"Say it once more, then keep going.":"a3652fcbf423",
"Say it out loud with me.":"8fb2b4e59e39",
"Say it slowly and clap each part.":"1d7794960ab2",
"Say it slowly.":"f040000394af",
"Say it slowly. Listen to the very end.":"c9c3b7458bc7",
"Say it with me!":"e7d92b61f247",
"Say it with me, out loud.":"294d804fae65",
"Say it with me.":"36fd724720ef",
"Say the pattern out loud. What comes next?":"dfe0c5ef8e11",
"Say the pattern.":"07532ca158c4",
"Say the word and clap with me.":"eec5fa8938c9",
"Say the word slowly.":"d33205d546fa",
"See the boxes in your head.":"febf4a2f966c",
"See what it does to each number.":"295213d17659",
"Set an o'clock time.":"8920bd38f03c",
"Set any base and height.":"794a9ebf75e5",
"Set any rule you like.":"cbc0dada5ba7",
"Set any rule.":"5936d5a65036",
"Set any time you like!":"21dabb76f646",
"Set any time you like.":"97215593214f",
"Set the base, then how many times it is used.":"9f9cc047d47e",
"Set the base, then the height straight up.":"5d69d7e1a5ca",
"Set the clock to this time.":"9afefdbbd83b",
"Set the clock!":"93e6f54a78d0",
"Set the rule from A to B.":"759b44a0245a",
"Set the rule that works on every row.":"18c16cb706a5",
"Set x to any number and watch both bars.":"42cbc35e2e89",
"Set x until both bars are the same length.":"6defe0c73d1d",
"Shade any amount you like.":"0d476cb85b35",
"Shade any parts on each bar.":"1369d73cfcf3",
"Shade any parts you like on both bars.":"ce72a1ea1b18",
"Shade any parts you like on the bar.":"c0299d1e3dbc",
"Shade any parts you like.":"b3a24904467c",
"Shade any percent of the bar you like.":"8ba99c9cbec6",
"Shade any squares in the grid.":"ad040494f8cf",
"Shade any squares on the grid.":"7b0ad2348a66",
"Shade any squares.":"22ee5b7f5463",
"Shade as many as you like.":"8d797f2b5eb9",
"Shade each part.":"9aae991a7cea",
"Shade part of the whole to match this.":"1f48cc4b3479",
"Shade some parts on each bar.":"b87dc90d21c8",
"Shade the bottom bar to match the top bar.":"b97a04b1d10f",
"Shade the boxes you need.":"9273684747ea",
"Shade the fraction the story names on the bar.":"0adaf38d66a7",
"Shade the fractions on the bars.":"aed98fec3e63",
"Shade the overlap of these rows and columns.":"efc07965dc97",
"Shade the same amount of the hundred grid.":"4e586b4bf104",
"Shade the same amount on both bars.":"e7a6858789c7",
"Share it into equal groups.":"4ab2f2b35aa8",
"Share it out.":"2929938c31e5",
"Share the biggest place first.":"a59f019c9e54",
"Share the total by the number of items, then multiply for more items.":"63e0c63e3021",
"Sharing into equal boxes is dividing.":"97fa67d25c83",
"Shells float away from the reef.":"d466f74a1c12",
"Short challenge.":"1617a847a688",
"Short hand first.":"31211f15c93d",
"Show me a ten and some ones.":"9d7d9b9e07a3",
"Show me what you already know.":"3769858383e5",
"Show me what you know.":"711b2c4f0baf",
"Show me!":"2d1e4381b11d",
"Show me.":"0beb5724b76e",
"Show what you know.":"5819cc7f12c3",
"Sing the ABC song. Which letter comes after?":"f3148a317488",
"Sing the ABC song. Which letter comes first?":"2d117fa82bc4",
"Sing them in order with me.":"8740c3a759e3",
"Size does not decide.":"0db6b29516eb",
"Size does not decide. Light for its size floats.":"6ae2115b9c06",
"Skip count equal groups to find how many.":"b26becd0c440",
"Skip count the groups.":"8f08778caef2",
"Skip count the rows.":"bb7f7fc6c1ab",
"Skip count them!":"36be87562dc8",
"Skip count to find how many.":"96b21abdf666",
"Slanted lines can fold a shape too.":"028ebd4e7a49",
"Slide the pin to the nearer round number.":"b021e223b8eb",
"Smaller units need more of them, so multiply.":"169442ed21e9",
"So clean!":"6e2b80f489a3",
"So cool!":"92fc0425ab67",
"So it is both.":"2e58b2d53cba",
"Solve for x.":"18aca55e5e1f",
"Solve these.":"f276a86244a1",
"Solve this one.":"bf7f9e86cd17",
"Solve this story.":"b78bc95cf9ef",
"Solve this.":"9be11c2a0d47",
"Some letter teams make one new sound.":"58cb4466bf69",
"Some letters we do not hear.":"0643ff557483",
"Some shapes look alike.":"646fba7190bc",
"Some went away. Count only the ones left.":"d3ce54b1bd3a",
"Some words mean almost the same.":"23aed150deef",
"Sort the big ones and the small ones.":"b1613f6b2b33",
"Sort the numbers: even or odd?":"9d9e9773f390",
"Sort the pictures: add s, or add e s?":"5acc00b2cdaf",
"Sort the pictures: who, what or where?":"93fb757adcec",
"Sort the shapes with me.":"64e62a3cedab",
"Sort the words: naming words and doing words.":"2775bc87d8f6",
"Sort them again.":"a5112c8f870b",
"Sort them with me.":"b5bdc6e748d3",
"Sort them!":"a1f469a389ca",
"Sort these into big ones and small ones.":"032a778d2e0b",
"Sort these out.":"e4f0ba4d4e39",
"Splish splash!":"3153d7a6d339",
"Start at the first number, then move the dot.":"b17e1906055d",
"Start at the mark and count the steps in your head.":"9c066e9dcc54",
"Start at the mark.":"fbaed7db2c58",
"Start at zero on the side the angle starts.":"c13608219a5d",
"Start with the capital.":"4dcb64ed5042",
"Still solid.":"3d28b8cf9a95",
"Sunlight warms things up.":"20320b85bd78",
"Sunlight warms things. The shade keeps them cooler.":"050b00452193",
"Symbols only now.":"2ab273d8cc86",
"Take away as many as you like.":"8239244de747",
"Take away in columns: ones, tens, then hundreds.":"ae53aedeedf7",
"Take away in columns: ones, then tens.":"71de2160f922",
"Take away the ones, then take away the tens.":"190cbebd0029",
"Take away the price.":"37db85a6f863",
"Take off the known part, then split the rest.":"4f07624207aa",
"Take some away.":"222cdff9de81",
"Take these away.":"2f120172a021",
"Take your time.":"535065322a53",
"Tap Clap for each part.":"41852b65cd16",
"Tap a little letter, then its big partner.":"b8097402cf41",
"Tap a picture to hear it. Clap it. Then tap its bin.":"b053817ce837",
"Tap a picture to hear it. Then tap its letter.":"c3d2f40a758d",
"Tap a picture to hear it. Then tap where it goes.":"7051b073790d",
"Tap a picture, then tap Big or Small.":"50f426c30dc6",
"Tap a picture, then tap its group.":"6579b0192bdf",
"Tap a piece, then tap it again to turn it.":"619490c2d576",
"Tap a puzzle to play!":"a840abf2a4cc",
"Tap a shape, then tap its group.":"eef0a9180771",
"Tap a square, then tap an animal.":"7d7982250db0",
"Tap an item to try it on!":"313ddc9099f3",
"Tap each card to hear it in English and Spanish!":"b4a4bf47657b",
"Tap each word I say!":"b83d3e8501fb",
"Tap every one that works.":"574eb92147b2",
"Tap every true fact.":"b000f0a08fa5",
"Tap it.":"8401ba6ad343",
"Tap its big letter with me.":"e1d177a9812c",
"Tap its big letter.":"cb33c8f3d6d1",
"Tap its big partner.":"2c9882ed55a8",
"Tap its little partner.":"a506b9adc606",
"Tap that little letter.":"7dba1fb6f79f",
"Tap the arrows to help the robot get to the flag.":"86553b9fac84",
"Tap the big letter you hear.":"6828f7c94bec",
"Tap the circle.":"0351139e6e3d",
"Tap the facts you think are true.":"7bd9b8906ca4",
"Tap the glowing stop to play!":"059490efe8c3",
"Tap the letter it starts with.":"a65b3fc2e885",
"Tap the lines you think fold it into matching halves.":"10033df7d32c",
"Tap the number you hear.":"1667643e79a5",
"Tap the one that is different.":"f921980db228",
"Tap the pin.":"550771090de5",
"Tap the plate with the most.":"52ea083e68b0",
"Tap the rectangle.":"441416056c96",
"Tap the right picture for each letter!":"64b4f8b92381",
"Tap the square.":"eaf343ffacc1",
"Tap the treasure chest!":"765d2147b441",
"Tap the triangle.":"15c04b7dab8a",
"Tap the true facts.":"d12234b80211",
"Tap their number.":"1c913b78f8cc",
"Tap what comes after each.":"829bc87482e2",
"Telling ends with a period.":"7921c9c30a1f",
"Ten counters are in the frame.":"b6186ed0b47c",
"Ten more or ten less changes the tens digit.":"12c690c92bca",
"Ten ones make a ten. Carry it over.":"24df29582747",
"Ten squares make one whole.":"d97ba0253154",
"Tens first.":"f37d451be927",
"Test a rule on every row.":"89ffd900b9c1",
"Thank you!":"de1b2f3452c3",
"That holds up.":"b32d1caaa6db",
"That is a rhyme!":"07d1b7375ab9",
"That one was actually right.":"418f6b766a9f",
"That one was fine.":"f23a9239d959",
"That one was wrong.":"6bf6001868ea",
"That was fun!":"ababe62598da",
"That's okay.":"a83cd44ef45e",
"That's okay. Let's learn it together!":"10386f14d0fb",
"The Puzzle of the Day is open every day.":"521605de4129",
"The Sky City planners run on rates.":"4f7d22c7f16e",
"The animals are stocking the forest store.":"b479c57d89a3",
"The animals need help in the meadow.":"93c413180cf6",
"The bakery needs its flour and water measured.":"04382baf80be",
"The bar is drawn.":"4b40822b6712",
"The bar model is drawn for you.":"5f651f245fa6",
"The bar model is drawn.":"0001bb7f5d6f",
"The bars match when both sides are equal.":"f4f823878e0e",
"The bars show the parts.":"80300862690c",
"The beach needs signs.":"e491e636993e",
"The bead shop mixes its colors by the ratio.":"eedba8504827",
"The biggest size that splits both is the greatest common factor.":"014967e95acf",
"The boat needs a time to leave.":"f5fee907171a",
"The boat needs flags in rows.":"bda8d8f20835",
"The boat shop gives change too.":"489910a00e72",
"The bottom counts the equal parts.":"f14b6c894a5a",
"The bottom stays the same.":"edc20896a0b5",
"The bridge builders measure rope in different units.":"8517a766f0cf",
"The bridge needs fixing.":"b5f5a918a57c",
"The bus station needs signs.":"0e7f25b3eacb",
"The cable crew measures distances across zero.":"2de584338389",
"The camel train is packing for a trip.":"e6e044065b53",
"The candy shop has a clapping game.":"07da7720f110",
"The candy shop has story time.":"c6ed25699eb5",
"The candy shop needs name tags.":"f72f33b47ae1",
"The candy shop needs rhyme labels.":"ee7bf230cf6a",
"The candy shop needs signs.":"c89d36ccfe43",
"The candy shop needs word signs.":"afd982a95e2e",
"The candy shop packs bags.":"033863258b9d",
"The canyon bridge needs boards.":"a59816bf5570",
"The canyon path needs stones.":"83e173a888fa",
"The canyon shop sells candy.":"85a1287ca64b",
"The canyon trail needs steps.":"1a6a5a2e1348",
"The carpenter needs these angles measured.":"1951587c4626",
"The cave crew is cutting crystal rods.":"a453f8ac73a1",
"The cave lights follow patterns.":"607ba1873996",
"The cave map needs its points named.":"814c2659bfc6",
"The cave team is sharing out supplies.":"d86f6e9d97ca",
"The caves need light of each kind.":"a0b5018dbff2",
"The classroom needs labels.":"e6eb34681558",
"The clock shows the start time.":"bcbbcc49e200",
"The clock tower needs bells.":"2c78406df01f",
"The clock tower needs flags.":"c9e9ddc32dc2",
"The clothes shop needs price tags.":"09d4556e08bb",
"The core's power cells run on these formulas.":"daad8a34e24d",
"The core's power rods split their charge equally.":"fcb6adab6a4a",
"The crab wakes up soon.":"c8c6e7b31734",
"The crew logged new readings.":"8a338b3b98ef",
"The crystal box needs filling.":"f968432a6953",
"The crystal cutters need to know how many pieces they get.":"356837a145d2",
"The dashed rectangle fits around it.":"1cd6baf0d18b",
"The desert gate needs angles of the right kinds.":"884b299977d8",
"The desert market has a price table.":"9f431dc757fa",
"The desert signs must match when folded.":"18d0cf2a0b86",
"The desert trail needs a sign.":"2a3660322192",
"The desert trail needs supplies.":"c13ee3174223",
"The doctor's chart needs labels.":"62c3443def75",
"The e at the end changes the vowel sound.":"53ac8ca2e645",
"The e is quiet, but it helps the vowel say its name.":"d4027be47e3a",
"The extra box stays as it is.":"f5400df658fd",
"The factory adds big orders.":"88361cb1bf09",
"The factory counts loads of parts.":"8e66583e0e69",
"The factory needs a part number.":"3a68b23ea3f1",
"The factory needs equal boxes of parts.":"fa71d2378139",
"The factory needs rows of boxes.":"53adad958bea",
"The factory needs to share the new parts into equal boxes.":"56bcb5a5f326",
"The factory orders parts in round numbers.":"e831f36a0596",
"The family album needs labels.":"90acdb2f30ba",
"The first number both count to is the least common multiple.":"6e12dd01006c",
"The first place after the point shows tenths.":"14935760c833",
"The fish eat soon.":"734482da39e5",
"The fish need a time to eat.":"d36a174d00e8",
"The forest clock shows when the animals eat.":"b7b7f4b421a2",
"The fox family timed their walk.":"66cd06bb41ba",
"The garden crew measured their seedlings.":"59313fe50283",
"The garden gate needs the right shapes.":"b9d0b95b67f1",
"The garden needs new grass.":"41dd71e5a3f4",
"The garden needs rhyme labels.":"163c1713b549",
"The gate code is the value of x.":"bc71857f7506",
"The gate needs its codes.":"f7968d9d151d",
"The grid has a hundred squares.":"0635d324ce44",
"The groups are drawn.":"34b5fa9af0e1",
"The hop always starts at zero.":"db3b7bd87725",
"The lab is packing samples into crates.":"e9c5a4a0e251",
"The lab needs a reading.":"a50812e046f8",
"The lab needs more mixes.":"84253a1297bb",
"The lab needs some mixes.":"2419970e8550",
"The lab needs some readings.":"da286c05d630",
"The lab needs the reading worked out.":"d234e520a8d3",
"The lab needs these amounts mixed.":"60a2b96d8e79",
"The lab packs trays.":"4d32094e2040",
"The lab shares powder evenly between jars.":"a547357815c3",
"The last letter is only a clue.":"8d3d8db4f67a",
"The last letter is only a clue. Listen for el or la.":"0c8d907d8e54",
"The last number tells how many.":"8403d53f7a9f",
"The lava needs a round number for the next step.":"f4355653275c",
"The letters we do not hear go in too.":"55a390f8eeea",
"The little farm needs signs.":"f7d45facea22",
"The long hand shows the minutes past the hour.":"833ed10332af",
"The map shows the treasure in parts.":"9a5b9873f41f",
"The market needs price tags.":"2125e6663742",
"The meadow gate needs signs.":"c661e044ee35",
"The meadow needs signs.":"ac9754782aca",
"The meadow path needs signs.":"b668b2b4400c",
"The median is different: the middle number once they are in order.":"f4557f714e25",
"The number we see is not the answer.":"38b721d4df54",
"The ocean reef needs signs.":"0bb99cf5ddac",
"The one further right is greater.":"784eeb0daf31",
"The one with some left over has more.":"d59e60106862",
"The open side faces the bigger number.":"0970d970a58b",
"The others go in no rhyme.":"b811e5534550",
"The paint shop labels its tins in percents.":"c36411bdc27d",
"The panel crew cuts strips into pieces.":"ee78d40dafb5",
"The parts already match.":"49c8a53f4e05",
"The parts left over make the fraction.":"4de6196fc00f",
"The path in Tiny Town needs a pattern.":"943ada81d833",
"The path needs a fence all the way around.":"214b10e64fdf",
"The path needs a round number of steps.":"35b8d6aa25ab",
"The path needs a sign at each hundred.":"a268fb39baab",
"The path needs blocks.":"edecb5547983",
"The path needs clearing.":"8c207fe232e2",
"The path needs equal fractions.":"20b37204f161",
"The path needs groups of rocks.":"4c3a2e69b03c",
"The path needs plants.":"28c670dab513",
"The path needs sand in parts.":"0ed30e0e180b",
"The path needs signs.":"b4c92a8ac308",
"The path needs some pieces.":"9ab3150c901f",
"The path needs the bigger piece.":"706a928c1279",
"The path needs the simplest form.":"43152dcae09c",
"The pattern repeats.":"73173b9ba12a",
"The pet shop counts toys.":"2dc2ee6d0e69",
"The pet shop needs name tags.":"1bf50d074a45",
"The pet shop needs signs.":"57c56f791baa",
"The quiet e goes in, though we do not hear it.":"6b87092b1349",
"The rangers made graphs of the forest animals.":"5f0eab536faa",
"The reef gate opens for the bigger number.":"cd8eacee7771",
"The reef has story time.":"73b54c2d187b",
"The reef needs shells and rocks.":"d51c33fd35fa",
"The reef needs word signs.":"321d886bc4f4",
"The reef shop counts shells.":"6190f0d4f6dc",
"The reef shop needs coins.":"a83352b783b0",
"The reef shop needs labels.":"b110ceb12343",
"The reef shop needs signs.":"082c8647432f",
"The sea animals need name tags.":"bb9e950e8ac6",
"The sea needs signs.":"0dc84bb95ccc",
"The shell shop gives change.":"db16f6a4e745",
"The ship leaves soon.":"efd29dca4b0d",
"The ship needs money for the trip.":"5cb388840e87",
"The ship needs supplies.":"db71f0d0c663",
"The ship sails soon.":"6a1c63d357bd",
"The ship unloads supplies.":"0c2c8104d645",
"The ship's crew has orders and sales to settle.":"113e0c59e88d",
"The ship's map has numbers.":"0ed99a74607a",
"The short hand shows the hour.":"e54827185ae2",
"The short hand tells the hour.":"143c8e704b02",
"The sides are told in words only.":"9a1bfb5a6d5a",
"The signs of the numbers tell the quadrant.":"63c52c568c71",
"The simplest form has the fewest biggest parts.":"49661759bf6f",
"The small number counts the factors.":"37436cd676ce",
"The snack bar needs menu cards.":"143de75ec56f",
"The space crews need matching packs.":"3567b222cd84",
"The space lab needs signs.":"262cd799da01",
"The space shop takes quarters too.":"124b81c36223",
"The space station door opens for the bigger number.":"c217183afaf0",
"The space station needs labels.":"67bd2279a7b9",
"The space station needs messages.":"0e10c3e62333",
"The space station needs power cells.":"0912e1e5fe5e",
"The space station needs power.":"1ea7d82ea6fb",
"The space station needs signs.":"009a49ec56db",
"The space station needs supplies.":"7fdbdc1d4e5d",
"The space station needs word labels.":"0bd5af99e1ae",
"The space station packs supplies in equal groups.":"cf1f2f92fe8c",
"The space station shop needs coins.":"048fd5ee81c0",
"The space station stacks power cells in equal groups.":"338c1d57c72e",
"The space walk starts soon.":"43d42d9121e2",
"The station's panels need covering.":"b6f1be5b6a5d",
"The station's power readings use exponents.":"cfe6211042a0",
"The supply depot hands out shares by percent.":"0d6fc5f9823d",
"The tens come first. Then the ones.":"0dc52ea6735b",
"The top counts the parts we mean.":"069f7570dc94",
"The total is on top.":"0641cda79468",
"The tower lift goes above and below the ground.":"d878bd1ebd51",
"The tower needs blocks for the top.":"1a89f1b66761",
"The tower needs layers of blocks.":"69c285935cf7",
"The toy shop needs help.":"83bc11a19bd9",
"The toy shop needs labels.":"207d2feeeafb",
"The trail crew packs supplies in equal boxes.":"132542e2f114",
"The trail has marks on a line.":"20795eeb80c3",
"The trail needs a fence on every side.":"cde61bb15615",
"The trail needs a sign about living things.":"b9e89119b063",
"The trail needs mixed numbers marked.":"013bf24a8fb2",
"The trail needs signs at the right spots.":"54424ad0a2eb",
"The trail needs the bigger fraction of water.":"5dbdd4759cae",
"The value of x is in each box.":"5887a5adf264",
"The weather station compares cold readings.":"9c3b40d08b7e",
"The words go in an order that makes sense.":"a91eb2f4acbd",
"The workshop needs its signs read.":"8d82585c1dde",
"The workshop needs labels.":"b28cf383f8eb",
"The workshop needs word labels.":"ceb45e726767",
"Then answer.":"5a139227064f",
"Then ask: what do the leftovers mean in the story?":"463d177bdf3e",
"Then check.":"0d8199035b9b",
"Then count the digits after both points.":"7d883797dca3",
"Then find its opposite.":"19de84e1498b",
"Then find its picture.":"5231cf42f44f",
"Then find its rhyme.":"98ee604b21ec",
"Then find the one that rhymes.":"7c97462c3a28",
"Then finish.":"c67833183a00",
"Then multiply or divide.":"bfa7678a03f0",
"Then pick its kind.":"ca4b5707b3c7",
"Then press Go.":"29e1d4e2d5c8",
"Then put in more.":"2c731d523b75",
"Then put it in its bin.":"ac7a97b94c56",
"Then put the point back in the same place.":"2338a8dbc16c",
"Then read it to me.":"fdcff2e0c794",
"Then read it.":"faeb64015469",
"Then read the sentence.":"b512d8cdadfe",
"Then sort each picture.":"388a3f5260a6",
"Then tap its picture.":"6be255b0c85a",
"Then tap the pads in the same order.":"4858882e6610",
"Then tap the shape I name.":"da2c7d0cff61",
"Then tap the word you saw.":"9128041a48d5",
"Then undo.":"6c9499162282",
"Then use it on the new number.":"ebfda002212b",
"Then we build the new idea.":"223d825e1ed4",
"There is no wrong way.":"c14c4fdaa33b",
"These puzzles open when a grown-up unlocks Whistlestop.":"c00bf79c703a",
"These two letters make one sound together.":"e0c5f04021e4",
"They are as different as can be.":"ba45e0983629",
"They are partners!":"ff6f4d1b5442",
"They are synonyms!":"442bab8b568d",
"They still go in.":"f0cadd7bfe1d",
"Think about the leftovers.":"64d4647adf00",
"Think about the whole angle first.":"acb5cf4bba4b",
"Think back to the story. Was it there?":"3a1d87108bd2",
"Think in tens or hundreds, just like ones.":"40a65ae2ba5a",
"Think of a square corner.":"f765a664e7b8",
"Think: how many hundredths is that bar?":"9b1c8a33e3d8",
"Think: is it alive?":"fbb4aa91a059",
"Think: where is it warmer?":"d76ab77b53f6",
"This one holds up.":"813d4ef729b4",
"This one is bigger.":"ae2db6b494bb",
"This one is right.":"fd3b177afcd8",
"This one is smaller.":"d230c58e9c9b",
"This stop opens when a grown-up unlocks Whistlestop.":"d8fea42abca9",
"This world opens when a grown-up unlocks Whistlestop.":"44daf8966631",
"Those letters work as a team.":"6b5b0a8fb67b",
"Those vowels work as a team.":"c59a9ef03de4",
"Times comes before plus.":"7a3678e29a24",
"Times first, then add.":"799f53e6a350",
"Times first.":"4960fe2c4b65",
"Times means groups of.":"7fc02be95f4b",
"Times means rows of.":"1e9dbafcac1c",
"Times ten moves every digit one place to the left.":"cf2712e9792f",
"To get x alone, do the opposite to both sides.":"6d706c7d7770",
"Too much?":"9e157d9175ae",
"Top take away bottom. Not the small from the big.":"20fec2316531",
"Toys and rocks do not grow.":"ca1596fd775a",
"Track it.":"f936753e592f",
"Trade or break a whole as you go.":"03dc6521c8d9",
"Trade ten for one of the next place.":"2ce2fd4c9ae7",
"Trade ten ones for a ten.":"906c7b9c3466",
"Trade them.":"ce33053b31f4",
"Trade when a place needs it.":"87e13837412a",
"Trade when needed.":"a14cb3148892",
"Try a number.":"0203c8c92d40",
"Try any group size.":"0ed763d81ff0",
"Try fewer.":"9172d69ff7d4",
"Try it with the picture.":"4f2e8afda2af",
"Try more.":"26f257c1c654",
"Try this first.":"bbecdc7370ef",
"Try this one with symbols only.":"937155e61664",
"Turn the cards over, one at a time.":"da29ab5dc8df",
"Two vowels side by side make one sound.":"41c17a1be3d3",
"Type the bigger fraction.":"736ee8f208d2",
"Type the decimal for the shaded bar.":"6003cbd60fa9",
"Type the fraction at each mark.":"93b227041a71",
"Type the length as a decimal.":"345a7b45601f",
"Type the missing number so both bars match.":"675d8075b8ee",
"Type the missing number so both match in symbols.":"02e0d64e542a",
"Type the missing number to match.":"0be277bb8fcd",
"Type the missing top number.":"da85ceb0e41c",
"Type the nearer ten for this number.":"74eb261c5d17",
"Type the number we round to.":"81c5b3e5d69e",
"Type the total.":"30dfda03d252",
"Type the whole bars and the parts left over.":"2d2ef07c0da7",
"Type what is left.":"ff05835725ca",
"Type what it shows.":"1fba0eed5ee3",
"Type what you know.":"0457b6ab935f",
"Undo it in your head: the opposite operation.":"d29f374ee3ed",
"Undo the known one.":"b4c4c518027e",
"Undo the plus or minus first, then the times.":"76ca0a217896",
"Undo the steps in reverse order.":"27401df22240",
"Undo times with divide, and divide with times.":"ca2a9151f909",
"Use any blocks you like to make a number.":"ba12a667c99a",
"Use any coins you like!":"2eb91a9a75ad",
"Use both colors on the double frame.":"9ef013290b7e",
"Use both colors.":"2fd4a1d72d9c",
"Use it for the empty box.":"8cda2110dfe1",
"Use the blocks.":"b1084162ec03",
"Use the chart.":"566f16a65655",
"Use the flats, rods and cubes.":"986912a2d460",
"Use the height, not the slanted side.":"9a040f8616fa",
"Use the key in your head.":"fa1ce1decd9e",
"Use the model to find the missing number.":"3826b171cecb",
"Use the model.":"9c7f052913e9",
"Use the place value chart.":"163c7993c9a6",
"Use the steppers any way that works.":"9a5de4b2e0d9",
"Use the steppers any way you like.":"8ce6e757f877",
"Use the steppers to build them any way you like.":"0bbabf6a9bb5",
"Use the table of tens to get close.":"687d74a52d1f",
"Use the table.":"6a63ac13c391",
"Use the thousands too.":"28d3817414c7",
"Volume counts the cubes: one layer times how many layers.":"7ddafe5eb14a",
"Vowels side by side can make one sound.":"8c33c87dda08",
"Want to learn this with me?":"86fca3a3050f",
"Warm up with some skip counting.":"3cfd87f0e0f3",
"Warm up.":"0de64bdbb6fd",
"Warm-up first, then we build the new idea.":"9361f987d946",
"Watch each trade.":"d086b063b563",
"Watch for anything left over.":"a70e41f9dff7",
"Watch the blocks above and the gaps below.":"94588c6cc566",
"Watch the cat.":"c9e4a3e036aa",
"Watch the hour change.":"06373d457f7f",
"Watch the long hand.":"c13cfadd1a71",
"Watch the minus signs.":"e1a212faab21",
"Watch the tens.":"ddf615b8451c",
"Watch the word flash.":"4d5fd27c024e",
"Watch what it does to each in number.":"c2477cf4c359",
"Watch, then trace it with your finger.":"8a2dfaae1663",
"We add these.":"0366cb9d6a9b",
"We are packing for a pond trip.":"57a231331745",
"We can name shapes by how they look.":"cb12be79580e",
"We clapped once for each part.":"195255daf8aa",
"We did it!":"4c4279f72ce9",
"We know sight words by how they look.":"5d765393cf27",
"We know what comes next.":"1197d1198a84",
"We round to the nearer hundred.":"edd9e2114659",
"We say both sounds in a blend.":"ec2b3ee2e9db",
"We take away on the chart.":"99852f276690",
"We took a ten. Now the tens have one less.":"163a4e09cb2f",
"We will work through it.":"1d1fecb628e0",
"What comes after it?":"4aab706cda01",
"What comes after this?":"bf2536294c77",
"What comes next?":"0d4762c6ae7b",
"What do they do?":"0d64cf00882c",
"What does it make?":"a707cd828fc5",
"What does it round to?":"ff7b08407bd8",
"What does the story ask for?":"cf89bdedbf01",
"What fraction does this bar show?":"7f8daf42045b",
"What fraction is marked here?":"92c719dbd9aa",
"What fraction is shaded?":"04d6b32d8edd",
"What fraction is that?":"214d778d1fc3",
"What fraction shows sky?":"ee20055caf1a",
"What goes in each?":"ae02a353e401",
"What is each digit worth?":"3e43a5d1d6d6",
"What is its area?":"5eb675194b2a",
"What is its opposite?":"3451d8121d06",
"What is left?":"f46ac92ea295",
"What is the answer?":"8faffff7ea72",
"What is the product?":"91973fa1c8fb",
"What minute is it?":"1e53ed249380",
"What part is that?":"b13e95510a17",
"What time is it?":"63e4c15c4bd9",
"Wheee!":"703c885a8ef7",
"When a place runs out break one from the next place.":"ad531d13b3b3",
"When a place runs out, break one from the next place.":"9a45a408fb56",
"When the ones make ten or more, carry a ten.":"73c2aa0abd56",
"When the ones make ten we carry a ten.":"4dab889a3027",
"When those match, the line is at the mean.":"3de4b9871b66",
"Which bar shows more shaded part?":"d7bb0c16cd4a",
"Which basket has more balls?":"81309e6d47e2",
"Which bowl has more apples?":"27504b269e5a",
"Which box has more cars?":"f7cad697c1e7",
"Which comes next?":"fef67454ebaf",
"Which digit changes?":"1f2c13a1239c",
"Which fraction is greater than the other?":"c681567e0714",
"Which fraction is greater?":"516782f0d50e",
"Which is bigger for the desert path?":"09c0c4054866",
"Which is bigger in the sand castle plan?":"be9892d30a6d",
"Which letter goes in the box?":"4a636da00ad7",
"Which letter is missing?":"a852bc6c1a29",
"Which one does not belong?":"e27939bb4443",
"Which one is a different color?":"e05275ff0236",
"Which one is different?":"8402f44bf63c",
"Which one makes sense, with the right end mark?":"58073de3d606",
"Which one means the same?":"9636bf6ced72",
"Which one sounds right?":"9dad5b2e3e84",
"Which one?":"afc98a6934c7",
"Which picture rhymes?":"bcd0dfc0baa6",
"Which plate has more cookies?":"90c28225a099",
"Which pond has more ducks?":"2104a9837927",
"Which shadow matches the shape?":"b940875cd7ec",
"Which sound is first?":"c986c56bbc35",
"Which sound is last?":"0e4b94d4e223",
"Which sounds right?":"461891e1158e",
"Which step has the slip?":"1091b416c938",
"Which step is wrong?":"461bb28a6f93",
"Which step is wrong? Tap it.":"183ccd346c79",
"Which takes more room?":"fea12836a36e",
"Which way is the unit going?":"b23df30cc7ed",
"Which way is written right?":"b30893888134",
"Which word is it?":"33551d647c00",
"Which word is right?":"c0823c618d5e",
"Which word is this?":"c904ba5834c5",
"Which word matches it?":"b6f0ebe15672",
"Which word matches the picture?":"c6332b3eb65b",
"Which word matches?":"c3e89b6274e3",
"Which word means the same?":"10985459fcef",
"Who is it about?":"c7fc96dc799c",
"With same size parts, just divide the tops.":"922a4772bf8b",
"Words have parts.":"91b7e31b16ab",
"Words start with a sound.":"af61cd895a94",
"Words that end in x, s, sh or ch add e s.":"f97f569aa4d7",
"Words that rhyme sound the same at the end.":"78f8ff5270e7",
"Work from the ones and trade when needed.":"11027db12b16",
"Work from the ones.":"811de7d0b5c7",
"Work it out for me.":"40f93c017954",
"Work out the minute.":"fca2e77eba66",
"Work out the order.":"205c987fe3eb",
"Work the parts first, then the wholes.":"48d7691cb17d",
"Work them out in your head.":"a75a3c6167bf",
"Work them out.":"1c53abfa526b",
"Work these out.":"398a66f7028d",
"Work this one out.":"710d617fa474",
"Working it out.":"77cc51592f4c",
"Write a letter for each one.":"45437d8228b6",
"Write both.":"847ea425e87d",
"Write it in columns.":"085a0ae64635",
"Write it with a times sign.":"bb90a5b3ee4f",
"Write it with symbols only.":"91102a475b18",
"Write the division for this array.":"4169098e881b",
"Write the ones.":"5dc63209965f",
"Write the same fraction in symbols only.":"742ceea1f903",
"Write this fraction as a decimal.":"91f47d3c1b47",
"Yep, that one was right.":"a0616b813b27",
"Yes, I got it right!":"f6a760a8fb1e",
"You already knew it!":"da4b1d09e9b2",
"You caught my mistake!":"1a91631c50d5",
"You earned game time!":"71561c2eceac",
"You fixed it!":"40de3ffed792",
"You fixed it.":"c074a4146936",
"You got it.":"41635032ea8f",
"You know its name!":"e0051a0dc192",
"You know this!":"9d313a02d334",
"You know this! Show me!":"3a72d16721c7",
"You know what to do.":"d86e91cc56dd",
"You learned it!":"3ceb38958101",
"You might know this already.":"638904d69d28",
"You pay a dollar.":"b3f941b61716",
"You shaded the same amount.":"d009a00693c8",
"You sorted them well.":"3d349a848a94",
"You still know this one.":"cb84639e60a1",
"You're my best friend!":"6c9336952b8c",
"Your call.":"c353407d5858",
"Your notebook fills up as we learn.":"daf8343acfae",
"Your notes go here as we work.":"c1de79b45a82",
"Your turn to show me!":"8f6b69ffa5ae",
"Your turn!":"3b0fd4519e3f",
"Yum yum!":"e5199266125f"}};

var TEACH12_VER='v202'; // last line: the whole file ran (checked by dataReady() before the app starts)
