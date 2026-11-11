/* ---------- question kinds (P1-02) ---------- */
/* A question is a plain object made by a generator (via genQ). Fields every kind uses:
     kind   'num' | 'choice' | 'build' | 'multi' | 'order' | 'match' | 'tap' | 'spell' | 'trace'   picks the entry in KIND below
     html   prompt HTML (trusted; generators escape their own text)
     ans    the right answer; compared as String(value) === String(q.ans)
     say    text read by "Hear it"; auto: true | 'must' reads it on show; lang/afterLang 'es' for Spanish voice
     label  short id of the fact (miss tracking); hint {k, ...} for hintHTML; after: text said after the answer
     sk, lv, seed   stamped by genQ
   Kind fields:
     num     html holds one SLOT (span#slot); ans is a whole number as a string ('12')
     choice  choices [{v, l, h}]: v value, l label, h true when l is HTML; cls extra class on .choices;
             ans is one of the v values; html may hold a SLOT that shows the picked answer
     build   word, tiles (letters, shuffled, at least word.length); html holds span#ls0..#ls(n-1) in .lslots
     match   items [{v,l,h}] and opts [{v,l,h}] (shuffled), 3 to 5 each, same v set; ans = sorted v joined by '|'
     tap     html has elements with data-v; tapping one submits it; ans is one of the values; ansSay optional
     spell   word, lang ('es' adds ñ á é í ó ú ü), html has .lslots span#ls0.. plus a visible picture or clue; in-app keyboard
     (the full field notes for these three sit above each entry at the end of KIND)
   P1-03 kind fields:
     num     also (all optional): pad 'int' (default) | 'dec' (adds .) | 'neg' (adds +/-) | 'frac' (two slots, ans '3/4');
             sep 'R' (two slots, ans '9R2') | 'mix' (three slots, ans '2 1/2') | 'xy' (two slots, ans '3,5', P2-12 coordinates); eq 'value' compares numerically
             (0.50 = .5, 2/4 = 1/2) instead of exact text; max digits per slot (default 4, up to 9).
             html holds SLOT, or SLOT_FRAC / SLOT_R / SLOT_MIX (ids slot, slot2, slot3). The check key moves to the
             next slot first and submits from the last one; del steps back across the separator.
     multi   choose all that apply: choices [{v, l, h}], ans = array of the right v values sorted as text
             (kindSort); cls extra class. A Check button submits the picked values (sorted array).
     order   tap tiles into slots in order: items [{v, l, h}] (shown in this order, so shuffle them; extra
             distractors are allowed), ans = array of v values in the right order. Tap a filled slot to take it back.
   Optional K.same(q, v) says whether the submitted value v is right; without it the engine compares
   String(v) === String(q.ans). num (eq 'value'), multi and order define it.
   Contract of a kind K = KIND[q.kind]:
     K.render(q)              HTML of the input area (goes inside .inp)
     K.bind(q, st, submit, o) wires the input. st is the screen state (G in a round, RC in Speed Race): it holds
                              st.lock (ignore taps while true) and the kind's own fields (num: st.typed, build: st.built).
                              Calls submit(value, el); el is the tapped button, or null when the answer sits in a slot.
                              o: {max: digits (4), auto: submit as soon as the typed answer is right, quiet: no del sound/bump}
     K.right(q)               marks the answer area right
     K.retry(q, st, ready)    resets the input after a first wrong try; calls ready() if it finishes later (build)
     K.reveal(q)              shows the right answer after the last wrong try
     K.spoken(q)              what is said when the answer is revealed (when q.after is not set)
     K.validate(q)            list of problems (strings); used by tools/test.js
   A new kind adds KIND.name = {...} with all of these. kindProblems(q) also catches an unknown kind. */
