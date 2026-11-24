/* Whistlestop teach v194. BUILT by tools/build.py from 52-lesson.css, 52-lesson.js, 52b-know.js, 52c-scripts.js, 52d-notebook.js: never edit by hand.
   index.html v194 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v194.js. */
(function(){var s=document.createElement('style');s.id='css-teach';s.textContent="/* TEACH-1: the lesson screen (52-lesson.js, part teach). It is the question screen (.play.qs, .qarea, .inp) with the pet on top of\n   the prompt card: the pet, its caption bubble and \"Hear it again\". Tokens only. */\n.ls-pips{display:flex;gap:6px;align-items:center;flex:1;justify-content:center;min-width:0}\n/* LESSON-STAGE (owner, 2026-11-23): the six beats as a little train's stops on a worn path like the map's trail: white stones, gold\n   once passed (each holds the world's job prop, so the job fills up), the train at the stop of now */\n.ls-top .ls-pips{position:relative;padding:0 var(--s-1)}\n.ls-top .ls-pips::before{content:'';position:absolute;left:var(--s-3);right:var(--s-3);top:50%;height:12px;margin-top:-6px;border-radius:var(--r-pill);\n  background:var(--ill-cream-1);box-shadow:0 0 0 3px var(--surface),0 3px 0 3px var(--line)}\n.ls-pip{position:relative;display:grid;place-items:center;width:34px;height:34px;border-radius:var(--r-pill);background:var(--ill-white-2);\n  box-shadow:inset 0 -3px 0 var(--ill-grey);transition:transform var(--t) var(--ease)}\n.ls-pip .ls-jp{width:26px;height:26px;display:block}\n.ls-pip .ls-tr{width:30px;height:30px;display:block}\n.ls-pip.on{background:var(--star);box-shadow:inset 0 -3px 0 var(--star-shade)}\n.ls-pip.now{background:var(--surface);box-shadow:inset 0 0 0 3px var(--c,var(--math)),0 3px 0 var(--c-shade,var(--math-shade));transform:scale(1.2)}\n/* TEACH-UX: the beat label under the dots (\"Step 1 of 6 · Remember\"); the pair is no taller than the house button, so the bar keeps its\n   height. On a phone the lesson's name gives the label its room (the start card has the name), and the bar's gaps are smaller under 400 px */\n.ls-beats{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:0}\n.ls-beats .ls-pips{flex:none;max-width:100%}\n.ls-step{max-width:100%;font-size:var(--fs-2);font-weight:700;line-height:1.1;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n/* LESSON-STAGE: the words are for screen readers only (the train's stops show the step) */\n.ls-beats>.ls-step{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n@media (max-width:480px){.ls-top .ls-tag{display:none}}\n@media (max-width:400px){.top.tbar.ls-top{gap:var(--s-1)}} /* fix v194: \" of 6\" stays (the label is for screen readers only now) */\n.ls-tag span{max-width:9em;overflow:hidden;text-overflow:ellipsis}\n.ls-top .ls-tag{flex:none}\n.ls-pet{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:560px;text-align:left}\n.ls-art{flex:none;width:96px;height:96px}\n.ls-art .petwrap,.ls-art svg{width:100%;height:100%;display:block}\n.ls-bub{flex:1;min-width:0;min-height:48px;display:flex;align-items:center;position:relative;background:var(--surface);color:var(--ink);box-shadow:var(--shadow);border-radius:var(--r-card);\n  padding:var(--s-1) var(--s-3);font-size:var(--fs-2);font-weight:700;line-height:var(--lh-2);opacity:.35;transition:opacity var(--t) var(--ease)}\n.ls-bub>span{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}\n.ls-bub.on{opacity:1}\n.ls-bub::before{content:'';position:absolute;left:-9px;top:50%;margin-top:-9px;border:9px solid transparent;border-left:0;border-right-color:var(--surface)}\n.btn.ls-hear{flex:none}\n.ls-turn .ls-bub{background:var(--star-tint);box-shadow:inset 0 0 0 3px var(--star)}\n.ls-turn .ls-bub::before{border-right-color:var(--star)}\n.ls-pw{display:flex;justify-content:center;max-width:100%}\n.ls-pw .viz{max-width:100%}\n.slot.ls-pv{background:var(--star-tint);color:var(--ink)}\n.ls-oops .ls-pw,.ls-oops .ls-pv{outline:4px dashed var(--try);outline-offset:4px;border-radius:var(--r-chip)}\n.ls-qm{color:var(--math-shade)}\n.ls-judge{display:flex;gap:var(--s-3);justify-content:center}\n.ls-judge .btn{flex:1 1 0;min-width:0;max-width:220px;min-height:72px}\n.ls-judge .btn .ic{width:36px;height:36px}\n.ls-judge .btn.right{background:var(--good-tint);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good)}\n.ls-judge .btn.ls-pk{outline:4px solid var(--brand);outline-offset:2px}\n.inp.ls-wait{opacity:.45;pointer-events:none;transition:opacity var(--t) var(--ease)}\n#lsinp>.btn.lg{margin:0 auto;display:flex}\n.ls-dot{display:inline-block;width:26px;height:26px;border-radius:50%;vertical-align:middle}\n.ls-dot.ls-d1{background:var(--math);box-shadow:inset 0 -3px 0 var(--math-shade)}\n.ls-dot.ls-d2{background:var(--play);box-shadow:inset 0 -3px 0 var(--play-shade)}\n/* the offer on the math map: a notebook in a bubble, by the stop the pet suggests */\n.btn.ls-go{position:absolute;width:56px;height:56px;min-height:56px;margin:-28px 0 0 -28px;padding:0;border-radius:50%;z-index:4;display:grid;place-items:center;\n  background:var(--surface);color:var(--math-shade);box-shadow:inset 0 0 0 3px var(--math),0 4px 0 var(--math-shade)}\n.btn.ls-go .ic{width:30px;height:30px}\n.btn.ls-go::after{content:'';position:absolute;inset:-7px;border:3px solid var(--math);border-radius:50%;opacity:0;animation:k-ring var(--t-loop) var(--ease) infinite;pointer-events:none}\n.btn.ls-go:active{transform:translateY(3px);box-shadow:inset 0 0 0 3px var(--math),0 1px 0 var(--math-shade)}\n/* LESSON-STAGE (owner, 2026-11-23): the lesson happens in its stop's world (LS.scene: the map's world scene, behind everything, no\n   taps, no motion). The prompt card shrinks to what it holds (no empty half card), the pet stands big on the ground under it and\n   reacts (its jump on a right answer, its wobble and \"oops\" face on a miss); names in the top bar sit on white pills over the sky. */\n.ls-scn{position:fixed;left:0;top:0;right:0;bottom:0;z-index:0;overflow:hidden;pointer-events:none}\n.ls-scn>.wband{border-radius:0;box-shadow:none}\n.ls-top,.ls-play,.ls-end{position:relative;z-index:1}\n.ls-top .ttl,.ls-top .ls-tag{flex:0 1 auto;padding:var(--s-1) var(--s-3);border-radius:var(--r-pill);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line)}\n.ls-top .ttl{display:flex;align-items:center;gap:var(--s-1);margin-right:auto}\n.ls-top .ls-tag{color:var(--ink-2)}\n.qs.ls-play .qarea{background:none;box-shadow:none;border-top:0;padding:var(--s-2);justify-content:flex-start}\n.qs.ls-play .qarea>*{margin-top:0;margin-bottom:0}\n.qs.ls-play .prompt{padding:var(--s-3) var(--s-4);border-radius:var(--r-card);background:var(--surface);border-top:5px solid var(--c,var(--brand));box-shadow:inset 0 0 0 2px var(--line),var(--shadow)}\n.qs.ls-play .prompt:empty{display:none}\n.qs.ls-play .qhint:empty,.qs.ls-play .qhint:has(.hint:empty){display:none}\n.qs.ls-play .ls-pet{order:3;margin-top:auto;align-items:flex-end;max-width:none}\n.qs.ls-play .ls-bub{align-self:center}\n.qs.ls-play .inp{position:relative}\n.qs.ls-play .inp>.btn.lg,.qs.ls-play .ls-judge{margin-top:auto;margin-bottom:auto}\n/* the start and end cards. LESSON-STAGE: the pet stands on the stop's world, the card beside it (side by side when wide, so the\n   buttons always fit a 1024 x 600 tablet); auto margins centre them and never push anything out of reach when it is taller */\n.ls-end{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);padding:var(--s-3) var(--s-4) var(--s-4)}\n.ls-end>.ls-art{margin-top:auto}\n.ls-endc{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);text-align:center;max-width:560px;width:100%;margin-bottom:auto;\n  padding:var(--s-4);border-radius:var(--r-hero);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),var(--shadow)}\n.ls-endc h1{margin:0;font-size:var(--fs-5)}\n.ls-h{display:flex;align-items:center;justify-content:center;gap:var(--s-2)}\n.ls-art.ls-big{width:150px;height:150px}\n.ls-idea{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-4);font-weight:700;color:var(--ink);background:var(--math-tint);border-radius:var(--r-card);padding:var(--s-2) var(--s-4)}\n.ls-idea .ic{flex:none;color:var(--math-shade)}\n.ls-win{display:flex;align-items:center;justify-content:center;gap:var(--s-4);flex-wrap:wrap}\n.ls-earn{align-self:stretch}\n.ls-acts{display:flex;gap:var(--s-3);flex-wrap:wrap;justify-content:center}\n.ls-job{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-4);font-weight:700;color:var(--ink);text-align:left}\n.ls-job .ls-jp{flex:none;width:56px;height:56px}\n.ls-win .ls-jp{flex:none;width:40px;height:40px} /* fix v194: the job the lesson helped with, by the stars (a picture, no words) */\n@media (orientation:landscape){\n  .ls-end{flex-direction:row;justify-content:center;align-items:flex-end;gap:var(--s-5)}\n  .ls-end>.ls-art.ls-big{width:clamp(130px,34vh,240px);height:clamp(130px,34vh,240px);margin:0}\n  .ls-endc{align-self:center;margin:auto 0}\n}\n@media (orientation:portrait) and (max-height:820px){.ls-art.ls-big{width:112px;height:112px}.ls-endc{gap:var(--s-2);padding:var(--s-3)}}\n@media (max-height:640px){.ls-endc{gap:var(--s-2);padding:var(--s-3) var(--s-4)}.ls-endc .ls-acts .btn.lg{min-height:60px;font-size:var(--fs-4)}.ls-idea{font-size:var(--fs-3)}}\n@media (max-width:480px){.ls-endc .ls-acts .btn.lg{min-height:56px;font-size:var(--fs-4);padding-left:var(--s-4);padding-right:var(--s-4)}.ls-idea,.ls-job{font-size:var(--fs-3)}}\n@media (min-width:700px) and (min-height:700px){.ls-play .ls-art{width:150px;height:150px}.ls-bub{font-size:var(--fs-3);min-height:64px}.ls-pet{max-width:640px}}\n@media (orientation:landscape) and (min-width:700px){.ls-play .ls-art{width:clamp(110px,28vh,190px);height:clamp(110px,28vh,190px)}}\nhtml.calm .btn.ls-go::after{animation:none}\n/* TEACH-2: a repair's contrast (the right answer beside the held idea's, on one picture each) */\n.ls-con{display:flex;gap:var(--s-3);justify-content:center;flex-wrap:wrap;width:100%}\n.ls-cpane{flex:1 1 140px;max-width:300px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:var(--s-1);padding:var(--s-2);border-radius:var(--r-card);background:var(--surface)}\n.ls-cpane.ok{box-shadow:inset 0 0 0 3px var(--good)}.ls-cpane.ok>.ic{color:var(--good-ink)}\n.ls-cpane.no{box-shadow:inset 0 0 0 3px var(--try)}.ls-cpane.no>.ic{color:var(--ink-2)}\n.ls-cpane .viz,.ls-cpane svg{max-width:100%;height:auto}\n/* TEACH-2: the notebook (52d-notebook.js) */\n.nbk{padding:var(--s-3) var(--s-4) var(--s-6)}\n.nbk-in{max-width:880px;margin:0 auto;display:flex;flex-direction:column;gap:var(--s-4);align-items:center}\n.nbk-top .chip{flex:none}\n.nbk-pages{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:var(--s-3);width:100%;align-items:start}\n.nbk-pg{display:flex;flex-direction:column;gap:var(--s-2);padding:var(--s-3);background:var(--surface);border-radius:var(--r-card);box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--line);cursor:pointer;min-width:0}\n.nbk-pg.kept{box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.nbk-pic{display:flex;flex-direction:column;align-items:center;gap:var(--s-1);min-height:120px;background:var(--math-tint);border-radius:var(--r-chip);padding:var(--s-2);overflow:hidden}\n.nbk-pic .pkq,.nbk-pic .viz,.nbk-pic svg{max-width:100%;height:auto}\n.nbk-pic .eq{font-size:var(--fs-4)}\n.nbk-idea{margin:0;font-size:var(--fs-3);font-weight:700;color:var(--ink);line-height:var(--lh-2)}\n.nbk-foot{display:flex;align-items:center;justify-content:space-between;gap:var(--s-2)}\n.nbk-t{display:flex;align-items:center;gap:var(--s-1);color:var(--ink-2);font-weight:700;min-width:0}\n.nbk-star{color:var(--star-ink);flex:none}\n.nbk-empty{display:grid;place-items:center;width:160px;height:160px;border-radius:50%;background:var(--math-tint);color:var(--math-shade)}\n.nbk-next .btn{min-width:220px}\n/* TEACH-2: the report card's lessons by stage (82-report.js calls LSREP) */\n.rp-ls{display:grid;gap:2px;margin:var(--s-2) 0;font-size:var(--fs-1)}\n.rp-lsr{display:grid;grid-template-columns:minmax(0,2.2fr) repeat(4,minmax(0,1fr));gap:var(--s-1);align-items:center;padding:var(--s-1) 0;border-bottom:1px solid var(--line)}\n.rp-lsh{font-weight:700;color:var(--ink-2);align-items:end;overflow-wrap:anywhere}.rp-lsh>span+span{text-align:center}\n.rp-lsn{text-align:center;font-weight:700;color:var(--ink-2)}\n.rp-lsn.on{color:var(--ink);background:var(--good-tint);border-radius:var(--r-chip)}\n.rp-noticed .rp-pin{display:flex;margin-top:var(--s-2)}\n@media (max-width:560px){.rp-lsr{grid-template-columns:repeat(4,minmax(0,1fr));row-gap:2px}.rp-lsr>[role=rowheader]{grid-column:1/-1;font-weight:700}\n  .rp-lsh>span:first-child{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.rp-lsh{text-align:center}}\n/* TEACH-2b: the workbench pieces of the grade 1 and 2 lessons (52f-bench.js): blocks in a second colour, the trade buttons, groups,\n   the named clock hands */\n.viz .ls-b2{fill:var(--play-shade)}\n.viz .ls-gd{fill:none;stroke:var(--math)}\n.ls-trs{gap:var(--s-2)}\n.mmb.ls-tr{font-size:var(--fs-2);font-weight:700;padding:0 var(--s-3);white-space:nowrap}\n.ls-hh,.ls-mh{display:inline-block;vertical-align:middle;width:22px;height:6px;border-radius:3px;margin-right:6px;background:var(--read)}\n.ls-mh{width:30px;height:4px;background:var(--math)}\n.mm-hands .mms{column-gap:var(--s-2);row-gap:2px}\n.mm-hands .mml{min-width:0;flex-basis:100%;text-align:center}\n/* LS-STOP: the end card's ticket that lands in the bank chip. Calm mode and reduced motion end the motion at once (20-base.css).\n   LESSON-STAGE (owner, 2026-11-23): no ticket meter in the top bar and no price on the start card: game time shows only at the end. */\n.ls-tk{display:inline-flex;align-items:center;gap:var(--s-1);padding:var(--s-1) var(--s-4) var(--s-1) var(--s-2);border-radius:var(--r-pill);\n  font-family:var(--font-display);font-size:var(--fs-5);font-weight:700;color:var(--ink);background:var(--play-tint);box-shadow:inset 0 0 0 3px var(--play),0 3px 0 var(--play-shade)}\n.ls-tk .ic{color:var(--play-shade)}\n.ls-tk.land{animation:ls-land var(--t-slow) var(--ease) forwards}\n@keyframes ls-land{to{transform:translateY(-40px) scale(.6);opacity:0}}\n.ls-earn .ls-gt b{color:var(--ink)}\n.ls-earn .ls-gt0 span{color:var(--ink-2)}\n\n/* LESSON-STAGE (owner, 2026-11-23): models tapped directly (frame2: the squares, bars2: the parts, K2MM.*.tap); the drawing is bigger\n   and is the control, the stepper rows (the keyboard's way) sit side by side under it, smaller */\n.mm-frame2 .mmc.mmcol,.mm-bars2 .mmc.mmcol{flex-direction:row;flex-wrap:wrap;column-gap:var(--s-4);row-gap:var(--s-1)}\n.mm-frame2 .mmn,.mm-bars2 .mmn{font-size:var(--fs-4)}\n.mm-frame2 .mmb,.mm-bars2 .mmb{box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--line)}\n@media (max-width:480px){.qs.ls-play .prompt{padding:var(--s-2)}.qs.ls-play .qarea{gap:var(--s-2)}.ls-play .ls-art{width:72px;height:72px}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- TEACH-1: "Sparky teaches", the lesson (part teach; docs/TEACH-PLAN-2.md, batch 1) ----------
   A lesson is a short class the child's pet runs, about 3 minutes (owner decision 2): it always opens with two "show me" items and
   always ends on a win.
     pre    2 items, one try, no help: the pre-check of the measure, and the test-out (both right: straight to Show)
     rem    Remember: 1 item from a learned lesson that is due (none on the first lessons); help on a miss
     exp    Explore: 1 open task on the model (no wrong answer, only "not yet")
     name   Name it: the pet names the idea on what the child made (spoken lines, the picture with its numbers)
     tog    Together: 3 items, help that fades (build, then picture, then symbols); a miss shows the picture, lets the child try
            again, and the next item drops one stage
     chk    Check me: the pet's own announced turn ("My turn. Check me!"). It is the ONLY place the pet is ever wrong (owner rule):
            the child marks the pet's answer right or not, and fixes it when it is not. About one time in four the pet is right.
     show   Show: 2 items, one try, no help: the post-check of the measure; both right passes the stop
     win    when Show was not both right: one more build with the picture and help, so the lesson ends on a success
   The six beats of the plan are rem, exp, name, tog, chk, show (the dots in the top bar); pre and win frame them.
   The state machine (LS.make, LS.cur, LS.answer, LS.next, LS.finish, LS.record) has no DOM: tools/test.js runs it in Node with
   simulated children. The screen (LS.start, LS.show, LS.submit, LS.end) renders the items with KIND like placement does (PL) and
   never touches the round (G, check, next, finish). Nothing in a lesson needs reading: every line is spoken by say() (tablet voice
   or a recording) for Pre-K to 1st, captions are short, and the answer controls wake when the line has been said (cap 6 s).
   Saved: S.know, S.lm, S.lr, S.les (52b-know.js); the stop record the same way finish() writes it (LS.record).
   LS-STOP (owner, 2026-11-18): a lesson is a stop on the map (42b-lstop.js) and opens on a start card (LS.open) with two ways in:
     "Let's learn" (o.learn): no show-me items, straight into the teaching beats;
     "I already know this!" (o.know): the two show-me items (never two-choice); both right with no help goes to Show, and the first
     miss slides into the teaching beats at once (no "wrong" sound, no penalty: st.slide).
   Guessing never pays (o.proof, every lesson the screen starts): Check me goes on until the child finds a mistake of the pet's
   (st.caught), with at most two more turns in which the pet is always wrong; a pass pays only when it was proven (tested out, or
   caught). The pay (lsPay, 58-playtime.js) is in LS.record; the top bar's ticket meter shows what the lesson pays now and fills as
   the beats are done, and the end card lands the minutes in the bank. */
const LSB = ['pre', 'rem', 'exp', 'name', 'tog', 'chk', 'show', 'win'];
const LS_PIPS = [['rem', 'replay', 'Remember'], ['exp', 'blocks', 'Explore'], ['name', 'hint', 'Name it'], ['tog', 'users', 'Together'],
  ['chk', 'check-circle', 'Check me'], ['show', 'star', 'Show']];
const LS = {
  TOG: 3,        // Together items
  PET_OK: .25,   // how often the pet is right in Check me
  WAKE: 6000,    // the answer controls wake at the latest this long after a spoken line starts
  RUSH: 800,     // LS-STOP: an answer this soon after the controls woke is a rushed one (two or more: not a good try)
  /* fix179 (owner, 2026-11-18: practice is still required): the stars a passed lesson gives its practice stop (S.maps, LS.record). 0: a
     passed lesson OPENS its practice stop (lsGate reads the lesson's own record, S.know[nid].s >= 2) but does not pass it; the child
     plays the stop's practice round (paid as rounds are) to pass it and open the next stop. The end card leads to Practice and has no
     "Next stop unlocked" (rec.next reads unlocked()). A lesson never lowers or removes stars a stop already has. (2 was v179 before
     this decision: the lesson passed the stop, so a map could be crossed on test-outs alone.) */
  STOP_STARS: 0,
  st: null, u: null, seq: 0,
  // ---- the state machine ----
  // a new lesson. o: {seed, rem: [lesson ids due], day, S (the save; default S), at: beat to resume at, pre / post: results already
  // given, chkN: the extra Check me turns already given}
  make(id, o = {}) {
    // PLAY-01 (fix179 follow-up): a resumed one-try beat never asks an item the child has already seen there (S.les.q, LS.keep): its
    // fresh seed is drawn again (up to 12 times) while its first item is one of them
    if (Array.isArray(o.avoid) && o.avoid.length && !(o.seed >>> 0)) {
      let st = null;
      for (let k = 0; k < 12; k++) {
        st = LS.make(id, Object.assign({}, o, {avoid: null, seed: ((Math.random() * 4294967295) >>> 0) + 1}));
        const it = LS.cur(st);
        if (!it || !it.q || !o.avoid.includes(it.q.label)) break;
      }
      return st;
    }
    const L = LESSONS[id], seed = (o.seed >>> 0) || ((Math.random() * 4294967296) >>> 0);
    const st = {id, L, seed, r: mulberry32(seed + (o.at | 0)), b: -1, items: [], i: 0, pre: (o.pre || []).slice(), post: (o.post || []).slice(0, 2), to: false, ctx: {}, chk: [],
      rem: (o.rem || []).filter(x => LESSONS[x] && x !== id), day: o.day || 0, S: o.S || S, last: -1, drop: false, done: false,
      repair: BUGS[o.repair] ? o.repair : null, proof: !!o.proof, slide: !!o.know, caught: !!o.caught, chkN: Math.min(2, o.chkN | 0), rush: 0};
    if (o.at && st.pre.length == 2 && st.pre.every(Boolean) && o.at <= LSB.indexOf('show')) st.to = true;
    // fix179: a test-out already missed after "I already know this!" (the child left during the slide line) goes on into the teaching beats
    const at = !o.at && st.slide && st.pre.some(x => !x) ? 1 : o.at | 0;
    LS.beat(st, Math.max(0, Math.min(o.learn && !o.at ? 1 : at, LSB.indexOf('show')))); // LS-STOP: "Let's learn" starts at Remember
    return st;
  },
  /* fix179: the options that resume a lesson left part way (S.les, written by LS.keep). The teaching beats come back as they were (the
     same seed: the child loses nothing); the one-try items (the test-out, Show) and Check me get FRESH items (a new seed), with the
     answers already given kept (pre, post, the pet's mistake found), so a lesson left and resumed can never be passed, or paid, by
     remembering the questions. A Show or test-out item answered and then left during its line is never asked again. */
  resume(les, day) {
    const B = LSB[les.b | 0], fresh = ['pre', 'chk', 'show', 'win'].includes(B);
    return {seed: fresh ? 0 : les.s, at: les.b | 0, pre: les.pre, post: les.post, chkN: les.m, day, rem: [], repair: les.r, proof: true, know: !!les.k, caught: !!les.c,
      avoid: fresh && Array.isArray(les.q) ? les.q : null};
  },
  // fix179: the lesson's place in the save (S.les): the beat, its seed, the one-try answers given, how it started, the pet's mistake found
  keep(st) {
    if (!st || st.done) return;
    const o = {n: st.id, b: st.b, s: st.seed, pre: st.pre.slice()};
    if (st.post.length) o.post = st.post.slice();
    if (st.chkN) o.m = st.chkN;
    if (st.repair) o.r = st.repair;
    if (st.slide) o.k = 1; // LS-STOP: how the lesson was started, and the pet's mistake found
    if (st.caught) o.c = 1;
    const B = LSB[st.b]; // PLAY-01: the one-try items on show now, so a resumed beat never asks them again (LS.make avoid)
    if (B == 'pre' || B == 'show') o.q = st.items.map(x => x.q && x.q.label).filter(Boolean).slice(0, 2);
    st.S.les = o;
  },
  cur: st => (st.done ? null : st.items[st.i] || null),
  beat(st, b) {
    const L = st.L, r = st.r, T = lsTone(), B = LSB[b];
    st.b = b;
    st.i = 0;
    let it = [];
    if (B == 'pre') it = [0, 1].slice(st.pre.length).map(k => ({m: 'ask', one: 1, q: L.q(L.test, r), lines: k ? [] : [T.hi(lsName()), T.first]}));
    else if (B == 'rem') {
      // TEACH-UX: the line first says that building comes after this one item (T.remGo)
      it = st.rem.slice(0, 1).map(x => ({m: 'ask', help: 1, rem: x, q: LESSONS[x].q(LESSONS[x].test, r), lines: [T.remGo, T.rem]}));
      // TEACH-2b: nothing due, and the script has a warm-up on the idea it builds on: that, with the script's Remember line
      if (!it.length && L.warm) { const q = L.warm(r); it = [{m: 'ask', help: 1, warm: 1, q, lines: [T.remGo].concat(L.w ? lsW(L.w.beats.remember, 0, q.sl) : [T.rem])}]; }
      // TEACH-UX: Pre-K to 2nd grade (the little pet) see the item's model from the start, not only after a miss (LS.model, LS.prompt)
      // fixRev (v184): only the Pre-K to 2nd grade lessons' pictures (a grade 3-5 hint can draw the worked result: the product's blocks)
      if (T === LS_TONE.little) for (const x of it) if ((x.rem ? LESSONS[x.rem] : L).band != '35' && LS.model(x.q)) x.mdl = 1;
    }
    else if (B == 'exp') {
      st.exp = L.exp(r);
      it = [{m: 'open', q: st.exp.q, nudge: st.exp.nudge, lines: [T.play].concat(st.exp.lines || [])}];
      // a repair (TEACH-PLAN-2 system C): the lesson opens with a contrast on the model, the right answer beside the held idea's
      const c = st.repair && LS.contrast(st, st.repair);
      if (c) it.unshift(c);
    } else if (B == 'name') {
      const n = L.name(st.ctx, r);
      it = [{m: 'say', html: n.html, lines: n.lines}].concat(n.also || []); // TEACH-5S: Spanish "say it with me" after the naming
    } else if (B == 'tog') it = [LS.togItem(st, [T.tog])];
    else if (B == 'chk') it = L.chk ? L.chk(st) : [LS.petItem(st)]; // TEACH-3: grades 3-5 have their own Check me (52i-bench35.js)
    else if (B == 'show') it = [0, 1].slice(st.post.length).map(k => { // fix179: a resumed Show asks only the items not yet answered
      // TEACH-2b: a drafted script frames Show as its job in the world (its Show lines), unless the child tested out
      const q = L.q(L.test, r), w = L.w && !st.to ? lsW(L.w.beats.show, k, q.sl) : [];
      return {m: 'ask', one: 1, q, lines: k ? (L.w && L.w.beats.show.length > 1 ? w : []) : [st.to ? T.testOut : w[0] || T.showMe]};
    });
    else if (B == 'win') it = [{m: 'ask', help: 3, win: 1, q: L.q(0, r), lines: [T.more]}];
    st.items = it;
    return it.length ? st : LS.after(st);
  },
  /* TEACH-UX: the model of a Remember or warm-up item for the little ones: the picture its hint draws after a miss (the ten frame,
     the blocks, the number line, the groups), without the hint's words (they can count the answer out: "Count by 2s: 2, 4, 6, 8").
     Only for a typed answer whose question has no picture of its own: a build (make, build, line) is its model already, and a
     choice's picture hint names the answer (the letter, the shape). '' when there is none. */
  model(q) {
    // fixRev (v184): a hint whose picture is only the result (Add Three's one-colour sum) says mdl: false
    if (!q || q.kind != 'num' || !q.hint || q.hint.k != 'html' || q.hint.mdl === false || /<svg/.test(q.html || '')) return '';
    return (q.hint.html.match(/<svg[\s\S]*?<\/svg>/g) || []).join('');
  },
  // the question area of an item (TEACH-UX: with its model above the question when the item carries one, it.mdl)
  prompt(it) {
    if (it.m == 'say') return it.html;
    if (it.m == 'judge') return it.pw || LS.petWork(it.q, it.pv); // TEACH-3: the pet's written steps
    const m = it.mdl ? LS.model(it.q) : '';
    return (m ? `<div class="pkq ls-model">${m}</div>` : '') + it.q.html;
  },
  // the lines an item says when it shows (the Hear button says them again). READ-SHAPES: a story question tells its story first (q.tell:
  // short sentences, each also on screen with its own speaker); fixRev (v184): the pet's turn on a story question tells the story and
  // the question too, before the pet's claim (its last line), so a child who cannot read yet can judge by listening
  told(it) {
    const q = it.q || {}, told = (q.tell || []).concat([q.say]), il = it.lines || [];
    return it.m == 'ask' || it.m == 'open' ? il.concat(told) : it.m == 'judge' && q.tell ? il.slice(0, -1).concat(told, il.slice(-1)) : il;
  },
  // TEACH-UX: the beat label under the dots ("Step 1 of 6 · Remember"); the show-me items and the last build are outside the six
  step(B) {
    const at = LS_PIPS.findIndex(x => x[0] == B);
    return at >= 0 ? `Step ${at + 1} of ${LS_PIPS.length} · ${LS_PIPS[at][2]}` : B == 'pre' ? 'Show me' : B == 'win' ? 'One more' : '';
  },
  // the next Together item: stage 0 first, then one up after a right first try, one down after a miss (the picture comes back)
  // When two misconception codes fit the child's wrong answers equally, the item is the probe: a question on which they predict
  // different answers (knowProbe, 52b-know.js), so one answer settles it.
  togItem(st, lines) {
    const s = st.last < 0 ? 0 : st.drop ? Math.max(0, st.last - 1) : Math.min(2, st.last + 1), tie = knowTie(st.id, st.S, st.day);
    st.last = s;
    st.drop = false;
    const pq = tie && knowProbe(tie[0], tie[1], () => st.L.q(s, st.r)), q = pq || st.L.q(s, st.r);
    // TEACH-2b: a drafted script's Together line for this item's stage (1 build, 2 picture, 3 symbols; the stage can drop after a miss),
    // its numbers from the item
    return {m: 'ask', help: 1, tog: 1, probe: pq ? tie : null, q, lines: (lines || []).concat(st.L.w ? lsW(st.L.w.beats.together, q.st | 0, q.sl) : [])};
  },
  // the contrast that opens a repair: one question with two answers on its picture, the right one and the one the held idea gives
  contrast(st, code) {
    for (let n = 0; n < 30; n++) {
      const q = st.L.q(1, st.r), w = (knowPredict(q)[code] || []).find(v => LS.fits(q, v) && !lsOk(q, v));
      if (w == null) continue;
      const pane = (v, ok) => `<div class="ls-cpane ${ok ? 'ok' : 'no'}">${ico(ok ? 'check-circle' : 'close', 28)}<span class="a11y-h">${ok ? 'Right' : 'Not right'}</span>${LS.petWork(q, v)}</div>`;
      return {m: 'say', con: code, html: `<div class="ls-con">${pane(q.ans, true)}${pane(w, false)}</div>`, lines: [lsTone().look, lsTone().isRight, BUGS[code].say]};
    }
    return null;
  },
  // Check me: one of the stop's questions (the build when it builds on a model, else the picture) and the pet's own answer: the
  // child's own misconception when the record shows one, else the script's first; right about PET_OK of the time
  petItem(st) {
    const L = st.L, r = st.r, T = lsTone(), held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
    const petOk = LS.petRight(st);
    let q, pv, code = null;
    // up to 30 questions for the preferred mistake, then any of the stop's
    for (let n = 0; n < 40 && pv == null; n++) {
      const q0 = L.q(L.petSt | 0, r);
      q = L.petSt != null || q0.kind == 'make' && !q0.goal || q0.kind == 'line' ? q0 : L.q(1, r);
      if (petOk) { pv = q.ans; break; }
      for (const c of n < 30 ? codes : L.bugs) {
        const v = (knowPredict(q)[c] || []).find(x => String(x) !== q.ans && !lsOk(q, String(x)) && LS.fits(q, x));
        if (v != null) { pv = String(v); code = c; break; }
      }
    }
    if (pv == null) pv = q.ans; // never reached with these scripts (tools/test.js "every pet turn" checks every lesson's forced-wrong turn)
    const ok = lsOk(q, pv);
    return {m: 'judge', q, pv, petOk: ok, code, lines: [T.myTurn, (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, q.sl, {ans: lsSayV(q, pv)}))[0]) || LS.petSays(q, pv)]};
  },
  // fix179: is the pet right this turn? About PET_OK of the time; never in the extra turns of Check me (st.chkN), where it is always wrong
  petRight: st => st.r() < (st.chkN ? -1 : LS.PET_OK),
  // can the pet's answer be shown on this question's model?
  fits(q, v) {
    const n = +v, M = q.kind == 'make' && K2MM[q.model];
    if (M && M.fits) return M.fits(q, v);
    if (q.kind == 'make' && q.model == 'frame') return Number.isInteger(n) && n >= 0 && n <= q.m.total - (q.m.fixed || 0) && !(q.s0 && n > q.s0[0]);
    if (q.kind == 'make' && q.model == 'b10') return Number.isInteger(n) && n > 0 && n < 100;
    if (q.kind == 'line') return Number.isInteger(n) && n >= q.line.min && n <= q.line.max && String(n) !== String(q.start);
    if (q.kind == 'choice') return q.choices.some(c => c.v === String(v));
    return Number.isInteger(n) && (n >= 0 || q.pad == 'neg'); // TEACH-6M: the plus-or-minus pad takes a negative number
  },
  petSays(q, v) {
    if (q.kind == 'choice') return `${q.say.replace(/^Is /, '').replace(/\?$/, '')}? I pick ${{'<': 'less than', '>': 'greater than', '=': 'equal to'}[v] || v}!`;
    if (q.kind == 'make' || q.kind == 'line') return 'I did it! Am I right?';
    return `I say ${v}! Am I right?`;
  },
  // the pet's answer as a start state the child fixes (make: the pet's build; line: the pet's pin; num and choice start empty)
  fixItem(it) {
    const q = Object.assign({}, it.q), v = +it.pv;
    if (q.kind == 'make') q.s0 = lsOf(q, it.pv);
    if (q.kind == 'line') q.start = String(v);
    return {m: 'ask', help: 1, fix: 1, q, lines: [lsTone().fixIt]};
  },
  // what the child did: v is the value the kind submits (a frame2 build: its state). Returns {ok, act: 'next' | 'retry' | 'reveal', lines, mood}
  answer(st, v) {
    const it = LS.cur(st), T = lsTone(), B = LSB[st.b];
    if (!it) return null;
    if (it.on) return it.on(st, v); // TEACH-3: an item that answers for itself ("your problem", 52i-bench35.js)
    const yay = () => [T.yay[(st.r() * T.yay.length) | 0]];
    if (it.m == 'say') return {ok: true, act: 'next', lines: []};
    if (it.m == 'open') {
      if (!lsOk(it.q, v)) return {ok: false, act: 'retry', lines: [it.nudge || T.tryMore]};
      const re = st.exp.react(v);
      Object.assign(st.ctx, re.ctx);
      return {ok: true, act: 'next', lines: re.lines, mood: 'happy'};
    }
    if (it.m == 'judge') {
      const yes = String(v) === '1', ok = yes === it.petOk;
      st.chk.push(ok ? 1 : 0);
      if (!it.petOk && !yes) st.caught = true; // LS-STOP: the pet's mistake found
      if (!it.petOk) st.items.splice(st.i + 1, 0, ...(it.after ? it.after(st) : [LS.fixItem(it)])); // TEACH-3: the fix, then the reason from tiles
      // TEACH-2b: a drafted script's reason for the pet's mistake (its misconception code), after it is caught
      const why = !it.petOk && it.code && st.L.w ? lsW((st.L.w.reasons || {})[it.code], 0, it.q.sl) : [];
      return {ok, act: 'next', mood: it.petOk ? 'happy' : 'oops',
        lines: it.petOk ? [yes ? T.rightMe : T.wrongMe] : [yes ? T.fooled : T.caught].concat(why)};
    }
    const ok = lsOk(it.q, v), first = !it.tries, M = it.q.kind == 'make' && K2MM[it.q.model];
    if (first && it.rem) knowRemember(it.rem, ok, st.day, st.S);
    else if (first && !it.fix && !it.win && !it.warm) knowAdd(st.id, it.q, M && M.raw && Array.isArray(v) ? String(M.val(it.q, v)) : v, ok, st.S, st.day);
    // TEACH-5S: "look", what really happens (a Discover prediction), said once the answer is in or shown; never before a retry
    const lk = it.q.look ? [it.q.look] : [];
    if (it.one) {
      it.tries = 1;
      (B == 'pre' ? st.pre : st.post).push(ok);
      // LS-STOP: "I already know this!" and a miss: no more show-me items, straight into the lesson (no reveal, no penalty)
      if (B == 'pre' && !ok && st.slide) { st.items.length = st.i + 1; return {ok, act: 'next', slide: true, lines: [lsTone2().slide]}; }
      return {ok, act: ok ? 'next' : 'reveal', lines: (ok ? yay() : [T.tryMore]).concat(lk)};
    }
    if (ok) return {ok, act: 'next', lines: (it.tries ? [T.fixed] : yay()).concat(lk), mood: 'happy'};
    it.tries = (it.tries || 0) + 1;
    if (it.tog) st.drop = true;
    if (it.tries <= it.help) return {ok, act: 'retry', lines: [T.help]};
    return {ok, act: 'reveal', lines: (it.win ? [T.win] : [T.tryMore]).concat(lk)};
  },
  // on to the next item (Together grows one item at a time), the next beat, or the end
  next(st) {
    if (st.done) return st;
    if (LSB[st.b] == 'tog' && st.i == st.items.length - 1 && st.items.length < LS.TOG) {
      st.items.push(LS.togItem(st));
      st.i++;
      return st;
    }
    st.i++;
    return st.i < st.items.length ? st : LS.after(st);
  },
  after(st) {
    const B = LSB[st.b];
    if (B == 'pre' && st.pre.length == 2 && st.pre.every(Boolean)) {
      st.to = true; // test-out: the teaching beats are skipped
      return LS.beat(st, LSB.indexOf('show'));
    }
    // LS-STOP: Check me goes on until the pet's mistake is found: up to two more turns, in which the pet is always wrong
    // (fix179: st.chkN > 0 makes every Check me builder give a wrong pet, LS.petRight; a turn whose pet is somehow right is never offered)
    if (B == 'chk' && st.proof && !st.caught && st.chkN < 2) {
      st.chkN++;
      const it = st.L.chk ? st.L.chk(st) : [LS.petItem(st)];
      if (it.length && it[0].m == 'judge' && !it[0].petOk) { it[0].lines = [lsTone2().findIt].concat(it[0].lines || []); st.items = it; st.i = 0; return st; }
    }
    if (B == 'show' && st.post.length == 2 && st.post.every(Boolean) || B == 'win') {
      st.done = true;
      return st;
    }
    return LS.beat(st, B == 'show' ? LSB.indexOf('win') : st.b + 1);
  },
  // the learner record and the measure (52b-know.js); returns {pass, sc}
  finish(st) {
    const S0 = st.S, k = lsKnow(st.id, S0), pass = st.post.length == 2 && st.post.every(Boolean);
    // TEACH-2: a lesson again on a stop already learned (a review, or a repair) is remembering it: Show moves its memory box
    if (k.s >= 2 && st.post.length) knowRemember(st.id, pass, st.day, S0);
    k.n++;
    if (k.s < 1) k.s = 1;
    if (pass && k.s < 2) Object.assign(k, {s: 2, d: st.day, box: 0, due: st.day + LS_GAP[0], last: st.day});
    // the notebook page (52d-notebook.js): what the child built in Explore, drawn again from it; a passed repair starts the page of
    // wrong answers again (the tally stays, and fades)
    if (pass && Object.keys(st.ctx).length) k.note = Object.assign({}, st.ctx);
    if (pass && st.repair) k.w = [];
    lsMeasure(st.id, st.day, st.pre, st.post, st.to, S0);
    delete S0.les;
    return {pass, sc: st.post.filter(Boolean).length};
  },
  /* the end of a lesson, written the way finish() (50-round.js) writes a round, so the map, unlocks, missions, the streak and game time
     keep working: the stop's stars (S.maps, setSt: LS.STOP_STARS for a passed lesson, 0 since fix179 so practice is still required;
     never lower than before), a world finished (S.wdone, +20 coins),
     the skill's tries and right answers (P(sk).t, .c: the Show items), stars and coins (one each for a right Show item), a sticker,
     the day's rounds (day().r, for the "round" mission), the activity log (actRound), the streak (streakTick), missions (MIS.done)
     and game time. Not written: P(sk).r (rounds played), S.best (a streak in a row), mastery (S.mast).
     LS-STOP: game time is the lesson's own pay (lsPay, 58-playtime.js), not a round's: a proven pass pays the first, second or later
     pass amount, a good try that did not pass a little, guessing nothing; plus the daily mission's minute. */
  record(st) {
    S.tq = st.L.home.replace('{name}', S.name || 'your child'); // tonight's question for the grown-ups' report card (82-report.js)
    const f = LS.finish(st), p = st.L.p || 'math', ni = NODES[p].findIndex(n => nid(n) === st.id), nd = NODES[p][ni], d = day(), sc = f.sc, n = st.post.length;
    const stars = f.pass ? 2 : 0, prev = getSt(p, ni), give = f.pass ? LS.STOP_STARS : 0, newPass = !prev && give > 0;
    if (give) setSt(p, ni, Math.max(prev, give));
    let wDone = false;
    if (newPass && !S.wdone[nd.wid] && worldDone(p, nd.wi)) { S.wdone[nd.wid] = 1; wDone = true; }
    const pr = P(nd.sk);
    pr.t += n;
    pr.c += sc;
    const prizes = [award()];
    actRound();
    d.r++;
    const stk = streakTick(), mi = MIS.done({k: 'round', p, mix: false, test: false, boss: false, daily: false, perfect: sc >= n, n: d.r});
    mi.won.forEach(w => prizes.push(w.st));
    if (mi.bonus) prizes.push(award());
    const effort = !st.to && st.caught && (st.rush | 0) < 2 && st.post.length == 2, pay = lsPay(st.id, f.pass, st.to || st.caught, effort);
    const coins = sc + (mi.bonus ? 5 : 0) + (wDone ? 20 : 0), PT = {sec: pay.sec, lines: pay.lines.slice(), pay}, bank0 = pt().bank;
    if (mi.bonus) { PT.sec += 60; PT.lines.push([60, 'Daily mission done']); }
    if (PT.sec) ptEarn(PT.sec);
    S.stars += sc + (mi.bonus ? 5 : 0);
    S.coins += coins;
    save();
    return Object.assign(f, {stars, prev, newPass, wDone, prizes, mi, stk, coins, PT, bank0, bank1: pt().bank, ni, next: ni + 1 < NODES[p].length && unlocked(p, ni + 1) ? ni + 1 : -1});
  },

  // ---- the screen ----
  // o: {learn: no show-me items} | {know: the test-out, sliding into the lesson at the first miss} | {} (both show-me items, as before)
  start(id, o = {}) {
    if (!LESSONS[id]) return;
    const day0 = lsDay(), pl = planToday(S, day0, LESSONS[id].p || 'math') || {}, // TEACH-4: Remember from the lesson's own subject
      les = S.les && S.les.n === id ? S.les : null;
    LS.st = LS.make(id, les ? LS.resume(les, day0)
      : {rem: pl.remember || [], day: day0, repair: pl.id === id && pl.code, proof: true, know: !!o.know, learn: !!o.learn});
    LS.t0 = 0;
    // fix2 v194: LS.job1 (the job the start card just said) counts only when this start comes from that card; a start from anywhere
    // else (the card was left by Home, then a lesson started another way) must not drop the first line's sentence
    if (!$('#lsopen')) LS.job1 = '';
    warmVoices();
    LS.show();
  },
  // LS-STOP: the start card of a lesson stop: what it pays now, "Let's learn" and "I already know this!" (a lesson left part way goes on)
  open(id) {
    const L = LESSONS[id];
    if (!L) return;
    if (S.les && S.les.n === id) return LS.start(id);
    LS.st = null;
    const p = L.p || 'math', up = gradeOf() > 2, T2 = lsTone2(), title = up ? 'Challenge: ' + L.t : `Learn ${L.t} with ${petN()}`;
    // LESSON-STAGE (owner, 2026-11-23): no price on the start card (game time shows only at the end); the stop's world behind it, the
    // pet standing on it, and the job the lesson helps with (its approved Show line's first sentence) with the job's map picture
    const job = LS.job(L), said = T2.open(lsName()) + (job ? ' ' + job : '');
    view(`${LS.scene(id)}<div class="top tbar s-${p} ls-top">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico(up ? 'bolt' : 'doc', 30)}<span>${esc(L.t)}</span></div></div>
    <div class="scroll ls-end" id="lsopen"><div class="ls-art ls-big" id="lsart" aria-hidden="true"></div><div class="ls-endc">
     <div class="ls-h"><h1>${esc(title)}</h1>${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear2', cls: 'ls-hear'})}</div>
     ${job ? `<p class="ls-job" id="lsjob">${LS.jobPic(id, 'ls-jp')}<span>${esc(job)}</span></p>` : ''}
     <div class="ls-acts">${UI.btn(up ? 'Start the challenge' : "Let's learn", {kind: 'primary', size: 'lg', icon: up ? 'bolt' : 'play', id: 'lslearn'})}${UI.btn('I already know this!', {kind: 'soft', size: 'lg', icon: 'star', id: 'lsknow'})}</div>
    </div></div>`);
    LS.mood('happy');
    $('#back').onclick = () => { SFX.whoosh(); pathMap(p); };
    $('#lslearn').onclick = () => { SFX.whoosh(); LS.start(id, {learn: 1}); };
    $('#lsknow').onclick = () => { SFX.whoosh(); LS.start(id, {know: 1}); };
    $('#lshear2').onclick = () => say(said);
    UI.hear();
    LS.job1 = '';
    if (LS.voice()) { say(said); LS.job1 = job; }
  },
  /* LESSON-STAGE: the lesson's place: its stop's world on the map (the world band's scene, SCN.band in 43-scenes.js, drawn for the
     screen with nothing to keep clear, its horizon at about 40% of a wide screen and 30% of a tall one, the sky above it in its own top
     colour); '' when there is none (a lesson with no stop, no scene data). Decoration only: aria-hidden, no taps, no motion. */
  world(id) {
    const L = LESSONS[id], p = L && (L.p || 'math'), n = p && NODES[p] && NODES[p].find(x => nid(x) === id);
    return n && PATHS[p].worlds[n.wi] || null;
  },
  scene(id) {
    LS.scnId = id;
    const w = LS.world(id), T = w && typeof SCN != 'undefined' && SCN.theme(w);
    if (!T) return '';
    const W = Math.max(320, innerWidth | 0), H = Math.max(400, innerHeight | 0), y0 = Math.max(0, Math.round(H * (W > H ? .42 : .3)) - 76);
    return `<div class="ls-scn" aria-hidden="true" style="background:var(--sc-${T.sky[0]})">${SCN.band(w, W, y0, H - y0, {stops: [], trail: [], pet: null})}</div>`;
  },
  // the world's job prop (the map's G-PROPS drawing: shells, planks, fuel ...) as its own small picture; '' when the world has none
  jobPic(id, cls) {
    const w = LS.world(id), T = w && typeof SCN != 'undefined' && SCN.theme(w), P = T && T.job && SCN.prop(T.job);
    if (!P) return '';
    const sw = q => (q.sw ? ` stroke-width="${q.sw}"${q.da ? ` stroke-dasharray="${q.da.join(' ')}"` : ''}` : '');
    return `<svg class="${cls}" viewBox="${-P.hw - 2} ${-P.hh - 2} ${2 * P.hw + 4} ${P.hh + 6}" aria-hidden="true" focusable="false">`
      + P.sh.map(q => `<path d="${SCN.xf(q.segs, 1, 0, 0)}" ${q.st}${sw(q)}/>`).join('') + '</svg>';
  },
  // the job: the first sentence of the script's first Show line when it is a whole sentence with no number to fill ("The reef shop
  // counts shells."); '' for a lesson with no such line (never a new sentence)
  job(L) {
    const t = L && L.w && L.w.beats && (L.w.beats.show || [])[0], s = t && (String(t).match(/^[^.!?]*[.!]/) || [])[0];
    return s && !/[{}]/.test(s) ? s.trim() : '';
  },
  /* LS-STOP: lesson time counts as learning (the activity log, so "learn first" sees it). fix179: only active time, as a round counts
     it (ACT.qEnd): a screen's time counts when the child answers or goes on (tick, from submit, judge and Next), from when the screen
     came (screen) or the last answer, at most ACT.CAP (60 s), never the time the app was hidden (vis); a screen left idle, quit or
     closed counts nothing. LS.t0: when counting started (0: not counting); LS.hid: hidden ms since; LS.h0: hidden since (or null). */
  screen(now = Date.now()) { LS.t0 = now; LS.hid = 0; LS.h0 = typeof document != 'undefined' && document.hidden ? now : null; },
  vis(hidden, now = Date.now()) {
    if (hidden && LS.h0 == null) LS.h0 = now;
    else if (!hidden && LS.h0 != null) { LS.hid = (LS.hid | 0) + now - LS.h0; LS.h0 = null; }
  },
  tick(now = Date.now()) {
    const st = LS.st, h = (LS.hid | 0) + (LS.h0 != null ? now - LS.h0 : 0), cap = typeof ACT != 'undefined' && ACT.CAP || 60;
    const sec = LS.t0 ? Math.max(0, Math.min(cap, Math.round((now - LS.t0 - h) / 1000))) : 0;
    if (sec >= 1 && st) try { ACT.add(today(), {sec, area: st.L.p || 'math'}); } catch (e) {}
    if (LS.t0) LS.screen(now);
  },
  /* LESSON-STAGE (owner, 2026-11-23): the six beats as a little train's stops (no ticket meter: game time shows only at the end). A
     stop passed holds the world's job prop, so the job fills up as the lesson goes; the train waits at the stop of now. The words
     ("Step 4 of 6 · Together") stay for screen readers only (.ls-step). */
  track(st, B, at) {
    const job = LS.jobPic(st.id, 'ls-jp'), tr = typeof ART != 'undefined' && ART.train ? picArt('train', 26, 'ls-tr') : '';
    return LS_PIPS.map((x, j) => {
      const on = j < at || B == 'win', now = j == at;
      return `<span class="ls-pip${on ? ' on' : now ? ' now' : ''}" aria-hidden="true">${on ? job : now ? tr : ''}</span>`;
    }).join('');
  },
  voice: () => !!S.voice || gradeCfg().auto != 'tap',
  // say lines (and show cap, or the lines, in the pet's bubble); then() once they have been said
  talk(lines, then, cap0) {
    let t = lines.filter(Boolean).join(' ');
    const b = $('#lsbub'), me = LS.st, c = lsPlain(cap0 || t);
    // fix v194: the start card has just said the job (LS.job1): the first line after it does not say that sentence again (the bubble keeps it)
    if (LS.job1 && t.startsWith(LS.job1)) t = t.slice(LS.job1.length).trim();
    LS.job1 = '';
    if (b) { b.firstChild.textContent = c; b.classList.toggle('on', !!c); }
    // TEACH-4: a recorded line (EN_TEACH, 12-speech.js) plays wherever its sentence falls in the lines; the rest is the tablet's voice
    // TEACH-5S: a line with «Spanish» in it, or any line of a Spanish lesson, is said piece by piece in its own voice (lsSay)
    if (t && LS.voice() && (/«/.test(t) || me && me.L.p == 'es')) lsSay(t, me && me.L.p);
    else if (t && LS.voice()) say(t);
    if (!then) return;
    // the controls wake once the line has been said (TEACH-PLAN-2 system H): poll the speech, at most WAKE ms (no voice: a short pause)
    const t0 = Date.now(), cap = t && LS.voice() && canSpeak() ? LS.WAKE : 600;
    const go = () => {
      if (LS.st !== me) return;
      if (Date.now() - t0 < cap && (Date.now() - t0 < 400 || speakBusy())) return setTimeout(go, 200);
      then();
    };
    setTimeout(go, 200);
  },
  calm: () => document.documentElement.classList.contains('calm') || !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches),
  // the pet's face (LESSON-STAGE: and its reaction, the pet's own jump or wobble, anim in 12-speech.js; none in calm mode)
  mood(m, act) {
    const a = $('#lsart');
    if (a) a.innerHTML = petRigHTML(Math.max(S.stars, GROW[1]), m);
    if (a && act && !LS.calm()) anim(a, act);
  },
  show() {
    const st = LS.st, it = st && LS.cur(st);
    if (!st) return;
    if (!it) return LS.end();
    LS.keep(st);
    LS.screen();
    save();
    LS.seq++; // screens shown (tests wait for the next one)
    const q = it.q, B = LSB[st.b], T = lsTone(), sp = st.L.p || 'math';
    LS.u = {lock: true, typed: '', built: [], tries: 0};
    const at = LS_PIPS.findIndex(x => x[0] == B), pips = LS.track(st, B, at);
    const prompt = LS.prompt(it);
    let input = '';
    if (it.m == 'say') input = UI.btn(it.nx || 'Next', {kind: 'primary', size: 'lg', icon: it.nx ? 'check' : 'go', id: 'lsnext'}); // TEACH-5S: "I said it!" after say it with me
    else if (it.m == 'judge') {
      input = `<div class="ls-judge">${UI.btn('Right', {kind: 'soft', size: 'lg', icon: 'thumbs-up', id: 'lsyes'})}${UI.btn('Not right', {kind: 'soft', size: 'lg', icon: 'close', id: 'lsno'})}</div>`;
    } else input = KIND[q.kind].render(q);
    // TEACH-UX: the dots are drawn only; the label under them says the step in words (and is what a screen reader reads);
    // fixRev (v184): " of 6" in its own span, which a phone under 400 px leaves out ("Step 4 · Together"), so the step's name is never cut
    // LESSON-STAGE: the label is for screen readers only now (the train's stops show where the child is); the stop's world is behind
    view(`${LS.scene(st.id)}<div class="top tbar round qtop ls-top s-${sp}">${NAV.house('quit')}<div class="ls-beats"><div class="ls-pips" aria-hidden="true">${pips}</div><span class="ls-step" id="lsstep">${esc(LS.step(B)).replace(/( of \d+)/, '<span class="ls-of">$1</span>')}</span></div>
     <div class="pl-tag ls-tag">${ico('doc', 24)}<span>${esc(st.L.t)}</span></div></div>
    <div class="play qs s-${sp} ls-play" id="lsplay" data-beat="${B}" data-mode="${it.m}"><div class="qarea">
     <div class="ls-pet${it.m == 'judge' ? ' ls-turn' : ''}"><div class="ls-art" id="lsart" aria-hidden="true"></div><div class="ls-bub" id="lsbub" role="status"><span></span></div>
      ${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear', cls: 'ls-hear'})}</div>
     <div class="prompt" id="prompt">${prompt}</div><div class="qhint"><div id="hint" class="hint"></div></div></div>
    <div class="inp ls-wait" id="lsinp">${input}</div></div>`);
    LS.mood(it.m == 'judge' ? 'idle' : 'happy');
    NAV.wire('quit', {leave: () => { LS.st = null; save(); }});
    const lines = LS.told(it);
    $('#lshear').onclick = () => LS.talk(it.m == 'say' ? it.lines : lines.length ? lines : [q.say]);
    UI.hear();
    // fixRev (v184): what must start only once the child can answer (the flash card's fade) carries data-wake, the class to add then
    const wake = () => { const w = $('#lsinp'); if (w) w.classList.remove('ls-wait'); for (const e of $$('#lsplay [data-wake]')) e.classList.add(e.dataset.wake);
      if (LS.u) { LS.u.lock = false; LS.u.w = Date.now(); } };
    if (it.m == 'say') $('#lsnext').onclick = () => { if (!LS.u.lock) { LS.tick(); LS.go(LS.answer(st, 'ok')); } };
    else if (it.m == 'judge') { $('#lsyes').onclick = () => LS.judge('1'); $('#lsno').onclick = () => LS.judge('0'); }
    else {
      KIND[q.kind].bind(q, LS.u, LS.submit);
      if (q.kind == 'make' && q.s0) { LS.u.mm = q.s0.slice(); LS.u.mm0 = q.s0.slice(); KIND.make.draw(q, LS.u); }
    }
    fit();
    LS.talk(lines, wake, it.m == 'say' ? it.lines[it.lines.length - 1] : (it.lines || []).filter(Boolean).join(' ') || q.say);
  },
  // the pet's answer drawn on the question, for Check me
  petWork(q, v) {
    if (q.kind == 'make') {
      const s = lsOf(q, v);
      return q.html + `<div class="ls-pw">${K2MM[q.model].draw(q, s).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
    }
    if (q.kind == 'line') return q.html + `<div class="ls-pw">${VIZ.numLine(Object.assign({}, q.line, {pin: +v})).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
    const c = q.kind == 'choice' ? q.choices.find(x => x.v === String(v)) : null, sl = [SLOT_MIX, SLOT_FRAC, SLOT_R].find(x => q.html.includes(x)) || SLOT;
    return q.html.replace(sl, `<span class="slot ls-pv">${esc(c ? c.l : v)}</span>`); // TEACH-3: a fraction or remainder answer fills its slots as one
  },
  judge(v) {
    const st = LS.st;
    if (!st || LS.u.lock) return;
    LS.u.lock = true;
    LS.rushed(st);
    LS.tick();
    const it = LS.cur(st), res = LS.answer(st, v), b = $(v == '1' ? '#lsyes' : '#lsno');
    LS.keep(st); // fix179: the answer is in the save at once (leaving during the line cannot undo it)
    save();
    if (b) b.classList.add(res.ok ? 'right' : 'ls-pk');
    if (res.ok) SFX.right(1); else SFX.pop(2);
    if (!it.petOk) $('#prompt').classList.add('ls-oops');
    LS.mood(res.mood, res.ok ? 'jump' : 'sad');
    LS.go(res);
  },
  // a kind's submit (K.bind): v as the kind gives it; an open frame2 build passes its state
  submit(v, el) {
    const u = LS.u, st = LS.st, it = st && LS.cur(st);
    if (!u || u.lock || !it) return;
    const q = it.q, K = KIND[q.kind];
    if (q.kind == 'make' && (q.model == 'frame2' || K2MM[q.model].raw || q.raw)) v = u.mm.slice();
    LS.rushed(st);
    LS.tick();
    const res = LS.answer(st, v);
    u.lock = true;
    if (it.one) { LS.keep(st); save(); } // fix179: a test-out or Show answer is in the save at once (leaving during its line, or the slide line, cannot undo it)
    if (res.slide) { LS.mood('happy'); return LS.go(res); } // LS-STOP: a missed show-me item after "I already know this!": no reveal, no wrong
    if (res.ok) {
      if (el) el.classList.add('right');
      K.right(q);
      SFX.right(1);
      if (it.m != 'open') { const r = (el || $('#prompt')).getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); }
      LS.mood('happy', 'jump'); // LESSON-STAGE: the pet cheers
      return LS.go(res);
    }
    const h = $('#hint');
    LS.mood('oops', 'sad'); // LESSON-STAGE: the pet thinks it over with the child (its "oops" face, a little wobble)
    if (res.act == 'retry') {
      SFX.pop(1);
      if (el) { el.classList.add('wrong'); el.disabled = true; }
      if (it.m == 'open') { u.mmMoved = false; if (q.kind == 'make') KIND.make.draw(q, u); else K.retry(q, u, () => {}); } // TEACH-4: a sort shows which pictures are home
      else {
        if (h && q.hint) { h.innerHTML = LS.hint(q, it); h.scrollIntoView({block: 'nearest'}); }
        K.retry(q, u, () => {});
      }
      LS.talk(res.lines);
      // TEACH-4: an open sort, order or build unlocks itself after its short animation (their retry() sets lock, then clears it on a timer);
      // every other open kind (make, line, ...) is unlocked here, or an open number line (round1-4, frac3 Explore) would freeze when a pin
      // left at its start is checked (review of v178)
      if (it.m != 'open' || !['sort', 'order', 'build'].includes(q.kind)) u.lock = false;
      fit();
      return;
    }
    if (el) el.classList.add('wrong');
    K.reveal(q);
    if (h && q.hint) h.innerHTML = LS.hint(q, it);
    fit();
    LS.go(res, K.spoken(q));
  },
  // TEACH-UX: when the model is already above the question (it.mdl), the hint after a miss adds only its words, not the picture again
  hint: (q, it) => (q.hint.k != 'html' ? esc(q.hint.s) : it && it.mdl ? q.hint.html.replace(/<svg[\s\S]*?<\/svg>/g, '') : q.hint.html),
  // LS-STOP: an answer given right after the controls woke counts as rushed
  rushed(st) { if (LS.u && LS.u.w && Date.now() - LS.u.w < LS.RUSH) st.rush++; },
  // say the result, then the next item once the line has been said
  go(res, extra) {
    const me = LS.st;
    const on = () => {
      if (LS.st !== me || !$('#lsplay')) return;
      if (NAV.held) return setTimeout(on, 400); // Go Home? is open: the lesson waits
      LS.next(me);
      LS.show();
    };
    LS.talk((res.lines || []).concat(extra ? [extra] : []), () => setTimeout(on, res.ok ? 500 : 1400));
  },
  end() {
    const st = LS.st, rec = LS.record(st), T = lsTone(), L = st.L, p = L.p || 'math'; // TEACH-4: a reading lesson goes back to the reading map
    LS.st = null;
    LS.t0 = 0;
    const line = rec.pass ? (st.to ? 'You already knew it!' : 'You learned it!') : 'Great learning today!', T2 = lsTone2(), PT = rec.PT;
    // LS-STOP: the game time: each paid line as "+5:00 game time", or why there is none; a ticket that lands in the bank chip
    const why = LS.why(st.id, PT.pay);
    const gt = PT.lines.map(([v, l]) => `<li class="ls-gt">${ico('ticket', 18)}<span><b>+${fmtT(v)} game time</b> ${esc(l)}</span></li>`).join('')
      + (why ? `<li class="ls-gt0">${ico('ticket', 18)}<span>${esc(why)}</span></li>` : '');
    // LESSON-STAGE: the stop's world behind, the pet cheering on it, the card beside it (side by side on a wide screen, so the buttons
    // fit a 1024 x 600 tablet); the stars and the ticket in one row, the ticket landing in the bank chip is the game-time moment
    view(`${LS.scene(st.id)}<div class="top tbar s-${p} ls-top">${NAV.house('lshome')}<div class="ttl">${ico('doc', 30)}<span>${esc(L.t)}</span></div>${UI.chip('ticket', fmtT(rec.bank0), {aria: 'Game time in the bank', id: 'lsbank'})}</div>
    <div class="scroll ls-end" id="lsend"><div class="ls-art ls-big" id="lsart" aria-hidden="true"></div><div class="ls-endc">
     <div class="ls-h"><h1>${esc(line)}</h1>${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear2', cls: 'ls-hear'})}</div><p class="ls-idea">${ico('hint', 26)}<span>${esc(L.idea)}</span></p>
     ${rec.pass || PT.sec ? `<div class="ls-win">${rec.pass ? LS.jobPic(st.id, 'ls-jp') + UI.stars(rec.stars, 3, 34) : ''}${PT.sec ? `<div class="ls-tk" id="lstk" aria-hidden="true">${ico('ticket', 28)}<span>+${fmtT(PT.sec)}</span></div>` : ''}</div>` : ''}
     <ul class="rw-pl ls-earn"><li>${ico('star', 18)}<span>+${rec.sc} stars</span></li><li>${ico('coin', 18)}<span>+${rec.coins} coins</span></li>
      ${gt}${rec.newPass && rec.next >= 0 ? `<li>${ico('map', 18)}<span>Next stop unlocked: ${esc(NODES[p][rec.next].t)}!</span></li>` : ''}</ul>
     <div class="ls-acts">${rec.pass ? UI.btn('Practice', {kind: getSt(p, rec.ni) ? 'soft' : 'primary', size: 'lg', icon: 'play', id: 'lsprac'}) : UI.btn('Learn again', {kind: 'primary', size: 'lg', icon: 'replay', id: 'lsagain'})}${UI.btn('Map', {kind: rec.pass && getSt(p, rec.ni) ? 'primary' : 'soft', size: 'lg', icon: 'map', id: 'lsmap'})}${UI.btn('Notebook', {kind: 'soft', size: 'lg', icon: 'doc', id: 'lsnb'})}</div>
    </div></div>`);
    LS.mood('cheer', rec.pass ? 'jump' : '');
    $('#lshome').onclick = () => { SFX.whoosh(); home(); };
    if ($('#lsprac')) $('#lsprac').onclick = () => { SFX.whoosh(); start(p, rec.ni); };
    if ($('#lsagain')) $('#lsagain').onclick = () => { SFX.whoosh(); LS.start(st.id, {learn: 1}); }; // LS-STOP: a failed Show: the lesson again, teaching first
    $('#lsmap').onclick = () => { SFX.whoosh(); pathMap(p); };
    $('#lsnb').onclick = () => { SFX.whoosh(); NB.open(() => pathMap(p)); };
    SFX.fanfare();
    if (rec.pass) confetti(24);
    const said = `${line} ${L.idea} ${PT.sec ? T2.paid + ' ' : ''}${T.bye(lsName())}`;
    $('#lshear2').onclick = () => lsSay(said, p);
    UI.hear();
    if (LS.voice()) lsSay(said, p);
    if (PT.sec) LS.land(rec);
  },
  /* LS-STOP: why the lesson itself paid nothing ('' when it paid). fix179: read from the lesson's own pay, not the end card's total, so a
     lesson that paid nothing still says why when only the daily mission's minute was paid */
  why(id, pay) {
    if (pay.sec) return '';
    const T2 = lsTone2(), tag = lsPriceTag(id);
    return pay.kind == 'guess' ? T2.noProof : pay.kind == 'pass' ? (tag == 'done today' ? 'Game time for this lesson: done today' : '') : tag ? `Pass Show to earn ${tag} of game time` : '';
  },
  // LS-STOP: the moment the minutes are earned: the ticket lands in the bank chip, which counts up (at once in calm mode or with
  // reduced motion), with a sound
  land(rec) {
    const k = $('#lstk'), b = $('#lsbank'), calm = LS.calm();
    setTimeout(() => {
      if (!$('#lsend')) return;
      if (k) { k.classList.add('land'); setTimeout(() => k.remove(), calm ? 0 : 700); }
      SFX.coin(0); setTimeout(() => SFX.coin(3), 140); setTimeout(() => SFX.coin(7), 280);
      const a = rec.bank0, z = rec.bank1, n = calm ? 1 : 10;
      for (let j = 1; j <= n; j++) setTimeout(() => { if ($('#lsend')) UI.setChip(b, fmtT(Math.round(a + (z - a) * j / n))); }, calm ? 0 : j * 70);
      if (b) b.setAttribute('aria-label', `Game time in the bank: ${fmtT(z)}`);
    }, calm ? 200 : 900);
  },
  // the offer on the math map: a notebook button by the stop the planner picks (owner decision 1: inside the subject the child chose,
  // never a front door). Placed above the stop, or beside it, wherever it covers nothing; no button when nothing is free.
  mapAdd() {
    const m = $('#map');
    const sm = MAPP == 'es' || MAPP == 'disc'; // TEACH-5S: and the Spanish and Discover maps, once their part is in
    if (!m || MAPP != 'math' && MAPP != 'read' && !sm || TEACH.off || (sm ? !partReady('teaches') : gradeOf() > 2 && !partReady('teach35') || gradeOf() > 4 && !partReady('teach6'))) return; // TEACH-3: grades 3 up once their lessons are in; TEACH-4: the reading map too
    const old = m.querySelector('.ls-go:not(.lsn)');
    if (old) old.remove();
    NB.mapBtn();
    const pl = planToday(S, lsDay(), MAPP), b = pl && m.querySelector(`.node[data-n="${pl.i}"]`);
    if (!b) return;
    // LS-STOP: the planner's pick is its lesson stop on the path (marked, and named as before); a stop with no lesson stop gets the old bubble
    const ln = m.querySelector(`.lsn[data-ls="${pl.i}"]:not(.lock)`);
    if (ln) {
      m.querySelectorAll('.lsn.ls-go').forEach(e => e.classList.remove('ls-go'));
      ln.classList.add('ls-go');
      ln.setAttribute('aria-label', `Learn ${NODES[MAPP][pl.i].t} with ${petN()}` + ln.getAttribute('aria-label').replace(/^Learn .*? with [^,]*/, ''));
      return;
    }
    const x = parseFloat(b.style.left), y = parseFloat(b.style.top), W = m.clientWidth || 360, sd = x > W / 2 ? -1 : 1;
    const busy = [...m.querySelectorAll('.node,.nlab,.wtitle,.tobtn,.mappet,.ck-go,.ck-mapm,.nnew,.wmore,.mp-champ')].map(e => e.getBoundingClientRect());
    const box = m.getBoundingClientRect(), R = 30;
    const free = ([cx, cy]) => cx - R >= 4 && cx + R <= W - 4 && cy - R >= 0 && !busy.some(r => cx + box.left + R > r.left && cx + box.left - R < r.right && cy + box.top + R > r.top && cy + box.top - R < r.bottom);
    // the nearest free place on rings around the stop, starting above it and turning toward the middle of the map
    const ring = [];
    for (const d of [68, 82, 98, 116]) for (let k = 0; k < 16; k++) { const a = -Math.PI / 2 + sd * (k % 2 ? -1 : 1) * Math.ceil(k / 2) * Math.PI / 8; ring.push([Math.round(x + d * Math.cos(a)), Math.round(y + d * Math.sin(a))]); }
    const at = ring.find(free);
    if (!at) return;
    m.insertAdjacentHTML('beforeend', `<button class="btn ls-go" style="left:${at[0]}px;top:${at[1]}px" aria-label="Learn ${esc(NODES[MAPP][pl.i].t)} with ${esc(petN())}">${ico('doc', 30)}</button>`);
    m.querySelector('.ls-go').onclick = () => { SFX.whoosh(); LS.open(pl.id); };
  },
};
// fix179: lesson time stops counting while the app is hidden (LS.vis)
if (typeof document != 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', () => { try { LS.vis(!!document.hidden); } catch (e) {} });
// fix v194: a turned phone (or a resized window) draws the lesson's scene again for the new shape, once it settles
if (typeof addEventListener == 'function') { let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { try { const e = document.querySelector('.ls-scn'), h = e && LS.scnId && LS.scene(LS.scnId); if (h) e.outerHTML = h; } catch (x) {} }, 200); }); }
const lsName = () => (S.name || 'friend');
/* LESSON-STAGE (owner, 2026-11-23): practice in more than one shape. When a stop's generator makes only one kind of question (KMONO),
   pickQ (49b-kinds2.js) asks here for the third question in a row: one of the stop's own lesson items in another kind (its build on
   the model or its picture, stages 0 and 1), as the lesson asks it (the same reviewed words), once the child has learned that lesson.
   An item that needs the lesson around it (a goal, a start state, a raw state, its own answer check, a told story) is never used. It
   is marked as one of the stop's questions (sk, lv, so mastery counts it) with the label and seed of a fresh generator question of
   the stop, and lsx: a miss is retried in the round but never kept (addMiss skips it: Review and Grown-ups could only show that
   other, never-shown question). Only Practice asks (pickQ's mix: no check-in, mastQ, boss or test), and only at a math stop. null when none fits. */
