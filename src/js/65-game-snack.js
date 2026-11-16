/* ---------- Snack Stand: run a little snack stand for one busy day (G-04a; CSS src/css/49-game-snack.css) ----------
   An original Star School game (docs/GAMES_RESEARCH.md, "Game A"). Both files go into games2.<VER>.js (tools/build.py PARTS: the
   newer Game Room games load after games.<VER>.js, which holds the hub, GH.reg and the gh* drawing helpers this file uses).

   How it plays
   - Friendly animal customers come to the counter. A speech bubble shows the order as pictures (the same pictures as the food
     buttons). The child taps the food (or drags it onto the plate); the snack builds up on the plate; Undo takes the last thing
     off; Serve hands it over. The customer cheers, pays coins and walks off happily. A day is 8 to 12 customers, then the sign
     turns to "Closed" and the shared end card shows stars (orders right the first time), customers, coins and the best combo.
   - Calm (the default): one customer at a time, 1 to 3 things, no clock at all. Busy (chosen by the child): two or three
     customers at once, longer orders, pancakes to cook on the grill, and a patience heart over each customer. When a heart runs
     out the customer still waits, gets the snack and smiles: only the tip is missed. Nobody ever leaves unserved.
   - Coins are this game's own money (not Pet Shop coins, R-02 4.3). They buy a fixed list of 30 things for the stand: new food,
     awning colours, signs, counters, decorations and a helper bird. Every price is shown, nothing is random, nothing changes
     while the app is closed, there are no streaks. Five places (park, beach, snowy hill, fair, moon) open with stars; each brings
     its own animals and one special food.
   - Give change (optional, off by default, from 2nd grade): the customer pays with 5, 10 or 20 and the child taps the change
     from the till. A wrong count only asks to count again, then shows the answer.

   Code: data, drawings (object-art style, DESIGN_SYSTEM 6.5: light from the top left, shade, base, highlight, soft ink shadow;
   --a-* roles only, no raw colours, no emoji; existing ART drawings reused through snArt), the day simulation (snNew, snStep,
   snAdd, snUndo, snPan, snServe, snChange: no DOM, seeded, the tests play whole days), and the screens (menu, shop, the day).
   Game time: exactly like the other games (ptLeft() before a day, gtStart while it runs, held by the pause sheet, the shared
   time-up card). view() stops the day through snStop().
   Save: S.snack (created when the game is first opened; old saves load unchanged), read field by field by snS():
   {coins, days, served, stars: {place: 0-3}, combo, own: {id: 1}, awn, sign, ctr, place, mode, till}
   G-04a2 adds, by id with defaults: kind ('mix' or a kind of day), book {dish: times made}, cafe {id: 1} (the café journey and its
   upgrades), kd {kind: best stars}, tw (the date today's guest was served).

   G-04a2 (R-03 N1-N4, A1, A3, A5): kinds of days that open one after another with days played (SN_KINDS: open day, taste test,
   special of the day, the place's own day, picky customers, birthday party, recipe day with steps, rush hour in Busy); three more
   places (farm, castle, under the sea); a café journey (stand -> food cart -> little café -> diner) with fixed upgrades bought with
   coins (SN_CAFE); a recipe book that fills in (SN_DISHES); a "Next goal" line; today's guest from the date (snTwist: a small bonus
   the first time a day, nothing lost on a missed day, no streak); customers that idle, think, hop and sit at tables; steam and
   sparkles; a gentle tune per place through tone() (Sound effects on, Music on, not in Calm mode). */

const SN_DEV = { fast: 1 }; // test hook (smoke): the day's clock runs this many times faster

/* ---- the food: id -> [name, station, price, plural] ---- */
const SN_ING = {
  bread: ['Bread', 'sand', 1, 'bread'], cheese: ['Cheese', 'sand', 1, 'cheese'], tomato: ['Tomato', 'sand', 1, 'tomatoes'],
  lettuce: ['Lettuce', 'sand', 1, 'lettuce'], egg: ['Egg', 'sand', 2, 'eggs'],
  van: ['Vanilla', 'ice', 2, 'vanilla scoops'], straw: ['Strawberry', 'ice', 2, 'strawberry scoops'],
  choc: ['Chocolate', 'ice', 2, 'chocolate scoops'], mint: ['Mint', 'ice', 2, 'mint scoops'],
  apple: ['Apple juice', 'juice', 2, 'apple juices'], grape: ['Grape juice', 'juice', 2, 'grape juices'],
  berry: ['Berry juice', 'juice', 3, 'berry juices'], orange: ['Orange juice', 'juice', 2, 'orange juices'],
  cocoa: ['Hot cocoa', 'juice', 3, 'hot cocoas'],
  cookie: ['Cookie', 'treat', 1, 'cookies'], cake: ['Cake', 'treat', 3, 'cakes'], milk: ['Milk', 'treat', 2, 'milks'],
  pizza: ['Pizza', 'treat', 3, 'pizzas'], starc: ['Star cookie', 'treat', 2, 'star cookies'],
  pancake: ['Pancake', 'grill', 3, 'pancakes'],
  // G-04a2: ice for a picky drink; the recipe kitchen (Toast and Blender tabs, only on days that need them); the new places' specials
  icecube: ['Ice cubes', 'juice', 1, 'ice cubes'],
  toast: ['Toast', 'kit', 1, 'toasts'], jam: ['Jam', 'kit', 1, 'jam'], honey: ['Honey', 'kit', 1, 'honey'], cream: ['Cream', 'kit', 1, 'cream'],
  mallow: ['Marshmallow', 'kit', 1, 'marshmallows'],
  banana: ['Banana', 'mix', 1, 'bananas'], berries: ['Berries', 'mix', 1, 'berries'], yogurt: ['Yogurt', 'mix', 1, 'yogurts'], blend: ['Blend', 'mix', 0, 'blends'],
  corn: ['Corn', 'treat', 2, 'corn cobs'], pie: ['Pie', 'treat', 3, 'pies'], jelly: ['Jelly', 'treat', 2, 'jellies'],
};
const SN_STATIONS = [['sand', 'Sandwich', 'bread'], ['ice', 'Ice cream', 'van'], ['juice', 'Drinks', 'apple'], ['treat', 'Treats', 'cookie'],
  ['grill', 'Grill', 'pancake'], ['kit', 'Toast', 'toast'], ['mix', 'Blender', 'blend']];
const SN_EXTRA = ['icecube', 'toast', 'jam', 'honey', 'cream', 'mallow', 'banana', 'berries', 'yogurt', 'blend']; // only on days that need them
const SN_HOT = ['cocoa', 'pancake', 'toast', 'pie', 'corn']; // steam rises from these on the plate
const SN_FILL = ['cheese', 'tomato', 'lettuce', 'egg']; // sandwich fillings (bread goes on both sides)
const SN_FREE = ['bread', 'cheese', 'van', 'apple', 'cookie']; // on the menu from the first day
// places: id, name, stars needed, sky tokens, customers, special food, and (G-04a2) the place's own kind of day:
// day {id, name, line, how (the order maker), st (the stations that day uses)}
const SN_PLACES = [
  { id: 'park', name: 'Sunny Park', need: 0, sky: ['sky-1', 'sky'], who: ['cat', 'dog', 'rabbit', 'duck', 'mouse', 'fox'], sp: '',
    day: { id: 'picnic', name: 'Picnic day', line: 'Every order is a picnic: a sandwich and a drink.', how: 'picnic', st: ['sand', 'juice', 'treat'] } },
  { id: 'beach', name: 'Sandy Beach', need: 2, sky: ['sea-1', 'sea'], who: ['crab', 'turtle', 'duck', 'frog', 'pig', 'chick'], sp: 'orange',
    day: { id: 'hot', name: 'Hot day', line: 'Everyone wants something cold. Some want extra ice!', how: 'cold', st: ['ice', 'juice'] } },
  { id: 'snow', name: 'Snowy Hill', need: 5, sky: ['blue', 'sky-1'], who: ['sheep', 'owl', 'bear', 'rabbit', 'fox', 'hen'], sp: 'cocoa',
    day: { id: 'cocoa', name: 'Cocoa day', line: 'Hot cocoa, step by step: cocoa, then cream, then a marshmallow.', how: 'cocoa', st: ['juice', 'kit', 'treat'] } },
  { id: 'fair', name: 'The Fair', need: 8, sky: ['dusk', 'dusk-1'], who: ['lion', 'elephant', 'giraffe', 'horse', 'pig', 'cow'], sp: 'pizza',
    day: { id: 'parade', name: 'Parade day', line: 'The band comes in threes: three of the same, please!', how: 'parade', st: ['sand', 'ice', 'juice', 'treat', 'grill'] } },
  { id: 'moon', name: 'The Moon', need: 11, sky: ['night', 'night-1'], who: ['owl', 'mouse', 'cat', 'bear', 'dog', 'frog'], sp: 'starc',
    day: { id: 'stars', name: 'Star party', line: 'Two big star parties on the Moon!', how: 'party', st: ['sand', 'ice', 'juice', 'treat', 'grill'] } },
  { id: 'farm', name: 'The Farm', need: 13, sky: ['sky', 'sun'], who: ['cow', 'sheep', 'pig', 'hen', 'horse', 'chick'], sp: 'corn',
    day: { id: 'harvest', name: 'Harvest day', line: 'Fresh corn from the field with every order.', how: 'harvest', st: ['sand', 'juice', 'treat'] } },
  { id: 'castle', name: 'The Castle', need: 16, sky: ['lilac', 'rose'], who: ['lion', 'owl', 'bear', 'horse', 'fox', 'elephant'], sp: 'pie',
    day: { id: 'feast', name: 'Royal feast', line: 'The king and queen have a feast. The biggest order ever!', how: 'feast', st: ['sand', 'ice', 'juice', 'treat', 'grill'] } },
  { id: 'sea', name: 'Under the Sea', need: 20, sky: ['sea', 'sea-2'], who: ['fish', 'crab', 'turtle', 'frog', 'duck'], sp: 'jelly',
    day: { id: 'jelly', name: 'Jelly day', line: 'Wobbly jelly and cold drinks for everyone.', how: 'jelly', st: ['ice', 'juice', 'treat'] } },
];
const SN_WHO = {
  cat: 'Mimi', dog: 'Rufus', rabbit: 'Bo', duck: 'Dot', mouse: 'Nibbles', fox: 'Fern', crab: 'Clack', turtle: 'Shelly', frog: 'Fizz',
  pig: 'Rosie', chick: 'Peep', sheep: 'Woolly', owl: 'Hoot', bear: 'Bruno', hen: 'Henny', lion: 'Leo', elephant: 'Ellie',
  giraffe: 'Gigi', horse: 'Hazel', cow: 'Daisy', fish: 'Finn', bee: 'Buzz', butterfly: 'Flutter',
};
const SN_MAXSTARS = 3 * 8; // three stars a place

/* ---- G-04a2: the kinds of days. They open one after another with days played (never by luck); Mix plays the open ones in turn.
   id, name, line, days (days played to open it), busy (Busy only), pic (an ART or food drawing for its card) ---- */
const SN_KINDS = [
  { id: 'plain', name: 'Open day', line: 'Customers order anything on your menu.', days: 0, pic: 'van' },
  { id: 'taste', name: 'Taste test', line: 'A quiet day. Each customer tastes one thing, and you choose which!', days: 0, pic: 'spoon' },
  { id: 'special', name: 'Special of the day', line: 'Today has a special snack on a card. Many customers want it!', days: 2, pic: 'star' },
  { id: 'place', name: "The place's own day", line: '', days: 3, pic: '' },
  { id: 'picky', name: 'Picky customers', line: 'Some customers ask for "no tomato" or "extra ice". Look closely!', days: 4, pic: 'cheese' },
  { id: 'party', name: 'Birthday party', line: 'A birthday party orders for the whole table. Count it all!', days: 6, pic: 'gift' },
  { id: 'recipe', name: 'Recipe day', line: 'Toast and smoothies, step by step: 1, 2, 3!', days: 8, pic: 'toast' },
  { id: 'rush', name: 'Rush hour', line: 'Lots of hungry customers, one after another. Busy only.', days: 10, busy: true, pic: 'clock' },
];
// the recipe book: named snacks. steps: made in this order (the bubble numbers them). where: only at that place. busy: Busy only.
const SN_DISHES = [
  { id: 'cheesy', name: 'Cheese sandwich', items: ['bread', 'cheese', 'bread'] },
  { id: 'tomsand', name: 'Tomato sandwich', items: ['bread', 'cheese', 'tomato', 'bread'], busy: true },
  { id: 'garden', name: 'Garden sandwich', items: ['bread', 'lettuce', 'tomato', 'bread'], busy: true },
  { id: 'eggsand', name: 'Egg sandwich', items: ['bread', 'egg', 'bread'] },
  { id: 'cone', name: 'Vanilla cone', items: ['van'] },
  { id: 'double', name: 'Double scoop', items: ['van', 'straw'] },
  { id: 'chocmint', name: 'Choc-mint cone', items: ['choc', 'mint'] },
  { id: 'rainbow', name: 'Rainbow cone', items: ['straw', 'van', 'mint'] },
  { id: 'cookmilk', name: 'Cookies and milk', items: ['cookie', 'cookie', 'milk'] },
  { id: 'cakejuice', name: 'Cake and juice', items: ['cake', 'apple'] },
  { id: 'grapecake', name: 'Cake and grape juice', items: ['cake', 'grape'] },
  { id: 'stack', name: 'Pancake stack', items: ['pancake', 'pancake'], busy: true },
  { id: 'sunny', name: 'Orange and ice cream', items: ['orange', 'van'], where: 'beach' },
  { id: 'cocoacookie', name: 'Cocoa and a cookie', items: ['cocoa', 'cookie'], where: 'snow' },
  { id: 'pizzajuice', name: 'Pizza and juice', items: ['pizza', 'apple'], where: 'fair' },
  { id: 'starmilk', name: 'Star cookies and milk', items: ['starc', 'starc', 'milk'], where: 'moon' },
  { id: 'cornjuice', name: 'Corn and apple juice', items: ['corn', 'apple'], where: 'farm' },
  { id: 'piemilk', name: 'Pie and milk', items: ['pie', 'milk'], where: 'castle' },
  { id: 'jellyjuice', name: 'Jelly and berry juice', items: ['jelly', 'berry'], where: 'sea' },
  { id: 'jamtoast', name: 'Jam toast', items: ['toast', 'jam', 'banana'], steps: true },
  { id: 'honeytoast', name: 'Honey toast', items: ['toast', 'honey', 'berries'], steps: true },
  { id: 'creamtoast', name: 'Berry cream toast', items: ['toast', 'cream', 'berries'], steps: true },
  { id: 'berrysmoo', name: 'Berry smoothie', items: ['berries', 'yogurt', 'blend'], steps: true },
  { id: 'banasmoo', name: 'Banana smoothie', items: ['banana', 'yogurt', 'blend'], steps: true },
  { id: 'bigsmoo', name: 'Big fruit smoothie', items: ['banana', 'berries', 'yogurt', 'blend'], steps: true, busy: true },
  { id: 'pantreat', name: 'Pancake with honey', items: ['pancake', 'honey', 'banana'], steps: true, busy: true },
  { id: 'cocoacream', name: 'Cocoa with cream', items: ['cocoa', 'cream', 'mallow'], steps: true, where: 'snow' },
];
// the café journey and its upgrades (the second catalogue, R-03 N2): [id, group, name, price]. Opens after 12 things from the
// Stand shop or 8 days; each stage needs the one before; a stage's upgrades need that stage. Fixed prices, nothing random.
const SN_CAFE = [
  ['cart', 'stage', 'Food cart', 150], ['cafe', 'stage', 'Little café', 300], ['diner', 'stage', 'The Diner', 600],
  ['umbrella', 'cart', 'Big umbrella', 40], ['chalk', 'cart', 'Chalk board', 45], ['cooler', 'cart', 'Cool box', 50], ['lights', 'cart', 'String lights', 60],
  ['clock', 'cafe', 'Café clock', 60], ['window', 'cafe', 'Window flowers', 70], ['plants', 'cafe', 'Big plants', 80], ['tables', 'cafe', 'Tables and chairs', 90],
  ['pies', 'diner', 'Pie case', 100], ['mixer', 'diner', 'Shake mixer', 110], ['booth', 'diner', 'Comfy booth', 120], ['neon', 'diner', 'Glowing sign', 140],
  ['helper2', 'diner', 'Chick helper', 160],
];
const SN_STAGES = ['Snack Stand', 'Snack Cart', 'Little Café', 'The Diner'];
const SN_CAFE_OPEN = 12; // Stand shop things (or 8 days) that open the café journey
// the stand shop: [id, group, name, price]. Menu ids are food ids. Free styles (red awning, wood sign, wood counter) are not listed.
const SN_SHOP = [
  ['tomato', 'menu', 'Tomato', 12], ['milk', 'menu', 'Milk', 12], ['straw', 'menu', 'Strawberry ice cream', 15],
  ['lettuce', 'menu', 'Lettuce', 18], ['grape', 'menu', 'Grape juice', 18], ['choc', 'menu', 'Chocolate ice cream', 22],
  ['cake', 'menu', 'Cake', 25], ['egg', 'menu', 'Egg', 25], ['berry', 'menu', 'Berry juice', 28], ['mint', 'menu', 'Mint ice cream', 32],
  ['pancake', 'menu', 'Pancake grill', 50],
  ['awn-b', 'awn', 'Blue awning', 20], ['awn-g', 'awn', 'Green awning', 20], ['awn-y', 'awn', 'Yellow awning', 30],
  ['awn-v', 'awn', 'Purple awning', 30], ['awn-p', 'awn', 'Pink awning', 40],
  ['sign-star', 'sign', 'Star sign', 35], ['sign-heart', 'sign', 'Heart sign', 45], ['sign-lights', 'sign', 'Light-up sign', 60],
  ['ctr-mint', 'ctr', 'Mint tile counter', 45], ['ctr-candy', 'ctr', 'Candy stripe counter', 55],
  ['flowers', 'deco', 'Flower pot', 15], ['bell', 'deco', 'Counter bell', 18], ['jar', 'deco', 'Tip jar', 18], ['plant', 'deco', 'Little tree', 22],
  ['balloons', 'deco', 'Balloons', 28], ['board', 'deco', 'Menu board', 30], ['bunting', 'deco', 'Bunting', 35], ['lantern', 'deco', 'Lantern', 40],
  ['bird', 'help', 'Helper bird', 80],
];
const SN_GROUPS = [['menu', 'New food'], ['awn', 'Awning'], ['sign', 'Sign'], ['ctr', 'Counter'], ['deco', 'Decorations'], ['help', 'Helper']];
const SN_AWN = { r: 'Red', b: 'Blue', g: 'Green', y: 'Yellow', v: 'Purple', p: 'Pink' };

/* ---- the save (S.snack): read with defaults, every value checked; coins can never go below 0 ---- */
const snNum = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(+v || 0)));
const snObj = v => (v && typeof v == 'object' && !Array.isArray(v) ? v : {});
function snS() {
  const r = (S.snack = snObj(S.snack));
  r.coins = snNum(r.coins, 0, 1e7);
  r.days = snNum(r.days, 0, 1e7);
  r.served = snNum(r.served, 0, 1e8);
  r.combo = snNum(r.combo, 0, 99);
  r.stars = snObj(r.stars);
  for (const k in r.stars) {
    if (!SN_PLACES.some(p => p.id === k)) delete r.stars[k];
    else r.stars[k] = snNum(r.stars[k], 0, 3);
  }
  r.own = snObj(r.own);
  for (const k in r.own) if (!SN_SHOP.some(x => x[0] === k)) delete r.own[k];
  if (!SN_AWN[r.awn] || (r.awn != 'r' && !r.own['awn-' + r.awn])) r.awn = 'r';
  if (!['wood', 'star', 'heart', 'lights'].includes(r.sign) || (r.sign != 'wood' && !r.own['sign-' + r.sign])) r.sign = 'wood';
  if (!['wood', 'mint', 'candy'].includes(r.ctr) || (r.ctr != 'wood' && !r.own['ctr-' + r.ctr])) r.ctr = 'wood';
  if (r.mode !== 'calm' && r.mode !== 'busy') r.mode = 'calm';
  r.till = !!r.till;
  if (!SN_PLACES.some(p => p.id === r.place) || !snPlaceOpen(SN_PLACES.find(p => p.id === r.place), r)) r.place = 'park';
  // G-04a2 fields, by id with defaults
  r.book = snObj(r.book);
  for (const k in r.book) {
    if (!SN_DISHES.some(d => d.id === k)) delete r.book[k];
    else r.book[k] = snNum(r.book[k], 0, 1e6);
  }
  r.cafe = snObj(r.cafe);
  for (const k in r.cafe) if (!SN_CAFE.some(x => x[0] === k)) delete r.cafe[k];
  r.kd = snObj(r.kd);
  for (const k in r.kd) {
    if (!SN_KINDS.some(x => x.id === k)) delete r.kd[k];
    else r.kd[k] = snNum(r.kd[k], 0, 3);
  }
  if (r.kind !== 'mix' && !(SN_KINDS.some(x => x.id === r.kind) && snKindOpen(r.kind, r))) r.kind = 'mix';
  r.tw = typeof r.tw == 'string' && r.tw.length < 12 ? r.tw : '';
  return r;
}
// the hub and the tests read without creating S.snack
const snPeek = () => (S.snack && typeof S.snack == 'object' && !Array.isArray(S.snack) ? S.snack : {});
const snStarsAll = (r = snPeek()) => SN_PLACES.reduce((a, p) => a + snNum((r.stars || {})[p.id], 0, 3), 0);
const snPlaceOpen = (pl, r = snPeek()) => snStarsAll(r) >= pl.need;
const snTillOK = () => (S.grade == null ? 0 : +S.grade) >= 2; // give change: 2nd grade and up
const snOwns = (r, id) => SN_FREE.includes(id) || !!snObj(r.own)[id];
// buy a shop item: true when bought; never takes more coins than there are
function snBuy(id) {
  const r = snS(), it = SN_SHOP.find(x => x[0] === id);
  if (!it || r.own[id] || r.coins < it[3]) return false;
  r.coins -= it[3];
  r.own[id] = 1;
  if (it[1] == 'awn') r.awn = id.slice(4);
  if (it[1] == 'sign') r.sign = id.slice(5);
  if (it[1] == 'ctr') r.ctr = id.slice(4);
  return true;
}
// the food a day at this place and in this mode can ask for: owned menu items, the place's special, pancakes only when Busy;
// G-04a2: the kind of day adds what it needs (ice cubes, the recipe kitchen) and may keep to fewer stations (at most 5 tabs)
const SN_KIND_ADD = { picky: ['icecube'], cold: ['icecube'], jelly: ['icecube'], recipe: ['toast', 'jam', 'honey', 'cream', 'banana', 'berries', 'yogurt', 'blend'],
  cocoa: ['cream', 'mallow'] };
