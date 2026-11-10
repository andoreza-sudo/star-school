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
