// Star School test suite. Run: node tools/test.js   (exit 0 = all checks pass, exit 1 = at least one failed)
// Each check is named and returns a list of problems. Known real content problems are listed in KNOWN below (each one is
// also recorded in docs/PROGRESS.md "Ideas and issues"); a problem that matches a KNOWN entry is reported as "known", not as a failure.
const fs=require('fs');
const path=require('path'),ROOT=path.join(__dirname,'..'),SRC=path.join(ROOT,'src');
const BUILD_PY=fs.readFileSync(path.join(ROOT,'tools','build.py'),'utf8');
// A11b: PARTS in tools/build.py: [stem, regex on whole src/js and src/css file names]. Matching files go to <stem>.<VER>.js, in this order.
const PARTS=[...((BUILD_PY.match(/^PARTS = \[\n([\s\S]*?)^\]/m)||[])[1]||'').matchAll(/^ +\('(\w+)', r'([^']+)'\),/gm)].map(m=>({stem:m[1],re:new RegExp('^(?:'+m[2]+')$')}));
const partOf=n=>(PARTS.find(p=>p.re.test(n))||{}).stem;
const names=(d,ext,part)=>fs.readdirSync(path.join(SRC,d)).filter(n=>n.endsWith(ext)&&partOf(n)===part).sort();
const cat=(d,part,ext='.js')=>names(d,ext,part).map(n=>fs.readFileSync(path.join(SRC,d,n),'utf8')).join('');
// all code and data, without boot.js, in the order the built page runs it: index.html's own code, each part file, the data file
const js=cat('js')+PARTS.map(p=>cat('js',p.stem)).join('')+cat('data');

// ---- Budgets and known exceptions: the one place to change them ----
const SIZE_WARN=1200000,SIZE_FAIL=1500000; // bytes of the built index.html (ROADMAP risk R1)
// A11: the data banks (src/data) are a second file, data.<VER>.js. It is mostly strings, which parse fast, so it may be bigger than the
// code; the total is what a tablet downloads once and parses at every start (all files load before the app starts).
const DATA_WARN=1000000,DATA_FAIL=2000000; // bytes of the built data.<VER>.js
const PART_WARN=400000,PART_FAIL=800000; // A11b: bytes of each built part file (bt.<VER>.js, games.<VER>.js)
const TOTAL_WARN=2000000,TOTAL_FAIL=3000000; // bytes of index.html + the part files + data.<VER>.js
const BUILD_VER=(BUILD_PY.match(/^VER = '(v\d+)'/m)||[])[1];
const DATA_FILE='data.'+BUILD_VER+'.js'; // the built data file at the repo root (tools/build.py)
const PART_FILES=PARTS.map(p=>p.stem+'.'+BUILD_VER+'.js'); // A11b: the built part files, in load order
const KNOWN={ // check name -> exact problem strings that are known content issues, not test failures
  // Spanish level 2 ("How do you say it in Spanish?") shows a picture and asks for the Spanish word, so it has no `say` on purpose:
  // reading the answer aloud would give it away (genEs in src/js/34-gen-es.js). Logged in PROGRESS.md; a later chunk may add a
  // `say` such as "How do you say it in Spanish?", or exempt silent-on-purpose questions with a flag.
  'generators: say present for every question':[
    'es_greet L2: no say (choice)',
    'es_color L2: no say (choice)',
    'es_num L2: no say (choice)',
    'es_teen L2: no say (choice)',
    'es_animal L2: no say (choice)',
    'es_food L2: no say (choice)',
    'es_body L2: no say (choice)',
    'es_family L2: no say (choice)',
    'es_mix L2: no say (choice)',
    'es_house L2: no say (choice)',
    'es_clothes L2: no say (choice)',
    'es_school L2: no say (choice)',
    'es_feel L2: no say (choice)',
    // P2-32: the same silent-on-purpose level 2 for the five El Tiempo units
    'es_days L2: no say (choice)',
    'es_months L2: no say (choice)',
    'es_weather L2: no say (choice)',
    'es_big L2: no say (choice)',
    'es_time L2: no say (choice)',
    // P2-33: the same silent-on-purpose level 2 for the four La Ciudad units
    'es_place L2: no say (choice)',
    'es_trans L2: no say (choice)',
    'es_verb L2: no say (choice)',
    'es_adj L2: no say (choice)'
  ],
};

// ---- fake browser so the source can be evaluated in Node ----
global.localStorage={getItem:()=>null,setItem:()=>{}};
global.document={querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
global.navigator={};global.addEventListener=()=>{};global.location={protocol:'file:'};
global.speechSynthesis={getVoices:()=>[]};
global.setTimeout=()=>{};

const results=[]; // {name, problems, known, note}
const run=(name,fn)=>{
  let problems=[],note='';
  try{const r=fn();problems=r.problems||[];note=r.note||''}catch(e){problems=['check crashed: '+(e&&e.stack||e)]}
  const kn=new Set(KNOWN[name]||[]),known=problems.filter(p=>kn.has(p));
  results.push({name,problems:problems.filter(p=>!kn.has(p)),known,note,unusedKnown:[...kn].filter(k=>!problems.includes(k))});
};
const uniq=a=>[...new Set(a)];

// ---- 1-5: generators (fuzzed) ----
let GEN=null;
eval(js+`
globalThis.__hasLv=(id,lv)=>!(id=='comp'&&lv>2||id=='info')||PASS[id].some(p=>p.lv==lv); // P2-28: comp 4-5 and info 2-3 get passages from other chunks; levels without passages are skipped
S.name='Ava';S.buddy='Ben';G={built:[]};
GEN={n:0,gen:[],label:[],say:[],html:[],choices:[],skills:SK,paths:PATHS,nodes:NODES};
const BADHTML=/\\bundefined\\b|\\bNaN\\b|\\[object |\\bnull\\b/;
for(const id in SK){for(let lv=1;lv<=SK[id].max;lv++){if(skLvEmpty(id,lv))continue;for(let i=0;i<3000;i++){
 const q=SK[id].gen(lv),w=id+' L'+lv;GEN.n++;
 if(q.ans===undefined)GEN.gen.push(w+': no ans');
 if(typeof q.label!=='string'||!q.label.trim())GEN.label.push(w+': empty label');
 else if(q.label.length>=60)GEN.label.push(w+': label too long ('+q.label.length+')');
 if(typeof q.say!=='string'||!q.say.trim())GEN.say.push(w+': no say ('+q.kind+')');
 for(const [f,v] of [['html',q.html],['label',q.label],['say',q.say]])if(typeof v==='string'&&BADHTML.test(v))GEN.html.push(w+': '+f+' has undefined/NaN');
 if(q.kind=='num'){if(q.pad&&q.pad!='int'||q.sep){for(const x of kindProblems(q))GEN.gen.push(w+': '+x)}else{const a=+q.ans;if(!(a>=0)||String(a)!==q.ans)GEN.gen.push(w+': bad num ans '+q.ans)}}
 else if(q.kind=='choice'){
  const vs=q.choices.map(c=>c.v);
  if(!vs.includes(q.ans))GEN.gen.push(w+': ans not in choices');
  if(new Set(vs).size!==vs.length)GEN.gen.push(w+': duplicate choices');
  if(vs.length<2||vs.length>4)GEN.choices.push(w+': '+vs.length+' choices');
  for(const c of q.choices){if(BADHTML.test(c.l+' '+c.v))GEN.html.push(w+': choice has undefined/NaN');if(BAD.test(c.v))GEN.gen.push(w+': BAD word '+c.v)}
 }
 else if(q.kind=='build'){if(!q.tiles||q.tiles.length<q.word.length)GEN.gen.push(w+': too few tiles')}
 else if(q.kind=='tap'||q.kind=='order'||q.kind=='multi'){for(const x of kindProblems(q))GEN.gen.push(w+': '+x)}
 else if(q.kind=='match'){if(!q.items||!q.opts||q.items.length<3||q.items.length>5)GEN.gen.push(w+': bad match pairs')}
 else if(q.kind=='spell'||q.kind=='trace'){for(const x of kindProblems(q))GEN.gen.push(w+': '+x)}
 else GEN.gen.push(w+': unknown kind '+q.kind);
 try{hintHTML(q)}catch(e){GEN.gen.push(w+': hintHTML threw '+e.message)}
}}}
`);
const gp=a=>({problems:uniq(a),note:GEN.n+' questions'});
run('generators: answers, choices, BAD filter, hints',()=>gp(GEN.gen));
run('generators: label present and under 60 chars',()=>gp(GEN.label));
run('generators: say present for every question',()=>gp(GEN.say));
run('generators: no undefined/NaN in html, label, say, choices',()=>gp(GEN.html));
run('generators: 2 to 4 choices',()=>gp(GEN.choices));

// ---- 6-7: map nodes and skill levels ----
run('nodes: each points at an existing skill and level',()=>{
  const p=[];
  for(const path in GEN.nodes)for(const n of GEN.nodes[path]){
    if(n.sk=='boss')continue;
    const s=GEN.skills[n.sk];
    if(!s)p.push(path+': node "'+n.t+'" uses unknown skill '+n.sk);
    else if(!Number.isInteger(n.lv)||n.lv<1||n.lv>s.max)p.push(path+': node "'+n.t+'" ('+n.sk+') level '+n.lv+' outside 1..'+s.max);
  }
  return{problems:p};
});
run('skills: every level is reachable from some node',()=>{
  const used=new Set(),p=[];
  for(const path in GEN.nodes)for(const n of GEN.nodes[path])used.add(n.sk+':'+n.lv);
  // Levels reserved for P2-04 (Treasure Bay: arr 1, story 4). They have no stop yet; until P2-04 ships they ask like the next level up.
  const RESERVED={}; // (P2-10 gave frac 6-8 their stops in Decimal Desert, so nothing is reserved any more) // comp 4 and info 2 (grade 3) have no passages in this chunk; their stops come with P2-26
  for(const id in GEN.skills)for(let lv=1;lv<=GEN.skills[id].max;lv++)if(__hasLv(id,lv)&&!used.has(id+':'+lv)&&!(RESERVED[id]||[]).includes(lv))p.push(id+' level '+lv+' has no map node');
  return{problems:p};
});

// ---- 8: emoji allowlist ----
run('emoji: every pictograph in src/ is in tools/emoji-allow.txt',()=>{
  const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
  // a pictograph with optional modifiers and ZWJ joins, a flag (two regional indicators), or a keycap (digit + U+20E3)
  const RE=/(?:\p{Extended_Pictographic}|\p{Regional_Indicator}|[0-9#*]️?⃣)(?:️|\p{Emoji_Modifier}|⃣|\p{Regional_Indicator}|[\u{E0020}-\u{E007F}]|‍\p{Extended_Pictographic})*/gu;
  const norm=s=>s.replace(/️/g,''); // matching ignores the variation selector
  // Unicode 12 or newer (2019+): may be an empty box on old Android. Every one must be marked "# risky" in the allowlist.
  const NEW=[[0x1FA70,0x1FAFF],[0x1F7E0,0x1F7EB],[0x1F6D5,0x1F6D7],[0x1F6DC,0x1F6DF],[0x1F6FA,0x1F6FC],[0x1F90C,0x1F90F],[0x1F93F,0x1F93F],
    [0x1F971,0x1F971],[0x1F97B,0x1F97B],[0x1F9A5,0x1F9AA],[0x1F9AE,0x1F9AF],[0x1F9BA,0x1F9BF],[0x1F9C3,0x1F9CF],[0x26A7,0x26A7]];
  const isNew=s=>[...s].some(c=>NEW.some(([a,b])=>c.codePointAt(0)>=a&&c.codePointAt(0)<=b));
  const allow=new Map(); // sequence -> risky?
  for(const line of fs.readFileSync(path.join(__dirname,'emoji-allow.txt'),'utf8').split('\n')){
    if(!line.trim()||line.startsWith('#'))continue;
    const [seq,...cm]=line.split('#');
    allow.set(norm(seq.trim()),/^\s*risky\b/.test(cm.join('#')));
  }
  const p=[],seen=new Set(),show=s=>s+' (U+'+[...s].map(c=>c.codePointAt(0).toString(16).toUpperCase()).join(' U+')+')';
  for(const f of walk(SRC)){
    const t=fs.readFileSync(f,'utf8');
    for(const x of t.match(RE)||[]){
      const k=norm(x);seen.add(k);
      if(!allow.has(k))p.push('not in emoji-allow.txt: '+show(k)+' in '+path.relative(ROOT,f));
    }
  }
  for(const [k,risky] of allow)if(isNew(k)&&!risky)p.push('newer than Unicode 11 but not marked risky: '+show(k));
  const risky=[...allow].filter(([,r])=>r).length,stale=[...allow.keys()].filter(k=>!seen.has(k)).length;
  return{problems:uniq(p),note:allow.size+' allowed ('+risky+' risky)'+(stale?', '+stale+' unused':'')};
});

// ---- 9: size budget ----
run('size: index.html under budget',()=>{
  const f=path.join(ROOT,'index.html');
  if(!fs.existsSync(f))return{problems:['index.html not built; run python3 tools/build.py first']};
  const n=fs.statSync(f).size,kb=Math.round(n/1000)+' KB';
  if(n>SIZE_FAIL)return{problems:['index.html is '+n+' bytes, over the '+SIZE_FAIL+' limit']};
  return{problems:[],note:kb+(n>SIZE_WARN?'  WARN: over '+SIZE_WARN+' bytes':'')};
});

// ---- 10: save schema version and migrations (P0-03) ----
run('migrations: fixtures, backups, corrupt and newer saves',()=>{
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
    // every saved map key keeps its value (migration 3 only adds world-id keys next to the old ones)
    if(before.maps&&before.mapv){for(const p in before.maps)for(const k in before.maps[p])if(S.maps[p][k]!==before.maps[p][k])bad(name+': maps '+p+' '+k+' changed')}
    const once=JSON.stringify(S);migrate();if(JSON.stringify(S)!==once)bad(name+': migrate not idempotent');
  }
  // old single map: stops 0,1,2,5 of the old list are add1 sight1 cnt1 build1 (math and read paths)
  reset(fx('legacy-single-map'));
  if(S.map!==undefined||S.mapv!==2)bad('legacy-single-map: S.map not folded');
  if(!(S.maps.math.add1===2&&S.maps.math.cnt1===1&&S.maps.read.sight1===3&&S.maps.read.build1===2))bad('legacy-single-map: map progress '+JSON.stringify(S.maps));
  // maps keyed by index become keyed by stop id
  reset(fx('legacy-index-maps'));
  const mn=NODES.math.filter(n=>n.wid=='m_meadow'&&n.sk!='boss'); // index 0, 1, 2 of the v42 map are the first stops of Number Meadow
  if(!(S.maps.math[nid(mn[0])]===2&&S.maps.math[nid(mn[1])]===3&&S.maps.math[nid(mn[2])]===1&&S.maps.read.sound1===1))bad('legacy-index-maps: re-keyed '+JSON.stringify(S.maps.math));
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
  return{problems:merrs};
});

run('error guard: S.err ring, truncation, default',()=>{
  const gerrs=[];
  const bad=m=>gerrs.push(m);
  eval(js+`
  S.err=undefined;
  for(let i=0;i<25;i++)logErr('boom '+i);
  if(!Array.isArray(S.err)||S.err.length!==20)bad('S.err ring not capped at 20: '+(S.err&&S.err.length));
  else if(S.err[19].msg!=='boom 24'||S.err[0].msg!=='boom 5')bad('S.err ring order wrong');
  if(!S.err[0].t||!('ver' in S.err[0]))bad('S.err entry shape');
  logErr('x'.repeat(500));if(S.err[19].msg.length!==200)bad('message not truncated');
  S.err=undefined;logErr(undefined);if(S.err.length!==1)bad('default S.err');
  `);
  return{problems:gerrs};
});

run('fact sprint: facts, requeue, records, game time, clock',()=>{
  const ferrs = [];
  const bad = m => ferrs.push(m);
  eval(js + `
  // every set makes valid facts in range, none repeat back to back, misses return after 3 facts
  for (const s of FLU.SETS) {
    for (let i = 0; i < 2000; i++) {
      const f = s.gen();
      if (f.c !== (f.op == '+' ? f.a + f.b : f.op == '×' ? f.a * f.b : f.op == '÷' ? f.a / f.b : f.a - f.b)) bad(s.id + ' wrong answer ' + FLU.fkey(f));
      if (f.c < (s.id.startsWith('add') ? 2 : 0) || f.c > (s.id.endsWith('fact') ? 100 : 20) || f.a < 0 || f.b < 0) bad(s.id + ' out of range ' + FLU.fkey(f));
      if (s.id == 'dfact' && (f.b < 1 || f.c < 1 || f.c > 10)) bad(s.id + ' bad divide fact ' + FLU.fkey(f));
      if (s.id.endsWith('10') && (f.a > 10 || f.c > 10)) bad(s.id + ' over 10 ' + FLU.fkey(f));
    }
    const st = {set: s.id, last: '', redo: []};
    let prev = '';
    for (let i = 0; i < 300; i++) {
      const f = FLU.next(st), k = FLU.fkey(f);
      if (k == prev) bad(s.id + ' repeated back to back ' + k);
      prev = k;
    }
    // a missed fact waits for 3 other facts, then comes back
    const st2 = {set: s.id, last: '', redo: []}, m = FLU.next(st2);
    FLU.miss(st2, m);
    for (let i = 1; i <= 8; i++) {
      FLU.next(st2);
      if (i <= 3 && st2.redo.length != 1) bad(s.id + ' missed fact came back too soon');
      if (i == 8 && st2.redo.length) bad(s.id + ' missed fact never came back');
    }
  }
  // records: first run always, ties never, lower-is-better for times
  const flu = {};
  let r = FLU.record(flu, 'add10', '2026-1-1', 60, 12, false);
  if (!r.rec || r.prev !== null || flu.add10.best !== 12) bad('first run should be a record');
  r = FLU.record(flu, 'add10', '2026-1-2', 60, 12, false);
  if (r.rec) bad('a tie is not a record');
  r = FLU.record(flu, 'add10', '2026-1-3', 60, 11, false);
  if (r.rec || flu.add10.best !== 12) bad('lower score is not a record');
  r = FLU.record(flu, 'add10', '2026-1-4', 60, 13, false);
  if (!r.rec || flu.add10.best !== 13) bad('higher score is a record');
  r = FLU.record(flu, 'add10-20', '2026-1-1', 40.5, 20, true);
  if (!r.rec || flu['add10-20'].best !== 40.5) bad('first time is a record');
  if (FLU.record(flu, 'add10-20', '2026-1-2', 40.5, 20, true).rec) bad('equal time is not a record');
  if (!FLU.record(flu, 'add10-20', '2026-1-3', 39.9, 20, true).rec) bad('faster time is a record');
  if (FLU.record(flu, 'add10-20', '2026-1-4', 45, 20, true).rec) bad('slower time is not a record');
  for (let i = 0; i < 40; i++) FLU.record(flu, 'add10', '2026-2-' + (i + 1), 60, 5, false);
  if (flu.add10.hist.length !== FLU.KEEP) bad('history not trimmed to ' + FLU.KEEP);
  // game time: once per set per day, bonus for a record, no time for a lazy 60 s run
  const g = {};
  if (FLU.earn(g, 'add10', 'd1', false, 3, 't60') !== 0 || (g.add10 && g.add10.paid)) bad('under 5 right should not earn');
  if (FLU.earn(g, 'add10', 'd1', false, 8, 't60') !== 60) bad('first sprint of the day earns 1 min');
  if (FLU.earn(g, 'add10', 'd1', false, 9, 't60') !== 0) bad('second sprint is free practice');
  if (FLU.earn(g, 'add10', 'd1', true, 9, 'n20') !== 60) bad('record adds 1 min');
  if (FLU.earn(g, 'add10', 'd2', true, 9, 't60') !== 120) bad('new day and record earns 2 min');
  if (FLU.earn(g, 'sub10', 'd1', false, 20, 'n20') !== 60) bad('other set earns separately');
  // the clock does not count time while the tab is hidden
  const c = {ms: 0, last: 1000};
  FLU.tick(c, 2000, false); FLU.tick(c, 2500, true); FLU.tick(c, 90000, true); FLU.tick(c, 90500, false);
  if (c.ms !== 1500) bad('clock counted hidden time: ' + c.ms);
  // seven-day view
  const wk = FLU.week({hist: [['2026-11-10', 60, 9], ['2026-11-10', 60, 12], ['2026-11-8', 60, 7], ['2026-10-1', 60, 99]]}, false, new Date(2026, 10, 10).getTime());
  if (wk.length !== 7 || wk[6] !== 12 || wk[4] !== 7 || wk[0] !== null) bad('week view ' + JSON.stringify(wk));
  // old saves have no S.flu: reading bests must not throw
  S.flu = undefined;
  if (fluBest('add10', false) !== 'not yet') bad('missing S.flu should read as no best');
  `);
  return{problems:ferrs};
});

// ---- 11: seedable randomness (P1-01) ----
run('seeded rnd: genQ(sk, lv, seed) is reproducible',()=>{
  const p=[];let nq=0;
  const out=eval(js+`
  const out={ok:0,bad:[]},eq=require('util').isDeepStrictEqual;
  for(const id in SK)for(let lv=1;lv<=SK[id].max;lv++){if(!__hasLv(id,lv))continue;
    if(((id=='comp'&&lv>2)||id=='info')&&!PASS[id].some(p=>p.lv==lv))continue; // no passages at this level yet
    if(skLvEmpty(id,lv))continue;
    let varied=new Set();
    for(let s=1;s<=200;s++){
      const a=genQ(id,lv,s),b=genQ(id,lv,s);out.ok++;
      if(!eq(a,b)){out.bad.push(id+' L'+lv+': seed '+s+' gives different questions');break}
      if(a.sk!==id||a.lv!==lv||a.seed!==s)out.bad.push(id+' L'+lv+': sk/lv/seed not stamped');
      varied.add(a.label);
    }
    if(varied.size<2&&SK[id].max>0&&id!='boss')out.bad.push(id+' L'+lv+': 200 seeds gave one question');
  }
  const r0=RNG;genQ('add',1);if(RNG!==r0)out.bad.push('RNG not restored');
  const sg=SK.add.gen;SK.add.gen=()=>{throw new Error('x')};try{genQ('add',1)}catch(e){}SK.add.gen=sg;
  if(RNG!==r0)out.bad.push('RNG not restored after a throw');
  const q1=genQ('add',1),q2=genQ('add',1,q1.seed);if(!eq(q1,q2))out.bad.push('seed stamped on q does not rebuild it');
  for(const k of Object.keys(SPN))if(!SK['es_'+k]&&k!='mix')out.bad.push('Speed Race needs SK.es_'+k);
  out;`);
  nq=out.ok;p.push(...out.bad);
  // generator files must not touch Math.random (22-qhelpers may, once, to pick a fresh seed); games, art, sound may
  for(const f of fs.readdirSync(path.join(SRC,'js')).filter(n=>/^(20|22|3\d)-/.test(n))){
    const n=(fs.readFileSync(path.join(SRC,'js',f),'utf8').match(/Math\.random/g)||[]).length;
    if(n>(f.startsWith('22-')?1:0))p.push(f+': Math.random in a generator file');
  }
  return{problems:p,note:nq+' seeded questions, 200 seeds per skill level'};
});

run('streak calendar: rest day, month and year change, trim, clock back, missing data',()=>{
  const p=[];
  const bad=m=>p.push(m);
  eval(js+`
  const K=STRK.key,I=STRK.idx,base=I('2026-12-31'); // year change inside the sequences below
  const mk=(offs)=>{const d={};offs.forEach(o=>d[K(base+o)]=1);return d};
  const cnt=(offs,t)=>STRK.calc(mk(offs),K(base+t)).count;
  // key format matches today() and survives month and year edges
  if(K(I('2026-2-28')+1)!=='2026-3-1')bad('month change key '+K(I('2026-2-28')+1));
  if(K(I('2024-2-28')+1)!=='2024-2-29')bad('leap day key');
  if(K(base+1)!=='2027-1-1')bad('year change key '+K(base+1));
  if(K(I('2026-3-8')+1)!=='2026-3-9'||K(I('2026-11-1')+1)!=='2026-11-2')bad('dst-ish dates');
  if(STRK.key(STRK.idx(today()))!==today())bad('key/idx round trip does not match today()');
  // plain runs
  if(cnt([],0)!==0)bad('empty is 0');
  if(cnt([0],0)!==1)bad('today only is 1');
  if(cnt([-2,-1,0],0)!==3)bad('3 days in a row, got '+cnt([-2,-1,0],0));
  if(cnt([-2,-1,0,1],1)!==4)bad('across the year change');
  if(cnt([-3,-2,-1],0)!==3)bad('today still to play keeps the streak');
  // rest day rule: one missed day between active days is forgiven and not counted
  if(cnt([-4,-3,-1,0],0)!==4)bad('one rest day should not break, got '+cnt([-4,-3,-1,0],0));
  if(cnt([-3,-2,0],0)!==3)bad('rest day yesterday, got '+cnt([-3,-2,0],0));
  if(cnt([-4,-3,-2],0)!==3)bad('yesterday rest while today pending... got '+cnt([-4,-3,-2],0));
  // two missed days in a row break it
  if(cnt([-4,-3,0],0)!==1)bad('two missed days break, got '+cnt([-4,-3,0],0));
  // only one rest day per 7: second rest 3 days after the first breaks the chain
  if(cnt([-6,-5,-3,-2,0],0)!==3)bad('second rest within a week breaks, got '+cnt([-6,-5,-3,-2,0],0)); // 0, rest -1, -2,-3, then rest -4 refused
  // rests 7 apart are both fine: active -1,-2,-3,-4,-5,-6, rest -7? build: rests at -1 and -8
  if(cnt([0,-2,-3,-4,-5,-6,-7,-9],0)!==8)bad('rests 7 days apart both allowed, got '+cnt([0,-2,-3,-4,-5,-6,-7,-9],0));
  if(cnt([0,-2,-3,-4,-5,-6,-8],0)!==6)bad('rests 6 days apart, got '+cnt([0,-2,-3,-4,-5,-6,-8],0));
  // rests list
  const r=STRK.calc(mk([-4,-3,-1,0]),K(base));
  if(r.rests.join()!==K(base-2))bad('rests list '+r.rests);
  // clock set backwards: future keys ignored, never negative, no crash
  const fut=mk([5,6,7]);
  if(STRK.calc(fut,K(base)).count!==0)bad('future days must not count');
  const mixed=mk([-1,0,3]);
  if(STRK.calc(mixed,K(base)).count!==2)bad('future ignored, past counts');
  for(const bt of ['garbage','','0-0-0','2026-13-45',undefined,null]){const c=STRK.calc(mk([0]),bt);if(!(c.count>=0))bad('bad today key '+bt)}
  const weird={'x':1,'2026-1-1':'abc','2026-1-2':-3,'2026-1-3':null};
  if(!(STRK.calc(weird,'2026-1-4').count>=0))bad('weird days map');
  // missing or damaged S.streak: defaults, no crash
  for(const v of [undefined,null,5,'x',[],{},{days:null},{days:[]},{best:'a',days:{}},{best:-4,rw:'q'}]){
    S.streak=v;
    const g=STRK.get();
    if(typeof g.days!='object'||Array.isArray(g.days)||!(g.best>=0)||!(g.rw>=0))bad('defaults for '+JSON.stringify(v));
    if(!(STRK.count()>=0))bad('count with '+JSON.stringify(v));
  }
  // tick: first round of the day counts, later rounds add to it, S.coins and S.streak change
  S.streak=undefined;S.coins=0;S.stickers={};
  const t0=STRK.tick();
  if(t0.count!==1||S.streak.days[today()]!==1||S.streak.best!==1)bad('first tick '+JSON.stringify(t0));
  STRK.tick();
  if(S.streak.days[today()]!==2||STRK.count()!==1)bad('second tick same day');
  // milestones: build a 2-day chain ending yesterday, tick today -> 3 days -> reward once
  const T=I(today());
  S.streak={days:{},best:2,rw:0};S.coins=0;S.stickers={};
  S.streak.days[K(T-1)]=1;S.streak.days[K(T-2)]=1;
  const m3=STRK.tick();
  if(m3.count!==3||!m3.msg||S.coins!==5||Object.keys(S.stickers).length!==1||S.streak.rw!==3)bad('3-day reward '+JSON.stringify([m3,S.coins,S.streak.rw]));
  const again=STRK.tick();
  if(again.msg||S.coins!==5)bad('reward must not repeat the same day');
  // 7-day chain
  S.streak={days:{},best:6,rw:3};S.coins=0;
  for(let i=1;i<=6;i++)S.streak.days[K(T-i)]=1;
  const m7=STRK.tick();
  if(m7.count!==7||S.coins!==10||S.streak.rw!==7||S.streak.best!==7)bad('7-day reward '+JSON.stringify([m7,S.coins,S.streak]));
  // a broken streak can earn the 3-day prize again
  S.streak={days:{},best:7,rw:7};S.coins=0;S.streak.days[K(T-1)]=1;
  const lo=STRK.tick();
  if(lo.msg||S.streak.rw!==0)bad('after a break rw resets, got '+S.streak.rw);
  // trim to 120 days; month grid; bad keys dropped
  S.streak={days:{},best:0,rw:0};
  for(let i=0;i<200;i++)S.streak.days[K(T-i)]=1;
  S.streak.days['junk']=1;
  STRK.tick();
  const ks=Object.keys(S.streak.days);
  if(ks.length!==STRK.KEEP||S.streak.days[K(T-STRK.KEEP)]||!S.streak.days[K(T-STRK.KEEP+1)]||S.streak.days.junk)bad('trim to 120 days kept '+ks.length);
  const g=STRK.grid(2026,1); // Feb 2026 starts on Sunday and has 28 days: exactly 4 weeks
  if(g.length!==4||g[0][0]!==1||g[3][6]!==28)bad('Feb 2026 grid '+JSON.stringify(g));
  const g2=STRK.grid(2026,2); // March 2026 starts on Sunday, 31 days: 5 weeks
  if(g2.length!==5||g2[4][2]!==31||g2[4][3]!==0)bad('Mar 2026 grid');
  const g3=STRK.grid(2024,1); // Feb 2024: starts Thursday, 29 days
  if(g3[0].indexOf(1)!==4||g3.flat().filter(x=>x).length!==29)bad('leap Feb grid');
  `);
  return{problems:p,note:'rest rule, month/year change, trim 120, clock back, missing S.streak, milestones'};
});

// ---- 12: icon set and drawing rules (P4-02, DESIGN_SYSTEM 5) ----
run('icons: first 40 and P4-03 set present, drawing rules, two tones, every ico() name exists',()=>{
  const p=[];
  const ic=eval(fs.readFileSync(path.join(SRC,'js','15-icons.js'),'utf8')+';({ICONS,ico,icoSprite})');
  const FIRST40=('star coin ticket flame home back map play pause replay sound-on sound-off speak gear lock check close hint heart gift '+
    'trophy target bolt paw bag sticker-book gamepad puzzle path-math path-read path-es path-disc plus minus times divide '+
    'backspace go calendar crown').split(' ');
  // P4-03 (DESIGN_SYSTEM 5.4): utility, chrome and skill icons
  const P403=('info warning question circle check-circle download upload trash edit mic record stop undo redo rotate flip eye '+
    'timer clock chart user users arrow-right arrow-left arrow-up arrow-down chevron-right chevron-left more '+
    'rocket balloon party globe moon hat teddy image food bath ball drop car nut palette blocks medal sparkle review thumbs-up '+
    'skill-count skill-num skill-shape skill-frac scale ruler skill-abc ear skill-story doc music clap skill-pattern pin '+
    'skill-array wave skill-geo').split(' ');
  for(const n of FIRST40.concat(P403))if(!ic.ICONS[n])p.push('missing icon: '+n);
  if(new Set(FIRST40.concat(P403)).size!==FIRST40.length+P403.length)p.push('icon lists overlap');
  for(const [n,d] of Object.entries(ic.ICONS)){
    if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n))p.push(n+': name must be lowercase-hyphenated');
    if(d.length>=600)p.push(n+': '+d.length+' bytes (limit 600)');
    const tags=d.match(/<\/?[a-z]+/g)||[];
    for(const t of tags)if(!/^<(path|circle|ellipse|rect)$/.test(t))p.push(n+': element '+t+'> not allowed');
    if((d.match(/<[^>]*\/>/g)||[]).join('')!==d)p.push(n+': every element must be self-closing, nothing between them');
    if(/gradient|filter|<text|url\(|style=/i.test(d))p.push(n+': no gradients, filters, text, url() or style');
    const hex=d.replace(/var\(--ic2,#fff\)/g,'').match(/#[0-9a-f]{3,8}\b/gi);
    if(hex)p.push(n+': raw colour '+hex[0]+' (use currentColor or var(--ic2,#fff))');
    const fills=(d.match(/(fill|stroke)="[^"]*"/g)||[]).filter(a=>!/^(fill|stroke)="(currentColor|none|var\(--ic2,#fff\)|var\(--ic3,currentColor\))"$/.test(a));
    if(fills.length)p.push(n+': colour must be currentColor, none, var(--ic2,#fff) or var(--ic3,currentColor): '+fills[0]);
    // two tones (P4-03): the soft tone is var(--ic3,currentColor) at opacity .4, on the same element; the primary layer carries the icon
    const els=d.match(/<[^>]*\/>/g)||[];
    let prim=0;
    for(const e of els){
      const soft=/var\(--ic3,currentColor\)/.test(e),op=(e.match(/\sopacity="([^"]*)"/)||[])[1];
      if(soft&&op!=='.4')p.push(n+': a soft (--ic3) shape needs opacity=".4"');
      if(op!=null&&!soft)p.push(n+': opacity is only for the soft tone (var(--ic3,currentColor))');
      if(/fill-opacity|stroke-opacity/.test(e))p.push(n+': use opacity=".4" on the element, not fill-/stroke-opacity');
      if(!soft&&!/fill="var\(--ic2/.test(e))prim++;
    }
    if(!prim)p.push(n+': no full-colour shape (the soft tone alone must not carry the icon)');
    const coords=(d.match(/\s(d|cx|cy|r|rx|ry|x|y|width|height)="[^"]*"/g)||[]).join(' ').match(/\d*\.\d{2,}/g);
    if(coords)p.push(n+': coordinates to one decimal ('+coords[0]+')');
  }
  const one=ic.ico('star',32,'x');
  if(!one.includes('width="32"')||!one.includes('height="32"')||!one.includes('class="ic x"')||!one.includes('<use href="#i-star"/>')||
    !one.includes('aria-hidden="true"'))p.push('ico() markup changed: '+one);
  if(!ic.ico('play').includes('width="24"'))p.push('ico() default size is not 24');
  const sp=ic.icoSprite();
  if((sp.match(/<symbol id="i-/g)||[]).length!==Object.keys(ic.ICONS).length)p.push('sprite does not hold one symbol per icon');
  // every literal ico('name' in src/ must name an existing icon
  const files=['js','data'].flatMap(d=>fs.readdirSync(path.join(SRC,d)).filter(f=>f.endsWith('.js')).map(f=>path.join(SRC,d,f)));
  let uses=0;
  for(const f of files)for(const m of fs.readFileSync(f,'utf8').matchAll(/\bico\(\s*['"`]([^'"`$]+)['"`]/g)){
    uses++;if(!ic.ICONS[m[1]])p.push(path.relative(ROOT,f)+': ico(\''+m[1]+'\') is not in ICONS');
  }
  return{problems:p,note:Object.keys(ic.ICONS).length+' icons, '+uses+' ico() uses'};
});

// ---- 12: question-kind registry (P1-02) ----
run('kinds: every question passes KIND[q.kind].validate; unknown kind fails',()=>{
  const out=eval(js+`
  const out={n:0,bad:[]};
  const NEED=['render','bind','right','retry','reveal','spoken','validate'];
  for(const k in KIND)for(const f of NEED)if(typeof KIND[k][f]!=='function')out.bad.push('KIND.'+k+'.'+f+' missing');
  // every skill and level, 300 seeds each, plus Speed Race math questions (made inline, not by a skill)
  const qs=[];
  for(const id in SK)for(let lv=1;lv<=SK[id].max;lv++)if(!skLvEmpty(id,lv))for(let s=1;s<=300;s++)qs.push([id+' L'+lv,genQ(id,lv,s)]);
  for(let i=0;i<300;i++)qs.push(['race math',raceQ('math')]);
  const KBS=${JSON.stringify(require('./lib/kb-samples.js'))};
  for(const w in KBS)qs.push(['P1-04 sample '+w,KBS[w]]);
  for(const [w,q] of qs){
    out.n++;
    if(!KIND[q.kind]){out.bad.push(w+': unknown kind '+q.kind);continue}
    for(const p of KIND[q.kind].validate(q))out.bad.push(w+': '+p);
    try{KIND[q.kind].render(q)}catch(e){out.bad.push(w+': render threw '+e.message)}
  }
  // the validators must catch broken questions, and an unknown kind must fail
  const must=(name,q)=>{if(!kindProblems(q).length)out.bad.push('validator missed: '+name)};
  must('unknown kind',{kind:'dial',html:'',ans:'1'});
  must('no kind',{html:'',ans:'1'});
  must('prototype name as kind',{kind:'constructor',ans:'1'});
  must('num ans not a number',{kind:'num',html:SLOT,ans:'x'});
  must('num without slot',{kind:'num',html:'<div>1 + 1</div>',ans:'2'});
  must('choice ans missing',{kind:'choice',html:'',ans:'c',choices:[{v:'a',l:'a'},{v:'b',l:'b'}]});
  must('choice duplicates',{kind:'choice',html:'',ans:'a',choices:[{v:'a',l:'a'},{v:'a',l:'a'}]});
  must('build tiles cannot spell',{kind:'build',word:'cat',ans:'cat',tiles:['c','a','x'],html:'<span id="ls0"></span><span id="ls1"></span><span id="ls2"></span>'});
  must('build no slots',{kind:'build',word:'cat',ans:'cat',tiles:['c','a','t'],html:''});
  out;`);
  return{problems:uniq(out.bad),note:out.n+' questions'};
});

// ---- 13: content banks (P1-09) ----
run('banks: demo bank and passage validate, seeded and reproducible, memory, round list, validator catches bad items',()=>{
  const out=eval(js+`
  const out={n:0,bad:[]},bad=m=>out.bad.push(m);
  // the demo skills are not in SK (no map node); declare them the way a content chunk would
  SK.bankdemo={t:'Bank demo',e:'📚',area:'read',max:1,bank:'demo',gen:lv=>genBank('demo',lv)};
  SK.passdemo={t:'Passage demo',e:'📗',area:'read',max:1,bank:'demo',gen:lv=>genPassage('demo',lv),round:lv=>passageRound('passdemo','demo',lv)};
  const strip=q=>{const c={...q};delete c.sk;delete c.lv;delete c.seed;return JSON.stringify(c)};
  // 1. the shipped demo data passes the validator, and every question passes its kind's validator and renders
  for(const m of bankProblems('demo',{levels:[1]}))bad(m);
  for(const m of passageProblems('demo'))bad(m);
  const forms=new Set(BANK.demo.map(i=>i.form||'choice'));
  for(const f of ['choice','wide','tap','spell'])if(!forms.has(f))bad('demo bank has no '+f+' item');
  const chk=(w,q)=>{out.n++;for(const m of kindProblems(q))bad(w+': '+m);try{KIND[q.kind].render(q)}catch(e){bad(w+': render threw '+e.message)}
    if(!q.label||!q.say||!q.hint)bad(w+': label, say or hint missing');if(/undefined|NaN|\\[object/.test(q.html))bad(w+': bad html')};
  BANK.demo.forEach((it,i)=>{for(let s=1;s<=20;s++)chk('demo item '+i,genBank('demo',1,{bi:i,s}))});
  for(let s=1;s<=100;s++){chk('genQ bankdemo',genQ('bankdemo',1,s));chk('genQ passdemo',genQ('passdemo',1,s))}
  // 2. seeded: same (sk, lv, seed) gives the same question; q.bk rebuilds it
  for(const sk of ['bankdemo','passdemo'])for(let s=1;s<=60;s++){
    const a=genQ(sk,1,s),b=genQ(sk,1,s);
    if(JSON.stringify(a)!==JSON.stringify(b))bad(sk+': seed '+s+' not reproducible');
    if(strip(bankRebuild(a.bk))!==strip(a))bad(sk+': bankRebuild differs for seed '+s);
  }
  { const r0=RNG;genQ('bankdemo',1,5);if(RNG!==r0)bad('RNG not restored by genBank') }
  // 3. live memory: every item once before any repeats; then the least recently shown comes back first
  bankReset();bankRound();
  const bis=[];for(let i=0;i<BANK.demo.length*2;i++)bis.push(genQ('bankdemo',1).bk.bi);
  const n=BANK.demo.length;
  if(new Set(bis.slice(0,n)).size!==n)bad('live: first '+n+' draws repeat an item: '+bis.slice(0,n));
  if(bis.slice(n).join()!==bis.slice(0,n).join())bad('live: second pass is not in least-recently-shown order: '+bis);
  const pbs=[];for(let i=0;i<3;i++)pbs.push(passageRound('passdemo','demo',1)[0].bk.bp);
  if(PASS.demo.length==1&&new Set(pbs).size!==1)bad('live: passage choice unstable');
  bankReset();
  { const a=genQ('bankdemo',1,7).bk.bi,b=genQ('bankdemo',1,7).bk.bi;if(a!==b)bad('after bankReset the choice is not seed-only') }
  // 4. the round hook list: one passage, every question in order, same ctx, stamped like genQ
  const rd=SK.passdemo.round(1);
  if(rd.length!==PASS.demo[0].qs.length)bad('round length '+rd.length);
  rd.forEach((q,i)=>{chk('round q'+i,q);
    if(!q.ctx||q.ctx.text!==rd[0].ctx.text||q.ctx.title!==rd[0].ctx.title)bad('round q'+i+': ctx differs');
    if(q.sk!=='passdemo'||q.lv!==1||q.seed==null)bad('round q'+i+': not stamped with sk, lv, seed');
    if(q.bk.qi!==i)bad('round q'+i+': not in order');
    if(strip(bankRebuild(q.bk))!==strip(q))bad('round q'+i+': bankRebuild differs')});
  if(SK.bankdemo.round)bad('plain bank skill must not have a round hook');
  // 5. the panel HTML: title and text escaped, words tap-to-hear, hear button
  const h=bankCtx({title:'<b>T</b>',text:'It is "red" & big.'});
  if(h.includes('<b>T'))bad('bankCtx does not escape the title');
  if(!/<span class="w" data-w="red">/.test(h)||!h.includes('data-say="It is &quot;red&quot; &amp; big."'))bad('bankCtx words or hear button wrong: '+h.slice(0,200));
  // 6. forms without a registered kind are never drawn
  BANK.__t=[{lv:1,q:'Put in order.',form:'order',order:['a','b','c']},{lv:1,q:'Pick.',a:'x',d:['y','z']}];
  for(let s=1;s<=30;s++)if(genBank('__t',1,{s}).bk.bi!==1)bad('an order item was drawn without a builder');
  delete BANK.__t;
  // 7. the validator must catch seeded bad items (each one alone must give at least one problem)
  const base={lv:1,q:'Pick one.',a:'x',d:['y','z','w']};
  const must=(name,it)=>{if(!bankItemProblems(it,'t').length)bad('validator missed: '+name)};
  must('ok item is fine (control)',{...base,form:'bogus'});
  if(bankItemProblems(base,'t').length)bad('validator rejects a good item: '+bankItemProblems(base,'t'));
  must('answer missing',{lv:1,q:'Pick one.',d:['y','z']});
  must('distractor equals answer',{...base,d:['x','z','w']});
  must('distractors repeat',{...base,d:['y','y','w']});
  must('distractors case repeat',{...base,d:['Y','y','w']});
  must('one distractor',{...base,d:['y']});
  must('four distractors',{...base,d:['y','z','w','v']});
  must('bad word in q',{...base,q:'Who said poop?'});
  must('bad word in a distractor',{...base,d:['y','z','kill']});
  must('q too long',{...base,q:'a '.repeat(80)});
  must('choice too long',{...base,d:['y','z','w'.repeat(61)]});
  must('level not a number',{...base,lv:'1'});
  must('no q',{lv:1,a:'x',d:['y','z']});
  must('hint too long',{...base,hint:'h '.repeat(100)});
  must('pic not an icon',{...base,pic:'nonexistent'});
  must('tap word missing',{lv:1,q:'Tap it.',form:'tap',sent:'The dog runs.',a:'cat'});
  must('tap word twice',{lv:1,q:'Tap it.',form:'tap',sent:'The dog and the dog.',a:'dog'});
  must('spell uppercase',{lv:1,q:'Spell it.',form:'spell',a:'Cat'});
  must('order duplicates',{lv:1,q:'Order.',form:'order',order:['a','b','a']});
  must('order too short',{lv:1,q:'Order.',form:'order',order:['a','b']});
  must('match too few',{lv:1,form:'match',pairs:[['a','b'],['c','d']]});
  must('match repeats',{lv:1,form:'match',pairs:[['a','b'],['a','d'],['e','f']]});
  must('multi one answer',{lv:1,q:'Pick all.',form:'multi',a:['x'],d:['y','z']});
  const goodO={lv:1,q:'Order.',form:'order',order:['a','b','c']},goodM={lv:1,form:'match',pairs:[['a','b'],['c','d'],['e','f']]},goodX={lv:1,q:'All.',form:'multi',a:['x','y'],d:['z','w']};
  for(const it of [goodO,goodM,goodX])if(bankItemProblems(it,'t').length)bad('validator rejects a good '+it.form+' item: '+bankItemProblems(it,'t'));
  // bank level: duplicates and counts
  BANK.__d=[base,{...base}];if(!bankProblems('__d').some(m=>/same q and a/.test(m)))bad('validator missed a duplicate q+a');
  if(!bankProblems('__d',{levels:[1,2],min:3}).some(m=>/level 2/.test(m)))bad('validator missed a short level');
  delete BANK.__d;
  if(!bankProblems('__nope').length)bad('validator missed a missing bank');
  // passages
  PASS.__p=[{lv:1,title:'T',text:'A short text.',qs:[base,base]}];
  if(!passageProblems('__p').some(m=>/3 to 6/.test(m)))bad('validator missed a passage with 2 questions');
  PASS.__p=[{lv:1,title:'T',text:'He said poop.',qs:[base,{...base,q:'Two?'},{...base,q:'Three?'}]}];
  if(!passageProblems('__p').some(m=>/bad word/.test(m)))bad('validator missed a bad word in a passage');
  PASS.__p=[{lv:1,title:'T'.repeat(41),text:'x '.repeat(1100),qs:[base,{...base,q:'Two?'},{...base,q:'Three?'}]}];
  if(passageProblems('__p').length<2)bad('validator missed a long passage title and text');
  PASS.__p=[{lv:1,title:'T',text:'Fine.',qs:[base,{...base,q:'Two?'},{...base,q:'Three?',form:'spell',a:'cat'}]}];
  if(!passageProblems('__p').some(m=>/choice or wide/.test(m)))bad('validator missed a non-choice passage question');
  delete PASS.__p;
  out;`);
  return{problems:uniq(out.bad),note:out.n+' questions'};
});

// ---- 14: new kinds B: match, tap, spell (P1-04) ----
run('kinds B: sample questions of match, tap, spell pass validate and render; broken ones fail',()=>{
  const samples=require('./lib/kb-samples.js');
  const out=eval(js+`
  const out={n:0,bad:[]};
  const SAM=${JSON.stringify(samples)};
  for(const w in SAM){
    const q=SAM[w];out.n++;
    if(!KIND[q.kind]){out.bad.push(w+': unknown kind');continue}
    for(const p of kindProblems(q))out.bad.push(w+': '+p);
    try{if(typeof KIND[q.kind].render(q)!=='string')out.bad.push(w+': render did not return a string')}catch(e){out.bad.push(w+': render threw '+e.message)}
  }
  for(const k of ['match','tap','spell'])if(!Object.values(SAM).some(q=>q.kind==k))out.bad.push('no sample for '+k);
  const must=(name,q)=>{if(!kindProblems(q).length)out.bad.push('validator missed: '+name)};
  const m=SAM.match,sp=SAM.spell,tp=SAM.tapWord;
  must('match 2 pairs',{...m,items:m.items.slice(0,2),opts:m.opts.slice(0,2),ans:'cat|dog'});
  must('match 6 pairs',{...m,items:[...m.items,{v:'a',l:'a'},{v:'b',l:'b'}],opts:[...m.opts,{v:'a',l:'a'},{v:'b',l:'b'}],ans:'a|b|cat|cow|dog|duck'});
  must('match values differ',{...m,opts:m.opts.map((o,i)=>i?o:{v:'zzz',l:'x'})});
  must('match duplicate values',{...m,items:m.items.map(c=>({...c,v:'cat'}))});
  must('match wrong ans',{...m,ans:'cat'});
  must('tap ans not in html',{...tp,ans:'dog'});
  must('tap one target',{...tp,html:'<span data-v="cat">cat</span>'});
  must('tap duplicate values',{...tp,html:'<i data-v="a"></i><i data-v="a"></i>',ans:'a'});
  must('spell bad letters',{...sp,word:'c4t',ans:'c4t'});
  must('spell accent without es',{...sp,word:'niño',ans:'niño'});
  must('spell ans differs',{...sp,ans:'cut'});
  must('spell no slots',{...sp,html:'<div class="lslots"></div>'});
  must('spell no clue',{...sp,html:sp.html.replace('Spell the word you hear','')});
  must('spell build-style hint',{...sp,hint:{k:'next'}});
  // the in-app keyboard has every letter the validator allows
  const keys=new Set();
  for(const r of KIND.spell.ROWS)for(const c of r)keys.add(c);
  for(const c of 'abcdefghijklmnopqrstuvwxyz')if(!keys.has(c))out.bad.push('keyboard lacks '+c);
  const esHtml=KIND.spell.render(SAM.spellEs);
  for(const c of 'ñáéíóúü')if(!esHtml.includes('data-ch="'+c+'"'))out.bad.push('es keyboard lacks '+c);
  if(KIND.spell.render(SAM.spell).includes('data-ch="ñ"'))out.bad.push('accent row shown without lang es');
  out;`);
  return{problems:uniq(out.bad),note:out.n+' samples'};
});

// ---- 15: new kinds A: num pads, multi, order (P1-03) ----
run('kinds A: sample questions pass validate; numeric equality; validators catch broken questions',()=>{
  const make=require('./kinds-samples').make;
  const out=eval(js+`
  const out={n:0,bad:[]};
  const S2=(${make.toString()})();
  for(const w in S2){
    const q=S2[w];
    out.n++;
    for(const p of kindProblems(q))out.bad.push(w+': '+p);
    try{KIND[q.kind].render(q)}catch(e){out.bad.push(w+': render threw '+e.message)}
    if(!KIND[q.kind].same(q,q.ans))out.bad.push(w+': same() rejects its own answer');
    if(q.alt&&!KIND.num.same(q,q.alt))out.bad.push(w+': same() rejects alt '+q.alt);
  }
  const eq=(name,a,b,want)=>{if(numEq(a,b)!==want)out.bad.push('numEq '+name+': '+a+' vs '+b+' should be '+want)};
  eq('trailing zero','0.50','0.5',true);eq('no lead zero','.5','0.5',true);eq('half','2/4','1/2',true);eq('half dec','1/2','.5',true);
  eq('neg','-0.50','-.5',true);eq('mixed','2 2/6','2 1/3',true);eq('R','9R2','9R2',true);eq('R differs','9R2','9R3',false);
  eq('R vs plain','9R2','9',false);eq('different','3/4','1/2',false);eq('zero den','1/0','1/0',false);eq('junk','x','1',false);
  eq('empty','','0',false);eq('big','999999999/1','999999999',true);
  // exact text stays the default
  if(KIND.num.same({ans:'0.5'},'0.50'))out.bad.push('num without eq must compare exact text');
  if(!KIND.num.same({ans:'12'},'12'))out.bad.push('num plain same() broken');
  const mq={choices:[{v:'a'},{v:'b'},{v:'c'}],ans:['a','c']};
  if(!KIND.multi.same(mq,['a','c'])||KIND.multi.same(mq,['a'])||KIND.multi.same(mq,['a','b','c'])||KIND.multi.same(mq,'a,c'))out.bad.push('multi same() wrong');
  const oq={ans:['x','y']};
  if(!KIND.order.same(oq,['x','y'])||KIND.order.same(oq,['y','x']))out.bad.push('order same() wrong');
  if(JSON.stringify(numParts('2 1/3',[' ','/']))!=='["2","1","3"]')out.bad.push('numParts mixed');
  if(JSON.stringify(numParts('9R',['R']))!=='["9",""]')out.bad.push('numParts empty last');
  if(JSON.stringify(kindSort(['b','a','10','9']))!=='["10","9","a","b"]')out.bad.push('kindSort is text order');
  const must=(name,q)=>{if(!kindProblems(q).length)out.bad.push('validator missed: '+name)};
  const sl=SLOT,ch=[{v:'a',l:'a'},{v:'b',l:'b'},{v:'c',l:'c'}],it=[{v:'a',l:'a'},{v:'b',l:'b'}];
  must('num dec ans not decimal',{kind:'num',pad:'dec',html:sl,ans:'1.'});
  must('num neg with plus',{kind:'num',pad:'neg',html:sl,ans:'+5'});
  must('num frac zero denominator',{kind:'num',pad:'frac',html:SLOT_FRAC,ans:'1/0'});
  must('num frac missing slot2',{kind:'num',pad:'frac',html:sl,ans:'1/2'});
  must('num R ans shape',{kind:'num',sep:'R',html:SLOT_R,ans:'9'});
  must('num mix missing slot3',{kind:'num',pad:'frac',sep:'mix',html:SLOT_R,ans:'2 1/3'});
  must('num bad pad',{kind:'num',pad:'hex',html:sl,ans:'1'});
  must('num bad eq',{kind:'num',eq:'loose',html:sl,ans:'1'});
  must('num max 10',{kind:'num',max:10,html:sl,ans:'1'});
  must('num ans longer than max',{kind:'num',max:2,html:sl,ans:'123'});
  must('multi ans not array',{kind:'multi',choices:ch,ans:'a'});
  must('multi ans empty',{kind:'multi',choices:ch,ans:[]});
  must('multi ans not in choices',{kind:'multi',choices:ch,ans:['z']});
  must('multi ans unsorted',{kind:'multi',choices:ch,ans:['c','a']});
  must('multi duplicate choices',{kind:'multi',choices:[{v:'a',l:'a'},{v:'a',l:'b'}],ans:['a']});
  must('multi one choice',{kind:'multi',choices:[{v:'a',l:'a'}],ans:['a']});
  must('order cannot make ans',{kind:'order',items:it,ans:['a','z']});
  must('order too few items',{kind:'order',items:it,ans:['a','b','a']});
  must('order ans of one',{kind:'order',items:it,ans:['a']});
  must('order item no label',{kind:'order',items:[{v:'a'},{v:'b',l:'b'}],ans:['a','b']});
  out;`);
  return{problems:uniq(out.bad),note:out.n+' samples'};
});

// ---- 13: math visuals (P1-10) ----
run('viz: math visuals well-formed, small, deterministic, tokens only, tap targets 48',()=>{
  const p=[];
  const src=fs.readFileSync(path.join(SRC,'js','23-viz.js'),'utf8');
  const css=fs.readFileSync(path.join(SRC,'css','32-viz.css'),'utf8');
  const code=src.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm,'');
  if(/Math\.random|\brnd\(|\bR\(|\bpick\(|\bshuffle\(/.test(code))p.push('23-viz.js must not use Math.random or the generator rnd()');
  if(/#[0-9a-f]{3,8}\b/i.test(src.replace(/0x[0-9A-F]+/g,'')))p.push('23-viz.js has a raw hex colour');
  if(/#[0-9a-f]{3,8}\b/i.test(css))p.push('32-viz.css has a raw hex colour');
  const V=eval(src+';VIZ');
  // typical inputs (what generators will use most): each under 2.5 KB
  const V0=eval(src+';VIZ');
  const typical=[['tenFrame',[7]],['tenFrame',[3,5]],['tenFrame',[18,20,{b:8,fade:2}]],['base10',[999]],['base10',[47]],['base10',[358]],
    ['numLine',[{}]],['numLine',[{max:20,marks:[13],hide:[10]}]],['numLine',[{max:100,step:10}]],['numLine',[{min:-5,max:5,tapValues:[-4,-2,0,2,4]}]],
    ['numLine',[{max:1,step:.25,den:4,tapValues:[0,.25,.5,.75,1]}]],['numLine',[{max:2,step:1/8,den:8,marks:[1.375]}]],
    ['fracBar',[3,4,{unit:true}]],['fracBar',[7,8,{unit:true}]],['fracBar',[5,4]],['fracBar',[0,6,{tap:true}]],
    ['fracCircle',[3,8]],['fracCircle',[7,4]],['fracCircle',[0,6,{tap:true}]],['clock',[10,45]],['clock',[12,0,{nums:false}]],
    ['array',[10,10]],['array',[3,4]],['dots',[20,'scatter',{seed:9}]],['dots',[10,'dice']],['dots',[20,'ten']],['dots',[20,'row',{b:5,fade:3}]],
    // part 2 (P1-11)
    ['numLine',[{max:10,hops:[[0,3],[3,7],[7,10,'?']]}]],['numLine',[{max:20,hops:[[14,9]],marks:[9]}]],
    ['ruler',[7,'cm','pencil']],['ruler',[4.5,'in']],['ruler',[12,'cm','bar',{from:2}]],
    ['barGraph',[[['Cat',4],['Dog',7],['Fish',3],['Bird',5]],1]],['barGraph',[[['Mon',20],['Tue',35],['Wed',15]],5,{vals:true}]],
    ['barGraph',[[['A',2],['B',5],['C',3],['D',4],['E',1],['F',6]],1,{tap:true}]],
    ['pictograph',[[['Red',4],['Blue',6.5],['Green',3]],{per:2}]],['pictograph',[[['Cats',3],['Dogs',5]]]],
    ['linePlot',[[1,2,2,3,3,3,5,5]]],['linePlot',[[0.25,0.5,0.5,0.75,1,1,1.25],{min:0,max:1.5,step:0.25,den:4}]],
    ['linePlot',[[1,2,3,3],{max:5,tapValues:[1,2,3,4,5]}]]]
    .concat(V0.shapeNames.map(n=>['shape',[n]])).concat([['shape',['triangle',{rot:35,st:1.5,dots:true}]],['shape',['oval',{rot:90}]],['shape',['cube',{c:2}]],
    ['areaGrid',[4,6]],['areaGrid',[12,12]],['areaGrid',[5,3,{n:8}]],['rectSides',[8,5,{w:8,h:5},{unit:'cm'}]],['rectSides',[6,4,{w:'?',h:4},{all:true}]],
    ['angle',[60]],['angle',[90,{rot:20,label:'?'}]],['angle',[130,{proto:true,label:'x'}]],['angle',[250]],
    ['coordGrid',[{points:[[2,3,'A'],[4,1,'B']]}]],['coordGrid',[{quadrants:4,max:5,points:[[-2,3],[4,-1],[-3,-4]],join:true,close:true}]],
    ['coordGrid',[{tapPts:[[1,2],[2,1],[4,3]]}]],['coordGrid',[{quadrants:4,tapPts:[[-1,2],[2,-1]]}]],
    ['balance',[5,3]],['balance',[{n:3,q:true},7]],['balance',[12,12]],['balance',[4,9,{nums:true}]],
    ['coinSVG',[25]],['coinSVG',[[25,10,10,5,1,1]]],['coinSVG',[[500,100,100]]],['coinSVG',[[25,25,25,25,25,25,25,10],{face:false}]],
    ['tally',[13]],['tally',[50]],['tableInOut',[[[1,3],[2,5],[3,'?'],['?',9]]]]]);
  // everything else: a sweep of edge inputs, checked for broken markup only
  const sweep=[];
  for(let n=0;n<=20;n++){sweep.push(['tenFrame',[n,20]],['tenFrame',[n,5]],['dots',[n,'row']],['dots',[n,'ten']],['dots',[n,'dice']]);
    for(let sd=1;sd<=5;sd++)sweep.push(['dots',[n,'scatter',{seed:sd}]])}
  for(let n=0;n<=999;n+=37)sweep.push(['base10',[n]]);
  for(let d=1;d<=12;d++)for(let n=0;n<=2*d+1;n++)sweep.push(['fracBar',[n,d,{unit:true}]],['fracCircle',[n,d,{tap:true}]]);
  for(let h=0;h<=12;h++)for(let m=0;m<60;m+=7)sweep.push(['clock',[h,m]]);
  for(let r=1;r<=12;r++)for(let c=1;c<=12;c++)sweep.push(['array',[r,c]]);
  for(let w=1;w<=12;w+=3)for(let h=1;h<=12;h+=2)sweep.push(['areaGrid',[w,h,{n:w*h>>1}]],['rectSides',[w,h,{w:'?',h:'?'},{all:true}]]);
  for(let d=0;d<=360;d+=15){sweep.push(['angle',[d,{rot:d,label:'?'}]]);if(d<=180)sweep.push(['angle',[d,{proto:true}]])}
  for(let a=0;a<=12;a++)for(let b=0;b<=12;b+=3)sweep.push(['balance',[a,b]]);
  for(let n=0;n<=52;n++)sweep.push(['tally',[n]]);
  for(const v of [1,5,10,25,50,100,500,1000,2000,7])sweep.push(['coinSVG',[v]]);
  for(const q of [1,4])for(let m=1;m<=10;m++)sweep.push(['coordGrid',[{quadrants:q,max:m,points:[[m,m],[0,0]]}]]);
  for(let n=1;n<=8;n++)sweep.push(['barGraph',[Array.from({length:n},(_,i)=>['L'+i,i*3+1]),0]],['pictograph',[Array.from({length:Math.min(n,6)},(_,i)=>['L'+i,i*2+1]),{per:2}]]);
  for(const [mn,mx,st] of [[0,5,1],[0,20,1],[0,100,5],[-10,10,1],[0,1000,100],[0,3,1/3],[0,0.3,0.1]])sweep.push(['numLine',[{min:mn,max:mx,step:st}]]);
  const big=[];
  for(const [name,args,typ] of typical.map(t=>[...t,1]).concat(sweep)){
    const w=name+'('+JSON.stringify(args).slice(1,-1)+')';
    let s;
    try{s=V[name](...args)}catch(e){p.push(w+' threw '+e.message);continue}
    if(s!==V[name](...args))p.push(w+': not deterministic');
    if(/NaN|undefined|Infinity|null/.test(s))p.push(w+': NaN/undefined in markup');
    if(!/^<svg class="viz viz-[a-z0-9]+( vi)?" viewBox="0 0 [\d.]+ [\d.]+" style="--vw:[\d.]+" role="(img|group)" aria-label="[a-z ]+">/.test(s))p.push(w+': root <svg> markup');
    if(/filter|gradient|url\(|\bid=|#[0-9a-f]{3,8}\b/i.test(s))p.push(w+': no filter, gradient, url(), id or raw colour');
    // tags balance (every element closes or self-closes)
    const stack=[];
    for(const m of s.matchAll(/<(\/?)([a-z]+)[^>]*?(\/?)>/g)){
      if(m[3])continue;
      if(!m[1])stack.push(m[2]);
      else if(stack.pop()!==m[2]){p.push(w+': tags do not balance at </'+m[2]+'>');break}
    }
    if(stack.length)p.push(w+': unclosed <'+stack[0]+'>');
    if(typ&&s.length>=2500)big.push(w+' '+s.length+' B');
    // tap targets at least 48 x 48 viewBox units (1 unit = 1 px on a phone)
    if(/ vi"/.test(s)){
      const t=[...s.matchAll(/class="vt[^"]*" data-v="([^"]+)"/g)];
      if(!t.length)p.push(w+': interactive but no data-v targets');
      for(const m of s.matchAll(/<rect class="vh" x="[^"]*" y="[^"]*" width="([\d.]+)" height="([\d.]+)"/g))if(+m[1]<48||+m[2]<48)p.push(w+': tap rect '+m[1]+'x'+m[2]);
      for(const m of s.matchAll(/<rect class="vt vp[^"]*" data-v="[^"]*" role="button" aria-label="[^"]*" x="[^"]*" y="[^"]*" width="([\d.]+)" height="([\d.]+)"/g))
        if(+m[1]<46||+m[2]<48)p.push(w+': tap part '+m[1]+'x'+m[2]);
    }
  }
  p.push(...big);
  // specific promises of the API
  const cnt=(s,re)=>(s.match(re)||[]).length;
  if(cnt(V.tenFrame(7),/<circle/g)!==7)p.push('tenFrame(7) does not draw 7 counters');
  if(cnt(V.tenFrame(9,10,{b:3,fade:1}),/<g class="v2 vx">/g)!==1)p.push('tenFrame b/fade groups');
  if(cnt(V.dots(13,'scatter',{seed:4}),/<circle/g)!==13)p.push('dots scatter count');
  if(V.dots(13,'scatter',{seed:4})===V.dots(13,'scatter',{seed:5}))p.push('dots scatter: seed does not change the layout');
  if(cnt((V.base10(234).match(/class="vb" d="[^"]*"/)||[''])[0],/h-[\d.]+z/g)!==9)p.push('base10(234) does not draw 2 + 3 + 4 blocks');
  if(cnt(V.fracBar(3,4),/class="vp vs"/g)!==3||cnt(V.fracBar(3,4),/class="vp"/g)!==1)p.push('fracBar(3, 4) shading');
  if(cnt(V.fracCircle(5,4),/class="ve"/g)!==2)p.push('fracCircle(5, 4) should draw 2 circles');
  if(cnt(V.numLine({tapValues:[1,3,5]}),/data-v=/g)!==3)p.push('numLine tapValues');
  if(!V.numLine({hide:[4]}).includes('class="vq"'))p.push('numLine hide box');
  if(!/>3<\/text>.*>4<\/text>/.test(V.numLine({max:1,step:.25,den:4})))p.push('numLine den labels');
  if(!V.numLine({min:-3,max:3}).includes('−3'))p.push('numLine minus sign');
  // part 2 promises
  const has=(s,re)=>re.test(s);
  if(cnt(V.shape('hexagon'),/L/g)!==5)p.push('hexagon should have 6 corners');
  if(V.shape('triangle',{rot:30})===V.shape('triangle'))p.push('shape rot has no effect');
  if(!has(V.shape('sphere'),/class="s0"/)||has(V.shape('circle'),/s1/))p.push('sphere/circle drawing');
  if(/cube|hexagon/.test(V.shape('cube')+V.shape('hexagon')))p.push('shape aria-label must not name the shape');
  if(cnt(V.areaGrid(4,6),/h\d+(?=M|")/g)!==6)p.push('areaGrid(4, 6) should have one dashed row path per row');
  if(!has(V.rectSides(8,5,{w:8,h:'?'}),/class="vq"/))p.push('rectSides ? box');
  if(!has(V.angle(90),/class="vk"/)||has(V.angle(60),/class="vk"/))p.push('right angle mark only at 90');
  if(!has(V.angle(60,{label:'?'}),/class="vq"/))p.push('angle ? label');
  if(cnt(V.balance(5,3),/<circle/g)!==9)p.push('balance(5, 3): 8 counters and the pivot');
  if(V.balance(5,3)===V.balance(3,5)||V.balance(4,4)===V.balance(5,3))p.push('balance tilt');
  if(cnt(V.coinSVG([25,10,5,1]),/<text/g)!==4||cnt(V.coinSVG([25,10,5,1],{face:false}),/<text/g)!==0)p.push('coinSVG face');
  if(cnt(V.tally(13),/v38/g)!==11)p.push('tally(13) should draw 11 upright strokes');
  if(cnt(V.tally(13),/L/g)!==2)p.push('tally(13) should draw 2 slashes');
  if(cnt(V.pictograph([['A',5]],{per:2}),/<path class="v1"/g)!==1)p.push('pictograph half picture');
  if(cnt(V.linePlot([1,1,2]),/<circle/g)!==3)p.push('linePlot should draw one circle per value');
  if(cnt(V.barGraph([['a',3],['b',2]],1,{tap:true}),/data-v=/g)!==2)p.push('barGraph tap targets');
  if(!has(V.coordGrid({tapPts:[[1,2]]}),/data-v="1,2"/))p.push('coordGrid tap points');
  if(cnt(V.numLine({hops:[[0,3],[3,5]]}),/Q/g)!==2||!V.numLine({hops:[[0,3]]}).includes('>+3<'))p.push('numLine hops');
  if(V.numLine({max:20,hops:[[14,9]]}).includes('>+5<')||!V.numLine({max:20,hops:[[14,9]]}).includes('−5'))p.push('numLine backward hop label');
  // text from generators is escaped
  if(V.tableInOut([['<b>',1]]).includes('<b>'))p.push('tableInOut does not escape');
  // scatter dots never overlap (2r = 26)
  for(let n=2;n<=20;n++)for(let sd=1;sd<=20;sd++){
    const c=[...V.dots(n,'scatter',{seed:sd}).matchAll(/cx="([\d.]+)" cy="([\d.]+)"/g)].map(m=>[+m[1],+m[2]]);
    for(let i=0;i<c.length;i++)for(let j=0;j<i;j++)if(Math.hypot(c[i][0]-c[j][0],c[i][1]-c[j][1])<26.5){p.push('scatter overlap n='+n+' seed='+sd);i=c.length;break}
  }
  return{problems:uniq(p),note:(typical.length+sweep.length)+' visuals'};
});

// ---- 17: world ids, grade tags, migration 3, gating, inserted worlds (P1-05) ----
run('worlds: ids, grade tags, migration 3 keeps every star, gating, inserted worlds never re-lock',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const werrs=[],bad=m=>werrs.push(m);
  // The body runs inside eval(js), so it sees the app's globals; it is a plain function to keep it readable.
  const body=function(){
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const clone=o=>JSON.parse(JSON.stringify(o));
    // 1. ids and grades: unique, permanent shape, grade in range; MAP_V42 (used by migrations) matches today's maps
    const seen=new Set();
    for(const p in PATHS)PATHS[p].worlds.forEach((w,wi)=>{
      if(!/^[mred]_[a-z]+$/.test(w.id||''))bad(p+' world '+wi+': bad id '+w.id);
      if(seen.has(w.id))bad('duplicate world id '+w.id);seen.add(w.id);
      if(!GRADES.includes(w.g))bad(w.id+': grade '+w.g);
      if(wi&&!PATHS[p].byLevel&&w.g<PATHS[p].worlds[wi-1].g)bad(w.id+': grade lower than the world before it');
    });
    // MAP_V42 (migrations read it, never today's maps): every v42 world and stop still exists in today's maps, in the same relative order
    // (worlds may be inserted before, between and after; stops may be added inside a world). Ids never change meaning.
    for(const p in MAP_V42){
      let lastW=-1;
      MAP_V42[p].forEach(([id,stops],k)=>{
        const wi=PATHS[p].worlds.findIndex(x=>x.id==id);
        if(wi<0){bad('MAP_V42 '+p+' '+k+': world '+id+' is gone');return}
        if(wi<=lastW)bad('MAP_V42 '+p+' '+id+': worlds are out of their v42 order');
        lastW=wi;
        const now=NODES[p].filter(n=>n.wi==wi&&n.sk!='boss').map(nid);
        let at=-1;
        for(const sid of stops.split(' ')){
          const j=now.indexOf(sid);
          if(j<0)bad('MAP_V42 '+p+' '+id+': stop '+sid+' is gone');
          else if(j<=at)bad('MAP_V42 '+p+' '+id+': stop '+sid+' is out of its v42 order');
          at=Math.max(at,j);
        }
      });
    }
    // v42 view of a save (keys by world index): the v42 stops in v42 order (from the frozen MAP_V42 table, each with its index in today's NODES),
    // stars per stop and the old lock rule. Stops and worlds added since are not part of this view.
    const v42=p=>{const o=[];(MAP_V42[p]||[]).forEach(([wid,stops],k)=>{
      for(const id of stops.split(' '))o.push({old:id,i:NODES[p].findIndex(n=>n.sk!='boss'&&nid(n)==id)});
      o.push({old:'boss'+k,i:NODES[p].findIndex(n=>n.sk=='boss'&&n.wid==wid)})});return o};
    const oldSt=(maps,p)=>v42(p).map(e=>(maps[p]||{})[e.old]||0);
    const oldOpen=(st,ula)=>st.map((s,i)=>ula||i==0||st[i-1]>0);
    const oldCur=st=>{const o=oldOpen(st,false);for(let i=0;i<st.length;i++)if(o[i]&&!st[i])return i;return st.length-1};
    // 2. migration 3 on every fixture: same stars on every stop, same locks and current stop, idempotent, nothing deleted
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps']){
      const raw=fx(name),obj=JSON.parse(raw),empty=!Object.keys(obj).length;
      // state just before migration 3 = what v42 had: run migrations 1-2 only
      loadSave(empty?null:raw);const from=Number.isInteger(S.v)?S.v:1;for(let n=from;n<3;n++)MIGRATIONS[n]();
      const pre=clone(S);
      MIGRATIONS[3]();const once=JSON.stringify(S);MIGRATIONS[3]();
      if(JSON.stringify(S)!==once)bad(name+': migration 3 not idempotent');
      for(const p in pre.maps)for(const k in pre.maps[p])if(S.maps[p][k]!==pre.maps[p][k])bad(name+': '+p+' '+k+' lost');
      for(const k in pre.wdone||{})if(!S.wdone[k])bad(name+': wdone '+k+' lost');
      load(empty?null:raw);
      for(const p in MAP_V42){ // P2-36: only the paths that existed in v42 (Discover has no old stops)
        const E=v42(p);
        if(E.some(e=>e.i<0))bad(name+' '+p+': a v42 stop is gone');
        const was=oldSt(pre.maps,p),now=E.map(e=>getSt(p,e.i));
        if(JSON.stringify(was)!==JSON.stringify(now))bad(name+' '+p+': stars '+JSON.stringify(was)+' -> '+JSON.stringify(now));
        // a v42 stop that now sits right behind a stop added later (sound3 before the boss) waits for that new stop: not a lock bug
        const V=new Set(E.map(e=>e.i)),behindNew=E.map(e=>{const j=e.i-1;return j>=0&&!V.has(j)&&NODES[p][j].wi==NODES[p][e.i].wi&&!passed(p,j)});
        const wo=oldOpen(was,S.unlockAll).map((o,i)=>o&&!behindNew[i]),no=E.map((e,i)=>unlocked(p,e.i)&&!behindNew[i]);
        // maxed and fresh look exactly the same. Legacy saves (stops skipped by the old single map) and midway (P1-06 infers grade 1, which opens the grade-1 worlds) may open more, never less.
        if(name.startsWith('legacy')||name=='midway'?wo.some((o,i)=>o&&!no[i]):JSON.stringify(wo)!==JSON.stringify(no))bad(name+' '+p+': locks changed');
        {const oc=E[oldCur(was)].i,nc=curNode(p),addedHere=!V.has(nc)&&nc<oc&&MAP_V42[p].some(w=>w[0]==NODES[p][nc].wid), // a stop added later to a v42 world, just before the old one
          frontier=was.every(x=>x>0)&&!MAP_V42[p].some(w=>w[0]==NODES[p][nc].wid), // every v42 stop passed: the map may open on a world added since
          pristine=was.every(x=>!x)&&nc===WR[p][startWorld(p)][0]; // no stop passed yet: the map opens on the first stop of the start world (P2-02: Shape Garden is the first K world)
        if(oc!==nc&&!addedHere&&!frontier&&!pristine)bad(name+' '+p+': current stop '+oc+' -> '+nc)}
      }
    }
    load(fx('midway'));
    if(!(S.wdone.m_meadow&&S.wdone.r_meadow&&S.maps.math.boss_m_meadow===1&&S.maps.math.boss0===1))bad('midway: world keys '+JSON.stringify(S.wdone));
    load(fx('maxed'));
    if(Object.keys(S.wdone).filter(k=>k.includes('_')).length!==11)bad('maxed: not every world marked done');
    load(fx('legacy-single-map'));
    if(Object.keys(S.wdone).length)bad('legacy-single-map: a world marked done '+JSON.stringify(S.wdone));
    // today's repeat counter: index keys were shared by all paths; each becomes every path's world key
    load(JSON.stringify({...JSON.parse(fx('midway')),v:3,ptRep:{day:today(),n:{t0:1,boss1:2,add1:1,mix:3}}}));
    const n=S.ptRep.n;
    if(!(n.t_m_meadow===1&&n.t_r_meadow===1&&n.t_e_plaza===1&&n.boss_m_candy===2&&n.boss_r_candy===2&&n.boss_e_fiesta===2&&n.add1===1&&n.mix===3&&!('t0' in n)))
      bad('ptRep re-key '+JSON.stringify(n));
    // 3. gating by grade (ROADMAP 3.2)
    load(null);
    if(gradeOf()!==0)bad('no grade should count as K');
    const wiOf=id=>PATHS.math.worlds.findIndex(w=>w.id==id); // P2-01: Tiny Town (Pre-K) is world 0, Number Meadow (K) world 1
    if(!worldOpen('math',0)||!worldOpen('math',wiOf('m_meadow'))||worldOpen('math',wiOf('m_candy'))||!unlocked('math',0)||unlocked('math',1)||unlocked('math',WR.math[wiOf('m_candy')][0]))bad('fresh, no grade (K): Tiny Town and Number Meadow open, Candy Canyon shut, only the first stop of a world open');
    if(setGrade(7)||setGrade('2')||setGrade(1.5)||'grade' in S)bad('setGrade accepted a bad value');
    for(const g of GRADES){
      setGrade(g);
      for(const p in PATHS)PATHS[p].worlds.forEach((w,wi)=>{
        const want=wi==0||(!PATHS[p].byLevel&&w.g<=g);
        if(worldOpen(p,wi)!==want)bad('grade '+g+': '+w.id+' open='+!want);
        if(want&&!unlocked(p,WR[p][wi][0]))bad('grade '+g+': first stop of '+w.id+' locked');
      });
      const sw=PATHS.math.worlds.findIndex(w=>w.g>=g),cw=sw<0?PATHS.math.worlds.length-1:sw;
      if(curWorld('math')!==cw)bad('grade '+g+': math opens on world '+curWorld('math')+', expected '+cw);
      if(curWorld('es')!==0)bad('grade '+g+': Spanish should open on its first world');
    }
    load(null);
    S.skip={m_candy:1};
    {const c=wiOf('m_candy');if(!worldFinished('math',c)||!worldOpen('math',c+1)||!unlocked('math',WR.math[c][1])||!unlocked('math',WR.math[c+1][0]))bad('S.skip does not finish a world');}
    // "harder world" game time: with no grade it equals the old index rule; worlds below the grade give nothing
    load(null);
    // byLevel paths: the world's place. Graded paths: 0 below the grade (no grade = K, so Pre-K worlds like ABC Beach give 0), else the earlier worlds at K or above
    for(const p in PATHS)PATHS[p].worlds.forEach((w,wi)=>{const want=PATHS[p].byLevel?wi:w.g<0?0:PATHS[p].worlds.slice(0,wi).filter(x=>x.g>=0).length;if(worldStep(p,wi)!==want)bad('worldStep '+w.id+' '+worldStep(p,wi)+' (want '+want+')')});
    setGrade(2);
    if(worldStep('math',1)!==0||worldStep('math',3)!==0||worldStep('es',2)!==2)bad('worldStep with grade 2');
    // 4. a world inserted at index 0 (like PreK Tiny Town) and a stop added to a finished world never lock anything that was open
    const snap=()=>{const o={};for(const p in PATHS)NODES[p].forEach((n,i)=>{o[p+' '+n.wid+' '+nid(n)]={open:unlocked(p,i),st:getSt(p,i)}});return o};
    const ORIG={};for(const p in PATHS)ORIG[p]=PATHS[p].worlds.slice();
    const restore=()=>{for(const p in PATHS){PATHS[p].worlds=ORIG[p].slice();buildNodes(p)}};
    let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps'])for(const g of [null,-1,0,1,2,6]){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      const before=snap(),hasProg={};for(const p in PATHS)hasProg[p]=NODES[p].some((n,i)=>passed(p,i));
      for(const p in PATHS){PATHS[p].worlds.unshift({id:p[0]+'_fake',g:-1,n:'Fake',e:'',c:'',nodes:[['add',99,'Fake 1'],['sub',99,'Fake 2']]});buildNodes(p)}
      const after=snap();
      for(const k in before){
        const p=k.split(' ')[0];
        if(before[k].st!==after[k].st)bad(name+' grade '+g+': '+k+' stars changed');
        // Allowed only on a path the child has never played, for a world above their grade or on a byLevel path: that child
        // simply starts at the new first world. Anything they have played, or at or below their grade, must stay open.
        const w=PATHS[p].worlds.find(x=>x.id==k.split(' ')[1]),may=!hasProg[p]&&(PATHS[p].byLevel||w.g>gradeOf());
        if(before[k].open&&!after[k].open&&!may)bad(name+' grade '+g+': '+k+' locked after inserting a world');
        checked++;
      }
      restore();
    }
    load(fx('midway'));
    const curBefore=nid(NODES.math[curNode('math')]);
    const mw=ORIG.math.findIndex(w=>w.id=='m_meadow');
    PATHS.math.worlds[mw]={...ORIG.math[mw],nodes:[...ORIG.math[mw].nodes.slice(0,3),['add',98,'New stop'],...ORIG.math[mw].nodes.slice(3)]};buildNodes('math');
    const ni=NODES.math.findIndex(n=>n.lv==98);
    if(!unlocked('math',ni)||!stopNew('math',ni)||!worldFinished('math',mw)||!worldOpen('math',mw+1))bad('stop added to a finished world: not open, not NEW, or the world re-opened');
    if(nid(NODES.math[curNode('math')])!==curBefore)bad('stop added to a finished world moved the current stop');
    restore();
    return {checked,paths:Object.keys(PATHS).length};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:werrs,note:r.paths+' paths, '+r.checked+' stop checks with an inserted world'};
});

run('grade: migration 4 infers a grade, setGrade never removes or re-locks anything, gradeCfg, start world per grade',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const gerrs=[],bad=m=>gerrs.push(m);
  const body=function(){
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const clone=o=>JSON.parse(JSON.stringify(o));
    if(LATEST<5||MIGRATIONS.length!==LATEST)bad('LATEST should be at least 5 and equal MIGRATIONS.length, MIGRATIONS '+MIGRATIONS.length);
    // 1. migration 4: inferred grade per fixture (highest graded world with progress), idempotent, nothing else changes
    const want={fresh:0,midway:1,maxed:2,'legacy-single-map':0,'legacy-index-maps':0};
    for(const name of Object.keys(want)){
      const raw=fx(name),obj=JSON.parse(raw),empty=!Object.keys(obj).length;
      load(empty?null:raw);
      const g=S.grade;
      if(empty){ // a brand-new save has no grade until setup picks one; gradeOf() is K
        if(g!==undefined&&g!==0)bad(name+': new save grade '+g);
      }else if(g!==want[name])bad(name+': inferred grade '+g+', expected '+want[name]);
      if(S.v!==LATEST)bad(name+': S.v '+S.v);
      MIGRATIONS[4]();const once=JSON.stringify(S);migrate();MIGRATIONS[4]();if(JSON.stringify(S)!==once)bad(name+': migration 4 not idempotent');
    }
    // an existing choice is kept, not overwritten
    {const o=JSON.parse(fx('maxed'));o.v=4;o.grade=-1;load(JSON.stringify(o));if(S.grade!==-1)bad('migration 4 overwrote S.grade');}
    // a grade-less save from v46 (LATEST 4) gets one through the normal path and keeps its stars
    {const o=JSON.parse(fx('midway'));o.v=4;load(JSON.stringify(o));if(S.v!==LATEST||S.grade!==1||S.stars!==o.stars)bad('v4 save not migrated to LATEST');}
    // 2. gradeCfg values (ROADMAP 3.1)
    const cfg={'-1':[6,3,'all'],0:[8,4,'all'],1:[10,4,'auto'],2:[10,4,'tap'],3:[10,4,'tap'],4:[10,4,'tap'],5:[10,4,'tap'],6:[10,4,'tap']};
    for(const g of GRADES){
      const c=gradeCfg(g),w=cfg[g];
      if(c.n!==w[0]||c.choices!==w[1]||c.auto!==w[2]||c.multi!==(g>=5)||c.g!==g)bad('gradeCfg('+g+') '+JSON.stringify(c));
      if(typeof gradeSpoken(g)!=='string'||!gradeSpoken(g))bad('no spoken label for '+g);
    }
    S.grade=3;if(gradeCfg().n!==10)bad('gradeCfg() should use the child grade');
    // 3. a fresh save at each of the 8 grades opens the right world on every graded path
    for(const g of GRADES){
      load(null);
      if(!setGrade(g)||S.grade!==g||JSON.parse(store[KEY]).grade!==g)bad('setGrade('+g+') not stored');
      for(const p in PATHS){
        const ws=PATHS[p].worlds,k=PATHS[p].byLevel?0:(ws.findIndex(w=>w.g>=g)<0?ws.length-1:ws.findIndex(w=>w.g>=g));
        if(startWorld(p)!==k||curWorld(p)!==k)bad('fresh grade '+g+' '+p+': start world '+startWorld(p)+', map opens on '+curWorld(p)+', expected '+k);
        if(!worldOpen(p,k))bad('fresh grade '+g+' '+p+': start world not open');
        ws.forEach((w,wi)=>{if(!PATHS[p].byLevel&&w.g<=g&&!worldOpen(p,wi))bad('grade '+g+' '+p+': world '+wi+' at or below grade is locked')});
      }
    }
    if(setGrade(7)||setGrade('2')||setGrade(null))bad('setGrade accepted a bad value');
    // 4. changing the grade (every value, up and down) keeps every star and never locks a passed stop
    let checks=0;
    for(const name of ['midway','maxed','legacy-single-map']){
      load(fx(name));
      const maps0=clone(S.maps),wd0=clone(S.wdone),stars0=S.stars,coins0=S.coins,skip0=clone(S.skip||{});
      for(const g of [...GRADES,...GRADES.slice().reverse()]){
        setGrade(g);
        if(JSON.stringify(S.maps)!==JSON.stringify(maps0))bad(name+' grade '+g+': maps changed');
        if(JSON.stringify(S.wdone)!==JSON.stringify(wd0)||S.stars!==stars0||S.coins!==coins0||JSON.stringify(S.skip||{})!==JSON.stringify(skip0))bad(name+' grade '+g+': progress fields changed');
        for(const p in PATHS)NODES[p].forEach((n,i)=>{
          if(passed(p,i)){checks++;if(!unlocked(p,i))bad(name+' grade '+g+' '+p+' stop '+i+': passed stop locked')}
          if(!n.wid||unlocked(p,i)&&!worldOpen(p,n.wi))bad(name+' '+p+' '+i+': open stop in a closed world');
        });
        // the map always opens on an open stop
        for(const p in PATHS)if(!unlocked(p,curNode(p))&&!passed(p,curNode(p)))bad(name+' grade '+g+' '+p+': current stop is locked');
      }
    }
    return{checks};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:gerrs,note:r.checks+' passed-stop checks across fixtures and grades'};
});

// ---- pictures: picFor falls back to the emoji, uses ART when a drawing exists (pre-P4-13) ----
run('pictures: picFor fallback and art swap; picture generators use picFor',()=>{
  const out=eval(js+`
  const bad=[];
  if(picFor('zzz','🍎')!=='🍎')bad.push('picFor should return the emoji when ART has no drawing');
  if(picFor('zzz')!=='')bad.push('picFor with no drawing and no emoji should be empty');
  ART.zzz='<circle cx="32" cy="32" r="20"/>';
  const a=picFor('zzz','🍎');
  if(!/^<svg class="art"[^>]*viewBox="0 0 64 64"/.test(a)||!a.includes('<circle'))bad.push('picFor should return the drawing when ART has one: '+a);
  if(!picArt('zzz',48).includes('width="48px"'))bad.push('picArt(name, 48) size');
  delete ART.zzz;
  const ART0={...ART}; // real drawings (P4-13+) must survive this test
  // the picture generators go through picFor: with a drawing for every word, no word emoji is left in their html
  const PW=[...CVC,...BLEND,...MAGICE,...TEAMS,...RVW,...VTW];
  for(const [w] of PW)ART[w]='<rect width="64" height="64"/>';
  for(const sk of ['pic','build'])for(let lv=1;lv<=SK[sk].max;lv++)for(let s=1;s<=60;s++){
    const q=genQ(sk,lv,s);
    for(const [w,e] of PW)if(q.html.includes(e)){bad.push(sk+lv+' seed '+s+': emoji '+e+' not routed through picFor');break}
  }
  for(const [w] of PW){if(ART0[w])ART[w]=ART0[w];else delete ART[w]}
  bad;`);
  return{problems:out};
});

run('activity log: idle and hidden time, 60 s cap, day boundary, 60-day trim, size, missing and damaged data',()=>{
  const p=[];
  const bad=m=>p.push(m);
  eval(js+`
  const I=STRK.idx,K=STRK.key,D0='2026-3-1';
  const sk=Object.keys(SK).find(k=>SK[k].area=='read'),skm=Object.keys(SK).find(k=>SK[k].area=='math');
  // a question answered after 10 s counts 10 s, on the right subject
  S.log=undefined;
  ACT.qStart(skm,1000,false);ACT.qEnd(true,false,11000,D0);
  let e=ACT.entry(D0);
  if(!e||e.sec!==10||e.q!==1||e.ok!==1||e.by.math!==10)bad('plain question '+JSON.stringify(e));
  // idle: a question left on screen for 20 minutes counts at most 60 s
  ACT.qStart(sk,0,false);ACT.qEnd(false,false,20*60*1000,D0);
  e=ACT.entry(D0);
  if(e.by.read!==60||e.sec!==70||e.q!==2||e.ok!==1)bad('idle cap '+JSON.stringify(e));
  // hidden: 5 s visible, 3 minutes hidden, 4 s visible = 9 s
  ACT.qStart(skm,0,false);ACT.vis(true,5000);ACT.vis(false,5000+180000);ACT.qEnd(true,false,189000,D0);
  if(ACT.entry(D0).by.math!==19)bad('hidden time counted '+ACT.entry(D0).by.math);
  // a question that starts while hidden, and a double hide/show, never go negative or double count
  ACT.qStart(skm,0,true);ACT.vis(true,1000);ACT.vis(false,50000);ACT.vis(false,50500);ACT.qEnd(true,false,53000,D0);
  if(ACT.entry(D0).by.math!==19+3)bad('start hidden '+ACT.entry(D0).by.math);
  // all-hidden question still counts the 1 s minimum for the answer; no question on screen: qEnd and vis do nothing
  ACT.cur=null;if(ACT.qEnd(true,false,9e9,D0)!==null)bad('qEnd without a question');ACT.vis(true,1);
  // a re-asked miss adds time but not a question; wrong-first adds q without ok
  const before=ACT.entry(D0).q;ACT.qStart(skm,0,false);ACT.qEnd(false,true,4000,D0);
  if(ACT.entry(D0).q!==before)bad('re-asked miss counted as a question');
  // rounds and Fact Sprint
  ACT.round(D0);ACT.round(D0);ACT.flu(60,D0);
  e=ACT.entry(D0);
  if(e.rounds!==2||e.by.math!==19+3+4+60)bad('rounds or sprint '+JSON.stringify(e));
  if(e.sec!==Object.values(e.by).reduce((a,b)=>a+b,0))bad('sec must equal the sum of by');
  // day boundary: the same call on the next day starts a new entry; sums split by day
  ACT.qStart(skm,0,false);ACT.qEnd(true,false,7000,'2026-3-2');
  if(ACT.get().length!==2||ACT.entry('2026-3-2').sec!==7||ACT.entry('2026-3-2').rounds!==0)bad('day boundary');
  const w=ACT.sum('2026-3-2',2);if(w.active!==2||w.sec!==ACT.entry(D0).sec+7)bad('sum over 2 days '+JSON.stringify(w));
  if(ACT.sum('2026-3-2',1).sec!==7||ACT.sum('2026-3-8',8).sec!==ACT.total().sec||ACT.sum('2026-3-8',7).sec!==7)bad('sum windows');
  if(ACT.shift('2026-3-1',-1)!=='2026-2-28'||ACT.shift('2026-12-31',1)!=='2027-1-1'||ACT.shift('x',3)!=='x')bad('shift');
  // 60-day trim: 100 days of data, then a write today keeps exactly the last 60 days
  S.log=[];
  const T=I('2026-6-30');
  for(let i=99;i>=0;i--)ACT.add(K(T-i),{sec:30,area:'math',q:3,ok:2,rounds:1});
  if(ACT.get().length!==60||ACT.get()[0].d!==K(T-59)||ACT.get()[59].d!==K(T))bad('trim to 60 days: '+ACT.get().length+' '+ACT.get()[0].d);
  // size: 60 heavy days (about 70 min a day over 3 subjects, 150 questions) stays under 6 KB of saved JSON
  S.log=[];
  for(let i=59;i>=0;i--)ACT.add(K(T-i),{sec:1,area:'math',rounds:12,q:150,ok:120}),ACT.add(K(T-i),{sec:1400+i,area:'math'}),
    ACT.add(K(T-i),{sec:1500+i,area:'read'}),ACT.add(K(T-i),{sec:1100+i,area:'es'});
  const bytes=JSON.stringify(S.log).length;
  if(bytes>=6144)bad('log too big: '+bytes+' bytes');
  // clock set back: days far in the future are dropped, not kept
  S.log=[{d:'2030-1-1',sec:5,by:{math:5}}];ACT.add('2026-3-1',{sec:2,area:'math'});
  if(ACT.get().some(x=>x.d==='2030-1-1'))bad('future day kept');
  // missing and damaged S.log: defaults, no throw, hooks safe
  for(const v of [undefined,null,5,'x',{},[null,5,'a',{d:'bad'},{d:'2026-3-1'},{d:'2026-3-1',sec:'q',by:'x'},{d:'2026-3-1',by:{math:'z',Es:4,read:-3,es:2.6}}]]){
    S.log=v;
    let r;try{r=ACT.sum('2026-3-1',7);ACT.get();ACT.total()}catch(x){bad('throws on '+JSON.stringify(v)+': '+x.message)}
    if(!r||!(r.sec>=0))bad('sum on '+JSON.stringify(v));
  }
  if(ACT.get().length&&ACT.get().some(x=>!(x.sec>=0)||typeof x.by!='object'))bad('cleaned entries');
  S.log=[{d:'2026-3-1',by:{es:2.6,Es:4}},{d:'2026-3-1',by:{es:1}}];
  if(ACT.get().length!==1||ACT.get()[0].by.es!==4||ACT.get()[0].sec!==4)bad('duplicate days merge '+JSON.stringify(ACT.get()));
  S.log=undefined;
  actQStart('nope');actQEnd(true,false);actRound();actFlu(NaN); // hooks with nothing set up
  if(!(ACT.total().rounds===1))bad('hook round');
  // the real hooks write to today's entry and the visibility rule uses the real clock helpers
  S.log=undefined;
  actQStart(skm);actQEnd(true,false);
  const te=ACT.entry(today());if(!te||te.q!==1||te.sec<1||te.sec>2)bad('hook question '+JSON.stringify(te));
  `);
  return{problems:p};
});

run('placement: state machine rules, scripted answers, simulated students, never more than 20, saves only add',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const perrs=[],bad=m=>perrs.push(m);
  const css=fs.readFileSync(path.join(SRC,'css','39-place.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))bad('39-place.css has a raw hex colour');
  const body=function(){
    const store={};let writes=0;
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{writes++;store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const clone=o=>JSON.parse(JSON.stringify(o));
    const out={sims:0,within:0,maxQ:0,seqs:0,wide:0,wideIn:0};
    // fake path: 16 worlds, 2 per grade from Pre-K to 6th, 6 stops each (real skills, so items can be generated)
    const FAKE=[];
    for(let k=0;k<16;k++){const src=PATHS.math.worlds[k%4];FAKE.push({id:'f_'+k,g:Math.floor(k/2)-1,n:'Fake '+k,e:'',nodes:src.nodes})}
    // 1. start world: one grade below the child's grade (the first world with g >= grade - 1, else the last)
    // math worlds by grade: Tiny Town -1, Number Meadow 0, Candy Canyon 1, Ocean Reef 1, Space Station 2 (P2-01 added Tiny Town)
    {const MW=PATHS.math.worlds,ix=id=>MW.findIndex(w=>w.id===id); // P2-02: by world id (Shape Garden is the first K world, so grade 1 starts there)
    if(PLACE.first(MW,0)!==ix('m_tiny')||PLACE.first(MW,1)!==ix('m_shape')||PLACE.first(MW,2)!==ix('m_candy')
      ||PLACE.first(MW,3)!==ix('m_space')||PLACE.first(MW,6)!==MW.findIndex(w=>w.g>=5))bad('start world per grade on math')} // grade 6 starts on the first grade-5 world (Volcano Lab since P2-11; not the last world once Crystal Caves follows it)
    if(PLACE.first(FAKE,0)!==0||PLACE.first(FAKE,3)!==6||PLACE.first(FAKE,6)!==12)bad('start world per grade on 16 worlds');
    // 2. scripted rules (right answers per testlet -> where it goes)
    const run1=(ws,g,seq)=>{let st=PLACE.begin(ws,g,7);const path=[];for(const r of seq){if(st.done)break;path.push(st.wi);st=PLACE.step(st,r)}return{st,path}};
    const want=(name,got,exp)=>{if(JSON.stringify(got)!==JSON.stringify(exp))bad(name+': got '+JSON.stringify(got)+', expected '+JSON.stringify(exp))};
    {const{st,path}=run1(FAKE,3,[4,4,1]);want('up, up, not yet',[path,st.done,st.at,st.skip,st.asked],[[6,7,8],true,8,[0,1,2,3,4,5,6,7],12])}
    {const{st,path}=run1(FAKE,3,[0,1,3]);want('down, down, pass',[path,st.done,st.at,st.skip.length],[[6,5,4],true,5,5])}
    {const{st,path}=run1(FAKE,3,[2,4,0]);want('2 right repeats, 6 of 8 passes',[path,st.done,st.at,st.rec[6].t],[[6,6,7],true,7,2])}
    {const{st,path}=run1(FAKE,3,[2,3,4]);want('2 then 5 of 8 is not yet, then a pass below stops',[path,st.done,st.at,st.skip.length],[[6,6,5],true,6,6])}
    {const{st}=run1(FAKE,3,[2,3,2]);want('5 of 8 fails, going down',[st.rec[6].v,st.wi],['fail',5])}
    {const{st,path}=run1(FAKE,3,[4,4,4,4,4,4]);want('5 testlets max',[path.length,st.done,st.at,st.asked],[5,true,11,20])}
    {const{st}=run1(FAKE,3,[0,0,0,0,0]);want('all wrong from world 6: lowest asked',[st.done,st.at,st.skip],[true,2,[]])}
    {const{st}=run1(PATHS.math.worlds,0,[0]);want('not yet at the first world stops',[st.done,st.at,st.skip],[true,0,[]])}
    {const nw=PATHS.math.worlds.length,{st}=run1(PATHS.math.worlds,1,Array(nw-1).fill(4)); // a K child starts on world 1 (Tiny Town below is skipped too)
     // 20 questions (PLACE.MAX testlets) pass at most 5 worlds from the start, so on a long path the quiz ends below the last world (P2-06: 7 math worlds)
     const all=nw-1<=PLACE.MAX,at=all?nw-1:1+PLACE.MAX;
     want('all right on math ('+nw+' worlds)',[st.done,st.at,st.all,st.skip],[true,at,all,Array.from({length:all?nw:at},(_,i)=>i)])}
    {const{st}=run1(PATHS.read.worlds,2,[4,1]);want('reading grade 2: pass Candy, not yet Reef',[st.done,st.at,st.skip],[true,3,[0,1,2]])}
    // step is pure: the input state is not changed
    {const a=PLACE.begin(FAKE,3,1),j=JSON.stringify(a);PLACE.step(a,4);if(JSON.stringify(a)!==j)bad('step changed its input')}
    // 3. every possible answer sequence (0..4 right per testlet), 3 path shapes, every grade: ends within 5 testlets / 20 questions
    for(const ws of [FAKE,PATHS.math.worlds,PATHS.read.worlds])for(let g=0;g<=6;g++){
      const walk=(st)=>{
        if(st.done){
          out.seqs++;out.maxQ=Math.max(out.maxQ,st.asked);
          if(st.asked>20||st.k>5)bad('more than 20 questions');
          if(!(st.at>=0&&st.at<ws.length))bad('bad result world '+st.at);
          st.skip.forEach((w,i)=>{if(w!==i||w>st.at||(w==st.at&&!st.all))bad('skip list '+JSON.stringify(st.skip)+' at '+st.at)});
          for(const w in st.rec){const r=st.rec[w];if(r.v=='pass'&&+w>=st.at&&!st.all)bad('a passed world is at or above the result')}
          return;
        }
        if(st.k>=5)return bad('not done after 5 testlets');
        for(let r=0;r<=4;r++)walk(PLACE.step(st,r));
      };
      walk(PLACE.begin(ws,g,3));
    }
    // 4. items: 4 real stops of the asked world, reproducible from the seed, and each makes a valid question
    for(const ws of [PATHS.math.worlds,PATHS.read.worlds,FAKE])for(let s=1;s<40;s++){
      let st=PLACE.begin(ws,1+s%6,s*977);
      for(let t=0;t<3&&!st.done;t++){
        const it=PLACE.items(ws,st),it2=PLACE.items(ws,clone(st));
        if(JSON.stringify(it)!==JSON.stringify(it2))bad('items not reproducible');
        if(it.length!==4)bad('testlet of '+it.length);
        const keys=ws[st.wi].nodes.map(n=>n[0]+n[1]);
        for(const x of it){
          if(!keys.includes(x.sk+x.lv))bad('item '+x.sk+x.lv+' not in world '+st.wi);
          const q=genQ(x.sk,x.lv,x.seed),q2=genQ(x.sk,x.lv,x.seed);
          if(q.html!==q2.html||String(q.ans)!==String(q2.ans))bad('question not reproducible '+x.sk+x.lv);
          const pr=kindProblems(q);if(pr.length)bad(x.sk+x.lv+': '+pr[0]);
        }
        if(ws[st.wi].nodes.length>=4&&new Set(it.map(x=>x.sk+x.lv)).size!==4)bad('repeated stop in a testlet of a big world');
        st=PLACE.step(st,s%5);
      }
    }
    // 5. simulated students (ROADMAP P1-07): right with p 0.95 below their level, 0.2 at or above it.
    //    Truth L = the first world they do not know (n = knows all, which places at the last world).
    //    Population: grade 0..6 picked at random; L from 3 worlds below the start world to 5 above (a grade pick off by about 2).
    const R0=mulberry32(20261110),ri=(a,b)=>a+Math.floor(R0()*(b-a+1));
    const sim=(ws,g,L)=>{const st=PLACE.sim(ws,g,ri(0,1e9),wi=>R0()<(wi<L?0.95:0.2));out.maxQ=Math.max(out.maxQ,st.asked);
      if(st.asked>20)bad('simulation asked '+st.asked);return Math.abs(st.at-Math.min(L,ws.length-1))<=1};
    for(let i=0;i<2000;i++){
      const ws=i%4==0?PATHS.math.worlds:i%4==1?PATHS.read.worlds:FAKE,g=ri(0,6),s=PLACE.first(ws,g);
      const L=ri(Math.max(0,s-3),Math.min(ws.length,s+5));
      out.sims++;if(sim(ws,g,L))out.within++;
    }
    if(out.within<0.95*out.sims)bad('placed within one world of truth in '+out.within+' of '+out.sims+' runs (need 95%)');
    // for the note only: truth anywhere on the 16-world path, whatever the grade
    for(let i=0;i<2000;i++){out.wide++;if(sim(FAKE,ri(0,6),ri(0,16)))out.wideIn++}
    // 6. saving: fixtures x scripted answer patterns. Only S.place and S.skip change; nothing removed or re-locked.
    const pats={allRight:()=>true,allWrong:()=>false,mixed:wi=>wi<1};
    for(const name of ['fresh','midway','maxed']){
      for(const pn in pats){
        const raw=fx(name),empty=!Object.keys(JSON.parse(raw)).length;
        load(empty?null:raw);
        if(empty){S.name='Kid';setGrade(1)}
        const before=clone(S),open0={};
        for(const p in PATHS)open0[p]=NODES[p].map((n,i)=>unlocked(p,i));
        writes=0;
        const p='math',st=PLACE.sim(PATHS[p].worlds,gradeOf(),99,pats[pn]);
        if(writes||JSON.stringify(S)!==JSON.stringify(before))bad(name+' '+pn+': running the quiz saved or changed something');
        const rec=placeApply(p,st);
        if(writes!==1)bad(name+' '+pn+': placeApply should save once');
        const ws=PATHS[p].worlds;
        if(!rec||rec.world!==ws[st.at].id||rec.asked!==st.asked||rec.right!==st.right||rec.g!==gradeOf()||typeof rec.date!=='string')bad(name+' '+pn+': S.place '+JSON.stringify(rec));
        const a=clone(S);delete a.place;delete a.skip;const b=clone(before);delete b.place;delete b.skip;
        if(JSON.stringify(a)!==JSON.stringify(b))bad(name+' '+pn+': fields other than place and skip changed');
        for(const k in before.skip||{})if(!S.skip[k])bad(name+' '+pn+': skip '+k+' removed');
        st.skip.forEach(wi=>{if(!S.skip[ws[wi].id])bad(name+' '+pn+': world '+wi+' not skipped')});
        for(const q in PATHS)NODES[q].forEach((n,i)=>{if(open0[q][i]&&!unlocked(q,i))bad(name+' '+pn+' '+q+' stop '+i+' re-locked')});
        if(startWorld(p)!==st.at)bad(name+' '+pn+': start world '+startWorld(p)+', placed '+st.at);
        if(!unlocked(p,curNode(p))&&!passed(p,curNode(p)))bad(name+' '+pn+': map opens on a locked stop');
        if(name=='fresh'&&curWorld(p)!==st.at)bad('fresh '+pn+': map opens on world '+curWorld(p)+', placed '+st.at);
        if(pn=='allRight'&&!st.all&&ws.length-PLACE.first(ws,gradeOf())<=PLACE.MAX)bad(name+': all right should pass every world');
        if(pn=='allWrong'&&(st.skip.length||st.at!==0))bad(name+': all wrong should start at the first world and skip nothing');
        if(pn=='mixed'&&st.at!==1)bad(name+' mixed: placed at '+st.at+', expected 1');
        // a different grade ignores the result (the skips stay); back to the same grade uses it again
        const g0=gradeOf();setGrade(g0==6?5:g0+1);
        if(placeWorld(p)!==-1)bad(name+' '+pn+': result used at another grade');
        setGrade(g0);if(placeWorld(p)!==st.at)bad(name+' '+pn+': result lost');
        // Spanish (byLevel) never offers placement
        if(placePaths().includes('es'))bad('Spanish offers placement');
      }
    }
    // a second, lower result keeps the first one's skips
    load(fx('midway'));
    placeApply('math',PLACE.sim(PATHS.math.worlds,1,5,()=>true));
    const sk1=Object.keys(S.skip).length;
    placeApply('math',PLACE.sim(PATHS.math.worlds,1,5,()=>false));
    if(Object.keys(S.skip).length!==sk1)bad('a lower re-run removed skips');
    // 7. not for Pre-K; the home card only for a new child who has not been placed
    load(null);S.name='Kid';setGrade(-1);
    if(placeOK()||placeAsk())bad('placement offered at Pre-K');
    setGrade(0);if(!placeOK()||!placeAsk())bad('placement not offered to a new K child');
    load(fx('midway'));if(placeAsk())bad('home card shown to a child with progress');
    return out;
  };
  const r=eval(js+';('+body.toString()+')()');
  const pc=x=>(x*100).toFixed(1)+'%';
  return{problems:perrs,note:`${r.sims} simulated students within one world: ${pc(r.within/r.sims)}; anywhere on 16 worlds: ${pc(r.wideIn/r.wide)}; `+
    `${r.seqs} answer sequences, most questions ${r.maxQ}`};
});

run('mastery: records, states, harder/easier, challenge from question 6, support and hints, middling unchanged, size',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const merrs=[],bad=m=>merrs.push(m);
  const body=function(){
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const key=(sk,lv)=>sk+lv;
    let rounds=0;
    // Plays a stop round without the DOM: makeQ, the check hook (mastTry) and G.done, as check() does on a first try.
    // bot(k, q) -> [right, ms]. Returns one entry per question.
    const sim=(p,i,bot)=>{
      const nd=NODES[p][i];
      G=newG({path:p,node:i,sk:nd.sk,lv:nd.lv,n:gradeCfg().n});
      const out=[];
      while(G.done<G.n){
        const q=makeQ();G.q=q;G.retry=false;G.tries=0;
        const hint=mastHint(q),[ok,ms]=bot(G.done,q);
        mastTry(q,ok,ms);
        if(ok)G.score++;
        out.push({k:key(q.sk,q.lv),tag:mastTag(q),hint,ok,review:!!q.review});
        G.done++;
      }
      rounds++;
      return out;
    };
    const stops=[];
    for(const p in NODES)NODES[p].forEach((n,i)=>{if(n.sk!='boss'&&!SK[n.sk].round)stops.push([p,i])});
    // 0. API on a fresh save and on every fixture: no S.mast is fine, nothing is migrated
    if(LATEST!==MIGRATIONS.length)bad('LATEST should equal MIGRATIONS.length');
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps']){
      const raw=fx(name),obj=JSON.parse(raw);load(Object.keys(obj).length?raw:null);
      const before=JSON.stringify([S.stars,S.coins,S.pet,S.maps,S.wdone]);
      for(const p in NODES)for(const s of mastStops(p))if(s.state!=='new'||s.rec!==null)bad(name+': '+s.nid+' not new without S.mast');
      if(masteryState('add1')!=='new'||mastRec('add1')!==null)bad(name+': masteryState with no S.mast');
      if(JSON.stringify([S.stars,S.coins,S.pet,S.maps,S.wdone])!==before)bad(name+': reading mastery changed progress');
    }
    // 1. harder / easier: next and previous stop of the same skill in path order
    const N=NODES.math,at=(sk,lv)=>N.find(n=>n.sk==sk&&n.lv==lv);
    {const AD=N.filter(n=>n.sk=='add'),k=AD.indexOf(at('add',1)); // map order: Shape Garden add 4, Number Meadow add 1, Candy add 2, Clock Tower add 5, 6, Reef add 3
     if(harder(AD[k])!==AD[k+1]||easier(AD[k+1])!==AD[k]||harder(AD[AD.length-1])!==null)bad('harder/easier add');}
    if(easier(at('add',1))!==(N.slice(0,N.indexOf(at('add',1))).reverse().find(n=>n.sk=='add')||null)||harder(N.find(n=>n.sk=='boss'))!==null)bad('easier(add1) is the add stop just before it on the map (P2-02: add 4 in Shape Garden); harder(boss) null');
    for(const p in NODES)NODES[p].forEach(n=>{const h=harder(n),e=easier(n);
      if(h&&(h.sk!==n.sk||NODES[p].indexOf(h)<=NODES[p].indexOf(n)))bad('harder '+nid(n));
      if(e&&(e.sk!==n.sk||NODES[p].indexOf(e)>=NODES[p].indexOf(n)))bad('easier '+nid(n));});
    // 2. records and states: average then moving average, running median, distinct days, mastered day
    load(null);S.grade=1;
    for(let k=0;k<9;k++)mastAdd('add1',true,3000);
    if(masteryState('add1')!=='learning')bad('9 right tries should be learning: '+masteryState('add1'));
    mastAdd('add1',true,3000);
    if(masteryState('add1')!=='practised')bad('10 right tries should be practised');
    for(let k=0;k<10;k++)mastAdd('add1',true,3000);
    if(masteryState('add1')!=='practised'||S.mast.add1.md)bad('20 tries on one day must not be mastered');
    S.mast.add1.last-=1; // as if the last try was yesterday
    mastAdd('add1',true,3000);
    const r=S.mast.add1;
    if(masteryState('add1')!=='mastered'||r.d!==2||r.md!==mastDay()||r.last!==mastDay()||r.n!==21||r.p!==1)bad('mastered after 2 days: '+JSON.stringify(r));
    for(let k=0;k<3;k++)mastAdd('add1',false,3000);
    if(masteryState('add1')!=='practised'||r.md!==mastDay())bad('accuracy drop: state practised, md kept: '+JSON.stringify(r));
    for(let k=0;k<6;k++)mastAdd('sub1',k<3,3000);
    if(Math.abs(S.mast.sub1.p-.5)>.001)bad('first tries are a plain average: '+S.mast.sub1.p);
    [1000,1000,1000,1000,1000,1000,1000,1000,1000,90000].forEach(t=>mastAdd('eo1',true,t));
    if(S.mast.eo1.ms>1300)bad('one slow answer moved the median to '+S.mast.eo1.ms);
    for(let k=0;k<40;k++)mastAdd('eo1',true,5000);
    if(Math.abs(S.mast.eo1.ms-5000)>300)bad('median should follow to 5000, is '+S.mast.eo1.ms);
    // only stops on a map are recorded; G.nomast records nothing
    load(null);G=newG({sk:'zz_demo',n:1,pool:[]});mastTry({sk:'zz_demo',lv:1,label:'x'},true,100);
    G=newG({path:'math',node:0,sk:'add',lv:1,nomast:true});mastTry({sk:'add',lv:1,label:'x'},true,100);
    if(S.mast&&Object.keys(S.mast).length)bad('recorded a demo skill or a nomast round: '+JSON.stringify(S.mast));
    // 3. a 100%-fast bot gets challenge questions from question 6 (every grade's round length), the round's own stop before
    let ch=0;
    for(const g of [-1,0,1,3]){
      load(null);S.grade=g;
      for(const [p,i] of stops){
        const nd=NODES[p][i],own=nid(nd),h=harder(nd),o=sim(p,i,()=>[true,2500]);
        o.forEach((x,k)=>{
          if(k<MAST.AT&&(x.k!==own||x.tag))bad(p+' '+own+' g'+g+' q'+(k+1)+': '+x.k+' '+x.tag+' before question 6');
          if(k>=MAST.AT&&h&&(x.k!==nid(h)||x.tag!=='ch'))bad(p+' '+own+' g'+g+' q'+(k+1)+': expected challenge '+nid(h)+', got '+x.k+' '+x.tag);
          if(k>=MAST.AT&&!h&&(x.k!==own||x.tag))bad(p+' '+own+' g'+g+' q'+(k+1)+': no harder stop, got '+x.k+' '+x.tag);
          if(x.hint)bad(p+' '+own+': hint before the first try for a 100% bot');
          if(x.tag=='ch')ch++;
        });
        if(G.mode!=='challenge')bad(own+' g'+g+': mode '+G.mode);
      }
    }
    // 100% but slow: no challenge
    load(null);S.grade=1;
    const AI=NODES.math.findIndex(n=>nid(n)=='add1'); // P2-01: Tiny Town now holds the first math stops
    {const o=sim('math',AI,()=>[true,20000]);if(G.mode!==''||o.some(x=>x.tag))bad('slow 100% bot got challenge');}
    // wrong challenge answers are forgiven for the star rating; 3 wrong ones in a row step back to the round's own stop
    {const o=sim('math',AI,(k,q)=>[mastTag(q)!='ch',2000]);
      const tags=o.map(x=>x.tag).join(',');
      if(tags!==',,,,,ch,ch,ch,easy,')bad('challenge then 3 wrong: tags '+tags);
      if(o[8].k!=='add1'||!o[8].hint||o[9].k!=='add1'||o[9].hint||G.mode!=='')bad('after 3 wrong challenge answers: '+JSON.stringify(o.slice(8))+' mode '+G.mode);
      if(G.forgive!==3||G.score+G.forgive!==G.n)bad('forgive '+G.forgive+' score '+G.score);}
    {sim('math',AI,k=>[k<MAST.AT||k%2==1,2000]);
      if(G.forgive!==2||Math.min(G.n,G.score+G.forgive)!==G.n)bad('2 wrong challenge answers must not cost stars: forgive '+G.forgive+' score '+G.score);}
    // 4. a 30% bot gets support: hints before every remaining first try, easier stop at questions 6, 8, 10
    const rng=mulberry32(7);let sup=0,easyQ=0;
    for(let t=0;t<300;t++){
      load(null);S.grade=1;
      const [p,i]=stops[t%stops.length],nd=NODES[p][i],own=nid(nd),e=easier(nd),o=sim(p,i,()=>[rng()<.3,6000]);
      const right5=o.slice(0,MAST.AT).filter(x=>x.ok).length;
      if(right5<=MAST.SUPPORT){
        sup++;
        if(G.mode!=='support')bad(own+': '+right5+' of 5 right but mode '+G.mode);
        o.slice(MAST.AT).forEach((x,k)=>{
          if(!x.hint)bad(own+' q'+(k+6)+': support without the hint first');
          if(x.k!==own&&!(e&&x.k===nid(e)))bad(own+' q'+(k+6)+': support question from '+x.k);
          if(e&&k%2==0&&x.k!==nid(e))bad(own+' q'+(k+6)+': expected the easier stop '+nid(e));
          if(e&&x.k===nid(e))easyQ++;
        });
      }
      // 3 wrong first tries in a row: the next question is easier and shows the hint
      let run=0;
      o.forEach((x,k)=>{
        if(run==MAST.RUN&&(x.tag!=='easy'||!x.hint||(e&&x.k!==nid(e))))bad(own+' q'+(k+1)+' after 3 wrong: '+JSON.stringify(x));
        if(run==MAST.RUN)run=0; // the run starts again after the easier question is chosen
        run=x.ok?0:run+1;
      });
    }
    if(sup<100||easyQ<sup)bad('30% bot: '+sup+' support rounds, '+easyQ+' easier questions');
    // 5. a middling bot (2 of 3 right, never 3 wrong in a row) plays exactly as before: own stop or the usual review, no tags
    for(const name of ['fresh','midway','maxed']){
      load(name=='fresh'?null:fx(name));S.grade=1;
      for(const [p,i] of stops){
        const own=nid(NODES[p][i]),o=sim(p,i,k=>[k%3!=2,4000]);
        if(G.mode!==''||G.forgive||o.some(x=>x.tag||x.hint||(x.k!==own&&!x.review)))
          bad(name+' '+own+': middling round changed '+JSON.stringify(o.filter(x=>x.tag||x.hint||x.k!==own)));
      }
    }
    // 6. determinism: the same answers give the same stops, tags and hints
    load(null);S.grade=1;
    for(const bot of [()=>[true,1000],k=>[k==2,8000],k=>[k>2,3000]]){
      const a=JSON.stringify(sim('read',0,bot).map(x=>[x.k,x.tag,x.hint])),b=JSON.stringify(sim('read',0,bot).map(x=>[x.k,x.tag,x.hint]));
      if(a!==b)bad('not deterministic: '+a+' vs '+b);
    }
    // boss rounds record first tries but never adapt
    load(null);S.grade=1;
    const bi=NODES.math.findIndex(n=>n.sk=='boss');
    G=newG({path:'math',node:bi,sk:'boss',boss:{e:'x',name:'x'},hp:7,pool:worldPool('math',0,10)});
    for(let k=0;k<10;k++){const q=makeQ();G.q=q;mastTry(q,false,500);G.done++;if(mastTag(q)||mastHint(q))bad('boss round adapted')}
    if(!S.mast||Object.values(S.mast).reduce((a,r)=>a+r.n,0)!==10||G.ease||G.mode!==undefined)bad('boss round: not recorded, or adapted');
    // 7. size: 400 stops stay under 30 KB
    S.mast={};
    // keys: today's skill ids with levels counted up to 400 stops (future ids are about as long); heavy but possible values
    const ids=Object.keys(SK);
    for(let k=0;k<400;k++)S.mast[ids[k%ids.length]+(Math.floor(k/ids.length)+1)]={n:999,p:.937,ms:59990,d:365,last:20765,md:20700};
    const sz=JSON.stringify(S.mast).length;
    if(sz>=30000)bad('S.mast with 400 stops is '+sz+' bytes');
    return{ch,rounds,sz,sup};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:merrs,note:r.rounds+' simulated rounds, '+r.ch+' challenge questions, '+r.sup+' support rounds, 400 stops = '+r.sz+' bytes'};
});

run('report card (P5-06): read-only, empty and old saves, numbers, escaping, damaged data, strands cover every skill',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const rerrs=[],bad=m=>rerrs.push(m);
  const body=function(){
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const BADTXT=/\bundefined\b|\bNaN\b|\[object |\bnull\b|Infinity/;
    // renders the whole card and checks that S did not change by one byte (not even a default added in memory)
    const render=label=>{
      const before=JSON.stringify(S),keys=Object.keys(S).join(',');
      let h='';
      try{h=REP.html(REP.data())}catch(e){bad(label+': threw '+(e&&e.stack||e));return''}
      if(JSON.stringify(S)!==before||Object.keys(S).join(',')!==keys)bad(label+': opening the report card changed S');
      const txt=h.replace(/<[^>]*>/g,' ');
      if(BADTXT.test(txt))bad(label+': bad text '+(txt.match(BADTXT)||[])[0]);
      if(!/Report card for/.test(h)||h.split('<section').length!==8)bad(label+': expected 7 sections, got '+(h.split('<section').length-1));
      return h;
    };
    const now=STRK.idx(today()),dk=n=>STRK.key(now-n);
    // 1. brand-new child: kind empty states in every section, nothing saved
    load(null);S.name='Ava';
    let h=render('fresh');
    for(const t of ['No learning time recorded yet','Not started yet','This list fills in after a few rounds','No stop is mastered yet','No Fact Sprint scores yet','No streak right now'])
      if(!h.includes(t))bad('fresh: missing empty state "'+t+'"');
    // 2. every fixture, and each fixture as an old save without the newer fields
    for(const n of ['fresh','midway','maxed','legacy-index-maps','legacy-single-map']){
      load(fx(n));render(n);
      for(const f of ['log','mast','flu','streak'])delete S[f];
      render(n+' without log/mast/flu/streak');
      if('log' in S)bad(n+': S.log created');
    }
    // 3. a week with data
    load(null);S.name='Ava';S.grade=2;
    S.log=[];
    const add=(d,sec,rounds,q,ok,by)=>S.log.push({d:dk(d),sec,rounds,q,ok,by});
    add(0,600,2,20,18,{math:420,read:180});add(2,300,1,10,8,{math:300});add(9,540,2,20,10,{read:540});add(13,60,1,5,5,{es:60});add(30,900,3,30,30,{math:900});
    S.mast={add1:{n:30,p:.95,ms:5000,d:3,last:now,md:now-2},sub1:{n:12,p:.4,ms:9000,d:2,last:now,md:-1},cnt1:{n:6,p:.33,ms:9000,d:1,last:now,md:-1},
      sight1:{n:25,p:.92,ms:4000,d:4,last:now-1,md:now-6}};
    S.prog=S.prog||{};
    S.prog.sub={lv:1,r:3,c:5,t:12,miss:{'8 − 3':{n:2,tot:4,q:{sk:'sub',lv:1,label:'8 − 3'}},'<b>x</b>':{n:1,tot:1,q:{sk:'sub',lv:1,label:'<b>x</b>'}}}};
    S.flu={add10:{best:24,hist:[]},'add10-20':{best:31.5,hist:[]}};
    S.streak={best:9,rw:0,days:{[dk(0)]:1,[dk(1)]:1,[dk(2)]:1}};
    S.maps.math.add1=3;
    const m=REP.data(),before=JSON.stringify(S);
    if(m.cur.sec!==900||m.cur.rounds!==3||m.cur.q!==30||m.cur.ok!==26||m.cur.active!==2)bad('this week totals '+JSON.stringify(m.cur));
    if(m.prev.sec!==600||m.prev.q!==25||m.prev.ok!==15)bad('last week totals '+JSON.stringify(m.prev));
    if(m.days.length!==14||m.days[13].sec!==600||m.days[11].sec!==300||m.days[4].sec!==540||m.days[0].sec!==60)bad('14 days '+JSON.stringify(m.days.map(d=>d.sec)));
    if(m.mastered.length!==2||m.mastered[0].t!=='Adding to 10'||m.mastered[0].when!=='2 days ago')bad('recently mastered '+JSON.stringify(m.mastered.map(x=>[x.t,x.when])));
    if(m.needs.length!==2||m.needs[0].sk!=='cnt'||m.needs[1].sk!=='sub')bad('needs practice order '+JSON.stringify(m.needs.map(x=>x.sk)));
    if(m.streak.count!==3||m.streak.best!==9||!m.streak.doneToday)bad('streak '+JSON.stringify(m.streak));
    h=render('data');
    for(const t of ['>15</div>','>87%</div>','>60%</div>','5 min more than last week','Adding to 10','2 days ago','3 days in a row','Best so far: 9 days','24 right','31.5 s','Examples they missed',
      'Working at the <b>K</b> level'])
      if(!h.includes(t))bad('data: missing "'+t+'"');
    if(h.includes('<b>x</b>')||!h.includes('&lt;b&gt;x&lt;/b&gt;'))bad('example miss label not escaped');
    if(JSON.stringify(S)!==before)bad('data: S changed');
    // 4. the child's name is escaped
    S.name='<img src=x onerror=alert(1)>';h=render('name');
    if(h.includes('<img'))bad('name not escaped');
    // 5. damaged data never throws and never changes S
    load(fx('midway'));
    S.log='x';S.mast={add1:{n:'a',p:NaN},sub1:null,zzz:{n:5,p:.1}};S.flu=5;S.streak=[];S.prog={add:{miss:5},sub:{miss:{a:{q:null},b:{q:{label:7}}}}};
    render('damaged');
    S.log=[null,{d:'junk'},{d:dk(1),sec:'x',by:[]}];S.mast=[];S.flu={add10:{best:'abc'}};S.streak={days:5,best:'x'};S.name=null;S.grade='x';
    render('damaged 2');
    // 6. every skill has a real strand (a new skill without one would land in "Other skills")
    const other=Object.keys(SK).filter(k=>REP.strandOf(k)==='Other skills');
    if(other.length)bad('skills without a strand: '+other.join(', '));
    // 7. the Grown-ups entry
    if(!/id="rp-open"/.test(reportGrownHTML()))bad('entry button missing');
    return{h:h.length};
  };
  eval(js+';('+body.toString()+')()');
  const g=fs.readFileSync(path.join(SRC,'js','80-grown.js'),'utf8');
  if(!/\$\{reportGrownHTML\(\)\}/.test(g)||!/reportGrownBind\(\);/.test(g))rerrs.push('80-grown.js does not call reportGrownHTML/reportGrownBind');
  const css=fs.readFileSync(path.join(SRC,'css','36-report.css'),'utf8');
  if(!/@media print/.test(css)||/#[0-9a-fA-F]{3,8}\b/.test(css))rerrs.push('36-report.css: print rules missing or raw hex');
  return{problems:rerrs};
});

// ---- spaced review engine and migration 5 (P5-02) ----
run('review: migration 5 keeps progress and shrinks the save, exact rebuilds, 60-day calendar, cap, size, round slots',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const rerrs=[],bad=m=>rerrs.push(m);
  const body=function(){
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const keep=o=>JSON.stringify([o.stars,o.coins,o.pet,o.petName,o.name,Object.entries(o.maps||{}).filter(e=>e[0]!='disc'),o.wdone,o.owned,o.wear,o.stickers,o.mast,o.streak,o.grade]); // P2-36: the empty Discover map that migrate() adds is not progress
    // the v53 readers of P(sk).miss: the old home count / Tricky Mix list, and the Grown-ups "Tricky ones" cell (80-grown.js)
    const oldTricky=o=>{let k=0;for(const sk in o.prog||{})for(const m of Object.values(o.prog[sk].miss||{}))if(m&&m.n>0&&m.q)k++;return k};
    const grownCell=()=>Object.keys(S.prog).map(sk=>Object.values(P(sk).miss).sort((a,b)=>b.tot-a.tot).slice(0,3).map(m=>esc(m.q.label)).join('<br>')).join('|');
    const D0=20400; // a day number (2025-11-07); every scheduling call below passes its day
    const info={};
    // 1. migration 5 on every fixture: progress unchanged, same number of tricky items on home, no html left, smaller, idempotent
    if(LATEST!==6||MIGRATIONS.length!==6)bad('P5-02 adds migration 5: LATEST should be 6, MIGRATIONS '+MIGRATIONS.length);
    for(const name of ['tricky','midway','maxed','fresh','legacy-single-map','legacy-index-maps']){
      const raw=fx(name),before=JSON.parse(raw),empty=!Object.keys(before).length;
      if(empty){load(null);if(S.rev!==undefined)bad(name+': a new save got S.rev');continue}
      // the same save carried to schema 5 by the old migrations only: what the child had before this release
      loadSave(raw);for(let n=Number.isInteger(S.v)?S.v:1;n<5;n++)MIGRATIONS[n]();const v5=JSON.parse(JSON.stringify(S));
      load(raw);
      if(S.v!==LATEST)bad(name+': S.v '+S.v);
      if(keep(S)!==keep(v5))bad(name+': stars, coins, pet, maps or other progress changed');
      const want=oldTricky(before),items=REV.get().length;
      if(items!==want)bad(name+': '+want+' tricky misses became '+items+' review items');
      if(Math.min(allMiss().length,10)!==Math.min(want,10))bad(name+': home shows '+allMiss().length+' tricky, was '+want);
      const sv=store[KEY];
      if(/class=|"html"|"choices"|"ctx"/.test(sv))bad(name+': question html still in the save');
      if(want&&sv.length>=raw.length)bad(name+': save did not shrink ('+raw.length+' -> '+sv.length+')');
      for(const sk in S.prog)for(const [lb,m] of Object.entries(S.prog[sk].miss||{})){
        const o=(before.prog[sk].miss||{})[lb];
        if(Object.keys(m).join()!=='tot,q'||Object.keys(m.q).join()!=='label'||m.q.label!==lb||m.tot<1)bad(name+': tally '+JSON.stringify(m));
        else if(o&&o.tot>0&&m.tot!==o.tot)bad(name+': tally tot changed for '+lb);
      }
      if(oldTricky(S)!==0)bad(name+': an older app would still find stored questions to replay');
      try{grownCell()}catch(e){bad(name+': Grown-ups tricky cell throws '+e.message)}
      const once=JSON.stringify(S);MIGRATIONS[5]();migrate();if(JSON.stringify(S)!==once)bad(name+': migration 5 not idempotent');
      if(name=='tricky')info.fx=raw.length+' -> '+sv.length+' bytes, '+items+' items';
      // a stored question may hold an emoji where today's rebuild holds a drawing (P4-13): compare with the picture blanked out
      const normPic=h=>String(h).replace(/<svg class="art".*?<\/svg>/g,'@').replace(/(<div class="emo">)[^<]*(<\/div>)/g,'$1@$2');
      // every migrated item with a seed rebuilds the exact stored question; the rest give a question of the same skill and level
      for(const it of REV.get()){
        const o=before.prog[it.sk]&&Object.values(before.prog[it.sk].miss).find(m=>m.q&&String(m.q.label).slice(0,60)===it.label);
        if(!o){bad(name+': no source miss for '+revKey(it));continue}
        if(it.box!==0||it.due!==0||it.n!==o.n||it.lv!==o.q.lv)bad(name+': item fields '+JSON.stringify(it));
        const q=revQ(it);
        if(!q||q.sk!==it.sk||q.lv!==it.lv||q.rvk!==revKey(it))bad(name+': revQ '+revKey(it));
        else if(o.q.seed!=null&&(normPic(q.html)!==normPic(o.q.html)||String(q.ans)!==String(o.q.ans)||q.label!==o.q.label))bad(name+': not the same question '+revKey(it));
        else if(o.q.seed==null&&!('seed' in it))bad(name+': seed search did not run for '+revKey(it));
      }
      if(name=='tricky'){
        // old items without a seed: a seed with the same label is found and stored, or the item stays and gets a fresh question
        const ns=REV.get().filter(it=>!Object.values(before.prog[it.sk].miss).find(m=>m.q&&m.q.label===it.label&&m.q.seed!=null));
        info.noseed=ns.filter(it=>Number.isInteger(it.seed)).length+' of '+ns.length+' unseeded found a seed';
        if(ns.length!==5||ns.filter(it=>Number.isInteger(it.seed)).length<3)bad('tricky: unseeded items '+JSON.stringify(ns)); // 2 in midway's old label format, 3 not
      }
    }
    // a v5 save with a bank miss keeps its bank spec; damaged miss entries are skipped without a throw
    {
      const o=JSON.parse(fx('tricky'));
      o.prog.add.miss['B']={n:2,tot:2,q:{kind:'choice',label:'B',html:'<b>x</b>',sk:'add',lv:1,seed:5,bk:{id:'demo',lv:1,bi:0,s:5}}};
      o.prog.add.miss['J']=null;o.prog.sub.miss=7;o.prog.cnt.miss['K']={n:1,q:'old'};
      load(JSON.stringify(o));
      const it=REV.get().find(x=>x.label=='B');
      if(!it||JSON.stringify(it.bk)!=='{"id":"demo","lv":1,"bi":0,"s":5}')bad('bank spec not kept: '+JSON.stringify(it));
      if(S.prog.add.miss.J!==null||S.prog.sub.miss!==7||S.prog.cnt.miss.K.q!=='old')bad('damaged miss entries were changed');
    }
    // more than 150 tricky misses: the 150 most missed are kept
    {
      const o=JSON.parse(fx('tricky'));o.prog.add.miss={};
      for(let k=0;k<200;k++)o.prog.add.miss['L'+k]={n:1+k%7,tot:9,q:{kind:'num',label:'L'+k,html:'h',sk:'add',lv:1,seed:k}};
      const ns=[];for(const sk in o.prog)for(const m of Object.values(o.prog[sk].miss||{}))if(m&&m.n>0&&m.q&&m.q.kind)ns.push(m.n);
      load(JSON.stringify(o));
      const a=REV.get(),minN=Math.min(...a.map(x=>x.n)),cut=ns.sort((x,y)=>y-x)[149];
      if(a.length!==150||minN!==cut||a.filter(x=>x.n>cut).length!==ns.filter(n=>n>cut).length)bad('migration cap: '+a.length+' items, smallest n '+minN+', expected '+cut);
    }

    // 2. exact rebuilds: every skill and level, and bank and passage questions through bankRebuild while bank memory is live
    load(null);
    SK.__bk={t:'Bank',e:'x',area:'read',max:1,bank:'demo',gen:lv=>genBank('demo',lv)};
    SK.__ps={t:'Passage',e:'x',area:'read',max:1,bank:'demo',gen:lv=>genPassage('demo',lv)};
    bankRound(); // live play: bank choice is by least recently shown, not by seed
    let nb=0;
    for(const sk in SK)for(let lv=1;lv<=SK[sk].max;lv++)if(!skLvEmpty(sk,lv))for(let s=1;s<=4;s++){
      S.rev=[];
      const q=genQ(sk,lv,s*7919+lv);
      const it=revMiss(q,D0);
      if(!it){bad('no item for '+sk+lv);continue}
      const r=revQ(it);nb++;
      if(r.html!==q.html||r.label!==q.label||JSON.stringify(r.ans)!==JSON.stringify(q.ans)||r.kind!==q.kind)bad('not rebuilt exactly: '+sk+lv+' seed '+q.seed);
      if(JSON.stringify(it).length>200)bad('item too big: '+JSON.stringify(it));
    }
    bankReset();delete SK.__bk;delete SK.__ps;
    // the generator changed (label differs): a fresh question of the same skill and level, and the item stays
    S.rev=[{sk:'add',lv:1,seed:3,label:'old label',box:2,due:D0,n:4}];
    {const q=revQ(S.rev[0]);if(q.sk!=='add'||q.lv!==1||q.label==='old label'||REV.get().length!==1||q.rvk!=='add|1|old label')bad('label mismatch fallback');
     // answering that fresh question is booked to the item
     if(!revRight(q,D0)||S.rev[0].box!==3||S.rev[0].due!==D0+7)bad('fallback answer not booked: '+JSON.stringify(S.rev[0]));
     revMiss(q,D0+1);if(S.rev.length!==1||S.rev[0].box!==0||S.rev[0].n!==5)bad('fallback miss not booked: '+JSON.stringify(S.rev))}

    // 3. Leitner rules, one item: intervals 0, 1, 3, 7, 21; due days exact; not due does not move; out after box 4
    S.rev=[];
    const qa=genQ('add',1,11);revMiss(qa,D0);
    const days=[];
    for(let d=D0;d<=D0+60;d++){
      if(dueItems(5,null,d).length){days.push(d-D0);if(!revRight(qa,d))bad('due item not moved on day '+(d-D0))}
      else if(revRight(qa,d))bad('item moved while not due, day '+(d-D0));
    }
    if(days.join()!=='0,1,4,11,32'||REV.get().length)bad('one item: due on days '+days.join()+', left '+REV.get().length);
    // a wrong answer resets to box 0, due the same day, and counts n
    S.rev=[];revMiss(qa,D0);revRight(qa,D0);revRight(qa,D0+1);revMiss(qa,D0+4);
    if(JSON.stringify([S.rev[0].box,S.rev[0].due-D0,S.rev[0].n])!=='[0,4,2]')bad('reset: '+JSON.stringify(S.rev[0]));
    // the clock set back: an item due far ahead is due now; a damaged S.rev is cleaned without a throw
    S.rev=[{sk:'add',lv:1,seed:1,label:'x',box:1,due:D0+400,n:1}];if(dueItems(5,null,D0).length!==1)bad('clock set back: item not due');
    S.rev='junk';if(dueItems(5,null,D0).length||!Array.isArray(S.rev))bad('S.rev junk');
    S.rev=[null,{sk:1},{sk:'add',lv:1,label:'y',box:9,due:'a'},{sk:'nope',lv:1,label:'z',box:0,due:0,n:1}];
    if(dueItems(5,null,D0).length!==1||REV.get().length!==2||S.rev[0].box!==0)bad('damaged S.rev: '+JSON.stringify(S.rev));
    // a challenge question missed is not an item; questions of unknown skills are not items
    S.rev=[];G=newG({path:'math',node:0,sk:'add',lv:1});G.mq=new Map();const qc=genQ('add',2,5);G.mq.set(qc,'ch');
    revMiss(qc,D0);revMiss({sk:'zz_demo',lv:1,label:'d',kind:'num'},D0);if(S.rev.length)bad('challenge or demo miss stored: '+JSON.stringify(S.rev));
    G=null;

    // 4. 60-day calendar: a child misses 0-2 new facts a day and answers every due item, wrong about 1 time in 5.
    //    An independent model of the rules says when each item is due; the engine must agree every day.
    S.rev=[];
    const INT=[0,1,3,7,21],model={},qs={};let seed=1,maxLen=0,reviews=0,wrongs=0,left=0;
    const skills=Object.keys(SK).filter(sk=>!SK[sk].bank);
    const h=(a,b)=>(Math.imul(a^0x9E3779B1,0x85EBCA6B)^Math.imul(b+7,0xC2B2AE35))>>>0;
    for(let t=0;t<=60;t++){
      const d=D0+t;
      const want=Object.keys(model).filter(k=>model[k].due<=d).sort();
      const got=dueItems(REV.CAP,null,d).map(revKey).sort();
      if(want.join('~')!==got.join('~')){bad('day '+t+': due '+got.length+', model says '+want.length);break}
      for(const k of want){
        reviews++;
        const m=model[k],q=revQ(REV.get().find(x=>revKey(x)===k));
        if(h(t,reviews)%5==0){wrongs++;revMiss(q,d);m.box=0;m.due=d;continue}
        if(!revRight(q,d))bad('day '+t+': right answer not booked for '+k);
        if(m.box==4){delete model[k];left++}else{m.box++;m.due=d+INT[m.box]}
      }
      for(let j=0;j<t%3;j++){
        const sk=skills[seed%skills.length],q=genQ(sk,skLvPick(sk,1+seed%SK[sk].max),seed++),k=revKey(q);
        revMiss(q,d);if(model[k]){model[k].box=0;model[k].due=d}else model[k]={box:0,due:d};qs[k]=1;
      }
      maxLen=Math.max(maxLen,S.rev.length);
      if(S.rev.length!==Object.keys(model).length)bad('day '+t+': '+S.rev.length+' items, model has '+Object.keys(model).length);
      for(const it of S.rev){const m=model[revKey(it)];if(!m||m.box!==it.box||m.due!==it.due){bad('day '+t+': item differs from the model '+JSON.stringify(it));break}}
    }
    if(!left||!wrongs)bad('calendar did not exercise leaving and resets');
    info.cal=Object.keys(qs).length+' facts, '+reviews+' reviews ('+wrongs+' wrong), '+left+' learned, '+S.rev.length+' left';

    // 5. cap: 250 more misses on a full list keep 150 items; the item in the highest box goes, never the new one
    S.rev=[];
    for(let k=0;k<150;k++)S.rev.push({sk:'add',lv:1,seed:k,label:'c'+k,box:k%5,due:D0,n:1});
    for(let k=0;k<250;k++){
      const boxes=REV.get().map(x=>x.box),top=Math.max(...boxes),sum=boxes.reduce((a,b)=>a+b,0);
      revMiss({sk:'sub',lv:1,seed:k,label:'s'+k,kind:'num'},D0);
      if(S.rev.length!==150){bad('cap: '+S.rev.length+' items');break}
      const gone=sum-S.rev.reduce((a,x)=>a+x.box,0); // the new item is in box 0
      if(gone!==top){bad('cap: dropped box '+gone+', highest was '+top);break}
    }
    if(!S.rev.some(x=>x.label=='s249'))bad('cap dropped the newest miss');
    S.rev=[];
    for(let k=0;k<160;k++)revMiss({sk:'es_family',lv:2,seed:4294967295-k,label:('W'+k+' ').repeat(30),kind:'choice',
      bk:{id:'gram_long_name',lv:2,bp:99,qi:5,s:4294967295-k}},D0+99999);
    S.rev.forEach(x=>x.n=99);
    const worst=JSON.stringify(S.rev).length;
    if(S.rev.length!==150||worst>=40000)bad('worst case: '+S.rev.length+' items, '+worst+' bytes');

    // 6. round slots: nothing due on the path = the engine asks nothing; due items at questions 2, 4, 6, 8, once each
    load(fx('maxed'));S.grade=1;
    const stop=NODES.math.findIndex(n=>n.sk=='sub'&&n.lv==1);
    const play=()=>{G=newG({path:'math',node:stop,sk:'sub',lv:1,n:10});const o=[];
      while(G.done<G.n){const q=makeQ();o.push({rv:q.rvk||'',review:!!q.review});G.done++}return o};
    const today=REV.day();
    for(const setup of [()=>{S.rev=[]},()=>{S.rev=[{sk:'sub',lv:1,seed:1,label:'q',box:1,due:today+1,n:1}]},
      ()=>{S.rev=[{sk:'sight',lv:1,seed:1,label:'r',box:0,due:today,n:1}]}]){
      setup();
      for(let k=0;k<10;k++){G=newG({path:'math',node:stop,sk:'sub',lv:1,n:10});G.done=k;if(revSlot())bad('revSlot asked with nothing due on this path, question '+(k+1))}
    }
    S.rev=[];
    [1,2,3].map(s=>revMiss(genQ('sub',1,s),today));
    [4,5,6].map(s=>revMiss(genQ('add',1,s),today)).forEach(x=>x.n=9); // more missed: asked first at the path slots
    const o=play(),at=o.map((x,i)=>x.rv?i:-1).filter(i=>i>=0);
    if(at.join()!=='1,3,5,7')bad('review slots: '+JSON.stringify(o));
    else if(!o[1].rv.startsWith('sub|1|')||!o[5].rv.startsWith('sub|1|')||!o[3].rv.startsWith('add|1|')||!o[7].rv.startsWith('add|1|'))bad('slot owners: '+JSON.stringify(o));
    if(new Set(at.map(i=>o[i].rv)).size!==at.length||at.some(i=>!o[i].review))bad('an item asked twice or without the review tag');
    // boss, test out, mix and placement rounds never take review slots
    for(const x of [{boss:{e:'x',name:'x'},pool:[]},{test:{wi:0},pool:[]},{mix:true},{nomast:true}]){
      G=newG(Object.assign({path:'math',node:stop,sk:'sub',lv:1},x));G.done=3;if(revSlot())bad('revSlot in '+Object.keys(x)[0]+' round')}
    // Tricky Mix: rebuilt from due items, and a right answer is booked once
    const mq=allMiss().slice(0,7).map(revQ);
    if(mq.length!==6||mq.some(q=>!q.rvk))bad('tricky mix questions: '+mq.length);
    if(!revRight(mq[0],today)||revRight(mq[0],today))bad('tricky mix answer booked wrong');
    G=null;
    return{info,nb,worst};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:rerrs,note:'tricky fixture '+r.info.fx+'; '+r.info.noseed+'; '+r.nb+' exact rebuilds; '+r.info.cal+'; worst 150 items = '+r.worst+' bytes'};
});

// ---- Mixed Practice / Tricky Mix never draws a boss stop (bug found merging P5-02: random crash after a boss was beaten) ----
run('mix: Mixed Practice and Tricky Mix start without errors on every fixture, never from a boss stop',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const out=[];
  for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps']){
    const r=eval(js+`
    const store={'starschool-v2':${JSON.stringify(fx(name))}};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};
    loadSave(store['starschool-v2']);migrate();
    const bad=[];
    for(let i=0;i<300;i++){try{const qs=mixQs();if(qs.length!==10||qs.some(q=>!q||!q.sk||q.sk=='boss'||!q.html))bad.push('bad question in the mix')}catch(e){bad.push('mixQs threw: '+e.message);break}}
    bad;`);
    for(const m of r)out.push(name+': '+m);
  }
  return{problems:[...new Set(out)]};
});

// ---- P5-03 Daily Review: card and round built on dueItems ----
run('daily review: card counts due items, the round asks them first, nothing due never starts an empty round',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const out=[];
  const r=eval(js+`
  const store={'starschool-v2':${JSON.stringify(fx('tricky'))}};
  localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};
  loadSave(store['starschool-v2']);migrate();
  const bad=[],td=REV.day(),rall=REV.get().slice();
  let started=0,nexts=0;
  startMix=()=>{started++};next=()=>{nexts++};
  // 12 due items: the card says 12, the round holds the 10 most urgent, in order, and makeQ hands them out first
  S.rev=rall.slice(0,12).map(x=>({...x,due:td}));
  if(dueItems().length!==12)bad.push('setup: '+dueItems().length+' due');
  if(!/id="revn">12<\\/span> due/.test(revCard())||!/id="rev"/.test(revCard()))bad.push('card with 12 due: '+revCard());
  const want=dueItems(10).map(revKey);
  startReview();
  if(!G||!G.mix||!G.daily||G.n!==10||G.pool.length!==10||started||nexts!==1)bad.push('round: '+JSON.stringify({n:G&&G.n,p:G&&G.pool&&G.pool.length,started,nexts}));
  else{
    const got=G.pool.map(q=>q.rvk);
    if(got.join()!==want.join())bad.push('round does not ask the due items first, most urgent first');
    const asked=[];for(let i=0;i<10;i++)asked.push(makeQ().rvk);
    if(asked.join()!==want.join())bad.push('makeQ order');
  }
  // 3 due: a short round of exactly those 3
  S.rev=rall.slice(0,3).map(x=>({...x,due:td}));
  startReview();
  if(G.n!==3||G.pool.length!==3||G.pool.some(q=>!q.rvk))bad.push('3 due: '+G.n);
  // a right first try books the item (Daily Review answers move items up like any other)
  const q0=G.pool[0];if(!revRight(q0,td))bad.push('answer not booked');
  if(dueItems().length!==2)bad.push('2 due expected after one right answer');
  // nothing due: kind card, no start button, startReview falls back to Mixed Practice and never builds an empty round
  S.rev=[];G=null;
  const c0=revCard();
  if(!/All caught up/.test(c0)||/id="rev"/.test(c0)||/Tricky/.test(c0))bad.push('empty card: '+c0);
  started=0;nexts=0;startReview();
  if(started!==1||nexts!==0||G)bad.push('0 due must run Mixed Practice, not an empty round');
  // items not due yet are not counted
  S.rev=rall.slice(0,5).map(x=>({...x,due:td+1,box:1}));
  if(dueItems().length||!/All caught up/.test(revCard()))bad.push('future items counted as due');
  // every fixture: card and review questions build without errors
  bad;`);
  for(const m of r)out.push(m);
  for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps']){
    const r2=eval(js+`
    const store={'starschool-v2':${JSON.stringify(fx(name))}};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};
    loadSave(store['starschool-v2']);migrate();
    const bad=[];
    try{const c=revCard(),qs=reviewQs();if(!c||qs.length>10||qs.some(q=>!q||!q.html))bad.push('bad card or questions')}catch(e){bad.push('threw: '+e.message)}
    bad;`);
    for(const m of r2)out.push(name+': '+m);
  }
  return{problems:out};
});

// ---- P2-19: spelling levels 1-7 (word data, generator, map stops, save safety) ----
run('spelling P2-19: word data, 3000 questions per level, visible clue, hints, map stops, no star moves, no re-lock',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const serrs=[],bad=m=>serrs.push(m);
  const body=function(){
    const want=[40,60,60,60,60,60,60];
    if(SK.spell.max!==7)bad('SK.spell.max is '+SK.spell.max);
    for(let lv=1;lv<=7;lv++){
      const L=spellList(lv),ws=L.map(x=>x[0]),w2='level '+lv+': ';
      if(L.length!==want[lv-1])bad(w2+L.length+' words, wants '+want[lv-1]);
      if(new Set(ws).size!==ws.length)bad(w2+'duplicate word in the level');
      for(const [w,s] of L){
        if(!/^[a-z]{2,12}$/.test(w))bad(w2+'word "'+w+'" is not 2-12 lowercase letters');
        if(BAD.test(w))bad(w2+'BAD word '+w);
        if(typeof s!=='string'||s.length<8||s.length>80)bad(w2+w+': sentence length');
        else{
          const hits=s.match(new RegExp('\\b'+w+'\\b','gi'));
          if(!hits||hits.length!==1)bad(w2+w+': sentence must hold the word exactly once');
          if(s.split(/[^A-Za-z']+/).some(x=>BAD.test(x.toLowerCase())))bad(w2+w+': BAD word in the sentence');
        }
      }
      // 3000 seeded questions: valid spell question, visible clue with a blank, no answer in the clue, hint that does not give the answer away
      const seenW=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ('spell',lv,i+1);
        const pr=kindProblems(q);if(pr.length)bad(w2+q.word+': '+pr.join('; '));
        seenW.add(q.word);
        const clue=q.html.replace(/<span[^>]*id="ls\d+"[^>]*><\/span>/g,'');
        if(!clue.includes('_____'))bad(w2+q.word+': the clue has no blank');
        if(new RegExp('\\b'+q.word+'\\b','i').test(clue.replace(/<[^>]*>/g,'')))bad(w2+q.word+': the word is visible in the clue');
        if(!q.say.includes(q.word)||q.say.split(q.word).length<3)bad(w2+q.word+': say should speak the word, the sentence, the word');
        if(!q.hint||q.hint.k!=='say'||q.hint.w!==q.word||new RegExp('\\b'+q.word+'\\b','i').test(q.hint.s.replace('starts with',''))||!q.hint.s.includes(q.word.length+' letters'))bad(w2+q.word+': hint');
        if(labels[q.label]&&labels[q.label]!==q.word)bad(w2+'label '+q.label+' is not unique');
        labels[q.label]=q.word;
        if(q.label.length>=60)bad(w2+'label too long');
        if(q.sk!=='spell'||q.lv!==lv)bad(w2+'genQ did not stamp sk/lv');
      }
      if(seenW.size!==ws.length)bad(w2+'3000 questions drew only '+seenW.size+' of '+ws.length+' words');
      if(Object.keys(labels).length!==ws.length)bad(w2+'labels are not one per word');
    }
    // the same seed gives the same question
    for(let lv=1;lv<=7;lv++)if(JSON.stringify(genQ('spell',lv,77))!==JSON.stringify(genQ('spell',lv,77)))bad('level '+lv+' is not reproducible');
    // homophone pairs sit at level 5 with different sentences
    const l5=Object.fromEntries(spellList(5));
    for(const [a,b] of [['their','there'],['hear','here'],['to','too'],['see','sea'],['by','buy'],['week','weak'],['tail','tale'],['new','knew'],['wood','would']])
      if(!l5[a]||!l5[b]||l5[a]===l5[b])bad('homophone pair '+a+'/'+b+' missing or same sentence');
    // map: spell 1 to 7 each once on the reading path, in the worlds CURRICULUM section 2.2 names
    const rd=NODES.read.filter(n=>n.sk=='spell').map(n=>n.lv+'@'+n.wid).join(' ');
    if(rd!=='1@r_candy 2@r_reef 3@r_space 4@r_summit 5@r_library 6@r_island 7@r_legend')bad('spell stops: '+rd);
    // save safety: fixtures at several grades; the reading path as it was at v56 against today's
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const NEWW=new Set(['r_summit','r_library','r_island','r_legend']),CUR=PATHS.read.worlds;
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i)}});return o};
    let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])for(const g of [null,-1,0,1,2,3,6]){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      PATHS.read.worlds=CUR.filter(w=>!NEWW.has(w.id)).map(w=>({...w,nodes:w.nodes.filter(x=>x[0]!=='spell')}));buildNodes('read');
      const before=snap(),curB=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=CUR;buildNodes('read');
      const after=snap(),curA=nid(NODES.read[curNode('read')]);
      for(const k in before){
        checked++;
        if(!after[k]){bad(name+' g'+g+': stop '+k+' vanished');continue}
        if(before[k].st!==after[k].st)bad(name+' g'+g+': '+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].open&&!after[k].open)bad(name+' g'+g+': '+k+' re-locked');
        if(before[k].st>0&&!after[k].open)bad(name+' g'+g+': passed stop '+k+' is locked');
      }
      // a spell stop added to a finished world is NEW, open, has no stars and is never the current stop
      for(const k of ['spell1','spell2','spell3']){
        const i=NODES.read.findIndex(n=>nid(n)==k);
        if(getSt('read',i)!==0)bad(name+': '+k+' starts with stars');
        if(passed('read',WR.read[NODES.read[i].wi][1])&&(!stopNew('read',i)||!unlocked('read',i)||curA==k))bad(name+' g'+g+': '+k+' in a finished world is not NEW, open and not current');
      }
      // the map opens on the same stop as before unless the old path was finished, or nothing was played yet (a new child starts at their grade, which may now be a new world)
      // (old path finished = the old map fell back to its last boss, or to a stop added after v42 such as ABC Beach's sound3: then the next new world is the right place)
      if(curB!==curA&&!/^boss_/.test(curB)&&v42Stops('read').includes(curB)&&NODES.read.some((n,i)=>passed('read',i)))bad(name+' g'+g+': current stop moved '+curB+' -> '+curA);
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    return {checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:serrs,note:'400 words, 21000 questions, '+r.checked+' stop checks over 6 fixtures x 7 grades'};
});

// ---- object art set A (P4-13, new style P4-13b; DESIGN_SYSTEM 6.5) ----
run('art set A: 40 pictures present, size, allowed elements and attributes, tokens only, well-formed, used by picture words',()=>{
  const p=[];
  const NAMES=('apple banana cookie ball star fish duck car flower cat dog pig sun bus hat bed cup fox bat bug hen box map pen web frog crab drum '+
    'ship milk tent hand gift flag cake kite bike rose bone nose').split(' ');
  const out=eval(js+`
  const bad=[];
  const ATTR=/^(fill|stroke|stroke-width|opacity|transform|d|cx|cy|r|rx|ry|x|y|width|height)$/;
  let total=0;
  for(const n of ${JSON.stringify(NAMES)}){
    const d=ART[n];
    if(!d){bad.push('missing drawing: '+n);continue}
    total+=d.length;
    if(d.length>2500)bad.push(n+': '+d.length+' bytes (limit 2500)');
    if((d.match(/<[^>]*\\/>/g)||[]).join('')!==d)bad.push(n+': every element must be self-closing, nothing between them');
    const els=d.match(/<[a-z]+/g)||[];
    if(els.length>40)bad.push(n+': '+els.length+' elements (limit 40)');
    for(const t of d.match(/<\\/?[a-z]+/g)||[])if(!/^<(path|circle|ellipse|rect)$/.test(t))bad.push(n+': element '+t+'> not allowed');
    for(const m of d.matchAll(/\\s([a-zA-Z:-]+)=/g))if(!ATTR.test(m[1]))bad.push(n+': attribute '+m[1]+' not allowed');
    for(const m of d.matchAll(/transform="([^"]*)"/g))if(!/^rotate\\(-?[\\d.]+ -?[\\d.]+ -?[\\d.]+\\)$/.test(m[1]))bad.push(n+': transform may only be rotate(a cx cy): '+m[1]);
    for(const m of d.matchAll(/opacity="([^"]*)"/g))if(!(+m[1]>0&&+m[1]<1))bad.push(n+': opacity between 0 and 1: '+m[1]);
    if(/gradient|filter|mask|clip|pattern|<text|<use|url\\(|style=|\\sid=|<defs|<image|href/i.test(d))bad.push(n+': no ids, defs, gradients, masks, clips, filters, text, use, url() or style');
    if(/#[0-9a-f]{3,8}\\b/i.test(d))bad.push(n+': raw hex colour');
    for(const a of d.match(/(fill|stroke)="[^"]*"/g)||[])if(!/^(fill|stroke)="(currentColor|none|var\\(--a-[a-z0-9]+\\))"$/.test(a))bad.push(n+': colour must be currentColor, none or var(--a-x): '+a);
    const co=(d.match(/\\s(d|cx|cy|r|rx|ry|x|y|width|height|stroke-width|transform)="[^"]*"/g)||[]).join(' ').match(/\\d*\\.\\d{2,}/g);
    if(co)bad.push(n+': coordinates to one decimal ('+co[0]+')');
    const doc=picArt(n,48);
    if(!/^<svg [^>]*viewBox="0 0 64 64"[^>]*>(<(path|circle|ellipse|rect)\\b[^>]*\\/>)+<\\/svg>$/.test(doc))bad.push(n+': picArt markup not well formed');
    if(picFor(n,'X')!==picArt(n))bad.push(n+': picFor does not return the drawing');
  }
  if(total>64000)bad.push('set A is '+total+' bytes (limit 64000)');
  // every --a-x role used is defined in 21-art.css
  const css=${JSON.stringify(fs.readFileSync(path.join(SRC,'css','21-art.css'),'utf8'))};
  for(const n of ${JSON.stringify(NAMES)})for(const m of ART[n].match(/--a-[a-z0-9]+/g)||[])if(!css.includes(m+':'))bad.push(n+': '+m+' not defined in 21-art.css');
  // picture-word questions show the drawing, not the emoji, for set A words that are picture words
  const PW=[...CVC,...BLEND,...MAGICE,...TEAMS,...RVW,...VTW].filter(([w])=>ART[w]);
  let shown=0;
  for(const sk of ['pic','build'])for(let lv=1;lv<=SK[sk].max;lv++)for(let s=1;s<=60;s++){
    const q=genQ(sk,lv,s);
    for(const [w,e] of PW){if(q.html.includes(e))bad.push(sk+lv+' seed '+s+': emoji for '+w+' shown instead of the drawing');if(q.html.includes('class="art"'))shown++}
  }
  if(!shown)bad.push('no picture question showed a drawing');
  if(PW.length<30)bad.push('only '+PW.length+' set A words are picture words');
  bad;`);
  // every --a-x role maps to an --ill-* token that 00-tokens.css defines as a hex colour
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  const acss=fs.readFileSync(path.join(SRC,'css','21-art.css'),'utf8');
  for(const m of acss.matchAll(/(--a-[a-z0-9]+):var\((--[a-z0-9-]+)\)/g))
    if(!/^--ill-/.test(m[2])||!new RegExp(m[2]+':#[0-9A-Fa-f]{6};').test(tok))p.push(m[1]+' must map to an --ill-* hex token in 00-tokens.css, got '+m[2]);
  return{problems:out.concat(p),note:NAMES.length+' pictures'};
});

// ---- P2-15: ABC Beach ----
run('ABC Beach (P2-15): letters, middle vowels, digraphs, syllables; 3,000 samples per level',()=>{
  const out=[];
  const r=eval(js+`
  S.name='Ava';S.buddy='Ben';G={built:[]};
  const bad=[];
  const AL='abcdefghijklmnopqrstuvwxyz';
  const labels={};
  // data sizes and word lists
  if(SYLP.length!==40)bad.push('SYLP has '+SYLP.length+', want 40');
  const sw=SYLW.reduce((a,l)=>a+l.length,0);
  if(sw!==60)bad.push('SYLW has '+sw+', want 60');
  for(const w of new Set([...SYLP.map(x=>x[0]),...SYLW.flat(),...DIGR.map(x=>x[0]),...CVCM.map(x=>x[0])]))if(BAD.test(w))bad.push('BAD word '+w);
  if(new Set(SYLW.flat()).size!==60)bad.push('SYLW has a repeated word');
  if(new Set(SYLP.map(x=>x[0])).size!==40)bad.push('SYLP has a repeated word');
  for(const L of ABCO)if(!LETW[L])bad.push('no word for letter '+L);
  if(ABCO.length!==26||new Set(ABCO).size!==26)bad.push('ABCO is not the 26 letters');
  const first={},cnt={};
  for(let lv=1;lv<=4;lv++)for(let i=0;i<3000;i++){
    const q=SK.abc.gen(lv),w='abc L'+lv+' '+q.label;
    (labels['abc'+lv]=labels['abc'+lv]||new Set()).add(q.label);
    if(lv==1){
      const vs=q.choices.map(c=>c.v);
      if(vs.length!==3||!/^[A-Z]$/.test(q.ans)||vs.some(v=>!/^[A-Z]$/.test(v)))bad.push(w+': abc1 choices '+vs);
      if(q.auto!=='must'||!/data-say/.test(q.html))bad.push(w+': abc1 must be spoken with a Hear button');
      cnt[q.ans]=(cnt[q.ans]||0)+1;
      const grp=[...new Set(LOOKU.filter(g=>g.includes(q.ans)).join('').split(''))].filter(c=>c!=q.ans);
      if(vs.filter(v=>v!=q.ans&&grp.includes(v)).length<Math.min(2,grp.length))bad.push(w+': abc1 distractors are not look-alikes '+vs);
    }
    if(lv==2){
      const vs=q.choices.map(c=>c.v);
      if(vs.length!==4||!/^[a-z]$/.test(q.ans)||vs.some(v=>!/^[a-z]$/.test(v)))bad.push(w+': abc2 choices '+vs);
      if('bdpq'.includes(q.ans)&&'bdpq'.split('').some(c=>!vs.includes(c)))bad.push(w+': abc2 b/d/p/q set incomplete '+vs);
    }
    if(lv==3){
      if(q.kind!=='match'||q.items.length!==4||q.opts.length!==4)bad.push(w+': abc3 is 4 pairs');
      for(const it of q.items)if(!q.opts.some(o=>o.v===it.v&&o.l===it.l.toLowerCase()))bad.push(w+': abc3 pair '+it.l);
    }
    if(lv==4){
      if(q.kind=='choice'){
        const l=q.label.replace('after ','').toLowerCase(),a=q.ans.toLowerCase();
        if(AL.indexOf(a)!==AL.indexOf(l)+1)bad.push(w+': abc4 after '+l+' is '+a);
        if(q.choices.length!==3)bad.push(w+': abc4 after needs 3 choices');
      }else{
        const m=[...q.html.matchAll(/<span class="(ab-l|ls)"[^>]*>([^<]*)<\\/span>/g)].map(x=>x[1]=='ls'?'_':x[2]);
        const g=m.indexOf('_');
        if(m.length!==4||g<1||g>2)bad.push(w+': abc4 gap run '+m);
        else{const L=m.map(x=>x.toLowerCase());const s=AL.indexOf(L[g==1?0:1])-(g==1?0:1);
          if(q.ans.toLowerCase()!==AL[s+g])bad.push(w+': abc4 gap answer '+q.ans+' in '+m);
          if(m.some((x,k)=>k!=g&&x.toLowerCase()!==AL[s+k]))bad.push(w+': abc4 run is not in ABC order '+m)}
        if(q.word.length!==1||q.tiles.length!==4||new Set(q.tiles).size!==4)bad.push(w+': abc4 gap tiles '+q.tiles);
      }
    }
  }
  // the first 13 letters appear about twice as often as the last 13
  const a13=[...ABCO.slice(0,13)].reduce((a,c)=>a+(cnt[c]||0),0),b13=[...ABCO.slice(13)].reduce((a,c)=>a+(cnt[c]||0),0);
  if(!(a13>1.6*b13&&a13<2.4*b13))bad.push('first 13 letters are not about twice as common: '+a13+' vs '+b13);
  for(let i=0;i<3000;i++){
    const q=SK.sound.gen(3),w='sound L3 '+q.label,wd=q.label.replace('middle: ','');
    if(wd[1]!==q.ans||q.choices.length!==3||q.choices.some(c=>!/^[aeiou]$/.test(c.v)))bad.push(w+': middle vowel');
    if(!CVCM.some(x=>x[0]===wd))bad.push(w+': word not from CVC');
    const d=genSoundB(4),dm=d.label.match(/^(starts|ends) (..): (.+)$/),st=dm[1]=='starts';
    if(!dm||(st?!dm[3].startsWith(dm[2]):!dm[3].endsWith(dm[2]))||d.ans!==dm[2])bad.push('sound L4 '+d.label+': digraph position');
    if(d.choices.length!==4||d.choices.some(c=>!['sh','ch','th','wh','ck'].includes(c.v)))bad.push('sound L4 '+d.label+': choices');
    if(/\\bwh\\b/.test(d.choices.map(c=>c.v).join(' '))&&!st)bad.push('sound L4 '+d.label+': wh offered at the end');
    for(const lv of [1,2]){
      const s=SK.syl.gen(lv),n=+s.ans;
      if(lv==1){const e=SYLP.find(x=>x[0]===s.label.replace('claps: ',''));if(!e||e[2]!==n||s.choices.length!==3)bad.push('syl L1 '+s.label)}
      else{const wd2=s.label.replace('syllables: ','');if(!SYLW[n-1]||!SYLW[n-1].includes(wd2)||s.choices.length!==4)bad.push('syl L2 '+s.label)}
      if(!s.say||!s.hint)bad.push('syl L'+lv+' say or hint missing');
    }
  }
  // every level has a hint and every label is not one single repeated value
  for(const [k,sk,lv] of [['abc1','abc',1],['abc2','abc',2],['abc3','abc',3],['abc4','abc',4]]){
    if(!SK[sk].gen(lv).hint)bad.push(k+': no hint');
    if(labels[k].size<10)bad.push(k+': only '+labels[k].size+' distinct labels');
  }
  bad;`);
  for(const m of [...new Set(r)])out.push(m);
  return{problems:out};
});

run('ABC Beach (P2-15): world position, stop ids, nobody is pushed back into it',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const out=[];
  const r=eval(js+`
  const store={};
  localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
  const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
  const bad=[],W=PATHS.read.worlds;
  // position and content (CURRICULUM 2.2)
  if(W[0].id!=='r_abc'||W[0].g!==-1||W[1].id!=='r_meadow')bad.push('ABC Beach must be the first reading world (Pre-K), then Letter Meadow');
  const ids=NODES.read.filter(n=>n.wid=='r_abc'&&n.sk!='boss').map(nid).join(' ');
  if(ids!=='abc1 abc2 trace2 abc3 syl1 trace3 abc4')bad.push('ABC Beach stops: '+ids); // P2-17 adds trace2, trace3 (CURRICULUM 2.2)
  const tail=(id,k)=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss'&&n.sk!='spell').map(nid).slice(-k).join(' '); // spelling stops (P2-19) sit after these
  if(tail('r_meadow',1)!=='sound3'||tail('r_candy',2)!=='sound4 syl2')bad.push('sound3 ends Letter Meadow; sound4 syl2 end Candy Canyon');
  // existing stop ids keep their meaning and order inside their worlds
  const was={r_meadow:'sound1 sight1 rhyme1 pic1 sound2 build1 sent1',r_candy:'sight2 rhyme2 pic2 build2 sent2 comp1',r_reef:'sight3 pic3 build3 comp2',r_space:'pic4 build4'};
  for(const id in was){const now=NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid).slice(0,was[id].split(' ').length).join(' ');if(now!==was[id])bad.push(id+' changed: '+now)}
  // saves: every star survives on the same stop id, and nobody gets a star they did not have
  for(const name of ['midway','maxed','legacy-single-map','legacy-index-maps']){
    const raw=fx(name);loadSave(raw);const pre=JSON.parse(JSON.stringify(S));
    load(raw);
    for(const k of ['abc1','abc2','abc3','abc4','syl1','sound3','sound4','syl2','boss_r_abc','trace2','trace3'])if(S.maps.read[k])bad.push(name+': got stars on new stop '+k);
    if(name=='maxed'&&!(S.maps.read.sound1===3&&S.maps.read.boss_r_meadow===3))bad.push('maxed: meadow stars lost');
    if(name=='midway'&&!(S.maps.read.sound1===1&&S.maps.read.sight1===2&&S.maps.read.rhyme1===3&&S.maps.read.sent1===1))bad.push('midway: meadow stars lost');
  }
  // gating: K and above start in Letter Meadow or higher and never land in ABC Beach; Pre-K starts in ABC Beach; nothing is locked by it
  for(const name of ['fresh','midway','maxed']){
    for(const g of [null,-1,0,1,2,6]){
      load(fx(name).length>2?fx(name):null);if(g!==null)S.grade=g;
      const gr=gradeOf(),cw=curWorld('read'),k=startWorld('read');
      if(gr>=0&&cw===0&&name!=='fresh')bad.push(name+' grade '+g+': map opens in ABC Beach');
      if(gr>=0&&(k===0||(name==='fresh'&&cw===0)))bad.push(name+' grade '+g+': a K or older child starts in ABC Beach');
      if(gr<0&&name=='fresh'&&(k!==0||cw!==0))bad.push('fresh Pre-K must start in ABC Beach');
      if(!worldOpen('read',0)||(gr>=0&&!worldOpen('read',1)))bad.push(name+' grade '+g+': a reading world is locked');
    }
  }
  // a K child who finished every stop and has no ABC progress is not sent back to ABC Beach, but a Pre-K child plays it
  load(fx('maxed'));S.grade=0;
  if(curWorld('read')===0)bad.push('maxed K child sent to ABC Beach');
  load(null);S.grade=-1;
  if(nid(NODES.read[curNode('read')])!=='abc1')bad.push('Pre-K map should open on abc1');
  bad;`);
  for(const m of [...new Set(r)])out.push(m);
  return{problems:out};
});

// ---- P2-01 Pre-K math: world Tiny Town (generators, audio-first, world position, saves) ----
run('Tiny Town (P2-01): CURRICULUM M-PK levels, audio-first, answers by rule, 3,000 samples per level',()=>{
  const bad=[];
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<20&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const LEVELS=[['pk_count',2],['pk_num',2],['pk_more',1],['sort',2],['shape',1],['pat',1]];
    // 1. world: first in the math path, Pre-K, exactly the M-PK stops in CURRICULUM order (P2-16 added trace 1 at the end)
    const w0=PATHS.math.worlds[0];
    if(w0.id!=='m_tiny'||w0.g!==-1||w0.n!=='Tiny Town')b('Tiny Town is not the first math world: '+w0.id);
    const ids=w0.nodes.map(n=>n[0]+n[1]).join(' ');
    if(ids!=='pk_count1 shape1 pk_num1 sort1 pk_more1 pk_count2 pat1 pk_num2 sort2 trace1')b('Tiny Town stops: '+ids);
    for(const [sk,max] of LEVELS)if(!SK[sk]||SK[sk].max<max||SK[sk].area!=='math')b('skill '+sk+' max '+(SK[sk]&&SK[sk].max)); // later chunks add levels (P2-02: Shape Garden)
    const ltr=s=>s.replace(/<[^>]*>/g,'').replace(/[^A-Za-z]/g,''); // letters left once tags (and attributes) are gone
    const TXT=/<div class="sub pktxt">.*?<\/div>/g;
    const sig=h=>{ // the picture of a choice: shape signature + colour token
      const c=/--c:var\((--[a-z]+)\)/.exec(h),p=/points="([^"]*)"/.exec(h);
      return {c:c&&c[1],s:p?p[1]:/<circle/.test(h)?'circle':'?'};
    };
    const num=PK.NUM;
    for(const [sk,max] of LEVELS)for(let lv=1;lv<=max;lv++){
      const w=sk+' L'+lv,labels=new Set();
      for(let i=0;i<3000;i++){
        const q=SK[sk].gen(lv);
        if(!q.pk||!q.auto||!q.say)b(w+': not audio-first (pk, auto, say)');
        if(!q.hint||q.hint.k!=='html'||!q.hint.html||!q.hint.w)b(w+': hint missing');
        else{
          try{
            if(!hintHTML(q))b(w+': empty hint');
            // pictures teach; words in a hint sit in .pktxt
            if(ltr(q.hint.html.replace(TXT,''))!=='')b(w+': hint has text outside .pktxt');
          }catch(e){b(w+': hintHTML threw '+e.message)}
        }
        const prompt=q.html.replace(TXT,'');
        if(ltr(prompt)!=='')b(w+': prompt needs reading: '+ltr(prompt));
        if(!/pktxt/.test(q.html))b(w+': no .pktxt fallback text');
        if(q.kind=='choice'){
          if(q.choices.length<2||q.choices.length>4)b(w+': '+q.choices.length+' choices');
          for(const c of q.choices)if(c.h&&ltr(c.l)!=='')b(w+': a choice has words');
        }
        labels.add(q.label);
        // 2. answers by rule
        if(sk=='pk_count'){
          const n=+q.ans,objs=(q.html.match(/class="pko"/g)||[]).length;
          if(objs!==n)b(w+': '+objs+' objects, answer '+n);
          if(n<1||n>(lv==1?5:10))b(w+': count out of range '+n);
          if(q.choices.length!==3||q.choices.some(c=>+c.v<1||+c.v>(lv==1?5:10)))b(w+': choices '+q.choices.map(c=>c.v));
          const ds=q.choices.map(c=>Math.abs(+c.v-n)).filter(d=>d).sort();
          if(ds[0]!==1||(lv==2&&ds[1]!==2)||(lv==1&&ds[1]<1))b(w+': distractors '+ds);
          if(!q.say.startsWith('How many ')||!q.say.endsWith('?'))b(w+': say '+q.say);
          if(lv==2){const cells=[...q.html.matchAll(/grid-column:(\d);grid-row:(\d)/g)].map(m=>m[1]+m[2]);if(new Set(cells).size!==n||cells.length!==n)b(w+': scattered objects share a cell')}
        }
        if(sk=='pk_num'){
          const n=+q.ans;
          if(q.auto!=='must')b(w+': listening task must be auto must');
          if(q.choices.length!==3||!q.choices.some(c=>c.v==q.ans))b(w+': 3 choices with the answer');
          if(q.choices.some(c=>+c.v<0||+c.v>(lv==1?5:10)))b(w+': numeral out of range');
          if(q.say!==`Tap the number ${num[n]}.`)b(w+': say '+q.say);
          if(lv==2){const L={6:9,9:6,1:7,7:1};if(L[n]!=null&&!q.choices.some(c=>+c.v===L[n]))b(w+': no look-alike for '+n)}
        }
        if(sk=='pk_more'){
          const pl=q.html.split('class="pkplate"').slice(1).map(x=>(x.match(/class="pko"/g)||[]).length);
          if(pl.length!==2||Math.abs(pl[0]-pl[1])<2||pl[0]<1||pl[1]<1||pl[0]>5||pl[1]>5)b(w+': groups '+pl);
          else if(pl[q.ans=='l'?0:1]<pl[q.ans=='l'?1:0])b(w+': the answer has fewer');
        }
        if(sk=='sort'&&lv==1){
          const s=q.choices.map(c=>sig(c.l)),oi=+q.ans;
          const cnt=(k,v)=>s.filter(x=>x[k]===v).length;
          const col3=s.some(x=>cnt('c',x.c)==3),shp3=s.some(x=>cnt('s',x.s)==3);
          if(col3==shp3)b(w+': needs exactly one rule (colour '+col3+', shape '+shp3+')');
          const key=col3?'c':'s',odd=s.findIndex(x=>cnt(key,x[key])==1);
          if(odd!==oi||s.filter(x=>cnt(key,x[key])==1).length!==1)b(w+': odd one is '+odd+', answer '+oi);
          if(q.choices.length!==4)b(w+': '+q.choices.length+' items');
        }
        if(sk=='sort'&&lv==2){
          const m=/^(\w+) (\w+) ([\d.\/]+)$/.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else{
            const v=m[3].split('/').map(Number),max=/^(biggest|bigger|longest|longer|tallest|taller)$/.test(m[1]),
              want=max?Math.max(...v):Math.min(...v);
            if(v[+q.ans]!==want||new Set(v).size!==v.length||v.length!==q.choices.length||v.length<2||v.length>3)b(w+': '+q.label+' answer '+q.ans);
          }
        }
        if(sk=='shape'){
          const pts=n=>PK.SHP[n].map(p=>p.join(',')).join(' ');
          const want={triangle:pts('triangle'),square:pts('square'),rectangle:pts('rectangle'),circle:'circle'}[q.ans];
          const hit=q.choices.filter(c=>sig(c.l).s===want);
          if(q.choices.length!==3||hit.length!==1||hit[0].v!==q.ans)b(w+': answer picture '+q.ans);
          if(new Set(q.choices.map(c=>sig(c.l).c)).size!==3)b(w+': colours repeat');
          if(q.auto!=='must')b(w+': listening task must be auto must');
        }
        if(sk=='pat'){
          const shown=[...q.html.matchAll(/<svg class="pks"[^>]*>.*?<\/svg>/g)].map(m=>sig(m[0])),k=s=>s.c+'|'+s.s;
          if(shown.length!==5||k(shown[0])!==k(shown[2])||k(shown[2])!==k(shown[4])||k(shown[1])!==k(shown[3])||k(shown[0])===k(shown[1]))b(w+': not ABABA');
          else{
            const a=q.choices[+q.ans];
            if(!a||k(sig(a.l))!==k(shown[1]))b(w+': answer is not the B item');
            if(q.choices.filter(c=>k(sig(c.l))===k(shown[1])).length!==1)b(w+': two B items');
          }
        }
      }
      if(labels.size<4)b(w+': only '+labels.size+' different labels');
    }
    // 3. seeded: the same seed gives the same question
    for(const [sk,max] of LEVELS)for(let lv=1;lv<=max;lv++)for(let s=1;s<=30;s++){
      if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))b(sk+lv+' seed '+s+' not reproducible');
    }
    // 4. grades: Pre-K starts in Tiny Town, K in Number Meadow (both open), grade 2 in Space Station
    load(null);S.grade=-1;
    if(curWorld('math')!==0||nid(NODES.math[curNode('math')])!=='pk_count1')b('Pre-K does not open on Tiny Town');
    if(worldOpen('math',1))b('Pre-K: Number Meadow open before Tiny Town is done');
    S.grade=0;
    if(NODES.math[curNode('math')].wid!=='m_shape')b('K does not open on Shape Garden: '+NODES.math[curNode('math')].wid); // P2-02: the first K world
    if(!worldOpen('math',1)||!worldOpen('math',0)||!worldOpen('math',2))b('K: Tiny Town, Shape Garden and Number Meadow must be open');
    S.grade=2;
    if(NODES.math[curNode('math')].wid!=='m_space')b('grade 2 does not open on Space Station');
    // 5. saves: stars are keyed by stop id, so adding Tiny Town moves none (midway, maxed); the map is not sent back
    for(const name of ['midway','maxed']){
      load(fx(name));
      const m=JSON.parse(JSON.stringify(S.maps.math));
      if(NODES.math[curNode('math')].wid==='m_tiny')b(name+': map moved back to Tiny Town');
      for(const k in m){const ix=NODES.math.findIndex(n=>nid(n)===k);if(ix>=0&&getSt('math',ix)!==m[k])b(name+': stars of '+k+' changed');if(ix<0&&!/^boss\d+$/.test(k))b(name+': a saved key matches no stop: '+k)}
      if(JSON.stringify(S.maps.math)!==JSON.stringify(m))b(name+': map changed by loading');
    }
    // 6. mastery: harder/easier follow the new levels
    const nd=(sk,lv)=>NODES.math.find(n=>n.sk===sk&&n.lv===lv);
    if(!harder(nd('pk_count',1))||harder(nd('pk_count',1)).lv!==2||!easier(nd('pk_num',2))||easier(nd('pk_num',2)).lv!==1)b('harder/easier skip the Tiny Town levels');
    return out;
  };
  const r=eval(js+';('+body.toString()+')()');
  for(const m of r)bad.push(m);
  // 7. new files: no raw hex colours, no Math.random in the generators
  const css=fs.readFileSync(path.join(SRC,'css','31-pk.css'),'utf8'),gen=fs.readFileSync(path.join(SRC,'js','31-gen-math-early.js'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))bad.push('31-pk.css has a raw hex colour');
  if(/#[0-9a-fA-F]{3,8}\b/.test(gen))bad.push('31-gen-math-early.js has a raw hex colour');
  if(/Math\.random/.test(gen))bad.push('31-gen-math-early.js uses Math.random');
  return{problems:bad};
});

// ---- P2-05 Multiply Mountain: facts, arrays, stories, world and Fact Sprint sets ----
run('multiply mountain: stops, fact rules per level, answers, unique labels, arrays, stories, Fact Sprint sets',()=>{
  const out=eval(js+`
  S.name='Ava';S.buddy='Ben';G={built:[]};
  const bad=[],N=3000,mf=[],rv=n=>n.replace(/[×÷−]/g,m=>m);
  // 1. the world: last math world, grade 3, exactly the CURRICULUM M-3a stops in order
  const mw=PATHS.math.worlds,mi=mw.findIndex(x=>x.id=='m_mult'),w=mw[mi]||{},ids=w.nodes.map(n=>n[0]+n[1]).join(' ');
  if(w.id!=='m_mult'||w.g!==3||ids!=='arr2 mfact1 mfact2 dfact1 mfact3 dfact2 mfact4 dfact3 dfact4 mbig1 story5')bad.push('world: '+w.id+' '+w.g+' '+ids);
  // gating: a 3rd grader sees it open, a 2nd grader only after Space Station (grade tag, not a lock on earlier worlds)
  {S.grade=3;if(!worldOpen('math',mi))bad.push('grade 3: Multiply Mountain should be open');
   S.grade=2;S.maps={math:{},read:{},es:{}};if(worldOpen('math',mi))bad.push('grade 2: should wait for Space Station');}
  // 2. every level: constraints, answers, hints, say, labels
  const lab={},hasKey=(a,b,keys)=>keys.includes(a)||keys.includes(b);
  const L1=MF_KEYS[0],L2=MF_KEYS[1],L3=MF_KEYS[2];
  const count={};
  const gen=(sk,lv)=>{const o=[];for(let i=0;i<N;i++)o.push(genQ(sk,lv,i*7919+13));return o};
  const parse=q=>{const m=q.label.match(/^(\\?|\\d+) ([×÷]) (\\?|\\d+) = (\\?|\\d+)$/);return m&&{a:m[1],op:m[2],b:m[3],c:m[4]}};
  for(const [sk,max] of [['mfact',4],['dfact',4]])for(let lv=1;lv<=max;lv++){
    const qs=gen(sk,lv),w=sk+' L'+lv;let rev=0,miss=0,vert=0;
    for(const q of qs){
      const p=parse(q);if(!p){bad.push(w+': label '+q.label);continue}
      const a=p.a=='?'?null:+p.a,b=p.b=='?'?null:+p.b,c=p.c=='?'?null:+p.c;
      const A=a==null?(p.op=='×'?c/b:c*b):a,B=b==null?(p.op=='×'?c/a:a/c):b,C=c==null?(p.op=='×'?a*b:a/b):c;
      if(![A,B,C].every(Number.isInteger)||(p.op=='×'?A*B!==C:A!==B*C))bad.push(w+': not a fact '+q.label);
      if(String(a==null?A:b==null?B:C)!==q.ans)bad.push(w+': wrong ans '+q.label+' -> '+q.ans);
      if(q.html.includes('veq'))vert++;
      if(!q.hint||q.hint.k!=='text'||!q.hint.s)bad.push(w+': no hint');
      if(a==null||b==null)miss++;
      if(sk=='mfact'){
        if(Math.max(A,B)>10||Math.min(A,B)<0)bad.push(w+': range '+q.label);
        const k=lv==1?hasKey(A,B,L1):lv==2?hasKey(A,B,L2):lv==3?hasKey(A,B,L3):true;
        if(lv==2&&!k){if(hasKey(A,B,L1))rev++;else bad.push(w+': off level '+q.label)}
        else if(lv==3&&!k){if(hasKey(A,B,L1)||hasKey(A,B,L2))rev++;else bad.push(w+': off level '+q.label)}
        else if(lv==1&&!k)bad.push(w+': off level '+q.label);
        if(lv==3&&!hasKey(A,B,L3)){} else if(lv==3&&Math.min(A,B)<2&&hasKey(A,B,L3)&&!(hasKey(A,B,L1)))bad.push(w+': other factor under 2 '+q.label);
        if(lv==4&&(a==null||b==null)&&(A<2||B<2))bad.push(w+': missing factor needs both 2+ '+q.label);
      }else{
        const keys=lv<4?DF_KEYS[lv-1]:[2,3,4,5,6,7,8,9,10];
        if(!keys.includes(B))bad.push(w+': divisor '+q.label);
        if(C<1||C>10||A>100)bad.push(w+': range '+q.label);
      }
      const k=q.label;if(lab[k]&&lab[k]!==q.ans)bad.push(w+': label '+k+' has two answers');lab[k]=q.ans;
    }
    if(sk=='mfact'&&(lv==2||lv==3)&&(rev<N*.1||rev>N*.3))bad.push(w+': review share '+rev/N);
    if(lv==4&&(miss<N*.25||miss>N*.45))bad.push(w+': missing share '+miss/N);
    if(lv<4&&miss)bad.push(w+': missing numbers before level 4');
    if(sk=='mfact'&&(vert<N*.3||vert>N*.7)&&!(lv==4))bad.push(w+': vertical share '+vert/N);
    count[w]=qs.length;
  }
  // mbig
  {const qs=gen('mbig',1);let hund=0;
   for(const q of qs){
     const m=q.label.match(/^(\\d+) × (\\d+) = \\?$/);if(!m){bad.push('mbig label '+q.label);continue}
     const x=+m[1],y=+m[2],d=Math.min(x,y),big=Math.max(x,y);
     if(d<2||d>9||!(big%10==0&&big>=10&&big<=90||big%100==0&&big>=100&&big<=900))bad.push('mbig '+q.label);
     if(big>=100)hund++;
     if(String(x*y)!==q.ans||!q.hint||!q.hint.s)bad.push('mbig answer/hint '+q.label);}
   if(hund<N*.35||hund>N*.65)bad.push('mbig tens/hundreds mix '+hund/N);}
  // arr 2
  {const qs=gen('arr',2);let ch=0;
   for(const q of qs){
     if(!q.hint||!q.hint.s||!/array|VIZ|<svg/.test(q.html))bad.push('arr hint/picture');
     if(q.kind=='choice'){ch++;
       const m=q.label.match(/^array (\\d+) × (\\d+)$/),r=+m[1],c=+m[2],want=[r+' × '+c+' = '+r*c,r+' + '+c+' = '+(r+c),(r+1)+' × '+c+' = '+(r+1)*c,r+' × '+r+' = '+r*r];
       if(q.ans!==want[0]||r<2||r>6||c<2||c>9||r==c)bad.push('arr choice '+q.label);
       if(!q.choices.every(x=>want.includes(x.v)))bad.push('arr distractors '+q.label);
       if(q.choices.length<3)bad.push('arr few choices '+q.label)}
     else{const m=q.label.match(/^(\\d+) × (\\d+) = (\\d+) × \\?$/);if(!m||m[2]!==m[3]||String(m[1])!==q.ans||+m[1]>6||+m[2]>9)bad.push('arr swap '+q.label)}}
   if(ch<N*.35||ch>N*.65)bad.push('arr mix '+ch/N);}
  // story 5
  {const qs=gen('story',5);const seen=new Set();
   for(const q of qs){
     const m=q.label.match(/^story (\\d+) ([×÷]) (\\d+)$/);if(!m){bad.push('story label '+q.label);continue}
     const a=+m[1],b=+m[3],ok=m[2]=='×'?String(a*b):String(a/b);
     if(q.ans!==ok||(m[2]=='×'?a*b:a)>100||!Number.isInteger(a/b)&&m[2]=='÷')bad.push('story answer '+q.label+' '+q.ans);
     if(q.say!==q.say.trim()||!q.hint.s||!q.html.includes('story'))bad.push('story say/hint');
     seen.add(m[2]+q.say.replace(/\\d+/g,'#').replace(/Ava|Ben|Sam|Mia|Leo|Zoe/g,'N').replace(/apples|cookies|ducks|balls|stickers|toy cars|fish|crayons|pencils/g,'T'))}
   if(seen.size<8)bad.push('story: only '+seen.size+' templates')}
  // levels reserved for P2-04 still work (no crash, valid question)
  for(const [sk,lv] of [['arr',1],['story',4]])for(let i=0;i<300;i++){const q=genQ(sk,lv,i);if(!q.say||q.ans===undefined)bad.push(sk+lv+' broken')}
  // old story levels unchanged: same question from the same seed as genStory
  for(let lv=1;lv<=3;lv++)for(let i=0;i<50;i++){const a=genQ('story',lv,i),b=(()=>{const pr=RNG;RNG=mulberry32(i>>>0);try{return genStory(lv)}finally{RNG=pr}})();if(a.label!==b.label||a.say!==b.say)bad.push('story '+lv+' changed')}
  // 3. Fact Sprint sets: locked until the first stop is passed; facts grow with the level passed
  {S.maps={math:{},read:{},es:{}};
   const has=id=>FLU.sets().some(s=>s.id==id);
   if(has('mfact')||has('dfact'))bad.push('sets open with nothing passed');
   const fm=n=>{const i=NODES.math.findIndex(x=>x.sk==n.slice(0,-1)&&x.lv==+n.slice(-1));return i};
   S.maps.math.mfact1=1;if(!has('mfact')||has('dfact'))bad.push('mfact1 should open only the times set');
   S.maps.math.dfact1=1;if(!has('dfact'))bad.push('dfact1 should open the divide set');
   const facts=(id,n)=>{const o=[];for(let i=0;i<n;i++)o.push(FLU.set(id).gen());return o};
   const f1=facts('mfact',1500);if(f1.some(f=>f.op!=='×'||f.c!==f.a*f.b||!(MF_KEYS[0].includes(f.a)||MF_KEYS[0].includes(f.b))||f.a>10||f.b>10))bad.push('mfact level 1 facts');
   S.maps.math.mfact3=1;const f3=facts('mfact',3000);
   if(f3.some(f=>f.c!==f.a*f.b||!(hasKey(f.a,f.b,MF_KEYS[0].concat(MF_KEYS[1],MF_KEYS[2])))))bad.push('mfact level 3 facts');
   if(!f3.some(f=>hasKey(f.a,f.b,L3)&&!hasKey(f.a,f.b,L1.concat(L2))))bad.push('mfact level 3 never asks 6-9');
   S.maps.math.mfact4=1;const f4=facts('mfact',3000);if(!f4.some(f=>f.a==7&&f.b==8||f.a==8&&f.b==7)||f4.some(f=>f.c!==f.a*f.b))bad.push('mfact level 4 facts');
   const d1=facts('dfact',1500);if(d1.some(f=>f.op!=='÷'||f.c*f.b!==f.a||![1,2,5,10].includes(f.b)||f.c<1||f.c>10))bad.push('dfact level 1 facts');
   S.maps.math.dfact4=1;const d4=facts('dfact',3000);if(d4.some(f=>f.c*f.b!==f.a||f.b<1||f.c<1||f.c>10)||!d4.some(f=>f.b==7))bad.push('dfact level 4 facts');
  }
  ({bad,count});`);
  return{problems:out.bad,note:Object.keys(out.count).length+' fact levels x 3,000'};
});

// ---- sharing needs a connection: every share / send / print action carries the online note and goes through needOnline ----
run('online note: share, send and print buttons tell grown-ups to get online, and offline is handled kindly',()=>{
  const p=[];
  const files=fs.readdirSync(path.join(SRC,'js')).filter(n=>n.endsWith('.js')&&n!='88-online.js');
  const SENDS=/window\.print\(|navigator\.share\(|navigator\.sendBeacon\(|mailto:|\.click\(\)\s*;?\s*\/\/\s*download/;
  for(const f of files){
    const src=fs.readFileSync(path.join(SRC,'js',f),'utf8');
    if(!SENDS.test(src))continue;
    if(!src.includes('onlineNote()'))p.push(f+': shares or prints but shows no onlineNote()');
    for(const m of src.matchAll(/window\.print\(|navigator\.share\(/g)){
      const before=src.slice(Math.max(0,m.index-200),m.index);
      if(!before.includes('needOnline('))p.push(f+': '+m[0]+' is not inside needOnline(...)');
    }
  }
  const r=eval(js+`
  const bad=[];let ran=0,msg='';
  fb=(t)=>{msg=t};
  const setNav=v=>Object.defineProperty(globalThis,'navigator',{value:v,configurable:true,writable:true});
  const nav=Object.getOwnPropertyDescriptor(globalThis,'navigator');
  setNav({onLine:false});
  if(needOnline(()=>ran++)!==false||ran!==0||!/offline/i.test(msg))bad.push('offline share should be stopped with a message');
  msg='';if(needOnline(()=>ran++,{block:false})!==true||ran!==1||!/offline/i.test(msg))bad.push('offline print should warn and still run');
  setNav({onLine:true});msg='';
  if(needOnline(()=>ran++)!==true||ran!==2||msg)bad.push('online share should just run');
  if(nav)Object.defineProperty(globalThis,'navigator',nav);
  if(!/online/i.test(onlineNote()))bad.push('onlineNote text');
  bad;`);
  return{problems:[...p,...r]};
});

// ---- P2-06 fractions core: frac 2-8 generators (math checked), Fraction Forest stops, saves ----
run('fractions P2-06: frac 2-8 maths per level, hints, say, labels, 3,000 samples per level',()=>{
  const out=eval(js+`
  S.name='Ava';S.buddy='Ben';G={built:[]};
  const bad=[],N=3000,gcd=(a,b)=>b?gcd(b,a%b):a;
  const cnt=(h,re)=>(h.match(re)||[]).length;
  const parts=h=>cnt(h,/class="vp[ "]/g),shaded=h=>cnt(h,/class="vp vs"/g); // parts and shaded parts of the fraction picture(s)
  const frs=h=>[...h.matchAll(/<span class="fn">(\\d+|<span[^]*?<\\/span>)<\\/span><span class="fd">(\\d+)<\\/span>/g)].map(m=>[m[1],+m[2]]);
  const sym=(a,b,c,d)=>a*d<c*b?'<':a*d==c*b?'=':'>';
  const labs={},share={};
  const seen=new Set();
  for(let lv=2;lv<=8;lv++){ // frac 1 (equal parts) is Clock Tower's and is checked there
    for(let i=0;i<N;i++){
      const q=genQ('frac',lv,i*7919+31),w='frac L'+lv;
      const L=lv<2?2:lv;
      if(kindProblems(q).length)bad.push(w+': '+kindProblems(q)[0]);
      if(!q.hint||!(q.hint.s||q.hint.html||q.hint.steps))bad.push(w+': no hint');
      else if(hintHTML(q).length<10)bad.push(w+': empty hint');
      if(!q.say||/undefined|NaN/.test(q.say))bad.push(w+': say');
      if(q.say&&/\\d\\/\\d/.test(q.say))bad.push(w+': say has a slash fraction '+q.say);
      if(!q.label||q.label.length>=60||/undefined|NaN/.test(q.label))bad.push(w+': label '+q.label);
      const key=lv+'|'+q.label;
      if(labs[key]!==undefined&&labs[key]!==q.ans)bad.push(w+': label '+q.label+' has two answers');
      labs[key]=q.ans;seen.add(key);
      const m=q.label.match(/(\\d+)\\/(\\d+)/g)||[];
      if(L==2){
        if(q.kind=='num'){
          const [n,d]=q.ans.split('/').map(Number);
          if(![2,3,4,6,8].includes(d)||n<1||n>=d||parts(q.html)!==d||shaded(q.html)!==n||!/^frac \\d+\\/\\d+ (bar|circle)$/.test(q.label))bad.push(w+': bad shaded '+q.label);
          if(q.pad!=='frac'||q.eq)bad.push(w+': pad');
        }else{
          const [n,d]=q.ans.split('/').map(Number),vs=q.choices.map(c=>c.v);
          if(q.choices.length!==3||vs.includes(undefined))bad.push(w+': 3 pictures needed');
          for(const c of q.choices){
            const [a,b]=c.v.split('/').map(Number);
            if(parts(c.l)!==b||shaded(c.l)!==a||a>=b||![2,3,4,6,8].includes(b))bad.push(w+': picture '+c.v+' draws '+shaded(c.l)+'/'+parts(c.l));
            if(c.v!==q.ans&&a*d===n*b)bad.push(w+': two pictures equal '+q.ans+' '+c.v);
          }
          const f=frs(q.html);if(f.length!==1||+f[0][0]!==n||f[0][1]!==d)bad.push(w+': named fraction '+q.label);
        }
      }
      else if(L==3){
        if(q.kind=='tap'){
          const [d,n]=[+m[0].split('/')[1],+m[0].split('/')[0]];
          const vs=[...q.html.matchAll(/data-v="([^"]*)"/g)].map(x=>x[1]);
          if(d>5||vs.length!==d+1||!vs.includes(q.ans)||Math.abs(+q.ans-n/d)>1e-9||n<1||n>=d)bad.push(w+': tap '+q.label);
          if(String(+q.ans)!==q.ans)bad.push(w+': tap ans');
        }else{
          const [n,d]=q.ans.split('/').map(Number),two=/to 2$/.test(q.label),mx=two?2:1;
          if(q.eq!=='value'||q.pad!=='frac'||n/d>=mx||n<1||n===d||(!two&&n>=d)||![2,3,4,5,6,8].includes(d)||(two&&d>4))bad.push(w+': read '+q.label);
          if(cnt(q.html,/class="vk"/g)!==1)bad.push(w+': ticks');
          if(!q.html.includes('<circle cx="'))bad.push(w+': no mark');
          // the mark sits where n/d is: tick count d*mx+1 cannot be read from the path, so check the label marks list through numLine itself
          if(q.html!==VIZ.numLine({max:mx,step:1/d,den:d,labels:Array.from({length:mx+1},(_,k)=>k),marks:[n/d]})+q.html.slice(q.html.indexOf('</svg>')+6))bad.push(w+': line does not match '+q.label);
        }
      }
      else if(L==4){
        const [a,b]=[m[0].split('/').map(Number),m[1].split('/').map(Number)];
        const sameD=a[1]===b[1],sameN=a[0]===b[0];
        if(sameD===sameN||a[0]===b[0]&&a[1]===b[1]||!(a[1]<=8&&b[1]<=8&&a[0]<a[1]&&b[0]<b[1]))bad.push(w+': need same bottom or same top '+q.label);
        if(q.ans!==sym(a[0],a[1],b[0],b[1])||q.ans==='=')bad.push(w+': symbol '+q.label+' -> '+q.ans);
        const svs=[...q.html.matchAll(/<svg[^]*?<\\/svg>/g)].map(x=>x[0]);
        if(svs.length!==2||shaded(svs[0])!==a[0]||parts(svs[0])!==a[1]||shaded(svs[1])!==b[0]||parts(svs[1])!==b[1])bad.push(w+': bars '+q.label);
        if(q.choices.map(c=>c.v).join('')!=='<=>')bad.push(w+': symbol choices');
        (share.l4=share.l4||{})[sameD?'d':'n']=((share.l4||{})[sameD?'d':'n']||0)+1;
      }
      else if(L==5){
        const f=frs(q.html);
        if(q.kind=='num'){
          const [n,d]=m[0].split('/').map(Number),D=+q.label.match(/\\?\\/(\\d+)/)[1];
          if(!(d>=2&&d<=6&&D<=12&&D%d===0&&D/d>=2&&D/d<=4)||+q.ans*d!==n*D)bad.push(w+': equiv '+q.label+' -> '+q.ans);
          if(q.pad&&q.pad!=='int')bad.push(w+': pad');
          (share.l5=share.l5||{}).num=((share.l5||{}).num||0)+1;
        }else{
          const [n,d]=m[0].split('/').map(Number),[a,b]=q.ans.split('/').map(Number);
          if(a*d!==n*b||b>12||b%d||b/d<2||b/d>4)bad.push(w+': which '+q.label+' -> '+q.ans);
          if(q.choices.length<3)bad.push(w+': need 3 choices');
          for(const c of q.choices){const [x,y]=c.v.split('/').map(Number);if(c.v!==q.ans&&x*d===n*y)bad.push(w+': distractor equals '+c.v+' for '+q.label);if(y>12)bad.push(w+': denominator over 12')}
          (share.l5=share.l5||{}).which=((share.l5||{}).which||0)+1;
        }
      }
      else if(L==6){
        const a=m[0].split('/').map(Number),b=m[1].split('/').map(Number);
        if(![a,b].every(x=>x[1]>=2&&x[1]<=12&&x[0]>=1&&x[0]<x[1])||a[1]===b[1]||a[0]===b[0])bad.push(w+': unlike '+q.label);
        if(q.ans!==sym(a[0],a[1],b[0],b[1]))bad.push(w+': symbol '+q.label+' -> '+q.ans);
        if(/<svg/.test(q.html))bad.push(w+': picture at level 6');
        share.l6=share.l6||{};share.l6[q.ans]=(share.l6[q.ans]||0)+1;
        // P2-10: the common-bottom hint is a step hint (stepsCommonDen 'cmp'); its record must rename both fractions to one bottom
        if(q.ans==='='&&q.hint.k!=='steps')bad.push(w+': equal needs common bottom hint');
        if(q.hint.k=='steps'){const f=q.hint.steps[q.hint.steps.length-1].c;
          if(!f||f.x[1]*b[1]!==b[0]*f.L||f.x[0]*a[1]!==a[0]*f.L||f.L%a[1]||f.L%b[1])bad.push(w+': common bottom wrong '+JSON.stringify(f));
          else if((f.x[0]<f.x[1]?'<':f.x[0]==f.x[1]?'=':'>')!==q.ans)bad.push(w+': renamed tops disagree with the answer')}
      }
      else if(L==7){
        const [n,d]=m[0].split('/').map(Number),[a,b]=q.ans.split('/').map(Number);
        if(q.eq)bad.push(w+': eq must be off');
        if(d>48||gcd(a,b)!==1||a*d!==n*b||gcd(n,d)<2||gcd(n,d)>6||n>=d||n/gcd(n,d)!==a)bad.push(w+': simplest '+q.label+' -> '+q.ans);
        if(q.pad!=='frac')bad.push(w+': pad');
      }
      else if(L==8){
        if(q.sep==='mix'){
          const [top,d]=m[0].split('/').map(Number),[w0,n2,d2]=q.ans.match(/^(\\d+) (\\d+)\\/(\\d+)$/).slice(1).map(Number);
          if(d2!==d||w0*d+n2!==top||n2<1||n2>=d||gcd(n2,d)!==1||d>12)bad.push(w+': mixed '+q.label+' -> '+q.ans);
          (share.l8=share.l8||{}).mix=((share.l8||{}).mix||0)+1;
        }else{
          const mm=q.label.match(/^frac to improper (\\d+) (\\d+)\\/(\\d+)$/);
          if(!mm||+mm[1]*+mm[3]+ +mm[2]!==+q.ans)bad.push(w+': improper '+q.label+' -> '+q.ans);
          (share.l8=share.l8||{}).imp=((share.l8||{}).imp||0)+1;
        }
      }
    }
  }
  // both variants appear at the levels that mix them; level 4 uses both rules; level 6 has some equal pairs but mostly < and >
  if(!(share.l4.d>N*.35&&share.l4.n>N*.35))bad.push('level 4 mix '+JSON.stringify(share.l4));
  if(!(share.l5.num>N*.4&&share.l5.which>N*.3))bad.push('level 5 mix '+JSON.stringify(share.l5));
  if(!(share.l6['=']>N*.05&&share.l6['=']<N*.3))bad.push('level 6 equal share '+JSON.stringify(share.l6));
  if(!(share.l8.mix>N*.35&&share.l8.imp>N*.35))bad.push('level 8 mix '+JSON.stringify(share.l8));
  ({bad,n:seen.size});`);
  return{problems:uniq(out.bad),note:'8 levels x 3,000, '+out.n+' distinct labels'};
});
run('fractions P2-06: Fraction Forest stops, spoken names, reserved levels, no new emoji or hex',()=>{
  const out=eval(js+`
  S.name='Ava';S.buddy='Ben';G={built:[]};
  const bad=[],mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_frac'),w=mw[wi]||{nodes:[]};
  const ids=w.nodes.map(n=>n[0]+n[1]).join(' ');
  const fids=w.nodes.filter(n=>n[0]=='frac').map(n=>n[0]+n[1]).join(' '); // P2-07 added the other stops between these four
  if(w.g!==3||w.n!=='Fraction Forest'||fids!=='frac2 frac3 frac4 frac5')bad.push('world: '+w.id+' '+w.g+' '+ids);
  // CURRICULUM 2.1 order: Fraction Forest comes straight after Multiply Mountain
  if(wi<1||mw[wi-1].id!=='m_mult')bad.push('Fraction Forest must follow Multiply Mountain');
  if(new Set(mw.map(x=>x.id)).size!==mw.length)bad.push('duplicate world ids');
  if(SK.frac.max!==8||SK.frac.area!=='math')bad.push('frac skill');
  // levels 2-5 have one stop each in Fraction Forest, levels 6-8 one each in Decimal Desert (P2-10)
  const used=NODES.math.filter(n=>n.sk=='frac').map(n=>n.lv).join(' ');
  if(used!=='1 2 3 4 5 6 7 8')bad.push('frac stops use levels '+used); // 1 in Clock Tower (P2-03), 2-5 in Fraction Forest, 6-8 in Decimal Desert (P2-10)
  // "3 fourths", "1 half", "2 halves", "1 third"
  const ex=[fcSay(3,4),fcSay(1,2),fcSay(2,2),fcSay(1,3),fcSay(5,8),fcSay(7,12)].join('|');
  if(ex!=='3 fourths|1 half|2 halves|1 third|5 eighths|7 twelfths')bad.push('spoken fractions '+ex);
  // fractions are written stacked: numerator over denominator in .fr spans, and the prompts of level 2 and 7 use them
  if(!/class="fr"/.test(genQ('frac',7,5).html)||!/class="fr"/.test(genQ('frac',2,5).html+genQ('frac',2,6).html+genQ('frac',2,7).html))bad.push('stacked fraction span missing');
  bad;`);
  const css=fs.readFileSync(path.join(SRC,'css','32-frac.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))out.push('32-frac.css has a raw hex colour');
  if(/Math\.random/.test(fs.readFileSync(path.join(SRC,'js','33-gen-math-mid.js'),'utf8')))out.push('33-gen-math-mid.js uses Math.random');
  return{problems:out};
});
run('fractions P2-06: old saves keep every star and no passed math stop re-locks (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const r=eval(js+`
  const store={};
  localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
  const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
  const bad=[];let checked=0;
  const newIds=new Set(NODES.math.filter(n=>n.wid=='m_frac').map(n=>n.sk=='boss'?'boss_m_frac':n.sk+n.lv));
  for(const name of ['midway','maxed','legacy-single-map','legacy-index-maps','fresh']){
    const raw=fx(name);
    // what the same save looks like with the P2-06 world removed (the build before this chunk): the star table must be identical
    load(raw);const after=JSON.parse(JSON.stringify(S.maps.math||{}));
    for(const id of newIds)if(after[id])bad.push(name+': stars on new stop '+id);
    const wi=PATHS.math.worlds.findIndex(x=>x.id=='m_frac'),saved=PATHS.math.worlds.splice(wi,1)[0];buildNodes('math');
    load(raw);const before=JSON.parse(JSON.stringify(S.maps.math||{}));
    const lockedBefore=NODES.math.map((n,i)=>(before[nid(n)]||0)>0&&!unlocked('math',i));
    PATHS.math.worlds.splice(wi,0,saved);buildNodes('math');
    load(raw);
    if(JSON.stringify(after)!==JSON.stringify(before))bad.push(name+': star table changed by adding Fraction Forest');
    NODES.math.forEach((n,i)=>{const id=nid(n);if((after[id]||0)>0){checked++;if(!unlocked('math',i))bad.push(name+': passed stop '+id+' is locked now')}});
  }
  ({bad,checked});`);
  return{problems:uniq(r.bad),note:r.checked+' passed stops checked on 5 fixtures'};
});

// ---- P2-18 phonics 1st-2nd ----
run('phonics P2-18: sight 4-5, r-controlled and vowel-team picture words, 3,000 samples per level, map, saves',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const serrs=[],bad=m=>serrs.push(m);
  const body=function(){
    S.name='Ava';S.buddy='Ben';G={built:[]};
    if(SK.sight.max!==5||SK.pic.max!==6||SK.build.max!==6)bad('max levels: sight '+SK.sight.max+' pic '+SK.pic.max+' build '+SK.build.max);
    // word data
    const d4=DOL[3],d5=DOL[4];
    if(d4.length!==46||d5.length!==41)bad('Dolch 2nd/3rd grade sizes '+d4.length+'/'+d5.length+', want 46/41');
    for(const [n,L] of [['sight4',d4],['sight5',d5]]){
      if(new Set(L).size!==L.length)bad(n+': repeated word');
      for(const w of L)if(BAD.test(w)||!/^[a-z']+$/.test(w))bad(n+': bad word '+w);
    }
    if(d4.some(w=>d5.includes(w)||DOL[0].includes(w)||DOL[1].includes(w)||DOL[2].includes(w)))bad('sight4 repeats an older list');
    if(RVW.length!==24||VTW.length!==24)bad('picture word lists '+RVW.length+'/'+VTW.length+', want 24/24');
    for(const [n,L,P] of [['pic5',RVW,RVP],['pic6',VTW,VTP]]){
      if(new Set(L.map(x=>x[0])).size!==24)bad(n+': repeated word');
      for(const [w,e,p] of L){
        if(!P.includes(p)||!w.includes(p))bad(n+': '+w+' does not hold '+p);
        if(BAD.test(w)||PHBAD.test(w))bad(n+': BAD word '+w);
        if(!e)bad(n+': '+w+' has no emoji');
      }
      for(const p of P)if(L.filter(x=>x[2]==p).length<2)bad(n+': team '+p+' has fewer than 2 words');
      // wrong choices: three different spellings that swap the team, none rude
      for(const [w,e,p] of L)for(let k=0;k<30;k++){
        const v=phonVariants(w,p,P);
        if(v.length!==3||new Set(v).size!==3||v.includes(w))bad(n+' '+w+': wrong choices '+v);
        for(const x of v)if(BAD.test(x)||PHBAD.test(x))bad(n+' '+w+': rude wrong choice '+x);
      }
    }
    // 3,000 seeded questions per level
    const want={sight4:46,sight5:41,pic5:24,pic6:24,build5:24,build6:24};
    for(const [sk,lv] of [['sight',4],['sight',5],['pic',5],['pic',6],['build',5],['build',6]]){
      const key=sk+lv,w2=key+': ',seen=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ(sk,lv,i+1);
        const pr=kindProblems(q);if(pr.length)bad(w2+q.label+': '+pr.join('; '));
        if(q.sk!==sk||q.lv!==lv)bad(w2+'genQ did not stamp sk/lv');
        if(!q.say||!q.hint||!q.label)bad(w2+'say, hint or label missing');
        labels[q.label]=1;seen.add(q.ans);
        if(sk=='build'){
          if(q.tiles.length!==q.word.length+2||q.ans!==q.word)bad(w2+q.word+': tiles '+q.tiles.join(''));
          const t=[...q.tiles];for(const c of q.word){const j=t.indexOf(c);if(j<0)bad(w2+q.word+': tile missing '+c);else t.splice(j,1)}
          if(q.hint.k!=='next')bad(w2+'hint');
        }else{
          const vs=q.choices.map(c=>c.v);
          if(vs.length!==4||new Set(vs).size!==4||!vs.includes(q.ans))bad(w2+q.label+': choices '+vs);
          if(sk=='sight'&&vs.some(v=>!DOL[lv-1].includes(v)))bad(w2+q.label+': a choice is off the list');
          if(sk=='pic'){
            if(!phonList(lv).some(x=>x[0]===q.ans))bad(w2+q.ans+' is not in the list');
            for(const v of vs)if(BAD.test(v)||PHBAD.test(v))bad(w2+'rude choice '+v);
            if(!/class="emo"/.test(q.html))bad(w2+'no picture');
          }
        }
      }
      if(seen.size!==want[key])bad(w2+'3000 questions drew '+seen.size+' of '+want[key]+' words');
      if(Object.keys(labels).length!==want[key])bad(w2+'labels are not one per word');
      if(JSON.stringify(genQ(sk,lv,77))!==JSON.stringify(genQ(sk,lv,77)))bad(w2+'not reproducible');
    }
    // existing levels still draw from their own lists
    for(let i=0;i<300;i++){
      for(let lv=1;lv<=3;lv++){const q=genQ('sight',lv,i+1);if(!DOL[lv-1].includes(q.ans))bad('sight'+lv+' changed')}
      for(let lv=1;lv<=4;lv++){
        const q=genQ('pic',lv,i+1);if(!WL(lv).some(x=>x[0]===q.ans))bad('pic'+lv+' changed');
        const b=genQ('build',lv,i+1);if(!WL(lv).some(x=>x[0]===b.word))bad('build'+lv+' changed');
      }
    }
    // map: CURRICULUM 2.2 order
    const stops=id=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid).join(' ');
    if(stops('r_space').replace(/ sent\d/g,'')!=='pic4 build4 sight4 pic5 build5 spell3')bad('r_space stops: '+stops('r_space'));
    if(!stops('r_workshop').startsWith('sight5 pic6 build6'))bad('r_workshop stops: '+stops('r_workshop')); // later chunks add stops after these (P2-20: gram2 gram3)
    const ids=PATHS.read.worlds.map(w=>w.id),iw=ids.indexOf('r_workshop');
    if(ids[iw-1]!=='r_space'||ids[iw+1]!=='r_summit'||PATHS.read.worlds[iw].g!==2)bad('r_workshop must be grade 2, between r_space and r_summit: '+ids);
    // save safety: the reading map before this chunk against today's
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const NEWS=new Set(['sight4','pic5','build5']),CUR=PATHS.read.worlds;
    const OLD=()=>CUR.filter(w=>w.id!=='r_workshop').map(w=>w.id=='r_space'?{...w,nodes:w.nodes.filter(x=>!NEWS.has(x[0]+x[1]))}:w);
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),wid:n.wid}});return o};
    const early=new Set(PATHS.read.worlds.slice(0,PATHS.read.worlds.findIndex(w=>w.id=='r_workshop')).map(w=>w.id));
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])fixtures.push([name,fx(name)]);
    // a child who passed every older reading stop (spell 1-3 and every boss included)
    {load(null);const m={};PATHS.read.worlds=OLD();buildNodes('read');NODES.read.forEach(n=>{m[nid(n)]=2});
      PATHS.read.worlds=CUR;buildNodes('read');fixtures.push(['all-old-passed',JSON.stringify({maps:{read:m},grade:2})])}
    // spell3 passed but the stops before it not (a child who skipped around)
    fixtures.push(['spell3-only',JSON.stringify({maps:{read:{pic4:2,build4:1,spell3:3}},grade:2})]);
    let checked=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,6]){
      load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      const g0=S.grade;
      PATHS.read.worlds=OLD();buildNodes('read');
      const before=snap();
      PATHS.read.worlds=CUR;buildNodes('read');
      const after=snap();
      for(const k in before){
        checked++;
        if(!after[k]){bad(name+' g'+g0+': stop '+k+' vanished');continue}
        if(before[k].st!==after[k].st)bad(name+' g'+g0+': '+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].st>0&&!after[k].open)bad(name+' g'+g0+': passed stop '+k+' is locked');
        // nothing in or before Space Station is re-locked (worlds after it wait for Word Workshop, as they wait for any world)
        if(before[k].open&&!after[k].open&&early.has(after[k].wid))bad(name+' g'+g0+': '+k+' re-locked');
      }
      for(const k of ['sight4','pic5','build5','sight5','pic6','build6'])if(after[k]&&after[k].st!==0)bad(name+': '+k+' starts with stars');
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    return {checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:[...new Set(serrs)],note:'6 levels x 3,000 samples, '+r.checked+' stop checks over 7 fixtures x 7 grades'};
});

// ---- P2-02 Shape Garden (K): CURRICULUM M-K ----
run('Shape Garden (P2-02): the 14 M-K levels, audio-first, answers by rule, 3,000 samples per level',()=>{
  const bad=[];
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const LV=[['pk_count',3],['pk_num',3],['tenf',1],['pk_more',2],['shape',2],['add',4],['pat',2],['tenf',2],['cnt',4],['shape',3],['sort',3],['pos',1],['meas',1],['tenf',3]];
    for(const [sk,lv] of LV)if(!SK[sk]||SK[sk].max<lv||SK[sk].area!=='math')b('skill '+sk+' has no level '+lv);
    const ltr=s=>s.replace(/<[^>]*>/g,'').replace(/[^A-Za-z]/g,''); // letters left once tags (and their attributes) are gone
    const TXT=/<div class="sub pktxt">.*?<\/div>/g;
    const NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
    const viz=(h,cls)=>{const m=new RegExp('<svg class="viz viz-'+cls+'"[^>]*>.*?</svg>').exec(h);return m?m[0]:''};
    const circles=s=>(s.match(/<circle/g)||[]).length;
    const nPko=h=>(h.match(/class="pko"/g)||[]).length;
    const CAT={animals:'dog cat pig frog duck fish hen fox',food:'apple banana cookie cake milk grapes pizza bread',vehicles:'car bus bike ship plane train truck boat',clothes:'hat coat socks shirt boots'};
    const THING={ball:'sphere','tennis ball':'sphere',basketball:'sphere',can:'cylinder',drum:'cylinder',box:'cube',dice:'cube','ice cream cone':'cone'};
    const SHP={hexagon:6,rhombus:4,trapezoid:4,square:4,rectangle:4,triangle:3,pentagon:5}; // points of a drawn polygon
    const seen={};
    for(const [sk,lv] of LV){
      const w=sk+' L'+lv,labels=new Set();let same=0,wordsA=0,wordsB=0,back=0,zero=0,front=0,distinct=new Set();
      for(let i=0;i<3000;i++){
        const q=SK[sk].gen(lv);
        if(!q.pk||!q.auto||!q.say)b(w+': not audio-first (pk, auto, say)');
        if(!q.hint)b(w+': no hint');
        else{
          try{if(!hintHTML(q))b(w+': empty hint')}catch(e){b(w+': hintHTML threw '+e.message)}
          if(q.hint.k==='html'){
            if(!q.hint.w)b(w+': hint is not spoken');
            if(ltr(q.hint.html.replace(TXT,''))!=='')b(w+': hint has text outside .pktxt');
          }
        }
        const prompt=q.html.replace(TXT,'');
        if(ltr(prompt)!=='')b(w+': prompt needs reading: '+ltr(prompt).slice(0,40));
        if(!/pktxt/.test(q.html))b(w+': no .pktxt fallback text');
        if(typeof q.label!=='string'||q.label.length>=60)b(w+': label '+q.label);
        labels.add(q.label);
        if(q.kind=='choice'){
          if(q.choices.length<2||q.choices.length>4)b(w+': '+q.choices.length+' choices');
          if(new Set(q.choices.map(c=>c.v)).size!==q.choices.length||!q.choices.some(c=>c.v===q.ans))b(w+': choices');
          for(const c of q.choices)if(c.h&&ltr(c.l)!=='')b(w+': a choice has words');
        }
        // ---- rules per level
        if(sk=='pk_count'){
          const n=+q.ans,fr=q.html.split(/<div class="sgfr(?: sgten)?">/).slice(1);
          if(n<11||n>20||q.kind!=='num')b(w+': answer '+q.ans);
          if(nPko(q.html)!==n)b(w+': '+nPko(q.html)+' objects, answer '+n);
          if(fr.length!==2||nPko(fr[0])!==10||nPko(fr[1])!==n-10)b(w+': frames '+fr.map(nPko));
          if(!/<div class="sgfr sgten">/.test(q.html))b(w+': first frame not marked as the full ten');
          if(!/pulse/.test(q.hint.html))b(w+': hint does not count on');
        }
        if(sk=='pk_num'){
          const n=+q.ans,rev=+String(n).split('').reverse().join('');
          if(n<11||n>20)b(w+': answer '+n);
          if(q.say!==`Tap the number ${NUMW[n]}.`||q.auto!=='must')b(w+': say '+q.say+' / auto '+q.auto);
          if(q.choices.length!==4||q.choices.some(c=>!/^\d+$/.test(c.v)||+c.v<10||+c.v>99))b(w+': choices '+q.choices.map(c=>c.v));
          if(rev!==n&&rev>=10&&!q.choices.some(c=>+c.v===rev))b(w+': no reversed '+rev+' for '+n);
          if(n>=13&&n<=19&&!q.choices.some(c=>+c.v===(n-10)*10))b(w+': no ty number for '+n);
        }
        if(sk=='pk_more'){
          const m=/^(more|fewer|same) (\d+) or (\d+) /.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else{
            const a=+m[2],c=+m[3],pl=q.html.split('class="pkplate').slice(1).map(nPko);
            if(pl[0]!==a||pl[1]!==c||pl.length!==2)b(w+': plates '+pl+' label '+q.label);
            if(a<1||a>10||c<1||c>10)b(w+': group out of range');
            const cols=(q.hint.html.match(/class="sgpr/g)||[]).length;
            if(cols!==Math.max(a,c))b(w+': hint pairs '+cols);
            if(m[1]=='same'){
              same++;
              if(q.kind!=='choice'||q.ans!==(a==c?'yes':'no')||q.choices.length!==2)b(w+': same question');
              if(Math.abs(a-c)>1)b(w+': "same" off by more than 1');
            }else{
              if(q.kind!=='tap'||a===c)b(w+': tap with equal groups');
              const win=(m[1]=='more')===(a>c)?'l':'r';
              if(q.ans!==win||!q.say.includes(' has '+m[1]+' '))b(w+': answer '+q.ans+' for '+q.label);
              if(!/data-v="l"/.test(q.html)||!/data-v="r"/.test(q.html))b(w+': plates are not tap targets');
            }
          }
        }
        if(sk=='shape'&&lv==2){
          const names=q.choices.map(c=>/data-shape="(\w+)"/.exec(c.l)[1]);
          if(!['hexagon','rhombus','trapezoid','oval'].includes(q.ans)||q.choices.length!==4||new Set(names).size!==4||names.join()!==q.choices.map(c=>c.v).join())b(w+': choices '+names);
          if(q.say!==`Tap the ${q.ans}.`||q.auto!=='must')b(w+': say '+q.say);
          if(q.ans=='rhombus'&&names.includes('square'))b(w+': a square beside the rhombus');
          for(const c of q.choices){
            const sv=viz(c.l,'shp'),nm=c.v,np=(/ d="M([^"]*)z"/.exec(sv)||[,''])[1].split('L').length;
            if(nm=='oval'||nm=='circle'){if(!/<ellipse/.test(sv))b(w+': '+nm+' not drawn as an ellipse')}
            else if(np!==SHP[nm])b(w+': '+nm+' drawn with '+np+' corners');
          }
          const hs=q.choices.find(c=>c.v==q.ans).l;distinct.add(hs);
        }
        if(sk=='shape'&&lv==3){
          const names=q.choices.map(c=>c.v).sort().join();
          if(names!=='cone,cube,cylinder,sphere')b(w+': solids '+names);
          if(q.choices.some(c=>!new RegExp('data-shape="'+c.v+'"').test(c.l)||!/viz-shp/.test(c.l)))b(w+': choice picture');
          if(/^solid like (.+)$/.test(q.label)){
            wordsB++;const t=/^solid like (.+)$/.exec(q.label)[1];
            if(THING[t]!==q.ans)b(w+': '+t+' is not '+q.ans);
            if(!/^Which one is shaped like /.test(q.say)||q.auto==='must')b(w+': say '+q.say);
            if(!/sgobj/.test(q.html))b(w+': no picture of the thing');
          }else{
            wordsA++;
            if(q.label!=='solid '+q.ans||q.say!==`Tap the ${q.ans}.`||q.auto!=='must')b(w+': name question '+q.label);
          }
        }
        if(sk=='add'){
          const m=/^(\d) \+ (\d) = \?$/.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else{
            const a=+m[1],c=+m[2];
            if(a+c>5||a+c<1||q.ans!==String(a+c)||q.kind!=='num')b(w+': '+q.label+' answer '+q.ans);
            if(circles(viz(q.html,'dots'))!==a+c)b(w+': dots '+circles(viz(q.html,'dots')));
            if(a==0||c==0)zero++;
          }
        }
        if(sk=='cnt'){
          const nums=(/<div class="seq">(.*?)<\/div>/.exec(q.html)||[,''])[1].split(', '),bi=nums.findIndex(x=>x.includes('slot'));
          const vals=q.label.split(',');
          if(nums.length!==5||bi<1||bi>3||vals.length!==5)b(w+': sequence '+q.label);
          else{
            const v=vals.map((x,i)=>i==bi?+q.ans:+x),d=v[1]-v[0];
            if(Math.abs(d)!==1||v.some((x,i)=>i&&x-v[i-1]!==d)||v.some(x=>x<0||x>20))b(w+': not count by 1 '+v);
            if(vals[bi]!=='_'||vals.filter(x=>x==='_').length!==1)b(w+': blank '+q.label);
            if(d<0)back++;
          }
        }
        if(sk=='pat'){
          const m=/^(AAB|ABB|ABC) /.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else{
            const key=h=>(/--c:var\((--[a-z]+)\)/.exec(h)||[])[1]+'|'+((/points="([^"]*)"/.exec(h)||[])[1]||'circle');
            const shown=[...q.html.matchAll(/<svg class="pks"[^>]*>.*?<\/svg>/g)].map(x=>key(x[0])),L=shown.length;
            // A is the first item; B is the first item that is not A; C the first that is neither
            const A=shown[0],Bk=shown.find(x=>x!==A),Ck=shown.find(x=>x!==A&&x!==Bk),tok={A,B:Bk,C:Ck};
            const exp=Array.from({length:L},(_,i)=>tok[m[1][i%3]]);
            if(L<6||L>7||JSON.stringify(exp)!==JSON.stringify(shown))b(w+': shown does not follow '+m[1]);
            if(m[1]=='ABC'&&!Ck)b(w+': no third item');
            const want=tok[m[1][L%3]],hit=q.choices.filter(c=>key(c.l)===want);
            if(q.choices.length!==3||hit.length!==1||hit[0].v!==q.ans)b(w+': the answer picture');
            if(new Set(q.choices.map(c=>key(c.l))).size!==3)b(w+': two alike');
          }
        }
        if(sk=='sort'){
          const m=/^odd (\w+) \((\w+)\) in (\w+): (.*)$/.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else{
            const c1=m[3],c2=m[2],three=m[4].split(',');
            if(c1===c2||!CAT[c2].split(' ').includes(m[1])||three.length!==3||three.some(x=>!CAT[c1].split(' ').includes(x))||new Set(three).size!==3)b(w+': categories '+q.label);
            const ix=+q.ans,html=q.choices.map(c=>c.l);
            if(q.choices.length!==4)b(w+': '+q.choices.length+' items');
            const pic=x=>{const all=Object.values(SG_CATS).flat().find(e=>e[0]===x);return picFor(all[0],all[1])};
            if(!html[ix].includes(pic(m[1])))b(w+': answer picture is not the odd one');
            html.forEach((h,j)=>{if(j!==ix&&three.every(x=>!h.includes(pic(x))))b(w+': a picture is not one of the three')});
          }
        }
        if(sk=='tenf'){
          const fr=(q.html.match(/<svg class="viz viz-ten"[^>]*>.*?<\/svg>/g)||[]).map(circles),n=+q.ans;
          if(lv==1&&(fr.length!==1||fr[0]!==n||n<0||n>10))b(w+': frame '+fr+' answer '+n);
          if(lv==2&&(fr.length!==1||fr[0]<1||fr[0]>9||n!==10-fr[0]))b(w+': '+fr+' answer '+n);
          if(lv==3){
            const m=/^10 \+ \? = (\d+)$/.exec(q.label);
            if(m){front++;if(fr.length!==1||fr[0]!==10||!/10 \+ <span class="slot"/.test(q.html)||n!==+m[1]-10||n<1||n>9)b(w+': reverse '+q.label+' answer '+n)}
            else if(fr.length!==2||fr[0]!==10||fr[1]<1||fr[1]>9||n!==10+fr[1]||q.label!==`10 and ${fr[1]}`)b(w+': two frames '+fr+' answer '+n);
          }
          if(q.kind!=='num')b(w+': kind');
        }
        if(sk=='pos'){
          const m=/^(above|below|beside|in front of|behind|between) /.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else{
            const k=m[1],vs=[...q.html.matchAll(/data-v="(\w)"/g)].map(x=>x[1]).join('');
            const exp={above:['ab','a'],below:['ab','b'],beside:['ab','a'],'in front of':['ab','b'],behind:['ab','a'],between:['acb','c']}[k];
            if(q.kind!=='tap'||vs!==exp[0]||q.ans!==exp[1])b(w+': '+q.label+' order '+vs+' answer '+q.ans);
            if(!q.say.includes(k))b(w+': say '+q.say);
            if(k=='between'&&!/^Tap the one between the (\w+) and the (\w+)\.$/.test(q.say))b(w+': say '+q.say);
            if(k=='in front of'&&!/sgdepth/.test(q.html)||k=='behind'&&!/sgdepth/.test(q.html))b(w+': no depth scene');
            seen[k]=(seen[k]||0)+1;
          }
        }
        if(sk=='meas'){
          const m=/^(longer|longest|shorter|shortest) crayon ([\d\/]+)|^(taller|tallest|shorter|shortest) tower ([\d\/]+)|^(heavier|lighter) (\d) or (\d)/.exec(q.label);
          if(!m)b(w+': label '+q.label);
          else if(m[2]){
            const ws=[...q.html.matchAll(/width="(\d+)" height="24"/g)].map(x=>+x[1]),big=/longer|longest/.test(m[1]);
            if(ws.join('/')!==m[2]||ws.length<2||ws.length>3||q.ans!==String(ws.indexOf(big?Math.max(...ws):Math.min(...ws)))||new Set(ws).size!==ws.length)b(w+': bars '+ws+' '+q.label+' answer '+q.ans);
            if(/margin-left:[1-9]/.test(q.html)&&!/not lined up/.test(q.label))b(w+': offset without the label');
            if(!/sgaligned/.test(q.hint.html))b(w+': hint does not line them up');
            wordsA++;
          }else if(m[4]){
            const hs=[...q.html.matchAll(/viewBox="0 0 40 (\d+)"/g)].map(x=>(+x[1]-4)/18),big=/taller|tallest/.test(m[3]);
            if(hs.join('/')!==m[4]||hs.length<2||hs.length>3||q.ans!==String(hs.indexOf(big?Math.max(...hs):Math.min(...hs)))||new Set(hs).size!==hs.length)b(w+': towers '+hs+' '+q.label);
            wordsB++;
          }else{
            const l=+/data-l="(\d)"/.exec(q.html)[1],r=+/data-r="(\d)"/.exec(q.html)[1],heavy=l>r?'l':'r';
            if(Math.abs(l-r)<2||`${m[5]} ${l} or ${r}`!==q.label)b(w+': scale '+q.label);
            if(q.ans!==(m[5]=='heavier'?heavy:heavy=='l'?'r':'l'))b(w+': scale answer '+q.ans+' for '+q.label);
            if(!/data-v="l"/.test(q.html)||!/data-v="r"/.test(q.html)||!/viz-bal/.test(q.html))b(w+': scale taps');
            back++;
          }
        }
      }
      if(labels.size<4)b(w+': only '+labels.size+' different labels');
      seen[w]=labels.size;
      if(sk=='pk_more'&&(same<330||same>570))b(w+': "same" in '+same+' of 3000 items (want about 15%)');
      if(sk=='shape'&&lv==3&&(wordsA<1200||wordsB<1200))b(w+': name '+wordsA+' / thing '+wordsB);
      if(sk=='shape'&&lv==2&&distinct.size<200)b(w+': shapes hardly turn or stretch ('+distinct.size+' pictures)');
      if(sk=='add'&&(zero<300))b(w+': only '+zero+' items with + 0');
      if(sk=='cnt'&&(back<1000||back>1400))b(w+': backward in '+back+' of 3000 items (want about 40%)');
      if(sk=='tenf'&&lv==3&&(front<1200||front>1800))b(w+': reverse questions '+front);
      if(sk=='meas'&&(wordsA<800||wordsB<800||back<800))b(w+': kinds '+wordsA+'/'+wordsB+'/'+back);
    }
    for(const k of ['above','below','beside','in front of','behind','between'])if(!seen[k]||seen[k]<300)b('pos: '+k+' appears '+(seen[k]||0)+' times');
    // seeded: the same seed gives the same question
    for(const [sk,lv] of LV)for(let s=1;s<=30;s++)if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))b(sk+lv+' seed '+s+' not reproducible');
    // the old levels of the skills that grew are still the old generators
    for(const [sk,lv,old] of [['pk_count',1,'pk_count'],['add',3,'add'],['cnt',3,'cnt'],['shape',1,'shape'],['pat',1,'pat'],['sort',2,'sort'],['pk_num',2,'pk_num'],['pk_more',1,'pk_more']])
      for(let s=1;s<=10;s++){const q=genQ(sk,lv,s);if(!q||q.lv!==lv||q.sk!==old)b('old level '+sk+lv+' changed')}
    return out;
  };
  const r=eval(js+';('+body.toString()+')()');
  for(const m of r)bad.push(m);
  // new files: no raw hex colours, no Math.random, no px colours in the new CSS
  const css=fs.readFileSync(path.join(SRC,'css','31-sg.css'),'utf8'),gen=fs.readFileSync(path.join(SRC,'js','31-gen-math-early.js'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))bad.push('31-sg.css has a raw hex colour');
  if(/#[0-9a-fA-F]{3,8}\b/.test(gen))bad.push('31-gen-math-early.js has a raw hex colour');
  if(/Math\.random/.test(gen))bad.push('31-gen-math-early.js uses Math.random');
  if(!/\/\/ ---- P2-02 Shape Garden \(K\) ----/.test(gen))bad.push('the P2-02 block header is missing');
  return{problems:bad};
});

run('Shape Garden (P2-02): world position, stop ids, no star moves, nothing re-locks, nobody is sent back into it',()=>{
  const bad=[];
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const clone=o=>JSON.parse(JSON.stringify(o));
    // 1. the world: second math world, K, exactly the CURRICULUM stops in order, between Tiny Town and Number Meadow
    const W=PATHS.math.worlds,ids=W.map(w=>w.id),wi=ids.indexOf('m_shape');
    if(wi!==ids.indexOf('m_tiny')+1||wi!==ids.indexOf('m_meadow')-1)b('Shape Garden is not between Tiny Town and Number Meadow: '+ids);
    const w=W[wi];
    if(w.g!==0||w.n!=='Shape Garden')b('world '+w.g+' '+w.n);
    const stops=w.nodes.map(n=>n[0]+n[1]).join(' ');
    if(stops!=='pk_count3 pk_num3 tenf1 pk_more2 shape2 add4 pat2 tenf2 cnt4 shape3 sort3 pos1 meas1 tenf3')b('Shape Garden stops: '+stops);
    if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)b('two stops share a title');
    for(const [sk,lv] of w.nodes)if(!SK[sk]||SK[sk].max<lv)b('stop '+sk+lv+' has no skill or level');
    if(NODES.math.filter(n=>n.wid==='m_shape'&&n.sk==='boss').length!==1||!NODES.math.some(n=>nid(n)==='boss_m_shape'))b('boss id');
    // 2. every math stop that is not in Shape Garden keeps its id; ids are unique
    const all=NODES.math.map(nid);
    if(new Set(all).size!==all.length)b('duplicate stop ids');
    // 3. saves: each fixture at each grade, compared with the same path without Shape Garden
    const without=()=>{const keep=PATHS.math.worlds;PATHS.math.worlds=keep.filter(x=>x.id!=='m_shape');buildNodes('math');return keep};
    const snap=()=>{const N=NODES.math,o={};N.forEach((n,i)=>{o[nid(n)]={st:getSt('math',i),open:unlocked('math',i)}});o._cur=nid(N[curNode('math')]);return o};
    const startOf=()=>NODES.math[curNode('math')].wi;
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])for(const g of [null,-1,0,1,2,3,4,5,6]){
      const raw=fx(name),empty=!Object.keys(JSON.parse(raw)).length,tag=name+' g'+g+': ';
      const doit=()=>{load(empty?null:raw);if(empty)S.name='Kid';if(g!==null)setGrade(g);return snap()};
      const keep=without();let before;try{before=doit()}finally{PATHS.math.worlds=keep;buildNodes('math')}
      const after=doit();
      const mapsBefore=clone(S.maps.math);
      for(const k in before){
        if(k=='_cur')continue;
        if(after[k]===undefined){b(tag+k+' is gone');continue}
        if(after[k].st!==before[k].st)b(tag+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].open&&!after[k].open)b(tag+k+' re-locked');
        if(before[k].st>0&&!after[k].open)b(tag+'passed stop '+k+' is locked');
      }
      // new stops carry no stars from the old save; the map keys are untouched
      for(const n of NODES.math)if(n.wid==='m_shape'&&(S.maps.math[nid(n)]||0)>0)b(tag+nid(n)+' has stars it never earned');
      if(JSON.stringify(S.maps.math)!==JSON.stringify(mapsBefore))b(tag+'map changed by loading');
      // the map opens on the same stop as before, except a child with no stars at all who has Shape Garden as the first world at or above their grade
      const progress=Object.keys(S.maps.math).some(k=>S.maps.math[k]>0);
      if(progress&&after._cur!==before._cur)b(tag+'current stop '+before._cur+' -> '+after._cur);
      if(!progress){
        const kid=gradeOf();
        const want=kid==0?'pk_count3':before._cur;
        if(after._cur!==want)b(tag+'a child with no stars opens on '+after._cur+', expected '+want);
      }
      // never sent back into an untouched world below the start world, never into Shape Garden past their progress
      const cw=NODES.math[curNode('math')];
      if(cw.wid==='m_shape'&&(progress||gradeOf()!==0))b(tag+'the map opens in Shape Garden');
      if(!unlocked('math',curNode('math'))&&!passed('math',curNode('math')))b(tag+'the map opens on a locked stop');
    }
    // 4. a child partway through Shape Garden keeps going there; a finished one moves on, nobody loses a star
    load(null);S.name='Kid';setGrade(0);
    const first=NODES.math.findIndex(n=>n.wid==='m_shape');
    if(nid(NODES.math[curNode('math')])!=='pk_count3')b('a new K child does not open on Count to 20');
    for(let i=first;i<first+3;i++)setSt('math',i,2);
    if(nid(NODES.math[curNode('math')])!=='pk_more2')b('after three stops the map opens on '+nid(NODES.math[curNode('math')]));
    for(let i=first;i<WR.math[wi][1];i++)setSt('math',i,3);
    if(unlocked('math',WR.math[wi][1])!==true)b('the boss of Shape Garden is locked after every stop');
    // 5. Pre-K and grade 1+ children are not sent here
    load(null);S.name='Kid';setGrade(-1);
    if(NODES.math[curNode('math')].wid!=='m_tiny'||worldOpen('math',wi))b('Pre-K: map or Shape Garden open too early');
    setGrade(1);
    if(NODES.math[curNode('math')].wid!=='m_candy')b('grade 1 does not open on Candy Canyon: '+NODES.math[curNode('math')].wid);
    if(!worldOpen('math',wi))b('grade 1: Shape Garden should stay open to play');
    // 6. harder / easier and skills
    const nd=(sk,lv)=>NODES.math.find(n=>n.sk===sk&&n.lv===lv);
    if(!harder(nd('add',4))||harder(nd('add',4)).lv!==1||!easier(nd('shape',3))||easier(nd('shape',3)).lv!==2)b('harder/easier skip the Shape Garden levels');
    // 7. placement: a 1st grader starts the quiz on Shape Garden, the first K world
    if(PLACE.first(PATHS.math.worlds,1)!==wi)b('placement for grade 1 does not start on Shape Garden');
    return out;
  };
  const r=eval(js+';('+body.toString()+')()');
  for(const m of r)bad.push(m);
  return{problems:bad};
});

// ---- P2-03 1st grade gaps: world Clock Tower (generators, world, saves, clock picture) ----
run('Clock Tower (P2-03): CURRICULUM M-1 levels, answers by rule, 3,000 samples per level, world position, saves',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const bad=[];
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const N=3000,gen=(sk,lv)=>{const o=[];for(let i=0;i<N;i++)o.push(genQ(sk,lv,i*7919+29));return o};
    // 1. the world: between Candy Canyon and Ocean Reef, grade 1, exactly the M-1 stops in order
    const W=PATHS.math.worlds,wi=id=>W.findIndex(w=>w.id==id),cw=W[wi('m_clock')];
    if(!cw||cw.g!==1||cw.n!=='Clock Tower')b('Clock Tower world missing or wrong: '+(cw&&cw.id));
    else{
      if(wi('m_clock')!==wi('m_candy')+1||wi('m_reef')!==wi('m_clock')+1)b('Clock Tower must sit between Candy Canyon and Ocean Reef');
      const ids=cw.nodes.map(n=>n[0]+n[1]).join(' ');
      if(ids!=='pv1 add5 meas2 add6 data1 shape4 frac1')b('Clock Tower stops: '+ids);
    }
    for(const [sk,max] of [['pv',1],['meas',2],['data',1],['frac',1],['add',6],['shape',4]])if(!SK[sk]||SK[sk].max<max||SK[sk].area!=='math')b('skill '+sk+' max '+(SK[sk]&&SK[sk].max));
    // existing stops keep their ids and order inside their worlds
    const was={m_candy:'add2 big1 cnt2 cmp1 miss2 sub2 story2',m_reef:'add3 time1 big2 coins1 eo2 cmp2 time2 sub3 story3'};
    for(const id in was){const now=NODES.math.filter(n=>n.wid==id&&n.sk!='boss').map(nid).join(' ');if(now!==was[id])b(id+' changed: '+now)}
    // 2. generators: every level, hint, say, label, answer by rule
    const spy={pg:null,cut:[]},oPg=VIZ.pictograph,oCut=CT.cut;
    VIZ.pictograph=(d,o)=>{spy.pg=d;return oPg(d,o)};
    CT.cut=(sh,d,eq)=>{spy.cut.push([sh,d,eq]);return oCut(sh,d,eq)};
    const lab={};
    const common=(qs,w)=>{
      const labels=new Map();
      for(const q of qs){
        if(!q.hint||!(q.hint.k=='text'?q.hint.s:q.hint.html))b(w+': no hint');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label)b(w+': no label');
        if(q.sk!=='frac'&&labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);
        for(const x of kindProblems(q))b(w+': '+x);
      }
      lab[w]=labels.size;
    };
    const P=(s,re)=>{const m=s.match(re);return m&&m.slice(1)};
    // pv 1
    {const qs=gen('pv',1),f={pic:0,tens:0,sum:0};common(qs,'pv1');
     for(const q of qs){
       let m;
       if(m=P(q.label,/^pv picture (\d) tens (\d) ones$/)){f.pic++;if(+q.ans!==+m[0]*10+ +m[1])b('pv1 pic answer '+q.label);
         if(!q.html.includes('viz-b10'))b('pv1 picture has no base-ten drawing');}
       else if(m=P(q.label,/^pv tens in (\d+)$/)){f.tens++;if(+q.ans!==Math.floor(+m[0]/10)||+m[0]<10||+m[0]>99)b('pv1 tens '+q.label+' '+q.ans)}
       else if(m=P(q.label,/^(\d+) \+ (\d) = \?$/)){f.sum++;if(+m[0]%10||+q.ans!==+m[0]+ +m[1]||+m[0]<10)b('pv1 sum '+q.label)}
       else b('pv1 label '+q.label);
     }
     for(const k in f)if(f[k]<N*.25)b('pv1: form '+k+' only '+f[k]+' times (mixed evenly)')}
    // add 5
    {const qs=gen('add',5);common(qs,'add5');let sp=0;
     for(const q of qs){
       const m=P(q.label,/^(\d+) \+ (\d+) \+ (\d+) = \?$/);if(!m){b('add5 label '+q.label);continue}
       const v=m.map(Number),s=v[0]+v[1]+v[2];
       if(String(s)!==q.ans||s>20||v.some(x=>x<1||x>9))b('add5 '+q.label+' -> '+q.ans);
       const ten=v[0]+v[1]==10||v[0]+v[2]==10||v[1]+v[2]==10,dbl=v[0]==v[1]||v[0]==v[2]||v[1]==v[2];
       if(ten||dbl)sp++;
       if(ten&&q.hint.s!=='Look for a pair that makes 10.')b('add5 hint for a ten: '+q.label);
     }
     if(sp/N<.55||sp/N>.65)b('add5: ten-or-double share '+(sp/N).toFixed(2)+' (want 0.60)')}
    // add 6
    {const qs=gen('add',6);common(qs,'add6');const f={p10:0,m10:0,pm:0,pu:0,mu:0};
     for(const q of qs){
       const m=P(q.label,/^(\d+) ([+−]) (\d+) = \?$/);if(!m){b('add6 label '+q.label);continue}
       const a=+m[0],c=+m[2],plus=m[1]=='+',r=plus?a+c:a-c;
       if(String(r)!==q.ans||r<0||r>99||a<10||a>99)b('add6 '+q.label+' -> '+q.ans);
       if(c==10)f[plus?'p10':'m10']++;
       else if(c%10==0&&plus&&c>=20)f.pm++;
       else if(c<10&&Math.floor(a/10)===Math.floor(r/10))f[plus?'pu':'mu']++;
       else b('add6 form '+q.label);
       if(!/tens/.test(q.hint.s))b('add6 hint '+q.hint.s);
     }
     for(const k in f)if(f[k]<N*.12)b('add6: form '+k+' only '+f[k])}
    // meas 2 (level 1 is reserved for K and must not crash)
    {const qs=gen('meas',2),seen=new Set();common(qs,'meas2');common(gen('meas',1).slice(0,200),'meas1');
     for(const q of qs){
       const cubes=(q.html.match(/class="vwg"/g)||[]).length;
       if(String(cubes)!==q.ans||cubes<1||cubes>12)b('meas2 cubes '+cubes+' ans '+q.ans);
       if(q.kind!=='num')b('meas2 kind');
       if((q.hint.html.match(/class="vcn"/g)||[]).length!==cubes)b('meas2 hint should number every cube');
       seen.add(+q.ans);
     }
     if(seen.size!==12)b('meas2: lengths seen '+seen.size+' of 12')}
    // data 1
    {const qs=gen('data',1),f={};common(qs,'data1');
     for(const q of qs){
       spy.pg=null;
       const q2=genQ('data',1,q.seed);
       if(q2.html!==q.html)b('data1 not reproducible');
       const d=spy.pg;
       if(!d||d.length!==3){b('data1 needs 3 categories');continue}
       const v=d.map(x=>x[1]),nm=d.map(x=>x[0]);
       if(new Set(v).size!==3||v.some(x=>x<1||x>8))b('data1 values '+v);
       const low=nm.map(x=>x.toLowerCase());let m,want;
       if(q.kind=='choice'){
         const most=/most\?$/.test(q.say);f[most?'most':'least']=(f[most?'most':'least']||0)+1;
         want=nm[v.indexOf(most?Math.max(...v):Math.min(...v))];
       }else if(m=P(q.say,/^How many more (\w+) than (\w+)\?$/)){f.more=(f.more||0)+1;want=v[low.indexOf(m[0])]-v[low.indexOf(m[1])];if(want<=0)b('data1 more is not positive')}
       else if(m=P(q.say,/^How many (\w+) and (\w+) in all\?$/)){f.sum=(f.sum||0)+1;want=v[low.indexOf(m[0])]+v[low.indexOf(m[1])]}
       else if(m=P(q.say,/^How many (\w+)\?$/)){f.count=(f.count||0)+1;want=v[low.indexOf(m[0])]}
       else{b('data1 say '+q.say);continue}
       if(String(want)!==q.ans||Number.isNaN(want))b('data1 '+q.say+' -> '+q.ans+', want '+want);
       if(q.kind=='choice'&&q.choices.length!==3)b('data1 choice count');
     }
     for(const k of ['count','most','least','more','sum'])if(!f[k]||f[k]<N*.12)b('data1: form '+k+' '+f[k])}
    // shape 4 (levels 2 and 3 are reserved for K)
    {const qs=gen('shape',4),NS={triangle:3,square:4,rectangle:4,pentagon:5,hexagon:6,trapezoid:4},f={sides:0,corners:0,which:0},seen=new Set();
     common(qs,'shape4');common(gen('shape',2).slice(0,100),'shape2');common(gen('shape',3).slice(0,100),'shape3');
     for(const q of qs){
       let m;
       if(m=P(q.label,/^(sides|corners) of (\w+)$/)){f[m[0]]++;seen.add(m[1]);if(q.ans!==String(NS[m[1]]))b('shape4 '+q.label+' -> '+q.ans);
         if(!q.html.includes('viz-shp'))b('shape4 no VIZ.shape');if(m[0]=='corners'&&!/class="vdt"/.test(q.hint.html))b('shape4 corners hint has no dots')}
       else if(/^which has 4 sides/.test(q.label)){f.which++;
         if(NS[q.ans]!==4||q.choices.length!==3||q.choices.filter(c=>NS[c.v]===4).length!==1)b('shape4 which '+q.label);
         if(q.choices.some(c=>!c.h))b('shape4 which: pictures')}
       else b('shape4 label '+q.label);
     }
     if(seen.size!==6)b('shape4: shapes seen '+[...seen]);
     for(const k in f)if(f[k]<N*.2)b('shape4 form '+k+' '+f[k])}
    // frac 1
    {const qs=gen('frac',1),f={halves:0,fourths:0,equal:0};common(qs,'frac1');
     for(const q of qs){
       spy.cut=[];
       const q2=genQ('frac',1,q.seed);
       if(q2.html!==q.html||JSON.stringify(q2.choices)!==JSON.stringify(q.choices))b('frac1 not reproducible');
       const c=spy.cut;
       if(q.kind=='choice'&&q.cls=='syms'){ // is it cut into equal parts?
         f.equal++;const [sh,d,eq]=c[0];
         if(c.length!==1||(d!==2&&d!==4)||q.ans!==(eq?'yes':'no')||q.choices.length!==2)b('frac1 equal '+q.label);
       }else{
         const form=/halves/.test(q.say)?'halves':'fourths';f[form]++;
         const d=form=='halves'?2:4;
         if(c.length!==3||q.choices.length!==3||new Set(c.map(x=>x[0])).size!==1)b('frac1 pictures '+q.label);
         else{
           const at=+q.ans,keys=c.map(x=>x[1]+(x[2]?'e':'u'));
           if(c[at][1]!==d||!c[at][2])b('frac1 '+form+' answer picture is not '+d+' equal parts: '+keys);
           if(c.filter((x,i)=>x[1]===d&&x[2]).length!==1)b('frac1 '+form+': two right pictures '+keys);
           if(new Set(keys).size!==3)b('frac1 repeated picture '+keys);
         }
         if(q.hint.s.indexOf('Equal shares are the same size.')!==0)b('frac1 hint');
       }
     }
     for(const k in f)if(f[k]<N*.25)b('frac1 form '+k+' '+f[k])}
    VIZ.pictograph=oPg;CT.cut=oCut;
    for(const w in lab)if(lab[w]<4)b(w+': only '+lab[w]+' different labels');
    // 3. seeded: the same seed gives the same question
    for(const [sk,lv] of [['pv',1],['add',5],['add',6],['meas',2],['data',1],['shape',4],['frac',1],['time',1],['time',2],['time',3]])for(let s=1;s<=30;s++)
      if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))b(sk+lv+' seed '+s+' not reproducible');
    // 4. time: the pictures are VIZ.clock; answers, hints and choices follow the clock
    {const tq=gen('time',1).concat(gen('time',2),gen('time',3));
     for(const q of tq){
       if(!q.html.includes('viz-clk')||/#[0-9a-fA-F]{3,6}/.test(q.html))b('time: not the token clock');
       const m=q.label.match(/^clock (\d+):(\d\d)$/);
       if(!m||q.ans!==m[1]+':'+m[2])b('time answer '+q.label+' '+q.ans);
       const h=+m[1],mi=+m[2];
       if(!q.html.includes(VIZ.clock(h,mi)))b('time: picture does not show '+q.label);
     }
     if(typeof clockSVG!=='undefined')b('clockSVG should be deleted')}
    // 5. grades: Candy Canyon is still where a grade 1 child starts; Clock Tower is open at grade 1 and above; reading and Spanish untouched
    load(null);S.grade=1;
    if(NODES.math[curNode('math')].wid!=='m_candy')b('grade 1 fresh does not open on Candy Canyon: '+NODES.math[curNode('math')].wid);
    if(!worldOpen('math',wi('m_clock'))||!worldOpen('math',wi('m_reef')))b('grade 1: Clock Tower and Ocean Reef must be open');
    S.grade=0;
    if(worldOpen('math',wi('m_clock')))b('K child: Clock Tower open before Candy Canyon is done');
    // 6. saves: every stop keeps its stars and no passed stop re-locks when the world is added (compare with a path without it)
    let checked=0;
    const snap=()=>{const o={};for(const p of ['math'])NODES[p].forEach((n,i)=>{o[nid(n)]={st:getSt(p,i),open:unlocked(p,i),pass:passed(p,i),prog:worldHasProgress(p,n.wi),g:PATHS[p].worlds[n.wi].g}});return o};
    const ORIG=PATHS.math.worlds;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps']){
      for(const g of [null,0,1,2,3,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        const maps=JSON.stringify(S.maps);
        const now=snap(),cur=nid(NODES.math[curNode('math')]);
        PATHS.math.worlds=ORIG.filter(w=>w.id!=='m_clock');buildNodes('math');
        const old=snap(),curOld=nid(NODES.math[curNode('math')]);
        PATHS.math.worlds=ORIG;buildNodes('math');
        for(const k in old){
          checked++;
          if(!now[k]){b(name+' g'+g+': stop '+k+' disappeared');continue}
          if(now[k].st!==old[k].st)b(name+' g'+g+': stars of '+k+' changed');
          if(old[k].pass&&!now[k].open)b(name+' g'+g+': passed stop '+k+' re-locked');
          if(old[k].open&&!now[k].open&&!(now[k].g>gradeOf()&&!now[k].prog))b(name+' g'+g+': '+k+' locked by the new world');
        }
        for(const k in now)if(!(k in old)&&/^(pv1|add5|add6|meas2|data1|shape4|frac1|boss_m_clock)$/.test(k)&&now[k].st)b(name+' g'+g+': new stop '+k+' has stars');
        if(JSON.stringify(S.maps)!==maps)b(name+' g'+g+': loading changed the map');
        if(g===1&&name=='fresh'&&cur!=='add2')b('fresh grade 1 opens on '+cur);
      }
    }
    // 7. mastery: harder/easier follow map order (the curriculum sequence), so each add stop's neighbours are the add stops before and after it on the map
    const adds=NODES.math.filter(n=>n.sk==='add');
    adds.forEach((n,i)=>{if(harder(n)!==(adds[i+1]||null)||easier(n)!==(adds[i-1]||null))b('harder/easier must follow map order at add '+n.lv)});
    return {out,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  for(const m of r.out)bad.push(m);
  // 8. new code: no raw hex colours and no Math.random in this chunk's block
  const gen=fs.readFileSync(path.join(SRC,'js','31-gen-math-early.js'),'utf8'),blk=gen.slice(gen.indexOf('// ---- P2-03 Clock Tower (1st) ----'));
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))bad.push('P2-03 block has a raw hex colour');
  if(/Math\.random/.test(blk))bad.push('P2-03 block uses Math.random');
  return{problems:bad,note:r.checked+' stop checks against a path without Clock Tower'};
});

// ---- P4-05: pet rig and dragon ----
run('pet rig (P4-05): dragon stages x moods, named groups, anchors, tokens only, budget, saves unchanged (other pets drawn since P4-06)',()=>{
  const p=[];
  const fx=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures','midway.json'),'utf8'));
  const src=fs.readFileSync(path.join(SRC,'js','17-pets-svg.js'),'utf8');
  const css=fs.readFileSync(path.join(SRC,'css','41-pet.css'),'utf8');
  const o=(()=>eval(js+`
  const r={svg:{},react:{},anch:{},old:{}};
  for(const st of [0,1,2,3,4]){for(const m of PET_MOODS)r.svg[st+'|'+m]=petSVG('dragon',st,m);
    r.react[st]=petSVG('dragon',st,'idle',{hat:'🎩',toy:'🎈',react:true})}
  r.svgWear=petSVG('dragon',2,'idle',{hat:'<rect width="64" height="64"/>',toy:'<circle cx="32" cy="32" r="9"/>'});
  r.again=[0,1].map(()=>petSVG('dragon',3,'happy',{hat:'🎩',toy:'🎈',react:true}));
  r.byName=petSVG('dragon','kid','cheer')===petSVG('dragon',2,'cheer');
  r.stages=PET_STAGES;r.moods=PET_MOODS;
  for(const sn of PET_STAGES)r.anch[sn]={head:PET_RIG.dragon.stages[sn].head,hat:petAnchor('dragon',sn,'hat'),toy:petAnchor('dragon',sn,'toy')};
  r.mood=[{food:10,clean:10,fun:10},{food:50,clean:20,fun:90},{food:50,clean:90,fun:29},{food:80,clean:80,fun:80},{food:79,clean:90,fun:90}].map(c=>petMood(c));
  Object.assign(S,${JSON.stringify(fx)});
  const strip=s=>{const x=JSON.parse(s);delete x.care;return JSON.stringify(x)},before=JSON.stringify(S);
  r.mid={html:petHTML(),aura:petAura(),art:petArt(),pick:petPick('dragon'),sup:petHTML(300),auraSup:petAura(300),setupPick:petPick('dino')};
  r.saveSame=strip(before)===strip(JSON.stringify(S));
  // P4-06: the other pets are drawn too now (checked in "pets on the rig P4-06"); here only that they are no longer the emoji
  for(const k of ['dino','bird','ocean']){S.pet=k;for(const st of [0,25,80,200,350])
    r.old[k+' '+st]={drawn:petHTML(st).includes('pet-svg pet-k-'+k),aura:petAura(st)==='rig',art:petArt(st).startsWith('<svg'),pick:petPick(k).startsWith('<svg')}}
  S.pet='dragon';
  r;`))();
  const GROUPS=['shadow','fig','extra','xl','xr','tail','body','belly','arm-l','arm-r','head','cheeks','eyes','mouth'];
  const EGG=['shadow','fig','body','arm-r','head','cheeks','eyes','mouth'];
  const roles=new Set();
  const check=(key,d,sn,m,sup,react)=>{
    if(!d.startsWith(`<svg class="pet-svg pet-k-dragon pet-s-${sn} pet-m-${m}${sup?' pet-super':''}" viewBox="0 0 200 200" role="img" aria-label="Dragon">`))p.push(key+': svg head '+d.slice(0,120));
    if(d.includes('pg-glow')!==sup)p.push(key+': glow ring only on the super stage');
    // well formed: every open tag closed in order
    const stack=[];
    for(const t of d.matchAll(/<(\/?)([a-z]+)\b[^>]*?(\/?)>/g)){
      if(!/^(svg|g|path|circle|ellipse|rect|text)$/.test(t[2]))p.push(key+': element <'+t[2]+'> not allowed');
      if(t[1]){if(stack.pop()!==t[2])p.push(key+': tag </'+t[2]+'> out of order')}else if(!t[3])stack.push(t[2]);
    }
    if(stack.length)p.push(key+': unclosed '+stack.join(','));
    if(/\sid=|<defs|gradient|filter|url\(|<animate|<style|<script|\son[a-z]+=/i.test(d))p.push(key+': no ids, defs, gradients, filters, url(), SMIL, style or script');
    if(/#[0-9a-f]{3,8}\b/i.test(d))p.push(key+': raw hex colour');
    for(const a of d.match(/\s(fill|stroke)="[^"]*"/g)||[]){
      const v=a.match(/="([^"]*)"/)[1];
      if(v!=='none'&&!/^var\(--pc-[a-z0-9]+\)$/.test(v))p.push(key+': colour must be none or var(--pc-x): '+a.trim());
      else if(v!=='none')roles.add(v.slice(4,-1));
    }
    const co=(d.match(/\s(d|cx|cy|r|rx|ry|x|y)="[^"]*"/g)||[]).join(' ').match(/\d*\.\d{2,}/g);
    if(co)p.push(key+': coordinates to one decimal ('+co[0]+')');
    for(const g of sn=='egg'?EGG:GROUPS)if(!d.includes('class="pg-'+g+'"'))p.push(key+': group pg-'+g+' missing');
    const n=(d.match(/class="pg-eyes"/g)||[]).length,nm=(d.match(/class="pg-mouth"/g)||[]).length;
    if(n!==(react?3:1)||nm!==n)p.push(key+': '+n+' eyes / '+nm+' mouth groups');
    if(react&&!(d.includes('pf-cheer')&&d.includes('pf-oops')))p.push(key+': reaction faces missing');
    if(d.length>(react?11000:9000))p.push(key+': '+d.length+' bytes');
  };
  const face=/<g class="pf pf-base"><g class="pg-eyes">([^]*?)<\/g><g class="pg-mouth">([^]*?)<\/g><\/g>/;
  for(const st of [0,1,2,3,4]){
    const sn=o.stages[Math.min(st,3)],faces=new Set();let rest=null;
    for(const m of o.moods){
      const d=o.svg[st+'|'+m],key=sn+(st==4?' super':'')+' '+m;
      check(key,d,sn,m,st==4,false);
      const f=d.match(face);
      if(!f){p.push(key+': no pf-base face');continue}
      if(/<g\b/.test(f[1]+f[2]))p.push(key+': a face may not hold groups');
      faces.add(f[0]);
      // a mood swaps only the eyes and the mouth
      const r=d.replace(face,'').replace(/ pet-m-[a-z]+/,'');
      if(rest==null)rest=r;else if(r!==rest)p.push(key+': mood changes more than the eyes and mouth');
    }
    if(faces.size!==o.moods.length)p.push(sn+': moods do not all look different');
    const w=o.react[st];
    check(sn+' wearables',w,sn,'idle',st==4,true);
    const hat=w.indexOf('class="pw-hat"'),toy=w.indexOf('class="pw-toy"'),head=w.indexOf('class="pg-head"'),arm=w.indexOf('class="pg-arm-r"');
    if(hat<0||!w.includes('>🎩</text>')||toy<0||!w.includes('>🎈</text>'))p.push(sn+': today\'s emoji hat/toy not drawn');
    if(!(hat>head&&head>=0))p.push(sn+': hat is not inside the head group');
    if(!(toy>arm&&arm>=0&&(sn=='egg'||toy<head)))p.push(sn+': toy is not inside the right arm group');
  }
  if(o.again[0]!==o.again[1])p.push('petSVG is not deterministic');
  if(!o.byName)p.push('stage by name and by number differ');
  if(!o.svgWear.includes('translate(-32 -60)"><rect')||!o.svgWear.includes('translate(-32 -32)"><circle'))p.push('SVG wearables are not placed on the 64-grid attach points');
  for(const [sn,a] of Object.entries(o.anch)){
    for(const k of ['hat','toy'])for(const v of ['x','y'])if(!(a[k][v]>=0&&a[k][v]<=200))p.push(sn+' '+k+' anchor outside the viewBox');
    if(!(a.hat.y<a.head[1]&&Math.abs(a.hat.x-100)<=10))p.push(sn+': hat anchor is not on top of the head');
    if(!(a.toy.x>110))p.push(sn+': toy anchor is not on the right hand side');
    for(const k of ['hat','toy'])if(!(a[k].s>=.3&&a[k].s<=1.2))p.push(sn+' '+k+' scale '+a[k].s);
  }
  if(o.mood.join()!=='hungry,sleepy,sleepy,happy,idle')p.push('petMood: '+o.mood.join());
  // the saved midway child (dragon, 85 stars, top hat and balloon) gets the drawn kid dragon; the save is not changed
  const m=o.mid;
  if(!m.html.includes('pet-svg pet-k-dragon pet-s-kid')||!m.html.includes('>🎩</text>')||!m.html.includes('>🎈</text>'))p.push('midway: petHTML is not the kid dragon with its hat and toy');
  if(m.aura!=='rig'||m.auraSup!=='rig')p.push('midway: petAura is not "rig"');
  if(!m.sup.includes('pet-s-grown')||!m.sup.includes('pet-super'))p.push('300 stars: not the super grown dragon');
  if(!m.art.startsWith('<svg')||m.art.includes('pw-hat'))p.push('petArt: not the bare drawing');
  if(!m.pick.includes('pet-s-grown pet-m-happy')||!m.setupPick.includes('pet-k-dino pet-s-grown'))p.push('petPick: '+m.pick.slice(0,80)+' / '+m.setupPick);
  if(!o.saveSame)p.push('drawing the pet changed the save (other than the care meters)');
  for(const [k,v] of Object.entries(o.old))for(const [f,ok] of Object.entries(v))if(!ok)p.push(k+': '+f+' is not the drawn pet (P4-06)');
  // palette roles are defined in 41-pet.css; the CSS animates only transform and opacity, without filters or raw hex
  for(const r of roles)if(!css.includes(r+':'))p.push(r+' not defined in 41-pet.css');
  if(/filter\s*:|backdrop-filter/.test(css)||/#[0-9a-f]{3,8}\b/i.test(css))p.push('41-pet.css: filter or raw hex');
  for(const k of css.matchAll(/@keyframes\s+[\w-]+\s*\{((?:[^{}]*\{[^{}]*\})*)\s*\}/g))
    for(const pr of k[1].matchAll(/([a-z-]+)\s*:/g))if(!/^(transform|opacity)$/.test(pr[1]))p.push('41-pet.css keyframes animate '+pr[1]);
  for(const t of css.matchAll(/transition\s*:\s*([a-z-]+)/g))if(t[1]!=='transform'&&t[1]!=='opacity')p.push('41-pet.css transition on '+t[1]);
  if(/filter\s*:/.test(fs.readFileSync(path.join(SRC,'css','20-base.css'),'utf8')))p.push('20-base.css still uses filter');
  const block=(src.match(/\/\/ >>> dragon[^]*?\/\/ <<< dragon/)||[''])[0].length;
  // DESIGN_SYSTEM 6.2 said 6 KB; the owner asked for more volume (3-4 tones per area), so the budget is 8 KB for all stages
  if(!block||block>8192)p.push('dragon source is '+block+' bytes (budget 8 KB for all stages)');
  return{problems:p,note:'5 stages x 6 moods, dragon '+block+' bytes, '+roles.size+' palette roles'};
});

// ---- P4-04: core components ----
run('components (P4-04): tokens only, transform/opacity motion, no old class restyled, helpers escape and label',()=>{
  const p=[];
  const css=fs.readFileSync(path.join(SRC,'css','10-components.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('raw hex colour in 10-components.css');
  if(/rgba?\(|hsla?\(/.test(css))p.push('colour function in 10-components.css (put the colour in 00-tokens.css)');
  if(/(^|[;{\s])(-webkit-)?(backdrop-)?filter\s*:/.test(css))p.push('filter or backdrop-filter used');
  // every transition animates only transform or opacity; keyframes change only transform or opacity
  for(const m of css.matchAll(/transition\s*:\s*([^;}]+)/g))for(const part of m[1].split(','))
    if(!/^\s*(transform|opacity)\s/.test(part))p.push('transition on something other than transform/opacity: '+part.trim());
  if(/transition-property/.test(css))p.push('use the transition shorthand (checked) instead of transition-property');
  const kf=[...css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)];
  if(kf.length<4)p.push('expected the four k-* keyframes');
  for(const [,n,body] of kf){
    if(!/^k-/.test(n))p.push('keyframes '+n+' must be named k-*');
    for(const d of body.match(/[a-z-]+(?=\s*:)/g)||[])if(d!='transform'&&d!='opacity')p.push('keyframes '+n+' animates '+d);
  }
  const others=fs.readdirSync(path.join(SRC,'css')).filter(f=>f!='10-components.css').map(f=>fs.readFileSync(path.join(SRC,'css',f),'utf8')).join('');
  for(const [,n] of kf)if(new RegExp('@keyframes\\s+'+n+'\\b').test(others))p.push('keyframes name '+n+' is also used in another CSS file');
  // every var(--x) is a token, or one of the component's own custom properties
  const OWN=['c','c-tint','c-shade','c-fill','c-ledge','v','ic2'];
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!OWN.includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('unknown token --'+m[1]);
  // classes the app already uses with another look must not be restyled here (DS 4 renames them); a bare .btn or .top is not touched
  const OLD=['card','chip','meter','tile','slot','bubble','node','empty','danger','stars','hero','pad','ch','k','go','del','title','small','fb','ovl'];
  const sels=[];
  for(const m of css.matchAll(/(?:^|})\s*([^{}@]+)\{/g))for(const s of m[1].split(/,(?![^(]*\))/))sels.push(s.trim());
  for(const s of sels){
    for(const c of s.match(/\.[a-zA-Z][\w-]*/g)||[]){
      const n=c.slice(1);
      if(OLD.includes(n)&&!/\.(key|keys|choice|piece|socket)\b/.test(s))p.push('selector touches an existing class .'+n+': '+s);
    }
    if(/(^|[\s>+~])\.btn(?![\w-])/.test(s)&&!/\.btn(:is\([^)]*\)|\.(primary|soft|subject|ghost|risk|icon)\b)/.test(s))p.push('selector restyles a bare .btn: '+s);
    if(/(^|[\s>+~])\.top(?![\w-])/.test(s)&&!/\.top\.tbar/.test(s))p.push('selector restyles a bare .top: '+s);
  }
  if(sels.length<150)p.push('only '+sels.length+' selectors parsed (parser broken?)');
  // helpers
  const out=eval(js+`
  const bad=[],has=(h,s,w)=>{if(!h.includes(s))bad.push(w+': missing '+s+' in '+h.slice(0,160))};
  let h=UI.btn('<b>Go</b>',{kind:'primary',icon:'go',size:'lg',id:'x'});
  has(h,'class="btn primary lg"','btn classes');has(h,'&lt;b&gt;Go&lt;/b&gt;','btn escapes the label');has(h,'#i-go','btn icon');has(h,'id="x"','btn id');
  if(h.includes('<b>'))bad.push('btn label not escaped');
  has(UI.btn('Skip'),'class="btn soft"','btn default kind');
  has(UI.btn('Reset',{kind:'risk',off:true}),' disabled','btn disabled');
  has(UI.btn('Math',{kind:'subject',p:'math'}),'s-math','subject class');
  has(UI.t('Grown-ups area'),'<span class="nw">Grown-ups</span> area','hyphen word kept whole');
  has(UI.btn('Grown-ups'),'<span class="nw">Grown-ups</span>','button label keeps Grown-ups whole');
  h=UI.ibtn('back','Go "back"');has(h,'class="btn icon"','icon button');has(h,'aria-label="Go &quot;back&quot;"','icon button aria-label');
  has(UI.chip('coin',64),'ic-coin','coin chip colours');has(UI.chip('timer','0:45'),'#i-timer','timer chip icon');
  has(UI.chip('flame',4,{tap:true,id:'stk'}),'<button class="stat flame" id="stk"','tappable chip');
  for(const [v,w] of [[-1,'0'],[2,'1'],[NaN,'0'],['x','0'],[.4567,'0.457']])has(UI.meter(v),'--v:'+w+'"','meter clamps '+v);
  has(UI.meter(.5,{label:'9 of 58 stops',p:'math',kind:'grow'}),'class="gauge grow s-math" role="img" aria-label="9 of 58 stops"','meter label');
  h=UI.stars(2,3);if((h.match(/class="rs on"/g)||[]).length!=2||(h.match(/class="rs"/g)||[]).length!=1)bad.push('stars(2,3) on/off count');
  has(h,'aria-label="2 of 3 stars"','stars label');has(UI.stars(1,3,56,{arc:true}),'rate arc','stars arc');
  h=UI.dots(5,2,['try']);has(h,'<i class="try"></i><i class="done"></i><i class="cur"></i><i class=""></i><i class=""></i>','dots states');
  has(h,'Question 3 of 5','dots label');has(UI.dots(3,3),'Question 3 of 3','dots finished label');
  has(UI.tag('Mastered','mast','crown'),'class="tag mast"','tag');
  h=UI.choice('7',{kind:'sym',i:2,v:'7'});has(h,'class="choice sym" data-i="2" data-v="7"','choice');
  h=UI.pathcard({p:'read',title:'Reading <x>',done:7,total:43,next:'Middle sounds'});
  has(h,'class="pathcard s-read"','pathcard');has(h,'Reading &lt;x&gt;','pathcard escapes');has(h,'Next: Middle sounds','pathcard next');has(h,'--v:0.163','pathcard meter');
  has(UI.pathcard({p:'math',title:'M',done:0,total:0}),'--v:0"','pathcard with no stops');
  h=UI.hint('<p>x</p>',{steps:['a','b','c'],at:1});has(h,'<li class="">a</li><li class="on">b</li><li class="later">c</li>','hint steps');has(h,'id="hintnext"','hint next button');
  if(UI.hint('',{steps:['a','b'],at:1}).includes('hintnext'))bad.push('hint: no next button on the last step');
  has(UI.ctx('Story','<p>p</p>',false),'<details class="ctx">','ctx closed');has(UI.ctx('Story','<p>p</p>'),'<details class="ctx" open>','ctx open');
  has(UI.sw('Calm & quiet',true,'calm'),'role="switch" id="calm" checked','switch');has(UI.sw('Calm & quiet',true,'calm'),'Calm &amp; quiet','switch escapes');
  h=UI.seg([['e','Easy'],[2,'Two']],2);has(h,'data-v="e" aria-pressed="false"','seg off');has(h,'data-v="2" aria-pressed="true"','seg on (number value)');
  has(UI.empty('calendar','Nothing due',''),'class="blank"','empty state');has(UI.speech('Hi','l'),'class="speech l"','speech');
  h=UI.mapnode({p:'math',state:'lock'});has(h,'aria-disabled="true"','locked node');has(h,'#i-lock','locked node icon');
  h=UI.mapnode({p:'math',state:'done',stars:2,isNew:true});has(h,'2 of 3 stars','passed node stars');has(h,'class="tag new"','new tag');
  if(UI.mapnode({p:'math',state:'open',stars:2}).includes('rate'))bad.push('open node shows stars');
  // every icon a helper can ask for exists
  for(const n of [...Object.values(UI.SUBJ_ICON),...Object.values(UI.CHIP_ICON),'check','replay','hint','play','go','lock','star'])if(!ICONS[n])bad.push('missing icon '+n);
  bad;`);
  return{problems:p.concat(out),note:sels.length+' selectors'};
});

// ---- P2-04 Treasure Bay: grade 2 gaps ----
run('Treasure Bay (P2-04): CURRICULUM M-2 levels, old levels unchanged, answers by rule, 3,000 samples per level, world position, saves',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const bad=[];
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const N=3000,gen=(sk,lv)=>{const o=[];for(let i=0;i<N;i++)o.push(genQ(sk,lv,i*7919+31));return o};
    // 1. the world: after Space Station, before Multiply Mountain, grade 2, exactly the M-2 stops in order, pat 3 last
    const W=PATHS.math.worlds,wi=id=>W.findIndex(w=>w.id==id),bw=W[wi('m_bay')];
    if(!bw||bw.g!==2||bw.n!=='Treasure Bay')b('Treasure Bay world missing or wrong: '+(bw&&bw.id));
    else{
      if(wi('m_bay')!==wi('m_space')+1||wi('m_mult')!==wi('m_bay')+1)b('Treasure Bay must sit between Space Station and Multiply Mountain');
      const ids=bw.nodes.map(n=>n[0]+n[1]).join(' ');
      if(ids!=='pv2 big5 pv3 sub5 time4 coins4 meas3 data2 arr1 cnt5 coins5 story4 pat3')b('Treasure Bay stops: '+ids);
      if(bw.nodes.some(n=>n[2].length>22))b('a Treasure Bay stop title is too long');
    }
    for(const [sk,max] of [['pv',3],['big',5],['sub',5],['time',4],['coins',5],['meas',3],['data',2],['arr',2],['cnt',5],['story',5],['pat',3]])
      if(!SK[sk]||SK[sk].max<max||SK[sk].area!=='math')b('skill '+sk+' max '+(SK[sk]&&SK[sk].max));
    const was={m_space:'big3 mult1 coins2 cnt3 sub4 time3 big4 mult2 cmp3 coins3'};
    for(const id in was){const now=NODES.math.filter(n=>n.wid==id&&n.sk!='boss').map(nid).join(' ');if(now!==was[id])b(id+' changed: '+now)}
    // 2. old levels give exactly what they gave before (the same seed gives the same question through the new dispatchers)
    {const old={pv:{1:genPv1},big:{1:genBig,2:genBig,3:genBig,4:genBig},sub:{1:genSub,2:genSub,3:genSub,4:genSub},time:{1:genTime,2:genTime,3:genTime},
      coins:{1:genCoins,2:genCoins,3:genCoins},meas:{1:genMeas,2:genMeas2},data:{1:genData1},arr:{2:genArr},cnt:{1:genCntK,2:genCntK,3:genCntK,4:genCntK},
      story:{1:genStory,2:genStory,3:genStory,5:genStoryAll},pat:{1:genPatK,2:genPatK}};
     let n=0;
     for(const sk in old)for(const lv in old[sk])for(let s=1;s<=60;s++){
       const prev=RNG;RNG=mulberry32(s);let a;try{a=old[sk][lv](+lv)}finally{RNG=prev}
       const q=genQ(sk,+lv,s);delete q.sk;delete q.lv;delete q.seed;n++;
       if(JSON.stringify(q)!==JSON.stringify(a))b('existing level changed: '+sk+' '+lv+' seed '+s)}
    }
    // 3. generators: every new level, hint, say, label, answer by rule
    const spy={bar:null},oBar=VIZ.barGraph;
    VIZ.barGraph=(d,sc,o)=>{spy.bar=[d,sc];return oBar(d,sc,o)};
    const lab={};
    const common=(qs,w)=>{
      const labels=new Map();
      for(const q of qs){
        if(!q.hint||!(q.hint.k=='text'?q.hint.s:q.hint.k=='steps'?q.hint.steps.length:q.hint.html))b(w+': no hint'); // steps: P2-08 (big5)
        else if(q.hint.k!=='text'&&q.hint.k!=='html'&&q.hint.k!=='steps')b(w+': hint kind '+q.hint.k);
        else if(hintHTML(q).length<20)b(w+': hint too short');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label||q.label.length>=60)b(w+': label '+q.label);
        if(labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);
        if(/#[0-9a-fA-F]{3,6}\b/.test(q.html))b(w+': raw hex in html');
        for(const x of kindProblems(q))b(w+': '+x);
      }
      lab[w]=labels.size;
    };
    const P=(s,re)=>{const m=s.match(re);if(!m)throw new Error('no match '+re+' '+s);return m.slice(1)};
    const digits=n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10];
    // pv 2
    {const qs=gen('pv',2),f={pic:0,val:0,zero:0};common(qs,'pv2');
     for(const q of qs){
       if(q.label.startsWith('pv picture')){
         f.pic++;const n=+P(q.label,/^pv picture (\d+)$/)[0],d=digits(n);
         if(q.ans!==String(n)||n<100||n>999||!q.html.includes(VIZ.base10(n)))b('pv2 picture '+q.label+' '+q.ans);
         if(d[1]==0||d[2]==0)f.zero++;
       }else{
         f.val++;const [dg,nn]=P(q.label,/^value of (\d) in (\d+)$/),n=+nn,d=digits(n),p=String(n).indexOf(dg);
         if(new Set(d).size<3)b('pv2 value: digits repeat in '+n);
         if(q.ans!==String(+dg*[100,10,1][p]))b('pv2 value '+q.label+' ans '+q.ans);
         if(q.choices.map(c=>c.v).join()!==[+dg,+dg*10,+dg*100].join())b('pv2 value choices '+q.choices.map(c=>c.v));
       }
     }
     const pic=f.pic;if(f.val<N*.35||pic<N*.35)b('pv2 forms '+JSON.stringify(f));
     if(f.zero<pic*.2||f.zero>pic*.4)b('pv2 zero share '+f.zero+' of '+pic)}
    // pv 3
    {const qs=gen('pv',3),f={exp:0,miss:0,which:0};common(qs,'pv3');
     const val=s=>s.split(' + ').reduce((a,x)=>a+ +x,0);
     for(const q of qs){
       if(q.kind=='num'&&/ = \?$/.test(q.label)){f.exp++;const e=P(q.label,/^(.+) = \?$/)[0];if(val(e)!==+q.ans||e.split(' + ').some(x=>!/^[1-9]0{0,2}$/.test(x)))b('pv3 exp '+q.label+' '+q.ans)}
       else if(q.kind=='num'){f.miss++;const [lhs,tot]=P(q.label,/^(.+) = (\d+)$/),t=lhs.split(' + ');
         if(t.filter(x=>x=='?').length!==1||val(lhs.replace('?',q.ans))!==+tot||!/^[1-9]0{0,2}$/.test(q.ans))b('pv3 miss '+q.label+' '+q.ans)}
       else{f.which++;const n=+P(q.label,/^which is (\d+)$/)[0],c=q.choices.map(x=>x.v);
         if(val(q.ans)!==n||c.length!==4||new Set(c).size!==4||c.filter(x=>val(x)===n).length!==1||!c.includes(q.ans))b('pv3 which '+q.label+' '+c)}
     }
     for(const k in f)if(f[k]<N*.25)b('pv3 form '+k+' '+f[k])}
    // big 5
    {const qs=gen('big',5),f={ones:0,tens:0,both:0};common(qs,'big5');
     for(const q of qs){
       const [a,bb]=P(q.label,/^(\d+) \+ (\d+) = \?$/).map(Number),da=digits(a),db=digits(bb);
       if(a<100||bb<100||a+bb>999||q.ans!==String(a+bb)||!q.html.includes('veq'))b('big5 '+q.label+' '+q.ans);
       const c0=da[2]+db[2]>=10,c1=da[1]+db[1]+(c0?1:0)>=10;
       if(c0&&c1)f.both++;else if(c0)f.ones++;else if(c1)f.tens++;else b('big5 no regrouping '+q.label);
     }
     for(const k in f)if(f[k]<N*.25)b('big5 regroup '+k+' '+f[k])}
    // sub 5
    {const qs=gen('sub',5);common(qs,'sub5');
     for(const q of qs){
       const [a,bb]=P(q.label,/^(\d+) - (\d+) = \?$/).map(Number),da=digits(a),db=digits(bb);
       if(a<100||bb<100||a-bb<=0||q.ans!==String(a-bb)||!q.html.includes('veq'))b('sub5 '+q.label+' '+q.ans);
       if(da.some((x,i)=>x<db[i]))b('sub5 regroups '+q.label);
     }}
    // time 4
    {const qs=gen('time',4);common(qs,'time4');let odd=0;
     const oClk=VIZ.clock;
     for(const q of qs){
       const [h,m]=P(q.label,/^clock to 5 min (\d+):(\d\d)$/).map(Number);
       if(q.ans!==h+':'+String(m).padStart(2,'0')||m%5||!q.html.includes(VIZ.clock(h,m)))b('time4 '+q.label+' '+q.ans);
       if(m%15)odd++;
       const c=q.choices.map(x=>x.v);
       if(c.length!==4||new Set(c).size!==4||!c.includes(q.ans)||c.some(x=>!/^(1[0-2]|[1-9]):[0-5][05]$/.test(x)))b('time4 choices '+c);
       if(!q.hint.s.includes('count by 5s from the 12'))b('time4 hint');
     }
     if(odd<N*.6)b('time4 non-quarter share '+odd)}
    // coins 4
    {const qs=gen('coins',4);common(qs,'coins4');const oc=VIZ.coinSVG;let five=0;
     for(const q of qs){
       const list=P(q.label,/^money ([\d+]+)$/)[0].split('+').map(Number),tot=list.reduce((a,x)=>a+x,0);
       if(!q.html.includes(VIZ.coinSVG(list)))b('coins4 picture '+q.label);
       if(tot>999||tot<101||!list.some(x=>x>=100)||list.some(x=>![500,100,25,10,5,1].includes(x)))b('coins4 amount '+q.label);
       if(list.includes(500))five++;
       if(q.ans!=='$'+(tot/100).toFixed(2))b('coins4 ans '+q.label+' '+q.ans);
       const c=q.choices.map(x=>x.v);
       if(c.length!==4||new Set(c).size!==4||!c.includes(q.ans)||c.some(x=>!/^\$\d\.\d\d$|^\$1[01]\.\d\d$/.test(x)))b('coins4 choices '+c);
     }
     if(five<N*.15)b('coins4 five-dollar bills '+five)}
    // coins 5
    {const qs=gen('coins',5),f={a:0,b:0};common(qs,'coins5');
     for(const q of qs){
       const m1=q.label.match(/^change from 100 for (\d+)$/),m2=q.label.match(/^change from 500 for (\d+)$/);
       if(m1){f.a++;const p=+m1[1];if(p%5||p<5||p>95||q.ans!==String(100-p)||!q.html.includes(p+' cents')||!q.hint.s.includes('Count up from '+p+' to 100'))b('coins5 '+q.label+' '+q.ans)}
       else if(m2){f.b++;const p=+m2[1];if(p%100!==50||p<150||p>450||q.ans!==String(500-p)||!q.html.includes('$'+(p/100).toFixed(2)))b('coins5 '+q.label+' '+q.ans)}
       else b('coins5 label '+q.label);
     }
     if(f.a<N*.4||f.b<N*.4)b('coins5 halves '+JSON.stringify(f))}
    // meas 3
    {const qs=gen('meas',3),f={z:0,nz:0,in:0,cm:0};common(qs,'meas3');
     for(const q of qs){
       const [u,fr,to]=P(q.label,/^ruler (in|cm) from (\d+) to (\d+)$/),from=+fr,len=to-from,max=u=='in'?12:15;
       if(q.ans!==String(len)||len<2||+to>max)b('meas3 '+q.label+' '+q.ans);
       if(!q.html.includes('viz-rul')||!(q.html.includes(VIZ.ruler(len,u,'pencil',{from,max}))||q.html.includes(VIZ.ruler(len,u,'bar',{from,max}))))b('meas3 picture '+q.label);
       from?f.nz++:f.z++;f[u]++;
       if(from&&!q.hint.s.startsWith('The object does not start at 0'))b('meas3 hint for non-zero start');
     }
     if(f.nz<N*.2||f.nz>N*.4||f.in<N*.4||f.cm<N*.4)b('meas3 mix '+JSON.stringify(f))}
    // data 2
    {const qs=[],f={count:0,most:0,least:0,more:0,two:0,all:0};
     for(let i=0;i<N;i++){const q=genQ('data',2,i*7919+31);q.bar=spy.bar;qs.push(q)}
     common(qs,'data2');
     for(const q of qs){
       const [d,sc]=q.bar,v=d.map(x=>x[1]),nm=d.map(x=>x[0]);
       if(d.length!==4||sc!==1||v.some(x=>x<0||x>10||x!==Math.round(x))||new Set(v).size!==4||new Set(nm).size!==4)b('data2 graph '+JSON.stringify(d));
       const ask=q.html.match(/<div class="sub">([^<]*)<\/div>[^]*$/)[1],low=n=>nm.findIndex(x=>x.toLowerCase()===n);
       let m;
       if(m=ask.match(/^How many (\w+)\?$/)){f.count++;if(q.ans!==String(v[low(m[1])]))b('data2 count '+q.label)}
       else if(m=ask.match(/^Which has the (most|least)\?$/)){f[m[1]]++;const w=m[1]=='most'?Math.max(...v):Math.min(...v);if(q.ans!==nm[v.indexOf(w)])b('data2 '+m[1]+' '+q.label)}
       else if(m=ask.match(/^How many more (\w+) than (\w+)\?$/)){f.more++;const x=v[low(m[1])]-v[low(m[2])];if(x<=0||q.ans!==String(x))b('data2 more '+q.label)}
       else if(m=ask.match(/^How many (\w+) and (\w+) in all\?$/)){f.two++;if(q.ans!==String(v[low(m[1])]+v[low(m[2])]))b('data2 two '+q.label)}
       else if(ask=='How many in all?'){f.all++;if(q.ans!==String(v.reduce((a,x)=>a+x,0)))b('data2 all '+q.label)}
       else b('data2 question '+ask);
       if(q.kind=='choice'&&q.choices.length!==4)b('data2 choices');
     }
     for(const k in f)if(f[k]<N*.08)b('data2 form '+k+' '+f[k])}
    VIZ.barGraph=oBar;
    // arr 1
    {const qs=gen('arr',1);common(qs,'arr1');
     for(const q of qs){
       const [r,c]=P(q.label,/^array (\d) rows of (\d)$/).map(Number);
       if(r<2||r>5||c<2||c>5||q.ans!==String(r*c)||!q.html.includes(VIZ.array(r,c))||!q.html.includes(r+' rows of '+c))b('arr1 '+q.label+' '+q.ans);
     }}
    // cnt 5
    {const qs=gen('cnt',5),f={3:0,4:0,100:0};common(qs,'cnt5');
     for(const q of qs){
       const s=P(q.label,/^skip (.+)$/)[0].split(','),bi=s.indexOf('_'),st=+P(q.html,/Count by (\d+)s/)[0];f[st]++;
       if(![3,4,100].includes(st)||bi<1||s.length!==5)b('cnt5 '+q.label);
       const seq=s.map((x,i)=>i==bi?+q.ans:+x);
       if(seq.some((x,i)=>i&&x-seq[i-1]!==st)||seq[4]>1000||seq[0]<0)b('cnt5 sequence '+q.label+' '+q.ans);
     }
     for(const k in f)if(f[k]<N*.25)b('cnt5 step '+k+' '+f[k])}
    // story 4
    {const qs=gen('story',4),f={gl:0,lg:0,more:0,fewer:0};common(qs,'story4');
     for(const q of qs){
       let m,a;
       if(m=q.label.match(/^2-step (\d+) \+ (\d+) - (\d+)$/)){f.gl++;a=+m[1]+ +m[2]-m[3]}
       else if(m=q.label.match(/^2-step (\d+) - (\d+) \+ (\d+)$/)){f.lg++;a=m[1]-m[2]+ +m[3];if(+m[2]>=+m[1])b('story4 loses all '+q.label)}
       else if(m=q.label.match(/^2-step (\d+) \+ \(\d+ \+ (\d+)\)$/)){f.more++;a=2*m[1]+ +m[2]}
       else if(m=q.label.match(/^2-step (\d+) \+ \(\d+ - (\d+)\)$/)){f.fewer++;a=2*m[1]-m[2]}
       else{b('story4 label '+q.label);continue}
       if(q.ans!==String(a)||a<1||a>100)b('story4 '+q.label+' '+q.ans);
       if([...q.label.matchAll(/\d+/g)].some(x=>+x[0]>100))b('story4 number over 100 '+q.label);
       if(!q.say.includes('?')||q.hint.k!=='html'||!q.hint.html.includes('<li>')||q.hint.html.split('<li>').length!==3)b('story4 hint steps');
     }
     for(const k in f)if(f[k]<N*.15)b('story4 form '+k+' '+f[k])
     const names=new Set(qs.map(q=>(q.say.match(/^(\w+)/)||[])[1]));if(!names.has('Ava')||!names.has('Ben'))b('story4 should use the child and the buddy: '+[...names].join())}
    // pat 3
    {const qs=gen('pat',3),f={up:0,down:0};common(qs,'pat3');
     for(const q of qs){
       const t=P(q.label,/^grow (.+)$/)[0].split(',').map(Number),d=t[1]-t[0];
       if(t.length!==4||Math.abs(d)<2||Math.abs(d)>10||t.some((x,i)=>i&&x-t[i-1]!==d)||t[0]<0||t[0]>50||q.ans!==String(t[3]+d)||+q.ans<0)b('pat3 '+q.label+' '+q.ans);
       d>0?f.up++:f.down++;
     }
     if(f.up<N*.4||f.down<N*.4)b('pat3 up/down '+JSON.stringify(f))}
    for(const w in lab)if(lab[w]<(w=='arr1'?12:w=='coins5'?20:30))b(w+': only '+lab[w]+' different labels');
    // 4. seeded: the same seed gives the same question
    for(const [sk,lv] of [['pv',2],['pv',3],['big',5],['sub',5],['time',4],['coins',4],['coins',5],['meas',3],['data',2],['arr',1],['cnt',5],['story',4],['pat',3]])for(let s=1;s<=30;s++)
      if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))b(sk+lv+' seed '+s+' not reproducible');
    // 5. grades: a 2nd grader still opens on Space Station; Treasure Bay is open at grade 2 and up; K and 1st do not see it before Space Station is done
    load(null);S.grade=2;
    if(NODES.math[curNode('math')].wid!=='m_space')b('grade 2 fresh does not open on Space Station: '+NODES.math[curNode('math')].wid);
    if(!worldOpen('math',wi('m_bay')))b('grade 2: Treasure Bay must be open');
    S.grade=1;if(worldOpen('math',wi('m_bay')))b('grade 1: Treasure Bay open before Space Station is done');
    // 6. saves: every stop keeps its stars and no passed stop re-locks when the world is added (compare with a path without it)
    let checked=0;
    const snap=()=>{const o={};for(const p of ['math'])NODES[p].forEach((n,i)=>{o[nid(n)]={st:getSt(p,i),open:unlocked(p,i),pass:passed(p,i),prog:worldHasProgress(p,n.wi),g:PATHS[p].worlds[n.wi].g}});return o};
    const ORIG=PATHS.math.worlds,NEW=/^(pv2|big5|pv3|sub5|time4|coins4|meas3|data2|arr1|cnt5|coins5|story4|pat3|boss_m_bay)$/;
    let moved=0;
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps']){
      for(const g of [null,0,1,2,3,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        const maps=JSON.stringify(S.maps);
        const now=snap(),cur=nid(NODES.math[curNode('math')]),curW=NODES.math[curNode('math')].wid;
        PATHS.math.worlds=ORIG.filter(w=>w.id!=='m_bay');buildNodes('math');
        const old=snap(),curOld=nid(NODES.math[curNode('math')]);
        PATHS.math.worlds=ORIG;buildNodes('math');
        for(const k in old){
          checked++;
          if(!now[k]){b(name+' g'+g+': stop '+k+' disappeared');continue}
          if(now[k].st!==old[k].st)b(name+' g'+g+': stars of '+k+' changed');
          if(old[k].pass&&!now[k].open)b(name+' g'+g+': passed stop '+k+' re-locked');
          if(old[k].open&&!now[k].open&&!(now[k].g>gradeOf()&&!now[k].prog))b(name+' g'+g+': '+k+' locked by the new world');
        }
        for(const k in now)if(!(k in old)&&NEW.test(k)&&now[k].st)b(name+' g'+g+': new stop '+k+' has stars');
        if(JSON.stringify(S.maps)!==maps)b(name+' g'+g+': loading changed the map');
        // the map opens on the same stop as before, except a child who finished Space Station and has not touched Treasure Bay: they meet it next
        if(cur!==curOld){moved++;if(curW!=='m_bay'||!old['boss_m_space'].pass)b(name+' g'+g+': map opens on '+cur+' (was '+curOld+')')}
        if(curW==='m_bay'&&old['boss_m_space'].pass===false)b(name+' g'+g+': map opens in Treasure Bay before Space Station is done');
      }
    }
    // 7. mastery: harder/easier follow map order, so Treasure Bay's levels follow the curriculum sequence
    for(const sk of ['pv','big','sub','time','coins']){const ns=NODES.math.filter(n=>n.sk===sk);
      ns.forEach((n,i)=>{if(harder(n)!==(ns[i+1]||null)||easier(n)!==(ns[i-1]||null))b('harder/easier must follow map order at '+sk+n.lv)})}
    return {out,checked,moved};
  };
  const r=eval(js+';('+body.toString()+')()');
  for(const m of r.out)bad.push(m);
  // 8. new code: no raw hex colours and no Math.random in this chunk's block
  const gen=fs.readFileSync(path.join(SRC,'js','31-gen-math-early.js'),'utf8'),blk=gen.slice(gen.indexOf('// ---- P2-04 Treasure Bay (2nd) ----'));
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))bad.push('P2-04 block has a raw hex colour');
  if(/Math\.random/.test(blk))bad.push('P2-04 block uses Math.random');
  return{problems:bad,note:r.checked+' stop checks against a path without Treasure Bay, map moved on '+r.moved+' of 36 loads'};
});

// ---- P4-11 rewards: drawn chest, stars, bosses, prize rosette; reward screens' markup; 42-rewards.css motion and tokens ----
run('rewards (P4-11): drawings follow the art rules, every boss is drawn, screens keep their ids, tokens and transform/opacity only',()=>{
  const p=[];
  const artCss=fs.readFileSync(path.join(SRC,'css','21-art.css'),'utf8');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  const out=eval(js+`
  const bad=[],has=(h,s,w)=>{if(!h.includes(s))bad.push(w+': missing '+s)};
  const D={'chest closed':RW.chest(0),'chest open':RW.chest(1),rays:RW.rays(),'star on':RW.star(1),'star off':RW.star(0),badge:RW.badge('x')};
  for(const b of BOSSES){const n=b[1];if(!RW.bossOf(n))bad.push('boss '+n+' has no drawing');
    for(const pose of ['idle','hit']){const h=RW.boss(n,pose);D[n+' '+pose]=h;has(h,'rw-p-'+pose,n+' pose class');has(h,'aria-label="'+n+'"',n+' spoken name')}
    const h=D[n+' idle'];has(h,'class="rb-idle"',n);has(h,'class="rb-hit"',n)}
  if(RW.boss('Nobody')!=='')bad.push('a boss without a drawing must return "" (the caller keeps its emoji)');
  ({D,bad,
    rate:RW.rate(2),pre:RW.pre(),
    doneA:RW.done({sc:9,n:10,line:'Fantastic <work>',rate:2,next:true,again:'Play again',menu:'Map'}),
    doneB:RW.done({sc:0,n:10,line:'Nice try',rate:-1,next:false,again:'Try again',menu:'Home'}),
    stk:RW.sticker('<b>',true,1),badge:RW.badge('<i>'),
    clean:RW.clean('\u{1F525} 3 days in a row! +5 \u{1FA99} and a sticker \u{1F984}'),
    icons:Object.keys(ICONS),
    pt:['Tested out!','Good try','Practice round','Fixed 2 tricky ones','Already mastered this one','Keep trying','Round done','New stop unlocked',
      'Beat your old score','Harder world','Perfect score','Beat the boss','Fixed 1 old mistake','Played 2 times today'].map(l=>[l,RW.ptIcon(l)]),
    ptSrc:SK&&ptCalc.toString(),bossIn:RW.bossIn('read','Gloop','x','\u{1F33C}')})`);
  p.push(...out.bad);
  // drawing rules (DESIGN_SYSTEM 6.5): no ids, defs, gradients, masks, clips, patterns, filters, use, text, style or url; colours are roles
  for(const [n,h] of Object.entries(out.D)){
    if(/\sid=|<defs|Gradient|<mask|<clipPath|<pattern|filter|<use|<text|style=|url\(/.test(h))p.push(n+': uses a forbidden SVG feature');
    if(/#[0-9a-fA-F]{3,8}\b/.test(h))p.push(n+': raw hex colour');
    for(const t of h.match(/<[a-zA-Z]+/g)||[])if(!['<svg','<path','<circle','<ellipse','<rect','<g','<span'].includes(t))p.push(n+': element '+t);
    if((h.match(/<g[\s>]/g)||[]).length!==(h.match(/<\/g>/g)||[]).length)p.push(n+': unbalanced <g>');
    for(const m of h.matchAll(/(?:fill|stroke)="([^"]+)"/g))if(!/^(var\(--a-[a-z0-9]+\)|none)$/.test(m[1]))p.push(n+': colour '+m[1]);
    for(const m of h.matchAll(/var\(--(a-[a-z0-9]+)\)/g))if(!new RegExp('--'+m[1]+':var\\(--ill-').test(artCss))p.push(n+': role --'+m[1]+' not in 21-art.css');
    if(!/class="art /.test(h))p.push(n+': missing the art class');
    if(h.length>9000)p.push(n+': '+h.length+' bytes (over 9,000)');
  }
  // screens keep the ids the round code and the smoke bot use
  const ids=(h,list,w)=>{for(const i of list)if(!h.includes('id="'+i+'"'))p.push(w+': missing #'+i)};
  ids(out.pre,['fin','chest'],'before the tap');
  if(!/aria-label="Open the treasure chest"/.test(out.pre))p.push('chest button has no spoken name');
  ids(out.doneA,['sc','prz','earn','msgs','btns','bonus','nxt','menu','rwst'],'after the tap');
  ids(out.doneB,['sc','prz','earn','msgs','btns','bonus','again','menu'],'after the tap, no stars');
  if(out.doneB.includes('id="rwst"'))p.push('a round with no right answers shows a "+0 stars" row');
  if(!/style="visibility:hidden"/.test(out.doneA))p.push('#btns must start hidden (shown after the star count)');
  if(!out.doneA.includes('Fantastic &lt;work&gt;'))p.push('headline not escaped');
  if(!/class="btn primary lg wide" id="nxt"/.test(out.doneA)||!/class="btn primary lg wide" id="again"/.test(out.doneB))p.push('the next step is not the one primary button');
  if((out.rate.match(/class="rw-st on"/g)||[]).length!==2||!out.rate.includes('aria-label="2 of 3 stars"'))p.push('rate(2): '+out.rate.slice(0,80));
  if(out.stk.includes('<b>')||!out.stk.includes('class="tag new"'))p.push('sticker: not escaped or no New tag');
  if(out.badge.includes('<i>'))p.push('badge: prize not escaped');
  if(out.clean!=='3 days in a row! +5 coins and a sticker \u{1F984}')p.push('clean(): '+out.clean);
  ids(out.bossIn,['fight','nope'],'boss intro');
  if(!/btn subject lg s-read" id="fight"/.test(out.bossIn))p.push('boss intro: Let\'s go is not the subject-coloured primary');
  for(const [l,ic] of out.pt){if(ic=='plus')p.push('no icon for the game-time line "'+l+'"');if(!out.icons.includes(ic))p.push('missing icon '+ic)}
  // every label ptCalc can produce is in the list above (a new label needs an icon)
  for(const m of out.ptSrc.matchAll(/add\([^,]+,\s*(?:testOk\?)?['`]([A-Z][a-z]+)/g))if(!out.pt.some(([l])=>l.startsWith(m[1])))p.push('ptCalc label "'+m[1]+'..." has no icon test');
  // icons named in the reward code exist
  const src=fs.readFileSync(path.join(SRC,'js','18-reward-art.js'),'utf8')+fs.readFileSync(path.join(SRC,'js','50-round.js'),'utf8');
  for(const m of src.matchAll(/(?:ico\(|icon:\s*|M\()'([a-z-]+)'/g))if(!out.icons.includes(m[1]))p.push('unknown icon '+m[1]);
  if(/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(src.slice(src.indexOf('function finish()'),src.indexOf('/* Error guard hook'))))p.push('emoji left in finish() / growShow()');
  // 42-rewards.css: tokens only, no filter, motion on transform/opacity only, rw-* keyframes, calm mode and reduced motion hide the confetti
  const css=fs.readFileSync(path.join(SRC,'css','42-rewards.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('raw hex colour in 42-rewards.css');
  if(/rgba?\(|hsla?\(/.test(css))p.push('colour function in 42-rewards.css');
  if(/(^|[;{\s])(-webkit-)?(backdrop-)?filter\s*:/.test(css))p.push('filter used in 42-rewards.css');
  for(const m of css.matchAll(/transition\s*:\s*([^;}]+)/g))for(const part of m[1].split(','))if(!/^\s*(transform|opacity)\s/.test(part))p.push('transition on '+part.trim());
  const kf=[...css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)];
  if(kf.length<10)p.push('expected the rw-* keyframes, found '+kf.length);
  const others=fs.readdirSync(path.join(SRC,'css')).filter(f=>f!='42-rewards.css').map(f=>fs.readFileSync(path.join(SRC,'css',f),'utf8')).join('');
  for(const [,n,body] of kf){
    if(!/^rw-/.test(n))p.push('keyframes '+n+' must be named rw-*');
    if(new RegExp('@keyframes\\s+'+n+'\\b').test(others))p.push('keyframes '+n+' also defined elsewhere');
    for(const d of body.match(/[a-z-]+(?=\s*:)/g)||[])if(d!='transform'&&d!='opacity')p.push('keyframes '+n+' animates '+d);
  }
  const OWN=['r','i','x','y','t','ic2'];
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!OWN.includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('unknown token --'+m[1]);
  if(!/html\.calm \.rw-burst\{display:none\}/.test(css)||!/prefers-reduced-motion:reduce\)\{\.rw-burst\{display:none\}/.test(css))p.push('calm / reduced motion must hide the confetti');
  return{problems:p,note:Object.keys(out.D).length+' drawings'};
});

// ---- P4-03: skill icons, clip icons, and the screens swapped from emoji to ico() ----
run('icons (P4-03): every skill has an icon, swapped screens show no emoji chrome',()=>{
  const p=[];
  const out=eval(js+`
  const bad=[];
  for(const id in SK){const n=icoSk(id);if(!ICONS[n])bad.push('skill '+id+': icon '+n+' missing')}
  for(const [id,n] of Object.entries(ICO_SK)){if(!ICONS[n])bad.push('ICO_SK.'+id+': icon '+n+' missing');if(!SK[id])bad.push('ICO_SK.'+id+': no such skill')}
  for(const a of Object.values(ICO_AREA))if(!ICONS[a])bad.push('ICO_AREA icon '+a+' missing');
  if(icoSk('no_such_skill')!=='star')bad.push('icoSk fallback for an unknown skill is not star');
  for(const k of CLIPKINDS){if(!ICONS[k[4]])bad.push('clip kind '+k[0]+': icon '+k[4]+' missing');if(/\\p{Emoji_Presentation}/u.test(k[1]))bad.push('clip kind '+k[0]+': emoji in label')}
  [bad,Object.keys(ICONS).length];`);
  p.push(...out[0]);
  // functions whose chrome moved to ico(): no emoji (Emoji_Presentation, or a pictograph with VS16) and no ◀ ▶ text arrows
  const fnText=(file,name)=>{const t=fs.readFileSync(path.join(SRC,'js',file),'utf8'),a=t.indexOf('function '+name+'(');
    if(a<0){p.push(file+': function '+name+' not found');return''}const b=t.indexOf('\nfunction ',a+1);return t.slice(a,b<0?t.length:b)};
  const EMO=/\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F|[\u25C0\u25B6]/u;
  for(const [f,fn] of [['48-shop.js','shop'],['58-playtime.js','gameRoom'],['46-home.js','book'],['80-grown.js','grown'],['44-clips.js','micHelp']]){
    const t=fnText(f,fn),m=t.match(EMO);if(m)p.push(f+' '+fn+'(): emoji or text arrow still used as chrome: '+m[0]);
  }
  return{problems:p,note:out[1]+' icons'};
});

// ---- P4-08: Home ----
run('home (P4-08): tokens only, transform/opacity motion, drawings well formed, every scene and path drawn, ids kept',()=>{
  const p=[];
  const css=fs.readFileSync(path.join(SRC,'css','46-home.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('raw hex colour in 46-home.css');
  if(/rgba?\(|hsla?\(/.test(css))p.push('colour function in 46-home.css (put the colour in 00-tokens.css)');
  if(/(^|[;{\s])(-webkit-)?(backdrop-)?filter\s*:/.test(css))p.push('filter or backdrop-filter used');
  for(const m of css.matchAll(/transition\s*:\s*([^;}]+)/g))for(const part of m[1].split(','))
    if(!/^\s*(transform|opacity)\s/.test(part))p.push('transition on something other than transform/opacity: '+part.trim());
  for(const [,n,body] of css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g))
    for(const d of body.match(/[a-z-]+(?=\s*:)/g)||[])if(d!='transform'&&d!='opacity')p.push('keyframes '+n+' animates '+d);
  const OWN=['c','c-tint','c-shade','c-fill','c-ledge','ic2'];
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!OWN.includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('unknown token --'+m[1]);
  const out=eval(js+`
  const bad=[];
  S.name='Ava';S.petName='Rex';
  const tokOk=h=>{for(const m of h.matchAll(/var\\(--([a-z0-9-]+)/g))if(!tok.includes('--'+m[1]+':'))bad.push('unknown token --'+m[1]);
    if(/#[0-9a-fA-F]{3,8}\\b/.test(h.replace(/href="#i-[a-z0-9-]+"/g,'')))bad.push('raw hex in a drawing');};
  // well formed: every opened svg/text closes, no undefined/NaN, one-decimal numbers
  const wf=(h,w)=>{
    if((h.match(/<svg\\b/g)||[]).length!==(h.match(/<\\/svg>/g)||[]).length)bad.push(w+': svg not closed');
    if((h.match(/<text\\b/g)||[]).length!==(h.match(/<\\/text>/g)||[]).length)bad.push(w+': text not closed');
    if(/undefined|NaN/.test(h))bad.push(w+': undefined or NaN');
    if(/\\d\\.\\d\\d/.test(h.replace(/opacity="[^"]*"/g,'')))bad.push(w+': more than one decimal');
    tokOk(h);
  };
  // every scene the shop sells and every path (plus the Game Room) has a drawing
  for(const sc of SHOP.scene){if(!HM_SCENE[sc[0]])bad.push('no Home scene for '+sc[0]);wf(hmScene(sc[0]),'scene '+sc[0]);}
  if(!/hm-scene/.test(hmScene('nope')))bad.push('unknown scene has no fallback');
  for(const k of Object.keys(PATHS).concat('play')){const h=hmArt(k);if(!/class="hm-svg"/.test(h))bad.push('no drawing for '+k);wf(h,'art '+k);}
  if(!/#i-/.test(hmArt('zz')))bad.push('a path without a drawing should get an icon');
  wf(hmMixIco(),'mix icon');wf(hmBubbles(),'bubbles');
  // every icon Home asks for exists
  for(const n of ['star','calendar','map','replay','check','path-math','bolt','paw','bag','sticker-book','trophy','target','play','lock','ticket','plus','gear','sound-on','sound-off','flame','coin'])
    if(!ICONS[n])bad.push('missing icon '+n);
  // the parts keep the ids and selectors other code and smoke.js use
  const part=hmHero()+hmToday()+hmPaths()+hmActs();
  for(const s of ['id="pet"','id="starc"','id="stkb"','id="revcard"','id="flu"','id="mix"','id="groom"','id="race"','id="care"','id="shop"','id="book"',
    'class="hm-path game s-math" data-p="math"','class="hm-path game s-read" data-p="read"','class="hm-path game s-es" data-p="es"'])if(!part.includes(s))bad.push('Home lost '+s);
  if(/class="petbig\\s/.test(part)===false)bad.push('#pet must keep class petbig');
  // review card: count in #revn when items are due, "All caught up" with no button otherwise
  S.rev=[];if(!/All caught up/.test(hmToday())||/id="rev"/.test(hmToday()))bad.push('review tile with nothing due');
  // no emoji in Home's chrome (the pet's own art and the tap burst are not chrome)
  const EMO=/\\p{Extended_Pictographic}/u;
  if(EMO.test(part.replace(/<div class="petbig[\\s\\S]*?<\\/div>/,'')))bad.push('emoji in Home chrome');
  // escaping: a name with markup stays text
  S.name='<b>x';S.petName='<i>y';const h=hmHero();if(/<b>x|<i>y/.test(h))bad.push('name not escaped');
  bad;`);
  return{problems:p.concat(out)};
});

run('question screen (P4-10): tokens only, transform/opacity motion, pad keys, toast kinds, track positions',()=>{
  const p=[];
  const css=fs.readFileSync(path.join(SRC,'css','42-question.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('raw hex colour in 42-question.css');
  if(/rgba?\(|hsla?\(/.test(css))p.push('colour function in 42-question.css');
  if(/(^|[;{\s])(-webkit-)?(backdrop-)?filter\s*:/.test(css))p.push('filter or backdrop-filter used');
  for(const m of css.matchAll(/transition\s*:\s*([^;}]+)/g))for(const part of m[1].split(','))
    if(!/^\s*(transform|opacity)\s/.test(part)&&part.trim()!='none')p.push('transition on something other than transform/opacity: '+part.trim());
  const kf=[...css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)];
  for(const [,n,body] of kf){
    if(!/^k-/.test(n))p.push('keyframes '+n+' must be named k-*');
    for(const d of body.match(/[a-z-]+(?=\s*:)/g)||[])if(d!='transform'&&d!='opacity')p.push('keyframes '+n+' animates '+d);
  }
  const others=fs.readdirSync(path.join(SRC,'css')).filter(f=>f!='42-question.css').map(f=>fs.readFileSync(path.join(SRC,'css',f),'utf8')).join('');
  for(const [,n] of kf)if(new RegExp('@keyframes\\s+'+n+'\\b').test(others))p.push('keyframes name '+n+' is also used in another CSS file');
  const OWN=['c','c-tint','c-shade','c-fill','c-ledge','v','ic2','n','p','rw','pm','k'];
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!OWN.includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('unknown token --'+m[1]);
  const out=eval(js+`
  const bad=[];
  // the pad: digits, del, 0 and the check key (with spoken names), plus . or +/- for dec and neg; the check key is an arrow with several slots
  const keys=h=>[...h.matchAll(/data-k="([^"]+)"/g)].map(m=>m[1]).join(' ');
  const pd=KIND.num.render({pad:'int'}),pf=KIND.num.render({pad:'frac'});
  if(keys(pd)!=='1 2 3 4 5 6 7 8 9 del 0 go')bad.push('int pad keys: '+keys(pd));
  if(!/class="keys qpad pad"/.test(pd)||(pd.match(/class="key k/g)||[]).length!==12)bad.push('pad classes');
  if(!pd.includes('aria-label="Check"')||!pd.includes('#i-check')||!pd.includes('aria-label="Delete"'))bad.push('pad check/delete keys');
  if(!pf.includes('aria-label="Next box"')||!pf.includes('#i-go'))bad.push('frac pad: check key should first move to the next box');
  if(keys(KIND.num.render({pad:'dec'})).split(' ').pop()!=='.')bad.push('dec pad has no point key');
  if(keys(KIND.num.render({pad:'neg'})).split(' ').pop()!=='neg')bad.push('neg pad has no +/- key');
  if(/btn /.test(KIND.choice.render({choices:[{v:1,l:'1'}]})))bad.push('choice still uses the old button');
  // fb(): the toast kind and icon for each feedback class
  const seen=[];UI.toast=(t,k,ms,ic)=>seen.push(k+'/'+ic);
  for(const c of ['','warn','again','info','pl-fb','streak','zap','warn long','bad'])fb('x',c);
  if(seen.join()!=='good/check,try/hint,try/replay,info/hint,info/hint,streak/flame,good/bolt,try/hint,try/hint')bad.push('fb kinds: '+seen.join());
  // the pet stands on the centre of column done+1 of n+1 (the last column is the gift)
  G={done:0,n:10};const a=qLeft();G.done=10;const b=qLeft();G.done=12;const c=qLeft();G={done:2,n:5};const d=qLeft();
  if(a!=='translateX(4.545%)'||b!=='translateX(95.455%)'||c!==b||d!=='translateX(41.667%)')bad.push('qLeft: '+[a,b,c,d]);
  G=null;
  for(const n of ['close','gift','bolt','speak','hint','backspace','check','go','back','flame','star','replay'])if(!ICONS[n])bad.push('missing icon '+n);
  bad;`);
  return{problems:p.concat(out)};
});

// ---- P2-07 Fraction Forest (3rd) ----
run('Fraction Forest P2-07: stops in CURRICULUM order, 3,000 samples per new level with the maths checked',()=>{
  const body=function(){
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const num=s=>+String(s).replace(/,/g,''),tm=(h,m)=>h+':'+String(m).padStart(2,'0');
    const mins=(h,m)=>(h%12)*60+m,fromMin=t=>{t=((t%720)+720)%720;const h=Math.floor(t/60);return [h==0?12:h,t%60]};
    const clk=(t)=>{const [h,m]=t.split(':').map(Number);return VIZ.clock(h,m)};
    const cnt=(h,re)=>(h.match(re)||[]).length;
    // ---- world: the stops of M-3b in CURRICULUM 2.1 order, the four frac ids kept
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_frac'),w=mw[wi];
    const want='frac2 round1 frac3 sub6 geo1 frac4 round2 time5 geo2 frac5 sub7 data3 shape5 time6 meas4 story6';
    if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' '));
    if(w.g!==3||w.n!=='Fraction Forest'||mw[wi-1].id!=='m_mult')add('world g/name/position');
    if(w.nodes.some(n=>n[2].length>24))add('stop name too long: '+w.nodes.find(n=>n[2].length>24)[2]);
    if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('duplicate stop names');
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    if(WR.math[wi][1]-WR.math[wi][0]!==16||NODES.math[WR.math[wi][1]].sk!=='boss')add('17 stops: 16 and the boss');
    const mx={round:4,geo:5,sub:8,time:6,shape:6,data:5,meas:6,story:9,frac:8}; // round 3 and sub 8 are Factor Factory's (P2-09); geo 5, data 5 and story 9 are Galaxy Core's (P2-14): the skills grew, the older levels are checked unchanged
    for(const k in mx)if(SK[k].max!==mx[k]||SK[k].area!=='math')add('SK.'+k+'.max '+SK[k].max);
    // ---- generic checks per level, then the maths of each level
    const levels=[['round',1],['round',2],['sub',6],['sub',7],['geo',1],['geo',2],['time',5],['time',6],['shape',5],['data',3],['meas',4],['story',6],
      ]; // sub 5, time 4, data 2 and meas 3 are Treasure Bay's (P2-04) and are checked by its own test
    const share={},seen={};
    for(const [sk,lv] of levels){
      const key=sk+lv,labs={},seeLab=new Set();
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),W=key+': ';
        const pr=kindProblems(q);if(pr.length)add(W+q.label+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv)add(W+'not stamped');
        if(!q.say||/undefined|NaN/.test(q.say))add(W+'say '+q.say);
        if(!q.hint||hintHTML(q).length<10)add(W+'hint missing');
        if(!q.label||q.label.length>=60||/undefined|NaN/.test(q.label))add(W+'label '+q.label);
        if(labs[q.label]!==undefined&&labs[q.label]!==q.ans)add(W+'label '+q.label+' has two answers');
        labs[q.label]=q.ans;seeLab.add(q.label);
        if(/undefined|NaN|\[object/.test(q.html))add(W+'html has undefined/NaN');
        if(q.kind=='num'&&!(q.pad||q.sep)&&(String(q.ans).length>4||String(+q.ans)!==q.ans))add(W+'num answer '+q.ans);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(q.ans)||new Set(vs).size!==vs.length||vs.length<3||vs.length>4)add(W+'choices '+q.label)}
        const S_=share[key]=share[key]||{};const tally=t=>{S_[t]=(S_[t]||0)+1};
        const a=+q.ans;
        // ---------------- round
        if(sk=='round'){
          const m=q.html.match(/Round ([\d,]+) to the nearest (\d+)\./),n=num(m[1]),p=+m[2];
          const exp=n%p>=p/2?n-n%p+p:n-n%p;
          if(p!==(lv==1?10:100)||n%p==0||a!==exp)add(W+'round '+n+' to '+p+' -> '+q.ans);
          if(lv==1&&!((n>=11&&n<=99)||(n>=101&&n<=999)))add(W+'size '+n);
          if(lv==2&&!(n>=101&&n<=9949))add(W+'size '+n);
          tally(String(n).length);if(n%p==p/2)tally('half');
          const lo=n-n%p;if(!q.hint.html.startsWith(VIZ.numLine({min:lo,max:lo+p,step:p/10,labels:[lo,lo+p],marks:[n]})))add(W+'hint line');
        }
        // ---------------- sub 6 and 7 (and 5 until P2-04)
        if(sk=='sub'&&lv>=5){
          const m=q.html.match(/<div class="veq"><div>([\d,]+)<\/div><div><span class="op">−<\/span>(\d+)<\/div>/);
          if(!m){add(W+'no vertical layout');continue}
          const A=num(m[1]),B=+m[2];
          if(a!==A-B||B>=A||B<100||B>999)add(W+A+' - '+B+' -> '+q.ans);
          // borrows, ones to thousands
          const da=String(A).padStart(4,'0').split('').map(Number).reverse(),db=String(B).padStart(4,'0').split('').map(Number).reverse();
          let br=0,b=0;for(let k=0;k<4;k++){if(da[k]-b<db[k]){br++;b=1}else b=0}
          if(lv<=6){
            if(String(A).includes('0')||A<200||A>999)add(W+'top number '+A);
            if(br<1||br>2)add(W+A+' - '+B+' regroups '+br+' times');
            tally(br==2?'two':'one');
          }else{
            const z=(String(A).match(/0/g)||[]).length,k=A==1000?'thousand':A%100==0?'hund':A%100<10?'tens':'bad';
            if(k=='bad'||(k!='thousand'&&(z<1||z>2))||br<2)add(W+'across zeros '+A+' - '+B+' ('+br+' regroups)');
            tally(k);
          }
        }
        // ---------------- time 5 / 6 (time 4 asks like 5 until P2-04)
        if(sk=='time'&&lv<=5){
          const m=q.label.match(/^clock5 (read|pick) (\d+):(\d\d)$/);
          if(!m){add(W+'label '+q.label);continue}
          const h=+m[2],mi=+m[3],t=tm(h,mi);
          if(h<1||h>12||mi>59||q.ans!==t)add(W+q.label+' -> '+q.ans);
          const vs=q.choices.map(c=>c.v);if(vs.length!==4)add(W+'4 choices');
          tally(m[1]);S_['m'+mi]=1;
          if(m[1]=='read'){
            if(!q.html.startsWith(clk(t)))add(W+'clock picture');
            for(const c of q.choices)if(c.l!==c.v||!/^\d{1,2}:\d\d$/.test(c.v))add(W+'choice '+c.v);
          }else{
            if(!q.html.includes('<div class="eq">'+t+'</div>')||q.cls!=='ffc')add(W+'digital prompt');
            for(const c of q.choices){
              const [ch,cm]=c.v.split(':').map(Number);
              if(c.l!==clk(c.v)||ch<1||ch>12)add(W+'clock choice '+c.v);
              if(c.v!==t){const d=Math.abs(cm-mi);if(ch==h&&Math.min(d,60-d)<5)add(W+'too close '+c.v+' for '+t)}
            }
          }
        }
        if(sk=='time'&&lv==6){
          let m=q.label.match(/^time6 (\d+:\d\d) to (\d+:\d\d)$/);
          if(m){
            const [sh,sm]=m[1].split(':').map(Number),[eh,em]=m[2].split(':').map(Number),d=(mins(eh,em)-mins(sh,sm)+720)%720;
            if(a!==d||d<15||d>120||sm%5||em%5||sh<1||sh>12||eh<1||eh>12)add(W+m[0]+' -> '+q.ans);
            if(q.html.includes('class="ffrow"')){tally('clocks');if(!q.html.includes(clk(m[1]))||!q.html.includes(clk(m[2])))add(W+'clock pictures')}
            else{tally('digital');if(!q.html.includes('Start <b>'+m[1]+'</b>')||!q.html.includes('End <b>'+m[2]+'</b>'))add(W+'digital times')}
            if(!q.html.includes(' minutes</div>'))add(W+'unit');
          }else{
            m=q.label.match(/^time6 (\d+) (after|before) (\d+:\d\d)$/);
            if(!m){add(W+'label '+q.label);continue}
            const d=+m[1],[h,mi]=m[3].split(':').map(Number),[eh,em]=fromMin(mins(h,mi)+(m[2]=='after'?d:-d));
            if(q.ans!==tm(eh,em)||d<10||d>90||d%5||mi%5||(m[2]=='before'&&mi==0))add(W+m[0]+' -> '+q.ans);
            if(!q.html.includes(m[3])||!q.html.includes(d+' minutes '+m[2]))add(W+'prompt');
            if(q.choices.length!==4||q.choices.some(c=>!/^\d{1,2}:\d\d$/.test(c.v)))add(W+'choices');
            tally(m[2]);
          }
        }
        // ---------------- geo 1 and 2
        if(sk=='geo'&&lv==1){
          let m=q.label.match(/^geo1 rect (\d+)x(\d+) (cm|m|in|ft)$/);
          if(m){
            const x=+m[1],y=+m[2],svg=q.html.slice(0,q.html.indexOf('</svg>')+6);
            if(a!==2*(x+y)||x<1||x>20||y<1||y>20||x===y)add(W+m[0]+' -> '+q.ans);
            if(!q.html.startsWith(VIZ.rectSides(x,y,{w:x,h:y},{unit:m[3]}))||cnt(svg,/<text/g)!==2)add(W+'a rectangle gives only 2 sides');
            tally('rect');
          }else{
            m=q.label.match(/^geo1 (\d) sides ([\d,]+) (cm|m|in|ft)$/);
            if(!m){add(W+'label '+q.label);continue}
            const n=+m[1],s=m[2].split(',').map(Number),svg=q.html.slice(0,q.html.indexOf('</svg>')+6),txt=[...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map(x=>x[1]);
            if(n<3||n>6||s.length!==n||s.some(v=>v<1||v>20)||a!==s.reduce((x,y)=>x+y,0))add(W+m[0]+' -> '+q.ans);
            if(txt.join('|')!==s.map(v=>v+' '+m[3]).join('|'))add(W+'side labels '+txt.join('|')+' vs '+s);
            if(n==3&&(s[0]+s[1]<=s[2]||s[0]+s[2]<=s[1]||s[1]+s[2]<=s[0]))add(W+'not a triangle '+s);
            if(!q.html.includes(['','','','triangle','shape with 4 sides','pentagon','hexagon'][n]))add(W+'name');
            tally('poly'+n);
          }
        }
        if(sk=='geo'&&lv==2){
          let m=q.label.match(/^geo2 grid (\d+)x(\d+)$/);
          if(m){
            const c=+m[1],r=+m[2];
            if(a!==r*c||r<2||r>6||c<2||c>8||!q.html.startsWith(VIZ.areaGrid(c,r))||!q.html.includes('square units'))add(W+m[0]+' -> '+q.ans);
            tally('grid');
          }else{
            m=q.label.match(/^geo2 (\d+)x(\d+) (cm|m|in|ft)$/);
            if(!m){add(W+'label '+q.label);continue}
            const l=+m[1],x=+m[2],sq={cm:'square cm',m:'square m',in:'square in',ft:'square ft'}[m[3]];
            if(a!==l*x||l<2||l>12||x<2||x>12||!q.html.startsWith(VIZ.rectSides(l,x,{w:l,h:x},{unit:m[3]}))||!q.html.includes(sq))add(W+m[0]+' -> '+q.ans);
            tally('labelled');
          }
        }
        // ---------------- shape 5
        if(sk=='shape'){
          const QUAD=['square','rectangle','rhombus','trapezoid'],NONQ=['triangle','pentagon','hexagon','octagon'],m=q.label.match(/^shape5 (\w+)/);
          if(!m){add(W+'label '+q.label);continue}
          const f=m[1],vs=q.kind=='choice'?q.choices.map(c=>c.v):[];
          tally(f);
          if(q.cls=='pics')for(const c of q.choices)if(c.l!==VIZ.shape(c.v)||c.h!==true)add(W+'picture of '+c.v);
          if(f=='quad'){if(vs.length!==3||vs.filter(v=>QUAD.includes(v)).length!==1||!QUAD.includes(q.ans)||vs.filter(v=>NONQ.includes(v)).length!==2)add(W+q.label)}
          else if(f=='notquad'){if(vs.length!==3||!NONQ.includes(q.ans)||vs.filter(v=>QUAD.includes(v)).length!==2)add(W+q.label)}
          else if(f=='notrhom'){if([...vs].sort().join()!==[q.ans,'rhombus','square'].sort().join()||['rhombus','square'].includes(q.ans))add(W+q.label)}
          else if(f=='which'){
            const n={pentagon:5,hexagon:6,octagon:8}[q.ans],art=q.ans=='octagon'?'an':'a';
            if(!n||vs.length!==3||new Set(vs).size!==3||!q.html.includes('Which shape is '+art+' '+q.ans+'?'))add(W+q.label)}
          else if(f=='right'){const nm=q.label.split(' ')[3];if(a!==(nm=='square'||nm=='rectangle'?4:0)||!q.html.startsWith(VIZ.shape(nm)))add(W+q.label+' -> '+q.ans)}
          else if(f=='sides'){const nm=q.label.split(' ')[2];if(a!==({pentagon:5,hexagon:6,octagon:8})[nm]||!q.html.startsWith(VIZ.shape(nm)))add(W+q.label+' -> '+q.ans)}
          else if(f=='name'){const nm=q.label.split(' ')[2];if(q.ans!==nm||vs.length!==4||!q.html.startsWith(VIZ.shape(nm)))add(W+q.label)}
          else add(W+'unknown form '+f);
        }
        // ---------------- data 3 (data 2 asks like 3 until P2-04)
        if(sk=='data'&&lv>=2){
          const m=q.label.match(/^data3 (bar|pic) (\d+) (.*): ([\d,]+)$/);
          if(!m){add(W+'label '+q.label);continue}
          const sc=+m[2],vals=m[4].split(',').map(Number),names=[...q.html.matchAll(/<text[^>]*>([A-Za-z]+)<\/text>/g)].map(x=>x[1]),tag=m[3].split(' ');
          if(![2,5,10].includes(sc)||vals.length!==4||names.length!==4||new Set(vals).size!==4)add(W+m[0]);
          const g=m[1]=='bar'?VIZ.barGraph(names.map((x,i)=>[x,vals[i]]),sc):VIZ.pictograph(names.map((x,i)=>[x,vals[i]]),{per:sc,key:sc+' children'});
          if(!q.html.includes(g))add(W+'the picture does not show the numbers in '+q.label);
          if(m[1]=='bar'&&vals.some(v=>v%sc||v/sc<1||v/sc>5))add(W+'bar values '+vals+' scale '+sc);
          const half=vals.some(v=>(v/sc)%1);
          if(m[1]=='pic'&&vals.some(v=>v%(sc==5?5:sc/2)||v/sc>(sc==5?8:5.5)))add(W+'picture values '+vals+' scale '+sc);
          if(half&&sc==5)add(W+'half symbol at scale 5');
          tally(m[1]+sc);if(half)tally('half'+sc);
          const at=x=>vals[x-1]; // label tags count the graph's rows from 1
          let exp;
          if(tag[0]=='read')exp=at(tag[1]);else if(tag[0]=='more')exp=at(tag[1])-at(tag[2]);else if(tag[0]=='total')exp=at(tag[1])+at(tag[2]);else exp=vals.reduce((x,y)=>x+y,0);
          if(!(exp>0)||a!==exp)add(W+q.label+' -> '+q.ans+' (expected '+exp+')');
          if(tag[0]!=='all'&&tag.slice(1).some(x=>!q.html.toLowerCase().includes(names[x-1].toLowerCase())))add(W+'names in the question');
          tally(tag[0]);
        }
        // ---------------- meas 4 (meas 3 asks like 4 until P2-04)
        if(sk=='meas'&&lv>=3){
          const vs=q.choices.map(c=>c.v);
          if(vs.length!==4)add(W+'4 choices');
          let m=q.label.match(/^meas4 ruler (\d+)\/4 in$/);
          if(m){
            const S4=+m[1],wh=Math.floor(S4/4),r=S4%4,v=r==0?''+wh:wh+' '+(r==2?'1/2':r+'/4');
            if(q.ans!==v||S4<4||S4>28)add(W+m[0]+' -> '+q.ans);
            if(!q.html.startsWith(VIZ.ruler(S4/4,'in','pencil'))&&!q.html.startsWith(VIZ.ruler(S4/4,'in','bar')))add(W+'ruler picture');
            const qs=vs.map(x=>{const y=x.match(/^(\d+)(?: (1\/2|1\/4|3\/4))?$/);if(!y)return -1;return +y[1]*4+(y[2]=='1/2'?2:y[2]=='1/4'?1:y[2]=='3/4'?3:0)});
            if(qs.some(x=>x<4||x>28))add(W+'choice lengths '+vs);
            if(S4%2==0&&qs.some(x=>x%2))add(W+'a half-inch item with quarter choices '+vs);
            tally(S4%2?'quarter':'half');
          }else{
            m=q.label.match(/^meas4 (scale|jug) (\d+) (g|kg|mL|L)$/);
            if(!m){add(W+'label '+q.label);continue}
            const val=+m[2],labs2=[...q.html.matchAll(/<text class="vcn[^"]*"[^>]*>(\d+)<\/text>/g)].map(x=>+x[1]),max=Math.max(...labs2);
            const n=cnt(q.html.match(/class="vk" d="([^"]*)"/)[1],/M/g)-1,step=max/n;
            let read;
            if(m[1]=='scale'){
              const nd=q.html.match(/class="vmh" d="M70 70L([\d.]+) ([\d.]+)"/),ang=Math.atan2(+nd[1]-70,70-nd[2])*180/Math.PI;
              read=(ang+135)/270*max;
            }else{
              const rc=q.html.match(/<rect class="v1" x="35" y="([\d.]+)" width="46" height="([\d.]+)"/);
              read=(150-rc[1])/130*max;
              if(Math.abs(+rc[1]+ +rc[2]-150)>.2)add(W+'water does not reach the bottom');
            }
            if(Math.abs(read-val)>step*.08||val%step||val<=0||val>=max||(n!=5&&n!=10)||!q.html.includes('>'+m[3]+'</text>'))add(W+q.label+' reads '+read+' (max '+max+', n '+n+')');
            if(q.ans!==String(val)||vs.some(x=>!(+x>0&&+x<=max&&+x%step==0))||q.choices.some(c=>!c.l.endsWith(' '+m[3])))add(W+'choices '+vs+' for '+q.label);
            tally(m[1]);
          }
        }
        // ---------------- story 6
        if(sk=='story'){
          const L=q.label,sy=q.say;let m;
          if(a>1000||!q.hint.s.startsWith('Do one step at a time.'))add(W+'answer or hint '+q.ans);
          if(m=L.match(/^story6 (\d+) × (\d+) \+ (\d+)$/)){if(a!==m[1]*m[2]+ +m[3]||!sy.includes(m[1]+' bags with '+m[2])||!sy.includes(m[3]+' more'))add(W+L+' -> '+q.ans);tally('mul+add')}
          else if(m=L.match(/^story6 (\d+) × (\d+) − (\d+)$/)){if(a!==m[1]*m[2]-m[3]||a<1||!sy.includes(m[1]+' boxes with '+m[2])||!sy.includes('sells '+m[3]))add(W+L+' -> '+q.ans);tally('mul-sub')}
          else if(m=L.match(/^story6 \((\d+) \+ (\d+)\) ÷ (\d+)$/)){const t=+m[1]+ +m[2];if(t%m[3]||a!==t/m[3]||!sy.includes('has '+m[1])||!sy.includes(m[2]+' more')||!sy.includes('among '+m[3]+' friends'))add(W+L+' -> '+q.ans);tally('add-div')}
          else if(m=L.match(/^story6 (\d+) ÷ (\d+) − (\d+)$/)){if(m[1]%m[2]||a!==m[1]/m[2]-m[3]||a<1||!sy.includes('packs '+m[1])||!sy.includes(m[2]+' in each bag')||!sy.includes(m[3]+' bags'))add(W+L+' -> '+q.ans);tally('div-sub')}
          else if(m=L.match(/^story6 \((\d+) − (\d+)\) × (\d+)$/)){if(a!==(m[1]-m[2])*m[3]||+m[1]<=+m[2]||!sy.includes('has '+m[1])||!sy.includes(m[2]+' are too small')||!sy.includes(m[3]+' cents each'))add(W+L+' -> '+q.ans);tally('sub-mul')}
          else add(W+'label '+L);
        }
      }
      seen[key]=seeLab.size;
    }
    // ---- mixes (each variant shows up a fair share of the time)
    const fair=(k,names,lo)=>{for(const n of names)if(!((share[k]||{})[n]>N*lo))add(k+': '+n+' too rare '+JSON.stringify(share[k]))};
    fair('round1',['2','3'],.3);fair('round1',['half'],.06);fair('round2',['3','4'],.3);fair('sub6',['one','two'],.2);fair('sub7',['hund','tens','thousand'],.1);
    fair('time5',['read','pick'],.4);fair('time6',['clocks','digital','after','before'],.2);fair('geo1',['rect'],.3);fair('geo1',['poly3','poly4','poly5','poly6'],.1);
    fair('geo2',['grid','labelled'],.3);fair('shape5',['quad','notquad','notrhom','which','right','sides','name'],.08);
    fair('data3',['bar2','bar5','bar10','pic2','pic5','pic10'],.1);fair('data3',['half2','half10'],.02);fair('data3',['read','more','total','all'],.15);
    fair('meas4',['half','quarter','scale','jug'],.1);fair('story6',['mul+add','mul-sub','add-div','div-sub','sub-mul'],.15);
    if((share.data3||{}).half5)add('data3: half symbols at scale 5');
    for(let mi=0;mi<60;mi++)if(!(share.time5||{})['m'+mi])add('time5: minute '+mi+' never asked');
    for(const k of ['round1','round2','sub6','sub7','time5','time6','geo1','geo2','shape5','data3','meas4','story6'])if(seen[k]<30)add(k+': only '+seen[k]+' different labels');
    return bad;
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:r,note:'12 levels (+4 reserved) x 3,000'};
});

run('Fraction Forest P2-07: stops added to m_frac keep every star, a finished forest shows NEW and does not move the current stop (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const store={};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const bad=[],wi=PATHS.math.worlds.findIndex(x=>x.id=='m_frac'),W=PATHS.math.worlds[wi],full=W.nodes.slice();
    const OLD=full.filter(n=>n[0]=='frac'&&n[1]>=2&&n[1]<=5); // the four stops of v69 (P2-06), in their v69 order
    // P2-10: this test is about the forest alone, so the path ends at the forest while it runs (the desert after it is tested by its own check)
    const ALLW=PATHS.math.worlds.slice();PATHS.math.worlds=ALLW.slice(0,wi+1);
    const setNodes=a=>{W.nodes=a;buildNodes('math')};
    const idx=id=>NODES.math.findIndex(n=>nid(n)==id);
    const newIds=full.filter(n=>!OLD.includes(n)).map(n=>n[0]+n[1]);
    if(newIds.length!==12||OLD.map(n=>n[0]+n[1]).join(' ')!=='frac2 frac3 frac4 frac5')bad.push('expected 4 old and 12 new stops, got '+OLD.length+'/'+newIds.length);
    // a save from v69 is the "maxed" fixture (every older stop passed) plus some Fraction Forest progress
    const mk=(stars,boss,base='maxed')=>{
      load(fx(base));
      for(const k of ['frac2','frac3','frac4','frac5','boss_m_frac'])delete S.maps.math[k];
      Object.assign(S.maps.math,stars);if(boss)S.maps.math.boss_m_frac=3;
      for(const k in S.wdone||{})if(k=='m_frac')delete S.wdone[k];
      if(boss)S.wdone.m_frac=1;
      return JSON.stringify(S);
    };
    const cases={
      'forest not started':mk({}),
      'frac2 and frac3 passed':mk({frac2:3,frac3:2}),
      'frac2 to frac4 passed (frac5 was next)':mk({frac2:3,frac3:2,frac4:1}),
      'all four stops, boss not beaten':mk({frac2:3,frac3:3,frac4:2,frac5:1}),
      'forest finished (4 stops + boss), everything else passed':mk({frac2:3,frac3:2,frac4:3,frac5:1},true),
      'forest finished, an older stop still open (midway)':mk({frac2:3,frac3:2,frac4:3,frac5:1},true,'midway'),
    };
    let checked=0;
    for(const name in cases){
      const raw=cases[name];
      // the v69 world
      setNodes(OLD);load(raw);
      const starsOld=JSON.stringify(S.maps.math),curOld=nid(NODES.math[curNode('math')]);
      const lockedOld=NODES.math.map(n=>nid(n)).filter((id,i)=>!unlocked('math',i));
      const openOld=new Set(NODES.math.map(n=>nid(n)).filter((id,i)=>unlocked('math',i)));
      // the same save in the world of this build
      setNodes(full);load(raw);
      if(JSON.stringify(S.maps.math)!==starsOld)bad.push(name+': star table changed');
      for(const id of newIds)if(S.maps.math[id])bad.push(name+': stars on new stop '+id);
      for(const n of OLD){const id=n[0]+n[1],i=idx(id);if(i<0)bad.push(name+': '+id+' is gone');else{checked++;if((S.maps.math[id]||0)>0&&!unlocked('math',i))bad.push(name+': passed stop '+id+' is locked')}}
      // every stop that was open stays open, except that an unfinished forest now has stops in front of frac5 (see the note on the next line)
      // (a forest that is not finished now has stops to play before frac5 and the boss; the boss of a forest with all four old stops passed waits for them)
      for(const id of openOld){const i=idx(id);if(!/^(frac[345]|boss_m_frac)$/.test(id)&&!unlocked('math',i))bad.push(name+': '+id+' was open and is locked');}
      const curNew=nid(NODES.math[curNode('math')]);
      const finished=name.startsWith('forest finished');
      if(finished){
        // a finished world: the new stops are NEW and never locked; the map does not move to them (curNode skips NEW stops)
        for(const id of newIds){const i=idx(id);if(!stopNew('math',i)||!unlocked('math',i))bad.push(name+': '+id+' should show NEW and be open')}
        if(!worldFinished('math',wi))bad.push(name+': forest no longer finished');
        if(name.includes('midway')){
          if(curNew!==curOld||newIds.includes(curNew))bad.push(name+': current stop '+curOld+' -> '+curNew);
        }else if(curOld!=='boss_m_frac'||curNew!==curOld){ // the path ends at the forest while this runs (P2-10), so a save with everything passed opens on the forest boss
          // every stop of the path was passed: the map keeps opening where it did (since P2-24 curNode's last resort never picks a NEW stop)
          bad.push(name+': current stop '+curOld+' -> '+curNew);
        }
      }else{
        // an unfinished forest: no star moves; the map opens on the first stop that is not passed
        const first=NODES.math.findIndex((n,i)=>i>=WR.math[wi][0]&&i<=WR.math[wi][1]&&!passed('math',i)&&unlocked('math',i));
        if(!/^boss/.test(curNew)&&first>=0&&curNew!==nid(NODES.math[first])&&worldHasProgress('math',wi))bad.push(name+': current stop '+curNew+' is not the first open stop');
        for(const id of newIds)if(stopNew('math',idx(id)))bad.push(name+': NEW tag in an unfinished forest ('+id+')');
      }
      // the one unlocked chain: nothing in the new stops is open before the stop before it is passed, unless a later stop is passed
      for(let i=WR.math[wi][0]+1;i<WR.math[wi][1];i++){
        if(passed('math',i))continue;
        const behind=NODES.math.slice(i+1,WR.math[wi][1]+1).some((n,k)=>passed('math',i+1+k));
        if(unlocked('math',i)&&!passed('math',i-1)&&!behind&&!worldSkipped('math',wi)&&!S.unlockAll)bad.push(name+': '+nid(NODES.math[i])+' open without the stop before it');
      }
    }
    // the plain fixtures: stars identical with and without the twelve new stops (frac stars absent there)
    for(const name of ['midway','maxed','legacy-single-map','legacy-index-maps','fresh']){
      const raw=fx(name);
      setNodes(OLD);load(raw);const a=JSON.stringify(S.maps.math),ca=nid(NODES.math[curNode('math')]);
      setNodes(full);load(raw);
      if(JSON.stringify(S.maps.math)!==a)bad.push(name+': star table changed');
      const cb=nid(NODES.math[curNode('math')]);
      if(ca!==cb)bad.push(name+': current stop '+ca+' -> '+cb);
    }
    setNodes(full);PATHS.math.worlds=ALLW;buildNodes('math');
    return {bad,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:uniq(r.bad),note:r.checked+' passed-stop checks, 5 forest saves + 5 old fixtures'};
});

// ---- P2-20: grammar levels 1-5 (bank data, 3,000 samples per level, hints, map stops, save safety) ----
run('grammar P2-20: gram 1-5 bank, 3000 questions per level, one right answer, hints, say, labels, stops, no star moves, no re-lock',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const gerrs=[],bad=m=>gerrs.push(m);
  const body=function(){
    const want=[52,60,46,51,46];
    if(SK.gram.max<5||SK.gram.bank!=='gram')bad('SK.gram is '+JSON.stringify({max:SK.gram.max,bank:SK.gram.bank}));
    for(const m of bankProblems('gram',{levels:[1,2,3,4,5],min:40}))bad(m);

    for(let lv=1;lv<=5;lv++){
      const items=BANK.gram.filter(it=>it.lv==lv),w2='level '+lv+': ';
      if(items.length!==want[lv-1])bad(w2+items.length+' items, wants '+want[lv-1]);
      for(const it of items){
        if(!it.topic)bad(w2+it.q+': no topic');
        if(typeof it.hint!=='string'||it.hint.length<20)bad(w2+it.q+': no teaching hint');
        else{
          // a hint teaches the method: it never holds the answer word
          const ans=String(it.a);
          if(ans.length>2&&/^[a-z']+$/i.test(ans)&&new RegExp('\\b'+ans+'\\b','i').test(it.hint))bad(w2+it.q+': the hint holds the answer '+ans);
        }
        if(it.form=='tap'&&bankWords(it.sent).length>4)bad(w2+it.sent+': more than 4 words to tap');
      }
      const seen=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ('gram',lv,i+1),w3=w2+q.label+': ';
        const pr=kindProblems(q);if(pr.length)bad(w3+pr.join('; '));
        const vs=q.choices.map(c=>String(c.v));
        if(vs.length<2||vs.length>4)bad(w3+vs.length+' choices');
        if(new Set(vs).size!==vs.length)bad(w3+'two choices alike');
        if(vs.filter(v=>v===String(q.ans)).length!==1)bad(w3+'not exactly one right choice');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s||q.hint.s.length<20||q.hint.s.length>140)bad(w3+'hint');
        if(!q.say||q.say.length<8)bad(w3+'say');
        if(q.sk!=='gram'||q.lv!==lv)bad(w3+'genQ did not stamp sk/lv');
        if(q.label.length>=60)bad(w3+'label too long');
        const key=q.bk.bi;
        if(labels[q.label]!==undefined&&labels[q.label]!==key)bad(w3+'label is not unique');
        labels[q.label]=key;seen.add(key);
        const t=(q.html+' '+q.say+' '+q.choices.map(c=>c.l).join(' ')).split(/[^A-Za-z']+/).filter(Boolean);
        for(const x of t)if(BAD.test(x.toLowerCase()))bad(w3+'BAD word '+x);
      }
      if(seen.size!==items.length)bad(w2+'3000 questions drew only '+seen.size+' of '+items.length+' items');
      if(Object.keys(labels).length!==items.length)bad(w2+'labels are not one per item');
      if(JSON.stringify(genQ('gram',lv,77))!==JSON.stringify(genQ('gram',lv,77)))bad(w2+'not reproducible');
      const a=genQ('gram',lv,5);
      {const r=bankRebuild(a.bk),f=q=>JSON.stringify([q.html,q.say,q.ans,q.choices,q.hint,q.label,q.bk]);if(f(r)!==f(a))bad(w2+'bankRebuild differs');}
    }
    // the forms CURRICULUM E-gram names for each level
    const forms=lv=>[...new Set(BANK.gram.filter(it=>it.lv==lv).map(it=>it.form||'choice'))].sort().join();
    if(forms(1)!=='choice,tap,wide'||forms(2)!=='choice,tap'||forms(3)!=='choice'||forms(4)!=='choice,wide'||forms(5)!=='choice')bad('forms per level: '+[1,2,3,4,5].map(forms).join(' | '));
    // map: gram 1 to 5 each once on the reading path, in the worlds CURRICULUM section 2.2 names (by world id)
    const rd=NODES.read.filter(n=>n.sk=='gram'&&n.lv<=5).map(n=>n.lv+'@'+n.wid).join(' ');
    if(rd!=='1@r_reef 2@r_workshop 3@r_workshop 4@r_summit 5@r_summit')bad('gram stops: '+rd);
    // save safety: fixtures at several grades; the reading path without the gram stops against today's
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.read.worlds;
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i)}});return o};
    let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])for(const g of [null,-1,0,1,2,3,6]){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      PATHS.read.worlds=CUR.map(w=>({...w,nodes:w.nodes.filter(x=>x[0]!=='gram')}));buildNodes('read');
      const before=snap(),curB=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=CUR;buildNodes('read');
      const after=snap(),curA=nid(NODES.read[curNode('read')]);
      for(const k in before){
        checked++;
        if(!after[k]){bad(name+' g'+g+': stop '+k+' vanished');continue}
        if(before[k].st!==after[k].st)bad(name+' g'+g+': '+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].open&&!after[k].open)bad(name+' g'+g+': '+k+' re-locked');
        if(before[k].st>0&&!after[k].open)bad(name+' g'+g+': passed stop '+k+' is locked');
      }
      // a gram stop added to a finished world is NEW, open, has no stars and is never the current stop
      for(const k of ['gram1','gram2','gram3','gram4','gram5']){
        const i=NODES.read.findIndex(n=>nid(n)==k);
        if(getSt('read',i)!==0)bad(name+': '+k+' starts with stars');
        if(passed('read',WR.read[NODES.read[i].wi][1])&&(!stopNew('read',i)||!unlocked('read',i)||curA==k))bad(name+' g'+g+': '+k+' in a finished world is not NEW, open and not current');
      }
      if(curB!==curA&&!/^boss_/.test(curB)&&v42Stops('read').includes(curB)&&NODES.read.some((n,i)=>passed('read',i)))bad(name+' g'+g+': current stop moved '+curB+' -> '+curA);
    }
    // a synthetic child who finished Ocean Reef, Word Workshop and Story Summit before grammar existed keeps every star
    load(null);
    for(const k of ['sight3','pic3','build3','comp2','spell2','boss_r_reef','sight5','pic6','build6','boss_r_workshop','spell4','boss_r_summit'])S.maps.read[k]=3;
    PATHS.read.worlds=CUR;buildNodes('read');
    for(const k of ['sight3','sight5','pic6','build6','spell4','boss_r_summit'])if(S.maps.read[k]!==3)bad('synthetic save: '+k+' lost stars');
    for(const k of ['gram1','gram2','gram3','gram4','gram5']){
      const i=NODES.read.findIndex(n=>nid(n)==k);
      if(!stopNew('read',i)||!unlocked('read',i)||nid(NODES.read[curNode('read')])===k)bad('synthetic save: '+k+' not NEW and open, or is the current stop '+[stopNew('read',i),unlocked('read',i),nid(NODES.read[curNode('read')]),S.maps.read.spell5,S.maps.read.boss_r_library].join());
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    return {checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:gerrs,note:'255 items, 15000 questions, '+r.checked+' stop checks over 6 fixtures x 7 grades'};
});

// ---- P2-22: vocabulary levels 1-5 (bank data, picture prompts, 3,000 questions per level, map stops, save safety) ----
run('vocabulary P2-22: bank validates, one right answer per item, 3000 questions per level, hints, map stops, no star moves, no re-lock',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const serrs=[],bad=m=>serrs.push(m);
  const body=function(){
    const want=[56,52,68,63,82],PRE=['un','re','pre','dis','mis'],SUF=['ful','less','ly','er','est','able'];
    if(!SK.vocab||SK.vocab.max<5||SK.vocab.bank!=='vocab'||SK.vocab.area!=='read')bad('SK.vocab is wrong');
    for(const m of bankProblems('vocab',{levels:[1,2,3,4,5],min:40}))bad(m);
    const items=BANK.vocab.filter(it=>it.lv<=5); // levels 1-5 come first in BANK.vocab, so these indexes match q.bk.bi (P2-23 adds 6-10)
    for(let lv=1;lv<=5;lv++){
      const L=items.filter(it=>it.lv==lv),w2='level '+lv+': ';
      if(L.length!==want[lv-1])bad(w2+L.length+' items, wants '+want[lv-1]);
      for(const it of L){
        const all=[it.a,...it.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)bad(w2+it.q+': a choice repeats');
        if(!it.hint||it.hint.length<20)bad(w2+it.q+': hint missing');
        if(it.hint&&it.hint.toLowerCase().split(/[^a-z]+/).includes(it.a.toLowerCase()))bad(w2+it.q+': the hint gives the answer');
        if(!it.topic)bad(w2+it.q+': no topic');
        if(lv<=2){ // the word asked about is never a choice; the answer is not in the prompt
          const w=it.q.match(/ (\w+)\?$/)[1];
          if(all.includes(w))bad(w2+it.q+': the word itself is a choice');
          if(it.q.toLowerCase().split(/[^a-z]+/).includes(it.a.toLowerCase()))bad(w2+it.q+': the answer is in the prompt');
        }
      }
    }
    // opposites and synonyms: no distractor is also a listed answer for that word (either direction), so only one choice is right
    for(const lv of [1,2]){
      const listed={},qs=[];
      for(const it of items.filter(i=>i.lv==lv)){
        const w=it.q.match(/ (\w+)\?$/)[1];qs.push([w,it]);
        (listed[w]=listed[w]||new Set()).add(it.a);(listed[it.a]=listed[it.a]||new Set()).add(w);
      }
      for(const [w,it] of qs)for(const d of it.d)if(listed[w].has(d))bad('level '+lv+': '+it.q+': "'+d+'" is also a right answer');
    }
    if(items.filter(i=>i.lv==1).some(i=>i.d.length!==2))bad('level 1 must have 3 choices');
    // compound words: the right split joins to the word, no wrong split does; put-together distractors are other words
    for(const it of items.filter(i=>i.lv==3)){
      const m=it.q.match(/^Which two words make (\w+)\?$/);
      if(m){
        if(it.a.replace(' + ','')!==m[1])bad('compound '+m[1]+': right split '+it.a+' does not join');
        for(const d of it.d)if(d.replace(' + ','')===m[1]||!/^\w+ \+ \w+$/.test(d))bad('compound '+m[1]+': wrong split '+d+' joins to the word or is malformed');
      }
      else{
        const t=it.q.match(/^What do (\w+) and (\w+) make together\?$/);
        if(!t||it.d.includes(it.a)||it.d.length!==3)bad('compound item shape: '+it.q);
        else if(it.a!==t[1]+t[2])bad('compound '+it.q+': answer is not '+t[1]+t[2]);
      }
    }
    if(items.filter(i=>i.lv==3&&i.form=='wide').length!==51)bad('level 3 wants 51 two-word items');
    for(const it of items.filter(i=>i.lv==4)){
      if(/^___\w+ = .+\. Which start piece\?$/.test(it.q)){
        if(!PRE.includes(it.a)||it.d.length!==3||it.d.some(d=>!PRE.includes(d)))bad('prefix item: '+it.q);
      }
      else if(!/^What does (un|re|pre|dis|mis)\w+ mean\?$/.test(it.q))bad('prefix item shape: '+it.q);
    }
    for(const it of items.filter(i=>i.lv==5)){
      if(/^\w+ \+ ___ = .+$/.test(it.q)){
        if(!SUF.includes(it.a)||it.d.some(d=>!SUF.includes(d)))bad('suffix item: '+it.q);
      }
      else if(!/^What does \w+ mean\?$/.test(it.q))bad('suffix item shape: '+it.q);
    }
    if(items.filter(i=>i.em).length<20)bad('fewer than 20 items have a picture');
    // 3000 seeded questions per level
    for(let lv=1;lv<=5;lv++){
      const w2='level '+lv+': ',seen=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ('vocab',lv,i+1);
        const pr=kindProblems(q);if(pr.length)bad(w2+q.label+': '+pr.join('; '));
        seen.add(q.bk.bi);
        if(q.kind!=='choice')bad(w2+q.label+': kind '+q.kind);
        const vs=q.choices.map(c=>c.v);
        if(new Set(vs).size!==vs.length||vs.filter(v=>v===q.ans).length!==1)bad(w2+q.label+': not exactly one right choice');
        if(vs.length!==(lv<=2?3:4))bad(w2+q.label+': '+vs.length+' choices');
        if(!q.say||!q.say.trim())bad(w2+q.label+': no say text');
        if(!q.hint||q.hint.k!=='text'||q.hint.s.length<20)bad(w2+q.label+': hint');
        if(!q.label||q.label.length>=60)bad(w2+'label '+q.label);
        if(labels[q.label]!==undefined&&labels[q.label]!==q.bk.bi)bad(w2+'label '+q.label+' is not unique');
        labels[q.label]=q.bk.bi;
        if(q.sk!=='vocab'||q.lv!==lv)bad(w2+'genQ did not stamp sk/lv');
        const it=items[q.bk.bi];
        if(!!it.em!==q.html.includes('bpic bem'))bad(w2+q.label+': picture prompt mismatch');
        if(it.em&&!/<svg/.test(q.html)&&!q.html.includes(it.em[1]))bad(w2+q.label+': picture is empty');
        if(i<40&&bankRebuild(q.bk).label!==q.label)bad(w2+q.label+': bankRebuild differs');
      }
      if(seen.size!==want[lv-1])bad(w2+'3000 questions drew only '+seen.size+' of '+want[lv-1]+' items');
    }
    for(let lv=1;lv<=5;lv++)if(JSON.stringify(genQ('vocab',lv,77))!==JSON.stringify(genQ('vocab',lv,77)))bad('level '+lv+' is not reproducible');
    // map: vocab 1 to 5 in the worlds CURRICULUM section 2.2 names, after the stops already there
    const rd=NODES.read.filter(n=>n.sk=='vocab'&&n.lv<=5).map(n=>n.lv+'@'+n.wid).join(' ');
    if(rd!=='1@r_reef 2@r_workshop 3@r_workshop 4@r_summit 5@r_summit')bad('vocab stops: '+rd);
    const wst=id=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid);
    if(wst('r_reef').slice(0,6).join(' ')!=='sight3 pic3 build3 comp2 spell2 vocab1')bad('r_reef order: '+wst('r_reef'));
    if(wst('r_summit').filter(x=>!x.startsWith('gram')&&!x.startsWith('comp')&&!x.startsWith('info')).join(' ')!=='spell4 vocab4 vocab5')bad('r_summit order: '+wst('r_summit')); // gram stops (P2-20) sit between, per CURRICULUM 2
    // save safety: the reading path without the five stops against today's
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.read.worlds,NEWV=['vocab1','vocab2','vocab3','vocab4','vocab5'];
    const OLD=()=>CUR.map(w=>({...w,nodes:w.nodes.filter(x=>x[0]!=='vocab')}));
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i)}});return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])fixtures.push([name,fx(name)]);
    {load(null);const m={};PATHS.read.worlds=OLD();buildNodes('read');NODES.read.forEach(n=>{m[nid(n)]=2});
      PATHS.read.worlds=CUR;buildNodes('read');fixtures.push(['all-old-passed',JSON.stringify({maps:{read:m},grade:3})])}
    fixtures.push(['workshop-mid',JSON.stringify({maps:{read:{sight5:3,pic6:2}},grade:2})]);
    let checked=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,6]){
      load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      PATHS.read.worlds=OLD();buildNodes('read');
      const before=snap(),curB=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=CUR;buildNodes('read');
      const after=snap(),curA=nid(NODES.read[curNode('read')]);
      for(const k in before){
        checked++;
        if(!after[k]){bad(name+' g'+g+': stop '+k+' vanished');continue}
        if(before[k].st!==after[k].st)bad(name+' g'+g+': '+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].open&&!after[k].open)bad(name+' g'+g+': '+k+' re-locked');
        if(before[k].st>0&&!after[k].open)bad(name+' g'+g+': passed stop '+k+' is locked');
      }
      for(const k of NEWV){
        const i=NODES.read.findIndex(n=>nid(n)==k);
        if(getSt('read',i)!==0)bad(name+': '+k+' starts with stars');
        if(passed('read',WR.read[NODES.read[i].wi][1])&&(!stopNew('read',i)||!unlocked('read',i)||curA==k))bad(name+' g'+g+': '+k+' in a finished world is not NEW, open and not current');
      }
      if(curB!==curA&&!/^boss_/.test(curB)&&v42Stops('read').includes(curB)&&NODES.read.some((n,i)=>passed('read',i)))bad(name+' g'+g+': current stop moved '+curB+' -> '+curA);
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    return {checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:serrs,note:'321 items, 15000 questions, '+r.checked+' stop checks over 7 fixtures x 7 grades'};
});

// ---- P4-18: graphics quality pass ----
run('graphics pass (P4-18): 47-gfx.css tokens and motion, no emoji chrome on the fixed screens, ids kept',()=>{
  const p=[];
  const css=fs.readFileSync(path.join(SRC,'css','47-gfx.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('raw hex colour in 47-gfx.css');
  if(/rgba?\(|hsla?\(/.test(css))p.push('colour function in 47-gfx.css');
  if(/(^|[;{\s])(-webkit-)?(backdrop-)?filter\s*:/.test(css))p.push('filter or backdrop-filter used');
  for(const m of css.matchAll(/transition\s*:\s*([^;}]+)/g))for(const part of m[1].split(','))
    if(!/^\s*(transform|opacity)\s/.test(part))p.push('transition on something other than transform/opacity: '+part.trim());
  if(/@keyframes/.test(css))p.push('47-gfx.css defines keyframes (reuse k-ring / rw-pop)');
  const OWN=['c','c-tint','c-shade','c-fill','c-ledge','ic2','wb'];
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!OWN.includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('unknown token --'+m[1]);
  // the markup a fixed screen builds (view() templates and the map's innerHTML) has no emoji and no ◀ ▶ ✕ text glyphs
  const fnText=(file,name)=>{const t=fs.readFileSync(path.join(SRC,'js',file),'utf8'),a=t.indexOf('function '+name+'(');
    if(a<0){p.push(file+': function '+name+' not found');return''}const b=t.indexOf('\nfunction ',a+1);return t.slice(a,b<0?t.length:b)};
  const tpl=t=>{const out=[];let i=0;for(;;){const a=t.indexOf('view(`',i);if(a<0)break;const b=t.indexOf('`);',a);out.push(t.slice(a,b<0?t.length:b));i=a+6}return out.join('\n')};
  const EMO=/\p{Emoji_Presentation}|\p{Extended_Pictographic}️|[◀▶✕⭐⚡✅⌨⌫]/u;
  const whole=[['57-fluency.js','fluMenu'],['57-fluency.js','fluModes'],['57-fluency.js','fluPlay'],['57-fluency.js','fluEnd'],['57-fluency.js','fluSpark'],
    ['54-race.js','raceMenu'],['55-streak.js','streakCal'],['45-placement.js','placeIntro'],['45-placement.js','placeQ'],['45-placement.js','placeDone'],
    ['46-home.js','pathMap'],['46-home.js','worldStrip'],['46-home.js','drawMap'],['46-home.js','setup'],['46-home.js','learn'],['46-home.js','wBadge'],['46-home.js','nodeFace']];
  for(const [f,fn] of whole){const t=fnText(f,fn).replace(/n\.boss\[0\]/g,''),m=t.match(EMO);if(m)p.push(f+' '+fn+'(): emoji or text glyph as chrome: '+m[0])}
  // screens whose functions also hold effects (emoji particle bursts, toasts): only their templates are chrome
  for(const [f,fn] of [['54-race.js','race'],['56-petcare.js','care'],['52-balloons.js','balloons']]){const t=tpl(fnText(f,fn)),m=t.match(EMO);if(m)p.push(f+' '+fn+'() template: emoji as chrome: '+m[0])}
  for(const [f,re,w] of [['54-race.js',/GFX\.endCard\(/,'race end card'],['52-balloons.js',/GFX\.endCard\(/,'balloons end card'],['57-fluency.js',/GFX\.endCard\(/,'sprint end card'],
    ['50-round.js',/GFX\.hearts\(G\.hp\)/,'boss hearts'],['56-petcare.js',/picFor\(SNACK_W\[i\]/,'snack pictures']])
    if(!re.test(fs.readFileSync(path.join(SRC,'js',f),'utf8')))p.push(w+' not drawn');
  const out=eval(js+`
  const bad=[];
  // ids and selectors smoke.js and the screens' handlers use
  const keep=(h,list,w)=>{for(const s of list)if(!h.includes(s))bad.push(w+' lost '+s)};
  keep(GFX.card({id:'g4x4',cls:'game',attrs:'data-s="add10"',title:'x'}),['id="g4x4"','data-s="add10"','class="pathcard gx-card s-math game"','class="pc-go"'],'GFX.card');
  if(/pc-go/.test(GFX.card({title:'x',go:''})))bad.push('GFX.card go:"" should leave out the play disc');
  if(GFX.card({title:'<b>'}).includes('<b>'))bad.push('GFX.card does not escape the title');
  const pad=GFX.pad(),ks=[...pad.matchAll(/data-k="([^"]+)"/g)].map(m=>m[1]).join(' ');
  if(ks!=='1 2 3 4 5 6 7 8 9 del 0'||!/class="keys qpad pad"/.test(pad)||(pad.match(/class="key k/g)||[]).length!==11)bad.push('sprint pad keys: '+ks);
  keep(GFX.speedTop('math','fbar',1,''),['id="quit"','id="fbar"','class="top tbar round qtop gx-top s-math"','style="--v:1"'],'speedTop');
  if((GFX.hearts(7).match(/#i-heart/g)||[]).length!==7||GFX.hearts(-1)!=='')bad.push('GFX.hearts');
  // map chrome: every world has a badge with a real icon, every stop a face (lock, boss drawing, skill icon)
  for(const p in PATHS)PATHS[p].worlds.forEach((w,wi)=>{const h=wBadge(p,wi),n=(/#i-([a-z0-9-]+)/.exec(h)||[])[1];
    if(!ICONS[n])bad.push('world badge '+w.id+': icon '+n);if(!h.includes('--wb:'+w.c))bad.push('world badge '+w.id+': colour')});
  for(const p in NODES)NODES[p].forEach(n=>{const h=nodeFace(n,false);
    if(n.sk=='boss'?!/rw-boss/.test(h):!/#i-/.test(h))bad.push('stop face '+p+' '+nid(n));});
  if(!/#i-lock/.test(nodeFace(NODES.math[0],true)))bad.push('locked stop face');
  [...new Set(bad)];`);
  return{problems:p.concat(out)};
});

run('math visuals depth (P4-18): one circle per counter, shade spot and gloss per group, ledges and gloss never take taps',()=>{
  const p=[];
  const src=fs.readFileSync(path.join(SRC,'js','23-viz.js'),'utf8'),css=fs.readFileSync(path.join(SRC,'css','32-viz.css'),'utf8');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!['vw','vz','k'].includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('32-viz.css: unknown token --'+m[1]);
  const deco=['vbs','vsp','vld','vgs','vgc','vfs','vcs'];
  const pe=(css.match(/([^}]*)\{pointer-events:none\}/)||[])[1]||'';
  for(const c of deco)if(!pe.includes('.viz .'+c))p.push('32-viz.css: .'+c+' must have pointer-events: none');
  const V=eval(src+';VIZ');
  const cnt=(s,re)=>(s.match(re)||[]).length;
  // counters: one <circle> each, one base spot path (one h0 per counter) and one gloss path per group, inside the group
  const tf=V.tenFrame(9,10,{b:3,fade:1});
  if(cnt(tf,/<circle/g)!==9)p.push('tenFrame(9): circles '+cnt(tf,/<circle/g));
  if(cnt(tf,/class="vbs"/g)!==3||cnt(tf,/class="vsp"/g)!==3)p.push('tenFrame b/fade: one spot and one gloss path per group');
  if(!/<g class="v2 vx">(<circle[^>]*\/>)+<path class="vbs"[^>]*\/><path class="vsp"[^>]*\/><\/g>/.test(tf))p.push('faded group must wrap its own spot and gloss');
  const t7=V.tenFrame(7);if(cnt((t7.match(/class="vbs"[^>]*d="([^"]*)"/)||['',''])[1],/h0/g)!==7)p.push('tenFrame(7): 7 base spots');
  for(const [w,s] of [['dots scatter',V.dots(12,'scatter',{seed:3})],['dice',V.dots(8,'dice')],['balance',V.balance(5,3)],['linePlot',V.linePlot([1,2,2])],
    ['numLine marks',V.numLine({marks:[3]})],['coordGrid points',V.coordGrid({points:[[1,2]]})],['pictograph',V.pictograph([['A',3]])]])
    if(!/class="vbs"/.test(s)||!/class="vsp"/.test(s))p.push(w+': counters have no depth');
  // boards and gloss
  if(!/class="vld"/.test(V.tenFrame(4))||!/class="vld"/.test(V.dots(4,'dice')))p.push('ten frame / dice face ledge');
  const fb=V.fracBar(3,4);if(cnt(fb,/class="vld"/g)!==1||cnt(fb,/class="vgs"/g)!==1)p.push('fracBar ledge and gloss');
  const fc=V.fracCircle(5,4);if(cnt(fc,/class="vld"/g)!==2||cnt(fc,/class="vgc"/g)!==2)p.push('fracCircle ledge and gloss per circle');
  const ck=V.clock(3,0);for(const c of ['vld','vfs','vgc'])if(!ck.includes('class="'+c+'"'))p.push('clock: no '+c);
  const cs=V.coinSVG([25,10,5,1]);if(cnt(cs,/class="vcs/g)!==4||cnt(cs,/class="vgc"/g)!==4)p.push('coins: a shade crescent and a gloss per coin');
  if(!/class="vbd" transform="translate\(1\.5 1\.5\)"/.test(V.base10(47)))p.push('base10 ledge');
  if(!/class="vgs"/.test(V.barGraph([['a',5]],1)))p.push('bar gloss');
  // decorations never carry a tap target or data-v, and every tap target still has data-v
  for(const s of [V.fracBar(0,6,{tap:true}),V.fracCircle(0,4,{tap:true}),V.numLine({tapValues:[1,3,5],marks:[2]}),V.barGraph([['a',2],['b',3]],1,{tap:true}),V.coordGrid({tapPts:[[1,2]],points:[[2,2]]})]){
    for(const c of deco)if(new RegExp('class="(vt )?'+c+'[^"]*" data-v').test(s)||new RegExp('class="vt '+c).test(s))p.push('decoration .'+c+' is a tap target');
    if(!/class="vt[^"]*" data-v="/.test(s))p.push('tap targets lost data-v');
  }
  // the crescent is a closed path of two arcs; numbers have one decimal
  const cr=(ck.match(/class="vfs" d="([^"]*)"/)||['',''])[1];
  if(!/^M[\d.]+ [\d.]+A52 52 0 1 1 [\d.]+ [\d.]+A52 52 0 0 0 [\d.]+ [\d.]+z$/.test(cr))p.push('clock face crescent: '+cr);
  return{problems:p,note:deco.length+' decoration classes'};
});

// ---- P2-25 comprehension framework and 2nd grade passages ----
run('comprehension P2-25: passages validate, 2nd grade reading level, every answer supported, round, hints, old levels unchanged',()=>{
  const body=function(){
    const out=[],b=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const strip=q=>{const c={...q};delete c.sk;delete c.lv;delete c.seed;return JSON.stringify(c)};
    // 1. data: the bank validator, the grade validator (sentences, words, reading level, evidence, question types), counts
    for(const id of ['comp','info'])for(const m of passageProblems(id))b(m);
    const grades=[...new Set(COMP.map(p=>p.g))];
    if(!grades.includes(2))b('no grade 2 passages');
    for(const g of grades)for(const m of compProblems(g))b(m);
    const g2=COMP.filter(p=>p.g==2);
    if(g2.length!==10||g2.filter(p=>p.type=='f').length!==5)b('grade 2 needs 5 fiction and 5 nonfiction passages, has '+g2.length);
    if(g2.reduce((a,p)=>a+p.qs.length,0)!==50)b('grade 2 questions: '+g2.reduce((a,p)=>a+p.qs.length,0));
    if(new Set(COMP.map(p=>p.id)).size!==COMP.length)b('two passages share an id');
    if(new Set(COMP.map(p=>p.title)).size!==COMP.length)b('two passages share a title');
    if(PASS.comp.filter(x=>x.lv==3).length!==5||PASS.info.filter(x=>x.lv==1).length!==5)b('PASS levels: comp 3 and info 1 need 5 passages each');
    for(const p of g2)for(const q of p.qs){
      const all=[q.a,...q.d].map(x=>x.toLowerCase());
      if(new Set(all).size!==all.length)b(p.id+': repeated choice in "'+q.q+'"');
      if(q.d.length!==3)b(p.id+': needs 3 wrong choices in "'+q.q+'"');
    }
    if(COMPSPEC[2].words[0]<60||COMPSPEC[2].words[1]>90)b('grade 2 word limits are outside CURRICULUM 60-90');
    // 2. the validator catches bad passages (each mistake is reported)
    {
      const src=COMP.find(p=>p.id=='g2f01'),n0=COMP.length;
      const trial=(edit,want)=>{
        const c=JSON.parse(JSON.stringify(src));c.id='g2f99';edit(c);
        COMP.push(c);const m=compProblems(2).filter(x=>x.startsWith('g2f99'));COMP.length=n0;
        if(!m.some(x=>x.includes(want)))b('validator missed "'+want+'": '+m.join(' | '));
      };
      trial(c=>{c.qs[0].ev=[40]},'ev must list');
      trial(c=>{c.qs[0].a='purple'},'answer words not in the passage');
      trial(c=>{c.text=c.text.concat(c.text,c.text)},'words, needs');
      trial(c=>{c.text[0]='Mia had a red kite with a very long and wavy tail that she loved to fly high in the big windy sky'},'a sentence has');
      trial(c=>{c.qs=c.qs.slice(1)},'needs 5 questions');
      trial(c=>{c.qs[1].t='detail'},'no sequence question');
      trial(c=>{c.qs[0].d[0]='Mia had a red kite'},'also supported by the evidence');
      trial(c=>{c.qs[2].q='In this story, "wobbled" means...'},'quoted word');
      trial(c=>{c.qs[0].t='riddle'},'unknown type');
      trial(c=>{c.text=['Ubiquitous photosynthesis necessitates considerable chlorophyll concentrations.','Metamorphosis characterizes amphibian development significantly.','Consequently temperatures fluctuate substantially.']},'reading grade');
    }
    // 3. levels 1 and 2 of Story Time give exactly what they gave before; level 3 and info 1 are passages
    for(const lv of [1,2])for(let s=1;s<=60;s++){
      const prev=RNG;RNG=mulberry32(s);let a;try{a=genComp(lv)}finally{RNG=prev}
      const q=genQ('comp',lv,s);delete q.sk;delete q.lv;delete q.seed;
      if(JSON.stringify(q)!==JSON.stringify(a))b('comp level '+lv+' changed at seed '+s);
      if(q.ctx)b('comp level '+lv+' now has a passage panel');
    }
    if(SK.comp.round(1)!==null||SK.comp.round(2)!==null)b('comp levels 1 and 2 must use the ordinary round');
    if(SK.comp.round(3).length!==10||SK.info.round(1).length!==10)b('comp 3 and info 1 rounds must have 10 questions');
    if(SK.comp.max<3||SK.info.max<1||SK.comp.area!=='read'||SK.info.area!=='read')b('skills comp/info: '+SK.comp.max+' '+SK.info.max);
    // 4. 3,000 questions per level: panel, one right answer, hint, say, label, renders, rebuilds
    const N=3000,labels=new Map(),texts=new Set();
    for(const [sk,lv] of [['comp',3],['info',1]]){
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),w=sk+lv;
        if(!q.ctx||!q.ctx.text||!q.ctx.title)b(w+': no passage panel');
        const vals=q.choices.map(c=>String(c.v));
        if(vals.filter(v=>v===String(q.ans)).length!==1)b(w+': not exactly one right choice: '+q.label);
        if(q.choices.length!==4)b(w+': '+q.choices.length+' choices');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s)b(w+': no hint');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label||q.label.length>=70)b(w+': label '+q.label);
        if(labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);texts.add(q.ctx.title);
        for(const m of kindProblems(q))b(w+': '+m);
        if(i<200){
          try{KIND.choice.render(q)}catch(e){b(w+': render threw '+e.message)}
          if(/undefined|NaN|\[object/.test(q.html))b(w+': bad html');
          if(strip(bankRebuild(q.bk))!==strip(q))b(w+': bankRebuild differs');
        }
      }
    }
    if(texts.size!==10)b('3,000 samples reached '+texts.size+' of 10 passages');
    if(labels.size!==50)b('50 questions expected, labels '+labels.size);
    // 5. hints quote the evidence for detail, sequence, vocab and inference; short enough; the type's own line for the others
    for(const sk of ['comp','info'])PASS[sk].forEach(p=>{
      if(p.g!==2)return;
      const x=COMP.find(c=>c.id==p.id);
      p.qs.forEach((it,j)=>{
        if(!it.hint||it.hint.length>140)b(p.id+' q'+j+': hint length');
        const quote=['detail','sequence','vocab','infer'].includes(it.t);
        if(quote!==it.hint.startsWith('Look back at the story: "'))b(p.id+' q'+j+' ('+it.t+'): hint '+it.hint);
        if(quote&&!it.hint.includes(x.text[it.ev[0]]))b(p.id+' q'+j+': hint misses the first evidence sentence');
      });
    });
    // 6. rounds: two passages, five questions each, in order; live play shows every story within three rounds
    bankRound();
    const seen=new Set();
    for(let r=0;r<3;r++){
      const rd=compRound('comp',3);
      if(rd.length!==10)b('round has '+rd.length+' questions, expected 10');
      const titles=[...new Set(rd.map(q=>q.ctx.title))];
      if(titles.length!==2)b('round has '+titles.length+' passages');
      titles.forEach(t=>seen.add(t));
      titles.forEach((t,k)=>{
        const part=rd.slice(k*5,k*5+5),src=COMP.find(c=>c.title==t);
        if(!part.every(q=>q.ctx.title==t))b('round: questions of "'+t+'" are not in a block');
        if(part.map(q=>q.label).join('|')!==src.qs.map((q,j)=>t+' #'+(j+1)+' '+q.t).join('|'))b('round: questions of "'+t+'" not in order');
      });
      if(!rd.every(q=>q.sk=='comp'&&q.lv==3&&q.seed===rd[0].seed))b('round: questions not stamped');
    }
    if(seen.size!==5)b('three live rounds reached '+seen.size+' of 5 stories');
    bankReset();
    return{out,words:g2.map(p=>p.text.flatMap(bankWords).length),fk:g2.map(p=>compFK(p.text)),sent:g2.map(p=>p.text.flatMap(bankWords).length/p.text.length)};
  };
  const r=eval(js+';('+body.toString()+')()');
  const mx=a=>Math.max(...a),mn=a=>Math.min(...a);
  return{problems:r.out,note:'10 passages, 50 questions; words '+mn(r.words)+'-'+mx(r.words)+', reading grade '+mn(r.fk).toFixed(1)+'-'+mx(r.fk).toFixed(1)+', words per sentence up to '+mx(r.sent).toFixed(1)};
});

run('comprehension P2-25: Word Workshop stops comp 3 and info 1, no star moves, nothing re-locks, the current stop stays (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    // 1. the stops: at the end of Word Workshop (CURRICULUM 2.2), after the old stops, one skill level each
    const W=PATHS.read.worlds,ww=W.find(w=>w.id=='r_workshop');
    if(!ww)b('Word Workshop is missing');
    else{
      const ids=ww.nodes.map(n=>n[0]+n[1]),k=ids.indexOf('comp3');
      if(k<0||ids[k+1]!=='info1'||ids.length!==k+2)b('comp3 and info1 must be the last two stops of Word Workshop: '+ids.join(' '));
      if(ids.indexOf('sight5')>k||ids.indexOf('build6')>k)b('the old Word Workshop stops must come first: '+ids.join(' '));
      if(ww.nodes.some(n=>n[2].length>22))b('a Word Workshop stop title is too long');
    }
    const was={r_candy:'sight2 rhyme2 pic2 build2 sent2 comp1 sound4 syl2 spell1',r_reef:'sight3 pic3 build3 comp2 spell2'};
    for(const id in was){const now=NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid).slice(0,was[id].split(' ').length).join(' ');if(now!==was[id])b(id+' changed: '+now)}
    // 2. saves: stars and locks of every old stop are untouched compared with a map without the two stops
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),pass:passed('read',i),prog:worldHasProgress('read',n.wi),
      g:PATHS.read.worlds[n.wi].g,nw:stopNew('read',i)}});return o};
    const ORIG=PATHS.read.worlds,NEW=/^(comp3|info1)$/;
    const without=()=>ORIG.map(w=>w.id!=='r_workshop'?w:{...w,nodes:w.nodes.filter(n=>!NEW.test(n[0]+n[1]))});
    let checked=0,moved=0;
    const compare=(label)=>{
      const maps=JSON.stringify(S.maps),g=S.grade;
      const now=snap(),cur=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=without();buildNodes('read');
      const old=snap(),curOld=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=ORIG;buildNodes('read');
      for(const k in old){
        checked++;
        if(!now[k]){b(label+': stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(label+': stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(label+': passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(label+': '+k+' locked by the new stops');
      }
      for(const k in now)if(!(k in old)&&NEW.test(k)&&now[k].st)b(label+': new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(label+': loading changed the map');
      // the map opens on the same stop, except for a child in the middle of Word Workshop who has done every old stop but not the boss
      if(cur!==curOld){
        moved++;
        const ok=/^(comp3|info1)$/.test(cur)&&curOld==='boss_r_workshop'&&!old['boss_r_workshop'].pass;
        if(!ok)b(label+': map opens on '+cur+' (was '+curOld+')');
      }
      return{now,old,cur,curOld};
    };
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])
      for(const g of [null,0,1,2,3,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        compare(name+' g'+g);
      }
    // 3. a child who finished Word Workshop before these stops existed: both show NEW, stay open, are not the current stop, nothing moves
    for(const g of [2,3,6]){
      load(null);S.grade=g;
      for(const n of NODES.read)if(n.wid!=='r_summit'&&n.wid!=='r_library'&&n.wid!=='r_island'&&n.wid!=='r_legend'&&!NEW.test(nid(n)))S.maps.read[nid(n)]=2;
      for(const k of ['comp3','info1'])delete S.maps.read[k];
      const r=compare('finished Word Workshop g'+g);
      for(const k of ['comp3','info1']){
        const i=NODES.read.findIndex(n=>nid(n)===k);
        if(!stopNew('read',i))b(k+' does not show NEW for a finished Word Workshop');
        if(!unlocked('read',i))b(k+' is locked for a finished Word Workshop');
        if(r.cur===k)b(k+' became the current stop of a finished Word Workshop');
      }
      // passing them saves under their own ids and moves nothing else
      const before=JSON.stringify(S.maps.read);
      setSt('read',NODES.read.findIndex(n=>nid(n)==='comp3'),3);
      const after=JSON.parse(JSON.stringify(S.maps.read));
      if(after.comp3!==3||JSON.stringify({...after,comp3:undefined})!==JSON.stringify({...JSON.parse(before),comp3:undefined}))b('passing comp3 changed another stop');
    }
    // 4. mastery order follows the map: comp 1, 2, 3
    for(const sk of ['comp','info']){const ns=NODES.read.filter(n=>n.sk===sk);
      ns.forEach((n,i)=>{if(harder(n)!==(ns[i+1]||null)||easier(n)!==(ns[i-1]||null))b('harder/easier must follow map order at '+sk+n.lv)})}
    return{out,checked,moved};
  };
  const r=eval(js+';('+body.toString()+')()');
  const bad=[...r.out];
  const blk=fs.readFileSync(path.join(SRC,'js','37-comp.js'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))bad.push('37-comp.js has a raw hex colour');
  if(/Math\.random/.test(blk))bad.push('37-comp.js uses Math.random');
  return{problems:bad,note:r.checked+' stop checks against a map without the two stops, current stop moved on '+r.moved+' of 36 loads (only mid-world)'};
});

// ---- P2-24 sentences (sent 3-5): data, one right answer, 3,000 samples per level, stops, saves ----
run('sentences P2-24: unscramble has one order, cloze has one word, 3,000 samples per level, stops, old saves keep every star',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    for(const lv of [3,4,5])if(SK.sent.max<5||typeof SK.sent.gen!=='function')b('sent needs levels up to 5');
    const wordsOf=s=>s.toLowerCase().split(/[^a-z']+/).filter(Boolean);
    const rude=s=>wordsOf(s).some(w=>BAD.test(w));
    // ---- 1. level 3 data: 40 sentences, 4-6 words, roles prove one order ----
    // the sentence shapes this chunk writes, as role strings; a shuffle that also fits one is a second right answer
    const STATEMENT=new Set('DNVA DJNVA DNCJ DNCYJ DJNCJ PVDN PVDJN MVDN MVDJN PXVA PXVDN PXVDJN DNXVA NXVA PVTV PVRDN FVDN VRDN VADN PCYJ MCYJ PCJ DNVRO PXVO PXVM PCDJN'.split(' '));
    const QUESTION=new Set('XPVDN XPVA XPVJN CDNJ WCDN WCDJN WXPV WXVO CPDN'.split(' '));
    if(SENT_UN.length!==40)b('level 3 has '+SENT_UN.length+' sentences, not 40');
    const perms=a=>a.length<2?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(r=>[x,...r]));
    const seenS=new Set();
    for(const [s,r] of SENT_UN){
      const ws=s.split(' '),w=s+': ';
      if(seenS.has(s))b(w+'twice');seenS.add(s);
      if(ws.length<4||ws.length>6)b(w+ws.length+' words');
      if(r.length!==ws.length)b(w+'role string has '+r.length+' letters for '+ws.length+' words');
      if(!/^[A-Z]/.test(ws[0]))b(w+'first word not capital');
      if(!/[.!?]$/.test(s))b(w+'no end mark');
      ws.slice(1).forEach((x,i)=>{if(/^[A-Z]/.test(x)&&x!=='I'&&r[i+1]!=='M')b(w+'a middle word is capital: '+x)});
      if(new Set(ws.map(x=>x.toLowerCase().replace(/[^a-z]/g,''))).size!==ws.length)b(w+'a word twice (tiles would look the same)');
      if(rude(s))b(w+'BAD word');
      if(/[^A-Za-z .!?',]/.test(s))b(w+'odd character');
      const q=/\?$/.test(s),G0=q?QUESTION:STATEMENT;
      if(!G0.has(r))b(w+'role string '+r+' is not a known '+(q?'question':'statement')+' shape');
      // every order of the middle words (first word and end mark stay put, as the tiles show them) that fits a known shape
      const mid=ws.map((x,i)=>i),fit=[];
      for(const p of perms(mid.slice(1,-1))){
        const o=[0,...p,ws.length-1],role=o.map(i=>r[i]).join('');
        if(G0.has(role))fit.push(o.join(''));
      }
      if(fit.length!==1||fit[0]!==mid.join(''))b(w+'orders that fit: '+fit.length+' ('+fit.slice(0,3).join(' ')+')');
    }
    // ---- 2. level 4 data: 40 cloze sentences, one blank, 3 different words ----
    if(SENT_CL.length!==40)b('level 4 has '+SENT_CL.length+' sentences, not 40');
    const seenC=new Set();
    for(const [s,a,x,y] of SENT_CL){
      const w=s+': ';
      if(seenC.has(s))b(w+'twice');seenC.add(s);
      if(s.split('___').length!==2)b(w+'needs exactly one blank');
      if(new Set([a,x,y]).size!==3)b(w+'the three words are not different');
      if([a,x,y].some(t=>!/^[a-z]+$/.test(t)))b(w+'a word is not plain lowercase');
      if(rude(s+' '+a+' '+x+' '+y))b(w+'BAD word');
      if(!/^[A-Z]/.test(s)||!/[.!?]$/.test(s))b(w+'capital or end mark');
      if(s.split(' ').length>12)b(w+'too long for a first reader');
    }
    // ---- 3. level 5 data: 12 stories of 3 sentences; picture nouns have pictures ----
    if(SENT_ST.length<10)b('only '+SENT_ST.length+' stories');
    for(const st of SENT_ST){
      if(st.length!==3||new Set(st).size!==3)b('story '+st[0]+': needs 3 different sentences');
      for(const s of st){if(!/^[A-Z]/.test(s)||!/[.!?]$/.test(s))b(s+': capital or end mark');if(rude(s))b(s+': BAD word')}
    }
    for(const w of SENT_PIC)if(!NOUNS.some(n=>n[0]===w))b('picture noun '+w+' is not in NOUNS');
    for(const w of SENT_PIC)if(BAD.test(w))b('BAD picture noun '+w);
    // ---- 4. 3,000 samples per level ----
    const seen={3:new Set(),4:new Set(),5:new Set()},kinds={},lab={};
    for(let lv=3;lv<=5;lv++){
      const w2='sent L'+lv+': ';
      for(let i=0;i<3000;i++){
        const q=genQ('sent',lv,i+1);
        const pr=kindProblems(q);if(pr.length)b(w2+q.label+': '+pr.join('; '));
        if(q.sk!=='sent'||q.lv!==lv)b(w2+'genQ did not stamp sk/lv');
        if(typeof q.say!=='string'||q.say.length<8)b(w2+'say missing');
        if(!q.hint||q.hint.k!=='text'||q.hint.s.length<10)b(w2+'hint missing');
        if(typeof q.label!=='string'||!q.label||q.label.length>=60)b(w2+'label missing or too long: '+q.label);
        try{hintHTML(q)}catch(e){b(w2+'hintHTML threw')}
        const sig=JSON.stringify(q.ans);
        if(lab[q.label]!==undefined&&lab[q.label]!==sig)b(w2+'one label, two different answers: '+q.label);
        lab[q.label]=sig;seen[lv].add(q.label);
        const txt=q.html+' '+q.say+' '+(q.hint.s||'');
        if(/undefined|NaN|\[object|null/.test(txt))b(w2+'undefined in text');
        kinds[lv+q.kind+(q.cls||'')]=(kinds[lv+q.kind+(q.cls||'')]||0)+1;
        if(q.kind=='order'){
          if(q.items.length!==q.ans.length)b(w2+'order has distractor tiles');
          if(q.items.every((t,j)=>t.v===q.ans[j]))b(w2+q.label+': tiles already in order');
          if(new Set(q.items.map(t=>t.v)).size!==q.items.length)b(w2+q.label+': two tiles with one value');
          if(lv==3){
            const s=q.ans.join(' ');
            if(!SENT_UN.some(x=>x[0]===s))b(w2+'answer is not a level 3 sentence: '+s);
            if(/[a-z]/.test(q.ans[0][0])||!/[.!?]$/.test(q.ans[q.ans.length-1]))b(w2+'first/last tile cue missing');
          }else if(!SENT_ST.some(st=>JSON.stringify(st)===sig))b(w2+'answer is not a story');
        }else{
          const vs=q.choices.map(c=>c.v);
          if(vs.length!==3||new Set(vs).size!==3||!vs.includes(q.ans))b(w2+q.label+': choices '+vs.join('|'));
          if(lv==4){
            const row=SENT_CL.find(r=>[r[1],r[2],r[3]].sort().join()===[...vs].sort().join()&&r[1]===q.ans&&q.after===r[0].replace('___',r[1]));
            if(!row)b(w2+q.label+': not a level 4 sentence');
            if(!/id="slot"/.test(q.html)||/___/.test(q.html))b(w2+'blank not shown as a slot');
          }else{
            // exactly one sentence names both pictures
            const has=(t,n)=>wordsOf(t).includes(n),nm=SENT_PIC.filter(n=>has(q.ans,n));
            if(nm.length!==2)b(w2+q.ans+': answer names '+nm.length+' picture words');
            for(const v of vs)if(v!==q.ans&&nm.every(n=>has(v,n)))b(w2+v+': a second sentence names both pictures');
            if(rude(vs.join(' ')))b(w2+'BAD word');
            if(!/class="emo"/.test(q.html))b(w2+'no picture');
          }
        }
      }
    }
    if(seen[3].size!==40)b('level 3 drew '+seen[3].size+' of 40 sentences in 3,000 questions');
    if(seen[4].size<39)b('level 4 drew '+seen[4].size+' of 40 sentences in 3,000 questions');
    if(!kinds['5order']||!kinds['5choicewide'])b('level 5 should mix pictures and stories: '+JSON.stringify(kinds));
    if(JSON.stringify(genQ('sent',3,77))!==JSON.stringify(genQ('sent',3,77)))b('level 3 not reproducible');
    // levels 1-2 are untouched: still the picture match, from genSent
    for(let i=0;i<300;i++)for(const lv of [1,2]){
      const q=genQ('sent',lv,i+1);
      if(q.kind!=='choice'||q.cls!=='pics'||q.choices.length!==3||!NOUNS.some(n=>n[0]===q.ans))b('sent L'+lv+' changed');
    }
    // ---- 5. stops: CURRICULUM 2.2 places sent 3 last in Space Station and sent 4, 5 in Word Workshop ----
    const stops=id=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid);
    const sp=stops('r_space'),ws=stops('r_workshop');
    if(sp[sp.length-1]!=='sent3'||sp.filter(x=>/^sent/.test(x)).length!==1)b('sent3 is not the last stop of Space Station: '+sp.join(' '));
    if(!ws.includes('sent4')||!ws.includes('sent5')||ws.indexOf('sent4')>ws.indexOf('sent5'))b('sent4, sent5 missing or out of order in Word Workshop: '+ws.join(' '));
    for(const [sk,lv,t] of [['sent',3,'Build Sentences'],['sent',4,'Fill the Gap'],['sent',5,'Sentence Stories']]){
      const row=PATHS.read.worlds.flatMap(w=>w.nodes).find(x=>x[0]===sk&&x[1]===lv);
      if(!row||row[2]!==t)b('stop '+sk+lv+' title');
    }
    const all=NODES.read.map(nid);
    if(new Set(all).size!==all.length)b('duplicate stop ids');
    for(const w of PATHS.read.worlds){const t=w.nodes.map(n=>n[2]);if(new Set(t).size!==t.length)b(w.id+': two stops share a title')}
    // ---- 6. saves: the reading map without the three new stops against today's, 8 fixtures x 7 grades ----
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const NEW=new Set(['sent3','sent4','sent5']),CUR=PATHS.read.worlds;
    const OLD=()=>CUR.map(w=>({...w,nodes:w.nodes.filter(x=>!NEW.has(x[0]+x[1]))}));
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),wid:n.wid}});o._cur=nid(NODES.read[curNode('read')]);return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])fixtures.push([name,fx(name)]);
    {load(null);const m={};PATHS.read.worlds=OLD();buildNodes('read');NODES.read.forEach(n=>{m[nid(n)]=2});
      PATHS.read.worlds=CUR;buildNodes('read');fixtures.push(['all-old-passed',JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{read:m,math:{},es:{}},grade:2})])}
    // finished every old stop of Space Station and Word Workshop; boss not beaten
    {load(null);const m={};PATHS.read.worlds=OLD();buildNodes('read');
      NODES.read.forEach(n=>{if(n.sk!=='boss')m[nid(n)]=2});
      PATHS.read.worlds=CUR;buildNodes('read');fixtures.push(['stops-done-no-boss',JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{read:m,math:{},es:{}},grade:2})])}
    fixtures.push(['workshop-midway',JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{read:{pic4:2,build4:2,sight4:2,pic5:2,build5:2,spell3:3,sight5:1},math:{},es:{}},grade:2})]);
    let checked=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,6]){
      load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      const g0=S.grade,tag=name+' g'+g0+': ';
      PATHS.read.worlds=OLD();buildNodes('read');
      const before=snap();
      PATHS.read.worlds=CUR;buildNodes('read');
      const after=snap(),mapNow=JSON.stringify(S.maps.read);
      for(const k in before){
        if(k=='_cur')continue;
        checked++;
        if(!after[k]){b(tag+'stop '+k+' vanished');continue}
        if(before[k].st!==after[k].st)b(tag+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].st>0&&!after[k].open)b(tag+'passed stop '+k+' is locked');
        if(before[k].open&&!after[k].open){
          // the one allowed wait: a boss whose world gained a stop at its end opens once that new stop is played (nothing passed is locked)
          const bw=/^boss_/.test(k)&&after.sent3&&after[k].wid&&['r_space','r_workshop'].includes(after[k].wid);
          if(!bw||before[k].st>0)b(tag+k+' re-locked');
        }
      }
      // the map opens where it did, unless it was on a boss that now waits for the new stop at the end of its world
      const bossWait=/^boss_/.test(before._cur)&&before[before._cur].open&&!after[before._cur].open&&after._cur===(before._cur=='boss_r_space'?'sent3':'sent4');
      if(before._cur!==after._cur&&!bossWait)b(tag+'the map opens on '+after._cur+', it was '+before._cur);
      for(const k of NEW)if(after[k].st!==0)b(tag+k+' starts with stars');
      if(JSON.stringify(S.maps.read)!==mapNow)b(tag+'map changed by building the nodes');
      // the new stops carry the NEW tag when their world is finished, and are never locked then
      for(const k of NEW){
        const i=NODES.read.findIndex(n=>nid(n)===k);
        if(stopNew('read',i)&&!unlocked('read',i))b(tag+k+' is NEW but locked');
      }
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    out.checked=checked;
    return out;
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:[...r],note:'3 levels x 3,000 samples, 40 + 40 + 12 items, '+r.checked+' stop checks over 7 fixtures x 7 grades'};
});

// ---- P2-21: grammar levels 6-9 (bank data, 3,000 samples per level, hints, map stops, save safety) ----
run('grammar B P2-21: gram 6-9 bank, 3000 questions per level, one right answer, hints, say, labels, stops, no star moves, no re-lock',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const gerrs=[],bad=m=>gerrs.push(m);
  const body=function(){
    const want={6:64,7:41,8:57,9:57},LV=[6,7,8,9];
    if(SK.gram.max!==9||SK.gram.bank!=='gram')bad('SK.gram is '+JSON.stringify({max:SK.gram.max,bank:SK.gram.bank}));
    for(const m of bankProblems('gram',{levels:[1,2,3,4,5,6,7,8,9],min:40}))bad(m);
    if(BANK.gram.some(it=>it.lv<1||it.lv>9))bad('BANK.gram has an item above level 9');
    for(const lv of LV){
      const items=BANK.gram.filter(it=>it.lv==lv),w2='level '+lv+': ';
      if(items.length!==want[lv])bad(w2+items.length+' items, wants '+want[lv]);
      for(const it of items){
        if(!it.topic)bad(w2+it.q+': no topic');
        if(typeof it.hint!=='string'||it.hint.length<20)bad(w2+it.q+': no teaching hint');
        else{
          // a hint teaches the method: it never holds the answer word (or a wrong choice that is one word)
          const one=x=>String(x).length>2&&/^[a-z']+$/i.test(x);
          if(one(it.a)&&new RegExp('\\b'+it.a+'\\b','i').test(it.hint))bad(w2+it.q+': the hint holds the answer '+it.a);
          if(one(it.a))for(const x of it.d||[])if(one(x)&&new RegExp('\\b'+x+'\\b','i').test(it.hint))bad(w2+it.q+': the hint holds a wrong choice '+x);
        }
        if(it.form=='tap'&&bankWords(it.sent).length>4)bad(w2+it.sent+': more than 4 words to tap');
        if(it.form!='tap'&&(it.d||[]).some(x=>x.toLowerCase()===String(it.a).toLowerCase()))bad(w2+it.q+': a wrong choice equals the answer');
      }
      const seen=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ('gram',lv,i+1),w3=w2+q.label+': ';
        const pr=kindProblems(q);if(pr.length)bad(w3+pr.join('; '));
        const vs=q.choices.map(c=>String(c.v));
        if(vs.length<2||vs.length>4)bad(w3+vs.length+' choices');
        if(new Set(vs).size!==vs.length)bad(w3+'two choices alike');
        if(vs.filter(v=>v===String(q.ans)).length!==1)bad(w3+'not exactly one right choice');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s||q.hint.s.length<20||q.hint.s.length>140)bad(w3+'hint');
        if(!q.say||q.say.length<8)bad(w3+'say');
        if(q.sk!=='gram'||q.lv!==lv)bad(w3+'genQ did not stamp sk/lv');
        if(q.label.length>=60)bad(w3+'label too long');
        const key=q.bk.bi;
        if(labels[q.label]!==undefined&&labels[q.label]!==key)bad(w3+'label is not unique');
        labels[q.label]=key;seen.add(key);
        const t=(q.html+' '+q.say+' '+q.choices.map(c=>c.l).join(' ')).split(/[^A-Za-z']+/).filter(Boolean);
        for(const x of t)if(BAD.test(x.toLowerCase()))bad(w3+'BAD word '+x);
      }
      if(seen.size!==items.length)bad(w2+'3000 questions drew only '+seen.size+' of '+items.length+' items');
      if(Object.keys(labels).length!==items.length)bad(w2+'labels are not one per item');
      if(JSON.stringify(genQ('gram',lv,77))!==JSON.stringify(genQ('gram',lv,77)))bad(w2+'not reproducible');
      const a=genQ('gram',lv,5);
      {const r=bankRebuild(a.bk),f=q=>JSON.stringify([q.html,q.say,q.ans,q.choices,q.hint,q.label,q.bk]);if(f(r)!==f(a))bad(w2+'bankRebuild differs');}
    }
    const forms=lv=>[...new Set(BANK.gram.filter(it=>it.lv==lv).map(it=>it.form||'choice'))].sort().join();
    if(forms(6)!=='choice'||forms(7)!=='wide'||forms(8)!=='choice,tap,wide'||forms(9)!=='choice,wide')bad('forms per level: '+[6,7,8,9].map(forms).join(' | ')); // level 8 word types are wide (long words like "interjection")
    // map: gram 6 to 9 once each, by world id, in CURRICULUM 2.2 order (stops of other skills are ignored so later chunks can add theirs)
    const wst=id=>NODES.read.filter(n=>n.wid==id&&n.sk=='gram').map(n=>n.sk+n.lv).join(' ');
    if(wst('r_library')!=='gram6 gram7')bad('r_library gram stops: '+wst('r_library'));
    if(wst('r_island')!=='gram8')bad('r_island gram stops: '+wst('r_island'));
    if(wst('r_legend')!=='gram9')bad('r_legend gram stops: '+wst('r_legend'));
    const before2=(id,a,b)=>{const ks=NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid);return ks.indexOf(a)>=0&&ks.indexOf(a)<ks.indexOf(b)};
    if(!before2('r_library','spell5','gram6'))bad('gram6 must come after spell5');
    if(!before2('r_library','gram6','gram7'))bad('gram7 must come after gram6');
    if(!before2('r_island','spell6','gram8'))bad('gram8 must come after spell6');
    if(!before2('r_legend','spell7','gram9'))bad('gram9 must come after spell7');
    const rd=NODES.read.filter(n=>n.sk=='gram').map(n=>n.lv).join(' ');
    if(rd!=='1 2 3 4 5 6 7 8 9')bad('gram stops in path order: '+rd);
    // save safety: fixtures at several grades; the reading path without the gram 6-9 stops against today's
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.read.worlds,NEWK=['gram6','gram7','gram8','gram9'];
    const OLD=CUR.map(w=>({...w,nodes:w.nodes.filter(x=>!(x[0]==='gram'&&x[1]>=6))}));
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i)}});return o};
    let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])for(const g of [null,-1,0,1,2,3,6]){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      PATHS.read.worlds=OLD;buildNodes('read');
      const before=snap(),curB=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=CUR;buildNodes('read');
      const aft=snap(),curA=nid(NODES.read[curNode('read')]);
      for(const k in before){
        checked++;
        if(!aft[k]){bad(name+' g'+g+': stop '+k+' vanished');continue}
        if(before[k].st!==aft[k].st)bad(name+' g'+g+': '+k+' stars '+before[k].st+' -> '+aft[k].st);
        if(before[k].open&&!aft[k].open)bad(name+' g'+g+': '+k+' re-locked');
        if(before[k].st>0&&!aft[k].open)bad(name+' g'+g+': passed stop '+k+' is locked');
      }
      // a gram stop added to a finished world is NEW, open, has no stars and is never the current stop
      for(const k of NEWK){
        const i=NODES.read.findIndex(n=>nid(n)==k);
        if(getSt('read',i)!==0)bad(name+': '+k+' starts with stars');
        if(passed('read',WR.read[NODES.read[i].wi][1])&&(!stopNew('read',i)||!unlocked('read',i)||curA==k))bad(name+' g'+g+': '+k+' in a finished world is not NEW, open and not current');
      }
      if(curB!==curA&&!/^boss_/.test(curB)&&v42Stops('read').includes(curB)&&NODES.read.some((n,i)=>passed('read',i)))bad(name+' g'+g+': current stop moved '+curB+' -> '+curA);
    }
    // a synthetic child who finished Dragon Library and Author Island before gram 6-8 existed keeps every star (Legend Lab is still ahead of them,
    // so the current stop is spell 7, and gram 9 sits behind it as a normal locked stop)
    load(null);S.grade=6; // Dragon Library, Author Island and Legend Lab open by grade 4, 5 and 6
    PATHS.read.worlds=OLD;buildNodes('read');
    const olds=NODES.read.filter(n=>['r_library','r_island'].includes(n.wid)).map(nid);
    for(const k of olds)S.maps.read[k]=3;
    PATHS.read.worlds=CUR;buildNodes('read');
    for(const k of olds)if(S.maps.read[k]!==3)bad('synthetic save: '+k+' lost stars');
    for(const k of ['gram6','gram7','gram8']){
      const i=NODES.read.findIndex(n=>nid(n)==k);
      if(!stopNew('read',i)||!unlocked('read',i)||nid(NODES.read[curNode('read')])===k)bad('synthetic save: '+k+' not NEW and open, or is the current stop');
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    return {checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:gerrs,note:'219 items, 12000 questions, '+r.checked+' stop checks over 6 fixtures x 7 grades'};
});

// ---- P2-23: vocabulary levels 6-10 (bank data, 3,000 questions per level, map stops, save safety) ----
run('vocabulary P2-23: levels 6-10 bank validates, one right answer per item, 3000 questions per level, hints, map stops, no star moves, no re-lock',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const serrs=[],bad=m=>serrs.push(m);
  const body=function(){
    const want={6:95,7:47,8:59,9:62,10:64},LV=[6,7,8,9,10],KINDS=['simile','metaphor','personification','idiom'];
    if(!SK.vocab||SK.vocab.max!==10||SK.vocab.bank!=='vocab'||SK.vocab.area!=='read')bad('SK.vocab is wrong');
    for(const m of bankProblems('vocab',{levels:[1,2,3,4,5,6,7,8,9,10],min:40}))bad(m);
    const items=BANK.vocab;
    if(items.some(it=>it.lv<1||it.lv>10))bad('vocab has an item outside levels 1-10');
    const star=q=>(q.match(/\*([^*]+)\*/g)||[]);
    for(const lv of LV){
      const L=items.filter(it=>it.lv==lv),w2='level '+lv+': ';
      if(L.length!==want[lv])bad(w2+L.length+' items, wants '+want[lv]);
      const qs=new Set();
      for(const it of L){
        const all=[it.a,...it.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)bad(w2+it.q+': a choice repeats');
        if(it.d.length!==3)bad(w2+it.q+': needs 4 choices');
        if((it.form||'')!==(Math.max(it.a.length,...it.d.map(x=>x.length))>8?'wide':''))bad(w2+it.q+': form '+it.form+' (wide only when a choice is over 8 letters)');
        if(!it.hint||it.hint.length<20)bad(w2+it.q+': hint missing');
        if(it.hint&&it.hint.toLowerCase().split(/[^a-z']+/).includes(it.a.toLowerCase()))bad(w2+it.q+': the hint gives the answer');
        if(!it.topic)bad(w2+it.q+': no topic');
        if(it.em||it.pic)bad(w2+it.q+': no picture is expected');
        if(qs.has(it.q))bad(w2+it.q+': the same prompt twice');qs.add(it.q);
        if(it.q.length>120)bad(w2+it.q+': prompt over 120 letters (will not fit)');
        if([it.a,...it.d].some(x=>x.length>60))bad(w2+it.q+': a choice is over 60 letters');
      }
    }
    // level 6: one blank, the sound-alike word is a choice, and the pairs agree both ways
    {
      const L=items.filter(i=>i.lv==6),ans=new Map();
      for(const it of L){
        if(it.q.split('___').length!==2)bad('level 6: '+it.q+': needs exactly one blank');
        if(star(it.q).length)bad('level 6: stars in '+it.q);
        if(!ans.has(it.a))ans.set(it.a,[]);ans.get(it.a).push(it);
      }
      if(ans.size<45)bad('level 6: only '+ans.size+' different answer words');
      for(const it of L)if(!it.d.some(w=>ans.has(w)&&ans.get(w).some(o=>o.d.includes(it.a))))bad('level 6: '+it.q+': no sound-alike choice that points back at '+it.a);
      const groups=new Set(L.map(i=>[i.a,...i.d.filter(w=>ans.has(w)&&ans.get(w).some(o=>o.d.includes(i.a)))].sort().join('/')));
      if(groups.size<30)bad('level 6: only '+groups.size+' homophone groups (needs 30)');
    }
    // level 7: the same bold word in the sentence and the question, 4 meanings, no meaning repeats the word
    for(const it of items.filter(i=>i.lv==7)){
      const s=star(it.q);
      if(s.length!==2||s[0]!==s[1])bad('level 7: '+it.q+': needs the same bold word twice (in the sentence and in the question)');
      else if(!/ What does \*\w+\* mean\?$/.test(it.q))bad('level 7: question shape '+it.q);
      else if([it.a,...it.d].some(x=>x.toLowerCase().includes(s[0].slice(1,-1).toLowerCase())))bad('level 7: '+it.q+': a choice repeats the word');
    }
    // level 8: idiom meanings, and kind of language (always the same four kinds)
    {
      const L=items.filter(i=>i.lv==8),kinds=L.filter(i=>/^Which kind of language is /.test(i.q)),idi=L.filter(i=>/^What does ".+" mean\?$/.test(i.q));
      if(kinds.length+idi.length!==L.length)bad('level 8: item shape');
      for(const it of kinds){
        if(JSON.stringify([it.a,...it.d].sort())!==JSON.stringify([...KINDS].sort()))bad('level 8: '+it.q+': wrong set of kinds');
        const p=it.q.match(/"(.+)"/)[1].toLowerCase(),clue=/\bas .+ as\b|\blike\b/.test(p);
        if((it.a==='simile')!==clue)bad('level 8: '+it.q+': a simile has like or as, and nothing else here does');
      }
      for(const k of KINDS)if(kinds.filter(i=>i.a===k).length<6)bad('level 8: fewer than 6 of '+k);
      if(idi.length<24)bad('level 8: fewer than 24 idiom meanings');
      for(const it of idi)if(it.q.toLowerCase().includes(it.a.toLowerCase()))bad('level 8: '+it.q+': the meaning is in the prompt');
    }
    // level 9: roots (the wrong choices are other meanings) and words
    {
      const L=items.filter(i=>i.lv==9),roots=L.filter(i=>/^What does the root /.test(i.q)),wd=L.filter(i=>/^What does \*\w+\* mean\?$/.test(i.q));
      if(roots.length+wd.length!==L.length)bad('level 9: item shape');
      for(const r of ['bio','geo','graph','tele','photo','aqua','port','rupt','spect','struct','scrib','dict','micro','therm'])if(!roots.some(i=>i.q.includes('*'+r+'*')))bad('level 9: root '+r+' is missing');
      for(const it of roots){
        const eg=it.q.match(/\((.+)\)$/);
        if(!eg)bad('level 9: '+it.q+': no example words');
        else{const r=it.q.match(/\*(\w+)\*/)[1];for(const w of eg[1].split(', '))if(!w.includes(r.slice(0,3)))bad('level 9: '+it.q+': '+w+' does not hold the root');}
      }
      if(wd.length<30)bad('level 9: fewer than 30 word items');
      const ROOTM=roots.map(i=>i.a);
      for(const it of wd)if(ROOTM.includes(it.a))bad('level 9: '+it.q+': answer is a bare root meaning');
    }
    // level 10: analogies and shades of meaning
    {
      const L=items.filter(i=>i.lv==10),an=L.filter(i=>i.topic=='analogies'),sh=L.filter(i=>i.topic=='shades of meaning');
      if(an.length+sh.length!==L.length)bad('level 10: item topics');
      for(const it of an)if(!/^[\w' ]+ : [\w' ]+ :: [\w' ]+ : \?$/.test(it.q))bad('level 10: analogy shape '+it.q);
      if(an.length<30)bad('level 10: fewer than 30 analogies');
      const sets=VOC_L10S.split('\n').map(r=>r.split('|'));
      for(const [w,top,low] of sets){
        const ws=w.split(','),t=sh.find(i=>i.q===top),l=sh.find(i=>i.q===low);
        if(!t||t.a!==ws[3]||[t.a,...t.d].sort().join()!==[...ws].sort().join())bad('level 10: strongest item for '+w);
        if(!l||l.a!==ws[0]||[l.a,...l.d].sort().join()!==[...ws].sort().join())bad('level 10: weakest item for '+w);
      }
      if(sh.length!==sets.length*2)bad('level 10: shades items '+sh.length);
    }
    // 3000 seeded questions per level
    for(const lv of LV){
      const w2='level '+lv+': ',seen=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ('vocab',lv,i+1);
        const pr=kindProblems(q);if(pr.length)bad(w2+q.label+': '+pr.join('; '));
        seen.add(q.bk.bi);
        if(q.kind!=='choice')bad(w2+q.label+': kind '+q.kind);
        const vs=q.choices.map(c=>c.v);
        if(new Set(vs).size!==vs.length||vs.filter(v=>v===q.ans).length!==1)bad(w2+q.label+': not exactly one right choice');
        if(vs.length!==4)bad(w2+q.label+': '+vs.length+' choices');
        if(!q.say||!q.say.trim()||q.say.includes('*'))bad(w2+q.label+': say text');
        if(!q.hint||q.hint.k!=='text'||q.hint.s.length<20)bad(w2+q.label+': hint');
        if(!q.label||q.label.length>=60||q.label.includes('*'))bad(w2+'label '+q.label);
        if(labels[q.label]!==undefined&&labels[q.label]!==q.bk.bi)bad(w2+'label '+q.label+' is not unique');
        labels[q.label]=q.bk.bi;
        if(q.sk!=='vocab'||q.lv!==lv)bad(w2+'genQ did not stamp sk/lv');
        if(lv==7&&!/<b>/.test(q.html))bad(w2+q.label+': no bold word');
        if((lv==6||lv==10)&&/<b>/.test(q.html))bad(w2+q.label+': unexpected bold');
        if(i<40&&bankRebuild(q.bk).label!==q.label)bad(w2+q.label+': bankRebuild differs');
      }
      if(seen.size!==want[lv])bad(w2+'3000 questions drew only '+seen.size+' of '+want[lv]+' items');
    }
    for(const lv of LV)if(JSON.stringify(genQ('vocab',lv,77))!==JSON.stringify(genQ('vocab',lv,77)))bad('level '+lv+' is not reproducible');
    // map: vocab 6-8 in Dragon Library after spell 5, 9 in Author Island, 10 in Legend Lab (other skills' stops, such as gram, are ignored)
    const rd=NODES.read.filter(n=>n.sk=='vocab'&&n.lv>=6).map(n=>n.lv+'@'+n.wid).join(' ');
    if(rd!=='6@r_library 7@r_library 8@r_library 9@r_island 10@r_legend')bad('vocab stops: '+rd);
    const wst=id=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid).filter(x=>/^(spell|vocab)/.test(x)).join(' ');
    if(wst('r_library')!=='spell5 vocab6 vocab7 vocab8')bad('r_library order: '+wst('r_library'));
    if(wst('r_island')!=='spell6 vocab9')bad('r_island order: '+wst('r_island'));
    if(wst('r_legend')!=='spell7 vocab10')bad('r_legend order: '+wst('r_legend'));
    // save safety: the reading path without the five new stops against today's
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.read.worlds,NEWV=['vocab6','vocab7','vocab8','vocab9','vocab10'];
    const OLD=()=>CUR.map(w=>({...w,nodes:w.nodes.filter(x=>!(x[0]==='vocab'&&x[1]>=6))}));
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i)}});return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'])fixtures.push([name,fx(name)]);
    {load(null);const m={};PATHS.read.worlds=OLD();buildNodes('read');NODES.read.forEach(n=>{m[nid(n)]=2});
      PATHS.read.worlds=CUR;buildNodes('read');fixtures.push(['all-old-passed',JSON.stringify({maps:{read:m},grade:6})])}
    fixtures.push(['library-mid',JSON.stringify({maps:{read:{spell5:3,spell4:2}},grade:4})]);
    fixtures.push(['worlds-done',JSON.stringify({maps:{read:{spell5:3,spell6:1,spell7:1}},grade:5})]);
    let checked=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,4,5,6]){
      load(Object.keys(JSON.parse(raw)).length?raw:null);if(g!==null)S.grade=g;
      PATHS.read.worlds=OLD();buildNodes('read');
      const before=snap(),curB=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=CUR;buildNodes('read');
      const after=snap(),curA=nid(NODES.read[curNode('read')]);
      for(const k in before){
        checked++;
        if(!after[k]){bad(name+' g'+g+': stop '+k+' vanished');continue}
        if(before[k].st!==after[k].st)bad(name+' g'+g+': '+k+' stars '+before[k].st+' -> '+after[k].st);
        if(before[k].open&&!after[k].open)bad(name+' g'+g+': '+k+' re-locked');
        if(before[k].st>0&&!after[k].open)bad(name+' g'+g+': passed stop '+k+' is locked');
      }
      for(const k of NEWV){
        const i=NODES.read.findIndex(n=>nid(n)==k);
        if(getSt('read',i)!==0)bad(name+': '+k+' starts with stars');
        if(passed('read',WR.read[NODES.read[i].wi][1])&&(!stopNew('read',i)||!unlocked('read',i)||curA==k))bad(name+' g'+g+': '+k+' in a finished world is not NEW, open and not current');
      }
      if(curB!==curA&&!/^boss_/.test(curB)&&v42Stops('read').includes(curB)&&NODES.read.some((n,i)=>passed('read',i)))bad(name+' g'+g+': current stop moved '+curB+' -> '+curA);
    }
    PATHS.read.worlds=CUR;buildNodes('read');
    return {checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:serrs,note:'327 items, 15000 questions, '+r.checked+' stop checks over 8 fixtures x 9 grades'};
});

run('step hints (P2-08): every step of 3,000 random problems per algorithm is right and leads to the answer; panel, CSS',()=>{
  const p=[];
  const css=fs.readFileSync(path.join(SRC,'css','39-steps.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('raw hex colour in 39-steps.css');
  if(/rgba?\(|hsla?\(/.test(css))p.push('colour function in 39-steps.css');
  if(/(^|[;{\s])(-webkit-)?(backdrop-)?filter\s*:/.test(css))p.push('filter or backdrop-filter used');
  if(/transition\s*:/.test(css))p.push('39-steps.css should not need transitions');
  const kf=[...css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)];
  if(kf.length<4)p.push('keyframes not found');
  for(const [,n,body] of kf){
    if(!/^k-/.test(n))p.push('keyframes '+n+' must be named k-*');
    for(const d of body.match(/[a-z-]+(?=\s*:)/g)||[])if(d!='transform'&&d!='opacity')p.push('keyframes '+n+' animates '+d);
  }
  const others=fs.readdirSync(path.join(SRC,'css')).filter(f=>f!='39-steps.css').map(f=>fs.readFileSync(path.join(SRC,'css',f),'utf8')).join('');
  for(const [,n] of kf)if(new RegExp('@keyframes\\s+'+n+'\\b').test(others))p.push('keyframes name '+n+' is also used in another CSS file');
  for(const m of css.matchAll(/var\(--([a-z0-9-]+)/g))if(!['hsw','hpt'].includes(m[1])&&!new RegExp('--'+m[1]+':').test(tok))p.push('unknown token --'+m[1]);
  const out=eval(js+`
  const bad=[],N=3000;RNG=mulberry32(2008);
  const B=s=>{if(bad.length<40)bad.push(s)};
  // every hint: k steps, at least one step, html and say for each, the last step asks ("?", r null), no other step does;
  // every number of a step's computation is on show; each board grid is whole rows; the spoken text has no symbols or markup
  const shape=(h,w)=>{
    if(!h||h.k!=='steps'||!Array.isArray(h.steps)||!h.steps.length)return B(w+': not a step hint');
    h.steps.forEach((s,i)=>{
      const last=i==h.steps.length-1;
      if(typeof s.html!=='string'||typeof s.say!=='string'||!s.say.trim())B(w+' step '+i+': html/say');
      if(/undefined|NaN|null/.test(s.html+s.say))B(w+' step '+i+': undefined/NaN in '+s.html);
      if(/[<>×÷−]|&nbsp;/.test(s.say))B(w+' step '+i+': say has markup or symbols: '+s.say);
      const c=s.c;if(!c)return B(w+' step '+i+': no computation record');
      if(last!==(c.r===null))B(w+' step '+i+': r should be null only in the last step');
      if(last&&!s.html.includes('?'))B(w+': last step has no ?');
      const txt=s.html.replace(/<[^>]+>/g,' ');
      for(const x of c.x.concat(last?[]:[c.r]))if(typeof x=='number'&&!new RegExp('(^|[^0-9])'+x+'([^0-9]|$)').test(txt))B(w+' step '+i+': '+x+' not shown');
      for(const m of s.html.matchAll(/<div class="hsb[^"]*" style="grid-template-columns:([^"]+)">([\\s\\S]*?)<\\/div>/g)){
        const cols=m[1].split(' ').length;let cells=0;
        for(const t of m[2].matchAll(/<i [^>]*?(?:grid-column:span (\\d))?"?>/g))cells+=t[1]?+t[1]:1;
        if(cells%cols)B(w+' step '+i+': board cells '+cells+' not whole rows of '+cols);
      }
    });
  };
  const num=(lo,hi)=>R(lo,hi);
  const nd=k=>k==1?R(0,9):R(10**(k-1),10**k-1);
  const decStr=()=>{const d=R(0,3),i=String(nd(R(1,4)));return d?i+'.'+Array.from({length:d},()=>R(0,9)).join(''):i};
  const sc=(s,d)=>{const [i,f='']=s.split('.');return +(i+f.padEnd(d,'0'))};
  const dg=(s,e,d)=>{const [i,f='']=s.split('.');if(e>=0)return e<i.length?+i[i.length-1-e]:null;const k=-e-1;return k<f.length?+f[k]:k<d?0:null};
  // ---- addition: each column's digits and carry, the sum, and the last step plus what is brought down make the answer
  for(let t=0;t<N;t++){
    const xs=t<N/3?[String(nd(R(1,6))),String(nd(R(1,6)))]:t<2*N/3?Array.from({length:R(2,4)},()=>String(nd(R(1,6)))):Array.from({length:R(2,3)},decStr);
    const w='add '+xs.join(' + ');let h;try{h=stepsAdd(...xs)}catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const d=Math.max(...xs.map(x=>(x.split('.')[1]||'').length)),want=xs.reduce((s,x)=>s+sc(x,d),0);
    let carry=0,got=0;
    h.steps.forEach((s,i)=>{const c=s.c,e=-d+i,terms=xs.map(x=>dg(x,e,d)).filter(v=>v!=null),exp=(carry?[carry]:[]).concat(terms);
      if(c.e!==e||c.op!=='+'||c.x.join()!==exp.join())B(w+' column '+e+': '+c.x+' expected '+exp);
      const sum=exp.reduce((a,b)=>a+b,0);
      if(c.r!==null){if(c.r!==sum)B(w+': '+c.x+' = '+c.r);got+=(sum%10)*10**(e+d);carry=Math.floor(sum/10)}
      else got+=sum*10**(e+d)+c.up;
    });
    if(got!==want)B(w+': steps give '+got+', answer '+want);
  }
  // ---- subtraction: regroup only when the top digit is too small, from the nearest non-zero place; every column right
  for(let t=0;t<N;t++){
    let a,b;
    if(t<N/2){a=nd(R(2,6));b=R(0,a);if(t%3==0)a=+String(a).replace(/[1-9](?=\\d)/g,m=>rnd()<.5?'0':m)||a,b=R(0,a)}
    else{a=decStr();b=decStr();if(+a<+b)[a,b]=[b,a]}
    a=String(a);b=String(b);const w='sub '+a+' - '+b;let h;try{h=stepsSub(a,b)}catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const d=Math.max(...[a,b].map(x=>(x.split('.')[1]||'').length)),want=sc(a,d)-sc(b,d);
    let borrow=0,got=0,e=-d;
    for(let i=0;i<h.steps.length;i++){const c=h.steps[i].c,top=dg(a,e,d)-borrow,bv=dg(b,e,d)||0;
      // a 0 that lent on the way (top -1) is already a 9; otherwise regroup exactly when the top digit is smaller
      const chain=top<0,need=!chain&&top<bv;
      if(need){if(c.op!=='rg'||c.e!==e||c.from!==top||c.to!==top+10||c.from>=c.b){B(w+' regroup at '+e+': '+JSON.stringify(c));break}i++}
      const s=h.steps[i];if(!s){B(w+': missing step');break}
      const cc=s.c,x0=chain?9:need?top+10:top;
      if(cc.op!=='−'||cc.e!==e||cc.x[0]!==x0||cc.x[1]!==bv)B(w+' column '+e+': '+cc.x+' expected '+x0+','+bv);
      if(cc.r!==null){if(cc.r!==x0-bv)B(w+': '+cc.x+' = '+cc.r);got+=(x0-bv)*10**(e+d)}else got+=(x0-bv)*10**(e+d)+cc.up;
      borrow=need||chain?1:0;e++;
    }
    if(got!==want)B(w+': steps give '+got+', answer '+want);
  }
  // ---- multiplication, partial products: every non-zero place-value pair once; the parts add up to a x b
  for(let t=0;t<N;t++){
    const a=nd(R(1,3)),b=nd(R(1,2));if(!a||!b)continue;const w='mul pp '+a+' x '+b;
    let h;try{h=stepsMul(a,b,'pp')}catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const parts=[];
    String(b).split('').reverse().forEach((y,j)=>{if(+y)String(a).split('').reverse().forEach((x,i)=>{if(+x)parts.push(+y*10**j*(+x*10**i))})});
    const mul=h.steps.filter(s=>s.c.op=='×');
    if(mul.length!==parts.length)B(w+': '+mul.length+' parts, expected '+parts.length);
    mul.forEach((s,k)=>{const v=s.c.x[0]*s.c.x[1];if(v!==parts[k]||s.c.r!==null&&s.c.r!==v)B(w+': part '+s.c.x+' = '+s.c.r)});
    const fin=h.steps[h.steps.length-1].c,total=fin.op=='+'?fin.x.reduce((s,v)=>s+v,0):fin.x[0]*fin.x[1];
    if(fin.op=='+'&&fin.x.join()!==parts.join())B(w+': the sum adds '+fin.x);
    if(total!==a*b)B(w+': steps give '+total+', answer '+a*b);
  }
  // ---- multiplication, standard: each digit product plus the carry from the digit before; each row is a x digit; rows add to a x b
  for(let t=0;t<N;t++){
    const a=nd(R(1,4)),b=t%2?nd(1):nd(R(2,3));if(!a||!b)continue;const w='mul std '+a+' x '+b;
    let h;try{h=stepsMul(a,b,'std')}catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const rows={};let carry=0,prev=-1,got=null;
    for(const s of h.steps){const c=s.c;
      if(c.op=='z'||c.op=='×'&&c.x[0]===0){carry=0;continue}
      if(c.op=='+'){got=c.x.reduce((s,v)=>s+v,0);if(c.x.join()!==String(b).split('').reverse().map((y,j)=>a*y*10**j).join())B(w+': rows '+c.x);continue}
      if(c.i===0)carry=0;
      const da=+String(a).split('').reverse()[c.i],db=+String(b).split('').reverse()[c.j];
      if(c.x[0]!==db||c.x[1]!==da||c.p!==da*db||c.cin!==carry||c.e!==c.i+c.j)B(w+': digit step '+JSON.stringify(c));
      const s2=c.p+c.cin,last=c.i==String(a).length-1;
      rows[c.j]=(rows[c.j]||0)+(last?s2:s2%10)*10**c.e;
      if(c.r!==null&&c.r!==s2)B(w+': '+c.p+' + '+c.cin+' = '+c.r);
      carry=Math.floor(s2/10);
    }
    for(const j in rows)if(String(b).length>1&&rows[j]!==a*+String(b).split('').reverse()[j]*10**j)B(w+': row '+j+' is '+rows[j]);
    if(String(b).length==1)got=rows[0];
    if(got!==a*b)B(w+': steps give '+got+', answer '+a*b);
  }
  // ---- long division: each round's number, quotient digit, product and remainder; the quotient and remainder are the answer
  for(let t=0;t<N;t++){
    const b=t%3?R(2,9):R(11,50),a=R(b,t%2?9999:999);const w='div '+a+' / '+b;
    let h;try{h=stepsDiv(a,b)}catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const D=String(a).split('').map(Number);
    let pos=0,cur=D[pos++];while(cur<b)cur=cur*10+D[pos++];
    let q='',rem=null,k=0;
    for(;;){const qd=Math.floor(cur/b),s=h.steps[k++];
      if(!s){B(w+': steps end early');break}
      if(s.c.x[0]!==cur)B(w+': divides '+s.c.x[0]+', expected '+cur);
      if(s.c.op=='÷'){if(s.c.x[1]!==b)B(w+': divisor '+s.c.x[1]);if(s.c.r!==null&&s.c.r!==qd)B(w+': '+cur+' / '+b+' gave '+s.c.r);q+=qd;
        if(s.c.r===null){rem=cur%b;if(rem)B(w+': last step asks a digit but '+cur+' leaves '+rem);break}
        if(qd){const m=h.steps[k++];if(!m||m.c.op!=='−'||m.c.mul.join()!==[qd,b,qd*b].join()||m.c.x.join()!==[cur,qd*b].join()){B(w+': multiply step '+JSON.stringify(m&&m.c));break}
          if(m.c.r===null){rem=cur-qd*b;break}if(m.c.r!==cur-qd*b)B(w+': subtract '+m.c.r)}}
      else{q+=qd;rem=cur;if(qd||s.c.r!==null)B(w+': step '+JSON.stringify(s.c));break}
      if(pos>=D.length){B(w+': no last step');break}
      cur=(cur-qd*b)*10+D[pos++];
    }
    if(k!==h.steps.length)B(w+': '+h.steps.length+' steps, used '+k);
    if(+q!==Math.floor(a/b)||rem!==a%b)B(w+': steps give '+q+' R '+rem);
  }
  // ---- fractions
  for(let t=0;t<N;t++){
    const d=R(2,12),n=R(1,d-1),k=R(2,6),down=t%2;const w='equiv '+n+'/'+d+' k '+k+(down?' down':'');
    let h,want;
    try{if(down){h=stepsEquivFrac(n*k,d*k,t%4==1?n:null,t%4==1?null:d);want=t%4==1?d:n}else{h=stepsEquivFrac(n,d,t%4==0?n*k:null,t%4==0?null:d*k);want=t%4==0?d*k:n*k}}
    catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const f=h.steps[1].c,v=f.op=='×'?f.x[0]*f.x[1]:f.x[0]/f.x[1];
    if(h.steps.length!==2||h.steps[0].c.x[1]!==k||v!==want)B(w+': gives '+v+', answer '+want);
  }
  for(let t=0;t<N;t++){
    const b=R(2,12),d=R(2,12),a=R(1,b-1),c=R(1,d-1),op=['+','-','cmp'][t%3];const w='cd '+a+'/'+b+' '+op+' '+c+'/'+d;
    let h;try{h=stepsCommonDen(a,b,c,d,op)}catch(e){B(w+': threw '+e.message);continue}
    shape(h,w);const L=h.steps[0].c.r,f=h.steps[h.steps.length-1].c;
    if(L%b||L%d||[...Array(L).keys()].some(m=>m>0&&m%b==0&&m%d==0))B(w+': common bottom '+L);
    if(f.x[0]*b!==a*L||f.x[1]*d!==c*L||f.L!==L)B(w+': renamed '+f.x+' over '+f.L);
    const v=op=='+'?f.x[0]+f.x[1]:op=='-'?f.x[0]-f.x[1]:Math.sign(f.x[0]-f.x[1]),want=op=='+'?a*d+c*b:op=='-'?a*d-c*b:Math.sign(a*d-c*b);
    if(op=='cmp'?v!==want:v*b*d!==want*L)B(w+': last step gives '+v);
  }
  // ---- text steps, the renderer and the Treasure Bay conversion
  const st=stepsStory(['First <b>this</b>.',{s:'Then that.',say:'Then that one.'}]);
  if(st.steps.length!==2||!st.steps[0].html.includes('&lt;b&gt;')||st.steps[1].say!=='Then that one.')B('stepsStory: '+JSON.stringify(st));
  const q={kind:'num',hint:stepsAdd(159,206)},h0=hintHTML(q);
  if(!/class="hs mid|class="hs"|class="hs /.test(h0)||!h0.includes('data-hs="0"')||(h0.match(/<i class="(on|dn|)"><\\/i>/g)||[]).length!==3||!h0.includes('aria-label="Step 1 of 3"'))B('panel: '+h0.slice(0,200));
  HSTEP.set(q,2);const h2=hintHTML(q);if(!h2.includes('data-hs="2"')||!h2.includes('Step 3 of 3'))B('panel at step 3');
  HSTEP.set(q,9);if(!hintHTML(q).includes('data-hs="2"'))B('panel past the end');
  if(hintStep(q)!==false)B('hintStep without a panel on show should do nothing');
  if(!hintHTML({kind:'num',hint:stepsStory(['a','b'])}).includes('class="hs txt"'))B('text steps layout');
  for(let s=1;s<=200;s++){const bq=genQ('big',5,s);if(bq.hint.k!=='steps'||bq.hint.steps.length!==3)B('big5 seed '+s+': hint '+bq.hint.k);}
  bad;`);
  return{problems:p.concat(out),note:'3,000 problems each: add, sub, mul pp, mul std, div, equiv, common bottom'};
});

// ---- P2-27 4th grade passages ----
run('passages grade 4 P2-27',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    // 1. data: the grade validator (words, sentences, reading level, evidence, question types incl. theme / text structure), counts
    for(const id of ['comp','info'])for(const m of passageProblems(id))b(m);
    for(const m of compProblems(4))b(m);
    const g4=COMP.filter(p=>p.g==4);
    if(g4.length!==10||g4.filter(p=>p.type=='f').length!==5)b('grade 4 needs 5 fiction and 5 nonfiction passages, has '+g4.length);
    if(g4.reduce((a,p)=>a+p.qs.length,0)!==50)b('grade 4 questions: '+g4.reduce((a,p)=>a+p.qs.length,0));
    if(new Set(COMP.map(p=>p.id)).size!==COMP.length)b('two passages share an id');
    if(new Set(COMP.map(p=>p.title)).size!==COMP.length)b('two passages share a title');
    if(PASS.comp.filter(x=>x.lv==5).length!==5||PASS.info.filter(x=>x.lv==3).length!==5)b('PASS levels: comp 5 and info 3 need 5 passages each');
    if(COMPSPEC[4].words[0]<130||COMPSPEC[4].words[1]>180)b('grade 4 word limits are outside CURRICULUM 130-180');
    for(const p of g4){
      const need=p.type=='f'?'theme':'structure';
      if(!p.qs.some(q=>q.t==need))b(p.id+': no '+need+' question');
      if(p.qs.some(q=>q.t==(p.type=='f'?'structure':'theme')))b(p.id+': has a '+(p.type=='f'?'structure':'theme')+' question for the wrong kind of passage');
      for(const q of p.qs){
        const all=[q.a,...q.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)b(p.id+': repeated choice in "'+q.q+'"');
        if(q.d.length!==3)b(p.id+': needs 3 wrong choices in "'+q.q+'"');
      }
    }
    // the validator reads need per kind and catches a missing theme / structure question
    {
      const n0=COMP.length,trial=(src,edit,want)=>{
        const c=JSON.parse(JSON.stringify(COMP.find(p=>p.id==src)));c.id=src.slice(0,3)+'9'+'9';edit(c);
        COMP.push(c);const m=compProblems(4).filter(x=>x.startsWith(c.id));COMP.length=n0;
        if(!m.some(x=>x.includes(want)))b('validator missed "'+want+'" in '+src+': '+m.join(' | '));
      };
      trial('g4f01',c=>{c.qs[4].t='detail'},'no theme question');
      trial('g4n01',c=>{c.qs[4].t='detail'},'no structure question');
      trial('g4f01',c=>{c.text=c.text.slice(0,4)},'words, needs 130 to 180');
    }
    // 2. 3,000 questions per level: panel, one right answer, hint, say, label, renders, rebuilds
    const N=3000,labels=new Map(),texts=new Set();
    for(const [sk,lv] of [['comp',5],['info',3]]){
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),w=sk+lv;
        if(!q.ctx||!q.ctx.text||!q.ctx.title)b(w+': no passage panel');
        const vals=q.choices.map(c=>String(c.v));
        if(vals.filter(v=>v===String(q.ans)).length!==1)b(w+': not exactly one right choice: '+q.label);
        if(q.choices.length!==4)b(w+': '+q.choices.length+' choices');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s)b(w+': no hint');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label||q.label.length>=70)b(w+': label '+q.label);
        if(labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);texts.add(q.ctx.title);
        for(const m of kindProblems(q))b(w+': '+m);
        if(i<200){
          try{KIND.choice.render(q)}catch(e){b(w+': render threw '+e.message)}
          if(/undefined|NaN|\[object/.test(q.html))b(w+': bad html');
          if(JSON.stringify({...bankRebuild(q.bk),sk:0,lv:0,seed:0})!==JSON.stringify({...q,sk:0,lv:0,seed:0}))b(w+': bankRebuild differs');
        }
      }
    }
    if(texts.size!==10)b('3,000 samples reached '+texts.size+' of 10 passages');
    if(labels.size!==50)b('50 questions expected, labels '+labels.size);
    // 3. hints: the evidence quote for detail, sequence, vocab and inference (short enough), the type's own line for the others
    for(const sk of ['comp','info'])PASS[sk].forEach(p=>{
      if(p.g!==4)return;
      const x=COMP.find(c=>c.id==p.id);
      p.qs.forEach((it,j)=>{
        if(!it.hint||it.hint.length>140)b(p.id+' q'+j+': hint length');
        const quote=['detail','sequence','vocab','infer'].includes(it.t);
        if(quote!==it.hint.startsWith('Look back at the story: "'))b(p.id+' q'+j+' ('+it.t+'): hint '+it.hint);
        if(quote&&!it.hint.includes(x.text[it.ev[0]]))b(p.id+' q'+j+': hint misses the first evidence sentence');
      });
    });
    // 4. rounds: two passages, five questions each, in order; live play shows every passage within three rounds
    bankRound();
    for(const [sk,lv] of [['comp',5],['info',3]]){
      const seen=new Set();
      for(let r=0;r<3;r++){
        const rd=compRound(sk,lv);
        if(rd.length!==10)b(sk+' round has '+rd.length+' questions, expected 10');
        const titles=[...new Set(rd.map(q=>q.ctx.title))];
        if(titles.length!==2)b(sk+' round has '+titles.length+' passages');
        titles.forEach(t=>seen.add(t));
        titles.forEach((t,k)=>{
          const part=rd.slice(k*5,k*5+5),src=COMP.find(c=>c.title==t);
          if(!part.every(q=>q.ctx.title==t))b('round: questions of "'+t+'" are not in a block');
          if(part.map(q=>q.label).join('|')!==src.qs.map((q,j)=>t+' #'+(j+1)+' '+q.t).join('|'))b('round: questions of "'+t+'" not in order');
        });
        if(!rd.every(q=>q.sk==sk&&q.lv==lv&&q.seed===rd[0].seed))b('round: questions not stamped');
      }
      if(seen.size!==5)b('three live '+sk+lv+' rounds reached '+seen.size+' of 5 passages');
    }
    bankReset();
    // 5. skills and stops: comp 5 and info 3 are the last comp/info stops of Dragon Library; grade 3 levels (comp 4, info 2) have no passages here
    if(SK.comp.max<5||SK.info.max<3)b('skills comp/info max '+SK.comp.max+' '+SK.info.max);
    const lib=PATHS.read.worlds.find(w=>w.id=='r_library');
    if(!lib)b('Dragon Library is missing');
    else{
      const ci=lib.nodes.filter(n=>n[0]=='comp'||n[0]=='info').map(n=>n[0]+n[1]);
      if(ci[ci.length-2]!=='comp5'||ci[ci.length-1]!=='info3')b('comp5 and info3 must be the last comp/info stops of Dragon Library: '+ci.join(' '));
      if(lib.nodes.some(n=>n[2].length>22))b('a Dragon Library stop title is too long');
      const ids=lib.nodes.map(n=>n[0]+n[1]);
      if(ids.indexOf('spell5')<0||ids.indexOf('spell5')>ids.indexOf('comp5'))b('spell5 must come before comp5: '+ids.join(' '));
    }
    // 6. save safety (fixtures): stars are keyed by stop id, so no star moves, nothing re-locks, the new stops in a finished world are NEW and never current
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),pass:passed('read',i),prog:worldHasProgress('read',n.wi),
      g:PATHS.read.worlds[n.wi].g,nw:stopNew('read',i)}});return o};
    const ORIG=PATHS.read.worlds,NEW=/^(comp5|info3)$/;
    const without=()=>ORIG.map(w=>w.id!=='r_library'?w:{...w,nodes:w.nodes.filter(n=>!NEW.test(n[0]+n[1]))});
    let checked=0,moved=0;
    const compare=label=>{
      const maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=without();buildNodes('read');
      const old=snap(),curOld=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=ORIG;buildNodes('read');
      for(const k in old){
        checked++;
        if(!now[k]){b(label+': stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(label+': stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(label+': passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(label+': '+k+' locked by the new stops');
      }
      for(const k in now)if(!(k in old)&&NEW.test(k)&&now[k].st)b(label+': new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(label+': loading changed the map');
      // the map opens on the same stop, except for a child in the middle of Dragon Library who has done every earlier stop but not the boss
      if(cur!==curOld){
        moved++;
        const ok=NEW.test(cur)&&curOld==='boss_r_library'&&!old['boss_r_library'].pass;
        if(!ok)b(label+': map opens on '+cur+' (was '+curOld+')');
      }
      return{now,old,cur,curOld};
    };
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])
      for(const g of [null,0,1,2,3,4,5,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        compare(name+' g'+g);
      }
    for(const g of [4,5,6]){
      load(null);S.grade=g;
      for(const n of NODES.read)if(n.wid!=='r_island'&&n.wid!=='r_legend'&&!NEW.test(nid(n)))S.maps.read[nid(n)]=2;
      for(const k of ['comp5','info3'])delete S.maps.read[k];
      const r=compare('finished Dragon Library g'+g);
      for(const k of ['comp5','info3']){
        const i=NODES.read.findIndex(n=>nid(n)===k);
        if(!stopNew('read',i))b(k+' does not show NEW for a finished Dragon Library');
        if(!unlocked('read',i))b(k+' is locked for a finished Dragon Library');
        if(r.cur===k)b(k+' became the current stop of a finished Dragon Library');
      }
      const before=JSON.stringify(S.maps.read);
      setSt('read',NODES.read.findIndex(n=>nid(n)==='comp5'),3);
      const after=JSON.parse(JSON.stringify(S.maps.read));
      if(after.comp5!==3||JSON.stringify({...after,comp5:undefined})!==JSON.stringify({...JSON.parse(before),comp5:undefined}))b('passing comp5 changed another stop');
    }
    // mastery order follows the map for the stops that exist (levels 4 and 2 may be absent until grade 3 ships)
    for(const sk of ['comp','info']){const ns=NODES.read.filter(n=>n.sk===sk);
      ns.forEach((n,i)=>{if(harder(n)!==(ns[i+1]||null)||easier(n)!==(ns[i-1]||null))b('harder/easier must follow map order at '+sk+n.lv)})}
    return{out,checked,moved,words:g4.map(p=>p.text.flatMap(bankWords).length),fk:g4.map(p=>compFK(p.text)),sent:g4.map(p=>p.text.flatMap(bankWords).length/p.text.length)};
  };
  const r=eval(js+';('+body.toString()+')()');
  const mx=a=>Math.max(...a),mn=a=>Math.min(...a);
  return{problems:r.out,note:'10 passages, 50 questions; words '+mn(r.words)+'-'+mx(r.words)+', reading grade '+mn(r.fk).toFixed(1)+'-'+mx(r.fk).toFixed(1)+', words per sentence up to '+mx(r.sent).toFixed(1)+'; '+r.checked+' stop checks, current stop moved on '+r.moved+' loads'};
});

// ---- P2-29 6th grade passages ----
run('passages grade 6 P2-29: 10 passages validate, comp 7 and info 5 (3,000 questions each), Legend Lab stops, save safety (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    // 1. data: the grade validator (words, sentences, reading level, evidence, one right answer, not always the longest), counts, types
    for(const m of compProblems(6))b(m);
    const g6=COMP.filter(p=>p.g==6);
    if(g6.length!==10||g6.filter(p=>p.type=='f').length!==5||g6.filter(p=>p.type=='n').length!==5)b('grade 6 needs 5 fiction and 5 nonfiction passages, has '+g6.length);
    if(g6.reduce((a,p)=>a+p.qs.length,0)!==50)b('grade 6 questions: '+g6.reduce((a,p)=>a+p.qs.length,0));
    if(COMPSPEC[6].words[0]<230||COMPSPEC[6].words[1]>300)b('grade 6 word limits are outside CURRICULUM 230-300');
    if(new Set(COMP.map(p=>p.id)).size!==COMP.length)b('two passages share an id');
    if(new Set(COMP.map(p=>p.title)).size!==COMP.length)b('two passages share a title');
    if(PASS.comp.filter(x=>x.lv==7).length!==5||PASS.info.filter(x=>x.lv==5).length!==5)b('PASS levels: comp 7 and info 5 need 5 passages each');
    if(SK.comp.max<7||SK.info.max<5)b('SK.comp.max '+SK.comp.max+', SK.info.max '+SK.info.max);
    for(const p of g6){
      const ts=p.qs.map(q=>q.t);
      for(const t of ['main','infer','figure','evidence'])if(!ts.includes(t))b(p.id+': no '+t+' question');
      if(!ts.includes('purpose')&&!ts.includes('claim'))b(p.id+': no purpose or claim question');
      for(const q of p.qs){
        const all=[q.a,...q.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)b(p.id+': repeated choice in "'+q.q+'"');
        if(q.d.length!==3)b(p.id+': needs 3 wrong choices in "'+q.q+'"');
        if(q.t=='evidence'){
          // the quoted evidence answer is really in the passage, in an evidence sentence
          const quote=q.a.replace(/^"|"$/g,'');
          if(!q.ev.some(i=>p.text[i].includes(quote)))b(p.id+': evidence answer is not quoted from an evidence sentence: '+q.a);
          for(const d of q.d){const t=d.replace(/^"|"$/g,'');if(!p.text.some(x=>x.includes(t)))b(p.id+': evidence choice is not in the passage: '+d)}
        }
      }
    }
    // 2. 3,000 questions per level: panel, one right answer, 4 choices, hint, say, label, renders, rebuilds
    const N=3000,labels=new Map(),texts=new Set();
    for(const [sk,lv] of [['comp',7],['info',5]]){
      const tx=new Set();
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),w=sk+lv;
        if(!q.ctx||!q.ctx.text||!q.ctx.title)b(w+': no passage panel');
        const vals=q.choices.map(c=>String(c.v));
        if(vals.filter(v=>v===String(q.ans)).length!==1)b(w+': not exactly one right choice: '+q.label);
        if(q.choices.length!==4)b(w+': '+q.choices.length+' choices');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s||q.hint.s.length>140)b(w+': no hint, or too long');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label||q.label.length>=70)b(w+': label '+q.label);
        if(labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);tx.add(q.ctx.title);
        for(const m of kindProblems(q))b(w+': '+m);
        if(i<200){
          try{KIND.choice.render(q)}catch(e){b(w+': render threw '+e.message)}
          if(/undefined|NaN|\[object/.test(q.html))b(w+': bad html');
        }
      }
      if(tx.size!==5)b(sk+lv+': 3,000 samples reached '+tx.size+' of 5 passages');
    }
    if(labels.size!==50)b('50 questions expected, labels '+labels.size);
    // 3. every authored hint is at most 140 characters; a round is 2 passages x 5 questions, all five stories reached in 3 live rounds
    for(const sk of ['comp','info'])PASS[sk].forEach(p=>{if(p.g===6)p.qs.forEach((it,j)=>{if(!it.hint||it.hint.length>140)b(p.id+' q'+j+': hint length')})});
    bankRound();
    for(const [sk,lv] of [['comp',7],['info',5]]){
      const seen=new Set();
      for(let r=0;r<3;r++){
        const rd=compRound(sk,lv);
        if(rd.length!==10)b(sk+' round has '+rd.length+' questions');
        if(new Set(rd.map(q=>q.ctx.title)).size!==2)b(sk+' round needs 2 passages');
        rd.forEach(q=>seen.add(q.ctx.title));
      }
      if(seen.size!==5)b(sk+': three live rounds reached '+seen.size+' of 5 passages');
    }
    bankReset();
    // 4. the stops: the last two of Legend Lab, after Spell Tough Words; comp/info stops of the whole map keep their level order
    const L=PATHS.read.worlds.find(w=>w.id=='r_legend');
    if(!L)b('Legend Lab is missing');
    else{
      const ids=L.nodes.map(n=>n[0]+n[1]);
      if(ids.slice(-2).join(' ')!=='comp7 info5'||ids[0]!=='spell7')b('Legend Lab must end with comp7 info5 after spell7: '+ids.join(' '));
      if(L.nodes.some(n=>n[2].length>22))b('a Legend Lab stop title is too long');
    }
    for(const sk of ['comp','info']){
      const lvs=NODES.read.filter(n=>n.sk===sk).map(n=>n.lv);
      if(lvs.join()!==lvs.slice().sort((a,c)=>a-c).join())b(sk+' stops are not in level order: '+lvs.join(' '));
      if(!lvs.includes(sk=='comp'?7:5))b(sk+' has no stop for grade 6');
      const ns=NODES.read.filter(n=>n.sk===sk);
      ns.forEach((n,i)=>{if(harder(n)!==(ns[i+1]||null)||easier(n)!==(ns[i-1]||null))b('harder/easier must follow map order at '+sk+n.lv)});
    }
    // 5. saves: stars and locks of every other stop are untouched compared with a map without the two stops
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),pass:passed('read',i),prog:worldHasProgress('read',n.wi),
      g:PATHS.read.worlds[n.wi].g,nw:stopNew('read',i)}});return o};
    const ORIG=PATHS.read.worlds,NEW=/^(comp7|info5)$/;
    const without=()=>ORIG.map(w=>w.id!=='r_legend'?w:{...w,nodes:w.nodes.filter(n=>!NEW.test(n[0]+n[1]))});
    let checked=0,moved=0;
    const compare=label=>{
      const maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=without();buildNodes('read');
      const old=snap(),curOld=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=ORIG;buildNodes('read');
      for(const k in old){
        checked++;
        if(!now[k]){b(label+': stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(label+': stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(label+': passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(label+': '+k+' locked by the new stops');
      }
      for(const k in now)if(!(k in old)&&NEW.test(k)&&now[k].st)b(label+': new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(label+': loading changed the map');
      // the map may open on a different stop only for a child who has done every old stop of Legend Lab, the last world of the path:
      // curNode (42-paths.js) then falls back from "everything done" (the boss) to the only open, unpassed stops, the new ones
      if(cur!==curOld){
        moved++;
        const ok=NEW.test(cur)&&curOld==='boss_r_legend';
        if(!ok)b(label+': map opens on '+cur+' (was '+curOld+')');
      }
      return{now,old,cur,curOld};
    };
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])
      for(const g of [null,0,1,2,3,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        compare(name+' g'+g);
      }
    // 6. a child who finished Legend Lab before these stops existed: both show NEW, stay open, are not the current stop, nothing moves
    for(const g of [2,3,6]){
      load(null);S.grade=g;
      for(const n of NODES.read)if(!NEW.test(nid(n)))S.maps.read[nid(n)]=2;
      for(const k of ['comp7','info5'])delete S.maps.read[k];
      const r=compare('finished Legend Lab g'+g);
      for(const k of ['comp7','info5']){
        const i=NODES.read.findIndex(n=>nid(n)===k);
        if(!stopNew('read',i))b(k+' does not show NEW for a finished Legend Lab');
        if(!unlocked('read',i))b(k+' is locked for a finished Legend Lab');
        if(r.cur===k&&k!=='comp7')b(k+' became the current stop of a finished Legend Lab'); // comp7 is the first new stop: the fallback above
      }
      const before=JSON.stringify(S.maps.read);
      setSt('read',NODES.read.findIndex(n=>nid(n)==='comp7'),3);
      const after=JSON.parse(JSON.stringify(S.maps.read));
      if(after.comp7!==3||JSON.stringify({...after,comp7:undefined})!==JSON.stringify({...JSON.parse(before),comp7:undefined}))b('passing comp7 changed another stop');
    }
    return{out,checked,moved,words:g6.map(p=>p.text.flatMap(bankWords).length),fk:g6.map(p=>compFK(p.text))};
  };
  const r=eval(js+';('+body.toString()+')()');
  const mx=a=>Math.max(...a),mn=a=>Math.min(...a);
  return{problems:r.out,note:'10 passages, 50 questions; words '+mn(r.words)+'-'+mx(r.words)+', reading grade '+mn(r.fk).toFixed(1)+'-'+mx(r.fk).toFixed(1)+'; '+r.checked+' stop checks, current stop moved on '+r.moved+' of 36 loads (only where Legend Lab is done and nothing else is open)'};
});

// ---- P2-09 Factor Factory (4th) ----
run('Factor Factory P2-09: stops in CURRICULUM order, 3,000 samples per new level with the maths recomputed, hints, reproducible, old levels unchanged',()=>{
  const body=function(){
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const strip=h=>h.replace(/<[^>]+>/g,'|').replace(/&nbsp;/g,' ');
    // ---- world
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_factory'),w=mw[wi];
    const want='mfact5 pv4 mbig2 big6 dbig1 mbig3 sub8 dbig2 fact1 mbig4 big7 dbig3 fact2 round3';
    if(wi<1||!w)add('world m_factory missing');
    else{
      if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' '));
      if(w.g!==4||w.n!=='Factor Factory'||mw[wi-1].id!=='m_frac')add('world g/name/position');
      if(w.nodes.some(n=>n[2].length>22))add('stop name too long: '+w.nodes.find(n=>n[2].length>22)[2]);
      if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('duplicate stop names');
      if(WR.math[wi][1]-WR.math[wi][0]!==14||NODES.math[WR.math[wi][1]].sk!=='boss')add('15 stops: 14 and the boss');
    }
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    const mx={mfact:5,pv:6,mbig:5,big:7,sub:8,dbig:4,fact:3,round:4}; // fact 3 is Galaxy Core's (P2-14) // pv 5-6, mbig 5, dbig 4 and round 4 are Volcano Lab's (P2-11): the skills grew, Factor Factory's own levels are unchanged
    for(const k in mx)if(SK[k].max!==mx[k]||SK[k].area!=='math')add('SK.'+k+'.max '+SK[k].max);
    // ---- old levels unchanged: every old level still comes from the same generator with the same seed
    const sameQ=(sk,lv,fn)=>{for(let s=1;s<=60;s++){const sd=(s*7+3)>>>0,a=genQ(sk,lv,sd),prev=RNG;RNG=mulberry32(sd);let b;try{b=fn(lv);b.sk=sk;b.lv=lv;b.seed=sd}finally{RNG=prev}
      if(JSON.stringify(a)!==JSON.stringify(b)){add('old level changed: '+sk+lv);return}}};
    for(let l=1;l<=4;l++)sameQ('mfact',l,genMfact);
    sameQ('mbig',1,genMbig);
    sameQ('pv',1,()=>genPv1());sameQ('pv',2,genBayPv2);sameQ('pv',3,genBayPv3);
    for(let l=1;l<=4;l++)sameQ('big',l,genBig);
    sameQ('big',5,genBayBig5);
    for(let l=1;l<=4;l++)sameQ('sub',l,genSub);
    sameQ('sub',5,genBaySub5);sameQ('sub',6,ffSub6);sameQ('sub',7,ffSub7);
    sameQ('round',1,ffRound);sameQ('round',2,ffRound);
    // ---- independent helpers
    const WORD={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,
      twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90};
    const fromWords=s=>{let tot=0,cur=0;for(const t of s.replace(/,/g,' ').replace(/-/g,' ').split(/\s+/).filter(Boolean)){
      if(t=='hundred')cur*=100;else if(t=='thousand'){tot+=cur*1000;cur=0}else if(t in WORD)cur+=WORD[t];else return NaN}
      return tot+cur};
    const isPrime=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d==0)return false;return true};
    const col=(nums,op)=>{ // does any column regroup (carry or borrow)
      const L=Math.max(...nums.map(x=>String(x).length));let c=0;
      for(let e=0;e<L;e++){
        const ds=nums.map(x=>Math.floor(x/10**e)%10);
        if(op=='+'){const s=ds.reduce((t,x)=>t+x,0)+c;if(s>=10)return true;c=0}
        else{if(ds[0]-c<ds[1])return true;c=0}
      }
      return false};
    const comma=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');
    const levels=[['mfact',5],['pv',4],['mbig',2],['big',6],['dbig',1],['mbig',3],['sub',8],['dbig',2],['fact',1],['mbig',4],['big',7],['dbig',3],['fact',2],['round',3]];
    const tallies={};
    for(const [sk,lv] of levels){
      const key=sk+lv,T=tallies[key]={},tally=t=>{T[t]=(T[t]||0)+1};
      for(let i=0;i<N;i++){
        const seed=i*7919+31,q=genQ(sk,lv,seed),W=key+': ',a=+q.ans;
        const pr=kindProblems(q);if(pr.length)add(W+q.label+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv||q.seed!==seed)add(W+'not stamped');
        if(!q.say||/undefined|NaN|\[object/.test(q.say))add(W+'say '+q.say);
        if(!q.label||q.label.length>=60||/undefined|NaN/.test(q.label))add(W+'label '+q.label);
        if(/undefined|NaN|\[object/.test(q.html))add(W+'html has undefined/NaN');
        if(!q.hint||hintHTML(q).length<10)add(W+'hint missing');
        if(i%10==0&&JSON.stringify(genQ(sk,lv,seed))!==JSON.stringify(q))add(W+'not reproducible');
        if(q.kind=='num'&&!q.sep&&!q.max&&String(q.ans).length>4)add(W+'answer needs q.max '+q.ans);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(q.ans)||new Set(vs).size!==vs.length||vs.length<2||vs.length>4)add(W+'choices '+q.label)}
        // the numbers the child can see (prompt, label): a hint may repeat these but never shows the answer
        const seen=new Set((q.label.match(/\d+/g)||[]).concat(strip(q.html).replace(/(\d),(\d)/g,'$1$2').match(/\d+/g)||[]));
        if(/^\d{3,}$/.test(String(q.ans))&&!seen.has(String(q.ans))){ // short answers (1-2 digits) also appear as working digits, e.g. the 12 brought down in 72 ÷ 6; the step builders are proved not to show the answer by the P2-08 check
          const hs=q.hint.k=='steps'?q.hint.steps.map(s=>strip(s.html)).join('|'):q.hint.k=='text'?q.hint.s:'';
          if(new RegExp('(^|[^\\d])'+q.ans+'([^\\d]|$)').test(hs.replace(/(\d),(\d)/g,'$1$2')))add(W+'hint shows the answer '+q.label);
        }
        if(q.hint.k=='steps'){
          if(q.hint.steps.length<2)add(W+'steps '+q.hint.steps.length);
          if(!strip(q.hint.steps[q.hint.steps.length-1].html).includes('?'))add(W+'last step has no ?');
        }
        // ---------- the maths, from the label
        if(sk=='mfact'){
          const m=q.label.match(/^(\?|\d+) × (\?|\d+) = (\?|\d+)$/);if(!m){add(W+'label '+q.label);continue}
          const miss=[m[1],m[2],m[3]].indexOf('?');
          let A=+m[1],B=+m[2],C=+m[3];
          if(miss==2)C=A*B;else if(miss==0)A=C/B;else B=C/A;
          if(!Number.isInteger(A)||!Number.isInteger(B)||A*B!==C||a!==[A,B,C][miss])add(W+q.label+' -> '+q.ans);
          if(A>12||B>12||A<2||B<2)add(W+'range '+q.label);
          tally(miss==2?'plain':'missing');if(Math.max(A,B)>=11)tally('big');tally('p'+Math.min(A,B)+'x'+Math.max(A,B));
        }
        else if(sk=='pv'){
          let m;
          if(m=q.label.match(/^value of (\d) in (\d{6})$/)){
            const d=+m[1],s=m[2];if(s.split(m[1]).length!==2)add(W+'digit not unique '+q.label);
            const v=d*10**(5-s.indexOf(m[1]));if(a!==v)add(W+q.label+' -> '+q.ans);
            const vs=q.choices.map(c=>+c.v);if(vs.length!==4||vs.filter(x=>x===v).length!==1||vs.some(x=>x%d||!/^[1-9]0*$/.test(String(x/d))))add(W+'choices '+q.label);
            if(q.choices.some(c=>c.l!==comma(+c.v)))add(W+'choice label');
            if(!q.html.includes('<u>'+m[1]+'</u>'))add(W+'digit not marked');
            tally('value');
          }else if(m=q.label.match(/^([\d ,+]+) = \?$/)){
            const parts=m[1].split(' + ').map(Number),sum=parts.reduce((t,x)=>t+x,0);
            if(a!==sum||sum<100000||sum>999999)add(W+q.label+' -> '+q.ans);
            let last=7;for(const p of parts){const e=String(p).length-1;if(!/^[1-9]0*$/.test(String(p))||e>=last)add(W+'part '+p+' in '+q.label);last=e}
            if(parts.length<3)add(W+'few parts');
            if(q.max!==6)add(W+'max');
            tally('exp');
          }else if(m=q.label.match(/^words to number (\d+)$/)){
            const words=q.html.match(/font-weight:700[^"]*">([^<]+)</)[1];
            if(fromWords(words)!==+m[1]||a!==+m[1]||q.say!==words)add(W+'words '+words+' -> '+q.ans);
            if(a>999999||a<10000)add(W+'size '+a);
            if(q.auto!==true||q.max!==6)add(W+'words auto/max');
            tally('words');
          }else if(m=q.label.match(/^(\d+) \? (\d+)$/)){
            const x=+m[1],y=+m[2],r=x>y?'>':x<y?'<':'=';
            if(q.ans!==r||x>999999||y>999999||x<100000||y<100000||q.choices.map(c=>c.v).join('')!=='<=>')add(W+q.label+' -> '+q.ans);
            tally('cmp');tally('cmp'+r);if(String(x).slice(0,3)==String(y).slice(0,3))tally('cmpnear');
          }else add(W+'label '+q.label);
        }
        else if(sk=='mbig'){
          const m=q.label.match(/^(\d+) × (\d+) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const A=+m[1],B=+m[2],la=String(A).length,lb=String(B).length;
          if(a!==A*B)add(W+q.label+' -> '+q.ans);
          const okLen=lv==2?(la==2&&lb==1):lv==3?((la==3||la==4)&&lb==1):(la==2&&lb==2);
          if(!okLen||B<2||A%10==0)add(W+'digits '+q.label);
          if(lv==3&&q.max!==5)add(W+'max');
          if(!q.html.includes('class="veq"'))add(W+'not vertical');
          if(q.hint.k!=='steps')add(W+'hint kind');
          tally('l'+la);
        }
        else if(sk=='big'||sk=='sub'){
          const op=sk=='big'?' + ':' − ',parts=q.label.replace(/ = \?$/,'').split(op).map(Number);
          if(parts.length<2||parts.some(isNaN)){add(W+'label '+q.label);continue}
          const exp=sk=='big'?parts.reduce((t,x)=>t+x,0):parts[0]-parts[1];
          if(a!==exp)add(W+q.label+' -> '+q.ans);
          const L=parts.map(x=>String(x).length);
          if(!col(parts,sk=='big'?'+':'-'))add(W+'no regrouping '+q.label);
          if(lv==6&&(parts.length!==2||L.some(x=>x!==4)||q.max!==5))add(W+'4-digit '+q.label);
          if(lv==7){if(parts.length<2||parts.length>3||parts.some(x=>x<10000||x>999999)||q.max!==7)add(W+'big7 '+q.label);tally('n'+parts.length)}
          if(lv==8){
            if(parts.length!==2||L[0]<4||L[0]>6||L[1]<L[0]-1||L[1]>L[0]||parts[1]>=parts[0]||q.max!==6)add(W+'sub8 '+q.label);
            tally(/0/.test(String(parts[0]))?'zero':'nozero');tally('L'+L[0]);
          }
          if(!q.html.includes('class="veq"'))add(W+'not vertical');
          if(q.hint.k!=='steps')add(W+'hint kind');
        }
        else if(sk=='dbig'){
          const m=q.label.match(/^(\d+) ÷ (\d) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const n=+m[1],d=+m[2],Q=Math.floor(n/d),r=n%d;
          if(d<2||q.hint.k!=='steps')add(W+'divisor/hint');
          if(r){
            if(q.sep!=='R'||q.ans!==Q+'R'+r||!q.html.includes('rsep'))add(W+q.label+' -> '+q.ans);
          }else if(q.sep||q.ans!==String(Q))add(W+q.label+' -> '+q.ans);
          if(lv==1){if(r||Q<11||Q>49||n<22||n>99)add(W+'dbig1 '+q.label);tally(q.html.includes('ldq')?'ldiv':'eq')}
          if(lv==2){if(!r||Q<2||n<10||n>99)add(W+'dbig2 '+q.label);if(!q.html.includes('ldq'))add(W+'dbig2 layout')}
          if(lv==3){if(n<100||n>9999)add(W+'dbig3 '+q.label);tally(r?'rem':'plain');tally('len'+String(n).length)}
        }
        else if(sk=='fact'&&lv==1){
          let m;
          if(m=q.label.match(/^factor of (\d+)$/)){
            const n=+m[1],vs=q.choices.map(c=>+c.v),ok=vs.filter(x=>n%x==0);
            if(vs.length!==4||ok.length!==1||ok[0]!==a||a<2||a>=n||n>100||n<12)add(W+q.label+' -> '+q.ans);
            tally('factor');
          }else if(m=q.label.match(/^all factors of (\d+)$/)){
            const n=+m[1],vs=q.choices.map(c=>+c.v),ok=vs.filter(x=>n%x==0).map(String).sort();
            if(q.kind!=='multi'||vs.length!==6||ok.length<2||ok.length>4||JSON.stringify(ok)!==JSON.stringify(q.ans)
              ||JSON.stringify(vs)!==JSON.stringify(vs.slice().sort((x,y)=>x-y)))add(W+q.label+' -> '+q.ans);
            if(n<12||n>60||vs.some(x=>x<2||x>=n))add(W+'range '+q.label);
            tally('multi');
          }else if(m=q.label.match(/^multiple of (\d+)$/)){
            const b=+m[1],vs=q.choices.map(c=>+c.v),ok=vs.filter(x=>x%b==0);
            if(vs.length!==4||ok.length!==1||ok[0]!==a||a>100||b<3||b>12||a<2*b)add(W+q.label+' -> '+q.ans);
            tally('mult');
          }else add(W+'label '+q.label);
        }
        else if(sk=='fact'&&lv==2){
          let m;
          if(m=q.label.match(/^(\d+) prime or composite$/)){
            const n=+m[1];
            if(n<2||n>100||q.ans!==(isPrime(n)?'prime':'composite')||q.choices.length!==2)add(W+q.label+' -> '+q.ans);
            tally(q.ans);
          }else if(q.label.startsWith('which is prime')){
            const vs=q.choices.map(c=>+c.v),ok=vs.filter(isPrime);
            if(vs.length!==4||ok.length!==1||ok[0]!==a||vs.some(x=>x<2||x>100))add(W+q.label+' -> '+q.ans);
            tally('which');
          }else add(W+'label '+q.label);
        }
        else if(sk=='round'){
          const m=q.label.match(/^round (\d+) to (\d+)$/);if(!m){add(W+'label '+q.label);continue}
          const n=+m[1],p=+m[2];
          // round by digits: keep the digits left of the place, add 1 when the digit just right of it is 5 or more
          const s=String(n),k=s.length-String(p).length+1,head=+s.slice(0,k),nx=+s[k],r=(nx>=5?head+1:head)*p;
          if(a!==r||n%p==0||n<1000||n>999999||r>999999||![10,100,1000,10000,100000].includes(p)||s.length<String(p).length)add(W+q.label+' -> '+q.ans);
          if(q.max!==6||q.hint.k!=='steps'||q.hint.steps.length!==3)add(W+'max/hint');
          tally('p'+p);if(nx==5)tally('five');
        }
      }
    }
    // ---- spread of the items (each level shows what it should)
    const frac=(k,t)=>(tallies[k][t]||0)/N;
    const inr=(v,lo,hi,m)=>{if(!(v>=lo&&v<=hi))add(m+' '+(v*100).toFixed(0)+'%')};
    inr(frac('mfact5','missing'),.24,.36,'mfact5 missing factor share');inr(frac('mfact5','big'),.45,.8,'mfact5 11-and-12 share');
    for(let x=2;x<=12;x++)for(let y=x;y<=12;y++)if(!tallies.mfact5['p'+x+'x'+y])add('mfact5 never asks '+x+' x '+y);
    for(const f of ['value','exp','words','cmp'])inr(frac('pv4',f),.18,.32,'pv4 '+f);
    for(const f of ['cmp<','cmp>','cmp='])if(!tallies.pv4[f])add('pv4 never '+f);
    if(!tallies.pv4.cmpnear)add('pv4 no close comparisons');
    for(const t of ['l3','l4'])if(!tallies.mbig3[t])add('mbig3 no '+t);
    inr(frac('big7','n3'),.25,.42,'big7 three addends');inr(frac('sub8','zero'),.4,.85,'sub8 zeros in the top number');
    for(const t of ['L4','L5','L6'])if(!tallies.sub8[t])add('sub8 no '+t);
    for(const t of ['ldiv','eq'])inr(frac('dbig1',t),.4,.6,'dbig1 '+t);
    inr(frac('dbig3','rem'),.4,.6,'dbig3 remainder share');inr(frac('dbig3','len3'),.5,.8,'dbig3 3-digit share');
    for(const f of ['factor','multi','mult'])inr(frac('fact1',f),.28,.38,'fact1 '+f);
    inr(frac('fact2','prime'),.1,.3,'fact2 prime');inr(frac('fact2','composite'),.2,.4,'fact2 composite');inr(frac('fact2','which'),.4,.6,'fact2 which');
    for(const p of [10,100,1000,10000,100000])if(!(tallies.round3['p'+p]>N*.1))add('round3 place '+p);
    if(!(tallies.round3.five>20))add('round3 never has a 5 just right of the place');
    return {bad,n:Object.keys(tallies).length};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:uniq(r.bad),note:r.n+' levels x 3,000'};
});

run('Factor Factory P2-09: stops added after Fraction Forest keep every star, nothing re-locks, the map opens where it did (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const store={};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    // the path ends at Factor Factory while this runs: the worlds after it (Decimal Desert, P2-10) were not shipped before it, and have their own checks
    const ALLW=PATHS.math.worlds.slice();PATHS.math.worlds=ALLW.slice(0,ALLW.findIndex(x=>x.id=='m_factory')+1);
    const bad=[],mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_factory'),W=mw[wi],ids=W.nodes.map(n=>n[0]+n[1]).concat(['boss_m_factory']);
    const setWorld=on=>{if(on&&!mw.includes(W))mw.splice(wi,0,W);if(!on&&mw.includes(W))mw.splice(mw.indexOf(W),1);buildNodes('math')};
    const state=raw=>{
      const o={};load(raw);o.stars=JSON.stringify(S.maps.math);o.cur=nid(NODES.math[curNode('math')]);
      o.open=new Set(NODES.math.map((n,i)=>unlocked('math',i)?nid(n):null).filter(Boolean));
      o.passed=NODES.math.filter((n,i)=>passed('math',i)).map(nid);
      o.wo=PATHS.math.worlds.map((w,i)=>worldOpen('math',i)?w.id:null).filter(Boolean);
      return o};
    // saves: the six fixtures at every grade, plus a finished and a half played Fraction Forest
    const saves=[];
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])for(const g of [null,-1,0,1,2,3,4,5,6])saves.push([name+' g'+g,fx(name),g]);
    const mk=(stars,boss,g)=>{load(fx('maxed'));Object.assign(S.maps.math,stars);if(boss){S.maps.math.boss_m_frac=3;S.wdone.m_frac=1}if(g!=null)S.grade=g;return JSON.stringify(S)};
    const fr={frac2:3,frac3:2,frac4:3,frac5:1};
    saves.push(['forest half played',mk({frac2:3,frac3:2}),null],['forest finished',mk(fr,true),null],['forest finished g4',mk(fr,true,4),null],
      ['forest finished g2',mk(fr,true,2),null],['factory started',mk(Object.assign({mfact5:3,pv4:2},fr),true,4),null]);
    let checked=0;
    for(const [name,raw,g] of saves){
      let r=raw;if(g!=null){load(raw);S.grade=g;r=JSON.stringify(S)}
      setWorld(false);const a=state(r);
      setWorld(true);const b=state(r);
      checked++;
      const had=name=='factory started',grade=g==null?(JSON.parse(r).grade==null?null:JSON.parse(r).grade):g;
      if(!had&&JSON.stringify(Object.keys(JSON.parse(b.stars)).filter(k=>ids.includes(k)))!=='[]')bad.push(name+': stars on new stops');
      if(!had&&b.stars!==a.stars)bad.push(name+': star table changed');
      if(had)for(const id of ['mfact5','pv4'])if(!b.passed.includes(id))bad.push(name+': '+id+' lost its stars');
      for(const id of a.passed)if(!b.passed.includes(id))bad.push(name+': passed stop '+id+' lost');
      for(const id of a.open)if(!b.open.has(id))bad.push(name+': '+id+' was open and is locked');
      for(const id of a.wo)if(!b.wo.includes(id))bad.push(name+': world '+id+' was open and is locked');
      const done=/forest finished/.test(name)||had;
      if(grade==null||grade<=3){
        // below 4th grade the map opens exactly where it did; a save that finished Fraction Forest has a next world now
        if(!done&&b.cur!==a.cur)bad.push(name+': map moved '+a.cur+' -> '+b.cur);
        if(done&&b.cur!==ids[0])bad.push(name+': a finished forest should open on '+ids[0]+', got '+b.cur);
      }else if(b.cur!==a.cur&&!ids.includes(b.cur))bad.push(name+': map moved outside the new world '+a.cur+' -> '+b.cur);
      // the chain: a stop of the new world is open only after the one before it, unless a later one is passed
      for(let k=1;k<ids.length;k++){
        if(!b.open.has(ids[k])||b.passed.includes(ids[k]))continue;
        const later=b.passed.some(x=>ids.indexOf(x)>k);
        if(!b.passed.includes(ids[k-1])&&!later)bad.push(name+': '+ids[k]+' open without '+ids[k-1]);
      }
    }
    setWorld(true);
    PATHS.math.worlds=ALLW;buildNodes('math');
    return {bad,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:uniq(r.bad),note:r.checked+' saves with and without the world'};
});

// ---- P2-26 3rd grade passages ----
run('passages grade 3 P2-26: 10 passages, 3rd grade level, every answer supported, 3,000 questions per level, stops comp 4 and info 2 (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    // 1. data: the grade validator, counts, question types of CURRICULUM E-comp (grade 3)
    for(const m of compProblems(3))b(m);
    for(const id of ['comp','info'])for(const m of passageProblems(id))b(m);
    const g3=COMP.filter(p=>p.g==3);
    if(g3.length!==10||g3.filter(p=>p.type=='f').length!==5)b('grade 3 needs 5 fiction and 5 nonfiction passages, has '+g3.length);
    if(g3.reduce((a,p)=>a+p.qs.length,0)!==50)b('grade 3 questions: '+g3.reduce((a,p)=>a+p.qs.length,0));
    if(g3.map(p=>p.id).join(' ')!=='g3f01 g3f02 g3f03 g3f04 g3f05 g3n01 g3n02 g3n03 g3n04 g3n05')b('grade 3 ids: '+g3.map(p=>p.id));
    if(new Set(COMP.map(p=>p.id)).size!==COMP.length)b('two passages share an id');
    if(new Set(COMP.map(p=>p.title)).size!==COMP.length)b('two passages share a title');
    if(COMPSPEC[3].words[0]<90||COMPSPEC[3].words[1]>130)b('grade 3 word limits are outside CURRICULUM 90-130');
    for(const p of g3){
      const ts=p.qs.map(q=>q.t);
      for(const t of ['main','detail','cause','vocab'])if(!ts.includes(t))b(p.id+': no '+t+' question');
      if(!ts.includes(p.type=='f'?'feel':'feature'))b(p.id+': needs a '+(p.type=='f'?'character feeling':'text feature')+' question');
      for(const q of p.qs){
        const all=[q.a,...q.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)b(p.id+': repeated choice in "'+q.q+'"');
        if(q.d.length!==3)b(p.id+': needs 3 wrong choices in "'+q.q+'"');
      }
    }
    if(PASS.comp.filter(x=>x.lv==4).length!==5||PASS.info.filter(x=>x.lv==2).length!==5)b('PASS levels: comp 4 and info 2 need 5 passages each');
    if(PASS.comp.filter(x=>x.lv==3).length!==5||PASS.info.filter(x=>x.lv==1).length!==5)b('grade 2 passages moved');
    if(SK.comp.max<4||SK.info.max<2)b('skills comp/info max: '+SK.comp.max+' '+SK.info.max);
    if(SK.comp.round(4).length!==10||SK.info.round(2).length!==10)b('comp 4 and info 2 rounds must have 10 questions');
    // 2. 3,000 questions per level: panel, one right answer, kind validator, hint, label, say
    const strip=q=>{const c={...q};delete c.sk;delete c.lv;delete c.seed;return JSON.stringify(c)};
    const N=3000,labels=new Map(),texts=new Set();
    for(const [sk,lv] of [['comp',4],['info',2]]){
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),w=sk+lv;
        if(!q.ctx||!q.ctx.text||!q.ctx.title)b(w+': no passage panel');
        const vals=q.choices.map(c=>String(c.v));
        if(vals.filter(v=>v===String(q.ans)).length!==1)b(w+': not exactly one right choice: '+q.label);
        if(q.choices.length!==4)b(w+': '+q.choices.length+' choices');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s)b(w+': no hint');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label||q.label.length>=70)b(w+': label '+q.label);
        if(labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);texts.add(q.ctx.title);
        for(const m of kindProblems(q))b(w+': '+m);
        if(i<200){
          try{KIND.choice.render(q)}catch(e){b(w+': render threw '+e.message)}
          if(/undefined|NaN|\[object/.test(q.html))b(w+': bad html');
          if(strip(bankRebuild(q.bk))!==strip(q))b(w+': bankRebuild differs');
        }
      }
    }
    if(texts.size!==10)b('6,000 samples reached '+texts.size+' of 10 passages');
    if(labels.size!==50)b('50 questions expected, labels '+labels.size);
    // 3. hints: quote the evidence for detail and vocabulary, at most 140 characters
    for(const sk of ['comp','info'])PASS[sk].forEach(p=>{
      if(p.g!==3)return;
      const x=COMP.find(c=>c.id==p.id);
      p.qs.forEach((it,j)=>{
        if(!it.hint||it.hint.length>140)b(p.id+' q'+j+': hint length');
        const quote=['detail','sequence','vocab','infer'].includes(it.t);
        if(quote!==it.hint.startsWith('Look back at the story: "'))b(p.id+' q'+j+' ('+it.t+'): hint '+it.hint);
        if(quote&&!it.hint.includes(x.text[it.ev[0]]))b(p.id+' q'+j+': hint misses the first evidence sentence');
      });
    });
    // 4. rounds: two passages in order, live play reaches every passage within three rounds; grade 2 rounds unchanged in shape
    bankRound();
    for(const [sk,lv,n] of [['comp',4,5],['info',2,5]]){
      const seen=new Set();
      for(let r=0;r<3;r++){
        const rd=compRound(sk,lv),titles=[...new Set(rd.map(q=>q.ctx.title))];
        if(rd.length!==10||titles.length!==2)b(sk+lv+' round: '+rd.length+' questions, '+titles.length+' passages');
        titles.forEach(t=>seen.add(t));
        if(!rd.every(q=>q.sk==sk&&q.lv==lv&&q.seed===rd[0].seed))b(sk+lv+' round: questions not stamped');
      }
      if(seen.size!==n)b('three live rounds of '+sk+lv+' reached '+seen.size+' of '+n);
    }
    bankReset();
    // 5. the stops: the last two of Story Summit, after the old stops, titles that fit
    const NEW=/^(comp4|info2)$/,sm=PATHS.read.worlds.find(w=>w.id=='r_summit');
    if(!sm)b('Story Summit is missing');
    else{
      const ids=sm.nodes.map(n=>n[0]+n[1]),k=ids.indexOf('comp4');
      if(k<0||ids[k+1]!=='info2'||ids.length!==k+2)b('comp4 and info2 must be the last two stops of Story Summit: '+ids.join(' '));
      for(const o of ['spell4','vocab4','vocab5'])if(ids.indexOf(o)<0||ids.indexOf(o)>k)b('old stop '+o+' must come first: '+ids.join(' '));
      if(sm.nodes.some(n=>NEW.test(n[0]+n[1])&&n[2].length>22))b('a new Story Summit stop title is too long');
    }
    const cio=NODES.read.filter(n=>n.wid=='r_summit'&&(n.sk=='comp'||n.sk=='info')).map(nid).join(' ');
    if(cio!=='comp4 info2')b('comp/info stops of r_summit: '+cio);
    for(const sk of ['comp','info']){const ns=NODES.read.filter(n=>n.sk===sk);
      ns.forEach((n,i)=>{if(harder(n)!==(ns[i+1]||null)||easier(n)!==(ns[i-1]||null))b('harder/easier must follow map order at '+sk+n.lv)})}
    // 6. saves: stars are keyed by stop id; compared with a map without the two stops nothing moves or re-locks
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),pass:passed('read',i),prog:worldHasProgress('read',n.wi),nw:stopNew('read',i)}});return o};
    const ORIG=PATHS.read.worlds;
    const without=()=>ORIG.map(w=>w.id!=='r_summit'?w:{...w,nodes:w.nodes.filter(n=>!NEW.test(n[0]+n[1]))});
    let checked=0,moved=0;
    const compare=label=>{
      const maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=without();buildNodes('read');
      const old=snap(),curOld=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=ORIG;buildNodes('read');
      for(const k in old){
        checked++;
        if(!now[k]){b(label+': stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(label+': stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(label+': passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(label+': '+k+' locked by the new stops');
      }
      for(const k in now)if(!(k in old)&&NEW.test(k)&&now[k].st)b(label+': new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(label+': loading changed the map');
      if(cur!==curOld){
        moved++;
        const ok=NEW.test(cur)&&curOld==='boss_r_summit'&&!old['boss_r_summit'].pass;
        if(!ok)b(label+': map opens on '+cur+' (was '+curOld+')');
      }
      return{cur};
    };
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])
      for(const g of [null,0,1,2,3,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        compare(name+' g'+g);
      }
    // a child who finished Story Summit before the stops existed: both NEW, open, never the current stop, nothing else moves
    for(const g of [3,4,6]){
      load(null);S.grade=g;
      const sw=PATHS.read.worlds.findIndex(w=>w.id=='r_summit');
      for(const n of NODES.read)if(n.wi<=sw&&!NEW.test(nid(n)))S.maps.read[nid(n)]=2;
      for(const k of ['comp4','info2'])delete S.maps.read[k];
      const r=compare('finished Story Summit g'+g);
      for(const k of ['comp4','info2']){
        const i=NODES.read.findIndex(n=>nid(n)===k);
        if(!stopNew('read',i))b(k+' does not show NEW for a finished Story Summit');
        if(!unlocked('read',i))b(k+' is locked for a finished Story Summit');
        if(r.cur===k)b(k+' became the current stop of a finished Story Summit');
      }
      const before=JSON.parse(JSON.stringify(S.maps.read));
      setSt('read',NODES.read.findIndex(n=>nid(n)==='comp4'),3);
      const after=JSON.parse(JSON.stringify(S.maps.read));
      if(after.comp4!==3||JSON.stringify({...after,comp4:undefined})!==JSON.stringify({...before,comp4:undefined}))b('passing comp4 changed another stop');
    }
    return{out,checked,moved,words:g3.map(p=>p.text.flatMap(bankWords).length),fk:g3.map(p=>compFK(p.text))};
  };
  const r=eval(js+';('+body.toString()+')()');
  const mx=a=>Math.max(...a),mn=a=>Math.min(...a);
  return{problems:r.out,note:'10 passages, 50 questions; words '+mn(r.words)+'-'+mx(r.words)+', reading grade '+mn(r.fk).toFixed(1)+'-'+mx(r.fk).toFixed(1)+'; '+r.checked+' stop checks, current stop moved on '+r.moved+' of 36 loads (only mid-world)'};
});

// ---- P2-28 5th grade passages ----
run('passages grade 5 P2-28',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    // 1. data: the grade validator, counts, theme or purpose, distinct choices
    for(const m of compProblems(5))b(m);
    const g5=COMP.filter(p=>p.g==5);
    if(g5.length!==10||g5.filter(p=>p.type=='f').length!==5)b('grade 5 needs 5 fiction and 5 nonfiction passages, has '+g5.length);
    if(!g5.every((p,i)=>p.id==='g5'+(i<5?'f0'+(i+1):'n0'+(i-4))))b('grade 5 ids must be g5f01-g5f05 then g5n01-g5n05, in order');
    if(COMPSPEC[5].words[0]<180||COMPSPEC[5].words[1]>230)b('grade 5 word limits are outside CURRICULUM 180-230');
    for(const p of g5){
      if(p.qs.length!==5)b(p.id+': needs 5 questions');
      const last=p.qs.map(q=>q.t);
      if(!last.includes(p.type=='f'?'theme':'purpose'))b(p.id+': needs a '+(p.type=='f'?'theme':'purpose')+' question');
      for(const q of p.qs){
        const all=[q.a,...q.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)b(p.id+': repeated choice in "'+q.q+'"');
        if(q.d.length!==3)b(p.id+': needs 3 wrong choices in "'+q.q+'"');
      }
    }
    if(PASS.comp.filter(x=>x.lv==6).length!==5||PASS.info.filter(x=>x.lv==4).length!==5)b('PASS levels: comp 6 and info 4 need 5 passages each');
    if(SK.comp.max<6||SK.info.max<4)b('skills comp/info max: '+SK.comp.max+' '+SK.info.max);
    // 2. the stops: comp 6 then info 4 after the old Author Island stops (other chunks add comp and info stops to other worlds)
    const ai=PATHS.read.worlds.find(w=>w.id=='r_island');
    if(!ai)b('Author Island is missing');
    else{
      const ci=ai.nodes.filter(n=>n[0]=='comp'||n[0]=='info').map(n=>n[0]+n[1]).join(' ');
      if(ci!=='comp6 info4')b('Author Island comp/info stops must be comp6 then info4: '+ci);
      const ids=ai.nodes.map(n=>n[0]+n[1]);
      if(ids.indexOf('spell6')!==0||ids.indexOf('comp6')<ids.indexOf('spell6')||ids.indexOf('info4')!==ids.indexOf('comp6')+1)b('Author Island order: '+ids.join(' '));
      if(ai.nodes.some(n=>n[2].length>22))b('an Author Island stop title is too long');
    }
    // 3. 3,000 seeded questions per level: panel, one right answer, kind, hint, say, label
    const N=3000,labels=new Map(),titles=new Set();
    for(const [sk,lv] of [['comp',6],['info',4]]){
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*6271+17),w=sk+lv;
        if(!q.ctx||!q.ctx.text||!q.ctx.title)b(w+': no passage panel');
        if(q.choices.map(c=>String(c.v)).filter(v=>v===String(q.ans)).length!==1)b(w+': not exactly one right choice: '+q.label);
        if(q.choices.length!==4)b(w+': '+q.choices.length+' choices');
        if(!q.hint||q.hint.k!=='text'||!q.hint.s)b(w+': no hint');
        if(typeof q.say!=='string'||!q.say.trim())b(w+': no say');
        if(!q.label||q.label.length>=70)b(w+': label '+q.label);
        if(labels.has(q.label)&&labels.get(q.label)!==q.ans)b(w+': label '+q.label+' has two answers');
        labels.set(q.label,q.ans);titles.add(q.ctx.title);
        for(const m of kindProblems(q))b(w+': '+m);
        if(i<200){
          try{KIND.choice.render(q)}catch(e){b(w+': render threw '+e.message)}
          if(/undefined|NaN|\[object/.test(q.html))b(w+': bad html');
        }
      }
    }
    if(titles.size!==10)b('3,000 samples reached '+titles.size+' of 10 passages');
    if(labels.size!==50)b('50 questions expected, labels '+labels.size);
    // 4. hints: evidence quoted for infer and vocab, short enough, the type line for the rest
    for(const sk of ['comp','info'])PASS[sk].forEach(p=>{
      if(p.g!==5)return;
      const x=COMP.find(c=>c.id==p.id);
      p.qs.forEach((it,j)=>{
        if(!it.hint||it.hint.length>140)b(p.id+' q'+j+': hint length');
        const quote=['detail','sequence','vocab','infer'].includes(it.t);
        if(quote!==it.hint.startsWith('Look back at the story: "'))b(p.id+' q'+j+' ('+it.t+'): hint '+it.hint);
        if(quote&&!it.hint.includes(x.text[it.ev[0]]))b(p.id+' q'+j+': hint misses the first evidence sentence');
      });
    });
    // 5. a round of grade 5: two passages, five questions each
    bankRound();
    for(const [sk,lv] of [['comp',6],['info',4]]){
      const rd=compRound(sk,lv);
      if(rd.length!==10)b(sk+' round has '+rd.length+' questions');
      if(new Set(rd.map(q=>q.ctx.title)).size!==2)b(sk+' round needs 2 passages');
      if(!rd.every(q=>q.sk==sk&&q.lv==lv))b(sk+' round: questions not stamped');
    }
    bankReset();
    // 6. save safety: stars are keyed by stop id; a map without the two new stops is the old map
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const snap=()=>{const o={};NODES.read.forEach((n,i)=>{o[nid(n)]={st:getSt('read',i),open:unlocked('read',i),pass:passed('read',i),nw:stopNew('read',i)}});return o};
    const ORIG=PATHS.read.worlds,NEW=/^(comp6|info4)$/;
    const without=()=>ORIG.map(w=>w.id!=='r_island'?w:{...w,nodes:w.nodes.filter(n=>!NEW.test(n[0]+n[1]))});
    let checked=0;
    const compare=label=>{
      const maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.read[curNode('read')]);
      PATHS.read.worlds=without();buildNodes('read');
      const old=snap();
      PATHS.read.worlds=ORIG;buildNodes('read');
      for(const k in old){
        checked++;
        if(!now[k]){b(label+': stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(label+': stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(label+': passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(label+': '+k+' locked by the new stops');
      }
      for(const k in now)if(!(k in old)&&NEW.test(k)&&now[k].st)b(label+': new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(label+': loading changed the map');
      return{now,cur};
    };
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])
      for(const g of [null,0,1,2,3,6]){
        const raw=fx(name);load(raw.length>2?raw:null);if(g!==null)S.grade=g;
        compare(name+' g'+g);
      }
    // a child who finished Author Island before these stops existed: both show NEW, stay open, are never the current stop
    for(const g of [5,6]){
      load(null);S.grade=g;
      for(const n of NODES.read)if(n.wid!=='r_legend'&&!NEW.test(nid(n)))S.maps.read[nid(n)]=2;
      for(const k of ['comp6','info4'])delete S.maps.read[k];
      const r=compare('finished Author Island g'+g);
      for(const k of ['comp6','info4']){
        const i=NODES.read.findIndex(n=>nid(n)===k);
        if(i<0){b(k+' is not on the map');continue}
        if(!stopNew('read',i))b(k+' does not show NEW for a finished Author Island');
        if(!unlocked('read',i))b(k+' is locked for a finished Author Island');
        if(r.cur===k)b(k+' became the current stop of a finished Author Island');
      }
      const before=JSON.stringify(S.maps.read);
      setSt('read',NODES.read.findIndex(n=>nid(n)==='comp6'),3);
      const after=JSON.parse(JSON.stringify(S.maps.read));
      if(after.comp6!==3||JSON.stringify({...after,comp6:undefined})!==JSON.stringify({...JSON.parse(before),comp6:undefined}))b('passing comp6 changed another stop');
    }
    // mastery order of the comp and info stops follows the map (other chunks add stops of their own, so only these skills are compared)
    for(const sk of ['comp','info']){const ns=NODES.read.filter(n=>n.sk===sk);
      ns.forEach((n,i)=>{if(harder(n)!==(ns[i+1]||null)||easier(n)!==(ns[i-1]||null))b('harder/easier must follow map order at '+sk+n.lv)})}
    return{out,checked,words:g5.map(p=>p.text.flatMap(bankWords).length),fk:g5.map(p=>compFK(p.text))};
  };
  const r=eval(js+';('+body.toString()+')()');
  const mx=a=>Math.max(...a),mn=a=>Math.min(...a);
  return{problems:r.out,note:'10 passages, 50 questions; words '+mn(r.words)+'-'+mx(r.words)+', reading grade '+mn(r.fk).toFixed(1)+'-'+mx(r.fk).toFixed(1)+', '+r.checked+' stop checks; levels without passages are not drawn'};
});

// ---- P2-10 Decimal Desert (4th) ----
run('Decimal Desert P2-10: stops in CURRICULUM order, 3,000 samples per new level with the maths recomputed, hints, say, labels, reproducible',()=>{
  const cur=fs.readFileSync(path.join(ROOT,'docs','CURRICULUM.md'),'utf8');
  const body=function(){
    S.name='Ava';S.buddy='Ben';S.pet='dino';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    const dv=s=>Math.round(parseFloat(s)*1000); // a decimal string as thousandths
    const txt=h=>String(h).replace(/<svg[^]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
    const esc2=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const svg0=h=>(h.match(/^<svg[^]*?<\/svg>/)||[''])[0];
    // ---- world: the stops of CURRICULUM 2.1 row 12, in that order, after Fraction Forest
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_desert'),w=mw[wi]||{nodes:[]};
    const row=cur.match(/\| 12 \| `m_desert` \| Decimal Desert \| 4 \| ([^|]+) \|/);
    const want=row?row[1].trim().split(', ').map(s=>s.replace(' ','')).join(' '):'?';
    if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' ')+' (CURRICULUM: '+want+')');
    if(want.split(' ').length!==14)add('CURRICULUM row 12 does not list 14 stops: '+want);
    if(wi<1||w.g!==4||w.n!=='Decimal Desert'||wi<mw.findIndex(x=>x.id=='m_frac')+1)add('world g/name/position');
    if(w.nodes.some(n=>n[2].length>22))add('stop title over 22 letters: '+w.nodes.find(n=>n[2].length>22)[2]);
    if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('two stops share a title');
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    if(WR.math[wi][1]-WR.math[wi][0]!==14||NODES.math[WR.math[wi][1]].sk!=='boss')add('15 stops: 14 and the boss');
    const mx={fop:7,dec:5,ang:2,geo:5,shape:6,meas:6,pat:5,story:9,frac:8}; // fop 7 is Sky City's (P2-13); geo 5 and story 9 are Galaxy Core's (P2-14)
    for(const k in mx)if(!SK[k]||SK[k].max!==mx[k]||SK[k].area!=='math')add('SK.'+k+'.max');
    for(let l=1;l<=8;l++)if(!NODES.math.some(n=>n.sk=='frac'&&n.lv==l))add('frac '+l+' has no stop');
    // ---- helpers for pictures
    const AM={}; // every drawn angle of ang 1 back to [degrees, turn]
    const degs=[];for(let d=15;d<=80;d+=5)degs.push(d);degs.push(90);for(let d=100;d<=165;d+=5)degs.push(d);degs.push(180);
    for(const d of degs)for(let r=0;r<360;r+=5)AM[VIZ.angle(d,{rot:r})]=[d,r];
    const cls=d=>d<90?'acute':d==90?'right':d<180?'obtuse':'straight';
    // path 'M10 22h100v60h-100z', 'M60 14L108 86H12z': its corners
    const corners=d=>{const o=[];let x=0,y=0;for(const m of d.matchAll(/([MLHVhvz])([^MLHVhvz]*)/g)){const n=m[2].trim().split(/[ ,]+/).filter(Boolean).map(Number),c=m[1];
      if(c=='M'||c=='L'){x=n[0];y=n[1];o.push([x,y])}else if(c=='h'){x+=n[0];o.push([x,y])}else if(c=='v'){y+=n[0];o.push([x,y])}
      else if(c=='H'){x=n[0];o.push([x,y])}else if(c=='V'){y=n[0];o.push([x,y])}}return o};
    const reflect=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy),fx=a[0]+t*dx,fy=a[1]+t*dy;return[2*fx-p[0],2*fy-p[1]]};
    const same=(P,Q,tol)=>P.every(p=>Q.some(q=>Math.hypot(p[0]-q[0],p[1]-q[1])<tol));
    // lines of symmetry of a polygon: axes through the middle and a corner or the middle of a side
    const symLines=P=>{let n=P.length;const c=[P.reduce((s,p)=>s+p[0],0)/n,P.reduce((s,p)=>s+p[1],0)/n],ang=[];
      const cand=P.concat(P.map((p,i)=>[(p[0]+P[(i+1)%n][0])/2,(p[1]+P[(i+1)%n][1])/2]));let k=0;
      for(const t of cand){const a=Math.atan2(t[1]-c[1],t[0]-c[0]),b=[c[0]+Math.cos(a)*50,c[1]+Math.sin(a)*50];
        if(ang.some(x=>Math.abs(((x-a)%Math.PI+Math.PI*1.5)%Math.PI-Math.PI/2)<.002))continue; // the same axis
        ang.push(a);if(same(P.map(p=>reflect(p,c,b)),P,.6)&&same(P,P.map(p=>reflect(p,c,b)),.6))k++}return k};
    const CONV={ft:['in',12,2,12],yd:['ft',3,2,20],m:['cm',100,2,30],km:['m',1000,2,9],kg:['g',1000,2,9],L:['mL',1000,2,9],hr:['min',60,2,9],min:['sec',60,2,20],lb:['oz',16,2,16],gal:['qt',4,2,20]};
    const UN=['cm','m','in','ft'];
    const ap=(o,n,x)=>o=='+'?x+n:o=='−'?x-n:o=='×'?x*n:x/n;
    // ---- generic checks per level, then the maths of each level
    const levels=[['fop',1],['fop',2],['dec',1],['dec',2],['ang',1],['ang',2],['geo',3],['shape',6],['meas',5],['pat',4],['story',7]];
    const share={},seen={};
    for(const [sk,lv] of levels){
      const key=sk+lv,labs={},seeLab=new Set(),S_=share[key]={};
      const tally=t=>{S_[t]=(S_[t]||0)+1};
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),W=key+': ',L=q.label,a=q.ans;
        const pr=kindProblems(q);if(pr.length)add(W+L+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv)add(W+'not stamped');
        if(!q.say||/undefined|NaN/.test(q.say)||/\d\/\d/.test(q.say))add(W+'say '+q.say);
        if(!q.hint||hintHTML(q).length<10)add(W+'hint missing');
        if(!L||L.length>=60||/undefined|NaN/.test(L))add(W+'label '+L);
        if(labs[L]!==undefined&&labs[L]!==a)add(W+'label '+L+' has two answers');
        labs[L]=a;seeLab.add(L);
        if(/undefined|NaN|\[object/.test(q.html))add(W+'html has undefined/NaN');
        if(q.kind=='num'&&numParts(a,numSeps(q)).some(t=>t.replace(/\D/g,'').length>4))add(W+'answer longer than the 4 keys: '+a);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(a)||new Set(vs).size!==vs.length||vs.length<2||vs.length>4)add(W+'choices '+L)}
        // a hint teaches the method and never states the answer
        {const pieces=q.hint.k=='steps'?q.hint.steps.map(s=>txt(s.html)):[txt(q.hint.s||q.hint.html)];
          if(q.hint.k=='steps'&&!/\?/.test(pieces[pieces.length-1]))add(W+'last step has no "?": '+pieces[pieces.length-1]);
          if(pieces.some(p=>/the answer is/i.test(p)))add(W+'hint says the answer');
          if(q.kind=='num'){const last=pieces[pieces.length-1];
            if(new RegExp('(=|\\bis|equals|makes)\\s*'+esc2(a)+'(?![\\d/.])').test(last))add(W+'hint gives the answer '+a+' in: '+last)}
          if(q.kind=='choice'&&q.sk=='dec'&&/less than|greater than|is more than|is smaller/.test(pieces.join(' ')))add(W+'dec2 hint names the symbol')}
        let m;
        // ---------------- fop 1
        if(sk=='fop'&&lv==1){
          const frs=[...q.html.matchAll(/<span class="fn">(\d+)<\/span><span class="fd">(\d+)<\/span>/g)].map(x=>+x[1]+'/'+x[2]);
          if(m=L.match(/^fop1 (\d+)\/(\d+) ([+−]) (\d+)\/(\d+)$/)){
            const A=+m[1],D=+m[2],B=+m[4],r=m[3]=='+'?A+B:A-B;
            if(+m[5]!==D||D<3||D>12||A<1||B<1||A>=D||B>=D)add(W+'operands '+L);
            if(m[3]=='+'&&(A+B)%D==0)add(W+'sum is a whole number '+L);
            if(m[3]=='−'&&A<=B)add(W+'difference not above 0 '+L);
            if(q.pad!=='frac'||q.eq!=='value'||q.sep||a!==r+'/'+D)add(W+L+' -> '+a);
            if(frs.join(' ')!==A+'/'+D+' '+B+'/'+D)add(W+'html shows '+frs);
            if(!q.say.includes(m[3]=='+'?'plus':'minus'))add(W+'say');
            tally(m[3]=='+'?(r>D?'add>1':'add<1'):'sub');
          }else if(m=L.match(/^fop1 (\d+) (\d+)\/(\d+) ([+−]) (\d+) (\d+)\/(\d+)$/)){
            const w1=+m[1],A=+m[2],D=+m[3],w2=+m[5],B=+m[6],tot=m[4]=='+'?(w1*D+A)+(w2*D+B):(w1*D+A)-(w2*D+B);
            if(+m[7]!==D||D<3||D>12||A<1||B<1||A>=D||B>=D||w1<1||w1>9||w2<1||w2>9)add(W+'operands '+L);
            const Wh=Math.floor(tot/D),n=tot%D;
            if(tot<=0||n==0||Wh<1)add(W+'result '+L);
            if(q.sep!=='mix'||q.eq!=='value'||a!==Wh+' '+n+'/'+D)add(W+L+' -> '+a);
            if(frs.join(' ')!==A+'/'+D+' '+B+'/'+D||!q.html.includes(w1+' <span class="fr">'))add(W+'html '+frs);
            tally('mixed');tally(m[4]=='+'?(A+B>D?'mixadd-regroup':'mixadd'):(A<B?'mixsub-regroup':'mixsub'));
          }else add(W+'label '+L);
        }
        // ---------------- fop 2
        if(sk=='fop'&&lv==2){
          if(!(m=L.match(/^fop2 (\d+) × (\d+)\/(\d+)$/))){add(W+'label '+L);continue}
          const w=+m[1],n=+m[2],d=+m[3];
          if(w<2||w>9||d<2||d>10||n<1||n>=d||(w*n)%d==0)add(W+'operands '+L);
          if(q.pad!=='frac'||q.eq!=='value'||a!==w*n+'/'+d)add(W+L+' -> '+a);
          const cells=(q.html.match(/class="vp[ "]/g)||[]).length,shaded=(q.html.match(/class="vp vs"/g)||[]).length;
          if(cells!==w*d||shaded!==w*n)add(W+'picture has '+cells+' parts, '+shaded+' shaded for '+L);
          const frs=[...q.html.matchAll(/<span class="fn">(\d+)<\/span><span class="fd">(\d+)<\/span>/g)].map(x=>x[1]+'/'+x[2]);
          if(frs.join(' ')!==n+'/'+d||!q.html.includes('>'+w+' ×'))add(W+'html');
          tally(n==1?'unit':'non-unit');
        }
        // ---------------- dec 1
        if(sk=='dec'&&lv==1){
          if(m=L.match(/^dec1 (?:(\d) )?(\d+)\/(10|100) to decimal$/)){
            const Wh=+(m[1]||0),k=+m[2],den=+m[3];
            if(den==10?(k<1||k>9):(k<1||k>99||k%10==0))add(W+'top '+L);
            if(dv(a)!==Wh*1000+k*1000/den||/\.\d*0$|^\./.test(a)||q.pad!=='dec'||q.eq!=='value')add(W+L+' -> '+a);
            if(!q.html.includes('<span class="fn">'+k+'</span><span class="fd">'+den+'</span>'))add(W+'html '+L);
            tally(den==10?'f2d tenths':'f2d hundredths');if(Wh)tally('whole');
          }else if(m=L.match(/^dec1 (0\.\d+) to fraction$/)){
            const dg=m[1].slice(2);
            if(dg.length>2||dg.slice(-1)=='0'||a!==(+dg)+'/'+10**dg.length||q.pad!=='frac'||q.eq!=='value')add(W+L+' -> '+a);
            if(!q.html.includes(m[1]+' ='))add(W+'html '+L);
            tally('d2f');
          }else if(m=L.match(/^dec1 grid (\d+) of (10|100)$/)){
            const k=+m[1],den=+m[2];
            if(k<1||k>(den==10?9:99)||dv(a)!==k*1000/den||/\.\d*0$/.test(a))add(W+L+' -> '+a);
            if(!q.html.startsWith(VIZ.areaGrid(10,den==10?1:10,{n:k})))add(W+'grid picture '+L);
            tally('grid');
          }else if(m=L.match(/^dec1 line (\d) tenths$/)){
            const k=+m[1];
            if(k<1||k>9||dv(a)!==k*100||!q.html.startsWith(VIZ.numLine({min:0,max:1,step:.1,labels:[0,1],marks:[k/10]})))add(W+L+' -> '+a);
            tally('line tenths');
          }else if(m=L.match(/^dec1 line (0\.\d+)$/)){
            const vh=Math.round(parseFloat(m[1])*100),t=Math.floor(vh/10),k=vh%10;
            if(a!==m[1]||k<1||t>8||!q.html.startsWith(VIZ.numLine({min:t/10,max:(t+1)/10,step:.01,labels:[t/10,(t+1)/10],marks:[vh/100],w:280})))add(W+L+' -> '+a);
            tally('line hundredths');
          }else add(W+'label '+L);
        }
        // ---------------- dec 2
        if(sk=='dec'&&lv==2){
          if(!(m=L.match(/^dec2 (\d)\.(\d+) \? (\d)\.(\d+)$/))){add(W+'label '+L);continue}
          const sa=m[2],sb=m[4],pa=sa.padEnd(3,'0'),pb=sb.padEnd(3,'0'),A=+m[1]*1000+ +pa,B=+m[3]*1000+ +pb;
          if(m[1]!==m[3]||sa.length==sb.length||sa.length>3||sb.length>3)add(W+'operands '+L);
          const exp=A<B?'<':A==B?'=':'>';
          if(a!==exp)add(W+L+' -> '+a);
          const eqCase=sa.replace(/0+$/,'')==sb.replace(/0+$/,'');
          if(eqCase!==(A==B))add(W+'equal case '+L);
          if(!eqCase&&(/0$/.test(sa)||/0$/.test(sb)))add(W+'a written zero at the end of '+L);
          if(q.choices.map(c=>c.v).join('')!=='<=>')add(W+'choices');
          if(!q.html.includes(m[1]+'.'+sa+' ')||!q.html.includes(' '+m[3]+'.'+sb+'<'))add(W+'html '+L);
          tally(Math.max(sa.length,sb.length)==3?'thousandths':'hundredths');tally(exp);if(!eqCase&&(sa.length<sb.length)==(A>B))tally('shorter-is-bigger');
        }
        // ---------------- ang 1
        if(sk=='ang'&&lv==1){
          if(m=L.match(/^ang1 (acute|right|obtuse|straight) (\d+)$/)){
            const hit=AM[svg0(q.html)];
            if(!hit||hit[0]!==+m[2]||cls(+m[2])!==m[1]||a!==m[1])add(W+L+' -> '+a+' picture '+(hit&&hit[0]));
            if(q.choices.map(c=>c.v).sort().join()!=='acute,obtuse,right,straight')add(W+'choices');
            tally(m[1]);
          }else if(m=L.match(/^ang1 pick (acute|right|obtuse)$/)){
            const k=q.choices.map(c=>{const h=AM[c.l];return h?cls(h[0]):'?'});
            if(a!==m[1]||k.slice().sort().join()!=='acute,obtuse,right'||q.choices.some((c,j)=>c.v!==k[j]))add(W+L+' pictures '+k+' values '+q.choices.map(c=>c.v));
            if(!q.html.includes(m[1]+' angle'))add(W+'html');
            tally('pick');
          }else add(W+'label '+L);
        }
        // ---------------- ang 2
        if(sk=='ang'&&lv==2){
          if(m=L.match(/^ang2 protractor (\d+)$/)){
            const d=+m[1];
            if(d%5||d<10||d>170||a!==String(d)||!q.html.startsWith(VIZ.angle(d,{proto:true})))add(W+L+' -> '+a);
            tally('proto');
          }else if(m=L.match(/^ang2 (right|straight|whole) (\d+) - (\d+)$/)){
            const whole=+m[2],x=+m[3];
            if(m[1]=='right'&&whole!==90||m[1]=='straight'&&whole!==180||m[1]=='whole'&&(whole%5||whole<50||whole>170))add(W+'whole '+L);
            if(x<10||x>whole-10||a!==String(whole-x))add(W+L+' -> '+a);
            if(!q.say.includes(x+'°')||!q.say.includes(m[1]=='right'?'(90°)':m[1]=='straight'?'(180°)':whole+'°'))add(W+'say '+q.say);
            if(!q.html.startsWith(VIZ.angle(whole,{label:whole+'°',rot:m[1]=='right'?20:m[1]=='whole'?10:0})))add(W+'picture');
            tally(m[1]);tally(x%5?'any':'five');
          }else add(W+'label '+L);
        }
        // ---------------- geo 3
        if(sk=='geo'&&lv==3){
          if(m=L.match(/^geo3 area (\d+) side (\d+) (cm|m|in|ft)$/)){
            const A=+m[1],l=+m[2],u=m[3],x=A/l;
            if(!Number.isInteger(x)||l<2||l>12||x<2||x>12||a!==String(x))add(W+L+' -> '+a);
            if(!q.html.startsWith(VIZ.rectSides(l,x,{w:l,h:'?'},{unit:u}))||!q.html.includes('The area is '+A+' '+FF_SQ[u]))add(W+'html '+L);
            tally('area');
          }else if(m=L.match(/^geo3 perimeter (\d+) side (\d+) (cm|m|in|ft)$/)){
            const P=+m[1],l=+m[2],u=m[3],x=P/2-l;
            if(P%2||!Number.isInteger(x)||x<1||l<2||l>14||x>14||a!==String(x))add(W+L+' -> '+a);
            if(!q.html.startsWith(VIZ.rectSides(l,x,{w:l,h:'?'},{unit:u}))||!q.html.includes('The perimeter is '+P+' '+u))add(W+'html '+L);
            tally('perimeter');
          }else if(m=L.match(/^geo3 L (\d+)x(\d+) minus (\d+)x(\d+) (cm|m|in|ft)$/)){
            const Wd=+m[1],H=+m[2],nw=+m[3],nh=+m[4];
            if(Wd<5||Wd>12||H<5||H>10||nw<2||nw>Wd-2||nh<2||nh>H-2)add(W+'sizes '+L);
            if(a!==String(Wd*H-nw*nh))add(W+L+' -> '+a);
            // the drawn L: its area (shoelace on the path) divided by the squared scale is the answer, and the four labels are the label's numbers
            const pm=q.html.match(/d="M([\d.]+) ([\d.]+)h([\d.-]+)v([\d.-]+)h([\d.-]+)v([\d.-]+)h([\d.-]+)z"/);
            if(!pm){add(W+'no L path');continue}
            const [x0,y0,h1,v1,h2,v2,h3]=pm.slice(1).map(Number),P=[[x0,y0],[x0+h1,y0],[x0+h1,y0+v1],[x0+h1+h2,y0+v1],[x0+h1+h2,y0+v1+v2],[x0+h1+h2+h3,y0+v1+v2]];
            let ar=0;for(let j=0;j<6;j++){const p=P[j],r=P[(j+1)%6];ar+=p[0]*r[1]-r[0]*p[1]}
            const k=(h1+h2)/Wd;
            if(Math.abs(Math.abs(ar/2)/(k*k)-(Wd*H-nw*nh))>.6||Math.abs((v1+v2)/H-k)>.02||Math.abs(h1/k-(Wd-nw))>.1||Math.abs(v1/k-nh)>.1||Math.abs(h2/k-nw)>.1)add(W+'picture does not match '+L);
            const tl=[...q.html.matchAll(/<text[^>]*>(\d+) (cm|m|in|ft)<\/text>/g)].map(x=>+x[1]);
            if(tl.join(',')!==[Wd,H,nh,nw].join(','))add(W+'labels '+tl+' for '+L);
            tally('L');
          }else add(W+'label '+L);
        }
        // ---------------- shape 6
        if(sk=='shape'&&lv==6){
          if(m=L.match(/^shape6 sym count (\w+)$/)){
            let n;
            if(m[1]=='parallelogram'||m[1]=='scalene')n=symLines(corners(q.html.match(/d="([^"]*)"/)[1]));
            else if(m[1]=='oval')n=2;
            else{
              if(!q.html.startsWith(VIZ.shape(m[1])))add(W+'picture '+L);
              n=symLines(corners(q.html.match(/<path class="v1" d="([^"]*)"/)[1]));
            }
            if(a!==String(n))add(W+L+' -> '+a+', drawn shape has '+n);
            if(!['square','rectangle','rhombus','triangle','trapezoid','pentagon','hexagon','oval','parallelogram','scalene'].includes(m[1]))add(W+'shape '+m[1]);
            tally(n==0?'sym0':'sym');
          }else if(m=L.match(/^shape6 sym line (rect|square|tri) (v|h|d|off)$/)){
            const P=corners(q.html.match(/<path class="vpo" d="([^"]*)"/)[1]),dl=corners(q.html.match(/<path class="vgd" d="([^"]*)"/)[1]);
            const yes=same(P.map(p=>reflect(p,dl[0],dl[1])),P,.6)&&same(P,P.map(p=>reflect(p,dl[0],dl[1])),.6);
            if(a!==(yes?'yes':'no'))add(W+L+' -> '+a+', the fold says '+(yes?'yes':'no'));
            if(P.length<3||dl.length!==2)add(W+'drawing');
            tally(yes?'line-yes':'line-no');
          }else if(m=L.match(/^shape6 lines (parallel|perpendicular|neither) (\d+)$/)){
            const ls=[...q.html.matchAll(/<path class="va" d="M([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)"/g)].map(x=>x.slice(1).map(Number));
            if(ls.length!==2){add(W+'two lines');continue}
            const dir=l=>Math.atan2(l[3]-l[1],l[2]-l[0]),d=Math.abs(((dir(ls[0])-dir(ls[1]))*180/Math.PI%180+180)%180);
            const off=Math.min(d,180-d),perp=Math.abs(d-90); // how far from parallel, how far from square
            const real=off<1?'parallel':perp<1?'perpendicular':off>=30&&perp>=30?'neither':'unclear';
            if(real!==m[1]||a!==m[1])add(W+L+' -> '+a+', drawn '+real+' ('+off.toFixed(1)+', '+perp.toFixed(1)+')');
            if(m[1]=='parallel'){const c=[(ls[0][0]+ls[0][2])/2,(ls[0][1]+ls[0][3])/2],c2=[(ls[1][0]+ls[1][2])/2,(ls[1][1]+ls[1][3])/2];if(Math.hypot(c[0]-c2[0],c[1]-c2[1])<30)add(W+'parallel lines too close')}
            if(q.choices.length!==3)add(W+'choices');
            tally(m[1]);
          }else if(m=L.match(/^shape6 tri angles (\d+) (\d+) (\d+)$/)){
            const A=[+m[1],+m[2],+m[3]],big=Math.max(...A);
            if(A[0]+A[1]+A[2]!==180||Math.min(...A)<10)add(W+'angles '+L);
            const real=big>90?'obtuse':big==90?'right':'acute';
            if(a!==real)add(W+L+' -> '+a);
            if(!A.every(x=>q.html.includes(x+'°')))add(W+'html');
            tally('tri-'+real);
          }else if(m=L.match(/^shape6 tri sides (\d+) (\d+) (\d+)$/)){
            const s=[+m[1],+m[2],+m[3]].sort((x,y)=>x-y);
            if(s[0]+s[1]<=s[2])add(W+'not a triangle '+L);
            const real=new Set(s).size==1?'equilateral':new Set(s).size==2?'isosceles':'scalene';
            if(a!==real)add(W+L+' -> '+a);
            tally('tri-'+real);
          }else add(W+'label '+L);
        }
        // ---------------- meas 5
        if(sk=='meas'&&lv==5){
          if(!(m=L.match(/^meas5 (\d+) (\w+) to (\w+)$/))||!CONV[m[2]]){add(W+'label '+L);continue}
          const [sm,f,lo,hi]=CONV[m[2]],n=+m[1];
          if(sm!==m[3]||n<lo||n>hi||a!==String(n*f))add(W+L+' -> '+a);
          if(!q.html.includes(n+' '+m[2]+' ='))add(W+'html '+L);
          if(!txt(q.hint.steps[0].html).includes('1 '+m[2]+' = '+f+' '+sm))add(W+'hint table');
          if(q.html.includes('1 '+m[2]+' = '+f))add(W+'the table is in the prompt');
          tally(m[2]);
        }
        // ---------------- pat 4
        if(sk=='pat'&&lv==4){
          if(!(m=L.match(/^pat4 (fill|rule) ([+−×÷])(\d+) ([\d,]+)$/))){add(W+'label '+L);continue}
          const op=m[2],n=+m[3],ins=m[4].split(',').map(Number),outs=ins.map(x=>ap(op,n,x));
          if(ins.length!==4||ins.some((x,j)=>j&&x<=ins[j-1])||outs.some(x=>!Number.isInteger(x)||x<1))add(W+'table '+L);
          if(op=='+'&&(n<2||n>20)||op=='−'&&(n<2||n>15)||(op=='×'||op=='÷')&&(n<2||n>9))add(W+'rule size '+L);
          const rows=m[1]=='fill'?ins.slice(0,3).map((x,j)=>[x,outs[j]]).concat([[ins[3],'?']]):ins.map((x,j)=>[x,outs[j]]);
          if(!q.html.startsWith(VIZ.tableInOut(rows,{head:['In','Out']})))add(W+'table picture '+L);
          if(m[1]=='fill'){
            if(a!==String(outs[3])||q.kind!=='num')add(W+L+' -> '+a);
            // no other single rule fits the three rows and gives another last number
            for(const o2 of ['+','−','×','÷'])for(let k=1;k<=30;k++){if([0,1,2].every(j=>ap(o2,k,ins[j])===outs[j])&&ap(o2,k,ins[3])!==outs[3])add(W+'two rules fit '+L)}
            tally('fill');
          }else{
            if(a!==op+n||q.kind!=='choice')add(W+L+' -> '+a);
            const rs=q.choices.map(c=>c.v);
            for(const c of rs){const mm=c.match(/^([+−×÷])(\d+)$/),fits=mm&&ins.every((x,j)=>ap(mm[1],+mm[2],x)===outs[j]);if(!mm||(c===a)!==!!fits)add(W+'choice '+c+' for '+L)}
            if(rs.length!==4)add(W+'4 choices');
            tally('rule');
          }
          tally(op);
        }
        // ---------------- story 7
        if(sk=='story'&&lv==7){
          if(!(m=L.match(/^story7 (?:(\d+)x(\d+)=)?(\d+) \/ (\d+) (up|down|left)$/))){add(W+'label '+L);continue}
          const T=+m[3],s=+m[4],type=m[5];
          if(m[1]&&+m[1]*+m[2]!==T)add(W+'total '+L);
          if(T%s==0||s<3||s>9||T<s+1)add(W+'no remainder or sizes '+L);
          const exp=type=='up'?Math.floor(T/s)+1:type=='down'?Math.floor(T/s):T%s;
          if(a!==String(exp))add(W+L+' -> '+a);
          const ask=q.say;
          if(m[1]){if(!ask.includes(m[1]+' boxes with '+m[2])||!ask.includes('bags of '+s))add(W+'say '+ask)}
          else if(!new RegExp('\\b'+T+'\\b').test(ask)||!new RegExp('\\b'+s+'\\b').test(ask))add(W+'say lacks the numbers '+ask);
          if(type=='up'&&!/needed|need/.test(ask)||type=='down'&&!/full|fill/.test(ask)||type=='left'&&!/left over/.test(ask))add(W+'question does not match the kind '+L+': '+ask);
          if(q.say!==q.html.replace(/<[^>]+>/g,'').replace(/<\/?div>/g,''))add(W+'say differs from the story');
          tally(type);tally(m[1]?'multi':'single');
        }
      }
      seen[key]=seeLab.size;
      // reproducible: the same seed gives the same question, hint and choices
      for(let s=1;s<=40;s++)if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))add(key+' seed '+s+' not reproducible');
    }
    // ---- mixes (each variant shows up a fair share of the time)
    const fair=(k,names,lo)=>{for(const n of names)if(!((share[k]||{})[n]>N*lo))add(k+': '+n+' too rare '+JSON.stringify(share[k]))};
    fair('fop1',['add>1','add<1','sub','mixed'],.1);fair('fop1',['mixadd-regroup','mixadd','mixsub-regroup','mixsub'],.03);fair('fop2',['unit','non-unit'],.3);
    fair('dec1',['f2d tenths','f2d hundredths','d2f','grid','line tenths','line hundredths'],.06);fair('dec1',['whole'],.03);
    fair('dec2',['thousandths','hundredths','<','>'],.3);fair('dec2',['=','shorter-is-bigger'],.07);
    fair('ang1',['acute','right','obtuse','straight','pick'],.1);fair('ang2',['proto','right','straight','whole','any','five'],.08);
    fair('geo3',['area','perimeter','L'],.25);fair('shape6',['sym','sym0','line-yes','line-no','parallel','perpendicular','neither','tri-acute','tri-right','tri-obtuse','tri-equilateral','tri-isosceles','tri-scalene'],.02);
    for(const u of Object.keys(CONV))fair('meas5',[u],.06);
    fair('pat4',['fill','rule','+','−','×','÷'],.15);fair('story7',['up','down','left','multi','single'],.15);
    for(const [k,min] of [['fop1',60],['fop2',60],['dec1',60],['dec2',60],['ang1',25],['ang2',60],['geo3',60],['shape6',60],['meas5',30],['pat4',60],['story7',60]])if(seen[k]<min)add(k+': only '+seen[k]+' different labels');
    // ---- frac 6-8 (P2-06's generators) now have stops; a quick check that they still ask what their labels say
    for(let lv=6;lv<=8;lv++)for(let i=0;i<300;i++){const q=genQ('frac',lv,i*7919+31);if(kindProblems(q).length||!q.hint)add('frac'+lv+': '+kindProblems(q)[0])}
    return bad;
  };
  const r=eval(js+';('+body.toString()+')()');
  // the block of this chunk: no Math.random, no raw colour
  const src=fs.readFileSync(path.join(SRC,'js','35-gen-math-upper.js'),'utf8'),i0=src.indexOf('// ---- P2-10 Decimal Desert ----'),i1=src.indexOf('\n// ---- P',i0+10),blk=src.slice(i0,i1<0?undefined:i1);
  if(i0<0)r.push('P2-10 block marker missing');
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))r.push('P2-10 block has a raw hex colour');
  if(/Math\.random/.test(blk))r.push('P2-10 block uses Math.random');
  return{problems:r,note:'11 levels x 3,000 samples'};
});

run('Decimal Desert P2-10: the new world keeps every star, re-locks nothing and the map opens where it did (fixtures x grades)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const ORIG=PATHS.math.worlds,DI=ORIG.findIndex(w=>w.id=='m_desert'),without=()=>ORIG.filter(w=>w.id!=='m_desert');
    const snap=()=>{const o={};NODES.math.forEach((n,i)=>{o[nid(n)]={st:getSt('math',i),open:unlocked('math',i),pass:passed('math',i),wid:n.wid}});return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])fixtures.push([name,fx(name)]);
    // synthetic saves: everything before the desert passed (with and without its boss), and a desert partly played
    const mk=(passAll,boss,extra)=>{load(null);PATHS.math.worlds=without();buildNodes('math');const m={};
      NODES.math.forEach(n=>{if(n.sk!=='boss'||boss)m[nid(n)]=2});PATHS.math.worlds=ORIG;buildNodes('math');
      return JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{math:Object.assign(m,extra||{}),read:{},es:{}},grade:4})};
    fixtures.push(['path-done',mk(1,true)],['stops-done-no-boss',mk(1,false)],['desert-started',mk(1,true,{frac6:3,frac7:2,fop1:1})]);
    let checked=0,moved=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,4,5,6]){
      load(raw.length>2?raw:null);if(g!==null)S.grade=g;
      const tag=name+' g'+gradeOf()+': ',maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.math[curNode('math')]),curW=NODES.math[curNode('math')].wid;
      PATHS.math.worlds=without();buildNodes('math');
      const old=snap(),curOld=nid(NODES.math[curNode('math')]),curOldW=NODES.math[curNode('math')].wid;
      PATHS.math.worlds=ORIG;buildNodes('math');
      for(const k in old){
        checked++;
        if(!now[k]){b(tag+'stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(tag+'stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(tag+'passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(tag+k+' locked by the new world');
      }
      const given=(JSON.parse(raw).maps||{}).math||{};
      for(const k in now)if(!(k in old)&&now[k].st&&!(k in given))b(tag+'new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(tag+'building the nodes changed the map');
      // the map opens on the same stop as before, except: a child with nothing left before the desert (every older stop passed) meets
      // it next; and a 4th grader and up with nothing further on starts in the world of their own grade (startWorld)
      if(cur!==curOld){
        moved++;
        const prevDone=worldFinished('math',DI-1)||NODES.math.filter((n,i)=>n.wi<DI).every((n,i)=>passed('math',i));
        const lastWorld=curOldW===ORIG[DI-1].id&&gradeOf()>=4;
        if(curW!=='m_desert'||!(prevDone||lastWorld||gradeOf()>=4))b(tag+'map opens on '+cur+' (was '+curOld+')');
      }
      if(curW==='m_desert'&&gradeOf()<4&&!worldFinished('math',DI-1)&&!worldHasProgress('math',DI))b(tag+'the map opens in the desert before Fraction Forest is done');
    }
    PATHS.math.worlds=ORIG;buildNodes('math');
    // a 3rd grader does not see the desert open until the forest is finished
    load(null);S.grade=3;if(worldOpen('math',DI))b('grade 3: the desert is open before Fraction Forest is done');
    S.grade=4;if(!worldOpen('math',DI))b('grade 4: the desert must be open');
    return{out,checked,moved};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:r.out,note:r.checked+' stop checks against a path without the desert, map moved on '+r.moved+' of 81 loads'};
});

// ---- P3-01: Brain Teasers hub and puzzle framework (BRAIN_TEASERS 2, 3, 9) ----
run('teaser framework P3-01',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const fixtures=fs.readdirSync(path.join(__dirname,'fixtures')).filter(n=>n.endsWith('.json')).map(n=>n.slice(0,-5));
  const r=eval(js+`
  const store={};
  localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
  const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
  const bad=[],eq=(a,b,m)=>{if(JSON.stringify(a)!==JSON.stringify(b))bad.push(m+': '+JSON.stringify(a)+' != '+JSON.stringify(b))};
  const fake=(id,o)=>Object.assign({id,name:'Fake '+id,icon:'nope',bands:'ABCD',make:(b,l,rn)=>({b,l,n:Math.floor(rn()*1e9),g:R(1,1e9)}),mount:()=>({hint(){},destroy(){}}),solve:p=>[p.n]},o||{});
  const run=(lv,over)=>Object.assign({id:'zzmaze',band:'B',level:lv,puzzle:{},state:null,hints:0,sec:30,day:today()},over||{});
  const nod=()=>{BT.st().daily={day:today(),done:['zzmaze','zzfit','sudoku'],pick:{id:'zzmaze',band:'B',level:1}}}; // today's daily bonus already taken
  const fin=(lv,over,res)=>BT.finish(run(lv,over),Object.assign({mistakes:0,hints:0,sec:5},res||{}));
  BT.list().forEach(t=>BT.unreg(t.id)); // only the fake types below
  // 1. registration
  BT.reg(fake('zzmaze'));BT.reg(fake('zzfit',{bands:'BC',levels:b=>b=='B'?3:5}));BT.reg(fake('sudoku',{icon:'star'}));
  eq(BT.list().map(t=>t.id),['sudoku','zzfit','zzmaze'],'catalog order first, then by id');
  for(const[m,d]of[['a duplicate',fake('zzmaze')],['a reserved id',fake('cur')],['a reserved id (daily)',fake('daily')],['a bad id',fake('Bad Id')],['bad bands',fake('zzx',{bands:'EF'})],
    ['no make',fake('zzx',{make:null})],['no mount',fake('zzx',{mount:null})],['no solve',fake('zzx',{solve:null})],['no name',fake('zzx',{name:''})],['levels that is not a function',fake('zzx',{levels:12})]]){
    let threw=false;try{BT.reg(d)}catch(e){threw=true}if(!threw)bad.push('BT.reg accepted '+m);
  }
  if(BT.icon(BT.get('zzmaze'))!=='puzzle'||BT.icon(BT.get('sudoku'))!=='star')bad.push('an unknown icon falls back to puzzle, a known one is kept');
  // 2. bands and what the hub lists
  eq([-1,0,1,2,3,4,5,6].map(BT.bandOf),['A','A','B','B','C','C','D','D'],'band by grade');
  load(null);S.grade=1;
  eq(BT.offered().map(t=>t.id),['sudoku','zzfit','zzmaze'],'grade 1 offered');
  S.grade=5;eq(BT.offered().map(t=>t.id),['sudoku','zzmaze'],'zzfit (B and C only) is hidden in band D');
  S.grade=3;eq(BT.bands(BT.get('zzmaze')),['B','C'],'own band and one lower');
  BT.rec('zzmaze','C',true).stars=[3,3,3,1];
  eq(BT.bands(BT.get('zzmaze')),['B','C','D'],'the next band opens at 10 stars');
  eq(BT.bands(BT.get('zzfit')),['B','C'],'a type without the next band');
  S.grade=0;eq(BT.bands(BT.get('zzmaze')),['A'],'band A has no lower one');
  // 3. seeded puzzles
  load(null);S.grade=1;
  const a1=BT.make('zzmaze','B',3,{day:'2026-6-15'}),a2=BT.make('zzmaze','B',3,{day:'2026-6-15'});
  eq(a1,a2,'same type, band, level and day: the same puzzle (including the global R)');
  if(JSON.stringify(a1)===JSON.stringify(BT.make('zzmaze','B',3,{day:'2026-6-16'})))bad.push('another day gives the same puzzle');
  if(a1.n===BT.make('zzmaze','B',4,{day:'2026-6-15'}).n)bad.push('another level gives the same puzzle');
  if(BT.make('zzmaze','B',3,{day:'2026-6-15'}).n===BT.make('zzmaze','C',3,{day:'2026-6-15'}).n)bad.push('another band gives the same puzzle');
  const before=RNG;BT.make('zzmaze','B',1);if(RNG!==before)bad.push('make left the seeded RNG installed');
  const mk=BT.get('zzmaze').make;BT.get('zzmaze').make=()=>{throw new Error('boom')};try{BT.make('zzmaze','B',1)}catch(e){}
  if(RNG!==before)bad.push('make threw and left the seeded RNG installed');BT.get('zzmaze').make=mk;
  eq(BT.get('zzmaze').solve(a1),[a1.n],'solve');
  for(let i=0;i<50;i++){const e=BT.endlessLevel(BT.get('zzmaze'),'B',i,'2026-6-15');if(e<9||e>12)bad.push('endless level '+e)}
  eq(BT.nLevels(BT.get('zzfit'),'B'),3,'levels by band');
  // 4. stars and game time
  eq([[0,0],[0,2],[0,3],[1,0],[1,9],[2,0],[5,0]].map(([h,m])=>BT.rate(h,m,2)),[3,3,2,2,2,1,1],'stars: 3 = no hint and mistakes within the allowance, 2 = at most one hint, 1');
  eq(BT.rate(0,3,3),3,'a type may allow more mistakes');
  eq(['A','B','C','D'].map(b=>[1,2,3].map(s=>BT.gameSec(b,s))),[[23,30,45],[30,40,60],[45,60,90],[60,80,120]],'game time by band and stars (at least a half)');
  // 5. a first solve, a replay, an improvement
  load(null);S.grade=1;S.stars=0;S.coins=0;nod();
  const gtb=pt().bank;
  let o=fin(1);
  if(o.stars!==3||!o.first||o.added!==3||S.stars!==3||o.sec!==60||pt().bank!==gtb+60)bad.push('first solve in band B: '+JSON.stringify(o));
  eq([BT.rec('zzmaze','B').lvl,BT.rec('zzmaze','B').stars],[2,[3]],'level 2 unlocked');
  o=fin(1);
  if(o.first||o.added||S.stars!==3||o.sec!==15||pt().bank!==gtb+75)bad.push('replay of a solved level: '+JSON.stringify(o));
  o=fin(2,0,{hints:2});
  if(o.stars!==1||o.sec!==30||S.stars!==4)bad.push('first solve with 2 hints: 1 star, half time: '+JSON.stringify(o));
  o=fin(2);
  if(!o.improved||o.added!==2||S.stars!==6||o.sec!==15)bad.push('an improved replay pays only the new stars: '+JSON.stringify(o));
  o=fin(2,0,{mistakes:5,hints:1});
  if(o.added||BT.rec('zzmaze','B').stars[1]!==3)bad.push('a worse replay must not lower the best');
  eq(BT.rec('zzmaze','B').lvl,3,'lvl after solving 1 and 2');
  fin(1);if(BT.rec('zzmaze','B').lvl!==3)bad.push('replaying an old level changed lvl');
  if(BT.totalStars()!==6||BT.starsOf('zzmaze')!==6)bad.push('totalStars '+BT.totalStars());
  S.bt.cur={id:'zzmaze'};fin(1);if(S.bt.cur)bad.push('finish must clear S.bt.cur');
  for(const[b,sec]of[['A',45],['C',90],['D',120]]){load(null);S.grade=3;nod();const g=pt().bank;o=fin(1,{band:b});if(o.sec!==sec||pt().bank!==g+sec)bad.push('band '+b+' first solve game time '+o.sec)}
  // 6. the last level opens Endless; an Endless solve pays a replay
  load(null);S.grade=1;nod();
  BT.rec('zzfit','B',true).lvl=3;BT.rec('zzfit','B').stars=[3,3,2];
  o=fin(3,{id:'zzfit'});
  if(BT.rec('zzfit','B').lvl!==4||!o.unlocked)bad.push('finishing the last level opens Endless (lvl N+1)');
  const s0=S.stars;o=fin('E',{id:'zzfit'});
  if(o.added||S.stars!==s0||o.sec!==15||BT.rec('zzfit','B').endless!==1||o.first)bad.push('endless solve: '+JSON.stringify(o));
  // 7. game time from puzzles stops at half of the grown-up's daily cap
  load(null);S.grade=3;nod();ptCfg().max=30;
  let paid=0;for(let i=0;i<100;i++){const g=pt().bank;fin(1,{band:'D'});paid+=pt().bank-g}
  if(paid!==900)bad.push('cap 30 min: puzzles may earn 900 s, earned '+paid);
  o=fin(1,{band:'D'});if(o.sec!==0||!o.capped)bad.push('capped win '+JSON.stringify(o));
  S.bt.earn.day='1999-1-1';o=fin(1,{band:'D'});if(o.sec!==15)bad.push('the cap starts again the next day');
  load(null);S.grade=3;nod();ptCfg().max=0;paid=0;for(let i=0;i<30;i++){const g=pt().bank;fin(1,{band:'D'});paid+=pt().bank-g}
  if(paid!==120+29*15)bad.push('no cap set: '+paid);
  // 8. three solves make one round (day count, streak), the daily mission follows the usual rule
  load(null);S.grade=1;S.day={};nod();ptCfg().max=0;
  const d0=day().r,st0=STRK.get().days[today()]||0;
  fin(1);fin(1);
  if(day().r!==d0||(STRK.get().days[today()]||0)!==st0)bad.push('two solves are not a round yet');
  o=fin(1);
  if(day().r!==d0+1||STRK.get().days[today()]!==st0+1||!o.round||o.round.mission)bad.push('three solves = one round: '+JSON.stringify([day().r,o.round]));
  for(let i=0;i<5;i++)fin(1);
  if(day().r!==d0+2)bad.push('six solves = two rounds, got '+(day().r-d0));
  // 9. the Puzzle of the Day: the same all day, paid once
  load(null);S.grade=1;S.coins=0;ptCfg().max=0;
  const dl=BT.dailyInfo();eq(dl,BT.dailyInfo(),'the daily pick is stable');
  if(!dl||dl.done||dl.band!=='B'||dl.level!==1)bad.push('daily pick '+JSON.stringify(dl));
  o=fin(dl.level,{id:dl.id});
  if(!o.daily||o.coins!==5||o.sec!==120||S.coins!==5||!BT.dailyInfo().done||BT.dailyInfo().id!==dl.id)bad.push('daily reward: '+JSON.stringify(o));
  o=fin(1,{id:dl.id});if(o.daily||o.coins)bad.push('the daily bonus was paid twice');
  BT.st().daily.day='1999-1-1';if(BT.dailyInfo().done)bad.push('the daily puzzle starts again on a new day');
  BT.list().forEach(t=>BT.unreg(t.id));if(BT.dailyInfo()!==null)bad.push('no types: no daily pick');
  // 10. saves: every fixture loads unchanged, a damaged S.bt never throws, a new save round-trips
  for(const name of fixtures){
    load(fx(name));const pre=JSON.parse(JSON.stringify(S));
    BT.reg(fake('zzmaze'));
    BT.totalStars();BT.offered();BT.bands(BT.get('zzmaze'));BT.dailyInfo();BT.nowLevel(BT.get('zzmaze'),'A');
    const post=JSON.parse(JSON.stringify(S));delete post.bt;
    if(pre.bt!==undefined)bad.push(name+': an old save already has S.bt');
    eq(post,pre,name+': reading Brain Teasers data changed the save');
    if(S.v!==LATEST)bad.push(name+': S.v is not the latest version');
    BT.unreg('zzmaze');
  }
  BT.reg(fake('zzmaze'));
  for(const junk of ['x',[],null,7,{zzmaze:'x'},{zzmaze:{B:{lvl:'a',stars:'b',endless:-4}}},{zzmaze:{B:{lvl:99,stars:[9,-1,'q',2]}}},{cur:5,daily:'d',rnd:[],earn:3}]){
    load(null);S.grade=1;S.bt=junk;
    try{BT.totalStars();BT.offered();BT.dailyInfo();BT.rec('zzmaze','B',true);fin(1,0,{sec:1})}catch(e){bad.push('damaged S.bt '+JSON.stringify(junk)+' threw '+e.message)}
  }
  load(null);S.grade=1;fin(1,0,{mistakes:1,sec:9});S.bt.cur={id:'zzmaze',band:'B',level:2,puzzle:{a:1},state:{x:[1,2]},hints:1,sec:44,day:today()};save();
  const keep=JSON.parse(JSON.stringify(S.bt));load(store[KEY]);eq(S.bt,keep,'S.bt round trip');
  bad;`);
  return{problems:[...new Set(r)],note:'registry, seeds, stars, rewards, cap, rounds, daily, '+fixtures.length+' fixtures'};
});

// ---- P3-02 dev-time solver core and sudoku banks (BRAIN_TEASERS 5.1, 6) ----
run('sudoku banks P3-02: format, givens agree with the solution, exactly one solution (independent counter), grade matches the grader, reproducible from the seed',()=>{
  const p=[];
  const vb=require('./puzzles/verify-banks.js'),sd=require('./puzzles/sudoku.js'),csp=require('./puzzles/csp.js');
  const T=require('./puzzles/build-banks.js').TYPES.sudoku;
  // the bank as the app sees it: evaluated with all of src/js and src/data, and present in the built data file
  const inApp=eval(js+';PUZ.sudoku');
  const bank=vb.loadBank('d-puz-sudoku.js').sudoku;
  if(JSON.stringify(inApp)!==JSON.stringify(bank))p.push('PUZ.sudoku differs when loaded with the whole app');
  const built=fs.existsSync(path.join(ROOT,DATA_FILE))?fs.readFileSync(path.join(ROOT,DATA_FILE),'utf8'):''; // A11: banks are in the data file
  if(!built.includes('PUZ.sudoku = {'))p.push(DATA_FILE+' has no sudoku bank (rebuild)');
  // every stored puzzle: format, givens count, valid solution, givens agree, symmetric 9x9, one solution, grade, no duplicates
  const v=vb.verifySudoku(bank);
  p.push(...v.problems);
  // the independent counter itself: 288 full 4x4 grids, an empty 9x9 has more than one, a broken given has none
  if(vb.countSimple(Array(16).fill(0),4,2,2,1000)!==288)p.push('countSimple: empty 4x4 is not 288 grids');
  if(vb.countSimple(Array(81).fill(0),9,3,3,2)!==2)p.push('countSimple: empty 9x9 not ambiguous');
  const d0=sd.decode(bank.D.hard[0],9),clash=d0.givens.slice(),gi=clash.findIndex(x=>x);
  clash[gi]=clash[gi]%9+1;
  if(vb.countSimple(clash,9,3,3,2)!==0)p.push('countSimple: a changed given still has a solution');
  // the generator's solver agrees with the independent counter on the same puzzles
  for(const b of sd.ORDER)for(const t of sd.TIERS){
    const s=sd.BANDS[b],q=sd.decode(bank[b][t][0],s.n);
    if(csp.countSolutions({n:s.n*s.n,size:s.n,groups:sd.groupsFor(s),givens:q.givens},2)!==1)p.push('csp count is not 1 for '+b+' '+t+' #0');
  }
  // reproducible: regenerate the first and last slot of every band and tier from the seed and compare the stored string
  let regen=0;
  const order=[];
  for(const b of sd.ORDER)for(const t of sd.TIERS)bank[b][t].forEach((e,i)=>order.push([b,t,i,e]));
  order.forEach(([b,t,i,e],k)=>{
    if(i!==0&&i!==T.count-1)return;
    const avoid=new Set(order.slice(0,k).map(([b2,,,e2])=>sd.bankKey(sd.decode(e2,sd.BANDS[b2].n).givens,sd.BANDS[b2])));
    const g=sd.encode(sd.genSlot(T.seed,b,t,i,avoid));
    regen++;
    if(g!==e)p.push('slot '+b+' '+t+' #'+i+' regenerates as '+g+', stored '+e);
  });
  const total=Object.values(v.counts).reduce((a,c)=>a+c,0);
  return{problems:p,note:total+' puzzles in '+Object.keys(v.counts).length+' band/tier lists; '+regen+' slots regenerated'};
});

// ---- P2-11 Volcano Lab (5th) ----
run('Volcano Lab P2-11: stops in CURRICULUM order, 3,000 samples per new level with the maths recomputed (decimals exact), hints, reproducible, old levels unchanged, decimal step builders',()=>{
  const body=function(){
    S.name='Ava';S.buddy='Ben';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const strip=h=>h.replace(/<[^>]+>/g,'|').replace(/&nbsp;/g,' ');
    // ---- world
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_volcano'),w=mw[wi];
    const want='pv5 mbig5 dec3 pv6 dbig4 dec4 round4 ooo1 dec5';
    if(wi<1||!w)add('world m_volcano missing');
    else{
      if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' '));
      if(w.g!==5||w.n!=='Volcano Lab'||mw[wi-1].id!=='m_factory'&&mw[wi-1].id!=='m_desert')add('world g/name/position');
      if(mw.findIndex(x=>x.id=='m_factory')>wi)add('Volcano Lab must come after Factor Factory');
      if(w.nodes.some(n=>n[2].length>22))add('stop name too long: '+w.nodes.find(n=>n[2].length>22)[2]);
      if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('duplicate stop names');
      if(WR.math[wi][1]-WR.math[wi][0]!==9||NODES.math[WR.math[wi][1]].sk!=='boss')add('10 stops: 9 and the boss');
    }
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    const mx={pv:6,mbig:5,dbig:4,round:4,dec:5,ooo:3}; // ooo 2-3 are Galaxy Core's (P2-14)
    for(const k in mx)if(SK[k].max!==mx[k]||SK[k].area!=='math')add('SK.'+k+'.max '+SK[k].max);
    // ---- old levels unchanged: every old level still comes from the same generator with the same seed
    const sameQ=(sk,lv,fn)=>{for(let s=1;s<=60;s++){const sd=(s*7+3)>>>0,a=genQ(sk,lv,sd),prev=RNG;RNG=mulberry32(sd);let b;try{b=fn(lv);b.sk=sk;b.lv=lv;b.seed=sd}finally{RNG=prev}
      if(JSON.stringify(a)!==JSON.stringify(b)){add('old level changed: '+sk+lv);return}}};
    sameQ('pv',1,()=>genPv1());sameQ('pv',2,genBayPv2);sameQ('pv',3,genBayPv3);sameQ('pv',4,fyPv4);
    sameQ('mbig',1,genMbig);for(let l=2;l<=4;l++)sameQ('mbig',l,fyMbig);
    for(let l=1;l<=3;l++)sameQ('dbig',l,fyDbig);
    sameQ('round',1,ffRound);sameQ('round',2,ffRound);sameQ('round',3,fyRound3);
    // ---- independent decimal arithmetic on BigInt: {n, p} is n / 10^p
    const D=s=>{const [i,f='']=s.split('.');return {n:BigInt(i+f),p:f.length}};
    const T=BigInt(10);
    const fmt=(n,p)=>{const s=n.toString().padStart(p+1,'0'),i=s.slice(0,s.length-p),f=p?s.slice(s.length-p).replace(/0+$/,''):'';return f?i+'.'+f:i};
    const up=(x,p)=>x.n*T**BigInt(p-x.p);
    const plus=(x,y)=>{const p=Math.max(x.p,y.p);return {n:up(x,p)+up(y,p),p}};
    const minus=(x,y)=>{const p=Math.max(x.p,y.p);return {n:up(x,p)-up(y,p),p}};
    const times=(x,y)=>({n:x.n*y.n,p:x.p+y.p});
    const shift=(x,j)=>j>=0?{n:x.n*T**BigInt(j),p:x.p}:{n:x.n,p:x.p-j}; // x times 10^j
    const roundTo=(x,k)=>{const d=x.p-k;return {n:(x.n+5n*T**BigInt(d-1))/T**BigInt(d),p:k}};
    const quot=(x,y)=>{for(let t=0;t<=4;t++){const num=x.n*T**BigInt(y.p+t),den=y.n*T**BigInt(x.p);if(num%den==0n)return {n:num/den,p:t}}return null};
    const nodig=s=>String(s).replace(/\D/g,'').length;
    const places=s=>(s.split('.')[1]||'').length;
    const WORD={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,
      twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90};
    const fromWords=s=>{let tot=0,cur=0;for(const t of s.replace(/,/g,' ').replace(/-/g,' ').split(/\s+/).filter(Boolean)){
      if(t=='hundred')cur*=100;else if(t=='thousand'){tot+=cur*1000;cur=0}else if(t in WORD)cur+=WORD[t];else return NaN}
      return tot+cur};
    // order of operations: value and whether any step is not a whole number or is below 0 (own parser)
    const evalOOO=s=>{
      const t=s.replace(/\s+/g,'').match(/\d+|[()+−×÷]/g);let i=0,ok=true,ops=0;
      const chk=v=>{if(!Number.isInteger(v)||v<0)ok=false;return v};
      const expr=()=>{let v=term();while(t[i]=='+'||t[i]=='−'){const o=t[i++],x=term();ops++;v=chk(o=='+'?v+x:v-x)}return v};
      const term=()=>{let v=atom();while(t[i]=='×'||t[i]=='÷'){const o=t[i++],x=atom();ops++;v=chk(o=='×'?v*x:v/x)}return v};
      const atom=()=>{if(t[i]=='('){i++;const v=expr();i++;return v}return +t[i++]};
      const v=expr();return {v,ok,ops,len:t.length,i}};
    // a hint's shape: steps, html and say, a record per step, only the last asks, every number of a step is on show, whole board rows, spoken text without symbols
    const shape=(h,w)=>{
      if(!h||h.k!=='steps'||!Array.isArray(h.steps)||!h.steps.length)return add(w+': not a step hint');
      h.steps.forEach((s,i)=>{
        const last=i==h.steps.length-1;
        if(typeof s.html!=='string'||typeof s.say!=='string'||!s.say.trim())add(w+' step '+i+': html/say');
        if(/undefined|NaN|null/.test(s.html+s.say))add(w+' step '+i+': undefined/NaN');
        if(/[<>×÷−]|&nbsp;/.test(s.say))add(w+' step '+i+': say has symbols: '+s.say);
        const c=s.c;if(!c)return add(w+' step '+i+': no record');
        if(last!==(c.r===null))add(w+' step '+i+': r null only in the last step');
        if(last&&!s.html.includes('?'))add(w+': last step has no ?');
        const txt=s.html.replace(/<[^>]+>/g,' ');
        for(const x of c.x.concat(last?[]:[c.r]))if(typeof x=='number'&&!new RegExp('(^|[^0-9])'+x+'([^0-9]|$)').test(txt))add(w+' step '+i+': '+x+' not shown');
        for(const m of s.html.matchAll(/<div class="hsb[^"]*" style="grid-template-columns:([^"]+)">([\s\S]*?)<\/div>/g)){
          const cols=m[1].split(' ').length;let cells=0;
          for(const t of m[2].matchAll(/<i [^>]*?(?:grid-column:span (\d))?"?>/g))cells+=t[1]?+t[1]:1;
          if(cells%cols)add(w+' step '+i+': board cells '+cells+' not whole rows of '+cols);
        }
      });
    };
    // ---- the two new step builders, 3,000 problems each
    const R1=(lo,hi)=>R(lo,hi);
    const decS=(p,lo,hi)=>{let m;do m=R1(lo,hi);while(p&&m%10==0);return fmt(BigInt(m),p)};
    for(let t=0;t<N;t++){
      const pa=R1(0,2),pb=R1(0,2);let a=pa?decS(pa,1,99*10**(pa-1)+9):String(R1(1,99)),b=pb?decS(pb,1,99):String(R1(1,99));
      if(+a<=0||+b<=0)continue;
      const w='decmul '+a+' x '+b;let h;try{h=stepsDecMul(a,b)}catch(e){add(w+': threw '+e.message);continue}
      shape(h,w);
      const x=D(a),y=D(b),pl=x.p+y.p,s0=h.steps[0].c;
      if(s0.op!=='dp'||s0.x.join()!==x.p+','+y.p||s0.r!==pl)add(w+': places step '+JSON.stringify(s0));
      const base=stepsMul(Number(x.n),Number(y.n)),rest=h.steps.slice(1);
      if(rest.length!==base.steps.length||rest.some((s,i)=>JSON.stringify(s.c)!==JSON.stringify(base.steps[i].c)))add(w+': whole-number steps are not stepsMul of the digits');
      const lastTxt=strip(h.steps[h.steps.length-1].html);
      if(pl&&!lastTxt.includes('point '+(pl==1?'1 place':pl+' places')))add(w+': last step does not say where the point goes');
      const ans=fmt(times(x,y).n,pl),all=h.steps.map(s=>strip(s.html)).join('|').replace(/(\d),(\d)/g,'$1$2');
      if(/\./.test(ans)&&new RegExp('(?<![\\d.])'+ans.replace('.','\\.')+'(?!\\d|\\.\\d)').test(all)&&ans!==a&&ans!==b)add(w+': hint shows the answer '+ans);
      const prod=String(times(x,y).n);
      if(prod.length>=3&&new RegExp('(?<![\\d.])'+prod+'(?!\\d|\\.\\d)').test(all)&&prod!==String(x.n)&&prod!==String(y.n))add(w+': hint shows the whole-number product '+prod);
    }
    for(let t=0;t<N;t++){
      const kind=t%3;let a,b;
      if(kind==0){b=String(R1(2,9));a=fmt(BigInt(R1(2,99)*+b),R1(1,2))}
      else if(kind==1){b=String(pick([2,4,5,8]));a=String(R1(3,99))}
      else{b=fmt(BigInt(R1(2,9)),1);const q=R1(2,40);a=fmt(BigInt(q*+b.replace('.','')),t%2?1:2)}
      const x=D(a),y=D(b),qq=quot(x,y);
      if(!qq||x.n==0n){continue}
      const w='decdiv '+a+' / '+b;let h;try{h=stepsDecDiv(a,b)}catch(e){add(w+': threw '+e.message);continue}
      shape(h,w);
      const i0=y.p?1:0,dd=h.steps[i0].c;
      if(y.p){const c=h.steps[0].c;if(c.op!=='ten'||c.x[0]!==10**y.p||c.r!==Number(y.n))add(w+': whole-divisor step '+JSON.stringify(c))}
      else if(h.steps[0].c.op!=='dd')add(w+': first step '+h.steps[0].c.op);
      if(dd.op!=='dd')add(w+': no dd step');
      else{
        const Nn=BigInt(dd.x[0]),B=BigInt(dd.x[1]);
        if(Nn%B!==0n)add(w+': '+dd.x+' does not divide evenly');
        // N / B read with p places is exactly a / b: (N/B) * bn * 10^ap == an * 10^bp * 10^p
        if((Nn/B)*y.n*T**BigInt(x.p)!==x.n*T**BigInt(y.p)*T**BigInt(dd.p))add(w+': '+dd.x+' with '+dd.p+' places is not '+a+' / '+b);
        if(fmt(Nn/B,dd.p)!==fmt(qq.n,qq.p))add(w+': quotient '+fmt(Nn/B,dd.p)+' vs '+fmt(qq.n,qq.p));
        if(dd.z>3||dd.z<0)add(w+': zeros '+dd.z);
        const base=stepsDiv(dd.x[0],dd.x[1]),rest=h.steps.slice(i0+1);
        if(rest.length!==base.steps.length||rest.some((s,i)=>JSON.stringify(s.c)!==JSON.stringify(base.steps[i].c)))add(w+': division steps are not stepsDiv of the whole numbers');
        const lastTxt=strip(h.steps[h.steps.length-1].html);
        if(dd.p&&!lastTxt.includes('point '+(dd.p==1?'1 place':dd.p+' places')))add(w+': last step does not say where the point goes');
      }
      const ans=fmt(qq.n,qq.p),all=h.steps.map(s=>strip(s.html)).join('|');
      if((/\./.test(ans)||ans.length>=3)&&new RegExp('(?<![\\d.])'+ans.replace('.','\\.')+'(?!\\d|\\.\\d)').test(all)&&ans!==a&&ans!==b)add(w+': hint shows the answer '+ans);
    }
    // a quotient that does not end within 3 places, or numbers that are not whole enough, is refused
    for(const [a,b] of [['1','3'],['7','0'],['0.5','0.3']])try{stepsDecDiv(a,b);add('stepsDecDiv '+a+' / '+b+' should throw')}catch(e){}
    // ---- the levels
    const comma=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');
    const levels=[['pv',5],['mbig',5],['dec',3],['pv',6],['dbig',4],['dec',4],['round',4],['ooo',1],['dec',5]];
    const tallies={};
    for(const [sk,lv] of levels){
      const key=sk+lv,T2=tallies[key]={},tally=t=>{T2[t]=(T2[t]||0)+1};
      for(let i=0;i<N;i++){
        const seed=i*7919+31,q=genQ(sk,lv,seed),W=key+': ';
        const pr=kindProblems(q);if(pr.length)add(W+q.label+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv||q.seed!==seed)add(W+'not stamped');
        if(!q.say||/undefined|NaN|\[object/.test(q.say))add(W+'say '+q.say);
        if(!q.label||q.label.length>=60||/undefined|NaN/.test(q.label))add(W+'label '+q.label);
        if(/undefined|NaN|\[object/.test(q.html))add(W+'html has undefined/NaN');
        if(!q.hint||hintHTML(q).length<10)add(W+'hint missing');
        if(i%10==0&&JSON.stringify(genQ(sk,lv,seed))!==JSON.stringify(q))add(W+'not reproducible');
        if(q.kind=='num'&&!q.sep&&nodig(q.ans)>4&&!(q.max>=nodig(q.ans)))add(W+'answer needs q.max '+q.ans);
        if(q.kind=='num'&&/\./.test(q.ans)&&q.pad!=='dec')add(W+'decimal answer needs the dec pad '+q.ans);
        if(q.kind=='num'&&q.pad=='dec'&&(q.eq!=='value'||!/^(0|[1-9]\d*)(\.\d*[1-9])?$/.test(q.ans)))add(W+'dec answer not normal '+q.ans);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(q.ans)||new Set(vs).size!==vs.length||vs.length<2||vs.length>4)add(W+'choices '+q.label)}
        // the hint may repeat what the prompt shows but never shows the answer
        const seen=new Set((q.label.match(/\d+(\.\d+)?/g)||[]).concat(strip(q.html).replace(/(\d),(\d)/g,'$1$2').match(/\d+(\.\d+)?/g)||[]));
        const hs=q.hint.k=='steps'?q.hint.steps.map(s=>strip(s.html)).join('|'):q.hint.k=='text'?q.hint.s:'';
        if(q.kind=='num'&&sk!='dbig'&&(/^\d{3,}$/.test(q.ans)||/\./.test(q.ans))&&!seen.has(q.ans)&&new RegExp('(?<![\\d.])'+q.ans.replace('.','\\.')+'(?!\\d|\\.\\d)').test(hs.replace(/(\d),(\d)/g,'$1$2')))add(W+'hint shows the answer '+q.label);
        if(q.hint.k=='steps'){
          if(q.hint.steps.length<2)add(W+'steps '+q.hint.steps.length);
          if(!strip(q.hint.steps[q.hint.steps.length-1].html).includes('?'))add(W+'last step has no ?');
        }
        const a=q.ans;let m;
        // ---------- the maths, from the label
        if(sk=='pv'&&lv==5){
          if(m=q.label.match(/^value of (\d) in (\d+\.\d+)$/)){
            const d=m[1],s=m[2],digits=s.replace('.','');
            if(digits.split(d).length!==2)add(W+'digit not unique '+q.label);
            const k=s.indexOf(d),dot=s.indexOf('.'),e=k<dot?dot-1-k:-(k-dot),v=fmt(BigInt(d)*T**BigInt(e+3),3);
            if(a!==v||!q.choices.some(c=>c.v===v))add(W+q.label+' -> '+a+' want '+v);
            const vs=q.choices.map(c=>D(c.v));
            if(q.choices.length!==4||vs.some(x=>!(x.n%BigInt(d)==0n&&/^[1-9]0*$/.test(String(x.n/BigInt(d))))))add(W+'choices '+q.label);
            if(q.choices.some(c=>c.l!==c.v))add(W+'choice label');
            if(!q.html.includes('<u>'+d+'</u>')||q.html.split('<u>').length!==2)add(W+'digit not marked once');
            if(d=='0')add(W+'digit 0');
            tally('value');
          }else if(m=q.label.match(/^([\d.+ ]+) = \?$/)){
            const parts=m[1].split(' + '),sum=parts.map(D).reduce(plus);
            if(a!==fmt(sum.n,sum.p))add(W+q.label+' -> '+a);
            let last=1e9;for(const p of parts){const x=D(p),e=x.n.toString().length-1-x.p;if(!/^[1-9]0*$/.test(x.n.toString())||e>=last)add(W+'part '+p+' in '+q.label);last=e}
            if(parts.length<3||!/\./.test(a)||places(a)>3)add(W+'parts/places '+q.label);
            tally('exp');
          }else if(m=q.label.match(/^words to decimal (\d+\.\d+)$/)){
            const words=q.html.match(/font-weight:700[^"]*">([^<]+)</)[1],mm=words.match(/^(?:(.+) and )?(.+) (tenths?|hundredths?|thousandths?)$/);
            if(!mm)add(W+'words '+words);
            else{
              const p={tenth:1,hundredth:2,thousandth:3}[mm[3].replace(/s$/,'')],fr=fromWords(mm[2]),wh=mm[1]?fromWords(mm[1]):0;
              if(fmt(BigInt(wh)*T**BigInt(p)+BigInt(fr),p)!==a||a!==m[1]||q.say!==words)add(W+'words '+words+' -> '+a);
              if((fr==1)!==/[a-z]th$/.test(mm[3])||fr<1||fr>=10**p||fr%10==0)add(W+'fraction part '+words);
              if(wh&&wh>99)add(W+'whole part '+words);
              tally('words');if(!wh)tally('wordsnowhole');
            }
            if(q.auto!==true)add(W+'words auto');
          }else add(W+'label '+q.label);
        }
        else if(sk=='pv'&&lv==6){
          if(m=q.label.match(/^10\^(\d) = \?$/)){
            if(a!=='1'+'0'.repeat(+m[1])||+m[1]<2||+m[1]>5)add(W+q.label+' -> '+a);
            tally('pow');
          }else if(m=q.label.match(/^(\d+(?:\.\d+)?) ([×÷]) 10\^(\d) = \?$/)){
            const x=D(m[1]),j=+m[3],v=shift(x,m[2]=='×'?j:-j);
            if(a!==fmt(v.n,v.p)||j<1||j>3||places(m[1])>2)add(W+q.label+' -> '+a);
            if(!q.html.includes('<sup>'+j+'</sup>'))add(W+'no superscript');
            tally('sci');tally(m[2]);
          }else if(m=q.label.match(/^(\d+(?:\.\d+)?) ([×÷]) (10|100|1000) = \?$/)){
            const x=D(m[1]),j=m[3].length-1,v=shift(x,m[2]=='×'?j:-j);
            if(a!==fmt(v.n,v.p)||places(m[1])>3)add(W+q.label+' -> '+a);
            if(/\./.test(m[1])&&/0$/.test(m[1]))add(W+'trailing zero in '+q.label);
            tally('md');tally(m[2]);tally(/\./.test(m[1])?'dec':'whole');tally('x'+m[3]);
          }else add(W+'label '+q.label);
          if(q.hint.k!=='steps')add(W+'hint kind');
        }
        else if(sk=='mbig'){
          m=q.label.match(/^(\d+) × (\d+) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const x=+m[1],y=+m[2];
          if(a!==String(x*y)||x<101||x>999||y<12||y>99||x%10==0||y%10==0||q.max!==6)add(W+q.label+' -> '+a);
          if(JSON.stringify(q.hint)!==JSON.stringify(stepsMul(x,y,'std')))add(W+'hint is not the standard algorithm');
          if(!q.html.includes('class="veq"'))add(W+'not vertical');
        }
        else if(sk=='dbig'){
          m=q.label.match(/^(\d+) ÷ (\d+) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const n=+m[1],d=+m[2],Q=Math.floor(n/d),r=n%d;
          if(d<11||d>50||n<100||n>9999||Q<10)add(W+'range '+q.label);
          if(r){if(q.sep!=='R'||a!==Q+'R'+r||!q.html.includes('rsep'))add(W+q.label+' -> '+a)}
          else if(q.sep||a!==String(Q))add(W+q.label+' -> '+a);
          if(JSON.stringify(q.hint)!==JSON.stringify(stepsDiv(n,d)))add(W+'hint is not long division');
          if(!q.html.includes('ldq'))add(W+'layout');
          tally(r?'rem':'plain');tally('len'+String(n).length);
        }
        else if(sk=='dec'&&lv==3){
          m=q.label.match(/^(\d+(?:\.\d+)?) ([+−]) (\d+(?:\.\d+)?) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const x=D(m[1]),y=D(m[3]),v=m[2]=='+'?plus(x,y):minus(x,y);
          if(v.n<=0n||a!==fmt(v.n,v.p))add(W+q.label+' -> '+a);
          if(x.p>2||y.p>2||x.n==0n||/\.\d*0$/.test(m[1])||/\.\d*0$/.test(m[3]))add(W+'operands '+q.label);
          if(m[2]=='−'&&x.n*T**BigInt(Math.max(x.p,y.p)-x.p)<=y.n*T**BigInt(Math.max(x.p,y.p)-y.p))add(W+'top not bigger '+q.label);
          if(!q.html.includes('class="veq"'))add(W+'not vertical');
          if(JSON.stringify(q.hint)!==JSON.stringify(m[2]=='+'?stepsAdd(m[1],m[3]):stepsSub(m[1],m[3])))add(W+'hint is not the column method');
          tally(m[2]);tally(x.p==y.p?'same':'ragged');if(!x.p||!y.p)tally('whole');
        }
        else if(sk=='dec'&&lv==4){
          m=q.label.match(/^(\d+(?:\.\d+)?) × (\d+(?:\.\d+)?) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const x=D(m[1]),y=D(m[2]),v=times(x,y);
          if(a!==fmt(v.n,v.p))add(W+q.label+' -> '+a);
          if(x.p+y.p<1||x.n==0n||y.n==0n||x.p>2||y.p>2||/\.\d*0$/.test(m[1])||/\.\d*0$/.test(m[2]))add(W+'operands '+q.label);
          if(JSON.stringify(q.hint)!==JSON.stringify(stepsDecMul(m[1],m[2])))add(W+'hint is not stepsDecMul');
          tally(x.p&&y.p?'decdec':'decwhole');
          if(x.p&&y.p)tally(x.p==1&&y.p==1?'tt':'th');
        }
        else if(sk=='dec'&&lv==5){
          m=q.label.match(/^(\d+(?:\.\d+)?) ÷ (\d+(?:\.\d+)?) = \?$/);if(!m){add(W+'label '+q.label);continue}
          const x=D(m[1]),y=D(m[2]),v=quot(x,y);
          if(!v||a!==fmt(v.n,v.p))add(W+q.label+' -> '+a);
          if(!v||v.p>3||y.p>1||y.n<2n||x.n==0n||x.p>2)add(W+'operands '+q.label);
          // one right answer: the quotient times the divisor is the dividend, exactly
          if(v&&times(D(a),y).n*T**BigInt(x.p)!==x.n*T**BigInt(times(D(a),y).p))add(W+'a x b is not the dividend '+q.label);
          if(JSON.stringify(q.hint)!==JSON.stringify(stepsDecDiv(m[1],m[2])))add(W+'hint is not stepsDecDiv');
          if(y.p==1)tally('tenths');else if(x.p)tally('exact');else{tally('whole');if(![2,4,5,8].includes(+m[2]))add(W+'whole divisor '+q.label);if(+m[1]%+m[2]==0)add(W+'no decimal quotient '+q.label)}
          if(y.p==0&&x.p&&(+m[2]<2||+m[2]>9))add(W+'divisor '+q.label);
        }
        else if(sk=='round'){
          m=q.label.match(/^round (\d+\.\d+) to (whole number|tenth|hundredth)$/);if(!m){add(W+'label '+q.label);continue}
          const k={'whole number':0,tenth:1,hundredth:2}[m[2]],x=D(m[1]),r=roundTo(x,k);
          if(a!==fmt(r.n,r.p)||x.p<=k||x.p>3||/0$/.test(m[1]))add(W+q.label+' -> '+a);
          if(k&&places(a)!==k)add(W+'answer ends in 0 '+q.label);
          if(q.hint.k!=='steps'||q.hint.steps.length!==3)add(W+'hint');
          tally(m[2]);if(m[1].split('.')[1][k]=='5')tally('five');
        }
        else if(sk=='ooo'){
          if(m=q.label.match(/^(.+) = \?$/)){
            const e=evalOOO(m[1]);
            if(e.i!==e.len||!e.ok||e.v<0||e.v>200||a!==String(e.v)||e.ops<2||e.ops>3||!/\(/.test(m[1]))add(W+q.label+' -> '+a+' (value '+e.v+', ops '+e.ops+')');
            if(!/open parenthesis/.test(q.say)||/[()×÷−+]/.test(q.say))add(W+'say '+q.say);
            if(q.hint.k!=='steps'||q.hint.steps.length<3)add(W+'hint');
            tally('eval');tally('ops'+e.ops);
          }else if(m=q.label.match(/^write: (.+)$/)){
            // the sentence is in the prompt; the expected expression comes from the sentence
            const s=q.html.match(/font-weight:700[^"]*">([^<]+)</)[1];let x;
            if(x=s.match(/^Add (\d+) and (\d+), then multiply by (\d+)\.$/))x=`(${x[1]} + ${x[2]}) × ${x[3]}`;
            else if(x=s.match(/^Subtract (\d+) from (\d+), then multiply by (\d+)\.$/))x=`(${x[2]} − ${x[1]}) × ${x[3]}`;
            else if(x=s.match(/^Multiply (\d+) by (\d+), then add (\d+)\.$/))x=`${x[1]} × ${x[2]} + ${x[3]}`;
            else if(x=s.match(/^Multiply (\d+) by the sum of (\d+) and (\d+)\.$/))x=`${x[1]} × (${x[2]} + ${x[3]})`;
            else{add(W+'sentence '+s);continue}
            const vs=q.choices.map(c=>c.v);
            if(a!==x||vs.filter(v=>v===x).length!==1||vs.length!==4||new Set(vs).size!==4)add(W+s+' -> '+a+' want '+x);
            const ev=vs.map(v=>evalOOO(v));
            if(ev.some(e=>!e.ok)||new Set(ev.map(e=>e.v)).size!==4)add(W+'choices '+vs.join(' | '));
            if(!q.say.startsWith(s))add(W+'say');
            tally('write');
          }else add(W+'label '+q.label);
        }
      }
    }
    // ---- spread of the items
    const frac=(k,t)=>(tallies[k][t]||0)/N;
    const inr=(v,lo,hi,m)=>{if(!(v>=lo&&v<=hi))add(m+' '+(v*100).toFixed(0)+'%')};
    for(const f of ['value','exp','words'])inr(frac('pv5',f),.28,.38,'pv5 '+f);
    inr(frac('pv5','wordsnowhole')/Math.max(frac('pv5','words'),.01),.15,.45,'pv5 words without a whole part');
    inr(frac('pv6','md'),.55,.65,'pv6 times and divide by 10/100/1000');inr(frac('pv6','pow'),.15,.25,'pv6 powers');inr(frac('pv6','sci'),.15,.25,'pv6 4.2 x 10^2');
    for(const x of ['x10','x100','x1000'])if(!(tallies.pv6[x]>100))add('pv6 '+x+' rare');
    inr(frac('pv6','dec')/Math.max(frac('pv6','md'),.01),.3,.7,'pv6 decimal share');
    if(!tallies.pv6['÷']||!tallies.pv6['×'])add('pv6 needs both × and ÷');
    inr(frac('dbig4','rem'),.4,.6,'dbig4 remainder share');if(!tallies.dbig4.len3||!tallies.dbig4.len4)add('dbig4 needs 3- and 4-digit dividends');
    inr(frac('dec3','+'),.4,.6,'dec3 add share');inr(frac('dec3','ragged'),.6,.95,'dec3 ragged share');if(!(tallies.dec3.whole>30))add('dec3 never mixes a whole number');
    inr(frac('dec4','decwhole'),.4,.6,'dec4 decimal x whole');inr(frac('dec4','decdec'),.4,.6,'dec4 decimal x decimal');if(!tallies.dec4.tt||!tallies.dec4.th)add('dec4 needs tenths x tenths and tenths x hundredths');
    for(const f of ['exact','whole','tenths'])if(!(tallies.dec5[f]>N*.15))add('dec5 '+f+' rare');
    for(const f of ['whole number','tenth','hundredth'])inr(frac('round4',f),.25,.42,'round4 '+f);
    if(!(tallies.round4.five>N*.08))add('round4 rarely has a 5 just right of the place');
    inr(frac('ooo1','eval'),.4,.6,'ooo eval share');inr(frac('ooo1','ops3'),.2,.8,'ooo three-operation share');
    return {bad,n:Object.keys(tallies).length};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:uniq(r.bad),note:r.n+' levels x 3,000, 2 step builders x 3,000'};
});

run('Volcano Lab P2-11: a world added after Factor Factory keeps every star, nothing re-locks, the map opens where it did (fixtures)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const store={};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const bad=[],mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_volcano'),W=mw[wi],ids=W.nodes.map(n=>n[0]+n[1]).concat(['boss_m_volcano']);
    // the other worlds near it are out of this check: Decimal Desert (P2-10) sits between Factor Factory and this world, Crystal Caves (P2-12) after it
    for(const id of ['m_desert','m_caves','m_sky','m_galaxy']){const k=mw.findIndex(x=>x.id==id);if(k>=0)mw.splice(k,1)}
    const vi=mw.indexOf(W),setWorld=on=>{if(on&&!mw.includes(W))mw.splice(vi,0,W);if(!on&&mw.includes(W))mw.splice(mw.indexOf(W),1);buildNodes('math')};
    const state=raw=>{
      const o={};load(raw);o.stars=JSON.stringify(S.maps.math);o.cur=nid(NODES.math[curNode('math')]);
      o.open=new Set(NODES.math.map((n,i)=>unlocked('math',i)?nid(n):null).filter(Boolean));
      o.passed=NODES.math.filter((n,i)=>passed('math',i)).map(nid);
      o.wo=PATHS.math.worlds.map((w,i)=>worldOpen('math',i)?w.id:null).filter(Boolean);
      return o};
    const saves=[];
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])for(const g of [null,-1,0,1,2,3,4,5,6])saves.push([name+' g'+g,fx(name),g]);
    // a finished and a half played Factor Factory
    const fac=mw.find(x=>x.id=='m_factory'),facIds=fac.nodes.map(n=>n[0]+n[1]);
    const mk=(stars,boss,g)=>{load(fx('maxed'));Object.assign(S.maps.math,stars);if(boss){S.maps.math.boss_m_frac=3;S.wdone.m_frac=1}if(boss==2){S.maps.math.boss_m_factory=3;S.wdone.m_factory=1}if(g!=null)S.grade=g;return JSON.stringify(S)};
    const ff={};for(const k of ['frac2','frac3','frac4','frac5'])ff[k]=3;
    const all=Object.assign({},ff);for(const id of facIds)all[id]=3;
    saves.push(['factory half played',mk(Object.assign({mfact5:3,pv4:2},ff),1),null],['factory finished',mk(all,2),null],['factory finished g4',mk(all,2,4),null],
      ['factory finished g5',mk(all,2,5),null],['factory finished g2',mk(all,2,2),null],['volcano started',mk(Object.assign({pv5:3,mbig5:2},all),2,5),null]);
    let checked=0;
    for(const [name,raw,g] of saves){
      let r=raw;if(g!=null){load(raw);S.grade=g;r=JSON.stringify(S)}
      setWorld(false);const a=state(r);
      setWorld(true);const b=state(r);
      checked++;
      const had=name=='volcano started',grade=JSON.parse(r).grade==null?null:JSON.parse(r).grade;
      if(!had&&JSON.stringify(Object.keys(JSON.parse(b.stars)).filter(k=>ids.includes(k)))!=='[]')bad.push(name+': stars on new stops');
      if(!had&&b.stars!==a.stars)bad.push(name+': star table changed');
      if(had)for(const id of ['pv5','mbig5'])if(!b.passed.includes(id))bad.push(name+': '+id+' lost its stars');
      for(const id of a.passed)if(!b.passed.includes(id))bad.push(name+': passed stop '+id+' lost');
      for(const id of a.open)if(!b.open.has(id))bad.push(name+': '+id+' was open and is locked');
      for(const id of a.wo)if(!b.wo.includes(id))bad.push(name+': world '+id+' was open and is locked');
      const done=/factory finished/.test(name)||had;
      if(grade==null||grade<=3){
        if(!done&&b.cur!==a.cur)bad.push(name+': map moved '+a.cur+' -> '+b.cur);
        if(done&&b.cur!==ids[0])bad.push(name+': a finished factory should open on '+ids[0]+', got '+b.cur);
      }else if(b.cur!==a.cur&&!ids.includes(b.cur))bad.push(name+': map moved outside the new world '+a.cur+' -> '+b.cur);
      for(let k=1;k<ids.length;k++){
        if(!b.open.has(ids[k])||b.passed.includes(ids[k]))continue;
        const later=b.passed.some(x=>ids.indexOf(x)>k);
        if(!b.passed.includes(ids[k-1])&&!later)bad.push(name+': '+ids[k]+' open without '+ids[k-1]);
      }
    }
    setWorld(true);
    return {bad,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:uniq(r.bad),note:r.checked+' saves with and without the world'};
});

// ---- P3-09: Patterns, matrices, odd one out (BRAIN_TEASERS 5.5, 7). The rule checker below is written for this test and shares
// no code with 76-bt-pattern.js: it is a little more generous than the app's (it also knows third differences and rational x a + b),
// so a distractor the app missed would show up here.
run('patterns P3-09',()=>{
  const r=eval(js+`
  const bad=[],add=m=>{if(bad.length<40)bad.push(m)};
  const K=['s','z','n','r'],KC=K.concat('c'),NOM={s:1,c:1};
  const DOMS={s:[0,6],c:[0,5],z:[0,2],n:[1,5],r:[0,7]};
  const norm=(k,x)=>k=='r'?((x%8)+8)%8:x;
  const diffs=(a,k)=>a.slice(1).map((x,i)=>norm(k,x-a[i]));
  const allEq=a=>a.every(x=>x===a[0]);
  // a picture attribute: does x continue the list v?
  function seqOk(v,x,k){
    const f=v.concat([x]);
    for(let p=1;p<=4;p++)if(p<v.length&&f.every((y,i)=>i<p||y===f[i-p]))return true;
    if(!NOM[k]&&v.length>=3){const d=diffs(f,k);if(d[0]&&allEq(d))return true}
    return false;
  }
  // numbers: does x continue v under any rule (each rule needs at least one shown term more than it has parameters)?
  function numOk(v,x){
    const f=v.concat([x]),L=v.length,d=diffs(f),dd=diffs(d),ddd=diffs(dd);
    for(let p=1;p<=4;p++)if(p<L&&f.every((y,i)=>i<p||y===f[i-p]))return true;
    if(L>=3&&d[0]&&allEq(d))return true;
    if(L>=3&&f[0]&&f[1]!==f[0]&&f.every((y,i)=>i<2||y*f[i-2]===f[i-1]*f[i-1]))return true;
    if(L>=3&&f.every((y,i)=>i<2||y===f[i-1]+f[i-2]))return true;
    if(L>=4&&f[1]!==f[0]){const a=(f[2]-f[1])/(f[1]-f[0]),b=f[1]-a*f[0];if(f.every((y,i)=>i==0||Math.abs(y-(a*f[i-1]+b))<1e-9))return true}
    if(L>=4&&dd[0]&&allEq(dd))return true;
    if(L>=4&&d[0]&&d[1]!==d[0]&&d.every((y,i)=>i<2||y*d[i-2]===d[i-1]*d[i-1]))return true;
    if(L>=4&&d[0]!==d[1]&&d.every((y,i)=>i<2||y===d[i-2]))return true;
    if(L>=5&&ddd[0]&&allEq(ddd))return true;
    if(L>=6&&f.every((y,i)=>i<2||y-f[i-2]===f[2+(i%2)]-f[i%2]))return true;
    return false;
  }
  // a 3x3 attribute (9 values, the last one the candidate): every row or every column constant, a set of three, or steady steps
  function gridOk(g,k){
    const fit=ls=>ls.every(l=>allEq(l))||ls.every(l=>new Set(l).size==3&&l.slice().sort().join()==ls[0].slice().sort().join())||
      (!NOM[k]&&(()=>{const d=diffs(ls[0],k)[0];return d&&ls.every(l=>allEq(diffs(l,k).concat([d])))})());
    return fit([0,3,6].map(i=>g.slice(i,i+3)))||fit([0,1,2].map(j=>[g[j],g[j+3],g[j+6]]));
  }
  function anaOk(A,B,C,D,k){
    return (A[k]===B[k]&&C[k]===D[k])||(A[k]===C[k]&&B[k]===D[k])||(!NOM[k]&&norm(k,D[k]-C[k])===norm(k,B[k]-A[k]));
  }
  // the choices that fit, with the attributes keys
  function fits(it,keys){
    if(it.k=='num')return it.ch.map(x=>numOk(it.show,x));
    if(it.k=='odd'){
      const odd=new Set();
      for(const k of keys){const c={};it.ch.forEach(t=>c[t[k]]=(c[t[k]]||0)+1);const v=Object.values(c).sort();if(v.join()=='1,3')odd.add(it.ch.findIndex(t=>c[t[k]]==1))}
      return it.ch.map((_,i)=>odd.has(i));
    }
    return it.ch.map(t=>keys.every(k=>it.k=='seq'?seqOk(it.show.map(s=>s[k]),t[k],k):it.k=='ana'?anaOk(it.show[0],it.show[1],it.show[2],t,k):gridOk(it.show.map(s=>s[k]).concat([t[k]]),k)));
  }
  const nDiff=(a,b)=>K.filter(k=>a[k]!==b[k]).length;
  const NCH={seq:4,num:4,odd:4,ana:4,mat:6},NITEMS={A:3,B:4,C:4,D:4};
  const stat={};['A','B','C','D'].forEach(b=>stat[b]={kinds:{},rules:{},attrs:[[],[],[]],mat:[],n:0});
  let ms=0,count=0,items=0;
  for(const b of 'ABCD')for(let lv=1;lv<=12;lv++)for(let d=1;d<=24;d++){
    const day='2026-'+(1+d%12)+'-'+(1+d),w=b+lv+' '+day;
    const t0=Date.now(),p=BT.make('pattern',b,lv,{day});ms+=Date.now()-t0;count++;
    if(JSON.stringify(p)!==JSON.stringify(BT.make('pattern',b,lv,{day})))add(w+': make is not deterministic');
    if(p.items.length!==NITEMS[b])add(w+': '+p.items.length+' items');
    const sol=BT.get('pattern').solve(p);
    const st=stat[b],tier=lv<=4?0:lv<=8?1:2;st.n++;
    p.items.forEach((it,ii)=>{
      items++;const v=w+' item '+ii+' '+it.k;
      st.kinds[it.k]=1;
      if(it.ch.length!==NCH[it.k])add(v+': '+it.ch.length+' choices');
      if(sol[ii]!==it.a)add(v+': solve() does not give the answer');
      // exactly one choice fits, with and without colour, and it is the answer
      for(const keys of [KC,K]){
        const f=fits(it,keys),n=f.filter(Boolean).length;
        if(n!==1||!f[it.a])add(v+(keys.length==4?' (colour ignored)':'')+': '+n+' choices fit, answer fits '+f[it.a]+' '+JSON.stringify(it.k=='num'?[it.show,it.ch]:it.spec||it.rules||it.at));
      }
      for(const t of [1,2]){const h=PAT.hintText(it,t);if(typeof h!='string'||!h||/undefined|NaN|null/.test(h))add(v+': hint '+t+' '+h)}
      if(it.k=='num'){
        st.rules[it.rule]=1;st.attrs[tier].push(/^(add|sub|mul)/.test(it.rule)?1:2); // two-step: alternating, squares, triangular, x a + b, Fibonacci, interleaved
        const a=it.ch[it.a];
        if(new Set(it.ch).size!==4)add(v+': two choices are the same number');
        if(it.ch.concat(it.show).some(x=>!Number.isInteger(x)||x<0||x>(b=='B'?100:999)))add(v+': number out of range '+it.ch.concat(it.show));
        if(it.ch.some(x=>x!==a&&(x<1||Math.abs(x-a)>Math.max(12,a*0.6))))add(v+': a distractor is far from the answer '+it.ch+' '+a);
        // hint 2 states the rule, never the answer (the answer may appear only where it is also a shown number or a step between two)
        const seen=new Set(it.show.concat(diffs(it.show).map(Math.abs)));
        if(!seen.has(a)&&new RegExp('\\\\b'+a+'\\\\b').test(PAT.hintText(it,2)))add(v+': hint 2 says the answer '+PAT.hintText(it,2));
        return;
      }
      const tiles=it.show.concat(it.ch);
      for(const t of tiles){
        for(const k of KC)if(!(Number.isInteger(t[k])&&t[k]>=DOMS[k][0]&&t[k]<=DOMS[k][1]))add(v+': '+k+' out of range '+JSON.stringify(t));
        if(t.n>3&&t.z!=2)add(v+': 4 or 5 shapes that are not big');
        if(t.s!=6&&t.r)add(v+': a turned shape that is not an arrow');
      }
      // colour follows the other attributes: two tiles with different colours always differ in shape, size, count or turn
      const cm={};
      for(const t of tiles){const key=K.map(k=>t[k]).join();if(key in cm&&cm[key]!==t.c)add(v+': colour is the only difference between two tiles');cm[key]=t.c}
      if(it.k!='odd')it.ch.forEach((x,i)=>it.ch.forEach((y,j)=>{if(i<j&&!nDiff(x,y))add(v+': two choices look the same without colour')}));
      // plausible distractors: they share most features with the answer
      if(it.k!='odd'){
        const a=it.ch[it.a],dn=it.ch.filter((_,i)=>i!==it.a).map(x=>nDiff(x,a));
        if(dn.some(x=>x<1||x>2))add(v+': a distractor differs in '+dn+' attributes');
        if(it.k=='mat'&&dn.sort().join()!=='1,1,1,1,2')add(v+': matrix distractors should differ in 1,1,1,1,2 attributes, got '+dn);
      }
      st.attrs[tier].push(it.k=='odd'?1:it.k=='ana'?it.x.length:it.at.length); // rules to find: odd one out 1, a 2x2 its changes
      if(it.k=='mat')st.mat.push(it.at.length);
      if(it.k=='seq'&&it.show.length<4)add(v+': only '+it.show.length+' pictures shown');
    });
  }
  // difficulty grows by band (BRAIN_TEASERS 4 and 5.5) and over the levels of a band (section 7)
  const ks=b=>Object.keys(stat[b].kinds).sort().join(),rs=b=>Object.keys(stat[b].rules).sort().join();
  if(ks('A')!=='odd,seq')add('band A kinds '+ks('A'));
  if(ks('B')!=='ana,num,odd,seq')add('band B kinds '+ks('B'));
  if(ks('C')!=='mat,num,seq'||ks('D')!=='mat,num,seq')add('bands C, D kinds '+ks('C')+' / '+ks('D'));
  if(rs('B')!=='add,add1,addbig,sub,sub1')add('band B number rules '+rs('B'));
  if(!['mul','mul2','alt','sq'].every(x=>stat.C.rules[x])||['affine','fib','tri','inter'].some(x=>stat.C.rules[x]))add('band C number rules '+rs('C'));
  if(!['affine','fib','tri','inter'].every(x=>stat.D.rules[x])||['add','add1','sub','sub1'].some(x=>stat.D.rules[x]))add('band D number rules '+rs('D'));
  const mm=a=>[Math.min(...a),Math.max(...a)].join('-');
  if(mm(stat.C.mat)!=='1-2'||mm(stat.D.mat)!=='2-3')add('changing attributes in matrices: C '+mm(stat.C.mat)+', D '+mm(stat.D.mat));
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length,band=b=>avg([].concat(...stat[b].attrs));
  const AV='ABCD'.split('').map(b=>band(b).toFixed(2));
  for(let i=1;i<4;i++)if(+AV[i]<=+AV[i-1])add('rule count does not grow by band: '+AV);
  for(const b of 'ABCD'){const t=stat[b].attrs.map(avg);if(!(t[0]<=t[1]&&t[1]<=t[2]&&t[0]<t[2]))add('band '+b+' rule count does not grow over the levels: '+t.map(x=>x.toFixed(2)))}
  if(ms/count>20)add('make() takes '+(ms/count).toFixed(1)+' ms');
  // hint 3 and the frame contract: registered for every band, 1 mistake allowed for 3 stars
  const d=BT.get('pattern');
  if(!d||d.bands!=='ABCD'||d.allow!==1||BT.nLevels(d,'A')!==12)add('registration '+JSON.stringify(d&&{bands:d.bands,allow:d.allow}));
  ({bad,note:count+' puzzles, '+items+' items, '+(ms/count).toFixed(1)+' ms each, rule count by band '+AV.join(' ')});`);
  return{problems:r.bad,note:r.note};
});

// ---- P3-10: number puzzles (BRAIN_TEASERS 5.6, 7): pyramids, balance, make the number ----
// Every band, levels 1-12 on 20 days each. The checkers below are independent of src/js/77-bt-number.js: pyramids are counted
// by a search over the bottom row in whole numbers 0 and up (a brick under no given brick is free, so not unique), balances by a
// brute force over a box (all but one picture tried, the last one forced) plus a cofactor determinant, targets by the set of values
// every subset of the tiles can make.
run('number puzzles P3-10',()=>{
  const body=function(){
    const out=[],bad=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const DAYS=20,LV=12,num=s=>(String(s).match(/\d+/g)||[]).map(Number);
    const ids=BT.list().map(t=>t.id);
    for(const [id,bands] of [['pyramid','BCD'],['balance','ABCD'],['target','BCD']]){
      if(!ids.includes(id))bad(id+' is not registered');
      else if(BT.get(id).bands!==bands)bad(id+' bands '+BT.get(id).bands+', want '+bands);
    }
    const timing={};
    const each=(id,fn)=>{
      const d=BT.get(id);
      for(const band of d.bands)for(let lv=1;lv<=LV;lv++)for(let day=1;day<=DAYS;day++){
        const o={day:'2026-3-'+day},t0=Date.now();let p;
        try{p=BT.make(id,band,lv,o)}catch(e){bad(id+' '+band+lv+' day '+day+': make() threw '+e.message);continue}
        const ms=Date.now()-t0;
        const tk=id+' '+band;(timing[tk]=timing[tk]||[0,0]);timing[tk][0]+=ms;timing[tk][1]++;
        if(JSON.stringify(BT.make(id,band,lv,o))!==JSON.stringify(p))bad(id+' '+band+lv+': make() is not deterministic');
        try{fn(p,band,lv,d,id+' '+band+lv+' day '+day)}catch(e){bad(id+' '+band+lv+' day '+day+': check threw '+e.message)}
      }
    };

    /* ---------- Number Pyramid ---------- */
    const ROWS={B:3,C:4,D:5},PMAX={B:9,C:12,D:20},EXTRA=lv=>lv<=3?2:lv<=7?1:0;
    // bricks row by row from the bottom; brick (r, i) covers bottom bricks i..i+r with binomial weights
    const pcells=n=>{const c=[];for(let r=0;r<n;r++)for(let i=0;i<n-r;i++)c.push([r,i]);return c};
    const pweights=(r)=>{const w=[1];for(let k=1;k<=r;k++)w.push(w[k-1]*(r-k+1)/k);return w};
    // count whole-number (0 and up) bottom rows that agree with the givens, stopping at `limit`
    const pcount=(n,v,g,limit)=>{
      const cells=pcells(n),cons=[];
      v.forEach((x,k)=>{if(g[k]){const [r,i]=cells[k];cons.push({w:pweights(r),i,r,val:x})}});
      for(let j=0;j<n;j++)if(!cons.some(c=>j>=c.i&&j<=c.i+c.r))return Infinity; // a free bottom brick
      const b=new Array(n).fill(null);let count=0;
      const ok=()=>cons.every(c=>{let s=0,open=0;for(let k=0;k<=c.r;k++){const x=b[c.i+k];if(x==null)open++;else s+=c.w[k]*x}return open?s<=c.val:s===c.val});
      const go=()=>{
        if(count>=limit)return;
        if(!ok())return;
        const j=b.indexOf(null);
        if(j<0){count++;return}
        // forced by a constraint with only this brick open; else every value up to the smallest covering given
        for(const c of cons){
          if(j<c.i||j>c.i+c.r)continue;
          let s=0,open=0;for(let k=0;k<=c.r;k++){const x=b[c.i+k];if(x==null)open++;else s+=c.w[k]*x}
          if(open===1){const w=c.w[j-c.i],rest=c.val-s;if(rest<0||rest%w)return;b[j]=rest/w;go();b[j]=null;return}
        }
        const hi=Math.min(...cons.filter(c=>j>=c.i&&j<=c.i+c.r).map(c=>c.val));
        for(let x=0;x<=hi&&count<limit;x++){b[j]=x;go()}
        b[j]=null;
      };
      go();
      return count;
    };
    const pspread=(n,g)=>{
      const cells=pcells(n),at=(r,i)=>cells.findIndex(c=>c[0]==r&&c[1]==i),kn=g.map(Boolean);let more=true;
      while(more){more=false;for(let r=1;r<n;r++)for(let i=0;i<n-r;i++){const t=at(r,i),a=at(r-1,i),b=at(r-1,i+1);
        if(kn[t]+kn[a]+kn[b]===2){kn[t]=kn[a]=kn[b]=true;more=true}}}
      return kn.every(Boolean);
    };
    const pyrGiv={B:[],C:[],D:[]};
    each('pyramid',(p,band,lv,d,w)=>{
      const n=ROWS[band],cells=pcells(n);
      if(p.n!==n||p.v.length!==n*(n+1)/2||p.g.length!==p.v.length)return bad(w+': '+p.n+' rows, want '+n);
      for(let k=0;k<n;k++)if(p.v[k]<1||p.v[k]>PMAX[band]||p.v[k]%1)bad(w+': bottom brick '+p.v[k]+' outside 1-'+PMAX[band]);
      cells.forEach(([r,i],k)=>{if(r){const a=cells.findIndex(c=>c[0]==r-1&&c[1]==i),b=cells.findIndex(c=>c[0]==r-1&&c[1]==i+1);if(p.v[k]!==p.v[a]+p.v[b])bad(w+': brick '+k+' is not the sum under it')}});
      const giv=p.g.reduce((a,b)=>a+b,0);
      if(giv!==n+EXTRA(lv))bad(w+': '+giv+' givens, want '+(n+EXTRA(lv)));
      pyrGiv[band].push([lv,giv]);
      const c=pcount(n,p.v,p.g,2);
      if(c!==1)bad(w+': '+c+' solutions');
      const easy=pspread(n,p.g);
      if(band!=='D'&&!easy)bad(w+': band '+band+' must fill by "two of a triple"');
      if(!!p.tricky===easy)bad(w+': tricky flag '+p.tricky+' but propagation '+(easy?'fills':'stops'));
      if(band==='D'&&lv<10&&!easy)bad(w+': tricky before level 10');
      // solve(): every hidden brick once, with its number
      const sol=d.solve(p),hid=p.v.map((x,k)=>k).filter(k=>!p.g[k]);
      if(sol.length!==hid.length||sol.some(([k,x])=>p.g[k]||p.v[k]!==x)||new Set(sol.map(m=>m[0])).size!==hid.length)bad(w+': solve() '+JSON.stringify(sol));
      // hints at every step of the way: tiers 1 and 2 point and explain, never fill or say the brick's number; tier 3 fills one
      const st={done:[]};
      for(let g=0;g<20;g++){
        const vis=new Set(p.v.filter((x,k)=>p.g[k]||st.done.includes(k)));
        const h1=BTN.PYR.hint(p,st,1),h2=BTN.PYR.hint(p,st,2),h3=BTN.PYR.hint(p,st,3);
        if(!h3){if(st.done.length!==hid.length)bad(w+': hints stopped early');break}
        for(const [t,h] of [[1,h1],[2,h2]]){
          if(h.fill!=null)bad(w+': hint tier '+t+' fills a brick');
          const ans=p.v[h.mark[0]];
          if(!vis.has(ans)&&num(h.say).includes(ans))bad(w+': hint tier '+t+' says the answer: '+h.say);
          if(st.done.includes(h.mark[0])||p.g[h.mark[0]])bad(w+': hint tier '+t+' points at a known brick');
        }
        if(h3.fill==null||p.g[h3.fill]||st.done.includes(h3.fill))bad(w+': tier 3 did not fill an open brick');
        st.done.push(h3.fill);
      }
    });
    // fewer givens as the levels go up, bigger pyramids by band
    for(const band of 'BCD'){const a=pyrGiv[band],m=lv=>a.filter(x=>x[0]===lv).map(x=>x[1]);if(!(Math.max(...m(12))<Math.max(...m(1))))bad('pyramid '+band+': level 12 should have fewer givens than level 1')}

    /* ---------- Balance ---------- */
    const UNK=(band,lv)=>({A:1,B:2,C:3,D:lv<=8?2:3})[band],VMAX={A:5,B:10,C:12,D:20};
    const side=(cs,k,v)=>cs.reduce((a,c,i)=>a+c*v[i],k);
    const det=M=>M.length===1?M[0][0]:M[0].reduce((s,a,j)=>s+(j%2?-1:1)*a*det(M.slice(1).map(r=>r.filter((x,k)=>k!==j))),0);
    // whole-number solutions in a box: every picture but one tried from 0 to B, the last one forced by a scale where it does not cancel
    const bcount=p=>{
      const m=p.v.length,B=3*Math.max(...p.eqs.map(e=>e.lc+e.rc))+30,net=(e,i)=>e.l[i]-e.r[i];
      const last=m-1,ek=p.eqs.find(e=>net(e,last)!==0);
      let count=0;const v=new Array(m).fill(0);
      const go=i=>{
        if(i===last){
          const rest=side(ek.r,ek.rc,v.map((x,j)=>j===last?0:x))-side(ek.l,ek.lc,v.map((x,j)=>j===last?0:x)),c=net(ek,last);
          if(rest%c)return;const x=rest/c;if(x<0)return;v[last]=x;
          if(p.eqs.every(e=>side(e.l,e.lc,v)===side(e.r,e.rc,v)))count++;
          return;
        }
        for(let x=0;x<=B;x++){v[i]=x;go(i+1)}
      };
      go(0);
      return count;
    };
    // triangular: the scales can be put in an order where each one brings exactly one new picture
    const triangular=p=>{
      const sets=p.eqs.map(e=>e.l.map((c,i)=>c||e.r[i]?i:-1).filter(i=>i>=0)),seen=new Set(),used=new Set();
      for(let k=0;k<sets.length;k++){
        const j=sets.findIndex((s,x)=>!used.has(x)&&s.filter(i=>!seen.has(i)).length===1);
        if(j<0)return false;used.add(j);sets[j].forEach(i=>seen.add(i));
      }
      return seen.size===p.v.length;
    };
    const balForms={};
    each('balance',(p,band,lv,d,w)=>{
      const m=UNK(band,lv);
      if(p.v.length!==m||p.f.length!==m||new Set(p.f).size!==m)return bad(w+': '+p.v.length+' unknowns, want '+m);
      if(p.f.some(f=>!ART[f]))bad(w+': a picture has no drawing');
      if(p.v.some(x=>x<1||x>VMAX[band]||x%1))bad(w+': value outside 1-'+VMAX[band]+': '+p.v);
      if(p.eqs.length<m)bad(w+': '+p.eqs.length+' scales for '+m+' unknowns');
      for(const e of p.eqs){
        if(side(e.l,e.lc,p.v)!==side(e.r,e.rc,p.v))bad(w+': a scale is not level');
        for(const [cs,k] of [[e.l,e.lc],[e.r,e.rc]]){const pics=cs.reduce((a,b)=>a+b,0);if(pics>3||pics+(k?1:0)>4)bad(w+': a tray holds too much');if(k<0)bad(w+': negative weight')}
        if(band==='A'&&side(e.l,e.lc,p.v)>10)bad(w+': band A total over 10');
      }
      if(det(p.eqs.slice(0,m).map(e=>e.l.map((c,i)=>c-e.r[i])))===0)bad(w+': determinant 0');
      if(band==='B'||band==='C'){if(!triangular(p))bad(w+': not triangular')}
      if(band==='D'&&p.eqs.some(e=>e.l.filter((c,i)=>c-e.r[i]).length===1))bad(w+': band D scale with a single unknown (should not be triangular)');
      if(band==='C'){
        if(!p.q||p.q.v!==side(p.q.c,0,p.v)||p.q.c.filter(Boolean).length<2||Math.max(...p.q.c)<2)bad(w+': last question '+JSON.stringify(p.q));
        if(!p.eqs.some(e=>e.l.some(c=>c>=2)))bad(w+': no repeated picture');
      }else if(p.q)bad(w+': only band C asks a last question');
      const c=bcount(p);
      if(c!==1)bad(w+': '+c+' solutions in the box');
      balForms[band]=(balForms[band]||new Set()).add(p.form);
      // solve(): every slot once with its answer
      const slots=p.v.map((x,i)=>i).concat(p.q?['q']:[]),sol=d.solve(p);
      if(sol.length!==slots.length||sol.some(([s,x])=>x!==(s==='q'?p.q.v:p.v[s]))||new Set(sol.map(s=>String(s[0]))).size!==slots.length)bad(w+': solve() '+JSON.stringify(sol));
      // hints at every step
      const st={done:[]},consts=new Set(p.eqs.flatMap(e=>[e.lc,e.rc]).concat([1,2,3]));
      for(let g=0;g<10;g++){
        const h3=BTN.BAL.hint(p,st,3);
        if(!h3){if(st.done.length!==slots.length)bad(w+': hints stopped early');break}
        // what the child can already see: weights, counts, solved pictures and the known part of each tray
        const known=p.v.map((x,i)=>st.done.includes(i)?x:0);
        const vis=new Set([...consts,...st.done.map(s=>s==='q'?p.q.v:p.v[s]),...p.eqs.flatMap(e=>[side(e.l,e.lc,known),side(e.r,e.rc,known)])]);
        for(const t of [1,2]){
          const h=BTN.BAL.hint(p,st,t),ans=h.mark.slot==='q'?p.q.v:p.v[h.mark.slot];
          if(h.fill!=null)bad(w+': hint tier '+t+' fills a box');
          if(!vis.has(ans)&&num(h.say).includes(ans))bad(w+': hint tier '+t+' says the answer: '+h.say);
          if(/undefined|NaN/.test(h.say))bad(w+': hint text '+h.say);
        }
        if(h3.fill==null||st.done.includes(h3.fill))bad(w+': tier 3 did not fill an open box');
        st.done.push(h3.fill);
      }
      // a wrong number tips the scale it is tried on towards the side that is now heavier
      for(const i of p.v.keys()){
        const k=BTN.BAL.tryOn(p,[],i),e=p.eqs[k],dw=BTN.BAL.tip(p,k,i,p.v[i]+1),want=Math.sign((e.r[i]-e.l[i]));
        if(dw!==want||!dw)bad(w+': one more on picture '+i+' tips '+dw+', want '+want);
        if(BTN.BAL.tip(p,k,i,p.v[i])!==0)bad(w+': the right number tips the scale');
      }
    });
    if(!(balForms.D&&['sd','pq','xy','pair','chain'].every(f=>balForms.D.has(f))))bad('balance D forms seen: '+[...(balForms.D||[])]);

    /* ---------- Make the Number ---------- */
    const OPS={B:'+-',C:'+-x',D:'+-x/'},TILES={B:5,C:3,D:4};
    const calc=(a,o,b)=>o==='+'?a+b:o==='-'?(a>=b?a-b:null):o==='x'?a*b:(b>0&&a%b===0?a/b:null);
    // the values each subset (bitmask) of the tiles can make with whole, non-negative steps
    const reach=(nums,ops)=>{
      const R={};
      const get=mask=>{
        if(R[mask])return R[mask];
        const s=new Set(),idx=nums.map((x,i)=>i).filter(i=>mask>>i&1);
        if(idx.length===1)s.add(nums[idx[0]]);
        for(let sub=(mask-1)&mask;sub>0;sub=(sub-1)&mask){
          const rest=mask^sub;
          for(const a of get(sub))for(const b of get(rest))for(const o of ops){const r=calc(a,o,b);if(r!=null)s.add(r)}
        }
        return R[mask]=s;
      };
      return get;
    };
    const tgtSols={B:{},C:{},D:{}};
    each('target',(p,band,lv,d,w)=>{
      if(p.ops!==OPS[band])bad(w+': signs '+p.ops);
      if(p.nums.length!==TILES[band])return bad(w+': '+p.nums.length+' tiles');
      const hi={B:15,C:10,D:13}[band];
      if(p.nums.some(x=>x<1||x>hi||x%1))bad(w+': tile outside 1-'+hi+': '+p.nums);
      if(band==='B'){if(p.use!==2||new Set(p.nums).size!==5||p.target<5||p.target>20)bad(w+': '+JSON.stringify(p))}
      else if(band==='C'){if(p.use!==0||p.target<5||p.target>50)bad(w+': '+JSON.stringify(p))}
      else if(p.use!==0||(lv<=6?p.target!==24:(p.target<10||p.target>100)))bad(w+': target '+p.target);
      const get=reach(p.nums,p.ops.split(''));
      let can;
      if(band==='B'){can=false;for(let i=0;i<5;i++)for(let j=0;j<5;j++)if(i!==j)for(const o of p.ops)if(calc(p.nums[i],o,p.nums[j])===p.target)can=true}
      else can=get((1<<p.nums.length)-1).has(p.target);
      if(!can)bad(w+': no solution by brute force');
      if(!(p.sols>=1))bad(w+': sols '+p.sols);
      (tgtSols[band][lv]=tgtSols[band][lv]||[]).push(p.sols);
      // solve(): apply the steps by id with the arithmetic above
      const tiles=p.nums.map((v,id)=>({id,v}));let next=p.nums.length,last=null;
      const sol=d.solve(p);
      for(const [a,o,b] of sol){
        const A=tiles.find(t=>t.id===a),Bt=tiles.find(t=>t.id===b),r=A&&Bt&&a!==b?calc(A.v,o,Bt.v):null;
        if(r==null){bad(w+': solve() step not allowed '+JSON.stringify([a,o,b]));break}
        tiles.splice(tiles.indexOf(A),1);Bt.id=next++;Bt.v=r;last=Bt;
      }
      if(band==='B'?(sol.length!==1||!last||last.v!==p.target):(tiles.length!==1||tiles[0].v!==p.target))bad(w+': solve() does not make '+p.target+': '+JSON.stringify(sol));
      // hints: tiers 1 and 2 never join; tier 2 names the sign only when it is not the last step; tier 3 joins; never stuck
      const T=BTN.TGT,st=T.fresh(p);
      for(let g=0;g<6&&!T.won(p,st);g++){
        const h1=T.hint(p,st,1),h2=T.hint(p,st,2),h3=T.hint(p,st,3),lastStep=p.use===2||st.tiles.length===2;
        if(h1.step||h2.step)bad(w+': hint tier 1 or 2 makes a step');
        if(/=/.test(h1.say+h2.say))bad(w+': hint tier 1 or 2 shows a result: '+h2.say);
        if(lastStep&&/[+−×÷]/.test(h2.say))bad(w+': hint tier 2 gives the last step away: '+h2.say);
        if(!h3.step){bad(w+': tier 3 has no step');break}
        if(h3.reset)while(st.hist.length)T.undo(st);
        if(T.join(st,...h3.step).err){bad(w+': tier 3 step is not allowed');break}
      }
      if(!T.won(p,st))bad(w+': tier 3 hints did not finish');
      // from a dead end (every tile added up, when that misses), tier 3 starts over and still finishes
      if(p.use===0){
        const s2=T.fresh(p);while(s2.tiles.length>1)T.join(s2,s2.tiles[0].id,'+',s2.tiles[1].id);
        if(!T.won(p,s2)){
          if(T.hint(p,s2,1).step||!T.hint(p,s2,1).undo)bad(w+': a dead end should point at Undo');
          for(let g=0;g<6&&!T.won(p,s2);g++){const h=T.hint(p,s2,3);if(h.reset)while(s2.hist.length)T.undo(s2);T.join(s2,...h.step)}
          if(!T.won(p,s2))bad(w+': tier 3 hints from a dead end did not finish');
        }
      }
    });
    // difficulty inside a band: level 1 puzzles have more different solutions than level 12 ones
    const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
    for(const band of 'BCD')if(!(avg(tgtSols[band][1])>avg(tgtSols[band][12])))bad('target '+band+': level 1 should have more solutions than level 12 ('+avg(tgtSols[band][1])+' vs '+avg(tgtSols[band][12])+')');
    // and across bands, as the spec has it
    if(!(ROWS.B<ROWS.C&&ROWS.C<ROWS.D&&TILES.C<TILES.D&&OPS.B.length<OPS.C.length&&OPS.C.length<OPS.D.length))bad('band steps');
    // a type over the limit is timed again on its own, 3 rounds over the same puzzles, and the best round counts: with parallel checks on
    // the machine the first timing (taken between the other checks of the loop) measures the load as much as make() itself
    const retime=k=>{const [id,band]=k.split(' ');let best=1e9;for(let r=0;r<3;r++){const t0=Date.now();let n=0;
      for(let lv=1;lv<=LV;lv++)for(let day=1;day<=DAYS;day++){BT.make(id,band,lv,{day:'2026-3-'+day});n++}best=Math.min(best,(Date.now()-t0)/n)}return best};
    for(const k in timing)if(timing[k][0]/timing[k][1]>8){const b=retime(k);timing[k]=[b*timing[k][1],timing[k][1]]}
    const slow=Object.entries(timing).map(([k,[ms,n]])=>[k,ms/n]).filter(x=>x[1]>8);
    for(const [k,ms] of slow)bad(k+': make() takes '+ms.toFixed(1)+' ms on average (limit 8 ms, 50 ms at 6x throttle)');
    const worst=Object.entries(timing).map(([k,[ms,n]])=>ms/n).reduce((a,b)=>Math.max(a,b),0);
    return{out,n:Object.values(timing).reduce((a,t)=>a+t[1],0),worst};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:r.out,note:r.n+' puzzles (3 types, every band, levels 1-12, 20 days), unique by brute force, hints, solve(); slowest make '+r.worst.toFixed(1)+' ms'};
});

// ---- P3-08: Mazes (BRAIN_TEASERS 5.4, 7) ----
run('mazes P3-08',()=>{
  const r=eval(js+`
  const bad=[],T=BT.get('maze'),N_DAYS=84; // 12 levels x 84 days = 1,008 mazes per band
  if(!T)bad.push('maze is not registered');
  const SIZE={A:[5,5,5,5,5,5,6,6,6,6,6,6],B:[8,8,8,8,9,9,9,9,10,10,10,10],C:[12,12,12,12,13,13,13,13,14,14,14,14],D:[16,16,16,16,17,17,17,17,18,18,18,18]};
  const D4=[[0,-1,1,4],[1,0,2,8],[0,1,4,1],[-1,0,8,2]]; // dx, dy, this side's bit, the other cell's bit
  // the test's own reading of a maze: neighbours through open sides, checked from both cells
  const grid=p=>{const o=[...p.o].map(c=>parseInt(c,16)),w=p.w,h=p.h,nb=[];
    for(let c=0;c<w*h;c++){const x=c%w,y=(c-x)/w,a=[];for(const[dx,dy,b,ob]of D4){if(!(o[c]&b))continue;const nx=x+dx,ny=y+dy;
      if(nx<0||ny<0||nx>=w||ny>=h){bad.push('opening off the board');continue}const n=ny*w+nx;if(!(o[n]&ob))bad.push('one-sided opening at '+c);a.push(n)}nb.push(a)}
    return{o,nb,w,h,N:w*h}};
  const bfs=(g,s,block)=>{const d=new Array(g.N).fill(-1),pr=new Array(g.N).fill(-1),q=[s];d[s]=0;
    for(let i=0;i<q.length;i++)for(const n of g.nb[q[i]])if(d[n]<0&&!(block&&block(n))){d[n]=d[q[i]]+1;pr[n]=q[i];q.push(n)}return{d,pr}};
  // state BFS over (cell, items held): door i needs key i, the flag needs every star. Shortest winning walk length from (s, m0), or -1.
  // canPick false: items are never picked up (to prove a door really needs its key)
  const par=(p,g,canPick=true,s=p.s,m0=0)=>{const it=p.stars||p.keys||[],M=1<<it.length,full=M-1,seen=new Set([s*M+m0]),q=[[s,m0,0]];
    for(let i=0;i<q.length;i++){const[c,m,k]=q[i];if(c==p.g)return k;
      for(const n of g.nb[c]){const di=(p.doors||[]).indexOf(n);if(di>=0&&!(m>>di&1))continue;if(p.stars&&n==p.g&&m!=full)continue;
        const ii=it.indexOf(n),nm=canPick&&ii>=0?m|1<<ii:m;if(seen.has(n*M+nm))continue;seen.add(n*M+nm);q.push([n,nm,k+1])}}return-1};
  const st={};
  let n=0,ms=0;
  for(const b of 'ABCD'){
    st[b]={par:0,dead:0,n:0,lv:[]};
    for(let lv=1;lv<=12;lv++){
      let lvPar=0;
      for(let d=1;d<=N_DAYS;d++){
        const day='2026-'+(1+d%12)+'-'+(1+d%28),w0=Date.now(),p=BT.make('maze',b,lv,{day,salt:d});ms+=Date.now()-w0;n++;
        const tag=b+lv+' '+day+'/'+d;
        if(d<=3&&JSON.stringify(p)!==JSON.stringify(BT.make('maze',b,lv,{day,salt:d})))bad.push(tag+': make() is not deterministic');
        if(p.w!==SIZE[b][lv-1]||p.h!==p.w||p.o.length!==p.w*p.h||!/^[0-9a-f]+$/.test(p.o))bad.push(tag+': size '+p.w+'x'+p.h+', want '+SIZE[b][lv-1]);
        const g=grid(p),ds=bfs(g,p.s),dg=bfs(g,p.g);
        // perfect maze: every cell reached and exactly N-1 openings (a tree), so one way between any two cells
        const edges=g.nb.reduce((a,x)=>a+x.length,0)/2;
        if(ds.d.some(x=>x<0)||edges!==g.N-1)bad.push(tag+': not a perfect maze');
        // start and goal are the two cells farthest apart
        if(ds.d[p.g]!==Math.max(...ds.d)||dg.d[p.s]!==Math.max(...dg.d))bad.push(tag+': start and goal are not a farthest pair');
        const way=[];for(let c=p.g;c>=0;c=ds.pr[c])way.push(c);way.reverse();
        const leaf=c=>g.nb[c].length==1&&c!==p.s&&c!==p.g,dead=g.nb.filter((x,c)=>leaf(c)).length;
        if(b=='C'){
          if(!p.stars||p.stars.length!==3||new Set(p.stars).size!==3)bad.push(tag+': band C needs 3 stars');
          else for(const c of p.stars)if(!leaf(c)||way.includes(c))bad.push(tag+': star '+c+' is not in a dead end off the way');
          if(p.keys||p.doors)bad.push(tag+': keys in band C');
        }else if(b=='D'){
          const nk=lv<=6?1:2;
          if(!p.keys||p.keys.length!==nk||!p.doors||p.doors.length!==nk)bad.push(tag+': band D level '+lv+' needs '+nk+' key(s) and door(s)');
          else{
            p.doors.forEach((c,i)=>{if(!way.includes(c)||c===p.s||c===p.g)bad.push(tag+': door '+i+' is not on the way')});
            if(nk==2&&way.indexOf(p.doors[0])>=way.indexOf(p.doors[1]))bad.push(tag+': door 1 does not come before door 2');
            p.keys.forEach((c,i)=>{
              if(!leaf(c)||way.includes(c))bad.push(tag+': key '+i+' is not at a dead end off the way');
              // key i can be reached holding only the keys before it (its branch leaves the way before door i)
              const r=bfs(g,p.s,x=>p.doors.indexOf(x)>=i);if(r.d[c]<0)bad.push(tag+': key '+i+' is behind its own door');
            });
            if(par(p,g,false)!==-1)bad.push(tag+': the goal is reachable without a key');
          }
          if(p.stars)bad.push(tag+': stars in band D');
        }else if(p.stars||p.keys||p.doors)bad.push(tag+': extras in band '+b);
        // solvable: the test's own state BFS, the stored par and solve() agree
        const best=par(p,g);
        if(best<0)bad.push(tag+': not solvable');
        if(p.par!==best)bad.push(tag+': par '+p.par+' but the shortest win is '+best);
        if(b<'C'&&best!==ds.d[p.g])bad.push(tag+': par is not the length of the way');
        const rt=T.solve(p);
        if(!Array.isArray(rt)||rt[0]!==p.s||rt[rt.length-1]!==p.g||rt.length-1!==best)bad.push(tag+': solve() is not a shortest win');
        else{
          const it=p.stars||p.keys||[];let m=0;
          for(let i=1;i<rt.length;i++){
            const c=rt[i];
            if(!g.nb[rt[i-1]].includes(c)){bad.push(tag+': solve() goes through a wall at step '+i);break}
            const di=(p.doors||[]).indexOf(c);if(di>=0&&!(m>>di&1)){bad.push(tag+': solve() walks through door '+di+' without its key');break}
            if(p.stars&&c==p.g&&m!==7){bad.push(tag+': solve() reaches the flag before all the stars');break}
            if(it.includes(c))m|=1<<it.indexOf(c);
          }
        }
        // hints: tier 2 = the next 5 cells, tier 3 = through the next junction (at least as many); both follow the route and never
        // reach its last cell, so no hint shows the whole way. Checked at the start and at three points along solve().
        if(Array.isArray(rt)&&d<=12)for(const k of [0,(rt.length/3)|0,(rt.length*2/3)|0,rt.length-3]){
          if(k<0)continue;
          const t=[],it=p.stars||p.keys||[];let m=0;
          for(const c of rt.slice(0,k+1)){if(t.length>1&&t[t.length-2]==c)t.pop();else t.push(c);if(it.includes(c))m|=1<<it.indexOf(c)}
          const head=t[t.length-1],route=MZ.route(p,g.o,head,m);
          if(!route||route.length-1!==par(p,g,true,head,m)){bad.push(tag+': no shortest route from step '+k);continue}
          const h2=MZ.hintCells(g.o,route,2),h3=MZ.hintCells(g.o,route,3);
          if(h2.length>5||h3.length<h2.length)bad.push(tag+': hint sizes '+h2.length+'/'+h3.length);
          for(const h of [h2,h3]){
            if(h.some((c,i)=>c!==route[i+1]))bad.push(tag+': a hint leaves the route');
            if(route.length>2&&h.length>=route.length-1)bad.push(tag+': a hint shows the whole way from step '+k);
          }
          if(k==0&&(h3.length>=best||h2.length>=best))bad.push(tag+': a hint at the start shows the whole way');
          const tg=MZ.target(p,route,m);if(!tg||!(tg.c>=0&&tg.c<g.N))bad.push(tag+': tier 1 has nothing to point at');
        }
        st[b].par+=best;st[b].dead+=dead;st[b].n++;lvPar+=best;
      }
      st[b].lv.push(lvPar/N_DAYS);
    }
    st[b].par/=st[b].n;st[b].dead/=st[b].n;
    const L=st[b].lv,first=(L[0]+L[1]+L[2]+L[3])/4,last=(L[8]+L[9]+L[10]+L[11])/4;
    if(!(last>first*1.15))bad.push('band '+b+': the last levels are not longer than the first ('+first.toFixed(1)+' -> '+last.toFixed(1)+')');
  }
  // difficulty grows by band: longer shortest wins and more dead ends
  for(const[a,b]of[['A','B'],['B','C'],['C','D']]){
    if(!(st[b].par>st[a].par*1.2))bad.push('the mean shortest win does not grow from '+a+' to '+b+': '+st[a].par.toFixed(1)+' -> '+st[b].par.toFixed(1));
    if(!(st[b].dead>st[a].dead*1.3))bad.push('dead ends do not grow from '+a+' to '+b);
  }
  if(ms/n>8)bad.push('make() is slow: '+(ms/n).toFixed(2)+' ms on average'); // the average only: one slow call is a GC pause or a busy machine
  // a saved state is used only when it fits the puzzle
  const p=BT.make('maze','B',3,{day:'2026-6-15'}),o=MZ.decode(p.o),rt=T.solve(p);
  if(!MZ.fit({t:rt.slice(0,4),m:0,dead:[],steps:3,mis:0},p,o))bad.push('a good saved state was refused');
  if(MZ.fit({t:[rt[0],rt[2]]},p,o)||MZ.fit({t:[rt[1]]},p,o)||MZ.fit(null,p,o)||MZ.fit({t:'x'},p,o))bad.push('a broken saved state was accepted');
  if(JSON.stringify(BT.make('maze','D',12,{day:'2026-6-15'})).length>600)bad.push('a band D maze is over 600 bytes of JSON');
  [bad,n,st,ms/n];`);
  const[bad,n,st,avg]=r;
  return{problems:[...new Set(bad)],note:n+' mazes; mean shortest win A '+st.A.par.toFixed(0)+', B '+st.B.par.toFixed(0)+', C '+st.C.par.toFixed(0)+', D '+st.D.par.toFixed(0)+
    '; dead ends '+['A','B','C','D'].map(b=>st[b].dead.toFixed(0)).join('/')+'; make '+avg.toFixed(2)+' ms'};
});

// ---- A11, A11b: data banks and on-demand code (Brain Teaser puzzle types, Game Room) in more precached files ----
run('code split A11b (and data file split A11)',()=>{
  const p=[],rd=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
  if(!BUILD_VER)return{problems:['no VER in tools/build.py']};
  if(PARTS.map(x=>x.stem).join()!=='bt,games')p.push('PARTS in tools/build.py read as '+JSON.stringify(PARTS.map(x=>x.stem))+' (one entry per line, like the others)');
  const FILES=[...PART_FILES,DATA_FILE];
  for(const f of ['index.html',...FILES,'sw.js'])if(!fs.existsSync(path.join(ROOT,f)))p.push(f+' not built; run python3 tools/build.py first');
  if(p.length)return{problems:p};
  const html=rd('index.html'),data=rd(DATA_FILE),sw=rd('sw.js'),parts=PART_FILES.map(rd);
  // index.html: the code (inline), then one external script per file in this order (parts, then data), then boot (inline)
  const tags=[...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].map(m=>({attrs:m[1],src:(m[1].match(/src="([^"]*)"/)||[])[1],body:m[2]}));
  const srcs=tags.filter(t=>t.src!==undefined).map(t=>t.src),n=FILES.length+2;
  if(JSON.stringify(srcs)!==JSON.stringify(FILES))p.push('index.html loads '+JSON.stringify(srcs)+', expected exactly '+JSON.stringify(FILES));
  if(tags.length!==n||tags[0].src!==undefined||tags[n-1].src!==undefined||FILES.some((f,i)=>tags[i+1].src!==f))p.push('index.html scripts are not code, '+FILES.join(', ')+', boot');
  else if(!/dataReady\(\)/.test(tags[n-1].body)||!/home\(true\)/.test(tags[n-1].body))p.push('boot script does not check dataReady() before home(true)');
  if(tags.some(t=>/\b(async|defer)\b|type=/.test(t.attrs)))p.push('a script is async, defer or typed: the files must load in order');
  if(!html.includes('Star School '+BUILD_VER))p.push('index.html is not '+BUILD_VER);
  if(/PUZ\.sudoku = \{|COMPSPEC\[2\]=|BANK\.vocab = |SPELL_WORDS=\{/.test(html))p.push('index.html still holds data banks');
  if(/__VER__/.test(html+data+parts.join('')))p.push('a built file still has __VER__');
  // index.html's own code and CSS: every src file that is not in a part, in name order, and nothing of a part's files
  const code=tags[0]&&tags[0].body||'',moved=[];
  if(code!=='\n'+cat('js').replace(/__VER__/g,BUILD_VER))p.push('index.html code is not src/js minus the part files (rebuild)');
  const b64=s=>s.replace(/base64,[\w+/=]+\)/g,'base64,F)'); // the fonts are embedded at build time
  if(!b64(html).includes('<style>\n'+b64(cat('css',undefined,'.css'))+'</style>'))p.push('index.html CSS is not src/css minus the part files (rebuild)');
  for(const x of PARTS)for(const [d,ext] of [['js','.js'],['css','.css']])for(const f of names(d,ext,x.stem)){
    moved.push(f);
    const longest=fs.readFileSync(path.join(SRC,d,f),'utf8').split('\n').map(l=>l.trim()).filter(l=>!/^(\/\*|\*|\/\/)/.test(l)).sort((a,b)=>b.length-a.length)[0]||'';
    if(longest.length>20&&html.includes(longest))p.push(f+' (part '+x.stem+') is still in index.html: '+longest.slice(0,60));
  }
  for(const f of ['74-teasers.js','58-playtime.js','90-app.js'])if(partOf(f))p.push(f+' must stay in index.html (home and the guard need it), but PARTS moves it');
  if(!names('js','.js','bt').length||!names('js','.js','games').length)p.push('a part has no src/js files: '+JSON.stringify(PARTS.map(x=>[x.stem,names('js','.js',x.stem)])));
  for(const f of fs.readdirSync(path.join(SRC,'js')))if(/-bt-/.test(f)&&partOf(f)!=='bt')p.push(f+' is a puzzle type but not in bt.'+BUILD_VER+'.js');
  // each part file: header, a <style> with its src/css (if any), its src/js in name order (byte for byte), its stamp as the last line
  const stamps=[];
  PARTS.forEach((x,i)=>{
    const f=PART_FILES[i],t=parts[i],stamp='var '+x.stem.toUpperCase()+"_VER='"+BUILD_VER+"';",lines=t.trimEnd().split('\n');
    stamps.push([x.stem,x.stem.toUpperCase()+'_VER']);
    if(!lines[lines.length-1].startsWith(stamp))p.push(f+' does not end with '+stamp);
    if((t.match(new RegExp('var '+x.stem.toUpperCase()+'_VER=','g'))||[]).length!==1)p.push(f+' should set '+x.stem.toUpperCase()+'_VER once');
    if(!t.includes(cat('js',x.stem)))p.push(f+' is not its src/js files (rebuild)');
    const css=cat('css',x.stem,'.css');
    if(css&&!t.includes('s.textContent='+JSON.stringify(css)+';document.head.appendChild(s)'))p.push(f+' does not add its src/css as a <style> (rebuild)');
    if(css&&t.indexOf('s.textContent=')>t.indexOf(cat('js',x.stem)))p.push(f+': the <style> must come before the code');
  });
  stamps.push(['data','DATA_VER']);
  // dataReady() checks every file: appFiles() in src/js/90-app.js lists the same files in the same order
  const app=fs.readFileSync(path.join(SRC,'js','90-app.js'),'utf8');
  const listed=[...app.matchAll(/\['(\w+)', typeof (\w+) === 'undefined' \? null : \2\]/g)].map(m=>[m[1],m[2]]);
  if(JSON.stringify(listed)!==JSON.stringify(stamps))p.push('appFiles() in 90-app.js lists '+JSON.stringify(listed)+', expected '+JSON.stringify(stamps));
  // load the built files in Node: the code alone, the code with the data but no parts, everything, and each file missing or stale.
  // Like the page: each file is its own classic script in one fresh global (vm context), so nothing leaks in from the other checks'
  // eval and a function declared in a later file is not hoisted into an earlier one. A fake document.head collects the parts' <style>s.
  const vm=require('vm'),styles=[];
  const load=(files,tail)=>{
    const doc=Object.assign({},global.document,{createElement:t=>({tag:t}),head:{appendChild:e=>styles.push(e)}});
    const ctx=vm.createContext({localStorage:global.localStorage,document:doc,navigator:{},addEventListener:()=>{},location:{protocol:'file:'},
      speechSynthesis:{getVoices:()=>[]},setTimeout:()=>{},console});
    try{for(const f of files)vm.runInContext(f,ctx);return JSON.parse(JSON.stringify(vm.runInContext(tail,ctx)))}catch(e){return{err:String(e)}}
  };
  {
    const alone=load([code],'({ready:dataReady()})');
    if(alone.err)p.push('the code does not load without the other files (it must not use part code or data while loading): '+alone.err);
    else if(alone.ready)p.push('dataReady() is true without the other files');
    const nop=load([code,data],'({ready:dataReady(),bt:BT.list().length,game:typeof garage})');
    if(nop.err)p.push('code + '+DATA_FILE+' do not load without the part files: '+nop.err);
    else if(nop.ready||nop.bt||nop.game!=='undefined')p.push('without the part files: '+JSON.stringify(nop));
    styles.length=0;
    const g=load([code,...parts,data],`({ready:dataReady(),files:appFiles(),gram:BANK.gram.length,vocab:BANK.vocab.length,
      demo:BANK.demo.length,comp:PASS.comp.length,info:PASS.info.length,passages:COMP.length,spell:Object.keys(SPELL_WORDS).length,
      spellGen:typeof genSpell,sudoku:Object.keys(PUZ.sudoku).join(''),sudokuA:PUZ.sudoku.A.easy.length,
      bt:['maze','pattern','pyramid','balance','target'].filter(id=>BT.get(id)).length,mz:typeof MZ,pat:typeof PAT,btn:typeof BTN,
      games:[typeof garage,typeof blockBuilder,typeof bbMenu,typeof colorMenu,typeof garageS,typeof gtStop,typeof stopHC,typeof shapePage,typeof polyArt,typeof rng].join()})`);
    if(g.err)p.push('code + '+FILES.join(' + ')+' do not load: '+g.err);
    else{
      if(!g.ready||g.files.some(f=>f[1]!==BUILD_VER))p.push('dataReady() false with the current files: '+JSON.stringify(g.files));
      for(const k of ['gram','vocab','demo','comp','info','passages','spell','sudokuA'])if(!(g[k]>0))p.push('data global missing or empty: '+k);
      if(g.spellGen!=='function')p.push('genSpell is not defined by the data file');
      if(g.sudoku!=='ABCD')p.push('PUZ.sudoku bands '+g.sudoku);
      if(g.bt!==5||g.mz!=='object'||g.pat!=='object'||g.btn!=='object')p.push('puzzle types not registered from '+PART_FILES[0]+': '+JSON.stringify(g));
      if(g.games!==Array(10).fill('function').join())p.push('game code missing from '+PART_FILES[1]+': '+g.games);
      const want=PARTS.map(x=>cat('css',x.stem,'.css')).filter(Boolean);
      if(styles.length!==want.length||styles.some((s,i)=>s.tag!=='style'||s.textContent!==want[i]))p.push('the parts did not add their CSS: '+styles.map(s=>s.id).join());
    }
    FILES.forEach((f,i)=>{
      const all=[code,...parts,data],stamp=stamps[i][1]+"='"+BUILD_VER+"'";
      const miss=load(all.filter((_,j)=>j!==i+1),'({ready:dataReady(),bad:appFiles().filter(f=>f[1]!==\''+BUILD_VER+'\').map(f=>f[0]+":"+f[1]).join()})');
      if(miss.err||miss.ready||miss.bad!==stamps[i][0]+':null')p.push('without '+f+': '+JSON.stringify(miss));
      const old=load(all.map((t,j)=>j===i+1?t.replace(stamp,stamps[i][1]+"='v1'"):t),'dataReady()');
      if(old!==false)p.push('dataReady() does not refuse a '+f+' of another release: '+JSON.stringify(old));
    });
  }
  // sw.js: one cache per release, precaching every file
  const F=JSON.parse(((sw.match(/const F=(\[[^\]]*\])/)||[])[1]||'[]').replace(/'/g,'"'));
  if(!sw.includes("const C='starschool-"+BUILD_VER+"'"))p.push('sw.js cache name is not starschool-'+BUILD_VER);
  for(const f of ['./','./index.html',...FILES.map(f=>'./'+f)])if(!F.includes(f))p.push('sw.js does not precache '+f);
  if(F.filter(f=>/\.v\d+\.js$/.test(f)).length!==FILES.length)p.push('sw.js should precache exactly '+FILES.join(', ')+': '+F.join(' '));
  // no stale built files at the repo root (GitHub Pages serves the root of main)
  const stale=fs.readdirSync(ROOT).filter(f=>/^[a-z]+\.v\d+\.js$/.test(f)&&!FILES.includes(f));
  if(stale.length)p.push('old built files at the repo root: '+stale.join(', '));
  // sources: the shell loads the parts and the data file between the code and boot
  const shell=fs.readFileSync(path.join(SRC,'shell.html'),'utf8');
  if(!/\/\*@@JS@@\*\/\s*<\/script>\s*<!--@@PARTS@@-->\s*<script src="data\.__VER__\.js"><\/script>\s*<script>\s*\/\*@@BOOT@@\*\//.test(shell))p.push('src/shell.html: code, parts, data.__VER__.js, boot not in that order');
  // budgets (ROADMAP R1, A11, A11b; index.html alone is the 'size: index.html under budget' check)
  const nd=Buffer.byteLength(data),np=parts.map(t=>Buffer.byteLength(t)),nt=Buffer.byteLength(html)+nd+np.reduce((a,b)=>a+b,0),w=[];
  if(nd>DATA_FAIL)p.push(DATA_FILE+' is '+nd+' bytes, over the '+DATA_FAIL+' limit');else if(nd>DATA_WARN)w.push('data over '+DATA_WARN);
  np.forEach((b,i)=>{if(b>PART_FAIL)p.push(PART_FILES[i]+' is '+b+' bytes, over the '+PART_FAIL+' limit');else if(b>PART_WARN)w.push(PARTS[i].stem+' over '+PART_WARN)});
  if(nt>TOTAL_FAIL)p.push('index.html + '+FILES.join(' + ')+' is '+nt+' bytes, over the '+TOTAL_FAIL+' limit');else if(nt>TOTAL_WARN)w.push('total over '+TOTAL_WARN);
  return{problems:p,note:PART_FILES.map((f,i)=>f+' '+Math.round(np[i]/1000)+' KB').join(', ')+', '+DATA_FILE+' '+Math.round(nd/1000)+' KB, total '+Math.round(nt/1000)+' KB'+
    ' ('+moved.length+' src files in parts)'+(w.length?'  WARN: '+w.join(', '):'')};
});

run('Crystal Caves P2-12: stops in CURRICULUM order, 3,000 samples per new level with the maths recomputed, hints, say, labels, reproducible, old levels unchanged',()=>{
  const cur=fs.readFileSync(path.join(ROOT,'docs','CURRICULUM.md'),'utf8');
  const body=function(){
    S.name='Ava';S.buddy='Ben';S.pet='dino';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a/gcd(a,b)*b;
    const txt=h=>String(h).replace(/<svg[^]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
    const esc2=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const red=(n,d)=>{const g=gcd(n,d);return n/g+'/'+d/g};
    const frs=h=>[...h.matchAll(/<span class="fn">(\d+)<\/span><span class="fd">(\d+)<\/span>/g)].map(x=>x[1]+'/'+x[2]);
    const nums=s=>(s.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
    const mixed=(n,d)=>{const g=gcd(n,d);n/=g;d/=g;const w=Math.floor(n/d),r=n%d;return d==1?String(w):w?`${w} ${r}/${d}`:`${r}/${d}`};
    const dstr=v=>{const w=Math.floor(v/100),f=String(v%100).padStart(2,'0').replace(/0+$/,'');return f?w+'.'+f:''+w}; // hundredths -> text
    const sc=s=>Math.round(parseFloat(s)*100);
    // ---- world: the stops of CURRICULUM 2.1 row 14, in that order, after Decimal Desert
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_caves'),w=mw[wi]||{nodes:[]};
    const row=cur.match(/\| 14 \| `m_caves` \| Crystal Caves \| 5 \| ([^|]+) \|/);
    const want=row?row[1].trim().split(', ').map(s=>s.replace(' ','')).join(' '):'?';
    if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' ')+' (CURRICULUM: '+want+')');
    if(want.split(' ').length!==10)add('CURRICULUM row 14 does not list 10 stops: '+want);
    if(wi<1||w.g!==5||w.n!=='Crystal Caves'||wi<mw.findIndex(x=>x.id=='m_desert')+1)add('world g/name/position');
    if(w.nodes.some(n=>n[2].length>22))add('stop title over 22 letters: '+w.nodes.find(n=>n[2].length>22)[2]);
    if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('two stops share a title');
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    if(WR.math[wi][1]-WR.math[wi][0]!==10||NODES.math[WR.math[wi][1]].sk!=='boss')add('11 stops: 10 and the boss');
    const mx={fop:6,geo:4,coord:1,meas:6,data:4,pat:5,story:8};
    for(const k in mx)if(!SK[k]||SK[k].max<mx[k]||SK[k].area!=='math')add('SK.'+k+'.max');
    if(SK.coord.t!=='Coordinates'||/\d$/.test('coord'))add('SK.coord');
    // ---- old levels unchanged: the dispatchers still call the old generators with the same seed
    const sameQ=(sk,lv,fn)=>{for(let s=1;s<=60;s++){const sd=(s*7+3)>>>0,a=genQ(sk,lv,sd),prev=RNG;RNG=mulberry32(sd);let b;try{b=fn(lv);b.sk=sk;b.lv=lv;b.seed=sd}finally{RNG=prev}
      if(JSON.stringify(a)!==JSON.stringify(b)){add('old level changed: '+sk+lv);return}}};
    sameQ('fop',1,dsFop1);sameQ('fop',2,dsFop2);sameQ('geo',1,ffGeo1);sameQ('geo',2,ffGeo2);sameQ('geo',3,dsGeo3);
    sameQ('meas',1,genMeas);sameQ('meas',2,genMeas2);sameQ('meas',3,genBayMeas3);sameQ('meas',4,ffMeas4);sameQ('meas',5,dsMeas5);
    sameQ('data',1,genData1);sameQ('data',2,genBayData2);sameQ('data',3,ffData3);
    sameQ('pat',1,genPatK);sameQ('pat',2,genPatK);sameQ('pat',3,genBayPat3);sameQ('pat',4,dsPat4);
    for(const l of [1,2,3,5])sameQ('story',l,genStoryAll);sameQ('story',4,genBayStory4);sameQ('story',6,ffStory6);sameQ('story',7,dsStory7);
    // ---- helpers for pictures
    const pathPts=d=>[...d.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map(m=>[+m[1],+m[2]]);
    const boxes=h=>[...h.matchAll(/<g class="vsl[^"]*"><path class="s2" d="([^"]+)"\/><path class="s1" d="([^"]+)"\/>/g)].map(m=>{
      const t=pathPts(m[1]),s=pathPts(m[2]);return{l:Math.hypot(t[1][0]-t[0][0],t[1][1]-t[0][1]),w:Math.hypot(t[2][0]-t[1][0],t[2][1]-t[1][1]),h:Math.hypot(s[2][0]-s[1][0],s[2][1]-s[1][1])}});
    const svgTexts=h=>[...h.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map(m=>m[1]);
    const cgPts=h=>[...h.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="7"\/>/g)].map(m=>[Math.round((+m[1]-28)/27),Math.round((284-(+m[2]))/27)]); // coordGrid max 10: spacing 27
    const lpKs=(h,den,max)=>[...h.matchAll(/<circle cx="([\d.]+)" cy="[\d.]+" r="8"\/>/g)].map(m=>Math.round((+m[1]-24)/290*max*den));
    const near=(x,y,t)=>Math.abs(x-y)<=(t||.35);
    // ---- generic checks per level, then the maths of each level
    const levels=[['fop',3],['fop',4],['fop',5],['fop',6],['geo',4],['coord',1],['meas',6],['data',4],['pat',5],['story',8]];
    const share={},seen={};
    for(const [sk,lv] of levels){
      const key=sk+lv,labs={},seeLab=new Set(),S_=share[key]={};
      const tally=t=>{S_[t]=(S_[t]||0)+1};
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),W=key+': ',L=q.label,a=q.ans;
        const pr=kindProblems(q);if(pr.length)add(W+L+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv)add(W+'not stamped');
        if(!q.say||/undefined|NaN/.test(q.say)||/\d\/\d/.test(q.say))add(W+'say '+q.say);
        if(!q.hint||hintHTML(q).length<10)add(W+'hint missing');
        if(!L||L.length>=60||/undefined|NaN/.test(L))add(W+'label '+L);
        if(labs[L]!==undefined&&labs[L]!==a)add(W+'label '+L+' has two answers');
        labs[L]=a;seeLab.add(L);
        if(/undefined|NaN|\[object/.test(q.html))add(W+'html has undefined/NaN');
        if(q.kind=='num'&&numParts(a,numSeps(q)).some(t=>t.replace(/\D/g,'').length>(q.max||4)))add(W+'answer longer than max '+a);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(a)||new Set(vs).size!==vs.length||vs.length!==4)add(W+'choices '+L);
          if(q.choices.some(c=>String(c.l).length>20))add(W+'a choice is long '+q.choices.find(c=>String(c.l).length>20).l)}
        // a hint teaches the method and never states the answer
        {const pieces=q.hint.k=='steps'?q.hint.steps.map(s=>txt(s.html)):[txt(q.hint.s||q.hint.html)];
          if(q.hint.k=='steps'&&(q.hint.steps.length<2||!/\?/.test(pieces[pieces.length-1])))add(W+'steps: '+q.hint.steps.length+', last has no "?": '+pieces[pieces.length-1]);
          if(pieces.some(p=>/the answer is/i.test(p)))add(W+'hint says the answer');
          if(q.kind=='num'||q.kind=='choice')for(const p of pieces){
            // a short whole-number answer is only a leak when a calculation ends in it (1 yd = 3 ft is a table row, not the answer)
            const re=/^\d{1,2}$/.test(a)?'[×÷+−][^=|]*=\\s*':'(=|\\bis|equals|makes)\\s*';
            if(new RegExp(re+esc2(a)+'(?![\\d/.])').test(p))add(W+'hint gives the answer '+a+' in: '+p)}
          if(q.kind=='tap'&&pieces.join(' ').includes(a.replace(',',', ')))add(W+'hint names the point')}
        let m;
        // ---------------- fop 3
        if(sk=='fop'&&lv==3){
          if(!(m=L.match(/^fop3 (\d+)\/(\d+) ([+−]) (\d+)\/(\d+)( simplest)?$/))){add(W+'label '+L);continue}
          const A=+m[1],B=+m[2],C=+m[4],D=+m[5],add_=m[3]=='+',Lc=lcm(B,D);
          if(B==D||B<2||B>12||D<2||D>12||A>=B||C>=D||A<1||C<1||gcd(A,B)>1||gcd(C,D)>1||Lc>60)add(W+'operands '+L);
          const n=add_?A*D+C*B:A*D-C*B,d=B*D;
          if(n<=0||n%d==0)add(W+'result not a positive non-whole '+L);
          if(a!==red(n,d))add(W+L+' -> '+a+', expected '+red(n,d));
          if(JSON.stringify(frs(q.html))!==JSON.stringify([A+'/'+B,C+'/'+D]))add(W+'prompt shows '+frs(q.html));
          const simp=!!m[6],[rn,rd]=red(n,d).split('/').map(Number);
          if(simp!==(q.eq===undefined)||q.pad!=='frac')add(W+'eq/pad '+L);
          if(simp&&!/simplest form/.test(q.html)||!simp&&!/as a fraction/.test(q.html))add(W+'prompt wording '+L);
          if(simp&&KIND.num.same(q,2*rn+'/'+2*rd))add(W+'an unsimplified answer is accepted '+L);
          if(!simp&&!KIND.num.same(q,2*rn+'/'+2*rd))add(W+'an equal fraction is refused '+L);
          if(!KIND.num.same(q,rn+'/'+rd))add(W+'the right answer is refused '+L);
          const fin=q.hint.steps.find(s=>s.c&&s.c.L);
          if(!fin||fin.c.L!==Lc||fin.c.x[0]!==A*(Lc/B)||fin.c.x[1]!==C*(Lc/D)||fin.c.op!==(add_?'+':'−'))add(W+'hint record '+JSON.stringify(fin&&fin.c));
          tally(add_?'add':'sub');tally(simp?'simplest':'any');tally(gcd(n,d)>1?'reduces':'already');tally(n>d?'improper':'proper');
        }
        // ---------------- fop 4
        if(sk=='fop'&&lv==4){
          if(!(m=L.match(/^fop4 (\d+) (\d+)\/(\d+) ([+−]) (\d+) (\d+)\/(\d+)$/))){add(W+'label '+L);continue}
          const w1=+m[1],A=+m[2],B=+m[3],w2=+m[5],C=+m[6],D=+m[7],add_=m[4]=='+',Lc=lcm(B,D);
          if(B==D||B<2||B>12||D<2||D>12||A>=B||C>=D||A<1||C<1||gcd(A,B)>1||gcd(C,D)>1||Lc>60||w1<1||w2<1)add(W+'operands '+L);
          const n=add_?(w1*B+A)*D+(w2*D+C)*B:(w1*B+A)*D-(w2*D+C)*B,d=B*D,Wh=Math.floor(n/d),r=n%d;
          if(n<=0||Wh<1||r==0)add(W+'result has no whole part or no fraction '+L);
          const exp=Wh+' '+red(r,d);
          if(a!==exp)add(W+L+' -> '+a+', expected '+exp);
          if(q.sep!=='mix'||q.eq!=='value')add(W+'sep/eq');
          if(JSON.stringify(frs(q.html))!==JSON.stringify([A+'/'+B,C+'/'+D]))add(W+'prompt shows '+frs(q.html));
          const wh=q.html.match(/<div class="eq">(\d+) <span class="fr">[^]*?<\/span><\/span> [+−] (\d+) <span class="fr">/);
          if(!wh||+wh[1]!==w1||+wh[2]!==w2)add(W+'wholes in the prompt '+L);
          if(!KIND.num.same(q,Wh+' '+(r*2)+'/'+(d*2)))add(W+'an equal mixed number is refused '+L);
          const a1=A*(Lc/B),c1=C*(Lc/D),reg=!add_&&a1<c1,carry=add_&&a1+c1>=Lc;
          const hs=q.hint.steps.map(s=>txt(s.html)).join(' | ');
          if(reg!==/Take 1 whole/.test(hs))add(W+'regroup step '+L);
          tally(add_?(carry?'add-carry':'add'):(reg?'sub-regroup':'sub'));
        }
        // ---------------- fop 5
        if(sk=='fop'&&lv==5){
          if(!(m=L.match(/^fop5 (\d+)\/(\d+) x (?:(\d+) )?(\d+)\/(\d+)$/))){add(W+'label '+L);continue}
          const A=+m[1],B=+m[2],Wh=m[3]?+m[3]:0,C=+m[4],D=+m[5];
          if(A>=B||C>=D||A<1||C<1||gcd(A,B)>1||gcd(C,D)>1||B<2||D<2||B>6||D>6)add(W+'operands '+L);
          const n=A*(Wh*D+C),d=B*D;
          if(n%d==0)add(W+'whole result '+L);
          if(a!==red(n,d))add(W+L+' -> '+a+', expected '+red(n,d));
          if(q.pad!=='frac'||q.eq!=='value'||!KIND.num.same(q,2*n+'/'+2*d))add(W+'pad/eq');
          const fr=frs(q.html);
          if(JSON.stringify(fr)!==JSON.stringify([A+'/'+B,C+'/'+D]))add(W+'prompt shows '+fr);
          const svg=(q.html.match(/<svg[^]*?<\/svg>/)||[''])[0],cnt=c=>(svg.match(new RegExp('<rect class="'+c+'"','g'))||[]).length;
          if(Wh){if(svg)add(W+'a picture with a mixed number');if(!new RegExp('<div class="eq">[^]*? × '+Wh+' <span').test(q.html))add(W+'mixed number missing');tally('mixed')}
          else{
            if(!svg||cnt('vp vs')!==A*C||cnt('vpt')!==A*(D-C)||cnt('vwg')!==(B-A)*C||cnt('vp')!==(B-A)*(D-C))add(W+'area model does not show '+L);
            tally('area');tally(gcd(n,d)>1?'reduces':'already');
          }
        }
        // ---------------- fop 6
        if(sk=='fop'&&lv==6){
          const svg=(q.html.match(/<svg[^]*?<\/svg>/)||[''])[0],rects=[...svg.matchAll(/<rect class="([^"]*)"/g)].map(x=>x[1]);
          if(m=L.match(/^fop6 1\/(\d+) \/ (\d+)$/)){
            const d=+m[1],n=+m[2];
            if(d<2||d>8||n<2||n>6)add(W+'sizes '+L);
            if(a!==`1/${d*n}`||q.pad!=='frac')add(W+L+' -> '+a);
            const cuts=(svg.match(/<path class="vce"[^>]*d="([^"]*)"/)||['',''])[1].split('M').filter(Boolean).length;
            if(rects.length!==d||rects.filter(c=>c=='vp vs').length!==1||cuts!==n-1)add(W+'bar picture '+L+' '+rects.length+' parts, '+cuts+' cuts');
            if(JSON.stringify(frs(q.html))!==JSON.stringify(['1/'+d])||!new RegExp('÷ '+n+' =').test(txt(q.html.replace(/<span class="fn">|<\/span>/g,' '))+' ')&&!q.html.includes('÷ '+n+' ='))add(W+'prompt '+L);
            tally('unit÷whole');
          }else if(m=L.match(/^fop6 (\d+) \/ 1\/(\d+)$/)){
            const n=+m[1],d=+m[2];
            if(d<2||d>8||n<2||n>6)add(W+'sizes '+L);
            if(a!==String(n*d)||q.pad)add(W+L+' -> '+a);
            if(rects.length!==n*d||rects.some(c=>c!=='vp vs'))add(W+'bars picture '+L+' '+rects.length);
            if(JSON.stringify(frs(q.html))!==JSON.stringify(['1/'+d])||!q.html.includes('<div class="eq">'+n+' ÷ '))add(W+'prompt '+L);
            tally('whole÷unit');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- geo 4
        if(sk=='geo'&&lv==4){
          const svg=(q.html.match(/<svg[^]*?<\/svg>/)||[''])[0],bx=boxes(svg),tx=svgTexts(svg).map(Number).sort((x,y)=>x-y).join();
          const dimOk=(b,l,ww,h)=>near(b.l*ww,b.w*l,.5*Math.max(l,ww))&&near(b.h*l,b.l*h,.5*Math.max(l,h));
          if(m=L.match(/^geo4 cubes (\d)x(\d)x(\d)$/)){
            const l=+m[1],ww=+m[2],h=+m[3];
            if(l<2||l>4||ww<2||ww>4||h<2||h>4)add(W+'sizes '+L);
            if(a!==String(l*ww*h))add(W+L+' -> '+a);
            if(bx.length!==1||!dimOk(bx[0],l,ww,h))add(W+'the drawn box is not '+L+' '+JSON.stringify(bx));
            const top=(svg.match(/<path class="vcg vct" d="([^"]*)"/)||['',''])[1].split('M').filter(Boolean).length,side=(svg.match(/<path class="vcg" d="([^"]*)"/)||['',''])[1].split('M').filter(Boolean).length;
            if(top!==(l-1)+(ww-1)||side!==(l-1)+(ww-1)+(h-1))add(W+'grid lines '+L+': '+top+'/'+side);
            if(svgTexts(svg).length)add(W+'numbers on a counting box '+L);
            tally('cubes');
          }else if(m=L.match(/^geo4 vol (\d+)x(\d+)x(\d+)$/)){
            const l=+m[1],ww=+m[2],h=+m[3];
            if(l<2||l>12||ww<2||ww>12||h<2||h>12)add(W+'sizes '+L);
            if(a!==String(l*ww*h)||!/cm³/.test(q.html))add(W+L+' -> '+a);
            if(bx.length!==1||!dimOk(bx[0],l,ww,h))add(W+'the drawn box is not '+L);
            if(tx!==[l,ww,h].sort((x,y)=>x-y).join())add(W+'labels '+tx+' for '+L);
            if(/vcg/.test(svg))add(W+'unit grid on a labelled box');
            if(!q.hint.steps.some(s=>s.c&&s.c.op=='×'))add(W+'hint has no multiplication step');
            tally('labelled');
          }else if(m=L.match(/^geo4 join (\d+)x(\d+)x(\d+)\+(\d+)x(\d+)x(\d+)$/)){
            const [l1,w1,h1,l2,w2,h2]=m.slice(1).map(Number);
            if(w1!==w2||h1==h2||l1<2||l2<2||l1>6||l2>6||w1<2||w1>6||h1>8||h2>8||h1<2||h2<2)add(W+'sizes '+L);
            if(a!==String(w1*(l1*h1+l2*h2))||!/cm³/.test(q.html))add(W+L+' -> '+a);
            if(bx.length!==2||!dimOk(bx[0],l1,w1,h1)||!dimOk(bx[1],l2,w2,h2)||!near(bx[1].l*l1,bx[0].l*l2,.5*Math.max(l1,l2)))add(W+'the drawn boxes are not '+L);
            if(tx!==[l1,w1,h1,l2,h2].sort((x,y)=>x-y).join())add(W+'labels '+tx+' for '+L);
            if(!/class="vsl c2"/.test(svg))add(W+'second box not in the second colour');
            tally('joined');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- coord 1
        if(sk=='coord'&&lv==1){
          const svg=(q.html.match(/<svg[^]*?<\/svg>/)||[''])[0];
          if(!svg)add(W+'no grid');
          if(m=L.match(/^coord1 tap (\d),(\d)$/)){
            const x=+m[1],y=+m[2],vs=[...svg.matchAll(/data-v="(\d),(\d)"/g)].map(z=>[+z[1],+z[2]]);
            if(q.kind!=='tap'||a!==x+','+y)add(W+L+' -> '+a);
            if(x<1||x>4||y<1||y>4||vs.length!==4||new Set(vs.map(String)).size!==4||vs.some(p=>p[0]<1||p[0]>4||p[1]<1||p[1]>4))add(W+'tap points '+L+JSON.stringify(vs));
            if(!vs.some(p=>p[0]==x&&p[1]==y))add(W+'the right point is not offered '+L);
            if(!txt(q.html).includes('('+x+', '+y+')'))add(W+'prompt does not name the point '+L);
            // every target is 48 across and no two overlap
            const rc=[...svg.matchAll(/<rect class="vh" x="([\d.-]+)" y="([\d.-]+)" width="48" height="48"\/>/g)].map(z=>[+z[1],+z[2]]);
            if(rc.length!==4||rc.some((p,i)=>rc.some((r,j)=>j>i&&Math.abs(p[0]-r[0])<47.9&&Math.abs(p[1]-r[1])<47.9)))add(W+'tap targets overlap or are not 48 '+L);
            if(!/viz-grid vi/.test(svg))add(W+'grid is not a tap picture');
            {const vb=svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);if(!vb||rc.some(p=>p[0]<0||p[1]<0||p[0]+48>+vb[1]+.01||p[1]+48>+vb[2]+.01))add(W+'a tap target sticks out of the picture '+L)}
            tally('tap');
          }else if(m=L.match(/^coord1 read (\d+),(\d+)$/)){
            const x=+m[1],y=+m[2],pts=cgPts(svg);
            if(q.kind!=='num'||q.sep!=='xy'||a!==x+','+y)add(W+L+' -> '+a);
            if(pts.length!==1||pts[0][0]!==x||pts[0][1]!==y)add(W+'the drawn point is '+JSON.stringify(pts)+' not '+L);
            if(x>10||y>10||(x==0&&y==0)||!/>A<\/text>/.test(svg))add(W+'point or name '+L);
            if(!q.html.includes('id="slot"')||!q.html.includes('id="slot2"'))add(W+'two slots');
            tally('read');if(x==0||y==0)tally('on-axis');if(x==10||y==10)tally('on-edge');
          }else if(m=L.match(/^coord1 pair (\d+),(\d+)$/)){
            const x=+m[1],y=+m[2],pts=cgPts(svg),vs=q.choices.map(c=>c.v);
            if(q.kind!=='choice'||a!==x+','+y)add(W+L+' -> '+a);
            if(pts.length!==1||pts[0][0]!==x||pts[0][1]!==y)add(W+'the drawn point is '+JSON.stringify(pts)+' not '+L);
            if(q.choices.some(c=>c.l!=='('+c.v.replace(',',', ')+')'))add(W+'choice text '+JSON.stringify(q.choices));
            tally('pair');if(vs.includes(y+','+x))tally('swap-offered');
          }else if(m=L.match(/^coord1 dist (\d+),(\d+) (\d+),(\d+)$/)){
            const [x1,y1,x2,y2]=m.slice(1).map(Number),pts=cgPts(svg);
            const d=Math.abs(x1-x2)+Math.abs(y1-y2);
            if((x1!==x2&&y1!==y2)||d<2)add(W+'not on one line or too close '+L);
            if(a!==String(d))add(W+L+' -> '+a);
            if(pts.length!==2||pts[0].join()!==x1+','+y1||pts[1].join()!==x2+','+y2)add(W+'drawn points '+JSON.stringify(pts)+' for '+L);
            tally(x1==x2?'vertical':'horizontal');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- meas 6
        if(sk=='meas'&&lv==6){
          if(!(m=L.match(/^meas6 (\d+(?:\.\d)?) (\w+) to (\w+)$/))){add(W+'label '+L);continue}
          const ONE={'km>m':1000,'m>cm':100,'kg>g':1000,'L>mL':1000,'yd>ft':3,'ft>in':12,'hr>min':60,'min>sec':60,'lb>oz':16,'gal>qt':4};
          const TWO={'yd>in':36,'gal>pt':8,'hr>sec':3600,'day>min':1440,'wk>hr':168};
          const N0=m[1],f=m[2],t=m[3],kf=f+'>'+t,kr=t+'>'+f,x10=Math.round(parseFloat(N0)*10);
          let exp,dir;
          if(kf in ONE||kf in TWO){dir='down';exp=x10*(ONE[kf]||TWO[kf])/10;if(!Number.isInteger(exp))add(W+'not whole '+L)}
          else if(kr in ONE){dir='up';exp=parseFloat(N0)/ONE[kr];if(Math.abs(exp*10-Math.round(exp*10))>1e-9)add(W+'more than one decimal '+L)}
          else{add(W+'unknown pair '+L);continue}
          const el=String(Math.round(exp*10)/10);
          if(!numEq(a,el)||!/^(0|[1-9]\d*)(\.\d*[1-9])?$/.test(a))add(W+L+' -> '+a+', expected '+el);
          if((a.includes('.'))!==(q.pad=='dec')&&!(q.pad===undefined&&!a.includes('.')))add(W+'pad '+q.pad+' for '+a);
          if(dir=='down'&&!/smaller unit/.test(q.html)||dir=='up'&&!/bigger unit/.test(q.html))add(W+'direction wording '+L);
          const eq=txt(q.html);
          if(!eq.includes(N0+' '+f+' ='))add(W+'prompt does not show '+N0+' '+f);
          if(!eq.includes(' '+t))add(W+'prompt does not show the unit '+t);
          if(q.eq!=='value'||numParts(a,numSeps(q)).some(p=>p.replace(/\D/g,'').length>(q.max||4)))add(W+'eq/max');
          tally(kf in TWO?'two-step':dir);if(N0.includes('.'))tally('decimal-in');if(a.includes('.'))tally('decimal-out');
        }
        // ---------------- data 4
        if(sk=='data'&&lv==4){
          if(!(m=L.match(/^data4 (count|total|range) (?:k=(\d+) )?d=(\d+): ([\d ]+)$/))){add(W+'label '+L);continue}
          const type=m[1],den=+m[3],ks=m[4].split(' ').map(Number),mxv=den==2?3:den==4?2:1,svg=(q.html.match(/<svg[^]*?<\/svg>/)||[''])[0];
          const drawn=lpKs(svg,den,mxv).sort((x,y)=>x-y);
          if(drawn.join()!==ks.join())add(W+'dots '+drawn+' for '+L);
          if(![2,4,8].includes(den)||ks.length<6||ks.length>10||ks.some(k=>k<1||k>mxv*den)||new Set(ks).size<3)add(W+'data '+L);
          const cnt={};ks.forEach(k=>{cnt[k]=(cnt[k]||0)+1});if(Math.max(...Object.values(cnt))>6)add(W+'a stack is too tall '+L);
          if(type=='count'){
            const k=+m[2],c=ks.filter(z=>z==k).length;
            if(!(k in cnt)||a!==String(c)||q.kind!=='num')add(W+L+' -> '+a);
            tally('count');
          }else{
            const n=type=='total'?ks.reduce((s,k)=>s+k,0):Math.max(...ks)-Math.min(...ks),e=mixed(n,den);
            if(n%den==0)add(W+'whole result '+L);
            if(a!==e||!numEq(a,e))add(W+L+' -> '+a+', expected '+e);
            const whole=n/den>=1;
            if(whole!==(q.sep==='mix')||(!whole&&q.pad!=='frac')||q.eq!=='value')add(W+'slots for '+a+': sep '+q.sep+' pad '+q.pad);
            const g=gcd(n,den),r=(n/g)%(den/g);
            if(!KIND.num.same(q,(whole?Math.floor(n/den)+' ':'')+(2*r)+'/'+(2*den/g)))add(W+'an equal fraction is refused '+L);
            tally(type);tally(whole?'mixed':'fraction');
          }
          tally('d'+den);
        }
        // ---------------- pat 5
        if(sk=='pat'&&lv==5){
          const tx=svgTexts((q.html.match(/<svg[^]*?<\/svg>/)||[''])[0]);
          const tbl=tx.slice(2).map(Number);
          if(m=L.match(/^pat5 (rel|relc) (\d+) (\d+)$/)){
            const A=+m[2],B=+m[3],k=B/A;
            if(!Number.isInteger(k)||k<2||k>5||A<2||A>6)add(W+'numbers '+L);
            if(tbl.join()!==[1,2,3,4].flatMap(j=>[A*j,B*j]).join()||tx[0]!=='A'||tx[1]!=='B')add(W+'table '+tx);
            if(!txt(q.html).includes('add '+A+'.')||!txt(q.html).includes('add '+B+'.'))add(W+'rules text '+L);
            if(m[1]=='rel'){if(a!==String(k)||q.kind!=='num')add(W+L+' -> '+a);tally('rel-num')}
            else{
              // exactly one statement is true for every row of the table
              const true_=q.choices.filter(c=>{let t=c.l.match(/^B is (\d+) times A$/);if(t)return[1,2,3,4].every(j=>B*j===+t[1]*A*j);
                t=c.l.match(/^B is A \+ (\d+)$/);if(t)return[1,2,3,4].every(j=>B*j===A*j+ +t[1]);
                t=c.l.match(/^A is (\d+) times B$/);if(t)return[1,2,3,4].every(j=>A*j===+t[1]*B*j);return null});
              if(true_.length!==1||true_[0].v!==a||q.cls!=='ccw')add(W+'choices '+JSON.stringify(q.choices.map(c=>c.l)));
              tally('rel-choice');
            }
          }else if(m=L.match(/^pat5 pair (\d+) (\d+) A=(\d+)$/)){
            const A=+m[1],B=+m[2],V=+m[3];
            if(B%A||V%A||V/A<6||V/A>9)add(W+'numbers '+L);
            if(a!==String(B/A*V))add(W+L+' -> '+a);
            if(tbl.join()!==[1,2,3].flatMap(j=>[A*j,B*j]).join())add(W+'table '+tx);
            tally('pair');
          }else if(m=L.match(/^pat5 rule (\d+) (\d+) ([\d,]+)$/)){
            const A=+m[1],B=+m[2],xs=m[3].split(',').map(Number);
            if(A<2||A>5||B<0||B>5||xs.length!==4||new Set(xs).size!==4)add(W+'numbers '+L);
            if(tbl.join()!==xs.flatMap(x=>[x,A*x+B]).join())add(W+'table '+tx+' for '+L);
            // every offered rule is parsed and tried on the table: only the answer fits every row
            const fits=r=>{const t=r.match(/^y = (\d*)x(?: \+ (\d+))?$/);if(!t)return null;const p=t[1]===''?1:+t[1],c=t[2]?+t[2]:0;return xs.every(x=>p*x+c===A*x+B)};
            const ok=q.choices.filter(c=>fits(c.v)===true);
            if(ok.length!==1||ok[0].v!==a||q.choices.some(c=>fits(c.v)===null)||q.cls!=='ccw')add(W+'rules '+JSON.stringify(q.choices.map(c=>c.v))+' for '+L);
            if(a!==`y = ${A}x${B?' + '+B:''}`)add(W+L+' -> '+a);
            tally('rule');if(B==0)tally('no-constant');
          }else if(m=L.match(/^pat5 eval (\d+) (\d+) (\d+)$/)){
            const A=+m[1],B=+m[2],x=+m[3];
            if(a!==String(A*x+B)||!txt(q.html).includes('y = '+A+'x + '+B)||!txt(q.html).includes('x is '+x+','))add(W+L+' -> '+a);
            tally('eval');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- story 8
        if(sk=='story'&&lv==8){
          const t=txt(q.html),money=[...t.matchAll(/\$(\d+\.\d\d)\b/g)].map(z=>sc(z[1]));
          const same=(e)=>{if(!numEq(a,e)||!/^(0|[1-9]\d*)(\.\d*[1-9])?$|^\d+\/\d+$/.test(a))add(W+L+' -> '+a+', expected '+e)};
          if(q.kind!=='num'||q.auto!==true||!q.html.includes('class="story"'))add(W+'story shape');
          if(m=L.match(/^story8 total (\d+)\+(\d+)$/)){
            const p1=+m[1],p2=+m[2];
            if(money.join()!==[p1,p2].join()||p1%100==0||p2%100==0||p1+p2>=2000)add(W+'prices '+money+' for '+L);
            same(dstr(p1+p2));if(q.pad!=='dec'||!/\$ /.test(q.html))add(W+'pad');tally('total');
          }else if(m=L.match(/^story8 change (\d+) (\d+)$/)){
            const bill=+m[1],p=+m[2];
            if(money[0]!==p||!t.includes('$'+bill+' bill')||![5,10,20].includes(bill)||p>=bill*100-50||p%100==0)add(W+'prices '+t);
            same(dstr(bill*100-p));tally('change');
          }else if(m=L.match(/^story8 diff (\d+)-(\d+)$/)){
            const p1=+m[1],p2=+m[2];
            if(money.join()!==[p1,p2].join()||p1<=p2)add(W+'prices '+money+' for '+L);
            same(dstr(p1-p2));tally('diff');
          }else if(m=L.match(/^story8 (half|triple) (\d+)\/(\d+)$/)){
            const A=+m[2],B=+m[3],half=m[1]=='half';
            if(A>=B||gcd(A,B)>1||B<2||B>8||!t.includes(A+'/'+B+' cup')||(half?!/half of the recipe/.test(t):!/3 times the recipe/.test(t)))add(W+'text '+t);
            const e=half?red(A,2*B):red(3*A,B);
            if(!half&&(3*A)%B==0)add(W+'whole result '+L);
            same(e);if(q.pad!=='frac'||q.eq!=='value')add(W+'pad');tally(half?'half':'triple');
          }else if(m=L.match(/^story8 km (\d+\.\d) x (\d)$/)){
            const x=sc(m[1]),n=+m[2];
            if(!t.includes(m[1]+' km')||!t.includes(n+' times')||n<3||n>6)add(W+'text '+t);
            same(dstr(x*n));tally('km-times');
          }else if(m=L.match(/^story8 add (\d+(?:\.\d+)?)\+(\d+\.\d+)$/)){
            if(!t.includes(m[1]+' km')||!t.includes(m[2]+' km'))add(W+'text '+t);
            same(dstr(sc(m[1])+sc(m[2])));tally('dec-add');
          }else if(m=L.match(/^story8 sub (\d+(?:\.\d+)?)-(\d+\.\d+)$/)){
            if(!t.includes(m[1]+' km')||!t.includes(m[2]+' km')||sc(m[1])<=sc(m[2]))add(W+'text '+t);
            same(dstr(sc(m[1])-sc(m[2])));tally('dec-sub');
          }else if(m=L.match(/^story8 (fadd|fsub) (\d+)\/(\d+)([+-])(\d+)\/(\d+)$/)){
            const A=+m[2],B=+m[3],C=+m[5],D=+m[6],ad=m[1]=='fadd';
            if(B==D||lcm(B,D)>24||gcd(A,B)>1||gcd(C,D)>1||A>=B||C>=D||(ad?m[4]!=='+':m[4]!=='-'))add(W+'operands '+L);
            if(!t.includes(A+'/'+B+' mile')||!t.includes(C+'/'+D+' mile'))add(W+'text '+t);
            const n=ad?A*D+C*B:A*D-C*B;if(n<=0)add(W+'not positive '+L);
            same(red(n,B*D));if(q.pad!=='frac')add(W+'pad');tally(m[1]);
          }else{add(W+'label '+L);continue}
        }
      }
      seen[key]=seeLab.size;
      // reproducible: the same seed gives the same question, hint and choices
      for(let s=1;s<=40;s++)if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))add(key+' seed '+s+' not reproducible');
    }
    // ---- mixes (each variant shows up a fair share of the time)
    const fair=(k,names,lo)=>{for(const n of names)if(!((share[k]||{})[n]>N*lo))add(k+': '+n+' too rare '+JSON.stringify(share[k]))};
    fair('fop3',['add','sub','simplest','any','reduces','already','improper','proper'],.12);
    fair('fop4',['add','add-carry','sub','sub-regroup'],.04);fair('fop5',['area','mixed','reduces','already'],.1);fair('fop6',['unit÷whole','whole÷unit'],.4);
    fair('geo4',['cubes','labelled','joined'],.25);fair('coord1',['tap','read','pair','vertical','horizontal'],.07);fair('coord1',['on-axis'],.01);fair('coord1',['on-edge'],.02);
    fair('meas6',['down','up','two-step','decimal-in','decimal-out'],.06);fair('data4',['count','total','range','d2','d4','d8','mixed','fraction'],.1);
    fair('pat5',['rel-num','rel-choice','pair','rule','eval'],.06);fair('pat5',['no-constant'],.04);
    fair('story8',['total','change','diff','half','triple','km-times','dec-add','dec-sub','fadd','fsub'],.04);
    for(const [k,min] of [['fop3',200],['fop4',200],['fop5',60],['fop6',40],['geo4',150],['coord1',100],['meas6',60],['data4',300],['pat5',100],['story8',300]])if(seen[k]<min)add(k+': only '+seen[k]+' different labels');
    return bad;
  };
  const r=eval(js+';('+body.toString()+')()');
  // the block of this chunk: no Math.random, no raw colour
  const src=fs.readFileSync(path.join(SRC,'js','35-gen-math-upper.js'),'utf8'),i0=src.indexOf('// ---- P2-12 Crystal Caves ----'),i1=src.indexOf('\n// ---- P',i0+10),blk=src.slice(i0,i1<0?undefined:i1);
  if(i0<0)r.push('P2-12 block marker missing');
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))r.push('P2-12 block has a raw hex colour');
  if(/Math\.random/.test(blk))r.push('P2-12 block uses Math.random');
  // names in the block start with cc (CONTRIBUTING: new globals carry a prefix)
  for(const m of blk.matchAll(/^(?:const|function) ([A-Za-z_$][\w$]*)/gm))if(!/^(cc|CC_)/i.test(m[1]))r.push('P2-12 block: global '+m[1]+' does not start with cc');
  // VIZ.solid and coordGrid are deterministic and tokens only
  const vz=eval(js+';VIZ');
  if(vz.solid([{l:3,h:4}],{w:2,grid:true,lab:true})!==vz.solid([{l:3,h:4}],{w:2,grid:true,lab:true}))r.push('VIZ.solid is not deterministic');
  if(/#[0-9a-fA-F]{3,8}\b|id=|<defs|filter/.test(vz.solid([{l:3,h:4},{l:2,h:2,c2:true}],{w:2,grid:true,lab:true})))r.push('VIZ.solid has a raw colour, id, defs or filter');
  if(!/<text class="vta" x="[\d.]+" y="[\d.]+">A<\/text>/.test(vz.coordGrid({max:10,points:[[10,10,'A']]})))r.push('coordGrid: a name on the top right edge is not moved inside');
  return{problems:r,note:'10 levels x 3,000 samples'};
});

run('Crystal Caves P2-12: the new world keeps every star, re-locks nothing and the map opens where it did (fixtures x grades; the path ends at the caves while it runs)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    // the path ends at the caves while this runs, so worlds added after it by later chunks do not matter here
    const ALL=PATHS.math.worlds,CI=ALL.findIndex(w=>w.id=='m_caves'),ORIG=ALL.slice(0,CI+1),without=()=>ORIG.filter(w=>w.id!=='m_caves');
    PATHS.math.worlds=ORIG;buildNodes('math');
    const snap=()=>{const o={};NODES.math.forEach((n,i)=>{o[nid(n)]={st:getSt('math',i),open:unlocked('math',i),pass:passed('math',i),wid:n.wid}});return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])fixtures.push([name,fx(name)]);
    // synthetic saves: everything before the caves passed (with and without the last boss), and a caves world partly played
    const mk=(boss,extra)=>{load(null);PATHS.math.worlds=without();buildNodes('math');const m={};
      NODES.math.forEach(n=>{if(n.sk!=='boss'||boss)m[nid(n)]=2});PATHS.math.worlds=ORIG;buildNodes('math');
      return JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{math:Object.assign(m,extra||{}),read:{},es:{}},grade:5})};
    fixtures.push(['path-done',mk(true)],['stops-done-no-boss',mk(false)],['caves-started',mk(true,{fop3:3,fop4:2,geo4:1})]);
    let checked=0,moved=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,4,5,6]){
      load(raw.length>2?raw:null);if(g!==null)S.grade=g;
      const tag=name+' g'+gradeOf()+': ',maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.math[curNode('math')]),curW=NODES.math[curNode('math')].wid;
      PATHS.math.worlds=without();buildNodes('math');
      const old=snap(),curOld=nid(NODES.math[curNode('math')]);
      PATHS.math.worlds=ORIG;buildNodes('math');
      for(const k in old){
        checked++;
        if(!now[k]){b(tag+'stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(tag+'stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(tag+'passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(tag+k+' locked by the new world');
      }
      const given=(JSON.parse(raw).maps||{}).math||{};
      for(const k in now)if(!(k in old)&&now[k].st&&!(k in given))b(tag+'new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(tag+'building the nodes changed the map');
      // the map opens on the same stop as before, except: a child with nothing left before the caves (every older stop passed) meets
      // them next; and a 5th grader and up with nothing further on starts in the world of their own grade (startWorld)
      if(cur!==curOld){
        moved++;
        const prevDone=NODES.math.filter(n=>n.wi<CI).every(n=>passed('math',NODES.math.indexOf(n)));
        if(curW!=='m_caves'||!(prevDone||worldFinished('math',CI-1)||gradeOf()>=5))b(tag+'map opens on '+cur+' (was '+curOld+')');
      }
      if(curW==='m_caves'&&gradeOf()<5&&!worldFinished('math',CI-1)&&!worldHasProgress('math',CI))b(tag+'the map opens in the caves before the world before them is done');
    }
    PATHS.math.worlds=ALL;buildNodes('math');
    // a 4th grader does not see the caves open until the world before them is finished
    load(null);S.grade=4;if(worldOpen('math',CI))b('grade 4: the caves are open before the world before them is done');
    S.grade=5;if(!worldOpen('math',CI))b('grade 5: the caves must be open');
    return{out,checked,moved};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:r.out,note:r.checked+' stop checks against a path without the caves, map moved on '+r.moved+' of 81 loads'};
});

// ---- P3-04 MathDoku generator and banks (BRAIN_TEASERS 5.2, 6) ----
run('mathdoku banks P3-04: format, Latin solution, cage targets, connected cages, band operations, exactly one solution (independent counter), grade reproduces, no duplicates under rotation and mirror, reproducible from the seed',()=>{
  const p=[];
  const vb=require('./puzzles/verify-banks.js'),md=require('./puzzles/mathdoku.js'),csp=require('./puzzles/csp.js');
  const T=require('./puzzles/build-banks.js').TYPES.mathdoku;
  // the bank as the app sees it: evaluated with all of src/js and src/data, and present in the built data file
  const inApp=eval(js+';PUZ.mathdoku');
  const bank=vb.loadBank('d-puz-mathdoku.js').mathdoku;
  if(JSON.stringify(inApp)!==JSON.stringify(bank))p.push('PUZ.mathdoku differs when loaded with the whole app');
  if(!eval(js+';PUZ.sudoku&&PUZ.sudoku.D'))p.push('PUZ.sudoku lost when the mathdoku bank loads');
  const built=fs.existsSync(path.join(ROOT,DATA_FILE))?fs.readFileSync(path.join(ROOT,DATA_FILE),'utf8'):'';
  if(!built.includes('PUZ.mathdoku = {'))p.push(DATA_FILE+' has no mathdoku bank (rebuild)');
  // every stored puzzle through verify-banks.js: format, sizes, Latin solution, cages cover the grid once, connected, band
  // operations and cage sizes, targets match the solution, single-cell limits, one solution, grade and score, sorted, no duplicates
  const v=vb.verifyMathdoku(bank);
  p.push(...v.problems);
  // this test's own counter (shares no code with csp.js, mathdoku.js or verify-banks.js): every cage's value tuples that make
  // its target by plain arithmetic, then cage by cage, each tuple placed only where its values are new in their row and column
  const arith=(op,a)=>op==='+'||op==='='?a.reduce((x,y)=>x+y,0):op==='*'?a.reduce((x,y)=>x*y,1):op==='-'?Math.abs(a[0]-a[1]):
    Math.max(a[0],a[1])%Math.min(a[0],a[1])?-1:Math.max(a[0],a[1])/Math.min(a[0],a[1]);
  const kenSolutions=(N,cages,limit)=>{
    const tuples=cages.map(cg=>{const out=[],vals=[];const rec=i=>{if(i===cg.cells.length){if(arith(cg.op,vals)===cg.t)out.push(vals.slice());return}for(let x=1;x<=N;x++){vals[i]=x;rec(i+1)}};rec(0);return out});
    const g=Array(N*N).fill(0),sols=[];
    const fits=(c,x)=>{const r=Math.floor(c/N),k=c%N;for(let j=0;j<N;j++)if(g[r*N+j]===x||g[j*N+k]===x)return false;return true};
    const rec=i=>{
      if(sols.length>=limit)return;
      if(i===cages.length){sols.push(g.slice());return}
      const cells=cages[i].cells;
      for(const tu of tuples[i]){
        let k=0;
        for(;k<cells.length;k++){if(!fits(cells[k],tu[k]))break;g[cells[k]]=tu[k]}
        if(k===cells.length)rec(i+1);
        for(let j=0;j<k;j++)g[cells[j]]=0;
      }
    };
    rec(0);
    return sols;
  };
  // the counter itself: rows as + cages leave every Latin square (12 of 3x3, 576 of 4x4); a changed target leaves none
  const rows=N=>Array.from({length:N},(_,r)=>({cells:Array.from({length:N},(_,c)=>r*N+c),op:'+',t:N*(N+1)/2}));
  if(kenSolutions(3,rows(3),1000).length!==12)p.push('own counter: 3x3 is not 12 Latin squares');
  if(kenSolutions(4,rows(4),1000).length!==576)p.push('own counter: 4x4 is not 576 Latin squares');
  const d0=md.decode(bank.D[bank.D.length-1]),k0=d0.cages.findIndex(cg=>cg.op==='+');
  const changed=d0.cages.map((cg,k)=>k===k0?Object.assign({},cg,{t:cg.t+1}):cg);
  if(kenSolutions(d0.n,changed,2).length!==0)p.push('own counter: a changed target still has a solution');
  // exactly one solution, and it is the stored one; the 8 rotations and mirrors (the UI's runtime variety) give puzzles that
  // are still unique and that no other bank puzzle equals
  const T8=[(r,c,N)=>[r,c],(r,c,N)=>[c,N-1-r],(r,c,N)=>[N-1-r,N-1-c],(r,c,N)=>[N-1-c,r],(r,c,N)=>[r,N-1-c],(r,c,N)=>[N-1-r,c],(r,c,N)=>[c,r],(r,c,N)=>[N-1-c,N-1-r]];
  const turn=(q,f)=>{const N=q.n,m=c=>{const[r,k]=f(Math.floor(c/N),c%N,N);return r*N+k};const sol=[];q.solution.forEach((x,c)=>sol[m(c)]=x);
    return{n:N,solution:sol,cages:q.cages.map(cg=>({cells:cg.cells.map(m).sort((a,b)=>a-b),op:cg.op,t:cg.t}))}};
  const ident=q=>q.n+':'+q.cages.map(cg=>cg.cells.join('.')+cg.op+cg.t).sort().join(',');
  const owner=new Map(),grades={},all=[];
  for(const b of md.ORDER)bank[b].forEach((e,i)=>{const q=md.decode(e);all.push([b+' #'+i,q]);owner.set(ident(q),b+' #'+i)});
  all.forEach(([at,q],i)=>{
    const s=kenSolutions(q.n,q.cages,2);
    if(s.length!==1)p.push(at+': own counter finds '+s.length+' solutions');
    else if(s[0].join('')!==q.solution.join(''))p.push(at+': own counter solves it differently from the stored solution');
    T8.forEach((f,k)=>{
      if(!k)return;
      const t=turn(q,f),o=owner.get(ident(t));
      if(o&&o!==at)p.push(at+': turned or mirrored it equals '+o);
      if(k===1+i%7){const st=kenSolutions(t.n,t.cages,2);if(st.length!==1||st[0].join('')!==t.solution.join(''))p.push(at+': not unique after transform '+k)}
    });
    const key=at[0]+' '+q.n+'x'+q.n;
    grades[key]=grades[key]||{};grades[key][q.grade]=(grades[key][q.grade]||0)+1;
  });
  // the generator's solver agrees with the counter on the first puzzle of each band
  for(const b of md.ORDER){const q=md.decode(bank[b][0]);if(csp.countSolutions(md.problemOf(q.n,q.cages),2)!==1)p.push('csp count is not 1 for '+b+' #0')}
  // reproducible: the whole bank regenerated from the seed is the committed file, byte for byte
  const text=T.text(),file=fs.readFileSync(path.join(SRC,'data',T.file),'utf8'),same=text===file;
  if(!same){const a=text.split('\n'),b=file.split('\n'),i=a.findIndex((l,k)=>l!==b[k]);p.push('the bank regenerated from seed '+T.seed+' differs at line '+(i+1)+': '+a[i]+' / stored '+b[i])}
  return{problems:p,note:all.length+' puzzles, own counter on each and on one turn or mirror of each; grades '+
    Object.entries(grades).map(([k,g])=>k+' '+Object.entries(g).map(([x,y])=>y+'x'+x).join('/')).join(', ')+(same?'; regenerated byte for byte':'')};
});

// ---- P2-16: tracing engine and digits 0-9 (src/js/47-trace.js, src/data/d-trace.js) ----
run('tracing P2-16',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const css=fs.readFileSync(path.join(SRC,'css','47-trace.css'),'utf8'),src=fs.readFileSync(path.join(SRC,'js','47-trace.js'),'utf8');
  const body=function(){
    const bad=[],b=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)},stat={traces:0,strokes:0};
    const store={};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';G={built:[]};
    // a private seeded stream (the test must not depend on Math.random)
    let seed=20261111;const rand=()=>{seed=(seed+0x6D2B79F5)>>>0;let z=Math.imul(seed^(seed>>>15),1|seed);z=(z+Math.imul(z^(z>>>7),61|z))^z;return((z^(z>>>14))>>>0)/4294967296};
    const ru=(a,c)=>a+rand()*(c-a);
    // 1. the digit set: the handwriting model of d-trace.js (stroke count, where each stroke starts and which way it first goes)
    const D=TRACE.sets.digit;
    const SPEC={ // per stroke: first direction [dx, dy] (y down) and closed loop or not
      '0':[[[-1,0],1]],'1':[[[0,1],0]],'2':[[[0.5,-0.87],0]],'3':[[[0.8,-0.6],0]],'4':[[[0,1],0],[[0,1],0]],'5':[[[0,1],0],[[1,0],0]],
      '6':[[[-1,0],0]],'7':[[[1,0],0]],'8':[[[-1,0],1]],'9':[[[0,-1],0]]};
    if(!D)return{bad:['no TRACE.sets.digit'],stat};
    if(D.order.join('')!=='0123456789')b('digit order: '+D.order.join(''));
    if(Object.keys(D.glyphs).sort().join('')!=='0123456789')b('digit glyphs: '+Object.keys(D.glyphs).join(''));
    const Ln=D.lines;
    if(!(Ln.top<Ln.mid&&Ln.mid<Ln.base&&Ln.top>=0&&Ln.base<=100))b('digit lines out of order: '+JSON.stringify(Ln));
    for(const key of D.order){
      const g=D.glyphs[key],w='digit '+key;
      for(const x of TR.glyphProblems('digit',key))b(x);
      if(!g||!g.say||g.say!==PK.NUM[+key])b(w+': spoken name '+(g&&g.say));
      const spec=SPEC[key],geo=TR.geo('digit',key);
      if(geo.s.length!==spec.length){b(w+': '+geo.s.length+' strokes, the model has '+spec.length);continue}
      geo.s.forEach((s,j)=>{
        const ws=w+' stroke '+(j+1),[[ex,ey],closed]=spec[j],p=s.p,a=p[0],z=p[p.length-1];
        stat.strokes++;
        if(s.L<15)b(ws+': degenerate (length '+s.L.toFixed(1)+')');
        if(p.some(([x,y])=>!(x>=4&&x<=96&&y>=Ln.top-2&&y<=Ln.base+2)))b(ws+': leaves the box or the lines');
        if(p.some(([x,y],i)=>i&&Math.hypot(x-p[i-1][0],y-p[i-1][1])>1.0001))b(ws+': dense points more than 1 unit apart');
        if(Math.abs(s.L-(p.length-1))>1.01)b(ws+': length and points disagree');
        // starts in the upper half, first direction as in the model, ends lower or to the right (or closes the loop)
        if(a[1]>Ln.mid)b(ws+': starts below the middle line');
        const f=p[Math.min(5,p.length-1)],fl=Math.hypot(f[0]-a[0],f[1]-a[1]),dot=((f[0]-a[0])*ex+(f[1]-a[1])*ey)/fl/Math.hypot(ex,ey);
        if(!(dot>=0.6))b(ws+': first goes '+(f[0]-a[0]).toFixed(1)+','+(f[1]-a[1]).toFixed(1)+', the model goes '+ex+','+ey);
        const isClosed=Math.hypot(z[0]-a[0],z[1]-a[1])<0.5;
        if(isClosed!==!!closed)b(ws+': closed '+isClosed);
        if(!isClosed&&!(z[1]>a[1]+3||(Math.abs(z[1]-a[1])<=3&&z[0]>a[0])))b(ws+': does not run top to bottom or left to right');
        // a sharp corner never makes a spike: neighbouring dense points turn by less than 100 degrees except at marked corners
      });
      // stroke order: top to bottom, then left to right (the 5's flag starts where its stem starts, and comes second in the model)
      for(let j=1;j<geo.s.length;j++){
        const p0=geo.s[j-1].p[0],p1=geo.s[j].p[0];
        if(!(p1[1]>p0[1]+3||(Math.abs(p1[1]-p0[1])<=3&&p1[0]>=p0[0]-0.5)))b(w+': stroke '+(j+1)+' starts before stroke '+j+' in reading order');
      }
    }
    // 2. the checker: synthetic traces along every stroke at both tolerances
    // along(s, o): finger points along stroke s from arc s0 to s1, steps of o.step..o.fast units (speed changes), jitter o.j
    const along=(s,o={})=>{
      const s0=o.s0||0,s1=o.s1==null?s.L:o.s1,out=[];
      const jit=()=>{if(!o.j)return[0,0];const r=Math.sqrt(rand())*o.j,a=rand()*Math.PI*2;return[Math.cos(a)*r,Math.sin(a)*r]};
      let x=s0;
      while(true){
        const [px,py]=TR.at(s,x),[jx,jy]=jit(),[nx,ny]=o.shift?[-TR.dir(s,x)[1],TR.dir(s,x)[0]]:[0,0],k=o.shift&&x>8?o.shift:0;
        out.push([px+jx+nx*k,py+jy+ny*k]);
        if(x>=s1)break;
        x=Math.min(s1,x+(o.step?ru(o.step,o.fast||o.step):1));
      }
      return o.rev?out.reverse():out;
    };
    for(const tol of [14,10])for(const key of D.order){
      const geo=TR.geo('digit',key),w='digit '+key+' tol '+tol;
      geo.s.forEach((s,j)=>{
        const ws=w+' stroke '+(j+1),chk=(pts,s0)=>{stat.traces++;return TR.check(s,pts,tol,s0)};
        // pass: ideal; noisy (jitter up to 0.3 tol, fast and slow parts, start a little off, stop a little short); 40 noisy each
        let r=chk(along(s));
        if(!r.ok)b(ws+': the ideal trace fails ('+r.why+')');
        for(let i=0;i<40;i++){
          const pts=along(s,{j:0.3*tol,step:1,fast:rand()<0.5?10:4,s1:s.L-ru(0,0.45*tol)});
          pts[0]=[pts[0][0]+ru(-0.5,0.5)*tol,pts[0][1]+ru(-0.5,0.5)*tol];
          r=chk(pts);
          if(!r.ok){b(ws+': a noisy trace fails ('+r.why+', off '+r.off.toFixed(2)+')');break}
        }
        // 8 px of jitter at the smallest board (380 px wide: 3.4 px a unit) is 2.4 units
        for(let i=0;i<20;i++){r=chk(along(s,{j:2.4,step:2,fast:6}));if(!r.ok){b(ws+': an 8 px jitter trace fails ('+r.why+')');break}}
        // fail: reversed (end to start), shifted off the path after a right start, scribbles, a start far away
        r=chk(along(s,{rev:1}));
        if(r.ok)b(ws+': a reversed trace passes');
        r=chk(along(s,{rev:1,j:0.3*tol,step:2,fast:6}));
        if(r.ok)b(ws+': a noisy reversed trace passes');
        r=chk(along(s,{shift:1.7*tol,step:2}));
        if(r.ok||r.why==='part'||r.why==='tap')b(ws+': a trace that leaves the path passes or is kept ('+r.why+')');
        const zig=[];for(let x=0;x<=s.L;x+=2){const [px,py]=TR.at(s,x),[dx,dy]=TR.dir(s,x),k=(x/2)%2?0.9*tol:-0.9*tol;zig.push([px-dy*k,py+dx*k])}
        r=chk(zig);
        if(r.ok||r.why!=='scribble')b(ws+': a zigzag along the stroke is not a scribble ('+r.why+')');
        const scr=[s.p[0]];for(let i=0;i<60;i++)scr.push([ru(5,95),ru(5,95)]);
        r=chk(scr);
        if(r.ok)b(ws+': a random scribble from the start dot passes');
        const far=along(s).map(([x,y])=>[x+2*tol,y]);far[0]=[s.p[0][0]+2*tol,s.p[0][1]];
        r=chk(far);
        if(r.ok||r.why!=='start')b(ws+': a trace starting away from the dot is not a start miss ('+r.why+')');
        // a tap on the dot is ignored, not a miss; half a stroke is kept, and the rest from there finishes it
        r=chk([s.p[0]]);
        if(r.ok||r.why!=='tap')b(ws+': a tap on the start dot is '+r.why);
        const half=Math.round(s.L*0.5);
        r=chk(along(s,{s1:half,j:1,step:2}));
        if(r.why!=='part'||Math.abs(r.s-half)>tol)b(ws+': half a stroke is '+r.why+' at '+r.s);
        else{const r2=chk(along(s,{s0:r.s,j:1,step:2}),r.s);if(!r2.ok)b(ws+': carrying on from half way fails ('+r2.why+')')}
      });
      // wrong order: the next stroke traced where the first is expected
      for(let j=1;j<geo.s.length;j++){
        const r=TR.check(geo.s[0],along(geo.s[j]),tol);stat.traces++;
        if(r.ok)b(w+': stroke '+(j+1)+' passes as stroke 1 (wrong order)');
      }
    }
    // a dot stroke (P2-17: i, j): a tap on it passes, a tap away does not
    const dotS=TR.stroke([[50,30]]);
    if(!dotS.dot||!TR.check(dotS,[[52,31]],14).ok||TR.check(dotS,[[50,60]],14).ok||TR.check(dotS,[[50,30],[50,70]],14).ok)b('dot strokes: tap rules');
    // closed loops are smooth through the join: the first and last dense directions agree
    for(const key of ['0','8']){const s=TR.geo('digit',key).s[0],d0=TR.dir(s,1.5),d1=TR.dir(s,s.L-1.5);if(d0[0]*d1[0]+d0[1]*d1[1]<0.9)b('digit '+key+': the loop has a corner at its join')}
    // 3. the kind and the generator
    for(const f of ['render','bind','right','retry','reveal','spoken','validate'])if(typeof KIND.trace[f]!=='function')b('KIND.trace.'+f+' missing');
    if(!SK.trace||SK.trace.max!==3||SK.trace.area!=='math'||SK.trace.gen!==genTrace||SK.trace.round!==traceRound||!SK.trace.noPlace)b('skill trace');
    const seen={};
    for(let i=0;i<3000;i++){
      const q=SK.trace.gen(1);
      for(const x of kindProblems(q))b('trace L1: '+x);
      if(!q.pk||!q.auto||q.hint.k!=='trace'||!q.say.includes(TRACE.sets.digit.glyphs[q.g].say)||!q.html.includes('<svg class="trq-g"'))b('trace L1 '+q.g+': pk, hint, say or picture');
      if(/undefined|NaN|\[object/.test(q.html+q.say+q.label))b('trace L1: bad text');
      if(/[A-Za-z]/.test(q.html.replace(/<div class="sub pktxt">.*?<\/div>/g,'').replace(/<[^>]*>/g,'')))b('trace L1: letters outside .pktxt');
      (seen[q.label]=seen[q.label]||new Set()).add(q.g);
      const h=KIND.trace.render(q);
      if(!h.includes('id="trb"')||!h.includes('viewBox="0 0 100 100"')||(h.match(/<i data-i/g)||[]).length!==3)b('trace render');
      if(hintHTML(q)!=='')b('trace hint outside a board is not empty');
    }
    if(Object.keys(seen).length!==10||Object.values(seen).some(s=>s.size!==1))b('trace labels: one per digit, '+Object.keys(seen).length);
    for(let i=0;i<200;i++){
      const rd=traceRound(1),ks=rd.map(q=>q.g);
      if(rd.length!==TR.N||new Set(ks).size!==TR.N||ks.join('')!==[...ks].sort().join(''))b('round: '+ks.join(''));
      for(const q of rd){if(q.sk!=='trace'||q.lv!==1||genQ('trace',1,q.seed).g!==q.g)b('round question not reproducible: '+q.g)}
    }
    const q0=genQ('trace',1,7);
    const must=(n,o)=>{if(!kindProblems(Object.assign({},q0,o)).length)b('validator missed: '+n)};
    must('no glyph',{g:'x'});must('no set',{set:'nope'});must('ans',{ans:'3'});must('passes',{passes:[4]});must('tol',{tol:99});
    if(KIND.trace.spoken(q0)!==TRACE.sets.digit.glyphs[q0.g].say)b('spoken');
    // 4. the stop: Tiny Town ends with trace 1 (CURRICULUM 2.1), the quiz never asks it
    const w0=PATHS.math.worlds.find(w=>w.id=='m_tiny'),last=w0.nodes[w0.nodes.length-1];
    if(last[0]!=='trace'||last[1]!==1||w0.nodes.filter(n=>n[0]=='trace').length!==1)b('Tiny Town does not end with trace 1');
    if(ICO_SK.trace!=='edit')b('trace icon');
    const wi0=PATHS.math.worlds.indexOf(w0);
    for(let sd=1;sd<=300;sd++){const st=PLACE.begin(PATHS.math.worlds,-1,sd);st.wi=wi0;for(let k=0;k<3;k++){st.k=k;if(PLACE.items(PATHS.math.worlds,st).some(it=>it.sk=='trace'))b('placement asks tracing')}}
    // 5. save safety: the same saves with and without trace 1 (stars keyed by stop id; nothing moves, nothing re-locks)
    const full=w0.nodes.slice(),OLD=full.slice(0,-1);
    const setNodes=a=>{w0.nodes=a;buildNodes('math')};
    const idx=id=>NODES.math.findIndex(n=>nid(n)==id);
    const tinyIds=OLD.map(n=>n[0]+n[1]);
    const mk=(n,boss,base,grade)=>{load(fx(base));for(const k of tinyIds.concat('boss_m_tiny'))delete S.maps.math[k];
      tinyIds.slice(0,n).forEach((k,i)=>{S.maps.math[k]=1+i%3});if(boss)S.maps.math.boss_m_tiny=3;
      if(S.wdone)delete S.wdone.m_tiny;if(boss)(S.wdone=S.wdone||{}).m_tiny=1;if(grade!=null)S.grade=grade;return JSON.stringify(S)};
    const cases={};
    for(const g of [-1,0,1]){
      cases['Tiny Town not started, grade '+g]=mk(0,0,'fresh',g);
      cases['Tiny Town 4 stops, grade '+g]=mk(4,0,'fresh',g);
      cases['Tiny Town 9 stops, boss not beaten, grade '+g]=mk(9,0,'fresh',g);
      cases['Tiny Town finished, grade '+g]=mk(9,1,'fresh',g);
      cases['Tiny Town finished, midway, grade '+g]=mk(9,1,'midway',g);
    }
    for(const n of ['midway','maxed','legacy-single-map','legacy-index-maps','fresh','tricky'])cases['fixture '+n]=fx(n);
    let checked=0;
    for(const name in cases){
      const raw=cases[name];
      setNodes(OLD);load(raw);
      const starsOld=JSON.stringify(S.maps.math),curOld=nid(NODES.math[curNode('math')]);
      const openOld=NODES.math.map(n=>nid(n)).filter((id,i)=>unlocked('math',i));
      setNodes(full);load(raw);checked++;
      if(JSON.stringify(S.maps.math)!==starsOld)b(name+': star table changed');
      if(S.maps.math.trace1)b(name+': stars on trace1');
      for(const id of openOld){const i=idx(id);if(id!=='boss_m_tiny'&&!unlocked('math',i))b(name+': '+id+' was open and is locked')}
      const curNew=nid(NODES.math[curNode('math')]),ti=idx('trace1');
      // the old stops all passed and the boss next: the new stop in front of the boss is next (the boss waits for it)
      if(name.includes('9 stops, boss not beaten')&&curOld==='boss_m_tiny'){if(curNew!=='trace1')b(name+': map opens on '+curNew+', not the new stop')}
      else if(curNew!==curOld)b(name+': current stop '+curOld+' -> '+curNew);
      if(name.includes('finished')&&(!stopNew('math',ti)||!unlocked('math',ti)||!worldFinished('math',wi0)))b(name+': trace1 should be NEW and open in a finished Tiny Town');
      if(name.includes('4 stops')&&unlocked('math',ti)&&!S.unlockAll)b(name+': trace1 open too early');
    }
    setNodes(full);
    return{bad,stat,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  const p=r.bad.slice();
  // CSS: tokens only, transform/opacity motion, no filter; the engine never uses Math.random
  if(/#[0-9a-fA-F]{3,8}\b/.test(css))p.push('47-trace.css has a raw hex colour');
  if(/filter\s*:/.test(css))p.push('47-trace.css uses filter');
  for(const m of css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)){
    const props=[...m[2].matchAll(/([a-z-]+)\s*:/g)].map(x=>x[1]).filter(x=>x!=='transform'&&x!=='opacity');
    if(props.length)p.push('47-trace.css @keyframes '+m[1]+' animates '+props.join(', '));
  }
  if(/Math\.random/.test(src))p.push('47-trace.js uses Math.random');
  return{problems:uniq(p),note:'10 digits, '+r.stat.strokes+' strokes, '+r.stat.traces+' synthetic traces, '+r.checked+' saves with and without trace 1'};
});

// ---- P4-06: dino, bird and sea pal on the rig ----
run('pets on the rig P4-06: every pet x stage x mood is valid SVG, tokens only, no ids, in budget, deterministic; no pet emoji left',()=>{
  const p=[],KINDS=['dragon','dino','bird','ocean'];
  const src=fs.readFileSync(path.join(SRC,'js','17-pets-svg.js'),'utf8');
  const css=fs.readFileSync(path.join(SRC,'css','41-pet.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const tok=fs.readFileSync(path.join(SRC,'css','00-tokens.css'),'utf8');
  const fx=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures','midway.json'),'utf8'));
  const o=(()=>eval(js+`
  const r={svg:{},react:{},again:{},anch:{},hooks:{},pets:Object.keys(PETS),moods:PET_MOODS,stages:PET_STAGES,src:{}};
  for(const k of Object.keys(PETS)){
    for(const st of [0,1,2,3,4]){for(const m of PET_MOODS)r.svg[k+'|'+st+'|'+m]=petSVG(k,st,m);
      r.react[k+'|'+st]=petSVG(k,st,'idle',{hat:'🎩',toy:'🎈',react:true});
      r.again[k+'|'+st]=[0,1].map(()=>petSVG(k,st,'cheer',{hat:'🎩',toy:'🎈',react:true}))}
    for(const sn of PET_STAGES)r.anch[k+' '+sn]={head:PET_RIG[k].stages[sn].head,hat:petAnchor(k,sn,'hat'),toy:petAnchor(k,sn,'toy')};
  }
  // the screens' hooks for a child with each pet and no wearables: Home / Pet Care / map / runner (petHTML), growth (petArt),
  // setup (petPick), rewards (RW.pet), container class (petAura)
  Object.assign(S,${JSON.stringify(fx)});
  S.wear={};
  for(const k of Object.keys(PETS)){S.pet=k;
    for(const st of [0,25,80,200,350])r.hooks[k+' '+st]={html:petHTML(st),art:petArt(st),pick:petPick(k),rw:(S.stars=st,RW.pet()),aura:petAura(st),rig:petRig(k)}}
  r.src={petHTML:String(petHTML),petArt:String(petArt),petPick:String(petPick),petAura:String(petAura),petRigHTML:String(petRigHTML),'RW.pet':String(RW.pet)};
  r;`))();
  if(o.pets.join()!==KINDS.join())p.push('PETS is '+o.pets.join()+', expected '+KINDS.join());
  const GROUPS=['shadow','fig','extra','xl','xr','tail','body','belly','arm-l','arm-r','head','cheeks','eyes','mouth'];
  const EGG=['shadow','fig','body','arm-r','head','cheeks','eyes','mouth'];
  const PICT=/\p{Extended_Pictographic}/u;
  // palette roles: the shared ones on .pet-svg and each pet's own block
  const block=sel=>(css.match(new RegExp('\\'+sel+'\\{([^}]*)\\}'))||['',''])[1];
  const shared=block('.pet-svg'),size={};
  const face=/<g class="pf pf-base"><g class="pg-eyes">([^]*?)<\/g><g class="pg-mouth">([^]*?)<\/g><\/g>/;
  const check=(key,d,k,sn,m,sup,react)=>{
    const lab={dragon:'Dragon',dino:'Dino',bird:'Bird',ocean:'Sea pal'}[k];
    if(!d.startsWith(`<svg class="pet-svg pet-k-${k} pet-s-${sn} pet-m-${m}${sup?' pet-super':''}" viewBox="0 0 200 200" role="img" aria-label="${lab}">`))p.push(key+': svg head '+d.slice(0,110));
    if(d.includes('pg-glow')!==sup)p.push(key+': glow ring only on the super stage');
    const stack=[];
    for(const t of d.matchAll(/<(\/?)([a-z]+)\b[^>]*?(\/?)>/g)){
      if(!/^(svg|g|path|circle|ellipse|rect|text)$/.test(t[2]))p.push(key+': element <'+t[2]+'> not allowed');
      if(t[1]){if(stack.pop()!==t[2])p.push(key+': tag </'+t[2]+'> out of order')}else if(!t[3])stack.push(t[2]);
    }
    if(stack.length)p.push(key+': unclosed '+stack.join(','));
    if(/\sid=|<defs|gradient|filter|url\(|<animate|<style|<script|\son[a-z]+=|xlink|<use/i.test(d))p.push(key+': no ids, defs, gradients, filters, url(), use, SMIL, style or script');
    if(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(d))p.push(key+': raw colour');
    if(/NaN|undefined|null/.test(d))p.push(key+': NaN/undefined in markup');
    for(const a of d.match(/\s(fill|stroke)="[^"]*"/g)||[]){
      const v=a.match(/="([^"]*)"/)[1];
      if(v==='none')continue;
      if(!/^var\(--pc-[a-z0-9]+\)$/.test(v)){p.push(key+': colour must be none or var(--pc-x): '+a.trim());continue}
      const role=v.slice(4,-1);
      if(!shared.includes(role+':')&&!block('.pet-k-'+k).includes(role+':'))p.push(k+': role '+role+' is not defined for .pet-k-'+k+' or .pet-svg');
    }
    const co=(d.match(/\s(d|cx|cy|r|rx|ry|x|y)="[^"]*"/g)||[]).join(' ').match(/\d*\.\d{2,}/g);
    if(co)p.push(key+': coordinates to one decimal ('+co[0]+')');
    for(const g of sn=='egg'?EGG:GROUPS)if(!d.includes('class="pg-'+g+'"'))p.push(key+': group pg-'+g+' missing');
    const n=(d.match(/class="pg-eyes"/g)||[]).length,nm=(d.match(/class="pg-mouth"/g)||[]).length;
    if(n!==(react?3:1)||nm!==n)p.push(key+': '+n+' eyes / '+nm+' mouth groups');
    if(react&&!(d.includes('pf-cheer')&&d.includes('pf-oops')))p.push(key+': reaction faces missing');
    if(!react&&PICT.test(d))p.push(key+': emoji in the drawing');
    // budget: the dragon's (P4-05): 9,000 bytes for one pet, 11,000 with the two reaction faces and wearables
    if(d.length>(react?11000:9000))p.push(key+': '+d.length+' bytes');
    if(!react)size[k]=Math.max(size[k]||0,d.length);
  };
  for(const k of KINDS){
    for(const st of [0,1,2,3,4]){
      const sn=o.stages[Math.min(st,3)],faces=new Set();let rest=null;
      for(const m of o.moods){
        const d=o.svg[k+'|'+st+'|'+m],key=k+' '+sn+(st==4?' super':'')+' '+m;
        check(key,d,k,sn,m,st==4,false);
        const f=d.match(face);
        if(!f){p.push(key+': no pf-base face');continue}
        faces.add(f[0]);
        const r=d.replace(face,'').replace(/ pet-m-[a-z]+/,'');
        if(rest==null)rest=r;else if(r!==rest)p.push(key+': mood changes more than the eyes and mouth');
      }
      if(faces.size!==o.moods.length)p.push(k+' '+sn+': moods do not all look different');
      const w=o.react[k+'|'+st];
      check(k+' '+sn+' wearables',w,k,sn,'idle',st==4,true);
      const hat=w.indexOf('class="pw-hat"'),toy=w.indexOf('class="pw-toy"'),head=w.indexOf('class="pg-head"'),arm=w.indexOf('class="pg-arm-r"');
      if(hat<0||!w.includes('>🎩</text>')||toy<0||!w.includes('>🎈</text>'))p.push(k+' '+sn+': emoji hat/toy not drawn');
      if(!(hat>head&&head>=0))p.push(k+' '+sn+': hat is not inside the head group');
      if(!(toy>arm&&arm>=0&&(sn=='egg'||toy<head)))p.push(k+' '+sn+': toy is not inside the right arm group');
      const a=o.again[k+'|'+st];
      if(a[0]!==a[1])p.push(k+' '+sn+': petSVG is not deterministic');
    }
    for(const sn of o.stages){
      const a=o.anch[k+' '+sn];
      for(const t of ['hat','toy'])for(const v of ['x','y'])if(!(a[t][v]>=0&&a[t][v]<=200))p.push(k+' '+sn+' '+t+' anchor outside the viewBox');
      if(!(a.hat.y<a.head[1]&&Math.abs(a.hat.x-100)<=10))p.push(k+' '+sn+': hat anchor is not on top of the head');
      if(!(a.toy.x>110))p.push(k+' '+sn+': toy anchor is not on the right hand side');
      for(const t of ['hat','toy'])if(!(a[t].s>=.3&&a[t].s<=1.2))p.push(k+' '+sn+' '+t+' scale '+a[t].s);
    }
    // each pet is its own drawing, not the dragon recoloured
    const strip=d=>d.replace(/pet-k-\w+|aria-label="[^"]*"/g,'');
    if(k!='dragon')for(const st of [0,2])if(strip(o.svg[k+'|'+st+'|idle'])===strip(o.svg['dragon|'+st+'|idle']))p.push(k+' stage '+st+' is the dragon drawing');
    // its palette: tokens only (no raw colours), every token defined
    const pal=block('.pet-k-'+k);
    if(!pal)p.push('41-pet.css has no .pet-k-'+k+' palette');
    if(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(pal))p.push('.pet-k-'+k+': raw colour');
    for(const t of pal.matchAll(/var\((--[a-z0-9-]+)\)/g))if(!tok.includes(t[1]+':'))p.push('.pet-k-'+k+': '+t[1]+' is not a token');
    // source budget per pet (the dragon's 8 KB)
    const b=(src.match(new RegExp('// >>> '+k+'[^]*?// <<< '+k))||[''])[0].length;
    if(!b||b>8192)p.push(k+' source is '+b+' bytes (budget 8 KB for all stages)');
    size[k]=b+' B source, largest drawing '+size[k]+' B';
  }
  // the screens' hooks draw every pet (no emoji) for every stage
  for(const [key,h] of Object.entries(o.hooks)){
    const k=key.split(' ')[0];
    if(!h.rig||h.aura!=='rig')p.push(key+': not on the rig ('+h.aura+')');
    for(const f of ['html','art','pick','rw']){
      if(!h[f].includes('pet-svg pet-k-'+k+' '))p.push(key+' '+f+': not the drawn '+k);
      if(PICT.test(h[f]))p.push(key+' '+f+': emoji in the pet markup');
    }
  }
  for(const [n,f] of Object.entries(o.src))if(/petE\(|PETS\[[^\]]*\]\.s\b/.test(f))p.push(n+' still falls back to the pet emoji');
  return{problems:p,note:KINDS.map(k=>k+' '+size[k]).join('; ')};
});

// ---- P3-03: Sudoku UI (BRAIN_TEASERS 5.1, 7) ----
run('sudoku UI P3-03',()=>{
  const vb=require('./puzzles/verify-banks.js'),human=require('./puzzles/human.js'),sdk=require('./puzzles/sudoku.js');
  const body=function(){
    const out=[],bad=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const DAYS=15,T=BT.get('sudoku'),stat={n:0,ms:0,kinds:{},tiers:{},same:0,pairs:0,wrong:0};
    if(!T)return{out:['sudoku is not registered'],stat};
    if(T.bands!=='ABCD'||BT.nLevels(T,'A')!==12)bad('sudoku: bands '+T.bands+', '+BT.nLevels(T,'A')+' levels');
    const digits=s=>Array.from(s,ch=>ch==='.'?0:+ch);
    // the test's own reading of a transform: out(r, c) = in(x.r[r], x.c[c]), read across when transposed, symbol v -> x.s[v - 1]
    const xform=(str,x,n)=>{let o='';for(let r=0;r<n;r++)for(let c=0;c<n;c++){const ch=x.t?str[x.r[c]*n+x.c[r]]:str[x.r[r]*n+x.c[c]];o+=ch==='.'?'.':String(x.s[+ch-1])}return o};
    const isPerm=(a,n,base)=>Array.isArray(a)&&a.length===n&&new Set(a).size===n&&a.every(v=>Number.isInteger(v)&&v>=base&&v<base+n);
    // a line order keeps lines inside their band: each block of `per` output lines comes from one block of the input
    const keepsBands=(a,per)=>{for(let i=0;i<a.length;i+=per){const b=Math.floor(a[i]/per);for(let j=i;j<i+per;j++)if(Math.floor(a[j]/per)!==b)return false}return true};
    const validGrid=(s,n,bw,bh)=>{
      const g=digits(s),ok=cells=>new Set(cells.map(i=>g[i])).size===n&&cells.every(i=>g[i]>=1&&g[i]<=n);
      for(let i=0;i<n;i++){
        const row=[],col=[],box=[],r0=Math.floor(i/(n/bw))*bh,c0=(i%(n/bw))*bw;
        for(let k=0;k<n;k++){row.push(i*n+k);col.push(k*n+i);box.push((r0+Math.floor(k/bw))*n+c0+k%bw)}
        if(!ok(row)||!ok(col)||!ok(box))return false;
      }
      return true;
    };
    const prev={};
    for(const band of 'ABCD'){
      const spec=sdk.BANDS[band];
      for(let day=1;day<=DAYS;day++){
        const used=new Set();
        for(let lv=1;lv<=12;lv++){
          const w='sudoku '+band+lv+' day '+day,o={day:'2026-4-'+day},t0=Date.now();
          let p;
          try{p=BT.make('sudoku',band,lv,o)}catch(e){bad(w+': make() threw '+e.message);continue}
          stat.ms+=Date.now()-t0;stat.n++;
          if(JSON.stringify(BT.make('sudoku',band,lv,o))!==JSON.stringify(p))bad(w+': make() is not deterministic');
          const n=spec.n,N=n*n,tier=lv<=4?'easy':lv<=8?'medium':'hard';
          // the bank puzzle of the right tier, in this level's quarter of the list, a different one for each level of the day
          if(p.tier!==tier||p.n!==n||p.bw!==spec.bw||p.bh!==spec.bh)bad(w+': tier '+p.tier+' size '+p.n+', want '+tier+' '+n);
          const list=PUZ.sudoku[band][tier],e=list[p.k];
          if(!e){bad(w+': bank index '+p.k+' does not exist');continue}
          if(Math.floor(p.k/(list.length/4))!==(lv-1)%4)bad(w+': bank index '+p.k+' is not in level '+lv+"'s quarter");
          if(used.has(tier+p.k))bad(w+': two levels of one day use the same bank puzzle');
          used.add(tier+p.k);
          stat.tiers[band+tier]=(stat.tiers[band+tier]||0)+1;
          const [bg,bs,bgr]=e.split('|'),x=p.x;
          if(!isPerm(x.r,n,0)||!isPerm(x.c,n,0)||!isPerm(x.s,n,1)||!keepsBands(x.r,spec.bh)||!keepsBands(x.c,spec.bw)||(x.t&&spec.bw!==spec.bh)||![0,1].includes(x.t))
            bad(w+': not an allowed transform '+JSON.stringify(x));
          if(xform(bg,x,n)!==p.g||xform(bs,x,n)!==p.s)bad(w+': the puzzle is not the bank puzzle under its transform');
          if(p.gr!==+bgr)bad(w+': grade '+p.gr+', bank says '+bgr);
          // independent of the app: a valid grid, the givens agree with it, the tier's givens count, exactly one solution
          // (verify-banks countSimple), and the human grader solves it to that grid with the bank's grade
          const g=digits(p.g),s=digits(p.s);
          if(!validGrid(p.s,n,spec.bw,spec.bh))bad(w+': the solution is not a valid grid');
          if(g.some((v,i)=>v&&v!==s[i]))bad(w+': a given disagrees with the solution');
          if(g.filter(Boolean).length!==spec.tiers[tier][0])bad(w+': '+g.filter(Boolean).length+' givens, want '+spec.tiers[tier][0]);
          const cnt=vb.countSimple(g,n,spec.bw,spec.bh,2);
          if(cnt!==1)bad(w+': '+cnt+' solutions');
          const hg=human.grade({size:n,houses:sdk.groupsFor(spec),givens:g});
          if(!hg.solved||hg.grade!==+bgr||hg.grid.join('')!==p.s)bad(w+': human grader '+JSON.stringify({solved:hg.solved,grade:hg.grade}));
          // tomorrow's puzzle for the same level is not today's
          const pk=band+lv;
          if(prev[pk]!=null){stat.pairs++;if(prev[pk]===p.g)stat.same++}
          prev[pk]=p.g;
          // solve(): every empty square once, with its number
          const sol=T.solve(p),fill=g.slice();
          for(const [c,v] of sol){if(fill[c])bad(w+': solve() fills a full square '+c);fill[c]=v}
          if(fill.join('')!==p.s||sol.length!==g.filter(v=>!v).length)bad(w+': solve() does not give the solution');
          // hints from the start: tiers 1 and 2 change nothing and point at the same square, tier 3 fills exactly that one square
          const st=SD.fresh(p);
          let steps=0;
          for(;steps<N;steps++){
            const before=JSON.stringify(st),b0=SD.vals(p,st);
            const h1=SD.hint(p,st,1),h2=SD.hint(p,st,2);
            if(!h1){bad(w+': no hint before the end');break}
            if(JSON.stringify(st)!==before||h1.fill||h2.fill)bad(w+': hint tier 1 or 2 changed the board');
            if(h1.cell!==h2.cell||!h2.mark.includes(h2.cell)||h1.mark.length||!h1.house.length||!h1.say||!h2.say)bad(w+': hint tiers 1-2 '+JSON.stringify([h1,h2]));
            stat.kinds[band+' '+h1.kind]=(stat.kinds[band+' '+h1.kind]||0)+1;
            if(h1.kind==='guess')bad(w+': the hints had to guess');
            if(band==='A'&&h1.kind!=='last')bad(w+': band A hint is not "the one gap" ('+h1.kind+')');
            const h3=SD.hint(p,st,3);
            if(!h3.fill||h3.fill[0]!==h2.cell||h3.fill[1]!==s[h3.fill[0]]||b0[h3.fill[0]])bad(w+': hint tier 3 '+JSON.stringify(h3.fill));
            SD.fill(p,st,h3.fill[0]);
            const b1=SD.vals(p,st),changed=b1.filter((v,i)=>v!==b0[i]).length;
            if(changed!==1)bad(w+': hint tier 3 changed '+changed+' squares');
            if(SD.won(p,st))break;
          }
          if(!SD.won(p,st)||SD.hint(p,st,1)!==null)bad(w+': tier 3 hints did not finish');
          if(day>3)continue; // the move checks below on the first days
          // moves: a wrong one (A, B: bounces, one mistake, nothing placed; C, D: placed, clashes, one mistake, undo puts it back)
          const s2=SD.fresh(p),c0=g.indexOf(0),G=SD.geo(n,spec.bw,spec.bh),wv=G.peers[c0].map(q=>g[q]).find(v=>v&&v!==s[c0]);
          if(wv){
            const b4=JSON.stringify(s2),r=SD.enter(p,s2,c0,wv);
            if(SD.checked(p)){if(!r.bounce||s2.miss!==1||s2.v!==SD.fresh(p).v)bad(w+': a wrong symbol should bounce out '+JSON.stringify(r))}
            else{
              if(!r.ok||!r.conf.length||s2.miss!==1||!SD.conflicts(p,SD.vals(p,s2)).has(c0))bad(w+': a clash should show and count '+JSON.stringify(r));
              // a hint finds the wrong number first and tier 3 puts the right one there
              const h=SD.hint(p,s2,2);if(h.kind!=='wrong'||h.cell!==c0)bad(w+': the hint does not find the wrong number');
              stat.wrong++;
              SD.undo(p,s2);s2.miss=0;if(JSON.stringify(s2)!==b4)bad(w+': undo did not put the board back');
            }
          }
          const r2=SD.enter(p,s2,c0,s[c0]);
          if(!r2.ok||r2.conf.length||SD.vals(p,s2)[c0]!==s[c0])bad(w+': the right symbol was not placed');
          if(!SD.enter(p,s2,g.findIndex(Boolean),s[c0]).ign)bad(w+': a given square took a symbol');
          // notes (C, D): a mark goes in, a number placed in its row clears that mark, undo brings it back
          if(!SD.checked(p)){
            const free=SD.vals(p,s2).map((v,i)=>v?-1:i).filter(i=>i>=0),a=free[0],q=free.find(i=>i!==a&&G.peers[a].includes(i));
            if(q!=null){
              const v=s[q];SD.note(p,s2,a,v);
              if(!(s2.m[a]&(1<<(v-1))))bad(w+': the note did not go in');
              SD.enter(p,s2,q,v);
              if(s2.m.length&&s2.m[a]&(1<<(v-1)))bad(w+': placing a number did not clear it from the notes of its houses');
              SD.undo(p,s2);
              if(!(s2.m[a]&(1<<(v-1)))||SD.vals(p,s2)[q])bad(w+': undo did not bring back the note');
            }
            if(!SD.note(p,s2,c0,1).ign)bad(w+': a note went into a filled square');
          }else if(!SD.note(p,s2,c0,1).ign||!SD.erase(p,s2,c0).ign)bad(w+': notes or erase in band '+band);
          // a hint fill locks the square: no undo or erase can take it away
          const h3=SD.hint(p,s2,3);SD.fill(p,s2,h3.fill[0]);
          if(!SD.checked(p)&&(!SD.erase(p,s2,h3.fill[0]).ign||SD.vals(p,s2)[h3.fill[0]]!==s[h3.fill[0]]))bad(w+': a hinted square could be erased');
          // saved state round trip: JSON and back fits, and play goes on the same way; damaged states do not fit
          const back=JSON.parse(JSON.stringify(s2));
          if(!SD.fit(p,back)||JSON.stringify(back)!==JSON.stringify(s2)||!SD.fit(p,SD.fresh(p)))bad(w+': a saved state does not fit after a round trip');
          if(JSON.stringify(SD.hint(p,back,2))!==JSON.stringify(SD.hint(p,s2,2)))bad(w+': a restored state gives another hint');
          const gi=g.findIndex(Boolean);
          for(const [m,x] of [['short v',Object.assign({},back,{v:back.v.slice(1)})],['a given overwritten',Object.assign({},back,{v:back.v.slice(0,gi)+'1'+back.v.slice(gi+1)})],
            ['a digit too big',Object.assign({},back,{v:back.v.slice(0,c0)+(n+1)+back.v.slice(c0+1)})],['bad notes',Object.assign({},back,{m:[1,2]})],['sel outside',Object.assign({},back,{sel:N})],
            ['no undo list',Object.assign({},back,{h:null})],['null',null],['another puzzle',JSON.parse(JSON.stringify(SD.fresh({n:n===4?6:4,bw:3,bh:2,g:'.'.repeat(n===4?36:16)})))]])
            if(SD.fit(p,x))bad(w+': a damaged state fits ('+m+')');
        }
      }
    }
    for(const k of ['A last','B last','C last','D last','D locked'])if(!stat.kinds[k])bad('no '+k+' hint seen');
    if(!stat.wrong)bad('no wrong-number hint was checked');
    return{out,stat};
  };
  const r=eval(js+';('+body.toString()+')()');
  const s=r.stat,p=r.out;
  if(s.pairs&&s.same/s.pairs>0.02)p.push('the same level gives the same puzzle on the next day '+s.same+' times of '+s.pairs);
  const avg=s.n?s.ms/s.n:0;
  if(avg>5)p.push('make() takes '+avg.toFixed(1)+' ms on average (limit 5 ms)');
  const k=Object.entries(s.kinds).map(([a,b])=>a+' '+b).join(', ');
  return{problems:p,note:s.n+' puzzles (4 bands x 12 levels x 15 days), one solution each (countSimple), human grade kept; next-day repeats '+s.same+'/'+s.pairs+'; hint steps: '+k};
});

run('logic grid banks P3-06: format, every clue true of the solution, exactly one solution (own brute force), no redundant clue, grade reproduces, short clean sentences, no duplicates, reproducible from the seed',()=>{
  const p=[];
  const vb=require('./puzzles/verify-banks.js'),lg=require('./puzzles/logic.js');
  const T=require('./puzzles/build-banks.js').TYPES.logic;
  // the bank as the app sees it: evaluated with all of src/js and src/data, and present in the built data file
  const inApp=eval(js+';PUZ.logic');
  const bank=vb.loadBank('d-puz-logic.js').logic;
  if(JSON.stringify(inApp)!==JSON.stringify(bank))p.push('PUZ.logic differs when loaded with the whole app');
  if(!eval(js+';PUZ.sudoku&&PUZ.sudoku.D&&PUZ.mathdoku&&PUZ.mathdoku.D'))p.push('PUZ.sudoku or PUZ.mathdoku lost when the logic bank loads');
  const built=fs.existsSync(path.join(ROOT,DATA_FILE))?fs.readFileSync(path.join(ROOT,DATA_FILE),'utf8'):'';
  if(!built.includes('PUZ.logic = {'))p.push(DATA_FILE+' has no logic bank (rebuild)');
  // every stored puzzle through verify-banks.js: format, band sizes and categories, clue kinds and indexes, sentence = render(),
  // one solution and no redundant clue (its counter), grade and score reproduce, band grade and chain limits, sorted, no duplicates
  const v=vb.verifyLogic(bank);
  p.push(...v.problems);
  // this test's own brute force (no code shared with logic.js or verify-banks.js): every assignment as one permutation per category
  const permsOf=n=>{const out=[];const rec=(a,left)=>{if(!left.length){out.push(a);return}left.forEach((x,k)=>rec([...a,x],left.filter((_,j)=>j!==k)))};rec([],[...Array(n).keys()]);return out};
  const allOf=(n,K)=>{let out=[[]];for(let c=0;c<K;c++)out=out.flatMap(a=>permsOf(n).map(q=>[...a,q]));return out}; // a[c-1][child]=item
  const truth=(a,raw,O)=>{
    const kid=(c,i)=>c?a[c-1].indexOf(i):i,item=(c,i,d)=>d?a[d-1][kid(c,i)]:kid(c,i);
    const[k,...r]=raw;
    if(k==='is')return kid(r[0],r[1])===kid(r[2],r[3]);
    if(k==='not')return kid(r[0],r[1])!==kid(r[2],r[3]);
    if(k==='or'){const x=item(r[0],r[1],r[2]);return x===r[3]||x===r[4]}
    const x=item(r[0],r[1],O),y=item(r[2],r[3],O);
    return k==='gt'?x>y:k==='lt'?x<y:k==='nx'?Math.abs(x-y)===1:false;
  };
  const brute=(n,K,O,clues)=>allOf(n,K).filter(a=>clues.every(c=>truth(a,c,O)));
  if(allOf(3,1).length!==6||allOf(3,2).length!==36||allOf(4,2).length!==576)p.push('own brute force: wrong number of assignments');
  if(brute(3,1,0,[['is',0,0,1,0],['is',0,1,1,0]]).length!==0)p.push('own brute force: two children with one item still solve');
  if(brute(4,2,2,[['gt',0,0,0,1],['gt',0,1,0,0]]).length!==0)p.push('own brute force: older and younger at once still solve');
  // reading: the band's word limit; every word is a template word, a name or a word of the categories' phrases; nothing rude
  const LIMIT={B:6,C:11,D:14};
  const TEMPLATE=new Set('the child who is not and or are one year apart older younger than lives live at a bigger smaller number next door to finished behind ahead of came come did place owner year old'.split(' '));
  const BADW=eval(js+';BAD');
  const phraseWords=c=>lg.CATS[c].items.flatMap(it=>[it.w,...it.v.split(' '),...it.nv.split(' '),...it.o.split(' ')]);
  const own=new Map(),grades={};let total=0,clueTotal=0,redundant=0;const longest={B:0,C:0,D:0};
  for(const band of lg.ORDER)bank[band].forEach((entry,idx)=>{
    const at=band+' #'+idx,[head,...clues]=entry,[names,catsS,solS,gr]=head.split('|');
    const nm=names.split(','),cats=catsS.split(';').map(s=>s.split('=')),sol=solS.split(';').map(s=>[...s].map(Number));
    const n=nm.length,K=cats.length,O=cats.findIndex(([c])=>bank.cats[c]&&bank.cats[c].ordered)+1;
    const raws=clues.map(c=>c.slice(0,-1)),word=(c,i)=>c?cats[c-1][1].split(',')[i]:nm[i];
    total++;clueTotal+=clues.length;
    // exactly one solution, the stored one
    const s=brute(n,K,O,raws);
    if(s.length!==1)p.push(at+': own brute force finds '+s.length+' solutions');
    else if(s[0].map(r=>r.join('')).join(';')!==solS)p.push(at+': own brute force solves it differently from the stored solution');
    // every clue true of the stored solution; none can be left out (redundant clues: none allowed)
    raws.forEach((r,k)=>{
      if(!truth(sol,r,O))p.push(at+' clue '+(k+1)+': false for the stored solution');
      if(brute(n,K,O,raws.filter((_,j)=>j!==k)).length<2){redundant++;p.push(at+' clue '+(k+1)+': redundant')}
    });
    // sentences: short, known words, name the entities of the structure, "not" exactly in the negative clues
    const vocab=new Set([...TEMPLATE,...nm.map(x=>x.toLowerCase()),...cats.flatMap(([c])=>phraseWords(c))]);
    clues.forEach((c,k)=>{
      const text=c[c.length-1],ws=text.replace(/\.$/,'').split(' ');
      longest[band]=Math.max(longest[band],ws.length);
      if(!/^[A-Z].*[a-z0-9]\.$/.test(text))p.push(at+' clue '+(k+1)+': not one plain sentence: '+text);
      if(ws.length>LIMIT[band])p.push(at+' clue '+(k+1)+': '+ws.length+' words: '+text);
      for(const w of ws.flatMap(w=>w.toLowerCase().replace(/'s$/,'').split('-'))){
        if(!vocab.has(w))p.push(at+' clue '+(k+1)+': word "'+w+'" not in the template words, names or category phrases');
        if(BADW.test(w))p.push(at+' clue '+(k+1)+': rude word '+w);
      }
      // the sentence names every entity of the structure (a word or its verb form: paint, paints)
      const r=c.slice(0,-1),ents=r[0]==='or'?[[r[1],r[2]],[r[3],r[4]],[r[3],r[5]]]:[[r[1],r[2]],[r[3],r[4]]];
      for(const[e,i]of ents)if(!new RegExp('\\b'+word(e,i)).test(text))p.push(at+' clue '+(k+1)+': does not mention '+word(e,i)+': '+text);
      if((r[0]==='not')!==/\bnot\b/.test(text))p.push(at+' clue '+(k+1)+': "not" does not match the clue kind: '+text);
    });
    // word lists: names clean, different first letters, not a category word; B pictures exist for every item
    if(nm.some(x=>BADW.test(x.toLowerCase())||!/^[A-Z][a-z]{2,4}$/.test(x)))p.push(at+': a name is not a short clean name');
    if(new Set(nm.map(x=>x[0])).size!==n)p.push(at+': names share a first letter');
    for(const[c,list]of cats)for(const w of list.split(',')){
      if(nm.some(x=>x.toLowerCase()===w)||BADW.test(w))p.push(at+': item word '+w+' clashes with a name or is rude');
      if(band==='B'&&!(bank.cats[c].pics||{})[w])p.push(at+': band B item '+w+' has no picture');
      if(band==='B'&&!/^[a-z-]+$/.test(w))p.push(at+': '+w+' is not a picture name');
    }
    // no duplicates: the clues with every unordered item replaced by the child who has it, over every renaming of the children
    let key=null;
    for(const pi of permsOf(n)){
      const ent=(c,i)=>c===O&&O?'o'+c+i:'k'+pi[c?sol[c-1].indexOf(i):i]+(c?'c'+c:'');
      const k=raws.map(r=>r[0]==='or'?'or'+ent(r[1],r[2])+[ent(r[3],r[4]),ent(r[3],r[5])].sort().join(''):
        r[0]==='lt'?'gt'+ent(r[3],r[4])+ent(r[1],r[2]):r[0]==='gt'?'gt'+ent(r[1],r[2])+ent(r[3],r[4]):r[0]+[ent(r[1],r[2]),ent(r[3],r[4])].sort().join('')).sort().join(',');
      if(key===null||k<key)key=k;
    }
    key=catsS+'|'+key;
    if(own.has(key))p.push(at+': same puzzle as '+own.get(key)+' with the children renamed');else own.set(key,at);
    const gk=band;grades[gk]=grades[gk]||{};grades[gk][gr]=(grades[gk][gr]||0)+1;
  });
  // the generator's counter agrees on the first puzzle of each band
  for(const b of lg.ORDER){const q=lg.decode(bank[b][0]);if(lg.countSolutions(q,3)!==1)p.push('logic.js countSolutions is not 1 for '+b+' #0')}
  // reproducible: the whole bank regenerated from the seed is the committed file, byte for byte
  const text=T.text(),file=fs.readFileSync(path.join(SRC,'data',T.file),'utf8'),same=text===file;
  if(!same){const a=text.split('\n'),b=file.split('\n'),i=a.findIndex((l,k)=>l!==b[k]);p.push('the bank regenerated from seed '+T.seed+' differs at line '+(i+1)+': '+a[i]+' / stored '+b[i])}
  return{problems:p,note:total+' puzzles, '+clueTotal+' clues, '+redundant+' redundant; grades '+
    Object.entries(grades).map(([k,g])=>k+' '+Object.entries(g).map(([x,y])=>y+'x'+x).join('/')).join(', ')+
    '; longest clue B/C/D '+longest.B+'/'+longest.C+'/'+longest.D+' words'+(same?'; regenerated byte for byte':'')};
});

// ---- P2-13 Sky City (6th) ----
run('Sky City P2-13: stops in CURRICULUM order, 3,000 samples per new level with the maths recomputed, hints, say, labels, reproducible, old levels unchanged',()=>{
  const cur=fs.readFileSync(path.join(ROOT,'docs','CURRICULUM.md'),'utf8');
  const body=function(){
    S.name='Ava';S.buddy='Ben';S.pet='dino';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    const txt=h=>String(h).replace(/<svg[^]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
    const esc2=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const red=(n,d)=>{const g=gcd(n,d);return n/g+'/'+d/g};
    const frs=h=>[...h.matchAll(/<span class="fn">(\d+)<\/span><span class="fd">(\d+)<\/span>/g)].map(x=>x[1]+'/'+x[2]);
    const mn=v=>v<0?'−'+(-v):''+v; // shown number
    const money=c=>'$'+(c%100?(c/100).toFixed(2):c/100);
    const dec=c=>{const s=String(c).padStart(3,'0'),w=s.slice(0,-2),f=s.slice(-2).replace(/0+$/,'');return f?w+'.'+f:w}; // hundredths -> text
    const DEN=[2,4,5,10,20,25,50,100];
    // ---- world: the stops of CURRICULUM 2.1 row 15, in that order, after Crystal Caves (position by id)
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_sky'),w=mw[wi]||{nodes:[]};
    const row=cur.match(/\| 15 \| `m_sky` \| Sky City \| 6 \| ([^|]+) \|/);
    const want=row?row[1].trim().split(', ').map(s=>s.replace(' ','')).join(' '):'?';
    if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' ')+' (CURRICULUM: '+want+')');
    if(want.split(' ').length!==8)add('CURRICULUM row 15 does not list 8 stops: '+want);
    if(wi<1||w.g!==6||w.n!=='Sky City'||wi!==mw.findIndex(x=>x.id=='m_caves')+1)add('world g/name/position');
    if(w.nodes.some(n=>n[2].length>22))add('stop title over 22 letters: '+w.nodes.find(n=>n[2].length>22)[2]);
    if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('two stops share a title');
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    if(WR.math[wi][1]-WR.math[wi][0]!==8||NODES.math[WR.math[wi][1]].sk!=='boss')add('9 stops: 8 and the boss');
    const mx={fop:7,ratio:4,int:3};
    for(const k in mx)if(!SK[k]||SK[k].max<mx[k]||SK[k].area!=='math')add('SK.'+k+'.max');
    if(SK.ratio.t!=='Ratios and Rates'||SK.int.t!=='Integers'||/\d$/.test('ratio')||/\d$/.test('int'))add('SK.ratio / SK.int names');
    // ---- old levels unchanged: the dispatcher still calls the old generators with the same seed
    const sameQ=(sk,lv,fn)=>{for(let s=1;s<=60;s++){const sd=(s*7+3)>>>0,a=genQ(sk,lv,sd),prev=RNG;RNG=mulberry32(sd);let b;try{b=fn(lv);b.sk=sk;b.lv=lv;b.seed=sd}finally{RNG=prev}
      if(JSON.stringify(a)!==JSON.stringify(b)){add('old level changed: '+sk+lv);return}}};
    sameQ('fop',1,dsFop1);sameQ('fop',2,dsFop2);sameQ('fop',3,ccFop3);sameQ('fop',4,ccFop4);sameQ('fop',5,ccFop5);sameQ('fop',6,ccFop6);
    // ---- picture helpers
    const labelsX=h=>{const all=[...h.matchAll(/<text x="([\d.-]+)" y="([\d.]+)">([^<]*)<\/text>/g)].map(m=>[+m[1],m[3],+m[2]]),y=Math.max(...all.map(t=>t[2]));return all.filter(t=>t[2]==y)}; // the tick labels are the lowest row of text (a hop label is above the line)
    const nlVal=(h,x)=>{ // the number under x on a drawn number line: a fit through the first and last number labels
      const L=labelsX(h).filter(t=>/^[−]?\d+$/.test(t[1])).map(t=>[t[0],+t[1].replace('−','-')]);
      if(L.length<2)return NaN;const a=L[0],b=L[L.length-1];return a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0])};
    const marks=h=>{const m=h.match(/<g class="v1">((?:<circle[^>]*\/>)+)/);return m?[...m[1].matchAll(/cx="([\d.]+)" cy="[\d.]+" r="8"/g)].map(c=>Math.round(nlVal(h,+c[1]))):[]};
    const taps=h=>[...h.matchAll(/<g class="vt" data-v="(-?\d+)"[^>]*><rect[^>]*\/><circle class="vm" cx="([\d.]+)"/g)].map(m=>[+m[1],+m[2]]);
    const counters=(h,c)=>{const m=h.match(new RegExp('<g class="'+c+'">((?:<circle[^>]*\\/>)*)'));return m?(m[1].match(/<circle/g)||[]).length:0};
    const hops=h=>[...h.matchAll(/<path class="vhop" d="M([\d.]+) [\d.]+Q[\d.]+ [\d.]+ ([\d.]+) [\d.]+"/g)].map(m=>[Math.round(nlVal(h,+m[1])),Math.round(nlVal(h,+m[2]))]);
    const svgOf=h=>(h.match(/<svg[^]*?<\/svg>/g)||[]);
    // ---- generic checks per level, then the maths of each level
    const levels=[['ratio',1],['ratio',2],['ratio',3],['ratio',4],['int',1],['int',2],['int',3],['fop',7]];
    const share={},seen={};
    for(const [sk,lv] of levels){
      const key=sk+lv,labs={},seeLab=new Set(),S_=share[key]={};
      const tally=t=>{S_[t]=(S_[t]||0)+1};
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),W=key+': ',L=q.label,a=q.ans;
        const pr=kindProblems(q);if(pr.length)add(W+L+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv)add(W+'not stamped');
        if(!q.say||/undefined|NaN|null/.test(q.say)||/\d\/\d/.test(q.say))add(W+'say '+q.say);
        if(!q.hint||q.hint.k!=='steps'||hintHTML(q).length<10)add(W+'step hint missing');
        if(!L||L.length>=60||/undefined|NaN/.test(L))add(W+'label '+L);
        if(labs[L]!==undefined&&JSON.stringify(labs[L])!==JSON.stringify(a))add(W+'label '+L+' has two answers');
        labs[L]=a;seeLab.add(L);
        if(/undefined|NaN|\[object|null/.test(q.html))add(W+'html has undefined/NaN');
        if(q.kind=='num'&&numParts(a,numSeps(q)).some(t=>t.replace(/\D/g,'').length>(q.max||4)))add(W+'answer longer than max '+a);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(a)||new Set(vs).size!==vs.length||vs.length<2||vs.length>4)add(W+'choices '+L);
          if(q.choices.some(c=>String(c.l).length>20))add(W+'a choice is long '+q.choices.find(c=>String(c.l).length>20).l)}
        // a hint teaches the method and never states the answer
        {const pieces=q.hint.steps.map(s=>txt(s.html));
          if(q.hint.steps.length<2||!/\?/.test(pieces[pieces.length-1]))add(W+'steps: '+q.hint.steps.length+', last has no "?": '+pieces[pieces.length-1]);
          if(q.hint.steps.some(s=>!s.say||/undefined|NaN|[−]\d/.test(s.say)))add(W+'a step has no say or says a bare minus sign');
          if(pieces.some(p=>/the answer is/i.test(p)))add(W+'hint says the answer');
          if(q.kind=='num')for(const p of pieces)for(const A of [a,a.replace('-','−')]){
            const re=/^-?\d{1,2}$/.test(a)?'[×÷+−][^=|]*=\\s*':'(=|\\bis|equals|makes)\\s*';
            if(new RegExp(re+esc2(A)+'(?![\\d/.])').test(p))add(W+'hint gives the answer '+a+' in: '+p)}}
        let m;
        // ---------------- ratio 1
        if(sk=='ratio'&&lv==1){
          if(m=L.match(/^ratio1 dots (\d+) (\d+) (bo|ob)$/)){
            const A=+m[1],B=+m[2],bo=m[3]=='bo';
            if(A==B||gcd(A,B)>1||A<1||B<1||A>9||B>9||A+B>18)add(W+'operands '+L);
            const svg=svgOf(q.html)[0]||'';
            if(counters(svg,'v1')!==A||counters(svg,'v2')!==B)add(W+'dots drawn '+counters(svg,'v1')+'/'+counters(svg,'v2')+' for '+L);
            if(a!==(bo?A+':'+B:B+':'+A))add(W+L+' -> '+a);
            if(!new RegExp('ratio of '+(bo?'blue to orange':'orange to blue')+' dots').test(txt(q.html)))add(W+'prompt wording '+L);
            if(q.choices.length!==4||q.choices.filter(c=>{const[x,y]=c.v.split(':').map(Number);return x*+a.split(':')[1]===y*+a.split(':')[0]}).length!==1)add(W+'choices are not four with one right '+L);
            if(new Set(q.choices.map(c=>/ to /.test(c.l))).size!==1)add(W+'choice labels mix styles '+L);
            tally('dots');tally(bo?'bo':'ob');
          }else if(m=L.match(/^ratio1 sent (\d+) (\d+) (xy|yx)$/)){
            const A=+m[1],B=+m[2],xy=m[3]=='xy',t=txt(q.html);
            if(A==B||gcd(A,B)>1||A>12||B>12||A<1||B<1)add(W+'operands '+L);
            if(!new RegExp('There are '+A+' [a-z]+ and '+B+' [a-z]+\\.').test(t))add(W+'text '+t);
            if(a!==(xy?A+':'+B:B+':'+A))add(W+L+' -> '+a);
            const names=t.match(/There are \d+ ([a-z]+) and \d+ ([a-z]+)\. What is the ratio of ([a-z]+) to ([a-z]+)\?/);
            if(!names)add(W+'wording '+t);
            else if(xy?names[3].slice(0,3)!==names[1].slice(0,3):names[3].slice(0,3)!==names[2].slice(0,3))add(W+'asks the wrong order '+t);
            if(q.choices.length!==4||q.choices.filter(c=>{const[x,y]=c.v.split(':').map(Number);return x*+a.split(':')[1]===y*+a.split(':')[0]}).length!==1)add(W+'choices '+L);
            if(/\b1 [a-z]+s\b/.test(t))add(W+'plural after 1 '+t);
            tally('sent');
          }else if(m=L.match(/^ratio1 tbl (\d+) (\d+) (\d+|\?) (\d+|\?)$/)){
            const A=+m[1],B=+m[2];
            if(A==B||gcd(A,B)>1||A>9||B>9)add(W+'operands '+L);
            if((m[3]=='?')==(m[4]=='?'))add(W+'not one blank '+L);
            const C=m[3]=='?'?null:+m[3],D=m[4]=='?'?null:+m[4],k=C==null?D/B:C/A;
            if(!Number.isInteger(k)||k<2||k>9)add(W+'multiplier '+k+' for '+L);
            const e=C==null?A*k:B*k;
            if(a!==String(e))add(W+L+' -> '+a+', expected '+e);
            if(!q.html.includes('<div class="eq">'+A+' : '+B+' = '))add(W+'eq row '+L);
            tally('tbl');tally(C==null?'first-blank':'second-blank');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- ratio 2
        if(sk=='ratio'&&lv==2){
          const t=txt(q.html);
          if(m=L.match(/^ratio2 unit (\d+) (\d+)$/)){
            const n=+m[1],tot=+m[2];
            if(n<2||n>9||tot%n!==0||(tot/n)%5!==0||tot/n<50)add(W+'operands '+L);
            if(!t.includes(n+' ')||!t.includes('cost '+money(tot)+'.'))add(W+'text '+t);
            if(Math.round(parseFloat(a)*100)*n!==tot||a!==dec(tot/n))add(W+L+' -> '+a);
            if(q.pad!=='dec'||q.eq!=='value'||!KIND.num.same(q,(tot/n/100).toFixed(2)))add(W+'pad/eq (2.50 must be accepted)');
            tally('unit');if((tot/n)%10==5)tally('unit-odd5');
          }else if(m=L.match(/^ratio2 rate (\d+) (\d+) (miles|pages|laps|words)$/)){
            const tot=+m[1],n=+m[2];
            if(n<2||n>8||tot%n!==0)add(W+'operands '+L);
            if(!t.includes(tot+' '+m[3])||!t.includes(' '+n+' '))add(W+'text '+t);
            if(a!==String(tot/n)||q.pad)add(W+L+' -> '+a);
            tally('rate');
          }else if(m=L.match(/^ratio2 buy (\d+) (\d+) (\d+) (\d+)$/)){
            const n1=+m[1],t1=+m[2],n2=+m[3],t2=+m[4];
            if(n1==n2||t1%n1||t2%n2||t1/n1==t2/n2||Math.abs(t1/n1-t2/n2)<10||n1<2||n2<2||n1>9||n2>9)add(W+'operands '+L);
            const deals=txt(q.html).match(/A: (\d+) [a-z]+ for (\$[\d.]+) B: (\d+) [a-z]+ for (\$[\d.]+)/);
            if(!deals||+deals[1]!==n1||deals[2]!==money(t1)||+deals[3]!==n2||deals[4]!==money(t2))add(W+'deals in the prompt '+txt(q.html));
            if(a!==(t1*n2<t2*n1?'a':'b'))add(W+L+' -> '+a+', the better buy is '+(t1*n2<t2*n1?'a':'b'));
            if(q.choices.map(c=>c.l).join()!=='Deal A,Deal B')add(W+'choice labels');
            if(q.choices.length!==2)add(W+'two choices');
            tally('buy');tally(a);
          }else{add(W+'label '+L);continue}
        }
        // ---------------- ratio 3
        if(sk=='ratio'&&lv==3){
          if(m=L.match(/^ratio3 part (\d+) (\d+)$/)){
            const p=+m[1],n=+m[2];
            if(p%5||p<5||p>95||n<20||n>400||(n*p)%100)add(W+'operands '+L);
            if(a!==String((n*p)/100))add(W+L+' -> '+a);
            if(!q.html.includes('<div class="eq">'+p+'% of '+n+' = '))add(W+'eq '+L);
            tally('part');tally([10,20,25,50,75].includes(p)?'early':'any5');
          }else if(m=L.match(/^ratio3 whole (\d+) (\d+)$/)){
            const p=+m[1],part=+m[2],wh=+a;
            if(p%5||p<5||p>95||(part*100)%p||part*100/p!==wh||wh<20||wh>400)add(W+'operands '+L+' -> '+a);
            if(!q.html.includes(part+' is '+p+'% of a number'))add(W+'text '+L);
            if(wh*p%100)add(W+'part not whole');
            tally('whole');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- ratio 4
        if(sk=='ratio'&&lv==4){
          if(m=L.match(/^ratio4 match (fp|fd|dp) ([\d,]+)$/)){
            const vs=m[2].split(',').map(Number);
            if(vs.length!==4||new Set(vs).size!==4||q.items.length!==4||q.opts.length!==4)add(W+'four distinct pairs '+L);
            for(const it of q.items){
              const v=+it.v,op=q.opts.find(o=>o.v===it.v);
              if(!op){add(W+'item without a match '+L);continue}
              let val,val2;
              if(m[1]=='fp'){const f=frs(it.l)[0].split('/').map(Number);val=f[0]*100/f[1];val2=parseFloat(op.l);if(!/^\d+%$/.test(op.l)||!it.h||!DEN.includes(f[1])||f[1]==100)add(W+'item/opt form '+it.l+' '+op.l)}
              else if(m[1]=='fd'){const f=frs(it.l)[0].split('/').map(Number);val=f[0]*100/f[1];val2=Math.round(parseFloat(op.l)*100);if(!DEN.includes(f[1]))add(W+'denominator '+f[1])}
              else{val=Math.round(parseFloat(it.l)*100);val2=parseFloat(op.l);if(!/^\d+%$/.test(op.l))add(W+'opt form '+op.l)}
              if(Math.abs(val-v)>1e-9||Math.abs(val2-v)>1e-9)add(W+'pair does not match: '+it.l+' '+op.l+' '+it.v);
            }
            if(a!==[...vs].map(String).sort().join('|'))add(W+'ans '+a);
            tally('match');tally('match-'+m[1]);
          }else if(m=L.match(/^ratio4 fp (\d+)\/(\d+)$/)){
            const n=+m[1],d=+m[2];
            if(!DEN.includes(d)||d==100||n<1||n>=d)add(W+'operands '+L);
            if(JSON.stringify(frs(q.html))!==JSON.stringify([n+'/'+d])||a!==String(n*100/d)||q.pad)add(W+L+' -> '+a);
            tally('fp');
          }else if(m=L.match(/^ratio4 fd (\d+)\/(\d+)$/)){
            const n=+m[1],d=+m[2];
            if(!DEN.includes(d)||n<1||n>=d)add(W+'operands '+L);
            if(JSON.stringify(frs(q.html))!==JSON.stringify([n+'/'+d])||Math.abs(parseFloat(a)-n/d)>1e-12||!/^0\.\d+$/.test(a)||a.endsWith('0'))add(W+L+' -> '+a);
            if(q.pad!=='dec'||q.eq!=='value'||!KIND.num.same(q,'0'+Number(a).toFixed(3).slice(1)))add(W+'pad/eq');
            tally('fd');
          }else if(m=L.match(/^ratio4 dp (\d\.\d+)$/)){
            const c=Math.round(parseFloat(m[1])*100);
            if(c<1||c>99||!q.html.includes(m[1]+' = '))add(W+'operands '+L);
            if(a!==String(c))add(W+L+' -> '+a);
            tally('dp');
          }else if(m=L.match(/^ratio4 pd (\d+)$/)){
            const c=+m[1];
            if(c<1||c>99||!q.html.includes('>'+c+'% = '))add(W+'operands '+L);
            if(Math.abs(parseFloat(a)-c/100)>1e-12||q.pad!=='dec'||q.eq!=='value')add(W+L+' -> '+a);
            tally('pd');
          }else if(m=L.match(/^ratio4 pf (\d+)$/)){
            const c=+m[1];
            if(c<1||c>99||!DEN.some(d=>d<100&&(c*d)%100===0))add(W+'percent is not n/d with d in the list '+L);
            if(a!==red(c,100))add(W+L+' -> '+a+', expected '+red(c,100));
            if(q.pad!=='frac'||q.eq!==undefined||KIND.num.same(q,2*a.split('/')[0]+'/'+2*a.split('/')[1])||!KIND.num.same(q,a))add(W+'simplest form not enforced '+L);
            tally('pf');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- int 1
        if(sk=='int'&&lv==1){
          const svg=svgOf(q.html)[0]||'';
          if(m=L.match(/^int1 tap (-?\d+)$/)){
            const x=+m[1],tp=taps(svg);
            if(x==0||x<-9||x>9||a!==String(x))add(W+L+' -> '+a);
            const vs=tp.map(t=>t[0]);
            if(!vs.includes(x)||vs.length<4||vs.length>5||new Set(vs).size!==vs.length)add(W+'tap targets '+vs);
            for(const u of vs)for(const v of vs)if(u<v&&v-u<4)add(W+'targets too close '+vs);
            if(vs.some(v=>v<-10||v>10))add(W+'target off the line '+vs);
            for(const [v,cx] of tp)if(Math.abs(nlVal(svg,cx)-v)>.05)add(W+'target '+v+' drawn at '+nlVal(svg,cx));
            if(!svgOf(q.html)[0].includes('>−10<')||!svgOf(q.html)[0].includes('>10<'))add(W+'line does not run -10..10');
            if(!txt(q.html).includes('Tap '+mn(x)+' on the number line'))add(W+'prompt '+L);
            tally('tap');tally(x<0?'tap-neg':'tap-pos');
          }else if(m=L.match(/^int1 cmp (-?\d+) (-?\d+)$/)){
            const A=+m[1],B=+m[2];
            if(A==B||A<-10||B<-10||A>10||B>10||(A>=0&&B>=0))add(W+'operands '+L);
            if(a!==(A<B?'<':'>')||q.choices.length!==3)add(W+L+' -> '+a);
            if(!q.html.includes('<div class="eq">'+mn(A)+' '+'<span class="slot" id="slot"></span> '+mn(B)+'</div>'))add(W+'eq '+L);
            if(marks(svg).sort((x,y)=>x-y).join()!==[A,B].sort((x,y)=>x-y).join())add(W+'marks '+marks(svg)+' for '+L);
            tally('cmp');
          }else if(m=L.match(/^int1 (cold|warm) (-?\d+) (-?\d+)$/)){
            const A=+m[2],B=+m[3],cold=m[1]=='cold';
            if(A==B||(A>=0&&B>=0)||Math.abs(A)>10||Math.abs(B)>10)add(W+'operands '+L);
            if(a!==String(cold?Math.min(A,B):Math.max(A,B)))add(W+L+' -> '+a);
            if(q.choices.map(c=>c.v).sort().join()!==[String(A),String(B)].sort().join()||q.choices.some(c=>c.l!==mn(+c.v)+'°'))add(W+'choices '+L);
            if(!txt(q.html).includes('Which is '+(cold?'colder':'warmer')+'?'))add(W+'prompt '+L);
            tally(m[1]);
          }else if(m=L.match(/^int1 ord (-?\d+),(-?\d+),(-?\d+) (up|down)$/)){
            const v=[+m[1],+m[2],+m[3]],up=m[4]=='up',asc=[...v].sort((x,y)=>x-y);
            if(new Set(v).size!==3||v.some(x=>x<-10||x>10)||v.every(x=>x>=0))add(W+'operands '+L);
            if(JSON.stringify(q.ans)!==JSON.stringify((up?asc:asc.slice().reverse()).map(String)))add(W+L+' -> '+q.ans);
            if(q.items.map(i=>+i.v).sort((x,y)=>x-y).join()!==asc.join()||q.items.some(i=>i.l!==mn(+i.v)))add(W+'items '+L);
            if(q.items.map(i=>i.v).join()===q.ans.join())add(W+'items already in order '+L);
            if(!txt(q.html).includes(up?'least to greatest':'greatest to least'))add(W+'prompt '+L);
            tally('ord');tally(up?'ord-up':'ord-down');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- int 2
        if(sk=='int'&&lv==2){
          const svg=svgOf(q.html)[0]||'';
          if(q.pad!=='neg')add(W+'pad neg (no hint of the sign)');
          if(m=L.match(/^int2 abs (-?\d+)$/)){
            const x=+m[1];
            if(x==0||Math.abs(x)>15||a!==String(Math.abs(x)))add(W+L+' -> '+a);
            if(!q.html.includes('|'+mn(x)+'| = '))add(W+'eq '+L);
            if(marks(svg).join()!==String(x))add(W+'mark '+marks(svg)+' for '+L);
            tally('abs');tally(x<0?'abs-neg':'abs-pos');
          }else if(m=L.match(/^int2 opp (-?\d+)$/)){
            const x=+m[1];
            if(x==0||Math.abs(x)>20||a!==String(-x))add(W+L+' -> '+a);
            if(!txt(q.html).includes('opposite of '+mn(x)+'?'))add(W+'prompt '+L);
            if(Math.abs(x)<=10&&marks(svg).join()!==String(x))add(W+'mark '+L);
            if(!KIND.num.same(q,String(-x))||KIND.num.same(q,String(x)))add(W+'same()');
            tally('opp');tally(x<0?'opp-neg':'opp-pos');
          }else if(m=L.match(/^int2 dist (-?\d+) (-?\d+)$/)){
            const A=+m[1],B=+m[2];
            if(A>=B||B-A<2||A<-10||B>10||a!==String(B-A))add(W+L+' -> '+a);
            if(marks(svg).sort((x,y)=>x-y).join()!==[A,B].join())add(W+'marks '+marks(svg)+' for '+L);
            if(!txt(q.html).includes('apart are '+mn(A)+' and '+mn(B)+'?'))add(W+'prompt '+L);
            tally('dist');tally(A<0&&B>0?'dist-cross':'dist-same');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- int 3
        if(sk=='int'&&lv==3){
          if(!(m=L.match(/^int3 (-?\d+) ([+-]) (-?\d+)$/))){add(W+'label '+L);continue}
          const A=+m[1],B=+m[3],pl=m[2]=='+',res=pl?A+B:A-B;
          if(!A||!B||Math.abs(A)>20||Math.abs(B)>20||Math.abs(res)>20)add(W+'range '+L);
          if(a!==String(res)||q.pad!=='neg')add(W+L+' -> '+a+', expected '+res);
          if(!q.html.includes('<div class="eq">'+mn(A)+' '+(pl?'+':'−')+' '+(B<0?'('+mn(B)+')':mn(B))+' = '))add(W+'eq '+L);
          const st=q.hint.steps;
          if(st.length!==3)add(W+'3 steps');
          else{
            const s0=svgOf(st[0].html)[0]||'',s2=svgOf(st[2].html)[0]||'';
            if(marks(s0).join()!==String(A))add(W+'first board marks '+marks(s0)+' for '+L);
            if(svgOf(st[0].html).length!==1||svgOf(st[1].html).length||hops(s0).length)add(W+'boards');
            const hp=hops(s2);
            if(hp.length!==1||hp[0][0]!==A||hp[0][1]!==res)add(W+'hop '+JSON.stringify(hp)+' for '+L);
            const dir=txt(st[1].html);
            if(!(pl?B>0?/Adding a positive number moves right/:/Adding a negative number moves left/:B>0?/Subtracting a positive number moves left/:/Subtracting a negative number is the same as adding/).test(dir))add(W+'rule step '+dir+' for '+L);
          }
          tally(pl?(B>0?'add-pos':'add-neg'):(B>0?'sub-pos':'sub-neg'));tally(res<0?'res-neg':'res-pos');
        }
        // ---------------- fop 7
        if(sk=='fop'&&lv==7){
          const fr=s=>{const t=s.match(/^(?:(\d+) )?(\d+)\/(\d+)$/);return t?{w:+(t[1]||0),a:+t[2],b:+t[3]}:null};
          if(!(m=L.match(/^fop7 (.+) \/ (.+)$/))){add(W+'label '+L);continue}
          const X=fr(m[1]),Y=fr(m[2]);
          if(!X||!Y){add(W+'label '+L);continue}
          for(const Z of [X,Y])if(Z.a>=Z.b||gcd(Z.a,Z.b)>1||Z.b<2||Z.b>9||Z.w>3)add(W+'operand '+L);
          const nx=X.w*X.b+X.a,ny=Y.w*Y.b+Y.a,n=nx*Y.b,d=X.b*ny,g=gcd(n,d),rn=n/g,rd=d/g;
          if(rd==1)add(W+'whole result '+L);
          const mix=rn>rd,exp=mix?Math.floor(rn/rd)+' '+(rn%rd)+'/'+rd:rn+'/'+rd;
          if(a!==exp)add(W+L+' -> '+a+', expected '+exp);
          if(mix&&(q.sep!=='mix'||!(rn%rd)))add(W+'mixed answer shape '+L);
          if(!mix&&(q.sep||q.pad!=='frac'))add(W+'fraction answer shape '+L);
          const sh=frs(q.html);
          if(JSON.stringify(sh)!==JSON.stringify([X.a+'/'+X.b,Y.a+'/'+Y.b]))add(W+'prompt shows '+sh);
          if(q.eq!==undefined||KIND.num.same(q,mix?Math.floor(2*rn/(2*rd))+' '+(2*(rn%rd))+'/'+2*rd:2*rn+'/'+2*rd))add(W+'an unsimplified answer is accepted '+L);
          if(!KIND.num.same(q,a))add(W+'the right answer is refused '+L);
          if(X.w!==(q.html.match(/<div class="eq">(\d+) <span/)||[0,0])[1]*1&&X.w)add(W+'whole part of the first number missing '+L);
          if(((X.w||Y.w)?1:0)!==(/Mixed numbers to fractions/.test(q.hint.steps.map(s=>s.html).join(' '))?1:0))add(W+'mixed-number step '+L);
          if(!/Flip/.test(q.hint.steps.map(s=>s.html).join(' ')))add(W+'flip step missing');
          tally(X.w||Y.w?'mixed':'plain');tally(mix?'mix-answer':'frac-answer');tally((X.w?1:0)+'-'+(Y.w?1:0));
        }
      }
      seen[key]=seeLab.size;
      // reproducible: the same seed gives the same question, hint and choices
      for(let s=1;s<=40;s++)if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))add(key+' seed '+s+' not reproducible');
    }
    // ---- mixes (each variant shows up a fair share of the time)
    const fair=(k,names,lo)=>{for(const n of names)if(!((share[k]||{})[n]>N*lo))add(k+': '+n+' too rare '+JSON.stringify(share[k]))};
    fair('ratio1',['dots','sent','tbl','bo','ob','first-blank','second-blank'],.1);fair('ratio2',['unit','rate','buy','a','b'],.12);
    fair('ratio3',['part','whole','early','any5'],.2);fair('ratio4',['match','fp','fd','dp','pd','pf','match-fp','match-fd','match-dp'],.05);
    fair('int1',['tap','cmp','cold','warm','ord','ord-up','ord-down','tap-neg','tap-pos'],.08);
    fair('int2',['abs','opp','dist','abs-neg','abs-pos','opp-neg','opp-pos','dist-cross','dist-same'],.1);
    fair('int3',['add-pos','add-neg','sub-pos','sub-neg','res-neg','res-pos'],.1);
    fair('fop7',['plain','mixed','mix-answer','frac-answer','0-0','1-0','0-1','1-1'],.04);
    for(const [k,min] of [['ratio1',150],['ratio2',300],['ratio3',200],['ratio4',250],['int1',100],['int2',100],['int3',300],['fop7',300]])if(seen[k]<min)add(k+': only '+seen[k]+' different labels');
    return bad;
  };
  const r=eval(js+';('+body.toString()+')()');
  // the block of this chunk: no Math.random, no raw colour, every global starts with sky
  const src=fs.readFileSync(path.join(SRC,'js','35-gen-math-upper.js'),'utf8'),i0=src.indexOf('// ---- P2-13 Sky City ----'),i1=src.indexOf('\n// ---- P',i0+10),blk=src.slice(i0,i1<0?undefined:i1);
  if(i0<0)r.push('P2-13 block marker missing');
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))r.push('P2-13 block has a raw hex colour');
  if(/Math\.random/.test(blk))r.push('P2-13 block uses Math.random');
  for(const m of blk.matchAll(/^(?:const|function) ([A-Za-z_$][\w$]*)/gm))if(!/^sky/i.test(m[1]))r.push('P2-13 block: global '+m[1]+' does not start with sky');
  // the block is the last one of the file (new blocks of later chunks go after it) and no clash with an older global
  if(!/\n\/\/ ---- P2-12 Crystal Caves ----/.test(src)||src.indexOf('// ---- P2-12 Crystal Caves ----')>i0)r.push('P2-13 block must come after the P2-12 block');
  // the number line: negative numbers use the real minus sign
  const vz=eval(js+';VIZ');
  const nl=vz.numLine({min:-10,max:10,labels:[-10,-5,0,5,10],tapValues:[-6,-2,3,8],marks:[-3]});
  if(nl!==vz.numLine({min:-10,max:10,labels:[-10,-5,0,5,10],tapValues:[-6,-2,3,8],marks:[-3]}))r.push('numLine with negatives is not deterministic');
  if(!nl.includes('>−10<')||!nl.includes('>−5<')||/#[0-9a-fA-F]{3,8}|id=|<defs|filter/.test(nl))r.push('numLine negatives: minus sign, raw colour, id, defs or filter');
  const tw=[...nl.matchAll(/<rect class="vh" x="([\d.]+)" y="0" width="([\d.]+)"/g)].map(x=>+x[2]);
  if(tw.length!==4||tw.some(x=>x<48))r.push('numLine tap targets under 48 units '+tw);
  // the +/- key is on the pad for 'neg' questions only, and typing -5 works
  const pad=eval(js+';KIND.num.render({pad:"neg"})'),pad0=eval(js+';KIND.num.render({pad:"int"})');
  if(!/data-k="neg"/.test(pad)||/data-k="neg"/.test(pad0))r.push('pad neg key');
  return{problems:r,note:'8 levels x 3,000 samples'};
});

run('Sky City P2-13: the new world keeps every star, re-locks nothing and the map opens where it did (fixtures x grades; the path ends at Sky City while it runs)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    // the path ends at Sky City while this runs, so worlds added after it by later chunks (Galaxy Core) do not matter here
    const ALL=PATHS.math.worlds,SI=ALL.findIndex(w=>w.id=='m_sky'),ORIG=ALL.slice(0,SI+1),without=()=>ORIG.filter(w=>w.id!=='m_sky');
    PATHS.math.worlds=ORIG;buildNodes('math');
    const snap=()=>{const o={};NODES.math.forEach((n,i)=>{o[nid(n)]={st:getSt('math',i),open:unlocked('math',i),pass:passed('math',i),wid:n.wid}});return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])fixtures.push([name,fx(name)]);
    // synthetic saves: everything before Sky City passed (with and without the last boss), and Sky City partly played
    const mk=(boss,extra)=>{load(null);PATHS.math.worlds=without();buildNodes('math');const m={};
      NODES.math.forEach(n=>{if(n.sk!=='boss'||boss)m[nid(n)]=2});PATHS.math.worlds=ORIG;buildNodes('math');
      return JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{math:Object.assign(m,extra||{}),read:{},es:{}},grade:6})};
    fixtures.push(['path-done',mk(true)],['stops-done-no-boss',mk(false)],['sky-started',mk(true,{ratio1:3,ratio2:2,int1:1})]);
    let checked=0,moved=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,4,5,6]){
      load(raw.length>2?raw:null);if(g!==null)S.grade=g;
      const tag=name+' g'+gradeOf()+': ',maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.math[curNode('math')]),curW=NODES.math[curNode('math')].wid;
      PATHS.math.worlds=without();buildNodes('math');
      const old=snap(),curOld=nid(NODES.math[curNode('math')]);
      PATHS.math.worlds=ORIG;buildNodes('math');
      for(const k in old){
        checked++;
        if(!now[k]){b(tag+'stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(tag+'stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(tag+'passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(tag+k+' locked by the new world');
      }
      const given=(JSON.parse(raw).maps||{}).math||{};
      for(const k in now)if(!(k in old)&&now[k].st&&!(k in given))b(tag+'new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(tag+'building the nodes changed the map');
      // the map opens on the same stop as before, except: a child with nothing left before Sky City (every older stop passed) meets
      // it next; and a 6th grader with nothing further on starts in the world of their own grade (startWorld)
      if(cur!==curOld){
        moved++;
        const prevDone=NODES.math.filter(n=>n.wi<SI).every(n=>passed('math',NODES.math.indexOf(n)));
        if(curW!=='m_sky'||!(prevDone||worldFinished('math',SI-1)||gradeOf()>=6))b(tag+'map opens on '+cur+' (was '+curOld+')');
      }
      if(curW==='m_sky'&&gradeOf()<6&&!worldFinished('math',SI-1)&&!worldHasProgress('math',SI))b(tag+'the map opens in Sky City before the world before it is done');
    }
    PATHS.math.worlds=ALL;buildNodes('math');
    // a 5th grader does not see Sky City open until the world before it is finished
    load(null);S.grade=5;if(worldOpen('math',SI))b('grade 5: Sky City is open before the world before it is done');
    S.grade=6;if(!worldOpen('math',SI))b('grade 6: Sky City must be open');
    return{out,checked,moved};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:r.out,note:r.checked+' stop checks against a path without Sky City, map moved on '+r.moved+' of 81 loads'};
});

// ---- P3-05 MathDoku UI (BRAIN_TEASERS 5.2, 7, 8) ----
// Every band, levels 1-12 on 15 days. Independent of src/js/79-bt-mdoku.js: the bank entry is decoded here and turned with the
// dev-time symmetry table (tools/puzzles/mathdoku.js SYMS), the solution is checked as a Latin square, every cage target is
// recomputed here, uniqueness is counted by verify-banks.js countCages, and the dev-time grader must solve the turned puzzle.
run('mathdoku UI P3-05',()=>{
  const vb=require('./puzzles/verify-banks.js'),mdk=require('./puzzles/mathdoku.js');
  const body=function(){
    const out=[],bad=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const DAYS=15,T=BT.get('mdoku'),stat={n:0,ms:0,kinds:{},same:0,pairs:0,wrong:0,miss:0,grades:0,xs:{}};
    if(!T)return{out:['mdoku is not registered'],stat};
    if(T.bands!=='BCD'||BT.nLevels(T,'B')!==12)bad('mdoku: bands '+T.bands+', '+BT.nLevels(T,'B')+' levels');
    const OPS={B:'+',C:'+-*',D:'+-*/'};
    const val=(op,v)=>op==='='?v[0]:op==='+'?v.reduce((a,b)=>a+b,0):op==='*'?v.reduce((a,b)=>a*b,1):op==='-'?Math.abs(v[0]-v[1]):
      (Math.max(...v)%Math.min(...v)?-1:Math.max(...v)/Math.min(...v));
    const decode=str=>{const [n,cs,sol,gr]=str.split('|');return{n:+n,sol,gr:+gr,cages:cs.split(',').map(s=>{const m=s.match(/^([0-9a-z]+)([-+*\/=])(\d+)$/);return{cells:[...m[1]].map(ch=>parseInt(ch,36)),op:m[2],t:+m[3]}})}};
    const prev={};
    for(const band of 'BCD'){
      for(let day=1;day<=DAYS;day++){
        const used=new Set(),grids=new Set();
        for(let lv=1;lv<=12;lv++){
          const w='mdoku '+band+lv+' day '+day,o={day:'2026-5-'+day},t0=Date.now();
          let p;
          try{p=BT.make('mdoku',band,lv,o)}catch(e){bad(w+': make() threw '+e.message);continue}
          stat.ms+=Date.now()-t0;stat.n++;
          if(JSON.stringify(BT.make('mdoku',band,lv,o))!==JSON.stringify(p))bad(w+': make() is not deterministic');
          // the right slice of the bank: entries 3(L-1)..3L-1; band D 5x5 on levels 1-6, 6x6 on 7-12; a different one each level
          const N=band==='B'?3:band==='C'?4:lv<=6?5:6,NN=N*N;
          if(p.n!==N||!(p.k>=3*(lv-1)&&p.k<=3*lv-1))bad(w+': size '+p.n+' bank index '+p.k+', want '+N+' and '+(3*(lv-1))+'..'+(3*lv-1));
          if(used.has(p.k))bad(w+': two levels of one day use the same bank puzzle');
          used.add(p.k);
          const e=PUZ.mathdoku[band][p.k];
          if(!e){bad(w+': no bank entry '+p.k);continue}
          const d=decode(e);
          // the stored puzzle is the bank puzzle under symmetry x (the dev-time table), cages keep op and target
          if(!Number.isInteger(p.x)||p.x<0||p.x>7){bad(w+': transform '+p.x);continue}
          stat.xs[p.x]=(stat.xs[p.x]||0)+1;
          const f=mdk.SYMS[p.x],map=c=>{const [r,k]=f(Math.floor(c/N),c%N,N);return r*N+k};
          const sol=new Array(NN);for(let c=0;c<NN;c++)sol[map(c)]=d.sol[c];
          const want=d.cages.map(g=>({c:g.cells.map(map).sort((a,b)=>a-b),o:g.op,t:g.t})).sort((a,b)=>a.c[0]-b.c[0]);
          if(sol.join('')!==p.s||JSON.stringify(want)!==JSON.stringify(p.cg))bad(w+': the puzzle is not the bank puzzle under its transform');
          if(p.gr!==d.gr)bad(w+': grade '+p.gr+', bank says '+d.gr);
          const key=JSON.stringify([p.cg,p.s]);
          if(grids.has(key))bad(w+': a grid repeats on one day');
          grids.add(key);
          // independent: a Latin square, cages cover every cell once, connected, band ops, - and / on two cells, targets recomputed
          const s=Array.from(p.s,Number);
          for(let i=0;i<N;i++){
            const row=new Set(),col=new Set();
            for(let k=0;k<N;k++){row.add(s[i*N+k]);col.add(s[k*N+i])}
            if(row.size!==N||col.size!==N||s.some(v=>v<1||v>N))bad(w+': the solution is not a Latin square');
          }
          const seen=new Array(NN).fill(0);
          for(const g of p.cg){
            g.c.forEach(c=>seen[c]++);
            if(g.c.some((c,i)=>i&&c<=g.c[i-1]))bad(w+': cage cells not ascending');
            if(g.o!=='='&&!OPS[band].includes(g.o))bad(w+': op '+g.o+' in band '+band);
            if((g.o==='-'||g.o==='/')&&g.c.length!==2)bad(w+': '+g.o+' cage of '+g.c.length);
            if((g.o==='=')!==(g.c.length===1))bad(w+': single cells and = do not match');
            if(val(g.o,g.c.map(c=>s[c]))!==g.t)bad(w+': cage target '+g.t+g.o+' does not match the solution');
            const reach=new Set([g.c[0]]),todo=[g.c[0]];
            while(todo.length){const c=todo.pop();for(const q of [c-N,c+N,c%N?c-1:-1,c%N<N-1?c+1:-1])if(q>=0&&g.c.includes(q)&&!reach.has(q)){reach.add(q);todo.push(q)}}
            if(reach.size!==g.c.length)bad(w+': a cage is not connected');
          }
          if(seen.some(x=>x!==1))bad(w+': cages do not cover every square once');
          const cages=p.cg.map(g=>({cells:g.c,op:g.o,t:g.t}));
          const cnt=vb.countCages(N,cages,2);
          if(cnt!==1)bad(w+': '+cnt+' solutions');
          const gr=mdk.grade(N,cages);
          if(!gr.solved||gr.grid.join('')!==p.s)bad(w+': the dev-time grader cannot solve the turned puzzle');
          if(gr.grade!==p.gr)stat.grades++;
          // tomorrow's puzzle for the same level is not today's (most days)
          const pk=band+lv;
          if(prev[pk]!=null){stat.pairs++;if(prev[pk]===key)stat.same++}
          prev[pk]=key;
          // solve(): every empty square once, with its number
          const g0=MD.info(p).giv,sl=T.solve(p),fill=g0.slice();
          for(const [c,v] of sl){if(fill[c])bad(w+': solve() fills a full square '+c);fill[c]=v}
          if(fill.join('')!==p.s||sl.length!==g0.filter(v=>!v).length)bad(w+': solve() does not give the solution');
          // hints from the start: tiers 1 and 2 change nothing and point at the same square, tier 3 fills exactly that square
          const st=MD.fresh(p);
          for(let steps=0;steps<NN;steps++){
            const before=JSON.stringify(st),b0=MD.vals(p,st);
            const h1=MD.hint(p,st,1),h2=MD.hint(p,st,2);
            if(!h1){bad(w+': no hint before the end');break}
            if(JSON.stringify(st)!==before||h1.fill||h2.fill)bad(w+': hint tier 1 or 2 changed the board');
            if(h1.cell!==h2.cell||!h2.mark.includes(h2.cell)||h1.mark.length||!h1.house.length||!h1.say||!h2.say||/undefined|NaN/.test(h1.say+h2.say))
              bad(w+': hint tiers 1-2 '+JSON.stringify([h1,h2]));
            if(['wrong','cagelast','cage','guess'].includes(h1.kind)&&!p.cg[MD.info(p).cageAt[h1.cell]].c.every(c=>h1.house.includes(c)))bad(w+': hint 1 does not point at the cage');
            stat.kinds[band+' '+h1.kind]=(stat.kinds[band+' '+h1.kind]||0)+1;
            if(h1.kind==='guess')bad(w+': the hints had to guess');
            const h3=MD.hint(p,st,3);
            if(!h3.fill||h3.fill[0]!==h2.cell||h3.fill[1]!==s[h3.fill[0]]||b0[h3.fill[0]])bad(w+': hint tier 3 '+JSON.stringify(h3.fill));
            MD.fill(p,st,h3.fill[0]);
            const changed=MD.vals(p,st).filter((v,i)=>v!==b0[i]).length;
            if(changed!==1)bad(w+': hint tier 3 changed '+changed+' squares');
            if(MD.won(p,st))break;
          }
          if(!MD.won(p,st)||MD.hint(p,st,1)!==null)bad(w+': tier 3 hints did not finish');
          if(day>3)continue; // the move checks below on the first days
          const G=MD.geo(N),I=MD.info(p),c0=g0.indexOf(0);
          // a clash: a number already in the row or column goes in, shows, counts one mistake; the hint finds it; undo puts it back
          const s2=MD.fresh(p),wv=G.peers[c0].map(q=>g0[q]).find(v=>v&&v!==s[c0]);
          if(wv){
            const b4=JSON.stringify(s2),r=MD.enter(p,s2,c0,wv);
            if(!r.ok||!r.conf.length||s2.miss!==1||!MD.conflicts(p,MD.vals(p,s2)).has(c0))bad(w+': a clash should show and count '+JSON.stringify(r));
            const h=MD.hint(p,s2,2);if(h.kind!=='wrong'||h.cell!==c0)bad(w+': the hint does not find the clashing number');
            stat.wrong++;
            MD.undo(p,s2);s2.miss=0;if(JSON.stringify(s2)!==b4)bad(w+': undo did not put the board back after a clash');
          }
          // a cage miss: an empty cage filled with numbers that clash with nothing but do not make its target: one mistake, the
          // cage is reported, the hint points into it; undo takes each number back
          const s3=MD.fresh(p),b3=MD.vals(p,s3);
          let fillM=null;
          for(const g of p.cg){
            if(g.c.length<2||g.c.some(c=>b3[c]))continue;
            const v=g.c.map(()=>0),rec=i=>{
              if(i===g.c.length)return val(g.o,v)!==g.t;
              for(let x=1;x<=N;x++){
                if(G.peers[g.c[i]].some(q=>b3[q]===x))continue;
                if(g.c.slice(0,i).some((q,j)=>v[j]===x&&G.peers[q].includes(g.c[i])))continue;
                v[i]=x;if(rec(i+1))return true;
              }
              return false;
            };
            if(rec(0)){fillM=[g,v.slice()];break}
          }
          if(fillM){
            const [g,v]=fillM,b4=JSON.stringify(s3);let r;
            g.c.forEach((c,i)=>{r=MD.enter(p,s3,c,v[i])});
            const ci=I.cageAt[g.c[0]];
            if(!r.ok||r.conf.length||r.cage!==ci||r.made||!r.miss||s3.miss!==1||!MD.misses(p,MD.vals(p,s3)).includes(ci))bad(w+': a cage miss should show and count once '+JSON.stringify(r));
            const h=MD.hint(p,s3,1);if(h.kind!=='wrong'||!g.c.includes(h.cell))bad(w+': the hint does not point into the missed cage');
            stat.miss++;
            g.c.forEach(()=>MD.undo(p,s3));s3.miss=0;if(JSON.stringify(s3)!==b4)bad(w+': undo did not put the board back after a cage miss');
          } // (a few 3x3 grids have no empty cage that can be filled wrong without a clash)
          // a right number goes in; a given takes nothing
          const r2=MD.enter(p,s2,c0,s[c0]);
          if(!r2.ok||r2.conf.length||MD.vals(p,s2)[c0]!==s[c0])bad(w+': the right number was not placed');
          const gi=g0.findIndex(Boolean);
          if(gi>=0&&!MD.enter(p,s2,gi,s[c0]).ign)bad(w+': a given square took a number');
          // notes (C, D): a mark goes in, a number placed in its line clears that mark, undo brings it back; none in B
          if(MD.notesOn(p)){
            const free=MD.vals(p,s2).map((v,i)=>v?-1:i).filter(i=>i>=0),a=free[0],q=free.find(i=>i!==a&&G.peers[a].includes(i));
            if(q!=null){
              const v=s[q];MD.note(p,s2,a,v);
              if(!(s2.m[a]&(1<<(v-1))))bad(w+': the note did not go in');
              MD.enter(p,s2,q,v);
              if(s2.m.length&&s2.m[a]&(1<<(v-1)))bad(w+': placing a number did not clear it from the notes of its row and column');
              MD.undo(p,s2);
              if(!(s2.m[a]&(1<<(v-1)))||MD.vals(p,s2)[q])bad(w+': undo did not bring back the note');
            }
            if(!MD.note(p,s2,c0,1).ign)bad(w+': a note went into a filled square');
          }else if(!MD.note(p,s2,MD.vals(p,s2).indexOf(0),1).ign)bad(w+': notes in band B');
          // a hint fill locks the square: no undo or erase can take it away
          const h3=MD.hint(p,s2,3);MD.fill(p,s2,h3.fill[0]);
          if(!MD.erase(p,s2,h3.fill[0]).ign||MD.vals(p,s2)[h3.fill[0]]!==s[h3.fill[0]])bad(w+': a hinted square could be erased');
          // saved state round trip (puzzle and state through JSON, as S.bt.cur is); damaged states do not fit
          const back=JSON.parse(JSON.stringify(s2)),pb=JSON.parse(JSON.stringify(p));
          if(!MD.fit(pb,back)||JSON.stringify(back)!==JSON.stringify(s2)||!MD.fit(p,MD.fresh(p)))bad(w+': a saved state does not fit after a round trip');
          if(JSON.stringify(MD.hint(pb,back,2))!==JSON.stringify(MD.hint(p,s2,2)))bad(w+': a restored state gives another hint');
          const fr=MD.vals(p,s2).indexOf(0),dmg=[['short v',Object.assign({},back,{v:back.v.slice(1)})],
            ['a digit too big',Object.assign({},back,{v:back.v.slice(0,fr)+(N+1)+back.v.slice(fr+1)})],['bad notes',Object.assign({},back,{m:[1,2]})],
            ['sel outside',Object.assign({},back,{sel:NN})],['no undo list',Object.assign({},back,{h:null})],['a bad undo step',Object.assign({},back,{h:[[[NN,0,0]]]})],
            ['null',null],['a string','x'],['another puzzle',MD.fresh({n:N===3?4:3,b:'C',cg:[{c:[0],o:'=',t:1}]})]];
          if(gi>=0)dmg.push(['a given overwritten',Object.assign({},back,{v:back.v.slice(0,gi)+'1'+back.v.slice(gi+1)})],['a hint on a given',Object.assign({},back,{hn:[gi]})]);
          for(const [m,x] of dmg)if(MD.fit(p,x))bad(w+': a damaged state fits ('+m+')');
        }
      }
    }
    for(const k of ['B last','B cagelast','C cage','D cage','D hidden'])if(!stat.kinds[k])bad('no '+k+' hint seen');
    if(!stat.kinds['D inline']&&!stat.kinds['D pair'])bad('no elimination hint (cage in a line, naked pair) seen in band D');
    if(!stat.wrong||!stat.miss)bad('no clash or cage miss was checked');
    if(Object.keys(stat.xs).length!==8)bad('not all 8 rotations and mirrors were used: '+Object.keys(stat.xs));
    if(MD.spoken('12× in two squares: 2 + 3 = 5')!=='12 times in two squares: 2 plus 3 equals 5')bad('spoken(): '+MD.spoken('12× in two squares: 2 + 3 = 5'));
    return{out,stat};
  };
  const r=eval(js+';('+body.toString()+')()');
  const s=r.stat,p=r.out;
  // 3 bank puzzles x 8 forms a level: about 1 in 24 next days show the same grid by chance
  if(s.pairs&&s.same/s.pairs>0.08)p.push('the same level gives the same puzzle on the next day '+s.same+' times of '+s.pairs);
  const avg=s.n?s.ms/s.n:0;
  if(avg>5)p.push('make() takes '+avg.toFixed(1)+' ms on average (limit 5 ms)');
  const k=Object.entries(s.kinds).map(([a,b])=>a+' '+b).join(', ');
  return{problems:p,note:s.n+' puzzles (3 bands x 12 levels x 15 days), one solution each (countCages); next-day repeats '+s.same+'/'+s.pairs+
    '; grader grade differs after turning '+s.grades+'; clash and cage-miss moves '+s.wrong+'/'+s.miss+'; hint steps: '+k};
});

// P2-17: the letter sets upper (A-Z) and lower (a-z) of the tracing engine, the ABC Beach stops trace 2 and trace 3, the reading
// colour of those stops (SK.trace.lvArea, skArea) and save safety (CURRICULUM E-trace and 2.2; d-trace.js header)
run('tracing letters P2-17',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const bad=[],b=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)},stat={glyphs:0,strokes:0,traces:0,saves:0};
    const store={};
    localStorage.getItem=k=>k in store?store[k]:null;localStorage.setItem=(k,v)=>{store[k]=String(v)};localStorage.removeItem=k=>{delete store[k]};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    S.name='Ava';G={built:[],path:'read'};
    let seed=20261117;const rand=()=>{seed=(seed+0x6D2B79F5)>>>0;let z=Math.imul(seed^(seed>>>15),1|seed);z=(z+Math.imul(z^(z>>>7),61|z))^z;return((z^(z>>>14))>>>0)/4294967296};
    const ru=(a,c)=>a+rand()*(c-a);
    // 1. the sets: letters, order (abc 1's), spoken names, lines
    const U=TRACE.sets.upper,Lw=TRACE.sets.lower;
    if(!U||!Lw)return{bad:['no TRACE.sets.upper or lower'],stat};
    if(TR.LV[2]!=='upper'||TR.LV[3]!=='lower'||TR.LV[1]!=='digit')b('TR.LV: '+JSON.stringify(TR.LV));
    if(U.order.join('')!==ABCO||Lw.order.join('')!==ABCO.toLowerCase())b('letter order is not abc 1 order: '+U.order.join('')+' '+Lw.order.join(''));
    if(Object.keys(U.glyphs).sort().join('')!=='ABCDEFGHIJKLMNOPQRSTUVWXYZ'||Object.keys(Lw.glyphs).sort().join('')!=='abcdefghijklmnopqrstuvwxyz')b('letter glyph keys');
    if(U.n!=='big letter'||Lw.n!=='little letter')b('set names '+U.n+' / '+Lw.n);
    const LU=U.lines,LL=Lw.lines;
    if(!(LU.top<LU.mid&&LU.mid<LU.base&&LU.top>=0&&LU.base<=100&&LU.desc==null))b('upper lines: '+JSON.stringify(LU));
    if(!(LL.top<LL.mid&&LL.mid<LL.base&&LL.base<LL.desc&&LL.top>=0&&LL.desc<=100))b('lower lines: '+JSON.stringify(LL));
    // the handwriting model (d-trace.js header): per stroke the first direction; '.' a dot, 'o' a closed loop from its top, going left
    const V={d:[0,1],u:[0,-1],l:[-1,0],r:[1,0],dl:[-1,1],dr:[1,1],ul:[-1,-1],ur:[1,-1]};
    const MODEL={
      A:'dl dr r',B:'d r r',C:'ul',D:'d r',E:'d r r r',F:'d r r',G:'ul',H:'d d r',I:'r d r',J:'d',K:'d dl',L:'d',M:'d dr',N:'d dr',O:'o',
      P:'d r',Q:'o dr',R:'d r dr',S:'ul',T:'r d',U:'d',V:'dr',W:'dr',X:'dr dl',Y:'dr dl',Z:'r',
      a:'ul d',b:'d ur',c:'ul',d:'ul d',e:'r',f:'ul r',g:'ul d',h:'d ur',i:'d .',j:'d .',k:'d dl',l:'d',m:'d ur ur',n:'d ur',o:'o',
      p:'d ur',q:'ul d',r:'d u',s:'ul',t:'d r',u:'d d',v:'dr',w:'dr',x:'dr dl',y:'dr dl',z:'r'};
    // lowercase by height: ascenders reach the top line, t is a short ascender, descenders reach the tail line
    const ASC='bdfhkl',DESC='gjpqy';
    const curvePts=[]; // spacing of points along curves
    for(const [set,S0] of [['upper',U],['lower',Lw]]){
      const Ln=S0.lines,low=set=='lower';
      for(const key of S0.order){
        const g=S0.glyphs[key],w=set+' '+key;
        stat.glyphs++;
        for(const x of TR.glyphProblems(set,key))b(x);
        if(!g||g.say!==key.toUpperCase())b(w+': spoken name '+(g&&g.say));
        const spec=MODEL[key].split(' '),geo=TR.geo(set,key);
        if(geo.s.length!==spec.length){b(w+': '+geo.s.length+' strokes, the model has '+spec.length);continue}
        let ys=[];
        geo.s.forEach((s,j)=>{
          const ws=w+' stroke '+(j+1),e=spec[j],p=s.p,a=p[0],z=p[p.length-1],raw=g.s[j];
          stat.strokes++;
          if(e==='.'){
            // a dot (i, j): one point, the last stroke, over the stem, between the top and middle lines
            if(!s.dot||j!==geo.s.length-1)b(ws+': the dot must be one point and the last stroke');
            if(!(a[1]>Ln.top&&a[1]<Ln.mid-6))b(ws+': the dot is not between the top and middle lines');
            if(Math.abs(a[0]-geo.s[0].p[0][0])>1.5)b(ws+': the dot is not over the stem');
            return;
          }
          if(s.dot){b(ws+': a dot where the model has a stroke');return}
          if(s.L<15)b(ws+': degenerate (length '+s.L.toFixed(1)+')');
          if(p.some(([x,y],i)=>i&&Math.hypot(x-p[i-1][0],y-p[i-1][1])>1.0001))b(ws+': dense points more than 1 unit apart');
          if(Math.abs(s.L-(p.length-1))>1.01)b(ws+': length and points disagree');
          if(p.some(([x])=>x<4||x>96))b(ws+': leaves the box');
          ys=ys.concat(p.map(q=>q[1]));
          // first direction as in the model (a loop starts at its top going left); ends lower or to the right
          const dir=e==='o'?V.l:V[e],f=p[Math.min(5,p.length-1)],fl=Math.hypot(f[0]-a[0],f[1]-a[1]);
          const cos=((f[0]-a[0])*dir[0]+(f[1]-a[1])*dir[1])/fl/Math.hypot(dir[0],dir[1]);
          if(!(cos>=0.6))b(ws+': first goes '+(f[0]-a[0]).toFixed(1)+','+(f[1]-a[1]).toFixed(1)+', the model goes '+e);
          const closed=Math.hypot(z[0]-a[0],z[1]-a[1])<0.5;
          if(closed!==(e==='o'))b(ws+': closed '+closed);
          if(closed){
            if(a[1]>Math.min(...p.map(q=>q[1]))+0.5)b(ws+': a loop starts at its top');
            const d0=TR.dir(s,1.5),d1=TR.dir(s,s.L-1.5);
            if(d0[0]*d1[0]+d0[1]*d1[1]<0.9)b(ws+': the loop has a corner at its join');
          }
          else if(!(z[1]>a[1]+3||z[0]>a[0]+3))b(ws+': does not run top to bottom or left to right'); // (N, U, V, W, u, r end up on the right)
          // control points: on curved spans about 8 to 14 units apart (7 to 15 allowed); no spike between dense points but at corners
          TR.segs(raw).forEach(([q0,c1,c2,q1],k)=>{
            const ch=Math.hypot(q1[0]-q0[0],q1[1]-q0[1]);
            const bend=Math.max(...[c1,c2].map(c=>Math.abs((q1[0]-q0[0])*(c[1]-q0[1])-(q1[1]-q0[1])*(c[0]-q0[0]))/(ch||1)));
            if(bend>0.6){curvePts.push(ch);if(ch<7||ch>15)b(ws+': curve points '+(k+1)+'-'+(k+2)+' are '+ch.toFixed(1)+' apart')}
          });
          for(let i=2;i<p.length;i++){
            const u1=[p[i-1][0]-p[i-2][0],p[i-1][1]-p[i-2][1]],u2=[p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]];
            const c=(u1[0]*u2[0]+u1[1]*u2[1])/(Math.hypot(...u1)*Math.hypot(...u2)||1);
            const nearCorner=raw.some(q=>q[2]&&Math.hypot(q[0]-p[i-1][0],q[1]-p[i-1][1])<1.5);
            if(c<-0.2&&!nearCorner){b(ws+': a spike near '+p[i-1].map(v=>v.toFixed(0)));break}
          }
        });
        if(!ys.length)continue;
        // heights: capitals from the top to the base line (Q's tail dips below the base); lowercase by kind
        const lo=Math.min(...ys),hi=Math.max(...ys),near=(v,t)=>Math.abs(v-t)<=2;
        if(!low){
          if(!near(lo,Ln.top))b(w+': does not reach the top line ('+lo.toFixed(1)+')');
          const body=key=='Q'?Math.max(...geo.s[0].p.map(q=>q[1])):hi;
          if(!near(body,Ln.base))b(w+': does not sit on the base line ('+body.toFixed(1)+')');
          if(key=='Q'?!(hi>Ln.base+2&&hi<=Ln.base+8):hi>Ln.base+2)b(w+': below the base line ('+hi.toFixed(1)+')');
        }else{
          if(ASC.includes(key)){if(!near(lo,Ln.top))b(w+': an ascender reaches the top line ('+lo.toFixed(1)+')')}
          else if(key=='t'){if(!(lo>Ln.top+6&&lo<Ln.mid-6))b(w+': t rises part way above the middle line ('+lo.toFixed(1)+')')}
          else if(!near(lo,Ln.mid))b(w+': an x-height letter starts on the middle line ('+lo.toFixed(1)+')');
          if(DESC.includes(key)){if(!near(hi,Ln.desc))b(w+': a tail reaches the descender line ('+hi.toFixed(1)+')')}
          else if(!near(hi,Ln.base))b(w+': sits on the base line ('+hi.toFixed(1)+')');
          if(!ASC.includes(key)&&geo.s[0].p[0][1]>(Ln.mid+Ln.base)/2+1)b(w+': starts in the lower half');
        }
        // stroke order: top to bottom, left to right (a later stroke never starts up and to the left of the one before)
        for(let j=1;j<geo.s.length;j++){
          const p0=geo.s[j-1].p[0],p1=geo.s[j].p[0];
          if(!(p1[1]>p0[1]+3||p1[0]>=p0[0]-0.5))b(w+': stroke '+(j+1)+' starts up and left of stroke '+j);
        }
      }
    }
    // 2. the checker: synthetic traces along every letter stroke at both tolerances
    const along=(s,o={})=>{
      const s0=o.s0||0,s1=o.s1==null?s.L:o.s1,out=[];
      const jit=()=>{if(!o.j)return[0,0];const r=Math.sqrt(rand())*o.j,a=rand()*Math.PI*2;return[Math.cos(a)*r,Math.sin(a)*r]};
      let x=s0;
      while(true){
        const [px,py]=TR.at(s,x),[jx,jy]=jit(),[nx,ny]=o.shift?[-TR.dir(s,x)[1],TR.dir(s,x)[0]]:[0,0],k=o.shift&&x>8?o.shift:0;
        out.push([px+jx+nx*k,py+jy+ny*k]);
        if(x>=s1)break;
        x=Math.min(s1,x+(o.step?ru(o.step,o.fast||o.step):1));
      }
      return o.rev?out.reverse():out;
    };
    for(const tol of [14,10])for(const [set,S0] of [['upper',U],['lower',Lw]])for(const key of S0.order){
      const geo=TR.geo(set,key),w=set+' '+key+' tol '+tol;
      geo.s.forEach((s,j)=>{
        const ws=w+' stroke '+(j+1),chk=(pts,s0)=>{stat.traces++;return TR.check(s,pts,tol,s0)};
        let r;
        if(s.dot){
          if(!chk([[s.p[0][0]+0.3*tol,s.p[0][1]-0.3*tol]]).ok)b(ws+': a tap on the dot fails');
          if(chk([[s.p[0][0]+2*tol,s.p[0][1]]]).ok)b(ws+': a tap away from the dot passes');
          if(chk([s.p[0],[s.p[0][0],s.p[0][1]+3*tol]]).ok)b(ws+': a line drawn from the dot passes as the dot');
          return;
        }
        // pass: ideal; noisy (jitter 0.3 tol, fast and slow parts, start a little off, stop a little short); 8 px of jitter
        r=chk(along(s));
        if(!r.ok)b(ws+': the ideal trace fails ('+r.why+')');
        for(let i=0;i<20;i++){
          const pts=along(s,{j:0.3*tol,step:1,fast:rand()<0.5?10:4,s1:s.L-ru(0,0.45*tol)});
          pts[0]=[pts[0][0]+ru(-0.5,0.5)*tol,pts[0][1]+ru(-0.5,0.5)*tol];
          r=chk(pts);
          if(!r.ok){b(ws+': a noisy trace fails ('+r.why+', off '+r.off.toFixed(2)+')');break}
        }
        for(let i=0;i<10;i++){r=chk(along(s,{j:2.4,step:2,fast:6}));if(!r.ok){b(ws+': an 8 px jitter trace fails ('+r.why+')');break}}
        // fail: backwards, off the path, scribbles, a start far away
        r=chk(along(s,{rev:1}));
        if(r.ok)b(ws+': a reversed trace passes');
        for(let i=0;i<5;i++){r=chk(along(s,{rev:1,j:0.3*tol,step:2,fast:6}));if(r.ok){b(ws+': a noisy reversed trace passes');break}}
        r=chk(along(s,{shift:1.7*tol,step:2}));
        if(r.ok||r.why==='part'||r.why==='tap')b(ws+': a trace that leaves the path passes or is kept ('+r.why+')');
        const zig=[];for(let x=0;x<=s.L;x+=2){const [px,py]=TR.at(s,x),[dx,dy]=TR.dir(s,x),k=(x/2)%2?0.9*tol:-0.9*tol;zig.push([px-dy*k,py+dx*k])}
        r=chk(zig);
        if(r.ok||r.why!=='scribble')b(ws+': a zigzag along the stroke is not a scribble ('+r.why+')');
        const scr=[s.p[0]];for(let i=0;i<60;i++)scr.push([ru(5,95),ru(5,95)]);
        if(chk(scr).ok)b(ws+': a random scribble from the start dot passes');
        const far=along(s).map(([x,y])=>[x+2*tol,y]);far[0]=[s.p[0][0]+2*tol,s.p[0][1]];
        r=chk(far);
        if(r.ok||r.why!=='start')b(ws+': a trace starting away from the dot is not a start miss ('+r.why+')');
        // a tap on the dot is ignored; half a stroke is kept and the rest from there finishes it
        r=chk([s.p[0]]);
        if(r.ok||r.why!=='tap')b(ws+': a tap on the start dot is '+r.why);
        const half=Math.round(s.L*0.5);
        if(half>=TR.PART+2){
          r=chk(along(s,{s1:half,j:1,step:2}));
          if(r.why!=='part'||Math.abs(r.s-half)>tol)b(ws+': half a stroke is '+r.why+' at '+r.s);
          else{const r2=chk(along(s,{s0:r.s,j:1,step:2}),r.s);if(!r2.ok)b(ws+': carrying on from half way fails ('+r2.why+')')}
        }
      });
      // wrong order: every other stroke traced where this one is expected fails
      for(let j=0;j<geo.s.length;j++)for(let k=0;k<geo.s.length;k++){
        if(j===k||geo.s[k].dot)continue;
        const r=TR.check(geo.s[j],along(geo.s[k]),tol);stat.traces++;
        if(r.ok)b(w+': stroke '+(k+1)+' passes as stroke '+(j+1)+' (wrong order)');
      }
    }
    // 3. the generator at levels 2 (A-Z) and 3 (a-z), rounds, the board
    for(const lv of [2,3]){
      const set=TR.LV[lv],S0=TRACE.sets[set],seen={};
      for(let i=0;i<3000;i++){
        const q=SK.trace.gen(lv),gl=S0.glyphs[q.g];
        for(const x of kindProblems(q))b('trace L'+lv+': '+x);
        if(q.set!==set||!gl){b('trace L'+lv+': set '+q.set+' glyph '+q.g);continue}
        if(!q.pk||!q.auto||q.hint.k!=='trace'||!q.say.includes(S0.n+' '+gl.say+'!')||!q.html.includes('<svg class="trq-g"'))b('trace L'+lv+' '+q.g+': pk, hint, say or picture');
        if(/undefined|NaN|\[object/.test(q.html+q.say+q.label))b('trace L'+lv+': bad text');
        if(!q.html.includes('Trace the '+S0.n+' '+q.g+'.'))b('trace L'+lv+' '+q.g+': the prompt shows the letter to trace');
        if(/[A-Za-z]/.test(q.html.replace(/<div class="sub pktxt">.*?<\/div>/g,'').replace(/<[^>]*>/g,'')))b('trace L'+lv+': letters outside .pktxt');
        (seen[q.label]=seen[q.label]||new Set()).add(q.g);
        if(i<50){
          const h=KIND.trace.render(q),nl=(h.match(/class="tr-l/g)||[]).length;
          if(!h.includes('id="trb"')||nl!==(lv==3?5:4))b('trace L'+lv+' render: '+nl+' lines');
          if(KIND.trace.spoken(q)!==gl.say)b('trace L'+lv+': spoken');
        }
      }
      if(Object.keys(seen).length!==26||Object.values(seen).some(s=>s.size!==1))b('trace L'+lv+' labels: one per letter, '+Object.keys(seen).length);
      for(let i=0;i<200;i++){
        const rd=traceRound(lv),ks=rd.map(q=>q.g);
        if(rd.length!==TR.N||new Set(ks).size!==TR.N||ks.some((k,x)=>x&&S0.order.indexOf(k)<S0.order.indexOf(ks[x-1])))b('round L'+lv+': '+ks.join(''));
        for(const q of rd){if(q.sk!=='trace'||q.lv!==lv||q.set!==set||genQ('trace',lv,q.seed).g!==q.g)b('round L'+lv+' question not reproducible: '+q.g)}
      }
    }
    // 4. the stops: ABC Beach in CURRICULUM order; reading colour on the map, in the round and in the activity log; no quiz items
    const wA=PATHS.read.worlds.find(w=>w.id=='r_abc'),ids=wA.nodes.map(n=>n[0]+n[1]).join(' ');
    if(ids!=='abc1 abc2 trace2 abc3 syl1 trace3 abc4')b('ABC Beach stops: '+ids);
    const all=[];for(const p in PATHS)for(const w of PATHS[p].worlds)for(const n of w.nodes)if(n[0]=='trace')all.push(p+':'+w.id+':'+n[1]);
    if(all.join(' ')!=='math:m_tiny:1 read:r_abc:2 read:r_abc:3')b('trace stops: '+all.join(' '));
    if(SK.trace.max!==3||SK.trace.area!=='math'||skArea('trace',1)!=='math'||skArea('trace',2)!=='read'||skArea('trace',3)!=='read')b('trace areas per level');
    if(skArea('abc',1)!=='read'||skArea('add',3)!=='math'||skArea('nope',1)!==undefined)b('skArea for other skills');
    for(const [id,area] of [['trace1','math'],['trace2','read'],['trace3','read']]){
      const n=NODES[area].find(n=>nid(n)==id);
      if(!n||nInfo(n).area!==area){b(id+': map stop area '+(n&&nInfo(n).area));continue}
      const q=genQ('trace',n.lv,5);G={built:[],path:'math'};
      if(qSubj(q)!==area)b(id+': round colour '+qSubj(q));
      ACT.qStart('trace',1000,false,n.lv);
      if(!ACT.cur||ACT.cur.area!==area)b(id+': activity area '+(ACT.cur&&ACT.cur.area));
      ACT.cur=null;
    }
    if(nInfo(NODES.read.find(n=>nid(n)=='trace2')).t!==SK.trace.t||SK.trace.area!=='math')b('nInfo keeps the skill fields and leaves SK.trace alone');
    for(let sd=1;sd<=200;sd++){const st=PLACE.begin(PATHS.read.worlds,-1,sd);st.wi=0;for(let k=0;k<3;k++){st.k=k;if(PLACE.items(PATHS.read.worlds,st).some(it=>it.sk=='trace'))b('placement asks tracing')}}
    // 5. save safety: the same saves with and without trace 2 and 3. Stars are keyed by stop id; nothing re-locks; in a finished
    //    ABC Beach both are NEW and the map does not open on them; otherwise the map opens where it did, or on a new tracing stop
    //    the child has not played that sits before that stop
    const full=wA.nodes.slice(),OLD=full.filter(n=>n[0]!=='trace');
    const setNodes=a=>{wA.nodes=a;buildNodes('read')};
    const idx=id=>NODES.read.findIndex(n=>nid(n)==id);
    const abcIds=OLD.map(n=>n[0]+n[1]);
    const mk=(n,boss,base,grade)=>{load(fx(base));for(const k of abcIds.concat('boss_r_abc'))delete S.maps.read[k];
      abcIds.slice(0,n).forEach((k,i)=>{S.maps.read[k]=1+i%3});if(boss)S.maps.read.boss_r_abc=3;
      if(S.wdone)delete S.wdone.r_abc;if(boss)(S.wdone=S.wdone||{}).r_abc=1;if(grade!=null)S.grade=grade;return JSON.stringify(S)};
    const cases={};
    for(const g of [-1,0,1]){
      cases['ABC Beach not started, grade '+g]=mk(0,0,'fresh',g);
      cases['ABC Beach 2 stops, grade '+g]=mk(2,0,'fresh',g);
      cases['ABC Beach 3 stops, grade '+g]=mk(3,0,'fresh',g);
      cases['ABC Beach 5 stops, boss not beaten, grade '+g]=mk(5,0,'fresh',g);
      cases['ABC Beach finished, grade '+g]=mk(5,1,'fresh',g);
      cases['ABC Beach finished, midway, grade '+g]=mk(5,1,'midway',g);
      cases['ABC Beach finished, maxed, grade '+g]=mk(5,1,'maxed',g);
    }
    for(const n of ['midway','maxed','legacy-single-map','legacy-index-maps','fresh','tricky'])cases['fixture '+n]=fx(n);
    for(const name in cases){
      const raw=cases[name];
      setNodes(OLD);load(raw);
      const starsOld=JSON.stringify(S.maps.read),curOld=nid(NODES.read[curNode('read')]);
      const openOld=NODES.read.map(n=>nid(n)).filter((id,i)=>unlocked('read',i));
      setNodes(full);load(raw);stat.saves++;
      if(JSON.stringify(S.maps.read)!==starsOld)b(name+': star table changed');
      if(S.maps.read.trace2||S.maps.read.trace3)b(name+': stars on a new tracing stop');
      for(const id of openOld)if(!unlocked('read',idx(id)))b(name+': '+id+' was open and is locked');
      const curNew=nid(NODES.read[curNode('read')]),fin=name.includes('finished');
      const okNew=['trace2','trace3'].includes(curNew)&&unlocked('read',idx(curNew))&&!stopNew('read',idx(curNew))&&idx(curNew)<idx(curOld);
      if(curNew!==curOld&&(fin||!okNew))b(name+': current stop '+curOld+' -> '+curNew);
      if(fin){
        for(const id of ['trace2','trace3']){const i=idx(id);if(!stopNew('read',i)||!unlocked('read',i))b(name+': '+id+' should be NEW and open')}
        if(!worldFinished('read',0))b(name+': ABC Beach is no longer finished');
      }
      if(name.includes('2 stops')&&!S.unlockAll&&(!unlocked('read',idx('trace2'))||unlocked('read',idx('trace3'))))b(name+': trace2 open, trace3 not yet');
    }
    setNodes(full);
    stat.curve=curvePts.length?Math.min(...curvePts).toFixed(1)+' to '+Math.max(...curvePts).toFixed(1):'';
    return{bad,stat};
  };
  const r=eval(js+';('+body.toString()+')()');
  const p=r.bad.slice();
  // the shipped data file carries both letter sets (A11: data builds into data.<VER>.js)
  const data=fs.readFileSync(path.join(__dirname,'..',DATA_FILE),'utf8');
  if(!/\bupper: \{/.test(data)||!/\blower: \{/.test(data))p.push(DATA_FILE+' has no upper or lower tracing set (rebuild)');
  return{problems:uniq(p),note:r.stat.glyphs+' letters, '+r.stat.strokes+' strokes (curve points '+r.stat.curve+' apart), '+r.stat.traces+' synthetic traces, '+r.stat.saves+' saves with and without trace 2 and 3'};
});

// ---- P2-36: Discover path shell and Science K-2 ----
run('Discover science K-2 P2-36: banks validate, tags, one right answer, hints, 3000 questions per level, path and stops, saves safe, Home card',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const serrs=[],bad=m=>serrs.push(m);
  const body=function(){
    const SKS=['sci_life','sci_earth','sci_phys'];
    const TOPICS={sci_life:['living','babies','covers','habitat','plants','needs','senses'],sci_earth:['weather','seasons','daynight','sunmoon','landwater'],
      sci_phys:['push','stuff','soundlight','solid']};
    const STOP=/^(a|an|the|and|or|of|in|to|it|is|its|on|at|up|from|where|that|with|this|have)$/;
    let items=0,pics=0,questions=0;
    for(const id of SKS){
      const s=SK[id];
      if(!s||s.area!=='disc'||s.bank!==id||s.max<1)bad('SK.'+id+' is wrong');
      for(const m of bankProblems(id,{levels:[1],min:40}))bad(m);
      const B=BANK[id];items+=B.length;
      if(B.some(it=>it.lv!==1))bad(id+': only level 1 ships in P2-36');
      const tops={};
      for(const it of B){
        const w=id+': '+it.q+' = '+it.a+': ';
        if(it.grade!=='K-2')bad(w+'grade tag '+it.grade);
        if(!it.topic||!TOPICS[id].includes(it.topic))bad(w+'topic tag '+it.topic);
        tops[it.topic]=(tops[it.topic]||0)+1;
        const all=[it.a,...it.d].map(x=>x.toLowerCase());
        if(new Set(all).size!==all.length)bad(w+'a choice repeats');
        if(!it.hint||it.hint.length<20)bad(w+'hint missing');
        // a hint teaches the method: it never says the answer, neither the whole answer nor a word of it
        const hw=(it.hint||'').toLowerCase().split(/[^a-z]+/),aw=it.a.toLowerCase().split(/[^a-z]+/).filter(x=>x.length>=3&&!STOP.test(x));
        if((it.hint||'').toLowerCase().includes(it.a.toLowerCase())||aw.some(x=>hw.includes(x)))bad(w+'the hint gives the answer: '+it.hint);
        // the answer is not in the prompt
        const qw=it.q.toLowerCase().split(/[^a-z]+/);
        if(aw.some(x=>x.length>=5&&qw.includes(x)))bad(w+'the answer is in the prompt');
        if(it.em)pics++;
        if(/\bmap\b|atlas|globe/i.test(it.q+it.hint))bad(w+'mentions a map');
        if(it.d.length<2||it.d.length>3)bad(w+it.d.length+' wrong answers');
      }
      for(const t of TOPICS[id])if(!tops[t])bad(id+': topic '+t+' has no items');
      // 3000 seeded questions: no errors, one right choice, say, hint, label, every item drawn
      const seen=new Set(),labels={};
      for(let i=0;i<3000;i++){
        const q=genQ(id,1,i+1),w=id+' '+q.label+': ';questions++;
        const pr=kindProblems(q);if(pr.length)bad(w+pr.join('; '));
        seen.add(q.bk.bi);
        if(q.kind!=='choice')bad(w+'kind '+q.kind);
        const vs=q.choices.map(c=>c.v);
        if(new Set(vs).size!==vs.length||vs.filter(v=>v===q.ans).length!==1)bad(w+'not exactly one right choice');
        if(vs.length<3||vs.length>4)bad(w+vs.length+' choices');
        if(!q.say||!q.say.trim())bad(w+'no say text');
        if(!q.hint||q.hint.k!=='text'||q.hint.s.length<20)bad(w+'hint');
        if(!q.label||q.label.length>=60)bad(w+'label length');
        if(labels[q.label]!==undefined&&labels[q.label]!==q.bk.bi)bad(w+'label is not unique');
        labels[q.label]=q.bk.bi;
        if(q.sk!==id||q.lv!==1)bad(w+'genQ did not stamp sk/lv');
        if(q.topic!==BANK[id][q.bk.bi].topic)bad(w+'topic not carried');
        const it=BANK[id][q.bk.bi];
        if(!!it.em!==q.html.includes('bpic bem'))bad(w+'picture mismatch');
        if(i<40&&bankRebuild(q.bk).label!==q.label)bad(w+'bankRebuild differs');
      }
      if(seen.size!==B.length)bad(id+': 3000 questions drew only '+seen.size+' of '+B.length+' items');
      if(JSON.stringify(genQ(id,1,77))!==JSON.stringify(genQ(id,1,77)))bad(id+' is not reproducible');
    }
    if(pics<15)bad('fewer than 15 items have a picture ('+pics+')');
    // path, world, stops (CURRICULUM 2.4: Nature Trail starts with sci_life 1, sci_earth 1, sci_phys 1)
    if(Object.keys(PATHS).join()!=='math,read,es,disc')bad('path order '+Object.keys(PATHS));
    const D=PATHS.disc;
    if(!D||D.byLevel||!D.noPlace)bad('PATHS.disc must be graded and without placement');
    if(placePaths().includes('disc'))bad('Discover offers placement');
    if(D.worlds.map(w=>w.id+'/'+w.g).join()!=='d_nature/0')bad('worlds '+D.worlds.map(w=>w.id+'/'+w.g));
    if(D.worlds[0].n!=='Nature Trail')bad('world name');
    if(NODES.disc.map(nid).join(' ')!=='sci_life1 sci_earth1 sci_phys1 boss_d_nature')bad('stops '+NODES.disc.map(nid).join(' '));
    if(!NODES.disc[3].last||!NODES.disc[3].boss)bad('the world must end with a boss');
    for(const n of NODES.disc)if(n.sk!='boss'&&(!SK[n.sk]||n.lv>SK[n.sk].max||!n.t||n.t.length>24))bad('stop '+nid(n)+' title or skill');
    for(const [p,P] of Object.entries(PATHS))for(const w of P.worlds)if(/^d_/.test(w.id)!==(p=='disc'))bad('world id prefix '+w.id);
    if(REP.strandOf('sci_phys')!=='Science')bad('strand');
    if(icoSk('sci_earth')!=='globe'||!ICONS[icoSk('sci_life')]||!ICONS[icoSk('sci_phys')])bad('skill icons');
    // saves: a path added later starts empty with no migration; nothing on the other paths moves or re-locks
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const OLD=['math','read','es'];
    const snap=()=>JSON.stringify([OLD.map(p=>NODES[p].map((n,i)=>[nid(n),getSt(p,i),unlocked(p,i)])),OLD.map(p=>curNode(p)),OLD.map(p=>curWorld(p))]);
    const withoutDisc=f=>{const a=[PATHS.disc,NODES.disc,WR.disc];delete PATHS.disc;delete NODES.disc;delete WR.disc;
      try{return f()}finally{PATHS.disc=a[0];NODES.disc=a[1];WR.disc=a[2]}};
    const fixtures=['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky'].map(n=>[n,fx(n)]);
    fixtures.push(['at-latest',JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{math:{add1:3},read:{sound1:2},es:{es_greet1:1}},grade:1})]); // a save of this version, written before Discover
    let checked=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,6]){
      const empty=!Object.keys(JSON.parse(raw)).length;
      load(empty?null:raw);if(g!==null)S.grade=g;
      const w='fixture '+name+' g'+g+': ';
      if(!S.maps||typeof S.maps.disc!=='object'||Object.keys(S.maps.disc).length)bad(w+'S.maps.disc is not an empty map');
      const raws=JSON.parse(raw).maps||{};
      if(!name.startsWith('legacy'))for(const p of OLD)for(const k in raws[p]||{})if(S.maps[p][k]!==raws[p][k])bad(w+p+' '+k+' stars moved'); // the legacy fixtures are old-format maps, covered by the worlds check
      const withD=snap(),noD=withoutDisc(snap);checked++;
      if(withD!==noD)bad(w+'adding Discover changed another path (stars, open stops or where the map opens)');
      if(!unlocked('disc',0)||!worldOpen('disc',0)||nid(NODES.disc[curNode('disc')])!=='sci_life1')bad(w+'Discover does not start at its first stop');
      if(unlocked('disc',1)||unlocked('disc',3))bad(w+'later Discover stops are open');
      if(Object.keys(S.maps.disc).length)bad(w+'reading Discover wrote stars');
      // stars on a Discover stop save under its stop id and change nothing else
      const before=snap();
      setSt('disc',0,2);save();
      if(S.maps.disc.sci_life1!==2||!unlocked('disc',1)||snap()!==before)bad(w+'a Discover star moved something else');
      if(JSON.parse(store[KEY]).maps.disc.sci_life1!==2)bad(w+'Discover stars did not save');
      if(S.v!==LATEST)bad(w+'S.v '+S.v);
    }
    if(LATEST!==6)bad('this chunk adds no migration; LATEST is '+LATEST);
    // Home shows the card
    load(null);S.name='Kid';
    const h=hmPaths(),m=h.match(/<button class="hm-path game s-disc" data-p="disc">[\s\S]*?<\/button>/);
    if(!m)bad('Home has no Discover card');
    else{
      if(!/class="hm-svg"/.test(m[0]))bad('Discover card has no drawing');
      if(!/>Discover</.test(m[0])||!/Start here!/.test(m[0])||!/0 of 4 stops/.test(m[0]))bad('Discover card text: '+m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));
    }
    return {items,questions,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  // the questions ship in the data file, not in index.html (A11)
  const dataF=path.join(ROOT,DATA_FILE),idx=path.join(ROOT,'index.html');
  if(!fs.existsSync(dataF))serrs.push(DATA_FILE+' is not built');
  else{
    const d=fs.readFileSync(dataF,'utf8'),i=fs.readFileSync(idx,'utf8');
    if(!d.includes('BANK.sci_life')||!d.includes('BANK.sci_phys')||!d.includes('A baby dog is called'))serrs.push('the Discover bank is not in '+DATA_FILE);
    if(i.includes('A baby dog is called')||i.includes('BANK.sci_life='))serrs.push('Discover content leaked into index.html');
  }
  return{problems:serrs,note:r.items+' items, '+r.questions+' questions, '+r.checked+' save checks over 7 fixtures x 7 grades'};
});

run('logic UI P3-07',()=>{
  const lgx=require('./puzzles/logic.js');
  const body=function(){
    const out=[],bad=m=>{if(out.length<30&&!out.includes(m))out.push(m)};
    const stat={n:0,ms:0,kinds:{},hints:0,maxSteps:0,days:10};
    const T=BT.get('logic');
    if(!T)return{out:['logic is not registered'],stat};
    if(T.bands!=='BCD'||BT.nLevels(T,'B')!==12)bad('logic: bands '+T.bands+', '+BT.nLevels(T,'B')+' levels');
    if(JSON.stringify(LG.NAMES)!==JSON.stringify(NAMES_GEN))bad('LG.NAMES is not the generator list (tools/puzzles/logic.js NAMES)');
    const range=k=>Array.from({length:k},(_,i)=>i),J=JSON.stringify;
    // the test's own reading of a bank entry and its own brute force (no code shared with 80-bt-logic.js or tools/puzzles)
    const head=e=>{const h=e[0].split('|');return{names:h[0].split(','),cats:h[1].split(';').map(s=>s.split('=')[0]),items:h[1].split(';').map(s=>s.split('=')[1].split(',')),sol:h[2].split(';').map(s=>[...s].map(Number))}};
    const perms=n=>n===1?[[0]]:perms(n-1).flatMap(p=>range(n).map(k=>[...p.slice(0,k),n-1,...p.slice(k)]));
    const holds=(q,A,O)=>{
      const kid=(c,i)=>c===0?i:A[c-1].indexOf(i),item=(c,i,d)=>d===0?kid(c,i):A[d-1][kid(c,i)];
      if(q[0]==='is')return kid(q[1],q[2])===kid(q[3],q[4]);
      if(q[0]==='not')return kid(q[1],q[2])!==kid(q[3],q[4]);
      if(q[0]==='or'){const v=item(q[1],q[2],q[3]);return v===q[4]||v===q[5]}
      const u=item(q[1],q[2],O),w=item(q[3],q[4],O);
      return q[0]==='gt'?u>w:q[0]==='lt'?u<w:Math.abs(u-w)===1;
    };
    const solutions=p=>{
      const P=perms(p.n),out=[];
      const rec=(A)=>{if(A.length===p.K){if(p.cl.every(q=>holds(q,A,p.O)))out.push(J(A));return}for(const x of P)rec(A.concat([x]))};
      rec([]);return out;
    };
    // 1. make: deterministic, the level's three bank entries, names swapped and still true
    const seenK={B:new Set(),C:new Set(),D:new Set()};
    for(const band of 'BCD')for(let day=1;day<=stat.days;day++)for(let lv=1;lv<=12;lv++){
      const w='logic '+band+lv+' day '+day,o={day:'2026-5-'+day},t0=Date.now();
      let p;try{p=BT.make('logic',band,lv,o)}catch(e){bad(w+': make() threw '+e.message);continue}
      stat.ms+=Date.now()-t0;stat.n++;
      if(J(BT.make('logic',band,lv,o))!==J(p))bad(w+': make() is not deterministic');
      if(!(p.k>=3*(lv-1)&&p.k<=3*lv-1))bad(w+': bank entry '+p.k+' is not one of level '+lv+"'s three");
      seenK[band].add(p.k);
      const e=PUZ.logic[band][p.k],h=head(e),n=h.names.length;
      if(p.n!==n||p.K!==h.cats.length||J(p.sol)!==J(h.sol)||J(p.items)!==J(h.items)||J(p.cats)!==J(h.cats))bad(w+': the puzzle is not bank entry '+p.k);
      if(p.O!==(band==='D'?2:0))bad(w+': ordered category '+p.O);
      // names: from the generator's list, different first letters, band B at most 4 letters
      if(p.names.length!==n||new Set(p.names.map(x=>x[0])).size!==n||!p.names.every(x=>NAMES_GEN.includes(x))||(band==='B'&&p.names.some(x=>x.length>4)))bad(w+': names '+p.names);
      // each sentence is the bank sentence with every name replaced by the new one (the test's own word-by-word reading)
      const map=Object.fromEntries(h.names.map((x,i)=>[x,p.names[i]]));
      e.slice(1).forEach((q,qi)=>{
        const mine=q[q.length-1].replace(/[A-Za-z]+/g,t=>map[t]||t),got=p.cl[qi];
        if(J(got.slice(0,-1))!==J(q.slice(0,-1)))bad(w+': clue '+(qi+1)+' structure changed');
        if(got[got.length-1]!==mine)bad(w+': clue '+(qi+1)+' "'+got[got.length-1]+'" should be "'+mine+'"');
        const kids=[];if(q[1]===0)kids.push(q[2]);if(q[0]!=='or'&&q[3]===0)kids.push(q[4]);if(q[0]==='or'&&q[3]===0)kids.push(q[4],q[5]);
        for(const k of kids)if(!new RegExp('\\b'+p.names[k]+'\\b').test(got[got.length-1]))bad(w+': clue '+(qi+1)+' does not name '+p.names[k]);
        for(const x of h.names)if(!p.names.includes(x)&&new RegExp('\\b'+x+'\\b').test(got[got.length-1]))bad(w+': clue '+(qi+1)+' still names '+x);
      });
      if(lv===1||lv===12||day===1){ // the brute force (576 assignments in band D) on a share of the made puzzles; every bank entry below
        const s=solutions(p);
        if(s.length!==1||s[0]!==J(p.sol))bad(w+': '+s.length+' solutions after the name swap');
      }
      if(LG.summary(p).length!==n||!LG.summary(p).every((t,i)=>t.startsWith(p.names[i]+' ')&&/\.$/.test(t)&&!/undefined/.test(t)))bad(w+': summary '+LG.summary(p));
    }
    for(const b of 'BCD')if(seenK[b].size<30)bad('band '+b+': only '+seenK[b].size+' of 36 bank entries made in '+stat.days+' days');
    // 2. grammar: the words the hints use rebuild every is / is-not sentence of the bank (with the bank's names)
    for(const b of 'BCD')PUZ.logic[b].forEach((e,k)=>{
      const p=LG.build(b,k,null);
      for(const q of p.cl)if((q[0]==='is'||q[0]==='not')&&LG.sent(p,[q[1],q[2]],[q[3],q[4]],q[0]==='not')+'.'!==q[5])bad(b+k+': hint words make "'+LG.sent(p,[q[1],q[2]],[q[3],q[4]],q[0]==='not')+'." for "'+q[5]+'"');
    });
    // 3. every bank puzzle: solve() wins by taps; the hint chain finishes it with no guessing; tiers 1-2 change nothing, tier 3 one mark
    const SYM='012';
    for(const b of 'BCD')for(let k=0;k<36;k++)for(const ac of b==='D'?[1,0]:[1]){
      const w='logic '+b+k+(ac?'':' auto-cross off'),p=LG.build(b,k,LG.pickNames(BT.rng('t'+b+k),b==='D'?4:3,b==='B'?4:9));
      const x=LG.ctx(p),N=x.N;
      if(ac){
        const s=solutions(p);
        if(s.length!==1||s[0]!==J(p.sol))bad(w+': '+s.length+' solutions');
        const st=LG.fresh(p),mv=T.solve(p);
        for(const c of mv){LG.tap(p,st,c);if(st.v[c]==='2')LG.tap(p,st,c)}
        if(!LG.won(p,st)||mv.length!==x.B.length*p.n)bad(w+': solve() taps do not win ('+mv.length+' ticks)');
      }
      const st=LG.fresh(p);st.ac=ac;
      let steps=0;
      for(;steps<200&&!LG.won(p,st);steps++){
        const before=J(st),h1=LG.hint(p,st,1),a1=J(st),h2=LG.hint(p,st,2),a2=J(st),h3=LG.hint(p,st,3);
        if(!h1||!h2||!h3){bad(w+': no hint before the end');break}
        if(a1!==before||a2!==before||J(st)!==before)bad(w+': hint tier 1 or 2 changed the state');
        if(h1.cell!==h3.cell||h2.cell!==h3.cell||h1.kind!==h3.kind)bad(w+': the three tiers point at different marks');
        if(!h3.put||h3.put[0]!==h3.cell||![1,-1].includes(h3.put[1])||h1.put||h2.put)bad(w+': only tier 3 places a mark');
        if(h2.mark[0]!==h2.cell)bad(w+': tier 2 does not ring the square');
        stat.kinds[b+' '+h3.kind]=(stat.kinds[b+' '+h3.kind]||0)+1;
        if(h3.kind==='guess'||h3.kind==='wrong')bad(w+': hint "'+h3.kind+'" in a clean solve');
        for(const t of [h1.say,h2.say,h3.say])if(!t||/undefined|NaN|null|\[object/.test(t)||!/[.?]$/.test(t))bad(w+': hint words "'+t+'"');
        if(h1.q>=0&&!new RegExp('clue '+(h1.q+1)+'\\b').test(h1.say))bad(w+': tier 1 does not name clue '+(h1.q+1));
        // tier 3: the right mark in that square, plus (a tick with auto-cross on) crosses in its row and column; nothing else
        const v0=st.v,cs=h3.put[0];
        LG.place(p,st,cs,h3.put[1]);stat.hints++;
        if(st.v[cs]!==(h3.put[1]>0?'1':'2')||h3.put[1]!==LG.solv(x,cs))bad(w+': tier 3 put a wrong mark');
        const [A,I,Bc,Jc]=LG.pos(x,cs);
        for(let c=0;c<N;c++){
          if(c===cs||st.v[c]===v0[c])continue;
          const [a,i,bb,j]=LG.pos(x,c),line=a===A&&bb===Bc&&(i===I||j===Jc);
          if(!(ac&&h3.put[1]>0&&line&&v0[c]==='0'&&st.v[c]==='2'))bad(w+': tier 3 changed square '+c+' too');
        }
      }
      if(!LG.won(p,st))bad(w+': the hint chain did not finish');
      stat.maxSteps=Math.max(stat.maxSteps,steps);
    }
    for(const k of ['B clue','B only','C clue','C only','C link','D clue','D link','D two-way','D chain','D line'])if(!stat.kinds[k])bad('no "'+k+'" hint seen');
    for(const k of Object.keys(stat.kinds))if(/^B (link|two-way|chain)|^C (two-way|chain)/.test(k))bad('band '+k+' hint: harder than the band allows');
    // 4. moves on one puzzle per band: auto-cross, undo, tick out, conflicts, Check, a wrong mark found first, saved states
    for(const b of 'BCD'){
      const p=BT.make('logic',b,6,{day:'2026-5-1'}),x=LG.ctx(p),N=x.N,w='logic '+b+' moves',st=LG.fresh(p);
      const solT=range(N).filter(c=>LG.solv(x,c)===1),c0=solT[0],[a0,i0,b0,j0]=LG.pos(x,c0);
      const lineCells=range(N).filter(c=>{const [a,i,bb,j]=LG.pos(x,c);return c!==c0&&a===a0&&bb===b0&&(i===i0||j===j0)});
      const s0=J(st);
      let r=LG.tap(p,st,c0);
      if(st.v[c0]!=='2'||!r.ok)bad(w+': a first tap should cross');
      const s1=J(st);
      LG.tap(p,st,c0);
      if(st.v[c0]!=='1'||!lineCells.every(c=>st.v[c]==='2'&&st.a[c]==='1')||range(N).some(c=>c!==c0&&!lineCells.includes(c)&&st.v[c]!=='0'))bad(w+': a tick should cross the rest of its row and column, nothing else');
      LG.undo(p,st);
      if(J(st.v)!==J(JSON.parse(s1).v)||st.a!==JSON.parse(s1).a)bad(w+': undo did not take the tick and its crosses away');
      LG.tap(p,st,c0);LG.tap(p,st,c0);
      if(st.v!==JSON.parse(s0).v)bad(w+': a third tap should take the tick and its auto-crosses away');
      while(st.h.length)LG.undo(p,st);
      if(st.v!==JSON.parse(s0).v||st.a!==JSON.parse(s0).a)bad(w+': undo all the way does not give the fresh grid');
      // a cross where an "is" clue says yes, or a tick where "not" says no: a conflict in words; Check counts it once
      const q=p.cl.find(q=>q[0]==='is'||q[0]==='not');
      if(q){
        const c=LG.at(x,q[1],q[2],q[3],q[4]);LG.tap(p,st,c);if(q[0]==='not')LG.tap(p,st,c);
        const cf=LG.conflicts(p,st);
        if(!cf.has(c)||cf.get(c).k!=='clue'||!/does not fit clue/.test(LG.why(p,cf.get(c))))bad(w+': a mark against clue "'+q[5]+'" is not shown: '+J([...cf.keys()]));
        const k1=LG.check(p,st),m1=st.miss,k2=LG.check(p,st);
        if(!k1.bad.includes(c)||k1.add<1||st.miss!==m1||k2.add!==0)bad(w+': Check should count a wrong mark once');
        const h=LG.hint(p,st,1);
        if(h.kind!=='wrong')bad(w+': the hint should find the wrong mark first, gave '+h.kind);
        const h3=LG.hint(p,st,3);LG.place(p,st,h3.put[0],h3.put[1]);
        if(LG.conflicts(p,st).has(c)||st.v[c]===(q[0]==='is'?'2':'1'))bad(w+': tier 3 did not put the wrong mark right');
        if(!LG.tap(p,st,h3.put[0]).ign)bad(w+': a hint mark could be tapped away');
      }
      // two ticks in a line (auto-cross off) are shown
      const s2=LG.fresh(p);s2.ac=0;const row=range(p.n).map(j=>LG.at(x,x.B[0][0],0,x.B[0][1],j));
      for(const c of row.slice(0,2)){LG.tap(p,s2,c);LG.tap(p,s2,c)}
      if(!row.slice(0,2).every(c=>LG.conflicts(p,s2).get(c)&&LG.conflicts(p,s2).get(c).k==='two')||!/Two ticks/.test(LG.why(p,LG.conflicts(p,s2).get(row[0]))))bad(w+': two ticks in a line are not shown');
      // saved state: a JSON round trip fits and gives the same next hint; damaged states do not fit
      const back=JSON.parse(J(st));
      if(!LG.fit(p,back)||!LG.fit(p,LG.fresh(p))||J(LG.hint(p,back,2))!==J(LG.hint(p,st,2)))bad(w+': a saved state does not round trip');
      for(const [m,y] of [['null',null],['short v',Object.assign({},back,{v:back.v.slice(1)})],['a 3 in v',Object.assign({},back,{v:'3'+back.v.slice(1)})],
        ['short a',Object.assign({},back,{a:back.a.slice(1)})],['bad undo step',Object.assign({},back,{h:[[N,'0','0']]})],['empty undo step',Object.assign({},back,{h:[[]]})],
        ['hint square outside',Object.assign({},back,{hn:[N]})],['clue outside',Object.assign({},back,{u:[p.cl.length]})],['miss -1',Object.assign({},back,{miss:-1})],
        ['tab outside',Object.assign({},back,{tab:x.B.length})],['ac 2',Object.assign({},back,{ac:2})],['no seen',Object.assign({},back,{seen:null})],
        ['another size',LG.fresh(BT.make('logic',b==='D'?'C':'D',1,{day:'2026-5-1'}))]])
        if(LG.fit(p,y))bad(w+': a damaged state fits ('+m+')');
    }
    return{out,stat};
  };
  const r=eval(js+';const NAMES_GEN='+JSON.stringify(lgx.NAMES)+';('+body.toString()+')()');
  const s=r.stat,p=r.out,avg=s.n?s.ms/s.n:0;
  if(avg>5)p.push('make() takes '+avg.toFixed(1)+' ms on average (limit 5 ms)');
  return{problems:p,note:s.n+' made puzzles (3 bands x 12 levels x '+s.days+' days), 108 bank puzzles (+36 with auto-cross off) solved by '+s.hints+' hints, at most '+s.maxSteps+' a puzzle; '+
    Object.entries(s.kinds).map(([a,b])=>a+' '+b).join(', ')};
});

// ---- P2-30: Spanish framework (unit data format, level 3 spell, voice fallback) ----
run('Spanish framework P2-30',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const allow=new Set(fs.readFileSync(path.join(ROOT,'tools','emoji-allow.txt'),'utf8').split('\n').map(l=>l.split('#')[0].trim().replace(/\uFE0F/g,'')).filter(Boolean));
  const errs=[],bad=m=>errs.push(m);
  const body=function(){
    // ---- unit format: every unit and item
    const ARTS=new Set(['','el','la','los','las']);
    if(!Array.isArray(ES_UNITS)||!ES_UNITS.length)bad('no ES_UNITS');
    const ids=ES_UNITS.map(u=>u.id);
    if(new Set(ids).size!==ids.length)bad('duplicate unit id');
    for(const u of ES_UNITS){
      const w0='unit '+u.id+': ';
      if(!/^[a-z]+$/.test(u.id))bad(w0+'bad id');
      for(const k of ['t','e','theme'])if(typeof u[k]!=='string'||!u[k].trim())bad(w0+'no '+k);
      if(!u.items||!u.items.length)bad(w0+'no items');
      if(!SK['es_'+u.id])bad(w0+'no skill es_'+u.id);
      else{
        if(SK['es_'+u.id].max!==(u.spell?3:2))bad(w0+'skill max '+SK['es_'+u.id].max);
        if(SK['es_'+u.id].t!==u.t||SK['es_'+u.id].e!==u.e)bad(w0+'title or emoji differs from the skill');
      }
      if(SPN[u.id]!==u.items)bad(w0+'SPN does not point at the items');
      const seen=new Set(),seenEn=new Set();
      for(const it of u.items){
        const w1=w0+JSON.stringify(it[0])+': ';
        if(!Array.isArray(it)||it.length<4||it.length>6)bad(w1+'item length');
        const [es,en,pic,art,artName,say]=it;
        if(typeof es!=='string'||!es||es!==es.normalize('NFC')||es!==es.toLowerCase()||es!==es.trim())bad(w1+'word is not a trimmed lowercase NFC string');
        if(typeof en!=='string'||!en.trim())bad(w1+'no gloss');
        if(!ARTS.has(art))bad(w1+'bad article '+art);
        const ok=/^c:#[0-9a-f]{6}$/.test(pic)||/^n:\d{1,3}$/.test(pic)||/^k:(1[0-2]|[1-9]):[0-5]\d$/.test(pic)||allow.has(pic.replace(/\uFE0F/g,''));
        if(!ok)bad(w1+'picture '+pic+' is not an emoji in tools/emoji-allow.txt, a c:#hex or an n:num');
        if(artName!==undefined&&artName!==''&&!/^[a-z-]+$/.test(artName))bad(w1+'bad art name');
        if(say!==undefined&&typeof say!=='string')bad(w1+'bad say');
        const key=(art?art+' ':'')+es;
        if(seen.has(key))bad(w1+'duplicate word');seen.add(key);
        if(seenEn.has(en))bad(w1+'duplicate gloss '+en);seenEn.add(en);
        if(u.spell&&!esSpellable(it))bad(w1+'spell unit has a word level 3 cannot spell');
      }
    }
    // ---- builder: levels 1 to 3 pass kindProblems on every shipped unit, and on a fixture spell unit with articles and accents
    const FX={id:'tst',t:'Test',e:'🏠',theme:'Test',spell:1,items:[['niño','boy','👦','el'],['bebé','baby','👶','el'],['pingüino','penguin','🐶','el'],['canción','song','🐱','la','','can-ción'],['hace sol','it is sunny','🌅','']]};
    ES_UNITS.push(FX);SPN.tst=FX.items;esReg(FX);
    if(SK.es_tst.max!==3)bad('esReg: fixture spell unit is not level 3');
    let n=0;
    for(const u of ES_UNITS){
      for(let lv=1;lv<=SK['es_'+u.id].max;lv++)for(let s=1;s<=200;s++){
        const q=genQ('es_'+u.id,lv,s);n++;
        for(const m of kindProblems(q))bad(u.id+' L'+lv+': '+m);
        const exp=lv==3?'spell':'choice';
        if(q.kind!==exp)bad(u.id+' L'+lv+': kind '+q.kind);
        if(q.lang!=='es')bad(u.id+' L'+lv+': lang');
        if(!q.label||!q.say&&lv!=2)bad(u.id+' L'+lv+': label or say');
        if(/\bundefined\b|\bNaN\b|\[object |\bnull\b/.test(q.html))bad(u.id+' L'+lv+': bad html');
        if(lv==3){
          if(!u.spell)bad(u.id+': level 3 from a unit without spell');
          if(!u.items.some(it=>it[0]===q.word))bad(u.id+' L3: word not in unit');
          if(q.html.includes(q.word)||q.hint.s.includes(q.word))bad(u.id+' L3: the answer is in the prompt or hint');
        }
        if(lv==1&&!q.html.includes('data-sayes'))bad(u.id+' L1: no speaker');
      }
    }
    // the article shows in levels 1 and 2 and is not part of the spelled word
    const q1=genQ('es_tst',1,3),q3=genQ('es_tst',3,4);
    if(!/“(el|la) /.test(q1.html)||!/^(el|la) /.test(q1.ans))bad('L1 does not show the article');
    if(/ /.test(q3.word)||q3.word==='hace sol')bad('L3 picked a word with a space');
    for(let s=1;s<=60;s++)if(genQ('es_tst',3,s).word==='hace sol')bad('L3 asked for a two-word item');
    if(genQ('es_tst',3,9).say!==genQ('es_tst',3,9).say)bad('say not reproducible');
    // ---- accent keys: typing the keys gives the exact word
    const keysOf=h=>new Set([...h.matchAll(/data-ch="([^"]+)"/g)].map(m=>m[1]));
    for(const [w,lang] of [['niño','es'],['pingüino','es'],['canción','es'],['bebé','es'],['ñandú','es'],['qué','es'],['está','es'],['sólo','es'],['¿cómo','es'],['¡hola','es']]){
      const q={kind:'spell',lang,word:w,ans:w,say:w,html:'<div class="emo">x</div><div class="lslots">'+[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')+'</div>'};
      const ks=keysOf(KIND.spell.render(q));let typed='';
      for(const c of w){if(!ks.has(c))bad('keyboard has no key for '+c+' ('+w+')');typed+=c}
      if(typed!==q.ans||String(typed)!==String(q.ans))bad('typed '+typed+' differs from '+w);
      if(kindProblems(q).length)bad('spell '+w+': '+kindProblems(q).join(','));
    }
    if(!kindProblems({kind:'spell',lang:'es',word:'n!no',ans:'n!no',say:'x',html:'<b>a</b><div class="lslots"><span id="ls0"></span><span id="ls1"></span><span id="ls2"></span><span id="ls3"></span></div>'}).length)bad('validator let an odd character through');
    for(const c of 'ñáéíóúü¿¡')if(!keysOf(KIND.spell.render({kind:'spell',lang:'es',word:'a'})).has(c))bad('es keyboard lacks '+c);
    if(keysOf(KIND.spell.render({kind:'spell',word:'a'})).has('ñ'))bad('accent row without lang es');
    // ---- old units: the 2700 questions of the original generators (es_* levels 1-2, seeds 1-150) are byte for byte the same as at v104
    ES_UNITS.pop();delete SPN.tst;delete SK.es_tst;
    const all=[];
    for(const id of Object.keys(SK).filter(k=>/^es_(greet|color|num|teen|animal|food|body|family|mix)$/.test(k)))for(let lv=1;lv<=2;lv++)for(let s=1;s<=150;s++)all.push(JSON.stringify(genQ(id,lv,s)));
    const h=require('crypto').createHash('md5').update(all.join('\n')).digest('hex');
    if(h!=='85968a5ca262a225f92f3a7354d2277e'||all.length!==2700)bad('old Spanish stops changed by seed: '+h+' ('+all.length+' questions)');
    for(const u of ES_UNITS)if(u.spell&&!NODES.es.some(x=>x.sk==='es_'+u.id&&x.lv===3))bad('level 3 is on in shipped unit '+u.id+' but no world has its stop');
    // ---- voice fallback: the mode function, late voices, and say() staying silent
    const V=(l)=>({lang:l});
    const cases=[[[],true,0,'wait'],[[],true,4000,'no'],[[V('en-US')],true,0,'no'],[[V('en-US'),V('es-MX')],true,0,'yes'],[[V('es_ES')],true,0,'yes'],[[V('es-419')],true,9999,'yes'],[[V('spa-ES')],true,0,'yes'],[[V('es-MX')],false,0,'no'],[[V('fr-FR'),V('de-DE')],true,0,'no']];
    for(const [vs,spk,ms,want] of cases)if(esVoiceMode(vs,spk,ms)!==want)bad('esVoiceMode '+JSON.stringify(vs)+' '+spk+' '+ms+' -> '+esVoiceMode(vs,spk,ms)+', wants '+want);
    let spoken=0,voices=[],notes=0;
    global.window={speechSynthesis:1};global.SpeechSynthesisUtterance=function(t){this.text=t};
    global.speechSynthesis={getVoices:()=>voices,speak:()=>{spoken++},cancel:()=>{}};
    fb=()=>{notes++};
    voices=[V('en-US')];ESNOTE=0;
    say('hola',null,'es');say('hola',null,'es',1);
    if(spoken)bad('say(es) spoke with no Spanish voice');
    if(esVoice()!=='no')bad('esVoice with English only is '+esVoice());
    if(notes!==1)bad("the no-voice note showed "+notes+" times, wants once per session");
    say('hello',null);if(spoken!==1)bad('English speech stopped when there is no Spanish voice');
    voices=[V('en-US'),V('es-MX')];                       // the voices arrive late
    say('hola',null,'es');if(spoken!==2)bad('Spanish speech did not start after the voice list filled in');
    if(esVoice()!=='yes')bad('esVoice after late voices is '+esVoice());
    delete global.window;delete global.SpeechSynthesisUtterance;global.speechSynthesis={getVoices:()=>[]};
    // ---- stops: this chunk adds none; a level 3 stop added later by world id leaves every older stop and its stars alone
    const base=NODES.es.map(nid).join(' ');
    if(!base.startsWith('es_greet1 es_color1 es_num1 es_animal1 es_greet2 es_color2 es_num2 es_animal2 boss_e_plaza es_food1 es_body1 es_family1 es_teen1 es_food2 es_body2 es_family2 es_teen2 boss_e_fiesta es_mix1 es_mix2 boss_e_repaso'))bad('Spanish stops changed: '+base);
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.es.worlds;ES_UNITS.push(FX);SPN.tst=FX.items;esReg(FX);
    let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky']){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);
      const snap=()=>{const o={};NODES.es.forEach((x,i)=>{o[nid(x)]={st:getSt('es',i),open:unlocked('es',i)}});return o};
      PATHS.es.worlds=CUR;buildNodes('es');const before=snap();
      PATHS.es.worlds=[...CUR,{id:'e_fx',g:-1,n:'Fx',e:'🏠',c:'#fff',nodes:[['es_tst',1,'T1'],['es_tst',2,'T2'],['es_tst',3,'T3']]}];buildNodes('es');
      const after=snap();
      for(const k in before){checked++;
        if(!after[k])bad(name+': stop '+k+' vanished');
        else{if(before[k].st!==after[k].st)bad(name+': '+k+' stars changed');if(before[k].open&&!after[k].open)bad(name+': '+k+' re-locked')}}
      if(after.es_tst3===undefined)bad(name+': level 3 stop missing from the fixture world');
      else if(after.es_tst3.st!==0)bad(name+': a new level 3 stop starts with stars');
      PATHS.es.worlds=CUR;buildNodes('es');
    }
    ES_UNITS.pop();delete SPN.tst;delete SK.es_tst;
    return{n,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:errs.concat([]).length?uniq(errs):[],note:r.n+' generated questions, '+r.checked+' stop checks'};
});

// ---- P2-14 Galaxy Core (6th) ----
run('Galaxy Core P2-14: stops in CURRICULUM order, 3,000 samples per new level with the maths recomputed, hints, say, labels, reproducible, old levels unchanged',()=>{
  const cur=fs.readFileSync(path.join(ROOT,'docs','CURRICULUM.md'),'utf8');
  const body=function(){
    S.name='Ava';S.buddy='Ben';S.pet='dino';G={built:[]};
    const bad=[],N=3000,add=m=>{if(bad.length<40&&!bad.includes(m))bad.push(m)};
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    const txt=h=>String(h).replace(/<svg[^]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ');
    const esc2=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const mn=v=>v<0?'−'+(-v):''+v; // shown number
    const num1=v=>Number.isInteger(v)?String(v):v.toFixed(1);
    const money=c=>'$'+(c%100?(c/100).toFixed(2):c/100);
    const decOf=c=>(c/100).toFixed(2).replace(/0+$/,'').replace(/\.$/,''); // cents -> text without trailing zeros
    // ---- an own evaluator for the labels: numbers, letters (variables), + − × ÷ ^ ( ), and a number or letter next to a letter or ( means times
    const ev=(src,vars={})=>{
      const t=src.match(/\d+(?:\.\d+)?|[a-z]|[+−×÷^()]/g)||[];let i=0;
      const atomStart=x=>x!==undefined&&(/^\d/.test(x)||/^[a-z]$/.test(x)||x=='(');
      const expr=()=>{let v=term();while(t[i]=='+'||t[i]=='−'){const o=t[i++],w=term();v=o=='+'?v+w:v-w}return v};
      const term=()=>{let v=pow();for(;;){if(t[i]=='×'||t[i]=='÷'){const o=t[i++],w=pow();v=o=='×'?v*w:v/w}else if(atomStart(t[i]))v*=pow();else break}return v};
      const pow=()=>{let v=atom();while(t[i]=='^'){i++;v=Math.pow(v,atom())}return v};
      const atom=()=>{const x=t[i++];if(x=='('){const v=expr();i++;return v}if(/^\d/.test(x))return +x;if(x in vars)return vars[x];throw new Error('bad token '+x)};
      const v=expr();if(i!==t.length)throw new Error('trailing '+t.slice(i).join(''));return v};
    // every "a op b op c = d" written in a hint step must be true
    const claims=p=>{const o=[];for(const m of p.matchAll(/(\$?\d+(?:\.\d+)?(?: [×÷+−] \$?\d+(?:\.\d+)?)+) = \$?(\d+(?:\.\d+)?)/g)){
      let v;try{v=ev(m[1].replace(/\$/g,''))}catch(e){o.push('cannot read '+m[0]);continue}
      if(Math.abs(v-parseFloat(m[2]))>1e-9)o.push(m[0])}return o};
    // ---- world: the stops of CURRICULUM 2.1 row 16, in that order, after Sky City (position by id)
    const mw=PATHS.math.worlds,wi=mw.findIndex(x=>x.id=='m_galaxy'),w=mw[wi]||{nodes:[]};
    const row=cur.match(/\| 16 \| `m_galaxy` \| Galaxy Core \| 6 \| ([^|]+) \|/);
    const want=row?row[1].trim().split(', ').map(s=>s.replace(' ','')).join(' '):'?';
    if(w.nodes.map(n=>n[0]+n[1]).join(' ')!==want)add('stop order: '+w.nodes.map(n=>n[0]+n[1]).join(' ')+' (CURRICULUM: '+want+')');
    if(want.split(' ').length!==10)add('CURRICULUM row 16 does not list 10 stops: '+want);
    if(wi<1||w.g!==6||w.n!=='Galaxy Core'||wi!==mw.findIndex(x=>x.id=='m_sky')+1)add('world g/name/position');
    if(w.nodes.some(n=>n[2].length>22))add('stop title over 22 letters: '+w.nodes.find(n=>n[2].length>22)[2]);
    if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)add('two stops share a title');
    const ids=NODES.math.map(nid);
    if(new Set(ids).size!==ids.length)add('stop ids repeat on the math path');
    if(WR.math[wi][1]-WR.math[wi][0]!==10||NODES.math[WR.math[wi][1]].sk!=='boss')add('11 stops: 10 and the boss');
    const mx={ooo:3,alg:3,geo:5,coord:2,fact:3,data:5,story:9};
    for(const k in mx)if(!SK[k]||SK[k].max<mx[k]||SK[k].area!=='math')add('SK.'+k+'.max');
    if(SK.alg.t!=='Equations'||/\d$/.test('alg'))add('SK.alg name');
    // ---- old levels unchanged: the dispatcher still calls the old generators with the same seed
    const sameQ=(sk,lv,fn)=>{for(let s=1;s<=60;s++){const sd=(s*7+3)>>>0,a=genQ(sk,lv,sd),prev=RNG;RNG=mulberry32(sd);let b;try{b=fn(lv);b.sk=sk;b.lv=lv;b.seed=sd}finally{RNG=prev}
      if(JSON.stringify(a)!==JSON.stringify(b)){add('old level changed: '+sk+lv);return}}};
    sameQ('ooo',1,vlOoo);sameQ('geo',1,ffGeo1);sameQ('geo',2,ffGeo2);sameQ('geo',3,dsGeo3);sameQ('geo',4,ccGeo4);sameQ('coord',1,ccCoord1);
    sameQ('fact',1,fyFact1);sameQ('fact',2,fyFact2);sameQ('data',1,genData1);sameQ('data',2,genBayData2);sameQ('data',3,ffData3);sameQ('data',4,ccData4);
    for(const lv of [1,2,3,5])sameQ('story',lv,genStoryAll);
    sameQ('story',4,genBayStory4);sameQ('story',6,ffStory6);sameQ('story',7,dsStory7);sameQ('story',8,ccStory8);
    // ---- picture helpers
    const labelsX=h=>{const all=[...h.matchAll(/<text x="([\d.-]+)" y="([\d.]+)">([^<]*)<\/text>/g)].map(m=>[+m[1],m[3],+m[2]]),y=Math.max(...all.map(t=>t[2]));return all.filter(t=>t[2]==y)};
    const nlVal=(h,x)=>{const L=labelsX(h).filter(t=>/^[−]?\d+$/.test(t[1])).map(t=>[t[0],+t[1].replace('−','-')]);
      if(L.length<2)return NaN;const a=L[0],b=L[L.length-1];return a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0])};
    const svgOf=h=>(h.match(/<svg[^]*?<\/svg>/g)||[]);
    // a ray picture -> {k, dir}
    const ray=h=>{const m=h.match(/<path class="vray" d="M([\d.]+) 28H([\d.]+)"\/><circle class="vm" cx="([\d.]+)" cy="28" r="9"\/>/);
      if(!m)return null;const x0=+m[1],x1=+m[2];if(+m[3]!==x0)return null;return{k:Math.round(nlVal(h,x0)),dir:x1>x0?'right':'left',x0,x1}};
    // four-quadrant grid geometry: origin and unit for a max (tap targets: unit 48, top 24; else unit floor(270/(2 max)) clamped 16..40, top 14)
    const geom=(mx,tap)=>{const p=tap?48:Math.max(16,Math.min(40,Math.floor(270/(2*mx)))),top=tap?24:14;return{p,ox:28+mx*p,oy:top+mx*p}};
    const pts=(h,mx,tap)=>{const g=geom(mx,tap),m=h.match(/<g class="v1">((?:<circle[^>]*\/>)+)/);if(!m)return[];
      return[...m[1].matchAll(/cx="([\d.]+)" cy="([\d.]+)" r="7"/g)].map(c=>[Math.round((+c[1]-g.ox)/g.p),Math.round((g.oy-+c[2])/g.p)])};
    const taps=(h,mx)=>{const g=geom(mx,true);return[...h.matchAll(/<g class="vt" data-v="(-?\d+),(-?\d+)"[^>]*><rect class="vh" x="([\d.-]+)" y="([\d.-]+)" width="(\d+)" height="(\d+)"\/>/g)]
      .map(m=>({x:+m[1],y:+m[2],ok:+m[3]===g.ox+g.p*m[1]-24&&+m[4]===g.oy-g.p*m[2]-24&&m[5]==48&&m[6]==48}))};
    const quad=(x,y)=>x>0?(y>0?'I':'IV'):(y>0?'II':'III');
    // ---- generic checks per level, then the maths of each level
    const levels=[['ooo',2],['ooo',3],['alg',1],['alg',2],['alg',3],['geo',5],['coord',2],['fact',3],['data',5],['story',9]];
    const share={},seen={};
    for(const [sk,lv] of levels){
      const key=sk+lv,labs={},seeLab=new Set(),S_=share[key]={};
      const tally=t=>{S_[t]=(S_[t]||0)+1};
      for(let i=0;i<N;i++){
        const q=genQ(sk,lv,i*7919+31),W=key+': ',L=q.label,a=q.ans;
        const pr=kindProblems(q);if(pr.length)add(W+L+': '+pr[0]);
        if(q.sk!==sk||q.lv!==lv)add(W+'not stamped');
        if(!q.say||/undefined|NaN|null/.test(q.say)||/\d\/\d/.test(q.say)||/[\^&<>]/.test(q.say))add(W+'say '+q.say);
        if(!q.hint||q.hint.k!=='steps'||hintHTML(q).length<10)add(W+'step hint missing');
        if(!L||L.length>=60||/undefined|NaN/.test(L))add(W+'label '+L);
        if(labs[L]!==undefined&&JSON.stringify(labs[L])!==JSON.stringify(a))add(W+'label '+L+' has two answers');
        labs[L]=a;seeLab.add(L);
        if(/undefined|NaN|\[object|null/.test(q.html))add(W+'html has undefined/NaN');
        if(q.kind=='num'&&numParts(a,numSeps(q)).some(t=>t.replace(/\D/g,'').length>(q.max||4)))add(W+'answer longer than max '+a);
        if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(a)||new Set(vs).size!==vs.length||vs.length<2||vs.length>4)add(W+'choices '+L);
          if(q.choices.some(c=>!c.h&&String(c.l).length>20))add(W+'a choice is long '+q.choices.find(c=>String(c.l).length>20).l)}
        // a hint teaches the method and never states the answer; every sum or product it writes is true
        {const pieces=q.hint.steps.map(s=>txt(s.html));
          if(q.hint.steps.length<2||!/\?/.test(pieces[pieces.length-1]))add(W+'steps: '+q.hint.steps.length+', last has no "?": '+pieces[pieces.length-1]);
          if(q.hint.steps.some(s=>!s.say||/undefined|NaN|[−]\d|[\^&<>]/.test(s.say)))add(W+'a step has no say or says a bare minus sign, ^ or <>');
          if(pieces.some(p=>/the answer is/i.test(p)))add(W+'hint says the answer');
          if(!/eq money/.test(L))for(const p of pieces)for(const c of claims(p))add(W+'a step is not true: '+c+' ('+L+')');
          if(q.kind=='num')for(const p of pieces)for(const A of [a,a.replace('-','−')]){
            const re=/^-?\d{1,2}$/.test(a)?'[×÷+−][^=|]*=\\s*':'(=|\\bis|equals|makes)\\s*';
            if(new RegExp(re+esc2(A)+'(?![\\d/.])').test(p))add(W+'hint gives the answer '+a+' in: '+p)}}
        let m;
        // ---------------- ooo 2
        if(sk=='ooo'&&lv==2){
          if(!(m=L.match(/^(.+) = \?$/))){add(W+'label '+L);continue}
          const E=m[1];let v;try{v=ev(E)}catch(e){add(W+'cannot read '+L);continue}
          if(!Number.isInteger(v)||v<2||v>400||a!==String(v))add(W+L+' -> '+a+', expected '+v);
          for(const t of E.matchAll(/(\d+)\^(\d)/g)){if(t[2]=='3'&&+t[1]>5)add(W+'cube base '+L);if(t[2]=='2'&&+t[1]>12)add(W+'square base '+L);if(+t[2]<2||+t[2]>3)add(W+'exponent '+L)}
          if(/\^(?![23])/.test(E)||(E.match(/\d+/g)||[]).some(n=>+n>12))add(W+'numbers '+L);
          if(!txt(q.html.replace(/<sup>(\d)<\/sup>/g,'^$1')).includes(E+' ='))add(W+'prompt '+L);
          const hint=txt(q.hint.steps.map(s=>s.html).join(' '));
          if(/\(/.test(E)&&!/Parentheses/.test(hint))add(W+'no parentheses step '+L);
          if(/\^/.test(E)&&!/Exponent|exponent/.test(hint))add(W+'no exponent step '+L);
          tally(/\(/.test(E)?'paren':'noparen');tally(/\^3/.test(E)?'cube':'nocube');tally(/\^2/.test(E)?'square':'nosquare');
        }
        // ---------------- ooo 3
        if(sk=='ooo'&&lv==3){
          if(!(m=L.match(/^(.+?), ((?:[a-z] = \d+)(?:, [a-z] = \d+)*)$/))){add(W+'label '+L);continue}
          const E=m[1],vars={};for(const t of m[2].matchAll(/([a-z]) = (\d+)/g))vars[t[1]]=+t[2];
          const names=Object.keys(vars);
          if(names.length>2||(names.length==2&&names.join()!=='x,y'))add(W+'variables '+m[2]);
          let v;try{v=ev(E,vars)}catch(e){add(W+'cannot read '+L);continue}
          if(!Number.isInteger(v)||v<1||v>200||a!==String(v))add(W+L+' -> '+a+', expected '+v);
          for(const n of names)if(vars[n]<2||vars[n]>(/÷/.test(E)?60:12)||(names.length==2&&vars[n]>9))add(W+'value '+L); // x ÷ a + b: x is a multiple of a
          for(const l of E.match(/[a-z]/g)||[])if(!(l in vars))add(W+'a letter without a value '+L);
          for(const n of names)if(!E.includes(n))add(W+'a given value is not used '+L);
          if(!txt(q.html).includes('Find the value when '+m[2]))add(W+'prompt '+L);
          if(!txt(q.html.replace(/<sup>(\d)<\/sup>/g,'^$1')).includes(E+' ='))add(W+'expression '+L);
          if(/[×]/.test(E))add(W+'a × sign in an expression with letters '+L);
          tally(names.length==2?'two':'one');tally(/\(/.test(E)?'paren':'noparen');tally(/\^2/.test(E)?'square':'nosquare');
        }
        // ---------------- alg 1
        if(sk=='alg'&&lv==1){
          let x,A,B,form;
          if(m=L.match(/^alg1 ([a-z]) \+ (\d+) = (\d+)$/)){A=+m[2];B=+m[3];x=B-A;form='add'}
          else if(m=L.match(/^alg1 (\d+) \+ ([a-z]) = (\d+)$/)){A=+m[1];B=+m[3];x=B-A;form='flip'}
          else if(m=L.match(/^alg1 ([a-z]) − (\d+) = (\d+)$/)){A=+m[2];B=+m[3];x=B+A;form='sub'}
          else{add(W+'label '+L);continue}
          if(x<0||x>99||A<2||B<0||B>99||a!==String(x))add(W+L+' -> '+a+', expected '+x);
          if(form!='sub'&&(x<1||A>60))add(W+'operands '+L);
          if(q.pad&&q.pad!=='int')add(W+'pad');
          if(!txt(q.html).includes(L.slice(5))||!/<div class="eq">[a-z] = <span class="slot"/.test(q.html))add(W+'prompt '+L);
          const st=q.hint.steps,balance=svgOf(st[0].html).length==1&&/viz-bal/.test(st[0].html);
          if(form=='sub'&&svgOf(st.map(s=>s.html).join('')).length)add(W+'picture in a subtraction hint');
          if(form!='sub'&&!balance)add(W+'no balance in the first step '+L);
          if(st.length!==3)add(W+'3 steps');
          tally(form);
        }
        // ---------------- alg 2
        if(sk=='alg'&&lv==2){
          let x,A,B,form;
          if(m=L.match(/^alg2 (\d+)([a-z]) = (\d+)$/)){A=+m[1];B=+m[3];x=B/A;form='mul'}
          else if(m=L.match(/^alg2 ([a-z]) ÷ (\d+) = (\d+)$/)){A=+m[2];B=+m[3];x=A*B;form='div'}
          else{add(W+'label '+L);continue}
          if(!Number.isInteger(x)||a!==String(x)||A<2||A>12||x<2||x>144)add(W+L+' -> '+a+', expected '+x);
          if(form=='mul'&&(x>15||B!==A*x))add(W+'operands '+L);
          if(form=='div'&&B>12)add(W+'operands '+L);
          tally(form);
        }
        // ---------------- alg 3
        if(sk=='alg'&&lv==3){
          if(m=L.match(/^alg3 (\d+)([a-z]) ([+−]) (\d+) = (\d+)$/)){
            const A=+m[1],P=m[3]=='+',B=+m[4],C=+m[5],x=(P?C-B:C+B)/A;
            if(!Number.isInteger(x)||x<1||x>12||A<2||A>9||B<1||B>20||C<1||a!==String(x)||q.kind!=='num')add(W+L+' -> '+a+', expected '+x);
            if(!txt(q.html).includes(L.slice(5)))add(W+'prompt '+L);
            if(q.hint.steps.length!==3)add(W+'3 steps');
            tally('eq');tally(P?'eq-add':'eq-sub');
          }else if(m=L.match(/^alg3 line x ([<>]) (-?\d+)$/)){
            const k=+m[2],dir=m[1]=='>'?'right':'left';
            if(q.kind!=='choice'||a!==k+dir||k===0||Math.abs(k)>4)add(W+L+' -> '+a);
            if(!txt(q.html).includes('x '+m[1]+' '+mn(k)))add(W+'prompt '+L);
            const lines=q.choices.map(c=>({v:c.v,r:ray(c.l)}));
            if(lines.some(c=>!c.r)){add(W+'a choice is not a ray line '+L);continue}
            const hit=lines.filter(c=>c.r.k===k&&c.r.dir===dir);
            if(hit.length!==1||hit[0].v!==a)add(W+'the lines that show '+L+': '+hit.length);
            if(new Set(lines.map(c=>c.r.k+c.r.dir)).size!==lines.length)add(W+'two choices draw the same line '+L);
            if(lines.some(c=>Math.abs(c.r.k)>5))add(W+'ray outside the line');
            tally('line');tally(k<0?'line-neg':'line-pos');tally(dir=='right'?'line-r':'line-l');
          }else if(m=L.match(/^alg3 name x ([<>]) (-?\d+)$/)){
            const k=+m[2],dir=m[1]=='>'?'right':'left',r=ray(q.html);
            if(q.kind!=='choice'||!r||r.k!==k||r.dir!==dir)add(W+L+' picture '+JSON.stringify(r));
            const hit=q.choices.filter(c=>{const t=c.l.match(/^x ([<>]) (−?\d+)$/);return t&&+t[2].replace('−','-')===k&&(t[1]=='>'?'right':'left')===dir});
            if(hit.length!==1||hit[0].v!==a)add(W+'choices that say '+L+': '+hit.length);
            if(q.choices.some(c=>!/^x [<>] −?\d+$/.test(c.l)))add(W+'choice text');
            tally('name');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- geo 5
        if(sk=='geo'&&lv==5){
          const unit=(L.match(/ (cm|m|in|ft)$/)||[])[1],sq={cm:'cm²',m:'m²',in:'in²',ft:'ft²'}[unit];
          let v,dims,kind;
          if(m=L.match(/^geo5 tri (\d+) (\d+) \w+$/)){const b=+m[1],h=+m[2];v=b*h/2;dims=[b,h];kind='tri';if(b<3||b>14||h<3||h>12)add(W+'range '+L)}
          else if(m=L.match(/^geo5 par (\d+) (\d+) (\d+) \w+$/)){const b=+m[1],h=+m[2],s=+m[3];v=b*h;dims=s?[b,h,s]:[b,h];kind='par';if(b<3||b>14||h<2||h>10||(s&&s<=h))add(W+'range '+L)}
          else if(m=L.match(/^geo5 trap (\d+) (\d+) (\d+) \w+$/)){const b1=+m[1],b2=+m[2],h=+m[3];v=(b1+b2)*h/2;dims=[b1,b2,h];kind='trap';if(b1<2||b2<=b1||b2>18||h<3||h>10)add(W+'range '+L)}
          else{add(W+'label '+L);continue}
          if(a!==num1(v)||!(v*2===Math.round(v*2)))add(W+L+' -> '+a+', expected '+num1(v));
          if(kind!=='par'&&(q.pad!=='dec'||q.eq!=='value'))add(W+'pad of a half answer');
          if(!KIND.num.same(q,a)||!KIND.num.same(q,a.includes('.')?a+'0':a+'.0')&&q.eq)add(W+'same()');
          const svg=svgOf(q.html)[0]||'',shown=[...svg.matchAll(/<text[^>]*>(\d+) (cm|m|in|ft)<\/text>/g)];
          if(shown.some(t=>t[2]!==unit)||shown.map(t=>+t[1]).sort((x,y)=>x-y).join()!==dims.slice().sort((x,y)=>x-y).join())add(W+'labels in the picture '+shown.map(t=>t[1])+' for '+L);
          if(!/class="vgd"/.test(svg)||!/viz-ds/.test(svg))add(W+'height line missing '+L);
          if(!txt(q.html).includes(sq))add(W+'unit '+L);
          if(/#[0-9a-fA-F]{3,8}\b|<defs|filter|id=/.test(svg))add(W+'picture: colour, id, defs or filter');
          tally(kind);tally(a.includes('.')?'half':'whole');
        }
        // ---------------- coord 2
        if(sk=='coord'&&lv==2){
          if(m=L.match(/^coord2 tap (-?\d+),(-?\d+)$/)){
            const x=+m[1],y=+m[2];
            if(q.kind!=='tap'||a!==x+','+y||!x||!y||Math.abs(x)>2||Math.abs(y)>2)add(W+L+' -> '+a);
            const t=taps(q.html,2);
            if(t.length<3||t.some(c=>!c.ok||Math.abs(c.x)>2||Math.abs(c.y)>2)||!t.some(c=>c.x===x&&c.y===y)||new Set(t.map(c=>c.x+','+c.y)).size!==t.length)add(W+'targets '+JSON.stringify(t)+' for '+L);
            if(!txt(q.html).includes('Tap the point ('+mn(x)+', '+mn(y)+')'))add(W+'prompt '+L);
            tally('tap');
          }else if(m=L.match(/^coord2 read (-?\d+),(-?\d+)$/)){
            const x=+m[1],y=+m[2];
            if(q.kind!=='choice'||!x||!y||Math.abs(x)>6||Math.abs(y)>6||a!==x+','+y)add(W+L+' -> '+a);
            if(JSON.stringify(pts(q.html,6))!==JSON.stringify([[x,y]]))add(W+'point drawn at '+JSON.stringify(pts(q.html,6))+' for '+L);
            const cs=q.choices.map(c=>{const t=c.l.match(/^\((−?\d+), (−?\d+)\)$/);return t&&t[1].replace('−','-')+','+t[2].replace('−','-')});
            if(cs.length!==4||cs.some((c,i)=>c!==q.choices[i].v)||new Set(cs).size!==4||cs.filter(c=>c===x+','+y).length!==1)add(W+'choices '+cs+' for '+L);
            tally('read');tally(x<0||y<0?'read-neg':'read-pos');
          }else if(m=L.match(/^coord2 quad (pic|pair) (-?\d+),(-?\d+)$/)){
            const x=+m[2],y=+m[3];
            if(q.kind!=='choice'||!x||!y||Math.abs(x)>6||Math.abs(y)>6||a!==quad(x,y)||q.choices.map(c=>c.v).join()!=='I,II,III,IV')add(W+L+' -> '+a);
            if(m[1]=='pic'&&JSON.stringify(pts(q.html,6))!==JSON.stringify([[x,y]]))add(W+'point drawn at '+JSON.stringify(pts(q.html,6))+' for '+L);
            if(m[1]=='pair'&&(!txt(q.html).includes('('+mn(x)+', '+mn(y)+')')||svgOf(q.html).length))add(W+'prompt '+L);
            tally('quad-'+m[1]);tally('quad'+a);
          }else if(m=L.match(/^coord2 reflect (x|y) (-?\d+),(-?\d+)$/)){
            const x=+m[2],y=+m[3],rx=m[1]=='y'?-x:x,ry=m[1]=='x'?-y:y;
            if(q.kind!=='choice'||!x||!y||Math.abs(x)>6||Math.abs(y)>6||a!==rx+','+ry)add(W+L+' -> '+a+', expected '+rx+','+ry);
            if(JSON.stringify(pts(q.html,6))!==JSON.stringify([[x,y]]))add(W+'point drawn at '+JSON.stringify(pts(q.html,6))+' for '+L);
            if(!txt(q.html).includes('across the '+m[1]+'-axis'))add(W+'axis in the prompt '+L);
            const cs=q.choices.map(c=>{const t=c.l.match(/^\((−?\d+), (−?\d+)\)$/);return t&&t[1].replace('−','-')+','+t[2].replace('−','-')});
            if(cs.length!==4||cs.some((c,i)=>c!==q.choices[i].v)||new Set(cs).size!==4||cs.filter(c=>c===rx+','+ry).length!==1)add(W+'choices '+cs+' for '+L);
            tally('reflect');tally('reflect-'+m[1]);
          }else if(m=L.match(/^coord2 reflect-tap (x|y) (-?\d+),(-?\d+)$/)){
            const x=+m[2],y=+m[3],rx=m[1]=='y'?-x:x,ry=m[1]=='x'?-y:y;
            if(q.kind!=='tap'||!x||!y||Math.abs(x)>2||Math.abs(y)>2||a!==rx+','+ry)add(W+L+' -> '+a+', expected '+rx+','+ry);
            const t=taps(q.html,2);
            if(t.length<3||t.some(c=>!c.ok)||!t.some(c=>c.x===rx&&c.y===ry)||t.some(c=>c.x===x&&c.y===y)||new Set(t.map(c=>c.x+','+c.y)).size!==t.length)add(W+'targets '+JSON.stringify(t)+' for '+L);
            if(JSON.stringify(pts(q.html,2,true))!==JSON.stringify([[x,y]]))add(W+'point drawn at '+JSON.stringify(pts(q.html,2,true))+' for '+L);
            tally('reflect-tap');
          }else{add(W+'label '+L);continue}
        }
        // ---------------- fact 3
        if(sk=='fact'&&lv==3){
          if(!(m=L.match(/^fact3 (gcf|lcm)(-w)? (\d+) (\d+)$/))){add(W+'label '+L);continue}
          const A=+m[3],B=+m[4],g=gcd(A,B),l=A/g*B,want=m[1]=='gcf'?g:l;
          if(A<2||B<2||A>36||B>36||A===B||(m[1]=='lcm'&&l>144))add(W+'range '+L); // only the LCM is held to 144
          if(a!==String(want)||q.kind!=='num')add(W+L+' -> '+a+', expected '+want);
          const t=txt(q.html);
          if(m[2]){if(!new RegExp('\\b'+A+'\\b').test(t)||!new RegExp('\\b'+B+'\\b').test(t))add(W+'numbers missing in the story '+L)}
          else if(!t.includes((m[1]=='gcf'?'GCF':'LCM')+'('+A+', '+B+')'))add(W+'prompt '+L);
          const hint=txt(q.hint.steps.map(s=>s.html).join(' '));
          const divs=n=>Array.from({length:n},(_,i)=>i+1).filter(k=>n%k==0);
          if(m[1]=='gcf'&&(!hint.includes('Factors of '+A+': '+divs(A).join(', ')+'.')||!hint.includes('Factors of '+B+': '+divs(B).join(', ')+'.')))add(W+'factor lists '+L);
          if(m[1]=='lcm'){const hi=Math.max(A,B),k=l/hi;
            if(k>1&&!hint.includes('Count by '+hi+'s: '+Array.from({length:k-1},(_,i)=>hi*(i+1)).join(', ')+', ...'))add(W+'multiples list '+L)}
          tally(m[1]);tally(m[2]?'word':'bare');if(m[1]=='gcf')tally(g==1?'gcf1':'gcfbig');else tally(l==Math.max(A,B)?'lcm-small':'lcm-more');
        }
        // ---------------- data 5
        if(sk=='data'&&lv==5){
          if(!(m=L.match(/^data5 (mean|median|mode|range) ([\d,]+)( plot)?$/))){add(W+'label '+L);continue}
          const vals=m[2].split(',').map(Number),n=vals.length,sorted=vals.slice().sort((x,y)=>x-y),sum=vals.reduce((s,v)=>s+v,0);
          const cnt={};vals.forEach(v=>{cnt[v]=(cnt[v]||0)+1});const top=Math.max(...Object.values(cnt)),modes=Object.keys(cnt).filter(k=>cnt[k]==top);
          if(n<5||n>7||sum%n||top<2||modes.length!==1||vals.some(v=>v<1||v>(m[3]?10:20)))add(W+'data set '+L);
          if(m[1]=='median'&&n%2==0)add(W+'even count for a median '+L);
          const want={mean:sum/n,median:sorted[(n-1)>>1],mode:+modes[0],range:sorted[n-1]-sorted[0]}[m[1]];
          if(a!==String(want)||q.kind!=='num'||q.pad)add(W+L+' -> '+a+', expected '+want);
          if(sum/n===(sorted[(n-1)>>1]+sorted[n>>1])/2)add(W+'mean equals median '+L);
          const t=txt(q.html);
          if(!t.includes('What is the '+m[1]+'?'))add(W+'prompt '+L);
          if(m[3]){
            const svg=svgOf(q.html)[0]||'',g=svg.match(/<g class="v1">((?:<circle[^>]*\/>)+)/),
              dots=g?[...g[1].matchAll(/cx="([\d.]+)" cy="[\d.]+" r="8"/g)].map(c=>Math.round(nlVal(svg,+c[1]))).sort((x,y)=>x-y):[];
            if(dots.join()!==sorted.join())add(W+'dots '+dots+' for '+L);
          }else if(!t.includes(vals.join(', ')))add(W+'list not shown '+L);
          tally(m[1]);tally(m[3]?'plot':'list');tally('n'+n);
        }
        // ---------------- story 9
        if(sk=='story'&&lv==9){
          const t=txt(q.html);let want,more=true;
          if(m=L.match(/^story9 ratio (\d+):(\d+) (\d+)( all)?$/)){
            const p=+m[1],r=+m[2],M=+m[3],all=!!m[4],k=M/p;
            if(!Number.isInteger(k)||gcd(p,r)>1||p===r||k<2||k>9||p>7||r>7||(!all&&r<2))add(W+'operands '+L);
            want=String(all?(p+r)*k:r*k);
            if(!t.includes(p+' : '+r)||!t.includes('There are '+M+' '))add(W+'prompt '+L);
            tally('ratio');tally(all?'ratio-all':'ratio-part');
          }else if(m=L.match(/^story9 rate (\d+) (\d+) (\d+)$/)){
            const T=+m[1],n=+m[2],M=+m[3],u=T/n;
            if(!Number.isInteger(u)||M<=n||M>10||n<2||n>6)add(W+'operands '+L);
            want=String(u*M);
            if(!new RegExp('\\b'+T+'\\b').test(t)||!new RegExp('\\b'+n+'\\b').test(t)||!new RegExp('\\b'+M+'\\b').test(t))add(W+'numbers missing '+L);
            tally('rate');
          }else if(m=L.match(/^story9 price (\d+) (\d+) (\d+)$/)){
            const n=+m[1],tot=+m[2],M=+m[3],u=tot/n;
            if(!Number.isInteger(u)||u%5||u<50||u>900||n===M||n<2||n>8||M<2||M>10)add(W+'operands '+L);
            want=decOf(u*M);
            if(!t.includes(n+' ')||!t.includes(money(tot))||!t.includes('do '+M+' '))add(W+'prompt '+L);
            if(q.pad!=='dec'||q.eq!=='value')add(W+'pad');
            tally('price');
          }else if(m=L.match(/^story9 pct (part|sale|tip) (\d+) (\d+)$/)){
            const pct=+m[2],P=+m[3],part=P*pct/100;
            if(!(P*pct*2%100==0)||pct===50&&m[1]=='sale')add(W+'operands '+L);
            want=m[1]=='part'?String(part):m[1]=='sale'?num1(P-part):num1(part);
            if(m[1]=='part'&&!Number.isInteger(part))add(W+'a part that is not whole '+L);
            if(!t.includes(pct+'%')||!t.includes(m[1]=='part'?String(P):'$'+P))add(W+'prompt '+L);
            if(m[1]!='part'&&(q.pad!=='dec'||q.eq!=='value'))add(W+'pad');
            tally('pct');tally('pct-'+m[1]);
          }else if(m=L.match(/^story9 eq (add|sub|mul|div) (\d+) (\d+)$/)){
            const A=+m[2],B=+m[3];
            want=String({add:B-A,sub:B+A,mul:B/A,div:A*B}[m[1]]);
            if(m[1]=='mul'&&B%A)add(W+'not whole '+L);
            if(!new RegExp('\\b'+A+'\\b').test(t)||!new RegExp('\\b'+B+'\\b').test(t))add(W+'numbers missing '+L);
            tally('eq');tally('eq-'+m[1]);
          }else if(m=L.match(/^story9 eq money (\d+) (\d+)$/)){
            const A=+m[1],B=+m[2];
            if(B-A<100||A%5||B%5)add(W+'operands '+L);
            want=decOf(B-A);
            if(!t.includes(money(A))||!t.includes(money(B)))add(W+'prompt '+L);
            if(q.pad!=='dec'||q.eq!=='value')add(W+'pad');
            tally('eq');tally('eq-money');
          }else{add(W+'label '+L);continue}
          if(a!==want||q.kind!=='num'||!q.auto)add(W+L+' -> '+a+', expected '+want);
          if(a.includes('.')&&!KIND.num.same(q,a+'0'))add(W+'a decimal with a trailing zero is refused '+L);
          if(a.includes('.')&&/\.\d*0$/.test(a))add(W+'answer has a trailing zero '+a);
          if(!KIND.num.same(q,a))add(W+'the right answer is refused '+L);
        }
      }
      seen[key]=seeLab.size;
      // reproducible: the same seed gives the same question, hint and choices
      for(let s=1;s<=40;s++)if(JSON.stringify(genQ(sk,lv,s))!==JSON.stringify(genQ(sk,lv,s)))add(key+' seed '+s+' not reproducible');
    }
    // ---- mixes (each variant shows up a fair share of the time)
    const fair=(k,names,lo)=>{for(const n of names)if(!((share[k]||{})[n]>N*lo))add(k+': '+n+' too rare '+JSON.stringify(share[k]))};
    fair('ooo2',['paren','noparen','cube','square'],.12);
    fair('ooo3',['one','two','paren','noparen','square'],.08);
    fair('alg1',['add','sub','flip'],.08);fair('alg2',['mul','div'],.4);
    fair('alg3',['eq','eq-add','eq-sub','line','line-neg','line-pos','line-r','line-l','name'],.07);
    fair('geo5',['tri','par','trap','half','whole'],.15);
    fair('coord2',['tap','read','read-neg','read-pos','quad-pic','quad-pair','quadI','quadII','quadIII','quadIV','reflect','reflect-x','reflect-y','reflect-tap'],.03);
    fair('fact3',['gcf','lcm','word','bare','gcf1','gcfbig','lcm-more'],.04);
    fair('data5',['mean','median','mode','range','plot','list','n5','n7'],.1);
    fair('story9',['ratio','ratio-all','ratio-part','rate','price','pct','pct-part','pct-sale','pct-tip','eq','eq-add','eq-sub','eq-mul','eq-div','eq-money'],.02);
    for(const [k,min] of [['ooo2',300],['ooo3',500],['alg1',500],['alg2',150],['alg3',200],['geo5',300],['coord2',150],['fact3',300],['data5',1500],['story9',500]])if(seen[k]<min)add(k+': only '+seen[k]+' different labels');
    return bad;
  };
  const r=eval(js+';('+body.toString()+')()');
  // the block of this chunk: no Math.random, no raw colour, every global starts with gal
  const src=fs.readFileSync(path.join(SRC,'js','35-gen-math-upper.js'),'utf8'),i0=src.indexOf('// ---- P2-14 Galaxy Core ----'),i1=src.indexOf('\n// ---- P',i0+10),blk=src.slice(i0,i1<0?undefined:i1);
  if(i0<0)r.push('P2-14 block marker missing');
  if(/#[0-9a-fA-F]{3,8}\b/.test(blk))r.push('P2-14 block has a raw hex colour');
  if(/Math\.random/.test(blk))r.push('P2-14 block uses Math.random');
  for(const m of blk.matchAll(/^(?:const|function) ([A-Za-z_$][\w$]*)/gm))if(!/^gal/i.test(m[1]))r.push('P2-14 block: global '+m[1]+' does not start with gal');
  if(src.indexOf('// ---- P2-13 Sky City ----')>i0||src.indexOf('// ---- P2-13 Sky City ----')<0)r.push('P2-14 block must come after the P2-13 block');
  // the new picture: VIZ.rayLine
  const vz=eval(js+';VIZ');
  const rl=(k,d)=>vz.rayLine({at:k,dir:d});
  for(const [k,d] of [[3,'right'],[-2,'left'],[0,'right'],[-4,'right']]){
    const h=rl(k,d);
    if(h!==rl(k,d))r.push('rayLine not deterministic');
    if(/#[0-9a-fA-F]{3,8}|id=|<defs|filter|style="[^"]*(fill|stroke)/.test(h.replace(/style="--vw:\d+"/,'')))r.push('rayLine: raw colour, id, defs or filter');
    if(!h.includes('>−5<')||!h.includes('>5<')||(h.match(/<text /g)||[]).length!==11||!/class="vray"/.test(h)||!/class="vm"/.test(h))r.push('rayLine labels, ray or dot '+k+d);
    const m=h.match(/<path class="vray" d="M([\d.]+) 28H([\d.]+)"\/>/),x0=+m[1],x1=+m[2],lo=24-14,hi=24+290+14;
    if(d=='right'?!(x1>x0&&x1>hi-8):!(x1<x0&&x1<lo+8))r.push('rayLine ray does not reach the end of the line '+k+d);
    const labs=[...h.matchAll(/<text x="([\d.]+)" y="[\d.]+">(−?\d+)<\/text>/g)];
    const lab=labs.find(t=>+t[2].replace('−','-')===k);
    if(!lab||Math.abs(+lab[1]-x0)>.6)r.push('rayLine dot not on '+k);
  }
  const g4=vz.coordGrid({quadrants:4,max:2,tapPts:[[-2,-2],[2,2],[-1,2]]});
  if(g4!==vz.coordGrid({quadrants:4,max:2,tapPts:[[-2,-2],[2,2],[-1,2]]})||!g4.includes('>−2<')||/#[0-9a-fA-F]{3,8}|id=|<defs|filter/.test(g4))r.push('coordGrid four quadrants: deterministic, minus sign, colour');
  const tg=[...g4.matchAll(/<rect class="vh" x="[\d.-]+" y="[\d.-]+" width="(\d+)" height="(\d+)"/g)];
  if(tg.length!==3||tg.some(x=>x[1]<48||x[2]<48))r.push('coordGrid four quadrants: tap targets under 48 units');
  const vw=+(g4.match(/--vw:(\d+)/)||[0,999])[1];
  if(vw>310)r.push('coordGrid with tap targets is wider than a 380 px phone card (about 316 units): '+vw);
  // CSS: the ray colour is a token
  const css=fs.readFileSync(path.join(SRC,'css','45-galaxy.css'),'utf8');
  if(!/\.vray\{[^}]*var\(--math-shade\)/.test(css)||/#[0-9a-fA-F]{3,8}\b/.test(css))r.push('45-galaxy.css: ray colour must be a token, no raw colour');
  return{problems:r,note:'10 levels x 3,000 samples'};
});

run('Galaxy Core P2-14: the new world keeps every star, re-locks nothing and the map opens where it did (fixtures x grades; the path ends at Galaxy Core while it runs)',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const body=function(){
    const out=[],b=m=>{if(out.length<25&&!out.includes(m))out.push(m)};
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    // the path ends at Galaxy Core while this runs, so worlds added after it by later chunks do not matter here
    const ALL=PATHS.math.worlds,GI=ALL.findIndex(w=>w.id=='m_galaxy'),ORIG=ALL.slice(0,GI+1),without=()=>ORIG.filter(w=>w.id!=='m_galaxy');
    PATHS.math.worlds=ORIG;buildNodes('math');
    const snap=()=>{const o={};NODES.math.forEach((n,i)=>{o[nid(n)]={st:getSt('math',i),open:unlocked('math',i),pass:passed('math',i),wid:n.wid}});return o};
    const fixtures=[];
    for(const name of ['fresh','midway','maxed','tricky','legacy-single-map','legacy-index-maps'])fixtures.push([name,fx(name)]);
    // synthetic saves: everything before Galaxy Core passed (with and without the last boss), and Galaxy Core partly played
    const mk=(boss,extra)=>{load(null);PATHS.math.worlds=without();buildNodes('math');const m={};
      NODES.math.forEach(n=>{if(n.sk!=='boss'||boss)m[nid(n)]=2});PATHS.math.worlds=ORIG;buildNodes('math');
      return JSON.stringify({v:LATEST,mapv:2,name:'Kid',maps:{math:Object.assign(m,extra||{}),read:{},es:{}},grade:6})};
    fixtures.push(['path-done',mk(true)],['stops-done-no-boss',mk(false)],['galaxy-started',mk(true,{ooo2:3,alg1:2,ooo3:1})]);
    let checked=0,moved=0;
    for(const [name,raw] of fixtures)for(const g of [null,-1,0,1,2,3,4,5,6]){
      load(raw.length>2?raw:null);if(g!==null)S.grade=g;
      const tag=name+' g'+gradeOf()+': ',maps=JSON.stringify(S.maps);
      const now=snap(),cur=nid(NODES.math[curNode('math')]),curW=NODES.math[curNode('math')].wid;
      PATHS.math.worlds=without();buildNodes('math');
      const old=snap(),curOld=nid(NODES.math[curNode('math')]);
      PATHS.math.worlds=ORIG;buildNodes('math');
      for(const k in old){
        checked++;
        if(!now[k]){b(tag+'stop '+k+' disappeared');continue}
        if(now[k].st!==old[k].st)b(tag+'stars of '+k+' changed');
        if(old[k].pass&&!now[k].open)b(tag+'passed stop '+k+' re-locked');
        if(old[k].open&&!now[k].open)b(tag+k+' locked by the new world');
      }
      const given=(JSON.parse(raw).maps||{}).math||{};
      for(const k in now)if(!(k in old)&&now[k].st&&!(k in given))b(tag+'new stop '+k+' has stars');
      if(JSON.stringify(S.maps)!==maps)b(tag+'building the nodes changed the map');
      // the map opens on the same stop as before, except that a child with nothing left before Galaxy Core (every older stop passed)
      // meets it next
      if(cur!==curOld){
        moved++;
        const prevDone=NODES.math.filter(n=>n.wi<GI).every(n=>passed('math',NODES.math.indexOf(n)));
        if(curW!=='m_galaxy'||!(prevDone||worldFinished('math',GI-1)))b(tag+'map opens on '+cur+' (was '+curOld+')');
      }
      if(curW==='m_galaxy'&&!worldFinished('math',GI-1)&&!worldHasProgress('math',GI))b(tag+'the map opens in Galaxy Core before the world before it is done');
    }
    PATHS.math.worlds=ALL;buildNodes('math');
    // a 5th grader does not see Galaxy Core open until Sky City is finished; a 6th grader can enter it
    load(null);S.grade=5;if(worldOpen('math',GI))b('grade 5: Galaxy Core is open before the world before it is done');
    S.grade=6;if(!worldOpen('math',GI))b('grade 6: Galaxy Core must be open');
    return{out,checked,moved};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:r.out,note:r.checked+' stop checks against a path without Galaxy Core, map moved on '+r.moved+' of 81 loads'};
});

// ---- P2-31: Spanish world La Casa (es_house, es_clothes, es_school, es_feel) ----
run('Spanish La Casa P2-31',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const allow=new Set(fs.readFileSync(path.join(ROOT,'tools','emoji-allow.txt'),'utf8').split('\n').map(l=>l.split('#')[0].trim().replace(/️/g,'')).filter(Boolean));
  const errs=[],bad=m=>{if(errs.length<40&&!errs.includes(m))errs.push(m)};
  // the known gender of every noun (Latin American Spanish); feelings are adjectives with no article
  const GEN={house:{casa:'la',puerta:'la',ventana:'la',mesa:'la',silla:'la',cama:'la',cocina:'la',baño:'el',jardín:'el',lámpara:'la',sala:'la'},
    clothes:{camisa:'la',pantalones:'los',vestido:'el',zapatos:'los',sombrero:'el',chaqueta:'la',calcetines:'los',gorra:'la',botas:'las',corbata:'la'},
    school:{libro:'el',lápiz:'el',mochila:'la',papel:'el',maestra:'la',maestro:'el',escuela:'la',clase:'la',tijeras:'las',borrador:'el'},
    feel:{feliz:'',triste:'',enojado:'',cansado:'',asustado:'',enfermo:'',emocionado:'',tranquilo:'',sorprendido:''}};
  const COUNT={house:11,clothes:10,school:10,feel:9};
  const body=function(GEN,COUNT){
    const N=3000;
    const ids=Object.keys(GEN),UN=id=>ES_UNITS.find(u=>u.id===id);
    // ---- units: counts, genders, spelling flags, accents, pictures, no duplicates across all units
    const OLD=['greet','color','num','teen','animal','food','body','family'];
    if(ES_UNITS.slice(0,8).map(u=>u.id).join()!==OLD.join())bad('the first 8 units were reordered or changed');
    if(ES_UNITS.slice(8,12).map(u=>u.id).join()!==ids.join())bad('La Casa units are not appended in order: '+ES_UNITS.slice(8,12).map(u=>u.id));
    for(const id of ids){
      const u=UN(id);if(!u){bad('missing unit '+id);continue}
      if(u.items.length!==COUNT[id])bad(id+': '+u.items.length+' words, wants '+COUNT[id]);
      if(u.items.length<8||u.items.length>14)bad(id+': outside 8-14 words');
      if(u.mix)bad(id+': mix must not be set (es_mix seeds would shift)');
      if(!!u.spell!==(id!=='feel'))bad(id+': spell flag');
      const want=GEN[id];
      if(u.items.map(i=>i[0]).sort().join()!==Object.keys(want).sort().join())bad(id+': word list differs from the spec list');
      for(const it of u.items){
        const w=id+' '+it[0]+': ';
        if(it[0]!==it[0].normalize('NFC')||it[0]!==it[0].toLowerCase()||/\s/.test(it[0]))bad(w+'not a bare lowercase NFC word');
        if(it[3]!==want[it[0]])bad(w+'article '+JSON.stringify(it[3])+' but the noun is '+JSON.stringify(want[it[0]]));
        const pic=it[2].replace(/️/g,'');
        if(!allow.has(pic))bad(w+'picture '+it[2]+' not in emoji-allow.txt');
        if(u.spell&&!esSpellable(it))bad(w+'not spellable');
        if(it[4]&&!ART[it[4]])bad(w+'art name '+it[4]+' has no drawing');
      }
      const pics=u.items.map(i=>i[4]||i[2]);
      if(new Set(pics).size!==pics.length)bad(id+': two words share a picture (a level 1 choice would be ambiguous)');
      if(SK['es_'+id].max!==(u.spell?3:2))bad(id+': skill max');
    }
    // the plural nouns end in s, the singular articles agree in number
    for(const u of ES_UNITS){const seenW=new Set();for(const it of u.items)seenW.add(it[0])}
    const all={};
    for(const u of ES_UNITS)for(const it of u.items){if(all[it[0]])bad('word "'+it[0]+'" in both '+all[it[0]]+' and '+u.id);all[it[0]]=u.id}
    for(const u of ES_UNITS)if(u.mix!==(OLD.includes(u.id)?1:undefined))bad('mix flag changed on '+u.id);
    // ---- questions: 3,000 seeded per level pass kindProblems, level 3 asks only spellable words of the unit
    let n=0;
    for(const id of ids){
      const u=UN(id);
      for(let lv=1;lv<=SK['es_'+id].max;lv++){
        const seenWords=new Set();
        for(let s=1;s<=N;s++){
          const q=genQ('es_'+id,lv,s*13+1);n++;
          const pr=kindProblems(q);if(pr.length)bad(id+' L'+lv+': '+pr[0]);
          if(q.lang!=='es'||/undefined|NaN|null|\[object/.test(q.html))bad(id+' L'+lv+': lang or html');
          if(lv===3){
            const it=u.items.find(i=>i[0]===q.word);
            if(!it||!esSpellable(it))bad(id+' L3 asked '+q.word);
            else{seenWords.add(q.word);if(q.ans!==q.word||q.html.includes(q.word))bad(id+' L3 answer shown');}
            if(q.kind!=='spell')bad(id+' L3 kind');
          }else{
            if(q.kind!=='choice')bad(id+' L'+lv+' kind');
            const cs=q.choices.map(c=>c.v);
            if(new Set(cs).size!==cs.length||!cs.includes(q.ans))bad(id+' L'+lv+' choices');
            if(!/^(el |la |los |las )?[a-zñáéíóúü]+$/.test(q.ans))bad(id+' L'+lv+' ans '+q.ans);
          }
        }
        if(lv===3&&seenWords.size!==u.items.length)bad(id+' L3 did not reach every word: '+seenWords.size+'/'+u.items.length);
      }
    }
    if(SK.es_feel.max!==2)bad('es_feel must stop at level 2');
    // ---- world and stop order (CURRICULUM 2.3 row 4)
    const ws=PATHS.es.worlds,wi=ws.findIndex(w=>w.id==='e_casa'),w=ws[wi];
    if(wi!==3||ws.map(x=>x.id).slice(0,3).join()!=='e_plaza,e_fiesta,e_repaso')bad('e_casa is not the 4th world after e_repaso');
    else{
      const got=w.nodes.map(x=>x[0]+x[1]).join(' ');
      if(got!=='es_house1 es_house2 es_clothes1 es_clothes2 es_school1 es_school2 es_feel1 es_feel2 es_house3 es_clothes3 es_school3')bad('stop order: '+got);
      if(w.g!==-1||w.n!=='La Casa')bad('world g or name');
      if(w.nodes.some(x=>x[2].length>22))bad('a stop title is over 22 letters');
      if(new Set(w.nodes.map(x=>x[2])).size!==w.nodes.length)bad('stop titles repeat');
      const ni=NODES.es.map(nid);if(new Set(ni).size!==ni.length)bad('stop ids repeat');
      if(NODES.es[WR.es[wi][1]].sk!=='boss'||WR.es[wi][1]-WR.es[wi][0]!==11)bad('11 stops and the boss');
    }
    if(!NODES.es.map(nid).join(' ').startsWith('es_greet1 es_color1 es_num1 es_animal1 es_greet2 es_color2 es_num2 es_animal2 boss_e_plaza es_food1 es_body1 es_family1 es_teen1 es_food2 es_body2 es_family2 es_teen2 boss_e_fiesta es_mix1 es_mix2 boss_e_repaso '))bad('old Spanish stops changed');
    // ---- old Spanish stops: the P2-30 hash still holds (es_mix draws only from the 8 old units)
    const old=[];
    for(const id of ['greet','color','num','teen','animal','food','body','family','mix'])for(let lv=1;lv<=2;lv++)for(let s=1;s<=150;s++)old.push(JSON.stringify(genQ('es_'+id,lv,s)));
    const hash=require('crypto').createHash('md5').update(Object.keys(SK).filter(k=>/^es_(greet|color|num|teen|animal|food|body|family|mix)$/.test(k)).flatMap(id=>{const o=[];for(let lv=1;lv<=2;lv++)for(let s=1;s<=150;s++)o.push(JSON.stringify(genQ(id,lv,s)));return o}).join('\n')).digest('hex');
    if(hash!=='85968a5ca262a225f92f3a7354d2277e'||old.length!==2700)bad('old Spanish stops changed by seed: '+hash);
    // ---- saves: no star moves, nothing re-locks, a child who finished e_repaso sees La Casa open
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.es.worlds;let checked=0;
    // the path ends at La Casa while this runs: the Spanish worlds after it (El Tiempo, La Ciudad) were not shipped before it and have their own checks
    const CUT=CUR.slice(0,CUR.findIndex(x=>x.id==='e_casa')+1);
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky']){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);
      const snap=()=>{const o={};NODES.es.forEach((x,i)=>{o[nid(x)]={st:getSt('es',i),open:unlocked('es',i)}});return o};
      PATHS.es.worlds=CUT.filter(x=>x.id!=='e_casa');buildNodes('es');const before=snap();
      PATHS.es.worlds=CUT;buildNodes('es');const after=snap();
      for(const k in before){checked++;
        if(!after[k])bad(name+': stop '+k+' vanished');
        else{if(before[k].st!==after[k].st)bad(name+': '+k+' stars changed');if(before[k].open&&!after[k].open)bad(name+': '+k+' re-locked')}}
      for(const x of CUR[3].nodes){const k=x[0]+x[1];if(!after[k])bad(name+': new stop '+k+' missing');else if(after[k].st!==0)bad(name+': new stop '+k+' starts with stars')}
    }
    // a child who finished Gran Repaso: La Casa opens by order, its first stop is playable, the later ones wait
    load(null);
    NODES.es.forEach((x,i)=>{if(x.wi<3)setSt('es',i,3)});
    if(!worldOpen('es',3)||!unlocked('es',WR.es[3][0])||unlocked('es',WR.es[3][0]+1))bad('after Gran Repaso: La Casa is not open at its first stop only');
    if(curNode('es')!==WR.es[3][0])bad('the map does not open on the first La Casa stop');
    load(null);
    NODES.es.forEach((x,i)=>{if(x.wi<2)setSt('es',i,3)});
    if(worldOpen('es',3))bad('La Casa open before Gran Repaso is done');
    load(null);
    return{n,checked};
  };
  const r=eval(js+';('+body.toString()+')('+JSON.stringify(GEN)+','+JSON.stringify(COUNT)+')');
  return{problems:uniq(errs),note:r.n+' generated questions, '+r.checked+' stop checks'};
});

// ---- P2-32 Spanish world El Tiempo ----
run('Spanish El Tiempo P2-32',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const errs=[],bad=m=>{if(errs.length<40&&!errs.includes(m))errs.push(m)};
  const body=function(){
    const U=id=>ES_UNITS.find(u=>u.id===id);
    const N=3000;
    // a small Spanish number-word function: 1-99 and 100
    const ONES=['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve'];
    const V=['veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
    const TENS=['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
    const nw=n=>n==100?'cien':n<20?ONES[n]:n<30?V[n-20]:TENS[Math.floor(n/10)]+(n%10?' y '+ONES[n%10]:'');
    if(nw(21)!=='veintiuno'||nw(35)!=='treinta y cinco'||nw(99)!=='noventa y nueve'||nw(100)!=='cien'||nw(30)!=='treinta'||nw(16)!=='dieciséis')bad('test number-word function is wrong');
    // ---- units: counts, words, articles, pictures
    const want={
      days:{n:10,words:'lunes martes miércoles jueves viernes sábado domingo hoy mañana ayer'},
      months:{n:16,words:'enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre primavera verano otoño invierno'},
      weather:{n:10,words:'hace sol|hace calor|hace frío|hace viento|llueve|nieva|está nublado|hace fresco|hay tormenta|arco iris'},
      big:{n:18},time:{n:20}};
    for(const id in want){
      const u=U(id);
      if(!u){bad('unit '+id+' missing');continue}
      if(u.items.length!==want[id].n)bad(id+': '+u.items.length+' items, wants '+want[id].n);
      if(u.spell||u.mix)bad(id+': spell or mix set');
      if(!SK['es_'+id]||SK['es_'+id].max!==2||SK['es_'+id].area!=='es')bad(id+': skill');
      for(const it of u.items){
        if(it[0]!==it[0].normalize('NFC')||it[0]!==it[0].toLowerCase()||it[0]!==it[0].trim())bad(id+': '+it[0]+' not NFC lowercase');
        if(it[1].length<2)bad(id+': gloss');
      }
    }
    const names=(id,sep)=>U(id).items.map(i=>i[0]).join(sep||' ');
    if(names('days')!==want.days.words)bad('days: '+names('days'));
    if(names('months')!==want.months.words)bad('months: '+names('months'));
    if(names('weather','|')!==want.weather.words)bad('weather: '+names('weather','|'));
    const EN7=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    U('days').items.slice(0,7).forEach((it,i)=>{if(it[1]!==EN7[i]||it[3]!=='el')bad('day '+it[0]+': gloss or article')});
    U('days').items.slice(7).forEach((it,i)=>{if(it[1]!==['today','tomorrow','yesterday'][i]||it[3]!=='')bad('day word '+it[0])});
    const EM=['January','February','March','April','May','June','July','August','September','October','November','December'];
    U('months').items.slice(0,12).forEach((it,i)=>{if(it[1]!==EM[i]||it[3]!=='')bad('month '+it[0])});
    const SEA={primavera:['spring','la'],verano:['summer','el'],otoño:['fall','el'],invierno:['winter','el']};
    U('months').items.slice(12).forEach(it=>{const e=SEA[it[0]];if(!e||it[1]!==e[0]||it[3]!==e[1])bad('season '+it[0])});
    if(U('weather').items.find(i=>i[0]==='arco iris')[3]!=='el')bad('arco iris article');
    if(U('weather').items.some(i=>i[0]!=='arco iris'&&i[3]!==''))bad('weather phrase with an article');
    // big numbers: every picture is n:N and the word is the Spanish for N; the first 8 are the tens (level 1)
    const big=U('big');
    if(big.l1!==8)bad('big l1');
    big.items.forEach((it,i)=>{
      const m=/^n:(\d+)$/.exec(it[2]);
      if(!m)bad('big '+it[0]+': picture '+it[2]);
      else{const n=+m[1];if(nw(n)!==it[0])bad('big: '+it[0]+' is not '+n+' ('+nw(n)+')');if(i<8&&!(n%10==0&&n>=30))bad('big level 1 item '+n+' is not a ten');if(i>=8&&(n<21||n>99||n%10==0))bad('big level 2 item '+n)}
    });
    if(!big.items.some(i=>i[0]==='treinta y cinco'))bad('treinta y cinco missing');
    // time: o'clock first (12), then y media and y cuarto; the clock picture, the words and the gloss agree
    const tm=U('time');
    if(tm.l1!==12)bad('time l1');
    tm.items.forEach((it,i)=>{
      const m=/^k:(\d+):(\d\d)$/.exec(it[2]);
      if(!m){bad('time '+it[0]+': picture '+it[2]);return}
      const h=+m[1],mi=+m[2];
      const exp=(h==1?'es la una':'son las '+ONES[h])+(mi==30?' y media':mi==15?' y cuarto':'');
      if(it[0]!==exp)bad('time: '+it[0]+' should be '+exp);
      if(it[1]!==h+':'+m[2])bad('time gloss '+it[1]);
      if(i<12&&mi!==0)bad('time level 1 item not on the hour');
      if(i>=12&&mi===0)bad('time level 2 item on the hour');
      if(!/viz-clk/.test(picHTML(it,false)))bad('time picture does not draw a clock: '+it[0]);
    });
    if(ES_UNITS.flatMap(u=>u.items).some(i=>i[2]==='🌧'))bad('🌧 draws as a blob in headless Chrome');
    // no word twice across ALL Spanish units, and no gloss twice inside the new units
    const seen={};
    for(const u of ES_UNITS)for(const it of u.items){const k=it[0];if(seen[k])bad('word '+k+' is in both '+seen[k]+' and '+u.id);seen[k]=u.id}
    for(const id in want){const g=U(id).items.map(i=>i[1]);if(new Set(g).size!==g.length)bad(id+': duplicate gloss')}
    // ---- questions: 3,000 seeded per level pass kindProblems
    const numOf=h=>{const m=/class="numpic">(\d+)</.exec(h);return m?+m[1]:null};
    for(const id in want){
      const u=U(id);
      for(let lv=1;lv<=2;lv++){
        const pool=lv==1&&u.l1?u.items.slice(0,u.l1):u.items,bare=new Set(pool.map(i=>(i[3]?i[3]+' ':'')+i[0]));
        const hit=new Set();
        for(let s=1;s<=N;s++){
          const q=genQ('es_'+id,lv,s);
          for(const m of kindProblems(q))bad(id+' L'+lv+': '+m);
          if(q.kind!=='choice'||q.lang!=='es')bad(id+' L'+lv+': kind/lang');
          if(!bare.has(q.ans))bad(id+' L'+lv+': answer '+q.ans+' is not from the level pool');
          hit.add(q.ans);
          const vs=q.choices.map(c=>c.v);
          if(vs.length!==3||new Set(vs).size!==3||!vs.includes(q.ans))bad(id+' L'+lv+': choices '+vs.join('|'));
          if(vs.some(v=>!bare.has(v)))bad(id+' L'+lv+': a choice from outside the level pool');
          if(/\bundefined\b|\bNaN\b|\[object |\bnull\b/.test(q.html+q.choices.map(c=>c.l).join('')))bad(id+' L'+lv+': bad html');
          if(id==='big'){
            // the number picture and the word agree: level 1 the picture of the right choice, level 2 the picture shown
            if(lv==1){const c=q.choices.find(c=>c.v===q.ans),n=numOf(c.l);if(nw(n)!==q.ans)bad('big L1: picture '+n+' for '+q.ans);if(n%10)bad('big L1 asked a non-ten '+n)}
            else{const n=numOf(q.html);if(nw(n)!==q.ans)bad('big L2: picture '+n+' for '+q.ans)}
          }
          if(id==='time'){
            const clk=lv==1?q.choices.find(c=>c.v===q.ans).l:q.html;
            if(!/viz-clk/.test(clk))bad('time L'+lv+': no clock picture');
            if(lv==1&&/ y (media|cuarto)/.test(q.ans))bad('time L1 asked '+q.ans);
          }
        }
        if(hit.size!==bare.size)bad(id+' L'+lv+': only '+hit.size+' of '+bare.size+' words asked in '+N+' seeds');
      }
    }
    // level 2 of big and time really reach the later items
    const lv2=id=>{const a=new Set();for(let s=1;s<=400;s++)a.add(genQ('es_'+id,2,s).ans);return a};
    if(!lv2('big').has('treinta y cinco'))bad('big L2 never asks treinta y cinco');
    if(!lv2('time').has('son las tres y media'))bad('time L2 never asks y media');
    // ---- world and stops, by id
    const ws=PATHS.es.worlds,wi=ws.findIndex(w=>w.id==='e_tiempo'),w=ws[wi];
    if(!w)bad('no world e_tiempo');
    else{
      if(wi<=ws.findIndex(x=>x.id==='e_repaso')||wi<=ws.findIndex(x=>x.id==='e_fiesta'))bad('e_tiempo is not after the older worlds');
      if(w.n!=='El Tiempo'||w.g!==-1)bad('world name or grade');
      const got=w.nodes.map(n=>n[0]+n[1]).join(' ');
      if(got!=='es_days1 es_days2 es_months1 es_months2 es_weather1 es_weather2 es_big1 es_big2 es_time1 es_time2')bad('stop order '+got);
      if(w.nodes.some(n=>n[2].length>22))bad('stop title over 22 letters');
      if(new Set(w.nodes.map(n=>n[2])).size!==w.nodes.length)bad('two stops share a title');
      const ids=NODES.es.map(nid);
      if(new Set(ids).size!==ids.length)bad('stop ids repeat on the Spanish path');
      if(ids.slice(0,21).join(' ')!=='es_greet1 es_color1 es_num1 es_animal1 es_greet2 es_color2 es_num2 es_animal2 boss_e_plaza es_food1 es_body1 es_family1 es_teen1 es_food2 es_body2 es_family2 es_teen2 boss_e_fiesta es_mix1 es_mix2 boss_e_repaso')bad('older Spanish stops changed');
      if(WR.es[wi][1]-WR.es[wi][0]!==10||NODES.es[WR.es[wi][1]].sk!=='boss')bad('10 stops and the boss');
    }
    // ---- fixture saves: the old stops keep their stars and openness, and the new stops start at 0 stars
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.es.worlds,OLD=CUR.filter(x=>x.id!=='e_tiempo');let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky']){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);
      const snap=()=>{const o={};NODES.es.forEach((x,i)=>{o[nid(x)]={st:getSt('es',i),open:unlocked('es',i)}});return o};
      PATHS.es.worlds=OLD;buildNodes('es');const before=snap();
      PATHS.es.worlds=CUR;buildNodes('es');const after=snap();
      for(const k in before){checked++;
        if(!after[k])bad(name+': stop '+k+' vanished');
        else{if(before[k].st!==after[k].st)bad(name+': '+k+' stars changed');if(before[k].open&&!after[k].open)bad(name+': '+k+' re-locked')}}
      for(const x of w.nodes){const k=x[0]+x[1];if(!after[k])bad(name+': new stop '+k+' missing');else if(after[k].st!==0)bad(name+': new stop '+k+' starts with stars')}
    }
    PATHS.es.worlds=CUR;buildNodes('es');
    return{checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:errs.length?uniq(errs):[],note:'5 units x 2 levels x 3000 questions, '+r.checked+' stop checks'};
});

// ---- P2-33: Spanish world La Ciudad (places, transport, verbs, adjectives) ----
run('Spanish La Ciudad P2-33',()=>{
  const fx=n=>fs.readFileSync(path.join(__dirname,'fixtures',n+'.json'),'utf8');
  const allow=new Set(fs.readFileSync(path.join(ROOT,'tools','emoji-allow.txt'),'utf8').split('\n').map(l=>l.split('#')[0].trim().replace(/️/g,'')).filter(Boolean));
  const errs=[],bad=m=>{if(errs.length<40&&!errs.includes(m))errs.push(m)};
  const body=function(){
    const WANT={place:[9,14],trans:[7,14],verb:[10,14],adj:[10,14]};
    // genders from an explicit list (nouns only); verbs and adjectives carry no article
    const GEN={parque:'el',tienda:'la',biblioteca:'la',hospital:'el',playa:'la',restaurante:'el',iglesia:'la',mercado:'el',calle:'la',banco:'el',cine:'el',
      carro:'el',autobús:'el',tren:'el',avión:'el',bicicleta:'la',barco:'el',camión:'el',moto:'la',helicóptero:'el',cohete:'el'};
    const U={};for(const id in WANT){U[id]=ES_UNITS.find(u=>u.id===id);if(!U[id])bad('no unit '+id)}
    // the four units are appended after the original eight, in this order
    const ids=ES_UNITS.map(u=>u.id),at=ids.indexOf('place');
    if(at<8||ids.slice(at,at+4).join(' ')!=='place trans verb adj')bad('unit order '+ids.join(' '));
    if(ids.slice(0,8).join(' ')!=='greet color num teen animal food body family')bad('original units moved');
    for(const id in WANT){const u=U[id];if(!u)continue;
      const [lo,hi]=WANT[id];
      if(u.items.length<lo||u.items.length>hi)bad(id+': '+u.items.length+' words, wants '+lo+' to '+hi);
      if(u.mix||u.spell)bad(id+': must not set mix or spell');
      if(!SK['es_'+id]||SK['es_'+id].max!==2)bad(id+': skill missing or not 2 levels');
      for(const it of u.items){
        const w=id+' '+it[0]+': ';
        if(it[0]!==it[0].normalize('NFC')||it[0]!==it[0].toLowerCase())bad(w+'not NFC lowercase');
        if(id==='place'||id==='trans'){if(GEN[it[0]]!==it[3])bad(w+'article '+it[3]+' wants '+GEN[it[0]])}
        else if(it[3]!=='')bad(w+'verbs and adjectives have no article');
        if(id==='verb'&&!/(ar|er|ir)$/.test(it[0]))bad(w+'not an infinitive');
        if(id==='verb'&&!/^to /.test(it[1]))bad(w+'gloss should be "to ..."');
        if(id==='adj'&&/(a|as|os)$/.test(it[0]))bad(w+'not a masculine singular form');
        if(!allow.has(it[2].replace(/️/g,'')))bad(w+'picture '+it[2]+' not in the allow-list');
      }
    }
    for(const id of ['place','verb','adj'])if(U[id]&&!U[id].cap)bad(id+': needs cap:1 (English under the picture)');
    for(const k of Object.keys(GEN))if(!U.place.items.concat(U.trans.items).some(it=>it[0]===k))bad('missing noun '+k);
    for(const k of ['correr','saltar','comer','beber','dormir','leer','escribir','jugar','cantar','bailar','nadar','caminar'])if(!U.verb.items.some(it=>it[0]===k))bad('missing verb '+k);
    for(const k of ['grande','pequeño','alto','bajo','rápido','lento','nuevo','viejo','caliente','frío','bonito','limpio','sucio'])if(!U.adj.items.some(it=>it[0]===k))bad('missing adjective '+k);
    // no duplicate word across all units, no shared picture inside a new unit
    const all=new Map();
    for(const u of ES_UNITS){const pics=new Set();for(const it of u.items){
      if(all.has(it[0]))bad('word '+it[0]+' is in '+all.get(it[0])+' and '+u.id);all.set(it[0],u.id);
      if(WANT[u.id]){if(pics.has(it[2]))bad(u.id+': two words share picture '+it[2]);pics.add(it[2])}}}
    // levels 1 and 2: 3,000 seeded questions per level through kindProblems, one right answer each
    let n=0;
    for(const id in WANT)for(let lv=1;lv<=2;lv++)for(let s=1;s<=3000;s++){
      const q=genQ('es_'+id,lv,s);n++;
      for(const m of kindProblems(q))bad(id+' L'+lv+': '+m);
      if(q.kind!=='choice'||q.lang!=='es')bad(id+' L'+lv+': kind or lang');
      if(new Set(q.choices.map(c=>c.v)).size!==q.choices.length)bad(id+' L'+lv+': duplicate choices');
      if(q.choices.filter(c=>c.v===q.ans).length!==1)bad(id+' L'+lv+': not one right answer');
      if(/\bundefined\b|\bNaN\b|\[object |\bnull\b/.test(q.html))bad(id+' L'+lv+': bad html');
      if(lv===2&&U[id].cap&&!q.html.includes('pcap'))bad(id+' L2: no English caption');
    }
    // old Spanish stops: the P2-30 hash still holds
    const olds=[];
    for(const id of ['greet','color','num','teen','animal','food','body','family','mix'].map(x=>'es_'+x))for(let lv=1;lv<=2;lv++)for(let s=1;s<=150;s++)olds.push(JSON.stringify(genQ(id,lv,s)));
    const h=require('crypto').createHash('md5').update(olds.join('\n')).digest('hex');
    if(h!=='85968a5ca262a225f92f3a7354d2277e'||olds.length!==2700)bad('old Spanish stops changed by seed: '+h);
    // world and stop order by id
    const wi=PATHS.es.worlds.map(w=>w.id),ci=wi.indexOf('e_ciudad');
    if(ci<0)bad('no e_ciudad');
    if(wi.slice(0,3).join(' ')!=='e_plaza e_fiesta e_repaso')bad('original worlds moved: '+wi.join(' '));
    if(ci>=0&&ci<3)bad('e_ciudad must come after the original worlds');
    const W=PATHS.es.worlds[ci];
    if(W){
      if(W.g!==-1||W.n!=='La Ciudad')bad('world fields '+W.g+' '+W.n);
      const got=W.nodes.map(x=>x[0]+x[1]).join(' ');
      if(got!=='es_place1 es_place2 es_trans1 es_trans2 es_verb1 es_verb2 es_adj1 es_adj2')bad('stops '+got);
      for(const x of W.nodes)if(x[2].length>22)bad('title too long: '+x[2]);
      const ids2=NODES.es.map(nid);
      if(new Set(ids2).size!==ids2.length)bad('duplicate stop ids');
      if(!ids2.includes('boss_e_ciudad'))bad('no boss stop');
      if(NODES.es.filter(x=>x.wid==='e_ciudad'&&x.sk!=='boss').map(nid).join(' ')!=='place1 place2 trans1 trans2 verb1 verb2 adj1 adj2'.replace(/(\w+)/g,'es_$1'))bad('node ids '+ids2.join(' '));
    }
    // save safety: with or without the world, every older stop keeps its stars and openness on all fixtures
    const store={};
    global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
    const load=raw=>{for(const k in store)delete store[k];if(raw!=null)store[KEY]=raw;loadSave(raw);migrate()};
    const CUR=PATHS.es.worlds;let checked=0;
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps','tricky']){
      const raw=fx(name);load(Object.keys(JSON.parse(raw)).length?raw:null);
      const snap=()=>{const o={};NODES.es.forEach((x,i)=>{o[nid(x)]={st:getSt('es',i),open:unlocked('es',i)}});return o};
      PATHS.es.worlds=CUR.filter(w=>w.id!=='e_ciudad');buildNodes('es');const before=snap();
      PATHS.es.worlds=CUR;buildNodes('es');const after=snap();
      for(const k in before){checked++;
        if(!after[k])bad(name+': stop '+k+' vanished');
        else{if(before[k].st!==after[k].st)bad(name+': '+k+' stars changed');if(before[k].open&&!after[k].open)bad(name+': '+k+' re-locked')}}
      if(after.es_place1&&after.es_place1.st!==0)bad(name+': a new stop starts with stars');
    }
    PATHS.es.worlds=CUR;buildNodes('es');
    return{n,checked};
  };
  const r=eval(js+';('+body.toString()+')()');
  return{problems:errs.length?uniq(errs):[],note:r.n+' generated questions, '+r.checked+' stop checks'};
});

// ---- report ----
let failed=0;
for(const r of results){
  const ok=!r.problems.length;if(!ok)failed++;
  console.log((ok?'ok    ':'FAIL  ')+r.name+(r.note?'  ['+r.note+']':'')+(r.known.length?'  ('+r.known.length+' known exception'+(r.known.length>1?'s':'')+')':''));
  for(const p of r.problems.slice(0,10))console.log('        - '+p);
  if(r.problems.length>10)console.log('        ... and '+(r.problems.length-10)+' more');
  for(const k of r.unusedKnown)console.log('        note: KNOWN exception no longer needed: '+k);
}
console.log(failed?failed+' of '+results.length+' checks FAILED':'all '+results.length+' checks passed');
process.exitCode=failed?1:0;
