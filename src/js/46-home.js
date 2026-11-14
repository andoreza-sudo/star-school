/* Grade picker (setup and Grown-ups): 8 big buttons, one per grade. Tapping reads the grade aloud and calls onPick(g). */
function gradePickHTML(sel){
  return`<div class="grades" role="radiogroup" aria-label="Grade">${GRADES.map(g=>`<button class="btn gr ${g==sel?'sel':''}" role="radio" aria-checked="${g==sel}" data-g="${g}">${gradeLabel(g)}</button>`).join('')}</div>`}
function gradePickBind(onPick){
  $$('.gr').forEach(b=>b.onclick=()=>{const g=+b.dataset.g;
    $$('.gr').forEach(x=>{x.classList.toggle('sel',x==b);x.setAttribute('aria-checked',x==b)});
    say(gradeSpoken(g),b);SFX.pop(1);onPick(g)})}
/* Setup, first run (P4-12, DESIGN_SYSTEM 9 row 1): the logo, a speaker that reads the steps, then three numbered steps on drawn
   cards (name, pet egg, grade) and the big "Let's go!". A step's number turns into a tick once it is done. Styles in
   src/css/48-setup-grown-care.css. Ids and classes kept: #nm, #pn, #go, .petopt[data-p] (first span = the pet), .gr[data-g]. */
const SU_SAY = "Hi! Type your name. Pick a pet egg to hatch. Tap your grade. Then tap Let's go!";
function suStep(n, icon, title, sub, body) {
  return `<section class="su-step" data-step="${n}"><h2 class="su-h"><span class="su-n" aria-hidden="true"><b>${n}</b>${ico('check', 22)}</span>` +
    `<span class="su-hi">${ico(icon, 24)}</span><span>${title}</span></h2>${sub ? `<p class="su-sub">${sub}</p>` : ''}${body}</section>`;
}
// A text field drawn as a white well with an icon (setup and Grown-ups). Attributes in attrs (id, value, placeholder) are escaped by the caller.
const fldHTML = (icon, attrs) => `<label class="fld">${ico(icon, 24)}<input ${attrs} autocomplete="off"></label>`;
function setup() {
  let pet = S.pet, grade = gradeOf();
  const pets = Object.entries(PETS).map(([k, p]) => `<button class="btn petopt gx-pet ${k == pet ? 'sel' : ''}" data-p="${k}" aria-pressed="${k == pet}">` +
    `<span class="gx-pp">${petPick(k)}</span><b>${p.n}</b></button>`).join('');
  view(`<div class="center setup su"><header class="su-top"><h1 class="gx-logo su-logo"><span class="hm-mark su-mark">${ico('star', 36)}</span><span>Star School</span></h1>` +
    `<p class="su-hello">Hi! Let's get you ready.<span> A grown-up can help.</span></p>${UI.ibtn('speak', 'Hear the steps', { id: 'suspk' })}` +
    `${PRF.many() ? UI.ibtn('back', 'Back to who is playing', { id: 'suback', size: 'sm' }) : ''}</header>` +
    `<div class="su-grid">` +
    suStep(1, 'user', "What's your name?", '', fldHTML('edit', `id="nm" value="${esc(S.name)}" placeholder="Your name" aria-label="Your name"`)) +
    suStep(2, 'paw', 'Pick a pet egg to hatch!', '', `<div class="pets su-pets">${pets}</div>` +
      fldHTML('paw', `id="pn" value="${esc(S.petName)}" placeholder="Name your pet (${PETS[pet].def})" aria-label="Your pet's name"`)) +
    suStep(3, 'calendar', 'What grade?', 'Grown-ups can change this later.', gradePickHTML(grade)) +
    UI.btn("Let's go!", { kind: 'primary', size: 'lg', icon: 'rocket', id: 'go' }) + '</div></div>');
  const ok = (n, on) => { const s = $(`.su-step[data-step="${n}"]`); if (s) s.classList.toggle('ok', !!on); };
  const nameOk = () => ok(1, $('#nm').value.trim());
  nameOk();
  $('#nm').oninput = nameOk;
  $('#suspk').onclick = e => say(SU_SAY, e.currentTarget);
  if ($('#suback')) $('#suback').onclick = PRF.cancelNew; // P5-10: a new child who changes their mind goes away again
  gradePickBind(g => { grade = g; ok(3, 1); });
  $$('.petopt').forEach(b => b.onclick = () => {
    pet = b.dataset.p;
    $$('.petopt').forEach(x => { x.classList.toggle('sel', x == b); x.setAttribute('aria-pressed', x == b); });
    ok(2, 1);
    $('#pn').placeholder = `Name your pet (${PETS[pet].def})`;
    SFX.giggle();
    anim(b.querySelector('span'), 'jump');
  });
  $('#go').onclick = () => {
    const n = $('#nm').value.trim();
    if (!n) { fb('Type your name first!', 'warn'); SFX.wrong(); $('#nm').focus(); return; }
    S.name = n; S.pet = pet; S.petName = $('#pn').value.trim(); setGrade(grade); SFX.magic(); home(true);
  };
}

/* ---------- Home (P4-08; DESIGN_SYSTEM.md 9 row 2; styles in src/css/46-home.css) ----------
   Top bar (logo, sound, grown-ups gear), hero card (the pet on a drawn scene, name, grow meter, today's mission, stat chips),
   the "Find my level" card, a Today row (review, Fact Sprint, Mixed Practice), one illustrated card per path, the Game Room
   card, a row of secondary actions and the version label. Every button keeps the id it had before P4-08. */

