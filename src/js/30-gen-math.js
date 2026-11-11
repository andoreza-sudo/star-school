/* ---------- math generators ---------- */
function genAdd(lv){let a,b;
  if(lv==1){const s=R(2,10);a=R(0,s);b=s-a}
  else if(lv==2){const k=pick([9,9,8,10,'d']);if(k=='d'){a=b=R(1,9)}else{a=k;b=R(1,9)}if(coin())[a,b]=[b,a]}
  else{a=R(2,9);b=R(2,9)}
  return mathQ(a,'+',b,a+b,'c',coin(),lv==1?{}:{hint:factHint(a,'+',b,a+b,'c')})}
function genMiss(lv){let c,a;
  if(lv==1){c=R(3,10);a=R(0,c)}
  else{[a,c]=factPair();c+=a} // R-01m: every fact with a sum of 10 to 18 equally often
  const blank=coin()?'a':'b';
  return mathQ(a,'+',c-a,c,blank,false,lv==1?{}:{hint:factHint(a,'+',c-a,c,blank)})}
function genSub(lv){let a,b;
  if(lv==1){a=R(2,10);b=R(0,a)}else if(lv==2){const [x,y]=factPair();a=x+y;b=y} // R-01m: every take-away fact from 10 to 18 equally often
  else if(lv==3){const a1=R(1,9),b1=R(0,a1),a2=R(2,9),b2=R(1,a2-1);a=a2*10+a1;b=b2*10+b1;
    return mathQ(a,'-',b,a-b,'c',true,{hint:{k:'text',s:`Ones first: ${a1} − ${b1}. Then tens: ${a2} − ${b2}.`}})}
  else{const a1=R(0,8),b1=R(a1+1,9),a2=R(3,9),b2=R(1,a2-2);a=a2*10+a1;b=b2*10+b1;
    return mathQ(a,'-',b,a-b,'c',true,{hint:{k:'text',s:`${a1} − ${b1}? Too small! Borrow a ten: ${a1+10} − ${b1} = ${a1+10-b1}. Now the tens: ${a2-1} − ${b2}.`}})}
  return mathQ(a,'-',b,a-b,'c',coin(),lv==2?{hint:factHint(a,'-',b,a-b,'c')}:{})}

/* ---------- R-01m: fact strategy hints (add 2 "+9 & Doubles", add 3 "All the Facts", miss 2, sub 2) ----------
   First graders learn the facts to 20 through strategies, not by counting every block (CCSS 1.OA.6): count on from the bigger
   number for +1, +2, +3; doubles and near doubles; ten pairs; make a ten; +9 as +10 then take 1 away; think addition for
   take away and missing numbers. factHint picks one strategy per fact (the same one every time, so a rebuilt question shows
   the same hint) and draws it with ten frames or a number line. The words are short and are read aloud (w). The hint never
   says the final answer: the child does the last small step. hint.st names the strategy (tools/test.js checks it). */