function lsMix(sk, lv, kind) {
  const id = sk + lv, L = typeof LESSONS != 'undefined' && LESSONS[id];
  // fix v194: math only (a Discover, Spanish or reading stop is answered by its choices; its lesson items are not its practice), never with K2.off
  if (!L || (L.p || 'math') != 'math' || typeof K2 != 'undefined' && K2.off || typeof lsLearned != 'function' || !lsLearned(id)) return null;
  const r = mulberry32(((Math.random() * 4294967295) >>> 0) + 1);
  for (let t = 0; t < 8; t++) {
    let q = null;
    try { q = L.q(t % 2, r); } catch (e) { return null; }
    const K = q && KIND[q.kind], M = q && q.kind == 'make' && K2MM[q.model];
    if (!K || q.kind === kind || q.goal || q.s0 || q.raw || q.on || q.tell || q.kind == 'make' && (!M || M.raw)) continue;
    if (K.validate && K.validate(q).length) continue;
    const g = genQ(sk, lv);
    return Object.assign(q, {sk, lv, label: g.label, seed: g.seed, lsx: 1});
  }
  return null;
}
/* TEACH-5S: Spanish in a spoken line is written «la vaca». lsRuns(t, es) cuts a line into [text, 1 when Spanish] pieces, in order; in a
   Spanish lesson (es) "el" and "la" said alone (the article named as a word) are Spanish too, never one inside a title or a quote. lsSay says each piece in its own voice, one after the other (say()
   queues them; a Spanish piece is its ES-AUDIO recording when there is one); a line with no Spanish is said as before. lsPlain: the
   caption, without the marks. */
