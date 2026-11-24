/* Whistlestop teach v194. BUILT by tools/build.py from 52-lesson.css, 52-lesson.js, 52b-know.js, 52c-scripts.js, 52d-notebook.js, d-teach-audio.js: never edit by hand.
   index.html v194 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v194.js. */
(function(){var s=document.createElement('style');s.id='css-teach';s.textContent="/* TEACH-1: the lesson screen (52-lesson.js, part teach). It is the question screen (.play.qs, .qarea, .inp) with the pet on top of\n   the prompt card: the pet, its caption bubble and \"Hear it again\". Tokens only. */\n.ls-pips{display:flex;gap:6px;align-items:center;flex:1;justify-content:center;min-width:0}\n/* LESSON-STAGE (owner, 2026-11-23): the six beats as a little train's stops on a worn path like the map's trail: white stones, gold\n   once passed (each holds the world's job prop, so the job fills up), the train at the stop of now */\n.ls-top .ls-pips{position:relative;padding:0 var(--s-1)}\n.ls-top .ls-pips::before{content:'';position:absolute;left:var(--s-3);right:var(--s-3);top:50%;height:12px;margin-top:-6px;border-radius:var(--r-pill);\n  background:var(--ill-cream-1);box-shadow:0 0 0 3px var(--surface),0 3px 0 3px var(--line)}\n.ls-pip{position:relative;display:grid;place-items:center;width:34px;height:34px;border-radius:var(--r-pill);background:var(--ill-white-2);\n  box-shadow:inset 0 -3px 0 var(--ill-grey);transition:transform var(--t) var(--ease)}\n.ls-pip .ls-jp{width:26px;height:26px;display:block}\n.ls-pip .ls-tr{width:30px;height:30px;display:block}\n.ls-pip.on{background:var(--star);box-shadow:inset 0 -3px 0 var(--star-shade)}\n.ls-pip.now{background:var(--surface);box-shadow:inset 0 0 0 3px var(--c,var(--math)),0 3px 0 var(--c-shade,var(--math-shade));transform:scale(1.2)}\n/* TEACH-UX: the beat label under the dots (\"Step 1 of 6 · Remember\"); the pair is no taller than the house button, so the bar keeps its\n   height. On a phone the lesson's name gives the label its room (the start card has the name), and the bar's gaps are smaller under 400 px */\n.ls-beats{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:0}\n.ls-beats .ls-pips{flex:none;max-width:100%}\n.ls-step{max-width:100%;font-size:var(--fs-2);font-weight:700;line-height:1.1;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n/* LESSON-STAGE: the words are for screen readers only (the train's stops show the step) */\n.ls-beats>.ls-step{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n@media (max-width:480px){.ls-top .ls-tag{display:none}}\n@media (max-width:400px){.top.tbar.ls-top{gap:var(--s-1)}.ls-step .ls-of{display:none}}\n.ls-tag span{max-width:9em;overflow:hidden;text-overflow:ellipsis}\n.ls-top .ls-tag{flex:none}\n.ls-pet{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:560px;text-align:left}\n.ls-art{flex:none;width:96px;height:96px}\n.ls-art .petwrap,.ls-art svg{width:100%;height:100%;display:block}\n.ls-bub{flex:1;min-width:0;min-height:48px;display:flex;align-items:center;position:relative;background:var(--surface);color:var(--ink);box-shadow:var(--shadow);border-radius:var(--r-card);\n  padding:var(--s-1) var(--s-3);font-size:var(--fs-2);font-weight:700;line-height:var(--lh-2);opacity:.35;transition:opacity var(--t) var(--ease)}\n.ls-bub>span{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}\n.ls-bub.on{opacity:1}\n.ls-bub::before{content:'';position:absolute;left:-9px;top:50%;margin-top:-9px;border:9px solid transparent;border-left:0;border-right-color:var(--surface)}\n.btn.ls-hear{flex:none}\n.ls-turn .ls-bub{background:var(--star-tint);box-shadow:inset 0 0 0 3px var(--star)}\n.ls-turn .ls-bub::before{border-right-color:var(--star)}\n.ls-pw{display:flex;justify-content:center;max-width:100%}\n.ls-pw .viz{max-width:100%}\n.slot.ls-pv{background:var(--star-tint);color:var(--ink)}\n.ls-oops .ls-pw,.ls-oops .ls-pv{outline:4px dashed var(--try);outline-offset:4px;border-radius:var(--r-chip)}\n.ls-qm{color:var(--math-shade)}\n.ls-judge{display:flex;gap:var(--s-3);justify-content:center}\n.ls-judge .btn{flex:1 1 0;min-width:0;max-width:220px;min-height:72px}\n.ls-judge .btn .ic{width:36px;height:36px}\n.ls-judge .btn.right{background:var(--good-tint);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good)}\n.ls-judge .btn.ls-pk{outline:4px solid var(--brand);outline-offset:2px}\n.inp.ls-wait{opacity:.45;pointer-events:none;transition:opacity var(--t) var(--ease)}\n#lsinp>.btn.lg{margin:0 auto;display:flex}\n.ls-dot{display:inline-block;width:26px;height:26px;border-radius:50%;vertical-align:middle}\n.ls-dot.ls-d1{background:var(--math);box-shadow:inset 0 -3px 0 var(--math-shade)}\n.ls-dot.ls-d2{background:var(--play);box-shadow:inset 0 -3px 0 var(--play-shade)}\n/* the offer on the math map: a notebook in a bubble, by the stop the pet suggests */\n.btn.ls-go{position:absolute;width:56px;height:56px;min-height:56px;margin:-28px 0 0 -28px;padding:0;border-radius:50%;z-index:4;display:grid;place-items:center;\n  background:var(--surface);color:var(--math-shade);box-shadow:inset 0 0 0 3px var(--math),0 4px 0 var(--math-shade)}\n.btn.ls-go .ic{width:30px;height:30px}\n.btn.ls-go::after{content:'';position:absolute;inset:-7px;border:3px solid var(--math);border-radius:50%;opacity:0;animation:k-ring var(--t-loop) var(--ease) infinite;pointer-events:none}\n.btn.ls-go:active{transform:translateY(3px);box-shadow:inset 0 0 0 3px var(--math),0 1px 0 var(--math-shade)}\n/* LESSON-STAGE (owner, 2026-11-23): the lesson happens in its stop's world (LS.scene: the map's world scene, behind everything, no\n   taps, no motion). The prompt card shrinks to what it holds (no empty half card), the pet stands big on the ground under it and\n   reacts (its jump on a right answer, its wobble and \"oops\" face on a miss); names in the top bar sit on white pills over the sky. */\n.ls-scn{position:fixed;left:0;top:0;right:0;bottom:0;z-index:0;overflow:hidden;pointer-events:none}\n.ls-scn>.wband{border-radius:0;box-shadow:none}\n.ls-top,.ls-play,.ls-end{position:relative;z-index:1}\n.ls-top .ttl,.ls-top .ls-tag{flex:0 1 auto;padding:var(--s-1) var(--s-3);border-radius:var(--r-pill);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line)}\n.ls-top .ttl{display:flex;align-items:center;gap:var(--s-1);margin-right:auto}\n.ls-top .ls-tag{color:var(--ink-2)}\n.qs.ls-play .qarea{background:none;box-shadow:none;border-top:0;padding:var(--s-2);justify-content:flex-start}\n.qs.ls-play .qarea>*{margin-top:0;margin-bottom:0}\n.qs.ls-play .prompt{padding:var(--s-3) var(--s-4);border-radius:var(--r-card);background:var(--surface);border-top:5px solid var(--c,var(--brand));box-shadow:inset 0 0 0 2px var(--line),var(--shadow)}\n.qs.ls-play .prompt:empty{display:none}\n.qs.ls-play .qhint:empty,.qs.ls-play .qhint:has(.hint:empty){display:none}\n.qs.ls-play .ls-pet{order:3;margin-top:auto;align-items:flex-end;max-width:none}\n.qs.ls-play .ls-bub{align-self:center}\n.qs.ls-play .inp{position:relative}\n.qs.ls-play .inp>.btn.lg,.qs.ls-play .ls-judge{margin-top:auto;margin-bottom:auto}\n/* the start and end cards. LESSON-STAGE: the pet stands on the stop's world, the card beside it (side by side when wide, so the\n   buttons always fit a 1024 x 600 tablet); auto margins centre them and never push anything out of reach when it is taller */\n.ls-end{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);padding:var(--s-3) var(--s-4) var(--s-4)}\n.ls-end>.ls-art{margin-top:auto}\n.ls-endc{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);text-align:center;max-width:560px;width:100%;margin-bottom:auto;\n  padding:var(--s-4);border-radius:var(--r-hero);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),var(--shadow)}\n.ls-endc h1{margin:0;font-size:var(--fs-5)}\n.ls-h{display:flex;align-items:center;justify-content:center;gap:var(--s-2)}\n.ls-art.ls-big{width:150px;height:150px}\n.ls-idea{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-4);font-weight:700;color:var(--ink);background:var(--math-tint);border-radius:var(--r-card);padding:var(--s-2) var(--s-4)}\n.ls-idea .ic{flex:none;color:var(--math-shade)}\n.ls-win{display:flex;align-items:center;justify-content:center;gap:var(--s-4);flex-wrap:wrap}\n.ls-earn{align-self:stretch}\n.ls-acts{display:flex;gap:var(--s-3);flex-wrap:wrap;justify-content:center}\n.ls-job{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-4);font-weight:700;color:var(--ink);text-align:left}\n.ls-job .ls-jp{flex:none;width:56px;height:56px}\n@media (orientation:landscape){\n  .ls-end{flex-direction:row;justify-content:center;align-items:flex-end;gap:var(--s-5)}\n  .ls-end>.ls-art.ls-big{width:clamp(130px,34vh,240px);height:clamp(130px,34vh,240px);margin:0}\n  .ls-endc{align-self:center;margin:auto 0}\n}\n@media (orientation:portrait) and (max-height:820px){.ls-art.ls-big{width:112px;height:112px}.ls-endc{gap:var(--s-2);padding:var(--s-3)}}\n@media (max-height:640px){.ls-endc{gap:var(--s-2);padding:var(--s-3) var(--s-4)}.ls-endc .ls-acts .btn.lg{min-height:60px;font-size:var(--fs-4)}.ls-idea{font-size:var(--fs-3)}}\n@media (max-width:480px){.ls-endc .ls-acts .btn.lg{min-height:56px;font-size:var(--fs-4);padding-left:var(--s-4);padding-right:var(--s-4)}.ls-idea,.ls-job{font-size:var(--fs-3)}}\n@media (min-width:700px) and (min-height:700px){.ls-play .ls-art{width:150px;height:150px}.ls-bub{font-size:var(--fs-3);min-height:64px}.ls-pet{max-width:640px}}\n@media (orientation:landscape) and (min-width:700px){.ls-play .ls-art{width:clamp(110px,28vh,190px);height:clamp(110px,28vh,190px)}}\nhtml.calm .btn.ls-go::after{animation:none}\n/* TEACH-2: a repair's contrast (the right answer beside the held idea's, on one picture each) */\n.ls-con{display:flex;gap:var(--s-3);justify-content:center;flex-wrap:wrap;width:100%}\n.ls-cpane{flex:1 1 140px;max-width:300px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:var(--s-1);padding:var(--s-2);border-radius:var(--r-card);background:var(--surface)}\n.ls-cpane.ok{box-shadow:inset 0 0 0 3px var(--good)}.ls-cpane.ok>.ic{color:var(--good-ink)}\n.ls-cpane.no{box-shadow:inset 0 0 0 3px var(--try)}.ls-cpane.no>.ic{color:var(--ink-2)}\n.ls-cpane .viz,.ls-cpane svg{max-width:100%;height:auto}\n/* TEACH-2: the notebook (52d-notebook.js) */\n.nbk{padding:var(--s-3) var(--s-4) var(--s-6)}\n.nbk-in{max-width:880px;margin:0 auto;display:flex;flex-direction:column;gap:var(--s-4);align-items:center}\n.nbk-top .chip{flex:none}\n.nbk-pages{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:var(--s-3);width:100%;align-items:start}\n.nbk-pg{display:flex;flex-direction:column;gap:var(--s-2);padding:var(--s-3);background:var(--surface);border-radius:var(--r-card);box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--line);cursor:pointer;min-width:0}\n.nbk-pg.kept{box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.nbk-pic{display:flex;flex-direction:column;align-items:center;gap:var(--s-1);min-height:120px;background:var(--math-tint);border-radius:var(--r-chip);padding:var(--s-2);overflow:hidden}\n.nbk-pic .pkq,.nbk-pic .viz,.nbk-pic svg{max-width:100%;height:auto}\n.nbk-pic .eq{font-size:var(--fs-4)}\n.nbk-idea{margin:0;font-size:var(--fs-3);font-weight:700;color:var(--ink);line-height:var(--lh-2)}\n.nbk-foot{display:flex;align-items:center;justify-content:space-between;gap:var(--s-2)}\n.nbk-t{display:flex;align-items:center;gap:var(--s-1);color:var(--ink-2);font-weight:700;min-width:0}\n.nbk-star{color:var(--star-ink);flex:none}\n.nbk-empty{display:grid;place-items:center;width:160px;height:160px;border-radius:50%;background:var(--math-tint);color:var(--math-shade)}\n.nbk-next .btn{min-width:220px}\n/* TEACH-2: the report card's lessons by stage (82-report.js calls LSREP) */\n.rp-ls{display:grid;gap:2px;margin:var(--s-2) 0;font-size:var(--fs-1)}\n.rp-lsr{display:grid;grid-template-columns:minmax(0,2.2fr) repeat(4,minmax(0,1fr));gap:var(--s-1);align-items:center;padding:var(--s-1) 0;border-bottom:1px solid var(--line)}\n.rp-lsh{font-weight:700;color:var(--ink-2);align-items:end;overflow-wrap:anywhere}.rp-lsh>span+span{text-align:center}\n.rp-lsn{text-align:center;font-weight:700;color:var(--ink-2)}\n.rp-lsn.on{color:var(--ink);background:var(--good-tint);border-radius:var(--r-chip)}\n.rp-noticed .rp-pin{display:flex;margin-top:var(--s-2)}\n@media (max-width:560px){.rp-lsr{grid-template-columns:repeat(4,minmax(0,1fr));row-gap:2px}.rp-lsr>[role=rowheader]{grid-column:1/-1;font-weight:700}\n  .rp-lsh>span:first-child{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.rp-lsh{text-align:center}}\n/* TEACH-2b: the workbench pieces of the grade 1 and 2 lessons (52f-bench.js): blocks in a second colour, the trade buttons, groups,\n   the named clock hands */\n.viz .ls-b2{fill:var(--play-shade)}\n.viz .ls-gd{fill:none;stroke:var(--math)}\n.ls-trs{gap:var(--s-2)}\n.mmb.ls-tr{font-size:var(--fs-2);font-weight:700;padding:0 var(--s-3);white-space:nowrap}\n.ls-hh,.ls-mh{display:inline-block;vertical-align:middle;width:22px;height:6px;border-radius:3px;margin-right:6px;background:var(--read)}\n.ls-mh{width:30px;height:4px;background:var(--math)}\n.mm-hands .mms{column-gap:var(--s-2);row-gap:2px}\n.mm-hands .mml{min-width:0;flex-basis:100%;text-align:center}\n/* LS-STOP: the end card's ticket that lands in the bank chip. Calm mode and reduced motion end the motion at once (20-base.css).\n   LESSON-STAGE (owner, 2026-11-23): no ticket meter in the top bar and no price on the start card: game time shows only at the end. */\n.ls-tk{display:inline-flex;align-items:center;gap:var(--s-1);padding:var(--s-1) var(--s-4) var(--s-1) var(--s-2);border-radius:var(--r-pill);\n  font-family:var(--font-display);font-size:var(--fs-5);font-weight:700;color:var(--ink);background:var(--play-tint);box-shadow:inset 0 0 0 3px var(--play),0 3px 0 var(--play-shade)}\n.ls-tk .ic{color:var(--play-shade)}\n.ls-tk.land{animation:ls-land var(--t-slow) var(--ease) forwards}\n@keyframes ls-land{to{transform:translateY(-40px) scale(.6);opacity:0}}\n.ls-earn .ls-gt b{color:var(--ink)}\n.ls-earn .ls-gt0 span{color:var(--ink-2)}\n\n/* LESSON-STAGE (owner, 2026-11-23): models tapped directly (frame2: the squares, bars2: the parts, K2MM.*.tap); the drawing is bigger\n   and is the control, the stepper rows (the keyboard's way) sit side by side under it, smaller */\n.mm-frame2 .mmc.mmcol,.mm-bars2 .mmc.mmcol{flex-direction:row;flex-wrap:wrap;column-gap:var(--s-4);row-gap:var(--s-1)}\n.mm-frame2 .mmn,.mm-bars2 .mmn{font-size:var(--fs-4)}\n.mm-frame2 .mmb,.mm-bars2 .mmb{box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--line)}\n@media (max-width:480px){.qs.ls-play .prompt{padding:var(--s-2)}.qs.ls-play .qarea{gap:var(--s-2)}.ls-play .ls-art{width:72px;height:72px}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
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
    if (LS.voice()) say(said);
  },
  /* LESSON-STAGE: the lesson's place: its stop's world on the map (the world band's scene, SCN.band in 43-scenes.js, drawn for the
     screen with nothing to keep clear, its horizon at about 40% of a wide screen and 30% of a tall one, the sky above it in its own top
     colour); '' when there is none (a lesson with no stop, no scene data). Decoration only: aria-hidden, no taps, no motion. */
  world(id) {
    const L = LESSONS[id], p = L && (L.p || 'math'), n = p && NODES[p] && NODES[p].find(x => nid(x) === id);
    return n && PATHS[p].worlds[n.wi] || null;
  },
  scene(id) {
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
    const t = lines.filter(Boolean).join(' '), b = $('#lsbub'), me = LS.st, c = lsPlain(cap0 || t);
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
     ${rec.pass || PT.sec ? `<div class="ls-win">${rec.pass ? UI.stars(rec.stars, 3, 34) : ''}${PT.sec ? `<div class="ls-tk" id="lstk" aria-hidden="true">${ico('ticket', 28)}<span>+${fmtT(PT.sec)}</span></div>` : ''}</div>` : ''}
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
const lsName = () => (S.name || 'friend');
/* LESSON-STAGE (owner, 2026-11-23): practice in more than one shape. When a stop's generator makes only one kind of question (KMONO),
   pickQ (49b-kinds2.js) asks here for the third question in a row: one of the stop's own lesson items in another kind (its build on
   the model or its picture, stages 0 and 1), as the lesson asks it (the same reviewed words), once the child has learned that lesson.
   An item that needs the lesson around it (a goal, a start state, a raw state, its own answer check, a told story) is never used. It
   is marked as one of the stop's questions (sk, lv) with the label and seed of a fresh generator question of the stop, so a miss
   comes back in Review as the stop's own kind. null when none fits (the round goes on as before). */
function lsMix(sk, lv, kind) {
  const id = sk + lv, L = typeof LESSONS != 'undefined' && LESSONS[id];
  if (!L || typeof lsLearned != 'function' || !lsLearned(id)) return null;
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
// the two-colour ten frame (TEACH-PLAN-2 system B): state [blue, orange], a stepper row each; the frame draws them in turn
if (typeof K2MM != 'undefined') K2MM.frame2 = {
  s0: () => [0, 0],
  val: (q, s) => s[0] + s[1],
  ans: q => [Math.max(1, +q.ans - 1), 1],
  step: (q, s, i, d) => (s[i] + d < 0 || s[0] + s[1] + d > q.m.total ? null : s.map((x, j) => (j == i ? x + d : x))),
  draw: (q, s) => VIZ.tenFrame(s[0] + s[1], q.m.total, {b: s[1], cells: 1}),
  // LESSON-STAGE (owner, 2026-11-23): tap the frame itself (KIND.make): an empty square puts in a blue one, a blue one turns orange, an
  // orange one comes out (the counters fill in turn, blue first); the stepper rows stay for the keyboard
  tap: (q, s, t) => {
    const c = +t.dataset.c, n = s[0] + s[1];
    if (!(c >= 0)) return null;
    return c >= n ? (n < q.m.total ? [s[0] + 1, s[1]] : null) : c < s[0] ? [s[0] - 1, s[1] + 1] : [s[0], s[1] - 1];
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
/* ---------- TEACH-4: the pet's recorded teacher lines (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js --teach) ----------
   The fixed lines and sentences of every lesson, Pre-K to 6th grade (REC-ALL) -> their file, audio/teach/<file>.ogg (xAI text to speech,
   English, the voice luna, speed 0.95 (the little pet) or 1 (only the older pet), Opus 16 kbps mono). One voice: the pet is
   one speaker. Keys are esKey(text). 1289 lines. */
const EN_TEACH={dir:"audio/teach/",ext:".ogg",voice:"luna",lines:{
"A composite number makes an array with more than one row.":"58048b31f523",
"A doing word is something you can do.":"e8bac5d4bb0a",
"A dollar is a hundred cents.":"78566449e90f",
"A dollar is worth a hundred cents.":"231af26f465f",
"A few to work through.":"635025922121",
"A flat line is straight.":"18ee373a9fc1",
"A fraction is a point on the line.":"476ac58acf9b",
"A full frame is ten. Count the ten first.":"4942db0f4b89",
"A hundred is ten tens.":"34bb6fd17186",
"A number is its hundreds plus its tens plus its ones.":"8eeae8adc8bc",
"A number next to x means times: put the number in, multiply, then add.":"5c103dd0a12a",
"A number tells how many.":"1bd1c42a04f3",
"A parallelogram skips the half; a trapezoid adds both bases first, then halves.":"e2916b8f0b65",
"A prime number makes only one row.":"a2e009808443",
"A ratio table grows by multiplying both rows, never by adding the same amount.":"996d3159a8b9",
"A right angle is a square corner.":"35f7d9f064d2",
"A rule goes across, from in to out.":"6789d52783fc",
"A rule links each number to its partner.":"dceb20701661",
"A sentence starts with a capital letter.":"ba23de65df4c",
"A smaller unit needs more of it so multiply.":"bd4389e16464",
"A square has square corners like a rectangle.":"f2497f31f6b9",
"A story tells who, what and where.":"5cfa54a3ef98",
"A whole number has its point at the end.":"baba1d155d1d",
"A whole times a fraction is that many copies of the fraction: multiply the top.":"842747efc123",
"A, B, C, D.":"925c277d46f8",
"Absolute value is that distance, so it is never negative.":"07d769116f6a",
"Across first, then up, both counted from zero.":"2e4cd35fde3f",
"Across first, then up.":"48fe6436d807",
"Across first, then up; left and down are negative.":"813c41422f6f",
"Across zero, add both distances.":"8e9920f95618",
"Actually, I had it right.":"dc177c63d448",
"Add all the sides to find the perimeter.":"5b41ee8be712",
"Add all the sides.":"7c9b99c0c3ec",
"Add each place.":"922f0c1416a1",
"Add every side.":"e85aa34f679a",
"Add from the ones.":"bae85a243b28",
"Add in columns.":"f3a06a96aed2",
"Add in columns: ones, tens, then hundreds.":"65b0f75db382",
"Add it up!":"522c15a0b9b4",
"Add the loads.":"bb60c603dd9c",
"Add the ones column, then the tens column.":"f50a2bbc7d75",
"Add the ones, then add the tens.":"56f3c22c18da",
"Add the ones, then the tens, then the hundreds.":"54328c1aad02",
"Add the tens.":"fd0f2586c7cf",
"Add the tops.":"d052855ac824",
"Add them up!":"d4b8a567a231",
"Add these in symbols only.":"16871fd5b950",
"Add these loads.":"0846bdc41987",
"Add these.":"bb6bd0ec9377",
"Add to find the total parts.":"27f368479b30",
"Add what each coin is worth, not how many coins.":"2c54f9d00150",
"Add what each one is worth.":"3e14a043f3ce",
"Adding a negative number moves left too.":"9ca7eae3c139",
"After x, s, sh or ch, we add e and s.":"2842fbe62ef0",
"Am I right?":"c8bfcacf1871",
"An opposite is as different as it can be.":"c0ad431fc9d2",
"And you still know it!":"8f971cdef1d9",
"Another one.":"a74679d8db81",
"Another ship sails soon.":"fab06f07f6e8",
"Answer each question!":"2c93a4e7c8bf",
"Any guess is fine.":"cd05193d3b39",
"Any guess works.":"7151c4526715",
"Any way is fine!":"cdc0aa41f83d",
"Any way works.":"4b61d453a39a",
"Any way you like!":"d40d3f1997f3",
"Are there enough ones?":"f75645e4a7ca",
"Area counts the squares inside.":"da8353262d79",
"Asking ends with a question mark.":"57821a505415",
"Asking ends with a question mark. Telling ends with a period.":"ed38036d4438",
"Ba, na, na.":"ea85f691104b",
"Back means smaller numbers. Count down.":"808a7ab39825",
"Big letters have names.":"09dec9afbad3",
"Bigger or smaller unit?":"78a6db971bc9",
"Biggest coins first.":"3b3d46b469c2",
"Both bars are cut the same now.":"ed5311152eee",
"Both letters make one sound together.":"9ec459513c10",
"Both letters of a team go in the word.":"18804d6c5549",
"Both letters of the blend go in the word.":"223b4f555ffa",
"Both letters of the team go in.":"38da8b02bdb0",
"Both numbers are on the chart.":"396ae7019dc1",
"Both vowels of a team go in the word.":"f11b233a5688",
"Brackets first, then powers, then the rest in order.":"595d612a67a0",
"Break a hundred or a ten if you need to.":"3f3603a7f351",
"Break a ten if you need to.":"6bae36fe1aef",
"Break a ten if you need.":"6c5edfce007d",
"Break a ten into ten ones.":"bc3fa8635680",
"Break a whole into parts.":"c3f77542eeb0",
"Break when you need to.":"86d7fb4bcfc5",
"Build a box for the crystals.":"937f1360ea4d",
"Build a word one sound at a time.":"aaa04d16bddc",
"Build each one!":"26f25cf3f00d",
"Build each word I say!":"5620d6ccbf71",
"Build each word for me!":"ce649c3580f1",
"Build each word!":"592121e0dc2a",
"Build every group then trade.":"65cc69ed34c8",
"Build it on the frame.":"3d76c73f536a",
"Build it out one column at a time.":"1663020f761b",
"Build it with me.":"86df4922bb96",
"Build it with the tiles any way you think.":"558acb8f5377",
"Build its first sound with me.":"7328ceeb7876",
"Build the answer with the bars.":"c911e312180a",
"Build the bar: the boxes, then what is in each.":"c446ee897014",
"Build the boxes of x first.":"93121b84b238",
"Build the groups and trade.":"18547db38b9d",
"Build the last sound with me.":"4dff0cdbe939",
"Build the middle letter with me.":"f5af20dfcab7",
"Build the word with me.":"24164d67ae9a",
"Build them with blocks.":"6ba80336df9d",
"Build this bar.":"8b6b31ab8913",
"Can you do it?":"7b84af735e2c",
"Can you fix it?":"278bce0f4b11",
"Candy Canyon needs signs.":"d33e7d39121f",
"Carry the ten to the next column.":"bede52cf9fa9",
"Carry the ten.":"750b8b78c466",
"Carry!":"f8f1423cfc4f",
"Catch my slip next time to earn game time.":"4584b0bea881",
"Change is what is left of a dollar after the price.":"53e719017479",
"Check me!":"3aad6d33e964",
"Check my work.":"7ea400a44a0f",
"Check the sides, then the corners.":"e4a4daf13c88",
"Check the start and the end.":"6c72c8161f51",
"Check what each line or picture stands for.":"7350b2c1da34",
"Check which one it asks for before you start.":"0e6ea9ea2d99",
"Clap and pick the right one!":"26058514915a",
"Clap each part.":"748a67d33dad",
"Clap each word!":"67d94718f196",
"Clap each word.":"78cb83528b4c",
"Clap each word. One clap or two?":"6995fc11b50e",
"Clap once for each part you say.":"24f0d21733c9",
"Clap once for each part.":"6ca0351c93a7",
"Clap with me!":"fd2fe47155be",
"Clean.":"9c1d0a60fcc3",
"Cold days and deep dives sit below zero.":"97fdc6964933",
"Compare how much of the same whole is shaded.":"cb9220065bce",
"Compare it with a square corner.":"6569998a1466",
"Compare the ones first then the tenths then the hundredths.":"4a6d309451cf",
"Compare these two.":"1fe342d60d78",
"Convert these.":"2bd5493100a3",
"Convert this.":"969bb9541e5d",
"Correct.":"461c2db4a4cc",
"Count all the shaded parts.":"3cac1dabaac6",
"Count by tens, or by hundreds.":"e4cad72b9ca9",
"Count by the marks in your head.":"8ccf24cac9e8",
"Count by the marks to make it show the amount.":"e485be42c0db",
"Count by the scale as you go.":"c10cf67a0f22",
"Count by the scale, not by the squares.":"dc6ff4932d28",
"Count by what each is worth.":"3e1810f7b0bd",
"Count each one in the picture.":"f15871bcf5e3",
"Count each one in the row.":"92b34419aee7",
"Count each one once. Touch it as you count.":"d0ed5405ab0f",
"Count each one.":"61cf22611a78",
"Count from the start to the next hour, then on.":"6fbe652053fe",
"Count from zero along the axis to read it.":"0b8b1579f979",
"Count how many groups fit.":"d5fa98ab8c23",
"Count on from one part to the whole.":"082f5a4e3a7a",
"Count on from the nearest label to read the dot.":"54f1f17d5a37",
"Count the claps.":"a296e6ab69d1",
"Count the dollar first.":"d8b4c049b36b",
"Count the dots.":"dc3c191195bb",
"Count the flats, the rods, then the cubes.":"7b931d90819d",
"Count the lines on this one.":"674c348a0758",
"Count the long hand by fives to the last number then on by ones.":"f34ec782985f",
"Count the minutes.":"09b8da6ae526",
"Count the ones where the halves match.":"0eed25440edb",
"Count the ones, then the tens.":"1a6837856b5a",
"Count the pieces in the picture.":"0a71d1a56726",
"Count the pieces.":"331308980206",
"Count the rods or the flats.":"dcf4803d9c9b",
"Count the squares inside this one.":"b890936479a7",
"Count the squares, or the cubes, layer by layer.":"54cd2e075e72",
"Count the steps of the hop.":"5518f51b6ee4",
"Count up from there.":"fda9f93b0ee9",
"Count up to a dollar.":"e740f73fed9d",
"Count up to the hour first.":"5f6e62c4ad84",
"Count up to the next hour, then on from it.":"8536398e1c36",
"Count your claps.":"c1e89e5474cc",
"Crack both.":"430aeb47ecaf",
"Cut every bar into the parts the problem names.":"7271453e6bc5",
"Divide as if there were no point.":"2d4c3346d5f5",
"Divide by the bottom, then multiply by the top.":"fcb4e90a88ca",
"Divide this one.":"e2ad7d5e6f57",
"Divide, then think about the leftovers.":"ed48ee502f6e",
"Dividing by a fraction asks how many of it fit.":"de22cc33503f",
"Dividing by a unit fraction counts the pieces that fit.":"376507819179",
"Dividing finds how many rows or how many in each row.":"8cec100e5efd",
"Do both steps.":"72d64d50229b",
"Do it in your head.":"ab952bf0f266",
"Do not forget the carried ten.":"ba91f0f82cc5",
"Do not forget the quiet letters.":"90a2ff50ef74",
"Do not go by size alone.":"61d3882adc41",
"Do the first step, then the next.":"91a8f40364bd",
"Do you remember this?":"196eb8f68e13",
"Does it rhyme?":"4e05def68a72",
"Done.":"ec91bf114d76",
"Each box is ten percent.":"9e857eb5db31",
"Each coin has a value. Add the values.":"9f7613da260c",
"Each digit's place tells what it is worth.":"3d3aa00cf220",
"Each dot stands for one length.":"2e76ecb73127",
"Each one folds it into halves that match.":"e52fcb4e5754",
"Each part has its own product.":"7fa8e1a292ae",
"Each part of the story tells us something.":"ff8312258c98",
"Each part times each part then add them.":"14bb551daecd",
"Each place is worth ten times the place to its right.":"4629ab5d474a",
"Each thing gets one number.":"95a3c1a17788",
"Enough parts make a whole.":"2270140375d0",
"Equal boxes make a times story.":"c9b3d4bc7c01",
"Equal groups have the same number in each group.":"2f385b30e62b",
"Every column follows one rule.":"3b9e9a71a690",
"Every full bar is one whole.":"fa0a033d06b1",
"Every letter has its own place in the ABC.":"0a2cd396b8e8",
"Every number has its own shape.":"8b511abae9d3",
"Every sound you hear got its letter.":"d676bafb1987",
"Exactly.":"0453c73285c4",
"Factor: the biggest group size.":"217f3cf63930",
"Factors divide in; multiples come from counting up.":"a5fd5eeb318f",
"Fair.":"8995da66c226",
"Fill a ten first.":"9c966471531c",
"Fill the double frame.":"e1397f452a1d",
"Fill the frame any way you like!":"ec49836712c0",
"Fill the frame with any counters you like.":"c23a513f6eeb",
"Fill the frame with blue and orange.":"f7edf25b0cc2",
"Fill the frame with counters.":"da407ac58966",
"Fill the purse with any coins you like from the tray.":"7653aeb2a74e",
"Fill the top ten first.":"7fa9118a74c6",
"Fill this double frame.":"720a83de2d9f",
"Fill this frame with both colors.":"ce0e68826441",
"Fill your coin purse.":"ab2e4595aaee",
"Fill your purse with any coins you like.":"848c48597036",
"Find a picture that ends with it.":"3a5db22ae9ed",
"Find a picture that starts with it.":"d88c45bc9c88",
"Find a picture with it in the middle.":"b91e846e368d",
"Find each amount.":"9e76e3a8a36a",
"Find each area.":"812c216187a3",
"Find each as a fraction.":"a915c2199df5",
"Find each big letter!":"fdce36949c13",
"Find each little letter!":"80c8a22fd79d",
"Find each little partner!":"01c27e3665e1",
"Find each opposite!":"c63af3650535",
"Find each rhyme!":"0cb931af7056",
"Find each word I say!":"9e9fca21f6fe",
"Find each word that means the same!":"88e90ca0d962",
"Find each word!":"43fec608d6e9",
"Find how B is made from A.":"135b0ef889e6",
"Find its big partner.":"f6c7da63f02b",
"Find its little partner.":"97ff20b0dd29",
"Find its middle letter.":"8633b8eed576",
"Find my mistake next time to earn game time.":"83454918974c",
"Find my mistake!":"15ac6d9570ac",
"Find my slip.":"616809963310",
"Find one part, then the parts asked for.":"aed8ae8374cc",
"Find one tenth first, then take as many tenths as the percent says.":"6f62a9ded75e",
"Find that part of the story. Listen again.":"427dc64d4238",
"Find the dots on that mark.":"60c0de7a6bf2",
"Find the error next time to earn game time.":"913d9f9109fe",
"Find the error.":"abe3d774b6dc",
"Find the missing number.":"43fb67ea5c7d",
"Find the one I ask for.":"481f4b6b275b",
"Find the one that does not match the rest.":"b9a27d555453",
"Find the place of the digit.":"bf340214ce88",
"Find the product of each part then add them.":"48ab18f7b773",
"Find the rate for one first, then scale up.":"d5e7abab27b2",
"Find the right shape for the door in Tiny Town.":"b98ce2f2b4b2",
"Find the rule across, then use it on the new A.":"bdf026aca397",
"Find the rule first.":"a5062a2f43e6",
"Find the rule from A to B, then use it.":"dec9b1d4ec1a",
"Find the step that is off.":"e54af7e51e53",
"Find the total.":"064e3e052674",
"Find the volume.":"812ef18ce744",
"Find the zero on the side the angle starts.":"be5991267157",
"Find the zero on the starting side.":"efe7ad33937d",
"Find them.":"1aa34b2aa46e",
"Find this total.":"348c2b429476",
"Find what one box is worth, then add up the shaded part.":"c2a25788cfc5",
"Find what one mark is worth, then count by it.":"5b16b5cbae62",
"Find what one mark is worth.":"1ed30fa09b9b",
"Fine.":"68ab832e2baf",
"First break it into parts and multiply each part.":"154534727dca",
"First divide the digits without the point.":"04c0717d1048",
"First find the tens it sits between.":"2a403dbc03d1",
"First multiply the same digits without the points.":"8f395f898e86",
"First take off the extra part, then share by the boxes.":"cad2f5f2521e",
"First the equal boxes, then the extra box.":"ce32a95ceef7",
"First work out the times part.":"5f63536d0593",
"First, build the equal boxes of the story.":"e8170affc6aa",
"First, show me what you already know.":"85ac8eb9b335",
"First, show me what you know.":"8df3f569f1ce",
"Fix it for me?":"1e6717d4a238",
"Fix it with me: a capital, then the end mark.":"1b14ebf45ab6",
"Fix it.":"82079f13863f",
"Fix it: tap for a capital, then tap an end mark.":"ab6d9b3ea0d8",
"Fixed.":"ec6bd5fc4f2a",
"Flats, rods, then cubes.":"21bacc7a1e67",
"Fold it in your mind along each line.":"08b183e1b1b5",
"For a total, add the lengths, not the dots.":"adde4a0cea31",
"Game time earned.":"293f3be49241",
"Give me a hard one.":"50aeb1291127",
"Give me a problem to solve.":"39a4b75f4efb",
"Give me a problem!":"18a995fe5f80",
"Go across first, then up.":"50b1c67a0819",
"Go back to ten first.":"75005ca94707",
"Going back to feet, divide.":"1fc91fa52495",
"Good catch.":"da25991b1d62",
"Great learning today!":"9091e8bd5fd0",
"Guess which ones will grow bigger.":"ca6f5b7b7e14",
"Guess which ones will melt in the hot sun.":"ac2d35ad52d7",
"Guess, multiply back, then check what is left.":"f6e9209f804c",
"Guess: will it float or sink?":"9f8142266f8c",
"Half past: the long hand points straight down.":"f892386c907d",
"Half the perimeter is one long side and one short side.":"28316cad8ee2",
"Halfway goes up.":"bfc3e47474b4",
"Halfway rounds up.":"483678a56a1e",
"Hear the letter name.":"65cabca9db83",
"Hear the number.":"1dcceb9bcf37",
"Heavy for its size sinks.":"caebda8b4880",
"Help in the shop.":"48bde616d073",
"Help me label the rooms and things.":"ea87716afa81",
"Help me.":"83301e786fb1",
"Help set the tables.":"ee5463ff2fdb",
"Help the park ranger plan for a hot sunny day.":"e55960c611ba",
"Here are a square, a rectangle and a rhombus.":"edca84b2d97a",
"Here is a letter.":"a8a2d5b99b1b",
"Here is a picture of the blocks.":"8e67bf4daee4",
"Here is a picture to help.":"8aa6dfcb99b5",
"Here is a side and the distance around.":"5106db54c205",
"Here is one layer of a box and how many layers.":"8f78487ef5aa",
"Here is one more for the rangers.":"14d6941640b9",
"Here is the line.":"594237203f73",
"Here is the problem in symbols only.":"dc57c8bc2657",
"Here is the same as a sum with a box.":"df09589a9214",
"Here is today's idea.":"833eb0afc3fa",
"Here they are in columns.":"8aec27f04cd5",
"Hooray!":"dd634f17d21d",
"Hop from zero to the number.":"448b0d0c95a6",
"How long is each row?":"e6dd8af6cb69",
"How long is the missing side?":"9fef2c29a1a5",
"How long was it?":"9f1102cf24cf",
"How many are left?":"1fb548dc2235",
"How many bags?":"deeb3687a2f0",
"How many cents?":"9944ae407a72",
"How many cubes fill it?":"1188d3706c25",
"How many cubes fit?":"9b535c13e28e",
"How many cubes?":"697758fb4a10",
"How many dots fill each row?":"1eaf2a13e0b2",
"How many dots? Tap the number.":"b5f3f20168f9",
"How many fit?":"be50c20c15fe",
"How many flags?":"0b141ec63e78",
"How many for this one?":"0c454fea3095",
"How many groups?":"c9e391a90639",
"How many in all in this picture?":"ec778802bafb",
"How many in all on this picture?":"9cbdcebc9f73",
"How many in all?":"031d57f3a4da",
"How many in each bag?":"9f70df24d50c",
"How many in each group?":"3471673e58ee",
"How many in each?":"b791df3126db",
"How many more?":"0e8e25d0ab2a",
"How many parts are shaded now?":"940f9b596c76",
"How many piles?":"96dcb303d98d",
"How many plants?":"8562efc2dc6b",
"How many rocks?":"68f2d4e42a5d",
"How many rows?":"bc17abe4b198",
"How many small units?":"0adb766c00fe",
"How many toys?":"a892c9ae2083",
"How many?":"2ab7650c0c2d",
"How much does each get?":"43f43ed2aa4f",
"How much in all?":"48de30edd792",
"How much now?":"9b3903cf8236",
"How much?":"d93970daba6c",
"Hundreds first.":"149c41f6e462",
"I got that wrong.":"1c77c1135936",
"I made a mistake!":"72cda9b48553",
"I slipped there.":"91d560903394",
"I slipped.":"1888670f08fb",
"I was right this time!":"35b2e7ae38dd",
"Ice in the sun melts first.":"8cae0ef5695c",
"Ice melts when it warms up. A rock stays a rock.":"ce28eef7e7e8",
"If x is cut into boxes, multiply to find the whole.":"e94e15986dd8",
"In a blend we hear both letters.":"5fae4deb9d3d",
"In the factory we need parts.":"9e1ee596215b",
"Is it something frozen?":"499fe22fdca1",
"Is it up or down?":"38d0ad3b22a3",
"Is this number prime or composite?":"fe6ad6ae0f1b",
"Is x one box or the whole bar?":"d82ada324988",
"It counts up one unit at a time.":"cceec73a0a40",
"It has equal sides like a rhombus.":"2e0c136a634b",
"It has the most!":"ec1df75f544a",
"It is different!":"4d3591f9bf40",
"It never means the base times that number.":"c0ea87217f68",
"It starts on the right, so we count from the zero there.":"49aa72ce219e",
"Just use the rule.":"18b876c3e3d3",
"Learn them together.":"781df865b7d8",
"Left of zero is negative, and further left is always less.":"223e2739bcdf",
"Leftovers break into the next place.":"9e31f64c25be",
"Less than that is acute.":"2c16b1b85a53",
"Let me help.":"b163316301ce",
"Let me try!":"807d4585fcd1",
"Let me work it out.":"6f0aab91b67e",
"Let's add these on the chart.":"28eb2c6e1704",
"Let's build every group.":"3d3e5f989f83",
"Let's count up by the small unit size.":"550f29d49016",
"Let's fill the missing spot in this row.":"6a5d3b68af02",
"Let's learn it together!":"8a649386b85e",
"Let's learn together and fill our notebook!":"ad8277b1c44d",
"Let's learn together.":"83b5f76ddc12",
"Let's look at it together.":"993efe70e1b6",
"Let's play first.":"db8c12689502",
"Let's put little letters under their big partners.":"0200316fc3ae",
"Let's sort the pictures by the first sound of each word.":"f1171f682e79",
"Let's sort the pictures.":"313f557ec80d",
"Light for its size floats.":"7fc3082de1af",
"Light or heavy for its size?":"ef76da692f8d",
"Line up the places.":"aafb0fe626a3",
"Line up the points first.":"b5ef34f0f981",
"Line up the points.":"525a396b2560",
"Listen for the last sound!":"ff48c7b244a6",
"Listen for the middle sound.":"09b3e12e6b10",
"Listen to each sound.":"8afab055f010",
"Listen to every part.":"639ecb811647",
"Listen to the facts and pick the name.":"c691bf3a020f",
"Listen to the first sound of each word.":"0b9bcacf756c",
"Listen to the first sound of each.":"a5af86a60ea4",
"Listen to the last sound of each word.":"d1d18ee6785e",
"Listen to the last sound.":"413c0988b32f",
"Listen to the little word. Is it el or la?":"cb503c35f6f3",
"Listen to the middle sound.":"88effcc1375f",
"Listen to the start.":"3181077fa3ed",
"Listen to the story, then build its bar model.":"93a212135d7d",
"Listen to the story.":"88d647dffbe7",
"Listen to the very first sound.":"6be7000d4d7f",
"Listen to the vowel.":"d361ecb90746",
"Listen to the whole word again.":"45e6dc4374b6",
"Listen to the whole word.":"7ea546716c6f",
"Listen to the word.":"15d221b05cfa",
"Listen, then look at every letter.":"ccc99236e41a",
"Listen, then read the words to answer.":"4ec6747761f9",
"Listen.":"b28091f85ca2",
"Listen: they sound the same at the end.":"71906c444b3f",
"Little letters have the same names as big ones.":"1cf32931a0ea",
"Living things grow.":"657641417abd",
"Long division now.":"c1d10e43b64e",
"Long hand for minutes.":"e2b67fc58805",
"Look across each row.":"69f2f0523f35",
"Look again.":"9393e169225e",
"Look again. I made a mistake!":"ea7ea5ddf724",
"Look at all of them first.":"30aeca670f2b",
"Look at both plates.":"58f3a40b30bf",
"Look at both.":"d7223dc627de",
"Look at every letter, not just the first one.":"095015a6677e",
"Look at every plate.":"ac3a75ee0ad7",
"Look at the ABC strip.":"d7ad06e42999",
"Look at the bars.":"bc00731c29cc",
"Look at the blocks.":"b86012d8d0bf",
"Look at the frame.":"210c34c4d3be",
"Look at the hundreds first to see which is bigger.":"1e106736c034",
"Look at the letter in the middle.":"4e9d783bbcfe",
"Look at the letter.":"933a81cd865a",
"Look at the long hand.":"997ff5de8788",
"Look at the money.":"be1495fa21aa",
"Look at the ones.":"f5903fd5f950",
"Look at the pattern.":"d6dfc6b25a32",
"Look at the picture of the blocks.":"68d2aa9cab88",
"Look at the picture.":"0544fce4fbbd",
"Look at the pictures as you listen.":"dc711bb3c630",
"Look at the short hand.":"22f52aac7cf3",
"Look at the sides and corners.":"dc1cb3a42d94",
"Look at the sign. Are we adding or taking away?":"08e9a499fb8e",
"Look at the tens first to see which is bigger.":"e068bfc73fce",
"Look at these shapes.":"8cb8caab5365",
"Look at these two.":"7206a0ec4ca1",
"Look at these.":"216112c31385",
"Look at this chart.":"6396ee175a99",
"Look at this clock.":"df3b32f89217",
"Look at this picture of the box.":"f26439b67627",
"Look at this picture.":"b1879661082e",
"Look at your clock.":"e105fdf0ddc3",
"Look closely.":"0cbc2a755753",
"Look closely. Which way does it face?":"69934b660500",
"Look closer.":"53b5d8dc7a13",
"Look for a ten, then add the last number.":"278332bac5b8",
"Look for a ten.":"13de42b0de50",
"Look for the number on both lists.":"b05ba025f6ad",
"Look how tall each one is.":"da737318e5aa",
"Look where the long hand points.":"757d04bc75e0",
"Look!":"33c159295cf1",
"Look! Let me help.":"0d8da60f2611",
"Looks like you know this.":"f3265d019b2e",
"Make a new pile for each ten.":"4c0439d6d2a1",
"Make a number bigger than this one.":"2139c59dd595",
"Make a ten first, or use a double.":"630811e2f037",
"Make a ten in your head.":"d45d01e31bf0",
"Make a ten to add bigger facts.":"d6039ac326d8",
"Make any equal groups you like with the dots.":"59b83fd59bf3",
"Make any equal groups you like.":"5035f33d5f6a",
"Make any number you like with the blocks.":"e497d03151d4",
"Make any number you like!":"21ec83a6a58b",
"Make any number you like.":"5c6726e66fe7",
"Make any rows of dots you like.":"fab16533c076",
"Make any time you like.":"a215970fd41e",
"Make equal groups any way you like.":"a0c1731f887b",
"Make one more angle for the gate.":"ac68b8beaccd",
"Make the bottoms the same first then add the tops.":"e0fe73f3ca04",
"Make the groups the story needs.":"8d34c4f1abb2",
"Make this one.":"61e95d469a79",
"Mark groups until the shaded part is covered.":"a18a70aff7a1",
"Match each dot.":"3b3ec4694596",
"Match each word to its opposite.":"6c45fe5118ea",
"Match each word to one that means the same.":"5c550ce582b7",
"Match them up, one and one.":"54f9661041c8",
"Match them up.":"6af63efd6693",
"Match them up. More has some left over.":"265d8884c78a",
"Mean: add and share.":"9ffd1f81013c",
"Median: order, then the middle.":"7cb6f4980877",
"More digits does not mean bigger.":"7754340cbc32",
"More is obtuse.":"fea1060934f1",
"More parts means smaller pieces.":"110c7a08cabb",
"More than one? It needs an ending.":"50de882bbbaa",
"Most are the same.":"06e0955d27ed",
"Most words just add s.":"2abd2bfc6166",
"Move the hands on this clock.":"16d60b6885de",
"Move the hands to show any time you like.":"0fa2711cdab4",
"Move the hands.":"af62c8b691f4",
"Move the line until the extra blocks fill the gaps.":"b9047804aac0",
"Move the long hand forward.":"3a080db8ac61",
"Moving is not the same as growing. Living things grow.":"d1b16946b7ae",
"Multiple: hop until they meet.":"3f65f22c8646",
"Multiply as if there were no points.":"bbf4cffb5a8a",
"Multiply each place then trade ten for one of the next.":"49101be7741b",
"Multiply each place then trade ten of a place for one of the next.":"1d7180646811",
"Multiply the top and bottom by the same number and the fraction stays the same.":"2f1cd65ea634",
"My turn.":"c12cf5d35c5c",
"My turn. Check me!":"0b86cf7ebeae",
"Nailed it.":"f3bc72212cb1",
"Name each fraction you see.":"85b631f9de13",
"Name this fraction.":"f90e6306f7db",
"New idea today.":"48606a8b3bf3",
"Next put the point into the answer.":"53460feaf0b8",
"Nice work.":"fc37e79a19f0",
"Nice.":"f3702d656a24",
"No bar now.":"e8a0fc96f944",
"No clocks this time.":"1515cc812e96",
"No graph this time.":"6b8f43a06c02",
"No grid now.":"afe82a156706",
"No help now.":"94985e20d55e",
"No more ones?":"a6c8e76abb40",
"No picture now.":"75b7ed12fec0",
"No picture this time.":"33145679748f",
"No plot now.":"c625363d6c2c",
"No problem.":"0b2fc0127728",
"No protractor now.":"6abca2082c0b",
"No table now.":"4be238f894b1",
"No table this time.":"69494ba7ae7b",
"Not enough parts?":"bdcd5b1f702e",
"Now a few with me.":"6c98b549a1e8",
"Now add these big loads.":"063a9fc49316",
"Now add these in columns.":"64c887f5a4bd",
"Now add these written in a row.":"9849198371d3",
"Now build the reason.":"0cdb08be7852",
"Now do it with the symbols only.":"634ddfd4d5a7",
"Now find each part then add them all.":"02ccdf8b9e54",
"Now find it on the number line.":"fed9a25f1ed1",
"Now in columns with the points lined up.":"46549ae3e77e",
"Now just the numbers.":"ea83f0e40bd7",
"Now just the symbols.":"a68a6954473d",
"Now let's compare on the number line.":"61ab560b4ae7",
"Now let's compare these.":"ee654439e35b",
"Now let's compare with the place value chart.":"add8e026a0de",
"Now let's do some together.":"1013b9679933",
"Now look at the blocks and type what it makes.":"12ecc19fae06",
"Now look at the picture and type what you get.":"c2fe537b1317",
"Now look at the picture.":"793689f67204",
"Now pick the reason.":"a69749d629ce",
"Now put the point in the answer.":"1aa246502c40",
"Now shade these fractions on the bars.":"b16e3c316619",
"Now share a new number into a new number of boxes.":"e15564a72fa8",
"Now slide the pin to the nearer hundred.":"657dc9017fcf",
"Now slide the pin to the nearer ten.":"88299c19c6da",
"Now tell me why.":"ba7b4e1ec1a1",
"Now the fact in symbols only.":"0b9855387726",
"Now the full problem with the times marked.":"074d8f4d5e3c",
"Now the problem in a row.":"29a0ffabae43",
"Now the problem in symbols only.":"6da3d8d6b823",
"Now the reason, in words.":"649ef380dfee",
"Now the same told in words only.":"97243aadfd0c",
"Now the symbols only.":"815bca59a112",
"Now try it in columns.":"6ba214e06b93",
"Now try it with symbols only.":"17dec6491746",
"Now try it with the columns.":"b37bb9d0b4fb",
"Now try the problem in symbols only.":"f895d7556204",
"Now try the symbols.":"ebd72bd977a7",
"Now try this one with symbols only.":"391ae955e90a",
"Now type this length as a decimal for the map.":"2d618b6e3f8e",
"Now we take away in a row.":"7706e25ab0f1",
"Now we take away in columns.":"4bd847708a61",
"Now write the division in symbols only.":"8c166cc67edb",
"Now write the division.":"74033418116e",
"Now write the fraction for the shaded part.":"7688ff56343e",
"Now write the fraction these words tell.":"4e8880d1417a",
"One big unit is this many small units.":"6f0e467f7874",
"One box for each item.":"6ac70aee3361",
"One is different.":"19f4203ef1a4",
"One more angle for the carpenter.":"8d1ce762be2d",
"One more batch to share.":"0a73de92c383",
"One more box story for the crew.":"5b34d053fa08",
"One more crate count.":"47e405c888bc",
"One more for the bridge.":"5d505d88e95d",
"One more for the cave crew.":"cf73b508237a",
"One more for the cutters.":"6eca5db02997",
"One more for the map.":"ce1b3fec8667",
"One more for the notes.":"e9a0e06db782",
"One more job for the station.":"3d698b063a7a",
"One more job.":"bfd1481be34b",
"One more load comes off.":"3af9b1dacd8e",
"One more load for the ship.":"6e4a49a415ec",
"One more load of sand.":"e626f6904fcf",
"One more order.":"e74a59a25a94",
"One more pattern for the lights.":"3b2d921ea29c",
"One more point for the map.":"656c9a680f42",
"One more reading for the bakery.":"ef3bc431678f",
"One more shape for the gate.":"061e669576dd",
"One more sign to check.":"abc638596491",
"One more story for the camel train.":"3f7c33efa5b5",
"One more story for the store.":"b681eb669b65",
"One more story for the team.":"c829b79761ec",
"One more table for the market.":"6c5555d6a862",
"One more time for the fox family.":"04445e85a530",
"One more to mark on the map.":"c43f15c9e0e0",
"One more total for the crew.":"321384bb386f",
"One more with the model.":"dce0d70b2586",
"One more, together!":"8487acd6f039",
"One more, with the picture.":"ee339102115f",
"One more.":"40131f6c099c",
"One more. Find my mistake!":"ba4ccd1d6981",
"One number for each thing.":"ebfd99ca11ee",
"One tenth first, then scale.":"b57d7748299a",
"Ones first.":"b6cadbd1169e",
"Only one digit fits in each place.":"d0043afd78fd",
"Open the angle to the number.":"a02ee39840a7",
"Open the angle until it is the kind I name.":"76add7025471",
"Opposite sides match.":"e4c43a74e8c9",
"Part of a part: multiply the tops and multiply the bottoms.":"3d999c5ae2c1",
"Parts first, then wholes.":"b8470d81314b",
"Percent story: shade the bar.":"17c1640a936c",
"Perimeter is the distance around.":"68645d59b824",
"Pick its time.":"e69687930c0e",
"Pick the best name.":"f294d6f9a340",
"Pick the one written right!":"14fa2f22974e",
"Pick the right words.":"f8679ddfba3f",
"Pick the word for more than one!":"be6146b604ac",
"Picture both on the line.":"5e26a5e558d6",
"Picture each fold.":"2661d85a5313",
"Picture it first.":"72c4a8c61fd0",
"Picture it, then multiply.":"5d2e25fdbe42",
"Picture the grid: which way does each sign point?":"e8196971a686",
"Picture the line.":"899da6c387cb",
"Picture the line: which way, and how far?":"fabe14dd7806",
"Picture the moves.":"176f1333e3d9",
"Picture the pieces.":"e97cce743908",
"Picture the shape and fold it in your mind.":"9f9b4f5c599c",
"Picture the shape in its rectangle first.":"ffb6d2f3776a",
"Picture the story first, then pick the operation.":"510b1ec8322a",
"Picture the story: equal groups make a rate, tenths make a percent.":"01c62d5bbcc2",
"Place it.":"d5bf126a0c02",
"Place the point.":"46b4a47bfd9a",
"Plants are alive. They grow, even if they stay still.":"0f9703cef5b6",
"Prove it!":"12cf379ac106",
"Put any coins you like in the purse.":"9f47cc53b9f3",
"Put each little letter with its big partner.":"9d452d2903ca",
"Put each one with its blend pattern.":"7c46757f6dd5",
"Put each one with its letter team.":"8d447c72737a",
"Put each one with its vowel team.":"d3ae4609c0c0",
"Put each picture with its group.":"c0044e685fa6",
"Put each shape with its group.":"beed818999a4",
"Put each with its blend.":"08ad3d5b7cab",
"Put each with its letter pattern.":"291372598a08",
"Put each with its pattern.":"fc33b7bc756b",
"Put in a rod, or take one away.":"216a91dcb088",
"Put in as many counters as you like!":"5ba64b76e358",
"Put in every group then trade.":"0b27113e6ca3",
"Put in more counters than the dots.":"f8147cf0f247",
"Put in some blue and some orange. Any way you like!":"a3429335b790",
"Put one dot on the line plot for each length.":"96b9c6e01917",
"Put the animals together and the food together.":"27b3c37bae49",
"Put the big ones together and the small ones together.":"b1b045bc6177",
"Put the letters in ABC order. Sing it with me!":"bbf5a2172fcc",
"Put the number in for x.":"844773264d01",
"Put the parts together into one number.":"c22159d46d50",
"Put the words in order.":"691f3fbf52f9",
"Put them in the frame!":"330a6a99841c",
"Put them in the frame.":"675c8501ff45",
"Put them together!":"c6fb137c3136",
"Put them together.":"ed382f8d6e64",
"Put these letters in ABC order on the sand.":"8edb83ebaa77",
"Quarters first.":"125c636b2193",
"Quick one first, then we build!":"43d7a99d3217",
"Quick one from before.":"803d67f79918",
"Quick warm-up first.":"11b26a1e7b3f",
"Read across first, then up.":"a5d881747f8d",
"Read and find each rhyme!":"5f2470dbffec",
"Read each one out loud.":"9b7a04225cb1",
"Read each one!":"905daf2d2fe9",
"Read each sentence!":"e0a5659af485",
"Read each word, then the whole sentence.":"6f86ecabe510",
"Read it out loud.":"23321ceee569",
"Read it out loud. Does it sound right?":"84e6c41f60a6",
"Read it.":"5b192dc3e6cc",
"Read it. Then tap the picture that matches.":"e4eaa0facb7a",
"Read one word at a time.":"a7d53a97a66c",
"Read the first word.":"eb258f9cc025",
"Read the graph.":"58c3bdc5d852",
"Read the sentence.":"2198838de2ba",
"Read the word.":"ded3b64ce952",
"Read the word. Then tap its picture.":"a0d569f71d42",
"Read the words.":"c52c1aba982f",
"Read these points off the star map.":"5cd96ffe6544",
"Read this one.":"258fff093865",
"Ready for a quick challenge?":"ac84b557cacb",
"Ready when you are.":"240374108375",
"Remember this one?":"4fe62611b819",
"Remember, moving is not the same as growing.":"f3c59feff7d3",
"Rename a fraction out of a hundred; then the top is the percent.":"5be8a4be0ad5",
"Rename it out of a hundred, then read the top.":"94f0056f4722",
"Rename the first fraction to match the bottom bar.":"d8c265942140",
"Rename to same size parts, then divide the tops.":"403ee645e8e7",
"Rhyme, or no rhyme?":"42221fb67507",
"Right is adding, left is taking away.":"4a9471aa8273",
"Right on.":"0b4fd0dc6543",
"Room left?":"73559b59f4be",
"Round this one.":"87f1afc3bcba",
"Rows go across.":"00b7e0cac205",
"Rows of the same size make an array.":"3eaa92c91f54",
"Rows times how many in each row.":"92d1878b789c",
"Same idea: guess, multiply back, check.":"fe12673d749a",
"Same means it says almost the same thing.":"c0e31aa1f7b9",
"Same-size parts add like things: add the tops, the bottom stays.":"9284806aee23",
"Say both blend letters as you build.":"4cea1b99676a",
"Say each one quietly.":"dba565663c1c",
"Say each sound as you build.":"a13d71256155",
"Say each sound, then blend them.":"57820f680557",
"Say every letter at the start. Both of them.":"1148b144284f",
"Say it once more, then keep going.":"a3652fcbf423",
"Say it out loud with me.":"8fb2b4e59e39",
"Say it slowly and clap each part.":"1d7794960ab2",
"Say it slowly.":"f040000394af",
"Say it slowly. Listen to the very end.":"c9c3b7458bc7",
"Say it with me!":"e7d92b61f247",
"Say it with me, out loud.":"294d804fae65",
"Say it with me.":"36fd724720ef",
"Say the pattern out loud. What comes next?":"dfe0c5ef8e11",
"Say the pattern.":"07532ca158c4",
"Say the word and clap with me.":"eec5fa8938c9",
"Say the word slowly.":"d33205d546fa",
"See the boxes in your head.":"febf4a2f966c",
"Set any time you like!":"21dabb76f646",
"Set any time you like.":"97215593214f",
"Set the base, then how many times it is used.":"9f9cc047d47e",
"Set the base, then the height straight up.":"5d69d7e1a5ca",
"Set the clock!":"93e6f54a78d0",
"Set the rule from A to B.":"759b44a0245a",
"Set the rule that works on every row.":"18c16cb706a5",
"Set x until both bars are the same length.":"6defe0c73d1d",
"Shade each part.":"9aae991a7cea",
"Shade part of the whole to match this.":"1f48cc4b3479",
"Shade the bottom bar to match the top bar.":"b97a04b1d10f",
"Shade the boxes you need.":"9273684747ea",
"Shade the fraction the story names on the bar.":"0adaf38d66a7",
"Shade the fractions on the bars.":"aed98fec3e63",
"Shade the overlap of these rows and columns.":"efc07965dc97",
"Shade the same amount of the hundred grid.":"4e586b4bf104",
"Share it out.":"2929938c31e5",
"Share the biggest place first.":"a59f019c9e54",
"Share the total by the number of items, then multiply for more items.":"63e0c63e3021",
"Sharing into equal boxes is dividing.":"97fa67d25c83",
"Shells float away from the reef.":"d466f74a1c12",
"Short challenge.":"1617a847a688",
"Short hand first.":"31211f15c93d",
"Show me what you already know.":"3769858383e5",
"Show me what you know.":"711b2c4f0baf",
"Show me!":"2d1e4381b11d",
"Show me.":"0beb5724b76e",
"Show what you know.":"5819cc7f12c3",
"Sing the ABC song. Which letter comes after?":"f3148a317488",
"Sing the ABC song. Which letter comes first?":"2d117fa82bc4",
"Sing them in order with me.":"8740c3a759e3",
"Size does not decide.":"0db6b29516eb",
"Size does not decide. Light for its size floats.":"6ae2115b9c06",
"Skip count equal groups to find how many.":"b26becd0c440",
"Skip count the groups.":"8f08778caef2",
"Skip count the rows.":"bb7f7fc6c1ab",
"Skip count them!":"36be87562dc8",
"Skip count to find how many.":"96b21abdf666",
"Slanted lines can fold a shape too.":"028ebd4e7a49",
"Slide the pin to the nearer round number.":"b021e223b8eb",
"Smaller units need more of them, so multiply.":"169442ed21e9",
"So it is both.":"2e58b2d53cba",
"Solve for x.":"18aca55e5e1f",
"Solve these.":"f276a86244a1",
"Solve this one.":"bf7f9e86cd17",
"Solve this story.":"b78bc95cf9ef",
"Solve this.":"9be11c2a0d47",
"Some letter teams make one new sound.":"58cb4466bf69",
"Some letters we do not hear.":"0643ff557483",
"Some shapes look alike.":"646fba7190bc",
"Some went away. Count only the ones left.":"d3ce54b1bd3a",
"Some words mean almost the same.":"23aed150deef",
"Sort the big ones and the small ones.":"b1613f6b2b33",
"Sort the pictures: add s, or add e s?":"5acc00b2cdaf",
"Sort the pictures: who, what or where?":"93fb757adcec",
"Sort the shapes with me.":"64e62a3cedab",
"Sort the words: naming words and doing words.":"2775bc87d8f6",
"Sort them again.":"a5112c8f870b",
"Sort them with me.":"b5bdc6e748d3",
"Sort these into big ones and small ones.":"032a778d2e0b",
"Sort these out.":"e4f0ba4d4e39",
"Start at the first number, then move the dot.":"b17e1906055d",
"Start at the mark and count the steps in your head.":"9c066e9dcc54",
"Start at zero on the side the angle starts.":"c13608219a5d",
"Start with the capital.":"4dcb64ed5042",
"Still solid.":"3d28b8cf9a95",
"Sunlight warms things up.":"20320b85bd78",
"Sunlight warms things. The shade keeps them cooler.":"050b00452193",
"Symbols only now.":"2ab273d8cc86",
"Take away as many as you like.":"8239244de747",
"Take away in columns: ones, tens, then hundreds.":"ae53aedeedf7",
"Take away in columns: ones, then tens.":"71de2160f922",
"Take away the ones, then take away the tens.":"190cbebd0029",
"Take away the price.":"37db85a6f863",
"Take off the known part, then split the rest.":"4f07624207aa",
"Take some away.":"222cdff9de81",
"Take these away.":"2f120172a021",
"Tap Clap for each part.":"41852b65cd16",
"Tap a little letter, then its big partner.":"b8097402cf41",
"Tap a picture to hear it. Clap it. Then tap its bin.":"b053817ce837",
"Tap a picture to hear it. Then tap its letter.":"c3d2f40a758d",
"Tap a picture to hear it. Then tap where it goes.":"7051b073790d",
"Tap a picture, then tap Big or Small.":"50f426c30dc6",
"Tap a picture, then tap its group.":"6579b0192bdf",
"Tap a shape, then tap its group.":"eef0a9180771",
"Tap each word I say!":"b83d3e8501fb",
"Tap every one that works.":"574eb92147b2",
"Tap every true fact.":"b000f0a08fa5",
"Tap it.":"8401ba6ad343",
"Tap its big letter with me.":"e1d177a9812c",
"Tap its big letter.":"cb33c8f3d6d1",
"Tap its big partner.":"2c9882ed55a8",
"Tap its little partner.":"a506b9adc606",
"Tap that little letter.":"7dba1fb6f79f",
"Tap the big letter you hear.":"6828f7c94bec",
"Tap the letter it starts with.":"a65b3fc2e885",
"Tap the number you hear.":"1667643e79a5",
"Tap the one that is different.":"f921980db228",
"Tap the plate with the most.":"52ea083e68b0",
"Tap the right picture for each letter!":"64b4f8b92381",
"Tap the true facts.":"d12234b80211",
"Tap their number.":"1c913b78f8cc",
"Tap what comes after each.":"829bc87482e2",
"Telling ends with a period.":"7921c9c30a1f",
"Ten more or ten less changes the tens digit.":"12c690c92bca",
"Ten ones make a ten. Carry it over.":"24df29582747",
"Tens first.":"f37d451be927",
"Test a rule on every row.":"89ffd900b9c1",
"That holds up.":"b32d1caaa6db",
"That is a rhyme!":"07d1b7375ab9",
"That one was actually right.":"418f6b766a9f",
"That one was fine.":"f23a9239d959",
"That one was wrong.":"6bf6001868ea",
"That's okay.":"a83cd44ef45e",
"That's okay. Let's learn it together!":"10386f14d0fb",
"The Sky City planners run on rates.":"4f7d22c7f16e",
"The animals are stocking the forest store.":"b479c57d89a3",
"The animals need help in the meadow.":"93c413180cf6",
"The bakery needs its flour and water measured.":"04382baf80be",
"The bar is drawn.":"4b40822b6712",
"The bar model is drawn for you.":"5f651f245fa6",
"The bar model is drawn.":"0001bb7f5d6f",
"The bars match when both sides are equal.":"f4f823878e0e",
"The bars show the parts.":"80300862690c",
"The beach needs signs.":"e491e636993e",
"The bead shop mixes its colors by the ratio.":"eedba8504827",
"The biggest size that splits both is the greatest common factor.":"014967e95acf",
"The boat needs a time to leave.":"f5fee907171a",
"The boat needs flags in rows.":"bda8d8f20835",
"The boat shop gives change too.":"489910a00e72",
"The bottom counts the equal parts.":"f14b6c894a5a",
"The bottom stays the same.":"edc20896a0b5",
"The bridge builders measure rope in different units.":"8517a766f0cf",
"The bridge needs fixing.":"b5f5a918a57c",
"The bus station needs signs.":"0e7f25b3eacb",
"The cable crew measures distances across zero.":"2de584338389",
"The camel train is packing for a trip.":"e6e044065b53",
"The candy shop has a clapping game.":"07da7720f110",
"The candy shop has story time.":"c6ed25699eb5",
"The candy shop needs name tags.":"f72f33b47ae1",
"The candy shop needs rhyme labels.":"ee7bf230cf6a",
"The candy shop needs signs.":"c89d36ccfe43",
"The candy shop needs word signs.":"afd982a95e2e",
"The candy shop packs bags.":"033863258b9d",
"The canyon bridge needs boards.":"a59816bf5570",
"The canyon path needs stones.":"83e173a888fa",
"The canyon shop sells candy.":"85a1287ca64b",
"The canyon trail needs steps.":"1a6a5a2e1348",
"The carpenter needs these angles measured.":"1951587c4626",
"The cave crew is cutting crystal rods.":"a453f8ac73a1",
"The cave lights follow patterns.":"607ba1873996",
"The cave map needs its points named.":"814c2659bfc6",
"The cave team is sharing out supplies.":"d86f6e9d97ca",
"The caves need light of each kind.":"a0b5018dbff2",
"The classroom needs labels.":"e6eb34681558",
"The clock tower needs bells.":"2c78406df01f",
"The clock tower needs flags.":"c9e9ddc32dc2",
"The clothes shop needs price tags.":"09d4556e08bb",
"The core's power cells run on these formulas.":"daad8a34e24d",
"The core's power rods split their charge equally.":"fcb6adab6a4a",
"The crab wakes up soon.":"c8c6e7b31734",
"The crew logged new readings.":"8a338b3b98ef",
"The crystal box needs filling.":"f968432a6953",
"The crystal cutters need to know how many pieces they get.":"356837a145d2",
"The desert gate needs angles of the right kinds.":"884b299977d8",
"The desert market has a price table.":"9f431dc757fa",
"The desert signs must match when folded.":"18d0cf2a0b86",
"The desert trail needs a sign.":"2a3660322192",
"The desert trail needs supplies.":"c13ee3174223",
"The doctor's chart needs labels.":"62c3443def75",
"The e at the end changes the vowel sound.":"53ac8ca2e645",
"The e is quiet, but it helps the vowel say its name.":"d4027be47e3a",
"The factory adds big orders.":"88361cb1bf09",
"The factory counts loads of parts.":"8e66583e0e69",
"The factory needs a part number.":"3a68b23ea3f1",
"The factory needs equal boxes of parts.":"fa71d2378139",
"The factory needs rows of boxes.":"53adad958bea",
"The factory needs to share the new parts into equal boxes.":"56bcb5a5f326",
"The factory orders parts in round numbers.":"e831f36a0596",
"The family album needs labels.":"90acdb2f30ba",
"The first number both count to is the least common multiple.":"6e12dd01006c",
"The first place after the point shows tenths.":"14935760c833",
"The fish eat soon.":"734482da39e5",
"The fish need a time to eat.":"d36a174d00e8",
"The forest clock shows when the animals eat.":"b7b7f4b421a2",
"The fox family timed their walk.":"66cd06bb41ba",
"The garden crew measured their seedlings.":"59313fe50283",
"The garden gate needs the right shapes.":"b9d0b95b67f1",
"The garden needs new grass.":"41dd71e5a3f4",
"The garden needs rhyme labels.":"163c1713b549",
"The gate code is the value of x.":"bc71857f7506",
"The gate needs its codes.":"f7968d9d151d",
"The groups are drawn.":"34b5fa9af0e1",
"The lab is packing samples into crates.":"e9c5a4a0e251",
"The lab needs a reading.":"a50812e046f8",
"The lab needs more mixes.":"84253a1297bb",
"The lab needs some mixes.":"2419970e8550",
"The lab needs some readings.":"da286c05d630",
"The lab needs the reading worked out.":"d234e520a8d3",
"The lab needs these amounts mixed.":"60a2b96d8e79",
"The lab packs trays.":"4d32094e2040",
"The lab shares powder evenly between jars.":"a547357815c3",
"The last letter is only a clue.":"8d3d8db4f67a",
"The last letter is only a clue. Listen for el or la.":"0c8d907d8e54",
"The last number tells how many.":"8403d53f7a9f",
"The lava needs a round number for the next step.":"f4355653275c",
"The letters we do not hear go in too.":"55a390f8eeea",
"The little farm needs signs.":"f7d45facea22",
"The long hand shows the minutes past the hour.":"833ed10332af",
"The map shows the treasure in parts.":"9a5b9873f41f",
"The market needs price tags.":"2125e6663742",
"The meadow gate needs signs.":"c661e044ee35",
"The meadow needs signs.":"ac9754782aca",
"The meadow path needs signs.":"b668b2b4400c",
"The median is different: the middle number once they are in order.":"f4557f714e25",
"The number we see is not the answer.":"38b721d4df54",
"The ocean reef needs signs.":"0bb99cf5ddac",
"The one further right is greater.":"784eeb0daf31",
"The one with some left over has more.":"d59e60106862",
"The open side faces the bigger number.":"0970d970a58b",
"The paint shop labels its tins in percents.":"c36411bdc27d",
"The panel crew cuts strips into pieces.":"ee78d40dafb5",
"The parts already match.":"49c8a53f4e05",
"The parts left over make the fraction.":"4de6196fc00f",
"The path in Tiny Town needs a pattern.":"943ada81d833",
"The path needs a fence all the way around.":"214b10e64fdf",
"The path needs a round number of steps.":"35b8d6aa25ab",
"The path needs a sign at each hundred.":"a268fb39baab",
"The path needs blocks.":"edecb5547983",
"The path needs clearing.":"8c207fe232e2",
"The path needs equal fractions.":"20b37204f161",
"The path needs groups of rocks.":"4c3a2e69b03c",
"The path needs plants.":"28c670dab513",
"The path needs sand in parts.":"0ed30e0e180b",
"The path needs signs.":"b4c92a8ac308",
"The path needs some pieces.":"9ab3150c901f",
"The path needs the bigger piece.":"706a928c1279",
"The path needs the simplest form.":"43152dcae09c",
"The pattern repeats.":"73173b9ba12a",
"The pet shop counts toys.":"2dc2ee6d0e69",
"The pet shop needs name tags.":"1bf50d074a45",
"The pet shop needs signs.":"57c56f791baa",
"The quiet e goes in, though we do not hear it.":"6b87092b1349",
"The rangers made graphs of the forest animals.":"5f0eab536faa",
"The reef gate opens for the bigger number.":"cd8eacee7771",
"The reef has story time.":"73b54c2d187b",
"The reef needs shells and rocks.":"d51c33fd35fa",
"The reef needs word signs.":"321d886bc4f4",
"The reef shop counts shells.":"6190f0d4f6dc",
"The reef shop needs coins.":"a83352b783b0",
"The reef shop needs labels.":"b110ceb12343",
"The reef shop needs signs.":"082c8647432f",
"The sea animals need name tags.":"bb9e950e8ac6",
"The sea needs signs.":"0dc84bb95ccc",
"The shell shop gives change.":"db16f6a4e745",
"The ship leaves soon.":"efd29dca4b0d",
"The ship needs money for the trip.":"5cb388840e87",
"The ship needs supplies.":"db71f0d0c663",
"The ship sails soon.":"6a1c63d357bd",
"The ship unloads supplies.":"0c2c8104d645",
"The ship's crew has orders and sales to settle.":"113e0c59e88d",
"The ship's map has numbers.":"0ed99a74607a",
"The short hand shows the hour.":"e54827185ae2",
"The short hand tells the hour.":"143c8e704b02",
"The sides are told in words only.":"9a1bfb5a6d5a",
"The signs of the numbers tell the quadrant.":"63c52c568c71",
"The simplest form has the fewest biggest parts.":"49661759bf6f",
"The small number counts the factors.":"37436cd676ce",
"The snack bar needs menu cards.":"143de75ec56f",
"The space crews need matching packs.":"3567b222cd84",
"The space lab needs signs.":"262cd799da01",
"The space shop takes quarters too.":"124b81c36223",
"The space station door opens for the bigger number.":"c217183afaf0",
"The space station needs labels.":"67bd2279a7b9",
"The space station needs messages.":"0e10c3e62333",
"The space station needs power cells.":"0912e1e5fe5e",
"The space station needs power.":"1ea7d82ea6fb",
"The space station needs signs.":"009a49ec56db",
"The space station needs supplies.":"7fdbdc1d4e5d",
"The space station needs word labels.":"0bd5af99e1ae",
"The space station packs supplies in equal groups.":"cf1f2f92fe8c",
"The space station shop needs coins.":"048fd5ee81c0",
"The space station stacks power cells in equal groups.":"338c1d57c72e",
"The space walk starts soon.":"43d42d9121e2",
"The station's panels need covering.":"b6f1be5b6a5d",
"The station's power readings use exponents.":"cfe6211042a0",
"The supply depot hands out shares by percent.":"0d6fc5f9823d",
"The tens come first. Then the ones.":"0dc52ea6735b",
"The top counts the parts we mean.":"069f7570dc94",
"The total is on top.":"0641cda79468",
"The tower lift goes above and below the ground.":"d878bd1ebd51",
"The tower needs blocks for the top.":"1a89f1b66761",
"The tower needs layers of blocks.":"69c285935cf7",
"The toy shop needs help.":"83bc11a19bd9",
"The toy shop needs labels.":"207d2feeeafb",
"The trail crew packs supplies in equal boxes.":"132542e2f114",
"The trail has marks on a line.":"20795eeb80c3",
"The trail needs a fence on every side.":"cde61bb15615",
"The trail needs a sign about living things.":"b9e89119b063",
"The trail needs mixed numbers marked.":"013bf24a8fb2",
"The trail needs signs at the right spots.":"54424ad0a2eb",
"The trail needs the bigger fraction of water.":"5dbdd4759cae",
"The value of x is in each box.":"5887a5adf264",
"The weather station compares cold readings.":"9c3b40d08b7e",
"The words go in an order that makes sense.":"a91eb2f4acbd",
"The workshop needs its signs read.":"8d82585c1dde",
"The workshop needs labels.":"b28cf383f8eb",
"The workshop needs word labels.":"ceb45e726767",
"Then answer.":"5a139227064f",
"Then ask: what do the leftovers mean in the story?":"463d177bdf3e",
"Then check.":"0d8199035b9b",
"Then count the digits after both points.":"7d883797dca3",
"Then find its opposite.":"19de84e1498b",
"Then find its picture.":"5231cf42f44f",
"Then find its rhyme.":"98ee604b21ec",
"Then find the one that rhymes.":"7c97462c3a28",
"Then finish.":"c67833183a00",
"Then multiply or divide.":"bfa7678a03f0",
"Then pick its kind.":"ca4b5707b3c7",
"Then put in more.":"2c731d523b75",
"Then put it in its bin.":"ac7a97b94c56",
"Then put the point back in the same place.":"2338a8dbc16c",
"Then read it to me.":"fdcff2e0c794",
"Then read it.":"faeb64015469",
"Then read the sentence.":"b512d8cdadfe",
"Then sort each picture.":"388a3f5260a6",
"Then tap its picture.":"6be255b0c85a",
"Then tap the shape I name.":"da2c7d0cff61",
"Then tap the word you saw.":"9128041a48d5",
"Then undo.":"6c9499162282",
"Then use it on the new number.":"ebfda002212b",
"Then we build the new idea.":"223d825e1ed4",
"There is no wrong way.":"c14c4fdaa33b",
"These two letters make one sound together.":"e0c5f04021e4",
"They are as different as can be.":"ba45e0983629",
"They are partners!":"ff6f4d1b5442",
"They are synonyms!":"442bab8b568d",
"They still go in.":"f0cadd7bfe1d",
"Think about the leftovers.":"64d4647adf00",
"Think about the whole angle first.":"acb5cf4bba4b",
"Think back to the story. Was it there?":"3a1d87108bd2",
"Think in tens or hundreds, just like ones.":"40a65ae2ba5a",
"Think of a square corner.":"f765a664e7b8",
"Think: how many hundredths is that bar?":"9b1c8a33e3d8",
"Think: is it alive?":"fbb4aa91a059",
"Think: where is it warmer?":"d76ab77b53f6",
"This one holds up.":"813d4ef729b4",
"This one is bigger.":"ae2db6b494bb",
"This one is right.":"fd3b177afcd8",
"This one is smaller.":"d230c58e9c9b",
"Those letters work as a team.":"6b5b0a8fb67b",
"Those vowels work as a team.":"c59a9ef03de4",
"Times comes before plus.":"7a3678e29a24",
"Times first, then add.":"799f53e6a350",
"Times first.":"4960fe2c4b65",
"Times means groups of.":"7fc02be95f4b",
"Times means rows of.":"1e9dbafcac1c",
"Times ten moves every digit one place to the left.":"cf2712e9792f",
"To get x alone, do the opposite to both sides.":"6d706c7d7770",
"Too much?":"9e157d9175ae",
"Top take away bottom. Not the small from the big.":"20fec2316531",
"Toys and rocks do not grow.":"ca1596fd775a",
"Track it.":"f936753e592f",
"Trade or break a whole as you go.":"03dc6521c8d9",
"Trade ten for one of the next place.":"2ce2fd4c9ae7",
"Trade ten ones for a ten.":"906c7b9c3466",
"Trade them.":"ce33053b31f4",
"Trade when a place needs it.":"87e13837412a",
"Trade when needed.":"a14cb3148892",
"Try a number.":"0203c8c92d40",
"Try fewer.":"9172d69ff7d4",
"Try it with the picture.":"4f2e8afda2af",
"Try more.":"26f257c1c654",
"Try this first.":"bbecdc7370ef",
"Try this one with symbols only.":"937155e61664",
"Turn the cards over, one at a time.":"da29ab5dc8df",
"Two vowels side by side make one sound.":"41c17a1be3d3",
"Type the bigger fraction.":"736ee8f208d2",
"Type the decimal for the shaded bar.":"6003cbd60fa9",
"Type the fraction at each mark.":"93b227041a71",
"Type the length as a decimal.":"345a7b45601f",
"Type the missing number so both bars match.":"675d8075b8ee",
"Type the missing number so both match in symbols.":"02e0d64e542a",
"Type the missing number to match.":"0be277bb8fcd",
"Type the missing top number.":"da85ceb0e41c",
"Type the nearer ten for this number.":"74eb261c5d17",
"Type the number we round to.":"81c5b3e5d69e",
"Type the total.":"30dfda03d252",
"Type the whole bars and the parts left over.":"2d2ef07c0da7",
"Type what is left.":"ff05835725ca",
"Type what it shows.":"1fba0eed5ee3",
"Type what you know.":"0457b6ab935f",
"Undo it in your head: the opposite operation.":"d29f374ee3ed",
"Undo the known one.":"b4c4c518027e",
"Undo the plus or minus first, then the times.":"76ca0a217896",
"Undo the steps in reverse order.":"27401df22240",
"Undo times with divide, and divide with times.":"ca2a9151f909",
"Use any blocks you like to make a number.":"ba12a667c99a",
"Use any coins you like!":"2eb91a9a75ad",
"Use both colors on the double frame.":"9ef013290b7e",
"Use both colors.":"2fd4a1d72d9c",
"Use it for the empty box.":"8cda2110dfe1",
"Use the blocks.":"b1084162ec03",
"Use the flats, rods and cubes.":"986912a2d460",
"Use the height, not the slanted side.":"9a040f8616fa",
"Use the key in your head.":"fa1ce1decd9e",
"Use the model to find the missing number.":"3826b171cecb",
"Use the model.":"9c7f052913e9",
"Use the table of tens to get close.":"687d74a52d1f",
"Use the table.":"6a63ac13c391",
"Volume counts the cubes: one layer times how many layers.":"7ddafe5eb14a",
"Vowels side by side can make one sound.":"8c33c87dda08",
"Want to learn this with me?":"86fca3a3050f",
"Warm-up first, then we build the new idea.":"9361f987d946",
"Watch each trade.":"d086b063b563",
"Watch the hour change.":"06373d457f7f",
"Watch the long hand.":"c13cfadd1a71",
"Watch the minus signs.":"e1a212faab21",
"Watch the tens.":"ddf615b8451c",
"Watch the word flash.":"4d5fd27c024e",
"We add these.":"0366cb9d6a9b",
"We are packing for a pond trip.":"57a231331745",
"We can name shapes by how they look.":"cb12be79580e",
"We clapped once for each part.":"195255daf8aa",
"We did it!":"4c4279f72ce9",
"We know sight words by how they look.":"5d765393cf27",
"We know what comes next.":"1197d1198a84",
"We round to the nearer hundred.":"edd9e2114659",
"We say both sounds in a blend.":"ec2b3ee2e9db",
"We take away on the chart.":"99852f276690",
"We took a ten. Now the tens have one less.":"163a4e09cb2f",
"We will work through it.":"1d1fecb628e0",
"What comes after it?":"4aab706cda01",
"What comes after this?":"bf2536294c77",
"What comes next?":"0d4762c6ae7b",
"What do they do?":"0d64cf00882c",
"What does it make?":"a707cd828fc5",
"What does it round to?":"ff7b08407bd8",
"What does the story ask for?":"cf89bdedbf01",
"What fraction does this bar show?":"7f8daf42045b",
"What fraction is marked here?":"92c719dbd9aa",
"What fraction is shaded?":"04d6b32d8edd",
"What fraction is that?":"214d778d1fc3",
"What fraction shows sky?":"ee20055caf1a",
"What goes in each?":"ae02a353e401",
"What is each digit worth?":"3e43a5d1d6d6",
"What is its area?":"5eb675194b2a",
"What is its opposite?":"3451d8121d06",
"What is left?":"f46ac92ea295",
"What is the answer?":"8faffff7ea72",
"What is the product?":"91973fa1c8fb",
"What minute is it?":"1e53ed249380",
"What part is that?":"b13e95510a17",
"What time is it?":"63e4c15c4bd9",
"When a place runs out break one from the next place.":"ad531d13b3b3",
"When a place runs out, break one from the next place.":"9a45a408fb56",
"When the ones make ten or more, carry a ten.":"73c2aa0abd56",
"When the ones make ten we carry a ten.":"4dab889a3027",
"When those match, the line is at the mean.":"3de4b9871b66",
"Which bar shows more shaded part?":"d7bb0c16cd4a",
"Which comes next?":"fef67454ebaf",
"Which digit changes?":"1f2c13a1239c",
"Which fraction is greater than the other?":"c681567e0714",
"Which fraction is greater?":"516782f0d50e",
"Which is bigger for the desert path?":"09c0c4054866",
"Which is bigger in the sand castle plan?":"be9892d30a6d",
"Which letter goes in the box?":"4a636da00ad7",
"Which letter is missing?":"a852bc6c1a29",
"Which one is a different color?":"e05275ff0236",
"Which one is different?":"8402f44bf63c",
"Which one makes sense, with the right end mark?":"58073de3d606",
"Which one means the same?":"9636bf6ced72",
"Which one sounds right?":"9dad5b2e3e84",
"Which one?":"afc98a6934c7",
"Which picture rhymes?":"bcd0dfc0baa6",
"Which sound is first?":"c986c56bbc35",
"Which sound is last?":"0e4b94d4e223",
"Which sounds right?":"461891e1158e",
"Which step has the slip?":"1091b416c938",
"Which step is wrong?":"461bb28a6f93",
"Which step is wrong? Tap it.":"183ccd346c79",
"Which takes more room?":"fea12836a36e",
"Which way is the unit going?":"b23df30cc7ed",
"Which way is written right?":"b30893888134",
"Which word is it?":"33551d647c00",
"Which word is right?":"c0823c618d5e",
"Which word matches it?":"b6f0ebe15672",
"Which word matches the picture?":"c6332b3eb65b",
"Which word matches?":"c3e89b6274e3",
"Which word means the same?":"10985459fcef",
"Who is it about?":"c7fc96dc799c",
"With same size parts, just divide the tops.":"922a4772bf8b",
"Words have parts.":"91b7e31b16ab",
"Words start with a sound.":"af61cd895a94",
"Words that end in x, s, sh or ch add e s.":"f97f569aa4d7",
"Words that rhyme sound the same at the end.":"78f8ff5270e7",
"Work from the ones and trade when needed.":"11027db12b16",
"Work from the ones.":"811de7d0b5c7",
"Work it out for me.":"40f93c017954",
"Work out the minute.":"fca2e77eba66",
"Work out the order.":"205c987fe3eb",
"Work the parts first, then the wholes.":"48d7691cb17d",
"Work them out in your head.":"a75a3c6167bf",
"Work them out.":"1c53abfa526b",
"Work these out.":"398a66f7028d",
"Work this one out.":"710d617fa474",
"Working it out.":"77cc51592f4c",
"Write a letter for each one.":"45437d8228b6",
"Write both.":"847ea425e87d",
"Write it in columns.":"085a0ae64635",
"Write it with a times sign.":"bb90a5b3ee4f",
"Write it with symbols only.":"91102a475b18",
"Write the division for this array.":"4169098e881b",
"Write the ones.":"5dc63209965f",
"Write the same fraction in symbols only.":"742ceea1f903",
"Write this fraction as a decimal.":"91f47d3c1b47",
"Yep, that one was right.":"a0616b813b27",
"Yes, I got it right!":"f6a760a8fb1e",
"You already knew it!":"da4b1d09e9b2",
"You caught my mistake!":"1a91631c50d5",
"You earned game time!":"71561c2eceac",
"You fixed it!":"40de3ffed792",
"You fixed it.":"c074a4146936",
"You got it.":"41635032ea8f",
"You know its name!":"e0051a0dc192",
"You know this!":"9d313a02d334",
"You know this! Show me!":"3a72d16721c7",
"You know what to do.":"d86e91cc56dd",
"You learned it!":"3ceb38958101",
"You might know this already.":"638904d69d28",
"You pay a dollar.":"b3f941b61716",
"You shaded the same amount.":"d009a00693c8",
"You sorted them well.":"3d349a848a94",
"You still know this one.":"cb84639e60a1",
"Your call.":"c353407d5858",
"Your notebook fills up as we learn.":"daf8343acfae",
"Your notes go here as we work.":"c1de79b45a82",
"Your turn to show me!":"8f6b69ffa5ae"}};

var TEACH_VER='v194'; // last line: the whole file ran (checked by dataReady() before the app starts)