const SN_KIND_ST = { recipe: ['kit', 'mix', 'juice', 'grill'], taste: ['ice', 'juice', 'treat'] };
function snHow(kind, place) {
  if (kind != 'place') return kind || 'plain';
  return ((SN_PLACES.find(p => p.id === place) || SN_PLACES[0]).day || {}).how || 'plain';
}
function snAvail(own, place, mode, kind) {
  const pl = SN_PLACES.find(p => p.id === place) || SN_PLACES[0], r = { own: own || {} };
  const how = snHow(kind, place), add = SN_KIND_ADD[how] || [], st = kind == 'place' ? pl.day.st : SN_KIND_ST[how];
  return Object.keys(SN_ING).filter(id => {
    if (st && !st.includes(SN_ING[id][1])) return false;
    if (SN_EXTRA.includes(id)) return add.includes(id);
    if (SN_PLACES.some(p => p.sp === id)) return id === pl.sp;
    if (id == 'pancake' && mode != 'busy') return false;
    return snOwns(r, id);
  });
}
// G-04a2: what is open and what comes next
const snStage = (r = snPeek()) => { const c = snObj(r.cafe); return c.diner ? 3 : c.cafe ? 2 : c.cart ? 1 : 0; };
const snCafeOpen = (r = snPeek()) => Object.keys(snObj(r.own)).filter(k => SN_SHOP.some(x => x[0] === k)).length >= SN_CAFE_OPEN || snNum(r.days, 0, 1e7) >= 8;
function snKindOpen(id, r = snPeek(), mode) {
  const k = SN_KINDS.find(x => x.id === id);
  if (!k || snNum(r.days, 0, 1e7) < k.days) return false;
  return !(k.busy && (mode || r.mode) != 'busy');
}
// the kind of the next day: the chosen one, or with Mix the open kinds in turn (taste tests in the mix only up to 1st grade)
function snKindFor(r = snPeek()) {
  if (r.kind && r.kind !== 'mix' && snKindOpen(r.kind, r)) return r.kind;
  const young = (S.grade == null ? 0 : +S.grade) <= 1;
  const open = SN_KINDS.filter(k => snKindOpen(k.id, r) && (k.id != 'taste' || young || snNum(r.days, 0, 1e7) < 2)).map(k => k.id);
  return open[snNum(r.days, 0, 1e7) % open.length] || 'plain';
}
const snKindName = (kind, place) => (kind == 'place' ? (SN_PLACES.find(p => p.id === place) || SN_PLACES[0]).day.name : (SN_KINDS.find(k => k.id === kind) || SN_KINDS[0]).name);
const snKindLine = (kind, place) => (kind == 'place' ? (SN_PLACES.find(p => p.id === place) || SN_PLACES[0]).day.line : (SN_KINDS.find(k => k.id === kind) || SN_KINDS[0]).line);
// a stable number from a text (today's guest, the special)
function snHash(s) {
  let h = 2166136261;
  for (const c of String(s)) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
// today's twist from the date: a guest who visits every place today and loves one food (the same all day, another tomorrow).
// Serving the guest pays +5 the first time that day; a missed day loses nothing.
const SN_FAV = ['van', 'straw', 'choc', 'mint', 'apple', 'grape', 'berry', 'cookie', 'cake', 'milk'];
const SN_FAV_FREE = { ice: 'van', juice: 'apple', treat: 'cookie' };
function snTwist(key) {
  const h = snHash('snack' + key), who = Object.keys(SN_WHO);
  return { key, who: who[h % who.length], fav: SN_FAV[(h >>> 8) % SN_FAV.length] };
}
// the dishes one place and mode can make (the special of the day and picky orders use them)
function snDishesFor(avail, place, mode, steps) {
  return SN_DISHES.filter(d => !!d.steps === !!steps && (!d.where || d.where === place) && (!d.busy || mode == 'busy') && d.items.every(i => avail.includes(i)));
}
// buy a café journey stage or upgrade: true when bought
function snCafeReady(id, r) {
  const it = SN_CAFE.find(x => x[0] === id);
  if (!it || !snCafeOpen(r)) return false;
  if (it[1] == 'stage') return id == 'cart' || (id == 'cafe' ? !!r.cafe.cart : !!r.cafe.cafe);
  return !!r.cafe[it[1]];
}
function snBuyCafe(id) {
  const r = snS(), it = SN_CAFE.find(x => x[0] === id);
  if (!it || r.cafe[id] || r.coins < it[3] || !snCafeReady(id, r)) return false;
  r.coins -= it[3];
  r.cafe[id] = 1;
  return true;
}
// the menu's next goal: the nearest thing to aim for, in a fixed order
function snNextGoal(r = snPeek()) {
  const days = snNum(r.days, 0, 1e7), stars = snStarsAll(r), coins = snNum(r.coins, 0, 1e7);
  const kn = SN_KINDS.find(k => days < k.days);
  if (kn && kn.days - days <= 2) return `Play ${kn.days - days} more day${kn.days - days > 1 ? 's' : ''} to open ${kn.id == 'place' ? 'each place\'s own day' : kn.name + ' days'}.`;
  const pn = SN_PLACES.find(p => !snPlaceOpen(p, r));
  if (pn && pn.need - stars <= 3) return `Win ${pn.need - stars} more star${pn.need - stars > 1 ? 's' : ''} to open ${pn.name}.`;
  const own = snObj(r.own), cafe = snObj(r.cafe);
  if (snCafeOpen(r)) {
    const st = SN_CAFE.find(x => x[1] == 'stage' && !cafe[x[0]]);
    if (st && snCafeReady(st[0], { cafe, own, days })) return coins >= st[3] ? `You can build the ${st[2]} in the shop!` : `Save ${st[3] - coins} more coins for the ${st[2]}.`;
  } else {
    const n = Object.keys(own).filter(k => SN_SHOP.some(x => x[0] === k)).length;
    if (kn) return `Play ${kn.days - days} more days to open ${kn.id == 'place' ? 'each place\'s own day' : kn.name + ' days'}.`;
    return `Buy ${SN_CAFE_OPEN - n} more things in the Stand shop to start the café journey.`;
  }
  if (kn) return `Play ${kn.days - days} more days to open ${kn.id == 'place' ? 'each place\'s own day' : kn.name + ' days'}.`;
  if (pn) return `Win ${pn.need - stars} more stars to open ${pn.name}.`;
  const up = SN_CAFE.find(x => !cafe[x[0]] && snCafeReady(x[0], { cafe, own, days }));
  if (up) return coins >= up[3] ? `You can buy the ${up[2]} for your ${SN_STAGES[snStage(r)]}!` : `Save ${up[3] - coins} more coins for the ${up[2]}.`;
  const book = snObj(r.book), miss = SN_DISHES.filter(d => !book[d.id]);
  if (miss.length) return `Fill your recipe book: ${SN_DISHES.length - miss.length} of ${SN_DISHES.length}. Next: ${miss[0].name}.`;
  const pl = SN_PLACES.find(p => snNum((r.stars || {})[p.id], 0, 3) < 3);
  if (pl) return `Win 3 stars at ${pl.name}.`;
  return 'Everything is done! Visit today\'s guest and keep your diner busy.';
}

/* ---- seeded randomness ---- */
function snRng(seed) {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const snPick = (rnd, a) => a[Math.floor(rnd() * a.length)];

/* ---- orders: only food on today's menu; Calm 1-3 things, Busy 2-6 with a side ---- */
function snOrder(rnd, avail, mode, place) {
  const has = id => avail.includes(id);
  const L = SN_FILL.filter(has), SC = avail.filter(i => SN_ING[i][1] == 'ice'), J = avail.filter(i => SN_ING[i][1] == 'juice');
  const T = avail.filter(i => SN_ING[i][1] == 'treat');
  const sp = (SN_PLACES.find(p => p.id === place) || {}).sp;
  const kinds = [];
  if (has('bread') && L.length) kinds.push('sand', 'sand');
  if (SC.length) kinds.push('ice', 'ice');
  if (J.length) kinds.push('juice');
  if (T.length) kinds.push('treat');
  if (mode == 'busy' && has('pancake')) kinds.push('pan', 'pan');
  const busy = mode == 'busy';
  const some = (list, lo, hi) => {
    const n = lo + Math.floor(rnd() * (hi - lo + 1)), out = [], one = snPick(rnd, list);
    for (let i = 0; i < n; i++) out.push(rnd() < .55 ? one : snPick(rnd, list)); // repeats are counting practice
    return out;
  };
  const main = k => {
    if (k == 'sand') return ['bread', ...some(L, 1, busy ? 3 : 1), 'bread'];
    if (k == 'ice') return some(SC, busy ? 2 : 1, 3);
    if (k == 'pan') return some(['pancake'], 1, 2);
    if (k == 'juice') return some(J, 1, busy ? 1 : 2);
    return some(T, 1, busy ? 2 : 3);
  };
  // the place's special turns up often (it is what the place is for)
  let o;
  const spK = sp && has(sp) ? SN_ING[sp][1] : '';
  const ks = kinds.filter(k => k != spK);
  if (spK && rnd() < .4) o = busy ? (ks.length ? main(snPick(rnd, ks)) : [sp]).concat([sp]) : [sp].concat(rnd() < .4 ? [sp] : []);
  else {
    const k = snPick(rnd, kinds);
    o = main(k);
    if (busy && o.length < 5 && rnd() < .65) {
      const side = [J.length ? 'juice' : '', T.length ? 'treat' : ''].filter(x => x && x != k);
      if (side.length) o = o.concat(snPick(rnd, side) == 'juice' ? [snPick(rnd, J)] : some(T, 1, 1));
    }
    if (busy && o.length < 2) o = o.concat(J.length ? [snPick(rnd, J)] : some(T, 1, 1));
  }
  return o.slice(0, busy ? 6 : 3);
}
const snPrice = order => order.reduce((a, id) => a + SN_ING[id][2], 0);
// what the customer pays with in Give change: the next of 5, 10, 20 above the price
const snPaid = price => [5, 10, 20, 50].find(v => v > price);
// G-04a2: a picky order from a named snack: "no tomato" (never the last filling, never the bread) or "extra cheese"; a drink with
// extra ice. base: the usual snack (the bubble shows it with the change); order: what goes on the plate.
function snPicky(rnd, dishes, avail, mode) {
  const J = avail.filter(i => SN_ING[i][1] == 'juice' && i != 'icecube'), max = mode == 'busy' ? 6 : 4;
  if (avail.includes('icecube') && J.length && rnd() < .35) {
    const d = snPick(rnd, J);
    return { order: [d, 'icecube'], base: [d], extra: 'icecube', what: SN_ING[d][0].toLowerCase() };
  }
  const cand = dishes.filter(d => d.items.some(i => i != 'bread'));
  if (!cand.length) return null;
  const d = snPick(rnd, cand), fill = d.items.filter(i => i != 'bread'), kinds = [...new Set(fill)];
  const canNo = kinds.filter(i => fill.some(x => x != i));
  if (canNo.length && (rnd() < .55 || d.items.length + 1 > max)) {
    const no = snPick(rnd, canNo);
    return { order: d.items.filter(i => i != no), base: d.items, no, what: d.name.toLowerCase() };
  }
  if (d.items.length + 1 > max) return null;
  const extra = snPick(rnd, kinds), order = d.items.slice();
  order.splice(order[order.length - 1] == 'bread' ? order.length - 1 : order.length, 0, extra);
  return { order, base: d.items, extra, what: d.name.toLowerCase() };
}
// a group order (party, parade, feast): one drink and one treat for every guest at the table (a band: three of the same),
// grouped on the bubble with a count
function snGroup(rnd, avail, size, how) {
  const J = avail.filter(i => SN_ING[i][1] == 'juice' && i != 'icecube'), T = avail.filter(i => SN_ING[i][1] == 'treat');
  const SC = avail.filter(i => SN_ING[i][1] == 'ice');
  const sp = avail.find(i => SN_PLACES.some(p => p.sp === i) && SN_ING[i][1] == 'treat');
  if (how == 'parade') {
    const all = T.concat(J, SC).filter(i => i != 'cake'), one = snPick(rnd, all.length ? all : avail), out = [one, one, one];
    if (size > 3) {
      const two = snPick(rnd, J.length ? J : all);
      out.push(two, two, two);
    }
    return out;
  }
  const drinks = J.length ? J : SC, treats = T.length ? T : SC, out = [];
  const d1 = snPick(rnd, drinks), d2 = rnd() < .5 ? snPick(rnd, drinks) : d1;
  const t1 = how == 'stars' && avail.includes('starc') ? 'starc' : sp && rnd() < .5 ? sp : snPick(rnd, treats), t2 = rnd() < .5 ? snPick(rnd, treats) : t1;
  for (let k = 0; k < size; k++) out.push(k < size - 1 ? d1 : d2);
  for (let k = 0; k < size; k++) out.push(k < size - 1 ? t1 : t2);
  if (avail.includes('cake') && size > 3) out[out.length - 1] = 'cake';
  return out;
}
// a day: 8-10 customers when Calm, 10-12 when Busy; the animals of the place, never the same one twice in a row.
// G-04a2: o.kind (an SN_KINDS id) shapes the orders; o.special picks the special of the day (else the seed does)
function snDayList(o) {
  const rnd = snRng(o.seed), pl = SN_PLACES.find(p => p.id === o.place) || SN_PLACES[0], kind = o.kind || 'plain', how = snHow(kind, pl.id);
  const busy = o.mode == 'busy', avail = snAvail(o.own, pl.id, o.mode, kind);
  let n = (busy ? 10 : 8) + Math.floor(rnd() * 3);
  if (how == 'taste') n = 6;
  if (how == 'rush') n = 14;
  if (how == 'party' || how == 'stars' || how == 'feast') n = busy ? 8 : 6;
  const dishes = snDishesFor(avail, pl.id, o.mode, false), recipes = snDishesFor(avail, pl.id, o.mode, true);
  let special = null;
  if (how == 'special') {
    const big = dishes.filter(d => d.items.length >= 2);
    special = dishes.find(d => d.id === o.special) || (big.length ? snPick(rnd, big) : dishes.length ? snPick(rnd, dishes) : null);
  }
  const list = [], J = avail.filter(i => SN_ING[i][1] == 'juice' && i != 'icecube'), plain = avail.filter(x => x != 'icecube');
  let last = '';
  for (let i = 0; i < n; i++) {
    let who = snPick(rnd, pl.who);
    if (who == last) who = pl.who[(pl.who.indexOf(who) + 1) % pl.who.length];
    last = who;
    const c = { i, who, name: SN_WHO[who] };
    let order = null;
    if (how == 'taste') {
      // "Can I taste an ice cream? You choose!": any one food of that station
      const sts = ['ice', 'juice', 'treat'].filter(k => plain.some(x => SN_ING[x][1] == k));
      const k = sts[i % sts.length];
      c.any = plain.filter(x => SN_ING[x][1] == k);
      c.ast = k;
      order = [c.any[0]];
    } else if (how == 'special' && special && i % 2 == 0) {
      order = special.items.slice();
      c.special = 1;
      c.dish = special.id;
    } else if (how == 'picky' && i % 2 == 1) {
      const pk = snPicky(rnd, dishes, avail, o.mode);
      if (pk) {
        order = pk.order;
        c.req = { base: pk.base, no: pk.no || '', extra: pk.extra || '', what: pk.what };
      }
    } else if ((how == 'party' || how == 'stars') && (i == 2 || i == n - 1) || how == 'feast' && i == n - 1 || how == 'parade' && i % 3 == 1) {
      order = snGroup(rnd, avail, how == 'parade' ? (busy ? 6 : 3) : busy ? 4 : 3, how);
      c.group = how == 'parade' ? 'band' : how == 'feast' ? 'feast' : 'party';
      if (how == 'feast' && pl.who.includes('lion')) {
        c.who = 'lion';
        c.name = 'King Leo';
      }
      const others = pl.who.filter(x => x != c.who);
      c.friends = [others[i % others.length], others[(i + 2) % others.length]];
    } else if ((how == 'recipe' || how == 'cocoa') && recipes.length && (how == 'cocoa' ? i % 2 == 0 : i % 4 != 3)) {
      const d = snPick(rnd, recipes);
      order = d.items.slice();
      c.steps = 1;
      c.dish = d.id;
    } else if (how == 'picnic') {
      const L = SN_FILL.filter(x => avail.includes(x)), T = avail.filter(x => SN_ING[x][1] == 'treat');
      order = ['bread', snPick(rnd, L.length ? L : ['cheese']), 'bread', snPick(rnd, J.length ? J : ['apple'])];
      if (busy && T.length) order.push(snPick(rnd, T));
    } else if (how == 'cold') {
      if (rnd() < .4 && J.length) {
        const d = snPick(rnd, J);
        order = [d, 'icecube'];
        c.req = { base: [d], no: '', extra: 'icecube', what: SN_ING[d][0].toLowerCase() };
      }
    } else if (how == 'harvest' || how == 'jelly') {
      const sp = how == 'harvest' ? 'corn' : 'jelly';
      if (avail.includes(sp)) {
        const side = plain.filter(x => x != sp && SN_ING[x][1] != 'sand' && SN_ING[x][1] != 'grill');
        order = [sp].concat(rnd() < .6 && side.length ? [snPick(rnd, side)] : rnd() < .5 ? [sp] : []);
        if (busy) order = order.concat(snOrder(rnd, plain, 'calm', pl.id)).slice(0, 6);
      }
    }
    if (!order) order = snOrder(rnd, plain, o.mode, pl.id);
    const price = snPrice(order);
    list.push(Object.assign(c, { order, price, paid: snPaid(price), pat: 26 + 7 * Math.min(order.length, 6) }));
  }
  return list;
}
// a small goal for the day (a skill to try; worth 5 coins). G-04a2: a kind of day has its own goal.
const SN_KGOAL = {
  special: ['special', 'Serve the special of the day 3 times', 3], picky: ['picky', 'Get 3 special requests right the first time', 3],
  party: ['party', 'Get a party order right the first time', 1], stars: ['party', 'Get a party order right the first time', 1],
  feast: ['party', 'Get the royal feast right the first time', 1], parade: ['party', 'Get 2 band orders right the first time', 2],
  recipe: ['steps', 'Make 3 recipes, every step in order', 3], cocoa: ['steps', 'Make 3 cocoas with cream, step by step', 3],
  taste: ['taste', 'Let the customers taste 4 different things', 4], rush: ['hearts', 'Serve 8 customers while their heart is still full of love', 8],
};
function snGoal(rnd, mode, till, own, how, list) {
  const k = SN_KGOAL[how];
  if (k && (how != 'rush' || mode == 'busy') && (how != 'special' || (list || []).some(c => c.special))) {
    if (how == 'taste') {
      const all = new Set();
      for (const c of list || []) for (const x of c.any || []) all.add(x);
      const n = Math.max(1, Math.min(4, all.size));
      return [k[0], n == 4 ? k[1] : `Let the customers taste ${n} different thing${n > 1 ? 's' : ''}`, n];
    }
    return k;
  }
  const g = [['first', 'Get 5 orders right the first time', 5], ['combo', 'Make 3 perfect orders in a row', 3]];
  if (mode == 'busy') g.push(['hearts', 'Serve 6 customers while their heart is still full of love', 6]);
  if (mode == 'busy' && snOwns({ own }, 'pancake')) g.push(['gold', 'Cook 2 golden pancakes', 2]);
  if (till) g.push(['change', 'Give the right change 3 times', 3]);
  return snPick(rnd, g);
}
// stars for a day: orders right the first time
const snStarsFor = (right, n) => (n && right / n >= .9 ? 3 : n && right / n >= .6 ? 2 : 1);

/* ---- the day simulation (no DOM). o: {seed, mode, place, own, grade, till, slots, kind, special, guest: {who, fav}} ---- */
const SN_COOK = [3, 7]; // a pancake is golden from 3 s to 7 s on the grill; later it is toasty (never burnt)
function snNew(o) {
  const mode = o.mode == 'busy' ? 'busy' : 'calm', seed = (o.seed >>> 0) || 1, place = o.place || 'park', kind = o.kind || 'plain';
  const how = snHow(kind, place), list = snDayList({ seed, mode, place, own: o.own || {}, kind, special: o.special });
  // today's guest takes the place of the third customer, with a plain order of the food they love
  if (o.guest && SN_WHO[o.guest.who] && list.length > 3) {
    const avail = snAvail(o.own || {}, place, mode, kind).filter(x => !SN_EXTRA.includes(x));
    const alt = SN_FAV_FREE[(SN_ING[o.guest.fav] || [])[1]];
    const f = avail.includes(o.guest.fav) ? o.guest.fav : avail.includes(alt) ? alt : SN_FAV.find(x => avail.includes(x));
    if (f) {
      const order = mode == 'busy' ? [f, f] : [f], price = snPrice(order);
      list[2] = { i: 2, who: o.guest.who, name: SN_WHO[o.guest.who], order, price, paid: snPaid(price), pat: 40, guest: 1 };
    }
  }
  const g = snGoal(snRng(seed * 7 + 3), mode, !!o.till, o.own || {}, how, list);
  const sp = list.find(c => c.special);
  return {
    seed, mode, place, kind, how, till: !!o.till, list, n: list.length, next: 0, at: [], sel: 0,
    slots: mode == 'busy' ? Math.max(2, Math.min(3, o.slots || 2)) : 1, clock: 0, nextAt: .6,
    plate: [], pq: [], pans: [null, null], served: 0, right: 0, combo: 0, best: 0, coins: 0, hearts: 0, golds: 0, changes: 0,
    goal: { id: g[0], text: g[1], need: g[2], got: 0, done: false }, pay: null, done: false, ev: [],
    special: sp ? sp.dish : '', made: {}, tasted: {}, guest: 0,
  };
}
const snKey = a => a.slice().sort().join(',');
function snGoalAdd(st, id, n = 1) {
  const g = st.goal;
  if (g.id === id && !g.done) {
    g.got += n;
    if (g.got >= g.need) {
      g.done = true;
      st.ev.push(['goal']);
    }
  }
}
function snStep(st, dt) {
  if (st.done) return;
  st.clock += dt;
  // patience (Busy) drains only while nobody is paying at the till
  if (st.mode == 'busy' && !st.pay) for (const c of st.at) if (c.state == 'wait' && c.pat > 0) {
    c.pat = Math.max(0, c.pat - dt);
    if (!c.pat) st.ev.push(['tired', c]);
  }
  for (let k = 0; k < st.pans.length; k++) {
    const p = st.pans[k];
    if (!p) continue;
    const t0 = p.t;
    p.t += dt;
    if (t0 < SN_COOK[0] && p.t >= SN_COOK[0]) st.ev.push(['gold', k]);
  }
  // happy customers walk off
  for (const c of st.at.slice()) if (c.state == 'happy' && st.clock >= c.leave) {
    st.at.splice(st.at.indexOf(c), 1);
    st.ev.push(['leave', c]);
    if (st.sel >= st.at.length) st.sel = 0;
    if (st.mode == 'calm') st.nextAt = st.clock + .7;
    else st.nextAt = st.at.length ? Math.max(st.nextAt, st.clock + 1.2) : st.clock + 1;
  }
  // the next customer comes when there is room
  if (st.next < st.n && st.at.length < st.slots && st.clock >= st.nextAt) {
    const c = Object.assign({}, st.list[st.next++], { state: 'wait', tries: 0, patMax: 0, came: st.clock });
    c.patMax = c.pat;
    st.at.push(c);
    st.ev.push(['arrive', c]);
    st.nextAt = st.mode == 'calm' ? 1e9 : st.how == 'rush' ? st.clock + (st.at.length < 2 ? 1.5 : 3.5 + snRng(st.seed + st.next)() * 2) :
      st.clock + (st.at.length < 2 ? 2.5 : 7 + snRng(st.seed + st.next)() * 4);
  }
  if (st.next >= st.n && !st.at.length && !st.pay) {
    st.done = true;
    st.ev.push(['closed']);
  }
}
// put a food on the plate (pancakes go on the grill first); false when it cannot go anywhere
function snAdd(st, id) {
  if (!SN_ING[id] || st.pay) return false;
  if (id == 'pancake') {
    const k = st.pans.indexOf(null);
    if (k < 0) return false;
    st.pans[k] = { t: 0 };
    return 'grill';
  }
  if (st.plate.length >= 8) return false;
  // G-04a2: a recipe is made step by step: while the plate follows the chosen customer's steps, only the next step goes on
  if (snStepNext(st) && id !== snStepNext(st)) return 'step';
  st.plate.push(id);
  return true;
}
// the next step of the chosen customer's recipe while the plate follows it ('' when there is no recipe to follow)
function snStepNext(st) {
  const c = st.at[st.sel];
  if (!c || c.state != 'wait' || !c.steps || st.plate.length >= c.order.length) return '';
  return st.plate.every((x, j) => x === c.order[j]) ? c.order[st.plate.length] : '';
}
const snDone = t => (t < SN_COOK[0] ? 'pale' : t < SN_COOK[1] ? 'gold' : 'toast');
function snPan(st, k) {
  const p = st.pans[k];
  if (!p || st.plate.length >= 8) return false;
  st.pans[k] = null;
  st.plate.push('pancake');
  st.pq.push(snDone(p.t));
  return snDone(p.t);
}
function snUndo(st) {
  if (!st.plate.length || st.pay) return false;
  const id = st.plate.pop();
  if (id == 'pancake') st.pq.pop();
  return id;
}
// what is still missing for a customer and what is extra on the plate
function snDiff(order, plate) {
  const need = {}, missing = [], extra = [];
  for (const id of order) need[id] = (need[id] || 0) + 1;
  for (const id of plate) {
    if (need[id]) need[id]--;
    else extra.push(id);
  }
  for (const id in need) for (let i = 0; i < need[id]; i++) missing.push(id);
  return { missing, extra };
}
// does this plate fit this customer? A taste test takes any one food of its station; a recipe needs its steps in order
function snFits(c, plate) {
  if (c.any) return plate.length == 1 && c.any.includes(plate[0]);
  if (c.steps) return plate.join() === c.order.join();
  return snKey(c.order) === snKey(plate);
}
// the named snack a plate makes (the recipe book): a recipe by its customer, else a dish with exactly these things
const snDishOf = (c, plate) => (c.dish && !c.req ? c.dish : ((SN_DISHES.find(d => !d.steps && snKey(d.items) === snKey(plate)) || {}).id || ''));
// serve the plate: to the customer whose order it is (the chosen one first), else it is a try for the chosen one
function snServe(st) {
  if (!st.plate.length || st.pay) return { empty: true };
  const wait = st.at.filter(c => c.state == 'wait');
  if (!wait.length) return { empty: true };
  const chosen = st.at[st.sel] && st.at[st.sel].state == 'wait' ? st.at[st.sel] : null;
  const c = chosen && snFits(chosen, st.plate) ? chosen : wait.find(x => snFits(x, st.plate));
  if (!c) {
    const t = chosen || wait[0];
    t.tries++;
    st.combo = 0;
    return Object.assign({ ok: false, c: t }, t.any ? { missing: [], extra: st.plate.slice() } : snDiff(t.order, st.plate));
  }
  if (c.any) {
    c.order = st.plate.slice();
    c.price = snPrice(c.order);
    c.paid = snPaid(c.price);
  }
  const first = !c.tries, heart = st.mode == 'calm' || c.pat > 0;
  const gold = st.pq.every(q => q == 'gold');
  const perfect = first && heart && gold;
  const tip = !first ? 0 : st.mode == 'busy' ? (heart ? 2 : 0) + (st.pq.length && gold ? 1 : 0) : 1;
  if (first) st.right++;
  st.combo = perfect ? st.combo + 1 : 0;
  st.best = Math.max(st.best, st.combo);
  const bonus = perfect && st.combo % 3 == 0 ? 3 : 0;
  // G-04a2: the kinds of days pay a little extra for the harder orders, and today's guest +5 (the first time a day: snDay passes
  // the guest only then)
  const extra = (c.special ? 2 : 0) + (c.req && first ? 2 : 0) + (c.group && first ? 5 : 0) + (c.steps && first ? 2 : 0) + (c.guest ? 5 : 0);
  const pay = c.price + tip + bonus + extra;
  st.coins += pay;
  st.golds += st.pq.filter(q => q == 'gold').length;
  if (first) snGoalAdd(st, 'first');
  if (st.combo >= 3) snGoalAdd(st, 'combo', 3);
  if (st.mode == 'busy' && c.pat > 0) {
    st.hearts++;
    snGoalAdd(st, 'hearts');
  }
  snGoalAdd(st, 'gold', st.pq.filter(q => q == 'gold').length);
  if (c.special) snGoalAdd(st, 'special');
  if (c.req && first) snGoalAdd(st, 'picky');
  if (c.group && first) snGoalAdd(st, 'party');
  if (c.steps) snGoalAdd(st, 'steps');
  if (c.any && !st.tasted[c.order[0]]) {
    st.tasted[c.order[0]] = 1;
    snGoalAdd(st, 'taste');
  }
  if (c.guest) st.guest = 1;
  const dish = snDishOf(c, st.plate);
  if (dish) st.made[dish] = (st.made[dish] || 0) + 1;
  const pq = st.pq.slice();
  st.plate = [];
  st.pq = [];
  st.served++;
  c.state = 'happy';
  c.leave = st.clock + (c.group ? 2 : 1.4);
  if (st.till) {
    c.state = 'pay';
    st.pay = { c, price: c.price, paid: c.paid, change: c.paid - c.price, tries: 0 };
  }
  return { ok: true, c, first, perfect, tip, bonus, extra, pay, pq, dish };
}
// give change: coins is the list of coins the child put in the tray
function snChange(st, coins) {
  const p = st.pay;
  if (!p) return null;
  const sum = coins.reduce((a, b) => a + b, 0), ok = sum === p.change;
  if (!ok) {
    p.tries++;
    return { ok: false, sum, tries: p.tries, change: p.change };
  }
  const bonus = p.tries ? 0 : 1;
  st.coins += bonus;
  st.changes++;
  if (!p.tries) snGoalAdd(st, 'change');
  p.c.state = 'happy';
  p.c.leave = st.clock + 1.2;
  st.pay = null;
  return { ok: true, bonus };
}

/* ---- drawings: food and stand pieces on a 64 x 64 grid (ART rules), the plate, the stand, the places, the hub card ---- */
// one drawing scaled into a box (a nested svg keeps the 64 grid; no transforms needed)
const snIn = (x, y, s, inner, vb = 64) => `<svg x="${gh1(x)}" y="${gh1(y)}" width="${gh1(s)}" height="${gh1(s)}" viewBox="0 0 ${vb} ${vb}">${inner}</svg>`;
// a wobbly closed shape (leaves, puffs) smoothed through the midpoints
function snBlob(cx, cy, rx, ry, k, amp, ph = 0) {
  const pts = [];
  for (let i = 0; i < 36; i++) {
    const a = i / 36 * Math.PI * 2, m = 1 + amp * Math.sin(a * k + ph);
    pts.push([cx + Math.cos(a) * rx * m, cy + Math.sin(a) * ry * m]);
  }
  let d = '';
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    d += (i ? 'Q' : `M${gh1((pts[35][0] + p[0]) / 2)} ${gh1((pts[35][1] + p[1]) / 2)}Q`) + `${gh1(p[0])} ${gh1(p[1])} ${gh1(mx)} ${gh1(my)}`;
  }
  return d + 'Z';
}
// a scoop of ice cream (h: flavour hue) centred at x, y, radius r
const snScoop = (x, y, r, h) => ghC(x + r * .08, y + r * .1, r, h + '2') + ghC(x - r * .06, y - r * .06, r * .9, h) +
  ghP(`M${gh1(x - r)} ${gh1(y + r * .25)}Q${gh1(x - r * .7)} ${gh1(y + r * .75)} ${gh1(x - r * .35)} ${gh1(y + r * .45)}Q${gh1(x - r * .1)} ${gh1(y + r * .95)} ` +
    `${gh1(x + r * .2)} ${gh1(y + r * .5)}Q${gh1(x + r * .55)} ${gh1(y + r * .85)} ${gh1(x + r * .75)} ${gh1(y + r * .45)}Q${gh1(x + r)} ${gh1(y + r * .55)} ` +
    `${gh1(x + r * 1.02)} ${gh1(y + r * .2)}Z`, h + '2') +
  ghE(x - r * .4, y - r * .42, r * .34, r * .22, h + '1', .9, -35) + ghC(x - r * .55, y - r * .55, r * .1, 'w', .8) +
  (h == 'g' ? ghC(x + r * .3, y - r * .1, r * .1, 'n2') + ghC(x - r * .1, y + r * .25, r * .09, 'n2') + ghC(x + r * .05, y - r * .5, r * .08, 'n2') : '');
// a waffle cone: tip at (x, y + h), top centre (x, y), top width w
const snCone = (x, y, w, h) => ghP(`M${gh1(x - w / 2)} ${gh1(y)}L${gh1(x + w / 2)} ${gh1(y)}L${gh1(x + 1)} ${gh1(y + h)}Q${gh1(x)} ${gh1(y + h + 2)} ${gh1(x - 1)} ${gh1(y + h)}Z`, 't2') +
  ghP(`M${gh1(x - w / 2 + .5)} ${gh1(y)}L${gh1(x + w / 2 - 3)} ${gh1(y)}L${gh1(x - .5)} ${gh1(y + h - 3)}Z`, 't') +
  ghL(`M${gh1(x - w * .3)} ${gh1(y + h * .12)}L${gh1(x + w * .2)} ${gh1(y + h * .6)}M${gh1(x - w * .02)} ${gh1(y + h * .05)}L${gh1(x + w * .32)} ${gh1(y + h * .3)}` +
    `M${gh1(x + w * .3)} ${gh1(y + h * .1)}L${gh1(x - w * .18)} ${gh1(y + h * .62)}M${gh1(x + w * .02)} ${gh1(y + h * .05)}L${gh1(x - w * .34)} ${gh1(y + h * .32)}`, 't3', gh1(w * .045), .55) +
  ghR(x - w / 2 - .5, y - 1.5, w + 1, 3.6, 1.8, 't2');
// a glass of juice (h: the juice colour) with a straw; x, y top left of a 64 box at scale s
function snGlass(h, x = 0, y = 0, s = 1) {
  const P = (a, b) => `${gh1(x + a * s)} ${gh1(y + b * s)}`;
  return ghE(x + 32 * s, y + 60 * s, 16 * s, 2.6 * s, 'k', .13) +
    ghP(`M${P(13, 14)}L${P(49, 14)}L${P(45, 57)}Q${P(44.6, 61)} ${P(41, 61)}L${P(22, 61)}Q${P(18.4, 61)} ${P(18, 57)}Z`, 'e1') +
    ghP(`M${P(15, 16)}L${P(47, 16)}L${P(43.4, 56)}Q${P(43, 59)} ${P(40, 59)}L${P(23, 59)}Q${P(20, 59)} ${P(19.6, 56)}Z`, 'w') +
    ghP(`M${P(16.4, 27)}L${P(45.6, 27)}L${P(43, 55.5)}Q${P(42.7, 58)} ${P(40, 58)}L${P(23, 58)}Q${P(20.3, 58)} ${P(20, 55.5)}Z`, h + '2') +
    ghP(`M${P(16.6, 27)}L${P(43, 27)}L${P(40.6, 54)}Q${P(40.3, 56)} ${P(38, 56)}L${P(23.4, 56)}Q${P(21.3, 56)} ${P(21, 54)}Z`, h) +
    ghE(x + 31 * s, y + 27 * s, 14.6 * s, 2.6 * s, h + '1') +
    ghL(`M${P(35, 27)}L${P(42, 5)}L${P(50, 5)}`, 'r', gh1(3.2 * s)) + ghL(`M${P(35, 27)}L${P(42, 5)}`, 'r1', gh1(1.1 * s), .8) +
    ghR(x + 21 * s, y + 20 * s, 3.2 * s, 32 * s, 1.6 * s, 'w', .75);
}
const snOrangeArt = () => ghShad(32, 58, 19, 3) + ghC(33, 35, 22, 'o2') + ghC(31, 33, 20, 'o') + ghE(24, 25, 7, 4.5, 'o1', .9, -35) +
  ghC(22, 23, 2, 'w', .7) + ghC(31, 14, 2.4, 'n3') + ghP('M32 14C35 6 43 5 49 8C45 15 38 16 32 14Z', 'g') + ghP('M32 14C38 12 44 10 49 8C45 15 38 16 32 14Z', 'g2') +
  ghC(38, 40, 1, 'o2', .8) + ghC(28, 44, 1, 'o2', .8) + ghC(41, 30, .9, 'o2', .8);
const snBerryArt = () => ghShad(32, 59, 15, 3) +
  ghP('M32 58C20 52 11 40 12 28C13 19 22 15 32 18C42 15 51 19 52 28C53 40 44 52 32 58Z', 'r2') +
  ghP('M31 55C20 49 12.5 39 13.5 28C14.5 20 22 17 31 19.5C40 17 48 20 49 28C50 38 42 49 31 55Z', 'r') +
  ghE(21, 27, 4, 6, 'r1', .8, 20) +
  [[22, 34], [30, 30], [38, 32], [26, 42], [35, 41], [31, 49], [43, 38], [18, 40]].map(([x, y]) => ghE(x, y, 1.2, 1.7, 'y1')).join('') +
  ghP('M32 19L22 13L28 13L26 6L32 12L38 6L36 13L42 13Z', 'g2') + ghP('M31.5 18L23 13.6L28 13L26.6 7.4L31.6 12L36.8 7L35 13L40 13.4Z', 'g');
// the food buttons' and order bubbles' pictures (64 grid); ART drawings where the app has them
const SN_ART = {
  bread: () => ART.bread, cheese: () => ART.cheese, egg: () => ART.egg, cookie: () => ART.cookie, cake: () => ART.cake, milk: () => ART.milk,
  pizza: () => ART.pizza,
  tomato: () => ghShad(32, 58, 20, 3.4) + ghC(33, 36, 21.5, 'r2') + ghC(31, 34, 19.4, 'r') + ghE(22.5, 26, 6, 4, 'r1', .9, -35) + ghC(20, 23, 2.2, 'w', .8) +
    ghP('M32 17L27 9L33.5 13L38 8L36.6 15L44 15L37 19L39 25L32 20.5L25.4 24.6L27 18.6L20 17L27.6 15Z', 'g2') +
    ghP('M31.4 16.4L27 9.4L33 13L37.4 8.6L36 15L42.6 15.2L36.4 18.6L38 24L31.6 20L26 23.6L27.4 18L21.4 16.8L28 15Z', 'g') + ghR(30.6, 6, 3, 8, 1.5, 'g3'),
  lettuce: () => ghShad(32, 59, 22, 3) + ghP(snBlob(33, 34, 25, 22, 9, .08, .4), 'g2') + ghP(snBlob(31, 32, 23, 20, 9, .08, .4), 'g') +
    ghP(snBlob(27, 27, 13, 10, 7, .1, 1), 'g1', .75) + ghL('M33 54Q31 38 22 22M32 42L44 30M31 47L20 38M33 35L40 24', 'g3', 2, .55) +
    ghL('M32 52Q30 38 22 23', 'g1', 1.2, .8),
  van: () => ghShad(32, 61, 10, 2) + snCone(32, 33, 24, 27) + snScoop(32, 23, 15, 'm'),
  straw: () => ghShad(32, 61, 10, 2) + snCone(32, 33, 24, 27) + snScoop(32, 23, 15, 'p'),
  choc: () => ghShad(32, 61, 10, 2) + snCone(32, 33, 24, 27) + snScoop(32, 23, 15, 'n'),
  mint: () => ghShad(32, 61, 10, 2) + snCone(32, 33, 24, 27) + snScoop(32, 23, 15, 'g'),
  apple: () => snGlass('y') + snIn(32, 30, 32, ART.apple),
  grape: () => snGlass('v') + snIn(32, 30, 32, ART.grapes),
  berry: () => snGlass('p') + snIn(33, 31, 31, snBerryArt()),
  orange: () => snGlass('o') + snIn(33, 31, 31, snOrangeArt()),
  cocoa: () => ghShad(30, 59, 20, 3) + ghL('M46 28Q58 27 56 40Q54 50 44 49', 'r2', 6) + ghL('M45.5 28.5Q55 28 53.5 39.5Q52 47.6 44 47', 'r', 3) +
    ghR(10, 20, 38, 39, 9, 'r2') + ghR(10, 19, 35.4, 37, 8.6, 'r') + ghR(14, 24, 4.6, 26, 2.3, 'r1', .7) +
    ghE(28.5, 21, 17.6, 5, 'r3') + ghE(28.5, 21.8, 15.4, 3.8, 'n2') + ghE(27.6, 21.2, 13, 2.8, 'n') +
    ghR(18, 14, 9, 7, 2.4, 'w3') + ghR(17.4, 13.4, 8, 6, 2.4, 'w') + ghR(29, 13, 9, 7, 2.4, 'w3') + ghR(28.4, 12.4, 8, 6, 2.4, 'w') +
    ghL('M22 9Q19 5 22 1.6M34 8Q31 4.4 34 1', 'e1', 2, .9),
  starc: () => ghShad(32, 58, 20, 3) + `<path ${ghF('t2')} d="${rwStarD(33.4, 35, 26, 13)}"/>` + `<path ${ghF('t')} d="${rwStarD(31.6, 33.2, 23.4, 11.8)}"/>` +
    `<path ${ghF('y1')} opacity=".85" d="${rwStarD(31.6, 33.2, 15, 7.6)}"/>` + ghC(31.6, 33, 2.4, 'p') + ghC(24, 29.6, 1.6, 'b') + ghC(38.6, 29.4, 1.6, 'g') +
    ghC(27, 40, 1.6, 'r') + ghC(36.6, 40, 1.6, 'v') + ghC(26, 22, 1.7, 'w', .7),
  pancake: () => ghShad(32, 58, 26, 3.4) + ghE(32, 54, 27, 6.4, 'w3') + ghE(32, 52.8, 25.6, 5.6, 'w') +
    [0, 1, 2].map(i => {
      const y = 46 - i * 8;
      return ghE(32, y + 1.4, 21.4, 6.2, 't3') + ghE(32, y, 21.4, 5.8, 'y2') + ghE(31, y - 1.4, 19.6, 4.4, 'y') + ghE(26, y - 2.4, 7, 1.4, 'y1', .8);
    }).join('') + ghR(27, 22.4, 11, 6.4, 2, 'y2') + ghR(26.4, 21.8, 10, 5.4, 2, 'y1') +
    ghP('M42 28Q45 32 44 38Q44 41 42.4 41Q41 41 41.2 38Q41 33 38 30Z', 'n2', .85),
  // G-04a2 foods
  icecube: () => ghShad(32, 58, 22, 3) + snCube(10, 34, 20) + snCube(34, 36, 18) + snCube(21, 14, 19),
  toast: () => ghShad(32, 59, 22, 3) + ghP(SN_SLICE, 'n2') + ghP('M17 52V31Q11.6 27 13 20Q16 11 32 11Q48 11 51 20Q52.4 27 47 31V52Q47 55 44 55H20Q17 55 17 52Z', 't') +
    ghP('M20 50V32Q15.6 28.4 16.6 22Q19 14 32 14Q45 14 47.4 22', 't1', .7) + ghL('M22 26L40 44M22 36L32 46M30 20L44 34', 'n', 2.4, .55) + ghE(24, 20, 5, 2, 'w', .45, -20),
  jam: () => ghShad(32, 60, 17, 3) + ghR(15, 22, 34, 37, 9, 'r3') + ghR(16, 22, 31, 35, 8, 'r') + ghR(19, 25, 4, 26, 2, 'r1', .7) +
    ghR(21, 34, 22, 14, 4, 'w') + ghC(32, 41, 3.6, 'r2') + ghC(31, 40, 2.6, 'r') + ghR(13, 12, 38, 11, 4, 'w3') + ghR(13, 11, 36, 9, 4, 'w') +
    [17, 25, 33, 41].map(x => ghR(x, 12, 4, 7, 1, 'r', .8)).join(''),
  honey: () => ghShad(32, 60, 19, 3) + ghE(32, 41, 19, 18, 'o2') + ghE(31, 40, 17.6, 16.6, 'y2') + ghE(25, 33, 6, 4, 'y1', .8, -30) +
    ghR(18, 19, 28, 7, 3, 'o2') + ghR(18, 18, 26, 6, 3, 'y') + ghP('M22 26Q22 36 25 36Q28 36 27 26Z', 'y2') + ghL('M40 22L54 6', 'n2', 3.4) + ghE(53, 7, 4, 3, 'n', 1, -40),
  cream: () => ghShad(32, 60, 20, 3) + ghP('M10 40H54Q52 58 32 58Q12 58 10 40Z', 'b2') + ghP('M12 40H52Q50 55 32 55Q14 55 12 40Z', 'b') +
    ghE(32, 40, 22, 4, 'b1') + ghP('M14 40Q12 30 22 28Q20 18 32 16Q42 14 42 26Q52 26 50 40Z', 'w3') + ghP('M16 39Q14 31 23 29.4Q21.6 20 32 18Q40 17 40.4 27.4Q48.6 28 47.6 39Z', 'w') +
    ghP('M24 30Q30 24 36 28', 'w2', .9) + ghE(26, 24, 4, 2.4, 'w', .9, -20) + ghL('M30 15Q33 9 36 12', 'w3', 3),
  mallow: () => ghShad(32, 59, 22, 3) + ghR(9, 26, 24, 30, 9, 'p2') + ghR(10, 26, 21, 28, 8, 'p') + ghE(20.5, 28, 10.5, 5, 'p1') +
    ghR(31, 30, 24, 26, 9, 'w3') + ghR(32, 30, 21, 24, 8, 'w') + ghE(42.5, 32, 10.5, 5, 'w2') + ghE(40, 31.4, 6, 2.4, 'w', .9),
  banana: () => ART.banana,
  berries: () => ghShad(32, 58, 22, 3) + [[22, 40, 11], [40, 42, 10], [31, 27, 10], [30, 48, 9]].map(([x, y, r]) =>
    ghC(x + 1, y + 1, r, 'b3') + ghC(x, y, r * .92, 'b2') + ghC(x - r * .1, y - r * .1, r * .75, 'b') + ghC(x - r * .35, y - r * .4, r * .2, 'b1') +
    ghP(`M${x - 2.4} ${y - r * .1}l2.4 -2.4l2.4 2.4l-2.4 1.6Z`, 'v3', .8)).join('') + ghP('M30 18Q32 8 40 8Q38 16 31 18Z', 'g'),
  yogurt: () => ghShad(32, 60, 17, 3) + ghP('M14 20H50L45 58Q44.6 60 42 60H22Q19.4 60 19 58Z', 'w3') + ghP('M15 20H48L43.6 56Q43.2 58 41 58H23Q20.8 58 20.4 56Z', 'w') +
    ghP('M17 32H46.6L45.4 44H18.6Z', 'p') + ghC(32, 38, 4, 'p2') + ghC(31, 37, 3, 'r') + ghR(12, 15, 40, 7, 3, 'e2') + ghR(12, 14, 38, 6, 3, 'e1') +
    ghR(18, 24, 3, 28, 1.5, 'w2', .8),
  blend: () => ghShad(32, 60, 19, 3) + ghR(16, 46, 32, 14, 4, 'e3') + ghR(16, 45, 30, 13, 4, 'e2') + ghC(31, 52, 3, 'r') + ghC(30.4, 51.4, 1.4, 'r1') +
    ghP('M18 10H46L42 45H22Z', 'e1', .9) + ghP('M19 12H44L40.6 44H23.4Z', 'w') + ghP('M20.6 26H42.8L40.6 44H23.4Z', 'p2') + ghP('M20.6 26H40L38.6 42H23.6Z', 'p') +
    ghE(31, 26, 11, 2.4, 'p1') + ghR(16, 6, 32, 6, 3, 'e3') + ghR(16, 5, 30, 5, 2.5, 'e2') + ghR(22, 14, 3, 26, 1.5, 'w2', .8) +
    ghL('M44 18Q52 18 52 28Q52 36 44 38', 'e2', 3),
  corn: () => ghShad(32, 59, 22, 3) + ghP('M18 52Q8 40 14 20Q22 34 30 50Z', 'g2') + ghP('M46 52Q56 40 50 20Q42 34 34 50Z', 'g2') +
    ghE(32, 33, 11, 24, 'y3') + ghE(31, 32, 10, 23, 'y2') + ghE(30, 30, 8.6, 20.6, 'y') +
    [-5, 0, 5].map(dx => [14, 20, 26, 32, 38, 44].map(y => ghE(30 + dx * (1 - Math.abs(y - 30) / 40), y, 2.1, 2.5, 'y1', .85)).join('')).join('') +
    ghP('M20 56Q14 46 18 28Q24 42 32 56Z', 'g') + ghP('M44 56Q50 46 46 28Q40 42 32 56Z', 'g') + ghL('M22 50Q20 40 21 34', 'g1', 1.4, .8),
  pie: () => ghShad(32, 58, 24, 3) + ghP('M8 46L32 14L56 46Z', 'r3') + ghP('M8 46L56 46L56 54Q32 60 8 54Z', 't2') + ghP('M8 46L56 46L55 51Q32 56 9 51Z', 't') +
    ghP('M10 45L32 16L54 45Z', 'r') + ghP('M14 42L32 18L36 22L20 42Z', 'r1', .5) +
    ghL('M18 34L44 40M24 26L48 34M22 42L36 22M34 44L44 30', 't1', 3.2) + ghL('M8 46Q32 40 56 46', 't3', 1.4, .6),
  jelly: () => ghShad(32, 59, 24, 3) + ghE(32, 54, 26, 6, 'w3') + ghE(32, 52.6, 24.6, 5, 'w') +
    ghP('M12 52Q10 30 20 22Q32 14 44 22Q54 30 52 52Z', 'p3') + ghP('M13 51Q12 31 21 24Q32 17 43 24Q51 31 50 51Z', 'p') +
    ghL('M20 50V30M32 51V22M44 50V30', 'p2', 3, .7) + ghP('M18 30Q20 24 27 22Q22 28 21 40Z', 'p1', .8) + ghC(32, 15, 5, 'r2') + ghC(31, 14, 4.2, 'r') +
    ghC(29.6, 12.6, 1.2, 'r1') + ghL('M32 10Q34 4 39 4', 'g2', 1.6),
};
// a bread slice outline (toast) and a little ice cube (G-04a2)
const SN_SLICE = 'M14 54V30Q8 26 10 18Q14 8 32 8Q50 8 54 18Q56 26 50 30V54Q50 58 46 58H18Q14 58 14 54Z';
const snCube = (x, y, s) => ghR(x + 1, y + 1, s, s, gh1(s * .25), 'c3') + ghR(x, y, s, s, gh1(s * .25), 'c1') + ghR(x + s * .1, y + s * .1, s * .8, s * .8, gh1(s * .2), 'w', .55) +
  ghR(x + s * .18, y + s * .16, s * .3, s * .16, gh1(s * .08), 'w', .9);
const snPic = (id, size = '100%', cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 64 64" width="${size}" height="${size}" ` +
  `aria-hidden="true" focusable="false">${SN_ART[id] ? SN_ART[id]() : ''}</svg>`;

/* the plate on the counter: the snack builds up as it is made (sandwich stack, pancakes, a cone, glasses, treats) */
function snLayer(id, gx, y, top) {
  if (id == 'bread' && top) return { h: 15, d: ghP(`M${gx - 34} ${y}Q${gx - 35} ${y - 16} ${gx} ${y - 17}Q${gx + 35} ${y - 16} ${gx + 34} ${y}Z`, 'n2') +
    ghP(`M${gx - 33} ${y - 1}Q${gx - 33} ${y - 15} ${gx - 1} ${y - 16}Q${gx + 31} ${y - 15} ${gx + 31} ${y - 1}Z`, 'n') +
    ghP(`M${gx - 28} ${y - 4}Q${gx - 27} ${y - 13} ${gx - 2} ${y - 13.6}Q${gx + 10} ${y - 13.4} ${gx + 18} ${y - 11}`, 'n1', .6) + ghE(gx - 14, y - 10, 6, 1.8, 'w', .5, -8) };
  if (id == 'bread') return { h: 10, d: ghR(gx - 34, y - 10, 68, 10, 4.5, 'n2') + ghR(gx - 34, y - 10.6, 66, 9, 4.2, 'n') + ghR(gx - 31, y - 9, 61, 5.4, 2.7, 't1') };
  if (id == 'cheese') return { h: 5, d: ghP(`M${gx - 35} ${y - 5}H${gx + 35}V${y}L${gx + 30} ${y + 5}L${gx + 27} ${y}H${gx - 8}L${gx - 11} ${y + 4}L${gx - 14} ${y}H${gx - 28}L${gx - 35} ${y + 6}Z`, 'y2') +
    ghR(gx - 35, y - 5.4, 69, 3.6, 1.6, 'y') + ghC(gx + 12, y - 3, 1.2, 'y3') + ghC(gx - 20, y - 2.6, 1, 'y3') };
  if (id == 'tomato') return { h: 6, d: [-21, 0, 21].map(k => ghE(gx + k, y - 3, 11, 4, 'r2') + ghE(gx + k - .6, y - 3.6, 9.8, 3, 'r') + ghE(gx + k - 4, y - 4.6, 3, .9, 'r1', .8)).join('') };
  if (id == 'lettuce') {
    let d = `M${gx - 37} ${y}`;
    for (let i = 0; i < 8; i++) d += `q4.6 -9 9.2 -1.2`;
    return { h: 6, d: ghP(d + `V${y + 1}H${gx - 37}Z`, 'g2') + ghP(d.replace(`M${gx - 37} ${y}`, `M${gx - 36} ${y - 1}`) + `V${y}H${gx - 36}Z`, 'g') + ghL(`M${gx - 30} ${y - 3}h24`, 'g1', 1.2, .7) };
  }
  if (id == 'egg') return { h: 6, d: ghR(gx - 30, y - 6, 60, 6.4, 3.2, 'w3') + ghR(gx - 30, y - 6.6, 58.6, 5.6, 2.8, 'w') + ghE(gx - 2, y - 4, 10, 3, 'y2') + ghE(gx - 3, y - 4.6, 8, 2, 'y') };
  return { h: 0, d: '' };
}
function snPlateArt(plate, pq) {
  const by = k => plate.filter(id => SN_ING[id][1] == k);
  const groups = [], gap = 10;
  const sand = by('sand'), ice = by('ice'), jui = by('juice').filter(i => i != 'icecube'), pan = plate.filter(id => id == 'pancake');
  const cubes = plate.filter(i => i == 'icecube');
  // G-04a2: toast with what is spread and put on it; a smoothie glass with its layers (stirred once blended); the rest as pictures
  const hasToast = plate.includes('toast'), glass = plate.includes('yogurt') || plate.includes('blend');
  const kit = plate.filter(i => SN_ING[i][1] == 'kit' || SN_ING[i][1] == 'mix');
  const onToast = hasToast ? kit.filter(i => i != 'toast' && i != 'yogurt' && i != 'blend' && !(glass && (i == 'banana' || i == 'berries'))) : [];
  const inGlass = glass ? kit.filter(i => i == 'banana' || i == 'berries' || i == 'yogurt') : [];
  const tr = by('treat').concat(kit.filter(i => i != 'toast' && i != 'blend' && !onToast.includes(i) && !inGlass.includes(i)));
  if (sand.length) groups.push(['sand', 74]);
  if (hasToast) groups.push(['toast', 70]);
  if (pan.length) groups.push(['pan', 62]);
  if (ice.length) groups.push(['ice', 40]);
  if (glass) groups.push(['glass', 44]);
  for (const id of jui) groups.push(['juice', 44, id]);
  if (cubes.length) groups.push(['cube', 30]);
  if (tr.length) groups.push(['treat', 22 + 22 * tr.length]);
  const W = Math.max(124, groups.reduce((a, g) => a + g[1], 0) + gap * (groups.length + 1)), Y = 92;
  let x = (W - (groups.reduce((a, g) => a + g[1], 0) + gap * (groups.length - 1))) / 2, d = '', top = 120;
  for (const [k, w, id] of groups) {
    const gx = x + w / 2;
    if (k == 'sand') {
      let y = Y - 2;
      sand.forEach((s, i) => {
        const L = snLayer(s, gx, y, s == 'bread' && i == sand.length - 1 && i > 0);
        d += L.d;
        y -= L.h;
      });
      top = Math.min(top, y - 4);
    }
    if (k == 'pan') {
      pan.forEach((p, i) => {
        const y = Y - 5 - i * 7, q = pq[i] || 'gold', hue = q == 'pale' ? 'm' : q == 'gold' ? 'y' : 'n';
        d += ghE(gx, y + 1.4, 29, 6, hue == 'm' ? 'm3' : hue + '3') + ghE(gx, y, 29, 5.6, hue + '2') + ghE(gx - 1, y - 1.2, 27, 4.2, hue) + ghE(gx - 7, y - 2.2, 9, 1.3, hue + '1', .8);
      });
      top = Math.min(top, Y - 12 - pan.length * 7);
    }
    if (k == 'ice') {
      d += snCone(gx, Y - 30, 26, 28);
      ice.forEach((s, i) => { d += snScoop(gx, Y - 37 - i * 16, 14, SN_ING[s] && { van: 'm', straw: 'p', choc: 'n', mint: 'g' }[s]); });
      top = Math.min(top, Y - 52 - (ice.length - 1) * 16);
    }
    if (k == 'juice') {
      d += snIn(x - 4, Y - 50, 52, SN_ART[id]());
      top = Math.min(top, Y - 50);
    }
    if (k == 'treat') {
      tr.forEach((s, i) => { d += snIn(x + i * 22, Y - 44, 42, SN_ART[s]()); });
      top = Math.min(top, Y - 44);
    }
    if (k == 'cube') {
      cubes.forEach((s, i) => { d += snCube(x + 4 + (i % 2) * 10, Y - 14 - i * 9, 13); });
      top = Math.min(top, Y - 18 - cubes.length * 9);
    }
    if (k == 'toast') {
      let y = Y - 2;
      d += ghR(gx - 32, y - 12, 64, 12, 5, 'n2') + ghR(gx - 32, y - 12.6, 62, 10.6, 5, 't') + ghR(gx - 28, y - 11, 52, 4, 2, 't1', .8) +
        ghL(`M${gx - 20} ${y - 4}l8 -5M${gx} ${y - 4}l8 -5M${gx + 16} ${y - 4}l6 -4`, 'n', 1.6, .5);
      y -= 12;
      for (const t of onToast) {
        if (t == 'jam') d += ghR(gx - 30, y - 4, 60, 4.6, 2.3, 'r2') + ghR(gx - 30, y - 4.4, 58, 3.4, 1.7, 'r') + ghE(gx - 14, y - 3.4, 6, 1, 'r1', .8);
        if (t == 'honey') d += ghP(`M${gx - 30} ${y}h60q-2 -4 -8 -4h-44q-6 0 -8 4Z`, 'y2') + ghP(`M${gx - 20} ${y}q2 6 4 0M${gx + 8} ${y}q2 8 4 0`, 'y2') + ghE(gx - 6, y - 2.4, 14, 1.2, 'y1', .9);
        if (t == 'cream') d += ghP(`M${gx - 26} ${y}Q${gx - 26} ${y - 8} ${gx - 12} ${y - 8}Q${gx - 4} ${y - 14} ${gx + 6} ${y - 9}Q${gx + 24} ${y - 9} ${gx + 26} ${y}Z`, 'w3') +
          ghP(`M${gx - 24} ${y - 1}Q${gx - 24} ${y - 7} ${gx - 11} ${y - 7}Q${gx - 4} ${y - 12.6} ${gx + 5} ${y - 8}Q${gx + 22} ${y - 8} ${gx + 23} ${y - 1}Z`, 'w');
        if (t == 'mallow') d += [-14, 0, 14].map(k2 => ghR(gx + k2 - 6, y - 10, 12, 10, 4, k2 ? 'w3' : 'p2') + ghR(gx + k2 - 5.4, y - 10, 10.6, 8.6, 3.6, k2 ? 'w' : 'p')).join('');
        if (t == 'banana') d += [-20, -6, 8, 22].map(k2 => ghE(gx + k2, y - 3, 6.4, 3.2, 'y2') + ghE(gx + k2 - .4, y - 3.6, 5.4, 2.4, 'm1') + ghC(gx + k2, y - 3.6, .9, 'n2', .6)).join('');
        if (t == 'berries') d += [-18, -8, 2, 12, 22].map((k2, j) => ghC(gx + k2, y - 3 - (j % 2) * 2, 4.2, 'b2') + ghC(gx + k2 - .6, y - 3.6 - (j % 2) * 2, 3.4, 'b') + ghC(gx + k2 - 1.6, y - 4.8 - (j % 2) * 2, .9, 'b1')).join('');
        y -= t == 'cream' ? 10 : t == 'mallow' ? 10 : 5;
      }
      top = Math.min(top, y - 4);
    }
    if (k == 'glass') {
      const P = (a, b) => `${gh1(x + a * .7 - 1)} ${gh1(Y - 62 + b * .9)}`;
      const mixed = plate.includes('blend'), hue = inGlass.includes('berries') ? 'p' : inGlass.includes('banana') ? 'y' : 'w';
      d += ghE(gx, Y - 4, 15, 2.4, 'k', .13) + ghP(`M${P(13, 14)}L${P(49, 14)}L${P(45, 66)}L${P(19, 66)}Z`, 'e1') + ghP(`M${P(15, 16)}L${P(47, 16)}L${P(43.4, 64)}L${P(20.6, 64)}Z`, 'w');
      if (mixed && inGlass.length) d += ghP(`M${P(16.4, 30)}L${P(45.6, 30)}L${P(43.2, 63)}L${P(20.8, 63)}Z`, hue == 'w' ? 'w3' : hue + '1') + ghE(gx, Y - 62 + 27, 10.4, 1.8, 'w', .8) +
        ghL(`M${P(36, 30)}L${P(42, 4)}L${P(50, 4)}`, 'r', 2.4);
      else inGlass.forEach((t, j) => {
        const b0 = 63 - j * 11, h2 = t == 'berries' ? 'v' : t == 'banana' ? 'y1' : 'w2';
        d += ghP(`M${P(20.8 - (j * .5), b0)}L${P(43.2 + j * .5, b0)}L${P(44 + j * .5, b0 - 11)}L${P(20 - j * .5, b0 - 11)}Z`, h2);
      });
      d += ghR(x + 9, Y - 50, 2.4, 40, 1.2, 'w', .7);
      top = Math.min(top, Y - 62);
    }
    x += w + gap;
  }
  const y0 = Math.min(44, Math.floor(top) - 4), H = 104 - y0;
  const plateW = plate.length ? Math.min(W - 10, Math.max(110, W - 30)) : 120;
  return `<svg class="art sn-plsvg" viewBox="0 ${y0} ${gh1(W)} ${H}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">` +
    ghShad(W / 2, 99, plateW / 2 + 4, 4, .12) + ghE(W / 2, 95, plateW / 2, 7.6, 'w3') + ghE(W / 2, 93.6, plateW / 2 - 1.5, 6.6, 'w') +
    ghE(W / 2, 93.2, plateW / 2 - 12, 3.6, 'w2', .8) + d + '</svg>';
}

/* the stand's pieces in the play scene */
// the awning: n stripes of 48 units, scalloped edge, white and the awning colour, shade under it
function snAwning(n, h) {
  const W = n * 48;
  let stripes = '', scal = `M0 30`, scal2 = `M0 31`;
  for (let i = 0; i < n * 2; i++) {
    if (i % 2 == 0) stripes += `M${i * 24} 4h24v27h-24Z`;
    scal += `a12 9 0 0 0 24 0`;
    scal2 += `a12 10 0 0 0 24 0`;
  }
  let lobes = '';
  for (let i = 0; i < n * 2; i++) if (i % 2 == 0) lobes += `M${i * 24} 30a12 9 0 0 0 24 0Z`;
  return `<svg class="art sn-awn" viewBox="0 0 ${W} 46" preserveAspectRatio="none" aria-hidden="true" focusable="false">` +
    ghP(scal2 + `V${4}H0Z`, 'k', .14) + ghR(0, 0, W, 32, 0, 'w') + ghP(stripes, h) + ghP(scal + 'V30H0Z', 'w') + ghP(lobes, h) +
    ghR(0, 0, W, 6, 0, h + '2') + ghR(0, 27, W, 3.6, 0, 'k', .08) + ghL(`M0 8H${W}`, 'w', 1.6, .45) + '</svg>';
}
// the scene behind the stand, per place (400 x 200, sliced to fit; the sky is the CSS gradient)
const SN_BACK = {
  park: () => ghSun(52, 40, 15) + ghCloud(170, 36, 1.2) + ghCloud(320, 50, .9) +
    ghP('M0 132Q60 96 130 118T260 108T400 116V200H0Z', 'g1') + ghTree(40, 136, 1.3) + ghTree(352, 128, 1.5) + ghTree(300, 134, .9) +
    ghP('M0 150Q100 132 200 146T400 140V200H0Z', 'g') + ghP('M180 200Q196 160 214 148L232 148Q226 166 240 200Z', 't1', .8) +
    ghE(110, 156, 14, 6, 'g2') + ghE(106, 153, 11, 5, 'g') + ghE(290, 160, 16, 6.4, 'g2') + ghE(286, 157, 12, 5, 'g'),
  beach: () => ghSun(340, 38, 16) + ghCloud(110, 44, 1) + ghP('M0 112H400V160H0Z', 'b') + ghP('M0 112H400V118H0Z', 'b1') +
    ghL('M30 128q10 -5 20 0t20 0M220 136q10 -5 20 0t20 0M300 124q8 -4 16 0t16 0', 'w', 2, .7) +
    ghP('M0 150Q100 138 200 146T400 144V200H0Z', 't1') + ghP('M0 164Q120 154 240 162T400 160V200H0Z', 't') +
    ghL('M58 160Q54 120 66 92', 'n2', 7) + ghL('M57 158Q53 120 64.6 93', 'n', 4) +
    ghP('M66 92Q40 84 24 100Q44 92 66 96Z', 'g2') + ghP('M66 92Q92 80 108 96Q88 90 66 96Z', 'g2') + ghP('M66 92Q56 70 70 60Q66 76 68 92Z', 'g') +
    ghP('M66 92Q86 72 102 76Q84 80 68 94Z', 'g') + ghC(64, 96, 3.6, 'n2') + ghC(70, 97, 3.4, 'n2') +
    ghP('M330 170L340 120', 'k') + ghL('M340 168L344 124', 'e3', 2) + ghP('M314 128Q344 98 374 128Z', 'r') + ghP('M344 112Q360 116 374 128H344Z', 'w') +
    ghE(150, 172, 9, 4, 'p2') + ghE(148, 170, 7, 3, 'p'),
  snow: () => ghCloud(80, 40, 1.1) + ghCloud(300, 32, .9) + ghP('M0 120L70 64L140 112L210 52L300 118L360 80L400 104V200H0Z', 'w2') +
    ghP('M70 64L86 78L74 76L66 84L60 72Z', 'w') + ghP('M210 52L228 70L214 66L204 76L196 64Z', 'w') +
    ghP('M0 146Q100 124 200 140T400 134V200H0Z', 'w') + ghP('M0 160Q120 146 240 156T400 152V200H0Z', 'w3', .5) +
    [[40, 140, 1], [352, 132, 1.2], [300, 140, .8]].map(([x, y, s]) => ghShad(x, y, 12 * s, 2.4 * s) + ghP(`M${x} ${y - 42 * s}L${x + 16 * s} ${y - 8 * s}H${x - 16 * s}Z`, 'g2') +
      ghP(`M${x - 1} ${y - 40 * s}L${x + 12 * s} ${y - 12 * s}H${x - 14 * s}Z`, 'g') + ghP(`M${x} ${y - 42 * s}L${x + 7 * s} ${y - 27 * s}Q${x} ${y - 30 * s} ${x - 7 * s} ${y - 27 * s}Z`, 'w') +
      ghR(x - 2 * s, y - 8 * s, 4 * s, 8 * s, 1, 'n2')).join('') +
    [[24, 30], [130, 76], [180, 26], [250, 90], [380, 60], [330, 16], [96, 96]].map(([x, y]) => ghC(x, y, 2.4, 'w')).join(''),
  fair: () => [[30, 20], [120, 34], [240, 18], [360, 28], [300, 60], [70, 66]].map(([x, y]) => ghC(x, y, 1.6, 'y1', .8)).join('') +
    `<circle cx="300" cy="96" r="52" ${ghSt('v2', 4)}/>` + `<circle cx="300" cy="96" r="40" ${ghSt('v1', 1.6, .7)}/>` +
    ghL('M300 96L300 44M300 96L352 96M300 96L248 96M300 96L337 59M300 96L263 59M300 96L337 133M300 96L263 133', 'w2', 1.4, .7) +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4 + .3; return ghR(300 + Math.cos(a) * 52 - 6, 96 + Math.sin(a) * 52, 12, 9, 3, ['r', 'y', 'b', 'g'][i % 4]); }).join('') +
    ghL('M280 160L300 96L320 160', 'e3', 5) +
    ghP('M60 160V110L100 74L140 110V160Z', 'r2') + ghP('M62 160V112L100 78L138 112V160Z', 'w') + ghP('M100 78L74 110H86ZM100 78L114 110H126Z', 'r') +
    ghP('M62 112H138V122H62Z', 'r') + ghL('M100 78V62', 'e3', 2) + ghP('M100 62L112 66L100 70Z', 'y') +
    ghP('M0 150Q100 140 200 148T400 146V200H0Z', 'g2') + ghP('M0 160Q120 152 240 158T400 156V200H0Z', 'g') +
    ghL('M0 14Q100 40 200 14T400 14', 'e3', 1.2, .8) + [20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x, i) => ghC(x, 14 + 14 * Math.sin((x / 200) * Math.PI) ** 2, 4, ['y', 'p', 'c', 'o'][i % 4])).join(''),
  moon: () => [[20, 20], [60, 70], [110, 30], [170, 60], [220, 20], [260, 74], [330, 40], [380, 80], [140, 96], [30, 110]].map(([x, y], i) =>
    ghC(x, y, i % 3 ? 1.6 : 2.6, 'y1', i % 2 ? .7 : 1)).join('') +
    ghBall(330, 64, 22, 'b') + ghP('M318 52Q326 46 334 54Q332 62 322 62Z', 'g') + ghP('M336 70Q344 66 348 72Q342 80 336 78Z', 'g') +
    ghP('M0 136Q80 118 170 132T400 124V200H0Z', 'e2') + ghP('M0 150Q100 138 220 148T400 142V200H0Z', 'e') +
    [[60, 160, 18], [200, 172, 12], [330, 162, 22], [140, 150, 8]].map(([x, y, r]) => ghE(x, y, r, r * .32, 'e2') + ghE(x + r * .1, y + r * .06, r * .8, r * .22, 'e3', .6)).join(''),
  // G-04a2: the farm (a red barn, a fence, a corn field), the castle (towers and flags on a hill), under the sea (sand, weed, coral, bubbles)
  farm: () => ghSun(350, 36, 15) + ghCloud(130, 40, 1) + ghP('M0 124Q90 100 190 118T400 110V200H0Z', 'g1') +
    ghShad(84, 136, 46, 4) + ghP('M42 136V96L84 70L126 96V136Z', 'r2') + ghP('M44 136V97L84 73L122 97V136Z', 'r') + ghP('M36 98L84 66L132 98L126 100L84 74L42 100Z', 'n2') +
    ghR(70, 106, 28, 30, 2, 'w3') + ghR(72, 108, 24, 28, 1, 'r2') + ghL('M72 108L96 136M96 108L72 136', 'w', 2.4) + ghR(78, 84, 12, 10, 2, 'w') + ghR(80, 86, 8, 6, 1, 'n2') +
    [230, 250, 270, 290, 310, 330].map((x, i) => ghL(`M${x} 140V${120 - (i % 2) * 4}`, 'g2', 3) + ghE(x + 3, 122 - (i % 2) * 4, 3, 6, 'y2') + ghE(x + 2.4, 121 - (i % 2) * 4, 2.2, 5, 'y') +
      ghP(`M${x} 128q-8 -2 -10 -10q6 2 10 8Z`, 'g')).join('') +
    ghP('M0 148Q100 136 200 146T400 142V200H0Z', 'g') + ghL('M150 150H220M150 140H220', 'n2', 2.4) + [154, 172, 190, 208].map(x => ghR(x, 132, 5, 22, 1.5, 'n1')).join('') +
    ghE(300, 162, 18, 5, 'g2') + ghE(296, 159, 14, 4, 'g'),
  castle: () => ghCloud(80, 40, 1) + ghCloud(320, 30, .8) + ghP('M0 136Q100 104 210 124T400 116V200H0Z', 'g1') +
    ghShad(260, 134, 80, 4) + ghR(196, 70, 128, 64, 0, 'e2') + ghR(198, 72, 122, 62, 0, 'e1') +
    [[188, 46, 26], [298, 46, 26], [244, 30, 32]].map(([x, y, w]) => ghR(x, y, w, 134 - y, 0, 'e2') + ghR(x + 2, y + 2, w - 5, 132 - y, 0, 'e1') +
      ghP(`M${x - 4} ${y}L${x + w / 2} ${y - 26}L${x + w + 4} ${y}Z`, 'v2') + ghP(`M${x - 2} ${y}L${x + w / 2} ${y - 24}L${x + w / 2} ${y}Z`, 'v1', .6) +
      ghL(`M${x + w / 2} ${y - 26}V${y - 40}`, 'e3', 1.6) + ghP(`M${x + w / 2} ${y - 40}l12 4l-12 4Z`, 'y') + ghR(x + w / 2 - 4, y + 14, 8, 12, 4, 'n2')).join('') +
    ghP('M246 134V112Q260 98 274 112V134Z', 'n2') + ghP('M248 134V113Q260 101 272 113V134Z', 'n') + [206, 222, 290, 306].map(x => ghR(x, 64, 8, 8, 0, 'e1')).join('') +
    ghP('M0 152Q100 142 200 150T400 148V200H0Z', 'g') + ghTree(60, 150, 1.3) + ghTree(372, 146, 1.1) + ghE(140, 164, 14, 5, 'g2') + ghE(136, 161, 10, 4, 'g'),
  sea: () => [[40, 30, 70], [150, 10, 60], [280, 20, 80]].map(([x, y, w]) => ghP(`M${x} 0H${x + w}L${x + w + 40} 140H${x + 20}Z`, 'w', .12)).join('') +
    ghP('M0 150Q100 132 200 146T400 138V200H0Z', 't1') + ghP('M0 164Q120 152 240 160T400 156V200H0Z', 't') +
    [[30, 150, 'g'], [60, 156, 'g2'], [330, 146, 'g'], [356, 150, 'g2']].map(([x, y, c]) => ghL(`M${x} ${y}Q${x - 10} ${y - 20} ${x} ${y - 40}T${x} ${y - 80}`, c, 6)).join('') +
    ghP('M250 152Q248 124 262 110Q266 126 272 116Q280 100 288 112Q284 132 292 152Z', 'p2') + ghP('M253 152Q251 126 263 114Q266 128 272 120Q279 106 285 115Q282 134 289 152Z', 'p') +
    ghP('M110 156Q104 136 116 128Q124 140 132 130Q140 142 136 156Z', 'o2') + ghP('M113 156Q108 138 117 132Q124 143 131 135Q137 145 133 156Z', 'o') +
    [[180, 100, 5], [190, 80, 3.6], [184, 64, 2.6], [300, 70, 4], [306, 52, 2.6], [70, 90, 3.4], [76, 72, 2.4]].map(([x, y, r]) => ghC(x, y, r, 'w', .5) + ghC(x - r * .3, y - r * .3, r * .3, 'w', .9)).join('') +
    ghE(200, 170, 12, 4, 't2') + ghE(198, 168, 9, 3, 't1') + ghP('M380 172l6 -10l6 10l10 2l-8 6l2 10l-10 -5l-10 5l2 -10l-8 -6Z', 'o', .9),
};
// decorations: small drawings on a 64 grid, placed around the stand
const SN_DECO = {
  flowers: () => ghShad(32, 62, 16, 2.4) + ghP('M18 40H46L42 61H22Z', 'o2') + ghP('M19 40H44L40.4 59H23Z', 'o') + ghR(16, 37, 32, 6, 2, 'o2') +
    ghR(16, 36, 30, 5, 2, 'o1') + ghL('M26 37Q24 26 20 20M32 37V16M38 37Q40 26 45 22', 'g2', 2.4) +
    [[20, 18, 'p'], [32, 13, 'y'], [45, 20, 'v']].map(([x, y, h]) => [0, 1, 2, 3, 4].map(i => ghC(x + 5 * Math.cos(i * 1.257), y + 5 * Math.sin(i * 1.257), 3.6, h)).join('') + ghC(x, y, 2.6, 'y2')).join(''),
  plant: () => ghShad(32, 62, 15, 2.4) + ghP('M20 46H44L41 62H23Z', 'n2') + ghP('M21 46H42L39.4 60.4H24Z', 'n') + ghR(18, 43, 28, 5, 2, 'n3') +
    ghR(30, 26, 4, 18, 1.5, 'n2') + ghC(33, 22, 16, 'g2') + ghC(31, 20, 14, 'g') + ghC(25, 14, 6, 'g1', .7) + ghC(38, 26, 2.4, 'r') + ghC(26, 26, 2.4, 'r'),
  balloons: () => ghL('M32 62Q30 50 20 30M32 62Q32 46 34 22M32 62Q36 50 46 34', 'e3', 1.2, .8) +
    [[20, 22, 'r'], [34, 14, 'y'], [47, 26, 'b']].map(([x, y, h]) => ghE(x + 1, y + 1, 9, 11, h + '2') + ghE(x - .4, y - .4, 8, 10, h) + ghE(x - 3, y - 4.6, 2.2, 3.6, 'w', .6, 25) +
      ghP(`M${x - 1.6} ${y + 10}h3.2l-1.6 3Z`, h + '2')).join(''),
  board: () => ghShad(32, 62, 18, 2.4) + ghL('M18 62L24 20M46 62L40 20', 'n2', 3.4) + ghR(14, 10, 36, 34, 3, 'n2') + ghR(14, 9, 35, 33, 3, 'n') +
    ghR(17, 12, 29, 27, 2, 'k2') + ghL('M21 19H40M21 25H36M21 31H42', 'w', 1.8, .75) + ghC(41, 34, 2, 'y', .9),
  lantern: () => ghL('M32 0V12', 'e3', 1.6) + ghR(25, 10, 14, 4, 1.5, 'k2') + ghE(32, 30, 15, 17, 'r2') + ghE(31, 29, 13.4, 15.6, 'r') +
    ghL('M24 18Q20 30 24 42M32 14V46M40 18Q44 30 40 42', 'r2', 1.2, .8) + ghE(26, 23, 3, 5, 'y1', .6) + ghR(25, 45, 14, 4, 1.5, 'k2') + ghL('M32 49V58', 'y2', 2),
  bell: () => ghShad(32, 58, 16, 2.4) + ghR(16, 52, 32, 6, 2, 'e2') + ghR(16, 51, 31, 5, 2, 'e1') +
    ghP('M18 52Q18 30 32 28Q46 30 46 52Z', 'y2') + ghP('M19 51Q19.6 31 31.4 29.4Q43 31 44 51Z', 'y') + ghE(25, 38, 2.6, 6, 'y1', .8, 15) + ghC(32, 26, 3, 'y2'),
  jar: () => ghShad(32, 62, 14, 2.4) + ghR(18, 22, 28, 39, 7, 'e1') + ghR(19, 23, 26, 37, 6.4, 'w') + ghR(18, 18, 28, 6, 2, 'n2') +
    [[26, 52], [36, 52], [31, 46], [24, 44], [38, 44]].map(([x, y]) => ghC(x + .5, y + .5, 4.6, 'y3') + ghC(x, y, 4.2, 'y') + ghC(x - 1.4, y - 1.4, 1.2, 'y1')).join('') +
    ghR(22, 26, 3, 28, 1.5, 'w2', .9),
  bunting: () => ghL('M2 14Q32 34 62 14', 'e3', 1.6) + [[8, 'y'], [20, 'b'], [32, 'g'], [44, 'p'], [56, 'o']].map(([x, h]) => {
    const y = 14 + 20 * (1 - ((x - 32) / 30) ** 2) * .5;
    return ghP(`M${x - 6} ${gh1(y)}h12l-6 16Z`, h + '2') + ghP(`M${x - 6} ${gh1(y)}h10l-6 13Z`, h) + ghC(x - 2, y + 4, 1.4, 'w', .6);
  }).join(''),
  bird: () => ghShad(32, 60, 12, 2) + ghE(33, 40, 16, 14, 'b2') + ghE(31, 38, 14.6, 12.6, 'b') + ghE(36, 44, 9, 6, 'b1', .8) +
    ghP('M18 38Q8 30 12 24Q20 30 22 36Z', 'b2') + ghC(22, 30, 10, 'b2') + ghC(21, 29, 9, 'b') + ghC(18, 27, 2.4, 'k') + ghC(17.4, 26.2, .8, 'w') +
    ghP('M12 30L5 32L12 33Z', 'o') + ghE(21, 33, 2.2, 1.3, 'p', .6) + ghL('M30 54V60M36 54V60', 'o2', 2),
};
const SN_DECO_SPOT = { flowers: 'l', board: 'l', balloons: 'l', plant: 'r', jar: 'r', bell: 'r', lantern: 'h' }; // left, right, hanging
// G-04a2: the café journey's upgrades (64 grid), shown on the stand picture; some also in the play scene (SN_CDECO_SCENE)
const SN_CDECO = {
  umbrella: () => ghShad(32, 62, 14, 2.4) + ghL('M32 20V62', 'e3', 2.6) + ghP('M4 26Q8 6 32 4Q56 6 60 26Z', 'r2') + ghP('M6 25Q10 8 32 6Q54 8 58 25Z', 'r') +
    ghP('M18 25Q20 10 32 6Q26 12 26 25Z', 'w') + ghP('M38 25Q38 12 32 6Q44 10 46 25Z', 'w') + ghE(20, 14, 5, 2, 'r1', .7, -25) + ghC(32, 4, 2.4, 'y2'),
  chalk: () => ghShad(32, 62, 17, 2.4) + ghL('M16 62L22 14M48 62L42 14', 'n2', 3) + ghR(10, 8, 44, 36, 3, 'n2') + ghR(10, 7, 43, 35, 3, 'n') + ghR(13, 10, 37, 29, 2, 'k2') +
    ghL('M18 18H30M18 25H40M18 32H34', 'w', 1.6, .8) + ghC(42, 18, 3, 'p', .9) + ghC(41, 30, 2.4, 'y', .9),
  cooler: () => ghShad(32, 62, 24, 2.6) + ghR(6, 24, 52, 36, 5, 'b2') + ghR(6, 24, 50, 34, 5, 'b') + ghR(9, 27, 6, 26, 3, 'b1', .7) +
    ghR(4, 16, 56, 12, 4, 'w3') + ghR(4, 15, 54, 10, 4, 'w') + ghR(24, 10, 16, 6, 3, 'e2') + ghR(26, 36, 12, 8, 2, 'w', .85),
  lights: () => ghL('M2 14Q32 34 62 14', 'e3', 1.4) + [[10, 'y'], [22, 'p'], [34, 'b'], [46, 'g'], [56, 'o']].map(([x, h]) => {
    const y = 14 + 20 * (1 - ((x - 32) / 30) ** 2) * .5;
    return ghR(x - 1.6, y - 1, 3.2, 3, 1, 'e3') + ghE(x, y + 6, 4, 5.6, h + '2') + ghE(x - .5, y + 5.4, 3.2, 4.6, h) + ghE(x - 1.4, y + 4, 1, 1.6, 'w', .8);
  }).join(''),
  clock: () => ghShad(32, 60, 14, 2) + ghC(33, 33, 24, 'n2') + ghC(32, 32, 23, 'n') + ghC(32, 32, 18, 'w3') + ghC(31.4, 31.4, 17, 'w') +
    [0, 1, 2, 3].map(i => ghC(32 + 13 * Math.cos(i * Math.PI / 2), 32 + 13 * Math.sin(i * Math.PI / 2), 1.6, 'n2')).join('') +
    ghL('M32 32V21M32 32L40 36', 'k', 2.4) + ghC(32, 32, 2, 'r') + ghE(24, 22, 5, 2.4, 'w', .8, -30),
  window: () => ghR(8, 4, 48, 40, 3, 'n2') + ghR(8, 3, 47, 39, 3, 'n') + ghR(12, 7, 40, 33, 2, 'b1') + ghP('M14 9L30 9L16 30Z', 'w', .5) + ghL('M32 7V40M12 23H52', 'n', 2.4) +
    ghR(6, 44, 52, 12, 3, 'n3') + ghR(6, 43, 51, 10, 3, 'n2') + [[14, 'p'], [24, 'y'], [34, 'r'], [44, 'v'], [52, 'p']].map(([x, h]) =>
      ghL(`M${x} 44V36`, 'g2', 1.6) + ghC(x, 35, 3.6, h) + ghC(x - 1, 34, 1.2, 'w', .7)).join(''),
  plants: () => ghShad(32, 62, 14, 2.4) + ghP('M20 48H44L41 62H23Z', 'o2') + ghP('M21 48H42L39.4 60.6H24Z', 'o') + ghR(18, 45, 28, 5, 2, 'o3') +
    ghP('M32 46Q22 30 8 26Q20 40 30 46Z', 'g2') + ghP('M32 46Q42 28 58 22Q46 38 34 46Z', 'g2') + ghP('M32 46Q26 20 32 2Q38 20 33 46Z', 'g') +
    ghP('M32 46Q16 36 14 14Q26 28 32 46Z', 'g') + ghP('M32 46Q48 36 50 12Q38 28 32 46Z', 'g1', .9),
  tables: () => ghShad(32, 62, 26, 2.6) + ghR(4, 36, 12, 24, 3, 'r2') + ghR(4, 46, 14, 5, 2, 'r') + ghR(48, 36, 12, 24, 3, 'r2') + ghR(46, 46, 14, 5, 2, 'r') +
    ghE(32, 34, 20, 5, 'w3') + ghE(32, 33, 19, 4.4, 'w') + ghR(30, 36, 4, 24, 1.5, 'e3') + ghE(32, 60, 9, 2, 'e3') + ghC(38, 30, 3, 'p') + ghL('M38 30V24', 'g2', 1.4),
  pies: () => ghShad(32, 62, 22, 2.4) + ghR(8, 52, 48, 8, 3, 'n2') + ghR(8, 51, 47, 7, 3, 'n') + ghP('M12 51Q12 16 32 14Q52 16 52 51Z', 'c1', .45) +
    ghP('M16 51Q16 22 30 18', 'w', .6) + snIn(14, 22, 34, SN_ART.pie()) + ghC(32, 13, 3, 'n2'),
  mixer: () => ghShad(32, 62, 16, 2.4) + ghR(16, 54, 32, 7, 3, 'e3') + ghR(16, 53, 31, 6, 3, 'e2') + ghR(40, 10, 10, 46, 4, 'e3') + ghR(40, 10, 8.6, 44, 4, 'e1') +
    ghR(14, 8, 36, 10, 4, 'e3') + ghR(14, 7, 34.6, 9, 4, 'e1') + ghL('M26 16V30', 'e3', 2) + ghP('M16 30H36L34 52H18Z', 'e1') + ghP('M17 34H35L33.4 51H18.6Z', 'p') +
    ghE(26, 34, 9, 2, 'p1') + ghR(19, 34, 2.4, 14, 1.2, 'w', .7),
  booth: () => ghShad(32, 62, 28, 2.6) + ghR(4, 8, 56, 32, 10, 'r3') + ghR(5, 8, 53, 30, 10, 'r') + ghL('M14 12V34M32 12V34M50 12V34', 'r2', 1.6, .8) +
    ghR(2, 36, 60, 14, 6, 'r2') + ghR(3, 35, 57, 12, 6, 'r1') + ghR(8, 50, 6, 12, 2, 'e3') + ghR(50, 50, 6, 12, 2, 'e3') + ghE(16, 14, 8, 2.6, 'w', .4, -10),
  neon: () => ghR(4, 14, 56, 36, 8, 'v3') + ghR(5, 14, 53, 34, 8, 'v2') + ghR(9, 18, 46, 26, 6, 'y1', .35) + `<rect x="10" y="19" width="44" height="24" rx="6" ${ghSt('y1', 2.6)}/>` +
    ghL('M18 36L24 26L30 36L36 26L42 36L48 26', 'p1', 2.4) + ghC(14, 14, 3, 'y1') + ghC(50, 14, 3, 'y1'),
  helper2: () => ART.chick || '',
};
const SN_CDECO_SCENE = { chalk: 1, cooler: 1, clock: 1, plants: 1 }; // the café upgrades placed in the play scene (CSS .sn-d-<id>)

