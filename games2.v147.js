/* Star School games2 v147. BUILT by tools/build.py from 49-game-skyhop.css, 49-game-snack.css, 65-game-snack.js, 67-game-skyhop.js: never edit by hand.
   index.html v147 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v147.js. */
(function(){var s=document.createElement('style');s.id='css-games2';s.textContent="/* Sky Hop (G-04b; src/js/67-game-skyhop.js). Ships in games2.<VER>.js. Tokens only; motion is transform/opacity on --t-* tokens.\n   The menu (the child's pet on a cloud, One-touch / Free move, the worlds, the courses, sparkle trails) and the course: a full-screen\n   canvas under the shared top bar (.gh-hud), big hop and walk buttons, a message bubble and the helper balloon's question. */\n\n/* ---- menu ---- */\n.hp-menu{padding:var(--s-2) var(--s-4) var(--s-7)}\n.hp-menu>*{max-width:1000px;margin-left:auto;margin-right:auto}\n.hp-h{margin:var(--s-5) auto var(--s-3);font-size:var(--fs-4);color:var(--ink)}\n.hp-hero{display:flex;align-items:center;gap:var(--s-4);padding:var(--s-3) var(--s-4);border-radius:var(--r-hero);\n  background:linear-gradient(var(--gh-a),var(--gh-b));box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--disc-shade)}\n.hp-hpet{position:relative;flex:1 1 45%;max-width:280px;margin:0 auto;padding-bottom:var(--s-2)}\n.hp-pet{position:relative;z-index:1;display:block;width:62%;margin:0 auto -12%}\n.hp-pet svg{display:block;width:100%;height:auto}\n.hp-hcl{display:block;width:100%;height:auto}\n.hp-hinfo{flex:1 1 55%;display:flex;flex-direction:column;gap:var(--s-3);align-items:stretch;min-width:0}\n.hp-hl{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-3);color:var(--ink)}\n.hp-hl .ic,.hp-wsub .ic,.hp-tr small .ic{color:var(--star-shade)}\n@media (max-width:560px){.hp-hero{flex-direction:column;align-items:stretch}.hp-hpet{width:60%}}\n.hp-mode{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2) var(--s-4)}\n.hp-mode p{margin:0;flex:1 1 220px;font-size:var(--fs-2);color:var(--ink-2)}\n.hp-worlds{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s-3)}\n@media (min-width:760px){.hp-worlds{grid-template-columns:repeat(4,minmax(0,1fr))}}\n.hp-world{display:flex;flex-direction:column;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.hp-world:active,.hp-crs:active,.hp-tr:active{transform:translateY(3px)}\n.hp-world.on{box-shadow:inset 0 0 0 3px var(--disc),0 4px 0 var(--disc-shade)}\n.hp-wpic{position:relative;display:block;aspect-ratio:12/5;border-radius:var(--r-btn);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.hp-wpic svg{position:absolute;inset:0;width:100%;height:100%;display:block}\n.hp-world.lock .hp-wpic svg{opacity:.45}\n.hp-wlock{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.hp-wname{font-size:var(--fs-3);font-weight:700;line-height:1.2}\n.hp-wsub{display:flex;align-items:center;gap:var(--s-1);min-height:22px;font-size:var(--fs-2);color:var(--ink-2)}\n.hp-crss{display:grid;gap:var(--s-3)}\n@media (min-width:700px){.hp-crss{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media (min-width:980px){.hp-crss{grid-template-columns:repeat(3,minmax(0,1fr))}}\n.hp-crs{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;align-items:center;gap:var(--s-2) var(--s-3);min-height:72px;padding:var(--s-3);\n  border:0;border-radius:var(--r-card);background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.hp-crs.on{box-shadow:inset 0 0 0 3px var(--disc),0 5px 0 var(--disc-shade)}\n.hp-cn{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--disc-tint);color:var(--disc-shade);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700}\n.hp-ci{display:flex;flex-direction:column;min-width:0;line-height:1.25}\n.hp-ci b{font-size:var(--fs-3)}.hp-ci span{font-size:var(--fs-2);color:var(--ink-2)}\n.hp-cr{display:flex;flex-direction:column;align-items:flex-end;gap:2px}\n.hp-md{display:grid;place-items:center;color:var(--ill-brown-1)}\n.hp-md.m2{color:var(--ill-grey-1)}.hp-md.m3{color:var(--star-shade)}\n.hp-go{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--disc);color:var(--surface);box-shadow:0 3px 0 var(--disc-shade)}\n.hp-crs.lock{background:var(--surface-2)}.hp-crs.lock .hp-go{background:var(--surface);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line)}\n.hp-crs.lock .hp-cn{background:var(--surface);color:var(--ink-3)}\n.hp-trs{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:var(--s-2)}\n.hp-tr{display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-2) var(--s-3);border:0;border-radius:var(--r-pill);\n  background:var(--surface);color:var(--ink);font:inherit;font-size:var(--fs-2);font-weight:700;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.hp-tr.on{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--good-ink)}\n.hp-tr.lock{background:var(--surface-2);color:var(--ink-3)}\n.hp-tr small{display:flex;align-items:center;margin-left:auto;font-size:var(--fs-1)}\n.hp-dot{flex:none;width:22px;height:22px;border-radius:50%;background:var(--ill-yellow);box-shadow:inset -3px -3px 0 var(--ill-yellow-2)}\n.hp-t-none{background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.hp-t-pink{background:var(--ill-pink);box-shadow:inset -3px -3px 0 var(--ill-pink-2)}\n.hp-t-sky{background:var(--ill-aqua);box-shadow:inset -3px -3px 0 var(--ill-aqua-2)}\n.hp-t-leaf{background:var(--ill-green);box-shadow:inset -3px -3px 0 var(--ill-green-2)}\n.hp-t-grape{background:var(--ill-purple);box-shadow:inset -3px -3px 0 var(--ill-purple-2)}\n.hp-t-rainbow{background:conic-gradient(var(--ill-red),var(--ill-orange),var(--ill-yellow),var(--ill-green),var(--ill-blue),var(--ill-purple),var(--ill-red))}\n.hp-how{display:grid;gap:var(--s-2);margin:var(--s-4) 0;padding:0;list-style:none}\n@media (min-width:760px){.hp-how{grid-template-columns:1fr 1fr}}\n.hp-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.hp-hi{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--disc-tint);color:var(--disc-shade)}\n\n/* ---- the course ---- */\n.hpg{position:fixed;inset:0;z-index:0;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;background:var(--sc-sky)}\n.hpg canvas{position:absolute;inset:0;width:100%;height:100%;display:block}\n.hp-msg{position:absolute;left:50%;top:22%;max-width:calc(100% - 32px);padding:var(--s-2) var(--s-5);border-radius:var(--r-pill);background:var(--surface);\n  color:var(--ink);font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;text-align:center;pointer-events:none;box-shadow:0 4px 0 var(--ledge-soft);\n  opacity:0;transform:translate(-50%,-12px) scale(.9);transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.hp-msg.on{opacity:1;transform:translate(-50%,0) scale(1)}\n.hp-msg.big{font-size:var(--fs-6);padding:var(--s-2) var(--s-6)}\n.hp-ctl{position:absolute;left:0;right:0;bottom:0;pointer-events:none}\n.hp-btn{position:absolute;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;justify-content:center;\n  width:clamp(96px,14vw,124px);height:clamp(96px,14vw,124px);padding:0;border:0;border-radius:32px;background:var(--disc-tint);color:var(--disc-shade);\n  font:inherit;font-family:var(--font-display);font-size:var(--fs-3);font-weight:700;pointer-events:auto;touch-action:none;opacity:.92;\n  box-shadow:inset 0 0 0 3px var(--wash),0 6px 0 var(--disc-shade);transition:transform var(--t-fast) var(--ease)}\n.hp-btn .ic{width:44px;height:44px}\n.hp-btn.on{transform:translateY(5px) scale(.96);opacity:1}\n#hpj{right:14px;background:var(--disc);color:var(--surface)}\n#hpl{left:14px}#hpr{left:calc(28px + clamp(96px,14vw,124px))}\n@media (max-width:400px){.hp-free .hp-btn{width:96px;height:96px}.hp-free #hpr{left:118px}}\n.hp-offer{position:absolute;inset:0;z-index:3;display:grid;place-items:center;padding:var(--s-4);background:var(--dim)}\n.hp-offer[hidden]{display:none}\n.hp-ocard{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:min(420px,100%);padding:var(--s-4) var(--s-5) var(--s-5);\n  border-radius:var(--r-hero);background:var(--surface);box-shadow:0 8px 0 var(--ledge-soft);text-align:center}\n.hp-obal{width:84px;height:auto}\n.hp-ocard p{margin:0;font-size:var(--fs-4);font-weight:700;line-height:1.3;color:var(--ink)}\n.hp-oacts{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-3);width:100%}\n.hp-oacts .btn{flex:1 1 150px;min-height:64px}\n/* Snack Stand (G-04a; src/js/65-game-snack.js). Ships in games2.<VER>.js. Tokens only; motion is transform/opacity on --t-* tokens.\n   The menu (hero with the child's stand, places, Calm / Busy, give change), the stand shop, and the day: the place behind the stand,\n   the awning and sign, the customers with their order bubbles, the counter (Undo, the plate, Serve), the stations and the food. */\n\n/* ---- menu ---- */\n.sn-menu,.sn-shop{padding:var(--s-2) var(--s-4) var(--s-7)}\n.sn-menu>*,.sn-shop>*{max-width:1000px;margin-left:auto;margin-right:auto}\n.sn-h{display:flex;align-items:baseline;gap:var(--s-2);margin:var(--s-5) auto var(--s-3);font-size:var(--fs-4);color:var(--ink)}\n.sn-got{font-size:var(--fs-2);font-weight:400;color:var(--ink-2)}\n.sn-hero{display:flex;align-items:center;gap:var(--s-4);padding:var(--s-3) var(--s-4);border-radius:var(--r-hero);\n  background:linear-gradient(var(--gh-a),var(--gh-b) 72%,var(--sc-green) 73%);box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.sn-hpic{flex:1 1 58%;min-width:0}.sn-hpic svg{display:block;width:100%;height:auto}\n.sn-hinfo{flex:1 1 42%;display:flex;flex-direction:column;gap:var(--s-3);align-items:stretch;min-width:0}\n.sn-hl{display:flex;align-items:center;gap:var(--s-2);margin:0;font-size:var(--fs-3);color:var(--ink)}\n.sn-hl .ic:not(.ic-coin),.sn-psub .ic{color:var(--star-shade)}\n@media (max-width:560px){.sn-hero{flex-direction:column;align-items:stretch}.sn-hpic{max-width:420px;margin:0 auto;width:100%}}\n.sn-places{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s-3)}\n@media (min-width:760px){.sn-places{grid-template-columns:repeat(5,minmax(0,1fr))}}\n.sn-place{display:flex;flex-direction:column;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);transition:transform var(--t-fast) var(--ease)}\n.sn-place:active{transform:translateY(3px)}\n.sn-place.on{box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-ppic{position:relative;display:block;aspect-ratio:2/1;border-radius:var(--r-btn);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.sn-ppic svg{position:absolute;inset:0;width:100%;height:100%;display:block}\n.sn-place.lock .sn-ppic svg{opacity:.45}\n.sn-plock{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.sn-pname{font-size:var(--fs-3);font-weight:700;line-height:1.2}\n.sn-psub{display:flex;align-items:center;gap:var(--s-1);min-height:22px;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-opts{margin-top:var(--s-2)}\n.sn-mode{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2) var(--s-4);margin-bottom:var(--s-3)}\n.sn-mode p{margin:0;flex:1 1 220px;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-how{display:grid;gap:var(--s-2);margin:var(--s-4) 0;padding:0;list-style:none}\n@media (min-width:760px){.sn-how{grid-template-columns:1fr 1fr}}\n.sn-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.sn-hi{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--bt-tint);color:var(--bt-shade)}\n\n/* ---- shop ---- */\n.sn-shero{position:relative;padding:var(--s-3);border-radius:var(--r-hero);background:linear-gradient(var(--gh-a),var(--gh-b) 72%,var(--sc-green) 73%);\n  box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.sn-shero>svg{display:block;width:100%;max-width:560px;height:auto;margin:0 auto}\n.sn-buy{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:var(--s-2) var(--s-3);margin-top:var(--s-3);padding:var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-bpic{width:72px;height:72px;display:grid;place-items:center}.sn-bpic svg{width:100%;height:100%}\n.sn-btxt p{margin:0;font-size:var(--fs-3);line-height:1.35;color:var(--ink)}.sn-btxt p+p{font-size:var(--fs-2);color:var(--ink-2)}\n.sn-btxt .ic{vertical-align:-4px}\n.sn-bacts{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:var(--s-2)}.sn-bacts .btn{flex:1 1 140px}\n.sn-note{margin:var(--s-3) auto 0;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:var(--s-3)}\n.sn-item{display:flex;flex-direction:column;align-items:center;gap:var(--s-1);min-height:var(--tap);padding:var(--s-2);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;touch-action:manipulation;box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);\n  transition:transform var(--t-fast) var(--ease)}\n.sn-item:active{transform:translateY(3px)}\n.sn-item.on{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.sn-item.sel{box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-ipic{display:grid;place-items:center;width:100%;height:64px}.sn-ipic svg{max-width:100%;height:64px}\n.sn-iname{font-size:var(--fs-2);font-weight:700;line-height:1.2;text-align:center}\n.sn-iprice{display:flex;align-items:center;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-item.on .sn-iprice{color:var(--good-ink)}\n\n/* ---- the day: the scene, the counter, the controls ---- */\n.sn{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;user-select:none;-webkit-user-select:none;background:var(--ill-brown-2)}\n.sn-scene{position:relative;flex:1 1 0;min-height:150px;overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.sn-back{position:absolute;inset:0;width:100%;height:100%;display:block}\n.sn-scene::before,.sn-scene::after{content:'';position:absolute;bottom:0;top:40px;width:14px;z-index:1;\n  background:linear-gradient(90deg,var(--ill-brown-1),var(--ill-brown) 40%,var(--ill-brown-2))}\n.sn-scene::before{left:6px}.sn-scene::after{right:6px}\n.sn-awnw{position:absolute;left:0;right:0;top:0;height:52px;z-index:2}\n.sn-awn{display:block;width:100%;height:52px}\n.sn-bunt{position:absolute;left:0;right:0;top:48px;height:24px;z-index:2}.sn-bunt svg{display:block;width:100%;height:100%}\n.sn-sign{position:absolute;top:14px;left:50%;z-index:3;display:grid;min-width:150px;padding:5px 16px;border-radius:10px;transform:translateX(-50%);\n  background:var(--ill-brown-2);color:var(--ill-white);font-family:var(--font-display);font-size:var(--fs-3);font-weight:700;text-align:center;line-height:1.2;\n  box-shadow:inset 0 2px 0 var(--ill-brown),inset 0 -3px 0 var(--ill-brown-3),0 3px 0 var(--shadow-ink);transition:transform var(--t-slow) var(--ease)}\n.sn-sign>span{grid-area:1/1;transition:opacity var(--t) var(--ease)}\n.sn-sign .sn-sb{opacity:0}\n.sn-sign.shut{animation:sn-flip var(--t-slow) var(--ease)}\n.sn-sign.shut .sn-sf{opacity:0}.sn-sign.shut .sn-sb{opacity:1}\n.sn-s-star{background:var(--ill-yellow);color:var(--ill-brown-3);box-shadow:inset 0 2px 0 var(--ill-yellow-1),inset 0 -3px 0 var(--ill-yellow-3),0 3px 0 var(--shadow-ink)}\n.sn-s-heart{background:var(--ill-pink);color:var(--ill-white);box-shadow:inset 0 2px 0 var(--ill-pink-1),inset 0 -3px 0 var(--ill-pink-3),0 3px 0 var(--shadow-ink)}\n.sn-s-lights{background:var(--ill-purple-2);color:var(--ill-yellow-1);\n  box-shadow:inset 0 0 0 3px var(--ill-yellow-1),inset 0 -3px 0 var(--ill-purple-3),0 3px 0 var(--shadow-ink)}\n@keyframes sn-flip{0%{transform:translateX(-50%) rotateX(0)}50%{transform:translateX(-50%) rotateX(90deg)}100%{transform:translateX(-50%) rotateX(0)}}\n.sn-deco,.sn-bird{position:absolute;z-index:1;pointer-events:none}.sn-deco svg,.sn-bird svg{display:block;width:100%;height:auto}\n.sn-d-flowers{left:22px;bottom:0;width:58px}\n.sn-d-board{left:78px;bottom:0;width:58px}\n.sn-d-balloons{left:20px;top:78px;width:62px}\n.sn-d-plant{right:22px;bottom:0;width:66px}\n.sn-d-jar{right:88px;bottom:0;width:40px}\n.sn-d-bell{right:130px;bottom:0;width:38px}\n.sn-d-lantern{right:30px;top:52px;width:40px}\n.sn-bird{right:16%;top:-14px;width:46px;z-index:3}\n.sn-msg{position:absolute;left:50%;bottom:8px;z-index:6;max-width:calc(100% - 32px);padding:var(--s-2) var(--s-4);border-radius:var(--r-pill);\n  background:var(--surface);color:var(--ink);font-size:var(--fs-3);font-weight:700;text-align:center;line-height:1.25;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft);opacity:0;transform:translate(-50%,8px);pointer-events:none;\n  transition:opacity var(--t) var(--ease),transform var(--t) var(--ease)}\n.sn-msg.on{opacity:1;transform:translate(-50%,0)}\n.sn-msg.good{background:var(--good-tint);color:var(--good-ink);box-shadow:inset 0 0 0 2px var(--good),0 4px 0 var(--good)}\n.sn-msg.try{background:var(--try-tint);color:var(--try-ink);box-shadow:inset 0 0 0 2px var(--try),0 4px 0 var(--try)}\n\n/* customers: the order bubble over (or beside) the animal; the animal stands behind the counter */\n.sn-line{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;justify-content:center;align-items:flex-end;gap:var(--s-2);padding:0 26px}\n.sn-cu{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;animation:sn-in var(--t-slow) var(--spring)}\n@keyframes sn-in{from{opacity:0;transform:translateX(40px)}}\n.sn-bub{position:relative;display:grid;grid-template-columns:repeat(3,48px);gap:4px;padding:6px;border-radius:18px;background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--shadow-ink)}\n.sn-bub::after{content:'';position:absolute;left:50%;bottom:-9px;width:16px;height:16px;margin-left:-8px;background:var(--surface);\n  transform:rotate(45deg);box-shadow:2px 2px 0 var(--line);z-index:-1}\n.sn-bub.n1{grid-template-columns:48px}.sn-bub.n2,.sn-bub.n4{grid-template-columns:repeat(2,48px)}\n.sn-oi{position:relative;display:block;width:48px;height:48px;border-radius:10px;background:var(--surface-2)}\n.sn-oi>svg{display:block;width:100%;height:100%}\n.sn-oi.ok{background:var(--good-tint)}\n.sn-oi>i{position:absolute;right:-4px;top:-4px;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--good);color:var(--surface);\n  animation:sn-pop var(--t) var(--spring)}\n.sn-oi.look{animation:sn-look var(--t-shake) var(--ease) 2}\n@keyframes sn-pop{from{transform:scale(0)}}\n@keyframes sn-look{50%{transform:translateY(-6px) scale(1.08)}}\n.sn-bub.yum{display:flex;align-items:center;gap:6px;padding:8px 12px;color:var(--ill-pink-2);font-weight:700;font-size:var(--fs-2);white-space:nowrap}\n.sn-bub.yum span{color:var(--ink)}\n.sn-heart{display:flex;align-items:center;gap:4px;color:var(--ill-pink-2)}\n.sn-hbar{display:block;width:64px;height:10px;border-radius:5px;background:var(--surface);box-shadow:inset 0 0 0 2px var(--ill-pink-1);overflow:hidden}\n.sn-hbar i{display:block;height:100%;background:var(--ill-pink);transform-origin:left center;transition:transform var(--t) linear}\n.sn-heart.out{color:var(--ink-3)}.sn-heart.out .sn-hbar{box-shadow:inset 0 0 0 2px var(--line)}\n.sn-an{display:block;width:96px;height:96px;margin-bottom:-14px;padding:0;border:0;background:none;cursor:pointer;touch-action:manipulation;border-radius:50%}\n.sn-an svg{display:block;width:100%;height:100%}\n.sn-cu.sel .sn-bub{box-shadow:inset 0 0 0 3px var(--bt),0 4px 0 var(--bt-shade)}\n.sn-cu.happy .sn-an{animation:sn-hop var(--t-slow) var(--ease) 2}\n@keyframes sn-hop{50%{transform:translateY(-14px)}}\n.sn-line.big .sn-an{width:124px;height:124px}\n.sn-line.big .sn-bub{grid-template-columns:repeat(3,58px)}\n.sn-line.big .sn-bub.n1{grid-template-columns:58px}.sn-line.big .sn-bub.n2{grid-template-columns:repeat(2,58px)}\n.sn-line.big .sn-oi{width:58px;height:58px}\n@media (min-height:720px){\n  .sn-line.big .sn-an{width:140px;height:140px;margin-bottom:-18px}\n  .sn-line.big .sn-bub{grid-template-columns:repeat(3,64px);gap:6px;padding:8px}\n  .sn-line.big .sn-bub.n1{grid-template-columns:64px}.sn-line.big .sn-bub.n2{grid-template-columns:repeat(2,64px)}\n  .sn-line.big .sn-oi{width:64px;height:64px}\n  .sn-plate{height:128px}\n}\n\n@media (min-height:880px) and (min-width:560px){\n  .sn-line.big .sn-an{width:190px;height:190px;margin-bottom:-24px}\n  .sn-line.big .sn-bub{grid-template-columns:repeat(3,84px)}\n  .sn-line.big .sn-bub.n1{grid-template-columns:84px}.sn-line.big .sn-bub.n2{grid-template-columns:repeat(2,84px)}\n  .sn-line.big .sn-oi{width:84px;height:84px}\n  .sn-an{width:124px;height:124px}\n  .sn-bub{grid-template-columns:repeat(3,60px)}.sn-bub.n1{grid-template-columns:60px}.sn-bub.n2,.sn-bub.n4{grid-template-columns:repeat(2,60px)}\n  .sn-oi{width:60px;height:60px}\n  .sn-plate{height:150px}\n}\n/* short landscape screens: the bubble beside the animal */\n@media (min-aspect-ratio:4/3) and (max-height:700px){\n  .sn-cu{flex-direction:row-reverse;align-items:flex-end;gap:10px}\n  .sn-cu .sn-heart{position:absolute;margin:0 0 -2px}\n  .sn-cu{position:relative}\n  .sn-bub{margin-bottom:22px}\n  .sn-bub::after{left:-6px;bottom:22px;margin:0;box-shadow:-2px 2px 0 var(--line)}\n  .sn-cu .sn-heart{left:6px;top:-18px}\n  .sn-line{gap:var(--s-5)}\n  .sn-line.big .sn-an{width:110px;height:110px}\n}\n\n/* the counter: Undo, the plate, Serve */\n.sn-counter{position:relative;z-index:5;flex:none;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:var(--s-2);\n  padding:10px var(--s-3) 8px;background:linear-gradient(var(--ill-brown-1) 0 8px,var(--ill-tan-1) 8px);box-shadow:0 -2px 0 var(--ill-brown-2)}\n.sn-undo,.sn-serve{min-width:80px;min-height:64px;flex-direction:column;gap:2px;padding:6px 10px}\n.sn-serve{min-width:92px}\n.sn-plate{position:relative;height:96px;display:grid;place-items:end center}\n.sn-plsvg{display:block;width:100%;height:100%}\n.sn-plate.bump .sn-plsvg{animation:sn-bump var(--t) var(--spring)}\n@keyframes sn-bump{50%{transform:scale(1.05)}}\n.sn-ph{position:absolute;left:0;right:0;top:30%;text-align:center;font-size:var(--fs-2);color:var(--ink-2)}\n.sn-ctl,.sn-till{position:relative;z-index:5;flex:none;display:flex;flex-direction:column;gap:var(--s-2);padding:var(--s-2) var(--s-3) var(--s-3);\n  background:repeating-linear-gradient(90deg,var(--ill-brown) 0 58px,var(--ill-brown-2) 58px 60px)}\n.sn-c-mint .sn-ctl,.sn-c-mint .sn-till{background:var(--ill-aqua);background-image:linear-gradient(var(--ill-aqua-2) 2px,transparent 2px),\n  linear-gradient(90deg,var(--ill-aqua-2) 2px,transparent 2px);background-size:40px 40px}\n.sn-c-candy .sn-ctl,.sn-c-candy .sn-till{background:repeating-linear-gradient(110deg,var(--ill-pink) 0 22px,var(--ill-white-2) 22px 44px)}\n.sn-ctl[hidden],.sn-till[hidden]{display:none}\n.sn-tabs{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:6px;max-width:640px;width:100%;margin:0 auto}\n.sn-tab{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-height:64px;padding:4px 2px;border:0;\n  border-radius:var(--r-btn);background:var(--wash);color:var(--ink);font:inherit;font-size:var(--fs-2);font-weight:700;line-height:1.1;cursor:pointer;\n  touch-action:manipulation;box-shadow:0 3px 0 var(--shadow-ink);transition:transform var(--t-fast) var(--ease)}\n.sn-tab:active{transform:translateY(3px)}\n.sn-tpic{width:34px;height:34px}.sn-tpic svg{display:block}\n.sn-tab[aria-selected=\"true\"]{background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt),0 3px 0 var(--bt-shade)}\n.sn-dot{position:absolute;right:6px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--good);opacity:0;transform:scale(.4);\n  transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.sn-tab.ready .sn-dot{opacity:1;transform:none}\n.sn-ings{display:flex;justify-content:center;gap:6px}\n.sn-ing{flex:0 1 96px;min-width:64px}.sn-pan{flex:0 1 128px;min-width:96px}\n.sn-ing,.sn-pan{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;min-height:80px;padding:4px 2px;border:0;\n  border-radius:var(--r-btn);background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;touch-action:none;\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--shadow-ink);transition:transform var(--t-fast) var(--ease)}\n.sn-ing:active,.sn-pan:active{transform:translateY(3px)}\n.sn-ipc{width:52px;height:52px}.sn-ipc svg{display:block}\n.sn-pan svg{width:60px;height:56px}\n.sn-pan[data-q=\"gold\"]{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.sn-in{font-size:var(--fs-2);font-weight:700;line-height:1.1;text-align:center}\n.sn-ghost{position:fixed;left:0;top:0;z-index:50;width:72px;height:72px;pointer-events:none}\n.sn-ghost svg{display:block}\n@media (max-height:620px){\n  .sn-plate{height:84px}\n  .sn-counter{padding-top:8px;padding-bottom:4px}\n  .sn-tab{min-height:64px}\n  .sn-ing,.sn-pan{min-height:72px}\n  .sn-ipc{width:44px;height:44px}\n  .sn-ctl{gap:6px;padding-top:6px;padding-bottom:var(--s-2)}\n}\n@media (min-width:900px){.sn-ing{flex-basis:112px}}\n\n/* give change: the till */\n.sn-till{align-items:center}\n.sn-tq{margin:0;padding:var(--s-2) var(--s-3);border-radius:var(--r-btn);background:var(--surface);font-size:var(--fs-3);line-height:1.3;text-align:center;color:var(--ink)}\n.sn-tray{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;min-height:48px;padding:4px var(--s-3);border-radius:var(--r-pill);background:var(--wash)}\n.sn-tc{position:relative;width:40px;height:40px}.sn-tc svg{display:block;width:100%;height:100%}\n.sn-tc b,.sn-coin b{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--font-display);color:var(--ill-brown-3)}\n.sn-tc b{font-size:var(--fs-2)}\n.sn-tph{font-size:var(--fs-2);color:var(--ink)}\n.sn-tsum{margin-left:var(--s-2);font-size:var(--fs-3);color:var(--ink)}\n.sn-tbtns{display:flex;flex-wrap:wrap;justify-content:center;gap:6px}\n.sn-coin{position:relative;width:64px;height:64px;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;touch-action:manipulation;\n  transition:transform var(--t-fast) var(--ease)}\n.sn-coin:active{transform:translateY(3px)}\n.sn-coin svg{display:block;width:100%;height:100%}.sn-coin b{font-size:var(--fs-4);padding-bottom:4px}\n.sn-tundo,.sn-give{min-height:64px;flex-direction:column;gap:2px;padding:6px 12px}\n\n/* top-bar chips */\n.sn-cust{grid-area:2/1;display:block;font-family:var(--font-body);font-size:var(--fs-2);font-weight:400;opacity:.92}\n\n/* P6-01: a customer at the edge of the scene keeps its whole focus ring (the scene clips) */\n.sn-an:focus-visible{outline-offset:-4px}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
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
    if (SN.noClick) {
      SN.noClick = false;
      return;
    }
    snAddFood(b.dataset.ing);
  });
  box.addEventListener('pointerdown', e => {
    const b = e.target.closest('.sn-ing');
    if (!b || !SN) return;
    SN.noClick = false; // a new touch: the click a finished drag left behind (if any) has been and gone
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
  SN.noClick = true; // the click this drag leaves behind is ignored; it is cleared by the next touch, never by a timer (a slow
                     // tablet could send it late, and the food went on the plate twice)
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

var GAMES2_VER='v147'; // last line: the whole file ran (checked by dataReady() before the app starts)
