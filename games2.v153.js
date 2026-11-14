/* Star School games2 v153. BUILT by tools/build.py from 49-game-race.css, 49-game-skyhop.css, 49-game-snack.css, 63-game-race.js, 65-game-snack.js, 67-game-skyhop.js: never edit by hand.
   index.html v153 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v153.js. */
(function(){var s=document.createElement('style');s.id='css-games2';s.textContent="/* Star Rally, the racing game (G-02, G-02b; src/js/63-game-race.js). Ships in games2.<VER>.js. Tokens only; motion is\n   transform/opacity. The menu (next goal, cups, single races and time trials, rivals, how to drive), the garage with upgrades, the\n   race: a full-screen canvas under the shared top bar (.gh-hud), big steer buttons, a message bubble and the boost-gate question;\n   the cup standings on the end card. */\n\n/* ---- menu ---- */\n.rl-menu,.rl-gar{padding:var(--s-2) var(--s-4) var(--s-7)}\n.rl-menu>*,.rl-gar>*{max-width:1000px;margin-left:auto;margin-right:auto}\n.rl-h{margin:var(--s-5) auto var(--s-3);font-size:var(--fs-4);color:var(--ink)}\n.rl-hero{display:flex;align-items:center;gap:var(--s-4);padding:var(--s-3) var(--s-4);border-radius:var(--r-hero);\n  background:linear-gradient(var(--sc-sky-1),var(--sc-sky) 70%,var(--sc-green) 71%);box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.rl-hcar{flex:1 1 50%;max-width:260px}.rl-hcar svg{display:block;width:100%;height:auto}\n.rl-hinfo{flex:1 1 50%;display:flex;flex-direction:column;gap:var(--s-3);align-items:stretch}\n.rl-hl{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-3);color:var(--ink)}\n.rl-hl .ic,.rl-psub .ic,.rl-iprice .ic.rs-f{color:var(--star-shade)}\n.rl-places{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s-3)}\n@media (min-width:760px){.rl-places{grid-template-columns:repeat(4,minmax(0,1fr))}}\n.rl-place{display:flex;flex-direction:column;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.rl-place:active{transform:translateY(3px)}\n.rl-place.on{box-shadow:inset 0 0 0 3px var(--math),0 4px 0 var(--math-shade)}\n.rl-ppic{position:relative;display:block;aspect-ratio:240/100;border-radius:var(--r-btn);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.rl-ppic svg{position:absolute;inset:0;width:100%;height:100%;display:block}\n.rl-place.lock .rl-ppic svg{opacity:.45}\n.rl-plock{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.rl-pname{font-size:var(--fs-3);font-weight:700;line-height:1.2}\n.rl-psub{display:flex;align-items:center;gap:var(--s-1);font-size:var(--fs-2);color:var(--ink-2)}\n.rl-trks{display:grid;gap:var(--s-3)}\n@media (min-width:760px){.rl-trks{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.rl-trk{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:var(--s-3);min-height:72px;padding:var(--s-3);\n  border:0;border-radius:var(--r-card);background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.rl-trk:active{transform:translateY(4px)}\n.rl-tn{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--math-tint);color:var(--math-shade);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700}\n.rl-ti{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-width:0;line-height:1.25}\n.rl-ti b{font-size:var(--fs-3)}.rl-ti span{font-size:var(--fs-2);color:var(--ink-2)}\n.rl-go{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--math);color:var(--surface);box-shadow:0 3px 0 var(--math-shade)}\n.rl-trk.lock{background:var(--surface-2)}.rl-trk.lock .rl-go{background:var(--surface);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line)}\n.rl-trk.lock .rl-tn{background:var(--surface);color:var(--ink-3)}\n.rl-rivals{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--s-2)}\n.rl-rv{display:flex;flex-direction:column;align-items:center;text-align:center;line-height:1.2}\n.rl-rv svg{width:min(76px,100%);height:auto}.rl-rv b{font-size:var(--fs-2)}.rl-rv span{font-size:var(--fs-2);color:var(--ink-2)}\n.rl-opts{margin-top:var(--s-2)}\n.rl-mode{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2) var(--s-4)}\n.rl-mode p{margin:0;flex:1 1 220px;font-size:var(--fs-2);color:var(--ink-2)}\n.rl-how{display:grid;gap:var(--s-2);margin:var(--s-4) 0;padding:0;list-style:none}\n@media (min-width:760px){.rl-how{grid-template-columns:1fr 1fr}}\n.rl-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.rl-hi{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--math-tint);color:var(--math-shade)}\n.rl-opts .switch{margin-top:var(--s-3)}\n.stat.rl-spk .ic,.stat.rl-pos .ic{color:var(--star-shade);--ic2:var(--star-tint)}\n.stat.rl-lap .ic{color:var(--math-shade)}\n\n/* G-02b: the next goal, cups, time trial buttons, cup standings, upgrades */\n.rl-goal{display:flex;align-items:center;gap:var(--s-3);margin-top:var(--s-4);margin-bottom:0;padding:var(--s-3) var(--s-4);border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font-size:var(--fs-3);line-height:1.3;box-shadow:inset 0 0 0 2px var(--math-tint),0 4px 0 var(--ledge-soft)}\n.rl-goal .rl-hi{width:44px;height:44px}\n.rl-cups{display:grid;gap:var(--s-3)}\n@media (min-width:760px){.rl-cups{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.rl-cup{display:grid;grid-template-columns:76px minmax(0,1fr) auto;align-items:center;gap:var(--s-3);min-height:96px;padding:var(--s-3);border:0;\n  border-radius:var(--r-card);background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.rl-cup:active{transform:translateY(4px)}\n.rl-cup.won{box-shadow:inset 0 0 0 3px var(--star),0 5px 0 var(--star-shade)}\n.rl-cpic{position:relative;display:grid;place-items:center;width:76px;height:76px;border-radius:var(--r-btn);background:var(--surface-2)}\n.rl-cpic svg{width:64px;height:64px}\n.rl-cup.lock{background:var(--surface-2)}.rl-cup.lock .rl-cpic svg{opacity:.35}\n.rl-cup.lock .rl-go{background:var(--surface);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line)}\n.rl-ci{display:flex;flex-direction:column;gap:2px;min-width:0;line-height:1.25}\n.rl-ci b{font-size:var(--fs-4)}.rl-ci span{font-size:var(--fs-2);color:var(--ink-2)}.rl-ci .rl-cs{color:var(--ink);font-weight:700}\n.rl-h3{margin:var(--s-4) auto var(--s-3);font-size:var(--fs-3);color:var(--ink)}\n.rl-trow{display:flex;gap:var(--s-2);min-width:0}.rl-trow .rl-trk{flex:1 1 auto;min-width:0}\n.rl-tt{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:84px;min-height:72px;padding:var(--s-1);border:0;\n  border-radius:var(--r-card);background:var(--surface);color:var(--math-shade);font:inherit;font-size:var(--fs-2);font-weight:700;line-height:1.1;text-align:center;\n  cursor:pointer;touch-action:manipulation;box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.rl-tt:active{transform:translateY(4px)}\n.rl-sth{margin:var(--s-2) 0 var(--s-1);font-size:var(--fs-2);font-weight:700;color:var(--ink-2)}\n.rl-stand{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s-1) var(--s-2);margin:0;padding:0;list-style:none;text-align:left}\n.rl-stand li{display:grid;grid-template-columns:auto 30px minmax(0,1fr);grid-template-rows:auto auto;column-gap:var(--s-1);align-items:center;padding:2px var(--s-2);\n  border-radius:var(--r-btn);background:var(--surface-2);line-height:1.15}\n.rl-stand li.me{background:var(--star-tint);box-shadow:inset 0 0 0 2px var(--star)}\n.rl-stand .rl-sn{grid-row:1/span 2;font-family:var(--font-display);font-size:var(--fs-3);font-weight:700;color:var(--ink-2)}\n.rl-stand svg{grid-row:1/span 2;width:30px;height:32px}\n.rl-stand b{font-size:var(--fs-2);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rl-stand span:last-child{font-size:var(--fs-2);color:var(--ink-2)}\n.rl-epic{display:grid;place-items:center;width:100%;height:100%}.rl-etro{height:90%;width:auto}\n.rl-ups{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}\n.rl-upic{display:grid;place-items:center;color:var(--math-shade)}.rl-upic .ic{width:36px;height:36px}\n.rl-pips{display:flex;gap:4px}.rl-pips i{width:14px;height:14px;border-radius:50%;background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.rl-pips i.on{background:var(--good);box-shadow:none}\n.rl-iwhat{font-size:var(--fs-2);color:var(--ink-2);text-align:center;line-height:1.2}\n\n/* ---- garage ---- */\n.rl-gcar{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:var(--s-3) var(--s-5);padding:var(--s-4);border-radius:var(--r-hero);\n  background:linear-gradient(var(--gh-a),var(--gh-b))}\n.rl-gcar .rl-big{width:min(300px,80%);height:auto}\n.rl-buy{flex:1 1 260px;max-width:420px;padding:var(--s-3) var(--s-4);border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line)}\n.rl-buy p{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-1);margin:0 0 var(--s-2);font-size:var(--fs-3);color:var(--ink)}\n.rl-buy p+p{font-size:var(--fs-2);color:var(--ink-2)}\n.rl-buy .ic{color:var(--star-shade)}\n.rl-bacts{display:flex;flex-wrap:wrap;gap:var(--s-2)}\n.rl-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:var(--s-3)}\n.rl-item{display:flex;flex-direction:column;align-items:center;gap:2px;min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;touch-action:manipulation;box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);\n  transition:transform var(--t-fast) var(--ease)}\n.rl-item:active{transform:translateY(3px)}\n.rl-item.on{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.rl-ipic{display:block;width:64px;height:48px}.rl-ipic svg{width:100%;height:100%}\n.rl-iname{font-size:var(--fs-2);font-weight:700;text-align:center;line-height:1.2}\n.rl-iprice{display:flex;align-items:center;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.rl-iprice .ic{color:var(--star-shade)}.rl-item.on .rl-iprice{color:var(--good-ink)}.rl-item.on .rl-iprice .ic{color:var(--good)}\n.rl-note{margin:var(--s-2) auto 0;font-size:var(--fs-2);color:var(--ink-2)}\n\n/* ---- the race ---- */\n.rl{position:fixed;inset:0;z-index:0;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;background:var(--sc-sky)}\n.rl canvas{position:absolute;inset:0;width:100%;height:100%;display:block}\n.rl-msg{position:absolute;left:50%;top:28%;padding:var(--s-2) var(--s-5);border-radius:var(--r-pill);background:var(--surface);color:var(--ink);\n  font-family:var(--font-display);font-size:var(--fs-5);font-weight:700;width:max-content;max-width:calc(100% - 32px);text-align:center;line-height:1.2;pointer-events:none;box-shadow:0 4px 0 var(--ledge-soft);\n  opacity:0;transform:translate(-50%,-12px) scale(.9);transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.rl-msg.on{opacity:1;transform:translate(-50%,0) scale(1)}\n.rl-msg.big{font-size:var(--fs-7);padding:var(--s-2) var(--s-6)}\n.rl-q{position:absolute;left:50%;top:84px;transform:translateX(-50%);padding:var(--s-2) var(--s-5);border-radius:var(--r-pill);background:var(--bt);\n  color:var(--surface);font-family:var(--font-display);font-size:var(--fs-6);font-weight:700;white-space:nowrap;pointer-events:none;box-shadow:0 4px 0 var(--bt-shade)}\n.rl-q[hidden]{display:none}\n.rl-ctl{position:absolute;left:0;right:0;bottom:0;pointer-events:none}\n.rl-btn{position:absolute;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;justify-content:center;\n  width:clamp(96px,15vw,132px);height:clamp(96px,15vw,132px);padding:0;border:0;border-radius:32px;background:var(--surface);color:var(--math-shade);\n  font:inherit;font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;pointer-events:auto;touch-action:none;opacity:.92;\n  box-shadow:inset 0 0 0 3px var(--wash),0 6px 0 var(--math-shade);transition:transform var(--t-fast) var(--ease)}\n.rl-btn .ic{width:56px;height:56px}\n.rl-btn.on{transform:translateY(5px) scale(.96);opacity:1}\n#rll{left:14px}#rlr{right:14px}\n.rl-pro #rlr{left:calc(28px + clamp(96px,15vw,132px));right:auto}\n.rl-pro #rlgo{right:14px;background:var(--play-shade);color:var(--surface);box-shadow:inset 0 0 0 3px var(--wash),0 6px 0 var(--play-deep)}\n.rl-pro #rlgo .ic{width:44px;height:44px}\n@media (max-width:420px){.rl-pro .rl-btn{width:96px;height:96px}.rl-pro #rlr{left:118px}}\n/* Sky Hop (G-04b; src/js/67-game-skyhop.js). Ships in games2.<VER>.js. Tokens only; motion is transform/opacity on --t-* tokens.\n   The menu (the child's pet on a cloud, One-touch / Free move, the worlds, the courses, sparkle trails) and the course: a full-screen\n   canvas under the shared top bar (.gh-hud), big hop and walk buttons, a message bubble and the helper balloon's question. */\n\n/* ---- menu ---- */\n.hp-menu{padding:var(--s-2) var(--s-4) var(--s-7)}\n.hp-menu>*{max-width:1000px;margin-left:auto;margin-right:auto}\n.hp-h{margin:var(--s-5) auto var(--s-3);font-size:var(--fs-4);color:var(--ink)}\n.hp-hero{display:flex;align-items:center;gap:var(--s-4);padding:var(--s-3) var(--s-4);border-radius:var(--r-hero);\n  background:linear-gradient(var(--gh-a),var(--gh-b));box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--disc-shade)}\n.hp-hpet{position:relative;flex:1 1 45%;max-width:280px;margin:0 auto;padding-bottom:var(--s-2)}\n.hp-pet{position:relative;z-index:1;display:block;width:62%;margin:0 auto -12%}\n.hp-pet svg{display:block;width:100%;height:auto}\n.hp-hcl{display:block;width:100%;height:auto}\n.hp-hinfo{flex:1 1 55%;display:flex;flex-direction:column;gap:var(--s-3);align-items:stretch;min-width:0}\n.hp-hl{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-3);color:var(--ink)}\n.hp-hl .ic,.hp-wsub .ic,.hp-tr small .ic{color:var(--star-shade)}\n@media (max-width:560px){.hp-hero{flex-direction:column;align-items:stretch}.hp-hpet{width:60%}}\n.hp-mode{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2) var(--s-4)}\n.hp-mode p{margin:0;flex:1 1 220px;font-size:var(--fs-2);color:var(--ink-2)}\n.hp-worlds{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s-3)}\n@media (min-width:760px){.hp-worlds{grid-template-columns:repeat(4,minmax(0,1fr))}}\n.hp-world{display:flex;flex-direction:column;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.hp-world:active,.hp-crs:active,.hp-tr:active{transform:translateY(3px)}\n.hp-world.on{box-shadow:inset 0 0 0 3px var(--disc),0 4px 0 var(--disc-shade)}\n.hp-wpic{position:relative;display:block;aspect-ratio:12/5;border-radius:var(--r-btn);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.hp-wpic svg{position:absolute;inset:0;width:100%;height:100%;display:block}\n.hp-world.lock .hp-wpic svg{opacity:.45}\n.hp-wlock{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.hp-wname{font-size:var(--fs-3);font-weight:700;line-height:1.2}\n.hp-wsub{display:flex;align-items:center;gap:var(--s-1);min-height:22px;font-size:var(--fs-2);color:var(--ink-2)}\n.hp-crss{display:grid;gap:var(--s-3)}\n@media (min-width:700px){.hp-crss{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media (min-width:980px){.hp-crss{grid-template-columns:repeat(3,minmax(0,1fr))}}\n.hp-crs{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;align-items:center;gap:var(--s-2) var(--s-3);min-height:72px;padding:var(--s-3);\n  border:0;border-radius:var(--r-card);background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.hp-crs.on{box-shadow:inset 0 0 0 3px var(--disc),0 5px 0 var(--disc-shade)}\n.hp-cn{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--disc-tint);color:var(--disc-shade);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700}\n.hp-ci{display:flex;flex-direction:column;min-width:0;line-height:1.25}\n.hp-ci b{font-size:var(--fs-3)}.hp-ci span{font-size:var(--fs-2);color:var(--ink-2)}\n.hp-cr{display:flex;flex-direction:column;align-items:flex-end;gap:2px}\n.hp-md{display:grid;place-items:center;color:var(--ill-brown-1)}\n.hp-md.m2{color:var(--ill-grey-1)}.hp-md.m3{color:var(--star-shade)}\n.hp-go{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--disc);color:var(--surface);box-shadow:0 3px 0 var(--disc-shade)}\n.hp-crs.lock{background:var(--surface-2)}.hp-crs.lock .hp-go{background:var(--surface);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line)}\n.hp-crs.lock .hp-cn{background:var(--surface);color:var(--ink-3)}\n.hp-trs{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:var(--s-2)}\n.hp-tr{display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-2) var(--s-3);border:0;border-radius:var(--r-pill);\n  background:var(--surface);color:var(--ink);font:inherit;font-size:var(--fs-2);font-weight:700;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.hp-tr.on{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--good-ink)}\n.hp-tr.lock{background:var(--surface-2);color:var(--ink-3)}\n.hp-tr small{display:flex;align-items:center;margin-left:auto;font-size:var(--fs-1)}\n.hp-dot{flex:none;width:22px;height:22px;border-radius:50%;background:var(--ill-yellow);box-shadow:inset -3px -3px 0 var(--ill-yellow-2)}\n.hp-t-none{background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.hp-t-pink{background:var(--ill-pink);box-shadow:inset -3px -3px 0 var(--ill-pink-2)}\n.hp-t-sky{background:var(--ill-aqua);box-shadow:inset -3px -3px 0 var(--ill-aqua-2)}\n.hp-t-leaf{background:var(--ill-green);box-shadow:inset -3px -3px 0 var(--ill-green-2)}\n.hp-t-grape{background:var(--ill-purple);box-shadow:inset -3px -3px 0 var(--ill-purple-2)}\n.hp-t-rainbow{background:conic-gradient(var(--ill-red),var(--ill-orange),var(--ill-yellow),var(--ill-green),var(--ill-blue),var(--ill-purple),var(--ill-red))}\n.hp-how{display:grid;gap:var(--s-2);margin:var(--s-4) 0;padding:0;list-style:none}\n@media (min-width:760px){.hp-how{grid-template-columns:1fr 1fr}}\n.hp-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.hp-hi{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--disc-tint);color:var(--disc-shade)}\n\n/* ---- the course ---- */\n.hpg{position:fixed;inset:0;z-index:0;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;background:var(--sc-sky)}\n.hpg canvas{position:absolute;inset:0;width:100%;height:100%;display:block}\n.hp-msg{position:absolute;left:50%;top:22%;max-width:calc(100% - 32px);padding:var(--s-2) var(--s-5);border-radius:var(--r-pill);background:var(--surface);\n  color:var(--ink);font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;text-align:center;pointer-events:none;box-shadow:0 4px 0 var(--ledge-soft);\n  opacity:0;transform:translate(-50%,-12px) scale(.9);transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.hp-msg.on{opacity:1;transform:translate(-50%,0) scale(1)}\n.hp-msg.big{font-size:var(--fs-6);padding:var(--s-2) var(--s-6)}\n.hp-ctl{position:absolute;left:0;right:0;bottom:0;pointer-events:none}\n.hp-btn{position:absolute;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;justify-content:center;\n  width:clamp(96px,14vw,124px);height:clamp(96px,14vw,124px);padding:0;border:0;border-radius:32px;background:var(--disc-tint);color:var(--disc-shade);\n  font:inherit;font-family:var(--font-display);font-size:var(--fs-3);font-weight:700;pointer-events:auto;touch-action:none;opacity:.92;\n  box-shadow:inset 0 0 0 3px var(--wash),0 6px 0 var(--disc-shade);transition:transform var(--t-fast) var(--ease)}\n.hp-btn .ic{width:44px;height:44px}\n.hp-btn.on{transform:translateY(5px) scale(.96);opacity:1}\n#hpj{right:14px;background:var(--disc);color:var(--surface)}\n#hpl{left:14px}#hpr{left:calc(28px + clamp(96px,14vw,124px))}\n@media (max-width:400px){.hp-free .hp-btn{width:96px;height:96px}.hp-free #hpr{left:118px}}\n.hp-offer{position:absolute;inset:0;z-index:3;display:grid;place-items:center;padding:var(--s-4);background:var(--dim)}\n.hp-offer[hidden]{display:none}\n.hp-ocard{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:min(420px,100%);padding:var(--s-4) var(--s-5) var(--s-5);\n  border-radius:var(--r-hero);background:var(--surface);box-shadow:0 8px 0 var(--ledge-soft);text-align:center}\n.hp-obal{width:84px;height:auto}\n.hp-ocard p{margin:0;font-size:var(--fs-4);font-weight:700;line-height:1.3;color:var(--ink)}\n.hp-oacts{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-3);width:100%}\n.hp-oacts .btn{flex:1 1 150px;min-height:64px}\n/* Snack Stand (G-04a; src/js/65-game-snack.js). Ships in games2.<VER>.js. Tokens only; motion is transform/opacity on --t-* tokens.\n   The menu (hero with the child's stand, places, Calm / Busy, give change), the stand shop, and the day: the place behind the stand,\n   the awning and sign, the customers with their order bubbles, the counter (Undo, the plate, Serve), the stations and the food. */\n\n/* ---- menu ---- */\n.sn-menu,.sn-shop{padding:var(--s-2) var(--s-4) var(--s-7)}\n.sn-menu>*,.sn-shop>*{max-width:1000px;margin-left:auto;margin-right:auto}\n.sn-h{display:flex;align-items:baseline;gap:var(--s-2);margin:var(--s-5) auto var(--s-3);font-size:var(--fs-4);color:var(--ink)}\n.sn-got{font-size:var(--fs-2);font-weight:400;color:var(--ink-2)}\n.sn-hero{display:flex;align-items:center;gap:var(--s-4);padding:var(--s-3) var(--s-4);border-radius:var(--r-hero);\n  background:linear-gradient(var(--gh-a),var(--gh-b) 72%,var(--sc-green) 73%);box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.sn-hpic{flex:1 1 58%;min-width:0}.sn-hpic svg{display:block;width:100%;height:auto}\n.sn-hinfo{flex:1 1 42%;display:flex;flex-direction:column;gap:var(--s-3);align-items:stretch;min-width:0}\n.sn-hl{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-3);color:var(--ink)}\n.sn-hl .ic:not(.ic-coin),.sn-psub .ic{color:var(--star-shade)}\n@media (max-width:560px){.sn-hero{flex-direction:column;align-items:stretch}.sn-hpic{max-width:420px;margin:0 auto;width:100%}}\n.sn-places{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s-3)}\n@media (min-width:760px){.sn-places{grid-template-columns:repeat(5,minmax(0,1fr))}}\n.sn-place{display:flex;flex-direction:column;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.sn-place:active{transform:translateY(3px)}\n.sn-place.on{box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-ppic{position:relative;display:block;aspect-ratio:2/1;border-radius:var(--r-btn);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.sn-ppic svg{position:absolute;inset:0;width:100%;height:100%;display:block}\n.sn-place.lock .sn-ppic svg{opacity:.45}\n.sn-plock{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.sn-pname{font-size:var(--fs-3);font-weight:700;line-height:1.2}\n.sn-psub{display:flex;align-items:center;gap:var(--s-1);min-height:22px;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-opts{margin-top:var(--s-2)}\n.sn-mode{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2) var(--s-4);margin-bottom:var(--s-3)}\n.sn-mode p{margin:0;flex:1 1 220px;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-how{display:grid;gap:var(--s-2);margin:var(--s-4) 0;padding:0;list-style:none}\n@media (min-width:760px){.sn-how{grid-template-columns:1fr 1fr}}\n.sn-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.sn-hi{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--bt-tint);color:var(--bt-shade)}\n\n/* ---- shop ---- */\n.sn-shero{position:relative;padding:var(--s-3);border-radius:var(--r-hero);background:linear-gradient(var(--gh-a),var(--gh-b) 72%,var(--sc-green) 73%);\n  box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.sn-shero>svg{display:block;width:100%;max-width:560px;height:auto;margin:0 auto}\n.sn-buy{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:var(--s-2) var(--s-3);margin-top:var(--s-3);padding:var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-bpic{width:72px;height:72px;display:grid;place-items:center}.sn-bpic svg{width:100%;height:100%}\n.sn-btxt p{margin:0;font-size:var(--fs-3);line-height:1.35;color:var(--ink)}.sn-btxt p+p{font-size:var(--fs-2);color:var(--ink-2)}\n.sn-btxt .ic{vertical-align:-4px}\n.sn-bacts{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--s-2)}.sn-bacts .btn{flex:1 1 140px}\n.sn-note{margin:var(--s-3) auto 0;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:var(--s-3)}\n.sn-item{display:flex;flex-direction:column;align-items:center;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;touch-action:manipulation;box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);\n  transition:transform var(--t-fast) var(--ease)}\n.sn-item:active{transform:translateY(3px)}\n.sn-item.on{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.sn-item.sel{box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-ipic{display:grid;place-items:center;width:100%;height:64px}.sn-ipic svg{max-width:100%;height:64px}\n.sn-iname{font-size:var(--fs-2);font-weight:700;line-height:1.2;text-align:center}\n.sn-iprice{display:flex;align-items:center;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-item.on .sn-iprice{color:var(--good-ink)}\n\n/* ---- the day: the scene, the counter, the controls ---- */\n.sn{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;user-select:none;-webkit-user-select:none;background:var(--ill-brown-2)}\n.sn-scene{position:relative;flex:1 1 0;min-height:150px;overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.sn-back{position:absolute;inset:0;width:100%;height:100%;display:block}\n.sn-scene::before,.sn-scene::after{content:'';position:absolute;bottom:0;top:40px;width:14px;z-index:1;\n  background:linear-gradient(90deg,var(--ill-brown-1),var(--ill-brown) 40%,var(--ill-brown-2))}\n.sn-scene::before{left:6px}.sn-scene::after{right:6px}\n.sn-awnw{position:absolute;left:0;right:0;top:0;height:52px;z-index:2}\n.sn-awn{display:block;width:100%;height:52px}\n.sn-bunt{position:absolute;left:0;right:0;top:48px;height:24px;z-index:2}.sn-bunt svg{display:block;width:100%;height:100%}\n.sn-sign{position:absolute;top:14px;left:50%;z-index:3;display:grid;min-width:150px;padding:5px 16px;border-radius:10px;transform:translateX(-50%);\n  background:var(--ill-brown-2);color:var(--ill-white);font-family:var(--font-display);font-size:var(--fs-3);font-weight:700;text-align:center;line-height:1.2;\n  box-shadow:inset 0 2px 0 var(--ill-brown),inset 0 -3px 0 var(--ill-brown-3),0 3px 0 var(--shadow-ink);transition:transform var(--t-slow) var(--ease)}\n.sn-sign>span{grid-area:1/1;transition:opacity var(--t) var(--ease)}\n.sn-sign .sn-sb{opacity:0}\n.sn-sign.shut{animation:sn-flip var(--t-slow) var(--ease)}\n.sn-sign.shut .sn-sf{opacity:0}.sn-sign.shut .sn-sb{opacity:1}\n.sn-s-star{background:var(--ill-yellow);color:var(--ill-brown-3);box-shadow:inset 0 2px 0 var(--ill-yellow-1),inset 0 -3px 0 var(--ill-yellow-3),0 3px 0 var(--shadow-ink)}\n.sn-s-heart{background:var(--ill-pink);color:var(--ill-white);box-shadow:inset 0 2px 0 var(--ill-pink-1),inset 0 -3px 0 var(--ill-pink-3),0 3px 0 var(--shadow-ink)}\n.sn-s-lights{background:var(--ill-purple-2);color:var(--ill-yellow-1);\n  box-shadow:inset 0 0 0 3px var(--ill-yellow-1),inset 0 -3px 0 var(--ill-purple-3),0 3px 0 var(--shadow-ink)}\n@keyframes sn-flip{0%{transform:translateX(-50%) rotateX(0)}50%{transform:translateX(-50%) rotateX(90deg)}100%{transform:translateX(-50%) rotateX(0)}}\n.sn-deco,.sn-bird{position:absolute;z-index:1;pointer-events:none}.sn-deco svg,.sn-bird svg{display:block;width:100%;height:auto}\n.sn-d-flowers{left:22px;bottom:0;width:58px}\n.sn-d-board{left:78px;bottom:0;width:58px}\n.sn-d-balloons{left:20px;top:78px;width:62px}\n.sn-d-plant{right:22px;bottom:0;width:66px}\n.sn-d-jar{right:88px;bottom:0;width:40px}\n.sn-d-bell{right:130px;bottom:0;width:38px}\n.sn-d-lantern{right:30px;top:52px;width:40px}\n.sn-bird{right:16%;top:-14px;width:46px;z-index:3}\n.sn-msg{position:absolute;left:50%;bottom:8px;z-index:6;max-width:calc(100% - 32px);padding:var(--s-2) var(--s-4);border-radius:var(--r-pill);\n  background:var(--surface);color:var(--ink);font-size:var(--fs-3);font-weight:700;text-align:center;line-height:1.25;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);opacity:0;transform:translate(-50%,8px);pointer-events:none;\n  transition:opacity var(--t) var(--ease),transform var(--t) var(--ease)}\n.sn-msg.on{opacity:1;transform:translate(-50%,0)}\n.sn-msg.good{background:var(--good-tint);color:var(--good-ink);box-shadow:inset 0 0 0 2px var(--good),0 4px 0 var(--good)}\n.sn-msg.try{background:var(--try-tint);color:var(--try-ink);box-shadow:inset 0 0 0 2px var(--try),0 4px 0 var(--try)}\n\n/* customers: the order bubble over (or beside) the animal; the animal stands behind the counter */\n.sn-line{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;justify-content:center;align-items:flex-end;gap:var(--s-2);padding:0 26px}\n.sn-cu{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;animation:sn-in var(--t-slow) var(--spring)}\n@keyframes sn-in{from{opacity:0;transform:translateX(40px)}}\n.sn-bub{position:relative;display:grid;grid-template-columns:repeat(3,48px);gap:4px;padding:6px;border-radius:18px;background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--shadow-ink)}\n.sn-bub::after{content:'';position:absolute;left:50%;bottom:-9px;width:16px;height:16px;margin-left:-8px;background:var(--surface);\n  transform:rotate(45deg);box-shadow:2px 2px 0 var(--line);z-index:-1}\n.sn-bub.n1{grid-template-columns:48px}.sn-bub.n2,.sn-bub.n4{grid-template-columns:repeat(2,48px)}\n.sn-oi{position:relative;display:block;width:48px;height:48px;border-radius:10px;background:var(--surface-2)}\n.sn-oi>svg{display:block;width:100%;height:100%}\n.sn-oi.ok{background:var(--good-tint)}\n.sn-oi>i{position:absolute;right:-4px;top:-4px;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--good);color:var(--surface);\n  animation:sn-pop var(--t) var(--spring)}\n.sn-oi.look{animation:sn-look var(--t-shake) var(--ease) 2}\n@keyframes sn-pop{from{transform:scale(0)}}\n@keyframes sn-look{50%{transform:translateY(-6px) scale(1.08)}}\n.sn-bub.yum{display:flex;align-items:center;gap:6px;padding:8px 12px;color:var(--ill-pink-2);font-weight:700;font-size:var(--fs-2);white-space:nowrap}\n.sn-bub.yum span{color:var(--ink)}\n.sn-heart{display:flex;align-items:center;gap:4px;color:var(--ill-pink-2)}\n.sn-hbar{display:block;width:64px;height:10px;border-radius:5px;background:var(--surface);box-shadow:inset 0 0 0 2px var(--ill-pink-1);overflow:hidden}\n.sn-hbar i{display:block;height:100%;background:var(--ill-pink);transform-origin:left center;transition:transform var(--t) linear}\n.sn-heart.out{color:var(--ink-3)}.sn-heart.out .sn-hbar{box-shadow:inset 0 0 0 2px var(--line)}\n.sn-an{display:block;width:96px;height:96px;margin-bottom:-14px;padding:0;border:0;background:none;cursor:pointer;touch-action:manipulation;border-radius:50%}\n.sn-an svg{display:block;width:100%;height:100%}\n.sn-cu.sel .sn-bub{box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-cu.happy .sn-an{animation:sn-hop var(--t-slow) var(--ease) 2}\n@keyframes sn-hop{50%{transform:translateY(-14px)}}\n.sn-line.big .sn-an{width:124px;height:124px}\n.sn-line.big .sn-bub{grid-template-columns:repeat(3,58px)}\n.sn-line.big .sn-bub.n1{grid-template-columns:58px}.sn-line.big .sn-bub.n2{grid-template-columns:repeat(2,58px)}\n.sn-line.big .sn-oi{width:58px;height:58px}\n@media (min-height:720px){\n  .sn-line.big .sn-an{width:140px;height:140px;margin-bottom:-18px}\n  .sn-line.big .sn-bub{grid-template-columns:repeat(3,64px);gap:6px;padding:8px}\n  .sn-line.big .sn-bub.n1{grid-template-columns:64px}.sn-line.big .sn-bub.n2{grid-template-columns:repeat(2,64px)}\n  .sn-line.big .sn-oi{width:64px;height:64px}\n  .sn-plate{height:128px}\n}\n\n@media (min-height:880px) and (min-width:560px){\n  .sn-line.big .sn-an{width:190px;height:190px;margin-bottom:-24px}\n  .sn-line.big .sn-bub{grid-template-columns:repeat(3,84px)}\n  .sn-line.big .sn-bub.n1{grid-template-columns:84px}.sn-line.big .sn-bub.n2{grid-template-columns:repeat(2,84px)}\n  .sn-line.big .sn-oi{width:84px;height:84px}\n  .sn-an{width:124px;height:124px}\n  .sn-bub{grid-template-columns:repeat(3,60px)}.sn-bub.n1{grid-template-columns:60px}.sn-bub.n2,.sn-bub.n4{grid-template-columns:repeat(2,60px)}\n  .sn-oi{width:60px;height:60px}\n  .sn-plate{height:150px}\n}\n/* short landscape screens: the bubble beside the animal */\n@media (min-aspect-ratio:4/3) and (max-height:700px){\n  .sn-cu{flex-direction:row-reverse;align-items:flex-end;gap:10px}\n  .sn-cu .sn-heart{position:absolute;margin:0 0 -2px}\n  .sn-cu{position:relative}\n  .sn-bub{margin-bottom:22px}\n  .sn-bub::after{left:-6px;bottom:22px;margin:0;box-shadow:-2px 2px 0 var(--line)}\n  .sn-cu .sn-heart{left:6px;top:-18px}\n  .sn-line{gap:var(--s-5)}\n  .sn-line.big .sn-an{width:110px;height:110px}\n}\n\n/* the counter: Undo, the plate, Serve */\n.sn-counter{position:relative;z-index:5;flex:none;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:var(--s-2);\n  padding:10px var(--s-3) 8px;background:linear-gradient(var(--ill-brown-1) 0 8px,var(--ill-tan-1) 8px);box-shadow:0 -2px 0 var(--ill-brown-2)}\n.sn-undo,.sn-serve{min-width:80px;min-height:64px;flex-direction:column;gap:2px;padding:6px 10px}\n.sn-serve{min-width:92px}\n.sn-plate{position:relative;height:96px;display:grid;place-items:end center}\n.sn-plsvg{display:block;width:100%;height:100%}\n.sn-plate.bump .sn-plsvg{animation:sn-bump var(--t) var(--spring)}\n@keyframes sn-bump{50%{transform:scale(1.05)}}\n.sn-ph{position:absolute;left:0;right:0;top:30%;text-align:center;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-ctl,.sn-till{position:relative;z-index:5;flex:none;display:flex;flex-direction:column;gap:var(--s-2);padding:var(--s-2) var(--s-3) var(--s-3);\n  background:repeating-linear-gradient(90deg,var(--ill-brown) 0 58px,var(--ill-brown-2) 58px 60px)}\n.sn-c-mint .sn-ctl,.sn-c-mint .sn-till{background:var(--ill-aqua);background-image:linear-gradient(var(--ill-aqua-2) 2px,transparent 2px),\n  linear-gradient(90deg,var(--ill-aqua-2) 2px,transparent 2px);background-size:40px 40px}\n.sn-c-candy .sn-ctl,.sn-c-candy .sn-till{background:repeating-linear-gradient(110deg,var(--ill-pink) 0 22px,var(--ill-white-2) 22px 44px)}\n.sn-ctl[hidden],.sn-till[hidden]{display:none}\n.sn-tabs{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:6px;max-width:640px;width:100%;margin:0 auto}\n.sn-tab{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-height:64px;padding:4px 2px;border:0;\n  border-radius:var(--r-btn);background:var(--wash);color:var(--ink);font:inherit;font-size:var(--fs-2);font-weight:700;line-height:1.1;cursor:pointer;\n  touch-action:manipulation;box-shadow:0 3px 0 var(--shadow-ink);transition:transform var(--t-fast) var(--ease)}\n.sn-tab:active{transform:translateY(3px)}\n.sn-tpic{width:34px;height:34px}.sn-tpic svg{display:block}\n.sn-tab[aria-selected=\"true\"]{background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt),0 3px 0 var(--bt-shade)}\n.sn-dot{position:absolute;right:6px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--good);opacity:0;transform:scale(.4);\n  transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.sn-tab.ready .sn-dot{opacity:1;transform:none}\n.sn-ings{display:flex;justify-content:center;gap:6px}\n.sn-ing{flex:0 1 96px;min-width:64px}.sn-pan{flex:0 1 128px;min-width:96px}\n.sn-ing,.sn-pan{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;min-height:80px;padding:4px 2px;border:0;\n  border-radius:var(--r-btn);background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;touch-action:none;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--shadow-ink);transition:transform var(--t-fast) var(--ease)}\n.sn-ing:active,.sn-pan:active{transform:translateY(3px)}\n.sn-ipc{width:52px;height:52px}.sn-ipc svg{display:block}\n.sn-pan svg{width:60px;height:56px}\n.sn-pan[data-q=\"gold\"]{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.sn-in{font-size:var(--fs-2);font-weight:700;line-height:1.1;text-align:center}\n.sn-ghost{position:fixed;left:0;top:0;z-index:50;width:72px;height:72px;pointer-events:none}\n.sn-ghost svg{display:block}\n@media (max-height:620px){\n  .sn-plate{height:84px}\n  .sn-counter{padding-top:8px;padding-bottom:4px}\n  .sn-tab{min-height:64px}\n  .sn-ing,.sn-pan{min-height:72px}\n  .sn-ipc{width:44px;height:44px}\n  .sn-ctl{gap:6px;padding-top:6px;padding-bottom:var(--s-2)}\n}\n@media (min-width:900px){.sn-ing{flex-basis:112px}}\n\n/* give change: the till */\n.sn-till{align-items:center}\n.sn-tq{margin:0;padding:var(--s-2) var(--s-3);border-radius:var(--r-btn);background:var(--surface);font-size:var(--fs-3);line-height:1.3;text-align:center;color:var(--ink)}\n.sn-tray{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;min-height:48px;padding:4px var(--s-3);border-radius:var(--r-pill);background:var(--wash)}\n.sn-tc{position:relative;width:40px;height:40px}.sn-tc svg{display:block;width:100%;height:100%}\n.sn-tc b,.sn-coin b{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--font-display);color:var(--ill-brown-3)}\n.sn-tc b{font-size:var(--fs-2)}\n.sn-tph{font-size:var(--fs-2);color:var(--ink)}\n.sn-tsum{margin-left:var(--s-2);font-size:var(--fs-3);color:var(--ink)}\n.sn-tbtns{display:flex;flex-wrap:wrap;justify-content:center;gap:6px}\n.sn-coin{position:relative;width:64px;height:64px;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;touch-action:manipulation;\n  transition:transform var(--t-fast) var(--ease)}\n.sn-coin:active{transform:translateY(3px)}\n.sn-coin svg{display:block;width:100%;height:100%}.sn-coin b{font-size:var(--fs-4);padding-bottom:4px}\n.sn-tundo,.sn-give{min-height:64px;flex-direction:column;gap:2px;padding:6px 12px}\n\n/* top-bar chips */\n.sn-cust{grid-area:2/1;display:block;font-family:var(--font-body);font-size:var(--fs-2);font-weight:400;opacity:.92}\n\n/* P6-01: a customer at the edge of the scene keeps its whole focus ring (the scene clips) */\n.sn-an:focus-visible{outline-offset:-4px}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- Star Rally: the racing game (G-02, G-02b; CSS src/css/49-game-race.css; both go into games2.<VER>.js) ----------
   An original Star School game. Races against five friendly animal drivers, seen from behind the car on a pseudo-3D road
   (the road is drawn in strips, cheap on a canvas). A race lasts about 60-90 seconds, then the shared end card.

   How it plays
   - Easy (default for Pre-K to 2nd grade): the car keeps its speed by itself; two big buttons (or a touch on the left or right
     half of the road) steer; a steering helper keeps the car near the road. Pro (default from 3rd grade, switchable): hold Go to
     go faster (but wide in tight bends), hold a turn through a bend at speed to drift, let go for a zoom.
   - G-02b: 12 tracks, each with its own layout and length (sweepers, S-bends, hairpins, city corners, big hills and drops, long
     straights, tunnels, bridges with rails, narrow piers, two-way splits with a faster side) and its own hazards (puddles, sand,
     ice, cones, rolling hay rolls / barrels / snowballs, crossing ducks / crabs / penguin chicks). Pick-ups: a boost star and a
     shield bubble. Some races have sunset, rain, snowfall or fog (rain makes puddles slippier, snow the road a little).
   - Crashes suit children: hitting a rail, a wall, a cone, a rolling thing or an animal at speed, or running into a kart from
     behind, spins the car round with cartoon dizzy stars and a short slowdown (the animals hop away; nothing breaks). A light
     touch is a bounce. Off the road is slow. In Pro a harder hit spins longer. In Easy spins are short, the hit boxes a little
     smaller and the helper still keeps the car on the road, so a 5-year-old always finishes, but mistakes visibly cost time.
   - Progress: 4 cups of 3 races (points 10/8/6/5/4/3, standings after each race, a gold / silver / bronze trophy); a cup opens
     with a trophy in the one before (or after racing the one before twice, so nobody is stuck). Rivals get a little faster in
     later cups. Single races on any track of an open cup (stars per track as before), and a time trial against the ghost of the
     child's own best lap. Upgrades (grip, turbo, bumper) bought with sparkles from racing and opened by trophies. The menu shows
     one clear next goal. Nothing is random in what you earn; nothing changes while the app is closed. No lives, no game over.
   - Rivals keep the race close (gentle catch-up); each race they get a seeded pace style (fast start or strong finish, the same
     on average) and the same small chance to miss a hazard. Nothing ever says "last" or shows red.

   Game time: paid exactly like the other games (gtStart: 1 s a second while racing, held while paused or hidden, 20 s of grace,
   then the shared time-up card). A race cannot start without game time (ptLeft(), ptWhyNot()).
   Save: S.rally (created when the game is first opened; an old save loads unchanged): {spk, best: {track: ms}, stars: {track: 0-3},
   paint, paints: {hue: 1}, stk, stks: {id: 1}, body, mode, quiz, tilt, place, races} and from G-02b {cups: {cup: {best: 1-4, runs}},
   cup: {id, i, pts: {who: n}} (a cup being raced), lap: {track: ms}, ghost: {track: {ms, g}}, upg: {grip, turbo, bumper}}.
   Drawing: object-art style (DESIGN_SYSTEM 6.5). Sprites are SVG in the --a-* roles, turned into cached canvases once (with
   half-size copies for far away, so small things do not shimmer); the road is drawn as one path per colour each frame; the sky and
   two parallax layers are cached canvases. No raw colours anywhere in this file. */

/* ---- sizes and speeds (world units: a road segment is RL_SEG long; the road is 2 x RL_ROADW wide) ---- */
const RL_SEG = 200;
const RL_ROADW = 2000;
const RL_VMAX = 9500; // units a second at full speed (Go held)
const RL_CAMH = 1000; // camera height
const RL_PZ = 1000; // the player's car is this far in front of the camera
const RL_DRAW = 150; // segments drawn ahead
const RL_DT = 1 / 60; // fixed simulation step
const RL_START = 24; // the start line is at this segment
const RL_CARW = 0.3; // a car is this wide, in road half-widths
const RL_CRUISE = 0.78; // the speed the car keeps by itself (share of RL_VMAX)
const RL_DEV = { fast: 1, flush: false }; // test hooks (smoke): fast runs the race N times faster; flush times the drawing too

/* ---- places ---- */
// sky: two --sc-* tokens (top, horizon); grass, road, rumble, lane: --a-* roles (base and the stripe); props: [kind, weight];
// rail: the two stripes of rails and walls; water: under bridges; wall: tunnel walls (two bands); roll: the thing that rolls
// across; crit: the animal that crosses (city: none); wx: the weathers a single race can have (the first is the usual one)
const RL_PLACES = [
  { id: 'meadow', name: 'Sunny Meadow', sky: ['sky-1', 'sky'], grass: ['g', 'g1'], road: ['e2', 'e'], rumble: ['r', 'w'],
    lane: 'w', edge: 'g2', props: [['tree', 5], ['bush', 3], ['flowers', 3], ['fence', 2]],
    rail: ['n', 'm'], water: 'b', wall: ['e2', 'e3'], roll: 'hayroll', crit: 'duck', wx: ['sun', 'dusk', 'rain'] },
  { id: 'beach', name: 'Sandy Bay', sky: ['sea-1', 'sea'], grass: ['t1', 'm'], road: ['e2', 'e'], rumble: ['b', 'w'],
    lane: 'w', edge: 't', props: [['palm', 5], ['umbrella', 3], ['rock', 2], ['hut', 1]],
    rail: ['b', 'w'], water: 'c', wall: ['t2', 't3'], roll: 'barrel', crit: 'crab', wx: ['sun', 'dusk', 'fog'] },
  { id: 'snow', name: 'Snowy Peaks', sky: ['blue', 'sky-1'], grass: ['w', 'w2'], road: ['e2', 'e'], rumble: ['v', 'w'],
    lane: 'w', edge: 'w3', props: [['pine', 6], ['snowman', 2], ['rock', 1], ['igloo', 1]],
    rail: ['w2', 'c1'], water: 'c1', wall: ['b2', 'b3'], roll: 'snowball', crit: 'chick', wx: ['sun', 'snow', 'fog'] },
  { id: 'city', name: 'Night City', sky: ['night', 'night-1'], grass: ['k2', 'v3'], road: ['k2', 'e3'], rumble: ['y', 'k2'],
    lane: 'y', edge: 'v3', night: true, props: [['tower', 2], ['tower2', 2], ['lamp', 3], ['cone', 1]],
    rail: ['r', 'w'], water: 'b3', wall: ['v3', 'k2'], roll: 'barrel', crit: '', wx: ['night', 'rain'] },
];
const rlPl = id => RL_PLACES.find(p => p.id === id) || RL_PLACES[0];
// weather: sky tokens (none = the place's own), grip on puddles and the road, what falls, fog
const RL_WX = {
  sun: { name: '' }, night: { name: '' },
  dusk: { name: 'Sunset', sky: ['dusk', 'dusk-1'] },
  rain: { name: 'Rain', sky: ['stone-2', 'stone'], grip: .85, fall: 'rain' },
  snow: { name: 'Snowfall', sky: ['blue-2', 'stone'], grip: .9, fall: 'snow' },
  fog: { name: 'Fog', sky: ['stone', 'sky-1'], fog: 1 },
};

/* ---- tracks: each its own layout. A plan is road sections [enter, hold, leave, curve (+ right), hill (height change in
   segments), what is on it]. What is on it (letters): W wide, N narrow, B bridge (water and rails), T tunnel, R rails or walls,
   F a two-way split (a divider; one side is faster with boost pads, but has cones); hazards p puddles, s sand, i ice, c cones,
   b something rolling across, a animals crossing; z boost pad, * boost star, o shield bubble, g / G one / two sparkle lines. */
const RL_TRACKS = {
  meadow: [
    // gentle and wide: sweepers, a pond bridge, one puddle stretch, ducks
    { name: 'Daisy Lane', laps: 3, plan: [[20, 80, 20, 2, 0, 'Wg'], [0, 50, 0, 0, 0, 'z'], [25, 60, 25, -2, 6, 'pg'], [0, 40, 0, 0, -6, 'a*'],
      [10, 40, 10, 0, 0, 'Bg'], [25, 90, 25, 3, 0, 'WG'], [0, 40, 0, 0, 0, 'z'], [20, 50, 20, -2, 0, 'g']] },
    // long and hilly: a tunnel through the hill, hay rolls, a narrow farm bridge, a big drop
    { name: 'Windmill Hill', laps: 2, plan: [[30, 60, 30, 2, 25, 'g'], [10, 40, 10, 0, -10, 'z'], [0, 70, 0, 0, 0, 'Tg'], [20, 40, 20, -3, 15, 'b'],
      [20, 60, 20, 0, -35, 'G'], [25, 50, 25, 3, 0, 'pa'], [10, 50, 10, 0, 0, 'NB*'], [20, 60, 20, -2, 20, 'b'], [20, 40, 20, 0, -15, 'z'],
      [25, 70, 25, 4, 0, 'g'], [20, 80, 20, -3, 10, 'Rc'], [0, 60, 0, 0, -10, 'g'], [10, 40, 10, 0, 0, 'o']] },
    // a chain of S-bends, a hairpin with rails, a split, cones in the chicane
    { name: 'Butterfly Bends', laps: 3, plan: [[10, 20, 10, 4, 0, 'g'], [10, 20, 10, -4, 0, ''], [10, 20, 10, 4, 0, 'c'], [10, 20, 10, -4, 0, ''],
      [0, 40, 0, 0, 0, 'z'], [15, 30, 15, 7, 0, 'R'], [0, 30, 0, 0, 8, 'a'], [10, 20, 10, -5, -8, 'g'], [0, 100, 0, 0, 0, 'Fg'],
      [15, 40, 15, 3, 0, 'p*'], [10, 20, 10, -4, 0, ''], [10, 20, 10, 4, 0, 'c'], [20, 60, 20, -2, 10, 'g'], [0, 40, 0, 0, -10, 'oz']] },
  ],
  beach: [
    // long straights by the sea, sand at the edges, crabs, a boardwalk bridge
    { name: 'Seashell Shore', laps: 3, plan: [[0, 120, 0, 0, 0, 'Wsg'], [30, 60, 30, -2, 0, 'z'], [0, 80, 0, 0, 0, 'aG'], [30, 80, 30, 3, 8, 's'],
      [10, 60, 10, 0, -8, 'B*'], [30, 50, 30, -3, 0, 'g'], [0, 60, 0, 0, 0, 'Wz'], [20, 40, 20, 2, 0, 's']] },
    // fast sweepers, a narrow palm road, a long narrow pier with rails, rolling barrels
    { name: 'Palm Parade', laps: 2, plan: [[25, 90, 25, 3, 0, 'g'], [25, 90, 25, -3, 10, 'z'], [0, 60, 0, 0, -10, 'Nb'], [20, 60, 20, 4, 0, 'Ng'],
      [0, 140, 0, 0, 0, 'NBbo'], [25, 80, 25, -4, 0, 'G'], [0, 50, 0, 0, 15, 'z'], [25, 70, 25, 2, -15, 'ap'], [20, 60, 20, -3, 0, '*g'],
      [0, 60, 0, 0, 0, 'b'], [30, 70, 30, 3, 0, 'g']] },
    // a long climbing curve round the lighthouse, a hairpin at the top, the drop back, a split with a sandy side
    { name: 'Lighthouse Loop', laps: 3, plan: [[0, 60, 0, 0, 0, 'z'], [30, 150, 30, 3, 40, 'Rg'], [15, 25, 15, 7, 0, 'R*'], [20, 60, 20, -2, -20, 'b'],
      [30, 60, 30, -3, -20, 'g'], [0, 90, 0, 0, 0, 'Fsg'], [20, 40, 20, 4, 0, 'a'], [0, 40, 0, 0, 0, 'z'], [15, 30, 15, -5, 0, 'o']] },
  ],
  snow: [
    // ice on the straights, snowballs rolling down, gentle hills
    { name: 'Snowball Run', laps: 3, plan: [[25, 60, 25, 2, 10, 'g'], [0, 80, 0, 0, -10, 'iz'], [25, 60, 25, -3, 0, 'b'], [10, 50, 10, 0, 15, 'G'],
      [25, 70, 25, 3, -15, 'b*'], [0, 70, 0, 0, 0, 'i'], [20, 50, 20, -2, 0, 'gz'], [0, 40, 0, 0, 0, 'b']] },
    // a long valley: up, then a long run down, an icy tunnel, pine S-bends, a narrow log bridge, penguin chicks
    { name: 'Pine Valley', laps: 2, plan: [[30, 80, 30, -2, 30, 'g'], [0, 60, 0, 0, 0, 'z'], [30, 100, 30, 3, -50, 'G'], [0, 80, 0, 0, 0, 'Ti'],
      [15, 30, 15, -4, 0, 'a'], [15, 30, 15, 4, 0, ''], [15, 30, 15, -4, 0, 'c'], [0, 70, 0, 0, 0, 'NB*'], [30, 60, 30, 3, 20, 'g'],
      [0, 50, 0, 0, 0, 'iz'], [25, 60, 25, -3, 0, 'ao'], [20, 80, 20, 2, -10, 'bg'], [0, 90, 0, 0, 10, 'Wz']] },
    // switchbacks up the mountain between snow banks, ice on the bends, a long drop, a split
    { name: 'Frosty Summit', laps: 3, plan: [[0, 40, 0, 0, 0, 'z'], [15, 30, 15, 6, 20, 'R'], [0, 40, 0, 0, 15, 'Rg'], [15, 30, 15, -6, 20, 'Ri'],
      [0, 40, 0, 0, 15, 'Rb'], [15, 30, 15, 7, 10, 'R*'], [30, 90, 30, 0, -70, 'G'], [0, 80, 0, 0, 0, 'Fi'], [20, 50, 20, -3, 0, 'a'],
      [0, 40, 0, 0, 0, 'zo'], [20, 40, 20, 3, 0, 'c']] },
  ],
  city: [
    // city blocks: sharp corners between straights, walls, cones and puddles
    { name: 'Lamp Street', laps: 3, plan: [[0, 90, 0, 0, 0, 'Rg'], [8, 12, 8, 6, 0, ''], [0, 80, 0, 0, 0, 'pz'], [8, 12, 8, -6, 0, ''], [0, 70, 0, 0, 0, 'cg'],
      [8, 12, 8, 6, 0, ''], [0, 60, 0, 0, 6, '*'], [8, 12, 8, 6, -6, ''], [0, 90, 0, 0, 0, 'Gp'], [8, 12, 8, -6, 0, 'c'], [0, 70, 0, 0, 0, 'Rb'],
      [8, 12, 8, 6, 0, ''], [0, 60, 0, 0, 0, 'z']] },
    // an underpass tunnel, a wide boulevard with rolling barrels, a river bridge
    { name: 'Neon Avenue', laps: 2, plan: [[0, 60, 0, 0, 0, 'Wg'], [20, 50, 20, 3, 0, 'z'], [0, 100, 0, 0, 0, 'Tg'], [20, 50, 20, -3, 15, ''],
      [0, 120, 0, 0, -15, 'WbbG'], [25, 50, 25, 4, 0, 'p'], [0, 110, 0, 0, 0, 'B*'], [20, 40, 20, -4, 0, 'c'], [0, 80, 0, 0, 0, 'Wzp'],
      [25, 60, 25, 3, 10, 'o'], [0, 60, 0, 0, -10, 'g'], [20, 60, 20, -2, 0, 'gb']] },
    // a ring high above the city between walls: long banked bends, sharp turns, a split, ice on the top bend
    { name: 'Starlight Ring', laps: 3, plan: [[0, 50, 0, 0, 0, 'Rz'], [30, 120, 30, 4, 10, 'RG'], [0, 40, 0, 0, -10, 'Rc'], [20, 40, 20, -6, 0, 'R'],
      [0, 90, 0, 0, 0, 'Fbg'], [30, 100, 30, 5, 15, 'Ri*'], [0, 40, 0, 0, -15, 'Rp'], [15, 30, 15, -6, 0, 'R'], [0, 50, 0, 0, 0, 'Ro'],
      [20, 60, 20, 3, 0, 'Rg']] },
  ],
};
// every track by id ('meadow-0'), in order
const RL_TRK = {};
const RL_ORDER = [];
for (const pl of RL_PLACES) {
  RL_TRACKS[pl.id].forEach((t, i) => {
    t.id = pl.id + '-' + i;
    t.place = pl.id;
    t.i = i;
    RL_TRK[t.id] = t;
    RL_ORDER.push(t.id);
  });
}
// the cups: 3 races each (track, weather), harder in order; tier makes the rivals a little faster
const RL_CUPS = [
  { id: 'sprout', name: 'Sprout Cup', hue: 'g', races: [['meadow-0', 'sun'], ['beach-0', 'sun'], ['meadow-1', 'dusk']] },
  { id: 'wave', name: 'Wave Cup', hue: 'b', races: [['beach-1', 'sun'], ['snow-0', 'snow'], ['meadow-2', 'rain']] },
  { id: 'frost', name: 'Frost Cup', hue: 'c', races: [['snow-1', 'snow'], ['city-0', 'night'], ['beach-2', 'fog']] },
  { id: 'star', name: 'Star Cup', hue: 'v', races: [['city-1', 'rain'], ['snow-2', 'sun'], ['city-2', 'night']] },
];
RL_CUPS.forEach((c, i) => { c.tier = i; for (const [t] of c.races) RL_TRK[t].cup = i; });
const RL_PTS = [10, 8, 6, 5, 4, 3]; // cup points by place
const RL_TROPHY = ['', 'Gold', 'Silver', 'Bronze'];

/* ---- the friendly rivals: an animal driver and a kart colour each ---- */
const RL_RIVALS = [
  { id: 'fox', name: 'Fern', kind: 'Fox', car: 'b' },
  { id: 'bunny', name: 'Bo', kind: 'Bunny', car: 'p' },
  { id: 'bear', name: 'Bruno', kind: 'Bear', car: 'y' },
  { id: 'penguin', name: 'Pip', kind: 'Penguin', car: 'c' },
  { id: 'frog', name: 'Fizz', kind: 'Frog', car: 'v' },
];

/* ---- the garage: paint, stickers (bought with sparkles), car shapes (opened with stars), upgrades (sparkles + trophies) ---- */
// a race pays about 40-60 sparkles, so paint and stickers take about 20 races
const RL_PAINTS = [['r', 'Red', 0], ['b', 'Blue', 40], ['g', 'Green', 50], ['y', 'Yellow', 50], ['o', 'Orange', 60],
  ['p', 'Pink', 60], ['v', 'Purple', 80], ['c', 'Aqua', 80]];
const RL_STICKERS = [['', 'No sticker', 0], ['star', 'Star', 30], ['heart', 'Heart', 40], ['bolt', 'Lightning', 50],
  ['flower', 'Flower', 60], ['paw', 'Paw', 70], ['moon', 'Moon', 80], ['rainbow', 'Rainbow', 100], ['flame', 'Flame', 120]];
const RL_BODIES = [['kart', 'Kart', 0], ['buggy', 'Buggy', 6], ['rocket', 'Rocket car', 15]]; // [id, name, stars needed]
// upgrades: [id, name, what it does, icon, levels [sparkles, trophies needed]]
const RL_UPG = [
  ['grip', 'Grippy tyres', 'Less sliding on ice and puddles; bends push you less.', 'target', [[60, 0], [120, 1], [200, 2]]],
  ['turbo', 'Turbo', 'Zooms from pads, stars and drifts last longer.', 'bolt', [[60, 0], [120, 1], [200, 3]]],
  ['bumper', 'Bouncy bumper', 'Spins after a bump are shorter.', 'replay', [[50, 0], [100, 1], [180, 2]]],
];

/* ---- the save (S.rally): read with defaults, every number checked; the sparkle count can never go below 0 ---- */
const rlNum = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(+v || 0)));
const rlObj = v => (v && typeof v == 'object' && !Array.isArray(v) ? v : {});
function rlS() {
  const r = (S.rally = rlObj(S.rally));
  r.spk = rlNum(r.spk, 0, 1e7);
  r.races = rlNum(r.races, 0, 1e7);
  r.best = rlObj(r.best);
  r.stars = rlObj(r.stars);
  for (const k in r.best) if (!RL_TRK[k] || !(+r.best[k] > 0)) delete r.best[k];
  for (const k in r.stars) if (!RL_TRK[k]) delete r.stars[k];
  else r.stars[k] = rlNum(r.stars[k], 0, 3);
  r.paints = rlObj(r.paints);
  r.paints.r = 1;
  if (!RL_PAINTS.some(p => p[0] === r.paint) || !r.paints[r.paint]) r.paint = 'r';
  r.stks = rlObj(r.stks);
  if (typeof r.stk != 'string' || (r.stk && !r.stks[r.stk])) r.stk = '';
  if (!RL_BODIES.some(b => b[0] === r.body) || !rlBodyOpen(r.body, r)) r.body = 'kart';
  if (r.mode !== 'easy' && r.mode !== 'pro') delete r.mode;
  r.quiz = !!r.quiz;
  r.tilt = !!r.tilt;
  if (!RL_PLACES.some(p => p.id === r.place)) r.place = 'meadow';
  // G-02b fields (absent in older saves): cups won, a cup being raced, best laps, ghosts, upgrades
  r.cups = rlObj(r.cups);
  for (const k in r.cups) {
    if (!RL_CUPS.some(c => c.id === k)) { delete r.cups[k]; continue; }
    const c = (r.cups[k] = rlObj(r.cups[k]));
    c.best = rlNum(c.best, 1, 4);
    c.runs = rlNum(c.runs, 0, 1e6);
  }
  if (r.cup != null) {
    const c = rlObj(r.cup), cup = RL_CUPS.find(x => x.id === c.id);
    if (!cup || !rlCupOpen(RL_CUPS.indexOf(cup), r)) delete r.cup;
    else {
      const pts = {};
      for (const w of ['you'].concat(RL_RIVALS.map(v => v.id))) pts[w] = rlNum(rlObj(c.pts)[w], 0, 30);
      r.cup = { id: c.id, i: rlNum(c.i, 0, 2), pts };
    }
  }
  r.lap = rlObj(r.lap);
  for (const k in r.lap) if (!RL_TRK[k] || !(+r.lap[k] > 0)) delete r.lap[k];
  else r.lap[k] = Math.round(+r.lap[k]);
  r.ghost = rlObj(r.ghost);
  for (const k in r.ghost) {
    const g = rlObj(r.ghost[k]);
    if (!RL_TRK[k] || !(+g.ms > 0) || typeof g.g != 'string' || g.g.length % 2 || g.g.length > 2400 || !/^[A-Za-z0-9_-]*$/.test(g.g)) delete r.ghost[k];
    else r.ghost[k] = { ms: Math.round(+g.ms), g: g.g };
  }
  const u = (r.upg = rlObj(r.upg));
  for (const k in u) if (!RL_UPG.some(x => x[0] === k)) delete u[k];
  for (const [k] of RL_UPG) u[k] = rlNum(u[k], 0, 3);
  return r;
}
// the hub and the tests read without creating S.rally
const rlPeek = () => (S.rally && typeof S.rally == 'object' && !Array.isArray(S.rally) ? S.rally : {});
const rlStarsAll = (r = rlPeek()) => RL_ORDER.reduce((a, k) => a + rlNum((r.stars || {})[k], 0, 3), 0);
const rlMode = (r = rlPeek()) => r.mode || ((S.grade == null ? 0 : +S.grade) <= 2 ? 'easy' : 'pro');
const rlCupRec = (r, id) => rlObj(rlObj(r.cups)[id]);
// trophies: cups finished in the top 3
const rlTrophies = (r = rlPeek()) => RL_CUPS.filter(c => { const b = rlNum(rlCupRec(r, c.id).best, 0, 4); return b >= 1 && b <= 3; }).length;
// a cup opens with a trophy in the one before, after racing the one before twice, or when one of its tracks was raced (old saves)
function rlCupOpen(i, r = rlPeek()) {
  const cup = RL_CUPS[i];
  if (!cup) return false;
  if (i == 0 || cup.races.some(([t]) => rlNum((r.stars || {})[t], 0, 3) > 0)) return true;
  const p = rlCupRec(r, RL_CUPS[i - 1].id), b = rlNum(p.best, 0, 4);
  return (b >= 1 && b <= 3) || rlNum(p.runs, 0, 1e6) >= 2;
}
// a track can be raced on its own (and timed) when its cup is open or it was raced before
const rlTrackOpen = (id, r = rlPeek()) => !!RL_TRK[id] && (rlCupOpen(RL_TRK[id].cup, r) || rlNum((r.stars || {})[id], 0, 3) > 0);
function rlBodyOpen(id, r) {
  const b = RL_BODIES.find(x => x[0] === id);
  return !!b && rlStarsAll(r) >= b[2];
}
// buy an item: true when bought; never takes more sparkles than there are
function rlBuy(kind, id) {
  const r = rlS(), list = kind == 'paint' ? RL_PAINTS : RL_STICKERS, own = kind == 'paint' ? r.paints : r.stks;
  const it = list.find(x => x[0] === id);
  if (!it || !id || own[id]) return false;
  if (r.spk < it[2]) return false;
  r.spk -= it[2];
  own[id] = 1;
  return true;
}
// the next level of an upgrade: {lv, cost, need} or null at the top
function rlUpNext(id, r = rlPeek()) {
  const u = RL_UPG.find(x => x[0] === id);
  if (!u) return null;
  const lv = rlNum(rlObj(r.upg)[id], 0, 3);
  return lv >= u[4].length ? null : { lv: lv + 1, cost: u[4][lv][0], need: u[4][lv][1] };
}
function rlBuyUp(id) {
  const r = rlS(), nx = rlUpNext(id, r);
  if (!nx || r.spk < nx.cost || rlTrophies(r) < nx.need) return false;
  r.spk -= nx.cost;
  r.upg[id] = nx.lv;
  return true;
}
// a time in ms as 1:05.3
const rlTime = ms => {
  const t = Math.max(0, Math.round(ms / 100)), m = Math.floor(t / 600), s = (t % 600) / 10;
  return m + ':' + (s < 10 ? '0' : '') + s.toFixed(1);
};
const rlOrd = n => n + (n == 1 ? 'st' : n == 2 ? 'nd' : n == 3 ? 'rd' : 'th');

/* ---- drawings (SVG in --a-* roles; the gh* shape helpers are in 59-game-hub.js) ---- */
// a tyre seen from behind: dark rubber, a grey sheen on the left, tread lines
const rlTyre = (x, y, w, h, lite) => ghR(x + 1.2, y + 1.2, w, h, gh1(w * .32), 'k') + ghR(x, y, w, h, gh1(w * .32), 'k2') +
  ghR(x + w * .16, y + h * .1, w * .2, h * .76, gh1(w * .1), 'e3', .6) + (lite ? '' : ghL(`M${gh1(x + w * .2)} ${gh1(y + h * .32)}h${gh1(w * .6)}M${gh1(x + w * .2)} ${gh1(y + h * .52)}h${gh1(w * .6)}` +
    `M${gh1(x + w * .2)} ${gh1(y + h * .72)}h${gh1(w * .6)}`, 'k', 1.4, .55));
// a heart path around (x, y), r about its half-width
const rlHeartD = (x, y, r) => `M${gh1(x)} ${gh1(y + r * .85)}C${gh1(x - r * 1.3)} ${gh1(y)} ${gh1(x - r * .9)} ${gh1(y - r * 1.05)}` +
  ` ${gh1(x)} ${gh1(y - r * .4)}C${gh1(x + r * .9)} ${gh1(y - r * 1.05)} ${gh1(x + r * 1.3)} ${gh1(y)} ${gh1(x)} ${gh1(y + r * .85)}Z`;
// a sticker on a white die-cut disc: star, heart, bolt, flower, paw, moon, rainbow, flame
function rlStk(id, x, y, r) {
  if (!id) return '';
  let s = ghC(x + r * .08, y + r * .1, r, 'w3') + ghC(x, y, r * .95, 'w');
  const q = r * .62;
  if (id == 'star') {
    s += `<path ${ghF('y2')} d="${rwStarD(x + q * .06, y + q * .1, q, q * .46)}"/>` + `<path ${ghF('y')} d="${rwStarD(x - q * .04, y, q * .9, q * .42)}"/>`;
  } else if (id == 'heart') {
    s += ghP(rlHeartD(x + q * .06, y + q * .08, q), 'r2') + ghP(rlHeartD(x, y, q * .9), 'r') + ghE(x - q * .45, y - q * .35, q * .2, q * .13, 'w', .7, -30);
  } else if (id == 'bolt') {
    const bd = (dx, k) => ghPts([[.15, -1], [-.55, .12], [-.05, .12], [-.25, 1], [.6, -.18], [.08, -.18], [.35, -1]]
      .map(([a, b]) => [x + dx + a * q * k, y + dx + b * q * k]));
    s += ghP(bd(q * .08, 1), 'y2') + ghP(bd(0, .92), 'y');
  } else if (id == 'flower') {
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5 - Math.PI / 2, px = x + Math.cos(a) * q * .55, py = y + Math.sin(a) * q * .55;
      s += ghC(px + q * .05, py + q * .05, q * .4, 'p2') + ghC(px, py, q * .36, 'p');
    }
    s += ghBall(x, y, q * .34, 'y');
  } else if (id == 'paw') {
    s += ghE(x + q * .05, y + q * .35, q * .5, q * .4, 'n2') + ghE(x, y + q * .3, q * .46, q * .36, 'n');
    for (const [a, b] of [[-.62, -.12], [-.24, -.55], [.24, -.55], [.62, -.12]]) s += ghBall(x + a * q, y + b * q, q * .2, 'n');
  } else if (id == 'moon') {
    const m = (dx, R, c) => `<path ${ghF(c)} d="M${gh1(x + dx)} ${gh1(y - R)}a${gh1(R)} ${gh1(R)} 0 1 0 ${gh1(R * .9)} ${gh1(R * 1.6)}` +
      `a${gh1(R * .8)} ${gh1(R * .8)} 0 0 1 ${gh1(-R * .9)} ${gh1(-R * 1.6)}Z"/>`;
    s += m(q * .1, q, 'y2') + m(0, q * .92, 'y');
  } else if (id == 'rainbow') {
    ['r', 'o', 'y', 'g', 'b'].forEach((c, i) => {
      const R = q * (1 - i * .17);
      s += ghL(`M${gh1(x - R)} ${gh1(y + q * .45)}A${gh1(R)} ${gh1(R)} 0 0 1 ${gh1(x + R)} ${gh1(y + q * .45)}`, c, gh1(q * .18));
    });
  } else if (id == 'flame') {
    const f = (k, c) => ghP(`M${gh1(x)} ${gh1(y - q * k)}C${gh1(x + q * .9 * k)} ${gh1(y - q * .2 * k)} ${gh1(x + q * .85 * k)} ${gh1(y + q)}` +
      ` ${gh1(x)} ${gh1(y + q)}C${gh1(x - q * .85 * k)} ${gh1(y + q)} ${gh1(x - q * .9 * k)} ${gh1(y - q * .2 * k)} ${gh1(x)} ${gh1(y - q * k)}Z`, c);
    s += f(1.05, 'o2') + f(.95, 'o') + f(.5, 'y');
  }
  return s;
}
// a driver's head seen from behind, around (60, 24): the player's helmet (hue h) or an animal
function rlBackHead(who, h) {
  if (who == 'fox') {
    return ghP('M84 46C106 46 114 26 102 14C100 26 94 33 82 38Z', 'o2') + ghP('M84 44C104 44 111 27 102 16C99 27 93 33 82.5 37Z', 'o') +
      ghP('M102 14C108 18 110 24 108.5 30C104 28 101 22 102 14Z', 'w') +
      ghP('M45 18L47 1L58 12Z', 'o2') + ghP('M46 17L47.6 3.4L56.4 12.4Z', 'o') + ghP('M46.6 9L47.4 2.6L51 6Z', 'k2') +
      ghP('M75 18L73 1L62 12Z', 'o2') + ghP('M74 17L72.4 3.4L63.6 12.4Z', 'o') + ghP('M73.4 9L72.6 2.6L69 6Z', 'k2') +
      ghBall(60, 24, 14, 'o');
  }
  if (who == 'bunny') {
    return ghE(51.5, 6, 5.4, 14, 'w3', null, -10) + ghE(51, 5.4, 4.6, 13, 'w', null, -10) + ghE(51.6, 7.5, 2, 8.5, 'p1', .9, -10) +
      ghE(68.5, 6, 5.4, 14, 'w3', null, 10) + ghE(68, 5.4, 4.6, 13, 'w', null, 10) + ghE(68.4, 7.5, 2, 8.5, 'p1', .9, 10) +
      ghC(61, 26, 14.6, 'w3') + ghBall(60, 25, 14, 'w');
  }
  if (who == 'bear') {
    return ghBall(46.5, 12, 6.4, 'n') + ghC(46.5, 12, 2.8, 'n2') + ghBall(73.5, 12, 6.4, 'n') + ghC(73.5, 12, 2.8, 'n2') + ghBall(60, 24, 14.5, 'n');
  }
  if (who == 'penguin') {
    return ghC(61, 25, 15, 'k') + ghC(59.6, 23.6, 13.4, 'k2') + ghE(54.5, 17, 4, 2.4, 'w', .3, -35) +
      ghP('M70 34L88 27L86 37Z', 'r2') + ghP('M70 33.4L86 28.4L84.6 35.6Z', 'r') + ghR(45, 32, 30, 7, 3.5, 'r2') + ghR(45, 31, 30, 6, 3, 'r');
  }
  if (who == 'frog') return ghBall(60, 25, 14.6, 'g') + ghBall(49.5, 14, 6.6, 'g') + ghBall(70.5, 14, 6.6, 'g');
  // the player's helmet: white with a stripe in the car's paint
  return ghC(61, 24, 14.6, 'w3') + ghBall(60, 23, 14, 'w') + ghL('M60 9.4V36.6', h, 5) + ghL('M58.6 10.6V22', h + '1', 1.4, .8) +
    ghR(47, 33, 26, 5, 2.5, 'k2');
}
// a car seen from behind, viewBox 120 x 84 (ground at 80): body kart | buggy | rocket, paint hue h, sticker st, driver who;
// lite leaves out the small details (pipes, glints, tread) for small pictures
function rlCarArt(body, h, st, who, lite) {
  let s = ghShad(60, 79, 56, 5, .18);
  if (body == 'rocket') {
    return s + rlTyre(12, 62, 16, 16) + rlTyre(92, 62, 16, 16) + rlBackHead(who, h) +
      ghP('M30 36L6 72H34Z', h + '2') + ghP('M30 36.6L8.6 70.6H32.6Z', h) + ghP('M90 36L114 72H86Z', h + '2') + ghP('M90 36.6L111.4 70.6H87.4Z', h) +
      ghR(25, 31, 72, 40, 18, h + '2') + ghR(23, 29, 71, 38, 17, h) + ghR(30, 32, 36, 5, 2.5, h + '1', .85) +
      ghR(27, 56, 66, 9, 4.5, h + '3', .45) + ghC(60, 51, 12, 'e3') + ghC(59.4, 50.4, 10.6, 'e1') + ghC(60, 51, 8, 'o') +
      ghC(60, 51, 4.6, 'y1') + ghE(57, 48, 2.2, 1.4, 'w', .8, -30) + ghR(11, 66, 10, 4, 2, 'y') + ghR(99, 66, 10, 4, 2, 'y') +
      rlStk(st, 40, 42, 7.5);
  }
  const big = body == 'buggy', ty = big ? 40 : 46, th = big ? 38 : 31, tw = big ? 27 : 24;
  s += rlTyre(big ? 3 : 6, ty, tw, th, lite) + rlTyre(90, ty, tw, th, lite) + ghR(26, 58, 68, 6, 3, 'k2') + rlBackHead(who, h);
  if (big) s += ghL('M35 38C35 7 85 7 85 38', 'e3', 5.4) + ghL('M34.2 36C34.2 8.6 83.6 8.6 83.6 34', 'e1', 2, .9);
  return s + ghR(20, 35, 82, 34, 13, h + '2') + ghR(18, 33, 80, 32, 12, h) + ghR(25, 36, 42, 5, 2.5, h + '1', .85) +
    ghR(21, 55, 78, 8, 4, h + '3', .4) +
    ghR(23, 41, 13, 8, 4, 'y2') + ghR(22.4, 40.4, 12, 7, 3.5, 'y') + ghR(84, 41, 13, 8, 4, 'y2') + ghR(83.4, 40.4, 12, 7, 3.5, 'y') +
    ghR(27, 66, 67, 7, 3.5, 'e3') + ghR(26, 65, 67, 6, 3, 'e1') + rlStk(st, 60, 47, 9) + (lite ? '' : ghE(25.6, 42.4, 2.4, 1.2, 'w', .8) +
    ghE(86.6, 42.4, 2.4, 1.2, 'w', .8) + ghR(30, 66, 30, 1.6, .8, 'w', .7) + ghC(47, 71, 4, 'e3') + ghC(46.5, 70.5, 3, 'e1') + ghC(47, 71, 1.6, 'k2') +
    ghC(73, 71, 4, 'e3') + ghC(72.5, 70.5, 3, 'e1') + ghC(73, 71, 1.6, 'k2'));
}
// a face from the front (menus, the podium): the five animals or the player's helmet (hue h); centre x, y, scale k (head radius 15k)
function rlFace(who, x, y, k, h = 'r') {
  const X = v => gh1(x + v * k), Y = v => gh1(y + v * k);
  const eyes = (dy = 0, gap = 6) => ghE(x - gap * k, y + (dy - 1) * k, 2.2 * k, 2.8 * k, 'k') + ghE(x + gap * k, y + (dy - 1) * k, 2.2 * k, 2.8 * k, 'k') +
    ghC(x - (gap + .8) * k, y + (dy - 2.2) * k, .85 * k, 'w') + ghC(x + (gap - .8) * k, y + (dy - 2.2) * k, .85 * k, 'w');
  const smile = (dy, w) => ghL(`M${X(-w)} ${Y(dy)}Q${X(0)} ${Y(dy + 3)} ${X(w)} ${Y(dy)}`, 'k', gh1(1.3 * k));
  const cheeks = dy => ghE(x - 10 * k, y + dy * k, 2.6 * k, 1.7 * k, 'p', .6) + ghE(x + 10 * k, y + dy * k, 2.6 * k, 1.7 * k, 'p', .6);
  let s = ghShad(x + 1 * k, y + 17 * k, 13 * k, 2.4 * k, .12);
  if (who == 'fox') {
    s += ghP(`M${X(-13)} ${Y(-4)}L${X(-12)} ${Y(-20)}L${X(-2)} ${Y(-11)}Z`, 'o2') + ghP(`M${X(13)} ${Y(-4)}L${X(12)} ${Y(-20)}L${X(2)} ${Y(-11)}Z`, 'o2') +
      ghP(`M${X(-11)} ${Y(-7)}L${X(-11)} ${Y(-17)}L${X(-4)} ${Y(-11)}Z`, 'w') + ghP(`M${X(11)} ${Y(-7)}L${X(11)} ${Y(-17)}L${X(4)} ${Y(-11)}Z`, 'w') +
      ghBall(x, y, 15 * k, 'o') + ghE(x, y + 6 * k, 9 * k, 6.5 * k, 'w') + eyes() + ghE(x, y + 3.4 * k, 2 * k, 1.5 * k, 'k') + smile(6.6, 2.4) + cheeks(5);
  } else if (who == 'bunny') {
    s += ghE(x - 6 * k, y - 17 * k, 4.4 * k, 12 * k, 'w3', null, -8) + ghE(x - 6.4 * k, y - 17.4 * k, 3.8 * k, 11 * k, 'w', null, -8) +
      ghE(x - 6.2 * k, y - 16 * k, 1.8 * k, 7.5 * k, 'p', .85, -8) + ghE(x + 6 * k, y - 17 * k, 4.4 * k, 12 * k, 'w3', null, 8) +
      ghE(x + 5.6 * k, y - 17.4 * k, 3.8 * k, 11 * k, 'w', null, 8) + ghE(x + 5.8 * k, y - 16 * k, 1.8 * k, 7.5 * k, 'p', .85, 8) +
      ghC(x + 1 * k, y + 1 * k, 15 * k, 'w3') + ghBall(x, y, 14.4 * k, 'w') + eyes() + ghE(x, y + 3.2 * k, 1.8 * k, 1.3 * k, 'p2') +
      smile(6, 2.4) + cheeks(4.5);
  } else if (who == 'bear') {
    s += ghBall(x - 11 * k, y - 11 * k, 5.4 * k, 'n') + ghC(x - 11 * k, y - 11 * k, 2.6 * k, 'n2') + ghBall(x + 11 * k, y - 11 * k, 5.4 * k, 'n') +
      ghC(x + 11 * k, y - 11 * k, 2.6 * k, 'n2') + ghBall(x, y, 15 * k, 'n') + ghE(x, y + 5.5 * k, 7 * k, 5.4 * k, 't1') + eyes(-1) +
      ghE(x, y + 3.2 * k, 2.4 * k, 1.7 * k, 'k') + smile(6.4, 2.2) + cheeks(4);
  } else if (who == 'penguin') {
    s += ghC(x + 1 * k, y + 1 * k, 15 * k, 'k') + ghC(x - .6 * k, y - .6 * k, 13.6 * k, 'k2') + ghE(x - 4.6 * k, y + 1.5 * k, 6.4 * k, 9 * k, 'w') +
      ghE(x + 4.6 * k, y + 1.5 * k, 6.4 * k, 9 * k, 'w') + eyes(0, 5) + ghP(`M${X(-3)} ${Y(3.4)}L${X(3)} ${Y(3.4)}L${X(0)} ${Y(7.4)}Z`, 'o') +
      cheeks(5.5) + ghR(x - 12 * k, y + 12 * k, 24 * k, 5 * k, gh1(2.5 * k), 'r2') + ghR(x - 12 * k, y + 11.4 * k, 24 * k, 4.2 * k, gh1(2 * k), 'r');
  } else if (who == 'frog') {
    s += ghE(x + 1 * k, y + 2 * k, 17 * k, 13 * k, 'g2') + ghE(x - .5 * k, y + .8 * k, 16 * k, 12 * k, 'g') +
      ghBall(x - 7.5 * k, y - 10 * k, 6 * k, 'g') + ghBall(x + 7.5 * k, y - 10 * k, 6 * k, 'g') + ghC(x - 7.5 * k, y - 10 * k, 3.8 * k, 'w') +
      ghC(x + 7.5 * k, y - 10 * k, 3.8 * k, 'w') + ghC(x - 7 * k, y - 9.6 * k, 2 * k, 'k') + ghC(x + 8 * k, y - 9.6 * k, 2 * k, 'k') +
      ghL(`M${X(-7)} ${Y(3)}Q${X(0)} ${Y(9)} ${X(7)} ${Y(3)}`, 'k', gh1(1.4 * k)) + cheeks(3) + ghE(x - 4 * k, y - 3 * k, 4 * k, 2 * k, 'g1', .5, -20);
  } else {
    const visor = (d, c) => ghP(`M${X(-11 + d)} ${Y(-2 - d * .3)}Q${X(0)} ${Y(-8 - d * .4)} ${X(11 - d)} ${Y(-2 - d * .3)}` +
      `Q${X(12 - d)} ${Y(7 - d)} ${X(0)} ${Y(8 - d * 1.2)}Q${X(-12 + d)} ${Y(7 - d)} ${X(-11 + d)} ${Y(-2 - d * .3)}Z`, c);
    s += ghBall(x, y, 15 * k, h) + ghL(`M${X(0)} ${Y(-15)}V${Y(-8)}`, 'w', gh1(2.6 * k)) + visor(0, 'c2') + visor(1, 'c') +
      ghE(x - 5 * k, y - 2.4 * k, 3.2 * k, 1.6 * k, 'w', .8, -15);
  }
  return s;
}

// a drawing placed in a box: a nested <svg> with its own viewBox (pictures may not use scale transforms)
const rlNest = (x, y, w, h, vw, vh, inner) =>
  `<svg x="${gh1(x)}" y="${gh1(y)}" width="${gh1(w)}" height="${gh1(h)}" viewBox="0 0 ${vw} ${vh}">${inner}</svg>`;
// one path of many small rectangles (lit windows, checks): [x, y, w, h] each
const rlRects = (list, c, o) => ghP(list.map(([x, y, w, h]) => `M${gh1(x)} ${gh1(y)}h${gh1(w)}v${gh1(h)}h${gh1(-w)}Z`).join(''), c, o);
// a little flower: five petals round a yellow middle
const rlBloom = (x, y, r, c) => {
  let s = '';
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * .4 - Math.PI / 2;
    s += ghC(x + Math.cos(a) * r * .6, y + Math.sin(a) * r * .6, r * .5, c);
  }
  return s + ghC(x, y, r * .38, 'y') + ghC(x - r * .12, y - r * .12, r * .14, 'w', .8);
};
// a snowy pine: three tiers, the light (left) side lighter, a snow cap on each tier
function rlPine(x, y, s) {
  let d = ghShad(x + 2 * s, y, 20 * s, 3 * s) + ghR(x - 4 * s, y - 22 * s, 8 * s, 22 * s, gh1(2 * s), 'n2');
  for (let t = 0; t < 3; t++) {
    const top = y - (116 - t * 30) * s, hw = (17 + t * 8) * s, bot = top + 44 * s;
    d += ghP(ghPts([[x + 2 * s, top], [x + hw + 2 * s, bot + 1 * s], [x - hw + 2 * s, bot + 1 * s]]), 'g3') +
      ghP(ghPts([[x, top], [x + hw, bot], [x - hw, bot]]), 'g2') + ghP(ghPts([[x, top], [x, bot], [x - hw, bot]]), 'g') +
      ghP(`M${gh1(x)} ${gh1(top)}L${gh1(x + hw * .42)} ${gh1(top + 18 * s)}Q${gh1(x + hw * .2)} ${gh1(top + 14 * s)} ${gh1(x)} ${gh1(top + 19 * s)}` +
        `Q${gh1(x - hw * .2)} ${gh1(top + 14 * s)} ${gh1(x - hw * .42)} ${gh1(top + 18 * s)}Z`, 'w');
  }
  return d;
}
// a building with lit windows (city): x, ground y, width, height, hue, window hue
function rlTower(x, y, w, h, c, wc) {
  const win = [], off = [];
  for (let r = 0, yy = y - h + 14; yy < y - 20; r++, yy += 20) {
    for (let k = 0, xx = x + 10; xx < x + w - 14; k++, xx += 18) ((r * 7 + k * 3) % 5 == 1 ? off : win).push([xx, yy, 10, 12]);
  }
  return ghShad(x + w / 2 + 4, y, w / 2 + 4, 4) + ghR(x + 3, y - h + 3, w, h, 4, c + '3') + ghR(x, y - h, w, h, 4, c + '2') +
    ghR(x + 2, y - h + 2, 8, h - 4, 3, c, .7) + rlRects(win, wc) + rlRects(off, c + '3', .7) +
    ghL(`M${gh1(x + w * .7)} ${gh1(y - h)}V${gh1(y - h - 16)}`, 'e3', 2.4) + ghC(x + w * .7, y - h - 17, 3, 'r');
}
// roadside things: viewBox [w, h] with the ground at the bottom middle; wr = width on the road in road half-widths
const RL_PROPS = {
  tree: { vb: [80, 110], wr: 1.1, art: () => ghShad(42, 106, 30, 4.5, .15) + ghR(35.5, 64, 10, 42, 3, 'n2') + ghR(35, 64, 7.5, 42, 3, 'n') +
    ghBall(24, 56, 17, 'g') + ghBall(56, 54, 18, 'g') + ghBall(40, 34, 24, 'g') + ghBall(28, 44, 3.2, 'r') + ghBall(52, 38, 3.2, 'r') +
    ghBall(46, 58, 3.2, 'r') },
  bush: { vb: [90, 52], wr: .75, art: () => ghShad(46, 49, 40, 3.5, .14) + ghBall(24, 35, 15, 'g') + ghBall(66, 34, 16, 'g') +
    ghBall(45, 26, 19, 'g') + rlBloom(30, 22, 7, 'p') + rlBloom(58, 18, 7, 'w') + rlBloom(72, 32, 6, 'p') },
  flowers: { vb: [80, 46], wr: .5, art: () => ghShad(40, 44, 34, 2.6, .12) + ghL('M16 44V24M40 44V14M64 44V24', 'g2', 2.6) +
    ghE(28, 34, 8, 3.4, 'g', null, -30) + ghE(52, 32, 8, 3.4, 'g', null, 30) + rlBloom(16, 22, 11, 'r') + rlBloom(40, 13, 12, 'v') +
    rlBloom(64, 22, 11, 'o') },
  fence: { vb: [110, 52], wr: 1.1, art: () => {
    let s = ghShad(55, 50, 54, 3, .12);
    for (const x of [10, 55, 100]) s += ghP(`M${x - 5} 50V14L${x} 8L${x + 5} 14V50Z`, 'm2') + ghP(`M${x - 5} 50V14L${x} 8L${x + 3} 11V50Z`, 'm');
    return s + ghR(2, 19, 106, 7, 2, 'm2') + ghR(2, 18, 106, 5.4, 2, 'm') + ghR(2, 34, 106, 7, 2, 'm2') + ghR(2, 33, 106, 5.4, 2, 'm') +
      ghR(4, 18.6, 60, 1.4, .7, 'w', .8) + ghR(4, 33.6, 60, 1.4, .7, 'w', .8);
  } },
  palm: { vb: [110, 150], wr: 1.15, art: () => {
    let s = ghShad(52, 147, 24, 3.4, .15);
    for (let i = 0; i < 9; i++) s += ghE(48 + i * i * .14, 144 - i * 13, 7.4 - i * .3, 8, 'n2') + ghE(47 + i * i * .14, 143 - i * 13, 6.4 - i * .3, 6, 'n');
    const leaf = (ex, ey, cx, cy, c) => ghP(`M60 34Q${cx} ${cy - 12} ${ex} ${ey}Q${cx + 4} ${cy + 6} 60 38Z`, c);
    return s + leaf(4, 50, 28, 18, 'g2') + leaf(106, 52, 90, 18, 'g2') + leaf(18, 70, 34, 38, 'g2') + leaf(100, 74, 86, 40, 'g2') +
      leaf(8, 46, 30, 14, 'g') + leaf(102, 46, 86, 14, 'g') + leaf(46, 4, 52, 16, 'g') + leaf(80, 6, 72, 14, 'g') +
      ghBall(55, 42, 5, 'n') + ghBall(65, 43, 5, 'n') + ghBall(60, 47, 5, 'n');
  } },
  umbrella: { vb: [90, 100], wr: .9, art: () => {
    let st = '';
    for (let i = 0; i < 6; i += 2) st += ghPts([[45, 12], [6 + i * 13, 44], [19 + i * 13, 44]]);
    return ghShad(45, 97, 34, 4, .15) + ghL('M46 100V18', 'e3', 3.2) + ghL('M45 100V18', 'e1', 1.4, .8) +
      ghP('M4 46Q8 12 45 10Q82 12 86 46Z', 'r2') + ghP('M5 44Q9 13 45 11.4Q80 13 83 44Z', 'r') + ghP(st, 'w') +
      ghP('M4 44a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0Z', 'r2') +
      ghE(28, 22, 9, 3.6, 'w', .45, -25) + ghBall(45, 10, 3.4, 'y');
  } },
  rock: { vb: [70, 46], wr: .6, art: () => ghShad(36, 44, 32, 3, .14) + ghP('M6 44C4 30 16 14 32 12C50 10 66 24 64 44Z', 'e2') +
    ghP('M8 42C6 30 17 15.6 31 14C46 13 58 24 58 40Z', 'e') + ghE(24, 22, 8, 4, 'e1', .85, -20) + ghE(46, 34, 5, 2.4, 'e2', .6) },
  hut: { vb: [80, 96], wr: 1.0, art: () => ghShad(42, 93, 36, 3.6, .15) + ghR(12, 40, 58, 54, 3, 'b2') + ghR(10, 38, 56, 54, 3, 'b') +
    rlRects([[18, 38, 7, 54], [32, 38, 7, 54], [46, 38, 7, 54]], 'w', .85) + ghR(30, 60, 18, 34, 8, 'n2') + ghR(30, 60, 15, 34, 7, 'n') +
    ghC(42, 78, 1.6, 'y') + ghP('M2 42L40 8L80 42Z', 'r2') + ghP('M3 40L40 9.4L76 40Z', 'r') + ghP('M3 40L40 9.4L30 22Z', 'r1', .5) },
  pine: { vb: [80, 132], wr: .95, art: () => rlPine(40, 129, 1) },
  igloo: { vb: [100, 62], wr: 1.15, art: () => ghShad(50, 59, 48, 3.4, .14) + ghP('M4 60A46 46 0 0 1 96 60Z', 'w3') +
    ghP('M5 59A44 44 0 0 1 91 59Z', 'w2') + ghP('M5 59A43 43 0 0 1 84 46C70 34 40 26 12 44Z', 'w') +
    ghL('M10 46H90M18 34H82M32 24H68M30 46V34M52 46V34M72 46V34M44 34V24M58 34V24', 'w3', 1.4, .8) +
    ghP('M36 60V48A14 14 0 0 1 64 48V60Z', 'b2') + ghP('M40 60V49A10 10 0 0 1 60 49V60Z', 'k2') },
  snowman: { vb: [64, 104], wr: .6, art: () => ghShad(33, 101, 24, 3, .15) + ghC(33, 81, 20, 'w3') + ghBall(32, 80, 19, 'w') +
    ghC(33, 51, 15, 'w3') + ghBall(32, 50, 14, 'w') + ghC(33, 27, 12, 'w3') + ghBall(32, 26, 11, 'w') +
    ghR(19, 33, 27, 6, 3, 'r2') + ghR(19, 32.4, 26, 5, 2.5, 'r') + ghR(35, 34, 6, 15, 3, 'r') + ghC(32, 47, 1.9, 'k2') + ghC(32, 56, 1.9, 'k2') +
    ghC(28, 24, 1.7, 'k') + ghC(36, 24, 1.7, 'k') + ghP('M32 27L44 29.4L32 31Z', 'o') + ghE(26, 30, 2.2, 1.4, 'p', .6) + ghE(38, 30, 2.2, 1.4, 'p', .6) +
    ghR(23, 3, 18, 14, 2, 'k2') + ghR(18, 15, 28, 4, 2, 'k2') + ghR(23, 12, 18, 3, 0, 'r') },
  tower: { vb: [100, 220], wr: 1.2, art: () => rlTower(8, 218, 80, 190, 'v', 'y1') },
  tower2: { vb: [110, 170], wr: 1.3, art: () => rlTower(8, 168, 92, 140, 'b', 'o1') },
  lamp: { vb: [54, 150], wr: .45, art: () => ghC(34, 24, 21, 'y1', .3) + ghC(34, 24, 12, 'y1', .45) + ghShad(20, 148, 12, 2.4, .2) +
    ghL('M19 148V34Q19 20 32 20', 'e3', 4.4) + ghL('M18 146V34Q18 21 30 20', 'e1', 1.4, .7) + ghR(25, 15, 20, 8, 3, 'e2') +
    ghE(35, 24, 7, 3.4, 'y1') + ghR(12, 138, 14, 11, 3, 'e3') },
  cone: { vb: [44, 46], wr: .3, art: () => ghShad(22, 44, 20, 2.4, .18) + ghR(4, 39, 36, 6, 2, 'o2') + ghP('M13 40L22 5L31 40Z', 'o2') +
    ghP('M13 40L21.4 5.6L28 40Z', 'o') + ghP('M17.5 22H26.5L28.3 29H15.7Z', 'w') + ghP('M15 33H29L30 37H14Z', 'w', .9) },
  // the start and finish arch over the road, the boost gate (answers are written on the three boards), a sparkle to collect
  arch: { vb: [300, 132], wr: 2.6, art: () => {
    const sq = [[], []];
    for (let r = 0; r < 2; r++) for (let c = 0; c < 20; c++) sq[(r + c) % 2].push([18 + c * 13.2, 12 + r * 13, 13.2, 13]);
    return ghShad(14, 131, 10, 2, .2) + ghShad(288, 131, 10, 2, .2) + ghR(8, 18, 12, 114, 4, 'e3') + ghR(7, 18, 9, 114, 4, 'e1') +
      ghR(282, 18, 12, 114, 4, 'e3') + ghR(281, 18, 9, 114, 4, 'e1') + ghR(16, 10, 270, 32, 4, 'k') + rlRects(sq[0], 'w') +
      rlRects(sq[1], 'k2') + ghR(18, 12, 264, 3, 1.5, 'w', .5) + ghBall(13, 13, 10, 'r') + ghBall(289, 13, 10, 'b') +
      ghE(9, 9, 3, 2, 'w', .6, -30) + ghE(285, 9, 3, 2, 'w', .6, -30);
  } },
  gate: { vb: [300, 112], wr: 2.6, art: () => {
    let s = ghShad(14, 111, 10, 2, .2) + ghShad(288, 111, 10, 2, .2) + ghR(8, 8, 12, 104, 4, 'v3') + ghR(7, 8, 9, 104, 4, 'v1') +
      ghR(282, 8, 12, 104, 4, 'v3') + ghR(281, 8, 9, 104, 4, 'v1') + ghR(10, 4, 282, 16, 6, 'v2') + ghR(9, 3, 282, 13, 6, 'v');
    for (const x of [77, 150, 223]) {
      s += ghL(`M${x - 18} 18V26M${x + 18} 18V26`, 'e3', 2) + ghR(x - 32, 25, 66, 50, 9, 'v3') + ghR(x - 33, 24, 64, 47, 8, 'w');
    }
    for (const x of [44, 112, 188, 256]) s += `<path ${ghF('y2')} d="${rwStarD(x + .6, 11.6, 6, 2.6)}"/><path ${ghF('y')} d="${rwStarD(x, 11, 5.4, 2.4)}"/>`;
    return s;
  } },
  sparkle: { vb: [40, 40], wr: .3, art: () => ghC(20, 20, 17, 'y1', .35) + `<path ${ghF('y2')} d="${rwStarD(21, 21, 17, 5.6, 4)}"/>` +
    `<path ${ghF('y')} d="${rwStarD(20, 20, 15.6, 5, 4)}"/><path ${ghF('y1')} d="${rwStarD(17.6, 17.6, 6.4, 2.2, 4)}"/>` + ghC(15, 15, 1.6, 'w', .9) },
};
// G-02b: things on the road (hazards, pick-ups) in the same style; wr = width on the road in road half-widths
Object.assign(RL_PROPS, {
  duck: { vb: [66, 58], wr: .3, art: () => ghShad(32, 55, 22, 3, .16) + ghL('M25 50V56M36 50V56', 'o2', 2.6) + ghE(32, 40, 21, 13, 'y2') +
    ghE(30.6, 38.6, 20, 12, 'y') + ghE(25, 37, 10, 6, 'y2', .8, -12) + ghBall(47, 20, 11, 'y') + ghP('M56 18L66 22L56 26Z', 'o2') +
    ghP('M56 18L64.6 21.4L56 23.6Z', 'o') + ghC(49, 16.6, 1.9, 'k') + ghC(49.6, 16, .6, 'w') + ghE(43, 24, 2.4, 1.5, 'p', .6) },
  crab: { vb: [70, 46], wr: .34, art: () => ghShad(35, 43, 28, 3, .16) + ghL('M19 33L9 42M23 35L15 44M51 33L61 42M47 35L55 44', 'r2', 2.6) +
    ghE(35, 30, 20, 12, 'r2') + ghE(34, 29, 19, 11, 'r') + ghE(28, 25, 8, 3.4, 'r1', .7, -10) + ghBall(10, 18, 7, 'r') + ghBall(60, 18, 7, 'r') +
    ghP('M5 13L12 18L3 20Z', 'r2') + ghP('M65 13L58 18L67 20Z', 'r2') + ghL('M30 20V12M40 20V12', 'r2', 2) + ghC(30, 11, 3.4, 'w') +
    ghC(40, 11, 3.4, 'w') + ghC(30.6, 11, 1.7, 'k') + ghC(40.6, 11, 1.7, 'k') + ghL('M30 32Q35 35 40 32', 'k', 1.4) },
  chick: { vb: [52, 62], wr: .26, art: () => ghShad(26, 59, 17, 2.6, .16) + ghE(18, 58, 5, 2.4, 'o') + ghE(34, 58, 5, 2.4, 'o') +
    ghE(27, 39, 17, 19, 'e2') + ghE(26, 38, 16, 18, 'e') + ghE(26, 30, 11, 10, 'w') + ghE(21, 26, 4, 2.6, 'e1', .6, -30) +
    ghC(21.6, 28, 2, 'k') + ghC(30.4, 28, 2, 'k') + ghC(22.2, 27.4, .6, 'w') + ghC(31, 27.4, .6, 'w') + ghP('M23 33H29L26 37Z', 'k2') +
    ghE(11, 42, 4, 9, 'e2', null, 20) + ghE(41, 42, 4, 9, 'e2', null, -20) },
  hayroll: { vb: [64, 64], wr: .5, art: () => ghShad(32, 62, 24, 3, .16) + ghC(33, 33, 28, 't2') + ghC(31.6, 31.6, 26.6, 't') +
    ghL('M32 32m-4 0a4 4 0 1 1 8 0a9 9 0 1 1 -18 0a14 14 0 1 1 28 0a19 19 0 1 1 -38 0', 't3', 2.2, .7) + ghE(21, 19, 7, 4, 't1', .7, -35) },
  barrel: { vb: [60, 60], wr: .42, art: () => ghShad(30, 58, 22, 3, .16) + ghC(31, 31, 27, 'e3') + ghC(30, 30, 26, 'e2') + ghC(30, 30, 21, 'n2') +
    ghC(29, 29, 19.6, 'n') + ghL('M29 10V48M15 15L43 43M43 15L15 43', 'n2', 1.6, .6) + ghC(29, 29, 5, 'n2') + ghE(21, 20, 6, 3.4, 'n1', .7, -35) +
    ghE(18, 14, 4, 2, 'e1', .8, -40) },
  snowball: { vb: [60, 60], wr: .44, art: () => ghShad(30, 58, 22, 3, .16) + ghBall(30, 30, 26, 'w') + ghC(40, 40, 3, 'w3') + ghC(20, 42, 2.4, 'w3') +
    ghC(36, 18, 1.8, 'w3') },
  pstar: { vb: [48, 48], wr: .3, art: () => ghC(24, 24, 22, 'y1', .35) + `<path ${ghF('o')} d="${rwStarD(25, 25.4, 19, 8)}"/>` +
    `<path ${ghF('y')} d="${rwStarD(24, 24, 18, 7.6)}"/><path ${ghF('y1')} d="${rwStarD(21, 20, 7, 3)}"/>` + ghC(17, 16, 1.8, 'w', .9) },
  bubble: { vb: [48, 48], wr: .3, art: () => ghC(24, 24, 22, 'c1', .5) + ghC(25, 25, 17, 'c2', .25) + ghL('M24 3a21 21 0 1 1 -.1 0', 'c', 2.6) +
    ghE(15, 14, 6, 3.4, 'w', .85, -40) + ghC(31, 33, 2, 'w', .7) },
});
// a trophy cup (viewBox 0 0 100 100) in gold y, silver e or bronze o
const rlCupArt = h => ghShad(50, 95, 30, 4, .14) + ghR(30, 80, 40, 13, 3, 'n2') + ghR(29, 79, 40, 12, 3, 'n') + ghR(33, 82, 18, 2, 1, 'n1', .7) +
  ghR(42, 61, 16, 20, 2, h + '2') + ghR(41, 61, 14, 20, 2, h) + ghL('M25 21C8 21 10 45 32 47', h + '2', 6) + ghL('M75 21C92 21 90 45 68 47', h + '2', 6) +
  ghP('M21 13H79C79 44 67 63 50 63C33 63 21 44 21 13Z', h + '2') + ghP('M21 13H77C77 42 65 61 50 61C35 61 21 42 21 13Z', h) +
  ghE(33, 26, 5, 12, 'w', .45, -12) + `<path ${ghF('w', .8)} d="${rwStarD(50, 34, 10, 4.2)}"/>` + ghR(20, 10, 60, 6, 3, h + '2') + ghR(20, 9, 58, 5, 2.5, h + '1');

/* ---- the far and near layers behind each place (960 wide and periodic, so they wrap; the horizon is their bottom) ---- */
const rlWave = (base, waves, x) => waves.reduce((y, [a, k, p]) => y - a * Math.sin(Math.PI * 2 * k * x / 960 + p), base);
function rlRidge(base, waves, bottom, dx = 0, dy = 0) {
  let d = `M0 ${bottom}`;
  for (let x = 0; x <= 960; x += 16) d += `L${x} ${gh1(rlWave(base, waves, x - dx) + dy)}`;
  return d + `L960 ${bottom}Z`;
}
// a band along a ridge's crest (snow on mountain tops)
function rlCap(base, waves, t) {
  const pts = [];
  for (let x = 0; x <= 960; x += 16) pts.push([x, rlWave(base, waves, x)]);
  return ghPts(pts.concat(pts.slice().reverse().map(([x, y]) => [x, y + t])));
}
const rlStars = n => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const x = (i * 263 + 37) % 960, y = 12 + (i * 97) % 110, r = 1 + (i % 3) * .5;
    d += `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  }
  return ghP(d, 'w', .85);
};
// the sun (or the moon) stays put in the sky: it is far away, so it does not move with the layers (100 x 100)
const RL_SKY = {
  meadow: () => ghSun(50, 50, 24), beach: () => ghSun(50, 50, 26), snow: () => ghC(50, 50, 34, 'w', .3) + ghC(50, 50, 24, 'w', .85),
  city: () => ghC(50, 50, 30, 'y1', .22) + `<path ${ghF('m')} d="M46 26a24 24 0 1 0 22 34a19 19 0 0 1 -22 -34Z"/>`,
};
const RL_BACK = {
  meadow: {
    far: () => {
      const m = [[30, 2, .5], [16, 5, 1.2], [6, 9, 2]], h = [[10, 3, 1], [6, 7, .3]];
      return ghCloud(320, 60, 1.6) + ghCloud(640, 80, 1.2) + ghCloud(860, 50, 1.4) +
        ghP(rlRidge(150, m, 200, 0, 0), 'b1', .55) + ghP(rlRidge(150, m, 200, 8, 4), 'c1', .6) + ghP(rlRidge(178, h, 200), 'g1');
    },
    near: () => {
      const w = [[12, 3, .2], [7, 7, 1.7]];
      let s = ghP(rlRidge(92, w, 120, 0, 2), 'g2') + ghP(rlRidge(92, w, 120, -4, 0), 'g');
      for (const x of [70, 150, 172, 420, 690, 712, 880]) s += ghTree(x, rlWave(92, w, x + 4) + 4, 1.1);
      const bx = 280, by = rlWave(92, w, bx + 4) + 6;
      s += ghShad(bx + 18, by, 26, 3) + ghR(bx, by - 26, 36, 26, 1, 'r2') + ghR(bx, by - 26, 32, 26, 1, 'r') + ghP(`M${bx - 3} ${by - 24}L${bx + 18} ${by - 40}L${bx + 39} ${by - 24}Z`, 'r3') +
        ghR(bx + 12, by - 16, 12, 16, 1, 'm') + ghL(`M${bx + 12} ${by - 16}L${bx + 24} ${by}M${bx + 24} ${by - 16}L${bx + 12} ${by}`, 'r2', 1.4);
      const wx = 560, wy = rlWave(92, w, wx + 4) + 6;
      s += ghShad(wx + 2, wy, 14, 2.4) + ghP(`M${wx - 9} ${wy}L${wx - 5} ${wy - 40}H${wx + 5}L${wx + 9} ${wy}Z`, 'm2') +
        ghP(`M${wx - 9} ${wy}L${wx - 5} ${wy - 40}H${wx + 2}L${wx + 3} ${wy}Z`, 'm') +
        ghL(`M${wx - 22} ${wy - 62}L${wx + 22} ${wy - 18}M${wx + 22} ${wy - 62}L${wx - 22} ${wy - 18}`, 'w', 5) + ghBall(wx, wy - 40, 4, 'e');
      return s;
    },
  },
  beach: {
    far: () => {
      let s = ghCloud(380, 70, 1.4) + ghCloud(760, 54, 1.6) + ghR(0, 158, 960, 42, 0, 'c') + ghR(0, 158, 960, 7, 0, 'c1', .8);
      let wv = '';
      for (let i = 0; i < 24; i++) wv += `M${(i * 151) % 960} ${172 + (i * 37) % 24}h${18 + (i % 3) * 8}`;
      s += ghL(wv, 'w', 2, .6) + ghP('M600 160C620 140 680 136 720 160Z', 'g2') + ghP('M604 160C624 143 670 140 708 158Z', 'g1');
      return s + ghP('M240 152L270 152L264 160H246Z', 'r') + ghL('M256 152V122', 'n2', 1.6) + ghP('M257 124L274 148H257Z', 'w') +
        ghP('M255 126L242 148H255Z', 'w2');
    },
    near: () => {
      const w = [[5, 3, .4], [3, 8, 1.1]];
      let s = ghP(rlRidge(108, w, 120, 0, 2), 't2') + ghP(rlRidge(108, w, 120, -4, 0), 't');
      const lx = 730, ly = 112;
      s += ghShad(lx, ly, 18, 2.6) + ghP(`M${lx - 12} ${ly}L${lx - 7} ${ly - 70}H${lx + 7}L${lx + 12} ${ly}Z`, 'w2') +
        ghP(`M${lx - 12} ${ly}L${lx - 7} ${ly - 70}H${lx + 3}L${lx + 5} ${ly}Z`, 'w') +
        ghP(`M${lx - 10.2} ${ly - 24}L${lx - 9} ${ly - 38}H${lx + 9}L${lx + 10.2} ${ly - 24}Z`, 'r') +
        ghP(`M${lx - 8.2} ${ly - 52}L${lx - 7.6} ${ly - 62}H${lx + 7.6}L${lx + 8.2} ${ly - 52}Z`, 'r') +
        ghR(lx - 9, ly - 82, 18, 12, 2, 'y1') + ghP(`M${lx - 11} ${ly - 82}L${lx} ${ly - 94}L${lx + 11} ${ly - 82}Z`, 'r2');
      for (const x of [90, 330, 520, 880]) s += rlNest(x - 22, 46, 44, 60, 110, 150, RL_PROPS.palm.art());
      return s;
    },
  },
  snow: {
    far: () => {
      const m = [[40, 3, .2], [22, 6, 1.4], [10, 11, .5]], h = [[8, 4, 1], [5, 9, .3]];
      return ghCloud(260, 50, 1.4) + ghCloud(720, 70, 1.2) +
        ghP(rlRidge(140, m, 200, 6, 4), 'b2', .5) + ghP(rlRidge(140, m, 200), 'b1') + ghP(rlCap(140, m, 22), 'w') +
        ghP(rlRidge(182, h, 200), 'w2');
    },
    near: () => {
      const w = [[10, 3, 2.2], [6, 6, .7]];
      let s = ghP(rlRidge(96, w, 120, 0, 2), 'w3') + ghP(rlRidge(96, w, 120, -4, 0), 'w');
      for (const x of [60, 84, 300, 330, 620, 646, 850]) s += rlNest(x - 16, rlWave(96, w, x + 4) - 52, 32, 54, 80, 132, rlPine(40, 129, 1));
      return s;
    },
  },
  city: {
    far: () => {
      let s = rlStars(40);
      const win = [];
      let x = 0, i = 0;
      while (x < 960) {
        const w = 40 + (i * 37) % 36, h = 40 + (i * 53) % 70;
        s += ghR(x, 200 - h, w - 4, h, 2, i % 2 ? 'v3' : 'b3', .9);
        for (let yy = 200 - h + 8; yy < 194; yy += 12) for (let xx = x + 6; xx < x + w - 12; xx += 10) if ((xx * 3 + yy * 7) % 13 < 5) win.push([xx, yy, 4, 5]);
        x += w;
        i++;
      }
      return s + rlRects(win, 'y1', .75);
    },
    near: () => {
      let s = '', x = 0, i = 0;
      const win = [];
      while (x < 960) {
        const w = 60 + (i * 41) % 40, h = 30 + (i * 29) % 50;
        if (i % 3 != 2) {
          s += ghR(x, 120 - h, w - 8, h, 3, 'k2') + ghR(x, 120 - h, 6, h, 2, 'v3', .8);
          for (let yy = 120 - h + 8; yy < 114; yy += 13) for (let xx = x + 10; xx < x + w - 16; xx += 12) if ((xx * 5 + yy * 3) % 11 < 6) win.push([xx, yy, 6, 7]);
        }
        x += w;
        i++;
      }
      return s + rlRects(win, 'y', .9) + ghR(0, 112, 960, 8, 0, 'k2');
    },
  },
};

/* ---- pictures for the hub card, the places and the podium (240 x 100, the --a-* roles) ---- */
// a road running into the distance (vanishing point vx, vy) with rumble edges and a centre line
function rlRoadPic(vx, vy, rc, road = 'e2') {
  const L = [[vx - 3, vy], [40, 100]], R = [[vx + 3, vy], [236, 100]];
  let s = ghP(`M${vx - 3} ${vy}L${vx + 3} ${vy}L250 100H26Z`, road) + ghP(`M${vx - 3} ${vy}L${vx - 2} ${vy}L50 100H26Z`, rc) +
    ghP(`M${vx + 2} ${vy}L${vx + 3} ${vy}L250 100H226Z`, rc);
  let d = '', dw = '';
  for (let i = 0; i < 6; i++) {
    const t0 = Math.pow(i / 6, 1.8), t1 = Math.pow((i + .45) / 6, 1.8), y0 = vy + (100 - vy) * t0, y1 = vy + (100 - vy) * t1;
    const lx = t => L[0][0] + (L[1][0] - L[0][0]) * t, rx = t => R[0][0] + (R[1][0] - R[0][0]) * t;
    d += `M${gh1(lx(t0))} ${gh1(y0)}L${gh1(lx(t1))} ${gh1(y1)}M${gh1(rx(t0))} ${gh1(y0)}L${gh1(rx(t1))} ${gh1(y1)}`;
    dw += `M${gh1(vx + (138 - vx) * t0)} ${gh1(y0)}L${gh1(vx + (138 - vx) * t1)} ${gh1(y1)}`;
  }
  return s + ghL(d, 'w', 2.6, .9) + ghL(dw, 'w', 2.4, .85);
}
const RL_ART = {
  // the hub card: a red kart from behind racing a fox to the finish arch, sparkles on the road
  hub() {
    return ghSun(26, 20, 9) + ghCloud(86, 14, .7) + ghCloud(206, 20, .6) +
      ghP('M0 52Q40 38 84 48T160 44T240 50V100H0Z', 'g1') + ghR(0, 50, 240, 50, 0, 'g') + ghP('M0 60Q60 54 120 56T240 58V100H0Z', 'g', .6) +
      rlRoadPic(146, 50, 'r') + rlNest(126, 26, 40, 24, 300, 132, RL_PROPS.arch.art()) +
      ghTree(30, 64, .8) + ghTree(210, 58, .7) + rlNest(148, 58, 16, 16, 40, 40, RL_PROPS.sparkle.art()) +
      rlNest(168, 50, 32, 22, 120, 84, rlCarArt('kart', 'b', '', 'fox', true)) +
      rlNest(66, 50, 84, 59, 120, 84, rlCarArt('kart', 'r', 'star', 'you', true)) + ghL('M50 96h-16M56 88h-22M48 80h-10', 'w', 2.4, .7);
  },
  // a place: its ground and road, two of its things by the road
  place(id) {
    const pl = RL_PLACES.find(p => p.id === id) || RL_PLACES[0], [g] = pl.grass;
    const P = RL_PROPS, a = { meadow: ['tree', 'bush'], beach: ['palm', 'umbrella'], snow: ['pine', 'snowman'], city: ['tower', 'lamp'] }[pl.id];
    const pa = P[a[0]], pb = P[a[1]], aw = Math.min(48, 70 * pa.vb[0] / pa.vb[1]), bw = Math.min(50, 54 * pb.vb[0] / pb.vb[1]);
    const far = { meadow: ghSun(30, 18, 8) + ghP('M0 50Q50 30 110 44T240 40V100H0Z', 'b1', .6),
      beach: ghSun(30, 18, 8) + ghR(0, 40, 240, 12, 0, 'c') + ghR(0, 40, 240, 3, 0, 'c1'),
      snow: ghP('M0 50L30 26L52 40L84 14L120 42L150 22L186 44L214 24L240 38V100H0Z', 'b1') + ghP('M72 24L84 14L96 26L88 23L84 27Z', 'w') +
        ghP('M140 30L150 22L160 30L154 28L150 31Z', 'w'),
      city: rlStars(8) + ghR(0, 26, 30, 30, 2, 'v3') + ghR(34, 16, 26, 40, 2, 'b3') + ghR(180, 20, 30, 36, 2, 'v3') + ghR(214, 30, 26, 26, 2, 'b3') }[pl.id];
    return far + ghR(0, 50, 240, 50, 0, g) + rlRoadPic(120, 50, pl.rumble[0], pl.road[0]) +
      rlNest(4, 92 - aw * pa.vb[1] / pa.vb[0], aw, aw * pa.vb[1] / pa.vb[0], pa.vb[0], pa.vb[1], pa.art()) +
      rlNest(206 - bw / 2, 96 - bw * pb.vb[1] / pb.vb[0], bw, bw * pb.vb[1] / pb.vb[0], pb.vb[0], pb.vb[1], pb.art()) +
      rlNest(150, 54, 22, 22, 40, 40, P.sparkle.art()) + ghShad(120, 99, 60, 2, .1);
  },
  // the podium: the first three, each a face on a step (who: the ids in order, 'you' for the player)
  podium(who, h, r = {}) {
    const step = (x, y, w, c) => ghR(x + 2, y + 2, w, 100 - y, 4, c + '2') + ghR(x, y, w, 100 - y, 4, c) + ghR(x + 3, y + 3, w * .5, 3, 1.5, c + '1', .8);
    let s = ghShad(120, 99, 96, 3, .12) + step(84, 50, 72, 'y') + step(14, 64, 68, 'e') + step(158, 72, 68, 'o');
    s += `<path ${ghF('y2')} d="${rwStarD(120.8, 66.6, 9, 4)}"/><path ${ghF('y')} d="${rwStarD(120, 66, 8, 3.6)}"/>`;
    const at = [[120, 30], [48, 44], [192, 52]];
    who.slice(0, 3).forEach((w, i) => {
      const [x, y] = at[i], k = i ? 1 : 1.15;
      s += w == 'you' ? rlNest(x - 26 * k, y - 22 * k, 52 * k, 36.4 * k, 120, 84, rlCarArt(r.body || 'kart', h, r.stk || '', 'you')) : rlFace(w, x, y, k, h);
    });
    for (const [x, y, c, a] of [[30, 14, 'r', 20], [70, 8, 'b', -30], [168, 12, 'g', 40], [212, 22, 'p', -15], [100, 6, 'y', 10], [146, 20, 'v', -40]]) {
      s += ghR(x, y, 7, 3.4, 1, c, null) .replace('/>', ` transform="rotate(${a} ${x} ${y})"/>`);
    }
    return s;
  },
};

/* ---- tracks: built once from their plan (curves, hills and widths eased in and out), with what stands by and on the road ----
   T.cv curve, T.hy height, T.rw road half-width (1 = normal), T.fl bits (1 tunnel, 2 bridge, 4 rails or walls), T.dv the split's
   divider; T.sf surface patches per segment [x0, x1, kind]; T.ob things that stand (cones), T.mv things that roll or walk across,
   T.pk pick-ups, T.sp sparkles, T.pads boost pads; *At: the same by segment. */
// a small seeded random number generator (the same seed gives the same race)
function rlRng(seed) {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rlHash = s => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
const rlMod = (i, n) => ((i % n) + n) % n;
const rlIO = t => .5 - Math.cos(Math.PI * Math.max(0, Math.min(1, t))) / 2;
const RL_BUILT = {};
const rlAt = (n, list) => {
  const a = new Array(n).fill(null);
  list.forEach((o, i) => { const s = rlMod(o.s, n); (a[s] = a[s] || []).push(i); });
  return a;
};
function rlTrack(id) {
  if (RL_BUILT[id]) return RL_BUILT[id];
  const t = RL_TRK[id], pl = rlPl(t.place), cv = [], hy = [], wd = [], fl = [], secs = [];
  let y = 0;
  const sec = (a, h, l, c, dy, f = '') => {
    const n = a + h + l, y0 = y, y1 = y + dy * RL_SEG, s0 = cv.length;
    const w = f.includes('F') ? 1.25 : f.includes('W') ? 1.3 : f.includes('N') ? .78 : f.includes('B') ? .88 : 1;
    const bits = (f.includes('T') ? 1 : 0) | (f.includes('B') ? 2 : 0) | (/[RTB]/.test(f) ? 4 : 0);
    for (let i = 0; i < n; i++) {
      cv.push(i < a ? c * (i / a) * (i / a) : i < a + h ? c : c * (1 - rlIO((i - a - h) / l)));
      hy.push(y0 + (y1 - y0) * rlIO(i / n));
      wd.push(w);
      fl.push(bits);
    }
    y = y1;
    secs.push([s0, a, h, l, f]);
  };
  sec(0, 40, 0, 0, 0); // the start straight (the start line is at RL_START)
  for (const s of t.plan) sec(...s);
  sec(0, 10, 50, 0, -y / RL_SEG); // back to the start height on the finishing straight
  const n = cv.length, L = n * RL_SEG, r = rlRng(rlHash(id));
  // widths change smoothly (over 13 segments)
  const rw = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = -6; j <= 6; j++) s += wd[rlMod(i + j, n)];
    rw[i] = s / 13;
  }
  const dv = new Uint8Array(n), sfAt = new Array(n).fill(null), ob = [], mv = [], pk = [], sp = [], pads = [], forks = [];
  const patch = (s0, len, x0, x1, k) => { for (let j = 0; j < len; j++) (sfAt[rlMod(s0 + j, n)] = sfAt[rlMod(s0 + j, n)] || []).push([x0, x1, k]); };
  const pick = a => a[Math.floor(r() * a.length)];
  for (const [s0, a, h, l, f] of secs) {
    if (!f) continue;
    const hs = h >= 8 ? s0 + a : s0, hl = h >= 8 ? h : a + h + l, at = q => hs + Math.floor(hl * q);
    for (const ch of f) {
      if (ch == 'p') for (let k = 0; k < 3; k++) { const x = (k % 2 ? 1 : -1) * (r() < .5 ? .35 : .45) * (r() < .5 ? 1 : -1); patch(at((k + 1) / 4), 5, x - .26, x + .26, 'p'); }
      else if (ch == 'i') { const sd = r() < .5 ? -1 : 1; patch(at(.2), 12, sd < 0 ? -1.4 : -.05, sd < 0 ? .05 : 1.4, 'i'); patch(at(.62), 10, sd < 0 ? -.05 : -1.4, sd < 0 ? 1.4 : .05, 'i'); }
      else if (ch == 's') for (const q of [.15, .6]) { const sd = r() < .5 ? -1 : 1; patch(at(q), 14, sd < 0 ? -1.6 : .42, sd < 0 ? -.42 : 1.6, 's'); }
      else if (ch == 'c' || (ch == 'a' && !pl.crit)) {
        const xs = pick([[-.5, .45, 0], [.5, -.45, 0], [0, -.55, .55]]);
        xs.forEach((x, k) => ob.push({ s: at(.3) + k * 7, x, w: .12, k: 'cone' }));
      } else if (ch == 'b') mv.push({ s: at(r() < .5 ? .4 : .6), k: pl.roll, a: 1.35, sp: .38 + r() * .14, ph: r() * 4, w: .17 });
      else if (ch == 'a') mv.push({ s: at(.45), k: pl.crit, a: 1.4, sp: .24 + r() * .06, ph: r() * 4, w: .13 });
      else if (ch == 'z') pads.push([at(.5) - 3, pick([-.45, .45])]);
      else if (ch == '*' || ch == 'o') pk.push({ s: at(ch == '*' ? .62 : .72), x: pick([-.45, 0, .45]), k: ch == '*' ? 'star' : 'shield' });
      else if (ch == 'g' || ch == 'G') for (const q of ch == 'g' ? [.18] : [.12, .6]) { const x = pick([-.5, 0, .5]); for (let j = 0; j < 5; j++) sp.push([at(q) + j * 3, x]); }
      else if (ch == 'F') {
        const sd = r() < .5 ? -1 : 1, a0 = hs + 6, a1 = hs + hl - 4;
        for (let i = a0; i < a1; i++) dv[rlMod(i, n)] = 1;
        forks.push([a0, a1, sd]);
        pads.push([a0 + Math.floor((a1 - a0) * .22), sd * .62], [a0 + Math.floor((a1 - a0) * .62), sd * .62]);
        ob.push({ s: a0 + Math.floor((a1 - a0) * .42), x: sd * .45, w: .12, k: 'cone' }, { s: a0 + Math.floor((a1 - a0) * .82), x: sd * .85, w: .12, k: 'cone' });
      }
    }
  }
  // roadside things: a weighted pick per side every few segments, never on the start line, in tunnels or over water
  const kinds = pl.props.map(p => p[0]), wsum = pl.props.reduce((a, p) => a + p[1], 0);
  const pickK = () => {
    let v = r() * wsum;
    for (const [k, w] of pl.props) if ((v -= w) < 0) return k;
    return kinds[0];
  };
  const pr = new Array(n).fill(null);
  const put = (i, k, x) => (pr[i] = pr[i] || []).push(k, x);
  for (let i = 0; i < n; i++) {
    if ((i >= RL_START - 2 && i <= RL_START + 2) || fl[i] & 3) continue;
    for (const side of [-1, 1]) {
      if (r() < (pl.id == 'city' ? .09 : .14)) {
        const k = pickK(), P = RL_PROPS[k];
        put(i, k, side * (rw[i] + .3 + P.wr / 2 + (k.startsWith('tower') ? .5 + r() * 2.5 : r() * 1.6)));
      }
    }
    if (pl.id == 'city' && i % 14 == 0) put(i, 'lamp', (i % 28 ? 1 : -1) * (rw[i] + .55));
  }
  put(RL_START, 'arch', 0);
  // the boost gate (used when boost gates are on): on a straight without a split, over half way round
  const plain = i => { for (let j = -6; j < 14; j++) { const k = rlMod(i + j, n); if (cv[k] !== 0 || dv[k] || fl[k] & 1) return false; } return true; };
  let gate = Math.floor(n * .55);
  while (!plain(gate) && gate < n - 70) gate++;
  if (!plain(gate)) for (gate = 60; gate < n && !plain(gate); gate++);
  const spAt = new Array(n).fill(null), padAt = new Array(n).fill(null);
  sp.forEach(([s], i) => (spAt[rlMod(s, n)] = spAt[rlMod(s, n)] || []).push(i));
  pads.forEach(([s, x]) => { for (let j = 0; j < 6; j++) padAt[rlMod(s + j, n)] = x; });
  return (RL_BUILT[id] = { id, pl, n, L, cv: Float32Array.from(cv), hy: Float32Array.from(hy), rw, fl: Uint8Array.from(fl), dv, sfAt, pr, sp, pads,
    spAt, padAt, gate, ob, obAt: rlAt(n, ob), mv, mvAt: rlAt(n, mv), pk, pkAt: rlAt(n, pk), forks });
}
// the surface under x on a segment: '' road, 'p' puddle, 's' sand, 'i' ice
function rlSurf(T, seg, x) {
  const a = T.sfAt[seg];
  if (a) for (const [x0, x1, k] of a) if (x >= x0 && x <= x1) return k;
  return '';
}
// where something rolling or walking across is at race time t: from side to side and back
const rlMvX = (m, t) => {
  const u = rlMod(t * m.sp / (2 * m.a) + m.ph, 2);
  return m.a * (u < 1 ? 2 * u - 1 : 3 - 2 * u);
};
// shape numbers of a track (tests, docs): length, mean and largest bend, share of straight and of tight road, bend direction
// changes, the hill range, tunnels, bridges, splits and hazards
function rlShape(id) {
  const T = rlTrack(id), n = T.n;
  let abs = 0, mx = 0, str = 0, tight = 0, flips = 0, last = 0, hmax = 0, hmin = 0, tun = 0, bri = 0, nar = 0;
  for (let i = 0; i < n; i++) {
    const c = T.cv[i], s = Math.abs(c) > .5 ? Math.sign(c) : 0;
    abs += Math.abs(c);
    mx = Math.max(mx, Math.abs(c));
    if (Math.abs(c) < .05) str++;
    if (Math.abs(c) >= 4) tight++;
    if (s && last && s != last) flips++;
    if (s) last = s;
    hmax = Math.max(hmax, T.hy[i]);
    hmin = Math.min(hmin, T.hy[i]);
    if (T.fl[i] & 1) tun++;
    if (T.fl[i] & 2) bri++;
    if (T.rw[i] < .9) nar++;
  }
  const sf = { p: 0, s: 0, i: 0 };
  for (const a of T.sfAt) if (a) for (const q of a) sf[q[2]]++;
  return { n, laps: RL_TRK[id].laps, mean: abs / n, max: mx, straight: str / n, tight: tight / n, flips, hill: (hmax - hmin) / RL_SEG,
    tunnel: tun, bridge: bri, narrow: nar, forks: T.forks.length, cones: T.ob.length, movers: T.mv.length, puddle: sf.p, sand: sf.s, ice: sf.i };
}

/* ---- boost gate questions (only when the grown-up or child turns them on): a sum or a times fact by grade, three answers ---- */
function rlQuiz(grade, rnd) {
  const g = grade == null ? 1 : +grade, R = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  let q, a;
  if (g <= 0) {
    const x = R(0, 3), y = R(1, 2);
    q = x + ' + ' + y; a = x + y;
  } else if (g == 1) {
    const x = R(1, 6), y = R(1, 4);
    q = x + ' + ' + y; a = x + y;
  } else if (g == 2) {
    if (rnd() < .5) { const x = R(4, 12), y = R(2, 8); q = x + ' + ' + y; a = x + y; }
    else { const x = R(8, 18), y = R(2, 7); q = x + ' − ' + y; a = x - y; }
  } else {
    const x = R(2, g >= 5 ? 12 : 10), y = R(2, g >= 5 ? 12 : 9);
    q = x + ' × ' + y; a = x * y;
  }
  const opts = [a];
  for (const d of [1, -1, 2, -2, 10, 3]) if (opts.length < 3 && a + d >= 0 && !opts.includes(a + d) && rnd() < .7) opts.push(a + d);
  for (let d = 1; opts.length < 3; d++) if (!opts.includes(a + d)) opts.push(a + d);
  for (let i = 2; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  return { q, a, opts };
}

/* ---- the race: rlNew makes it, rlStep moves it on by one fixed step. No drawing, no DOM: the tests run whole races ----
   st.ev collects what happened (sounds and messages for the screen): ['go'], ['spark', n], ['pad'], ['zoom'], ['drift'],
   ['lap', n], ['pass', rival], ['bump'], ['wall'], ['crash', why], ['pop'], ['dizzy', rival], ['get', 'star' | 'shield'],
   ['surf', kind], ['gate', right, answer], ['best', ms] (a new best lap in a time trial), ['finish']. */
// rivals: base speeds (share of RL_VMAX, shuffled each race) and the catch-up: ka eases a rival that is ahead (per second of
// lead), kb hurries one that is behind, lo and hi are the limits; miss: the chance a rival does not steer round a hazard;
// tier: how much faster per cup. Tuned with test bots (tools/test.js "Star Rally 2 G-02b").
const RL_CU = {
  easy: { base: [.73, .75, .77, .79, .82], ka: .2, kb: .07, lo: .56, hi: 1.12, miss: .4, tier: .015 },
  pro: { base: [.9, .92, .94, .96, .98], ka: .06, kb: .03, lo: .9, hi: 1.05, miss: .2, tier: .02 },
};
// o: {seed, mode, quiz, grade, tier (0-3; default the track's cup), wx (weather; default by seed), up (upgrades), trial (no
// rivals, laps timed), ghost ({ms, g} of the best lap to race against)}
function rlNew(tid, o = {}) {
  const T = rlTrack(tid), t = RL_TRK[tid], rnd = rlRng(o.seed || 1), mode = o.mode == 'pro' ? 'pro' : 'easy', pl = T.pl;
  const lane = k => (k % 2 ? .45 : -.45), row = k => (RL_START - 3 - Math.floor(k / 2) * 3.2) * RL_SEG;
  const CU = RL_CU[mode], tier = o.tier != null ? rlNum(o.tier, 0, 3) : t.cup || 0, base = CU.base.map(b => b * (1 + tier * CU.tier));
  for (let i = base.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
  const wx = RL_WX[o.wx] ? o.wx : rnd() < .4 && pl.wx.length > 1 ? pl.wx[1 + Math.floor(rnd() * (pl.wx.length - 1))] : pl.wx[0];
  const slots = [0, 1, 2, 3, 5];
  const cars = o.trial ? [] : RL_RIVALS.map((rv, i) => ({ rv, d: row(slots[i]), x: lane(slots[i]), lx: lane(slots[i]) * .9, tx: lane(slots[i]), v: 0,
    base: base[i], wob: 0, wobT: rnd() * 3, fin: 0, e: (rnd() - .5) * .05, spin: 0, dizzy: 0, miss: {}, fs: 0, hits: 0 }));
  const up = {};
  for (const [k] of RL_UPG) up[k] = rlNum((o.up || {})[k], 0, 3);
  const st = { tid, T, laps: t.laps, mode, quiz: !!o.quiz && !o.trial, grade: o.grade, rnd, cd: 3, rt: 0, done: false, ev: [], cars, tier, wx, W: RL_WX[wx], up,
    trial: !!o.trial, fin: RL_START * RL_SEG + t.laps * T.L, taken: new Int16Array(T.sp.length), pkT: new Int16Array(T.pk.length),
    kn: new Float32Array(T.ob.length).fill(-9), knL: new Int16Array(T.ob.length), knS: new Int8Array(T.ob.length), padKey: -1, seen: {},
    P: { d: row(o.trial ? 1 : 4), x: o.trial ? 0 : lane(4), v: 0, s: 0, vx: 0, dh: 0, dsp: 0, drifting: false, boost: 0, bumpT: 0, spin: 0, spinD: 0,
      dizzy: 0, shield: 0, hits: 0, lap: 1, place: o.trial ? 1 : 6, spk: 0, time: 0, off: false, surf: '', lap0: 0, laps: [] } };
  if (st.trial) {
    st.rec = { cur: '', n: 0, d0: 0, best: null };
    st.gh = rlGhostIn(o.ghost);
  }
  if (st.quiz) st.q = rlQuiz(st.grade, rnd);
  return st;
}
const rlLap = (st, d) => Math.max(1, Math.floor((d - RL_START * RL_SEG) / st.T.L) + 1);
const rlPlace = st => 1 + st.cars.filter(c => c.d > st.P.d).length;
// crossed the point z of the lap going from d0 to d1?
const rlCross = (L, d0, d1, z) => {
  const k = Math.ceil((d0 - z) / L);
  return z + k * L > d0 && z + k * L <= d1 ? z + k * L : -1;
};
// the ghost: a lap as two letters every 0.1 s (distance moved in steps of 20 units, carried exactly; x in 64 steps)
const RL_G64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const RL_GQ = 20;
function rlGhostIn(g) {
  if (!g || typeof g.g != 'string' || !g.g.length) return null;
  const d = [0], x = [];
  for (let i = 0; i < g.g.length; i += 2) {
    const a = RL_G64.indexOf(g.g[i]), b = RL_G64.indexOf(g.g[i + 1]);
    if (a < 0 || b < 0) return null;
    d.push(d[d.length - 1] + a * RL_GQ);
    x.push(b / 63 * 3.2 - 1.6);
  }
  x.push(x[x.length - 1] || 0);
  return { ms: g.ms, d, x };
}
// where the ghost is, tau seconds into a lap: {d (from the lap's start), x} or null after its lap
function rlGhostAt(gh, tau) {
  if (!gh || tau < 0) return null;
  const f = tau * 10, i = Math.floor(f);
  if (i + 1 >= gh.d.length) return null;
  const u = f - i;
  return { d: gh.d[i] + (gh.d[i + 1] - gh.d[i]) * u, x: gh.x[i] + (gh.x[i + 1] - gh.x[i]) * u };
}
// a spin (crash) or, with the shield up, a pop. why: 'wall', 'cone', 'roll', 'crit', 'bonk'; sev 0-1 (Pro: harder = longer)
function rlCrash(st, car, why, sev = 0) {
  const me = car === st.P, easy = st.mode == 'easy';
  if (car.spin > 0) return;
  if (me && car.shield > 0) {
    car.shield = 0;
    car.v *= .88;
    st.ev.push(['pop']);
    return;
  }
  const bonk = why == 'bonk';
  let dur = easy ? (bonk ? .5 : .75) : (bonk ? .65 : .95 + .6 * Math.min(1, sev));
  if (me) dur *= 1 - .15 * st.up.bumper;
  car.spin = car.spinD = dur;
  car.v *= easy ? .6 : bonk ? .55 : .42;
  car.hits = (car.hits || 0) + 1;
  if (me) {
    car.boost = 0;
    car.drifting = false;
    car.dh = car.dsp = 0;
    car.vx *= .2;
    st.ev.push(['crash', why]);
  } else st.ev.push(['dizzy', car.rv, why]);
}
// hit a rail, wall or the split's divider: a bounce, or a spin when it was hard (sideways speed into it)
function rlWall(st, car, side, at, vin) {
  const easy = st.mode == 'easy', sp = car.v / RL_VMAX;
  car.x = at;
  const hard = vin > (easy ? 1.2 : 1.0) && sp > .45;
  if (car === st.P) {
    car.vx = -side * Math.min(.7, .3 + vin * .25);
    if (hard) rlCrash(st, car, 'wall', (vin - 1) / 1.2);
    else {
      car.v *= 1 - Math.min(.12, vin * .06);
      if (car.bumpT <= 0) {
        car.bumpT = .5;
        st.ev.push(['wall']);
      }
    }
  } else if (hard) rlCrash(st, car, 'wall', 0);
}
// did a car at x hit a cone, a rolling thing or an animal while moving from d0 to d1? (the Easy hit box is a little smaller)
function rlHits(st, car, d0, d1) {
  const T = st.T, L = T.L, k = st.mode == 'easy' ? .78 : 1, me = car === st.P;
  const s0 = Math.floor(d0 / RL_SEG), s1 = Math.floor(d1 / RL_SEG);
  for (let s = s0; s <= s1; s++) {
    const seg = rlMod(s, T.n), oa = T.obAt[seg], ma = T.mvAt[seg];
    if (oa) for (const i of oa) {
      const o = T.ob[i], z = (Math.floor(s / T.n) * T.n + seg) * RL_SEG + RL_SEG / 2;
      if (z <= d0 || z > d1) continue;
      const lap = Math.floor(z / L) + 1;
      if (st.knL[i] == lap) continue;
      if (Math.abs(car.x - o.x) < (RL_CARW * .5 + o.w) * k) {
        st.knL[i] = lap;
        st.kn[i] = st.rt;
        st.knS[i] = car.x < o.x ? 1 : -1;
        rlCrash(st, car, 'cone', .3);
      }
    }
    if (ma) for (const i of ma) {
      const m = T.mv[i], z = (Math.floor(s / T.n) * T.n + seg) * RL_SEG + RL_SEG / 2;
      if (z <= d0 || z > d1) continue;
      if (Math.abs(car.x - rlMvX(m, st.rt)) < (RL_CARW * .5 + m.w) * k) rlCrash(st, car, m.k == 'duck' || m.k == 'crab' || m.k == 'chick' ? 'crit' : 'roll', .6);
    }
    if (me && T.pkAt[seg]) for (const i of T.pkAt[seg]) {
      const p = T.pk[i], z = (Math.floor(s / T.n) * T.n + seg) * RL_SEG + RL_SEG / 2;
      if (z <= d0 || z > d1) continue;
      const lap = Math.floor(z / L) + 1;
      if (st.pkT[i] == lap || Math.abs(car.x - p.x) > .3) continue;
      st.pkT[i] = lap;
      if (p.k == 'star') car.boost = Math.max(car.boost, 1.6 * (1 + .15 * st.up.turbo));
      else car.shield = 14;
      st.ev.push(['get', p.k]);
    }
  }
}
// a rival looks ahead for hazards in its lane and moves over (unless it misses this one: the same small chance for all)
function rlLook(st, c) {
  const T = st.T, n = T.n, s0 = Math.floor(c.d / RL_SEG), CU = RL_CU[st.mode];
  for (let j = 2; j < 15; j++) {
    const seg = rlMod(s0 + j, n), xs = [];
    if (T.obAt[seg]) for (const i of T.obAt[seg]) if (st.knL[i] != Math.floor((s0 + j) * RL_SEG / T.L) + 1) xs.push([T.ob[i].x, 'o' + i]);
    if (T.mvAt[seg]) for (const i of T.mvAt[seg]) xs.push([rlMvX(T.mv[i], st.rt + j * RL_SEG / Math.max(2000, c.v)), 'm' + i]);
    if (T.sfAt[seg]) for (const [x0, x1, k] of T.sfAt[seg]) if (x1 - x0 < 1.2) xs.push([(x0 + x1) / 2, 's' + seg + k]);
    for (const [x, key] of xs) {
      if (Math.abs(x - c.tx) > .34) continue;
      if (c.miss[key] == null) c.miss[key] = st.rnd() < CU.miss;
      if (c.miss[key]) continue;
      const w = Math.max(.6, T.rw[seg]), alt = [-.5, 0, .5].map(v => v * w).filter(v => Math.abs(v - x) > .38);
      if (alt.length) c.tx = alt.reduce((b, v) => (Math.abs(v - c.x) < Math.abs(b - c.x) ? v : b));
      return;
    }
  }
}
function rlStep(st, inp = {}) {
  const dt = RL_DT, P = st.P, T = st.T, L = T.L, easy = st.mode == 'easy', U = st.up, n = T.n;
  if (st.done) return;
  if (st.cd > 0) {
    st.cd -= dt;
    if (st.cd <= 0) st.ev.push(['go']);
    return;
  }
  st.rt += dt;
  const seg = rlMod(Math.floor(P.d / RL_SEG), n), cur = T.cv[seg], sp = P.v / RL_VMAX, rw = T.rw[seg];
  let steer = Math.max(-1, Math.min(1, +inp.steer || 0));
  if (P.spin > 0) steer = 0;
  // the surface: puddles slip and slow, sand slows, ice slides; rain or snow makes it a little worse; grippy tyres help
  const sf = rlSurf(T, seg, P.x);
  let grip = 1, cap = 9;
  if (sf == 'p') { grip = st.W.fall == 'rain' ? .22 : .35; cap = easy ? .68 : .72; }
  else if (sf == 's') { grip = .7; cap = easy ? .55 : .5; }
  else if (sf == 'i') grip = .1;
  grip *= st.W.grip || 1;
  grip += (1 - grip) * .2 * U.grip;
  if (sf && sf != P.surf && !st.seen[sf]) { st.seen[sf] = 1; st.ev.push(['surf', sf]); }
  P.surf = sf;
  // speed: Easy keeps its speed by itself; Pro has Go; the grass slows you; pads, stars and drifts zoom; a spin slows
  let tgt = easy ? RL_CRUISE : inp.go ? 1 : .8;
  P.off = Math.abs(P.x) > rw + .02;
  if (P.off) tgt = Math.min(tgt, easy ? .62 : .5);
  tgt = Math.min(tgt, cap);
  if (P.boost > 0) {
    P.boost -= dt;
    tgt = 1.18 + .03 * U.turbo;
  }
  if (P.spin > 0) {
    P.spin -= dt;
    tgt = easy ? .32 : .22;
    if (P.spin <= 0) P.dizzy = .9;
  } else if (P.dizzy > 0) P.dizzy -= dt;
  if (P.shield > 0) P.shield -= dt;
  if (P.bumpT > 0) P.bumpT -= dt;
  const dv = tgt * RL_VMAX - P.v;
  P.v += Math.max(-(P.off || P.spin > 0 ? 1.2 : .6) * RL_VMAX * dt, Math.min(.45 * RL_VMAX * dt, dv));
  // steering, the drift (Pro: hold a turn into a bend at speed) and the push of a bend
  let turn = 1.7;
  if (!easy && P.spin <= 0) {
    const into = Math.abs(steer) > .5 && Math.sign(steer) == Math.sign(cur) && Math.abs(cur) >= 2 && sp > .74;
    if (into) {
      P.dh += dt;
      if (P.dh > .35) {
        if (!P.drifting) st.ev.push(['drift']);
        P.drifting = true;
        P.dsp += dt;
      }
    } else {
      if (P.drifting && P.dsp > .5) {
        P.boost = Math.min(1.4, .45 + P.dsp * .45) * (1 + .15 * U.turbo);
        st.ev.push(['zoom']);
      }
      P.drifting = false;
      P.dh = 0;
      P.dsp = 0;
    }
    if (P.drifting) turn *= 1.5;
  }
  P.s += (steer - P.s) * Math.min(1, dt * 10); // for the car's lean on screen
  const want = steer * turn * sp - .35 * cur * sp * sp * (easy ? .3 : 1) * (1 - .08 * U.grip);
  P.vx += (want - P.vx) * Math.min(1, grip * dt * 30);
  const x0 = P.x;
  P.x += P.vx * dt;
  if (easy && !steer && P.spin <= 0 && Math.abs(P.x) > .7 * rw) P.x -= Math.sign(P.x) * .6 * dt; // the steering helper
  // rails, walls and the split's divider; off the road, hedges stop you at last
  const bar = T.fl[seg] & 4 ? rw + .1 - RL_CARW / 2 : 0, vin = Math.abs(P.x - x0) / dt;
  if (bar && Math.abs(P.x) > bar) rlWall(st, P, Math.sign(P.x), Math.sign(P.x) * bar, vin);
  else if (Math.abs(P.x) > rw + .5) {
    P.x = Math.sign(P.x) * (rw + .5);
    P.v *= 1 - 1.5 * dt;
  }
  const band = .12 + RL_CARW / 2;
  if (T.dv[seg] && Math.abs(P.x) < band) {
    const side = Math.sign(x0) || 1;
    if (!T.dv[rlMod(seg - 1, n)] || Math.abs(x0) < band) rlCrash(st, P, 'wall', .8), P.x = side * band;
    else rlWall(st, P, -side, side * band, vin);
  }
  // Easy: before a split, the helper eases the car off the divider's nose
  if (easy && !steer && Math.abs(P.x) < band + .1) for (let j = 1; j < 10; j++) if (T.dv[rlMod(seg + j, n)]) { P.x += (Math.sign(P.x) || 1) * .5 * dt; break; }
  const d0 = P.d;
  P.d += P.v * dt;
  rlHits(st, P, d0, P.d);
  // sparkles (each one once a lap), boost pads, the gate
  const s0 = Math.floor(d0 / RL_SEG), s1 = Math.floor(P.d / RL_SEG);
  for (let s = s0; s <= s1; s++) {
    const a = T.spAt[rlMod(s, n)];
    if (a) for (const i of a) {
      const [ss, x] = T.sp[i], at = rlCross(L, d0, P.d, rlMod(ss, n) * RL_SEG + RL_SEG / 2);
      if (at < 0) continue;
      const id = Math.floor(at / L) + 1;
      if (st.taken[i] != id && Math.abs(P.x - x) < .26) {
        st.taken[i] = id;
        P.spk++;
        st.ev.push(['spark', P.spk]);
      }
    }
  }
  const px = T.padAt[seg];
  if (px != null && Math.abs(P.x - px) < .3 && P.spin <= 0) {
    const key = Math.floor(P.d / L) * 1000 + T.pads.findIndex(p => rlMod(seg - p[0], n) < 6);
    if (key != st.padKey) {
      st.padKey = key;
      P.boost = Math.max(P.boost, 1.1 * (1 + .15 * U.turbo));
      st.ev.push(['pad']);
    }
  }
  if (st.quiz && rlCross(L, d0, P.d, T.gate * RL_SEG) >= 0) {
    const lanes = [-.62, 0, .62], k = lanes.reduce((b, l, i) => (Math.abs(P.x - l) < Math.abs(P.x - lanes[b]) ? i : b), 0);
    const ok = st.q.opts[k] === st.q.a;
    if (ok) P.boost = Math.max(P.boost, 1.4);
    st.ev.push(['gate', ok, st.q.a]);
    st.q = rlQuiz(st.grade, st.rnd);
  }
  // the rivals: gentle catch-up, a pace style, a wobble now and then, lanes, hazards, spins
  const last = P.d > st.fin - L * .35, CU = RL_CU[st.mode], span = st.fin - RL_START * RL_SEG;
  for (const c of st.cars) {
    const cs = rlMod(Math.floor(c.d / RL_SEG), n), crw = T.rw[cs], gap = (c.d - P.d) / (RL_VMAX * .8);
    let f = Math.max(CU.lo, Math.min(CU.hi, 1 - (gap > 0 ? CU.ka : CU.kb) * gap));
    if (easy && last && gap > 0 && gap < 2.5) f *= .97;
    if ((c.wobT -= dt) <= 0) {
      c.wobT = 2 + st.rnd() * 3;
      c.wob = (st.rnd() - .5) * .06;
    }
    const cc = Math.abs(T.cv[cs]), prog = (c.d - RL_START * RL_SEG) / span, csf = rlSurf(T, cs, c.x);
    let ct = c.base * f * (1 + c.wob) * (1 + (prog < .5 ? c.e : -c.e)) * (1 - Math.max(0, cc - 3) * .03) * RL_VMAX;
    if (csf) ct *= csf == 's' ? .75 : .9;
    if (c.spin > 0) {
      c.spin -= dt;
      ct = .28 * RL_VMAX;
    } else {
      // keep a lane: move over for hazards and for someone just ahead, otherwise drift back to the own lane
      let block = null;
      for (const o of st.cars.concat([P])) {
        if (o === c) continue;
        const dd = o.d - c.d;
        if (dd > 0 && dd < RL_SEG * 3 && Math.abs(o.x - c.x) < .42 && (!block || dd < block.d - c.d)) block = o;
      }
      if (block) {
        c.tx = Math.max(-.75, Math.min(.75, block.x + (block.x > c.x || (block.x == c.x && c.x < 0) ? -.6 : .6)));
        if (block.d - c.d < RL_SEG * 1.2) ct = Math.min(ct, (block.v || 0) * .98);
      } else c.tx += (c.lx - c.tx) * Math.min(1, dt * .5);
      rlLook(st, c);
      // at a split each rival picks a side when it gets there (seeded) and keeps to it
      let fk = 0;
      for (let j = 0; j < 12 && !fk; j++) if (T.dv[rlMod(cs + j, n)]) fk = 1;
      if (fk) {
        if (!c.fs) c.fs = st.rnd() < .5 ? -1 : 1;
        c.tx = c.fs * Math.max(.45, Math.min(Math.abs(c.tx), crw - .3));
      } else c.fs = 0;
      c.tx = Math.max(-(crw - .25), Math.min(crw - .25, c.tx));
      c.x += Math.max(-.9 * dt, Math.min(.9 * dt, c.tx - c.x));
    }
    c.v += Math.max(-.6 * RL_VMAX * dt, Math.min(.42 * RL_VMAX * dt, ct - c.v));
    const cd0 = c.d;
    c.d += c.v * dt;
    if (c.spin <= 0) rlHits(st, c, cd0, c.d);
    if (c.dizzy > 0) c.dizzy -= dt;
    if (!c.fin && c.d >= st.fin) c.fin = st.rt;
    // contact with the player: running into a kart from behind (fast) gives the one behind a dizzy bounce; otherwise a nudge
    const dd = c.d - P.d;
    if (Math.abs(dd) < RL_SEG * .8 && Math.abs(c.x - P.x) < RL_CARW * .95) {
      const side = Math.sign(P.x - c.x) || (P.x < 0 ? -1 : 1), back = dd > 0 ? P : c, front = dd > 0 ? c : P;
      if (st.rt > 3 && back.v - front.v > .2 * RL_VMAX && Math.abs(dd) > RL_SEG * .3 && back.spin <= 0) {
        rlCrash(st, back, 'bonk');
        back.v = Math.min(back.v, front.v * .7);
      }
      if (dd > 0) {
        P.v = Math.min(P.v, c.v * .9);
        P.d = Math.min(P.d, c.d - RL_SEG * .8);
      } else {
        c.v = Math.min(c.v, P.v * .9);
        c.d = Math.min(c.d, P.d - RL_SEG * .8);
      }
      P.x += side * .05;
      c.x -= side * .05;
      if (P.bumpT <= 0) {
        P.bumpT = .6;
        st.ev.push(['bump']);
      }
    }
  }
  // laps (a time trial times each lap and records it for the ghost), places, the finish
  if (st.trial) rlRec(st);
  const lap = rlLap(st, P.d);
  if (lap != P.lap && lap <= st.laps + 1) {
    const over = (P.d - (RL_START * RL_SEG + (lap - 1) * L)) / Math.max(1, P.v), lt = st.rt - over - P.lap0;
    P.laps.push(lt);
    P.lap0 = st.rt - over;
    if (st.trial) rlRecLap(st, lt);
    if (lap <= st.laps) {
      P.lap = lap;
      st.ev.push(['lap', lap]);
    }
  }
  if (!st.trial) {
    const pl = rlPlace(st);
    if (pl < P.place) {
      const by = st.cars.filter(c => c.d < P.d).sort((a, b) => b.d - a.d)[0];
      if (by) st.ev.push(['pass', by.rv]);
    }
    P.place = pl;
  }
  if (P.d >= st.fin) {
    st.done = true;
    P.time = st.rt - (P.d - st.fin) / Math.max(1, P.v);
    P.place = st.trial ? 1 : 1 + st.cars.filter(c => c.fin && c.fin <= P.time).length;
    st.ev.push(['finish']);
  }
}
// time trial: a sample every 6 steps (0.1 s) of the lap; the best lap is kept as the next ghost
function rlRec(st) {
  const R = st.rec, P = st.P;
  if (++R.n % 6) return;
  const lapD = P.d - (RL_START * RL_SEG + (P.lap - 1) * st.T.L), q = Math.max(0, Math.min(63, Math.round((lapD - R.d0) / RL_GQ)));
  R.d0 += q * RL_GQ; // the ghost's distance is exactly the sum of what is written, so the next sample makes up any rounding
  R.cur += RL_G64[q] + RL_G64[Math.max(0, Math.min(63, Math.round((P.x + 1.6) / 3.2 * 63)))];
}
function rlRecLap(st, lt) {
  const R = st.rec, ms = Math.round(lt * 1000);
  if (R.cur.length && R.cur.length <= 2400 && (!R.best || ms < R.best.ms)) {
    R.best = { ms, g: R.cur };
    st.ev.push(['best', ms]);
  }
  R.cur = '';
  R.d0 = 0;
  R.n = 0;
}
// stars for a finish: 1 for finishing, 1 more for the top 3, 1 more for winning
const rlStarsFor = place => 1 + (place <= 3 ? 1 : 0) + (place == 1 ? 1 : 0);
// sparkles a race pays: the ones collected, plus a little for the place
const rlPay = (spk, place) => spk + [0, 10, 7, 5, 3, 3, 3][place || 6];
// the finishing order of a race: who finished before the player, the player, then the others by how far they got
const rlOrder = st => st.cars.filter(c => c.fin && c.fin <= st.P.time).sort((a, b) => a.fin - b.fin).map(c => c.rv.id).concat(['you'],
  st.cars.filter(c => !(c.fin && c.fin <= st.P.time)).sort((a, b) => b.d - a.d).map(c => c.rv.id));
// cup standings: points added for a race's order; the table sorted by points (ties: the better place in the last race)
function rlCupAdd(pts, order) {
  order.forEach((w, i) => { pts[w] = (pts[w] || 0) + (RL_PTS[i] || 0); });
  return pts;
}
const rlCupTable = (pts, order) => Object.keys(pts).sort((a, b) => pts[b] - pts[a] || order.indexOf(a) - order.indexOf(b));

/* ---- drawing the race on a canvas ----
   Colours come from the tokens (--ill-* for the --a-* roles, --sc-* for skies), read once. Sprites are the SVG drawings above,
   turned into canvases once (async; drawn as soon as they are ready), each with half-size copies down to 16 px so that small far
   things are drawn from a copy near their size (no shimmer). Each frame: the sky (one gradient), two parallax layers, the ground,
   the road as one path per colour (grass stripe, water, rumble, road, patches, lane marks, start line, pads); stripes too thin to
   draw (under 2 px, near the horizon) are not drawn; then, far to near, tunnel walls, rails, the split's divider, roadside things,
   sparkles, hazards, pick-ups and every car (the player's too) in the order of their distance, clipped behind hills.
   G-02b fixed the flashing cars: a car was placed with its distance from the camera but drawn between the road edges of the
   wrong segment (the camera's part-segment was not added), so it jumped by up to a segment every time the camera passed a
   segment line, and cars next to the player were drawn in front of or behind it by segment, not by distance. */
const RL_HUE = { r: 'red', o: 'orange', y: 'yellow', g: 'green', c: 'aqua', b: 'blue', v: 'purple', p: 'pink', n: 'brown', t: 'tan',
  s: 'skin', m: 'cream', e: 'grey', w: 'white', k: 'ink' };
let RL_COL = {};
// a role ('g2', 'w', 'k2') or a scene token ('sc-sky') as the colour its token holds
function rlCol(role) {
  if (RL_COL[role]) return RL_COL[role];
  const cs = getComputedStyle(document.documentElement);
  const tok = role.startsWith('sc-') ? '--' + role : '--ill-' + RL_HUE[role[0]] + (role[1] ? '-' + role[1] : '');
  return (RL_COL[role] = cs.getPropertyValue(tok).trim() || cs.getPropertyValue('--ink').trim());
}
const rlRes = svg => svg.replace(/var\(--a-([a-z]\d?)\)/g, (m, r) => rlCol(r));
// an SVG drawing as a canvas of pxw pixels wide (cached by key; .c is set once the image has loaded; .m: c and its half-size copies)
const RL_SPR = {};
function rlSprite(key, vw, vh, inner, pxw) {
  const k = key + '@' + Math.round(pxw);
  if (RL_SPR[k]) return RL_SPR[k];
  const w = Math.max(2, Math.round(pxw)), h = Math.max(2, Math.round(pxw * vh / vw)), s = (RL_SPR[k] = { c: null, m: [], w, h, ar: vh / vw });
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    const m = [c];
    for (let p = c; p.width > 32;) {
      const q = document.createElement('canvas');
      q.width = Math.ceil(p.width / 2);
      q.height = Math.max(1, Math.ceil(p.height / 2));
      q.getContext('2d').drawImage(p, 0, 0, q.width, q.height);
      m.push((p = q));
    }
    s.m = m;
    s.c = c;
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
    `width="${w}" height="${h}">${rlRes(inner)}</svg>`);
  return s;
}
// the copy of a sprite to draw at w pixels: the smallest that is still at least w wide
const rlMip = (s, w) => {
  let i = 0;
  while (i + 1 < s.m.length && s.m[i + 1].width >= w) i++;
  return s.m[i];
};
const rlCalm = () => !!S.calm || (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
// sizes and the cached pictures for this screen size
function rlSize(R) {
  const cv = R.cv, cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight);
  // k0: the full pixel scale (sprites are made at it); k: the canvas's, lower when frames are slow (R.q, see rlRace's loop)
  const k0 = Math.min(Math.min(1.5, devicePixelRatio || 1), Math.sqrt(1.2e6 / (cw * ch))), k = k0 * (R.q || 1), sc = k / k0;
  cv.width = Math.round(cw * k);
  cv.height = Math.round(ch * k);
  const W = cv.width, H = cv.height, port = ch > cw * 1.1, st = R.st, pl = st.T.pl, c = R.ctx;
  const hz = Math.round(H * (port ? .3 : .37)), ground = H - (port ? 136 : 12) * k, rw = W * (port ? .95 : .52);
  const V = { W, H, k, sc, port, hz, ground, rw, KX: rw * RL_PZ / RL_ROADW, KY: (ground - hz) * RL_PZ / RL_CAMH };
  const sky = !pl.night && st.W.sky ? st.W.sky : pl.sky;
  V.sky = c.createLinearGradient(0, 0, 0, hz);
  V.sky.addColorStop(0, rlCol('sc-' + sky[0]));
  V.sky.addColorStop(1, rlCol('sc-' + sky[1]));
  V.haze = c.createLinearGradient(0, hz - H * .02, 0, hz + H * .06);
  V.haze.addColorStop(0, rlCol('sc-' + sky[1]));
  V.haze.addColorStop(1, 'transparent');
  V.fog = c.createLinearGradient(0, hz - H * .1, 0, hz + H * .22);
  V.fog.addColorStop(0, rlCol('sc-' + sky[1]));
  V.fog.addColorStop(.55, rlCol('sc-' + sky[1]));
  V.fog.addColorStop(1, 'transparent');
  const B = RL_BACK[pl.id], fh = hz / sc * .66, nh = Math.max(24, hz / sc * .34);
  V.far = rlSprite('far-' + pl.id, 960, 200, B.far(), 960 * fh / 200);
  V.near = rlSprite('near-' + pl.id, 960, 120, B.near(), 960 * nh / 120);
  V.sun = rlSprite('sky-' + pl.id, 100, 100, RL_SKY[pl.id](), hz / sc * .4);
  // cars: the player's and the five rivals'; props, sparkle, arch, gate, hazards and pick-ups at a size they are often seen at
  const rs = rw / sc, cw2 = Math.min(360, RL_CARW * rs * 1.25), r = rlS();
  V.me = rlSprite(`me-${r.body}-${r.paint}-${r.stk}`, 120, 84, rlCarArt(r.body, r.paint, r.stk, 'you'), cw2);
  V.rv = {};
  for (const rv of RL_RIVALS) V.rv[rv.id] = rlSprite('rv-' + rv.id, 120, 84, rlCarArt('kart', rv.car, '', rv.id), cw2 * .8);
  V.pr = {};
  for (const k2 of new Set(pl.props.map(p => p[0]).concat(['arch', 'gate', 'sparkle', 'lamp', 'cone', 'pstar', 'bubble', pl.roll, pl.crit || 'duck']))) {
    const P = RL_PROPS[k2];
    V.pr[k2] = rlSprite('pr-' + k2, P.vb[0], P.vb[1], P.art(), Math.min(480, P.wr * rs * .55));
    V.pr[k2].wr = P.wr;
  }
  V.col = {};
  for (const [k2, v] of [['g0', pl.grass[0]], ['g1', pl.grass[1]], ['ra', pl.rumble[0]], ['rb', pl.rumble[1]], ['da', pl.road[0]],
    ['db', pl.road[1]], ['ln', pl.lane], ['w', 'w'], ['k', 'k2'], ['pa', 'o'], ['pb', 'y'], ['ink', 'k'], ['edge', pl.edge], ['spk', 'y1'],
    ['dr1', 'c1'], ['dr2', 'o1'], ['la', pl.rail[0]], ['lb', pl.rail[1]], ['wa', pl.wall[0]], ['wb', pl.wall[1]], ['wat', pl.water],
    ['sp', 'c'], ['ss', 't'], ['si', 'c1'], ['sh', 'c1'], ['shl', 'c']]) V.col[k2] = rlCol(v);
  const D = RL_DRAW + 2;
  V.e = {};
  for (const a of ['x', 'X', 'Y', 'Wd', 'R', 'clip', 'cx', 'cy', 'cw', 'cr']) V.e[a] = new Float64Array(D);
  V.e.ok = new Uint8Array(D);
  // falling rain or snow: fixed spots (moved each frame by the race clock)
  V.fall = [];
  for (let i = 0; i < 90; i++) V.fall.push([(Math.sin(i * 12.9898) * 43758.5453) % 1, (Math.sin(i * 78.233) * 12543.123) % 1].map(Math.abs));
  R.v = V;
}
// draw a layer (a cached canvas) repeated across the screen, shifted by off pixels, with its bottom at y
function rlTile(c, s, off, y, W, sc) {
  if (!s.c) return;
  const w = s.w * sc, h = s.h * sc;
  for (let x = -rlMod(off, w); x < W; x += w) c.drawImage(s.c, Math.round(x), Math.round(y - h), Math.ceil(w), Math.ceil(h));
}
// a sprite standing on the road: centre x, ground y, width w, hidden below the clip line; ang turns it round its middle
function rlStand(c, s, x, y, w, clip, alpha, ang) {
  if (!s || !s.c || w < 2 || x + w / 2 < 0 || x - w / 2 > c.canvas.width) return;
  const h = w * s.ar, top = y - h;
  if (top >= clip || y < 0) return;
  const vis = Math.min(1, (clip - top) / h), m = rlMip(s, w);
  if (alpha != null) c.globalAlpha = alpha;
  if (ang) {
    c.save();
    c.translate(x, y - h / 2);
    c.rotate(ang);
    c.drawImage(m, -w / 2, -h / 2, w, h);
    c.restore();
  } else c.drawImage(m, 0, 0, m.width, m.height * vis, x - w / 2, top, w, h * vis);
  if (alpha != null) c.globalAlpha = 1;
}
// a trapezoid of the road from a near edge (x1, y1, half-width w1) to a far edge, between a and b (in half-widths)
function rlQuad(p, x1, y1, w1, x2, y2, w2, a, b) {
  p.moveTo(x1 + w1 * a, y1);
  p.lineTo(x1 + w1 * b, y1);
  p.lineTo(x2 + w2 * b, y2);
  p.lineTo(x2 + w2 * a, y2);
  p.closePath();
}
// an upright strip (a rail, a wall's foot) standing on the line from (x1, y1) to (x2, y2), h1 / h2 high
function rlFence(p, x1, y1, h1, x2, y2, h2) {
  p.moveTo(x1, y1);
  p.lineTo(x2, y2);
  p.lineTo(x2, y2 - h2);
  p.lineTo(x1, y1 - h1);
  p.closePath();
}
// spinning: a full turn over the spin (calm mode: a small wobble instead)
const rlSpinA = (car, t, calm) => (car.spin > 0 ? (calm ? Math.sin(t * 14) * .18 : (1 - car.spin / car.spinD) * Math.PI * 2 * (car.spinD > .8 ? 2 : 1)) : 0);
// dizzy stars going round above a car (x, top y, width w)
function rlDizzy(R, x, y, w) {
  const s = R.v.pr.pstar;
  for (let i = 0; i < 3; i++) {
    const a = R.t * 6 + i * 2.1;
    rlStand(R.ctx, s, x + Math.cos(a) * w * .32, y + Math.sin(a) * w * .06, w * .2, 1e9);
  }
}
function rlDraw(R) {
  const c = R.ctx, V = R.v, st = R.st, T = st.T, N = T.n, P = st.P, W = V.W, H = V.H, hz = V.hz, col = V.col, E = V.e, wx = st.W;
  const D = wx.fog ? 80 : RL_DRAW, calm = R.calm, t = R.t || 0;
  // a short shake after a crash (none in calm mode or with reduced motion)
  const sh = !calm && R.shake > 0 ? Math.sin(t * 70) * R.shake * 20 * V.k : 0;
  c.save();
  if (sh) c.translate(sh, sh * .3);
  c.fillStyle = V.sky;
  c.fillRect(-30, -30, W + 60, hz + 32);
  if (V.sun.c && !wx.fall && !wx.fog) c.drawImage(V.sun.c, W * .1, hz * .12, V.sun.w * V.sc, V.sun.h * V.sc);
  rlTile(c, V.far, R.bgx * V.far.w * V.sc * .5, hz + 2, W, V.sc);
  rlTile(c, V.near, R.bgx * V.near.w * V.sc, hz + 2, W, V.sc);
  // edges of the segments ahead: x of the bending road, then projection (camera RL_PZ behind the player, following the car)
  const camD = P.d - RL_PZ, base = Math.floor(camD / RL_SEG), frac = camD / RL_SEG - base;
  let x = 0, dx = -T.cv[rlMod(base, N)] * frac;
  for (let e = 0; e <= D; e++) {
    E.x[e] = x;
    x += dx;
    dx += T.cv[rlMod(base + e, N)];
  }
  const ep = RL_PZ / RL_SEG + frac, ei = Math.floor(ep);
  const camX = E.x[ei] + (E.x[ei + 1] - E.x[ei]) * (ep - ei) + P.x * RL_ROADW;
  const pi = rlMod(Math.floor(P.d / RL_SEG), N), pf = P.d / RL_SEG - Math.floor(P.d / RL_SEG);
  const camY = RL_CAMH + T.hy[pi] + (T.hy[(pi + 1) % N] - T.hy[pi]) * pf;
  for (let e = 1; e <= D; e++) {
    const p = 1 / ((e - frac) * RL_SEG), i = rlMod(base + e, N);
    E.X[e] = W / 2 + (E.x[e] - camX) * p * V.KX;
    E.Y[e] = hz + (camY - T.hy[i]) * p * V.KY;
    E.Wd[e] = RL_ROADW * p * V.KX;
    E.R[e] = E.Wd[e] * T.rw[i];
  }
  // the road, near to far, each colour in one path; a segment behind a hill top is skipped, one partly behind it is cut
  const pG = new Path2D(), pRa = new Path2D(), pRb = new Path2D(), pDa = new Path2D(), pDb = new Path2D(), pL = new Path2D();
  const pW = new Path2D(), pK = new Path2D(), pPa = new Path2D(), pPb = new Path2D(), pWa = new Path2D(), pDv = new Path2D();
  const pS = { p: new Path2D(), s: new Path2D(), i: new Path2D() };
  let maxy = H;
  for (let n = 1; n < D; n++) {
    E.clip[n] = maxy;
    E.ok[n] = 0;
    let x1 = E.X[n], y1 = E.Y[n], w1 = E.Wd[n], r1 = E.R[n];
    const x2 = E.X[n + 1], y2 = E.Y[n + 1], w2 = E.Wd[n + 1], r2 = E.R[n + 1];
    if (y2 >= maxy || y2 >= y1) continue;
    if (y1 > maxy) {
      const q = (maxy - y2) / (y1 - y2);
      x1 = x2 + (x1 - x2) * q;
      w1 = w2 + (w1 - w2) * q;
      r1 = r2 + (r1 - r2) * q;
      y1 = maxy;
    }
    E.ok[n] = 1;
    E.cx[n] = x1;
    E.cy[n] = y1;
    E.cw[n] = w1;
    E.cr[n] = r1;
    const i = rlMod(base + n, N), fine = y1 - y2 >= 2 * V.k, band = fine ? Math.floor(i / 3) & 1 : 0, rr1 = r1 / w1, rr2 = r2 / w2;
    if (T.fl[i] & 2) pWa.rect(0, y2, W, y1 - y2 + 1);
    else if (band) pG.rect(0, y2, W, y1 - y2 + 1);
    rlQuad(band ? pRa : pRb, x1, y1, r1, x2, y2, r2, -1 - .14 / rr1, -1);
    rlQuad(band ? pRa : pRb, x1, y1, r1, x2, y2, r2, 1, 1 + .14 / rr1);
    rlQuad(band ? pDa : pDb, x1, y1 + .5, r1, x2, y2, r2, -1, 1);
    const sf = T.sfAt[i];
    if (sf) for (const [a, b, k] of sf) rlQuad(pS[k], x1, y1, w1, x2, y2, w2, Math.max(a, -rr1 - .1), Math.min(b, rr1 + .1));
    if (fine && (i & 7) < 4 && !T.dv[i]) {
      rlQuad(pL, x1, y1, r1, x2, y2, r2, -.36, -.33);
      rlQuad(pL, x1, y1, r1, x2, y2, r2, .33, .36);
    }
    if (T.dv[i]) rlQuad(pDv, x1, y1, w1, x2, y2, w2, -.14, .14);
    if (i == RL_START || i == RL_START + 1) for (let q = 0; q < 8; q++) rlQuad((q + i) & 1 ? pW : pK, x1, y1, r1, x2, y2, r2, -1 + q / 4, -.75 + q / 4);
    const px = T.padAt[i];
    if (px != null) {
      rlQuad(i & 1 ? pPa : pPb, x1, y1, w1, x2, y2, w2, px - .22, px + .22);
      rlQuad(i & 1 ? pPb : pPa, x1, y1, w1, x2, y2, w2, px - .1, px + .1);
    }
    maxy = y2;
  }
  for (let n = D; n < D + 2; n++) E.clip[n] = maxy;
  // the ground, up to the horizon or to the top of a hill that hides it
  c.fillStyle = col.g0;
  c.fillRect(-30, Math.min(hz, maxy), W + 60, H + 30);
  const fill = (p, k, a) => {
    c.fillStyle = col[k];
    if (a) c.globalAlpha = a;
    c.fill(p);
    if (a) c.globalAlpha = 1;
  };
  fill(pG, 'g1', .55);
  fill(pWa, 'wat');
  fill(pRa, 'ra');
  fill(pRb, 'rb');
  fill(pDa, 'da');
  fill(pDb, 'db');
  fill(pS.s, 'ss', .9);
  fill(pS.p, 'sp', .7);
  fill(pS.i, 'si', .85);
  fill(pL, 'ln');
  fill(pW, 'w');
  fill(pK, 'k');
  fill(pPa, 'pa');
  fill(pPb, 'pb');
  fill(pDv, 'edge');
  c.fillStyle = V.haze;
  c.globalAlpha = .7;
  c.fillRect(-30, hz - H * .02, W + 60, H * .08);
  c.globalAlpha = 1;
  // cars, the ghost and the player by the segment they are in (u: in units of the edges above, which start frac behind)
  const at = R.at || (R.at = []);
  at.length = 0;
  const add = (it, d) => {
    const u = (d - camD) / RL_SEG + frac, n = u < 1 && u > .4 ? 1 : Math.floor(u); // just in front of the camera: drawn from the first edge
    if (n >= 1 && n < D) (at[n] = at[n] || []).push([d, it]);
  };
  for (const car of st.cars) add(car, car.d);
  add(P, P.d);
  if (st.gh && P.lap <= st.laps) {
    const g = rlGhostAt(st.gh, st.rt - P.lap0);
    if (g) {
      R.ghost = { ghost: 1, d: RL_START * RL_SEG + (P.lap - 1) * T.L + g.d, x: g.x };
      add(R.ghost, R.ghost.d);
    }
  }
  const lapOf = d => Math.floor(d / T.L) + 1;
  // rails, divider and tunnel walls are collected and filled just before the next sprite (so a nearer one covers a farther one)
  let pLa = new Path2D(), pLb = new Path2D(), pTa = new Path2D(), any = 0;
  const flush = () => {
    if (!any) return;
    fill(pLb, 'lb');
    fill(pLa, 'la');
    fill(pTa, 'la');
    pLa = new Path2D();
    pLb = new Path2D();
    pTa = new Path2D();
    any = 0;
  };
  const fogN = wx.fog ? 26 : 0;
  let meOK = 0;
  for (let n = D - 1; n >= 1; n--) {
    if (n == fogN) {
      flush();
      c.fillStyle = V.fog;
      c.globalAlpha = .85;
      c.fillRect(-30, hz - H * .1, W + 60, H * .32);
      c.globalAlpha = 1;
    }
    const i = rlMod(base + n, N), X = E.X[n], Y = E.Y[n], Wd = E.Wd[n], clip = E.clip[n], fl = T.fl[i];
    if (E.ok[n]) {
      const x1 = E.cx[n], y1 = E.cy[n], w1 = E.cw[n], r1 = E.cr[n], x2 = E.X[n + 1], y2 = E.Y[n + 1], w2 = E.Wd[n + 1], r2 = E.R[n + 1];
      const fine = y1 - y2 >= 2 * V.k, band = fine ? Math.floor(i / 3) & 1 : 0;
      if (fl & 1) {
        // a tunnel slice: everything round its far opening (and its piece of road) is wall
        flush();
        const a1 = r1 + .1 * w1, a2 = r2 + .1 * w2, t1 = w1 * 1.25, t2 = w2 * 1.25, p = new Path2D();
        p.rect(x1 - a1 - 2.2 * w1, y1 - t1 - .9 * w1, 2 * a1 + 4.4 * w1, t1 + .9 * w1);
        p.moveTo(x1 - a1, y1);
        p.lineTo(x2 - a2, y2);
        p.lineTo(x2 - a2, y2 - t2);
        p.lineTo(x2 + a2, y2 - t2);
        p.lineTo(x2 + a2, y2);
        p.lineTo(x1 + a1, y1);
        p.closePath();
        c.fillStyle = band ? col.wb : col.wa;
        c.fill(p, 'evenodd');
      } else if (fl & 4) {
        // rails or walls on both sides, striped in the place's two colours
        const pp = band ? pLb : pLa, a1 = r1 + .1 * w1, a2 = r2 + .1 * w2, h1 = w1 * .16, h2 = w2 * .16;
        rlFence(pp, x1 - a1, y1, h1, x2 - a2, y2, h2);
        rlFence(pp, x1 + a1, y1, h1, x2 + a2, y2, h2);
        any = 1;
      }
      if (T.dv[i]) {
        // the split's divider: a low striped wall with a top
        const h1 = w1 * .14, h2 = w2 * .14;
        rlFence(band ? pLb : pLa, x1 - .14 * w1, y1, h1, x2 - .14 * w2, y2, h2);
        rlFence(band ? pLb : pLa, x1 + .14 * w1, y1, h1, x2 + .14 * w2, y2, h2);
        rlQuad(pTa, x1, y1 - h1, w1, x2, y2 - h2, w2, -.14, .14);
        if (!T.dv[rlMod(i - 1, N)]) rlFence(pLb, x1 - .14 * w1, y1, h1, x1 + .14 * w1, y1, h1);
        any = 1;
      }
    }
    if (E.Y[n] < 0 && E.Y[n + 1] < 0) continue;
    const pr = T.pr[i], sp = T.spAt[i], ob = T.obAt[i], mv = T.mvAt[i], pk = T.pkAt[i], cs = at[n];
    if (!(pr || sp || ob || mv || pk || cs || (st.quiz && i == T.gate))) continue;
    flush();
    if (pr) {
      for (let j = 0; j < pr.length; j += 2) {
        const s = V.pr[pr[j]];
        if (s) rlStand(c, s, X + Wd * pr[j + 1], Y, s.wr * Wd, clip);
      }
    }
    if (st.quiz && i == T.gate) rlDrawGate(R, X, Y, Wd, clip);
    const zl = lapOf((base + n) * RL_SEG + RL_SEG / 2);
    if (sp) {
      for (const k of sp) {
        if (st.taken[k] == zl) continue;
        const b = 1 + .12 * Math.sin(t * 6 + k);
        rlStand(c, V.pr.sparkle, X + Wd * T.sp[k][1], Y - Wd * .06, V.pr.sparkle.wr * Wd * b, clip);
      }
    }
    if (pk) for (const k of pk) {
      if (st.pkT[k] == zl) continue;
      const p = T.pk[k], s = V.pr[p.k == 'star' ? 'pstar' : 'bubble'];
      rlStand(c, s, X + Wd * p.x, Y - Wd * (.1 + .03 * Math.sin(t * 4 + k)), s.wr * Wd, clip, null, p.k == 'star' && !calm ? Math.sin(t * 3) * .3 : 0);
    }
    if (ob) for (const k of ob) {
      const o = T.ob[k], s = V.pr[o.k];
      if (st.knL[k] == zl) {
        // knocked over: it tumbles off the road, then is gone for this lap
        const a = st.rt - st.kn[k];
        if (a < .8) rlStand(c, s, X + Wd * (o.x + st.knS[k] * a * 1.8), Y - Wd * Math.sin(a * 4) * .25, s.wr * Wd, 1e9, null, st.knS[k] * a * 9);
      } else rlStand(c, s, X + Wd * o.x, Y, s.wr * Wd, clip);
    }
    if (mv) for (const k of mv) {
      const m = T.mv[k], s = V.pr[m.k], mx = rlMvX(m, st.rt), crit = m.k == 'duck' || m.k == 'crab' || m.k == 'chick';
      const hop = crit && !calm ? Math.abs(Math.sin(t * 9 + k)) * Wd * .05 : 0;
      rlStand(c, s, X + Wd * mx, Y - hop, s.wr * Wd, clip, null, crit ? 0 : mx * 3.2);
    }
    if (cs) {
      cs.sort((a, b) => b[0] - a[0]);
      for (const [d, car] of cs) {
        if (car === P) { rlDrawMe(R); meOK = 1; continue; }
        const f = (d - camD) / RL_SEG + frac - n, cx = X + (E.X[n + 1] - X) * f, cy = Y + (E.Y[n + 1] - Y) * f, cw = Wd + (E.Wd[n + 1] - Wd) * f;
        if (car.ghost) { rlStand(c, V.me, cx + cw * car.x, cy, RL_CARW * cw, clip, .45); continue; }
        const s = V.rv[car.rv.id], w = RL_CARW * cw;
        rlStand(c, s, cx + cw * car.x, cy, w, clip, null, rlSpinA(car, t, calm));
        if ((car.spin > 0 || car.dizzy > 0) && cy - w * s.ar < clip) rlDizzy(R, cx + cw * car.x, cy - w * s.ar * 1.05, w);
      }
    }
  }
  flush();
  if (!meOK) rlDrawMe(R);
  // rain or snow falling
  if (wx.fall) {
    const p = new Path2D(), nf = calm ? 40 : 90, rain = wx.fall == 'rain', k = V.k;
    for (let j = 0; j < nf; j++) {
      const [a, b] = V.fall[j], fx = rlMod(a * W + (rain ? -.08 : .03 * Math.sin(t + j)) * W * t, W), fy = rlMod(b * H + t * H * (rain ? 1.4 + a * .5 : .16 + a * .1), H);
      if (rain) { p.moveTo(fx, fy); p.lineTo(fx - 5 * k, fy + 20 * k); }
      else { p.moveTo(fx + (2 + a * 2.5) * k, fy); p.arc(fx, fy, (2 + a * 2.5) * k, 0, Math.PI * 2); }
    }
    if (rain) {
      c.strokeStyle = col.w;
      c.globalAlpha = .5;
      c.lineWidth = 2 * k;
      c.stroke(p);
    } else {
      c.fillStyle = col.w;
      c.globalAlpha = .9;
      c.fill(p);
    }
    c.globalAlpha = 1;
  }
  c.restore();
}
// the boost gate: the sprite, then the three answers written on its boards
function rlDrawGate(R, X, Y, Wd, clip) {
  const c = R.ctx, s = R.v.pr.gate, w = s.wr * Wd, h = w * s.ar;
  rlStand(c, s, X, Y, w, clip);
  if (!s.c || w < 60 || Y - h >= clip || !R.st.q) return;
  c.fillStyle = R.v.col.ink;
  c.font = `700 ${Math.round(h * .3)}px Andika, sans-serif`;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  R.st.q.opts.forEach((o, i) => c.fillText(String(o), X - w / 2 + w * [77, 150, 223][i] / 300, Y - h + h * 47 / 112));
}
// the player's car: centred near the bottom, leaning into turns, shaking a little on the grass, spinning after a crash;
// drift sparks, the shield bubble, dizzy stars and speed lines
function rlDrawMe(R) {
  const c = R.ctx, V = R.v, P = R.st.P, s = V.me, w = RL_CARW * V.rw, t = R.t || 0, calm = R.calm;
  if (!s.c) return;
  const h = w * s.ar, bob = P.off && !calm ? Math.sin(t * 40) * 2 * V.k : Math.sin(t * 9) * .6 * V.k;
  const ang = P.s * .05 + (P.drifting ? Math.sign(P.s) * .12 : 0) + rlSpinA(P, t, calm), x = V.W / 2 + P.s * w * .06, y = V.ground + bob;
  c.save();
  c.translate(x, y - h / 2);
  c.rotate(ang);
  c.drawImage(s.c, -w / 2, -h / 2, w, h);
  c.restore();
  if (P.shield > 0) {
    const p = new Path2D(), a = P.shield < 2 && !calm ? .35 + .25 * Math.sin(t * 12) : .55;
    p.ellipse(x, y - h * .5, w * .66, h * .78, 0, 0, Math.PI * 2);
    c.globalAlpha = a * .35;
    c.fillStyle = V.col.sh;
    c.fill(p);
    c.globalAlpha = a;
    c.strokeStyle = V.col.shl;
    c.lineWidth = 4 * V.k;
    c.stroke(p);
    c.globalAlpha = 1;
  }
  if (P.spin > 0 || P.dizzy > 0) rlDizzy(R, x, y - h * 1.05, w);
  if (P.drifting) {
    const p = new Path2D();
    for (let i = 0; i < 6; i++) {
      const sx = x + (i < 3 ? -1 : 1) * w * .38 + Math.sin(t * 50 + i * 2) * w * .05, sy = y - h * .05 - Math.abs(Math.cos(t * 37 + i)) * h * .25;
      p.moveTo(sx + w * .025, sy);
      p.arc(sx, sy, w * .025, 0, Math.PI * 2);
    }
    c.fillStyle = P.dsp > 1 ? V.col.dr2 : V.col.dr1;
    c.fill(p);
  }
  if (P.boost > 0) {
    const p = new Path2D(), cx = V.W / 2, cy = V.hz + (V.ground - V.hz) * .3;
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2 + t * 3, r0 = V.W * (.42 + (i % 3) * .05), r1 = r0 + V.W * .12;
      p.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * .7);
      p.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * .7);
    }
    c.strokeStyle = V.col.w;
    c.globalAlpha = .55;
    c.lineWidth = 3 * V.k;
    c.stroke(p);
    c.globalAlpha = 1;
  }
}

/* ---- the screens: menu (next goal, cups, single races and time trials, how to drive), garage, the race, the end cards ---- */
let RL = null; // the race on screen
const rlPic = (inner, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" ` +
  `aria-hidden="true" focusable="false">${inner}</svg>`;
const rlCarSVG = (body, h, st, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 120 84" aria-hidden="true" focusable="false">` +
  `${rlCarArt(body, h, st, 'you')}</svg>`;
const rlCupSVG = (h, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${rlCupArt(h)}</svg>`;
const rlSpkChip = (n, id = 'rlspk') => `<span class="stat rl-spk" id="${id}" aria-label="Sparkles">${ico('sparkle', 32)}<b>${n}</b></span>`;
const rlSnd = () => !!S.sound;
const rlTone = (...a) => { if (rlSnd()) tone(...a); };
const rlTiltOK = () => typeof window != 'undefined' && 'DeviceOrientationEvent' in window && (navigator.maxTouchPoints || 0) > 0;
const rlTrophyHue = b => ['', 'y', 'e', 'o'][b] || '';
const rlWho = id => (id == 'you' ? (S.name || 'You') : (RL_RIVALS.find(v => v.id === id) || {}).name || id);
// the one next goal on the menu
function rlGoal(r) {
  if (r.cup) {
    const c = RL_CUPS.find(x => x.id === r.cup.id);
    return `Finish the ${c.name}: race ${r.cup.i + 1} of 3 is next.`;
  }
  const open = RL_CUPS.map((c, i) => rlCupOpen(i, r)), k = open.lastIndexOf(true), b = rlNum(rlCupRec(r, RL_CUPS[k].id).best, 0, 4);
  if (k < RL_CUPS.length - 1 && !(b >= 1 && b <= 3)) return `Win a trophy in the ${RL_CUPS[k].name} to open the ${RL_CUPS[k + 1].name}.`;
  const g = RL_CUPS.findIndex((c, i) => open[i] && rlNum(rlCupRec(r, c.id).best, 0, 4) != 1);
  if (g >= 0) return `Win the gold trophy in the ${RL_CUPS[g].name}.`;
  const up = RL_UPG.map(u => [u, rlUpNext(u[0], r)]).find(([, nx]) => nx && rlTrophies(r) >= nx.need);
  if (up) return r.spk >= up[1].cost ? `Get ${up[0][1]} level ${up[1].lv} in the garage.` : `Collect ${up[1].cost - r.spk} more sparkles for ${up[0][1]} level ${up[1].lv}.`;
  const tt = RL_ORDER.find(id => !r.ghost[id]);
  if (tt) return `Race a time trial on ${RL_TRK[tt].name} to make your ghost.`;
  const id = RL_ORDER[r.races % RL_ORDER.length];
  return `Beat your ghost on ${RL_TRK[id].name}: best lap ${rlTime(r.ghost[id].ms)}.`;
}
function rlMenu(place) {
  const r = rlS();
  if (place && RL_PLACES.some(p => p.id === place)) r.place = place;
  let pl = rlPl(r.place);
  const tracksOpen = p => RL_TRACKS[p.id].some(t => rlTrackOpen(t.id, r));
  if (!tracksOpen(pl)) pl = RL_PLACES[0];
  const stars = rlStarsAll(r), mode = rlMode(r);
  const ccard = (c, i) => {
    const open = rlCupOpen(i, r), rec = rlCupRec(r, c.id), b = rlNum(rec.best, 0, 4), run = r.cup && r.cup.id === c.id ? r.cup : null;
    const sub = !open ? `Win a trophy in the ${esc(RL_CUPS[i - 1].name)} to open` : run ? `Go on: race ${run.i + 1} of 3` :
      b >= 1 && b <= 3 ? `${RL_TROPHY[b]} trophy` : rec.runs ? 'Raced, no trophy yet' : 'Not raced yet';
    return `<button class="rl-cup${open ? '' : ' lock'}${b >= 1 && b <= 3 ? ' won' : ''}" data-cup="${i}" data-ok="${open ? 1 : 0}">` +
      `<span class="rl-cpic s-${c.hue}">${rlCupSVG(rlTrophyHue(b) || c.hue)}${open ? '' : `<span class="rl-plock">${ico('lock', 22)}</span>`}</span>` +
      `<span class="rl-ci"><b>${esc(c.name)}</b><span>${c.races.map(([t]) => esc(RL_TRK[t].name)).join(', ')}</span><span class="rl-cs">${sub}</span></span>` +
      `<span class="rl-go" aria-hidden="true">${ico(open ? 'play' : 'lock')}</span></button>`;
  };
  const pcard = p => {
    const open = tracksOpen(p), got = RL_TRACKS[p.id].reduce((a, t) => a + (r.stars[t.id] || 0), 0);
    return `<button class="rl-place${p.id === pl.id ? ' on' : ''}${open ? '' : ' lock'}" data-pl="${p.id}" aria-pressed="${p.id === pl.id}">` +
      `<span class="rl-ppic" style="--gh-a:var(--sc-${p.sky[0]});--gh-b:var(--sc-${p.sky[1]})">${rlPic(RL_ART.place(p.id))}` +
      `${open ? '' : `<span class="rl-plock">${ico('lock', 22)}</span>`}</span><span class="rl-pname">${esc(p.name)}</span>` +
      `<span class="rl-psub">${ico('star', 18)}${open ? `<b>${got}</b> of 9` : 'Opens with a cup'}</span></button>`;
  };
  const tcard = t => {
    const ok = rlTrackOpen(t.id, r), best = r.best[t.id], lap = r.lap[t.id];
    return `<div class="rl-trow"><button class="rl-trk${ok ? '' : ' lock'}" data-trk="${t.id}" data-ok="${ok ? 1 : 0}"><span class="rl-tn">${t.i + 1}</span>` +
      `<span class="rl-ti"><b>${esc(t.name)}</b><span>${ok ? (best ? 'Best time ' + rlTime(best) : t.laps + ' laps') : `Opens with the ${esc(RL_CUPS[t.cup].name)}`}</span>` +
      (ok ? UI.stars(r.stars[t.id] || 0, 3, 22) : '') + `</span><span class="rl-go" aria-hidden="true">${ico(ok ? 'play' : 'lock')}</span></button>` +
      (ok ? `<button class="rl-tt" data-tt="${t.id}" aria-label="Time trial on ${esc(t.name)}">${ico('timer', 24)}<span>${lap ? rlTime(lap) : 'Time trial'}</span></button>` : '') + '</div>';
  };
  const how = (mode == 'pro' ? [['bolt', 'Hold Go to go faster. Let go in tight bends!'],
    ['rotate', 'Hold a turn all through a bend to drift. Let go for a zoom!']] : [['arrow-right', 'Tap the big arrows, or the sides of the road, to steer.']])
    .concat([['warning', 'Rails, cones, rolling things and animals make you spin. Off the road is slow.'],
      ['star', 'Grab a boost star to zoom, or a bubble to keep you safe from one bump.'], ['play', 'Drive over the orange pads to zoom.'],
      ['trophy', 'A cup is 3 races. Points for every place, a trophy at the end.'], ['timer', 'Time trial: race your ghost, your own best lap.'],
      ['sparkle', 'Collect sparkles. Spend them on paint, stickers and upgrades.']]);
  view(`${GH.top('rally')}<div class="scroll rl-menu">
  <section class="rl-hero"><div class="rl-hcar">${rlCarSVG(r.body, r.paint, r.stk)}</div><div class="rl-hinfo">
   <p class="rl-hl">${ico('trophy', 22)}<b>${rlTrophies(r)}</b> of 4 trophies</p><p class="rl-hl">${ico('star', 22)}<b>${stars}</b> of 36 stars</p>
   <p class="rl-hl">${ico('sparkle', 22)}<b>${r.spk}</b> sparkles</p>
   ${UI.btn('Garage', { icon: 'palette', id: 'rlgar', wide: true })}</div></section>
  <p class="rl-goal" id="rlgoal"><span class="rl-hi">${ico('target', 22)}</span><span><b>Next goal:</b> ${esc(rlGoal(r))}</span></p>
  <h2 class="rl-h">Cups</h2><div class="rl-cups">${RL_CUPS.map(ccard).join('')}</div>
  <h2 class="rl-h">Single races</h2><div class="rl-places">${RL_PLACES.map(pcard).join('')}</div>
  <h3 class="rl-h3">${esc(pl.name)}</h3><div class="rl-trks">${RL_TRACKS[pl.id].map(tcard).join('')}</div>
  <h2 class="rl-h">Your rivals</h2><div class="rl-rivals">${RL_RIVALS.map(v => `<div class="rl-rv"><svg class="art" viewBox="0 0 50 54" aria-hidden="true" focusable="false">` +
    `${rlFace(v.id, 25, 30, 1.2)}</svg><b>${esc(v.name)}</b><span>${esc(v.kind)}</span></div>`).join('')}</div>
  <section class="rl-opts"><h2 class="rl-h">How to drive</h2>
   <div class="rl-mode">${UI.seg([['easy', 'Easy'], ['pro', 'Pro']], mode, { id: 'rlmode', label: 'Driving' })}
   <p>${mode == 'pro' ? 'Pro: hold Go to speed up, drift through bends; bumps cost more time and the animals race hard.' : 'Easy: the car drives by itself. You steer.'}</p></div>
   <ul class="rl-how">${how.map(([i, t]) => `<li><span class="rl-hi">${ico(i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul>
   ${UI.sw('Boost gates: drive through the right answer to zoom', r.quiz, 'rlquiz')}
   ${rlTiltOK() ? UI.sw('Steer by tilting the tablet', r.tilt, 'rltilt') : ''}</section></div>`);
  GH.wire({ back: () => gameRoom() });
  const again = () => { const y = $('.scroll').scrollTop; rlMenu(); $('.scroll').scrollTop = y; };
  const gt = () => {
    if (ptLeft() > 0) return true;
    SFX.wrong();
    fb(ptWhyNot(), 'warn long', 3000);
    return false;
  };
  $('#rlgar').onclick = () => { SFX.whoosh(); rlGarage(); };
  $$('[data-cup]').forEach(b => b.onclick = () => {
    const i = +b.dataset.cup, c = RL_CUPS[i];
    if (!rlCupOpen(i, r)) {
      SFX.wrong();
      fb(`Win a trophy in the ${RL_CUPS[i - 1].name} to open the ${c.name}!`, 'warn long', 2800);
      return;
    }
    if (!gt()) return;
    SFX.whoosh();
    rlCupGo(i);
  });
  $$('[data-pl]').forEach(b => b.onclick = () => {
    const p = rlPl(b.dataset.pl);
    if (!tracksOpen(p)) {
      SFX.wrong();
      fb(`${p.name} opens with a cup. Race the cups to open it!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.place = p.id;
    save();
    again();
  });
  $$('[data-trk]').forEach(b => b.onclick = () => {
    const t = RL_TRK[b.dataset.trk];
    if (!rlTrackOpen(t.id, r)) {
      SFX.wrong();
      fb(`${t.name} opens with the ${RL_CUPS[t.cup].name}!`, 'warn long', 2600);
      return;
    }
    if (!gt()) return;
    SFX.whoosh();
    rlRace(t.id);
  });
  $$('[data-tt]').forEach(b => b.onclick = () => {
    if (!gt()) return;
    SFX.whoosh();
    rlRace(b.dataset.tt, { trial: true });
  });
  UI.segOn($('#rlmode'), v => { r.mode = v; save(); again(); });
  $('#rlquiz').onchange = e => { r.quiz = e.target.checked; save(); };
  if ($('#rltilt')) $('#rltilt').onchange = e => {
    r.tilt = e.target.checked;
    save();
    // some tablets ask before they share the tilt
    if (r.tilt && window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().catch(() => {});
  };
}
// start or go on with a cup: its next race
function rlCupGo(i) {
  const r = rlS(), c = RL_CUPS[i];
  if (!r.cup || r.cup.id !== c.id) {
    const pts = { you: 0 };
    for (const v of RL_RIVALS) pts[v.id] = 0;
    r.cup = { id: c.id, i: 0, pts };
    save();
  }
  rlRace(c.races[r.cup.i][0], { cup: c });
}

/* ---- the garage: try a paint, sticker or car shape on the car; buy it, or an upgrade, with sparkles (prices shown) ---- */
function rlGarage(sel) {
  const r = rlS(), stars = rlStarsAll(r), tro = rlTrophies(r);
  sel = sel || null;
  const look = { body: r.body, paint: r.paint, stk: r.stk };
  let bar = '';
  if (sel) {
    let name, cost;
    if (sel.k == 'upg') {
      const u = RL_UPG.find(x => x[0] === sel.id), nx = rlUpNext(sel.id, r);
      name = `${u[1]} level ${nx.lv}`;
      cost = nx.cost;
    } else {
      const it = (sel.k == 'paint' ? RL_PAINTS : RL_STICKERS).find(x => x[0] === sel.id);
      look[sel.k == 'paint' ? 'paint' : 'stk'] = sel.id;
      name = it[1];
      cost = it[2];
    }
    const left = r.spk - cost;
    bar = `<div class="rl-buy"><p><b>${esc(name)}</b> for ${ico('sparkle', 22)}<b>${cost}</b></p><p>${left >= 0 ? `You will have ${left} sparkles left.` :
      `You need ${-left} more sparkles. Collect them on the track!`}</p><div class="rl-bacts">` +
      UI.btn('Buy', { kind: 'primary', size: 'lg', icon: 'check', id: 'rlbuy', off: left < 0 }) + UI.btn('Not now', { icon: 'close', id: 'rlno' }) + '</div></div>';
  }
  const tile = (k, id, label, pic, own, on, price, need, needIc = 'star') => `<button class="rl-item${on ? ' on' : ''}${own ? '' : ' new'}" data-k="${k}" data-id="${id}" ` +
    `aria-pressed="${on}"><span class="rl-ipic">${pic}</span><span class="rl-iname">${esc(label)}</span><span class="rl-iprice">` +
    (on ? ico('check', 18) + 'On' : own ? 'Yours' : need != null ? ico('lock', 18) + need + ' ' + ico(needIc, 18) : ico('sparkle', 18) + price) + '</span></button>';
  const swatch = h => `<svg class="art" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${ghBall(20, 20, 15, h)}</svg>`;
  const stk = id => `<svg class="art" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${id ? rlStk(id, 20, 20, 15) : ghC(20, 20, 14, 'e1') +
    ghL('M13 13L27 27', 'e3', 3)}</svg>`;
  const upTile = ([id, name, what, icon, lv]) => {
    const nx = rlUpNext(id, r), have = r.upg[id];
    return `<button class="rl-item rl-up" data-k="upg" data-id="${id}"><span class="rl-ipic rl-upic">${ico(icon, 36)}</span>` +
      `<span class="rl-iname">${esc(name)}</span><span class="rl-pips" aria-label="Level ${have} of ${lv.length}">${lv.map((x, i) => `<i class="${i < have ? 'on' : ''}"></i>`).join('')}</span>` +
      `<span class="rl-iprice">${!nx ? ico('check', 18) + 'Top level' : tro < nx.need ? ico('lock', 18) + nx.need + ' ' + ico('trophy', 18) : ico('sparkle', 18) + nx.cost}</span>` +
      `<span class="rl-iwhat">${esc(what)}</span></button>`;
  };
  view(`${GH.top('rally', { sub: 'Garage', chips: rlSpkChip(r.spk) })}<div class="scroll rl-gar">
  <section class="rl-gcar" style="--gh-a:var(--sc-sky-1);--gh-b:var(--sc-sky)">${rlCarSVG(look.body, look.paint, look.stk, 'rl-big')}${bar}</section>
  <h2 class="rl-h">Upgrades</h2><div class="rl-items rl-ups">${RL_UPG.map(upTile).join('')}</div>
  <p class="rl-note">Upgrades open with trophies from the cups and make the car easier to drive.</p>
  <h2 class="rl-h">Cars</h2><div class="rl-items">${RL_BODIES.map(([id, n, need]) => tile('body', id, n, rlCarSVG(id, r.paint, ''),
    stars >= need, r.body === id, 0, stars >= need ? null : need)).join('')}</div>
  <p class="rl-note">New car shapes open with stars from racing. They all drive the same.</p>
  <h2 class="rl-h">Paint</h2><div class="rl-items">${RL_PAINTS.map(([id, n, c]) => tile('paint', id, n, swatch(id), !!r.paints[id], r.paint === id && !sel, c)).join('')}</div>
  <h2 class="rl-h">Stickers</h2><div class="rl-items">${RL_STICKERS.map(([id, n, c]) => tile('stk', id, n, stk(id), !id || !!r.stks[id], r.stk === id && !sel, c)).join('')}</div>
  </div>`);
  GH.wire({ back: () => rlMenu() });
  $$('.rl-item').forEach(b => b.onclick = () => {
    const k = b.dataset.k, id = b.dataset.id;
    if (k == 'upg') {
      const nx = rlUpNext(id, r);
      if (!nx) return SFX.pop(1), fb('That one is at the top level!', 'long', 2000);
      if (tro < nx.need) {
        SFX.wrong();
        fb(`Win ${nx.need - tro} more ${nx.need - tro == 1 ? 'trophy' : 'trophies'} in the cups to open it!`, 'warn long', 2600);
        return;
      }
      return SFX.pop(1), rlGarage({ k, id });
    }
    if (k == 'body') {
      const need = RL_BODIES.find(x => x[0] === id)[2];
      if (stars < need) {
        SFX.wrong();
        fb(`Win ${need - stars} more stars to open it!`, 'warn long', 2400);
        return;
      }
      r.body = id;
    } else if (k == 'paint' ? r.paints[id] : !id || r.stks[id]) {
      if (k == 'paint') r.paint = id;
      else r.stk = id;
    } else return SFX.pop(1), rlGarage({ k, id });
    SFX.pop(2);
    save();
    rlGarage();
  });
  if (sel) {
    $('#rlno').onclick = () => rlGarage();
    $('#rlbuy').onclick = () => {
      if (!(sel.k == 'upg' ? rlBuyUp(sel.id) : rlBuy(sel.k, sel.id))) {
        SFX.wrong();
        return;
      }
      if (sel.k == 'paint') r.paint = sel.id;
      else if (sel.k == 'stk') r.stk = sel.id;
      save();
      SFX.fanfare();
      rlGarage();
    };
  }
}

/* ---- the race ---- */
const rlNow = () => (window.__realNow || (() => performance.now()))();
function rlStop() {
  if (!RL) return;
  cancelAnimationFrame(RL.raf);
  clearTimeout(RL.endT);
  if (RL.eng) {
    try {
      RL.eng.g.gain.setTargetAtTime(0, ac().currentTime, .05);
      RL.eng.o.stop(ac().currentTime + .2);
      RL.eng.o2.stop(ac().currentTime + .2);
    } catch (e) {}
  }
  removeEventListener('resize', RL.rs);
  removeEventListener('keydown', RL.kd);
  removeEventListener('keyup', RL.ku);
  removeEventListener('deviceorientation', RL.ori);
  RL = null;
}
function rlMsg(t, ms = 1200, cls = '') {
  const m = $('#rlmsg');
  if (!m) return;
  m.textContent = t;
  m.className = 'rl-msg on' + (cls ? ' ' + cls : '');
  clearTimeout(m._t);
  m._t = setTimeout(() => m.classList.remove('on'), ms);
}
// o: {cup (a cup being raced: its race r.cup.i), trial (a time trial against the ghost)}
function rlRace(tid, o = {}) {
  const r = rlS(), t = RL_TRK[tid], mode = rlMode(r), cup = o.cup || null, trial = !!o.trial;
  r.place = t.place;
  save();
  const btn = (id, icon, aria, txt) => `<button class="rl-btn" id="${id}" data-k="${id.slice(2)}" aria-label="${aria}">${ico(icon, 48)}` +
    `${txt ? `<span>${txt}</span>` : ''}</button>`;
  const seed = ((Date.now() & 0xffffff) ^ (r.races * 7919)) >>> 0 || 1;
  const st = rlNew(tid, { mode, quiz: r.quiz, grade: S.grade, seed, up: r.upg, trial, ghost: trial ? r.ghost[tid] : null,
    tier: cup ? cup.tier : null, wx: cup ? cup.races[r.cup.i][1] : null });
  const wxn = st.W.name, sub = (cup ? `${cup.name} ${r.cup.i + 1}/3: ` : trial ? 'Time trial: ' : '') + t.name + (wxn ? ', ' + wxn : '');
  view(`${GH.top('rally', { play: true, hud: true, sub, chips: (trial ? `<span class="stat rl-pos" id="rlpos" aria-label="Lap time">${ico('timer', 32)}<b>0:00.0</b></span>` :
    `<span class="stat rl-pos" id="rlpos" aria-label="Place">${ico('trophy', 32)}<b>6th</b></span>`) +
    `<span class="stat rl-lap" id="rllap" aria-label="Lap">${ico('replay', 32)}<b>1/${t.laps}</b></span>${rlSpkChip(0)}` })}
  <div class="rl rl-${mode}" id="rl"><canvas id="rlcv" role="img" aria-label="The race track"></canvas><div class="rl-msg" id="rlmsg" aria-live="polite"></div>
  <div class="rl-q" id="rlq" hidden></div><div class="rl-ctl">${btn('rll', 'arrow-left', 'Steer left')}${btn('rlr', 'arrow-right', 'Steer right')}` +
    `${mode == 'pro' ? btn('rlgo', 'bolt', 'Go faster', 'Go') : ''}</div></div>`);
  const cv = $('#rlcv');
  RL = { st, cv, ctx: cv.getContext('2d', { alpha: false }), ptr: {}, key: {}, tilt: 0, bgx: 0, t: 0, acc: 0, last: 0, raf: 0, paused: false, ft: [], fi: [],
    cd: 4, chips: {}, q: 1, fc: 0, qAt: 0, cup, trial, shake: 0, calm: rlCalm(), msgT: 0 };
  rlSize(RL);
  RL.rs = () => { if (RL) rlSize(RL); };
  addEventListener('resize', RL.rs);
  // steering: the buttons (several fingers at once), the left or right half of the road in Easy, the arrow keys, tilting
  const box = $('#rl'), keyOf = e => {
    const b = e.target.closest && e.target.closest('.rl-btn');
    if (b) return b.dataset.k;
    return mode == 'easy' ? (e.clientX < innerWidth / 2 ? 'l' : 'r') : '';
  };
  const show = () => {
    const on = new Set(Object.values(RL.ptr).concat(Object.keys(RL.key).filter(k => RL.key[k])));
    for (const k of ['l', 'r', 'go']) {
      const b = $('#rl' + k);
      if (b) b.classList.toggle('on', on.has(k));
    }
    RL.on = on;
  };
  box.addEventListener('pointerdown', e => {
    if (!RL || e.target.closest('.gh-top')) return;
    e.preventDefault();
    const k = keyOf(e);
    if (!k) return;
    RL.ptr[e.pointerId] = k;
    try { box.setPointerCapture(e.pointerId); } catch (x) {}
    show();
  });
  const up = e => {
    if (!RL) return;
    delete RL.ptr[e.pointerId];
    show();
  };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', up);
  box.addEventListener('contextmenu', e => e.preventDefault());
  const KEYS = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'go', ' ': 'go' };
  RL.kd = e => { if (RL && KEYS[e.key]) { RL.key[KEYS[e.key]] = 1; show(); } };
  RL.ku = e => { if (RL && KEYS[e.key]) { RL.key[KEYS[e.key]] = 0; show(); } };
  addEventListener('keydown', RL.kd);
  addEventListener('keyup', RL.ku);
  RL.ori = e => {
    if (!RL || !r.tilt) return;
    const a = (screen.orientation && screen.orientation.angle) || +window.orientation || 0;
    const v = a == 90 ? e.beta : a == 270 || a == -90 ? -e.beta : a == 180 ? -e.gamma : e.gamma;
    RL.tilt = Math.abs(v) < 3 ? 0 : Math.max(-1, Math.min(1, v / 18));
  };
  if (r.tilt) addEventListener('deviceorientation', RL.ori);
  show();
  // the shared Pause sheet holds the race and the game-time clock; Quit keeps the sparkles collected so far
  GH.wire({quit: () => rlQuit(), hold: on => {
    if (!RL) return;
    RL.paused = on;
    RL.ptr = {};
    show();
    rlEngine();
  } });
  gtStart('#gtm', () => rlTimeUp());
  if (S.voice) say(trial ? 'Race your ghost!' : wxn ? `${wxn} today. Ready?` : 'Ready? Steer with the arrows!');
  const loop = ts => {
    if (!RL || RL.st !== st) return;
    if (!document.getElementById('rlcv')) return rlStop();
    const t0 = rlNow(), dt = RL.last ? Math.min(.1, (ts - RL.last) / 1000) : 0;
    if (RL.last) {
      RL.fi.push(ts - RL.last);
      if (RL.fi.length > 240) RL.fi.shift();
    }
    RL.last = ts;
    if (!document.hidden && !RL.paused && !GH.held && !st.done) {
      const on = RL.on || new Set();
      const inp = { steer: Math.max(-1, Math.min(1, (on.has('r') ? 1 : 0) - (on.has('l') ? 1 : 0) + RL.tilt)), go: on.has('go') };
      RL.acc += dt * RL_DEV.fast;
      let n = 0;
      while (RL.acc >= RL_DT && n < 10 * RL_DEV.fast && !st.done) {
        const seg = rlMod(Math.floor(st.P.d / RL_SEG), st.T.n);
        rlStep(st, inp);
        RL.bgx += st.T.cv[seg] * st.P.v * RL_DT / RL_SEG * .0009;
        RL.acc -= RL_DT;
        n++;
      }
      RL.acc = Math.min(RL.acc, RL_DT);
      RL.t += dt;
      if (RL.shake > 0) RL.shake -= dt;
      rlEvents();
    }
    rlEngine();
    rlDraw(RL);
    if (RL_DEV.flush) RL.ctx.getImageData(0, 0, 1, 1);
    RL.ft.push(rlNow() - t0);
    if (RL.ft.length > 240) RL.ft.shift();
    // a slow tablet: fewer pixels (down to 60 %) when frames take long; back up when there is time to spare
    if (++RL.fc % 90 == 0 && RL.fi.length >= 60) {
      const med = RL.fi.slice(-60).sort((a, b) => a - b)[30], q = RL.q;
      if (med > 26 && RL.q > .6) RL.q = Math.max(.6, RL.q - .15);
      else if (med < 18 && RL.q < 1 && RL.fc - RL.qAt > 300) RL.q = Math.min(1, RL.q + .1);
      if (RL.q != q) {
        RL.qAt = RL.fc;
        rlSize(RL);
      }
    }
    RL.raf = requestAnimationFrame(loop);
  };
  RL.raf = requestAnimationFrame(loop);
}
// the engine: a soft hum that follows the speed (only with sound on; silent while paused and after the finish)
function rlEngine() {
  if (!RL) return;
  const P = RL.st.P, want = rlSnd() && !RL.paused && !GH.held && !RL.st.done && !document.hidden && RL.st.cd < 3;
  try {
    if (want && !RL.eng) {
      const a = ac(), o = a.createOscillator(), o2 = a.createOscillator(), f = a.createBiquadFilter(), g = a.createGain();
      o.type = 'sawtooth';
      o2.type = 'triangle';
      f.type = 'lowpass';
      f.frequency.value = 420;
      g.gain.value = 0;
      o.connect(f);
      o2.connect(f);
      f.connect(g).connect(MG);
      o.start();
      o2.start();
      RL.eng = { o, o2, g };
    }
    if (RL.eng) {
      const now = ac().currentTime, fr = 52 + 70 * P.v / RL_VMAX + (P.boost > 0 ? 18 : 0);
      RL.eng.o.frequency.setTargetAtTime(fr, now, .08);
      RL.eng.o2.frequency.setTargetAtTime(fr * 1.5, now, .08);
      RL.eng.g.gain.setTargetAtTime(want ? .022 : 0, now, .08);
    }
  } catch (e) {}
}
const RL_CRIT = { duck: 'duck', crab: 'crab', chick: 'penguin chick' };
// what happened in the race: sounds, messages, the chips
function rlEvents() {
  const st = RL.st, P = st.P;
  const cd = Math.ceil(st.cd);
  if (st.cd > 0 && cd != RL.cd && cd <= 3) {
    RL.cd = cd;
    rlMsg(String(cd), 700, 'big');
    rlTone(520, .14, 0, 'square', .1);
  }
  for (const [k, a, b] of st.ev) {
    if (k == 'go') {
      rlMsg('Go!', 900, 'big');
      rlTone(1040, .3, 0, 'square', .1);
      rlTone(1560, .3, .08, 'triangle', .08);
    } else if (k == 'spark') {
      const m = [72, 74, 76, 79, 81, 84][a % 6];
      rlTone(NOTE(m + 12), .08, 0, 'sine', .07);
      rlTone(NOTE(m + 19), .12, .05, 'triangle', .04);
    } else if (k == 'pad' || k == 'zoom') {
      SFX.whoosh();
      rlMsg(k == 'pad' ? 'Zoom!' : 'Drift zoom!', 700);
    } else if (k == 'drift') rlTone(1800, .1, 0, 'sine', .05, 2400);
    else if (k == 'bump' || k == 'wall') rlTone(300, .25, 0, 'triangle', .14, 120);
    else if (k == 'crash') {
      // a cartoon spin: a wobbly falling whistle and a boing
      rlTone(900, .5, 0, 'sine', .09, 260);
      rlTone(180, .2, .05, 'triangle', .12, 90);
      if (!RL.calm) RL.shake = .3;
      rlMsg(a == 'crit' ? `Whoa! The ${RL_CRIT[st.T.pl.crit] || 'animal'} hopped away. Dizzy!` : a == 'cone' ? 'Bonk! A cone! Dizzy!' :
        a == 'bonk' ? 'Bonk! Too close! Dizzy!' : 'Whoa! Spin! Dizzy!', 1300);
    } else if (k == 'pop') {
      rlTone(1200, .12, 0, 'sine', .1, 600);
      rlMsg('Pop! Your bubble kept you safe.', 1300);
    } else if (k == 'get') {
      SFX.right(2);
      rlMsg(a == 'star' ? 'Star zoom!' : 'Bubble shield!', 900);
    } else if (k == 'surf') {
      rlMsg(a == 'p' ? 'Splash! Puddles are slippery.' : a == 's' ? 'Sand slows you down.' : 'Ice! Steer gently.', 1300);
      rlTone(a == 'i' ? 1500 : 400, .15, 0, 'sine', .05, a == 'i' ? 1900 : 250);
    } else if (k == 'dizzy') {
      if (Math.abs(st.cars.find(c => c.rv === a).d - P.d) < RL_SEG * 25 && RL.t > RL.msgT) {
        RL.msgT = RL.t + 2;
        rlMsg(`Oops! ${a.name} spun round.`, 1000);
      }
    } else if (k == 'lap') {
      const lt = P.laps[P.laps.length - 1];
      rlMsg(st.trial && lt ? `Lap ${a}. Last lap ${rlTime(lt * 1000)}` : a == st.laps ? 'Last lap!' : 'Lap ' + a, 1300);
      [0, 4, 7].forEach((d, i) => rlTone(NOTE(76 + d), .14, i * .09, 'triangle', .08));
    } else if (k == 'best') {
      rlMsg('Best lap! ' + rlTime(a), 1300);
    } else if (k == 'pass') {
      rlMsg('You passed ' + a.name + '!', 1000);
      rlTone(600, .12, 0, 'sine', .08, 900);
    } else if (k == 'gate') {
      if (a) { SFX.right(3); rlMsg('Right! Zoom!', 1000); }
      else { rlTone(320, .18, 0, 'triangle', .12, 200); rlMsg('It was ' + b + '. Next time!', 1400); }
    } else if (k == 'finish') {
      rlMsg('Finish!', 1500, 'big');
      SFX.fanfare();
      RL.endT = setTimeout(() => { if (RL && RL.st === st) rlFinish(); }, 1100);
    }
  }
  st.ev.length = 0;
  const set = (id, v) => {
    if (RL.chips[id] === v) return;
    RL.chips[id] = v;
    UI.setChip($('#' + id), v);
  };
  set('rlpos', st.trial ? rlTime((st.done ? P.laps[P.laps.length - 1] || 0 : st.rt - P.lap0) * 1000) : rlOrd(P.place));
  set('rllap', Math.min(P.lap, st.laps) + '/' + st.laps);
  set('rlspk', P.spk);
  // the boost gate's question shows a few seconds before the gate
  const q = $('#rlq');
  if (q && st.quiz && st.q) {
    const ahead = rlMod(st.T.gate * RL_SEG - P.d, st.T.L), show = st.cd <= 0 && ahead < P.v * 3.5 + 1;
    if (show != !q.hidden || q.dataset.q != st.q.q) {
      q.hidden = !show;
      q.dataset.q = st.q.q;
      q.textContent = st.q.q + ' = ?';
      if (show && S.voice) say(st.q.q.replace('−', 'minus').replace('×', 'times') + '?');
    }
  }
}
function rlQuit() {
  const r = rlS();
  if (RL) r.spk += RL.st.P.spk;
  save();
  rlStop();
  gtStop();
  rlMenu();
}
function rlTimeUp() {
  const r = rlS();
  if (RL) r.spk += RL.st.P.spk;
  save();
  rlStop();
  timeUpOverlay();
}
// the cup standings as a list (the child's row marked)
function rlStandHTML(pts, order, h) {
  return `<ol class="rl-stand" aria-label="Cup standings">${rlCupTable(pts, order).map((w, i) => `<li${w == 'you' ? ' class="me"' : ''}><span class="rl-sn">${i + 1}</span>` +
    `<svg class="art" viewBox="0 0 50 54" aria-hidden="true" focusable="false">${rlFace(w, 25, 30, 1.2, h)}</svg><b>${esc(rlWho(w))}</b>` +
    `<span>${pts[w]} points</span></li>`).join('')}</ol>`;
}
// the finish: stars, the best time, sparkles, what opened; a cup's standings and trophy; a time trial's best lap and ghost
function rlFinish() {
  const st = RL.st, P = st.P, r = rlS(), tid = st.tid, t = RL_TRK[tid], cup = RL.cup, trial = st.trial;
  const openCups = RL_CUPS.map((c, i) => rlCupOpen(i, r)), bodies = RL_BODIES.filter(b => rlBodyOpen(b[0], r)).map(b => b[0]);
  const ms = Math.round(P.time * 1000), lines = [], order = rlOrder(st);
  let n = null, pay, title, extra = '', pic = '', rec = false, had = r.best[tid], tag = '', win = P.place <= 3, stats;
  if (trial) {
    const b = st.rec.best, old = r.lap[tid];
    rec = !!b && (!old || b.ms < old);
    if (rec) {
      r.lap[tid] = b.ms;
      r.ghost[tid] = { ms: b.ms, g: b.g };
    }
    pay = P.spk + (rec ? 5 : 0);
    title = rec ? 'New best lap!' : 'Time trial done!';
    tag = rec && old ? 'Faster than your ghost!' : '';
    win = rec;
    stats = [[b ? rlTime(b.ms) : '-', 'best lap', 'timer'], [rlTime(ms), 'time', 'replay'], ['+' + pay, 'sparkles', 'sparkle']];
    lines.push(['car', rec ? 'Your ghost will race you next time: that is this lap.' : `Your ghost's lap is ${rlTime(old)}. Try again to beat it!`]);
  } else {
    n = rlStarsFor(P.place);
    rec = !had || ms < had;
    if (rec) r.best[tid] = ms;
    r.stars[tid] = Math.max(r.stars[tid] || 0, n);
    pay = rlPay(P.spk, P.place);
    title = P.place == 1 ? 'You won!' : P.place <= 3 ? rlOrd(P.place) + ' place!' : 'You finished the race!';
    tag = rec && had ? 'New best time!' : '';
    stats = [[rlOrd(P.place), 'place', 'trophy'], [rlTime(ms), rec ? (had ? 'new best' : 'your time') : 'best ' + rlTime(r.best[tid]), 'timer'], ['+' + pay, 'sparkles', 'sparkle']];
    pic = rlPic(RL_ART.podium(order.slice(0, 3), r.paint, r), 'gh-art');
  }
  let final = false, rank = 0;
  if (cup && r.cup && r.cup.id === cup.id) {
    rlCupAdd(r.cup.pts, order);
    extra = `<p class="rl-sth">${esc(cup.name)} after race ${r.cup.i + 1} of 3</p>` + rlStandHTML(r.cup.pts, order, r.paint);
    r.cup.i++;
    if (r.cup.i >= 3) {
      final = true;
      rank = rlCupTable(r.cup.pts, order).indexOf('you') + 1;
      const c = (r.cups[cup.id] = rlObj(r.cups[cup.id])), was = rlNum(c.best, 0, 4) || 4;
      c.best = Math.min(was, rank <= 3 ? rank : 4);
      c.runs = rlNum(c.runs, 0, 1e6) + 1;
      delete r.cup;
      title = rank <= 3 ? `${RL_TROPHY[rank]} trophy!` : `You raced the whole ${cup.name}!`;
      win = rank <= 3;
      if (rank <= 3) pic = `<div class="rl-epic">${rlCupSVG(rlTrophyHue(rank), 'rl-etro')}</div>`;
      lines.push(['trophy', rank <= 3 ? `You won the ${RL_TROPHY[rank].toLowerCase()} trophy in the ${esc(cup.name)}!` : `${rlOrd(rank)} in the cup. Race it again for a trophy!`]);
    }
  }
  r.spk += pay;
  r.races++;
  save();
  rlStop();
  gtStop();
  RL_CUPS.forEach((c, i) => { if (rlCupOpen(i, r) && !openCups[i]) lines.push(['sparkle', `New cup open: ${esc(c.name)}! Its tracks are open too.`]); });
  for (const b of RL_BODIES) if (rlBodyOpen(b[0], r) && !bodies.includes(b[0])) lines.push(['car', `New car in the garage: ${esc(b[1])}!`]);
  if (!trial && P.hits) lines.push(['replay', `${P.hits} ${P.hits == 1 ? 'spin' : 'spins'} this race. ${P.hits > 2 ? 'Steer round the cones, rails and animals to go faster!' : ''}`]);
  if (!trial && P.place > 3 && !cup) lines.push(['hint', st.mode == 'pro' ? 'Tip: drift through the bends, then let go to zoom.' : 'Tip: drive over the orange pads and grab the stars to zoom past.']);
  const time = ptLeft() > 0, nextC = cup && !final;
  const next = RL_ORDER[RL_ORDER.indexOf(tid) + 1], nextOk = !cup && !trial && next && rlTrackOpen(next, r) && !r.stars[next];
  const o = GH.end('rally', { win, title, stars: n, tag, pic: pic || undefined, stats, lines, extra,
    btns: (time ? (nextC ? UI.btn(`Race ${r.cup.i + 1} of 3`, { kind: 'primary', size: 'lg', icon: 'arrow-right', id: 'rlnextc', wide: true }) :
      UI.btn(final ? 'Race the cup again' : 'Race again', { kind: 'primary', size: 'lg', icon: 'replay', id: 'rlagain', wide: true })) +
      (nextOk ? UI.btn('Next track', { icon: 'arrow-right', id: 'rlnext', wide: true }) : '') :
      UI.btn('Earn more game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'rllearn', wide: true })) +
      UI.btn(cup ? 'Cups' : 'Tracks', { icon: 'map', id: 'rlmenu', wide: true }) });
  if (S.voice) say(final && rank <= 3 ? `${RL_TROPHY[rank]} trophy! Well done, ${S.name}!` : trial ? (rec ? 'New best lap!' : 'Good driving!') :
    P.place == 1 ? `You won! Well done, ${S.name}!` : P.place <= 3 ? `${rlOrd(P.place)} place! Great racing!` : 'You finished the race! Well done!');
  const go = f => { o.remove(); f(); };
  const ci = cup ? RL_CUPS.indexOf(cup) : -1;
  if (o.querySelector('#rlnextc')) o.querySelector('#rlnextc').onclick = () => go(() => (ptLeft() > 0 ? rlCupGo(ci) : rlMenu()));
  if (o.querySelector('#rlagain')) o.querySelector('#rlagain').onclick = () => go(() => (cup ? rlCupGo(ci) : rlRace(tid, { trial })));
  if (o.querySelector('#rlnext')) o.querySelector('#rlnext').onclick = () => go(() => rlRace(next));
  if (o.querySelector('#rllearn')) o.querySelector('#rllearn').onclick = () => go(() => home());
  o.querySelector('#rlmenu').onclick = () => go(() => rlMenu(t.place));
}

// The Game Room card (59-game-hub.js shows it after the other three)
GH.reg({
  id: 'rally', btn: 'grally', name: 'Star Rally', icon: 'car', p: 'math', sky: ['sky-1', 'sky'], art: () => RL_ART.hub(),
  sub: () => {
    const r = rlPeek(), n = rlStarsAll(r);
    return n || r.spk ? `<span>${ico('trophy', 18)}<b>${rlTrophies(r)}</b> of 4 cups</span><span>${ico('star', 18)}<b>${n}</b> of 36 stars</span>`
      : '<span>Race the animals: 4 cups, 12 tracks</span>';
  },
  open: () => rlMenu(), tapToPlay: '.rl-trk[data-ok="1"]', saved: 'Your sparkles are saved.',
});
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
   {coins, days, served, stars: {place: 0-3}, combo, own: {id: 1}, awn, sign, ctr, place, mode, till}. */

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
};
const SN_STATIONS = [['sand', 'Sandwich', 'bread'], ['ice', 'Ice cream', 'van'], ['juice', 'Drinks', 'apple'], ['treat', 'Treats', 'cookie'],
  ['grill', 'Grill', 'pancake']];
const SN_FILL = ['cheese', 'tomato', 'lettuce', 'egg']; // sandwich fillings (bread goes on both sides)
const SN_FREE = ['bread', 'cheese', 'van', 'apple', 'cookie']; // on the menu from the first day
// places: [id, name, stars needed, sky tokens, customers, special food]
const SN_PLACES = [
  { id: 'park', name: 'Sunny Park', need: 0, sky: ['sky-1', 'sky'], who: ['cat', 'dog', 'rabbit', 'duck', 'mouse', 'fox'], sp: '' },
  { id: 'beach', name: 'Sandy Beach', need: 2, sky: ['sea-1', 'sea'], who: ['crab', 'turtle', 'duck', 'frog', 'pig', 'chick'], sp: 'orange' },
  { id: 'snow', name: 'Snowy Hill', need: 5, sky: ['blue', 'sky-1'], who: ['sheep', 'owl', 'bear', 'rabbit', 'fox', 'hen'], sp: 'cocoa' },
  { id: 'fair', name: 'The Fair', need: 8, sky: ['dusk', 'dusk-1'], who: ['lion', 'elephant', 'giraffe', 'horse', 'pig', 'cow'], sp: 'pizza' },
  { id: 'moon', name: 'The Moon', need: 11, sky: ['night', 'night-1'], who: ['owl', 'mouse', 'cat', 'bear', 'dog', 'frog'], sp: 'starc' },
];
const SN_WHO = {
  cat: 'Mimi', dog: 'Rufus', rabbit: 'Bo', duck: 'Dot', mouse: 'Nibbles', fox: 'Fern', crab: 'Clack', turtle: 'Shelly', frog: 'Fizz',
  pig: 'Rosie', chick: 'Peep', sheep: 'Woolly', owl: 'Hoot', bear: 'Bruno', hen: 'Henny', lion: 'Leo', elephant: 'Ellie',
  giraffe: 'Gigi', horse: 'Hazel', cow: 'Daisy',
};
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
// the food a day at this place and in this mode can ask for: owned menu items, the place's special, pancakes only when Busy
function snAvail(own, place, mode) {
  const pl = SN_PLACES.find(p => p.id === place) || SN_PLACES[0], r = { own: own || {} };
  return Object.keys(SN_ING).filter(id => {
    if (SN_PLACES.some(p => p.sp === id)) return id === pl.sp;
    if (id == 'pancake' && mode != 'busy') return false;
    return snOwns(r, id);
  });
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
// a day: 8-10 customers when Calm, 10-12 when Busy; the animals of the place, never the same one twice in a row
function snDayList(o) {
  const rnd = snRng(o.seed), pl = SN_PLACES.find(p => p.id === o.place) || SN_PLACES[0];
  const avail = snAvail(o.own, pl.id, o.mode);
  const n = (o.mode == 'busy' ? 10 : 8) + Math.floor(rnd() * 3), list = [];
  let last = '';
  for (let i = 0; i < n; i++) {
    let who = snPick(rnd, pl.who);
    if (who == last) who = pl.who[(pl.who.indexOf(who) + 1) % pl.who.length];
    last = who;
    const order = snOrder(rnd, avail, o.mode, pl.id), price = snPrice(order);
    list.push({ i, who, name: SN_WHO[who], order, price, paid: snPaid(price), pat: 26 + 7 * order.length });
  }
  return list;
}
// a small goal for the day (a skill to try; worth 5 coins)
function snGoal(rnd, mode, till, own) {
  const g = [['first', 'Get 5 orders right the first time', 5], ['combo', 'Make 3 perfect orders in a row', 3]];
  if (mode == 'busy') g.push(['hearts', 'Serve 6 customers while their heart is still full of love', 6]);
  if (mode == 'busy' && snOwns({ own }, 'pancake')) g.push(['gold', 'Cook 2 golden pancakes', 2]);
  if (till) g.push(['change', 'Give the right change 3 times', 3]);
  return snPick(rnd, g);
}
// stars for a day: orders right the first time
const snStarsFor = (right, n) => (n && right / n >= .9 ? 3 : n && right / n >= .6 ? 2 : 1);

/* ---- the day simulation (no DOM). o: {seed, mode, place, own, grade, till, slots} ---- */
const SN_COOK = [3, 7]; // a pancake is golden from 3 s to 7 s on the grill; later it is toasty (never burnt)
function snNew(o) {
  const mode = o.mode == 'busy' ? 'busy' : 'calm', seed = (o.seed >>> 0) || 1;
  const list = snDayList({ seed, mode, place: o.place || 'park', own: o.own || {} });
  const g = snGoal(snRng(seed * 7 + 3), mode, !!o.till, o.own || {});
  return {
    seed, mode, place: o.place || 'park', till: !!o.till, list, n: list.length, next: 0, at: [], sel: 0,
    slots: mode == 'busy' ? Math.max(2, Math.min(3, o.slots || 2)) : 1, clock: 0, nextAt: .6,
    plate: [], pq: [], pans: [null, null], served: 0, right: 0, combo: 0, best: 0, coins: 0, hearts: 0, golds: 0, changes: 0,
    goal: { id: g[0], text: g[1], need: g[2], got: 0, done: false }, pay: null, done: false, ev: [],
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
    st.nextAt = st.mode == 'calm' ? 1e9 : st.clock + (st.at.length < 2 ? 2.5 : 7 + snRng(st.seed + st.next)() * 4);
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
  st.plate.push(id);
  return true;
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
// serve the plate: to the customer whose order it is, else it is a try for the chosen one
function snServe(st) {
  if (!st.plate.length || st.pay) return { empty: true };
  const wait = st.at.filter(c => c.state == 'wait');
  if (!wait.length) return { empty: true };
  const key = snKey(st.plate);
  const c = wait.find(x => snKey(x.order) === key);
  if (!c) {
    const t = st.at[st.sel] && st.at[st.sel].state == 'wait' ? st.at[st.sel] : wait[0];
    t.tries++;
    st.combo = 0;
    return Object.assign({ ok: false, c: t }, snDiff(t.order, st.plate));
  }
  const first = !c.tries, heart = st.mode == 'calm' || c.pat > 0;
  const gold = st.pq.every(q => q == 'gold');
  const perfect = first && heart && gold;
  const tip = !first ? 0 : st.mode == 'busy' ? (heart ? 2 : 0) + (st.pq.length && gold ? 1 : 0) : 1;
  if (first) st.right++;
  st.combo = perfect ? st.combo + 1 : 0;
  st.best = Math.max(st.best, st.combo);
  const bonus = perfect && st.combo % 3 == 0 ? 3 : 0;
  const pay = c.price + tip + bonus;
  st.coins += pay;
  st.golds += st.pq.filter(q => q == 'gold').length;
  if (first) snGoalAdd(st, 'first');
  if (st.combo >= 3) snGoalAdd(st, 'combo', 3);
  if (st.mode == 'busy' && c.pat > 0) {
    st.hearts++;
    snGoalAdd(st, 'hearts');
  }
  snGoalAdd(st, 'gold', st.pq.filter(q => q == 'gold').length);
  const pq = st.pq.slice();
  st.plate = [];
  st.pq = [];
  st.served++;
  c.state = 'happy';
  c.leave = st.clock + 1.4;
  if (st.till) {
    c.state = 'pay';
    st.pay = { c, price: c.price, paid: c.paid, change: c.paid - c.price, tries: 0 };
  }
  return { ok: true, c, first, perfect, tip, bonus, pay, pq };
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
};
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
  const sand = by('sand'), ice = by('ice'), jui = by('juice'), tr = by('treat'), pan = plate.filter(id => id == 'pancake');
  if (sand.length) groups.push(['sand', 74]);
  if (pan.length) groups.push(['pan', 62]);
  if (ice.length) groups.push(['ice', 40]);
  for (const id of jui) groups.push(['juice', 44, id]);
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
  let pic = ghShad(120, 97, 84, 3.4, .14) +
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
  }
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
  const busy = r.mode == 'busy';
  view(`${GH.top('snack')}<div class="scroll sn-menu">
  <section class="sn-hero" style="--gh-a:var(--sc-${pl.sky[0]});--gh-b:var(--sc-${pl.sky[1]})"><div class="sn-hpic">${snStandSVG({ r, deco: true })}</div>
   <div class="sn-hinfo"><p class="sn-hl">${ico('coin', 26, 'ic-coin')}<b>${r.coins}</b> coins</p><p class="sn-hl">${ico('star', 26)}<b>${stars}</b> of 15 stars</p>
   ${UI.btn('Open the stand', { kind: 'primary', size: 'lg', icon: 'play', id: 'snopen', wide: true })}
   ${UI.btn('Stand shop', { icon: 'bag', id: 'snshop', wide: true })}</div></section>
  <h2 class="sn-h">Where to open today</h2><div class="sn-places">${SN_PLACES.map(pcard).join('')}</div>
  <section class="sn-opts"><h2 class="sn-h">How busy?</h2>
   <div class="sn-mode">${UI.seg([['calm', 'Calm'], ['busy', 'Busy']], r.mode, { id: 'snmode', label: 'How busy' })}
   <p>${busy ? 'Busy: two or three animals at once, bigger orders and pancakes. Serve them before their heart runs out for a tip!' :
    'Calm: one animal at a time. Take as long as you like.'}</p></div>
   ${snTillOK() ? UI.sw('Give change: count the coins back to the customer', r.till, 'sntill') : ''}
   <ul class="sn-how">${[['food', 'Look at the order in the bubble.'], ['plus', 'Tap the food to put it on the plate. Undo takes the last one off.'],
    ['check', 'Tap Serve! Right the first time earns a tip.'], ['bag', `Buy new food and decorations in the shop (${owned} of ${SN_SHOP.length}).`]]
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
    const y = $('.scroll').scrollTop;
    snMenu();
    $('.scroll').scrollTop = y;
  });
  UI.segOn($('#snmode'), v => {
    r.mode = v;
    save();
    const y = $('.scroll').scrollTop;
    snMenu();
    $('.scroll').scrollTop = y;
  });
  if ($('#sntill')) $('#sntill').onchange = e => { r.till = e.target.checked; save(); };
}

/* ---- the stand shop: tap a thing to see its price and what is left; Buy / Not now ---- */
function snItemPic(id) {
  const it = SN_SHOP.find(x => x[0] === id) || ['', id.split('-')[0]];
  if (it[1] == 'menu') return snPic(id);
  if (it[1] == 'awn') return `<svg class="art" viewBox="0 0 96 46" aria-hidden="true" focusable="false">${snAwning(2, id.slice(4)).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>`;
  if (it[1] == 'sign' || it[1] == 'ctr') return snStandSVG({ r: { awn: 'r', sign: it[1] == 'sign' ? id.slice(5) : 'wood', ctr: it[1] == 'ctr' ? id.slice(4) : 'wood' }, cust: false });
  return `<svg class="art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${SN_DECO[id]()}</svg>`;
}
function snShop(sel) {
  const r = snS();
  let bar = '';
  if (sel) {
    const it = SN_SHOP.find(x => x[0] === sel), left = r.coins - it[3];
    bar = `<div class="sn-buy" role="group" aria-label="Buy"><span class="sn-bpic">${snItemPic(sel)}</span><div class="sn-btxt"><p><b>${esc(it[2])}</b> for ` +
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
  const all = SN_SHOP.filter(x => r.own[x[0]]).length;
  view(`${GH.top('snack', { sub: 'Stand shop', chips: snCoinChip(r.coins) })}<div class="scroll sn-shop">
  <section class="sn-shero" style="--gh-a:var(--sc-sky-1);--gh-b:var(--sc-sky)">${snStandSVG({ r, deco: true })}${bar}</section>
  <p class="sn-note">${all == SN_SHOP.length ? 'Your stand is complete! Keep playing for stars.' :
    `${all} of ${SN_SHOP.length} things bought. Everything is earned by serving customers. Decorations show on your stand.`}</p>
  ${SN_GROUPS.map(group).join('')}</div>`);
  GH.wire({ back: () => snMenu() });
  $$('.sn-item').forEach(b => b.onclick = () => {
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
    SFX.pop(1);
    snShop(id);
    const s = $('.sn-shop');
    if (s) s.scrollTop = 0;
  });
  if (sel) {
    $('#snno').onclick = () => snShop();
    $('#snbuy').onclick = () => {
      if (!snBuy(sel)) {
        SFX.wrong();
        return;
      }
      save();
      SFX.fanfare();
      const it = SN_SHOP.find(x => x[0] === sel);
      fb(it[1] == 'menu' ? `${it[2]} is on the menu now!` : 'It is on your stand!', 'good', 1800);
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

function snDay() {
  const r = snS(), pl = SN_PLACES.find(p => p.id === r.place), mode = r.mode, till = r.till && snTillOK();
  const st = snNew({ seed: ((Date.now() & 0xffffff) ^ (r.days * 7919)) >>> 0 || 1, mode, place: pl.id, own: r.own, till, slots: innerWidth >= 560 ? 3 : 2 });
  const stations = SN_STATIONS.filter(([k]) => snAvail(r.own, pl.id, mode).some(id => SN_ING[id][1] == k));
  const deco = Object.keys(SN_DECO_SPOT).filter(k => r.own[k]);
  view(`${GH.top('snack', { play: true, sub: pl.name, chips: snCoinChip(r.coins) })}
  <div class="sn sn-${mode} sn-c-${r.ctr}" id="sn">
   <div class="sn-scene" style="--gh-a:var(--sc-${pl.sky[0]});--gh-b:var(--sc-${pl.sky[1]})">
    <svg class="art sn-back" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${SN_BACK[pl.id]()}</svg>
    <div class="sn-awnw" id="snawn"></div>
    ${r.own.bunting ? '<div class="sn-bunt" id="snbunt"></div>' : ''}
    <div class="sn-sign sn-s-${r.sign}" id="snsign"><span class="sn-sf">Snack Stand</span><span class="sn-sb">Closed</span>` +
    `<small class="sn-cust" id="sncust" aria-label="Customers served"><b>0</b> of ${st.n} served</small></div>
    ${r.own.bird ? `<span class="sn-bird">${snPicSVG(SN_DECO.bird())}</span>` : ''}
    ${deco.map(k => `<span class="sn-deco sn-d-${k} sn-${SN_DECO_SPOT[k]}">${snPicSVG(SN_DECO[k]())}</span>`).join('')}
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
  SN = { st, r, pl, stations, tab: stations[0][0], last: snNow(), iv: 0, paused: false, tray: [], drag: null, ghost: null, said: 0 };
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
  if (r.days) snMsg(`Today's goal: ${st.goal.text}.`, 3200);
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
}
function snTabs() {
  const ings = snAvail(SN.r.own, SN.pl.id, SN.st.mode).filter(id => SN_ING[id][1] == SN.tab);
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
// the customers at the counter: the animal (a button: choose who you make it for), the order bubble, the patience heart
function snLine() {
  const st = SN.st, line = $('#snline');
  if (!line) return;
  const big = st.mode == 'calm';
  line.className = 'sn-line n' + Math.max(1, st.slots) + (big ? ' big' : '');
  line.innerHTML = st.at.map((c, i) => {
    const ticks = snTicks(c.order, i === st.sel ? st.plate : []);
    const icons = c.order.map((id, j) => `<span class="sn-oi${ticks[j] ? ' ok' : ''}" data-oi="${id}">${snPic(id)}${ticks[j] ? `<i>${ico('check', 18)}</i>` : ''}</span>`).join('');
    const heart = st.mode == 'busy' ? `<span class="sn-heart${c.pat > 0 ? '' : ' out'}" aria-hidden="true">${ico('heart', 20)}` +
      `<span class="sn-hbar"><i style="transform:scaleX(${(c.pat / c.patMax).toFixed(3)})"></i></span></span>` : '';
    return `<div class="sn-cu${c.state != 'wait' ? ' happy' : ''}${i === st.sel && st.at.length > 1 ? ' sel' : ''}" data-ci="${i}" data-who="${c.who}">` +
      (c.state == 'wait' ? `<div class="sn-bub n${c.order.length}">${icons}</div>${heart}` :
        `<div class="sn-bub yum">${ico('heart', 26)}<span>${c.state == 'pay' ? 'Here you are!' : SN_YUM[(c.i + st.seed) % SN_YUM.length]}</span></div>`) +
      `<button class="sn-an" data-ci="${i}" aria-label="${esc(c.name + ' the ' + c.who)}${c.state == 'wait' ? ': make my order' : ''}">${picArt(c.who, '100%')}</button></div>`;
  }).join('');
  for (const b of $$('.sn-an')) b.onclick = () => {
    const i = +b.dataset.ci;
    if (SN.st.at[i] && SN.st.at[i].state == 'wait' && SN.st.sel !== i) {
      SN.st.sel = i;
      SFX.pop(1);
      snLine();
    } else if (SN.st.at[i] && S.voice && SN.st.at[i].state == 'wait') say(snSay(SN.st.at[i].order));
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
  p.innerHTML = snPlateArt(SN.st.plate, SN.st.pq) + (SN.st.plate.length ? '' : `<span class="sn-ph">${SN.r.days ? 'Your plate' : 'Tap the food below'}</span>`);
  $('#snundo').disabled = !SN.st.plate.length;
  $('#snserve').disabled = !SN.st.plate.length || !SN.st.at.some(c => c.state == 'wait');
  // ticks on the chosen customer's order
  const c = SN.st.at[SN.st.sel], cu = c && $(`.sn-cu[data-ci="${SN.st.sel}"]`);
  if (cu && c.state == 'wait') {
    const t = snTicks(c.order, SN.st.plate);
    cu.querySelectorAll('.sn-oi').forEach((e, j) => {
      e.classList.toggle('ok', t[j]);
      const has = e.querySelector('i');
      if (t[j] && !has) e.insertAdjacentHTML('beforeend', `<i>${ico('check', 18)}</i>`);
      if (!t[j] && has) has.remove();
    });
  }
}
function snAddFood(id) {
  if (!SN || SN.st.pay) return;
  const ok = snAdd(SN.st, id);
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
  const pl = $('#snplate');
  if (pl) {
    pl.classList.remove('bump');
    void pl.offsetWidth;
    pl.classList.add('bump');
  }
}
// tap a food, or drag it onto the plate
function snDragWire() {
  const box = $('#snings');
  box.addEventListener('click', e => {
    const b = e.target.closest('.sn-ing');
    if (!b || !SN) return;
    // a drop already put the food on the plate: the click (and the mouse-compatibility press) the same finger leaves behind
    // comes within 0.4 s of the drop and is ignored; times are the events' own, so no app clock can stretch them
    if (SN.dropT != null && e.timeStamp - SN.dropT < 400) return;
    snAddFood(b.dataset.ing);
  });
  box.addEventListener('pointerdown', e => {
    const b = e.target.closest('.sn-ing');
    if (!b || !SN) return;
    SN.drag = { id: b.dataset.ing, x: e.clientX, y: e.clientY, on: false, pid: e.pointerId };
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
  const d = SN && SN.drag;
  if (!d || e.pointerId !== d.pid) return;
  if (!d.on && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 12) {
    d.on = true;
    SN.ghost = document.createElement('div');
    SN.ghost.className = 'sn-ghost';
    SN.ghost.innerHTML = snPic(d.id);
    document.body.appendChild(SN.ghost);
  }
  if (d.on && SN.ghost) SN.ghost.style.transform = `translate(${e.clientX - 36}px,${e.clientY - 36}px)`;
}
function snDragEnd(e) {
  const d = SN && SN.drag;
  if (!d || e.pointerId !== d.pid) return;
  SN.drag = null;
  if (!d.on) return;
  SN.dropT = e.timeStamp; // clicks on a food within 0.4 s of this are the same finger (see snDragWire)
  if (SN.ghost) SN.ghost.remove();
  SN.ghost = null;
  // dropped on the counter (the plate's row) or above it: on the plate
  const c = $('.sn-counter'), r = c && c.getBoundingClientRect();
  if (r && e.clientY <= r.bottom + 8) snAddFood(d.id);
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
    snMsg(res.extra.length && !res.missing.length ? 'Oops, a little too much! Tap Undo to take some off.' :
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
  save();
  const chip = $('#sncoin');
  if (chip) UI.setChip(chip, SN.r.coins);
  const cs = $('#sncust b');
  if (cs) cs.textContent = st.served;
  let m = `+${res.pay} coins`;
  if (res.bonus) m = `Combo ${st.combo}! +${res.pay} coins`;
  else if (res.tip) m += ` (tip +${res.tip})`;
  snMsg(m, 1600, 'good');
  if (st.sel >= st.at.length || st.at[st.sel].state != 'wait') st.sel = Math.max(0, st.at.findIndex(c => c.state == 'wait'));
  snLine();
  snPlate();
  const an = $(`.sn-cu[data-ci="${st.at.indexOf(res.c)}"] .sn-an`);
  if (an) {
    const b = an.getBoundingClientRect();
    burst(b.left + b.width / 2, b.top + b.height * .3, 'heart');
  }
  if (st.pay) snTill();
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
      if (S.voice) say(SN_HI[c.i % SN_HI.length] + ' ' + snSay(c.order));
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
    }
    if (k == 'closed') return snClose();
  }
  st.ev.length = 0;
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
  const st = SN.st, r = snS(), pl = SN.pl;
  const before = SN_PLACES.filter(p => snPlaceOpen(p, r)).map(p => p.id);
  const stars = snStarsFor(st.right, st.n), had = r.stars[pl.id] || 0;
  r.stars[pl.id] = Math.max(had, stars);
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
  for (const p of SN_PLACES) if (snPlaceOpen(p, r) && !before.includes(p.id)) lines.push(['sparkle', `New place: ${esc(p.name)}!`]);
  if (stars < 2) lines.push(['hint', 'Tip: look at every picture in the bubble before you tap Serve.']);
  const next = SN_SHOP.find(x => !r.own[x[0]]);
  if (next) lines.push(['bag', r.coins >= next[3] ? `You can buy ${esc(next[2])} in the shop!` : `${esc(next[2])} costs ${next[3]} coins in the shop.`]);
  const time = ptLeft() > 0;
  const o = GH.end('snack', { win: true, title: 'Closed for today!', stars,
    pic: `<svg class="art gh-art" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">` +
      `${snStandArt({ r, closed: true, deco: true })}</svg>`,
    tag: rec ? 'Best combo ever!' : '',
    stats: [[String(st.served), 'customers', 'users'], ['+' + (st.coins + goal), 'coins', 'coin'], [String(st.best), 'best combo', 'flame']],
    lines,
    btns: (time ? UI.btn('Play another day', { kind: 'primary', size: 'lg', icon: 'replay', id: 'snagain', wide: true }) :
      UI.btn('Earn more game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'snlearn', wide: true })) +
      UI.btn('Stand shop', { icon: 'bag', id: 'snendshop', wide: true }) + UI.btn('Menu', { icon: 'home', id: 'snmenu', wide: true }) });
  if (S.voice) say(`The stand is closed! You served ${st.served} customers. Well done, ${S.name || 'friend'}!`);
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#snagain')) o.querySelector('#snagain').onclick = () => go(() => {
    if (ptLeft() <= 0) return snMenu();
    snDay();
  });
  if (o.querySelector('#snlearn')) o.querySelector('#snlearn').onclick = () => go(() => home());
  o.querySelector('#snendshop').onclick = () => go(() => snShop());
  o.querySelector('#snmenu').onclick = () => go(() => snMenu());
}

// The Game Room card (59-game-hub.js shows it after the games file's games)
GH.reg({
  id: 'snack', btn: 'gsnack', name: 'Snack Stand', icon: 'food', p: 'bt', sky: ['sky-1', 'sky'], art: () => snHubArt(),
  sub: () => {
    const r = snPeek(), n = snStarsAll(r);
    return r.days ? `<span>${ico('star', 18)}<b>${n}</b> of 15 stars</span><span>${ico('coin', 18, 'ic-coin')}<b>${snNum(r.coins, 0, 1e7)}</b> coins</span>`
      : '<span>Make snacks for animal customers</span>';
  },
  open: () => snMenu(), tapToPlay: '#snopen', saved: 'Your coins are saved.',
});
/* ---------- Sky Hop: bounce your pet through short obstacle courses in the clouds (G-04b; CSS src/css/49-game-skyhop.css) ----------
   An original Star School game (docs/GAMES_RESEARCH.md, "Game B"). Both files go into games2.<VER>.js (tools/build.py PARTS) and
   load after games.<VER>.js, so GH.reg, the gh* drawing helpers and Star Rally's colour helpers (rlCol, rlRes) are there.

   How it plays
   - The hero is the child's own drawn pet (the pet rig, 17-pets-svg.js, wearing its hat and toy), drawn once into a picture.
     It bounces along puffy cloud paths to a checkered flag and looks for 3 stars hidden off the main path.
   - One-touch (the default up to 2nd grade): the pet runs by itself; tap anywhere to hop; hold to float down slowly; from
     Windy Peaks on, a tap in the air is a second hop. Free move (the default from 3rd grade; a switch on the menu): left and
     right buttons and a jump button; a short press is a small hop, a long press a big one; go back for a missed star.
   - Kind timing: a hop still works a moment after running off an edge, and a tap just before landing counts.
   - 24 courses of 40 to 90 seconds in four drawn worlds (Cloud Meadow, Windy Peaks, Starry Night, Rainbow Bridge). Each world
     adds one thing: flower springs, wind (gusts and updrafts), moving kite clouds, switches that open gates. A course opens when
     the one before it is finished. Stars open sparkle trails for the pet (cosmetic).
   - No lives, no game over: a fall puts the pet back on the last cloud checkpoint in a second; after 3 falls from the same
     checkpoint a friendly helper balloon offers a lift to the next one (the child can say no). Friendly puffs only bounce the
     pet back a little. Time medals are fixed targets per course plus the child's own best time; nobody else's times.
   - Nothing changes while the app is closed, nothing is random, no streaks, no ads.

   Code: worlds and courses (a short text format, hopBuild), the simulation (hopNew, hopStep, hopHelp, hopClone: no DOM, fixed
   1/60 s step, deterministic; the tests play every course with bots), the drawings (SVG in the --a-* roles, object-art style
   DESIGN_SYSTEM 6.5, made once into canvases with the colours read from the tokens), the canvas renderer and the screens.
   Game time: exactly like the other games (ptLeft() before a course, gtStart while it runs, held by the pause sheet, the shared
   time-up card). view() stops the course through hopStop().
   Save: S.hop (created when the game is first opened; old saves load unchanged), read field by field by hopS():
   {runs, best: {course: ms}, stars: {course: 0-7 bits}, medal: {course: 0-3}, mode, world, trail}. */

const HOP_DEV = { fast: 1 }; // test hook (smoke): the course runs this many times faster

/* ---- physics (units: tiles; y goes up; seconds) ---- */
const HOP_DT = 1 / 60;
const HOP_P = {
  G: 38, // gravity
  RUN: 5, // one-touch: the speed the pet runs by itself
  FREE: 6.2, // free move: top speed
  JUMP: 13.5, // hop (about 2.4 tiles high)
  JUMP2: 11.5, // the second hop in the air (from Windy Peaks)
  LOW: 5, // free move: letting go early cuts the hop to this speed
  SPRING: 20, // a flower spring (about 5 tiles high)
  FLOAT: -2.6, // holding: fall no faster than this
  FALL: -20,
  COY: 0.12, // a hop still works this long after running off an edge
  BUF: 0.16, // a tap this long before landing still counts
  PW: 0.8, // the pet's box
  PH: 1.2,
  LIFT: 60, // an updraft pushes up this hard
  KILL: -5, // below this the pet has fallen
};

/* ---- worlds and courses ----
   A course is a list of tokens read left to right with a cursor x and a ground height h:
     F<n> a cloud floor n tiles wide      B<n> a bridge (wood; a rainbow in Rainbow Bridge)   G<n> a gap of n tiles
     U<n> / D<n> the next floor is n higher / lower   S a 1-tile floor with a flower spring
     H<w>,<a> a kite cloud w wide that glides a tiles to and fro (fills w+a)   V<w>,<a> one that rises a tiles and back (fills w)
     W<n>,<s> wind over the next n tiles (s tiles a second; minus blows against you)   L<n>,<t> an updraft over the next n tiles, t high
     P<dx>,<dy> a friendly puff   K a 2-tile floor with a switch   X a 1-tile floor with a gate (opened by the last switch)
     R the place a closed gate bounces you back to   *<dx>,<dy> a hidden star   f<w>,<dx>,<dy> a side cloud
     o<n> a row of n sparkles   C a checkpoint (more are added every ~36 tiles)   E the end: a floor with the flag
   Phrases (HOP_PH) are named bits of course; a course's plan is phrase names and plain tokens. */
const HOP_WORLDS = [
  { id: 'meadow', name: 'Cloud Meadow', sky: ['sky-1', 'sky'], cloud: ['w', 'w2', 'w3'], dj: false, adds: 'Flower springs' },
  { id: 'peaks', name: 'Windy Peaks', sky: ['blue', 'sky-1'], cloud: ['w', 'c1', 'c'], dj: true, adds: 'Wind and a second hop' },
  { id: 'night', name: 'Starry Night', sky: ['night', 'night-1'], cloud: ['v1', 'v', 'v2'], dj: true, adds: 'Kite clouds that move' },
  { id: 'rainbow', name: 'Rainbow Bridge', sky: ['candy-1', 'candy'], cloud: ['w', 'p1', 'p'], dj: true, adds: 'Switches and gates' },
];
const HOP_PH = {
  // Cloud Meadow
  gap: 'F6 G2 F5', gap3: 'F5 G3 F4', up: 'F4 U1 F5', down: 'F4 D1 F5', step: 'F4 U1 F4 U1 F5 D2 F5',
  stones: 'F3 G2 F2 G2 F2 G2 F4', hole: 'F5 G2 F3 G3 F5', puff: 'F3 P3,1.2 F7', puffs: 'F3 P2,1.2 F5 P3,1.2 F6',
  spring: 'F4 S G2 U3 F5 D3 F4', springg: 'F4 S G4 F5', ledge: 'F4 U2 F5 D2 F4',
  row: 'o5 F7', bridge: 'F3 B6 F4', ups: 'F3 U1 F3 U1 F3 D1 F3 D1 F4',
  starHigh: 'F4 S *2.6,5.2 F6', starLow: 'F5 f3,1,-3.2 *2.3,-2 G4 F2 U1 F5 D1', starNook: 'F4 f3,1.5,2.2 *2.8,3.2 F6',
  starArc: 'F5 G3 *-1.6,3.4 F5', starSpring: 'F3 S f3,2,5 *3.5,6 F7',
  // Windy Peaks
  wind: 'W12,-2 F12', gust: 'W8,2.5 F4 G4 F5', lift: 'F4 L7,6 G7 F5', liftHi: 'F4 L6,7 G6 U3 F5 D3', dbl: 'F4 G5 F5',
  dblUp: 'F4 U3 F5 D3', windGap: 'W10,-1.5 F4 G2 F5', starLift: 'F4 L6,8 *3,7 G6 F5', starDbl: 'F5 *2.5,4.4 F4',
  // Starry Night
  kite: 'F4 H3,4 F5', kiteV: 'F4 V3,3 G1 U3 F5 D3', kites: 'F4 H3,3 F2 H3,3 F5', kiteHi: 'F4 V3,4 G1 U4 F6 D4',
  starKite: 'F4 V3,5 *1.5,7.2 G1 F5', starKiteH: 'F4 H3,5 *4,4 F5',
  // Rainbow Bridge
  gate: 'F3 R F3 U1 K D1 F2 X F5', gateHi: 'F3 R F2 U2 K D2 F2 X F5', gateLow: 'F3 R F2 G2 U1 K D1 F2 X F5',
  rbow: 'F3 B7 F4', starGate: 'F3 R F2 U2 K *1,2.5 D2 F2 X F5',
};
// [id, name, world, gold target in seconds (the one-touch bot of tools/test.js with no falls, plus 3 s), plan]
const HOP_COURSES = [
  ['m1', 'First Hops', 0, 48, 'F8 gap row gap3 up down puff gap stones row gap starHigh bridge gap3 starArc up down hole starNook E'],
  ['m2', 'Puffy Path', 0, 48, 'F8 gap puff hole row stones up down gap3 starArc puffs gap bridge step starLow gap starHigh E'],
  ['m3', 'Spring Garden', 0, 46, 'F8 spring gap puff springg row starSpring gap3 step stones spring puffs starArc hole starHigh E'],
  ['m4', 'Sunny Steps', 0, 45, 'F8 ups gap3 springg starNook step puff spring stones row ledge starLow hole gap3 starSpring E'],
  ['m5', 'Daisy Drops', 0, 53, 'F8 stones springg puffs ledge starHigh gap3 hole spring row ups starLow step gap3 springg puff starSpring E'],
  ['m6', 'Meadow Run', 0, 56, 'F8 hole spring puffs stones ups starSpring gap3 springg ledge row starLow step puff spring hole gap3 starNook E'],
  ['p1', 'Breezy Start', 1, 50, 'F8 wind dbl gap3 row lift starDbl up gust down stones starLift spring dbl starHigh lift gust dbl E'],
  ['p2', 'Updraft Hill', 1, 51, 'F8 lift dblUp windGap starLift puff liftHi row gust dbl starDbl stones lift spring starHigh lift gust dbl E'],
  ['p3', 'Gusty Gaps', 1, 53, 'F8 gust windGap dbl lift starDbl puffs liftHi wind hole springg starLift dblUp gust starSpring lift gust dbl E'],
  ['p4', 'Kite Valley', 1, 57, 'F8 windGap liftHi dbl starDbl gust stones lift puff dblUp starLift wind spring hole liftHi starHigh lift gust dbl E'],
  ['p5', 'Peak Path', 1, 57, 'F8 dblUp gust lift starLift ledge windGap dbl puffs liftHi starDbl springg wind gap3 lift dblUp starSpring lift gust dbl E'],
  ['p6', 'Top of the Wind', 1, 57, 'F8 liftHi gust dbl windGap starDbl lift ups puff starLift dblUp wind springg liftHi gust dbl starHigh lift gust dbl E'],
  ['n1', 'Moonlight Kites', 2, 55, 'F8 kite gap3 row kiteV starKite dbl puff kites lift starKiteH stones kiteHi starDbl kite lift kiteV dbl E'],
  ['n2', 'Lantern Lane', 2, 58, 'F8 kiteV kite starKiteH dbl lift puffs kites spring starKite gust kiteHi stones starDbl kite lift kiteV dbl E'],
  ['n3', 'Owl Hollow', 2, 56, 'F8 kites dblUp kiteV starKite windGap kite puff liftHi starKiteH kiteHi dbl springg starLift kite lift kiteV dbl E'],
  ['n4', 'Star Steps', 2, 59, 'F8 kiteHi kite starDbl gust kiteV lift kites starKite puffs dbl kiteV starKiteH springg kite kite lift kiteV dbl E'],
  ['n5', 'Comet Climb', 2, 63, 'F8 kiteV liftHi kites starKiteH dblUp kite gust starKite kiteHi puff lift kites starLift dbl kiteV kite lift kiteV dbl E'],
  ['n6', 'Night Sky High', 2, 61, 'F8 kites kiteHi starKite windGap kiteV dbl starKiteH liftHi kite puffs kiteHi gust kites starDbl kite lift kiteV dbl E'],
  ['r1', 'Rainbow Start', 3, 59, 'F8 rbow gate gap3 row starGate dbl kite lift gateLow starHigh puff rbow gateHi starDbl gate kite liftHi gateLow rbow E'],
  ['r2', 'Candy Gates', 3, 62, 'F8 gate kite rbow starGate lift gateLow puffs dblUp starKite gateHi wind kites starDbl gate kite liftHi gateLow rbow E'],
  ['r3', 'Bridge of Colours', 3, 66, 'F8 rbow gateHi kiteV starGate liftHi gate dbl puffs starLift rbow kites gateLow kiteHi starKiteH gate kite liftHi gateLow rbow E'],
  ['r4', 'Twisty Rainbow', 3, 64, 'F8 gateLow kites starGate windGap gate liftHi rbow starKite kiteV gateHi dbl puffs springg starDbl gate kite liftHi gateLow rbow E'],
  ['r5', 'Sky Castle Road', 3, 64, 'F8 gateHi liftHi kites starGate gust gate kiteV dblUp starKiteH rbow gateLow kiteHi puffs starLift gate kite liftHi gateLow rbow E'],
  ['r6', 'Over the Rainbow', 3, 66, 'F8 gate kiteHi starGate liftHi gateLow kites dblUp starKite rbow gateHi kiteV gust dbl lift starDbl gate kite liftHi gateLow rbow E'],
].map(([id, name, w, gold, plan], i) => ({ id, name, w, gold, plan, i }));
const HOP_BY = {};
for (const c of HOP_COURSES) HOP_BY[c.id] = c;

/* ---- building a course from its plan ---- */
const HOP_BUILT = {};
function hopBuild(id) {
  if (HOP_BUILT[id]) return HOP_BUILT[id];
  const c = HOP_BY[id], W = HOP_WORLDS[c.w];
  const C = { id, c, W, floors: [], movers: [], springs: [], puffs: [], winds: [], lifts: [], stars: [], spk: [], cps: [], pads: [], gates: [],
    side: [], goal: null, L: 0, dj: W.dj };
  const toks = c.plan.split(/\s+/).flatMap(t => (HOP_PH[t] ? HOP_PH[t].split(' ') : [t]));
  let x = 0, h = 2, lastCp = 0, retry = null, pad = null, prevEnd = null;
  const floor = (n, kind) => {
    const f = { x0: x, x1: x + n, y: h, k: kind };
    C.floors.push(f);
    // a checkpoint at the start of a floor every ~36 tiles (none on the first)
    if (n >= 2 && x - lastCp >= 36 && C.cps.length) {
      C.cps.push({ x: x + 1.2, y: h });
      lastCp = x;
    }
    // sparkles arc over the jump from the floor before (a hint where to hop)
    if (prevEnd && x - prevEnd.x >= 2) {
      const a = prevEnd.x, b = x, top = Math.max(prevEnd.y, h) + 1.6 + (b - a) * .12;
      for (let k = 1; k <= 3; k++) {
        const t = k / 4, px = a + (b - a) * t;
        C.spk.push({ x: px, y: prevEnd.y + (h - prevEnd.y) * t + (top - Math.max(prevEnd.y, h)) * 4 * t * (1 - t) + 1 });
      }
    }
    x += n;
    prevEnd = { x, y: h };
    return f;
  };
  C.cps.push({ x: 2, y: h });
  for (const t of toks) {
    const k = t[0], a = t.slice(1).split(',').map(Number), n = a[0] || 0;
    if (k == 'F') floor(n, 'c');
    else if (k == 'B') floor(n, 'b');
    else if (k == 'G') x += n;
    else if (k == 'U') h += n;
    else if (k == 'D') h -= n;
    else if (k == 'S') {
      floor(1, 'c');
      C.springs.push({ x: x - .5, y: h });
    } else if (k == 'H') {
      C.movers.push({ x: x, y: h, w: n, ax: a[1], ay: 0, T: 1.6 + a[1] * .45 });
      x += n + a[1];
      prevEnd = null;
    } else if (k == 'V') {
      C.movers.push({ x: x, y: h, w: n, ax: 0, ay: a[1], T: 1.6 + a[1] * .45 });
      x += n;
      prevEnd = null;
    } else if (k == 'W') C.winds.push({ x0: x, x1: x + n, s: a[1] });
    else if (k == 'L') C.lifts.push({ x0: x, x1: x + n, y0: h - 7, y1: h + a[1] });
    else if (k == 'P') C.puffs.push({ x: x + n, y: h + a[1] });
    else if (k == 'K') {
      floor(2, 'c');
      pad = { x0: x - 1.6, x1: x - .4, y: h, g: C.gates.length };
      C.pads.push(pad);
    } else if (k == 'X') {
      floor(1, 'c');
      C.gates.push({ x0: x - .8, x1: x - .2, y0: h, y1: h + 3.2, back: retry || C.cps[C.cps.length - 1] });
      retry = null;
    } else if (k == 'R') retry = { x: x - .6, y: h };
    else if (k == '*') C.stars.push({ x: x + n, y: h + a[1] });
    else if (k == 'f') C.side.push(C.floors[C.floors.push({ x0: x + a[1], x1: x + a[1] + n, y: h + a[2], k: 's' }) - 1]);
    else if (k == 'o') for (let i = 0; i < n; i++) C.spk.push({ x: x + .5 + i, y: h + 1 });
    else if (k == 'C') {
      C.cps.push({ x: x - 1, y: h });
      lastCp = x;
    } else if (k == 'E') {
      floor(9, 'c');
      C.goal = { x: x - 4, y: h };
    }
  }
  C.L = x;
  // a floor next to a lower one reaches down to it (a step is a wall, not a ledge to walk under)
  for (const f of C.floors) {
    f.dep = 1.2;
    if (f.k != 's') for (const g of C.floors) if (g.k != 's' && (g.x1 == f.x0 || g.x0 == f.x1)) f.dep = Math.max(f.dep, f.y - g.y + 1.2);
  }
  // a floor a kite cloud starts next to: one-touch waits there for it
  for (const f of C.floors) f.mv = C.movers.findIndex(m => Math.abs(m.x - f.x1) < .01 && Math.abs(m.y - f.y) < .01);
  // a column index of the solid floors (collision looks only at the columns under the pet)
  C.col = [];
  for (let i = 0; i <= Math.ceil(x) + 2; i++) C.col.push([]);
  C.floors.forEach((f, j) => {
    for (let i = Math.max(0, Math.floor(f.x0) - 1); i <= Math.min(C.col.length - 1, Math.ceil(f.x1)); i++) C.col[i].push(j);
  });
  // and of the things near each column: kite clouds, springs, puffs, sparkles (the step looks only at these)
  C.near = C.col.map(() => ({ mv: [], sp: [], pf: [], sk: [] }));
  const put = (a, b, k, v) => {
    for (let i = Math.max(0, Math.floor(a) - 2); i <= Math.min(C.near.length - 1, Math.ceil(b) + 2); i++) C.near[i][k].push(v);
  };
  C.movers.forEach((m, j) => put(m.x, m.x + m.w + m.ax, 'mv', j));
  C.springs.forEach(q => put(q.x, q.x, 'sp', q));
  C.puffs.forEach(q => put(q.x, q.x, 'pf', q));
  C.spk.forEach((q, j) => put(q.x, q.x, 'sk', j));
  return (HOP_BUILT[id] = C);
}

/* ---- the simulation (no DOM; the tests play whole courses) ---- */
// a kite cloud's place at time t (it glides with an easy-in-out to and fro)
function hopMover(m, t) {
  const u = .5 - Math.cos(2 * Math.PI * t / m.T) / 2;
  return { x: m.x + m.ax * u, y: m.y + m.ay * u };
}
const hopPuffY = (p, t) => p.y + Math.sin(t * 2.2 + p.x) * .3;
function hopNew(id, o = {}) {
  const C = hopBuild(id), c0 = C.cps[0];
  return {
    C, id, mode: o.mode == 'free' ? 'free' : 'one', t: 0, dj: C.dj,
    p: { x: c0.x, y: c0.y, vx: 0, vy: 0, gr: true, on: -1, jl: 0, coy: 0, buf: 0, held: false, face: 1, kb: 0, hit: 0 },
    cp: 0, cpF: C.cps.map(() => 0), falls: 0, bumps: 0, got: new Uint8Array(C.spk.length), spk: 0, stars: 0, gates: 0,
    wait: 'start', wt: .8, anim: null, offer: -1, helped: 0, done: false, ev: [],
  };
}
function hopClone(st) {
  const s = Object.assign({}, st);
  s.p = Object.assign({}, st.p);
  s.cpF = st.cpF.slice();
  s.got = st.got.slice();
  s.anim = st.anim && Object.assign({}, st.anim);
  s.ev = [];
  return s;
}
// the surfaces under the pet: floors (solid) and kite clouds (land on top only)
function hopSupport(st, x, y, eps) {
  const C = st.C, P = HOP_P, l = x - P.PW / 2 + .06, r = x + P.PW / 2 - .06;
  for (const j of C.col[Math.max(0, Math.min(C.col.length - 1, Math.floor(x)))] || []) {
    const f = C.floors[j];
    if (r > f.x0 && l < f.x1 && Math.abs(y - f.y) <= eps) return j;
  }
  for (const j of hopNear(C, x).mv) {
    const m = C.movers[j], q = hopMover(m, st.t);
    if (r > q.x && l < q.x + m.w && Math.abs(y - q.y) <= eps) return 1000 + j;
  }
  return -1;
}
const hopNear = (C, x) => C.near[Math.max(0, Math.min(C.near.length - 1, Math.floor(x)))];
const hopIn = (z, x) => x >= z.x0 && x < z.x1;
// one fixed step. inp: {jump: held (one-touch: the screen or the Hop button), dir: -1 | 0 | 1 (free move)}
function hopStep(st, inp = {}) {
  if (st.done || st.wait == 'offer') return;
  const C = st.C, P = HOP_P, p = st.p, dt = HOP_DT;
  const press = !!inp.jump && !p.held;
  if (!inp.jump && p.held && st.mode == 'free' && p.vy > P.LOW && !p.spr) p.vy = P.LOW; // a short press: a small hop
  p.held = !!inp.jump;
  st.t += dt;
  // waits: falling (back on the checkpoint in a moment), bounced back by a gate, carried by the helper balloon, ready
  if (st.wait == 'fall') {
    if ((st.wt -= dt) > 0) return;
    const cp = C.cps[st.cp];
    Object.assign(p, { x: cp.x, y: cp.y, vx: 0, vy: 0, gr: true, on: -1, kb: 0, buf: 0, coy: 0, spr: false });
    st.ev.push(['back']);
    if (st.cpF[st.cp] >= 3 && st.cp < C.cps.length - 1) {
      st.wait = 'offer';
      st.offer = st.cp;
      st.ev.push(['offer']);
    } else {
      st.wait = 'start';
      st.wt = .5;
    }
    return;
  }
  if (st.wait == 'back' || st.wait == 'lift') {
    const A = st.anim;
    A.t += dt;
    const u = Math.min(1, A.t / A.d), e = .5 - Math.cos(Math.PI * u) / 2;
    p.x = A.x0 + (A.x1 - A.x0) * e;
    p.y = A.y0 + (A.y1 - A.y0) * e + A.arc * Math.sin(Math.PI * u);
    p.vx = 0;
    p.vy = 0;
    if (u >= 1) {
      Object.assign(p, { x: A.x1, y: A.y1, gr: true, on: -1, kb: 0, buf: 0, spr: false });
      if (st.wait == 'lift') {
        st.cp = A.cp;
        st.ev.push(['cp', A.cp]);
      }
      st.anim = null;
      st.wait = 'start';
      st.wt = .4;
    }
    return;
  }
  if (st.wait == 'start' && (st.wt -= dt) <= 0) st.wait = null;
  // the kite cloud under the pet carries it
  if (p.gr && p.on >= 1000) {
    const m = C.movers[p.on - 1000], a = hopMover(m, st.t - dt), b = hopMover(m, st.t);
    p.x += b.x - a.x;
    p.y = b.y;
  }
  // horizontal: run by itself (one-touch) or follow the buttons (free move); wind adds to it
  let wind = 0;
  for (const z of C.winds) if (hopIn(z, p.x)) wind = z.s;
  // one-touch: the pet waits at the edge for a kite cloud to come, and stands on it while it carries it (it walks off by itself
  // onto a cloud that lines up, or the child hops off)
  const one = st.mode == 'one', ready = st.wait != 'start';
  let stay = false;
  if (one && p.gr && p.on >= 1000) stay = hopSupport(st, p.x + .7, p.y, .06) < 0 || hopSupport(st, p.x + .7, p.y, .06) >= 1000;
  else if (one && p.gr && p.on >= 0) {
    const f = C.floors[p.on];
    if (f.mv >= 0 && p.x + P.PW / 2 >= f.x1 - .05) {
      const m = C.movers[f.mv], q = hopMover(m, st.t);
      stay = q.x > f.x1 + .2 || Math.abs(q.y - f.y) > .12;
    }
  }
  const want = (one ? (ready && !stay ? P.RUN : 0) : (ready ? (inp.dir || 0) * P.FREE : 0)) + (ready ? wind : 0);
  if (p.kb > 0) p.kb -= dt;
  else {
    const acc = (one ? (p.gr ? 30 : 14) : (p.gr ? 45 : 26)) * dt;
    p.vx += Math.max(-acc, Math.min(acc, want - p.vx));
  }
  if (!one && inp.dir) p.face = inp.dir;
  // hops: on the ground, just after an edge (coyote time), or a second hop in the air; a press is remembered a moment
  if (press) p.buf = P.BUF;
  if (p.gr) p.jl = st.dj ? 1 : 0;
  if (p.buf > 0 && ready) {
    if (p.gr || p.coy > 0) {
      p.vy = P.JUMP;
      p.gr = false;
      p.on = -1;
      p.coy = 0;
      p.buf = 0;
      p.spr = false;
      st.ev.push(['jump']);
    } else if (press && st.dj && p.jl > 0) {
      p.vy = P.JUMP2;
      p.jl--;
      p.buf = 0;
      p.spr = false;
      st.ev.push(['jump2']);
    }
  }
  p.buf = Math.max(0, p.buf - dt);
  p.coy = Math.max(0, p.coy - dt);
  // gravity, floating (hold), updrafts
  if (!p.gr) {
    p.vy -= P.G * dt;
    if (p.held && p.vy < P.FLOAT) p.vy = P.FLOAT;
    for (const z of C.lifts) if (hopIn(z, p.x) && p.y > z.y0 && p.y < z.y1) p.vy = Math.min(7, p.vy + P.LIFT * dt);
    p.vy = Math.max(P.FALL, p.vy);
  }
  // move across, then stop at the side of a floor or a closed gate
  const ox = p.x;
  p.x += p.vx * dt;
  const solidHit = (x0, x1, y0, y1) => {
    if (p.y >= y1 - .05 || p.y + P.PH <= y0) return false;
    const l = p.x - P.PW / 2, r = p.x + P.PW / 2;
    if (r <= x0 || l >= x1) return false;
    if (ox <= x0 + .01 + P.PW / 2 && p.vx >= 0) p.x = x0 - P.PW / 2 - .001;
    else if (ox >= x1 - .01 - P.PW / 2) p.x = x1 + P.PW / 2 + .001;
    p.vx = 0;
    return true;
  };
  for (let i = Math.max(0, Math.floor(p.x) - 1); i <= Math.min(C.col.length - 1, Math.floor(p.x) + 1); i++) {
    for (const j of C.col[i]) {
      const f = C.floors[j];
      if (f.k != 's') solidHit(f.x0, f.x1, f.y - f.dep, f.y);
    }
  }
  C.gates.forEach((g, i) => {
    if (st.gates & (1 << i)) return;
    if (solidHit(g.x0, g.x1, g.y0, g.y1)) {
      // a closed gate: boing, back to before the switch
      st.bumps++;
      st.ev.push(['gate', i]);
      st.wait = 'back';
      st.anim = { t: 0, d: .8, x0: p.x, y0: p.y, x1: g.back.x, y1: g.back.y, arc: 2.5 };
    }
  });
  if (st.wait == 'back') return;
  // move up or down: land on a floor top or a kite cloud when falling onto it (from below you pass through)
  const oy = p.y;
  if (!p.gr) p.y += p.vy * dt;
  if (!p.gr && p.vy <= 0) {
    const l = p.x - P.PW / 2 + .06, r = p.x + P.PW / 2 - .06;
    let best = -1, by = -1e9;
    for (let i = Math.max(0, Math.floor(p.x) - 1); i <= Math.min(C.col.length - 1, Math.floor(p.x) + 1); i++) {
      for (const j of C.col[i]) {
        const f = C.floors[j];
        if (r > f.x0 && l < f.x1 && oy >= f.y - .001 && p.y <= f.y && f.y > by) {
          best = j;
          by = f.y;
        }
      }
    }
    for (const j of hopNear(C, p.x).mv) {
      const m = C.movers[j], q0 = hopMover(m, st.t - dt), q = hopMover(m, st.t);
      if (r > q.x && l < q.x + m.w && oy >= q0.y - .05 && p.y <= q.y + .02 && q.y > by) {
        best = 1000 + j;
        by = q.y;
      }
    }
    if (best >= 0) {
      p.y = by;
      p.vy = 0;
      p.gr = true;
      p.on = best;
      p.jl = st.dj ? 1 : 0;
      st.ev.push(['land']);
      // a flower spring: boing, way up
      for (const s of hopNear(C, p.x).sp) {
        if (best < 1000 && Math.abs(p.x - s.x) < .5 + P.PW / 2 - .1 && Math.abs(by - s.y) < .01) {
          p.vy = P.SPRING;
          p.gr = false;
          p.on = -1;
          p.spr = true;
          st.ev.push(['spring']);
          break;
        }
      }
    }
  } else if (p.gr) {
    // still standing on something? if not, start falling (with a moment of coyote time)
    const j = hopSupport(st, p.x, p.y, .04);
    if (j < 0) {
      p.gr = false;
      p.on = -1;
      p.coy = P.COY;
      p.vy = Math.min(p.vy, 0);
    } else p.on = j;
  }
  // a spring under the pet when it walks onto it
  if (p.gr && p.on < 1000) {
    for (const s of hopNear(C, p.x).sp) {
      if (Math.abs(p.x - s.x) < .45 && Math.abs(p.y - s.y) < .01) {
        p.vy = P.SPRING;
        p.gr = false;
        p.on = -1;
        p.spr = true;
        st.ev.push(['spring']);
        break;
      }
    }
  }
  // friendly puffs bounce the pet back a little
  if (p.hit > 0) p.hit -= dt;
  else {
    for (const f of hopNear(C, p.x).pf) {
      const fy = hopPuffY(f, st.t), dx = Math.max(Math.abs(p.x - f.x) - P.PW / 2, 0), dy = Math.max(fy - (p.y + P.PH), p.y - fy, 0);
      if (dx * dx + dy * dy < .55 * .55) {
        p.vx = -6 * (p.vx >= 0 ? 1 : -1);
        p.vy = 7;
        p.gr = false;
        p.on = -1;
        p.kb = .35;
        p.hit = .6;
        st.bumps++;
        st.ev.push(['puff']);
        break;
      }
    }
  }
  // sparkles, stars, switches, checkpoints, the flag
  const cx = p.x, cy = p.y + P.PH / 2, near = (q, r) => Math.abs(q.x - cx) < P.PW / 2 + r && Math.abs(q.y - cy) < P.PH / 2 + r;
  for (const i of hopNear(C, p.x).sk) {
    if (!st.got[i] && near(C.spk[i], .3)) {
      st.got[i] = 1;
      st.spk++;
      st.ev.push(['spk', st.spk]);
    }
  }
  C.stars.forEach((s, i) => {
    if (!(st.stars & (1 << i)) && near(s, .4)) {
      st.stars |= 1 << i;
      st.ev.push(['star', i]);
    }
  });
  if (p.gr) {
    for (const d of C.pads) {
      if (!(st.gates & (1 << d.g)) && p.x > d.x0 - .3 && p.x < d.x1 + .3 && Math.abs(p.y - d.y) < .01) {
        st.gates |= 1 << d.g;
        st.ev.push(['switch', d.g]);
      }
    }
  }
  if (st.cp < C.cps.length - 1 && p.x >= C.cps[st.cp + 1].x - .2 && p.gr) {
    st.cp++;
    st.ev.push(['cp', st.cp]);
  }
  if (C.goal && p.x >= C.goal.x && p.gr) {
    st.done = true;
    st.ev.push(['goal']);
    return;
  }
  // fell below the clouds: poof, back on the checkpoint
  if (p.y < P.KILL) {
    st.falls++;
    st.cpF[st.cp]++;
    st.wait = 'fall';
    st.wt = .7;
    st.ev.push(['fall']);
  }
}
// the helper balloon: yes carries the pet to the next checkpoint; no plays on (it asks again after 3 more falls)
function hopHelp(st, yes) {
  if (st.wait != 'offer') return;
  const C = st.C, p = st.p;
  st.cpF[st.cp] = 0;
  st.offer = -1;
  if (!yes) {
    st.wait = 'start';
    st.wt = .5;
    return;
  }
  const to = C.cps[st.cp + 1];
  st.helped++;
  st.wait = 'lift';
  st.anim = { t: 0, d: Math.max(2, Math.hypot(to.x - p.x, to.y - p.y) / 7), x0: p.x, y0: p.y, x1: to.x, y1: to.y, arc: 3.5, cp: st.cp + 1 };
  st.ev.push(['lift']);
}
// medals: 3 gold, 2 silver, 1 bronze (any finish); targets per course
const hopGold = c => c.gold || 90;
const hopMedal = (c, sec) => (sec <= hopGold(c) ? 3 : sec <= Math.ceil(hopGold(c) * 1.3) ? 2 : 1);

/* ---- drawings (SVG in the --a-* roles; a tile is 40 units; made once into canvases) ---- */
// round puffs as one path: [x, y, r] each
const hopPuffs = (list, c, o) => ghP(list.map(([x, y, r]) => `M${gh1(x - r)} ${gh1(y)}a${gh1(r)} ${gh1(r)} 0 1 0 ${gh1(2 * r)} 0` +
  `a${gh1(r)} ${gh1(r)} 0 1 0 ${gh1(-2 * r)} 0`).join(''), c, o);
// swap colour roles in a drawing ({w: 'v1'}: white becomes light purple)
const hopTint = (svg, map) => svg.replace(/var\(--a-([a-z]\d?)\)/g, (m, r) => `var(--a-${map[r] || r})`);
// a cloud floor w tiles wide and dep tiles deep: puffy top, shaded underside; pal = [base, shade, deep]; the walking surface is y 10
function hopCloudArt(w, dep, pal) {
  const W = w * 40, D = Math.max(34, dep * 40 - 4), top = [], bot = [];
  const nt = Math.max(1, Math.round(W / 30)), nb = Math.max(1, Math.round(W / 26));
  for (let i = 0; i < nt; i++) top.push([8 + (i + .5) * W / nt, 13, Math.min(10, W / nt * .5)]);
  for (let i = 0; i < nb; i++) bot.push([8 + (i + .5) * W / nb, 4 + D, Math.min(13, W / nb * .62)]);
  const sh = (l, dx, dy) => l.map(([x, y, r]) => [x + dx, y + dy, r]);
  return hopPuffs(sh(bot, 2, 4), pal[2]) + ghR(10, 14, W - 2, D - 8, 14, pal[2]) + hopPuffs(bot, pal[1]) + ghR(8, 10, W, D - 8, 14, pal[1]) +
    ghR(8, 8, W - 3, Math.min(D - 16, 22), 12, pal[0]) + hopPuffs(sh(top, -1, -2), pal[0]) + ghE(8 + Math.min(W * .25, 22), 8, Math.min(W * .18, 14), 2.6, 'w', .8);
}
// a bridge: wood planks on rope rails, or a rainbow bridge in the last world (the walking surface is y 10)
function hopBridgeArt(w, rainbow) {
  const W = w * 40, H = ['r', 'o', 'y', 'g', 'b', 'v'];
  let s = ghR(10, 15, W, 12, 4, 'n3') + ghR(8, 12, W, 12, 4, rainbow ? 'v2' : 'n2');
  if (rainbow) for (let i = 0; i < 6; i++) s += ghR(8, 10 + i * 2.2, W, 2.6, 0, H[i]);
  else for (let x = 8; x < 4 + W; x += 14) s += ghR(x + 1, 10, 12, 11, 2, 'n') + ghR(x + 2, 11, 6, 2.6, 1, 'n1', .9);
  if (rainbow) s += ghR(8, 10, W, 3, 1, 'w', .5);
  return s;
}
const HOP_ART = {
  // a flower spring: a coiled green stem and a big pink flower to bounce on (48 x 48, the floor at the bottom)
  spring: () => ghShad(25, 46, 14, 2.2) + ghL('M24 46C14 42 34 38 24 34C14 30 34 26 24 22', 'g2', 4.4) +
    ghL('M23 45C13 41 33 37 23 33C13 29 33 25 23 21', 'g', 3) + ghE(14, 38, 6, 3, 'g', 1, -30) + ghE(34, 30, 6, 3, 'g2', 1, 30) +
    hopPuffs([[12, 16, 7], [36, 16, 7], [18, 9, 7], [30, 9, 7], [24, 19, 7]], 'p2') + hopPuffs([[11, 14, 6], [35, 14, 6], [17, 7, 6], [29, 7, 6]], 'p') +
    ghBall(24, 14, 6.5, 'y') + ghE(15, 11, 3, 1.6, 'w', .6, -30),
  // a friendly puff: a round little cloud with a face (48 x 48)
  puff: () => hopPuffs([[26, 28, 16], [14, 30, 10], [38, 30, 10]], 'w3') + hopPuffs([[24, 25, 16], [12, 28, 10], [36, 28, 10], [24, 14, 9]], 'w') +
    hopPuffs([[17, 26, 2.6], [31, 26, 2.6]], 'k2') + ghC(16.2, 25, 1, 'w') + ghC(30.2, 25, 1, 'w') + ghE(12, 32, 3.4, 2, 'p1', .9) +
    ghE(36, 32, 3.4, 2, 'p1', .9) + ghL('M20 32Q24 36 28 32', 'k2', 1.8) + ghE(17, 14, 5, 2.4, 'w2', .6, -20),
  star: () => rwStud(20, 21, 15) + rwSpark(33, 7, 4, 'w', .9),
  spark: () => rwSpark(13, 13, 11, 'y2') + rwSpark(12, 12, 10, 'y') + rwSpark(12, 12, 4.5, 'w', .9),
  // a checkpoint flag on a short pole, pale before you reach it, green after (40 x 80)
  flag: on => ghShad(12, 78, 9, 2) + ghR(10, 12, 5, 66, 2, 'e2') + ghR(10, 12, 3, 66, 1.5, 'e') + ghBall(12.5, 10, 4.5, 'y') +
    ghP('M15 16Q28 20 38 18Q30 26 38 34Q28 32 15 36Z', on ? 'g2' : 'e1') + ghP('M15 15Q27 18 35 17Q28 24 35 31Q26 30 15 33Z', on ? 'g' : 'w2') +
    ghE(21, 20, 4, 1.6, 'w', .55, 10),
  // the goal: a big checkered flag (80 x 140)
  goal: () => {
    const sq = [];
    for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) if ((r + k) % 2) sq.push(`M${20 + k * 11} ${14 + r * 10}h11v10h-11Z`);
    return ghShad(18, 136, 14, 3) + ghR(14, 8, 7, 128, 3, 'e2') + ghR(14, 8, 4.5, 128, 2, 'e') + ghBall(17.5, 7, 6.5, 'y') +
      ghR(22, 16, 55, 40, 3, 'k') + ghR(20, 14, 55, 40, 3, 'w') + ghP(sq.join(''), 'k2') + ghE(30, 17, 8, 2, 'w', .5);
  },
  // a switch: a round button on a little base (48 x 24): red until pressed, then green and pressed down
  pad: on => ghShad(24, 22, 20, 2.2) + ghR(4, 14, 40, 9, 4, 'e2') + ghR(4, 13, 38, 7, 4, 'e') +
    (on ? ghE(24, 13, 13, 3.6, 'g2') + ghE(23, 12, 12, 3, 'g') : ghE(24, 11, 13, 6, 'r2') + ghE(23, 9, 12, 5, 'r') + ghE(19, 7, 5, 1.6, 'w', .6)),
  // a gate: candy-striped posts; closed, three bars between them (40 x 140, the floor at the bottom)
  gate: open => {
    let s = ghShad(20, 138, 18, 2.4);
    for (const x of [4, 28]) {
      s += ghR(x + 1.5, 6, 9, 132, 4, 'p2') + ghR(x, 4, 8, 132, 4, 'w');
      let d = '';
      for (let y = 10; y < 130; y += 18) d += `M${x} ${y}h8v6l-8 4Z`;
      s += ghP(d, 'p') + ghBall(x + 4, 4, 5.5, 'p');
    }
    if (!open) for (const y of [26, 62, 98]) s += ghR(8, y + 2, 26, 9, 4, 'y2') + ghR(7, y, 26, 8, 4, 'y') + ghR(10, y + 1, 12, 2, 1, 'w', .6);
    return s;
  },
  // a kite flying from a kite cloud (40 x 80; the string ends at the bottom left)
  kite: () => ghL('M4 78Q14 56 24 30', 'k2', 1.4, .6) + ghP('M25 2L38 18L25 36L13 18Z', 'r2') + ghP('M24 1L36 17L24 33L12 17Z', 'r') +
    ghP('M24 1L24 33L12 17Z', 'o') + ghL('M24 1V33M12 17H36', 'y1', 1.6, .8) + ghL('M24 33Q20 44 26 50Q32 56 26 64', 'b', 2) + ghE(19, 11, 3, 1.4, 'w', .6, -40),
  // the helper balloon: a big smiling balloon with a string to hold (80 x 120)
  balloon: () => ghL('M40 72Q34 92 40 118', 'k2', 1.6, .7) + ghP('M36 70L44 70L40 76Z', 'b3') + ghC(42, 38, 32, 'b2') + ghC(39, 35, 30, 'b') +
    ghE(28, 22, 9, 5, 'w', .6, -35) + ghC(31, 38, 3, 'k2') + ghC(47, 38, 3, 'k2') + ghC(30, 37, 1.1, 'w') + ghC(46, 37, 1.1, 'w') +
    ghE(25, 46, 4, 2.4, 'p1', .9) + ghE(53, 46, 4, 2.4, 'p1', .9) + ghL('M32 48Q39 55 46 48', 'k2', 2.4),
};
// the worlds' far and near layers (960 x 200 and 960 x 120) and what stays put in the sky (100 x 100). Hills: Star Rally's rlRidge.
const HOP_SKY = {
  meadow: () => ghSun(50, 50, 24), peaks: () => ghSun(50, 50, 20), rainbow: () => ghSun(50, 50, 22),
  night: () => ghC(50, 50, 30, 'y1', .22) + `<path ${ghF('m')} d="M46 26a24 24 0 1 0 22 34a19 19 0 0 1 -22 -34Z"/>`,
};
// a bank of clouds along the bottom of the near layer
function hopBank(y, c1, c2) {
  const a = [], b = [];
  for (let x = 0; x <= 960; x += 60) {
    const r = 26 + ((x * 7) % 5) * 6;
    a.push([x + 3, y + 4, r]);
    b.push([x, y, r]);
  }
  return hopPuffs(a, c2) + ghR(0, y + 4, 960, 120, 0, c2) + hopPuffs(b, c1) + ghR(0, y + 10, 960, 120, 0, c1);
}
const HOP_BACK = {
  meadow: {
    far: () => ghCloud(300, 50, 1.6) + ghCloud(700, 70, 1.3) + ghP(rlRidge(168, [[14, 3, .5], [8, 7, 1.2]], 200), 'g1', .8) +
      ghP(rlRidge(184, [[8, 4, 1.4], [5, 9, .3]], 200), 'g', .7),
    near: () => hopBank(70, 'w', 'w2'),
  },
  peaks: {
    far: () => {
      const m = [[40, 3, .2], [22, 6, 1.4], [10, 11, .5]];
      return ghCloud(240, 46, 1.3) + ghCloud(760, 64, 1.1) + ghP(rlRidge(130, m, 200, 6, 4), 'b2', .45) + ghP(rlRidge(130, m, 200), 'b1') +
        ghP(rlCap(130, m, 22), 'w');
    },
    near: () => hopBank(66, 'w', 'w2'),
  },
  night: {
    far: () => rlStars(46) + hopTint(ghCloud(420, 110, 1.3) + ghCloud(820, 80, 1), { w: 'v1', w2: 'v' }) +
      ghP(rlRidge(178, [[10, 3, .7], [6, 8, 2]], 200, 6, 3), 'v3', .5) + ghP(rlRidge(178, [[10, 3, .7], [6, 8, 2]], 200), 'v2', .8),
    near: () => hopBank(72, 'v1', 'v'),
  },
  rainbow: {
    far: () => {
      let s = '';
      ['r', 'o', 'y', 'g', 'b', 'v'].forEach((c, i) => { s += ghL(`M${200 + i * 9} 200A${280 - i * 9} ${230 - i * 9} 0 0 1 ${760 - i * 9} 200`, c, 9, .6); });
      return s + ghCloud(180, 160, 1.8) + ghCloud(790, 160, 1.8) + ghCloud(500, 50, 1.1);
    },
    near: () => hopBank(70, 'w', 'w2'),
  },
};
// the Game Room card (240 x 100): a little green critter mid-hop between clouds, a flower spring, a star and the checkered flag
function hopHubArt() {
  const cl = (x, y, w) => hopPuffs([[x + 8, y + 9, 8], [x + w - 8, y + 9, 8]], 'w3') + ghR(x, y, w, 12, 6, 'w2') + ghR(x, y - 2, w - 2, 9, 5, 'w') +
    hopPuffs([[x + w * .3, y - 1, 6], [x + w * .65, y - 2, 5]], 'w');
  const sq = 'M206 14h5.5v4.7h-5.5ZM217 14h5.5v4.7h-5.5ZM211.5 18.7h5.5v4.6h-5.5ZM222.5 18.7h5.5v4.6h-5.5ZM206 23.3h5.5v4.7h-5.5ZM217 23.3h5.5v4.7h-5.5Z';
  return ghCloud(46, 24, .6) + cl(14, 80, 74) + cl(148, 60, 80) + `<g transform="translate(58 34)">${HOP_ART.spring()}</g>` +
    ghL('M84 58Q96 10 122 30', 'w', 2.6, .9) + ghShad(176, 61, 9, 1.6) +
    ghE(110, 34, 6, 4, 'g2', 1, -30) + ghC(126, 38, 13, 'g2') + ghC(124, 36, 12, 'g') + ghE(126, 42, 7, 6, 'y') + ghE(119, 28, 4, 2.4, 'w', .55, -30) +
    ghC(120, 33, 2.2, 'k2') + ghC(129, 33, 2.2, 'k2') + ghC(119.4, 32.2, .8, 'w') + ghC(128.4, 32.2, .8, 'w') + ghL('M121 39Q124.5 42 128 39', 'k2', 1.4) +
    ghE(117, 38, 2.2, 1.3, 'p1', .9) + ghE(132, 38, 2.2, 1.3, 'p1', .9) +
    `<path ${ghF('y2')} d="${rwStarD(158, 20, 9, 4.5)}"/><path ${ghF('y')} d="${rwStarD(157, 19, 8, 4)}"/>` + ghShad(206, 59, 7, 1.4) +
    ghR(202, 12, 3, 46, 1.5, 'e2') + ghBall(203.5, 11, 3, 'y') + ghR(207, 15, 22, 14, 1, 'k') + ghR(206, 14, 22, 14, 1, 'w') + ghP(sq, 'k2');
}
// a world's picture for the menu (its far and near layers over the sky colours)
const hopWorldPic = w => `<svg class="art" viewBox="0 0 960 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">` +
  `${HOP_BACK[w.id].far()}<g transform="translate(0 104)">${HOP_BACK[w.id].near()}</g></svg>`;

/* ---- the save (S.hop): read with defaults, every value checked ---- */
const hopNum = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(+v || 0)));
const hopObj = v => (v && typeof v == 'object' && !Array.isArray(v) ? v : {});
const HOP_TRAILS = [['none', 'No trail', 0, ''], ['sun', 'Sunshine', 3, 'y'], ['pink', 'Bubblegum', 9, 'p'], ['sky', 'Sky blue', 18, 'c'],
  ['leaf', 'Leafy', 30, 'g'], ['grape', 'Grape', 45, 'v'], ['rainbow', 'Rainbow', 60, 'r']]; // [id, name, stars needed, hue]
function hopS() {
  const r = (S.hop = hopObj(S.hop)), keep = (o, lo, hi) => {
    const out = {};
    for (const c of HOP_COURSES) if (o[c.id] != null && hopNum(o[c.id], lo, hi) > 0) out[c.id] = hopNum(o[c.id], lo, hi);
    return out;
  };
  r.runs = hopNum(r.runs, 0, 1e7);
  r.best = keep(hopObj(r.best), 0, 36e5);
  r.stars = keep(hopObj(r.stars), 0, 7);
  r.medal = keep(hopObj(r.medal), 0, 3);
  if (r.mode !== 'one' && r.mode !== 'free') r.mode = (S.grade == null ? 0 : +S.grade) <= 2 ? 'one' : 'free';
  const tr = HOP_TRAILS.find(t => t[0] === r.trail);
  if (!tr || hopStarsAll(r) < tr[2]) r.trail = 'none';
  if (!HOP_BY[r.cur] || !hopOpen(HOP_BY[r.cur], r)) r.cur = (HOP_COURSES.find(c => hopOpen(c, r) && !r.best[c.id]) || HOP_COURSES[0]).id;
  r.world = hopOpen(HOP_COURSES[hopNum(r.world, 0, 3) * 6], r) ? hopNum(r.world, 0, 3) : HOP_BY[r.cur].w;
  return r;
}
const hopPeek = () => (S.hop && typeof S.hop == 'object' && !Array.isArray(S.hop) ? S.hop : {});
const hopBits = v => (v & 1) + (v >> 1 & 1) + (v >> 2 & 1);
const hopStarsAll = (r = hopPeek()) => HOP_COURSES.reduce((a, c) => a + hopBits(hopNum(hopObj(r.stars)[c.id], 0, 7)), 0);
const hopDone = (r = hopPeek()) => HOP_COURSES.filter(c => hopNum(hopObj(r.best)[c.id], 0, 36e5) > 0).length;
// a course opens when the one before it is finished
const hopOpen = (c, r = hopPeek()) => !c.i || hopNum(hopObj(r.best)[HOP_COURSES[c.i - 1].id], 0, 36e5) > 0;
const hopTime = ms => (ms / 1000).toFixed(1) + ' s';

/* ---- the renderer: sprites, colours and the canvas ---- */
const HOP_SPR = {};
// an SVG drawing as a canvas pxw pixels wide (cached; .c is set once it has loaded, .p resolves then)
function hopSprite(key, vw, vh, inner, pxw) {
  const k = key + '@' + Math.round(pxw);
  if (HOP_SPR[k]) return HOP_SPR[k];
  const w = Math.max(2, Math.round(pxw)), h = Math.max(2, Math.round(pxw * vh / vw)), s = (HOP_SPR[k] = { c: null, w, h, vw, vh });
  s.p = new Promise(ok => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      s.c = c;
      ok();
    };
    img.onerror = () => ok();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
      `width="${w}" height="${h}">${rlRes(inner)}</svg>`);
  });
  return s;
}
// the child's pet with its hat and toy: the rig's colours are CSS roles, so they are read from a hidden copy first
function hopPetSprite(mood, px) {
  const w = S.wear || {}, key = ['pet', S.pet, stage(S.stars), mood, w.hat || '', w.toy || ''].join('-');
  if (HOP_SPR[key + '@' + px]) return HOP_SPR[key + '@' + px];
  let inner = '';
  try {
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:200px;height:200px;pointer-events:none';
    host.innerHTML = petSVG(S.pet, stage(S.stars), mood, { hat: wearOf(w.hat), toy: wearOf(w.toy) });
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    const els = [...svg.querySelectorAll('*')], gone = els.filter(el => getComputedStyle(el).display == 'none');
    for (const el of els) {
      if (!/^(path|circle|ellipse|rect|polygon|text)$/.test(el.tagName)) continue;
      const cs = getComputedStyle(el);
      if (el.getAttribute('fill') != 'none') el.setAttribute('fill', cs.fill);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') != 'none') el.setAttribute('stroke', cs.stroke);
    }
    for (const el of els) el.removeAttribute('class'); // only after every colour is read (the wearables' roles come from their class)
    for (const el of gone) el.remove();
    inner = svg.innerHTML;
    host.remove();
  } catch (e) {}
  return hopSprite(key, 200, 200, inner, px);
}
let HP = null; // the course on screen
const hopNow = () => (window.__realNow || (() => performance.now()))();
const hopCalm = () => !!S.calm || (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
// sounds: through tone() and SFX (silent with Sound effects off); softer in calm mode
const hopTone = (f, d, t, type, vol, slide) => tone(f, d, t, type, vol * (hopCalm() ? .6 : 1), slide);
// sizes and the pictures at this screen size
function hopSize(R) {
  const cv = R.cv, cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight);
  const k0 = Math.min(Math.min(1.5, devicePixelRatio || 1), Math.sqrt(1.2e6 / (cw * ch))), k = k0 * (R.q || 1);
  cv.width = Math.round(cw * k);
  cv.height = Math.round(ch * k);
  const C = R.st.C, W = C.W, T0 = Math.min(ch / 9.5, cw / 9), T = T0 * k, sp = T0 * k0; // T: canvas pixels a tile; sp: sprite pixels a tile
  const V = { cw, ch, k, T, sc: (R.q || 1), W: cv.width, H: cv.height, base: Math.round(cv.height * .64) };
  V.sky = R.ctx.createLinearGradient(0, 0, 0, V.H);
  V.sky.addColorStop(0, rlCol('sc-' + W.sky[0]));
  V.sky.addColorStop(1, rlCol('sc-' + W.sky[1]));
  const B = HOP_BACK[W.id], fh = Math.max(ch * .42, 120) * k0, nh = Math.max(ch * .2, 70) * k0;
  V.far = hopSprite('far-' + W.id, 960, 200, B.far(), 960 * fh / 200);
  V.near = hopSprite('near-' + W.id, 960, 120, B.near(), 960 * nh / 120);
  V.sun = hopSprite('sky-' + W.id, 100, 100, HOP_SKY[W.id](), T0 * k0 * 2.2);
  V.fl = C.floors.map(f => {
    if (f.k == 'b') return hopSprite(`br-${W.id}-${f.x1 - f.x0}`, (f.x1 - f.x0) * 40 + 16, 40, hopBridgeArt(f.x1 - f.x0, W.id == 'rainbow'), ((f.x1 - f.x0) + .4) * sp);
    const dep = Math.round((f.dep || 1.2) * 4) / 4, w = f.x1 - f.x0;
    return hopSprite(`cl-${W.id}-${w}-${dep}`, w * 40 + 16, dep * 40 + 24, hopCloudArt(w, dep, W.cloud), (w + .4) * sp);
  });
  V.mv = C.movers.map(m => hopSprite(`cl-${W.id}-${m.w}-1`, m.w * 40 + 16, 64, hopCloudArt(m.w, 1, W.cloud), (m.w + .4) * sp));
  for (const [n, vw, vh, art, wt] of [['spring', 48, 48, HOP_ART.spring(), 1.2], ['puff', 48, 48, HOP_ART.puff(), 1.3], ['star', 40, 40, HOP_ART.star(), 1],
    ['spark', 24, 24, HOP_ART.spark(), .55], ['flag0', 40, 80, HOP_ART.flag(0), 1], ['flag1', 40, 80, HOP_ART.flag(1), 1], ['goal', 80, 140, HOP_ART.goal(), 2],
    ['pad0', 48, 24, HOP_ART.pad(0), 1.2], ['pad1', 48, 24, HOP_ART.pad(1), 1.2], ['gate0', 40, 140, HOP_ART.gate(0), 1],
    ['gate1', 40, 140, HOP_ART.gate(1), 1], ['kite', 40, 80, HOP_ART.kite(), 1], ['balloon', 80, 120, HOP_ART.balloon(), 2]]) {
    V[n] = hopSprite('h-' + n, vw, vh, art, wt * sp);
  }
  const ps = Math.round(sp * 2.1);
  V.pet = { happy: hopPetSprite('happy', ps), cheer: hopPetSprite('cheer', ps), oops: hopPetSprite('oops', ps) };
  V.col = {};
  for (const r of ['w', 'w2', 'y', 'y1', 'p', 'c', 'g', 'v', 'r', 'o', 'b']) V.col[r] = rlCol(r);
  R.v = V;
  const all = Object.values(V).flatMap(x => (x && x.p ? [x] : Array.isArray(x) ? x : x && typeof x == 'object' && x.happy ? Object.values(x) : []));
  R.ready = false;
  Promise.all(all.map(s => s.p)).then(() => { if (R.v === V) R.ready = true; });
}
// draw a picture (a cached canvas) with its top left at x, y and w canvas pixels wide
function hopImg(c, s, x, y, w, h) {
  if (s && s.c) c.drawImage(s.c, Math.round(x), Math.round(y), Math.round(w), Math.round(h || w * s.h / s.w));
}
function hopTile(c, s, off, y, W) {
  if (!s.c) return;
  const w = s.w * HP.v.sc, h = s.h * HP.v.sc;
  for (let x = -(((off % w) + w) % w); x < W; x += w) c.drawImage(s.c, Math.round(x), Math.round(y - h), Math.ceil(w) + 1, Math.ceil(h));
}
function hopDraw(R, dt) {
  const c = R.ctx, V = R.v, st = R.st, C = st.C, p = st.p, T = V.T;
  // the camera: the pet a third in from the left (looking ahead), its feet a little below the middle; it eases along
  const lead = st.mode == 'one' ? .3 : .4, tx = p.x - V.W * lead / T, ty = p.y;
  if (R.cx == null) { R.cx = tx; R.cy = ty; }
  const e = Math.min(1, dt * 6);
  R.cx += (tx - R.cx) * Math.min(1, dt * 10);
  R.cy += (ty - R.cy) * (p.y < R.cy - 3 ? Math.min(1, dt * 12) : e);
  let sx = 0, sy = 0;
  if (R.shake > 0 && !hopCalm()) {
    R.shake = Math.max(0, R.shake - dt * 2);
    sx = Math.sin(st.t * 70) * R.shake * T * .25;
    sy = Math.cos(st.t * 55) * R.shake * T * .2;
  }
  const X = x => (x - R.cx) * T + sx, Y = y => V.base - (y - R.cy) * T + sy;
  // the sky and the sun or moon: made once into an opaque picture of the screen's size (one quick copy a frame)
  if (!V.bg && V.sun.c) {
    V.bg = document.createElement('canvas');
    V.bg.width = V.W;
    V.bg.height = V.H;
    const b = V.bg.getContext('2d', { alpha: false });
    b.fillStyle = V.sky;
    b.fillRect(0, 0, V.W, V.H);
    hopImg(b, V.sun, V.W - V.sun.w * V.sc - T * .8, T * 1.6, V.sun.w * V.sc);
  }
  if (V.bg) c.drawImage(V.bg, 0, 0);
  else {
    c.fillStyle = V.sky;
    c.fillRect(0, 0, V.W, V.H);
  }
  // far hills and a bank of clouds below, moving slower than the course (they sink a little as the pet climbs)
  const dv = Math.max(-V.H * .04, Math.min(V.H * .1, (R.cy - 2) * T * .06));
  hopTile(c, V.far, R.cx * T * .1, V.H * .9 + dv, V.W);
  hopTile(c, V.near, R.cx * T * .3, V.H + dv * 1.6 + V.near.h * V.sc * .12, V.W);
  const x0 = R.cx - 2, x1 = R.cx + V.W / T + 2, vis = (a, b) => b > x0 && a < x1;
  // wind (streaks) and updrafts (rising dots)
  c.globalAlpha = .5;
  c.fillStyle = V.col.w;
  for (const z of C.winds) {
    if (!vis(z.x0, z.x1)) continue;
    for (let i = 0; i < (z.x1 - z.x0) * 1.5; i++) {
      const L = z.x1 - z.x0, u = ((i * .37 + st.t * z.s * .35) % 1 + 1) % 1, wx = z.x0 + u * L, wy = 2 + ((i * 1.7) % 5) + (C.floors[0].y - 2);
      c.fillRect(X(wx), Y(wy + Math.sin(i) * .4), T * .9, Math.max(1, T * .06));
    }
  }
  for (const z of C.lifts) {
    if (!vis(z.x0, z.x1)) continue;
    for (let i = 0; i < (z.x1 - z.x0) * 2; i++) {
      const u = ((i * .29 + st.t * .5) % 1), wx = z.x0 + ((i * .61) % 1) * (z.x1 - z.x0), wy = z.y0 + 4 + u * (z.y1 - z.y0 - 4);
      c.beginPath();
      c.arc(X(wx + Math.sin(st.t * 3 + i) * .2), Y(wy), T * .07, 0, 6.3);
      c.fill();
    }
  }
  c.globalAlpha = 1;
  // floors, springs, switches, gates, checkpoints, the flag
  C.floors.forEach((f, i) => {
    if (!vis(f.x0, f.x1)) return;
    const s = V.fl[i];
    if (f.k == 'b') hopImg(c, s, X(f.x0 - .2), Y(f.y) - T * .25, (f.x1 - f.x0 + .4) * T);
    else hopImg(c, s, X(f.x0 - .2), Y(f.y) - T * .25, (f.x1 - f.x0 + .4) * T);
  });
  for (const s of C.springs) if (vis(s.x - 1, s.x + 1)) {
    const sq = R.boing && R.boing.x == s.x ? 1 - Math.max(0, R.boing.t) * 1.5 : 1;
    const h = 1.2 * T * Math.max(.55, sq);
    hopImg(c, V.spring, X(s.x - .6), Y(s.y) - h + T * .05, 1.2 * T, h);
  }
  C.pads.forEach(d => { if (vis(d.x0, d.x1)) hopImg(c, V[(st.gates >> d.g) & 1 ? 'pad1' : 'pad0'], X(d.x0 - .1), Y(d.y) - .55 * T, 1.4 * T); });
  C.gates.forEach((g, i) => { if (vis(g.x0 - 1, g.x1 + 1)) hopImg(c, V[(st.gates >> i) & 1 ? 'gate1' : 'gate0'], X(g.x0 - .2), Y(g.y1) - T * .2, T, 3.5 * T); });
  C.cps.forEach((q, i) => { if (i && vis(q.x - 1, q.x + 1)) hopImg(c, V[i <= st.cp ? 'flag1' : 'flag0'], X(q.x - .3), Y(q.y) - 2 * T, T, 2 * T); });
  if (C.goal && vis(C.goal.x - 2, C.goal.x + 3)) hopImg(c, V.goal, X(C.goal.x - .45), Y(C.goal.y) - 3.5 * T, 2 * T, 3.5 * T);
  // kite clouds with their kites
  C.movers.forEach((m, i) => {
    const q = hopMover(m, st.t);
    if (!vis(q.x - 1, q.x + m.w + 2)) return;
    hopImg(c, V.kite, X(q.x + m.w - .4), Y(q.y + 2.6), T, 2 * T);
    hopImg(c, V.mv[i], X(q.x - .2), Y(q.y) - T * .25, (m.w + .4) * T);
  });
  // sparkles, stars, puffs
  const bob = Math.sin(st.t * 3) * .12;
  C.spk.forEach((s, i) => { if (!st.got[i] && vis(s.x - 1, s.x + 1)) hopImg(c, V.spark, X(s.x - .275), Y(s.y + .275 + bob), .55 * T); });
  C.stars.forEach((s, i) => { if (!(st.stars >> i & 1) && vis(s.x - 1, s.x + 1)) hopImg(c, V.star, X(s.x - .5), Y(s.y + .5 - bob), T); });
  for (const f of C.puffs) if (vis(f.x - 1, f.x + 1)) hopImg(c, V.puff, X(f.x - .65), Y(hopPuffY(f, st.t) + .65), 1.3 * T);
  // little bits: dust when landing, sparkles when collecting, the trail, the poof of a fall
  for (let i = R.fx.length - 1; i >= 0; i--) {
    const q = R.fx[i];
    q.life -= dt;
    if (q.life <= 0) { R.fx.splice(i, 1); continue; }
    q.x += q.vx * dt;
    q.y += q.vy * dt;
    c.globalAlpha = Math.min(1, q.life * 2.5);
    c.fillStyle = V.col[q.c] || V.col.w;
    c.beginPath();
    c.arc(X(q.x), Y(q.y), q.r * T * (q.grow ? 1 + (1 - q.life) : 1), 0, 6.3);
    c.fill();
  }
  c.globalAlpha = 1;
  // the pet: stretched when it hops, squashed when it lands, tipped a little forward when it runs; hidden while it poofs
  if (st.wait != 'fall') {
    const s = V.pet[p.vy > 1 && !p.gr ? 'cheer' : st.wait == 'back' || p.kb > 0 ? 'oops' : 'happy'];
    R.sq = Math.max(0, (R.sq || 0) - dt * 4);
    const str = p.gr ? 1 - R.sq * .18 : 1 + Math.min(.12, Math.abs(p.vy) * .008), wid = 2.1 * T / Math.sqrt(str);
    c.save();
    c.translate(X(p.x), Y(p.y) + T * .08);
    c.rotate(p.gr ? Math.max(-.12, Math.min(.12, p.vx * .012)) : Math.max(-.2, Math.min(.2, p.vx * .02 - p.vy * .004)));
    if (p.face < 0) c.scale(-1, 1);
    if (s.c) c.drawImage(s.c, -wid / 2, -wid * str * .92, wid, wid * str);
    c.restore();
  }
  // the helper balloon: offered next to the pet, or carrying it
  if (st.wait == 'lift' || st.wait == 'offer') {
    const lift = st.wait == 'lift', bx = lift ? p.x - .1 : p.x + 1.4, by = (lift ? p.y + 1.2 : p.y + 1.6) + Math.sin(st.t * 2) * .15;
    hopImg(c, V.balloon, X(bx - 1), Y(by + 3), 2 * T, 3 * T);
  }
}
// the bits: [x, y, vx, vy, life, radius, colour, grows]
function hopFx(x, y, n, c, sp, r = .08, grow) {
  if (!HP || (hopCalm() && n > 3)) n = Math.min(n, 3);
  for (let i = 0; i < n; i++) {
    const a = i / n * 6.28 + (HP.fx.length % 7);
    HP.fx.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .7 + sp * .3, life: .5 + (i % 3) * .1, r, c, grow });
  }
  if (HP.fx.length > 80) HP.fx.splice(0, HP.fx.length - 80);
}

/* ---- the screens ---- */
const hopStarChip = (n, of = 3, id = 'hpst') => `<span class="stat star" id="${id}" aria-label="Stars found">${ico('star', 32)}<b>${n}/${of}</b></span>`;
const hopPetPic = () => {
  const w = S.wear || {};
  return petSVG(S.pet, stage(S.stars), 'happy', { hat: wearOf(w.hat), toy: wearOf(w.toy) });
};
function hopMenu(world) {
  const r = hopS();
  if (world != null && hopOpen(HOP_COURSES[world * 6], r)) r.world = world;
  const W = HOP_WORLDS[r.world], cur = HOP_BY[r.cur], all = hopStarsAll(r), done = hopDone(r), one = r.mode == 'one';
  const wcard = (w, i) => {
    const open = hopOpen(HOP_COURSES[i * 6], r), got = HOP_COURSES.filter(c => c.w == i).reduce((a, c) => a + hopBits(r.stars[c.id] || 0), 0);
    return `<button class="hp-world${i == r.world ? ' on' : ''}${open ? '' : ' lock'}" data-w="${i}" aria-pressed="${i == r.world}">` +
      `<span class="hp-wpic" style="--gh-a:var(--sc-${w.sky[0]});--gh-b:var(--sc-${w.sky[1]})">${hopWorldPic(w)}` +
      `${open ? '' : `<span class="hp-wlock">${ico('lock', 22)}</span>`}</span><span class="hp-wname">${esc(w.name)}</span>` +
      `<span class="hp-wsub">${open ? `${ico('star', 18)}<b>${got}</b> of 18` : 'Finish the world before'}</span></button>`;
  };
  const ccard = c => {
    const open = hopOpen(c, r), best = r.best[c.id], md = r.medal[c.id] || 0;
    return `<button class="hp-crs${open ? '' : ' lock'}${c.id == r.cur ? ' on' : ''}" data-c="${c.id}" data-ok="${open ? 1 : 0}">` +
      `<span class="hp-cn">${c.i % 6 + 1}</span><span class="hp-ci"><b>${esc(c.name)}</b><span>${open ? (best ? 'Best ' + hopTime(best) :
        'Gold in ' + hopGold(c) + ' s') : 'Finish the course before'}</span></span>` +
      `<span class="hp-cr">${open ? UI.stars(hopBits(r.stars[c.id] || 0), 3, 18) : ''}${md ? `<span class="hp-md m${md}">${ico('medal', 22)}</span>` : ''}</span>` +
      `<span class="hp-go" aria-hidden="true">${ico(open ? 'play' : 'lock')}</span></button>`;
  };
  const trail = t => {
    const ok = all >= t[2];
    return `<button class="hp-tr${t[0] === r.trail ? ' on' : ''}${ok ? '' : ' lock'}" data-tr="${t[0]}" aria-pressed="${t[0] === r.trail}">` +
      `<span class="hp-dot hp-t-${t[0]}" aria-hidden="true"></span><span>${esc(t[1])}</span>` +
      `${ok ? '' : `<small>${ico('star', 16)}${t[2]}</small>`}</button>`;
  };
  view(`${GH.top('hop')}<div class="scroll hp-menu">
  <section class="hp-hero" style="--gh-a:var(--sc-${W.sky[0]});--gh-b:var(--sc-${W.sky[1]})">
   <div class="hp-hpet"><span class="hp-pet">${hopPetPic()}</span><svg class="art hp-hcl" viewBox="0 0 136 60" aria-hidden="true" focusable="false">` +
     `${hopCloudArt(3, .9, W.cloud)}</svg></div>
   <div class="hp-hinfo"><p class="hp-hl">${ico('star', 26)}<b>${all}</b> of 72 stars</p><p class="hp-hl">${ico('trophy', 26)}<b>${done}</b> of 24 courses</p>
   ${UI.btn('Play ' + cur.name, { kind: 'primary', size: 'lg', icon: 'play', id: 'hopgo', wide: true })}</div></section>
  <section class="hp-opts"><h2 class="hp-h">How do you hop?</h2>
   <div class="hp-mode">${UI.seg([['one', 'One-touch'], ['free', 'Free move']], r.mode, { id: 'hpmode', label: 'How to hop' })}
   <p>${one ? 'One-touch: your pet runs by itself. Tap anywhere to hop. Hold to float down slowly.' :
    'Free move: the arrows walk left and right. Jump hops; hold it longer to hop higher. Go back for a star you missed!'}</p></div></section>
  <h2 class="hp-h">Worlds</h2><div class="hp-worlds">${HOP_WORLDS.map(wcard).join('')}</div>
  <h2 class="hp-h">${esc(W.name)}: ${esc(W.adds.toLowerCase())}</h2><div class="hp-crss">${HOP_COURSES.filter(c => c.w == r.world).map(ccard).join('')}</div>
  <h2 class="hp-h">Sparkle trail</h2><div class="hp-trs">${HOP_TRAILS.map(trail).join('')}</div>
  <ul class="hp-how">${[['flag', 'Hop to the checkered flag.'], ['star', 'Three stars hide on every course. Look up high and down low!'],
    ['replay', 'Fall off? No problem: you start again at the last little flag.'], ['medal', 'Be quick for a gold medal. Beat your own best time!']]
    .map(([i, t]) => `<li><span class="hp-hi">${ico(i == 'flag' ? 'target' : i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul></div>`);
  GH.wire({ back: () => gameRoom() });
  $('#hopgo').onclick = () => hopTry(r.cur);
  $$('[data-c]').forEach(b => b.onclick = () => {
    const c = HOP_BY[b.dataset.c];
    if (!hopOpen(c, r)) {
      SFX.wrong();
      fb(`Finish ${HOP_COURSES[c.i - 1].name} to open ${c.name}!`, 'warn long', 2600);
      return;
    }
    r.cur = c.id;
    save();
    hopTry(c.id);
  });
  $$('[data-w]').forEach(b => b.onclick = () => {
    const i = +b.dataset.w;
    if (!hopOpen(HOP_COURSES[i * 6], r)) {
      SFX.wrong();
      fb(`Finish ${HOP_WORLDS[i - 1].name} to open ${HOP_WORLDS[i].name}!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.world = i;
    save();
    hopKeep(() => hopMenu());
  });
  $$('[data-tr]').forEach(b => b.onclick = () => {
    const t = HOP_TRAILS.find(x => x[0] === b.dataset.tr);
    if (all < t[2]) {
      SFX.wrong();
      fb(`Find ${t[2] - all} more stars for the ${t[1]} trail!`, 'warn long', 2600);
      return;
    }
    SFX.pop(3);
    r.trail = t[0];
    save();
    hopKeep(() => hopMenu());
  });
  UI.segOn($('#hpmode'), v => {
    r.mode = v;
    save();
    hopKeep(() => hopMenu());
  });
}
// redraw the menu and keep the scroll place
function hopKeep(f) {
  const y = $('.scroll') ? $('.scroll').scrollTop : 0;
  f();
  if ($('.scroll')) $('.scroll').scrollTop = y;
}
function hopTry(id) {
  if (ptLeft() <= 0) {
    SFX.wrong();
    fb(ptWhyNot(), 'warn long', 3000);
    return;
  }
  SFX.whoosh();
  hopPlay(id);
}

/* ---- a course ---- */
function hopStop() {
  if (!HP) return;
  cancelAnimationFrame(HP.raf);
  clearTimeout(HP.endT);
  removeEventListener('resize', HP.rs);
  removeEventListener('keydown', HP.kd);
  removeEventListener('keyup', HP.ku);
  HP = null;
}
function hopMsg(t, ms = 1300, cls = '') {
  const m = $('#hpmsg');
  if (!m) return;
  m.textContent = t;
  m.className = 'hp-msg on' + (cls ? ' ' + cls : '');
  clearTimeout(m._t);
  m._t = setTimeout(() => m.classList.remove('on'), ms);
}
function hopPlay(id) {
  const r = hopS(), c = HOP_BY[id], mode = r.mode, W = HOP_WORLDS[c.w];
  r.cur = id;
  r.world = c.w;
  save();
  const btn = (bid, icon, aria, txt) => `<button class="hp-btn" id="${bid}" data-k="${bid.slice(2)}" aria-label="${aria}">${ico(icon, 44)}` +
    `${txt ? `<span>${txt}</span>` : ''}</button>`;
  view(`${GH.top('hop', { play: true, hud: true, sub: c.name, chips: hopStarChip(0) + UI.chip('timer', '0:00', { id: 'hpclk', aria: 'Course time' }) })}
  <div class="hpg hp-${mode} hp-w-${W.id}" id="hp"><canvas id="hpcv"></canvas><div class="hp-msg" id="hpmsg" aria-live="polite"></div>
  <div class="hp-ctl">${mode == 'free' ? btn('hpl', 'arrow-left', 'Walk left') + btn('hpr', 'arrow-right', 'Walk right') : ''}${btn('hpj', 'arrow-up', 'Hop', mode == 'free' ? 'Jump' : 'Hop')}</div>
  <div class="hp-offer" id="hpoffer" hidden><div class="hp-ocard" role="dialog" aria-label="The helper balloon">
   <svg class="art hp-obal" viewBox="0 0 80 120" aria-hidden="true" focusable="false">${HOP_ART.balloon()}</svg>
   <p>Need a lift? The balloon can carry you to the next flag.</p>
   <div class="hp-oacts">${UI.btn('Yes, please', { kind: 'primary', size: 'lg', icon: 'balloon', id: 'hpyes' })}${UI.btn('No, thanks', { size: 'lg', icon: 'replay', id: 'hpno' })}</div></div></div></div>`);
  const st = hopNew(id, { mode }), cv = $('#hpcv');
  HP = { st, c, r, cv, ctx: cv.getContext('2d', { alpha: false }), ptr: {}, key: {}, pend: false, acc: 0, last: 0, raf: 0, paused: false,
    ft: [], fi: [], q: 1, fc: 0, qAt: 0, fx: [], shake: 0, sec: -1, said: {} };
  hopSize(HP);
  HP.rs = () => { if (HP) hopSize(HP); };
  addEventListener('resize', HP.rs);
  // input: one-touch takes a touch anywhere (several fingers at once are fine); free move uses the buttons; keys work too
  const box = $('#hp'), keyOf = e => {
    const b = e.target.closest && e.target.closest('.hp-btn');
    if (b) return b.dataset.k;
    return mode == 'one' ? 'j' : '';
  };
  const show = () => {
    const on = new Set(Object.values(HP.ptr).concat(Object.keys(HP.key).filter(k => HP.key[k])));
    for (const k of ['l', 'r', 'j']) if ($('#hp' + k)) $('#hp' + k).classList.toggle('on', on.has(k));
    HP.on = on;
  };
  box.addEventListener('pointerdown', e => {
    if (!HP || e.target.closest('.gh-top, .hp-offer')) return;
    e.preventDefault();
    const k = keyOf(e);
    if (!k) return;
    HP.ptr[e.pointerId] = k;
    if (k == 'j') HP.pend = true;
    try { box.setPointerCapture(e.pointerId); } catch (x) {}
    show();
  });
  const up = e => {
    if (!HP) return;
    delete HP.ptr[e.pointerId];
    show();
  };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', up);
  box.addEventListener('contextmenu', e => e.preventDefault());
  const KEYS = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'j', ' ': 'j' };
  HP.kd = e => {
    if (!HP || !KEYS[e.key] || (mode == 'one' && KEYS[e.key] != 'j')) return;
    if (KEYS[e.key] == 'j' && !HP.key.j) HP.pend = true;
    HP.key[KEYS[e.key]] = 1;
    show();
  };
  HP.ku = e => { if (HP && KEYS[e.key]) { HP.key[KEYS[e.key]] = 0; show(); } };
  addEventListener('keydown', HP.kd);
  addEventListener('keyup', HP.ku);
  show();
  $('#hpyes').onclick = () => hopAnswer(true);
  $('#hpno').onclick = () => hopAnswer(false);
  GH.wire({quit: () => hopQuit(), hold: on => {
    if (!HP) return;
    HP.paused = on;
    HP.ptr = {};
    show();
  } });
  gtStart('#gtm', () => hopTimeUp());
  const first = !r.runs && !c.i;
  setTimeout(() => {
    if (!HP || HP.st !== st) return;
    const tip = c.w && !HOP_COURSES.slice(0, c.i).some(x => x.w == c.w && r.best[x.id]) ? ['', 'Tap again in the air to hop higher!', 'Hop onto a kite cloud for a ride!',
      'Step on the red switch to open the gate!'][c.w] : '';
    hopMsg(first || !tip ? (mode == 'one' ? 'Tap to hop!' : 'Arrows to walk, Jump to hop!') : tip, 2200);
    if (S.voice) say(first ? 'Tap to hop! Find the three stars and reach the flag!' : tip || c.name);
  }, 250);
  const loop = ts => {
    if (!HP || HP.st !== st) return;
    if (!document.getElementById('hpcv')) return hopStop();
    const t0 = hopNow(), dt = HP.last ? Math.min(.1, (ts - HP.last) / 1000) : 0;
    if (HP.last) {
      HP.fi.push(ts - HP.last);
      if (HP.fi.length > 240) HP.fi.shift();
    }
    HP.last = ts;
    if (HP.ready && !document.hidden && !HP.paused && !GH.held && !st.done && st.wait != 'offer') {
      HP.acc += dt * HOP_DEV.fast;
      let n = 0;
      while (HP.acc >= HOP_DT && n < 8 * HOP_DEV.fast && !st.done && st.wait != 'offer') {
        const on = HP.on || new Set();
        hopStep(st, { jump: HP.pend || on.has('j'), dir: (on.has('r') ? 1 : 0) - (on.has('l') ? 1 : 0) });
        HP.pend = false;
        hopEvents();
        HP.acc -= HOP_DT;
        n++;
      }
      HP.acc = Math.min(HP.acc, HOP_DT);
    }
    if (HP.boing) HP.boing.t -= dt;
    hopDraw(HP, HP.ready ? dt : 0);
    HP.ft.push(hopNow() - t0);
    if (HP.ft.length > 240) HP.ft.shift();
    // a slow tablet: fewer pixels (down to 60 %) when frames take long; back up when there is time to spare
    if (++HP.fc % 90 == 0 && HP.fi.length >= 60) {
      const med = HP.fi.slice(-60).sort((a, b) => a - b)[30], q = HP.q;
      if (med > 26 && HP.q > .6) HP.q = Math.max(.6, HP.q - .15);
      else if (med < 18 && HP.q < 1 && HP.fc - HP.qAt > 300) HP.q = Math.min(1, HP.q + .1);
      if (HP.q != q) {
        HP.qAt = HP.fc;
        hopSize(HP);
      }
    }
    HP.raf = requestAnimationFrame(loop);
  };
  HP.raf = requestAnimationFrame(loop);
}
// what happened in the course: sounds, bits, messages, the chips
const HOP_SCALE = [72, 74, 76, 79, 81, 84, 86, 88];
function hopEvents() {
  const st = HP.st, p = st.p, tr = HOP_TRAILS.find(t => t[0] === HP.r.trail);
  for (const [k, a] of st.ev) {
    if (k == 'jump' || k == 'jump2') {
      hopTone(k == 'jump' ? 330 : 520, .12, 0, 'sine', .07, k == 'jump' ? 640 : 980);
      if (tr && tr[3]) hopFx(p.x, p.y + .2, 4, tr[0] == 'rainbow' ? ['r', 'o', 'y', 'g', 'b', 'v'][Math.floor(st.t * 7) % 6] : tr[3], 1.2, .1);
    } else if (k == 'spring') {
      hopTone(220, .3, 0, 'triangle', .08, 900);
      HP.boing = { x: hopSpringAt(st), t: .3 };
      HP.shake = .5;
      hopMsg('Boing!', 700);
    } else if (k == 'land') {
      if (!hopCalm()) hopFx(p.x, p.y + .05, 4, 'w', 1.4, .1);
      HP.sq = 1;
    } else if (k == 'spk') {
      hopTone(NOTE(HOP_SCALE[(a - 1) % 8] + 12), .08, 0, 'sine', .06);
      hopFx(p.x, p.y + .8, 3, 'y', 2, .07);
    } else if (k == 'star') {
      SFX.star();
      hopFx(p.x, p.y + .8, 8, 'y', 3, .1);
      const n = hopBits(st.stars);
      hopMsg(n == 3 ? 'All three stars!' : `A star! ${n} of 3`, 1400, 'big');
      UI.setChip($('#hpst'), n + '/3');
    } else if (k == 'puff') {
      SFX.giggle();
      HP.shake = .6;
      hopMsg('Boing! A friendly puff.', 1000);
    } else if (k == 'gate') {
      hopTone(300, .3, 0, 'triangle', .08, 120);
      hopMsg('Step on the switch to open the gate!', 1800);
    } else if (k == 'switch') {
      hopTone(660, .08, 0, 'square', .04);
      hopTone(990, .14, .08, 'triangle', .06);
      hopMsg('The gate is open!', 1200);
    } else if (k == 'cp') {
      [0, 4, 7].forEach((d, i) => hopTone(NOTE(79 + d), .12, i * .07, 'triangle', .06));
      if (st.wait != 'lift') hopMsg('Checkpoint!', 900);
    } else if (k == 'fall') {
      noise(.25, 0, .06, 300, 1400);
      hopTone(500, .25, 0, 'sine', .05, 200);
      hopFx(p.x, Math.max(p.y, st.C.cps[st.cp].y - 2), 6, 'w', 2, .25, true);
    } else if (k == 'back') hopMsg(st.cpF[st.cp] >= 3 ? '' : 'Whoops! Try again from the flag.', 1100);
    else if (k == 'offer') {
      SFX.pop(3);
      const o = $('#hpoffer');
      if (o) o.hidden = false;
      if (S.voice) say('Need a lift? The balloon can carry you to the next flag.');
    } else if (k == 'lift') SFX.magic();
    else if (k == 'goal') {
      hopMsg('You made it!', 1500, 'big');
      SFX.fanfare();
      gtStop();
      HP.endT = setTimeout(() => { if (HP && HP.st === st) hopFinish(); }, hopCalm() ? 400 : 1300);
    }
  }
  st.ev.length = 0;
  const s = Math.floor(st.t);
  if (s != HP.sec) {
    HP.sec = s;
    const el = $('#hpclk b');
    if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
}
const hopSpringAt = st => {
  let best = null;
  for (const s of st.C.springs) if (!best || Math.abs(s.x - st.p.x) < Math.abs(best.x - st.p.x)) best = s;
  return best ? best.x : 0;
};
function hopAnswer(yes) {
  if (!HP) return;
  const o = $('#hpoffer');
  if (o) o.hidden = true;
  hopHelp(HP.st, yes);
  SFX.pop(yes ? 3 : 1);
  if (!yes) hopMsg('Okay! You can do it!', 1300);
}
// keep the stars found so far (quit, time up, the flag)
function hopKeepStars() {
  if (!HP) return;
  const r = hopS();
  if (HP.st.stars) r.stars[HP.c.id] = (r.stars[HP.c.id] || 0) | HP.st.stars;
}
function hopQuit() {
  hopKeepStars();
  save();
  hopStop();
  gtStop();
  hopMenu();
}
function hopTimeUp() {
  hopKeepStars();
  save();
  hopStop();
  timeUpOverlay();
}
// the flag: the time and the medal, the stars, what opened; the shared end card
// what a finished course changes in the save: the best time (lowest), the stars found (added), the medal (highest), the next course
function hopRecord(r, c, st) {
  const before = hopStarsAll(r), had = r.best[c.id], ms = Math.max(1, Math.round(st.t * 1000)), md = hopMedal(c, st.t);
  const next = HOP_COURSES[c.i + 1], opening = !!next && !hopOpen(next, r), rec = !had || ms < had;
  if (rec) r.best[c.id] = ms;
  r.stars[c.id] = (r.stars[c.id] || 0) | st.stars;
  r.medal[c.id] = Math.max(r.medal[c.id] || 0, md);
  r.runs++;
  if (next) r.cur = next.id;
  const trails = HOP_TRAILS.filter(t => t[2] && before < t[2] && hopStarsAll(r) >= t[2]);
  return { ms, md, had, rec, next, opening, trails, gotNow: hopBits(st.stars), gotAll: hopBits(r.stars[c.id]) };
}
function hopFinish() {
  const st = HP.st, c = HP.c, r = hopS(), id = c.id;
  const { ms, md, had, rec, next, opening, trails, gotNow, gotAll } = hopRecord(r, c, st);
  save();
  hopStop();
  const lines = [], MED = ['', 'Bronze', 'Silver', 'Gold'];
  lines.push(['medal', `${MED[md]} medal! Gold: ${hopGold(c)} s.` + (had && !rec ? ` Your best: ${hopTime(had)}.` : '')]);
  lines.push(['star', gotAll == 3 ? 'You found all three stars on this course!' : `Stars found on this course: ${gotAll} of 3. Look up high and down low!`]);
  if (opening) lines.push(['sparkle', next.w != c.w ? `New world: ${esc(HOP_WORLDS[next.w].name)}!` : `New course: ${esc(next.name)}!`]);
  for (const t of trails) lines.push(['sparkle', `New sparkle trail: ${esc(t[1])}!`]);
  if (st.helped) lines.push(['balloon', 'The helper balloon gave you a lift. Try it on your own next time!']);
  const time = ptLeft() > 0;
  const o = GH.end('hop', { win: true, title: 'You reached the flag!', stars: gotNow, tag: rec && had ? 'New best time!' : '',
    stats: [[hopTime(ms), 'time', 'timer'], [String(st.spk), 'sparkles', 'sparkle'], [MED[md], 'medal', 'medal']], lines,
    btns: (time ? (next ? UI.btn('Next course', { kind: 'primary', size: 'lg', icon: 'play', id: 'hpnext', wide: true }) : '') +
      UI.btn('Play again', { kind: next ? 'soft' : 'primary', size: next ? 'md' : 'lg', icon: 'replay', id: 'hpagain', wide: true }) :
      UI.btn('Earn more game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'hplearn', wide: true })) +
      UI.btn('Courses', { icon: 'map', id: 'hpmenu', wide: true }) });
  if (S.voice) say(`You reached the flag! ${gotNow ? `You found ${gotNow} ${gotNow == 1 ? 'star' : 'stars'}. ` : ''}Well done, ${S.name || 'friend'}!`);
  const go = f => { o.remove(); f(); };
  const again = cid => go(() => (ptLeft() > 0 ? hopPlay(cid) : hopMenu()));
  if (o.querySelector('#hpnext')) o.querySelector('#hpnext').onclick = () => again(next.id);
  if (o.querySelector('#hpagain')) o.querySelector('#hpagain').onclick = () => again(id);
  if (o.querySelector('#hplearn')) o.querySelector('#hplearn').onclick = () => go(() => home());
  o.querySelector('#hpmenu').onclick = () => go(() => hopMenu());
}

// The Game Room card (59-game-hub.js shows it after the games file's games)
GH.reg({
  id: 'hop', btn: 'ghop', name: 'Sky Hop', icon: 'balloon', p: 'disc', sky: ['sky-1', 'sky'], art: () => hopHubArt(),
  sub: () => {
    const r = hopPeek();
    return hopNum(r.runs, 0, 1e7) ? `<span>${ico('star', 18)}<b>${hopStarsAll(r)}</b> of 72 stars</span><span>${ico('trophy', 18)}<b>${hopDone(r)}</b> of 24</span>`
      : '<span>Hop through the clouds with your pet</span>';
  },
  open: () => hopMenu(), tapToPlay: '#hopgo', saved: 'Your stars are saved.',
});

var GAMES2_VER='v153'; // last line: the whole file ran (checked by dataReady() before the app starts)
