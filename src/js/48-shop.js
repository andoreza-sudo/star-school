/* ---------- pet shop ---------- */
// P4-12: the stage is the scene Home draws for the shop place (HM_SCENE, 46-home.js), so no emoji props; sc-<id> sets its sky
function stageHTML(sc,title,sub,sticky){const id=HM_SCENE[sc[0]]?sc[0]:'meadow';return`<div class="stage gx-stage sc-${id} ${id=='space'?'dark':''} ${sticky?'sticky':''}" id="stage">
  <svg class="gx-scene" viewBox="0 0 160 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${HM_SCENE[id]()}</svg>
  <div class="petbig ${petAura()}" id="pet">${petHTML()}</div><div class="hname">${title}</div>${sub?`<div class="htxt">${sub}</div>`:''}</div>`}
let shopTab='hat';
function shop(){const sc=sceneOf(),items=shopTab=='hat'?SHOP.hat.concat(BPRIZE.filter(h=>S.owned[h]).map(h=>[h,0,'boss'])):SHOP[shopTab];
  view(`<div class="top"><button class="btn sm" id="back" aria-label="Back">${ico('back',20)}</button><div class="title">${ico('bag','1.1em','ic-play')} Pet Shop</div><div class="sp"></div><div class="stars" id="coinc">${ico('coin','1.2em','ic-coin')} ${S.coins}</div></div>
  <div class="scroll" style="padding-top:0">${stageHTML(sc,esc(petN()),'Tap an item to try it on!',true)}
  <div class="tabs">${[['hat',ico('hat','1.2em')+' Hats'],['toy',ico('teddy','1.2em')+' Toys'],['scene',ico('image','1.2em')+' Places']].map(([k,l])=>`<button class="btn sm tab ${k==shopTab?'on':''}" data-t="${k}">${l}</button>`).join('')}</div>
  <div class="shopgrid">${items.map(it=>{const id=it[0],own=S.owned[id],wear=shopTab=='scene'?S.wear.scene==id:S.wear[shopTab]==id;
    return`<button class="btn item ${own?'own':''} ${wear?'wear':''}" data-id="${id}"><span>${shopTab=='scene'?it[2]:id}</span>${shopTab=='scene'?it[4]:''}<div>${wear?ico('check','1.1em','ic-good')+' On':own?'Tap to use':ico('coin','1.2em','ic-coin')+' '+it[1]}</div></button>`}).join('')}</div></div>`);
  $('#back').onclick=()=>home(true);
  $$('.tab').forEach(b=>b.onclick=()=>{shopTab=b.dataset.t;shop()});
  $$('.item').forEach(b=>b.onclick=()=>{const id=b.dataset.id,it=items.find(x=>x[0]==id);
    if(!S.owned[id]){if(S.coins<it[1]){SFX.wrong();anim(b,'sad');fb(`Need ${it[1]-S.coins} more coins!`,'warn');return}
      S.coins-=it[1];S.owned[id]=1;SFX.coin(0);setTimeout(()=>SFX.coin(4),120);setTimeout(()=>SFX.magic(),260);confetti(14)}
    else SFX.pop(2);
    if(shopTab=='scene')S.wear.scene=id;else S.wear[shopTab]=S.wear[shopTab]==id?'':id;
    save();shop();anim($('#pet'),'jump');if(S.voice&&Math.random()<.5)say(pick(['I love it!','So cool!','Thank you!','Looking good!']))})}

