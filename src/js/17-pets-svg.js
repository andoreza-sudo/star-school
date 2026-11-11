/* ---------- pet rig (P4-05; DESIGN_SYSTEM.md section 6.2) ----------
   petSVG(kind, stage, mood, opts) draws a pet as one inline SVG, viewBox 0 0 200 200, ground at y 184.
   Named groups (class pg-<name>): shadow, glow (super only), extra (wings or fins: pg-xl, pg-xr), tail, body, belly,
   arm-l, arm-r (holds the toy), head (holds the hat), cheeks, eyes, mouth.
   - stage: 'egg' | 'baby' | 'kid' | 'grown', or the stage() number 0-4 (4 = grown plus the "super" glow ring: circles, no filter).
   - mood: 'idle' | 'happy' | 'oops' | 'cheer' | 'sleepy' | 'hungry'. A mood swaps only the eyes and mouth (PET_FACE).
   - opts.hat / opts.toy: an emoji (drawn as SVG text, today's wearables) or SVG markup on a 64x64 grid (P4-07),
     placed at the stage's anchors. opts.react: also draw the cheer and oops faces, shown while anim() puts .jump / .sad
     on a parent. opts.super: force the glow on or off.
   Anchors: PET_RIG[kind].stages[name].hat / .toy = [x, y, scale, degrees] in viewBox units (petAnchor() reads them).
     hat = where the bottom centre of a hat sits on the head; toy = centre of the toy held by the right hand.
     SVG wearables (P4-07): hat art puts its point (32, 60) on the hat anchor, toy art puts (32, 32) on the toy anchor;
     scale maps 64-grid units to viewBox units; the hat turns with the head and the toy with the right arm.
   Colour: only fill/stroke="var(--pc-x)" roles, set per pet in src/css/41-pet.css from tokens (b body, b2 body shade,
     l belly, l2 belly shade and accents, h / h2 horns, x / x2 / x3 muzzle, claws and their shades, b3 / l3 dark accent and light tint, sh / sh2 egg shell, e ink, w glint,
     t tongue, ck cheeks, d drops, gl / gl2 glow, sd shadow;
     P4-06 adds p / p2 plates and fins, b1 light spots, n / n2 / n3 the bird's nest). Motion is CSS on the groups (41-pet.css).
   Pets: dragon (P4-05, the reference), dino, bird and ocean (the sea pal) (P4-06). A new pet: add PET_RIG.<kind> with the same
     stage keys and parts (wing / tail / arm strings, body / belly / head functions, cheeks; optional face = its own PET_FACE,
     e.g. the bird's beak is its mouth), and a .pet-k-<kind> palette in 41-pet.css (only --ill-* or app tokens).
   Stage numbers come from stage() in 05-pets.js (stars); nothing here reads or writes saved data except petMood (care). */
const PET_STAGES = ['egg', 'baby', 'kid', 'grown'];
const PET_MOODS = ['idle', 'happy', 'oops', 'cheer', 'sleepy', 'hungry'];
const petR1 = v => Math.round(v * 10) / 10;

// ---- faces: drawn in the face frame (eye centres x -16 / 16, y -4; mouth near y 18), placed by the stage's head transform.
// Eyes: dark oval, a lighter iris crescent below, a big glint top left (the light comes from the top left) and a small one.
const petEye = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="var(--pc-e)"/>` +
  `<ellipse cx="${x}" cy="${petR1(y + ry * .42)}" rx="${petR1(rx * .66)}" ry="${petR1(ry * .4)}" fill="var(--pc-e2)"/>` +
  `<circle cx="${petR1(x - rx * .3)}" cy="${petR1(y - ry * .36)}" r="${petR1(rx * .44)}" fill="var(--pc-w)"/>` +
  `<circle cx="${petR1(x + rx * .38)}" cy="${petR1(y + ry * .3)}" r="${petR1(rx * .17)}" fill="var(--pc-w)"/>`;
const petEyes = (dx, dy, rx, ry) => petEye(-16 + dx, -4 + dy, rx, ry) + petEye(16 + dx, -4 + dy, rx, ry);
const petLn = (d, w) => `<path d="${d}" fill="none" stroke="var(--pc-e)" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const petMo = d => `<path d="${d}" fill="var(--pc-e)" stroke="var(--pc-e)" stroke-width="2.4" stroke-linejoin="round"/>`;
const petTongue = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="var(--pc-t)"/>`;
const PET_FACE = { // mood -> [eyes, mouth]
  idle: [petEyes(0, 0, 8, 10), petLn('M-7 18Q0 24 7 18', 3)],
  happy: [petLn('M-23-2Q-16-12-9-2M9-2Q16-12 23-2', 3.6), petMo('M-9 15Q0 29 9 15Z') + petTongue(0, 23, 4, 2.6)],
  cheer: [petEyes(0, -1, 9, 11.2), petMo('M-12 13Q0 34 12 13Z') + petTongue(0, 26.5, 5.5, 3.4)],
  oops: [petEyes(2.5, 1.5, 6.8, 8.6) + petLn('M-25-15L-12-20M25-15L12-20', 2.8) +
    '<path d="M34-30Q29-21 30.5-18Q33-14.5 36-17.5Q38-21 34-30Z" fill="var(--pc-d)"/>', petLn('M-9 20q4.5-4 9 0t9 0', 2.8)],
  sleepy: [petLn('M-23-4Q-16 3-9-4M9-4Q16 3 23-4', 3.4) + petLn('M29-30h8l-8 8h8M41-41h6l-6 6h6', 2.6),
    '<ellipse cy="20" rx="3.4" ry="4" fill="var(--pc-e)"/>'],
  hungry: [petEyes(0, -2.5, 8, 10), petMo('M-8 16Q0 25 8 16Z') + petTongue(3, 24.5, 4.4, 5.4) +
    '<path d="M-6 22q-2.5 5 0 7q2.5-2 0-7Z" fill="var(--pc-d)"/>'],
};

// "super" (stage 4): a soft ring and three sparkles behind the pet
const petSpark = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-9C1-2 2-1 9 0C2 1 1 2 0 9C-1 2-2 1-9 0C-2-1-1-2 0-9Z" fill="var(--pc-gl)"/>`;
const PET_GLOW = '<g class="pg-glow"><circle cx="100" cy="112" r="88" fill="var(--pc-gl)" opacity=".25"/>' +
  '<circle cx="100" cy="112" r="70" fill="var(--pc-gl2)" opacity=".6"/>' + petSpark(28, 50, 1.2) + petSpark(174, 72, .9) + petSpark(166, 168, 1) + '</g>';

