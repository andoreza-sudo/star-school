/* ---------- hints ---------- */
function rod(n,c,cls='',x=0){if(n<=0)return'';let s='';for(let i=0;i<n;i++)s+=`<i class="${i>=n-x?'x':''}"></i>`;return`<span class="rod ${cls}" style="--c:${c||PAL[(n-1)%10]}">${s}</span>`}
function hintHTML(q){const h=q.hint;if(!h)return'';
  if(h.k=='text')return esc(h.s);
  if(h.k=='steps')return hintSteps(q); // P2-08
  if(h.k=='say'){setTimeout(()=>say(h.w,null,h.lang,0,h.slow),150);return esc(h.s)} // h.slow (R-01s): replay slower
  if(h.k=='trace')return TR.hint(q); // P2-16: the hint plays on the tracing board (47-trace.js)
  if(h.k=='html'){if(h.w)setTimeout(()=>say(h.w),150);return h.html} // trusted markup from a generator (Pre-K pictures); h.w is spoken
  if(h.k=='next'){const need=q.word[G.built.length],i=q.tiles.findIndex((t,j)=>t==need&&!G.built.includes(j));const el=$(`.lt[data-i="${i}"]`);if(el)el.classList.add('glow');setTimeout(()=>say(q.word),150);return'Look for the glowing letter!'}
  if(h.k=='pairs'){if(h.n>20)return'Look at the last digit. Is it 0, 2, 4, 6, or 8?';let s='<div class="pairs">';for(let i=0;i<h.n;i+=2)s+='<span><b></b>'+(i+1<h.n?'<b></b>':'')+'</span>';return s+'</div><div>Does every dot have a partner?</div>'}
  if(h.k=='emoji'){const{e,a,b,op}=h;if(op=='+')return a+b>20?'Count on with your fingers!':`<div class="emh">${e.repeat(a)} + ${e.repeat(b)}</div>`;
    return a>20?'Count back with your fingers!':`<div class="emh">${e.repeat(a-b)}<span style="opacity:.25">${e.repeat(b)}</span></div><div>${b} went away</div>`}
  if(h.k=='blocks'){const{a,b,c,op,blank}=h;if(Math.max(a,b,c)>20)return'Count on from the bigger number!';
    if(op=='+'&&blank=='c'&&(a==0||b==0))return`<div class="rowh">${rod(a||b)}<span>+ nothing</span></div><div>Adding zero adds nothing! How many blocks?</div>`;
    if(op=='-'&&b==0)return`<div class="rowh">${rod(a)}</div><div>Taking away zero takes nothing away!</div>`;
    if(op=='-'&&a==b)return`<div class="rowh">${rod(a,null,'',b)}</div><div>Cross out all ${b}. How many are left?</div>`;
    if(op=='+'){if(blank=='c')return`<div class="rowh">${rod(a)}<span>+</span>${rod(b)}</div><div>Count them all!</div>`;
      const k=blank=='a'?b:a;return`<div class="rods">${rod(c,'#cbd5e1')}<div class="rowh" style="gap:0">${rod(k)}${rod(c-k,null,'dash')}</div></div><div>How many empty boxes?</div>`}
    return`<div class="rowh">${rod(a,null,'',b)}</div><div>Cross out ${b}. How many are left?</div>`}
  return''}

/* ---- P2-08 step hints: {k: 'steps', steps: [{html, say}], w} (builders in 39b-steps.js) ----
   The panel shows one step at a time: a row of pips (done, this one, still to come), then the step's board and caption.
   Help (#hb) reads "Next step" while more steps remain, and each tap shows the next one (hintStep, which the Help button in
   50-round.js calls first). The step reached is kept per question, so a wrong answer shows the same step again. */
const HSTEP = new WeakMap(); // question -> index of the step on show
function hintSteps(q) {
  const h = q.hint, n = h.steps.length, at = Math.min(HSTEP.get(q) || 0, n - 1), s = h.steps[at];
  const pips = n <= 12 ? h.steps.map((_, i) => `<i class="${i < at ? 'dn' : i == at ? 'on' : ''}"></i>`).join('') : `<b>${at + 1} / ${n}</b>`;
  // layout: a narrow board sits beside its caption, a wide one (w columns) above it (on phones from 6 columns)
  const lay = !s.html.includes('class="hsb') ? ' txt' : h.w >= 8 ? ' wide' : h.w >= 6 ? ' mid' : '';
  hintBtn(at < n - 1);
  // once the panel is in: if the card still overflows (a phone, a tall board), fold it for the rest of this question: the stacked
  // prompt goes onto one line (the board shows the columns), older rows of the board hide, rows get tighter (39-steps.css)
  setTimeout(() => {
    const qa = $('.qarea');
    if (qa && qa.querySelector('.hs') && !qa.classList.contains('hs-fold') && qa.scrollHeight > qa.clientHeight + 1) {
      qa.classList.add('hs-fold');
      fit();
    }
  }, 0);
  setTimeout(() => say(s.say), 150);
  return `<div class="hs${lay}" data-hs="${at}"><span class="hs-pips" role="img" aria-label="Step ${at + 1} of ${n}">${pips}</span>`
    + `<div class="hs-step">${s.html}</div></div>`;
}
// the Help button's label: "Next step" (arrow) while steps remain, else "Help" (bulb); the round Pre-K bulb keeps its look
function hintBtn(more) {
  const b = $('#hb');
  if (!b || b.classList.contains('pkhb')) return;
  b.innerHTML = `${ico(more ? 'go' : 'hint')}<span>${more ? 'Next step' : 'Help'}</span>`;
}
// Help tapped while q's steps are on show: the next step, in place. false: no step hint on show, or the last step is
// (the caller then shows the hint as usual)
function hintStep(q) {
  const h = q && q.hint, box = $('#hint');
  if (!h || h.k != 'steps' || !box || !box.querySelector('.hs')) return false;
  const at = HSTEP.get(q) || 0;
  if (at >= h.steps.length - 1) return false;
  HSTEP.set(q, at + 1);
  box.innerHTML = hintHTML(q);
  SFX.pop(3);
  fit();
  box.scrollIntoView({block: 'nearest', behavior: 'smooth'});
  return true;
}


