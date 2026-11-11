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
     t tongue, ck cheeks, d drops, gl / gl2 glow, sd shadow). Motion is CSS on the groups (41-pet.css).
   A new pet (P4-06): add PET_RIG.<kind> with the same stage keys and parts, and a .pet-k-<kind> palette in 41-pet.css.
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
const petRig = (kind = S.pet) => !!PET_RIG[kind]; // pets not on the rig yet keep their emoji (P4-06 converts them)

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

// the bare pet (no wearables), e.g. the growing egg: drawing for rig pets, emoji for the others
const petArt = (st = S.stars) => petRig() ? petSVG(S.pet, stage(st), 'idle') : petE(st);
// the pet choice at setup: grown and happy
const petPick = kind => petRig(kind) ? petSVG(kind, 'grown', 'happy') : PETS[kind].s[3];
