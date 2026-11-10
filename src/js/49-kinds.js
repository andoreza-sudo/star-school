/* ---------- question kinds (P1-02) ---------- */
/* A question is a plain object made by a generator (via genQ). Fields every kind uses:
     kind   'num' | 'choice' | 'build' | 'match' | 'tap' | 'spell'   picks the entry in KIND below
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
const PAD_HTML=`<div class="pad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button class="btn k" data-k="${n}">${n}</button>`).join('')}`
  +'<button class="btn k del" data-k="del">⌫</button><button class="btn k" data-k="0">0</button>'
  +'<button class="btn k go" data-k="go">✓</button></div>';

const KIND={
  num:{
    render:q=>PAD_HTML,
    bind(q,st,submit,o={}){
      const max=o.max||4;
      $$('.k').forEach(b=>b.onclick=()=>{
        if(st.lock)return;
        const k=b.dataset.k;
        if(k=='del'){
          st.typed=st.typed.slice(0,-1);
          if(!o.quiet)SFX.del();
        }
        else if(k=='go'){if(st.typed)submit(st.typed,null)}
        else if(st.typed.length<max){
          st.typed+=k;
          SFX.key(+k);
        }
        // once submit has locked the question (right answer or reveal), the slot belongs to the engine: do not overwrite it
        if(st.lock&&k=='go')return;
        $('#slot').textContent=st.typed;
        if(!o.quiet)bump('#slot');
        if(o.auto&&st.typed==q.ans)submit(st.typed,null);
      });
    },
    right(q){
      const s=$('#slot');
      if(s)s.classList.add('ok');
    },
    retry(q,st){
      st.typed='';
      if($('#slot'))$('#slot').textContent='';
    },
    reveal(q){
      const s=$('#slot');
      s.textContent=q.ans;
      s.className='slot rev';
    },
    spoken:q=>`The answer is ${q.ans}`,
    validate(q){
      const p=[];
      if(typeof q.ans!=='string'||!/^\d+$/.test(q.ans)||String(+q.ans)!==q.ans)p.push('num: ans must be a whole number string, got '+q.ans);
      if(!/id="slot"/.test(q.html||''))p.push('num: html has no SLOT');
      return p;
    },
  },

  choice:{
    render:q=>`<div class="choices ${q.cls||''}">`
      +q.choices.map((c,i)=>`<button class="btn ch" data-i="${i}">${c.h?c.l:esc(c.l)}</button>`).join('')+'</div>',
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
    render:q=>`<div class="tiles">${q.tiles.map((t,i)=>`<button class="btn lt" data-i="${i}">${t}</button>`).join('')}</div>`
      +'<button class="btn sm undo" id="undo">↩ Undo</button>',
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
      const b=(s,c,i)=>`<button class="btn mb" data-s="${s}" data-i="${i}">${c.h?c.l:esc(c.l)}</button>`;
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
      const key=c=>`<button class="btn sk" data-ch="${c}">${c}</button>`;
      const rows=KIND.spell.ROWS.map((r,i)=>`<div class="skr">${[...r].map(key).join('')}`
        +(i==2?`<button class="btn sk wide del" data-ch="del" aria-label="Delete">${ico('backspace',28)}</button>`:'')+'</div>').join('');
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
};

// problems with a question as seen by its kind; an unknown kind is a problem too
function kindProblems(q){
  const K=q&&Object.prototype.hasOwnProperty.call(KIND,q.kind)&&KIND[q.kind];
  if(!K)return['unknown kind '+(q&&q.kind)];
  return K.validate(q);
}