/* the stand as one picture (240 x 100): the hub card, the menu hero and the end card. o: {r: the save (look), closed, deco, cust} */
function snStandArt(o = {}) {
  const r = o.r || {}, h = SN_AWN[r.awn] ? r.awn : 'r', own = snObj(r.own);
  let n = '', sc = 'M50 38', lob = '';
  for (let i = 0; i < 7; i++) {
    if (i % 2 == 0) n += `M${50 + i * 20} 20h20v18h-20Z`;
    sc += 'a10 7 0 0 0 20 0';
    if (i % 2 == 0) lob += `M${50 + i * 20} 38a10 7 0 0 0 20 0Z`;
  }
  const ctr = r.ctr == 'mint' ? ['c', 'c1', 'c2'] : r.ctr == 'candy' ? ['p', 'w', 'p2'] : ['n', 'n1', 'n2'];
  const sign = r.sign == 'star' ? 'y' : r.sign == 'heart' ? 'p' : r.sign == 'lights' ? 'v' : 'n';
  // G-04a2: the café journey. 2 the little café (a building with windows behind the stand), 3 the diner (a long building with a
  // round-topped sign band and a red stripe); 1 the food cart gets wheels and a handle (below, after the counter)
  const stg = o.stage != null ? o.stage : snStage(r), cafe = snObj(r.cafe), up = id => o.deco && cafe[id];
  let back = '';
  if (stg == 2) back = ghR(16, 8, 208, 90, 4, 't2') + ghR(18, 8, 202, 88, 4, 't1') + ghR(12, 2, 216, 10, 4, 'n2') + ghR(12, 1, 214, 8, 4, 'n1') +
    [22, 196].map(x => ghR(x, 22, 26, 30, 3, 'n2') + ghR(x + 2, 24, 22, 26, 2, 'b1') + ghP(`M${x + 4} 26h8l-6 12Z`, 'w', .5) + ghL(`M${x + 13} 24V50M${x + 2} 37H${x + 24}`, 'n', 1.6)).join('') +
    (up('window') ? [22, 196].map(x => ghR(x - 2, 52, 30, 6, 2, 'n2') + [4, 10, 16, 22].map((k, i) => ghC(x + k + 1, 51, 2.6, ['p', 'y', 'r', 'v'][i])).join('')).join('') : '') +
    (up('clock') ? snIn(28, 58, 14, SN_CDECO.clock()) : '');
  if (stg == 3) back = ghR(4, 10, 232, 88, 6, 'c2') + ghR(6, 10, 228, 86, 6, 'c1') + ghR(4, 58, 232, 8, 0, 'r') + ghR(4, 57, 232, 3, 0, 'r1', .7) +
    ghP('M60 12Q60 0 76 0H164Q180 0 180 12Z', 'r2') + ghP('M62 12Q62 2 76 2H164Q178 2 178 12Z', 'r') +
    [12, 204].map(x => ghR(x, 22, 26, 30, 4, 'e2') + ghR(x + 2, 24, 22, 26, 3, 'b1') + ghP(`M${x + 4} 26h8l-6 12Z`, 'w', .5)).join('') +
    (up('neon') ? `<rect x="60" y="1" width="120" height="12" rx="6" ${ghSt('y1', 1.6, .9)}/>` : '') +
    (up('booth') ? snIn(4, 60, 34, SN_CDECO.booth()) : '') + (up('clock') ? snIn(16, 6, 14, SN_CDECO.clock()) : '');
  let pic = back + ghShad(120, 97, 84, 3.4, .14) +
    // posts, the roof and the striped awning
    ghR(54, 38, 6, 58, 2, 'n2') + ghR(180, 38, 6, 58, 2, 'n2') + ghR(55, 38, 3, 58, 1.5, 'n1', .6) +
    ghP(sc.replace('M50 38', 'M50 40') + 'V22H50Z', 'k', .12) +
    ghR(48, 20, 144, 18, 0, 'w') + ghP(n, h) + ghP(sc + 'V38H50Z', 'w') + ghP(lob, h) + ghR(46, 14, 148, 8, 3, h + '2') + ghR(46, 13, 148, 5, 2.5, h + '1', .7) +
    // the sign on the roof (drawn snacks: no text in drawings)
    ghR(96, 1, 48, 15, 4, sign + '2') + ghR(96, .4, 47, 14, 4, sign) + ghR(98, 2, 43, 3, 1.5, sign + '1', .6) +
    (o.lite ? snIn(113, 0, 14, SN_ART.van()) : snIn(101, 0, 14, SN_ART.van()) + snIn(113.5, 1, 13, SN_ART.bread()) + snIn(126, 1, 13, SN_ART.apple()));
  if (r.sign == 'lights') pic += [100, 108, 116, 124, 132, 140].map(x => ghC(x, 15, 1.3, 'y1')).join('');
  if (o.deco && own.lantern) pic += snIn(158, 36, 22, SN_DECO.lantern());
  if (o.deco && own.bunting) pic += ghL('M48 40Q120 52 192 40', 'e3', .8) + [60, 80, 100, 120, 140, 160, 180].map((x, i) =>
    ghP(`M${x - 5} ${gh1(42 + 3 * Math.sin((x - 48) / 144 * Math.PI))}h10l-5 8Z`, ['y', 'b', 'g', 'p'][i % 4])).join('');
  // a customer behind the counter, with a bubble
  if (o.cust !== false && !o.closed) pic += snIn(68, 30, 44, ART.cat || '') + ghR(112, 34, 30, 22, 7, 'w3') + ghR(112, 33, 29, 21, 7, 'w') +
    ghP('M118 54L114 61L124 54Z', 'w') + snIn(117, 33, 20, SN_ART.van());
  if (o.closed) pic += ghL('M100 38L108 43M140 38L132 43', 'e3', 1.4) + ghR(88, 43, 64, 15, 4, 'n2') + ghR(88, 42, 63, 14, 4, 'n') +
    ghL('M99 49H141', 'w', 3.4, .85) + ghC(97, 49, 2.6, 'r');
  // the counter
  pic += ghR(46, 66, 148, 32, 3, ctr[2]) + ghR(46, 66, 147, 31, 3, ctr[0]) + ghR(42, 60, 156, 8, 3, 'n2') + ghR(42, 59, 155, 7, 3, 'n1') +
    (r.ctr == 'candy' ? ghP('M58 68h12l-10 29h-12ZM90 68h12l-10 29h-12ZM122 68h12l-10 29h-12ZM154 68h12l-10 29h-12Z', 'w', .8)
      : r.ctr == 'mint' ? ghL('M46 77H193M46 87H193M70 68V97M100 68V97M130 68V97M160 68V97', 'c2', 1.2, .7) : ghL('M46 77H193M46 87H193', 'n2', 1.2, .6)) +
    snIn(132, 38, 26, SN_ART.apple()) + (o.lite ? '' : snIn(152, 41, 22, SN_ART.cookie()));
  // what the child bought shows on the stand
  if (o.deco) {
    if (own.flowers) pic += snIn(22, 64, 32, SN_DECO.flowers());
    if (own.board) pic += snIn(2, 60, 34, SN_DECO.board());
    if (own.plant) pic += snIn(194, 56, 40, SN_DECO.plant());
    if (own.balloons) pic += snIn(14, 18, 40, SN_DECO.balloons());
    if (own.bird) pic += snIn(176, 0, 20, SN_DECO.bird());
    if (own.bell) pic += snIn(52, 48, 14, SN_DECO.bell());
    if (own.jar) pic += snIn(172, 44, 16, SN_DECO.jar());
    if (stg >= 1) {
      if (up('umbrella')) pic += snIn(196, 30, 40, SN_CDECO.umbrella());
      if (up('chalk')) pic += snIn(0, 54, 30, SN_CDECO.chalk());
      if (up('cooler')) pic += snIn(198, 72, 26, SN_CDECO.cooler());
      if (up('lights')) pic += snIn(46, 12, 74, SN_CDECO.lights()) + snIn(120, 12, 74, SN_CDECO.lights());
      if (up('plants')) pic += snIn(-6, 40, 40, SN_CDECO.plants()) + snIn(208, 40, 40, SN_CDECO.plants());
      if (up('tables')) pic += snIn(206, 66, 34, SN_CDECO.tables());
      if (up('pies')) pic += snIn(64, 40, 24, SN_CDECO.pies());
      if (up('mixer')) pic += snIn(88, 42, 22, SN_CDECO.mixer());
      if (up('helper2')) pic += snIn(156, 0, 20, SN_CDECO.helper2());
    }
  }
  if (stg == 1) pic += ghL('M194 70L214 58', 'e3', 3) + ghC(215, 57, 3, 'e3') +
    [76, 164].map(x => ghC(x, 92, 9, 'k2') + ghC(x, 92, 6.4, 'e1') + ghC(x, 92, 2.4, 'e3') + ghE(x - 3, 89, 2.4, 1.2, 'w', .7, -30)).join('');
  return pic;
}
// the hub card: the stand with a cat ordering an ice cream, in the park
const snHubArt = () => ghSun(24, 20, 10) + ghCloud(212, 18, .7) + ghP('M0 82Q60 70 120 78T240 74V100H0Z', 'g1') + ghTree(222, 84, .8) +
  `<g transform="translate(0 9)">${snStandArt({ r: { awn: 'r' }, lite: true })}</g>`;