function lsRuns(t, es) {
  const o = [];
  String(t).split(/«([^»]*)»/).forEach((x, i) => {
    if (i % 2) return o.push([x.trim(), 1]);
    if (!es) return o.push([x.trim(), 0]);
    // review fix (v186): el / la alone is the article named as a word ("an el word", "el or la?"): Spanish. Followed by a word of the
    // Spanish units ("la vaca" left unmarked) the two are one Spanish piece; inside a title or a quote ("A la Escuela", "la moto")
    // it stays with the English piece, so a phrase is never cut across two voices
    let k = 0;
    for (const m of x.matchAll(/(?<![\p{L}\p{N}])(el|la|El|La)(?![\p{L}\p{N}])(\s+(\p{L}+))?/gu)) {
      const prev = x.slice(0, m.index).trimEnd().slice(-1), w = m[3] || '', noun = w && lsEsWords().has(w);
      if (/["'“‘]/.test(prev) || /^\p{Lu}/u.test(w)) continue; // a quote, or a title's next word
      const len = noun ? m[0].length : m[1].length;
      o.push([x.slice(k, m.index).trim(), 0], [x.substr(m.index, len).trim(), 1]);
      k = m.index + len;
    }
    o.push([x.slice(k).trim(), 0]);
  });
  return o.filter(x => /[a-z0-9áéíóúñü]/i.test(x[0]));
}
// the words of the Spanish units (lowercase), made once: what may follow an unmarked el or la as one Spanish piece
let LS_ESW = null;
const lsEsWords = () => LS_ESW || (LS_ESW = new Set(typeof ES_UNITS != 'undefined' ? ES_UNITS.flatMap(u => u.items.map(it => String(it[0]).toLowerCase())) : []));
const lsPlain = t => String(t).replace(/[«»]/g, '');
function lsSay(t, p) {
  const rs = lsRuns(t, p == 'es');
  if (!rs.some(x => x[1])) return say(lsPlain(t));
  rs.forEach(([x, es], k) => say(x, null, es ? 'es' : null, k > 0));
}
// the state that shows value v on a make question's model (the pet's build, the child's fix)
const lsOf = (q, v) => (K2MM[q.model].of ? K2MM[q.model].of(q, v) : q.model == 'b10' ? [Math.floor(v / 10), v % 10] : [+v]);
/* TEACH-2b: the words of a drafted script (docs/drafts, reviewed; 52e-words.js) are lines with {slots}: lsFill fills them from a
   question's or a build's numbers (q.sl, ctx), {name} and {pet} from the save. A line with a slot the moment has no number for is left
   out (null), never said with a hole; tools/test.js checks every drafted line fills. lsW(lines, k, sl): line k (round the list), filled. */
function lsFill(t, sl) {
  let ok = true;
  const o = String(t).replace(/\{(\w+)\}/g, (m, k) => (k == 'name' ? lsName() : k == 'pet' ? petN() : sl && sl[k] != null ? String(sl[k]) : (ok = false, m)));
  return ok ? o : null;
}
const lsW = (a, k, sl) => { a = [].concat(a || []); const t = a.length ? lsFill(a[k % a.length], sl) : null; return t ? [t] : []; };
// an answer as the pet says it: a time as words, cents with their unit
const LS_SIGN = {'<': 'is less than', '>': 'is greater than', '=': 'is equal to'};
const lsSayV = (q, v) => (q.vsay ? q.vsay(String(v)) : q.kind == 'make' && /^(clock|hands)$/.test(q.model) && /:/.test(v) ? mmTimeSay(...String(v).split(':').map(Number))
  : LS_SIGN[v] && q.sl ? `${q.sl.a} ${LS_SIGN[v]} ${q.sl.b}` : q.cents ? v + ' cents' : String(v));
/* ---------- TEACH-1: what the tutor knows, the plan, the before-and-after measure (part teach) ----------
   Saved data (all of it stays on the tablet; a backup file carries it like the rest of S):
     S.know[nid] = {s, n, lv, b, box, due, d, k}   the learner record of one lesson stop (TEACH-PLAN-2 system C, batch 1 size)
        s    stage: 0 not yet, 1 taught (the lesson ran), 2 learned (Show passed with no help), 3 kept (right again in Remember on a later day)
        n    lessons run on it          lv  [[right, tried] at build, picture, symbols] first tries in lessons
        b    {code: count} wrong answers a misconception code predicts (BUGS below)
        box  memory box 0..4 (due after LS_GAP[box] days)    due  the day number it is due in Remember    d  day learned    k  day kept
     S.lm = [[nid, day, preRight, preN, postRight, postN, testedOut], ...]   the measure: the two "show me" items before teaching
        (first try, no help) and the two Show items after it (one try, no help); newest last, at most LS_KEEP
     S.lr = [[nid, gapDays, right], ...]   Remember answers: right again after how many days (retention by day gap); at most LS_KEEP
     S.les = {n: nid, b: beat, s: seed, pre: [..], post?: [..], m?: extra Check me turns, r?, k?, c?}   a lesson left part way, resumed at
        that beat (LS.keep, LS.resume in 52-lesson.js: the one-try items and Check me come back fresh; deleted when it ends)
   Day numbers are STRK.idx(today()) (55-streak.js). */
const LS_GAP = [2, 5, 12, 30, 60], LS_KEEP = 100;
const lsDay = () => (typeof STRK != 'undefined' ? STRK.idx(today()) : 0);
function lsKnow(id, S0 = S) {
  if (!S0.know || typeof S0.know != 'object' || Array.isArray(S0.know)) S0.know = {};
  return S0.know[id] || (S0.know[id] = {s: 0, n: 0, lv: [[0, 0], [0, 0], [0, 0]], b: {}, box: 0, due: 0});
}
/* The misconception codes (TEACH-PLAN-2 system C). An entry: d what a child holding that idea does (for code and tests), f(q) the
   answers that idea gives to a question (only for questions that carry their numbers: q.ab [a, b, '+' | '-'], q.coins [values],
   q.hm [hour, minute]), and say: the pet's spoken line when a lesson repairs it (12 words or fewer). A question also carries
   q.bug {code: [values]} written by its script. A wrong answer adds one to each code that predicts it. */
const lsDig = n => String(n).split('').reverse().map(Number); // ones first
const lsCols = (a, b, fn) => { const x = lsDig(a), y = lsDig(b), o = []; for (let i = 0; i < Math.max(x.length, y.length); i++) o.push(fn(x[i] || 0, y[i] || 0, i)); return o; };
const lsAB = (q, op) => (Array.isArray(q.ab) && q.ab[2] == op && q.ab[1] >= 0 && q.ab[0] >= (op == '-' ? q.ab[1] : 0) ? q.ab : null);
const BUGS = {
  off1: {d: 'one too many or one too few (a counter counted twice, or one missed)', say: 'Count each one once. Touch it as you count.'},
  given: {d: 'answers with a number that is already shown', f: q => (Array.isArray(q.ab) ? q.ab.slice(0, 2) : []), say: 'The number we see is not the answer.'},
  op: {d: 'adds instead of taking away (or the other way round)', f: q => (lsAB(q, '-') ? [q.ab[0] + q.ab[1]] : lsAB(q, '+') && q.ab[0] >= q.ab[1] ? [q.ab[0] - q.ab[1]] : []),
    say: 'Look at the sign. Are we adding or taking away?'},
  all: {d: 'counts them all and forgets to take away', say: 'Some went away. Count only the ones left.'},
  ten: {d: 'forgets the ten (or counts it as one)', say: 'A full frame is ten. Count the ten first.'},
  swap: {d: 'reads the tens and ones the wrong way round (14 as 41)', f: q => (Array.isArray(q.ab) && /^\d\d$/.test(q.ans) && q.ans[0] != q.ans[1] ? [+(q.ans[1] + q.ans[0])] : []),
    say: 'The tens come first. Then the ones.'},
  small: {d: 'picks the smaller one as bigger (the sign turned round)', say: 'The open side faces the bigger number.'},
  back: {d: 'counts the wrong way (on instead of back)', say: 'Back means smaller numbers. Count down.'},
  // grade 1 and 2 ideas (place value, carrying, borrowing, clocks, coins): every one computed from the question's own numbers
  col: {d: 'takes the smaller digit from the bigger one in each column', f: q => (lsAB(q, '-') ? [+lsCols(q.ab[0], q.ab[1], (x, y) => Math.abs(x - y)).reverse().join('')] : []),
    say: 'Top take away bottom. Not the small from the big.'},
  keep: {d: 'borrows a ten for the ones but does not take it from the tens', f: q => {
    if (!lsAB(q, '-')) return [];
    const o = lsCols(q.ab[0], q.ab[1], (x, y) => (x < y ? x + 10 - y : x - y));
    return [+o.reverse().join('')];
  }, say: 'We took a ten. Now the tens have one less.'},
  nocarry: {d: 'adds each column and drops the extra ten', f: q => (lsAB(q, '+') ? [+lsCols(q.ab[0], q.ab[1], (x, y) => (x + y) % 10).reverse().join('')] : []),
    say: 'Ten ones make a ten. Carry it over.'},
  cat: {d: 'writes each column total side by side (27 + 15 as 312)', f: q => (lsAB(q, '+') ? [+lsCols(q.ab[0], q.ab[1], (x, y) => x + y).reverse().join('')] : []),
    say: 'Only one digit fits in each place.'},
  count: {d: 'counts the coins instead of adding their values', f: q => (Array.isArray(q.coins) ? [q.coins.length] : []), say: 'Each coin has a value. Add the values.'},
  hands: {d: 'reads the long hand as the hour and the short hand as the minutes', f: q => {
    if (!Array.isArray(q.hm)) return [];
    const [h, m] = q.hm;
    return m % 5 == 0 ? [`${m ? m / 5 : 12}:${String((h % 12) * 5).padStart(2, '0')}`] : [];
  }, say: 'The short hand tells the hour.'},
};
// the wrong answers each code predicts for q: the script's q.bug, then the code's own function; never the right answer
function knowPredict(q) {
  const o = {};
  for (const c in BUGS) {
    const v = [].concat((q.bug || {})[c] || [], BUGS[c].f ? BUGS[c].f(q) : []).map(String).filter(x => x !== String(q.ans));
    if (v.length) o[c] = [...new Set(v)];
  }
  return o;
}
const lsBugsOf = (q, v) => { const P = knowPredict(q); return Object.keys(P).filter(c => P[c].includes(String(v))); };
// tallies halve every LS_FADE days (k.f: the day of the last halving), so an old slip stops counting
const LS_FADE = 14, LS_WRONG = 8;
function knowFade(k, day) {
  if (day == null) return k;
  if (k.f == null) k.f = day;
  while (day - k.f >= LS_FADE) {
    for (const c in k.b) if (!(k.b[c] = k.b[c] >> 1)) delete k.b[c];
    k.f += LS_FADE;
  }
  return k;
}
// one first try in a lesson: stage level, a misconception tally, and the last LS_WRONG wrong answers [codes, problem, day]
function knowAdd(id, q, v, ok, S0 = S, day = lsDay()) {
  const k = knowFade(lsKnow(id, S0), day), l = k.lv[Math.max(0, Math.min(2, q.st | 0))];
  l[1]++;
  if (ok) return void l[0]++;
  knowWrong(k, q, v, day);
}
// a wrong first try on the record k: a tally for each code that predicts it, and the page of the last LS_WRONG wrong answers
function knowWrong(k, q, v, day) {
  const cs = lsBugsOf(q, v);
  for (const c of cs) k.b[c] = (k.b[c] || 0) + 1;
  (k.w = k.w || []).push([cs.join(','), String(q.label || q.ans).slice(0, 16), day]);
  if (k.w.length > LS_WRONG) k.w.splice(0, k.w.length - LS_WRONG);
}
/* TEACH-2b: Practice rounds feed the record too (TEACH-PLAN-2 system C), through one wrap of check() (50-round.js) installed when this
   part loads. Only a wrong FIRST try on a stop that has a lesson script (live or drafted) is written, and only its misconception page
   (knowWrong: the tallies and the last wrong answers), never the lesson levels, the stage or the memory box: Practice is evidence of
   what the child thinks, not a lesson. It reads the round and never changes it: the wrap computes right or wrong the way check()
   does, writes, then calls check() itself with the same arguments, so what Practice asks and how it scores are the same (tools/test.js
   plays seeded rounds with and without the wrap). A Practice question carries its numbers in its label; lsNums reads them onto a copy
   (q.ab from "38 + 47 = ?", q.coins from "coins 10+5+1", q.hm from "clock 4:30"), so the computed codes work on it. Lessons off: nothing. */
function lsNums(q) {
  const o = Object.assign({}, q), l = String(q.label || '');
  let m;
  if (!o.ab && (m = /^(\d+) ([+−-]) (\d+) = \?$/.exec(l))) o.ab = [+m[1], +m[3], m[2] == '+' ? '+' : '-'];
  if (!o.coins && (m = /^coins ([\d+]+)$/.exec(l))) o.coins = m[1].split('+').map(Number);
  if (!o.hm && (m = /^clock (?:to 5 min )?(\d+):(\d\d)$/.exec(l))) o.hm = [+m[1], +m[2]];
  return o;
}
const lsHasScript = id => !!(LESSONS[id] || typeof LS_DRAFTED != 'undefined' && LS_DRAFTED[id]);
function knowPractice(q, v, S0 = S, day = lsDay()) {
  const id = q && q.sk + q.lv;
  if (!id || !lsHasScript(id) || TEACH.off) return false;
  const K = KIND[q.kind], ok = K && K.same ? K.same(q, v) : String(v) === String(q.ans);
  if (ok) return false;
  knowWrong(knowFade(lsKnow(id, S0), day), lsNums(q), v, day);
  return true;
}
if (typeof check == 'function' && !check.lsKnow) {
  const check0 = check;
  check = function (v) {
    try { if (typeof G != 'undefined' && G && G.q && !G.lock && !G.tries && !G.retry) knowPractice(G.q, v); } catch (e) { /* evidence only: never in the round's way */ }
    return check0.apply(this, arguments);
  };
  check.lsKnow = check0;
}
/* How a teacher reads a page of work, not one answer: each code's weight over the last LS_WRONG wrong answers (an answer counts half
   after LS_FADE days, a quarter after twice that) and the problems it explains. day: today (default: the newest answer's day). */
function knowScore(id, S0 = S, day) {
  const k = (S0.know && S0.know[id]) || {}, w = Array.isArray(k.w) ? k.w : [], o = {};
  if (day == null) day = w.reduce((m, e) => Math.max(m, e[2] | 0), 0);
  for (const [cs, pr, d] of w) for (const c of String(cs).split(',').filter(x => BUGS[x])) {
    const x = o[c] || (o[c] = {c, n: 0, pr: new Set()});
    x.n += Math.pow(.5, Math.floor(Math.max(0, day - d) / LS_FADE));
    x.pr.add(pr);
  }
  return Object.values(o).sort((a, b) => b.n - a.n);
}
// the code the child holds: it explains 3 or more of the last 8 wrong answers, across 2 or more problems, and no other code as many
function knowHeld(id, S0 = S, day) {
  const s = knowScore(id, S0, day), a = s[0];
  return a && a.n >= 3 && a.pr.size >= 2 && !(s[1] && s[1].n >= a.n) ? a.c : null;
}
// two codes that fit the same wrong answers equally (2 or more each, nothing held): the probe tells them apart
function knowTie(id, S0 = S, day) {
  const s = knowScore(id, S0, day);
  return s.length > 1 && s[0].n >= 2 && s[1].n == s[0].n && !knowHeld(id, S0, day) ? [s[0].c, s[1].c] : null;
}
// the probe: up to 20 questions from gen(), the first on which codes a and b predict different answers (null if none does)
function knowProbe(a, b, gen) {
  for (let n = 0; n < 20; n++) {
    const q = gen(), P = knowPredict(q);
    if (P[a] && P[b] && !P[a].some(v => P[b].includes(v))) return q;
  }
  return null;
}
// Remember answered on day `day`: a right answer moves the box up (and keeps a learned stop), a miss moves it down
function knowRemember(id, ok, day, S0 = S) {
  const k = lsKnow(id, S0), gap = k.last != null ? day - k.last : 0;
  (S0.lr = Array.isArray(S0.lr) ? S0.lr : []).push([id, gap, ok ? 1 : 0]);
  if (S0.lr.length > LS_KEEP) S0.lr.splice(0, S0.lr.length - LS_KEEP);
  k.box = ok ? Math.min(4, k.box + 1) : Math.max(0, k.box - 1);
  k.due = day + LS_GAP[k.box];
  k.last = day;
  if (ok && k.s == 2 && k.d != null && day > k.d) { k.s = 3; k.k = day; }
}
/* PRE: what each math stop builds on (TEACH-PLAN-2 system D), planning data only: the planner sends a child back to an earlier
   lesson, it never changes what the map opens. Every link is a real stop that sits earlier on the path or in a lower grade, and
   there are no loops (tools/test.js). Pre-K to 2nd grade for now. */
const PRE = {
  pk_count3: ['pk_count2'], pk_num3: ['pk_num2'], tenf1: ['pk_count2'], pk_more2: ['pk_more1'], add4: ['pk_count2', 'pk_more1'],
  tenf2: ['tenf1'], cnt4: ['pk_count3'], tenf3: ['tenf2', 'pk_count3'], add1: ['add4', 'tenf2'], cnt1: ['pk_count3'], eo1: ['cnt1'],
  miss1: ['add1'], sub1: ['add4'], story1: ['add1', 'sub1'], add2: ['add1'], big1: ['cnt1'], cnt2: ['cnt1'], cmp1: ['pk_more2', 'tenf3'],
  miss2: ['miss1', 'add2'], sub2: ['sub1', 'add2'], story2: ['story1', 'sub2'], pv1: ['tenf3', 'big1'], add5: ['add2'], add6: ['add2', 'pv1'],
  add3: ['add2', 'sub2'], big2: ['pv1', 'add3'], coins1: ['cnt2'], eo2: ['eo1', 'pv1'], cmp2: ['cmp1', 'pv1'], time2: ['time1'],
  sub3: ['pv1', 'sub2'], story3: ['story2', 'big2', 'sub3'], big3: ['big2'], mult1: ['cnt2', 'add5'], coins2: ['coins1', 'cnt1'],
  sub4: ['sub3'], time3: ['time2'], big4: ['big3'], mult2: ['mult1'], cmp3: ['cmp2'], coins3: ['coins2'], pv2: ['pv1'],
  big5: ['big4', 'pv2'], pv3: ['pv2'], sub5: ['sub4', 'pv2'], time4: ['time3'], coins4: ['coins3'], arr1: ['mult2'], cnt5: ['cnt3'],
  coins5: ['coins4', 'sub3'], story4: ['story3', 'big3', 'sub4'],
};
// the stops id builds on, nearest first, down to two links
const lsPreOf = id => { const o = []; for (const x of PRE[id] || []) for (const y of [x, ...(PRE[x] || [])]) if (!o.includes(y)) o.push(y); return o; };
// a lesson's strand ("Counting and number sense", "Addition and subtraction", ...): the report card's (82-report.js)
const lsStrand = id => (typeof REP != 'undefined' && LESSONS[id] ? REP.strandOf(LESSONS[id].sk) : String(id).replace(/\d+$/, ''));
// the subjects with lessons (owner decision 1: the child picks the subject; the planner plans inside it)
const LS_SUBJ = ['math'];
/* planToday(S, day, p): the next lesson in the chosen subject p, the pure function of TEACH-PLAN-2 system D. In order:
     1. a lesson left part way (S.les) whose stop is open (kind 'again');
     2. a repair: a misconception held (knowHeld) on a lesson stop the next new stop builds on, or on the last one taught (kind 'repair');
     3. a prerequisite: the next new stop builds on a lesson stop the child has not learned, and either that stop is not passed at all
        or the next stop's lesson has run twice without its Show passed (kind 'again');
     4. the next lesson stop of the child's grade band (Pre-K to 2nd, or 3rd to 5th with their own grade first; TEACH-4: a Pre-K world's
        lessons for a Pre-K child only) that is open, not
        passed and not learned, in map order; but when the last lesson (S.lm) was on an earlier
        day and in the same strand, a stop of another strand whose prerequisites are passed or learned comes first (alternating by
        day; kind 'new');
     5. with nothing new open, the most overdue learned lesson, as a review (kind 'again').
     A stop passed in Practice is not offered again as new; it comes back in Remember.
   remember: the most overdue learned lesson, never today's (one item: owner decision 2); with none due, the last stop passed in
   Practice that no lesson has taught; or none.
   Returns {id, i (the stop's index on the map), kind 'new' | 'again' | 'repair', code (repair), remember: [ids]} or null. */
function planToday(S0, day, p = 'math') {
  if (!LS_SUBJ.includes(p) || !NODES[p] || !S.maps || !S.maps[p]) return null; // TEACH-5S: a map the save has no state for yet (Discover before its first visit in a test save) has no plan
  // TEACH-4: the subject's own map (math, or reading): a lesson of another subject is never found on it
  const at = id => NODES[p].findIndex(n => nid(n) === id), open = id => { const i = at(id); return i >= 0 && unlocked(p, i); };
  const K = S0.know || {}, ps = id => at(id) >= 0 && passed(p, at(id)), learned = id => (K[id] || {}).s >= 2;
  // TEACH-4: a Pre-K world's lessons (Tiny Town, ABC Beach) are a Pre-K child's only (a Kindergartner starts above them, as the map does)
  const g0 = GRADES.includes(S0.grade) ? S0.grade : 0, wg = x => PATHS[p].worlds[NODES[p][at(x)].wi].g;
  const band = x => p == 'es' || (g0 < 3) === (wg(x) < 3) && (wg(x) >= 0 || g0 < 0); // TEACH-5S: the Spanish map is the same for every grade
  // RC-2: a lesson in a world the map passes over (worldBelow: an untouched world below the start world, or behind the child's furthest
  // progress) is not offered: a fresh 1st grader starts at their grade like the map's ring (was: the lowest open lesson of the band, K)
  const sw = startWorld(p), lp = lastWorld(p), skip = x => worldBelow(p, NODES[p][at(x)].wi, sw, lp);
  let id = S0.les && LESSONS[S0.les.n] && open(S0.les.n) ? S0.les.n : null, kind = id ? 'again' : 'new', code = null;
  if (!id) {
    // TEACH-3: a child in 3rd grade or up is offered the grade 3-6 lessons only, their own grade's first (TEACH-6M: 6th grade its own, v188);
    // a child below 3rd grade the Pre-K to 2nd grade lessons only (the app loads teach35 for 3rd grade up, teachWarm; this keeps the
    // plan the same when the part is in from an earlier grade setting, and a little one is never handed word-tile reasons to read)
    const mine = x => (g0 >= 3 && wg(x) != g0 ? 1 : 0);
    const cand = LS_IDS.filter(x => at(x) >= 0 && band(x)).sort((a, b) => mine(a) - mine(b) || at(a) - at(b)).filter(x => open(x) && !ps(x) && !learned(x) && !skip(x));
    const ready = x => (PRE[x] || []).every(y => ps(y) || learned(y));
    let nx = cand[0] || null;
    const lm = Array.isArray(S0.lm) ? S0.lm : [], last = lm[lm.length - 1];
    if (nx && last && last[1] < day && lsStrand(last[0]) == lsStrand(nx)) nx = cand.find(x => lsStrand(x) != lsStrand(nx) && ready(x)) || nx;
    if (nx) {
      const pre = lsPreOf(nx).filter(y => LESSONS[y] && open(y));
      const rep = pre.concat(last && LESSONS[last[0]] && open(last[0]) ? [last[0]] : []).find(y => (K[y] || {}).s >= 1 && knowHeld(y, S0, day));
      const k = K[nx] || {}, back = (PRE[nx] || []).find(y => LESSONS[y] && open(y) && band(y) && !skip(y) && !learned(y) && (!ps(y) || k.n >= 2 && k.s < 2));
      if (rep) { id = rep; kind = 'repair'; code = knowHeld(rep, S0, day); }
      else if (back) { id = back; kind = 'again'; }
      else id = nx;
    }
  }
  // 5. nothing new is open: the most overdue learned lesson again, as a review (its Show counts as remembering it, LS.finish)
  const due0 = LS_IDS.filter(x => K[x] && K[x].s >= 2 && K[x].due <= day && open(x)).sort((a, b) => K[a].due - K[b].due);
  if (!id && due0.length) { id = due0[0]; kind = 'again'; }
  if (!id) return null;
  const due = due0.filter(x => x !== id);
  // nothing due: a stop passed in Practice that no lesson has taught yet (the tutor has not seen it: TEACH-PLAN-2 system D)
  const seen = LS_IDS.filter(x => x !== id && ps(x) && !learned(x) && band(x)); // TEACH-4: in the child's band (a Kindergartner is not sent back to Pre-K)
  return {id, i: at(id), kind, code, remember: (due.length ? due : seen.slice(-1)).slice(0, 1)};
}
// what the pet suggests today (owner decision 1: a suggestion only, the child still picks): of the subjects with a lesson ready,
// the one not used for the last lesson, by day; {p, plan} or null
function planSuggest(S0, day) {
  const ok = LS_SUBJ.map(p => ({p, plan: planToday(S0, day, p)})).filter(x => x.plan);
  if (!ok.length) return null;
  const lm = Array.isArray(S0.lm) ? S0.lm : [], last = lm[lm.length - 1], lp = last && LESSONS[last[0]] ? (LESSONS[last[0]].p || 'math') : null;
  return ok.find(x => x.p != lp || !last || last[1] == day) || ok[day % ok.length];
}
// the measure: the record of one lesson; and the summary for grown-ups (first-try accuracy before and after, retention by gap)
function lsMeasure(id, day, pre, post, to, S0 = S) {
  (S0.lm = Array.isArray(S0.lm) ? S0.lm : []).push([id, day, pre.filter(Boolean).length, pre.length, post.filter(Boolean).length, post.length, to ? 1 : 0]);
  if (S0.lm.length > LS_KEEP) S0.lm.splice(0, S0.lm.length - LS_KEEP);
}
function lsSummary(S0 = S) {
  const m = Array.isArray(S0.lm) ? S0.lm : [], r = Array.isArray(S0.lr) ? S0.lr : [], sum = (a, i) => a.reduce((t, x) => t + x[i], 0);
  const pct = (a, b) => (b ? Math.round(100 * a / b) : null);
  const near = r.filter(x => x[1] < 7), far = r.filter(x => x[1] >= 7);
  return {lessons: m.length, before: pct(sum(m, 2), sum(m, 3)), after: pct(sum(m, 4), sum(m, 5)), testedOut: m.filter(x => x[6]).length,
    keptSoon: pct(sum(near, 2), near.length), keptLater: pct(sum(far, 2), far.length), remembered: r.length};
}
// the checkers of open tasks and goal questions (a fixed menu: scripts name one, never write code). v is the submitted value
// (a frame2 build is its state [blue, orange])
const LSGOAL = {
  any: () => true,
  fill: (q, v) => Array.isArray(v) && v[0] > 0 && v[1] > 0 && v[0] + v[1] == q.m.total,
  both: (q, v) => Array.isArray(v) && v[0] > 0 && v[1] > 0,
  sum: (q, v) => Array.isArray(v) && v[0] > 0 && v[1] > 0 && v[0] + v[1] == q.m.target,
  less: (q, v) => +v < q.s0[0],
  gt: (q, v) => +v > q.target,
};
// right or not, for a lesson question: a goal question asks its checker, any other its kind
function lsOk(q, v) {
  if (q.goal) return !!(LSGOAL[q.goal] && LSGOAL[q.goal](q, v));
  const K = KIND[q.kind];
  return K.same ? K.same(q, v) : String(v) === String(q.ans);
}
// the two-colour ten frame (TEACH-PLAN-2 system B): state [blue, orange], a stepper row each. small-fix: which square holds which
// counter is s.lay (0 empty, 1 blue, 2 orange per square), a property on the state array, so the state, what is checked and what is
// submitted stay the two counts; a state without it (the start, an answer, the pet's) fills the squares in turn, blue first
const f2Lay = (q, s) => s.lay || Array.from({length: q.m.total}, (_, i) => (i < s[0] ? 1 : i < s[0] + s[1] ? 2 : 0));
const f2Of = lay => Object.assign([lay.filter(x => x == 1).length, lay.filter(x => x == 2).length], {lay});
if (typeof K2MM != 'undefined') K2MM.frame2 = {
  s0: () => [0, 0],
  val: (q, s) => s[0] + s[1],
  ans: q => [Math.max(1, +q.ans - 1), 1],
  // a stepper: + fills the first empty square, - empties the last square of that colour
  step: (q, s, i, d) => {
    if (s[i] + d < 0 || s[0] + s[1] + d > q.m.total) return null;
    const L = f2Lay(q, s).slice();
    for (let k = 0; k < Math.abs(d); k++) L[d > 0 ? L.indexOf(0) : L.lastIndexOf(i + 1)] = d > 0 ? i + 1 : 0;
    return f2Of(L);
  },
  draw: (q, s) => {
    const L = f2Lay(q, s);
    return VIZ.tenFrame(s[0] + s[1], q.m.total, {b: s[1], cells: 1, at: [1, 2].flatMap(k => L.flatMap((x, i) => (x == k ? [i] : [])))});
  },
  // LESSON-STAGE (owner, 2026-11-23): tap the frame itself (KIND.make): an empty square puts in a blue one, a blue one turns orange, an
  // orange one comes out; the stepper rows stay for the keyboard. small-fix: the square tapped is the one that changes
  tap: (q, s, t) => {
    const c = +t.dataset.c, L = f2Lay(q, s).slice();
    if (!(c >= 0 && c < L.length)) return null;
    L[c] = (L[c] + 1) % 3;
    return f2Of(L);
  },
  ctl: () => `<div class="mmc mmcol">${[['blue', 'ls-d1'], ['orange', 'ls-d2']].map(([c, k], i) => `<div class="mms"><span class="mml"><i class="ls-dot ${k}" aria-hidden="true"></i></span>`
    + `${mmBtn(i, -1, 'minus', 'Take away a ' + c + ' one')}<output class="mmn" data-o="${i}">0</output>${mmBtn(i, 1, 'plus', 'Put in a ' + c + ' one')}</div>`).join('')}</div>`,
};
/* ---------- TEACH-1: the twelve hand-written lesson scripts (part teach) ----------
   One entry per stop, keyed by its node id (nid in 42-paths.js). Words are written here; every number a line says or shows comes
   from the question or from the child's own build, so a script cannot state a wrong fact (TEACH-PLAN-2 system F).
   An entry:
     sk, lv     the stop (its node id is sk + lv)          t     the stop's name (as on the map)
     idea       the one sentence of Name it (the notebook line later)
     test       the stage of the "show me" items (test-out and pre-check) and of Show (the post-check): 1 picture, 2 symbols, 3 a typed
                symbols item for a stop whose symbols stage is a choice (so two lucky taps cannot test out)
     q(stage, r)  a question at stage 0 (build on the model), 1 (the picture and a pad) or 2 (symbols only); r is the lesson's rng
     exp(r)     Explore: an open task {q, goal, nudge} and react(v) -> {lines, ctx} (no wrong answer, only "not yet")
     name(ctx, r) Name it: {html, lines} built on what the child made in Explore
     pet(r, code) Check me: {q, pv, says, code}: the pet's own answer pv to q (wrong by the misconception code, or right)
     bugs       the misconception codes the pet may show (the first is the default; the child's own tally wins, 52b-know.js)
     home       tonight's question for a grown-up ({name} is the child)
   The questions are ordinary question objects (kinds num, make, line, choice) that KIND renders, plus:
     q.st       the stage;  q.bug {code: [wrong values]} what a child holding that misconception would answer;
     q.goal     (make, line) a checker name from LSGOAL instead of one right answer;  q.s0 a start state for make (the pet's build).
   Lines are short: 12 words or fewer for Pre-K to 1st (tools/test.js checks it), and never a theme from the banned list. */
const lsRi = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const lsEq = t => `<div class="eq">${t}</div>`;
const lsAsk = t => `<div class="sub pktxt">${t}</div>`;
const lsQm = '<b class="ls-qm">?</b>';
const lsTO = (t, o) => `${t} ten${t == 1 ? '' : 's'} and ${o} one${o == 1 ? '' : 's'}`; // 1 ten and 4 ones
// a question object; o.say is required, o.bug the misconception values, pk: Kindergarten (spoken, big speaker)
function lsQ(sk, lv, st, o) {
  const q = Object.assign({sk, lv, st, pk: true, auto: true, label: o.label || sk + lv + ' ' + o.ans}, o);
  q.ans = String(o.ans);
  q.bug = {};
  for (const c in o.bug || {}) q.bug[c] = o.bug[c].filter(v => String(v) !== q.ans);
  if (!q.goal && q.bug.off1 == null && /^\d+$/.test(q.ans)) q.bug.off1 = [+q.ans - 1, +q.ans + 1].filter(x => x >= 0);
  return q;
}
// the ten frame to build on: n counters to put in, total 5, 10 or 20, fixed already in (another colour), s0 a start state
function lsFrame(sk, lv, st, n, total, o = {}) {
  return lsQ(sk, lv, st, Object.assign({kind: 'make', model: 'frame', m: {total, fixed: o.fixed || 0}, eq: 'value', ans: n}, o));
}
const lsB10 = (sk, lv, st, n, o) => lsQ(sk, lv, st, Object.assign({kind: 'make', model: 'b10', m: {places: 2}, eq: 'value', ans: n}, o));
const lsNum = (sk, lv, st, ans, html, say, o) => lsQ(sk, lv, st, Object.assign({kind: 'num', ans, html, say}, o));
function lsPick(sk, lv, st, ans, html, say, ch, o) {
  return lsQ(sk, lv, st, Object.assign({kind: 'choice', ans, html, say, cls: 'syms', choices: ch.map(c => ({v: String(c[0]), l: String(c[1] != null ? c[1] : c[0])}))}, o));
}
function lsLine(sk, lv, st, ans, line, html, say, o) {
  const start = o && o.start != null ? o.start : (+ans === line.min ? line.max : line.min);
  return lsQ(sk, lv, st, Object.assign({kind: 'line', line, snap: 1, ans, start: String(start), html, say}, o));
}
// the hint picture for a ten-frame fact
const lsFrameHint = (n, total, o, s) => ({k: 'html', html: `<div class="pkhint">${VIZ.tenFrame(n, total, o || {})}<div>${s}</div></div>`, w: s});
// an open two-colour frame (Explore): any build, or one that fills the frame (goal fill), or one that makes m.target (goal sum)
const lsFrame2 = (sk, lv, total, goal, o = {}) => lsQ(sk, lv, 0, Object.assign({kind: 'make', model: 'frame2', m: {total, target: o.target}, eq: 'value',
  ans: o.target || total, goal}, o));

const LESSONS = {
  pk_count3: {sk: 'pk_count', lv: 3, t: 'Count to 20', test: 1, idea: 'Count the full ten, then count on.', bugs: ['off1', 'ten'],
    q(st, r) {
      const n = lsRi(r, 11, 19);
      if (st == 0) return lsFrame('pk_count', 3, 0, n, 20, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}. Fill the top ten, then count on.`,
        hint: lsFrameHint(10, 20, {}, `Ten first. Then ${n - 10} more.`)});
      if (st == 1) return lsNum('pk_count', 3, 1, n, `<div class="pkq">${VIZ.tenFrame(n, 20)}</div>${SLOT}`, 'How many? Count the full ten, then count on.',
        {hint: lsFrameHint(n, 20, {b: n - 10}, `Ten and ${n - 10} more.`), bug: {ten: [n - 10]}});
      return lsNum('pk_count', 3, 2, n + 1, `<div class="seq">${n}, ${lsQm}</div>${SLOT}`, `What comes after ${n}?`, {hint: {k: 'text', s: `Count on from ${n}: one more.`, w: `Count on from ${n}. One more.`}, bug: {given: [n]}});
    },
    exp: () => ({q: lsFrame('pk_count', 3, 0, 20, 20, {html: lsAsk('Put in as many as you like!'), say: 'Put in as many counters as you like!', goal: 'any'}),
      react: v => ({ctx: {n: +v}, lines: +v > 10 ? [`You made ${v}!`, `That is ten and ${v - 10} more.`] : [`You made ${v}!`]})}),
    name: c => {
      const n = c.n > 10 ? c.n : 14;
      return {html: `<div class="pkq">${VIZ.tenFrame(n, 20, {b: n - 10})}</div>` + lsEq(`10 and ${n - 10} is ${n}`),
        lines: ['A full frame is ten.', `Ten and ${n - 10} more is ${n}.`, 'Count the full ten, then count on.']};
    },
    home: 'Ask {name} to count 14 toys: ten first, then four more.'},

  tenf1: {sk: 'tenf', lv: 1, t: 'Ten Frames', test: 1, idea: 'The top row holds five.', bugs: ['off1'],
    q(st, r) {
      if (st == 0) {
        const n = lsRi(r, 3, 10);
        return lsFrame('tenf', 1, 0, n, 10, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}. Tap the ten frame to put in ${n} counters.`,
          hint: lsFrameHint(Math.min(n, 5), 10, {}, n > 5 ? `Fill the top row: five. Then ${n - 5} more.` : 'Count as you tap.')});
      }
      if (st == 1) {
        const n = lsRi(r, 4, 10);
        return lsNum('tenf', 1, 1, n, `<div class="pkq">${VIZ.tenFrame(n, 10)}</div>${SLOT}`, 'How many counters?',
          {hint: lsFrameHint(n, 10, {b: Math.max(0, n - 5)}, n > 5 ? `Five on top and ${n - 5} more.` : 'Count them one by one.')});
      }
      const k = lsRi(r, 1, 5);
      return lsNum('tenf', 1, 2, 5 + k, lsEq(`5 + ${k} = ${SLOT}`), `5 and ${k} more makes what?`, {hint: lsFrameHint(5 + k, 10, {b: k}, `Five and ${k} more.`), bug: {given: [5, k]}});
    },
    exp: () => ({q: lsFrame('tenf', 1, 0, 10, 10, {html: lsAsk('Fill it any way you like!'), say: 'Put in as many counters as you like!', goal: 'any'}),
      react: v => ({ctx: {n: +v}, lines: +v >= 5 ? [`You made ${v}.`, +v == 5 ? 'Five fills the top row!' : `Five on top and ${v - 5} more.`]
        : [`You made ${v}.`, `${5 - v} more fills the top row.`]})}),
    name: c => {
      const n = c.n > 5 ? c.n : 7;
      return {html: `<div class="pkq">${VIZ.tenFrame(n, 10, {b: n - 5})}</div>` + lsEq(`5 and ${n - 5} is ${n}`),
        lines: ['The top row holds five.', `Five and ${n - 5} more is ${n}.`]};
    },
    home: 'Ask {name}: "Show me 7 fingers. Is it five and some more?"'},

  tenf2: {sk: 'tenf', lv: 2, t: 'Make Ten', test: 2, idea: 'Two parts make ten.', bugs: ['off1', 'given'],
    q(st, r) {
      const f = lsRi(r, 1, 9), hint = lsFrameHint(f, 10, {}, 'Count the empty boxes.');
      if (st == 0) return lsFrame('tenf', 2, 0, 10 - f, 10, {fixed: f, html: lsAsk(`There are ${f}. Fill it to make 10.`),
        say: `There are ${f} counters. Put in more to make 10.`, hint, bug: {given: [f]}});
      if (st == 1) return lsNum('tenf', 2, 1, 10 - f, `<div class="pkq">${VIZ.tenFrame(f, 10)}</div>${SLOT}`, 'How many more to make ten?', {hint, bug: {given: [f]}});
      return lsNum('tenf', 2, 2, 10 - f, lsEq(`${f} + ${SLOT} = 10`), `${f} and how many make ten?`, {hint, bug: {given: [f], op: [10 + f]}});
    },
    exp: () => ({q: lsFrame2('tenf', 2, 10, 'fill', {html: lsAsk('Fill the frame. Use both colors!'), say: 'Fill the whole frame. Use both colors. Any way you like!'}),
      nudge: 'Fill every box. Use both colors.',
      react: v => {
        const [a, b] = v;
        return {ctx: {a, b}, lines: [`You made ${a} and ${b}.`, `${a} and ${b} make ten!`]};
      }}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(10, 10, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = 10`),
      lines: [`You made ${c.a} and ${c.b}.`, `${c.a} and ${c.b} make ten.`, 'Two parts make ten.']}),
    home: 'Ask {name}: "If I hold up 7 fingers, how many more make 10?"'},

  tenf3: {sk: 'tenf', lv: 3, t: 'Ten and More', test: 2, idea: 'Ten and some more make the teens.', bugs: ['ten', 'off1'],
    q(st, r) {
      const k = lsRi(r, 1, 9), n = 10 + k, hint = lsFrameHint(n, 20, {b: k}, `Ten and ${k} more.`);
      if (st == 0) return lsFrame('tenf', 3, 0, k, 20, {fixed: 10, html: lsEq(n) + lsAsk(`Ten is in. Make ${n}.`), say: `Ten counters are in. Put in more to make ${n}.`, hint, bug: {ten: [n]}});
      if (st == 1) return lsNum('tenf', 3, 1, n, `<div class="pkq">${VIZ.tenFrame(n, 20)}</div>${SLOT}`, 'How many? Ten, and count on.', {hint, bug: {ten: [k]}});
      return lsNum('tenf', 3, 2, n, lsEq(`10 + ${k} = ${SLOT}`), `Ten and ${k} more make what?`, {hint, bug: {ten: [k]}});
    },
    exp: () => ({q: lsFrame('tenf', 3, 0, 10, 20, {fixed: 10, html: lsAsk('Ten is in. Put in some more!'), say: 'Ten counters are in. Put in as many more as you like!', goal: 'any'}),
      react: v => ({ctx: {k: +v}, lines: [`Ten and ${v} make ${10 + +v}.`]})}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(10 + c.k, 20, {b: c.k})}</div>` + lsEq(`10 + ${c.k} = ${10 + c.k}`),
      lines: ['A full frame is ten.', `Ten and ${c.k} more make ${10 + c.k}.`]}),
    home: 'Ask {name}: "What is ten and three more?"'},

  add4: {sk: 'add', lv: 4, t: 'Add to 5', test: 2, idea: 'Put the parts together and count them all.', bugs: ['off1', 'given'],
    q(st, r) {
      const a = lsRi(r, 1, 4), b = lsRi(r, 1, 5 - a), c = a + b, hint = lsFrameHint(c, 5, {b}, `${a} and ${b} more. Count them all.`), bug = {given: [a, b]};
      if (st == 0) return lsFrame('add', 4, 0, c, 5, {html: lsEq(`${a} + ${b}`) + lsAsk(`Put in ${a}, then ${b} more.`), say: `${a} plus ${b}. Put in ${a}, then ${b} more.`, hint, bug});
      if (st == 1) return lsNum('add', 4, 1, c, `<div class="pkq">${VIZ.tenFrame(c, 5, {b})}</div>` + lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
      return lsNum('add', 4, 2, c, lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
    },
    exp: () => ({q: lsFrame2('add', 4, 5, 'both', {html: lsAsk('Use both colors!'), say: 'Put in some blue and some orange. Any way you like!'}),
      nudge: 'Use both colors.',
      react: ([a, b]) => ({ctx: {a, b}, lines: [`${a} and ${b} make ${a + b}.`]})}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.a + c.b, 5, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.a + c.b}`),
      lines: [`${c.a} and ${c.b} make ${c.a + c.b}.`, `We write ${c.a} plus ${c.b} equals ${c.a + c.b}.`]}),
    home: 'Ask {name}: "You have 2 apples and get 3 more. How many now?"'},

  add1: {sk: 'add', lv: 1, t: 'Adding to 10', test: 2, idea: 'Put the parts together and count them all.', bugs: ['given', 'off1'],
    q(st, r) {
      const a = lsRi(r, 1, 8), b = lsRi(r, 1, 10 - a), c = a + b, hint = lsFrameHint(c, 10, {b}, `${a} and ${b} more. Count them all.`), bug = {given: [a, b]};
      if (st == 0) return lsFrame('add', 1, 0, c, 10, {html: lsEq(`${a} + ${b}`) + lsAsk(`Put in ${a}, then ${b} more.`), say: `${a} plus ${b}. Put in ${a}, then ${b} more.`, hint, bug});
      if (st == 1) return lsNum('add', 1, 1, c, `<div class="pkq">${VIZ.tenFrame(c, 10, {b})}</div>` + lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
      return lsNum('add', 1, 2, c, lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
    },
    exp: () => ({q: lsFrame2('add', 1, 10, 'both', {html: lsAsk('Use both colors!'), say: 'Put in some blue and some orange. Any way you like!'}),
      nudge: 'Use both colors.',
      react: ([a, b]) => ({ctx: {a, b}, lines: [`${a} and ${b} make ${a + b}.`]})}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.a + c.b, 10, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.a + c.b}`),
      lines: [`${c.a} blue and ${c.b} orange.`, `${c.a} plus ${c.b} equals ${c.a + c.b}.`]}),
    home: 'Ask {name}: "4 cars and 3 more cars. How many cars?"'},

  sub1: {sk: 'sub', lv: 1, t: 'Take Away', test: 2, idea: 'Take some away, then count what is left.', bugs: ['all', 'op'],
    q(st, r) {
      const a = lsRi(r, 4, 10), b = lsRi(r, 1, a - 1), c = a - b, hint = lsFrameHint(a, 10, {fade: b}, `Take away ${b}. Count what is left.`);
      const bug = {all: [a], op: a + b <= 20 ? [a + b] : [], given: [b]};
      if (st == 0) return lsFrame('sub', 1, 0, c, 10, {s0: [a], html: lsEq(`${a} − ${b}`) + lsAsk(`Take away ${b}.`), say: `There are ${a}. Take away ${b}.`, hint, bug});
      if (st == 1) return lsNum('sub', 1, 1, c, `<div class="pkq">${VIZ.tenFrame(a, 10, {fade: b})}</div>` + lsEq(`${a} − ${b} = ${SLOT}`), `${a} minus ${b} equals what?`, {hint, bug});
      return lsNum('sub', 1, 2, c, lsEq(`${a} − ${b} = ${SLOT}`), `${a} minus ${b} equals what?`, {hint, bug});
    },
    exp: r => {
      const a = lsRi(r, 6, 9);
      return {q: lsFrame('sub', 1, 0, a - 1, 10, {s0: [a], html: lsAsk(`There are ${a}. Take some away!`), say: `There are ${a} counters. Take some away. Any number you like!`, goal: 'less'}),
        nudge: 'Tap a counter to take it away.',
        react: v => ({ctx: {a, k: a - v}, lines: [`${a} take away ${a - v} leaves ${v}.`]})};
    },
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.a, 10, {fade: c.k})}</div>` + lsEq(`${c.a} − ${c.k} = ${c.a - c.k}`),
      lines: [`We had ${c.a}.`, `We took away ${c.k}. ${c.a - c.k} are left.`, `${c.a} minus ${c.k} equals ${c.a - c.k}.`]}),
    home: 'Ask {name}: "You have 6 grapes and eat 2. How many are left?"'},

  miss1: {sk: 'miss', lv: 1, t: 'Missing Number', test: 2, idea: 'Count on from the part you have to the whole.', bugs: ['op', 'given'],
    q(st, r) {
      const a = lsRi(r, 1, 6), t = lsRi(r, a + 1, 10), k = t - a, hint = lsFrameHint(a, 10, {}, `Count on from ${a} to ${t}.`), bug = {op: a + t <= 20 ? [a + t] : [], given: [a, t]};
      if (st == 0) return lsFrame('miss', 1, 0, k, 10, {fixed: a, html: lsEq(`${a} + ${lsQm} = ${t}`) + lsAsk(`Put in more to make ${t}.`), say: `${a} and how many make ${t}? Put in more to make ${t}.`, hint, bug});
      if (st == 1) return lsNum('miss', 1, 1, k, `<div class="pkq">${VIZ.tenFrame(a, 10)}</div>` + lsEq(`${a} + ${SLOT} = ${t}`), `${a} plus what equals ${t}?`, {hint, bug});
      return lsNum('miss', 1, 2, k, lsEq(`${a} + ${SLOT} = ${t}`), `${a} plus what equals ${t}?`, {hint, bug});
    },
    exp: r => {
      const t = lsRi(r, 5, 9);
      return {q: lsFrame2('miss', 1, 10, 'sum', {target: t, html: lsEq(t) + lsAsk(`Make ${t} with both colors!`), say: `Make ${t}. Use both colors, any way you like!`}),
        nudge: `Make ${t}. Use both colors.`,
        react: ([a, b]) => ({ctx: {a, b, t}, lines: [`${a} and ${b} make ${t}.`, `So ${a} and ${b} more make ${t}.`]})};
    },
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.t, 10, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.t}`),
      lines: [`You had ${c.a}. You put in ${c.b} more.`, `${c.a} plus ${c.b} equals ${c.t}.`, 'The missing number is the part you put in.']}),
    home: 'Ask {name}: "I have 3 blocks. How many more to make 8?"'},

  cnt4: {sk: 'cnt', lv: 4, t: 'Count On & Back', test: 2, idea: 'Count on: one more each time. Count back: one less.', bugs: ['back', 'off1'],
    q(st, r) {
      const on = r() < .5, n = lsRi(r, 2, 17), ans = on ? n + 1 : n - 1, m = n > 10 || ans > 10 ? 10 : 0, line = {min: m, max: m + 10, step: 1, labels: 'all', marks: [n]};
      const hint = {k: 'html', html: `<div class="pkhint">${VIZ.numLine({min: m, max: m + 10, labels: 'all', marks: [n], hide: [ans], hops: [[n, ans, on ? '+1' : '−1']]})}<div>${on ? 'One more: a hop forward.' : 'One less: a hop back.'}</div></div>`, w: on ? 'One more is one hop forward.' : 'One less is one hop back.'};
      const bug = {back: [on ? n - 1 : n + 1], given: [n]};
      if (st == 0) return lsLine('cnt', 4, 0, ans, line, lsEq(n) + lsAsk(on ? `One more than ${n}?` : `One less than ${n}?`),
        `Put the pin on one ${on ? 'more' : 'less'} than ${n}.`, {hint, bug, start: ans == m ? m + 10 : m});
      if (st == 1) {
        const s = on ? [n - 1, n, ans] : [n + 1, n, ans], lo = Math.max(0, Math.min(...s) - 1), hi = lo + 6;
        return lsNum('cnt', 4, 1, ans, `<div class="pkq">${VIZ.numLine({min: lo, max: hi, labels: 'all', hide: [ans]})}</div>${SLOT}`, 'Which number is hiding?', {hint, bug});
      }
      const s = on ? [n - 2, n - 1, n, ans] : [n + 2, n + 1, n, ans];
      return lsNum('cnt', 4, 2, ans, `<div class="seq">${s.slice(0, 3).join(', ')}, ${lsQm}</div>${SLOT}`, `${on ? 'Count on' : 'Count back'}. ${s.slice(0, 3).join(', ')}, what comes next?`, {hint, bug});
    },
    exp: () => ({q: lsLine('cnt', 4, 0, 10, {min: 0, max: 10, step: 1, labels: 'all'}, lsAsk('Put the pin on any number!'), 'Put the pin on any number you like!', {goal: 'any', start: 0}),
      nudge: 'Move the pin to a number.',
      react: v => ({ctx: {n: +v}, lines: +v > 0 && +v < 10 ? [`You picked ${v}.`, `One more is ${+v + 1}. One less is ${v - 1}.`] : [`You picked ${v}.`]})}),
    name: c => {
      const n = c.n > 0 && c.n < 10 ? c.n : 5;
      return {html: `<div class="pkq">${VIZ.numLine({min: 0, max: 10, labels: 'all', hops: [[n, n + 1, '+1'], [n, n - 1, '−1']]})}</div>`,
        lines: ['Count on: each hop is one more.', 'Count back: each hop is one less.', `One more than ${n} is ${n + 1}.`]};
    },
    home: 'Ask {name} to count back from 15 to 10.'},

  pk_more2: {sk: 'pk_more', lv: 2, t: 'More, Fewer, Same', test: 1, idea: 'Match them up. The group with some left over has more.', bugs: ['off1', 'given'],
    q(st, r) {
      const n = lsRi(r, 3, 8), w = st == 0 ? 0 : st == 1 ? 1 : -1, ans = n + w, word = ['the same as', 'one more than', 'one fewer than'][st];
      return lsFrame('pk_more', 2, st, ans, 10, {html: `<div class="pkq">${VIZ.dots(n, 'row')}</div>` + lsAsk(`Make ${word} this.`),
        say: `Make ${word} the dots.`, label: `make ${word} ${n}`, bug: {given: w ? [n] : []},
        hint: lsFrameHint(n, 10, {}, st == 0 ? 'Match each dot with a counter.' : st == 1 ? 'Match each dot. Then put in one more.' : 'Match each dot. Then take one away.')});
    },
    exp: () => ({q: lsFrame2('pk_more', 2, 10, 'both', {html: lsAsk('Put in blue and orange!'), say: 'Put in some blue and some orange. Any way you like!'}),
      nudge: 'Use both colors.',
      react: ([a, b]) => ({ctx: {a, b}, lines: [`You made ${a} blue and ${b} orange.`, a > b ? 'Blue has more.' : a < b ? 'Orange has more.' : 'They are the same!']})}),
    name: c => {
      const a = c.a != c.b ? c.a : 6, b = c.a != c.b ? c.b : 4, big = Math.max(a, b);
      return {html: `<div class="pkq">${VIZ.dots(a, 'row')}</div><div class="pkq">${VIZ.dots(b, 'row', {b})}</div>`,
        lines: ['Match them up, one and one.', `${big - Math.min(a, b)} left over. That group has more.`, 'Nothing left over means the same.']};
    },
    home: 'Ask {name}: "Who has more socks, you or me?"'},

  pv1: {sk: 'pv', lv: 1, t: 'Tens & Ones', test: 2, idea: 'A rod is ten. A little cube is one.', bugs: ['swap', 'off1'],
    q(st, r) {
      const t = lsRi(r, 1, 5), o = lsRi(r, 1, 9), n = t * 10 + o, sw = o * 10 + t, bug = {swap: sw != n && sw < 100 ? [sw] : [], given: [t, o, t + o]};
      const hint = {k: 'html', html: `<div class="pkhint">${VIZ.base10(n)}<div>${lsTO(t, o)}.</div></div>`, w: `Count the rods by tens. Then the cubes by ones.`};
      if (st == 0) return lsB10('pv', 1, 0, n, {html: lsEq(n) + lsAsk(`Make ${n} with blocks.`), say: `Make ${n} with blocks: tens and ones.`, hint, bug, pk: false});
      if (st == 1) return lsNum('pv', 1, 1, n, `<div class="pkq">${VIZ.base10(n)}</div>${SLOT}`, 'How many blocks in all? Count the rods by tens.', {hint, bug, pk: false});
      return lsNum('pv', 1, 2, n, lsEq(`${lsTO(t, o)} = ${SLOT}`), `${lsTO(t, o)} make what number?`, {hint, bug, pk: false});
    },
    exp: () => ({q: lsB10('pv', 1, 0, 99, {html: lsAsk('Make any number with blocks!'), say: 'Make any number you like with rods and cubes!', goal: 'any', pk: false}),
      react: v => ({ctx: {n: +v}, lines: [`You made ${lsTO(Math.floor(v / 10), v % 10)}.`, `That is ${v}.`]})}),
    name: c => {
      const n = c.n > 10 && c.n % 10 ? c.n : 34, t = Math.floor(n / 10), o = n % 10;
      return {html: `<div class="pkq">${VIZ.base10(n)}</div>` + lsEq(`${lsTO(t, o)} = ${n}`),
        lines: ['A rod is ten. A little cube is one.', `${lsTO(t, o)} make ${n}.`, 'The tens digit comes first.']};
    },
    home: 'Ask {name}: "How many tens are in 34?"'},

  cmp1: {sk: 'cmp', lv: 1, t: 'Bigger or Smaller', test: 3, idea: 'Bigger numbers sit further along the number line.', bugs: ['small'],
    q(st, r) {
      let a = lsRi(r, 2, 19), b = lsRi(r, 2, 19);
      if (a == b && r() < .7) b = b < 19 ? b + 1 : b - 1;
      const ans = a > b ? '>' : a < b ? '<' : '=', bug = {small: ans == '=' ? [] : [ans == '>' ? '<' : '>']};
      const hint = {k: 'html', html: `<div class="pkhint">${VIZ.numLine({min: 0, max: 20, labels: [0, 5, 10, 15, 20], marks: [a, b]})}<div>Further along is bigger.</div></div>`, w: 'The number further along the line is bigger.'};
      if (st == 3) {
        if (a == b) b = a < 19 ? a + 1 : a - 1;
        return lsNum('cmp', 1, 2, Math.max(a, b), lsEq(`${a} or ${b}?`) + k2Sub('Type the bigger number.') + SLOT, `Which is bigger, ${a} or ${b}? Type the bigger number.`,
          {hint, bug: {small: [Math.min(a, b)]}, pk: false});
      }
      if (st == 0) {
        const m = lsRi(r, 3, 15);
        return lsB10('cmp', 1, 0, m + 1, {goal: 'gt', target: m, html: lsEq(m) + lsAsk(`Make a number bigger than ${m}.`), say: `Make any number bigger than ${m}.`,
          hint: {k: 'html', html: `<div class="pkhint">${VIZ.base10(m)}<div>Put in one more cube, or more.</div></div>`, w: 'Put in more blocks than this.'}, bug: {given: [m]}, pk: false});
      }
      const html = (st == 1 ? `<div class="pkq">${VIZ.numLine({min: 0, max: 20, labels: [0, 5, 10, 15, 20], marks: [a, b]})}</div>` : '') + lsEq(`${a} ${SLOT} ${b}`) + k2Sub('Bigger, smaller, or the same?');
      return lsPick('cmp', 1, st, ans, html, `Is ${a} greater than, less than, or equal to ${b}?`, [['<'], ['='], ['>']], {hint, bug, pk: false, after: `${a} is ${ans == '>' ? 'greater than' : ans == '<' ? 'less than' : 'equal to'} ${b}`});
    },
    exp: () => ({q: lsLine('cmp', 1, 0, 5, {min: 0, max: 10, step: 1, labels: 'all'}, lsAsk('Put the pin on any number!'), 'Put the pin on any number you like!', {goal: 'any', start: 0, pk: false}),
      nudge: 'Move the pin to a number.',
      react: v => ({ctx: {n: +v}, lines: [`You picked ${v}.`, +v < 10 ? `${+v + 1} is further along. It is bigger.` : 'Ten is the biggest here!']})}),
    name: c => {
      const a = c.n > 0 && c.n < 20 ? c.n : 12, b = a > 6 ? a - 5 : a + 5;
      return {html: `<div class="pkq">${VIZ.numLine({min: 0, max: 20, labels: [0, 5, 10, 15, 20], marks: [a, b]})}</div>` + lsEq(`${Math.max(a, b)} > ${Math.min(a, b)}`),
        lines: ['Bigger numbers sit further along the line.', `${Math.max(a, b)} is greater than ${Math.min(a, b)}.`, 'The open side faces the bigger number.']};
    },
    home: 'Ask {name}: "Which is bigger, 38 or 83?"'},
};
// the lessons in map order (the planner and the map offer walk this list)
const LS_IDS = Object.keys(LESSONS);