// ---- shading helpers (shared by every pet). Light comes from the top left: each colour area is drawn as its shade shape,
// then the base shape a little up and left (the shade shows as a rim at the bottom right), then a white highlight
// (translucent, top left), plus a darker accent where parts touch (contact shadows, creases).
const petHi = (x, y, rx, ry, rot, a) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''} fill="var(--pc-w)" opacity="${a}"/>`;
// a chubby pear-shaped body: widest below the middle, flat-ish bottom
const petBlob = (x, y, rx, ry) => {
  const r = petR1, t = r(y - ry), b = r(y + ry), m = r(y + ry * .35), u = r(y - ry * .2), l = r(y + ry * .85);
  return `M${x} ${t}C${r(x + rx * .62)} ${t} ${r(x + rx)} ${u} ${r(x + rx)} ${m}C${r(x + rx)} ${l} ${r(x + rx * .6)} ${b} ${x} ${b}` +
    `C${r(x - rx * .6)} ${b} ${r(x - rx)} ${l} ${r(x - rx)} ${m}C${r(x - rx)} ${u} ${r(x - rx * .62)} ${t} ${x} ${t}Z`;
};

const PET_RIG = {};

// >>> dragon (the reference pet: green with a yellow belly, cream horns and muzzle)
PET_RIG.dragon = {
  stages: {
    egg: { egg: 1, head: [100, 126, .66], sh: 40, hat: [100, 72, .72, -8], toy: [148, 162, .62, 10] },
    baby: { body: [100, 157, 26, 25], belly: [100, 161, 16, 16], head: [100, 101, .95], horn: .5, arm: [80, 148, .72],
      wing: [86, 142, .5], tail: [118, 170, .6], sh: 36, hat: [100, 70, .74, -8], toy: [133, 162, .6, 10] },
    kid: { body: [100, 148, 31, 32], belly: [100, 154, 20, 21], head: [100, 84, 1.02], horn: .8, arm: [74, 138, .88],
      wing: [82, 130, .8], tail: [121, 167, .85], sh: 42, hat: [100, 51, .82, -8], toy: [138, 155, .68, 10] },
    grown: { body: [100, 138, 38, 42], belly: [100, 146, 25, 29], head: [100, 70, 1.06], horn: 1.1, arm: [66, 124, 1.1],
      wing: [74, 112, 1.35], tail: [126, 162, 1.3], sh: 52, hat: [100, 35, .9, -8], toy: [148, 148, .78, 10] },
  },
  egg: '<ellipse cx="100" cy="124" rx="45" ry="55" fill="var(--pc-sh2)"/><ellipse cx="98" cy="121.5" rx="42.5" ry="52.5" fill="var(--pc-sh)"/>' +
    [[66, 130, 6.5], [129, 95, 6.5], [125, 155, 9], [80, 162, 6], [100, 74, 6]].map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--pc-b2)"/><circle cx="${x - 1}" cy="${y - 1}" r="${r - 1.5}" fill="var(--pc-b)"/>`).join('') +
    '<path d="M113 80l7 8-6 6 8 7" fill="none" stroke="var(--pc-x3)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    petHi(80, 98, 10, 18, 22, .75) + petHi(90, 78, 4, 3, 0, .9),
  // left wing, joint at (0, 0); the right wing is the same shape mirrored
  wing: '<path d="M0 0C-6-18-22-34-46-38C-44-30-45-22-49-15C-40-17-34-12-32-6C-25-10-16-8-10-2Z" fill="var(--pc-b2)"/>' +
    '<path d="M-5-4C-11-17-23-28-39-32C-38-26-39-22-41-18C-35-18-31-14-29-10C-23-13-16-11-11-6Z" fill="var(--pc-b)"/>' +
    '<path d="M-8-8C-14-17-22-24-32-28" fill="none" stroke="var(--pc-w)" stroke-width="3" stroke-linecap="round" opacity=".3"/>',
  // tail, root at (0, 0), curling up to the right, with an arrow tip
  tail: '<path d="M0-9C16-9 30-12 38-26L46-22C40-4 20 9 0 9Z" fill="var(--pc-b)"/><path d="M0 9C20 9 40-4 46-22L42-24C36-8 18 5 0 5Z" fill="var(--pc-b2)"/>' +
    '<path d="M4-5C16-5 26-8 33-18" fill="none" stroke="var(--pc-w)" stroke-width="2.6" stroke-linecap="round" opacity=".3"/>' +
    '<path d="M33-23C33-35 41-43 51-45C51-35 49-25 41-19Z" fill="var(--pc-l)"/><path d="M51-45C51-35 49-25 41-19L37-21C44-27 48-35 51-45Z" fill="var(--pc-l2)"/>',
  // left arm, shoulder at (0, 0): shade rim, base, two claws
  arm: '<path d="M3-3C-5-2-12 8-12 18C-12 25-3 27 0 21C3 15 6 8 7 1Z" fill="var(--pc-b2)"/>' +
    '<path d="M2-4C-5-3-11 6-11 15C-11 21-4 22-2 18C1 13 4 7 5 0Z" fill="var(--pc-b)"/>' +
    '<circle cx="-9" cy="22" r="2" fill="var(--pc-x)"/><circle cx="-4.5" cy="23.5" r="2" fill="var(--pc-x)"/>',
  body: P => {
    const [x, y, rx, ry] = P.body, r = petR1;
    return `<path d="${petBlob(x, y, rx, ry)}" fill="var(--pc-b2)"/><path d="${petBlob(x - 1.5, y - 2.5, rx - 2, ry - 2.5)}" fill="var(--pc-b)"/>` +
      petHi(r(x - rx * .5), r(y - ry * .3), r(rx * .2), r(ry * .34), 20, .25) +
      [-1, 1].map(s => {
        const fx = r(x + s * rx * .52), fy = y + ry - 3, w = r(rx * .42), h = r(rx * .26);
        return `<ellipse cx="${fx + 1}" cy="${fy + 1}" rx="${w}" ry="${h}" fill="var(--pc-b3)"/><ellipse cx="${fx}" cy="${fy}" rx="${w}" ry="${h}" fill="var(--pc-b2)"/>` +
          `<ellipse cx="${r(fx - 1)}" cy="${r(fy - h * .3)}" rx="${r(w * .8)}" ry="${r(h * .6)}" fill="var(--pc-b)"/>` +
          [-1, 0, 1].map(t => `<circle cx="${r(fx + t * rx * .17)}" cy="${r(fy + h * .55)}" r="${r(rx * .075)}" fill="var(--pc-x)"/>`).join('');
      }).join('');
  },
  belly: P => {
    const [x, y, rx, ry] = P.belly, r = petR1;
    return `<ellipse cx="${x + 1.2}" cy="${y + 1.5}" rx="${rx}" ry="${ry}" fill="var(--pc-l2)"/><ellipse cx="${x - .5}" cy="${y - .5}" rx="${rx - 1.5}" ry="${ry - 1.5}" fill="var(--pc-l)"/>` +
      [-.42, .06, .52].map(f => {
        const yy = y + ry * f, w = rx * Math.sqrt(1 - f * f) * .7;
        return `<path d="M${r(x - w)} ${r(yy)}Q${x} ${r(yy + ry * .16)} ${r(x + w)} ${r(yy)}" fill="none" stroke="var(--pc-l2)" stroke-width="2.6" stroke-linecap="round"/>`;
      }).join('') + `<ellipse cx="${r(x - rx * .38)}" cy="${r(y - ry * .45)}" rx="${r(rx * .32)}" ry="${r(ry * .18)}" transform="rotate(-25 ${r(x - rx * .38)} ${r(y - ry * .45)})" fill="var(--pc-l3)" opacity=".85"/>`;
  },
  // head without the face, in the face frame (head about 42 x 35); horns grow with the stage
  head: P => {
    const h = P.horn, horn = '<path d="M-8 4C-10-8-9-20-4-31C1-20 6-9 9 1Z" fill="var(--pc-h)"/><path d="M-4-31C1-20 6-9 9 1L3 2C2-9 0-20-4-31Z" fill="var(--pc-h2)"/>' +
      '<path d="M-5 0C-6-9-5-17-3.5-24" fill="none" stroke="var(--pc-w)" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>';
    const frill = '<path d="M-38-13L-57-22L-50-8L-59 2L-40 4Z" fill="var(--pc-b2)"/><path d="M-41-9L-51-14L-47-6L-52 0L-41 1Z" fill="var(--pc-b3)"/>';
    return '<ellipse cy="31" rx="30" ry="8" fill="var(--pc-b3)" opacity=".35"/>' + frill + `<g transform="scale(-1 1)">${frill}</g>` +
      `<g transform="translate(-21 -25) scale(${h})">${horn}</g><g transform="translate(21 -25) scale(${-h} ${h})">${horn}</g>` +
      '<path d="M-11-30L-6-44L-1-33L4-46L10-31Z" fill="var(--pc-l)" stroke="var(--pc-l)" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M-1-33L4-46L10-31Z" fill="var(--pc-l2)" stroke="var(--pc-l2)" stroke-width="3" stroke-linejoin="round"/>' +
      '<ellipse cy="2" rx="43" ry="36" fill="var(--pc-b2)"/><ellipse cx="-1.5" cy="-.5" rx="41" ry="34" fill="var(--pc-b)"/>' +
      petHi(-14, -17, 17, 9, -20, .22) + petHi(-23, -20, 5, 3, -30, .55) +
      '<ellipse cx=".8" cy="16" rx="21" ry="12.5" fill="var(--pc-x2)"/><ellipse cx="-.5" cy="14.8" rx="20" ry="11.4" fill="var(--pc-x)"/>' +
      petHi(-8, 9, 6, 3, -10, .7) +
      '<ellipse cx="-5.5" cy="7" rx="2.2" ry="1.6" fill="var(--pc-b2)"/><ellipse cx="5.5" cy="7" rx="2.2" ry="1.6" fill="var(--pc-b2)"/>';
  },
  cheeks: [-30, 30].map(x => `<ellipse cx="${x}" cy="11" rx="7" ry="4.4" fill="var(--pc-ck)" opacity=".9"/><ellipse cx="${x}" cy="11.5" rx="5" ry="3" fill="var(--pc-t)" opacity=".3"/>`).join(''),
};
// <<< dragon