// P4-10: the pad is the P4-04 key component (.keys > .key); .pad, .k[data-k], .del, .go and .x stay as the hooks code and tests use.
// extra: '' | '.' | 'neg'; next: true when the check key first moves to the next slot (several slots).
function padHTML(extra,next){
  const key=(k,face,cls,aria)=>`<button class="key k${cls?' '+cls:''}" data-k="${k}"${aria?` aria-label="${aria}"`:''}>${face}</button>`;
  return '<div class="keys qpad pad">'+[1,2,3,4,5,6,7,8,9].map(n=>key(n,n)).join('')
    +key('del',ico('backspace'),'del','Delete')+key(0,0)+key('go',ico(next?'go':'check'),'go',next?'Next box':'Check')
    +(extra=='.'?key('.','.','x','Point'):extra=='neg'?key('neg','±','x','Plus or minus'):'')+'</div>';
}
const PAD_HTML=padHTML('');

const KIND={
  num:{
    // pad: int (default), dec, neg, frac; sep 'R' or 'mix'; see the header. Several slots share st.typed, parts joined by the separators
    render(q){
      const pad=q.pad||'int';
      return padHTML(pad=='dec'?'.':pad=='neg'?'neg':'',numSeps(q).length>0);
    },
    bind(q,st,submit,o={}){
      const max=o.max||q.max||4,seps=numSeps(q),K=KIND.num;
      $$('.k').forEach(b=>b.onclick=()=>{
        if(st.lock)return;
        const k=b.dataset.k,parts=numParts(st.typed,seps),last=parts[parts.length-1];
        if(k=='del'){
          st.typed=st.typed.slice(0,-1);
          if(!o.quiet)SFX.del();
        }
        else if(k=='go'){
          if(/\d/.test(last)){
            // not on the last slot yet: move to the next one; on the last slot: submit
            if(parts.length<=seps.length){st.typed+=seps[parts.length-1];SFX.pop(1)}
            else submit(st.typed,null);
          }
        }
        else if(k=='.'){
          if(!last.includes('.')&&last.replace(/\D/g,'').length<max){
            st.typed+=last.replace('-','')?'.':'0.';
            SFX.key(0);
          }
        }
        else if(k=='neg'){
          const head=st.typed.slice(0,st.typed.length-last.length);
          st.typed=head+(last[0]=='-'?last.slice(1):'-'+last);
          SFX.key(0);
        }
        else if(last.replace(/\D/g,'').length<max){
          st.typed+=k;
          SFX.key(+k);
        }
        // once submit has locked the question (right answer or reveal), the slot belongs to the engine: do not overwrite it
        if(st.lock&&k=='go')return;
        const at=K.draw(q,st,seps);
        if(!o.quiet)bump(at);
        if(o.auto&&st.typed==q.ans)submit(st.typed,null);
      });
    },
    // show the typed parts in the slots, mark the active one, label the check key; returns the active slot selector
    draw(q,st,seps){
      const parts=numParts(st.typed,seps),at='#slot'+(parts.length>1?parts.length:'');
      parts.forEach((t,i)=>{$('#slot'+(i?i+1:'')).textContent=t});
      for(let i=parts.length;i<=seps.length;i++)$('#slot'+(i+1)).textContent='';
      if(seps.length){
        $$('.slot').forEach(s=>s.classList.toggle('sl-on','#'+s.id==at));
        const go=$('.k.go'),last=parts.length>seps.length;
        if(go&&go.dataset.last!==String(last)){
          go.dataset.last=last;
          go.innerHTML=ico(last?'check':'go');
          go.setAttribute('aria-label',last?'Check':'Next box');
        }
      }
      return at;
    },
    same(q,v){
      return q.eq=='value'?numEq(String(v),String(q.ans)):String(v)===String(q.ans);
    },
    right(q){
      $$('.slot').forEach(s=>{s.classList.remove('sl-on');s.classList.add('ok')});
    },
    retry(q,st){
      st.typed='';
      KIND.num.draw(q,st,numSeps(q));
    },
    reveal(q){
      numParts(q.ans,numSeps(q)).forEach((t,i)=>{
        const s=$('#slot'+(i?i+1:''));
        s.textContent=t;
        s.className='slot rev';
      });
    },
    spoken:q=>`The answer is ${q.ans}`,
    validate(q){
      const p=[],pad=q.pad||'int',seps=numSeps(q),a=q.ans;
      if(!['int','dec','neg','frac'].includes(pad))p.push('num: bad pad '+pad);
      if(q.sep!=null&&!['R','mix','xy'].includes(q.sep))p.push('num: bad sep '+q.sep);
      if(q.eq!=null&&q.eq!=='value')p.push('num: bad eq '+q.eq);
      if(q.max!=null&&!(Number.isInteger(q.max)&&q.max>=1&&q.max<=9))p.push('num: max must be 1 to 9');
      const shape=q.sep=='R'?/^\d+R\d+$/:q.sep=='xy'?/^\d+,\d+$/:q.sep=='mix'?/^\d+ \d+\/[1-9]\d*$/:pad=='frac'?/^\d+\/[1-9]\d*$/
        :pad=='neg'?/^(0|-?[1-9]\d*)$/:pad=='dec'?/^-?(0|[1-9]\d*)(\.\d+)?$/:/^\d+$/;
      if(typeof a!=='string'||!shape.test(a)||(pad=='int'&&!q.sep&&String(+a)!==a))p.push('num: ans must look like the pad, got '+a);
      else if(q.max!=null&&numParts(a,seps).some(t=>t.replace(/\D/g,'').length>q.max))p.push('num: ans longer than max');
      for(let i=0;i<=seps.length;i++)if(!(q.html||'').includes(`id="slot${i?i+1:''}"`))p.push('num: html has no slot'+(i?i+1:''));
      return p;
    },
  },

  choice:{
    render:q=>`<div class="choices ${q.cls||''}">`
      +q.choices.map((c,i)=>`<button class="choice ch" data-i="${i}">${c.h?c.l:esc(c.l)}</button>`).join('')+'</div>',
    bind(q,st,submit){
      $$('.ch').forEach(b=>b.onclick=()=>submit(q.choices[b.dataset.i].v,b));
    },
    right(q){
      const s=$('#slot');
      if(s){
        s.textContent=q.ans;
        s.classList.add('ok');
      }
    },
    retry(){},
    reveal(q){
      $$('.ch').forEach(b=>{if(q.choices[b.dataset.i].v==q.ans)b.classList.add('right')});
      const s=$('#slot');
      if(s){
        s.textContent=q.ans;
        s.className='slot rev';
      }
    },
    spoken:q=>q.ans,
    validate(q){
      const p=[];
      if(!Array.isArray(q.choices))return['choice: no choices'];
      const vs=q.choices.map(c=>c&&c.v);
      if(!vs.includes(q.ans))p.push('choice: ans not in choices');
      if(new Set(vs.map(String)).size!==vs.length)p.push('choice: duplicate values');
      if(q.choices.some(c=>!c||c.v==null||c.l==null||c.l===''))p.push('choice: a choice has no v or l');
      return p;
    },
  },

  build:{
    render:q=>`<div class="tiles">${q.tiles.map((t,i)=>`<button class="piece lt" data-i="${i}">${t}</button>`).join('')}</div>`
      +UI.btn('Undo',{size:'sm',icon:'back',id:'undo',cls:'undo'}),
    bind(q,st,submit){
      const K=KIND.build;
      $$('.lt').forEach(b=>b.onclick=()=>{
        const i=+b.dataset.i;
        if(st.lock||st.built.includes(i)||st.built.length>=q.word.length)return;
        st.built.push(i);
        SFX.pop(st.built.length);
        K.draw(q,st);
        if(st.built.length==q.word.length)submit(st.built.map(j=>q.tiles[j]).join(''),null);
      });
      $('#undo').onclick=()=>{
        if(!st.lock&&st.built.length){
          st.built.pop();
          SFX.del();
          K.draw(q,st);
        }
      };
    },
    // letters picked so far into the slots; used tiles greyed; hint glow cleared
    draw(q,st){
      [...q.word].forEach((_,i)=>{$('#ls'+i).textContent=st.built[i]!=null?q.tiles[st.built[i]]:''});
      $$('.lt').forEach(b=>{
        b.classList.toggle('used',st.built.includes(+b.dataset.i));
        b.classList.remove('glow');
      });
    },
    right(){
      $$('.ls').forEach(s=>s.classList.add('ok'));
    },
    // keep the right start of the word, drop the rest after a short pause
    retry(q,st,ready){
      let k=0;
      while(k<st.built.length&&q.tiles[st.built[k]]==q.word[k])k++;
      st.lock=true;
      setTimeout(()=>{
        if(st.dead)return;
        st.lock=false;
        st.built=st.built.slice(0,k);
        KIND.build.draw(q,st);
        if(ready)ready();
      },500);
    },
    reveal(q){
      [...q.word].forEach((c,i)=>{$('#ls'+i).textContent=c});
    },
    spoken:q=>q.ans,
    validate(q){
      const p=[];
      if(typeof q.word!=='string'||!q.word)return['build: no word'];
      if(!Array.isArray(q.tiles)||q.tiles.length<q.word.length)return['build: too few tiles'];
      if(q.ans!==q.word)p.push('build: ans is not the word');
      const left=[...q.tiles];
      for(const c of q.word){
        const i=left.indexOf(c);
        if(i<0){p.push('build: tiles cannot spell the word');break}
        left.splice(i,1);
      }
      for(let i=0;i<q.word.length;i++)if(!(q.html||'').includes(`id="ls${i}"`)){p.push('build: html has no slot ls'+i);break}
      return p;
    },
  },

  // ---- P1-04 kinds: match, tap, spell ----
  // match  items [{v,l,h}] (left column, in order) and opts [{v,l,h}] (right column, already shuffled by the generator;
  //        same v set as items, 3 to 5 each); ans = the v values sorted and joined with '|'. All pairs right to pass.
  //        A wrong pair submits '!' (a miss for the engine: first one retries, second one reveals); matched pairs stay.
  match:{
    render:q=>{
      const b=(s,c,i)=>`<button class="choice mb" data-s="${s}" data-i="${i}">${c.h?c.l:esc(c.l)}</button>`;
      return `<div class="mt"><div class="mtc">${q.items.map((c,i)=>b('L',c,i)).join('')}</div>`
        +`<div class="mtc">${q.opts.map((c,i)=>b('R',c,i)).join('')}</div></div>`;
    },
    bind(q,st,submit){
      st.mSel=null;
      st.mDone=[];
      const pool=s=>s=='L'?q.items:q.opts;
      const btn=(s,i)=>$(`.mb[data-s="${s}"][data-i="${i}"]`);
      $$('.mb').forEach(b=>b.onclick=()=>{
        if(st.lock||b.classList.contains('done'))return;
        const s=b.dataset.s,i=+b.dataset.i,sel=st.mSel;
        if(!sel||sel.s==s){
          if(sel)btn(sel.s,sel.i).classList.remove('sel');
          if(sel&&sel.s==s&&sel.i==i){st.mSel=null;return}
          st.mSel={s,i};
          b.classList.add('sel');
          SFX.pop(1);
          return;
        }
        // a left and a right item: compare their values
        const a=btn(sel.s,sel.i);
        const same=pool(sel.s)[sel.i].v===pool(s)[i].v;
        st.mSel=null;
        a.classList.remove('sel');
        if(same){
          const n=q.items.findIndex(c=>c.v===pool(s)[i].v);
          [a,b].forEach(x=>x.classList.add('done','pc'+n));
          st.mDone.push(pool(s)[i].v);
          SFX.pop(st.mDone.length);
          if(st.mDone.length==q.items.length)submit(q.ans,b);
        }
        else{
          [a,b].forEach(x=>{x.classList.remove('shake');void x.offsetWidth;x.classList.add('shake','bad')});
          setTimeout(()=>[a,b].forEach(x=>x.classList.remove('bad')),600);
          submit('!',null);
        }
      });
    },
    right(){
      const m=$('.mt');
      if(m)m.classList.add('ok');
    },
    // keep the pairs already found, clear any half-made choice
    retry(q,st){
      st.mSel=null;
      $$('.mb.sel').forEach(b=>b.classList.remove('sel'));
    },
    // show every pair in its own colour
    reveal(q){
      $$('.mb').forEach(b=>{
        const v=(b.dataset.s=='L'?q.items:q.opts)[b.dataset.i].v;
        b.classList.remove('sel');
        b.classList.add('done','pc'+q.items.findIndex(c=>c.v===v));
      });
    },
    spoken:q=>{
      const txt=c=>String(c.l).replace(/<[^>]*>/g,'');
      return q.items.map(c=>txt(c)+' goes with '+txt(q.opts.find(o=>o.v===c.v))).join('. ');
    },
    validate(q){
      const p=[];
      if(!Array.isArray(q.items)||!Array.isArray(q.opts))return['match: items and opts must be arrays'];
      const n=q.items.length;
      if(n<3||n>5)p.push('match: needs 3 to 5 pairs, has '+n);
      if(q.opts.length!==n)p.push('match: opts and items differ in length');
      const iv=q.items.map(c=>c&&c.v),ov=q.opts.map(c=>c&&c.v);
      if(new Set(iv.map(String)).size!==n)p.push('match: duplicate or missing item values');
      if([...iv].sort().join('|')!==[...ov].sort().join('|'))p.push('match: opts values differ from items values');
      for(const c of q.items.concat(q.opts))if(!c||c.v==null||c.l==null||c.l==='')p.push('match: an entry has no v or l');
      if(q.ans!==[...iv].map(String).sort().join('|'))p.push('match: ans is not the sorted values joined by |');
      return p;
    },
  },

  // tap    html (shown in the prompt) holds elements with data-v="value"; tapping one submits its value.
  //        Style them with class "tp" (min 48 px target, see 37-kinds-b.css); ans is one of the data-v values.
  //        ansSay (optional) is what is said on reveal.
  tap:{
    render:()=>'',
    bind(q,st,submit){
      $$('#prompt [data-v]').forEach(el=>{
        el.setAttribute('role','button');
        el.setAttribute('tabindex','0');
        el.onclick=()=>{if(!st.lock)submit(el.dataset.v,el)};
        el.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();el.onclick()}};
      });
    },
    right(q){
      $$('#prompt [data-v]').forEach(el=>{if(el.dataset.v===String(q.ans))el.classList.add('right')});
    },
    retry(){},
    reveal(q){
      $$('#prompt [data-v]').forEach(el=>{if(el.dataset.v===String(q.ans))el.classList.add('right','rev')});
    },
    spoken:q=>q.ansSay||String(q.ans),
    validate(q){
      const vs=[...String(q.html||'').matchAll(/data-v="([^"]*)"/g)].map(m=>m[1]);
      const p=[];
      if(vs.length<2)p.push('tap: html needs at least 2 elements with data-v');
      if(new Set(vs).size!==vs.length)p.push('tap: duplicate data-v values');
      if(!vs.includes(String(q.ans)))p.push('tap: ans is not one of the data-v values');
      return p;
    },
  },

  // spell  word (lowercase letters; a-z, plus ñ á é í ó ú ü when lang is 'es'); lang 'es' adds the accent row;
  //        ans = word; html holds .lslots with span.ls#ls0..#ls(n-1) like build AND something visible (a picture or a
  //        clue), since speech may be missing; say = the word (spoken by "Hear it"); hint should be {k:'say', w, s}.
  //        Typing happens on the in-app keyboard only; st.typed is the letters so far.
  spell:{
    ROWS:['qwertyuiop','asdfghjkl','zxcvbnm'],
    render:q=>{
      const key=c=>`<button class="key sk" data-ch="${c}">${c}</button>`;
      const rows=KIND.spell.ROWS.map((r,i)=>`<div class="skr">${[...r].map(key).join('')}`
        +(i==2?`<button class="key sk wide del" data-ch="del" aria-label="Delete">${ico('backspace',28)}</button>`:'')+'</div>').join('');
      const es=q.lang=='es'?`<div class="skr">${[...'ñáéíóúü'].map(key).join('')}</div>`:'';
      return `<div class="sks">${rows}${es}</div>`;
    },
    bind(q,st,submit){
      const K=KIND.spell;
      $$('.sk').forEach(b=>b.onclick=()=>{
        if(st.lock)return;
        const c=b.dataset.ch;
        if(c=='del'){
          if(!st.typed)return;
          st.typed=st.typed.slice(0,-1);
          SFX.del();
        }
        else{
          if(st.typed.length>=q.word.length)return;
          st.typed+=c;
          SFX.pop(st.typed.length);
        }
        K.draw(q,st);
        if(st.typed.length==q.word.length)submit(st.typed,null);
      });
    },
    draw(q,st){
      [...q.word].forEach((_,i)=>{$('#ls'+i).textContent=st.typed[i]||''});
    },
    right(){
      $$('.ls').forEach(s=>s.classList.add('ok'));
    },
    // keep the right start of the word, drop the rest after a short pause
    retry(q,st,ready){
      let k=0;
      while(k<st.typed.length&&st.typed[k]==q.word[k])k++;
      st.lock=true;
      setTimeout(()=>{
        if(st.dead)return;
        st.lock=false;
        st.typed=st.typed.slice(0,k);
        KIND.spell.draw(q,st);
        if(ready)ready();
      },500);
    },
    reveal(q){
      [...q.word].forEach((c,i)=>{$('#ls'+i).textContent=c});
    },
    spoken:q=>q.ans,
    validate(q){
      const p=[];
      if(typeof q.word!=='string'||!q.word)return['spell: no word'];
      const okc=q.lang=='es'?/^[a-zñáéíóúü]+$/:/^[a-z]+$/;
      if(!okc.test(q.word))p.push('spell: word has letters the keyboard does not have: '+q.word);
      if(q.word.length>12)p.push('spell: word longer than 12 letters');
      if(q.ans!==q.word)p.push('spell: ans is not the word');
      if(typeof q.say!=='string'||!q.say)p.push('spell: no say (the word to speak)');
      const h=q.html||'';
      for(let i=0;i<q.word.length;i++)if(!h.includes(`id="ls${i}"`)){p.push('spell: html has no slot ls'+i);break}
      if(!/class="[^"]*\blslots\b/.test(h))p.push('spell: html has no .lslots');
      const rest=h.replace(/<span[^>]*id="ls\d+"[^>]*><\/span>/g,'');
      if(!rest.replace(/<[^>]*>/g,'').trim()&&!/<svg|<img/.test(rest))p.push('spell: html shows no picture or clue (speech may be off)');
      if(q.hint&&q.hint.k=='next')p.push('spell: hint k "next" is for build; use {k:"say"}');
      return p;
    },
  },

  // ---- P1-03 kinds: multi (choose all that apply), order (tap tiles into order) ----
  multi:{
    render:q=>`<div class="choices mchoices ${q.cls||''}">`
      +q.choices.map((c,i)=>`<button class="choice ch mc" data-i="${i}" aria-pressed="false">`
        +`<span class="mk">${ico('check',22)}</span><span class="ml">${c.h?c.l:esc(c.l)}</span></button>`).join('')+'</div>'
      +UI.btn('Check',{kind:'primary',icon:'check',id:'mcheck',cls:'mgo',off:true}),
    bind(q,st,submit){
      const K=KIND.multi;
      st.sel=[];
      $$('.mc').forEach(b=>b.onclick=()=>{
        const i=+b.dataset.i;
        if(st.lock)return;
        const at=st.sel.indexOf(i);
        if(at<0)st.sel.push(i);
        else st.sel.splice(at,1);
        SFX.pop(2);
        K.draw(q,st);
      });
      $('#mcheck').onclick=()=>{
        if(!st.lock&&st.sel.length)submit(kindSort(st.sel.map(i=>q.choices[i].v)),null);
      };
    },
    // picked choices marked (tick and outline, not colour alone); Check needs at least one
    draw(q,st){
      $$('.mc').forEach(b=>{
        const on=st.sel.includes(+b.dataset.i);
        b.classList.toggle('on',on);
        b.setAttribute('aria-pressed',on);
      });
      $('#mcheck').disabled=!st.sel.length;
    },
    same:(q,v)=>Array.isArray(v)&&v.map(String).join('\u0001')===q.ans.map(String).join('\u0001'),
    right(q){
      $$('.mc.on').forEach(b=>b.classList.add('right'));
    },
    retry(q,st){
      st.sel=[];
      KIND.multi.draw(q,st);
    },
    reveal(q){
      $$('.mc').forEach(b=>{
        const isRight=q.ans.map(String).includes(String(q.choices[b.dataset.i].v));
        b.classList.toggle('right',isRight);
        b.classList.toggle('wrong',!isRight&&b.classList.contains('on'));
        b.disabled=true;
      });
      $('#mcheck').disabled=true;
    },
    spoken:q=>'The answers are '+q.ans.map(v=>kindLabel(q.choices,v)).join(', '),
    validate(q){
      const p=[];
      if(!Array.isArray(q.choices)||q.choices.length<2||q.choices.length>8)return['multi: needs 2 to 8 choices'];
      const vs=q.choices.map(c=>c&&c.v);
      if(new Set(vs.map(String)).size!==vs.length)p.push('multi: duplicate values');
      if(q.choices.some(c=>!c||c.v==null||c.l==null||c.l===''))p.push('multi: a choice has no v or l');
      if(!Array.isArray(q.ans)||!q.ans.length)return p.concat('multi: ans must be a non-empty array');
      if(new Set(q.ans.map(String)).size!==q.ans.length)p.push('multi: duplicate values in ans');
      if(q.ans.some(a=>!vs.map(String).includes(String(a))))p.push('multi: an ans value is not in choices');
      if(kindSort(q.ans).map(String).join()!==q.ans.map(String).join())p.push('multi: ans is not sorted');
      return p;
    },
  },

  order:{
    render:q=>`<div class="oslots">${q.ans.map((_,i)=>`<button class="socket os" data-s="${i}" aria-label="Place ${i+1}"></button>`).join('')}</div>`
      +`<div class="tiles otiles">${q.items.map((t,i)=>`<button class="piece ot" data-i="${i}">${t.h?t.l:esc(t.l)}</button>`).join('')}</div>`,
    bind(q,st,submit){
      const K=KIND.order;
      st.ord=[];
      $$('.ot').forEach(b=>b.onclick=()=>{
        const i=+b.dataset.i;
        if(st.lock||st.ord.includes(i)||st.ord.length>=q.ans.length)return;
        st.ord.push(i);
        SFX.pop(st.ord.length);
        K.draw(q,st);
        if(st.ord.length==q.ans.length)submit(st.ord.map(j=>q.items[j].v),null);
      });
      $$('.os').forEach(b=>b.onclick=()=>{
        const i=+b.dataset.s;
        if(st.lock||i>=st.ord.length)return;
        st.ord.splice(i,1);
        SFX.del();
        K.draw(q,st);
      });
    },
    draw(q,st){
      $$('.os').forEach((b,i)=>{
        const t=q.items[st.ord[i]];
        b.innerHTML=t?(t.h?t.l:esc(t.l)):'';
        b.classList.toggle('full',!!t);
      });
      $$('.ot').forEach(b=>b.classList.toggle('used',st.ord.includes(+b.dataset.i)));
    },
    same:(q,v)=>Array.isArray(v)&&v.map(String).join('\u0001')===q.ans.map(String).join('\u0001'),
    right(){
      $$('.os').forEach(b=>b.classList.add('ok'));
    },
    // keep the right start of the order, drop the rest after a short pause
    retry(q,st,ready){
      let k=0;
      while(k<st.ord.length&&String(q.items[st.ord[k]].v)===String(q.ans[k]))k++;
      st.lock=true;
      setTimeout(()=>{
        if(st.dead)return;
        st.lock=false;
        st.ord=st.ord.slice(0,k);
        KIND.order.draw(q,st);
        if(ready)ready();
      },500);
    },
    reveal(q){
      $$('.os').forEach((b,i)=>{
        const t=q.items.find(x=>String(x.v)===String(q.ans[i]));
        b.innerHTML=t.h?t.l:esc(t.l);
        b.classList.add('full','rev');
      });
    },
    spoken:q=>q.ans.map(v=>kindLabel(q.items,v)).join(', '),
    validate(q){
      const p=[];
      if(!Array.isArray(q.items)||!q.items.length)return['order: no items'];
      if(q.items.length>14)p.push('order: too many items');
      if(q.items.some(t=>!t||t.v==null||t.l==null||t.l===''))p.push('order: an item has no v or l');
      if(!Array.isArray(q.ans)||q.ans.length<2||q.ans.length>12)return p.concat('order: ans must be an array of 2 to 12 values');
      if(q.items.length<q.ans.length)p.push('order: fewer items than ans');
      const left=q.items.map(t=>t&&String(t.v));
      for(const a of q.ans){
        const i=left.indexOf(String(a));
        if(i<0){p.push('order: items cannot make ans');break}
        left.splice(i,1);
      }
      return p;
    },
  },
  // P2-16 tracing: set, g (glyph), ans 'done', passes; the engine and its field notes are in 47-trace.js
  trace:TRK,
};

