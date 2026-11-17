# Batch 2 read-through: grade 1 and 2 math lessons

30 lessons, in map order. Each is what the child hears:
the six beats, the pet's reasons when it is caught, and tonight's question for you.

The app fills in each {slot} from the problem on screen, so numbers are always right.
The app also says each problem itself, after the Together and Show lines.

To change a word: edit the JSON in that lesson's file in docs/drafts/.
When you are happy, say so, or run:

`node tools/author.js --approve all --by <your name>`

(or name the lessons instead of all). Approved lessons go live at the next build.

## 1. +9 & Doubles (add2)

```text
Idea: Make a ten first, or use a double.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill this frame with both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Make a ten first, or use a double.
Together:
  - Build it on the frame. Fill the top ten first.
  - Look at the frame. How many in all?
  - Now just the numbers. Make a ten in your head.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon bridge needs boards. Add them up!
Reasons the pet gives when it is caught:
  off1: I was one off. Count each one once.
  given: I said a number I could see. Count them all.
Tonight's question: Ask {name}: "What is 9 plus 6? How did you make a ten?"
About 3.3 minutes.
```

## 2. Tens & Hundreds (big1)

```text
Idea: A hundred is ten tens.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Make any number you like with the blocks.
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - A hundred is ten tens.
Together:
  - Add {a} and {b}. Count the rods or the flats.
  - Look at the blocks. Count by tens, or by hundreds.
  - Think in tens or hundreds, just like ones.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon trail needs steps. Add them up!
Reasons the pet gives when it is caught:
  ten: I counted the tens like ones. A rod is ten!
  given: I said a number I could see. Add them both.
Tonight's question: Ask {name}: "How many tens make one hundred?"
About 3.3 minutes.
```

## 3. Count by 2s & 5s (cnt2)

```text
Idea: Skip count to find how many.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make equal groups any way you like.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum}.
  - Skip count to find how many.
Together:
  - Help me make {a} groups of {b}.
  - Skip count the groups. How many in all?
  - Keep skip counting by {b}s.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The candy shop packs bags. Skip count them!
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each group.
Tonight's question: Ask {name}: "Count your fingers by fives. How many on two hands?"
About 3.2 minutes.
```

## 4. Missing to 18 (miss2)

```text
Idea: Count on from one part to the whole.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill this frame with both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Count on from one part to the whole.
Together:
  - There are {a}. Put in more to make {t}.
  - Count the empty boxes up to {t}.
  - Count on from {a} to {t}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon path needs stones. How many more?
Reasons the pet gives when it is caught:
  op: I added both numbers. We need the missing part.
  given: I said a number I could see. Count on to find it.
Tonight's question: Ask {name}: "I have 9 grapes. How many more make 15?"
About 3.3 minutes.
```

## 5. Take Away to 18 (sub2)

```text
Idea: Take away to ten first, then the rest.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Use both colours on the double frame. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Take away {b} and {a} are left.
Together:
  - Start with {a}. Take away {b}.
  - Look at the frame. How many are left?
  - {a} take away {b}. Go back to ten first.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon shop sells candy. How many are left?
Reasons the pet gives when it is caught:
  op: I added. We are taking away!
  off1: I was one off. Count what is left again.
Tonight's question: Ask {name}: "We had 12 candies and ate 5. How many are left?"
About 3.3 minutes.
```

## 6. Add Three (add5)

```text
Idea: Look for a ten, then add the last number.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill the double frame. Use both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Look for a ten, then add the last number.
Together:
  - Put in {a}, then {b}, then {k}.
  - Look at the frame. How many in all?
  - Add {a}, {b} and {k}. Look for a ten.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The clock tower needs bells. How many in all?
Reasons the pet gives when it is caught:
  given: I left a number out. Add them all!
  off1: I was one off. Count each one once.
Tonight's question: Ask {name}: "What is 4 and 6 and 3?"
About 3.3 minutes.
```

## 7. Mental Math (add6)

```text
Idea: Ten more or ten less changes the tens digit.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in a rod, or take one away. Any way you like!
Name it:
  - You had {a}. Now you have {sum}.
  - Ten more or ten less changes the tens digit.
Together:
  - Start with {a}. Change it by {b}.
  - Look at the blocks. Which digit changes?
  - Do it in your head. Watch the tens.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The clock tower needs flags. Work them out in your head.
Reasons the pet gives when it is caught:
  ten: I counted the rod as one. A rod is ten!
  op: I did the wrong one. Look at the sign.
Tonight's question: Ask {name}: "What is 45 plus 10? And 45 minus 10?"
About 3.3 minutes.
```

## 8. All the Facts (add3)