// ---- P4-06: dino, bird and sea pal on the same rig (same stages, faces, anchors and shading as the dragon) ----
// a volume shape: the shade path, then the base path (drawn a little up and left), both in one role pair
const petVol = (d2, d, c) => `<path d="${d2}" fill="var(--pc-${c}2)"/><path d="${d}" fill="var(--pc-${c})"/>`;
const petGl = (d, w, a) => `<path d="${d}" fill="none" stroke="var(--pc-w)" stroke-width="${w}" stroke-linecap="round" opacity="${a}"/>`;
const petAt = (x, y, r, s, m) => `<g transform="translate(${x} ${y})${r ? ` rotate(${r})` : ''}${s != 1 ? ` scale(${s})` : ''}">${m}</g>`;
// shared egg shell (the face goes on it): shade rim, base, gloss
const petShell = (rx, ry, cy) => `<ellipse cx="100" cy="${cy}" rx="${rx}" ry="${ry}" fill="var(--pc-sh2)"/>` +
  `<ellipse cx="98" cy="${cy - 2.5}" rx="${rx - 2.5}" ry="${ry - 2.5}" fill="var(--pc-sh)"/>`;
const petShellHi = petHi(80, 98, 10, 18, 22, .75) + petHi(90, 78, 4, 3, 0, .9);

