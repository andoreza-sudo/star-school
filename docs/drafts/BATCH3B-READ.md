# Batch 3b read-through: the stops batches 3 and 4 left out

21 lessons, in map order. Each is what the child hears:
the six beats, the pet's reasons when it is caught, and tonight's question for you.

Grades 3 and 4 hear the older kid pet; grade 5 hears the teen-like partner.
The last two (Word Workshop, 2nd grade reading) hear the little one.

The app fills in each {slot} from the problem on screen, so numbers are always right.
The app also says each problem or story itself, after the Together and Show lines.

Until you approve a lesson, it runs on short hand-written lines
(its idea, a Name it line, the pet's reasons), so it works now.

New models in this batch: bar models for story problems, a bar graph to build,
a line plot, angles and a protractor with two scales, a coordinate grid,
a kitchen scale and a jug, an in and out rule, shape facts and fold lines,
try-how-many-fit for dividing by 2-digit numbers, mixed-number bars, cut bars.

To change a word: edit the JSON in that lesson's file in docs/drafts/.
When you are happy, say so, or run:

`node tools/author.js --approve all --batch 3b --by <your name>`

(or name the lessons instead of all). Approved lessons use their words at the next build.
Note: --approve all WITHOUT --batch 3b also approves 19 lessons of other batches still waiting.

## 1. Story Problems 5 (story5)

```text
Idea: Equal boxes make a times story. Sharing into equal boxes is a dividing story.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Build any bar model you like. Pick the boxes, then how many go in each.
Name it:
  - You built {a} boxes with {b} in each.
  - That makes {sum} in all.
  - Equal boxes make a times story. Sharing into equal boxes is dividing.
Together:
  - Listen to the story, then build its bar model.
  - The bar model is drawn for you. What is the answer?
  - No picture this time. See the boxes in your head.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The trail crew packs supplies in equal boxes. Solve this story.
  - One more box story for the crew.
Reasons the pet gives when it is caught:
  wrongOp: Oops. I did the wrong thing for this story. Picture the boxes first.
  skip: Oops. I was one off. I should count the boxes again.
Tonight's question: Ask {name}: "4 bags with 6 apples in each. How many apples?"
About 3.5 minutes.
```

## 2. Scaled Graphs (data3)

```text
Idea: Each line or picture can stand for more than one. Count by the scale.

Remember:
  - Warm up with some skip counting.
Explore:
  - Each line on this graph counts {k}. Build any bar graph you like.
Name it:
  - Each line on your graph counts {k}.
  - Your tallest bar shows {a}.
  - Count by the scale, not by the squares.
Together:
  - Build this bar. Count by the scale as you go.
  - Read the graph. Check what each line or picture stands for.
  - No graph this time. Use the key in your head.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The rangers made graphs of the forest animals. Read this one.
  - Here is one more for the rangers.
Reasons the pet gives when it is caught:
  scale: Oops. I counted the squares. Each one stands for more than one.
  skip: Oops. I was one line off. I should count by the scale again.
Tonight's question: Ask {name}: "Each picture means 5. How many is 4 pictures?"
About 3.4 minutes.
```

## 3. Shape Families (shape5)

```text
Idea: Sort shapes by their sides and corners. A square is a rectangle too.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Here is a rectangle. Tap the facts you think are true. Any way is fine.
Name it:
  - Here are a square, a rectangle and a rhombus.
  - A square has square corners like a rectangle.
  - It has equal sides like a rhombus. So it is both.
Together:
  - Check the sides, then the corners. Tap every true fact.
  - Look at the sides and corners. Pick the best name.
  - No picture now. Listen to the facts and pick the name.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden gate needs the right shapes. Tap the true facts.
  - One more shape for the gate.
Reasons the pet gives when it is caught:
  propMix: Oops. I mixed up the sides and the corners. I will check each one.
Tonight's question: Ask {name}: "Is a square a rectangle? Why?"
About 3.5 minutes.
```

## 4. How Much Time Passed (time6)

```text
Idea: Count the minutes up to the next hour, then on from it.

Remember:
  - Warm up. Set the clock to this time.
Explore:
  - The clock shows the start time. Move the hands to any later time.
Name it:
  - You set the clock to {time}.
  - That is {n} minutes after the start.
  - Count up to the next hour, then on from it.
Together:
  - Move the long hand forward. Watch the hour change.
  - Count from the start to the next hour, then on.
  - No clocks this time. Count up to the hour first.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The fox family timed their walk. How long was it?
  - One more time for the fox family.
Reasons the pet gives when it is caught:
  hr100: Oops. I counted an hour as a hundred minutes. That is too many.
  minOnly: Oops. I only took away the minutes. I forgot the hour.
Tonight's question: Ask {name}: "How long is it from 2:40 to 3:15?"
About 3.4 minutes.
```

## 5. Rulers & Scales (meas4)

```text
Idea: Find what one mark is worth, then count by it.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Each mark on this scale is {k} grams. Move the needle to any mark.
Name it:
  - Each mark is worth {k} grams.
  - Your needle shows {n} grams.
  - Find what one mark is worth, then count by it.
Together:
  - Count by the marks to make it show the amount.
  - Find what one mark is worth. Then read it.
  - No picture now. Count by the marks in your head.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The bakery needs its flour and water measured. Read this one.
  - One more reading for the bakery.
Reasons the pet gives when it is caught:
  mark1: Oops. I counted each mark as one. Each mark is worth more.
  rEnd: Oops. I read the end of the ruler. It did not start at zero.
  skip: Oops. I was one mark off. I should count the marks again.
Tonight's question: Ask {name} to read the marks on a measuring cup.
About 3.4 minutes.
```

## 6. Story Problems 6 (story6)

```text
Idea: Some stories have more than one step: equal boxes first, then add or take away.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Build any equal boxes. One more box of {k} is there too.
Name it:
  - You built {a} boxes of {b}, and one more box of {k}.
  - That makes {sum} in all.
  - First the equal boxes, then the extra box.
Together:
  - First, build the equal boxes of the story.
  - The bar model is drawn. Do both steps.
  - No picture now. Do the first step, then the next.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The animals are stocking the forest store. Solve this story.
  - One more story for the store.
Reasons the pet gives when it is caught:
  oneStep: Oops. I stopped after the first step. The story has more.
  wrongOp: Oops. I added when I should take away, or the other way.
Tonight's question: Ask {name}: "3 boxes of 8 crayons, and 5 more. How many?"
About 3.4 minutes.
```

## 7. Kinds of Angles (ang1)

```text
Idea: Compare an angle with a square corner: less is acute, more is obtuse.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Open the angle any amount you like. I will tell you its kind.
Name it:
  - Your angle is {a} degrees.
  - A right angle is a square corner.
  - Less than that is acute. More is obtuse. A flat line is straight.
Together:
  - Open the angle until it is the kind I name.
  - Compare it with a square corner. Then pick its kind.
  - No picture now. Think of a square corner.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert gate needs angles of the right kinds. Make this one.
  - Make one more angle for the gate.
Reasons the pet gives when it is caught:
  angSw: Oops. I mixed up acute and obtuse. Acute is the small one.
  rtAng: Oops. It was close to a square corner, but not exactly.
Tonight's question: Ask {name} to find a square corner at home, then a smaller angle.
About 3.5 minutes.
```

## 8. Measure Angles (ang2)

```text
Idea: Start at zero on the side the angle starts, then count up that scale.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Open the angle on the protractor any amount you like.
Name it:
  - Your angle measures {a} degrees.
  - It starts on the right, so we count from the zero there.
  - Start at zero on the side the angle starts.
Together:
  - Find the zero on the starting side. Open the angle to the number.
  - Find the zero on the side the angle starts. Count up from there.
  - No protractor now. Think about the whole angle first.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The carpenter needs these angles measured. Read this one.
  - One more angle for the carpenter.
Reasons the pet gives when it is caught:
  proto: Oops. I read the other scale. I should start from the zero on its side.
  sup: Oops. I took it from the wrong whole. A square corner or a flat line?
  slip: Oops. I was one mark off. I should count the marks again.
Tonight's question: Ask {name}: "A flat line split into two angles: one is 50°. The other?"
About 3.5 minutes.
```

## 9. Symmetry & Lines (shape6)

```text
Idea: A line of symmetry folds a shape into matching halves.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Here is a square. Tap the lines you think fold it into matching halves.
Name it:
  - A square has {n} lines of symmetry.
  - Each one folds it into halves that match.
  - Slanted lines can fold a shape too.
Together:
  - Fold it in your mind along each line. Tap every one that works.
  - Picture each fold. Count the ones where the halves match.
  - No picture now. Picture the shape and fold it in your mind.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert signs must match when folded. Count the lines on this one.
  - One more sign to check.
Reasons the pet gives when it is caught:
  diag: Oops. I thought a slanted line folds it. The halves do not match.
  axis: Oops. I only counted the straight lines. Slanted ones fold it too.
Tonight's question: Ask {name} to fold a paper square every way that makes matching halves.
About 3.5 minutes.
```

## 10. In and Out Tables (pat4)

```text
Idea: The rule goes across, from each in number to its out number.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Set any rule you like. Watch what it does to each in number.
Name it:
  - Your rule turns {a} into {sum}.
  - A rule goes across, from in to out.
  - Test a rule on every row.
Together:
  - Look across each row. Set the rule that works on every row.
  - Find the rule first. Then use it on the new number.
  - No table now. Just use the rule.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The desert market has a price table. Find the missing number.
  - One more table for the market.
Reasons the pet gives when it is caught:
  rowJump: Oops. I followed the jumps down the out column. The rule goes across.
  mulAdd: Oops. I added when the rule multiplies.
Tonight's question: Ask {name}: "In 2, out 8. In 3, out 12. What is the rule?"
About 3.4 minutes.
```

## 11. Remainder Stories (story7)

```text
Idea: After dividing, ask what the leftovers mean in the story.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Pick a number and a group size. I will make the groups.
Name it:
  - {n} in groups of {b} is {a} full groups.
  - {k} are left over.
  - Then ask: what do the leftovers mean in the story?
Together:
  - Make the groups the story needs. Think about the leftovers.
  - The groups are drawn. What does the story ask for?
  - No picture now. Divide, then think about the leftovers.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The camel train is packing for a trip. Solve this story.
  - One more story for the camel train.
Reasons the pet gives when it is caught:
  remDrop: Oops. I forgot about the leftovers. The story needed them.
  remUp: Oops. I made a group for the leftovers. They are not a full one.
Tonight's question: Ask {name}: "26 kids, 4 in each car. How many cars?"
About 3.4 minutes.
```

## 12. Divide by 2-Digit (dbig4)

```text
Idea: Guess how many fit, multiply back, then check what is left.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Pick a number to divide, and a divisor. I will work it out.
Name it:
  - {n} divided by {b} is {a}.
  - {k} are left over, less than {b}.
  - Guess, multiply back, then check what is left.
Together:
  - Try a number. Too much? Try fewer. Room left? Try more.
  - Use the table of tens to get close. Then finish.
  - Long division now. Same idea: guess, multiply back, check.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The lab is packing samples into crates. Divide this one.
  - One more crate count.
Reasons the pet gives when it is caught:
  remBig: Oops. My leftover was bigger than the divisor. Another one fits.
  slip: Oops. I was off by one. Multiply back to check.
Tonight's question: Ask {name}: "How many 24s fit in 500?"
About 3.4 minutes.
```

## 13. Mixed Numbers (fop4)

```text
Idea: Work the parts, then the wholes. Trade or break a whole when you need to.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - Make any mixed number with whole bars and parts.
Name it:
  - Whole bars: {a}. Parts: {b}.
  - Enough parts make a whole. Trade them.
  - Not enough parts? Break a whole into parts.
Together:
  - Build the answer with the bars. Trade or break a whole as you go.
  - Look at the bars. Work the parts first, then the wholes.
  - Symbols only now. Parts first, then wholes.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave crew is cutting crystal rods. Work this one out.
  - One more for the cave crew.
Reasons the pet gives when it is caught:
  mixSub: Oops. I took the small part from the big one. I should break a whole.
  addBot: Oops. I added the bottom numbers. The part size stays the same.
Tonight's question: Ask {name}: "What is 3 1/4 take away 1 3/4?"
About 3.4 minutes.
```

## 14. Coordinate Grid (coord1)

```text
Idea: An ordered pair is across first, then up, both from zero.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Move point A anywhere on the grid.
Name it:
  - Your point is {x} across and {y} up.
  - So its pair is {x} then {y}.
  - Across first, then up, both counted from zero.
Together:
  - Go across first, then up. Place the point.
  - Read across first, then up.
  - No grid now. Picture the moves.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave map needs its points named. Read this one.
  - One more point for the map.
Reasons the pet gives when it is caught:
  swapXY: Oops. I went up first. Across comes first.
  gridOff: Oops. I started counting at one. The corner is zero.
Tonight's question: Ask {name} to mark (3, 5) on squared paper.
About 3.3 minutes.
```

## 15. Unit Fraction Division (fop6)

```text
Idea: Dividing by a unit fraction counts how many of those pieces fit.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - Cut each bar into any number of equal parts.
Name it:
  - {n} bars cut into {b} parts each make {sum} pieces.
  - So {n} divided by one of those parts is {sum}.
  - Dividing by a unit fraction counts the pieces that fit.
Together:
  - Cut every bar into the parts the problem names. Count the pieces.
  - Count the pieces in the picture.
  - Symbols only now. Picture the pieces.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The crystal cutters need to know how many pieces they get. Solve this.
  - One more for the cutters.
Reasons the pet gives when it is caught:
  flipDiv: Oops. I divided the wrong way round. Count the pieces that fit.
  mulFrac: Oops. I multiplied. This problem divides.
  slip: Oops. I was off by one piece. Count again.
Tonight's question: Ask {name}: "How many quarter pizzas are in 3 pizzas?"
About 3.4 minutes.
```

## 16. Convert Both Ways (meas6)

```text
Idea: To a smaller unit, multiply. To a bigger unit, divide.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Pick how many feet. I will tell you the inches, and back again.
Name it:
  - {n} feet is {sum} inches.
  - Smaller units need more of them, so multiply.
  - Going back to feet, divide.
Together:
  - Use the table. It counts up one unit at a time.
  - Bigger or smaller unit? Then multiply or divide.
  - No help now. Which way is the unit going?
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The bridge builders measure rope in different units. Convert this.
  - One more for the bridge.
Reasons the pet gives when it is caught:
  convDir: Oops. I multiplied, but the new unit is bigger. I should divide.
  conv: Oops. I added. Changing units means multiplying or dividing.
Tonight's question: Ask {name}: "How many feet is 36 inches?"
About 3.4 minutes.
```

## 17. Line Plots (data4)

```text
Idea: Each dot is a length. To find a total, add the lengths, not the dots.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - Put dots on any marks of the line plot.
Name it:
  - You put {n} dots on the line plot.
  - Each dot stands for one length.
  - For a total, add the lengths, not the dots.
Together:
  - Put one dot on the line plot for each length.
  - Find the dots on that mark. Add their lengths.
  - No plot now. Add the lengths.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The garden crew measured their seedlings. Find this total.
  - One more total for the crew.
Reasons the pet gives when it is caught:
  dotsVal: Oops. I counted the dots. I should add their lengths.
  addBot: Oops. I added the bottom numbers. The part size stays the same.
Tonight's question: Ask {name} to measure 5 pencils to the nearest half inch.
About 3.4 minutes.
```

## 18. Two Rules (pat5)

```text
Idea: Find how each number of pattern B comes from its partner in A.

Remember:
  - Quick warm-up. A times fact first.
Explore:
  - Set any rule. See what it does to each number.
Name it:
  - Your rule turns {a} into {sum}.
  - A rule links each number to its partner.
  - Find the rule from A to B, then use it.
Together:
  - Look across each row. Set the rule from A to B.
  - Find the rule across, then use it on the new A.
  - No table now. Find how B is made from A.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave lights follow patterns. Find the missing number.
  - One more pattern for the lights.
Reasons the pet gives when it is caught:
  rowJump: Oops. I added the gap between the patterns. B is a number of times A.
  skip: Oops. I was one step off. I should check the rule again.
Tonight's question: Ask {name}: "Count by 3s and by 6s. How do the lists match?"
About 3.4 minutes.
```

## 19. Fraction Stories (story8)

```text
Idea: For a fraction of an amount, divide by the bottom, then multiply by the top.

Remember:
  - Quick warm-up. Name the shaded fraction.
Explore:
  - This bar is {n}, cut into equal parts. Shade any parts you like.
Name it:
  - {a} parts of {n} shaded are worth {sum}.
  - Each part is the same share of {n}.
  - Divide by the bottom, then multiply by the top.
Together:
  - Shade the fraction the story names on the bar.
  - The bar is drawn. Find one part, then the parts asked for.
  - No bar now. Divide by the bottom, then multiply by the top.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The cave team is sharing out supplies. Solve this story.
  - One more story for the team.
Reasons the pet gives when it is caught:
  unitOnly: Oops. I found only one part. The story asked for more parts.
  fracTop: Oops. I multiplied by the top but forgot to divide by the bottom.
Tonight's question: Ask {name}: "What is 3/4 of 24?"
About 3.5 minutes.
```

## 20. Vowel Teams 2 (pic6)

```text
Idea: Some letter teams make one new sound: oo, ou, ow.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - {a} and {b} both have {letter}.
  - Both letters make one sound together.
  - Some letter teams make one new sound.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The workshop needs its signs read. Read each one!
Reasons the pet gives when it is caught:
  mid: Oops. I read the team in the middle wrong.
  blend: Oops. I left out a letter at the start.
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name} for words with "ou" in them, like house.
About 3.3 minutes.
```

## 21. Build Vowel Teams 2 (build6)

```text
Idea: Both letters of a team go in the word.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - {a} and {b} both have {letter}.
  - Both letters of the team go in.
  - Both letters of a team go in the word.
Together:
  - Look at this picture. Build the word with me.
  - Look at the picture. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The workshop needs labels. Build each word!
Reasons the pet gives when it is caught:
  mid: Oops. I read the team in the middle wrong.
  blend: Oops. I left out a letter at the start.
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name} to write "cloud" and point to the team.
About 3.3 minutes.
```
