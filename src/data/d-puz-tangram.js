/* Tangram puzzles (P3-11, BRAIN_TEASERS 5.7). Written by hand; tools/test.js (check "tangrams P3-11") proves every entry exactly.
   PUZ.tangram = [puzzle, ...] in order of difficulty: level L of every band uses entry L-1 (levels past the end pick one of the
   harder half by the day's seed; with 12 or more entries each level gets its own slice, so P3-12 only has to add entries).
   A puzzle: {id, name, say, pcs}
     id    lowercase letters, unique            name  shown and spoken ("You made the house!")
     say   the spoken prompt, one short sentence for a pre-reader ("Make a house with a big roof.")
     pcs   the SOLUTION, seven placements in the order L L M S S Q P (big, big, middle, small, small triangles, square,
           parallelogram); the silhouette is the union of the placed pieces, so the puzzle is solvable by construction.
   A placement is [k, f, x, y] (TG in src/js/80-bt-tangram.js): the piece in its start position
     L (0,0) (4,0) (2,2)   M (0,0) (2,0) (0,2)   S (0,0) (2,0) (1,1)   Q (1,0) (2,1) (1,2) (0,1)   P (0,0) (2,0) (3,1) (1,1)
   (units: the big square of all seven has side 4; y points down) is flipped if f = 1 (x -> -x; only P may flip, the others
   use f = 0), turned k x 45 degrees clockwise about (0,0) (k = 0..7), then moved by (x, y).
   x and y are exact: a number (whole or half), or a pair [a, b] meaning a + b * sqrt(2)/2. Turning by 45 degrees maps a corner
   (x, y) to (h(x - y), h(x + y)) with h = sqrt(2)/2, so with pairs every corner stays exact: for corner (xa + xb h, ya + yb h)
   the turned corner is ((xb - yb)/2 + (xa - ya) h, (xb + yb)/2 + (xa + ya) h). Pieces must meet along edges (a shared corner
   alone does not join them), must not overlap, and must make one connected shape; the check compares corners exactly.
   How to write a new one: place a piece so that one of its corners lands on a corner of a piece already placed (the test prints
   every corner of a failing entry), and look at it with `node tools/shots.js bt-tg-sheet` (every silhouette and its solution). */
var PUZ = PUZ || {};
PUZ.tangram = [
  { id: 'house', name: 'House', say: 'Make a house with a big roof.',
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -4]], [7, 0, [0, -2], 0], [1, 0, [0, 2], [0, -2]], [5, 0, [0, 1], [0, 1]],
      [5, 1, [0, 2], [0, -2]]] },
  { id: 'rocket', name: 'Rocket', say: 'Make a rocket flying up to the stars.',
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -2]], [7, 0, [0, -2], [0, 4]], [1, 0, [0, 4], [0, 2]], [1, 0, [0, 2], [0, 3]],
      [3, 0, [0, 3], [0, 6]]] },
  { id: 'boat', name: 'Sailboat', say: 'Make a sailboat with two sails.',
    pcs: [[4, 0, 6, 0], [6, 0, 2, 0], [4, 0, 2, 0], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 6], 0], [1, 0, [0, 3], [0, -1]], [3, 0, [0, 8], 0]] },
  { id: 'fish', name: 'Fish', say: 'Make a fish with a big tail.',
    pcs: [[4, 0, 4, 0], [0, 0, 0, 0], [7, 0, 4, 0], [0, 0, 3, -1], [4, 0, 5, 1], [0, 0, 2, 1], [0, 0, 2, -2]] },
  { id: 'cat', name: 'Cat', say: 'Make a cat sitting up, with pointy ears and a tail.',
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [6, 0, 2, 0], [2, 0, 4, -2], [0, 0, 2, -1], [6, 0, 4, 4]] },
  { id: 'rabbit', name: 'Rabbit', say: 'Make a rabbit with a long ear and a fluffy tail.',
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [2, 0, 4, -2], [6, 0, 4, 4], [0, 0, 2, -1], [6, 0, 2, 0]] },
  { id: 'turtle', name: 'Turtle', say: 'Make a turtle out for a walk.',
    pcs: [[7, 0, 0, 0], [1, 0, [0, 4], [0, -4]], [5, 0, 0, 0], [0, 0, [0, 1], 0], [0, 0, [-1, 8], -1], [0, 0, [-1, -2], [0, -2]],
      [0, 0, 3, 0]] },
  { id: 'swan', name: 'Swan', say: 'Make a swan with a long neck.',
    pcs: [[5, 0, [0, 4], [0, 4]], [3, 0, [0, 8], 0], [1, 0, [0, 4], [0, -2]], [7, 0, [0, 6], 0], [7, 0, [0, -4], [0, -2]], [1, 0, [0, -1], [0, -5]],
      [5, 1, [0, -2], [0, -2]]] },
];