// >>> dino (blue with a cream belly and snout, orange back plates, spots, a thick tail)
// a rounded plate standing on (0, 0), about 22 high
const petPlateS = petVol('M-8 2C-9-9-5-20 0-23C5-20 9-9 8 2Z', 'M-8 0C-9-9-5-18-1-21C3-18 6-9 6 0Z', 'p'), // no gloss: small plates
  petPlate = petPlateS + petGl('M-4-4C-5-10-3-14-1-17', 2.2, .5);
PET_RIG.dino = {
  stages: {
    egg: { egg: 1, head: [100, 126, .66], sh: 40, hat: [100, 72, .72, -8], toy: [148, 162, .62, 10] },
    baby: { body: [100, 157, 28, 25], belly: [100, 162, 17, 15], head: [100, 101, .94], plate: .62, arm: [81, 148, .78],
      wing: [78, 150, .55], tail: [116, 174, .62], sh: 38, hat: [100, 70, .74, -6], toy: [133, 163, .6, 10] },
    kid: { body: [100, 148, 33, 32], belly: [100, 154, 21, 21], head: [100, 84, 1], plate: .85, arm: [75, 137, .95],
      wing: [72, 142, .78], tail: [120, 172, .9], sh: 46, hat: [100, 52, .82, -6], toy: [138, 156, .68, 10] },
    grown: { body: [100, 137, 41, 43], belly: [100, 146, 27, 30], head: [100, 69, 1.04], plate: 1.1, arm: [66, 121, 1.16],
      wing: [64, 128, 1.1], tail: [126, 168, 1.28], sh: 56, hat: [100, 36, .9, -6], toy: [150, 147, .78, 10] },
  },
  egg: petShell(45, 55, 124) + [[68, 132, 8], [128, 100, 6.5], [124, 158, 9], [86, 166, 5.5], [104, 78, 5.5], [74, 96, 4]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--pc-b2)"/><circle cx="${x - 1}" cy="${y - 1}" r="${r - 1.5}" fill="var(--pc-b)"/>`).join('') +
    petAt(120, 74, 30, .6, petPlate) + petShellHi,
  // back plates poking out on one side (joint at (0, 0)); the other side is the mirror
  wing: petAt(-2, -4, -40, 1, petPlate) + petAt(4, 12, -68, .8, petPlate),
  // a thick tail lying to the right, tip curling up, two small plates on top
  tail: petAt(18, -12, 12, .5, petPlateS) + petAt(34, -18, 36, .42, petPlateS) +
    petVol('M0-13C16-13 30-12 40-18C46-22 50-28 52-34C58-26 57-14 48-6C36 5 18 12 0 12Z',
      'M0-13C16-13 29-13 38-19C44-23 48-28 50-33C54-25 52-17 45-10C34-1 17 6 0 6Z', 'b') + petGl('M4-8C16-8 27-9 35-14', 2.8, .3),
  // a stubby arm, shoulder at (0, 0), with two cream claws
  arm: petVol('M3-3C-4-2-10 5-10 13C-10 19-3 20-1 15C1 11 4 6 6 0Z', 'M2-4C-4-3-9 4-9 11C-9 16-4 17-2 13C0 9 3 5 4-1Z', 'b') +
    '<circle cx="-7.5" cy="14.5" r="2.1" fill="var(--pc-l)"/><circle cx="-3" cy="15.5" r="2.1" fill="var(--pc-l)"/>',
  body: P => {
    const [x, y, rx, ry] = P.body, r = petR1;
    return `<path d="${petBlob(x, y, rx, ry)}" fill="var(--pc-b2)"/><path d="${petBlob(x - 1.5, y - 2.5, rx - 2, ry - 2.5)}" fill="var(--pc-b)"/>` +
      petHi(r(x - rx * .5), r(y - ry * .3), r(rx * .2), r(ry * .34), 20, .25) +
      [[-.72, .08, .11], [.7, -.25, .1], [.62, -.55, .06]].map(([a, b, s]) =>
        `<ellipse cx="${r(x + a * rx)}" cy="${r(y + b * ry)}" rx="${r(rx * s)}" ry="${r(rx * s * .75)}" fill="var(--pc-b2)"/>`).join('') +
      [-1, 1].map(s => {
        const fx = r(x + s * rx * .5), fy = y + ry - 3, w = r(rx * .46), h = r(rx * .28);
        return `<ellipse cx="${fx + 1}" cy="${fy + 1}" rx="${w}" ry="${h}" fill="var(--pc-b3)"/><ellipse cx="${fx}" cy="${fy}" rx="${w}" ry="${h}" fill="var(--pc-b2)"/>` +
          `<ellipse cx="${r(fx - 1)}" cy="${r(fy - h * .3)}" rx="${r(w * .8)}" ry="${r(h * .6)}" fill="var(--pc-b)"/>` +
          [-1, 0, 1].map(t => `<circle cx="${r(fx + t * rx * .19)}" cy="${r(fy + h * .5)}" r="${r(rx * .08)}" fill="var(--pc-l)"/>`).join('');
      }).join('');
  },
  belly: P => {
    const [x, y, rx, ry] = P.belly, r = petR1;
    return `<ellipse cx="${x + 1.2}" cy="${y + 1.5}" rx="${rx}" ry="${ry}" fill="var(--pc-l2)"/><ellipse cx="${x - .5}" cy="${y - .5}" rx="${rx - 1.5}" ry="${ry - 1.5}" fill="var(--pc-l)"/>` +
      `<ellipse cx="${r(x - rx * .3)}" cy="${r(y - ry * .38)}" rx="${r(rx * .38)}" ry="${r(ry * .22)}" transform="rotate(-25 ${r(x - rx * .3)} ${r(y - ry * .38)})" fill="var(--pc-l3)"/>`;
  },
  head: P => {
    const s = P.plate;
    return '<ellipse cy="33" rx="22" ry="6" fill="var(--pc-b3)" opacity=".35"/>' +
      petAt(-18, -24, -30, petR1(s * .82), petPlate) + petAt(18, -24, 30, petR1(s * .82), petPlate) + petAt(0, -29, 0, petR1(s * 1.05), petPlate) +
      '<ellipse cy="3" rx="46" ry="35" fill="var(--pc-b2)"/><ellipse cx="-1.5" cy=".5" rx="44" ry="33" fill="var(--pc-b)"/>' +
      petHi(-15, -16, 17, 9, -20, .22) + petHi(-25, -19, 5, 3, -30, .55) +
      '<ellipse cx="21" cy="-20" rx="5.5" ry="4" fill="var(--pc-b2)"/><ellipse cx="32" cy="-8" rx="3.6" ry="2.8" fill="var(--pc-b2)"/>' +
      '<ellipse cx="10" cy="-27" rx="3.4" ry="2.4" fill="var(--pc-b2)"/>' +
      '<ellipse cx="1" cy="17.5" rx="27" ry="13.5" fill="var(--pc-l2)"/><ellipse cx="-.5" cy="16.3" rx="26" ry="12.4" fill="var(--pc-l)"/>' +
      petHi(-10, 10, 7, 3, -10, .7) + '<ellipse cx="-7" cy="8.5" rx="2.4" ry="1.7" fill="var(--pc-l2)"/><ellipse cx="7" cy="8.5" rx="2.4" ry="1.7" fill="var(--pc-l2)"/>';
  },
  cheeks: PET_RIG.dragon.cheeks,
};
// <<< dino

