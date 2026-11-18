/* Star School teach35 v179. BUILT by tools/build.py from 52h-teach35.css, 52h-words.js, 52i-bench35.js, 52j-lessons35.js: never edit by hand.
   index.html v179 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v179.js. */
(function(){var s=document.createElement('style');s.id='css-teach35';s.textContent="/* TEACH-3: the grade 3-5 lessons' workbench (52i-bench35.js): two fraction bars, the place-value chart, the area model, \"your problem\",\n   the pet's written steps in Check me and the reason built from tiles */\n.ls-bars{display:flex;flex-direction:column;gap:var(--s-2);align-items:center;max-width:100%}\n.ls-bar{display:flex;align-items:center;gap:var(--s-2);max-width:100%}\n.ls-bar .viz{max-width:min(240px,62vw);height:auto}\n.ls-barl{font-size:var(--fs-3);font-weight:700;color:var(--ink);min-width:2.2em;text-align:center}\n.ls-copies{display:flex;flex-wrap:wrap;gap:var(--s-1);justify-content:center;max-width:100%}\n.ls-copies .viz{max-width:min(150px,40vw);height:auto}\n.ls-pvc{border-collapse:separate;border-spacing:2px;margin:0 auto;font-weight:700;max-width:100%}\n.ls-pvc th{font-size:var(--fs-2);min-width:1.6em;color:var(--ink-2);padding:2px 4px;background:var(--surface-2);border-radius:var(--r-chip);white-space:nowrap}\n.ls-pvc td{font-size:var(--fs-4);color:var(--ink);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line);border-radius:var(--r-chip);text-align:center;min-width:1.6em;padding:2px 6px}\n.ls-pvc td.ls-pvm{background:var(--math-tint);box-shadow:inset 0 0 0 3px var(--math-shade)}\n.ls-pvc td.ls-pvo{box-shadow:inset -6px 0 0 -3px var(--ink),inset 0 0 0 2px var(--line)}\n.ls-area{border-collapse:separate;border-spacing:3px;margin:0 auto;font-weight:700}\n.ls-area th{font-size:var(--fs-2);color:var(--ink-2);padding:2px 6px}\n.ls-area td{font-size:var(--fs-3);color:var(--ink);background:var(--math-tint);border-radius:var(--r-chip);text-align:center;min-width:3.2em;padding:var(--s-2) var(--s-1)}\n.ls-mine{font-size:var(--fs-4);font-weight:700;color:var(--ink);background:var(--surface);border-radius:var(--r-card);padding:var(--s-2) var(--s-3);box-shadow:inset 0 0 0 2px var(--line)}\n.fxs.ls-fx .fxl{display:flex;align-items:center;gap:var(--s-2);padding:var(--s-1) var(--s-3);background:var(--surface);border-radius:var(--r-chip);box-shadow:inset 0 0 0 2px var(--line);color:var(--ink);text-align:left}\n.fxs.ls-fx .fxl.ls-fixd{box-shadow:inset 0 0 0 3px var(--good);background:var(--good-tint)}\n.ls-fixtop{display:flex;flex-direction:column;align-items:center;gap:var(--s-1);width:100%}\n.ls-fixtop .eq{font-size:var(--fs-4)}\n.ls-why{font-weight:700;color:var(--ink)}\n@media (max-width:420px){.ls-pvc th{padding:2px}.ls-pvc td{font-size:var(--fs-3);padding:2px 3px;min-width:1.2em}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- TEACH-3: the words of the drafted lessons the owner has reviewed (part teach35) ----------
   BUILT by tools/build.py from docs/drafts/<stop>.md ("status: reviewed ...") for the scripts that name them (lsDraft3, 52j-lessons35.js):
   never edit by hand. A draft that is not reviewed is never here, so its lesson is not live with its words (it runs on its hand-written fallback words). */
const LSW3 = {
  "arr2": {"idea":"Rows times how many in each row.","beats":{"remember":["Remember this one? Count by {k}."],"explore":["Make any array you like with the steppers."],"name":["You made {a} rows of {b}.","That is {a} times {b}.","It makes {sum} in all.","Rows times how many in each row."],"together":["Build {a} rows of {b} in the array.","How many in all in this picture?","What does {a} times {b} equal?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs groups of rocks. How many for {a} groups of {b}?","The tower needs layers of blocks. How many for {a} layers of {b}?"]},"reasons":{"skip":["One group too many. Count the rows again.","One group too few. Check the rows."],"mulAdd":["That adds the numbers. Multiply them instead."]},"home":"Ask {name}: \"We plant 4 rows with 6 in each. How many in all?\""},
  "big6": {"idea":"Line up the places. Work from the ones. Trade when a place needs it.","beats":{"remember":["Do you remember this one? Make the number {n} with blocks."],"explore":["Make any number on the chart. Use the thousands too. Any way works."],"name":["You made the number {n}.","Its thousands digit is {a}.","Line up the places. Work from the ones. Trade when a place needs it."],"together":["Both numbers are on the chart. Add from the ones.","Here they are in columns. Add from the ones.","Now the problem in a row."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory counts loads of parts. How many in all?","One more order. Add the loads."]},"reasons":{"nocarry":["The ten from the ones is missing. Add it to the next place."],"cat":["The places got mixed. Add each column and trade the ten up."],"slip":["Good catch. I slipped there.","Look closer. I slipped."]},"home":"Ask {name}: \"What is 2,475 plus 1,368?\""},
  "big7": {"idea":"Line up the places. Work from the ones. Trade when a place needs it.","beats":{"remember":["Do you remember this one? Make the number {n} with blocks."],"explore":["Make any number on the chart. Use the thousands too. Any way you like."],"name":["You made {n}.","Its thousands digit is {a}.","Line up the places. Work from the ones. Trade when needed."],"together":["Let's add these on the chart. Type the total.","Now add these in columns. Type the total.","Now add these written in a row. Type the total."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory adds big orders. Find the total.","One more job. Add to find the total parts."]},"reasons":{"nocarry":["The ten from the ones needs to go to the tens place."],"cat":["We add each place then trade. Do not write them side by side."],"slip":["Look closer. One place is off by a ten."]},"home":"Ask {name}: What is 456 plus 278?"},
  "dbig1": {"idea":"Share the biggest place first. Leftovers break into the next place.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Pick a number. Pick how many equal groups to share it into. Any way works."],"name":["You shared {n} into {b} groups.","Each group has {a}. There are {k} left.","Share the biggest place first. Leftovers break into the next place."],"together":["Let us share {n} into {b} equal groups.","Here is a picture of the blocks.","Now the symbols only."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory needs equal boxes of parts. Share {n} into {b} boxes.","Now share a new number into a new number of boxes."]},"reasons":{"drop":["I shared each place and dropped what was left over.","The leftovers need to break into the next place."],"remBig":["The remainder cannot be as big as the groups.","Share more so the remainder is smaller."],"slip":["That step is one off. Look closer at the blocks."]},"home":"Ask {name}: How would you share 48 toy cars into 4 equal groups?"},
  "dbig2": {"idea":"Share the biggest place first. Leftovers break into the next place.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Pick a number. Share it into equal groups. Any way works."],"name":["You shared {n} into {b} groups.","Each group has {a}. There are {k} left.","Share the biggest place first. Leftovers break into the next place."],"together":["Let's share {n} into {b} equal groups.","Look at the picture. How many in each group?","Now write the division."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The factory packs {n} toys into {b} boxes. How many in each?","Share {n} blocks into {b} equal groups."]},"reasons":{"remBig":["The remainder cannot be as big as a group. Share one more."],"drop":["Do not drop the leftovers. They make part of the next place."]},"home":"Ask {name}: \"Share 47 apples by 5 friends. How many each, how many left?\""},
  "dbig3": {"idea":"Share the biggest place first. Leftovers break into the next place.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Pick a number. Pick how many equal groups to share it into."],"name":["You shared {n} into {b} groups.","Each group has {a} with {k} left over.","Share the biggest place first. Leftovers break into the next place."],"together":["Let us share {n} into {b} equal groups.","Here is a picture of the blocks. How many in each group?","Now write the division in symbols only."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory needs to share the new parts into equal boxes.","Share {n} into {b} equal groups."]},"reasons":{"drop":["I shared each place but dropped what was left over.","The leftovers must break into the next smaller place."],"zero0":["A zero is missing inside the answer.","Check each place. The zero shows no groups there."],"remBig":["The leftover is as big as a full group.","Share one more into the groups. The leftover must stay smaller."],"slip":["That step is one off. Look again at the blocks."]},"home":"Ask {name}: \"Share 84 toy parts into 4 equal groups. How many in each?\""},
  "dec1": {"idea":"The first place after the point is tenths. The next is hundredths.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade any squares. Ten squares make one whole."],"name":["You shaded {n} squares.","That is {n} tenths.","The first place after the point shows tenths."],"together":["Shade part of the whole to match this.","Type the decimal for the shaded bar.","Write this fraction as a decimal."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The desert trail needs a sign. Type the length as a decimal.","Now type this length as a decimal for the map."]},"reasons":{"dzero":["Look closer. The first place is tenths. The next is hundredths."],"given":["I said the number I could see. Count the shaded squares."]},"home":"Ask {name}: \"Can you point out the tenths place in a decimal number?\""},
  "dec2": {"idea":"Compare the ones then tenths then hundredths. More digits does not mean bigger.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Use the chart. Make any decimal you like."],"name":["You made {n}.","Compare the ones first then the tenths then the hundredths.","More digits does not mean bigger."],"together":["Now let's compare on the number line.","Now let's compare with the place value chart.","Now let's compare these."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["Which is bigger in the sand castle plan?","Which is bigger for the desert path?"]},"reasons":{"longer":["Look closer. More digits does not mean bigger."],"small":["I turned the sign round. The open side faces the bigger number."]},"home":"Ask {name}: Which is bigger, four tenths or thirty five hundredths?"},
  "dec3": {"idea":"Line up the points.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Use the place value chart. Make any number you like."],"name":["You made {n}.","A whole number has its point at the end.","Line up the points."],"together":["We add these. Line up the points first.","Now in columns with the points lined up.","Now the symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The lab needs these amounts mixed. How much in all?","The lab needs these amounts mixed. How much in all?"]},"reasons":{"point":["The points must line up in a column."],"slip":["Look again. That one was wrong."]},"home":"Ask {name}: \"What is 3.25 plus 4.7?\""},
  "dec4": {"idea":"Multiply as if there were no points then count the digits after both points.","beats":{"remember":["Do you remember this times fact? Show me {a} times {b}."],"explore":["Use the place value chart. Make any decimal you like."],"name":["You made {n}.","Multiply as if there were no points.","Then count the digits after both points."],"together":["First multiply the same digits without the points.","Next put the point into the answer.","Now try the problem in symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The lab needs some mixes. Find each amount.","The lab needs more mixes. Find each amount."]},"reasons":{"dpt":["I put the point in the wrong place. Count the digits after both points."],"slip":["I slipped in the multiplying. Check that step."]},"home":"Ask {name}: What is four and two tenths times three?"},
  "dec5": {"idea":"Divide as if there were no point then put the point back in the same place.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Use the place value chart. Make any decimal you like."],"name":["You made {n}.","Divide as if there were no point.","Then put the point back in the same place."],"together":["First divide the digits without the point.","Now put the point in the answer.","Now try the problem in symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The lab shares powder evenly between jars. How much does each get?","One more batch to share."]},"reasons":{"dpt":["I put the point in the wrong place. It stays where it was."],"slip":["I slipped in the dividing. Check that step."]},"home":"Ask {name}: \"What is 4.8 divided by 2?\""},
  "dfact1": {"idea":"Dividing finds how many rows or how many in each row.","beats":{"remember":["Do you remember this one? What is {a} times {b}?"],"explore":["Make an array with all the dots. Any way you like."],"name":["You made {n} dots in {a} rows of {b}.","Dividing finds how many rows or how many in each row."],"together":["Build rows of {b} with all {n} dots.","How many rows from {n} dots in rows of {b}?","Write the division for {n} dots in rows of {b}."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs {n} stones set in groups of {b}. How many groups?","Share {n} leaves into bags of {b}. How many bags?"]},"reasons":{"fact":["Look closer. That is a neighbor fact.","Try again. One group too many or too few."],"given":["That number is already there. Use the dots to find a new one."]},"home":"Ask {name}: How many bags from 20 apples if each holds 5?"},
  "dfact2": {"idea":"Dividing finds how many rows or how many in each row.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Make an array of {n} dots any way you like."],"name":["You made {n} dots in {a} rows of {b}.","Dividing finds how many rows or how many in each row."],"together":["Put {n} dots in rows of {b}.","How many rows of {b} fit in {n}?","Now write the division for {n} divided by {b}."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs {n} stones set in groups of {b}. How many groups?","The cave has {n} gems to share in bags of {b}. How many bags?"]},"reasons":{"fact":["Look closer. I slipped.","That is a close fact but not the right one."],"given":["I said the number I could see. Look at the full set."]},"home":"Ask {name}: How many groups of four do you see around the house?"},
  "dfact3": {"idea":"Dividing finds how many rows or how many in each row.","beats":{"remember":["Do you remember this fact? What is {a} times {b}?"],"explore":["Make an array of {n} dots any way you like."],"name":["You made {n} dots in {a} rows of {b}.","Dividing finds how many rows or how many in each row."],"together":["We have {n} dots to put in rows of {b}.","Look at the picture. How many rows?","Write the division for this array."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs {n} stones in groups of {b}. How many groups?","The cave has {n} gems to share in piles of {b}. How many piles?"]},"reasons":{"fact":["Look closer. I slipped there.","One group too many or too few."],"given":["I said the number I could see.","Count all the dots to start."]},"home":"Ask {name}: How many in each if we share 24 flowers in 8 vases?"},
  "dfact4": {"idea":"Dividing finds how many rows or how many in each row.","beats":{"remember":["Do you remember this one? What is {a} times {b}?"],"explore":["Make an array of {n} dots. Any way you like!"],"name":["You made {n} dots in {a} rows of {b}.","Dividing finds how many rows or how many in each row."],"together":["We have {n} dots to put in rows of {b}.","Look at the picture. How many rows?","Write the division for this array."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs {n} stones set in groups of {b}. How many groups?","The den has {n} nuts to share in {b} bags. How many in each bag?"]},"reasons":{"fact":["Look closer. That is a near fact. Count the rows again."],"given":["I said a number I could see. Count the rows instead."]},"home":"Ask {name}: \"We have 24 flowers. How many rows of 6?\""},
  "fact1": {"idea":"Rows and row length are factors of the number.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Make an array of {n} dots. Any way you like!"],"name":["You made {n} dots in {a} rows of {b}.","The rows and row length are factors of {n}."],"together":["Build {n} dots in {a} rows.","How many dots fill each row?","Write it with a times sign."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory needs a box for {n} parts in {a} rows. How long is each row?"]},"reasons":{"fact":["I was one row off. Multiply back to check."],"given":["I said the number of rows. The answer is how many in each row."]},"home":"Ask {name}: \"Can you find two factors of twenty four?\""},
  "fact2": {"idea":"A composite number makes more than one row. A prime makes only one.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Make an array with {n} dots. Any way you like!"],"name":["Your array shows {n} dots in {a} rows of {b}.","A composite number makes an array with more than one row.","A prime number makes only one row."],"together":["Build an array for {n} in more than one row.","Is {n} prime or composite?","Is this number prime or composite?"],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The factory needs a factor for {n} that is not one or the number itself."]},"reasons":{"oddPrime":["I thought every odd number is prime. Some odd numbers have factors."]},"home":"Ask {name}: \"Is fifteen a prime number or a composite number?\""},
  "fop1": {"idea":"Same-size parts add like things: add the tops, the bottom stays.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade some parts on each bar. Any way you like."],"name":["You shaded {a} and {b} parts of the {x}.","{a} and {b} is {sum} over {x}.","Same-size parts add like things: add the tops, the bottom stays."],"together":["Shade {a} parts then shade {b} more on one bar.","How many parts are shaded now?","Add the tops. The bottom stays the same."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs sand in parts. Work it out for me.","One more load of sand. How much now?"]},"reasons":{"addBot":["The bottom stays the same. Add only the tops.","We add the shaded parts. The total parts do not change."],"slip":["Look closer. One part too many or too few."]},"home":"Ask {name}: What is three fifths plus one fifth?"},
  "fop2": {"idea":"A whole number times a fraction is that many copies of the fraction.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade some parts on each bar. Any way you like!"],"name":["You shaded {a} out of {x} on the first bar.","You shaded {b} out of {x} on the next bar.","A whole times a fraction is that many copies of the fraction: multiply the top."],"together":["Here are {a} copies of a bar shaded {b} out of {x}.","Count all the shaded parts. What fraction is that?","Now try it with symbols only."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs sand in {a} sections. Shade each part. What fraction is shaded?","The wall has {a} windows. Shade {b} out of {x} in each. What fraction shows sky?"]},"reasons":{"mulBot":["The bottom stays the same. Only multiply the top."],"slip":["Look closer at the shaded parts. One is off."]},"home":"Ask {name}: \"What is 3 times 2 fifths?\""},
  "fop3": {"idea":"Make the bottoms the same first then add the tops.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade the same amount on both bars. Any way you like."],"name":["You shaded {a} and {b} out of {x}.","{sum} out of {x} in all.","Make the bottoms the same first then add the tops."],"together":["Rename the first fraction to match the bottom bar.","Both bars are cut the same now. Type the total.","Add these in symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The caves need light of each kind. How much in all?"]},"reasons":{"addBot":["I added the bottoms too. Rename to match first."],"renameTop":["I changed the bottom but not the top. Keep the value the same."],"slip":["That one was off by one. Look again."]},"home":"Ask {name}: \"What is one half plus one fourth?\""},
  "fop5": {"idea":"Part of a part: multiply the tops and multiply the bottoms.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade any squares in the grid. Any way you like."],"name":["You shaded {sum} of {x} squares.","Part of a part: multiply the tops and multiply the bottoms."],"together":["Shade the overlap of these rows and columns.","Now write the fraction for the shaded part.","Try this one with symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs some pieces. Find each as a fraction.","One more for the map. What part is that?"]},"reasons":{"mixAdd":["We multiply here. Add when the bottoms match."],"topOnly":["Both tops and both bottoms. Try that again."]},"home":"Ask {name}: \"We need half of half a pie. What fraction is that?\""},
  "frac2": {"idea":"The bottom number counts the equal parts. The top counts the parts we mean.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Shade any parts you like on the bar. Any way works."],"name":["The bottom counts the equal parts. The top counts the parts we mean.","You shaded {top} of {bottom} parts."],"together":["Shade {top} of the {bottom} parts on this bar.","What fraction does this bar show?","Now write the fraction these words tell."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The trail needs signs at the right spots. Name each fraction you see."]},"reasons":{"unshaded":["Look closer. Those parts are not shaded.","Count only the shaded parts for the top."],"fpart":["The bottom counts all the equal parts.","The top goes over all the parts in the bar."]},"home":"Ask {name}: \"Can you find something that shows one half?\""},
  "frac3": {"idea":"A fraction is a point on the line.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Mark any spot on the line. Tap the pin."],"name":["Your mark shows {top} of {bottom}.","A fraction is a point on the line."],"together":["Mark {top} of {bottom} on this line.","What fraction is marked here?","Name this fraction."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The trail has marks on a line. Type the fraction at each mark."]},"reasons":{"ticks":["Count the jumps. Not the marks."],"flip":["The top tells jumps from zero."]},"home":"Ask {name}: \"Show me half way on a line from zero to one.\""},
  "frac4": {"idea":"Compare how much of the same whole is shaded. More parts means smaller pieces.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade any parts on each bar. Any way you like!"],"name":["You shaded {a} of {x} on top and {b} of {y} below.","Compare how much of the same whole is shaded.","More parts means smaller pieces."],"together":["Shade the fractions on the bars.","Which bar shows more shaded part?","Which fraction is greater?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs the bigger piece. Type the bigger fraction."]},"reasons":{"bigden":["Look closer. Bigger bottom number means smaller pieces."],"small":["The sign is turned round. This one is actually smaller."]},"home":"Ask {name}: Which is bigger, three fourths or five sixths?"},
  "frac5": {"idea":"Multiply the top and bottom by the same number and the fraction stays the same.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Shade the same amount on both bars. Any way you like!"],"name":["You shaded the same amount.","It is {a} of {x} on top and {b} of {y} below.","Multiply the top and bottom by the same number and the fraction stays the same."],"together":["Shade the bottom bar to match {top} of {bottom} on the top bar.","Type the missing number so both bars match.","Type the missing number so both match in symbols."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs equal fractions. Type the missing top number."]},"reasons":{"addEq":["Look closer. I added the same number to the top and bottom."],"given":["I said a number that was already shown. Look again."]},"home":"Ask {name}: \"Can four eighths be the same as one half?\""},
  "frac6": {"idea":"Compare how much of the same whole is shaded. More parts means smaller pieces.","beats":{"remember":["Do you remember this? Name the shaded part."],"explore":["Shade any parts on each bar. Any way works!"],"name":["You shaded {a} of {x} parts on the top bar.","You shaded {b} of {y} parts on the bottom bar.","Compare how much of the same whole is shaded. More parts means smaller pieces."],"together":["Now shade these fractions on the bars.","Which bar shows more shaded part?","Which fraction is greater than the other?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The trail needs the bigger fraction of water. Which one?"]},"reasons":{"bigden":["A bigger bottom number means smaller pieces.","Look closer at the size of each piece."],"small":["The sign is turned round. Check which shaded part is larger."]},"home":"Ask {name}: \"Which is bigger, three fourths or five sixths?\""},
  "frac7": {"idea":"The simplest form has the fewest biggest parts.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Shade the same amount on both bars. Any way works."],"name":["You shaded the same amount.","That is {a} of {x} parts on top and {b} of {y} below.","The simplest form has the fewest biggest parts."],"together":["Shade the bottom bar to match the top bar.","Type the missing number to match.","Write the same fraction in symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs the simplest form. Write {top} over {bottom} in simplest form."]},"reasons":{"oneSide":["We divide the top and the bottom by the same number."],"flip":["The top tells the shaded parts. The bottom tells all the parts."]},"home":"Ask {name}: \"Can you draw a picture for four sixths in simplest form?\""},
  "frac8": {"idea":"Every full bar is one whole. The parts left over make the fraction.","beats":{"remember":["Do you remember this? Name the shaded fraction."],"explore":["Shade any parts you like on both bars."],"name":["You shaded {a} parts.","Every full bar is one whole.","The parts left over make the fraction."],"together":["Type the whole bars and the parts left over.","Now find it on the number line.","Write it with symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The trail needs mixed numbers marked. Type what you know.","One more to mark on the map. Show what you know."]},"reasons":{"mixTop":["I kept all the parts on top. Take the whole bars out first."],"slip":["I counted one whole bar wrong."]},"home":"Ask {name}: \"How many wholes are in 11 fourths?\""},
  "geo1": {"idea":"Perimeter is the distance around.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Make any rectangle with the dots. Any way works."],"name":["You made a rectangle with sides {a} and {b}.","The distance around is {sum}.","Perimeter is the distance around. Add all the sides."],"together":["Add all the sides to find the perimeter.","Opposite sides match. Add all the sides.","No picture this time. Add every side."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs a fence all the way around. The sides are {a} and {b}."]},"reasons":{"area":["I found the space inside. We want the distance around."],"half":["I added only some of the sides. Add them all."]},"home":"Ask {name}: \"A rug is 4 by 6. How far around is it?\""},
  "geo2": {"idea":"Area counts the squares inside.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Shade any squares on the grid. Any way you like!"],"name":["You shaded {sum} squares.","Area counts the squares inside."],"together":["Build a rectangle with sides {a} and {b}.","Count the squares inside this one.","Find the area with sides {a} and {b}."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The garden needs new grass. It has sides {a} and {b}. What is its area?"]},"reasons":{"perim":["That counts around the edge. We need squares inside.","Try counting the squares inside instead."],"mulAdd":["We multiply the sides. Not add them.","The sides tell us rows and how many in each row."]},"home":"Ask {name}: What is the area of our table?"},
  "geo3": {"idea":"Half the perimeter is one long side and one short side.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Make any rectangle you like with the dots."],"name":["Your rectangle has sides {a} and {b}.","The distance around is {sum}.","Half the perimeter is one long side and one short side."],"together":["Here is a side and the distance around.","Here is the same as a sum with a box.","Now the same told in words only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The trail needs a fence on every side. How long is the missing side?"]},"reasons":{"sideP":["I took one side from the whole perimeter. Halve it first."],"half":["I halved the wrong number. Half the perimeter is one long and one short side."]},"home":"Ask {name}: \"Perimeter 24, one side 5. What is the other side?\""},
  "geo4": {"idea":"Volume counts the cubes inside a box.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Build any box you like with the cubes. Take your time."],"name":["One layer of {a} by {b} holds {sum} cubes.","Volume counts the cubes: one layer times how many layers."],"together":["Here is one layer of a box and how many layers. How many cubes?","Look at this picture of the box. How many cubes fill it?","The sides are told in words only. Find the volume."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The crystal box needs filling. How many cubes fit?","Build a box for the crystals. Sides {a} and {b}, {k} layers. How many fit?"]},"reasons":{"layer":["Count every layer, not just the top one."],"mulAdd":["I added the sides. Volume multiplies length, width and height."]},"home":"Ask {name}: What is the volume of a box 4 by 5 by 3?"},
  "mbig1": {"idea":"Multiply each place then trade ten of a place for one of the next.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Make any number with the blocks. I will tell you what that many groups makes."],"name":["You made {n}. Here are {b} groups. That makes {sum}.","Multiply each place then trade ten of a place for one of the next."],"together":["Let's build {a} times {b}. Put in every group then trade.","Now look at the blocks and type what it makes.","Now just the symbols. What does it make?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The tower needs blocks for the top. How many for {a} times {b}?"]},"reasons":{"tens0":["That works a tens part as ones. Multiply the place value."],"zeros":["Count the zeros in each place. Write the right number."]},"home":"Ask {name}: \"What is twenty times thirty?\""},
  "mbig2": {"idea":"Multiply each place then trade ten of a place for one of the next.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Build any number with rods and cubes. I will tell you what that many groups make."],"name":["You built {n}. We made {b} groups.","That gives us {sum} in all.","Multiply each place then trade ten for one of the next."],"together":["Let's build every group. Trade ten for one of the next place.","Now look at the picture. What is the product?","Here is the problem in symbols only."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory packs {a} boxes with {b} toys each. How many toys?"]},"reasons":{"mcarry":["I forgot to add the ten from the ones place."],"tens0":["I worked the tens part as ones."],"slip":["Look closer. I slipped there."]},"home":"Ask {name}: \"What is 24 times 3?\""},
  "mbig3": {"idea":"Multiply each place then trade ten of a place for one of the next.","beats":{"remember":["Remember this one? What is {a} times {b}?"],"explore":["Make any number with the blocks. Any way works."],"name":["You made {n}.","{b} groups of {n} is {sum}.","Multiply each place then trade ten of a place for one of the next."],"together":["Build every group then trade.","Look at the picture. Type what it shows.","Now the symbols only. What is {a} times {b}?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["In the factory we need parts. How many for {a} times {b}?","One more job. What is {a} times {b}?"]},"reasons":{"mcarry":["I left out the ten I traded. It goes to the next place."],"tens0":["I worked a tens part as ones. A tens part ends in zero."],"slip":["Good catch. I slipped there.","Look closer. I slipped."]},"home":"Ask {name}: What is 23 times 4?"},
  "mbig4": {"idea":"Multiply each part then add the parts.","beats":{"remember":["Do you remember this one? What is {a} times {b}?"],"explore":["Pick any numbers. Use the steppers to build them any way you like."],"name":["You picked {a} and {b}.","Each part times each part then add them.","{a} times {b} is {sum}."],"together":["First break it into parts and multiply each part.","Now find each part then add them all.","Now do it with the symbols only."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory needs rows of boxes. How many if there are {a} rows of {b}?"]},"reasons":{"tens0":["I worked a tens part as ones. A tens part ends in zero."],"part":["One part of the product is missing. Look again."],"slip":["That is close. Check this step one more time."]},"home":"Ask {name}: \"What is twenty three times thirty four?\""},
  "mbig5": {"idea":"Multiply each part then add the parts.","beats":{"remember":["Do you remember this times fact? What is {a} times {b}?"],"explore":["Pick any numbers. Build them with the steppers any way you like."],"name":["You picked {a} and {b}.","Each part has its own product.","Multiply each part then add the parts to get {sum}."],"together":["Picture the parts of {a} times {b}.","Find the product of each part then add them.","Now do {a} times {b} with symbols only."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The lab packs trays. How many in all?"]},"reasons":{"tens0":["I worked a tens part as ones. A tens part ends in zero."],"part":["One part of the product is missing. Look again."],"slip":["That one is close. Check this step once more."]},"home":"Ask {name}: What is the product of 124 times 13?"},
  "meas5": {"idea":"A smaller unit needs more of it so multiply.","beats":{"remember":["Do you remember this? What is {a} times {b}?"],"explore":["Pick how many feet you need for the desert path. Any number works!"],"name":["You picked {n} feet.","That is {sum} inches.","A smaller unit needs more of it so multiply."],"together":["We need {n} big units. Let's count up by the small unit size.","One big unit is this many small units. How many for {n}?","Now try the symbols. How many small units?"],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The desert trail needs supplies. How many small units for {n} big ones?"]},"reasons":{"conv":["I added. To change to a smaller unit, multiply."],"skip":["I counted one unit too many. Check the table."]},"home":"Ask {name}: How many inches are in 5 feet?"},
  "mfact1": {"idea":"Rows times how many in each row.","beats":{"remember":["Remember this one? Count by {k}."],"explore":["Make any array you like with the steppers."],"name":["You made {a} rows of {b}.","That makes {sum} in all.","Rows times how many in each row."],"together":["Build {a} rows of {b} on the array.","How many in all in this picture?","Now the fact in symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs groups of rocks. How many in all?","The tower needs layers of blocks. How many in all?"]},"reasons":{"skip":["One group too many. Count the rows again.","One group too few. Check the rows."],"mulAdd":["That adds the numbers. We multiply them."]},"home":"Ask {name}: How many are in four rows of five?"},
  "mfact2": {"idea":"Rows times how many in each row.","beats":{"remember":["Remember this one? Count by {k}."],"explore":["Make any array you like with the steppers."],"name":["You made {a} rows of {b}.","That is {a} times {b}.","It makes {sum} in all."],"together":["Build {a} rows of {b} here.","How many in all on this picture?","What is {a} times {b}?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs blocks. {a} groups of {b}. How many?","The cave has {a} rows of {b} rocks. How many rocks?"]},"reasons":{"skip":["One group too few. Count the groups again.","One group too many. Look closer at the rows."],"mulAdd":["We multiply not add. Try again with the picture."]},"home":"Ask {name}: \"What is four times six?\""},
  "mfact3": {"idea":"Rows times how many in each row.","beats":{"remember":["Do you remember this? Count by {k}."],"explore":["Make any rows of dots. Use the steppers any way you like."],"name":["You made {a} rows of {b}.","That is {a} times {b}.","{sum} in all."],"together":["Build {a} rows of {b} here.","How many in all?","What is {a} times {b}?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs groups of rocks. How many in all?","The tower needs layers of blocks. How many in all?"]},"reasons":{"skip":["One group too few. Count every row.","One group too many. Count every row."],"mulAdd":["We multiply not add. Rows times in each row."]},"home":"Ask {name}: \"What is six times eight?\""},
  "mfact4": {"idea":"Rows times how many in each row tells how many in all.","beats":{"remember":["Do you remember this? Count on by {k}."],"explore":["Make any array you like. Use the steppers any way that works."],"name":["You made {a} rows of {b}.","That is {a} times {b}.","It has {sum} in all."],"together":["Build {a} rows of {b} on the array.","How many in all in this picture?","What does {a} times {b} equal?"],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs plants. Put in {a} rows of {b}. How many plants?"]},"reasons":{"skip":["One group too few. Count every row again.","One group too many. Check each row."],"mulAdd":["We multiply these numbers. Try again."]},"home":"Ask {name}: \"What is six times seven?\""},
  "mfact5": {"idea":"Multiply each place then trade ten of a place for one of the next.","beats":{"remember":["Remember this one? What is {a} times {b}?"],"explore":["Make a number with rods and cubes. Any way works."],"name":["You made {n}. Now {b} groups of it.","The blocks show {sum}.","Multiply each place then trade ten of a place for one of the next."],"together":["Build the groups and trade.","Now look at the picture and type what you get.","Now the symbols only. You know what to do."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The tower needs blocks for the top. How many?"]},"reasons":{"mcarry":["I left out the ten from the trade."],"skip":["One group too few. Count the groups again."],"tens0":["I worked the tens part as ones."]},"home":"Ask {name}: \"What is eleven times nine?\""},
  "ooo1": {"idea":"Times and divide come before plus and minus.","beats":{"remember":["Do you remember this fact? What is {a} times {b}?"],"explore":["Pick the numbers. Build a problem like this. Any way you like."],"name":["You built {a} plus {b} times {k}.","The answer is {sum}.","Times comes before plus."],"together":["First work out the times part.","Now the full problem with the times marked.","Now the problem in symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The lab needs some readings. Solve this one.","One more for the notes. Solve this one."]},"reasons":{"order":["Order matters. Times first then plus.","Look again. Times before plus."],"slip":["That step is off. Look once more."]},"home":"Ask {name}: What is four plus five times two?"},
  "pv4": {"idea":"Each place is worth ten times the place to its right.","beats":{"remember":["Do you remember this? Make {n} with blocks."],"explore":["Make any number you like on the place value chart. Any way works."],"name":["You built {n}.","Look at the {a}. It is worth {value}.","Each place is worth ten times the place to its right."],"together":["Let us build {n} on the chart.","Look at this chart. What is the {a} worth?","In symbols what is the {a} worth in {n}?"],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The factory needs a part number. What is the {a} worth in {n}?"]},"reasons":{"given":["I said the number I could see. Look closer at the chart!"],"place":["I mixed up the places. Check the chart again."]},"home":"Ask {name}: What is the value of the digit four in forty two thousand?"},
  "pv5": {"idea":"Each place is worth ten times the place to its right.","beats":{"remember":["Do you remember this? Show me {n} with the blocks."],"explore":["Make any number you like on the place value chart."],"name":["You built {n}.","Look at the {a}. It is worth {value}.","Each place is worth ten times the place to its right."],"together":["Let's build {n} on the chart.","What is the {a} worth here?","What is the {a} worth in {n}?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The lab needs a reading. What is the {a} worth in {n}?"]},"reasons":{"given":["I said the number I could see. Look at the chart!"],"place":["I mixed up the places. Look again at the chart."]},"home":"Ask {name}: \"What is the value of the 4 in 2.45?\""},
  "pv6": {"idea":"Times ten moves every digit one place to the left.","beats":{"remember":["Do you remember this? Make {n} with the blocks."],"explore":["Make any number you like on the place value chart."],"name":["You built {n}.","Here is {n} times ten. It is {value}.","Times ten moves every digit one place to the left."],"together":["Build {n} on the chart then times it by {k}.","Look at this chart of {n}. What do you get times {k}?","Now try this one with symbols only."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The lab needs the reading worked out. Use {n} and {k}."],"why":["Now the reason, in words."]},"reasons":{"place":["I moved the digits one place too far, or not far enough."],"given":["I left the number as it was. Every digit must move."]},"home":"Ask {name}: \"What number is ten times bigger than four hundred?\""},
  "round1": {"idea":"Find the nearer ten on the number line. Halfway rounds up.","beats":{"remember":["Do you remember this one? What comes next counting by tens from {k}?"],"explore":["Put the pin anywhere on this number line between {a} and {b}."],"name":["Your number is {n}.","It rounds to {a}.","Halfway goes up."],"together":["First find the tens it sits between.","Now slide the pin to the nearer ten.","Type the nearer ten for this number."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs a round number of steps. How many for this one?"]},"reasons":{"trunc":["Look closer. At halfway or past it, we round up."],"rup":["Look closer. It is not halfway yet so round down."]},"home":"Ask {name}: \"What is thirty four rounded to the nearest ten?\""},
  "round2": {"idea":"Find the hundreds a number sits between, then pick the nearer one. Halfway rounds up.","beats":{"remember":["Do you remember this? What comes next counting by tens from {k}?"],"explore":["Put a pin anywhere on this number line."],"name":["Your number is {n}.","It rounds to {a}.","We round to the nearer hundred."],"together":["Find the hundreds around {n}.","Now slide the pin to the nearer hundred.","Type the number we round to."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The path needs a sign at each hundred. Round {n} to the nearest hundred."]},"reasons":{"trunc":["It is halfway or past it. Round up to the next hundred."],"rup":["It is not halfway yet. Round down to the lower hundred."]},"home":"Ask {name}: \"What would you round 730 to, the nearest hundred?\""},
  "round3": {"idea":"Find the round numbers a number sits between then pick the nearer one. Halfway rounds up.","beats":{"remember":["Remember this one? What comes next counting by tens from {k}?"],"explore":["Put a pin anywhere on this number line between {a} and {b}."],"name":["Your number is {n}.","It rounds to {a}.","Halfway rounds up."],"together":["Find the round numbers {n} sits between.","Slide the pin to the nearer round number.","What does {n} round to?"],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory orders parts in round numbers. Round this one."]},"reasons":{"trunc":["Look closer. We round up at halfway.","The nearer round number is higher here."],"rup":["Look closer. We do not always round up.","The nearer round number is lower here."]},"home":"Ask {name}: \"What does 472 round to, the nearest hundred?\""},
  "round4": {"idea":"Find the round numbers a decimal sits between, then pick the nearer one. Halfway rounds up.","beats":{"remember":["Do you remember this? What comes next counting by tens from {k}?"],"explore":["Put the pin anywhere on this number line between {a} and {b}."],"name":["Your number is {n}.","It rounds to {a}.","Halfway rounds up."],"together":["Mark {n} on the line then slide the pin to the nearer round number.","Here is the line. What does it round to?","Round {n} with no line."],"check":["My turn. Check me!","I think it is {ans}. Am I right?"],"show":["The lava needs a round number for the next step. Round {n}."]},"reasons":{"trunc":["Look again. We round up at half."],"rup":["This one is not halfway. It is closer to the lower round number."]},"home":"Ask {name}: \"What is three point seven rounded to the nearest whole number?\""},
  "sub6": {"idea":"When a place runs out, break one from the next place.","beats":{"remember":["Do you remember this one? Make {n} with the blocks."],"explore":["Here are some blocks. Take away as many as you like."],"name":["You had {a}. You took {b}. Now {diff} are left.","When a place runs out, break one from the next place."],"together":["Take {b} from {a}. Break a hundred or a ten if you need to.","Look at the picture of the blocks. Type what is left.","Now try it with the columns."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs clearing. Take {b} logs from the pile of {a}.","One more job. Take {b} from {a}."]},"reasons":{"col":["I took the smaller digit from the bigger one. Top take away bottom."],"keep":["I broke a ten but did not take it from the tens."],"slip":["Look closer. I slipped there."]},"home":"Ask {name}: \"What is 430 take away 125?\""},
  "sub7": {"idea":"When a place runs out break one from the next place.","beats":{"remember":["Do you remember this? Make {n} with blocks."],"explore":["Take away as many as you like from {a} blocks."],"name":["You had {a}. You took {b}. {diff} are left.","When a place runs out break one from the next place."],"together":["Take {b} away from {a} blocks. Break when you need to.","Look at the picture of {a}. Type what is left.","Now try it in columns."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The path needs clearing. Take {b} from {a} logs.","The bridge needs fixing. Take {b} from {a} boards."]},"reasons":{"col":["I took the smaller digit from the bigger one. Top take away bottom."],"keep":["I broke a ten but did not take it from the next place."],"slip":["Look closer. One off in this step."]},"home":"Ask {name}: \"What is 200 take away 125?\""},
  "sub8": {"idea":"Line up the places. Work from the ones. Trade when a place needs it.","beats":{"remember":["Do you remember this? Make the number {n} with blocks."],"explore":["Make any number on the chart. Use the thousands too. Any way you like."],"name":["You made {n}.","Its thousands digit is {a}.","Line up the places. Work from the ones and trade when needed."],"together":["We take away on the chart. Watch each trade.","Now we take away in columns. Watch each trade.","Now we take away in a row. Watch each trade."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The factory had {a} parts and used {b}. How many are left?","One more job. Take {b} away from {a}."]},"reasons":{"col":["We trade when the top digit is too small.","Take from the next place and trade for ten ones."],"keep":["I borrowed a ten but did not take it from the tens place.","Remember to take one from the tens when you borrow."],"slip":["Look closer at that step. One is off.","Good catch. I slipped there."]},"home":"Ask {name}: What is 452 minus 178?"},
  "time5": {"idea":"Count the long hand by fives to the last number then on by ones.","beats":{"remember":["Do you remember this? Set the clock to {time}."],"explore":["Move the hands. Set any time you like. Any way works."],"name":["You set {time}.","The hour is {hour}.","Count the long hand by fives to the last number then on by ones."],"together":["Set the clock to show {time}.","Look at this clock. Pick its time.","Look where the long hand points. Work out the minute."],"check":["My turn. Check my work.","I think it is {ans}. Am I right?"],"show":["The forest clock shows when the animals eat. What minute is it?"]},"reasons":{"minute":["Look closer at the long hand. It shows minutes.","Count by fives then ones from the long hand."],"given":["That number is already on the clock. Count the minutes."]},"home":"Ask {name}: \"Can you tell me what time the kitchen clock shows right now?\""},
};
/* ---------- TEACH-3: the grade 3 to 5 lessons' workbench, Check me and words (part teach35, after teach and teach12; TEACH-PLAN-2 batch 3) ----------
   The grade 3-5 lessons (52j-lessons35.js) are drafted lessons like the grade 1-2 ones (52g-drafted.js): their CODE chooses every number,
   question, model and misconception code; their WORDS are drafts in docs/drafts/<stop>.md that the owner reads. tools/build.py writes the
   reviewed words into 52h-words.js (LSW3). Until a draft is reviewed its lesson runs on the FALLBACK words written by hand here and in
   52j (the idea, tonight's question, a Name it line with the child's own numbers, the pet's reasons: each code's own line), so every
   lesson works and can be tested; once the owner approves a draft, its words replace the fallback at the next build (lsEnable3).
   What is new for the older kids (owner decision 3: less hand-holding, more challenge, "check my work", "give me a hard one"):
     Check me   the pet's own announced turn, in three forms (lsChk35):
                - its written working (the steps of the find-the-mistake questions, k2Fix* in 49b-kinds2.js), right about one time in four;
                  when it slipped, the child taps the step with the slip, sees the step put right, and builds the reason;
                - "your problem": the child sets the numbers with steppers (pickn), the pet works them out in steps, the child judges;
                - for a lesson with no steps: the pet's answer on the model or the question, as in batches 1 and 2.
                The pet is never wrong anywhere else (owner rule), and its mistake is always put right on screen.
     Reasons    built from word tiles in a sentence frame (the order kind): the end of the code's reason (LS_WHY), with two extra
                tiles, so it cannot be tapped through.
     Models     two fraction bars in one question (bars2: fraction comparison, equal fractions, simplest form, adding unlike parts);
                a place-value chart (pvc: whole numbers to the hundred thousands, decimals to hundredths); the steppers of "your
                problem" (pickn). Arrays, blocks with trades (b10r), fraction bars and number lines are the make and line kinds' own. */
const LS_B35 = []; // the grade 3-5 lesson ids, in map order of their lsDraft3 calls
/* ---- the misconception codes of grades 3 to 5 (TEACH-PLAN-2 system C). Most are written onto each question by its script (q.bug); the
   lesson's code knows the numbers. say: the pet's line when it repairs the idea (and its fallback reason); LS_WHY: the reason's sentence
   the child builds from tiles (its last three words are the tiles). ---- */
Object.assign(BUGS, {
  mulAdd: {d: 'adds the two numbers instead of multiplying them', say: 'Times means equal groups, not adding.'},
  skip: {d: 'one group too many or too few (a skip-counting slip)', say: 'Count the groups again. One row was off.'},
  fact: {d: 'a neighbouring fact: one group too many or too few', say: 'Multiply back to check. It must make the total.'},
  mcarry: {d: 'forgets to add the ten (or hundred) traded from the place before', say: 'The traded ten goes into the next place.'},
  tens0: {d: 'works a tens part as ones (2 × 60 as 12)', say: 'A tens part ends in zero.'},
  zeros: {d: 'writes one zero too many or too few', say: 'Count the zeros in the numbers again.'},
  part: {d: 'leaves out one of the parts of the product', say: 'Add every part of the product together.'},
  drop: {d: 'shares each place and drops what is left over', say: 'Leftover tens break into ones. Share those too.'},
  remBig: {d: 'leaves a remainder as big as the divisor, or bigger', say: 'The leftover must be smaller than the divisor.'},
  zero0: {d: 'drops a zero inside the answer (324 ÷ 3 as 18)', say: 'Keep a zero when a place has none.'},
  slip: {d: 'a small slip in one step: one (or ten) off', say: 'Check each step once more.'},
  trunc: {d: 'always rounds down: drops the digits after the place', say: 'Look at the next digit. Five or more rounds up.'},
  rup: {d: 'always rounds up', say: 'Below five rounds down.'},
  unshaded: {d: 'names the parts that are not shaded', say: 'The top number counts the shaded parts.'},
  fpart: {d: 'writes shaded parts over unshaded parts, not over all the parts', say: 'The bottom number counts all the parts.'},
  ticks: {d: 'counts the tick marks on a number line instead of the jumps', say: 'Count the jumps, not the tick marks.'},
  flip: {d: 'writes the fraction upside down', say: 'Shaded parts go on top. All parts go below.'},
  bigden: {d: 'thinks a bigger bottom number means a bigger fraction', say: 'More parts means smaller pieces.'},
  addEq: {d: 'adds the same number to the top and the bottom of a fraction', say: 'Multiply the top and bottom by the same number.'},
  oneSide: {d: 'divides only the top (or only the bottom) to simplify', say: 'Divide the top and the bottom by the same number.'},
  addBot: {d: 'adds the bottom numbers too', say: 'Same size parts: the bottom stays the same.'},
  renameTop: {d: 'changes the bottom number but not the top', say: 'Change the top as much as the bottom.'},
  mulBot: {d: 'multiplies the bottom number too (3 × 2/5 as 6/15)', say: 'A whole number times parts: the part size stays.'},
  topOnly: {d: 'multiplies the tops and keeps one bottom', say: 'Multiply the tops, and multiply the bottoms.'},
  mixAdd: {d: 'adds the fractions instead of multiplying them', say: 'Times a fraction means part of a part.'},
  dzero: {d: 'mixes up tenths and hundredths', say: 'Tenths are the first place after the point.'},
  longer: {d: 'thinks a decimal with more digits is bigger', say: 'Compare the tenths first, then the hundredths.'},
  point: {d: 'lines up the last digits instead of the points', say: 'Line up the points before you add.'},
  dpt: {d: 'puts the point in the wrong place', say: 'Count the digits after both points.'},
  order: {d: 'works left to right, adding before multiplying', say: 'Times and divide come before plus and minus.'},
  area: {d: 'multiplies the sides (finds the area, not the perimeter)', say: 'Perimeter adds all the sides around.'},
  half: {d: 'adds only two of the four sides', say: 'A rectangle has four sides to add.'},
  perim: {d: 'adds the sides instead of counting the squares inside', say: 'Area counts the squares inside.'},
  layer: {d: 'counts only one layer of the box', say: 'Count every layer of the box.'},
  place: {d: 'gives a digit the value of the place next to it', say: 'Each place is ten times the one to its right.'},
  oddPrime: {d: 'thinks every odd number is prime', say: 'Odd numbers can have factors too.'},
  divUp: {d: 'divides when the problem asks how many parts in all', say: 'Small parts fit many times into a whole.'},
  conv: {d: 'adds instead of multiplying when changing to a smaller unit', say: 'Smaller units need more of them. Multiply.'},
  minute: {d: 'counts the minute marks one five off', say: 'Count by fives to the last number, then by ones.'},
  sideP: {d: 'takes one side from the whole perimeter (forgets to halve it)', say: 'Half the perimeter is one long and one short side.'},
  mixTop: {d: 'keeps all the parts on top after taking out the wholes', say: 'Take the whole bars out of the top number.'},
});
// the reason the child builds from tiles: one sentence a code (its last three words are tiles)
const LS_WHY = {
  mulAdd: 'Times means equal groups', skip: 'Count the groups again', fact: 'Multiply back to check', mcarry: 'Add the traded ten',
  tens0: 'Tens parts end in zero', zeros: 'Count the zeros again', part: 'Add every part together', drop: 'Leftover tens become ones',
  remBig: 'The leftover must be smaller', zero0: 'Keep the zero in place', slip: 'Check each step again', trunc: 'Five or more rounds up',
  rup: 'Below five rounds down', unshaded: 'The top counts shaded parts', fpart: 'The bottom counts all parts', ticks: 'Count jumps not tick marks',
  flip: 'Shaded parts go on top', bigden: 'More parts means smaller pieces', addEq: 'Multiply top and bottom alike', oneSide: 'Divide both top and bottom',
  addBot: 'The bottom number stays the same', renameTop: 'Change the top number too', mulBot: 'The part size stays the same', topOnly: 'Multiply the bottoms too',
  mixAdd: 'Times means part of a part', dzero: 'Tenths come right after the point', longer: 'Compare the tenths first', point: 'Line up the points first',
  dpt: 'Count digits after the points', order: 'Times comes before plus', area: 'Perimeter adds every side', half: 'A rectangle has four sides',
  perim: 'Area counts the squares inside', layer: 'Count every layer', place: 'Check which place it is in', oddPrime: 'Odd numbers can have factors',
  divUp: 'Count how many parts fit', conv: 'Smaller units need more', minute: 'Count by fives first', sideP: 'Halve the perimeter first', mixTop: 'Take the wholes out', nocarry: 'Ten ones make a ten', cat: 'One digit fits each place',
  col: 'Take the bottom from the top', keep: 'The tens have one less', given: 'The shown number is not the answer', small: 'The open side faces the bigger',
  off1: 'Count each one once',
};
const LS_DECOY = ['bigger', 'smaller', 'more', 'less', 'left', 'right', 'first', 'last', 'top', 'bottom', 'ones', 'tens', 'adds', 'stays'];
// what a grown-up reads under "What we noticed" (82-report.js, LSREP in 52d-notebook.js)
if (typeof LSREP != 'undefined') Object.assign(LSREP.NOTE, {
  mulAdd: 'sometimes adds the two numbers when the problem multiplies', skip: 'sometimes counts one group too many or too few',
  fact: 'sometimes gives a times fact next to the right one', mcarry: 'sometimes forgets the ten carried over when multiplying',
  tens0: 'sometimes works a tens part as ones (2 × 60 as 12)', zeros: 'sometimes writes one zero too many or too few', part: 'sometimes leaves out a part of a bigger product',
  drop: 'sometimes drops what is left over when sharing a place', remBig: 'sometimes leaves a remainder bigger than the number it divides by',
  zero0: 'sometimes drops a zero inside a division answer', slip: 'makes small slips in long work', trunc: 'often rounds down when the number should round up',
  rup: 'often rounds up when the number should round down', unshaded: 'sometimes names the parts that are not shaded', fpart: 'sometimes puts shaded parts over unshaded parts',
  ticks: 'sometimes counts tick marks on a number line instead of jumps', flip: 'sometimes writes fractions upside down', bigden: 'often thinks a bigger bottom number makes a bigger fraction',
  addEq: 'sometimes adds the same number to top and bottom to make an equal fraction', oneSide: 'sometimes divides only the top or the bottom to simplify',
  addBot: 'sometimes adds the bottom numbers when adding fractions', renameTop: 'sometimes changes the bottom of a fraction but not the top',
  mulBot: 'sometimes multiplies the bottom too in a whole number times a fraction', topOnly: 'sometimes multiplies only the tops of two fractions',
  mixAdd: 'sometimes adds fractions when the problem multiplies them', dzero: 'sometimes mixes up tenths and hundredths', longer: 'often thinks a longer decimal is bigger',
  point: 'sometimes lines up the last digits instead of the decimal points', dpt: 'sometimes puts the decimal point in the wrong place', order: 'sometimes works left to right instead of times first',
  area: 'sometimes finds the area when asked for the perimeter', half: 'sometimes adds only two sides for a perimeter', perim: 'sometimes adds the sides when asked for the area',
  layer: 'sometimes counts only one layer of a box', place: 'sometimes reads a digit as worth the place next to it', oddPrime: 'sometimes thinks every odd number is prime',
  divUp: 'sometimes divides when finding how many parts fit', conv: 'sometimes adds when changing to a smaller unit', minute: 'sometimes counts the minute marks one five off',
  sideP: 'sometimes forgets to halve the perimeter when finding a missing side', mixTop: 'sometimes leaves the wholes in the top number of a mixed number',
});
// the pet's extra lines for the older kids (owner decision 3)
Object.assign(LS_TONE.kid, {mine: 'Give me a problem to solve.', work: 'Let me work it out.', tapStep: 'Which step has the slip? Tap it.', why: 'Now build the reason.'});
Object.assign(LS_TONE.teen, {mine: 'Give me a hard one.', work: 'Working it out.', tapStep: 'Find the step that is off.', why: 'Now the reason, in words.'});
Object.assign(LS_TONE.little, {mine: 'Give me a problem!', work: 'Let me try!', tapStep: 'Which step is wrong? Tap it.', why: 'Now tell me why.'});

/* ---- registering a lesson: its code now; its words when reviewed (LSW3), else the fallback words ---- */
function lsDraft3(id, D) {
  D.id = id;
  D.band = '35';
  LS_DRAFTED[id] = D;
  if (!LS_B35.includes(id)) LS_B35.push(id);
  return lsEnable3(id, typeof LSW3 != 'undefined' && LSW3[id] ? LSW3[id] : null);
}
// the hand-written fallback words of a lesson: the idea and tonight's question (written in 52j), a Name it line with the child's own
// numbers (D.fb), and each code's own reason; the engine's tone lines do the rest
function lsFallback(D) {
  return {idea: D.idea, home: D.home, beats: {remember: [], explore: [], name: [].concat(D.fb || [], D.idea), together: [], check: ['My turn.', 'I say {ans}.'], show: []},
    reasons: Object.fromEntries(D.bugs.map(c => [c, [BUGS[c].say]]))};
}
// make lesson id live with words W (a draft's JSON), or with its fallback words (W null); tools/test.js turns drafts on this way in Node
function lsEnable3(id, W) {
  const D = LS_DRAFTED[id], L = D && lsEnable(id, W || lsFallback(D));
  if (!L) return null;
  return Object.assign(L, {band: '35', fb: !W, g: D.g, chk: st => lsChk35(st)});
}

/* ---- Check me for grades 3 to 5 ---- */
// fix179: in the extra turns of Check me (st.chkN, the pet always wrong) there is no "your problem" (the child's numbers may allow no
// slip): the pet works numbers of its own that have a real slip (up to 20 draws), else a question with a wrong answer of its codes
function lsChk35(st) {
  const D = LS_DRAFTED[st.id];
  if (!st.chkN && D.fix && D.mine && (lsAge(gradeOf()) == 'teen' || st.r() < .5)) return [lsMineItem(st, D)];
  if (st.chkN && D.fix) for (let n = 0; n < 20; n++) { const it = lsStepsItem(st, D, D.fix.nums(st.r)); if (it && !it.petOk) return [it]; }
  return [(D.fix && lsStepsItem(st, D, D.fix.nums(st.r))) || lsPetItem35(st)];
}
// the find-the-mistake question's parts (k2Fix* in 49b-kinds2.js) for a label: {prob, lab, build(mis), muts, hint}, or null. The k2Fix
// functions hand these to k2FixQ, which picks a mistake at random; here k2FixQ is swapped for a moment so the lesson can choose
// (or choose none: the pet may be right)
function lsFixF(fn, q0) {
  const k0 = k2FixQ;
  let F = null;
  k2FixQ = (q, f) => { F = f; return null; };
  try { fn(q0); } catch (e) { F = null; } finally { k2FixQ = k0; }
  return F;
}
// a step's mistake as a misconception code
const lsFixCode = (D, [i, k]) => (typeof D.fix.code == 'function' ? D.fix.code(i, k) : D.fix.code[k]) || 'slip';
// the answer a list of steps ends with: what follows the last "= " (or ": ")
const lsLast = L => String(L[L.length - 1]).split(/= |: /).pop().trim();
const lsStepsHtml = (prob, lines, tap, mark) => `<div class="eq">${esc(prob)}</div><div class="fxs${tap ? '' : ' ls-fx'}">` + lines.map((t, j) => (tap
  ? `<div class="tp fxl" data-v="${j}">` : `<div class="fxl${j === mark ? ' ls-fixd' : ''}">`) + `<b class="fxn" aria-hidden="true">${j + 1}</b><span>${esc(t)}</span></div>`).join('') + '</div>';
// the pet works nums out in steps: right about PET_OK of the time; else one step slips, by the child's own idea when it is one of the
// lesson's, else the lesson's first that the numbers allow. Returns a judge item, or null when the numbers make no steps
function lsStepsItem(st, D, nums) {
  const L = st.L, T = lsTone(), f = lsFixF(D.fix.fn, {kind: 'num', label: D.fix.label(nums), html: '', say: ''});
  const ok = f && f.build(null);
  if (!ok || ok.length < 3 || ok.length > 5) return null;
  const held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
  const cands = f.muts.filter(([i, k]) => { const b = f.build({i, k}); return b && b.length == ok.length && b[i] !== ok[i] && b.every((t, j) => j >= i || t === ok[j]); });
  if (st.chkN && !cands.length) return null; // fix179: an extra Check me turn needs a slip these numbers allow
  const petOk = LS.petRight(st) || !cands.length;
  let mis = null;
  if (!petOk) {
    const pref = codes.map(c => cands.filter(m => lsFixCode(D, m) == c)).find(a => a.length) || cands;
    mis = pref[Math.floor(st.r() * pref.length)];
  }
  const lines = mis ? f.build({i: mis[0], k: mis[1]}) : ok, pv = lsLast(lines), sl = D.fix.sl(nums);
  const q = lsQ(L.sk, L.lv, 2, {pk: false, kind: 'tap', ans: String(mis ? mis[0] : 0), label: `${L.sk}${L.lv} fix ${f.lab}`, sl, vsay: D.fix.vsay,
    html: lsCap(T.tapStep) + lsStepsHtml(f.prob, lines, true), say: `${T.tapStep} ${k2Speak(f.prob)}.`, hint: {k: 'text', s: f.hint},
    ansSay: mis ? `Step ${mis[0] + 1}. It should say: ${k2Speak(ok[mis[0]])}.` : ''});
  q.bug = {};
  const claim = (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, sl, {ans: lsSayV(q, pv)}))[0]) || `I got ${lsSayV(q, pv)}.`;
  return {m: 'judge', q, pv, petOk, code: mis ? lsFixCode(D, mis) : null, steps: 1, pw: lsStepsHtml(f.prob, lines, false), lines: [T.myTurn, claim],
    after: () => [{m: 'ask', help: 1, fix: 1, q, lines: []},
      lsTilesItem(st, lsFixCode(D, mis), lsStepsHtml(f.prob, ok, false, mis[0]), [`Step ${mis[0] + 1} should say: ${k2Speak(ok[mis[0]])}.`])]};
}
// "your problem": the child sets the numbers (the pickn model); the pet works them out in its own announced turn
function lsMineItem(st, D) {
  const T = lsTone(), M = D.mine;
  const q = lsQ(st.L.sk, st.L.lv, 0, {pk: false, kind: 'make', model: 'pickn', raw: 1, goal: 'mine', eq: 'value', ans: '1', sl: {},
    m: {v: M.v.slice(), lo: M.lo, hi: M.hi, ds: M.ds, lab: M.lab, fmt: M.fmt, ok: M.ok}, html: lsCap(T.mine), say: M.say});
  return {m: 'open', mine: 1, q, lines: [T.myTurn, T.mine], nudge: M.nudge,
    on: (s, v) => {
      if (!lsOk(q, v)) return {ok: false, act: 'retry', lines: [M.nudge]};
      const nums = Array.isArray(v) ? v : q.m.v, pet = lsStepsItem(s, D, nums) || lsPetItem35(s);
      pet.lines = [lsTone().work].concat(pet.lines.slice(1));
      s.items.splice(s.i + 1, 0, pet);
      return {ok: true, act: 'next', lines: [], mood: 'happy'};
    }};
}
// can the pet's answer v be shown on question q? (num: in the pad's shape; the rest as batches 1 and 2)
function lsFits35(q, v) {
  if (q.kind == 'num') return (q.sep == 'R' ? /^\d+R\d+$/ : q.sep == 'mix' ? /^\d+ \d+\/[1-9]\d*$/ : q.pad == 'frac' ? /^\d+\/[1-9]\d*$/ : q.pad == 'dec' ? /^\d+(\.\d+)?$/ : /^\d+$/).test(String(v));
  return LS.fits(q, v);
}
// Check me on the model or the question (no written steps): the pet's answer by the child's idea, else the lesson's codes in order
function lsPetItem35(st) {
  const L = st.L, r = st.r, T = lsTone(), held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
  const petOk = LS.petRight(st);
  let q, pv = null, code = null;
  for (let n = 0; n < 40 && pv == null; n++) {
    q = L.q(L.petSt != null ? L.petSt : 1, r);
    if (petOk) { pv = q.ans; break; }
    for (const c of n < 30 ? codes : L.bugs) {
      const v = (knowPredict(q)[c] || []).find(x => String(x) !== q.ans && !lsOk(q, String(x)) && lsFits35(q, x));
      if (v != null) { pv = String(v); code = c; break; }
    }
  }
  if (pv == null) pv = q.ans;
  const ok = lsOk(q, pv), claim = (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, q.sl, {ans: lsSayV(q, pv)}))[0]) || LS.petSays(q, pv);
  const it = {m: 'judge', q, pv, petOk: ok, code, lines: [T.myTurn, claim]};
  it.after = () => [LS.fixItem(it), lsTilesItem(st, code, LS.petWork(q, q.ans), [])];
  return it;
}
// the reason from word tiles (the order kind, TEACH-PLAN-2 system B): the sentence frame is the reason's start; its last three words
// and two more are the tiles, in a shuffled order
function lsTilesItem(st, code, top, lines) {
  const s = LS_WHY[code] || LS_WHY.slip, w = s.split(' '), k = Math.min(3, w.length - 1), head = w.slice(0, w.length - k).join(' '), ans = w.slice(-k).map(x => x.toLowerCase());
  const dec = LS_DECOY.filter(x => !ans.includes(x)), extra = [];
  while (extra.length < 2) { const x = dec[Math.floor(st.r() * dec.length)]; if (!extra.includes(x)) extra.push(x); }
  const items = ans.concat(extra).map(x => ({v: x, l: x})), sh = items.map(x => [st.r(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  const T = lsTone(), q = {kind: 'order', sk: st.L.sk, lv: st.L.lv, st: 2, ans, items: sh, end: '.', label: `${st.L.sk}${st.L.lv} why ${code}`,
    html: `<div class="ls-fixtop">${top}</div><div class="sub ls-why">${esc(head)} …</div>`, say: `${T.why} ${head} ...`, hint: {k: 'text', s}, ansSay: s, sl: {}};
  return {m: 'ask', help: 1, fix: 1, why: code, q, lines: lines.concat([])};
}

/* ---- the workbench pieces (keys of K2MM, 49b-kinds2.js, added from here; Practice never uses them) ---- */
// a fraction as the app draws it, and as it is said
const ls3Fr = (n, d) => fcFr(n, d);
const ls3FrSay = v => { const m = /^(\d+) (\d+)\/(\d+)$/.exec(v) || /^()(\d+)\/(\d+)$/.exec(v); if (!m) return String(v); const f = +m[3] <= 12 ? fcSay(+m[2], +m[3]) : `${m[2]} over ${m[3]}`; return m[1] ? `${m[1]} and ${f}` : f; };
const ls3Say = v => (/\//.test(v) ? ls3FrSay(String(v)) : /R/.test(v) ? String(v).replace('R', ' remainder ') : /\./.test(v) ? k2SayNum(+v) : String(v));
// two fraction bars (fraction comparison, equal fractions): state [shaded on top, shaded below]; m.d [top parts, bottom parts],
// m.lock [true, false]: a bar the child does not change (it shows the given fraction); m.lab: write each bar's fraction beside it
function ls3Bars(s, d, o = {}) {
  const row = (n, dd, i) => `<div class="ls-bar">${o.lab ? `<span class="ls-barl">${ls3Fr(n, dd)}</span>` : ''}${VIZ.fracBar(n, dd, {w: 240}).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
  return `<div class="ls-bars" role="img" aria-label="two fraction bars">${row(s[0], d[0], 0)}${row(s[1], d[1], 1)}</div>`;
}
// a place-value chart: the digits of a number under their places (o.pl: the places, biggest first, as powers of ten; o.mark: the place
// to circle)
const LS_PVN = {5: 'Hundred thousands', 4: 'Ten thousands', 3: 'Thousands', 2: 'Hundreds', 1: 'Tens', 0: 'Ones', '-1': 'Tenths', '-2': 'Hundredths'};
const LS_PVS = {5: 'HTh', 4: 'TTh', 3: 'Th', 2: 'H', 1: 'T', 0: 'O', '-1': 't', '-2': 'h'}; // the chart's short heads (as on a classroom chart); each says its full name
function ls3Digit(v, p) { return Math.floor(Math.round(Math.abs(v) * 100) / Math.round(Math.pow(10, p + 2)) + 1e-9) % 10; }
function lsPvChart(v, pl, o = {}) {
  const rows = (o.rows || [v]).map(x => `<tr>${pl.map(p => `<td class="${p === o.mark ? 'ls-pvm' : ''}${p == 0 && pl.includes(-1) ? ' ls-pvo' : ''}">${o.blank ? '' : ls3Digit(x, p)}</td>`).join('')}</tr>`).join('');
  return `<table class="ls-pvc" aria-label="place value chart"><thead><tr>${pl.map(p => `<th scope="col" aria-label="${LS_PVN[p]}" title="${LS_PVN[p]}">${LS_PVS[p]}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
}
// the area model of a × b: a rectangle cut by b's tens and ones (and a's hundreds, tens and ones when o.split), each part's product
// shown (o.parts) or not
function lsAreaModel(a, b, o = {}) {
  const sp = n => String(n).split('').map((d, i, s) => +d * Math.pow(10, s.length - 1 - i)).filter(x => x), A = o.splitA ? sp(a) : [a], B = sp(b);
  const head = `<tr><th></th>${A.map(x => `<th scope="col">${x}</th>`).join('')}</tr>`;
  const body = B.map(y => `<tr><th scope="row">${y}</th>${A.map(x => `<td>${o.parts ? x * y : '?'}</td>`).join('')}</tr>`).join('');
  return `<table class="ls-area" aria-label="area model">${head}${body}</table>`;
}
if (typeof K2MM != 'undefined') {
  K2MM.bars2 = {
    raw: true,
    s0: () => [0, 0],
    val: (q, s) => `${s[0]}/${q.m.d[0]} ${s[1]}/${q.m.d[1]}`,
    ans: q => q.m.ans.slice(),
    step: (q, s, i, d) => { if ((q.m.lock || [])[i]) return null; const o = s.slice(); o[i] += d; return o[i] < 0 || o[i] > q.m.d[i] ? null : o; },
    draw: (q, s) => ls3Bars(s, q.m.d, {lab: q.m.lab}),
    ctl: q => `<div class="mmc mmcol">${['Top bar', 'Bottom bar'].map((l, i) => ((q.m.lock || [])[i] ? '' : mmRow(l, i, true))).join('')}</div>`,
    of: (q, v) => (Array.isArray(v) ? v : String(v).split(' ').map(x => +x.split('/')[0])),
    fits: () => true,
  };
  // a place-value chart to build on: one stepper a place (0 to 9); state: the digits, biggest place first
  K2MM.pvc = {
    raw: true,
    s0: q => q.m.pl.map(() => 0),
    val: (q, s) => k2Clean(s.reduce((a, x, i) => a + x * Math.pow(10, q.m.pl[i]), 0)),
    ans: q => q.m.pl.map(p => ls3Digit(+q.ans, p)),
    step: (q, s, i, d) => (s[i] + d < 0 || s[i] + d > 9 ? null : s.map((x, j) => (j == i ? x + d : x))),
    draw: (q, s) => lsPvChart(K2MM.pvc.val(q, s), q.m.pl),
    ctl: q => `<div class="mmc mmcol ls-pvctl">${q.m.pl.map((p, i) => mmRow(LS_PVN[p], i, false)).join('')}</div>`,
    of: (q, v) => q.m.pl.map(p => ls3Digit(+v, p)),
    fits: (q, v) => isFinite(+v) && +v >= 0 && Math.abs(K2MM.pvc.val(q, K2MM.pvc.of(q, v)) - +v) < 1e-9,
  };
  // "your problem": steppers for the numbers of a problem the child sets (m.v the start, m.lo / m.hi / m.ds the range and steps,
  // m.lab the rows' names, m.fmt(state) the problem as written)
  K2MM.pickn = {
    raw: true,
    s0: q => q.m.v.slice(),
    val: (q, s) => s.join(','),
    ans: q => q.m.v.slice(),
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < q.m.lo[i] || o[i] > q.m.hi[i] ? null : o; },
    draw: (q, s) => `<div class="eq ls-mine">${esc(q.m.fmt(s))}</div>`,
    ctl: q => `<div class="mmc mmcol">${q.m.lab.map((l, i) => mmRow(l, i, false, q.m.ds[i])).join('')}</div>`,
  };
}
// the checkers the new pieces use (LSGOAL, 52b-know.js): a raw state, or (for the simulated children) a value
Object.assign(LSGOAL, {
  // both bars as the question says (fraction comparison: build both)
  two: (q, v) => Array.isArray(v) && v[0] == q.m.ans[0] && v[1] == q.m.ans[1],
  // the bottom bar shaded as much as the top (equal fractions, simplest form)
  equiv: (q, v) => Array.isArray(v) && v[1] * q.m.d[0] == v[0] * q.m.d[1] && v[0] == q.m.ans[0],
  // any shading on either bar
  shade: (q, v) => Array.isArray(v) && (v[0] > 0 || v[1] > 0),
  // "your problem": numbers the pet can work with
  mine: (q, v) => Array.isArray(v) && v.every((x, i) => x >= q.m.lo[i] && x <= q.m.hi[i]) && (!q.m.ok || q.m.ok(v)),
  // an array of q.m.n dots (any rows): r × c from the array kind
  arrN: (q, v) => { const m = Array.isArray(v) ? ['', ...v] : /^(\d+)×(\d+)$/.exec(String(v)); return !!m && +m[1] * +m[2] == q.m.n && (!q.m.big || +m[1] > 1 && +m[2] > 1); },
  // a factor of q.m.n other than 1 and itself (typed)
  factor: (q, v) => /^\d+$/.test(String(v)) && +v > 1 && +v < q.m.n && q.m.n % +v == 0,
  // some shading (a parts model's value, or a count)
  some: (q, v) => k2Val(v) > 0,
  // both bars shaded the same amount (any way: Explore)
  same: (q, v) => Array.isArray(v) && v[0] > 0 && v[0] * q.m.d[1] == v[1] * q.m.d[0],
  // a number line pin anywhere but where it starts
  pin: (q, v) => isFinite(+v) && String(+v) !== String(+q.start),
});
/* ---------- TEACH-3: the grade 3 to 5 math lessons (part teach35, after teach and teach12; TEACH-PLAN-2 batch 3) ----------
   Each lesson is code (here) and words (a draft in docs/drafts/<stop>.md; until the owner reviews it, the fallback words of
   52i-bench35.js). The code of a lesson (lsDraft3) is a family builder called with its stop: every number, the questions at each stage
   (0 build on a model, 1 a picture, 2 symbols; 3 a typed item for a stop whose symbols are a choice), the Explore task, the Name it
   picture, a warm-up on the idea it builds on, the misconception codes the pet may show (q.bug on every question), the pet's written
   steps for Check me (fix: a k2Fix* function of 49b-kinds2.js, the label it reads, the codes of its mistakes) and "your problem"
   (mine: the steppers' ranges). Words are lines with {slots} (brief and slots say which numbers each beat has; tools/author.js gives
   both to the drafting model and checks each draft against them). The idea and tonight's question (home) here are the hand-written
   fallback; a reviewed draft's own replace them. Ages: grades 3 and 4 hear the older kid, grade 5 (and a 6th grader on these
   lessons) the teen-like partner (lsAge, 52c-scripts.js). */
const ls3 = (id, t, g, o) => lsSk(id, Object.assign({t, g, test: 2}, o));
const ls3Rows = n => [6, 5, 4, 3].find(c => n % c == 0 && n / c <= 10);
const ls3Seq = (n, k) => Array.from({length: n}, (_, i) => k * (i + 1));
// the "your problem" steppers: two numbers (o.lab, o.lo, o.hi, o.ds: the step sizes of each row), a problem format, a check
const ls3Mine = (v, lo, hi, ds, lab, fmt, ok, say) => ({v, lo, hi, ds, lab, fmt, ok, say: say || 'Set the numbers. Then check.', nudge: 'Pick numbers I can work with, then check.'});
// an "any way you like" array (Explore): the rows and how many in each are the child's
const ls3ArrExp = (D, say, react) => () => ({q: lsDq(D, 0, {kind: 'make', model: 'array', m: {r: 3, c: 4}, eq: 'exact', ans: 12, goal: 'any', raw: 1, sl: {}, demo: '3×4',
  html: lsCap('Make any array you like.'), say}), nudge: 'Set the rows and how many in each row, then check.',
react: v => { const [a, b] = Array.isArray(v) ? v : /×/.test(v) ? String(v).split('×').map(Number) : [3, 4]; return react(a, b); }});
// a times fact to type (the warm-up of the dividing lessons)
const ls3WarmFact = (D, lo, hi) => r => { const a = lsRi(r, 2, 9), b = lsRi(r, lo, hi); return lsDq(D, 0, {kind: 'num', ans: a * b, html: lsEq(`${a} × ${b} = ${SLOT}`), say: `${a} times ${b} equals what?`,
  sl: {a, b}, hint: {k: 'text', s: `Count by ${b}s, ${a} times.`}, bug: {mulAdd: [a + b]}}); };

/* ---- times facts on arrays: Arrays, Easy Times Facts, Times 3 & 4, Times 6 to 9, All Times Facts ---- */
const LS3_BRIEF_FACT = `Explore: the child makes any array (rows of dots) with steppers for the rows and how many in each row (no slots in the task).
Name it: the array they made; lines on it (slots {a}: the rows, {b}: how many in each row, {sum}: how many in all) and the idea: rows times how many in each row.
Together (slots {a} {b}; never how many in all, the answer): line 1 before building {a} rows of {b} on the array, line 2 before a picture of an array (they type how many in all), line 3 before the fact in symbols only.
Remember: a warm-up: skip counting (slot {k}: the step).
Show: two times facts to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3Fact(id, t, g, pick, k, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['skip', 'mulAdd'], brief: LS3_BRIEF_FACT, idea, home, fb: '{a} rows of {b} make {sum}.',
    slots: {remember: ['k'], explore: [], name: ['a', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a * b, sl = {a, b}, bug = {skip: [c - b, c + b], mulAdd: [a + b]};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.array(a, b)}<div>Count by ${b}s, ${a} times: ${ls3Seq(Math.min(a - 1, 3), b).join(', ')} …</div></div>`, w: `Count by ${b}s, ${a} times.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'array', m: {r: a, c: b}, eq: 'exact', ans: c, ansSay: `${a} rows of ${b}`, sl, bug, hint,
      html: lsEq(`${a} × ${b}`) + lsCap(`Make ${a} rows of ${b}.`), say: `${a} times ${b}. Make ${a} rows of ${b}.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${VIZ.array(a, b)}</div>` + lsEq(`${a} × ${b} = ${SLOT}`), say: `${a} rows of ${b}. How many in all?`});
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${a} × ${b} = ${SLOT}`), say: `${a} times ${b} equals what?`});
  };
  D.warm = r => lsSeqQ(D, 0, k * lsRi(r, 1, 5), k);
  D.exp = ls3ArrExp(D, 'Make any array you like. Set the rows, then how many in each row.', (a, b) => ({ctx: {a, b, sum: a * b}, lines: [`${a} rows of ${b} make ${a * b}.`]}));
  D.name = c => ({html: `<div class="pkq">${VIZ.array(c.a, c.b)}</div>` + lsEq(`${c.a} × ${c.b} = ${c.sum}`), sl: c});
  return D;
}

/* ---- dividing on arrays: Easy Dividing, Divide by 3 & 4, Divide by 6 to 9, All Dividing; Factors & Multiples ---- */
const LS3_BRIEF_DIVF = `Explore: the child makes an array of {n} dots any way they like (any rows).
Name it: the array they made; lines on it (slots {n}: all the dots, {a}: the rows, {b}: how many in each row) and the idea: dividing finds how many rows (or how many in each row).
Together (slots {n}: all the dots, {b}: how many in each row; never the rows, the answer): line 1 before building {n} dots in rows of {b}, line 2 before a picture of the array (they type how many rows), line 3 before the division in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two divisions to type, no help, inside a small job in the world (slots {n} {b}).`;
const LS3_BRIEF_FCT = `Explore: the child makes an array of {n} dots any way they like (more than one row).
Name it: the array they made; lines on it (slots {n}: all the dots, {a}: the rows, {b}: how many in each row) and the idea: the rows and the row length are factors of the number.
Together (slots {n}: the number, {a}: one factor; never the other factor, the answer): line 1 before building {n} dots in {a} rows, line 2 before a picture of the array (they type the other factor), line 3 before the same in symbols.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two missing factors to type, no help, inside a small job in the world (slots {n} {a}).`;
function ls3Div(id, t, g, pick, idea, home, fct) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['fact', 'given'], brief: fct ? LS3_BRIEF_FCT : LS3_BRIEF_DIVF, idea, home, fb: fct ? '{n} is {a} times {b}.' : '{n} in rows of {b} makes {a} rows.',
    slots: {remember: ['a', 'b'], explore: ['n'], name: ['n', 'a', 'b'], together: fct ? ['n', 'a'] : ['n', 'b'], check: ['ans'], show: fct ? ['n', 'a'] : ['n', 'b']}});
  D.q = (st, r) => {
    const [b, a] = pick(r), n = a * b, sl = fct ? {n, a: b} : {n, b}, bug = {fact: [a - 1, a + 1].filter(x => x > 0), given: [b, n]};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.array(Math.min(a, 2), b)}<div>Count by ${b}s until you reach ${n}. Count the rows.</div></div>`, w: `Count by ${b}s up to ${n}.`};
    // fct: the rows are given (b of them) and the child finds how many in each (a): the array is b rows of a
    if (st == 0) return fct ? lsDq(D, 0, {kind: 'make', model: 'array', m: {r: b, c: a}, eq: 'exact', ans: n, ansSay: `${b} rows of ${a}`, sl, bug: {}, hint,
      html: lsEq(n) + lsCap(`Make ${n} in ${b} equal rows.`), say: `Make ${n} dots in ${b} equal rows.`})
      : lsDq(D, 0, {kind: 'make', model: 'array', m: {r: a, c: b}, eq: 'exact', ans: n, ansSay: `${a} rows of ${b}`, sl, bug: {}, hint,
        html: lsEq(`${n} ÷ ${b}`) + lsCap(`Make ${n} in rows of ${b}.`), say: `${n} divided by ${b}. Make ${n} dots in rows of ${b}.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: a, sl, bug, hint, html: `<div class="pkq">${fct ? VIZ.array(b, a) : VIZ.array(a, b)}</div>`
      + lsEq(fct ? `${n} = ${b} × ${SLOT}` : `${n} ÷ ${b} = ${SLOT}`), say: fct ? `${n} dots in ${b} rows. How many in each row?` : `${n} dots in rows of ${b}. How many rows?`});
    return lsDq(D, 2, {kind: 'num', ans: a, sl, bug, hint, html: lsEq(fct ? `${n} = ${b} × ${SLOT}` : `${n} ÷ ${b} = ${SLOT}`), say: fct ? `${n} equals ${b} times what?` : `${n} divided by ${b} equals what?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = r => {
    const n = [12, 16, 18, 20, 24][Math.floor(r() * 5)];
    return {q: lsDq(D, 0, {kind: 'make', model: 'array', m: {r: n / ls3Rows(n), c: ls3Rows(n), n, big: 1}, eq: 'exact', ans: n, goal: 'arrN', raw: 1, sl: {n}, demo: [2, n / 2],
      html: lsEq(n) + lsCap(`Make ${n} dots in equal rows, any way.`), say: `Make ${n} dots in equal rows, any way you like.`}), nudge: `Make exactly ${n} dots, more than one row.`,
    react: v => { const [a, b] = Array.isArray(v) ? v : /×/.test(v) ? String(v).split('×').map(Number) : [2, n / 2]; return {ctx: {n, a, b}, lines: [`${a} rows of ${b} make ${n}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${VIZ.array(c.a, c.b)}</div>` + lsEq(fct ? `${c.n} = ${c.a} × ${c.b}` : `${c.n} ÷ ${c.b} = ${c.a}`), sl: c});
  return D;
}
// Prime or Composite: a composite number makes an array with more than one row; the test and Show items ask for a factor (typed)
const LS3_BRIEF_PRIME = `Explore: the child makes an array of {n} dots any way they like (more than one row).
Name it: the array they made; lines on it (slots {n}: all the dots, {a}: the rows, {b}: how many in each row) and the idea: a composite number makes an array with more than one row; a prime number makes only one row.
Together (slot {n}: the number; never whether it is prime): line 1 before building {n} dots in more than one row, line 2 before choosing prime or composite for {n}, line 3 the same with no picture.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two numbers; the child types a factor that is not 1 or the number itself, no help, inside a small job in the world (slot {n}).`;
function ls3Prime(id, t, g, idea, home) {
  const D = ls3(id, t, g, {test: 3, petSt: 1, bugs: ['oddPrime'], brief: LS3_BRIEF_PRIME, idea, home, fb: '{n} is {a} times {b}.',
    slots: {remember: ['a', 'b'], explore: ['n'], name: ['n', 'a', 'b'], together: ['n'], check: ['ans'], show: ['n']}});
  const SP = [21, 33, 35, 39, 51, 55, 57, 65, 77, 85, 91, 95], PR = [17, 19, 23, 29, 31, 37, 41, 43, 47, 53], CO = [24, 28, 30, 32, 36, 40, 42, 45, 48, 27, 49, 63];
  D.q = (st, r) => {
    if (st == 3) { const n = SP[Math.floor(r() * SP.length)]; return lsDq(D, 2, {kind: 'num', ans: SP.includes(n) ? [3, 5, 7].find(p => n % p == 0) : 2, goal: 'factor', m: {n}, sl: {n},
      html: lsEq(n) + lsCap(`Type a factor of ${n}. Not 1 or ${n}.`) + SLOT, say: `Type a factor of ${n} that is not 1 and not ${n}.`, bug: {oddPrime: [1, n]},
      hint: {k: 'text', s: 'Try dividing by 3, 5 and 7.'}}); }
    if (st == 0) { const n = CO[Math.floor(r() * CO.length)], a = [3, 4, 5, 6, 7].find(x => n % x == 0 && n / x <= 10);
      return lsDq(D, 0, {kind: 'make', model: 'array', m: {r: a, c: n / a, n, big: 1}, eq: 'exact', ans: n, goal: 'arrN', raw: 1, sl: {n},
        html: lsEq(n) + lsCap(`Make ${n} in more than one row.`), say: `Make ${n} dots in equal rows, more than one row.`, hint: {k: 'text', s: `Try ${a} rows.`}}); }
    const n = r() < .65 ? SP.concat(CO.filter(x => x % 2))[Math.floor(r() * 16)] : PR[Math.floor(r() * PR.length)], ans = PR.includes(n) ? 'prime' : 'composite';
    return lsPick(D.sk, D.lv, st, ans, lsEq(n) + lsCap(st == 1 ? 'Prime or composite? Try dividing by 3, 5 and 7.' : 'Prime or composite?') + SLOT,
      `Is ${n} prime or composite?`, [['prime', 'Prime'], ['composite', 'Composite']], {pk: false, sl: {n}, bug: {oddPrime: ans == 'composite' ? ['prime'] : []},
        hint: {k: 'text', s: 'A composite number has a factor besides 1 and itself. Try 3, 5 and 7.'}, after: `${n} is ${ans}.`});
  };
  D.warm = ls3WarmFact(D, 3, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'array', m: {r: 4, c: 6, n: 24, big: 1}, eq: 'exact', ans: 24, goal: 'arrN', raw: 1, sl: {n: 24}, demo: [4, 6],
    html: lsEq(24) + lsCap('Make 24 in equal rows, any way.'), say: 'Make 24 dots in equal rows, any way you like.'}), nudge: 'Make exactly 24 dots, more than one row.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [4, 6]; return {ctx: {n: 24, a, b}, lines: [`${a} rows of ${b} make 24.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.array(c.a, c.b)}</div>` + lsEq(`${c.n} = ${c.a} × ${c.b}`), sl: c});
  return D;
}

/* ---- multiplying with blocks: Times Tens & Hundreds, Times 11 & 12, 2-Digit Times 1-Digit, Big Times 1-Digit ----
   Stage 0 puts every group's blocks in (each place times the number) and the child trades ten of a place for one of the next; stage 1
   the blocks and a typed product; stage 2 the symbols. */
const LS3_BRIEF_BMUL = `Explore: the child makes any number with blocks (rods are tens, little cubes are ones, flats are hundreds); the app then says how much that many groups of it makes (no slots in the task).
Name it: the blocks of a product; lines on it (slots {n}: the number they made, {b}: how many groups, {sum}: the product) and the idea: multiply each place, then trade ten of a place for one of the next.
Together (slots {a} {b}: the problem {a} times {b}; never the product, the answer): line 1 before a build (every group's blocks are in; they trade ten for one of the next place), line 2 before a picture of the blocks (they type the product), line 3 before the problem in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two products to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3BMul(id, t, g, kind, bugs, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs, brief: LS3_BRIEF_BMUL, idea, home, fb: '{b} groups of {n} make {sum}.',
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  // [a, b, the blocks of every group (biggest place first) or null when nothing needs trading, places]
  const pick = r => {
    for (;;) {
      let a, b;
      if (kind == 'tens') { a = lsRi(r, 2, 9); const big = r() < .35, k = lsRi(r, 2, big ? 4 : 9); b = big ? 100 * k : 10 * k; if (big && a * k > 9) continue; }
      else if (kind == 'el') { b = r() < .5 ? 11 : 12; a = lsRi(r, 2, 9); }
      else if (kind == '2d') { a = lsRi(r, 12, 49); b = lsRi(r, 2, 5); if (!(a % 10) || (a % 10) * b < 10 || (a % 10) * b > 19 || Math.floor(a / 10) * b > 19) continue; }
      else { a = lsRi(r, 102, 399); b = lsRi(r, 2, 4); const d = lsDigits(a, 3); if (d[2] * b < 10 || d.some(x => x * b > 19) || a * b > 999 || !d[2]) continue; }
      const c = a * b, pl = c >= 100 ? 3 : 2;
      const s = kind == 'tens' ? (b >= 100 ? null : a * b / 10 >= 10 ? [0, a * b / 10, 0] : null) : kind == 'el' ? lsDigits(b, pl).map(x => x * a)
        : lsDigits(a, pl).map(x => x * b);
      const s0 = s && s.some(x => x > 9) ? s : null;
      return [a, b, s0, pl];
    }
  };
  D.q = (st, r) => {
    const [a, b, s0, pl] = pick(r), c = a * b, sl = {a, b}, mc = (kind == 'el' ? lsDigits(b, pl).map(x => x * a) : lsDigits(a, pl).map(x => x * b)).reduce((s, x) => s * 10 + x % 10, 0);
    const bug = kind == 'tens' ? {tens0: [c / 10], zeros: [c * 10]} : {mcarry: [mc], tens0: [kind == 'el' ? a + a * (b - 10) : lsDigits(a, 3).reduce((s, x) => s + x * b, 0)],
      skip: kind == 'el' ? [c - b, c + b] : []};
    const hint = {k: 'html', html: `<div class="pkhint">${lsBlocks(s0 || lsDigits(c, pl))}<div>Multiply each place. Ten of a place trade for one of the next.</div></div>`,
      w: 'Multiply each place. Trade ten for one of the next place.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'regroup', eq: 'value', ans: c, sl, bug, hint, s0,
      html: lsEq(`${a} × ${b}`) + lsCap(s0 ? 'All the blocks are in. Trade so each place has nine or fewer.' : 'Make the answer with blocks.'),
      say: s0 ? `${a} times ${b}. All the blocks are in. Trade ten for one of the next place.` : `${a} times ${b}. Make the answer with blocks.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${lsBlocks(s0 || lsDigits(c, pl))}</div>` + lsEq(`${a} × ${b} = ${SLOT}`),
      say: `${a} times ${b} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${a} × ${b} = ${SLOT}`), say: `${a} times ${b} equals what?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  const k = kind == 'tens' ? 3 : kind == 'el' ? 12 : 3;
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 2}, goal: 'moved', eq: 'value', ans: 23, sl: {}, demo: [2, 3],
    html: lsCap('Make any number with blocks!'), say: `Make any number with rods and cubes. I will show you ${k} groups of it.`}), nudge: 'Put in some blocks, then check.',
  react: v => { const n = lsVal({model: 'b10r', m: {places: 2}}, v); return {ctx: {n, b: k, sum: n * k}, lines: [`${k} groups of ${n} make ${n * k}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.sum, c.sum >= 100 ? 3 : 2))}</div>` + lsEq(`${c.b} × ${c.n} = ${c.sum}`), sl: c});
  if (kind == '2d' || kind == '3d') {
    D.fix = {fn: k2FixMbig, nums: r => pick(r).slice(0, 2), label: ([a, b]) => `${a} × ${b} = ?`, sl: ([a, b]) => ({a, b}), code: {zero: 'tens0'}};
    D.mine = kind == '2d' ? ls3Mine([24, 3], [12, 2], [99, 9], [[1, 10], [1]], ['Number', 'Times'], s => `${s[0]} × ${s[1]}`, s => s[0] % 10 > 0)
      : ls3Mine([132, 3], [102, 2], [999, 9], [[1, 10, 100], [1]], ['Number', 'Times'], s => `${s[0]} × ${s[1]}`, s => String(s[0]).split('').filter(x => x != '0').length >= 2);
  }
  return D;
}

/* ---- multiplying with the area model: 2-Digit Times 2-Digit, 3-Digit Times 2-Digit ---- */
const LS3_BRIEF_AREA = `Explore: the child picks any two numbers to multiply with steppers (no slots in the task); the app shows the area model of them.
Name it: the area model of their numbers, cut into tens and ones with each part's product; lines on it (slots {a} {b}: the numbers, {sum}: the product) and the idea: multiply each part, then add the parts.
Together (slots {a} {b}: the problem; never the product, the answer): line 1 before an area model with every part's product shown (they add the parts), line 2 before an area model with the parts empty (they type the product), line 3 before the problem in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two products to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3Area(id, t, g, big, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['tens0', 'part', 'slip'], brief: LS3_BRIEF_AREA, idea, home, fb: '{a} times {b} is {sum}.',
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => { for (;;) { const a = big ? lsRi(r, 102, 499) : lsRi(r, 12, 49), b = lsRi(r, 12, big ? 29 : 49); if (a % 10 && b % 10) return [a, b]; } };
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a * b, o = b % 10, tn = b - o, sl = {a, b}, bug = {tens0: [a * o + a * tn / 10], part: [a * o, a * tn], slip: [c + 10, c - 10]};
    const hint = {k: 'html', html: `<div class="pkhint">${lsAreaModel(a, b, {parts: true, splitA: !big})}<div>Add the parts: ${a * tn} + ${a * o}.</div></div>`, w: 'Multiply each part, then add the parts.'};
    if (st == 0) return lsDq(D, 0, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${lsAreaModel(a, b, {parts: true, splitA: !big})}</div>` + lsCap('Add the parts.') + lsEq(`${a} × ${b} = ${SLOT}`),
      say: `${a} times ${b}. Add the parts of the area model.`, max: 6});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${lsAreaModel(a, b, {splitA: !big})}</div>` + lsEq(`${a} × ${b} = ${SLOT}`),
      say: `${a} times ${b} equals what? Work out each part.`, max: 6});
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${a} × ${b} = ${SLOT}`), say: `${a} times ${b} equals what?`, max: 6});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: big ? [123, 14] : [23, 14], lo: [big ? 101 : 11, 11], hi: [big ? 499 : 49, 49], ds: [big ? [1, 10, 100] : [1, 10], [1, 10]],
    lab: ['First number', 'Second number'], fmt: s => `${s[0]} × ${s[1]}`}, raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {},
    html: lsCap('Pick any two numbers to multiply.'), say: 'Pick any two numbers to multiply.'}), nudge: 'Change a number, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [23, 14]; return {ctx: {a, b, sum: a * b}, lines: [`${a} times ${b} is ${a * b}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsAreaModel(c.a, c.b, {parts: true, splitA: !big})}</div>` + lsEq(`${c.a} × ${c.b} = ${c.sum}`), sl: c});
  D.fix = {fn: k2FixMbig, nums: pick, label: ([a, b]) => `${a} × ${b} = ?`, sl: ([a, b]) => ({a, b}), code: {zero: 'tens0'}};
  D.mine = big ? ls3Mine([215, 23], [101, 11], [999, 99], [[1, 10, 100], [1, 10]], ['First number', 'Second number'], s => `${s[0]} × ${s[1]}`, s => s[1] % 10 > 0)
    : ls3Mine([23, 14], [11, 11], [99, 99], [[1, 10], [1, 10]], ['First number', 'Second number'], s => `${s[0]} × ${s[1]}`, s => s[1] % 10 > 0);
  return D;
}

/* ---- dividing with blocks: Divide 2-Digit Numbers, Divide with Leftovers, Divide Big Numbers ----
   Stage 0 shows the number's blocks and the child builds ONE of the equal groups; stage 1 the blocks and a typed answer; stage 2 the
   symbols. A leftover is typed after R. */
const LS3_BRIEF_DIVB = `Explore: the child picks a number and how many equal groups to share it into, with steppers (no slots in the task); the app says how many in each group and how many are left.
Name it: the blocks of one group; lines on it (slots {n}: the number shared, {b}: the groups, {a}: in each group, {k}: left over) and the idea: share the biggest place first; leftovers break into the next place.
Together (slots {n}: the number, {b}: the groups; never the answer): line 1 before building one of {b} equal groups from {n}'s blocks, line 2 before a picture of {n}'s blocks (they type the answer), line 3 before the division in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two divisions to type, no help, inside a small job in the world (slots {n} {b}).`;
function ls3DivB(id, t, g, kind, bugs, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs, brief: LS3_BRIEF_DIVB, idea, home, fb: kind == 'rem' ? '{n} shared into {b} groups is {a} each, {k} left over.' : '{n} shared into {b} groups is {a} each.',
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'b', 'a', 'k'], together: ['n', 'b'], check: ['ans'], show: ['n', 'b']}});
  const pick = r => {
    for (;;) {
      const d = lsRi(r, 2, kind == 'big' ? 6 : 6), q = kind == 'big' ? lsRi(r, 101, Math.floor(999 / d)) : lsRi(r, 11, Math.floor(99 / d)), m = kind == 'rem' ? lsRi(r, 1, d - 1) : 0, n = q * d + m;
      if (n > (kind == 'big' ? 999 : 99) || n < (kind == 'big' ? 200 : 20)) continue;
      const lead = +String(n)[0];
      if (lead % d == 0 && r() < .7) continue; // most need a trade of the first place
      return [n, d, q, m];
    }
  };
  D.q = (st, r) => {
    const [n, d, q, m] = pick(r), pl = String(n).length, ql = q >= 100 ? 3 : 2, sl = {n, b: d}, ans = m ? `${q}R${m}` : q;
    const drop = +String(n).split('').map(x => Math.floor(+x / d)).join(''), vs = m ? x => String(x).replace('R', ' remainder ') : null;
    const bug = m ? {remBig: [`${q - 1}R${m + d}`], drop: drop != q ? [`${drop}R${m}`] : []} : {drop: [drop], zero0: /\d0/.test(String(q)) ? [+String(q).replace(/(\d)0/, '$1')] : [], slip: [q + 1, q - 1]};
    const hint = {k: 'text', s: `Share the biggest place first. What is left breaks into the next place.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: ql, target: q}, goal: 'value', eq: 'value', ans: q, sl, bug: {}, hint,
      html: `<div class="pkq">${lsBlocks(lsDigits(n, pl))}</div>` + lsEq(`${n} ÷ ${d}`) + lsCap(`Share into ${d} equal groups. Make one group.${m ? ' Some are left over.' : ''}`),
      say: `${n} divided by ${d}. Share the blocks into ${d} equal groups, and make one group.`});
    const o = m ? {sep: 'R', vsay: vs} : {};
    if (st == 1) return lsDq(D, 1, Object.assign({kind: 'num', ans, sl, bug, hint, html: `<div class="pkq">${lsBlocks(lsDigits(n, pl))}</div>` + lsEq(`${n} ÷ ${d} = ${m ? SLOT_R : SLOT}`),
      say: `Share ${n} into ${d} equal groups. How many in each?${m ? ' And how many are left?' : ''}`}, o));
    return lsDq(D, 2, Object.assign({kind: 'num', ans, sl, bug, hint, html: lsEq(`${n} ÷ ${d} = ${m ? SLOT_R : SLOT}`), say: `${n} divided by ${d} equals what?`}, o));
  };
  D.warm = ls3WarmFact(D, 2, 6);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: [57, 4], lo: [10, 2], hi: [99, 9], ds: [[1, 10], [1]], lab: ['Number', 'Groups'], fmt: s => `${s[0]} ÷ ${s[1]}`},
    raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {}, html: lsCap('Pick a number to share, and how many groups.'), say: 'Pick a number to share, and how many equal groups.'}),
  nudge: 'Change a number, then check.',
  react: v => { const [n, b] = Array.isArray(v) ? v : [57, 4], a = Math.floor(n / b), k = n % b; return {ctx: {n, b, a, k}, lines: [`${n} shared into ${b} groups is ${a} each${k ? `, and ${k} left over` : ''}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.a, c.a >= 100 ? 3 : 2))}</div>` + lsEq(`${c.n} ÷ ${c.b} = ${c.a}${c.k ? ' R' + c.k : ''}`), sl: c});
  D.fix = {fn: k2FixDiv, nums: r => pick(r).slice(0, 2), label: ([n, d]) => `${n} ÷ ${d} = ?`, sl: ([n, d]) => ({n, b: d}), code: {rem: 'remBig', zero: 'zero0'}, vsay: v => String(v).replace(/ ?R ?/, ' remainder ')};
  D.mine = kind == 'big' ? ls3Mine([432, 3], [100, 2], [999, 9], [[1, 10, 100], [1]], ['Number', 'Groups'], s => `${s[0]} ÷ ${s[1]}`, s => s[0] >= s[1] * 10)
    : ls3Mine([57, 4], [20, 2], [99, 9], [[1, 10], [1]], ['Number', 'Groups'], s => `${s[0]} ÷ ${s[1]}`, s => s[0] >= s[1] * 2);
  return D;
}

/* ---- taking away 3-digit numbers with blocks: 3-Digit Take Away, Take Away Across Zeros ---- */
const LS3_BRIEF_SUB = `Explore: the child has a number's blocks (flats are hundreds, rods tens, cubes ones) and takes away as many as they like (slot {a}: the blocks they start with).
Name it: the blocks left; lines on what they did (slots {a} {b} {diff}: they had {a}, took {b}, {diff} are left) and the idea: when a place runs out, break one from the next place.
Together (slots {a} {b}; never the answer): line 1 before a build (take {b} away from {a}'s blocks, breaking a hundred or a ten when a place runs out), line 2 before a picture of {a}'s blocks (they type what is left), line 3 before the problem in columns.
Remember: a warm-up: make a number with blocks (slot {n}).
Show: two take-aways in columns to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3Sub(id, t, g, zero, idea, home) {
  const D = ls3(id, t, g, {bugs: ['col', 'keep', 'slip'], brief: LS3_BRIEF_SUB, idea, home, fb: '{a} take away {b} leaves {diff}.',
    slots: {remember: ['n'], explore: ['a'], name: ['a', 'b', 'diff'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => {
    for (;;) {
      const a = zero ? lsRi(r, 2, 9) * 100 + (r() < .3 ? 0 : 0) + lsRi(r, 0, 8) : lsRi(r, 301, 989), b = lsRi(r, 101, a - 50), x = lsDigits(a, 3), y = lsDigits(b, 3);
      if (zero ? x[1] == 0 && y[2] > x[2] && y[1] > 0 : y[2] > x[2] && x[1] > 0 && a - b >= 10) return [a, b];
    }
  };
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a - b, sl = {a, b, diff: c}, ab = [a, b, '-'], bug = {slip: [c + 10, c - 10]};
    const hint = {k: 'html', w: 'Take away the ones first. Not enough? Break one from the next place.',
      html: `<div class="pkhint">${lsBlocks(lsDigits(a, 3))}<div>Take away the ones first. Not enough? Break one from the next place.</div></div>`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 3, target: c}, goal: 'value', eq: 'value', ans: c, ab, sl, bug, hint, s0: lsDigits(a, 3),
      html: lsEq(`${a} − ${b}`) + lsCap(`Take away ${b}.`), say: `${a} take away ${b}. Take the blocks away.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, 3))}</div>` + lsEq(`${a} − ${b} = ${SLOT}`), say: `${a} minus ${b} equals what?`});
    const m = mathQ(a, '-', b, c, 'c', true);
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: m.html, say: m.say});
  };
  D.warm = lsWarmB10(D, 201, 899);
  D.exp = r => {
    const a = zero ? lsRi(r, 3, 8) * 100 + lsRi(r, 1, 9) : lsRi(r, 321, 876);
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 3}, s0: lsDigits(a, 3), goal: 'fewer', eq: 'value', ans: a - 1, sl: {a},
      html: lsEq(a) + lsCap('Take some away!'), say: `Here are ${a}. Take away as many as you like.`}), nudge: 'Tap minus to take blocks away. A trade button breaks one into ten.',
    react: v => { const d = lsVal({model: 'b10r', m: {places: 3}}, v); return {ctx: {a, b: a - d, diff: d}, lines: [`${a} take away ${a - d} leaves ${d}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.diff, 3))}</div>` + lsEq(`${c.a} − ${c.b} = ${c.diff}`), sl: c});
  D.fix = {fn: k2FixSub, nums: pick, label: ([a, b]) => `${a} − ${b} = ?`, sl: ([a, b]) => ({a, b}), code: {flip: 'col', trade: 'keep'}};
  D.mine = ls3Mine([503, 278], [100, 100], [999, 999], [[1, 10, 100], [1, 10, 100]], ['Top number', 'Take away'], s => `${s[0]} − ${s[1]}`, s => s[0] > s[1]);
  return D;
}

/* ---- big numbers in columns: Add 4-Digit Numbers, Take Away Big Numbers, Add Big Numbers ---- */
const LS3_BRIEF_BIG = `Explore: the child makes any four-digit number on a place-value chart (thousands, hundreds, tens, ones) with steppers (no slots in the task).
Name it: the chart of their number; lines on it (slots {n}: the number, {a}: its thousands digit) and the idea: line up the places, work from the ones, and trade when a place needs it.
Together (slots {a} {b}: the two numbers; never the answer): line 1 before both numbers on a place-value chart (they type the answer), line 2 before the problem written in columns, line 3 before the problem in a row.
Remember: a warm-up: make a number with blocks (slot {n}).
Show: two problems to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3Big(id, t, g, op, digits, idea, home) {
  const add = op == '+', D = ls3(id, t, g, {petSt: 1, bugs: add ? ['nocarry', 'cat', 'slip'] : ['col', 'keep', 'slip'], brief: LS3_BRIEF_BIG, idea, home, fb: 'Your number {n} has {a} thousands.',
    slots: {remember: ['n'], explore: [], name: ['n', 'a'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const lo = Math.pow(10, digits - 1), pick = r => {
    for (;;) {
      const a = lsRi(r, lo, 10 * lo - 1), b = lsRi(r, lo, 10 * lo - 1);
      if (add ? a + b < 10 * lo && lsCols(a, b, (x, y) => x + y).some(s => s >= 10) : a > b && lsCols(a, b, (x, y) => x - y).some(s => s < 0)) return [a, b];
    }
  };
  const pl = Array.from({length: digits}, (_, i) => digits - 1 - i);
  D.q = (st, r) => {
    const [a, b] = pick(r), c = add ? a + b : a - b, sl = {a, b}, ab = [a, b, add ? '+' : '-'], bug = {slip: [c + 10, c - 10, c + 100]};
    const hint = {k: 'text', s: add ? 'Add the ones first. Ten in a place trade for one of the next place.' : 'Take away the ones first. Not enough? Trade one from the next place.'};
    const o = {kind: 'num', ans: c, ab, sl, bug, hint, max: 7};
    if (st == 0) return lsDq(D, 0, Object.assign(o, {html: `<div class="pkq">${lsPvChart(a, pl, {rows: [a, b]})}</div>` + lsEq(`${ffComma(a)} ${add ? '+' : '−'} ${ffComma(b)} = ${SLOT}`),
      say: `${a} ${add ? 'plus' : 'minus'} ${b}. The places are lined up. Work from the ones.`}));
    if (st == 1) { const m = mathQ(a, add ? '+' : '-', b, c, 'c', true); return lsDq(D, 1, Object.assign(o, {html: m.html, say: m.say})); }
    return lsDq(D, 2, Object.assign(o, {html: lsEq(`${ffComma(a)} ${add ? '+' : '−'} ${ffComma(b)} = ${SLOT}`), say: `${a} ${add ? 'plus' : 'minus'} ${b} equals what?`}));
  };
  D.warm = lsWarmB10(D, 101, 999);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pvc', m: {pl: [3, 2, 1, 0]}, goal: 'moved', eq: 'value', ans: 1000, sl: {}, demo: [4, 2, 0, 7],
    html: lsCap('Make any number on the chart!'), say: 'Make any number on the place value chart. Use the thousands too.'}), nudge: 'Change a place, then check.',
  react: v => { const n = Array.isArray(v) ? K2MM.pvc.val({m: {pl: [3, 2, 1, 0]}}, v) : +v; return {ctx: {n, a: Math.floor(n / 1000)}, lines: [`You made ${n}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsPvChart(c.n, [3, 2, 1, 0])}</div>` + lsEq(ffComma(c.n)), sl: c});
  if (digits == 4) {
    D.fix = add ? {fn: k2FixAdd, nums: pick, label: ([a, b]) => `${a} + ${b} = ?`, sl: ([a, b]) => ({a, b}), code: {carry: 'nocarry'}}
      : {fn: k2FixSub, nums: pick, label: ([a, b]) => `${a} − ${b} = ?`, sl: ([a, b]) => ({a, b}), code: {flip: 'col', trade: 'keep'}};
  }
  return D;
}

/* ---- place value: Place Value to 999,999, Decimal Place Value, Powers of Ten ---- (the place-value chart) */
const LS3_BRIEF_PV = `Explore: the child makes any number on a place-value chart with one stepper a place (no slots in the task).
Name it: the chart of their number; lines on it (slots {n}: the number, {a}: one digit of it, {value}: what that digit is worth) and the idea: each place is worth ten times the place to its right.
Together (SLOTS): line 1 before building {n} on the chart, line 2 before a picture of a chart (they type what a digit is worth), line 3 before the same in symbols only.
Remember: a warm-up: make a number with blocks (slot {n}).
Show: two items to type, no help, inside a small job in the world (SHOW).`;
const LS3_BRIEF_P10 = `Explore: the child makes any number on a place-value chart with one stepper a place (no slots in the task).
Name it: the chart of their number and of it times ten; lines on it (slots {n}: their number, {value}: it times ten) and the idea: times ten moves every digit one place to the left; divided by ten, one place to the right.
Together (slots {n}: the number, {k}: ten, a hundred or a thousand; never the answer): line 1 before building {n} times or divided by {k} on the chart, line 2 before a picture of {n} on a chart (they type the answer), line 3 before the problem in symbols only.
Remember: a warm-up: make a number with blocks (slot {n}).
Show: two problems to type, no help, inside a small job in the world (slots {n} {k}).`;
function ls3Pv(id, t, g, kind, idea, home) {
  const dec = kind == 'dec', p10 = kind == 'p10', pl = dec ? [1, 0, -1, -2] : p10 ? [3, 2, 1, 0, -1, -2] : [5, 4, 3, 2, 1, 0];
  const D = ls3(id, t, g, {petSt: 1, bugs: p10 ? ['place', 'given'] : ['given', 'place'], idea, home, fb: p10 ? '{n} times ten is {value}.' : 'In {n}, the {a} is worth {value}.',
    brief: p10 ? LS3_BRIEF_P10 : LS3_BRIEF_PV.replace('SLOTS', 'slots {n}: the number, {a}: the digit asked about; never what it is worth, the answer').replace('SHOW', 'slots {n} {a}'),
    slots: p10 ? {remember: ['n'], explore: [], name: ['n', 'value'], together: ['n', 'k'], check: ['ans'], show: ['n', 'k']}
      : {remember: ['n'], explore: [], name: ['n', 'a', 'value'], together: [['n'], ['n', 'a'], ['n', 'a']], check: ['ans'], show: ['n', 'a']}});
  const say = v => k2SayNum(+v), shw = v => (dec || p10 ? String(v) : ffComma(v));
  D.q = (st, r) => {
    if (p10) {
      for (;;) {
        const k = [10, 100, 1000][lsRi(r, 0, 2)], mul = r() < .6, n = mul ? (r() < .5 ? lsRi(r, 2, 99) : lsRi(r, 12, 99) / 10) : lsRi(r, 2, 99) * (k == 10 ? 1 : k == 100 ? 1 : 10), c = k2Clean(mul ? n * k : n / k);
        if (c >= 10000 || c < .01 || Math.abs(c * 100 - Math.round(c * 100)) > 1e-9) continue;
        const sl = {n, k}, bug = {place: [k2Clean(mul ? n * k / 10 : n / k * 10), k2Clean(mul ? n * k * 10 : n / k / 10)].filter(x => x < 1e5 && x >= .01), given: [n]};
        const e = `${n} ${mul ? '×' : '÷'} ${k}`, o = {sl, bug, pad: 'dec', max: 7, vsay: say, hint: {k: 'text', s: mul ? `Times ${k}: every digit moves ${String(k).length - 1} place${k > 10 ? 's' : ''} to the left.` : `Divided by ${k}: every digit moves ${String(k).length - 1} place${k > 10 ? 's' : ''} to the right.`}};
        if (st == 0) return lsDq(D, 0, Object.assign(o, {kind: 'make', model: 'pvc', m: {pl, target: c}, goal: 'value', eq: 'value', ans: c, pad: null, html: `<div class="pkq">${lsPvChart(n, pl)}</div>` + lsEq(e) + lsCap('Make the answer on the chart.'),
          say: `${say(n)} ${mul ? 'times' : 'divided by'} ${k}. Make the answer on the chart.`}));
        if (st == 1) return lsDq(D, 1, Object.assign(o, {kind: 'num', ans: c, eq: 'value', html: `<div class="pkq">${lsPvChart(n, pl)}</div>` + lsEq(`${e} = ${SLOT}`), say: `${say(n)} ${mul ? 'times' : 'divided by'} ${k} equals what?`}));
        return lsDq(D, 2, Object.assign(o, {kind: 'num', ans: c, eq: 'value', html: lsEq(`${e} = ${SLOT}`), say: `${say(n)} ${mul ? 'times' : 'divided by'} ${k} equals what?`}));
      }
    }
    for (;;) {
      const n = dec ? lsRi(r, 102, 9899) / 100 : lsRi(r, 10203, 987654), ds = pl.map(p => ls3Digit(n, p)), ps = pl.filter((p, i) => ds[i] && ds.filter(x => x == ds[i]).length == 1 && (dec || p >= 1));
      if (!ps.length || dec && ds.every(x => !x)) continue;
      const p = ps[Math.floor(r() * ps.length)], a = ls3Digit(n, p), v = k2Clean(a * Math.pow(10, p)), sl = {n: shw(n), a};
      const bug = {given: [a], place: [k2Clean(v * 10), k2Clean(v / 10)].filter(x => x >= .01)}, hint = {k: 'html', html: `<div class="pkhint">${lsPvChart(n, pl, {mark: p})}<div>The ${a} is in the ${LS_PVN[p].toLowerCase()} place.</div></div>`, w: `The ${a} is in the ${LS_PVN[p].toLowerCase()} place.`};
      const o = {sl, bug, hint, vsay: say, max: 7};
      if (st == 0) return lsDq(D, 0, Object.assign(o, {kind: 'make', model: 'pvc', m: {pl: pl.filter(x => dec || x <= Math.floor(Math.log10(n))), target: n}, goal: 'value', eq: 'value', ans: n, bug: {},
        html: lsEq(shw(n)) + lsCap('Make it on the chart.'), say: `Make ${say(n)} on the place value chart.`}));
      if (st == 1) return lsDq(D, 1, Object.assign(o, {kind: 'num', ans: v, pad: dec ? 'dec' : null, eq: 'value', html: `<div class="pkq">${lsPvChart(n, pl, {mark: p})}</div>` + lsCap(`What is the ${a} worth?`) + SLOT,
        say: `In ${say(n)}, what is the ${a} worth?`}));
      return lsDq(D, 2, Object.assign(o, {kind: 'num', ans: v, pad: dec ? 'dec' : null, eq: 'value', html: lsEq(shw(n)) + lsCap(`What is the ${a} worth?`) + SLOT, say: `In ${say(n)}, what is the ${a} worth?`}));
    }
  };
  D.warm = lsWarmB10(D, 101, 999);
  const epl = dec ? [1, 0, -1, -2] : p10 ? [2, 1, 0, -1] : [5, 4, 3, 2, 1, 0];
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pvc', m: {pl: epl}, goal: 'moved', eq: 'value', ans: dec || p10 ? 1 : 100000, sl: {}, demo: epl.map((x, i) => [3, 4, 0, 5, 2, 7][i]),
    html: lsCap('Make any number on the chart!'), say: 'Make any number you like on the place value chart.'}), nudge: 'Change a place, then check.',
  react: v => {
    const n = Array.isArray(v) ? K2MM.pvc.val({m: {pl: epl}}, v) : +v, top = epl.find(p => ls3Digit(n, p)), a = top == null ? 0 : ls3Digit(n, top), val = top == null ? 0 : k2Clean(a * Math.pow(10, top));
    return {ctx: p10 ? {n, value: k2Clean(n * 10)} : {n: shw(n), a, value: shw(val)}, lines: [`You made ${shw(n)}.`]};
  }});
  D.name = c => (p10 ? {html: `<div class="pkq">${lsPvChart(+c.n, [3, 2, 1, 0, -1, -2], {rows: [+c.n, +c.value]})}</div>` + lsEq(`${c.n} × 10 = ${c.value}`), sl: c}
    : {html: `<div class="pkq">${lsPvChart(+String(c.n).replace(/,/g, ''), epl)}</div>` + lsEq(c.n), sl: c});
  return D;
}

/* ---- rounding on a number line: Round to 10, Round to 100, Round Big Numbers, Round Decimals ---- */
const LS3_BRIEF_RND = `Explore: a number line between two round numbers; the child puts the pin anywhere on it (slots {a} {b}: the two ends).
Name it: the line with their number; lines on it (slots {n}: their number, {a}: what it rounds to) and the idea: find the two round numbers it sits between, then the nearer one; halfway rounds up.
Together (slot {n}: the number to round; never the rounded number, the answer): line 1 before sliding a pin on the line to the rounded number, line 2 before a picture of the line (they type the rounded number), line 3 before the number with no line.
Remember: a warm-up: what comes next counting by tens (slot {k}).
Show: two numbers to round, no help, inside a small job in the world (slot {n}).`;
function ls3Round(id, t, g, kind, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['trunc', 'rup'], brief: LS3_BRIEF_RND, idea, home, fb: '{n} rounds to {a}.',
    slots: {remember: ['k'], explore: ['a', 'b'], name: ['n', 'a'], together: ['n'], check: ['ans'], show: ['n']}});
  const U = {ten: 10, hund: 100, big: 1000, dec: .1}[kind], W = {ten: 'ten', hund: 'hundred', big: 'thousand', dec: 'tenth'}[kind], say = v => k2SayNum(+v);
  const pick = r => {
    for (;;) {
      const n = kind == 'ten' ? lsRi(r, 11, 98) : kind == 'hund' ? lsRi(r, 101, 989) : kind == 'big' ? lsRi(r, 1050, 9950) : lsRi(r, 102, 998) / 100;
      const lo = k2Clean(Math.floor(n / U + 1e-9) * U), hi = k2Clean(lo + U), up = n - lo >= U / 2 - 1e-9, a = up ? hi : lo;
      if (n == lo || Math.abs(n - lo - U / 2) < 1e-9 && r() < .5) continue;
      return {n, lo, hi, a};
    }
  };
  const line = ({lo, hi, n}) => ({min: lo, max: hi, step: k2Clean(U / 10), labels: [lo, k2Clean(lo + U / 2), hi], marks: [n]});
  D.q = (st, r) => {
    const x = pick(r), {n, lo, hi, a} = x, sl = {n}, bug = {trunc: [lo], rup: [hi]}, o = {sl, bug, vsay: say, pad: kind == 'dec' ? 'dec' : null, eq: 'value',
      hint: {k: 'text', s: `${n} is between ${lo} and ${hi}. Which one is it nearer to? Halfway is ${k2Clean(lo + U / 2)}.`}};
    const ask = `Round ${n} to the nearest ${W}.`;
    if (st == 0) { const snap = k2Clean(U / 10), k = Math.min(9, Math.max(1, Math.round((n - lo) / snap)));
      return lsLine(D.sk, D.lv, 0, a, line(x), lsCap(ask) + lsCap('Slide the pin to the rounded number.'), `${ask} Slide the pin to the rounded number.`, {sl, bug, vsay: say, hint: o.hint, pk: false, start: String(k2Clean(lo + k * snap)), snap, ansSay: say(a)}); }
    if (st == 1) return lsDq(D, 1, Object.assign(o, {kind: 'num', ans: a, html: `<div class="pkq">${VIZ.numLine(line(x))}</div>` + lsCap(ask) + SLOT, say: ask}));
    return lsDq(D, 2, Object.assign(o, {kind: 'num', ans: a, html: lsEq(n) + lsCap(ask) + SLOT, say: ask}));
  };
  D.warm = r => { const s = 10 * lsRi(r, 1, 6); return lsSeqQ(D, 0, s, 10); };
  D.exp = r => {
    const x = pick(r), L = line(x), mid = k2Clean(x.lo + 3 * U / 10);
    return {q: lsLine(D.sk, D.lv, 0, mid, Object.assign({}, L, {marks: []}), lsCap('Put the pin anywhere on the line.'), `Put the pin anywhere between ${x.lo} and ${x.hi}.`,
      {pk: false, goal: 'pin', start: String(k2Clean(x.lo + U / 2)), snap: k2Clean(U / 10), sl: {a: x.lo, b: x.hi}, demo: String(mid)}), nudge: 'Slide the pin, then check.',
    react: v => { const n = k2Clean(+v), a = n - x.lo >= U / 2 - 1e-9 ? x.hi : x.lo; return {ctx: {n, a, lo: x.lo, hi: x.hi}, lines: [`${n} rounds to ${a}.`]}; }};
  };
  D.name = c => { const lo = c.lo != null ? c.lo : k2Clean(Math.floor(c.n / U + 1e-9) * U); return {html: `<div class="pkq">${VIZ.numLine({min: lo, max: k2Clean(lo + U), step: k2Clean(U / 10), labels: [lo, k2Clean(lo + U / 2), k2Clean(lo + U)], marks: [c.n]})}</div>` + lsEq(`${c.n} → ${c.a}`), sl: c}; };
  return D;
}

/* ---- fractions on bars and lines: Name the Fraction, Fractions on a Line, Compare Fractions, Unlike Fractions, Equal Fractions,
   Simplest Form ---- */
const ls3FQ = (D, st, ans, html, say, o) => lsDq(D, st, Object.assign({kind: 'num', pad: 'frac', ans, html, say, vsay: ls3Say}, o));
const ls3Frs = (n, d) => ls3FrSay(`${n}/${d}`);
const LS3_BRIEF_FNAME = `Explore: a fraction bar cut into equal parts; the child shades any parts they like (no slots in the task).
Name it: the bar they shaded; lines on it (slots {top}: the parts shaded, {bottom}: all the equal parts) and the idea: the bottom number counts the equal parts, the top counts the parts we mean.
Together (slots {top} {bottom}: the fraction asked for; on the picture item they are the answer, so line 2 has no slots): line 1 before shading {top} of {bottom} parts on a bar, line 2 before a picture of a shaded bar (they type the fraction), line 3 before the same told in words (they type the fraction).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two pictures; they type each fraction, no help, inside a small job in the world (no slots).`;
const LS3_BRIEF_FLINE = `Explore: a number line from 0 to 1 cut into equal jumps; the child puts the pin anywhere on it (slot {bottom}: how many equal jumps).
Name it: the line with their pin; lines on it (slots {top}: jumps from 0, {bottom}: all the jumps) and the idea: a fraction is a point on the line, counted in equal jumps from 0.
Together (slots {top} {bottom} on line 1 only; lines 2 and 3 have none, the fraction is the answer): line 1 before putting the pin on {top} of {bottom} jumps, line 2 before a picture of a marked line (they type the fraction), line 3 before the same told in words.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two marked lines; they type each fraction, no help, inside a small job in the world (no slots).`;
function ls3FName(id, t, g, line, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: line ? ['ticks', 'flip'] : ['unshaded', 'fpart'], brief: line ? LS3_BRIEF_FLINE : LS3_BRIEF_FNAME, idea, home, fb: '{top} of {bottom} equal parts.',
    slots: {remember: ['a', 'b'], explore: line ? ['bottom'] : [], name: ['top', 'bottom'], together: [['top', 'bottom'], [], []], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const d = line ? lsRi(r, 3, 8) : lsRi(r, 3, 6), n = lsRi(r, 1, d - 1), ans = `${n}/${d}`, sl = {top: n, bottom: d};
    const bug = line ? {ticks: [`${n}/${d + 1}`], flip: [`${d}/${n}`]} : {unshaded: [`${d - n}/${d}`], fpart: [`${n}/${d - n}`], flip: [`${d}/${n}`]};
    const L = {min: 0, max: 1, step: 1 / d, den: d, labels: [0, 1]}, hint = {k: 'text', s: line ? `Count the jumps from 0 to 1: there are ${d}. Then count the jumps to the dot.` : `Count all the equal parts: that is the bottom number. Count the shaded ones: the top.`};
    if (st == 0) return line ? lsLine(D.sk, D.lv, 0, ans, L, lsCap('Put the pin on') + lsEq(ls3Fr(n, d)), `Put the pin on ${ls3Frs(n, d)}.`, {pk: false, snap: 1 / d, sl, bug: {}, hint, ansSay: ls3Frs(n, d)})
      : lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'bar', d, whole: 1}, ans, eq: 'value', ansSay: ls3Frs(n, d), sl, bug: {}, hint,
        html: lsCap('Shade') + lsEq(ls3Fr(n, d)) + lsCap('of the bar.'), say: `Tap the parts to shade ${ls3Frs(n, d)} of the bar.`});
    if (st == 1) return ls3FQ(D, 1, ans, `<div class="pkq">${line ? VIZ.numLine(Object.assign({}, L, {marks: [n / d]})) : VIZ.fracBar(n, d)}</div>` + lsCap(line ? 'What fraction is marked?' : 'What fraction is shaded?') + lsEq(SLOT_FRAC),
      line ? 'What fraction does the dot show?' : 'What fraction of the bar is shaded?', {sl, bug, hint});
    const j = `${n} jump${n > 1 ? 's' : ''}`;
    return ls3FQ(D, 2, ans, lsCap(line ? `The line from 0 to 1 has ${d} equal jumps. The dot is ${j} from 0.` : `${n} of ${d} equal parts are shaded.`) + lsEq(SLOT_FRAC),
      line ? `${d} equal jumps from 0 to 1. What fraction is ${j} from 0?` : `${n} of ${d} equal parts are shaded. What fraction is that?`, {sl, bug, hint});
  };
  D.warm = ls3WarmFact(D, 2, 5);
  D.exp = () => line ? {q: lsLine(D.sk, D.lv, 0, '0.25', {min: 0, max: 1, step: 1 / 4, den: 4, labels: [0, 1]}, lsCap('Put the pin anywhere on the line.'), 'Put the pin anywhere on the line.',
    {pk: false, goal: 'pin', start: '0.5', snap: 1 / 4, sl: {bottom: 4}, demo: '0.75'}), nudge: 'Slide the pin, then check.',
  react: v => { const n = Math.round(k2Val(v) * 4); return {ctx: {top: n, bottom: 4}, lines: [`You put it ${n} jumps from 0.`]}; }}
    : {q: lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'bar', d: 6, whole: 1}, ans: '2/6', eq: 'value', goal: 'some', sl: {}, demo: '2/6',
      html: lsCap('Shade any parts you like.'), say: 'Tap the bar to shade any parts you like.'}), nudge: 'Shade a part or more, then check.',
    react: v => { const n = Math.round(k2Val(v) * 6); return {ctx: {top: n, bottom: 6}, lines: [`You shaded ${n} of the 6 parts.`]}; }};
  D.name = c => ({html: `<div class="pkq">${line ? VIZ.numLine({min: 0, max: 1, step: 1 / c.bottom, den: c.bottom, labels: [0, 1], marks: [c.top / c.bottom]}) : VIZ.fracBar(c.top, c.bottom)}</div>` + lsEq(ls3Fr(c.top, c.bottom)), sl: c});
  return D;
}
// comparing two fractions on two bars (the fraction comparison of TEACH-PLAN-2 system B): the same top or the same bottom (3rd grade),
// or neither (4th grade); the typed item: the bigger fraction
const LS3_BRIEF_FCMP = `Explore: two fraction bars; the child shades any parts of each (no slots in the task).
Name it: the two bars they shaded, compared; lines on them (slots {a} of {x} parts on the top bar, {b} of {y} parts on the bottom bar) and the idea: compare how much of the same whole is shaded; more parts means smaller pieces.
Together (no slots: the fractions are on the screen and the app says them): line 1 before shading two fractions on two bars, line 2 before two shaded bars (they pick greater than, less than or equal), line 3 before the same with no bars.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two pairs; they type the bigger fraction, no help, inside a small job in the world (no slots).`;
function ls3FCmp(id, t, g, unlike, idea, home) {
  const D = ls3(id, t, g, {test: 3, petSt: 1, bugs: ['bigden', 'small'], brief: LS3_BRIEF_FCMP, idea, home, fb: '{a} of {x} and {b} of {y}.',
    slots: {remember: [], explore: [], name: ['a', 'b', 'x', 'y'], together: [], check: ['ans'], show: []}});
  const pick = r => {
    for (;;) {
      let a, b, c, d;
      if (unlike) { b = lsRi(r, 2, 6); d = b * lsRi(r, 2, 2) <= 12 && r() < .5 ? b * 2 : lsRi(r, 3, 12); a = lsRi(r, 1, b - 1); c = lsRi(r, 1, d - 1); if (a == c || b == d) continue; }
      else if (r() < .55) { a = c = lsRi(r, 1, 3); b = lsRi(r, a + 1, 8); d = lsRi(r, a + 1, 8); if (b == d) continue; }
      else { b = d = lsRi(r, 3, 10); a = lsRi(r, 1, b - 1); c = lsRi(r, 1, b - 1); if (a == c) continue; }
      if (a * d == b * c) continue;
      return [a, b, c, d];
    }
  };
  D.q = (st, r) => {
    const [a, b, c, d] = pick(r), ans = a * d > b * c ? '>' : '<', big = ans == '>' ? `${a}/${b}` : `${c}/${d}`, small = ans == '>' ? `${c}/${d}` : `${a}/${b}`;
    const bd = b > d ? '>' : '<', sl = {}, hint = {k: 'html', html: `<div class="pkhint">${ls3Bars([a, c], [b, d], {lab: true})}<div>Compare how much of each bar is shaded.</div></div>`, w: 'Compare how much of each bar is shaded.'};
    const f1 = ls3Fr(a, b), f2 = ls3Fr(c, d), s1 = ls3Frs(a, b), s2 = ls3Frs(c, d);
    if (st == 3) return ls3FQ(D, 2, big, lsEq(`${f1} or ${f2}?`) + lsCap('Type the bigger fraction.') + lsEq(SLOT_FRAC), `Which is bigger, ${s1} or ${s2}? Type the bigger fraction.`,
      {sl, hint, bug: {bigden: b != d && bd != ans ? [ans == '>' ? `${c}/${d}` : `${a}/${b}`] : [], small: [small]}});
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [b, d], ans: [a, c], lab: false}, goal: 'two', eq: 'value', ans, sl, bug: {}, hint,
      html: lsEq(`${f1} and ${f2}`) + lsCap('Shade the top bar, then the bottom bar.'), say: `Shade ${s1} on the top bar and ${s2} on the bottom bar.`});
    return lsPick(D.sk, D.lv, st, ans, (st == 1 ? `<div class="pkq">${ls3Bars([a, c], [b, d], {lab: true})}</div>` : '') + lsEq(`${f1} ${SLOT} ${f2}`) + lsCap('Greater, less, or equal?'),
      `Is ${s1} greater than, less than, or equal to ${s2}?`, [['<'], ['='], ['>']], {pk: false, sl, hint, bug: {bigden: b != d ? [bd] : [], small: [ans == '>' ? '<' : '>']},
        vsay: v => `${s1} ${LS_SIGN[v] || v} ${s2}`, after: `${s1} is ${ans == '>' ? 'greater than' : 'less than'} ${s2}.`});
  };
  D.warm = r => { const d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return ls3FQ(D, 0, `${n}/${d}`, `<div class="pkq">${VIZ.fracBar(n, d)}</div>` + lsCap('What fraction is shaded?') + lsEq(SLOT_FRAC),
    'What fraction of the bar is shaded?', {sl: {}, hint: {k: 'text', s: 'All the parts on the bottom, the shaded parts on top.'}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [3, 6], ans: [1, 2], lab: false}, goal: 'shade', eq: 'value', ans: '1', sl: {}, demo: [2, 3],
    html: lsCap('Shade any parts of each bar.'), say: 'Shade any parts you like on the top bar and the bottom bar.'}), nudge: 'Shade some parts, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [2, 3], w = a * 6 > b * 3 ? 'more' : a * 6 < b * 3 ? 'less' : 'the same'; return {ctx: {a, b, x: 3, y: 6}, lines: [`The top bar has ${w} shaded.`]}; }});
  D.name = c => { const s = c.a * c.y > c.b * c.x ? '>' : c.a * c.y < c.b * c.x ? '<' : '='; return {html: `<div class="pkq">${ls3Bars([c.a, c.b], [c.x, c.y], {lab: true})}</div>` + lsEq(`${ls3Fr(c.a, c.x)} ${s} ${ls3Fr(c.b, c.y)}`), sl: c}; };
  return D;
}
// equal fractions and simplest form: the top bar is fixed and the child shades the bottom bar, cut in other parts, to match it
const LS3_BRIEF_FEQ = `Explore: two fraction bars, the top cut in thirds and the bottom in sixths; the child shades the same amount on both, any way (no slots in the task).
Name it: the two bars they shaded the same; lines on them (slots {a} of {x} parts on top, {b} of {y} parts below) and the idea: SAME.
Together (slots {top} {bottom}: the given fraction; never the answer): line 1 before shading the bottom bar to match {top} of {bottom} on the top bar, line 2 before two bars shaded the same (they type the missing number), line 3 before the same in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two to type, no help, inside a small job in the world (slots {top} {bottom}).`;
function ls3FEq(id, t, g, simp, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: simp ? ['oneSide', 'flip'] : ['addEq', 'given'], idea, home, fb: '{a} of {x} is the same as {b} of {y}.',
    brief: LS3_BRIEF_FEQ.replace('SAME', simp ? 'the simplest form has the fewest, biggest parts: divide the top and bottom by the same number' : 'multiply the top and bottom by the same number and the fraction stays the same'),
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'x', 'y'], together: ['top', 'bottom'], check: ['ans'], show: ['top', 'bottom']}});
  D.q = (st, r) => {
    let n, d, n2, d2;
    if (simp) { const k = lsRi(r, 2, 4); d2 = lsRi(r, 2, Math.floor(12 / k)); n2 = lsRi(r, 1, d2 - 1); while (k2Gcd(n2, d2) > 1) n2 = lsRi(r, 1, d2 - 1); n = n2 * k; d = d2 * k; }
    else { d = lsRi(r, 2, 4); n = lsRi(r, 1, d - 1); const k = lsRi(r, 2, Math.floor(12 / d)); n2 = n * k; d2 = d * k; }
    const sl = {top: n, bottom: d}, hint = {k: 'html', html: `<div class="pkhint">${ls3Bars([n, n2], [d, d2], {lab: true})}<div>${simp ? `Divide the top and the bottom by ${d / d2}.` : `Multiply the top and the bottom by ${d2 / d}.`}</div></div>`,
      w: simp ? 'Divide the top and the bottom by the same number.' : 'Multiply the top and the bottom by the same number.'};
    const bug = simp ? {oneSide: [`${n2}/${d}`, `${n}/${d2}`], flip: [`${d2}/${n2}`]} : {addEq: [n + d2 - d], given: [n]};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [d, d2], ans: [n, n2], lock: [true, false], lab: false}, s0: [n, 0], goal: 'equiv', eq: 'value', ans: n2, sl, bug: {}, hint,
      html: lsEq(`${ls3Fr(n, d)} = ${ls3Fr(lsQm, d2)}`) + lsCap('Shade the bottom bar to match the top.'), say: `Shade the bottom bar so it matches ${ls3Frs(n, d)}.`});
    const pic = st == 1 ? `<div class="pkq">${ls3Bars([n, n2], [d, d2])}</div>` : '';
    if (simp) return ls3FQ(D, st, `${n2}/${d2}`, pic + lsCap('Write it in simplest form.') + lsEq(`${ls3Fr(n, d)} = ${SLOT_FRAC}`), `Write ${ls3Frs(n, d)} in simplest form.`, {sl, bug, hint});
    return lsDq(D, st, {kind: 'num', ans: n2, sl, bug, hint, html: pic + lsEq(`${ls3Fr(n, d)} = ${ls3Fr(SLOT, d2)}`), say: `${ls3Frs(n, d)} equals how many ${FC_NAMES[d2] || 'parts'}s?`});
  };
  D.warm = ls3WarmFact(D, 2, 4);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [3, 6], ans: [1, 2], lab: false}, goal: 'same', eq: 'value', ans: '1', sl: {}, demo: [2, 4],
    html: lsCap('Shade the same amount on both bars.'), say: 'Shade the same amount on both bars, any way you like.'}), nudge: 'Make both bars shaded the same amount, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [2, 4]; return {ctx: {a, b, x: 3, y: 6}, lines: [`${ls3Frs(a, 3)} is the same as ${ls3Frs(b, 6)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3Bars([c.a, c.b], [c.x, c.y], {lab: true})}</div>` + lsEq(`${ls3Fr(c.a, c.x)} = ${ls3Fr(c.b, c.y)}`), sl: c});
  return D;
}

/* ---- adding and multiplying fractions: Add & Subtract Parts, Whole × Fraction, Unlike Denominators, Multiply Fractions ---- */
const LS3_BRIEF_FOP = `Explore: EXP (no slots in the task).
Name it: what they made; lines on it (slots {a} {b}: the two numerators, {x}: the parts of the whole, {sum}: the result's numerator) and the idea: IDEA.
Together (slots {a} {b}: the two numerators, {x}: the bottom; never the answer): line 1 before LINE1, line 2 before a picture (they type the answer as a fraction), line 3 before the problem in symbols only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two problems to type as fractions, no help, inside a small job in the world (slots {a} {b} {x}).`;
function ls3Fop(id, t, g, kind, bugs, idea, home) {
  const W = {like: ['two fraction bars cut the same way; the child shades some of each', 'same-size parts add like things: add the tops, the bottom stays', 'shading {a} parts and then {b} more on one bar'],
    whole: ['two fraction bars cut the same way; the child shades some of each', 'a whole number times a fraction is that many copies of the fraction: multiply the top', 'counting the shaded parts on {a} copies of a bar'],
    unlike: ['two bars cut in thirds and sixths; the child shades the same amount on both', 'make the bottoms the same first (rename), then add the tops', 'renaming the first fraction on a bar cut into {x} parts'],
    mul: ['a grid of squares; the child shades any squares', 'part of a part: multiply the tops and multiply the bottoms', 'shading rows and columns of a grid where they overlap']}[kind];
  const D = ls3(id, t, g, {petSt: 1, bugs, idea, home, fb: '{a} and {b} make {sum} of {x} parts.',
    brief: LS3_BRIEF_FOP.replace('EXP', W[0]).replace('IDEA', W[1]).replace('LINE1', W[2]),
    slots: {remember: [], explore: [], name: ['a', 'b', 'x', 'sum'], together: ['a', 'b', 'x'], check: ['ans'], show: ['a', 'b', 'x']}});
  const pick = r => {
    for (;;) {
      if (kind == 'like') { const d = lsRi(r, 3, 6), add = r() < .65, a = lsRi(r, 1, d - 1), c = lsRi(r, 1, d - 1); if (add ? a + c >= d : a <= c) continue; return {a, b: d, c, d, op: add ? '+' : '−'}; }
      if (kind == 'whole') { const w = lsRi(r, 2, 4), d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return {a: w, b: 1, c: n, d, op: '×'}; }
      if (kind == 'unlike') { const [b, d] = [[2, 4], [2, 6], [3, 6], [2, 8], [4, 8], [2, 3], [3, 4], [2, 5], [4, 6]][lsRi(r, 0, 8)], L = b * d / k2Gcd(b, d), a = lsRi(r, 1, b - 1), c = lsRi(r, 1, d - 1);
        if (a * L / b + c * L / d > L) continue; return {a, b, c, d, op: '+', L}; }
      const b = lsRi(r, 2, 4), d = lsRi(r, 2, 6), a = lsRi(r, 1, b - 1), c = lsRi(r, 1, d - 1); if (b == d && a == c) continue; return {a, b, c, d, op: '×'};
    }
  };
  D.q = (st, r) => {
    const x = pick(r), {a, b, c, d, op} = x, sl = {a, b: c, x: d};
    let ans, bug, pic, pre = '', hint, s0q = null;
    const F1 = kind == 'whole' ? a : ls3Fr(a, b), e = `${F1} ${op} ${ls3Fr(c, d)}`, S1 = kind == 'whole' ? a : ls3Frs(a, b), se = `${S1} ${op == '+' ? 'plus' : op == '−' ? 'minus' : 'times'} ${ls3Frs(c, d)}`;
    if (kind == 'like') { const n = op == '+' ? a + c : a - c; ans = `${n}/${d}`; bug = {addBot: op == '+' ? [`${n}/${2 * d}`] : [], slip: [`${n + 1}/${d}`, `${n - 1}/${d}`].filter(v => !/^0\/|^-/.test(v))};
      pic = ls3Bars([a, c], [d, d], {lab: true}); hint = {k: 'text', s: 'Same-size parts: the bottom stays. Work with the tops.'};
      s0q = {kind: 'make', model: 'parts', m: {shape: 'bar', d, whole: 1}, ans, eq: 'value', s0: op == '−' ? Array.from({length: d}, (_, i) => +(i < a)) : null,
        html: lsEq(e) + lsCap(op == '+' ? `Shade ${a} parts, then ${c} more.` : `${a} parts are shaded. Clear ${c}.`), say: op == '+' ? `${se}. Shade ${a} parts, then ${c} more.` : `${se}. Clear ${c} of the shaded parts.`}; }
    else if (kind == 'whole') { ans = `${a * c}/${d}`; bug = {mulBot: [`${a * c}/${a * d}`], slip: [`${a * c + 1}/${d}`]};
      pic = `<div class="ls-copies">${Array.from({length: a}, () => VIZ.fracBar(c, d, {w: 150})).join('')}</div>`; hint = {k: 'text', s: `${a} copies of ${c} parts: count all the shaded parts. The part size stays.`};
      s0q = {kind: 'num', ans: a * c, html: `<div class="pkq">${pic}</div>` + lsEq(e) + lsCap(`How many ${FC_NAMES[d]}s are shaded in all?`) + SLOT, say: `${se}. How many ${FC_NAMES[d]}s are shaded in all?`}; }
    else if (kind == 'unlike') { const L = x.L, A = a * L / b, C = c * L / d; ans = `${A + C}/${L}`; bug = {addBot: [`${a + c}/${b + d}`], renameTop: A != a ? [`${a + C}/${L}`] : [], slip: [`${A + C + 1}/${L}`]};
      pic = ls3Bars([A, C], [L, L], {lab: true}); hint = {k: 'text', s: `Make both bottoms ${L}. Then add the tops.`};
      s0q = {kind: 'make', model: 'bars2', m: {d: [b, L], ans: [a, A], lock: [true, false], lab: false}, s0: [a, 0], goal: 'equiv', eq: 'value', ans: A,
        html: lsEq(e) + lsCap(`First, shade ${ls3Frs(a, b)} on a bar cut into ${L} parts.`), say: `${se}. First, shade the bottom bar to match ${ls3Frs(a, b)}.`}; }
    else { ans = `${a * c}/${b * d}`; bug = {mixAdd: [`${a * d + c * b}/${b * d}`], topOnly: [`${a * c}/${d}`, `${a * c}/${b}`]};
      const on = Array.from({length: b * d}, (_, i) => +(Math.floor(i / d) < a && i % d < c)); pic = VIZ.areaGrid(d, b, {on}); hint = {k: 'text', s: `Shade ${a} of the ${b} rows and ${c} of the ${d} columns. Count where they meet.`};
      s0q = {kind: 'make', model: 'parts', m: {shape: 'grid', w: d, h: b, rect: [c, a]}, ans: a * c, eq: 'value', html: lsEq(e) + lsCap(`Shade ${a} rows and ${c} columns where they meet.`),
        say: `${se}. Shade a rectangle ${c} squares long and ${a} rows high.`}; }
    if (st == 0) return lsDq(D, 0, Object.assign({sl, bug: {}, hint}, s0q));
    return ls3FQ(D, st, ans, (st == 1 ? `<div class="pkq">${pic}</div>` : '') + lsEq(`${e} = ${SLOT_FRAC}`), `${se} equals what?`, {sl, bug, hint, eq: 'value'});
  };
  D.warm = r => { const d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return ls3FQ(D, 0, `${n}/${d}`, `<div class="pkq">${VIZ.fracBar(n, d)}</div>` + lsCap('What fraction is shaded?') + lsEq(SLOT_FRAC),
    'What fraction of the bar is shaded?', {sl: {}, hint: {k: 'text', s: 'All the parts on the bottom, the shaded parts on top.'}}); };
  D.exp = () => (kind == 'mul' ? {q: lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'grid', w: 4, h: 3}, ans: 3, eq: 'value', goal: 'some', sl: {}, demo: '6',
    html: lsCap('Shade any squares you like.'), say: 'Tap the grid to shade any squares you like.'}), nudge: 'Shade a square or more, then check.',
  react: v => { const n = Math.round(k2Val(v)); return {ctx: {a: n, b: 12, x: 12, sum: n}, lines: [`You shaded ${n} of 12 squares.`]}; }}
    : kind == 'unlike' ? {q: lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [3, 6], ans: [1, 2], lab: false}, goal: 'same', eq: 'value', ans: '1', sl: {}, demo: [1, 2],
      html: lsCap('Shade the same amount on both bars.'), say: 'Shade the same amount on both bars, any way you like.'}), nudge: 'Make both bars shaded the same amount, then check.',
    react: v => { const [a, b] = Array.isArray(v) ? v : [1, 2]; return {ctx: {a, b, x: 6, sum: 2 * a, y: 3}, lines: [`${ls3Frs(a, 3)} is ${ls3Frs(b, 6)}.`]}; }}
      : {q: lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [6, 6], ans: [1, 2], lab: false}, goal: 'shade', eq: 'value', ans: '1', sl: {}, demo: [2, 3],
        html: lsCap('Shade some parts on each bar.'), say: 'Shade some parts on each bar, any way you like.'}), nudge: 'Shade some parts, then check.',
      react: v => { const [a, b] = Array.isArray(v) ? v : [2, 3]; return {ctx: {a, b, x: 6, sum: a + b}, lines: [`${ls3Frs(a, 6)} and ${ls3Frs(b, 6)} make ${ls3Frs(a + b, 6)}.`]}; }});
  D.name = c => {
    if (kind == 'mul') return {html: `<div class="pkq">${VIZ.areaGrid(4, 3, {n: Math.min(12, c.sum)})}</div>` + lsEq(ls3Fr(c.sum, 12)), sl: c};
    if (kind == 'unlike') return {html: `<div class="pkq">${ls3Bars([c.a, c.b], [3, 6], {lab: true})}</div>` + lsEq(`${ls3Fr(c.a, 3)} = ${ls3Fr(c.b, 6)}`), sl: c};
    return {html: `<div class="pkq">${ls3Bars([c.a, c.b], [6, 6], {lab: true})}</div>` + lsEq(`${ls3Fr(c.a, 6)} + ${ls3Fr(c.b, 6)} = ${ls3Fr(c.sum, 6)}`), sl: c};
  };
  if (kind == 'like') {
    D.fix = {fn: k2FixFop, nums: r => { const x = pick(r); return [x.a, x.c, x.d, x.op == '+' ? 0 : 1]; }, label: ([a, c, d, m]) => `fop1 ${a}/${d} ${m ? '−' : '+'} ${c}/${d}`,
      sl: ([a, c, d]) => ({a, b: c, x: d}), code: {bottoms: 'addBot'}, vsay: ls3Say};
    D.mine = ls3Mine([2, 3, 8], [1, 1, 2], [11, 11, 12], [[1], [1], [1]], ['First top', 'Second top', 'Bottom'], s => `${s[0]}/${s[2]} + ${s[1]}/${s[2]}`, s => s[0] < s[2] && s[1] < s[2]);
  }
  if (kind == 'unlike') {
    D.fix = {fn: k2FixFop, nums: r => { const x = pick(r); return [x.a, x.b, x.c, x.d]; }, label: ([a, b, c, d]) => `fop3 ${a}/${b} + ${c}/${d}`,
      sl: ([a, b, c, d]) => ({a, b: c, x: d}), code: {bottom: 'renameTop', bottoms: 'addBot'}, vsay: ls3Say};
  }
  return D;
}

/* ---- decimals: Tenths & Hundredths, Compare Decimals, Add/Subtract Decimals, Multiply Decimals ---- */
const ls3DQ = (D, st, ans, html, say, o) => lsDq(D, st, Object.assign({kind: 'num', pad: 'dec', eq: 'value', ans, html, say, vsay: v => k2SayNum(+v), max: 6}, o));
const LS3_BRIEF_DTEN = `Explore: ten squares make one whole; the child shades any of them (no slots in the task).
Name it: the squares they shaded; lines on them (slot {n}: how many tenths) and the idea: the first place after the point is tenths, the next is hundredths.
Together (no slots: the decimal is the answer): line 1 before shading tenths of ten squares, line 2 before a picture of a shaded bar of ten (they type the decimal), line 3 before a fraction of ten or a hundred written as a decimal.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two to type as decimals, no help, inside a small job in the world (no slots).`;
function ls3DTen(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['dzero', 'given'], brief: LS3_BRIEF_DTEN, idea, home, fb: '{n} tenths of the whole.',
    slots: {remember: [], explore: [], name: ['n'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const k = lsRi(r, 1, 9), hint = {k: 'text', s: 'Tenths sit right after the point. Hundredths sit next.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'grid', w: 5, h: 2, whole: 1}, ans: `0.${k}`, eq: 'value', sl: {}, hint, ansSay: `${k} tenths`,
      html: lsCap('The ten squares are one whole. Shade') + lsEq(`0.${k}`), say: `The ten squares make one whole. Shade ${k2SayNum(k / 10)}.`});
    if (st == 1) return ls3DQ(D, 1, `0.${k}`, `<div class="pkq">${VIZ.fracBar(k, 10)}</div>` + lsCap('The bar is one whole. What decimal is shaded?') + SLOT, 'The bar is one whole. What decimal is shaded?',
      {sl: {}, hint, bug: {dzero: [`0.0${k}`], given: [k]}});
    if (r() < .5) return ls3DQ(D, 2, `0.${k}`, lsEq(`${ls3Fr(k, 10)} = ${SLOT}`), `${k} tenths as a decimal is what?`, {sl: {}, hint, bug: {dzero: [`0.0${k}`], given: [k]}});
    const j = lsRi(r, 1, 9);
    return ls3DQ(D, 2, `0.0${j}`, lsEq(`${ls3Fr(j, 100)} = ${SLOT}`), `${j} hundredths as a decimal is what?`, {sl: {}, hint, bug: {dzero: [`0.${j}`], given: [j]}});
  };
  D.warm = r => { const d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return ls3FQ(D, 0, `${n}/${d}`, `<div class="pkq">${VIZ.fracBar(n, d)}</div>` + lsCap('What fraction is shaded?') + lsEq(SLOT_FRAC),
    'What fraction of the bar is shaded?', {sl: {}, hint: {k: 'text', s: 'All the parts on the bottom, the shaded parts on top.'}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'grid', w: 5, h: 2, whole: 1}, ans: '0.3', eq: 'value', goal: 'some', sl: {}, demo: '0.4',
    html: lsCap('Shade any squares you like.'), say: 'The ten squares make one whole. Shade any squares you like.'}), nudge: 'Shade a square or more, then check.',
  react: v => { const n = Math.round(k2Val(v) * 10); return {ctx: {n}, lines: [`You shaded ${k2SayNum(n / 10)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.fracBar(c.n, 10)}</div>` + lsEq(`${ls3Fr(c.n, 10)} = ${k2Clean(c.n / 10)}`), sl: c});
  return D;
}
const LS3_BRIEF_DCMP = `Explore: a place-value chart with ones, tenths and hundredths; the child makes any decimal (no slots in the task).
Name it: the chart of their number; lines on it (slot {n}: their number) and the idea: compare the ones, then the tenths, then the hundredths; more digits does not mean bigger.
Together (no slots: the numbers are on the screen and the app says them): line 1 before two decimals on a number line (they pick greater than, less than or equal), line 2 before the two on a place-value chart, line 3 before the two with no picture.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two pairs; they type the bigger decimal, no help, inside a small job in the world (no slots).`;
function ls3DCmp(id, t, g, idea, home) {
  const D = ls3(id, t, g, {test: 3, petSt: 1, bugs: ['longer', 'small'], brief: LS3_BRIEF_DCMP, idea, home, fb: 'Your number is {n}.',
    slots: {remember: [], explore: [], name: ['n'], together: [], check: ['ans'], show: []}});
  const pick = r => { for (;;) { const a = lsRi(r, 1, 9) / 10, b = lsRi(r, 11, 99) / 100; if (Math.abs(a - b) < 1e-9 || b % .1 < 1e-9) continue; return r() < .5 ? [a, b] : [b, a]; } };
  D.q = (st, r) => {
    const [x, y] = pick(r), ans = x > y ? '>' : '<', big = String(Math.max(x, y)), lg = String(x).length > String(y).length ? '>' : '<', sl = {}, hint = {k: 'text', s: 'Compare the tenths first. 0.5 is the same as 0.50.'};
    if (st == 3) return ls3DQ(D, 2, big, lsEq(`${x} or ${y}?`) + lsCap('Type the bigger number.') + SLOT, `Which is bigger, ${k2SayNum(x)} or ${k2SayNum(y)}? Type it.`,
      {sl, hint, bug: {longer: lg != ans ? [String(Math.min(x, y))] : [], small: [String(Math.min(x, y))]}});
    const pic = st == 0 ? VIZ.numLine({min: 0, max: 1, step: .1, labels: [0, .5, 1], marks: [x, y]}) : st == 1 ? lsPvChart(x, [0, -1, -2], {rows: [x, y]}) : '';
    return lsPick(D.sk, D.lv, st, ans, (pic ? `<div class="pkq">${pic}</div>` : '') + lsEq(`${x} ${SLOT} ${y}`) + lsCap('Greater, less, or equal?'),
      `Is ${k2SayNum(x)} greater than, less than, or equal to ${k2SayNum(y)}?`, [['<'], ['='], ['>']], {pk: false, sl, hint, bug: {longer: [lg], small: [ans == '>' ? '<' : '>']},
        vsay: v => `${k2SayNum(x)} ${LS_SIGN[v] || v} ${k2SayNum(y)}`, after: `${k2SayNum(x)} is ${ans == '>' ? 'greater than' : 'less than'} ${k2SayNum(y)}.`});
  };
  D.warm = r => { const d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return ls3FQ(D, 0, `${n}/${d}`, `<div class="pkq">${VIZ.fracBar(n, d)}</div>` + lsCap('What fraction is shaded?') + lsEq(SLOT_FRAC),
    'What fraction of the bar is shaded?', {sl: {}, hint: {k: 'text', s: 'All the parts on the bottom, the shaded parts on top.'}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pvc', m: {pl: [0, -1, -2]}, goal: 'moved', eq: 'value', ans: 1, sl: {}, demo: [0, 4, 5],
    html: lsCap('Make any decimal on the chart!'), say: 'Make any decimal you like on the place value chart.'}), nudge: 'Change a place, then check.',
  react: v => { const n = Array.isArray(v) ? K2MM.pvc.val({m: {pl: [0, -1, -2]}}, v) : +v; return {ctx: {n}, lines: [`You made ${k2SayNum(n)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsPvChart(c.n, [0, -1, -2])}</div>` + lsEq(String(c.n)), sl: c});
  return D;
}
const LS3_BRIEF_DOP = `Explore: a place-value chart with ones, tenths and hundredths; the child makes any decimal (no slots in the task).
Name it: the chart of their number; lines on it (slot {n}: their number) and the idea: IDEA.
Together (slots {a} {b}: the two numbers; never the answer): line 1 before LINE1, line 2 before LINE2, line 3 before the problem in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two problems to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3DOp(id, t, g, mul, idea, home) {
  const div = mul == 'div';
  if (div) return ls3DDiv(id, t, g, idea, home);
  const D = ls3(id, t, g, {petSt: 1, bugs: mul ? ['dpt', 'slip'] : ['point', 'slip'], idea, home, fb: 'Your number is {n}.',
    brief: LS3_BRIEF_DOP.replace('IDEA', mul ? 'multiply as if there were no points, then count the digits after both points' : 'line up the points; a whole number has its point at the end')
      .replace('LINE1', mul ? 'multiplying the same digits without the points' : 'the two numbers lined up on a place-value chart (they type the answer)')
      .replace('LINE2', mul ? 'putting the point into the answer' : 'the problem written in columns with the points lined up'),
    slots: {remember: ['a', 'b'], explore: [], name: ['n'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => {
    if (mul) { const x = lsRi(r, 2, 49) / 10, y = r() < .6 ? lsRi(r, 2, 9) : lsRi(r, 2, 9) / 10; return x % 1 ? [x, y] : [k2Clean(x + .1), y]; }
    for (;;) { const w = lsRi(r, 2, 19), dv = lsRi(r, 101, 999) / 100, add = r() < .6; if (!add && dv > w) continue; return add ? (r() < .5 ? [w, dv, '+'] : [dv, w, '+']) : [w, dv, '−']; }
  };
  D.q = (st, r) => {
    const [x, y, op0] = pick(r), op = mul ? '×' : op0, c = k2Clean(mul ? x * y : op == '+' ? x + y : x - y), sl = {a: x, b: y}, sv = v => k2SayNum(v), w = op == '+' ? 'plus' : op == '−' ? 'minus' : 'times';
    let bug;
    if (mul) bug = {dpt: [k2Clean(c * 10), k2Clean(c / 10)], slip: [k2Clean(c + y)]};
    else { const W = Number.isInteger(x) ? x : y, P = k2Dp(Number.isInteger(x) ? y : x), wn = W / Math.pow(10, P), X = Number.isInteger(x) ? wn : x, Y = Number.isInteger(x) ? y : wn; bug = {point: [k2Clean(op == '+' ? X + Y : X - Y)].filter(v => v >= 0), slip: [k2Clean(c + 1), k2Clean(c - 1)]}; }
    const hint = {k: 'text', s: mul ? 'Multiply without the points. Then count the digits after both points.' : 'Line up the points. A whole number has its point at the end.'};
    const o = {sl, bug, hint};
    if (st == 0) {
      if (mul) { const X = +String(x).replace('.', ''), Y = +String(y).replace('.', ''); return lsDq(D, 0, Object.assign(o, {kind: 'num', ans: X * Y, bug: {}, html: lsEq(`${x} × ${y}`) + lsCap('First, multiply without the points:') + lsEq(`${X} × ${Y} = ${SLOT}`),
        say: `${sv(x)} times ${sv(y)}. First multiply without the points: ${X} times ${Y}.`})); }
      return ls3DQ(D, 0, c, `<div class="pkq">${lsPvChart(x, [1, 0, -1, -2], {rows: [x, y]})}</div>` + lsEq(`${x} ${op} ${y} = ${SLOT}`), `${sv(x)} ${w} ${sv(y)}. The points are lined up.`, o);
    }
    if (st == 1) {
      if (mul) { const X = +String(x).replace('.', ''), Y = +String(y).replace('.', ''); return ls3DQ(D, 1, c, lsCap(`${X} × ${Y} = ${X * Y}. Now put the point in.`) + lsEq(`${x} × ${y} = ${SLOT}`), `${X} times ${Y} is ${X * Y}. So ${sv(x)} times ${sv(y)} equals what?`, o); }
      return ls3DQ(D, 1, c, ST.vert([x.toFixed(2), y.toFixed(2)], op == '+' ? '+' : '−', SLOT), `${sv(x)} ${w} ${sv(y)} equals what?`, o);
    }
    return ls3DQ(D, 2, c, lsEq(`${x} ${op} ${y} = ${SLOT}`), `${sv(x)} ${w} ${sv(y)} equals what?`, o);
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pvc', m: {pl: [0, -1, -2]}, goal: 'moved', eq: 'value', ans: 1, sl: {}, demo: [2, 4, 5],
    html: lsCap('Make any decimal on the chart!'), say: 'Make any decimal you like on the place value chart.'}), nudge: 'Change a place, then check.',
  react: v => { const n = Array.isArray(v) ? K2MM.pvc.val({m: {pl: [0, -1, -2]}}, v) : +v; return {ctx: {n}, lines: [`You made ${k2SayNum(n)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsPvChart(c.n, [0, -1, -2])}</div>` + lsEq(String(c.n)), sl: c});
  D.fix = mul ? {fn: k2FixDecMul, nums: pick, label: ([x, y]) => `${x} × ${y} = ?`, sl: ([x, y]) => ({a: x, b: y}), code: (i, k) => (i == 0 ? 'slip' : 'dpt'), vsay: v => k2SayNum(+v)}
    : {fn: k2FixDecAdd, nums: pick, label: ([x, y, op]) => `${x} ${op} ${y} = ?`, sl: ([x, y]) => ({a: x, b: y}), code: {point: 'point'}, vsay: v => k2SayNum(+v)};
  return D;
}

/* ---- measuring: Perimeter, Area, Volume of a Box ---- */
const LS3_BRIEF_GEO = `Explore: EXP (no slots in the task).
Name it: what they made; lines on it (slots {a} {b}: its sides, {sum}: WHAT) and the idea: IDEA.
Together (slots {a} {b}: the sides; never the answer): line 1 before LINE1, line 2 before LINE2, line 3 before the sides told in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3Geo(id, t, g, kind, bugs, idea, home) {
  const W = {per: ['the child makes any rectangle of dots with steppers', 'the distance around', 'perimeter is the distance around: add all the sides', 'a rectangle with all four sides labelled (they add them)', 'a rectangle with two sides labelled (they type the perimeter)'],
    area: ['the child shades any squares on a grid', 'the squares inside', 'area counts the squares inside: rows times how many in each row', 'shading a rectangle on a grid', 'a picture of a shaded rectangle (they type the area)'],
    vol: ['the child makes any array of cubes: one layer', 'the cubes in the box', 'volume counts the cubes: one layer times how many layers', 'one layer of a box and how many layers (they type the volume)', 'a picture of a box (they type the volume)']}[kind];
  const D = ls3(id, t, g, {petSt: 1, bugs, idea, home, fb: kind == 'per' ? 'Around {a} by {b} is {sum}.' : kind == 'area' ? 'You shaded {sum} squares.' : 'One layer of {a} by {b} is {sum} cubes.',
    brief: LS3_BRIEF_GEO.replace('EXP', W[0]).replace('WHAT', W[1]).replace('IDEA', W[2]).replace('LINE1', W[3]).replace('LINE2', W[4]).replace(kind == 'vol' ? 'slots {a} {b}: the sides' : '@', kind == 'vol' ? 'slots {a} {b}: the length and width, {k}: the layers' : '@')
      .replace(kind == 'vol' ? 'inside a small job in the world (slots {a} {b})' : '@', 'inside a small job in the world (slots {a} {b} {k})'),
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'sum'], together: kind == 'vol' ? ['a', 'b', 'k'] : ['a', 'b'], check: ['ans'], show: kind == 'vol' ? ['a', 'b', 'k'] : ['a', 'b']}});
  D.q = (st, r) => {
    if (kind == 'per') {
      let a = lsRi(r, 2, 12), b = lsRi(r, 2, 9); if (a == b) a++;
      const c = 2 * a + 2 * b, sl = {a, b}, bug = {area: [a * b], half: [a + b]}, hint = {k: 'text', s: `Go around: ${a} + ${b} + ${a} + ${b}.`};
      if (st == 0) return lsDq(D, 0, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${VIZ.rectSides(a, b, {w: a, h: b}, {all: 1, unit: 'cm'})}</div>` + lsCap('Add all four sides.') + SLOT + ' cm', say: `A rectangle ${a} centimeters by ${b}. Add all four sides.`});
      if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${VIZ.rectSides(a, b, {w: a, h: b}, {unit: 'cm'})}</div>` + lsCap('What is the perimeter?') + SLOT + ' cm', say: `A rectangle ${a} centimeters by ${b}. What is its perimeter?`});
      return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsCap(`A rectangle is ${a} cm long and ${b} cm wide. Perimeter?`) + SLOT + ' cm', say: `A rectangle is ${a} centimeters long and ${b} wide. What is its perimeter?`});
    }
    if (kind == 'area') {
      const big = st == 2, a = lsRi(r, 2, big ? 9 : 6), b = lsRi(r, 2, big ? 9 : 4), c = a * b, sl = {a, b}, bug = {perim: [2 * a + 2 * b], mulAdd: [a + b]}, hint = {k: 'text', s: `${b} rows of ${a} squares.`};
      if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'grid', w: 6, h: 4, rect: [a, b]}, ans: c, eq: 'value', sl, bug: {}, hint, ansSay: `${c} squares`,
        html: lsCap(`Shade a rectangle ${a} squares long and ${b} squares wide.`), say: `Shade a rectangle ${a} squares long and ${b} squares wide.`});
      if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${VIZ.areaGrid(a, b)}</div>` + lsCap('What is the area in squares?') + SLOT, say: 'How many squares is the area?'});
      return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsCap(`A rectangle is ${a} units long and ${b} units wide. Area?`) + SLOT, say: `A rectangle is ${a} units long and ${b} wide. What is its area?`});
    }
    const a = lsRi(r, 2, 6), b = lsRi(r, 2, 5), k = lsRi(r, 2, 5), c = a * b * k, sl = {a, b, k}, bug = {layer: [a * b], mulAdd: [a + b + k]}, hint = {k: 'text', s: `One layer is ${a} × ${b}. There are ${k} layers.`};
    if (st == 0) return lsDq(D, 0, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${VIZ.array(b, a)}</div>` + lsCap(`One layer of cubes. The box has ${k} layers like it. How many cubes?`) + SLOT,
      say: `One layer has ${b} rows of ${a} cubes. The box has ${k} layers. How many cubes?`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${VIZ.solid([{l: a, h: k}], {w: b})}</div>` + lsCap(`${a} long, ${b} wide, ${k} high. Volume?`) + SLOT,
      say: `A box ${a} cubes long, ${b} wide and ${k} high. What is its volume?`});
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${a} × ${b} × ${k} = ${SLOT}`), say: `A box is ${a} by ${b} by ${k}. What is its volume?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = kind == 'area' ? () => ({q: lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'grid', w: 6, h: 4}, ans: 6, eq: 'value', goal: 'some', sl: {}, demo: '8',
    html: lsCap('Shade any squares you like.'), say: 'Tap the grid to shade any squares you like.'}), nudge: 'Shade a square or more, then check.',
  react: v => { const n = Math.round(k2Val(v)); return {ctx: {a: n, b: 1, sum: n}, lines: [`You shaded ${n} squares.`]}; }})
    : ls3ArrExp(D, kind == 'per' ? 'Make any rectangle of dots you like.' : 'Make one layer of cubes, any size you like.',
      (a, b) => ({ctx: {a, b, sum: kind == 'per' ? 2 * a + 2 * b : a * b}, lines: [kind == 'per' ? `Around ${a} by ${b} is ${2 * a + 2 * b}.` : `One layer of ${a} by ${b} is ${a * b} cubes.`]}));
  D.name = c => (kind == 'per' ? {html: `<div class="pkq">${VIZ.rectSides(c.b, c.a, {w: c.b, h: c.a}, {all: 1})}</div>` + lsEq(`${c.b} + ${c.a} + ${c.b} + ${c.a} = ${c.sum}`), sl: c}
    : kind == 'area' ? {html: `<div class="pkq">${VIZ.areaGrid(6, 4, {n: Math.min(24, c.sum)})}</div>` + lsEq(`${c.sum} squares`), sl: c}
      : {html: `<div class="pkq">${VIZ.solid([{l: c.b, h: 2}], {w: c.a})}</div>` + lsEq(`${c.a} × ${c.b} = ${c.sum}`), sl: c});
  return D;
}

/* ---- Order of Operations (times and divide first; the pet's steps can do the plus first) ---- */
const LS3_BRIEF_OOO = `Explore: the child picks three numbers for a problem of the form {a} plus {b} times {k}, with steppers (no slots in the task).
Name it: their problem worked out; lines on it (slots {a} {b} {k}: the three numbers, {sum}: the answer) and the idea: times and divide come before plus and minus.
Together (slots {a} {b} {k}: the numbers; never the answer): line 1 before working out the times part first, line 2 before the whole problem with the times part marked, line 3 before the problem in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two problems to type, no help, inside a small job in the world (slots {a} {b} {k}).`;
function ls3Ooo(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['order', 'slip'], brief: LS3_BRIEF_OOO, idea, home, fb: '{a} plus {b} times {k} is {sum}.',
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'k', 'sum'], together: ['a', 'b', 'k'], check: ['ans'], show: ['a', 'b', 'k']}});
  const pick = r => { for (;;) { const a = lsRi(r, 2, 20), b = lsRi(r, 2, 9), k = lsRi(r, 2, 9), f = r() < .6; return [a, b, k, f ? '+' : '×']; } };
  D.q = (st, r) => {
    const [a, b, k, o] = pick(r), e = o == '+' ? `${a} + ${b} × ${k}` : `${a} × ${b} + ${k}`, c = o == '+' ? a + b * k : a * b + k, sl = {a, b, k};
    const bug = {order: [o == '+' ? (a + b) * k : a * (b + k)], slip: [c + 1, c - 1]}, hint = {k: 'text', s: 'Do the times part first. Then add.'};
    const sp = e.replace('+', 'plus').replace('×', 'times').replace('×', 'times');
    if (st == 0) { const x = o == '+' ? b : a, y = o == '+' ? k : b; return lsDq(D, 0, {kind: 'num', ans: x * y, sl, bug: {}, hint, html: lsEq(e) + lsCap('First, the times part:') + lsEq(`${x} × ${y} = ${SLOT}`), say: `${sp}. First the times part: ${x} times ${y}.`}); }
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(o == '+' ? `${a} + <u>${b} × ${k}</u> = ${SLOT}` : `<u>${a} × ${b}</u> + ${k} = ${SLOT}`) + lsCap('The times part first.'), say: `${sp} equals what? The times part first.`});
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${e} = ${SLOT}`), say: `${sp} equals what?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: [3, 4, 5], lo: [1, 1, 1], hi: [20, 9, 9], ds: [[1], [1], [1]], lab: ['First', 'Second', 'Third'], fmt: s => `${s[0]} + ${s[1]} × ${s[2]}`},
    raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {}, html: lsCap('Pick three numbers.'), say: 'Pick any three numbers for this problem.'}), nudge: 'Change a number, then check.',
  react: v => { const [a, b, k] = Array.isArray(v) ? v : [3, 4, 5]; return {ctx: {a, b, k, sum: a + b * k}, lines: [`${a} plus ${b} times ${k} is ${a + b * k}.`]}; }});
  D.name = c => ({html: lsEq(`${c.a} + ${c.b} × ${c.k}`) + lsEq(`${c.a} + ${c.b * c.k} = ${c.sum}`), sl: c});
  D.fix = {fn: k2FixOoo, nums: r => pick(r), label: ([a, b, k, o]) => (o == '×' ? `${a} × ${b} + ${k} = ?` : `${a} + ${b} × ${k} = ?`), sl: ([a, b, k]) => ({a, b, k}), code: {order: 'order'}};
  D.mine = ls3Mine([3, 4, 5], [1, 1, 1], [20, 9, 9], [[1], [1], [1]], ['First', 'Second', 'Third'], s => `${s[0]} + ${s[1]} × ${s[2]}`, () => true);
  return D;
}

/* ---- more: Time to the Minute, Find the Missing Side, Convert Units, Mixed Numbers, Divide Decimals ---- */
const LS3_BRIEF_TIME = `Explore: a clock with two hands the child moves, the long hand by one minute or five; they set any time they like (no slots in the task).
Name it: the clock they set; lines on it (slots {time}: the time as it is said, {hour}: the hour) and the idea: count the long hand by fives to the last number, then on by ones.
Together (line 1 slot {time}; lines 2 and 3 have none, the time is the answer): line 1 before setting {time} on the clock, line 2 before reading a clock picture and picking its time, line 3 before working out the minute from where the long hand points.
Remember: a warm-up: set an o'clock time (slot {time}).
Show: two minutes to type, no help, inside a small job in the world (no slots).`;
function ls3Time(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['minute', 'given'], brief: LS3_BRIEF_TIME, idea, home, fb: 'You set {time}.',
    slots: {remember: ['time'], explore: [], name: ['time', 'hour'], together: [['time'], [], []], check: ['ans'], show: []}});
  D.q = (st, r) => {
    let m; do m = lsRi(r, 1, 58); while (m % 5 == 0);
    const h = lsRi(r, 1, 12), mm = String(m).padStart(2, '0'), ans = `${h}:${mm}`, k = Math.floor(m / 5), e = m % 5, sl = {time: mmTimeSay(h, m), hour: h};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.clock(h, m)}<div>Count by fives to the ${k || 12}, then on by ones.</div></div>`, w: 'Count by fives, then on by ones.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: true}, eq: 'exact', ans, ansSay: mmTimeSay(h, m), hm: [h, m], sl, hint, bug: {},
      html: lsEq(ans) + lsCap('Set the clock.'), say: `Show ${mmTimeSay(h, m)} on the clock.`});
    if (st == 1) {
      const ch = [...new Set([ans, `${h}:${String((m + 5) % 60).padStart(2, '0')}`, `${h}:${String((m + 55) % 60).padStart(2, '0')}`])];
      return lsPick(D.sk, D.lv, 1, ans, `<div class="pkq">${VIZ.clock(h, m)}</div>` + lsCap('What time is it?') + SLOT, 'What time does the clock show?', ch.sort().map(x => [x]),
        {hm: [h, m], sl: {}, hint, pk: false, bug: {minute: ch.filter(x => x != ans)}, vsay: v => mmTimeSay(...String(v).split(':').map(Number)), after: `It is ${mmTimeSay(h, m)}.`});
    }
    return lsDq(D, 2, {kind: 'num', ans: m, sl: {}, hint, bug: {minute: [m + 5, m - 5].filter(x => x > 0 && x < 60), given: [k, e].filter(x => x > 0)},
      html: lsCap(`The long hand is ${e} small mark${e > 1 ? 's' : ''} past the ${k || 12}. What minute is it?`) + SLOT, say: `The long hand is ${e} small marks past the ${k || 12}. What minute is it?`});
  };
  D.warm = lsWarmHour(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: true}, eq: 'exact', ans: '3:00', goal: 'moved', sl: {}, demo: '3:17',
    html: lsCap('Set any time you like!'), say: 'Move the hands to any time you like.'}), nudge: 'Move a hand, then check.',
  react: v => { const [h, m] = String(v).split(':').map(Number); return {ctx: {hour: h, min: m, time: mmTimeSay(h, m)}, lines: [`You set ${mmTimeSay(h, m)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.clock(c.hour, c.min)}</div>` + lsEq(`${c.hour}:${String(c.min).padStart(2, '0')}`), sl: c});
  return D;
}
const LS3_BRIEF_SIDE = `Explore: the child makes any rectangle of dots with steppers (no slots in the task).
Name it: the rectangle they made; lines on it (slots {a} {b}: its sides, {sum}: the distance around) and the idea: half the perimeter is one long side and one short side.
Together (slots {a}: the side shown, {n}: the perimeter; never the missing side, the answer): line 1 before a rectangle with one side and the perimeter shown, line 2 before the same as a sum with a box, line 3 before the same told in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two missing sides to type, no help, inside a small job in the world (slots {a} {n}).`;
function ls3Side(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['sideP', 'half'], brief: LS3_BRIEF_SIDE, idea, home, fb: 'Around {a} by {b} is {sum}.',
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'sum'], together: ['a', 'n'], check: ['ans'], show: ['a', 'n']}});
  D.q = (st, r) => {
    let a = lsRi(r, 3, 12), b = lsRi(r, 2, 9); if (a == b) a++;
    const P = 2 * a + 2 * b, sl = {a, n: P}, bug = {sideP: [P - a], half: [P / 2, P - 2 * a]}, hint = {k: 'text', s: `Half of ${P} is ${P / 2}. That is ${a} and the missing side.`};
    if (st == 0) return lsDq(D, 0, {kind: 'num', ans: b, sl, bug, hint, html: `<div class="pkq">${VIZ.rectSides(a, b, {w: a, h: '?'}, {unit: 'cm'})}</div>` + lsCap(`The perimeter is ${P} cm. The missing side?`) + SLOT + ' cm',
      say: `The perimeter is ${P} centimeters. One side is ${a}. What is the missing side?`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: b, sl, bug, hint, html: lsEq(`${a} + ${SLOT} + ${a} + ? = ${P}`), say: `${a} plus a side plus ${a} plus the same side is ${P}. What is the side?`});
    return lsDq(D, 2, {kind: 'num', ans: b, sl, bug, hint, html: lsCap(`A rectangle has a perimeter of ${P} cm. One side is ${a} cm. The other side?`) + SLOT + ' cm',
      say: `Perimeter ${P} centimeters, one side ${a}. How long is the other side?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = ls3ArrExp(D, 'Make any rectangle of dots you like.', (a, b) => ({ctx: {a, b, sum: 2 * a + 2 * b}, lines: [`Around ${a} by ${b} is ${2 * a + 2 * b}.`]}));
  D.name = c => ({html: `<div class="pkq">${VIZ.rectSides(c.b, c.a, {w: c.b, h: c.a}, {all: 1})}</div>` + lsEq(`${c.b} + ${c.a} = ${c.sum / 2}`), sl: c});
  return D;
}
const LS3_UNITS = [['feet', 'inches', 12, 'foot'], ['yards', 'feet', 3, 'yard'], ['meters', 'centimeters', 100, 'meter'], ['kilograms', 'grams', 1000, 'kilogram'], ['hours', 'minutes', 60, 'hour'], ['minutes', 'seconds', 60, 'minute']];
const LS3_BRIEF_CONV = `Explore: the child picks how many of a big unit (feet) with a stepper (no slots in the task); the app says how many of the small unit that is.
Name it: lines on their pick (slots {n}: how many big units, {sum}: how many small units) and the idea: a smaller unit needs more of it, so multiply.
Together (slot {n}: how many big units; never the answer; the units change from item to item and the app says them): line 1 before a table that counts up by one unit, line 2 before one unit's size and a problem, line 3 before the problem only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two to type, no help, inside a small job in the world (slot {n}).`;
function ls3Conv(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['conv', 'skip'], brief: LS3_BRIEF_CONV, idea, home, fb: '{n} feet is {sum} inches.',
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'sum'], together: ['n'], check: ['ans'], show: ['n']}});
  D.q = (st, r) => {
    const [B, S, k, one] = LS3_UNITS[lsRi(r, 0, 5)], n = lsRi(r, 2, 9), c = n * k, sl = {n}, bug = {conv: [n + k], skip: [c - k, c + k]}, hint = {k: 'text', s: `One ${one} is ${k} ${S}. ${n} ${B} is ${n} times ${k}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'num', ans: c, sl, bug, hint, max: 5, html: `<div class="pkq">${VIZ.tableInOut([[1, k], [2, 2 * k], [3, 3 * k], [n, '?']], {head: [B, S]})}</div>` + SLOT + ' ' + S,
      say: `The table counts ${B} and ${S}. How many ${S} are ${n} ${B}?`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, max: 5, html: lsCap(`1 ${one} = ${k} ${S}`) + lsEq(`${n} ${B} = ${SLOT} ${S}`), say: `One ${one} is ${k} ${S}. How many ${S} are ${n} ${B}?`});
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, max: 5, html: lsEq(`${n} ${B} = ${SLOT} ${S}`), say: `How many ${S} are ${n} ${B}?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: [3], lo: [1], hi: [9], ds: [[1]], lab: ['Feet'], fmt: s => `${s[0]} feet`}, raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {},
    html: lsCap('Pick how many feet.'), say: 'Pick how many feet. I will tell you the inches.'}), nudge: 'Change the number, then check.',
  react: v => { const n = Array.isArray(v) ? v[0] : 3; return {ctx: {n, sum: 12 * n}, lines: [`${n} feet is ${12 * n} inches.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.tableInOut([[1, 12], [c.n, c.sum]], {head: ['feet', 'inches']})}</div>` + lsEq(`${c.n} × 12 = ${c.sum}`), sl: c});
  return D;
}
const LS3_BRIEF_MIX = `Explore: two fraction bars cut in fourths; the child shades any parts of each (no slots in the task).
Name it: the parts they shaded (slots {a}: all the shaded fourths) and the idea: every full bar is one whole; the parts left over make the fraction.
Together (no slots: the fraction is on the screen and the app says it): line 1 before a picture of bars (they type the whole bars and the parts left), line 2 before a picture on a number line, line 3 before the fraction in symbols only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two to type as mixed numbers, no help, inside a small job in the world (no slots).`;
function ls3Mix(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['mixTop', 'slip'], brief: LS3_BRIEF_MIX, idea, home, fb: 'You shaded {a} fourths.',
    slots: {remember: [], explore: [], name: ['a'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    let d, n; do { d = lsRi(r, 2, 6); n = lsRi(r, d + 1, 3 * d - 1); } while (n % d == 0);
    const w = Math.floor(n / d), m = n % d, ans = `${w} ${m}/${d}`, bug = {mixTop: [`${w} ${n}/${d}`], slip: [`${w + 1} ${m}/${d}`, `${w - 1} ${m}/${d}`].filter(x => !/^0 /.test(x))}, hint = {k: 'text', s: `Each full bar is one whole: ${d} ${FC_NAMES[d]}s. Count the full bars, then the parts left.`};
    const o = {kind: 'num', sep: 'mix', ans, sl: {}, bug, hint, vsay: ls3Say};
    if (st == 0) return lsDq(D, 0, Object.assign(o, {html: `<div class="pkq">${VIZ.fracBar(n, d, {w: 200})}</div>` + lsEq(`${ls3Fr(n, d)} = ${SLOT_MIX}`), say: `${ls3Frs(n, d)}. How many whole bars, and how many parts left?`}));
    if (st == 1) return lsDq(D, 1, Object.assign(o, {html: `<div class="pkq">${VIZ.numLine({min: 0, max: 3, step: 1 / d, den: d, labels: [0, 1, 2, 3], marks: [n / d]})}</div>` + lsEq(`${ls3Fr(n, d)} = ${SLOT_MIX}`),
      say: `Write ${ls3Frs(n, d)} as a mixed number.`}));
    return lsDq(D, 2, Object.assign(o, {html: lsEq(`${ls3Fr(n, d)} = ${SLOT_MIX}`), say: `Write ${ls3Frs(n, d)} as a mixed number.`}));
  };
  D.warm = r => { const d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return ls3FQ(D, 0, `${n}/${d}`, `<div class="pkq">${VIZ.fracBar(n, d)}</div>` + lsCap('What fraction is shaded?') + lsEq(SLOT_FRAC),
    'What fraction of the bar is shaded?', {sl: {}, hint: {k: 'text', s: 'All the parts on the bottom, the shaded parts on top.'}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'bars2', m: {d: [4, 4], ans: [4, 1], lab: false}, goal: 'shade', eq: 'value', ans: '1', sl: {}, demo: [4, 3],
    html: lsCap('Shade any parts of both bars.'), say: 'Shade any parts you like on both bars.'}), nudge: 'Shade some parts, then check.',
  react: v => { const [x, y] = Array.isArray(v) ? v : [4, 3], a = x + y; return {ctx: {a}, lines: [`You shaded ${ls3Frs(a, 4)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.fracBar(c.a, 4, {w: 200})}</div>` + lsEq(c.a > 4 && c.a % 4 ? `${ls3Fr(c.a, 4)} = ${Math.floor(c.a / 4)} ${ls3Fr(c.a % 4, 4)}` : ls3Fr(c.a, 4)), sl: c});
  return D;
}
const LS3_BRIEF_DDIV = `Explore: a place-value chart with ones, tenths and hundredths; the child makes any decimal (no slots in the task).
Name it: the chart of their number; lines on it (slot {n}: their number) and the idea: divide as if there were no point, then put the point back in the same place.
Together (slots {a}: the decimal, {b}: the whole number it is divided by; never the answer): line 1 before dividing the digits without the point, line 2 before putting the point into the answer, line 3 before the problem in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two problems to type, no help, inside a small job in the world (slots {a} {b}).`;
function ls3DDiv(id, t, g, idea, home) {
  const D = ls3(id, t, g, {petSt: 1, bugs: ['dpt', 'slip'], brief: LS3_BRIEF_DDIV, idea, home, fb: 'Your number is {n}.',
    slots: {remember: ['a', 'b'], explore: [], name: ['n'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  D.q = (st, r) => {
    const b = lsRi(r, 2, 9), qn = lsRi(r, 11, 99), x = k2Clean(qn * b / 10), c = k2Clean(qn / 10), X = qn * b, sl = {a: x, b}, sv = v => k2SayNum(v);
    const bug = {dpt: [k2Clean(c * 10), k2Clean(c / 10)], slip: [k2Clean(c + .1), k2Clean(c - .1)]}, hint = {k: 'text', s: `Divide ${X} by ${b}, then put the point back: one digit after it.`};
    if (st == 0) return lsDq(D, 0, {kind: 'num', ans: qn, sl, bug: {}, hint, html: lsEq(`${x} ÷ ${b}`) + lsCap('First, divide without the point:') + lsEq(`${X} ÷ ${b} = ${SLOT}`),
      say: `${sv(x)} divided by ${b}. First divide without the point: ${X} divided by ${b}.`});
    if (st == 1) return ls3DQ(D, 1, c, lsCap(`${X} ÷ ${b} = ${qn}. Now put the point in.`) + lsEq(`${x} ÷ ${b} = ${SLOT}`), `${X} divided by ${b} is ${qn}. So ${sv(x)} divided by ${b} equals what?`, {sl, bug, hint});
    return ls3DQ(D, 2, c, lsEq(`${x} ÷ ${b} = ${SLOT}`), `${sv(x)} divided by ${b} equals what?`, {sl, bug, hint});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pvc', m: {pl: [0, -1, -2]}, goal: 'moved', eq: 'value', ans: 1, sl: {}, demo: [2, 4, 5],
    html: lsCap('Make any decimal on the chart!'), say: 'Make any decimal you like on the place value chart.'}), nudge: 'Change a place, then check.',
  react: v => { const n = Array.isArray(v) ? K2MM.pvc.val({m: {pl: [0, -1, -2]}}, v) : +v; return {ctx: {n}, lines: [`You made ${k2SayNum(n)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${lsPvChart(c.n, [0, -1, -2])}</div>` + lsEq(String(c.n)), sl: c});
  return D;
}

// ---- the lessons, in map order (Multiply Mountain and Fraction Forest: 3rd grade; Factor Factory and Decimal Desert: 4th grade;
// Volcano Lab and Crystal Caves: 5th grade). The idea and tonight's question here are the hand-written fallback. ----
const ls3P = (a, b) => r => [lsRi(r, a[0], a[1]), b[Math.floor(r() * b.length)]];
lsDraft3('arr2', ls3Fact('arr2', 'Arrays', 3, ls3P([2, 5], [2, 3, 4, 5, 6]), 2, 'An array is equal rows: rows times how many in each row.', 'Ask {name}: "How many eggs are in 3 rows of 4?"'));
lsDraft3('mfact1', ls3Fact('mfact1', 'Easy Times Facts', 3, ls3P([2, 9], [2, 5, 10]), 5, 'Times 2, 5 and 10 are skip counting.', 'Ask {name}: "What is 7 times 5? Count by fives."'));
lsDraft3('mfact2', ls3Fact('mfact2', 'Times 3 & 4', 3, ls3P([2, 9], [3, 4]), 3, 'Times 4 is double, then double again.', 'Ask {name}: "What is 6 times 4? Double 6, then double again."'));
lsDraft3('dfact1', ls3Div('dfact1', 'Easy Dividing', 3, r => [[2, 5, 10][Math.floor(r() * 3)], lsRi(r, 2, 9)], 'Dividing is sharing into equal rows.', 'Ask {name}: "20 grapes in rows of 5. How many rows?"'));
lsDraft3('mfact3', ls3Fact('mfact3', 'Times 6 to 9', 3, ls3P([2, 9], [6, 7, 8, 9]), 6, 'A hard fact is two easy facts put together.', 'Ask {name}: "What is 7 times 8?"'));
lsDraft3('dfact2', ls3Div('dfact2', 'Divide by 3 & 4', 3, r => [[3, 4][Math.floor(r() * 2)], lsRi(r, 2, 9)], 'Every division has a times fact behind it.', 'Ask {name}: "What is 24 divided by 4?"'));
lsDraft3('mfact4', ls3Fact('mfact4', 'All Times Facts', 3, r => [lsRi(r, 2, 9), lsRi(r, 2, 9)], 4, 'Turning an array gives the same total.', 'Ask {name}: "What is 6 times 7? And 7 times 6?"'));
lsDraft3('dfact3', ls3Div('dfact3', 'Divide by 6 to 9', 3, r => [lsRi(r, 6, 9), lsRi(r, 2, 9)], 'Use the times fact you know to divide.', 'Ask {name}: "56 divided by 8. Which times fact helps?"'));
lsDraft3('dfact4', ls3Div('dfact4', 'All Dividing', 3, r => [lsRi(r, 2, 9), lsRi(r, 2, 9)], 'Multiply back to check a division.', 'Ask {name}: "What is 63 divided by 9?"'));
lsDraft3('mbig1', ls3BMul('mbig1', 'Times Tens & Hundreds', 3, 'tens', ['tens0', 'zeros'], 'Times tens means the fact, then tens.', 'Ask {name}: "What is 4 times 30?"'));
lsDraft3('frac2', ls3FName('frac2', 'Name the Fraction', 3, false, 'The bottom number counts all the equal parts.', 'Ask {name}: "A pizza has 8 slices. You eat 3. What fraction is that?"'));
lsDraft3('round1', ls3Round('round1', 'Round to 10', 3, 'ten', 'Round to the nearer ten. Halfway goes up.', 'Ask {name}: "Is 47 nearer to 40 or to 50?"'));
lsDraft3('frac3', ls3FName('frac3', 'Fractions on a Line', 3, true, 'A fraction is a point on the number line.', 'Ask {name}: "Where is one half on a ruler from 0 to 1?"'));
lsDraft3('sub6', ls3Sub('sub6', '3-Digit Take Away', 3, false, 'When a place runs out, break one from the next place.', 'Ask {name}: "What is 452 take away 178?"'));
lsDraft3('geo1', ls3Geo('geo1', 'Perimeter', 3, 'per', ['area', 'half'], 'Perimeter is the distance all the way around.', 'Ask {name} to find the perimeter of a book with a ruler.'));
lsDraft3('frac4', ls3FCmp('frac4', 'Compare Fractions', 3, false, 'More equal parts means smaller pieces.', 'Ask {name}: "Which is bigger, one half or one fourth?"'));
lsDraft3('time5', ls3Time('time5', 'Time to the Minute', 3, 'Count the long hand by fives, then on by ones.', 'Ask {name} to read a clock at 4:37.'));
lsDraft3('round2', ls3Round('round2', 'Round to 100', 3, 'hund', 'Look at the tens digit to round to a hundred.', 'Ask {name}: "Is 362 nearer to 300 or to 400?"'));
lsDraft3('geo2', ls3Geo('geo2', 'Area', 3, 'area', ['perim', 'mulAdd'], 'Area counts the squares inside a shape.', 'Ask {name} how many floor tiles cover a small rug.'));
lsDraft3('frac5', ls3FEq('frac5', 'Equal Fractions', 3, false, 'Equal fractions cover the same amount of the whole.', 'Ask {name}: "Is 2 fourths the same as 1 half?"'));
lsDraft3('sub7', ls3Sub('sub7', 'Take Away Across Zeros', 3, true, 'A zero place breaks a hundred first, then a ten.', 'Ask {name}: "What is 403 take away 158?"'));
lsDraft3('mfact5', ls3BMul('mfact5', 'Times 11 & 12', 4, 'el', ['mcarry', 'skip', 'tens0'], 'Times 12 is times 10 and times 2 put together.', 'Ask {name}: "What is 12 times 7?"'));
lsDraft3('pv4', ls3Pv('pv4', 'Place Value to 999,999', 4, 'big', 'Each place is worth ten times the place to its right.', 'Ask {name}: "In 352,104, what is the 5 worth?"'));
lsDraft3('mbig2', ls3BMul('mbig2', '2-Digit Times 1-Digit', 4, '2d', ['mcarry', 'tens0', 'slip'], 'Multiply each place, then trade.', 'Ask {name}: "What is 4 times 23?"'));
lsDraft3('big6', ls3Big('big6', 'Add 4-Digit Numbers', 4, '+', 4, 'Line up the places and add from the ones.', 'Ask {name}: "What is 2,475 plus 1,368?"'));
lsDraft3('dbig1', ls3DivB('dbig1', 'Divide 2-Digit Numbers', 4, 'two', ['drop', 'remBig', 'slip'], 'Share the tens first, then the ones.', 'Ask {name}: "72 stickers shared by 4 friends. How many each?"'));
lsDraft3('mbig3', ls3BMul('mbig3', 'Big Times 1-Digit', 4, '3d', ['mcarry', 'tens0', 'slip'], 'Multiply every place, then trade from the ones up.', 'Ask {name}: "What is 3 times 214?"'));
lsDraft3('sub8', ls3Big('sub8', 'Take Away Big Numbers', 4, '−', 4, 'Line up the places; trade when a place is too small.', 'Ask {name}: "What is 5,203 take away 1,875?"'));
lsDraft3('dbig2', ls3DivB('dbig2', 'Divide with Leftovers', 4, 'rem', ['remBig', 'drop'], 'The leftover is always smaller than the divisor.', 'Ask {name}: "25 cookies, 4 per bag. How many bags, how many left?"'));
lsDraft3('fact1', ls3Div('fact1', 'Factors & Multiples', 4, r => [lsRi(r, 2, 9), lsRi(r, 2, 9)], 'Factors are the rows and row lengths of an array.', 'Ask {name}: "Name two numbers that multiply to make 24."', true));
lsDraft3('mbig4', ls3Area('mbig4', '2-Digit Times 2-Digit', 4, false, 'Cut both numbers into tens and ones, then add the parts.', 'Ask {name}: "What is 23 times 14?"'));
lsDraft3('big7', ls3Big('big7', 'Add Big Numbers', 4, '+', 5, 'Big numbers add the same way: place by place.', 'Ask {name}: "What is 34,507 plus 21,846?"'));
lsDraft3('dbig3', ls3DivB('dbig3', 'Divide Big Numbers', 4, 'big', ['drop', 'zero0', 'remBig', 'slip'], 'Divide place by place, from the biggest.', 'Ask {name}: "What is 624 divided by 3?"'));
lsDraft3('fact2', ls3Prime('fact2', 'Prime or Composite', 4, 'A prime number has only two factors: 1 and itself.', 'Ask {name}: "Is 21 prime? Can you make it in rows?"'));
lsDraft3('round3', ls3Round('round3', 'Round Big Numbers', 4, 'big', 'Find the two round numbers, then the nearer one.', 'Ask {name}: "Round 4,682 to the nearest thousand."'));
lsDraft3('frac6', ls3FCmp('frac6', 'Unlike Fractions', 4, true, 'Compare fractions by how much of the same whole they cover.', 'Ask {name}: "Which is bigger, 2 thirds or 3 fifths?"'));
lsDraft3('frac7', ls3FEq('frac7', 'Simplest Form', 4, true, 'Simplest form uses the fewest, biggest parts.', 'Ask {name}: "What is 6 eighths in simplest form?"'));
lsDraft3('fop1', ls3Fop('fop1', 'Add & Subtract Parts', 4, 'like', ['addBot', 'slip'], 'Same-size parts: add the tops, the bottom stays.', 'Ask {name}: "What is 2 fifths plus 1 fifth?"'));
lsDraft3('fop2', ls3Fop('fop2', 'Whole × Fraction', 4, 'whole', ['mulBot', 'slip'], 'A whole number times a fraction is copies of it.', 'Ask {name}: "What is 3 times 2 fifths?"'));
lsDraft3('frac8', ls3Mix('frac8', 'Mixed Numbers', 4, 'Every full bar is one whole; the parts left make the fraction.', 'Ask {name}: "How many wholes in 7 fourths?"'));
lsDraft3('dec1', ls3DTen('dec1', 'Tenths & Hundredths', 4, 'Tenths come first after the point, then hundredths.', 'Ask {name}: "How do you write 7 tenths as a decimal?"'));
lsDraft3('dec2', ls3DCmp('dec2', 'Compare Decimals', 4, 'Compare tenths first: more digits is not always more.', 'Ask {name}: "Which is bigger, 0.5 or 0.45?"'));
lsDraft3('geo3', ls3Side('geo3', 'Find the Missing Side', 4, 'Half the perimeter is one long side and one short side.', 'Ask {name}: "A pen has a perimeter of 20. One side is 6. The other?"'));
lsDraft3('meas5', ls3Conv('meas5', 'Convert Units', 4, 'A smaller unit needs more of it, so multiply.', 'Ask {name}: "How many inches are in 3 feet?"'));
lsDraft3('pv5', ls3Pv('pv5', 'Decimal Place Value', 5, 'dec', 'Each place after the point is a tenth of the one before.', 'Ask {name}: "In 3.47, what is the 4 worth?"'));
lsDraft3('mbig5', ls3Area('mbig5', '3-Digit Times 2-Digit', 5, true, 'Multiply by the tens and by the ones, then add.', 'Ask {name}: "What is 213 times 12?"'));
lsDraft3('dec3', ls3DOp('dec3', 'Add/Subtract Decimals', 5, false, 'Line up the points before adding or taking away.', 'Ask {name}: "What is 4 plus 2.35?"'));
lsDraft3('pv6', ls3Pv('pv6', 'Powers of Ten', 5, 'p10', 'Times ten moves every digit one place left.', 'Ask {name}: "What is 3.6 times 100?"'));
lsDraft3('dec4', ls3DOp('dec4', 'Multiply Decimals', 5, true, 'Multiply as whole numbers, then count the digits after the points.', 'Ask {name}: "What is 0.4 times 3?"'));
lsDraft3('round4', ls3Round('round4', 'Round Decimals', 5, 'dec', 'Round a decimal by the digit to the right of the place.', 'Ask {name}: "Round 3.47 to the nearest tenth."'));
lsDraft3('ooo1', ls3Ooo('ooo1', 'Order of Operations', 5, 'Times and divide come before plus and minus.', 'Ask {name}: "What is 2 plus 3 times 4?"'));
lsDraft3('dec5', ls3DOp('dec5', 'Divide Decimals', 5, 'div', 'Divide as if there were no point, then put it back.', 'Ask {name}: "What is 8.4 divided by 4?"'));
lsDraft3('fop3', ls3Fop('fop3', 'Unlike Denominators', 5, 'unlike', ['addBot', 'renameTop', 'slip'], 'Make the bottoms the same, then add the tops.', 'Ask {name}: "What is 1 half plus 1 fourth?"'));
lsDraft3('geo4', ls3Geo('geo4', 'Volume of a Box', 5, 'vol', ['layer', 'mulAdd'], 'Volume is one layer of cubes times the layers.', 'Ask {name} how many cubes fill a box 3 by 2 by 2.'));
lsDraft3('fop5', ls3Fop('fop5', 'Multiply Fractions', 5, 'mul', ['mixAdd', 'topOnly'], 'Part of a part: multiply the tops and the bottoms.', 'Ask {name}: "What is half of a half?"'));

var TEACH35_VER='v179'; // last line: the whole file ran (checked by dataReady() before the app starts)
