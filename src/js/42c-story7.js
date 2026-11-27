/* STORIES-7: with STORY7_ON (42c-story7on.js, BUILT from docs/drafts/STORIES7-READ.md) a Stories stop follows each phonics stop of
   ST7_STOPS on the reading map (drawMap, 46-home.js); with 0 the map is as before. It opens with the stop's practice (st7OpenAt);
   the stories and the reader are in teachrd (52w-story7d.js, 52x-story7.js). */
const ST7_STOPS = ['pic1', 'pic2', 'sound4', 'pic3', 'pic4', 'pic5', 'pic6'];
const st7At = (p, i) => !!STORY7_ON && p == 'read' && !!NODES[p][i] && ST7_STOPS.includes(nid(NODES[p][i]));
const st7OpenAt = i => unlocked('read', i) && !lsGate('read', i);
function st7NodeHTML(i, x, y) {
  const lk = !st7OpenAt(i);
  return `<button class="btn st7n s-read${lk ? ' lock' : ''}" data-st7="${i}" style="left:${x}px;top:${y}px" aria-label="${esc('Stories: ' + NODES.read[i].t)}${lk ? ', locked' : ''}">${ico(lk ? 'lock' : 'skill-story', 30)}</button>`
    + `<div class="nlab lsn-lab" style="left:${x}px;top:${y + 34}px;max-width:150px">Stories</div>`;
}
function st7Go(i) {
  if (!st7OpenAt(i)) { SFX.wrong(); fbSay(lsGate('read', i) ? `Learn it with ${petN()} first!` : 'Finish the stop before this one!'); return; }
  SFX.whoosh();
  partsThen(['teach', 'teach12', 'teachrd'], () => ST7.shelf(nid(NODES.read[i])), {title: 'Stories', icon: 'skill-story', line: 'Getting the stories ready...'});
}
