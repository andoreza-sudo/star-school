/* Streak calendar (P5-04). S.streak = {days:{'Y-M-D':rounds}, best, rw}. Day keys use the same local-time format as today().
   A day counts when at least one learning round is finished (streakTick() is called from finish() in 50-round.js).
   Rest rule: one missed day is forgiven when the day before it was active and no other rest day sits inside the 7 days before it. */
const STRK={
  KEEP:120, // days of history kept
  MILESTONES:[[3,5],[7,10],[14,20],[30,50]], // [days, coins]; each also gives a sticker
  // 'Y-M-D' <-> whole day number. UTC arithmetic on the calendar date only, so daylight saving never shifts a day.
  idx(k){
    const m=/^(\d+)-(\d+)-(\d+)$/.exec(String(k));
    return m?Math.floor(Date.UTC(+m[1],+m[2]-1,+m[3])/864e5):NaN;
  },
  key(i){const d=new Date(i*864e5);return d.getUTCFullYear()+'-'+(d.getUTCMonth()+1)+'-'+d.getUTCDate()},
  // the saved object, with defaults when it is missing or damaged (not saved here)
  get(){
    let s=S.streak;
    if(!s||typeof s!='object'||Array.isArray(s))s=S.streak={};
    if(!s.days||typeof s.days!='object'||Array.isArray(s.days))s.days={};
    if(!(s.best>=0))s.best=0;
    if(!(s.rw>=0))s.rw=0;
    return s;
  },
  // Pure: current streak from a days map and today's key. Returns {count, rests:[keys], doneToday}.
  // Walks back from today (or yesterday while today is still to play). Future dates (clock set back) are ignored.
  calc(days,todayKey){
    const t=STRK.idx(todayKey),act=i=>(days&&+days[STRK.key(i)]>0)&&i<=t;
    const out={count:0,rests:[],doneToday:false};
    if(!(t>=0))return out;
    out.doneToday=!!act(t);
    let i=out.doneToday?t:t-1,lastRest=null;
    for(let n=0;n<400;n++){
      if(act(i)){out.count++;i--}
      else if(act(i-1)&&(lastRest===null||lastRest-i>=7)){out.rests.push(STRK.key(i));lastRest=i;i--}
      else break;
    }
    return out;
  },
  info(){return STRK.calc(STRK.get().days,today())},
  count(){try{return STRK.info().count}catch(e){return 0}},
  // Record one finished round. Returns {count, msg} where msg is a reward line (or '').
  tick(){
    const s=STRK.get(),k=today(),first=!(s.days[k]>0);
    s.days[k]=(+s.days[k]||0)+1;
    const t=STRK.idx(k);
    for(const d in s.days)if(!(STRK.idx(d)>t-STRK.KEEP))delete s.days[d]; // trim to the last 120 days (bad keys go too)
    const c=STRK.calc(s.days,k).count;
    if(c>s.best)s.best=c;
    let msg='';
    if(c<s.rw)s.rw=0; // the streak broke and started again: milestones can be earned again
    if(first){
      const m=STRK.MILESTONES.filter(([n])=>n<=c&&n>s.rw).pop();
      if(m){
        s.rw=m[0];S.coins=(S.coins||0)+m[1];
        const a=award();
        msg=`🔥 ${m[0]} days in a row! +${m[1]} 🪙 and a sticker ${a.s}`;
      }
    }
    return{count:c,msg};
  },
  // Calendar grid for a month (m = 0..11): array of weeks (Sunday first), each 7 entries of a day number or 0 for padding.
  grid(y,m){
    const first=new Date(Date.UTC(y,m,1)).getUTCDay(),n=new Date(Date.UTC(y,m+1,0)).getUTCDate(),cells=[];
    for(let i=0;i<first;i++)cells.push(0);
    for(let d=1;d<=n;d++)cells.push(d);
    while(cells.length%7)cells.push(0);
    const weeks=[];
    for(let i=0;i<cells.length;i+=7)weeks.push(cells.slice(i,i+7));
    return weeks;
  },
  MONTHS:['January','February','March','April','May','June','July','August','September','October','November','December'],
};
function streakTick(){try{return STRK.tick()}catch(e){return{count:0,msg:''}}}

// A played day's star: the P4-04 rating star (ledge behind, star in front)
const STC_STAR=`<span class="rs on">${ico('star',20,'rs-b')}${ico('star',20,'rs-f')}</span>`;
// Month grid screen. off = months back from this month (0 = this month).
function streakCal(off){
  off=Math.max(0,Math.min(off||0,4));
  const now=new Date(),b=new Date(now.getFullYear(),now.getMonth()-off,1),y=b.getFullYear(),m=b.getMonth();
  const s=STRK.get(),inf=STRK.info(),rest=new Set(inf.rests),tk=today();
  let cells='';
  for(const wk of STRK.grid(y,m))for(const d of wk){
    if(!d){cells+='<div class="stc-d stc-pad"></div>';continue}
    const k=y+'-'+(m+1)+'-'+d,n=+s.days[k]||0;
    cells+=`<div class="stc-d${n?' on':''}${k===tk?' now':''}${rest.has(k)?' rest':''}" aria-label="${STRK.MONTHS[m]} ${d}${n?', played':''}">`+
      `<span class="stc-n">${d}</span><span class="stc-m">${n?STC_STAR:rest.has(k)?ico('moon',18):''}</span></div>`;
  }
  const msg=inf.count?`${inf.count} day${inf.count>1?'s':''} in a row!`:'Finish a round to light your flame!';
  // P4-18: drawn flame, stars, moon and prize chips (were emoji)
  const prizes=STRK.MILESTONES.map(([d])=>`<span class="stc-pz${inf.count>=d?' got':''}">${ico(inf.count>=d?'check':'medal',18)}<b>${d}</b></span>`).join('');
  view(`<div class="top tbar gx-mtop s-play">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('flame',24)}</span><span>My Streak</span></div></div>
   <div class="scroll"><div class="stc-card">
    <div class="stc-hero${inf.count?'':' off'}"><span class="stc-fd">${ico('flame',64)}</span><span class="stc-big">${inf.count}</span></div><div class="stc-sub">${msg}</div>
    <div class="stc-sub small">Best: ${s.best} day${s.best==1?'':'s'}. A rest day ${ico('moon','1.2em','ic-brand')} will not break your streak.</div>
    <div class="stc-nav">${UI.ibtn('chevron-left','Earlier month',{size:'sm',id:'stcp',off:off>=4})}
     <b>${STRK.MONTHS[m]} ${y}</b>${UI.ibtn('chevron-right','Later month',{size:'sm',id:'stcn',off:off<=0})}</div>
    <div class="stc-grid">${['S','M','T','W','T','F','S'].map(x=>`<div class="stc-h">${x}</div>`).join('')}${cells}</div>
    <div class="stc-sub small stc-pzs"><span>Next prizes, days in a row:</span>${prizes}</div>
   </div></div>`);
  $('#back').onclick=()=>home();
  $('#stcp').onclick=()=>streakCal(off+1);
  $('#stcn').onclick=()=>streakCal(off-1);
}
