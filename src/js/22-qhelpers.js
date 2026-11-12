/* ---------- question helpers ---------- */
const SLOT='<span class="slot" id="slot"></span>';
const PAL=['#f97316','#ec4899','#facc15','#84cc16','#38bdf8','#a855f7','#d6d3d1','#92400e','#14b8a6','#2563eb'];
function mathQ(a,op,b,c,blank,vert,extra={}){
  const v={a,b,c},sym=op=='+'?'+':'−',w=op=='+'?'plus':'minus',f=k=>k===blank?SLOT:v[k];
  const html=vert?`<div class="veq"><div>${f('a')}</div><div><span class="op">${sym}</span>${f('b')}</div><div class="bar"></div><div>${f('c')}</div></div>`:`<div class="eq">${f('a')} ${sym} ${f('b')} = ${f('c')}</div>`;
  const sw=k=>k===blank?'what':v[k];
  return Object.assign({kind:'num',html,say:`${sw('a')} ${w} ${sw('b')} equals ${sw('c')}?`,ans:String(v[blank]),hint:{k:'blocks',a,b,c,op,blank},
    label:`${blank=='a'?'?':a} ${sym} ${blank=='b'?'?':b} = ${blank=='c'?'?':c}`},extra)}
const coin=()=>rnd()<.5;
/* R-01m: a count with its noun, singular for exactly 1 (and -1), in question text, speech and hints alike:
   qN(1, 'pencil') "1 pencil", qN(3, 'pencil') "3 pencils", qN(1, 'box', 'boxes'); qW(n, one, many) is the noun alone.
   tools/test.js "math review fixes R-01m" scans every math skill and level for a 1 followed by a plural. */
const qW = (n, one, many) => (Math.abs(+n) === 1 ? one : many || one + 's');
const qN = (n, one, many) => `${n} ${qW(n, one, many)}`;
// R-01s: the English plural of a noun (or of the last word of a phrase: "ice cream" -> "ice creams"). One helper for shown and
// spoken text, so "the beaches" and "More than one dog!" never drift apart. Irregular nouns first, then the spelling rules:
// -s -x -z -ch -sh take -es (beaches, buses, boxes), a consonant + y takes -ies (babies), everything else takes -s.
const EN_PL_IRR={fish:'fish',sheep:'sheep',deer:'deer',tooth:'teeth',foot:'feet',goose:'geese',mouse:'mice',child:'children',man:'men',woman:'women',
  person:'people',leaf:'leaves',knife:'knives',wolf:'wolves',loaf:'loaves',shelf:'shelves',half:'halves',potato:'potatoes',tomato:'tomatoes',hero:'heroes'};
function enPlural(w){const m=/^(.*?)([a-z]+)$/i.exec(String(w));if(!m)return w;const [,pre,x]=m,lo=x.toLowerCase();
  if(EN_PL_IRR[lo])return pre+EN_PL_IRR[lo];
  if(/(s|x|z|ch|sh)$/.test(lo))return pre+x+'es';
  if(/[^aeiou]y$/.test(lo))return pre+x.slice(0,-1)+'ies';
  return pre+x+'s'}
/* genQ(sk,lv,seed): build one question of skill sk, level lv, from a seed (uint32; random when omitted). Same (sk,lv,seed) gives the same question.
   The question is stamped with q.sk, q.lv, q.seed. RNG is always restored, even if the generator throws. */
function genQ(sk,lv,seed){
  if(seed==null)seed=Math.floor(Math.random()*4294967296);
  seed=seed>>>0;
  const prev=RNG;RNG=mulberry32(seed);
  try{const q=SK[sk].gen(lv);q.sk=sk;q.lv=lv;q.seed=seed;return q}
  finally{RNG=prev}}