/* ---- the screens ---- */
let SN = null; // the day on screen
const snCoinChip = (n, id = 'sncoin') => `<span class="stat sn-coins" id="${id}" aria-label="Coins">${ico('coin', 32, 'ic-coin')}<b>${n}</b></span>`;
const snPlacePic = id => `<svg class="art" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${SN_BACK[id]()}</svg>`;
const snStandSVG = (o, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 240 100" aria-hidden="true" focusable="false">${snStandArt(o)}</svg>`;
const snTone = (...a) => tone(...a); // silent with Sound effects off (10-sfx.js)

// a small picture for a kind of day's card: an ART drawing or a food
const snKindPic = (k, place) => {
  const id = k.id == 'place' ? ((SN_PLACES.find(p => p.id === place) || SN_PLACES[0]).sp || 'bread') : k.pic;
  const inner = SN_ART[id] ? SN_ART[id]() : ART[id] || SN_ART.van();
  return `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${inner}</svg>`;
};
const snToday = () => today();
function snMenu(place) {
  const r = snS();
  if (place && SN_PLACES.some(p => p.id === place && snPlaceOpen(p, r))) r.place = place;
  const pl = SN_PLACES.find(p => p.id === r.place), stars = snStarsAll(r), owned = SN_SHOP.filter(x => r.own[x[0]]).length;
  const pcard = p => {
    const open = snPlaceOpen(p, r), got = r.stars[p.id] || 0;
    return `<button class="sn-place${p.id === pl.id ? ' on' : ''}${open ? '' : ' lock'}" data-pl="${p.id}" aria-pressed="${p.id === pl.id}">` +
      `<span class="sn-ppic" style="--gh-a:var(--sc-${p.sky[0]});--gh-b:var(--sc-${p.sky[1]})">${snPlacePic(p.id)}` +
      `${open ? '' : `<span class="sn-plock">${ico('lock', 22)}</span>`}</span><span class="sn-pname">${esc(p.name)}</span>` +
      `<span class="sn-psub">${open ? UI.stars(got, 3, 18) : ico('star', 18) + `<b>${p.need - stars}</b> more to open`}</span></button>`;
  };
  // G-04a2: the kinds of days (Mix plays the open ones in turn); a locked one says when it opens
  const next = snKindFor(Object.assign({}, r, { kind: 'mix' }));
  const kcard = k => {
    const open = snKindOpen(k.id, r), on = r.kind === k.id, left = k.days - r.days;
    const sub = open ? (r.kd[k.id] ? UI.stars(r.kd[k.id], 3, 16) : '<span>New!</span>') :
      ico('lock', 16) + (left > 0 ? `<span>After ${left} more day${left > 1 ? 's' : ''}</span>` : '<span>Busy only</span>');
    return `<button class="sn-kind${on ? ' on' : ''}${open ? '' : ' lock'}" data-k="${k.id}" aria-pressed="${on}">` +
      `<span class="sn-kpic">${snKindPic(k, pl.id)}</span><span class="sn-ktxt"><span class="sn-kname">${esc(snKindName(k.id, pl.id))}</span>` +
      `<span class="sn-ksub">${sub}</span></span></button>`;
  };
  const mix = `<button class="sn-kind mix${r.kind === 'mix' ? ' on' : ''}" data-k="mix" aria-pressed="${r.kind === 'mix'}"><span class="sn-kpic">${ico('replay', 30)}</span>` +
    `<span class="sn-ktxt"><span class="sn-kname">Mix</span><span class="sn-ksub"><span>Next: ${esc(snKindName(next, pl.id))}</span></span></span></button>`;
  const kind = snKindFor(r), opened = SN_KINDS.filter(k => snKindOpen(k.id, r)).length;
  // today's guest (from the date)
  const tw = snTwist(snToday()), gName = SN_WHO[tw.who], fav = SN_ING[tw.fav][0].toLowerCase();
  const guest = `<section class="sn-guest" aria-label="Today's guest"><span class="sn-gpic">${picArt(tw.who, '100%')}<i>${ico('crown', 18)}</i></span><p>` +
    (r.tw === tw.key ? `<b>${esc(gName)}</b> had a lovely snack today. Thank you!` :
      `<b>Today's guest: ${esc(gName)} the ${esc(tw.who)}</b> loves ${esc(fav)}. Serve ${esc(gName)} for <b>+5 coins</b>!`) + '</p></section>';
  const busy = r.mode == 'busy', stage = snStage(r), book = SN_DISHES.filter(d => r.book[d.id]).length;
  view(`${GH.top('snack')}<div class="scroll sn-menu">
  <p class="sn-goalline" id="snnext"><span class="sn-gi">${ico('target', 24)}</span><span><b>Next goal:</b> ${esc(snNextGoal(r))}</span></p>
  <section class="sn-hero" style="--gh-a:var(--sc-${pl.sky[0]});--gh-b:var(--sc-${pl.sky[1]})"><div class="sn-hpic">${snStandSVG({ r, deco: true })}</div>
   <div class="sn-hinfo"><p class="sn-hl">${ico('coin', 26, 'ic-coin')}<b>${r.coins}</b> coins</p><p class="sn-hl">${ico('star', 26)}<b>${stars}</b> of ${SN_MAXSTARS} stars</p>
   ${UI.btn(`Open the ${['stand', 'cart', 'café', 'diner'][stage]}`, { kind: 'primary', size: 'lg', icon: 'play', id: 'snopen', wide: true })}
   <div class="sn-hbtns">${UI.btn('Shop', { icon: 'bag', id: 'snshop', wide: true })}${UI.btn(`Recipes ${book}/${SN_DISHES.length}`, { icon: 'sticker-book', id: 'snbook', wide: true })}</div></div></section>
  ${guest}
  <h2 class="sn-h">What kind of day? <span class="sn-got">${opened} of ${SN_KINDS.length} open</span></h2>
  <p class="sn-kline">${esc(snKindName(kind, pl.id))}: ${esc(snKindLine(kind, pl.id))}</p>
  <div class="sn-kinds">${mix}${SN_KINDS.map(kcard).join('')}</div>
  <h2 class="sn-h">Where to open today</h2><div class="sn-places">${SN_PLACES.map(pcard).join('')}</div>
  <section class="sn-opts"><h2 class="sn-h">How busy?</h2>
   <div class="sn-mode">${UI.seg([['calm', 'Calm'], ['busy', 'Busy']], r.mode, { id: 'snmode', label: 'How busy' })}
   <p>${busy ? 'Busy: two or three animals at once, bigger orders and pancakes. Serve them before their heart runs out for a tip!' :
    'Calm: one animal at a time. Take as long as you like.'}</p></div>
   ${snTillOK() ? UI.sw('Give change: count the coins back to the customer', r.till, 'sntill') : ''}
   <ul class="sn-how">${[['food', 'Look at the order in the bubble.'], ['plus', 'Tap the food to put it on the plate. Undo takes the last one off.'],
    ['check', 'Tap Serve! Right the first time earns a tip.'], ['bag', `Buy new food and decorations in the shop (${owned} of ${SN_SHOP.length}), then build your café.`]]
    .map(([i, t]) => `<li><span class="sn-hi">${ico(i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul></section></div>`);
  GH.wire({ back: () => gameRoom() });
  $('#snopen').onclick = () => {
    if (ptLeft() <= 0) {
      SFX.wrong();
      fb(ptWhyNot(), 'warn long', 3000);
      return;
    }
    SFX.whoosh();
    snDay();
  };
  $('#snshop').onclick = () => { SFX.whoosh(); snShop(); };
  $('#snbook').onclick = () => { SFX.whoosh(); snBook(); };
  const again = () => {
    const y = $('.scroll').scrollTop;
    snMenu();
    $('.scroll').scrollTop = y;
  };
  $$('[data-pl]').forEach(b => b.onclick = () => {
    const p = SN_PLACES.find(x => x.id === b.dataset.pl);
    if (!snPlaceOpen(p, r)) {
      SFX.wrong();
      fb(`Get ${p.need - snStarsAll(r)} more stars to open ${p.name}!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.place = p.id;
    save();
    again();
  });
  $$('[data-k]').forEach(b => b.onclick = () => {
    const k = b.dataset.k, kk = SN_KINDS.find(x => x.id === k);
    if (kk && !snKindOpen(k, r)) {
      SFX.wrong();
      fb(kk.days > r.days ? `${kk.name} days open after ${kk.days - r.days} more day${kk.days - r.days > 1 ? 's' : ''}.` : `${kk.name} is for Busy days.`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.kind = k;
    save();
    again();
  });
  UI.segOn($('#snmode'), v => {
    r.mode = v;
    if (r.kind !== 'mix' && !snKindOpen(r.kind, r)) r.kind = 'mix';
    save();
    again();
  });
  if ($('#sntill')) $('#sntill').onchange = e => { r.till = e.target.checked; save(); };
}

/* ---- G-04a2: the recipe book. Every named snack, drawn from its own food; one not made yet is a faded card with a lock.
   A recipe shows its steps in order. ---- */
const snDishPic = d => `<span class="sn-dpic">${d.items.filter(i => i != 'blend').slice(0, 4).map(i => `<span>${snPic(i)}</span>`).join('')}</span>`;
function snBook() {
  const r = snS(), got = SN_DISHES.filter(d => r.book[d.id]).length;
  const card = d => {
    const n = r.book[d.id] || 0, where = d.where ? SN_PLACES.find(p => p.id === d.where).name : '';
    return `<li class="sn-dish${n ? '' : ' lock'}">${snDishPic(d)}<span class="sn-dname">${esc(d.name)}</span>` +
      `<span class="sn-dsub">${d.steps ? d.items.map((i, j) => `${j + 1}. ${esc(SN_ING[i][0])}`).join(' ') : esc(d.items.map(i => SN_ING[i][0]).join(', '))}</span>` +
      `<span class="sn-dsub">${n ? `${ico('check', 16)} Made ${n} time${n > 1 ? 's' : ''}` : ico('lock', 16) + esc(d.steps ? 'Recipe day' : where ? 'At ' + where : d.busy ? 'Busy days' : 'Not made yet')}</span></li>`;
  };
  view(`${GH.top('snack', { sub: 'Recipe book' })}<div class="scroll sn-shop sn-bookp">
  <p class="sn-note">${got} of ${SN_DISHES.length} snacks in your book. A snack goes in when a customer gets it from you.</p>
  <h2 class="sn-h">Snacks <span class="sn-got">${SN_DISHES.filter(d => !d.steps && r.book[d.id]).length} of ${SN_DISHES.filter(d => !d.steps).length}</span></h2>
  <ul class="sn-book">${SN_DISHES.filter(d => !d.steps).map(card).join('')}</ul>
  <h2 class="sn-h">Recipes with steps <span class="sn-got">${SN_DISHES.filter(d => d.steps && r.book[d.id]).length} of ${SN_DISHES.filter(d => d.steps).length}</span></h2>
  <ul class="sn-book">${SN_DISHES.filter(d => d.steps).map(card).join('')}</ul></div>`);
  GH.wire({ back: () => snMenu() });
}

/* ---- the stand shop: tap a thing to see its price and what is left; Buy / Not now ---- */
function snItemPic(id) {
  const it = SN_SHOP.find(x => x[0] === id) || ['', id.split('-')[0]];
  if (it[1] == 'menu') return snPic(id);
  if (it[1] == 'awn') return `<svg class="art" viewBox="0 0 96 46" aria-hidden="true" focusable="false">${snAwning(2, id.slice(4)).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>`;
  if (it[1] == 'sign' || it[1] == 'ctr') return snStandSVG({ r: { awn: 'r', sign: it[1] == 'sign' ? id.slice(5) : 'wood', ctr: it[1] == 'ctr' ? id.slice(4) : 'wood' }, cust: false });
  return `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${SN_DECO[id]()}</svg>`;
}
// G-04a2: a café journey tile's picture: the stage on the stand picture, or the upgrade's own drawing
function snCafePic(id, r) {
  const it = SN_CAFE.find(x => x[0] === id);
  if (it[1] == 'stage') return snStandSVG({ r: Object.assign({}, r, { cafe: {} }), stage: SN_CAFE.indexOf(it) + 1, cust: false });
  return `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${SN_CDECO[id]()}</svg>`;
}
function snShop(sel) {
  const r = snS(), cafeSel = sel && sel.startsWith('c:') ? sel.slice(2) : '';
  let bar = '';
  if (sel) {
    const it = cafeSel ? SN_CAFE.find(x => x[0] === cafeSel) : SN_SHOP.find(x => x[0] === sel), left = r.coins - it[3];
    bar = `<div class="sn-buy" role="group" aria-label="Buy"><span class="sn-bpic">${cafeSel ? snCafePic(cafeSel, r) : snItemPic(sel)}</span><div class="sn-btxt"><p><b>${esc(it[2])}</b> for ` +
      `${ico('coin', 22, 'ic-coin')}<b>${it[3]}</b></p><p>${left >= 0 ? `You will have ${left} coins left.` : `You need ${-left} more coins. Serve more customers!`}</p></div>` +
      `<div class="sn-bacts">${UI.btn('Buy', { kind: 'primary', size: 'lg', icon: 'check', id: 'snbuy', off: left < 0 })}${UI.btn('Not now', { icon: 'close', id: 'snno' })}</div></div>`;
  }
  const on = it => (it[1] == 'awn' && r.awn === it[0].slice(4)) || (it[1] == 'sign' && r.sign === it[0].slice(5)) || (it[1] == 'ctr' && r.ctr === it[0].slice(4));
  const free = { awn: ['awn-r', 'Red awning'], sign: ['sign-wood', 'Wood sign'], ctr: ['ctr-wood', 'Wood counter'] };
  const tile = (id, name, price, own, isOn, pic) => `<button class="sn-item${isOn ? ' on' : ''}${own ? '' : ' new'}${sel === id ? ' sel' : ''}" data-it="${id}" ` +
    `aria-pressed="${isOn}"><span class="sn-ipic">${pic}</span><span class="sn-iname">${esc(name)}</span><span class="sn-iprice">` +
    (isOn ? ico('check', 18) + 'On' : own ? 'Yours' : ico('coin', 18, 'ic-coin') + price) + '</span></button>';
  const group = ([g, title]) => {
    const list = SN_SHOP.filter(x => x[1] == g);
    let tiles = '';
    if (free[g]) {
      const [fid, fname] = free[g], v = fid.split('-')[1];
      const fpic = g == 'awn' ? snItemPic('awn-r') : snStandSVG({ r: { awn: 'r', sign: g == 'sign' ? v : 'wood', ctr: g == 'ctr' ? v : 'wood' }, cust: false });
      tiles += tile(fid, fname, 0, true, (g == 'awn' ? r.awn : g == 'sign' ? r.sign : r.ctr) === v, fpic);
    }
    tiles += list.map(it => tile(it[0], it[2], it[3], !!r.own[it[0]], on(it), snItemPic(it[0]))).join('');
    const got = list.filter(x => r.own[x[0]]).length;
    return `<h2 class="sn-h">${esc(title)} <span class="sn-got">${got} of ${list.length}</span></h2><div class="sn-items">${tiles}</div>`;
  };
  // the café journey: the stages in a row, then each stage's upgrades; a locked tile names what opens it
  const cOpen = snCafeOpen(r), stg = snStage(r);
  const needOf = it => (it[1] == 'stage' ? SN_CAFE[SN_CAFE.indexOf(it) - 1] : SN_CAFE.find(x => x[0] === it[1]));
  const ctile = it => {
    const id = it[0], own = !!r.cafe[id], ready = snCafeReady(id, r), need = needOf(it);
    return `<button class="sn-item${own ? ' on' : ' new'}${ready || own ? '' : ' lock'}${cafeSel === id ? ' sel' : ''}" data-cf="${id}" aria-pressed="${own}">` +
      `<span class="sn-ipic">${snCafePic(id, r)}</span><span class="sn-iname">${esc(it[2])}</span><span class="sn-iprice">` +
      (own ? ico('check', 18) + 'Yours' : ready ? ico('coin', 18, 'ic-coin') + it[3] : ico('lock', 18) + esc(need ? need[2] + ' first' : 'Locked')) + '</span></button>';
  };
  const cgroups = [['stage', 'Café journey'], ['cart', 'Food cart things'], ['cafe', 'Café things'], ['diner', 'Diner things']];
  const cafeHtml = cOpen ? cgroups.map(([g, title]) => {
    const list = SN_CAFE.filter(x => x[1] == g);
    return `<h2 class="sn-h">${esc(title)} <span class="sn-got">${list.filter(x => r.cafe[x[0]]).length} of ${list.length}</span></h2>` +
      `<div class="sn-items">${list.map(ctile).join('')}</div>`;
  }).join('') : `<h2 class="sn-h">Café journey</h2><p class="sn-note sn-lockline">${ico('lock', 20)} Buy ${SN_CAFE_OPEN} things for your stand ` +
    `(you have ${SN_SHOP.filter(x => r.own[x[0]]).length}) or play 8 days to start the journey: a food cart, a little café and a diner.</p>`;
  const all = SN_SHOP.filter(x => r.own[x[0]]).length;
  view(`${GH.top('snack', { sub: 'Shop', chips: snCoinChip(r.coins) })}<div class="scroll sn-shop">
  <section class="sn-shero" style="--gh-a:var(--sc-sky-1);--gh-b:var(--sc-sky)">${snStandSVG({ r, deco: true })}${bar}</section>
  <p class="sn-note">${all == SN_SHOP.length ? `Your stand shop is complete! Your ${SN_STAGES[stg]} can grow in the café journey.` :
    `${all} of ${SN_SHOP.length} things bought. Everything is earned by serving customers. Decorations show on your stand.`}</p>
  ${cOpen ? cafeHtml : ''}${SN_GROUPS.map(group).join('')}${cOpen ? '' : cafeHtml}</div>`);
  GH.wire({ back: () => snMenu() });
  const show = id => {
    SFX.pop(1);
    snShop(id);
    const s = $('.sn-shop');
    if (s) s.scrollTop = 0;
  };
  $$('.sn-item[data-it]').forEach(b => b.onclick = () => {
    const id = b.dataset.it, [g, v] = id.split('-');
    if (free[g] && v) {
      if (id == free[g][0] || r.own[id]) {
        r[g] = v;
        SFX.pop(2);
        save();
        return snShop();
      }
    } else if (r.own[id]) {
      SFX.pop(1);
      fb(SN_SHOP.find(x => x[0] === id)[1] == 'menu' ? 'Already on your menu!' : 'Already on your stand!', 'good', 1400);
      return;
    }
    show(id);
  });
  $$('.sn-item[data-cf]').forEach(b => b.onclick = () => {
    const id = b.dataset.cf, it = SN_CAFE.find(x => x[0] === id);
    if (r.cafe[id]) {
      SFX.pop(1);
      fb(it[1] == 'stage' ? `You built the ${it[2]}!` : 'Already in your café!', 'good', 1400);
      return;
    }
    if (!snCafeReady(id, r)) {
      SFX.wrong();
      fb(`Build the ${needOf(it)[2]} first!`, 'warn long', 2200);
      return;
    }
    show('c:' + id);
  });
  if (sel) {
    $('#snno').onclick = () => snShop();
    $('#snbuy').onclick = () => {
      if (!(cafeSel ? snBuyCafe(cafeSel) : snBuy(sel))) {
        SFX.wrong();
        return;
      }
      save();
      SFX.fanfare();
      if (cafeSel) {
        const it = SN_CAFE.find(x => x[0] === cafeSel);
        fb(it[1] == 'stage' ? `${it[2]}: built! Your customers will love it.` : 'It is in your café!', 'good', 2200);
        if (it[1] == 'stage') confetti(30);
      } else {
        const it = SN_SHOP.find(x => x[0] === sel);
        fb(it[1] == 'menu' ? `${it[2]} is on the menu now!` : 'It is on your stand!', 'good', 1800);
      }
      snShop();
    };
  }
}

/* ---- the day ---- */
const snNow = () => performance.now();
function snStop() {
  if (!SN) return;
  clearInterval(SN.iv);
  clearTimeout(SN.endT);
  removeEventListener('resize', SN.rs);
  if (SN.unwire) SN.unwire();
  if (SN.ghost) SN.ghost.remove();
  snMusic(false);
  SN = null;
}
function snMsg(t, ms = 1600, cls = '') {
  const m = $('#snmsg');
  if (!m) return;
  m.textContent = t;
  m.className = 'sn-msg on' + (cls ? ' ' + cls : '');
  clearTimeout(m._t);
  m._t = setTimeout(() => m.classList.remove('on'), ms);
}
// speak an order: "A sandwich with cheese, and two cookies, please!"
const SN_SAY1 = { milk: 'a glass of milk', pizza: 'a slice of pizza', cake: 'a piece of cake', bread: 'some bread', cheese: 'some cheese' };
const snList = a => (a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0] || '');
const snNum2 = n => ['', 'one', 'two', 'three', 'four', 'five', 'six'][n] || String(n);
function snSay(order) {
  const parts = [], low = id => SN_ING[id][0].toLowerCase();
  let rest = order.slice();
  const j = rest[0] == 'bread' ? rest.indexOf('bread', 1) : -1;
  if (j > 1) {
    parts.push('a sandwich with ' + snList(rest.slice(1, j).map(low)));
    rest = rest.slice(j + 1);
  }
  const count = list => {
    const c = {};
    for (const id of list) c[id] = (c[id] || 0) + 1;
    return Object.entries(c);
  };
  const sc = rest.filter(id => SN_ING[id][1] == 'ice');
  if (sc.length) parts.push('an ice cream with ' + snList(count(sc).map(([id, n]) => (n > 1 ? snNum2(n) + ' scoops of ' : '') + low(id))));
  for (const [id, n] of count(rest.filter(id => SN_ING[id][1] != 'ice'))) {
    parts.push(n > 1 ? snNum2(n) + ' ' + SN_ING[id][3] : SN_SAY1[id] || (/^[aeiou]/.test(low(id)) ? 'an ' : 'a ') + low(id));
  }
  const t = snList(parts);
  return t.charAt(0).toUpperCase() + t.slice(1) + ', please!';
}
const SN_HI = ['Hello!', 'Hi there!', 'Good day!', 'Hello, friend!'];
const SN_YUM = ['Yum! Thank you!', 'Just right!', 'Delicious!', 'Thank you so much!', 'My favourite!'];
const snChirp = who => {
  const f = 500 + (Object.keys(SN_WHO).indexOf(who) % 7) * 70;
  snTone(f, .09, 0, 'sine', .07, f * 1.4);
  snTone(f * 1.25, .1, .1, 'sine', .06, f * 1.6);
};
// G-04a2: what a customer says for the kinds of days
const SN_ASK = { ice: 'an ice cream', juice: 'a drink', treat: 'a treat' };
function snSayC(c) {
  const low = id => SN_ING[id][0].toLowerCase();
  if (c.any) return `Can I taste ${SN_ASK[c.ast] || 'something'}? You choose!`;
  if (c.group) return (c.group == 'band' ? 'For the band: ' : c.group == 'feast' ? 'For the royal feast: ' : 'For the birthday party: ') + snSay(c.order).replace(/^./, x => x.toLowerCase());
  if (c.req) return `A ${c.req.what}, ${c.req.no ? 'no ' + SN_ING[c.req.no][3] : 'with extra ' + SN_ING[c.req.extra][3]}, please!`;
  if (c.steps) {
    const d = SN_DISHES.find(x => x.id === c.dish);
    return `${d ? d.name : 'A recipe'}, please! ` + c.order.map((id, j) => (j ? 'then ' : 'First ') + (id == 'blend' ? 'blend it' : low(id))).join(', ') + '.';
  }
  if (c.special) return `The special, please! ${(SN_DISHES.find(x => x.id === c.dish) || { name: '' }).name}.`;
  if (c.guest) return "Hello! I am today's guest. " + snSay(c.order);
  return snSay(c.order);
}
// a gentle tune for each place, made with tone() (silent with Sound effects off), only with Music on and never in Calm mode;
// it waits while the day is paused or hidden. Notes are MIDI numbers, 0 a rest; one bass note every 8 steps.
const SN_TUNE = {
  park: [[72, 76, 79, 76, 74, 0, 72, 67], [48, 53]], beach: [[74, 0, 79, 81, 79, 76, 74, 0], [50, 55]], snow: [[76, 79, 84, 0, 83, 79, 76, 0], [52, 47]],
  fair: [[72, 74, 76, 79, 76, 74, 72, 0], [48, 55]], moon: [[69, 0, 76, 0, 72, 0, 74, 71], [45, 52]], farm: [[67, 72, 72, 76, 74, 72, 0, 67], [48, 43]],
  castle: [[74, 78, 81, 0, 79, 78, 74, 0], [50, 45]], sea: [[71, 0, 74, 78, 76, 0, 74, 71], [47, 52]],
};
let SN_MUS = 0;
function snMusic(on) {
  clearInterval(SN_MUS);
  SN_MUS = 0;
  if (!on || !S.music || !S.sound || S.calm || !SN) return;
  const [tune, bass] = SN_TUNE[SN.pl.id] || SN_TUNE.park;
  let i = 0;
  SN_MUS = setInterval(() => {
    if (!SN || SN.paused || GH.held || document.hidden || S.calm) return;
    if (tune[i % 8]) snTone(NOTE(tune[i % 8]), .3, 0, 'triangle', .022);
    if (i % 8 == 0) snTone(NOTE(bass[(i / 8 | 0) % 2]), 1.2, 0, 'sine', .03);
    i++;
  }, 340);
}
// the day's goal as a short chip under the sign (the whole sentence is its label and comes with the first message)
const SN_GSHORT = { first: 'Right first time', combo: 'Perfect in a row', hearts: 'Full hearts', gold: 'Golden pancakes', change: 'Right change',
  special: 'Specials', picky: 'Special requests', party: 'Group orders', steps: 'Recipes in order', taste: 'New tastes' };
function snGoalChip() {
  const e = $('#sngoal'), g = SN && SN.st.goal;
  if (!e || !g) return;
  e.classList.toggle('done', g.done);
  e.innerHTML = `${ico(g.done ? 'check' : 'target', 18)}<span>${esc(SN_GSHORT[g.id] || 'Goal')}</span><b>${Math.min(g.got, g.need)}/${g.need}</b>`;
}

function snDay() {
  const r = snS(), pl = SN_PLACES.find(p => p.id === r.place), mode = r.mode, till = r.till && snTillOK();
  // G-04a2: the kind of day; the special of the day comes from the date (the same all day at a place); today's guest until served
  const kind = snKindFor(r), day = snToday(), tw = snTwist(day);
  const cands = snDishesFor(snAvail(r.own, pl.id, mode, kind), pl.id, mode, false).filter(d => d.items.length >= 2);
  const st = snNew({ seed: ((Date.now() & 0xffffff) ^ (r.days * 7919)) >>> 0 || 1, mode, place: pl.id, own: r.own, till, slots: innerWidth >= 560 ? 3 : 2,
    kind, special: cands.length ? cands[snHash(day + pl.id) % cands.length].id : '', guest: r.tw === tw.key ? null : tw });
  const stations = SN_STATIONS.filter(([k]) => snAvail(r.own, pl.id, mode, kind).some(id => SN_ING[id][1] == k));
  const deco = Object.keys(SN_DECO_SPOT).filter(k => r.own[k]), stage = snStage(r);
  const cdeco = stage ? Object.keys(SN_CDECO_SCENE).filter(k => r.cafe[k]) : [];
  const spd = st.special && SN_DISHES.find(d => d.id === st.special);
  view(`${GH.top('snack', { play: true, sub: pl.name, chips: snCoinChip(r.coins) })}
  <div class="sn sn-${mode} sn-c-${r.ctr} sn-j${stage}" id="sn" data-kind="${st.how}">
   <div class="sn-scene" style="--gh-a:var(--sc-${pl.sky[0]});--gh-b:var(--sc-${pl.sky[1]})">
    <svg class="art sn-back" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${SN_BACK[pl.id]()}</svg>
    <div class="sn-awnw" id="snawn"></div>
    ${r.own.bunting ? '<div class="sn-bunt" id="snbunt"></div>' : ''}
    ${r.cafe.lights ? '<div class="sn-bunt sn-lights" id="snlights"></div>' : ''}
    <div class="sn-sign sn-s-${r.sign}${r.cafe.neon && stage == 3 ? ' sn-neon' : ''}" id="snsign"><span class="sn-sf">${SN_STAGES[stage]}</span><span class="sn-sb">Closed</span>` +
    `<small class="sn-cust" id="sncust" aria-label="Customers served"><b>0</b> of ${st.n} served</small></div>
    ${r.own.bird ? `<span class="sn-bird">${snPicSVG(SN_DECO.bird())}</span>` : ''}
    ${deco.map(k => `<span class="sn-deco sn-d-${k} sn-${SN_DECO_SPOT[k]}">${snPicSVG(SN_DECO[k]())}</span>`).join('')}
    ${cdeco.map(k => `<span class="sn-deco sn-d-${k}">${snPicSVG(SN_CDECO[k]())}</span>`).join('')}
    ${r.cafe.helper2 && stage == 3 ? `<span class="sn-bird sn-chick">${snPicSVG(SN_CDECO.helper2())}</span>` : ''}
    ${r.cafe.tables && stage >= 2 ? '<div class="sn-seats" id="snseats" aria-hidden="true"></div>' : ''}
    <div class="sn-info"><span class="sn-goal" id="sngoal" role="status" aria-label="Today's goal: ${esc(st.goal.text)}"></span>` +
    (spd ? `<span class="sn-spc" aria-label="Today's special: ${esc(spd.name)}">${ico('star', 18)}<span class="sn-spi">${spd.items.map(i => snPic(i)).join('')}</span></span>` : '') + `</div>
    <div class="sn-line" id="snline"></div>
    <div class="sn-msg" id="snmsg" aria-live="polite"></div>
   </div>
   <div class="sn-counter">
    <button class="btn soft sn-undo" id="snundo" aria-label="Undo: take the last one off">${ico('undo')}<span>Undo</span></button>
    <div class="sn-plate" id="snplate"></div>
    <button class="btn primary sn-serve" id="snserve">${ico('check')}<span>Serve</span></button>
   </div>
   <div class="sn-ctl" id="snctl">
    <div class="sn-tabs" role="tablist" style="--n:${stations.length}">${stations.map(([k, name, pic]) => `<button class="sn-tab" role="tab" data-st="${k}" ` +
      `aria-selected="false"><span class="sn-tpic">${snPic(pic)}</span><span>${esc(name)}</span><i class="sn-dot" aria-hidden="true"></i></button>`).join('')}</div>
    <div class="sn-ings" id="snings"></div>
   </div>
   <div class="sn-till" id="sntill" hidden></div>
  </div>`);
  SN = { st, r, pl, stations, tab: stations[0][0], last: snNow(), iv: 0, paused: false, tray: [], drag: null, ghost: null, said: 0, seats: [], newBook: [] };
  snAwnFit();
  SN.rs = () => {
    if (!SN) return;
    snAwnFit();
    SN.st.slots = SN.st.mode == 'busy' ? (innerWidth >= 560 ? 3 : 2) : 1;
    snLine();
  };
  addEventListener('resize', SN.rs);
  snTabs();
  snLine();
  snPlate();
  snGoalChip();
  // the day's first message sits at the top of the scene (over the awning and sign), never over the customers (R-03 N4)
  snMsg(st.how == 'plain' ? (r.days ? `Today's goal: ${st.goal.text}.` : 'Look at the order, then tap the food!') :
    `${snKindName(kind, pl.id)}! ${snKindLine(kind, pl.id)}`, 3200);
  snMusic(true);
  $('#snundo').onclick = () => {
    const id = snUndo(SN.st);
    if (!id) return;
    SFX.del();
    snPlate();
  };
  $('#snserve').onclick = () => snDoServe();
  snDragWire();
  GH.wire({quit: () => snQuit(), hold: on => {
    if (SN) SN.paused = on;
    if (SN && !on) SN.last = snNow();
  }});
  gtStart('#gtm', () => snTimeUp());
  SN.iv = setInterval(snTick, 200);
  snTick();
}
const snPicSVG = inner => `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${inner}</svg>`;
// the awning is drawn with as many stripes as the width needs, so the scallops keep their shape
function snAwnFit() {
  const w = $('#snawn');
  if (!w) return;
  const W = w.clientWidth || innerWidth, n = Math.max(4, Math.round(W / 64));
  if (w.dataset.n == n) return;
  w.dataset.n = n;
  w.innerHTML = snAwning(n, SN.r.awn);
  const b = $('#snbunt');
  if (b) {
    let f = '';
    for (let i = 0; i < n * 2; i++) {
      const x = i * 32 + 16, y = 6 + 8 * Math.sin((i + .5) / (n * 2) * Math.PI);
      f += ghP(`M${x - 10} ${gh1(y)}h20l-10 15Z`, ['y', 'b', 'g', 'p'][i % 4]) + ghP(`M${x} ${gh1(y)}h10l-10 15Z`, ['y2', 'b2', 'g2', 'p2'][i % 4], .6);
    }
    b.innerHTML = `<svg class="art" viewBox="0 0 ${n * 64} 26" preserveAspectRatio="none" aria-hidden="true" focusable="false">` +
      ghL(`M0 6Q${n * 32} 22 ${n * 64} 6`, 'e3', 1.2) + f + '</svg>';
  }
  const l = $('#snlights');
  if (l) {
    let f = '';
    for (let i = 0; i < n * 2; i++) {
      const x = i * 32 + 16, y = 4 + 6 * Math.sin((i + .5) / (n * 2) * Math.PI), h = ['y', 'p', 'b', 'g', 'o'][i % 5];
      f += ghR(x - 2, y - 1, 4, 4, 1, 'e3') + ghE(x, gh1(y + 9), 5, 7, h + '2') + ghE(x - .6, gh1(y + 8.4), 4, 6, h) + ghE(x - 1.6, gh1(y + 6.4), 1.2, 2, 'w', .8);
    }
    l.innerHTML = `<svg class="art" viewBox="0 0 ${n * 64} 26" preserveAspectRatio="none" aria-hidden="true" focusable="false">` +
      ghL(`M0 4Q${n * 32} 16 ${n * 64} 4`, 'e3', 1.2) + f + '</svg>';
  }
}
function snTabs() {
  const ings = snAvail(SN.r.own, SN.pl.id, SN.st.mode, SN.st.kind).filter(id => SN_ING[id][1] == SN.tab);
  for (const b of $$('.sn-tab')) b.setAttribute('aria-selected', String(b.dataset.st === SN.tab));
  let h = ings.map(id => `<button class="sn-ing" data-ing="${id}" aria-label="${esc(SN_ING[id][0])}"><span class="sn-ipc">${snPic(id)}</span>` +
    `<span class="sn-in">${esc(SN_ING[id][0])}</span></button>`).join('');
  if (SN.tab == 'grill') h += SN.st.pans.map((p, k) => `<button class="sn-pan" data-pan="${k}" aria-label="Grill pan ${k + 1}">${snPanSVG(p)}<span class="sn-in" id="snpl${k}">${snPanLabel(p)}</span></button>`).join('');
  $('#snings').innerHTML = h;
  $('#snings').className = 'sn-ings' + (SN.tab == 'grill' ? ' grill' : '');
  for (const b of $$('.sn-tab')) b.onclick = () => {
    if (SN.tab === b.dataset.st) return;
    SFX.pop(0);
    SN.tab = b.dataset.st;
    snTabs();
  };
  for (const b of $$('.sn-pan')) b.onclick = () => snTakePan(+b.dataset.pan);
}
const snPanLabel = p => (!p ? 'Empty' : p.t < SN_COOK[0] ? 'Cooking' : p.t < SN_COOK[1] ? 'Ready!' : 'Toasty');
function snPanSVG(p) {
  const q = p ? snDone(p.t) : '', hue = q == 'pale' ? 'm' : q == 'gold' ? 'y' : 'n';
  return `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">` + ghShad(30, 54, 24, 3) + ghL('M50 40L62 36', 'k2', 5) +
    ghE(30, 42, 25, 11, 'k2') + ghE(29, 40, 23, 9, 'e3') + ghE(28, 39, 20, 7, 'k2') +
    (p ? ghE(28, 38, 16, 5.4, hue + '2') + ghE(27.4, 37, 14.6, 4.4, hue) + ghE(23, 35.6, 5, 1.2, hue + '1', .8) +
      (q == 'gold' ? ghL('M20 24L22 18M30 22V15M40 24L38 18', 'y2', 2.4, .9) : ghL('M22 26Q19 21 22 17M32 25Q29 20 32 15', 'e1', 2, .8)) : '') + '</svg>';
}
function snTakePan(k) {
  const q = snPan(SN.st, k);
  if (!q) {
    if (!SN.st.pans[k]) snMsg('Tap Pancake to put one on the grill.', 1800);
    return;
  }
  SFX.pop(2);
  if (q == 'pale') snMsg('A little pale, but yummy!', 1600);
  else if (q == 'toast') snMsg('Nice and toasty!', 1600);
  else snMsg('Golden! Perfect!', 1400, 'good');
  snTabs();
  snPlate();
}
// G-04a2: the cells of an order bubble. A taste test is one "you choose" card; a group order shows each food once with a count;
// a picky order shows the usual snack with the change (crossed out or plus); a recipe numbers its steps.
// cell: {id, n (how many), no (crossed out: not counted), plus, step (1, 2, 3 ...), ask (the station's picture)}
function snCells(c) {
  if (c.any) return [{ id: (SN_STATIONS.find(s => s[0] == c.ast) || [])[2] || c.any[0], n: 1, ask: 1 }];
  if (c.group) {
    const out = [];
    for (const id of c.order) {
      const e = out.find(x => x.id == id);
      if (e) e.n++;
      else out.push({ id, n: 1, cnt: 1 });
    }
    return out;
  }
  if (c.req) {
    const out = c.req.base.map(id => ({ id, n: 1, no: id === c.req.no ? 1 : 0 }));
    if (c.req.extra) out.push({ id: c.req.extra, n: 1, plus: 1 });
    return out;
  }
  return c.order.map((id, j) => ({ id, n: 1, step: c.steps ? j + 1 : 0 }));
}
// how many of each cell are on the plate: a recipe counts its steps in order, a taste test any one food of its station
function snCellTicks(c, cells, plate) {
  if (c.any) return [plate.length == 1 && c.any.includes(plate[0]) ? 1 : 0];
  if (c.steps) {
    let k = 0;
    while (k < plate.length && plate[k] === c.order[k]) k++;
    return cells.map((x, j) => (j < k ? 1 : 0));
  }
  const left = {};
  for (const id of plate) left[id] = (left[id] || 0) + 1;
  return cells.map(x => {
    if (x.no) return 0;
    const t = Math.min(x.n, left[x.id] || 0);
    left[x.id] = (left[x.id] || 0) - t;
    return t;
  });
}
const snCellHTML = (x, t) => `<span class="sn-oi${t >= x.n && !x.no ? ' ok' : ''}${x.no ? ' no' : ''}${x.ask ? ' ask' : ''}" data-oi="${x.id}">${snPic(x.id)}` +
  (x.cnt ? `<em class="sn-n">${x.n > 1 ? `${t}/${x.n}` : ''}</em>` : x.step ? `<em class="sn-n">${x.step}</em>` : x.plus ? '<em class="sn-n">+1</em>' : x.ask ? '<em class="sn-n">?</em>' : '') +
  (t >= x.n && !x.no ? `<i>${ico('check', 18)}</i>` : '') + '</span>';
// the customers at the counter: the animal (a button: choose who you make it for), the order bubble, the patience heart;
// G-04a2: friends at a group order, a crown for today's guest and the king, a party hat, a thinking bubble when they arrive or look again
function snLine() {
  const st = SN.st, line = $('#snline');
  if (!line) return;
  const big = st.mode == 'calm';
  line.className = 'sn-line n' + Math.max(1, st.slots) + (big ? ' big' : '');
  line.innerHTML = st.at.map((c, i) => {
    const cells = snCells(c), ticks = snCellTicks(c, cells, i === st.sel ? st.plate : []);
    const icons = cells.map((x, j) => snCellHTML(x, ticks[j])).join('');
    const heart = st.mode == 'busy' ? `<span class="sn-heart${c.pat > 0 ? '' : ' out'}" aria-hidden="true">${ico('heart', 20)}` +
      `<span class="sn-hbar"><i style="transform:scaleX(${(c.pat / c.patMax).toFixed(3)})"></i></span></span>` : '';
    const think = c.state == 'wait' && (st.clock - c.came < 1 || c.think > st.clock) ? '<span class="sn-think" aria-hidden="true"><i></i><i></i><i></i></span>' : '';
    const hat = c.guest || c.group == 'feast' ? `<span class="sn-hat" aria-hidden="true">${ico('crown', 20)}</span>` : c.group == 'party' ? `<span class="sn-hat party" aria-hidden="true">${ico('party', 20)}</span>` : '';
    const friends = c.group && c.friends ? c.friends.map((f, k) => `<span class="sn-fr f${k}" aria-hidden="true">${picArt(f, '100%')}</span>`).join('') : '';
    const kindCls = c.special ? ' sp' : c.steps ? ' steps' : c.group ? ' grp' : c.req ? ' req' : c.any ? ' ask' : '';
    const yum = c.any && c.state != 'wait' ? `Mmm, ${SN_ING[c.order[0]][0].toLowerCase()}!` : c.group ? 'Hooray! Thank you!' : SN_YUM[(c.i + st.seed) % SN_YUM.length];
    return `<div class="sn-cu${c.state != 'wait' ? ' happy' : ''}${i === st.sel && st.at.length > 1 ? ' sel' : ''}${c.group ? ' grp' : ''}" data-ci="${i}" data-who="${c.who}">` +
      (c.state == 'wait' ? `<div class="sn-bub n${cells.length}${kindCls}">${c.special ? `<span class="sn-bst" aria-hidden="true">${ico('star', 16)}</span>` : ''}${icons}</div>${heart}` :
        `<div class="sn-bub yum">${ico('heart', 26)}<span>${c.state == 'pay' ? 'Here you are!' : yum}</span><span class="sn-eat" aria-hidden="true">${snPic(c.order[0])}</span></div>`) +
      `<div class="sn-who">${friends}${think}${hat}<button class="sn-an" data-ci="${i}" aria-label="${esc(c.name + ' the ' + c.who)}${c.state == 'wait' ? ': make my order' : ''}">` +
      `${picArt(c.who, '100%')}</button></div></div>`;
  }).join('');
  for (const b of $$('.sn-an')) b.onclick = () => {
    const i = +b.dataset.ci;
    if (SN.st.at[i] && SN.st.at[i].state == 'wait' && SN.st.sel !== i) {
      SN.st.sel = i;
      SFX.pop(1);
      snLine();
      snPlate();
    } else if (SN.st.at[i] && S.voice && SN.st.at[i].state == 'wait') say(snSayC(SN.st.at[i]));
  };
}
// which order pictures already have their food on the plate
function snTicks(order, plate) {
  const left = {};
  for (const id of plate) left[id] = (left[id] || 0) + 1;
  return order.map(id => (left[id] > 0 ? (left[id]--, true) : false));
}
function snPlate() {
  const p = $('#snplate');
  if (!p) return;
  const hot = SN.st.plate.some(id => SN_HOT.includes(id));
  p.innerHTML = snPlateArt(SN.st.plate, SN.st.pq) + (SN.st.plate.length ? '' : `<span class="sn-ph">${SN.r.days ? 'Your plate' : 'Tap the food below'}</span>`) +
    (hot ? '<span class="sn-steam" aria-hidden="true"><i></i><i></i><i></i></span>' : '');
  $('#snundo').disabled = !SN.st.plate.length;
  $('#snserve').disabled = !SN.st.plate.length || !SN.st.at.some(c => c.state == 'wait');
  // ticks on the chosen customer's order
  const c = SN.st.at[SN.st.sel], cu = c && $(`.sn-cu[data-ci="${SN.st.sel}"]`);
  if (cu && c.state == 'wait') {
    const cells = snCells(c), t = snCellTicks(c, cells, SN.st.plate);
    cu.querySelectorAll('.sn-oi').forEach((e, j) => {
      const x = cells[j];
      if (!x) return;
      const ok = !x.no && t[j] >= x.n;
      e.classList.toggle('ok', ok);
      const has = e.querySelector('i'), n = e.querySelector('.sn-n');
      if (ok && !has) e.insertAdjacentHTML('beforeend', `<i>${ico('check', 18)}</i>`);
      if (!ok && has) has.remove();
      if (n && x.cnt && x.n > 1) n.textContent = `${t[j]}/${x.n}`;
    });
  }
  snGoalChip();
}
function snAddFood(id) {
  if (!SN || SN.st.pay) return;
  const ok = snAdd(SN.st, id);
  if (ok == 'step') {
    // a recipe goes step by step: say which step comes next and make its picture bounce
    const nx = snStepNext(SN.st), k = SN.st.plate.length;
    SFX.wrong();
    snMsg(`Step ${k + 1} first: ${nx == 'blend' ? 'Blend it' : SN_ING[nx][0]}!`, 2200, 'try');
    const e = $$(`.sn-cu[data-ci="${SN.st.sel}"] .sn-oi`)[k];
    if (e) {
      e.classList.remove('look');
      void e.offsetWidth;
      e.classList.add('look');
    }
    return;
  }
  if (!ok) {
    if (id == 'pancake') snMsg('Both pans are busy. Take a pancake off first!', 2000);
    else snMsg('The plate is full! Serve it or tap Undo.', 2000);
    SFX.wrong();
    return;
  }
  if (ok == 'grill') {
    noise(.5, 0, .05, 3000, 6000); // a soft sizzle
    snMsg('On the grill! Take it off when it is golden.', 2200);
    snTabs();
    return;
  }
  SFX.pop(Math.min(4, SN.st.plate.length));
  snPlate();
  // Calm: the next step's station opens by itself
  const nx = SN.st.mode == 'calm' && snStepNext(SN.st), tab = nx && SN_ING[nx][1];
  if (tab && tab != SN.tab && SN.stations.some(x => x[0] == tab)) {
    SN.tab = tab;
    snTabs();
  }
  const pl = $('#snplate');
  if (pl) {
    pl.classList.remove('bump');
    void pl.offsetWidth;
    pl.classList.add('bump');
  }
}
// tap a food, or drag it onto the plate. G-04a2: every press is one gesture and a gesture adds at most one food, so a press can
// never add a food twice, whatever the browser reports for it (a drop and its click, a click reported twice, a mouse-compatibility
// press after a touch). snGest is the whole rule, with no DOM (tools/test.js plays event sequences through it):
//   down   {id, x, y, pid, pt, t}  a press on a food button starts a gesture (a second press while the first is still down, or a
//          press of another pointer type at the same spot within 0.8 s, is the same gesture reported again)
//   move   {x, y, pid}             12 px away from the press makes it a drag (the ghost follows the finger)
//   up     {pid, t, plate}         the end of the press; a drag dropped on the counter (plate: true) adds its food
//   cancel {pid}                   the press is over and adds nothing
//   click  {id, t, kbd}            adds the food only for a gesture that has not added or dragged; a click with no press before
//          it is the keyboard (kbd: event.detail 0) and adds its food; any other click is ignored
// It returns the food to add or ''.
function snGest(g, ev) {
  const cur = g.cur;
  if (ev.type == 'down') {
    if (cur && (!cur.up || (cur.pt !== ev.pt && ev.t - cur.t < 800)) && Math.hypot(ev.x - cur.x, ev.y - cur.y) < 24) return '';
    g.cur = { n: (g.n = (g.n || 0) + 1), id: ev.id, x: ev.x, y: ev.y, pid: ev.pid, pt: ev.pt || '', t: ev.t, on: false, up: false, used: false };
    return '';
  }
  if (ev.type == 'move') {
    if (cur && !cur.up && ev.pid === cur.pid && !cur.on && Math.hypot(ev.x - cur.x, ev.y - cur.y) > 12) cur.on = true;
    return '';
  }
  if (ev.type == 'up' || ev.type == 'cancel') {
    if (!cur || cur.up || ev.pid !== cur.pid) return '';
    cur.up = true;
    if (ev.type == 'cancel') cur.used = true; // a cancelled press adds nothing, not even through a later click
    if (ev.type == 'cancel' || !cur.on) return '';
    cur.used = true; // a drag never adds again through a click
    return ev.plate ? cur.id : '';
  }
  if (ev.type == 'click') {
    if (ev.kbd) return ev.id || '';
    if (!cur || cur.used || cur.on || !ev.id || ev.id !== cur.id) return '';
    cur.used = true;
    return ev.id;
  }
  return '';
}
function snDragWire() {
  const box = $('#snings');
  SN.gest = {};
  box.addEventListener('click', e => {
    const b = e.target.closest('.sn-ing');
    if (!b || !SN) return;
    const id = snGest(SN.gest, { type: 'click', id: b.dataset.ing, t: e.timeStamp, kbd: e.detail === 0 });
    if (id) snAddFood(id);
  });
  box.addEventListener('pointerdown', e => {
    const b = e.target.closest('.sn-ing');
    if (!b || !SN) return;
    snGest(SN.gest, { type: 'down', id: b.dataset.ing, x: e.clientX, y: e.clientY, pid: e.pointerId, pt: e.pointerType, t: e.timeStamp });
  });
  addEventListener('pointermove', snDragMove);
  addEventListener('pointerup', snDragEnd);
  addEventListener('pointercancel', snDragEnd);
  SN.unwire = () => {
    removeEventListener('pointermove', snDragMove);
    removeEventListener('pointerup', snDragEnd);
    removeEventListener('pointercancel', snDragEnd);
  };
}
function snDragMove(e) {
  const d = SN && SN.gest && SN.gest.cur;
  if (!d || d.up || e.pointerId !== d.pid) return;
  snGest(SN.gest, { type: 'move', x: e.clientX, y: e.clientY, pid: e.pointerId });
  if (d.on && !SN.ghost) {
    SN.ghost = document.createElement('div');
    SN.ghost.className = 'sn-ghost';
    SN.ghost.innerHTML = snPic(d.id);
    document.body.appendChild(SN.ghost);
  }
  if (d.on && SN.ghost) SN.ghost.style.transform = `translate(${e.clientX - 36}px,${e.clientY - 36}px)`;
}
function snDragEnd(e) {
  const d = SN && SN.gest && SN.gest.cur;
  if (!d || d.up || e.pointerId !== d.pid) return;
  if (SN.ghost) SN.ghost.remove();
  SN.ghost = null;
  // dropped on the counter (the plate's row) or above it: on the plate
  const c = $('.sn-counter'), r = c && c.getBoundingClientRect();
  const id = snGest(SN.gest, { type: e.type == 'pointercancel' ? 'cancel' : 'up', pid: e.pointerId, t: e.timeStamp, plate: !!(r && e.clientY <= r.bottom + 8) });
  if (id) snAddFood(id);
}
function snDoServe() {
  const st = SN.st, res = snServe(st);
  if (res.empty) return;
  if (!res.ok) {
    SFX.wrong();
    const i = st.at.indexOf(res.c);
    st.sel = Math.max(0, i);
    snLine();
    snPlate();
    res.c.think = st.clock + 1.2;
    snLine();
    snMsg(res.c.any ? `Hmm, I asked for ${SN_ASK[res.c.ast] || 'something else'}. Just one, please!` :
      res.extra.length && !res.missing.length ? 'Oops, a little too much! Tap Undo to take some off.' :
      res.missing.length && !res.extra.length ? 'Almost! Something is still missing.' : 'Hmm, not quite! Look at the order again.', 2600, 'try');
    const cu = $(`.sn-cu[data-ci="${i}"]`);
    if (cu) for (const e of cu.querySelectorAll('.sn-oi:not(.ok)')) {
      e.classList.remove('look');
      void e.offsetWidth;
      e.classList.add('look');
    }
    return;
  }
  SFX.right(st.combo);
  setTimeout(() => SFX.coin(1), 260);
  if (SN.r.own.bell) snTone(1568, .5, .05, 'sine', .05);
  snChirp(res.c.who);
  SN.r.coins += res.pay;
  SN.r.served++;
  // G-04a2: the recipe book, today's guest, the tables
  let news = '';
  if (res.dish) {
    if (!SN.r.book[res.dish]) {
      SN.newBook.push(res.dish);
      news = 'New in your recipe book: ' + SN_DISHES.find(d => d.id === res.dish).name + '!';
    }
    SN.r.book[res.dish] = (SN.r.book[res.dish] || 0) + 1;
  }
  if (res.c.guest) {
    SN.r.tw = snToday();
    news = `${res.c.name} is so happy! +5 coins`;
  }
  if (SN.r.cafe.tables) {
    SN.seats = SN.seats.concat([{ who: res.c.who, food: res.c.order[0] }]).slice(-2);
    snSeats();
  }
  save();
  const chip = $('#sncoin');
  if (chip) UI.setChip(chip, SN.r.coins);
  const cs = $('#sncust b');
  if (cs) cs.textContent = st.served;
  let m = `+${res.pay} coins`;
  if (res.bonus) m = `Combo ${st.combo}! +${res.pay} coins`;
  else if (res.tip) m += ` (tip +${res.tip})`;
  snMsg(news || m, news ? 2400 : 1600, 'good');
  if (st.sel >= st.at.length || st.at[st.sel].state != 'wait') st.sel = Math.max(0, st.at.findIndex(c => c.state == 'wait'));
  snLine();
  snPlate();
  const an = $(`.sn-cu[data-ci="${st.at.indexOf(res.c)}"] .sn-an`);
  if (an) {
    const b = an.getBoundingClientRect();
    burst(b.left + b.width / 2, b.top + b.height * .3, 'heart');
  }
  // a sparkle over the plate for a perfect plate, a special, a group order or a new recipe
  const pp = $('#snplate');
  if (pp && (res.perfect || res.c.special || res.c.group || news)) {
    const b = pp.getBoundingClientRect();
    burst(b.left + b.width / 2, b.top + b.height * .4, 'star');
  }
  if (st.pay) snTill();
}
// the tables (café upgrade): the last two customers sit and eat at the side of the scene
function snSeats() {
  const e = $('#snseats');
  if (!e) return;
  e.innerHTML = SN.seats.map((x, k) => `<span class="sn-seat s${k}">${snPicSVG(SN_CDECO.tables())}<span class="sn-sani">${picArt(x.who, '100%')}</span>` +
    `<span class="sn-sfood">${snPic(x.food)}</span></span>`).join('');
}
// Give change: the till takes the place of the food buttons until the change is right
function snTill() {
  const p = SN.st.pay, t = $('#sntill');
  if (!p || !t) return;
  SN.tray = [];
  const coin = v => `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${ghShad(32, 58, 20, 3)}${ghC(33, 33, 25, 'y3')}${ghC(31, 31, 24, 'y2')}` +
    `${ghC(30, 30, 20, 'y')}${ghE(22, 21, 7, 4, 'y1', .9, -35)}</svg><b>${v}</b>`;
  const draw = () => {
    const sum = SN.tray.reduce((a, b) => a + b, 0);
    t.innerHTML = `<p class="sn-tq">The snack is <b>${p.price}</b> coins. ${esc(p.c.name)} pays <b>${p.paid}</b>. How much change?</p>` +
      `<div class="sn-tray" aria-label="Change: ${sum}">${SN.tray.map(v => `<span class="sn-tc">${coin(v)}</span>`).join('') || '<span class="sn-tph">Tap the coins</span>'}` +
      `<span class="sn-tsum">= <b>${sum}</b></span></div>` +
      `<div class="sn-tbtns">${[1, 2, 5, 10].map(v => `<button class="sn-coin" data-c="${v}" aria-label="${v} coin${v > 1 ? 's' : ''}">${coin(v)}</button>`).join('')}` +
      `<button class="btn soft sn-tundo" id="sntundo" aria-label="Take a coin back"${SN.tray.length ? '' : ' disabled'}>${ico('undo')}<span>Undo</span></button>` +
      `<button class="btn primary sn-give" id="sngive"${SN.tray.length ? '' : ' disabled'}>${ico('check')}<span>Give</span></button></div>`;
    for (const b of t.querySelectorAll('.sn-coin')) b.onclick = () => {
      if (SN.tray.length >= 12) return;
      SN.tray.push(+b.dataset.c);
      SFX.coin(0);
      draw();
    };
    t.querySelector('#sntundo').onclick = () => { SN.tray.pop(); SFX.del(); draw(); };
    t.querySelector('#sngive').onclick = () => {
      const r = snChange(SN.st, SN.tray);
      if (!r) return;
      if (!r.ok) {
        SFX.wrong();
        snMsg(r.tries >= 2 ? `The change is ${r.change}. ${p.paid} take away ${p.price} is ${r.change}.` : `You gave ${r.sum}. Count again: ${p.paid} take away ${p.price}.`, 3200, 'try');
        SN.tray = [];
        draw();
        return;
      }
      SFX.coin(2);
      if (r.bonus) {
        SN.r.coins += r.bonus;
        save();
        const chip = $('#sncoin');
        if (chip) UI.setChip(chip, SN.r.coins);
      }
      snMsg(r.bonus ? 'Right change! +1 coin' : 'Right change!', 1600, 'good');
      t.hidden = true;
      $('#snctl').hidden = false;
      snLine();
      snPlate();
    };
  };
  $('#snctl').hidden = true;
  t.hidden = false;
  draw();
  if (S.voice) say(`The snack is ${p.price} coins. I pay ${p.paid}. How much change?`);
}
function snTick() {
  if (!SN) return;
  const now = snNow();
  let dt = Math.min(.5, (now - SN.last) / 1000) * SN_DEV.fast;
  SN.last = now;
  if (SN.paused || GH.held || document.hidden || !$('#sn')) return;
  const st = SN.st;
  snStep(st, dt);
  let line = false;
  for (const [k, c] of st.ev) {
    if (k == 'arrive') {
      line = true;
      snChirp(c.who);
      if (st.mode == 'calm') {
        const tab = SN_ING[c.order[0]][1];
        if (SN.stations.some(s => s[0] == tab) && tab != SN.tab) {
          SN.tab = tab;
          snTabs();
        }
      }
      if (S.voice) say(SN_HI[c.i % SN_HI.length] + ' ' + snSayC(c));
    }
    if (k == 'leave') line = true;
    if (k == 'tired') line = true;
    if (k == 'gold') {
      snTone(1320, .12, 0, 'sine', .06);
      if (SN.tab == 'grill') snTabs();
    }
    if (k == 'goal') {
      SFX.star();
      snMsg('Goal done: ' + st.goal.text + '!', 2600, 'good');
      snGoalChip();
    }
    if (k == 'closed') return snClose();
  }
  st.ev.length = 0;
  // G-04a2: waiting customers are never still: every few seconds a little bob, a look at the food, a tilt or a blink
  // (one short CSS animation each time; none in Calm mode or with reduced motion, where html.calm / the media rule end them)
  if (!S.calm) st.at.forEach((c, i) => {
    if (c.state != 'wait') return;
    const k = Math.floor((st.clock - c.came) / 3.2 + c.i * .37);
    if (k === c.idk) return;
    c.idk = k;
    const an = $(`.sn-cu[data-ci="${i}"] .sn-an`);
    if (an) an.dataset.idle = ['bob', 'look', 'tilt', 'blink'][k % 4];
  });
  if (line) {
    if (st.sel >= st.at.length || (st.at[st.sel] && st.at[st.sel].state != 'wait')) st.sel = Math.max(0, st.at.findIndex(c => c.state == 'wait'));
    snLine();
    snPlate();
  } else if (st.mode == 'busy') {
    // the hearts drain smoothly without drawing the line again
    st.at.forEach((c, i) => {
      const bar = $(`.sn-cu[data-ci="${i}"] .sn-hbar i`);
      if (bar) bar.style.transform = `scaleX(${(c.pat / c.patMax).toFixed(3)})`;
    });
  }
  // the grill: pans change colour while they cook; the tab shows a dot when one is ready
  if (st.mode == 'busy') {
    const ready = st.pans.some(p => p && p.t >= SN_COOK[0]);
    const tab = $('.sn-tab[data-st="grill"]');
    if (tab) tab.classList.toggle('ready', ready);
    if (SN.tab == 'grill') st.pans.forEach((p, k) => {
      const b = $(`.sn-pan[data-pan="${k}"]`), l = $('#snpl' + k), q = p ? snDone(p.t) : '';
      if (b && b.dataset.q !== q) {
        b.dataset.q = q;
        b.innerHTML = snPanSVG(p) + `<span class="sn-in" id="snpl${k}">${snPanLabel(p)}</span>`;
      } else if (l) l.textContent = snPanLabel(p);
    });
  }
}
function snQuit() {
  save();
  snStop();
  gtStop();
  snMenu();
}
function snTimeUp() {
  save();
  snStop();
  timeUpOverlay();
}
// the last customer has gone: the sign turns to Closed, then the end card
function snClose() {
  clearInterval(SN.iv);
  gtStop();
  const s = $('#snsign');
  if (s) s.classList.add('shut');
  SFX.fanfare();
  SN.endT = setTimeout(() => snFinish(), S.calm ? 300 : 1400);
}
function snFinish() {
  if (!SN) return;
  const st = SN.st, r = snS(), pl = SN.pl, newBook = SN.newBook;
  const before = SN_PLACES.filter(p => snPlaceOpen(p, r)).map(p => p.id), kBefore = SN_KINDS.filter(k => snKindOpen(k.id, r, 'busy')).map(k => k.id);
  const cafeBefore = snCafeOpen(r);
  const stars = snStarsFor(st.right, st.n), had = r.stars[pl.id] || 0;
  r.stars[pl.id] = Math.max(had, stars);
  r.kd[st.kind] = Math.max(r.kd[st.kind] || 0, stars);
  let goal = 0;
  if (st.goal.done) {
    goal = 5;
    r.coins += goal;
  }
  const rec = st.best > r.combo && st.best >= 2;
  r.combo = Math.max(r.combo, st.best);
  r.days++;
  save();
  snStop();
  const lines = [];
  lines.push([st.goal.done ? 'target' : 'hint', st.goal.done ? `Goal done: ${esc(st.goal.text)}! +5 coins` : `Today's goal: ${esc(st.goal.text)} (${st.goal.got} of ${st.goal.need})`]);
  // G-04a2: what is new (places, kinds of days, the café journey, the recipe book), then the next goal
  for (const p of SN_PLACES) if (snPlaceOpen(p, r) && !before.includes(p.id)) lines.push(['sparkle', `New place: ${esc(p.name)}!`]);
  for (const k of SN_KINDS) if (snKindOpen(k.id, r, 'busy') && !kBefore.includes(k.id)) lines.push(['sparkle', `New kind of day: ${esc(k.id == 'place' ? "each place's own day" : k.name)}!`]);
  if (snCafeOpen(r) && !cafeBefore) lines.push(['sparkle', 'The café journey is open in the shop!']);
  if (newBook.length) lines.push(['sticker-book', `New in your recipe book: ${esc(newBook.map(d => SN_DISHES.find(x => x.id === d).name).join(', '))}`]);
  if (st.guest) lines.push(['crown', "Today's guest had a snack! +5 coins"]);
  if (stars < 2) lines.push(['hint', 'Tip: look at every picture in the bubble before you tap Serve.']);
  lines.splice(4);
  lines.push(['target', 'Next goal: ' + esc(snNextGoal(r))]);
  const time = ptLeft() > 0;
  const o = GH.end('snack', { win: true, title: 'Closed for today!', stars,
    pic: `<svg class="art gh-art" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">` +
      `${snStandArt({ r, closed: true, deco: true })}</svg>`,
    tag: rec ? 'Best combo ever!' : '',
    stats: [[String(st.served), 'customers', 'users'], ['+' + (st.coins + goal), 'coins', 'coin'], [String(st.best), 'best combo', 'flame']],
    lines,
    // NAV-01: Play again (another day), Home; the shop is the smaller choice above; with no game time left, Next goes to Learn
    btns: NAV.end3({ again: time ? 'snagain' : '', next: time ? '' : 'snlearn', home: 'snmenu', extra: UI.btn('Shop', { icon: 'bag', id: 'snendshop' }) }) });
  if (S.voice) say(`The ${['stand', 'cart', 'café', 'diner'][snStage(r)]} is closed! You served ${st.served} customers. Well done, ${S.name || 'friend'}!`);
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#snagain')) o.querySelector('#snagain').onclick = () => go(() => {
    if (ptLeft() <= 0) return snMenu();
    snDay();
  });
  if (o.querySelector('#snlearn')) o.querySelector('#snlearn').onclick = () => go(() => learnHub());
  o.querySelector('#snendshop').onclick = () => go(() => snShop());
  o.querySelector('#snmenu').onclick = () => go(() => home());
}

// The Game Room card (59-game-hub.js shows it after the games file's games)
GH.reg({
  id: 'snack', btn: 'gsnack', name: 'Snack Stand', icon: 'food', p: 'bt', sky: ['sky-1', 'sky'], art: () => snHubArt(),
  sub: () => {
    const r = snPeek(), n = snStarsAll(r);
    return r.days ? `<span>${ico('star', 18)}<b>${n}</b> of ${SN_MAXSTARS} stars</span><span>${ico('coin', 18, 'ic-coin')}<b>${snNum(r.coins, 0, 1e7)}</b> coins</span>`
      : '<span>Make snacks for animal customers</span>';
  },
  open: () => snMenu(), tapToPlay: '#snopen', saved: 'Your coins are saved.',
});
