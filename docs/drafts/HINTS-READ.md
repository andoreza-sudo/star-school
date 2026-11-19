# Hint read-through: a hint for each common mistake in Practice (HINT-01)

117 hints (117 unreviewed), one per mistake.
When a child's wrong answer is the answer that mistake gives, the round shows its hint
where it shows "Try again" and the generic hint today. The app fills each {slot}
from the question (its numbers, the child's own answer, a word or letter), so the numbers are always right.

Below, by subject and skill: an example question (as the app says it), the wrong answer,
and the hint as the child sees it. A hint shows in every skill listed with its code.

Until you approve a hint, its mistake shows the generic hint, as before.
To change a hint: edit "line" in docs/drafts/hints/<code>.md. When you are happy, say so, or run:

`node tools/author.js --hints-approve <code ...|all> --by <your name>`

Hints show only after the first wrong try, never on a two-choice question (one try there),
never in a check-in, and not when Grown-ups has lessons off.

## Math

### Count Things (pk_count)

- **off1** (level 1): "How many balloons?" Answer given: 4
  Hint: "Touch each one as you count. Count each one just once."
- **ten** (level 3): "How many balloons?" Answer given: 9
  Hint: "A full frame is ten. Count the ten first, then the rest."

### Hear a Number (pk_num)

- **look** (level 2): "Tap the number one." Answer given: 7
  Hint: "7 looks a lot like it. Look closely at its shape."
- **swap** (level 3): "Tap the number eighteen." Answer given: 81
  Hint: "Look at 81. Which digit is the tens?"
- **teen** (level 3): "Tap the number eighteen." Answer given: 80
  Hint: "Listen again. A teen number is one ten and some ones."

### Sort and Compare (sort)

- **size** (level 2): "Tap the shortest tower." Answer given: 1
  Hint: "Is the question asking for the big end or the small end?"

### Patterns (pat)

- **seqdir** (level 3): "46, 37, 28, 19, what comes next?" Answer given: 28
  Hint: "Do the numbers go up or down? Keep going the same way."
- **seqone** (level 3): "46, 37, 28, 19, what comes next?" Answer given: 18
  Hint: "Each jump here is 9, not one. Look at the pattern."

### Ten Frames (tenf)

- **off1** (level 1): "How many counters?" Answer given: 7
  Hint: "Touch each one as you count. Count each one just once."
- **swap** (level 3): "How many in all?" Answer given: 41
  Hint: "Look at 41. Which digit is the tens?"
- **given** (level 2): "How many more to make ten?" Answer given: 8
  Hint: "8 is in the problem already. Find the missing number."
- **on1** (level 3): "How many in all?" Answer given: 13
  Hint: "So close. Count again from 10, one step for each of 4."
- **tot** (level 2): "How many more to make ten?" Answer given: 18
  Hint: "10 is the total. What goes with 8 to make it?"

### Adding (add)

- **swap** (level 2): "10 plus 8 equals what?" Answer given: 81
  Hint: "Look at 81. Which digit is the tens?"
- **op** (level 4): "2 plus 1. Tap the frame to put in 2, then 1 more." Answer given: 1
  Hint: "Look at the sign. It says add."
- **given** (level 4): "2 plus 1. Tap the frame to put in 2, then 1 more." Answer given: 2
  Hint: "2 is in the problem already. Find the missing number."
- **on1** (level 4): "2 plus 1. Tap the frame to put in 2, then 1 more." Answer given: 4
  Hint: "So close. Count again from 2, one step for each of 1."
- **pvcat** (level 2): "10 plus 8 equals what?" Answer given: 108
  Hint: "The parts share places. Each digit takes the place of a zero."

### Count By (cnt)

- **seqdir** (level 4): "Count on. 14, 15, 16, what, 18" Answer given: 15
  Hint: "Do the numbers go up or down? Keep going the same way."
- **seqone** (level 1): "Count by 10s. 40, 50, 60, what, 80" Answer given: 61
  Hint: "Each jump here is 10, not one. Look at the pattern."

### Measuring (meas)

- **off1** (level 2): "How many cubes long is the paper strip?" Answer given: 9
  Hint: "Touch each one as you count. Count each one just once."
- **size** (level 1): "Tap the tallest tower." Answer given: 0
  Hint: "Is the question asking for the big end or the small end?"
- **ticks** (level 3): "How long is the paper strip? Say how many centimeters." Answer given: 12
  Hint: "Count the jumps between the marks, not the marks."
- **rend** (level 3): "How long is the paper strip? Say how many inches." Answer given: 12
  Hint: "It does not start at zero. Count the spaces from its start."
- **conv** (level 5): "17 minutes is how many seconds?" Answer given: 77
  Hint: "Smaller units need more of them. Multiply, do not add."
- **dpt** (level 6): "2 point 5 kilograms is how many grams?" Answer given: 25000
  Hint: "Count the digits after the points. Where does the point go?"

### Missing Number (miss)

- **given** (level 1): "8 plus what equals 9?" Answer given: 8
  Hint: "8 is in the problem already. Find the missing number."
- **tot** (level 1): "8 plus what equals 9?" Answer given: 17
  Hint: "9 is the total. What goes with 8 to make it?"

### Take Away (sub)

- **swap** (level 3): "22 minus 10 equals what?" Answer given: 21
  Hint: "Look at 21. Which digit is the tens?"
- **op** (level 1): "9 minus 8 equals what?" Answer given: 17
  Hint: "Look at the sign. It says take away."
- **given** (level 1): "9 minus 8 equals what?" Answer given: 9
  Hint: "9 is in the problem already. Find the missing number."
- **on1** (level 1): "9 minus 8 equals what?" Answer given: 0
  Hint: "So close. Count again from 9, one step for each of 8."
- **col** (level 1): "10 minus 7 equals what?" Answer given: 17
  Hint: "In the ones, 0 take away 7 needs a trade first."
- **keep** (level 1): "10 minus 7 equals what?" Answer given: 13
  Hint: "You traded from the tens. Now the tens have one less."

### Story Problems (story)

- **swap** (level 2): "Sparky has 4 pencils. Mia gives Sparky 8 more. How many pencils does Sparky have now?" Answer given: 21
  Hint: "Look at 21. Which digit is the tens?"
- **given** (level 1): "Ben had 3 crayons. Ben gave 1 to Mia. How many crayons are left?" Answer given: 3
  Hint: "3 is in the problem already. Find the missing number."
- **on1** (level 1): "Mia found 7 ducks in the yard and 1 more by the door. How many ducks in all?" Answer given: 9
  Hint: "So close. Count again from 7, one step for each of 1."
- **tot** (level 2): "Leo has 7 fish. Mia gives Leo some more. Now Leo has 11 fish. How many fish did Mia give Leo?" Answer given: 18
  Hint: "11 is the total. What goes with 7 to make it?"
- **col** (level 1): "Leo had 10 cookies. Leo gave 9 to Mia. How many cookies are left?" Answer given: 19
  Hint: "In the ones, 0 take away 9 needs a trade first."
- **keep** (level 1): "Leo had 10 cookies. Leo gave 9 to Mia. How many cookies are left?" Answer given: 11
  Hint: "You traded from the tens. Now the tens have one less."
- **opst** (level 1): "Ben had 3 crayons. Ben gave 1 to Mia. How many crayons are left?" Answer given: 4
  Hint: "Read it again. Are things joining, or going away?"
- **pvcat** (level 3): "Mia has 10 balls. Sparky has 8 more than Mia. How many balls does Sparky have?" Answer given: 108
  Hint: "The parts share places. Each digit takes the place of a zero."
- **cat** (level 3): "Ava has 12 ducks. Mia gives Ava 8 more. How many ducks does Ava have now?" Answer given: 110
  Hint: "2 + 8 = 10. Only one digit fits in the ones."
- **nocarry** (level 3): "Ava has 12 ducks. Mia gives Ava 8 more. How many ducks does Ava have now?" Answer given: 10
  Hint: "2 + 8 = 10. Carry one to the next place."
- **mulAdd** (level 5): "7 friends each get 10 ducks. How many ducks do they have all together?" Answer given: 17
  Hint: "7 × 10 means 7 groups of 10, not 7 + 10."
- **zeros** (level 5): "7 friends each get 10 ducks. How many ducks do they have all together?" Answer given: 700
  Hint: "Count the zeros in the problem, then in 700."
- **fact** (level 5): "7 friends each get 10 ducks. How many ducks do they have all together?" Answer given: 63
  Hint: "Check: is 63 really 7 groups of 10? Count on once more."
- **step1** (level 4): "Ben has 15 crayons. Mia has 11 fewer than Ben. How many crayons do they have together?" Answer given: 4
  Hint: "That is the first step. Now finish the second step."
- **dfact** (level 5): "Ben puts 10 crayons into bags, 2 in each bag. How many bags is that?" Answer given: 4
  Hint: "Multiply back to check. Does 4 × 2 make 10?"
- **remLeft** (level 7): "64 cookies are shared equally among 7 friends. How many cookies are left over?" Answer given: 9
  Hint: "That is how many groups. The question asks what is left over."
- **remUp** (level 7): "Sparky has 8 boxes with 7 pencils in each box. Sparky puts them in bags of 5. How many bags are needed for all of them?" Answer given: 11
  Hint: "The ones left over need one more too."

### Big Numbers (big)

- **swap** (level 2): "11 plus 32 equals what?" Answer given: 34
  Hint: "Look at 34. Which digit is the tens?"
- **op** (level 1): "700 plus 200 equals what?" Answer given: 500
  Hint: "Look at the sign. It says add."
- **given** (level 1): "20 plus 10 equals what?" Answer given: 20
  Hint: "20 is in the problem already. Find the missing number."
- **on1** (level 1): "10 plus 10. Make the answer with blocks." Answer given: 19
  Hint: "So close. Count again from 10, one step for each of 10."
- **cat** (level 3): "13 plus 37 equals what?" Answer given: 410
  Hint: "3 + 7 = 10. Only one digit fits in the ones."
- **nocarry** (level 3): "13 plus 37 equals what?" Answer given: 40
  Hint: "3 + 7 = 10. Carry one to the next place."

### Compare (cmp)

- **small** (level 1): "Is 16 greater than, less than, or equal to 17?" Answer given: >
  Hint: "The open side faces the bigger number. Look again."

### Place Value (pv)

- **swap** (level 1): "80 plus 7 equals what?" Answer given: 78
  Hint: "Look at 78. Which digit is the tens?"
- **op** (level 1): "80 plus 7 equals what?" Answer given: 73
  Hint: "Look at the sign. It says add."
- **given** (level 1): "20 plus 8 equals what?" Answer given: 20
  Hint: "20 is in the problem already. Find the missing number."
- **on1** (level 1): "10 plus 7. Make the answer with blocks." Answer given: 16
  Hint: "So close. Count again from 10, one step for each of 7."
- **pvcat** (level 1): "80 plus 7 equals what?" Answer given: 807
  Hint: "The parts share places. Each digit takes the place of a zero."
- **small** (level 4): "Is 753684 greater than, less than, or equal to 867694?" Answer given: >
  Hint: "The open side faces the bigger number. Look again."
- **tensOnes** (level 1): "How many tens are in 74?" Answer given: 4
  Hint: "That is the ones digit. Look for the tens digit."
- **zeros** (level 6): "99 times 10 to the power 3 equals what?" Answer given: 990000
  Hint: "Count the zeros in the problem, then in 990000."
- **digit** (level 2): "What is the value of the 1 in 143?" Answer given: 1
  Hint: "The 1 is in the hundreds. What is it worth there?"
- **place** (level 2): "What is the value of the 1 in 143?" Answer given: 10
  Hint: "Count the places again. The 1 is in the hundreds."
- **pvzero** (level 3): "300 plus 6 equals what?" Answer given: 36
  Hint: "Each place needs a digit. Put a zero in an empty place."
- **pway** (level 6): "65.7 times 10 equals what?" Answer given: 6.57
  Hint: "Multiplying by ten makes a number bigger. Dividing makes it smaller."
- **apow** (level 6): "10 to the power 5 equals what?" Answer given: 50
  Hint: "The small raised number says how many times to use the base."
- **dpt** (level 6): "65.7 times 10 equals what?" Answer given: 6570
  Hint: "Count the digits after the points. Where does the point go?"

### Picture Graphs (data)

- **diff** (level 1): "How many more apples than grapes?" Answer given: 14
  Hint: "How many more? Find the difference, not the total."
- **rmax** (level 5): "Pets at home: 9, 19, 5, 17, 1, 14, 19. What is the range?" Answer given: 19
  Hint: "The range is the biggest take away the smallest."
- **mean** (level 5): "Each dot is one of 5 friends. It shows the number of books read. What is the mean?" Answer given: 20
  Hint: "That is the total. Now share it equally among the numbers."

### Fractions (frac)

- **small** (level 4): "Is 1 fourth less than, equal to, or greater than 2 fourths?" Answer given: >
  Hint: "The open side faces the bigger number. Look again."
- **ticks** (level 3): "Put the pin on 5 sixths." Answer given: 5/7
  Hint: "Count the jumps between the marks, not the marks."
- **unshaded** (level 2): "Which picture shows 5 sixths?" Answer given: 1/6
  Hint: "The top number counts the shaded parts."
- **flip** (level 2): "The shape has 2 equal parts. What fraction is shaded?" Answer given: 2/1
  Hint: "The shaded parts go on top. All the parts go below."
- **fpart** (level 2): "The shape has 2 equal parts. What fraction is shaded?" Answer given: 1/1
  Hint: "The bottom number counts all the parts, shaded or not."
- **bigden** (level 4): "Is 5 eighths less than, equal to, or greater than 5 sixths?" Answer given: >
  Hint: "A bigger bottom number means smaller pieces. Compare the pieces."
- **addEq** (level 5): "1 half equals how many fourths?" Answer given: 3
  Hint: "Multiply the top and bottom by the same number. Do not add."
- **oneSide** (level 7): "Write 25 over 40 in simplest form." Answer given: 5/40
  Hint: "Divide both the top and bottom by the same number."
- **impAdd** (level 8): "1 and 8 ninths equals how many ninths?" Answer given: 18
  Hint: "Multiply the whole by the bottom, then add the top."
- **impTop** (level 8): "1 and 8 ninths equals how many ninths?" Answer given: 9
  Hint: "You multiplied. Now add the top number too."
- **mixTop** (level 8): "Write 26 over 5 as a whole number and a fraction." Answer given: 5 26/5
  Hint: "After taking out the wholes, only the leftover parts stay on top."
- **mixSwap** (level 8): "Write 37 over 10 as a whole number and a fraction." Answer given: 7 3/10
  Hint: "How many wholes fit? That goes first. The leftover goes on top."

### Clocks (time)

- **hands** (level 1): "Show 10 o'clock on the clock." Answer given: 12:50
  Hint: "The short hand shows the hour. The long hand shows minutes."
- **hnext** (level 2): "What time does the clock show?" Answer given: 11:30
  Hint: "The short hand has not reached 11 yet. Look again."
- **minute** (level 4): "Show half past 10 on the clock." Answer given: 10:25
  Hint: "Count by fives to the last number, then count on."
- **el100** (level 6): "The time starts at 7 20 and ends at 8 15. How many minutes passed?" Answer given: 95
  Hint: "An hour has 60 minutes, not a hundred. Count to the next hour first."

### Coins (coins)

- **swap** (level 5): "An apple costs 15 cents. You pay 1 dollar. How many cents do you get back? Put the change in the purse." Answer given: 58
  Hint: "Look at 58. Which digit is the tens?"
- **col** (level 5): "A pencil costs 3 dollars and 50 cents. You pay 5 dollars. How many cents do you get back?" Answer given: 250
  Hint: "In the tens, 0 take away 5 needs a trade first."
- **keep** (level 5): "An apple costs 15 cents. You pay 1 dollar. How many cents do you get back? Put the change in the purse." Answer given: 195
  Hint: "You traded from the tens. Now the tens have one less."
- **opst** (level 5): "A pencil costs 3 dollars and 50 cents. You pay 5 dollars. How many cents do you get back?" Answer given: 850
  Hint: "Read it again. Are things joining, or going away?"
- **count** (level 1): "How many cents?" Answer given: 3
  Hint: "You counted 3 coins. Add what each coin is worth."
- **nickel** (level 1): "How many cents?" Answer given: 21
  Hint: "A dime is small, but it is worth more than a nickel."

### Equal Groups (mult)

- **mulAdd** (level 1): "4 groups of 10. How many in all?" Answer given: 14
  Hint: "4 × 10 means 4 groups of 10, not 4 + 10."
- **zeros** (level 1): "4 groups of 10. How many in all?" Answer given: 400
  Hint: "Count the zeros in the problem, then in 400."
- **fact** (level 1): "4 groups of 10. How many in all?" Answer given: 36
  Hint: "Check: is 36 really 4 groups of 10? Count on once more."

### Arrays (arr)

- **mulAdd** (level 1): "5 rows of 5. How many in all?" Answer given: 10
  Hint: "5 × 5 means 5 groups of 5, not 5 + 5."
- **fact** (level 1): "5 rows of 5. How many in all?" Answer given: 20
  Hint: "Check: is 20 really 5 groups of 5? Count on once more."

### Times Facts (mfact)

- **given** (level 4): "4 times what equals 8?" Answer given: 4
  Hint: "4 is in the problem already. Find the missing number."
- **mulAdd** (level 1): "10 times 7 equals what?" Answer given: 17
  Hint: "10 × 7 means 10 groups of 7, not 10 + 7."
- **zeros** (level 1): "10 times 7 equals what?" Answer given: 700
  Hint: "Count the zeros in the problem, then in 700."
- **fact** (level 1): "10 times 7 equals what?" Answer given: 60
  Hint: "Check: is 60 really 10 groups of 7? Count on once more."
- **pway** (level 1): "10 times 10 equals what?" Answer given: 1
  Hint: "Multiplying by ten makes a number bigger. Dividing makes it smaller."
- **dfact** (level 4): "4 times what equals 8?" Answer given: 1
  Hint: "Multiply back to check. Does 1 × 4 make 8?"
- **part** (level 5): "11 times 12 equals what?" Answer given: 33
  Hint: "Multiplying by the tens digit? Write a zero in the ones first."
- **mcarry** (level 5): "12 times 8 equals what?" Answer given: 86
  Hint: "2 × 8 = 16. Add what you carry to the next place."

### Dividing Facts (dfact)

- **given** (level 4): "what divided by 3 equals 3?" Answer given: 3
  Hint: "3 is in the problem already. Find the missing number."
- **zeros** (level 1): "90 divided by 10 equals what?" Answer given: 90
  Hint: "Count the zeros in the problem, then in 90."
- **pway** (level 1): "90 divided by 10 equals what?" Answer given: 900
  Hint: "Multiplying by ten makes a number bigger. Dividing makes it smaller."
- **dfact** (level 1): "12 divided by 2 equals what?" Answer given: 5
  Hint: "Multiply back to check. Does 5 × 2 make 12?"
- **divMul** (level 1): "12 divided by 2 equals what?" Answer given: 24
  Hint: "Look at the sign. We share, we do not multiply."

### Times Tens (mbig)

- **mulAdd** (level 1): "800 times 8 equals what?" Answer given: 808
  Hint: "800 × 8 means 800 groups of 8, not 800 + 8."
- **zeros** (level 1): "5 times 100 equals what?" Answer given: 5000
  Hint: "Count the zeros in the problem, then in 5000."
- **fact** (level 1): "10 times 9 equals what?" Answer given: 80
  Hint: "Check: is 80 really 10 groups of 9? Count on once more."
- **part** (level 4): "81 times 84 equals what?" Answer given: 972
  Hint: "Multiplying by the tens digit? Write a zero in the ones first."
- **mcarry** (level 2): "27 times 4 equals what?" Answer given: 88
  Hint: "7 × 4 = 28. Add what you carry to the next place."

### Rounding (round)

- **trunc** (level 1): "Round 845 to the nearest 10." Answer given: 840
  Hint: "The next digit is 5. That is enough to round up."
- **rplace** (level 1): "Round 845 to the nearest 10." Answer given: 800
  Hint: "We round to the tens here. Find that place first."
- **rup** (level 1): "Round 34 to the nearest 10. The dot shows 34. Slide the pin to the rounded number." Answer given: 40
  Hint: "The next digit is 4. That is not enough to round up."

### Perimeter and Area (geo)

- **area** (level 1): "A rectangle is 3 centimeters long and 7 centimeters wide. What is the perimeter?" Answer given: 21
  Hint: "Perimeter goes all the way around. Add every side."
- **half** (level 1): "A rectangle is 3 centimeters long and 7 centimeters wide. What is the perimeter?" Answer given: 10
  Hint: "Each side length is there twice. Add every side."
- **perim** (level 2): "Shade a rectangle 4 squares long and 2 squares wide. Its area is the squares you shade." Answer given: 6
  Hint: "Area counts the squares inside, not the sides around."
- **sideP** (level 3): "A rectangle has a perimeter of 26 inches. One side is 7 inches. How long is the other side?" Answer given: 19
  Hint: "Half the perimeter is one long side and one short side."
- **layer** (level 4): "The box is made of small cubes, all the same size. Count the cubes in one layer, then count the layers. How many cubes in all?" Answer given: 4
  Hint: "Count the cubes in one layer, then times the number of layers."
- **thalf** (level 5): "A triangle has a base of 4 meters and a height of 6 meters. What is its area in square meters?" Answer given: 24
  Hint: "A triangle is half a rectangle. Halve base times height."

### Long Division (dbig)

- **dfact** (level 1): "80 divided by 5 equals what?" Answer given: 15
  Hint: "Multiply back to check. Does 15 × 5 make 80?"
- **divMul** (level 1): "80 divided by 5 equals what?" Answer given: 400
  Hint: "Look at the sign. We share, we do not multiply."
- **remBig** (level 2): "70 divided by 8. How many whole groups, and what is left over?" Answer given: 7R14
  Hint: "The leftover must be smaller than 8. Can one more group fit?"
- **zero0** (level 3): "8124 divided by 4 equals what?" Answer given: 231
  Hint: "When a place has nothing to share, write a zero there."

### Factors & Primes (fact)

- **oddPrime** (level 2): "Which number is prime?" Answer given: 35
  Hint: "35 is odd, but it has other factors. Look again."
- **lcmx** (level 3): "What is the least common multiple of 2 and 12?" Answer given: 24
  Hint: "That is a common multiple. Is there a smaller one?"

### Fraction Math (fop)

- **addBot** (level 1): "1 fourth plus 2 fourths. Write the answer as a fraction." Answer given: 3/8
  Hint: "Same-size parts: the bottom number stays the same."
- **mulBot** (level 2): "8 times 8 ninths. Write the answer as a fraction." Answer given: 64/72
  Hint: "A whole number times parts: multiply the top only."
- **addUnl** (level 3): "3 fourths plus 7 tenths. Write the answer as a fraction." Answer given: 10/14
  Hint: "Make the bottom numbers the same first. Then work with the tops."
- **topOnly** (level 5): "1 third times 1 half. The picture shows the rows and the columns. Write the answer as a fraction." Answer given: 1/3
  Hint: "Multiply the tops, and multiply the bottoms too."
- **fdivx** (level 6): "1 third divided by 2. The first part of the bar is cut into 2 small pieces. Write the answer as a fraction." Answer given: 2/3
  Hint: "Dividing? Flip what you divide by, then multiply."

### Decimals (dec)

- **op** (level 3): "42.11 minus 31 equals what?" Answer given: 73.11
  Hint: "Look at the sign. It says take away."
- **small** (level 2): "Is 0 point 9 less than, equal to, or greater than 0 point 9 6?" Answer given: >
  Hint: "The open side faces the bigger number. Look again."
- **divMul** (level 5): "43 divided by 5 equals what?" Answer given: 215
  Hint: "Look at the sign. We share, we do not multiply."
- **dzero** (level 1): "Put the pin on 0 point 8 8." Answer given: 8.8
  Hint: "The first place after the point is tenths. The next is hundredths."
- **longer** (level 2): "Is 0 point 3 2 1 less than, equal to, or greater than 0 point 9 2?" Answer given: >
  Hint: "More digits does not mean bigger. Compare the tenths first."
- **point** (level 3): "42.11 minus 31 equals what?" Answer given: 41.8
  Hint: "Line up the points of 42.11 and 31, not the last digits."
- **dpt** (level 4): "2.4 times 4 equals what?" Answer given: 96
  Hint: "Count the digits after the points. Where does the point go?"

### Angles (ang)

- **a180** (level 2): "Angle A is 25°. Angles A and B together make a right angle (90°). How big is angle B?" Answer given: 155
  Hint: "A right angle is 90 degrees, not a straight line."

### Order of Operations (ooo)

- **apow** (level 2): "9 times 2 cubed equals what?" Answer given: 54
  Hint: "The small raised number says how many times to use the base."
- **order** (level 1): "5 plus 4 times open parenthesis 12 minus 2 close parenthesis equals what?" Answer given: 90
  Hint: "Times and divide come before plus and minus."
- **ocat** (level 3): "p equals 6. What is 8 p plus 9?" Answer given: 95
  Hint: "A number next to p means times p."

### Coordinates (coord)

- **xyswap** (level 1): "Tap the point 2, 1. Go 2 across, then 1 up." Answer given: 1,2
  Hint: "Go across first, then up. The first number is across."

### Ratios and Rates (ratio)

- **radd** (level 1): "8 pens to 1 pencil. Make an equal ratio. What number goes with 40 pens?" Answer given: 33
  Hint: "Ratios grow by multiplying, not by adding the same amount."
- **rflip** (level 1): "Look at the dots. What is the ratio of orange to blue dots? Say the first one, then the second one." Answer given: 1:3
  Hint: "Keep the order the question asks for: the first thing named goes first."

### Integers (int)

- **given** (level 2): "The dot is negative 4. Put the pin on its opposite: the same distance from 0, on the other side." Answer given: -4
  Hint: "-4 is in the problem already. Find the missing number."
- **small** (level 1): "Is 3 less than, equal to, or greater than negative 2?" Answer given: <
  Hint: "The open side faces the bigger number. Look again."
- **ineg** (level 1): "Is 1 less than, equal to, or greater than negative 2?" Answer given: <
  Hint: "Below zero, the number farther from zero is smaller."
- **idist** (level 2): "How many steps apart are negative 8 and 5 on the number line?" Answer given: 3
  Hint: "One number is below zero. Count to zero, then past it."
- **isign** (level 3): "12 minus 13. What is the answer?" Answer given: 1
  Hint: "The size is right. Check the sign: plus or minus?"
- **dneg** (level 3): "negative 7 minus negative 11. What is the answer?" Answer given: -18
  Hint: "Taking away a negative is the same as adding."

### Equations (alg)

- **aop** (level 1): "Solve the equation. x plus 8 equals 39. What is x?" Answer given: 47
  Hint: "To find the letter, undo the plus: do the opposite."

## Reading

### ABC Letters (abc)

- **look** (level 1): "Find the big letter P." Answer given: R
  Hint: "R looks a lot like it. Look closely at its shape."
- **abc** (level 4): "What letter comes after q?" Answer given: p
  Hint: "That letter comes before. Which letter comes after?"

### Syllable Claps (syl)

- **clap** (level 1): "bicycle. How many claps in bicycle?" Answer given: 2
  Hint: "Clap once for each part you say. Try it slowly."

### Letter Sounds (sound)

- **first** (level 1): "fish. What sound does fish start with?" Answer given: h
  Hint: "Listen to the very first sound again. Say it slowly."
- **mid** (level 3): "box. Which vowel is in the middle of box?" Answer given: a
  Hint: "Say it slowly. Listen to the middle sound."
- **last** (level 2): "leg. What sound does leg end with?" Answer given: l
  Hint: "Say it slowly. Listen to the very end."
- **shch** (level 4): "cheese. Which letters start cheese?" Answer given: sh
  Hint: "Listen closely: is it sh, or ch?"

### Sight Words (sight)

- **wstart** (level 1): "the" Answer given: to
  Hint: "Read all the way to the end of each word."

### Rhyme Time (rhyme)

- **rfirst** (level 1): "Which one rhymes with spoon: moon, frog or shell?" Answer given: shell
  Hint: "Shell starts like spoon. Rhymes end the same."

### Picture Words (pic)

- **first** (level 1): "Which word is this?" Answer given: nap
  Hint: "Listen to the very first sound again. Say it slowly."
- **mid** (level 1): "Which word is this?" Answer given: pan
  Hint: "Say it slowly. Listen to the middle sound."
- **last** (level 1): "Which word is this?" Answer given: pig
  Hint: "Say it slowly. Listen to the very end."
- **blend** (level 2): "Which word is this?" Answer given: led
  Hint: "Say each sound slowly. Did you hear every letter?"
- **rvow** (level 2): "Which word is this?" Answer given: stir
  Hint: "Look at the vowel before the r. Which one is it?"
- **shch** (level 2): "Which word is this?" Answer given: chip
  Hint: "Listen closely: is it sh, or ch?"
- **dig** (level 2): "Which word is this?" Answer given: sell
  Hint: "Some letters go together to make one sound. Look again."
- **silent** (level 3): "Which word is this?" Answer given: fir
  Hint: "The e at the end changes the vowel sound."
- **team** (level 4): "Which word is this?" Answer given: got
  Hint: "Vowels side by side make one sound. Look at the vowels."

### Build a Word (build)

- **first** (level 1): "pin" Answer given: kin
  Hint: "Listen to the very first sound again. Say it slowly."
- **mid** (level 1): "pin" Answer given: pen
  Hint: "Say it slowly. Listen to the middle sound."
- **last** (level 1): "pin" Answer given: pik
  Hint: "Say it slowly. Listen to the very end."
- **lswap** (level 1): "pin" Answer given: ipn
  Hint: "Check the order of the letters in ipn."
- **blend** (level 1): "ant" Answer given: an
  Hint: "Say each sound slowly. Did you hear every letter?"
- **dbl** (level 1): "egg" Answer given: eg
  Hint: "This word has a double letter. Look again."
- **rvow** (level 2): "star" Answer given: stor
  Hint: "Look at the vowel before the r. Which one is it?"
- **shch** (level 2): "chick" Answer given: shick
  Hint: "Listen closely: is it sh, or ch?"
- **dig** (level 2): "fish" Answer given: fis
  Hint: "Some letters go together to make one sound. Look again."
- **silent** (level 3): "rice" Answer given: ric
  Hint: "The e at the end changes the vowel sound."
- **team** (level 4): "pie" Answer given: pi
  Hint: "Vowels side by side make one sound. Look at the vowels."

### Read & Match (sent)

- **wstart** (level 1): "Read it, then tap the picture that matches: sun, sled or star." Answer given: sled
  Hint: "Read all the way to the end of each word."

### Spelling (spell)

- **first** (level 1): "wet. The dog got wet in the rain. wet." Answer given: bet
  Hint: "Listen to the very first sound again. Say it slowly."
- **mid** (level 1): "wet. The dog got wet in the rain. wet." Answer given: wat
  Hint: "Say it slowly. Listen to the middle sound."
- **last** (level 1): "wet. The dog got wet in the rain. wet." Answer given: wew
  Hint: "Say it slowly. Listen to the very end."
- **lswap** (level 1): "wet. The dog got wet in the rain. wet." Answer given: ewt
  Hint: "Check the order of the letters in ewt."
- **blend** (level 2): "brush. Brush your teeth twice a day. brush." Answer given: rush
  Hint: "Say each sound slowly. Did you hear every letter?"
- **dbl** (level 1): "egg. She cracked the egg into a bowl. egg." Answer given: eg
  Hint: "This word has a double letter. Look again."
- **rvow** (level 4): "corn. We ate corn at dinner. corn." Answer given: carn
  Hint: "Look at the vowel before the r. Which one is it?"
- **shch** (level 2): "brush. Brush your teeth twice a day. brush." Answer given: bruch
  Hint: "Listen closely: is it sh, or ch?"
- **dig** (level 2): "brush. Brush your teeth twice a day. brush." Answer given: brus
  Hint: "Some letters go together to make one sound. Look again."
- **homo** (level 1): "red. My kite is red. red." Answer given: read
  Hint: "Read sounds right, but it means something else. Look again."
- **silent** (level 3): "five. I have five fingers on my hand. five." Answer given: fiv
  Hint: "The e at the end changes the vowel sound."
- **team** (level 3): "cheese. I like cheese on my pizza. cheese." Answer given: chese
  Hint: "Vowels side by side make one sound. Look at the vowels."
- **ed** (level 3): "helped. She helped me carry the bags. helped." Answer given: helpt
  Hint: "It sounds like t or d, but the ending is spelled ed."

### Vocabulary (vocab)

- **homo** (level 6): "We walked on the sand in our blank feet." Answer given: bear
  Hint: "Bear sounds right, but it means something else. Look again."

### Grammar (gram)

- **homo** (level 5): "Which is the short way to write "you are"?" Answer given: your
  Hint: "Your sounds right, but it means something else. Look again."
- **plS** (level 3): "One knife, two blank." Answer given: knifes
  Hint: "Knife changes to a new word for more than one."
- **pl2** (level 3): "One tooth, two blank." Answer given: teeths
  Hint: "That word already means more than one. No s is needed."
- **ples** (level 3): "One book, two blank." Answer given: bookes
  Hint: "Only words ending in s, x, sh or ch add es."
- **plone** (level 3): "One book, two blank." Answer given: book
  Hint: "This word needs to show more than one."
- **ply** (level 3): "One box, two blank." Answer given: boxies
  Hint: "Look at the last letter. Ending in y? Change it to ies."

## Spanish

### House (es_house)

- **tilde** (level 3): "el jardín" Answer given: jardin
  Hint: "Jardin needs a mark over one letter."

### School (es_school)

- **tilde** (level 3): "el lápiz" Answer given: lapiz
  Hint: "Lapiz needs a mark over one letter."

### El, La, Un, Una (es_art)

- **esgen** (level 2): "More than one rocket! How do you say the rockets?" Answer given: las cohetes
  Hint: "Check the little word: las does not go with this word."
- **esnum** (level 2): "More than one rocket! How do you say the rockets?" Answer given: los cohete
  Hint: "Los and las mean more than one. Add s or es too."

### Ser, Estar, Tener (es_ser)

- **esper** (level 1): "My sister is very nice." Answer given: soy
  Hint: "Soy goes with yo. Who is the sentence about?"

### Me Gusta (es_gusta)

- **esno** (level 1): "No me gusta el pan." Answer given: pan+
  Hint: "Look for the word no. It changes the meaning."

## The lines with their slots

Each line as written, with the {slots} the app fills, and what the child did.

- **off1** (counts one too many or one too few (a thing counted twice, or one missed)): "Touch each one as you count. Count each one just once."
- **look** (picks a letter or number that looks alike (b for d, M for W, 6 for 9)): "{l} looks a lot like it. Look closely at its shape."
- **size** (picks the smallest when asked for the biggest (or the other way round)): "Is the question asking for the big end or the small end?"
- **ten** (forgets the full ten frame (or counts it as one)): "A full frame is ten. Count the ten first, then the rest."
- **swap** (writes the tens and ones the wrong way round (14 as 41)): "Look at {v}. Which digit is the tens?"
- **teen** (hears a teen number as a tens number (seventeen as seventy)): "Listen again. A teen number is one ten and some ones."
- **op** (adds instead of taking away, or takes away instead of adding): "Look at the sign. It says {sign}."
- **given** (answers with a number that is already in the problem): "{v} is in the problem already. Find the missing number."
- **on1** (one too many or one too few when counting on or back): "So close. Count again from {a}, one step for each of {b}."
- **tot** (adds the two numbers it sees when a part is missing): "{b} is the total. What goes with {a} to make it?"
- **seqdir** (counts the wrong way (on instead of back, or back instead of on)): "Do the numbers go up or down? Keep going the same way."
- **seqone** (counts on by one instead of by the pattern's step): "Each jump here is {n}, not one. Look at the pattern."
- **col** (takes the smaller digit from the bigger one in each column): "In the {place}, {x} take away {y} needs a trade first."
- **keep** (trades a ten for the ones but does not take it from the tens): "You traded from the {place}. Now the {place} have one less."
- **opst** (adds when the story takes away, or takes away when it adds): "Read it again. Are things joining, or going away?"
- **pvcat** (writes the parts side by side (70 + 2 as 702)): "The parts share places. Each digit takes the place of a zero."
- **small** (turns the sign round (picks the smaller one as bigger)): "The open side faces the bigger number. Look again."
- **tensOnes** (gives the ones digit when asked how many tens): "That is the ones digit. Look for the tens digit."
- **diff** (adds the two amounts when the question asks how many more): "How many more? Find the difference, not the total."
- **hands** (reads the long hand as the hour and the short hand as the minutes): "The short hand shows the hour. The long hand shows minutes."
- **count** (counts the coins instead of adding their values): "You counted {n} coins. Add what each coin is worth."
- **nickel** (mixes up a nickel and a dime (the bigger coin is worth less)): "A dime is small, but it is worth more than a nickel."
- **hnext** (reads the hour the short hand is moving towards, not the one it has passed): "The short hand has not reached {n} yet. Look again."
- **cat** (writes each column total side by side (27 + 15 as 312)): "{x} + {y} = {n}. Only one digit fits in the {place}."
- **nocarry** (adds each column and drops the extra ten (forgot to carry)): "{x} + {y} = {n}. Carry one to the next place."
- **mulAdd** (adds the numbers instead of multiplying them): "{a} × {b} means {a} groups of {b}, not {a} + {b}."
- **zeros** (writes one zero too many or too few): "Count the zeros in the problem, then in {v}."
- **fact** (gives a neighbouring times fact: one group too many or too few): "Check: is {v} really {a} groups of {b}? Count on once more."
- **digit** (gives the digit instead of what it is worth in its place): "The {d} is in the {place}. What is it worth there?"
- **place** (gives a digit the value of the place next to it): "Count the places again. The {d} is in the {place}."
- **pvzero** (leaves out the zero of an empty place (800 + 7 as 87)): "Each place needs a digit. Put a zero in an empty place."
- **minute** (counts the minute marks one five off (or one mark off)): "Count by fives to the last number, then count on."
- **ticks** (counts the tick marks instead of the jumps (spaces)): "Count the jumps between the marks, not the marks."
- **rend** (reads the number at the end of the thing, not how far it is from the start): "It does not start at zero. Count the spaces from its start."
- **step1** (stops after the first step of a two-step problem): "That is the first step. Now finish the second step."
- **pway** (moves the digits the wrong way (multiplies when it should divide by ten, or the other way)): "Multiplying by ten makes a number bigger. Dividing makes it smaller."
- **dfact** (gives a neighbouring fact when dividing (or finding a missing factor): one too many or too few): "Multiply back to check. Does {v} × {b} make {a}?"
- **divMul** (multiplies when it should divide): "Look at the sign. We share, we do not multiply."
- **unshaded** (names the parts that are not shaded): "The top number counts the shaded parts."
- **flip** (writes the fraction upside down): "The shaded parts go on top. All the parts go below."
- **fpart** (writes shaded parts over unshaded parts, not over all the parts): "The bottom number counts all the parts, shaded or not."
- **trunc** (always rounds down: drops the digits after the place): "The next digit is {d}. That is enough to round up."
- **rplace** (rounds to the wrong place (to the hundreds when asked for tens)): "We round to the {place} here. Find that place first."
- **rup** (rounds up when the next digit is below five): "The next digit is {d}. That is not enough to round up."
- **area** (multiplies the sides (finds the area, not the perimeter)): "Perimeter goes all the way around. Add every side."
- **half** (adds only two of the four sides): "Each side length is there twice. Add every side."
- **bigden** (thinks a bigger bottom number means a bigger fraction): "A bigger bottom number means smaller pieces. Compare the pieces."
- **perim** (adds the sides instead of counting the squares inside): "Area counts the squares inside, not the sides around."
- **addEq** (adds the same number to the top and the bottom of a fraction): "Multiply the top and bottom by the same number. Do not add."
- **el100** (works with time as if an hour had a hundred minutes): "An hour has {n} minutes, not a hundred. Count to the next hour first."
- **part** (leaves out the zero when multiplying by the tens digit (forgets it is tens)): "Multiplying by the tens digit? Write a zero in the ones first."
- **mcarry** (multiplies each place but forgets to add the ten it carried): "{x} × {b} = {n}. Add what you carry to the next place."
- **remBig** (leaves a remainder as big as the divisor, or bigger): "The leftover must be smaller than {b}. Can one more group fit?"
- **zero0** (drops a zero inside the answer (624 ÷ 6 as 14)): "When a place has nothing to share, write a zero there."
- **oddPrime** (thinks every odd number is prime): "{o} is odd, but it has other factors. Look again."
- **oneSide** (divides only the top, or only the bottom, to simplify): "Divide both the top and bottom by the same number."
- **addBot** (adds (or takes away) the bottom numbers too, when the bottoms are the same): "Same-size parts: the bottom number stays the same."
- **impAdd** (adds the whole, the top and the bottom instead of multiplying): "Multiply the whole by the bottom, then add the top."
- **impTop** (multiplies the whole by the bottom and forgets to add the top): "You multiplied. Now add the top number too."
- **mixTop** (keeps all the parts on top after taking out the wholes): "After taking out the wholes, only the leftover parts stay on top."
- **mixSwap** (swaps the wholes and the parts left over): "How many wholes fit? That goes first. The leftover goes on top."
- **mulBot** (multiplies the bottom number too (3 × 2/5 as 6/15)): "A whole number times parts: multiply the top only."
- **dzero** (mixes up tenths and hundredths): "The first place after the point is tenths. The next is hundredths."
- **longer** (thinks a decimal with more digits is bigger): "More digits does not mean bigger. Compare the tenths first."
- **a180** (takes the angle from the wrong total (180 for a right angle)): "A right angle is {n} degrees, not a straight line."
- **sideP** (takes one side from the whole perimeter (forgets to halve it)): "Half the perimeter is one long side and one short side."
- **conv** (adds instead of multiplying when changing to a smaller unit): "Smaller units need more of them. Multiply, do not add."
- **remLeft** (gives how many groups when the question asks what is left over): "That is how many groups. The question asks what is left over."
- **remUp** (forgets that the leftover still needs one more (a bus, a box)): "The ones left over need one more too."
- **point** (lines up the last digits instead of the decimal points): "Line up the points of {a} and {b}, not the last digits."
- **apow** (multiplies the base by the power (7^2 as 14)): "The small raised number says how many times to use the base."
- **dpt** (puts the decimal point one place off): "Count the digits after the points. Where does the point go?"
- **order** (works left to right, adding before multiplying): "Times and divide come before plus and minus."
- **addUnl** (adds (or takes away) the tops and the bottoms when the bottoms are different): "Make the bottom numbers the same first. Then work with the tops."
- **layer** (counts only one layer of the box): "Count the cubes in one layer, then times the number of layers."
- **topOnly** (multiplies the tops and keeps one bottom): "Multiply the tops, and multiply the bottoms too."
- **xyswap** (switches the x and y numbers of a point): "Go across first, then up. The first number is across."
- **fdivx** (multiplies when dividing by a fraction (forgets to flip it)): "Dividing? Flip what you divide by, then multiply."
- **radd** (adds the same amount instead of multiplying (ratio tables)): "Ratios grow by multiplying, not by adding the same amount."
- **rflip** (writes the ratio the other way round): "Keep the order the question asks for: the first thing named goes first."
- **ineg** (compares negative numbers by their size without the minus sign): "Below zero, the number farther from zero is smaller."
- **idist** (takes one number from the other without the minus sign (distance across zero)): "One number is below zero. Count to zero, then past it."
- **isign** (gets the size right but the sign wrong): "The size is right. Check the sign: plus or minus?"
- **dneg** (treats taking away a negative number as taking away): "Taking away a negative is the same as adding."
- **aop** (does the sign's operation again instead of undoing it (m + 33 = 98 gives 131)): "To find the letter, undo the {sign}: do the opposite."
- **ocat** (reads a number next to a letter as two digits (5n with n = 3 as 53)): "A number next to {x} means times {x}."
- **thalf** (forgets to halve for a triangle (base times height only)): "A triangle is half a rectangle. Halve base times height."
- **lcmx** (multiplies the two numbers (a common multiple, but not the least)): "That is a common multiple. Is there a smaller one?"
- **rmax** (gives the biggest number instead of the range): "The range is the biggest take away the smallest."
- **mean** (adds the numbers and forgets to share the total out): "That is the total. Now share it equally among the numbers."
- **clap** (claps one beat too many or too few): "Clap once for each part you say. Try it slowly."
- **abc** (picks the letter before instead of the letter after): "That letter comes before. Which letter comes after?"
- **first** (hears or reads the first sound wrong (sun as bun)): "Listen to the very first sound again. Say it slowly."
- **wstart** (picks a word that starts the same way without reading to the end): "Read all the way to the end of each word."
- **rfirst** (picks a word that starts like it instead of one that ends like it): "{o} starts like {w}. Rhymes end the same."
- **mid** (reads (or hears) the middle vowel wrong (cat as cut)): "Say it slowly. Listen to the middle sound."
- **last** (hears or reads the last sound wrong (cat as cap)): "Say it slowly. Listen to the very end."
- **lswap** (puts two letters in the wrong order (from as form)): "Check the order of the letters in {o}."
- **blend** (leaves out one letter of a blend (frog as fog)): "Say each sound slowly. Did you hear every letter?"
- **dbl** (writes one letter where the word has two the same (hill as hil)): "This word has a double letter. Look again."
- **rvow** (mixes up er, ir and ur (they sound the same)): "Look at the vowel before the r. Which one is it?"
- **shch** (mixes up ch and sh): "Listen closely: is it sh, or ch?"
- **dig** (reads two letters that make one sound as one letter (ship as sip)): "Some letters go together to make one sound. Look again."
- **homo** (picks a word that sounds the same but is spelt differently and means something else): "{o} sounds right, but it means something else. Look again."
- **silent** (leaves off the silent e at the end (kite as kit)): "The e at the end changes the vowel sound."
- **team** (reads a vowel team as one short vowel (boat as bat), or as another team): "Vowels side by side make one sound. Look at the vowels."
- **ed** (spells the -ed ending the way it sounds (jumped as jumpt)): "It sounds like t or d, but the ending is spelled ed."
- **plS** (adds s to a word that changes when there is more than one (mouses, shelfs)): "{w} changes to a new word for more than one."
- **pl2** (adds s to a word that is already more than one (mens, childrens)): "That word already means more than one. No s is needed."
- **ples** (gets the es rule wrong (brushs, or doges)): "Only words ending in s, x, sh or ch add es."
- **plone** (leaves the word as one (bed for beds)): "This word needs to show more than one."
- **ply** (gets the y to ies rule wrong (babys, or benchies)): "Look at the last letter. Ending in y? Change it to ies."
- **tilde** (leaves off the accent mark (or the ~ of ñ)): "{v} needs a mark over one letter."
- **esgen** (uses el or los with a la word (or la, las with an el word)): "Check the little word: {o} does not go with this word."
- **esnum** (keeps the word as one after los or las (los carro)): "Los and las mean more than one. Add s or es too."
- **esper** (uses the verb form of another person (soy for es)): "{o} goes with {w}. Who is the sentence about?"
- **esno** (misses the "no": picks the opposite of what the sentence says): "Look for the word no. It changes the meaning."

## Skills with no coded mistake

These skills keep the generic hint: their wrong answers do not come from a mistake the app can work out
(stories and facts to recall, word meanings, shapes by name, tracing, sorting by eye, pictures to match).

es_greet, es_color, es_num, es_teen, es_animal, es_food, es_body, es_family, es_mix, pk_more, shape, trace,
pos, comp, info, eo, es_phrase, es_sent, es_story, es_clothes, es_feel, es_days, es_months, es_weather, es_big,
es_time, es_place, es_trans, es_verb, es_adj

Discover (science, maps, citizens) has none either: its questions are facts to recall.
