/* ---------- LS-STOP: lessons are stops on the map (owner, 2026-11-18) ----------
   Kids skipped the lessons and guessed through practice, so a stop that has a lesson now has a lesson stop in front of it on the path
   ("Learn with <pet>"; for 3rd grade up "Challenge", the same lesson in the older pet's tone), and its practice waits until the lesson
   is done (Show passed: S.know[nid].s >= 2, written by the teach part). fix179 (owner): the lesson opens the practice stop but does not
   pass it (LS.STOP_STARS 0): the practice round still passes the stop and opens the next one. The lessons pay game time (lsPay, 58-playtime.js); the map
   shows what the next try pays.
     LS_STOPS            the stops with a lesson, per map (the live lessons of the teach parts; tools/test.js checks it equals LESSONS)
     lsStopAt(p, i)      stop i of map p has a lesson stop for this child: lessons on (TEACH.off off), a lesson, the child's band
                         (as planToday, 52b-know.js: Pre-K to 2nd below 3rd grade, 3rd to 5th from 3rd grade; a Pre-K world's
                         lessons for a Pre-K child only)
     lsGate(p, i)        its practice is locked behind the lesson. Never for a passed stop, a stop open before lessons were stops
                         (S.lsOpen, migration 6 in 00-core.js), a skipped world (placement or Test out proved it), a stop with a later
                         stop of its world passed, "Unlock every stop", or a stop the path has not reached (that one is locked anyway)
     lsOpen(p, i)        loads the lesson's parts and opens its start card (LS.open, 52-lesson.js), only if the screen the child tapped
                         from is still showing (fix179: a part that loads late never replaces a round the child has started). A part
                         that does not load is never a dead end: the practice stop opens for this session (LS_PASS), and the child
                         goes straight into its practice round, with a line in the App log.
   Nothing here is saved; open(p, i) (46-home.js) sends a locked stop to its lesson, so missions and pins cannot go round it. */
const LS_STOPS = {
  math: new Set(('pk_count1 shape1 pk_num1 sort1 pk_more1 pk_count2 pat1 pk_num2 sort2 pk_count3 tenf1 pk_more2 add4 tenf2 cnt4 tenf3 add1 miss1 sub1 '
    + 'add2 big1 cnt2 cmp1 miss2 sub2 pv1 add5 add6 add3 time1 big2 coins1 cmp2 time2 sub3 big3 mult1 coins2 sub4 time3 big4 mult2 cmp3 coins3 pv2 big5 pv3 '
    + 'sub5 time4 coins4 arr1 coins5 arr2 mfact1 mfact2 dfact1 mfact3 dfact2 mfact4 dfact3 dfact4 mbig1 frac2 round1 frac3 sub6 geo1 frac4 round2 time5 geo2 '
    + 'frac5 sub7 mfact5 pv4 mbig2 big6 dbig1 mbig3 sub8 dbig2 fact1 mbig4 big7 dbig3 fact2 round3 frac6 frac7 fop1 frac8 fop2 dec1 dec2 geo3 meas5 pv5 mbig5 '
    + 'dec3 pv6 dec4 round4 ooo1 dec5 fop3 geo4 fop5').split(' ')),
  read: new Set('abc1 abc2 abc3 syl1 abc4 sound1 sound3 pic1 sound2 build1 sent1 pic2 build2 sent2 sound4 pic3 build3 pic4 build4'.split(' ')),
};
const lsWorldG = (p, i) => PATHS[p].worlds[NODES[p][i].wi].g;
function lsBand(p, i) { const g0 = gradeOf(), wg = lsWorldG(p, i); return (g0 < 3) === (wg < 3) && (wg >= 0 || g0 < 0); }
function lsStopAt(p, i) { const n = NODES[p] && NODES[p][i]; return !!(n && !TEACH.off && LS_STOPS[p] && LS_STOPS[p].has(nid(n)) && lsBand(p, i)); }
const lsLearned = id => !!(S.know && S.know[id] && S.know[id].s >= 2);
const LS_PASS = {}; // fix179: stops whose lesson could not load, open for this session (not saved: the next start tries the lesson again)
function lsGate(p, i) {
  if (!lsStopAt(p, i) || S.unlockAll || passed(p, i) || !unlocked(p, i)) return false;
  const id = nid(NODES[p][i]);
  return !lsLearned(id) && !LS_PASS[id] && !(S.lsOpen && S.lsOpen[id]) && !worldSkipped(p, NODES[p][i].wi) && !stopBehind(p, i);
}
// the parts a lesson lives in (teachWarm's lists): reading and Pre-K lessons in teachrd, grade 3-5 lessons in teach35
const lsParts = (p, i) => ['teach', 'teach12'].concat(p == 'read' || lsWorldG(p, i) < 0 ? ['teachrd'] : lsWorldG(p, i) >= 3 ? ['teach35'] : []);
function lsOpen(p, i) {
  const id = nid(NODES[p][i]), a = typeof $ == 'function' && $('#app'), scr = a && a.firstElementChild, here = () => !scr || scr.isConnected;
  SFX.whoosh();
  return partsLoad(lsParts(p, i)).then(bad => {
    if (!bad && typeof LS != 'undefined' && LESSONS[id]) { if (here()) LS.open(id); return; }
    LS_PASS[id] = 1;
    if (!here()) return;
    try { logErr('lesson part ' + (bad || 'teach') + ' did not load for ' + id + ': its practice opened'); } catch (e) {}
    fb("The lesson isn't ready yet. Let's practice!", 'warn long', 3000);
    open(p, i); // the gate is open now (LS_PASS): the stop's own way in (46-home.js)
  });
}
// the lesson stop on the map: its button, its ticket (what the next try pays) and its label. x, y: map px; W: map width
function lsNodeHTML(p, i, x, y, W) {
  const n = NODES[p][i], id = nid(n), lk = !unlocked(p, i), dn = lsLearned(id), up = gradeOf() > 2, tag = lk ? '' : lsPriceTag(id), cur = !lk && lsGate(p, i);
  const said = tag == 'done today' ? ', game time done today' : tag ? `, earns ${tag.slice(1).replace('min', 'minutes')} of game time` : '';
  return `<button class="btn lsn s-${p}${lk ? ' lock' : ''}${dn ? ' done' : ''}${cur ? ' cur' : ''}" data-ls="${i}" style="left:${x}px;top:${y}px"`
    + ` aria-label="${esc(`Learn ${n.t} with ${petN()}`)}${lk ? ', locked' : dn ? ', learned' : ''}${said}">${ico(lk ? 'lock' : dn ? 'check' : up ? 'bolt' : 'doc', 30)}</button>`
    + (tag ? `<div class="lsn-tk${tag == 'done today' ? ' dn' : ''}" style="left:${x + (x > W / 2 ? -78 : 78)}px;top:${y}px" aria-hidden="true">${ico(tag == 'done today' ? 'check' : 'ticket', 18)}<span>${tag}</span></div>` : '')
    + `<div class="nlab lsn-lab" style="left:${x}px;top:${y + 34}px;max-width:150px">${esc(up ? 'Challenge' : 'Learn with ' + petN())}</div>`;
}
