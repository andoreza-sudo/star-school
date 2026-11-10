/* ---------- question helpers ---------- */
const SLOT='<span class="slot" id="slot"></span>';
const PAL=['#f97316','#ec4899','#facc15','#84cc16','#38bdf8','#a855f7','#d6d3d1','#92400e','#14b8a6','#2563eb'];
function mathQ(a,op,b,c,blank,vert,extra={}){
  const v={a,b,c},sym=op=='+'?'+':'−',w=op=='+'?'plus':'minus',f=k=>k===blank?SLOT:v[k];
  const html=vert?`<div class="veq"><div>${f('a')}</div><div><span class="op">${sym}</span>${f('b')}</div><div class="bar"></div><div>${f('c')}</div></div>`:`<div class="eq">${f('a')} ${sym} ${f('b')} = ${f('c')}</div>`;
  const sw=k=>k===blank?'what':v[k];
  return Object.assign({kind:'num',html,say:`${sw('a')} ${w} ${sw('b')} equals ${sw('c')}?`,ans:String(v[blank]),hint:{k:'blocks',a,b,c,op,blank},
    label:`${blank=='a'?'?':a} ${sym} ${blank=='b'?'?':b} = ${blank=='c'?'?':c}`},extra)}
const coin=()=>Math.random()<.5;

