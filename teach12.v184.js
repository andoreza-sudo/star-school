/* Star School teach12 v184. BUILT by tools/build.py from 52e-words.js, 52f-bench.js, 52g-drafted.js: never edit by hand.
   index.html v184 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v184.js. */
/* ---------- TEACH-2b: the words of the drafted lessons the owner has reviewed (part teach12) ----------
   BUILT by tools/build.py from docs/drafts/<stop>.md ("status: reviewed ...") for the scripts that name them (lsDraft, 52g-drafted.js):
   never edit by hand. A draft that is not reviewed is never here, so its lesson is not live. */
const LSW = {
  "add2": {"idea":"Make a ten first, or use a double.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill this frame with both colours. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Make a ten first, or use a double."],"together":["Build it on the frame. Fill the top ten first.","Look at the frame. How many in all?","Now just the numbers. Make a ten in your head."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon bridge needs boards. Add them up!"]},"reasons":{"off1":["I was one off. Count each one once."],"given":["I said a number I could see. Count them all."]},"home":"Ask {name}: \"What is 9 plus 6? How did you make a ten?\""},
  "add3": {"idea":"Make a ten to add bigger facts.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill this double frame. Use both colours. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Make a ten to add bigger facts."],"together":["Put in {a}, then {b} more. Fill a ten first.","Look at the frame. How many in all?","Add {a} and {b}. Make a ten in your head."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The reef shop counts shells. How many in all?"]},"reasons":{"off1":["I was one off. Count each one once."],"op":["I took away. This one adds!"]},"home":"Ask {name}: \"What is 8 plus 7? Can you make a ten first?\""},
  "add5": {"idea":"Look for a ten, then add the last number.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill the double frame. Use both colours. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Look for a ten, then add the last number."],"together":["Put in {a}, then {b}, then {k}.","Look at the frame. How many in all?","Add {a}, {b} and {k}. Look for a ten."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The clock tower needs bells. How many in all?"]},"reasons":{"given":["I left a number out. Add them all!"],"off1":["I was one off. Count each one once."]},"home":"Ask {name}: \"What is 4 and 6 and 3?\""},
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
  "miss2": {"idea":"Count on from one part to the whole.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Fill this frame with both colours. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Count on from one part to the whole."],"together":["There are {a}. Put in more to make {t}.","Count the empty boxes up to {t}.","Count on from {a} to {t}."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon path needs stones. How many more?"]},"reasons":{"op":["I added both numbers. We need the missing part."],"given":["I said a number I could see. Count on to find it."]},"home":"Ask {name}: \"I have 9 grapes. How many more make 15?\""},
  "mult1": {"idea":"Equal groups have the same number in each group.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Make any equal groups you like."],"name":["You made {a} groups of {b}.","{a} groups of {b} is {sum} in all.","Equal groups have the same number in each group."],"together":["Let's make {a} groups of {b} stars.","Skip count by {b}s. How many in all?","Add {b} again and again."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station packs supplies in equal groups. How many?"]},"reasons":{"given":["I said a number I could see. Count every dot!"],"off1":["I was one off. Skip count each group."]},"home":"Ask {name}: \"How many toys in 3 groups of 4?\""},
  "mult2": {"idea":"Skip count equal groups to find how many.","beats":{"remember":["Do you remember skip counting? Count by {k}s."],"explore":["Make any equal groups you like with the dots."],"name":["You made {a} groups of {b}.","{a} groups of {b} is {sum} in all.","Skip count equal groups to find how many."],"together":["Let's make {a} groups of {b}.","Skip count by {b}s. How many in all?","Times means groups of. Skip count by {b}s."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The space station stacks power cells in equal groups."]},"reasons":{"given":["I said a number I could see. Count every dot!"],"off1":["I was one off. Skip count each group."]},"home":"Ask {name}: \"Show 4 groups of 3 fingers. How many fingers?\""},
  "pv2": {"idea":"Each digit's place tells what it is worth.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Make any number you like with the blocks."],"name":["You made {n}.","It has {top} hundreds, {tens} tens and {ones} ones.","Each digit's place tells what it is worth."],"together":["Make {n} with blocks. Flats, rods, then cubes.","Count the flats, the rods, then the cubes.","Look at {n}. Find the place of the digit."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The ship's map has numbers. What is each digit worth?"]},"reasons":{"given":["I said the digit. Its place makes it worth more!"],"swap":["I swapped the tens and the ones. Look again."]},"home":"Ask {name}: \"What is the 5 worth in 352?\""},
  "pv3": {"idea":"A number is its hundreds plus its tens plus its ones.","beats":{"remember":["Do you remember this? Rods are tens, cubes are ones."],"explore":["Use the blocks. Make any number you like."],"name":["You made {n}.","It has {top} hundreds, {tens} tens and {ones} ones.","A number is its hundreds plus its tens plus its ones."],"together":["Build {n} from its parts with blocks.","Count the flats, the rods, then the cubes.","Put the parts together into one number."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The map shows the treasure in parts. Put them together!"]},"reasons":{"given":["I only said one part. Add all the parts!"],"swap":["I swapped the tens and the ones. Look again."]},"home":"Ask {name}: \"What is 200 plus 40 plus 3?\""},
  "sub2": {"idea":"Take away to ten first, then the rest.","beats":{"remember":["Do you remember this? Let's make ten."],"explore":["Use both colours on the double frame. Any way you like!"],"name":["You made {a} and {b}.","{a} and {b} make {sum}.","Take away {b} and {a} are left."],"together":["Start with {a}. Take away {b}.","Look at the frame. How many are left?","{a} take away {b}. Go back to ten first."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The canyon shop sells candy. How many are left?"]},"reasons":{"op":["I added. We are taking away!"],"off1":["I was one off. Count what is left again."]},"home":"Ask {name}: \"We had 12 candies and ate 5. How many are left?\""},
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
const LS_BRIEF_FACT = `Explore: a double ten frame (two rows of ten). The child puts in counters in two colours, any way (no slots in the task).
Name it: the frame they made; lines on it (slots {a} {b} {sum}: {a} of one colour and {b} of the other make {sum}) and the idea.
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
  D.exp = () => ({q: lsFrame2(D.sk, D.lv, 20, 'both', {pk: false, sl: {}, html: lsCap('Use both colours!'), say: 'Put in some blue and some orange.'}), nudge: 'Use both colours.',
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
      const hint = {k: 'text', s: `${x} ${u == 10 ? 'tens' : 'hundreds'} and ${y} more ${u == 10 ? 'tens' : 'hundreds'}.`};
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
    const n = lsRi(r, 102, 989), [h, te, o] = lsDigits(n, 3), sl = {n, a: h * 100, b: te * 10};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.base10(n)}<div>${h} hundreds, ${te} tens and ${o} ones.</div></div>`, w: 'Flats are hundreds, rods are tens, cubes are ones.'};
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
react: v => { const s = Array.isArray(v) ? v : mmGreedy(T, +v), x = K2MM.coins.val({m: {types: T}}, s); return {ctx: {value: x, n: mmSum(s)}, lines: [`Your coins make ${x} cents.`]}; }});
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
  react: v => { const [a, b] = Array.isArray(v) ? v : /×/.test(v) ? String(v).split('×').map(Number) : [2, 3]; return {ctx: {a, b, sum: a * b}, lines: [`${a} ${arr ? 'rows' : 'groups'} of ${b} make ${a * b}.`]}; }});
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

var TEACH12_VER='v184'; // last line: the whole file ran (checked by dataReady() before the app starts)