// >>> bird (yellow and round, orange beak and feet, a feather tuft, wings for arms, a fan tail; the egg sits in a nest)
// the beak is the mouth: closed, or open by o units with the inside and the tongue showing
const birdBeak = o => {
  const r = petR1, lo = o ? petVol(`M-8 ${r(11 + o)}C-5 ${r(20 + o)} 5 ${r(20 + o)} 8 ${r(11 + o)}C4 ${r(13.5 + o)}-4 ${r(13.5 + o)}-8 ${r(11 + o)}Z`,
    `M-7.5 ${r(10.5 + o)}C-5 ${r(18.5 + o)} 4 ${r(18.5 + o)} 7 ${r(10.5 + o)}C4 ${r(13 + o)}-4 ${r(13 + o)}-7.5 ${r(10.5 + o)}Z`, 'x') +
    `<ellipse cy="${r(11 + o * .55)}" rx="7.5" ry="${r(o * .55 + 2)}" fill="var(--pc-e)"/><ellipse cx="1" cy="${r(12 + o * .75)}" rx="4.4" ry="${r(Math.min(o * .3 + 1, 3.4))}" fill="var(--pc-t)"/>`
    : petVol('M-7 11C-4 18 4 18 7 11Z', 'M-6.5 10.5C-4 16.5 3.5 16.5 6 10.5Z', 'x');
  return lo + petVol('M-11 6C-7 0 7 0 11 6C9 11 4 14 0 15.5C-4 14-9 11-11 6Z', 'M-10.5 5C-7-.5 6 0 9.5 4.5C7.5 9 3.5 12-.5 13.5C-4.5 12-8.5 9-10.5 5Z', 'x') +
    petHi(-4, 4.2, 4.5, 1.6, -8, .65);
};
const birdFace = {};
for (const m of PET_MOODS) birdFace[m] = [PET_FACE[m][0], birdBeak({ happy: 5, cheer: 9, hungry: 7 }[m] || 0) +
  (m == 'hungry' ? '<path d="M-5 26q-2.5 5 0 7q2.5-2 0-7Z" fill="var(--pc-d)"/>' : '')];
// one feather pointing up from (0, 0), about 26 long, tip leaning right
const birdFeather = '<path d="M-7.5 1C-10-9-6-20 3-27C8-18 9.5-8 7.5 1Z" fill="var(--pc-b)"/><path d="M3-27C8-18 9.5-8 7.5 1L2.5 1C4-8 4.5-18 3-27Z" fill="var(--pc-b2)"/>' +
  petGl('M-3.5-3C-4.5-9-3-15 0-19', 2.2, .55);
