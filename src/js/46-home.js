/* Grade picker (setup and Grown-ups): 8 big buttons, one per grade. Tapping reads the grade aloud and calls onPick(g). */
function gradePickHTML(sel){
  return`<div class="grades" role="radiogroup" aria-label="Grade">${GRADES.map(g=>`<button class="btn gr ${g==sel?'sel':''}" role="radio" aria-checked="${g==sel}" data-g="${g}">${gradeLabel(g)}</button>`).join('')}</div>`}
function gradePickBind(onPick){
  $$('.gr').forEach(b=>b.onclick=()=>{const g=+b.dataset.g;
    $$('.gr').forEach(x=>{x.classList.toggle('sel',x==b);x.setAttribute('aria-checked',x==b)});
    say(gradeSpoken(g),b);SFX.pop(1);onPick(g)})}
function setup(){let pet=S.pet,grade=gradeOf();
  view(`<div class="center setup"><h1>⭐ Star School</h1>
  <div class="card"><div class="sub" style="margin-bottom:8px">What's your name?</div><input class="name" id="nm" value="${esc(S.name)}" placeholder="Your name"></div>
  <div class="card"><div class="sub" style="margin-bottom:8px">Pick a pet egg to hatch!</div>
   <div class="pets">${Object.entries(PETS).map(([k,p])=>`<button class="btn petopt ${k==pet?'sel':''}" data-p="${k}"><span>${petPick(k)}</span>${p.n}</button>`).join('')}</div>
   <input class="name" id="pn" style="margin-top:12px;width:100%" value="${esc(S.petName)}" placeholder="Name your pet (${PETS[pet].def})"></div>
  <div class="card"><div class="sub" style="margin-bottom:8px">What grade? <span class="small">(Grown-ups can change this later)</span></div>${gradePickHTML(grade)}</div>
  <button class="btn big" id="go">Let's go! 🚀</button></div>`);
  gradePickBind(g=>{grade=g});
  $$('.petopt').forEach(b=>b.onclick=()=>{pet=b.dataset.p;$$('.petopt').forEach(x=>x.classList.toggle('sel',x==b));$('#pn').placeholder=`Name your pet (${PETS[pet].def})`;SFX.giggle();anim(b.querySelector('span'),'jump')});
  $('#go').onclick=()=>{const n=$('#nm').value.trim();if(!n){fb('Type your name first!','warn');SFX.wrong();return}
    S.name=n;S.pet=pet;S.petName=$('#pn').value.trim();setGrade(grade);SFX.magic();home(true)}}

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
  const r = Math.min(d.r, 3);
  const pips = [0, 1, 2].map(i => `<i class="${i < r ? 'on' : ''}"></i>`).join('');
  const mission = d.done
    ? `<div class="hm-ms done">${ico('trophy', 26)}<span class="hm-pips" aria-hidden="true">${pips}</span><span>Mission done!</span></div>`
    : `<div class="hm-ms">${ico('target', 26)}<span class="hm-pips" role="img" aria-label="${r} of 3 rounds done today">${pips}</span><span>3 rounds today</span></div>`;
  const left = ptLeft(), n = STRK.count();
  const chips = UI.chip('star', S.stars, { id: 'starc', aria: S.stars + ' stars' }) + UI.chip('coin', S.coins, { aria: S.coins + ' coins' }) +
    `<button class="stat flame${n ? '' : ' off'}" id="stkb" aria-label="Streak calendar">${ico('flame', 32)}<b>${n}</b></button>` +
    (left > 0 ? UI.chip('ticket', fmtT(left), { aria: 'Game time' }) : '');
  return `<div class="hm-hero">
    <div class="hm-stage sc-${esc(S.wear.scene || 'meadow')}">${hmScene(S.wear.scene)}<div class="petbig ${petAura()}" id="pet">${petHTML()}</div>${need}</div>
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
function hmToday() {
  const n = dueItems().length;
  const rev = n
    ? `<div class="hm-rvw" id="revcard"><button class="hm-tile" id="rev"><span class="hm-ti t-rev">${ico('replay', 32)}<b class="hm-cnt" id="revn">${n}</b></span>` +
      `<span class="hm-tl">Review</span></button></div>`
    : `<div class="hm-tile ok" id="revcard"><span class="hm-ti t-ok">${ico('check', 32)}</span><span class="hm-tl">All caught up!</span></div>`;
  return `<div class="hm-today">${rev}
    <button class="hm-tile" id="flu"><span class="hm-ti s-math">${ico('path-math', 32)}<i class="hm-bolt">${ico('bolt', 18)}</i></span><span class="hm-tl">Fact Sprint</span></button>
    <button class="hm-tile" id="mix"><span class="hm-ti t-mix">${hmMixIco()}</span><span class="hm-tl">Mixed Practice</span></button></div>`;
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
  const gsub = left > 0 ? `${ico('ticket', 22)}<span>${fmtT(left)} of game time to spend!</span>` : '<span>Finish learning rounds to earn game time</span>';
  return `<div class="hm-paths">${cards}
    <button class="hm-path s-play${left > 0 ? '' : ' shut'}" id="groom"><span class="hm-art">${hmArt('play')}</span>` +
    `<span class="hm-pi"><span class="hm-pt">Game Room</span><span class="hm-pn hm-gsub">${gsub}</span></span>` +
    `<span class="hm-go">${ico(left > 0 ? 'play' : 'lock', 28)}</span></button></div>`;
}

// Secondary actions: Speed Race, Pet Care, Pet Shop, Stickers.
function hmActs() {
  const cr = careTick(), needs = Math.min(cr.food, cr.clean, cr.fun) < 30;
  const a = (id, icon, cls, label, extra = '') =>
    `<button class="hm-act" id="${id}"><span class="hm-ai ${cls}">${ico(icon, 30)}${extra}</span><span>${label}</span></button>`;
  return `<div class="hm-acts">${a('race', 'bolt', 't-race', 'Speed Race')}` +
    a('care', 'paw', 't-care', 'Pet Care', needs ? `<i class="hm-need" aria-label="Your pet needs you">!</i>` : '') +
    a('shop', 'bag', 't-shop', 'Pet Shop') + a('book', 'sticker-book', 't-book', 'Stickers') + '</div>';
}

function home(first){
  if(!S.name)return setup();
  const inst = installEvt && !isApp() ? UI.btn('Install', { kind: 'primary', size: 'sm', icon: 'plus', id: 'inst' }) : '';
  view(`<div class="top tbar hm-top"><div class="hm-logo"><span class="hm-mark">${ico('star', 30)}</span><span>Star School</span></div><div class="sp"></div>${inst}
    ${UI.ibtn(S.sound ? 'sound-on' : 'sound-off', S.sound ? 'Sound is on' : 'Sound is off', { id: 'snd', size: 'sm' })}
    ${UI.ibtn('gear', 'Grown-ups: hold', { id: 'gear', size: 'sm' })}</div>
  <div class="scroll hm" id="hs"><div class="hm-cols">
   <div class="hm-col">${hmHero()}${hmPlace()}<h2 class="hm-h">${ico('calendar', 26)}<span>Today</span></h2>${hmToday()}</div>
   <div class="hm-col"><h2 class="hm-h">${ico('map', 26)}<span>Pick a game!</span></h2>${hmPaths()}${hmActs()}</div></div>
   <p class="hm-ver">${ico('star', 16)}<span>Star School __VER__</span></p></div>`);
  music(true);
  const pet=$('#pet');pet.onclick=()=>{anim(pet,'jump');SFX.giggle();const r=pet.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,['💖','✨','⭐']);
    if(S.voice)say(pick(stage()==0?['Crack crack! Earn stars to hatch me!','I am almost ready to hatch!']:[`Hi ${S.name}!`,`Let's go on an adventure!`,`I love stars!`,`You're my best friend!`,`Pick a game!`]))};
  $$('.game').forEach(b=>b.onclick=()=>{SFX.whoosh();pathMap(b.dataset.p)});
  placeBannerBind();revCardBind();
  $('#snd').onclick=()=>{S.sound=!S.sound;S.music=S.sound;save();home()};
  $('#stkb').onclick=()=>{SFX.whoosh();streakCal(0)};
  $('#book').onclick=book;$('#shop').onclick=shop;$('#mix').onclick=()=>{SFX.whoosh();startMix()};$('#race').onclick=raceMenu;$('#flu').onclick=()=>{SFX.whoosh();fluMenu()};$('#care').onclick=care;$('#groom').onclick=()=>{SFX.whoosh();gameRoom()};
  if($('#inst'))$('#inst').onclick=async()=>{try{installEvt.prompt();await installEvt.userChoice}catch(e){}installEvt=null;home()};
  let t;const g=$('#gear');g.onpointerdown=()=>{t=setTimeout(grown,1200)};g.onpointerup=g.onpointerleave=()=>clearTimeout(t);g.onclick=()=>fb('Grown-ups: hold it','warn');
  if(first&&S.voice)setTimeout(()=>say(`Hi ${S.name}! Pick a game!`),400)}

let MAPP='math',MAPW={}; // MAPW[path] = the world picked in the strip (this session only, not saved)
/* Map of a path (P1-05: long maps). A strip of world chips, grouped by grade, sits above the map; the map draws only the picked
   world and its two neighbours, so it stays fast with 16 worlds and 150 stops. pathMap(p) opens on the world the child is in
   (or the one they just played); pathMap(p, wi) opens on world wi. */
function pathMap(p,wi){MAPP=p;const P=PATHS[p];
  const last=G&&G.path==p&&G.node>=0&&NODES[p][G.node]?G.node:-1;
  MAPW[p]=wi!=null?wi:last>=0?NODES[p][last].wi:curWorld(p);
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">${P.e} ${P.n}</div><div class="sp"></div><div class="stars">⭐ ${S.stars}</div></div>
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
      +` aria-label="${esc(w.n)}${done?', done':open?'':', locked'}"><span class="we">${w.e}</span>${esc(w.n)}`
      +`${done?ico('check',18):open?'':ico('lock',18)}</button>`;
  });
  return h;
}
function drawMap(p){const m=$('#map');if(!m)return;const N=NODES[p],ws=PATHS[p].worlds,W=m.clientWidth||360,amp=Math.min(W*.3,200),pts=[];
  const sel=Math.min(Math.max(MAPW[p]|0,0),ws.length-1),w0=Math.max(0,sel-1),w1=Math.min(ws.length-1,sel+1);MAPW[p]=sel;
  const st=$('#wstrip');if(st){st.innerHTML=worldStrip(p);$$('.wchip').forEach(b=>b.onclick=()=>mapGo(p,+b.dataset.w));
    const on=st.querySelector('.wchip.on');if(on)st.scrollLeft=Math.max(0,on.offsetLeft-(st.clientWidth-on.offsetWidth)/2)}
  let y=10,bands='';
  const more=(wi,up)=>`<button class="btn wmore" data-w="${wi}" style="top:${y}px">${ico(up?'back':'go',20)}<span class="we">${ws[wi].e}</span>${esc(ws[wi].n)}</button>`;
  if(w0>0){bands+=more(w0-1,true);y+=72}
  for(let wi=w0;wi<=w1;wi++){const w=ws[wi],y0=y,[a,b]=WR[p][wi],canTest=worldOpen(p,wi)&&!worldFinished(p,wi);y+=canTest?132:86;
    for(let i=a;i<=b;i++){pts.push([W/2+Math.sin(i*1.15)*amp,y,i]);y+=106}
    bands+=`<div class="wband" style="top:${y0}px;height:${y-y0-24}px;background:${w.c}"></div><div class="wtitle" data-w="${wi}" style="top:${y0+14}px">${w.e} ${w.n}${worldFinished(p,wi)?' ✅':''}</div>${canTest?`<button class="btn xs tobtn" data-w="${wi}" style="top:${y0+58}px">⚡ Already know it? Test out!</button>`:''}`;y+=4}
  let path='';pts.forEach(([x,yy],k)=>{if(!k)path=`M${x} ${yy}`;else{const[px,py]=pts[k-1];path+=` C${px} ${py+55} ${x} ${yy-55} ${x} ${yy}`}});
  const cur=curNode(p),allDone=N.every((n,i)=>passed(p,i)),end=w1==ws.length-1;
  const nodes=pts.map(([x,yy,i])=>{const n=N[i],s=nInfo(n),st=getSt(p,i),lk=!unlocked(p,i);
    return`<button class="btn node ${s.area} ${lk?'lock':''} ${st?'done':''} ${i==cur&&!lk&&!allDone?'cur':''}" data-n="${i}" style="left:${x}px;top:${yy}px">${lk?'🔒':s.e}</button>${stopNew(p,i)?`<div class="nnew" style="left:${x}px;top:${yy-50}px">NEW</div>`:''}<div class="nlab" style="left:${x}px;top:${yy+42}px">${esc(n.t)}<div class="nstar">${st?'★'.repeat(st)+'☆'.repeat(3-st):''}</div></div>`}).join('');
  const cp=pts.find(q=>q[2]==cur),side=cp&&cp[0]>W/2?-66:66;
  let tail=end&&allDone?90:20;
  if(!end){y+=8;bands+=more(w1+1,false);tail=80}
  m.style.height=(y+tail)+'px';
  m.innerHTML=bands+`<svg width="${W}" height="${y+20}"><path d="${path}" fill="none" stroke="#d6c7a8" stroke-width="16" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 10"/></svg>`+nodes
    +(cp?`<div class="mappet ${petAura()}" style="left:${cp[0]+side}px;top:${cp[1]+18}px">${petHTML()}</div>`:'')+(end&&allDone?`<div class="wtitle" style="top:${y+10}px;font-size:24px">🏆 ${PATHS[p].n} Champion! 🏆</div>`:'');
  $$('.node').forEach(b=>b.onclick=()=>{const i=+b.dataset.n;if(!unlocked(p,i)){SFX.wrong();anim(b,'sad');fb('Finish the stop before this one!','warn');return}SFX.whoosh();
    open(p,i)});
  $$('.tobtn').forEach(b=>b.onclick=()=>testOut(p,+b.dataset.w));
  $$('.wmore').forEach(b=>b.onclick=()=>mapGo(p,+b.dataset.w))}
