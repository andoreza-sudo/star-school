/* ---------- hints ---------- */
function rod(n,c,cls='',x=0){if(n<=0)return'';let s='';for(let i=0;i<n;i++)s+=`<i class="${i>=n-x?'x':''}"></i>`;return`<span class="rod ${cls}" style="--c:${c||PAL[(n-1)%10]}">${s}</span>`}
function hintHTML(q){const h=q.hint;if(!h)return'';
  if(h.k=='text')return esc(h.s);
  if(h.k=='say'){setTimeout(()=>say(h.w,null,h.lang),150);return esc(h.s)}
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