/* The pet's tone at each age (owner decision 3, 2026-11-17). The pet grows up with the grade setting: the same friend, older.
   It never changes form and has no powers. Only the little one is live in batch 1 (the twelve
   lessons are Kindergarten and 1st grade); batch 2 adds the older looks and wires the other two.
     little   Pre-K to 2nd. Warm and playful. Short lines (12 words or fewer), lots of "we" and "let's", big praise, says the
              child's name. Hands-on first; asks "Check me!" as a game. Every line is spoken.
     kid      3rd and 4th. An older kid: friendly, a little jokey, praise names what was done ("You lined up the tens"), not just
              "Super!". Lines up to 16 words. More "you try", fewer hints.
     teen     5th and 6th. A teen-like partner: calm, dry, no baby praise ("Nice." "That holds up."). Asks the child to check
              its work and to "give me a hard one". Lines up to 20 words; never talks down.
   TEACH-UX (v183): remGo opens Remember, before rem or the script's Remember line, so the child hears that the lesson goes on after
   this one item (a 1st grader saw only "Do you remember this?" and a sum, and thought that was the whole lesson). An engine line like
   the others here: live at once, in the tablet's voice until the owner approves it (.claude/TEACHUX-READ.md) and en-audio --teach
   records it. */
const LS_TONE = {
  little: {hi: n => `Hi ${n}! Let's learn together.`, yay: ['Yes!', 'You got it!', 'Super!', 'Hooray!', 'Great job!'], help: 'Look! Let me help.',
    tryMore: "Let's look at it together.", testOut: 'You know this! Show me!', showMe: 'Your turn to show me!', myTurn: 'My turn. Check me!',
    caught: 'You caught my mistake!', fooled: 'Look again. I made a mistake!', rightMe: 'Yes, I got it right!', wrongMe: 'I was right this time!',
    fixIt: 'Can you fix it?', win: 'We did it!', bye: n => `Great learning, ${n}!`, rem: 'Do you remember this?',
    remGo: 'Quick one first, then we build!',
    nb: n => `Look! We learned ${n} big idea${n > 1 ? 's' : ''}!`, nb0: "Let's learn together and fill our notebook!", kept: 'And you still know it!',
    first: 'First, show me what you know.', play: "Let's play first.", tog: "Now let's do some together.", more: 'One more, together!', fixed: 'You fixed it!',
    look: 'Look at these two.', isRight: 'This one is right.'},
  kid: {hi: n => `Hey ${n}. New idea today.`, yay: ['Nice work.', 'You got it.', 'Right on.', 'Exactly.'], help: 'Here is a picture to help.',
    tryMore: 'Try it with the picture.', testOut: 'Looks like you know this. Prove it!', showMe: 'Show me what you know.',
    myTurn: 'My turn. Check my work.', caught: 'Good catch. I slipped there.', fooled: 'Look closer. I slipped.', rightMe: 'Yep, that one was right.',
    wrongMe: 'Actually, I had it right.', fixIt: 'Fix it for me?', win: 'Nailed it.', bye: n => `Good work today, ${n}.`, rem: 'Remember this one?',
    remGo: 'Quick warm-up first. Then we build the new idea.',
    nb: n => `Your notebook has ${n} idea${n > 1 ? 's' : ''} in it.`, nb0: 'Your notebook fills up as we learn.', kept: 'You still know this one.',
    first: 'First, show me what you already know.', play: 'Try this first. Any way works.', tog: 'Now a few with me.', more: 'One more, with the picture.',
    fixed: 'You fixed it.', look: 'Compare these two.', isRight: 'This one is right.'},
  teen: {hi: n => `Hey ${n}. Here is today's idea.`, yay: ['Nice.', 'Correct.', 'That holds up.', 'Clean.'], help: 'Picture it first.',
    tryMore: 'Use the model.', testOut: 'You might know this already. Show me.', showMe: 'Your call.', myTurn: 'My turn. Check my work.',
    caught: 'Fair. I got that wrong.', fooled: 'Look again. That one was wrong.', rightMe: 'That one was fine.', wrongMe: 'That one was actually right.',
    fixIt: 'Fix it.', win: 'Done.', bye: n => `Good session, ${n}.`, rem: 'Quick one from before.',
    remGo: 'Warm-up first, then we build the new idea.',
    nb: n => `Your notes: ${n} idea${n > 1 ? 's' : ''} so far.`, nb0: 'Your notes go here as we work.', kept: 'Still solid.',
    first: 'Show me what you already know.', play: 'Try this first. There is no wrong way.', tog: 'A few to work through.', more: 'One more with the model.',
    fixed: 'Fixed.', look: 'Compare these two.', isRight: 'This one holds up.'},
};
/* The rules each age's lines are checked against (tools/test.js on LS_TONE and every script; tools/author.js on drafts): the most
   words in a line, and the words that age does not use. The little one may say anything kind; the older kid drops baby praise;
   the teen-like partner also drops the little one's exclamations and never says "we did it" for the child's own work. */
