/* Map scenes (P4-09, DESIGN_SYSTEM 7): the props, themes and the world -> theme table that SCN (src/js/43-scenes.js) draws from.
   Data only, read inside functions (A11).

   SCN_P: a prop is "hw hh|shape;shape;..." on its own grid: the ground point is 0,0, the drawing stands up into negative y,
   hw = half its width and hh = its height (for placement). A shape is "tone [opacity] kind numbers... [@deg]":
     tone   one letter + optional digit for an --ill-* token (DESIGN_SYSTEM 6.5 hues: r o y g c b v p n t s m e w k;
            1 highlight, none base, 2 shade, 3 deep), or a word for an --sc-* scene token (sand, green-2 ...)
     kind   c cx cy r | e cx cy rx ry | r x y w h rx | p d... (fill) | l w d... (round stroke; "w/a,b" adds a dash)
            | o w cx cy rx ry (ellipse outline; "w/a,b" adds a dash); @deg rotates an e or o about its centre
   Light from the top left: shade shape first, the base moved up-left over it, then a highlight. Ground shadows are ink at .1.
   SCN_V: variants that swap one hue for another (tree in autumn orange, a blue-roof house ...).
   SCN_T: a theme: sky [top, horizon] and ground [base, ledge] scene tokens, sun 'sun' | 'moon', cl clouds, st stars,
     hz horizon ridges back to front [kind q|l|b|a, unit width, heights, tone, hang from the top, move up], lm landmarks, pr props
     (cycled down the sides), sm small companions set in front of some props, tx ground texture [[kind tuft|dot|spark|bub|dash, tone]], pp a papel picado garland (tones),
     rays light shafts from the top (under water).
   SCN_W: every world id -> theme, or [theme, overrides]. */