// Drawn pictures for Home (64x64 grid, light from the top left, colours from the --ill-* tokens).
const HM_C = h => `var(--ill-${h})`;
const hmR = n => Math.round(n * 10) / 10;
// A toy block in 3/4 view with a number on its front: x, y = front top-left, s = size, h = hue name
function hmBlock(x, y, s, h, n) {
  const d = hmR(s * .27), r = hmR;
  return `<path fill="${HM_C(h + '-2')}" d="M${r(x + s)} ${r(y)}L${r(x + s + d)} ${r(y - d)}V${r(y + s - d)}L${r(x + s)} ${r(y + s)}Z"/>` +
    `<path fill="${HM_C(h + '-1')}" d="M${r(x)} ${r(y)}L${r(x + d)} ${r(y - d)}H${r(x + s + d)}L${r(x + s)} ${r(y)}Z"/>` +
    `<rect fill="${HM_C(h)}" x="${r(x)}" y="${r(y)}" width="${r(s)}" height="${r(s)}" rx="1.5"/>` +
    `<rect fill="${HM_C('white')}" opacity=".45" x="${r(x + 2.5)}" y="${r(y + 2.5)}" width="${r(s * .34)}" height="2.6" rx="1.3"/>` +
    `<text x="${r(x + s / 2 + 1)}" y="${r(y + s * .8 + 1)}" fill="${HM_C(h + '-3')}" font-size="${r(s * .74)}">${n}</text>` +
    `<text x="${r(x + s / 2)}" y="${r(y + s * .8)}" fill="${HM_C('white')}" font-size="${r(s * .74)}">${n}</text>`;
}
const HM_ART = {
  // three toy number blocks
  math: () => hmBlock(5, 35, 22, 'blue', 1) + hmBlock(30, 35, 22, 'red', 3) + hmBlock(17, 13, 22, 'yellow', 2),
  // an open book with a ribbon
  read: () =>
    `<path fill="${HM_C('pink-3')}" d="M32 22C24 16.5 13 15.5 3.5 17.5V53C13 51 24 52 32 57C40 52 51 51 60.5 53V17.5C51 15.5 40 16.5 32 22Z"/>` +
    `<path fill="${HM_C('pink-2')}" d="M32 20C24 14.5 13 13.5 4.5 15.5V50C13 48.5 24 49.5 32 54C40 49.5 51 48.5 59.5 50V15.5C51 13.5 40 14.5 32 20Z"/>` +
    `<path fill="${HM_C('white')}" d="M32 18C24.5 13 15 12 7 13.5V47C15 46 24.5 47 32 51.5Z"/>` +
    `<path fill="${HM_C('white-2')}" d="M32 18C39.5 13 49 12 57 13.5V47C49 46 39.5 47 32 51.5Z"/>` +
    `<path fill="none" stroke="${HM_C('grey-1')}" stroke-width="2.2" stroke-linecap="round" d="M11.5 20.5C17 19.6 22.5 20.3 27.5 22.6` +
    `M11.5 27C17 26.1 22.5 26.8 27.5 29.1M11.5 33.5C17 32.6 22.5 33.3 27.5 35.6M11.5 40C15.5 39.4 18.5 39.6 21.5 40.6"/>` +
    `<path fill="none" stroke="${HM_C('white-3')}" stroke-width="2.2" stroke-linecap="round" d="M36.5 29.1C41.5 26.8 47 26.1 52.5 27` +
    `M36.5 35.6C41.5 33.3 47 32.6 52.5 33.5M36.5 42.1C41.5 39.8 45 39.4 48.5 39.8"/>` +
    `<path fill="none" stroke="${HM_C('white-3')}" stroke-width="1.6" d="M32 18.5V51"/>` +
    `<path fill="${HM_C('red')}" d="M41 14.2H47.5V27.5L44.3 24.6L41 27.5Z"/>` +
    `<path fill="${HM_C('yellow')}" stroke="${HM_C('yellow')}" stroke-width="1.2" stroke-linejoin="round" d="M12 3.5L13.6 7L17.4 7.4L14.6 9.9L15.4 13.6L12 11.7L8.6 13.6L9.4 9.9L6.6 7.4L10.4 7Z"/>`,
  // two speech bubbles: "¡Hola!" and a little reply
  es: () =>
    `<rect fill="${HM_C('yellow-2')}" x="31" y="33" width="29" height="21" rx="9"/>` +
    `<path fill="${HM_C('yellow-2')}" d="M51 51L57 59L45 52Z"/>` +
    `<rect fill="${HM_C('yellow')}" x="30" y="32" width="28" height="19.5" rx="8.5"/>` +
    `<path fill="${HM_C('yellow')}" d="M49.5 49L55.5 57L43.5 50Z"/>` +
    `<circle fill="${HM_C('yellow-3')}" cx="38" cy="42.5" r="2.3"/><circle fill="${HM_C('yellow-3')}" cx="45" cy="42.5" r="2.3"/>` +
    `<circle fill="${HM_C('yellow-3')}" cx="52" cy="42.5" r="2.3"/>` +
    `<rect fill="${HM_C('green-3')}" x="4.5" y="8" width="47" height="30" rx="11"/>` +
    `<path fill="${HM_C('green-3')}" d="M14 35L10.5 47L24 36Z"/>` +
    `<rect fill="${HM_C('green-2')}" x="3.5" y="6.5" width="46" height="29" rx="10.5"/>` +
    `<path fill="${HM_C('green-2')}" d="M13 33L9.5 45L23 34Z"/>` +
    `<rect fill="${HM_C('green')}" x="3.5" y="6.5" width="44" height="26.5" rx="10"/>` +
    `<rect fill="${HM_C('green-1')}" opacity=".7" x="9" y="9.5" width="16" height="3" rx="1.5"/>` +
    `<text x="25.5" y="27" fill="${HM_C('white')}" font-size="14.5">¡Hola!</text>`,
  // a magnifying glass over a green leaf, with a little star (Discover, P2-36)
  disc: () =>
    `<path fill="${HM_C('green-2')}" d="M6 52C4 38 12 24 28 20C32 36 24 50 6 52Z"/>` +
    `<path fill="${HM_C('green')}" d="M6 50C5 38 12 26 26 22C29 36 22 47 6 50Z"/>` +
    `<path fill="none" stroke="${HM_C('green-3')}" stroke-width="1.6" stroke-linecap="round" d="M7 50C13 42 19 33 24 25"/>` +
    `<path fill="none" stroke="${HM_C('brown-2')}" stroke-width="7" stroke-linecap="round" d="M43 43L56 56"/>` +
    `<path fill="none" stroke="${HM_C('brown-1')}" stroke-width="3" stroke-linecap="round" d="M43.5 42.5L55 54"/>` +
    `<circle fill="${HM_C('aqua-1')}" opacity=".85" cx="33" cy="30" r="15.5"/>` +
    `<circle fill="none" stroke="${HM_C('blue-2')}" stroke-width="4.5" cx="33" cy="30" r="15.5"/>` +
    `<path fill="none" stroke="${HM_C('white')}" stroke-width="2.6" stroke-linecap="round" d="M23.5 26C25 21.5 29 18.5 33.5 18.3"/>` +
    `<path fill="${HM_C('yellow')}" stroke="${HM_C('yellow')}" stroke-width="1.2" stroke-linejoin="round" d="M50 5L52 9.8L57 10.3L53.2 13.6L54.4 18.5L50 16L45.6 18.5L46.8 13.6L43 10.3L48 9.8Z"/>`,
  // a game controller
  play: () => {
    const body = 'M18 20H46C54.5 20 58.5 27 60 37L61 45.5C61.6 52.5 55 56.5 50 51.5L44.5 46H19.5L14 51.5C9 56.5 2.4 52.5 3 45.5L4 37C5.5 27 9.5 20 18 20Z';
    return `<path fill="${HM_C('orange-3')}" transform="translate(1.2 2.2)" d="${body}"/>` +
      `<path fill="${HM_C('orange')}" d="${body}"/>` +
      `<path fill="none" stroke="${HM_C('orange-1')}" stroke-width="2.6" stroke-linecap="round" d="M9 31C10.5 26 13.5 23.5 18 23.5H24"/>` +
      `<rect fill="${HM_C('ink-2')}" x="15.5" y="28" width="6" height="17" rx="1.6"/>` +
      `<rect fill="${HM_C('ink-2')}" x="10" y="33.5" width="17" height="6" rx="1.6"/>` +
      `<circle fill="${HM_C('yellow')}" cx="46" cy="28.5" r="3.6"/><circle fill="${HM_C('red')}" cx="52.5" cy="35" r="3.6"/>` +
      `<circle fill="${HM_C('blue')}" cx="46" cy="41.5" r="3.6"/><circle fill="${HM_C('green')}" cx="39.5" cy="35" r="3.6"/>` +
      `<circle fill="${HM_C('white')}" opacity=".6" cx="45" cy="27.4" r="1.2"/><circle fill="${HM_C('white')}" opacity=".6" cx="51.5" cy="33.9" r="1.2"/>` +
      `<circle fill="${HM_C('white')}" opacity=".6" cx="45" cy="40.4" r="1.2"/><circle fill="${HM_C('white')}" opacity=".6" cx="38.5" cy="33.9" r="1.2"/>`;
  },
  // Puzzle of the Day (P3-17): a calendar page with a purple top and two rings, a yellow puzzle piece on it
  pod: () => {
    const piece = 'M3.3 7.5H8.5A2.5 2.5 0 1 1 11.9 7.5H16.8V12.3A2.5 2.5 0 1 1 16.8 15.7V20.5H3.3Z';
    const pc = (h, d) => `<path fill="${HM_C(h)}" stroke="${HM_C(h)}" stroke-width="1.5" stroke-linejoin="round"${d ? ' transform="translate(.6 .8)"' : ''} d="${piece}"/>`;
    return `<rect fill="${HM_C('purple-3')}" x="6" y="12" width="52" height="49" rx="9"/>` +
      `<rect fill="${HM_C('white')}" x="6" y="9" width="52" height="49" rx="9"/>` +
      `<path fill="${HM_C('purple')}" d="M15 9H49A9 9 0 0 1 58 18V24H6V18A9 9 0 0 1 15 9Z"/>` +
      `<rect fill="${HM_C('purple-1')}" opacity=".7" x="11" y="12.5" width="15" height="3" rx="1.5"/>` +
      `<rect fill="${HM_C('purple-3')}" x="17.5" y="3.5" width="5.5" height="12" rx="2.7"/><rect fill="${HM_C('purple-3')}" x="41" y="3.5" width="5.5" height="12" rx="2.7"/>` +
      `<g transform="translate(14.5 22.5) scale(1.5)">${pc('yellow-2', 1)}${pc('yellow')}</g>` +
      `<path fill="none" stroke="${HM_C('yellow-1')}" stroke-width="1.6" stroke-linecap="round" d="M23 37H27"/>`;
  },
};
// A path or Game Room picture; a path without a drawing gets its icon.
function hmArt(k) {
  if (!HM_ART[k]) return ico(UI.SUBJ_ICON[k] || 'map', 44);
  return `<svg class="hm-svg" viewBox="0 0 64 64" aria-hidden="true">${HM_ART[k]()}</svg>`;
}
// Mixed Practice: three subject-coloured discs (24 grid, like an icon)
const hmMixIco = () => '<svg class="ic" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">' +
  '<circle cx="8" cy="9" r="6" fill="var(--math)" stroke="var(--surface)" stroke-width="1.5"/>' +
  '<circle cx="16" cy="9" r="6" fill="var(--read)" stroke="var(--surface)" stroke-width="1.5"/>' +
  '<circle cx="12" cy="16" r="6" fill="var(--es)" stroke="var(--surface)" stroke-width="1.5"/></svg>';
