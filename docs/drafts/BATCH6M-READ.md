# Batch 6m read-through: the grade 6 math lessons

18 lessons, in map order: Sky City, then Galaxy Core. Each is what the child hears:
the six beats, the pet's reasons when it is caught, and tonight's question for you.

Grade 6 hears the teen-like partner: calm, dry, "check my work" and "give me a hard one".

The app fills in each {slot} from the problem on screen, so numbers are always right;
a negative number is said "negative 4". The app also says each problem or story itself,
after the Together and Show lines.

Until you approve a lesson, it runs on short hand-written lines
(its idea, a Name it line, the pet's reasons), so it works now.

New models in this batch: a ratio table, a number line from negative ten to ten,
a hundred grid and a percent bar, equations as two bars, powers with the square
or the cube drawn, a four-quadrant grid, triangles and trapezoids in their rectangles,
hops of multiples and equal groups (GCF and LCM), level towers for the mean, and groups
over a fraction bar for dividing fractions. In the equation and expression lessons the
pet shows its written steps, and the child may set the pet a problem of their own.

To change a word: edit the JSON in that lesson's file in docs/drafts/.
When you are happy, say so, or run:

`node tools/author.js --approve all --batch 6m --by <your name>`

(or name the lessons instead of all). Approved lessons use their words at the next build.
No lesson of another batch is waiting.

## 1. Ratios and Tables (ratio1)

```text
Idea: A ratio table grows by multiplying both rows by the same number.

Remember:
  - A times fact from before.
Explore:
  - Every group has the same red and blue beads. Add as many groups as you like.
Name it:
  - Your table reaches {a} red and {b} blue.
  - That is the first column times {k}, in both rows.
  - A ratio table grows by multiplying both rows, never by adding the same amount.
Together:
  - Build it out one column at a time.
  - Every column follows one rule. Use it for the empty box.
  - No table this time. Picture it, then multiply.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The bead shop mixes its colors by the ratio. Work out the order.
Reasons the pet gives when it is caught:
  addRat: I added the same amount to both rows. A ratio grows by times.
  ratSwap: I took the number from the wrong row. Each amount stays in its own row.
Tonight's question: Ask {name}: "3 red for every 5 blue. How many blue with 12 red?"
About 3.4 minutes.
```

## 2. Unit Rates (ratio2)

```text
Idea: A unit rate is how much for one: share the total by the number of items.

Remember:
  - A times fact from before.
Explore:
  - Build any bar of equal boxes: pick the boxes and what goes in each.
Name it:
  - Your bar holds {sum}, in equal boxes of {b}.
  - One box is {b}: the rate for one.
  - Share the total by the number of items, then multiply for more items.
Together:
  - One box for each item. What goes in each?
  - The total is on top. Share it out.
  - Find the rate for one first, then scale up.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The Sky City planners run on rates. Work these out.
Reasons the pet gives when it is caught:
  wrongOp: I multiplied, but the story shares the total out.
  addRat: I added or took away the same amount. Rates scale by multiplying.
Tonight's question: Ask {name}: "4 pounds cost $12. How much is 1 pound? And 7 pounds?"
About 3.4 minutes.
```

## 3. Integers on a Line (int1)

```text
Idea: Negative numbers sit left of zero, and further left is always less.

Remember:
  - A times fact from before.
Explore:
  - Move the dot anywhere on the line, on either side of zero.
Name it:
  - Your dot is at {x}.
  - That is {n} steps from zero.
  - Left of zero is negative, and further left is always less.
Together:
  - Cold days and deep dives sit below zero. Place it.
  - Count on from the nearest label to read the dot.
  - Picture both on the line. The one further right is greater.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The weather station compares cold readings. Sort these out.
Reasons the pet gives when it is caught:
  negSide: I put it on the wrong side of zero. Negatives go left.
  negBig: I went by the size and forgot the sign. Further left is less.
Tonight's question: Ask {name}: "Which is colder, -3 degrees or -8 degrees?"
About 3.3 minutes.
```

## 4. Percent of a Number (ratio3)

```text
Idea: Percent means out of a hundred: find one tenth, then take as many tenths as you need.

Remember:
  - A times fact from before.
Explore:
  - Each box of this bar is ten percent. Shade any amount you like.
Name it:
  - You shaded {n} percent of {k}.
  - That part is worth {a}.
  - Find one tenth first, then take as many tenths as the percent says.
Together:
  - Each box is ten percent. Shade the boxes you need.
  - Find what one box is worth, then add up the shaded part.
  - No bar now. One tenth first, then scale.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The supply depot hands out shares by percent. Work them out.
Reasons the pet gives when it is caught:
  pctNum: I gave the percent itself, not that part of the number.
  pct10: I found ten percent and stopped. I needed more tenths than that.
Tonight's question: Ask {name}: "What is 30% of 70?"
About 3.4 minutes.
```

## 5. Absolute Value (int2)

```text
Idea: Absolute value is the distance from zero, so it is never negative.

Remember:
  - A times fact from before.
Explore:
  - Move the dot anywhere. The hop always starts at zero.
Name it:
  - Your dot is at {x}.
  - The hop from zero is {n} long.
  - Absolute value is that distance, so it is never negative.
Together:
  - Hop from zero to the number.
  - Count the steps of the hop.
  - Picture the line. Across zero, add both distances.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The cable crew measures distances across zero. Find them.
Reasons the pet gives when it is caught:
  absNeg: I kept the minus sign. A distance is never negative.
  absDist: I took one distance from the other. Across zero they add.
Tonight's question: Ask {name}: "How far apart are -4 and 5 on a number line?"
About 3.3 minutes.
```

## 6. Fractions and Percents (ratio4)

```text
Idea: To write a fraction as a percent, rename it out of a hundred.

Remember:
  - A fraction from before.
Explore:
  - The grid has a hundred squares. Shade as many as you like.
Name it:
  - You shaded {n} squares out of a hundred.
  - So that is {n} percent.
  - Rename a fraction out of a hundred; then the top is the percent.
Together:
  - Shade the same amount of the hundred grid.
  - Think: how many hundredths is that bar?
  - Rename it out of a hundred, then read the top.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The paint shop labels its tins in percents. Convert these.
Reasons the pet gives when it is caught:
  pctTop: I used the top number as it was. The bottom had to be a hundred first.
  pctCat: I stuck the top and the bottom together. That is not a percent.
Tonight's question: Ask {name}: "What percent is 3/4? And 2/5?"
About 3.3 minutes.
```

## 7. Divide Fractions (fop7)

```text
Idea: Dividing by a fraction counts how many of it fit: same size parts first.

Remember:
  - A fraction from before.
Explore:
  - Mark groups over the shaded part, as many as you like.
Name it:
  - {n} groups cover {a} parts of the bar.
  - Dividing by a fraction asks how many of it fit.
  - With same size parts, just divide the tops.
Together:
  - Mark groups until the shaded part is covered.
  - The parts already match. Count how many groups fit.
  - Rename to same size parts, then divide the tops.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The panel crew cuts strips into pieces. How many fit?
Reasons the pet gives when it is caught:
  noRename: I divided the tops before the parts were the same size.
  flipDiv: I turned it upside down. It asks how many fit: a whole count.
Tonight's question: Ask {name}: "How many 1/6 cups fit in 2/3 of a cup?"
About 3.3 minutes.
```

## 8. Integer Add & Subtract (int3)

```text
Idea: Adding moves right on the line; taking away, or adding a negative, moves left.

Remember:
  - A times fact from before.
Explore:
  - Start at the mark. Move the dot anywhere and watch the hop.
Name it:
  - You moved {n} steps and landed on {x}.
  - Right is adding, left is taking away.
  - Adding a negative number moves left too.
Together:
  - Start at the first number, then move the dot.
  - Start at the mark and count the steps in your head.
  - Picture the line: which way, and how far?
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The tower lift goes above and below the ground. Track it.
Reasons the pet gives when it is caught:
  negDir: I moved the wrong way on the line. Check the sign first.
  negIgn: I dropped the minus sign of the start number.
Tonight's question: Ask {name}: "It is -4 degrees, then 9 degrees warmer. What now?"
About 3.3 minutes.
```

## 9. Exponents (ooo2)

```text
Idea: The exponent says how many times the base is used as a factor.

Remember:
  - A times fact from before.
Explore:
  - Pick a base, and how many times to use it as a factor.
Name it:
  - {a} used {n} times makes {sum}.
  - The small number counts the factors.
  - It never means the base times that number.
Together:
  - Set the base, then how many times it is used.
  - Count the squares, or the cubes, layer by layer.
  - Brackets first, then powers, then the rest in order.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The station's power readings use exponents. Work them out.
Reasons the pet gives when it is caught:
  powMul: I multiplied the base by the small number. It counts factors.
  order: I did the steps out of order. Powers come before times and plus.
Tonight's question: Ask {name}: "Is 4 cubed the same as 4 times 3? Why not?"
About 3.3 minutes.
```

## 10. One-Step Equations (alg1)

```text
Idea: Undo what is done to x: do the opposite to both sides.

Remember:
  - A take-away fact from before.
Explore:
  - Set x to any number and watch both bars.
Name it:
  - With x as {x}, the bottom bar is {sum}.
  - The bars match when both sides are equal.
  - To get x alone, do the opposite to both sides.
Together:
  - Set x until both bars are the same length.
  - The bars show the parts. Undo the known one.
  - Undo it in your head: the opposite operation.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The gate code is the value of x. Crack both.
Reasons the pet gives when it is caught:
  undo: I did the same operation again instead of undoing it.
  slip: I slipped by one working it out.
Tonight's question: Ask {name}: "x + 17 = 42. What is x? How do you know?"
About 3.3 minutes.
```

## 11. Evaluate Expressions (ooo3)

```text
Idea: Put the number in for x; a number next to x means times.

Remember:
  - A times fact from before.
Explore:
  - Build any boxes of x. The extra box stays as it is.
Name it:
  - With x as {x}, your bar comes to {sum}.
  - That is {a} times {x}, then the extra box.
  - A number next to x means times: put the number in, multiply, then add.
Together:
  - Build the boxes of x first.
  - The value of x is in each box. Times first, then add.
  - Put the number in for x. Times first.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The core's power cells run on these formulas. Work them out.
Reasons the pet gives when it is caught:
  catVar: I wrote the number and x side by side. Next to x means times.
  order: I added before multiplying. Times comes first.
  slip: I slipped by one in a step.
Tonight's question: Ask {name}: "What is 3x + 4 when x is 5?"
About 3.4 minutes.
```

## 12. Solve with × and ÷ (alg2)

```text
Idea: Equal boxes share a total, so divide; a whole cut into boxes, so multiply.

Remember:
  - A times fact from before.
Explore:
  - Build any bar: pick the boxes, and what goes in each.
Name it:
  - Your bar holds {sum} in equal boxes of {x}.
  - If {a}x is {sum}, divide to find x.
  - If x is cut into boxes, multiply to find the whole.
Together:
  - Build the bar: the boxes, then what is in each.
  - Is x one box or the whole bar? Then undo.
  - Undo times with divide, and divide with times.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The core's power rods split their charge equally. Solve these.
Reasons the pet gives when it is caught:
  undo: I did the same operation again. Undo it with the opposite.
  slip: I slipped by one working it out.
Tonight's question: Ask {name}: "6x = 54. What is x?"
About 3.4 minutes.
```

## 13. Triangles & Trapezoids (geo5)

```text
Idea: A triangle is half of its rectangle: base times height, then half.

Remember:
  - A times fact from before.
Explore:
  - Set any base and height. The dashed rectangle fits around it.
Name it:
  - Base {a} and height {b}: the rectangle is {n}.
  - The triangle is half of it, {sum}.
  - A parallelogram skips the half; a trapezoid adds both bases first, then halves.
Together:
  - Set the base, then the height straight up.
  - Use the height, not the slanted side.
  - Picture the shape in its rectangle first.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The station's panels need covering. Find each area.
Reasons the pet gives when it is caught:
  noHalf: I found the whole rectangle and forgot to halve it.
  slant: I used the slanted side. The height stands straight up.
Tonight's question: Ask {name}: "A triangle has base 8 and height 5. What is its area?"
About 3.3 minutes.
```

## 14. Four Quadrants (coord2)

```text
Idea: Across first, then up; left of zero and below zero are negative.

Remember:
  - A times fact from before.
Explore:
  - Move point A anywhere, into any quadrant.
Name it:
  - Your point is {x} across and {y} up.
  - The signs of the numbers tell the quadrant.
  - Across first, then up; left and down are negative.
Together:
  - Across first, then up. Watch the minus signs.
  - Count from zero along the axis to read it.
  - Picture the grid: which way does each sign point?
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - Read these points off the star map.
Reasons the pet gives when it is caught:
  signFlip: I dropped a minus sign. Left and down are negative.
  swapXY: I read up before across. Across comes first.
Tonight's question: Ask {name}: "Which quadrant is (-2, 3) in?"
About 3.3 minutes.
```

## 15. GCF and LCM (fact3)

```text
Idea: The GCF is the biggest number that divides both; the LCM is the first number both count to.

Remember:
  - A times fact from before.
Explore:
  - Try any group size. Watch for anything left over.
Name it:
  - Groups of {k}, for {a} and {b}.
  - The biggest size that splits both is the greatest common factor.
  - The first number both count to is the least common multiple.
Together:
  - Factor: the biggest group size. Multiple: hop until they meet.
  - Look for the number on both lists.
  - Factors divide in; multiples come from counting up.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The space crews need matching packs. Work these out.
Reasons the pet gives when it is caught:
  gcfLcm: I mixed them up. A factor goes in; a multiple is made from it.
  mulAll: I just multiplied them. They meet sooner than that.
Tonight's question: Ask {name}: "GCF of 18 and 24? LCM of 4 and 6?"
About 3.3 minutes.
```

## 16. Mean, Median, Mode (data5)

```text
Idea: The mean shares the total equally; the median is the middle of the numbers in order.

Remember:
  - A times fact from before.
Explore:
  - Move the level line. Watch the blocks above and the gaps below.
Name it:
  - At {k}, there are {a} blocks above and {b} gaps below.
  - When those match, the line is at the mean.
  - The median is different: the middle number once they are in order.
Together:
  - Move the line until the extra blocks fill the gaps.
  - Mean: add and share. Median: order, then the middle.
  - Check which one it asks for before you start.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The crew logged new readings. Work these out.
Reasons the pet gives when it is caught:
  meanSum: I gave the total. It still had to be shared out.
  medSort: I took the middle before putting them in order.
Tonight's question: Ask {name}: "What is the mean of 2, 5, 3 and 6?"
About 3.4 minutes.
```

## 17. Two-Step Equations (alg3)

```text
Idea: Undo the steps in reverse: take away the number added, then divide.

Remember:
  - A one-step equation from before.
Explore:
  - Set x to any number and watch both bars.
Name it:
  - With x as {x}, the bottom bar is {sum}.
  - First take off the extra part, then share by the boxes.
  - Undo the steps in reverse order.
Together:
  - Set x until both bars are the same length.
  - Take off the known part, then split the rest.
  - Undo the plus or minus first, then the times.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The gate needs its codes. Solve for x.
Reasons the pet gives when it is caught:
  stop1: I stopped after one step. x was not alone yet.
  undo: I did the operation instead of undoing it.
  slip: I slipped by one in a step.
Tonight's question: Ask {name}: "3x + 4 = 19. What is x?"
About 3.3 minutes.
```

## 18. Rate & Percent Stories (story9)

```text
Idea: Picture the story first: a rate grows by equal groups, a percent takes tenths of the whole.

Remember:
  - A percent from before.
Explore:
  - Shade any percent of the bar you like.
Name it:
  - You shaded {n} percent of the bar.
  - That part is worth {a}.
  - Picture the story: equal groups make a rate, tenths make a percent.
Together:
  - Rate story: build the table. Percent story: shade the bar.
  - Use the model to find the missing number.
  - Picture the story first, then pick the operation.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The ship's crew has orders and sales to settle. Work them out.
Reasons the pet gives when it is caught:
  addRat: I added the same amount. A rate grows by times.
  pctNum: I gave the percent, not that part of the whole.
  wrongOp: I used the wrong operation for the story.
Tonight's question: Ask {name}: "A $40 jacket is 25% off. How much do you save?"
About 3.3 minutes.
```
