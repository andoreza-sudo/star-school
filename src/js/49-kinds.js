/* ---------- question kinds (P1-02) ---------- */
/* A question is a plain object made by a generator (via genQ). Fields every kind uses:
     kind   'num' | 'choice' | 'build'   picks the entry in KIND below
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
        // written after submit on purpose: this is how it has always behaved (see PROGRESS.md, P1-02 note)
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
};

// problems with a question as seen by its kind; an unknown kind is a problem too
function kindProblems(q){
  const K=q&&Object.prototype.hasOwnProperty.call(KIND,q.kind)&&KIND[q.kind];
  if(!K)return['unknown kind '+(q&&q.kind)];
  return K.validate(q);
}
