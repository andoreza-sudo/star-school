/* ---------- math generators ---------- */
function genAdd(lv){let a,b;
  if(lv==1){const s=R(2,10);a=R(0,s);b=s-a}
  else if(lv==2){const k=pick([9,9,8,10,'d']);if(k=='d'){a=b=R(1,9)}else{a=k;b=R(1,9)}if(coin())[a,b]=[b,a]}
  else{a=R(2,9);b=R(2,9)}
  return mathQ(a,'+',b,a+b,'c',coin())}
function genMiss(lv){let c,a;
  if(lv==1){c=R(3,10);a=R(0,c)}else{c=R(10,18);a=R(c-9,9)}
  return mathQ(a,'+',c-a,c,coin()?'a':'b',false)}
function genSub(lv){let a,b;
  if(lv==1){a=R(2,10);b=R(0,a)}else if(lv==2){a=R(10,18);b=R(Math.max(1,a-9),9)}
  else if(lv==3){const a1=R(1,9),b1=R(0,a1),a2=R(2,9),b2=R(1,a2-1);a=a2*10+a1;b=b2*10+b1;
    return mathQ(a,'-',b,a-b,'c',true,{hint:{k:'text',s:`Ones first: ${a1} − ${b1}. Then tens: ${a2} − ${b2}.`}})}
  else{const a1=R(0,8),b1=R(a1+1,9),a2=R(3,9),b2=R(1,a2-2);a=a2*10+a1;b=b2*10+b1;
    return mathQ(a,'-',b,a-b,'c',true,{hint:{k:'text',s:`${a1} − ${b1}? Too small! Borrow a ten: ${a1+10} − ${b1} = ${a1+10-b1}. Now the tens: ${a2-1} − ${b2}.`}})}
  return mathQ(a,'-',b,a-b,'c',coin())}
function genBig(lv){let a,b,s;
  if(lv==1){const m=coin()?10:100,x=R(1,8),y=R(1,9-x);a=x*m;b=y*m;
    s=`Think: ${x} ${m==10?'tens':'hundreds'} + ${y} ${m==10?'tens':'hundreds'}.`}
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
const THINGS=[['apples','🍎'],['cookies','🍪'],['ducks','🦆'],['balls','⚽'],['stickers','⭐'],['toy cars','🚗'],['fish','🐟'],['crayons','🖍️'],['pencils','✏️']];
const NAMES=['Sam','Mia','Leo','Ava','Ben','Zoe'];
function genStory(lv){
  const me=S.name||'Sam',n2=pick([S.buddy,S.buddy,petN(),...NAMES].filter(n=>n&&n!==me));
  const [th,e]=pick(THINGS);let op='+',a,b;
  if(lv==1){const s=R(3,10);a=R(1,s-1);b=s-a}
  else if(lv==2){if(coin()){a=R(4,9);b=R(3,9)}else{op='-';a=R(4,10);b=R(1,a-1)}}
  else{if(coin()){a=R(6,12);b=R(4,8)}else{op='-';a=R(10,18);b=R(2,9)}}
  const who=pick([me,n2]),other=who==me?n2:me;
  const t=op=='+'?pick([`${who} has ${a} ${th}. ${other} gives ${who} ${b} more. How many ${th} does ${who} have now?`,
      `${who} found ${a} ${th} in the yard and ${b} more by the door. How many ${th} in all?`,
      `${who} got ${a} ${th} on Monday and ${b} ${th} on Tuesday. How many ${th} is that?`])
    :pick([`${who} had ${a} ${th}. ${who} gave ${b} to ${other}. How many ${th} are left?`,
      `There were ${a} ${th} on the table. ${b} fell off. How many are still on the table?`]);
  return{kind:'num',html:`<p class="story">${words(t)}</p><div>${SLOT}</div>`,say:t,auto:true,ans:String(op=='+'?a+b:a-b),
    hint:{k:'emoji',e,a,b,op},label:`story ${a} ${op=='+'?'+':'−'} ${b}`}}