// problems with a question as seen by its kind; an unknown kind is a problem too
function kindProblems(q){
  const K=q&&Object.prototype.hasOwnProperty.call(KIND,q.kind)&&KIND[q.kind];
  if(!K)return['unknown kind '+(q&&q.kind)];
  return K.validate(q);
}

// ---- helpers for the P1-03 kinds ----
// slot markup for num questions with more than one slot (put it in q.html where the answer goes)
const SLOT_FRAC='<span class="fslot"><span class="slot" id="slot"></span><span class="fbar"></span><span class="slot" id="slot2"></span></span>';
const SLOT_R='<span class="slot" id="slot"></span><span class="rsep">R</span><span class="slot" id="slot2"></span>';
const SLOT_MIX='<span class="slot" id="slot"></span><span class="fslot"><span class="slot" id="slot2"></span><span class="fbar"></span>'
  +'<span class="slot" id="slot3"></span></span>';
// separators between the slots of a num question, in order; none for a plain pad
function numSeps(q){
  return q.sep=='mix'?[' ','/']:q.sep=='R'?['R']:q.sep=='xy'?[',']:q.pad=='frac'?['/']:[];
}
// split typed text into one string per slot
function numParts(t,seps){
  const parts=[''];
  let n=0;
  for(const c of t){
    if(n<seps.length&&c===seps[n]){parts.push('');n++}
    else parts[n]+=c;
  }
  return parts;
}
// exact value of '-1.50', '3/4' or '2 1/2' as [numerator, denominator] BigInts, or null
function numRat(s){
  let m=/^(-?)(\d*)(?:\.(\d*))?$/.exec(s);
  if(m&&/\d/.test(s)){
    const f=m[3]||'';
    return[BigInt(m[1]+(m[2]+f)),10n**BigInt(f.length)];
  }
  m=/^(-?\d+)\/(\d+)$/.exec(s);
  if(m&&BigInt(m[2])>0n)return[BigInt(m[1]),BigInt(m[2])];
  m=/^(\d+) (\d+)\/(\d+)$/.exec(s);
  if(m&&BigInt(m[3])>0n)return[BigInt(m[1])*BigInt(m[3])+BigInt(m[2]),BigInt(m[3])];
  return null;
}
// numeric equality of two answer strings (0.50 = .5, 2/4 = 1/2); 'R' answers compare part by part
function numEq(a,b){
  const pa=a.split('R'),pb=b.split('R');
  if(pa.length!==pb.length)return false;
  return pa.every((t,i)=>{
    const x=numRat(t),y=numRat(pb[i]);
    return !!x&&!!y&&x[0]*y[1]===y[0]*x[1];
  });
}
// sort values as text: the order of q.ans for multi
function kindSort(a){
  return[...a].sort((x,y)=>String(x)<String(y)?-1:String(x)>String(y)?1:0);
}
// plain-text label of the choice or item with value v (for speech)
function kindLabel(list,v){
  const c=list.find(x=>String(x.v)===String(v));
  return c?(c.h?c.l.replace(/<[^>]*>/g,''):c.l):String(v);
}