const FACT_PAIRS=[];for(let x=1;x<=9;x++)for(let y=1;y<=9;y++)if(x+y>=10)FACT_PAIRS.push([x,y]); // the 45 facts that cross 10
const factPair=()=>pick(FACT_PAIRS);
function factHint(a,op,b,c,blank){
  const two=(f1,f2)=>`<div class="fh-frs">${f1}${f2}</div>`;
  const tf=(n,o)=>VIZ.tenFrame(n,10,o||{});
  // a number line from lo to hi with hops [[from, to, label]]; hide: values shown as a "?" box
  const line=(lo,hi,hops,hide)=>VIZ.numLine({min:lo,max:hi,step:1,labels:'all',hops,hide});
  const ones=(from,n,dir)=>Array.from({length:n},(_,i)=>[from+dir*i,from+dir*(i+1),dir>0?'+1':'−1']);
  const out=(st,pic,txt,w)=>({k:'html',st,html:`<div class="fhint">${pic}<div class="fh-t">${txt}</div></div>`,w:w||txt.replace(/ \+ /g,' plus ').replace(/ − /g,' minus ')});
  if(op=='+'&&blank=='c'){
    const big=Math.max(a,b),sm=Math.min(a,b);
    if(a==b){
      if(a<=5)return out('double',VIZ.array(2,a),`Doubles! Two rows of ${a}. Count the pairs by 2s.`);
      return out('double',two(tf(a,{b:a-5}),tf(a,{b:a-5})),`Doubles! Each ${a} is 5 and ${a-5}. 5 + 5 is 10. Then add ${a-5} + ${a-5}.`);
    }
    if(big==10)return out('ten',two(tf(10),tf(sm,{b:sm})),`One full ten and ${sm} more. Ten and ${sm} make a teen number.`);
    if(sm<=3)return out('counton',line(big-1,big+sm+1,ones(big,sm,1),[c]),`Start at the bigger number, ${big}. Count on ${sm}.`);
    if(big-sm==1)return out('near',two(tf(sm),tf(big,{b:1})),`${sm} + ${big} is next to a double. ${sm} + ${sm} is ${sm*2}. Then 1 more.`);
    if(c==10)return out('tenpair',tf(10,{b:sm}),`${big} and ${sm} fill the ten frame. How many in a full ten frame?`);
    if(big==9)return out('nine',two(tf(10,{fade:1}),tf(sm,{b:sm})),`9 is 10 take away 1. 10 + ${sm} is ${10+sm}. Then take 1 away.`);
    const need=10-big;
    return out('make10',two(tf(10,{b:need}),tf(sm-need,{b:sm-need})),`Make a ten! ${big} needs ${need} more. Take ${need} from the ${sm}. Now it is 10 + ${sm-need}.`);
  }
  if(op=='+'){ // a missing number: known + ? = c (think addition: count up to c)
    const k=blank=='a'?b:a;
    if(c==10)return out('tenpair',tf(k),`What goes with ${k} to make 10? Count the empty boxes.`);
    if(c-k<=3)return out('countup',line(k-1,c+1,ones(k,c-k,1),[]),`Start at ${k}. Count up to ${c}. How many jumps?`);
    return out('thinkadd',line(k-1,c+1,[[k,10],[10,c]],[]),`What goes with ${k} to make ${c}? Jump from ${k} to 10, then to ${c}. Add the jumps.`);
  }
  // take away: a − b = ?
  if(b<=3)return out('countback',line(a-b-1,a+1,ones(a,b,-1),[c]),`Start at ${a}. Count back ${b}.`);
  if(a==10)return out('tenpair',tf(b),`Think addition: ${b} + ? = 10. Count the empty boxes.`,`Think addition: ${b} plus what makes 10? Count the empty boxes.`);
  if(c<=3)return out('countup',line(b-1,a+1,ones(b,c,1),[]),`${b} and ${a} are close. Count up from ${b} to ${a}. How many jumps?`);
  return out('thinkadd',line(b-1,a+1,[[b,10],[10,a]],[]),`Think: ${b} + ? = ${a}. Jump from ${b} to 10, then to ${a}. Add the jumps.`,
    `Think addition: ${b} plus what makes ${a}? Jump from ${b} to 10, then to ${a}. Add the jumps.`);
}
function genBig(lv){let a,b,s;
  if(lv==1){const m=coin()?10:100,x=R(1,8),y=R(1,9-x);a=x*m;b=y*m;
    const u=m==10?'ten':'hundred';s=`Think: ${qN(x,u)} + ${qN(y,u)}.`}
  else if(lv==2){const a1=R(0,8),b1=R(0,9-a1),a2=R(1,8),b2=R(1,9-a2);a=a2*10+a1;b=b2*10+b1;s=`Ones first: ${a1} + ${b1}. Then tens: ${a2} + ${b2}.`}
  else if(lv==4){const x=[R(1,8),R(0,9),R(0,9)],y=[R(1,9-x[0]),R(0,9-x[1]),R(0,9-x[2])];a=x[0]*100+x[1]*10+x[2];b=y[0]*100+y[1]*10+y[2];s='Add each column: ones, then tens, then hundreds.'}
  else{const a1=R(2,9),b1=R(10-a1,9),a2=R(1,7),b2=R(1,8-a2);a=a2*10+a1;b=b2*10+b1;s=`Ones first: ${a1} + ${b1} = ${a1+b1}. Write ${(a1+b1)%10}, carry the 1 to the tens!`}
  return mathQ(a,'+',b,a+b,'c',true,{hint:{k:'text',s}})}