function open(p,i){const n=NODES[p][i];if(n.sk=='boss')bossIntro(p,i);else if(n.sk.startsWith('es_')&&n.sk!='es_mix'&&n.lv==1)learn(p,i);else start(p,i)}

function learn(p,i){const n=NODES[p][i],items=SPN[n.sk.slice(3)];
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">Let's learn!</div><div class="sp"></div><button class="btn big" id="go" style="font-size:20px;padding:10px 18px">¡Vamos! ▶</button></div>
  <div class="scroll"><p class="sub" style="text-align:center">Tap each card to hear it in English, then Spanish. Then tap ¡Vamos!</p>
  <div class="lgrid">${items.map(it=>`<button class="btn lcard" data-es="${esc(it[0])}" data-en="${esc(it[1])}"><span class="lp">${picHTML(it,false)}</span><b>${esc(it[0])}</b><small>${esc(it[1])}</small></button>`).join('')}</div></div>`);
  $('#back').onclick=()=>pathMap(p);$('#go').onclick=()=>{SFX.whoosh();start(p,i)};
  $$('.lcard').forEach(b=>b.onclick=()=>{say(b.dataset.en,b);say(b.dataset.es,null,'es',1);anim(b,'jump');b.classList.add('heard');
    if($$('.lcard').every(x=>x.classList.contains('heard'))){bump('#go');fb('¡Muy bien! Tap ¡Vamos!')}});
  if(S.voice)setTimeout(()=>say('Tap each card to hear it in English and Spanish!'),300)}

function book(){const have=STK.filter(s=>S.stickers[s]).length;
  view(`<div class="top"><button class="btn sm" id="back" aria-label="Back">${ico('back',20)}</button><div class="title">${ico('sticker-book','1.1em','ic-brand')} My Stickers</div><div class="sp"></div><div class="stars">${have} / ${STK.length}</div></div>
  <div class="scroll"><p class="sub" style="text-align:center">Finish a round to win a sticker! Get 10 out of 10 for a bonus one.</p>
  <div class="sgrid">${STK.map(s=>S.stickers[s]?`<button class="btn st" data-s="${s}">${s}${S.stickers[s]>1?`<b>×${S.stickers[s]}</b>`:''}</button>`:`<div class="st no">${ico('question','1em')}</div>`).join('')}</div></div>`);
  $('#back').onclick=()=>home(true);
  $$('.st[data-s]').forEach(b=>b.onclick=()=>{anim(b,'jump');SFX.pop(R(0,5));const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,[b.dataset.s])})}

