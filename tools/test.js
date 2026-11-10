// Star School test suite. Run: node tools/test.js   (exit 0 = all checks pass, exit 1 = at least one failed)
// Each check is named and returns a list of problems. Known real content problems are listed in KNOWN below (each one is
// also recorded in docs/PROGRESS.md "Ideas and issues"); a problem that matches a KNOWN entry is reported as "known", not as a failure.
const fs=require('fs');
const path=require('path'),ROOT=path.join(__dirname,'..'),SRC=path.join(ROOT,'src');
const cat=d=>fs.readdirSync(path.join(SRC,d)).filter(n=>n.endsWith('.js')).sort().map(n=>fs.readFileSync(path.join(SRC,d,n),'utf8')).join('');
const js=cat('js')+cat('data'); // all code and data, without boot.js

// ---- Budgets and known exceptions: the one place to change them ----
const SIZE_WARN=1200000,SIZE_FAIL=1500000; // bytes of the built index.html (ROADMAP risk R1)
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
    'es_mix L2: no say (choice)'
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
S.name='Ava';S.buddy='Ben';G={built:[]};
GEN={n:0,gen:[],label:[],say:[],html:[],choices:[],skills:SK,paths:PATHS,nodes:NODES};
const BADHTML=/\\bundefined\\b|\\bNaN\\b|\\[object |\\bnull\\b/;
for(const id in SK){for(let lv=1;lv<=SK[id].max;lv++)for(let i=0;i<3000;i++){
 const q=SK[id].gen(lv),w=id+' L'+lv;GEN.n++;
 if(q.ans===undefined)GEN.gen.push(w+': no ans');
 if(typeof q.label!=='string'||!q.label.trim())GEN.label.push(w+': empty label');
 else if(q.label.length>=60)GEN.label.push(w+': label too long ('+q.label.length+')');
 if(typeof q.say!=='string'||!q.say.trim())GEN.say.push(w+': no say ('+q.kind+')');
 for(const [f,v] of [['html',q.html],['label',q.label],['say',q.say]])if(typeof v==='string'&&BADHTML.test(v))GEN.html.push(w+': '+f+' has undefined/NaN');
 if(q.kind=='num'){const a=+q.ans;if(!(a>=0)||String(a)!==q.ans)GEN.gen.push(w+': bad num ans '+q.ans)}
 else if(q.kind=='choice'){
  const vs=q.choices.map(c=>c.v);
  if(!vs.includes(q.ans))GEN.gen.push(w+': ans not in choices');
  if(new Set(vs).size!==vs.length)GEN.gen.push(w+': duplicate choices');
  if(vs.length<2||vs.length>4)GEN.choices.push(w+': '+vs.length+' choices');
  for(const c of q.choices){if(BADHTML.test(c.l+' '+c.v))GEN.html.push(w+': choice has undefined/NaN');if(BAD.test(c.v))GEN.gen.push(w+': BAD word '+c.v)}
 }
 else if(q.kind=='build'){if(!q.tiles||q.tiles.length<q.word.length)GEN.gen.push(w+': too few tiles')}
 else GEN.gen.push(w+': unknown kind '+q.kind);
 try{hintHTML(q)}catch(e){GEN.gen.push(w+': hintHTML threw '+e.message)}
}}
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
  for(const id in GEN.skills)for(let lv=1;lv<=GEN.skills[id].max;lv++)if(!used.has(id+':'+lv))p.push(id+' level '+lv+' has no map node');
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
      if (f.c !== (f.op == '+' ? f.a + f.b : f.a - f.b)) bad(s.id + ' wrong answer ' + FLU.fkey(f));
      if (f.c < (s.id.startsWith('add') ? 2 : 0) || f.c > 20 || f.a < 0 || f.b < 0) bad(s.id + ' out of range ' + FLU.fkey(f));
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
  for(const id in SK)for(let lv=1;lv<=SK[id].max;lv++){
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
run('icons: first 40 present, drawing rules, every ico() name exists',()=>{
  const p=[];
  const ic=eval(fs.readFileSync(path.join(SRC,'js','15-icons.js'),'utf8')+';({ICONS,ico,icoSprite})');
  const FIRST40=('star coin ticket flame home back map play pause replay sound-on sound-off speak gear lock check close hint heart gift '+
    'trophy target bolt paw bag sticker-book gamepad puzzle path-math path-read path-es path-disc plus minus times divide '+
    'backspace go calendar crown').split(' ');
  for(const n of FIRST40)if(!ic.ICONS[n])p.push('missing icon: '+n);
  for(const [n,d] of Object.entries(ic.ICONS)){
    if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n))p.push(n+': name must be lowercase-hyphenated');
    if(d.length>=600)p.push(n+': '+d.length+' bytes (limit 600)');
    const tags=d.match(/<\/?[a-z]+/g)||[];
    for(const t of tags)if(!/^<(path|circle|ellipse|rect)$/.test(t))p.push(n+': element '+t+'> not allowed');
    if((d.match(/<[^>]*\/>/g)||[]).join('')!==d)p.push(n+': every element must be self-closing, nothing between them');
    if(/gradient|filter|<text|url\(|style=/i.test(d))p.push(n+': no gradients, filters, text, url() or style');
    const hex=d.replace(/var\(--ic2,#fff\)/g,'').match(/#[0-9a-f]{3,8}\b/gi);
    if(hex)p.push(n+': raw colour '+hex[0]+' (use currentColor or var(--ic2,#fff))');
    const fills=(d.match(/(fill|stroke)="[^"]*"/g)||[]).filter(a=>!/^(fill|stroke)="(currentColor|none|var\(--ic2,#fff\))"$/.test(a));
    if(fills.length)p.push(n+': colour must be currentColor, none or var(--ic2,#fff): '+fills[0]);
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
  for(const id in SK)for(let lv=1;lv<=SK[id].max;lv++)for(let s=1;s<=300;s++)qs.push([id+' L'+lv,genQ(id,lv,s)]);
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
  PASS.__p=[{lv:1,title:'T'.repeat(41),text:'x '.repeat(700),qs:[base,{...base,q:'Two?'},{...base,q:'Three?'}]}];
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
  if(cnt(V.base10(234),/h-[\d.]+z/g)!==9)p.push('base10(234) does not draw 2 + 3 + 4 blocks');
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
    for(const p in MAP_V42)MAP_V42[p].forEach(([id,stops],k)=>{
      const w=PATHS[p].worlds[k],now=w?NODES[p].filter(n=>n.wi==k&&n.sk!='boss').map(nid).join(' '):'';
      if(!w||w.id!==id||now!==stops)bad('MAP_V42 '+p+' '+k+' does not match today ('+id+')');
    });
    // v42 view of a save (keys by world index): stars per stop and the old lock rule, in today's NODES order (same as v42)
    const oldSt=(maps,p)=>NODES[p].map(n=>(maps[p]||{})[n.sk=='boss'?'boss'+n.wi:nid(n)]||0);
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
      for(const p in PATHS){
        const was=oldSt(pre.maps,p),now=NODES[p].map((n,i)=>getSt(p,i));
        if(JSON.stringify(was)!==JSON.stringify(now))bad(name+' '+p+': stars '+JSON.stringify(was)+' -> '+JSON.stringify(now));
        const wo=oldOpen(was,S.unlockAll),no=NODES[p].map((n,i)=>unlocked(p,i));
        // maxed and fresh look exactly the same. Legacy saves (stops skipped by the old single map) and midway (P1-06 infers grade 1, which opens the grade-1 worlds) may open more, never less.
        if(name.startsWith('legacy')||name=='midway'?wo.some((o,i)=>o&&!no[i]):JSON.stringify(wo)!==JSON.stringify(no))bad(name+' '+p+': locks changed');
        if(oldCur(was)!==curNode(p))bad(name+' '+p+': current stop '+oldCur(was)+' -> '+curNode(p));
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
    if(!worldOpen('math',0)||worldOpen('math',1)||!unlocked('math',0)||unlocked('math',1))bad('fresh, no grade: only the first stop open');
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
    if(!worldFinished('math',1)||!worldOpen('math',2)||!unlocked('math',WR.math[1][1])||!unlocked('math',WR.math[2][0]))bad('S.skip does not finish a world');
    // "harder world" game time: with no grade it equals the old index rule; worlds below the grade give nothing
    load(null);
    for(const p in PATHS)PATHS[p].worlds.forEach((w,wi)=>{if(worldStep(p,wi)!==wi)bad('worldStep '+w.id+' '+worldStep(p,wi)+' (old rule '+wi+')')});
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
    PATHS.math.worlds[0]={...ORIG.math[0],nodes:[...ORIG.math[0].nodes.slice(0,3),['add',98,'New stop'],...ORIG.math[0].nodes.slice(3)]};buildNodes('math');
    const ni=NODES.math.findIndex(n=>n.lv==98);
    if(!unlocked('math',ni)||!stopNew('math',ni)||!worldFinished('math',0)||!worldOpen('math',1))bad('stop added to a finished world: not open, not NEW, or the world re-opened');
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
    if(LATEST!==5||MIGRATIONS.length!==5)bad('LATEST should be 5, MIGRATIONS '+MIGRATIONS.length);
    // 1. migration 4: inferred grade per fixture (highest graded world with progress), idempotent, nothing else changes
    const want={fresh:0,midway:1,maxed:2,'legacy-single-map':0,'legacy-index-maps':0};
    for(const name of Object.keys(want)){
      const raw=fx(name),obj=JSON.parse(raw),empty=!Object.keys(obj).length;
      load(empty?null:raw);
      const g=S.grade;
      if(empty){ // a brand-new save has no grade until setup picks one; gradeOf() is K
        if(g!==undefined&&g!==0)bad(name+': new save grade '+g);
      }else if(g!==want[name])bad(name+': inferred grade '+g+', expected '+want[name]);
      if(S.v!==5)bad(name+': S.v '+S.v);
      MIGRATIONS[4]();const once=JSON.stringify(S);migrate();MIGRATIONS[4]();if(JSON.stringify(S)!==once)bad(name+': migration 4 not idempotent');
    }
    // an existing choice is kept, not overwritten
    {const o=JSON.parse(fx('maxed'));o.v=4;o.grade=-1;load(JSON.stringify(o));if(S.grade!==-1)bad('migration 4 overwrote S.grade');}
    // a grade-less save from v46 (LATEST 4) gets one through the normal path and keeps its stars
    {const o=JSON.parse(fx('midway'));o.v=4;load(JSON.stringify(o));if(S.v!==5||S.grade!==1||S.stars!==o.stars)bad('v4 save not migrated to 5');}
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
  // the picture generators go through picFor: with a drawing for every word, no word emoji is left in their html
  const PW=[...CVC,...BLEND,...MAGICE,...TEAMS];
  for(const [w] of PW)ART[w]='<rect width="64" height="64"/>';
  for(const sk of ['pic','build'])for(let lv=1;lv<=SK[sk].max;lv++)for(let s=1;s<=60;s++){
    const q=genQ(sk,lv,s);
    for(const [w,e] of PW)if(q.html.includes(e)){bad.push(sk+lv+' seed '+s+': emoji '+e+' not routed through picFor');break}
  }
  for(const [w] of PW)delete ART[w];
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
    if(PLACE.first(PATHS.math.worlds,0)!==0||PLACE.first(PATHS.math.worlds,1)!==0||PLACE.first(PATHS.math.worlds,2)!==1
      ||PLACE.first(PATHS.math.worlds,3)!==3||PLACE.first(PATHS.math.worlds,6)!==3)bad('start world per grade on math');
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
    {const{st}=run1(PATHS.math.worlds,1,[4,4,4,4]);want('all right on math (4 worlds)',[st.done,st.at,st.all,st.skip],[true,3,true,[0,1,2,3]])}
    {const{st}=run1(PATHS.read.worlds,2,[4,1]);want('reading grade 2: pass Candy, not yet Reef',[st.done,st.at,st.skip],[true,2,[0,1]])}
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
        if(pn=='allRight'&&!st.all)bad(name+': all right should pass every world');
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
    if(LATEST!==5)bad('P1-08 adds no migration; LATEST should stay 5');
    for(const name of ['fresh','midway','maxed','legacy-single-map','legacy-index-maps']){
      const raw=fx(name),obj=JSON.parse(raw);load(Object.keys(obj).length?raw:null);
      const before=JSON.stringify([S.stars,S.coins,S.pet,S.maps,S.wdone]);
      for(const p in NODES)for(const s of mastStops(p))if(s.state!=='new'||s.rec!==null)bad(name+': '+s.nid+' not new without S.mast');
      if(masteryState('add1')!=='new'||mastRec('add1')!==null)bad(name+': masteryState with no S.mast');
      if(JSON.stringify([S.stars,S.coins,S.pet,S.maps,S.wdone])!==before)bad(name+': reading mastery changed progress');
    }
    // 1. harder / easier: next and previous stop of the same skill in path order
    const N=NODES.math,at=(sk,lv)=>N.find(n=>n.sk==sk&&n.lv==lv);
    if(harder(at('add',1))!==at('add',2)||harder(at('add',2))!==at('add',3)||easier(at('add',2))!==at('add',1))bad('harder/easier add');
    if(easier(at('add',1))!==null||harder(N.find(n=>n.sk=='boss'))!==null)bad('easier(add1) / harder(boss) should be null');
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
    {const o=sim('math',0,()=>[true,20000]);if(G.mode!==''||o.some(x=>x.tag))bad('slow 100% bot got challenge');}
    // wrong challenge answers are forgiven for the star rating; 3 wrong ones in a row step back to the round's own stop
    {const o=sim('math',0,(k,q)=>[mastTag(q)!='ch',2000]);
      const tags=o.map(x=>x.tag).join(',');
      if(tags!==',,,,,ch,ch,ch,easy,')bad('challenge then 3 wrong: tags '+tags);
      if(o[8].k!=='add1'||!o[8].hint||o[9].k!=='add1'||o[9].hint||G.mode!=='')bad('after 3 wrong challenge answers: '+JSON.stringify(o.slice(8))+' mode '+G.mode);
      if(G.forgive!==3||G.score+G.forgive!==G.n)bad('forgive '+G.forgive+' score '+G.score);}
    {sim('math',0,k=>[k<MAST.AT||k%2==1,2000]);
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
