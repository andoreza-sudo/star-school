/* ---------- tracing glyphs (P2-16 digits; P2-17 adds A-Z and a-z in the same format) ----------
   Read by the tracing engine (src/js/47-trace.js, kind 'trace') only inside functions: this file loads after all code (A11).

   FORMAT
   TRACE.sets[setId] = {
     n:      what one glyph is called when spoken ('number', 'letter')
     lines:  {top, mid, base[, desc]}  y of the handwriting lines drawn on the board (top line, dashed middle line, base line,
             optional descender line). Digits and capitals sit from top to base; P2-17 lowercase uses mid as the x-height and
             desc for the tails of g j p q y.
     order:  the glyph keys in teaching order (digits '0'..'9'; P2-17 letters in the same order as abc 1)
     glyphs: {key: {say, s}}
       say   the spoken name ('three')
       s     the strokes, in handwriting order (1 to 4 per glyph). A stroke is a list of points [x, y] on the centre line of the
             pen, in a fixed 100 x 100 box (x right, y down; whole numbers or one decimal), in the direction the pen moves.
             The pen goes smoothly through the points (a Catmull-Rom curve, drawn and checked as the same curve), so:
               - two points make a straight line;
               - a third value 1 ([x, y, 1]) makes that point a sharp corner (the pen stops and turns: the 7, the foot of the 2,
                 the 4's L, the top of the 9's stem);
               - a stroke whose last point equals its first is a closed loop (0, 8): the curve runs smoothly through the join;
               - a stroke of one point is a dot (the dot of i and j in P2-17): a tap on it.
             Put points about 8 to 14 units apart along curves (ovals: 10 to 12 points), never two equal points in a row.
   Stroke order and direction follow the school manuscript model (top to bottom, left to right, CURRICULUM E-trace):
     0  one stroke: start at the top, curve left (down the left side), around and back up to the start
     1  one stroke: straight down
     2  one stroke: start below the top line on the left, curve up and around to the right, slant down to the bottom left,
        slide right along the base line
     3  one stroke: start top left, curve around to the middle, then around again to the bottom left
     4  two strokes: (1) down from the top, then slide right; (2) the long line down from the top, crossing the slide
     5  two strokes: (1) down from the top to the middle, then around the belly; (2) the top flag, sliding right
     6  one stroke: start top right, curve down and left to the bottom, around and up to close the loop
     7  one stroke: slide right along the top line, then slant down to the base line
     8  one stroke: start at the top, curve left and make an S down to the bottom, then go back up the other way to the start
     9  one stroke: start on the right of the ball, circle up and left all the way around, then straight down
   The tests (tools/test.js "tracing P2-16") check every stroke: inside the box and between the lines, long enough, points apart,
   the stroke count and start direction above, and that ideal and noisy traces along it pass while wrong ones fail. */
const TRACE = {
  sets: {
    digit: {
      n: 'number',
      lines: { top: 10, mid: 50, base: 90 },
      order: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      glyphs: {
        '0': { say: 'zero', s: [
          [[50, 10], [38.5, 15.4], [30.1, 30], [27, 50], [30.1, 70], [38.5, 84.6], [50, 90], [61.5, 84.6], [69.9, 70], [73, 50],
            [69.9, 30], [61.5, 15.4], [50, 10]],
        ] },
        '1': { say: 'one', s: [
          [[50, 10], [50, 90]],
        ] },
        '2': { say: 'two', s: [
          [[29, 25], [35, 15], [46, 10], [58, 10.5], [68, 16], [71, 27], [68, 39], [59, 51], [46, 65], [28, 90, 1], [74, 90]],
        ] },
        '3': { say: 'three', s: [
          [[30, 19], [39, 12], [51, 10], [63, 13], [69, 22], [67, 33], [58, 42], [46, 47, 1], [60, 51], [70, 59], [73, 71],
            [69, 83], [58, 90], [44, 90], [31, 84]],
        ] },
        '4': { say: 'four', s: [
          [[33, 10], [29, 60, 1], [76, 60]],
          [[62, 10], [62, 90]],
        ] },
        '5': { say: 'five', s: [
          [[34, 10], [32, 47, 1], [43, 41], [56, 41], [67, 47], [72, 58], [72, 71], [66, 83], [55, 90], [42, 90], [31, 85]],
          [[34, 10], [70, 10]],
        ] },
        '6': { say: 'six', s: [
          [[66, 14], [56, 10], [45, 12], [36, 21], [30, 34], [28, 50], [29, 66], [35, 80], [46, 89], [58, 89], [68, 81],
            [72, 69], [68, 57], [58, 50], [46, 50], [36, 55], [29, 63]],
        ] },
        '7': { say: 'seven', s: [
          [[27, 10], [73, 10, 1], [44, 90]],
        ] },
        '8': { say: 'eight', s: [
          [[50, 10], [40, 13], [35, 22], [38, 33], [50, 46], [63, 56], [70, 67], [68, 80], [58, 89], [44, 89], [33, 81], [31, 68],
            [37, 57], [50, 46], [61, 35], [65, 23], [60, 13], [50, 10]],
        ] },
        '9': { say: 'nine', s: [
          [[68, 25], [63, 14], [52, 10], [41, 12], [33, 20], [31, 31], [36, 42], [47, 48], [59, 46], [67, 37], [68, 25, 1],
            [68, 90]],
        ] },
      },
    },
  },
};