// Bath bubbles for the pet's thought bubble
const hmBubbles = () => '<svg class="art" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">' +
  [[9, 13, 6.5], [17.5, 8, 4], [17, 17.5, 3.2]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--ill-aqua-1)" stroke="var(--ill-aqua-2)" stroke-width="1.4"/>` +
    `<circle cx="${hmR(x - r * .4)}" cy="${hmR(y - r * .4)}" r="${hmR(r * .28)}" fill="var(--ill-white)"/>`).join('') + '</svg>';

// The pet's backdrop: one small drawing per scene (S.wear.scene); 160x160, the ground at the bottom.
const HM_SCENE = {
  meadow: () =>
    hmSun(112, 28) + hmCloud(46, 36) +
    `<path fill="${HM_C('green-1')}" d="M0 112C30 88 70 90 98 104C120 94 145 96 160 102V160H0Z"/>` +
    `<path fill="${HM_C('green')}" d="M0 132C40 116 110 114 160 128V160H0Z"/>` +
    hmFlowers([[18, 140, 'pink'], [34, 148, 'yellow'], [128, 142, 'pink'], [144, 150, 'yellow'], [112, 152, 'white']]),
  beach: () =>
    hmSun(112, 28) + hmCloud(48, 34) +
    `<rect fill="${HM_C('aqua')}" x="0" y="100" width="160" height="40"/>` +
    `<path fill="none" stroke="${HM_C('aqua-1')}" stroke-width="2.4" stroke-linecap="round" d="M14 110H34M70 106H94M120 114H146M38 122H58"/>` +
    `<path fill="${HM_C('tan-1')}" d="M0 130C40 120 110 120 160 128V160H0Z"/>` +
    `<circle fill="${HM_C('tan')}" cx="24" cy="146" r="1.6"/><circle fill="${HM_C('tan')}" cx="132" cy="144" r="1.6"/>` +
    `<circle fill="${HM_C('tan')}" cx="120" cy="152" r="1.6"/><circle fill="${HM_C('tan')}" cx="40" cy="152" r="1.6"/>`,
  candy: () =>
    hmCloud(40, 32) +
    `<path fill="${HM_C('pink')}" d="M0 110C30 90 66 92 92 106C116 94 142 96 160 104V160H0Z"/>` +
    `<rect fill="${HM_C('white-2')}" x="128" y="70" width="3.6" height="50" rx="1.8"/>` +
    `<circle cx="129.8" cy="66" r="14" fill="${HM_C('purple')}"/>` +
    `<path fill="none" stroke="${HM_C('purple-1')}" stroke-width="3" stroke-linecap="round" d="M129.8 66m-2 0a2 2 0 1 1 4 0a5 5 0 1 1 -9 0a8 8 0 1 1 15 0"/>` +
    `<path fill="${HM_C('cream')}" d="M0 132C40 118 110 116 160 130V160H0Z"/>` +
    hmFlowers([[20, 146, 'pink'], [40, 152, 'purple'], [124, 148, 'aqua'], [142, 152, 'pink']]),
  rainbow: () =>
    ['red', 'orange', 'yellow', 'green', 'blue', 'purple'].map((h, i) =>
      `<path fill="none" stroke="${HM_C(h)}" stroke-width="6.4" d="M${18 + i * 6} 128A${62 - i * 6} ${62 - i * 6} 0 0 1 ${142 - i * 6} 128"/>`).join('') +
    hmCloud(22, 112) + hmCloud(138, 112) +
    `<path fill="${HM_C('green')}" d="M0 132C40 118 110 116 160 130V160H0Z"/>`,
  space: () =>
    [[18, 20], [46, 44], [70, 14], [100, 34], [24, 70], [58, 84], [146, 70], [132, 96], [90, 62]].map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.3 : 2}" fill="${HM_C('white')}" opacity="${i % 2 ? .65 : .95}"/>`).join('') +
    `<circle cx="126" cy="34" r="13" fill="${HM_C('orange')}"/><circle cx="122" cy="30" r="7" fill="${HM_C('orange-1')}" opacity=".7"/>` +
    `<ellipse cx="126" cy="34" rx="22" ry="5.5" fill="none" stroke="${HM_C('yellow')}" stroke-width="2.4" transform="rotate(-18 126 34)"/>` +
    `<path fill="${HM_C('grey')}" d="M0 128C40 116 110 116 160 126V160H0Z"/>` +
    `<ellipse cx="28" cy="142" rx="9" ry="3.4" fill="${HM_C('grey-2')}"/><ellipse cx="132" cy="146" rx="11" ry="3.8" fill="${HM_C('grey-2')}"/>`,
  castle: () =>
    hmCloud(36, 30) +
    `<path fill="${HM_C('green-1')}" d="M0 112C30 92 70 94 100 106C122 96 146 98 160 104V160H0Z"/>` +
    `<rect fill="${HM_C('purple-1')}" x="104" y="64" width="40" height="44"/>` +
    `<rect fill="${HM_C('white-2')}" x="98" y="54" width="12" height="54"/><rect fill="${HM_C('white-2')}" x="138" y="54" width="12" height="54"/>` +
    `<path fill="${HM_C('purple')}" d="M96 55L104 36L112 55ZM136 55L144 36L152 55Z"/>` +
    `<path fill="${HM_C('red')}" d="M104 36V26L112 29.5L104 33Z"/>` +
    `<path fill="${HM_C('purple-3')}" d="M118 108V94A6 6 0 0 1 130 94V108Z"/>` +
    `<path fill="${HM_C('green')}" d="M0 132C40 118 110 116 160 130V160H0Z"/>`,
};
function hmSun(x, y) {
  return `<circle cx="${x}" cy="${y}" r="14" fill="${HM_C('yellow')}"/><circle cx="${x - 3}" cy="${y - 3}" r="9" fill="${HM_C('yellow-1')}"/>`;
}
function hmCloud(x, y) {
  return `<ellipse cx="${x}" cy="${y}" rx="15" ry="7" fill="${HM_C('white')}"/>` +
    `<circle cx="${x - 4}" cy="${y - 5}" r="7" fill="${HM_C('white')}"/><circle cx="${x + 5}" cy="${y - 4}" r="5.5" fill="${HM_C('white')}"/>`;
}
function hmFlowers(list) {
  return list.map(([x, y, h]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${HM_C(h)}"/><circle cx="${x}" cy="${y}" r="1.3" fill="${HM_C('yellow-2')}"/>`).join('');
}
function hmScene(id) {
  const s = HM_SCENE[id] || HM_SCENE.meadow;
  return `<svg class="hm-scene" viewBox="0 0 160 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${s()}</svg>`;
}

// Hero: the pet on its scene, name, grow meter, today's mission (3 pips) and the stat chips.
function hmHero() {
  const st = stage(), nextG = GROW[st + 1], pn = esc(petN()), d = day(), cr = careTick();
  const needs = Math.min(cr.food, cr.clean, cr.fun) < 30;
  const star = ico('star', '1.1em', 'hm-st');
  // s = the star (icon or word), nm = the pet's name (escaped for markup, raw for the meter's label, which UI.meter escapes)
  const growTxt = (s, nm) => nextG == null ? `${nm} is a super pet!` : st == 0 ? `${nextG - S.stars} more ${s} to hatch your egg!` : `${nextG - S.stars} more ${s} until ${nm} grows!`;
  const grow = growTxt(star, pn);
  const v = nextG == null ? 1 : (S.stars - GROW[st]) / (nextG - GROW[st]);
  const need = !needs ? '' : `<div class="hm-think" aria-hidden="true">${cr.food < 30 ? picArt('apple') : cr.clean < 30 ? hmBubbles() : picArt('ball')}</div>`;
  const r = MIS.count(); // P5-08: the pips count today's missions done
  const pips = [0, 1, 2].map(i => `<i class="${i < r ? 'on' : ''}"></i>`).join('');
  const mission = r >= 3
    ? `<div class="hm-ms done">${ico('trophy', 26)}<span class="hm-pips" aria-hidden="true">${pips}</span><span>All missions done!</span></div>`
    : `<div class="hm-ms">${ico('target', 26)}<span class="hm-pips" role="img" aria-label="${r} of 3 missions done today">${pips}</span><span>${r} of 3 missions</span></div>`;
  const left = ptLeft(), n = STRK.count();
  const chips = UI.chip('star', S.stars, { id: 'starc', aria: S.stars + ' stars' }) + UI.chip('coin', S.coins, { aria: S.coins + ' coins' }) +
    `<button class="stat flame${n ? '' : ' off'}" id="stkb" aria-label="Streak calendar">${ico('flame', 32)}<b>${n}</b></button>` +
    (left > 0 ? UI.chip('ticket', fmtT(left), { aria: 'Game time' }) : '');
  return `<div class="hm-hero">
    <div class="hm-stage sc-${esc(S.wear.scene || 'meadow')}">${hmScene(S.wear.scene)}<div class="petbig ${petAura()}" id="pet" role="button" tabindex="0" aria-label="Pat ${esc(petN())}">${petHTML()}</div>${need}</div>
    <div class="hm-name"><b>${esc(S.name)}</b> <span>&amp; ${pn}</span></div>
    <div class="hm-grow">${UI.meter(v, { kind: 'grow', label: growTxt('stars', petN()) })}<div class="hm-gt">${grow}</div></div>
    ${mission}
    <div class="hm-chips">${chips}</div></div>`;
}

// "Find my level" card for a new child (same ids and data-place buttons as placeBanner(); placeBannerBind() wires it).
function hmPlace() {
  if (!placeAsk()) return '';
  const b = p => `<button class="btn hm-plb s-${p}" data-place="${p}">${ico(UI.SUBJ_ICON[p] || 'map', 28)}<span>${esc(placeName(p))}</span></button>`;
  return `<div class="hm-place" id="plcard"><div class="hm-plt"><span class="hm-pli">${ico('target', 30)}</span><span>Not sure where to start? <b>Find my level!</b></span></div>
    <div class="hm-plr">${placePaths().map(b).join('')}<button class="btn hm-pln" id="plno">Not now</button></div></div>`;
}

// Today row: review (same ids as revCard(); revCardBind() wires #rev), Fact Sprint, Mixed Practice.
// R-01b: the review tile says how many the next review round asks ("10 to review": the due count, at most REVIEW_N), in the tile's
// own words, not as a red count bubble over the icon; Fact Sprint only when FLU.on() (grade 1 up, a set open).
function hmToday() {
  const n = Math.min(dueItems().length, REVIEW_N), flu = FLU.on();
  const rev = n
    ? `<div class="hm-rvw" id="revcard"><button class="hm-tile" id="rev"><span class="hm-ti t-rev">${ico('replay', 32)}</span>` +
      `<span class="hm-tl"><b class="hm-rn" id="revn">${n}</b> to review</span></button></div>`
    : `<div class="hm-tile ok" id="revcard"><span class="hm-ti t-ok">${ico('check', 32)}</span><span class="hm-tl">All caught up!</span></div>`;
  return `<div class="hm-today${flu ? '' : ' n2'}">${rev}
    ${flu ? `<button class="hm-tile" id="flu"><span class="hm-ti s-math">${ico('path-math', 32)}<i class="hm-bolt">${ico('bolt', 18)}</i></span><span class="hm-tl">Fact Sprint</span></button>` : ''}
    <button class="hm-tile" id="mix"><span class="hm-ti t-mix">${hmMixIco()}</span><span class="hm-tl">Mixed Practice</span></button></div>`;
}

// Puzzle of the Day (P3-17; BRAIN_TEASERS 9): a small card under the Today row once a puzzle type is registered. Before it is
// played: the type, the level and the 5 coins it pays; after: a tick and "come back tomorrow". Tapping plays it (done: opens the hub).
function hmDaily() {
  if (!BT.list().length) return '';
  const dl = BT.dailyInfo(), t = dl && BT.get(dl.id);
  if (!t) return '';
  const side = dl.done ? `<span class="hm-podk">${ico('check', 28)}</span>`
    : `<span class="hm-podr">${ico('coin', 24, 'ic-coin')}<b>+${BT.DAILY_COINS}</b></span>`;
  return `<button class="hm-pod${dl.done ? ' done' : ''}" id="hmday"><span class="hm-podi">${hmArt('pod')}</span>` +
    `<span class="hm-podt"><b>Puzzle of the Day</b><span>${dl.done ? 'Done! Come back tomorrow.' : esc(t.name) + ', level ' + dl.level}</span></span>${side}</button>`;
}

// One big illustrated card per path, then the Game Room.
function hmPaths() {
  const cards = Object.keys(PATHS).map(k => {
    const N = NODES[k], np = N.filter((n, i) => passed(k, i)).length, done = np == N.length;
    const sub = done ? 'All done! Play any stop.' : np ? `Next: ${N[curNode(k)].t}` : 'Start here!';
    return `<button class="hm-path game s-${k}" data-p="${k}"><span class="hm-art">${hmArt(k)}</span>` +
      `<span class="hm-pi"><span class="hm-pt">${esc(placeName(k))}</span>` +
      `<span class="hm-pm">${UI.meter(np / N.length, { label: `${np} of ${N.length} stops` })}<b>${np}/${N.length}</b></span>` +
      `<span class="hm-pn">${esc(sub)}</span></span><span class="hm-go">${ico(done ? 'trophy' : 'play', 28)}</span></button>`;
  }).join('');
  const left = ptLeft();
  const gsub = left > 0 ? `${ico('ticket', 22)}<span>${fmtT(left)} of game time to spend!</span>` : `<span>${esc(ptLine())}</span>`;
  const bts = BT.totalStars(), bsub = bts ? `${bts} star${bts == 1 ? '' : 's'} from puzzles` : 'Puzzles to make you think!';
  // Brain Teasers shows on Home once at least one puzzle type is registered (P3-01 ships the hub with none)
  const brain = !BT.list().length ? '' : `<button class="hm-path s-bt" id="btcard"><span class="hm-art">${hmArt('bt')}</span>` +
    `<span class="hm-pi"><span class="hm-pt">Brain Teasers</span><span class="hm-pn">${esc(bsub)}</span></span>` +
    `<span class="hm-go">${ico('play', 28)}</span></button>`;
  return `<div class="hm-paths">${cards}${brain}
    <button class="hm-path s-play${left > 0 ? '' : ' shut'}" id="groom"><span class="hm-art">${hmArt('play')}</span>` +
    `<span class="hm-pi"><span class="hm-pt">Game Room</span><span class="hm-pn hm-gsub">${gsub}</span></span>` +
    `<span class="hm-go">${ico(left > 0 ? 'play' : 'lock', 28)}</span></button></div>`;
}

// Secondary actions: Fact Race (54-race.js; it was called Speed Race until G-02), Pet Care, Pet Shop, Stickers.
function hmActs() {
  const cr = careTick(), needs = Math.min(cr.food, cr.clean, cr.fun) < 30;
  const a = (id, icon, cls, label, extra = '') =>
    `<button class="hm-act" id="${id}"><span class="hm-ai ${cls}">${ico(icon, 30)}${extra}</span><span>${label}</span></button>`;
  return `<div class="hm-acts">${a('race', 'bolt', 't-race', 'Fact Race')}` +
    a('care', 'paw', 't-care', 'Pet Care', needs ? `<i class="hm-need" aria-label="Your pet needs you">!</i>` : '') +
    a('shop', 'bag', 't-shop', 'Pet Shop') + a('book', 'sticker-book', 't-book', 'Stickers') + '</div>';
}

function home(first){
  if(!S.name)return setup();
  const inst = installEvt && !isApp() ? UI.btn('Install', { kind: 'primary', size: 'sm', icon: 'plus', id: 'inst' }) : '';
  view(`<div class="top tbar hm-top"><div class="hm-logo"><span class="hm-mark">${ico('star', 30)}</span><span>Star School</span></div><div class="sp"></div>${inst}
    ${UI.ibtn(S.sound ? 'sound-on' : 'sound-off', S.sound ? 'Sound is on' : 'Sound is off', { id: 'snd', size: 'sm' })}
    ${PRF.homeBtn()}${UI.ibtn('gear', 'Grown-ups: hold', { id: 'gear', size: 'sm' })}</div>
  <div class="scroll hm" id="hs"><div class="hm-cols">
   <div class="hm-col">${hmHero()}${hmPlace()}<h2 class="hm-h">${ico('target', 26)}<span>Today's missions</span></h2>${hmMissions()}<h2 class="hm-h">${ico('calendar', 26)}<span>Today</span></h2>${hmToday()}${hmDaily()}</div>
   <div class="hm-col"><h2 class="hm-h">${ico('map', 26)}<span>Pick a game!</span></h2>${hmPaths()}${hmActs()}</div></div>
   <p class="hm-ver">${ico('star', 16)}<span>Star School ${RELEASE} (build __VER__)</span></p></div>`);
  music(true);
  const pet=$('#pet');pet.onclick=()=>{anim(pet,'jump');SFX.giggle();const r=pet.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,'heart');
    if(S.voice)say(pick(stage()==0?['Crack crack! Earn stars to hatch me!','I am almost ready to hatch!']:[`Hi ${S.name}!`,`Let's go on an adventure!`,`I love stars!`,`You're my best friend!`,`Pick a game!`]))};
  $$('.game').forEach(b=>b.onclick=()=>{SFX.whoosh();pathMap(b.dataset.p)});
  placeBannerBind();revCardBind();hmMissionsBind();PRF.homeBind();
  $('#snd').onclick=()=>{S.sound=!S.sound;S.music=S.sound;save();home()};
  $('#stkb').onclick=()=>{SFX.whoosh();streakCal(0)};
  $('#book').onclick=book;$('#shop').onclick=shop;$('#mix').onclick=()=>{SFX.whoosh();startMix()};$('#race').onclick=raceMenu;if($('#flu'))$('#flu').onclick=()=>{SFX.whoosh();fluMenu()};$('#care').onclick=care;$('#groom').onclick=()=>{SFX.whoosh();gameRoom()};if($('#btcard'))$('#btcard').onclick=()=>{SFX.whoosh();BT.hub()};
  if($('#hmday'))$('#hmday').onclick=()=>{SFX.whoosh();const d=BT.dailyInfo();if(d&&!d.done)BT.start(d.id,d.band,d.level);else BT.hub()};
  if($('#inst'))$('#inst').onclick=async()=>{try{installEvt.prompt();await installEvt.userChoice}catch(e){}installEvt=null;home()};
  let t;const g=$('#gear');g.onpointerdown=()=>{t=setTimeout(grown,1200)};g.onpointerup=g.onpointerleave=()=>clearTimeout(t);g.onclick=()=>fb('Grown-ups: hold it','warn');
  if(first&&S.voice)setTimeout(()=>say(`Hi ${S.name}! Pick a game!`),400)}

let MAPP='math',MAPW={}; // MAPW[path] = the world picked in the strip (this session only, not saved)
/* P4-18: drawn map chrome (until P4-09 draws world scenes). A world badge is a disc in the world's own colour with the icon of
   the first skill that is new in that world (else its first skill); a stop shows its skill icon, a boss stop the drawn boss. */
function wBadge(p,wi){const ws=PATHS[p].worlds,w=ws[wi],seen=new Set();
  ws.slice(0,wi).forEach(x=>x.nodes.forEach(n=>seen.add(n[0])));
  const sk=(w.nodes.find(n=>!seen.has(n[0]))||w.nodes[0]||['star'])[0];
  return`<span class="wbadge s-${p}" style="--wb:${w.c}" aria-hidden="true">${ico(icoSk(sk),20)}</span>`}
function nodeFace(n,lk){if(lk)return ico('lock',32);
  if(n.sk=='boss')return RW.boss(n.boss[1],'idle','nb-art')||`<span class="nb-e">${n.boss[0]}</span>`;
  return ico(icoSk(n.sk),38)}
/* Map of a path (P1-05: long maps). A strip of world chips, grouped by grade, sits above the map; the map draws only the picked
   world and its two neighbours, so it stays fast with 16 worlds and 150 stops. pathMap(p) opens on the world the child is in
   (or the one they just played); pathMap(p, wi) opens on world wi. */
function pathMap(p,wi){MAPP=p;const P=PATHS[p];if(p=="es")warmVoices(); // wake the Spanish and English voices before the first card or question
  const last=G&&G.path==p&&G.node>=0&&NODES[p][G.node]?G.node:-1;
  MAPW[p]=wi!=null?wi:last>=0?NODES[p][last].wi:curWorld(p);
  view(`<div class="top tbar mp-top s-${p}">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl mp-ttl">${ico(UI.SUBJ_ICON[p]||'map',30)}<span>${esc(P.n)}</span></div>${UI.chip('star',S.stars,{aria:'Stars'})}</div>
  <div class="wstrip" id="wstrip" aria-label="Worlds"></div>
  <div class="scroll" id="ms"><div class="map" id="map"></div></div>`);
  $('#back').onclick=()=>home();drawMap(p);music(true);
  if(wi!=null)return mapTop(p);
  const c=$('.node.cur')||$(`.node[data-n="${last>=0?last:curNode(p)}"]`);if(c)c.scrollIntoView({block:'center'})}
/* Pick a world from the strip or a "more worlds" button: redraw in place (no new screen, music keeps playing). */
function mapGo(p,wi){if(!$('#map'))return pathMap(p,wi);SFX.click();MAPW[p]=wi;drawMap(p);mapTop(p)}
function mapTop(p){const t=$(`.wtitle[data-w="${MAPW[p]}"]`);if(t)t.scrollIntoView({block:"start"})}
function worldStrip(p){
  const ws=PATHS[p].worlds,cw=curWorld(p);let h='',lastG=null;
  ws.forEach((w,wi)=>{
    if(!PATHS[p].byLevel&&w.g!==lastG){lastG=w.g;h+=`<span class="wgl">${gradeLabel(w.g)}</span>`}
    const open=worldOpen(p,wi),done=worldFinished(p,wi),sel=wi==MAPW[p];
    h+=`<button class="wchip${sel?' on':''}${done?' done':''}${open?'':' lock'}${wi==cw?' cur':''}" data-w="${wi}" aria-pressed="${sel}"`
      +` aria-label="${esc(w.n)}${done?', done':open?'':', locked'}">${wBadge(p,wi)}${esc(w.n)}`
      +`${done?ico('check',18):open?'':ico('lock',18)}</button>`;
  });
  return h;
}
function drawMap(p){const m=$('#map');if(!m)return;const N=NODES[p],ws=PATHS[p].worlds,W=m.clientWidth||360,amp=Math.min(W*.3,200),pts=[];
  const sel=Math.min(Math.max(MAPW[p]|0,0),ws.length-1),w0=Math.max(0,sel-1),w1=Math.min(ws.length-1,sel+1);MAPW[p]=sel;
  const st=$('#wstrip');if(st){ // the world strip is rebuilt only when what it shows changes; picking a world just moves the highlight
    const ms=MAPW[p];MAPW[p]=-1;const sh=worldStrip(p);MAPW[p]=ms; // its markup with no world picked is the key
    if(st.dataset.k!==p+'|'+sh){st.dataset.k=p+'|'+sh;st.innerHTML=sh;$$('.wchip').forEach(b=>b.onclick=()=>mapGo(p,+b.dataset.w))}
    for(const b of st.querySelectorAll('.wchip')){const on=+b.dataset.w===sel;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))}} // P6-02: its scroll is set at the end (one layout, not two)
  let y=10,bands='';
  const more=(wi,up)=>`<button class="btn wmore" data-w="${wi}" style="top:${y}px">${ico(up?'arrow-up':'arrow-down',20)}${wBadge(p,wi)}${esc(ws[wi].n)}</button>`;
  if(w0>0){bands+=more(w0-1,true);y+=72}
  const wb=[]; // P4-09: [world, top, height, first and end index in pts, Test out shown]; scenes are drawn once every stop is placed
  for(let wi=w0;wi<=w1;wi++){const w=ws[wi],y0=y,[a,b]=WR[p][wi],canTest=worldOpen(p,wi)&&!worldFinished(p,wi);y+=canTest?160:86; // room under the Test out banner so the first stop, its ring and the pet never cover it
    const k0=pts.length;
    for(let i=a;i<=b;i++){pts.push([W/2+Math.sin(i*1.15)*amp,y,i]);y+=106}
    wb.push([wi,y0,y-y0-24,k0,pts.length,canTest]);
    bands+=`<div class="wtitle" data-w="${wi}" style="top:${y0+14}px">${wBadge(p,wi)}<span>${esc(w.n)}</span>${worldFinished(p,wi)?ico('check-circle',24,'ic-good'):''}</div>${canTest?`<button class="btn xs tobtn" data-w="${wi}" style="top:${y0+58}px">${ico('bolt',20)}<span>Already know it? Test out!</span></button>`:''}`;y+=4}
  const cur=curNode(p),allDone=N.every((n,i)=>passed(p,i)),end=w1==ws.length-1;
  const nodes=pts.map(([x,yy,i])=>{const n=N[i],s=nInfo(n),st=getSt(p,i),lk=!unlocked(p,i);
    return`<button class="btn node s-${p} ${s.area} ${lk?'lock':''} ${st?'done':''} ${i==cur&&!lk&&!allDone?'cur':''}" data-n="${i}" style="left:${x}px;top:${yy}px" aria-label="${esc(n.t)}${lk?', locked':''}">${nodeFace(n,lk)}</button>${stopNew(p,i)?`<div class="nnew" style="left:${x}px;top:${yy-50}px">New</div>`:''}<div class="nlab" style="left:${x}px;top:${yy+42}px;max-width:${Math.round(Math.max(140,Math.min(180,2*Math.min(x,W-x)-8)))}px">${esc(n.t)}<div class="nstar">${st?UI.stars(st,3,16):''}</div></div>`}).join('');
  const cp=pts.find(q=>q[2]==cur),side=cp&&cp[0]>W/2?-66:66;
  let tail=end&&allDone?90:20;
  if(!end){y+=8;bands+=more(w1+1,false);tail=80}
  m.style.height=(y+tail)+'px';
  // P4-09: every world band gets its drawn scene (kept clear of the stops, labels, trail and pet); the trail gets stones and bridges
  const tp=SCN.trailPts(pts),pet=cp?[cp[0]+side,cp[1]+18]:null;
  const scenes=wb.map(([wi,top,h,k0,k1,test])=>SCN.band(ws[wi],W,top,h,{test,trail:tp,pet,
    stops:pts.slice(k0,k1).map(([x,yy,i])=>[x,yy,N[i].t,N[i].sk=='boss',stopNew(p,i)])})).join('');
  const kw=allDone?pts.length:pts.filter(q=>q[2]<=cur).length;
  m.innerHTML=scenes+bands+SCN.trail(W,y+20,pts,kw,wb.slice(1).map(([,top])=>top-14))+nodes
    +(cp?`<div class="mappet ${petAura()}" style="left:${cp[0]+side}px;top:${cp[1]+18}px">${petHTML()}</div>`:'')+(end&&allDone?`<div class="wtitle mp-champ" style="top:${y+10}px">${ico('trophy',30)}<span>${esc(PATHS[p].n)} Champion!</span></div>`:'');
  $$('.node').forEach(b=>b.onclick=()=>{const i=+b.dataset.n;if(!unlocked(p,i)){SFX.wrong();anim(b,'sad');fb('Finish the stop before this one!','warn');return}SFX.whoosh();
    open(p,i)});
  $$('.tobtn').forEach(b=>b.onclick=()=>testOut(p,+b.dataset.w));
  $$('.wmore').forEach(b=>b.onclick=()=>mapGo(p,+b.dataset.w));
  const on=st&&st.querySelector('.wchip.on');if(on)st.scrollLeft=Math.max(0,on.offsetLeft-(st.clientWidth-on.offsetWidth)/2)}
