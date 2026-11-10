const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','src','src.html'),'utf8');
let js=html.split('<script>')[1].split('</script>')[0];
js=js.replace('loadClips();\nhome(true);','');
global.localStorage={getItem:()=>null,setItem:()=>{}};
global.document={querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
global.navigator={};global.addEventListener=()=>{};global.location={protocol:'file:'};
global.speechSynthesis={getVoices:()=>[]};
eval(js+`
S.name='Ava';S.buddy='Ben';G={built:[]};global.setTimeout=()=>{};
let n=0,errs=[];
for(const id in SK){for(let lv=1;lv<=SK[id].max;lv++)for(let i=0;i<3000;i++){const q=SK[id].gen(lv);n++;
 if(!q.label||q.ans===undefined)errs.push(id+' missing');
 if(q.kind=='num'){const a=+q.ans;if(!(a>=0)||String(a)!==q.ans)errs.push(id+lv+' bad ans '+q.ans+' '+q.label)}
 if(q.kind=='choice'){const vs=q.choices.map(c=>c.v);if(!vs.includes(q.ans))errs.push(id+' ans not in choices');if(new Set(vs).size!==vs.length)errs.push(id+' dup choices '+vs);if(vs.length<2)errs.push(id+' few choices');vs.forEach(v=>{if(BAD.test(v))errs.push('BAD '+v)})}
 if(q.kind=='build'&&q.tiles.length<q.word.length)errs.push('tiles');
 hintHTML(q);
}}
// check story subtraction non-negative & level ranges
console.log('generated',n,'errors',errs.length,[...new Set(errs)].slice(0,10));
for(const id in SK)console.log(id,[1,2,3].filter(l=>l<=SK[id].max).map(l=>SK[id].gen(l).label).join(' | '));
`);