PET_RIG.bird = {
  stages: {
    egg: { egg: 1, head: [100, 116, .6], sh: 50, hat: [100, 66, .68, -8], toy: [146, 158, .6, 10] },
    baby: { body: [100, 158, 26, 24], belly: [100, 163, 17, 15], head: [100, 106, .97], crest: .62, arm: [78, 145, .62],
      wing: [80, 150, 1], tail: [118, 174, .62], sh: 34, hat: [100, 73, .74, -6], toy: [132, 160, .58, 10] },
    kid: { body: [100, 150, 30, 30], belly: [100, 156, 20, 20], head: [100, 91, 1.02], crest: .85, arm: [73, 135, .8],
      wing: [80, 140, 1], tail: [124, 172, .85], sh: 40, hat: [100, 57, .82, -6], toy: [137, 154, .66, 10] },
    grown: { body: [100, 139, 36, 40], belly: [100, 147, 24, 28], head: [100, 77, 1.05], crest: 1.15, arm: [66, 117, 1.02],
      wing: [80, 130, 1], tail: [130, 166, 1.2], sh: 48, hat: [100, 42, .9, -6], toy: [147, 146, .76, 10] },
  },
  // a speckled egg sitting in a straw nest
  egg: '<path d="M50 152C52 140 148 140 150 152Z" fill="var(--pc-n2)"/>' + petShell(38, 47, 118) +
    [[84, 96, 2.6], [110, 88, 2], [122, 112, 3], [80, 128, 2.2], [104, 136, 2.8], [126, 140, 2], [96, 112, 1.6], [70, 112, 1.8]].map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--pc-n)"/>`).join('') + petHi(82, 96, 8, 15, 22, .75) + petHi(90, 78, 3.5, 2.6, 0, .9) +
    petVol('M44 148C48 170 72 184 100 184C128 184 152 170 156 148C140 158 122 162 100 162C78 162 60 158 44 148Z',
      'M45 146C50 166 72 180 99 180C126 180 148 166 153 146C138 155 120 158 99 158C78 158 60 155 45 146Z', 'n') +
    '<path d="M56 160C70 168 86 170 100 170M60 168C74 175 92 176 112 174M120 168C132 166 142 162 148 156M88 162C104 164 122 162 138 158" fill="none" stroke="var(--pc-n3)" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>',
  wing: '',
  // a fan of three feathers, root at (0, 0), spreading up and to the right
  tail: petVol('M0-7C8-15 19-24 29-25C34-25 35-20 32-17C37-17 39-12 35-9C39-7 39-2 34 0C25 4 11 7 0 7Z',
    'M0-7C8-15 19-23 28-24C32-24 33-20 30-17.5C34-17 36-13 33-10C36-8 36-4 32-2.5C24 1 11 3 0 3Z', 'b') +
    '<path d="M10-4C17-8 23-13 28-18M12 0C20-2 27-6 32-9" fill="none" stroke="var(--pc-b2)" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>' +
    petGl('M5-8C12-14 19-19 25-21', 2.2, .45),
  // a wing for an arm: shoulder at (0, 0), feather tips at the bottom
  arm: petVol('M5-5C-5-7-15 2-18 14C-20 22-17 30-12 33C-11 29-8 28-6 30C-5 26-2 25 0 27C1 20 6 8 5-5Z',
    'M3-6C-6-7-14 1-16 12C-17 19-15 25-11 28C-10 25-7 24-5 26C-4 22-2 21 0 22C1 16 4 6 3-6Z', 'b') +
    '<path d="M-9 8C-12 13-13 18-12 23M-4 9C-6 14-6 18-5 22" fill="none" stroke="var(--pc-b2)" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>' +
    petGl('M-1-2C-7 0-11 5-12 11', 2.2, .4),
  body: P => {
    const [x, y, rx, ry] = P.body, r = petR1;
    return `<path d="${petBlob(x, y, rx, ry)}" fill="var(--pc-b2)"/><path d="${petBlob(x - 1.5, y - 2.5, rx - 2, ry - 2.5)}" fill="var(--pc-b)"/>` +
      petHi(r(x - rx * .5), r(y - ry * .3), r(rx * .2), r(ry * .34), 20, .25) +
      [-1, 1].map(s => {
        const fx = r(x + s * rx * .36), fy = r(y + ry - 1), t = r(rx * .15);
        return [-1, 0, 1].map(k => {
          const cx = r(fx + k * t * 1.15), a = k * 28;
          return `<ellipse cx="${r(cx + .8)}" cy="${r(fy + .8)}" rx="${r(t * .72)}" ry="${r(t * 1.25)}" transform="rotate(${a} ${r(cx + .8)} ${r(fy + .8)})" fill="var(--pc-x2)"/>` +
            `<ellipse cx="${cx}" cy="${fy}" rx="${r(t * .6)}" ry="${r(t * 1.1)}" transform="rotate(${a} ${cx} ${fy})" fill="var(--pc-x)"/>`;
        }).join('');
      }).join('');
  },
  belly: P => {
    const [x, y, rx, ry] = P.belly, r = petR1;
    return `<ellipse cx="${x + 1.2}" cy="${y + 1.5}" rx="${rx}" ry="${ry}" fill="var(--pc-l2)"/><ellipse cx="${x - .5}" cy="${y - .5}" rx="${rx - 1.5}" ry="${ry - 1.5}" fill="var(--pc-l)"/>` +
      [[-.3, -.2], [.3, -.2], [0, .25], [-.45, .3], [.45, .3]].map(([a, b]) => {
        const cx = r(x + a * rx), cy = r(y + b * ry), w = r(rx * .16);
        return `<path d="M${r(cx - w)} ${cy}Q${cx} ${r(cy + w * 1.1)} ${r(cx + w)} ${cy}" fill="none" stroke="var(--pc-l2)" stroke-width="2.2" stroke-linecap="round"/>`;
      }).join('') + petHi(r(x - rx * .35), r(y - ry * .5), r(rx * .3), r(ry * .16), -25, .8);
  },
  head: P => {
    const c = P.crest;
    return '<ellipse cy="33" rx="20" ry="6" fill="var(--pc-b3)" opacity=".3"/>' +
      [[-22, .8], [24, .78], [0, 1.08]].map(([a, s]) => petAt(a * .3, -31, a, petR1(c * s), birdFeather)).join('') +
      '<ellipse cy="2" rx="41" ry="37" fill="var(--pc-b2)"/><ellipse cx="-1.5" cy="-.5" rx="39" ry="35" fill="var(--pc-b)"/>' +
      petHi(-14, -17, 16, 9, -20, .3) + petHi(-23, -20, 5, 3, -30, .6);
  },
  face: birdFace,
  cheeks: [-28, 28].map(x => `<ellipse cx="${x}" cy="10" rx="6.5" ry="4.2" fill="var(--pc-ck)" opacity=".9"/><ellipse cx="${x}" cy="10.5" rx="4.6" ry="2.8" fill="var(--pc-t)" opacity=".3"/>`).join(''),
};
// <<< bird