```text
Idea: Make a ten to add bigger facts.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill this double frame. Use both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Make a ten to add bigger facts.
Together:
  - Put in {a}, then {b} more. Fill a ten first.
  - Look at the frame. How many in all?
  - Add {a} and {b}. Make a ten in your head.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef shop counts shells. How many in all?
Reasons the pet gives when it is caught:
  off1: I was one off. Count each one once.
  op: I took away. This one adds!
Tonight's question: Ask {name}: "What is 8 plus 7? Can you make a ten first?"
About 3.3 minutes.
```

## 9. O'Clock (time1)

```text
Idea: The short hand shows the hour.

Remember:
  - Do you remember counting on?
Explore:
  - Move the hands. Make any time you like.
Name it:
  - Look at your clock.
  - You set {time}.
  - The short hand shows the hour.
Together:
  - Set the clock to {time}. Short hand first.
  - Look at the short hand. What time is it?
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The boat needs a time to leave. Set the clock!
  - The fish need a time to eat. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The short hand shows the hour.
Tonight's question: Ask {name}: "Can you show me 5 o'clock on our clock?"
About 3.3 minutes.
```

## 10. 2-Digit Adding (big2)

```text
Idea: Add the ones, then add the tens.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in blocks for {a} and {b}. Any way you like!
Name it:
  - You put in {tens} tens and {ones} ones.
  - Together they make {sum}.
  - Add the ones, then add the tens.
Together:
  - Let's add {a} and {b} with blocks.
  - Count the ones, then the tens.
  - Add the ones column, then the tens column.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef needs shells and rocks. Add them up!
Reasons the pet gives when it is caught:
  op: I took away. Look at the sign: we add!
  swap: I swapped the tens and the ones. Tens go first.
Tonight's question: Ask {name}: "What is 23 plus 14?"
About 3.3 minutes.
```

## 11. Pennies & Nickels (coins1)

```text
Idea: Add what each coin is worth, not how many coins.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill your coin purse. Use any coins you like!
Name it:
  - You chose {n} coins.
  - They are worth {value} cents.
  - Add what each coin is worth, not how many coins.
Together:
  - Put {value} cents in the purse. Biggest coins first.
  - Look at the {n} coins. Count by what each is worth.
  - Add what each of the {n} coins is worth.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The reef shop needs coins. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How many cents are three nickels and two pennies?"
About 3.3 minutes.
```

## 12. Compare to 100 (cmp2)

```text
Idea: Look at the tens first to see which is bigger.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Use any blocks you like to make a number.
Name it:
  - You made {n}.
  - It has {tens} tens and {ones} ones.
  - Look at the tens first to see which is bigger.
Together:
  - Make a number bigger than this one.
  - Look at the blocks for {a} and {b}.
  - Compare {a} and {b}. Tens first.
Check me:
  - My turn. Check me!
  - I think {ans}. Am I right?
Show:
  - The reef gate opens for the bigger number.
Reasons the pet gives when it is caught:
  small: I picked the smaller one. Look at the tens!
Tonight's question: Ask {name}: "Which is bigger, 67 or 76?"
About 3.3 minutes.
```

## 13. Half Past (time2)

```text
Idea: Half past: the long hand points straight down.

Remember:
  - Do you remember this? Set an o'clock time.
Explore:
  - Move the hands to show any time you like.
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - Half past: the long hand points straight down.
Together:
  - Set the clock to {time}. Watch the long hand.
  - Look at the long hand. Is it up or down?
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The crab wakes up soon. Set the clock!
  - The fish eat soon. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The long hand shows the minutes.
Tonight's question: Ask {name}: "Where does the long hand point at half past 4?"
About 3.3 minutes.
```

## 14. 2-Digit Take Away (sub3)

```text
Idea: Take away the ones, then take away the tens.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Here are {a}. Take some away. Any way you like!
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - Take away the ones, then take away the tens.
Together:
  - Take {b} away from {a}. Ones first.
  - Look at the blocks for {a}. What is left?
  - Take away in columns: ones, then tens.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Shells float away from the reef. How many are left?
Reasons the pet gives when it is caught:
  op: I added. We are taking away!
  given: I said a number I could see. Find what is left.
Tonight's question: Ask {name}: "What is 45 take away 20?"
About 3.3 minutes.
```

## 15. Equal Groups (mult1)

```text
Idea: Equal groups have the same number in each group.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make any equal groups you like.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum} in all.
  - Equal groups have the same number in each group.
Together:
  - Let's make {a} groups of {b} stars.
  - Skip count by {b}s. How many in all?
  - Add {b} again and again.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station packs supplies in equal groups. How many?
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each group.
Tonight's question: Ask {name}: "How many toys in 3 groups of 4?"
About 3.3 minutes.
```

## 16. Dimes Too (coins2)

