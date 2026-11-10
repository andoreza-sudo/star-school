const fs=require('fs');
const path=require('path'),SRC=path.join(__dirname,'..','src');
const cat=d=>fs.readdirSync(path.join(SRC,d)).filter(n=>n.endsWith('.js')).sort().map(n=>fs.readFileSync(path.join(SRC,d,n),'utf8')).join('');
const js=cat('js')+cat('data'); // all code and data, without boot.js
global.localStorage={getItem:()=>null,setItem:()=>{}};
global.document={querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
global.navigator={};global.addEventListener=()=>{};global.location={protocol:'file:'};
global.speechSynthesis={getVoices:()=>[]};
eval(js+`
S.name='Ava';S.buddy='Ben';G={built:[]};global.setTimeout=()=>{};
let n=0,errs=[];
for(const id in SK){for(let lv=1;lv<=SK[id].max;lv++)for(let i=0;i<3000;i++){const q=SK[id].gen(lv);n++;
 if(!q.label||q.ans===undefined)errs.push(id+' missing');
 if(q.kind=='num'){const a=+q.ans;if(!(a>=0)||String(a)!==q.ans)errs.push(id+lv+' bad ans '+q.ans+' '+q.label)}
 if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(q.ans))errs.push(id+' ans not in choices');if(new Set(vs).size!==vs.length)errs.push(id+' dup choices '+vs);if(vs.length<2)errs.push(id+' few choices');vs.forEach(v=>{if(BAD.test(v))errs.push('BAD '+v)})}
 if(q.kind=='build'&&q.tiles.length<q.word.length)errs.push('tiles');
 hintHTML(q);
}}
// check story subtraction non-negative & level ranges
console.log('generated',n,'errors',errs.length,[...new Set(errs)].slice(0,10));
for(const id in SK)console.log(id,[1,2,3].filter(l=>l<=SK[id].max).map(l=>SK[id].gen(l).label).join(' | '));
`);

// ---- P0-03: save schema version and migrations ----
{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  let merrs=[];
  const bad=m=>merrs.push(m);
  eval(js+`
  const store={};
  const ls={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
  global.localStorage=ls;
  const reset=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
  const keep=['stars','coins','pet','petName','name','buddy'];
  for(const name of ['midway','maxed','legacy-single-map','legacy-index-maps']){
    const raw=fx(name),before=JSON.parse(raw);
    reset(raw);
    for(const k of keep)if(before[k]!==undefined&&JSON.stringify(S[k])!==JSON.stringify(before[k]))bad(name+': '+k+' changed');
    if(S.v!==LATEST||LATEST!==MIGRATIONS.length)bad(name+': S.v '+S.v);
    if(store[KEY+'-bak']!==raw)bad(name+': no backup of the old save');
    if(JSON.parse(store[KEY]).v!==LATEST)bad(name+': migrated save not stored');
    for(const p in PATHS)if(!S.maps[p])bad(name+': no map '+p);
    if(before.maps&&before.mapv){for(const p in before.maps)if(JSON.stringify(S.maps[p])!==JSON.stringify(before.maps[p]))bad(name+': maps '+p+' changed')}
    const once=JSON.stringify(S);migrate();if(JSON.stringify(S)!==once)bad(name+': migrate not idempotent');
  }
  // old single map: stops 0,1,2,5 of the old list are add1 sight1 cnt1 build1 (math and read paths)
  reset(fx('legacy-single-map'));
  if(S.map!==undefined||S.mapv!==2)bad('legacy-single-map: S.map not folded');
  if(!(S.maps.math.add1===2&&S.maps.math.cnt1===1&&S.maps.read.sight1===3&&S.maps.read.build1===2))bad('legacy-single-map: map progress '+JSON.stringify(S.maps));
  // maps keyed by index become keyed by stop id
  reset(fx('legacy-index-maps'));
  const mn=NODES.math.filter(n=>n.sk!='boss');
  if(!(S.maps.math[nid(mn[0])]===2&&S.maps.math[nid(mn[1])]===3&&S.maps.math[nid(mn[2])]===1&&S.maps.read[nid(NODES.read.filter(n=>n.sk!='boss')[0])]===1))bad('legacy-index-maps: re-keyed '+JSON.stringify(S.maps.math));
  // empty save: new, at the latest version, nothing to back up
  reset(null);
  if(S.v!==LATEST||S.stars!==0||S.coins!==0||!S.maps.math)bad('empty save wrong');
  if(KEY+'-bak' in store)bad('empty save made a backup');
  // a save from a newer app is left alone
  reset(JSON.stringify({...JSON.parse(fx('midway')),v:LATEST+5}));
  if(S.v!==LATEST+5||(KEY+'-bak') in store)bad('newer save touched');
  // corrupt JSON: no crash, kept aside, KEY untouched until save()
  const junk='{"stars":12,"coins":';
  reset(junk);
  if(store[KEY+'-corrupt']!==junk)bad('corrupt not kept');
  if(store[KEY]!==junk)bad('corrupt save overwritten before save()');
  if(S.stars!==0||S.v!==LATEST||!SAVE_CORRUPT)bad('corrupt not replaced by a new save');
  save();
  if(store[KEY+'-corrupt']!==junk||JSON.parse(store[KEY]).v!==LATEST)bad('save() after corrupt');
  reset('[1,2]');if(store[KEY+'-corrupt']!=='[1,2]'||S.v!==LATEST)bad('non-object save');
  // save() reports a full storage and recovers
  ls.setItem=()=>{throw new Error('quota')};
  save();if(!SAVE_FAILED)bad('save failure not flagged');
  ls.setItem=(k,v)=>{store[k]=String(v)};
  save();if(SAVE_FAILED)bad('save failure flag stuck');
  `);
  console.log('migration tests: errors',merrs.length,merrs.slice(0,10));
  if(merrs.length)process.exitCode=1;
}