// >>> ocean (sea pal: a little aqua whale with a white chin and belly, blue fins, light spots and a tail fluke)
// a fin standing on (0, 0), about 20 high, leaning back to the right
const seaFin = petVol('M-9 2C-7-10 2-20 13-22C9-14 9-6 10 2Z', 'M-8 0C-6-10 2-18 10.5-19.5C7-13 7-6 8 0Z', 'p') + petGl('M-4-3C-2-9 2-13 6-16', 2, .45);
PET_RIG.ocean = {
  stages: {
    egg: { egg: 1, head: [100, 126, .66], sh: 40, hat: [100, 72, .72, -8], toy: [148, 162, .62, 10] },
    baby: { body: [100, 157, 27, 25], belly: [100, 162, 17, 16], head: [100, 102, .96], fin: .62, arm: [79, 146, .7],
      wing: [80, 150, 1], tail: [114, 172, .6], sh: 36, hat: [100, 71, .74, -6], toy: [133, 162, .6, 10] },
    kid: { body: [100, 148, 31, 32], belly: [100, 154, 20, 21], head: [100, 84, 1.02], fin: .85, arm: [73, 136, .88],
      wing: [80, 140, 1], tail: [118, 170, .86], sh: 42, hat: [100, 51, .82, -6], toy: [138, 155, .68, 10] },
    grown: { body: [100, 138, 38, 42], belly: [100, 146, 25, 29], head: [100, 70, 1.06], fin: 1.1, arm: [65, 121, 1.1],
      wing: [80, 130, 1], tail: [124, 164, 1.26], sh: 52, hat: [100, 35, .9, -6], toy: [148, 148, .78, 10] },
  },
  // an aqua egg with white waves and two bubbles
  egg: petShell(45, 55, 124) +
    [96, 132, 160].map(y => `<path d="M${y == 132 ? 56 : 60} ${y}q8-7 16 0t16 0t16 0t16 0t16 0" fill="none" stroke="var(--pc-l)" stroke-width="4.5" stroke-linecap="round" opacity=".85"/>`).join('') +
    petShellHi + [[150, 92, 6], [158, 72, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--pc-b1)" opacity=".8"/>` +
      `<circle cx="${x - r * .35}" cy="${y - r * .35}" r="${petR1(r * .35)}" fill="var(--pc-w)"/>`).join(''),
  wing: '',
  // the tail: a stalk curling up behind on the right, ending in a two-lobed fluke
  tail: petVol('M0-9C14-9 24-12 30-24L39-20C35-4 18 10 0 10Z', 'M0-9C14-9 23-13 29-24L35-22C31-8 16 4 0 4Z', 'b') +
    petAt(34, -22, -20, 1, petVol('M0 2C-6-6-16-10-26-9C-20-4-14 2-12 8C-6 6-2 4 0 2ZM0 2C2-8 2-18-4-26C2-26 14-20 20-10C14-8 6-4 0 2Z',
      'M-1 0C-6-6-15-9-23-8.5C-18-4-13 1-11 6C-6 4-3 2-1 0ZM-1 0C1-8 0-16-4-23C2-22 11-17 16-10C11-8 5-4-1 0Z', 'p')) +
    petGl('M4-5C14-5 21-8 26-16', 2.4, .3),
  // a flipper, shoulder at (0, 0)
  arm: petVol('M6-4C-4-4-14 4-18 15C-20 22-17 27-12 26C-6 24 0 15 7 2Z', 'M5-5C-4-5-13 3-16.5 13C-18 19-15.5 23-11.5 22C-6 20-1 13 5.5 0Z', 'p') +
    petGl('M0-1C-6 2-11 8-13 14', 2.2, .4),
  body: P => {
    const [x, y, rx, ry] = P.body, r = petR1;
    return `<path d="${petBlob(x, y, rx, ry)}" fill="var(--pc-b2)"/><path d="${petBlob(x - 1.5, y - 2.5, rx - 2, ry - 2.5)}" fill="var(--pc-b)"/>` +
      petHi(r(x - rx * .5), r(y - ry * .3), r(rx * .2), r(ry * .34), 20, .25) +
      [[-.78, -.1, .07], [-.66, -.42, .05], [.74, -.3, .06], [.8, .06, .045]].map(([a, b, s]) =>
        `<circle cx="${r(x + a * rx)}" cy="${r(y + b * ry)}" r="${r(rx * s)}" fill="var(--pc-b1)"/>`).join('') +
      // flipper feet, pointing out
      [-1, 1].map(s => {
        const fx = r(x + s * rx * .52), fy = y + ry - 2.5, w = r(rx * .44), h = r(rx * .22), a = s * 10;
        return `<ellipse cx="${fx + 1}" cy="${fy + 1}" rx="${w}" ry="${h}" transform="rotate(${a} ${fx + 1} ${fy + 1})" fill="var(--pc-p2)"/>` +
          `<ellipse cx="${r(fx - .5)}" cy="${r(fy - .8)}" rx="${r(w - 1.2)}" ry="${r(h - 1)}" transform="rotate(${a} ${r(fx - .5)} ${r(fy - .8)})" fill="var(--pc-p)"/>` +
          petHi(r(fx - w * .3), r(fy - h * .35), r(w * .35), r(h * .25), a, .4);
      }).join('');
  },
  belly: P => {
    const [x, y, rx, ry] = P.belly, r = petR1;
    return `<ellipse cx="${x + 1.2}" cy="${y + 1.5}" rx="${rx}" ry="${ry}" fill="var(--pc-l2)"/><ellipse cx="${x - .5}" cy="${y - .5}" rx="${rx - 1.5}" ry="${ry - 1.5}" fill="var(--pc-l)"/>` +
      [-.4, 0, .4].map(f => `<path d="M${r(x + rx * f)} ${r(y - ry * .45)}Q${r(x + rx * f * 1.2)} ${y} ${r(x + rx * f)} ${r(y + ry * .55)}" fill="none" stroke="var(--pc-l2)" stroke-width="2.2" stroke-linecap="round"/>`).join('');
  },
  head: P => {
    const f = P.fin, ear = petAt(-39, 0, -84, petR1(f * .85), seaFin);
    return '<ellipse cy="33" rx="22" ry="6" fill="var(--pc-b3)" opacity=".35"/>' + petAt(-2, -30, 0, petR1(f * 1.15), seaFin) +
      ear + `<g transform="scale(-1 1)">${ear}</g>` +
      '<ellipse cy="2" rx="43" ry="36" fill="var(--pc-b2)"/><ellipse cx="-1.5" cy="-.5" rx="41" ry="34" fill="var(--pc-b)"/>' +
      petHi(-14, -17, 17, 9, -20, .25) + petHi(-23, -20, 5, 3, -30, .55) +
      '<circle cx="15" cy="-24" r="2.8" fill="var(--pc-b1)"/><circle cx="25" cy="-16" r="2.2" fill="var(--pc-b1)"/><circle cx="24" cy="-27" r="1.8" fill="var(--pc-b1)"/>' +
      '<ellipse cx="1" cy="18.5" rx="29" ry="15" fill="var(--pc-l2)"/><ellipse cx="-.5" cy="17.3" rx="28" ry="13.8" fill="var(--pc-l)"/>' + petHi(-10, 11, 8, 3, -10, .7);
  },
  cheeks: PET_RIG.dragon.cheeks,
};
// <<< ocean

