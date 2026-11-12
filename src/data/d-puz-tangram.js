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
   every corner of a failing entry), and look at it with `node tools/shots.js bt-tg-sheet` (every silhouette and its solution).
   ORDER (P3-12): 32 puzzles, the 8 of P3-11 and 24 more, sorted by a difficulty score (written after each entry's say):
     score = the outline's length in units + half the number of its corners + the number of pieces turned 45 degrees against the
             rest + half the number of piece pairs that meet only at a corner
   A spread-out silhouette with many corners, thin parts and mixed turns is harder to read than a compact one; ties keep the older
   entry first. tools/test.js recomputes the score and checks the order. With 32 entries each level gets its own slice of 2 or 3
   puzzles (TG.pickIndex). Most of the new entries stand the square upright (odd turns); only the picture counts, not the turns. */
var PUZ = PUZ || {};
PUZ.tangram = [
  { id: 'boat', name: 'Sailboat', say: 'Make a sailboat with two sails.', // 25.16
    pcs: [[4, 0, 6, 0], [6, 0, 2, 0], [4, 0, 2, 0], [5, 0, [0, 2], [0, 2]],
      [3, 0, [0, 6], 0], [1, 0, [0, 3], [0, -1]], [3, 0, [0, 8], 0]] },
  { id: 'house', name: 'House', say: 'Make a house with a big roof.', // 25.81
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -4]], [7, 0, [0, -2], 0],
      [1, 0, [0, 2], [0, -2]], [5, 0, [0, 1], [0, 1]], [5, 1, [0, 2], [0, -2]]] },
  { id: 'snail', name: 'Snail', say: 'Make a snail with a shell on its back.', // 25.99
    pcs: [[7, 0, [0, -2], [0, 4]], [1, 0, [0, 2], 0], [5, 0, [0, 2], [0, 6]], [1, 0, 0, [0, 4]],
      [7, 0, [0, 2], [0, 6]], [1, 0, [0, 5], [0, 3]], [3, 1, [0, 6], [0, 6]]] },
  { id: 'key', name: 'Key', say: 'Make a key for a door.', // 26.97
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [5, 0, [0, 8], [0, 5]], [1, 0, [0, 4], [0, 1]],
      [5, 0, [0, 8], [0, 3]], [1, 0, [0, 9], 0], [1, 1, [0, 8], [0, 3]]] },
  { id: 'kangaroo', name: 'Kangaroo', say: 'Make a kangaroo with a long tail.', // 28.14
    pcs: [[7, 0, [0, 2], [0, 4]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 4]], [1, 0, [0, 6], [0, -2]],
      [3, 0, [0, 8], [0, 2]], [1, 0, [0, 7], [0, -1]], [1, 1, [0, 6], [0, 6]]] },
  { id: 'fish', name: 'Fish', say: 'Make a fish with a big tail.', // 28.31
    pcs: [[4, 0, 4, 0], [0, 0, 0, 0], [7, 0, 4, 0], [0, 0, 3, -1],
      [4, 0, 5, 1], [0, 0, 2, 1], [0, 0, 2, -2]] },
  { id: 'teapot', name: 'Teapot', say: 'Make a teapot with a spout and a lid.', // 28.49
    pcs: [[5, 0, [0, 6], [0, 6]], [1, 0, [0, 2], [0, 2]], [1, 0, [0, 4], 0], [7, 0, 0, [0, 4]],
      [5, 0, [0, 2], [0, 6]], [1, 0, [0, 4], [0, 5]], [3, 1, [0, 6], [0, 6]]] },
  { id: 'candle', name: 'Candle', say: 'Make a candle with a little flame.', // 29.47
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 8]], [1, 0, 0, [0, 6]],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 2], [0, 7]], [1, 1, [0, 3], [0, 2]]] },
  { id: 'butterfly', name: 'Butterfly', say: 'Make a butterfly with big wings.', // 29.66
    pcs: [[7, 0, [0, -4], [0, 4]], [1, 0, [0, 2], 0], [5, 0, [0, -2], [0, 6]], [5, 0, [0, 4], [0, 6]],
      [3, 0, [0, 6], [0, 4]], [1, 0, [0, 1], [0, 1]], [1, 1, [0, 4], [0, 6]]] },
  { id: 'boot', name: 'Boot', say: 'Make a boot for rainy days.', // 29.97
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 8]], [1, 0, 0, [0, 6]],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 5], [0, 5]], [1, 1, [0, 3], [0, 2]]] },
  { id: 'bird', name: 'Bird', say: 'Make a bird flying.', // 29.99
    pcs: [[7, 0, 0, [0, 4]], [3, 0, [0, 8], [0, 2]], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 8], 0],
      [5, 0, [0, 4], [0, 6]], [1, 0, [0, 5], [0, -1]], [3, 0, [0, 2], [0, 4]]] },
  { id: 'fox', name: 'Fox', say: 'Make a fox face with big pointy ears.', // 30.14
    pcs: [[7, 0, [0, 2], [0, 4]], [3, 0, [0, 6], [0, 4]], [5, 0, [0, 2], [0, 4]], [1, 0, 0, 0],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 1], [0, 5]], [1, 0, 0, [0, 2]]] },
  { id: 'umbrella', name: 'Umbrella', say: 'Make an umbrella for the rain.', // 30.31
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 6], [0, 8]], [1, 0, [0, 8], [0, 2]],
      [5, 0, [0, 8], [0, 4]], [1, 0, [0, 5], [0, 3]], [1, 1, [0, 8], [0, 2]]] },
  { id: 'seal', name: 'Seal', say: 'Make a seal with a ball on its nose.', // 30.31
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [7, 0, [0, -2], [0, 4]], [3, 0, [0, 8], 0],
      [1, 0, [0, 4], [0, 4]], [1, 0, [0, 7], [0, -3]], [3, 1, [0, 4], [0, 4]]] },
  { id: 'plane', name: 'Plane', say: 'Make a plane flying in the sky.', // 30.31
    pcs: [[1, 0, 0, [0, -2]], [3, 0, [0, 6], [0, 4]], [3, 0, [0, 8], [0, 3]], [1, 0, 0, [0, 2]],
      [5, 0, [0, 4], [0, 4]], [1, 0, [0, 5], [0, 1]], [1, 1, [0, 4], [0, 4]]] },
  { id: 'rocket', name: 'Rocket', say: 'Make a rocket flying up to the stars.', // 30.81
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -2]], [7, 0, [0, -2], [0, 4]],
      [1, 0, [0, 4], [0, 2]], [1, 0, [0, 2], [0, 3]], [3, 0, [0, 3], [0, 6]]] },
  { id: 'flag', name: 'Flag', say: 'Make a flag on a pole.', // 30.88
    pcs: [[5, 0, [0, 6], [0, 4]], [1, 0, [0, 2], 0], [7, 0, 0, [0, 2]], [3, 0, [0, 2], 0],
      [1, 0, 0, [0, 2]], [1, 0, [0, 1], [0, 3]], [1, 1, [0, 3], [0, 8]]] },
  { id: 'lightning', name: 'Lightning', say: 'Make a lightning bolt.', // 30.99
    pcs: [[3, 0, [0, 6], 0], [7, 0, 0, [0, 6]], [5, 0, [0, 2], [0, 8]], [1, 0, [0, 4], [0, -4]],
      [3, 0, [0, 6], [0, 4]], [1, 0, [0, 5], [0, 1]], [3, 0, [0, 6], [0, -2]]] },
  { id: 'pine', name: 'Pine tree', say: 'Make a pine tree.', // 31.31
    pcs: [[7, 0, [0, -2], [0, 4]], [1, 0, [0, 4], 0], [1, 0, [0, 3], [0, -2]], [5, 0, [0, 4], [0, 2]],
      [1, 0, [0, 2], [0, 2]], [1, 0, [0, 3], [0, 3]], [1, 0, [0, 2], 0]] },
  { id: 'seahorse', name: 'Seahorse', say: 'Make a seahorse.', // 31.31
    pcs: [[1, 0, 0, [0, -4]], [3, 0, [0, 4], 0], [5, 0, [0, 2], [0, -2]], [7, 0, 0, [0, 4]],
      [7, 0, [0, -2], [0, 2]], [1, 0, [0, -1], [0, 1]], [1, 1, [0, 4], [0, 6]]] },
  { id: 'camel', name: 'Camel', say: 'Make a camel with a hump.', // 31.49
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 6], [0, 6]], [5, 0, [0, 8], [0, 4]],
      [3, 0, [0, 2], [0, 4]], [1, 0, [0, 7], [0, -1]], [3, 0, [0, 10], [0, -2]]] },
  { id: 'arrow', name: 'Arrow', say: 'Make an arrow pointing the way.', // 31.64
    pcs: [[3, 0, [0, 10], [0, 2]], [1, 0, [0, 6], [0, -2]], [7, 0, [0, -2], [0, 2]], [1, 0, 0, [0, 1]],
      [5, 0, [0, 4], [0, 3]], [1, 0, [0, 5], 0], [1, 1, [0, 4], [0, 3]]] },
  { id: 'train', name: 'Train', say: 'Make a train engine with a chimney.', // 31.8
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [5, 0, [0, 6], [0, 4]], [1, 0, [0, 4], [0, 2]],
      [7, 0, [0, 6], [0, 4]], [1, 0, [0, 7], [0, -1]], [1, 0, [0, 8], [0, 2]]] },
  { id: 'robot', name: 'Robot', say: 'Make a robot waving its arm.', // 32.31
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [7, 0, [0, -2], [0, 4]], [3, 0, [0, 2], [0, 6]],
      [5, 0, [0, 4], [0, 8]], [1, 0, [0, 2], [0, -1]], [1, 0, [0, 4], [0, 2]]] },
  { id: 'cat', name: 'Cat', say: 'Make a cat sitting up, with pointy ears and a tail.', // 32.49
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [6, 0, 2, 0],
      [2, 0, 4, -2], [0, 0, 2, -1], [6, 0, 4, 4]] },
  { id: 'rabbit', name: 'Rabbit', say: 'Make a rabbit with a long ear and a fluffy tail.', // 32.49
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [2, 0, 4, -2],
      [6, 0, 4, 4], [0, 0, 2, -1], [6, 0, 2, 0]] },
  { id: 'swan', name: 'Swan', say: 'Make a swan with a long neck.', // 32.66
    pcs: [[5, 0, [0, 4], [0, 4]], [3, 0, [0, 8], 0], [1, 0, [0, 4], [0, -2]], [7, 0, [0, 6], 0],
      [7, 0, [0, -4], [0, -2]], [1, 0, [0, -1], [0, -5]], [5, 1, [0, -2], [0, -2]]] },
  { id: 'duck', name: 'Duck', say: 'Make a duck swimming on a pond.', // 32.97
    pcs: [[3, 0, [0, 10], 0], [7, 0, [0, 4], [0, 6]], [5, 0, [0, 4], [0, 8]], [1, 0, 0, [0, 2]],
      [3, 0, [0, 4], [0, 4]], [1, 0, [0, 1], [0, 3]], [3, 0, [0, 6], [0, 4]]] },
  { id: 'whale', name: 'Whale', say: 'Make a whale with a big tail.', // 33.23
    pcs: [[3, 0, [0, 4], 0], [7, 0, 0, [0, 4]], [3, 0, [0, 8], [0, 3]], [1, 0, [0, 4], 0],
      [3, 0, [0, 4], [0, 4]], [1, 0, [0, 5], [0, 1]], [1, 1, [0, 5], 0]] },
  { id: 'pig', name: 'Pig', say: 'Make a pig with a curly tail.', // 33.73
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [1, 0, [0, 3], [0, -2]], [3, 0, [0, 2], [0, 4]],
      [5, 0, [0, 4], [0, 6]], [1, 0, [0, 5], 0], [1, 0, [0, -2], [0, -2]]] },
  { id: 'dinosaur', name: 'Dinosaur', say: 'Make a dinosaur with plates on its back.', // 33.97
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 2], [0, 2]],
      [5, 0, [0, 8], [0, 6]], [1, 0, [0, 2], [0, 3]], [1, 1, [0, 10], [0, 4]]] },
  { id: 'turtle', name: 'Turtle', say: 'Make a turtle out for a walk.', // 36.47
    pcs: [[7, 0, 0, 0], [1, 0, [0, 4], [0, -4]], [5, 0, 0, 0], [0, 0, [0, 1], 0],
      [0, 0, [-1, 8], -1], [0, 0, [-1, -2], [0, -2]], [0, 0, 3, 0]] },
];