var SCN_P = {
  tree: '18 56|k .1 e 1 0 16 3.5;n2 r -3.5 -22 7 22 2;n r -3.5 -22 4.5 22 2;g2 c 1 -33 17;g c -1.5 -35.5 14;g1 .7 c -7 -41 4.5',
  pine: '16 60|k .1 e 0 0 13 3;n2 r -2.5 -11 5 11 1.5;g2 p M0 -58L11 -36H6L16 -11H-16L-6 -36H-11Z;g p M0 -58L-11 -36H-6L-16 -11H2Z' +
    ';g1 .6 l 2 M-2 -51L-7 -40M-6 -30L-12 -17',
  bush: '20 24|k .1 e 0 0 19 3.5;g2 p M-18 0C-21 -10 -12 -17 -6 -14C-3 -22 9 -22 11 -13C18 -14 21 -5 18 0Z' +
    ';g p M-17 -2C-19 -10 -12 -16 -7 -13C-4 -20 7 -20 9 -12C13 -13 16 -7 13 -2Z;g1 .7 e -8 -12 4 2.5 @-20',
  flowers: '10 20|g2 l 1.6 M-6 0V-9M0 0V-13M6 0V-8;p c -6 -11 3.6;y c 0 -15 3.9;v1 c 6 -10 3.3;w .85 c -6 -11 1.3;o c 0 -15 1.5;w .85 c 6 -10 1.2',
  tulip: '9 30|g2 l 2 M0 0V-18;g p M0 -3Q-10 -8 -9 -18Q-2 -13 0 -3Z;r2 p M-7 -29L-3.5 -25L0 -29L3.5 -25L7 -29Q8 -16 0 -16Q-8 -16 -7 -29Z' +
    ';r p M-7 -29L-3.5 -25L0 -29L1.5 -26Q2 -18 -0.5 -17Q-7.5 -17 -7 -29Z;r1 .7 l 1.6 M-4.5 -24Q-5 -20 -3 -18.5',
  sunflower: '18 72|k .1 e 0 0 12 3;g2 r -1.6 -50 3.2 50 1.6;g p M0 -18Q-12 -22 -15 -31Q-4 -29 0 -18Z;g2 p M0 -26Q12 -28 14 -37Q4 -35 0 -26Z' +
    ';y2 e 0 -56 16 6.5;y2 e 0 -56 16 6.5 @45;y2 e 0 -56 16 6.5 @90;y2 e 0 -56 16 6.5 @135;y e -1 -57 13 5 @22;y e -1 -57 13 5 @112' +
    ';n2 c 0 -56 7;n c -1 -57 5.5;n1 .6 c -3 -59 1.8',
  rock: '14 16|k .1 e 0 0 14 3;e2 p M-13 0C-14 -9 -6 -14 1 -13C8 -12 14 -7 13 0Z;e p M-12 -2C-13 -9 -6 -12.5 0 -12C5 -11.5 9 -8 8 -2Z' +
    ';e1 .8 e -6 -8.5 3.5 2 @-20',
  mushroom: '12 22|k .1 e 0 0 10 2.5;m2 r -4 -12 8 12 3;m r -4 -12 6 12 3;r2 p M-12 -10C-12 -25 12 -25 12 -10Z' +
    ';r p M-12 -11C-12 -23 7 -25 9 -12Z;w c -5 -17 2.2;w c 3 -19 1.7;w c 7 -13 1.3',
  house: '20 42|k .1 e 0 0 20 3.5;m2 r -15 -23 30 23;m r -15 -23 23 23;r2 p M-19 -21L0 -40L19 -21Z;r p M-19 -21L0 -40L3 -37L-13 -21Z' +
    ';e2 r 7 -40 5 9;n2 r -4 -13 8 13 2;b1 r -12 -18 6 6 1;b1 r 7 -18 5 6 1;w .5 r -12 -18 2.5 2.5 1',
  topiary: '12 44|k .1 e 0 0 11 2.5;n2 r -8 -10 16 10 2;n r -8 -10 12 10 2;n2 r -1.5 -16 3 7;g2 c 0 -26 11;g c -1.5 -27.5 9;g1 .7 c -5 -32 3' +
    ';g2 p M0 -44L6 -36H-6Z;g p M0 -44L-6 -36H1Z',
  lolli: '14 52|k .1 e 0 0 9 2.5;w2 r -1.6 -38 3.2 38 1.6;w r -1.6 -38 2 38 1;p2 c 0 -40 13;p c -1.5 -41.5 11' +
    ';w .85 l 2.6 M-1.5 -41.5m-1 0a1.6 1.6 0 1 1 3.2 0a4.2 4.2 0 1 1 -7.6 0a6.8 6.8 0 1 1 12.4 0;w .6 c -7 -46 2.4',
  cane: '10 48|k .1 e 0 0 8 2.5;w2 l 7.5 M3.5 0V-31A7 7 0 0 0 -10.5 -31;w l 6 M2 0V-31A7 7 0 0 0 -12 -31' +
    ';r l 6/4.5,4.5 M2 0V-31A7 7 0 0 0 -12 -31;w .8 l 1.4 M0.8 -3V-28',
  gum: '12 20|k .1 e 0 0 12 2.5;p2 p M-11 0C-12 -19 12 -19 11 0Z;p p M-11 -1.5C-12 -16 7 -17.5 7.5 -2Z;w .7 e -5 -10 2.6 1.6 @-35' +
    ';w .8 c 1 -7 .9;w .8 c -6 -4 .8;w .8 c 4 -12 .8',
  cupcake: '13 34|k .1 e 0 0 11 2.5;p2 p M-10 -12L-7 0H7L10 -12Z;p p M-10 -12L-7 -1H2L3 -12Z;m2 c 0 -16 11;m c -2 -18 9' +
    ';m c 0 -26 6;r c 1 -32 3.4;r1 .7 c 0 -33 1.1;w .7 c -6 -21 2',
  clocktower: '20 88|k .1 e 0 0 18 3.5;e2 r -12 -66 24 66;e r -12 -66 17 66;w .35 r -10 -64 3 62 1.5;r2 p M-15 -64L0 -86L15 -64Z' +
    ';r p M-15 -64L0 -86L2 -64Z;y2 c 0 -48 10;w c 0 -48 8;k2 l 1.8 M0 -48V-54M0 -48H4.5;b1 r -3 -32 6 9 3;n3 r -4.5 -14 9 14 4.5',
  lamp: '7 48|k .1 e 0 0 7 2;k2 r -1.6 -42 3.2 42 1.2;k2 r -5 -47 10 6 2.5;y1 .45 c 0 -38 7;y c 0 -39 3.6;w .8 c -1 -40 1.2',
  coral: '15 34|k .1 e 0 0 13 2.5;p2 l 5 M0 0V-12L-8 -22V-31M0 -12L7 -21V-32M-8 -22L-13 -17V-23M7 -21L12 -16V-23' +
    ';p l 3.4 M-1 -1V-12L-9 -22V-31M-1 -12L6 -21V-32M-9 -22L-14 -17V-23M6 -21L11 -16V-23;p1 .8 c -9 -31 1.8;p1 .8 c 6 -32 1.8',
  fan: '15 30|k .1 e 0 0 12 2.5;v2 p M-1 0L-14 -16C-16 -30 14 -32 14 -16Z;v p M-1 -1L-14 -17C-15 -28 8 -31 9 -18Z' +
    ';v1 .7 l 1.2 M-1 -2L-9 -24M-1 -2L-1 -28M-1 -2L7 -24',
  weed: '9 42|g2 l 4.5 M0 0C-7 -10 6 -18 0 -28C-4 -34 3 -38 1 -42;g l 2.8 M-1 0C-8 -10 5 -18 -1 -28C-5 -34 2 -38 0 -42' +
    ';g2 l 3.5 M5 0C1 -8 10 -14 6 -22;g l 2.2 M4.5 0C.5 -8 9.5 -14 5.5 -22',
  fish: '16 34|o2 e 0 -24 10 7;o p M8 -24L17 -30V-18Z;o e -1.5 -25.5 8 5;o1 .7 e -3 -28 3.2 1.4 @-10;k c -5 -25 1.5;w c -5.5 -25.5 .5',
  shell: '10 14|k .1 e 0 0 10 2;p2 p M-9 0C-10 -15 10 -15 9 0Z;p1 p M-8 -1.5C-9 -13 5 -14 5.5 -2Z;p2 l 1 M0 -1V-11M-4 -1L-6 -9M4 -1L5.5 -9',
  star: '11 22|k .1 e 0 0 10 2;o2 p M0 -22L2.7 -14.7L10.5 -14.4L4.4 -9.6L6.5 -2.1L0 -6.4L-6.5 -2.1L-4.4 -9.6L-10.5 -14.4L-2.7 -14.7Z' +
    ';o p M-1 -21L1.2 -15.1L7.6 -14.8L2.6 -10.8L4.3 -4.7L-1 -8.2L-6.3 -4.7L-4.6 -10.8L-9.6 -14.8L-3.2 -15.1Z;o1 .8 c -2 -14 1.6',
  planet: '20 40|o2 c 0 -22 12;o c -2 -24 10;o1 .6 c -6 -28 3.4;o2 .5 e 3 -18 4 2;y o 2.6 0 -22 20 5.5 @-16;y1 .7 l 1.4 M-17 -21Q-14 -27 -8 -29',
  rocket: '16 62|k .1 e 0 0 10 2.5;r2 p M-8 -22L-15 -8V-4L-7 -10Z;r2 p M8 -22L15 -8V-4L7 -10Z;w2 p M-9 -10C-11 -34 -4 -50 0 -58C4 -50 11 -34 9 -10Z' +
    ';w p M-9 -10C-11 -34 -4 -50 0 -58C2 -50 4 -34 3 -10Z;r p M-5.5 -49C-3 -54 -1.5 -56.5 0 -58C1.5 -56.5 3 -54 5.5 -49Z;b2 c 0 -34 5.5;b1 c -.8 -34.8 3.8' +
    ';o p M-5 -9L0 3L5 -9Z;y p M-2.5 -9L0 -2L2.5 -9Z',
  crater: '16 10|e2 e 0 -3 15 5;e3 .45 e 1 -2.5 10 3;e1 .7 l 1.4 M-12 -5A12 4 0 0 1 4 -7.5',
  spark: '8 26|y p M0 -26Q1 -19 7 -18Q1 -17 0 -10Q-1 -17 -7 -18Q-1 -19 0 -26Z;w .7 c -.5 -19 1.3',
  palm: '24 62|k .1 e 2 0 14 3;n2 l 6.5 M0 0C2 -20 -2 -38 4 -50;n l 3.6 M-1.2 0C.8 -20 -3.2 -38 2.8 -50' +
    ';g2 p M4 -50C14 -60 26 -54 28 -42C20 -50 12 -50 4 -50Z;g2 p M4 -50C-6 -58 -18 -54 -22 -44C-12 -50 -4 -50 4 -50Z' +
    ';g p M4 -50C-2 -64 -14 -66 -22 -62C-10 -58 -2 -54 4 -50Z;g p M4 -50C8 -64 20 -68 26 -62C16 -60 8 -56 4 -50Z;n3 c 1.5 -47.5 2.6;n3 c 6 -47 2.4',
  chest: '16 26|k .1 e 0 0 16 3;n2 r -14 -15 28 15 2;n r -14 -15 22 15 2;n2 p M-15 -15C-15 -26 15 -26 15 -15Z' +
    ';n1 p M-15 -15C-15 -25 9 -26 9.5 -15Z;y2 r -15 -16 30 3;y r -2.5 -18 5 7 1.5;y1 .8 c -10 -21 1.6',
  ship: '28 54|n2 p M-26 -8L-19 0H19L26 -8Z;n p M-26 -8L-19 -1.5H12L15 -8Z;n3 r -1.2 -50 2.4 42;w2 p M2 -46Q16 -32 20 -14H2Z' +
    ';w p M-1 -46Q-14 -32 -19 -14H-1Z;r p M1 -50L12 -46.5L1 -43Z;w .5 l 1.2 M-22 -5H8',
  mountain: '30 58|k .1 e 0 0 28 4;e2 p M-30 0L-3 -56L30 0Z;e p M-30 0L-3 -56L-1 -40L-6 0Z;w2 p M-3 -56L7 -36L2 -38L-2 -34L-6 -38L-12 -38Z' +
    ';w p M-3 -56L-1 -39L-6 -38L-12 -38Z',
  flag: '9 32|k .1 e 0 0 6 2;e3 r -1.1 -31 2.2 31 1;r p M1.1 -30L14 -25.5L1.1 -21Z;r2 p M1.1 -25.5L14 -25.5L1.1 -21Z',
  gear: '18 36|k .1 e 0 0 14 3;b2 o 8/5.5,5.5 0 -18 14 14;b2 c 0 -18 14;b c -1.5 -19.5 12;b3 c 0 -18 4.5;b1 .7 l 2 M-9 -24A10 10 0 0 1 -3 -29',
  crate: '14 26|k .1 e 0 0 14 3;t2 r -12 -22 24 22 2;t r -12 -22 18 22 2;t3 .6 l 1.4 M-12 -11H12M-6 -22V0M2 -22V0;t1 .8 l 1.6 M-10 -20H4',
  factory: '30 70|k .1 e 0 0 30 4;r2 r 13 -58 9 30;r r 13 -58 6.5 30;w2 c 21 -64 5.5;w c 25 -72 7;w c 19 -66 4;e2 r -28 -30 56 30' +
    ';e r -28 -30 44 30;b2 p M-28 -30L-18 -40V-30L-8 -40V-30L2 -40V-30L12 -40V-30L22 -40V-30Z;y1 r -22 -23 8 8 1;y1 r -9 -23 8 8 1;n2 r 6 -14 9 14 2',
  cactus: '14 46|k .1 e 0 0 11 2.5;g2 l 6.5 M-5 -20H-10V-31;g2 l 6.5 M5 -14H10V-25;g2 r -5.5 -42 11 42 5.5;g r -5.5 -42 8 42 4' +
    ';g l 3.6 M-6 -21H-10.5V-31M6 -15H9.5V-25;g1 .7 l 1.6 M-2.5 -37V-8;p c 0 -43 3',
  pyramid: '32 46|k .1 e 0 0 32 4;t2 p M0 -44L32 0H5Z;t p M0 -44L5 0H-32Z;t3 .45 l 1.2 M-22 -14H2.5M-12 -28H3.5;t1 .7 l 1.6 M-2 -40L-26 -4',
  dune: '26 14|t p M-26 0C-14 -16 6 -16 26 0Z;t2 p M-2 -12C8 -12 16 -7 26 0H6Z;t1 .7 l 1.4 M-18 -5C-12 -10 -6 -12 -2 -12',
  volcano: '36 66|k .1 e 0 0 34 4;n2 p M-34 0L-10 -48H10L34 0Z;n p M-34 0L-10 -48H-1L-6 0Z' +
    ';r p M-10 -48H10L7 -44L4 -38L1 -43L-3 -35L-6 -44Z;o l 3 M3 -44L7 -30;y .8 l 1.4 M-7 -47H6;e1 .8 c -2 -56 6;e1 .8 c 6 -63 8;w .6 c -4 -58 2.6',
  crystal: '14 36|k .1 e 0 0 13 2.5;v2 p M-3 0V-24L3 -34L9 -24V0Z;v1 p M-3 0V-24L3 -34V0Z;c2 p M-13 0V-12L-9 -19L-5 -12V0Z' +
    ';c1 p M-13 0V-12L-9 -19V0Z;w .8 l 1.4 M0 -24V-8',
  isle: '24 46|n2 p M-22 -16C-16 -2 -6 4 2 6C6 -2 16 -6 22 -16Z;n p M-21 -16C-15 -4 -6 1 0 2C2 -6 6 -12 8 -16Z;g2 e 0 -16 24 5;g e -2 -17 21 3.8' +
    ';b2 r -6 -40 12 22;b r -6 -40 8 22;b3 p M-8 -40L0 -48L8 -40Z;y1 r -3 -34 3.5 4.5;y1 r -3 -27 3.5 4.5',
  balloon: '12 50|r2 c 0 -36 12;r c -1.5 -37.5 10.5;y l 2.2 M0 -48Q-6 -36 0 -24M-6 -46Q-12 -36 -6 -26;w .6 e -6 -41 2.4 3.6;k2 .5 l .9 M-9 -29L-4 -18M9 -29L4 -18' +
    ';n r -4.5 -18 9 7 2',
  cloud: '24 22|w2 p M-22 0C-26 -8 -16 -14 -10 -10C-8 -20 6 -20 8 -11C14 -15 24 -9 20 0Z;w p M-21 -2C-24 -9 -15 -13 -10 -10.5C-8 -18.5 5 -18.5 6.5 -11C11 -14 18 -9 16 -2Z',
  galaxy: '22 36|v1 .5 e 0 -18 21 8 @-15;w .9 l 2 M0 -18m-2 0a3 2 -15 1 1 5 -1a8 4 -15 1 1 -13 2a14 6 -15 1 1 24 -4;y c 0 -18 3.6;w .8 c -.8 -18.8 1.4',
  umbrella: '19 46|k .1 e 0 0 10 2.5;w2 l 2.2 M2 0L-1 -36;r2 p M-19 -34C-15 -50 15 -51 19 -37Z;r p M-19 -34C-15 -48 1 -51 6 -41Z' +
    ';w p M-9 -36C-8 -45 -3 -49 0 -49C-1 -45 -2 -41 -3 -37Z;w .6 l 1.4 M-15 -38C-13 -43 -10 -46 -6 -48',
  bucket: '12 26|k .1 e 0 0 10 2.5;b2 p M-8 -14L-6 0H6L8 -14Z;b p M-8 -14L-6 0H2L3 -14Z;b1 r -9 -16 18 3 1.5;k2 .6 l 1.2 M-8 -15C-8 -24 8 -24 8 -15' +
    ';y2 l 2.4 M11 0L4 -20;y p M3 -27L8.5 -25.5L6 -18.5L1.5 -20Z',
  pencils: '13 42|k .1 e 0 0 12 2.5;y l 4.5 M-4 -18L-7 -34;r l 4.5 M1 -18V-38;g l 4.5 M5 -18L9 -32;t1 c -7.2 -35.5 2.3;t1 c 1 -39.5 2.3;t1 c 9.3 -33.5 2.3' +
    ';b2 r -10 -19 20 19 2;b r -10 -19 15 19 2;b1 .7 r -8 -17 3 15 1.5',
  books: '16 28|k .1 e 0 0 16 3;r2 r -14 -8 28 8 1.5;r r -14 -8 23 8 1.5;b2 r -12 -16 25 8 1.5;b r -12 -16 20 8 1.5;g2 r -13 -24 24 8 1.5' +
    ';g r -13 -24 19 8 1.5;m p M9 -7h4v6h-4zM8.5 -15h3.5v6h-3.5zM6.5 -23h3.5v6h-3.5z;w .5 l 1.2 M-11 -21H2',
  tower: '15 66|k .1 e 0 0 14 3;e2 r -10 -46 20 46;e r -10 -46 14 46;e2 r -12 -52 24 7 1;e r -12 -52 18 7 1;v2 p M-13 -52L0 -66L13 -52Z' +
    ';v p M-13 -52L0 -66L2 -52Z;k2 r -2.5 -36 5 9 2.5;n3 r -4 -14 8 14 4',
  castle: '34 74|k .1 e 0 0 34 4;e2 r -20 -30 40 30;e r -20 -30 32 30;n3 p M-6 0V-12A6 6 0 0 1 6 -12V0Z;e2 r -32 -50 16 50;e r -32 -50 12 50' +
    ';e2 r 16 -50 16 50;e r 16 -50 12 50;v2 p M-34 -50L-24 -66L-14 -50Z;v p M-34 -50L-24 -66L-23 -50Z;v2 p M14 -50L24 -66L34 -50Z' +
    ';v p M14 -50L24 -66L25 -50Z;r p M24 -66V-74L31 -71L24 -68Z;k2 r -26 -38 4 7 2;k2 r 22 -38 4 7 2',
  fountain: '22 38|k .1 e 0 0 21 3.5;e2 p M-20 -10H20L16 0H-16Z;e p M-20 -10H12L10 0H-16Z;c1 e 0 -10 18 3.4;e r -3 -26 6 16 1.5' +
    ';c .9 l 2.4 M0 -27C-6 -38 -13 -32 -15 -12M0 -27C6 -38 13 -32 15 -12;c1 c 0 -29 4;w .8 c -1 -30 1.4',
  pinata: '16 58|n3 l 1.2 M0 -58V-44;o2 p M0 -45L3.5 -36.9L12.4 -36L5.7 -30.1L7.6 -21.5L0 -26L-7.6 -21.5L-5.7 -30.1L-12.4 -36L-3.5 -36.9Z' +
    ';o p M-1 -44L1.9 -37L9.5 -36.4L3.8 -31.5L5.5 -24.1L-1 -28L-7.5 -24.1L-5.8 -31.5L-11.5 -36.4L-3.9 -37Z;p c 0 -32 3.4' +
    ';p l 2 M-6 -23L-9 -10M0 -26V-12M6 -23L9 -11;c l 2 M-3 -25L-4 -14M3 -25L4 -13',
  pballoons: '12 52|k2 .5 l .9 M0 0L-6 -30M0 0L1 -36M0 0L7 -28;r c -6 -34 6.5;y c 1 -41 6.5;c c 7 -32 6.5;w .6 c -8 -36 1.8;w .6 c -1 -43 1.8;w .6 c 5 -34 1.8',
  trophy: '16 46|k .1 e 0 0 12 2.5;n2 r -10 -8 20 8 2;n r -10 -8 15 8 2;y2 r -3 -18 6 10;y2 l 3 M-10 -38C-18 -38 -16 -26 -7 -26M10 -38C18 -38 16 -26 7 -26' +
    ';y2 p M-11 -44H11C11 -28 6 -20 0 -20C-6 -20 -11 -28 -11 -44Z;y p M-11 -44H5C5 -29 2 -21 0 -20.5C-6 -21 -11 -28 -11 -44Z;y1 .8 l 2 M-7 -40C-7 -33 -5 -28 -3 -26',
  snowman: '14 42|k .1 e 0 0 12 2.5;w2 c 0 -11 11;w c -1.5 -12.5 9;w2 c 0 -29 8;w c -1 -30 6.6;k c -3 -31 1.1;k c 2 -31 1.1;o p M0 -28.5L6 -27.5L0 -26.5Z' +
    ';r l 3 M-6 -22H6;n2 l 1.4 M-9 -15L-16 -21M9 -15L15 -22',
  rainbow: '28 32|r l 4 M-24 0A24 24 0 0 1 24 0;o l 4 M-20 0A20 20 0 0 1 20 0;y l 4 M-16 0A16 16 0 0 1 16 0;g l 4 M-12 0A12 12 0 0 1 12 0' +
    ';b l 4 M-8 0A8 8 0 0 1 8 0;w c -24 -1 5;w c -18 1 4;w c 21 -1 5;w c 26 1 4',
  building: '14 58|k .1 e 0 0 14 3;b2 r -12 -54 24 54;b r -12 -54 17 54;e2 r -1 -60 2 6;b1 p M-9 -50h4v5h-4zM-1 -50h4v5h-4zM-9 -40h4v5h-4zM-1 -40h4v5h-4z' +
    'M-9 -30h4v5h-4zM-1 -30h4v5h-4zM-9 -20h4v5h-4zM-1 -20h4v5h-4z;n3 r -3 -9 6 9 1.5',
  traffic: '7 46|k .1 e 0 0 6 2;k2 r -1.5 -30 3 30 1;k r -6 -46 12 20 3;r c 0 -41 2.6;y .45 c 0 -36 2.6;g .45 c 0 -31 2.6;w .4 c -.8 -41.8 .9',
  sign: '15 38|k .1 e 0 0 10 2.5;n2 r -2 -34 4 34 1.5;n p M-14 -31H8L12 -27L8 -23H-14Z;n2 p M14 -19H-6L-10 -15L-6 -11H14Z;n1 .8 l 1.4 M-12 -29H6',
  flask: '13 32|k .1 e 0 0 11 2.5;e1 r -3.5 -30 7 12 1;c1 p M-3.5 -19L-11 -3C-12 0 -11 1 -9 1H9C11 1 12 0 11 -3L3.5 -19Z' +
    ';g p M-7.6 -10H7.6L11 -3C12 0 11 1 9 1H-9C-11 1 -12 0 -11 -3Z;g2 p M3 -10H7.6L11 -3C12 0 11 1 9 1H6Z;w c -3 -6 1.6;w c 2 -3 1.1;w .7 l 1.6 M-5 -16L-9 -6',
  bulb: '12 38|y1 .4 c 0 -26 15;y c 0 -26 11;y1 c -1.5 -27.5 8;e2 r -5 -15 10 8 2;e3 l 1.2 M-5 -12H5;y2 l 1.4 M-3 -21L-1 -27L1 -21L3 -27;w .8 c -5 -31 2.6',
  dome: '28 62|k .1 e 0 0 28 4;e2 r -20 -24 40 24;e r -20 -24 32 24;w2 p M-22 -24C-22 -52 22 -52 22 -24Z;w p M-22 -24C-22 -50 4 -52 8 -26Z' +
    ';b3 p M-3 -48C-1 -48.5 2 -48 3 -47.5V-24H-3Z;e2 l 4.5 M2 -40L22 -56;n3 r -4 -14 8 14 4;w .7 l 1.6 M-17 -28C-17 -38 -12 -44 -6 -46',
  tele: '16 44|k .1 e 0 0 12 2.5;k2 l 1.6 M0 -20L-9 0M0 -20L9 0M0 -20V0;b2 l 9 M-11 -26L12 -38;b l 5.5 M-12 -27.5L7 -37.5;c1 c 12.5 -38.5 3.4',
  kite: '12 50|k2 .6 l 1 M2 -20C-4 -12 6 -8 0 0;p c -1 -9 1.8;y c 2 -4 1.8;r2 p M0 -50L11 -36L2 -18L-10 -34Z;r p M0 -50L2 -34.5L2 -18L-10 -34Z;y l 1 M0 -50L2 -18M-10 -34L11 -36',
  maracas: '14 34|r2 l 2.6 M-4 0L-8 -16;g2 l 2.6 M5 0L9 -16;r e -9.5 -22 6 8 @-15;g e 10.5 -22 6 8 @15;y l 1.6 M-14 -24L-6 -18M6 -18L14 -24;w .6 c -11 -26 1.6;w .6 c 9 -26 1.6'
};
var SCN_V = {
  treeO: ['tree', 'g', 'o'], treeP: ['tree', 'g', 'p'], treeY: ['tree', 'g', 'y'], houseB: ['house', 'r', 'b'], houseG: ['house', 'r', 'g'],
  gumG: ['gum', 'p', 'g'], gumC: ['gum', 'p', 'c'], gumY: ['gum', 'p', 'y'], lolliC: ['lolli', 'p', 'c'], lolliV: ['lolli', 'p', 'v'],
  coralO: ['coral', 'p', 'o'], fanC: ['fan', 'v', 'c'], fishB: ['fish', 'o', 'y'], crystalP: ['crystal', 'v', 'p'], crystalB: ['crystal', 'v', 'b'],
  buildingO: ['building', 'b', 'o'], buildingG: ['building', 'b', 'g'], balloonB: ['balloon', 'r', 'b'], balloonG: ['balloon', 'r', 'g'],
  planetC: ['planet', 'o', 'c'], planetP: ['planet', 'o', 'p'], umbrellaB: ['umbrella', 'r', 'b'], tulipY: ['tulip', 'r', 'y'],
  tulipV: ['tulip', 'r', 'v'], flagB: ['flag', 'r', 'b'], gearO: ['gear', 'b', 'o'], starY: ['star', 'o', 'y'], kiteB: ['kite', 'r', 'b'],
  crateB: ['crate', 't', 'n'], towerB: ['tower', 'v', 'b']
};
var SCN_T = {
  town: { sm: ['bush', 'flowers'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['q', 120, [26, 16, 22], 'g1 .45'], ['q', 170, [12, 18], 'green']],
    lm: ['house', 'houseB'], pr: ['tree', 'houseB', 'bush', 'flowers', 'house', 'treeY'], tx: [['tuft', 'g2']] },
  garden: { sm: ['flowers', 'bush'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 1, hz: [['a', 70, [16, 22, 12], 'g1 .5'], ['q', 160, [10, 16], 'green']],
    lm: ['topiary', 'tulip'], pr: ['tulip', 'bush', 'topiary', 'tulipY', 'flowers', 'tulipV'], tx: [['tuft', 'g2'], ['dot', 'p1']] },
  meadow: { sm: ['flowers', 'bush'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['q', 110, [30, 18, 26], 'g1 .45'], ['q', 150, [14, 22, 10], 'green']],
    lm: ['sunflower', 'tree'], pr: ['tree', 'flowers', 'bush', 'sunflower', 'tulip', 'treeY'], tx: [['tuft', 'g2'], ['dot', 'y']] },
  candy: { sm: ['gum', 'gumC'], sky: ['candy', 'candy-1'], g: ['pink', 'pink-2'], sun: 'sun', cl: 2, hz: [['a', 60, [18, 26, 14], 'p1 .7'], ['q', 140, [12, 18], 'pink']],
    lm: ['lolli', 'cane'], pr: ['lolli', 'gumG', 'cane', 'cupcake', 'lolliC', 'gumY', 'lolliV', 'gum'], tx: [['dash', 'c'], ['dash', 'y']] },
  clock: { sm: ['bush', 'flowers'], sky: ['sky', 'sky-1'], g: ['sun', 'sun-2'], sun: 'sun', cl: 2, hz: [['b', 46, [26, 38, 20, 32], 'e1 .55'], ['q', 160, [10, 14], 'sun']],
    lm: ['clocktower', 'tree'], pr: ['tree', 'lamp', 'bush', 'house', 'flowers', 'treeO'], tx: [['dot', 't1']] },
  reef: { sm: ['shell', 'rock'], sky: ['sea-1', 'sea'], g: ['sea', 'sea-2'], rays: 1, hz: [['a', 80, [14, 20, 10], 'c1 .6'], ['q', 150, [8, 12], 'sea']],
    lm: ['coral', 'fan'], pr: ['coral', 'weed', 'fish', 'shell', 'fanC', 'coralO', 'fishB', 'star'], tx: [['bub', 'w']] },
  space: { sm: ['crater'], sky: ['night', 'night-1'], g: ['lilac', 'lilac-2'], sun: 'moon', st: 12, hz: [['a', 90, [10, 16, 8], 'v1 .7'], ['q', 170, [8, 12], 'lilac']],
    lm: ['rocket', 'planet'], pr: ['planet', 'crater', 'spark', 'planetC', 'rocket', 'crater'], tx: [['spark', 'y1']] },
  bay: { sm: ['shell', 'rock'], sky: ['sky', 'sky-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 2, hz: [['q', 70, [2, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sand']],
    lm: ['ship', 'palm'], pr: ['palm', 'chest', 'shell', 'rock', 'star', 'umbrellaB'], tx: [['dot', 't2']] },
  mountain: { sm: ['rock', 'bush'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['l', 90, [44, 30, 52, 36], 'e1 .7'], ['q', 140, [14, 20], 'green']],
    lm: ['mountain', 'pine'], pr: ['pine', 'rock', 'mountain', 'pine', 'bush', 'flagB'], tx: [['tuft', 'g2']] },
  forest: { sm: ['mushroom', 'bush'], sky: ['sky', 'sky-1'], g: ['mint', 'mint-2'], sun: 'sun', cl: 1, hz: [['l', 26, [26, 34, 22, 30], 'g1 .55'], ['q', 150, [12, 18], 'mint']],
    lm: ['tree', 'mushroom'], pr: ['pine', 'tree', 'mushroom', 'bush', 'treeY', 'rock'], tx: [['tuft', 'g2']] },
  factory: { sm: ['crate'], sky: ['sky', 'sky-1'], g: ['stone', 'stone-2'], sun: 'sun', cl: 2, hz: [['b', 40, [30, 44, 22, 36], 'b1 .4'], ['q', 170, [8, 12], 'stone']],
    lm: ['factory', 'gear'], pr: ['gear', 'crate', 'lamp', 'gearO', 'crateB', 'bush'], tx: [['dot', 'e1']] },
  desert: { sm: ['rock'], sky: ['dusk', 'dusk-1'], g: ['sand', 'sand-2'], sun: 'sun', hz: [['q', 160, [22, 30, 16], 't1 .8'], ['q', 200, [10, 16], 'sand']],
    lm: ['pyramid', 'cactus'], pr: ['cactus', 'rock', 'dune', 'cactus', 'dune', 'pyramid'], tx: [['dot', 't2']] },
  volcano: { sm: ['rock'], sky: ['dusk', 'dusk-1'], g: ['peach', 'peach-2'], sun: 'sun', cl: 1, hz: [['l', 110, [36, 22, 44], 'n1 .3'], ['q', 160, [10, 14], 'peach']],
    lm: ['volcano', 'flask'], pr: ['rock', 'flask', 'crystal', 'volcano', 'rock', 'crystalP'], tx: [['dot', 'n1']] },
  caves: { sm: ['rock', 'crystalP'], sky: ['lilac-2', 'lilac'], g: ['lilac', 'lilac-2'], hz: [['l', 34, [-18, -28, -12, -24], 'v1 .55', 1], ['q', 160, [10, 14], 'lilac']],
    lm: ['crystal', 'crystalB'], pr: ['crystal', 'rock', 'crystalB', 'mushroom', 'crystalP', 'rock'], tx: [['spark', 'w']] },
  skycity: { sm: ['cloud'], sky: ['sky', 'sky-1'], g: ['sky-1', 'sky'], sun: 'sun', hz: [['a', 70, [16, 24, 12], 'w'], ['a', 90, [10, 14], 'sky-1']],
    lm: ['isle', 'balloon'], pr: ['cloud', 'balloon', 'isle', 'kite', 'balloonB', 'balloonG', 'kiteB'], tx: [['dot', 'w']] },
  galaxy: { sm: ['spark'], sky: ['night', 'night-1'], g: ['blue', 'blue-2'], sun: 'moon', st: 14, hz: [['a', 100, [12, 8, 16], 'b1 .6'], ['q', 170, [8, 12], 'blue']],
    lm: ['galaxy', 'planetP'], pr: ['planet', 'galaxy', 'spark', 'planetC', 'crater', 'planetP'], tx: [['spark', 'y1']] },
  beach: { sm: ['shell', 'starY'], sky: ['sky', 'sky-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 2, hz: [['q', 70, [2, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sand']],
    lm: ['umbrella', 'bucket'], pr: ['bucket', 'shell', 'star', 'umbrellaB', 'palm', 'starY'], tx: [['dot', 't2']] },
  workshop: { sm: ['books'], sky: ['dusk', 'dusk-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 1, hz: [['b', 24, [14, 16], 'n1 .5'], ['q', 180, [8, 10], 'sand']],
    lm: ['pencils', 'books'], pr: ['crate', 'books', 'pencils', 'gearO', 'lamp', 'crateB'], tx: [['dot', 'n1']] },
  library: { sm: ['books'], sky: ['candy', 'candy-1'], g: ['rose', 'rose-2'], sun: 'sun', cl: 1, hz: [['b', 22, [30, 24], 'e1 .6'], ['q', 170, [8, 12], 'rose']],
    lm: ['tower', 'books'], pr: ['books', 'lamp', 'towerB', 'bush', 'flag', 'books'], tx: [['dot', 'r1']] },
  island: { sm: ['shell', 'rock'], sky: ['sky', 'sky-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 2, hz: [['q', 260, [2, 18, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sand']],
    lm: ['palm', 'chest'], pr: ['palm', 'shell', 'rock', 'bush', 'star', 'palm'], tx: [['dot', 't2']] },
  legend: { sm: ['spark'], sky: ['lilac-2', 'lilac'], g: ['lilac', 'lilac-2'], sun: 'moon', st: 6, hz: [['l', 120, [30, 20, 40], 'v1 .5'], ['q', 160, [10, 14], 'lilac']],
    lm: ['castle', 'crystal'], pr: ['tower', 'crystal', 'flagB', 'spark', 'flask', 'crystalP'], tx: [['spark', 'w']] },
  plaza: { sm: ['flowers'], sky: ['sky', 'sky-1'], g: ['peach', 'peach-2'], sun: 'sun', pp: ['p', 'y', 'c', 'g'], hz: [['b', 52, [28, 20, 34], 'o1 .45'], ['q', 180, [8, 10], 'peach']],
    lm: ['fountain', 'cactus'], pr: ['cactus', 'lamp', 'umbrella', 'flowers', 'pballoons', 'tree'], tx: [['dot', 'o1']] },
  fiesta: { sm: ['flowers'], sky: ['dusk', 'dusk-1'], g: ['sun', 'sun-2'], sun: 'sun', pp: ['r', 'c', 'y', 'v'], hz: [['q', 70, [2, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sun']],
    lm: ['pinata', 'palm'], pr: ['pballoons', 'maracas', 'palm', 'flowers', 'cactus', 'pinata'], tx: [['dash', 'p'], ['dash', 'c']] },
  repaso: { sm: ['spark'], sky: ['sky', 'sky-1'], g: ['blue', 'blue-2'], sun: 'sun', cl: 2, pp: ['y', 'b', 'r'], hz: [['a', 90, [14, 20], 'b1 .5'], ['q', 170, [8, 12], 'blue']],
    lm: ['trophy', 'flag'], pr: ['flag', 'pballoons', 'spark', 'flagB', 'trophy', 'starY'], tx: [['spark', 'y']] },
  tiempo: { sm: ['flowers'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['q', 130, [24, 16], 'g1 .45'], ['q', 160, [10, 16], 'green']],
    lm: ['rainbow', 'snowman'], pr: ['treeP', 'umbrellaB', 'tree', 'snowman', 'treeO', 'flowers'], tx: [['tuft', 'g2']] },
  city: { sm: ['bush'], sky: ['sky', 'sky-1'], g: ['stone', 'stone-2'], sun: 'sun', cl: 2, hz: [['b', 34, [40, 26, 54, 32, 46], 'b1 .4'], ['q', 180, [8, 10], 'stone']],
    lm: ['building', 'buildingO'], pr: ['buildingO', 'tree', 'lamp', 'traffic', 'buildingG', 'bush'], tx: [['dot', 'e1']] },
  nature: { sm: ['mushroom', 'flowers'], sky: ['sky', 'sky-1'], g: ['mint', 'mint-2'], sun: 'sun', cl: 2, hz: [['l', 30, [24, 32, 20], 'g1 .55'], ['q', 150, [12, 18], 'mint']],
    lm: ['sign', 'pine'], pr: ['pine', 'mushroom', 'tree', 'flowers', 'rock', 'bush'], tx: [['tuft', 'g2']] },
  lab: { sm: ['flask'], sky: ['sky', 'sky-1'], g: ['sea', 'sea-2'], sun: 'sun', cl: 1, hz: [['b', 60, [24, 36], 'b1 .4'], ['q', 170, [8, 12], 'sea']],
    lm: ['flask', 'bulb'], pr: ['flask', 'bulb', 'gear', 'books', 'flask', 'tele'], tx: [['bub', 'c1']] },
  observatory: { sm: ['spark'], sky: ['night', 'night-1'], g: ['lilac', 'lilac-2'], sun: 'moon', st: 14, hz: [['q', 160, [26, 14, 30], 'v1 .6'], ['q', 170, [8, 12], 'lilac']],
    lm: ['dome', 'tele'], pr: ['tele', 'planet', 'spark', 'rock', 'planetC', 'spark'], tx: [['spark', 'y1']] }
};
var SCN_W = {
  m_tiny: 'town', m_shape: 'garden', m_meadow: 'meadow', m_candy: 'candy', m_clock: 'clock', m_reef: 'reef', m_space: 'space', m_bay: 'bay',
  m_mult: 'mountain', m_frac: 'forest', m_factory: 'factory', m_desert: 'desert', m_volcano: 'volcano', m_caves: 'caves', m_sky: 'skycity',
  m_galaxy: 'galaxy',
  r_abc: 'beach', r_meadow: ['meadow', { lm: ['sunflower', 'tulip'] }], r_candy: ['candy', { lm: ['cane', 'cupcake'] }],
  r_reef: ['reef', { lm: ['fan', 'weed'] }], r_space: ['space', { lm: ['planet', 'rocket'] }], r_workshop: 'workshop',
  r_summit: ['mountain', { lm: ['mountain', 'flag'], pr: ['pine', 'flag', 'rock', 'pine', 'mountain', 'bush'] }], r_library: 'library',
  r_island: 'island', r_legend: 'legend',
  e_plaza: 'plaza', e_fiesta: 'fiesta', e_repaso: 'repaso', e_casa: ['town', { lm: ['houseG', 'tree'], pr: ['houseG', 'flowers', 'tree', 'house', 'bush', 'treeP'] }],
  e_tiempo: 'tiempo', e_ciudad: 'city', e_frases: 'library',
  d_nature: 'nature', d_lab: 'lab', d_cosmos: 'observatory'
};
