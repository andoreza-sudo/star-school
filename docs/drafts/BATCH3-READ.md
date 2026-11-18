# Batch 3 read-through: grade 3 to 5 math lessons

55 lessons, in map order. Each is what the child hears:
the six beats, the pet's reasons when it is caught, and tonight's question for you.

Grades 3 and 4 hear the older kid pet; grade 5 hears the teen-like partner.

The app fills in each {slot} from the problem on screen, so numbers are always right.
The app also says each problem itself, after the Together and Show lines.

Until you approve a lesson, it runs on short hand-written lines
(its idea, a Name it line, the pet's reasons), so it works now.

In Check me the pet shows its own working (or works out a problem the child sets),
and the child finds the slip and builds the reason from word tiles.

To change a word: edit the JSON in that lesson's file in docs/drafts/.
When you are happy, say so, or run:

`node tools/author.js --approve <stop ...> --by <your name>`

(or all, which also approves any batch 2 lesson still waiting).
Approved lessons use their words at the next build.

## 1. Arrays (arr2)

```text
Idea: Rows times how many in each row.

Remember:
  - Remember this one? Count by {k}.
Explore:
  - Make any array you like with the steppers.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - It makes {sum} in all.
  - Rows times how many in each row.
Together:
  - Build {a} rows of {b} in the array.
  - How many in all in this picture?
  - What does {a} times {b} equal?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs groups of rocks. How many for {a} groups of {b}?
  - The tower needs layers of blocks. How many for {a} layers of {b}?
Reasons the pet gives when it is caught:
  skip: One group too many. Count the rows again. | One group too few. Check the rows.
  mulAdd: That adds the numbers. Multiply them instead.
Tonight's question: Ask {name}: "We plant 4 rows with 6 in each. How many in all?"
About 3.4 minutes.
```

## 2. Easy Times Facts (mfact1)

```text
Idea: Rows times how many in each row.

Remember:
  - Remember this one? Count by {k}.
Explore:
  - Make any array you like with the steppers.
Name it:
  - You made {a} rows of {b}.
  - That makes {sum} in all.
  - Rows times how many in each row.
Together:
  - Build {a} rows of {b} on the array.
  - How many in all in this picture?
  - Now the fact in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs groups of rocks. How many in all?
  - The tower needs layers of blocks. How many in all?
Reasons the pet gives when it is caught:
  skip: One group too many. Count the rows again. | One group too few. Check the rows.
  mulAdd: That adds the numbers. We multiply them.
Tonight's question: Ask {name}: How many are in four rows of five?
About 3.3 minutes.
```

## 3. Times 3 & 4 (mfact2)

```text
Idea: Rows times how many in each row.

Remember:
  - Remember this one? Count by {k}.
Explore:
  - Make any array you like with the steppers.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - It makes {sum} in all.
Together:
  - Build {a} rows of {b} here.
  - How many in all on this picture?
  - What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs blocks. {a} groups of {b}. How many?
  - The cave has {a} rows of {b} rocks. How many rocks?
Reasons the pet gives when it is caught:
  skip: One group too few. Count the groups again. | One group too many. Look closer at the rows.
  mulAdd: We multiply not add. Try again with the picture.
Tonight's question: Ask {name}: "What is four times six?"
About 3.3 minutes.
```

## 4. Easy Dividing (dfact1)

```text
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Make an array with all the dots. Any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - Build rows of {b} with all {n} dots.
  - How many rows from {n} dots in rows of {b}?
  - Write the division for {n} dots in rows of {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - Share {n} leaves into bags of {b}. How many bags?
Reasons the pet gives when it is caught:
  fact: Look closer. That is a neighbor fact. | Try again. One group too many or too few.
  given: That number is already there. Use the dots to find a new one.
Tonight's question: Ask {name}: How many bags from 20 apples if each holds 5?
About 3.5 minutes.
```

## 5. Times 6 to 9 (mfact3)

```text
Idea: Rows times how many in each row.

Remember:
  - Do you remember this? Count by {k}.
Explore:
  - Make any rows of dots. Use the steppers any way you like.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - {sum} in all.
Together:
  - Build {a} rows of {b} here.
  - How many in all?
  - What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs groups of rocks. How many in all?
  - The tower needs layers of blocks. How many in all?
Reasons the pet gives when it is caught:
  skip: One group too few. Count every row. | One group too many. Count every row.
  mulAdd: We multiply not add. Rows times in each row.
Tonight's question: Ask {name}: "What is six times eight?"
About 3.3 minutes.
```

## 6. Divide by 3 & 4 (dfact2)

```text
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array of {n} dots any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - Put {n} dots in rows of {b}.
  - How many rows of {b} fit in {n}?
  - Now write the division for {n} divided by {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - The cave has {n} gems to share in bags of {b}. How many bags?
Reasons the pet gives when it is caught:
  fact: Look closer. I slipped. | That is a close fact but not the right one.
  given: I said the number I could see. Look at the full set.
Tonight's question: Ask {name}: How many groups of four do you see around the house?
About 3.4 minutes.
```

## 7. All Times Facts (mfact4)

```text
Idea: Rows times how many in each row tells how many in all.

Remember:
  - Do you remember this? Count on by {k}.
Explore:
  - Make any array you like. Use the steppers any way that works.
Name it:
  - You made {a} rows of {b}.
  - That is {a} times {b}.
  - It has {sum} in all.
Together:
  - Build {a} rows of {b} on the array.
  - How many in all in this picture?
  - What does {a} times {b} equal?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs plants. Put in {a} rows of {b}. How many plants?
Reasons the pet gives when it is caught:
  skip: One group too few. Count every row again. | One group too many. Check each row.
  mulAdd: We multiply these numbers. Try again.
Tonight's question: Ask {name}: "What is six times seven?"
About 3.3 minutes.
```

## 8. Divide by 6 to 9 (dfact3)

```text
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this fact? What is {a} times {b}?
Explore:
  - Make an array of {n} dots any way you like.
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - We have {n} dots to put in rows of {b}.
  - Look at the picture. How many rows?
  - Write the division for this array.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones in groups of {b}. How many groups?
  - The cave has {n} gems to share in piles of {b}. How many piles?
Reasons the pet gives when it is caught:
  fact: Look closer. I slipped there. | One group too many or too few.
  given: I said the number I could see. | Count all the dots to start.
Tonight's question: Ask {name}: How many in each if we share 24 flowers in 8 vases?
About 3.4 minutes.
```

## 9. All Dividing (dfact4)

```text
Idea: Dividing finds how many rows or how many in each row.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Make an array of {n} dots. Any way you like!
Name it:
  - You made {n} dots in {a} rows of {b}.
  - Dividing finds how many rows or how many in each row.
Together:
  - We have {n} dots to put in rows of {b}.
  - Look at the picture. How many rows?
  - Write the division for this array.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs {n} stones set in groups of {b}. How many groups?
  - The den has {n} nuts to share in {b} bags. How many in each bag?
Reasons the pet gives when it is caught:
  fact: Look closer. That is a near fact. Count the rows again.
  given: I said a number I could see. Count the rows instead.
Tonight's question: Ask {name}: "We have 24 flowers. How many rows of 6?"
About 3.4 minutes.
```

## 10. Times Tens & Hundreds (mbig1)

```text
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any number with the blocks. I will tell you what that many groups makes.
Name it:
  - You made {n}. Here are {b} groups. That makes {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Let's build {a} times {b}. Put in every group then trade.
  - Now look at the blocks and type what it makes.
  - Now just the symbols. What does it make?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The tower needs blocks for the top. How many for {a} times {b}?
Reasons the pet gives when it is caught:
  tens0: That works a tens part as ones. Multiply the place value.
  zeros: Count the zeros in each place. Write the right number.
Tonight's question: Ask {name}: "What is twenty times thirty?"
About 3.4 minutes.
```

## 11. Name the Fraction (frac2)

```text
Idea: The bottom number counts the equal parts. The top counts the parts we mean.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade any parts you like on the bar. Any way works.
Name it:
  - The bottom counts the equal parts. The top counts the parts we mean.
  - You shaded {top} of {bottom} parts.
Together:
  - Shade {top} of the {bottom} parts on this bar.
  - What fraction does this bar show?
  - Now write the fraction these words tell.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail needs signs at the right spots. Name each fraction you see.
Reasons the pet gives when it is caught:
  unshaded: Look closer. Those parts are not shaded. | Count only the shaded parts for the top.
  fpart: The bottom counts all the equal parts. | The top goes over all the parts in the bar.
Tonight's question: Ask {name}: "Can you find something that shows one half?"
About 3.3 minutes.
```

## 12. Round to 10 (round1)

```text
Idea: Find the nearer ten on the number line.

Remember:
  - Do you remember this one? What comes next counting by tens from {k}?
Explore:
  - Put the pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - Halfway goes up.
Together:
  - First find the tens it sits between.
  - Now slide the pin to the nearer ten.
  - Type the nearer ten for this number.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a round number of steps. How many for this one?
Reasons the pet gives when it is caught:
  trunc: Look closer. It is past halfway so round up.
  rup: Look closer. It is not halfway yet so round down.
Tonight's question: Ask {name}: "What is thirty four rounded to the nearest ten?"
About 3.3 minutes.
```

## 13. Fractions on a Line (frac3)

```text
Idea: A fraction is a point on the line.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Mark any spot on the line. Tap the pin.
Name it:
  - Your mark shows {top} of {bottom}.
  - A fraction is a point on the line.
Together:
  - Mark {top} of {bottom} on this line.
  - What fraction is marked here?
  - Name this fraction.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail has marks on a line. Type the fraction at each mark.
Reasons the pet gives when it is caught:
  ticks: Count the jumps. Not the marks.
  flip: The top tells jumps from zero.
Tonight's question: Ask {name}: "Show me half way on a line from zero to one."
About 3.2 minutes.
```

## 14. 3-Digit Take Away (sub6)

```text
Idea: When a place runs out, break one from the next place.

Remember:
  - Do you remember this one? Make {n} with the blocks.
Explore:
  - Here are some blocks. Take away as many as you like.
Name it:
  - You had {a}. You took {b}. Now {diff} are left.
  - When a place runs out, break one from the next place.
Together:
  - Take {b} from {a}. Break a hundred or a ten if you need to.
  - Look at the picture of the blocks. Type what is left.
  - Now try it with the columns.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs clearing. Take {b} logs from the pile of {a}.
  - One more job. Take {b} from {a}.
Reasons the pet gives when it is caught:
  col: I took the smaller digit from the bigger one. Top take away bottom.
  keep: I broke a ten but did not take it from the tens.
  slip: Look closer. I slipped there.
Tonight's question: Ask {name}: "What is 430 take away 125?"
About 3.5 minutes.
```

## 15. Perimeter (geo1)

```text
Idea: Perimeter is the distance around.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any rectangle with the dots. Any way works.
Name it:
  - You made a rectangle with sides {a} and {b}.
  - The distance around is {sum}.
  - Perimeter is the distance around. Add all the sides.
Together:
  - Add all the sides to find the perimeter.
  - Opposite sides match. Add all the sides.
  - No picture this time. Add every side.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs a fence all the way around. The sides are {a} and {b}.
Reasons the pet gives when it is caught:
  area: I found the space inside. We want the distance around.
  half: I added only some of the sides. Add them all.
Tonight's question: Ask {name}: "A rug is 4 by 6. How far around is it?"
About 3.4 minutes.
```

## 16. Compare Fractions (frac4)

```text
Idea: Compare how much of the same whole is shaded. More parts means smaller pieces.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any parts on each bar. Any way you like!
Name it:
  - You shaded {a} of {x} on top and {b} of {y} below.
  - Compare how much of the same whole is shaded.
  - More parts means smaller pieces.
Together:
  - Shade the fractions on the bars.
  - Which bar shows more shaded part?
  - Which fraction is greater?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs the bigger piece. Type the bigger fraction.
Reasons the pet gives when it is caught:
  bigden: Look closer. Bigger bottom number means smaller pieces.
  small: The sign is turned round. This one is actually smaller.
Tonight's question: Ask {name}: Which is bigger, three fourths or five sixths?
About 3.3 minutes.
```

## 17. Round to 100 (round2)

```text
Idea: Find the hundreds a number sits between, then pick the nearer one.

Remember:
  - Do you remember this? What comes next counting by tens from {k}?
Explore:
  - Put a pin anywhere on this number line.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - We round to the nearer hundred.
Together:
  - Find the hundreds around {n}.
  - Now slide the pin to the nearer hundred.
  - Type the number we round to.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs a sign at each hundred. Round {n} to the nearest hundred.
Reasons the pet gives when it is caught:
  trunc: It is past halfway. Round up to the next hundred.
  rup: It is not halfway yet. Round down to the lower hundred.
Tonight's question: Ask {name}: "What would you round 73 to, the nearest ten?"
About 3.3 minutes.
```

## 18. Time to the Minute (time5)

```text
Idea: Count the long hand by fives to the last number then on by ones.

Remember:
  - Do you remember this? Set the clock to {time}.
Explore:
  - Move the hands. Set any time you like. Any way works.
Name it:
  - You set {time}.
  - The hour is {hour}.
  - Count the long hand by fives to the last number then on by ones.
Together:
  - Set the clock to show {time}.
  - Look at this clock. Pick its time.
  - Look where the long hand points. Work out the minute.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The forest clock shows when the animals eat. What minute is it?
Reasons the pet gives when it is caught:
  minute: Look closer at the long hand. It shows minutes. | Count by fives then ones from the long hand.
  given: That number is already on the clock. Count the minutes.
Tonight's question: Ask {name}: "Can you tell me what time the kitchen clock shows right now?"
About 3.4 minutes.
```

## 19. Area (geo2)

```text
Idea: Area counts the squares inside.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade any squares on the grid. Any way you like!
Name it:
  - You shaded {sum} squares.
  - Area counts the squares inside.
Together:
  - Build a rectangle with sides {a} and {b}.
  - Count the squares inside this one.
  - Find the area with sides {a} and {b}.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden needs new grass. It has sides {a} and {b}. What is its area?
Reasons the pet gives when it is caught:
  perim: That counts around the edge. We need squares inside. | Try counting the squares inside instead.
  mulAdd: We multiply the sides. Not add them. | The sides tell us rows and how many in each row.
Tonight's question: Ask {name}: What is the area of our table?
About 3.3 minutes.
```

## 20. Equal Fractions (frac5)

```text
Idea: Multiply the top and bottom by the same number and the fraction stays the same.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade the same amount on both bars. Any way you like!
Name it:
  - You shaded the same amount.
  - It is {a} of {x} on top and {b} of {y} below.
  - Multiply the top and bottom by the same number and the fraction stays the same.
Together:
  - Shade the bottom bar to match {top} of {bottom} on the top bar.
  - Type the missing number so both bars match.
  - Type the missing number so both match in symbols.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs equal fractions. Type the missing top number.
Reasons the pet gives when it is caught:
  addEq: Look closer. I added the same number to the top and bottom.
  given: I said a number that was already shown. Look again.
Tonight's question: Ask {name}: "Can four eighths be the same as one half?"
About 3.5 minutes.
```

## 21. Take Away Across Zeros (sub7)

```text
Idea: When a place runs out break one from the next place.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Take away as many as you like from {a} blocks.
Name it:
  - You had {a}. You took {b}. {diff} are left.
  - When a place runs out break one from the next place.
Together:
  - Take {b} away from {a} blocks. Break when you need to.
  - Look at the picture of {a}. Type what is left.
  - Now try it in columns.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs clearing. Take {b} from {a} logs.
  - The bridge needs fixing. Take {b} from {a} boards.
Reasons the pet gives when it is caught:
  col: I took the smaller digit from the bigger one. Top take away bottom.
  keep: I broke a ten but did not take it from the next place.
  slip: Look closer. One off in this step.
Tonight's question: Ask {name}: "What is 200 take away 125?"
About 3.4 minutes.
```

## 22. Times 11 & 12 (mfact5)

```text
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Remember this one? What is {a} times {b}?
Explore:
  - Make a number with rods and cubes. Any way works.
Name it:
  - You made {n}. Now {b} groups of it.
  - The blocks show {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Build the groups and trade.
  - Now look at the picture and type what you get.
  - Now the symbols only. You know what to do.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The tower needs blocks for the top. How many?
Reasons the pet gives when it is caught:
  mcarry: I left out the ten from the trade.
  skip: One group too few. Count the groups again.
  tens0: I worked the tens part as ones.
Tonight's question: Ask {name}: "What is eleven times nine?"
About 3.4 minutes.
```

## 23. Place Value to 999,999 (pv4)

```text
Idea: Each place is worth ten times the place to its right.

Remember:
  - Do you remember this? Make {n} with blocks.
Explore:
  - Make any number you like on the place value chart. Any way works.
Name it:
  - You built {n}.
  - Look at the {a}. It is worth {value}.
  - Each place is worth ten times the place to its right.
Together:
  - Let us build {n} on the chart.
  - Look at this chart. What is the {a} worth?
  - In symbols what is the {a} worth in {n}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a part number. What is the {a} worth in {n}?
Reasons the pet gives when it is caught:
  given: I said the number I could see. Look closer at the chart!
  place: I mixed up the places. Check the chart again.
Tonight's question: Ask {name}: What is the value of the digit four in forty two thousand?
About 3.4 minutes.
```

## 24. 2-Digit Times 1-Digit (mbig2)

```text
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build any number with rods and cubes. I will tell you what that many groups make.
Name it:
  - You built {n}. We made {b} groups.
  - That gives us {sum} in all.
  - Multiply each place then trade ten for one of the next.
Together:
  - Let's build every group. Trade ten for one of the next place.
  - Now look at the picture. What is the product?
  - Here is the problem in symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory packs {a} boxes with {b} toys each. How many toys?
Reasons the pet gives when it is caught:
  mcarry: I forgot to add the ten from the ones place.
  tens0: I worked the tens part as ones.
  slip: Look closer. I slipped there.
Tonight's question: Ask {name}: "What is 24 times 3?"
About 3.4 minutes.
```

## 25. Add 4-Digit Numbers (big6)

```text
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this one? Make the number {n} with blocks.
Explore:
  - Make any number on the chart. Use the thousands too. Any way works.
Name it:
  - You made the number {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones. Trade when a place needs it.
Together:
  - Both numbers are on the chart. Add from the ones.
  - Here they are in columns. Add from the ones.
  - Now the problem in a row.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory counts loads of parts. How many in all?
  - One more order. Add the loads.
Reasons the pet gives when it is caught:
  nocarry: The ten from the ones is missing. Add it to the next place.
  cat: The places got mixed. Add each column and trade the ten up.
  slip: Good catch. I slipped there. | Look closer. I slipped.
Tonight's question: Ask {name}: "What is 2,475 plus 1,368?"
About 3.4 minutes.
```

## 26. Divide 2-Digit Numbers (dbig1)

```text
Idea: Share the biggest place first. Leftovers break into the next place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number. Pick how many equal groups to share it into. Any way works.
Name it:
  - You shared {n} into {b} groups.
  - Each group has {a}. There are {k} left.
  - Share the biggest place first. Leftovers break into the next place.
Together:
  - Let us share {n} into {b} equal groups.
  - Here is a picture of the blocks.
  - Now the symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs equal boxes of parts. Share {n} into {b} boxes.
  - Now share a new number into a new number of boxes.
Reasons the pet gives when it is caught:
  drop: I shared each place and dropped what was left over. | The leftovers need to break into the next place.
  remBig: The remainder cannot be as big as the groups. | Share more so the remainder is smaller.
  slip: That step is one off. Look closer at the blocks.
Tonight's question: Ask {name}: How would you share 48 toy cars into 4 equal groups?
About 3.5 minutes.
```

## 27. Big Times 1-Digit (mbig3)

```text
Idea: Multiply each place then trade ten of a place for one of the next.

Remember:
  - Remember this one? What is {a} times {b}?
Explore:
  - Make any number with the blocks. Any way works.
Name it:
  - You made {n}.
  - {b} groups of {n} is {sum}.
  - Multiply each place then trade ten of a place for one of the next.
Together:
  - Build every group then trade.
  - Look at the picture. Type what it shows.
  - Now the symbols only. What is {a} times {b}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - In the factory we need parts. How many for {a} times {b}?
  - One more job. What is {a} times {b}?
Reasons the pet gives when it is caught:
  mcarry: I left out the ten I traded. It goes to the next place.
  tens0: I worked a tens part as ones. A tens part ends in zero.
  slip: Good catch. I slipped there. | Look closer. I slipped.
Tonight's question: Ask {name}: What is 23 times 4?
About 3.4 minutes.
```

## 28. Take Away Big Numbers (sub8)

```text
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this? Make the number {n} with blocks.
Explore:
  - Make any number on the chart. Use the thousands too. Any way you like.
Name it:
  - You made {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones and trade when needed.
Together:
  - We take away on the chart. Watch each trade.
  - Now we take away in columns. Watch each trade.
  - Now we take away in a row. Watch each trade.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory had {a} parts and used {b}. How many are left?
  - One more job. Take {b} away from {a}.
Reasons the pet gives when it is caught:
  col: We trade when the top digit is too small. | Take from the next place and trade for ten ones.
  keep: I borrowed a ten but did not take it from the tens place. | Remember to take one from the tens when you borrow.
  slip: Look closer at that step. One is off. | Good catch. I slipped there.
Tonight's question: Ask {name}: What is 452 minus 178?
About 3.5 minutes.
```

## 29. Divide with Leftovers (dbig2)

```text
Idea: Share the biggest place first. Leftovers break into the next place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number. Share it into equal groups. Any way works.
Name it:
  - You shared {n} into {b} groups.
  - Each group has {a}. There are {k} left.
  - Share the biggest place first. Leftovers break into the next place.
Together:
  - Let's share {n} into {b} equal groups.
  - Look at the picture. How many in each group?
  - Now write the division.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory packs {n} toys into {b} boxes. How many in each?
  - Share {n} blocks into {b} equal groups.
Reasons the pet gives when it is caught:
  remBig: The remainder cannot be as big as a group. Share one more.
  drop: Do not drop the leftovers. They make part of the next place.
Tonight's question: Ask {name}: "Share 47 apples by 5 friends. How many each, how many left?"
About 3.4 minutes.
```

## 30. Factors & Multiples (fact1)

```text
Idea: Rows and row length are factors of the number.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array of {n} dots. Any way you like!
Name it:
  - You made {n} dots in {a} rows of {b}.
  - The rows and row length are factors of {n}.
Together:
  - Build {n} dots in {a} rows.
  - How many dots fill each row?
  - Write it with a times sign.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a box for {n} parts in {a} rows. How long is each row?
Reasons the pet gives when it is caught:
  fact: I was one row off. Multiply back to check.
  given: I said the number of rows. The answer is how many in each row.
Tonight's question: Ask {name}: "Can you find two factors of twenty four?"
About 3.3 minutes.
```

## 31. 2-Digit Times 2-Digit (mbig4)

```text
Idea: Multiply each part then add the parts.

Remember:
  - Do you remember this one? What is {a} times {b}?
Explore:
  - Pick any numbers. Use the steppers to build them any way you like.
Name it:
  - You picked {a} and {b}.
  - Each part times each part then add them.
  - {a} times {b} is {sum}.
Together:
  - First break it into parts and multiply each part.
  - Now find each part then add them all.
  - Now do it with the symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs rows of boxes. How many if there are {a} rows of {b}?
Reasons the pet gives when it is caught:
  tens0: I worked a tens part as ones. A tens part ends in zero.
  part: One part of the product is missing. Look again.
  slip: That is close. Check this step one more time.
Tonight's question: Ask {name}: "What is twenty three times thirty four?"
About 3.4 minutes.
```

## 32. Add Big Numbers (big7)

```text
Idea: Line up the places. Work from the ones. Trade when a place needs it.

Remember:
  - Do you remember this one? Make the number {n} with blocks.
Explore:
  - Make any number on the chart. Use the thousands too. Any way you like.
Name it:
  - You made {n}.
  - Its thousands digit is {a}.
  - Line up the places. Work from the ones. Trade when needed.
Together:
  - Let's add these on the chart. Type the total.
  - Now add these in columns. Type the total.
  - Now add these written in a row. Type the total.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory adds big orders. Find the total.
  - One more job. Add to find the total parts.
Reasons the pet gives when it is caught:
  nocarry: The ten from the ones needs to go to the tens place.
  cat: We add each place then trade. Do not write them side by side.
  slip: Look closer. One place is off by a ten.
Tonight's question: Ask {name}: What is 456 plus 278?
About 3.4 minutes.
```

## 33. Divide Big Numbers (dbig3)

```text
Idea: Share the biggest place first. Leftovers break into the next place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick a number. Pick how many equal groups to share it into.
Name it:
  - You shared {n} into {b} groups.
  - Each group has {a} with {k} left over.
  - Share the biggest place first. Leftovers break into the next place.
Together:
  - Let us share {n} into {b} equal groups.
  - Here is a picture of the blocks. How many in each group?
  - Now write the division in symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory needs to share the new parts into equal boxes.
  - Share {n} into {b} equal groups.
Reasons the pet gives when it is caught:
  drop: I shared each place but dropped what was left over. | The leftovers must break into the next smaller place.
  zero0: A zero is missing inside the answer. | Check each place. The zero shows no groups there.
  remBig: The leftover is as big as a full group. | Share one more into the groups. The leftover must stay smaller.
  slip: That step is one off. Look again at the blocks.
Tonight's question: Ask {name}: "Share 84 toy parts into 4 equal groups. How many in each?"
About 3.4 minutes.
```

## 34. Prime or Composite (fact2)

```text
Idea: A composite number makes more than one row. A prime makes only one.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make an array with {n} dots. Any way you like!
Name it:
  - Your array shows {n} dots in {a} rows of {b}.
  - A composite number makes an array with more than one row.
  - A prime number makes only one row.
Together:
  - Build an array for {n} in more than one row.
  - Is {n} prime or composite?
  - Is this number prime or composite?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The factory needs a factor for {n} that is not one or the number itself.
Reasons the pet gives when it is caught:
  oddPrime: I thought every odd number is prime. Some odd numbers have factors.
Tonight's question: Ask {name}: "Is fifteen a prime number or a composite number?"
About 3.4 minutes.
```

## 35. Round Big Numbers (round3)

```text
Idea: Find the round numbers a number sits between then pick the nearer one. Halfway rounds up.

Remember:
  - Remember this one? What comes next counting by tens from {k}?
Explore:
  - Put a pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - Halfway rounds up.
Together:
  - Find the round numbers {n} sits between.
  - Slide the pin to the nearer round number.
  - What does {n} round to?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The factory orders parts in round numbers. Round this one.
Reasons the pet gives when it is caught:
  trunc: Look closer. We round up at halfway. | The nearer round number is higher here.
  rup: Look closer. We do not always round up. | The nearer round number is lower here.
Tonight's question: Ask {name}: "What does 472 round to, the nearest hundred?"
About 3.3 minutes.
```

## 36. Unlike Fractions (frac6)

```text
Idea: Compare how much of the same whole is shaded. More parts means smaller pieces.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any parts on each bar. Any way works!
Name it:
  - You shaded {a} of {x} parts on the top bar.
  - You shaded {b} of {y} parts on the bottom bar.
  - Compare how much of the same whole is shaded. More parts means smaller pieces.
Together:
  - Now shade these fractions on the bars.
  - Which bar shows more shaded part?
  - Which fraction is greater than the other?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail needs the bigger fraction of water. Which one?
Reasons the pet gives when it is caught:
  bigden: A bigger bottom number means smaller pieces. | Look closer at the size of each piece.
  small: The sign is turned round. Check which shaded part is larger.
Tonight's question: Ask {name}: "Which is bigger, three fourths or five sixths?"
About 3.4 minutes.
```

## 37. Simplest Form (frac7)

```text
Idea: The simplest form has the fewest biggest parts.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Shade the same amount on both bars. Any way works.
Name it:
  - You shaded the same amount.
  - That is {a} of {x} parts on top and {b} of {y} below.
  - The simplest form has the fewest biggest parts.
Together:
  - Shade the bottom bar to match the top bar.
  - Type the missing number to match.
  - Write the same fraction in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs the simplest form. Write {top} over {bottom} in simplest form.
Reasons the pet gives when it is caught:
  oneSide: We divide the top and the bottom by the same number.
  flip: The top tells the shaded parts. The bottom tells all the parts.
Tonight's question: Ask {name}: "Can you draw a picture for four sixths in simplest form?"
About 3.4 minutes.
```

## 38. Add & Subtract Parts (fop1)

```text
Idea: Same-size parts add like things: add the tops, the bottom stays.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade some parts on each bar. Any way you like.
Name it:
  - You shaded {a} and {b} parts of the {x}.
  - {a} and {b} is {sum} over {x}.
  - Same-size parts add like things: add the tops, the bottom stays.
Together:
  - Shade {a} parts then shade {b} more on one bar.
  - How many parts are shaded now?
  - Add the tops. The bottom stays the same.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs sand in parts. Work it out for me.
  - One more load of sand. How much now?
Reasons the pet gives when it is caught:
  addBot: The bottom stays the same. Add only the tops. | We add the shaded parts. The total parts do not change.
  slip: Look closer. One part too many or too few.
Tonight's question: Ask {name}: What is three fifths plus one fifth?
About 3.4 minutes.
```

## 39. Mixed Numbers (frac8)

```text
Idea: Every full bar is one whole. The parts left over make the fraction.

Remember:
  - Do you remember this? Name the shaded fraction.
Explore:
  - Shade any parts you like on both bars.
Name it:
  - You shaded {a} parts.
  - Every full bar is one whole.
  - The parts left over make the fraction.
Together:
  - Type the whole bars and the parts left over.
  - Now find it on the number line.
  - Write it with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs mixed numbers marked. Type what you know.
  - One more to mark on the map. Show what you know.
Reasons the pet gives when it is caught:
  mixTop: I kept all the parts on top. Take the whole bars out first.
  slip: I counted one whole bar wrong.
Tonight's question: Ask {name}: "How many wholes are in 11 fourths?"
About 3.3 minutes.
```

## 40. Whole × Fraction (fop2)

```text
Idea: A whole number times a fraction is that many copies of the fraction.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade some parts on each bar. Any way you like!
Name it:
  - You shaded {a} out of {x} on the first bar.
  - You shaded {b} out of {x} on the next bar.
  - A whole times a fraction is that many copies of the fraction: multiply the top.
Together:
  - Here are {a} copies of a bar shaded {b} out of {x}.
  - Count all the shaded parts. What fraction is that?
  - Now try it with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The path needs sand in {a} sections. Shade each part. What fraction is shaded?
  - The wall has {a} windows. Shade {b} out of {x} in each. What fraction shows sky?
Reasons the pet gives when it is caught:
  mulBot: The bottom stays the same. Only multiply the top.
  slip: Look closer at the shaded parts. One is off.
Tonight's question: Ask {name}: "What is 3 times 2 fifths?"
About 3.6 minutes.
```

## 41. Tenths & Hundredths (dec1)

```text
Idea: The first place after the point is tenths. The next is hundredths.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any squares. Ten squares make one whole.
Name it:
  - You shaded {n} squares.
  - That is {n} tenths.
  - The first place after the point shows tenths.
Together:
  - Shade part of the whole to match this.
  - Type the decimal for the shaded bar.
  - Write this fraction as a decimal.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert trail needs a sign. Type the length as a decimal.
  - Now type this length as a decimal for the map.
Reasons the pet gives when it is caught:
  dzero: Look closer. The first place is tenths. The next is hundredths.
  given: I said the number I could see. Count the shaded squares.
Tonight's question: Ask {name}: "Can you point out the tenths place in a decimal number?"
About 3.3 minutes.
```

## 42. Compare Decimals (dec2)

```text
Idea: Compare the ones then tenths then hundredths. More digits does not mean bigger.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Use the chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Compare the ones first then the tenths then the hundredths.
  - More digits does not mean bigger.
Together:
  - Now let's compare on the number line.
  - Now let's compare with the place value chart.
  - Now let's compare these.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - Which is bigger in the sand castle plan?
  - Which is bigger for the desert path?
Reasons the pet gives when it is caught:
  longer: Look closer. More digits does not mean bigger.
  small: I turned the sign round. The open side faces the bigger number.
Tonight's question: Ask {name}: Which is bigger, four tenths or thirty five hundredths?
About 3.3 minutes.
```

## 43. Find the Missing Side (geo3)

```text
Idea: Half the perimeter is one long side and one short side.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Make any rectangle you like with the dots.
Name it:
  - Your rectangle has sides {a} and {b}.
  - The distance around is {sum}.
  - Half the perimeter is one long side and one short side.
Together:
  - Here is a side and the distance around.
  - Here is the same as a sum with a box.
  - Now the same told in words only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The trail needs a fence on every side. How long is the missing side?
Reasons the pet gives when it is caught:
  sideP: I took one side from the whole perimeter. Halve it first.
  half: I halved the wrong number. Half the perimeter is one long and one short side.
Tonight's question: Ask {name}: "Perimeter 24, one side 5. What is the other side?"
About 3.4 minutes.
```

## 44. Convert Units (meas5)

```text
Idea: A smaller unit needs more of it so multiply.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Pick how many feet you need for the desert path. Any number works!
Name it:
  - You picked {n} feet.
  - That is {sum} inches.
  - A smaller unit needs more of it so multiply.
Together:
  - We need {n} big units. Let's count up by the small unit size.
  - One big unit is this many small units. How many for {n}?
  - Now try the symbols. How many small units?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The desert trail needs supplies. How many small units for {n} big ones?
Reasons the pet gives when it is caught:
  conv: I added. To change to a smaller unit, multiply.
  skip: I counted one unit too many. Check the table.
Tonight's question: Ask {name}: How many inches are in 5 feet?
About 3.4 minutes.
```

## 45. Decimal Place Value (pv5)

```text
Idea: Each place is worth ten times the place to its right.

Remember:
  - Do you remember this? Show me {n} with the blocks.
Explore:
  - Make any number you like on the place value chart.
Name it:
  - You built {n}.
  - Look at the {a}. It is worth {value}.
  - Each place is worth ten times the place to its right.
Together:
  - Let's build {n} on the chart.
  - What is the {a} worth here?
  - What is the {a} worth in {n}?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab needs a reading. What is the {a} worth in {n}?
Reasons the pet gives when it is caught:
  given: I said the number I could see. Look at the chart!
  place: I mixed up the places. Look again at the chart.
Tonight's question: Ask {name}: "What is the value of the 4 in 2.45?"
About 3.3 minutes.
```

## 46. 3-Digit Times 2-Digit (mbig5)

```text
Idea: Multiply each part then add the parts.

Remember:
  - Do you remember this times fact? What is {a} times {b}?
Explore:
  - Pick any numbers. Build them with the steppers any way you like.
Name it:
  - You picked {a} and {b}.
  - Each part has its own product.
  - Multiply each part then add the parts to get {sum}.
Together:
  - Picture the parts of {a} times {b}.
  - Find the product of each part then add them.
  - Now do {a} times {b} with symbols only.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab packs trays. How many in all?
Reasons the pet gives when it is caught:
  tens0: I worked a tens part as ones. A tens part ends in zero.
  part: One part of the product is missing. Look again.
  slip: That one is close. Check this step once more.
Tonight's question: Ask {name}: What is the product of 124 times 13?
About 3.4 minutes.
```

## 47. Add/Subtract Decimals (dec3)

```text
Idea: Line up the points.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the place value chart. Make any number you like.
Name it:
  - You made {n}.
  - A whole number has its point at the end.
  - Line up the points.
Together:
  - We add these. Line up the points first.
  - Now in columns with the points lined up.
  - Now the symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs these amounts mixed. How much in all?
  - The lab needs these amounts mixed. How much in all?
Reasons the pet gives when it is caught:
  point: The points must line up in a column.
  slip: Look again. That one was wrong.
Tonight's question: Ask {name}: "What is 3.25 plus 4.7?"
About 3.3 minutes.
```

## 48. Powers of Ten (pv6)

```text
Idea: Times ten moves every digit one place to the left.

Remember:
  - Do you remember this? Make {n} with the blocks.
Explore:
  - Make any number you like on the place value chart.
Name it:
  - You built {n}.
  - Here is {n} times ten. It is {value}.
  - Times ten moves every digit one place to the left.
Together:
  - Build {n} on the chart then times it by {k}.
  - Look at this chart of {n}. What do you get times {k}?
  - Now try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs the reading worked out. Use {n} and {k}.
Reasons the pet gives when it is caught:
  place: I moved the digits one place too far, or not far enough.
  given: I left the number as it was. Every digit must move.
Tonight's question: Ask {name}: "What number is ten times bigger than four hundred?"
About 3.4 minutes.
```

## 49. Multiply Decimals (dec4)

```text
Idea: Multiply as if there were no points then count the digits after both points.

Remember:
  - Do you remember this times fact? Show me {a} times {b}.
Explore:
  - Use the place value chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Multiply as if there were no points.
  - Then count the digits after both points.
Together:
  - First multiply the same digits without the points.
  - Next put the point into the answer.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs some mixes. Find each amount.
  - The lab needs more mixes. Find each amount.
Reasons the pet gives when it is caught:
  dpt: I put the point in the wrong place. Count the digits after both points.
  slip: I slipped in the multiplying. Check that step.
Tonight's question: Ask {name}: What is four and two tenths times three?
About 3.3 minutes.
```

## 50. Round Decimals (round4)

```text
Idea: Find the round numbers a decimal sits between, then pick the nearer one.

Remember:
  - Do you remember this? What comes next counting by tens from {k}?
Explore:
  - Put the pin anywhere on this number line between {a} and {b}.
Name it:
  - Your number is {n}.
  - It rounds to {a}.
  - Halfway rounds up.
Together:
  - Mark {n} on the line then slide the pin to the nearer round number.
  - Here is the line. What does it round to?
  - Round {n} with no line.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lava needs a round number for the next step. Round {n}.
Reasons the pet gives when it is caught:
  trunc: Look again. We round up at half.
  rup: This one is not halfway. It is closer to the lower round number.
Tonight's question: Ask {name}: "What is three point seven rounded to the nearest whole number?"
About 3.3 minutes.
```

## 51. Order of Operations (ooo1)

```text
Idea: Times and divide come before plus and minus.

Remember:
  - Do you remember this fact? What is {a} times {b}?
Explore:
  - Pick the numbers. Build a problem like this. Any way you like.
Name it:
  - You built {a} plus {b} times {k}.
  - The answer is {sum}.
  - Times comes before plus.
Together:
  - First work out the times part.
  - Now the full problem with the times marked.
  - Now the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab needs some readings. Solve this one.
  - One more for the notes. Solve this one.
Reasons the pet gives when it is caught:
  order: Order matters. Times first then plus. | Look again. Times before plus.
  slip: That step is off. Look once more.
Tonight's question: Ask {name}: What is four plus five times two?
About 3.3 minutes.
```

## 52. Divide Decimals (dec5)

```text
Idea: Divide as if there were no point then put the point back in the same place.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Use the place value chart. Make any decimal you like.
Name it:
  - You made {n}.
  - Divide as if there were no point.
  - Then put the point back in the same place.
Together:
  - First divide the digits without the point.
  - Now put the point in the answer.
  - Now try the problem in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The lab shares powder evenly between jars. How much does each get?
  - One more batch to share.
Reasons the pet gives when it is caught:
  dpt: I put the point in the wrong place. It stays where it was.
  slip: I slipped in the dividing. Check that step.
Tonight's question: Ask {name}: "What is 4.8 divided by 2?"
About 3.3 minutes.
```

## 53. Unlike Denominators (fop3)

```text
Idea: Make the bottoms the same first then add the tops.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade the same amount on both bars. Any way you like.
Name it:
  - You shaded {a} and {b} out of {x}.
  - {sum} out of {x} in all.
  - Make the bottoms the same first then add the tops.
Together:
  - Rename the first fraction to match the bottom bar.
  - Both bars are cut the same now. Type the total.
  - Add these in symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The caves need light of each kind. How much in all?
Reasons the pet gives when it is caught:
  addBot: I added the bottoms too. Rename to match first.
  renameTop: I changed the bottom but not the top. Keep the value the same.
  slip: That one was off by one. Look again.
Tonight's question: Ask {name}: "What is one half plus one fourth?"
About 3.4 minutes.
```

## 54. Volume of a Box (geo4)

```text
Idea: Volume counts the cubes inside a box.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Build any box you like with the cubes. Take your time.
Name it:
  - One layer of {a} by {b} holds {sum} cubes.
  - Volume counts the cubes: one layer times how many layers.
Together:
  - Here is one layer of a box and how many layers. How many cubes?
  - Look at this picture of the box. How many cubes fill it?
  - The sides are told in words only. Find the volume.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The crystal box needs filling. How many cubes fit?
  - Build a box for the crystals. Sides {a} and {b}, {k} layers. How many fit?
Reasons the pet gives when it is caught:
  layer: Count every layer, not just the top one.
  mulAdd: I added the sides. Volume multiplies length, width and height.
Tonight's question: Ask {name}: What is the volume of a box 4 by 5 by 3?
About 3.5 minutes.
```

## 55. Multiply Fractions (fop5)

```text
Idea: Part of a part: multiply the tops and multiply the bottoms.

Remember:
  - Do you remember this? Name the shaded part.
Explore:
  - Shade any squares in the grid. Any way you like.
Name it:
  - You shaded {sum} of {x} squares.
  - Part of a part: multiply the tops and multiply the bottoms.
Together:
  - Shade the overlap of these rows and columns.
  - Now write the fraction for the shaded part.
  - Try this one with symbols only.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs some pieces. Find each as a fraction.
  - One more for the map. What part is that?
Reasons the pet gives when it is caught:
  mixAdd: We multiply here. Add when the bottoms match.
  topOnly: Both tops and both bottoms. Try that again.
Tonight's question: Ask {name}: "We need half of half a pie. What fraction is that?"
About 3.3 minutes.
```