// stage name for a stage() number or a name (unknown -> 'kid')
const petStageName = st => typeof st == 'number' ? PET_STAGES[Math.max(0, Math.min(st, 3))] : PET_STAGES.includes(st) ? st : 'kid';

// {x, y, s, r} of an anchor ('hat' or 'toy') for a pet and stage, in viewBox units
function petAnchor(kind, st, name) {
  const a = (PET_RIG[kind] || PET_RIG.dragon).stages[petStageName(st)][name];
  return { x: a[0], y: a[1], s: a[2], r: a[3] };
}

// a hat or toy at its anchor: SVG markup (64x64 grid, P4-07) or an emoji as text
function petWear(slot, item, a) {
  if (!item) return '';
  const [x, y, s, r] = a;
  if (item[0] == '<') return `<g class="pw-${slot}" transform="translate(${x} ${y}) rotate(${r}) scale(${s}) translate(-32 -${slot == 'hat' ? 60 : 32})">${item}</g>`;
  const fs = petR1(64 * s * .75);
  return `<text class="pw-${slot}" transform="translate(${x} ${y}) rotate(${r})" y="${slot == 'hat' ? petR1(-fs * .42) : 0}" font-size="${fs}" ` +
    `text-anchor="middle" dominant-baseline="central">${esc(item)}</text>`;
}

function petSVG(kind, st = 2, mood = 'idle', o = {}) {
  const k = PET_RIG[kind] ? kind : 'dragon', K = PET_RIG[k], sn = petStageName(st), P = K.stages[sn];
  const sup = o.super != null ? !!o.super : st === 4, md = PET_FACE[mood] ? mood : 'idle', F = K.face || PET_FACE;
  const face = (m, c) => `<g class="pf ${c}"><g class="pg-eyes">${F[m][0]}</g><g class="pg-mouth">${F[m][1]}</g></g>`;
  const at = (a, flip) => `translate(${a[0]} ${a[1]}) scale(${flip ? -a[2] : a[2]} ${a[2]})`;
  const org = a => `style="transform-origin:${a[0]}px ${a[1]}px"`;
  const head = `<g class="pg-head" ${org(P.head)}><g transform="${at(P.head)}">${P.egg ? '' : K.head(P)}<g class="pg-cheeks">${K.cheeks}</g>` +
    face(md, 'pf-base') + (o.react ? face('cheer', 'pf-cheer') + face('oops', 'pf-oops') : '') + `</g>${petWear('hat', o.hat, P.hat)}</g>`;
  const toy = petWear('toy', o.toy, P.toy);
  let fig;
  if (P.egg) fig = `<g class="pg-body">${K.egg}</g>${head}<g class="pg-arm-r">${toy}</g>`;
  else {
    const R = [200 - P.arm[0], P.arm[1], P.arm[2]], W = [200 - P.wing[0], P.wing[1], P.wing[2]];
    fig = `<g class="pg-extra"><g class="pg-xl" ${org(P.wing)}><g transform="${at(P.wing)}">${K.wing}</g></g>` +
      `<g class="pg-xr" ${org(W)}><g transform="${at(W, 1)}">${K.wing}</g></g></g>` +
      `<g class="pg-tail" ${org(P.tail)}><g transform="${at(P.tail)}">${K.tail}</g></g>` +
      `<g class="pg-body">${K.body(P)}</g><g class="pg-belly">${K.belly(P)}</g>` +
      `<g class="pg-arm-l" ${org(P.arm)}><g transform="${at(P.arm)}">${K.arm}</g></g>` +
      `<g class="pg-arm-r" ${org(R)}><g transform="${at(R, 1)}">${K.arm}</g>${toy}</g>` + head;
  }
  const label = typeof PETS != 'undefined' && PETS[k] ? PETS[k].n : k;
  return `<svg class="pet-svg pet-k-${k} pet-s-${sn} pet-m-${md}${sup ? ' pet-super' : ''}${o.cls ? ' ' + o.cls : ''}" viewBox="0 0 200 200" ` +
    `role="img" aria-label="${label}">${sup ? PET_GLOW : ''}<ellipse class="pg-shadow" cx="100" cy="185" rx="${P.sh}" ry="6" fill="var(--pc-sd)"/>` +
    `<g class="pg-fig">${fig}</g></svg>`;
}

// ---- hooks used by the screens (05-pets.js petAura, 42-paths.js petHTML, 46-home.js setup, 50-round.js growShow) ----
const petRig = (kind = S.pet) => !!PET_RIG[kind]; // true for every pet in PETS since P4-06

// mood from the pet care meters (56-petcare.js): hungry < sleepy (dirty or bored) < happy (all meters 80+) < idle
function petMood(c) {
  c = c || careTick();
  if (c.food < 30) return 'hungry';
  if (c.clean < 30 || c.fun < 30) return 'sleepy';
  return Math.min(c.food, c.clean, c.fun) >= 80 ? 'happy' : 'idle';
}

// the child's pet as petHTML() draws it, with today's wearables and the cheer / oops reaction faces
function petRigHTML(st = S.stars, mood) {
  const w = S.wear || {};
  return `<span class="petwrap">${petSVG(S.pet, stage(st), mood || petMood(), { hat: w.hat, toy: w.toy, react: true })}</span>`;
}

// the bare pet (no wearables), e.g. the growing egg
const petArt = (st = S.stars) => petSVG(S.pet, stage(st), 'idle');
// the pet choice at setup: grown and happy
const petPick = kind => petSVG(kind, 'grown', 'happy');