function genEO(lv){const n=lv==1?R(0,20):R(21,99);
  return{kind:'choice',html:`<div>${n}</div><div class="sub">Even or odd?</div>`,say:`Is ${n} even or odd?`,ans:n%2?'odd':'even',
    choices:[{l:'Even',v:'even'},{l:'Odd',v:'odd'}],hint:{k:'pairs',n},label:`${n} even/odd`}}
function genCnt(lv){let step,start;
  if(lv==1){step=pick([1,10]);start=step==1?R(0,25):10*R(0,5)}
  else if(lv==2){step=pick([2,5,10]);start=step==2?2*R(0,10):step==5?5*R(0,10):10*R(0,5)}
  else{step=pick([1,2,5,10]);start=step==1?R(95,115):step==2?2*R(10,40):step==5?5*R(10,20):R(1,9)+10*R(0,3)}
  const seq=[0,1,2,3,4].map(i=>start+i*step),bi=R(1,4);
  return{kind:'num',html:`<div class="seq">${seq.map((n,i)=>i==bi?SLOT:n).join(', ')}</div><div class="sub">Count by ${step}s</div>`,
    say:`Count by ${step}s. `+seq.map((n,i)=>i==bi?'what':n).join(', '),ans:String(seq[bi]),
    hint:{k:'text',s:`Add ${step} each time. What comes after ${seq[bi-1]}?`},label:seq.map((n,i)=>i==bi?'_':n).join(',')}}
// [plural, emoji, singular, drawing name (the singular when left out)]; story levels 4-6 read [0] (the plural) only
const THINGS=[['apples','🍎','apple'],['cookies','🍪','cookie'],['ducks','🦆','duck'],['balls','⚽','ball'],['stickers','⭐','sticker','star'],
  ['toy cars','🚗','toy car','car'],['fish','🐟','fish'],['crayons','🖍️','crayon'],['pencils','✏️','pencil']];
const NAMES=['Sam','Mia','Leo','Ava','Ben','Zoe'];
/* ---------- story 1-3 (Number Meadow K, Candy Canyon 1, Ocean Reef 1) ----------
   R-01m: the problem types of CCSS Table 1 (K.OA.2, 1.OA.1, 2.OA.1), by level. Kinds and their share of a level:
     join   add to / put together, result unknown        a + b = ?        sep    take from, result unknown          a − b = ?
     chg    add to, change unknown                       a + ? = c        chgS   take from, change unknown          c − ? = a
     part   put together, one part unknown               a + ? = c        cmpD   compare: how many more / fewer?    x − y = ?
     start  add to, start unknown                        ? + b = c        startS take from, start unknown           ? − b = a
     cmpB   compare: the bigger one ("b more than")      y + d = ?        cmpS   compare: the smaller one ("d fewer") x − d = ?
   Level 1 (K, within 10) has a picture of the story in the prompt, for children who cannot read it yet.
   The hint draws the objects for that kind (story* helpers) and is read aloud. The label is "story <kind> <equation>". */
const STORY_KINDS={1:[['join',.6],['sep',.4]],
  2:[['join',.25],['sep',.2],['chg',.15],['chgS',.1],['part',.1],['cmpD',.2]],
  3:[['join',.15],['sep',.15],['start',.15],['startS',.1],['cmpB',.15],['cmpS',.15],['cmpD',.15]]};
