/* Whistlestop bt v200. BUILT by tools/build.py from 49-bt-copycat.css, 49-bt-cubes.css, 49-bt-logic.css, 49-bt-maze.css, 49-bt-mdoku.css, 49-bt-memory.css, 49-bt-mirror.css, 49-bt-number.css, 49-bt-pattern.css, 49-bt-riddle.css, 49-bt-robot.css, 49-bt-rotate.css, 49-bt-scramble.css, 49-bt-shapefit.css, 49-bt-sudoku.css, 49-bt-tangram.css, 49-bt-wsearch.css, 75-bt-maze.js, 76-bt-pattern.js, 77-bt-number.js, 78-bt-sudoku.js, 79-bt-mdoku.js, 80-bt-logic.js, 80-bt-tangram.js, 81-bt-riddle.js, 81-bt-robot.js, 82-bt-memory.js, 83-bt-copycat.js, 84-bt-cubes.js, 84-bt-shapefit.js, 85-bt-rotate.js, 86-bt-mirror.js, 87-bt-wsearch.js, 88-bt-scramble.js, d-memory.js, d-puz-logic.js, d-puz-mathdoku.js, d-puz-robot.js, d-puz-sudoku.js, d-puz-tangram.js, d-riddles.js, d-words-bt.js: never edit by hand.
   index.html v200 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v200.js. */
(function(){var s=document.createElement('style');s.id='css-bt';s.textContent="/* Brain Teasers: Copy Cat (P3-14, src/js/83-bt-copycat.js). Tokens only; motion is transform and opacity (a lit pad grows a little\n   and its light layer fades in; reduced motion and calm mode make that instant, the light itself still shows). --cols and --ps come\n   from the JS layout. */\n.cc{display:flex;flex-direction:column;gap:var(--s-2);width:100%;max-width:1040px;margin:0 auto}\n.cc-say{flex:none;display:flex;align-items:center;gap:var(--s-2);min-height:56px;padding:var(--s-1) var(--s-1) var(--s-1) var(--s-2);border-radius:var(--r-card);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.cc-cat{flex:none;display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:var(--bt-tint);color:var(--bt-shade)}\n.cc-msg{flex:1;min-width:0;margin:0;text-align:left;font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.cc-msg.turn{color:var(--bt-shade)}\n.cc-msg.good{color:var(--good-ink)}\n.cc-msg.try{color:var(--try-ink)}\n.cc-msg.hint{color:var(--bt-shade)}\n.cc-spk{flex:none}\n.cc-bar{flex:none;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--s-2) var(--s-3);padding:0 var(--s-2);min-height:28px}\n.cc-rounds,.cc-steps{display:flex;gap:6px}\n.cc-rounds i{width:14px;height:14px;border-radius:50%;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.cc-rounds i.now{box-shadow:inset 0 0 0 3px var(--bt)}\n.cc-rounds i.on{background:var(--bt);box-shadow:none}\n.cc-steps i{width:10px;height:10px;border-radius:3px;background:var(--line)}\n.cc-steps i.on{background:var(--good)}\n.cc-area{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}\n.cc-pads{display:grid;grid-template-columns:repeat(var(--cols),var(--ps));gap:16px;justify-content:center}\n/* a pad: a white tile on a ledge with its shape; lit, its colour's light tone fills the tile and it grows a little */\n.cc-pad{position:relative;display:flex;align-items:center;justify-content:center;width:var(--ps);height:var(--ps);padding:0;border:0;border-radius:var(--r-hero);\n  background:var(--surface);box-shadow:inset 0 0 0 3px var(--line),0 6px 0 var(--ledge-soft);cursor:pointer;transition:transform var(--t-fast) var(--ease)}\n.cc-pad:active{transform:translateY(4px)}\n.cc-lit{position:absolute;inset:0;border-radius:inherit;background:var(--p1);box-shadow:inset 0 0 0 5px var(--p);opacity:0;transition:opacity 90ms linear}\n.cc-sh{position:relative;width:72%;height:72%}\n.cc-pad.on{transform:scale(1.05)}\n.cc-pad.on .cc-lit{opacity:1}\n.cc-pads.wait .cc-pad{cursor:default}\n.cc-pads.wait .cc-pad:active{transform:none}\n.cc-pads.wait .cc-pad.on{transform:scale(1.05)}\n/* the next pad (hint 2 and 3): a star-yellow ring; a wrong pad: amber with a dashed ring */\n.cc-pad.tip{box-shadow:inset 0 0 0 6px var(--star),0 6px 0 var(--star-shade)}\n.cc-pad.no{background:var(--try-tint);box-shadow:inset 0 0 0 4px var(--try),0 6px 0 var(--try);outline:3px dashed var(--try-ink);outline-offset:-12px}\n.cc-pad:focus-visible{outline:3px solid var(--brand);outline-offset:3px}\n/* colours: highlight, base and shade tones of one hue (DESIGN_SYSTEM 6.5); the light comes from the top left */\n.cc-c0{--p1:var(--ill-red-1);--p:var(--ill-red);--p2:var(--ill-red-2)}\n.cc-c1{--p1:var(--ill-blue-1);--p:var(--ill-blue);--p2:var(--ill-blue-2)}\n.cc-c2{--p1:var(--ill-yellow-1);--p:var(--ill-yellow);--p2:var(--ill-yellow-2)}\n.cc-c3{--p1:var(--ill-green-1);--p:var(--ill-green);--p2:var(--ill-green-2)}\n.cc-c4{--p1:var(--ill-purple-1);--p:var(--ill-purple);--p2:var(--ill-purple-2)}\n.cc-c5{--p1:var(--ill-orange-1);--p:var(--ill-orange);--p2:var(--ill-orange-2)}\n.cc-sh path{stroke-linejoin:round;stroke-linecap:round}\n.cc-sw{fill:var(--ledge-soft);stroke:var(--ledge-soft);stroke-width:8}\n.cc-sd{fill:var(--p2);stroke:var(--p2);stroke-width:8}\n.cc-sb{fill:var(--p);stroke:var(--p);stroke-width:7}\n.cc-sg{fill:none;stroke:var(--ill-white);stroke-width:6;opacity:.75}\n@media (max-width:560px){ .cc-msg{font-size:var(--fs-2)} }\n/* Brain Teasers: Cube Count (P3-16, src/js/84-bt-cubes.js), and the talk line shared by the three spatial types. Tokens only; motion\n   is transform and opacity. The light comes from the top left: top faces light (-1), left faces the base tone, right faces the\n   shade (-2), edges the deep tone (-3). */\n.cb{display:flex;flex-direction:column;gap:var(--s-2);width:100%;max-width:1000px;height:100%;margin:0 auto}\n.cb-say,.ro-say,.mr-say{flex:none;display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.cb-msg,.ro-msg,.mr-msg{flex:1;min-width:0;margin:0;text-align:left;font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink)}\n:is(.cb-msg,.ro-msg,.mr-msg).good{color:var(--good-ink)}\n:is(.cb-msg,.ro-msg,.mr-msg).try{color:var(--try-ink)}\n:is(.cb-msg,.ro-msg,.mr-msg).hint{color:var(--bt-shade)}\n:is(.cb-spk,.ro-spk,.mr-spk){flex:none}\n.cb-main{flex:1;min-height:0;display:flex;flex-direction:column;gap:var(--s-3)}\n/* the stack stands on a soft purple card */\n.cb-board{flex:1;min-height:150px;display:flex;align-items:center;justify-content:center;padding:var(--s-3);border-radius:var(--r-card);background:var(--bt-tint);\n  box-shadow:0 4px 0 var(--ledge-soft)}\n.cb-board.got{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.cb-svg{width:100%;height:100%;max-width:520px;overflow:visible}\n.cb-side{flex:none;display:flex;flex-direction:column;align-items:center;gap:var(--s-3)}\n/* hint 2: the layers side by side, bottom first; hint 3 adds each layer's count */\n.cb-layers{display:flex;justify-content:center;gap:var(--s-2);width:100%}\n.cb-ly{flex:0 1 104px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;margin:0;padding:var(--s-1) var(--s-1) var(--s-2);border-radius:var(--r-btn);\n  background:var(--star-tint);box-shadow:0 3px 0 var(--star)}\n.cb-lsvg{width:100%;height:52px}\n.cb-ly figcaption{display:flex;align-items:center;gap:4px;font-size:var(--fs-2);font-weight:700;line-height:1.1;color:var(--ink-2);white-space:nowrap}\n.cb-ly b{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;padding:0 4px;border-radius:13px;background:var(--surface);color:var(--ink);\n  font-size:var(--fs-2);box-shadow:inset 0 0 0 2px var(--star-shade)}\n/* the answer: dots for the three stacks, the typed number, the pad */\n.cb-ans{display:flex;align-items:center;justify-content:center;gap:var(--s-3)}\n.cb-dots,.ro-dots{flex:none;display:flex;gap:6px}\n.cb-dots i,.ro-dots i{width:12px;height:12px;border-radius:50%;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.cb-dots i.now,.ro-dots i.now{box-shadow:inset 0 0 0 3px var(--bt)}\n.cb-dots i.on,.ro-dots i.on{background:var(--bt);box-shadow:none}\n.cb-box{display:flex;align-items:center;justify-content:center;min-width:96px;height:58px;padding:0 var(--s-3);border-radius:var(--r-btn);background:var(--surface);\n  color:var(--ink-3);font-family:var(--font-display);font-size:var(--fs-6);font-weight:700;line-height:1;font-variant-numeric:tabular-nums;\n  box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.cb-box.on{color:var(--ink)}\n.cb-box.no{background:var(--try-tint);box-shadow:inset 0 0 0 3px var(--try),0 4px 0 var(--try);animation:k-shake 240ms linear}\n.cb-box.ok{background:var(--good-tint);color:var(--good-ink);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink);animation:k-pop var(--t-slow) var(--spring)}\n.cb-unit{font-size:var(--fs-4);font-weight:700;color:var(--ink-2)}\n.cb .cb-pad{grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--s-2);width:100%;max-width:460px}\n.cb .cb-pad .key{min-height:52px;font-size:var(--fs-5)}\n.cb .cb-pad .key .ic{width:30px;height:30px}\n/* faces and the tray */\n.cb-c0{--t:var(--ill-blue-1);--l:var(--ill-blue);--r:var(--ill-blue-2);--e:var(--ill-blue-3)}\n.cb-c1{--t:var(--ill-orange-1);--l:var(--ill-orange);--r:var(--ill-orange-2);--e:var(--ill-orange-3)}\n.cb-c2{--t:var(--ill-green-1);--l:var(--ill-green);--r:var(--ill-green-2);--e:var(--ill-green-3)}\n.cb-c3{--t:var(--ill-aqua-1);--l:var(--ill-aqua);--r:var(--ill-aqua-2);--e:var(--ill-aqua-3)}\n.cb-c4{--t:var(--ill-red-1);--l:var(--ill-red);--r:var(--ill-red-2);--e:var(--ill-red-3)}\n.cb-c5{--t:var(--ill-purple-1);--l:var(--ill-purple);--r:var(--ill-purple-2);--e:var(--ill-purple-3)}\n.cb-t{fill:var(--t)}\n.cb-l{fill:var(--l)}\n.cb-r{fill:var(--r)}\n.cb-t,.cb-l,.cb-r{stroke:var(--e);stroke-width:2;stroke-linejoin:round;vector-effect:non-scaling-stroke}\n.cb-ft{fill:var(--ill-white)}\n.cb-fl{fill:var(--ill-grey)}\n.cb-fr{fill:var(--ill-grey-2)}\n.cb-ft,.cb-fl,.cb-fr{stroke:var(--ill-grey-3);stroke-width:1.5;stroke-linejoin:round;vector-effect:non-scaling-stroke}\n.cb-fg{fill:none;stroke:var(--ill-grey-1);stroke-width:2;stroke-linecap:round;vector-effect:non-scaling-stroke}\n.cb-lsvg :is(.cb-t,.cb-l,.cb-r){stroke-width:1.2}\n.cb-lsvg :is(.cb-ft,.cb-fl,.cb-fr,.cb-fg){stroke-width:1}\n@media (max-width:560px){\n  .cb-msg,.ro-msg,.mr-msg{font-size:var(--fs-2)}\n}\n/* landscape tablets: the stack on the left, the layers and the pad on the right */\n@media (orientation:landscape) and (min-width:700px){\n  .cb-main{flex-direction:row;gap:var(--s-5)}\n  .cb-board{flex:1 1 55%;min-width:0}\n  .cb-side{flex:0 1 420px;justify-content:center}\n}\n/* Brain Teasers logic grids (P3-07, src/js/80-bt-logic.js). Tokens only; motion is transform and opacity. --cs, --rh, --hh, --n\n   come from the JS layout; block padding 3, square gap 2 and block gap 6 must match it. .land: clues left, grid right.\n   P6-03: never .btn.lg or .gauge.lg (19-gfx.js), which are on screen before this file loads on demand. */\n.lg:not(.btn,.gauge){--bw:calc(var(--n) * var(--cs) + (var(--n) - 1) * 2px + 6px);display:flex;flex-direction:column;gap:var(--s-3);width:100%;max-width:1040px;margin:0 auto}\n.lg-say{flex:none;display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);border-radius:var(--r-card);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.lg-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.lg-msg.good{color:var(--good-ink)}\n.lg-msg.try{color:var(--try-ink)}\n.lg-msg.hint{color:var(--bt-shade)}\n.lg-spk{flex:none;order:2}\n.lg-board{flex:none;display:flex;flex-direction:column;align-items:center;gap:var(--s-3)}\n.lg-tabs[hidden]{display:none}\n.lg-tabs .seg>button{padding:0 var(--s-3);font-size:var(--fs-2)}\n.lg-tabs .seg>button.lg-tcf{position:relative}\n.lg-tabs .seg>button.lg-tcf::after{content:\"\";position:absolute;top:6px;right:8px;width:10px;height:10px;border-radius:50%;background:var(--try);box-shadow:0 0 0 2px var(--surface)}\n.lg-tools{flex:none;display:flex;justify-content:center;gap:var(--s-2)}\n.lg-tools .btn{flex:0 1 auto;min-width:0}\n.lg-ac.on{background:var(--bt-tint);color:var(--bt-shade);box-shadow:inset 0 0 0 2px var(--bt),0 3px 0 var(--bt-shade)}\n\n/* ---------- the grid ---------- */\n.lg-grid{display:grid;grid-template-columns:var(--rh) var(--bw);grid-template-rows:var(--hh) var(--bw);gap:6px}\n.lg-grid.lg-g2{grid-template-columns:var(--rh) var(--bw) var(--bw);grid-template-rows:var(--hh) var(--bw) var(--bw)}\n.lg-grid.lg-gp{grid-template-columns:var(--rh) var(--bw) var(--bw)}\n.lg-hd{display:flex;flex-direction:column;justify-content:flex-end;min-width:0}\n.lg-cat{display:block;margin-bottom:2px;font-size:var(--fs-2);font-weight:700;line-height:1.2;color:var(--bt-shade);text-align:center;white-space:nowrap}\n.lg-hs{display:grid;grid-template-columns:repeat(var(--n),var(--cs));gap:2px;padding:0 3px}\n.lg-rhs{display:grid;grid-auto-rows:var(--cs);gap:2px;padding:3px 0}\n.lg-h{display:flex;align-items:center;justify-content:center;min-width:0;height:calc(var(--hh) - 18px);border-radius:10px;color:var(--ink);line-height:1}\n.lg-r{height:auto;justify-content:flex-end;padding-right:var(--s-2)}\n.lg-h.on{background:var(--bt-tint);color:var(--bt-shade)}\n.lg-nm{font-size:var(--fs-3);font-weight:700;line-height:1.1;overflow-wrap:anywhere}\n.lg-pic{display:grid;place-items:center;font-size:min(34px,calc(var(--cs) * .62));line-height:1}\n.lg-pic .art{width:1em;height:1em}\n.lg-col{display:flex;flex-direction:column;align-items:center;gap:2px}\n.lg-r .lg-col{flex-direction:row;gap:var(--s-1)}\n.lg-col i{width:22px;height:22px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--shadow-ink-2)}\n.lg-col small,.lg-num small{font-size:12px;font-weight:700;line-height:1;color:var(--ink-2)}\n.lg-num{display:flex;align-items:center;gap:3px;font-family:var(--font-display);font-size:min(var(--fs-4),calc(var(--cs) * .44));font-weight:700;line-height:1}\n.lg-num .ic{color:var(--ink-3)}\n.lg-corner{display:block}\n.lg-blk{display:grid;grid-template-columns:repeat(var(--n),var(--cs));grid-auto-rows:var(--cs);gap:2px;padding:3px;border-radius:12px;\n  background:linear-gradient(var(--hi),var(--hi-0) 40px) var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 4px 0 var(--bt-shade)}\n.lg-c{position:relative;display:grid;place-items:center;width:var(--cs);height:var(--cs);min-width:0;padding:0;border:0;border-radius:7px;\n  background:var(--surface);color:var(--ink-3);cursor:pointer;touch-action:manipulation;box-shadow:inset 0 -3px 0 var(--surface-2);-webkit-tap-highlight-color:transparent}\n.lg-c>*{pointer-events:none}\n.lg-c .ic{width:calc(var(--cs) * .56);height:calc(var(--cs) * .56)}\n.lg-c.cr .ic{width:calc(var(--cs) * .4);height:calc(var(--cs) * .4)}\n.lg-c.tk{background:var(--good-tint);color:var(--good-ink);box-shadow:inset 0 -3px 0 var(--good)}\n.lg-c.sel{box-shadow:inset 0 0 0 3px var(--bt-tint),inset 0 -3px 0 var(--surface-2)}\n.lg-c.tk.sel{box-shadow:inset 0 0 0 3px var(--bt-tint),inset 0 -3px 0 var(--good)}\n/* a hint's mark: star-yellow; hint highlights: the line soft yellow, the square a star ring */\n.lg-c.hn{background:var(--star-tint);box-shadow:inset 0 -3px 0 var(--star)}\n.lg-c.hh{background:var(--star-tint)}\n.lg-c.hl{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n/* a mark that breaks a rule the child can see, or one Check found after a hint: amber, a dashed ring, a warning mark; never red */\n.lg-c.cf{background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:-5px}\n.lg-c.wr{box-shadow:inset 0 0 0 4px var(--try)}\n.lg-wn{position:absolute;top:2px;right:2px;display:grid;line-height:0;color:var(--try-ink)}\n.lg-c .lg-wn .ic{width:14px;height:14px}\n.lg-c.tk>.ic,.lg-c.cr>.ic{animation:k-pop var(--t-slow) var(--spring)}\n.lg.win .lg-c.tk>.ic{animation:k-pop 520ms var(--ease) both}\n/* the empty corner of a two-category grid: how a tap goes (cross, then tick) */\n.lg-key{display:flex;align-items:center;justify-content:center;gap:var(--s-2);border-radius:12px;background:var(--surface-2);color:var(--ink-3)}\n.lg-key span{display:grid;place-items:center;width:34px;height:34px;border-radius:8px;background:var(--surface)}\n.lg-key span+.ic+span{background:var(--good-tint);color:var(--good-ink)}\n\n/* ---------- the clues ---------- */\n.lg-clues{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:var(--s-2);margin:0;padding:2px 2px 6px;list-style:none;overflow-y:auto;-webkit-overflow-scrolling:touch}\n.lg-q{flex:none;display:flex;align-items:center;gap:var(--s-1);padding:var(--s-1);border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.lg-qb{flex:1;min-width:0;display:flex;align-items:center;gap:var(--s-3);min-height:var(--tap);padding:var(--s-1) var(--s-2);border:0;border-radius:12px;\n  background:transparent;color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation}\n.lg-qb>*{pointer-events:none}\n.lg-qn{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--bt-tint);color:var(--bt-shade);font-family:var(--font-display);font-size:var(--fs-2)}\n.lg-qt{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--s-1)}\n.lg-qs{font-size:var(--fs-2);font-weight:700;line-height:1.3}\n.lg-qsp{flex:none}\n.lg-qp{display:flex;align-items:center;gap:var(--s-2)}\n.lg-qp .lg-nm{font-size:var(--fs-4)}\n.lg-qp .lg-pic{font-size:36px}\n.lg-qm{display:grid;place-items:center;width:34px;height:34px;border-radius:50%}\n.lg-qm.yes{background:var(--good-tint);color:var(--good-ink)}\n.lg-qm.no{background:var(--surface-2);color:var(--ink-2);box-shadow:inset 0 0 0 2px var(--line)}\n.lg-q.used{background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.lg-q.used .lg-qs{color:var(--ink-3);text-decoration:line-through;text-decoration-thickness:2px}\n.lg-q.used .lg-qn{background:var(--surface);color:var(--ink-3)}\n.lg-q.used .lg-qp{opacity:.55}\n.lg-q.hl{background:var(--star-tint);box-shadow:inset 0 0 0 3px var(--star),0 3px 0 var(--star-shade)}\n.lg-q.cf{background:var(--try-tint);outline:2px dashed var(--try-ink);outline-offset:-5px}\n.lg-B .lg-nm{font-size:var(--fs-4)}\n\n/* ---------- landscape: talk line, tools and clues left; the grid right ---------- */\n.lg.land{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto minmax(0,1fr);grid-template-areas:\"say board\" \"tools board\" \"clues board\";\n  column-gap:var(--s-5);row-gap:var(--s-3)}\n.lg.land .lg-say{grid-area:say}\n.lg.land .lg-tools{grid-area:tools;justify-content:flex-start}\n.lg.land .lg-clues{grid-area:clues}\n.lg.land .lg-board{grid-area:board;align-self:center}\n/* Brain Teasers: Mazes (P3-08). The board is one canvas (75-bt-maze.js); this lays it out. Tokens only; motion is transform and opacity. */\n.mz{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);min-height:100%}\n.mz.land{flex-direction:row;justify-content:center;align-items:center;gap:var(--s-5)}\n.mz-board{position:relative;flex:none;border-radius:var(--r-card);box-shadow:0 0 0 3px var(--bt-tint),0 6px 0 3px var(--ledge-soft)}\n.mz-cv{display:block;border-radius:var(--r-card);touch-action:none;cursor:pointer;-webkit-user-select:none;user-select:none}\n.mz-side{flex:none;display:flex;flex-direction:column;align-items:center;gap:var(--s-2);width:100%;max-width:420px}\n.mz.land .mz-side{width:236px}\n.mz-stat{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:var(--s-2) var(--s-3);min-height:var(--tap);padding:var(--s-1) var(--s-4);\n  border-radius:var(--r-pill);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line);font-family:var(--font-display);font-size:var(--fs-3);color:var(--ink)}\n.mz-stat b{font-weight:700}\n.mz-sts,.mz-keys{display:flex;gap:var(--s-1)}\n.mz-st{color:var(--line)}\n.mz-st.on{color:var(--star);--ic2:var(--star-shade)}\n.mz-key{opacity:.25;transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.mz-key.on{opacity:1;transform:scale(1.1)}\n.mz-steps{font-variant-numeric:tabular-nums;color:var(--ink-2)}\n.mz-steps i{font-style:normal;margin-left:var(--s-1);padding:2px var(--s-2);border-radius:var(--r-chip);background:var(--bt-tint);color:var(--bt-shade);font-weight:700}\n.mz-msg{margin:0;min-height:1.45em;text-align:center;font-size:var(--fs-3);font-weight:700;color:var(--ink-2)}\n.mz-ctl{display:flex;align-items:center;justify-content:center;gap:var(--s-4)}\n.mz.land .mz-ctl{flex-direction:column;gap:var(--s-3)}\n.mz-tog[aria-pressed=\"true\"]{background:var(--bt-tint);color:var(--bt-shade)}\n.mz-pad{display:grid;grid-template-columns:repeat(3,var(--tap-primary));grid-template-rows:repeat(2,var(--tap-primary));gap:var(--s-1)} /* keyboard arrows: up over left, down, right */\n.mz-pad[hidden]{display:none}\n.mz-pad [data-d=\"0\"]{grid-area:1/2}.mz-pad [data-d=\"3\"]{grid-area:2/1}.mz-pad [data-d=\"2\"]{grid-area:2/2}.mz-pad [data-d=\"1\"]{grid-area:2/3}\n.mz-arrow{position:absolute;display:flex;align-items:center;justify-content:center;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;\n  background:var(--bt);color:var(--surface);box-shadow:0 4px 0 var(--bt-shade);pointer-events:none;opacity:0}\n.mz-arrow[hidden]{display:none}\n/* AUD-BT M-3: hint 1 rings the flag (or the next star or key); size and place are set by 75-bt-maze.js */\n.mz-arrow.ring{background:none;box-shadow:inset 0 0 0 5px var(--star),inset 0 0 0 8px var(--star-shade),0 0 0 3px var(--surface)}\n.mz-arrow.on{animation:mz-flash .5s var(--ease) 0s 6 alternate both}\n@keyframes mz-flash{from{opacity:.15;transform:scale(.8)}to{opacity:1;transform:scale(1.08)}}\n@media (max-height:520px){.mz.land .mz-side{gap:var(--s-1)}.mz-pad{grid-template-columns:repeat(3,var(--tap));grid-template-rows:repeat(2,var(--tap))}}\n/* Brain Teasers MathDoku (P3-05, src/js/79-bt-mdoku.js). Tokens only; light from the top left (a white gloss on top, the shade tone\n   as a ledge below); motion is transform and opacity (calm mode and reduced motion stop it in 20-base.css).\n   The board is a purple tray (--bt, ledge --bt-shade) holding one white grid; an svg on top draws the cage lines: thin --line\n   between squares of one cage, thick --bt-shade between cages, and the grid's edge. --cs (the square's side) is set by the layout\n   in the JS; the tray padding (6 px) must match FP there. The cage label (target and sign) sits in the cage's top-left square.\n   Portrait: talk line, board, pad. Landscape (.land): board left, talk line and pad right (.md-side).\n   The pad is a grid of 60 narrow columns: the JS sets --ds (columns per digit key) and --ts (per tool key). */\n.md{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);width:100%;max-width:1000px;min-height:100%;margin:0 auto}\n.md-say{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:640px;min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.md-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.md-msg.good{color:var(--good-ink)}\n.md-msg.try{color:var(--try-ink)}\n.md-msg.hint{color:var(--bt-shade)}\n.md-spk{flex:none;order:2}\n.md-main{display:flex;justify-content:center;flex:none}\n.md-ctl{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%;max-width:640px}\n.md-side{display:none}\n\n/* ---------- the board ---------- */\n.md-board{position:relative;padding:6px;border-radius:16px;\n  background:linear-gradient(var(--hi),var(--hi-0) 40px) var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 6px 0 var(--bt-shade)}\n.md-grid{display:grid;grid-template-columns:repeat(var(--n),var(--cs));grid-auto-rows:var(--cs);border-radius:8px;overflow:hidden;\n  background:var(--surface);box-shadow:0 0 0 2px var(--bt-shade)}\n.md-lines{position:absolute;left:6px;top:6px;width:calc(var(--n) * var(--cs));height:calc(var(--n) * var(--cs));overflow:visible;pointer-events:none}\n.md-lines path{fill:none;vector-effect:non-scaling-stroke}\n.md-thin{stroke:var(--line);stroke-width:2px}\n.md-thick{stroke:var(--bt-shade);stroke-width:4px;stroke-linecap:square}\n.md-c{position:relative;display:grid;place-items:center;width:var(--cs);height:var(--cs);min-width:0;padding:calc(var(--cs) * .14) 0 0;border:0;border-radius:0;\n  background:var(--surface);color:var(--bt);font-family:var(--font-display);font-size:calc(var(--cs) * .5);font-weight:700;line-height:1;\n  cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}\n.md-c>*{pointer-events:none}\n.md-v{font-weight:700}\n/* the cage label: target and sign, top left, in ink so it reads apart from the purple entries */\n.md-lab{position:absolute;left:4px;top:4px;z-index:1;display:flex;align-items:center;gap:2px;padding:0 2px;border-radius:6px;\n  font-family:var(--font-body);font-size:clamp(14px,calc(var(--cs) * .27),22px);font-weight:700;line-height:1.15;color:var(--ink);white-space:nowrap}\n.md-lab .ic{width:.9em;height:.9em;flex:none}\n/* a full cage that does not make its number: the label turns amber, with a dashed ring and a warning mark (never red) */\n.md-lab.miss{padding:0 4px 0 2px;background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:0}\n/* a given number (a single-square cage) is printed in ink; the child's are purple; a hint's is ink on star-yellow */\n.md-c.giv{color:var(--ink);padding-top:0}\n.md-c.ent{color:var(--bt)}\n.md-c.hn{color:var(--ink);background:var(--star-tint)}\n/* the selected square, its row and column, and the same number elsewhere */\n.md-c.rc{background:var(--surface-2)}\n.md-c.same{background:var(--bt-tint);color:var(--bt-shade)}\n.md-c.same.giv{color:var(--ink)}\n.md-c.sel{background:var(--bt-tint);box-shadow:inset 0 0 0 4px var(--bt)}\n/* hints: the cage or line glows soft yellow, the square gets a star ring */\n.md-c.hh{background:var(--star-tint)}\n.md-c.hl{background:var(--star-tint);box-shadow:inset 0 0 0 5px var(--star)}\n.md-c.sel.hl{box-shadow:inset 0 0 0 5px var(--star),inset 0 0 0 8px var(--bt)}\n/* a clash: amber with a dashed ring and a warning mark, never red */\n.md-c.cf{background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:-7px}\n.md-c.cf.sel{box-shadow:inset 0 0 0 4px var(--try)}\n.md-wn{position:absolute;top:4px;right:4px;display:grid;line-height:0;color:var(--try-ink)}\n.md-wn .ic{width:max(14px,calc(var(--cs) * .26));height:max(14px,calc(var(--cs) * .26))}\n.md-c.pop .md-v{animation:k-pop 420ms var(--ease)}\n/* pencil marks: a small grid of 3 across, under the label */\n.md-nts{position:absolute;left:3px;right:3px;top:calc(var(--cs) * .36);bottom:3px;display:grid;grid-template-columns:repeat(3,1fr);place-items:center;\n  font-family:var(--font-body);font-style:normal;font-size:max(11px,calc(var(--cs) * .22));font-weight:700;line-height:1;color:var(--ink-3)}\n.md-c.sel .md-nts{color:var(--bt-shade)}\n.md.win .md-v{animation:k-pop 520ms var(--ease) both}\n\n/* ---------- the pad: the question screen's keys (padHTML), 1..n with how many are left, then Erase, Notes, Undo ---------- */\n.md .md-pad{grid-template-columns:repeat(60,minmax(0,1fr));column-gap:0;row-gap:var(--s-2);width:100%;max-width:none;margin:0}\n.md .md-pad .key{position:relative;grid-column:span var(--ds,12);min-width:0;min-height:56px;margin:0 4px;font-size:var(--fs-5)}\n.md .md-pad .key.t{grid-column:span var(--ts,20);gap:var(--s-1);font-size:var(--fs-3);font-weight:700}\n.md .md-pad .key .ic{width:28px;height:28px}\n.md .md-pad .key.t span{pointer-events:none}\n.md .md-pad.tight .key.t span{display:none}\n.md-kf{display:grid;place-items:center;margin-bottom:8px;font-family:var(--font-display);line-height:1;pointer-events:none}\n/* how many are left: a row of dots along the bottom of the key (a tick in a green disc when none are left) */\n.md-left{position:absolute;left:0;right:0;bottom:5px;display:flex;justify-content:center;gap:2px;height:14px;align-items:center;pointer-events:none}\n.md-left i{width:5px;height:5px;border-radius:50%;background:var(--bt)}\n.md .md-pad .md-left .ic{width:14px;height:14px;padding:2px;box-sizing:content-box;border-radius:50%;background:var(--good-tint);color:var(--good-ink)}\n.md .md-pad .key.zero{background:var(--surface-2);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line),var(--ledge) var(--line)}\n.md .md-pad .key.on{background:var(--bt-tint);color:var(--bt-shade);box-shadow:inset 0 0 0 3px var(--bt),var(--ledge) var(--bt-shade)}\n/* with Notes on, the digits on the keys turn small and purple, so it is clear they will go in small */\n.md.nt .md-sym .md-kf{font-size:var(--fs-3);color:var(--bt)}\n.md-B .md-pad .key{min-height:var(--tap-pk)}\n.md-B .md-pad .key.md-sym{font-size:var(--fs-6)}\n\n/* ---------- landscape ---------- */\n.md.land{flex-direction:row;align-items:center;justify-content:center;gap:var(--s-6)}\n.md.land .md-side{display:flex;flex-direction:column;gap:var(--s-3);flex:none;width:min(380px,42%)}\n.md.land .md-say{align-self:stretch}\n.md.land .md-ctl{max-width:none}\n/* Brain Teasers: Memory Match (P3-14, src/js/82-bt-memory.js). Tokens only; motion is transform and opacity (the flip turns the card\n   on its Y axis; reduced motion and calm mode make it instant, 20-base.css). --cols, --cw and --gap come from the JS layout. */\n.mm{display:flex;flex-direction:column;gap:var(--s-2);width:100%;max-width:1040px;margin:0 auto}\n.mm-say{flex:none;display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);border-radius:var(--r-card);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.mm-msg{flex:1;min-width:0;margin:0;text-align:left;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.mm-msg.good{color:var(--good-ink)}\n.mm-msg.try{color:var(--try-ink)}\n.mm-msg.hint{color:var(--bt-shade)}\n.mm-spk{flex:none}\n.mm-bar{flex:none;display:flex;align-items:center;justify-content:space-between;gap:var(--s-3);padding:0 var(--s-2);min-height:24px}\n.mm-got{display:flex;flex-wrap:wrap;gap:5px}\n.mm-got i{width:14px;height:14px;border-radius:4px;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.mm-got i.on{background:var(--good);box-shadow:0 2px 0 var(--good-ink)}\n.mm-turns{font-size:var(--fs-2);font-weight:700;color:var(--ink-3);font-variant-numeric:tabular-nums;white-space:nowrap}\n.mm-area{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}\n.mm-grid{display:grid;grid-template-columns:repeat(var(--cols),var(--cw));gap:var(--gap);justify-content:center}\n/* a card: a button that holds two faces back to back */\n.mm-c{position:relative;width:var(--cw);height:var(--ch,calc(var(--cw) * 1.25));padding:0;border:0;background:none;cursor:pointer;perspective:600px;border-radius:var(--r-btn)}\n.mm-in{position:absolute;inset:0;transform-style:preserve-3d;transition:transform var(--t-slow) var(--ease)}\n.mm-c.up .mm-in{transform:rotateY(180deg)}\n.mm-back,.mm-face{position:absolute;inset:0 0 4px;display:flex;align-items:center;justify-content:center;border-radius:var(--r-btn);backface-visibility:hidden;\n  -webkit-backface-visibility:hidden}\n/* the back: brain-teaser purple, a lighter inset frame toward the light, a star, a ledge */\n.mm-back{background:var(--bt);color:var(--bt-tint);box-shadow:0 4px 0 var(--bt-shade)}\n.mm-back i{position:absolute;inset:6px;border-radius:calc(var(--r-btn) - 5px);box-shadow:inset 2px 2px 0 var(--bt-tint);opacity:.35}\n.mm-back .ic{width:calc(var(--cw) * .34);height:calc(var(--cw) * .34);color:var(--star)}\n.mm-c:active .mm-back{transform:translateY(3px);box-shadow:0 1px 0 var(--bt-shade)}\n.mm-face{transform:rotateY(180deg);flex-direction:column;padding:4px;background:var(--surface);color:var(--ink);box-shadow:inset 0 0 0 3px var(--bt-tint),0 4px 0 var(--ledge-soft)}\n.mm-c.got .mm-face{background:var(--good-tint);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.mm-c.hint .mm-face{background:var(--star-tint);box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.mm-c.no .mm-face{background:var(--try-tint);box-shadow:inset 0 0 0 3px var(--try),0 4px 0 var(--try)}\n.mm-c.peek .mm-face{box-shadow:inset 0 0 0 4px var(--star),0 4px 0 var(--star-shade)}\n.mm-c.got .mm-face::after,.mm-c.hint .mm-face::after{content:'';position:absolute;top:5px;right:5px;width:18px;height:18px;border-radius:50%;background:var(--good)}\n.mm-c.hint .mm-face::after{background:var(--star-shade)}\n.mm-c.got .mm-face::before,.mm-c.hint .mm-face::before{content:'';position:absolute;z-index:1;top:8px;right:11px;width:4px;height:8px;border:solid var(--surface);\n  border-width:0 3px 3px 0;transform:rotate(45deg)}\n.mm-c.got,.mm-c.hint{cursor:default}\n.mm-c.got .mm-in{animation:k-pop var(--t-slow) var(--spring)}\n.mm-c.no .mm-in{animation:mm-no 420ms var(--ease)}\n@keyframes mm-no{0%,100%{transform:rotateY(180deg)}30%{transform:rotateY(180deg) translateX(-4px)}65%{transform:rotateY(180deg) translateX(4px)}}\n.mm-c:focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n/* faces */\n.mm-pic{display:flex;align-items:center;justify-content:center;font-size:calc(var(--cw) * .62);line-height:1}\n.mm-pic .art{width:1em;height:1em}\n.mm-let,.mm-num{font-family:var(--font-display);font-size:calc(var(--cw) * .5);line-height:1;color:var(--bt-shade);font-variant-numeric:tabular-nums}\n.mm-num{font-size:min(calc(var(--cw) * .36),40px)}\n.mm-let{font-family:inherit;font-size:calc(var(--cw) * .56)}\n.mm-txt{font-size:clamp(16px,calc(var(--cw) * .24),28px);font-weight:700;line-height:1.15;text-align:center;overflow-wrap:anywhere}\n.mm-txt.long{font-size:clamp(16px,calc(var(--cw) * .19),24px)}\n.mm-es{color:var(--es-shade)}\n.mm-root{color:var(--bt-shade)}\n.mm-root::after{content:'-';opacity:.6}\n.mm-viz{display:flex;align-items:center;justify-content:center;width:100%;height:100%}\n.mm-viz .viz{width:86%;height:auto;max-height:86%}\n.mm-fr{display:inline-flex;flex-direction:column;align-items:center;font-family:var(--font-display);font-size:min(calc(var(--cw) * .3),34px);line-height:1.05;\n  color:var(--ink);font-variant-numeric:tabular-nums}\n.mm-fr b+b{border-top:3px solid currentColor;padding:0 4px}\n/* Brain Teasers: Mirror (P3-16, src/js/86-bt-mirror.js). Tokens only; motion is transform and opacity. --cs (the square size) and\n   --n come from the JS layout. Filled squares are raised tiles: base tone, a light edge toward the top left, a shade edge below.\n   The talk line is shared with Cube Count (49-bt-cubes.css). On a phone the puzzle uses the stage's side padding too, so an 8 x 8\n   grid keeps 44 px squares at 380 px (BRAIN_TEASERS 8, dense grids). */\n.mr{display:flex;flex-direction:column;gap:var(--s-3);width:calc(100% + var(--s-4));min-height:100%;margin:0 calc(var(--s-2) * -1)}\n.mr-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-2)}\n.mr-board{position:relative;display:grid;grid-template-columns:repeat(var(--n),var(--cs,44px));grid-auto-rows:var(--cs,44px);padding:3px;border-radius:var(--r-btn);\n  background:var(--bt-tint);box-shadow:0 4px 0 var(--ledge-soft)}\n.mr-board.won{animation:k-pop var(--t-slow) var(--spring)}\n.mr-cell{position:relative;display:block;width:var(--cs,44px);height:var(--cs,44px);margin:0;padding:0;border:0;background:none;touch-action:manipulation}\n.mr-cell::before{content:'';position:absolute;inset:3px;border-radius:calc(var(--cs,44px) * .2);box-shadow:inset 0 0 0 2px var(--surface)}\n.mr-cell.l::before{background:var(--surface);opacity:.6}\n.mr-cell.t::before,.mr-cell.on::before{inset:2px;opacity:1}\n.mr-cell.t{cursor:pointer}\n.mr-cell.t::before{background:var(--surface);box-shadow:0 2px 0 var(--ledge-soft)}\n.mr-cell.t:active::before{transform:translateY(2px);box-shadow:none}\n.mr-cell.on::before{background:var(--p);box-shadow:inset 3px 3px 0 var(--p1),inset -3px -4px 0 var(--p2),0 2px 0 var(--ledge-soft)}\n.mr-cell.t.on{cursor:default}\n.mr-cell.t.on::before{animation:k-pop var(--t-slow) var(--spring)}\n.mr-cell.hn::after{content:'';position:absolute;inset:2px;border-radius:calc(var(--cs,44px) * .2);box-shadow:inset 0 0 0 3px var(--star)}\n.mr-cell.ring::after{content:'';position:absolute;inset:-2px;border-radius:calc(var(--cs,44px) * .26);box-shadow:inset 0 0 0 4px var(--star-shade)}\n.mr-cell.no{animation:k-shake 240ms linear}\n.mr-cell.no::after{content:'';position:absolute;inset:2px;border-radius:calc(var(--cs,44px) * .2);background:var(--try-tint);box-shadow:inset 0 0 0 3px var(--try);\n  animation:mr-no 1.2s var(--ease) forwards}\n@keyframes mr-no{0%,55%{opacity:1}100%{opacity:0}}\n/* the mirror line (or the centre dot of a half-turn), over the squares, never in the way of a tap */\n.mr-line{position:absolute;inset:3px;width:calc(100% - 6px);height:calc(100% - 6px);overflow:visible;pointer-events:none}\n.mr-ln{fill:none;stroke:var(--bt);stroke-width:.1;stroke-linecap:round;stroke-dasharray:.28 .18}\n.mr-dot{fill:var(--bt);stroke:var(--surface);stroke-width:.06}\n.mr-dotc{fill:var(--bt-tint)}\n.mr-line.glow .mr-ln{stroke:var(--star-shade);stroke-width:.14}\n.mr-line.glow .mr-dot{fill:var(--star-shade)}\n.mr-count{margin:0;font-size:var(--fs-2);font-weight:700;color:var(--ink-2);text-align:center}\n.mr-c0{--p:var(--ill-blue);--p1:var(--ill-blue-1);--p2:var(--ill-blue-2)}\n.mr-c1{--p:var(--ill-orange);--p1:var(--ill-orange-1);--p2:var(--ill-orange-2)}\n.mr-c2{--p:var(--ill-green);--p1:var(--ill-green-1);--p2:var(--ill-green-2)}\n.mr-c3{--p:var(--ill-purple);--p1:var(--ill-purple-1);--p2:var(--ill-purple-2)}\n.mr-c4{--p:var(--ill-red);--p1:var(--ill-red-1);--p2:var(--ill-red-2)}\n.mr-c5{--p:var(--ill-aqua);--p1:var(--ill-aqua-1);--p2:var(--ill-aqua-2)}\n/* wide screens: the board on the left, the talk line on the right */\n.mr.wide{flex-direction:row-reverse;align-items:center;justify-content:center;gap:var(--s-6);width:100%;margin:0;min-height:100%}\n.mr.wide .mr-say{flex:0 1 280px}\n.mr.wide .mr-main{flex:0 1 auto}\n/* Brain Teasers number puzzles (P3-10, src/js/77-bt-number.js): Number Pyramid, Balance, Make the Number.\n   Tokens only; light from the top left (a white gloss upper left, the shade tone as a ledge lower right); motion is transform and\n   opacity (calm mode and reduced motion stop it in 20-base.css). Portrait: talk line, board, controls. Landscape: board left. */\n.bn{display:flex;flex-direction:column;gap:var(--s-3);width:100%;max-width:640px;min-height:100%;margin:0 auto}\n.bn-say{display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);border-radius:var(--r-card);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.bn-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.bn-msg.good{color:var(--good-ink)}\n.bn-msg.try{color:var(--try-ink)}\n.bn-msg.hint{color:var(--bt-shade)}\n.bn-spk{flex:none}\n.bn-board{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);min-height:0}\n.bn-ctl{display:flex;flex-direction:column;align-items:center;gap:var(--s-3)}\n.bn-tag{margin:0}\n/* the question screen's pad in two rows of six (1-6, then 7 8 9 delete 0 check) */\n.bn .bn-pad{grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--s-2);max-width:460px}\n.bn .bn-pad .key{min-height:52px;font-size:var(--fs-5)}\n.bn .bn-pad .key .ic{width:30px;height:30px}\n.bn-shake{animation:k-shake 240ms linear}\n/* a hint points at something: a star ring that pulses */\n.bn .hl{outline:4px solid var(--star);outline-offset:3px}\n\n/* ---------- Number Pyramid ---------- */\n.bn-pyrw{display:grid;grid-template-columns:repeat(calc(var(--n) * 2),minmax(0,1fr));gap:var(--s-2) 6px;width:100%;max-width:calc(var(--n) * 96px)}\n.bn-br{display:flex;align-items:center;justify-content:center;min-width:0;min-height:52px;padding:0;border:0;border-radius:var(--r-chip);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;line-height:1;color:var(--ink);touch-action:manipulation;\n  transition:transform var(--t-fast) var(--ease)}\n.bn-br span{pointer-events:none}\n/* a given brick: sandstone with a gloss band and a ledge */\n.bn-br.giv{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--ill-tan);box-shadow:inset 3px 3px 0 var(--ill-tan-1),inset -2px -3px 0 var(--ill-tan-2),0 4px 0 var(--ill-tan-3)}\n.bn-br.hid{background:var(--surface);color:var(--bt);border:3px dashed var(--bt);cursor:pointer;box-shadow:0 4px 0 var(--ledge-soft)}\n.bn-br.hid:active{transform:translateY(3px)}\n.bn-br.sel{border-style:solid;background:var(--bt-tint);color:var(--bt-shade);transform:translateY(-2px);box-shadow:0 5px 0 var(--bt-shade)}\n.bn-br.ok{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--good-tint);color:var(--good-ink);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.bn-br.ok.hn{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.bn-pyrw.win .bn-br{animation:k-pop 420ms var(--ease)}\n\n/* ---------- Balance ---------- */\n.bn-scs{display:grid;justify-items:center;gap:var(--s-2);width:100%}\n.bn-sc{width:100%;max-width:340px;padding:var(--s-1) var(--s-2) 0;border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft)}\n.bn-scs.n3 .bn-sc{max-width:300px}\n.bn-sc.hl{outline-offset:-3px}\n.bn-bal{gap:var(--s-2)}\n.bn-bal .bn-board{gap:var(--s-2)}\n.bn-bal .bn-pad .key{min-height:var(--tap)}\n.bn-bal .bn-slot{height:var(--tap)}\n.bn-sv{display:block;width:100%;height:auto;overflow:visible;font-family:var(--font-display);font-weight:700;text-anchor:middle;stroke-linecap:round}\n/* the stand and base (grey, its right side in shade), the wooden arm (gloss on top, shade below), the brass-grey pin */\n.bn-stand{fill:var(--ill-grey-2)}\n.bn-sts{fill:var(--ill-grey-3)}\n.bn-base{fill:var(--ill-grey-3)}\n.bn-beam{fill:var(--ill-brown)}\n.bn-bsh{fill:none;stroke:var(--ill-brown-2);stroke-width:3}\n.bn-bgl{fill:none;stroke:var(--ill-brown-1);stroke-width:3}\n.bn-nd{fill:none;stroke:var(--ill-brown-3);stroke-width:4}\n.bn-pin{fill:var(--ill-grey-1);stroke:var(--ill-grey-3);stroke-width:3}\n.bn-pgl2{fill:var(--ill-white)}\n.bn-post{fill:var(--ill-grey-2)}\n.bn-dish{fill:var(--ill-grey-1);stroke:var(--ill-grey-2);stroke-width:2;stroke-linejoin:round}\n.bn-dsh{fill:none;stroke:var(--ill-grey);stroke-width:3}\n.bn-pgl{fill:none;stroke:var(--ill-white);stroke-width:2.5}\n.bn-wb{fill:var(--ill-grey-3)}\n.bn-wh{fill:none;stroke:var(--ill-grey-3);stroke-width:4}\n.bn-ws{fill:none;stroke:var(--ill-ink-2);stroke-width:3}\n.bn-wg{fill:none;stroke:var(--ill-grey-2);stroke-width:3}\n.bn-w text{fill:var(--surface);font-size:18px}\n.bn-vt circle{fill:var(--bt);stroke:var(--surface);stroke-width:2}\n.bn-vt text{fill:var(--surface);font-size:13px}\n.bn-vt.bad circle{fill:var(--try)}\n.bn-vt.bad text{fill:var(--ink)}\n/* tipping: the arm turns about the pin and the trays move with its ends (100 units out: sin 6 degrees x 100 = 10.45) */\n.bn-arm,.bn-tray{transition:transform var(--t-xl) var(--spring)}\n.bn-sc.tl .bn-arm{transform:rotate(-6deg)}\n.bn-sc.tl .bn-tray.l,.bn-sc.tr .bn-tray.r{transform:translateY(10.45px)}\n.bn-sc.tl .bn-tray.r,.bn-sc.tr .bn-tray.l{transform:translateY(-10.45px)}\n.bn-sc.tr .bn-arm{transform:rotate(6deg)}\n.bn-slots{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-2) var(--s-4)}\n.bn-sg{display:inline-flex;align-items:center;gap:var(--s-1);font-size:var(--fs-4);font-weight:700;color:var(--ink-2)}\n.bn-sg>b{padding:0 2px}\n.bn-sg .bn-x{font-size:var(--fs-3);white-space:nowrap}\n.bn-slot{min-width:60px;height:52px;padding:0 var(--s-2);border:3px dashed var(--bt);border-radius:var(--r-chip);background:var(--surface);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;color:var(--bt);cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 var(--ledge-soft)}\n.bn-slot.sel{border-style:solid;background:var(--bt-tint);color:var(--bt-shade);box-shadow:0 5px 0 var(--bt-shade)}\n.bn-slot.ok{border:0;background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--good-tint);color:var(--good-ink);cursor:default;box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.bn-slot.ok.hn{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.bn-scs.win .bn-sc{animation:k-pop 420ms var(--ease)}\n\n/* ---------- Make the Number ---------- */\n.bn-goal{display:flex;justify-content:center}\n.bn-ring{display:grid;place-items:center;width:108px;height:108px;border-radius:50%;\n  background:radial-gradient(circle,var(--surface) 0 47%,var(--bt) 47% 61%,var(--bt-tint) 61% 75%,var(--bt) 75%);box-shadow:0 5px 0 var(--bt-shade)}\n.bn-ring b{font-family:var(--font-display);font-size:var(--fs-5);line-height:1;color:var(--bt-shade)}\n.bn-tiles{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-3);min-height:76px}\n.bn-tile{display:grid;place-items:center;width:72px;height:72px;padding:0;border:0;border-radius:var(--r-btn);\n  background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--ill-cream);color:var(--ink);font-family:var(--font-display);font-size:var(--fs-6);line-height:1;\n  cursor:pointer;touch-action:manipulation;box-shadow:inset 3px 3px 0 var(--ill-cream-1),inset 0 0 0 2px var(--ill-cream-2),0 5px 0 var(--ill-cream-3);\n  transition:transform var(--t-fast) var(--ease)}\n.bn-tile b{pointer-events:none}\n.bn-tile:active{transform:translateY(3px)}\n.bn-tile.made{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--star-tint);box-shadow:inset 3px 3px 0 var(--hi),inset 0 0 0 2px var(--star),0 5px 0 var(--star-shade)}\n.bn-tile.sel{background:var(--bt-tint);color:var(--bt-shade);transform:translateY(-4px);box-shadow:inset 0 0 0 3px var(--bt),0 7px 0 var(--bt-shade)}\n.bn-tiles.win .bn-tile{animation:k-pop 420ms var(--ease)}\n.bn-ops{display:flex;justify-content:center;gap:var(--s-3)}\n.bn-op{display:grid;place-items:center;width:60px;height:60px;padding:0;border:0;border-radius:50%;background:linear-gradient(var(--hi),var(--hi-0) 60%) var(--bt);\n  color:var(--surface);cursor:pointer;touch-action:manipulation;box-shadow:inset 0 3px 0 var(--hi),0 5px 0 var(--bt-shade);transition:transform var(--t-fast) var(--ease)}\n.bn-op:active{transform:translateY(3px)}\n.bn-op.sel{background:var(--star);color:var(--ink);transform:translateY(-3px);box-shadow:inset 0 3px 0 var(--hi),0 6px 0 var(--star-shade)}\n.bn-op .ic{pointer-events:none}\n.bn-trail{display:flex;flex-direction:column;align-items:center;gap:2px;margin:0;padding:0;list-style:none;font-size:var(--fs-3);font-weight:700;color:var(--ink-2)}\n.bn-trail:empty{display:none}\n.bn-trail b{color:var(--bt-shade)}\n.bn-acts{display:flex;justify-content:center}\n\n@media (max-width:480px){\n  .bn-tiles.n5{gap:var(--s-2)}\n  .bn-tiles.n5 .bn-tile{width:60px;height:64px;font-size:var(--fs-5)}\n}\n/* tablets: bigger tiles, target and signs */\n@media (min-width:560px) and (min-height:560px){\n  .bn-tile{width:84px;height:84px}\n  .bn-ring{width:124px;height:124px}\n  .bn-ring b{font-size:var(--fs-6)}\n  .bn-op{width:64px;height:64px}\n}\n/* a tall tablet in portrait: bigger scales */\n@media (min-width:560px) and (min-height:860px){\n  .bn-scs.n3 .bn-sc{max-width:400px}\n  .bn-scs .bn-sc{max-width:460px}\n}\n/* landscape: the board on the left; the talk line, the boxes, the pad and the steps on the right */\n@media (min-aspect-ratio:5/4) and (min-width:700px){\n  .bn{display:grid;grid-template-columns:minmax(0,1fr) minmax(344px,380px);grid-template-rows:auto auto;align-content:center;\n    grid-template-areas:\"board say\" \"board ctl\";gap:var(--s-3) var(--s-6);max-width:1000px}\n  .bn-board{grid-area:board}\n  .bn-say{grid-area:say;align-self:end}\n  .bn-ctl{grid-area:ctl;align-self:start}\n  .bn .bn-pad{max-width:none}\n  .bn-scs.n3 .bn-sc{max-width:340px}\n  .bn-scs .bn-sc{max-width:400px}\n  .bn-scs.n1 .bn-sc{max-width:480px}\n}\n/* Brain Teasers: Patterns, matrices, odd one out (P3-09; 76-bt-pattern.js). Tokens only; motion is transform and opacity.\n   P6-03: div.pt, not .pt: the long division board's decimal point cells are i.pt (39-steps.css), and this file loads on demand. */\ndiv.pt{display:flex;flex-direction:column;gap:var(--s-3);max-width:980px;min-height:100%;margin:0 auto}\n.pt-head{display:flex;align-items:center;justify-content:center;gap:var(--s-3);min-height:var(--tap)}\n.pt-dots{display:flex;gap:6px;flex:none}\n.pt-dots i{width:12px;height:12px;border-radius:50%;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.pt-dots i.now{box-shadow:inset 0 0 0 3px var(--bt)}\n.pt-dots i.on{background:var(--bt);box-shadow:none}\n.pt-ask{margin:0;min-width:0;font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;line-height:1.2;color:var(--ink);text-align:center}\n.pt-say{flex:none}\n.pt-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-4);padding-bottom:var(--s-3)}\n.pt-side{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%}\n/* the board: a soft purple tray with white cells on a ledge */\n.pt-board{padding:var(--s-3);border-radius:var(--r-card);background:var(--bt-tint);box-shadow:0 4px 0 var(--ledge-soft)}\n.pt-cell{display:flex;align-items:center;justify-content:center;min-width:0;aspect-ratio:1;border-radius:var(--r-btn);background:var(--surface);\n  box-shadow:0 3px 0 var(--ledge-soft)}\n.pt-cell .pt-t{width:90%;height:90%}\n.pt-q{background:var(--surface-2);box-shadow:inset 0 0 0 3px var(--bt);outline:3px dashed var(--surface);outline-offset:-3px}\n.pt-q b{font-family:var(--font-display);font-size:clamp(28px,6vw,40px);line-height:1;color:var(--bt)}\n.pt-got{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--good-ink);animation:k-pop var(--t-slow) var(--spring)}\n.pt-row{display:grid;grid-template-columns:repeat(var(--n),minmax(0,76px));gap:var(--s-2);justify-content:center;width:100%;max-width:max-content}\n.pt-nrow .pt-cell{aspect-ratio:auto;min-height:64px;padding:0 2px}\n.pt-nm{font-family:var(--font-display);font-size:clamp(20px,4.6vw,30px);font-weight:700;line-height:1;color:var(--ink);font-variant-numeric:tabular-nums}\n.pt-grid{display:grid;gap:var(--s-2)}\n.pt-grid.g3{grid-template-columns:repeat(3,1fr);width:min(100%,312px)}\n.pt-grid.g2{grid-template-columns:repeat(2,1fr);width:min(100%,232px)}\n/* hint words */\n.pt-tip{display:flex;align-items:center;gap:var(--s-2);max-width:560px;margin:0;padding:var(--s-2) var(--s-4);border-radius:var(--r-btn);background:var(--star-tint);\n  color:var(--ink);font-size:var(--fs-3);font-weight:700;line-height:1.35;box-shadow:0 3px 0 var(--star)}\n.pt-tip[hidden]{display:none}\n.pt-tip .ic{flex:none;color:var(--star-shade)}\n/* choices (the .choice component: .wrong and .right carry a corner badge, .off is a choice a hint took away) */\n.pt-chs{display:grid;gap:var(--s-3);width:100%;max-width:520px}\n.pt-chs.n4{grid-template-columns:repeat(4,minmax(0,1fr))}\n.pt-chs.n6{grid-template-columns:repeat(3,minmax(0,1fr));max-width:420px}\n.pt-ch.choice{aspect-ratio:1;min-height:var(--tap-pk);padding:var(--s-1)}\n.pt-ch .pt-t{width:100%;height:100%;max-width:132px;max-height:132px}\n/* R-01b: a picture choice is drawn at the size of a picture on the board (--pt-ts, set by 76-bt-pattern.js), so a wrong size never\n   looks like the right one; the button stays big */\n.pt-ch .pt-t{width:var(--pt-ts,100%);height:var(--pt-ts,100%)}\n.pt-ch:is(.right,.wrong)::before,.pt-ch.wrong::after{transform:scale(.8);transform-origin:top right}\n.pt-ch.right::after{transform:rotate(45deg) scale(.8)}\n.pt-num .pt-ch.choice{aspect-ratio:auto;min-height:72px}\n.pt-num .pt-nm{font-size:clamp(24px,6vw,36px)}\n.pt-odd .pt-chs.n4{grid-template-columns:repeat(2,minmax(0,1fr));max-width:400px}\n.pt-odd .pt-ch .pt-t{max-width:170px;max-height:170px}\n/* colours: base and shade tones of one hue (DESIGN_SYSTEM 6.5); the light comes from the top left */\n.pt-c0{--p:var(--ill-red);--p2:var(--ill-red-2)}\n.pt-c1{--p:var(--ill-blue);--p2:var(--ill-blue-2)}\n.pt-c2{--p:var(--ill-yellow);--p2:var(--ill-yellow-2)}\n.pt-c3{--p:var(--ill-green);--p2:var(--ill-green-2)}\n.pt-c4{--p:var(--ill-purple);--p2:var(--ill-purple-2)}\n.pt-c5{--p:var(--ill-orange);--p2:var(--ill-orange-2)}\n.pt-t path{stroke-linejoin:round;stroke-linecap:round}\n.pt-sw{fill:var(--ledge-soft);stroke:var(--ledge-soft);stroke-width:8}\n.pt-sd{fill:var(--p2);stroke:var(--p2);stroke-width:8}\n.pt-sb{fill:var(--p);stroke:var(--p);stroke-width:7}\n.pt-sg{fill:none;stroke:var(--ill-white);stroke-width:6;opacity:.75}\n/* phones: a long row wraps into two rows */\n@media (max-width:560px){\n  .pt-row.pt-wrap{grid-template-columns:repeat(var(--n2),minmax(0,76px))}\n  .pt-ask{font-size:var(--fs-3)}\n}\n@media (max-width:560px) and (max-height:820px){\n  .pt-main{gap:var(--s-3)}\n  .pt-grid.g3{width:min(100%,264px)}\n  .pt-chs.n6{max-width:300px;gap:var(--s-2) var(--s-3)}\n}\n/* landscape tablets: the board on the left, the choices on the right (grids and the odd one out) */\n@media (orientation:landscape) and (min-width:700px){\n  .pt-mat .pt-main,.pt-ana .pt-main{flex-direction:row;justify-content:center;align-items:center;gap:var(--s-7)}\n  .pt-mat .pt-side,.pt-ana .pt-side{width:auto;flex:0 1 440px}\n  .pt-grid.g3{width:min(360px,58vh)}\n  .pt-grid.g2{width:min(300px,52vh)}\n  .pt-ana .pt-chs.n4{grid-template-columns:repeat(2,minmax(0,1fr));max-width:min(300px,46vh)}\n  .pt-mat .pt-chs.n6{max-width:440px}\n  .pt-odd .pt-chs.n4{grid-template-columns:repeat(4,minmax(0,1fr));max-width:760px}\n  .pt-row{grid-template-columns:repeat(var(--n),minmax(0,100px))}\n  .pt-seq .pt-chs.n4,.pt-num .pt-chs.n4{max-width:600px}\n}\n/* Brain Teasers: Riddles (P3-14, src/js/81-bt-riddle.js). Tokens only; motion is transform and opacity (the .choice component). */\n.rd{display:flex;flex-direction:column;gap:var(--s-3);width:100%;max-width:760px;min-height:100%;margin:0 auto}\n/* the riddle card: a question badge on a ledge, the dots, the riddle, a speak button */\n.rd-card{display:flex;align-items:flex-start;gap:var(--s-3);padding:var(--s-3) var(--s-3) var(--s-4);border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--bt-tint),0 4px 0 var(--ledge-soft)}\n.rd-badge{flex:none;display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;background:var(--bt);color:var(--surface);\n  box-shadow:0 4px 0 var(--bt-shade)}\n.rd-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--s-2)}\n.rd-dots{display:flex;gap:6px;padding-top:2px}\n.rd-dots i{width:12px;height:12px;border-radius:50%;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.rd-dots i.now{box-shadow:inset 0 0 0 3px var(--bt)}\n.rd-dots i.on{background:var(--bt);box-shadow:none}\n.rd-q{margin:0;font-size:var(--fs-4);font-weight:700;line-height:1.35;color:var(--ink)}\n.rd-A .rd-q,.rd-B .rd-q{font-size:clamp(22px,4.4vw,28px)}\n.rd-say{flex:none}\n/* hint and answer lines */\n.rd-tip{display:flex;align-items:center;gap:var(--s-2);margin:0;padding:var(--s-2) var(--s-4);border-radius:var(--r-btn);background:var(--star-tint);\n  color:var(--ink);font-size:var(--fs-3);font-weight:700;line-height:1.35;box-shadow:0 3px 0 var(--star)}\n.rd-tip[hidden]{display:none}\n.rd-tip .ic{flex:none;color:var(--star-shade)}\n.rd-msg{min-height:26px;margin:0;font-size:var(--fs-3);font-weight:700;line-height:1.35;color:var(--ink-2);text-align:center}\n.rd-msg.good{color:var(--good-ink)}\n.rd-msg.try{color:var(--try-ink)}\n/* choices */\n.rd-chs{display:grid;gap:var(--s-3);width:100%;margin-top:auto;padding-bottom:var(--s-2)}\n.rd-chs.n3{grid-template-columns:repeat(3,minmax(0,1fr))}\n.rd-chs.n4{grid-template-columns:repeat(2,minmax(0,1fr))}\n.rd-ch.choice{min-height:var(--tap-pk);padding:var(--s-2) var(--s-3);font-size:var(--fs-4);font-weight:700;line-height:1.2}\n.rd-t{overflow-wrap:break-word;text-align:center}\n.rd-ch.pic{flex-direction:column;gap:var(--s-1);min-height:120px}\n.rd-pic{display:flex;align-items:center;justify-content:center;font-size:clamp(64px,18vw,104px);line-height:1}\n.rd-pic .art{width:1em;height:1em}\n.rd-w{font-size:var(--fs-4);line-height:1.1;color:var(--ink)}\n.rd-B .rd-ch.pic{min-height:136px}\n.rd-B .rd-pic{font-size:clamp(52px,12vw,72px)}\n.rd-A .rd-ch.pic{min-height:min(168px,24vh)}\n.rd-C .rd-ch.choice{min-height:76px}\n.rd-ch:is(.right,.wrong)::before,.rd-ch.wrong::after{transform:scale(.8);transform-origin:top right}\n.rd-ch.right::after{transform:rotate(45deg) scale(.8)}\n/* phones: band D's longer answers one under the other */\n@media (max-width:560px){\n  .rd-D .rd-chs.n4{grid-template-columns:1fr}\n  .rd-D .rd-ch.choice{min-height:56px;font-size:var(--fs-3)}\n  .rd-D .rd-q{font-size:var(--fs-3)}\n  .rd-A .rd-q,.rd-B .rd-q{font-size:var(--fs-4)}\n  .rd-badge{width:44px;height:44px}\n}\n/* landscape tablets: the riddle on the left, the choices on the right */\n@media (orientation:landscape) and (min-width:700px){\n  .rd{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:auto auto 1fr;column-gap:var(--s-6);max-width:1000px}\n  .rd-card,.rd-tip,.rd-msg{grid-column:1}\n  .rd-chs{grid-column:2;grid-row:1 / span 3;align-self:center;margin:0}\n  .rd-chs.n3{grid-template-columns:repeat(3,minmax(0,1fr))}\n  .rd-A .rd-ch.pic{min-height:150px}\n}\n/* Brain Teasers: Robot Path (P3-13; 81-bt-robot.js). Tokens only; motion is transform and opacity. Light from the top left. */\n.rb{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);max-width:1040px;min-height:100%;margin:0 auto}\n.rb.land{flex-direction:row;align-items:center;justify-content:center;gap:var(--s-5)}\n.rb-board{flex:none;display:flex;justify-content:center}\n.rb-svg{display:block;width:300px;height:300px;overflow:visible}\n.rb-side{display:flex;flex-direction:column;gap:var(--s-2);width:100%;max-width:560px}\n.rb.land .rb-side{flex:0 1 540px;min-width:340px}\n.rb-abs .rb-dir{display:none}\n/* the talk line */\n.rb-talk{display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap)}\n.rb.land .rb-talk{min-height:56px}\n.rb-msg{flex:1;min-width:0;margin:0;padding:var(--s-1) var(--s-3);border-radius:var(--r-btn);font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink)}\n.rb-msg.try{background:var(--try-tint);color:var(--try-ink)}\n.rb-msg.good{background:var(--good-tint);color:var(--good-ink)}\n.rb-msg.hint{background:var(--star-tint);color:var(--ink)}\n.rb-say{flex:none}\n/* program strips */\n.rb-prog{display:flex;flex-direction:column;gap:var(--s-2)}\n.rb-sw{padding:var(--s-2);border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.rb-fw.on{box-shadow:inset 0 0 0 3px var(--bt),0 3px 0 var(--bt-shade)}\n/* with a function there are two strips: each name sits on the top edge of its box, like a label on a folder */\n.rb-two .rb-sw{position:relative;margin-top:10px;padding-top:var(--s-3)}\n.rb-hd{position:absolute;top:-11px;left:12px;display:flex;align-items:center;gap:var(--s-2);padding:0 8px;border-radius:var(--r-pill);background:var(--surface);\n  font-size:var(--fs-2);font-weight:700;line-height:22px;color:var(--ink-2);box-shadow:inset 0 0 0 2px var(--line)}\n.rb-fw.on .rb-hd{color:var(--bt-shade);box-shadow:inset 0 0 0 2px var(--bt)}\n.rb-lab{display:flex;align-items:center;gap:6px}\n.rb-lab .ic,.rb-lab .rb-g{flex:none;width:22px;height:22px;color:var(--bt)}\n.rb-cnt{display:flex;flex-direction:column;align-items:center;min-width:64px;font-size:var(--fs-2);font-weight:700;line-height:1.1;color:var(--ink-2)}\n.rb-cnt b{font-family:var(--font-display);font-size:var(--fs-4);color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}\n.rb-cnt.full b{color:var(--bt-shade)}\n.rb-strip{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-height:52px}\n/* block colours: base (k), light face (k1), ledge (k2), deep icon (k3) */\n.rb-k-mv{--k:var(--ill-blue);--k1:var(--ill-blue-1);--k2:var(--ill-blue-2);--k3:var(--ill-blue-3)}\n.rb-k-tn{--k:var(--ill-purple);--k1:var(--ill-purple-1);--k2:var(--ill-purple-2);--k3:var(--ill-purple-3)}\n.rb-k-rep{--k:var(--ill-pink);--k1:var(--ill-pink-1);--k2:var(--ill-pink-2);--k3:var(--ill-pink-3)}\n.rb-k-uw{--k:var(--ill-aqua);--k1:var(--ill-aqua-1);--k2:var(--ill-aqua-2);--k3:var(--ill-aqua-3)}\n.rb-k-fn{--k:var(--ill-green);--k1:var(--ill-green-1);--k2:var(--ill-green-2);--k3:var(--ill-green-3)}\n.rb-g{fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}\n/* a placed block: a light face on a coloured ledge, a white gloss along the top */\n.rb-b{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:2px;min-width:var(--tap);height:var(--tap);padding:0 6px;border:0;\n  border-radius:12px;background:var(--k1);color:var(--k3);box-shadow:inset 0 3px 0 var(--hi),0 4px 0 var(--k2);cursor:pointer;touch-action:manipulation;\n  transition:transform var(--t-fast) var(--ease)}\n.rb-b .rb-g,.rb-b>.ic{width:30px;height:30px}\n.rb-b:active{transform:translateY(3px);box-shadow:0 1px 0 var(--k2)}\n.rb-b b,.rb-ghost b{font-family:var(--font-display);font-size:var(--fs-4);line-height:1;color:var(--k3);font-variant-numeric:tabular-nums}\n.rb-lh{min-width:60px;padding:0 4px}\n.rb-lh .rb-g{width:26px;height:26px}\n.rb-b.on{transform:translateY(-3px);box-shadow:0 0 0 3px var(--bt),0 7px 0 var(--k2)}\n.rb-b.bad{background:var(--try-tint);color:var(--try-ink);box-shadow:0 4px 0 var(--try);outline:3px dashed var(--try-ink);outline-offset:2px}\n.rb-b.bad b{color:var(--try-ink)}\n.rb-warn{position:absolute;top:-9px;right:-9px;width:22px;height:22px;padding:2px;border-radius:50%;background:var(--surface);color:var(--try-ink);\n  box-shadow:0 0 0 2px var(--try)}\n.rb-b.hint,.rb-end.hint{box-shadow:0 0 0 4px var(--star),0 4px 0 var(--star-shade)}\n/* a loop: its blocks sit inside a soft frame in the loop's colour, the end bracket closes it */\n.rb-loop{display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px;max-width:100%;padding:4px;border-radius:16px;background:var(--surface-2);\n  box-shadow:inset 0 0 0 3px var(--k1),inset 6px 0 0 var(--k1)}\n.rb-loop.on{box-shadow:inset 0 0 0 3px var(--bt),inset 6px 0 0 var(--bt)}\n.rb-end{display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);padding:0;border:0;border-radius:12px;background:transparent;\n  color:var(--k3);cursor:pointer;touch-action:manipulation}\n.rb-end .rb-g{width:28px;height:28px}\n/* the cursor and the empty slots */\n.rb-slot,.rb-cur{display:inline-block;flex:none;width:var(--tap);height:var(--tap);padding:0;border:0;border-radius:12px;background:var(--surface-2);\n  box-shadow:inset 0 0 0 2px var(--line);cursor:pointer;touch-action:manipulation}\n.rb-slot.cur,.rb-cur{background:var(--bt-tint);box-shadow:inset 0 0 0 3px var(--bt);animation:rb-in var(--t-slow) var(--spring)}\n.rb-cur{width:14px;cursor:default}\n/* hint marks: the place glows star yellow (tier 1), the right block shows faintly there (tier 2) */\n.rb-ghost{display:inline-flex;flex:none;align-items:center;justify-content:center;gap:2px;min-width:var(--tap);height:var(--tap);padding:0 6px;border-radius:12px;\n  background:var(--k1,var(--star-tint));color:var(--k3,var(--star-shade));opacity:.6;outline:3px dashed var(--star-shade);outline-offset:2px}\n.rb-ghost .rb-g,.rb-ghost>.ic{width:30px;height:30px}\n.rb-gslot{width:var(--tap);padding:0;background:var(--star-tint);opacity:1}\n/* the palette */\n.rb-pals{display:flex;gap:var(--s-2)}\n.rb-pals.rb-pad{display:grid;grid-template-columns:repeat(3,minmax(0,92px));justify-content:center}\n.rb-pad .rb-p[data-t=\"up\"]{grid-column:2}\n.rb-pad .rb-p[data-t=\"lf\"]{grid-column:1}\n.rb-p{flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-width:var(--tap);min-height:64px;padding:6px 2px 4px;border:0;\n  border-radius:var(--r-btn);background:var(--k1);color:var(--k3);box-shadow:inset 0 3px 0 var(--hi),0 5px 0 var(--k2);cursor:pointer;touch-action:manipulation;\n  transition:transform var(--t-fast) var(--ease)}\n.rb-p .rb-g,.rb-p>.ic{width:32px;height:32px}\n.rb-p span{font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.05;color:var(--ink);text-align:center}\n.rb-p:active{transform:translateY(4px);box-shadow:0 1px 0 var(--k2)}\n.rb-p:disabled{background:var(--surface-2);color:var(--ink-3);box-shadow:0 3px 0 var(--ledge-soft);cursor:default}\n.rb-p:disabled span{color:var(--ink-3)}\n.rb-p:disabled:active{transform:none}\n.rb-A .rb-p{min-height:var(--tap-pk)}\n.rb-A .rb-p>.ic{width:40px;height:40px}\n/* how many times? */\n.rb-pick{display:flex;flex-direction:column;align-items:center;gap:var(--s-2);padding:var(--s-2) var(--s-3) var(--s-3);border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 3px var(--ill-pink-1),0 3px 0 var(--ledge-soft)}\n.rb-pick p{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-3);font-weight:700;color:var(--ink)}\n.rb-pick p .rb-g{width:26px;height:26px;color:var(--ill-pink-3)}\n.rb-nums{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px;width:100%}\n.rb-nk{min-width:var(--tap);min-height:var(--tap);border:0;border-radius:12px;background:var(--ill-pink-1);color:var(--ink);font-family:var(--font-display);\n  font-size:var(--fs-4);font-weight:700;box-shadow:inset 0 3px 0 var(--hi),0 4px 0 var(--ill-pink-2);cursor:pointer;touch-action:manipulation}\n.rb-nk.on{background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.rb-nk:active{transform:translateY(3px);box-shadow:0 1px 0 var(--ill-pink-2)}\n/* Undo and Go */\n.rb-act{display:flex;align-items:center;gap:var(--s-3)}\n.rb-act .rb-go{flex:1;font-size:var(--fs-5)}\n/* the board */\n.rb-tray{fill:var(--bt-tint)}\n.rb-tray2{fill:var(--ledge-soft)}\n.rb-fl{fill:var(--ill-cream-1)}\n.rb-fl2{fill:var(--ill-cream-2)}\n.rb-ws{fill:var(--drop)}\n.rb-w2{fill:var(--ill-grey-2)}\n.rb-w{fill:var(--ill-grey)}\n.rb-w1{fill:var(--ill-grey-1)}\n.rb-wl{fill:none;stroke:var(--ill-grey-2);stroke-width:4;stroke-linecap:round}\n.rb-st2{fill:var(--ill-grey-1)}\n.rb-st{fill:var(--ill-white)}\n.rb-st1{fill:none;stroke:var(--ill-grey-1);stroke-width:5;stroke-dasharray:9 8}\n.rb-pad{fill:var(--ill-green)}\n.rb-pad2{fill:var(--ill-green-2)}\n.rb-pole{stroke:var(--ill-grey-3);stroke-width:5;stroke-linecap:round}\n.rb-fg{fill:var(--ill-red)}\n.rb-fg2{fill:var(--ill-red-2)}\n.rb-fg1{fill:var(--ill-red-1)}\n.rb-gm{fill:var(--ill-aqua)}\n.rb-gm1{fill:var(--ill-aqua-1)}\n.rb-gm2{fill:var(--ill-aqua-3)}\n.rb-gm3{fill:var(--ill-aqua-2)}\n.rb-gem{transition:transform var(--t-slow) var(--ease),opacity var(--t-slow) var(--ease)}\n.rb-gem.got{opacity:0;transform:scale(1.7)}\n.rb-dot{fill:var(--ill-orange-1)}\n.rb-bonk path{fill:var(--try);stroke:var(--try-ink);stroke-width:3;stroke-linejoin:round}\n/* the robot */\n.rb-sh{fill:var(--drop)}\n.rb-ptr{fill:var(--ill-orange);stroke:var(--ill-white);stroke-width:3;stroke-linejoin:round}\n.rb-ptr2{fill:var(--ill-orange-3)}\n.rb-whl{fill:var(--ill-ink-2)}\n.rb-bd{fill:var(--ill-blue)}\n.rb-bd2{fill:var(--ill-blue-2)}\n.rb-bd1{fill:var(--ill-blue-1)}\n.rb-led{fill:var(--ill-yellow)}\n.rb-ant{stroke:var(--ill-grey-3);stroke-width:4;stroke-linecap:round}\n.rb-ball{fill:var(--ill-red)}\n.rb-ball1{fill:var(--ill-red-1)}\n.rb-hd{fill:var(--ill-white-2)}\n.rb-hd2{fill:var(--ill-white-3)}\n.rb-gl{fill:var(--ill-white)}\n.rb-scr{fill:var(--ill-ink-2)}\n.rb-eye{fill:var(--ill-aqua-1)}\n.rb-smile{fill:none;stroke:var(--ill-aqua-1);stroke-width:3;stroke-linecap:round}\n.rb-bot.glide{transition:transform var(--rb-t,300ms) var(--ease)}\n.rb-dir{transition:transform var(--rb-t,300ms) var(--ease)}\n.rb-eyes{transition:transform var(--t) var(--ease)}\n.rb-body{transform-box:fill-box;transform-origin:50% 100%}\n.rb-body.wob{animation:rb-wob 460ms var(--ease)}\n.rb-body.hop{animation:rb-hop 640ms var(--spring)}\n@keyframes rb-wob{0%,100%{transform:none}20%{transform:translateX(-5px) rotate(-7deg)}45%{transform:translateX(5px) rotate(6deg)}70%{transform:translateX(-3px) rotate(-3deg)}}\n@keyframes rb-hop{0%,100%{transform:none}40%{transform:translateY(-16px) scale(1.06)}70%{transform:translateY(0) scale(1.08,.94)}}\n@keyframes rb-in{from{opacity:0}to{opacity:1}}\n/* landscape: a shorter panel so the board keeps the full height */\n.rb.land .rb-p{min-height:56px;padding:4px 4px 3px}\n.rb.land .rb-p span{white-space:nowrap}\n.rb.land .rb-p .rb-g,.rb.land .rb-p>.ic{width:26px;height:26px}\n.rb.land .rb-pad .rb-p{min-height:56px}\n/* tight: a long program, closer rows */\n.rb.tight{gap:var(--s-2)}\n.rb.tight .rb-side{gap:6px}\n.rb.tight .rb-talk{min-height:var(--tap)}\n.rb.tight .rb-msg{padding-top:2px;padding-bottom:2px}\n.rb.tight .rb-sw{padding:6px}\n.rb.tight .rb-two .rb-sw{padding-top:10px}\n.rb.tight .rb-p{min-height:52px}\n/* phones */\n@media (max-width:480px){\n  .rb-msg{font-size:var(--fs-2)}\n  .rb-pals{gap:4px;margin:0 -8px}\n  .rb-pals.rb-pad{margin:0}\n  .rb-p{min-height:58px;padding:4px 0 3px}\n  .rb-p .rb-g,.rb-p>.ic{width:28px;height:28px}\n  .rb-nums{grid-template-columns:repeat(4,minmax(0,1fr))}\n}\n/* Brain Teasers: Turn It (P3-16, src/js/85-bt-rotate.js). Tokens only; motion is transform and opacity (the .choice component).\n   Pieces are drawn like the pattern tiles: a soft ledge down-right, the shade tone, the base tone toward the top-left light, a gloss.\n   The talk line and the dots are shared with Cube Count (49-bt-cubes.css). */\n.ro{display:flex;flex-direction:column;gap:var(--s-3);width:100%;max-width:980px;min-height:100%;margin:0 auto}\n.ro-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-4);padding-bottom:var(--s-2)}\n.ro-top{display:flex;align-items:center;justify-content:center;gap:var(--s-3);width:100%}\n/* the shape on a soft purple card, with a turn badge */\n.ro-card{position:relative;flex:none;width:min(40vw,150px);aspect-ratio:1;padding:var(--s-2);border-radius:var(--r-card);background:var(--bt-tint);\n  box-shadow:0 4px 0 var(--ledge-soft)}\n.ro-card .ro-t{display:block;width:100%;height:100%}\n.ro-card.got{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.ro-tag{position:absolute;top:-8px;left:-8px;display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:var(--bt);\n  color:var(--surface);box-shadow:0 3px 0 var(--bt-shade)}\n/* hint 2: the four turns */\n.ro-turns{display:grid;grid-template-columns:repeat(2,minmax(0,62px));gap:var(--s-2);padding:var(--s-2);border-radius:var(--r-btn);background:var(--star-tint);\n  box-shadow:0 3px 0 var(--star)}\n.ro-tn{display:block;aspect-ratio:1;border-radius:var(--r-chip);background:var(--surface)}\n.ro-tn .ro-t{display:block;width:100%;height:100%}\n/* choices */\n.ro-chs{display:grid;gap:var(--s-3);width:100%;max-width:400px}\n.ro-chs.n4{grid-template-columns:repeat(2,minmax(0,1fr))}\n.ro-chs.n3{grid-template-columns:repeat(3,minmax(0,1fr));max-width:460px}\n.ro-A .ro-card{width:min(56vw,220px)}\n.ro-ch.choice{aspect-ratio:1;min-height:var(--tap-pk);padding:var(--s-2)}\n.ro-ch .ro-t{display:block;width:100%;height:100%}\n.ro-ch:is(.right,.wrong)::before,.ro-ch.wrong::after{transform:scale(.8);transform-origin:top right}\n.ro-ch.right::after{transform:rotate(45deg) scale(.8)}\n.ro-c0{--p:var(--ill-blue);--p2:var(--ill-blue-2)}\n.ro-c1{--p:var(--ill-orange);--p2:var(--ill-orange-2)}\n.ro-c2{--p:var(--ill-green);--p2:var(--ill-green-2)}\n.ro-c3{--p:var(--ill-purple);--p2:var(--ill-purple-2)}\n.ro-c4{--p:var(--ill-aqua);--p2:var(--ill-aqua-2)}\n.ro-lg{fill:var(--ledge-soft)}\n.ro-sd{fill:var(--p2)}\n.ro-bs{fill:var(--p)}\n.ro-gl{fill:none;stroke:var(--ill-white);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;opacity:.75}\n.ro-sh{fill:var(--ill-grey-3)}\n/* landscape tablets: the shape on the left, the choices on the right */\n@media (orientation:landscape) and (min-width:700px){\n  .ro-main{flex-direction:row;gap:var(--s-7)}\n  .ro-top{flex-direction:column;width:auto}\n  .ro-card{width:min(190px,30vh)}\n  .ro-turns{grid-template-columns:repeat(4,minmax(0,56px))}\n  .ro-chs.n4{max-width:min(400px,calc(100vh - 264px))}\n  .ro-chs.n3{max-width:560px}\n}\n/* Brain Teasers: Unscramble (P3-15, src/js/88-bt-scramble.js). Tokens only; motion is transform and opacity. Letter tiles are raised\n   cream tiles (light face, tan ledge); empty boxes are dashed dents; a tile that left the tray leaves a dent behind. --ts is the tile\n   size: at least 48 px on every screen (rows wrap on a phone). */\n.us{--ts:64px;display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%;max-width:760px;min-height:100%;margin:0 auto}\n.us-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:var(--s-2);width:100%;padding:var(--s-3) var(--s-4) var(--s-4);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--bt-tint),0 4px 0 var(--ledge-soft)}\n.us-dots{display:flex;gap:6px;min-height:var(--tap);align-items:center}\n.us-dots i{width:12px;height:12px;border-radius:50%;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.us-dots i.now{box-shadow:inset 0 0 0 3px var(--bt)}\n.us-dots i.on{background:var(--bt);box-shadow:none}\n.us-pic{display:flex;align-items:center;justify-content:center;font-size:clamp(96px,20vh,160px);line-height:1}\n.us-pic .art{width:1em;height:1em}\n.us-clue{margin:0;font-size:var(--fs-4);font-weight:700;line-height:1.45;text-align:center;color:var(--ink)}\n.us-gap{display:inline-block;width:3em;height:1em;margin:0 .15em;border-bottom:4px solid var(--bt);vertical-align:-.2em}\n.us-msg{box-sizing:border-box;width:100%;min-height:26px;margin:0;font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink-2);text-align:center}\n.us-msg.good{color:var(--good-ink)}\n.us-msg.try{color:var(--try-ink)}\n.us-msg.hint{color:var(--bt-shade)}\n.us-row{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;gap:10px 8px;width:100%;padding:10px;\n  max-width:calc(var(--ts) * var(--cols, 6) + 8px * (var(--cols, 6) - 1) + 20px)}\n/* the word's boxes sit on a soft strip; the letters wait below it */\n.us-boxes{margin-top:auto;border-radius:var(--r-card);background:var(--bt-tint);padding-bottom:14px}\n.us-tray{margin-bottom:auto}\n/* boxes and tiles share one size and one letter */\n.us-box,.us-tile{position:relative;display:flex;align-items:center;justify-content:center;width:var(--ts);height:calc(var(--ts) + 4px);margin:0;padding:0;\n  border:0;border-radius:var(--r-btn);font:inherit;font-size:calc(var(--ts) * .55);font-weight:700;line-height:1;color:var(--ink);touch-action:manipulation}\n.us-box{background:var(--surface-2);box-shadow:inset 0 0 0 3px var(--ill-grey-1);cursor:default}\n.us-box::after{content:'';position:absolute;inset:7px;border-radius:calc(var(--r-btn) - 6px);border:2px dashed var(--ill-grey);opacity:.9}\n.us-box.full::after{content:none}\n.us-tile,.us-box.full{background:var(--ill-cream-1);box-shadow:inset 0 0 0 2px var(--ill-cream-2),inset 0 -5px 0 var(--ill-cream),0 4px 0 var(--ill-tan-2);cursor:pointer}\n.us-tile:active,.us-box.full:active{transform:translateY(3px);box-shadow:inset 0 0 0 2px var(--ill-cream-2),0 1px 0 var(--ill-tan-2)}\n.us-box.full span{animation:k-pop var(--t) var(--spring)}\n.us-tile.gone{background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line);cursor:default}\n.us-box.lk{box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade);cursor:default}\n.us-box.no{background:var(--try-tint);box-shadow:inset 0 0 0 3px var(--try),0 4px 0 var(--try-ink);color:var(--try-ink);animation:k-shake 240ms linear}\n.us-boxes.ok .us-box{background:var(--good-tint);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink);color:var(--good-ink);\n  animation:k-pop var(--t-slow) var(--spring)}\n.us-C{--ts:58px}\n.us-D{--ts:54px}\n.us-C .us-clue,.us-D .us-clue{padding:0 var(--s-6)}\n@media (max-width:480px){\n  .us-B{--ts:60px}\n  .us-C{--ts:50px}\n  .us-D{--ts:48px}\n  .us-clue{font-size:var(--fs-3)}\n  .us-msg{font-size:var(--fs-2)}\n}\n/* a short wide screen: the picture or sentence on the left, the boxes and letters on the right */\n@media (orientation:landscape) and (min-width:700px) and (max-height:700px){\n  .us{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);grid-template-rows:1fr auto auto 1fr;column-gap:var(--s-6);max-width:1000px;\n    align-items:center}\n  .us-card{grid-column:1;grid-row:1 / span 4;align-self:center}\n  .us-msg{grid-column:2;grid-row:1;align-self:end}\n  .us-boxes{grid-column:2;grid-row:2;margin:0;justify-self:center}\n  .us-tray{grid-column:2;grid-row:3;margin:0;justify-self:center}\n  .us-pic{font-size:clamp(120px,30vh,180px)}\n}\n/* Brain Teasers Shape Fit (P3-12, src/js/84-bt-shapefit.js). The screen reuses the tangram's layout and piece look (.tg, .tg-say,\n   .tg-svg, .tg-pc ... in 49-bt-tangram.css, the same part file); this file adds the region and the eight piece colours.\n   The region is the tangram's dark slate with a light grid; outlines of the pieces (bands A and B) are dashed; gold rim when solved. */\n.sf-reg{fill:var(--ill-ink-2)}\n.sf-grid{fill:none;stroke:var(--ill-grey-3);stroke-width:1.5px;opacity:.5}\n.sf-edge{fill:none;stroke:var(--ill-ink);stroke-width:2px;stroke-linejoin:round}\n.sf.won .sf-edge{stroke:var(--star);stroke-width:5px}\n.sf-ol{fill:none;stroke:var(--surface);stroke-width:2.5px;stroke-dasharray:7 5;stroke-linejoin:round;opacity:.85}\n.sf-c0{--p1:var(--ill-red-1);--p:var(--ill-red);--p2:var(--ill-red-2);--p3:var(--ill-red-3)}\n.sf-c1{--p1:var(--ill-blue-1);--p:var(--ill-blue);--p2:var(--ill-blue-2);--p3:var(--ill-blue-3)}\n.sf-c2{--p1:var(--ill-yellow-1);--p:var(--ill-yellow);--p2:var(--ill-yellow-2);--p3:var(--ill-yellow-3)}\n.sf-c3{--p1:var(--ill-green-1);--p:var(--ill-green);--p2:var(--ill-green-2);--p3:var(--ill-green-3)}\n.sf-c4{--p1:var(--ill-pink-1);--p:var(--ill-pink);--p2:var(--ill-pink-2);--p3:var(--ill-pink-3)}\n.sf-c5{--p1:var(--ill-orange-1);--p:var(--ill-orange);--p2:var(--ill-orange-2);--p3:var(--ill-orange-3)}\n.sf-c6{--p1:var(--ill-aqua-1);--p:var(--ill-aqua);--p2:var(--ill-aqua-2);--p3:var(--ill-aqua-3)}\n.sf-c7{--p1:var(--ill-purple-1);--p:var(--ill-purple);--p2:var(--ill-purple-2);--p3:var(--ill-purple-3)}\n/* Brain Teasers sudoku (P3-03, src/js/78-bt-sudoku.js). Tokens only; light from the top left (a white gloss on top, the shade tone\n   as a ledge below); motion is transform and opacity (calm mode and reduced motion stop it in 20-base.css).\n   The board is a purple tray (--bt, ledge --bt-shade) holding one white card per box; squares are tiles with a soft lower edge.\n   --cs (the square's side) is set by the layout in the JS; the padding and gaps here (6, 5, 2 px) must match FR there.\n   Portrait: talk line, board, controls. Landscape (.land): board left, talk line and controls right (.sd-side).\n   .zm (9x9 cells under 46 px, a phone): the zoom box (the selected box at 52 px squares) sits left of a 3-across pad. */\n.sd{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);width:100%;max-width:1000px;min-height:100%;margin:0 auto}\n.sd-say{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:640px;min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.sd-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.sd-msg.good{color:var(--good-ink)}\n.sd-msg.try{color:var(--try-ink)}\n.sd-msg.hint{color:var(--bt-shade)}\n.sd-spk{flex:none;order:2}\n.sd-main{display:flex;justify-content:center;flex:none}\n.sd-ctl{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%;max-width:640px}\n.sd-side{display:none}\n\n/* ---------- the board ---------- */\n.sd-board{display:grid;grid-template-columns:repeat(var(--bx),auto);gap:var(--fb);padding:var(--fp);border-radius:16px;\n  background:linear-gradient(var(--hi),var(--hi-0) 40px) var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 6px 0 var(--bt-shade)}\n.sd-box{display:grid;grid-template-columns:repeat(var(--bw),var(--cs));grid-auto-rows:var(--cs);gap:var(--fc);border-radius:10px;background:var(--line);overflow:hidden}\n.sd-n9 .sd-box{border-radius:7px}\n.sd-c{position:relative;display:grid;place-items:center;width:var(--cs);height:var(--cs);min-width:0;padding:0;border:0;border-radius:0;\n  background:var(--surface);color:var(--bt);font-family:var(--font-display);font-size:calc(var(--cs) * .56);font-weight:700;line-height:1;\n  cursor:pointer;touch-action:manipulation;box-shadow:inset 0 -3px 0 var(--surface-2);-webkit-tap-highlight-color:transparent}\n.sd-c>*{pointer-events:none}\n.sd-c b{font-weight:700}\n.sd-c .sd-pic{width:74%;height:74%}\n/* a given number is printed in ink; the child's are purple; a hint's is ink on star-yellow */\n.sd-c.giv{color:var(--ink);background:var(--surface);box-shadow:inset 0 -3px 0 var(--line)}\n.sd-c.ent{color:var(--bt)}\n.sd-c.hn{color:var(--ink);background:var(--star-tint);box-shadow:inset 0 -3px 0 var(--star)}\n/* the selected square, its row, column and box, and the same number elsewhere */\n.sd-c.rc{background:var(--surface-2)}\n.sd-c.same{background:var(--bt-tint);color:var(--bt-shade)}\n.sd-c.same.giv{color:var(--ink)}\n.sd-c.sel{background:var(--bt-tint);box-shadow:inset 0 0 0 3px var(--bt),inset 0 -6px 0 var(--bt)}\n/* hints: the house glows soft yellow, the square gets a star ring */\n.sd-c.hh{background:var(--star-tint)}\n.sd-c.hl{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n.sd-c.sel.hl{box-shadow:inset 0 0 0 4px var(--star),inset 0 0 0 7px var(--bt)}\n/* a clash (C, D) and the number a wrong one ran into (A, B): amber with a dashed ring and a warning mark, never red */\n.sd-c.cf,.sd-c.cl{background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:-5px}\n.sd-c.cf.sel{box-shadow:inset 0 0 0 3px var(--try),inset 0 -6px 0 var(--try)}\n.sd-wn{position:absolute;top:1px;right:1px;display:grid;line-height:0;color:var(--try-ink)}\n.sd-wn .ic{width:max(12px,calc(var(--cs) * .3));height:max(12px,calc(var(--cs) * .3))}\n/* a wrong symbol (A, B) wiggles, then hops out */\n.sd-c.bad{background:var(--try-tint);color:var(--try-ink)}\n.sd-c.bad>*{animation:sd-out 650ms var(--ease) forwards}\n@keyframes sd-out{15%{transform:translateX(-12%)}30%{transform:translateX(12%)}45%{transform:translateX(-6%);opacity:1}100%{transform:translateY(-55%) scale(.5);opacity:0}}\n.sd-c.pop>*{animation:k-pop 420ms var(--ease)}\n/* pencil marks: a small grid of 3 across */\n.sd-nts{position:absolute;inset:3px;display:grid;grid-template-columns:repeat(3,1fr);place-items:center;font-style:normal;\n  font-size:max(9px,calc(var(--cs) * .27));font-weight:700;line-height:1;color:var(--ink-3)}\n.sd-c.sel .sd-nts{color:var(--bt-shade)}\n.sd.win .sd-c>*{animation:k-pop 520ms var(--ease) both}\n.sd.win .sd-box:nth-child(2n) .sd-c>*{animation-delay:90ms}\n.sd.win .sd-box:nth-child(3n) .sd-c>*{animation-delay:180ms}\n\n/* ---------- zoom box (9x9 on a phone): the selected box at full size ---------- */\n.sd-zoom{--cs:48px;display:grid;flex:none;grid-template-columns:repeat(3,var(--cs));grid-auto-rows:var(--cs);gap:2px;padding:2px;border-radius:12px;\n  background:var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 5px 0 var(--bt-shade)}\n.sd-zoom[hidden]{display:none}\n.sd-zoom .sd-c:first-child{border-radius:10px 0 0 0}\n.sd-zoom .sd-c:nth-child(3){border-radius:0 10px 0 0}\n.sd-zoom .sd-c:nth-child(7){border-radius:0 0 0 10px}\n.sd-zoom .sd-c:last-child{border-radius:0 0 10px 0}\n\n/* ---------- the pad: the question screen's keys (padHTML), symbols 1..n with how many are left ---------- */\n.sd .sd-pad{gap:var(--s-2);width:100%;max-width:none;margin:0}\n.sd .sd-pad.row{grid-template-columns:repeat(var(--n),minmax(0,1fr))}\n.sd .sd-pad.g3{grid-template-columns:repeat(3,minmax(0,1fr))}\n.sd .sd-pad .key{position:relative;min-width:0;min-height:52px;font-size:var(--fs-5)}\n.sd .sd-pad .key .ic{width:28px;height:28px}\n.sd-n9 .sd-pad.row .key.t{grid-column:span 3}\n.sd-n6 .sd-pad.row .key.t,.sd-n6 .sd-pad.g3 .key.t{grid-column:span 1}\n.sd-n6 .sd-pad.row .key.t{grid-column:span 2}\n.sd-kf{display:grid;place-items:center;font-family:var(--font-display);line-height:1;pointer-events:none}\n/* how many are left: a row of dots along the bottom of the key (a tick in a green disc when none are left) */\n.sd-left{position:absolute;left:0;right:0;bottom:5px;display:flex;justify-content:center;gap:2px;height:14px;align-items:center;pointer-events:none}\n.sd-left i{width:5px;height:5px;border-radius:50%;background:var(--bt)}\n.sd-n9 .sd-left{gap:1px}\n.sd-n9 .sd-left i{width:4px;height:4px}\n.sd .sd-pad .sd-left .ic{width:14px;height:14px;padding:2px;box-sizing:content-box;border-radius:50%;background:var(--good-tint);color:var(--good-ink)}\n.sd .sd-pad .sd-sym .sd-kf{margin-bottom:8px}\n.sd .sd-pad .key.zero{background:var(--surface-2);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line),var(--ledge) var(--line)}\n.sd .sd-pad .key.t{gap:var(--s-1);font-size:var(--fs-3);font-weight:700}\n.sd .sd-pad .key.t span{pointer-events:none}\n.sd .sd-pad.g3 .key.t span{display:none}\n.sd .sd-pad .key.on{background:var(--bt-tint);color:var(--bt-shade);box-shadow:inset 0 0 0 3px var(--bt),var(--ledge) var(--bt-shade)}\n/* with Notes on, the digits on the keys turn small and purple, so it is clear they will go in small */\n.sd.nt .sd-sym .sd-kf{font-size:var(--fs-3);color:var(--bt)}\n/* 4x4: four big keys; band A keys carry the animals */\n.sd-n4 .sd-pad .key{min-height:var(--tap-pk);font-size:var(--fs-6)}\n.sd-A .sd-pad .sd-kf{font-size:48px}\n\n/* two rows of six (9x9 on a phone): 1-5 and Erase, then 6-9, Notes and Undo */\n.sd .sd-pad.r6{grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--s-1) 6px}\n.sd .sd-pad.r6 .k[data-k=\"del\"]{grid-column:6;grid-row:1}\n.sd .sd-pad.r6 .key{min-height:var(--tap)}\n.sd .sd-pad.r6 .key.t span{display:none}\n\n/* ---------- 9x9 on a phone (.zm, portrait): the zoom box and the talk line share a row under the board ---------- */\n.sd-zrow{display:none}\n.sd.zm:not(.land){gap:var(--s-2)}\n.sd.zm:not(.land) .sd-zrow{display:flex;align-items:stretch;gap:var(--s-2);width:100%}\n.sd.zm:not(.land) .sd-say{display:block;flex:1;min-width:0;height:auto;max-height:152px;overflow:auto;padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3)}\n.sd.zm:not(.land) .sd-spk{float:right;margin:0 0 var(--s-1) var(--s-1)}\n.sd.zm:not(.land) .sd-msg{padding-top:var(--s-1)}\n/* landscape with the zoom box: zoom box left, pad right in the side column */\n.sd.land.zm .sd-ctl{flex-direction:row;align-items:flex-start;justify-content:center;gap:var(--s-3)}\n.sd.land.zm .sd-pad{flex:1}\n.sd.land.zm .sd-pad .key{min-height:var(--tap)}\n\n/* ---------- landscape ---------- */\n.sd.land{flex-direction:row;align-items:center;justify-content:center;gap:var(--s-6)}\n.sd.land .sd-side{display:flex;flex-direction:column;gap:var(--s-3);flex:none;width:min(380px,42%)}\n.sd.land .sd-say{align-self:stretch}\n.sd.land .sd-ctl{max-width:none}\n\n/* P6-01: the focus ring sits inside a square of the grid (the box clips anything outside) */\n.sd-c:focus-visible{outline-offset:-4px}\n/* Brain Teasers Tangrams (P3-11, src/js/80-bt-tangram.js). Tokens only; light from the top left; motion is transform and opacity\n   (calm mode and reduced motion stop it in 20-base.css). One svg holds the board (the silhouette) and the tray; the JS sizes it.\n   Portrait: talk line, svg, buttons. Landscape (.land): svg left, a side column (.tg-side) with the talk line and the buttons.\n   Pieces: .tg-c0 .. .tg-c6 set the four tones of a piece (light, base, shade, deep); a ledge (.tg-ld) in the shade tone below,\n   the base (.tg-bs) with a deep outline, the light edges (.tg-hi) on the sides facing the top left, a ring (.tg-rg) for picked\n   (purple), the hint's piece (purple, dashed) and does-not-fit (amber, dashed: never red); the hint's slot glows star yellow. */\n.tg{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-2);width:100%;max-width:1100px;min-height:100%;margin:0 auto}\n.tg.land{flex-direction:row;align-items:center;gap:var(--s-4)}\n.tg-say{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:640px;min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.tg-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.tg-msg.good{color:var(--good-ink)}\n.tg-msg.try{color:var(--try-ink)}\n.tg-msg.hint{color:var(--bt-shade)}\n.tg-spk{flex:none;order:2}\n.tg-main{display:flex;justify-content:center;flex:none}\n.tg-side{display:none}\n.tg.land .tg-side{display:flex;flex:none;flex-direction:column;gap:var(--s-3);width:244px}\n.tg-ctl{display:flex;justify-content:center;flex-wrap:wrap;gap:var(--s-2);width:100%;max-width:640px}\n.tg.land .tg-ctl{flex-direction:column;align-items:stretch}\n.tg-ctl .btn{min-height:var(--tap);min-width:104px}\n.tg-ctl .btn[hidden]{display:none}\n.tg-svg{display:block;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;overflow:visible}\n/* board and tray */\n.tg-board{fill:var(--surface);stroke:var(--line);stroke-width:2px}\n.tg-tray{fill:var(--bt-tint);stroke:var(--bt-tint);stroke-width:2px}\n/* the silhouette: dark slate, a shadow along its top-left inside edge, a thin deep rim */\n.tg-sb{fill:var(--ill-ink-2)}\n.tg-sl{fill:var(--ill-grey-3)}\n.tg-se{fill:none;stroke:var(--ill-ink);stroke-width:2px;stroke-linejoin:round}\n.tg.won .tg-se{stroke:var(--star);stroke-width:5px}\n/* outlines of the missing pieces (bands A and B) and the hint's slot */\n.tg-ol{fill:none;stroke:var(--surface);stroke-width:2.5px;stroke-dasharray:7 5;stroke-linejoin:round;opacity:.85}\n.tg-hl{fill:var(--star-tint);fill-opacity:.35;stroke:var(--star);stroke-width:4px;stroke-dasharray:9 6;stroke-linejoin:round;pointer-events:none}\n/* pieces */\n.tg-pc{cursor:grab}\n.tg-pc.fixed{pointer-events:none;cursor:default}\n.tg-pc polygon,.tg-pc path{stroke-linejoin:round;stroke-linecap:round}\n.tg-c0{--p1:var(--ill-red-1);--p:var(--ill-red);--p2:var(--ill-red-2);--p3:var(--ill-red-3)}\n.tg-c1{--p1:var(--ill-blue-1);--p:var(--ill-blue);--p2:var(--ill-blue-2);--p3:var(--ill-blue-3)}\n.tg-c2{--p1:var(--ill-yellow-1);--p:var(--ill-yellow);--p2:var(--ill-yellow-2);--p3:var(--ill-yellow-3)}\n.tg-c3{--p1:var(--ill-green-1);--p:var(--ill-green);--p2:var(--ill-green-2);--p3:var(--ill-green-3)}\n.tg-c4{--p1:var(--ill-pink-1);--p:var(--ill-pink);--p2:var(--ill-pink-2);--p3:var(--ill-pink-3)}\n.tg-c5{--p1:var(--ill-orange-1);--p:var(--ill-orange);--p2:var(--ill-orange-2);--p3:var(--ill-orange-3)}\n.tg-c6{--p1:var(--ill-aqua-1);--p:var(--ill-aqua);--p2:var(--ill-aqua-2);--p3:var(--ill-aqua-3)}\n.tg-sh{fill:var(--drop);display:none}\n.tg-pc.lift .tg-sh{display:inline}\n.tg-ld{fill:var(--p2);stroke:var(--p3);stroke-width:2px}\n.tg-bs{fill:var(--p);stroke:var(--p3);stroke-width:2px}\n.tg-hi{fill:none;stroke:var(--p1);stroke-width:3.5px}\n.tg-rg{fill:none;stroke:none;stroke-width:5px}\n.tg-pc.fixed .tg-ld{display:none} /* pieces placed for you lie flat in the picture; the child's stand on a ledge */\n.tg-pc.sel .tg-rg{stroke:var(--bt)}\n.tg-pc.tip .tg-rg{stroke:var(--bt);stroke-width:6px;stroke-dasharray:9 6}\n.tg-pc.bad .tg-rg{stroke:var(--try-ink);stroke-dasharray:6 5}\n.tg-pc.lift .tg-pa{transform:translate(-2px,-4px)}\n.tg-pa{transform-box:fill-box;transform-origin:center}\n.tg.won .tg-pa{animation:k-pop 520ms var(--ease) var(--d,0ms) both}\n/* Brain Teasers: Word Search (P3-15, src/js/87-bt-wsearch.js). Tokens only; motion is transform and opacity. --cs (the square size)\n   and --n come from the JS layout. A found word: a soft band with round ends under its letters (SVG, the word's colour) and, in the\n   list, the same tint, a strike-through and a tick (never colour alone). On a phone the puzzle uses the stage's side padding too,\n   so an 8 x 8 grid keeps 44 px squares at 380 px (BRAIN_TEASERS 8, dense grids). */\n.ws{display:flex;flex-direction:column;gap:var(--s-3);width:calc(100% + var(--s-4));min-height:100%;margin:0 calc(var(--s-2) * -1)}\n.ws-say{flex:none;display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.ws-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink)}\n.ws-msg.good{color:var(--good-ink)}\n.ws-msg.try{color:var(--try-ink)}\n.ws-msg.hint{color:var(--bt-shade)}\n.ws-spk{flex:none}\n.ws-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3)}\n/* the grid: a white card, letters on top of the bands */\n.ws-board{position:relative;display:grid;grid-template-columns:repeat(var(--n),var(--cs,44px));grid-auto-rows:var(--cs,44px);padding:4px;\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint),0 4px 0 var(--ledge-soft);\n  touch-action:none;-webkit-user-select:none;user-select:none;cursor:pointer;-webkit-tap-highlight-color:transparent}\n.ws-board.won{animation:k-pop var(--t-slow) var(--spring)}\n.ws-c{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;font-size:calc(var(--cs,44px) * .56);font-weight:700;\n  line-height:1;color:var(--ink);pointer-events:none}\n.ws-ov{position:absolute;inset:4px;width:calc(100% - 8px);height:calc(100% - 8px);overflow:visible;pointer-events:none}\n.ws-band{stroke:var(--wc);stroke-width:.78;stroke-linecap:round;animation:ws-in var(--t-slow) var(--ease)}\n@keyframes ws-in{from{opacity:0}to{opacity:1}}\n.ws-live{stroke:var(--bt);stroke-width:.8;stroke-linecap:round;opacity:.28}\n.ws-live.no{stroke:var(--try);opacity:.6;animation:ws-no .9s var(--ease) forwards}\n@keyframes ws-no{0%,50%{opacity:.6}100%{opacity:0}}\n.ws-hl{stroke:var(--bt-tint);stroke-width:.96;stroke-linecap:round}\n.ws-ring{fill:none;stroke:var(--star-shade);stroke-width:.1}\n.ws-pk{fill:var(--bt-tint);stroke:var(--bt);stroke-width:.08}\n/* the words to find */\n.ws-side{flex:none;display:flex;flex-direction:column;align-items:center;gap:var(--s-2);width:100%}\n.ws-count{margin:0;font-size:var(--fs-2);font-weight:700;color:var(--ink-2)}\n.ws-list{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 8px;margin:0;padding:0;list-style:none}\n.ws-w{display:inline-flex;align-items:center;gap:4px;min-height:36px;padding:2px 14px;border-radius:var(--r-pill);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line);font-size:var(--fs-3);font-weight:700;letter-spacing:.04em;color:var(--ink)}\n.ws-w.got{padding-right:10px;background:var(--wc);box-shadow:none;color:var(--ink-2)}\n.ws-w.got .ws-t{text-decoration:line-through;text-decoration-thickness:3px}\n.ws-w .ic{flex:none;color:var(--good-ink)}\n.ws-D .ws-w{font-size:var(--fs-2)}\n.wk-yellow{--wc:var(--ill-yellow-1)}\n.wk-green{--wc:var(--ill-green-1)}\n.wk-aqua{--wc:var(--ill-aqua-1)}\n.wk-pink{--wc:var(--ill-pink-1)}\n.wk-purple{--wc:var(--ill-purple-1)}\n.wk-orange{--wc:var(--ill-orange-1)}\n.wk-blue{--wc:var(--ill-blue-1)}\n.wk-hint{--wc:var(--star-tint)}\n.ws-band.wk-hint{stroke:var(--star)}\n/* wide screens: the grid on the left, the talk line and the words on the right */\n.ws.wide{display:grid;grid-template-columns:auto minmax(0,320px);grid-template-rows:auto 1fr;align-content:center;justify-content:center;\n  gap:var(--s-4) var(--s-6);width:100%;margin:0}\n.ws.wide .ws-main{display:contents}\n.ws.wide .ws-board{grid-column:1;grid-row:1 / span 2;align-self:center}\n.ws.wide .ws-say{grid-column:2;grid-row:1;align-self:end}\n.ws.wide .ws-side{grid-column:2;grid-row:2;align-items:flex-start;align-self:start}\n.ws.wide .ws-list{justify-content:flex-start}\n@media (max-width:480px){\n  .ws-msg{font-size:var(--fs-2)}\n  .ws-w{min-height:32px;padding:2px 10px;font-size:var(--fs-2)}\n}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- Brain Teasers: Mazes (P3-08; BRAIN_TEASERS.md 5.4, 7, 8) ----------
   A perfect maze (one path between any two cells) from a recursive backtracker; start and goal are the two cells farthest apart
   (two BFS passes), so the way is always long for the size. Built at runtime from the seeded rnd, solvable by construction and
   checked again by a state BFS (the par).

   Bands and levels (MZ.size; four levels per size step; on a phone capped by MZ.cap so squares stay 28 px or more, R-01b):
     A  5x5 (levels 1-6), then 6x6; strong bias toward long straight corridors; wide paths.
     B  8x8, 9x9, 10x10.
     C  12x12, 13x13, 14x14 + 3 stars in dead ends off the way; the flag's gate opens when all 3 are picked up.
     D  16x16, 17x17, 18x18 + keys and doors (1 key on levels 1-6, 2 keys on 7-12). A door sits on the way; its key is at the end
        of a side branch that leaves the way before that door (key 2's branch after door 1). Steps counter with a par.
   The par is the shortest walk that wins: a BFS over (cell, items held), so it includes trips into the star and key branches.

   Puzzle (JSON): {b band, w, h, o: one hex digit per cell, the open sides (1 up, 2 right, 4 down, 8 left), s start, g goal,
     stars: [cells] (C), keys: [cells] and doors: [cells] (D, key i opens door i), par}.
   State (api.saveState): {t: the trail from s (cells), m: items held (bit i = star or key i), dead: dead ends found, steps, mis}.

   Input (one canvas, touch-action none): drag from the bear; the trail follows cell to cell toward the finger and never crosses a
   wall; dragging back over the trail erases it; lifting the finger keeps the place. A tap on a cell in a straight open line from
   the bear walks there, a tap on the trail goes back to that spot. The Arrows button shows a 4-arrow pad (remembered in
   S.bt.maze.pad); the keyboard arrows work too. Items picked up stay picked up when the trail is erased.
   Mistakes: each dead end reached that holds nothing (start, flag, stars and keys are not mistakes). The type allows 2.
   Hints: 1) a ring flashes round the next thing to reach (the flag, or the next star or key) and the line says which way it lies
   (AUD-BT M-3: it was an arrow beside the bear, which mostly pointed at a wall). 2) dots on the next 5 cells of the
   route. 3) dots on the route through the next junction and one cell past it (at least as many as tier 2). Hints never show the
   cell the route ends on, so a hint never draws the whole way.
   Drawing: a static layer (floor and walls, merged into long strokes, three passes: shade, base, highlight; light from the top
   left) is drawn once per size; each move redraws only the dynamic layer over it. Colours are read from the tokens. */
const MZ = {
  DX: [0, 1, 0, -1], DY: [-1, 0, 1, 0], BIT: [1, 2, 4, 8], DIR: ['up', 'right', 'down', 'left'],
  HEX: '0123456789abcdef',
  BIAS: { A: 0.7, B: 0.35, C: 0.2, D: 0.12 }, // chance to keep going straight while carving
  HUE: { A: 'green', B: 'green', C: 'blue', D: 'purple' }, // wall colour by band
  KEY_HUE: ['yellow', 'aqua'],
  cur: null, // the maze on screen (for the smoke bot): {p, st, at(cell), draw()}

  size(band, level) {
    const l = Math.max(1, Math.min(12, +level || 1));
    if (band == 'A') return l <= 6 ? 5 : 6;
    const base = { B: 8, C: 12, D: 16 }[band] || 8;
    return base + Math.floor((l - 1) / 4);
  },
  // R-01b: on a phone a maze is never so big that its squares are under MIN_PX (BRAIN_TEASERS 8: 28 px). make() caps the side by
  // the screen: the board gets about the short side less 40 px (portrait) or the height less 130 px (landscape), with an 8 px
  // margin on each side. At 380 x 780 that is 11 squares (bands C and D are 12-18). Tablets (short side 600 px and up) and the
  // tests (no screen) keep the level's size. The puzzle is stored whole, so a turned phone does not change a maze in play.
  MIN_PX: 28,
  cap() {
    if (typeof innerWidth != 'number' || typeof innerHeight != 'number' || !(innerWidth > 0) || !(innerHeight > 0)) return 99;
    const w = innerWidth, h = innerHeight;
    if (Math.min(w, h) >= 600) return 99;
    const bs = h >= w ? w - 40 : h - 130;
    return Math.max(5, Math.floor((bs - 16) / MZ.MIN_PX));
  },
  pop: m => (m & 1) + (m >> 1 & 1) + (m >> 2 & 1) + (m >> 3 & 1),
  decode: s => Array.from(s, c => parseInt(c, 16)),

  // Recursive backtracker (iterative). Returns the open-sides bitmask of every cell.
  carve(w, h, rnd, bias) {
    const N = w * h, o = new Array(N).fill(0), seen = new Uint8Array(N);
    const first = Math.floor(rnd() * N), stack = [first], last = [-1];
    seen[first] = 1;
    while (stack.length) {
      const c = stack[stack.length - 1], x = c % w, y = (c - x) / w, opts = [];
      for (let d = 0; d < 4; d++) {
        const nx = x + MZ.DX[d], ny = y + MZ.DY[d];
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && !seen[ny * w + nx]) opts.push(d);
      }
      if (!opts.length) { stack.pop(); last.pop(); continue; }
      const ld = last[last.length - 1];
      const d = ld >= 0 && opts.includes(ld) && rnd() < bias ? ld : opts[Math.floor(rnd() * opts.length)];
      const n = c + MZ.DX[d] + MZ.DY[d] * w;
      o[c] |= MZ.BIT[d];
      o[n] |= MZ.BIT[(d + 2) % 4];
      seen[n] = 1;
      stack.push(n);
      last.push(d);
    }
    return o;
  },
  // neighbours through open sides
  nbrs(o, w, c) {
    const out = [];
    for (let d = 0; d < 4; d++) if (o[c] & MZ.BIT[d]) out.push(c + MZ.DX[d] + MZ.DY[d] * w);
    return out;
  },
  // plain BFS: {dist, prev}
  bfs(o, w, from) {
    const N = o.length, dist = new Array(N).fill(-1), prev = new Array(N).fill(-1), q = [from];
    dist[from] = 0;
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      for (const n of MZ.nbrs(o, w, c)) if (dist[n] < 0) { dist[n] = dist[c] + 1; prev[n] = c; q.push(n); }
    }
    return { dist, prev };
  },
  far(dist) { let b = 0; for (let i = 1; i < dist.length; i++) if (dist[i] > dist[b]) b = i; return b; },

  items: p => p.stars || p.keys || [],

  // Shortest winning walk from `from` holding items `mask`: a BFS over (cell, items held). Returns the cells (from first) or null.
  // Rules: door i needs key i; in band C the flag's cell opens when every star is held; stepping on an item picks it up.
  route(p, o, from = p.s, mask = 0) {
    const w = p.w, N = w * p.h, items = MZ.items(p), M = 1 << items.length, full = M - 1;
    const itemAt = new Array(N).fill(-1), doorAt = new Array(N).fill(-1);
    items.forEach((c, i) => { itemAt[c] = i; });
    (p.doors || []).forEach((c, i) => { doorAt[c] = i; });
    const m0 = mask | (itemAt[from] >= 0 ? 1 << itemAt[from] : 0), prev = new Int32Array(N * M).fill(-2), q = [from * M + m0];
    prev[q[0]] = -1;
    for (let i = 0; i < q.length; i++) {
      const s = q[i], c = Math.floor(s / M), m = s % M;
      if (c == p.g && (!p.stars || m == full)) {
        const out = [];
        for (let t = s; t >= 0; t = prev[t]) out.push(Math.floor(t / M));
        return out.reverse();
      }
      for (const n of MZ.nbrs(o, w, c)) {
        if (doorAt[n] >= 0 && !(m >> doorAt[n] & 1)) continue;
        if (p.stars && n == p.g && m != full) continue;
        const nm = m | (itemAt[n] >= 0 ? 1 << itemAt[n] : 0), ns = n * M + nm;
        if (prev[ns] != -2) continue;
        prev[ns] = s;
        q.push(ns);
      }
    }
    return null;
  },

  // Build a level. Returns the puzzle or null (the caller carves again with the next numbers from rnd).
  build(band, level, rnd) {
    const n = Math.min(MZ.size(band, level), MZ.cap()), w = n, h = n, N = w * h;
    const o = MZ.carve(w, h, rnd, Math.max(0.05, MZ.BIAS[band] - (level - 1) * 0.01));
    let s = MZ.far(MZ.bfs(o, w, 0).dist);
    const b1 = MZ.bfs(o, w, s);
    let g = MZ.far(b1.dist);
    const xy = c => c % w + Math.floor(c / w);
    if (xy(g) < xy(s)) [s, g] = [g, s]; // the start is the end nearer the top left
    const way = [];
    for (let c = MZ.bfs(o, w, s).prev, t = g; t >= 0; t = c[t]) way.push(t);
    way.reverse();
    // every cell off the way: where its branch leaves the way (index on the way) and how deep it lies
    const at = new Array(N).fill(-1), dep = new Array(N).fill(0), q = way.slice();
    way.forEach((c, i) => { at[c] = i; });
    for (let i = 0; i < q.length; i++) for (const nb of MZ.nbrs(o, w, q[i])) if (at[nb] < 0) { at[nb] = at[q[i]]; dep[nb] = dep[q[i]] + 1; q.push(nb); }
    const leaves = [];
    for (let c = 0; c < N; c++) if (MZ.pop(o[c]) == 1 && c != s && c != g) leaves.push(c);
    const p = { b: band, w, h, o: o.map(m => MZ.HEX[m]).join(''), s, g };
    // closest to a wanted depth, with a little seeded jitter
    const byDepth = (cs, want) => cs.map(c => [Math.abs(dep[c] - want) + rnd() * 1.5, c]).sort((a, b) => a[0] - b[0]).map(e => e[1]);
    if (band == 'C') {
      const cand = byDepth(leaves, 1.5 + level * 0.55), md = (a, b) => Math.abs(a % w - b % w) + Math.abs(Math.floor(a / w) - Math.floor(b / w));
      let stars = null;
      for (const [minDep, gap, ownBranch] of [[2, 3, true], [2, 2, false], [1, 1, false]]) {
        const got = [];
        for (const c of cand) {
          if (dep[c] < minDep || got.some(x => md(x, c) < gap || (ownBranch && at[x] == at[c]))) continue;
          got.push(c);
          if (got.length == 3) break;
        }
        if (got.length == 3) { stars = got; break; }
      }
      if (!stars) return null;
      p.stars = stars.sort((a, b) => a - b);
    }
    if (band == 'D') {
      const L = way.length, nk = level <= 6 ? 1 : 2, spans = nk == 1 ? [[0.45, 0.7]] : [[0.3, 0.45], [0.65, 0.82]];
      const keys = [], doors = [];
      let lo = 0;
      for (const [a, b] of spans) {
        const idx = [];
        for (let i = Math.max(2, Math.ceil(L * a)); i <= Math.min(L - 3, Math.floor(L * b)); i++) if (MZ.pop(o[way[i]]) == 2) idx.push(i);
        let ok = false;
        for (const i of idx.map(i => [rnd(), i]).sort((x, y) => x[0] - y[0]).map(e => e[1])) {
          const cand = byDepth(leaves.filter(c => at[c] >= lo && at[c] < i && dep[c] >= 2), 2 + level * 0.5);
          if (!cand.length) continue;
          keys.push(cand[0]);
          doors.push(way[i]);
          lo = i + 1;
          ok = true;
          break;
        }
        if (!ok) return null;
      }
      p.keys = keys;
      p.doors = doors;
    }
    const r = MZ.route(p, o);
    if (!r) return null;
    p.par = r.length - 1;
    return p;
  },

  // the cells a hint draws for tier 2 or 3, from a route (head first); never the route's last cell
  hintCells(o, route, tier) {
    const end = route.length - 1;
    if (end < 2) return [];
    let n = 6;
    if (tier >= 3) {
      let j = 1;
      while (j < end && MZ.pop(o[route[j]]) < 3) j++;
      n = Math.max(6, j + 2);
    }
    return route.slice(1, Math.min(n, end));
  },
  // what tier 1 points at: the first star or key still to pick up on the route, else the flag
  target(p, route, mask) {
    const items = MZ.items(p);
    for (let i = 1; i < route.length; i++) {
      const k = items.indexOf(route[i]);
      if (k >= 0 && !(mask >> k & 1)) return { c: route[i], kind: p.stars ? 'star' : 'key', k };
    }
    return { c: p.g, kind: 'flag', k: -1 };
  },
  // a saved state that fits this puzzle, or null
  fit(sv, p, o) {
    if (!sv || !Array.isArray(sv.t) || !sv.t.length || sv.t[0] !== p.s) return null;
    for (let i = 1; i < sv.t.length; i++) if (!MZ.nbrs(o, p.w, sv.t[i - 1]).includes(sv.t[i])) return null;
    return { t: sv.t.slice(), m: +sv.m | 0, dead: Array.isArray(sv.dead) ? sv.dead.filter(c => c >= 0 && c < o.length) : [], steps: +sv.steps | 0, mis: +sv.mis | 0 };
  },

  // small inline pictures for the side panel (tokens only)
  keySvg(k, on) {
    const hu = MZ.KEY_HUE[k] || 'yellow', bow = k ? '<rect x="4" y="9" width="12" height="12" rx="3" fill="none" stroke-width="5"/>'
      : '<circle cx="10" cy="15" r="6" fill="none" stroke-width="5"/>';
    return `<svg class="mz-key${on ? ' on' : ''}" viewBox="0 0 40 30" width="40" height="30" aria-hidden="true"><g stroke="var(--ill-${hu}-3)" ` +
      `transform="translate(1 1.5)">${bow}<path d="M16 15H36M30 15V22M35 15V20" fill="none" stroke-width="5" stroke-linecap="round"/></g>` +
      `<g stroke="var(--ill-${hu})">${bow}<path d="M16 15H36M30 15V22M35 15V20" fill="none" stroke-width="5" stroke-linecap="round"/></g></svg>`;
  },
  flagSvg() {
    return '<svg class="mz-fl" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true"><ellipse cx="11" cy="26" rx="8" ry="3" fill="var(--ill-green-2)"/>' +
      '<path d="M9 26V4" stroke="var(--ill-grey-3)" stroke-width="3" stroke-linecap="round"/><path d="M10 4H25L21 9.5L25 15H10Z" fill="var(--ill-red-2)"/>' +
      '<path d="M10 4H24L20.5 9H10Z" fill="var(--ill-red)"/></svg>';
  },
};

BT.reg({
  id: 'maze', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make(band, level, rnd) {
    for (let t = 0; t < 40; t++) {
      const p = MZ.build(band, level, rnd);
      if (p) return p;
    }
    throw new Error('maze: no layout for ' + band + level);
  },
  solve(p) { return MZ.route(p, MZ.decode(p.o)); },

  mount(el, p, api) {
    const band = p.b || api.band, w = p.w, h = p.h, o = MZ.decode(p.o), items = MZ.items(p), full = (1 << items.length) - 1;
    const doorAt = c => (p.doors || []).indexOf(c), itemAt = c => items.indexOf(c);
    const st = MZ.fit(api.loadState(), p, o) || { t: [p.s], m: 0, dead: [], steps: 0, mis: 0 };
    const padOn = !!(BT.st().maze && BT.st().maze.pad);
    let won = false, dirty = false, raf = 0, hintT = 0, arrowT = 0, hint = [], drag = null, flash = -1;
    const timers = new Set(), later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };

    // ---- markup ----
    const goalLine = p.stars ? `<span class="mz-sts">${p.stars.map((c, i) => ico('star', 30, 'mz-st' + (st.m >> i & 1 ? ' on' : ''))).join('')}</span><b class="mz-n"></b>`
      : p.keys ? `<span class="mz-keys">${p.keys.map((c, i) => MZ.keySvg(i, st.m >> i & 1)).join('')}</span><span class="mz-steps">Steps <b class="mz-sn">0</b> <i>Par ${p.par}</i></span>`
      : `${MZ.flagSvg()}<b class="mz-n">Get to the flag</b>`;
    const ab = (d, ic) => UI.ibtn(ic, 'Go ' + MZ.DIR[d], { cls: 'mz-ab', attrs: `data-d="${d}"` });
    el.innerHTML = `<div class="mz mz-${band}"><div class="mz-board"><canvas class="mz-cv" role="img" aria-label="Maze"></canvas>` +
      `<span class="mz-arrow" hidden></span></div><div class="mz-side"><div class="mz-stat">${goalLine}</div>` +
      `<p class="mz-msg" role="status" aria-live="polite"></p><div class="mz-ctl">` +
      `${UI.btn('Arrows', { icon: 'gamepad', cls: 'mz-tog', attrs: `aria-pressed="${padOn}"` })}` +
      `<div class="mz-pad"${padOn ? '' : ' hidden'}>${ab(0, 'arrow-up')}${ab(3, 'arrow-left')}${ab(2, 'arrow-down')}${ab(1, 'arrow-right')}</div></div></div></div>`;
    const root = el.querySelector('.mz'), cv = root.querySelector('.mz-cv'), ctx = cv.getContext('2d'), msgEl = root.querySelector('.mz-msg');
    const arrow = root.querySelector('.mz-arrow'), side = root.querySelector('.mz-side'), pad = root.querySelector('.mz-pad');
    const css = getComputedStyle(document.documentElement), tok = n => css.getPropertyValue('--' + n).trim() || 'gray';
    const hue = MZ.HUE[band] || 'green';
    const C = {
      floor: tok('ill-cream-1'), floor2: tok('ill-cream'), w1: tok(`ill-${hue}-1`), w: tok(`ill-${hue}`), w2: tok(`ill-${hue}-2`), w3: tok(`ill-${hue}-3`),
      trail: tok('ill-orange'), trail1: tok('ill-orange-1'), trail2: tok('ill-orange-2'), drop: tok('drop'), ink: tok('ill-ink'), white: tok('ill-white'),
      b: tok('ill-brown'), b1: tok('ill-brown-1'), b2: tok('ill-brown-2'), b3: tok('ill-brown-3'), tan: tok('ill-tan-1'), pink: tok('ill-pink'),
      y: tok('ill-yellow'), y1: tok('ill-yellow-1'), y3: tok('ill-yellow-3'), red: tok('ill-red'), red2: tok('ill-red-2'), red1: tok('ill-red-1'),
      g1: tok('ill-green-1'), g: tok('ill-green'), g2: tok('ill-green-2'), grey: tok('ill-grey-1'), grey2: tok('ill-grey-2'), grey3: tok('ill-grey-3'),
      try: tok('try'), tryt: tok('try-tint'), star: tok('star'), starS: tok('star-shade'),
    };
    const KC = MZ.KEY_HUE.map(k => ({ c1: tok(`ill-${k}-1`), c: tok(`ill-${k}`), c2: tok(`ill-${k}-2`), c3: tok(`ill-${k}-3`) }));

    // ---- geometry ----
    let cs = 40, M0 = 10, size = 0, dpr = 1, bg = null;
    const head = () => st.t[st.t.length - 1];
    const cx = c => M0 + (c % w + 0.5) * cs, cy = c => M0 + (Math.floor(c / w) + 0.5) * cs;
    function layout() {
      const ps = getComputedStyle(el), aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      const land = aw > ah * 1.25;
      root.classList.toggle('land', land);
      let bs = land ? Math.min(ah, aw - side.offsetWidth - 16) : Math.min(aw, ah - side.offsetHeight - 12); // the board's side
      bs = Math.max(150, Math.min(bs, 760));
      M0 = bs < 400 ? 8 : 12;
      cs = Math.min(96, Math.floor((bs - 2 * M0) / Math.max(w, h)));
      size = cs * Math.max(w, h) + 2 * M0;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.style.width = cv.style.height = size + 'px';
      cv.width = cv.height = Math.round(size * dpr);
      bg = null;
      draw();
    }
    // the static layer: floor and walls
    function paintBg() {
      bg = document.createElement('canvas');
      bg.width = bg.height = cv.width;
      const g = bg.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = C.floor;
      g.fillRect(0, 0, size, size);
      // a soft warm band along the lower right inside edge, so the floor sits below the outer wall
      g.fillStyle = C.floor2;
      g.fillRect(M0, size - M0 - cs * 0.18, size - 2 * M0, cs * 0.18);
      g.fillRect(size - M0 - cs * 0.18, M0, cs * 0.18, size - 2 * M0);
      // walls merged into long runs
      const segs = [], X = i => M0 + i * cs;
      for (let y = 0; y <= h; y++) {
        let s0 = -1;
        for (let x = 0; x <= w; x++) {
          const on = x < w && (y == 0 || y == h || !(o[(y - 1) * w + x] & 4));
          if (on && s0 < 0) s0 = x;
          if (!on && s0 >= 0) { segs.push([X(s0), X(y), X(x), X(y)]); s0 = -1; }
        }
      }
      for (let x = 0; x <= w; x++) {
        let s0 = -1;
        for (let y = 0; y <= h; y++) {
          const on = y < h && (x == 0 || x == w || !(o[y * w + x - 1] & 2));
          if (on && s0 < 0) s0 = y;
          if (!on && s0 >= 0) { segs.push([X(x), X(s0), X(x), X(y)]); s0 = -1; }
        }
      }
      const t = Math.max(4, Math.min(12, cs * 0.22));
      const stroke = (dx, dy, lw, col) => {
        g.beginPath();
        for (const s of segs) { g.moveTo(s[0] + dx, s[1] + dy); g.lineTo(s[2] + dx, s[3] + dy); }
        g.lineWidth = lw;
        g.strokeStyle = col;
        g.stroke();
      };
      g.lineCap = g.lineJoin = 'round';
      stroke(t * 0.3, t * 0.45, t * 1.15, C.drop); // contact shadow on the floor
      stroke(t * 0.16, t * 0.24, t, C.w3); // shade side (lower right)
      stroke(0, 0, t, C.w); // base
      stroke(-t * 0.16, -t * 0.18, t * 0.38, C.w1); // highlight (upper left)
    }

    // ---- drawing helpers (dynamic layer) ----
    const circ = (x, y, r, col) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); };
    const ell = (x, y, rx, ry, col) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); };
    const rrect = (x, y, ww, hh, r, col) => {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r); else ctx.rect(x, y, ww, hh);
      ctx.fillStyle = col;
      ctx.fill();
    };
    function starPath(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.48 : r;
        ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      ctx.closePath();
    }
    function star(x, y, r) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = r * 0.22;
      starPath(x + r * 0.1, y + r * 0.14, r);
      ctx.fillStyle = ctx.strokeStyle = C.y3;
      ctx.fill(); ctx.stroke();
      starPath(x, y, r);
      ctx.fillStyle = ctx.strokeStyle = C.y;
      ctx.fill(); ctx.stroke();
      ell(x - r * 0.22, y - r * 0.2, r * 0.2, r * 0.13, C.y1);
    }
    function key(x, y, r, k) {
      const K = KC[k] || KC[0], lw = Math.max(2.5, r * 0.36);
      const one = (dx, dy, col) => {
        ctx.save();
        ctx.translate(x + dx, y + dy);
        ctx.rotate(-Math.PI / 4);
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.beginPath();
        if (k) ctx.rect(-r * 0.95, -r * 0.38, r * 0.76, r * 0.76); else ctx.arc(-r * 0.58, 0, r * 0.38, 0, Math.PI * 2);
        ctx.moveTo(-r * 0.2, 0); ctx.lineTo(r * 0.95, 0);
        ctx.moveTo(r * 0.55, 0); ctx.lineTo(r * 0.55, r * 0.4);
        ctx.moveTo(r * 0.9, 0); ctx.lineTo(r * 0.9, r * 0.3);
        ctx.stroke();
        ctx.restore();
      };
      one(r * 0.1, r * 0.14, K.c3);
      one(0, 0, K.c);
    }
    function door(c, k, open) {
      const K = KC[k] || KC[0], x = M0 + (c % w) * cs, y = M0 + Math.floor(c / w) * cs, i = cs * 0.1, s = cs - 2 * i;
      if (open) {
        ctx.globalAlpha = 0.35;
        rrect(x + i, y + i, s, s, cs * 0.14, K.c1);
        ctx.globalAlpha = 1;
        return;
      }
      rrect(x + i + cs * 0.04, y + i + cs * 0.06, s, s, cs * 0.14, K.c3);
      rrect(x + i, y + i, s, s, cs * 0.14, K.c2);
      rrect(x + i + s * 0.1, y + i + s * 0.08, s * 0.8, s * 0.8, cs * 0.1, K.c);
      ctx.fillStyle = K.c3;
      for (const f of [0.36, 0.64]) ctx.fillRect(x + i + s * f - cs * 0.02, y + i + s * 0.12, cs * 0.04, s * 0.72);
      // the keyhole has the shape of its key's bow (round or square), so colour is not the only cue
      const kx = x + cs / 2, ky = y + cs / 2 - cs * 0.04;
      ctx.fillStyle = C.ink;
      if (k) rrect(kx - cs * 0.13, ky - cs * 0.15, cs * 0.26, cs * 0.26, cs * 0.04, C.ink); else circ(kx, ky - cs * 0.02, cs * 0.14, C.ink);
      ctx.fillStyle = C.ink;
      ctx.fillRect(kx - cs * 0.04, ky + cs * 0.04, cs * 0.08, cs * 0.18);
    }
    function flag(c, locked) {
      const x = cx(c), y = cy(c), r = cs * 0.5;
      circ(x, y, cs * 0.4, C.g1);
      ell(x, y + r * 0.62, r * 0.85, r * 0.32, C.g2);
      ell(x - r * 0.06, y + r * 0.56, r * 0.72, r * 0.24, C.g);
      ctx.strokeStyle = C.grey3;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(2, r * 0.16);
      ctx.beginPath(); ctx.moveTo(x - r * 0.35, y + r * 0.6); ctx.lineTo(x - r * 0.35, y - r * 0.85); ctx.stroke();
      const fl = (dx, dy, col) => {
        ctx.beginPath();
        ctx.moveTo(x - r * 0.3 + dx, y - r * 0.85 + dy); ctx.lineTo(x + r * 0.75 + dx, y - r * 0.85 + dy);
        ctx.lineTo(x + r * 0.45 + dx, y - r * 0.5 + dy); ctx.lineTo(x + r * 0.75 + dx, y - r * 0.12 + dy); ctx.lineTo(x - r * 0.3 + dx, y - r * 0.12 + dy);
        ctx.closePath(); ctx.fillStyle = col; ctx.fill();
      };
      fl(r * 0.06, r * 0.08, C.red2);
      fl(0, 0, C.red);
      ell(x, y - r * 0.68, r * 0.22, r * 0.08, C.red1);
      if (locked) { // the gate: bars across the cell until every star is picked up
        ctx.strokeStyle = C.grey3;
        ctx.lineWidth = Math.max(2, cs * 0.08);
        ctx.beginPath();
        for (const f of [-0.3, 0, 0.3]) { ctx.moveTo(x + f * cs, y - cs * 0.4); ctx.lineTo(x + f * cs, y + cs * 0.4); }
        ctx.moveTo(x - cs * 0.4, y - cs * 0.12); ctx.lineTo(x + cs * 0.4, y - cs * 0.12);
        ctx.stroke();
        ctx.strokeStyle = C.grey;
        ctx.lineWidth = Math.max(1, cs * 0.03);
        ctx.beginPath();
        for (const f of [-0.3, 0, 0.3]) { ctx.moveTo(x + f * cs - cs * 0.02, y - cs * 0.38); ctx.lineTo(x + f * cs - cs * 0.02, y + cs * 0.38); }
        ctx.stroke();
      }
    }
    // the bear cub (light from the top left: shade crescent lower right, highlight upper left)
    function cub(x, y, r) {
      ell(x + r * 0.1, y + r * 0.95, r * 0.8, r * 0.22, C.drop);
      for (const s of [-1, 1]) { circ(x + s * r * 0.66 + r * 0.05, y - r * 0.62 + r * 0.06, r * 0.36, C.b3); circ(x + s * r * 0.66, y - r * 0.62, r * 0.33, C.b2); circ(x + s * r * 0.66, y - r * 0.62, r * 0.16, C.tan); }
      circ(x + r * 0.06, y + r * 0.08, r, C.b2);
      circ(x - r * 0.04, y - r * 0.02, r * 0.9, C.b);
      ell(x - r * 0.38, y - r * 0.5, r * 0.26, r * 0.14, C.b1);
      ell(x, y + r * 0.34, r * 0.44, r * 0.32, C.tan);
      ell(x, y + r * 0.2, r * 0.15, r * 0.11, C.ink);
      for (const s of [-1, 1]) {
        circ(x + s * r * 0.34, y - r * 0.1, r * 0.13, C.ink);
        circ(x + s * r * 0.34 - r * 0.04, y - r * 0.15, r * 0.05, C.white);
        ctx.globalAlpha = 0.55;
        circ(x + s * r * 0.62, y + r * 0.22, r * 0.12, C.pink);
        ctx.globalAlpha = 1;
      }
    }

    function draw() {
      if (!size) return 0;
      const t0 = performance.now();
      if (!bg) paintBg();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(bg, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // start pad
      circ(cx(p.s) + cs * 0.03, cy(p.s) + cs * 0.05, cs * 0.4, C.grey2);
      circ(cx(p.s), cy(p.s), cs * 0.38, C.grey);
      circ(cx(p.s), cy(p.s), cs * 0.25, C.g1);
      // dead ends found (amber, kind)
      for (const c of st.dead) {
        const x = M0 + (c % w) * cs, y = M0 + Math.floor(c / w) * cs;
        rrect(x + cs * 0.14, y + cs * 0.14, cs * 0.72, cs * 0.72, cs * 0.16, c == flash ? C.try : C.tryt);
      }
      (p.doors || []).forEach((c, k) => door(c, k, st.m >> k & 1));
      items.forEach((c, k) => {
        if (st.m >> k & 1) return;
        if (p.stars) star(cx(c), cy(c), cs * 0.44); else key(cx(c), cy(c), cs * 0.5, k);
      });
      flag(p.g, p.stars && st.m != full);
      // the trail: a round tube with a highlight toward the light
      if (st.t.length > 1) {
        ctx.lineCap = ctx.lineJoin = 'round';
        const line = (dx, dy, lw, col) => {
          ctx.beginPath();
          st.t.forEach((c, i) => ctx[i ? 'lineTo' : 'moveTo'](cx(c) + dx, cy(c) + dy));
          ctx.lineWidth = lw;
          ctx.strokeStyle = col;
          ctx.stroke();
        };
        line(cs * 0.04, cs * 0.06, cs * 0.34, C.trail2);
        line(0, 0, cs * 0.3, C.trail);
        line(-cs * 0.05, -cs * 0.05, cs * 0.09, C.trail1);
      }
      // hint dots
      hint.forEach((c, i) => {
        circ(cx(c) + cs * 0.03, cy(c) + cs * 0.04, cs * 0.17, C.starS);
        circ(cx(c), cy(c), cs * (i == hint.length - 1 ? 0.17 : 0.14), C.star);
      });
      cub(cx(head()), cy(head()), cs * 0.5);
      return performance.now() - t0;
    }
    const redraw = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); };

    // ---- status line ----
    const msg = t => { msgEl.textContent = t; };
    function status() {
      if (p.stars) {
        const n = items.filter((c, k) => st.m >> k & 1).length;
        root.querySelectorAll('.mz-st').forEach((e, k) => e.classList.toggle('on', !!(st.m >> k & 1)));
        root.querySelector('.mz-n').textContent = `${n} of ${items.length}`;
      }
      if (p.keys) {
        root.querySelectorAll('.mz-key').forEach((e, k) => e.classList.toggle('on', !!(st.m >> k & 1)));
        root.querySelector('.mz-sn').textContent = st.steps;
      }
    }
    const intro = { A: 'Drag the bear to the flag.', B: 'Drag the bear to the flag.', C: 'Pick up the 3 stars. Then the gate opens.',
      D: items.length > 1 ? 'Find the keys. Each one opens its own door.' : 'Find the key to open the door.' }[band];

    // ---- moving ----
    const save = () => { if (!won) { dirty = false; api.saveState(st); } };
    const nbIn = (c, d) => (o[c] & MZ.BIT[d]) ? c + MZ.DX[d] + MZ.DY[d] * w : -1;
    let told = '';
    function tell(t, speak) { if (told == t) return; told = t; msg(t); if (speak) api.say(t); }
    // one step in direction d: 'ok', 'wall', 'shut' (a door or the gate) or 'won'
    function move(d) {
      if (won) return 'won';
      const c = head(), n = nbIn(c, d);
      if (n < 0) return 'wall';
      arrow.hidden = true; // the hint ring goes when the bear moves
      if (st.t.length > 1 && st.t[st.t.length - 2] == n) { // back over the trail: erase
        st.t.pop();
        dirty = true;
        redraw();
        return 'ok';
      }
      const dk = doorAt(n);
      if (dk >= 0 && !(st.m >> dk & 1)) {
        api.sfx.rattle();
        tell(items.length > 1 ? `This door needs key ${dk + 1}.` : 'This door needs the key.', true);
        return 'shut';
      }
      if (p.stars && n == p.g && st.m != full) {
        api.sfx.rattle();
        tell('Pick up all 3 stars to open the gate.', true);
        return 'shut';
      }
      st.t.push(n);
      st.steps++;
      dirty = true;
      const ik = itemAt(n);
      if (ik >= 0 && !(st.m >> ik & 1)) {
        st.m |= 1 << ik;
        if (p.stars) { api.sfx.coin(); tell(st.m == full ? 'All the stars! The gate is open.' : 'You found a star!'); }
        else { api.sfx.chime(); tell(items.length > 1 ? `You found key ${ik + 1}!` : 'You found the key!'); }
      } else if (dk >= 0) { api.sfx.open(); tell('The door opens!'); }
      else if (MZ.pop(o[n]) == 1 && n != p.g && ik < 0 && !st.dead.includes(n)) {
        st.dead.push(n);
        st.mis++;
        flash = n;
        later(() => { flash = -1; redraw(); }, 700);
        api.sfx.wrong();
        tell('Dead end. Go back!');
      }
      status();
      redraw();
      if (n == p.g) {
        won = true;
        hint = [];
        api.saveState(st);
        msg('You made it!');
        api.win({ mistakes: st.mis });
        return 'won';
      }
      return 'ok';
    }
    // walk toward cell T along open sides, one cell at a time, never away from it (the finger leads the bear)
    function toward(T) {
      for (let k = 0; k < 64 && !won; k++) {
        const c = head();
        if (c == T) return;
        const dx = T % w - c % w, dy = Math.floor(T / w) - Math.floor(c / w);
        const hx = dx ? (dx > 0 ? 1 : 3) : -1, vy = dy ? (dy > 0 ? 2 : 0) : -1;
        let moved = false;
        for (const d of Math.abs(dx) >= Math.abs(dy) ? [hx, vy] : [vy, hx]) {
          if (d < 0) continue;
          const r = move(d);
          if (r == 'ok' || r == 'won') { moved = true; break; }
        }
        if (!moved) return;
      }
    }
    const cellAt = e => {
      const r = cv.getBoundingClientRect(), x = Math.floor((e.clientX - r.left - M0) / cs), y = Math.floor((e.clientY - r.top - M0) / cs);
      return x < 0 || y < 0 || x >= w || y >= h ? -1 : y * w + x;
    };
    const nearHead = e => {
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left - cx(head()), y = e.clientY - r.top - cy(head());
      return Math.hypot(x, y) <= Math.max(cs * 1.25, 34);
    };
    // a tap: back to a spot on the trail, or along a straight open corridor
    function tap(T) {
      if (T < 0 || T == head()) return;
      const i = st.t.indexOf(T);
      if (i >= 0) { while (head() != T) move(dirTo(head(), st.t[st.t.length - 2])); return; }
      const c = head(), dx = T % w - c % w, dy = Math.floor(T / w) - Math.floor(c / w);
      if (dx && dy) return tell('Drag the bear, or tap a spot in a straight line.');
      const d = dx > 0 ? 1 : dx < 0 ? 3 : dy > 0 ? 2 : 0;
      for (let k = c; k != T; k = nbIn(k, d)) if (nbIn(k, d) < 0) return tell('A wall is in the way.');
      while (head() != T && !won) if (move(d) != 'ok' && !won) break;
    }
    const dirTo = (a, b) => b - a == 1 ? 1 : b - a == -1 ? 3 : b > a ? 2 : 0;

    cv.addEventListener('pointerdown', e => {
      if (won || drag) return;
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch (er) {}
      told = '';
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, on: nearHead(e), moved: false };
      if (drag.on) { const T = cellAt(e); if (T >= 0) toward(T); }
    });
    cv.addEventListener('pointermove', e => {
      if (!drag || e.pointerId != drag.id) return;
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) drag.moved = true;
      if (drag.on) { const T = cellAt(e); if (T >= 0) toward(T); }
    });
    const up = e => {
      if (!drag || e.pointerId != drag.id) return;
      const d = drag;
      drag = null;
      if (!d.on && !d.moved && e.type == 'pointerup') tap(cellAt(e));
      else if (!d.on && d.moved) tell('Start the drag on the bear.');
      if (dirty) save();
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    root.querySelectorAll('.mz-ab').forEach(b => b.onclick = () => { told = ''; move(+b.dataset.d); if (dirty) save(); });
    const keyd = e => {
      const d = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3 }[e.key];
      if (d == null || !cv.isConnected || $('.ovl')) return;
      e.preventDefault();
      told = '';
      move(d);
      if (dirty) save();
    };
    document.addEventListener('keydown', keyd);
    root.querySelector('.mz-tog').onclick = () => {
      const on = pad.hidden;
      pad.hidden = !on;
      root.querySelector('.mz-tog').setAttribute('aria-pressed', on);
      const t = BT.st();
      BT.rec('maze', band, true);
      t.maze.pad = on ? 1 : 0;
      api.sfx.click();
      layout();
      save();
    };
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(layout, 120); };
    window.addEventListener('resize', onResize);

    // ---- hints ----
    function hintNow(tier) {
      if (won) return false;
      const r = MZ.route(p, o, head(), st.m);
      if (!r || r.length < 2) return false;
      clearTimeout(hintT);
      clearTimeout(arrowT);
      const cells = tier >= 2 ? MZ.hintCells(o, r, tier) : [];
      if (tier == 1 || !cells.length) {
        const tg = MZ.target(p, r, st.m), c = head(), dx = tg.c % w - c % w, dy = Math.floor(tg.c / w) - Math.floor(c / w);
        const d = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);
        const what = tg.kind == 'flag' ? 'The flag' : tg.kind == 'star' ? 'The next star' : items.length > 1 ? `Key ${tg.k + 1}` : 'The key';
        const where = ['up', 'to the right', 'down', 'to the left'][d];
        // AUD-BT M-3: the mark is a ring round the thing itself (the flag, the star, the key), not an arrow beside the bear. The
        // bear starts in a dead end, so an arrow "toward the flag" pointed at a wall in three starts of four, and a child who
        // cannot read the line followed the arrow. The line still says where the thing is; the ring shows it.
        const rs = Math.round(Math.max(44, cs * 1.15));
        arrow.innerHTML = '';
        arrow.classList.add('ring');
        arrow.style.width = arrow.style.height = rs + 'px';
        arrow.style.margin = (-rs / 2) + 'px 0 0 ' + (-rs / 2) + 'px';
        arrow.style.left = cx(tg.c) + 'px';
        arrow.style.top = cy(tg.c) + 'px';
        arrow.dataset.d = MZ.DIR[d];
        arrow.dataset.c = tg.c;
        arrow.hidden = false;
        arrow.classList.remove('on');
        void arrow.offsetWidth;
        arrow.classList.add('on');
        arrowT = later(() => { arrow.hidden = true; }, 4500);
        tell(`${what} is ${where}.`, true);
        return true;
      }
      arrow.hidden = true;
      hint = cells;
      redraw();
      hintT = later(() => { hint = []; redraw(); }, 9000);
      tell(tier == 2 ? 'Follow the dots.' : 'Follow the dots past the next turn.', true);
      return true;
    }

    // ---- start ----
    msg(intro);
    status();
    layout();
    if (st.t.length == 1 && (band == 'A' || band == 'B')) api.say(intro); // R-01b: band B speaks its first instruction too
    const inst = {
      hint: hintNow,
      destroy() {
        timers.forEach(clearTimeout);
        timers.clear();
        clearTimeout(rz);
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
        if (dirty) save();
        if (MZ.cur && MZ.cur.inst === inst) MZ.cur = null;
      },
    };
    MZ.cur = {
      inst, p, st, o,
      at: c => { const r = cv.getBoundingClientRect(); return { x: r.left + cx(c), y: r.top + cy(c) }; },
      draw: () => { bg = null; return draw(); },
      cell: () => cs, hint: () => hint.slice(), head,
    };
    return inst;
  },
});
/* ---------- Brain Teasers: Patterns, matrices, odd one out (P3-09; BRAIN_TEASERS.md 5.5, 7) ----------
   One registered type, `pattern`. A puzzle is a short set of items (band A 3, bands B-D 4); each item is one question with choices:
     seq  "What comes next?"  a row of pictures and a "?" box; 4 choices
     num  "What comes next?"  a row of numbers; 4 choices
     odd  "Which one does not belong?"  4 pictures, one attribute splits them 3-1; the pictures are the choices
     ana  2x2 "A is to B as C is to ?"; 4 choices (band B)
     mat  3x3 matrix, the bottom-right cell missing; 6 choices: 4 differ from the answer in one attribute, 1 in two (bands C, D)
   Bands (levels 1-4 / 5-8 / 9-12 are tiers 0 / 1 / 2; the rule count grows 1 -> 2 -> 3 over the tiers, section 7):
     A  seq (AB, ABC, AAB, ABB, AABB cycles), odd (shape, then size or count, then with a distracting 2-2 split), seq
     B  num (+n, -n), seq (cycles, +1 count, turns of 45 or 90 degrees, up to 3 attributes), ana (1 then 2 changes), odd
     C  mat (1-2 changing attributes), num (x2, x3, +a/+b alternating, squares, big +n), seq, mat
     D  mat (2-3 changing attributes), num (xa+b, Fibonacci-style, triangular, two interleaved), seq (two or three attributes
        with different cycle lengths), mat
   A picture tile is {s shape 0-6 (6 = arrow), c colour 0-5, z size 0-2, n count 1-5, r turn 0-7 in 45 degree steps, arrows only}.
   Colour is never an attribute of its own: within an item it follows one other attribute (shape, size or count) or stays the
   same, so two tiles of different colours always differ in something a colour-blind child can see too.
   Uniqueness (by construction, then checked): every attribute of the shown part must allow exactly one next value under the rule
   library (a cycle of 1-4 seen at least once, steady growth; numbers: + - x, xa+b, second differences, Fibonacci, alternating,
   interleaved, growing differences), and every distractor must fail it; matrices are read by rows or by columns, attribute by
   attribute. tools/test.js re-checks every item with its own independent checker.
   Hints (per item; the frame counts them): 1 names the attribute to watch, 2 states the rule (bands C and D: the rule of one
   changing attribute, then "now check ... yourself"; R-01b), 3 removes two wrong choices. A wrong tap counts a mistake, the choice turns amber and stays out; the child always finishes.
   State (api.saveState): {i item, miss, h hint tier of this item, x wrong taps, g choices removed by hint 3}.
   Band A rows show at least two whole copies of a repeating unit (ABC ABC, AABB AABB; up to 8 pictures; R-01b).
   Picture choices are drawn at the size of the pictures on the board (--pt-ts, measured; R-01b), so size is compared like with like.
   Drawing: tiles are inline SVG, light from the top left (shadow, shade, base moved toward the light, white gloss), colours
   from the --ill-* tokens through classes in src/css/49-bt-pattern.css; no ids, filters or gradients. */
const PAT = (() => {
  const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star', 'heart', 'arrow'];
  const ARROW = 6;
  const COLS = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
  const SIZES = ['small', 'medium', 'big'];
  const DIRS = ['right', 'down and right', 'down', 'down and left', 'left', 'up and left', 'up', 'up and right'];
  const KEYS = ['s', 'z', 'n', 'r']; // what a colour-blind child sees
  const KIND = { s: 'nom', c: 'nom', z: 'lin', n: 'lin', r: 'rot' };
  const DOM = { s: [0, 1, 2, 3, 4, 5], z: [0, 1, 2], n: [1, 2, 3, 4, 5], r: [0, 1, 2, 3, 4, 5, 6, 7] };
  const range = n => Array.from({ length: n }, (_, i) => i);
  const same = (a, b) => KEYS.every(k => a[k] === b[k]);
  // a tile can be drawn readably: four or five copies only at the big size
  const okTile = t => t.n <= 3 || t.z == 2;

  /* ---------- the rule library ---------- */
  const stepOf = (a, b, kind) => kind == 'rot' ? (a - b + 8) & 7 : a - b;
  // values a rule allows after the list v: a cycle of length p (1-4) seen at least once (v longer than p), or steady growth
  function seqNext(v, kind) {
    const L = v.length, out = new Set();
    for (let p = 1; p <= 4 && p < L; p++) if (v.every((x, i) => i < p || x === v[i - p])) out.add(v[L - p]);
    if (kind != 'nom' && L >= 3) {
      const d = stepOf(v[1], v[0], kind);
      if (d && v.every((x, i) => i == 0 || stepOf(x, v[i - 1], kind) === d)) out.add(kind == 'rot' ? (v[L - 1] + d) & 7 : v[L - 1] + d);
    }
    return out;
  }
  // numbers: every rule that explains the shown list (with at least one term more than it needs) and the next value it gives
  function numNext(v) {
    const L = v.length, out = new Set(), d = v.slice(1).map((x, i) => x - v[i]);
    const put = x => { if (Number.isInteger(x)) out.add(x); };
    for (let p = 1; p <= 4 && p < L; p++) if (v.every((x, i) => i < p || x === v[i - p])) put(v[L - p]);
    if (L >= 3 && d[0] && d.every(x => x === d[0])) put(v[L - 1] + d[0]);
    if (L >= 3 && v[0] && v[1] !== v[0]) {
      const q = v[1] / v[0];
      if (v.every((x, i) => i == 0 || x === v[i - 1] * q)) put(v[L - 1] * q);
    }
    if (L >= 4 && v[1] !== v[0]) { // x a + b
      const a = (v[2] - v[1]) / (v[1] - v[0]), b = v[1] - a * v[0];
      if (Number.isInteger(a) && Number.isInteger(b) && v.every((x, i) => i == 0 || x === a * v[i - 1] + b)) put(a * v[L - 1] + b);
    }
    if (L >= 4) { // the differences grow steadily (squares, triangular numbers)
      const dd = d.slice(1).map((x, i) => x - d[i]);
      if (dd[0] && dd.every(x => x === dd[0])) put(v[L - 1] + d[L - 2] + dd[0]);
    }
    if (L >= 4 && d[0] && d.slice(1).every((x, i) => x === d[i] * (d[1] / d[0]))) put(v[L - 1] + d[L - 2] * d[1] / d[0]); // x r differences
    if (L >= 3 && v.every((x, i) => i < 2 || x === v[i - 1] + v[i - 2])) put(v[L - 1] + v[L - 2]); // Fibonacci-style
    if (L >= 4 && d[0] !== d[1] && d.every((x, i) => i < 2 || x === d[i - 2])) put(v[L - 1] + d[L - 3]); // +a, +b, +a, ...
    if (L >= 6) { // two sequences take turns, each growing steadily
      const e = [v[2] - v[0], v[3] - v[1]];
      if (v.every((x, i) => i < 2 || x - v[i - 2] === e[i % 2])) put(v[L - 2] + e[L % 2]);
    }
    return out;
  }
  // matrices: an attribute fits when every row (or every column) is constant, or holds the same three different values,
  // or grows by the same step
  function linesOk(lines, kind) {
    if (lines.every(l => l[0] === l[1] && l[1] === l[2])) return true;
    const key = l => l.slice().sort((a, b) => a - b).join();
    if (lines.every(l => new Set(l).size == 3 && key(l) == key(lines[0]))) return true;
    if (kind != 'nom') {
      const d = stepOf(lines[0][1], lines[0][0], kind);
      if (d && lines.every(l => stepOf(l[1], l[0], kind) === d && stepOf(l[2], l[1], kind) === d)) return true;
    }
    return false;
  }
  function gridOk(v, kind) {
    const rows = [0, 1, 2].map(i => v.slice(i * 3, i * 3 + 3)), cols = [0, 1, 2].map(j => [v[j], v[j + 3], v[j + 6]]);
    return linesOk(rows, kind) || linesOk(cols, kind);
  }
  const matFits = (cells, t, keys) => keys.every(k => gridOk(cells.concat([t]).map(x => x[k]), KIND[k]));
  // 2x2: each attribute keeps A->B in C->D, or A->C in B->D, or (numbers, turns) changes by the same step
  function anaOk(A, B, C, D, k) {
    if (A[k] === B[k] && C[k] === D[k]) return true;
    if (A[k] === C[k] && B[k] === D[k]) return true;
    return KIND[k] != 'nom' && stepOf(D[k], C[k], KIND[k]) === stepOf(B[k], A[k], KIND[k]);
  }
  const anaFits = (sh, t, keys) => keys.every(k => anaOk(sh[0], sh[1], sh[2], t, k));
  const seqFits = (sh, t, keys) => keys.every(k => seqNext(sh.map(x => x[k]), KIND[k]).has(t[k]));
  // odd one out: the tiles that are alone against three by some attribute
  function oddSet(ts, keys) {
    const out = new Set();
    for (const k of keys) {
      const m = {};
      ts.forEach(t => { m[t[k]] = (m[t[k]] || 0) + 1; });
      const vs = Object.values(m);
      if (vs.length == 2 && vs.includes(1) && vs.includes(3)) out.add(ts.findIndex(t => m[t[k]] == 1));
    }
    return out;
  }
  // does the item have exactly one choice that fits (with and without colour)? Used by make() before an item is kept.
  function unique(it) {
    for (const keys of [KEYS.concat('c'), KEYS]) {
      let fit;
      if (it.k == 'num') { const nx = numNext(it.show); fit = it.ch.map(x => nx.has(x)); }
      else if (it.k == 'odd') { const o = oddSet(it.ch, keys); fit = it.ch.map((_, i) => o.has(i)); }
      else if (it.k == 'seq') fit = it.ch.map(t => seqFits(it.show, t, keys));
      else if (it.k == 'ana') fit = it.ch.map(t => anaFits(it.show, t, keys));
      else fit = it.ch.map(t => matFits(it.show, t, keys));
      if (fit.filter(Boolean).length != 1 || !fit[it.a]) return false;
    }
    return true;
  }

  /* ---------- making items ---------- */
  // tier 0 / 1 / 2 = levels 1-4 / 5-8 / 9-12
  const tierOf = level => level <= 4 ? 0 : level <= 8 ? 1 : 2;
  // sequences: per attribute a cycle unit ('AB', 'AAB' ...) or growth ('+1', '-2'); one option is picked per item
  const SEQ = {
    A1: [[{ s: 'AB' }], [{ s: 'ABC' }], [{ s: 'AAB' }, { s: 'ABB' }, { s: 'AABB' }]],
    A2: [[{ z: 'AB' }, { n: 'AB' }], [{ s: 'AAB' }, { s: 'ABB' }, { z: 'ABC' }], [{ n: '+1' }, { s: 'AB', z: 'AB' }, { s: 'AB', n: 'AB' }]],
    B: [[{ s: 'ABC' }, { n: '+1' }, { n: '-1' }, { r: '+2' }], [{ s: 'AB', n: '+1' }, { r: '+2', z: 'AB' }, { s: 'ABC', z: 'ABC' }],
      [{ r: '+1', z: 'AB' }, { r: '-2', z: 'AB', n: 'AB' }, { s: 'AB', z: 'ABC', n: 'AB' }]],
    C: [[{ r: '+1' }, { r: '-1' }, { s: 'AB', n: '+1' }], [{ r: '+2', z: 'ABC' }, { s: 'ABC', n: 'AB' }, { r: '-1', n: 'AB' }],
      [{ r: '+1', z: 'AB', n: 'ABC' }, { s: 'AB', z: 'ABC', n: 'AB' }, { s: 'ABB', z: 'AB', n: 'ABC' }]],
    D: [[{ s: 'AB', z: 'ABC' }, { s: 'ABC', n: 'AB' }, { r: '+1', z: 'ABC' }], [{ s: 'AAB', z: 'AB', n: 'ABC' }, { r: '-1', z: 'AB', n: 'ABC' }],
      [{ s: 'ABB', z: 'AB', n: 'AABC' }, { r: '+2', z: 'ABC', n: 'AAB' }, { s: 'AABC', z: 'AB', n: 'ABC' }]],
  };
  // number rules per band and tier
  const NUM = {
    B: [['add1'], ['add', 'sub1'], ['sub', 'addbig']],
    C: [['addbig', 'mul2'], ['mul', 'alt'], ['sq', 'alt', 'mul']],
    D: [['affine', 'tri'], ['fib', 'inter', 'sqoff'], ['affine', 'fib', 'inter', 'tri']],
  };

  function maker(rnd) {
    const R = (a, b) => a + Math.floor(rnd() * (b - a + 1));
    const pick = a => a[Math.floor(rnd() * a.length)];
    const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

    // colour follows attribute ck (or stays c0); returns a painter for tiles
    const painter = (ck, cmap, c0) => t => Object.assign(t, { c: ck ? cmap[t[ck] % 6] : c0 });
    // pick the colour link: the first attribute (in random order) whose colours still fit the item's own rule, else one colour
    function paintItem(it, cands, fits) {
      const cmap = shuf(range(6)), c0 = pick(range(6)), all = () => it.show.concat(it.ch || [], it.ans ? [it.ans] : []);
      for (const ck of shuf(cands).concat([null])) {
        const p = painter(ck, cmap, c0);
        all().forEach(p);
        if (!ck || fits()) return p;
      }
    }
    // tiles that differ from t in exactly the attributes `ks`, drawable; s and r only change where they make sense
    function variants(t, ks) {
      let out = [Object.assign({}, t)];
      for (const k of ks) {
        if (k == 'r' && t.s != ARROW) return [];
        if (k == 's' && t.s == ARROW) return [];
        out = out.flatMap(x => DOM[k].filter(v => v !== t[k]).map(v => Object.assign({}, x, { [k]: v })));
      }
      return out.filter(okTile);
    }
    const pairs = ks => ks.flatMap((a, i) => ks.slice(i + 1).map(b => [a, b]));
    // distractor pool: one-off and two-off variants not fitting the rule, scored by plausibility
    function pool(ans, ch, seen, fits, n1, n2) {
      const score = (x, ks) => ks.reduce((a, k) => a + (ch.includes(k) ? 3 : 0) + (seen(k).includes(x[k]) ? 2 : 0), 0) + rnd();
      const one = KEYS.flatMap(k => variants(ans, [k]).map(x => ({ x, ks: [k], sc: score(x, [k]) })));
      const two = pairs(KEYS).flatMap(ks => variants(ans, ks).map(x => ({ x, ks, sc: score(x, ks) })));
      const ok = o => !fits(o.x);
      const by = a => a.filter(ok).sort((p, q) => q.sc - p.sc);
      const take = (a, n, out) => {
        const per = {};
        for (const o of a) {
          if (out.length >= n) break;
          const kk = o.ks.join();
          if ((per[kk] || 0) >= 2 || out.some(p => same(p.x, o.x))) continue;
          per[kk] = (per[kk] || 0) + 1;
          out.push(o);
        }
        return out;
      };
      const got = take(by(one), n1, []);
      if (got.length < n1) return null;
      const all = take(by(two), n1 + n2, got.slice());
      return all.length < n1 + n2 ? null : all.map(o => o.x);
    }

    // ---- what comes next (pictures) ----
    // two: show at least two whole copies of a repeating unit (band A, R-01b: Pre-K children find the unit after two copies)
    function seq(opts, two) {
      const spec = pick(opts), ch = Object.keys(spec);
      const zch = 'z' in spec, nGrow = /^[+-]/.test(spec.n || '');
      const base = {
        s: 'r' in spec ? ARROW : R(0, 5), z: nGrow ? 2 : pick([1, 2]),
        n: zch ? 1 : pick([1, 1, 2]), r: 0,
      };
      if (zch && !('n' in spec)) base.n = pick([1, 2]);
      const vals = {}; // attribute -> function(i)
      for (const k of ch) {
        const u = spec[k];
        if (/^[+-]/.test(u)) {
          const d = +u;
          if (k == 'n') { const s0 = d > 0 ? 1 : 5; vals.n = i => s0 + i * d; }
          else { const s0 = R(0, 7); vals.r = i => (s0 + i * (d + 8)) & 7; }
        } else {
          const letters = [...new Set(u)], dom = k == 'n' ? (zch ? [1, 2, 3] : [1, 2, 3, 4, 5]) : k == 'r' ? [0, 2, 4, 6] : DOM[k];
          const m = {}, pl = shuf(dom);
          letters.forEach((l, i) => { m[l] = pl[i]; });
          vals[k] = i => m[u[i % u.length]];
        }
      }
      // the shortest row (4 to 7 shown) in which every changing attribute allows exactly one next value
      const okAt = L => ch.every(k => {
        const v = range(L + 1).map(vals[k]);
        if (v.some(x => !DOM[k].includes(x))) return false;
        const nx = seqNext(v.slice(0, L), KIND[k]);
        return nx.size == 1 && nx.has(v[L]);
      });
      // a cycle is shown once whole and two more (AB AB, ABC AB, AAB AAB); growth from 4 pictures. Band A (two): two whole
      // copies at least (AB AB, ABC ABC, AABB AABB), so up to 8 pictures
      const L0 = Math.max(4, ...ch.map(k => /^[+-]/.test(spec[k]) ? 4 : two ? 2 * spec[k].length : spec[k].length + 2));
      let L = 0;
      for (let l = L0; l <= (two ? 8 : 7) && !L; l++) if (okAt(l)) L = l;
      if (!L) return null;
      if (L < 6 && okAt(L + 1) && rnd() < 0.5) L++;
      const tiles = range(L + 1).map(i => { const t = Object.assign({}, base); for (const k of ch) t[k] = vals[k](i); return t; });
      if (!tiles.every(okTile)) return null;
      const it = { k: 'seq', show: tiles.slice(0, L), ans: tiles[L], at: ch, spec };
      const seen = k => it.show.map(t => t[k]);
      const ds = pool(it.ans, ch, seen, t => seqFits(it.show, t, KEYS), 2, 1);
      if (!ds) return null;
      it.ch = ds;
      const p = paintItem(it, ch.filter(k => k != 'r' && !/^[+-]/.test(spec[k])), () => seqFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }
    // put the answer among the distractors at a random place
    function finish(it, p) {
      const ch = shuf(it.ch.concat([it.ans]));
      if (p) ch.forEach(p);
      it.a = ch.findIndex(t => t === it.ans);
      it.ch = ch;
      delete it.ans;
      return unique(it) ? it : null;
    }

    // ---- odd one out ----
    function odd(X, noise) {
      // AUD-BT M-1: size and count never vary together in one item. A picture's drawn size depends on its count (one shape fills
      // the tile, two are half as wide each), so "1 small" and "2 big" look the same size and a single big shape looks like the odd
      // one out. Odd by size: no count noise; odd by count: no size noise; odd by shape: at most one of the two as noise.
      const ys = shuf(['s', 'z', 'n'].filter(k => k != X && !(X == 'z' && k == 'n') && !(X == 'n' && k == 'z'))).slice(0, noise);
      if (ys.includes('z') && ys.includes('n')) ys.pop();
      const t0 = { s: R(0, 5), z: 2, n: 1, r: 0 };
      if (X == 'z' || ys.includes('z')) { t0.z = R(0, 2); t0.n = pick([1, 2]); }
      if (X == 'n' || ys.includes('n')) t0.n = R(1, 3);
      const ts = range(4).map(() => Object.assign({}, t0)), o = R(0, 3);
      ts[o][X] = pick(DOM[X].filter(v => v !== t0[X] && (X != 'n' || v <= 4)));
      for (const y of ys) {
        const v2 = pick(DOM[y].filter(v => v !== t0[y] && (y != 'n' || v <= 3))), two = shuf(range(4)).slice(0, 2);
        two.forEach(i => { ts[i][y] = v2; });
      }
      if (!ts.every(okTile)) return null;
      const it = { k: 'odd', show: [], ch: ts, a: o, at: [X], noise: ys };
      const p = paintItem(it, [X].concat(ys), () => { const s = oddSet(ts, ['c']); return !s.size || (s.size == 1 && s.has(o)); });
      ts.forEach(p);
      return unique(it) ? it : null;
    }

    // ---- 2x2: A is to B as C is to ? ----
    function ana(kx, close) {
      const ks = shuf(['s', 'z', 'n']), X = ks.slice(0, kx), Y = ks.slice(kx, kx + 1);
      const A = { s: R(0, 5), z: R(0, 2), n: R(1, 2), r: 0 };
      if (!X.includes('z') && !Y.includes('z')) A.z = 2;
      const chg = (t, k) => {
        // sizes jump between small and big where they can, so the change is easy to see next to a count
        const dom = k == 'n' ? [1, 2, 3].filter(v => v != t.n) : k == 'z' ? (t.z == 1 ? [0, 2] : [2 - t.z]) : DOM[k].filter(v => v !== t[k]);
        return Object.assign({}, t, { [k]: pick(dom) });
      };
      let B = A;
      for (const k of X) B = chg(B, k);
      let C = A;
      for (const k of Y) C = chg(C, k);
      const D = Object.assign({}, B);
      for (const k of Y) D[k] = C[k];
      if (![A, B, C, D].every(okTile)) return null;
      const it = { k: 'ana', show: [A, B, C], ans: D, at: X.concat(Y), x: X, y: Y };
      const fits = t => anaFits(it.show, t, KEYS);
      const seen = k => it.show.map(t => t[k]);
      let ds = pool(D, X.concat(Y), seen, fits, 3, 0);
      if (!ds) return null;
      // the copy mistakes (the picture above or beside the box) are the most tempting ones on easy levels
      if (!close) for (const t of [B, C]) if (!fits(t) && !ds.some(x => same(x, t)) && KEYS.filter(k => t[k] !== D[k]).length <= 2) ds[ds.length - 1] = Object.assign({}, t);
      ds = ds.filter((x, i) => ds.findIndex(y => same(x, y)) == i);
      if (ds.length < 3) return null;
      it.ch = ds;
      const p = paintItem(it, X.concat(Y), () => anaFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }

    // ---- 3x3 matrix ----
    function mat(nch, rules) {
      const useR = nch < 3 ? rnd() < 0.3 : rnd() < 0.25, ch = shuf(useR ? ['r', 'z', 'n'] : ['s', 'z', 'n']).slice(0, nch);
      const zch = ch.includes('z');
      const cst = { s: useR ? ARROW : R(0, 5), z: 2, n: pick([1, 2]), r: 0 };
      if (!zch && !ch.includes('n')) cst.z = pick([1, 2]);
      const g = range(9).map(() => Object.assign({}, cst)), rl = {};
      for (const k of ch) {
        const opts = rules.filter(x => !(x == 'prog' && k == 's'));
        const rule = rl[k] = pick(opts);
        let put;
        if (rule == 'prog') {
          if (k == 'z') { const v = pick([[0, 1, 2], [2, 1, 0]]); put = (i, j) => v[j]; }
          else if (k == 'n') {
            const d = pick([1, -1]), st = !zch && rnd() < 0.5 ? (d > 0 ? [1, 2, 3] : [5, 4, 3]) : (d > 0 ? [1, 1, 1] : [3, 3, 3]);
            put = (i, j) => st[i] + j * d;
          } else { const d = pick([1, 2, 6, 7]), st = range(3).map(() => R(0, 7)); put = (i, j) => (st[i] + j * d) & 7; }
        } else {
          const dom = k == 'n' ? (zch ? [1, 2, 3] : [1, 2, 3, 4]) : k == 'r' ? [0, 2, 4, 6] : DOM[k];
          const v = shuf(dom).slice(0, 3), sh = pick([1, 2]);
          put = rule == 'rowc' ? (i => v[i]) : ((i, j) => v[(j + i * sh) % 3]);
        }
        range(9).forEach(c => { g[c][k] = put(Math.floor(c / 3), c % 3); });
      }
      if (!g.every(okTile)) return null;
      const it = { k: 'mat', show: g.slice(0, 8), ans: g[8], at: ch, rules: rl };
      const seen = k => it.show.map(t => t[k]);
      const ds = pool(it.ans, ch, seen, t => matFits(it.show, t, KEYS), 4, 1);
      if (!ds) return null;
      it.ch = ds;
      const p = paintItem(it, ch.filter(k => k != 'r'), () => matFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }

    // ---- numbers ----
    function num(rules, max) {
      const rule = pick(rules);
      let v, n = 5;
      const ar = (s, d, m) => range(m).map(i => s + i * d);
      switch (rule) {
        case 'add1': v = ar(R(0, 10), R(1, 3), n); break;
        case 'add': v = ar(R(1, 20), pick([2, 3, 4, 5, 10]), n); break;
        case 'sub1': { const d = R(1, 3); v = ar(R(4 * d + 1, 20), -d, n); break; }
        case 'sub': { const d = pick([2, 3, 4, 5, 10]); v = ar(R(5 * d + 1, Math.min(100, 5 * d + 40)), -d, n); break; }
        case 'addbig': v = ar(R(10, 40), R(6, 12), n); break;
        case 'mul2': { const s = R(1, 5); v = range(n).map(i => s * 2 ** i); break; }
        case 'mul': { const q = pick([2, 3]), s = q == 2 ? R(1, 6) : R(1, 3); v = range(n).map(i => s * q ** i); break; }
        case 'alt': { const a = R(1, 5), b = pick([2, 3, 4, 5, 6, 8, 10].filter(x => x != a)); let x = R(1, 15); v = [x]; for (let i = 1; i < n; i++) v.push(x += i % 2 ? a : b); break; }
        case 'sq': { const s = R(1, 4); v = range(n).map(i => (s + i) ** 2); break; }
        case 'sqoff': { const s = R(1, 4), o = pick([-1, 1, 2, 3]); v = range(n).map(i => (s + i) ** 2 + o); break; }
        case 'tri': { const s = R(1, 4); v = range(n).map(i => (s + i) * (s + i + 1) / 2); break; }
        case 'affine': { const a = pick([2, 2, 3]), b = pick(a == 2 ? [-1, 1, 2, 3] : [-1, 1]); let x = R(a == 2 ? 2 : 1, a == 2 ? 6 : 3); v = [x]; for (let i = 1; i < n; i++) v.push(x = a * x + b); break; }
        case 'fib': { let a = R(1, 4), b = R(a, a + 4); v = [a, b]; while (v.length < n) v.push(v[v.length - 1] + v[v.length - 2]); break; }
        case 'inter': {
          n = 6;
          const s0 = R(1, 10), e0 = pick([1, 2, 3, 5]), s1 = R(20, 40), e1 = -pick([1, 2, 3, 4]);
          v = range(n + 1).map(i => i % 2 ? s1 + ((i - 1) / 2) * e1 : s0 + (i / 2) * e0);
          break;
        }
      }
      if (rule != 'inter') {
        // the next term of the same rule
        const nx = numNext(v);
        if (nx.size != 1) return null;
        v.push([...nx][0]);
      }
      const ans = v[n], show = v.slice(0, n);
      if (v.some(x => x < 0 || x > 999) || ans > max) return null;
      const nx = numNext(show);
      if (nx.size != 1 || !nx.has(ans)) return null;
      const last = show[n - 1], dl = last - show[n - 2], d0 = show[1] - show[0];
      const cands = [last + dl, ans + 1, ans - 1, ans + 2, ans - 2, last + d0, ans + dl, ans - dl, ans + 10, ans - 10, last * 2, last + dl + 1]
        .filter((x, i, a) => x > 0 && x !== ans && a.indexOf(x) == i && !nx.has(x) && Math.abs(x - ans) <= Math.max(12, ans * 0.6) && x <= max);
      if (cands.length < 3) return null;
      // the copy mistake (the same step again) first, then the near misses in random order
      const ds = [cands[0]].concat(shuf(cands.slice(1)).slice(0, 2));
      const ch = shuf(ds.concat([ans]));
      const it = { k: 'num', show, ch, a: ch.indexOf(ans), rule, at: ['v'] };
      return unique(it) ? it : null;
    }

    return { seq, odd, ana, mat, num, pick, R, shuf };
  }

  // the items of a puzzle: band and tier choose the kinds and how many attributes change
  function make(band, level, rnd) {
    const m = maker(rnd), t = tierOf(level);
    const plan = {
      A: [() => m.seq(SEQ.A1[t], true), () => m.odd(t == 0 ? 's' : m.pick(t == 1 ? ['z', 'n'] : ['s', 'z', 'n']), t == 2 ? 1 : 0), () => m.seq(SEQ.A2[t], true)],
      B: [() => m.num(NUM.B[t], 100), () => m.seq(SEQ.B[t]), () => m.ana(t == 2 ? 2 : 1, t > 0), () => m.odd(m.pick(['s', 'z', 'n']), t == 2 ? 2 : 1)],
      C: [() => m.mat(t == 0 ? 1 : 2, ['latin', 'prog', 'rowc']), () => m.num(NUM.C[t], 999), () => m.seq(SEQ.C[t]), () => m.mat(t == 0 ? 1 : 2, ['latin', 'prog', 'rowc'])],
      D: [() => m.mat(t == 0 ? 2 : 3, ['latin', 'prog', 'rowc']), () => m.num(NUM.D[t], 999), () => m.seq(SEQ.D[t]), () => m.mat(t == 0 ? 2 : 3, t == 2 ? ['latin', 'prog'] : ['latin', 'prog', 'rowc'])],
    }[band];
    // band B mixes the order of its four kinds by level
    const order = band == 'B' ? range(4).map(i => (i + level) % 4) : range(plan.length);
    const items = order.map(i => {
      for (let tries = 0; tries < 400; tries++) { const it = plan[i](); if (it) return it; }
      throw new Error('pattern: no item for ' + band + level);
    });
    return { v: 1, band, level, items };
  }
  const solve = p => p.items.map(it => it.a);

  /* ---------- words: prompts and hints ---------- */
  const ASK = { seq: 'What comes next?', num: 'What number comes next?', odd: 'Which one does not belong?', ana: 'Which one goes in the box?', mat: 'Which one goes in the box?' };
  const WATCH = { s: 'the shapes', z: 'the sizes', n: 'how many there are', r: 'where the arrow points' };
  const and = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
  const val = (k, v) => k == 's' ? SHAPES[v] : k == 'z' ? SIZES[v] : k == 'n' ? String(v) : DIRS[v];
  const turnWords = d => {
    const dd = d > 4 ? d - 8 : d, a = Math.abs(dd);
    return `turns ${a == 2 ? 'a quarter turn' : a == 1 ? 'an eighth of a turn' : a + ' eighths of a turn'} ${dd > 0 ? 'the way clock hands go' : 'the other way'}`;
  };
  // the words of a tile, for aria labels: "2 small red circles"
  function say(t) {
    const nm = SHAPES[t.s] + (t.n > 1 ? 's' : ''), dir = t.s == ARROW ? ` pointing ${DIRS[t.r]}` : '';
    return `${t.n > 1 ? t.n + ' ' : ''}${SIZES[t.z]} ${COLS[t.c]} ${nm}${dir}`;
  }
  const NUMRULE = {
    add1: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    add: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    addbig: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    sub1: v => `Each number is ${v[0] - v[1]} less than the one before.`,
    sub: v => `Each number is ${v[0] - v[1]} less than the one before.`,
    mul2: () => 'Each number is double the one before.',
    mul: v => v[1] / v[0] == 2 ? 'Each number is double the one before.' : 'Each number is 3 times the one before.',
    alt: v => `It goes up ${v[1] - v[0]}, then ${v[2] - v[1]}, then ${v[1] - v[0]}, then ${v[2] - v[1]}.`,
    sq: v => `They are square numbers: ${Math.sqrt(v[0])} x ${Math.sqrt(v[0])}, ${Math.sqrt(v[1])} x ${Math.sqrt(v[1])}, and so on.`,
    sqoff: v => `It goes up ${v[1] - v[0]}, ${v[2] - v[1]}, ${v[3] - v[2]}: each jump is 2 more than the last.`,
    tri: v => `It goes up ${v[1] - v[0]}, ${v[2] - v[1]}, ${v[3] - v[2]}: each jump is 1 more than the last.`,
    affine: v => { const a = (v[2] - v[1]) / (v[1] - v[0]), b = v[1] - a * v[0]; return `Times ${a}, then ${b < 0 ? 'take away ' + -b : 'add ' + b}.`; },
    fib: () => 'Each number is the two numbers before it added together.',
    inter: v => `Two patterns take turns: ${v[0]}, ${v[2]}, ${v[4]} and ${v[1]}, ${v[3]}, ${v[5]}.`,
  };
  const NUMWATCH = { fib: 'Look at the two numbers before each one.', inter: 'Look at every other number.' };
  // the rule of one attribute of a sequence, in words
  function seqRule(it, k) {
    const u = it.spec[k];
    if (/^[+-]/.test(u)) return k == 'n' ? (+u > 0 ? 'There is one more each time.' : 'There is one less each time.') : `The arrow ${turnWords(+u)} each time.`;
    const v = it.show.slice(0, u.length).map(t => val(k, t[k]));
    const nm = { s: 'The shapes go', z: 'The sizes go', n: 'The numbers of shapes go', r: 'The arrow points' }[k];
    return `${nm} ${v.join(', ')}, then again.`;
  }
  function matRule(it, k) {
    const r = it.rules[k], row = it.show.slice(0, 3).map(t => t[k]);
    if (r == 'rowc') return { s: 'In each row, the shapes are the same.', z: 'In each row, the sizes are the same.', n: 'In each row, every picture has the same number of shapes.', r: 'In each row, the arrows point the same way.' }[k];
    const srt = row.slice().sort((a, b) => a - b);
    if (r == 'latin') return {
      s: `In each row there is one ${and(row.map(v => SHAPES[v]))}.`.replace(/, /g, ', one ').replace(' and ', ' and one '),
      z: 'In each row there is one small, one medium and one big picture.',
      n: `In each row there are pictures with ${and(srt.map(String))} shapes.`,
      r: `In each row the arrows point ${and(row.map(v => DIRS[v]))}, in some order.`,
    }[k];
    if (k == 'z') return row[0] < row[1] ? 'In each row, the shapes get bigger.' : 'In each row, the shapes get smaller.';
    if (k == 'n') return row[0] < row[1] ? 'In each row, there is one more shape each time.' : 'In each row, there is one less shape each time.';
    return `In each row, the arrow ${turnWords((row[1] - row[0] + 8) & 7)} each time.`;
  }
  function anaRule(it) {
    const [A, B] = it.show;
    return 'From the first picture to the second, ' + and(it.x.map(k => k == 's' ? `the ${SHAPES[A.s]} turns into a ${SHAPES[B.s]}`
      : k == 'z' ? `it gets ${B.z > A.z ? 'bigger' : 'smaller'}` : `${A.n} ${A.n > 1 ? 'shapes become' : 'shape becomes'} ${B.n}`)) + '.';
  }
  // the hint words of tier 1 and 2. band: bands C and D (R-01b) get the rule of ONE changing attribute at tier 2 and are told
  // which others to check, so the hint teaches a way in and does not state the whole answer; A and B keep every rule
  function hintText(it, tier, band) {
    if (it.k == 'num') return tier == 1 ? (NUMWATCH[it.rule] || 'Look at how each number changes from the one before.') : NUMRULE[it.rule](it.show);
    if (tier == 1) return 'Look at ' + and(it.at.map(k => WATCH[k])) + '.';
    const k = it.at[0], one = (band == 'C' || band == 'D') && it.at.length > 1;
    const rest = () => ' Now check ' + and(it.at.slice(1).map(a => WATCH[a])) + ' yourself.';
    if (it.k == 'seq') return one ? seqRule(it, k) + rest() : it.at.map(a => seqRule(it, a)).join(' ');
    if (it.k == 'mat') return one ? matRule(it, k) + rest() : it.at.map(a => matRule(it, a)).join(' ');
    if (it.k == 'ana') return anaRule(it);
    const t = it.ch[(it.a + 1) % 4];
    return { s: `Three of them are ${SHAPES[t.s]}s.`, z: `Three of them are ${SIZES[t.z]}.`, n: `Three of them have ${t.n} ${t.n > 1 ? 'shapes' : 'shape'}.` }[k];
  }

  /* ---------- drawing ---------- */
  const f1 = x => Math.round(x * 10) / 10;
  const STAR = (() => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 37;
      d += (i ? 'L' : 'M') + f1(r * Math.cos(a)) + ' ' + f1(r * Math.sin(a) + 3);
    }
    return d + 'Z';
  })();
  // shapes in a box of about -38..38 around 0,0 (the arrow points right); g: a gloss stroke on the side toward the light
  const SP = [
    { d: 'M-35 0A35 35 0 1 1 35 0A35 35 0 1 1 -35 0Z', g: 'M-22 -14A25 25 0 0 1 -8 -25' },
    { d: 'M-29 -29H29V29H-29Z', g: 'M-20 -20H-6' },
    { d: 'M0 -33L35 29H-35Z', g: 'M-8 -12L-16 3' },
    { d: 'M0 -38L35 0L0 38L-35 0Z', g: 'M-20 -8L-9 -20' },
    { d: STAR, g: 'M-9 -9L-4 -21' },
    { d: 'M0 33C-44 6 -38 -31 -17 -31C-7 -31 -1 -24 0 -17C1 -24 7 -31 17 -31C38 -31 44 6 0 33Z', g: 'M-26 -9C-27 -18 -22 -23 -15 -24' },
    { d: 'M-34 -12H2V-30L36 0L2 30V12H-34Z', g: 'M-27 -5H-5', turn: true },
  ];
  // copies of a shape: where they sit (in a 100 x 100 tile) and how big, by count
  const SPOT = {
    1: [[50, 50]], 2: [[28, 50], [72, 50]], 3: [[50, 28], [28, 71], [72, 71]], 4: [[29, 29], [71, 29], [29, 71], [71, 71]],
    5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
  };
  const SCALE = { 1: 1.08, 2: 0.54, 3: 0.52, 4: 0.48, 5: 0.4 }, ZF = [0.54, 0.77, 1];
  function copy(t, x, y, k) {
    const s = SP[t.s], rot = s.turn ? ` rotate(${t.r * 45})` : '';
    return `<g transform="translate(${x} ${y}) scale(${f1(k * 100) / 100})">` +
      `<path class="pt-sw" transform="translate(4 5)${rot}" d="${s.d}"/>` +
      `<path class="pt-sd"${rot ? ` transform="${rot.trim()}"` : ''} d="${s.d}"/>` +
      `<path class="pt-sb" transform="translate(-3 -3)${rot} scale(.86)" d="${s.d}"/>` +
      `<path class="pt-sg" transform="translate(-3 -3)${rot} scale(.86)" d="${s.g}"/></g>`;
  }
  // AUD-BT S-4: an item whose rule changes both the size and the count (a matrix with "the shapes get bigger" and 1, 2, 3 shapes
  // in a row) is drawn "flat": every shape at one scale for its size, whatever the count, so big is always drawn bigger than
  // medium and the hint's words are true on screen. Other items keep a single shape filling its tile.
  // flatOf(item): 0, or the one scale of the item's pictures (that of the largest count among its pictures and choices)
  const flatOf = it => !!it && Array.isArray(it.at) && it.at.includes('z') && it.at.includes('n')
    ? Math.min(...(it.show || []).concat(it.ch || []).map(t => SCALE[t.n])) : 0;
  function tile(t, flat) {
    const k = (flat || SCALE[t.n]) * ZF[t.z];
    return `<svg class="pt-t" viewBox="0 0 100 100" aria-hidden="true"><g class="pt-c${t.c}">` +
      SPOT[t.n].map(([x, y]) => copy(t, x, y, k)).join('') + '</g></svg>';
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState() || { i: 0, miss: 0, h: 0, x: [], g: [] }, busy = 0, alive = true;
    const N = p.items.length;
    const face = (it, c) => it.k == 'num' ? `<b class="pt-nm">${c}</b>` : tile(c, flatOf(it));
    const cell = (inner, cls) => `<span class="pt-cell${cls ? ' ' + cls : ''}">${inner}</span>`;
    const qbox = '<span class="pt-cell pt-q" aria-label="The missing one"><b>?</b></span>';
    function board(it) {
      if (it.k == 'odd') return '';
      if (it.k == 'num') return `<div class="pt-board pt-row pt-nrow" style="--n:${it.show.length + 1}">${it.show.map(v => cell(`<b class="pt-nm">${v}</b>`)).join('')}${qbox}</div>`;
      if (it.k == 'seq') {
        const n = it.show.length + 1;
        return `<div class="pt-board pt-row${n > 6 ? ' pt-wrap' : ''}" style="--n:${n};--n2:${Math.ceil(n / 2)}" role="img" aria-label="A row of pictures">` +
          it.show.map(t => cell(tile(t, flatOf(it)))).join('') + qbox + '</div>';
      }
      const w = it.k == 'mat' ? 3 : 2;
      return `<div class="pt-board pt-grid g${w}" role="img" aria-label="${w} by ${w} pictures">${it.show.map(t => cell(tile(t, flatOf(it)))).join('')}${qbox}</div>`;
    }
    function draw() {
      const it = p.items[st.i];
      const dots = range(N).map(i => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        const lab = it.k == 'num' ? String(c) : say(c);
        return `<button class="choice pt-ch${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${esc(lab)}"${x || g ? ' disabled' : ''}>${face(it, c)}</button>`;
      }).join('');
      el.innerHTML = `<div class="pt pt-${it.k}"><div class="pt-head"><span class="pt-dots" role="img" aria-label="Question ${st.i + 1} of ${N}">${dots}</span>` +
        `<p class="pt-ask">${esc(ASK[it.k])}</p>${UI.ibtn('speak', 'Hear the question', { size: 'sm', cls: 'pt-say' })}</div>` +
        `<div class="pt-main">${board(it)}<div class="pt-side"><p class="pt-tip" role="status"${st.h && st.h < 3 ? '' : ' hidden'}>${ico('hint', 24)}<span>${st.h && st.h < 3 ? esc(hintText(it, st.h, p.band)) : ''}</span></p>` +
        `<div class="pt-chs n${it.ch.length}">${chs}</div></div></div></div>`;
      el.querySelector('.pt-say').onclick = () => api.say(ASK[it.k]);
      el.querySelectorAll('.pt-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
      rowScale();
    }
    // R-01b: picture choices are drawn at the scale of the pictures on the board (a choice tile was about 1.6 times a row tile,
    // so a medium wrong choice looked as big as the row's big ones). --pt-ts = the width of one board picture, in px.
    function rowScale() {
      const box = el.querySelector('.pt'), t = el.querySelector('.pt-board .pt-t');
      if (!box || !t) return;
      const board = el.querySelector('.pt-board');
      board.style.width = '';
      let w = t.getBoundingClientRect().width;
      if (w > 0) box.style.setProperty('--pt-ts', (Math.round(w * 10) / 10) + 'px');
      // AUD-BT S-8: where a choice button has no room for a picture of the board's size (the 2 x 2 board on a phone: 90 px
      // pictures, four choices in a row with room for 70 px), the board is made smaller until its pictures are the size of the
      // choices' pictures, so sizes are still compared like with like
      const c = el.querySelector('.pt-ch .pt-t');
      for (let i = 0; i < 4 && c && w > 0; i++) {
        const cw = c.getBoundingClientRect().width;
        if (!(cw > 0) || cw >= w - 0.3) break;
        board.style.width = Math.floor(board.getBoundingClientRect().width * cw / w) + 'px';
        w = t.getBoundingClientRect().width;
        box.style.setProperty('--pt-ts', (Math.round(w * 10) / 10) + 'px');
      }
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (alive) rowScale(); }, 80); };
    addEventListener('resize', onResize);
    function tap(i, b) {
      const it = p.items[st.i];
      if (busy || !alive || st.x.includes(i) || st.g.includes(i)) return;
      if (i !== it.a) {
        st.miss++;
        st.x.push(i);
        api.saveState(st);
        b.classList.add('wrong');
        b.disabled = true;
        api.sfx.wrong();
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.pt-ch').forEach(x => { x.disabled = true; });
      const q = el.querySelector('.pt-q');
      if (q) { q.classList.remove('pt-q'); q.classList.add('pt-got'); q.innerHTML = face(it, it.ch[it.a]); q.removeAttribute('aria-label'); }
      api.sfx.right(st.i + 3);
      const last = st.i == N - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) { api.win({ mistakes: st.miss }); return; }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) { draw(); if (api.band == 'A') api.say(ASK[p.items[st.i].k]); } }, 1100);
    }
    draw();
    setTimeout(() => { if (alive) rowScale(); }, 60); // the frame can still be settling (fonts, the top bar)
    // band A says every question; band B says the first one of a fresh puzzle (R-01b: first graders are not asked to read it)
    if (api.band == 'A' || (api.band == 'B' && st.i == 0 && !st.miss && !st.h && !st.x.length)) api.say(ASK[p.items[st.i].k]);
    return {
      hint() {
        if (busy || st.i >= N) return false;
        const it = p.items[st.i];
        if (st.h >= 3) return false; // this item's hints are used up
        if (st.h < 2) {
          st.h++;
          api.saveState(st);
          const tip = el.querySelector('.pt-tip'), w = hintText(it, st.h, p.band);
          tip.querySelector('span').textContent = w;
          tip.hidden = false;
          api.say(w);
          return true;
        }
        // tier 3: two wrong choices go away (fewer when fewer are left)
        const left = it.ch.map((_, i) => i).filter(i => i !== it.a && !st.x.includes(i) && !st.g.includes(i));
        if (!left.length) return false;
        st.h = 3;
        const go = left.slice(0, 2);
        st.g.push(...go);
        api.saveState(st);
        go.forEach(i => { const b = el.querySelector(`.pt-ch[data-c="${i}"]`); b.classList.add('off'); b.disabled = true; });
        el.querySelector('.pt-tip').hidden = true;
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); clearTimeout(rz); removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, hintText, tile, flatOf, say, seqNext, numNext, unique, SHAPES, COLS, SCALE, ZF };
})();

BT.reg({
  id: 'pattern', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: PAT.make, mount: PAT.mount, solve: PAT.solve,
});
/* ---------- Brain Teasers: number puzzles (P3-10; BRAIN_TEASERS.md 5.6, 7) ----------
   Three types, registered separately as the catalog lists them (section 4):
     pyramid  Number Pyramid, bands B C D: each brick is the sum of the two under it. 3 / 4 / 5 rows, bottom numbers 1-9 / 1-12 / 1-20.
              As many givens as the bottom row has bricks (plus 2, 1, 0 extra over levels 1-3, 4-7, 8-12). Accepted only when the
              givens fix every brick (full rank, small Gaussian elimination) and, in bands B and C, when "two of a triple known gives
              the third" fills the pyramid. Band D levels 10-12 look for puzzles that need more than that and mark them tricky.
     balance  Balance, bands A B C D: pictures stand for hidden whole numbers on level scales. A one unknown (1-5); B two, triangular
              (each scale adds one new picture, 1-10); C three, triangular, repeated pictures, and a last question that is an
              expression (apple + banana x 2 = ?, 1-12); D not triangular: two scales in two unknowns (sum and difference,
              2a + b and a + b, a + 2b and 2a + b), from level 9 three in three (pair sums, a sum and two differences), 1-20.
              Built from the answer, so there is exactly one (the determinant is checked).
     target   Make the Number, bands B C D: B two of five tiles with + or - (target 5-20); C all of three tiles with + - x (target
              up to 50); D all of four tiles 1-13 with + - x / (target 24 on levels 1-6, 10-100 after). Built from a random
              expression; an exhaustive search (whole, non-negative steps) counts the different solutions, and a level picks among
              six candidates by that count: level 1 the most solutions, level 12 the fewest. Any correct way wins.
   Entry uses the question screen's number pad (padHTML from 49-kinds.js) laid out in two rows; a wrong number counts a mistake,
   shakes, and on a balance tips the scale to the heavier side. The pure rules (make, check, hint, solve) live in BTN so tools/test.js
   can run them without a page. Hints: tier 1 points (marks), tier 2 says how (never the number), tier 3 fills one answer or does
   one step; pressing again fills the next one, so a child can always finish.
   Drawing: tokens only (classes in src/css/49-bt-number.css), light from the top left (gloss upper left, shade and ledge lower
   right). The balance is inline SVG whose arm turns and whose trays move with CSS transforms. */
const BTN = (() => {
  const ri = (rnd, a, b) => a + Math.floor(rnd() * (b - a + 1));
  const pickR = (rnd, a) => a[Math.floor(rnd() * a.length)];
  const shuf = (rnd, a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const ramp = level => (Math.min(12, Math.max(1, level)) - 1) / 11; // 0 at level 1, 1 at level 12

  /* ================= Number Pyramid ================= */
  // Bricks are numbered row by row from the bottom: row r (0 = bottom) has n - r bricks; brick (r, i) sits on (r-1, i) and (r-1, i+1).
  const PYR = {
    ROWS: { B: 3, C: 4, D: 5 },
    MAX: { B: 9, C: 12, D: 20 }, // bottom numbers 1..MAX
    id(n, r, i) {
      let k = 0;
      for (let q = 0; q < r; q++) k += n - q;
      return k + i;
    },
    // [[r, i], ...] for every brick index
    cells(n) {
      const out = [];
      for (let r = 0; r < n; r++) for (let i = 0; i < n - r; i++) out.push([r, i]);
      return out;
    },
    // every triple: [top, left, right] brick indices
    triples(n) {
      const out = [];
      for (let r = 1; r < n; r++) for (let i = 0; i < n - r; i++) out.push([PYR.id(n, r, i), PYR.id(n, r - 1, i), PYR.id(n, r - 1, i + 1)]);
      return out;
    },
    values(bottom) {
      const n = bottom.length, v = bottom.slice();
      for (let r = 1; r < n; r++) for (let i = 0; i < n - r; i++) v.push(v[PYR.id(n, r - 1, i)] + v[PYR.id(n, r - 1, i + 1)]);
      return v;
    },
    // the coefficients of brick (r, i) on the bottom row: binomials C(r, k) at i..i+r
    coef(n, r, i) {
      const c = new Array(n).fill(0);
      let b = 1;
      for (let k = 0; k <= r; k++) {
        c[i + k] = b;
        b = b * (r - k) / (k + 1);
      }
      return c;
    },
    // rank of the givens' rows (Gaussian elimination with partial pivoting; numbers are small)
    rank(n, given) {
      const cells = PYR.cells(n), m = given.map(g => PYR.coef(n, cells[g][0], cells[g][1]));
      let rank = 0;
      for (let col = 0; col < n && rank < m.length; col++) {
        let piv = rank;
        for (let r = rank + 1; r < m.length; r++) if (Math.abs(m[r][col]) > Math.abs(m[piv][col])) piv = r;
        if (Math.abs(m[piv][col]) < 1e-9) continue;
        [m[rank], m[piv]] = [m[piv], m[rank]];
        for (let r = 0; r < m.length; r++) {
          if (r == rank) continue;
          const f = m[r][col] / m[rank][col];
          if (f) for (let c = col; c < n; c++) m[r][c] -= f * m[rank][c];
        }
        rank++;
      }
      return rank;
    },
    // "two of a triple known gives the third", repeated. known: array of booleans (changed in place). Returns the number filled.
    spread(n, v, known) {
      const T = PYR.triples(n);
      let added = 0, more = true;
      while (more) {
        more = false;
        for (const [t, a, b] of T) {
          const k = known[t] + known[a] + known[b];
          if (k != 2) continue;
          if (!known[t]) known[t] = true; else if (!known[a]) known[a] = true; else known[b] = true;
          added++;
          more = true;
        }
      }
      return added;
    },
    // A guess g for brick k: every brick that then follows is a + c * g. Where a triple is known three ways, the two bricks under
    // it less the brick above is A + C * g, and it is 0 for the right guess. Returns 1 when every such check has C > 0 (a guess
    // that is too big makes the bricks above come out too big), -1 when every one has C < 0, 0 when they differ or nothing checks.
    guessWay(p, known, k) {
      const T = PYR.triples(p.n), A = p.v.map((x, i) => known[i] ? [x, 0] : null);
      A[k] = [0, 1];
      for (let more = true; more;) {
        more = false;
        for (const [t, a, b] of T) {
          if ((A[t] ? 1 : 0) + (A[a] ? 1 : 0) + (A[b] ? 1 : 0) != 2) continue;
          if (!A[t]) A[t] = [A[a][0] + A[b][0], A[a][1] + A[b][1]];
          else if (!A[a]) A[a] = [A[t][0] - A[b][0], A[t][1] - A[b][1]];
          else A[b] = [A[t][0] - A[a][0], A[t][1] - A[a][1]];
          more = true;
        }
      }
      let up = 0, down = 0;
      for (const [t, a, b] of T) if (A[t] && A[a] && A[b]) { const c = A[a][1] + A[b][1] - A[t][1]; if (c > 0) up++; else if (c < 0) down++; }
      return up && !down ? 1 : down && !up ? -1 : 0;
    },
    nextStep(p, known) {
      for (const [t, a, b] of PYR.triples(p.n)) {
        if (!known[t] && known[a] && known[b]) return { at: t, from: [a, b], how: 'add' };
        if (known[t] && !known[a] && known[b]) return { at: a, from: [t, b], how: 'sub' };
        if (known[t] && known[a] && !known[b]) return { at: b, from: [t, a], how: 'sub' };
      }
      return null;
    },
    make(band, level, rnd) {
      const n = PYR.ROWS[band], hi = Math.max(4, Math.round(PYR.MAX[band] * (0.5 + 0.5 * ramp(level))));
      const extra = level <= 3 ? 2 : level <= 7 ? 1 : 0, need = n + extra, all = n * (n + 1) / 2;
      const wantTricky = band == 'D' && level >= 10;
      let best = null;
      for (let at = 0; at < 400; at++) {
        const bottom = [];
        for (let i = 0; i < n; i++) bottom.push(ri(rnd, 1, hi));
        const v = PYR.values(bottom);
        let given;
        if (level <= 3) { // the whole bottom row and a few more: only adding
          given = [...Array(n).keys()].concat(shuf(rnd, [...Array(all - n).keys()].map(k => k + n)).slice(0, extra));
        } else given = shuf(rnd, [...Array(all).keys()]).slice(0, need);
        if (PYR.rank(n, given) < n) continue;
        const known = new Array(all).fill(false);
        given.forEach(g => known[g] = true);
        PYR.spread(n, v, known);
        const easy = known.every(Boolean);
        if (!easy && band != 'D') continue;
        const p = { n, v, g: v.map((x, k) => given.includes(k) ? 1 : 0), tricky: !easy };
        if (wantTricky ? !easy : easy) return p;
        if (easy && !best) best = p; // a tricky one was wanted but not found yet: keep a fair one in reserve
      }
      if (best) return best;
      const bottom = [];
      for (let i = 0; i < n; i++) bottom.push(ri(rnd, 1, hi));
      const v = PYR.values(bottom);
      return { n, v, g: v.map((x, k) => k < n ? 1 : 0), tricky: false };
    },
    hidden: p => p.v.map((x, k) => k).filter(k => !p.g[k]),
    known(p, st) {
      return p.v.map((x, k) => !!p.g[k] || st.done.includes(k));
    },
    // Hint for the current state (st.done = bricks filled). Returns {say, mark: [bricks], fill: brick | null} or null when finished.
    hint(p, st, tier) {
      const known = PYR.known(p, st);
      if (known.every(Boolean)) return null;
      const s = PYR.nextStep(p, known);
      if (s) {
        const [x, y] = s.from;
        if (tier == 1) return { say: s.how == 'add' ? 'You can find the glowing brick now: it sits on two bricks you know.'
          : 'You can find the glowing brick now: look at the brick above it and the brick next to it.', mark: [s.at], fill: null };
        if (tier == 2) return { say: s.how == 'add' ? `Add the two bricks under it: ${p.v[x]} + ${p.v[y]}.`
          : `The brick above is ${p.v[x]}. Take away the brick next to it, ${p.v[y]}.`, mark: [s.at, x, y], fill: null };
        const say = `${p.v[x]} ${s.how == 'add' ? '+' : '−'} ${p.v[y]} = ${p.v[s.at]}`;
        return { say, mark: [s.at, x, y], fill: s.at };
      }
      // tricky: no brick follows from two others. The brick to try is the one that lets the most bricks follow.
      // AUD-BT S-3: tier 2 says "If the bricks above come out too big, guess smaller", so the brick to try is one for which that
      // is true: every brick that can be checked against a known one comes out too big when the guess is too big (PYR.guessWay).
      // Among those, the one that lets the most bricks follow. (It was the most bricks alone, and for 4 tricky pyramids in 10 a
      // bigger guess made the bricks above smaller.) When no brick is like that, the old choice stands.
      let at = -1, most = -1, okAt = -1, okMost = -1;
      for (const k of PYR.hidden(p)) {
        if (known[k]) continue;
        const kn = known.slice();
        kn[k] = true;
        const got = PYR.spread(p.n, p.v, kn);
        if (got > most) { most = got; at = k; }
        if (got > okMost && PYR.guessWay(p, known, k) == 1) { okMost = got; okAt = k; }
      }
      if (okAt >= 0) at = okAt;
      if (tier == 1) {
        return { say: 'A tricky one! No brick follows from two others yet. Start with the glowing brick.', mark: [at], fill: null };
      }
      if (tier == 2) return { say: 'Guess a number for the glowing brick and work out the other bricks. If a brick does not match, '
        + 'try another number.', mark: [at], fill: null };
      return { say: `This brick is ${p.v[at]}.`, mark: [at], fill: at };
    },
    // the bricks to fill, in an order a child could find them (used by tests and the smoke bot): [[brick, value], ...]
    solve(p) {
      const st = { done: [] }, out = [];
      for (let guard = 0; guard < 40; guard++) {
        const h = PYR.hint(p, st, 3);
        if (!h) break;
        st.done.push(h.fill);
        out.push([h.fill, p.v[h.fill]]);
      }
      return out;
    },
  };

  /* ================= Balance ================= */
  // A puzzle: {f: [art names], v: [values], eqs: [{l: [count per picture], lc, r: [...], rc}], q: {c: [counts], v} | null, form}
  // Slots the child fills: 0..m-1 (the pictures) and 'q' (band C's last question).
  const BAL = {
    PICS: ['apple', 'banana', 'cookie', 'cake', 'ball', 'gift'],
    NAME: { apple: ['apple', 'apples'], banana: ['banana', 'bananas'], cookie: ['cookie', 'cookies'], cake: ['cake', 'cakes'],
      ball: ['ball', 'balls'], gift: ['present', 'presents'] },
    VMAX: { A: [3, 5], B: [5, 10], C: [6, 12], D: [8, 20] }, // value range 1..max, the max grows from the first to the second number
    eq(m, l, lc, r, rc) {
      const z = () => new Array(m).fill(0), L = z(), R = z();
      l.forEach(k => L[k]++);
      r.forEach(k => R[k]++);
      return { l: L, lc: lc || 0, r: R, rc: rc || 0 };
    },
    side: (cs, k, v) => cs.reduce((a, c, i) => a + c * v[i], k),
    net: (e, i) => e.l[i] - e.r[i],
    det(M) {
      if (M.length == 1) return M[0][0];
      if (M.length == 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
      return M[0].reduce((s, a, j) => s + (j % 2 ? -1 : 1) * a * BAL.det(M.slice(1).map(row => row.filter((x, k) => k != j))), 0);
    },
    make(band, level, rnd) {
      const [m0, m1] = BAL.VMAX[band], vmax = Math.round(m0 + (m1 - m0) * ramp(level));
      const val = (lo, hi) => ri(rnd, lo, Math.max(lo, hi));
      const distinct = (k, lo, hi) => { // k different values in lo..hi
        const pool = shuf(rnd, [...Array(hi - lo + 1).keys()].map(x => x + lo));
        return pool.slice(0, k);
      };
      const m = { A: 1, B: 2, C: 3, D: level <= 8 ? 2 : 3 }[band];
      const f = shuf(rnd, BAL.PICS).slice(0, m);
      const E = (l, lc, r, rc) => BAL.eq(m, l, lc, r, rc);
      let v, eqs, q = null, form;
      if (band == 'A') {
        // apple + k = W, then apple + apple = W, then three apples or two apples and a weight; totals stay at 10 or less
        if (level <= 3) {
          v = [val(1, vmax)];
          const k = val(1, Math.min(3, 10 - v[0]));
          eqs = [E([0], k, [], v[0] + k)];
          form = 'a+k';
        } else if (level <= 8 || rnd() < 0.5) {
          v = [val(1, vmax)];
          eqs = [E([0, 0], 0, [], 2 * v[0])];
          form = 'aa';
        } else if (rnd() < 0.5) {
          v = [val(1, 3)];
          eqs = [E([0, 0, 0], 0, [], 3 * v[0])];
          form = 'aaa';
        } else {
          v = [val(1, 4)];
          const k = val(1, 10 - 2 * v[0]);
          eqs = [E([0, 0], k, [], 2 * v[0] + k)];
          form = 'aa+k';
        }
        if (level >= 6 && rnd() < 0.5) eqs = eqs.map(e => ({ l: e.r, lc: e.rc, r: e.l, rc: e.lc })); // the picture on the right
      } else if (band == 'B') {
        v = distinct(2, 1, vmax);
        const [x, y] = v;
        const e1 = level <= 4 ? 'xx' : level <= 8 ? pickR(rnd, ['xx', 'x+k']) : pickR(rnd, x <= 6 ? ['xxx', 'xx+k'] : ['xx+k']);
        const k = val(1, 5);
        eqs = [{ xx: () => E([0, 0], 0, [], 2 * x), 'x+k': () => E([0], k, [], x + k), xxx: () => E([0, 0, 0], 0, [], 3 * x),
          'xx+k': () => E([0, 0], k, [], 2 * x + k) }[e1]()];
        const e2s = level <= 4 ? ['x+y'] : level <= 8 ? ['x+y', 'x+yy'] : (y > x ? ['x+yy', 'y=x+k', 'yy+x'] : ['x+yy', 'yy+x']);
        const e2 = pickR(rnd, e2s);
        eqs.push({
          'x+y': () => E([0, 1], 0, [], x + y),
          'x+yy': () => E([0, 1, 1], 0, [], x + 2 * y),
          'yy+x': () => E([1, 1, 0], 0, [], x + 2 * y),
          'y=x+k': () => E([1], 0, [0], y - x),
        }[e2]());
        form = e1 + ',' + e2;
        if (level >= 9 && rnd() < 0.6) eqs.reverse();
      } else if (band == 'C') {
        v = distinct(3, 1, vmax);
        const [x, y, z] = v, k = val(1, 6);
        const e1 = pickR(rnd, x <= 8 ? ['xx', 'xxx', 'xx+k'] : ['xx', 'xx+k']);
        eqs = [{
          xx: () => E([0, 0], 0, [], 2 * x),
          xxx: () => E([0, 0, 0], 0, [], 3 * x),
          'xx+k': () => E([0, 0], k, [], 2 * x + k),
        }[e1]()];
        const [a2, b2] = pickR(rnd, [[1, 1], [1, 2], [2, 1]]);
        eqs.push(E([...Array(a2).fill(0), ...Array(b2).fill(1)], 0, [], a2 * x + b2 * y));
        const p3 = rnd() < 0.5 ? 0 : 1, [a3, b3] = pickR(rnd, [[1, 1], [1, 2], [2, 1]]);
        eqs.push(E([...Array(a3).fill(p3), ...Array(b3).fill(2)], 0, [], a3 * v[p3] + b3 * z));
        const qc = pickR(rnd, [[1, 2, 0], [2, 1, 0], [0, 1, 2], [0, 2, 1], [1, 0, 2], [2, 0, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2]]);
        q = { c: qc, v: BAL.side(qc, 0, v) };
        form = e1 + ',' + a2 + b2 + ',' + a3 + b3;
        if (level >= 7) eqs = shuf(rnd, eqs);
      } else {
        if (m == 2) {
          form = level <= 4 ? 'sd' : pickR(rnd, ['pq', 'xy']);
          if (form == 'sd') { // x + y = s, x = y + d
            const y = val(1, vmax - 1), x = val(y + 1, vmax);
            v = [x, y];
            eqs = [E([0, 1], 0, [], x + y), E([0], 0, [1], x - y)];
          } else if (form == 'pq') { // 2x + y = p, x + y = q
            v = distinct(2, 1, vmax);
            eqs = [E([0, 0, 1], 0, [], 2 * v[0] + v[1]), E([0, 1], 0, [], v[0] + v[1])];
          } else { // x + 2y = p, 2x + y = q
            v = distinct(2, 1, vmax);
            eqs = [E([0, 1, 1], 0, [], v[0] + 2 * v[1]), E([0, 0, 1], 0, [], 2 * v[0] + v[1])];
          }
        } else {
          form = pickR(rnd, ['pair', 'chain']);
          if (form == 'pair') { // x + y, y + z, x + z
            v = distinct(3, 1, vmax);
            eqs = [E([0, 1], 0, [], v[0] + v[1]), E([1, 2], 0, [], v[1] + v[2]), E([0, 2], 0, [], v[0] + v[2])];
          } else { // x + y + z = s, x = y + d, z = y + e
            const y = val(1, vmax - 2), [d, e] = distinct(2, 1, Math.max(2, Math.min(9, vmax - y)));
            v = [y + d, y, y + e];
            eqs = [E([0, 1, 2], 0, [], 3 * y + d + e), E([0], 0, [1], d), E([2], 0, [1], e)];
          }
        }
        if (level >= 5 && rnd() < 0.5) eqs = shuf(rnd, eqs);
      }
      if (BAL.det(eqs.slice(0, m).map(e => e.l.map((c, i) => c - e.r[i]))) == 0) throw new Error('balance: singular');
      return { f, v, eqs, q, form };
    },
    slots: p => [...p.v.keys()].concat(p.q ? ['q'] : []),
    answer: (p, s) => s === 'q' ? p.q.v : p.v[s],
    // an equation where picture i is the only one not solved yet (and does not cancel out), or -1
    lone(p, solved, i) {
      return p.eqs.findIndex(e => BAL.net(e, i) != 0 && e.l.every((c, j) => j == i || solved.includes(j) || (!c && !e.r[j])));
    },
    // the scale a wrong number for picture i is tried on: a scale where it is the only unknown left, else any with it
    tryOn(p, solved, i) {
      const k = BAL.lone(p, solved, i);
      return k >= 0 ? k : p.eqs.findIndex(e => BAL.net(e, i) != 0);
    },
    // which way scale k tips when picture i weighs w (the others their real weight): -1 left down, 1 right down, 0 level
    tip(p, k, i, w) {
      const v = p.v.slice();
      v[i] = w;
      const e = p.eqs[k];
      return Math.sign(BAL.side(e.r, e.rc, v) - BAL.side(e.l, e.lc, v));
    },
    nm: (p, i, c) => BAL.NAME[p.f[i]][c == 1 ? 0 : 1],
    // Hint for the current state (st.done = slots solved). {say, mark: {eqs: [k], slot}, fill: slot | null} or null when finished.
    hint(p, st, tier) {
      const solved = st.done.filter(s => s !== 'q');
      const open = p.v.map((x, i) => i).filter(i => !solved.includes(i));
      if (!open.length) {
        if (!p.q || st.done.includes('q')) return null;
        const terms = [];
        p.q.c.forEach((c, i) => { for (let j = 0; j < c; j++) terms.push(p.v[i]); });
        const mark = { eqs: [], slot: 'q' };
        if (tier == 1) return { say: 'Now put the weight of each picture into the last question.', mark, fill: null };
        if (tier == 2) return { say: `Add them up: ${terms.join(' + ')}.`, mark, fill: null };
        return { say: `${terms.join(' + ')} = ${p.q.v}`, mark, fill: 'q' };
      }
      // a scale with one unknown picture left
      for (const i of open) {
        const k = BAL.lone(p, solved, i);
        if (k < 0) continue;
        const e = p.eqs[k], left = BAL.net(e, i) > 0, c = Math.abs(BAL.net(e, i));
        const mine = left ? [e.l, e.lc] : [e.r, e.rc], other = left ? [e.r, e.rc] : [e.l, e.lc];
        const w1 = BAL.side(mine[0].map((x, j) => j == i ? 0 : x), mine[1], p.v), w2 = BAL.side(other[0], other[1], p.v);
        const one = BAL.nm(p, i, 1), many = BAL.nm(p, i, 2);
        const mark = { eqs: [k], slot: i };
        if (tier == 1) return { say: `Start with the glowing scale. Only the ${one} is still a mystery there.`, mark, fill: null };
        if (tier == 2) {
          let say;
          if (w1 && c > 1) say = `Take ${w1} away from both sides. Then share what is left between the ${c} ${many}.`;
          else if (w1) say = `Take ${w1} away from both sides. What is left weighs the same as one ${one}.`;
          else if (c > 1) say = `${c} ${many} weigh ${w2}. Share ${w2} into ${c} equal parts.`;
          else say = `One ${one} weighs the same as everything on the other side. Add up that side.`;
          return { say, mark, fill: null };
        }
        return { say: `One ${one} weighs ${p.v[i]}.`, mark, fill: i };
      }
      // no scale has a single unknown (band D): compare the scales. Tier 3 gives the picture the form's trick finds first.
      const nm = i => BAL.nm(p, i, 1), eqk = p.eqs.map((e, k) => k), pref = { sd: 1, chain: 1 }[p.form] || 0;
      const at = open.includes(pref) ? pref : open[0];
      const mark = { eqs: eqk, slot: at };
      if (tier == 1) return { say: 'Compare the scales. What is the same on both, and what is different?', mark, fill: null };
      if (tier == 2) {
        const sum = p.eqs.reduce((a, e) => a + e.lc + e.rc, 0), diff = p.eqs.find(e => e.r.some(Boolean));
        const say = {
          sd: () => `The ${nm(0)} weighs ${diff.rc} more than the ${nm(1)}. Take ${diff.rc} away from the two together, `
            + 'then share the rest equally.',
          pq: () => `One scale has one more ${nm(0)} than the other. That extra ${nm(0)} makes the difference in weight.`,
          xy: () => `Put both scales together: 3 of each picture weigh ${sum}. So one ${nm(0)} and one ${nm(1)} weigh a third of that.`,
          pair: () => `Put all three scales together: every picture is there twice. Half of ${sum} is one of each picture.`,
          chain: () => `Take the extra weights off the ${nm(0)} and the ${nm(2)}: then all three weigh the same as the ${nm(1)}.`,
        }[p.form];
        return { say: say ? say() : 'Compare the scales.', mark, fill: null };
      }
      return { say: `One ${nm(at)} weighs ${p.v[at]}.`, mark, fill: at };
    },
    solve(p) {
      const st = { done: [] }, out = [];
      for (let guard = 0; guard < 10; guard++) {
        const h = BAL.hint(p, st, 3);
        if (!h) break;
        st.done.push(h.fill);
        out.push([h.fill, BAL.answer(p, h.fill)]);
      }
      return out;
    },
  };

  /* ================= Make the Number ================= */
  // A puzzle: {nums, target, ops ('+-', '+-x', '+-x/'), use: 2 (two tiles) | 0 (all tiles), sols (different solutions)}.
  // Tiles have ids: the numbers are 0..k-1 and every join makes the next id. A step is [leftId, op, rightId].
  const TGT = {
    OPS: { B: '+-', C: '+-x', D: '+-x/' },
    SIGN: { '+': '+', '-': '−', x: '×', '/': '÷' },
    ICON: { '+': 'plus', '-': 'minus', x: 'times', '/': 'divide' },
    NAME: { '+': 'Add', '-': 'Take away', x: 'Times', '/': 'Share' },
    // a op b with whole, non-negative results only; null otherwise
    calc(a, op, b) {
      if (op == '+') return a + b;
      if (op == '-') return a >= b ? a - b : null;
      if (op == 'x') return a * b;
      if (op == '/') return b > 0 && a % b == 0 ? a / b : null;
      return null;
    },
    // canonical text of a join, so a + b and b + a (and the order of a chain of + or x) count once
    canon(a, op, b) {
      if (op == '+' || op == 'x') {
        const part = t => t.op == op ? t.parts : [t.s];
        const parts = part(a).concat(part(b)).sort();
        return { s: '(' + parts.join(op) + ')', op, parts };
      }
      return { s: '(' + a.s + op + b.s + ')', op, parts: null };
    },
    // Exhaustive search. vals: numbers; use: 2 = any two of them, 0 = all of them. Returns {n: different solutions, first: steps as
    // [i, op, j] positions in the list at that moment (the result replaces j, i is removed)}.
    search(vals, target, ops, use) {
      const seen = new Set();
      let first = null;
      const go = (list, steps) => {
        if (use == 0 ? list.length == 1 : steps.length == 1) {
          const hit = use == 0 ? (list[0].v == target ? list[0] : null) : list.find(t => t.made && t.v == target);
          if (hit) {
            seen.add(hit.s);
            if (!first) first = steps.slice();
          }
          return;
        }
        for (let i = 0; i < list.length; i++) for (let j = 0; j < list.length; j++) {
          if (i == j) continue;
          for (const op of ops) {
            if ((op == '+' || op == 'x') && i > j) continue; // the same join the other way round
            const r = TGT.calc(list[i].v, op, list[j].v);
            if (r == null) continue;
            const c = TGT.canon(list[i], op, list[j]);
            const next = list.map((t, k) => k == j ? { v: r, s: c.s, op: c.op, parts: c.parts, made: true } : t).filter((t, k) => k != i);
            steps.push([i, op, j]);
            go(next, steps);
            steps.pop();
          }
        }
      };
      go(vals.map(v => ({ v, s: String(v), op: null, parts: null, made: false })), []);
      return { n: seen.size, first };
    },
    // a random expression of every number (C, D): its value, or null when a step is not whole and non-negative
    randExpr(rnd, vals, ops) {
      let list = vals.slice();
      while (list.length > 1) {
        const i = Math.floor(rnd() * list.length);
        let j = Math.floor(rnd() * (list.length - 1));
        if (j >= i) j++;
        const r = TGT.calc(list[i], pickR(rnd, ops.split('')), list[j]);
        if (r == null) return null;
        list = list.map((x, k) => k == j ? r : x).filter((x, k) => k != i);
      }
      return list[0];
    },
    make(band, level, rnd) {
      const ops = TGT.OPS[band], cands = [];
      for (let at = 0; at < 400 && cands.length < 6; at++) {
        let nums, target, use;
        if (band == 'B') {
          use = 2;
          const hi = level <= 6 ? 10 : 15;
          nums = shuf(rnd, [...Array(hi).keys()].map(x => x + 1)).slice(0, 5);
          const a = nums[0], b = nums[1], op = level <= 4 ? '+' : pickR(rnd, ['+', '-']);
          target = op == '+' ? a + b : Math.abs(a - b);
        } else if (band == 'C') {
          use = 0;
          nums = [ri(rnd, 1, 10), ri(rnd, 1, 10), ri(rnd, 1, 10)];
          target = TGT.randExpr(rnd, nums, level <= 3 ? '+-' : ops);
          if (target == null || target < 5 || target > 50) continue;
        } else {
          use = 0;
          nums = [ri(rnd, 1, 13), ri(rnd, 1, 13), ri(rnd, 1, 13), ri(rnd, 1, 13)];
          target = level <= 6 ? 24 : TGT.randExpr(rnd, nums, ops);
          if (target == null || target < 10 || target > 100) continue;
        }
        if (band == 'B' && (target < 5 || target > 20)) continue;
        if (band == 'C' && level >= 4 && !nums.some(x => x > 1)) continue;
        const s = TGT.search(nums, target, ops, use);
        if (!s.n) continue;
        if (cands.some(c => c.nums.join() == nums.join())) continue;
        cands.push({ nums, target, ops, use, sols: s.n });
      }
      if (!cands.length) { // never seen; a fixed fair puzzle so make() always returns one
        const nums = { B: [2, 3, 5, 7, 9], C: [2, 3, 4], D: [1, 2, 3, 4] }[band];
        const target = { B: 12, C: 10, D: 24 }[band], use = band == 'B' ? 2 : 0;
        return { nums, target, ops, use, sols: TGT.search(nums, target, ops, use).n };
      }
      cands.sort((a, b) => b.sols - a.sols);
      return cands[Math.min(cands.length - 1, Math.floor((Math.min(12, level) - 1) * cands.length / 12))];
    },
    // the tiles at the start: [{id, v}]
    start: p => p.nums.map((v, id) => ({ id, v })),
    // Join two tiles in a state {tiles, next, hist}. Returns {err: 'neg' | 'frac'} or {v} (and changes st).
    join(st, aId, op, bId) {
      const i = st.tiles.findIndex(t => t.id == aId), j = st.tiles.findIndex(t => t.id == bId);
      if (i < 0 || j < 0 || i == j) return { err: 'tile' };
      const a = st.tiles[i].v, b = st.tiles[j].v, r = TGT.calc(a, op, b);
      if (r == null) return { err: op == '-' ? 'neg' : 'frac' };
      const t = { id: st.next++, v: r };
      st.hist.push({ a: st.tiles[i], ai: i, b: st.tiles[j], bi: j, op, r: t.id });
      st.tiles[j] = t;
      st.tiles.splice(i, 1);
      return { v: r, id: t.id };
    },
    undo(st) {
      const h = st.hist.pop();
      if (!h) return false;
      const k = st.tiles.findIndex(t => t.id == h.r);
      st.tiles.splice(k, 1, h.b);
      st.tiles.splice(h.ai, 0, h.a);
      return true;
    },
    fresh: p => ({ tiles: TGT.start(p), next: p.nums.length, hist: [], miss: 0 }),
    won(p, st) {
      return p.use == 2 ? st.hist.length == 1 && st.tiles.some(t => t.id == st.hist[0].r && t.v == p.target)
        : st.tiles.length == 1 && st.tiles[0].v == p.target;
    },
    // the next step from this state as [leftId, op, rightId], or null when these tiles cannot make the target
    next(p, st) {
      if (p.use == 2 && st.hist.length) return null;
      const s = TGT.search(st.tiles.map(t => t.v), p.target, p.ops, p.use);
      if (!s.first) return null;
      const [i, op, j] = s.first[0];
      return [st.tiles[i].id, op, st.tiles[j].id];
    },
    // Hint: {say, mark: [tile ids], step: [l, op, r] | null, reset: bool} or null when won
    hint(p, st, tier) {
      if (TGT.won(p, st)) return null;
      let s = TGT.next(p, st), reset = false;
      if (!s) {
        if (tier < 3) {
          const say = `These numbers cannot make ${p.target} any more. Tap Undo to go back.`;
          return { say, mark: [], step: null, reset: false, undo: true };
        }
        reset = true;
        s = TGT.next(p, TGT.fresh(p));
      }
      const val = id => (reset ? TGT.start(p) : st.tiles).find(t => t.id == id).v;
      const last = p.use == 2 || st.tiles.length == 2;
      if (tier == 1) return { say: `Start with ${val(s[0])}.`, mark: [s[0]], step: null, reset: false };
      if (tier == 2) return { say: last ? `Use ${val(s[0])} and ${val(s[2])}. Which sign makes ${p.target}?`
        : `Try ${val(s[0])} ${TGT.SIGN[s[1]]} ${val(s[2])} first.`, mark: [s[0], s[2]], step: null, reset: false };
      const say = `${val(s[0])} ${TGT.SIGN[s[1]]} ${val(s[2])} = ${TGT.calc(val(s[0]), s[1], val(s[2]))}`;
      return { say, mark: [s[0], s[2]], step: s, reset };
    },
    solve(p) {
      const st = TGT.fresh(p), out = [];
      for (let guard = 0; guard < 6 && !TGT.won(p, st); guard++) {
        const s = TGT.next(p, st);
        if (!s) break;
        TGT.join(st, ...s);
        out.push(s);
      }
      return out;
    },
  };

  /* ================= screens ================= */
  const pad = () => padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad bn-pad"');
  // the frame of every number puzzle: a talk line (message + speak), the board, the controls
  const frame = (kind, board, ctl) => `<div class="bn bn-${kind}"><div class="bn-say"><p class="bn-msg" aria-live="polite"></p>` +
    `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'bn-spk' })}</div>` +
    `<div class="bn-board">${board}</div><div class="bn-ctl">${ctl}</div></div>`;

  // shared wiring: message line, speak button, number pad (with the hardware keys), timers that destroy() clears
  function kit(el, api) {
    const timers = [];
    let msg = '', onKey = null;
    const k = {
      later(fn, ms) { timers.push(setTimeout(fn, ms)); },
      say(text, kind, speak) {
        msg = text;
        const m = el.querySelector('.bn-msg');
        if (m) {
          m.textContent = text;
          m.className = 'bn-msg' + (kind ? ' ' + kind : '');
        }
        if (speak) api.say(text);
      },
      keys(fn) { onKey = fn; },
      shake(node) {
        if (!node) return;
        node.classList.remove('bn-shake');
        void node.offsetWidth;
        node.classList.add('bn-shake');
      },
      bind() {
        const sp = el.querySelector('.bn-spk');
        if (sp) sp.onclick = () => { try { say(msg); } catch (e) {} };
        el.querySelectorAll('.bn-pad .k[data-k]').forEach(b => b.onclick = () => onKey && onKey(b.dataset.k));
      },
      destroy() {
        timers.forEach(clearTimeout);
        document.removeEventListener('keydown', hw);
      },
    };
    const hw = e => {
      if (!onKey || !el.isConnected || document.querySelector('.bt-win,.sheet')) return;
      const key = /^\d$/.test(e.key) ? e.key : e.key == 'Backspace' ? 'del' : e.key == 'Enter' ? 'go' : null;
      if (key) { e.preventDefault(); onKey(key); }
    };
    document.addEventListener('keydown', hw);
    return k;
  }

  // typing into a selected box: returns the new text, or null for 'go'
  const typeKey = (typed, key, max) => {
    if (key == 'del') { SFX.del(); return typed.slice(0, -1); }
    if (key == 'go') return null;
    if (typed.length >= max || (typed == '0')) return typed;
    SFX.key(+key);
    return typed + key;
  };

  /* ---------- pyramid screen ---------- */
  function mountPyr(el, p, api) {
    const st = api.loadState() || { done: [], hinted: [], sel: -1, miss: 0 };
    const k = kit(el, api), n = p.n, cells = PYR.cells(n), maxLen = 3;
    let typed = '', marks = [];
    const open = () => PYR.hidden(p).filter(b => !st.done.includes(b));
    if (st.sel < 0 || !open().includes(st.sel)) st.sel = open()[0] != null ? open()[0] : -1;
    const brick = b => {
      const [r, i] = cells[b], given = !!p.g[b], done = st.done.includes(b), sel = b == st.sel;
      const look = given ? ' giv' : done ? (st.hinted.includes(b) ? ' ok hn' : ' ok') : ' hid';
      const cls = 'bn-br' + look + (sel ? ' sel' : '') + (marks.includes(b) ? ' hl' : '');
      const face = given || done ? p.v[b] : sel && typed ? typed : '?';
      const lab = given || done ? `Brick ${p.v[b]}` : 'Missing brick';
      // rows are drawn top first; the brick spans two of the 2n grid columns, shifted half a brick per row
      const tag = given || done ? 'div' : 'button';
      return `<${tag} class="${cls}" data-b="${b}" style="grid-row:${n - r};grid-column:${r + 2 * i + 1}/span 2" aria-label="${lab}"` +
        `${tag == 'div' ? ' role="img"' : ''}><span>${face}</span></${tag}>`;
    };
    const draw = () => {
      el.querySelector('.bn-pyrw').innerHTML = cells.map((c, b) => brick(b)).join('');
      el.querySelectorAll('.bn-br.hid').forEach(b => b.onclick = () => {
        SFX.click();
        st.sel = +b.dataset.b;
        typed = '';
        api.saveState(st);
        draw();
      });
    };
    el.innerHTML = frame('pyr', `<div class="bn-pyrw" style="--n:${n}" role="group" aria-label="Number pyramid"></div>` +
      (p.tricky ? `<p class="bn-tag">${UI.tag('Tricky', 'new', 'sparkle')}</p>` : ''), pad());
    k.bind();
    const intro = 'Each brick is the two bricks under it added together. Tap a missing brick and type its number.';
    k.say(st.done.length ? 'Keep going! Tap a missing brick.' : intro, '', api.band == 'A' || (api.band == 'B' && !st.done.length)); // R-01b: band B speaks its first instruction too
    draw();
    const fill = b => {
      st.done.push(b);
      typed = '';
      st.sel = open()[0] != null ? open()[0] : -1;
      api.saveState(st);
      draw();
      if (!open().length) {
        k.say('The pyramid is complete!', 'good');
        el.querySelector('.bn-pyrw').classList.add('win');
        api.win({ mistakes: st.miss });
      }
    };
    k.keys(key => {
      if (st.sel < 0 || !open().length) return;
      const t = typeKey(typed, key, maxLen);
      if (t != null) { typed = t; return draw(); }
      if (!typed) return k.say('Type a number first, then tap the tick.', 'try');
      marks = [];
      if (+typed == p.v[st.sel]) {
        SFX.right();
        k.say(pickR(Math.random, ['Yes!', 'That fits!', 'Right!']), 'good');
        fill(st.sel);
      } else {
        SFX.wrong();
        st.miss++;
        api.saveState(st);
        k.say(`Not ${typed}. Check the bricks next to it and try again.`, 'try');
        typed = '';
        draw();
        k.shake(el.querySelector('.bn-br.sel'));
      }
    });
    return {
      hint(tier) {
        const h = PYR.hint(p, st, tier);
        if (!h) return false;
        marks = h.mark;
        if (h.fill != null) {
          st.hinted.push(h.fill);
          k.say(h.say, 'hint', true);
          fill(h.fill);
        } else {
          if (!st.done.includes(h.mark[0]) && !p.g[h.mark[0]]) { st.sel = h.mark[0]; typed = ''; }
          draw();
          k.say(h.say, 'hint', true);
        }
        return true;
      },
      destroy: k.destroy,
    };
  }

  /* ---------- balance screen ---------- */
  // Geometry in viewBox units: the pin at (cx, py); the trays' posts stand on the arm `half` out from the pin, so a tilt of `tilt`
  // degrees moves them half x sin(tilt) up and down (the CSS in 49-bt-number.css uses the same 10.45).
  const W = { box: 340, h: 110, cx: 170, py: 82, half: 100, tilt: 6, pic: 36 };
  const pic = (name, x, y, s) =>
    `<svg class="art" x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 64 64">${ART[name] || ''}</svg>`;
  const wWidth = n => Math.max(32, 16 + 11 * String(n).length);
  // a weight block with a handle and its number
  function weightSVG(x, base, n) {
    const t = String(n), w = wWidth(n), h = 30, y = base - h;
    return `<g class="bn-w"><path class="bn-wh" d="M${x - 8} ${y + 1}a8 8 0 0 1 16 0"/>` +
      `<rect class="bn-wb" x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="8"/>` +
      `<path class="bn-ws" d="M${x + w / 2 - 4} ${y + 8}v${h - 13}"/>` +
      `<path class="bn-wg" d="M${x - w / 2 + 6} ${y + 6}h${Math.max(4, w / 2 - 10)}"/>` +
      `<text x="${x}" y="${y + 21.5}">${t}</text></g>`;
  }
  // the things on one tray, centred on cx and standing on base: pictures first, then the weight; a solved picture wears its weight
  function trayItems(p, cs, k, cx, base, known, bad) {
    const items = [];
    cs.forEach((c, i) => { for (let j = 0; j < c; j++) items.push({ i }); });
    if (k) items.push({ k });
    const S = W.pic, wid = it => it.k != null ? wWidth(it.k) + 4 : S + 2;
    let x = cx - items.reduce((a, it) => a + wid(it), 0) / 2, out = '';
    for (const it of items) {
      const w = wid(it), mid = x + w / 2;
      if (it.k != null) out += weightSVG(mid, base, it.k);
      else {
        out += `<g class="bn-pic" data-f="${it.i}">${pic(p.f[it.i], mid - S / 2, base - S - 1, S)}`;
        if (known[it.i] != null) {
          out += `<g class="bn-vt${it.i === bad ? ' bad' : ''}"><circle cx="${mid + 13}" cy="${base - S + 1}" r="10"/>` +
            `<text x="${mid + 13}" y="${base - S + 5.5}">${known[it.i]}</text></g>`;
        }
        out += '</g>';
      }
      x += w;
    }
    return out;
  }
  // known: the weight shown on each picture (null: none); bad: the picture that wears the child's wrong guess
  function scaleSVG(p, e, k, known, bad) {
    const { cx, py, half, h } = W, ty = py - 16;
    // a tray: a post down to the arm, a shallow dish (gloss on its upper left, shade underneath), the things on it
    const tray = (cls, x, cs, kk) => `<g class="bn-tray ${cls}">` +
      `<rect class="bn-post" x="${x - 3}" y="${ty}" width="6" height="${py - ty}"/>` +
      `<path class="bn-dish" d="M${x - 66} ${ty - 6}h132a66 10 0 0 1-132 0z"/>` +
      `<path class="bn-dsh" d="M${x - 50} ${ty + 1.5}a66 10 0 0 0 100 0"/>` +
      `<path class="bn-pgl" d="M${x - 58} ${ty - 3}h36"/>${trayItems(p, cs, kk, x, ty - 6, known, bad)}</g>`;
    return `<svg class="bn-sv" viewBox="0 0 ${W.box} ${h}" role="img" aria-label="Scale ${k + 1}">` +
      `<path class="bn-stand" d="M${cx - 5} ${py}h10l18 ${h - py - 8}h-46z"/>` +
      `<path class="bn-sts" d="M${cx + 2} ${py}h3l18 ${h - py - 8}h-11z"/>` +
      `<rect class="bn-base" x="${cx - 48}" y="${h - 10}" width="96" height="9" rx="4.5"/>` +
      `<g transform="translate(${cx} ${py})"><g class="bn-arm">` +
      `<rect class="bn-beam" x="${-half - 12}" y="-5.5" width="${2 * half + 24}" height="11" rx="5.5"/>` +
      `<path class="bn-bsh" d="M${-half - 4} 3h${2 * half + 8}"/><path class="bn-bgl" d="M${-half - 4} -2.5h${half - 24}"/>` +
      `<path class="bn-nd" d="M0 -6V-26"/></g>` +
      `<circle class="bn-pin" r="7"/><circle class="bn-pgl2" cx="-2" cy="-2" r="2"/></g>` +
      tray('l', cx - half, e.l, e.lc) + tray('r', cx + half, e.r, e.rc) + '</svg>';
  }
  function mountBal(el, p, api) {
    const st = api.loadState() || { done: [], hinted: [], sel: 0, miss: 0 };
    const k = kit(el, api), slots = BAL.slots(p);
    let typed = '', marks = { eqs: [], slot: null }, guess = null; // guess: {e, i, w, dir} a wrong number tried on scale e
    const open = () => slots.filter(s => !st.done.includes(s));
    if (!open().some(s => String(s) == String(st.sel))) st.sel = open()[0];
    const known = () => p.v.map((x, i) => st.done.includes(i) ? x : null);
    const maxLen = 3;
    const nm = i => BAL.nm(p, i, 1);
    const slotBtn = s => {
      const done = st.done.includes(s), sel = String(s) == String(st.sel);
      const face = done ? BAL.answer(p, s) : sel && typed ? typed : '?';
      const cls = 'bn-slot' + (done ? (st.hinted.includes(s) ? ' ok hn' : ' ok') : '') + (sel && !done ? ' sel' : '') +
        (String(marks.slot) == String(s) ? ' hl' : '');
      const aria = s === 'q' ? 'Answer' : 'Weight of the ' + nm(s);
      return `<button class="${cls}" data-s="${s}" aria-label="${aria}"${done ? ' aria-disabled="true"' : ''}>${face}</button>`;
    };
    const drawSlots = () => {
      let h = p.v.map((x, i) => `<span class="bn-sg">${picArt(p.f[i], 34)}<b aria-hidden="true">=</b>${slotBtn(i)}</span>`).join('');
      if (p.q) {
        const terms = p.q.c.map((c, i) => c ? picArt(p.f[i], 30) + (c > 1 ? `<b class="bn-x">× ${c}</b>` : '') : '').filter(Boolean);
        h += `<span class="bn-sg bn-qq">${terms.join('<b>+</b>')}<b aria-hidden="true">=</b>${slotBtn('q')}</span>`;
      }
      el.querySelector('.bn-slots').innerHTML = h;
      el.querySelectorAll('.bn-slot:not(.ok)').forEach(b => b.onclick = () => {
        SFX.click();
        unTip();
        st.sel = b.dataset.s == 'q' ? 'q' : +b.dataset.s;
        typed = '';
        api.saveState(st);
        drawSlots();
      });
    };
    const drawScales = () => {
      const kn = known();
      el.querySelector('.bn-scs').innerHTML = p.eqs.map((e, i) => {
        const g = guess && guess.e == i, kk = g ? kn.map((x, j) => j == guess.i ? guess.w : x) : kn;
        return `<div class="bn-sc${marks.eqs.includes(i) ? ' hl' : ''}" data-e="${i}">${scaleSVG(p, e, i, kk, g ? guess.i : -1)}</div>`;
      }).join('');
      const sc = guess && el.querySelector(`.bn-sc[data-e="${guess.e}"]`);
      if (sc && guess.dir) {
        void sc.getBoundingClientRect(); // so the arm turns from level
        sc.classList.add(guess.dir < 0 ? 'tl' : 'tr');
      }
    };
    // the next tap after a wrong guess sets the scale level again, then takes the guess off it
    const unTip = () => {
      if (!guess) return;
      const sc = el.querySelector(`.bn-sc[data-e="${guess.e}"]`);
      guess = null;
      if (sc) sc.classList.remove('tl', 'tr');
      k.later(() => { if (!guess) drawScales(); }, 650);
    };
    const ask = {
      A: `How much does one ${nm(0)} weigh?`,
      C: 'How much does each picture weigh? Then answer the last question.',
      D: 'The scales are level. How much does each picture weigh?',
    }[api.band] || 'How much does each picture weigh?';
    el.innerHTML = frame('bal', `<div class="bn-scs n${p.eqs.length}"></div>`, `<div class="bn-slots"></div>${pad()}`);
    k.bind();
    k.say(st.done.length ? 'Keep going!' : ask, '', api.band == 'A' || (api.band == 'B' && !st.done.length)); // R-01b: band B speaks its first instruction too
    drawScales();
    drawSlots();
    const fill = s => {
      st.done.push(s);
      typed = '';
      st.sel = open()[0];
      api.saveState(st);
      drawScales();
      drawSlots();
      if (!open().length) {
        k.say('Every scale balances. You solved it!', 'good');
        el.querySelector('.bn-scs').classList.add('win');
        api.win({ mistakes: st.miss });
      }
    };
    k.keys(key => {
      if (st.sel == null || !open().length) return;
      unTip();
      const t = typeKey(typed, key, maxLen);
      if (t != null) { typed = t; return drawSlots(); }
      if (!typed) return k.say('Type a number first, then tap the tick.', 'try');
      marks = { eqs: [], slot: null };
      const want = BAL.answer(p, st.sel), got = +typed;
      if (got == want) {
        SFX.right();
        k.say(st.sel === 'q' ? 'Yes!' : `Yes! One ${nm(st.sel)} weighs ${want}.`, 'good');
        return fill(st.sel);
      }
      SFX.wrong();
      st.miss++;
      api.saveState(st);
      typed = '';
      if (st.sel === 'q') k.say(`Not ${got}. Put each weight in and add again.`, 'try');
      else {
        const e = BAL.tryOn(p, st.done.filter(s => s !== 'q'), st.sel), dir = BAL.tip(p, e, st.sel, got);
        const heavy = dir == 0 ? '' : (BAL.net(p.eqs[e], st.sel) > 0) == (dir < 0) ? 'too heavy' : 'too light';
        k.say(`With ${got} the scale tips: that is ${heavy}. Try again.`, 'try');
        guess = { e, i: st.sel, w: got, dir };
        drawScales();
      }
      drawSlots();
      k.shake(el.querySelector(`.bn-slot[data-s="${st.sel}"]`));
    });
    return {
      hint(tier) {
        const h = BAL.hint(p, st, tier);
        if (!h) return false;
        guess = null;
        marks = h.mark;
        if (h.fill != null) {
          st.hinted.push(h.fill);
          k.say(h.say, 'hint', true);
          fill(h.fill);
        } else {
          if (h.mark.slot != null && !st.done.includes(h.mark.slot)) { st.sel = h.mark.slot; typed = ''; }
          drawScales();
          drawSlots();
          k.say(h.say, 'hint', true);
        }
        return true;
      },
      destroy: k.destroy,
    };
  }

  /* ---------- make the number screen ---------- */
  function mountTgt(el, p, api) {
    const st = api.loadState() || TGT.fresh(p);
    const k = kit(el, api);
    let pick = null, op = null, marks = [], busy = false;
    const goal = `<div class="bn-goal" role="img" aria-label="Make ${p.target}"><span class="bn-ring"><b>${p.target}</b></span></div>`;
    const opsH = p.ops.split('').map(o =>
      `<button class="bn-op" data-op="${o}" aria-label="${TGT.NAME[o]}">${ico(TGT.ICON[o], 30)}</button>`);
    el.innerHTML = frame('tgt', `${goal}<div class="bn-tiles n${p.nums.length}" role="group" aria-label="Number tiles"></div>` +
      `<div class="bn-ops">${opsH.join('')}</div>`,
      `<ol class="bn-trail" aria-label="Your steps"></ol><div class="bn-acts">${UI.btn('Undo', { icon: 'undo', cls: 'bn-undo' })}</div>`);
    k.bind();
    const intro = p.use == 2 ? `Pick two numbers and + or − to make ${p.target}.`
      : `Use every number once to make ${p.target}. Tap a number, a sign, then another number.`;
    k.say(st.hist.length ? 'Keep going!' : intro, '', api.band == 'A' || (api.band == 'B' && !st.hist.length)); // R-01b: band B speaks its first instruction too
    const draw = () => {
      el.querySelector('.bn-undo').classList.remove('hl');
      el.querySelector('.bn-tiles').innerHTML = st.tiles.map(t => `<button class="bn-tile${t.id == pick ? ' sel' : ''}` +
        `${t.id >= p.nums.length ? ' made' : ''}` +
        `${marks.includes(t.id) ? ' hl' : ''}" data-t="${t.id}" aria-label="${t.v}"><b>${t.v}</b></button>`).join('');
      el.querySelectorAll('.bn-op').forEach(b => b.classList.toggle('sel', b.dataset.op == op));
      el.querySelector('.bn-trail').innerHTML = st.hist.map(h => {
        const r = st.tiles.find(t => t.id == h.r) || { v: TGT.calc(h.a.v, h.op, h.b.v) };
        return `<li>${h.a.v} ${TGT.SIGN[h.op]} ${h.b.v} = <b>${r.v}</b></li>`;
      }).join('');
      el.querySelector('.bn-undo').disabled = !st.hist.length || busy;
      el.querySelectorAll('.bn-tile').forEach(b => b.onclick = () => tapTile(+b.dataset.t));
    };
    const save = () => api.saveState(st);
    const afterJoin = r => {
      if (TGT.won(p, st)) {
        SFX.right();
        k.say(`You made ${p.target}!`, 'good');
        busy = true;
        draw();
        el.querySelector('.bn-tiles').classList.add('win');
        return api.win({ mistakes: st.miss });
      }
      if (p.use == 2 || st.tiles.length == 1) { // used up, and not the target: a mistake; the tiles come back
        SFX.wrong();
        st.miss++;
        save();
        busy = true;
        k.say(`That makes ${r.v}, not ${p.target}. Try again!`, 'try');
        k.shake(el.querySelector(`.bn-tile[data-t="${r.id}"]`));
        return k.later(() => {
          busy = false;
          while (st.hist.length) TGT.undo(st);
          save();
          draw();
        }, 1300);
      }
      SFX.pop();
      if (st.tiles.some(t => t.v == p.target)) k.say(`That is ${p.target}, but use every number!`, '');
      else k.say(`${r.v}! ${st.tiles.length} numbers left.`, '');
    };
    function tapTile(id) {
      if (busy) return;
      if (pick == null || op == null) {
        SFX.click();
        pick = pick == id ? null : id;
        return draw();
      }
      if (pick == id) { pick = null; op = null; return draw(); }
      const r = TGT.join(st, pick, op, id);
      if (r.err) {
        SFX.wrong();
        k.say(r.err == 'neg' ? 'That would go below zero. Try the bigger number first.'
          : 'That does not share out evenly. Try other numbers.', 'try');
        k.shake(el.querySelector(`.bn-tile[data-t="${id}"]`));
        pick = null;
        op = null;
        return draw();
      }
      pick = null;
      op = null;
      marks = [];
      save();
      draw();
      afterJoin(r);
    }
    el.querySelectorAll('.bn-op').forEach(b => b.onclick = () => {
      if (busy) return;
      if (pick == null) return k.say('Tap a number first.', 'try');
      SFX.click();
      op = op == b.dataset.op ? null : b.dataset.op;
      draw();
    });
    el.querySelector('.bn-undo').onclick = () => {
      if (busy || !TGT.undo(st)) return;
      SFX.del();
      pick = null;
      op = null;
      save();
      draw();
      k.say('One step back.', '');
    };
    draw();
    return {
      hint(tier) {
        if (busy) return false;
        const h = TGT.hint(p, st, tier);
        if (!h) return false;
        marks = h.mark;
        pick = null;
        op = null;
        if (h.step) {
          if (h.reset) while (st.hist.length) TGT.undo(st);
          const r = TGT.join(st, ...h.step);
          marks = [r.id];
          save();
          draw();
          k.say(h.say, 'hint', true);
          if (TGT.won(p, st)) afterJoin(r);
          return true;
        }
        draw();
        if (h.undo) el.querySelector('.bn-undo').classList.add('hl');
        k.say(h.say, 'hint', true);
        return true;
      },
      destroy: k.destroy,
    };
  }

  return { PYR, BAL, TGT, ri, shuf, mountPyr, mountBal, mountTgt, scaleSVG };
})();

BT.reg({
  id: 'pyramid', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => BTN.PYR.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountPyr(el, p, api),
  solve: p => BTN.PYR.solve(p),
});
BT.reg({
  id: 'balance', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => BTN.BAL.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountBal(el, p, api),
  solve: p => BTN.BAL.solve(p),
});
BT.reg({
  id: 'target', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => BTN.TGT.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountTgt(el, p, api),
  solve: p => BTN.TGT.solve(p),
});
/* ---------- Brain Teasers: Sudoku (P3-03; BRAIN_TEASERS.md 5.1, 7, 8) ----------
   One type, `sudoku`, bands A-D, 12 levels a band (then the framework's Endless). The puzzles come from the pre-verified bank
   PUZ.sudoku (src/data/d-puz-sudoku.js, P3-02; read only inside functions, A11): PUZ.sudoku[band] = {n, bw, bh, easy, medium, hard},
   each puzzle 'givens|solution|grade'.
     Band  Grid  Boxes        Symbols            Givens e / m / h   What is checked
     A     4x4   2x2          4 animals (drawn)  10 / 9 / 8         a wrong animal wiggles and bounces out (a mistake)
     B     4x4   2x2          1-4                8 / 6 / 5          a wrong number wiggles and bounces out (a mistake)
     C     6x6   3 cols x 2   1-6                22 / 18 / 14       clashes are tinted amber with a warning mark; Notes; Undo
     D     9x9   3x3          1-9                42 / 36 / 31       as C; hard levels need locked candidates or a naked pair
   Levels (section 7, givens from most to fewest): 1-4 easy, 5-8 medium, 9-12 hard. Each level owns a quarter of its tier's list
   (5 of 20), so the 12 levels of a day are 12 different bank puzzles; the seeded rnd (type|band|level|day) picks one of the five
   and a transform, so the same level tomorrow is a different puzzle or the same one in another form.
   Runtime variety (5.1, all keep the one solution and the grade): symbols relabelled, rows swapped inside a band of boxes, bands
   swapped, the same for columns and stacks, and a transpose when the boxes are square (4x4, 9x9). The puzzle stores the result
   (g givens, s solution, '.' empty) and the transform x, so a saved puzzle never needs the bank again.
   Mistakes: A and B check every entry against the solution (5.1); C and D never say right or wrong, but an entry that clashes
   with a number already in its row, column or box is tinted amber (never red, never colour alone: a dashed ring and a warning mark
   too) and counts one mistake. A full board with no clash is the solution (the puzzle has exactly one).
   Hints (5.1; the frame passes 1, 2, 3 and repeats 3): 1 points at a row, column or box (a house with one gap, or "look at this
   box"), 2 points at the square and says why ("Only 3 fits here: 1, 2 and 4 are already in its row, column or box."), 3 fills that
   square. A number that is not right is found first (C and D). Tiers 1 and 2 never change the board; 3 fills exactly one square.
   Phone and 9x9: the board is a square sized to the space left (section 8). When a 9x9 cell would be under 46 px (a phone in
   portrait, about 37 px at 380 px wide; section 8 allows 36 px there), a zoom box beside the pad shows the selected square's 3x3
   box at 48 px squares: a tap on the board picks a square and brings its box into the zoom box, where a near miss is put right with
   one big tap (every square has a 48 px target there), and the notes are easy to read.
   State (api.saveState after every move): {v: entries as a digit string ('0' empty, givens '0'), m: notes bit masks per cell
   ([] when none), sel, miss, hn: squares filled by hints (locked), h: undo steps [[cell, old value, old notes], ...], nt: notes on}.
   The pure rules (make, enter, erase, note, undo, hint, solve) live in SD so tools/test.js runs them without a page. */
const SD = (() => {
  const PICS = ['duck', 'frog', 'pig', 'fish']; // band A: symbol v is ART[PICS[v - 1]]; the four differ in shape as well as colour
  const TIERS = ['easy', 'medium', 'hard'];
  const MAXCELL = { 4: 96, 6: 80, 9: 64 };
  const tierOf = level => TIERS[Math.floor((Math.max(1, Math.min(12, +level || 1)) - 1) / 4)];
  const range = k => Array.from({ length: k }, (_, i) => i);
  const shuf = (rnd, a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const nums = s => Array.from(s, ch => (ch == '.' ? 0 : +ch));
  const bit = v => 1 << (v - 1);
  const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]);

  /* ---------- geometry: houses (rows, columns, boxes), peers, box-line overlaps ---------- */
  const GEO = {};
  function geo(n, bw, bh) {
    const key = n + ':' + bw + ':' + bh;
    if (GEO[key]) return GEO[key];
    const bx = n / bw, rows = [], cols = [], boxes = [], at = [];
    for (let i = 0; i < n; i++) { rows.push([]); cols.push([]); boxes.push([]); }
    for (let c = 0; c < n * n; c++) {
      const r = Math.floor(c / n), k = c % n, b = Math.floor(r / bh) * bx + Math.floor(k / bw);
      rows[r].push(c);
      cols[k].push(c);
      boxes[b].push(c);
      at.push({ r, c: k, b });
    }
    const houses = rows.map((cells, i) => ({ k: 'row', i, cells }))
      .concat(cols.map((cells, i) => ({ k: 'column', i, cells })), boxes.map((cells, i) => ({ k: 'box', i, cells })));
    const peers = at.map((a, c) => {
      const s = new Set(rows[a.r].concat(cols[a.c], boxes[a.b]));
      s.delete(c);
      return [...s];
    });
    // a box and a line that share 2 or more squares: [house A, house B, the shared squares]
    const over = [];
    for (const A of houses) for (const B of houses) {
      if (A === B || (A.k != 'box') == (B.k != 'box')) continue;
      const inter = A.cells.filter(c => B.cells.includes(c));
      if (inter.length >= 2) over.push([A, B, inter]);
    }
    return GEO[key] = { n, bw, bh, bx, rows, cols, boxes, houses, at, peers, over };
  }
  const gp = p => geo(p.n, p.bw, p.bh);

  /* ---------- make: a bank puzzle by level, in a seeded form ---------- */
  // all lines in blocks of `per`: the blocks in a random order, the lines inside each block too
  const lineOrder = (rnd, n, per) => [].concat(...shuf(rnd, range(n / per)).map(b => shuf(rnd, range(per)).map(i => b * per + i)));
  function transform(rnd, n, bw, bh) {
    return { r: lineOrder(rnd, n, bh), c: lineOrder(rnd, n, bw), t: bw == bh && rnd() < 0.5 ? 1 : 0, s: shuf(rnd, range(n)).map(i => i + 1) };
  }
  // out(r, c) = in(x.r[r], x.c[c]), read across when transposed; symbol v becomes x.s[v - 1]
  function applyX(str, x, n) {
    let out = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const rr = x.t ? c : r, cc = x.t ? r : c, ch = str[x.r[rr] * n + x.c[cc]];
      out += ch == '.' ? '.' : x.s[+ch - 1];
    }
    return out;
  }
  // the bank entry a level uses: its tier, and a quarter of that tier's list per level (k is picked by rnd inside it)
  function slot(band, level) {
    const list = PUZ.sudoku[band][tierOf(level)], per = Math.max(1, Math.floor(list.length / 4));
    const q = (Math.max(1, Math.min(12, +level || 1)) - 1) % 4;
    return { tier: tierOf(level), list, lo: Math.min(list.length - 1, q * per), per };
  }
  function make(band, level, rnd) {
    const sp = PUZ.sudoku[band], o = slot(band, level), k = Math.min(o.list.length - 1, o.lo + Math.floor(rnd() * o.per));
    const [g, s, gr] = o.list[k].split('|');
    const x = transform(rnd, sp.n, sp.bw, sp.bh);
    return { b: band, n: sp.n, bw: sp.bw, bh: sp.bh, tier: o.tier, k, gr: +gr, x, g: applyX(g, x, sp.n), s: applyX(s, x, sp.n) };
  }

  /* ---------- state and moves (pure: they change st and return what happened) ---------- */
  const checked = p => p.b == 'A' || p.b == 'B'; // 5.1: bands A and B bounce a wrong symbol out
  function fresh(p) {
    const sel = nums(p.g).indexOf(0);
    return { v: '0'.repeat(p.n * p.n), m: [], sel: Math.max(0, sel), miss: 0, hn: [], h: [], nt: 0 };
  }
  // does a saved state belong to this puzzle?
  function fit(p, st) {
    const N = p.n * p.n, g = nums(p.g), int = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
    if (!st || typeof st != 'object' || typeof st.v != 'string' || st.v.length != N) return false;
    if (!new RegExp('^[0-' + p.n + ']*$').test(st.v) || g.some((x, i) => x && st.v[i] != '0')) return false;
    if (!Array.isArray(st.m) || (st.m.length && st.m.length != N) || !st.m.every(x => int(x, 0, (1 << p.n) - 1))) return false;
    if (!int(st.sel, 0, N - 1) || !int(st.miss, 0, 1e6) || !Array.isArray(st.hn) || !st.hn.every(c => int(c, 0, N - 1) && !g[c])) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1)));
  }
  const vals = (p, st) => { const e = nums(st.v); return nums(p.g).map((x, i) => x || e[i]); };
  const setV = (st, c, v) => { st.v = st.v.slice(0, c) + v + st.v.slice(c + 1); };
  const noteOf = (st, c) => st.m[c] | 0;
  function setNote(p, st, c, m) {
    if (!st.m.length) { if (!m) return; st.m = new Array(p.n * p.n).fill(0); }
    st.m[c] = m;
    if (st.m.every(x => !x)) st.m = [];
  }
  const won = (p, st) => { const b = vals(p, st), s = nums(p.s); return b.every((x, i) => x == s[i]); };
  const locked = (p, st, c) => !!nums(p.g)[c] || st.hn.includes(c);
  // every square whose number is also somewhere else in one of its houses
  function conflicts(p, b) {
    const out = new Set();
    for (const h of gp(p).houses) {
      const seen = {};
      for (const c of h.cells) if (b[c]) (seen[b[c]] = seen[b[c]] || []).push(c);
      for (const v in seen) if (seen[v].length > 1) seen[v].forEach(c => out.add(c));
    }
    return out;
  }
  // the first house of c that already has v somewhere else: {k, cell}
  function clash(p, b, c, v) {
    const G = gp(p), a = G.at[c];
    for (const [k, cells] of [['row', G.rows[a.r]], ['column', G.cols[a.c]], ['box', G.boxes[a.b]]]) {
      const q = cells.find(x => x != c && b[x] == v);
      if (q != null) return { k, cell: q };
    }
    return null;
  }
  // a value goes in: the square's notes go, and so does that number from the notes of its row, column and box
  function place(p, st, c, v, step) {
    if (step) step.push([c, +st.v[c], noteOf(st, c)]);
    setV(st, c, v);
    setNote(p, st, c, 0);
    if (!v) return;
    for (const q of gp(p).peers[c]) if (noteOf(st, q) & bit(v)) {
      if (step) step.push([q, +st.v[q], noteOf(st, q)]);
      setNote(p, st, q, noteOf(st, q) & ~bit(v));
    }
  }
  const pushStep = (st, step) => { st.h.push(step); if (st.h.length > 60) st.h.shift(); };
  // a symbol tapped for square c: {ign}, {bounce, why} (A, B), or {ok, conf: [squares it clashes with], won}
  function enter(p, st, c, v) {
    if (locked(p, st, c)) return { ign: 'locked' };
    const cur = +st.v[c];
    if (checked(p)) {
      if (cur) return { ign: 'done' };
      if (v != nums(p.s)[c]) { st.miss++; return { bounce: true, why: clash(p, vals(p, st), c, v) }; }
      place(p, st, c, v);
      return { ok: true, conf: [], won: won(p, st) };
    }
    if (cur == v) return { ign: 'same' };
    const step = [];
    place(p, st, c, v, step);
    pushStep(st, step);
    const b = vals(p, st), conf = gp(p).peers[c].filter(q => b[q] == v);
    if (conf.length) st.miss++;
    return { ok: true, conf, won: !conf.length && won(p, st) };
  }
  // Erase (C, D): the number, or else the notes, of square c
  function erase(p, st, c) {
    if (checked(p) || locked(p, st, c) || (!+st.v[c] && !noteOf(st, c))) return { ign: true };
    const step = [[c, +st.v[c], noteOf(st, c)]];
    if (+st.v[c]) setV(st, c, 0); else setNote(p, st, c, 0);
    pushStep(st, step);
    return { ok: true };
  }
  // a pencil mark on or off (C, D; only on an empty square)
  function note(p, st, c, v) {
    if (checked(p) || locked(p, st, c) || +st.v[c]) return { ign: true };
    pushStep(st, [[c, 0, noteOf(st, c)]]);
    setNote(p, st, c, noteOf(st, c) ^ bit(v));
    return { ok: true, on: !!(noteOf(st, c) & bit(v)) };
  }
  function undo(p, st) {
    const step = st.h.pop();
    if (!step) return null;
    for (let i = step.length - 1; i >= 0; i--) {
      const [c, v, m] = step[i];
      if (locked(p, st, c)) continue;
      setV(st, c, v);
      setNote(p, st, c, m);
    }
    return step[0][0];
  }
  // a hint fills square c with its number; the square locks (drawn star-yellow) and no undo step can touch it again
  function fill(p, st, c) {
    const v = nums(p.s)[c];
    place(p, st, c, v);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(s => !s.some(e => e[0] == c));
    return v;
  }

  /* ---------- hints: the next square a child can fill, and why ---------- */
  const name = (p, v) => (p.b == 'A' ? 'the ' + PICS[v - 1] : String(v));
  const Name = (p, v) => (p.b == 'A' ? 'The ' + PICS[v - 1] : String(v));
  const aName = (p, v) => (p.b == 'A' ? 'a ' + PICS[v - 1] : (v == 8 ? 'an ' : 'a ') + v);
  const plural = (p, v) => (p.b == 'A' ? PICS[v - 1] + (PICS[v - 1] == 'fish' ? '' : 's') : v + 's');
  // candidates of every empty square (bit masks) from what is on the board
  function cands(p, b) {
    const G = gp(p), full = (1 << p.n) - 1;
    return b.map((v, c) => {
      if (v) return 0;
      let m = full;
      for (const q of G.peers[c]) if (b[q]) m &= ~bit(b[q]);
      return m;
    });
  }
  const one = m => m && !(m & (m - 1));
  const valOf = m => 32 - Math.clz32(m);
  function lastGap(p, b) {
    for (const h of gp(p).houses) {
      const gaps = h.cells.filter(c => !b[c]);
      if (gaps.length == 1) {
        const have = new Set(h.cells.map(c => b[c]));
        const v = range(p.n).map(i => i + 1).find(x => !have.has(x));
        return { kind: 'last', cell: gaps[0], v, h };
      }
    }
    return null;
  }
  const nakedSingle = (p, cand) => { const c = cand.findIndex(one); return c < 0 ? null : { kind: 'naked', cell: c, v: valOf(cand[c]) }; };
  function hiddenSingle(p, cand, b) {
    const H = gp(p).houses, byBox = H.filter(h => h.k == 'box').concat(H.filter(h => h.k != 'box')); // boxes first: easiest to see
    for (const h of byBox) for (let v = 1; v <= p.n; v++) {
      if (h.cells.some(c => b[c] == v)) continue;
      const where = h.cells.filter(c => cand[c] & bit(v));
      if (where.length == 1) return { kind: 'hidden', cell: where[0], v, h };
    }
    return null;
  }
  // locked candidates: in house A the value's squares all lie in house B, so it leaves the rest of B
  function lockedAll(p, cand, b, one) {
    const out = [];
    for (const [A, B, inter] of gp(p).over) for (let v = 1; v <= p.n; v++) {
      if (A.cells.some(c => b[c] == v)) continue;
      const where = A.cells.filter(c => cand[c] & bit(v));
      if (where.length < 2 || where.some(c => !inter.includes(c))) continue;
      const elim = B.cells.filter(c => !inter.includes(c) && cand[c] & bit(v)).map(c => [c, v]);
      if (elim.length) { out.push({ kind: 'locked', A, B, v, at: where, elim }); if (one) return out; }
    }
    return out;
  }
  const lockedCands = (p, cand, b) => lockedAll(p, cand, b, true)[0] || null;
  // naked pair: two squares of a house with the same two candidates; those two leave the rest of the house
  function pairAll(p, cand, one) {
    const out = [];
    for (const h of gp(p).houses) {
      const two = h.cells.filter(c => popc(cand[c]) == 2);
      for (let i = 0; i < two.length; i++) for (let j = i + 1; j < two.length; j++) {
        const m = cand[two[i]];
        if (cand[two[j]] != m) continue;
        const elim = [];
        for (const c of h.cells) if (c != two[i] && c != two[j] && cand[c] & m) for (let v = 1; v <= p.n; v++) if (cand[c] & m & bit(v)) elim.push([c, v]);
        if (elim.length) { out.push({ kind: 'pair', A: h, at: [two[i], two[j]], vs: [valOf(m & -m), valOf(m)], elim }); if (one) return out; }
      }
    }
    return out;
  }
  const nakedPair = (p, cand) => pairAll(p, cand, true)[0] || null;
  function popc(m) { let k = 0; while (m) { m &= m - 1; k++; } return k; }

  // The next step: {kind, cell, v, house (squares hint 1 points at), also (squares hint 2 marks besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const G = gp(p), b = vals(p, st), sol = nums(p.s), e = nums(st.v);
    if (b.every((x, i) => x == sol[i])) return null;
    const boxOf = c => G.boxes[G.at[c].b];
    const say3 = (c, v) => `${Name(p, v)} goes here.`;
    // 1. a number that is not right (only C and D can have one): one that clashes first
    const wrong = e.map((x, c) => (x && x != sol[c] ? c : -1)).filter(c => c >= 0);
    if (wrong.length) {
      const cf = conflicts(p, b), c = wrong.find(x => cf.has(x)) != null ? wrong.find(x => cf.has(x)) : wrong[0];
      return { kind: 'wrong', cell: c, v: sol[c], house: boxOf(c), also: [],
        say1: 'One number in this box is not right yet.', say2: `This ${e[c]} does not belong here. Another number goes in this square.`, say3: say3(c, sol[c]) };
    }
    // 2. a house with one gap
    const lg = lastGap(p, b);
    if (lg) return { kind: 'last', cell: lg.cell, v: lg.v, house: lg.h.cells, also: [],
      say1: `This ${lg.h.k} has just one empty square.`, say2: `Only ${name(p, lg.v)} is missing from this ${lg.h.k}.`, say3: say3(lg.cell, lg.v) };
    // 3. singles from what is on the board
    let cand = cands(p, b);
    const single = () => {
      const ns = nakedSingle(p, cand);
      if (ns) return ns;
      return hiddenSingle(p, cand, b);
    };
    const why = (s, pre) => {
      if (s.kind == 'naked') {
        const seen = [...new Set(G.peers[s.cell].map(q => b[q]).filter(Boolean))].sort((x, y) => x - y);
        return `${pre || ''}Only ${name(p, s.v)} fits here: ${list(seen.map(v => name(p, v)))} ${seen.length > 1 ? 'are' : 'is'} already in its row, column or box.`;
      }
      const hk = s.h.k;
      const other = { row: 'column or box', column: 'row or box', box: 'row or column' }[hk];
      return `${pre || ''}${Name(p, s.v)} can only go here: the other empty squares of this ${hk} already have ${aName(p, s.v)} in their ${other}.`;
    };
    let s = single();
    if (s) return { kind: s.kind, cell: s.cell, v: s.v, house: s.kind == 'hidden' ? s.h.cells : boxOf(s.cell), also: [],
      say1: s.kind == 'hidden' ? `Look at this ${s.h.k}. Where can ${name(p, s.v)} go?` : 'Look at this box. One square can be filled now.',
      say2: why(s), say3: say3(s.cell, s.v) };
    // 4. band D hard: take candidates away (locked candidates, naked pairs) until a single shows
    // AUD-BT S-1: the hint names ONE step ("a 1 can only go in the marked squares, so ... Now only 9 fits here"), so it is only
    // given when a single follows from that one step on the board as it is. Every such step is tried (it was: the first step
    // found, then more steps the words did not mention, so "Now only 9 fits" did not follow in half of these hints).
    const base = cand.slice(), told = x => {
      const pre = x.kind == 'locked'
        ? `In this ${x.A.k}, ${aName(p, x.v)} can only go in the marked squares, so no other square of that ${x.B.k} can be ${aName(p, x.v)}. Now `
        : `The marked squares can only be ${x.vs[0]} and ${x.vs[1]}, so no other square of this ${x.A.k} can be. Now `;
      const tail = s.kind == 'naked' ? `only ${name(p, s.v)} fits here.` : `${name(p, s.v)} can only go here in its ${s.h.k}.`;
      return { kind: x.kind, cell: s.cell, v: s.v, house: x.A.cells, also: x.at,
        say1: `Look at this ${x.A.k}. Where can ${x.kind == 'locked' ? name(p, x.v) : 'each number'} go?`, say2: pre + tail, say3: say3(s.cell, s.v) };
    };
    for (const x of lockedAll(p, base, b).concat(pairAll(p, base))) {
      cand = base.slice();
      for (const [c, v] of x.elim) cand[c] &= ~bit(v);
      s = single();
      if (s) return told(x);
    }
    // a single that needs several steps: the square is still found, with the plain words (no reason that does not hold)
    cand = base.slice();
    for (let it = 0; it < 60; it++) {
      const x = lockedCands(p, cand, b) || nakedPair(p, cand);
      if (!x) break;
      for (const [c, v] of x.elim) cand[c] &= ~bit(v);
      s = single();
      if (s) return { kind: 'steps', cell: s.cell, v: s.v, house: [s.cell], also: [],
        say1: 'Try this square.', say2: 'This one takes two steps. Look at its row, its column and its box.', say3: say3(s.cell, s.v) };
    }
    // 5. never stuck: the empty square with the fewest choices
    cand = cands(p, b);
    let c = -1;
    for (let i = 0; i < b.length; i++) if (!b[i] && (c < 0 || popc(cand[i]) < popc(cand[c]))) c = i;
    return { kind: 'guess', cell: c, v: sol[c], house: [c], also: [],
      say1: 'Try this square.', say2: 'Look at its row, its column and its box.', say3: say3(c, sol[c]) };
  }
  // hint(p, st, tier): {tier, kind, cell, v, house, mark, say, fill ([cell, value] on tier 3 only)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, house: t == 3 ? [] : s.house, mark: t == 1 ? [] : [s.cell].concat(t == 2 ? s.also : []),
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, fill: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win, in the order the hints would give them: [[cell, value], ...]
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < p.n * p.n; i++) {
      const s = nextStep(p, st);
      if (!s) break;
      place(p, st, s.cell, s.v);
      out.push([s.cell, s.v]);
    }
    return out;
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const G = gp(p), n = p.n, N = n * n, giv = nums(p.g), A = p.b == 'A', chk = checked(p);
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, ms));
    let marks = { house: [], cell: [] }, bounce = null, glow = -1, msg = '', done = false, zoomOn = false;
    const face = (v, size) => (A ? picArt(PICS[v - 1], size || '74%', 'sd-pic') : `<b>${v}</b>`);
    const spoken = v => (A ? PICS[v - 1] : String(v));
    const intro = A ? 'Each row, each column and each box needs every animal once. Tap a square, then tap an animal.'
      : `Each row, column and box needs ${list(range(n).map(i => i + 1))} once. Tap a square, then tap a number.`;

    // board: boxes in reading order, squares inside each box in reading order
    const boxes = G.boxes.map(cells => `<div class="sd-box">${cells.map(c => `<button class="sd-c" data-c="${c}"></button>`).join('')}</div>`).join('');
    const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad sd-pad"');
    el.innerHTML = `<div class="sd sd-n${n} sd-${p.b}" style="--n:${n};--bw:${p.bw};--bx:${n / p.bw}">` +
      `<div class="sd-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'sd-spk' })}<p class="sd-msg" aria-live="polite"></p></div>` +
      `<div class="sd-main"><div class="sd-board" role="group" aria-label="Sudoku, ${n} by ${n}">${boxes}</div></div>` +
      `<div class="sd-ctl"><div class="sd-zoom" role="group" aria-label="The selected box, big" hidden>` +
      `${range(9).map(i => `<button class="sd-c sd-zc" data-z="${i}"></button>`).join('')}</div>${pad}</div></div>`;
    const root = el.querySelector('.sd'), board = root.querySelector('.sd-board'), zoom = root.querySelector('.sd-zoom');
    const padEl = root.querySelector('.sd-pad'), say_ = root.querySelector('.sd-say'), ctl = root.querySelector('.sd-ctl');
    const cellEl = range(N).map(c => board.querySelector(`[data-c="${c}"]`));
    // the pad: symbols 1..n with a count of how many are left; Erase, Notes and Undo in bands C and D
    padEl.querySelectorAll('.k').forEach(k => {
      const d = k.dataset.k;
      if (d == '0' || d == 'go' || +d > n || (d == 'del' && chk)) k.remove();
    });
    for (let v = 1; v <= n; v++) {
      const k = padEl.querySelector(`.k[data-k="${v}"]`);
      k.innerHTML = `<span class="sd-kf">${A ? picArt(PICS[v - 1], '1em', 'sd-pic') : v}</span><small class="sd-left"></small>`;
      k.classList.add('sd-sym');
    }
    if (!chk) {
      const del = padEl.querySelector('.k[data-k="del"]');
      del.setAttribute('aria-label', 'Erase');
      del.classList.add('t');
      padEl.insertAdjacentHTML('beforeend', `<button class="key k t sd-ntk" data-k="notes" aria-label="Notes" aria-pressed="false">${ico('edit')}<span>Notes</span></button>` +
        `<button class="key k t" data-k="undo" aria-label="Undo">${ico('undo')}<span>Undo</span></button>`);
    }
    padEl.classList.add(chk ? 'sd-p' + n : 'sd-pt');

    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.sd-msg');
      m.textContent = text;
      m.className = 'sd-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(text);
    }
    root.querySelector('.sd-spk').onclick = () => { try { say(msg); } catch (e) {} };

    /* ---------- drawing ---------- */
    function cellParts(c, b, cf) {
      const v = b[c], given = !!giv[c], hn = st.hn.includes(c), m = noteOf(st, c), a = G.at[c], s = G.at[st.sel];
      const selV = b[st.sel];
      let cls = given ? ' giv' : v ? (hn ? ' ent hn' : ' ent') : '';
      if (c == st.sel) cls += ' sel';
      else if (a.r == s.r || a.c == s.c || a.b == s.b) cls += ' rc';
      if (selV && v == selV && c != st.sel) cls += ' same';
      if (cf.has(c)) cls += ' cf';
      if (c == glow) cls += ' cl';
      if (marks.cell.includes(c)) cls += ' hl';
      else if (marks.house.includes(c)) cls += ' hh';
      let html = '', lab = v ? spoken(v) : 'empty';
      if (bounce && bounce.c == c) { cls += ' bad'; html = face(bounce.v); lab = spoken(bounce.v) + ', does not fit'; }
      else if (v) html = face(v) + (cf.has(c) && !given ? `<span class="sd-wn">${ico('warning', 16)}</span>` : '');
      else if (m) {
        html = `<i class="sd-nts">${range(n).map(i => `<span>${m & bit(i + 1) ? i + 1 : ''}</span>`).join('')}</i>`;
        lab = 'notes ' + range(n).filter(i => m & bit(i + 1)).map(i => i + 1).join(' ');
      }
      if (given) lab += ', given';
      if (cf.has(c)) lab += ', clashes';
      return { cls, html, lab: `Row ${a.r + 1}, column ${a.c + 1}: ${lab}` };
    }
    function draw() {
      const b = vals(p, st), cf = chk ? new Set() : conflicts(p, b);
      for (let c = 0; c < N; c++) {
        const q = cellParts(c, b, cf), e = cellEl[c], cls = 'sd-c' + q.cls;
        if (e.className != cls) e.className = cls;
        if (e._h !== q.html) { e.innerHTML = q.html; e._h = q.html; }
        e.setAttribute('aria-label', q.lab);
      }
      if (zoomOn) {
        const cells = G.boxes[G.at[st.sel].b];
        zoom.querySelectorAll('.sd-zc').forEach((z, i) => {
          const c = cells[i], q = cellParts(c, b, cf);
          z.className = 'sd-c sd-zc' + q.cls;
          z.dataset.c = c;
          if (z._h !== q.html) { z.innerHTML = q.html; z._h = q.html; }
          z.setAttribute('aria-label', q.lab);
        });
      }
      // how many of each symbol are left to place
      for (let v = 1; v <= n; v++) {
        const k = padEl.querySelector(`.k[data-k="${v}"]`), left = n - b.filter(x => x == v).length;
        // one dot for each one left (a count that cannot be read as a power), a tick when none are left
        const lf = k.querySelector('.sd-left'), t = left > 0 ? '<i></i>'.repeat(Math.min(n, left)) : ico('check', 14);
        if (lf._h !== t) { lf.innerHTML = t; lf._h = t; }
        k.classList.toggle('zero', left <= 0);
        if (chk) k.disabled = left <= 0 || done;
        k.setAttribute('aria-label', `${spoken(v)}, ${Math.max(0, left)} left`);
      }
      const nk = padEl.querySelector('[data-k="notes"]'), uk = padEl.querySelector('[data-k="undo"]');
      if (nk) { nk.classList.toggle('on', !!st.nt); nk.setAttribute('aria-pressed', st.nt ? 'true' : 'false'); }
      if (uk) uk.disabled = !st.h.length || done;
      root.classList.toggle('nt', !!st.nt);
    }

    /* ---------- layout: the board is a square sized to the space that is left (section 8) ----------
       portrait: talk line, board, controls; landscape: board, then a side column with the talk line and the controls.
       9x9 under 46 px a square: the zoom box comes on. On a phone (portrait) it shares a row with the talk line between the board
       and the pad, and the pad goes to two rows of six (1-5 Erase, 6-9 Notes Undo), so the board keeps 36 px squares at 380x780. */
    const FR = n == 9 ? { pad: 4, box: 4, cell: 1 } : { pad: 6, box: 5, cell: 2 }; // must match --fp, --fb, --fc in the CSS
    root.style.cssText += `;--fp:${FR.pad}px;--fb:${FR.box}px;--fc:${FR.cell}px`;
    const frame = Math.max(2 * FR.pad + (n / p.bw - 1) * FR.box + (n - n / p.bw) * FR.cell, 2 * FR.pad + (n / p.bh - 1) * FR.box + (n - n / p.bh) * FR.cell);
    const main = root.querySelector('.sd-main'), zrow = document.createElement('div'), side = document.createElement('div');
    zrow.className = 'sd-zrow';
    side.className = 'sd-side';
    root.append(zrow, side);
    let lastW = 0, lastH = 0;
    function arrange(mode, padMode) {
      if (mode == 'land') { root.append(main, side); side.append(say_, ctl); ctl.prepend(zoom); }
      else if (mode == 'zm') { root.append(main, zrow, ctl); zrow.append(zoom, say_); }
      else { root.append(say_, main, ctl); ctl.prepend(zoom); }
      root.classList.toggle('land', mode == 'land');
      zoomOn = mode == 'zm' || (mode == 'land' && padMode == 'zoom');
      root.classList.toggle('zm', zoomOn);
      zoom.hidden = !zoomOn;
    }
    function setPad(m) { for (const k of ['row', 'g3', 'r6']) padEl.classList.toggle(k, k == m); }
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640, gap = 12;
      // the pad in one row when every key can be 50 px wide, else three across (two rows of six for 9x9 on a phone)
      const oneRow = w => (w - (n - 1) * 8) / n >= 50;
      const cellFor = bs => Math.min(MAXCELL[n] || 64, Math.floor((Math.max(120, bs) - frame) / n));
      let cs;
      if (land) {
        arrange('land');
        setPad(oneRow(side.offsetWidth) ? 'row' : 'g3');
        const bs = () => Math.min(ah, aw - side.offsetWidth - 2 * gap);
        cs = cellFor(bs());
        if (n == 9 && cs < 46) { arrange('land', 'zoom'); cs = cellFor(bs()); }
      } else {
        arrange('port');
        setPad(oneRow(aw) ? 'row' : n == 9 ? 'r6' : 'g3');
        cs = cellFor(Math.min(aw, ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap));
        if (n == 9 && cs < 46) {
          arrange('zm');
          setPad('r6');
          cs = cellFor(Math.min(aw, ah - zrow.offsetHeight - ctl.offsetHeight - 2 * 8));
        }
      }
      root.style.setProperty('--cs', Math.max(28, cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    function finish() {
      done = true;
      marks = { house: [], cell: [] };
      draw();
      root.classList.add('win');
      tell(A ? 'You did it! Every row, column and box has every animal.' : 'Solved! Every row, column and box is complete.', 'good', A);
      api.win({ mistakes: st.miss });
    }
    function pick(c) {
      if (done || c == null || c < 0 || c >= N) return;
      st.sel = c;
      SFX.click();
      store();
      draw();
    }
    function sym(v) {
      if (done) return;
      const c = st.sel;
      if (st.nt && !chk) {
        const r = note(p, st, c, v);
        if (r.ign) return tell(+st.v[c] || locked(p, st, c) ? 'Notes go in empty squares.' : 'Tap an empty square first.', 'try');
        SFX.key(v);
        store();
        return draw();
      }
      const r = enter(p, st, c, v);
      if (r.ign) {
        if (r.ign == 'same') return;
        tell(giv[c] ? 'That one was there from the start. Tap an empty square.' : 'That square is done. Tap an empty one.', 'try', A);
        return;
      }
      marks = { house: [], cell: [] };
      if (r.bounce) {
        SFX.wrong();
        bounce = { c, v };
        glow = r.why ? r.why.cell : -1;
        store();
        draw();
        const t = r.why ? `There is already ${aName(p, v)} in this ${r.why.k}. Try another one.` : `${Name(p, v)} goes somewhere else. Try another one.`;
        tell(t, 'try', A);
        later(() => { bounce = null; draw(); }, 650);
        later(() => { glow = -1; draw(); }, 1600);
        return;
      }
      store();
      draw();
      if (r.conf.length) {
        SFX.rattle();
        const k = clash(p, vals(p, st), c, v);
        tell(`Two ${plural(p, v)} in this ${k ? k.k : 'row'}. Change one of them.`, 'try');
        return;
      }
      if (chk) { SFX.right(); popCell(c); } else SFX.pop(1);
      if (r.won) return finish();
      tell(chk ? (A ? pickR(['Yes!', 'Good one!', 'That fits!']) : pickR(['Yes!', 'That fits!', 'Right!'])) : msgAfter(), chk ? 'good' : '', false);
    }
    const pickR = a => a[Math.floor(Math.random() * a.length)];
    const msgAfter = () => (conflicts(p, vals(p, st)).size ? 'Some numbers still clash. The amber squares show where.' : 'Keep going!');
    function popCell(c) {
      const e = cellEl[c];
      e.classList.remove('pop');
      void e.offsetWidth;
      e.classList.add('pop');
    }
    function act(k) {
      if (done) return;
      if (k == 'del') {
        const r = erase(p, st, st.sel);
        if (r.ign) return tell(locked(p, st, st.sel) ? 'That one stays. Pick a square you filled.' : 'That square is already empty.', 'try');
        SFX.del();
      } else if (k == 'notes') {
        st.nt = st.nt ? 0 : 1;
        SFX.click();
        tell(st.nt ? 'Notes are on: tap numbers to jot them small. Tap Notes again to write big.' : 'Notes are off: numbers go in big.', '');
      } else if (k == 'undo') {
        const c = undo(p, st);
        if (c == null) return;
        st.sel = c;
        SFX.whoosh();
      } else return sym(+k);
      store();
      draw();
    }
    board.onclick = e => { const b = e.target.closest('.sd-c'); if (b) pick(+b.dataset.c); };
    zoom.onclick = e => { const b = e.target.closest('.sd-c'); if (b) pick(+b.dataset.c); };
    padEl.querySelectorAll('.k[data-k]').forEach(b => b.onclick = () => act(b.dataset.k));
    // hardware keys: digits, Backspace or Delete, arrows to move, N for notes
    const keyd = e => {
      if (!el.isConnected || done || document.querySelector('.bt-win,.sheet')) return;
      const a = G.at[st.sel], mv = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (/^[1-9]$/.test(e.key) && +e.key <= n) { e.preventDefault(); act(e.key); }
      else if ((e.key == 'Backspace' || e.key == 'Delete') && !chk) { e.preventDefault(); act('del'); }
      else if ((e.key == 'n' || e.key == 'N') && !chk) act('notes');
      else if (mv) { e.preventDefault(); pick(((a.r + mv[0] + n) % n) * n + ((a.c + mv[1] + n) % n)); }
    };
    document.addEventListener('keydown', keyd);

    /* ---------- start ---------- */
    const fresh_ = !st.v.replace(/0/g, '') && !st.m.length;
    tell(fresh_ ? intro : A ? 'Keep going! Tap an empty square.' : 'Keep going! Tap an empty square.', '', fresh_ && (A || p.b == 'B')); // R-01b: band B speaks its first instruction too
    layout();
    // the stage can still be settling (fonts, the frame's top bar): look again once
    later(layout, 60);
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        marks = { house: h.house, cell: h.mark };
        if (h.fill) {
          fill(p, st, h.fill[0]);
          st.sel = h.fill[0];
          store();
          draw();
          popCell(h.fill[0]);
          tell(h.say, 'hint', true);
          if (won(p, st)) finish();
          return true;
        }
        if (h.tier == 2) st.sel = h.cell;
        store();
        draw();
        tell(h.say, 'hint', true);
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
      },
    };
  }

  return { PICS, TIERS, tierOf, geo, slot, make, transform, applyX, fresh, fit, vals, conflicts, enter, erase, note, undo, fill, won,
    nextStep, hint, solve, mount, checked, nums };
})();

BT.reg({
  id: 'sudoku', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => SD.make(band, level, rnd),
  mount: (el, p, api) => SD.mount(el, p, api),
  solve: p => SD.solve(p),
});
/* ---------- Brain Teasers: MathDoku (P3-05; BRAIN_TEASERS.md 5.2, 7, 8) ----------
   One type, `mdoku` ("MathDoku"), bands B-D, 12 levels a band (then the framework's Endless). The puzzles come from the
   pre-verified bank PUZ.mathdoku (src/data/d-puz-mathdoku.js, P3-04; read only inside functions, A11):
   PUZ.mathdoku[band] = [36 strings 'N|cages|solution|grade|score'], sorted by difficulty, level L = entries 3(L-1)..3L-1.
     Band  Grid               Operations     What the child does
     B     3x3                +              tap a square, tap 1-3; Erase, Undo (no notes: three numbers need none)
     C     4x4                + − ×          as B with 1-4, plus Notes
     D     5x5 (levels 1-6),  + − × ÷        as C with 1-5 or 1-6
           6x6 (levels 7-12)
   A cage is cells (one base-36 character each, ascending, so the first is the top-left cell where the label goes) + op + target.
   Single-cell cages ('=') are givens: their number is printed in the square from the start.
   Variety (5.2): the seeded rnd (type|band|level|day) picks one of the level's three bank puzzles and one of the 8 rotations and
   mirrors of the grid. Numbers are never relabelled (the arithmetic would break); a turned or mirrored cage keeps its target, and
   − and ÷ do not care about order. The 12 levels of a day use 12 different bank puzzles, so a grid never repeats across levels.
   The puzzle stores the result (cg cages [{c: cells, o: op, t: target}], s solution), the bank index k and the transform x.
   Mistakes: never judged right or wrong while playing. A number that is already in its row or column is a clash: both squares
   amber with a dashed ring and a warning mark (never red, never colour alone). A full cage that does not make its target turns its
   label amber with a warning mark, and the line says why in words ("2 + 3 = 5, but this cage needs 6."). Each counts one mistake.
   Hints (5.2; the frame passes 1, 2, 3 and repeats 3): 1 points at a cage (or a row or column) that can be finished, 2 names the
   square and says why, listing the number sets that make the cage ("6× in two squares: 1 and 6, or 2 and 3. ..."), 3 fills that
   one square. A number that is not right is found first. Tiers 1 and 2 never change the board; 3 fills exactly one square.
   The hint steps follow the bank grader (tools/puzzles/mathdoku.js): last square of a cage or a line, cage single, hidden single,
   cage in a line, naked pair; the grader proved every bank puzzle finishes with these, so no hint has to guess.
   State (api.saveState after every move): {v: entries as a digit string ('0' empty or given), m: notes bit masks per cell ([] when
   none), sel, miss, hn: squares filled by hints (locked), h: undo steps [[cell, old value, old notes], ...], nt: notes on}.
   The pure rules (make, enter, erase, note, undo, hint, solve) live in MD so tools/test.js runs them without a page. */
const MD = (() => {
  const SIGN = { '+': '+', '*': '×', '-': '−', '/': '÷' };
  const MAXCELL = { 3: 96, 4: 88, 5: 76, 6: 68 };
  const FP = 6; // the tray's padding around the grid (px); must match .md-board in the CSS
  // the 8 rotations and mirrors as cell maps: (r, c) of the bank grid goes to the returned [r, c] (as tools/puzzles/mathdoku.js SYMS)
  const SYMS = [
    (r, c, N) => [r, c],
    (r, c, N) => [c, N - 1 - r],
    (r, c, N) => [N - 1 - r, N - 1 - c],
    (r, c, N) => [N - 1 - c, r],
    (r, c, N) => [r, N - 1 - c],
    (r, c, N) => [N - 1 - r, c],
    (r, c, N) => [c, r],
    (r, c, N) => [N - 1 - c, N - 1 - r],
  ];
  const range = k => Array.from({ length: k }, (_, i) => i);
  const nums = s => Array.from(s, ch => +ch);
  const bit = v => 1 << (v - 1);
  const one = m => m && !(m & (m - 1));
  const valOf = m => 32 - Math.clz32(m);
  const popc = m => { let k = 0; while (m) { m &= m - 1; k++; } return k; };
  const bits = m => range(7).map(i => i + 1).filter(v => m & bit(v));
  const list = (a, w) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + (w || 'and') + ' ' + a[a.length - 1]);
  const WORD = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
  const aN = v => (v == 8 || v == 11 || v == 18 ? 'an ' : 'a ') + v;

  // a cage's value for these numbers (− and ÷ take the bigger first; NaN when ÷ does not come out even)
  function calc(op, vals) {
    if (op == '=') return vals[0];
    if (op == '+') return vals.reduce((a, v) => a + v, 0);
    if (op == '*') return vals.reduce((a, v) => a * v, 1);
    const hi = Math.max(vals[0], vals[1]), lo = Math.min(vals[0], vals[1]);
    if (op == '-') return hi - lo;
    return hi % lo ? NaN : hi / lo;
  }
  const label = cg => cg.t + SIGN[cg.o];
  // the cage's numbers as a sum written out: "2 + 3 = 5"; ÷ that does not come out even says so
  function sumText(cg, vals) {
    if (cg.o == '+' || cg.o == '*') return vals.join(cg.o == '+' ? ' + ' : ' × ') + ' = ' + calc(cg.o, vals);
    const hi = Math.max(...vals), lo = Math.min(...vals), r = calc(cg.o, vals);
    return `${hi} ${SIGN[cg.o]} ${lo}` + (r === r ? ` = ${r}` : ' does not come out even');
  }

  /* ---------- geometry: rows, columns, peers ---------- */
  const GEO = {};
  function geo(n) {
    if (GEO[n]) return GEO[n];
    const rows = range(n).map(r => range(n).map(c => r * n + c)), cols = range(n).map(c => range(n).map(r => r * n + c));
    const at = range(n * n).map(c => ({ r: Math.floor(c / n), c: c % n }));
    const lines = rows.map((cells, i) => ({ k: 'row', i, cells })).concat(cols.map((cells, i) => ({ k: 'column', i, cells })));
    const lineIds = at.map(a => [a.r, n + a.c]);
    const peers = at.map((a, c) => rows[a.r].concat(cols[a.c]).filter(q => q != c));
    return GEO[n] = { n, rows, cols, at, lines, lineIds, peers };
  }
  const sameLine = (n, a, b) => Math.floor(a / n) == Math.floor(b / n) || a % n == b % n;
  // per puzzle: which cage each square is in, the givens
  function info(p) {
    if (p._i && p._i.cg === p.cg) return p._i;
    const N = p.n * p.n, cageAt = new Array(N).fill(-1), giv = new Array(N).fill(0);
    p.cg.forEach((cg, i) => { cg.c.forEach(c => (cageAt[c] = i)); if (cg.o == '=') giv[cg.c[0]] = cg.t; });
    const out = { cg: p.cg, cageAt, giv };
    Object.defineProperty(p, '_i', { value: out, enumerable: false, configurable: true, writable: true });
    return out;
  }

  /* ---------- make: a bank puzzle by level, turned or mirrored ---------- */
  function decode(str) {
    const [n, cs, sol, gr] = str.split('|');
    const cg = cs.split(',').map(s => {
      const m = s.match(/^([0-9a-z]+)([-+*/=])(\d+)$/);
      return { c: Array.from(m[1], ch => parseInt(ch, 36)), o: m[2], t: +m[3] };
    });
    return { n: +n, cg, s: sol, gr: +gr };
  }
  // the bank puzzle under symmetry x: every cell moves, cages keep their op and target, the label goes to the new top-left cell
  function transform(n, cg, sol, x) {
    const f = SYMS[x], map = c => { const [r, k] = f(Math.floor(c / n), c % n, n); return r * n + k; };
    const out = cg.map(g => ({ c: g.c.map(map).sort((a, b) => a - b), o: g.o, t: g.t })).sort((a, b) => a.c[0] - b.c[0]);
    const s = new Array(n * n);
    for (let c = 0; c < n * n; c++) s[map(c)] = sol[c];
    return { cg: out, s: s.join('') };
  }
  // the bank entries of a level: 3(L-1) .. 3L-1 (band D: levels 1-6 are 5x5, 7-12 are 6x6, as the bank is sorted)
  function slot(band, level) {
    const L = Math.max(1, Math.min(12, +level || 1)), list = PUZ.mathdoku[band];
    return { list, lo: Math.min(list.length - 1, 3 * (L - 1)), per: 3 };
  }
  function make(band, level, rnd) {
    const o = slot(band, level), k = Math.min(o.list.length - 1, o.lo + Math.floor(rnd() * o.per)), x = Math.floor(rnd() * 8);
    const d = decode(o.list[k]), t = transform(d.n, d.cg, d.s, x);
    return { b: band, n: d.n, k, x, gr: d.gr, cg: t.cg, s: t.s };
  }

  /* ---------- state and moves (pure: they change st and return what happened) ---------- */
  const notesOn = p => p.b != 'B'; // three numbers need no pencil marks
  function fresh(p) {
    const g = info(p).giv;
    return { v: '0'.repeat(p.n * p.n), m: [], sel: Math.max(0, g.indexOf(0)), miss: 0, hn: [], h: [], nt: 0 };
  }
  // does a saved state belong to this puzzle?
  function fit(p, st) {
    const N = p.n * p.n, g = info(p).giv, int = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
    if (!st || typeof st != 'object' || typeof st.v != 'string' || st.v.length != N) return false;
    if (!new RegExp('^[0-' + p.n + ']*$').test(st.v) || g.some((x, i) => x && st.v[i] != '0')) return false;
    if (!Array.isArray(st.m) || (st.m.length && st.m.length != N) || !st.m.every(x => int(x, 0, (1 << p.n) - 1))) return false;
    if (!int(st.sel, 0, N - 1) || !int(st.miss, 0, 1e6) || !Array.isArray(st.hn) || !st.hn.every(c => int(c, 0, N - 1) && !g[c])) return false;
    if (st.nt != null && st.nt !== 0 && st.nt !== 1) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.length && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1)
      && int(e[1], 0, p.n) && int(e[2], 0, (1 << p.n) - 1)));
  }
  const vals = (p, st) => { const e = nums(st.v); return info(p).giv.map((x, i) => x || e[i]); };
  const setV = (st, c, v) => { st.v = st.v.slice(0, c) + v + st.v.slice(c + 1); };
  const noteOf = (st, c) => st.m[c] | 0;
  function setNote(p, st, c, m) {
    if (!st.m.length) { if (!m) return; st.m = new Array(p.n * p.n).fill(0); }
    st.m[c] = m;
    if (st.m.every(x => !x)) st.m = [];
  }
  const won = (p, st) => vals(p, st).join('') == p.s;
  const locked = (p, st, c) => !!info(p).giv[c] || st.hn.includes(c);
  // every square whose number is also somewhere else in its row or column
  function conflicts(p, b) {
    const out = new Set();
    for (const L of geo(p.n).lines) {
      const seen = {};
      for (const c of L.cells) if (b[c]) (seen[b[c]] = seen[b[c]] || []).push(c);
      for (const v in seen) if (seen[v].length > 1) seen[v].forEach(c => out.add(c));
    }
    return out;
  }
  // the cages that are full and do not make their target (indexes)
  function misses(p, b) {
    return p.cg.map((cg, i) => (cg.o != '=' && cg.c.every(c => b[c]) && calc(cg.o, cg.c.map(c => b[c])) !== cg.t ? i : -1)).filter(i => i >= 0);
  }
  // the first line of c that already has v somewhere else: {k, cell}
  function clash(p, b, c, v) {
    const G = geo(p.n), a = G.at[c];
    for (const [k, cells] of [['row', G.rows[a.r]], ['column', G.cols[a.c]]]) {
      const q = cells.find(x => x != c && b[x] == v);
      if (q != null) return { k, cell: q };
    }
    return null;
  }
  // a value goes in: the square's notes go, and so does that number from the notes of its row and column
  function place(p, st, c, v, step) {
    if (step) step.push([c, +st.v[c], noteOf(st, c)]);
    setV(st, c, v);
    setNote(p, st, c, 0);
    if (!v) return;
    for (const q of geo(p.n).peers[c]) if (noteOf(st, q) & bit(v)) {
      if (step) step.push([q, +st.v[q], noteOf(st, q)]);
      setNote(p, st, q, noteOf(st, q) & ~bit(v));
    }
  }
  const pushStep = (st, step) => { st.h.push(step); if (st.h.length > 60) st.h.shift(); };
  // a number tapped for square c: {ign} or {ok, conf: [squares it clashes with], cage: index of the cage it filled
  // (made: true when the cage makes its target), miss: one mistake counted, won}
  function enter(p, st, c, v) {
    if (locked(p, st, c)) return { ign: 'locked' };
    if (+st.v[c] == v) return { ign: 'same' };
    const step = [];
    place(p, st, c, v, step);
    pushStep(st, step);
    const b = vals(p, st), conf = geo(p.n).peers[c].filter(q => b[q] == v), ci = info(p).cageAt[c], cg = p.cg[ci];
    const full = cg.c.every(q => b[q]), made = full && calc(cg.o, cg.c.map(q => b[q])) === cg.t;
    const miss = conf.length > 0 || (full && !made);
    if (miss) st.miss++;
    return { ok: true, conf, cage: full ? ci : -1, made, miss, won: !miss && won(p, st) };
  }
  // Erase: the number, or else the notes, of square c
  function erase(p, st, c) {
    if (locked(p, st, c) || (!+st.v[c] && !noteOf(st, c))) return { ign: true };
    const step = [[c, +st.v[c], noteOf(st, c)]];
    if (+st.v[c]) setV(st, c, 0); else setNote(p, st, c, 0);
    pushStep(st, step);
    return { ok: true };
  }
  // a pencil mark on or off (C, D; only on an empty square)
  function note(p, st, c, v) {
    if (!notesOn(p) || locked(p, st, c) || +st.v[c] || v < 1 || v > p.n) return { ign: true };
    pushStep(st, [[c, 0, noteOf(st, c)]]);
    setNote(p, st, c, noteOf(st, c) ^ bit(v));
    return { ok: true, on: !!(noteOf(st, c) & bit(v)) };
  }
  function undo(p, st) {
    const step = st.h.pop();
    if (!step) return null;
    for (let i = step.length - 1; i >= 0; i--) {
      const [c, v, m] = step[i];
      if (locked(p, st, c)) continue;
      setV(st, c, v);
      setNote(p, st, c, m);
    }
    return step[0][0];
  }
  // a hint fills square c with its number; the square locks (drawn star-yellow) and no undo step can touch it again
  function fill(p, st, c) {
    const v = +p.s[c];
    place(p, st, c, v);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(s => !s.some(e => e[0] == c));
    return v;
  }

  /* ---------- hints: the next square a child can fill, and why ---------- */
  // Candidates as the grader has them: not in the row or column (and not taken away by an elimination), and kept only when some
  // way of filling the cage (its target, the other squares' candidates, no number twice in a line) uses them.
  // -> {cand, fills: [ways per cage], must: [[cage, line id, values every way puts in the cage's squares of that line]]}
  function analyse(p, b, elim) {
    const n = p.n, G = geo(n), full = (1 << n) - 1, I = info(p);
    const base = b.map((v, c) => {
      if (v) return 0;
      let m = full & ~(elim ? elim[c] : 0);
      for (const q of G.peers[c]) if (b[q]) m &= ~bit(b[q]);
      return m;
    });
    const cand = new Array(n * n).fill(0), fills = [], must = [];
    I.cg.forEach((cg, ci) => {
      fills[ci] = 0;
      const empty = cg.c.filter(c => !b[c]);
      if (!empty.length) return;
      const v = cg.c.map(c => b[c]), at = empty.map(c => cg.c.indexOf(c)), sup = empty.map(() => 0);
      const lids = [...new Set([].concat(...empty.map(c => G.lineIds[c])))], inter = lids.map(() => full);
      const rec = i => {
        if (i == empty.length) {
          if (calc(cg.o, v) !== cg.t) return;
          fills[ci]++;
          empty.forEach((c, j) => (sup[j] |= bit(v[at[j]])));
          lids.forEach((li, k) => {
            let m = 0;
            empty.forEach((c, j) => { if (G.lineIds[c].includes(li)) m |= bit(v[at[j]]); });
            inter[k] &= m;
          });
          return;
        }
        for (let x = 1; x <= n; x++) {
          if (!(base[empty[i]] & bit(x))) continue;
          let bad = false;
          for (let j = 0; j < i; j++) if (v[at[j]] == x && sameLine(n, empty[j], empty[i])) bad = true;
          if (bad) continue;
          v[at[i]] = x;
          rec(i + 1);
        }
        v[at[i]] = 0;
      };
      rec(0);
      empty.forEach((c, j) => (cand[c] = sup[j]));
      lids.forEach((li, k) => { if (fills[ci] && inter[k]) must.push([ci, li, inter[k]]); });
    });
    return { cand, fills, must };
  }
  // what the cage alone allows in square c (its arithmetic and the numbers already in the cage; rows and columns not looked at)
  // -> {opts: mask for c, sets: the number sets that make the cage as sorted lists (only when the cage is still empty)}
  function cageOpts(p, b, ci, c) {
    const n = p.n, cg = p.cg[ci], v = cg.c.map(q => b[q]), at = cg.c.indexOf(c), sets = new Set();
    const empty = cg.c.map((q, i) => (b[q] ? -1 : i)).filter(i => i >= 0);
    let opts = 0;
    const rec = j => {
      if (j == empty.length) {
        if (calc(cg.o, v) !== cg.t) return;
        opts |= bit(v[at]);
        sets.add(v.slice().sort((x, y) => x - y).join(','));
        return;
      }
      const i = empty[j];
      for (let x = 1; x <= n; x++) {
        let bad = false;
        for (let k = 0; k < cg.c.length; k++) if (k != i && v[k] == x && sameLine(n, cg.c[k], cg.c[i])) bad = true;
        if (bad) continue;
        v[i] = x;
        rec(j + 1);
      }
      v[i] = 0;
    };
    rec(0);
    return { opts, sets: empty.length == cg.c.length ? [...sets].map(s => s.split(',').map(Number)) : null };
  }
  // why square c of cage ci holds v: the number sets of the cage, then what its row and column take away
  function cageWhy(p, b, ci, c, v) {
    const cg = p.cg[ci], o = cageOpts(p, b, ci, c), lab = label(cg), size = WORD[cg.c.length] + ' squares';
    const have = cg.c.map(q => b[q]).filter(Boolean);
    let head;
    if (o.sets && o.sets.length <= 4) {
      const ss = o.sets.map(s => list(s));
      head = o.sets.length == 1 ? `Only ${ss[0]} make ${lab} in ${size}.` : `${lab} in ${size} can be ${ss.join(', or ')}.`;
    } else if (have.length) head = `${lab} with ${list(have)} in: this square can be ${list(bits(o.opts), 'or')}.`;
    else head = `For ${lab} this square can be ${list(bits(o.opts), 'or')}.`;
    const G = geo(p.n), inLine = new Set(G.peers[c].map(q => b[q]).filter(Boolean));
    const gone = bits(o.opts).filter(x => inLine.has(x)), left = bits(o.opts).filter(x => !inLine.has(x));
    if (gone.length && left.length == 1 && left[0] == v)
      return `${head} ${list(gone)} ${gone.length > 1 ? 'are' : 'is'} already in this square's row or column, so it is ${v}.`;
    if (bits(o.opts).length == 1) return `${head} So this square is ${v}.`;
    return `${head} Try each one: only ${v} fits here with its row, its column and the rest of the cage.`;
  }

  // The next step: {kind, cell, v, house (squares hint 1 points at), also (squares hint 2 marks besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const n = p.n, G = geo(n), I = info(p), b = vals(p, st), sol = nums(p.s), e = nums(st.v);
    if (b.join('') == p.s) return null;
    const cageOf = c => p.cg[I.cageAt[c]];
    const say3 = v => `${v} goes here.`;
    // 1. a number that is not right: one that clashes first, then one in a cage that misses, then any
    const wrong = e.map((x, c) => (x && x != sol[c] ? c : -1)).filter(c => c >= 0);
    if (wrong.length) {
      const cf = conflicts(p, b), ms = new Set([].concat(...misses(p, b).map(i => p.cg[i].c)));
      const c = wrong.find(x => cf.has(x)) ?? wrong.find(x => ms.has(x)) ?? wrong[0];
      return { kind: 'wrong', cell: c, v: sol[c], house: cageOf(c).c, also: [],
        say1: 'One number in this cage is not right yet.', say2: `This ${e[c]} does not belong here. Another number goes in this square.`, say3: say3(sol[c]) };
    }
    // 2. a cage with one empty square that its arithmetic fixes
    for (const cg of p.cg) {
      const empty = cg.c.filter(c => !b[c]);
      if (empty.length != 1 || cg.o == '=') continue;
      const fits = range(n).map(i => i + 1).filter(x => calc(cg.o, cg.c.map(c => b[c] || x)) === cg.t);
      if (fits.length != 1) continue;
      const c = empty[0], v = fits[0], have = cg.c.filter(q => q != c).map(q => b[q]), all = cg.c.map(q => b[q] || v);
      const how = { '+': `The numbers in this cage add up to ${cg.t}`, '*': `The numbers in this cage multiply to ${cg.t}`,
        '-': `In this cage the two numbers are ${cg.t} apart`, '/': `In this cage one number is ${cg.t} times the other` }[cg.o];
      return { kind: 'cagelast', cell: c, v, house: cg.c, also: [],
        say1: `This ${label(cg)} cage needs just one more number.`,
        say2: `${how}. It has ${list(have)}, so the last number is ${v}: ${sumText(cg, all)}.`, say3: say3(v) };
    }
    // 3. a row or column with one gap
    for (const L of G.lines) {
      const gaps = L.cells.filter(c => !b[c]);
      if (gaps.length != 1) continue;
      const have = new Set(L.cells.map(c => b[c])), v = range(n).map(i => i + 1).find(x => !have.has(x));
      return { kind: 'last', cell: gaps[0], v, house: L.cells, also: [],
        say1: `This ${L.k} has just one empty square.`, say2: `Only ${v} is missing from this ${L.k}.`, say3: say3(v) };
    }
    // 4. a cage single: a square with one candidate left; the cage with the fewest ways to make it first
    const a = analyse(p, b);
    const single = an => {
      let best = -1;
      for (let c = 0; c < n * n; c++) if (!b[c] && one(an.cand[c]) && (best < 0 || an.fills[I.cageAt[c]] < an.fills[I.cageAt[best]])) best = c;
      if (best >= 0) return { kind: 'cage', cell: best, v: valOf(an.cand[best]) };
      for (const L of G.lines) for (let v = 1; v <= n; v++) {
        if (L.cells.some(c => b[c] == v)) continue;
        const where = L.cells.filter(c => !b[c] && an.cand[c] & bit(v));
        if (where.length == 1) return { kind: 'hidden', cell: where[0], v, L };
      }
      return null;
    };
    const hiddenWhy = s => `${s.v} can only go here: no other empty square of this ${s.L.k} can be ${s.v}, because of its ${s.L.k == 'row' ? 'column' : 'row'} or its cage.`;
    let s = single(a);
    if (s && s.kind == 'cage') {
      const cg = cageOf(s.cell);
      return { kind: 'cage', cell: s.cell, v: s.v, house: cg.c, also: [],
        say1: `Look at the ${label(cg)} cage. Which numbers can make it?`, say2: cageWhy(p, b, I.cageAt[s.cell], s.cell, s.v), say3: say3(s.v) };
    }
    if (s) return { kind: 'hidden', cell: s.cell, v: s.v, house: s.L.cells, also: [],
      say1: `Look at this ${s.L.k}. Where can ${s.v} go?`, say2: hiddenWhy(s), say3: say3(s.v) };
    // 5. take candidates away (a cage in a line, a naked pair) until a single shows
    // AUD-BT S-2: the hint names ONE step and ONE number ("Every way to make 3+ puts a 1 in the marked squares of this row, so
    // no other square of the row can be 1. Now ..."), so it is only given when a single follows from exactly that on the board
    // as it is: every such step is tried, each number of a cage on its own. (It was: the first step found, with every number the
    // cage takes and then more steps the words did not mention, so the "Now ..." did not follow in two hints of three.)
    const steps = [];
    for (const [ci, li, m] of a.must) {
      const L = G.lines[li], at = p.cg[ci].c.filter(c => !b[c] && G.lineIds[c].includes(li));
      for (const v of bits(m)) {
        const out = L.cells.filter(c => !b[c] && I.cageAt[c] != ci && a.cand[c] & bit(v)).map(c => [c, v]);
        if (out.length) steps.push({ kind: 'inline', ci, L, v, at, out });
      }
    }
    for (const L of G.lines) for (let i = 0; i < n; i++) {
      const c1 = L.cells[i];
      if (b[c1] || popc(a.cand[c1]) != 2) continue;
      for (let j = i + 1; j < n; j++) {
        const c2 = L.cells[j];
        if (b[c2] || a.cand[c2] != a.cand[c1]) continue;
        const out = [];
        for (const c of L.cells) if (c != c1 && c != c2 && !b[c]) for (const v of bits(a.cand[c] & a.cand[c1])) out.push([c, v]);
        if (out.length) steps.push({ kind: 'pair', L, vs: bits(a.cand[c1]), at: [c1, c2], out });
      }
    }
    for (const x of steps) {
      const el = new Array(n * n).fill(0);
      for (const [c, v] of x.out) el[c] |= bit(v);
      s = single(analyse(p, b, el));
      if (!s) continue;
      const k = x.L.k;
      const pre = x.kind == 'inline'
        ? `Every way to make ${label(p.cg[x.ci])} puts ${aN(x.v)} in the marked squares of this ${k}, so no other square of the ${k} can be ${x.v}. Now `
        : `The marked squares can only be ${x.vs[0]} and ${x.vs[1]}, so no other square of this ${k} can be. Now `;
      const tail = s.kind == 'cage' ? `only ${s.v} fits here.` : `${s.v} can only go here in its ${s.L.k}.`;
      return { kind: x.kind, cell: s.cell, v: s.v, house: x.L.cells, also: x.at,
        say1: x.kind == 'inline' ? `Look at the ${label(p.cg[x.ci])} cage and this ${k}.` : `Look at this ${k}. Which numbers can each square be?`,
        say2: pre + tail, say3: say3(s.v) };
    }
    // a single that needs several steps: the square is still found, with the plain words (no reason that does not hold)
    const elim = new Array(n * n).fill(0);
    let an = a;
    for (let it = 0; it < 60; it++) {
      let x = null;
      for (const [ci, li, m] of an.must) {
        const L = G.lines[li], out = [];
        for (const c of L.cells) if (!b[c] && I.cageAt[c] != ci) for (const v of bits(m & an.cand[c])) out.push([c, v]);
        if (out.length) { x = { out }; break; }
      }
      if (!x) for (const L of G.lines) {
        for (let i = 0; i < n && !x; i++) {
          const c1 = L.cells[i];
          if (b[c1] || popc(an.cand[c1]) != 2) continue;
          for (let j = i + 1; j < n && !x; j++) {
            const c2 = L.cells[j];
            if (b[c2] || an.cand[c2] != an.cand[c1]) continue;
            const out = [];
            for (const c of L.cells) if (c != c1 && c != c2 && !b[c]) for (const v of bits(an.cand[c] & an.cand[c1])) out.push([c, v]);
            if (out.length) x = { out };
          }
        }
        if (x) break;
      }
      if (!x) break;
      for (const [c, v] of x.out) elim[c] |= bit(v);
      an = analyse(p, b, elim);
      s = single(an);
      if (s) return { kind: 'steps', cell: s.cell, v: s.v, house: cageOf(s.cell).c, also: [],
        say1: 'Try this square.', say2: 'This one takes two steps. Look at its row, its column and its cage.', say3: say3(s.v) };
    }
    // 6. never stuck: the empty square with the fewest choices
    let c = -1;
    for (let i = 0; i < b.length; i++) if (!b[i] && (c < 0 || popc(a.cand[i]) < popc(a.cand[c]))) c = i;
    return { kind: 'guess', cell: c, v: sol[c], house: cageOf(c).c, also: [],
      say1: 'Try this square.', say2: 'Look at its row, its column and its cage.', say3: say3(sol[c]) };
  }
  // hint(p, st, tier): {tier, kind, cell, v, house, mark, say, fill ([cell, value] on tier 3 only)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, house: t == 3 ? [] : s.house, mark: t == 1 ? [] : [s.cell].concat(t == 2 ? s.also : []),
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, fill: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win, in the order the hints would give them: [[cell, value], ...]
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < p.n * p.n; i++) {
      const s = nextStep(p, st);
      if (!s) break;
      place(p, st, s.cell, s.v);
      out.push([s.cell, s.v]);
    }
    return out;
  }
  // words for the voice: "12×" -> "12 times", "2 + 3 = 5" -> "2 plus 3 equals 5"
  const spoken = t => String(t).replace(/ \+ /g, ' plus ').replace(/ × /g, ' times ').replace(/ − /g, ' minus ').replace(/ ÷ /g, ' divided by ')
    .replace(/ = /g, ' equals ').replace(/(\d)\+/g, '$1 plus').replace(/(\d)×/g, '$1 times').replace(/(\d)−/g, '$1 minus').replace(/(\d)÷/g, '$1 divide');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const G = geo(p.n), I = info(p), n = p.n, N = n * n, giv = I.giv, nt = notesOn(p);
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, ms));
    let marks = { house: [], cell: [] }, msg = '', done = false;
    const ops = [...new Set(p.cg.map(g => g.o).filter(o => o != '='))].sort((x, y) => '+-*/'.indexOf(x) - '+-*/'.indexOf(y));
    const intro = p.b == 'B'
      ? `Each row and column needs 1, 2 and 3 once. The numbers in a cage add up to its number. Tap a square, then a number.`
      : `Each row and column needs 1 to ${n} once. The numbers in a cage make its number with its sign (${ops.map(o => SIGN[o]).join(' ')}). Tap a square, then a number.`;
    const labAt = new Array(N).fill(-1);
    p.cg.forEach((g, i) => { if (g.o != '=') labAt[g.c[0]] = i; });

    // the cage lines: thin between squares of one cage, thick between cages (viewBox units = squares; the grid's edge is its CSS ring)
    let thin = '', thick = '';
    for (let c = 0; c < N; c++) {
      const r = Math.floor(c / n), k = c % n;
      if (k < n - 1) { const d = `M${k + 1} ${r}V${r + 1}`; if (I.cageAt[c] == I.cageAt[c + 1]) thin += d; else thick += d; }
      if (r < n - 1) { const d = `M${k} ${r + 1}H${k + 1}`; if (I.cageAt[c] == I.cageAt[c + n]) thin += d; else thick += d; }
    }
    const lines = `<svg class="md-lines" viewBox="0 0 ${n} ${n}" preserveAspectRatio="none" aria-hidden="true">` +
      (thin ? `<path class="md-thin" d="${thin}"/>` : '') + (thick ? `<path class="md-thick" d="${thick}"/>` : '') + '</svg>';
    const cells = range(N).map(c => `<button class="md-c" data-c="${c}"></button>`).join('');
    const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad md-pad"');
    el.innerHTML = `<div class="md md-n${n} md-${p.b}" style="--n:${n}">` +
      `<div class="md-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'md-spk' })}<p class="md-msg" aria-live="polite"></p></div>` +
      `<div class="md-main"><div class="md-board" role="group" aria-label="MathDoku, ${n} by ${n}"><div class="md-grid">${cells}</div>${lines}</div></div>` +
      `<div class="md-ctl">${pad}</div></div>`;
    const root = el.querySelector('.md'), board = root.querySelector('.md-board'), padEl = root.querySelector('.md-pad');
    const say_ = root.querySelector('.md-say'), ctl = root.querySelector('.md-ctl'), main = root.querySelector('.md-main');
    const cellEl = range(N).map(c => board.querySelector(`[data-c="${c}"]`));
    // the pad: 1..n with dots for how many are left; Erase and Undo, and Notes in bands C and D
    padEl.querySelectorAll('.k').forEach(k => { const d = k.dataset.k; if (d == '0' || d == 'go' || +d > n) k.remove(); });
    for (let v = 1; v <= n; v++) {
      const k = padEl.querySelector(`.k[data-k="${v}"]`);
      k.innerHTML = `<span class="md-kf">${v}</span><small class="md-left"></small>`;
      k.classList.add('md-sym');
    }
    const del = padEl.querySelector('.k[data-k="del"]');
    del.setAttribute('aria-label', 'Erase');
    del.classList.add('t');
    del.insertAdjacentHTML('beforeend', '<span>Erase</span>');
    padEl.append(del);
    padEl.insertAdjacentHTML('beforeend', (nt ? `<button class="key k t md-ntk" data-k="notes" aria-label="Notes" aria-pressed="false">${ico('edit')}<span>Notes</span></button>` : '') +
      `<button class="key k t" data-k="undo" aria-label="Undo">${ico('undo')}<span>Undo</span></button>`);
    const tools = padEl.querySelectorAll('.key.t').length;

    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.md-msg');
      m.textContent = text;
      m.className = 'md-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(spoken(text));
    }
    root.querySelector('.md-spk').onclick = () => { try { say(spoken(msg)); } catch (e) {} };

    /* ---------- drawing ---------- */
    function draw() {
      const b = vals(p, st), cf = conflicts(p, b), ms = new Set(misses(p, b)), s = G.at[st.sel], selV = b[st.sel];
      for (let c = 0; c < N; c++) {
        const v = b[c], given = !!giv[c], hn = st.hn.includes(c), m = noteOf(st, c), a = G.at[c], li = labAt[c];
        let cls = 'md-c' + (given ? ' giv' : v ? (hn ? ' ent hn' : ' ent') : '');
        if (c == st.sel) cls += ' sel';
        else if (a.r == s.r || a.c == s.c) cls += ' rc';
        if (selV && v == selV && c != st.sel) cls += ' same';
        if (cf.has(c)) cls += ' cf';
        if (marks.cell.includes(c)) cls += ' hl';
        else if (marks.house.includes(c)) cls += ' hh';
        if (li >= 0) cls += ' lab';
        let html = '', lab = v ? String(v) : 'empty';
        if (li >= 0) {
          const miss = ms.has(li);
          html += `<span class="md-lab${miss ? ' miss' : ''}">${miss ? ico('warning', 14) : ''}${label(p.cg[li])}</span>`;
        }
        if (v) html += `<b class="md-v">${v}</b>` + (cf.has(c) && !given ? `<span class="md-wn">${ico('warning', 16)}</span>` : '');
        else if (m) {
          html += `<i class="md-nts">${range(n).map(i => `<span>${m & bit(i + 1) ? i + 1 : ''}</span>`).join('')}</i>`;
          lab = 'notes ' + range(n).filter(i => m & bit(i + 1)).map(i => i + 1).join(' ');
        }
        if (given) lab += ', given';
        if (cf.has(c)) lab += ', clashes';
        const cg = p.cg[I.cageAt[c]];
        const cage = cg.o == '=' ? '' : `, cage ${spoken(label(cg))}${ms.has(I.cageAt[c]) ? ' does not make its number' : ''}`;
        if (cellEl[c].className != cls) cellEl[c].className = cls;
        if (cellEl[c]._h !== html) { cellEl[c].innerHTML = html; cellEl[c]._h = html; }
        cellEl[c].setAttribute('aria-label', `Row ${a.r + 1}, column ${a.c + 1}: ${lab}${cage}`);
      }
      for (let v = 1; v <= n; v++) {
        const k = padEl.querySelector(`.k[data-k="${v}"]`), left = n - b.filter(x => x == v).length;
        // one dot for each one left (a count that cannot be read as a power), a tick when none are left
        const lf = k.querySelector('.md-left'), t = left > 0 ? '<i></i>'.repeat(Math.min(n, left)) : ico('check', 14);
        if (lf._h !== t) { lf.innerHTML = t; lf._h = t; }
        k.classList.toggle('zero', left <= 0);
        k.setAttribute('aria-label', `${v}, ${Math.max(0, left)} left`);
      }
      const nk = padEl.querySelector('[data-k="notes"]'), uk = padEl.querySelector('[data-k="undo"]');
      if (nk) { nk.classList.toggle('on', !!st.nt); nk.setAttribute('aria-pressed', st.nt ? 'true' : 'false'); }
      uk.disabled = !st.h.length || done;
      root.classList.toggle('nt', !!st.nt);
    }

    /* ---------- layout: the board is a square sized to the space that is left (section 8) ----------
       portrait: talk line, board, pad; landscape: board, then a side column with the talk line and the pad.
       The pad is a grid of 60 narrow columns, so the digits and the tools can each share a row evenly (60 = 3 x 4 x 5). */
    const side = document.createElement('div');
    side.className = 'md-side';
    root.append(side);
    let lastW = 0, lastH = 0;
    function arrange(land) {
      if (land) { root.append(main, side); side.append(say_, ctl); }
      else root.append(say_, main, ctl);
      root.classList.toggle('land', land);
    }
    // the digits in one row when each key can be 48 px wide, else two rows; the tools (with their words) in the row below
    function setPad(w) {
      const ds = 60 / ((w - n * 8) / n >= 48 ? n : Math.ceil(n / 2)), ts = 60 / tools;
      padEl.style.setProperty('--ds', Math.floor(ds));
      padEl.style.setProperty('--ts', Math.floor(ts));
      // a tool key too narrow for its word shows the icon only (its aria-label still says it)
      padEl.classList.toggle('tight', (w * ts) / 60 - 8 < 104);
    }
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640, gap = 12;
      let bs;
      arrange(land);
      if (land) {
        setPad(side.offsetWidth);
        bs = Math.min(ah, aw - side.offsetWidth - 2 * gap);
      } else {
        setPad(aw);
        bs = Math.min(aw, ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap);
      }
      const cs = Math.min(MAXCELL[n] || 64, Math.floor((Math.max(120, bs) - 2 * FP) / n));
      root.style.setProperty('--cs', Math.max(28, cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    const speakB = p.b == 'B';
    function finish() {
      done = true;
      marks = { house: [], cell: [] };
      draw();
      root.classList.add('win');
      tell('Solved! Every row and column has each number once, and every cage makes its number.', 'good', speakB);
      api.win({ mistakes: st.miss });
    }
    function pick(c) {
      if (done || c == null || c < 0 || c >= N) return;
      st.sel = c;
      SFX.click();
      store();
      draw();
    }
    const msgAfter = () => {
      const b = vals(p, st);
      if (conflicts(p, b).size) return 'Some numbers still clash. The amber squares show where.';
      if (misses(p, b).length) return 'A cage with an amber number does not make it yet.';
      return 'Keep going!';
    };
    function pop(cs) {
      for (const c of cs) {
        const e = cellEl[c];
        e.classList.remove('pop');
        void e.offsetWidth;
        e.classList.add('pop');
      }
    }
    function sym(v) {
      if (done) return;
      const c = st.sel;
      if (st.nt && nt) {
        const r = note(p, st, c, v);
        if (r.ign) return tell(+st.v[c] || locked(p, st, c) ? 'Notes go in empty squares.' : 'Tap an empty square first.', 'try');
        SFX.key(v);
        store();
        return draw();
      }
      const r = enter(p, st, c, v);
      if (r.ign) {
        if (r.ign == 'same') return;
        return tell(giv[c] ? 'That one was there from the start. Tap an empty square.' : 'A hint filled that one. Tap another square.', 'try', speakB);
      }
      marks = { house: [], cell: [] };
      store();
      draw();
      if (r.conf.length) {
        SFX.rattle();
        const k = clash(p, vals(p, st), c, v);
        return tell(`Two ${v}s in this ${k ? k.k : 'row'}. Change one of them.`, 'try', speakB);
      }
      const cg = p.cg[r.cage];
      if (cg && !r.made) {
        SFX.rattle();
        const b = vals(p, st);
        return tell(`${sumText(cg, cg.c.map(q => b[q]))}, but this cage needs ${cg.t}. Change a number.`, 'try', speakB);
      }
      SFX.pop(1);
      if (r.won) return finish();
      if (cg && r.made) { pop(cg.c); return tell(`${sumText(cg, cg.c.map(q => vals(p, st)[q]))}. That cage works!`, 'good'); }
      tell(msgAfter(), '');
    }
    function act(k) {
      if (done) return;
      if (k == 'del') {
        const r = erase(p, st, st.sel);
        if (r.ign) return tell(locked(p, st, st.sel) ? 'That one stays. Pick a square you filled.' : 'That square is already empty.', 'try');
        SFX.del();
        tell(msgAfter(), '');
      } else if (k == 'notes') {
        st.nt = st.nt ? 0 : 1;
        SFX.click();
        tell(st.nt ? 'Notes are on: tap numbers to jot them small. Tap Notes again to write big.' : 'Notes are off: numbers go in big.', '');
      } else if (k == 'undo') {
        const c = undo(p, st);
        if (c == null) return;
        st.sel = c;
        SFX.whoosh();
        marks = { house: [], cell: [] };
        tell(msgAfter(), '');
      } else return sym(+k);
      store();
      draw();
    }
    board.onclick = e => { const b = e.target.closest('.md-c'); if (b) pick(+b.dataset.c); };
    padEl.querySelectorAll('.k[data-k]').forEach(b => b.onclick = () => act(b.dataset.k));
    // hardware keys: digits, Backspace or Delete, arrows to move, N for notes
    const keyd = e => {
      if (!el.isConnected || done || document.querySelector('.bt-win,.sheet')) return;
      const a = G.at[st.sel], mv = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (/^[1-9]$/.test(e.key) && +e.key <= n) { e.preventDefault(); act(e.key); }
      else if (e.key == 'Backspace' || e.key == 'Delete') { e.preventDefault(); act('del'); }
      else if ((e.key == 'n' || e.key == 'N') && nt) act('notes');
      else if (mv) { e.preventDefault(); pick(((a.r + mv[0] + n) % n) * n + ((a.c + mv[1] + n) % n)); }
    };
    document.addEventListener('keydown', keyd);

    /* ---------- start ---------- */
    const fresh_ = !st.v.replace(/0/g, '') && !st.m.length;
    tell(fresh_ ? intro : 'Keep going! Tap an empty square.', '', fresh_ && speakB);
    layout();
    // the stage can still be settling (fonts, the frame's top bar): look again once
    later(layout, 60);
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        marks = { house: h.house, cell: h.mark };
        if (h.fill) {
          fill(p, st, h.fill[0]);
          st.sel = h.fill[0];
          store();
          draw();
          pop([h.fill[0]]);
          tell(h.say, 'hint', true);
          if (won(p, st)) finish();
          return true;
        }
        if (h.tier == 2) st.sel = h.cell;
        store();
        draw();
        tell(h.say, 'hint', true);
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
      },
    };
  }

  return { SIGN, SYMS, calc, label, decode, transform, slot, make, geo, info, fresh, fit, vals, conflicts, misses, enter, erase, note, undo,
    fill, won, notesOn, analyse, nextStep, hint, solve, spoken, mount, nums };
})();

BT.reg({
  id: 'mdoku', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => MD.make(band, level, rnd),
  mount: (el, p, api) => MD.mount(el, p, api),
  solve: p => MD.solve(p),
});
/* ---------- Brain Teasers: Logic grids (P3-07; BRAIN_TEASERS.md 5.3, 7, 8; details in PROGRESS.md) ----------
   Type `logic`, bands B (3 children x 1 picture category), C (3 x 2) and D (4 x 2, the second ordered). Level L uses bank entries
   3(L-1)..3L-1 of PUZ.logic[band] (P3-06; read only inside functions, A11); the seeded rnd picks one and swaps the children's names
   (a name appears in a sentence only as itself, so every clue stays true). A tap cycles blank -> cross -> tick -> blank; a tick
   crosses the open squares of its row and column in its block (auto-cross, D can turn it off). A mark that breaks a rule the child
   can see is shown in amber at once and not counted; Check counts wrong marks (each once). Hints follow the grader's techniques
   (tools/puzzles/logic.js): a wrong mark, a tick's lines, clue mark, only place left, link, two-way clue, chain; tier 1 points,
   tier 2 explains, tier 3 places that one mark. State: {v: '0' blank '1' tick '2' cross per square of blocks (0,1), (0,2), (1,2)
   (row = item of the first category), a: auto-crosses, h: undo steps, miss, u: struck clues, hn: hint marks, seen, ac, hu, tab}. */
const LG = (() => {
  // the generator's names (tools/puzzles/logic.js NAMES), for the runtime swap
  const NAMES = ['Mia', 'Leo', 'Sam', 'Ava', 'Ben', 'Zoe', 'Max', 'Tom', 'Kim', 'Eli', 'Nia', 'Raj', 'Ana', 'Omar', 'Finn', 'Ella', 'Noah',
    'Maya', 'Owen', 'Kai', 'Ada', 'Luca', 'Nora', 'Hugo', 'Lena', 'Ravi', 'Yuki', 'Amir', 'Tara', 'Theo', 'Dev', 'Zara', 'Ivan', 'Jun'];
  // words for hints and the summary (the generator's CATS; test.js checks they rebuild every is / is-not sentence of the bank)
  const VB = { pet: 'has|does not have', snack: 'eats|does not eat', sport: 'plays|does not play', music: 'plays|does not play',
    ride: 'rides|does not ride', colour: 'likes|does not like', age: 'is|is not', house: 'lives at|does not live at', race: 'came|did not come' };
  const OWN = { swim: 'swims|does not swim|', skate: 'skates|does not skate|', paint: 'paints|does not paint|', read: 'reads|does not read|',
    draw: 'draws|does not draw|', puzzle: 'does|does not do|puzzles' };
  const NOUN = { pet: 'pet', snack: 'snack', sport: 'sport', hobby: 'hobby', music: 'instrument', ride: 'ride', colour: 'color', age: 'age',
    house: 'house', race: 'place' };
  const ING = { paint: 'painting', draw: 'drawing', read: 'reading', swim: 'swimming', skate: 'skating' };
  const BASE = { age: 'be', house: 'live at', race: 'come' };
  const EXT = { age: ['the youngest', 'the oldest'], house: ['at the smallest number', 'at the biggest number'], race: ['first', 'last'] };
  const ORD = ['1st', '2nd', '3rd', '4th'];
  const CHAIN = 2; // as the grader: a what-if must break within 2 steps
  const range = k => Array.from({ length: k }, (_, i) => i);
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const lcf = s => (s.startsWith('The ') ? 't' + s.slice(1) : s);
  const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' or ' + a[a.length - 1]);

  /* ---------- words ---------- */
  const catOf = (p, c) => p.cats[c - 1];
  const wordOf = (p, c, i) => (c ? p.items[c - 1][i] : p.names[i]);
  function verb(cat, w) { // [verb, negative verb, object]
    if ((cat == 'sport' || cat == 'hobby') && OWN[w]) return OWN[w].split('|');
    const [v, nv] = VB[cat].split('|');
    return [v, nv, cat == 'sport' || cat == 'colour' || cat == 'age' || cat == 'race' ? w : cat == 'house' ? 'number ' + w : 'the ' + w];
  }
  function who(cat, w) { // an item as a sentence subject
    if (cat == 'pet') return `the ${w}'s owner`;
    if (cat == 'age') return `the ${w}-year-old`;
    if (cat == 'house') return 'the child at number ' + w;
    const [v, , o] = verb(cat, w);
    return ('the child who ' + v + ' ' + o).trim();
  }
  const ref = (p, e) => (e[0] ? who(catOf(p, e[0]), wordOf(p, ...e)) : p.names[e[1]]);
  function vp(p, e, neg) {
    if (!e[0]) return (neg ? 'is not ' : 'is ') + p.names[e[1]];
    const [v, nv, o] = verb(catOf(p, e[0]), wordOf(p, ...e));
    return ((neg ? nv : v) + ' ' + o).trim();
  }
  // "Ben paints", "The child who paints is 7", "The cat's owner is not Mia": the lower category is the subject
  const sent = (p, e1, e2, neg) => cap(ref(p, e1) + ' ' + vp(p, e2, neg));
  const fact = (p, e1, e2, neg) => (e1[0] > e2[0] ? sent(p, e2, e1, neg) : sent(p, e1, e2, neg));
  // short names for "the square for Ben and paint"
  function lab(p, c, i) {
    if (!c) return p.names[i];
    const cat = catOf(p, c), w = wordOf(p, c, i);
    if (cat == 'age') return 'age ' + w;
    if (cat == 'house') return 'number ' + w;
    // W38: a square is named with the -ing form ("A tick for Hugo and painting."); puzzles, soccer, basketball, tennis stay
    if (cat == 'race' || cat == 'sport' || cat == 'hobby' || cat == 'colour') return w == 'puzzle' ? 'puzzles' : ING[w] || w;
    return 'the ' + w;
  }
  const noun = (p, c) => (c ? NOUN[catOf(p, c)] : 'child');

  /* ---------- make: a bank puzzle by level, with the names swapped ---------- */
  function decode(entry) {
    const [names, cats, sol, gr, sc] = entry[0].split('|');
    const cs = cats.split(';').map(s => s.split('='));
    return { names: names.split(','), cats: cs.map(x => x[0]), items: cs.map(x => x[1].split(',')),
      sol: sol.split(';').map(s => Array.from(s, Number)), gr: +gr, sc: +sc, cl: entry.slice(1) };
  }
  function pickNames(rnd, n, maxLen) {
    const pool = NAMES.filter(x => x.length <= maxLen), out = [];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (const x of pool) if (out.length < n && !out.some(y => y[0] == x[0])) out.push(x);
    return out;
  }
  // bank puzzle k of a band with these names (every name of the puzzle replaced at once, as whole words)
  function build(band, k, names) {
    const d = decode(PUZ.logic[band][k]), old = d.names, n = old.length;
    const nm = names || old, re = new RegExp('\\b(' + old.join('|') + ')\\b', 'g');
    const cl = d.cl.map(q => q.slice(0, -1).concat(q[q.length - 1].replace(re, m => nm[old.indexOf(m)])));
    const O = d.cats.findIndex(c => PUZ.logic.cats[c] && PUZ.logic.cats[c].ordered) + 1;
    return { b: band, k, n, K: d.cats.length, O, names: nm.slice(0, n), cats: d.cats, items: d.items, sol: d.sol, gr: d.gr, sc: d.sc, cl };
  }
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, +level || 1)), list = PUZ.logic[band];
    const k = Math.min(list.length - 1, 3 * (L - 1) + Math.floor(rnd() * 3));
    const n = decode(list[k]).names.length;
    return build(band, k, pickNames(rnd, n, band == 'B' ? 4 : 9));
  }

  /* ---------- geometry: blocks (0,1), (0,2), (1,2); square = block * n*n + row * n + column ---------- */
  const CX = new WeakMap();
  function ctx(p) {
    if (CX.has(p)) return CX.get(p);
    const n = p.n, nn = n * n, B = p.K == 1 ? [[0, 1]] : [[0, 1], [0, 2], [1, 2]];
    // ch[c][i]: the child of entity (c, i)
    const ch = [range(n)].concat(p.sol.map(s => { const r = []; s.forEach((it, kid) => { r[it] = kid; }); return r; }));
    const cl = p.cl.map((q, qi) => (q[0] == 'or' ? { k: 'or', qi, a: [q[1], q[2]], d: q[3], j: [q[4], q[5]], t: q[6] }
      : { k: q[0], qi, a: [q[1], q[2]], b: [q[3], q[4]], t: q[5] }));
    const lines = [];
    B.forEach((bl, k) => {
      for (let x = 0; x < n; x++) for (const row of [1, 0]) lines.push({ k, x, row, cells: range(n).map(y => k * nn + (row ? x * n + y : y * n + x)) });
    });
    const x = { p, n, nn, B, K: p.K, O: p.O, ch, cl, N: B.length * nn, lines };
    CX.set(p, x);
    return x;
  }
  const bix = (a, b) => (a == 0 ? b - 1 : 2);
  const at = (x, a, i, b, j) => (a < b ? bix(a, b) * x.nn + i * x.n + j : bix(b, a) * x.nn + j * x.n + i);
  const pos = (x, c) => { const k = Math.floor(c / x.nn), r = c % x.nn; return [x.B[k][0], Math.floor(r / x.n), x.B[k][1], r % x.n]; };
  const solv = (x, c) => { const [a, i, b, j] = pos(x, c); return x.ch[a][i] == x.ch[b][j] ? 1 : -1; };
  const lineOf = (x, c, row) => x.lines.find(L => L.row == row && L.cells.includes(c));
  const lineEnt = (x, L) => (L.row ? [x.B[L.k][0], L.x] : [x.B[L.k][1], L.x]); // whose line it is
  const lineCross = (x, L) => (L.row ? x.B[L.k][1] : x.B[L.k][0]); // the category along it
  // block (1,2) is drawn turned (rows = the second category), so its engine rows are columns on screen
  const rowcol = (x, L) => ((x.B[L.k][0] == 1) == !!L.row ? 'column' : 'row');

  /* ---------- the grader's marks (tools/puzzles/logic.js), on an Int8Array: 0 open, 1 tick, -1 cross ---------- */
  const gnew = (x, m) => ({ x, m: m || new Int8Array(x.N), bad: false });
  const gcopy = g => ({ x: g.x, m: g.m.slice(), bad: g.bad });
  const get = (g, a, i, b, j) => g.m[at(g.x, a, i, b, j)];
  // a tick crosses the rest of its row and column; a mark over the opposite one is a clash (g.bad)
  function mark(g, a, i, b, j, v) {
    const c = at(g.x, a, i, b, j), cur = g.m[c];
    if (cur == v) return false;
    if (cur) { g.bad = true; return true; }
    g.m[c] = v;
    if (v == 1) for (let k = 0; k < g.x.n; k++) {
      if (k != j) mark(g, a, i, b, k, -1);
      if (k != i) mark(g, a, k, b, j, -1);
    }
    return true;
  }
  function broken(g) {
    if (g.bad) return { why: 'bad' };
    for (const L of g.x.lines) {
      let cr = 0, tk = 0;
      for (const c of L.cells) { if (g.m[c] < 0) cr++; else if (g.m[c] > 0) tk++; }
      if (cr == g.x.n || tk > 1) return { why: tk > 1 ? 'two' : 'empty', L };
    }
    return null;
  }
  const cand = (g, e, d) => range(g.x.n).filter(k => get(g, e[0], e[1], d, k) != -1);
  const REL = { gt: (v, w) => v > w, lt: (v, w) => v < w, nx: (v, w) => Math.abs(v - w) == 1 };
  // every application of technique t, in the grader's order: {t, marks: [[a, i, b, j, v, why]], ...}
  function* apps(g, t, used) {
    const x = g.x, n = x.n;
    if (t == 1) {
      for (const q of x.cl) {
        if (q.k != 'is' && q.k != 'not') continue;
        if (used) { if (used.has(q.qi)) continue; used.add(q.qi); }
        yield { t, q, marks: [[...q.a, ...q.b, q.k == 'is' ? 1 : -1]] };
      }
    } else if (t == 2) {
      for (const L of x.lines) {
        let open = -1, cnt = 0, tick = false;
        for (const c of L.cells) { if (g.m[c] > 0) tick = true; if (!g.m[c]) { open = c; cnt++; } }
        if (!tick && cnt == 1) yield { t, L, marks: [[...pos(x, open), 1]] };
      }
    } else if (t == 3) {
      for (let c = 0; c < x.N; c++) {
        if (g.m[c] != 1) continue;
        const [a, i, b, j] = pos(x, c);
        for (let d = 0; d <= x.K; d++) {
          if (d == a || d == b) continue;
          const marks = [];
          for (let k = 0; k < n; k++) {
            const u = get(g, a, i, d, k), w = get(g, b, j, d, k);
            if (u && !w) marks.push([b, j, d, k, u, [a, i, d, k, u]]);
            else if (w && !u) marks.push([a, i, d, k, w, [b, j, d, k, w]]);
          }
          yield { t, tick: [a, i, b, j], marks };
        }
      }
    } else if (t == 4) {
      for (const q of x.cl) {
        if (q.k == 'is' || q.k == 'not') continue;
        const marks = [];
        if (q.k == 'or') {
          for (let k = 0; k < n; k++) if (!q.j.includes(k)) marks.push([...q.a, q.d, k, -1, 'or']);
        } else {
          const rel = REL[q.k], c1 = cand(g, q.a, x.O), c2 = cand(g, q.b, x.O);
          for (const v of c1) if (!c2.some(w => rel(v, w))) marks.push([...q.a, x.O, v, -1, ['a', c2]]);
          for (const w of c2) if (!c1.some(v => rel(v, w))) marks.push([...q.b, x.O, w, -1, ['b', c1]]);
          if (q.a[0] != q.b[0]) marks.push([...q.a, ...q.b, -1, 'diff']);
        }
        yield { t, q, marks };
      }
    } else if (t == 5) {
      const used2 = new Set(x.cl.filter(q => q.k == 'is' || q.k == 'not').map(q => q.qi));
      for (let c = 0; c < x.N; c++) {
        if (g.m[c]) continue;
        const tr = gcopy(g), tu = new Set(used2), steps = [];
        mark(tr, ...pos(x, c), 1);
        let br = broken(tr);
        for (let s = 0; s < CHAIN && !br; s++) {
          let moved = null;
          for (let tt = 1; tt <= 4 && !moved; tt++) moved = step(tr, tt, tu);
          if (!moved) break;
          steps.push(moved);
          br = broken(tr);
        }
        if (br) yield { t, marks: [[...pos(x, c), -1]], steps, br };
      }
    }
  }
  // the grader's step: the first application that changes something, applied whole; returns it with its first new mark (m)
  function step(g, t, used) {
    for (const ap of apps(g, t, used)) {
      let first = null;
      for (const m of ap.marks) if (get(g, ...m.slice(0, 4)) != m[4] && !first) first = m;
      let ch = false;
      for (const m of ap.marks) ch = mark(g, ...m.slice(0, 5)) || ch;
      if (ch) return Object.assign(ap, { m: first || ap.marks[0] });
    }
    return null;
  }
  // the first new mark technique t can make (nothing is changed)
  function find(g, t) {
    for (const ap of apps(g, t, null)) for (const m of ap.marks) if (get(g, ...m.slice(0, 4)) != m[4]) return Object.assign(ap, { m });
    return null;
  }

  /* ---------- the child's state ---------- */
  const val = (st, c) => (st.v[c] == '1' ? 1 : st.v[c] == '2' ? -1 : 0);
  function fresh(p) {
    const N = ctx(p).N;
    return { v: '0'.repeat(N), a: '0'.repeat(N), h: [], miss: 0, u: [], hn: [], seen: [], ac: 1, hu: 0, tab: 0 };
  }
  function fit(p, st) {
    const x = ctx(p), N = x.N, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi, sq = a => Array.isArray(a) && a.every(c => int(c, 0, N - 1));
    if (!st || typeof st != 'object' || typeof st.v != 'string' || typeof st.a != 'string' || st.v.length != N || st.a.length != N) return false;
    if (!/^[012]*$/.test(st.v) || !/^[01]*$/.test(st.a) || !int(st.miss, 0, 1e6) || !sq(st.hn) || !sq(st.seen)) return false;
    if (!Array.isArray(st.u) || !st.u.every(q => int(q, 0, p.cl.length - 1)) || !int(st.ac, 0, 1) || !int(st.hu, 0, 1) || !int(st.tab, 0, x.B.length - 1)) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.length && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1) &&
      /^[012]$/.test(e[1]) && /^[01]$/.test(e[2])));
  }
  function setC(st, c, v, a, step) {
    if (step) step.push([c, st.v[c], st.a[c]]);
    st.v = st.v.slice(0, c) + v + st.v.slice(c + 1);
    st.a = st.a.slice(0, c) + a + st.a.slice(c + 1);
  }
  const lines2 = (x, c) => [lineOf(x, c, 1), lineOf(x, c, 0)];
  // a tick in: auto-cross the open squares of its row and column
  function tickIn(p, st, c, step) {
    const x = ctx(p);
    setC(st, c, '1', '0', step);
    if (st.ac) for (const L of lines2(x, c)) for (const q of L.cells) if (q != c && st.v[q] == '0') setC(st, q, '2', '1', step);
  }
  // a tick out: the crosses it put in go too, unless another tick in their line still needs them
  function tickOut(p, st, c, step) {
    const x = ctx(p);
    setC(st, c, '0', '0', step);
    for (const L of lines2(x, c)) for (const q of L.cells) {
      if (st.a[q] != '1' || st.hn.includes(q)) continue;
      if (lines2(x, q).some(M => M.cells.some(r => st.v[r] == '1'))) continue;
      setC(st, q, '0', '0', step);
    }
  }
  const pushStep = (st, s) => { if (s.length) { st.h.push(s); if (st.h.length > 60) st.h.shift(); } };
  const won = (p, st) => { const x = ctx(p); return range(x.N).every(c => (val(st, c) == 1) == (solv(x, c) == 1)); };
  // a tap on square c: blank -> cross -> tick -> blank. {ign} or {ok, now, won}
  function tap(p, st, c) {
    if (st.hn.includes(c)) return { ign: 'hint' };
    const s = [], cur = st.v[c];
    if (cur == '0') setC(st, c, '2', '0', s);
    else if (cur == '2') tickIn(p, st, c, s);
    else tickOut(p, st, c, s);
    pushStep(st, s);
    return { ok: true, now: st.v[c], won: won(p, st) };
  }
  function undo(p, st) {
    const s = st.h.pop();
    if (!s) return null;
    for (let i = s.length - 1; i >= 0; i--) if (!st.hn.includes(s[i][0])) setC(st, s[i][0], s[i][1], s[i][2]);
    return s[0][0];
  }
  // Check: the marks that are not right; the new ones count as mistakes
  function check(p, st) {
    const x = ctx(p), bad = range(x.N).filter(c => val(st, c) && val(st, c) != solv(x, c)), add = bad.filter(c => !st.seen.includes(c));
    st.miss += add.length;
    st.seen = st.seen.concat(add);
    return { bad, add: add.length };
  }
  // a hint's mark goes in and locks (no tap or undo takes it)
  function place(p, st, c, v) {
    const s = [];
    if (st.v[c] == '1' && v < 0) tickOut(p, st, c, s);
    if (v > 0) tickIn(p, st, c, s); else setC(st, c, '2', '0', s);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(e => !e.some(q => q[0] == c));
  }

  /* ---------- what the child can see is wrong: Map square -> why ---------- */
  function conflicts(p, st) {
    const x = ctx(p), out = new Map(), add = (c, w) => { if (!out.has(c)) out.set(c, w); }, V = c => val(st, c);
    for (const L of x.lines) {
      const t = L.cells.filter(c => V(c) > 0);
      if (t.length > 1) t.forEach(c => add(c, { k: 'two', L }));
      if (L.cells.every(c => V(c) < 0)) L.cells.forEach(c => add(c, { k: 'empty', L }));
    }
    const ordOf = e => range(x.n).find(k => V(at(x, ...e, x.O, k)) > 0);
    for (const q of x.cl) {
      if (q.k == 'is' || q.k == 'not') {
        const c = at(x, ...q.a, ...q.b);
        if (V(c) == (q.k == 'is' ? -1 : 1)) add(c, { k: 'clue', q });
      } else if (q.k == 'or') {
        for (let k = 0; k < x.n; k++) if (!q.j.includes(k) && V(at(x, ...q.a, q.d, k)) > 0) add(at(x, ...q.a, q.d, k), { k: 'clue', q });
        const cs = q.j.map(k => at(x, ...q.a, q.d, k));
        if (cs.every(c => V(c) < 0)) cs.forEach(c => add(c, { k: 'clue', q }));
      } else {
        if (q.a[0] != q.b[0] && V(at(x, ...q.a, ...q.b)) > 0) add(at(x, ...q.a, ...q.b), { k: 'clue', q });
        const u = ordOf(q.a), w = ordOf(q.b);
        if (u != null && w != null && !REL[q.k](u, w)) [at(x, ...q.a, x.O, u), at(x, ...q.b, x.O, w)].forEach(c => add(c, { k: 'clue', q }));
      }
    }
    for (let c = 0; c < x.N; c++) {
      if (V(c) != 1) continue;
      const [a, i, b, j] = pos(x, c);
      for (let d = 0; d <= x.K; d++) {
        if (d == a || d == b) continue;
        for (let k = 0; k < x.n; k++) {
          const c1 = at(x, a, i, d, k), c2 = at(x, b, j, d, k);
          if (V(c1) && V(c2) && V(c1) != V(c2)) { add(c1, { k: 'link', tick: c }); add(c2, { k: 'link', tick: c }); }
        }
      }
    }
    return out;
  }
  const pair = (p, c) => { const [a, i, b, j] = pos(ctx(p), c); return lab(p, a, i) + ' and ' + lab(p, b, j); };
  const mfact = (p, m, v) => fact(p, [m[0], m[1]], [m[2], m[3]], (v == null ? m[4] : v) < 0); // a mark as a sentence
  const cfact = (p, c, v) => mfact(p, pos(ctx(p), c), v);
  function why(p, w) { // a conflict in words
    const x = ctx(p);
    if (w.k == 'clue') return `That does not fit clue ${w.q.qi + 1}: ${w.q.t}`;
    if (w.k == 'link') return `That does not fit your tick for ${pair(p, w.tick)}: ${cfact(p, w.tick, 1)}.`;
    const e = lineEnt(x, w.L), d = lineCross(x, w.L), where = `the ${rowcol(x, w.L)} for ${lab(p, ...e)}`;
    if (w.k == 'empty') return `Every square in ${where} is crossed. One of them needs a tick.`;
    return `Two ticks in ${where}. ` + (d ? `${cap(ref(p, e))} has just one ${noun(p, d)}.` : `Only one child ${vp(p, e)}.`);
  }

  /* ---------- hints: the next mark a child can make, and why ---------- */
  const mk = v => (v > 0 ? 'a tick' : 'a cross');
  const say3 = (p, c, v) => `${cap(mk(v))} for ${pair(p, c)}.`;
  // {kind, cell, v, q (clue index or -1), line (squares tier 1 shades), also (squares tier 2 rings besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const x = ctx(p);
    if (won(p, st)) return null;
    const base = (kind, cell, v, o) => Object.assign({ kind, cell, v, q: -1, line: [], also: [], say3: say3(p, cell, v) }, o);
    // 1. a mark that is not right (one the child can see clashing first)
    const wrong = range(x.N).filter(c => val(st, c) && val(st, c) != solv(x, c));
    if (wrong.length) {
      const cf = conflicts(p, st), c = wrong.find(q => cf.has(q)) ?? wrong[0];
      return base('wrong', c, solv(x, c), { line: lineOf(x, c, 1).cells,
        say1: 'One mark in the yellow line is not right yet.', say2: `This ${val(st, c) > 0 ? 'tick' : 'cross'} is not right: ${cfact(p, c, solv(x, c))}.` });
    }
    const g = gnew(x, Int8Array.from(range(x.N), c => val(st, c)));
    // 2. auto-cross off: the rest of a tick's lines
    for (let c = 0; c < x.N; c++) {
      if (g.m[c] != 1) continue;
      const q = lines2(x, c).flatMap(L => L.cells).find(r => !g.m[r]);
      if (q != null) return base('line', q, -1, { line: [c], also: [c], say1: `Look at your tick for ${pair(p, c)}.`,
        say2: `${cfact(p, c, 1)}, so ${lcf(cfact(p, q, -1))}.` });
    }
    // 3. the grader's techniques, easiest first
    for (let t = 1; t <= 5; t++) {
      const r = find(g, t);
      if (!r) continue;
      const m = r.m, cell = at(x, ...m.slice(0, 4)), v = m[4];
      if (t == 1) {
        return base('clue', cell, v, { q: r.q.qi, say1: `Look at clue ${r.q.qi + 1}: ${r.q.t}`,
          say2: `Clue ${r.q.qi + 1} says: ${r.q.t} So put ${mk(v)} for ${pair(p, cell)}.` });
      }
      if (t == 2) {
        const e = lineEnt(x, r.L);
        return base('only', cell, v, { line: r.L.cells, say1: `Look at the ${rowcol(x, r.L)} for ${lab(p, ...e)}.`,
          say2: `Every other ${noun(p, lineCross(x, r.L))} is crossed out for ${ref(p, e)}, so ${lcf(mfact(p, m))}.` });
      }
      if (t == 3) {
        const tick = at(x, ...r.tick), src = m[5];
        return base('link', cell, v, { line: [tick], also: [tick, at(x, ...src.slice(0, 4))], say1: `Look at the tick for ${pair(p, tick)}.`,
          say2: `${cfact(p, tick, 1)}. ${mfact(p, src)}, so ${lcf(mfact(p, m))}${v > 0 ? ' too' : ' either'}.` });
      }
      if (t == 4) {
        const q = r.q, w = m[5], pre = `Clue ${q.qi + 1} says: ${q.t} `;
        let s2;
        if (w == 'or') s2 = `${pre}So ${lcf(mfact(p, m))}.`;
        else if (w == 'diff') s2 = `Clue ${q.qi + 1} is about two different children, so ${lcf(mfact(p, m))}.`;
        else {
          const other = w[0] == 'a' ? q.b : q.a, cat = catOf(p, x.O), objs = w[1].map(k => verb(cat, wordOf(p, x.O, k))[2]);
          s2 = w[1].length == x.n ? `${pre}So ${ref(p, [m[0], m[1]])} cannot be ${EXT[cat][m[3] ? 1 : 0]}: ${lcf(mfact(p, m))}.`
            : `${pre}${cap(ref(p, other))} can only ${BASE[cat]} ${list(objs)}, so ${lcf(mfact(p, m))}.`;
        }
        return base('two-way', cell, v, { q: q.qi, say1: `Look at clue ${q.qi + 1} again: ${q.t}`, say2: s2 });
      }
      // 5. a what-if that breaks
      const then = r.steps.map(s => lcf(mfact(p, s.m)) + (s.q ? ` (clue ${s.q.qi + 1})` : '')), br = r.br;
      let end = 'that breaks a rule';
      if (br.L) {
        const e = lineEnt(x, br.L), d = lineCross(x, br.L);
        end = br.why == 'two' ? `two ticks would be in the ${rowcol(x, br.L)} for ${lab(p, ...e)}`
          : d ? `${ref(p, e)} would have no ${noun(p, d)} left` : `nobody would be left for ${lab(p, ...e)}`;
      }
      return base('chain', cell, v, { line: [cell], say1: `Look at the square for ${pair(p, cell)}. What if it had a tick?`,
        say2: `What if ${lcf(cfact(p, cell, 1))}? Then ${then.concat(end).join(', and ')}. That cannot be, so ${lcf(cfact(p, cell, -1))}.` });
    }
    // 4. never stuck (never needed by the bank: tools/test.js)
    const c = range(x.N).find(q => !g.m[q]);
    return base('guess', c, solv(x, c), { line: [c], say1: 'Try this square.', say2: 'Read the clues about this square again.' });
  }
  // hint(p, st, tier): {tier, kind, cell, v, q, line, mark, say, put ([cell, v] on tier 3)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, q: t < 3 ? s.q : -1, line: t == 1 ? s.line : [], mark: t == 2 ? [s.cell].concat(s.also) : [],
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, put: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win: the squares to tick, in the order the hints find them
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < 400 && !won(p, st); i++) {
      const s = nextStep(p, st);
      place(p, st, s.cell, s.v);
      if (s.v > 0) out.push(s.cell);
    }
    return out;
  }
  // the answer in words: "Raj eats the cupcake and is 7."
  const summary = p => range(p.n).map(kid => p.names[kid] + ' ' + p.sol.map((s, c) => vp(p, [c + 1, s[kid]])).join(' and ') + '.');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const x = ctx(p), n = p.n, K = p.K, N = x.N, B = p.b == 'B', cats = PUZ.logic.cats;
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    let marks = { line: [], cell: [], q: -1 }, msg = '', done = false, view = '', flash = [], sel = -1, pend = -1, pt = 0;
    // views of a two-category grid: all three blocks; the children's two blocks + the third (tabs); one block a tab
    const GROUPS = { full: [[0, 1, 2]], pair: [[0, 1], [2]], one: [[0], [1], [2]] };
    const group = () => (K == 1 ? [0] : GROUPS[view].find(g => g.includes(st.tab)));
    // a picture, a colour swatch, or the number for an item; c = 0 is a child's name
    function face(c, i, row) {
      if (!c) return `<b class="lg-nm">${esc(p.names[i])}</b>`;
      const cat = catOf(p, c), w = wordOf(p, c, i), pics = (cats[cat] || {}).pics;
      if (pics && pics[w]) return `<span class="lg-pic">${picFor(w, pics[w])}</span>`;
      if (cat == 'colour') return `<span class="lg-col"><i style="background:var(--ill-${esc(w)})"></i><small>${esc(w)}</small></span>`;
      if (cat == 'house') return `<span class="lg-num">${ico('home', 16)}${esc(w)}</span>`;
      if (cat == 'race') return `<span class="lg-num">${ORD[i]}</span>`;
      return `<span class="lg-num">${row ? '<small>Age</small>' : ''}${esc(w)}</span>`;
    }
    const aria = (c, i) => (c ? wordOf(p, c, i) : p.names[i]);
    const cats2 = K == 1 ? `${noun(p, 1)}` : `${noun(p, 1)} and ${noun(p, 2)}`;
    const intro = `Find each child's ${cats2}. Tap a square once for a cross (no), twice for a tick (yes).`;

    // clue cards: band B draws child + picture + tick or cross, every band has the sentence and a speak button
    const clueHTML = p.cl.map((q, qi) => {
      let pic = '';
      if (B) {
        const kid = q[1] ? q[4] : q[2], it = q[1] ? q[2] : q[4];
        pic = `<span class="lg-qp"><b class="lg-nm">${esc(p.names[kid])}</b>${face(1, it)}<i class="lg-qm ${q[0] == 'is' ? 'yes' : 'no'}">` +
          `${ico(q[0] == 'is' ? 'check' : 'close', 22)}</i></span>`;
      }
      return `<li class="lg-q" data-q="${qi}"><button class="lg-qb" data-q="${qi}" aria-pressed="false"><b class="lg-qn">${qi + 1}</b>` +
        `<span class="lg-qt">${pic}<span class="lg-qs">${esc(q[q.length - 1])}</span></span></button>` +
        `${UI.ibtn('speak', 'Read clue ' + (qi + 1), { size: 'sm', cls: 'lg-qsp', attrs: `data-s="${qi}"` })}</li>`;
    }).join('');
    const tools = UI.btn('Undo', { icon: 'undo', id: 'lgundo', size: 'sm' }) + UI.btn('Check', { icon: 'check-circle', id: 'lgcheck', size: 'sm' }) +
      (p.b == 'D' ? `<button class="btn soft sm lg-tb lg-ac" id="lgac" aria-label="Auto-cross" aria-pressed="true">${ico('close')}<span>Auto</span></button>` : '');
    const cl_ = c => cats[catOf(p, c)].label; // the grid's own category names ("Music", "Race")
    const tabName = g => (g.length == 2 ? 'Children' : g[0] < 2 ? cl_(x.B[g[0]][1]) : cl_(1) + ' + ' + cl_(2).toLowerCase());
    el.innerHTML = `<div class="lg lg-${p.b}" style="--n:${n}">` +
      `<div class="lg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'lg-spk' })}<p class="lg-msg" aria-live="polite"></p></div>` +
      `<div class="lg-board"><div class="lg-tabs" hidden></div><div class="lg-grid" role="group" aria-label="Logic grid"></div></div>` +
      `<div class="lg-tools">${tools}</div><ol class="lg-clues" aria-label="Clues">${clueHTML}</ol></div>`;
    const root = el.querySelector('.lg'), grid = root.querySelector('.lg-grid'), clues = root.querySelector('.lg-clues');
    const say_ = root.querySelector('.lg-say'), tabsEl = root.querySelector('.lg-tabs'), toolsEl = root.querySelector('.lg-tools');
    let cellEl = [];

    // the grid: column heads over each block, row heads left of each block row; block (1,2) is drawn turned (rows = 2nd category)
    function gridHTML() {
      const show = group();
      const blk = k => {
        const [a, b] = x.B[k];
        let h = '';
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) {
          const c = a == 1 ? k * x.nn + q * n + r : k * x.nn + r * n + q;
          h += `<button class="lg-c" data-c="${c}"></button>`;
        }
        return `<div class="lg-blk" data-k="${k}">${h}</div>`;
      };
      const colsOf = k => x.B[k][a1(k)], rowsOf = k => x.B[k][1 - a1(k)];
      function a1(k) { return x.B[k][0] == 1 ? 0 : 1; } // which end of block k runs along the columns
      const hd = c => `<div class="lg-hd"><span class="lg-cat">${esc(cats[catOf(p, c)].label)}</span><span class="lg-hs">` +
        range(n).map(i => `<span class="lg-h" data-h="${c}-${i}" aria-label="${esc(aria(c, i))}">${face(c, i)}</span>`).join('') + '</span></div>';
      const rh = c => `<div class="lg-rhs">${range(n).map(i => `<span class="lg-h lg-r" data-h="${c}-${i}" aria-label="${esc(aria(c, i))}">${face(c, i, 1)}</span>`).join('')}</div>`;
      let h = '<i class="lg-corner"></i>';
      if (show.length == 1) return h + hd(colsOf(show[0])) + rh(rowsOf(show[0])) + blk(show[0]);
      if (show.length == 2) return h + hd(1) + hd(2) + rh(0) + blk(0) + blk(1);
      h += hd(1) + (K == 2 ? hd(2) : '') + rh(0) + blk(0) + (K == 2 ? blk(1) + rh(2) + blk(2) +
        `<div class="lg-key" aria-hidden="true"><span>${ico('close', 20)}</span>${ico('arrow-right', 16)}<span>${ico('check', 20)}</span></div>` : '');
      return h;
    }
    function buildGrid() {
      grid.innerHTML = gridHTML();
      const g = group();
      grid.className = 'lg-grid' + (g.length == 3 ? ' lg-g2' : g.length == 2 ? ' lg-gp' : '');
      tabsEl.hidden = K == 1 || view == 'full';
      if (!tabsEl.hidden) {
        tabsEl.innerHTML = UI.seg(GROUPS[view].map(gr => [gr[0], tabName(gr)]), g[0], { id: 'lgtabs', label: 'Part of the grid' });
        UI.segOn(tabsEl.firstChild, v => { st.tab = +v; SFX.click(); buildGrid(); store(); draw(); });
      }
      cellEl = [];
      grid.querySelectorAll('.lg-c').forEach(e => { cellEl[+e.dataset.c] = e; });
    }
    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.lg-msg');
      m.textContent = text;
      m.className = 'lg-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(text);
    }
    root.querySelector('.lg-spk').onclick = () => { try { say(msg); } catch (e) {} };

    /* ---------- drawing ---------- */
    function draw() {
      const cf = conflicts(p, st), hs = new Set(), on = sel >= 0 ? pos(x, sel) : null;
      if (pend >= 0) cf.delete(pend);
      for (let c = 0; c < N; c++) {
        const e = cellEl[c];
        if (!e) continue;
        const v = st.v[c], [a, i, b, j] = pos(x, c);
        let cls = 'lg-c' + (v == '1' ? ' tk' : v == '2' ? ' cr' : '');
        if (st.hn.includes(c)) cls += ' hn';
        if (cf.has(c)) cls += ' cf';
        if (flash.includes(c)) cls += ' wr';
        if (marks.cell.includes(c)) cls += ' hl';
        else if (marks.line.includes(c)) cls += ' hh';
        if (c == sel) cls += ' sel';
        if (e.className != cls) e.className = cls;
        const html = (v == '1' ? ico('check') : v == '2' ? ico('close') : '') + (cf.has(c) ? `<span class="lg-wn">${ico('warning', 14)}</span>` : '');
        if (e._h !== html) { e.innerHTML = html; e._h = html; }
        e.setAttribute('aria-label', `${lab(p, a, i)} and ${lab(p, b, j)}: ${v == '1' ? 'tick' : v == '2' ? 'cross' : 'empty'}${cf.has(c) ? ', does not fit' : ''}`);
        if (on && c == sel) { hs.add(a + '-' + i); hs.add(b + '-' + j); }
      }
      grid.querySelectorAll('.lg-h').forEach(h => h.classList.toggle('on', hs.has(h.dataset.h)));
      clues.querySelectorAll('.lg-q').forEach(li => {
        const qi = +li.dataset.q, used = st.u.includes(qi), bad = [...cf.values()].some(w => w.q && w.q.qi == qi);
        li.className = 'lg-q' + (used ? ' used' : '') + (marks.q == qi ? ' hl' : '') + (bad ? ' cf' : '');
        li.querySelector('.lg-qb').setAttribute('aria-pressed', used ? 'true' : 'false');
      });
      const u = root.querySelector('#lgundo'), ac = root.querySelector('#lgac');
      u.disabled = !st.h.length || done;
      root.querySelector('#lgcheck').disabled = done;
      if (ac) { ac.setAttribute('aria-pressed', st.ac ? 'true' : 'false'); ac.classList.toggle('on', !!st.ac); }
      if (!tabsEl.hidden) tabsEl.querySelectorAll('button').forEach(b => {
        const gr = GROUPS[view].find(g => g[0] == +b.dataset.v);
        b.classList.toggle('lg-tcf', [...cf.keys()].some(c => gr.includes(Math.floor(c / x.nn))));
      });
    }

    /* ---------- layout: the grid is sized to the space left (section 8) ----------
       FR: the pieces the CSS adds around the squares (block padding 3 and square gap 2, head row height, gaps 6); must match the CSS. */
    const RH = B ? 76 : 52, MAX = B ? 92 : n == 3 ? 60 : 56, GAP = 6, MIN = 44;
    let lastW = 0, lastH = 0;
    const headH = cs => Math.max(44, Math.min(60, Math.round(cs * 0.75) + 16));
    // width and height of the grid at square size cs: across and down = blocks side by side and stacked; tabs adds the tab row
    function dims(cs, across, down, tabs) {
      const bw = n * cs + (n - 1) * 2 + 6;
      return { w: RH + across * (bw + GAP), h: headH(cs) + down * (bw + GAP) + (tabs ? 60 : 0) };
    }
    const fitCs = (w, h, a, d, t) => { let cs = MAX; while (cs > 30 && (dims(cs, a, d, t).w > w || dims(cs, a, d, t).h > h)) cs--; return cs; };
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640;
      root.classList.toggle('land', land);
      root.style.height = Math.max(320, ah) + 'px';
      // the talk line keeps two lines and the clue list at least about two clues (it scrolls; a long talk line takes from it)
      const w = land ? aw - 340 : aw, h = land ? ah : ah - 64 - toolsEl.offsetHeight - (B ? 3 * 60 : 140) - 3 * 12;
      let cs = fitCs(w, h, K, K, false), v = 'full';
      if (K == 2 && cs < MIN) { v = 'pair'; cs = fitCs(w, h, 2, 1, true); }
      if (K == 2 && cs < MIN) { v = 'one'; cs = fitCs(w, h, 1, 1, true); }
      if (v != view || !cellEl.length) { view = v; buildGrid(); }
      root.style.setProperty('--cs', cs + 'px');
      root.style.setProperty('--rh', RH + 'px');
      root.style.setProperty('--hh', headH(cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    function showTab(c) {
      const k = Math.floor(c / x.nn);
      if (K == 1 || group().includes(k)) return;
      st.tab = k;
      buildGrid();
    }

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    function finish() {
      done = true;
      marks = { line: [], cell: [], q: -1 };
      for (let c = 0; c < N; c++) if (st.v[c] == '0') setC(st, c, '2', '1');
      draw();
      root.classList.add('win');
      const sum = summary(p);
      tell('Solved! ' + sum.join(' '), 'good', B);
      api.win({ mistakes: st.miss, note: sum });
    }
    // what a mark breaks, in words (after the pause)
    function judge(c, quiet) {
      if (done) return;
      draw();
      const cf = conflicts(p, st);
      if (cf.has(c)) { if (!quiet) SFX.rattle(); tell(why(p, cf.get(c)), 'try'); }
    }
    function tapNow(c, before) {
      const r = tap(p, st, c);
      sel = c;
      if (r.ign) { draw(); return tell('A hint put that mark there. It stays.', 'try'); }
      marks = { line: [], cell: [], q: -1 };
      flash = [];
      store();
      draw();
      if (r.won) return finish();
      const cf = conflicts(p, st);
      if (pend == c) cf.delete(c);
      if (cf.has(c) || cf.size > before) {
        SFX.rattle();
        return tell(why(p, cf.get(c) || [...cf.values()][0]), 'try');
      }
      r.now == '1' ? SFX.pop(1) : SFX.click();
      const ticks = (st.v.match(/1/g) || []).length;
      if (ticks >= x.B.length * n) return tell('Every line has a tick, but something is not right yet. Tap Check, or ask for a hint.', 'try');
      if (msg && /does not fit|Two ticks|Every square/.test(msg) && !cf.size) tell('That fits again. Keep going!', '');
    }
    // a cross on its way to a tick (blank -> cross -> tick) is judged only when the child stops on it
    function tapCell(c) {
      if (done || c == null || !(c >= 0 && c < N)) return;
      clearTimeout(pt);
      const was = pend;
      pend = -1;
      if (was >= 0 && was != c) judge(was, true);
      const before = conflicts(p, st).size;
      if (st.v[c] == '0' && !st.hn.includes(c)) {
        pend = c;
        pt = setTimeout(() => { pend = -1; judge(c, false); }, 900);
      }
      tapNow(c, before);
    }
    grid.onclick = e => { const b = e.target.closest('.lg-c'); if (b) tapCell(+b.dataset.c); };
    clues.onclick = e => {
      const s = e.target.closest('[data-s]');
      if (s) { try { say(p.cl[+s.dataset.s].slice(-1)[0]); } catch (er) {} return; }
      const b = e.target.closest('.lg-qb');
      if (!b || done) return;
      const qi = +b.dataset.q;
      st.u = st.u.includes(qi) ? st.u.filter(q => q != qi) : st.u.concat(qi);
      SFX.click();
      store();
      draw();
    };
    root.querySelector('#lgundo').onclick = () => {
      if (done) return;
      const c = undo(p, st);
      if (c == null) return;
      SFX.whoosh();
      sel = c;
      flash = [];
      showTab(c);
      store();
      draw();
      tell(conflicts(p, st).size ? 'Undone. Some marks still do not fit: the amber squares.' : 'Undone.', '');
    };
    root.querySelector('#lgcheck').onclick = () => {
      if (done) return;
      const r = check(p, st);
      store();
      if (!r.bad.length) {
        SFX.right();
        flash = [];
        draw();
        return tell(/[12]/.test(st.v) ? 'Every mark so far is right. Keep going!' : 'Put some marks in first, then check.', 'good');
      }
      SFX.wrong();
      // the wrong marks are shown only after a hint (5.3)
      flash = st.hu ? r.bad : [];
      if (st.hu) showTab(r.bad[0]);
      draw();
      const many = r.bad.length == 1 ? 'One mark is' : r.bad.length + ' marks are';
      tell(`${many} not right yet.` + (st.hu ? ' They have an amber ring.' : ' Look again, or ask for a hint.'), 'try');
    };
    const acB = root.querySelector('#lgac');
    if (acB) acB.onclick = () => {
      if (done) return;
      st.ac = st.ac ? 0 : 1;
      SFX.click();
      store();
      draw();
      tell(st.ac ? 'Auto-cross is on: a tick crosses the rest of its row and column.' : 'Auto-cross is off: put every cross in yourself.', '');
    };

    /* ---------- start ---------- */
    const isNew = !/[12]/.test(st.v);
    tell(isNew ? intro : 'Keep going! Tap a square: once for a cross, twice for a tick.', '', isNew && B);
    layout();
    timers.push(setTimeout(layout, 60)); // the stage can still be settling (fonts, the frame's top bar)
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        st.hu = 1;
        flash = [];
        marks = { line: h.line, cell: h.mark, q: h.q };
        if (h.line.length || h.mark.length || h.put) showTab(h.put ? h.put[0] : (h.mark[0] ?? h.line[0]));
        if (h.put) {
          place(p, st, h.put[0], h.put[1]);
          sel = h.put[0];
          marks = { line: [], cell: [h.put[0]], q: -1 };
        }
        store();
        draw();
        const li = h.q >= 0 && clues.querySelector(`.lg-q[data-q="${h.q}"]`);
        if (li && li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
        tell(h.say, 'hint', true);
        if (h.put && won(p, st)) finish();
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        clearTimeout(pt);
        window.removeEventListener('resize', onResize);
      },
    };
  }

  return { NAMES, decode, build, make, pickNames, ctx, at, pos, solv, fresh, fit, tap, undo, check, place, won, conflicts, why, nextStep, hint,
    solve, summary, fact, sent, mount };
})();

BT.reg({
  id: 'logic', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => LG.make(band, level, rnd),
  mount: (el, p, api) => LG.mount(el, p, api),
  solve: p => LG.solve(p),
});
/* ---------- Brain Teasers: Tangrams (P3-11; BRAIN_TEASERS.md 5.7, 7, 8) ----------
   The seven classic pieces (two big triangles L, a middle triangle M, two small triangles S, a square Q, a parallelogram P) fill a
   silhouette. Puzzles are authored in src/data/d-puz-tangram.js (PUZ.tangram, format documented there) as their SOLUTION, so every
   puzzle is solvable by construction; tools/test.js proves each one exactly (no overlap, one connected shape, exact cover).

   UNITS AND EXACT NUMBERS. The big square that the seven pieces make has side 4, so the pieces are (k = 0, before any move):
     L (0,0) (4,0) (2,2)    M (0,0) (2,0) (0,2)    S (0,0) (2,0) (1,1)    Q (1,0) (2,1) (1,2) (0,1)    P (0,0) (2,0) (3,1) (1,1)
   (y points down, as on screen). A placement is [k, f, x, y]: flip f (x -> -x, the parallelogram only), then turn k x 45 degrees
   clockwise about (0,0), then move by (x, y). Turning by 45 degrees brings in sqrt(2), so the data keeps x and y exact as a number
   or a pair [a, b] = a + b * sqrt(2)/2 (a and b whole or half numbers); every corner of every piece is then such a pair too.
   On the screen positions are plain numbers in units: two corners closer than 1e-4 unit are the same point, and areas within 0.02
   unit^2 (2% of a small triangle) are equal. Snapping lands pieces exactly on corners, so a right answer is exact up to rounding.

   BANDS AND LEVELS (section 7, "help: outlines -> one piece placed -> nothing"; TG.PLAN). Level L uses puzzle L-1 of the bank (the
   bank is in order of difficulty); past the end of the bank a level picks one of the harder half by the seeded rnd. The seeded rnd
   also mirrors the picture (left-right) and picks which pieces the child places and how they lie in the tray:
     A (PK-K)  2 pieces to place (levels 1-6), then 3; only big pieces (the big triangles, the middle triangle, the square); the
               rest of the picture is already built; the outline of every missing piece is drawn; levels 1-6 the tray pieces already
               lie the right way round and at most one big triangle is to place (so a piece fits the one outline of its kind that
               is left without turning; R-01b), then they need turning.
     B (1-2)   4 pieces (levels 1-6), then 5, any of the seven; outlines drawn; turning needed; the parallelogram comes the right way
               up until level 8, then it may need a flip.
     C (3-4)   all seven, outlines hidden, one piece placed for you (levels 1-6 a big triangle, then any other piece).
     D (5-6)   all seven, no help.
   Puzzle (JSON): {id, name, say, b band, n bank index, m mirrored 0/1, pcs: [[k, f, x, y] x 7 exact, pieces in the order
   L L M S S Q P], fix: [piece indexes placed for you], ol: 1 when outlines show, tray: [[k, f] x 7 how each piece starts]}.

   SOLVED (TG.solved): every piece is on the board, no two pieces overlap (intersection area <= 0.02), and every piece lies inside
   the silhouette (its overlap with the solution pieces adds up to its own area within 0.02). Since the pieces' areas add up to
   the silhouette's, that is an exact cover. Any arrangement counts, not only the stored one, so the two big and the two small
   triangles are interchangeable, the square can be turned 90 degrees, and so on.

   STATE (api.saveState after every move; TG.fit refuses one that does not belong to the puzzle): {pc: per piece null (placed for
   you), [k, f] (in the tray) or [k, f, x, y] (on the board, units), h: the slot (solution piece) a hint is showing, or -1}.

   INPUT (one svg, touch-action none, pointer events for touch, pen and mouse): drag a piece from the tray or the board; on drop it
   snaps (TG.snap): among the moves of up to 0.45 unit (at least 16 px, at most 30 px) that put one of its corners on a corner of the
   silhouette, of the hidden solution or of another piece, it takes the one that fits (inside, no overlap), then the one with the
   most corners landing on corners, then the shortest. A drop on the tray puts the piece back. Tap a piece to pick it (a purple
   ring); tap the picked piece again to turn it 45 degrees clockwise (about its middle, then it snaps again). With a piece picked, a
   tap on the board moves it there (tap-then-tap, section 8). Buttons: Turn, Flip (only for the parallelogram), Undo (40 steps,
   not saved). Keys: R turns, F flips, U undoes. A piece that sticks out or lies on another gets an amber dashed ring.
   HINTS (5.7): 1) the outline of one slot glows yellow and its piece is picked; 2) that piece turns (and flips) the right way;
   3) it goes in (a piece in the way goes back to the tray). Tiers 1 and 2 never move a piece. No mistakes are counted: a piece in
   the wrong place is part of trying.
   DRAWING: the silhouette is one path (TG.outline joins the solution pieces and drops the inner edges), dark slate with a shadow
   along its top-left inside edge (light from the top left). Pieces: a ledge in the shade tone below, the base colour, a light edge
   on the sides facing the light, a deep outline; colours are --ill-* tokens (.tg-c0 .. .tg-c6), and the shapes differ anyway. */
const TG = (() => {
  const H = Math.SQRT1_2;
  const KIND = 'LLMSSQP';
  const SHAPE = {
    L: [[0, 0], [4, 0], [2, 2]], M: [[0, 0], [2, 0], [0, 2]], S: [[0, 0], [2, 0], [1, 1]],
    Q: [[1, 0], [2, 1], [1, 2], [0, 1]], P: [[0, 0], [2, 0], [3, 1], [1, 1]],
  };
  const AREA = { L: 4, M: 2, S: 1, Q: 2, P: 2 };
  const COLOUR = ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'light blue'];
  const SAME = 1e-4, EPS_A = 0.02;
  // how each band is helped (section 7): pieces to place by level, outlines, pieces placed for you, tray turned right
  const PLAN = {
    A: lv => ({ move: lv <= 6 ? 2 : 3, ol: 1, big: 1, turned: lv <= 6, flip: 0 }), // R-01b: no turning on levels 1-6 (was 1-4)
    B: lv => ({ move: lv <= 6 ? 4 : 5, ol: 1, big: 0, turned: false, flip: lv >= 9 }),
    C: lv => ({ move: 6, ol: 0, big: 0, turned: false, flip: 1, given: lv <= 6 ? 'L' : 'other' }),
    D: () => ({ move: 7, ol: 0, big: 0, turned: false, flip: 1 }),
  };
  const nameOf = (t, b) => ({ L: 'big triangle', M: 'middle triangle', S: 'small triangle', Q: 'square',
    P: b == 'A' || b == 'B' ? 'slanted piece' : 'parallelogram' })[t];

  /* ---------- exact numbers: n or [a, b] = a + b * sqrt(2)/2; exact points [xa, xb, ya, yb] ---------- */
  const pair = v => Array.isArray(v) ? [+v[0], +v[1]] : [+v, 0];
  const num = v => { const p = pair(v); return p[0] + p[1] * H; };
  const dataOf = (a, b) => b === 0 ? a : [a, b];
  const xrot = p => [(p[1] - p[3]) / 2, p[0] - p[2], (p[1] + p[3]) / 2, p[0] + p[2]];
  const xflip = p => [-p[0], -p[1], p[2], p[3]];
  function xlocal(t, k, f) {
    return SHAPE[t].map(([x, y]) => {
      let p = [x, 0, y, 0];
      if (f) p = xflip(p);
      for (let i = 0; i < k; i++) p = xrot(p);
      return p;
    });
  }
  // the exact corners of a placement (x, y in the data form)
  function xverts(t, k, f, x, y) {
    const X = pair(x), Y = pair(y);
    return xlocal(t, k, f).map(p => [p[0] + X[0], p[1] + X[1], p[2] + Y[0], p[3] + Y[1]]);
  }
  const xeq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  // the same piece without a flip, for the pieces whose mirror image is the piece itself turned (all but the parallelogram)
  function xnorm(t, k, f, x, y) {
    if (!f || t == 'P') return [k, f, x, y];
    const want = xverts(t, k, f, x, y);
    for (let k2 = 0; k2 < 8; k2++) {
      const loc = xlocal(t, k2, 0);
      for (const w of want) {
        const d = [w[0] - loc[0][0], w[1] - loc[0][1], w[2] - loc[0][2], w[3] - loc[0][3]];
        const got = loc.map(p => [p[0] + d[0], p[1] + d[1], p[2] + d[2], p[3] + d[3]]);
        if (got.every(g => want.some(v => xeq(g, v)))) return [k2, 0, dataOf(d[0], d[1]), dataOf(d[2], d[3])];
      }
    }
    throw new Error('tangram: no unflipped form of ' + t);
  }
  // the picture mirrored left-right: x -> -x for every corner
  function xmirror(t, pc) {
    const X = pair(pc[2]);
    return xnorm(t, (8 - pc[0]) % 8, 1 - pc[1], dataOf(-X[0], -X[1]), pc[3]);
  }

  /* ---------- plain-number geometry (units) ---------- */
  const LOC = {};
  for (const t in SHAPE) for (let f = 0; f < 2; f++) for (let k = 0; k < 8; k++) {
    LOC[t + k + f] = xlocal(t, k, f).map(p => [p[0] + p[1] * H, p[2] + p[3] * H]);
  }
  const local = (t, k, f) => LOC[t + k + (f ? 1 : 0)];
  const poly = (t, k, f, x, y) => local(t, k, f).map(([a, b]) => [a + x, b + y]);
  const mid = pl => [pl.reduce((s, q) => s + q[0], 0) / pl.length, pl.reduce((s, q) => s + q[1], 0) / pl.length];
  const area2 = pl => pl.reduce((s, q, i) => { const r = pl[(i + 1) % pl.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0);
  const area = pl => Math.abs(area2(pl)) / 2;
  const ccw = pl => area2(pl) < 0 ? pl.slice().reverse() : pl;
  // the area two convex polygons share (Sutherland-Hodgman)
  function shared(a, b) {
    let o = ccw(a);
    b = ccw(b);
    for (let i = 0; i < b.length && o.length; i++) {
      const [ax, ay] = b[i], [bx, by] = b[(i + 1) % b.length], ex = bx - ax, ey = by - ay;
      const side = q => ex * (q[1] - ay) - ey * (q[0] - ax);
      const inp = o;
      o = [];
      for (let j = 0; j < inp.length; j++) {
        const P = inp[j], Q = inp[(j + 1) % inp.length], sp = side(P), sq = side(Q);
        if (sp >= 0) o.push(P);
        if ((sp >= 0) != (sq >= 0)) { const t = sp / (sp - sq); o.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]); }
      }
    }
    return o.length > 2 ? area(o) : 0;
  }
  const near = (a, b, e = SAME) => Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e;
  const samePoly = (a, b) => a.length == b.length && a.every(q => b.some(r => near(q, r)));
  // The outline of a set of pieces that do not overlap: every edge is cut at the corners lying on it; a piece of edge that two
  // pieces share runs both ways and is dropped; the rest are joined into loops (outer loops turn one way, holes the other).
  function outline(polys) {
    const V = [];
    const at = q => { let i = V.findIndex(r => near(q, r, 1e-6)); if (i < 0) { i = V.length; V.push(q); } return i; };
    polys.forEach(pl => ccw(pl).forEach(at));
    const E = new Map();
    for (const pl of polys.map(ccw)) {
      for (let i = 0; i < pl.length; i++) {
        const a = pl[i], b = pl[(i + 1) % pl.length], dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
        const cut = V.map((q, j) => [j, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / L2, Math.abs((q[0] - a[0]) * dy - (q[1] - a[1]) * dx) / Math.sqrt(L2)])
          .filter(([, t, d]) => t > 1e-9 && t < 1 - 1e-9 && d < 1e-6).sort((p, q) => p[1] - q[1]).map(c => c[0]);
        const chain = [at(a), ...cut, at(b)];
        for (let j = 0; j + 1 < chain.length; j++) {
          const f = chain[j], g = chain[j + 1], back = g + '>' + f;
          if (E.has(back)) E.delete(back); else E.set(f + '>' + g, [f, g]);
        }
      }
    }
    const left = [...E.values()], loops = [];
    while (left.length) {
      const loop = [], first = left.shift();
      let cur = first;
      loop.push(cur[0]);
      for (let guard = 0; guard < 999; guard++) {
        const n = left.findIndex(e => e[0] == cur[1]);
        if (n < 0) break;
        cur = left.splice(n, 1)[0];
        loop.push(cur[0]);
      }
      // drop corners where the outline runs straight on
      const pts = loop.map(i => V[i]).filter((q, i, a) => {
        const p = a[(i + a.length - 1) % a.length], r = a[(i + 1) % a.length];
        return Math.abs((q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])) > 1e-9;
      });
      if (pts.length > 2) loops.push(pts);
    }
    return loops;
  }

  /* ---------- puzzles ---------- */
  const bank = () => (typeof PUZ != 'undefined' && PUZ.tangram) || []; // the data file loads after the code: read it only in functions
  // the bank entry a level uses (the bank is ordered easy to hard)
  function pickIndex(level, rnd) {
    const n = bank().length;
    if (n >= 12) { const a = Math.floor((level - 1) * n / 12), b = Math.max(a + 1, Math.floor(level * n / 12)); return a + Math.floor(rnd() * (b - a)); }
    if (level <= n) return level - 1;
    const lo = Math.floor(n / 2);
    return lo + Math.floor(rnd() * (n - lo));
  }
  function make(band, level, rnd) {
    const n = pickIndex(level, rnd), e = bank()[n];
    if (!e) throw new Error('tangram: no puzzle ' + n);
    const m = rnd() < 0.5 ? 1 : 0, plan = PLAN[band](level);
    const pcs = e.pcs.map((pc, i) => m ? xmirror(KIND[i], pc) : xnorm(KIND[i], pc[0], pc[1], pc[2], pc[3]));
    // the pieces the child places
    let move;
    const all = [0, 1, 2, 3, 4, 5, 6], order = all.slice();
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    if (plan.move >= 7) move = all;
    else if (plan.move == 6) {
      const given = plan.given == 'L' ? (rnd() < 0.5 ? 0 : 1) : order.find(i => KIND[i] != 'L');
      move = all.filter(i => i != given);
    } else {
      // R-01b: while the tray pieces lie the right way (band A levels 1-6), never both big triangles: the one placed for you fills
      // the other big triangle's outline, so the piece in the tray fits the one outline left for it without turning
      const one = plan.turned && plan.big;
      move = order.filter((i, j) => (!plan.big || 'LMQ'.includes(KIND[i])) && !(one && KIND[i] == 'L' && order.slice(0, j).some(x => KIND[x] == 'L')));
      move = move.slice(0, plan.move).sort((a, b) => a - b);
    }
    const tray = pcs.map((pc, i) => {
      if (!move.includes(i)) return [pc[0], pc[1]];
      const f = KIND[i] == 'P' && plan.flip ? 0 : pc[1];
      if (plan.turned) return [pc[0], f];
      let k = Math.floor(rnd() * 8);
      if (k == pc[0] && f == pc[1]) k = (k + 3) % 8; // the tray never starts with the answer's turn when turning is part of the level
      return [k, f];
    });
    return { id: e.id, name: e.name, say: e.say, b: band, n, m, pcs, fix: all.filter(i => !move.includes(i)), ol: plan.ol, tray };
  }
  const solPoly = (p, i) => { const s = p.pcs[i]; return poly(KIND[i], s[0], s[1], num(s[2]), num(s[3])); };
  const solPolys = p => p.pcs.map((s, i) => solPoly(p, i));
  const movable = p => [0, 1, 2, 3, 4, 5, 6].filter(i => !p.fix.includes(i));
  const fresh = p => ({ pc: p.tray.map((t, i) => p.fix.includes(i) ? null : [t[0], t[1]]), h: -1 });
  // the polygon of piece i now (units), or null while it is in the tray
  function piecePoly(p, st, i) {
    if (p.fix.includes(i)) return solPoly(p, i);
    const e = st.pc[i];
    return e && e.length == 4 ? poly(KIND[i], e[0], e[1], e[2], e[3]) : null;
  }
  // a saved state that belongs to this puzzle
  function fit(p, st) {
    if (!st || typeof st != 'object' || Array.isArray(st) || !Array.isArray(st.pc) || st.pc.length != 7) return false;
    for (let i = 0; i < 7; i++) {
      const e = st.pc[i];
      if (p.fix.includes(i)) { if (e !== null) return false; continue; }
      if (!Array.isArray(e) || (e.length != 2 && e.length != 4)) return false;
      if (!Number.isInteger(e[0]) || e[0] < 0 || e[0] > 7 || (e[1] !== 0 && e[1] !== 1) || (e[1] && KIND[i] != 'P')) return false;
      if (e.length == 4 && !(typeof e[2] == 'number' && typeof e[3] == 'number' && Math.abs(e[2]) < 60 && Math.abs(e[3]) < 60)) return false;
    }
    if (!Number.isInteger(st.h) || st.h < -1 || st.h > 6 || (st.h >= 0 && p.fix.includes(st.h))) return false;
    return true;
  }
  // does polygon pl (piece i) lie inside the silhouette without covering another piece?
  function fits(p, st, i, pl) {
    const sol = solPolys(p);
    if (sol.reduce((s, q) => s + shared(pl, q), 0) < area(pl) - EPS_A) return false;
    for (let j = 0; j < 7; j++) {
      if (j == i) continue;
      const q = piecePoly(p, st, j);
      if (q && shared(pl, q) > EPS_A) return false;
    }
    return true;
  }
  function solved(p, st) {
    const sol = solPolys(p), pls = [];
    for (let i = 0; i < 7; i++) { const q = piecePoly(p, st, i); if (!q) return false; pls.push(q); }
    for (let i = 0; i < 7; i++) for (let j = i + 1; j < 7; j++) if (shared(pls[i], pls[j]) > EPS_A) return false;
    return pls.every(pl => sol.reduce((s, q) => s + shared(pl, q), 0) >= area(pl) - EPS_A);
  }
  // corners a dropped piece may snap to: the silhouette's and the hidden solution's, and those of the other pieces on the board
  function corners(p, st, skip) {
    const out = [];
    const add = q => { if (!out.some(r => near(q, r))) out.push(q); };
    solPolys(p).forEach(pl => pl.forEach(add));
    for (let j = 0; j < 7; j++) if (j != skip) { const q = piecePoly(p, st, j); if (q) q.forEach(add); }
    return out;
  }
  // where piece i (turn k, flip f) lands when dropped at (x, y), tol in units: {x, y, snapped, ok}
  function snap(p, st, i, k, f, x, y, tol) {
    const t = KIND[i], pl = poly(t, k, f, x, y), C = corners(p, st, i), seen = [];
    let best = null;
    for (const v of pl) for (const c of C) {
      const dx = c[0] - v[0], dy = c[1] - v[1], d = Math.hypot(dx, dy);
      if (d > tol || seen.some(s => near(s, [dx, dy]))) continue;
      seen.push([dx, dy]);
      const q = pl.map(r => [r[0] + dx, r[1] + dy]);
      const hits = q.filter(r => C.some(c2 => near(r, c2))).length, ok = fits(p, st, i, q);
      const s = [ok ? 1 : 0, hits, -d];
      if (!best || s[0] > best.s[0] || (s[0] == best.s[0] && (s[1] > best.s[1] || (s[1] == best.s[1] && s[2] > best.s[2])))) best = { s, dx, dy, ok };
    }
    if (!best) return { x, y, snapped: false, ok: fits(p, st, i, pl) };
    return { x: x + best.dx, y: y + best.dy, snapped: true, ok: best.ok };
  }
  // a piece turned or flipped about its middle: the new x, y that keep the middle where it was
  function about(t, k, f, x, y, k2, f2) {
    const a = mid(poly(t, k, f, x, y)), b = mid(local(t, k2, f2));
    return [a[0] - b[0], a[1] - b[1]];
  }
  // which solution slots are filled by a piece of their own kind lying exactly there; and by which piece
  function filled(p, st) {
    const sol = solPolys(p), by = new Array(7).fill(-1), used = new Set();
    for (let s = 0; s < 7; s++) for (let j = 0; j < 7; j++) {
      if (used.has(j) || KIND[j] != KIND[s]) continue;
      const q = piecePoly(p, st, j);
      if (q && samePoly(q, sol[s])) { by[s] = j; used.add(j); break; }
    }
    return { by, used };
  }
  const HINT_ORDER = [0, 1, 2, 6, 5, 3, 4]; // big pieces first
  // the slot a hint is about and the piece that goes there: {s, i} or null when every slot is filled
  function hintTarget(p, st) {
    const { by, used } = filled(p, st);
    const inTray = j => st.pc[j] && st.pc[j].length == 2;
    const pieceFor = s => {
      const c = movable(p).filter(j => KIND[j] == KIND[s] && !used.has(j));
      return c.find(inTray) != null ? c.find(inTray) : c.length ? c[0] : -1;
    };
    if (st.h >= 0 && by[st.h] < 0 && pieceFor(st.h) >= 0) return { s: st.h, i: pieceFor(st.h) };
    const open = HINT_ORDER.filter(s => by[s] < 0 && pieceFor(s) >= 0);
    if (!open.length) return null;
    const s = open.find(x => inTray(pieceFor(x))) != null ? open.find(x => inTray(pieceFor(x))) : open[0];
    return { s, i: pieceFor(s) };
  }
  // a hint as a change of state (the screen shows it): {st, s, i, tier, back: pieces sent back to the tray} or null
  function hint(p, st, tier) {
    const tg = hintTarget(p, st);
    if (!tg) return null;
    const n = JSON.parse(JSON.stringify(st)), { s, i } = tg, sp = p.pcs[s], t = KIND[i], e = n.pc[i], back = [];
    n.h = s;
    if (tier == 2) {
      if (e.length == 2) n.pc[i] = [sp[0], sp[1]];
      else { const [x, y] = about(t, e[0], e[1], e[2], e[3], sp[0], sp[1]); n.pc[i] = [sp[0], sp[1], x, y]; }
    } else if (tier >= 3) {
      n.pc[i] = [sp[0], sp[1], num(sp[2]), num(sp[3])];
      n.h = -1;
      const slot = solPoly(p, s);
      for (const j of movable(p)) {
        if (j == i || n.pc[j].length != 4) continue;
        if (shared(slot, poly(KIND[j], n.pc[j][0], n.pc[j][1], n.pc[j][2], n.pc[j][3])) > EPS_A) { n.pc[j] = [n.pc[j][0], n.pc[j][1]]; back.push(j); }
      }
    }
    return { st: n, s, i, tier, back };
  }
  // the moves that win (tests and the smoke bot): every piece to its own slot, [i, k, f, x, y]
  const solve = p => movable(p).map(i => { const s = p.pcs[i]; return [i, s[0], s[1], num(s[2]), num(s[3])]; });

  return { H, KIND, SHAPE, AREA, COLOUR, PLAN, SAME, EPS_A, nameOf, pair, num, xrot, xflip, xlocal, xverts, xnorm, xmirror, local, poly, mid,
    area, shared, samePoly, outline, bank, pickIndex, make, solPoly, solPolys, movable, fresh, piecePoly, fit, fits, solved, corners, snap,
    about, filled, hintTarget, hint, solve, cur: null };
})();

/* ---------- the screen ---------- */
TG.mount = function (el, p, api) {
  const band = p.b || api.band, K = TG.KIND, mv = TG.movable(p), sol = TG.solPolys(p), timers = new Set();
  const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };
  let st = api.loadState();
  if (!TG.fit(p, st)) st = TG.fresh(p);
  let sel = -1, drag = null, done = false, msg = '', undo = [], z = mv.slice(), tip = -1;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const intro = `${p.say} ` + (band == 'A' || band == 'B' ? 'Drag each piece into its outline. Tap a piece, then tap it again to turn it.'
    : band == 'C' ? 'One piece is in already. Drag the others in. Tap a piece, then tap it again to turn it.'
      : 'Use all seven pieces. Drag them in. Tap a piece, then tap it again to turn it.');

  el.innerHTML = `<div class="tg tg-${band}"><div class="tg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'tg-spk' })}` +
    `<p class="tg-msg" aria-live="polite"></p></div><div class="tg-main"><svg class="tg-svg" role="img" aria-label="Tangram: ${esc(p.name)}"></svg></div>` +
    `<div class="tg-ctl">${UI.btn('Turn', { icon: 'rotate', cls: 'tg-turn' })}${UI.btn('Flip', { icon: 'flip', cls: 'tg-flip' })}` +
    `${UI.btn('Undo', { icon: 'undo', cls: 'tg-undo' })}</div></div>`;
  const root = el.querySelector('.tg'), svg = root.querySelector('.tg-svg'), main = root.querySelector('.tg-main');
  const say_ = root.querySelector('.tg-say'), ctl = root.querySelector('.tg-ctl'), msgEl = root.querySelector('.tg-msg');
  const bTurn = root.querySelector('.tg-turn'), bFlip = root.querySelector('.tg-flip'), bUndo = root.querySelector('.tg-undo');
  const side = document.createElement('div');
  side.className = 'tg-side';
  root.append(side);

  function tell(text, kind, speak) {
    msg = text;
    msgEl.textContent = text;
    msgEl.className = 'tg-msg' + (kind ? ' ' + kind : '');
    if (speak) api.say(text);
  }
  root.querySelector('.tg-spk').onclick = () => { try { say(msg); } catch (e) {} };

  /* ---------- svg layers ---------- */
  const mk = (tag, cls, parent) => { const e = document.createElementNS(SVGNS, tag); if (cls) e.setAttribute('class', cls); if (parent) parent.append(e); return e; };
  const clipId = 'tg-clip-' + Math.floor(Math.random() * 1e9);
  const defs = mk('defs', '', svg), clip = mk('clipPath', '', defs);
  clip.setAttribute('id', clipId);
  const clipPath = mk('path', '', clip);
  const gBoard = mk('rect', 'tg-board', svg), gTray = mk('rect', 'tg-tray', svg);
  const gSil = mk('g', 'tg-sil', svg);
  const silBase = mk('path', 'tg-sb', gSil), silLit = mk('path', 'tg-sl', gSil), silEdge = mk('path', 'tg-se', gSil);
  silLit.setAttribute('clip-path', `url(#${clipId})`);
  const gOl = mk('g', 'tg-ols', svg), hintEl = mk('polygon', 'tg-hl', svg);
  const gPcs = mk('g', 'tg-pcs', svg);
  const PE = [];
  for (let i = 0; i < 7; i++) {
    const g = mk('g', `tg-pc tg-c${i}${p.fix.includes(i) ? ' fixed' : ''}`, gPcs), a = mk('g', 'tg-pa', g);
    g.dataset.i = i;
    g.style.setProperty('--d', i * 60 + 'ms');
    PE.push({ g, sh: mk('polygon', 'tg-sh', a), ld: mk('polygon', 'tg-ld', a), bs: mk('polygon', 'tg-bs', a), hi: mk('path', 'tg-hi', a), rg: mk('polygon', 'tg-rg', a) });
  }

  /* ---------- layout: board (silhouette) and tray; portrait: talk line, svg, buttons; landscape: svg, then a side column ---------- */
  const sp = sol.flat(), minX = Math.min(...sp.map(q => q[0])), maxX = Math.max(...sp.map(q => q[0]));
  const minY = Math.min(...sp.map(q => q[1])), maxY = Math.max(...sp.map(q => q[1])), SW = maxX - minX, SH = maxY - minY;
  let W = 300, Hh = 300, u = 40, ox = 0, oy = 0, board = null, tray = null, ut = 20, cells = {}, lastW = 0, lastH = 0;
  function arrange(land) {
    if (land) { root.append(main, side); side.append(say_, ctl); } else root.append(say_, main, ctl);
    root.classList.toggle('land', land);
  }
  // the tray: the pieces in it, each in a cell the size of its box as it lies now (at least 56 px), packed in rows (shelf packing)
  // at the biggest tray scale that fits, never bigger than the board's, so the pieces grow as the tray empties
  const box = l => { const xs = l.map(q => q[0]), ys = l.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
  function packTray(s) { // {fits, cells} at tray scale s
    const out = {}, rows = [];
    let row = { w: 0, h: 0, items: [] };
    // P3-12: tallest first, so the rows waste less height (a phone tray with seven pieces got about a fifth bigger)
    const hOf = i => { const b = box(TG.local(K[i], st.pc[i][0], st.pc[i][1])); return b[3] - b[1]; };
    for (const i of mv.filter(j => st.pc[j].length == 2).sort((a, b) => hOf(b) - hOf(a) || a - b)) {
      const b = box(TG.local(K[i], st.pc[i][0], st.pc[i][1])), cw = Math.max(56, Math.ceil((b[2] - b[0]) * s + 14)), ch = Math.max(56, Math.ceil((b[3] - b[1]) * s + 14));
      if (row.items.length && row.w + cw > tray.w - 12) { rows.push(row); row = { w: 0, h: 0, items: [] }; }
      row.items.push([i, cw]);
      row.w += cw;
      row.h = Math.max(row.h, ch);
    }
    rows.push(row);
    const th = rows.reduce((a, r) => a + r.h, 0);
    let y = tray.y + (tray.h - th) / 2;
    for (const r of rows) {
      let x = tray.x + (tray.w - r.w) / 2;
      for (const [i, c] of r.items) { out[i] = { x, y, w: c, h: r.h, cx: x + c / 2, cy: y + r.h / 2 }; x += c; }
      y += r.h;
    }
    return { fits: th <= tray.h - 8 && rows.every(r => r.w <= tray.w - 12 + 1e-6), cells: out };
  }
  function packAll() {
    let lo = 4, hi = Math.max(4, u);
    if (packTray(hi).fits) lo = hi;
    else for (let it = 0; it < 16; it++) { const m = (lo + hi) / 2; if (packTray(m).fits) lo = m; else hi = m; }
    ut = lo;
    cells = packTray(ut).cells;
  }
  function layout() {
    if (!el.isConnected) return;
    const ps = getComputedStyle(el);
    const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
    const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
    lastW = el.clientWidth; lastH = el.clientHeight;
    const land = aw > ah * 1.15 && aw >= 640, gap = 10, few = mv.length <= 3;
    arrange(land);
    if (land) { W = Math.floor(aw - side.offsetWidth - 16); Hh = Math.floor(ah); }
    else { W = Math.floor(aw); Hh = Math.floor(ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap); }
    W = Math.max(240, W); Hh = Math.max(240, Hh);
    // the board takes the room the silhouette can use at the full width (or height); the tray gets the rest, but at least a share
    const pad = 14;
    if (land) {
      const need = Math.ceil(SW * (Hh - 2 * pad) / SH + 2 * pad), tw = Math.max(Math.round(W * (few ? 0.26 : 0.34)), W - gap - need);
      board = { x: 0, y: 0, w: W - tw - gap, h: Hh };
      tray = { x: W - tw, y: 0, w: tw, h: Hh };
    } else {
      const need = Math.ceil(SH * (W - 2 * pad) / SW + 2 * pad), th = Math.min(Math.round(Hh * 0.5), Math.max(Math.round(Hh * (few ? 0.26 : mv.length >= 6 ? 0.4 : 0.32)), Hh - gap - need));
      board = { x: 0, y: 0, w: W, h: Hh - th - gap };
      tray = { x: 0, y: Hh - th, w: W, h: th };
    }
    u = Math.min((board.w - 2 * pad) / SW, (board.h - 2 * pad) / SH, 96);
    ox = board.x + (board.w - SW * u) / 2 - minX * u;
    oy = board.y + (board.h - SH * u) / 2 - minY * u;
    svg.setAttribute('width', W);
    svg.setAttribute('height', Hh);
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    const rr = (e, r) => { e.setAttribute('x', r.x + 2); e.setAttribute('y', r.y + 2); e.setAttribute('width', r.w - 4); e.setAttribute('height', r.h - 4); e.setAttribute('rx', 20); };
    rr(gBoard, board);
    rr(gTray, tray);
    // the silhouette: one outline path; a lighter copy moved toward the bottom right, clipped to the shape, leaves a shadow along
    // the top-left inside edge
    const d = TG.outline(sol).map(l => 'M' + l.map(q => px(q).map(v => v.toFixed(1)).join(' ')).join('L') + 'Z').join('');
    silBase.setAttribute('d', d);
    silEdge.setAttribute('d', d);
    clipPath.setAttribute('d', d);
    silLit.setAttribute('d', d);
    silLit.setAttribute('transform', `translate(${Math.max(2, u * 0.06).toFixed(1)} ${Math.max(2, u * 0.08).toFixed(1)})`);
    gOl.innerHTML = '';
    if (p.ol) for (const i of mv) { const e = mk('polygon', 'tg-ol', gOl); e.setAttribute('points', pts(sol[i].map(px))); }
    draw();
  }
  const px = q => [ox + q[0] * u, oy + q[1] * u];
  const unit = (x, y) => [(x - ox) / u, (y - oy) / u];
  const pts = a => a.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');

  /* ---------- drawing ---------- */
  // the piece's corners in px: on the board, in its tray cell, or lifted under the finger (scale u, middle at the point)
  function shapePx(i) {
    const e = p.fix.includes(i) ? null : st.pc[i];
    if (drag && drag.i == i && drag.moved) {
      const l = TG.local(K[i], e[0], e[1]), c = TG.mid(l);
      return l.map(q => [drag.x + drag.gx + (q[0] - c[0]) * u, drag.y + drag.gy + (q[1] - c[1]) * u]);
    }
    const pl = TG.piecePoly(p, st, i);
    if (pl) return pl.map(px);
    const l = TG.local(K[i], e[0], e[1]), b = box(l), cell = cells[i], c = [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
    return l.map(q => [cell.cx + (q[0] - c[0]) * ut, cell.cy + (q[1] - c[1]) * ut]);
  }
  // the light edges: the sides whose outside faces up and to the left, drawn a little inside the piece
  function litPath(a) {
    const c = TG.mid(a), cw = a.reduce((s, q, i) => { const r = a[(i + 1) % a.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0) > 0;
    let d = '';
    for (let i = 0; i < a.length; i++) {
      const q = a[i], r = a[(i + 1) % a.length], ex = r[0] - q[0], ey = r[1] - q[1], L = Math.hypot(ex, ey);
      let nx = ey / L, ny = -ex / L; // outward normal for a clockwise (on screen) polygon
      if (!cw) { nx = -nx; ny = -ny; }
      if (nx + ny > -0.2) continue;
      const ins = 3.2, sh = (t, s) => [t[0] - nx * ins + (c[0] - t[0]) * s, t[1] - ny * ins + (c[1] - t[1]) * s];
      const A = sh(q, 0.12), B = sh(r, 0.12);
      d += `M${A[0].toFixed(1)} ${A[1].toFixed(1)}L${B[0].toFixed(1)} ${B[1].toFixed(1)}`;
    }
    return d;
  }
  function drawPiece(i, bad) {
    const E = PE[i], a = shapePx(i), lifted = drag && drag.i == i && drag.moved, inTray = !p.fix.includes(i) && st.pc[i].length == 2 && !lifted;
    const lw = Math.max(2, Math.min(5, (inTray ? ut : u) * 0.07));
    const P = pts(a);
    E.bs.setAttribute('points', P);
    E.rg.setAttribute('points', P);
    E.ld.setAttribute('points', pts(a.map(q => [q[0], q[1] + lw])));
    E.sh.setAttribute('points', pts(a.map(q => [q[0] + 7, q[1] + 10])));
    E.hi.setAttribute('d', litPath(a));
    E.g.classList.toggle('lift', !!lifted);
    E.g.classList.toggle('sel', i == sel);
    E.g.classList.toggle('bad', !!bad);
    E.g.classList.toggle('tip', i == tip);
    E.g.classList.toggle('intray', inTray);
  }
  function draw() {
    if (!board) return;
    packAll();
    const busy = drag && drag.moved;
    for (let i = 0; i < 7; i++) {
      let bad = false;
      if (!busy && !done && !p.fix.includes(i)) { const pl = TG.piecePoly(p, st, i); bad = !!pl && !TG.fits(p, st, i, pl); }
      drawPiece(i, bad);
    }
    // stacking: pieces placed for you at the bottom, then the order the child moved them, the piece in the hand on top
    for (const i of p.fix) gPcs.append(PE[i].g);
    for (const i of z) gPcs.append(PE[i].g);
    if (sel >= 0 && !p.fix.includes(sel)) gPcs.append(PE[sel].g);
    if (drag && drag.moved) gPcs.append(PE[drag.i].g);
    if (st.h >= 0 && !done) { hintEl.setAttribute('points', pts(sol[st.h].map(px))); hintEl.style.display = ''; }
    else hintEl.style.display = 'none';
    const s = sel >= 0 ? sel : -1;
    bTurn.disabled = s < 0 || done;
    bFlip.hidden = !(s >= 0 && K[s] == 'P');
    bUndo.disabled = !undo.length || done;
  }

  /* ---------- moves ---------- */
  const store = () => api.saveState(st);
  const remember = () => { undo.push(JSON.stringify(st)); if (undo.length > 40) undo.shift(); };
  const toTop = i => { z = z.filter(j => j != i); z.push(i); };
  const tolU = () => Math.min(30, Math.max(16, 0.45 * u)) / u;
  function after(i, res) {
    tip = -1;
    if (TG.solved(p, st)) return finish();
    if (res && st.pc[i].length == 4) {
      if (!res.ok) tell(`The ${TG.COLOUR[i]} ${TG.nameOf(K[i], band)} sticks out or lies on another piece. Move it or turn it.`, 'try');
      else if (res.snapped) { api.sfx.pop(2); tell(msgAfter(), ''); }
      else tell('Drop it closer to a corner and it will click into place.', '');
    }
  }
  function msgAfter() {
    const left = mv.filter(j => st.pc[j].length == 2).length;
    return left ? `Good! ${left} more ${left == 1 ? 'piece' : 'pieces'} to go.` : 'All the pieces are out. Fix the ones that do not fit.';
  }
  function place(i, k, f, x, y) {
    const r = TG.snap(p, st, i, k, f, x, y, tolU());
    st.pc[i] = [k, f, r.x, r.y];
    if (st.h >= 0 && TG.filled(p, st).by[st.h] >= 0) st.h = -1;
    toTop(i);
    return r;
  }
  function turn(i, flip) {
    if (done || i < 0 || p.fix.includes(i)) return;
    if (flip && K[i] != 'P') return;
    remember();
    const e = st.pc[i], k2 = flip ? e[0] : (e[0] + 1) % 8, f2 = flip ? 1 - e[1] : e[1];
    api.sfx.click();
    let r = null;
    if (e.length == 2) st.pc[i] = [k2, f2];
    else { const [x, y] = TG.about(K[i], e[0], e[1], e[2], e[3], k2, f2); r = place(i, k2, f2, x, y); }
    sel = i;
    if (!r) tell(flip ? 'Flipped over.' : 'Turned. Tap again to keep turning.', '');
    after(i, r);
    store();
    draw();
  }
  function moveTo(i, cx, cy) { // the piece's middle to (cx, cy) in px
    if (done) return;
    remember();
    const e = st.pc[i], l = TG.local(K[i], e[0], e[1]), c = TG.mid(l);
    const qx = Math.max(board.x + 4, Math.min(board.x + board.w - 4, cx)), qy = Math.max(board.y + 4, Math.min(board.y + board.h - 4, cy));
    const [ux, uy] = unit(qx, qy);
    const r = place(i, e[0], e[1], ux - c[0], uy - c[1]);
    after(i, r);
    store();
  }
  function toTray(i) {
    remember();
    st.pc[i] = [st.pc[i][0], st.pc[i][1]];
    tell('Back in the tray.', '');
    store();
  }
  function finish() {
    done = true;
    sel = -1;
    st.h = -1;
    root.classList.add('won');
    api.sfx.chime();
    tell(`You made the ${p.name.toLowerCase()}!`, 'good', true);
    store();
    draw();
    api.win({ mistakes: 0 });
  }

  /* ---------- pointer input ---------- */
  function hit(x, y) {
    const order = z.slice().reverse();
    if (sel >= 0 && !p.fix.includes(sel)) order.unshift(sel);
    for (const i of order) { // board pieces first, the top one first; a margin around each makes small pieces easy to catch
      const pl = TG.piecePoly(p, st, i);
      if (!pl) continue;
      const a = pl.map(px);
      if (inside(a, x, y) || edgeDist(a, x, y) <= 12) return i;
    }
    for (const i of mv) { const c = cells[i]; if (c && st.pc[i].length == 2 && x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) return i; }
    return -1;
  }
  function inside(a, x, y) {
    let r = false;
    for (let i = 0, j = a.length - 1; i < a.length; j = i++) {
      if ((a[i][1] > y) != (a[j][1] > y) && x < (a[j][0] - a[i][0]) * (y - a[i][1]) / (a[j][1] - a[i][1]) + a[i][0]) r = !r;
    }
    return r;
  }
  function edgeDist(a, x, y) {
    let m = 1e9;
    for (let i = 0; i < a.length; i++) {
      const q = a[i], r = a[(i + 1) % a.length], dx = r[0] - q[0], dy = r[1] - q[1];
      const t = Math.max(0, Math.min(1, ((x - q[0]) * dx + (y - q[1]) * dy) / (dx * dx + dy * dy)));
      m = Math.min(m, Math.hypot(x - q[0] - t * dx, y - q[1] - t * dy));
    }
    return m;
  }
  const pos = e => { const r = svg.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const inRect = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  svg.addEventListener('pointerdown', e => {
    if (done || drag) return;
    e.preventDefault();
    try { svg.setPointerCapture(e.pointerId); } catch (er) {}
    const [x, y] = pos(e), i = hit(x, y);
    let gx = 0, gy = 0;
    if (i >= 0) {
      const pl = TG.piecePoly(p, st, i);
      if (pl) { const c = px(TG.mid(pl)); gx = c[0] - x; gy = c[1] - y; }
    }
    drag = { id: e.pointerId, i, sx: x, sy: y, x, y, gx, gy, moved: false };
  });
  svg.addEventListener('pointermove', e => {
    if (!drag || e.pointerId != drag.id) return;
    const [x, y] = pos(e);
    drag.x = x; drag.y = y;
    if (!drag.moved && Math.hypot(x - drag.sx, y - drag.sy) > 7 && drag.i >= 0) {
      drag.moved = true;
      sel = drag.i;
      tip = -1;
      api.sfx.click();
    }
    if (drag.moved) { drawPiece(drag.i, false); gPcs.append(PE[drag.i].g); }
  });
  const up = e => {
    if (!drag || e.pointerId != drag.id) return;
    const d = drag, [x, y] = pos(e);
    drag = null;
    if (e.type == 'pointercancel') { draw(); return; }
    if (d.moved) {
      if (inRect(tray, x, y) && !inRect(board, x, y)) toTray(d.i);
      else moveTo(d.i, x + d.gx, y + d.gy);
    } else if (d.i >= 0) {
      if (sel == d.i) return turn(d.i, false);
      sel = d.i;
      api.sfx.click();
      tell(`The ${TG.COLOUR[d.i]} ${TG.nameOf(K[d.i], band)}. Drag it, tap it again to turn it, or tap where it should go.`, '');
    } else if (sel >= 0 && inRect(board, x, y)) moveTo(sel, x, y);
    else sel = -1;
    draw();
  };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  bTurn.onclick = () => turn(sel, false);
  bFlip.onclick = () => turn(sel, true);
  bUndo.onclick = () => {
    if (!undo.length || done) return;
    st = JSON.parse(undo.pop());
    api.sfx.del();
    tell('Undone.', '');
    store();
    draw();
  };
  const keyd = e => {
    if (!svg.isConnected || $('.ovl') || done || /^(INPUT|TEXTAREA)$/.test((e.target && e.target.tagName) || '')) return;
    const k = (e.key || '').toLowerCase();
    if (k == 'r') turn(sel, false);
    else if (k == 'f') turn(sel, true);
    else if (k == 'u') bUndo.onclick();
  };
  document.addEventListener('keydown', keyd);
  let rz = 0;
  const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
  window.addEventListener('resize', onResize);

  /* ---------- hints ---------- */
  function hintNow(tier) {
    if (done) return false;
    const h = TG.hint(p, st, tier);
    if (!h) return false;
    remember();
    st = h.st;
    const nm = `${TG.COLOUR[h.i]} ${TG.nameOf(K[h.i], band)}`;
    if (tier == 1) {
      sel = h.i; tip = h.i;
      tell(`See the yellow outline? The ${nm} goes there.`, 'hint', true);
    } else if (tier == 2) {
      sel = h.i; tip = h.i;
      tell(`The ${nm} is turned the right way now. Drag it into the yellow outline.`, 'hint', true);
    } else {
      sel = -1; tip = -1;
      toTop(h.i);
      tell(`Here is where the ${nm} goes.` + (h.back.length ? ' A piece in its way went back to the tray.' : ''), 'hint', true);
      if (TG.solved(p, st)) { store(); finish(); return true; }
    }
    store();
    draw();
    return true;
  }

  /* ---------- start ---------- */
  const fresh_ = mv.every(i => st.pc[i].length == 2);
  tell(fresh_ ? intro : 'Keep going! Drag the pieces into the shape.', '', fresh_ && (band == 'A' || band == 'B')); // R-01b: band B speaks its first instruction too
  layout();
  later(layout, 60); // the stage can still be settling (fonts, the frame's top bar): look again once
  const inst = {
    hint: hintNow,
    destroy() {
      timers.forEach(clearTimeout);
      timers.clear();
      clearTimeout(rz);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', keyd);
      if (TG.cur && TG.cur.inst === inst) TG.cur = null;
    },
  };
  // for the smoke bot and the screenshots: where things are on the page
  TG.cur = {
    inst, p, st: () => st, sel: () => sel, u: () => u, ut: () => ut,
    page(q) { const r = svg.getBoundingClientRect(), a = px(q); return { x: r.left + a[0], y: r.top + a[1] }; },
    // the middle of piece i on the page: its tray cell, or its middle on the board
    at(i) {
      const r = svg.getBoundingClientRect(), pl = TG.piecePoly(p, st, i);
      if (pl) { const a = px(TG.mid(pl)); return { x: r.left + a[0], y: r.top + a[1] }; }
      return { x: r.left + cells[i].cx, y: r.top + cells[i].cy };
    },
    cell: i => cells[i] && { w: cells[i].w, h: cells[i].h },
    box: i => { const a = shapePx(i), xs = a.map(q => q[0]), ys = a.map(q => q[1]); return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) }; },
  };
  return inst;
};

BT.reg({
  id: 'tangram', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => TG.make(band, level, rnd),
  mount: (el, p, api) => TG.mount(el, p, api),
  solve: p => TG.solve(p),
});
/* ---------- Brain Teasers: Riddles (P3-14; BRAIN_TEASERS.md 5.9, 7) ----------
   One registered type, `riddle`. The bank is RIDDLES in src/data/d-riddles.js (A11: read only inside functions), 36 riddles per band,
   easiest first. A puzzle is 3 riddles: level L plays bank riddles 3(L-1) to 3L-1, so the band's whole set is used before any riddle
   comes back (Endless replays levels 9-12, as the framework does). The seeded rnd shuffles the choices.
     A (PK-K)  "Who am I?" with 3 picture choices (picFor); the riddle is read aloud by itself, nothing needs reading
     B (1-2)   simple riddles, 4 choices, each a picture with its word
     C (3-4)   wordplay, 4 word choices          D (5-6)  lateral thinking and number riddles, 4 choices
   Every riddle has one clear answer; the wrong choices are not also fair answers (tools/test.js checks what it can: the answer is not
   in the riddle or its hints, choices are all different, reading length per band, BAD, pictures allow-listed).
   Play: tap a choice. A wrong choice turns amber, stays out and counts one mistake (allow 1: one slip still earns 3 stars); the line
   under the riddle says so gently. The right one turns green, the line says the answer, and the next riddle comes after a moment.
   Hints (per riddle; the frame counts the tiers): 1 a nudge, 2 a strong clue (both shown in the yellow hint line and spoken),
   3 takes away the wrong choices but one. After that the riddle has no more hints (hint() returns false).
   State (api.saveState): {i riddle, miss, h hint tier of this riddle, x wrong taps, g choices a hint took away}; RDL.fit rejects a
   state that does not belong to the puzzle (it then starts fresh). */
const RDL = (() => {
  const N = 3, NCH = { A: 3, B: 4, C: 4, D: 4 };
  const THE = ['sun', 'moon'], NONE = ['cheese', 'bread', 'milk'];
  const pic = w => picFor(w, (RIDDLES.pics || {})[w] || '');
  const nameOf = w => (RIDDLES.names || {})[w] || w;
  const art = w => THE.includes(w) ? 'the ' : NONE.includes(w) ? '' : /^[aeiou]/.test(nameOf(w)) ? 'an ' : 'a ';
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  // the answer said in words: "a cow", "an egg", "the sun", "a piano", "63"
  const said = (p, c) => p.pic ? (c == 'dice' ? 'a die' : art(c) + nameOf(c)) : c; // W41: one of them is "a die"
  const ASK = { A: 'Listen to the riddle. Tap the answer.', B: 'Read the riddle. Tap the answer.' };

  function shuffle(a, rnd) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // level L of a band: its three bank riddles, each with its choices shuffled
  function make(band, level, rnd) {
    const bank = RIDDLES[band], L = Math.max(1, Math.min(12, level | 0 || 1)), items = [];
    for (let j = 0; j < N; j++) {
      const k = (N * (L - 1) + j) % bank.length, r = bank[k];
      const ch = shuffle([r.a].concat(r.d.slice(0, NCH[band] - 1)), rnd);
      items.push({ k, q: r.q, ch, a: ch.indexOf(r.a), h: r.h.slice(0, 2) });
    }
    return { band, pic: band == 'A' || band == 'B', items };
  }
  const solve = p => p.items.map(it => it.a);

  const fresh = () => ({ i: 0, miss: 0, h: 0, x: [], g: [] });
  // does a saved state belong to this puzzle?
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const n = p.items.length, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(s.i, 0, n - 1) || !int(s.miss, 0, 999) || !int(s.h, 0, 3)) return false;
    if (!Array.isArray(s.x) || !Array.isArray(s.g)) return false;
    const it = p.items[s.i], all = s.x.concat(s.g);
    if (!all.every(c => int(c, 0, it.ch.length - 1) && c !== it.a) || new Set(all).size !== all.length) return false;
    if (s.g.length && s.h < 3) return false; // only hint 3 takes choices away
    return all.length <= it.ch.length - 1;
  }
  // hint tier t (1-3) of item it in state s: {text} for tiers 1 and 2, {take: [choice indexes]} for tier 3
  function hintFor(it, s, t) {
    if (t < 3) return { text: it.h[t - 1] };
    const left = it.ch.map((_, c) => c).filter(c => c !== it.a && !s.x.includes(c) && !s.g.includes(c));
    return { take: left.slice(0, Math.max(0, left.length - 1)) };
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let busy = 0, alive = true;
    const band = api.band || p.band;
    const face = c => p.pic ? `<span class="rd-pic">${pic(c)}</span>${band == 'B' ? `<span class="rd-w">${esc(nameOf(c))}</span>` : ''}` : `<span class="rd-t">${esc(c)}</span>`;
    function draw() {
      const it = p.items[st.i];
      const dots = p.items.map((_, i) => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        return `<button class="choice rd-ch${p.pic ? ' pic' : ''}${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${esc(p.pic ? nameOf(c) : c)}"` +
          `${x || g ? ' disabled' : ''}>${face(c)}</button>`;
      }).join('');
      const tip = st.h && st.h < 3 ? it.h[st.h - 1] : '';
      el.innerHTML = `<div class="rd rd-${band}"><div class="rd-card"><span class="rd-badge" aria-hidden="true">${ico('question', 30)}</span>` +
        `<div class="rd-body"><span class="rd-dots" role="img" aria-label="Riddle ${st.i + 1} of ${p.items.length}">${dots}</span>` +
        `<p class="rd-q">${esc(it.q)}</p></div>${UI.ibtn('speak', 'Hear the riddle', { size: 'sm', cls: 'rd-say' })}</div>` +
        `<p class="rd-tip" role="status"${tip ? '' : ' hidden'}>${ico('hint', 24)}<span>${esc(tip)}</span></p>` +
        `<p class="rd-msg" role="status" aria-live="polite"></p>` +
        `<div class="rd-chs n${it.ch.length}">${chs}</div></div>`;
      el.querySelector('.rd-say').onclick = () => api.say(it.q);
      el.querySelectorAll('.rd-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
      if (band == 'A' || (band == 'B' && st.i == 0 && !st.miss && !st.x.length)) api.say(it.q); // R-01b: band B speaks its first instruction too (the first riddle)
    }
    const msg = (t, cls) => { const m = el.querySelector('.rd-msg'); if (m) { m.textContent = t; m.className = 'rd-msg' + (cls ? ' ' + cls : ''); } };
    function tap(i, b) {
      const it = p.items[st.i];
      if (busy || !alive || st.x.includes(i) || st.g.includes(i)) return;
      if (i !== it.a) {
        st.miss++;
        st.x.push(i);
        api.saveState(st);
        b.classList.add('wrong');
        b.disabled = true;
        api.sfx.wrong();
        msg(st.x.length == 1 ? 'Not that one. Think again!' : 'Not that one either. You can do it!', 'try');
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.rd-ch').forEach(x => { x.disabled = true; });
      const w = 'Yes! ' + cap(said(p, it.ch[it.a])) + '.';
      msg(w, 'good');
      api.sfx.right(st.i + 3);
      if (band == 'A' || band == 'B') api.say(w);
      const last = st.i == p.items.length - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) {
        api.win({ mistakes: st.miss, note: p.items.map((t, n) => `Riddle ${n + 1}: ${said(p, t.ch[t.a])}`) });
        return;
      }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) draw(); }, 1300);
    }
    draw();
    if (ASK[band] && st.i == 0 && !st.miss && !st.h) msg(ASK[band]);
    return {
      hint() {
        if (busy || st.i >= p.items.length || st.h >= 3) return false;
        const it = p.items[st.i], t = st.h + 1, r = hintFor(it, st, t);
        if (t < 3) {
          st.h = t;
          api.saveState(st);
          const tip = el.querySelector('.rd-tip');
          tip.querySelector('span').textContent = r.text;
          tip.hidden = false;
          api.say(r.text);
          return true;
        }
        if (!r.take.length) return false;
        st.h = 3;
        st.g.push(...r.take);
        api.saveState(st);
        r.take.forEach(c => { const b = el.querySelector(`.rd-ch[data-c="${c}"]`); b.classList.add('off'); b.disabled = true; });
        el.querySelector('.rd-tip').hidden = true;
        msg('Just two left. Which one is it?', '');
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); },
    };
  }

  return { make, solve, mount, fit, fresh, hintFor, said, nameOf, NCH };
})();

BT.reg({
  id: 'riddle', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: RDL.make, mount: RDL.mount, solve: RDL.solve,
});
/* ---------- Brain Teasers: Robot Path (P3-13; BRAIN_TEASERS.md 5.8, 7, 8) ----------
   Build a program of blocks, press Go, watch the robot run it step by step. A bump or a stop before the flag is a failed run (one
   mistake; the type allows 3): the robot wobbles, the block that went wrong turns amber, and the child edits.

   Bands and blocks (RB.KIT):
     A  4x4, no walls; arrows up, down, left, right (icons only; tapping a block says its name). Shortest route 3, 4, 5 steps
        (levels 1-4, 5-8, 9-12); from level 7 a gem to pick up on the way. Slots: par + 2.
     B  5x5 with walls; the same arrows (icon and word). Shortest route 6-10 (RB.STEPS); a gem from level 7, two from level 10.
        Slots: par + 3.
     C  6x6 corridor; forward, turn left, turn right, repeat N [ ] (N 2-9, loops nest two deep). Slots: par + 2.
     D  8x8 corridor; as C plus, by level, "repeat until wall" (levels 1-9) or one function (levels 10-12: a second strip of up to 4
        forward and turn blocks, called by the Function block). Slots: par + 1, so a loop (or the function) is needed.
   Worlds: A and B are made here (RB.makeAB): A picks a start and a goal (and a gem) at the right distance; B walks a random path that
   never touches itself, walls every cell off it, then opens walls in random order as long as the shortest route stays as long as the
   walk (a BFS over (cell, gems held) after each one). par = that BFS. C and D come from the bank PUZ.robot (src/data/d-puz-robot.js,
   made and proven by tools/puzzles/robot.js: the exact shortest program is a search too heavy for a tablet). Level L uses bank worlds
   3(L-1)..3L-1 of RB.order(band) (band C: sorted by par, R-01b); the seeded rnd picks one and one of the 8 turns and mirrors (a
   mirror swaps turn left and turn right in the program).

   Puzzle (JSON): {b band, n, w: cells ('.' open, '#' wall, reading order), s start, d facing (0 up 1 right 2 down 3 left), g goal,
     gems: [cells], par, slots, kit: 'abs' (A, B) | '' (C) | 'u' | 'f', ref: {m, f} a shortest program (the BFS route in A and B,
     the bank's intended program in C and D), k bank index or -1, x symmetry 0-7}.
   Programs are flat token lists: up dn lf rt (arrows), fw tl tr, r2..r9 (repeat N, opens a loop), uw (repeat until wall, opens a
     loop), en (ends the innermost loop), fn (call the function). {m: main, f: function}. Blocks counted: every token but en.
   Running (RB.run): the robot stops with a win the moment it reaches the flag holding every gem; a move into a wall or off the
     board is a bump; "repeat until wall" runs its body while the cell ahead is open (40 times at most, then "dizzy"); empty loops
     do nothing; 1,000 steps at most. Otherwise the program ends: short of the flag, or on it without every gem.
   State (api.saveState after every edit and run): {m, f, cs: the strip with the cursor ('m' or 'f'), ci: the cursor (a new block
     goes in there), miss: failed runs, runs, h: undo snapshots [[m, f, cs, ci], ...]}. RB.fit rejects a state that does not fit.
   Editing: tap a palette block to put it in at the cursor (a loop comes with its end; the cursor goes inside, and Repeat asks
     how many times). Tap a placed block to take it away (a loop's head takes the loop away and keeps its blocks; Repeat's head
     opens the number picker, with a Take away key). Tap the end of a loop, or an empty slot, to move the cursor after it. Undo.
   Hints (5.8 tiers; RB.diverge): A, B: the first block that bumps or does not bring the robot one step nearer the flag (BFS);
     C, D: the first block that differs from the reference program (a repeat count the child chose is kept when the program
     still works with it). 1) that block (or the empty slot) glows star yellow and the line says what is wrong; 2) the right
     block shows faintly in its place; 3) the right block is put there (RB.applyHint). A program that already works gets "Press Go".
   Stars: 3 = no hint, at most 3 failed runs and a program of at most par blocks; a longer program wins with 2 stars at most (it
     reports allow + 1 mistakes to the frame).
   Look: one SVG board (tray, floor tiles, stone wall blocks with a shade and a highlight, light from the top left), a drawn robot
     that glides (transform only) and shows where it faces with an orange pointer; reduced motion: short steps without gliding. */
const RB = {
  DX: [0, 1, 0, -1], DY: [-1, 0, 1, 0],
  ABS: { up: 0, rt: 1, dn: 2, lf: 3 },
  STEPS: { A: [3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5], B: [6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10] },
  SIZE: { A: 4, B: 5, C: 6, D: 8 },
  EXTRA: { A: 2, B: 3, C: 2, D: 1 }, // slots = par + EXTRA (5.8: C intended + 2, D tight)
  UW_CAP: 40, MAX_STEPS: 1000, FN_MAX: 4, HIST: 40, ALLOW: 3, // ALLOW: the same as allow of robot in BT.CAT (74-teasers.js)
  WORD: { up: 'Up', dn: 'Down', lf: 'Left', rt: 'Right', fw: 'Forward', tl: 'Turn left', tr: 'Turn right', rep: 'Repeat',
    uw: 'Until wall', fn: 'Function', en: 'End' },
  cur: null, // the puzzle on screen, for the smoke bot: {p, st(), busy(), inst}

  /* ---------- programs ---------- */
  isLoop: t => /^r[2-9]$/.test(t) || t == 'uw',
  isMove: t => t == 'fw' || t in RB.ABS,
  count(prog) { return [...prog.m, ...(prog.f || [])].filter(t => t != 'en').length; },
  // the tokens a kit allows in the main strip
  kitTokens(kit) {
    if (kit == 'abs') return ['up', 'dn', 'lf', 'rt'];
    const t = ['fw', 'tl', 'tr', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'en'];
    if (kit == 'u') t.push('uw');
    if (kit == 'f') t.push('fn');
    return t;
  },
  // tokens -> tree [{t, i} | {loop: N (0 = until wall), i, e, b: [...]}], or null when unbalanced
  parse(tokens) {
    const root = [], stack = [root], open = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (RB.isLoop(t)) {
        const node = { loop: t == 'uw' ? 0 : +t[1], i, e: -1, b: [] };
        stack[stack.length - 1].push(node);
        stack.push(node.b);
        open.push(node);
      } else if (t == 'en') {
        if (stack.length < 2) return null;
        stack.pop();
        open.pop().e = i;
      } else stack[stack.length - 1].push({ t, i });
    }
    return stack.length == 1 ? root : null;
  },
  // index of the end of the loop opened at i (or of the head of the loop ended at i)
  match(tokens, i) {
    let k = 0;
    if (tokens[i] == 'en') {
      for (let j = i; j >= 0; j--) { if (tokens[j] == 'en') k++; else if (RB.isLoop(tokens[j]) && --k == 0) return j; }
    } else {
      for (let j = i; j < tokens.length; j++) { if (RB.isLoop(tokens[j])) k++; else if (tokens[j] == 'en' && --k == 0) return j; }
    }
    return -1;
  },
  // loops open just before position pos (the depth a block put there would have)
  depthAt(tokens, pos) {
    let k = 0;
    for (let j = 0; j < pos && j < tokens.length; j++) { if (RB.isLoop(tokens[j])) k++; else if (tokens[j] == 'en') k--; }
    return k;
  },
  maxDepth(tokens) {
    let k = 0, m = 0;
    for (const t of tokens) { if (RB.isLoop(t)) m = Math.max(m, ++k); else if (t == 'en') k--; }
    return m;
  },

  /* ---------- the world ---------- */
  front(p, c, d) {
    const n = p.n, x = c % n + RB.DX[d], y = Math.floor(c / n) + RB.DY[d];
    if (x < 0 || y < 0 || x >= n || y >= n) return -1;
    const k = y * n + x;
    return p.w[k] == '.' ? k : -1;
  },
  /* Run a program. -> {steps: [{s ('m' | 'f'), i (token), call (main index of the function call, or -1), L: [[s, i] of the loops
     around], c, d, g (gems held, bits), e: 'go' | 'turn' | 'gem' | 'bump' | 'win'}], out: 'win' | 'bump' | 'short' | 'gems' |
     'dizzy' | 'empty', at: {s, i, call} the block that went wrong (bump, dizzy) or null, c, d, g} */
  run(p, prog) {
    const gems = p.gems || [], full = (1 << gems.length) - 1, abs = p.kit == 'abs';
    const st = { c: p.s, d: p.d, g: 0, steps: [], out: null, at: null };
    const fnTree = RB.parse(prog.f || []) || [];
    if (!RB.count(prog)) return Object.assign(st, { out: 'empty' });
    const exec = (seq, s, call, L) => {
      for (const node of seq) {
        if (st.out) return;
        if (node.t == 'fn') { if (s == 'm') exec(fnTree, 'f', node.i, L.concat([[s, node.i]])); continue; }
        if (node.t) {
          if (st.steps.length >= RB.MAX_STEPS) { st.out = 'dizzy'; st.at = { s, i: node.i, call }; return; }
          let e = 'turn';
          if (node.t == 'tl') st.d = (st.d + 3) % 4;
          else if (node.t == 'tr') st.d = (st.d + 1) % 4;
          else {
            if (abs) st.d = RB.ABS[node.t];
            const k = RB.front(p, st.c, st.d);
            if (k < 0) {
              st.steps.push({ s, i: node.i, call, L, c: st.c, d: st.d, g: st.g, e: 'bump' });
              st.out = 'bump';
              st.at = { s, i: node.i, call };
              return;
            }
            st.c = k;
            e = 'go';
            const gi = gems.indexOf(k);
            if (gi >= 0 && !(st.g >> gi & 1)) { st.g |= 1 << gi; e = 'gem'; }
            if (k == p.g && st.g == full) { e = 'win'; st.out = 'win'; }
          }
          st.steps.push({ s, i: node.i, call, L, c: st.c, d: st.d, g: st.g, e });
        } else if (node.loop) {
          for (let k = 0; k < node.loop && !st.out; k++) exec(node.b, s, call, L.concat([[s, node.i]]));
        } else if (node.b.length) {
          for (let k = 0; !st.out && RB.front(p, st.c, st.d) >= 0; k++) {
            if (k >= RB.UW_CAP) { st.out = 'dizzy'; st.at = { s, i: node.i, call }; return; }
            exec(node.b, s, call, L.concat([[s, node.i]]));
          }
        }
      }
    };
    exec(RB.parse(prog.m) || [], 'm', -1, []);
    if (!st.out) st.out = st.c == p.g ? 'gems' : 'short';
    return st;
  },
  // A, B: the shortest route (arrow tokens) from cell c holding gems m to the flag with every gem, or null. BFS over (cell, gems).
  route(p, c = p.s, m = 0) {
    const gems = p.gems || [], M = 1 << gems.length, full = M - 1, N = p.n * p.n;
    const prev = new Int32Array(N * M).fill(-2), mv = new Int8Array(N * M), q = [c * M + m];
    prev[q[0]] = -1;
    const DIR = ['up', 'rt', 'dn', 'lf'];
    for (let h = 0; h < q.length; h++) {
      const x = q[h], cc = Math.floor(x / M), mm = x % M;
      if (cc == p.g && mm == full) {
        const out = [];
        for (let y = x; prev[y] >= 0; y = prev[y]) out.unshift(DIR[mv[y]]);
        return out;
      }
      for (let d = 0; d < 4; d++) {
        const k = RB.front(p, cc, d);
        if (k < 0) continue;
        const gi = gems.indexOf(k), nm = gi >= 0 ? mm | 1 << gi : mm, y = k * M + nm;
        if (prev[y] != -2) continue;
        prev[y] = x;
        mv[y] = d;
        q.push(y);
      }
    }
    return null;
  },

  /* ---------- making worlds ---------- */
  // Bands A and B. rnd: the seeded stream from the frame.
  makeAB(band, level, rnd) {
    const n = RB.SIZE[band], T = RB.STEPS[band][Math.max(1, Math.min(12, level)) - 1], N = n * n;
    const ri = k => Math.floor(rnd() * k), md = (a, b) => Math.abs(a % n - b % n) + Math.abs(Math.floor(a / n) - Math.floor(b / n));
    const ng = band == 'A' ? (level >= 7 ? 1 : 0) : level >= 10 ? 2 : level >= 7 ? 1 : 0;
    const base = { b: band, n, d: ri(4), kit: 'abs', k: -1, x: 0 };
    if (band == 'A') {
      for (let t = 0; t < 200; t++) {
        const s = ri(N), g = ri(N);
        if (!ng) { if (md(s, g) != T) continue; return RB.finish(Object.assign(base, { w: '.'.repeat(N), s, g, gems: [] })); }
        const gm = ri(N);
        if (gm == s || gm == g || s == g || md(s, gm) + md(gm, g) != T || md(s, g) > T - 2) continue;
        return RB.finish(Object.assign(base, { w: '.'.repeat(N), s, g, gems: [gm] }));
      }
      throw new Error('robot: no A world');
    }
    // B: a path that never touches itself (no shortcut), walls everywhere else, then walls opened while the route keeps its length
    for (let t = 0; t < 400; t++) {
      const path = [ri(N)];
      for (let k = 0; k < T && path.length; k++) {
        const c = path[path.length - 1], opts = [];
        for (let d = 0; d < 4; d++) {
          const x = c % n + RB.DX[d], y = Math.floor(c / n) + RB.DY[d], q = y * n + x;
          if (x < 0 || y < 0 || x >= n || y >= n || path.includes(q)) continue;
          // q may touch only c among the path cells
          let ok = true;
          for (let e = 0; e < 4 && ok; e++) {
            const xx = x + RB.DX[e], yy = y + RB.DY[e];
            if (xx >= 0 && yy >= 0 && xx < n && yy < n && yy * n + xx != c && path.includes(yy * n + xx)) ok = false;
          }
          if (ok) opts.push(q);
        }
        if (!opts.length) break;
        path.push(opts[ri(opts.length)]);
      }
      if (path.length != T + 1) continue;
      const w = Array(N).fill('#');
      path.forEach(c => { w[c] = '.'; });
      const gems = [];
      if (ng == 1) gems.push(path[2 + ri(T - 3)]);
      if (ng == 2) gems.push(path[1 + ri(Math.floor(T / 2) - 1)], path[Math.floor(T / 2) + 1 + ri(T - Math.floor(T / 2) - 2)]);
      const p = Object.assign({}, base, { s: path[0], g: path[T], gems });
      const off = [];
      for (let c = 0; c < N; c++) if (w[c] == '#') off.push(c);
      for (let i = off.length - 1; i > 0; i--) { const j = ri(i + 1); [off[i], off[j]] = [off[j], off[i]]; }
      const keep = Math.max(4, Math.round(off.length * (0.6 - level * 0.01))); // about half of the cells off the path stay walls
      let walls = off.length;
      for (const c of off) {
        if (walls <= keep) break;
        w[c] = '.';
        p.w = w.join('');
        const r = RB.route(p);
        if (!r || r.length != T) w[c] = '#'; else walls--;
      }
      p.w = w.join('');
      const r = RB.route(p);
      if (!r || r.length != T) continue;
      return RB.finish(p);
    }
    throw new Error('robot: no B world');
  },
  finish(p) {
    p.ref = { m: RB.route(p), f: [] };
    p.par = p.ref.m.length;
    p.slots = p.par + RB.EXTRA[p.b];
    return p;
  },
  // Bands C and D: bank world k under symmetry x (0-3 quarter turns clockwise, +4 mirrored left-right)
  fromBank(band, k, x) {
    const L = (typeof PUZ != 'undefined' && PUZ.robot && PUZ.robot[band]) || [];
    const e = String(L[k] || '').split('|');
    if (e.length < 10) throw new Error('robot: no bank world ' + band + k);
    const n = +e[0], w0 = e[1], mir = x >= 4, rot = x % 4;
    const map = c => {
      let cx = c % n, cy = Math.floor(c / n);
      for (let i = 0; i < rot; i++) [cx, cy] = [n - 1 - cy, cx];
      if (mir) cx = n - 1 - cx;
      return cy * n + cx;
    };
    const w = Array(n * n);
    for (let c = 0; c < n * n; c++) w[map(c)] = w0[c];
    let d = (+e[3] + rot) % 4;
    if (mir) d = (4 - d) % 4;
    const flip = t => mir && t == 'tl' ? 'tr' : mir && t == 'tr' ? 'tl' : t;
    const toks = s => s ? s.split(' ').map(flip) : [];
    return { b: band, n, w: w.join(''), s: map(+e[2]), d, g: map(+e[4]), gems: [], par: +e[5], slots: +e[5] + RB.EXTRA[band], kit: e[6],
      ref: { m: toks(e[7]), f: toks(e[8]) }, k, x, tpl: e[9] };
  },
  // The bank worlds in level order. R-01b: band C takes them sorted by par (fewest blocks first; the sort is stable, so worlds of
  // the same par keep the bank's order), so the shortest program never gets shorter from one level to the next. In the bank
  // order it went 2, 3, 5, 5, 6, 4, 4, 6 ... (the nested loops of the "turn" and "ring" worlds are short programs); now 2-3, 3,
  // 4, 4, 5, 5, 5-6, 6, 6, 7, 7, 7. Band D keeps the bank's order (its pars already never drop).
  order(band) {
    const L = (typeof PUZ != 'undefined' && PUZ.robot && PUZ.robot[band]) || [];
    const idx = L.map((_, i) => i);
    if (band != 'C') return idx;
    const par = i => +String(L[i]).split('|')[5] || 0;
    return idx.sort((a, b) => par(a) - par(b) || a - b);
  },
  make(band, level, rnd) {
    if (band == 'A' || band == 'B') return RB.makeAB(band, level, rnd);
    const lv = Math.max(1, Math.min(12, +level || 1)), k = 3 * (lv - 1) + Math.floor(rnd() * 3), x = Math.floor(rnd() * 8);
    const o = RB.order(band);
    return RB.fromBank(band, o[k] == null ? k : o[k], x);
  },

  /* ---------- saved state ---------- */
  fresh: () => ({ m: [], f: [], cs: 'm', ci: 0, miss: 0, runs: 0, h: [] }),
  // is this program (m, f) one the editor could have made for puzzle p?
  okProg(p, m, f) {
    if (!Array.isArray(m) || !Array.isArray(f)) return false;
    const ok = RB.kitTokens(p.kit);
    if (m.some(t => !ok.includes(t)) || !RB.parse(m) || RB.maxDepth(m) > 2) return false;
    if (p.kit != 'f' && f.length) return false;
    if (f.length > RB.FN_MAX || f.some(t => !['fw', 'tl', 'tr'].includes(t))) return false;
    return RB.count({ m, f }) <= p.slots;
  },
  fit(sv, p) {
    if (!sv || typeof sv != 'object' || !RB.okProg(p, sv.m, sv.f || [])) return null;
    const f = (sv.f || []).slice(), cs = sv.cs == 'f' && p.kit == 'f' ? 'f' : 'm', len = cs == 'f' ? f.length : sv.m.length;
    if (!(Number.isInteger(sv.ci) && sv.ci >= 0 && sv.ci <= len)) return null;
    const int = v => Number.isInteger(v) && v >= 0 ? v : null;
    if (int(sv.miss) == null || int(sv.runs || 0) == null) return null;
    const h = (Array.isArray(sv.h) ? sv.h : []).filter(x => Array.isArray(x) && RB.okProg(p, x[0], x[1])).slice(-RB.HIST);
    return { m: sv.m.slice(), f, cs, ci: sv.ci, miss: sv.miss, runs: sv.runs | 0, h };
  },

  /* ---------- editing (pure: take a state, return a new one) ---------- */
  copy: st => ({ m: st.m.slice(), f: st.f.slice(), cs: st.cs, ci: st.ci, miss: st.miss, runs: st.runs, h: st.h }),
  // put token t in at the cursor (a loop comes with its end, the cursor goes inside). null when it is not allowed there.
  add(p, st, t) {
    const o = RB.copy(st), L = o[o.cs];
    if (RB.count(o) >= p.slots) return null;
    if (o.cs == 'f' && (L.length >= RB.FN_MAX || !['fw', 'tl', 'tr'].includes(t))) return null;
    if (RB.isLoop(t)) {
      if (RB.depthAt(L, o.ci) >= 2) return null;
      L.splice(o.ci, 0, t, 'en');
    } else L.splice(o.ci, 0, t);
    o.ci++;
    return o;
  },
  // take away the block at i of strip s (a loop head takes the loop away and keeps its blocks); the cursor goes there
  remove(p, st, s, i) {
    const o = RB.copy(st), L = o[s], t = L[i];
    if (t == null || t == 'en') return null;
    if (RB.isLoop(t)) { const e = RB.match(L, i); L.splice(e, 1); L.splice(i, 1); } else L.splice(i, 1);
    o.cs = s;
    o.ci = i;
    return o;
  },
  // set the count of the repeat at i
  setN(st, s, i, nn) {
    const o = RB.copy(st);
    if (!/^r[2-9]$/.test(o[s][i]) || !(nn >= 2 && nn <= 9)) return null;
    o[s][i] = 'r' + nn;
    return o;
  },
  // move the cursor to position i of strip s
  cursor(p, st, s, i) {
    const o = RB.copy(st);
    if (s == 'f' && p.kit != 'f') return null;
    o.cs = s;
    o.ci = Math.max(0, Math.min(o[s].length, i));
    return o;
  },

  /* ---------- hints ---------- */
  // The first place where the program goes wrong. -> {kind: 'works' | 'fix' (the block at i is wrong; want null: not needed) |
  // 'add' (a block is missing at i) | 'close' (the loop should end at i), s, i, want, why ('bump' | 'far' | '')}
  diverge(p, st) {
    const prog = { m: st.m, f: st.f };
    if (RB.run(p, prog).out == 'win') return { kind: 'works' };
    if (p.kit == 'abs') {
      let c = p.s, g = 0;
      const gems = p.gems || [];
      for (let i = 0; i < st.m.length; i++) {
        const r = RB.route(p, c, g), k = RB.front(p, c, RB.ABS[st.m[i]]);
        if (!r || !r.length) return { kind: 'fix', s: 'm', i, want: null, why: '' };
        if (k < 0) return { kind: 'fix', s: 'm', i, want: r[0], why: 'bump' };
        const gi = gems.indexOf(k), ng = gi >= 0 ? g | 1 << gi : g, r2 = RB.route(p, k, ng);
        if (!r2 || r2.length != r.length - 1) return { kind: 'fix', s: 'm', i, want: r[0], why: 'far' };
        c = k;
        g = ng;
      }
      const r = RB.route(p, c, g);
      return { kind: 'add', s: 'm', i: st.m.length, want: r && r[0], why: '' };
    }
    // C, D: compare with the reference, keeping a repeat count the child chose when the reference still works with it
    const ref = { m: p.ref.m.slice(), f: p.ref.f.slice() };
    const cmp = (s, A, B) => {
      for (let i = 0; i < Math.max(A.length, B.length); i++) {
        const a = A[i], b = B[i];
        if (s == 'm' && a && b && a != b && /^r\d$/.test(a) && /^r\d$/.test(b)) {
          const m2 = ref.m.slice();
          m2[i] = a;
          if (RB.run(p, { m: m2, f: ref.f }).out == 'win') { ref.m = m2; continue; }
        }
        if (a == b) continue;
        if (a == 'en' && st.cs == s && st.ci == i && b != null) return { kind: 'add', s, i, want: b, why: '' };
        if (a == null) return { kind: 'add', s, i, want: b, why: '' };
        if (b == null) return { kind: 'fix', s, i, want: null, why: '' };
        if (b == 'en') return { kind: 'close', s, i, want: 'en', why: '' };
        return { kind: 'fix', s, i, want: b, why: '' };
      }
      return null;
    };
    const dm = cmp('m', st.m, ref.m), df = ref.f.length ? cmp('f', st.f, ref.f) : null;
    if (df && (!dm || st.m.slice(0, dm.i).includes('fn'))) return df;
    return dm || df || { kind: 'fix', s: 'm', i: st.m.length - 1, want: null, why: '' };
  },
  // Tier 3: put the right block in. -> the new state, or null
  applyHint(p, st, dv) {
    if (!dv || dv.kind == 'works') return null;
    const o = RB.copy(st), L = o[dv.s], i = dv.i, w = dv.want, put = (j, t) => { if (RB.isLoop(t)) L.splice(j, 0, t, 'en'); else L.splice(j, 0, t); };
    const unwrap = j => { const e = RB.match(L, j); L.splice(e, 1); L.splice(j, 1); };
    if (dv.kind == 'add') put(i, w);
    else if (dv.kind == 'close') {
      // the loop around i ends here: move its end before the block at i
      let j = i - 1;
      while (j >= 0 && !(RB.isLoop(L[j]) && RB.match(L, j) > i)) j--;
      if (j < 0) return null;
      L.splice(RB.match(L, j), 1);
      L.splice(i, 0, 'en');
    } else {
      const a = L[i];
      if (w == null) { if (RB.isLoop(a)) unwrap(i); else L.splice(i, 1); }
      else if (RB.isLoop(a) && RB.isLoop(w)) L[i] = w;
      else if (RB.isLoop(a)) { unwrap(i); put(i, w); }
      else if (a == 'en') put(i, w);
      else { L.splice(i, 1); put(i, w); }
    }
    // too many blocks now: the last block after i goes (the program was already wrong from i on)
    // AUD-BT M-2: when this strip has no block after i (the block went into the function while the main strip holds every
    // slot), the last block of the main strip goes instead: the hint only reaches the function once the main strip is right up
    // to its Function block, so what is too many is at the end of the main strip. Before, the hint did nothing there.
    while (RB.count(o) > p.slots) {
      let j = L.length - 1;
      while (j > i && L[j] == 'en') j--;
      if (j > i) { if (RB.isLoop(L[j])) unwrap(j); else L.splice(j, 1); continue; }
      if (dv.s != 'f') return null;
      const M = o.m;
      let k = M.length - 1;
      while (k >= 0 && M[k] == 'en') k--;
      if (k < 0) return null;
      if (RB.isLoop(M[k])) { M.splice(RB.match(M, k), 1); M.splice(k, 1); } else M.splice(k, 1);
    }
    o.cs = dv.s;
    o.ci = Math.min(L.length, w == null ? i : i + 1);
    return RB.okProg(p, o.m, o.f) ? o : null;
  },
  // the words of a block for a sentence ("a Turn left block", "Repeat 3 times")
  name(t) {
    if (/^r\d$/.test(t)) return `Repeat ${t[1]} times`;
    return RB.WORD[t] || t;
  },
};

/* ---------- drawings (inline SVG, colours from the tokens through classes in 49-bt-robot.css) ---------- */
RB.GLYPH = {
  fw: '<path d="M12 19V6M6.5 11.2L12 5.6L17.5 11.2"/><path d="M8 21.5H16"/>',
  tl: '<path d="M16.5 21V13a5.5 5.5 0 0 0-5.5-5.5H5.5"/><path d="M9.6 3.4L5.4 7.5L9.6 11.6"/>',
  tr: '<path d="M7.5 21V13a5.5 5.5 0 0 1 5.5-5.5H18.5"/><path d="M14.4 3.4L18.6 7.5L14.4 11.6"/>',
  rep: '<path d="M4.6 11.2a7.4 7.4 0 0 1 12.8-4.4"/><path d="M18 2.8V7.3H13.5"/><path d="M19.4 12.8a7.4 7.4 0 0 1-12.8 4.4"/><path d="M6 21.2V16.7H10.5"/>',
  uw: '<path d="M3.5 13.5a6.5 6.5 0 0 1 10.8-4.9"/><path d="M15 4.5V9H10.5"/><path d="M18.5 3.5V20.5M15.8 9.2H21.2M15.8 14.8H21.2" stroke-width="2.4"/>',
  fn: '<rect x="3.5" y="4" width="17" height="16" rx="4.5"/><path d="M8.5 9.5H15.5M8.5 14.5H12.5"/>',
  en: '<path d="M9 4H15.5V20H9"/>',
};
RB.glyph = t => {
  if (t in RB.ABS) return ico({ up: 'arrow-up', dn: 'arrow-down', lf: 'arrow-left', rt: 'arrow-right' }[t], 30);
  const k = /^r\d$/.test(t) ? 'rep' : t;
  return `<svg class="rb-g" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">${RB.GLYPH[k] || ''}</svg>`;
};
RB.kind = t => t in RB.ABS || t == 'fw' ? 'mv' : t == 'tl' || t == 'tr' ? 'tn' : /^r\d$/.test(t) || t == 'rep' ? 'rep' : t;
// the robot, drawn around (0, 0) in a 100-unit cell; light from the top left (shade lower right, gloss upper left)
RB.botSvg = () =>
  '<ellipse class="rb-sh" cx="4" cy="38" rx="31" ry="8"/>' +
  '<g class="rb-body">' +
  '<rect class="rb-whl" x="-31" y="12" width="15" height="25" rx="7"/><rect class="rb-whl" x="16" y="12" width="15" height="25" rx="7"/>' +
  '<rect class="rb-bd2" x="-21" y="-3" width="46" height="36" rx="13"/><rect class="rb-bd" x="-24" y="-6" width="46" height="36" rx="13"/>' +
  '<rect class="rb-bd1" x="-18" y="-2" width="14" height="5" rx="2.5"/><circle class="rb-led" cx="-1" cy="13" r="6.5"/>' +
  '<path class="rb-ant" d="M16 -38L19 -46"/><circle class="rb-ball" cx="20" cy="-49" r="6"/><circle class="rb-ball1" cx="18" cy="-51" r="2"/>' +
  '<rect class="rb-hd2" x="-27" y="-38" width="58" height="38" rx="15"/><rect class="rb-hd" x="-30" y="-41" width="58" height="38" rx="15"/>' +
  '<rect class="rb-scr" x="-23" y="-34" width="44" height="25" rx="10"/>' +
  '<g class="rb-eyes"><circle class="rb-eye" cx="-10" cy="-23" r="5.5"/><circle class="rb-eye" cx="8" cy="-23" r="5.5"/>' +
  '<path class="rb-smile" d="M-7 -15.5Q-1 -11.5 5 -15.5"/></g><rect class="rb-gl" x="-25" y="-37.5" width="15" height="5" rx="2.5"/>' +
  '</g>' +
  // where the robot faces: an orange pointer at the edge of its cell, drawn on top so it never hides behind the robot
  '<g class="rb-dir"><path class="rb-ptr2" d="M-11 -38L2 -50L15 -38Z"/><path class="rb-ptr" d="M-13 -40L0 -52L13 -40Z"/></g>';
RB.flagSvg = () =>
  '<ellipse class="rb-pad2" cx="3" cy="30" rx="34" ry="12"/><ellipse class="rb-pad" cx="0" cy="27" rx="34" ry="12"/>' +
  '<path class="rb-pole" d="M-12 27V-36"/><path class="rb-fg2" d="M-10 -34H28L19 -21L28 -8H-10Z"/><path class="rb-fg" d="M-10 -36H25L16 -23.5L25 -11H-10Z"/>' +
  '<rect class="rb-fg1" x="-6" y="-32" width="14" height="4" rx="2"/>';
RB.gemSvg = () =>
  '<path class="rb-gm2" d="M-15 -6L-6 -17H10L19 -6L2 18Z"/><path class="rb-gm" d="M-18 -9L-9 -20H7L16 -9L-1 15Z"/>' +
  '<path class="rb-gm1" d="M-9 -20H7L4 -9H-6Z"/><path class="rb-gm3" d="M-1 15L4 -9H16Z"/>';
// one stone block (shadow, side, top, highlight, seam) in the cell at (x, y)
RB.wallSvg = (x, y) =>
  `<rect class="rb-ws" x="${x + 10}" y="${y + 12}" width="88" height="88" rx="14"/><rect class="rb-w2" x="${x + 5}" y="${y + 9}" width="90" height="88" rx="14"/>` +
  `<rect class="rb-w" x="${x + 5}" y="${y + 4}" width="90" height="84" rx="14"/><rect class="rb-w1" x="${x + 14}" y="${y + 11}" width="34" height="9" rx="4.5"/>` +
  `<path class="rb-wl" d="M${x + 12} ${y + 47}H${x + 88}M${x + 50} ${y + 47}V${y + 86}"/>`;

/* ---------- the screen ---------- */
RB.mount = (el, p, api) => {
  const band = p.b, abs = p.kit == 'abs', n = p.n, gems = p.gems || [];
  let st = RB.fit(api.loadState(), p) || RB.fresh();
  let busy = false, won = false, pick = -1, mark = null, bad = null, away = false, ang = p.d * 90, told = '';
  const timers = new Set(), later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const V = 100, M = 14, SZ = n * V + 2 * M, cx = c => M + (c % n) * V + V / 2, cy = c => M + Math.floor(c / n) * V + V / 2;

  // ---- markup: the board (drawn once) and the side panel ----
  let floor = '', walls = '';
  for (let c = 0; c < n * n; c++) {
    const x = M + (c % n) * V, y = M + Math.floor(c / n) * V;
    if (p.w[c] == '#') walls += RB.wallSvg(x, y);
    else floor += `<rect class="rb-fl2" x="${x + 5}" y="${y + 7}" width="93" height="93" rx="12"/>` +
      `<rect class="rb-fl" x="${x + 3}" y="${y + 3}" width="92" height="92" rx="12"/>`;
  }
  const items = `<g transform="translate(${cx(p.s)} ${cy(p.s)})"><circle class="rb-st2" cx="2" cy="4" r="36"/><circle class="rb-st" r="35"/>` +
    '<circle class="rb-st1" r="24"/></g>' +
    `<g transform="translate(${cx(p.g)} ${cy(p.g)})">${RB.flagSvg()}</g>` +
    gems.map((c, k) => `<g transform="translate(${cx(c)} ${cy(c)})"><g class="rb-gem" data-k="${k}">${RB.gemSvg()}</g></g>`).join('');
  const aria = `Robot world, ${n} by ${n}. The robot starts facing ${['up', 'right', 'down', 'left'][p.d]}.` +
    (gems.length ? ` ${gems.length} gem${gems.length > 1 ? 's' : ''} to pick up.` : '');
  const fnStrip = p.kit == 'f' ? `<div class="rb-sw rb-fw"><div class="rb-hd"><span class="rb-lab">${RB.glyph('fn')}<span>Function</span></span></div>` +
    '<div class="rb-strip" data-s="f"></div></div>' : '';
  el.innerHTML = `<div class="rb rb-${band}${abs ? ' rb-abs' : ''}"><div class="rb-board">` +
    `<svg class="rb-svg" viewBox="0 0 ${SZ} ${SZ}" role="img" aria-label="${esc(aria)}">` +
    `<rect class="rb-tray2" x="5" y="7" width="${SZ - 5}" height="${SZ - 7}" rx="30"/><rect class="rb-tray" width="${SZ - 5}" height="${SZ - 7}" rx="30"/>` +
    `<g>${floor}</g><g>${walls}</g><g class="rb-trail"></g><g>${items}</g><g class="rb-bot">${RB.botSvg()}</g>` +
    '<g class="rb-bonk" visibility="hidden"><path d="M0 -21L6 -7L21 -7L9 2L13 17L0 8L-13 17L-9 2L-21 -7L-6 -7Z"/></g></svg></div>' +
    `<div class="rb-side"><div class="rb-talk"><p class="rb-msg" role="status" aria-live="polite"></p>${UI.ibtn('speak', 'Hear it', { size: 'sm', cls: 'rb-say' })}</div>` +
    `<div class="rb-prog${fnStrip ? ' rb-two' : ''}"><div class="rb-sw rb-mw">` +
    `${fnStrip ? `<div class="rb-hd"><span class="rb-lab">${ico('robot', 22)}<span>Program</span></span></div>` : ''}` +
    `<div class="rb-strip" data-s="m"></div></div>${fnStrip}</div><div class="rb-pal"></div>` +
    `<div class="rb-act">${UI.ibtn('undo', 'Undo', { cls: 'rb-undo' })}<span class="rb-cnt" role="status"></span>` +
    `${UI.btn('Go', { kind: 'primary', icon: 'play', cls: 'rb-go' })}</div></div></div>`;
  const root = el.querySelector('.rb'), svg = root.querySelector('.rb-svg'), bot = root.querySelector('.rb-bot'), dirEl = root.querySelector('.rb-dir');
  const eyes = root.querySelector('.rb-eyes'), body = root.querySelector('.rb-body'), trail = root.querySelector('.rb-trail'), bonk = root.querySelector('.rb-bonk');
  const msgEl = root.querySelector('.rb-msg'), side = root.querySelector('.rb-side'), pal = root.querySelector('.rb-pal');
  const goBtn = root.querySelector('.rb-go'), undoBtn = root.querySelector('.rb-undo');

  // ---- the robot on the board ----
  function setBot(c, d, glide) {
    bot.classList.toggle('glide', !!glide && !reduce);
    bot.style.transform = `translate(${cx(c)}px, ${cy(c)}px)`;
    let a = d * 90;
    while (a - ang > 180) a -= 360; // turn the short way round
    while (ang - a > 180) a += 360;
    ang = a;
    dirEl.style.transform = `rotate(${a}deg)`;
    eyes.style.transform = `translate(${RB.DX[d] * 3}px, ${RB.DY[d] * 2}px)`;
  }
  function playClass(cls) {
    body.classList.remove('wob', 'hop');
    void body.getBoundingClientRect(); // restart the animation
    body.classList.add(cls);
  }
  function home() { // back to the start: gems back, trail and bump mark gone
    setBot(p.s, p.d, false);
    trail.innerHTML = '';
    bonk.setAttribute('visibility', 'hidden');
    root.querySelectorAll('.rb-gem').forEach(g => g.classList.remove('got'));
    body.classList.remove('wob', 'hop');
    away = false;
  }

  // ---- the program strips ----
  const cnt = () => RB.count(st), full = () => cnt() >= p.slots;
  const warn = (s, i) => bad && bad.s == s && bad.i == i ? ico('warning', 18, 'rb-warn') : '';
  function stripHTML(s) {
    const L = st[s], tree = RB.parse(L) || [], cur = st.cs == s && !busy && !won ? st.ci : -1, mk = mark && mark.dv.s == s ? mark : null;
    // tier 1 marks the place, tier 2 shows the right block faintly there
    const ghost = i => {
      if (!mk || mk.dv.i != i) return '';
      const w = mk.dv.want;
      if (mk.tier >= 2 && w && w != 'en') {
        return `<span class="rb-ghost rb-k-${RB.kind(w)}" aria-hidden="true">${RB.glyph(w)}${/^r\d$/.test(w) ? `<b>${w[1]}</b>` : ''}</span>`;
      }
      return mk.dv.kind == 'add' ? '<span class="rb-ghost rb-gslot" aria-hidden="true"></span>' : '';
    };
    const before = i => { const g = ghost(i); return (i == cur && i < L.length && !g ? '<span class="rb-cur" aria-hidden="true"></span>' : '') + g; };
    const cls = i => (bad && bad.s == s && bad.i == i ? ' bad' : '') + (mk && mk.dv.i == i && mk.dv.kind != 'add' ? ' hint' : '');
    const node = seq => seq.map(nd => {
      if (nd.t) {
        return before(nd.i) + `<button class="rb-b rb-k-${RB.kind(nd.t)}${cls(nd.i)}" data-s="${s}" data-i="${nd.i}" ` +
          `aria-label="${esc(RB.name(nd.t))}, block ${nd.i + 1}. Tap to take it away.">${RB.glyph(nd.t)}${warn(s, nd.i)}</button>`;
      }
      const t = L[nd.i], rep = /^r\d$/.test(t), k = RB.kind(t);
      const endHint = mk && mk.dv.kind == 'close' && mk.tier >= 2 && nd.i < mk.dv.i && nd.e > mk.dv.i ? ' hint' : '';
      return before(nd.i) + `<div class="rb-loop rb-k-${k}" data-s="${s}" data-i="${nd.i}">` +
        `<button class="rb-b rb-lh rb-k-${k}${cls(nd.i)}" data-s="${s}" data-i="${nd.i}" ` +
        `aria-label="${rep ? `Repeat ${t[1]} times. Tap to change.` : 'Repeat until wall. Tap to take it away.'}">` +
        `${RB.glyph(t)}${rep ? `<b>${t[1]}</b>` : ''}${warn(s, nd.i)}</button>${node(nd.b)}${before(nd.e)}` +
        `<button class="rb-end rb-k-${k}${endHint}" data-s="${s}" data-e="${nd.e}" aria-label="End of the loop. Tap to put the next block after it.">` +
        `${RB.glyph('en')}</button></div>`;
    }).join('');
    // empty slots (A, B: one box for every block left; C, D: one, to keep the strip short); the first one is the cursor when the
    // cursor is at the end (a hint mark at the end takes its place)
    const left = Math.max(0, s == 'f' ? Math.min(RB.FN_MAX - L.length, p.slots - cnt()) : p.slots - cnt()), room = abs ? left : Math.min(1, left);
    const g = ghost(L.length);
    let html = node(tree) + g;
    for (let k = g ? 1 : 0; k < room; k++) {
      const isCur = k == 0 && cur == L.length;
      const aria = isCur ? 'The next block goes here' : 'Empty slot. Tap to put the next block here.';
      html += `<button class="rb-slot${isCur ? ' cur' : ''}" data-s="${s}" aria-label="${aria}"></button>`;
    }
    return html;
  }
  function palHTML() {
    if (pick >= 0) {
      const t = st.m[pick] || '', now = /^r\d$/.test(t) ? +t[1] : 0;
      let nums = '';
      for (let k = 2; k <= 9; k++) {
        nums += `<button class="rb-nk${k == now ? ' on' : ''}" data-n="${k}" aria-pressed="${k == now}" aria-label="${k} times">${k}</button>`;
      }
      return `<div class="rb-pick"><p>${RB.glyph('rep')}<span>How many times?</span></p><div class="rb-nums">${nums}</div>` +
        `${UI.btn('Take it away', { icon: 'trash', cls: 'rb-del' })}</div>`;
    }
    const toks = abs ? ['up', 'lf', 'dn', 'rt'] : ['fw', 'tl', 'tr', 'rep', ...(p.kit == 'u' ? ['uw'] : []), ...(p.kit == 'f' ? ['fn'] : [])];
    const inF = st.cs == 'f', deep = RB.depthAt(st[st.cs], st.ci) >= 2;
    return `<div class="rb-pals${abs ? ' rb-pad' : ''}">` + toks.map(t => {
      const off = busy || won || full() || (inF && (!['fw', 'tl', 'tr'].includes(t) || st.f.length >= RB.FN_MAX)) || ((t == 'rep' || t == 'uw') && deep);
      return `<button class="rb-p rb-k-${RB.kind(t)}" data-t="${t}" aria-label="${esc(RB.WORD[t])}"${off ? ' disabled' : ''}>${RB.glyph(t)}` +
        `${band == 'A' ? '' : `<span>${esc(RB.WORD[t])}</span>`}</button>`;
    }).join('') + '</div>';
  }
  function render() {
    root.querySelectorAll('.rb-strip').forEach(e => { e.innerHTML = stripHTML(e.dataset.s); });
    const c = root.querySelector('.rb-cnt');
    c.innerHTML = `<b>${cnt()} of ${p.slots}</b><span>blocks</span>`;
    c.setAttribute('aria-label', `${cnt()} of ${p.slots} blocks used`);
    c.classList.toggle('full', full());
    pal.innerHTML = palHTML();
    root.querySelectorAll('.rb-fw').forEach(e => e.classList.toggle('on', st.cs == 'f'));
    goBtn.querySelector('span').textContent = busy ? 'Stop' : 'Go';
    goBtn.classList.toggle('stop', busy);
    goBtn.disabled = won;
    undoBtn.disabled = busy || won || !st.h.length;
    wire();
    layout();
  }

  // ---- the talk line ----
  const msg = (t, kind, speak) => {
    msgEl.textContent = t;
    msgEl.className = 'rb-msg' + (kind ? ' ' + kind : '');
    told = t;
    if (speak) api.say(t);
    layout(); // the line may now take more or fewer rows
  };
  const intro = abs
    ? (gems.length ? `Pick up the gem${gems.length > 1 ? 's' : ''}, then go to the flag. Tap the arrows, then press Go.`
      : 'Tap the arrows to help the robot get to the flag. Then press Go.')
    : p.kit == 'u' ? 'Repeat until wall goes on while the way ahead is open.'
    : p.kit == 'f' ? 'Put moves in the function once, then use it again and again.'
    : `Use Repeat to fit the program in ${p.slots} blocks.`;

  // ---- editing ----
  const save = () => { if (!won) api.saveState(st); };
  function edit(o, say) {
    if (!o || busy || won) return false;
    o.h = st.h.concat([[st.m.slice(), st.f.slice(), st.cs, st.ci]]).slice(-RB.HIST);
    st = o;
    mark = null;
    bad = null;
    if (away) home();
    save();
    render();
    if (say) msg(say);
    return true;
  }
  function addTok(t) {
    if (busy || won) return;
    if (full()) { msg(`All ${p.slots} blocks are used. Tap a block to take it away.`, 'try'); return; }
    const o = RB.add(p, st, t == 'rep' ? 'r2' : t);
    if (!o) return;
    api.sfx.pop(Math.min(5, cnt()));
    if (band == 'A') api.say(RB.WORD[t]);
    if (t == 'rep') { pick = o.ci - 1; edit(o, 'How many times? Then put blocks inside the repeat.'); }
    else if (t == 'uw') edit(o, 'Put blocks inside. They repeat while the way ahead is open.');
    else edit(o);
  }
  function wire() {
    pal.querySelectorAll('.rb-p').forEach(b => { b.onclick = () => addTok(b.dataset.t); });
    pal.querySelectorAll('.rb-nk').forEach(b => {
      b.onclick = () => {
        const at = pick, fresh = !st.m[at + 1] || st.m[at + 1] == 'en';
        pick = -1;
        api.sfx.click();
        if (!edit(RB.setN(st, 'm', at, +b.dataset.n), fresh ? 'Now put blocks inside. Then tap the end bracket to go on after the loop.' : '')) render();
      };
    });
    const del = pal.querySelector('.rb-del');
    if (del) del.onclick = () => { const at = pick; pick = -1; api.sfx.del(); if (!edit(RB.remove(p, st, 'm', at))) render(); };
    root.querySelectorAll('.rb-strip .rb-b').forEach(b => {
      b.onclick = () => {
        if (busy || won) return;
        const s = b.dataset.s, i = +b.dataset.i;
        if (/^r\d$/.test(st[s][i])) { pick = pick == i ? -1 : i; api.sfx.click(); render(); return; }
        pick = -1;
        api.sfx.del();
        edit(RB.remove(p, st, s, i));
      };
    });
    root.querySelectorAll('.rb-end').forEach(b => {
      b.onclick = () => { if (busy || won) return; pick = -1; api.sfx.click(); edit(RB.cursor(p, st, b.dataset.s, +b.dataset.e + 1)); };
    });
    root.querySelectorAll('.rb-slot').forEach(b => {
      b.onclick = () => {
        if (busy || won) return;
        const s = b.dataset.s, other = s != st.cs;
        pick = -1;
        api.sfx.click();
        edit(RB.cursor(p, st, s, st[s].length), other ? (s == 'f' ? 'Put moves in the function: forward and turns.' : 'Back to the program.') : '');
      };
    });
  }
  undoBtn.onclick = () => {
    if (busy || won || !st.h.length) return;
    const h = st.h.slice(), [m, f, cs, ci] = h.pop();
    st = Object.assign(RB.copy(st), { m: m.slice(), f: f.slice(), cs, ci, h });
    pick = -1;
    mark = null;
    bad = null;
    if (away) home();
    api.sfx.del();
    save();
    render();
  };
  root.querySelector('.rb-say').onclick = () => { try { say(told); } catch (e) {} };

  // ---- running: the whole run is worked out first (RB.run), then shown step by step ----
  function highlight(stp) {
    root.querySelectorAll('.rb-strip .on').forEach(e => e.classList.remove('on'));
    if (!stp) return;
    const on = (s, i) => root.querySelectorAll(`.rb-strip [data-s="${s}"][data-i="${i}"]`).forEach(e => e.classList.add('on'));
    on(stp.s, stp.i);
    if (stp.call >= 0) on('m', stp.call);
    for (const [s, i] of stp.L) on(s, i);
  }
  function go() {
    if (won) return;
    if (busy) { stopRun(); return; }
    if (!cnt()) { msg('Put some blocks in first. Then press Go.', 'try', band == 'A'); return; }
    pick = -1;
    mark = null;
    bad = null;
    home();
    const tr = RB.run(p, { m: st.m, f: st.f }), steps = tr.steps;
    busy = true;
    render();
    msg('Go, robot, go!');
    // a step lasts 170-380 ms (long runs go faster); reduced motion: short steps, no gliding
    const dt = reduce ? 160 : Math.max(170, Math.min(380, Math.round(8000 / Math.max(1, steps.length))));
    root.style.setProperty('--rb-t', Math.round(dt * 0.85) + 'ms');
    let k = 0;
    const tick = () => {
      if (!busy) return;
      const s = steps[k++];
      if (!s) { later(() => end(tr), Math.round(dt * 0.5)); return; }
      highlight(s);
      setBot(s.c, s.d, true);
      away = true;
      if (s.e == 'bump') {
        const x = cx(s.c) + RB.DX[s.d] * 50, y = cy(s.c) + RB.DY[s.d] * 50;
        bonk.setAttribute('transform', `translate(${x} ${y})`);
        bonk.setAttribute('visibility', 'visible');
        playClass('wob');
        api.sfx.rattle();
      } else if (s.e != 'turn') {
        trail.insertAdjacentHTML('beforeend', `<circle class="rb-dot" cx="${cx(s.c)}" cy="${cy(s.c)}" r="9"/>`);
        api.sfx.click();
        gems.forEach((c, gi) => {
          const e = root.querySelector(`.rb-gem[data-k="${gi}"]`);
          if (s.g >> gi & 1 && e && !e.classList.contains('got')) { e.classList.add('got'); api.sfx.coin(gi); }
        });
      }
      later(tick, dt);
    };
    later(tick, 120);
  }
  function stopRun() {
    timers.forEach(clearTimeout);
    timers.clear();
    busy = false;
    highlight(null);
    home();
    render();
    msg('Stopped. Change the program, or press Go again.');
  }
  function end(tr) {
    busy = false;
    highlight(null);
    st.runs++;
    if (tr.out == 'win') {
      won = true;
      playClass('hop');
      api.sfx.chime();
      const over = cnt() > p.par;
      render();
      msg(over ? `You made it with ${cnt()} blocks! It can be done with ${p.par}.` : 'You made it!', 'good', true);
      api.saveState(st);
      api.win({ mistakes: over ? Math.max(st.miss, RB.ALLOW + 1) : st.miss });
      return;
    }
    st.miss++; // a failed run is one mistake
    bad = tr.at ? { s: tr.at.s, i: tr.at.i } : null;
    // W14: a move off the board is "the edge" (bands A and B, the arrow kits; band A has no walls at all)
    const bx = tr.c % p.n + RB.DX[tr.d], by = Math.floor(tr.c / p.n) + RB.DY[tr.d], edge = abs && (bx < 0 || by < 0 || bx >= p.n || by >= p.n);
    const words = {
      bump: edge ? 'Bump! The robot hit the edge. Change the amber arrow.' : `Bump! The robot hit a wall. Change the amber ${abs ? 'arrow' : 'block'}.`,
      dizzy: 'The robot got dizzy: that loop went round and round. Change the amber block.',
      short: 'The robot stopped before the flag. Add more blocks, or change some.',
      gems: 'The robot is on the flag, but a gem is missing. Pick it up first.',
    }[tr.out] || 'Not there yet. Try again!';
    if (tr.out != 'bump') api.sfx.wrong();
    save();
    render();
    msg(words, 'try', true);
  }
  goBtn.onclick = go;
  const keyd = e => {
    if (!root.isConnected || $('.ovl') || $('.bt-win')) return;
    const t = { ArrowUp: 'up', ArrowDown: 'dn', ArrowLeft: 'lf', ArrowRight: 'rt' }[e.key];
    if (t && abs) { e.preventDefault(); addTok(t); }
    else if (e.key == 'Backspace' && st.ci > 0 && !busy && st[st.cs][st.ci - 1] != 'en') { e.preventDefault(); edit(RB.remove(p, st, st.cs, st.ci - 1)); }
  };
  document.addEventListener('keydown', keyd);

  // ---- layout (BRAIN_TEASERS 8): the board is the biggest square left above the controls (portrait) or beside them (landscape) ----
  function layout() {
    const ps = getComputedStyle(el), aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
    const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
    const land = aw > ah * 1.2 && aw >= 640;
    root.classList.toggle('land', land);
    // a long program: closer rows, so the panel still fits beside the board (landscape) or leaves it room (portrait)
    root.classList.remove('tight');
    if (land ? side.offsetHeight > ah : ah - side.offsetHeight - 12 < Math.min(aw, 240)) root.classList.add('tight');
    let bs = land ? Math.min(ah, aw - side.offsetWidth - 20) : Math.min(aw, ah - side.offsetHeight - 12);
    bs = Math.max(150, Math.min(bs, 640));
    svg.style.width = svg.style.height = Math.floor(bs) + 'px';
  }
  let rz = 0;
  const onResize = () => { clearTimeout(rz); rz = setTimeout(layout, 120); };
  window.addEventListener('resize', onResize);

  // ---- hints ----
  function hintNow(tier) {
    if (busy || won) return false;
    const dv = RB.diverge(p, st);
    if (dv.kind == 'works') { msg('Your program works! Press Go.', 'good', true); return false; }
    pick = -1;
    if (tier >= 3) {
      const o = RB.applyHint(p, st, dv);
      if (!edit(o)) return false;
      msg(dv.want == null ? 'I took away a block that was not needed.' : dv.kind == 'close' ? 'I ended the loop there.' : `I put in ${RB.name(dv.want)}.`, 'hint', true);
      return true;
    }
    mark = { tier, dv };
    bad = null;
    if (away) home();
    render();
    const t1 = dv.kind == 'add' ? (cnt() ? 'So far so good! The next block goes here.' : 'Start here. Which block comes first?')
      : dv.kind == 'close' ? 'The loop should end before this block.'
      : dv.want == null ? 'This block is not needed.'
      : dv.why == 'bump' ? 'This arrow bumps into a wall.' : dv.why == 'far' ? 'This arrow takes the robot the long way.'
      : 'Look at this block. Something else goes here.';
    const t2 = dv.kind == 'close' ? 'End the loop here: tap the end of the loop, then put the next blocks after it.'
      : dv.want == null ? 'Take this block away.' : `Try ${RB.name(dv.want)} here.`;
    msg(tier == 1 ? t1 : t2, 'hint', true);
    return true;
  }

  // ---- start ----
  home();
  render();
  msg(intro, '', !st.m.length && !st.runs && (band == 'A' || band == 'B')); // R-01b: band B speaks its first instruction too
  const inst = {
    hint: hintNow,
    destroy() {
      timers.forEach(clearTimeout);
      timers.clear();
      clearTimeout(rz);
      busy = false;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', keyd);
      if (RB.cur && RB.cur.inst === inst) RB.cur = null;
    },
  };
  RB.cur = { inst, p, st: () => st, busy: () => busy, won: () => won, mark: () => mark };
  return inst;
};

BT.reg({
  id: 'robot', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make(band, level, rnd) { return RB.make(band, level, rnd); },
  solve(p) { return { m: p.ref.m.slice(), f: p.ref.f.slice() }; },
  mount(el, p, api) { return RB.mount(el, p, api); },
});
/* ---------- Brain Teasers: Memory Match (P3-14; BRAIN_TEASERS.md 5.9, 7) ----------
   One registered type, `memory`. Cards lie face down in a grid; tap two to turn them over; a pair stays up, two that do not match
   turn back after a moment (or at the next tap). Word lists are MEMW (src/data/d-memory.js) and SPN (34-gen-es.js); pictures go
   through picFor with the emoji fallback in RIDDLES.pics (read only inside functions, A11).
   Pairs and kinds per band (levels 1-4 / 5-8 / 9-12):
     A (PK-K)  3 pairs (levels 1-6), 4 pairs (7-12): the same picture twice (levels 1-8), then a big letter and its small letter
     B (1-2)   6 pairs: a number and its dots (1-6), a word and its picture, a number and its dots (4-10; 7-10 on two dice faces)
     C (3-4)   8 pairs: a fraction and its picture, a Spanish word and the English word, two words that mean the same
     D (5-6)   10 pairs: equal fractions, a fraction / decimal / percent of the same value, a word root and its meaning
   Every card has exactly one partner: the values, words and roots of a puzzle are all different (tools/test.js checks it).
   The layout is made from the seeded rnd, so it is the same for a band, level and day. A face-down card's face is not in the page
   (it is drawn only while the card is up) and the saved state names cards by place, never by what is on them.
   Mistakes: a "slip" is a pair that did not match although the child had already seen where the first card's partner was, or had
   already seen the second card (an unseen card was the better try). The first few slips of a band are free (A 0, B 1, C 2, D 3);
   the win reports the slips over that, and allow is 1, so a perfect memory is not needed for 3 stars.
   Hints (tier 1, 2, 3, then 3 again): 1 peeks at one card for a moment (the partner of the card that is up, else the unseen partner
   of a card the child has seen, else an unseen card), 2 shows one pair for a moment, 3 matches one pair (it stays up, ringed in star
   yellow). Tiers 1 and 2 change only what counts as seen.
   State (api.saveState after every turn): {m matched card places, hm the ones a hint matched, seen, turns, slips}; MM.fit rejects a
   state that does not belong to the puzzle. A card left up in the middle of a turn is face down again after a resume. */
const MM = (() => {
  const PAIRS = { A: L => (L <= 6 ? 3 : 4), B: () => 6, C: () => 8, D: () => 10 };
  const GRACE = { A: 0, B: 1, C: 2, D: 3 };
  const KINDS = { A: ['pic', 'pic', 'abc'], B: ['dots', 'word', 'dots10'], C: ['frac', 'es', 'syn'], D: ['eqf', 'fdp', 'root'] };
  const ASK = {
    pic: 'Find two pictures that are the same.', abc: 'Match each big letter to its small letter.', dots: 'Match each number to its dots.',
    dots10: 'Match each number to its dots.', word: 'Match each word to its picture.', frac: 'Match each fraction to its picture.',
    es: 'Match each Spanish word to its English word.', syn: 'Match the two words that mean the same.',
    eqf: 'Match the fractions that are equal.', fdp: 'Match the numbers that are worth the same.', root: 'Match each word root to its meaning.',
  };
  const LETTERS = 'ABDEFGHJKMNQRTY'; // letters whose two forms are easy to tell from other letters (no I and l, no C/c O/o S/s ...)
  const tier = L => (L <= 4 ? 0 : L <= 8 ? 1 : 2);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const pics = () => (typeof RIDDLES != 'undefined' && RIDDLES.pics) || {};
  const nameOf = w => ((typeof RIDDLES != 'undefined' && RIDDLES.names) || {})[w] || w;

  function shuffle(a, rnd) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const take = (a, n, rnd) => shuffle(a.slice(), rnd).slice(0, n);
  // reduced fractions n/d with d in ds, 0 < n < d (all different values)
  const fracs = ds => ds.flatMap(d => Array.from({ length: d - 1 }, (_, i) => [i + 1, d]).filter(([n]) => gcd(n, d) == 1));
  const dec = v => String(Math.round(v * 1000) / 1000);
  const FDP = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];

  // the pairs of a kind: [[face, face], ...]; a face is {t: kind of face, ...}
  function pairsOf(kind, n, rnd) {
    if (kind == 'pic') {
      const th = MEMW.themes, keys = Object.keys(th), w = take(th[keys[Math.floor(rnd() * keys.length)]], n, rnd);
      return w.map(x => [{ t: 'pic', w: x }, { t: 'pic', w: x }]);
    }
    if (kind == 'abc') return take(LETTERS.split(''), n, rnd).map(c => [{ t: 'let', s: c }, { t: 'let', s: c.toLowerCase() }]);
    if (kind == 'dots' || kind == 'dots10') {
      const top = kind == 'dots' ? 6 : 10, ns = Array.from({ length: top }, (_, i) => i + 1);
      return take(kind == 'dots' ? ns : ns.slice(3), n, rnd).map(v => [{ t: 'num', s: String(v) }, { t: 'dots', n: v }]);
    }
    if (kind == 'word') {
      const all = [].concat(...Object.values(MEMW.themes)).filter(x => nameOf(x).length <= 5 && /^[a-z]+$/.test(nameOf(x)));
      return take(all, n, rnd).map(x => [{ t: 'txt', s: nameOf(x) }, { t: 'pic', w: x }]);
    }
    if (kind == 'frac') return take(fracs([2, 3, 4, 5, 6, 8]), n, rnd).map(([a, b]) => [{ t: 'fr', n: a, d: b }, { t: 'fpic', n: a, d: b }]);
    if (kind == 'es') {
      const all = SPN.animal.concat(SPN.food).filter(x => x[1].length <= 9);
      return take(all, n, rnd).map(x => [{ t: 'txt', s: x[0], es: 1 }, { t: 'txt', s: x[1] }]);
    }
    if (kind == 'syn') return take(MEMW.syn, n, rnd).map(([a, b]) => [{ t: 'txt', s: a }, { t: 'txt', s: b }]);
    if (kind == 'eqf') {
      return take(fracs([2, 3, 4, 5, 6]), n, rnd).map(([a, b]) => {
        const k1 = 1 + Math.floor(rnd() * 2), k2 = k1 + 1 + Math.floor(rnd() * 2); // 1-2, then 1-2 more
        return [{ t: 'fr', n: a * k1, d: b * k1 }, { t: 'fr', n: a * k2, d: b * k2 }];
      });
    }
    if (kind == 'fdp') {
      return take(FDP, n, rnd).map(([a, b]) => {
        const f = [{ t: 'fr', n: a, d: b }, { t: 'dec', s: dec(a / b) }, { t: 'pct', s: dec(100 * a / b) + '%' }];
        const skip = Math.floor(rnd() * 3); // two of the three forms
        return f.filter((_, i) => i != skip);
      });
    }
    if (kind == 'root') return take(MEMW.roots, n, rnd).map(([a, b]) => [{ t: 'txt', s: a, root: 1 }, { t: 'txt', s: b }]);
    throw new Error('memory: no kind ' + kind);
  }

  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, level | 0 || 1)), n = PAIRS[band](L), kind = KINDS[band][tier(L)];
    const faces = pairsOf(kind, n, rnd);
    const cards = shuffle(faces.flatMap((_, k) => [[k, 0], [k, 1]]), rnd);
    return { band, kind, n, faces, cards };
  }
  // the winning moves: the two places of each pair, pair by pair
  const solve = p => p.faces.map((_, k) => p.cards.map((c, i) => (c[0] == k ? i : -1)).filter(i => i >= 0));
  const pairOf = (p, i) => p.cards[i][0];
  const partner = (p, i) => p.cards.findIndex((c, j) => j != i && c[0] == p.cards[i][0]);

  /* ---------- the rules (pure; the screen and the tests use the same functions) ---------- */
  const fresh = () => ({ m: [], hm: [], seen: [], up: [], turns: 0, slips: 0 });
  // tap card i. Returns {s: the new state, ev: 'none' | 'first' | 'match' | 'miss', slip}. A miss leaves both cards in s.up;
  // settle() turns them back (the screen does that after a moment or at the next tap).
  function pick(p, s0, i) {
    const s = JSON.parse(JSON.stringify(s0));
    if (s.up.length == 2) s.up = [];
    if (!(i >= 0 && i < p.cards.length) || s.m.includes(i) || s.up.includes(i)) return { s, ev: 'none', slip: false };
    if (!s.up.length) {
      s.up = [i];
      if (!s.seen.includes(i)) s.seen.push(i);
      return { s, ev: 'first', slip: false };
    }
    const a = s.up[0];
    s.turns++;
    if (pairOf(p, a) == pairOf(p, i)) {
      s.m.push(a, i);
      s.up = [];
      if (!s.seen.includes(i)) s.seen.push(i);
      return { s, ev: 'match', slip: false };
    }
    const slip = s.seen.includes(partner(p, a)) || s.seen.includes(i);
    if (slip) s.slips++;
    s.up = [a, i];
    if (!s.seen.includes(i)) s.seen.push(i);
    return { s, ev: 'miss', slip };
  }
  const settle = s0 => Object.assign(JSON.parse(JSON.stringify(s0)), { up: [] });
  const done = (p, s) => s.m.length == p.cards.length;
  // the pair a hint is about: the pair of the card that is up, else a pair with one card seen, else the first open pair
  function hintPair(p, s) {
    const open = p.cards.map((_, i) => i).filter(i => !s.m.includes(i));
    if (!open.length) return -1;
    if (s.up.length == 1) return pairOf(p, s.up[0]);
    const half = open.find(i => s.seen.includes(i) && !s.seen.includes(partner(p, i)));
    return pairOf(p, half != null ? half : open[0]);
  }
  // hint tier t: {s, show: [card places to show for a moment], match: [places matched by the hint]} or null when nothing is left
  function hint(p, s0, t) {
    const s = settle(s0);
    if (s0.up.length == 1) s.up = s0.up.slice();
    const k = hintPair(p, s);
    if (k < 0) return null;
    const both = p.cards.map((c, i) => (c[0] == k ? i : -1)).filter(i => i >= 0);
    if (t == 1) {
      const one = both.find(i => !s.up.includes(i) && !s.seen.includes(i));
      const show = [one != null ? one : both.find(i => !s.up.includes(i))];
      show.forEach(i => { if (!s.seen.includes(i)) s.seen.push(i); });
      return { s, show, match: [] };
    }
    both.forEach(i => { if (!s.seen.includes(i)) s.seen.push(i); });
    if (t == 2) return { s, show: both.filter(i => !s.up.includes(i)), match: [] };
    s.m.push(...both);
    s.hm.push(...both);
    s.up = [];
    return { s, show: [], match: both };
  }
  // does a saved state belong to this puzzle?
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const n = p.cards.length, places = a => Array.isArray(a) && a.every(i => Number.isInteger(i) && i >= 0 && i < n) && new Set(a).size == a.length;
    if (!places(s.m) || !places(s.hm) || !places(s.seen) || !places(s.up || [])) return false;
    if (!Number.isInteger(s.turns) || s.turns < 0 || !Number.isInteger(s.slips) || s.slips < 0 || s.slips > s.turns) return false;
    if (s.m.some(i => !s.m.includes(partner(p, i))) || s.hm.some(i => !s.m.includes(i)) || s.m.some(i => !s.seen.includes(i))) return false;
    return (s.m.length - s.hm.length) / 2 <= s.turns;
  }
  const mistakes = (p, s) => Math.max(0, s.slips - GRACE[p.band]);

  /* ---------- drawing ---------- */
  const frac = (n, d) => `<span class="mm-fr"><b>${n}</b><b>${d}</b></span>`;
  function faceHTML(f) {
    if (f.t == 'pic') return `<span class="mm-pic">${picFor(f.w, pics()[f.w] || '')}</span>`;
    if (f.t == 'let') return `<b class="mm-let">${esc(f.s)}</b>`;
    if (f.t == 'num') return `<b class="mm-num">${esc(f.s)}</b>`;
    if (f.t == 'dots') return `<span class="mm-viz">${VIZ.dots(f.n, 'dice')}</span>`;
    if (f.t == 'fpic') return `<span class="mm-viz">${VIZ.fracCircle(f.n, f.d)}</span>`;
    if (f.t == 'fr') return frac(f.n, f.d);
    if (f.t == 'dec' || f.t == 'pct') return `<b class="mm-num">${esc(f.s)}</b>`;
    const len = f.s.length;
    return `<span class="mm-txt${f.es ? ' mm-es' : ''}${f.root ? ' mm-root' : ''}${len > 6 ? ' long' : ''}"${f.es ? ' lang="es"' : ''}>${esc(f.s)}</span>`;
  }
  // what a face-up card is called (for its aria-label)
  function faceName(f) {
    if (f.t == 'pic') return nameOf(f.w);
    if (f.t == 'dots') return f.n + (f.n == 1 ? ' dot' : ' dots');
    if (f.t == 'fpic') return 'a circle with ' + f.n + ' of ' + f.d + ' parts shaded';
    if (f.t == 'fr') return f.n + ' over ' + f.d;
    if (f.t == 'let') return (f.s == f.s.toUpperCase() ? 'big ' : 'small ') + f.s;
    return f.s;
  }
  const back = () => `<span class="mm-back" aria-hidden="true"><i></i>${ico('star', 26)}</span>`;

  // the cards per row and the card size that fit w x h; ratio = height / width (4:5 cards, square ones on a wide, short screen)
  function fitGrid(n, w, h, gap, ratio = 1.25) {
    let best = { cols: 1, cw: 0 };
    for (let cols = 2; cols <= Math.min(n, 8); cols++) {
      const rows = Math.ceil(n / cols), cw = Math.min((w - (cols - 1) * gap) / cols, ((h - (rows - 1) * gap) / rows) / ratio);
      // prefer an even grid (no short last row) when it costs less than 8 percent of the card size
      const even = n % cols == 0 ? 1.08 : 1;
      if (cw * even > best.cw * (best.even || 1)) best = { cols, cw, even };
    }
    return { cols: best.cols, cw: Math.max(40, Math.floor(Math.min(best.cw, 150))) };
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    st = fit(p, st) ? Object.assign(st, { up: [] }) : fresh();
    let alive = true, back_ = 0, lastW = 0, lastH = 0, peekT = 0, winT = 0;
    const band = api.band || p.band, timers = new Set();
    const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); if (alive) f(); }, ms); timers.add(t); return t; };
    const SHOW = band == 'A' ? 1500 : 1100; // how long two cards that do not match stay up
    el.innerHTML = `<div class="mm mm-${band}"><div class="mm-say"><p class="mm-msg" role="status" aria-live="polite"></p>` +
      `${UI.ibtn('speak', 'Hear what to do', { size: 'sm', cls: 'mm-spk' })}</div>` +
      `<div class="mm-bar"><span class="mm-got" role="img"></span><span class="mm-turns"></span></div>` +
      `<div class="mm-area"><div class="mm-grid" role="group" aria-label="Cards">` +
      p.cards.map((_, i) => `<button class="mm-c" data-i="${i}" aria-label="Card ${i + 1}, face down"><span class="mm-in">${back()}<span class="mm-face"></span></span></button>`).join('') +
      `</div></div></div>`;
    const root = el.firstChild, grid = root.querySelector('.mm-grid'), area = root.querySelector('.mm-area'), cardEl = [...grid.children];
    const msgEl = root.querySelector('.mm-msg');
    const msg = (t, cls) => { msgEl.textContent = t; msgEl.className = 'mm-msg' + (cls ? ' ' + cls : ''); };
    root.querySelector('.mm-spk').onclick = () => api.say(ASK[p.kind]);
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      root.style.height = Math.max(300, ah) + 'px';
      const w = area.clientWidth, h = area.clientHeight;
      lastW = el.clientWidth; lastH = el.clientHeight;
      const ratio = w > h * 1.6 ? 1 : 1.25, g = fitGrid(p.cards.length, w, h, w < 520 ? 8 : 12, ratio);
      grid.style.setProperty('--cols', g.cols);
      grid.style.setProperty('--cw', g.cw + 'px');
      grid.style.setProperty('--ch', Math.floor(g.cw * ratio) + 'px');
      grid.style.setProperty('--gap', (w < 520 ? 8 : 12) + 'px');
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    // turn a card up or down (its face is put in only while it is up, and taken out once it has turned back)
    function show(i, up, cls) {
      const c = cardEl[i], f = p.faces[p.cards[i][0]][p.cards[i][1]], fe = c.querySelector('.mm-face');
      if (up) {
        if (!c.classList.contains('up')) fe.innerHTML = faceHTML(f);
        c.classList.add('up');
        c.setAttribute('aria-label', faceName(f));
      } else {
        c.classList.remove('up', 'no', 'peek');
        c.setAttribute('aria-label', `Card ${i + 1}, face down`);
        later(() => { if (!c.classList.contains('up')) fe.innerHTML = ''; }, 400);
      }
      if (cls) c.classList.add(cls);
    }
    function bar() {
      const got = st.m.length / 2;
      const b = root.querySelector('.mm-got');
      b.innerHTML = p.faces.map((_, k) => `<i class="${k < got ? 'on' : ''}"></i>`).join('');
      b.setAttribute('aria-label', `${got} of ${p.n} pairs found`);
      root.querySelector('.mm-turns').textContent = st.turns == 1 ? '1 turn' : st.turns + ' turns';
    }
    function paint() { // the whole board from the state (mount, resume)
      cardEl.forEach((c, i) => {
        const m = st.m.includes(i);
        if (m) show(i, true, st.hm.includes(i) ? 'hint' : 'got'); else show(i, false);
        c.disabled = m;
      });
      bar();
    }
    function flipBack() {
      clearTimeout(back_);
      back_ = 0;
      if (st.up.length == 2) st.up.forEach(i => show(i, false));
      st = settle(st);
    }
    function tap(i) {
      if (!alive || st.m.includes(i) || winT) return;
      if (st.up.length == 2) flipBack();
      if (peekT) endPeek();
      const r = pick(p, st, i);
      if (r.ev == 'none') return;
      st = r.s;
      show(i, true);
      api.sfx.click();
      if (r.ev == 'first') {
        api.saveState(Object.assign({}, st, { up: [] }));
        return msg(band == 'A' ? 'Now find its partner!' : 'Now find the one that goes with it.', '');
      }
      if (r.ev == 'match') {
        const [a, b] = st.m.slice(-2);
        [a, b].forEach(x => { cardEl[x].classList.add('got'); cardEl[x].disabled = true; });
        api.sfx.right(st.m.length / 2 + 2);
        msg(done(p, st) ? 'You found them all!' : pick1([['A pair!', 'They match!', 'Well done!', 'Great memory!'], st.turns]), 'good');
      } else {
        st.up.forEach(x => cardEl[x].classList.add('no'));
        api.sfx.del();
        msg(r.slip ? 'Not a pair. You have seen one of these before!' : 'Not a pair. Remember where they are.', 'try');
        back_ = later(flipBack, SHOW);
      }
      api.saveState(Object.assign({}, st, { up: [] }));
      bar();
      if (done(p, st)) finish();
    }
    const pick1 = ([a, n]) => a[n % a.length];
    function finish() {
      const note = [`You found ${p.n} pairs in ${st.turns} ${st.turns == 1 ? 'turn' : 'turns'}.`];
      if (!['pic', 'abc', 'dots', 'dots10', 'word', 'frac'].includes(p.kind)) {
        p.faces.slice(0, 3).forEach(f => note.push(faceName(f[0]).replace(' over ', '/') + ' = ' + faceName(f[1]).replace(' over ', '/')));
      }
      winT = later(() => api.win({ mistakes: mistakes(p, st), note }), 500);
    }
    function endPeek() {
      clearTimeout(peekT);
      peekT = 0;
      cardEl.forEach((c, i) => { if (c.classList.contains('peek') && !st.m.includes(i) && !st.up.includes(i)) show(i, false); });
    }
    cardEl.forEach((c, i) => { c.onclick = () => tap(i); });
    layout();
    paint();
    msg(ASK[p.kind], '');
    if (band == 'A' || (band == 'B' && !st.m.length && !st.turns)) api.say(ASK[p.kind]); // R-01b: band B speaks its first instruction too
    return {
      hint(t) {
        if (!alive || winT || done(p, st)) return false;
        if (st.up.length == 2) flipBack();
        if (peekT) endPeek();
        const r = hint(p, st, Math.min(3, t || 1));
        if (!r) return false;
        st = r.s;
        if (r.match.length) {
          r.match.forEach(i => { show(i, true, 'hint'); cardEl[i].disabled = true; });
          api.sfx.right(st.m.length / 2 + 2);
          msg('Here is a pair for you.', 'hint');
        } else {
          r.show.forEach(i => show(i, true, 'peek'));
          msg(r.show.length == 1 ? 'Peek! Remember where it is.' : 'Here is a pair. Remember where they are!', 'hint');
          peekT = later(() => { peekT = 0; endPeek(); }, band == 'A' ? 2200 : 1700);
        }
        api.say(msgEl.textContent);
        api.saveState(Object.assign({}, st, { up: [] }));
        bar();
        if (done(p, st)) finish();
        return true;
      },
      destroy() {
        alive = false;
        timers.forEach(clearTimeout);
        timers.clear();
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
      },
    };
  }

  return { make, solve, mount, fresh, pick, settle, done, hint, hintPair, fit, mistakes, partner, faceName, faceHTML, fitGrid, PAIRS, GRACE, KINDS };
})();

BT.reg({
  id: 'memory', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: MM.make, mount: MM.mount, solve: MM.solve,
});
/* ---------- Brain Teasers: Copy Cat (P3-14; BRAIN_TEASERS.md 5.9, 7) ----------
   One registered type, `copycat`. The cat lights big pads one after the other, each with its own note (SFX.key); the child taps them
   back in the same order. Each round the sequence grows by one; the puzzle is won when the child copies the level's target length.
   Pads differ by shape, colour, place and sound (never colour alone): red circle, blue square, yellow triangle, green star, then
   purple heart and orange diamond.
     band  pads  start  target length, levels 1-4 / 5-8 / 9-12   light on + gap (ms, a little faster each level of a tier)
     A     4     1      3 / 4 / 4                                700 + 320
     B     4     2      4 / 5 / 5        (faster)                520 + 240
     C     6     2      5 / 5 / 6                                480 + 220
     D     6     3      6 / 4 / 5        levels 5-12 backwards   440 + 200
   R-01b: the targets stay within the typical span for the age plus about one, so the top levels are a stretch, not out of reach
   (spatial span norms, Gathercole, Pickering, Ambridge & Wearing 2004; Farrell Pagulayan et al. 2006; as quoted in the R-01 review:
   forward about 3-4 at age 5, about 5 at 8-9, 5-6 at 11; backward about 4-5 at 11). Pre-K/K top 4 (was 5), grades 1-2 top 5 (was 6),
   grades 3-4 top 6 (was 7), grades 5-6 forward 6 (was 7) and backward 4 then 5 (was 5 then 6). The sequence of a level is the
   same as before, only shorter (the first pads of the old one).
   (BRAIN_TEASERS 5.9 "star thresholds 4 / 6 / 8, scaled by band" became these target lengths: the frame's stars follow hints and
   mistakes, so the length is what a level asks for, and it grows with the band and the level, section 7 "steps".)
   The sequence is made once from the seeded rnd (same for a band, level and day): bands A and B never light the same pad twice in a
   row, C and D never three times. CC.expect(p, r) is what round r asks for (the first r pads, reversed in backwards mode) and
   CC.check(p, r, taps) says 'ok' (all of it), 'go' (right so far) or 'no'.
   A wrong pad: the pad rings amber, the line says "Oops! Watch again." with a soft sound, and the round is shown again a little
   slower (one mistake; allow 2). Hints (tier 1, 2, 3, then 3 again): 1 shows the round again, slower (the child starts the round
   again), 2 rings the next pad to tap, 3 taps the next pad for the child. Hints work while it is the child's turn.
   State (api.saveState after each round and each mistake): {r the round (its length), miss}; a resume shows that round again. */
const CC = (() => {
  const CFG = {
    A: { pads: 4, start: 1, len: [3, 4, 4], on: 700, gap: 320, rev: [0, 0, 0], run: 1 },
    B: { pads: 4, start: 2, len: [4, 5, 5], on: 520, gap: 240, rev: [0, 0, 0], run: 1 },
    C: { pads: 6, start: 2, len: [5, 5, 6], on: 480, gap: 220, rev: [0, 0, 0], run: 2 },
    D: { pads: 6, start: 3, len: [6, 4, 5], on: 440, gap: 200, rev: [0, 1, 1], run: 2 },
  };
  const NAMES = ['red circle', 'blue square', 'yellow triangle', 'green star', 'purple heart', 'orange diamond'];
  const TONE = { 4: [0, 2, 4, 7], 6: [0, 1, 2, 4, 5, 7] }; // SFX.key steps: C E G C, or C D E G A C
  const tier = L => (L <= 4 ? 0 : L <= 8 ? 1 : 2);

  function make(band, level, rnd) {
    const c = CFG[band], L = Math.max(1, Math.min(12, level | 0 || 1)), t = tier(L), len = c.len[t], seq = [];
    while (seq.length < len) {
      const v = Math.floor(rnd() * c.pads), n = seq.length;
      // no pad more than c.run times in a row
      if (n >= c.run && seq.slice(n - c.run).every(x => x == v)) continue;
      seq.push(v);
    }
    const fast = 15 * ((L - 1) % 4);
    return { band, pads: c.pads, start: Math.min(c.start, len), len, seq, rev: !!c.rev[t], on: c.on - fast, gap: c.gap - Math.round(fast / 3) };
  }
  // what round r asks for, and how a list of taps compares with it
  const expect = (p, r) => { const s = p.seq.slice(0, r); return p.rev ? s.reverse() : s; };
  function check(p, r, taps) {
    const e = expect(p, r);
    if (taps.length > e.length || taps.some((v, i) => v !== e[i])) return 'no';
    return taps.length == e.length ? 'ok' : 'go';
  }
  // every round's taps, from the first round to the target (tests and the smoke bot)
  const solve = p => { const out = []; for (let r = p.start; r <= p.len; r++) out.push(expect(p, r)); return out; };
  const fresh = p => ({ r: p.start, miss: 0 });
  const fit = (p, s) => !!s && typeof s == 'object' && !Array.isArray(s) && Number.isInteger(s.r) && s.r >= p.start && s.r <= p.len &&
    Number.isInteger(s.miss) && s.miss >= 0 && s.miss < 1000 && Object.keys(s).every(k => k == 'r' || k == 'miss');

  /* ---------- drawing: a shape on a pad, light from the top left (shadow, shade, base toward the light, gloss) ---------- */
  const f1 = x => Math.round(x * 10) / 10;
  const STAR = (() => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 17 : 38;
      d += (i ? 'L' : 'M') + f1(r * Math.cos(a)) + ' ' + f1(r * Math.sin(a) + 3);
    }
    return d + 'Z';
  })();
  const SHAPES = [
    { d: 'M-34 0A34 34 0 1 1 34 0A34 34 0 1 1 -34 0Z', g: 'M-21 -14A24 24 0 0 1 -8 -24' },
    { d: 'M-29 -29H29V29H-29Z', g: 'M-20 -20H-6' },
    { d: 'M0 -33L35 29H-35Z', g: 'M-8 -12L-16 3' },
    { d: STAR, g: 'M-9 -9L-4 -21' },
    { d: 'M0 33C-44 6 -38 -31 -17 -31C-7 -31 -1 -24 0 -17C1 -24 7 -31 17 -31C38 -31 44 6 0 33Z', g: 'M-26 -9C-27 -18 -22 -23 -15 -24' },
    { d: 'M0 -38L35 0L0 38L-35 0Z', g: 'M-20 -8L-9 -20' },
  ];
  const shape = i => {
    const s = SHAPES[i];
    return `<svg class="cc-sh" viewBox="-50 -50 100 100" aria-hidden="true"><path class="cc-sw" transform="translate(4 5)" d="${s.d}"/>` +
      `<path class="cc-sd" d="${s.d}"/><path class="cc-sb" transform="translate(-3 -3) scale(.86)" d="${s.d}"/>` +
      `<path class="cc-sg" transform="translate(-3 -3) scale(.86)" d="${s.g}"/></svg>`;
  };
  const cat = () => (typeof ART != 'undefined' && ART.cat ? picArt('cat', 44) : ico('paw', 32));

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    let alive = true, phase = 'wait', taps = [], lastW = 0, lastH = 0;
    const band = api.band || p.band, timers = new Set();
    const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); if (alive) f(); }, ms); timers.add(t); return t; };
    const stopAll = () => { timers.forEach(clearTimeout); timers.clear(); };
    const ASK = p.rev ? 'Watch the cat. Then tap the pads backwards: the last one first.' : 'Watch the cat. Then tap the pads in the same order.';
    el.innerHTML = `<div class="cc cc-n${p.pads}${p.rev ? ' cc-rev' : ''}"><div class="cc-say"><span class="cc-cat" aria-hidden="true">${cat()}</span>` +
      `<p class="cc-msg" role="status" aria-live="polite"></p>${UI.ibtn('speak', 'Hear what to do', { size: 'sm', cls: 'cc-spk' })}</div>` +
      `<div class="cc-bar"><span class="cc-rounds" role="img"></span>${p.rev ? UI.tag('Backwards', 'info', 'arrow-left') : ''}<span class="cc-steps" aria-hidden="true"></span></div>` +
      `<div class="cc-area"><div class="cc-pads" role="group" aria-label="Pads">` +
      Array.from({ length: p.pads }, (_, i) => `<button class="cc-pad cc-c${i}" data-p="${i}" aria-label="${NAMES[i]}"><span class="cc-lit"></span>${shape(i)}</button>`).join('') +
      `</div></div></div>`;
    const root = el.firstChild, padsEl = root.querySelector('.cc-pads'), area = root.querySelector('.cc-area'), pad = [...padsEl.children];
    const msgEl = root.querySelector('.cc-msg');
    const msg = (t, cls) => { msgEl.textContent = t; msgEl.className = 'cc-msg' + (cls ? ' ' + cls : ''); };
    root.querySelector('.cc-spk').onclick = () => api.say(ASK);
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      root.style.height = Math.max(300, el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom)) + 'px';
      lastW = el.clientWidth; lastH = el.clientHeight;
      const w = area.clientWidth, h = area.clientHeight, gap = 16;
      let best = { cols: 2, s: 0 };
      for (const cols of p.pads == 4 ? [2, 4] : [2, 3]) {
        const rows = Math.ceil(p.pads / cols), s = Math.min((w - (cols - 1) * gap) / cols, (h - (rows - 1) * gap) / rows);
        if (s > best.s) best = { cols, s };
      }
      padsEl.style.setProperty('--cols', best.cols);
      padsEl.style.setProperty('--ps', Math.max(64, Math.floor(Math.min(best.s, 230))) + 'px');
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    function bar() {
      const b = root.querySelector('.cc-rounds'), n = p.len - p.start + 1, k = st.r - p.start;
      b.innerHTML = Array.from({ length: n }, (_, i) => `<i class="${i < k ? 'on' : i == k ? 'now' : ''}"></i>`).join('');
      b.setAttribute('aria-label', `Round ${k + 1} of ${n}: ${st.r} ${st.r == 1 ? 'pad' : 'pads'}`);
      root.querySelector('.cc-steps').innerHTML = Array.from({ length: st.r }, (_, i) => `<i class="${i < taps.length ? 'on' : ''}"></i>`).join('');
    }
    function light(i, ms, cls = 'on') {
      const b = pad[i];
      b.classList.add(cls);
      if (cls == 'on') api.sfx.key(TONE[p.pads][i]);
      later(() => b.classList.remove(cls), ms);
    }
    const setTurn = on => { padsEl.classList.toggle('wait', !on); pad.forEach(b => b.setAttribute('aria-disabled', on ? 'false' : 'true')); };
    // show round st.r: the pads light one by one, then it is the child's turn
    function showRound(slow = 1) {
      stopAll();
      phase = 'show';
      taps = [];
      setTurn(false);
      pad.forEach(b => b.classList.remove('on', 'tip', 'no'));
      bar();
      msg(slow > 1.3 ? 'Watch slowly...' : 'Watch me!', '');
      const on = Math.round(p.on * slow), step = Math.round((p.on + p.gap) * slow);
      p.seq.slice(0, st.r).forEach((v, j) => later(() => light(v, on), 450 + j * step));
      later(() => {
        phase = 'input';
        setTurn(true);
        const w = p.rev ? (st.r > 1 ? 'Your turn! Backwards: last one first.' : 'Your turn!') : 'Your turn!';
        msg(w, 'turn');
        if (band == 'A') api.say('Your turn!');
      }, 450 + st.r * step);
    }
    function tap(i, byHint) {
      if (!alive || phase != 'input') return;
      pad.forEach(x => x.classList.remove('tip'));
      taps.push(i);
      light(i, 260);
      const r = check(p, st.r, taps);
      bar();
      if (r == 'no') {
        phase = 'wait';
        setTurn(false);
        st.miss++;
        api.saveState(st);
        pad[i].classList.add('no');
        api.sfx.del();
        msg('Oops! Watch again.', 'try');
        later(() => showRound(1.2), 1100);
        return;
      }
      if (byHint) pad[i].classList.add('tip');
      if (r == 'go') return;
      phase = 'wait';
      setTurn(false);
      if (st.r >= p.len) {
        msg(`You copied all ${p.len}!`, 'good');
        later(() => api.sfx.right(st.r), 300);
        later(() => api.win({ mistakes: st.miss, note: [`You copied ${p.len} pads in a row${p.rev ? ', backwards' : ''}.`] }), 600);
        return;
      }
      st.r++;
      api.saveState(st);
      msg(['Yes!', 'Well done!', 'Great copying!', 'Super!'][st.r % 4] + ` Now ${st.r}.`, 'good');
      later(() => api.sfx.right(st.r), 300);
      later(() => showRound(), 1300);
    }
    pad.forEach((b, i) => { b.onclick = () => tap(i); });
    layout();
    bar();
    setTurn(false);
    msg(ASK, '');
    if (band == 'A' || (band == 'B' && st.r == p.start && !st.miss)) api.say(ASK); // R-01b: band B speaks its first instruction too
    later(() => showRound(), band == 'A' || band == 'B' ? 2400 : 1200); // time to hear it before the cat starts
    return {
      hint(t) {
        if (!alive || phase != 'input') return false;
        const tier_ = Math.min(3, t || 1), next = expect(p, st.r)[taps.length];
        if (tier_ == 1) { showRound(1.7); return true; }
        if (tier_ == 2) {
          pad.forEach(b => b.classList.remove('tip'));
          pad[next].classList.add('tip');
          msg('Tap the ringed pad next.', 'hint');
          api.say('Tap the ' + NAMES[next] + ' next.');
          return true;
        }
        msg('Here is the next one.', 'hint');
        tap(next, true);
        return true;
      },
      destroy() {
        alive = false;
        stopAll();
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
      },
      // for the smoke bot and the shots: what is happening now
      now: () => ({ phase, r: st.r, taps: taps.slice() }),
    };
  }

  return { make, expect, check, solve, fresh, fit, mount, shape, CFG, NAMES, TONE };
})();

BT.reg({
  id: 'copycat', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: CC.make, mount: CC.mount, solve: CC.solve,
});
/* ---------- Brain Teasers: Cube Count (P3-16; BRAIN_TEASERS.md 5.11, 7) ----------
   One registered type, `cubes`, bands B C D. A puzzle is 3 stacks of cubes drawn in isometric view; the child counts each one and
   types the number on the number pad.
   A stack is a height map hm[x][y] (cubes stand in columns on a floor tray, nothing floats), so every cube is either seen or sits
   under a cube that is seen. The viewer looks from +x +y +z: x runs down to the right, y down to the left, the top faces are lit.
   A stack is only used when the drawing shows every column's height: the top face of every column is fully in view, and every
   empty floor square shows at least 40% of its floor (so no column can hide there). The count is then the sum of the heights.
   make() builds a stack from the front to the back: a column's view depends only on the columns in front of it, so each column gets
   a height that keeps its top (or its floor) in view.
     B (1-2)  up to 2 x 2 x 2: levels 1-4 one layer, 5-8 two layers, 9-12 two layers with a hidden cube
     C (3-4)  up to 3 x 3 x 3      D (5-6)  up to 4 x 4 x 4     (section 7: smallest to largest over the levels; more hidden cubes)
   Play: type a number, tap the tick. A wrong number counts one mistake (allow 1) and the line says so gently (try-ink, never red).
   Hints (per stack; the frame counts the tiers): 1 a nudge in words, 2 shows the stack layer by layer (5.11), each layer drawn
   on its own, 3 puts the number of cubes under each layer ("Add the layers: 4 + 2."). After that the stack has no more hints.
   Drawing: inline SVG, tokens only (src/css/49-bt-cubes.css): top face light (-1), left face base, right face shade (-2), edges deep
   (-3), on a grey floor tray with a white grid; light from the top left. Faces that touch another cube are left out.
   State (api.saveState): {i stack, miss, h hint tier of this stack}; CUB.fit rejects a state that does not belong to the puzzle. */
const CUB = (() => {
  const N = 3, C30 = Math.sqrt(3) / 2, K = 40;
  // per band, levels 1-4 / 5-8 / 9-12: [nx, ny, highest, fewest cubes, most cubes, fewest hidden cubes]
  const TIER = {
    B: [[2, 2, 1, 2, 4, 0], [2, 2, 2, 3, 6, 0], [2, 2, 2, 5, 8, 1]],
    C: [[2, 3, 2, 4, 9, 0], [3, 3, 2, 6, 13, 1], [3, 3, 3, 9, 20, 2]],
    D: [[3, 3, 3, 8, 17, 1], [3, 4, 3, 12, 24, 3], [4, 4, 4, 16, 36, 5]],
  };
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  const count = hm => hm.reduce((s, col) => s + col.reduce((a, b) => a + b, 0), 0);
  const H = (hm, x, y) => (x >= 0 && y >= 0 && x < hm.length && y < hm[0].length) ? hm[x][y] : 0;

  /* ---------- what the viewer sees (rays toward +x +y +z) ---------- */
  // does the ray from point (px, py, pz) toward the viewer enter a cube of the stack?
  function blocked(hm, px, py, pz) {
    for (let x = 0; x < hm.length; x++) for (let y = 0; y < hm[0].length; y++) {
      const h = hm[x][y];
      if (!h || x + 1 <= px || y + 1 <= py) continue;
      const lo = Math.max(x - px, y - py, 1e-6), hi = Math.min(x + 1 - px, y + 1 - py, h - pz);
      if (hi - lo > 1e-9) return true;
    }
    return false;
  }
  const SAMP = [0.08, 0.3, 0.5, 0.7, 0.92];
  // a point grid on the top face of column (x, y) at height z (or on its floor when z is 0): how many points are in view
  function seen(hm, x, y, z) {
    let n = 0;
    for (const s of SAMP) for (const t of SAMP) if (!blocked(hm, x + s, y + t, z)) n++;
    return n;
  }
  const ALL = SAMP.length * SAMP.length;
  // the floor of an empty square: points off its diagonal (a column in front covers one side of the diagonal exactly)
  function floorSeen(hm, x, y) {
    let n = 0;
    for (const s of SAMP) for (const t of SAMP) if (s != t && !blocked(hm, x + s, y + t, 0)) n++;
    return n;
  }
  // column (x, y) is readable: its top fully in view, or (empty) at least 40% of its floor in view
  const readable = (hm, x, y) => hm[x][y] ? seen(hm, x, y, hm[x][y]) == ALL : floorSeen(hm, x, y) >= 8;
  const valid = hm => hm.every((col, x) => col.every((_, y) => readable(hm, x, y)));
  // cubes with no face in view (they are there because they hold up the cubes above them)
  function hidden(hm) {
    let n = 0;
    for (let x = 0; x < hm.length; x++) for (let y = 0; y < hm[0].length; y++) for (let z = 0; z < hm[x][y]; z++) {
      // the three faces the viewer could see: top (z+1), right (x+1), left (y+1); a face against another cube is covered
      const top = z + 1 < hm[x][y] ? 0 : seen(hm, x, y, z + 1);
      let side = 0;
      for (const s of SAMP) for (const t of SAMP) {
        if (H(hm, x + 1, y) <= z && !blocked(hm, x + 1, y + s, z + t)) side++;
        if (H(hm, x, y + 1) <= z && !blocked(hm, x + s, y + 1, z + t)) side++;
      }
      if (!top && !side) n++;
    }
    return n;
  }

  /* ---------- make ---------- */
  // a stack nx x ny, columns up to hi tall, built from the front (big x + y) to the back
  function build(rnd, nx, ny, hi, q) {
    const hm = Array.from({ length: nx }, () => Array(ny).fill(0));
    const cells = [];
    for (let x = 0; x < nx; x++) for (let y = 0; y < ny; y++) cells.push([x, y]);
    cells.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]) || b[0] - a[0]);
    for (const [x, y] of cells) {
      const ok = [];
      for (let h = 0; h <= hi; h++) {
        hm[x][y] = h;
        if (readable(hm, x, y)) ok.push(h);
      }
      // the lowest height that keeps the column in view is likeliest (each step up halves the chance), an empty square is rarer
      const m = Math.min(...ok.filter(h => h > 0)), w = ok.map(h => h == 0 ? 0.3 : Math.pow(q, h - m)), tot = w.reduce((a, b) => a + b, 0);
      let r = rnd() * tot, k = 0;
      while (k < ok.length - 1 && (r -= w[k]) > 0) k++;
      hm[x][y] = ok[k];
    }
    return hm;
  }
  // the stack fills its footprint: some cube in the last row and in the last column (so a 3 x 3 stack is not really 2 x 2)
  const fills = hm => hm[hm.length - 1].some(h => h) && hm.some(col => col[col.length - 1]) && hm[0].some(h => h) && hm.some(col => col[0]);
  function stack(rnd, band, level, avoid) {
    const [nx, ny, hi, lo, most, hid] = TIER[band][tierOf(level)];
    let best = null;
    for (let t = 0; t < 400; t++) {
      // swap the footprint sides sometimes so a 3 x 4 tray also shows as 4 x 3
      const flip = nx != ny && rnd() < 0.5, hm = build(rnd, flip ? ny : nx, flip ? nx : ny, hi, 0.35 + 0.4 * rnd());
      const n = count(hm);
      if (!fills(hm) || n < lo || n > most || avoid.includes(JSON.stringify(hm))) continue;
      if (Math.max(...hm.map(c => Math.max(...c))) < hi) continue; // reach the band's height
      const hd = hidden(hm);
      if (hd >= hid) return { hm, n, hid: hd };
      if (!best) best = { hm, n, hid: hd };
    }
    return best;
  }
  function make(band, level, rnd) {
    const items = [], seen_ = [];
    for (let i = 0; i < N; i++) {
      const s = stack(rnd, band, level, seen_);
      seen_.push(JSON.stringify(s.hm));
      items.push({ hm: s.hm, n: s.n, hid: s.hid, c: Math.floor(rnd() * 6) });
    }
    // the stacks of a puzzle get three different colours
    for (let i = 1; i < N; i++) while (items.slice(0, i).some(o => o.c == items[i].c)) items[i].c = (items[i].c + 1) % 6;
    return { band, items };
  }
  const solve = p => p.items.map(it => it.n);
  // the layers bottom first: how many cubes each layer has
  const layers = hm => {
    const top = Math.max(...hm.map(c => Math.max(...c))), out = [];
    for (let z = 0; z < top; z++) out.push(hm.reduce((s, c) => s + c.filter(h => h > z).length, 0));
    return out;
  };
  const fresh = () => ({ i: 0, miss: 0, h: 0 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    return int(s.i, 0, p.items.length - 1) && int(s.miss, 0, 999) && int(s.h, 0, 3);
  }
  const HINT1 = 'Count one layer at a time, from the bottom up. Cubes under the ones you see are there too.';
  function hintText(it, t) {
    if (t == 1) return HINT1;
    if (t == 2) return 'Here is each layer on its own. Count the cubes in each one.';
    const L = layers(it.hm);
    return L.length == 1 ? `There is one layer of ${L[0]} cubes.` : `Add the layers: ${L.join(' + ')}.`;
  }

  /* ---------- drawing ---------- */
  const f1 = v => Math.round(v * 10) / 10;
  const pt = (x, y, z) => f1((x - y) * C30 * K) + ' ' + f1(((x + y) / 2 - z) * K);
  const poly = (cls, ps) => `<path class="${cls}" d="M${ps.map(p => pt(...p)).join('L')}Z"/>`;
  // the box around a footprint nx x ny, up to height top, in SVG units (tray included)
  function box(nx, ny, top) {
    const T = 0.3, xs = [-ny * C30 * K, nx * C30 * K], ys = [-top * K, ((nx + ny) / 2 + T) * K], pad = 4;
    return `${f1(xs[0] - pad)} ${f1(ys[0] - pad)} ${f1(xs[1] - xs[0] + 2 * pad)} ${f1(ys[1] - ys[0] + 2 * pad)}`;
  }
  function tray(nx, ny) {
    const T = 0.3;
    let g = poly('cb-ft', [[0, 0, 0], [nx, 0, 0], [nx, ny, 0], [0, ny, 0]]) +
      poly('cb-fr', [[nx, 0, 0], [nx, ny, 0], [nx, ny, -T], [nx, 0, -T]]) +
      poly('cb-fl', [[0, ny, 0], [nx, ny, 0], [nx, ny, -T], [0, ny, -T]]);
    let d = '';
    for (let x = 1; x < nx; x++) d += `M${pt(x, 0, 0)}L${pt(x, ny, 0)}`;
    for (let y = 1; y < ny; y++) d += `M${pt(0, y, 0)}L${pt(nx, y, 0)}`;
    return g + (d ? `<path class="cb-fg" d="${d}"/>` : '');
  }
  // the cubes back to front (x + y + z grows toward the viewer); a face against another cube is not drawn
  function cubes(hm) {
    const list = [];
    hm.forEach((col, x) => col.forEach((h, y) => { for (let z = 0; z < h; z++) list.push([x, y, z]); }));
    list.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]) || a[2] - b[2]);
    return list.map(([x, y, z]) => {
      let s = '';
      if (H(hm, x + 1, y) <= z) s += poly('cb-r', [[x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x + 1, y + 1, z], [x + 1, y, z]]);
      if (H(hm, x, y + 1) <= z) s += poly('cb-l', [[x, y + 1, z + 1], [x + 1, y + 1, z + 1], [x + 1, y + 1, z], [x, y + 1, z]]);
      if (z + 1 >= hm[x][y]) s += poly('cb-t', [[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]]);
      return s;
    }).join('');
  }
  function svg(hm, c, cls, top, label) {
    const nx = hm.length, ny = hm[0].length;
    return `<svg class="${cls}" viewBox="${box(nx, ny, top)}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>` +
      `<g class="cb-c${c}">${tray(nx, ny)}${cubes(hm)}</g></svg>`;
  }
  const draw = (it, label) => svg(it.hm, it.c, 'cb-svg', Math.max(...it.hm.map(c => Math.max(...c))), label);
  // layer z alone: the columns at least z + 1 tall, one cube high, drawn at the same scale as the other layers
  const layerSvg = (it, z) => svg(it.hm.map(c => c.map(h => h > z ? 1 : 0)), it.c, 'cb-lsvg', 1, '');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let typed = '', busy = 0, alive = true, msg = '', mk = '';
    const N_ = p.items.length;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.cb-msg');
      if (m) { m.textContent = t; m.className = 'cb-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const boxTxt = () => {
      const b = el.querySelector('.cb-box');
      if (b) { b.textContent = typed || '?'; b.classList.toggle('on', !!typed); }
    };
    function layersHTML(it) {
      if (st.h < 2) return '';
      const L = layers(it.hm);
      return `<div class="cb-layers" role="img" aria-label="The stack layer by layer">` + L.map((n, z) =>
        `<figure class="cb-ly">${layerSvg(it, z)}<figcaption>${z == 0 ? 'Bottom' : z == L.length - 1 ? 'Top' : 'Layer ' + (z + 1)}` +
        `${st.h >= 3 ? `<b>${n}</b>` : ''}</figcaption></figure>`).join('') + '</div>';
    }
    function render() {
      const it = p.items[st.i];
      const dots = p.items.map((_, i) => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad cb-pad"');
      el.innerHTML = `<div class="cb cb-${p.band}"><div class="cb-say"><p class="cb-msg" aria-live="polite"></p>` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'cb-spk' })}</div>` +
        `<div class="cb-main"><div class="cb-board">${draw(it, 'A stack of cubes')}</div>` +
        `<div class="cb-side">${layersHTML(it)}<div class="cb-ans"><span class="cb-dots" role="img" aria-label="Stack ${st.i + 1} of ${N_}">${dots}</span>` +
        `<span class="cb-box" aria-live="polite">?</span><span class="cb-unit">cubes</span></div>${pad}</div></div></div>`;
      el.querySelector('.cb-spk').onclick = () => api.say(msg);
      el.querySelectorAll('.cb-pad .k[data-k]').forEach(b => b.onclick = () => key(b.dataset.k));
      typed = '';
      boxTxt();
      say(msg || 'How many cubes are in the stack?', mk);
    }
    function key(k) {
      if (busy || !alive) return;
      if (k == 'del') { SFX.del(); typed = typed.slice(0, -1); return boxTxt(); }
      if (k != 'go') {
        if (typed.length >= 2 || typed == '0') return;
        SFX.key(+k);
        typed += k;
        return boxTxt();
      }
      if (!typed) return say('Type how many cubes, then tap the tick.', 'try');
      const it = p.items[st.i], b = el.querySelector('.cb-box');
      if (+typed !== it.n) {
        st.miss++;
        api.saveState(st);
        api.sfx.wrong();
        say(+typed < it.n ? (it.hid ? `Not ${typed}. Some cubes are hiding. Count again!` : `Not ${typed}. Count again!`) : // W13: flat stacks hide no cube
          `Not ${typed}. Count each cube just once.`, 'try');
        typed = '';
        boxTxt();
        b.classList.remove('no');
        void b.offsetWidth;
        b.classList.add('no');
        return;
      }
      b.classList.add('ok');
      api.sfx.right(st.i + 3);
      el.querySelector('.cb-board').classList.add('got');
      say(`Yes! ${it.n} cubes.`, 'good');
      const last = st.i == N_ - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0 };
      if (last) {
        api.win({ mistakes: st.miss, note: p.items.map((t, n) => `Stack ${n + 1}: ${t.n} cubes`) });
        return;
      }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) { msg = ''; mk = ''; render(); } }, 1200);
    }
    const hw = e => {
      if (!el.isConnected || document.querySelector('.bt-win,.sheet')) return;
      const k = /^\d$/.test(e.key) ? e.key : e.key == 'Backspace' ? 'del' : e.key == 'Enter' ? 'go' : null;
      if (k) { e.preventDefault(); key(k); }
    };
    document.addEventListener('keydown', hw);
    if (st.h) msg = hintText(p.items[st.i], st.h), mk = 'hint';
    render();
    if (p.band == 'B' && st.i == 0 && !st.miss && !st.h) api.say('How many cubes are in the stack?'); // R-01b: band B speaks its first instruction too
    return {
      hint() {
        if (busy || st.i >= N_ || st.h >= 3) return false;
        st.h++;
        api.saveState(st);
        const it = p.items[st.i];
        if (st.h >= 2) {
          const side = el.querySelector('.cb-side'), old = side.querySelector('.cb-layers');
          if (old) old.remove();
          side.insertAdjacentHTML('afterbegin', layersHTML(it));
        }
        say(hintText(it, st.h), 'hint', true);
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); document.removeEventListener('keydown', hw); },
    };
  }

  return { make, solve, mount, fit, fresh, layers, hintText, count, hidden, valid, readable, TIER, tierOf };
})();

BT.reg({
  id: 'cubes', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: CUB.make, mount: CUB.mount, solve: CUB.solve,
});
/* ---------- Brain Teasers: Shape Fit (P3-12; BRAIN_TEASERS.md 5.7, 7, 8) ----------
   Fill a grid region with polyomino pieces (2 to 5 squares each). Puzzles are made at run time by construction: a region is chosen
   (a rectangle on odd levels when the size allows one, otherwise a blob without holes), then cut into connected pieces of the band's
   sizes. The cut is the stored solution, so every puzzle is solvable; any tiling wins (SF.solved checks cells, not pieces).

   BANDS AND LEVELS (section 7, "size: smallest to largest"; SF.PLAN). The region grows with the level inside a band:
     A (PK-K)  2 pieces (levels 1-6), then 3; pieces of 2-4 squares; 4 to 11 squares in all; every piece already lies the right way
               (no turning) and the outline of every piece is drawn in the region.
     B (1-2)   3 pieces, then 4; 3-4 squares each; 9 to 16 squares; pieces come turned, so turning is needed; outlines on levels 1-4.
     C (3-4)   5 pieces, then 6; 3-5 squares; 16 to 28 squares; turning; no outlines.
     D (5-6)   7 pieces, then 8; 3-5 squares; 24 to 36 squares; turning and flipping (some pieces come mirrored); no outlines.
   Puzzle (JSON): {b band, w, h (the grid), reg: [[x, y] region squares], pcs: [{s: [[x, y]] the piece's squares as it lies in the
   solution (moved to 0,0), at: [x, y] where it goes, t: [r, f] how it starts in the tray}], ol: 1 when outlines show, turn, flip}.
   A piece's squares for [r, f]: mirrored left-right when f = 1, then turned r x 90 degrees clockwise, then moved back to 0,0 (SF.xf).

   STATE (api.saveState after every move; SF.fit refuses one that does not belong to the puzzle): {pc: per piece [r, f] (tray) or
   [r, f, x, y] (on the board, whole squares), h: the slot (solution piece) a hint is showing, or -1}.
   SOLVED (SF.solved): every piece on the board, every square of every piece inside the region and no square covered twice. The pieces
   add up to the region, so that is an exact cover, whichever way the child found it.

   INPUT (one svg, touch-action none, pointer events): drag a piece from the tray or the board; on drop it snaps to the nearest whole
   square, preferring a place where it fits (SF.snap). A drop on the tray puts it back. Tap a piece to pick it; tap it again to turn it
   90 degrees (bands B-D); Turn, Flip (band D) and Undo buttons; keys R, F, U. With a piece picked, a tap on the board moves it there
   (tap-then-tap, section 8). A piece that sticks out or lies on another gets an amber dashed ring (never red). No mistakes are counted.
   HINTS (5.7): 1) the outline of one slot glows yellow and its piece is picked; 2) that piece turns (and flips) the slot's way;
   3) it goes in, and a piece lying on that slot goes back to the tray. Tiers 1 and 2 never move a piece.
   The geometry helpers TG.outline (one outline path for a set of squares) and the tangram's colours and look are shared. */
const SF = (() => {
  const PLAN = {
    A: lv => ({ n: lv <= 6 ? 2 : 3, lo: 2, hi: 4, size: 4 + Math.round((lv - 1) * 7 / 11), turn: 0, flip: 0, ol: 1 }),
    B: lv => ({ n: lv <= 6 ? 3 : 4, lo: 3, hi: 4, size: 9 + Math.round((lv - 1) * 7 / 11), turn: 1, flip: 0, ol: lv <= 4 ? 1 : 0 }),
    C: lv => ({ n: lv <= 6 ? 5 : 6, lo: 3, hi: 5, size: 16 + Math.round((lv - 1) * 12 / 11), turn: 1, flip: 0, ol: 0 }),
    D: lv => ({ n: lv <= 6 ? 7 : 8, lo: 3, hi: 5, size: 24 + Math.round((lv - 1) * 12 / 11), turn: 1, flip: 1, ol: 0 }),
  };
  const MAXW = 7; // the grid is at most 7 squares wide and 7 high (44 px squares or more on a phone)
  const COLOUR = ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'light blue', 'purple'];
  const NB = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const K = (x, y) => x + ',' + y;

  /* ---------- squares ---------- */
  const norm = cs => {
    const mx = Math.min(...cs.map(c => c[0])), my = Math.min(...cs.map(c => c[1]));
    return cs.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  };
  // the squares of shape s turned r x 90 degrees clockwise (y down), mirrored first when f = 1, moved back to 0,0
  function xf(s, r, f) {
    let o = s.map(([x, y]) => [f ? -x : x, y]);
    for (let i = 0; i < r; i++) o = o.map(([x, y]) => [-y, x]);
    return norm(o);
  }
  const key = cs => norm(cs).map(c => c.join(',')).join(';');
  const cellsOf = (p, i, e) => xf(p.pcs[i].s, e[0], e[1]).map(([x, y]) => [x + e[2], y + e[3]]);
  const slotCells = (p, s) => p.pcs[s].s.map(([x, y]) => [x + p.pcs[s].at[0], y + p.pcs[s].at[1]]);

  /* ---------- making a puzzle ---------- */
  // a connected blob of n squares inside MAXW x MAXW with no holes, grown from the middle, preferring squares with more neighbours
  function blob(n, rnd) {
    for (let at = 0; at < 60; at++) {
      const c = Math.floor(MAXW / 2), got = new Set([K(c, c)]), list = [[c, c]];
      while (list.length < n) {
        const fr = [];
        for (const [x, y] of list) for (const [dx, dy] of NB) {
          const a = x + dx, b = y + dy;
          if (a < 0 || b < 0 || a >= MAXW || b >= MAXW || got.has(K(a, b)) || fr.some(q => q[0] == a && q[1] == b)) continue;
          const w = NB.filter(([ex, ey]) => got.has(K(a + ex, b + ey))).length;
          fr.push([a, b, w * w + rnd() * 2]);
        }
        fr.sort((p, q) => q[2] - p[2]);
        const pick = fr[Math.floor(rnd() * Math.min(3, fr.length))];
        got.add(K(pick[0], pick[1]));
        list.push([pick[0], pick[1]]);
      }
      if (!holes(list)) return norm(list);
    }
    return null;
  }
  // does a set of squares enclose a hole? (flood the outside of its box, one square wider)
  function holes(cs) {
    const set = new Set(cs.map(c => K(...c))), xs = cs.map(c => c[0]), ys = cs.map(c => c[1]);
    const x0 = Math.min(...xs) - 1, x1 = Math.max(...xs) + 1, y0 = Math.min(...ys) - 1, y1 = Math.max(...ys) + 1;
    const seen = new Set([K(x0, y0)]), st = [[x0, y0]];
    while (st.length) {
      const [x, y] = st.pop();
      for (const [dx, dy] of NB) {
        const a = x + dx, b = y + dy;
        if (a < x0 || b < y0 || a > x1 || b > y1 || seen.has(K(a, b)) || set.has(K(a, b))) continue;
        seen.add(K(a, b));
        st.push([a, b]);
      }
    }
    return seen.size + set.size < (x1 - x0 + 1) * (y1 - y0 + 1);
  }
  // the region: a rectangle (odd levels, when one at most MAXW wide with sides 2+ and a ratio of 3 or less fits), else a blob
  function region(n, level, rnd) {
    if (level % 2) {
      const opt = [];
      for (let w = 2; w <= MAXW; w++) if (n % w == 0) { const h = n / w; if (h >= 2 && h <= MAXW && Math.max(w, h) <= 3 * Math.min(w, h)) opt.push([w, h]); }
      if (opt.length) {
        opt.sort((a, b) => Math.abs(a[0] - a[1]) - Math.abs(b[0] - b[1]));
        const [w, h] = opt[Math.min(opt.length - 1, Math.floor(rnd() * Math.min(2, opt.length)))];
        const out = [];
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out.push([x, y]);
        return out;
      }
    }
    return blob(n, rnd);
  }
  const connected = cs => {
    if (!cs.length) return true;
    const set = new Set(cs.map(c => K(...c))), seen = new Set([K(...cs[0])]), st = [cs[0]];
    while (st.length) {
      const [x, y] = st.pop();
      for (const [dx, dy] of NB) { const k = K(x + dx, y + dy); if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([x + dx, y + dy]); } }
    }
    return seen.size == set.size;
  };
  // cut the region into n connected pieces with sizes lo..hi (adding up to the region); the remaining squares stay connected
  function cut(reg, n, lo, hi, rnd) {
    const T = reg.length;
    for (let at = 0; at < 300; at++) {
      const sizes = new Array(n).fill(lo);
      let left = T - n * lo;
      while (left > 0) { const i = Math.floor(rnd() * n); if (sizes[i] < hi) { sizes[i]++; left--; } }
      const free = new Set(reg.map(c => K(...c))), pieces = [];
      const freeN = (x, y) => NB.filter(([dx, dy]) => free.has(K(x + dx, y + dy))).length;
      let ok = true;
      for (let i = 0; i < n && ok; i++) {
        if (i == n - 1) { const rest = [...free].map(k => k.split(',').map(Number)); if (rest.length != sizes[i]) ok = false; else pieces.push(rest); break; }
        const cand = [...free].map(k => k.split(',').map(Number)).map(([x, y]) => [x, y, freeN(x, y) + rnd()]);
        cand.sort((a, b) => a[2] - b[2]);
        const piece = [[cand[0][0], cand[0][1]]];
        free.delete(K(cand[0][0], cand[0][1]));
        while (piece.length < sizes[i]) {
          const fr = [];
          for (const [x, y] of piece) for (const [dx, dy] of NB) {
            const a = x + dx, b = y + dy;
            if (free.has(K(a, b)) && !fr.some(q => q[0] == a && q[1] == b)) fr.push([a, b, freeN(a, b) + rnd() * 1.5]);
          }
          if (!fr.length) { ok = false; break; }
          fr.sort((a, b) => a[2] - b[2]);
          const q = fr[0];
          piece.push([q[0], q[1]]);
          free.delete(K(q[0], q[1]));
        }
        if (ok && !connected([...free].map(k => k.split(',').map(Number)))) ok = false;
        if (ok) pieces.push(piece);
      }
      if (ok && pieces.length == n) return pieces;
    }
    return null;
  }
  // the turns a shape can take that look different (a square piece has one, a bar two, ...)
  function forms(s, flip) {
    const seen = new Set(), out = [];
    for (let f = 0; f < (flip ? 2 : 1); f++) for (let r = 0; r < 4; r++) { const k = key(xf(s, r, f)); if (!seen.has(k)) { seen.add(k); out.push([r, f]); } }
    return out;
  }
  function make(band, level, rnd) {
    const plan = PLAN[band](level);
    for (let at = 0; at < 40; at++) {
      const reg = region(plan.size, level + at, rnd);
      if (!reg) continue;
      const pieces = cut(reg, plan.n, plan.lo, plan.hi, rnd);
      if (!pieces) continue;
      const pcs = pieces.map(cs => {
        const s = norm(cs), at = [Math.min(...cs.map(c => c[0])), Math.min(...cs.map(c => c[1]))];
        let t = [0, 0];
        if (plan.turn) {
          // start turned (and in band D sometimes mirrored) so that it does not already lie the right way, when the shape allows it
          const f = plan.flip && rnd() < 0.5 ? 1 : 0;
          const want = key(s), opts = [0, 1, 2, 3].filter(r => key(xf(s, r, f)) != want);
          t = [opts.length ? opts[Math.floor(rnd() * opts.length)] : Math.floor(rnd() * 4), f];
        }
        return { s, at, t };
      });
      const xs = reg.map(c => c[0]), ys = reg.map(c => c[1]);
      return { b: band, lv: level, w: Math.max(...xs) + 1, h: Math.max(...ys) + 1, reg, pcs, ol: plan.ol, turn: plan.turn, flip: plan.flip };
    }
    throw new Error('shapefit: no puzzle');
  }

  /* ---------- state, checks, snapping ---------- */
  const fresh = p => ({ pc: p.pcs.map(q => [q.t[0], q.t[1]]), h: -1 });
  function fit(p, st) {
    if (!st || typeof st != 'object' || Array.isArray(st) || !Array.isArray(st.pc) || st.pc.length != p.pcs.length) return false;
    for (let i = 0; i < p.pcs.length; i++) {
      const e = st.pc[i], t = p.pcs[i].t;
      if (!Array.isArray(e) || (e.length != 2 && e.length != 4)) return false;
      if (!Number.isInteger(e[0]) || e[0] < 0 || e[0] > 3 || (e[1] !== 0 && e[1] !== 1)) return false;
      if (!p.turn && e[0] != t[0]) return false;
      if (!p.flip && e[1] != t[1]) return false;
      if (e.length == 4 && !(Number.isInteger(e[2]) && Number.isInteger(e[3]) && e[2] >= -5 && e[3] >= -5 && e[2] <= p.w + 5 && e[3] <= p.h + 5)) return false;
    }
    if (!Number.isInteger(st.h) || st.h < -1 || st.h >= p.pcs.length) return false;
    return true;
  }
  const regSet = p => new Set(p.reg.map(c => K(...c)));
  // squares of the other pieces on the board
  function taken(p, st, skip) {
    const out = new Map();
    st.pc.forEach((e, j) => { if (j != skip && e.length == 4) for (const c of cellsOf(p, j, e)) out.set(K(...c), j); });
    return out;
  }
  // does piece i lie at e inside the region, on no other piece?
  function fits(p, st, i, e) {
    const R = regSet(p), T = taken(p, st, i);
    return cellsOf(p, i, e).every(c => R.has(K(...c)) && !T.has(K(...c)));
  }
  function solved(p, st) {
    if (!st.pc.every(e => e.length == 4)) return false;
    const R = regSet(p), seen = new Set();
    for (let i = 0; i < p.pcs.length; i++) for (const c of cellsOf(p, i, st.pc[i])) {
      const k = K(...c);
      if (!R.has(k) || seen.has(k)) return false;
      seen.add(k);
    }
    return seen.size == R.size;
  }
  // where piece i (turn r, flip f) lands when dropped with its corner at (x, y) in squares (not whole numbers):
  // the whole-square places within `tol` squares, a place where it fits first, then the nearest; {x, y, ok}
  function snap(p, st, i, r, f, x, y, tol = 0.8) {
    let best = null;
    for (let a = Math.floor(x - tol); a <= Math.ceil(x + tol); a++) for (let b = Math.floor(y - tol); b <= Math.ceil(y + tol); b++) {
      const d = Math.hypot(a - x, b - y);
      if (d > tol + 1e-9) continue;
      const ok = fits(p, st, i, [r, f, a, b]), s = [ok ? 1 : 0, -d];
      if (!best || s[0] > best.s[0] || (s[0] == best.s[0] && s[1] > best.s[1])) best = { s, x: a, y: b, ok };
    }
    if (!best) { const a = Math.round(x), b = Math.round(y); return { x: a, y: b, ok: fits(p, st, i, [r, f, a, b]) }; }
    return { x: best.x, y: best.y, ok: best.ok };
  }
  // the middle of a piece in squares, and the corner that keeps a turned or flipped piece's middle where it was
  const midOf = cs => [cs.reduce((s, c) => s + c[0] + 0.5, 0) / cs.length, cs.reduce((s, c) => s + c[1] + 0.5, 0) / cs.length];
  function about(p, i, e, r2, f2) {
    const m = midOf(cellsOf(p, i, e)), m2 = midOf(xf(p.pcs[i].s, r2, f2));
    return [Math.round(m[0] - m2[0]), Math.round(m[1] - m2[1])];
  }

  /* ---------- hints ---------- */
  // which slots are filled exactly by some piece, and by which
  function filled(p, st) {
    const by = new Array(p.pcs.length).fill(-1), used = new Set();
    for (let s = 0; s < p.pcs.length; s++) {
      const want = slotCells(p, s).map(c => K(...c)).sort().join('|');
      for (let j = 0; j < p.pcs.length; j++) {
        if (used.has(j) || st.pc[j].length != 4) continue;
        if (cellsOf(p, j, st.pc[j]).map(c => K(...c)).sort().join('|') == want) { by[s] = j; used.add(j); break; }
      }
    }
    return { by, used };
  }
  // the turn [r, f] that makes piece j lie like slot s, keeping what the band cannot change; or null
  function orient(p, st, j, s) {
    const e = st.pc[j], want = key(p.pcs[s].s);
    for (let f = 0; f < 2; f++) for (let r = 0; r < 4; r++) {
      if (!p.turn && r != e[0]) continue;
      if (!p.flip && f != e[1]) continue;
      if (key(xf(p.pcs[j].s, r, f)) == want) return [r, f];
    }
    return null;
  }
  function hintTarget(p, st) {
    const { by, used } = filled(p, st);
    const inTray = j => st.pc[j].length == 2;
    const pieceFor = s => {
      const c = p.pcs.map((q, j) => j).filter(j => !used.has(j) && orient(p, st, j, s));
      const pref = [s].concat(c.filter(inTray), c);
      return pref.find(j => c.includes(j)) != null ? pref.find(j => c.includes(j)) : -1;
    };
    if (st.h >= 0 && by[st.h] < 0 && pieceFor(st.h) >= 0) return { s: st.h, i: pieceFor(st.h) };
    const order = p.pcs.map((q, s) => s).sort((a, b) => p.pcs[b].s.length - p.pcs[a].s.length || a - b);
    const open = order.filter(s => by[s] < 0 && pieceFor(s) >= 0);
    if (!open.length) return null;
    const s = open.find(x => inTray(pieceFor(x))) != null ? open.find(x => inTray(pieceFor(x))) : open[0];
    return { s, i: pieceFor(s) };
  }
  function hint(p, st, tier) {
    const tg = hintTarget(p, st);
    if (!tg) return null;
    const n = JSON.parse(JSON.stringify(st)), { s, i } = tg, e = n.pc[i], o = orient(p, st, i, s), back = [];
    n.h = s;
    if (tier == 2) {
      if (e.length == 2) n.pc[i] = [o[0], o[1]];
      else { const [x, y] = about(p, i, e, o[0], o[1]); n.pc[i] = [o[0], o[1], x, y]; }
    } else if (tier >= 3) {
      const sc = slotCells(p, s), at = [Math.min(...sc.map(c => c[0])), Math.min(...sc.map(c => c[1]))];
      n.pc[i] = [o[0], o[1], at[0], at[1]];
      n.h = -1;
      const want = new Set(sc.map(c => K(...c)));
      n.pc.forEach((q, j) => {
        if (j == i || q.length != 4) return;
        if (cellsOf(p, j, q).some(c => want.has(K(...c)))) { n.pc[j] = [q[0], q[1]]; back.push(j); }
      });
    }
    return { st: n, s, i, tier, back };
  }
  // the moves that win (tests and the smoke bot): every piece to its own slot, the way it lies there: [i, r, f, x, y]
  const solve = p => p.pcs.map((q, i) => [i, 0, 0, q.at[0], q.at[1]]);

  return { PLAN, MAXW, COLOUR, norm, xf, key, cellsOf, slotCells, blob, holes, region, connected, cut, forms, make, fresh, fit, fits, solved,
    snap, midOf, about, filled, orient, hintTarget, hint, solve, cur: null };
})();

/* ---------- the screen ---------- */
SF.mount = function (el, p, api) {
  const band = p.b || api.band, n = p.pcs.length, all = p.pcs.map((q, i) => i), timers = new Set();
  const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };
  let st = api.loadState();
  if (!SF.fit(p, st)) st = SF.fresh(p);
  let sel = -1, drag = null, done = false, msg = '', undo = [], z = all.slice(), tip = -1;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const intro = band == 'A' ? 'Drag the pieces into the shape. Each one has its own place.'
    : `Fill the shape with all ${n} pieces. Drag them in. Tap a piece, then tap it again to turn it.` + (p.flip ? ' Flip turns it over.' : '');

  el.innerHTML = `<div class="sf tg sf-${band}"><div class="tg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'tg-spk' })}` +
    `<p class="tg-msg" aria-live="polite"></p></div><div class="tg-main"><svg class="tg-svg sf-svg" role="img" aria-label="Shape Fit: fill the shape"></svg></div>` +
    `<div class="tg-ctl">${UI.btn('Turn', { icon: 'rotate', cls: 'tg-turn' })}${UI.btn('Flip', { icon: 'flip', cls: 'tg-flip' })}` +
    `${UI.btn('Undo', { icon: 'undo', cls: 'tg-undo' })}</div></div>`;
  const root = el.querySelector('.sf'), svg = root.querySelector('.sf-svg'), main = root.querySelector('.tg-main');
  const say_ = root.querySelector('.tg-say'), ctl = root.querySelector('.tg-ctl'), msgEl = root.querySelector('.tg-msg');
  const bTurn = root.querySelector('.tg-turn'), bFlip = root.querySelector('.tg-flip'), bUndo = root.querySelector('.tg-undo');
  if (!p.turn) bTurn.hidden = true;
  const side = document.createElement('div');
  side.className = 'tg-side';
  root.append(side);
  function tell(text, kind, speak) {
    msg = text;
    msgEl.textContent = text;
    msgEl.className = 'tg-msg' + (kind ? ' ' + kind : '');
    if (speak) api.say(text);
  }
  root.querySelector('.tg-spk').onclick = () => { try { say(msg); } catch (e) {} };

  /* ---------- svg layers ---------- */
  const mk = (tag, cls, parent) => { const e = document.createElementNS(SVGNS, tag); if (cls) e.setAttribute('class', cls); if (parent) parent.append(e); return e; };
  const gBoard = mk('rect', 'tg-board', svg), gTray = mk('rect', 'tg-tray', svg);
  const regEl = mk('path', 'sf-reg', svg), gridEl = mk('path', 'sf-grid', svg), edgeEl = mk('path', 'sf-edge', svg);
  const gOl = mk('g', 'sf-ols', svg), hintEl = mk('path', 'tg-hl', svg), gPcs = mk('g', 'tg-pcs', svg);
  const PE = all.map(i => {
    const g = mk('g', `tg-pc sf-pc sf-c${i % 8}`, gPcs), a = mk('g', 'tg-pa', g);
    g.dataset.i = i;
    g.style.setProperty('--d', i * 60 + 'ms');
    return { g, sh: mk('path', 'tg-sh', a), ld: mk('path', 'tg-ld', a), bs: mk('path', 'tg-bs', a), hi: mk('path', 'tg-hi', a), rg: mk('path', 'tg-rg', a) };
  });

  /* ---------- layout (the tangram's: board on top or left, tray below or right) ---------- */
  let W = 300, Hh = 300, u = 40, ox = 0, oy = 0, board = null, tray = null, ut = 20, cells = {}, lastW = 0, lastH = 0;
  const loopD = (cs, f) => TG.outline(cs.map(([x, y]) => [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]]))
    .map(l => 'M' + l.map(q => f(q).map(v => v.toFixed(1)).join(' ')).join('L') + 'Z').join('');
  function arrange(land) {
    if (land) { root.append(main, side); side.append(say_, ctl); } else root.append(say_, main, ctl);
    root.classList.toggle('land', land);
  }
  const box = cs => [Math.max(...cs.map(c => c[0])) + 1, Math.max(...cs.map(c => c[1])) + 1];
  function packTray(s) {
    const out = {}, rows = [];
    let row = { w: 0, h: 0, items: [] };
    const hOf = i => box(SF.xf(p.pcs[i].s, st.pc[i][0], st.pc[i][1]))[1];
    for (const i of all.filter(j => st.pc[j].length == 2).sort((a, b) => hOf(b) - hOf(a) || a - b)) { // tallest first: rows waste less
      const b = box(SF.xf(p.pcs[i].s, st.pc[i][0], st.pc[i][1])), cw = Math.max(56, Math.ceil(b[0] * s + 14)), ch = Math.max(56, Math.ceil(b[1] * s + 14));
      if (row.items.length && row.w + cw > tray.w - 12) { rows.push(row); row = { w: 0, h: 0, items: [] }; }
      row.items.push([i, cw]);
      row.w += cw;
      row.h = Math.max(row.h, ch);
    }
    rows.push(row);
    const th = rows.reduce((a, r) => a + r.h, 0);
    let y = tray.y + (tray.h - th) / 2;
    for (const r of rows) {
      let x = tray.x + (tray.w - r.w) / 2;
      for (const [i, c] of r.items) { out[i] = { x, y, w: c, h: r.h, cx: x + c / 2, cy: y + r.h / 2 }; x += c; }
      y += r.h;
    }
    return { fits: th <= tray.h - 8 && rows.every(r => r.w <= tray.w - 12 + 1e-6), cells: out };
  }
  function packAll() {
    let lo = 6, hi = Math.max(6, u);
    if (packTray(hi).fits) lo = hi;
    else for (let it = 0; it < 16; it++) { const m = (lo + hi) / 2; if (packTray(m).fits) lo = m; else hi = m; }
    ut = lo;
    cells = packTray(ut).cells;
  }
  function layout() {
    if (!el.isConnected) return;
    const ps = getComputedStyle(el);
    const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
    const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
    lastW = el.clientWidth; lastH = el.clientHeight;
    const land = aw > ah * 1.15 && aw >= 640, gap = 10, pad = 14, few = n <= 3;
    arrange(land);
    if (land) { W = Math.floor(aw - side.offsetWidth - 16); Hh = Math.floor(ah); }
    else { W = Math.floor(aw); Hh = Math.floor(ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap); }
    W = Math.max(240, W); Hh = Math.max(240, Hh);
    if (land) {
      const need = Math.ceil(p.w * (Hh - 2 * pad) / p.h + 2 * pad), tw = Math.max(Math.round(W * (few ? 0.28 : 0.38)), W - gap - need);
      board = { x: 0, y: 0, w: W - tw - gap, h: Hh };
      tray = { x: W - tw, y: 0, w: tw, h: Hh };
    } else {
      const need = Math.ceil(p.h * (W - 2 * pad) / p.w + 2 * pad), th = Math.min(Math.round(Hh * 0.5), Math.max(Math.round(Hh * (few ? 0.28 : n >= 6 ? 0.4 : 0.36)), Hh - gap - need));
      board = { x: 0, y: 0, w: W, h: Hh - th - gap };
      tray = { x: 0, y: Hh - th, w: W, h: th };
    }
    u = Math.min((board.w - 2 * pad) / p.w, (board.h - 2 * pad) / p.h, 80);
    ox = board.x + (board.w - p.w * u) / 2;
    oy = board.y + (board.h - p.h * u) / 2;
    svg.setAttribute('width', W);
    svg.setAttribute('height', Hh);
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    const rr = (e, r) => { e.setAttribute('x', r.x + 2); e.setAttribute('y', r.y + 2); e.setAttribute('width', r.w - 4); e.setAttribute('height', r.h - 4); e.setAttribute('rx', 20); };
    rr(gBoard, board);
    rr(gTray, tray);
    const d = loopD(p.reg, px);
    regEl.setAttribute('d', d);
    edgeEl.setAttribute('d', d);
    gridEl.setAttribute('d', p.reg.map(([x, y]) => { const a = px([x, y]); return `M${a[0].toFixed(1)} ${a[1].toFixed(1)}h${u.toFixed(1)}v${u.toFixed(1)}h${(-u).toFixed(1)}Z`; }).join(''));
    gOl.innerHTML = '';
    if (p.ol) for (const i of all) { const e = mk('path', 'sf-ol', gOl); e.setAttribute('d', loopD(SF.slotCells(p, i), px)); }
    draw();
  }
  const px = q => [ox + q[0] * u, oy + q[1] * u];
  const unit = (x, y) => [(x - ox) / u, (y - oy) / u];

  /* ---------- drawing ---------- */
  // the piece's squares in px space: on the board, in its tray cell, or lifted under the finger (board size)
  function placePx(i) {
    const e = st.pc[i], sh = SF.xf(p.pcs[i].s, e[0], e[1]);
    if (drag && drag.i == i && drag.moved) {
      const m = SF.midOf(sh);
      return { cs: sh, f: q => [drag.x + drag.gx + (q[0] - m[0]) * u, drag.y + drag.gy + (q[1] - m[1]) * u], s: u };
    }
    if (e.length == 4) return { cs: sh.map(([x, y]) => [x + e[2], y + e[3]]), f: px, s: u };
    const b = box(sh), c = cells[i];
    return { cs: sh, f: q => [c.cx + (q[0] - b[0] / 2) * ut, c.cy + (q[1] - b[1] / 2) * ut], s: ut };
  }
  // the light edges of a piece: the sides facing up or left, a little inside
  function litD(cs, f, s) {
    const set = new Set(cs.map(c => c[0] + ',' + c[1])), ins = Math.max(2, s * 0.08);
    let d = '';
    for (const [x, y] of cs) {
      if (!set.has(x + ',' + (y - 1))) { const a = f([x, y]), b = f([x + 1, y]); d += `M${(a[0] + ins).toFixed(1)} ${(a[1] + ins).toFixed(1)}H${(b[0] - ins).toFixed(1)}`; }
      if (!set.has((x - 1) + ',' + y)) { const a = f([x, y]), b = f([x, y + 1]); d += `M${(a[0] + ins).toFixed(1)} ${(a[1] + ins).toFixed(1)}V${(b[1] - ins).toFixed(1)}`; }
    }
    return d;
  }
  function drawPiece(i, bad) {
    const E = PE[i], P = placePx(i), lifted = drag && drag.i == i && drag.moved, inTray = st.pc[i].length == 2 && !lifted;
    const lw = Math.max(2, Math.min(5, P.s * 0.07));
    const d = loopD(P.cs, P.f);
    E.bs.setAttribute('d', d);
    E.rg.setAttribute('d', d);
    E.ld.setAttribute('d', loopD(P.cs, q => { const a = P.f(q); return [a[0], a[1] + lw]; }));
    E.sh.setAttribute('d', loopD(P.cs, q => { const a = P.f(q); return [a[0] + 7, a[1] + 10]; }));
    E.hi.setAttribute('d', litD(P.cs, P.f, P.s));
    E.g.classList.toggle('lift', !!lifted);
    E.g.classList.toggle('sel', i == sel);
    E.g.classList.toggle('bad', !!bad);
    E.g.classList.toggle('tip', i == tip);
    E.g.classList.toggle('intray', inTray);
  }
  function draw() {
    if (!board) return;
    packAll();
    const busy = drag && drag.moved;
    for (const i of all) drawPiece(i, !busy && !done && st.pc[i].length == 4 && !SF.fits(p, st, i, st.pc[i]));
    for (const i of z) gPcs.append(PE[i].g);
    if (sel >= 0) gPcs.append(PE[sel].g);
    if (drag && drag.moved) gPcs.append(PE[drag.i].g);
    if (st.h >= 0 && !done) { hintEl.setAttribute('d', loopD(SF.slotCells(p, st.h), px)); hintEl.style.display = ''; }
    else hintEl.style.display = 'none';
    bTurn.disabled = sel < 0 || done;
    bFlip.hidden = !(p.flip && sel >= 0);
    bUndo.disabled = !undo.length || done;
  }

  /* ---------- moves ---------- */
  const store = () => api.saveState(st);
  const remember = () => { undo.push(JSON.stringify(st)); if (undo.length > 40) undo.shift(); };
  const toTop = i => { z = z.filter(j => j != i); z.push(i); };
  const nameOf = i => `${SF.COLOUR[i % 8]} piece`;
  function after(i, res) {
    tip = -1;
    if (SF.solved(p, st)) return finish();
    if (res && st.pc[i].length == 4) {
      if (!res.ok) tell(`The ${nameOf(i)} sticks out or lies on another piece. Move it or turn it.`, 'try');
      else {
        api.sfx.pop(2);
        const left = all.filter(j => st.pc[j].length == 2).length;
        tell(left ? `Good! ${left} more ${left == 1 ? 'piece' : 'pieces'} to go.` : 'All the pieces are out. Fix the ones that do not fit.', '');
      }
    }
  }
  function place(i, r, f, x, y) {
    const res = SF.snap(p, st, i, r, f, x, y);
    st.pc[i] = [r, f, res.x, res.y];
    if (st.h >= 0 && SF.filled(p, st).by[st.h] >= 0) st.h = -1;
    toTop(i);
    return res;
  }
  function turn(i, flip) {
    if (done || i < 0) return;
    if (flip ? !p.flip : !p.turn) return;
    remember();
    const e = st.pc[i], r2 = flip ? e[0] : (e[0] + 1) % 4, f2 = flip ? 1 - e[1] : e[1];
    // flipping a turned piece over (left-right on the screen) is the mirrored piece turned the other way
    const R = flip ? (4 - e[0]) % 4 : r2;
    api.sfx.click();
    let res = null;
    if (e.length == 2) st.pc[i] = [R, f2];
    else { const [x, y] = SF.about(p, i, e, R, f2); res = place(i, R, f2, x, y); }
    sel = i;
    if (!res) tell(flip ? 'Flipped over.' : 'Turned. Tap again to keep turning.', '');
    after(i, res);
    store();
    draw();
  }
  function moveTo(i, cx, cy) { // the piece's middle to (cx, cy) in px
    if (done) return;
    remember();
    const e = st.pc[i], sh = SF.xf(p.pcs[i].s, e[0], e[1]), m = SF.midOf(sh);
    const qx = Math.max(board.x + 4, Math.min(board.x + board.w - 4, cx)), qy = Math.max(board.y + 4, Math.min(board.y + board.h - 4, cy));
    const [ux, uy] = unit(qx, qy);
    const res = place(i, e[0], e[1], ux - m[0], uy - m[1]);
    after(i, res);
    store();
  }
  function toTray(i) {
    remember();
    st.pc[i] = [st.pc[i][0], st.pc[i][1]];
    tell('Back in the tray.', '');
    store();
  }
  function finish() {
    done = true;
    sel = -1;
    st.h = -1;
    root.classList.add('won');
    api.sfx.chime();
    tell('You filled the whole shape!', 'good', true);
    store();
    draw();
    api.win({ mistakes: 0 });
  }

  /* ---------- pointer input ---------- */
  function hit(x, y) {
    const order = z.slice().reverse();
    if (sel >= 0) order.unshift(sel);
    for (const i of order) { // board pieces first, the top one first, with a margin of 10 px
      const e = st.pc[i];
      if (e.length != 4) continue;
      const [ux, uy] = unit(x, y), m = 10 / u;
      if (SF.cellsOf(p, i, e).some(([a, b]) => ux >= a - m && ux <= a + 1 + m && uy >= b - m && uy <= b + 1 + m)) return i;
    }
    for (const i of all) { const c = cells[i]; if (c && st.pc[i].length == 2 && x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) return i; }
    return -1;
  }
  const pos = e => { const r = svg.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const inRect = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  const midPx = i => { const P = placePx(i), m = SF.midOf(P.cs); return P.f(m); };
  svg.addEventListener('pointerdown', e => {
    if (done || drag) return;
    e.preventDefault();
    try { svg.setPointerCapture(e.pointerId); } catch (er) {}
    const [x, y] = pos(e), i = hit(x, y);
    let gx = 0, gy = 0;
    if (i >= 0 && st.pc[i].length == 4) { const c = midPx(i); gx = c[0] - x; gy = c[1] - y; }
    drag = { id: e.pointerId, i, sx: x, sy: y, x, y, gx, gy, moved: false };
  });
  svg.addEventListener('pointermove', e => {
    if (!drag || e.pointerId != drag.id) return;
    const [x, y] = pos(e);
    drag.x = x; drag.y = y;
    if (!drag.moved && Math.hypot(x - drag.sx, y - drag.sy) > 7 && drag.i >= 0) {
      drag.moved = true;
      sel = drag.i;
      tip = -1;
      api.sfx.click();
    }
    if (drag.moved) { drawPiece(drag.i, false); gPcs.append(PE[drag.i].g); }
  });
  const up = e => {
    if (!drag || e.pointerId != drag.id) return;
    const d = drag, [x, y] = pos(e);
    drag = null;
    if (e.type == 'pointercancel') { draw(); return; }
    if (d.moved) {
      if (inRect(tray, x, y) && !inRect(board, x, y)) toTray(d.i);
      else moveTo(d.i, x + d.gx, y + d.gy);
    } else if (d.i >= 0) {
      if (sel == d.i && p.turn) return turn(d.i, false);
      sel = d.i;
      api.sfx.click();
      tell(`The ${nameOf(d.i)}. Drag it` + (p.turn ? ', tap it again to turn it,' : '') + ' or tap where it should go.', '');
    } else if (sel >= 0 && inRect(board, x, y)) moveTo(sel, x, y);
    else sel = -1;
    draw();
  };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  bTurn.onclick = () => turn(sel, false);
  bFlip.onclick = () => turn(sel, true);
  bUndo.onclick = () => {
    if (!undo.length || done) return;
    st = JSON.parse(undo.pop());
    api.sfx.del();
    tell('Undone.', '');
    store();
    draw();
  };
  const keyd = e => {
    if (!svg.isConnected || $('.ovl') || done || /^(INPUT|TEXTAREA)$/.test((e.target && e.target.tagName) || '')) return;
    const k = (e.key || '').toLowerCase();
    if (k == 'r') turn(sel, false);
    else if (k == 'f') turn(sel, true);
    else if (k == 'u') bUndo.onclick();
  };
  document.addEventListener('keydown', keyd);
  let rz = 0;
  const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
  window.addEventListener('resize', onResize);

  /* ---------- hints ---------- */
  function hintNow(tier) {
    if (done) return false;
    const h = SF.hint(p, st, tier);
    if (!h) return false;
    remember();
    st = h.st;
    const nm = nameOf(h.i);
    if (tier == 1) {
      sel = h.i; tip = h.i;
      tell(`See the yellow outline? The ${nm} goes there.`, 'hint', true);
    } else if (tier == 2) {
      sel = h.i; tip = h.i;
      tell(`The ${nm} is turned the right way now. Drag it into the yellow outline.`, 'hint', true);
    } else {
      sel = -1; tip = -1;
      toTop(h.i);
      tell(`Here is where the ${nm} goes.` + (h.back.length ? ' A piece in its way went back to the tray.' : ''), 'hint', true);
      if (SF.solved(p, st)) { store(); finish(); return true; }
    }
    store();
    draw();
    return true;
  }

  /* ---------- start ---------- */
  const fresh_ = all.every(i => st.pc[i].length == 2);
  tell(fresh_ ? intro : 'Keep going! Drag the pieces into the shape.', '', fresh_ && (band == 'A' || band == 'B')); // R-01b: band B speaks its first instruction too
  layout();
  later(layout, 60);
  const inst = {
    hint: hintNow,
    destroy() {
      timers.forEach(clearTimeout);
      timers.clear();
      clearTimeout(rz);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', keyd);
      if (SF.cur && SF.cur.inst === inst) SF.cur = null;
    },
  };
  // for the smoke bot and the screenshots
  SF.cur = {
    inst, p, st: () => st, sel: () => sel, u: () => u, ut: () => ut,
    page(q) { const r = svg.getBoundingClientRect(), a = px(q); return { x: r.left + a[0], y: r.top + a[1] }; },
    at(i) { const r = svg.getBoundingClientRect(), a = midPx(i); return { x: r.left + a[0], y: r.top + a[1] }; },
    cell: i => cells[i] && { w: cells[i].w, h: cells[i].h },
  };
  return inst;
};

BT.reg({
  id: 'fit', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: (band, level, rnd) => SF.make(band, level, rnd),
  mount: (el, p, api) => SF.mount(el, p, api),
  solve: p => SF.solve(p),
});
/* ---------- Brain Teasers: Turn It (P3-16; BRAIN_TEASERS.md 5.11, 7) ----------
   One registered type, `rotate`, bands A B C D. A puzzle is a few shapes made of squares (polyominoes); for each one the child taps
   the choice that is the same shape turned.
     A (PK-K)  "Which shadow matches?": the shape in colour and 3 dark shadows, one of them its own. 4 squares, 5 from level 9; the
               shadow is not turned on levels 1-6 and turned from level 7. The wrong shadows are other shapes. The question is spoken.
     B (1-2)   2D turn: 4 choices, one the shape turned (a quarter, half or three-quarter turn), three with one square moved;
               never a mirror image as a wrong choice (checked, R-01b).
               4 squares on levels 1-4, 5 after.
     C (3-4)   turn vs mirror: the shape is chiral (its mirror image cannot be turned to match it), the choices are the shape turned,
               its mirror image (turned too) and two with one square moved. 5 squares, 6 from level 7.
     D (5-6)   harder shapes: 6 squares, 7 from level 7; the choices are the shape turned, its mirror image, one with a square moved and
               that one's mirror image.
   Exactly one choice is the shape turned, checked in make() by comparing canonical forms over the 4 turns (and over all 8 turns
   and flips for "another shape"); tools/test.js checks it again with its own transforms.
   All the pieces of an item are one colour, so colour never tells the answer; every choice is drawn at the same square size.
   Play: tap a choice. A wrong one turns amber, stays out and counts one mistake (allow 1); the line says so gently, and says when
   the tapped one was the mirror image. The right one turns green and the next shape comes.
   Hints (per shape; the frame counts tiers): 1 a nudge in words; 2 shows the shape in all four turns next to it (A: takes one wrong
   shadow away); 3 takes away two wrong choices (A: the other one). After that the shape has no more hints.
   State (api.saveState): {i item, miss, h hint tier of this item, x wrong taps, g choices a hint took away}; ROT.fit checks it. */
const ROT = (() => {
  /* ---------- polyominoes: a list of [row, col] squares ---------- */
  const norm = cs => {
    const r0 = Math.min(...cs.map(c => c[0])), c0 = Math.min(...cs.map(c => c[1]));
    return cs.map(([r, c]) => [r - r0, c - c0]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };
  const key = cs => norm(cs).map(c => c.join(',')).join(' ');
  const turn = (cs, k) => { let o = cs; for (let i = 0; i < (k & 3); i++) o = o.map(([r, c]) => [c, -r]); return norm(o); }; // a quarter turn clockwise
  const flip = cs => norm(cs.map(([r, c]) => [r, -c])); // left-right mirror
  const canonR = cs => [0, 1, 2, 3].map(k => key(turn(cs, k))).sort()[0];
  const canonF = cs => [canonR(cs), canonR(flip(cs))].sort()[0];
  const chiral = cs => canonR(cs) !== canonR(flip(cs));
  const dims = cs => { const n = norm(cs); return [Math.max(...n.map(c => c[0])) + 1, Math.max(...n.map(c => c[1])) + 1]; };
  const NB = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const has = (cs, r, c) => cs.some(q => q[0] == r && q[1] == c);
  function connected(cs) {
    if (!cs.length) return false;
    const seen = [cs[0]], todo = [cs[0]];
    while (todo.length) {
      const [r, c] = todo.pop();
      for (const [dr, dc] of NB) {
        const q = cs.find(o => o[0] == r + dr && o[1] == c + dc);
        if (q && !seen.includes(q)) { seen.push(q); todo.push(q); }
      }
    }
    return seen.length == cs.length;
  }
  // a random shape of n squares that fits in a box of side most
  function grow(rnd, n, most) {
    for (let t = 0; t < 200; t++) {
      const cs = [[0, 0]];
      while (cs.length < n) {
        const [r, c] = cs[Math.floor(rnd() * cs.length)], [dr, dc] = NB[Math.floor(rnd() * 4)];
        if (!has(cs, r + dr, c + dc)) cs.push([r + dr, c + dc]);
      }
      const d = dims(cs);
      if (Math.max(...d) <= most) return norm(cs);
    }
    return null;
  }
  // the shape with one square moved: it is still one piece, has the same size, and is a different shape (not turned, not flipped)
  function moved(rnd, cs, most, avoid) {
    for (let t = 0; t < 80; t++) {
      const i = Math.floor(rnd() * cs.length), rest = cs.filter((_, j) => j != i);
      if (!connected(rest)) continue;
      const free = [];
      for (const [r, c] of rest) for (const [dr, dc] of NB) {
        const q = [r + dr, c + dc];
        if (!has(rest, ...q) && !(q[0] == cs[i][0] && q[1] == cs[i][1]) && !has(free, ...q)) free.push(q);
      }
      const o = norm(rest.concat([free[Math.floor(rnd() * free.length)]]));
      if (Math.max(...dims(o)) > most || avoid.includes(canonF(o))) continue;
      return o;
    }
    return null;
  }

  /* ---------- make ---------- */
  // per band: items, choices, squares on levels 1-6 / 7-12 (A: 1-8 / 9-12, B: 1-4 / 5-12), the largest box side
  const BAND = {
    A: { items: 3, n: L => L <= 8 ? 4 : 5, most: 3 },
    B: { items: 4, n: L => L <= 4 ? 4 : 5, most: 4 },
    C: { items: 4, n: L => L <= 6 ? 5 : 6, most: 4 },
    D: { items: 4, n: L => L <= 6 ? 6 : 7, most: 4 },
  };
  const shuffle = (a, rnd) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  // one item: {t target, ch [{s squares, k kind: r right, f mirror image, m one square moved}], a answer index, turn}
  function item(rnd, band, L, used) {
    const B = BAND[band], n = B.n(L);
    for (let t = 0; t < 300; t++) {
      const s = grow(rnd, n, B.most);
      if (!s || used.slice(-2).includes(canonF(s))) continue; // not the shape of the last two items
      if (band != 'A' && band != 'B' && !chiral(s)) continue;
      // the right answer is turned so that it looks different from the shape (band A, levels 1-6: not turned)
      const ks = band == 'A' && L <= 6 ? [0] : [1, 2, 3].filter(k => key(turn(s, k)) !== key(s));
      if (!ks.length) continue;
      const k = ks[Math.floor(rnd() * ks.length)], ch = [{ s: turn(s, k), k: 'r' }];
      const avoid = [canonF(s)];
      if (band == 'A') {
        // other shapes of the same size as shadows
        for (let j = 0; j < 2; j++) {
          let o = null;
          for (let u = 0; u < 60 && !o; u++) { const g = grow(rnd, n, B.most); if (g && !avoid.includes(canonF(g))) o = g; }
          if (!o) break;
          avoid.push(canonF(o));
          ch.push({ s: L <= 6 ? o : turn(o, Math.floor(rnd() * 4)), k: 'm' });
        }
      } else {
        if (band != 'B') ch.push({ s: turn(flip(s), Math.floor(rnd() * 4)), k: 'f' });
        const want = band == 'B' ? 3 : 2;
        let m1 = null;
        for (let g = 0; g < 40 && ch.length < 1 + (band == 'B' ? 0 : 1) + want; g++) {
          if (band == 'D' && m1) { ch.push({ s: turn(flip(m1), Math.floor(rnd() * 4)), k: 'm' }); break; }
          const o = moved(rnd, s, B.most, avoid);
          if (!o) break;
          // D: the moved shape and its mirror image are both choices, so the moved shape must be chiral too
          if (band == 'D' && !chiral(o)) continue;
          avoid.push(canonF(o));
          m1 = o;
          ch.push({ s: turn(o, Math.floor(rnd() * 4)), k: 'm' });
        }
      }
      if (ch.length !== (band == 'A' ? 3 : 4)) continue;
      // exactly one choice is the shape turned (A, levels 1-6: exactly one is the very same shadow), and no two choices look the same
      const cr = canonR(s), same = ch.filter(c => band == 'A' && L <= 6 ? key(c.s) == key(s) : canonR(c.s) == cr);
      if (same.length !== 1 || same[0].k !== 'r') continue;
      // R-01b: band B never has a mirror image among the wrong choices (mirror images are taught in band C). The moved-square
      // choices already avoid the shape's mirror image (avoid holds canonF); this says it outright. Achiral shapes look the same
      // turned and mirrored, so for them the right answer is also a mirror image, and nothing is wrong with that.
      if (band == 'B' && ch.some(c => c.k != 'r' && canonR(c.s) == canonR(flip(s)))) continue;
      if (new Set(ch.map(c => key(c.s))).size !== ch.length) continue;
      shuffle(ch, rnd);
      return { t: s, ch, a: ch.findIndex(c => c.k == 'r'), turn: k };
    }
    return null;
  }
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, level | 0 || 1)), items = [], used = [];
    for (let i = 0; i < BAND[band].items; i++) {
      const it = item(rnd, band, L, used);
      used.push(canonF(it.t));
      it.c = Math.floor(rnd() * 5);
      items.push(it);
    }
    for (let i = 1; i < items.length; i++) if (items[i].c == items[i - 1].c) items[i].c = (items[i].c + 1) % 5;
    return { band, level: L, shadow: band == 'A', items };
  }
  const solve = p => p.items.map(it => it.a);
  const fresh = () => ({ i: 0, miss: 0, h: 0, x: [], g: [] });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const n = p.items.length, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(s.i, 0, n - 1) || !int(s.miss, 0, 999) || !int(s.h, 0, 3) || !Array.isArray(s.x) || !Array.isArray(s.g)) return false;
    const it = p.items[s.i], all = s.x.concat(s.g);
    if (!all.every(c => int(c, 0, it.ch.length - 1) && c !== it.a) || new Set(all).size !== all.length) return false;
    return all.length <= it.ch.length - 1;
  }
  const ASK = { A: 'Which shadow matches the shape?', B: 'Which one is the same shape, turned?', C: 'Which one is the same shape, turned?', D: 'Which one is the same shape, turned?' };
  const HINT1 = {
    A: 'Look at the bumps and corners of the shape. The right shadow has the same ones.',
    B: 'Turn the shape in your head. Watch where its corner goes.',
    C: 'One choice is the shape flipped, like in a mirror. Turning can never make that one.',
    D: 'Two choices are flipped, like in a mirror. Turn the shape in your head and check every square.',
  };
  function hintText(p, it, t) {
    if (t == 1) return HINT1[p.band];
    if (t == 2) return p.shadow ? 'One shadow is gone. Look at the two that are left.' : 'The shape in all four turns. Find one below.';
    return p.shadow ? 'Only one shadow is left. That is the one!' : 'Two wrong ones are gone. Which one is left?';
  }
  // hint 2 (shadows) or 3: which choices it takes away (wrong ones still in play: one for shadows, else two)
  function takeFor(p, it, s, t) {
    const left = it.ch.map((_, c) => c).filter(c => c !== it.a && !s.x.includes(c) && !s.g.includes(c));
    if (p.shadow) return t >= 2 ? left.slice(0, 1) : [];
    return t >= 3 ? left.slice(0, 2) : [];
  }

  /* ---------- drawing ---------- */
  const f1 = v => Math.round(v * 10) / 10;
  // a piece in a 100 x 100 box at square size u, centred; the light comes from the top left
  function piece(cs, u, cls, look) {
    const [h, w] = dims(cs), ox = (100 - w * u) / 2, oy = (100 - h * u) / 2;
    const at = (r, c) => [f1(ox + c * u), f1(oy + r * u)];
    if (look == 'shadow') {
      // a dark flat shadow: the squares merge into one silhouette
      return `<g class="ro-sh">${cs.map(([r, c]) => { const [x, y] = at(r, c); return `<rect x="${x - 0.5}" y="${y - 0.5}" width="${f1(u + 1)}" height="${f1(u + 1)}"/>`; }).join('')}</g>`;
    }
    const q = f1(u * 0.14), b = f1(u * 0.84), gl = f1(u * 0.24);
    let s = `<g class="${cls}"><g class="ro-lg">`;
    s += cs.map(([r, c]) => { const [x, y] = at(r, c); return `<rect x="${f1(x + u * 0.06)}" y="${f1(y + u * 0.1)}" width="${f1(u)}" height="${f1(u)}" rx="${q}"/>`; }).join('');
    s += '</g>';
    for (const [r, c] of cs) {
      const [x, y] = at(r, c);
      s += `<rect class="ro-sd" x="${x}" y="${y}" width="${f1(u)}" height="${f1(u)}" rx="${q}"/>` +
        `<rect class="ro-bs" x="${f1(x + u * 0.04)}" y="${f1(y + u * 0.04)}" width="${b}" height="${b}" rx="${q}"/>` +
        `<path class="ro-gl" d="M${f1(x + u * 0.2)} ${f1(y + u * 0.2)}H${f1(x + u * 0.2 + gl)}"/>`;
    }
    return s + '</g>';
  }
  const tile = (cs, u, c, look, label) => `<svg class="ro-t" viewBox="0 0 100 100" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>` +
    piece(cs, u, 'ro-c' + c, look) + '</svg>';
  // the square size for an item: every piece of it (target, turns, choices) at the same size
  const unit = it => 92 / Math.max(...[it.t].concat(it.ch.map(c => c.s)).map(s => Math.max(...dims(s))), 3);

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let busy = 0, alive = true, msg = '', mk = '';
    const N = p.items.length;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.ro-msg');
      if (m) { m.textContent = t; m.className = 'ro-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const turnsHTML = it => !p.shadow && st.h >= 2 ? `<div class="ro-turns" role="img" aria-label="The shape in all four turns">` +
      [0, 1, 2, 3].map(k => `<span class="ro-tn">${tile(turn(it.t, k), unit(it), it.c, '', '')}</span>`).join('') + '</div>' : '';
    function render() {
      const it = p.items[st.i], u = unit(it);
      const dots = p.items.map((_, i) => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        return `<button class="choice ro-ch${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${p.shadow ? 'Shadow' : 'Shape'} ${i + 1}"` +
          `${x || g ? ' disabled' : ''}>${tile(c.s, u, it.c, p.shadow ? 'shadow' : '', '')}</button>`;
      }).join('');
      el.innerHTML = `<div class="ro ro-${p.band}"><div class="ro-say"><span class="ro-dots" role="img" aria-label="Shape ${st.i + 1} of ${N}">${dots}</span>` +
        `<p class="ro-msg" aria-live="polite"></p>${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'ro-spk' })}</div>` +
        `<div class="ro-main"><div class="ro-top"><div class="ro-card"><span class="ro-tag">${ico(p.shadow ? 'eye' : 'rotate', 22)}</span>` +
        `${tile(it.t, u, it.c, '', 'The shape')}</div>${turnsHTML(it)}</div>` +
        `<div class="ro-chs n${it.ch.length}">${chs}</div></div></div>`;
      el.querySelector('.ro-spk').onclick = () => api.say(msg);
      el.querySelectorAll('.ro-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
      say(msg || ASK[p.band], mk);
    }
    function tap(i, b) {
      const it = p.items[st.i];
      if (busy || !alive || st.x.includes(i) || st.g.includes(i)) return;
      if (i !== it.a) {
        st.miss++;
        st.x.push(i);
        api.saveState(st);
        b.classList.add('wrong');
        b.disabled = true;
        api.sfx.wrong();
        const f = it.ch[i].k == 'f';
        say(p.shadow ? 'Not that shadow. Look at the shape again!' : f ? 'That one is flipped, like in a mirror. Try another!' : 'That one has a square in another place. Try again!', 'try', p.band == 'A');
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.ro-ch').forEach(x => { x.disabled = true; });
      el.querySelector('.ro-card').classList.add('got');
      api.sfx.right(st.i + 3);
      say(p.shadow ? 'Yes! That is its shadow.' : 'Yes! The same shape, turned.', 'good', p.band == 'A');
      const last = st.i == N - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) { api.win({ mistakes: st.miss }); return; }
      api.saveState(st);
      busy = setTimeout(() => {
        busy = 0;
        if (!alive) return;
        msg = '';
        mk = '';
        render();
        if (p.band == 'A') api.say(ASK.A);
      }, 1200);
    }
    if (st.h) { msg = hintText(p, p.items[st.i], st.h); mk = 'hint'; }
    render();
    if ((p.band == 'A' || (p.band == 'B' && st.i == 0 && !st.miss)) && !st.h) api.say(ASK[p.band]); // R-01b: band B speaks its first instruction too
    return {
      hint() {
        if (busy || st.i >= N || st.h >= 3) return false;
        const it = p.items[st.i], t = st.h + 1, go = takeFor(p, it, st, t);
        if (t >= 2 && (p.shadow || t == 3) && !go.length) return false; // nothing left to take away
        st.h = t;
        st.g.push(...go);
        api.saveState(st);
        go.forEach(c => { const b = el.querySelector(`.ro-ch[data-c="${c}"]`); b.classList.add('off'); b.disabled = true; });
        if (t == 2 && !p.shadow) el.querySelector('.ro-top').insertAdjacentHTML('beforeend', turnsHTML(it));
        say(hintText(p, it, t), 'hint', true);
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); },
    };
  }

  return { make, solve, mount, fit, fresh, hintText, takeFor, norm, key, turn, flip, canonR, canonF, chiral, connected, dims, BAND };
})();

BT.reg({
  id: 'rotate', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: ROT.make, mount: ROT.mount, solve: ROT.solve,
});
/* ---------- Brain Teasers: Mirror (P3-16; BRAIN_TEASERS.md 5.11, 7) ----------
   One registered type, `mirror`, bands B C D. Half of a picture sits on a square grid; the child taps squares on the other side to
   finish it so the two halves match.
     B (1-2)  6 x 6, a line down the middle (left-right mirror); 3-5 / 5-7 / 7-9 squares to fill over levels 1-4 / 5-8 / 9-12
     C (3-4)  8 x 8, a line across the middle (up-down mirror) on levels 1-4, the slanted corner-to-corner line on 5-8, either on 9-12;
              5-8 / 8-11 / 10-14 squares
     D (5-6)  half-turn about the centre dot (the picture looks the same upside down): 6 x 6 on levels 1-4, then 8 x 8;
              6-9 / 9-13 / 12-17 squares
   The given half is grown as one piece that touches the line (or the centre), so the whole picture is one shape. The answer is the
   exact mirror image of the given half (by construction; tools/test.js mirrors it again on its own). On the slanted line the squares
   the line runs through are their own twins: they are given and cannot be tapped.
   Play: tap a square on the empty side. A square of the mirror image fills in; any other square shakes amber, stays empty and counts
   one mistake (allow 2); the line says so gently. The picture is done when every twin is filled.
   Hints (the frame passes 1, 2, 3, then 3 again): 1 says how the mirror works and the line glows; 2 rings a square of the picture
   whose twin is still missing; 3 fills that twin (star-yellow), and each press after that fills the next one, so a child can always
   finish. Grid squares are at least 44 px (BRAIN_TEASERS 8, dense grids); the board is the largest square that fits.
   State (api.saveState): {on: filled squares, hn: the ones a hint filled, miss, h: hint tier shown, mk: ringed square or -1};
   MRR.fit rejects a state that does not belong to the puzzle. */
const MRR = (() => {
  // per band, levels 1-4 / 5-8 / 9-12: [grid side, fewest, most squares to fill]
  const TIER = {
    B: [[6, 3, 5], [6, 5, 7], [6, 7, 9]],
    C: [[8, 5, 8], [8, 8, 11], [8, 10, 14]],
    D: [[6, 6, 9], [8, 9, 13], [8, 12, 17]],
  };
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  // the twin of square (r, c) for a kind: v left-right, h up-down, d the slanted line (top left to bottom right), r half-turn
  const twin = (k, n, r, c) => k == 'v' ? [r, n - 1 - c] : k == 'h' ? [n - 1 - r, c] : k == 'd' ? [c, r] : [n - 1 - r, n - 1 - c];
  // which side a square is on: 'g' the given half, 't' the half to fill, 'l' on the line (slanted line only)
  function side(p, r, c) {
    const n = p.n, h = n / 2;
    if (p.k == 'v') return (c < h) == (p.s == 0) ? 'g' : 't';
    if (p.k == 'h') return (r < h) == (p.s == 0) ? 'g' : 't';
    if (p.k == 'd') return r == c ? 'l' : (r > c) == (p.s == 0) ? 'g' : 't';
    return r < h ? 'g' : 't';
  }
  const want = p => p.on.filter(i => side(p, Math.floor(i / p.n), i % p.n) == 'g').map(i => {
    const [r, c] = twin(p.k, p.n, Math.floor(i / p.n), i % p.n);
    return r * p.n + c;
  }).sort((a, b) => a - b);

  /* ---------- make ---------- */
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, level | 0 || 1)), T = tierOf(L), [n, lo, hi] = TIER[band][T];
    const k = band == 'B' ? 'v' : band == 'D' ? 'r' : T == 0 ? 'h' : T == 1 ? 'd' : rnd() < 0.5 ? 'h' : 'd';
    const p = { band, n, k, s: k == 'r' ? 0 : Math.floor(rnd() * 2), c: Math.floor(rnd() * 6), on: [] };
    const f = lo + Math.floor(rnd() * (hi - lo + 1));
    const h = n / 2, okCell = (r, c) => r >= 0 && c >= 0 && r < n && c < n && side(p, r, c) != 't';
    // a first square next to the line (half-turn: next to the middle, near the centre)
    let seed;
    if (k == 'v') seed = [Math.floor(rnd() * n), p.s == 0 ? h - 1 : h];
    else if (k == 'h') seed = [p.s == 0 ? h - 1 : h, Math.floor(rnd() * n)];
    else if (k == 'd') { const a = 1 + Math.floor(rnd() * (n - 2)); seed = p.s == 0 ? [a, a - 1] : [a - 1, a]; }
    else seed = [h - 1, h - 2 + Math.floor(rnd() * 3)];
    const pic = [seed], key = (r, c) => r * n + c, inPic = (r, c) => pic.some(q => q[0] == r && q[1] == c);
    const offLine = () => pic.filter(([r, c]) => side(p, r, c) == 'g').length;
    // grow one piece: a square next to the picture, likelier where it touches more of the picture (blobby, not stringy)
    for (let t = 0; t < 400 && offLine() < f; t++) {
      const cand = [];
      for (const [r, c] of pic) for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        const q = [r + dr, c + dc];
        if (!okCell(...q) || inPic(...q) || cand.some(o => o[0] == q[0] && o[1] == q[1])) continue;
        // the slanted line: at most a few of its own squares
        if (k == 'd' && side(p, ...q) == 'l' && pic.filter(([a, b]) => a == b).length >= 3) continue;
        cand.push(q);
      }
      if (!cand.length) break;
      const w = cand.map(([r, c]) => 1 + 2 * [[0, 1], [1, 0], [0, -1], [-1, 0]].filter(([dr, dc]) => inPic(r + dr, c + dc)).length);
      let x = rnd() * w.reduce((a, b) => a + b, 0), i = 0;
      while (i < cand.length - 1 && (x -= w[i]) > 0) i++;
      pic.push(cand[i]);
    }
    p.on = pic.map(([r, c]) => key(r, c)).sort((a, b) => a - b);
    return p;
  }
  const solve = p => want(p);
  const fresh = () => ({ on: [], hn: [], miss: 0, h: 0, mk: -1 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const W = want(p), int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!Array.isArray(s.on) || !Array.isArray(s.hn) || !int(s.miss, 0, 999) || !int(s.h, 0, 3) || !int(s.mk, -1, p.n * p.n - 1)) return false;
    if (!s.on.every(i => W.includes(i)) || new Set(s.on).size != s.on.length) return false;
    if (!s.hn.every(i => s.on.includes(i)) || new Set(s.hn).size != s.hn.length) return false;
    return s.mk < 0 || p.on.includes(s.mk);
  }
  // the next twin still missing, and the square of the picture it belongs to
  function next(p, s) {
    const W = want(p).filter(i => !s.on.includes(i));
    if (!W.length) return null;
    const t = W[0], [r, c] = twin(p.k, p.n, Math.floor(t / p.n), t % p.n);
    return { t, g: r * p.n + c };
  }
  const ASK = {
    v: 'Finish the picture. Both sides of the line must match.',
    h: 'Finish the picture. It must match above and below the line.',
    d: 'Finish the picture. It must match on both sides of the slanted line.',
    r: 'Finish the picture. It must look the same upside down.',
  };
  const HINT1 = {
    v: 'Each square has a twin on the other side of the line, just as far from it.',
    h: 'Each square has a twin on the other side of the line, just as far from it.',
    d: 'Fold the grid along the slanted line. Each square lands on its twin.',
    r: 'Turn the grid upside down around the dot. Each square lands on its twin.',
  };
  function hintText(p, t) {
    if (t == 1) return HINT1[p.k];
    if (t == 2) return 'Look at the ringed square. Where is its twin?';
    return 'Here is one twin. Can you find the rest?';
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let alive = true, msg = '', mk = '', done = false;
    const n = p.n, W = want(p);
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.mr-msg');
      if (m) { m.textContent = t; m.className = 'mr-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    function cell(i) {
      const r = Math.floor(i / n), c = i % n, sd = side(p, r, c);
      if (sd != 't') {
        const on = p.on.includes(i);
        return `<span class="mr-cell ${sd}${on ? ' on' : ''}${st.mk == i ? ' ring' : ''}"${on ? '' : ''}></span>`;
      }
      const on = st.on.includes(i);
      return `<button class="mr-cell t${on ? ' on' : ''}${st.hn.includes(i) ? ' hn' : ''}" data-i="${i}" aria-label="Row ${r + 1}, square ${c + 1}${on ? ', filled' : ''}"></button>`;
    }
    function line() {
      const h = n / 2, s = 'class="mr-ln"';
      const d = p.k == 'v' ? `<path ${s} d="M${h} -0.15V${n + 0.15}"/>` : p.k == 'h' ? `<path ${s} d="M-0.15 ${h}H${n + 0.15}"/>` :
        p.k == 'd' ? `<path ${s} d="M-0.1 -0.1L${n + 0.1} ${n + 0.1}"/>` :
          `<circle class="mr-dot" cx="${h}" cy="${h}" r="0.24"/><circle class="mr-dotc" cx="${h - 0.05}" cy="${h - 0.05}" r="0.08"/>`;
      return `<svg class="mr-line${st.h >= 1 ? ' glow' : ''}" viewBox="0 0 ${n} ${n}" aria-hidden="true">${d}</svg>`;
    }
    const left = () => W.length - st.on.length;
    const countTxt = () => left() ? `${left()} ${left() == 1 ? 'square' : 'squares'} to go` : 'Done!';
    function render() {
      const cells = [];
      for (let i = 0; i < n * n; i++) cells.push(cell(i));
      el.innerHTML = `<div class="mr mr-${p.k} mr-n${n}"><div class="mr-say"><p class="mr-msg" aria-live="polite"></p>` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'mr-spk' })}</div>` +
        `<div class="mr-main"><div class="mr-board mr-c${p.c}" style="--n:${n}" role="group" aria-label="Picture grid">${cells.join('')}${line()}</div>` +
        `<p class="mr-count"><span class="mr-ct">${countTxt()}</span></p></div></div>`;
      el.querySelector('.mr-spk').onclick = () => api.say(msg);
      el.querySelectorAll('.mr-cell.t').forEach(b => b.onclick = () => tap(+b.dataset.i, b));
      say(msg || ASK[p.k], mk);
      size();
    }
    // the board: the largest square that fits the stage with the talk line (beside it on a wide screen), squares at least 44 px
    function size() {
      const b = el.querySelector('.mr-board'), mr = el.querySelector('.mr');
      if (!b || !el.clientWidth) return;
      const cs = getComputedStyle(el), px = v => parseFloat(v) || 0;
      const w = el.clientWidth - px(cs.paddingLeft) - px(cs.paddingRight), h = el.clientHeight - px(cs.paddingTop) - px(cs.paddingBottom);
      const wide = innerWidth >= 700 && innerWidth > innerHeight * 1.2;
      mr.classList.toggle('wide', wide);
      const talk = el.querySelector('.mr-say').offsetHeight, ct = el.querySelector('.mr-count').offsetHeight;
      const side_ = wide ? Math.min(w - 320, h - ct - 20) : Math.min(w + 12, h - talk - ct - 24, 560);
      b.style.setProperty('--cs', Math.max(44, Math.floor(side_ / n)) + 'px');
    }
    const onResize = () => { if (alive) size(); };
    addEventListener('resize', onResize);
    function fill(i, hinted) {
      st.on.push(i);
      if (hinted) st.hn.push(i);
      st.mk = -1;
      api.saveState(st);
      const b = el.querySelector(`.mr-cell.t[data-i="${i}"]`);
      if (b) { b.classList.add('on'); if (hinted) b.classList.add('hn'); b.setAttribute('aria-label', b.getAttribute('aria-label') + ', filled'); }
      el.querySelectorAll('.mr-cell.ring').forEach(x => x.classList.remove('ring'));
      el.querySelector('.mr-ct').textContent = countTxt();
      if (!left()) {
        done = true;
        el.querySelector('.mr-board').classList.add('won');
        say('The picture matches!', 'good', true);
        api.win({ mistakes: st.miss, note: [`${W.length} squares mirrored`] });
      }
    }
    function tap(i, b) {
      if (!alive || done || st.on.includes(i)) return;
      if (!W.includes(i)) {
        st.miss++;
        api.saveState(st);
        api.sfx.wrong();
        b.classList.remove('no');
        void b.offsetWidth;
        b.classList.add('no');
        say(p.k == 'r' ? 'Not that square. Turn the picture in your head and try again!' : 'Not that square. Find its twin across the line!', 'try');
        return;
      }
      SFX.key(1 + (st.on.length % 8));
      fill(i, false);
      if (!done && mk == 'try') say(ASK[p.k], '');
    }
    if (st.h) { msg = hintText(p, st.h); mk = 'hint'; }
    render();
    if (api.band == 'B' && !st.on.length && !st.h) api.say(ASK[p.k]);
    return {
      hint(tier) {
        if (done || !alive) return false;
        const nx = next(p, st);
        if (!nx) return false;
        const t = Math.max(1, Math.min(3, tier | 0));
        st.h = Math.max(st.h, t);
        if (t == 1) {
          el.querySelector('.mr-line').classList.add('glow');
        } else if (t == 2) {
          st.mk = nx.g;
          el.querySelectorAll('.mr-cell.ring').forEach(x => x.classList.remove('ring'));
          el.querySelector('.mr-board').children[nx.g].classList.add('ring');
        }
        say(hintText(p, t), 'hint', true);
        if (t == 3) fill(nx.t, true);
        else api.saveState(st);
        return true;
      },
      destroy() { alive = false; removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, fit, fresh, want, twin, side, next, hintText, TIER, tierOf };
})();

BT.reg({
  id: 'mirror', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: MRR.make, mount: MRR.mount, solve: MRR.solve,
});
/* ---------- Brain Teasers: Word Search (P3-15; BRAIN_TEASERS.md 5.10, 7, 8) ----------
   One registered type, `wsearch`, bands B C D. Words from the child's spelling lists (SPELL_WORDS, d-spell.js) hide in a letter grid.
     B (1-2)  spelling levels 1-3; 5 x 5 with 5 words across (levels 1-4), across and down (5-8), 6 x 6 with 6 words (9-12)
     C (3-4)  spelling levels 4-5; 7 x 7, 6 words across, down and on the down slant (1-4); 8 x 8, + the up slant, 7 / 8 words
     D (5-6)  spelling levels 5-7; every direction, backwards too: 9 x 9 with 8 words, 10 x 10 with 9 / 10 words
   make() places the longest word first, picking a direction the band allows and then a spot (two words may share one letter where
   they cross), then fills the other squares with letters weighted by English frequency. Checks before a grid is kept: every listed
   word reads exactly once in the grid in any of the 8 directions (its own place), and no word of the rude list (BTW.rude,
   d-words-bt.js) reads anywhere in any direction; a filler square in a bad run is drawn again until both hold. Words that hold a
   rude run, palindromes, and words that hold another listed word (or its reverse) are never put in one grid.
   D1 (owner, 2026-11-24): no mild word (MILD below) reads anywhere either, unless the run lies wholly inside one listed word
   (father, died, dog read backwards): such a word stays in the pool. The list lives here, not in d-words-bt.js, so start-up is not larger.
   Play: drag across a word (touch or mouse; the line snaps to the 8 directions), or tap its first letter and then its last. Either
   end may come first. A found word gets a soft coloured band in the grid and is struck through with a tick in the list (never
   colour alone) and spoken. A line of 3 or more letters that is not a word counts one mistake (allow 3); shorter slips do not.
   Hints, per word (the first word not found yet): 1 rings its first letter, 2 shades its row, column or slanted line, 3 finds it
   (a star-yellow band); the next press starts on the next word. Grid squares are at least 44 px where the screen allows
   (BRAIN_TEASERS 8; a 10 x 10 grid on a 380 px phone is 36 px, as section 8 allows for 9 x 9 on a phone).
   State (api.saveState): {f: found word indexes, hf: the ones a hint found, miss, hw: hint word or -1, h: its tier, pk: first
   tapped square or -1}; WS.fit rejects a state that does not belong to the puzzle. */
const WS = (() => {
  // directions [row step, column step]: 0-3 read forwards (right, down, down slant, up slant), 4-7 are the same lines backwards
  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
  const ALL = [0, 1, 2, 3, 4, 5, 6, 7];
  // per band, levels 1-4 / 5-8 / 9-12: [grid side, words, directions, shortest word, longest word]
  const TIER = {
    B: [[5, 5, [0], 3, 5], [5, 5, [0, 1], 3, 5], [6, 6, [0, 1], 3, 6]],
    C: [[7, 6, [0, 1, 2], 4, 7], [8, 7, [0, 1, 2, 3], 4, 8], [8, 8, [0, 1, 2, 3], 4, 8]],
    D: [[9, 8, ALL, 5, 8], [10, 9, ALL, 5, 9], [10, 10, ALL, 5, 9]],
  };
  const SRC = { B: [1, 2, 3], C: [4, 5], D: [5, 6, 7] }; // spelling levels per band
  // filler letters, weighted by how often they appear in English (no j, q, x, z)
  const FILL = 'eeeeeeeeeeeettttttttttaaaaaaaaaooooooooiiiiiiinnnnnnnsssssshhhhhhrrrrrrddddlllluuuuccmmmwwffggyyppbbvk';
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  const rev = w => [...w].reverse().join('');
  const rude = () => BTW.rude.split(' ');
  // D1: mild words a grid must not spell by accident, in any direction
  const MILD = 'die dead death hate fat god bum dumb ugly drug stab devil satan idiot stupid puke jerk perv'.split(' ');
  const cache = {};
  // the words a band can use (spelling words, a-z, no BAD, no rude run either way, no palindrome)
  function pool(band) {
    if (cache[band]) return cache[band];
    const R = rude(), out = [];
    for (const lv of SRC[band]) for (const ln of SPELL_WORDS[lv].split('\n')) {
      const w = ln.split('|')[0];
      if (!/^[a-z]+$/.test(w) || out.includes(w) || BAD.test(w) || w == rev(w) || R.some(r => w.includes(r) || rev(w).includes(r))) continue;
      out.push(w);
    }
    return cache[band] = out;
  }
  const cellsOf = (n, r, c, d, len) => Array.from({ length: len }, (_, k) => (r + DIRS[d][0] * k) * n + c + DIRS[d][1] * k);
  const wcells = (p, i) => { const x = p.w[i]; return cellsOf(p.n, x.r, x.c, x.d, x.t.length); };
  // every place a word reads in the grid string g: [[r, c, d], ...] over all 8 directions
  function finds(g, n, w) {
    const out = [], L = w.length;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if (g[r * n + c] != w[0]) continue;
      for (let d = 0; d < 8; d++) {
        const er = r + DIRS[d][0] * (L - 1), ec = c + DIRS[d][1] * (L - 1);
        if (er < 0 || ec < 0 || er >= n || ec >= n) continue;
        let k = 1;
        while (k < L && g[(r + DIRS[d][0] * k) * n + c + DIRS[d][1] * k] == w[k]) k++;
        if (k == L) out.push([r, c, d]);
      }
    }
    return out;
  }

  /* ---------- make ---------- */
  function pickWords(band, T, rnd) {
    const [n, k, , lo, hi] = T, cand = pool(band).filter(w => w.length >= lo && w.length <= Math.min(hi, n));
    for (let i = cand.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cand[i], cand[j]] = [cand[j], cand[i]]; }
    const out = [];
    for (const w of cand) {
      if (out.length >= k) break;
      if (!out.some(o => o.includes(w) || w.includes(o) || o.includes(rev(w)) || rev(w).includes(o))) out.push(w);
    }
    return out;
  }
  function place(n, words, dirs, rnd) {
    const g = Array(n * n).fill(''), placed = [];
    for (const w of words.slice().sort((a, b) => b.length - a.length)) {
      const by = {};
      for (const d of dirs) for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        const er = r + DIRS[d][0] * (w.length - 1), ec = c + DIRS[d][1] * (w.length - 1);
        if (er < 0 || ec < 0 || er >= n || ec >= n) continue;
        const cs = cellsOf(n, r, c, d, w.length);
        let ov = 0, ok = true;
        cs.forEach((i, k) => { if (g[i]) { if (g[i] == w[k]) ov++; else ok = false; } });
        if (ok && ov <= 1) (by[d] = by[d] || []).push([r, c, ov]); // two words share at most the one letter where they cross
      }
      const ds = Object.keys(by);
      if (!ds.length) return null;
      const d = +ds[Math.floor(rnd() * ds.length)], all = by[d], cross = all.filter(o => o[2]);
      const use = cross.length && rnd() < 0.45 ? cross : all, [r, c] = use[Math.floor(rnd() * use.length)];
      cellsOf(n, r, c, d, w.length).forEach((i, k) => { g[i] = w[k]; });
      placed.push({ t: w, r, c, d });
    }
    return { g, placed };
  }
  // fill the empty squares; then redraw filler squares that make a listed word read twice or a rude run read anywhere
  function fill(n, g, placed, rnd) {
    const own = new Set();
    placed.forEach(x => cellsOf(n, x.r, x.c, x.d, x.t.length).forEach(i => own.add(i)));
    for (let i = 0; i < n * n; i++) if (!g[i]) g[i] = FILL[Math.floor(rnd() * FILL.length)];
    const R = rude();
    const owns = placed.map(x => new Set(cellsOf(n, x.r, x.c, x.d, x.t.length)));
    for (let t = 0; t < 400; t++) {
      const s = g.join('');
      let badRun = null;
      for (const x of placed) {
        const f = finds(s, n, x.t).filter(([r, c, d]) => !(r == x.r && c == x.c && d == x.d));
        if (f.length) { badRun = cellsOf(n, ...f[0], x.t.length); break; }
      }
      if (!badRun) for (const w of R) { const f = finds(s, n, w); if (f.length) { badRun = cellsOf(n, ...f[0], w.length); break; } }
      // D1: a mild run that is not wholly inside one listed word is redrawn too
      if (!badRun) for (const w of MILD) {
        const f = finds(s, n, w).map(o => cellsOf(n, ...o, w.length)).filter(cs => !owns.some(o => cs.every(i => o.has(i))));
        if (f.length) { badRun = f[0]; break; }
      }
      if (!badRun) return true;
      const free = badRun.filter(i => !own.has(i));
      if (!free.length) return false;
      g[free[Math.floor(rnd() * free.length)]] = FILL[Math.floor(rnd() * FILL.length)];
    }
    return false;
  }
  function make(band, level, rnd) {
    const T = TIER[band][tierOf(level)], [n, k, dirs] = T;
    for (let a = 0; a < 200; a++) {
      const words = pickWords(band, T, rnd);
      if (words.length < k) continue;
      const pl = place(n, words, dirs, rnd);
      if (!pl || !fill(n, pl.g, pl.placed, rnd)) continue;
      return { b: band, n, dirs: dirs.slice(), g: pl.g.join(''), w: pl.placed.sort((x, y) => x.t < y.t ? -1 : 1) };
    }
    throw new Error('word search: no grid');
  }
  // the squares from a to b when they are in one straight line (any of the 8 directions), else null
  function line(n, a, b) {
    const r0 = Math.floor(a / n), c0 = a % n, dr = Math.floor(b / n) - r0, dc = b % n - c0;
    if (dr && dc && Math.abs(dr) != Math.abs(dc)) return null;
    const L = Math.max(Math.abs(dr), Math.abs(dc)), sr = Math.sign(dr), sc = Math.sign(dc);
    return Array.from({ length: L + 1 }, (_, k) => (r0 + sr * k) * n + c0 + sc * k);
  }
  // the word whose first and last letters are a and b (either way round), or -1
  function match(p, a, b) {
    for (let i = 0; i < p.w.length; i++) {
      const cs = wcells(p, i), f = cs[0], l = cs[cs.length - 1];
      if ((a == f && b == l) || (a == l && b == f)) return i;
    }
    return -1;
  }
  const solve = p => p.w.map((_, i) => { const cs = wcells(p, i); return [cs[0], cs[cs.length - 1]]; });
  const fresh = () => ({ f: [], hf: [], miss: 0, hw: -1, h: 0, pk: -1 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const N = p.w.length, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi, idx = a => Array.isArray(a) && a.every(i => int(i, 0, N - 1)) && new Set(a).size == a.length;
    if (!idx(s.f) || !idx(s.hf) || !s.hf.every(i => s.f.includes(i)) || s.f.length >= N) return false;
    if (!int(s.miss, 0, 999) || !int(s.hw, -1, N - 1) || !int(s.h, 0, 3) || !int(s.pk, -1, p.n * p.n - 1)) return false;
    return (s.hw < 0) == (s.h == 0) && !s.f.includes(s.hw);
  }
  // the word a hint works on: the one already hinted, else the first word not found yet
  const hintWord = (p, s) => s.hw >= 0 && !s.f.includes(s.hw) ? s.hw : p.w.findIndex((_, i) => !s.f.includes(i));
  const lineName = d => d % 4 == 0 ? 'row' : d % 4 == 1 ? 'column' : 'slanted line';
  function hintText(p, i, t) {
    const W = p.w[i].t.toUpperCase();
    if (t == 1) return `${W} starts at the ringed letter.`;
    if (t == 2) return `${W} is in the shaded ${lineName(p.w[i].d)}.`;
    return `Here is ${W}!`;
  }
  const ASK = {
    0: 'Find the words. They go across. Drag over a word, or tap its first and last letter.',
    1: 'Find the words. They go across and down. Drag over a word, or tap its first and last letter.',
    2: 'Find the words: across, down and slanted. Drag over a word, or tap its first and last letter.',
    3: 'Find the words. They can go any way, even backwards!',
  };
  const ask = p => ASK[p.dirs.length > 4 ? 3 : p.dirs.length > 2 ? 2 : p.dirs.length - 1];
  const COLS = ['yellow', 'green', 'aqua', 'pink', 'purple', 'orange', 'blue'];

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let alive = true, msg = '', mk = '', done = false, drag = null, tmo = 0, cs = 44;
    const n = p.n, N = p.w.length;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.ws-msg');
      if (m) { m.textContent = t; m.className = 'ws-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const ctr = i => [i % n + 0.5, Math.floor(i / n) + 0.5];
    const seg = (a, b, cls) => { const [x1, y1] = ctr(a), [x2, y2] = ctr(b); return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; };
    const colOf = i => COLS[st.f.indexOf(i) % COLS.length];
    // the drawing under the letters: found bands, the hint marks, the line being drawn, the first tapped letter
    function overlay() {
      let h = '';
      const hw = st.hw;
      if (hw >= 0 && st.h >= 2) {
        const x = p.w[hw], [dr, dc] = DIRS[x.d];
        let a = x.r * n + x.c, b = a, r = x.r, c = x.c;
        while (r - dr >= 0 && r - dr < n && c - dc >= 0 && c - dc < n) { r -= dr; c -= dc; a = r * n + c; }
        r = x.r; c = x.c;
        while (r + dr >= 0 && r + dr < n && c + dc >= 0 && c + dc < n) { r += dr; c += dc; b = r * n + c; }
        h += seg(a, b, 'ws-hl');
      }
      for (const i of st.f) { const c = wcells(p, i); h += seg(c[0], c[c.length - 1], 'ws-band wk-' + (st.hf.includes(i) ? 'hint' : colOf(i))); }
      if (hw >= 0 && st.h >= 1) { const [x, y] = ctr(wcells(p, hw)[0]); h += `<circle class="ws-ring" cx="${x}" cy="${y}" r=".44"/>`; }
      if (st.pk >= 0) { const [x, y] = ctr(st.pk); h += `<circle class="ws-pk" cx="${x}" cy="${y}" r=".42"/>`; }
      h += '<line class="ws-live" x1="0" y1="0" x2="0" y2="0" style="display:none"/>';
      el.querySelector('.ws-ov').innerHTML = h;
    }
    function list() {
      return p.w.map((x, i) => {
        const got = st.f.includes(i);
        return `<li class="ws-w${got ? ' got wk-' + (st.hf.includes(i) ? 'hint' : colOf(i)) : ''}" data-w="${i}"${got ? ` aria-label="${esc(x.t)}, found"` : ''}>` +
          `<span class="ws-t">${esc(x.t.toUpperCase())}</span>${got ? ico('check', 18) : ''}</li>`;
      }).join('');
    }
    const countTxt = () => `${st.f.length} of ${N} found`;
    function render() {
      const cells = [];
      for (let i = 0; i < n * n; i++) cells.push(`<span class="ws-c">${esc(p.g[i].toUpperCase())}</span>`);
      el.innerHTML = `<div class="ws ws-${p.b}"><div class="ws-say"><p class="ws-msg" aria-live="polite"></p>` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'ws-spk' })}</div>` +
        `<div class="ws-main"><div class="ws-board" style="--n:${n}" role="img" aria-label="Letter grid, ${n} by ${n}">` +
        `<svg class="ws-ov" viewBox="0 0 ${n} ${n}" aria-hidden="true"></svg>${cells.join('')}</div>` +
        `<div class="ws-side"><p class="ws-count">${countTxt()}</p><ul class="ws-list" aria-label="Words to find">${list()}</ul></div></div></div>`;
      el.querySelector('.ws-spk').onclick = () => api.say(msg);
      overlay();
      say(msg || ask(p), mk);
      size();
      wire();
    }
    function refresh() {
      overlay();
      el.querySelector('.ws-list').innerHTML = list();
      el.querySelector('.ws-count').textContent = countTxt();
    }
    // the board: the largest square that fits beside (wide screens) or above the word list, squares at least 44 px when possible
    function size() {
      const b = el.querySelector('.ws-board'), ws = el.querySelector('.ws');
      if (!b || !el.clientWidth) return;
      const css = getComputedStyle(el), px = v => parseFloat(v) || 0;
      const w = el.clientWidth - px(css.paddingLeft) - px(css.paddingRight), h = el.clientHeight - px(css.paddingTop) - px(css.paddingBottom);
      const wide = innerWidth >= 700 && innerWidth > innerHeight * 1.2;
      ws.classList.toggle('wide', wide);
      const talk = el.querySelector('.ws-say').offsetHeight, side = el.querySelector('.ws-side').offsetHeight;
      const room = wide ? Math.min(w - 300, h - 8) : Math.min(w + 12, h - talk - side - 28, 600);
      cs = Math.max(30, Math.min(72, Math.floor((room - 8) / n)));
      b.style.setProperty('--cs', cs + 'px');
    }
    const onResize = () => { if (alive) size(); };
    addEventListener('resize', onResize);
    // pointer -> square; while dragging the line snaps to the nearest of the 8 directions and stays inside the grid
    function at(e) {
      const r = el.querySelector('.ws-c').getBoundingClientRect();
      return [(e.clientX - r.left) / cs - 0.5, (e.clientY - r.top) / cs - 0.5]; // in squares, from the centre of the top-left one
    }
    const clampI = v => Math.max(0, Math.min(n - 1, Math.round(v)));
    function snap(a, x, y) {
      const r0 = Math.floor(a / n), c0 = a % n, dx = x - c0, dy = y - r0;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 0.5) return a;
      const ang = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)), sc = Math.round(Math.cos(ang * Math.PI / 4)), sr = Math.round(Math.sin(ang * Math.PI / 4));
      let L = Math.round(Math.max(Math.abs(dx), Math.abs(dy)));
      while (L > 0 && (r0 + sr * L < 0 || r0 + sr * L >= n || c0 + sc * L < 0 || c0 + sc * L >= n)) L--;
      return (r0 + sr * L) * n + c0 + sc * L;
    }
    function live(a, b, cls) {
      const l = el.querySelector('.ws-live');
      if (!l) return;
      const [x1, y1] = ctr(a), [x2, y2] = ctr(b);
      l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.setAttribute('class', 'ws-live' + (cls ? ' ' + cls : ''));
      l.style.display = '';
    }
    const hideLive = () => { const l = el.querySelector('.ws-live'); if (l) l.style.display = 'none'; };
    function wire() {
      const b = el.querySelector('.ws-board');
      b.addEventListener('pointerdown', e => {
        if (done || !alive || (e.pointerType == 'mouse' && e.button)) return;
        e.preventDefault();
        try { b.setPointerCapture(e.pointerId); } catch (er) {}
        clearTimeout(tmo);
        const [x, y] = at(e), a = clampI(y) * n + clampI(x);
        drag = { id: e.pointerId, a, b: a };
        live(a, a);
      });
      b.addEventListener('pointermove', e => {
        if (!drag || e.pointerId != drag.id) return;
        const [x, y] = at(e), nb = snap(drag.a, x, y);
        if (nb != drag.b) { drag.b = nb; live(drag.a, nb); }
      });
      const up = e => {
        if (!drag || e.pointerId != drag.id) return;
        const d = drag;
        drag = null;
        if (e.type == 'pointercancel') { hideLive(); return; }
        if (d.a == d.b) tap(d.a);
        else { st.pk = -1; pick(d.a, d.b); }
      };
      b.addEventListener('pointerup', up);
      b.addEventListener('pointercancel', up);
    }
    // tap-then-tap: the first tap rings a letter, the second picks the line to it (another letter not in line starts again there)
    function tap(i) {
      if (st.pk < 0 || st.pk == i || !line(n, st.pk, i)) {
        st.pk = st.pk == i ? -1 : i;
        api.saveState(st);
        overlay();
        if (st.pk >= 0) { SFX.key(3); say('Now tap the last letter of the word.', ''); } else say(ask(p), '');
        return;
      }
      const a = st.pk;
      st.pk = -1;
      pick(a, i);
    }
    function pick(a, b) {
      const i = match(p, a, b), L = line(n, a, b).length;
      if (i >= 0 && !st.f.includes(i)) return found(i, false);
      if (i >= 0) {
        overlay();
        say(`You found ${p.w[i].t.toUpperCase()} already.`, '');
      } else if (L >= 3) {
        st.miss++;
        api.sfx.wrong();
        overlay();
        live(a, b, 'no');
        tmo = setTimeout(hideLive, 900);
        say('That is not one of the words. Try again!', 'try');
      } else {
        overlay();
        say(ask(p), '');
      }
      api.saveState(st);
    }
    function found(i, hinted) {
      st.f.push(i);
      if (hinted) st.hf.push(i);
      if (st.hw == i) { st.hw = -1; st.h = 0; }
      st.pk = -1;
      api.saveState(st);
      refresh();
      const W = p.w[i].t;
      if (st.f.length == N) {
        done = true;
        el.querySelector('.ws-board').classList.add('won');
        say('You found every word!', 'good', true);
        api.win({ mistakes: st.miss, note: [`${N} words found`] });
        return;
      }
      api.sfx.right();
      if (!hinted) say(`${W.toUpperCase()}! ${N - st.f.length} to go.`, 'good');
      api.say(W);
    }
    if (st.h && st.hw >= 0) { msg = hintText(p, st.hw, st.h); mk = 'hint'; }
    render();
    if (api.band == 'B' && !st.f.length && !st.h) api.say(ask(p));
    return {
      hint() {
        if (done || !alive) return false;
        const i = hintWord(p, st);
        if (i < 0) return false;
        const t = st.hw == i ? Math.min(3, st.h + 1) : 1;
        st.hw = i;
        st.h = t;
        st.pk = -1;
        say(hintText(p, i, t), 'hint', true);
        if (t == 3) found(i, true);
        else { api.saveState(st); overlay(); }
        return true;
      },
      destroy() { alive = false; clearTimeout(tmo); removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, fit, fresh, match, line, finds, wcells, pool, hintWord, hintText, TIER, SRC, DIRS, tierOf, rev, MILD };
})();

BT.reg({
  id: 'wsearch', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: WS.make, mount: WS.mount, solve: WS.solve,
});
/* ---------- Brain Teasers: Unscramble (P3-15; BRAIN_TEASERS.md 5.10, 7, 8) ----------
   One registered type, `scramble`, bands B C D. The letters of a word are mixed up on tiles; the child taps them into order.
     B (1-2)  a picture (picture words of 20-words.js that have a drawing): 3 words of 3 letters (levels 1-4), 3 of 4 (5-8), 4 of 4
     C (3-4)  a sentence with a gap (spelling levels 4-5, d-spell.js): 3 words of 5 letters, 4 of 5-6, 4 of 6
     D (5-6)  a sentence with a gap (spelling levels 6-7): 3 words of 7 letters, 4 of 7-8, 4 of 8-9
   One answer: a word is used only when no other real word has the same letters (the app's word lists and BTW.more, d-words-bt.js;
   tools/test.js checks against every word in the app's lists). The tiles never start in the word's order, never spell another
   word or a rude run, and in a word of 4 or more letters at least half the letters start out of place.
   Play: tap a tile and it goes to the first empty box; tap a box to send its tile back. When every box is full the word is checked:
   right, it turns green and is spoken; wrong, one mistake (allow 2): the letters in the wrong boxes go back and the right ones stay.
   Hints, per word (5.10: hint 2 places the first letter): 1 names the first and last letters (band B also says the word), 2 puts
   the first letter in its box, 3 puts the next letter in, and each press after that the next one, so a child can always finish.
   Letters a hint placed stay put (they are marked with a star-yellow edge).
   State (api.saveState): {i: word, sl: the tile in each box or -1, lk: boxes a hint filled, miss, h: hint tier of this word};
   US.fit rejects a state that does not belong to the puzzle. */
const US = (() => {
  // per band, levels 1-4 / 5-8 / 9-12: [words, shortest, longest]
  const TIER = {
    B: [[3, 3, 3], [3, 4, 4], [4, 4, 4]],
    C: [[3, 5, 5], [4, 5, 6], [4, 6, 6]],
    D: [[3, 7, 7], [4, 7, 8], [4, 8, 9]],
  };
  const SRC = { C: [4, 5], D: [6, 7] }; // spelling levels
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  const key = w => [...w].sort().join('');
  let dictK = null;
  const cache = {};
  // letters (sorted) -> the real words the app knows with those letters
  function dict() {
    if (dictK) return dictK;
    const all = BTW.more.split(' ');
    for (const lv in SPELL_WORDS) for (const ln of SPELL_WORDS[lv].split('\n')) all.push(ln.split('|')[0]);
    for (const l of DOL) all.push(...l);
    for (const L of [CVC, BLEND, SILENTE, TEAMS, DIGR, RVW, VTW, SYLP]) for (const x of L) all.push(x[0]);
    for (const l of SYLW) all.push(...l);
    dictK = {};
    for (const w of all) if (/^[a-z]+$/.test(w)) (dictK[key(w)] = dictK[key(w)] || new Set()).add(w);
    return dictK;
  }
  const alone = w => dict()[key(w)].size == 1;
  const rudeIn = s => BTW.rude.split(' ').some(r => s.includes(r));
  // the words a band can use: {w, c: the clue sentence with a gap (C, D)}
  function pool(band) {
    if (cache[band]) return cache[band];
    const lo = TIER[band][0][1], hi = TIER[band][2][2], out = [], seen = new Set(), add = (w, c) => {
      if (!/^[a-z]+$/.test(w) || w.length < lo || w.length > hi || seen.has(w) || BAD.test(w)) return;
      seen.add(w);
      if (dict()[key(w)] && alone(w)) out.push(c ? { w, c } : { w });
    };
    if (band == 'B') {
      for (const L of [CVC, BLEND, SILENTE, TEAMS, DIGR, RVW, VTW]) for (const x of L) if (ART[x[0]]) add(x[0]);
    } else {
      for (const lv of SRC[band]) for (const ln of SPELL_WORDS[lv].split('\n')) {
        const [w, s] = ln.split('|'), re = new RegExp('\\b' + w + '\\b', 'i');
        if (s && re.test(s)) add(w, s.replace(re, '___'));
      }
    }
    return cache[band] = out;
  }
  // mix the letters: never the word itself, never another word, no rude run; 4+ letters: at least half out of place
  function mix(w, rnd) {
    const a = [...w];
    for (let t = 0; t < 400; t++) {
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      const s = a.join(''), moved = a.filter((ch, i) => ch != w[i]).length;
      if (s != w && !dict()[key(w)].has(s) && !rudeIn(s) && (w.length < 4 || moved * 2 >= w.length)) return s;
    }
    throw new Error('unscramble: cannot mix ' + w);
  }
  function make(band, level, rnd) {
    const [k, lo, hi] = TIER[band][tierOf(level)];
    const cand = pool(band).filter(x => x.w.length >= lo && x.w.length <= hi);
    for (let i = cand.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cand[i], cand[j]] = [cand[j], cand[i]]; }
    // a spread of lengths when the tier allows two (the longer ones last)
    const pick = cand.slice(0, k).sort((x, y) => x.w.length - y.w.length);
    return { b: band, items: pick.map(x => Object.assign({ s: mix(x.w, rnd) }, x)) };
  }
  // the tiles in order for every word (indexes into the scrambled letters): what the smoke bot taps
  function order(it) {
    const used = [];
    return [...it.w].map(ch => { const t = [...it.s].findIndex((c, j) => c == ch && !used.includes(j)); used.push(t); return t; });
  }
  const solve = p => p.items.map(order);
  const fresh = p => ({ i: 0, sl: Array(p.items[0].w.length).fill(-1), lk: 0, miss: 0, h: 0 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(s.i, 0, p.items.length - 1) || !int(s.miss, 0, 999) || !int(s.h, 0, 3)) return false;
    const it = p.items[s.i], L = it.w.length;
    if (!Array.isArray(s.sl) || s.sl.length != L || !int(s.lk, 0, L - 1)) return false;
    const t = s.sl.filter(x => x >= 0);
    if (!s.sl.every(x => int(x, -1, L - 1)) || new Set(t).size != t.length || t.length == L) return false;
    for (let k = 0; k < s.lk; k++) if (s.sl[k] < 0 || it.s[s.sl[k]] != it.w[k]) return false;
    return true;
  }
  // put tile t in box k (a hint): whatever sat in box k goes back, t leaves the box it was in
  function placeAt(s, k, t) {
    const was = s.sl.indexOf(t);
    if (was >= 0) s.sl[was] = -1;
    s.sl[k] = t;
  }
  // the tile a hint puts in box k: one with the right letter, preferably still in the tray (never one a hint locked)
  function hintTile(it, s, k) {
    const ok = [...it.s].map((c, j) => j).filter(j => it.s[j] == it.w[k] && !(s.sl.indexOf(j) >= 0 && s.sl.indexOf(j) < s.lk));
    const free = ok.filter(j => s.sl.indexOf(j) < 0);
    return (free.length ? free : ok)[0];
  }
  // check a full row: 'ok', or the boxes whose letters are wrong
  function check(it, s) {
    const got = s.sl.map(t => it.s[t]).join('');
    return got == it.w ? 'ok' : s.sl.map((t, k) => it.s[t] != it.w[k] ? k : -1).filter(k => k >= 0);
  }
  const cap = ch => ch.toUpperCase();
  function hintText(p, s, t) {
    const it = p.items[s.i], f = cap(it.w[0]), l = cap(it.w[it.w.length - 1]);
    if (t == 1) return (p.b == 'B' ? `Say it slowly: ${it.w}. ` : '') + `It starts with ${f} and ends with ${l}.`;
    if (t == 2) return `${f} goes first.`;
    return 'Here is the next letter.';
  }
  const ASK = { B: 'Put the letters in order to spell the picture.', C: 'Put the letters in order to make the missing word.', D: 'Put the letters in order to make the missing word.' };

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    let alive = true, msg = '', mk = '', done = false, busy = false, tmo = 0;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.us-msg');
      if (m) { m.textContent = t; m.className = 'us-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const it = () => p.items[st.i];
    const clueTxt = () => p.b == 'B' ? ASK.B : it().c.replace('___', 'blank');
    function card() {
      const x = it(), dots = p.items.map((_, k) => `<i class="${k < st.i ? 'on' : k == st.i ? 'now' : ''}"></i>`).join('');
      const body = p.b == 'B' ? `<div class="us-pic">${picFor(x.w, '')}</div>` :
        `<p class="us-clue">${esc(x.c).replace('___', '<span class="us-gap" aria-label="blank"></span>')}</p>`;
      return `<div class="us-card"><div class="us-dots" aria-label="Word ${st.i + 1} of ${p.items.length}">${dots}</div>${body}` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'us-spk' })}</div>`;
    }
    function boxes() {
      const x = it();
      return st.sl.map((t, k) => t < 0 ? `<button class="us-box" data-k="${k}" aria-label="Box ${k + 1}, empty"></button>` :
        `<button class="us-box full${k < st.lk ? ' lk' : ''}" data-k="${k}" aria-label="Box ${k + 1}: ${cap(x.s[t])}"${k < st.lk ? ' disabled' : ''}>` +
        `<span>${cap(x.s[t])}</span></button>`).join('');
    }
    function tiles() {
      const x = it();
      return [...x.s].map((ch, t) => st.sl.includes(t) ? `<span class="us-tile gone" aria-hidden="true"></span>` :
        `<button class="us-tile" data-t="${t}" aria-label="Letter ${cap(ch)}"><span>${cap(ch)}</span></button>`).join('');
    }
    function render() {
      const L = it().w.length;
      el.innerHTML = `<div class="us us-${p.b}${L > 6 ? ' long' : ''}" style="--len:${L}">${card()}<p class="us-msg" aria-live="polite"></p>` +
        `<div class="us-row us-boxes" role="group" aria-label="Your word">${boxes()}</div>` +
        `<div class="us-row us-tray" role="group" aria-label="Letters">${tiles()}</div></div>`;
      el.querySelector('.us-spk').onclick = () => api.say(p.b == 'B' ? msg : clueTxt());
      el.querySelectorAll('.us-tile[data-t]').forEach(b => b.onclick = () => tapTile(+b.dataset.t));
      el.querySelectorAll('.us-box.full:not(.lk)').forEach(b => b.onclick = () => tapBox(+b.dataset.k));
      say(msg || ASK[p.b], mk);
      fitRows();
    }
    // as many tiles in a row as fit, the rows balanced (8 letters on a phone: 4 and 4, not 6 and 2)
    function fitRows() {
      const u = el.querySelector('.us'), m = el.querySelector('.us-msg');
      if (!u || !m.clientWidth) return;
      const ts = parseFloat(getComputedStyle(u).getPropertyValue('--ts')) || 56, L = it().w.length;
      const fit = Math.max(1, Math.floor((m.clientWidth - 20 + 8) / (ts + 8))), rows = Math.ceil(L / fit);
      u.style.setProperty('--cols', Math.ceil(L / rows));
    }
    const onResize = () => { if (alive) fitRows(); };
    addEventListener('resize', onResize);
    function tapTile(t) {
      if (!alive || done || busy || st.sl.includes(t)) return;
      const k = st.sl.indexOf(-1);
      if (k < 0) return;
      st.sl[k] = t;
      SFX.key(1 + (k % 8));
      after();
    }
    function tapBox(k) {
      if (!alive || done || busy || k < st.lk || st.sl[k] < 0) return;
      st.sl[k] = -1;
      api.sfx.click();
      api.saveState(st);
      render();
    }
    // after a tile goes in: a full row is checked
    function after() {
      if (st.sl.includes(-1)) { api.saveState(st); return render(); }
      const r = check(it(), st);
      if (r == 'ok') return solved();
      st.miss++;
      api.sfx.wrong();
      busy = true;
      render(); // the full row, its wrong boxes shaking, for a moment
      el.querySelectorAll('.us-box').forEach(b => { b.disabled = true; if (r.includes(+b.dataset.k)) b.classList.add('no'); });
      say(r.length == st.sl.length - st.lk ? 'Not quite. Try another order!' : 'Not quite. The letters that fit stay in their boxes.', 'try');
      r.forEach(k => { st.sl[k] = -1; }); // saved at once, so leaving mid-shake resumes with them back in the tray
      api.saveState(st);
      tmo = setTimeout(() => { busy = false; if (alive) render(); }, 700);
    }
    function solved() {
      const x = it();
      busy = true;
      render();
      el.querySelector('.us-boxes').classList.add('ok');
      el.querySelectorAll('.us-box').forEach(b => { b.disabled = true; });
      api.sfx.right();
      say(`Yes! ${x.w.toUpperCase()}`, 'good');
      api.say(x.w);
      if (st.i == p.items.length - 1) {
        done = true;
        api.win({ mistakes: st.miss, note: [p.items.map(y => y.w).join(', ')] });
        return;
      }
      st.i++;
      st.sl = Array(it().w.length).fill(-1);
      st.lk = 0;
      st.h = 0;
      api.saveState(st);
      tmo = setTimeout(() => {
        busy = false;
        if (!alive) return;
        msg = '';
        mk = '';
        render();
      }, 1100);
    }
    if (st.h) { msg = hintText(p, st, st.h); mk = 'hint'; }
    render();
    if (api.band == 'B' && st.i == 0 && !st.sl.some(t => t >= 0) && !st.h) api.say(ASK.B);
    return {
      hint() {
        if (done || !alive || busy) return false;
        const t = Math.min(3, st.h + 1), x = it();
        if (t == 1) {
          st.h = 1;
          api.saveState(st);
          say(hintText(p, st, 1), 'hint', true);
          return true;
        }
        const k = st.lk;
        if (k >= x.w.length) return false;
        placeAt(st, k, hintTile(x, st, k));
        st.lk = k + 1;
        st.h = t;
        say(hintText(p, st, t), 'hint', true);
        if (!st.sl.includes(-1) && check(x, st) == 'ok') { solved(); return true; }
        if (!st.sl.includes(-1)) { // full but wrong: the boxes after the hint go back
          for (let j = st.lk; j < st.sl.length; j++) if (x.s[st.sl[j]] != x.w[j]) st.sl[j] = -1;
        }
        api.saveState(st);
        render();
        return true;
      },
      destroy() { alive = false; clearTimeout(tmo); removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, fit, fresh, pool, dict, mix, order, check, placeAt, hintTile, hintText, TIER, SRC, tierOf, key };
})();

BT.reg({
  id: 'scramble', // name, icon, bands, allow, rules: BT.CAT in 74-teasers.js (P6-03: Home and the hub need them before this file loads)
  make: US.make, mount: US.mount, solve: US.solve,
});
/* Memory Match words (P3-14, BRAIN_TEASERS 5.9). Data only; read by src/js/82-bt-memory.js inside functions (A11).
   themes: picture names (emoji fallback in RIDDLES.pics, src/data/d-riddles.js) for band A picture-picture and band B word-picture.
   syn: band C synonym pairs; no word is a synonym of a word in another pair, so every card has exactly one partner.
   roots: band D word roots and their meaning; no two meanings overlap (hear / sound, write / draw were left out for that).
   Band C Spanish-English pairs come from SPN (src/js/34-gen-es.js); fractions, decimals, percents, numbers and dots are made in code. */
var MEMW = {
  themes: {
    animals: ['cat', 'dog', 'pig', 'duck', 'frog', 'fish', 'hen', 'cow', 'owl', 'bee', 'snail', 'turtle', 'mouse', 'elephant',
      'giraffe', 'penguin', 'octopus', 'ant'],
    food: ['apple', 'banana', 'cookie', 'cake', 'milk', 'cheese', 'grapes', 'egg', 'bread', 'pizza', 'watermelon', 'icecream'],
    toys: ['ball', 'drum', 'kite', 'teddy', 'robot', 'gift', 'hat', 'cup', 'bed', 'book', 'bell', 'crown', 'dice'],
    go: ['car', 'bus', 'bike', 'ship', 'rocket', 'plane', 'tractor', 'helicopter', 'fire-engine'],
    sky: ['sun', 'moon', 'star', 'cloud', 'rainbow', 'tree', 'flower', 'snowman', 'web', 'shell'],
  },
  syn: [['big', 'large'], ['small', 'tiny'], ['happy', 'glad'], ['sad', 'unhappy'], ['fast', 'quick'], ['start', 'begin'],
    ['end', 'finish'], ['shut', 'close'], ['smart', 'clever'], ['angry', 'mad'], ['loud', 'noisy'], ['jump', 'leap'],
    ['shout', 'yell'], ['rock', 'stone'], ['gift', 'present'], ['easy', 'simple'], ['sick', 'ill'], ['cold', 'chilly'],
    ['talk', 'speak'], ['wet', 'damp']],
  roots: [['bio', 'life'], ['geo', 'earth'], ['tele', 'far'], ['micro', 'small'], ['phon', 'sound'], ['graph', 'write'],
    ['aqua', 'water'], ['astro', 'star'], ['chron', 'time'], ['port', 'carry'], ['therm', 'heat'], ['photo', 'light'],
    ['auto', 'self'], ['dent', 'tooth'], ['spect', 'look'], ['tri', 'three'], ['cent', 'hundred'], ['multi', 'many'],
    ['mono', 'one'], ['rupt', 'break'], ['struct', 'build'], ['cycl', 'circle'], ['manu', 'hand']],
};
/* Logic grid banks (P3-06, BRAIN_TEASERS 5.3). GENERATED by `node tools/puzzles/build-banks.js logic` from seed 'star-school-logic-1':
   do not edit by hand; change the generator (tools/puzzles/logic.js) and rerun it. Same seed, same file, byte for byte.
   PUZ.logic[band] = [36 puzzles]: B 3 children x 1 picture category, C 3 x 2 categories, D 4 x 2 (the second ordered),
   sorted by score, so level L (1-12) is entries 3(L-1) to 3L-1. A puzzle is [head, clue, clue, ...]:
   head = 'names|cat=item,item,...[;cat=...]|solution|grade|score'; solution = per category (joined by ;) the item index of
   each child in name order. An entity is (category, item): category 0 = the children (item = name index), 1.. = head order.
   Clues (the sentence is last; the first entity is its subject):
     ['is', c1, i1, c2, i2, text]   same child            ['not', c1, i1, c2, i2, text]  different children
     ['or', c, i, d, j1, j2, text]  (c,i) has item j1 or j2 of category d
     ['gt' | 'lt' | 'nx', c1, i1, c2, i2, text]  in the ordered category, (c1,i1)'s item index is bigger / smaller /
     one apart (race places: a smaller index finished ahead).
   grade = hardest technique of the grader in tools/puzzles/logic.js (1 clue mark, 2 only place left, 3 link, 4 two-way
   clue, 5 chain); score = grade x 100 + effort. Every puzzle has exactly one solution and no clue can be left out
   (tools/test.js proves both with its own counter). cats[id] = {label, ordered, pics: {item: emoji fallback for
   picFor(item, emoji)}}. PUZ is shared by all puzzle banks. */
var PUZ = PUZ || {};
PUZ.logic = {
  cats: {
    pet: {label: 'Pet', pics: {cat: '🐱', dog: '🐶', fish: '🐟', rabbit: '🐰', bird: '🐦', frog: '🐸', turtle: '🐢', mouse: '🐭'}},
    snack: {label: 'Snack', pics: {apple: '🍎', banana: '🍌', grapes: '🍇', cheese: '🧀', cookie: '🍪', cupcake: '🧁', pizza: '🍕', watermelon: '🍉'}},
    sport: {label: 'Sport', pics: {soccer: '⚽', tennis: '🎾', basketball: '🏀', swim: '🏊', skate: '⛸️'}},
    hobby: {label: 'Hobby', pics: {paint: '🎨', read: '📖', draw: '✏️', puzzle: '🧩'}},
    music: {label: 'Music', pics: {drum: '🥁', guitar: '🎸', trumpet: '🎺'}},
    ride: {label: 'Ride', pics: {bike: '🚲', bus: '🚌', train: '🚂', boat: '⛵', tractor: '🚜'}},
    colour: {label: 'Color'},
    age: {label: 'Age', ordered: 1},
    house: {label: 'House', ordered: 1},
    race: {label: 'Race', ordered: 1},
  },
  B: [
    ['Ella,Ben,Tom|hobby=paint,draw,puzzle|201|2|204',
      ['is', 0, 1, 1, 0, 'Ben paints.'],
      ['is', 0, 0, 1, 2, 'Ella does puzzles.'],
    ],
    ['Finn,Kim,Ana|ride=bus,boat,tractor|102|2|204',
      ['is', 0, 2, 1, 2, 'Ana rides the tractor.'],
      ['is', 0, 1, 1, 0, 'Kim rides the bus.'],
    ],
    ['Finn,Omar,Ada|sport=tennis,basketball,swim|102|2|204',
      ['is', 0, 1, 1, 0, 'Omar plays tennis.'],
      ['is', 0, 2, 1, 2, 'Ada swims.'],
    ],
    ['Tom,Ivan,Noah|snack=grapes,cheese,cupcake|021|2|204',
      ['is', 0, 0, 1, 0, 'Tom eats the grapes.'],
      ['is', 0, 1, 1, 2, 'Ivan eats the cupcake.'],
    ],
    ['Yuki,Hugo,Jun|music=drum,guitar,trumpet|210|2|204',
      ['is', 0, 1, 1, 1, 'Hugo plays the guitar.'],
      ['is', 0, 2, 1, 0, 'Jun plays the drum.'],
    ],
    ['Ada,Kai,Tara|pet=fish,turtle,mouse|120|2|206',
      ['is', 0, 2, 1, 0, 'Tara has the fish.'],
      ['not', 0, 0, 1, 2, 'Ada does not have the mouse.'],
    ],
    ['Ana,Luca,Kai|ride=bike,bus,tractor|012|2|206',
      ['is', 0, 1, 1, 1, 'Luca rides the bus.'],
      ['not', 0, 2, 1, 0, 'Kai does not ride the bike.'],
    ],
    ['Ava,Finn,Dev|hobby=paint,read,puzzle|021|2|206',
      ['is', 0, 0, 1, 0, 'Ava paints.'],
      ['not', 0, 2, 1, 2, 'Dev does not do puzzles.'],
    ],
    ['Eli,Dev,Finn|snack=grapes,cookie,pizza|012|2|206',
      ['not', 0, 0, 1, 2, 'Eli does not eat the pizza.'],
      ['is', 0, 1, 1, 1, 'Dev eats the cookie.'],
    ],
    ['Eli,Jun,Leo|snack=cheese,cupcake,pizza|210|2|206',
      ['is', 0, 0, 1, 2, 'Eli eats the pizza.'],
      ['not', 0, 2, 1, 1, 'Leo does not eat the cupcake.'],
    ],
    ['Eli,Omar,Raj|pet=fish,bird,mouse|021|2|206',
      ['not', 0, 2, 1, 2, 'Raj does not have the mouse.'],
      ['is', 0, 0, 1, 0, 'Eli has the fish.'],
    ],
    ['Ella,Raj,Dev|ride=bus,boat,tractor|102|2|206',
      ['not', 0, 2, 1, 0, 'Dev does not ride the bus.'],
      ['is', 0, 0, 1, 1, 'Ella rides the boat.'],
    ],
    ['Hugo,Ravi,Mia|sport=tennis,basketball,skate|210|2|206',
      ['is', 0, 1, 1, 1, 'Ravi plays basketball.'],
      ['not', 0, 0, 1, 0, 'Hugo does not play tennis.'],
    ],
    ['Jun,Eli,Kim|hobby=paint,draw,puzzle|021|2|206',
      ['not', 0, 0, 1, 2, 'Jun does not do puzzles.'],
      ['is', 0, 2, 1, 1, 'Kim draws.'],
    ],
    ['Leo,Theo,Ravi|pet=dog,bird,mouse|201|2|206',
      ['is', 0, 1, 1, 0, 'Theo has the dog.'],
      ['not', 0, 2, 1, 2, 'Ravi does not have the mouse.'],
    ],
    ['Max,Zoe,Owen|sport=tennis,swim,skate|012|2|206',
      ['is', 0, 2, 1, 2, 'Owen skates.'],
      ['not', 0, 1, 1, 0, 'Zoe does not play tennis.'],
    ],
    ['Maya,Kim,Ana|pet=cat,rabbit,turtle|012|2|206',
      ['is', 0, 2, 1, 2, 'Ana has the turtle.'],
      ['not', 0, 0, 1, 1, 'Maya does not have the rabbit.'],
    ],
    ['Maya,Kim,Zoe|sport=soccer,basketball,skate|021|2|206',
      ['is', 0, 0, 1, 0, 'Maya plays soccer.'],
      ['not', 0, 1, 1, 1, 'Kim does not play basketball.'],
    ],
    ['Noah,Zoe,Kai|snack=banana,grapes,cupcake|012|2|206',
      ['is', 0, 2, 1, 2, 'Kai eats the cupcake.'],
      ['not', 0, 1, 1, 0, 'Zoe does not eat the banana.'],
    ],
    ['Theo,Owen,Ella|music=drum,guitar,trumpet|201|2|206',
      ['not', 0, 1, 1, 2, 'Owen does not play the trumpet.'],
      ['is', 0, 2, 1, 1, 'Ella plays the guitar.'],
    ],
    ['Tom,Maya,Ella|snack=apple,grapes,pizza|201|2|206',
      ['not', 0, 0, 1, 1, 'Tom does not eat the grapes.'],
      ['is', 0, 1, 1, 0, 'Maya eats the apple.'],
    ],
    ['Zara,Finn,Max|sport=soccer,tennis,swim|201|2|206',
      ['is', 0, 2, 1, 1, 'Max plays tennis.'],
      ['not', 0, 1, 1, 2, 'Finn does not swim.'],
    ],
    ['Ada,Zoe,Mia|snack=banana,pizza,watermelon|012|2|209',
      ['not', 0, 0, 1, 1, 'Ada does not eat the pizza.'],
      ['not', 0, 2, 1, 1, 'Mia does not eat the pizza.'],
      ['not', 0, 0, 1, 2, 'Ada does not eat the watermelon.'],
    ],
    ['Ava,Eli,Yuki|hobby=paint,read,puzzle|012|2|209',
      ['not', 0, 2, 1, 0, 'Yuki does not paint.'],
      ['not', 0, 2, 1, 1, 'Yuki does not read.'],
      ['not', 0, 1, 1, 0, 'Eli does not paint.'],
    ],
    ['Ben,Eli,Theo|snack=apple,banana,cookie|201|2|209',
      ['not', 0, 0, 1, 1, 'Ben does not eat the banana.'],
      ['not', 0, 1, 1, 1, 'Eli does not eat the banana.'],
      ['not', 0, 0, 1, 0, 'Ben does not eat the apple.'],
    ],
    ['Eli,Tara,Max|snack=cheese,cookie,cupcake|021|2|209',
      ['not', 0, 0, 1, 2, 'Eli does not eat the cupcake.'],
      ['not', 0, 0, 1, 1, 'Eli does not eat the cookie.'],
      ['not', 0, 2, 1, 2, 'Max does not eat the cupcake.'],
    ],
    ['Ella,Nora,Kim|ride=bike,bus,boat|012|2|209',
      ['not', 0, 0, 1, 1, 'Ella does not ride the bus.'],
      ['not', 0, 0, 1, 2, 'Ella does not ride the boat.'],
      ['not', 0, 2, 1, 1, 'Kim does not ride the bus.'],
    ],
    ['Ivan,Ben,Hugo|snack=banana,grapes,pizza|201|2|209',
      ['not', 0, 1, 1, 1, 'Ben does not eat the grapes.'],
      ['not', 0, 2, 1, 2, 'Hugo does not eat the pizza.'],
      ['not', 0, 1, 1, 2, 'Ben does not eat the pizza.'],
    ],
    ['Luca,Ella,Tom|hobby=paint,read,draw|201|2|209',
      ['not', 0, 2, 1, 0, 'Tom does not paint.'],
      ['not', 0, 2, 1, 2, 'Tom does not draw.'],
      ['not', 0, 0, 1, 0, 'Luca does not paint.'],
    ],
    ['Max,Luca,Tom|snack=banana,cheese,cupcake|210|2|209',
      ['not', 0, 1, 1, 2, 'Luca does not eat the cupcake.'],
      ['not', 0, 1, 1, 0, 'Luca does not eat the banana.'],
      ['not', 0, 0, 1, 0, 'Max does not eat the banana.'],
    ],
    ['Max,Zoe,Tara|sport=soccer,tennis,basketball|012|2|209',
      ['not', 0, 0, 1, 1, 'Max does not play tennis.'],
      ['not', 0, 0, 1, 2, 'Max does not play basketball.'],
      ['not', 0, 1, 1, 2, 'Zoe does not play basketball.'],
    ],
    ['Maya,Luca,Ben|snack=grapes,cookie,cupcake|201|2|209',
      ['not', 0, 1, 1, 2, 'Luca does not eat the cupcake.'],
      ['not', 0, 1, 1, 1, 'Luca does not eat the cookie.'],
      ['not', 0, 2, 1, 2, 'Ben does not eat the cupcake.'],
    ],
    ['Nia,Theo,Ada|music=drum,guitar,trumpet|021|2|209',
      ['not', 0, 0, 1, 2, 'Nia does not play the trumpet.'],
      ['not', 0, 2, 1, 2, 'Ada does not play the trumpet.'],
      ['not', 0, 2, 1, 0, 'Ada does not play the drum.'],
    ],
    ['Raj,Dev,Omar|snack=grapes,cupcake,watermelon|102|2|209',
      ['not', 0, 0, 1, 2, 'Raj does not eat the watermelon.'],
      ['not', 0, 0, 1, 0, 'Raj does not eat the grapes.'],
      ['not', 0, 1, 1, 2, 'Dev does not eat the watermelon.'],
    ],
    ['Sam,Tara,Leo|ride=bike,train,boat|012|2|209',
      ['not', 0, 2, 1, 0, 'Leo does not ride the bike.'],
      ['not', 0, 1, 1, 2, 'Tara does not ride the boat.'],
      ['not', 0, 1, 1, 0, 'Tara does not ride the bike.'],
    ],
    ['Zoe,Ivan,Dev|sport=soccer,swim,skate|021|2|209',
      ['not', 0, 0, 1, 1, 'Zoe does not swim.'],
      ['not', 0, 1, 1, 1, 'Ivan does not swim.'],
      ['not', 0, 1, 1, 0, 'Ivan does not play soccer.'],
    ],
  ],
  C: [
    ['Finn,Ravi,Nia|hobby=read,draw,puzzle;colour=yellow,purple,orange|102;012|3|316',
      ['is', 0, 2, 1, 2, 'Nia does puzzles.'],
      ['is', 1, 1, 2, 0, 'The child who draws likes yellow.'],
      ['is', 2, 2, 1, 2, 'The child who likes orange does puzzles.'],
      ['is', 0, 0, 1, 1, 'Finn draws.'],
    ],
    ['Ella,Kim,Yuki|sport=soccer,basketball,skate;ride=bike,bus,train|021;012|3|318',
      ['is', 0, 0, 1, 0, 'Ella plays soccer.'],
      ['not', 1, 2, 2, 0, 'The child who skates does not ride the bike.'],
      ['is', 0, 2, 2, 2, 'Yuki rides the train.'],
      ['is', 2, 2, 1, 1, 'The child who rides the train plays basketball.'],
    ],
    ['Kai,Hugo,Amir|hobby=read,draw,puzzle;colour=red,green,orange|102;201|3|318',
      ['is', 0, 1, 1, 0, 'Hugo reads.'],
      ['is', 0, 2, 1, 2, 'Amir does puzzles.'],
      ['is', 2, 0, 1, 0, 'The child who likes red reads.'],
      ['not', 2, 1, 1, 1, 'The child who likes green does not draw.'],
    ],
    ['Leo,Ava,Ivan|hobby=paint,draw,puzzle;snack=apple,cupcake,pizza|210;201|3|318',
      ['is', 0, 0, 1, 2, 'Leo does puzzles.'],
      ['is', 1, 1, 2, 0, 'The child who draws eats the apple.'],
      ['is', 0, 1, 2, 0, 'Ava eats the apple.'],
      ['not', 1, 2, 2, 1, 'The child who does puzzles does not eat the cupcake.'],
    ],
    ['Zara,Max,Ada|snack=grapes,cupcake,pizza;ride=bike,bus,boat|102;012|3|318',
      ['is', 0, 0, 2, 0, 'Zara rides the bike.'],
      ['not', 0, 2, 1, 0, 'Ada does not eat the grapes.'],
      ['is', 2, 0, 1, 1, 'The child who rides the bike eats the cupcake.'],
      ['is', 1, 2, 2, 2, 'The child who eats the pizza rides the boat.'],
    ],
    ['Ana,Mia,Yuki|pet=cat,rabbit,bird;ride=bike,train,boat|210;120|3|320',
      ['not', 0, 2, 2, 2, 'Yuki does not ride the boat.'],
      ['is', 0, 0, 2, 1, 'Ana rides the train.'],
      ['is', 1, 2, 2, 1, 'The bird\'s owner rides the train.'],
      ['not', 0, 2, 1, 1, 'Yuki does not have the rabbit.'],
    ],
    ['Eli,Maya,Kai|sport=basketball,swim,skate;snack=cheese,cookie,watermelon|210;012|3|320',
      ['not', 0, 0, 2, 2, 'Eli does not eat the watermelon.'],
      ['is', 0, 1, 2, 1, 'Maya eats the cookie.'],
      ['is', 1, 2, 2, 0, 'The child who skates eats the cheese.'],
      ['not', 0, 2, 1, 1, 'Kai does not swim.'],
    ],
    ['Ella,Sam,Amir|colour=blue,green,orange;music=drum,guitar,trumpet|201;102|3|320',
      ['not', 0, 2, 1, 2, 'Amir does not like orange.'],
      ['not', 1, 2, 2, 2, 'The child who likes orange does not play the trumpet.'],
      ['is', 1, 0, 2, 0, 'The child who likes blue plays the drum.'],
      ['is', 0, 1, 2, 0, 'Sam plays the drum.'],
    ],
    ['Jun,Mia,Luca|snack=cheese,pizza,watermelon;music=drum,guitar,trumpet|012;021|3|320',
      ['not', 0, 2, 1, 1, 'Luca does not eat the pizza.'],
      ['is', 2, 1, 1, 2, 'The child who plays the guitar eats the watermelon.'],
      ['not', 2, 2, 1, 0, 'The child who plays the trumpet does not eat the cheese.'],
      ['is', 0, 0, 2, 0, 'Jun plays the drum.'],
    ],
    ['Kim,Eli,Sam|music=drum,guitar,trumpet;ride=bike,bus,boat|201;012|3|320',
      ['not', 0, 0, 2, 1, 'Kim does not ride the bus.'],
      ['is', 0, 2, 1, 1, 'Sam plays the guitar.'],
      ['is', 1, 0, 2, 1, 'The child who plays the drum rides the bus.'],
      ['not', 2, 0, 1, 1, 'The child who rides the bike does not play the guitar.'],
    ],
    ['Noah,Kim,Ava|pet=rabbit,frog,turtle;music=drum,guitar,trumpet|120;201|3|320',
      ['not', 1, 2, 2, 2, 'The turtle\'s owner does not play the trumpet.'],
      ['not', 0, 1, 2, 2, 'Kim does not play the trumpet.'],
      ['is', 2, 1, 1, 0, 'The child who plays the guitar has the rabbit.'],
      ['is', 0, 2, 2, 1, 'Ava plays the guitar.'],
    ],
    ['Nora,Kim,Luca|music=drum,guitar,trumpet;snack=cookie,pizza,watermelon|021;201|3|320',
      ['not', 0, 0, 1, 1, 'Nora does not play the guitar.'],
      ['is', 0, 1, 2, 0, 'Kim eats the cookie.'],
      ['is', 1, 2, 2, 0, 'The child who plays the trumpet eats the cookie.'],
      ['is', 0, 2, 2, 1, 'Luca eats the pizza.'],
    ],
    ['Zara,Noah,Lena|hobby=read,draw,puzzle;ride=bike,boat,tractor|102;120|3|320',
      ['not', 0, 1, 2, 0, 'Noah does not ride the bike.'],
      ['is', 1, 2, 2, 0, 'The child who does puzzles rides the bike.'],
      ['not', 2, 2, 1, 1, 'The child who rides the tractor does not draw.'],
      ['is', 0, 0, 1, 1, 'Zara draws.'],
    ],
    ['Zoe,Hugo,Omar|ride=bike,bus,train;hobby=paint,read,puzzle|120;021|3|320',
      ['is', 0, 2, 1, 0, 'Omar rides the bike.'],
      ['not', 1, 1, 2, 1, 'The child who rides the bus does not read.'],
      ['is', 2, 2, 1, 2, 'The child who does puzzles rides the train.'],
      ['not', 0, 0, 1, 2, 'Zoe does not ride the train.'],
    ],
    ['Ben,Tara,Ada|music=drum,guitar,trumpet;pet=cat,fish,frog|120;102|3|322',
      ['is', 0, 2, 1, 0, 'Ada plays the drum.'],
      ['not', 0, 1, 1, 1, 'Tara does not play the guitar.'],
      ['is', 2, 2, 1, 0, 'The frog\'s owner plays the drum.'],
      ['not', 0, 0, 2, 0, 'Ben does not have the cat.'],
    ],
    ['Lena,Ben,Maya|hobby=paint,read,draw;music=drum,guitar,trumpet|201;201|3|322',
      ['is', 1, 1, 2, 1, 'The child who reads plays the guitar.'],
      ['not', 0, 1, 1, 1, 'Ben does not read.'],
      ['not', 0, 0, 1, 0, 'Lena does not paint.'],
      ['is', 0, 0, 2, 2, 'Lena plays the trumpet.'],
    ],
    ['Nia,Tara,Lena|ride=train,boat,tractor;colour=blue,green,purple|102;120|3|322',
      ['is', 0, 1, 1, 0, 'Tara rides the train.'],
      ['not', 0, 2, 2, 1, 'Lena does not like green.'],
      ['is', 1, 2, 2, 0, 'The child who rides the tractor likes blue.'],
      ['not', 0, 1, 2, 1, 'Tara does not like green.'],
    ],
    ['Nora,Kai,Eli|snack=banana,grapes,cookie;pet=cat,turtle,mouse|210;021|3|322',
      ['not', 2, 1, 1, 2, 'The turtle\'s owner does not eat the cookie.'],
      ['is', 0, 1, 2, 2, 'Kai has the mouse.'],
      ['not', 0, 2, 1, 1, 'Eli does not eat the grapes.'],
      ['is', 0, 0, 1, 2, 'Nora eats the cookie.'],
    ],
    ['Tara,Mia,Zoe|music=drum,guitar,trumpet;pet=dog,fish,mouse|201;120|3|322',
      ['not', 1, 1, 2, 2, 'The child who plays the guitar does not have the mouse.'],
      ['is', 0, 0, 2, 1, 'Tara has the fish.'],
      ['not', 1, 1, 2, 1, 'The child who plays the guitar does not have the fish.'],
      ['is', 0, 1, 1, 0, 'Mia plays the drum.'],
    ],
    ['Ana,Nora,Eli|music=drum,guitar,trumpet;colour=green,yellow,orange|102;210|3|323',
      ['not', 0, 0, 1, 0, 'Ana does not play the drum.'],
      ['not', 2, 1, 1, 2, 'The child who likes yellow does not play the trumpet.'],
      ['not', 2, 2, 1, 2, 'The child who likes orange does not play the trumpet.'],
      ['is', 0, 2, 2, 0, 'Eli likes green.'],
      ['not', 2, 2, 1, 0, 'The child who likes orange does not play the drum.'],
    ],
    ['Dev,Jun,Yuki|sport=soccer,basketball,skate;snack=apple,banana,pizza|012;102|3|323',
      ['is', 0, 1, 2, 0, 'Jun eats the apple.'],
      ['not', 1, 2, 2, 0, 'The child who skates does not eat the apple.'],
      ['not', 1, 0, 2, 0, 'The child who plays soccer does not eat the apple.'],
      ['not', 0, 0, 1, 2, 'Dev does not skate.'],
      ['is', 0, 2, 2, 2, 'Yuki eats the pizza.'],
    ],
    ['Luca,Max,Zoe|pet=dog,fish,turtle;ride=bike,boat,tractor|021;012|3|323',
      ['not', 0, 0, 1, 1, 'Luca does not have the fish.'],
      ['not', 0, 0, 2, 1, 'Luca does not ride the boat.'],
      ['not', 0, 2, 2, 1, 'Zoe does not ride the boat.'],
      ['is', 1, 0, 2, 0, 'The dog\'s owner rides the bike.'],
      ['not', 2, 2, 1, 2, 'The child who rides the tractor does not have the turtle.'],
    ],
    ['Max,Zara,Ava|pet=cat,dog,mouse;ride=bus,boat,tractor|120;021|3|323',
      ['not', 1, 1, 2, 1, 'The dog\'s owner does not ride the boat.'],
      ['not', 0, 1, 1, 0, 'Zara does not have the cat.'],
      ['not', 0, 1, 2, 0, 'Zara does not ride the bus.'],
      ['is', 1, 2, 2, 2, 'The mouse\'s owner rides the tractor.'],
      ['not', 0, 2, 2, 0, 'Ava does not ride the bus.'],
    ],
    ['Mia,Finn,Kai|snack=grapes,pizza,watermelon;music=drum,guitar,trumpet|021;021|3|323',
      ['not', 2, 0, 1, 2, 'The child who plays the drum does not eat the watermelon.'],
      ['not', 0, 0, 2, 1, 'Mia does not play the guitar.'],
      ['is', 1, 1, 2, 1, 'The child who eats the pizza plays the guitar.'],
      ['not', 0, 1, 2, 1, 'Finn does not play the guitar.'],
      ['not', 0, 0, 1, 2, 'Mia does not eat the watermelon.'],
    ],
    ['Ravi,Ava,Tara|sport=soccer,tennis,skate;ride=bike,boat,tractor|201;012|3|323',
      ['not', 0, 1, 1, 1, 'Ava does not play tennis.'],
      ['not', 1, 2, 2, 1, 'The child who skates does not ride the boat.'],
      ['not', 2, 2, 1, 2, 'The child who rides the tractor does not skate.'],
      ['not', 0, 1, 2, 0, 'Ava does not ride the bike.'],
      ['is', 0, 2, 2, 2, 'Tara rides the tractor.'],
    ],
    ['Theo,Kim,Ravi|hobby=read,draw,puzzle;colour=blue,yellow,orange|021;201|3|323',
      ['is', 0, 2, 2, 1, 'Ravi likes yellow.'],
      ['not', 0, 1, 1, 1, 'Kim does not draw.'],
      ['not', 0, 1, 1, 0, 'Kim does not read.'],
      ['not', 2, 1, 1, 0, 'The child who likes yellow does not read.'],
      ['not', 0, 1, 2, 2, 'Kim does not like orange.'],
    ],
    ['Ada,Leo,Omar|pet=frog,turtle,mouse;sport=soccer,tennis,basketball|210;201|3|324',
      ['is', 0, 0, 1, 2, 'Ada has the mouse.'],
      ['not', 2, 0, 1, 2, 'The child who plays soccer does not have the mouse.'],
      ['not', 0, 2, 2, 2, 'Omar does not play basketball.'],
      ['not', 2, 0, 1, 0, 'The child who plays soccer does not have the frog.'],
      ['is', 0, 1, 1, 1, 'Leo has the turtle.'],
    ],
    ['Hugo,Kai,Nia|sport=soccer,tennis,swim;pet=dog,bird,frog|012;210|3|324',
      ['is', 1, 2, 2, 0, 'The child who swims has the dog.'],
      ['is', 0, 1, 2, 1, 'Kai has the bird.'],
      ['not', 0, 1, 1, 0, 'Kai does not play soccer.'],
      ['not', 0, 0, 2, 0, 'Hugo does not have the dog.'],
    ],
    ['Yuki,Amir,Ben|pet=cat,bird,mouse;ride=bus,boat,tractor|210;021|3|324',
      ['is', 0, 2, 1, 0, 'Ben has the cat.'],
      ['not', 0, 0, 1, 1, 'Yuki does not have the bird.'],
      ['is', 1, 0, 2, 1, 'The cat\'s owner rides the boat.'],
      ['not', 0, 1, 2, 0, 'Amir does not ride the bus.'],
    ],
    ['Ella,Sam,Ava|hobby=paint,draw,puzzle;colour=blue,green,purple|201;120|3|325',
      ['not', 0, 2, 1, 2, 'Ava does not do puzzles.'],
      ['not', 0, 1, 1, 2, 'Sam does not do puzzles.'],
      ['is', 2, 2, 1, 0, 'The child who likes purple paints.'],
      ['not', 0, 2, 1, 0, 'Ava does not paint.'],
      ['not', 0, 0, 2, 0, 'Ella does not like blue.'],
    ],
    ['Ivan,Kai,Hugo|sport=soccer,tennis,basketball;pet=cat,frog,mouse|120;012|3|325',
      ['not', 0, 0, 2, 2, 'Ivan does not have the mouse.'],
      ['not', 2, 2, 1, 2, 'The mouse\'s owner does not play basketball.'],
      ['not', 0, 1, 1, 0, 'Kai does not play soccer.'],
      ['not', 0, 0, 1, 2, 'Ivan does not play basketball.'],
      ['is', 1, 1, 2, 0, 'The child who plays tennis has the cat.'],
    ],
    ['Leo,Finn,Yuki|ride=bike,train,tractor;sport=tennis,basketball,skate|021;201|3|325',
      ['not', 0, 2, 2, 2, 'Yuki does not skate.'],
      ['not', 0, 2, 1, 0, 'Yuki does not ride the bike.'],
      ['is', 1, 2, 2, 0, 'The child who rides the tractor plays tennis.'],
      ['not', 0, 2, 1, 2, 'Yuki does not ride the tractor.'],
      ['not', 0, 0, 2, 0, 'Leo does not play tennis.'],
    ],
    ['Nia,Kai,Zara|colour=red,green,orange;music=drum,guitar,trumpet|120;120|3|325',
      ['not', 0, 0, 1, 2, 'Nia does not like orange.'],
      ['not', 2, 0, 1, 1, 'The child who plays the drum does not like green.'],
      ['not', 0, 0, 1, 0, 'Nia does not like red.'],
      ['not', 1, 0, 2, 2, 'The child who likes red does not play the trumpet.'],
      ['is', 0, 1, 2, 2, 'Kai plays the trumpet.'],
    ],
    ['Yuki,Sam,Eli|sport=basketball,swim,skate;colour=red,blue,orange|210;120|3|325',
      ['is', 0, 0, 2, 1, 'Yuki likes blue.'],
      ['not', 0, 1, 2, 0, 'Sam does not like red.'],
      ['not', 0, 0, 1, 1, 'Yuki does not swim.'],
      ['not', 2, 1, 1, 0, 'The child who likes blue does not play basketball.'],
      ['not', 2, 0, 1, 1, 'The child who likes red does not swim.'],
    ],
    ['Kim,Jun,Raj|ride=bike,bus,train;colour=red,yellow,orange|021;120|3|326',
      ['not', 0, 2, 2, 1, 'Raj does not like yellow.'],
      ['not', 0, 1, 1, 1, 'Jun does not ride the bus.'],
      ['not', 1, 1, 2, 2, 'The child who rides the bus does not like orange.'],
      ['not', 0, 0, 2, 2, 'Kim does not like orange.'],
      ['is', 0, 0, 1, 0, 'Kim rides the bike.'],
    ],
    ['Mia,Dev,Ana|sport=soccer,basketball,swim;colour=yellow,purple,orange|021;102|3|326',
      ['not', 2, 2, 1, 2, 'The child who likes orange does not swim.'],
      ['not', 0, 0, 2, 0, 'Mia does not like yellow.'],
      ['not', 1, 0, 2, 0, 'The child who plays soccer does not like yellow.'],
      ['not', 0, 2, 1, 0, 'Ana does not play soccer.'],
      ['is', 0, 2, 2, 2, 'Ana likes orange.'],
    ],
  ],
  D: [
    ['Ivan,Ana,Finn,Max|snack=apple,cheese,cupcake,pizza;house=1,2,3,4|1230;2301|4|432',
      ['is', 0, 3, 1, 0, 'Max eats the apple.'],
      ['nx', 0, 0, 1, 2, 'Ivan lives next door to the child who eats the cupcake.'],
      ['or', 1, 3, 0, 2, 3, 'The child who eats the pizza is Finn or Max.'],
      ['is', 0, 0, 2, 2, 'Ivan lives at number 3.'],
      ['is', 1, 0, 2, 1, 'The child who eats the apple lives at number 2.'],
    ],
    ['Owen,Ada,Yuki,Zoe|snack=cheese,cookie,pizza,watermelon;race=first,second,third,fourth|3201;2310|4|444',
      ['not', 0, 2, 2, 3, 'Yuki did not come fourth.'],
      ['not', 0, 0, 2, 3, 'Owen did not come fourth.'],
      ['is', 0, 1, 1, 2, 'Ada eats the pizza.'],
      ['not', 0, 0, 1, 1, 'Owen does not eat the cookie.'],
      ['nx', 0, 0, 1, 2, 'Owen and the child who eats the pizza finished one place apart.'],
      ['lt', 1, 1, 0, 2, 'The child who eats the cookie finished ahead of Yuki.'],
      ['gt', 1, 3, 1, 0, 'The child who eats the watermelon finished behind the child who eats the cheese.'],
    ],
    ['Ravi,Zoe,Nora,Ivan|ride=bike,bus,boat,tractor;race=first,second,third,fourth|2301;2130|4|444',
      ['is', 0, 1, 1, 3, 'Zoe rides the tractor.'],
      ['is', 0, 3, 2, 0, 'Ivan came first.'],
      ['lt', 0, 0, 1, 0, 'Ravi finished ahead of the child who rides the bike.'],
      ['gt', 0, 0, 1, 3, 'Ravi finished behind the child who rides the tractor.'],
      ['lt', 0, 3, 1, 2, 'Ivan finished ahead of the child who rides the boat.'],
    ],
    ['Sam,Ben,Zara,Jun|sport=soccer,tennis,basketball,swim;race=first,second,third,fourth|0312;0312|4|444',
      ['nx', 0, 2, 1, 0, 'Zara and the child who plays soccer finished one place apart.'],
      ['nx', 0, 2, 0, 3, 'Zara and Jun finished one place apart.'],
      ['is', 0, 2, 1, 1, 'Zara plays tennis.'],
      ['gt', 1, 2, 0, 0, 'The child who plays basketball finished behind Sam.'],
      ['is', 0, 0, 2, 0, 'Sam came first.'],
      ['is', 0, 1, 1, 3, 'Ben swims.'],
    ],
    ['Hugo,Luca,Nora,Zara|sport=soccer,tennis,basketball,swim;race=first,second,third,fourth|1230;0132|4|445',
      ['is', 0, 3, 2, 2, 'Zara came third.'],
      ['not', 0, 3, 1, 3, 'Zara does not swim.'],
      ['not', 0, 3, 1, 1, 'Zara does not play tennis.'],
      ['not', 0, 3, 1, 2, 'Zara does not play basketball.'],
      ['gt', 1, 3, 1, 0, 'The child who swims finished behind the child who plays soccer.'],
      ['or', 2, 0, 0, 0, 2, 'The child who came first is Hugo or Nora.'],
      ['nx', 0, 1, 1, 1, 'Luca and the child who plays tennis finished one place apart.'],
      ['gt', 0, 2, 0, 3, 'Nora finished behind Zara.'],
    ],
    ['Maya,Kai,Ana,Dev|pet=rabbit,bird,frog,mouse;race=first,second,third,fourth|0312;2013|4|447',
      ['gt', 0, 2, 1, 3, 'Ana finished behind the mouse\'s owner.'],
      ['or', 1, 0, 2, 0, 2, 'The rabbit\'s owner came first or third.'],
      ['is', 0, 3, 2, 3, 'Dev came fourth.'],
      ['or', 2, 1, 1, 1, 0, 'The child who came second has the bird or the rabbit.'],
      ['or', 1, 0, 0, 0, 3, 'The rabbit\'s owner is Maya or Dev.'],
    ],
    ['Tara,Ravi,Maya,Lena|ride=bus,train,boat,tractor;race=first,second,third,fourth|3102;3012|4|447',
      ['lt', 0, 1, 0, 2, 'Ravi finished ahead of Maya.'],
      ['not', 0, 3, 2, 0, 'Lena did not come first.'],
      ['is', 0, 0, 2, 3, 'Tara came fourth.'],
      ['is', 2, 0, 1, 1, 'The child who came first rides the train.'],
      ['gt', 1, 2, 1, 0, 'The child who rides the boat finished behind the child who rides the bus.'],
      ['or', 0, 3, 1, 1, 2, 'Lena rides the train or the boat.'],
    ],
    ['Dev,Sam,Ada,Jun|sport=soccer,tennis,basketball,skate;race=first,second,third,fourth|2031;3120|4|448',
      ['nx', 0, 0, 1, 3, 'Dev and the child who skates finished one place apart.'],
      ['is', 0, 3, 1, 1, 'Jun plays tennis.'],
      ['nx', 0, 2, 1, 2, 'Ada and the child who plays basketball finished one place apart.'],
      ['gt', 1, 2, 1, 0, 'The child who plays basketball finished behind the child who plays soccer.'],
      ['not', 1, 0, 2, 0, 'The child who plays soccer did not come first.'],
      ['is', 0, 0, 2, 3, 'Dev came fourth.'],
    ],
    ['Ivan,Kim,Theo,Amir|sport=soccer,tennis,basketball,swim;age=6,7,8,9|3012;0213|4|449',
      ['lt', 0, 2, 1, 0, 'Theo is younger than the child who plays soccer.'],
      ['or', 1, 3, 0, 0, 3, 'The child who swims is Ivan or Amir.'],
      ['or', 2, 3, 1, 2, 1, 'The 9-year-old plays basketball or tennis.'],
      ['lt', 0, 1, 1, 2, 'Kim is younger than the child who plays basketball.'],
      ['is', 0, 2, 2, 1, 'Theo is 7.'],
      ['not', 0, 0, 2, 3, 'Ivan is not 9.'],
    ],
    ['Mia,Theo,Finn,Kai|hobby=paint,read,draw,puzzle;age=6,7,8,9|0213;3120|4|449',
      ['is', 0, 1, 1, 2, 'Theo draws.'],
      ['or', 2, 3, 1, 0, 1, 'The 9-year-old paints or reads.'],
      ['lt', 1, 2, 1, 1, 'The child who draws is younger than the child who reads.'],
      ['or', 2, 1, 0, 1, 2, 'The 7-year-old is Theo or Finn.'],
      ['gt', 0, 0, 1, 1, 'Mia is older than the child who reads.'],
      ['not', 2, 1, 1, 1, 'The 7-year-old does not read.'],
      ['not', 0, 3, 2, 2, 'Kai is not 8.'],
    ],
    ['Eli,Dev,Omar,Nora|sport=soccer,tennis,basketball,skate;house=1,2,3,4|3021;1023|4|450',
      ['is', 0, 2, 1, 2, 'Omar plays basketball.'],
      ['nx', 0, 0, 0, 1, 'Eli lives next door to Dev.'],
      ['is', 1, 3, 2, 1, 'The child who skates lives at number 2.'],
      ['gt', 0, 2, 1, 0, 'Omar lives at a bigger number than the child who plays soccer.'],
      ['or', 0, 3, 2, 1, 3, 'Nora lives at number 2 or number 4.'],
      ['or', 0, 0, 2, 1, 2, 'Eli lives at number 2 or number 3.'],
    ],
    ['Kai,Tara,Ella,Finn|colour=blue,green,yellow,purple;house=1,2,3,4|2310;1320|4|451',
      ['gt', 0, 1, 1, 1, 'Tara lives at a bigger number than the child who likes green.'],
      ['or', 2, 3, 1, 3, 1, 'The child at number 4 likes purple or green.'],
      ['lt', 0, 3, 1, 2, 'Finn lives at a smaller number than the child who likes yellow.'],
      ['or', 1, 2, 2, 1, 3, 'The child who likes yellow lives at number 2 or number 4.'],
      ['is', 1, 0, 2, 0, 'The child who likes blue lives at number 1.'],
      ['not', 0, 0, 1, 1, 'Kai does not like green.'],
    ],
    ['Mia,Nia,Kim,Lena|colour=red,blue,yellow,orange;age=6,7,8,9|3201;3102|4|451',
      ['or', 0, 0, 2, 1, 3, 'Mia is 7 or 9.'],
      ['gt', 0, 3, 1, 2, 'Lena is older than the child who likes yellow.'],
      ['or', 2, 3, 1, 2, 3, 'The 9-year-old likes yellow or orange.'],
      ['not', 0, 0, 1, 2, 'Mia does not like yellow.'],
      ['or', 2, 2, 1, 3, 1, 'The 8-year-old likes orange or blue.'],
      ['gt', 1, 2, 0, 2, 'The child who likes yellow is older than Kim.'],
    ],
    ['Kim,Owen,Yuki,Tom|ride=bike,bus,train,tractor;house=1,2,3,4|0123;0132|4|453',
      ['or', 1, 2, 2, 1, 3, 'The child who rides the train lives at number 2 or number 4.'],
      ['or', 0, 1, 2, 0, 1, 'Owen lives at number 1 or number 2.'],
      ['or', 0, 0, 2, 0, 3, 'Kim lives at number 1 or number 4.'],
      ['or', 2, 1, 1, 3, 1, 'The child at number 2 rides the tractor or the bus.'],
      ['not', 0, 0, 2, 3, 'Kim does not live at number 4.'],
      ['is', 2, 2, 1, 3, 'The child at number 3 rides the tractor.'],
      ['gt', 0, 2, 0, 3, 'Yuki lives at a bigger number than Tom.'],
    ],
    ['Ava,Nora,Eli,Leo|pet=cat,fish,frog,mouse;age=6,7,8,9|3210;1032|4|454',
      ['lt', 1, 2, 1, 0, 'The frog\'s owner is younger than the cat\'s owner.'],
      ['is', 0, 0, 2, 1, 'Ava is 7.'],
      ['not', 0, 3, 1, 2, 'Leo does not have the frog.'],
      ['or', 0, 3, 2, 0, 2, 'Leo is 6 or 8.'],
      ['or', 2, 2, 1, 0, 2, 'The 8-year-old has the cat or the frog.'],
      ['lt', 0, 1, 1, 3, 'Nora is younger than the mouse\'s owner.'],
      ['or', 1, 3, 2, 0, 1, 'The mouse\'s owner is 6 or 7.'],
    ],
    ['Luca,Raj,Nia,Finn|pet=rabbit,bird,turtle,mouse;age=6,7,8,9|3102;2031|4|455',
      ['not', 0, 0, 1, 0, 'Luca does not have the rabbit.'],
      ['or', 0, 3, 2, 1, 3, 'Finn is 7 or 9.'],
      ['lt', 0, 3, 1, 3, 'Finn is younger than the mouse\'s owner.'],
      ['or', 2, 1, 1, 0, 2, 'The 7-year-old has the rabbit or the turtle.'],
      ['or', 2, 3, 1, 2, 0, 'The 9-year-old has the turtle or the rabbit.'],
      ['not', 2, 1, 1, 0, 'The 7-year-old does not have the rabbit.'],
      ['gt', 0, 0, 0, 1, 'Luca is older than Raj.'],
    ],
    ['Ana,Ben,Eli,Yuki|sport=soccer,basketball,swim,skate;house=1,2,3,4|3021;3210|4|456',
      ['or', 1, 2, 0, 2, 0, 'The child who swims is Eli or Ana.'],
      ['gt', 0, 1, 0, 2, 'Ben lives at a bigger number than Eli.'],
      ['is', 0, 2, 2, 1, 'Eli lives at number 2.'],
      ['nx', 1, 0, 1, 3, 'The child who plays soccer lives next door to the child who skates.'],
      ['nx', 0, 0, 1, 0, 'Ana lives next door to the child who plays soccer.'],
      ['lt', 0, 1, 1, 3, 'Ben lives at a smaller number than the child who skates.'],
    ],
    ['Ivan,Nia,Mia,Sam|ride=bike,bus,boat,tractor;race=first,second,third,fourth|0132;3021|4|456',
      ['gt', 1, 0, 1, 3, 'The child who rides the bike finished behind the child who rides the tractor.'],
      ['or', 1, 3, 2, 2, 3, 'The child who rides the tractor came third or fourth.'],
      ['gt', 0, 2, 1, 2, 'Mia finished behind the child who rides the boat.'],
      ['or', 2, 1, 1, 2, 3, 'The child who came second rides the boat or the tractor.'],
      ['not', 0, 1, 1, 2, 'Nia does not ride the boat.'],
      ['is', 0, 0, 1, 0, 'Ivan rides the bike.'],
    ],
    ['Kai,Eli,Ravi,Lena|hobby=paint,read,draw,puzzle;race=first,second,third,fourth|3120;1023|4|456',
      ['lt', 1, 2, 0, 3, 'The child who draws finished ahead of Lena.'],
      ['lt', 0, 0, 1, 0, 'Kai finished ahead of the child who paints.'],
      ['lt', 0, 0, 1, 2, 'Kai finished ahead of the child who draws.'],
      ['lt', 0, 1, 0, 2, 'Eli finished ahead of Ravi.'],
      ['not', 0, 1, 2, 1, 'Eli did not come second.'],
      ['is', 2, 1, 1, 3, 'The child who came second does puzzles.'],
    ],
    ['Ana,Dev,Raj,Lena|pet=fish,bird,frog,mouse;race=first,second,third,fourth|0312;3210|4|458',
      ['lt', 1, 1, 0, 1, 'The bird\'s owner finished ahead of Dev.'],
      ['lt', 0, 1, 0, 0, 'Dev finished ahead of Ana.'],
      ['gt', 1, 0, 1, 3, 'The fish\'s owner finished behind the mouse\'s owner.'],
      ['nx', 0, 1, 1, 1, 'Dev and the bird\'s owner finished one place apart.'],
      ['is', 0, 2, 2, 1, 'Raj came second.'],
      ['or', 1, 2, 2, 0, 1, 'The frog\'s owner came first or second.'],
    ],
    ['Kai,Raj,Owen,Lena|sport=soccer,basketball,swim,skate;age=6,7,8,9|2031;1230|4|460',
      ['gt', 1, 2, 0, 3, 'The child who swims is older than Lena.'],
      ['or', 0, 1, 1, 2, 0, 'Raj swims or plays soccer.'],
      ['gt', 0, 0, 0, 3, 'Kai is older than Lena.'],
      ['or', 2, 2, 0, 3, 1, 'The 8-year-old is Lena or Raj.'],
      ['nx', 1, 1, 1, 2, 'The child who plays basketball and the child who swims are one year apart.'],
      ['gt', 1, 0, 0, 0, 'The child who plays soccer is older than Kai.'],
      ['not', 0, 3, 1, 3, 'Lena does not skate.'],
    ],
    ['Zoe,Tara,Amir,Finn|ride=bike,bus,train,boat;age=6,7,8,9|2310;2013|4|461',
      ['lt', 1, 1, 0, 3, 'The child who rides the bus is younger than Finn.'],
      ['or', 0, 3, 1, 1, 0, 'Finn rides the bus or the bike.'],
      ['or', 2, 3, 1, 0, 1, 'The 9-year-old rides the bike or the bus.'],
      ['nx', 0, 2, 1, 3, 'Amir and the child who rides the boat are one year apart.'],
      ['gt', 0, 0, 1, 3, 'Zoe is older than the child who rides the boat.'],
      ['or', 1, 1, 2, 1, 3, 'The child who rides the bus is 7 or 9.'],
    ],
    ['Tara,Ada,Eli,Yuki|sport=tennis,basketball,swim,skate;age=6,7,8,9|1302;2013|4|463',
      ['is', 0, 1, 2, 0, 'Ada is 6.'],
      ['lt', 1, 3, 1, 0, 'The child who skates is younger than the child who plays tennis.'],
      ['or', 2, 2, 0, 0, 3, 'The 8-year-old is Tara or Yuki.'],
      ['gt', 1, 1, 1, 0, 'The child who plays basketball is older than the child who plays tennis.'],
      ['or', 0, 3, 2, 1, 3, 'Yuki is 7 or 9.'],
      ['gt', 0, 0, 0, 2, 'Tara is older than Eli.'],
      ['not', 0, 0, 1, 0, 'Tara does not play tennis.'],
      ['nx', 0, 0, 1, 2, 'Tara and the child who swims are one year apart.'],
    ],
    ['Ivan,Owen,Zoe,Tara|hobby=paint,read,draw,puzzle;age=6,7,8,9|0231;0123|4|464',
      ['gt', 1, 3, 0, 1, 'The child who does puzzles is older than Owen.'],
      ['not', 0, 2, 2, 1, 'Zoe is not 7.'],
      ['nx', 0, 1, 1, 3, 'Owen and the child who does puzzles are one year apart.'],
      ['or', 2, 1, 0, 2, 1, 'The 7-year-old is Zoe or Owen.'],
      ['gt', 1, 1, 1, 2, 'The child who reads is older than the child who draws.'],
      ['or', 0, 0, 2, 0, 1, 'Ivan is 6 or 7.'],
      ['lt', 0, 2, 0, 3, 'Zoe is younger than Tara.'],
      ['or', 0, 0, 1, 3, 0, 'Ivan does puzzles or paints.'],
    ],
    ['Owen,Jun,Sam,Tara|hobby=paint,read,draw,puzzle;house=1,2,3,4|1302;1230|5|559',
      ['or', 1, 3, 0, 1, 3, 'The child who does puzzles is Jun or Tara.'],
      ['lt', 1, 2, 0, 0, 'The child who draws lives at a smaller number than Owen.'],
      ['lt', 0, 3, 1, 0, 'Tara lives at a smaller number than the child who paints.'],
      ['not', 2, 3, 1, 3, 'The child at number 4 does not do puzzles.'],
      ['or', 0, 0, 1, 1, 2, 'Owen reads or draws.'],
      ['nx', 0, 1, 0, 2, 'Jun lives next door to Sam.'],
      ['not', 0, 0, 2, 3, 'Owen does not live at number 4.'],
    ],
    ['Yuki,Eli,Ben,Tom|pet=bird,frog,turtle,mouse;house=1,2,3,4|1023;1203|5|559',
      ['or', 0, 3, 2, 2, 3, 'Tom lives at number 3 or number 4.'],
      ['nx', 0, 3, 1, 0, 'Tom lives next door to the bird\'s owner.'],
      ['gt', 0, 0, 1, 2, 'Yuki lives at a bigger number than the turtle\'s owner.'],
      ['nx', 0, 0, 1, 0, 'Yuki lives next door to the bird\'s owner.'],
      ['not', 0, 2, 2, 2, 'Ben does not live at number 3.'],
      ['not', 1, 3, 2, 1, 'The mouse\'s owner does not live at number 2.'],
    ],
    ['Nia,Ella,Ravi,Kai|ride=bike,bus,boat,tractor;house=1,2,3,4|3201;2103|5|560',
      ['or', 0, 1, 1, 1, 2, 'Ella rides the bus or the boat.'],
      ['or', 0, 2, 2, 0, 3, 'Ravi lives at number 1 or number 4.'],
      ['lt', 0, 2, 0, 0, 'Ravi lives at a smaller number than Nia.'],
      ['gt', 0, 0, 1, 2, 'Nia lives at a bigger number than the child who rides the boat.'],
      ['nx', 0, 0, 0, 1, 'Nia lives next door to Ella.'],
      ['is', 1, 1, 2, 3, 'The child who rides the bus lives at number 4.'],
      ['not', 0, 0, 1, 0, 'Nia does not ride the bike.'],
      ['not', 0, 3, 2, 1, 'Kai does not live at number 2.'],
    ],
    ['Zara,Hugo,Jun,Lena|snack=apple,banana,cookie,pizza;age=6,7,8,9|0123;0312|5|564',
      ['lt', 1, 2, 0, 1, 'The child who eats the cookie is younger than Hugo.'],
      ['or', 1, 1, 2, 0, 3, 'The child who eats the banana is 6 or 9.'],
      ['nx', 0, 3, 1, 1, 'Lena and the child who eats the banana are one year apart.'],
      ['or', 1, 0, 2, 0, 3, 'The child who eats the apple is 6 or 9.'],
      ['or', 1, 0, 0, 3, 0, 'The child who eats the apple is Lena or Zara.'],
      ['nx', 0, 3, 1, 2, 'Lena and the child who eats the cookie are one year apart.'],
    ],
    ['Zoe,Lena,Ava,Dev|sport=soccer,basketball,swim,skate;race=first,second,third,fourth|0231;0312|5|566',
      ['nx', 1, 1, 1, 3, 'The child who plays basketball and the child who skates finished one place apart.'],
      ['or', 2, 2, 1, 1, 3, 'The child who came third plays basketball or skates.'],
      ['not', 0, 0, 2, 3, 'Zoe did not come fourth.'],
      ['or', 1, 2, 2, 2, 3, 'The child who swims came third or fourth.'],
      ['nx', 0, 2, 0, 3, 'Ava and Dev finished one place apart.'],
      ['nx', 0, 2, 1, 0, 'Ava and the child who plays soccer finished one place apart.'],
      ['gt', 0, 3, 1, 3, 'Dev finished behind the child who skates.'],
    ],
    ['Nia,Eli,Theo,Dev|colour=red,blue,green,yellow;race=first,second,third,fourth|3021;0213|5|567',
      ['gt', 0, 3, 1, 0, 'Dev finished behind the child who likes red.'],
      ['or', 2, 0, 0, 2, 0, 'The child who came first is Theo or Nia.'],
      ['nx', 0, 0, 0, 2, 'Nia and Theo finished one place apart.'],
      ['gt', 1, 0, 1, 2, 'The child who likes red finished behind the child who likes green.'],
      ['lt', 0, 0, 1, 1, 'Nia finished ahead of the child who likes blue.'],
      ['or', 2, 1, 1, 2, 1, 'The child who came second likes green or blue.'],
      ['or', 1, 2, 0, 2, 1, 'The child who likes green is Theo or Eli.'],
    ],
    ['Ivan,Noah,Theo,Kai|sport=soccer,tennis,basketball,swim;house=1,2,3,4|2031;0213|5|568',
      ['gt', 1, 3, 0, 0, 'The child who swims lives at a bigger number than Ivan.'],
      ['lt', 0, 0, 1, 1, 'Ivan lives at a smaller number than the child who plays tennis.'],
      ['is', 0, 2, 1, 3, 'Theo swims.'],
      ['nx', 0, 1, 0, 2, 'Noah lives next door to Theo.'],
      ['or', 1, 0, 0, 0, 1, 'The child who plays soccer is Ivan or Noah.'],
      ['lt', 0, 2, 1, 0, 'Theo lives at a smaller number than the child who plays soccer.'],
      ['nx', 0, 0, 0, 2, 'Ivan lives next door to Theo.'],
    ],
    ['Ben,Eli,Kai,Raj|ride=bike,bus,train,boat;race=first,second,third,fourth|3201;0231|5|569',
      ['or', 2, 1, 0, 1, 3, 'The child who came second is Eli or Raj.'],
      ['gt', 1, 2, 0, 0, 'The child who rides the train finished behind Ben.'],
      ['or', 0, 1, 2, 1, 2, 'Eli came second or third.'],
      ['not', 2, 2, 1, 0, 'The child who came third does not ride the bike.'],
      ['or', 1, 0, 0, 1, 2, 'The child who rides the bike is Eli or Kai.'],
      ['not', 2, 1, 1, 0, 'The child who came second does not ride the bike.'],
      ['or', 2, 2, 0, 0, 1, 'The child who came third is Ben or Eli.'],
      ['or', 1, 1, 0, 2, 3, 'The child who rides the bus is Kai or Raj.'],
    ],
    ['Tom,Zoe,Amir,Eli|hobby=paint,read,draw,puzzle;race=first,second,third,fourth|3012;0132|5|569',
      ['or', 0, 3, 2, 0, 2, 'Eli came first or third.'],
      ['or', 0, 0, 2, 0, 1, 'Tom came first or second.'],
      ['nx', 1, 1, 1, 2, 'The child who reads and the child who draws finished one place apart.'],
      ['nx', 1, 0, 1, 2, 'The child who paints and the child who draws finished one place apart.'],
      ['nx', 0, 0, 1, 0, 'Tom and the child who paints finished one place apart.'],
      ['or', 1, 1, 0, 0, 2, 'The child who reads is Tom or Amir.'],
      ['lt', 1, 3, 1, 1, 'The child who does puzzles finished ahead of the child who reads.'],
    ],
    ['Tom,Ella,Hugo,Ava|sport=soccer,tennis,basketball,swim;age=6,7,8,9|2013;0312|5|571',
      ['lt', 0, 2, 1, 3, 'Hugo is younger than the child who swims.'],
      ['lt', 0, 0, 0, 2, 'Tom is younger than Hugo.'],
      ['not', 0, 1, 1, 3, 'Ella does not swim.'],
      ['nx', 0, 3, 1, 1, 'Ava and the child who plays tennis are one year apart.'],
      ['gt', 1, 0, 1, 1, 'The child who plays soccer is older than the child who plays tennis.'],
    ],
    ['Jun,Noah,Omar,Tom|ride=bus,train,boat,tractor;race=first,second,third,fourth|0132;0213|5|573',
      ['or', 0, 1, 2, 1, 2, 'Noah came second or third.'],
      ['lt', 0, 0, 1, 1, 'Jun finished ahead of the child who rides the train.'],
      ['or', 0, 0, 1, 0, 1, 'Jun rides the bus or the train.'],
      ['or', 2, 2, 1, 1, 0, 'The child who came third rides the train or the bus.'],
      ['or', 1, 3, 0, 2, 0, 'The child who rides the tractor is Omar or Jun.'],
      ['or', 2, 1, 1, 1, 3, 'The child who came second rides the train or the tractor.'],
    ],
    ['Eli,Luca,Ravi,Kai|snack=apple,banana,grapes,cookie;age=6,7,8,9|2031;0321|5|575',
      ['lt', 0, 2, 0, 1, 'Ravi is younger than Luca.'],
      ['or', 0, 2, 1, 0, 3, 'Ravi eats the apple or the cookie.'],
      ['or', 1, 2, 0, 0, 1, 'The child who eats the grapes is Eli or Luca.'],
      ['nx', 0, 1, 1, 3, 'Luca and the child who eats the cookie are one year apart.'],
      ['or', 0, 3, 2, 1, 3, 'Kai is 7 or 9.'],
      ['lt', 0, 3, 1, 0, 'Kai is younger than the child who eats the apple.'],
    ],
  ],
};
/* MathDoku banks (P3-04, BRAIN_TEASERS 5.2). GENERATED by `node tools/puzzles/build-banks.js mathdoku` from seed 'star-school-mathdoku-1':
   do not edit by hand; change the generator (tools/puzzles/mathdoku.js) and rerun it. Same seed, same file, byte for byte.
   PUZ.mathdoku[band] = [36 puzzles]: band B 3x3 (+), C 4x4 (+ - *), D 5x5 then 6x6 (+ - * /), sorted by difficulty score
   (D: the 18 5x5 first), so level L (1-12) is entries 3(L-1) to 3L-1. Each puzzle is 'N|cages|solution|grade|score':
   cages comma-separated, each = its cells (one base-36 character per cell index, row * N + col, ascending; the first is
   the top-left cell, where the label goes) + operation (+ - * / or = for a single given cell) + target, e.g. '01+3';
   solution = N*N digits in reading order; grade = hardest technique of the cage-aware grader in tools/puzzles/mathdoku.js
   (1 last cell, 2 cage single, 3 hidden single, 4 cage in a line, 5 naked pair); score = solver nodes x 1000 + effort.
   Every puzzle has exactly one solution (tools/test.js proves it with its own counter). PUZ is shared by all puzzle banks. */
var PUZ = PUZ || {};
PUZ.mathdoku = {
  B: [
    '3|03+5,1=1,2=3,45+3,67+4,8=2|213321132|1|1006',
    '3|0=2,14+3,2=3,3=3,58+3,67+4|213321132|1|1006',
    '3|0=2,14+4,2=3,36+4,5=2,78+3|213132321|1|1006',
    '3|0=3,12+3,3=1,4=3,58+5,67+3|321132213|1|1006',
    '3|01+3,25+5,3=3,478+5,6=2|123312231|1|1007',
    '3|013+5,2=3,467+7,5=1,8=2|123231312|2|1007',
    '3|03+3,12+4,4=3,5=2,6=3,78+3|213132321|2|1007',
    '3|03+3,14+5,2=1,5=3,6=3,78+3|231123312|2|1007',
    '3|03+3,1=3,2=2,45+4,6=3,78+3|132213321|2|1007',
    '3|034+8,12+3,58+4,6=1,7=2|312231123|1|1007',
    '3|036+6,124+7,5=1,7=1,8=3|132321213|2|1007',
    '3|036+6,125+4,4=3,7=2,8=3|312231123|2|1007',
    '3|0=1,1=3,2=2,34+3,58+4,67+5|132213321|2|1007',
    '3|0=2,12+4,36+4,45+3,7=3,8=2|213321132|2|1007',
    '3|0=2,12+4,36+4,45+5,7=1,8=2|231123312|2|1007',
    '3|0=3,14+3,25+4,3=2,67+4,8=2|321213132|2|1007',
    '3|0=3,14+3,2=2,36+3,58+4,7=3|312123231|2|1007',
    '3|01+3,25+4,346+8,7=1,8=2|123231312|2|1008',
    '3|01+3,2=3,34+4,578+6,6=2|123312231|2|1008',
    '3|01+4,2=2,36+3,457+8,8=1|312123231|2|1008',
    '3|01+5,25+3,3=3,467+4,8=3|231312123|2|1008',
    '3|01+5,2=1,34+3,578+8,6=1|321213132|2|1008',
    '3|01+5,2=1,36+4,478+6,5=2|231312123|2|1008',
    '3|012+6,3=2,47+5,58+4,6=1|312231123|2|1008',
    '3|03+3,14+4,2=3,578+5,6=3|213132321|2|1008',
    '3|03+5,1=1,245+6,67+3,8=3|312231123|2|1008',
    '3|0=2,125+6,34+4,6=3,78+3|213132321|2|1008',
    '3|0=2,1=3,245+6,36+4,78+3|231123312|2|1008',
    '3|01+3,25+4,367+6,4=3,8=2|123231312|2|1009',
    '3|01+3,2=3,367+8,4=1,58+3|123312231|2|1009',
    '3|012+6,34+3,5=3,6=2,78+4|312123231|2|1009',
    '3|0=1,12+5,367+6,4=3,58+3|123231312|2|1009',
    '3|0=2,147+6,25+5,36+4,8=1|213132321|2|1009',
    '3|0=3,125+4,36+3,47+5,8=3|312231123|2|1009',
    '3|013+6,245+6,6=1,7=2,8=3|312231123|2|2008',
    '3|0=3,124+6,3=1,578+6,6=2|321132213|2|2008',
  ],
  C: [
    '4|01*4,237+8,48+3,5=4,6=2,9a+7,bef*4,cd+5|4132142323413214|2|1016',
    '4|01+4,26a+9,37+3,4=3,59*4,8=2,bef*12,cd-2|1342342121344213|2|1017',
    '4|04-2,12*4,37+4,56-1,8c*3,9d-1,a=1,b=2,ef-2|2143423134121324|2|1017',
    '4|0=1,15+6,237*6,489*24,6=3,abf+7,cde+8|1423423123143142|2|1017',
    '4|0=3,12-2,37-1,45*12,6a-1,8c-1,9=4,bf-1,de*3|3241431214232134|2|1017',
    '4|0=3,1=4,26*6,37*4,45-1,8c-3,9d*6,ab+4,ef+6|3421213442131342|2|1017',
    '4|01*12,2=1,37+3,48*4,59-1,6a+6,b=3,cd*2,ef+7|3412432112432134|2|1018',
    '4|01*4,23-1,458+6,6=2,7b-1,9=4,aef+6,cd+5|4132132424133241|2|1018',
    '4|01-2,23+4,4=1,569*36,7b+3,8cd*6,ae-2,f=4|4213143223413124|2|1018',
    '4|04*4,12*6,37b*6,5=3,6a+5,89-2,cde+6,f=4|4231134224133124|2|1018',
    '4|04+6,1=2,2=3,37b+8,56-3,8c-2,9d*12,aef+5|4231214313243412|2|1018',
    '4|045+5,126+11,3=1,7b*6,8c*12,9d-2,a=1,ef*8|2431124343123124|2|1018',
    '4|048*12,1=3,237+5,59*2,6=4,ab*12,cd+6,ef*3|4321314212342413|2|1018',
    '4|0=1,123+9,45*8,67b+6,8=3,9a+5,cd*2,ef-1|1324423134122143|2|1018',
    '4|01-3,267*4,3=3,489*18,5=4,ab-3,cd+3,ef+7|4123341223411234|2|1019',
    '4|014*36,236+7,5=1,7b-1,8c*2,9a+5,de+5,f=4|4321314224131234|2|1019',
    '4|015*18,236*8,48c*8,7=1,9=1,ade*48,bf*6|3214432121431432|2|1019',
    '4|04-1,12+4,3=2,59+7,6=2,7b-3,8cd*4,aef+8|4132342123141243|3|1019',
    '4|048+7,123*12,59d+9,6=3,7ab+5,c=3,ef-3|2143143243213214|2|1019',
    '4|048+7,1=4,23+5,56a+7,7=3,9cd+7,bef+7|1432421323413124|2|1019',
    '4|0=3,15-3,267+7,3=1,489+7,ab+7,cd-1,ef-3|3421413212432314|2|1019',
    '4|014*24,23*3,5=2,67b*8,89c+6,aef*24,d=3|2413324141321324|2|1020',
    '4|014+5,236*12,59-3,7=3,8cd*36,ae-2,bf-1|1234241331424321|2|1020',
    '4|01+5,23+5,48-3,567+6,9a+6,bf*12,c=3,de*2|2341413214233214|3|1021',
    '4|01+5,23-1,458+7,69a*8,7bf+7,cd-2,e=3|4123134232142431|3|1021',
    '4|014+8,237+5,56-1,8c-1,9a*2,b=4,de-3,f=3|4321143232142143|2|1021',
    '4|015+9,23*6,489+7,6a-3,7bf*12,c=1,de+5|4132241332411324|3|1021',
    '4|04+6,15-3,26a+8,3=3,7bf+7,89c*6,de-1|2413413232411324|3|1021',
    '4|04-1,15*6,23*4,6=3,7bf*24,89a+7,cde*12|2341123441233412|2|1021',
    '4|048+9,159+6,237+9,6=2,abf+6,cde+8|2341312442131432|3|1021',
    '4|014*4,26a+9,37b+7,59*6,8c-1,d=4,ef-2|4132132432412413|3|1022',
    '4|015+7,23+6,4=2,6a*2,7b+7,89+5,cd-2,ef+4|3142231414234231|2|2019',
    '4|0=2,15-1,23+5,489+9,67a+6,bf-1,c=3,de+5|2314423114233142|2|2019',
    '4|01*3,2=4,367+7,459*24,8cd+7,aef*18,b=1|1342321424314123|2|2020',
    '4|014+7,23*6,5=1,67a+8,8=3,9cd+9,bef*8|1432214332144321|3|2021',
    '4|045*6,1=1,237+9,6=4,8c-1,9de+7,abf*6|2134134234214213|4|4024',
  ],
  D: [
    '5|056+6,12+8,38-3,49e*20,7c/2,abf*60,di+4,gkl+7,h=1,jo-1,mn-1|1532432451432155413221543|3|1034',
    '5|016+9,23*6,4=4,5a-2,7bc+10,89+3,dejo+12,fkl*60,gh-1,imn*40|1532443512214355214334251|3|1036',
    '5|056b+8,123*60,489*20,7=1,afg*20,cdi*12,ejo*24,hmn*15,kl-1|2345132145512341452345312|2|1036',
    '5|015+11,2349+11,67c*8,8d*12,ab*15,ej-3,fg*2,hi*15,kl*12,m=1,no-3|2451351432352411235443125|3|1037',
    '5|0125*24,349*60,67-4,8=2,ab+8,cde*8,fk-3,gl*12,hmno*30,ij-3|1235441523354125324124135|3|1038',
    '5|015+7,2=5,3489*90,6b-1,7c/2,afk+9,di/2,ej-1,gl+5,hmno*48|4153224153352141342552341|3|1038',
    '5|0=4,12*10,38/3,49+7,5af*30,67c+10,bgkl+9,de*10,hijo+11,mn/2|4251325134314525432113245|3|1038',
    '5|01+9,2567*48,349*15,8bcd*20,af+5,ej*12,glm+12,hino+10,k=1|5423142315215433512413452|3|1039',
    '5|015+12,23-2,489d+11,67*4,afk*12,bg*12,chi+12,e=1,jo*15,lmn*8|2531451432435211425332145|3|1039',
    '5|0125*24,34*20,6bg+10,78*6,9ej+6,afk+9,cd*20,hi*10,lmno+10|2314545231314521452352314|3|1040',
    '5|015*12,234*30,67/2,8cd+11,9ej+6,ab+7,fg-3,him+8,kl-4,no/2|1423532451435122514351324|3|1040',
    '5|0=3,12/2,34*5,5a+3,67+7,89e+11,bc-4,di+5,fg-1,hm/2,jno+8,kl+8|3241514352215344512353241|3|2035',
    '5|01+3,2389+12,4=5,56ab+13,7chm+12,di-1,ej*2,fk+9,gl-1,no*15|2134535214145325342142153|3|2040',
    '5|01-2,27+8,38-3,49-3,5afk+13,6b+5,cdei+11,glm+8,h=4,jno*12|2431513542421533542151234|3|3039',
    '5|0126+12,3789*60,4=2,5a-1,bg/5,chlm+13,de-1,fk+3,ijno+16|5413232415453212154313254|4|4041',
    '5|016*12,27*15,34/2,5a+7,8di+10,9ej+8,bc-1,fg*20,hmn*4,kl-1,o=5|1354224351512344512332415|4|4045',
    '5|05+5,123+10,49e*10,6=4,78-2,ab*2,cd-1,fk-2,gh*10,ijno*48,lm-1|4352114352214353521452143|4|4053',
    '5|05a+9,16+8,23-3,4=2,7bcd+14,89/2,ejo*15,fghk+10,in-1,lm*2|3541213524542312134542153|4|6043',
    '6|06/2,1238+20,4a+5,5b+9,7d*5,9=4,ci*24,ef+5,gh/6,jk*15,lms+10,ntz+6,opu+10,qr-2,vw-3,xy*12|163524216435452316635142324651541263|3|1051',
    '6|067+7,1238+15,45-2,9a-4,bh+10,cdjp+14,ek/4,fg-2,io-4,lr+6,mns*24,qw+11,t=1,uv-3,xyz+7|142635513264421356654123236541365412|3|1052',
    '6|01+5,23+11,4a/5,5bhn+14,67cd*36,89/4,efgk*72,ij*30,lqrx+14,msyz+12,opu*16,t=6,vw-3|326514634152213645561423145236452361|3|1056',
    '6|0=5,127*60,349a*32,5bh+6,6cd*72,8e+8,fl/3,gmn*15,iou+7,jpv*6,kqw*24,rs+11,txyz+18|562143653421345612416235231564124356|3|1056',
    '6|017d*60,2348*36,5=2,6c+6,9f+7,abg*96,ejk+13,hn+8,iop*36,lm*8,qrs+12,tz*6,uv-2,wxy*15|453612132564516243361425624351245136|3|2052',
    '6|016+6,2=3,3789+18,45ab+15,ci-3,dej+12,fgm*6,hn+7,klq+14,opuv+17,rwx+4,sy*20,tz-2|413562152634245316536421624153361245|3|2054',
    '6|01+5,289+8,345b*60,6c*6,7d/2,agh+14,eflr+20,ijk*18,mn+6,opqu+16,sy-3,tz+4,vw*18,x=2|234165641352125436316524452613563241|3|2055',
    '6|06-3,1278+11,345b+18,9f+8,ag+4,ci/3,djk*48,e=4,hn+8,lm/5,opuv+17,qw/5,rstx*16,yz-2|153642412536624315246153365421531264|3|2057',
    '6|0123+12,45+9,67*5,89-1,ab+8,cd/2,ejkl*54,fgm+11,hn-3,io*20,pq/2,rsy+14,tz+4,u=6,vwx+11|361254154326243615536142412563625431|3|2058',
    '6|0128+11,34-2,59ab*90,67+10,ciou*24,dj/2,efg*30,hnt+9,kl/4,ms+7,pv*10,qrx*90,w=4,yz-5|513246642135435612261453156324324561|4|4063',
    '6|01-3,234*72,5b+4,6c-1,78+10,9agh+18,def+8,io*12,j=5,kqw*10,lmnt+14,puv+13,rx/6,syz+9|526341164523213456351264435612642135|4|5062',
    '6|017*32,23+8,45ab*36,6=1,89-1,cdek*24,flm+12,gh+11,iou+13,jp/2,nstz+12,qr/3,vwxy+13|425316146523314265532641263154651432|4|7074',
    '6|06c+10,12*12,34+5,5b*30,789f*90,ag+7,de*2,hn*4,ijkq+18,lm+7,ou-5,pvw+11,rxy*30,s=2,tz+5|326415251346512634463251645123134562|4|9058',
    '6|06-2,128*48,39*15,45-4,7d-2,ag-1,bh-2,cijk*75,eflm+15,nt+10,opqw+11,r=4,sxyz*40,uv-3|426315264531541623153264312456635142|4|11064',
    '6|017+10,23+11,45*2,6c-4,8de+8,9abf*72,glm*40,hn-1,iou+12,jp-5,kq*15,rxy+10,stz+9,vw-4|346512532461124356613245465123251634|4|12074',
    '6|0127*72,3459+17,6c+6,8e-1,afgm*48,bhnt+12,dij*45,klqr+12,ou*24,pvwx+9,s=6,yz-2|216354163542534621352416425163641235|4|17061',
    '6|067+12,12*20,39/6,45*3,8def*24,ab-2,ci-2,ghn+11,jklr+17,mstz+17,opuv+14,qw/5,xy*8|254613642135316254163542425361531426|5|18085',
    '6|0128+15,39fg*18,45ab*80,6c+7,7=6,dj-1,ekq+9,hmn+14,iou+11,lr*30,pv+7,st*12,wx-1,yz+3|356214261345524136412653143562635421|4|19069',
  ],
};
/* Robot Path worlds for bands C and D (P3-13, BRAIN_TEASERS 5.8). GENERATED by `node tools/puzzles/build-banks.js robot` from
   seed 'star-school-robot-1': do not edit by hand; change the generator (tools/puzzles/robot.js) and rerun it. Same seed, same file.
   PUZ.robot[band] = [36 worlds], 3 per level in level order (level L is entries 3(L-1) to 3L-1). Each world is
   'n|cells|start|facing|goal|par|kit|main|fn|template': cells n*n characters (. open, # wall) in reading order; facing
   0 up, 1 right, 2 down, 3 left; kit = blocks added to forward, turns and repeat (u repeat until wall, f the function);
   main and fn = the intended program, a shortest one (fw tl tr, r2..r9 repeat N, uw repeat until wall, en end of a loop,
   fn call the function); par = its blocks. tools/test.js proves par with its own search. */
var PUZ = PUZ || {};
PUZ.robot = {
  C: [
    '6|##################......############|18|1|23|2||r5 fw en||line',
    '6|####.#####.#####.#####.#####.#####.#|34|0|4|2||r5 fw en||line',
    '6|##.#####.#####.#####.#####.#####.###|2|1|32|3||tr r5 fw en||line',
    '6|############......##################|17|0|12|3||tl r5 fw en||line',
    '6|##############################......|30|0|35|3||tr r5 fw en||line',
    '6|########################......######|29|2|24|3||tr r5 fw en||line',
    '6|....#####.#####.#####.#####.#####.##|0|1|33|5||r3 fw en tr r5 fw en||turn',
    '6|######......#####.#####.#####.######|29|0|6|5||r3 fw en tl r5 fw en||turn',
    '6|.....#####.#####.#####.#############|22|0|0|5||r3 fw en tl r4 fw en||turn',
    '6|######.#####..#####..#####..#####..#|6|2|34|5||r4 fw tl fw tr en||stairs',
    '6|#######..#####..#####..#####..#####.|7|1|35|5||r4 fw tr fw tl en||stairs',
    '6|######..#####..#####..#####..#####.#|34|0|6|5||r4 fw tl fw tr en||stairs',
    '6|#########..###..###..###..####.#####|30|3|10|6||tr r4 fw tr fw tl en||stairs',
    '6|.#####..#####..#####..#####..#####..|0|2|35|5||r5 fw tl fw tr en||stairs',
    '6|..#####..#####..#####..#####..#####.|0|0|35|6||tr r5 fw tr fw tl en||stairs',
    '6|#.....#####.#####.#####.#####.######|1|1|29|4||r2 r4 fw en tr en||turn',
    '6|#################.#####.#####.#.....|31|1|17|4||r2 r4 fw en tl en||turn',
    '6|.#####.#####.#####.#####......######|29|3|0|4||r2 r5 fw en tr en||turn',
    '6|#.....#.#####.###.#.###.#.....######|5|3|17|4||r4 r4 fw en tl en||ring',
    '6|....#..####..####..####..####.......|5|2|3|4||r4 r5 fw en tr en||ring',
    '6|##....##.#####.##.##....############|5|3|17|4||r4 r3 fw en tl en||ring',
    '6|####..####.####..####.#####.########|5|3|27|6||r2 fw tl fw fw tr en||stairs',
    '6|#############...#####...#####.######|29|0|13|6||r2 fw tl fw fw tr en||stairs',
    '6|###.#####.#####..#####.#####..######|29|3|3|6||r2 fw tr fw fw tl en||stairs',
    '6|######...#####...#####.#############|6|1|22|6||r2 fw fw tr fw tl en||stairs',
    '6|###...#...###.######################|13|0|5|6||r2 fw tr fw fw tl en||stairs',
    '6|##########.#####.####..####.####..##|32|1|10|6||r2 fw tl fw fw tr en||stairs',
    '6|###.#####.#####.#####..#####..#####.|35|0|3|7||r2 fw tl fw tr en r3 fw en||stairsRun',
    '6|###########.####..###..####.#####.##|11|2|33|7||r2 fw tr fw tl en r2 fw en||stairsRun',
    '6|############...#####..#####..#######|28|3|12|7||r2 fw tr fw tl en r2 fw en||stairsRun',
    '6|#.##.##.##.##.##.##.##.##.##.##....#|1|2|4|7||r2 r5 fw en tl r3 fw en tl en||rect',
    '6|######.......#####.#####.#####......|35|3|11|7||r2 r5 fw en tr r4 fw en tr en||rect',
    '6|######......#####.......############|6|1|18|7||r2 r5 fw en tr r2 fw en tr en||rect',
    '6|############......#####.......######|12|1|24|7||r2 r5 fw en tr r2 fw en tr en||rect',
    '6|##################......#####.......|30|1|18|7||r2 r5 fw en tl r2 fw en tl en||rect',
    '6|######.......#####.#####.#####......|11|3|35|7||r2 r5 fw en tl r4 fw en tl en||rect',
  ],
  D: [
    '8|########.........#######.#######.#######.#######.#######........|63|3|15|4|u|r3 uw fw en tr en||ringU',
    '8|#.......#.#######.#######.#######.......########################|7|3|39|4|u|r3 uw fw en tl en||ringU',
    '8|#.###.###.###.###.###.###.###.###.###.###.###.###.###.###.....##|1|2|5|4|u|r3 uw fw en tl en||ringU',
    '8|.##.####.##.####.##.####.##.####.##.####.##.####.##.####....####|0|2|3|4|u|r3 uw fw en tl en||ringU',
    '8|########......##.#######.#######.#######.#######.#######......##|61|3|13|4|u|r3 uw fw en tr en||ringU',
    '8|.....#######.###.###.###.....###################################|0|1|16|4|u|r4 uw fw en tr en||ringU',
    '8|.........######..#....#..####.#..####.#..####.#..####.#.......#.|63|0|18|4|u|r6 uw fw en tl en||spiral',
    '8|#.......#.#####.#.#...#.#.###.#.#.###.#.#.###.#.#.....#.########|55|0|19|4|u|r6 uw fw en tl en||spiral',
    '8|.........######..######..######..######..######.#######.........|56|1|40|4|u|r4 uw fw en tl en||spiral',
    '8|.#.......#.####..#.####..#.####..#.####..#.####..######.........|0|2|42|4|u|r5 uw fw en tl en||spiral',
    '8|.#.....#.#.###.#.#.###.#.#.###.#.#.###.#.#####.#.......#########|0|2|34|4|u|r5 uw fw en tl en||spiral',
    '8|#########......##.####.##.####.##....#.#######.##......#########|49|1|36|4|u|r5 uw fw en tl en||spiral',
    '8|####.#######.#######..#######..#######.#######.#######..#######.|4|2|63|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|#########..#######...#######..#######..#######..################|9|1|47|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|################...#######...#######..#######..#######..########|55|3|16|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|###############.######..#####..#####..#####..######.#######.####|59|0|15|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|########################...#######..#######..#######....########|24|1|55|6|u|r4 uw fw en tr fw tl en||stairsU',
    '8|################..#######..#######..#######...#######...########|16|1|55|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|####....###..#####..#####..#####..##############################|32|1|7|6|u|r5 uw fw en tl fw tr en||stairsU',
    '8|#####################################...####..####...###...#####|39|3|56|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|##.#######..#######..#######.#######..#######.#######.#######.##|61|0|2|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|#.#######..#######.#######..#######.#######..#######.#######.###|1|2|60|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|###.#######.#######..#######..#######..#######..#######.#######.|63|0|3|6|u|r5 uw fw en tl fw tr en||stairsU',
    '8|######..#####..####...####..####...#############################|7|3|32|6|u|r5 uw fw en tl fw tr en||stairsU',
    '8|################################..#######..#######...#######....|63|2|32|7|u|tr r4 uw fw en tr fw tl en||stairsU',
    '8|##############################..#####..###....##...#############|31|0|48|7|u|tl r4 uw fw en tl fw tr en||stairsU',
    '8|################..#######...#######...#######...################|16|0|47|7|u|tr r4 uw fw en tr fw tl en||stairsU',
    '8|#########..#######..#######..#######..#######.#######..#######.#|62|0|9|8|f|fn fw r4 fn en|fw tl fw tr|hills',
    '8|#####.######..######.######..#####..#####..#####################|5|2|41|8|f|fn fw r3 fn en|fw tr fw tl|hills',
    '8|#######.######..#####..####...####..############################|34|1|7|8|f|fn fw r3 fn en|fw tl fw tr|hills',
    '8|######..#####..#####..######.#######.######..#####..######.#####|58|0|7|10|f|r2 fn en r2 fw en r3 fn en|fw tr fw tl|hills',
    '8|###############.######..#####..###....###..#####..##############|48|1|15|10|f|r2 fn en r2 fw en r3 fn en|fw tl fw tr|hills',
    '8|###############.######..#####..#####..#####..####...####..######|56|1|15|8|f|fn fw r5 fn en|fw tl fw tr|hills',
    '8|#.#######..#######..#######.#######..#######..#######..#######..|1|3|63|10|f|tl r2 fn en fw r4 fn en|fw tl fw tr|hills',
    '8|..#######..#######..#######..#######.#######..#######..#######.#|62|3|0|10|f|tr r2 fn en fw r4 fn en|fw tl fw tr|hills',
    '8|########.#######..#######..#######..#######....#######..########|55|2|8|10|f|tr fn r2 fw en r4 fn en|fw tr fw tl|hills',
  ],
};
/* Sudoku banks (P3-02, BRAIN_TEASERS 5.1). GENERATED by `node tools/puzzles/build-banks.js sudoku` from seed 'star-school-sudoku-1':
   do not edit by hand; change the generator (tools/puzzles/sudoku.js) and rerun it. Same seed, same file, byte for byte.
   PUZ.sudoku[band] = {n, bw, bh, easy: [...], medium: [...], hard: [...]}: band A 4x4 (pictures), B 4x4, C 6x6, D 9x9;
   boxes are bw columns x bh rows. Each puzzle is 'givens|solution|grade': n*n cells in reading order, '.' = empty,
   symbols 1..n; grade = hardest technique the human-style grader (tools/puzzles/human.js) needs: 1 last empty cell,
   2 naked single, 3 hidden single, 4 locked candidates, 5 naked pair. Every puzzle has exactly one solution, and
   tools/test.js proves it with its own counter. PUZ is shared by all puzzle banks: never declare it with const or let. */
var PUZ = PUZ || {};
PUZ.sudoku = {
  A: {n: 4, bw: 2, bh: 2,
    easy: [
      '321....34.322.41|3214142341322341|1',
      '32.4.4.241.3.3.1|3214143241232341|1',
      '.132..14.4211..3|4132231434211243|1',
      '.43.231.4..3.241|1432231441233241|1',
      '234...3.3..44213|2341143231244213|1',
      '1...23413.2.4.13|1432234131244213|1',
      '..244.1.314.243.|1324421331422431|1',
      '..43432134...13.|1243432134122134|1',
      '43211..3.134...2|4321124321343412|1',
      '321...322..11.23|3214413223411423|1',
      '..4.42313.24.41.|1342423131242413|1',
      '24...3.23.1.4123|2431134232144123|1',
      '3.41142....223.4|3241142341322314|1',
      '321441..1..2..41|3214412314322341|1',
      '.3121.3.21.3..21|4312123421433421|1',
      '1..2243.3.14.12.|1342243132144123|1',
      '..434312.2.43.2.|2143431212343421|1',
      '..1313.231244...|2413134231244231|1',
      '4..32314.2.1..32|4123231432411432|1',
      '1.3.3.1223...123|1234341223414123|1',
    ],
    medium: [
      '32..1.23...223.1|3214142341322341|1',
      '24.3.3.43...413.|2413132432414132|1',
      '4..1312.1.4...13|4231312413422413|1',
      '3142..1.1.2..4.1|3142421313242431|1',
      '2..414233..1.1..|2314142332414132|1',
      '4132.31.....1.23|4132231432411423|1',
      '.32.423....224.3|1324423131422413|1',
      '24..13.2.12...31|2413134231244231|1',
      '...4.41.4.21.243|2134341243211243|1',
      '312..4.3.3...231|3124241313424231|1',
      '2143.32.143.....|2143432114323214|1',
      '2.41...2.12442..|2341143231244213|1',
      '13..243....242.3|1324243131424213|1',
      '3..141...3.4143.|3241412323141432|1',
      '42.31..2..2424..|4213134231242431|1',
      '14323..1....23.4|1432324141232314|1',
      '.1.42...1.43431.|3124243112434312|1',
      '.1.4243...424..3|3124243113424213|1',
      '4..313.23..42.3.|4213134231242431|1',
      '24.1.....213132.|2431314242131324|1',
    ],
    hard: [
      '214.3..1.2..4..2|2143342112344312|1',
      '431..14..2..3.2.|4312214312343421|1',
      '4.2.2..13.14..3.|4123234132141432|1',
      '4.1.214..4..1..4|4312214334211234|1',
      '31...21.23.1..3.|3124421323411432|1',
      '4..332...342..3.|4123321413422431|1',
      '.3422..3..3.3..4|1342241342313124|1',
      '3....231..2.231.|3142423114232314|1',
      '....3.12.34.412.|1234341223414123|1',
      '324....31....314|3241412314322314|1',
      '4.32...4.423.3..|4132321414232341|1',
      '4.3.32..2..1.42.|4132321423411423|1',
      '..4..3122....421|1243431221343421|1',
      '.243..1..1.443..|1243341221344321|1',
      '1..2..3.3.2.241.|1342423131242413|1',
      '4..1.1.22...1.24|4231314224131324|1',
      '.24.1..343.2..3.|3241142343122134|1',
      '32.14....4.31..4|3241413224131324|1',
      '1.2.2..44..2.2.1|1423231441323241|1',
      '4.2.321....2.34.|4123321414322341|1',
    ],
  },
  B: {n: 4, bw: 2, bh: 2,
    easy: [
      '.42.2...41.2.24.|1423231441323241|1',
      '.42..241....4.32|1423324123144132|1',
      '1...2.4...32321.|1423234141323214|2',
      '14..32.1...2.31.|1423324141322314|2',
      '42.1...41..22..3|4231312413422413|2',
      '21.3.42..3.2...4|2143342143121234|2',
      '..31..2.2.1..142|4231132424133142|2',
      '14....1.2...4123|1432321423414123|2',
      '.4.1312.42.3....|2431312442131342|1',
      '2...314.423...2.|2413314242311324|1',
      '...24213.1..24..|1342421331242431|2',
      '.4..1..4..4.4231|2413132431424231|2',
      '2.14..3..24.1..3|2314413232411423|1',
      '.1.33.14..4.1..2|4123321423411432|1',
      '3.2.42.1...31.4.|3124423124131342|1',
      '.4.3...44.311.4.|2413312442311342|2',
      '1.3.23....1441..|1432234132144123|2',
      '4..2324...23.3..|4132324114232314|1',
      '24.1..24..1.31..|2431132442133142|2',
      '..313...4312..4.|2431312443121243|2',
    ],
    medium: [
      '43..12........13|4321123431422413|2',
      '..41....3..44..2|2341142332144132|2',
      '4.23......3..2.4|4123234114323214|2',
      '..3113....4.2...|4231132431422413|2',
      '.....1.2.32.2..1|4213314213242431|2',
      '.2.1.1.....223..|3241412314322314|2',
      '4..32.....32...1|4123231414323241|2',
      '2..4..3..4.33...|2314413214233241|2',
      '4..1..4.3.....13|4231134231242413|2',
      '.4.2...3..2.12..|3412214343211234|2',
      '4..2.3.....3.21.|4132234114233214|2',
      '..3..21.1...2..1|4132321414232341|2',
      '....134.3....4.3|4231134231242413|2',
      '.31.12.....13...|4312124324313124|2',
      '.4.22......11..3|3412213443211243|2',
      '.2...31....43.2.|1243431221343421|2',
      '.1.....2..343..1|2143431212343421|2',
      '2....4.....34.12|2134342112434312|2',
      '314..43.4.......|3142243142131324|2',
      '.2.14....41.1...|3241413224131324|2',
    ],
    hard: [
      '..3.3..4.41.....|4231312424131342|2',
      '.34...1.3....2..|1342241331244231|2',
      '.2414......2....|3241412314322314|2',
      '.321.....2..1...|4321214332141432|2',
      '4..1....3...1..4|4321214334121234|2',
      '.3...2.1..4....3|1324423131422413|2',
      '3.....31...24...|3124243113424213|2',
      '.......32..41.3.|3241412323141432|2',
      '...2.4......41.3|1342243132144123|2',
      '.42.2.....41....|1423231432414132|2',
      '4.......3..2.1.4|4321124334122134|2',
      '4..1...4.3....1.|4231312413422413|2',
      '3....2.4..12....|3421123443122143|2',
      '.....2...4.2..14|4123324114322314|2',
      '...31.4.....21..|4213134234212134|2',
      '14...2.....2.1..|1423324143122134|2',
      '...43......1.24.|2134341243211243|2',
      '.421.........14.|3421123443122143|2',
      '.....4.1.2..3.2.|1342243142133124|2',
      '.....3.4.2...43.|4123231432411432|2',
    ],
  },
  C: {n: 6, bw: 3, bh: 2,
    easy: [
      '.1634.453.1234.2..1...53..4.36.3152.|216345453612345261162453524136631524|2',
      '61.54.5.2..125...6.3...4.65123321.65|613542542631254316136254465123321465|2',
      '165.433..5.6..34...42631.513.44.6.5.|165243324516613425542631251364436152|2',
      '.5.21..235464..635..5124.4.3622....1|654213123546412635365124541362236451|2',
      '2.563.643.5.46..155314.6156.4.....6.|215634643152462315531426156243324561|2',
      '.2.4656..12346.53....6.1.34.1621.3.4|123465645123461532352641534216216354|2',
      '.6.3.44312566.45.32..46.3.6..51..63.|562314431256614523253461326145145632|2',
      '..652.12..6...3.426.231536125425....|436521125463513642642315361254254136|2',
      '624513..1.4.4...2121.65...216.1.6.32|624513531246465321213654342165156432|2',
      '3..56.6.4..2.362..215.4.54.6131..425|321564654132436251215346542613163425|2',
      '6.134.2346.5.63.214.2.....5.6.32615.|651342234615563421412536145263326154|2',
      '.43.6.1..2345.23...34521.2...33614.2|243165156234512346634521425613361452|2',
      '2...4.54.6.2135.6462..3.412..635.4.1|261543543612135264624135412356356421|2',
      '.6132.2.4.6..251..1462.5453.12.12...|561324234561325146146235453612612453|2',
      '..356.5614.36.43...356.2...2.44521.6|243561561423624315135642316254452136|2',
      '..4.5635612.123.65..52.1.4.6.36...42|214356356124123465465231542613631542|2',
      '.1452.3.2.61.63.....1..64.621.125634|614523352461563142241356436215125634|2',
      '5.4.6161.5..43..15..1.363.514..4265.|524361613524436215251436365142142653|2',
      '23416.1..4323.65.45.1.264...5...32.1|234165165432326514541326412653653241|2',
      '.3.14.54162...53.26.345.3542...6.53.|236145541623415362623451354216162534|2',
    ],
    medium: [
      '61.53..3.2...2....3561.2..34.1..136.|612534435216124653356142563421241365|2',
      '.1.46.65...31..65..65......34.34.512|213465654123132654465231521346346512|2',
      '....4554...3.1.3644365...6.2511.....|623145541623215364436512364251152436|2',
      '...2.332..6.6524..41.5..5.6..223..5.|165243324165652431413526546312231654|2',
      '.6..51..5.63.4.5.22.16..53.1.612....|362451415263643512251634534126126345|2',
      '.3..12...4.5.5....162.433.52..6.135.|534612216435453126162543345261621354|2',
      '.51..42...3.64.1...1.642.2..15.3.4.6|351264264531642153513642426315135426|2',
      '.2.436.3.2.5.6.15..5...4..6342....61|125436634215462153351624516342243561|2',
      '4.16..326..1643.1521..6...2.5.....3.|451623326541643215215364132456564132|2',
      '1.3...625.1.3.21.646.2.321.63.......|143562625314352146461253214635536421|2',
      '...3..63..243.41...2564....4.5.4623.|452316631524364152125643213465546231|2',
      '.6...5.256.41......46...514.26.32.41|461235325614153462246153514326632541|2',
      '...6.2....1.1..43.5.4.6.3.5146.415.3|413652256314162435534261325146641523|2',
      '...21.241..3....3212.465..6...312..6|635214241653564132123465456321312546|2',
      '265.1...3.5664.....5.1.4.3.5.2..4.31|265413413256641325352164136542524631|2',
      '2.6...154..6.4..1.51.2...216..465.3.|236451154326642513513264321645465132|2',
      '3..2..6425131..63..63..2........5326|351264642513124635563142236451415326|2',
      '4.1.3236.41.62.34.1.4........3.1.5.4|451632362415625341134256546123213564|2',
      '46.31..35..25...366.31..3..6..2.65..|462315135462541236623154354621216543|2',
      '2.65....463.5.321..213..31.45......3|236541154632563214421365312456645123|2',
    ],
    hard: [
      '1....565.23......2...36...3.5.46.1..|132645654231346512521364213456465123|2',
      '.....66.4.214.51....65.....61.1..2..|321456654321435162216534542613163245|2',
      '4.26533......4...16...2.534.......3.|412653365142243561651324534216126435|2',
      '31...2..4...1.5...64.5.....2344...1.|316452254163125346643521561234432615|2',
      '5.43..3.214.2........6...21.6...32..|514326362145236451145632421563653214|2',
      '.....6..5....42.611..42..631....1..2|324516615243542361136425263154451632|2',
      '.....624..13....54.1....4.23.1.6..2.|135246246513623154514632452361361425|2',
      '.6...14....55.......26....1..435412.|265341413265536412142653621534354126|2',
      '.......3.2.42......5..62..35.65.2.43|124635635214246351351462413526562143|3',
      '13.65..6..43.......1.4...263......26|134652265143453261612435526314341526|2',
      '6...3.42.6...5.3.2...5.6...4233.....|615234423651156342234516561423342165|2',
      '15.....4...64...52.256416...3.......|156423243516461352325641614235532164|2',
      '.4...31..6.5...12.6.....351...2..5.1|546213123645435126612354351462264531|2',
      '.64..3..3..5..6...352.6.....24.2.1..|564213213645146352352461631524425136|2',
      '.4..2..614..1.4.63.3..........3.5.41|543126261435154263632514416352325641|2',
      '163.5..4...1.3...2426.3...4..3......|163254245361531642426135614523352416|2',
      '.4..25.6534...15..3.6..461..........|143625265341421536356214612453534162|2',
      '.3.26.....4....31..6.4.565....321...|435261216543542316163425654132321654|2',
      '..3...4.61.....3211...6.3.4..2..1.5.|513246426135645321132564354612261453|2',
      '..16..4...51....2......416...5.4316.|251643436251314526625314162435543162|2',
    ],
  },
  D: {n: 9, bw: 3, bh: 3,
    easy: [
      '1835..6.2746..2.9..92...8......459.8.578.326.4.872......5...42..7.2..3592.9..4786|183597642746182593592436817321645978957813264468729135635978421874261359219354786|2',
      '..148...38.4....6.9671...423257...1971.....8448...125754...7936.9....1.81...634..|251486793834279561967135842325748619719652384486391257542817936693524178178963425|2',
      '2.3.157....6439.1.51.8..463...5628....2...1....8193...637..1.42.2.3569....527.3.6|243615798786439215519827463971562834362748159458193627637981542824356971195274386|2',
      '...3.5..145.217.8.61....53.2.5.3..1.9718.6325.3..5.6.9.98....62.4.621.931..9.3...|789365241453217986612498537265739418971846325834152679398574162547621893126983754|2',
      '5....2916.1....7..27614...36.138742..8.....7..392148.53...61258..7....3.1254....7|543872916918653742276149583651387429482596371739214865394761258867925134125438697|2',
      '7...4.25.85279..611.9..57.8...2....6216...5439....6...6.85..3.242..67985.37.8...4|763148259852793461149625738374251896216879543985436127698514372421367985537982614|2',
      '859137..27....28.1.6.45.9..5.6.24.....79.15.....57.3.4..1.65.4.6.47....59..243618|859137462743692851162458973596324187437981526218576394321865749684719235975243618|2',
      '524963..11.97....63..2....9..35.9.6..623.851..4.1.69..6....7..24....26.52..695147|524963781189754326376281459713549268962378514845126973651437892497812635238695147|2',
      '.7.14.6..12..9.48..592....35..7..32626.5.3.49931..6..87....126..12.5..37..8.72.5.|873145692126397485459268713584719326267583149931426578795831264612954837348672951|2',
      '243.1...85..427..1.7.38.2..435.9.1..8.7...4.3..6.3.759..2.59.6.3..678..26...4.817|243915678568427931971386245435792186897561423126834759782159364314678592659243817|2',
      '..97...5.384.5...75.13.948.9265....88.3...9.44....2563.481.62.56...7.149.9...38..|269748351384251697571369482926534718853617924417982563748196235632875149195423876|2',
      '6.573..14.7...83653..6.5..91425..67...........67..19234..8.7..27389...4.25..148.7|685739214974128365321645789142593678893276451567481923419867532738952146256314897|2',
      '.5.....3629..3.5...63275894..7..3.81..67.14..81.4..9..64915732...1.4..6557.....4.|754819236298634517163275894427593681936781452815426973649157328381942765572368149|2',
      '57.83.2...16....4.982514.3.1..38...4..71.93..4...72..9.4.763918.9....57...8.51.62|574836291316297845982514637169385724827149356453672189245763918691428573738951462|2',
      '36..25.17..941..3.4..386...67..598....31.45....473..61...693..4.4..713..73.84..96|368925417259417638417386925671259843823164579594738261182693754946571382735842196|3',
      '.......1.6.52.83.4.48951...164.879.25..4.2..62.316.485...81576.8.67.32.1.9.......|927346518615278394348951627164587932589432176273169485432815769856793241791624853|2',
      '.1...542.89..4..63.276..5.8..198..7.98.2.7.41.4..368..3.9..178.17..6..32.583...1.|613895427895742163427613598531984276986257341742136859369421785174568932258379614|2',
      '3651.4..7.......548.9.7632..8.9..24693.....15214..5.3..2179.5.369.......7..6.1492|365124987172389654849576321587913246936247815214865739421798563693452178758631492|2',
      '...371...9.1..83.682.6.4..1..2.869.434.1.9.575.643.1..6..7.5.292.79..4.5...842...|465371298971258346823694571712586934348129657596437182634715829287963415159842763|2',
      '..98...75584..2.9.1.356.8.264.35.....3.1.6.5.....27.364.6.735.1.2.4..76971...53..|269834175584712693173569842642358917937146258851927436496273581325481769718695324|2',
    ],
    medium: [
      '..3.4..69.4..67..262.1...7...6..842..8.6.3.5..374..6...9...5.467..23..8.45..9.2..|173542869849367512625189374516978423984623157237451698392815746761234985458796231|2',
      '.9......7..82.693...18954...376.2.4....5.9....6.7.132...43582...859.47..9......5.|296413587458276931371895462537682149142539678869741325714358296685924713923167854|2',
      '..9..5.675.76.2.81.1...732.38....5.....2.4.....2....79.784...5.95.7.82.446.5..7..|829135467537642981614897325386971542795284136142356879278419653953768214461523798|3',
      '..8..26.1..367..5.....158...3.2..964.82...13.749..3.2...593.....6..512..8.47..3..|458392671913678452276415893531287964682549137749163528125934786367851249894726315|2',
      '32...67...67234.5.5..7.86..21.5......4.....7......9.42..64.5..8.7.68341...81...67|321956784867234951594718623219547836643821579785369142136475298972683415458192367|2',
      '.9.13.6.....9.2.131.4..8.......437.6.678.534.3.861.......7..5.987.3.9.....9.26.3.|792134658685972413134568972951243786267895341348617295423781569876359124519426837|2',
      '23..4.7.8..12....945....1...6.4.58..34.7.8.91..79.6.5...6....178....74..7.4.5..86|239541768671283549458679132962415873345728691187936254526894317893167425714352986|2',
      '93.157...17..9.35...6.4.91...268.....9.....4.....291...83.1.4...69.7..31...963.78|934157826178296354526348917342681795891735642657429183783512469269874531415963278|3',
      '.6..9......8.741.9.798.1..4..69.8.1.93.....52.8.4.27..5..2.967.8.754.3......8..4.|461395287258674139379821564726958413934167852185432796543219678897546321612783945|2',
      '5.7..69...43.29.....6.....8.592.847...13.46...385.729.1.....7.....67.82...24..1.9|517836942843129567926745318659218473271394685438567291184952736395671824762483159|2',
      '..9.2...6...6..4.8.684.5..2.3.75.2...752.698...4.13.6.8..3.974.7.3..4...6...7.8..|419827356527631498368495172936758214175246983284913567852369741793184625641572839|2',
      '7..9..5..5.9.462..8...7...43..28..46.1.4.7.8.49..31..59...1...7..736.9.2..6..5..3|764928531539146278821573694375289146612457389498631725953812467187364952246795813|2',
      '..196...5..5...136.3..14..23.9.576...6.....7...842.3.97..84..9.924...8..8...795..|281963745495782136637514982349157628562398471178426359756841293924635817813279564|2',
      '12.3..6.58.3.5.4...6.2..3.16..47.8.2.........3.4.28..72.8..4.9...6.9.7.39.7..5.18|129347685873156429465289371691473852782561934354928167238714596516892743947635218|2',
      '42..5.6.......273..756.19..7.49....65..3.7..29....85.7..95.386..568.......7.1..59|423759618691482735875631924714925386568347192932168547249573861156894273387216459|2',
      '.4..2..73..64....98297.315.2......1.9..6.1..7.8......5.148.75323....48..59..3..4.|145928673736415289829763154267549318953681427481372965614897532372154896598236741|2',
      '....8.2.7..1.2..8.2685...4...9.476181.......538691.7...1...6859.9..5.3..6.5.9....|453681297971423586268579143529347618147862935386915724714236859892754361635198472|2',
      '.85.3.4..92.4.7.31..4..825...8..13.9.........5.18..6...621..7..81.2.4.63..7.8.91.|185632497926457831734918256678541329243769185591823674362195748819274563457386912|3',
      '254.98..7.7.2.68...8..7..2.39.......861...395.......18.1..8..7...69.1.8.5..76.941|254198637173246859689573124397815462861427395425639718912384576746951283538762941|2',
      '..7..1..53...9.71..24.37....5.3.46..492...538..68.9.2....68.45..48.1...35..7..8..|987261345365498712124537986851324697492176538736859124279683451648915273513742869|2',
    ],
    hard: [
      '.......9.3..5.1.2...1..7..51.3..8.56.5.416.8.86.7..9.42..1..4...1.3.4..9.8.......|475862193398541627621937845143298756957416382862753914239175468516384279784629531|4',
      '..72...93..3.9...5...7..18.4.1.8....39..7..64....3.2.1.16..8...7...6.5..58...76..|857216493163894725249753186421685937395172864678439251916548372732961548584327619|4',
      '2.9.1..5.1....6..34........69.14.7....59286....1.73.29........55..2....6.7..8.3.2|269317854187456293453892167692145738735928641841673529324761985518239476976584312|4',
      '73....489.....82....1.4.53....78.....1.436.5.....52....54.1.3....75.....923....15|732165489546398271891247536365781942219436758478952163654819327187523694923674815|4',
      '..28..46...81.4.2..5.76.3.....4...3....685....2...7.....3.76.5..4.3.96...69..82..|972853461638194527451762389597421836314685792826937145183276954245319678769548213|4',
      '14...37...8....5....3.....1.9..28...854716392...43..7.9.....6....6....4...26...89|145293768289167534763854921397528416854716392621439875918342657576981243432675189|4',
      '..2389..7......3.8.8....592..91.3.....8.6.7.....5.81..873....5.1.5......6..7358..|562389417941257368387416592759143286418962735236578149873621954125894673694735821|4',
      '.5.7...2...9..48.1...8..6....6.1.2..14.278.69..2.9.4....7..5...3.41..7...2...7.8.|658731924279654831431829657596413278143278569782596413817965342364182795925347186|4',
      '12...6..4.475......934.8...4...6..1...6.5.4...7..8...5...8.356......523.9..6...41|128736954647529183593418726459267318386951472271384695712843569864195237935672841|4',
      '6...2.7.3..........9431.258...2..1..3..165..2..2..7...159.8342..........4.8.5...6|681529743523874961794316258965238174347165892812497635159683427236741589478952316|4',
      '......43.5.......6..85.671...6857.....94216.....6391...429.85..6.......1.91......|967182435514793826238546719126857394379421658485639172742918563653274981891365247|4',
      '.........3...94.68..4.3.7.24...2.5..85.476.13..6.5...75.9.4.2..74.36...5.........|615287349327594168984631752473129586852476913196853427569748231741362895238915674|4',
      '...4..29...4.9..6....3.2.....6..485784..1..297928..4.....1.8....2..5.1...13..9...|351467298284591763679382541136924857845716329792835416567148932928653174413279685|4',
      '......2..7495...6..8.1.94.787.6....1....8....2....1.969.82.7.3..5...3912..3......|561734289749528163382169457874695321196382745235471896918257634657843912423916578|4',
      '8.23...1..7..2..63.....7..835.8...2....276....2...3.867..5.....28..6..3..9...28.4|862345719471928563539617248356891427948276351127453986713584692284769135695132874|4',
      '38.....127..3.198.4.....5...7.4.5.3.....2.....2.8.3.9...4.....5.375.6..165.....79|385964712762351984419287563976415238843629157521873496194738625237596841658142379|4',
      '......91.9....7..5..349867...5..1..3..6.7.5..2..5..7...217368..4..1....7.87......|678352914942617385153498672795821463836974521214563798521736849469185237387249156|4',
      '..3.9582.9..6.2..55.........57.6.....6.254.7.....3.56.........82..1.6..4.9154.2..|613495827984672315572813649357961482168254973429738561746329158235186794891547236|4',
      '3..4.965.9.1....2....12...8....4...24.3.1.5.92...3....1...64....3....4.5.453.2..7|328479651971658324564123798716945832483216579259837146197564283832791465645382917|4',
      '.....1....56.7.8.33....876...5....37.9.752.8.87....9...398....46.8.1.52....9.....|987631245156274893324598761265189437493752186871463952739825614648317529512946378|4',
    ],
  },
};
/* Tangram puzzles (P3-11, BRAIN_TEASERS 5.7). Written by hand; tools/test.js (check "tangrams P3-11") proves every entry exactly.
   PUZ.tangram = [puzzle, ...] in order of difficulty: level L of every band uses entry L-1 (levels past the end pick one of the
   harder half by the day's seed; with 12 or more entries each level gets its own slice, so P3-12 only has to add entries).
   A puzzle: {id, name, say, pcs}
     id    lowercase letters, unique            name  shown and spoken ("You made the house!")
     say   the spoken prompt, one short sentence for a pre-reader ("Make a house with a big roof.")
     pcs   the SOLUTION, seven placements in the order L L M S S Q P (big, big, middle, small, small triangles, square,
           parallelogram); the silhouette is the union of the placed pieces, so the puzzle is solvable by construction.
   A placement is [k, f, x, y] (TG in src/js/80-bt-tangram.js): the piece in its start position
     L (0,0) (4,0) (2,2)   M (0,0) (2,0) (0,2)   S (0,0) (2,0) (1,1)   Q (1,0) (2,1) (1,2) (0,1)   P (0,0) (2,0) (3,1) (1,1)
   (units: the big square of all seven has side 4; y points down) is flipped if f = 1 (x -> -x; only P may flip, the others
   use f = 0), turned k x 45 degrees clockwise about (0,0) (k = 0..7), then moved by (x, y).
   x and y are exact: a number (whole or half), or a pair [a, b] meaning a + b * sqrt(2)/2. Turning by 45 degrees maps a corner
   (x, y) to (h(x - y), h(x + y)) with h = sqrt(2)/2, so with pairs every corner stays exact: for corner (xa + xb h, ya + yb h)
   the turned corner is ((xb - yb)/2 + (xa - ya) h, (xb + yb)/2 + (xa + ya) h). Pieces must meet along edges (a shared corner
   alone does not join them), must not overlap, and must make one connected shape; the check compares corners exactly.
   How to write a new one: place a piece so that one of its corners lands on a corner of a piece already placed (the test prints
   every corner of a failing entry), and look at it with `node tools/shots.js bt-tg-sheet` (every silhouette and its solution).
   ORDER (P3-12): 32 puzzles, the 8 of P3-11 and 24 more, sorted by a difficulty score (written after each entry's say):
     score = the outline's length in units + half the number of its corners + the number of pieces turned 45 degrees against the
             rest + half the number of piece pairs that meet only at a corner
   A spread-out silhouette with many corners, thin parts and mixed turns is harder to read than a compact one; ties keep the older
   entry first. tools/test.js recomputes the score and checks the order. With 32 entries each level gets its own slice of 2 or 3
   puzzles (TG.pickIndex). Most of the new entries stand the square upright (odd turns); only the picture counts, not the turns. */
var PUZ = PUZ || {};
PUZ.tangram = [
  { id: 'boat', name: 'Sailboat', say: 'Make a sailboat with two sails.', // 25.16
    pcs: [[4, 0, 6, 0], [6, 0, 2, 0], [4, 0, 2, 0], [5, 0, [0, 2], [0, 2]],
      [3, 0, [0, 6], 0], [1, 0, [0, 3], [0, -1]], [3, 0, [0, 8], 0]] },
  { id: 'house', name: 'House', say: 'Make a house with a big roof.', // 25.81
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -4]], [7, 0, [0, -2], 0],
      [1, 0, [0, 2], [0, -2]], [5, 0, [0, 1], [0, 1]], [5, 1, [0, 2], [0, -2]]] },
  { id: 'snail', name: 'Snail', say: 'Make a snail with a shell on its back.', // 25.99
    pcs: [[7, 0, [0, -2], [0, 4]], [1, 0, [0, 2], 0], [5, 0, [0, 2], [0, 6]], [1, 0, 0, [0, 4]],
      [7, 0, [0, 2], [0, 6]], [1, 0, [0, 5], [0, 3]], [3, 1, [0, 6], [0, 6]]] },
  { id: 'key', name: 'Key', say: 'Make a key for a door.', // 26.97
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [5, 0, [0, 8], [0, 5]], [1, 0, [0, 4], [0, 1]],
      [5, 0, [0, 8], [0, 3]], [1, 0, [0, 9], 0], [1, 1, [0, 8], [0, 3]]] },
  { id: 'kangaroo', name: 'Kangaroo', say: 'Make a kangaroo with a long tail.', // 28.14
    pcs: [[7, 0, [0, 2], [0, 4]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 4]], [1, 0, [0, 6], [0, -2]],
      [3, 0, [0, 8], [0, 2]], [1, 0, [0, 7], [0, -1]], [1, 1, [0, 6], [0, 6]]] },
  { id: 'fish', name: 'Fish', say: 'Make a fish with a big tail.', // 28.31
    pcs: [[4, 0, 4, 0], [0, 0, 0, 0], [7, 0, 4, 0], [0, 0, 3, -1],
      [4, 0, 5, 1], [0, 0, 2, 1], [0, 0, 2, -2]] },
  { id: 'teapot', name: 'Teapot', say: 'Make a teapot with a spout and a lid.', // 28.49
    pcs: [[5, 0, [0, 6], [0, 6]], [1, 0, [0, 2], [0, 2]], [1, 0, [0, 4], 0], [7, 0, 0, [0, 4]],
      [5, 0, [0, 2], [0, 6]], [1, 0, [0, 4], [0, 5]], [3, 1, [0, 6], [0, 6]]] },
  { id: 'candle', name: 'Candle', say: 'Make a candle with a little flame.', // 29.47
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 8]], [1, 0, 0, [0, 6]],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 2], [0, 7]], [1, 1, [0, 3], [0, 2]]] },
  { id: 'butterfly', name: 'Butterfly', say: 'Make a butterfly with big wings.', // 29.66
    pcs: [[7, 0, [0, -4], [0, 4]], [1, 0, [0, 2], 0], [5, 0, [0, -2], [0, 6]], [5, 0, [0, 4], [0, 6]],
      [3, 0, [0, 6], [0, 4]], [1, 0, [0, 1], [0, 1]], [1, 1, [0, 4], [0, 6]]] },
  { id: 'boot', name: 'Boot', say: 'Make a boot for rainy days.', // 29.97
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 8]], [1, 0, 0, [0, 6]],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 5], [0, 5]], [1, 1, [0, 3], [0, 2]]] },
  { id: 'bird', name: 'Bird', say: 'Make a bird flying.', // 29.99
    pcs: [[7, 0, 0, [0, 4]], [3, 0, [0, 8], [0, 2]], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 8], 0],
      [5, 0, [0, 4], [0, 6]], [1, 0, [0, 5], [0, -1]], [3, 0, [0, 2], [0, 4]]] },
  { id: 'fox', name: 'Fox', say: 'Make a fox face with big pointy ears.', // 30.14
    pcs: [[7, 0, [0, 2], [0, 4]], [3, 0, [0, 6], [0, 4]], [5, 0, [0, 2], [0, 4]], [1, 0, 0, 0],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 1], [0, 5]], [1, 0, 0, [0, 2]]] },
  { id: 'umbrella', name: 'Umbrella', say: 'Make an umbrella for the rain.', // 30.31
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 6], [0, 8]], [1, 0, [0, 8], [0, 2]],
      [5, 0, [0, 8], [0, 4]], [1, 0, [0, 5], [0, 3]], [1, 1, [0, 8], [0, 2]]] },
  { id: 'seal', name: 'Seal', say: 'Make a seal with a ball on its nose.', // 30.31
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [7, 0, [0, -2], [0, 4]], [3, 0, [0, 8], 0],
      [1, 0, [0, 4], [0, 4]], [1, 0, [0, 7], [0, -3]], [3, 1, [0, 4], [0, 4]]] },
  { id: 'plane', name: 'Plane', say: 'Make a plane flying in the sky.', // 30.31
    pcs: [[1, 0, 0, [0, -2]], [3, 0, [0, 6], [0, 4]], [3, 0, [0, 8], [0, 3]], [1, 0, 0, [0, 2]],
      [5, 0, [0, 4], [0, 4]], [1, 0, [0, 5], [0, 1]], [1, 1, [0, 4], [0, 4]]] },
  { id: 'rocket', name: 'Rocket', say: 'Make a rocket flying up to the stars.', // 30.81
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -2]], [7, 0, [0, -2], [0, 4]],
      [1, 0, [0, 4], [0, 2]], [1, 0, [0, 2], [0, 3]], [3, 0, [0, 3], [0, 6]]] },
  { id: 'flag', name: 'Flag', say: 'Make a flag on a pole.', // 30.88
    pcs: [[5, 0, [0, 6], [0, 4]], [1, 0, [0, 2], 0], [7, 0, 0, [0, 2]], [3, 0, [0, 2], 0],
      [1, 0, 0, [0, 2]], [1, 0, [0, 1], [0, 3]], [1, 1, [0, 3], [0, 8]]] },
  { id: 'lightning', name: 'Lightning', say: 'Make a lightning bolt.', // 30.99
    pcs: [[3, 0, [0, 6], 0], [7, 0, 0, [0, 6]], [5, 0, [0, 2], [0, 8]], [1, 0, [0, 4], [0, -4]],
      [3, 0, [0, 6], [0, 4]], [1, 0, [0, 5], [0, 1]], [3, 0, [0, 6], [0, -2]]] },
  { id: 'pine', name: 'Pine tree', say: 'Make a pine tree.', // 31.31
    pcs: [[7, 0, [0, -2], [0, 4]], [1, 0, [0, 4], 0], [1, 0, [0, 3], [0, -2]], [5, 0, [0, 4], [0, 2]],
      [1, 0, [0, 2], [0, 2]], [1, 0, [0, 3], [0, 3]], [1, 0, [0, 2], 0]] },
  { id: 'seahorse', name: 'Seahorse', say: 'Make a seahorse.', // 31.31
    pcs: [[1, 0, 0, [0, -4]], [3, 0, [0, 4], 0], [5, 0, [0, 2], [0, -2]], [7, 0, 0, [0, 4]],
      [7, 0, [0, -2], [0, 2]], [1, 0, [0, -1], [0, 1]], [1, 1, [0, 4], [0, 6]]] },
  { id: 'camel', name: 'Camel', say: 'Make a camel with a hump.', // 31.49
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 6], [0, 6]], [5, 0, [0, 8], [0, 4]],
      [3, 0, [0, 2], [0, 4]], [1, 0, [0, 7], [0, -1]], [3, 0, [0, 10], [0, -2]]] },
  { id: 'arrow', name: 'Arrow', say: 'Make an arrow pointing the way.', // 31.64
    pcs: [[3, 0, [0, 10], [0, 2]], [1, 0, [0, 6], [0, -2]], [7, 0, [0, -2], [0, 2]], [1, 0, 0, [0, 1]],
      [5, 0, [0, 4], [0, 3]], [1, 0, [0, 5], 0], [1, 1, [0, 4], [0, 3]]] },
  { id: 'train', name: 'Train', say: 'Make a train engine with a chimney.', // 31.8
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [5, 0, [0, 6], [0, 4]], [1, 0, [0, 4], [0, 2]],
      [7, 0, [0, 6], [0, 4]], [1, 0, [0, 7], [0, -1]], [1, 0, [0, 8], [0, 2]]] },
  { id: 'robot', name: 'Robot', say: 'Make a robot waving its arm.', // 32.31
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [7, 0, [0, -2], [0, 4]], [3, 0, [0, 2], [0, 6]],
      [5, 0, [0, 4], [0, 8]], [1, 0, [0, 2], [0, -1]], [1, 0, [0, 4], [0, 2]]] },
  { id: 'cat', name: 'Cat', say: 'Make a cat sitting up, with pointy ears and a tail.', // 32.49
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [6, 0, 2, 0],
      [2, 0, 4, -2], [0, 0, 2, -1], [6, 0, 4, 4]] },
  { id: 'rabbit', name: 'Rabbit', say: 'Make a rabbit with a long ear and a fluffy tail.', // 32.49
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [2, 0, 4, -2],
      [6, 0, 4, 4], [0, 0, 2, -1], [6, 0, 2, 0]] },
  { id: 'swan', name: 'Swan', say: 'Make a swan with a long neck.', // 32.66
    pcs: [[5, 0, [0, 4], [0, 4]], [3, 0, [0, 8], 0], [1, 0, [0, 4], [0, -2]], [7, 0, [0, 6], 0],
      [7, 0, [0, -4], [0, -2]], [1, 0, [0, -1], [0, -5]], [5, 1, [0, -2], [0, -2]]] },
  { id: 'duck', name: 'Duck', say: 'Make a duck swimming on a pond.', // 32.97
    pcs: [[3, 0, [0, 10], 0], [7, 0, [0, 4], [0, 6]], [5, 0, [0, 4], [0, 8]], [1, 0, 0, [0, 2]],
      [3, 0, [0, 4], [0, 4]], [1, 0, [0, 1], [0, 3]], [3, 0, [0, 6], [0, 4]]] },
  { id: 'whale', name: 'Whale', say: 'Make a whale with a big tail.', // 33.23
    pcs: [[3, 0, [0, 4], 0], [7, 0, 0, [0, 4]], [3, 0, [0, 8], [0, 3]], [1, 0, [0, 4], 0],
      [3, 0, [0, 4], [0, 4]], [1, 0, [0, 5], [0, 1]], [1, 1, [0, 5], 0]] },
  { id: 'pig', name: 'Pig', say: 'Make a pig with a curly tail.', // 33.73
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [1, 0, [0, 3], [0, -2]], [3, 0, [0, 2], [0, 4]],
      [5, 0, [0, 4], [0, 6]], [1, 0, [0, 5], 0], [1, 0, [0, -2], [0, -2]]] },
  { id: 'dinosaur', name: 'Dinosaur', say: 'Make a dinosaur with plates on its back.', // 33.97
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 2], [0, 2]],
      [5, 0, [0, 8], [0, 6]], [1, 0, [0, 2], [0, 3]], [1, 1, [0, 10], [0, 4]]] },
  { id: 'turtle', name: 'Turtle', say: 'Make a turtle out for a walk.', // 36.47
    pcs: [[7, 0, 0, 0], [1, 0, [0, 4], [0, -4]], [5, 0, 0, 0], [0, 0, [0, 1], 0],
      [0, 0, [-1, 8], -1], [0, 0, [-1, -2], [0, -2]], [0, 0, 3, 0]] },
];
/* Riddles bank (P3-14, BRAIN_TEASERS 5.9). Data only; read by src/js/81-bt-riddle.js inside functions (A11).
   RIDDLES[band] = 36 riddles, easiest first; level L (1-12) plays riddles 3(L-1) to 3L-1, so a band's set is used up before
   any riddle repeats. A riddle: {q: the riddle (read aloud), a: the answer, d: wrong choices, h: [tier 1 nudge, tier 2 strong clue]}.
     A (PK-K)  "Who am I?" / "What am I?" with 3 picture choices: a and d are picture names (RIDDLES.pics), no reading needed
     B (1-2)   simple riddles, 4 choices, each a picture with its word
     C (3-4)   wordplay, 4 word choices
     D (5-6)   lateral thinking and number riddles, 4 word choices
   Rules (checked in tools/test.js "riddles, memory, copy cat P3-14"): one clear answer; the wrong choices are different from the
   answer and from each other and are not also a fair answer; the answer (and its number word) is not in the riddle or its hints;
   sentence and riddle length per band; every word passes BAD; every picture is a picFor name with an allow-listed emoji.
   Original wording; a few are retold folk riddles. Nothing scary, rude or culturally narrow. */
var RIDDLES = {
  // picture name -> emoji fallback for picFor(name, emoji) (tools/emoji-allow.txt); names with a drawing in ART show it
  pics: {
    ant: '🐜', apple: '🍎', ball: '⚽', banana: '🍌', bat: '🦇', bed: '🛏', bee: '🐝', bell: '🔔', bike: '🚲', bird: '🐦',
    book: '📖', box: '📦', bread: '🍞', bus: '🚌', butterfly: '🦋', cake: '🎂', car: '🚗', cat: '🐱', cheese: '🧀', clock: '🕐',
    cloud: '☁', coat: '🧥', cookie: '🍪', cow: '🐄', crown: '👑', cup: '☕', dice: '🎲', dog: '🐶', dolphin: '🐬', drum: '🥁',
    duck: '🦆', ear: '👂', egg: '🥚', elephant: '🐘', 'fire-engine': '🚒', fish: '🐟', flag: '🚩', flower: '🌼', foot: '🦶',
    frog: '🐸', gift: '🎁', giraffe: '🦒', grapes: '🍇', hand: '✋', hat: '🎩', helicopter: '🚁', hen: '🐔', icecream: '🍦',
    kite: '🪁', map: '🗺', milk: '🥛', moon: '🌙', mouse: '🐭', nose: '👃', octopus: '🐙', owl: '🦉', pencil: '✏', penguin: '🐧',
    pig: '🐷', pizza: '🍕', plane: '✈', rainbow: '🌈', ring: '💍', robot: '🤖', rocket: '🚀', shell: '🐚', ship: '🚢',
    snail: '🐌', snowman: '⛄', sock: '🧦', spoon: '🥄', sponge: '🧽', star: '⭐', sun: '☀', teddy: '🧸', tent: '⛺',
    tooth: '🦷', tractor: '🚜', tree: '🌳', turtle: '🐢', watermelon: '🍉', web: '🕸',
  },
  // how a picture name is said and written when it is not the plain name
  names: { 'fire-engine': 'fire engine', icecream: 'ice cream', teddy: 'teddy bear' },
  A: [
    { q: 'I live on a farm. I say moo. I give you milk. Who am I?', a: 'cow', d: ['pig', 'duck'],
      h: ['Think of a big farm animal.', 'Moo! It has spots and eats grass.'] },
    { q: 'I wag my tail. I say woof. I love to play fetch. Who am I?', a: 'dog', d: ['cat', 'duck'],
      h: ['Think of a pet.', 'Woof, woof! It barks at the door.'] },
    { q: 'I say meow. I purr when I am happy. Who am I?', a: 'cat', d: ['dog', 'cow'],
      h: ['Think of a pet.', 'It has soft fur and long whiskers.'] },
    { q: 'I swim on the pond. I say quack. Who am I?', a: 'duck', d: ['pig', 'cat'],
      h: ['Think of a bird.', 'Quack, quack! It has webbed feet.'] },
    { q: 'I am pink. I roll in the mud. I say oink. Who am I?', a: 'pig', d: ['cow', 'hen'],
      h: ['Think of a farm animal.', 'Oink! It has a curly tail.'] },
    { q: 'I am green. I hop and I say ribbit. Who am I?', a: 'frog', d: ['duck', 'cat'],
      h: ['It lives near a pond.', 'Ribbit! It jumps from lily pad to lily pad.'] },
    { q: 'I live on a farm. I lay eggs. I say cluck. Who am I?', a: 'hen', d: ['pig', 'dog'],
      h: ['Think of a bird on a farm.', 'Cluck, cluck! It sits on its eggs to keep them warm.'] },
    { q: 'I buzz from flower to flower. I make honey. Who am I?', a: 'bee', d: ['fish', 'cow'],
      h: ['It is a small bug that flies.', 'Buzz, buzz! It has yellow and black stripes.'] },
    { q: 'I am awake at night. I say hoo, hoo. Who am I?', a: 'owl', d: ['duck', 'pig'],
      h: ['Think of a bird.', 'It has big round eyes and sits in a tree at night.'] },
    { q: 'I live in the water. I have fins, not legs. Who am I?', a: 'fish', d: ['dog', 'hen'],
      h: ['It swims.', 'It has scales and swims all day long.'] },
    { q: 'I am a long yellow fruit. Monkeys love me. What am I?', a: 'banana', d: ['apple', 'grapes'],
      h: ['Think of a fruit.', 'You peel it before you eat it.'] },
    { q: 'I am red and crunchy. I grow on a tree. What am I?', a: 'apple', d: ['banana', 'cheese'],
      h: ['Think of a fruit.', 'It is round. It crunches when you bite it.'] },
    { q: 'I am big and hot. I shine in the sky all day. What am I?', a: 'sun', d: ['moon', 'cake'],
      h: ['Look up in the sky.', 'It keeps us warm in the day.'] },
    { q: 'I shine in the night sky. Sometimes I am round and sometimes I am thin. What am I?', a: 'moon', d: ['sun', 'tree'],
      h: ['Look up at night.', 'It glows at night. Sometimes it looks like a smile.'] },
    { q: 'I twinkle in the dark sky. When you draw me, I have five points. What am I?', a: 'star', d: ['sun', 'ball'],
      h: ['Look up at night.', 'Twinkle, twinkle, little ...'] },
    { q: 'I am very slow. I carry my house on my back. Who am I?', a: 'snail', d: ['bee', 'dog'],
      h: ['It is a small animal.', 'It has a shell and leaves a shiny trail.'] },
    { q: 'I am big and gray. I have a long trunk. Who am I?', a: 'elephant', d: ['mouse', 'duck'],
      h: ['Think of a very big animal.', 'It sprays water with its long nose.'] },
    { q: 'I have a very long neck. I eat leaves from tall trees. Who am I?', a: 'giraffe', d: ['pig', 'frog'],
      h: ['Think of a very tall animal.', 'It has spots and the longest neck of all.'] },
    { q: 'I am a bird, but I cannot fly. I swim in icy water. Who am I?', a: 'penguin', d: ['owl', 'cat'],
      h: ['It lives where it is very cold.', 'It is black and white and waddles on the ice.'] },
    { q: 'I have a hard shell. I walk slowly and I can swim. Who am I?', a: 'turtle', d: ['bee', 'cat'],
      h: ['It is a slow animal.', 'It can hide its head inside its shell.'] },
    { q: 'A hen lays me. You can crack me. A chick can come out of me. What am I?', a: 'egg', d: ['apple', 'ball'],
      h: ['Think of breakfast.', 'It is white or brown on the outside and yellow in the middle.'] },
    { q: 'I am sweet. On your birthday I have candles on top. What am I?', a: 'cake', d: ['bread', 'milk'],
      h: ['Think of a party.', 'You blow out the candles on it and make a wish.'] },
    { q: 'I am tall. I have leaves. Birds build nests in me. What am I?', a: 'tree', d: ['car', 'cake'],
      h: ['Look outside in the park.', 'It has a trunk and branches.'] },
    { q: 'I grow in a garden. I smell nice. Bees visit me. What am I?', a: 'flower', d: ['hat', 'bus'],
      h: ['It grows in the ground.', 'It has pretty petals of many colors.'] },
    { q: 'I come after the rain. I have many colors. I look like a bridge in the sky. What am I?', a: 'rainbow', d: ['moon', 'tree'],
      h: ['Look up when the sun comes out after a shower.', 'Red, orange, yellow, green, blue and purple, all in an arch.'] },
    { q: 'Children make me out of snow. I have a carrot nose. What am I?', a: 'snowman', d: ['teddy', 'robot'],
      h: ['Think of winter.', 'It melts when the sun comes out.'] },
    { q: 'I am round. You can kick me, throw me and bounce me. What am I?', a: 'ball', d: ['box', 'hat'],
      h: ['Think of a toy.', 'It bounces up and down.'] },
    { q: 'I am soft and furry. I am a toy. I sleep in your bed with you. What am I?', a: 'teddy', d: ['ball', 'drum'],
      h: ['Think of a cuddly toy.', 'It is a toy bear.'] },
    { q: 'Hit me with sticks. Boom, boom, boom! What am I?', a: 'drum', d: ['cup', 'ball'],
      h: ['It makes music.', 'Bang it to make a loud sound.'] },
    { q: 'I have two wheels. You push my pedals to go. What am I?', a: 'bike', d: ['car', 'bus'],
      h: ['You ride it.', 'It has two wheels and a bell.'] },
    { q: 'I zoom up into space. Three, two, one, blast off! What am I?', a: 'rocket', d: ['car', 'ship'],
      h: ['It goes very, very high.', 'It flies all the way to the moon.'] },
    { q: 'I float on the sea. I carry people across the water. What am I?', a: 'ship', d: ['car', 'bike'],
      h: ['It goes on water.', 'It is a very big boat.'] },
    { q: 'You sleep on me at night. I have a pillow and a blanket. What am I?', a: 'bed', d: ['cup', 'car'],
      h: ['Think of your bedroom.', 'You lie down on it to sleep.'] },
    { q: 'You wear me on your head. I keep the sun off your face. What am I?', a: 'hat', d: ['sock', 'cup'],
      h: ['You wear it.', 'It goes on top of your head.'] },
    { q: 'I have a face and two hands. I tell you the time. What am I?', a: 'clock', d: ['book', 'cup'],
      h: ['Look on the wall.', 'Tick, tock, tick, tock!'] },
    { q: 'I am white and hard. I live in your mouth. You brush me. What am I?', a: 'tooth', d: ['nose', 'hand'],
      h: ['It is a part of you.', 'You chew your food with it.'] },
  ],
  B: [
    { q: 'What has hands but cannot clap?', a: 'clock', d: ['book', 'bell', 'sock'],
      h: ['Its hands move round and round.', 'It tells you the time.'] },
    { q: 'What has to be broken before you can use it?', a: 'egg', d: ['cup', 'box', 'ball'],
      h: ['Think of breakfast.', 'A hen lays it.'] },
    { q: 'I have a trunk, but I am not an elephant. I have leaves, but I am not a book. What am I?', a: 'tree', d: ['elephant', 'book', 'flower'],
      h: ['It grows in the park.', 'Birds build nests in its branches.'] },
    { q: 'I come out at night. I twinkle far, far away. What am I?', a: 'star', d: ['sun', 'kite', 'bell'],
      h: ['Look up at night.', 'Twinkle, twinkle, little ...'] },
    { q: 'I am full of holes, but I can still hold water. What am I?', a: 'sponge', d: ['book', 'sock', 'hat'],
      h: ['You use it to wash.', 'It is soft and soaks up water.'] },
    { q: 'I have four legs, but I cannot walk. You sleep on me. What am I?', a: 'bed', d: ['cat', 'cup', 'kite'],
      h: ['Think of your bedroom.', 'It has a pillow and a blanket.'] },
    { q: 'I have a carrot nose and coal eyes. When the sun comes out, I melt. What am I?', a: 'snowman', d: ['teddy', 'robot', 'cake'],
      h: ['Think of winter.', 'Children build it out of snow.'] },
    { q: 'I have a sharp point. I help you write and draw. You can erase what I make. What am I?', a: 'pencil', d: ['spoon', 'sock', 'flag'],
      h: ['You use it at school.', 'It often has an eraser on its end.'] },
    { q: 'I show up when the sun shines after the rain. I have many colors. What am I?', a: 'rainbow', d: ['cloud', 'moon', 'kite'],
      h: ['Look up in the sky.', 'It is a colorful arch.'] },
    { q: 'Ding, dong! I ring to tell you that someone is at the door. What am I?', a: 'bell', d: ['drum', 'kite', 'sock'],
      h: ['Listen for it.', 'You press a button by the door to make it ring.'] },
    { q: 'I am cold and sweet. I sit in a cone. Eat me fast before I melt! What am I?', a: 'icecream', d: ['cake', 'cookie', 'milk'],
      h: ['Think of a treat on a hot day.', 'It comes in scoops.'] },
    { q: 'I start as a little crawling bug. Then I sleep in a case. I wake up with pretty wings. What am I?', a: 'butterfly', d: ['bee', 'bird', 'snail'],
      h: ['It flies from flower to flower.', 'A caterpillar turns into one.'] },
    { q: 'I sleep upside down all day. At night I fly out to catch bugs. What am I?', a: 'bat', d: ['duck', 'frog', 'fish'],
      h: ['It flies at night.', 'It hangs by its feet in a cave.'] },
    { q: 'I live in the sea. I have eight long arms. What am I?', a: 'octopus', d: ['fish', 'dolphin', 'turtle'],
      h: ['It has lots of arms.', 'It can squirt ink to hide.'] },
    { q: 'A spider spins me out of silk. I catch flies. What am I?', a: 'web', d: ['box', 'tent', 'kite'],
      h: ['Look in a corner of the shed.', 'It is sticky and has lots of thin threads.'] },
    { q: 'You sleep in me when you go camping. I fold up small. What am I?', a: 'tent', d: ['box', 'car', 'ship'],
      h: ['Think of camping.', 'You put it up with poles and pegs.'] },
    { q: 'I am made from milk. I am yellow and I may have holes. Mice love me. What am I?', a: 'cheese', d: ['bread', 'egg', 'cake'],
      h: ['It is a food.', 'You put it on pizza.'] },
    { q: 'I have a spine, but I have no bones. I am full of pages. What am I?', a: 'book', d: ['fish', 'hand', 'bed'],
      h: ['You read it.', 'It has a cover and a story inside.'] },
    { q: 'You wear me over your clothes when it is cold outside. What am I?', a: 'coat', d: ['crown', 'ring', 'drum'],
      h: ['You wear it.', 'It has sleeves and buttons.'] },
    { q: 'I am up in the sky. I give you light and keep you warm. What am I?', a: 'sun', d: ['moon', 'cloud', 'kite'],
      h: ['Look up in the day.', 'It is a big, hot ball of glowing gas far away.'] },
    { q: 'I float in the sky. I am white and fluffy. Sometimes I bring rain. What am I?', a: 'cloud', d: ['sun', 'star', 'kite'],
      h: ['Look up in the sky.', 'It looks like cotton wool.'] },
    { q: 'I am round and flat. I have cheese and sauce on top. You eat me in slices. What am I?', a: 'pizza', d: ['cake', 'apple', 'milk'],
      h: ['It is a food.', 'It is baked in a very hot oven.'] },
    { q: 'I am green on the outside and red on the inside. I have black seeds. What am I?', a: 'watermelon', d: ['apple', 'banana', 'cheese'],
      h: ['It is a fruit.', 'It is big, round and very juicy.'] },
    { q: 'I have six sides and lots of dots. You roll me in games. What am I?', a: 'dice', d: ['ball', 'cup', 'book'],
      h: ['You play games with it.', 'Roll it to see how many steps to move.'] },
    { q: 'You find me on the beach. Hold me to your ear to hear the sea. What am I?', a: 'shell', d: ['ball', 'hat', 'bus'],
      h: ['Look on the sand.', 'A sea animal once lived inside it.'] },
    { q: 'I am made of metal. I beep and do what I am told. I am not alive. What am I?', a: 'robot', d: ['teddy', 'dog', 'cat'],
      h: ['It is a machine.', 'It has lights, buttons and metal arms.'] },
    { q: 'I am tiny. I live in a hill with lots of friends. I can carry big crumbs. What am I?', a: 'ant', d: ['dog', 'cow', 'fish'],
      h: ['It is a small bug.', 'It walks in a long line with the others.'] },
    { q: 'I work on a farm. I have big back wheels. I pull heavy things. What am I?', a: 'tractor', d: ['bus', 'bike', 'ship'],
      h: ['It is on a farm.', 'A farmer drives it across the fields.'] },
    { q: 'I race to help. I am red, with a long ladder and a loud siren. What am I?', a: 'fire-engine', d: ['bus', 'tractor', 'bike'],
      h: ['It helps people.', 'It carries water to put out fires.'] },
    { q: 'I fly, but I have no wings. My blades spin round on top. What am I?', a: 'helicopter', d: ['plane', 'bird', 'kite'],
      h: ['It flies.', 'It can go straight up and straight down.'] },
    { q: 'A king or a queen wears me on their head. I am gold and shiny. What am I?', a: 'crown', d: ['ring', 'sock', 'cup'],
      h: ['Think of a castle.', 'It has points and jewels.'] },
    { q: 'I am baked in an oven. You slice me and spread butter or jam on me. What am I?', a: 'bread', d: ['cheese', 'egg', 'apple'],
      h: ['It is a food.', 'You make sandwiches with it.'] },
    { q: 'I have four fingers and a thumb. I help you hold things. What am I?', a: 'hand', d: ['foot', 'nose', 'ear'],
      h: ['It is a part of you.', 'You wave it to say hello.'] },
    { q: 'I fly high on a long string on a windy day. What am I?', a: 'kite', d: ['ball', 'ship', 'bird'],
      h: ['Take it to the park.', 'It has a long tail and dances in the wind.'] },
    { q: 'I show you the way. I have roads and rivers, but I am flat. What am I?', a: 'map', d: ['kite', 'flag', 'cup'],
      h: ['You use it on a trip.', 'It shows where places are.'] },
    { q: 'I am wrapped in paper with a bow. You open me on your birthday. What am I?', a: 'gift', d: ['cake', 'moon', 'tree'],
      h: ['Think of a party.', 'There is a surprise inside.'] },
  ],
  C: [
    { q: 'What has lots of keys but cannot open a single lock?', a: 'a piano', d: ['a door', 'a car', 'a box'],
      h: ['Think of music.', 'You press its black and white keys to play a tune.'] },
    { q: 'What has a neck but no head?', a: 'a bottle', d: ['a giraffe', 'a ball', 'a book'],
      h: ['Think of something you drink from.', 'You pour juice out of its narrow top.'] },
    { q: 'What has one eye but cannot see?', a: 'a needle', d: ['an owl', 'a cat', 'a spoon'],
      h: ['Think of sewing.', 'Thread goes through its tiny hole.'] },
    { q: 'What gets wetter the more it dries?', a: 'a towel', d: ['the sun', 'the wind', 'a cloud'],
      h: ['Think of bath time.', 'You use it after a shower.'] },
    { q: 'What can you catch but never throw?', a: 'a cold', d: ['a ball', 'a stick', 'a stone'],
      h: ['It is not a thing you can hold.', 'It can make you sneeze and cough.'] },
    { q: 'What goes up every year but never comes down?', a: 'your age', d: ['a ball', 'a kite', 'a plane'],
      h: ['It changes on your birthday.', 'It is how old you are.'] },
    { q: 'What has many teeth but cannot bite?', a: 'a comb', d: ['a shark', 'a dog', 'a lion'],
      h: ['Think of your hair.', 'You pull it through your hair to make it neat.'] },
    { q: 'What can travel around the world while staying in a corner?', a: 'a stamp', d: ['a plane', 'a ship', 'a bird'],
      h: ['Think of letters in the mail.', 'It sits in the corner of an envelope.'] },
    { q: 'What is full of holes but still catches fish?', a: 'a net', d: ['a bucket', 'a fishing rod', 'a boat'],
      h: ['Think of fishing.', 'It is made of string tied in knots.'] },
    { q: 'The more you take, the more you leave behind. What are they?', a: 'footsteps', d: ['cookies', 'coins', 'books'],
      h: ['Think of walking.', 'You leave them in the sand or the snow.'] },
    { q: 'What belongs to you, but other people use it more than you do?', a: 'your name', d: ['your bike', 'your bed', 'your toys'],
      h: ['Other people call it out.', 'Your friends say it when they call you.'] },
    { q: 'What runs but never walks, and has a bed but never sleeps?', a: 'a river', d: ['a dog', 'a clock', 'a horse'],
      h: ['Think of water.', 'It flows all the way to the sea.'] },
    { q: 'I have cities but no houses, forests but no trees, and water but no fish. What am I?', a: 'a map', d: ['a book', 'a zoo', 'a park'],
      h: ['You use it to find your way.', 'It shows places, drawn flat on paper.'] },
    { q: 'What has a thumb and four fingers but is not alive?', a: 'a glove', d: ['a hand', 'a sock', 'a hat'],
      h: ['You wear it.', 'You put it on to keep your hand warm on a cold day.'] },
    { q: 'What kind of room has no doors and no windows?', a: 'a mushroom', d: ['a bedroom', 'a classroom', 'a bathroom'],
      h: ['This room is not in a house.', 'It grows in the forest after the rain.'] },
    { q: 'What can fill a whole room but takes up no space?', a: 'light', d: ['water', 'boxes', 'a bed'],
      h: ['Think of what helps you see.', 'You switch it on when it is dark.'] },
    { q: 'What has a head and a tail but no body?', a: 'a coin', d: ['a snake', 'a dog', 'a fish'],
      h: ['You can flip it.', 'You can buy things with it.'] },
    { q: 'What building has the most stories?', a: 'a library', d: ['a house', 'a garage', 'a shed'],
      h: ['A story can be a floor or a book.', 'You borrow books there.'] },
    { q: 'What has words but never speaks?', a: 'a book', d: ['a parrot', 'a radio', 'a teacher'],
      h: ['Think of reading.', 'It has pages and a cover.'] },
    { q: 'What gets bigger the more you take away from it?', a: 'a hole', d: ['a cake', 'a pile', 'a bucket'],
      h: ['Think of digging.', 'You dig it with a spade.'] },
    { q: 'What can you break without ever touching it?', a: 'a promise', d: ['a plate', 'a glass', 'a stick'],
      h: ['It is something you say.', 'You say you will do something, and then you must do it.'] },
    { q: 'What goes through towns and up hills but never moves?', a: 'a road', d: ['a car', 'a bus', 'a horse'],
      h: ['Cars drive on it.', 'It is made of stone and tar.'] },
    { q: 'What has ears but cannot hear?', a: 'corn', d: ['a rabbit', 'a dog', 'a cat'],
      h: ['It is a plant.', 'It is yellow and you can eat it off the cob.'] },
    { q: 'What has a tongue but cannot taste, and goes on your foot?', a: 'a shoe', d: ['a sock', 'a glove', 'a hat'],
      h: ['You wear it.', 'You tie its laces.'] },
    { q: 'I am an odd number. Take away one letter and I become even. What number am I?', a: 'seven', d: ['three', 'five', 'nine'],
      h: ['Spell each number.', 'Take away the first letter and read what is left.'] },
    { q: 'Which letter of the alphabet is a drink?', a: 'T', d: ['B', 'C', 'I'],
      h: ['Say each letter out loud.', 'It sounds like a hot drink you can have with milk.'] },
    { q: 'What kind of tree can you carry in your hand?', a: 'a palm', d: ['an oak', 'a pine', 'an apple tree'],
      h: ['Look at your hand.', 'It is also the name of the inside of your hand.'] },
    { q: 'What goes up when the rain comes down?', a: 'an umbrella', d: ['a kite', 'a balloon', 'a flag'],
      h: ['It keeps you dry.', 'You open it over your head.'] },
    { q: 'What has one head, one foot and four legs?', a: 'a bed', d: ['a dog', 'a chair', 'a horse'],
      h: ['You use it every night.', 'You lay your head on its pillow.'] },
    { q: 'In a big cave I repeat everything you shout, but I have no mouth. What am I?', a: 'an echo', d: ['a bat', 'a bell', 'a drum'],
      h: ['Listen in a cave or a valley.', 'It is your own voice bouncing back.'] },
    { q: 'What is at the end of time and at the end of space?', a: 'the letter E', d: ['the letter T', 'the letter S', 'the moon'],
      h: ['Look at the words, not at the sky.', 'Spell time and space. How do they end?'] },
    { q: 'I am tall when I am young and short when I am old. I glow. What am I?', a: 'a candle', d: ['a tree', 'a pencil', 'a flower'],
      h: ['It gives light.', 'You light it on a birthday cake.'] },
    { q: 'I make you cry, but I never tell a sad story. What am I?', a: 'an onion', d: ['a movie', 'a sad book', 'a teddy bear'],
      h: ['It is a vegetable.', 'You cut it up and your eyes water.'] },
    { q: 'I let light in but keep the wind out. You can see through me. What am I?', a: 'a window', d: ['a door', 'a wall', 'a curtain'],
      h: ['Look at your house.', 'It is made of glass.'] },
    { q: 'What starts with E, ends with E, and has only one letter inside?', a: 'an envelope', d: ['an eagle', 'an engine', 'an elephant'],
      h: ['Think of the mail.', 'You put a letter inside it before you post it.'] },
    { q: 'I follow you all day, but I vanish in the dark. What am I?', a: 'your shadow', d: ['your dog', 'your cat', 'your friend'],
      h: ['Stand in the sun.', 'It is dark and shaped just like you.'] },
  ],
  D: [
    { q: 'Some months have 31 days and some have 30. How many months have 28 days?', a: 'All 12', d: ['Just 1', '2', 'None'],
      h: ['Read the question very carefully.', 'Does January have 28 days in it? Does March?'] },
    { q: 'I am a two-digit number whose tens digit is twice its ones digit, and my digits add up to 9. What am I?', a: '63', d: ['36', '42', '81'],
      h: ['Try numbers whose digits add up to 9.', 'One digit is 2 times the other, so the digits are 6 and 3. Which way round?'] },
    { q: 'If you have me, you want to share me. Once you share me, you do not have me any more. What am I?', a: 'A secret', d: ['A joke', 'A song', 'A smile'],
      h: ['It is something you know.', 'Once you tell it, it is not hidden any more.'] },
    { q: 'I am a number: multiply me by 4, then add 5, and you get 29. What am I?', a: '6', d: ['4', '7', '9'],
      h: ['Work backwards from 29.', '29 take away 5 is 24. What times 4 makes 24?'] },
    { q: 'A rooster lays an egg on the very top of a pointed roof. Which way does the egg roll?', a: 'Roosters do not lay eggs', d: ['To the left', 'To the right', 'Down the windy side'],
      h: ['Think about who lays eggs.', 'A rooster is a father chicken.'] },
    { q: 'What can you put in a bucket to make it lighter?', a: 'A hole', d: ['Water', 'Sand', 'A stone'],
      h: ['Think of taking something out, not adding something.', 'What would let everything drain out?'] },
    { q: 'Which is heavier: a kilogram of feathers or a kilogram of bricks?', a: 'They weigh the same', d: ['The feathers', 'The bricks', 'Nobody can tell'],
      h: ['Look at the amounts, not at the things.', 'A kilogram is a kilogram.'] },
    { q: 'A boy and his dad have ages that add up to 36. The dad is 30 years older. How old is the boy?', a: '3', d: ['6', '30', '33'],
      h: ['Guess an age for the boy and check both facts.', 'If the boy is b, the dad is b + 30, and together they make 36.'] },
    { q: 'Multiply together all ten digits, from the smallest to the biggest. What do you get?', a: '0', d: ['45', '100', '362,880'],
      h: ['Look at the smallest digit.', 'What do you get when you multiply by the smallest digit?'] },
    { q: 'I am a three-digit number with 0 as my tens digit. My hundreds digit is 2 more than my ones digit, and my digits add up to 8. What am I?', a: '503', d: ['305', '404', '602'],
      h: ['The middle digit is 0, so the other two digits add up to 8.', 'Which two digits add up to 8 and are 2 apart?'] },
    { q: 'What happens once in a minute, twice in a moment, but never in a thousand years?', a: 'The letter M', d: ['The letter O', 'A second', 'A blink'],
      h: ['Look at the words, not at the times.', 'Spell minute and moment. Which letter is in both?'] },
    { q: 'I am taken from a mine and shut in a wooden case. I am never let out, yet nearly everyone uses me. What am I?', a: 'Pencil lead', d: ['Gold', 'A diamond', 'Coal'],
      h: ['You use it to write.', 'The wooden case has a sharp point at one end.'] },
    { q: 'What has thirteen hearts but no brain?', a: 'A pack of cards', d: ['An octopus', 'A valentine', 'A teddy bear'],
      h: ['Think of games.', 'It has hearts, spades, clubs and diamonds.'] },
    { q: 'Two fathers and two sons each catch one fish. No fish is lost, but only three fish come home. How can that be?', a: 'There are only three people', d: ['One fish was very small', 'They forgot to count', 'One of them fell asleep'],
      h: ['Count the people, not the fish.', 'A grandad is a father, and his son is a father too.'] },
    { q: 'I am an even number between 20 and 30, and my digits add up to 10. What am I?', a: '28', d: ['26', '37', '46'],
      h: ['Check the even numbers between 20 and 30.', 'The tens digit is 2. What must the ones digit be?'] },
    { q: 'What is the smallest number above zero that 2, 3, 4, 5 and 6 all divide into exactly?', a: '60', d: ['30', '120', '12'],
      h: ['It must be a multiple of 4 and of 5.', 'Try the multiples of 20. Which one also works for 3 and 6?'] },
    { q: 'A brick weighs one kilogram plus half a brick. How much does a whole brick weigh?', a: '2 kilograms', d: ['1.5 kilograms', '1 kilogram', '3 kilograms'],
      h: ['Half a brick plus one kilogram is the whole brick.', 'So the other half of the brick must weigh one kilogram.'] },
    { q: 'A snail climbs a wall 10 meters high. Each day it climbs 3 meters, and each night it slides down 2 meters. On which day does it reach the top?', a: 'Day 8', d: ['Day 10', 'Day 5', 'Day 7'],
      h: ['It gains one meter each whole day and night.', 'After 7 nights it is at 7 meters. How far does it climb the next day?'] },
    { q: 'I have no feet, no hands and no wings, but I climb up to the sky. What am I?', a: 'Smoke', d: ['A bird', 'A squirrel', 'A frog'],
      h: ['Think of a campfire.', 'It is gray and rises from a chimney.'] },
    { q: 'When does 9 plus 5 make 2?', a: 'On a clock', d: ['When you count backwards', 'Never', 'In Spanish'],
      h: ['Think of telling the time.', 'What time is it 5 hours after 9 o\'clock?'] },
    { q: 'What has a neck but no head, and two arms but no hands?', a: 'A shirt', d: ['A bottle', 'A robot', 'A guitar'],
      h: ['You wear it.', 'You put your arms through its sleeves.'] },
    { q: 'A girl has as many brothers as sisters. Each brother has half as many brothers as sisters. How many children are in the family?', a: '7', d: ['5', '6', '8'],
      h: ['Try a small family and test both facts.', 'The girl does not count herself, and a brother does not count himself.'] },
    { q: 'I am a number: halve me, then halve me again, and you get 5. What am I?', a: '20', d: ['10', '15', '25'],
      h: ['Work backwards: double 5.', 'Double 5 is 10. Double that once more.'] },
    { q: 'An electric train is going north. Which way does its smoke blow?', a: 'It has no smoke', d: ['South', 'North', 'East'],
      h: ['What does an electric train run on?', 'Only trains that burn fuel make smoke.'] },
    { q: 'What gets sharper the more you use it?', a: 'Your brain', d: ['A knife', 'Scissors', 'A pencil'],
      h: ['It is inside you.', 'You use it to think and to learn.'] },
    { q: 'I am four times as old as my daughter. In 20 years I will be twice as old as her. How old is she now?', a: '10', d: ['20', '5', '15'],
      h: ['Try an age for her and check both facts.', 'If she is 5, I am 20. In 20 years that is 25 and 40: not twice. Try a bigger age.'] },
    { q: 'How can you throw a ball as hard as you can and make it come back to you, without it hitting anything?', a: 'Throw it straight up', d: ['Throw it sideways', 'Throw it very fast', 'Bounce it on the floor'],
      h: ['Think about what pulls things down.', 'What brings a ball back down to the ground?'] },
    { q: 'A word has six letters. Take away one letter and twelve is left. What is the word?', a: 'Dozens', d: ['Twelve', 'Eleven', 'Months'],
      h: ['Think of another word for 12.', 'Twelve eggs make one ...'] },
    { q: 'I am the only number whose letters are in alphabetical order. What number am I?', a: 'Forty', d: ['Fifty', 'Eight', 'Ninety'],
      h: ['Look at the order of the letters in each word.', 'It is between 30 and 50.'] },
    { q: 'If you write all the numbers from 1 to 100, how many times do you write the digit 7?', a: '20', d: ['10', '11', '19'],
      h: ['Count the 7s in the ones place, then in the tens place.', 'There are ten in each place, and 77 has two.'] },
    { q: 'The more of me there is, the less you see. What am I?', a: 'Darkness', d: ['Light', 'Water', 'Sand'],
      h: ['Think of night time.', 'When the lights go out, it is all around you.'] },
    { q: 'Forward I am heavy, but backward I am not. What am I?', a: 'Ton', d: ['Rock', 'Bag', 'Lead'],
      h: ['Read each word backwards.', 'It is a very big weight.'] },
    { q: 'What has keys but no locks, space but no room, and lets you enter but not go inside?', a: 'A keyboard', d: ['A piano', 'A house', 'A car'],
      h: ['Think of a computer.', 'You type on it.'] },
    { q: 'I am a number: add me to myself, then multiply the answer by me, and you get 50. What am I?', a: '5', d: ['10', '25', '2'],
      h: ['Try small numbers.', 'If the number is n, then n plus n, times n, is 2 times n times n.'] },
    { q: 'A book and a pen cost 110 coins together. The book costs 100 coins more than the pen. How much is the pen?', a: '5 coins', d: ['10 coins', '100 coins', '55 coins'],
      h: ['Try 10 for the pen and check: what would the book cost then?', 'If the pen is p, the book is p + 100, and together they make 110.'] },
    { q: 'A clock strikes 6 times in 5 seconds. How many seconds does it take to strike 12 times?', a: '11', d: ['10', '12', '6'],
      h: ['Count the gaps between the strikes, not the strikes.', '6 strikes have 5 gaps, so each gap is one second.'] },
  ],
};
/* ---------- Brain Teasers word puzzles (P3-15; BRAIN_TEASERS.md 5.10) ----------
   The words themselves come from the lists the app already has: Word Search from the spelling lists (SPELL_WORDS, d-spell.js),
   Unscramble from the picture words in 20-words.js (band B, only words with a drawing) and the spelling lists with their sentences
   (bands C and D). This file only holds what those lists do not:
   - rude: letter runs a word search grid must never spell, in any direction (the BAD filter's words and a few more). A grid word
     that holds one of them, forwards or backwards (grass, shell, button ...), is not used in a word search.
   - more: real words that are not in the app's lists but are anagrams of words they hold (dog / god, star / rats, section /
     notices ...). Unscramble never uses a word whose letters spell another real word, so a scramble has exactly one answer;
     tools/test.js checks every word it can use against every word in the app's lists and these. Read only inside functions (A11). */
var BTW = {
  rude: (s => s.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 84) % 26 + 97)))( // ROT13: no rude word in plain text in the source
    'shpx shx fuvg qvpx pbpx fhpx gvg gvgf snt phz frk nff cvff penc qnza uryy ubr fyhg phag gjng avt snc jnax cbea cbbc cbb ohgg crr sneg ' +
    'gheq obbo xvyy tha ' +
    // AUD-BT S-6: more runs the filler letters spelt (about 1 grid in 50 read one of them forwards)
    'nefr nahf nany encr tnl ubzb pbba fcvp qlxr shp spx avcf chor gneq ahqr yhfg juber ovgpu anmv cravf'),
  more: 'act god wed hueso tab sub arc hips rats arts tsar sore ores eros roes ebon ones eons carb murd nett rifts ports strop prost writs ' +
    'notices auctioned reflow fowler cleats fluor pam deb nus gorf shore could cloud finder player grown silent enlist tinsel ' +
    'three ether there pots tops opts post spot stop evil vile veil live lemon melon thing night elbow below bowel north thorn ' +
    'inch chin cheap peach study dusty canoe ocean charm march cried cider taste state words sword petal plate pleat leapt ' +
    'steal least slate tales stale cheat teach diary dairy fired fried earth heart hater stone notes tones onset angle angel ' +
    'glean parts strap traps tea eat ate nip pin top pot opt tar art rat now own won tub but bus iced mono low flea ' +
    'taco hissed appraised ' + // AUD-BT S-7: coat, dishes and disappear have these anagrams (the tiles could start as TACO or HISSED)
    'daro', // APPROVE-200 (owner decision 2026-11-28): Mohenjo-daro (DISC-46 history) spells "daro", so Unscramble drops "road"
};

var BT_VER='v200'; // last line: the whole file ran (checked by dataReady() before the app starts)