```text
Idea: Add what each coin is worth, not how many coins.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Put any coins you like in the purse. Any way is fine!
Name it:
  - You chose {n} coins.
  - They are worth {value} cents.
  - Add what each coin is worth, not how many coins.
Together:
  - Put {value} cents in the purse. Biggest coins first.
  - Look at the {n} coins. Count by what each is worth.
  - Add what each of the {n} coins is worth.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station shop needs coins. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How much are a dime and two nickels?"
About 3.4 minutes.
```

## 17. Borrowing (sub4)

```text
Idea: Break a ten when there are not enough ones.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Here are {a}. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - No more ones? Break a ten into ten ones.
Together:
  - Take {b} from {a}. Break a ten if you need to.
  - Look at {a}. Are there enough ones?
  - Write it in columns. Ones first.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power. Take these away.
  - One more job for the station. Take these away.
Reasons the pet gives when it is caught:
  col: I took the small from the big. Top take away bottom!
  keep: I broke a ten, but kept the tens the same.
Tonight's question: Ask {name}: "What is 52 take away 37?"
About 3.4 minutes.
```

## 18. Quarter Hours (time3)

```text
Idea: The long hand shows the minutes past the hour.

Remember:
  - Do you remember this? Set an o'clock time.
Explore:
  - Move the hands on this clock. Set any time you like!
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - The long hand shows the minutes past the hour.
Together:
  - Set the clock to {time}. Long hand for minutes.
  - Look at the long hand. Count the minutes.
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship leaves soon. Set the clock!
  - The space walk starts soon. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The long hand shows the minutes.
Tonight's question: Ask {name}: "What time does our clock show right now?"
About 3.3 minutes.
```

## 19. 3-Digit Adding (big4)

```text
Idea: Add the ones, then the tens, then the hundreds.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in blocks for {a} and {b}. Any way you like!
Name it:
  - You put in {tens} tens and {ones} ones.
  - Together they make {sum}.
  - Add the ones, then the tens, then the hundreds.
Together:
  - Add {a} and {b} with the blocks.
  - Look at the blocks. Add each place.
  - Add in columns: ones, tens, then hundreds.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power cells. Add them up!
Reasons the pet gives when it is caught:
  op: I took away. Look at the sign: we add!
  given: I said a number I could see. Add them both.
Tonight's question: Ask {name}: "What is 124 plus 135?"
About 3.3 minutes.
```

## 20. Groups to 5×5 (mult2)

```text
Idea: Skip count equal groups to find how many.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make any equal groups you like with the dots.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum} in all.
  - Skip count equal groups to find how many.
Together:
  - Let's make {a} groups of {b}.
  - Skip count by {b}s. How many in all?
  - Times means groups of. Skip count by {b}s.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station stacks power cells in equal groups.
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each group.
Tonight's question: Ask {name}: "Show 4 groups of 3 fingers. How many fingers?"
About 3.3 minutes.
```

## 21. Compare to 999 (cmp3)

```text
Idea: Look at the hundreds first to see which is bigger.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Use the flats, rods and cubes. Make any number you like!
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - Look at the hundreds first to see which is bigger.
Together:
  - Make a number bigger than this one.
  - Look at the blocks for {a} and {b}.
  - Compare {a} and {b}. Hundreds first.
Check me:
  - My turn. Check me!
  - I think {ans}. Am I right?
Show:
  - The space station door opens for the bigger number.
Reasons the pet gives when it is caught:
  small: I picked the smaller one. Look at the hundreds!
Tonight's question: Ask {name}: "Which is bigger, 458 or 485?"
About 3.3 minutes.
```

## 22. Quarters (coins3)

```text
Idea: Add what each coin is worth, not how many coins.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill the purse with any coins you like from the tray.
Name it:
  - You chose {n} coins.
  - They are worth {value} cents.
  - Add what each coin is worth, not how many coins.
Together:
  - Put {value} cents in the purse. Quarters first.
  - Look at the {n} coins. Count by what each is worth.
  - Add what each of the {n} coins is worth.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space shop takes quarters too. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How much are three quarters worth?"
About 3.3 minutes.
```

## 23. Place Value to 999 (pv2)

```text
Idea: Each digit's place tells what it is worth.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Make any number you like with the blocks.
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - Each digit's place tells what it is worth.
Together:
  - Make {n} with blocks. Flats, rods, then cubes.
  - Count the flats, the rods, then the cubes.
  - Look at {n}. Find the place of the digit.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship's map has numbers. What is each digit worth?
Reasons the pet gives when it is caught:
  given: I said the digit. Its place makes it worth more!
  swap: I swapped the tens and the ones. Look again.
Tonight's question: Ask {name}: "What is the 5 worth in 352?"
About 3.3 minutes.
```

## 24. Add 3-Digit Numbers (big5)