function open(p,i){const n=NODES[p][i];if(n.sk=='boss')bossIntro(p,i);else if(n.sk.startsWith('es_')&&SPN[n.sk.slice(3)]&&n.lv==1)learn(p,i);else start(p,i)}

function learn(p,i){const n=NODES[p][i],items=SPN[n.sk.slice(3)];
  view(`<div class="top tbar gx-mtop gx-learn s-es">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('path-es',24)}</span><span>Let's learn!</span></div>${UI.btn('¡Vamos!',{kind:'subject',p:'es',icon:'play',id:'go'})}</div>
  <div class="scroll"><p class="sub" style="text-align:center">Tap a card to hear it in Spanish. Tap it again for English. Then tap ¡Vamos!</p>
  <div class="lgrid">${items.map(it=>`<button class="btn lcard" data-es="${esc(it[5]||esFull(it))}" data-en="${esc(it[1])}"><span class="lp">${picHTML(it,false)}</span><b>${esc(esFull(it))}</b><small>${esc(it[1])}</small></button>`).join('')}</div></div>`);
  if(esVoice()=='no')esNote();
  $('#back').onclick=()=>pathMap(p);$('#go').onclick=()=>{SFX.whoosh();start(p,i)};
  // one language per tap: the tablet's speech engine takes seconds to switch language, so English right after Spanish
  // (or the other way) left a long gap. First tap: the Spanish (the word to learn); the next tap on the same card: the English.
  let lastCard=null;
  $$('.lcard').forEach(b=>b.onclick=()=>{const en=lastCard===b;lastCard=en?null:b;
    if(en)say(b.dataset.en,b);else say(b.dataset.es,b,'es');anim(b,'jump');b.classList.add('heard');
    if($$('.lcard').every(x=>x.classList.contains('heard'))){bump('#go');fb('¡Muy bien! Tap ¡Vamos!')}});
  if(S.voice)setTimeout(()=>say('Tap a card to hear it in Spanish. Tap it again for English!'),300)}