/* LS-STOP: the lines of a lesson stop at each age (the start card, a test-out that slides into the lesson, Check me once more, the pay).
   Kept apart from LS_TONE so the recorded teacher lines (tools/en-audio.js reads LS_TONE.little) stay as recorded. The little one's fixed
   lines, and "Want to learn this with me?" after the name, are recorded too (en-audio --teach, v179); the older ages' are the tablet's
   voice. Checked against LS_RULES like LS_TONE (tools/test.js LS-STOP). */
const LS_TONE2 = {
  little: {open: n => `Hi ${n}! Want to learn this with me?`, slide: "That's okay. Let's learn it together!", findIt: 'One more. Find my mistake!',
    paid: 'You earned game time!', noProof: 'Find my mistake next time to earn game time.'},
  kid: {open: n => `Hey ${n}. Ready for a quick challenge?`, slide: 'No problem. We will work through it.', findIt: 'Another one. Find my slip.',
    paid: 'Game time earned.', noProof: 'Catch my slip next time to earn game time.'},
  teen: {open: n => `Hey ${n}. Short challenge. Ready when you are.`, slide: 'Fine. We will work through it.', findIt: 'Another one. Find the error.',
    paid: 'Game time earned.', noProof: 'Find the error next time to earn game time.'},
};
const lsTone2 = () => LS_TONE2[lsAge(typeof gradeOf == 'function' ? gradeOf() : 0)];
const LS_RULES = {
  little: {words: 12, chars: 90, no: null},
  kid: {words: 16, chars: 110, no: /\b(hooray|yay|super duper|good (boy|girl)|itty|bitty|teeny|tiny friend|sweetie)\b/i},
  teen: {words: 20, chars: 130, no: /\b(hooray|yay|super|great job|good (boy|girl)|awesome|let's play|itty|bitty|teeny|sweetie|yummy|we did it)\b|!!/i},
};
// the pet's age for a grade: little one (Pre-K to 2), older kid (3, 4), teen-like (5, 6)
const lsAge = g => g <= 2 ? 'little' : g <= 4 ? 'kid' : 'teen';
// a line's problems under an age's rules ([] when it is fine)
function lsToneBad(t, age) {
  const R = LS_RULES[age], o = [], w = String(t).trim().split(/\s+/).length;
  if (w > R.words) o.push(`${w} words (${age}: ${R.words} at most)`);
  if (String(t).length > R.chars) o.push(`${String(t).length} characters (${age}: ${R.chars} at most)`);
  const m = R.no && String(t).match(R.no);
  if (m) o.push(`"${m[0]}" is not how the ${age} pet talks`);
  return o;
}
const lsTone = () => LS_TONE[lsAge(typeof gradeOf == 'function' ? gradeOf() : 0)];
/* ---------- TEACH-2: the notebook (TEACH-PLAN-2 system E) and the lessons' part of the report card (system I) (part teach) ----------
   The notebook is the child's own view of "learned": one page per idea the child learned in a lesson, each with the picture of
   something they built in that lesson (drawn again from S.know[id].note, the few numbers of their Explore build; nothing else is
   stored) and the idea in one sentence. A page gains a star when the idea is kept (right again in Remember on a later day).
   Nothing needs reading: the pet says the screen's line when it opens, and each page has a speaker that says its idea.
   It opens from the lesson's end card and from a button on the math map's top bar (once there is a page).
   LSREP builds the lessons' card of the grown-ups' report card (REP in 82-report.js calls it when this part is loaded):
   four stages per strand (taught, practising, learned, still knows it), what we noticed (a misconception held, knowHeld) with the
   "Practise this next" pin, the before-and-after measure and tonight's question. */
// the right build or answer of an Explore task (any build is fine there; this is one the checker takes)
const lsRight = q => (q.kind == 'make' && q.model == 'frame2' ? [(q.m.target || q.m.total) - 1, 1] : q.goal == 'less' ? String(q.s0[0] - 1)
  : q.kind == 'make' && (K2MM[q.model].raw || q.raw) ? K2MM[q.model].ans(q) : q.ans); // TEACH-2b: a raw model's right build is its state
// TEACH-4: a lesson's own map (math or reading); a stop of a lesson whose part is not in is looked for on both
const lsPathOf = id => (LESSONS[id] && LESSONS[id].p) || (NODES.read && NODES.read.some(n => nid(n) === id) ? 'read' : 'math');
const lsAt = id => NODES[lsPathOf(id)].findIndex(n => nid(n) === id);
// the order of the notebook's pages and the report's rows: the math map, then the reading map
const lsOrd = id => (lsPathOf(id) == 'math' ? 0 : 1e4) + lsAt(id);
const NB = {
  // the pages, in map order: {id, t, idea, kept, html (the picture)}
  pages(S0 = S) {
    const K = S0.know || {};
    return LS_IDS.filter(id => K[id] && K[id].s >= 2 && lsAt(id) >= 0).sort((a, b) => lsOrd(a) - lsOrd(b))
      .map(id => ({id, t: LESSONS[id].t, idea: LESSONS[id].idea, kept: K[id].s >= 3, html: NB.pic(id, K[id].note)}));
  },
  // the page's picture: the Name it picture of the lesson, on what the child built (a test-out has no build: a build the lesson takes)
  pic(id, note) {
    const L = LESSONS[id], r = mulberry32(id.length * 7 + 1);
    let c = note && typeof note == 'object' && Object.keys(note).length ? note : null;
    try {
      if (!c) { const e = L.exp(r); c = e.react(NB.build(e.q)).ctx; }
      return L.name(Object.assign({}, c), r).html.replace(/<svg /g, '<svg aria-hidden="true" ');
    } catch (e) { return ''; }
  },
  // a build for a page with no Explore build of its own: an "any way" task gets a small middling one, others the one the checker takes
  build(q) {
    if (q.demo != null) return q.demo; // TEACH-2b: a script's own middling build
    if (q.goal != 'any') return lsRight(q);
    if (q.kind == 'line') return String(Math.round((q.line.min + q.line.max) * .6));
    if (q.model == 'b10') return '34';
    return String(Math.max(1, Math.ceil((q.m.total - (q.m.fixed || 0)) * .35)));
  },
  back: null,
  open(back) {
    NB.back = back || (() => pathMap('math'));
    const pg = NB.pages(), T = lsTone(), sg = planSuggest(S, lsDay()), nx = sg && LESSONS[sg.plan.id];
    const line = pg.length ? T.nb(pg.length) : T.nb0;
    view(`<div class="top tbar s-math nbk-top">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('doc', 30)}<span>My notebook</span></div>
      ${UI.chip('star', pg.filter(p => p.kept).length, {aria: 'Ideas you still know'})}</div>
    <div class="scroll nbk" id="nb"><div class="nbk-in">
     <div class="ls-pet nbk-pet"><div class="ls-art" id="lsart" aria-hidden="true"></div><div class="ls-bub on" id="lsbub" role="status"><span>${esc(line)}</span></div>
      ${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'nbhear', cls: 'ls-hear'})}</div>
     ${pg.length ? `<ul class="nbk-pages">${pg.map(p => `<li class="nbk-pg${p.kept ? ' kept' : ''}" data-nbp="${p.id}"><div class="nbk-pic" aria-hidden="true">${p.html}</div>`
      + `<p class="nbk-idea">${esc(p.idea)}</p><div class="nbk-foot"><span class="nbk-t">${p.kept ? ico('star', 22, 'nbk-star') : ''}<span>${esc(p.t)}</span></span>`
      + `${UI.ibtn('speak', 'Hear: ' + p.idea, {size: 'sm', attrs: `data-nb="${p.id}"`})}</div></li>`).join('')}</ul>`
      : `<div class="nbk-empty" aria-hidden="true">${ico('doc', 64)}</div>`}
     ${nx ? `<div class="nbk-next">${UI.btn(nx.t, {kind: 'primary', size: 'lg', icon: 'go', id: 'nbgo', attrs: `aria-label="Learn ${esc(nx.t)} with ${esc(petN())}"`})}</div>` : ''}
    </div></div>`);
    LS.mood('happy');
    $('#back').onclick = () => { SFX.whoosh(); NB.back(); };
    $('#nbhear').onclick = () => say(line);
    const hear = id => { const p = pg.find(x => x.id == id); if (p) { say(p.kept ? `${p.idea} ${T.kept}` : p.idea); LS.mood('happy'); } };
    $$('[data-nb]').forEach(b => b.onclick = e => { e.stopPropagation(); hear(b.dataset.nb); });
    $$('[data-nbp]').forEach(li => li.onclick = () => hear(li.dataset.nbp));
    if ($('#nbgo')) $('#nbgo').onclick = () => { SFX.whoosh(); LS.start(sg.plan.id); };
    if (LS.voice()) say(line);
  },
  // the button on the math map's top bar, beside the stars (only once there is a page)
  mapBtn() {
    const t = $('.mp-top');
    if (!t || $('#nbopen') || !NB.pages().length) return;
    const b = UI.ibtn('doc', 'My notebook', {size: 'sm', id: 'nbopen', cls: 'nbk-open'}), c = t.querySelector('.chip');
    if (c) c.insertAdjacentHTML('beforebegin', b); else t.insertAdjacentHTML('beforeend', b);
    const mp = ['read', 'es', 'disc'].includes(MAPP) ? MAPP : 'math'; // TEACH-4: back to the map it was opened from (TEACH-5S: Spanish, Discover)
    $('#nbopen').onclick = () => { SFX.whoosh(); NB.open(() => pathMap(mp)); };
  },
};

const LSREP = {
  ST: ['Taught', 'Practising', 'Learned', 'Still knows it'],
  // what we noticed, one per misconception code: "{name} ..." (the idea, never the child)
  NOTE: {
    off1: 'often ends one away from the answer, counting one thing twice or missing one',
    given: 'often answers with a number that is already shown',
    op: 'sometimes adds when the problem takes away, or the other way round',
    all: 'often counts everything and forgets to take some away',
    ten: 'sometimes forgets the full ten when counting past ten',
    swap: 'sometimes swaps the tens and the ones (41 for 14)',
    small: 'sometimes picks the smaller number as the bigger one',
    back: 'often counts on when the problem counts back',
    col: 'often takes the smaller digit from the bigger one in each column',
    keep: 'borrows a ten for the ones but leaves the tens as they were',
    nocarry: 'adds each column but drops the extra ten',
    cat: 'writes each column total side by side (27 + 15 as 312)',
    count: 'counts the coins instead of adding what they are worth',
    hands: 'mixes up the hour hand and the minute hand',
  },
  // the stage of a lesson stop: 0 taught (a lesson ran), 1 practising (more lessons or practice rounds since, not yet without help),
  // 2 learned (Show with no help), 3 still knows it (right again on a later day); -1 not taught
  stage(id, k) {
    if (!k || !(k.s >= 1)) return -1;
    if (k.s >= 2) return k.s >= 3 ? 3 : 2;
    const i = lsAt(id);
    return k.n >= 2 || i >= 0 && passed(lsPathOf(id), i) ? 1 : 0;
  },
  data(S0 = S) {
    const K = S0.know && typeof S0.know == 'object' ? S0.know : {}, day = lsDay(), rows = {}, noticed = [];
    for (const id in K) {
      const st = LSREP.stage(id, K[id]), i = lsAt(id);
      if (st < 0 || i < 0) continue;
      const lp = lsPathOf(id), nd = NODES[lp][i], nm = REP.strandOf(nd.sk), r = rows[nm] || (rows[nm] = {name: nm, c: [0, 0, 0, 0], t: [[], [], [], []]});
      r.c[st]++;
      r.t[st].push(nd.t);
      const h = knowHeld(id, S0, day);
      if (h && LSREP.NOTE[h]) noticed.push({p: lp, sk: nd.sk, lv: nd.lv, t: nd.t, code: h, i: lsOrd(id)});
    }
    const order = REP.STRANDS.map(x => x[0]);
    const lm = Array.isArray(S0.lm) ? S0.lm : [];
    return {any: lm.length > 0 || Object.keys(rows).length > 0, rows: Object.values(rows).sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name)),
      noticed: noticed.sort((a, b) => a.i - b.i).slice(0, 4), off: TEACH.off};
  },
  html(m) {
    const L = m.ls, nm = esc(m.name || 'Your child'), pet = esc(petN()), t = m.teach;
    const cols = L.rows.length ? `<div class="rp-ls" role="table" aria-label="Lessons by stage"><div class="rp-lsr rp-lsh" role="row"><span role="columnheader">Topic</span>`
      + LSREP.ST.map(s => `<span role="columnheader">${s}</span>`).join('') + '</div>'
      + L.rows.map(r => `<div class="rp-lsr" role="row"><span role="rowheader">${esc(r.name)}</span>`
        + r.c.map((n, j) => `<span role="cell" class="rp-lsn${n ? ' on' : ''}" title="${esc(r.t[j].join(', '))}">${n}</span>`).join('') + '</div>').join('') + '</div>'
      + '<div class="small rp-key">Learned means your child did it with no help. Still knows it means they did it again days later. '
      + 'Taught: a lesson ran. Practising: more lessons or rounds since, not yet with no help.</div>' : '';
    const pin = REP.pinned || (() => false);
    const seen = L.noticed.length ? `<h3 class="rp-h3">What we noticed</h3><ul class="rp-list rp-noticed">${L.noticed.map((x, k) => {
      const on = pin(m, x);
      return `<li>In <b>${esc(x.t)}</b>, ${nm} ${esc(LSREP.NOTE[x.code])}. We are working on it: the next lesson starts with the picture of both answers, `
        + `and ${pet} makes that mistake for ${nm} to fix.`
        + `<button class="btn ${on ? 'primary' : 'soft'} sm rp-pin rp-noprint" data-npin="${k}" aria-pressed="${on}">${ico(on ? 'check' : 'pin', 22)}`
        + `<span>${on ? "Tomorrow's first mission" : 'Practise this next'}</span></button></li>`;
    }).join('')}</ul>` : '';
    const meas = t ? `<p>${t.n} lesson${t.n > 1 ? 's' : ''}${t.to ? `, ${t.to} already known (tested out)` : ''}. Right on the first try before the lesson: ${t.pre}%. After it: ${t.post}%.</p>`
      + '<div class="small rp-key">Before: two questions at the start of a lesson, with no help. After: two at its end, with no help. All of it stays on this tablet.</div>' : '';
    return `${t && t.tq ? `<p><b>Tonight's question:</b> ${esc(t.tq)}</p>` : ''}${L.off ? `<p class="small">Lessons are off (Grown-ups, Grade and level).</p>` : ''}${cols}${seen}${meas}`;
  },
  // "Practise this next" on a noticed stop: the report card's pin (S.pin, one stop, tomorrow's first mission)
  bind(m, redraw) {
    $$('[data-npin]').forEach(b => b.onclick = () => {
      const x = m.ls.noticed[+b.dataset.npin];
      if (!x) return;
      S.pin = REP.pinned(m, x) ? null : {p: x.p, sk: x.sk, lv: x.lv, t: String(x.t || '').slice(0, 60), d: today()};
      save();
      SFX.pop(2);
      redraw();
    });
  },
};

var TEACH_VER='v194'; // last line: the whole file ran (checked by dataReady() before the app starts)
