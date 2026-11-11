/* ---------- tracing glyphs (P2-16 digits; P2-17 adds A-Z and a-z in the same format) ----------
   Read by the tracing engine (src/js/47-trace.js, kind 'trace') only inside functions: this file loads after all code (A11).

   FORMAT
   TRACE.sets[setId] = {
     n:      what one glyph is called when spoken ('number', 'big letter', 'little letter')
     lines:  {top, mid, base[, desc]}  y of the handwriting lines drawn on the board (top line, dashed middle line, base line,
             optional descender line). Digits and capitals sit from top to base; lowercase uses mid as the x-height and desc
             for the tails of g j p q y.
     order:  the glyph keys in teaching order (digits '0'..'9'; P2-17 letters in the same order as abc 1)
     glyphs: {key: {say, s}}
       say   the spoken name ('three'; a letter's name is its capital, 'A', as abc 1 says it: "the little letter A")
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
   LETTERS (P2-17): neat school print (manuscript, ball and stick), drawn to sit on Andika bold, the app's font: the sheet
   `node tools/shots.js trace-upper-sheet trace-lower-sheet` shows every stroke over the Andika letter at 30% opacity.
   Like the digits, the pen's centre line runs on the handwriting lines (tops on top or mid, bottoms on base, tails on desc) and
   down the middle of every stem and bowl. Capitals: top 10, middle 50, base 90 (Q's tail dips below the base, as in the font).
   Lowercase: the lines are set to Andika's proportions, ascender 10, x-height (mid) 34, base 75, descender 94; f does not
   descend (Andika's f sits on the base, as in ball-and-stick print). Strokes, in order (lift the pen between strokes):
     A  slant down left from the top; slant down right from the top; slide across
     B  down; from the top: slide right, curve round to the middle; from the middle: curve round to the base
     C  start top right, curve back (left) round to the bottom right                      D  down; from the top round to the base
     E  down; slide right on top; slide right in the middle; slide right on the base       F  down; top slide; middle slide
     G  like C, up the right side to the middle, slide left                               H  down; down; slide across
     I  slide across the top; down the middle; slide across the base                      J  down and curve back left
     K  down; from the top right slant in to the line, then slant out to the base          L  down, slide right
     M  down; from the top: slant down to the middle, slant up, down the right side        N  down; slant down right, push up
     O  start at the top, curve back (left) all the way round                             P  down; from the top round to the middle
     Q  as O; then the tail, slanting right                                               R  as P; then the leg, slanting right
     S  start top right, curve back, then curve forward to the bottom left                 T  slide across the top; down the middle
     U  down, round the bottom, push up                                                   V  slant down right, slant up
     W  slant down, up, down, up                                                          X  slant down right; slant down left
     Y  slant down right to the middle; slant down left to the middle and straight down   Z  slide right, slant down left, slide right
     a  c-curve (start at the right, curve back round and up); then down on the right      b  down; from the line, round the bowl
     c  start at the right, curve back to the bottom right                                d  c-curve; then the tall line down
     e  slide across the middle, then curve back round to the bottom right                f  curve back from the top, down; slide across
     g  c-curve; then down past the base and hook back left                               h  down; from the line, over and down
     i  down; dot                                                                         j  down past the base, hook back left; dot
     k  down; from the middle right slant in to the line, slant out                       l  down
     m  down; over and down; over and down                                                n  down; over and down
     o  start at the top, curve back (left) all the way round                             p  down past the base; from the line, round
     q  c-curve; then down past the base                                                  r  down; from the line, up and over
     s  start top right, curve back, then forward to the bottom left                      t  down and curve right; slide across
     u  down, round the bottom and up; then down on the right                             v  slant down right, slant up
     w  slant down, up, down, up                                                          x  slant down right; slant down left
     y  slant down right to the base; slant down left, down past the base, hook left       z  slide right, slant down left, slide right
   The tests (tools/test.js "tracing P2-16", "tracing letters P2-17") check every stroke: inside the box and between the lines,
   long enough, points apart, the stroke count and start direction above, and that ideal and noisy traces along it pass while
   wrong ones fail. */
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
    upper: {
      n: 'big letter',
      lines: { top: 10, mid: 50, base: 90 },
      order: 'SATPINMDGOCKEURHBFLJVWXYZQ'.split(''),
      glyphs: {
        A: { say: 'A', s: [
          [[49.5, 10], [20.5, 90]],
          [[49.5, 10], [78.5, 90]],
          [[29, 66], [70, 66]],
        ] },
        B: { say: 'B', s: [
          [[29, 10], [29, 90]],
          [[29, 10], [44, 10], [56, 11.5], [64, 16], [68, 24], [68.5, 33], [65, 41], [56, 46.5], [44, 48.5], [29, 48.5]],
          [[29, 48.5], [46, 48.5], [58, 49.5], [67, 54], [72, 61], [72.5, 70], [69, 79], [61, 86.5], [50, 89.5], [40, 90], [29, 90]],
        ] },
        C: { say: 'C', s: [
          [[73, 20], [66, 13], [56, 10], [45, 11], [35, 16], [28, 25], [24.5, 37], [24, 50], [25.5, 62], [30, 73], [38, 82], [49, 89],
            [60, 89.5], [69, 86], [75, 80]],
        ] },
        D: { say: 'D', s: [
          [[26, 10], [26, 90]],
          [[26, 10], [40, 10], [52, 11], [62, 15], [70, 22], [74.5, 32], [76.3, 43], [76.3, 55], [74.5, 66], [70, 76], [62, 84], [52, 89],
            [40, 90], [26, 90]],
        ] },
        E: { say: 'E', s: [
          [[34, 10], [34, 90]],
          [[34, 10], [73, 10]],
          [[34, 49], [68, 49]],
          [[34, 90], [74, 90]],
        ] },
        F: { say: 'F', s: [
          [[34, 10], [34, 90]],
          [[34, 10], [74, 10]],
          [[34, 49], [69, 49]],
        ] },
        G: { say: 'G', s: [
          [[73, 20], [66, 13], [56, 10], [45, 11], [35, 16], [28, 25], [23.5, 37], [22.6, 50], [24, 63], [29, 74], [38, 83], [50, 89.5],
            [62, 89], [71, 85], [75.5, 77], [75.5, 65], [75.5, 53.4, 1], [54, 53.4]],
        ] },
        H: { say: 'H', s: [
          [[25.5, 10], [25.5, 90]],
          [[73, 10], [73, 90]],
          [[25.5, 49.4], [73, 49.4]],
        ] },
        I: { say: 'I', s: [
          [[31, 10], [68, 10]],
          [[49.5, 10], [49.5, 90]],
          [[31, 90], [68, 90]],
        ] },
        J: { say: 'J', s: [
          [[60.5, 10], [60.5, 52], [60, 64], [57, 75], [50, 84], [41, 89.5], [32, 87.5], [26, 82]],
        ] },
        K: { say: 'K', s: [
          [[28, 10], [28, 90]],
          [[72, 10], [38, 51, 1], [75, 90]],
        ] },
        L: { say: 'L', s: [
          [[36, 10], [36, 90, 1], [75, 90]],
        ] },
        M: { say: 'M', s: [
          [[17.5, 10], [15.5, 90]],
          [[20, 10], [49.5, 89, 1], [78, 10, 1], [83, 90]],
        ] },
        N: { say: 'N', s: [
          [[24, 10], [24, 90]],
          [[24, 10], [74.5, 90, 1], [74.5, 10]],
        ] },
        O: { say: 'O', s: [
          [[49.4, 10], [40, 12.4], [31.8, 19.4], [25.7, 30], [22.4, 43.1], [22.4, 56.9], [25.7, 70], [31.8, 80.6], [40, 87.6], [49.4, 90],
            [58.8, 87.6], [67, 80.6], [73.1, 70], [76.4, 56.9], [76.4, 43.1], [73.1, 30], [67, 19.4], [58.8, 12.4], [49.4, 10]],
        ] },
        P: { say: 'P', s: [
          [[32, 10], [32, 90]],
          [[32, 10], [46, 10], [58, 11.5], [67, 16.5], [72, 25], [73, 35], [70.5, 45], [63, 52.5], [52, 56], [40, 56.5], [32, 56.5]],
        ] },
        Q: { say: 'Q', s: [
          [[48.2, 10], [38.8, 12.4], [30.6, 19.4], [24.5, 30], [21.2, 43.1], [21.2, 56.9], [24.5, 70], [30.6, 80.6], [38.8, 87.6],
            [48.2, 90], [57.6, 87.6], [65.8, 80.6], [71.9, 70], [75.2, 56.9], [75.2, 43.1], [71.9, 30], [65.8, 19.4], [57.6, 12.4],
            [48.2, 10]],
          [[57, 83], [66, 89], [76, 93], [87, 95]],
        ] },
        R: { say: 'R', s: [
          [[29, 10], [29, 90]],
          [[29, 10], [44, 10], [56, 11.5], [64, 16], [68, 24], [68.5, 33], [65.5, 42], [58, 49], [47, 52.4], [29, 52.4]],
          [[49, 52.4], [75, 90]],
        ] },
        S: { say: 'S', s: [
          [[71, 20], [63, 13], [53, 10], [43, 11], [35, 16], [31.5, 25], [32, 34], [37, 41], [46, 46], [55, 51], [64, 56.5], [69.5, 63],
            [70.5, 71], [67, 80], [59, 87], [48, 90], [37, 89], [29.5, 85], [25.5, 79]],
        ] },
        T: { say: 'T', s: [
          [[20, 10], [79, 10]],
          [[49.3, 10], [49.3, 90]],
        ] },
        U: { say: 'U', s: [
          [[26.2, 10], [26.2, 55], [27.2, 66], [31, 76], [38.5, 84.5], [49.3, 90], [60, 84.5], [67.5, 76], [71.3, 66], [72.3, 55],
            [72.3, 10]],
        ] },
        V: { say: 'V', s: [
          [[21, 10], [49.4, 89, 1], [78, 10]],
        ] },
        W: { say: 'W', s: [
          [[5, 10], [24.5, 89, 1], [49, 10, 1], [74, 89, 1], [93.5, 10]],
        ] },
        X: { say: 'X', s: [
          [[27, 10], [73.5, 90]],
          [[72, 10], [24.5, 90]],
        ] },
        Y: { say: 'Y', s: [
          [[23, 10], [49.4, 52]],
          [[76, 10], [49.4, 52, 1], [49.4, 90]],
        ] },
        Z: { say: 'Z', s: [
          [[25, 10], [76.5, 10, 1], [22, 90, 1], [77, 90]],
        ] },
      },
    },
    lower: {
      n: 'little letter',
      lines: { top: 10, mid: 34, base: 75, desc: 94 },
      order: 'satpinmdgockeurhbfljvwxyzq'.split(''),
      glyphs: {
        a: { say: 'A', s: [
          [[61, 40], [55, 35], [46, 34.5], [39, 39], [35, 47], [34.3, 56], [36, 66], [41.5, 74], [49, 71], [54, 64], [59, 57.5]],
          [[63.5, 34], [65.5, 75]],
        ] },
        b: { say: 'B', s: [
          [[36.5, 10], [36.5, 75]],
          [[37, 46], [42, 38.5], [50, 34.6], [58.5, 36], [63.5, 43], [65.3, 52], [65, 61], [61, 69], [53.5, 74], [45, 74.5], [37.5, 71]],
        ] },
        c: { say: 'C', s: [
          [[62.5, 40.5], [56, 35], [48, 35], [41.5, 40], [38.5, 48], [38.5, 57], [41, 65], [47, 71.5], [55, 74.5], [63, 70]],
        ] },
        d: { say: 'D', s: [
          [[61, 40], [55, 35], [46, 34.5], [38.5, 39], [35, 47], [34.2, 56], [35.5, 65], [41, 72], [49, 74.5], [56.5, 72], [62, 66]],
          [[63.7, 10], [64.8, 75]],
        ] },
        e: { say: 'E', s: [
          [[37.5, 53], [62.5, 53, 1], [61.5, 44.5], [57, 38], [50.5, 34.5], [43.5, 36], [38.5, 42], [36.8, 50.5], [37.3, 59.5], [40.5, 67],
            [47, 72.5], [55.5, 74.5], [63.5, 70]],
        ] },
        f: { say: 'F', s: [
          [[65, 18.5], [58.5, 11.5], [50.5, 12], [48.7, 22], [48.7, 75]],
          [[37, 35.5], [62.5, 35.5]],
        ] },
        g: { say: 'G', s: [
          [[61, 40], [55, 35], [46, 34.5], [39.5, 39], [36.3, 47], [35.8, 56], [37.5, 65], [43, 72], [50.5, 74.5], [57, 71.5], [62, 66]],
          [[63.1, 34], [63.1, 74], [62, 83], [57, 90], [49, 93.5], [41.5, 92], [36, 86.5]],
        ] },
        h: { say: 'H', s: [
          [[36.2, 10], [36.2, 75]],
          [[37, 47], [42, 39], [49.5, 34.8], [57.5, 35.5], [62.5, 41.5], [64.1, 50], [64.1, 75]],
        ] },
        i: { say: 'I', s: [
          [[50, 34], [50.2, 75]],
          [[50, 19.5]],
        ] },
        j: { say: 'J', s: [
          [[50.9, 34], [50.9, 77], [48.5, 86], [42, 92.5], [33.5, 86.5]],
          [[51, 19.5]],
        ] },
        k: { say: 'K', s: [
          [[38.1, 10], [38.1, 75]],
          [[63.5, 34], [44.5, 52.5, 1], [65.5, 75]],
        ] },
        l: { say: 'L', s: [
          [[49.8, 10], [50.2, 75]],
        ] },
        m: { say: 'M', s: [
          [[26, 34], [26.8, 75]],
          [[27.5, 46], [32.5, 38], [40.5, 34.5], [47.5, 37], [50.3, 46], [50.3, 75]],
          [[51, 46], [56, 38], [64, 34.5], [71, 37], [73.8, 46], [73.8, 75]],
        ] },
        n: { say: 'N', s: [
          [[35.5, 34], [36.4, 75]],
          [[37, 46], [42, 38.5], [50, 34.6], [57.5, 35.5], [62.5, 41], [64.3, 50], [64.3, 75]],
        ] },
        o: { say: 'O', s: [
          [[49.9, 34], [42.3, 37.3], [37.2, 46], [36, 57.4], [39.3, 67.9], [46, 74.2], [53.8, 74.2], [60.5, 67.9], [63.8, 57.4], [62.6, 46],
            [57.5, 37.3], [49.9, 34]],
        ] },
        p: { say: 'P', s: [
          [[35.5, 34], [36.8, 94]],
          [[37, 46], [42, 38.5], [50, 34.6], [58.5, 36], [63.5, 43], [65.4, 52], [65, 61], [61, 69], [53.5, 74], [45, 74.5], [37.5, 71]],
        ] },
        q: { say: 'Q', s: [
          [[61, 40], [55, 35], [46, 34.5], [39, 39], [35.8, 47], [35.3, 56], [37, 65], [42.5, 72], [50, 74.5], [57, 71.5], [61.5, 66]],
          [[62.9, 34], [63.3, 94]],
        ] },
        r: { say: 'R', s: [
          [[39.8, 34], [41.4, 75]],
          [[41.4, 58], [41.5, 47], [45, 39], [52, 34.7], [59.5, 36], [64.5, 44]],
        ] },
        s: { say: 'S', s: [
          [[61.5, 40.5], [56, 35.5], [48, 34.5], [41.5, 38], [39.3, 45], [44, 51.5], [52.5, 55.5], [60, 59.5], [62.6, 67.5], [57.5, 73.5],
            [49, 75], [41, 73], [36.5, 67.5]],
        ] },
        t: { say: 'T', s: [
          [[46.6, 21], [46.6, 58], [48.5, 67.5], [55, 74], [63, 70.5]],
          [[35, 35.5], [61, 35.5]],
        ] },
        u: { say: 'U', s: [
          [[36.2, 34], [36.4, 56], [37.5, 65], [42, 72.5], [49, 74], [55.5, 70], [60.5, 63.5], [63.2, 55], [63.3, 34]],
          [[63.3, 34], [65.5, 75]],
        ] },
        v: { say: 'V', s: [
          [[34.5, 34], [50, 74.5, 1], [65.5, 34]],
        ] },
        w: { say: 'W', s: [
          [[25.5, 34], [37.3, 74.5, 1], [49.9, 34, 1], [62.6, 74.5, 1], [74.5, 34]],
        ] },
        x: { say: 'X', s: [
          [[35, 34], [65, 75]],
          [[64.8, 34], [34.5, 75]],
        ] },
        y: { say: 'Y', s: [
          [[35, 34], [50.5, 68]],
          [[65.3, 34], [51, 67, 1], [50.7, 77], [47.5, 86.5], [40.5, 93], [32.5, 87.5]],
        ] },
        z: { say: 'Z', s: [
          [[35.5, 34], [65, 34, 1], [34.5, 75, 1], [65, 75]],
        ] },
      },
    },
  },
};