// P4-07 sticker book (DESIGN_SYSTEM 6.4; CSS 43-shop.css): pages of 12; a sticker is its emoji (content) cut out die-cut style;
// empty slots show a faint star. S.stickers is only read.
function book(){const have=STK.filter(s=>S.stickers[s]).length,per=12,pages=[];
  for(let i=0;i<STK.length;i+=per)pages.push(STK.slice(i,i+per));
  const turn=i=>[-6,4,-2,7,-4,3,-7,5,-3,6,-5,2][i%12];
  const slot=(s,i)=>{const n=S.stickers[s]||0;
    return n?`<button class="sb-slot sb-stk" data-s="${esc(s)}" style="--r:${turn(i)}deg" aria-label="Sticker ${i+1}${n>1?', you have '+n:''}">`+
      `<span class="sb-e">${esc(s)}</span>${n>1?`<b class="sb-n">×${n}</b>`:''}</button>`
      :`<span class="sb-slot sb-no" aria-hidden="true">${ico('star',30)}</span>`};
  const page=(p,k)=>{const got=p.filter(s=>S.stickers[s]).length;
    return`<section class="sb-page${got==p.length?' full':''}"><h2 class="sb-ph"><span>Page ${k+1}</span><span class="sb-pc">${got==p.length?ico('check',20):''}${got} of ${p.length}</span></h2>`+
      `<div class="sb-grid">${p.map((s,j)=>slot(s,k*per+j)).join('')}</div></section>`};
  view(`<div class="top tbar gx-mtop s-read">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('sticker-book',24)}</span><span>My Stickers</span></div>`+
    `<span class="stat sb-cnt" role="img" aria-label="${have} of ${STK.length} stickers">${ico('sticker-book',28)}<b>${have}/${STK.length}</b></span></div>
  <div class="scroll"><div class="sb"><div class="sb-head"><div class="sb-hl">${UI.meter(have/STK.length,{kind:'grow',label:have+' of '+STK.length+' stickers'})}`+
    `<p>Finish a round to win a sticker! Get 10 out of 10 for a bonus one.</p></div>`+
    `${BT.list().length?`<div class="bk-bt">${UI.btn('Puzzle badges',{kind:'subject',p:'bt',icon:'medal',id:'bkbdg'})}</div>`:''}</div>
  <div class="sgrid sb-pages">${pages.map(page).join('')}</div></div></div>`);
  $('#back').onclick=()=>home(true);
  if($('#bkbdg'))$('#bkbdg').onclick=()=>{SFX.whoosh();BT.badgeView(book)}; // P3-17: the puzzle badges are a page of the sticker book
  $$('.sb-stk').forEach(b=>b.onclick=()=>{anim(b,'jump');SFX.pop(R(0,5));RW.burst(b,12)})}