// n objects of thing th; cls: ' st-x' faded (gone or not known yet), ' st-n' new (a dashed ring), ' st-sm' small, ' st-e' an empty place
const storyObj=(th,n,cls='')=>Array.from({length:n},()=>`<span class="st-o${cls}">${cls==' st-e'?'':picFor(th[3]||th[2],th[1])}</span>`).join('');
const storyRow=(n,body)=>`<div class="st-row" style="--n:${Math.max(n,5)}">${body}</div>`;
function storyHint(st,th,pic,txt){return{k:'html',st,html:`<div class="st-h">${pic}</div><div>${esc(txt)}</div>`,w:txt}}
function genStory(lv){
  const me=S.name||'Sam',n2=pick([S.buddy,S.buddy,petN(),...NAMES].filter(n=>n&&n!==me));
  const th=pick(THINGS),pl=th[0],N=k=>qN(k,th[2],pl);
  const who=pick([me,n2]),other=who==me?n2:me;
  let r=rnd(),kind;
  for(const [k,p] of STORY_KINDS[lv]){kind=k;if((r-=p)<0)break}
  let t,ans,eq,hint,pic='';
  const O=(n,c)=>storyObj(th,n,c);
  if(kind=='join'){
    let a,b;
    if(lv==1){const s=R(3,10);a=R(1,s-1);b=s-a}else if(lv==2){a=R(4,9);b=R(3,9)}else{a=R(6,12);b=R(4,8)}
    t=pick([`${who} has ${N(a)}. ${other} gives ${who} ${b} more. How many ${pl} does ${who} have now?`,
      `${who} found ${N(a)} in the yard and ${b} more by the door. How many ${pl} in all?`,
      `${who} got ${N(a)} on Monday and ${N(b)} on Tuesday. How many ${pl} is that?`]);
    ans=a+b;eq=`${a} + ${b} = ?`;
    pic=`<div class="st-pic"><span class="st-g">${O(a)}</span><b class="st-op">+</b><span class="st-g">${O(b)}</span></div>`;
    hint=storyHint('join',th,storyRow(a+b+1,O(a)+'<b class="st-op">+</b>'+O(b)),`Count them all. Start at ${Math.max(a,b)} and count on ${Math.min(a,b)}.`);
  }else if(kind=='sep'){
    let a,b;
    if(lv==1){a=R(3,10);b=R(1,a-1)}else if(lv==2){a=R(4,10);b=R(1,a-1)}else{a=R(10,18);b=R(2,9)}
    t=pick([`${who} had ${N(a)}. ${who} gave ${b} to ${other}. How many ${pl} are left?`,
      `There were ${N(a)} on the table. ${b} fell off. How many are still on the table?`]);
    ans=a-b;eq=`${a} − ${b} = ?`;
    pic=`<div class="st-pic"><span class="st-g">${O(a-b)}${O(b,' st-x')}</span></div>`;
    hint=storyHint('sep',th,storyRow(a,O(a-b)+O(b,' st-x')),`${b} went away. They are the pale ones. Count the ones that are left.`);
  }else if(kind=='chg'){
    const a=R(3,9),b=R(2,9),c=a+b;
    t=pick([`${who} has ${N(a)}. ${other} gives ${who} some more. Now ${who} has ${N(c)}. How many ${pl} did ${other} give ${who}?`,
      `${who} had ${N(a)}. ${who} found some more. Now ${who} has ${N(c)}. How many ${pl} did ${who} find?`]);
    ans=b;eq=`${a} + ? = ${c}`;
    hint=storyHint('chg',th,storyRow(c,O(a)+O(b,' st-n')),`Start at ${a}. Count on until you get to ${c}. How many did you count?`);
  }else if(kind=='chgS'){
    const c=R(6,15),b=R(2,c-2),a=c-b;
    t=`${who} had ${N(c)}. ${who} gave some to ${other}. Now ${who} has ${N(a)}. How many ${pl} did ${who} give away?`;
    ans=b;eq=`${c} − ? = ${a}`;
    hint=storyHint('chgS',th,storyRow(c,O(a)+O(b,' st-x')),`${c} at the start. ${a} are still here. How many went away?`);
  }else if(kind=='part'){
    const c=R(6,15),a=R(2,c-2);
    t=`${who} has ${N(c)}. ${a} are big and the rest are small. How many small ${pl} does ${who} have?`;
    ans=c-a;eq=`${a} + ? = ${c}`;
    hint=storyHint('part',th,storyRow(c,O(a)+O(c-a,' st-sm')),`${c} in all. ${a} are big. Take them away. How many small ones are left?`);
  }else if(kind=='cmpD'){
    const x=lv==2?R(5,15):R(8,18),y=lv==2?R(2,x-1):R(3,x-2),fewer=coin();
    t=fewer?`${who} has ${N(x)}. ${other} has ${N(y)}. How many fewer ${pl} does ${other} have than ${who}?`
      :`${who} has ${N(x)}. ${other} has ${N(y)}. How many more ${pl} does ${who} have than ${other}?`;
    ans=x-y;eq=`${x} − ${y} = ?`;
    hint=storyHint('cmpD',th,storyRow(x,O(x))+storyRow(x,O(y)+O(x-y,' st-e')),`Top row: ${who}. Bottom row: ${other}. Line them up. How many in the top row have no partner?`);
  }else if(kind=='start'){
    const a=R(3,10),b=R(2,9),c=a+b;
    t=`${who} had some ${pl}. Then ${other} gave ${who} ${b} more. Now ${who} has ${N(c)}. How many ${pl} did ${who} have at the start?`;
    ans=a;eq=`? + ${b} = ${c}`;
    hint=storyHint('start',th,storyRow(c,O(a,' st-x')+O(b)),`Think: what and ${b} make ${c}? Take the ${b} new ones away from ${c}.`);
  }else if(kind=='startS'){
    const a=R(3,9),b=R(2,9),c=a+b;
    t=`${who} had some ${pl}. ${who} gave ${b} to ${other}. Now ${who} has ${N(a)} left. How many ${pl} did ${who} have at the start?`;
    ans=c;eq=`? − ${b} = ${a}`;
    hint=storyHint('startS',th,storyRow(c,O(a)+O(b,' st-x')),`Put them back together: ${a} left and ${b} given away. How many in all?`);
  }else if(kind=='cmpB'){
    const y=R(3,10),d=R(2,8);
    t=`${other} has ${N(y)}. ${who} has ${d} more than ${other}. How many ${pl} does ${who} have?`;
    ans=y+d;eq=`${y} + ${d} = ?`;
    hint=storyHint('cmpB',th,storyRow(y+d,O(y))+storyRow(y+d,O(y)+O(d,' st-x')),`Top row: ${other}. Bottom row: ${who}. ${who} has the same, and ${d} more.`);
  }else{ // cmpS
    const x=R(8,18),d=R(2,x-3);
    t=`${who} has ${N(x)}. ${other} has ${d} fewer than ${who}. How many ${pl} does ${other} have?`;
    ans=x-d;eq=`${x} − ${d} = ?`;
    hint=storyHint('cmpS',th,storyRow(x,O(x))+storyRow(x,O(x-d)+O(d,' st-e')),`Top row: ${who}. Bottom row: ${other}. ${other} has ${d} fewer. Take ${d} away from ${x}.`);
  }
  return{kind:'num',html:`<p class="story">${words(t)}</p>${lv==1?pic:''}<div>${SLOT}</div>`,say:t,auto:true,ans:String(ans),
    hint,label:`story ${kind} ${eq}`}}
