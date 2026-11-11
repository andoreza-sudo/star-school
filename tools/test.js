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
 if(q.kind=='num'){if(q.pad&&q.pad!='int'||q.sep){for(const x of kindProblems(q))GEN.gen.push(w+': '+x)}else{const a=+q.ans;if(!(a>=0)||String(a)!==q.ans)GEN.gen.push(w+': bad num ans '+q.ans)}}
 else if(q.kind=='choice'){
  const vs=q.choices.map(c=>c.v);
  if(!vs.includes(q.ans))GEN.gen.push(w+': ans not in choices');
  if(new Set(vs).size!==vs.length)GEN.gen.push(w+': duplicate choices');
  if(vs.length<2||vs.length>4)GEN.choices.push(w+': '+vs.length+' choices');
  for(const c of q.choices){if(BADHTML.test(c.l+' '+c.v))GEN.html.push(w+': choice has undefined/NaN');if(BAD.test(c.v))GEN.gen.push(w+': BAD word '+c.v)}
 }
 else if(q.kind=='build'){if(!q.tiles||q.tiles.length<q.word.length)GEN.gen.push(w+': too few tiles')}
 else if(q.kind=='tap'){for(const x of kindProblems(q))GEN.gen.push(w+': '+x)}
 else if(q.kind=='match'){if(!q.items||!q.opts||q.items.length<3||q.items.length>5)GEN.gen.push(w+': bad match pairs')}
 else if(q.kind=='spell'){for(const x of kindProblems(q))GEN.gen.push(w+': '+x)}
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
  // Levels reserved for P2-04 (Treasure Bay: arr 1, story 4). They have no stop yet; until P2-04 ships they ask like the next level up.
  const RESERVED={frac:[6,7,8]}; // arr 1 and story 4 are Treasure Bay's (P2-04); frac 6-8 get their stops in P2-10 (frac 1 is Clock Tower's)
  for(const id in GEN.skills)for(let lv=1;lv<=GEN.skills[id].max;lv++)if(!used.has(id+':'+lv)&&!(RESERVED[id]||[]).includes(lv))p.push(id+' level '+lv+' has no map node');
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
      for(const p in PATHS){
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
      ||PLACE.first(MW,3)!==ix('m_space')||PLACE.first(MW,6)!==MW.length-1)bad('start world per grade on math')}
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
    const keep=o=>JSON.stringify([o.stars,o.coins,o.pet,o.petName,o.name,o.maps,o.wdone,o.owned,o.wear,o.stickers,o.mast,o.streak,o.grade]);
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
    for(const sk in SK)for(let lv=1;lv<=SK[sk].max;lv++)for(let s=1;s<=4;s++){
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
        const sk=skills[seed%skills.length],q=genQ(sk,1+seed%SK[sk].max,seed++),k=revKey(q);
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
  if(ids!=='abc1 abc2 abc3 syl1 abc4')bad.push('ABC Beach stops: '+ids);
  const tail=(id,k)=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss'&&n.sk!='spell').map(nid).slice(-k).join(' '); // spelling stops (P2-19) sit after these
  if(tail('r_meadow',1)!=='sound3'||tail('r_candy',2)!=='sound4 syl2')bad.push('sound3 ends Letter Meadow; sound4 syl2 end Candy Canyon');
  // existing stop ids keep their meaning and order inside their worlds
  const was={r_meadow:'sound1 sight1 rhyme1 pic1 sound2 build1 sent1',r_candy:'sight2 rhyme2 pic2 build2 sent2 comp1',r_reef:'sight3 pic3 build3 comp2',r_space:'pic4 build4'};
  for(const id in was){const now=NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid).slice(0,was[id].split(' ').length).join(' ');if(now!==was[id])bad.push(id+' changed: '+now)}
  // saves: every star survives on the same stop id, and nobody gets a star they did not have
  for(const name of ['midway','maxed','legacy-single-map','legacy-index-maps']){
    const raw=fx(name);loadSave(raw);const pre=JSON.parse(JSON.stringify(S));
    load(raw);
    for(const k of ['abc1','abc2','abc3','abc4','syl1','sound3','sound4','syl2','boss_r_abc'])if(S.maps.read[k])bad.push(name+': got stars on new stop '+k);
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
    // 1. world: first in the math path, Pre-K, exactly the M-PK stops in CURRICULUM order (trace 1 comes with P2-16)
    const w0=PATHS.math.worlds[0];
    if(w0.id!=='m_tiny'||w0.g!==-1||w0.n!=='Tiny Town')b('Tiny Town is not the first math world: '+w0.id);
    const ids=w0.nodes.map(n=>n[0]+n[1]).join(' ');
    if(ids!=='pk_count1 shape1 pk_num1 sort1 pk_more1 pk_count2 pat1 pk_num2 sort2')b('Tiny Town stops: '+ids);
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
      if(!q.hint||!(q.hint.s||q.hint.html))bad.push(w+': no hint');
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
        if(q.ans==='='&&!/Make the bottom/.test(q.hint.s))bad.push(w+': equal needs common bottom hint');
        if(/Make the bottom/.test(q.hint.s)){const mm=q.hint.s.match(/(\\d+)\\/(\\d+) = (\\d+)\\/(\\d+) and (\\d+)\\/(\\d+) = (\\d+)\\/(\\d+)/);
          if(!mm||mm[4]!==mm[8]||+mm[3]*+mm[2]!==+mm[1]*+mm[4]||+mm[7]*+mm[6]!==+mm[5]*+mm[8])bad.push(w+': common bottom wrong '+q.hint.s)}
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
  // levels 6-8 have no stop yet (P2-10), levels 2-5 have exactly one each
  const used=NODES.math.filter(n=>n.sk=='frac').map(n=>n.lv).join(' ');
  if(used!=='1 2 3 4 5')bad.push('frac stops use levels '+used); // 1 in Clock Tower (P2-03), 2-5 in Fraction Forest
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
    if(stops('r_space')!=='pic4 build4 sight4 pic5 build5 spell3')bad('r_space stops: '+stops('r_space'));
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
  return{problems:[...new Set(serrs)],note:'6 levels x 3,000 samples, '+r.checked+' stop checks over 8 fixtures x 7 grades'};
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
run('pet rig (P4-05): dragon stages x moods, named groups, anchors, tokens only, budget, other pets and saves unchanged',()=>{
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
  for(const k of ['dino','bird','ocean']){S.pet=k;for(const st of [0,25,80,200,350]){const w=S.wear,e=PETS[k].s[Math.min(stage(st),3)];
    const legacy='<span class="petwrap"><span class="pe">'+e+'</span>'+(w.hat?'<span class="hat">'+w.hat+'</span>':'')+(w.toy?'<span class="toy">'+w.toy+'</span>':'')+'</span>';
    r.old[k+' '+st]={same:petHTML(st)===legacy,aura:petAura(st)===(stage(st)>=4?'aura':''),art:petArt(st)===e,pick:petPick(k)===PETS[k].s[3]}}}
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
  if(!m.pick.includes('pet-s-grown pet-m-happy')||m.setupPick!=='🦖')p.push('petPick: '+m.pick.slice(0,80)+' / '+m.setupPick);
  if(!o.saveSame)p.push('drawing the pet changed the save (other than the care meters)');
  for(const [k,v] of Object.entries(o.old))for(const [f,ok] of Object.entries(v))if(!ok)p.push(k+': '+f+' differs from today (pets not on the rig must not change)');
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
        if(!q.hint||!(q.hint.k=='text'?q.hint.s:q.hint.html))b(w+': no hint');
        else if(q.hint.k!=='text'&&q.hint.k!=='html')b(w+': hint kind '+q.hint.k);
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
    const mx={round:2,geo:2,sub:7,time:6,shape:5,data:3,meas:4,story:6,frac:8};
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
        }else if(curOld!=='boss_m_frac'||curNew!==newIds[0]){
          // every stop of the path was passed: the old map opened on the last stop; curNode's last resort now offers the first NEW stop (the only stop left)
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
    setNodes(full);
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
    if(SK.gram.max!==5||SK.gram.bank!=='gram')bad('SK.gram is '+JSON.stringify({max:SK.gram.max,bank:SK.gram.bank}));
    for(const m of bankProblems('gram',{levels:[1,2,3,4,5],min:40}))bad(m);
    if(BANK.gram.some(it=>it.lv<1||it.lv>5))bad('BANK.gram has an item above level 5');
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
    const rd=NODES.read.filter(n=>n.sk=='gram').map(n=>n.lv+'@'+n.wid).join(' ');
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
      if(!stopNew('read',i)||!unlocked('read',i)||nid(NODES.read[curNode('read')])===k)bad('synthetic save: '+k+' not NEW and open, or is the current stop');
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
    if(!SK.vocab||SK.vocab.max!==5||SK.vocab.bank!=='vocab'||SK.vocab.area!=='read')bad('SK.vocab is wrong');
    for(const m of bankProblems('vocab',{levels:[1,2,3,4,5],min:40}))bad(m);
    const items=BANK.vocab;
    if(items.some(it=>![1,2,3,4,5].includes(it.lv)))bad('vocab has an item outside levels 1-5');
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
    const rd=NODES.read.filter(n=>n.sk=='vocab').map(n=>n.lv+'@'+n.wid).join(' ');
    if(rd!=='1@r_reef 2@r_workshop 3@r_workshop 4@r_summit 5@r_summit')bad('vocab stops: '+rd);
    const wst=id=>NODES.read.filter(n=>n.wid==id&&n.sk!='boss').map(nid);
    if(wst('r_reef').slice(0,6).join(' ')!=='sight3 pic3 build3 comp2 spell2 vocab1')bad('r_reef order: '+wst('r_reef'));
    if(wst('r_summit').filter(x=>!x.startsWith('gram')).join(' ')!=='spell4 vocab4 vocab5')bad('r_summit order: '+wst('r_summit')); // gram stops (P2-20) sit between, per CURRICULUM 2
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
