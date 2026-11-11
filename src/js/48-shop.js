/* ---------- pet shop ---------- */
function stageHTML(sc,title,sub,sticky){return`<div class="stage ${sc[0]=='space'?'dark':''} ${sticky?'sticky':''}" style="background:${sc[3]}" id="stage">
  <span class="sdeco" style="left:14px;top:12px">${sc[2]}</span><span class="sdeco" style="right:14px;bottom:12px">${sc[2]}</span>
  <div class="petbig ${petAura()}" id="pet">${petHTML()}</div><div class="hname">${title}</div>${sub?`<div class="htxt">${sub}</div>`:''}</div>`}
let shopTab='hat';
function shop(){const sc=sceneOf(),items=shopTab=='hat'?SHOP.hat.concat(BPRIZE.filter(h=>S.owned[h]).map(h=>[h,0,'boss'])):SHOP[shopTab];
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🛍️ Pet Shop</div><div class="sp"></div><div class="stars" id="coinc">${ico('coin','1.2em','ic-coin')} ${S.coins}</div></div>
  <div class="scroll" style="padding-top:0">${stageHTML(sc,esc(petN()),'Tap an item to try it on!',true)}
  <div class="tabs">${[['hat','🎩 Hats'],['toy','🧸 Toys'],['scene','🏝️ Places']].map(([k,l])=>`<button class="btn sm tab ${k==shopTab?'on':''}" data-t="${k}">${l}</button>`).join('')}</div>
  <div class="shopgrid">${items.map(it=>{const id=it[0],own=S.owned[id],wear=shopTab=='scene'?S.wear.scene==id:S.wear[shopTab]==id;
    return`<button class="btn item ${own?'own':''} ${wear?'wear':''}" data-id="${id}"><span>${shopTab=='scene'?it[2]:id}</span>${shopTab=='scene'?it[4]:''}<div>${wear?'✅ On':own?'Tap to use':ico('coin','1.2em','ic-coin')+' '+it[1]}</div></button>`}).join('')}</div></div>`);
  $('#back').onclick=()=>home(true);
  $$('.tab').forEach(b=>b.onclick=()=>{shopTab=b.dataset.t;shop()});
  $$('.item').forEach(b=>b.onclick=()=>{const id=b.dataset.id,it=items.find(x=>x[0]==id);
    if(!S.owned[id]){if(S.coins<it[1]){SFX.wrong();anim(b,'sad');fb(`Need ${it[1]-S.coins} more coins!`,'warn');return}
      S.coins-=it[1];S.owned[id]=1;SFX.coin(0);setTimeout(()=>SFX.coin(4),120);setTimeout(()=>SFX.magic(),260);confetti(14)}
    else SFX.pop(2);
    if(shopTab=='scene')S.wear.scene=id;else S.wear[shopTab]=S.wear[shopTab]==id?'':id;
    save();shop();anim($('#pet'),'jump');if(S.voice&&Math.random()<.5)say(pick(['I love it!','So cool!','Thank you!','Looking good!']))})}