```text
Idea: When the ones make ten or more, carry a ten.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Put in blocks for {a} and {b}. Any way you like!
Name it:
  - You put in {tens} tens and {ones} ones.
  - Together they make {sum}.
  - When the ones make ten or more, carry a ten.
Together:
  - Trade ten ones for a ten. Then check.
  - Look at the ones. More than {n}? Carry!
  - Add in columns. Carry the ten.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs supplies. Add these loads.
  - One more load for the ship. Add it up!
Reasons the pet gives when it is caught:
  nocarry: I forgot to carry the ten from the ones.
  cat: Oops. I wrote both column totals side by side.
Tonight's question: Ask {name}: "What is 245 plus 317?"
About 3.4 minutes.
```

## 25. Expanded Form (pv3)

```text
Idea: A number is its hundreds plus its tens plus its ones.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Use the blocks. Make any number you like.
Name it:
  - You made {n}.
  - It has {top} hundreds, {tens} tens and {ones} ones.
  - A number is its hundreds plus its tens plus its ones.
Together:
  - Build {n} from its parts with blocks.
  - Count the flats, the rods, then the cubes.
  - Put the parts together into one number.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The map shows the treasure in parts. Put them together!
Reasons the pet gives when it is caught:
  given: I only said one part. Add all the parts!
  swap: I swapped the tens and the ones. Look again.
Tonight's question: Ask {name}: "What is 200 plus 40 plus 3?"
About 3.3 minutes.
```

## 26. Take Away 3-Digit (sub5)

```text
Idea: Break a ten when there are not enough ones.

Remember:
  - Do you remember this? Rods are tens, cubes are ones.
Explore:
  - Here are {a}. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - No more ones? Break a ten into ten ones.
Together:
  - Take {b} from {a}. Break a ten if you need.
  - Look at {a}. Are there enough ones?
  - Take away in columns: ones, tens, then hundreds.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship unloads supplies. How many are left?
  - One more load comes off. How many are left?
Reasons the pet gives when it is caught:
  col: I took the small from the big. Top take away bottom!
  keep: I broke a ten, but kept the tens the same.
Tonight's question: Ask {name}: "What is 243 take away 158?"
About 3.4 minutes.
```

## 27. Clocks to 5 Minutes (time4)

```text
Idea: The long hand shows the minutes past the hour.

Remember:
  - Do you remember this? Set an o'clock time.
Explore:
  - Move the hands. Set any time you like.
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - The long hand shows the minutes past the hour.
Together:
  - Set the clock to {time}. Long hand for minutes.
  - Look at the long hand. Count the minutes.
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship sails soon. Set the clock!
  - Another ship sails soon. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The long hand shows the minutes.
Tonight's question: Ask {name}: "Can you show me 4:25 on our clock?"
About 3.3 minutes.
```

## 28. Dollars & Coins (coins4)

```text
Idea: A dollar is worth a hundred cents.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill your purse with any coins you like.
Name it:
  - You chose {n} coins.
  - They are worth {value} cents.
  - A dollar is worth a hundred cents.
Together:
  - Put {value} cents in the purse. Biggest coins first.
  - Look at the money. Count the dollar first.
  - Add what each one is worth.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship needs money for the trip. How many cents?
Reasons the pet gives when it is caught:
  count: I counted the coins. Add what each one is worth!
Tonight's question: Ask {name}: "How much is a quarter, a dime and a nickel?"
About 3.3 minutes.
```

## 29. Rows & Columns (arr1)

```text
Idea: Rows of the same size make an array.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make any rows of dots you like.
Name it:
  - You made {a} rows of {b}.
  - {a} rows of {b} is {sum} in all.
  - Rows of the same size make an array.
Together:
  - Make {a} rows of {b}. Rows go across.
  - Skip count the rows. How many in all?
  - Times means rows of. Skip count the rows.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The boat needs flags in rows. How many flags?
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each row.
Tonight's question: Ask {name}: "How many shells in 4 rows of 5?"
About 3.3 minutes.
```

## 30. Making Change (coins5)

```text
Idea: Change is what is left of a dollar after the price.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Fill your purse with any coins you like.
Name it:
  - You chose coins worth {value} cents.
  - You used {n} coins.
  - Change is what is left of a dollar after the price.
Together:
  - It costs {a} cents. Count up to a dollar.
  - It costs {a} cents. You pay a dollar.
  - A dollar is a hundred cents. Take away the price.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The shell shop gives change. How much?
  - The boat shop gives change too. How much?
Reasons the pet gives when it is caught:
  col: I took the small from the big. Top take away bottom!
  keep: I borrowed a ten but did not take it away.
Tonight's question: Ask {name}: "If a toy costs 65 cents, how much change from a dollar?"
About 3.4 minutes.
```
