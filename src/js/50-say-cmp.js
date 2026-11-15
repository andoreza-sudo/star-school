/* ---------- S-SPK2 B: the offline sound check of "Say it!" (every tablet; used when the tablet cannot recognise Spanish itself) ----------
   The child's recording is compared with the recorded model of the same line (ES-AUDIO, audio/es/<file>.ogg) and with up to 3
   recorded lines that are spelled and sound close to it (the distractors). Standard, documented method:
     1. decode both with Web Audio (OfflineAudioContext at 16 kHz, mono; decodeAudioData resamples)
     2. levels: silence or a whisper (no 0.15 s of voice) -> 'quiet'; clipped (over 6% of samples at full scale) -> 'loud'
     3. trim the silence (frames 30 dB under the loudest frame, or under the floor), pre-emphasis 0.97
     4. MFCC: 25 ms Hamming frames every 10 ms, 512-point FFT, 26 mel filters 80-6800 Hz, log, DCT, coefficients 1-12 (c0, the
        loudness, is left out), minus their mean over the utterance (cepstral mean normalisation: another microphone, room or voice
        shifts every frame the same way, and this takes it out). The child's recording is also measured with the filters moved
        by 0.85, 0.92, 1.08 and 1.16 (vocal tract length normalisation by a small grid search: a child's voice has higher
        formants than the grown-up model) and the closest of the five is used, for the model and the distractors alike
     5. dynamic time warping (Sakoe-Chiba band, Euclidean frame distance, steps right / down / diagonal), the path cost divided by
        n + m: the same word said faster or slower still lines up
   Judgement (SPKC.judge): 'great' when the target is the best match by a clear margin (its distance at most RATIO times the
   nearest distractor's) and under ABS; otherwise 'again' ("Close! Listen again"). A child is never told they were wrong.
   Thresholds come from tools/spk-calib.js on the recordings themselves (docs/PROGRESS.md S-SPK2 has the numbers; tools/test.js
   "Spanish speaking check S-SPK2" checks them again). Nothing here stores or sends anything: the only file read is the app's own
   recording of the line (from the service worker's cache), and the child's recording is only decoded in memory.
   It runs in small steps (a yield between the files) so a cheap tablet keeps drawing; about 1 s at 6x CPU throttle. */
const SPKC={SR:16000,WIN:400,HOP:160,NFFT:512,NM:26,NC:12,LO:80,HI:6800,WARPS:[0.85,0.92,1.08,1.16],
  ABS:1.6,RATIO:1.15, // calibrated (tools/spk-calib.js): see docs/PROGRESS.md S-SPK2
  QUIET:0.004,MINV:15,CLIP:0.06,DROP:30,
  mel:{},win:null,dct:null,cache:new Map()};
// the mel filterbank (for a warp al: every filter's frequencies times al), made once each
function spkcMel(al){if(SPKC.mel[al])return SPKC.mel[al];const {SR,NFFT,NM,LO,HI}=SPKC,hz=m=>700*(Math.pow(10,m/2595)-1),mel=h=>2595*Math.log10(1+h/700);
  const m0=mel(LO),m1=mel(HI),pts=[];for(let i=0;i<NM+2;i++)pts.push(Math.min(NFFT/2,Math.floor((NFFT+1)*hz(m0+(m1-m0)*i/(NM+1))*al/SR)));
  const B=[];for(let k=1;k<=NM;k++){const a=pts[k-1],b=pts[k],c=pts[k+1],f=[];
    for(let j=a;j<=c;j++){const w=j<b?(j-a)/Math.max(1,b-a):(c-j)/Math.max(1,c-b);if(w>0)f.push([j,w])}if(!f.length)f.push([b,1]);B.push(f)}
  return SPKC.mel[al]=B}
// the Hamming window and the DCT matrix, made once
function spkcInit(){if(SPKC.win)return;const {NM,NC,WIN}=SPKC;
  SPKC.win=new Float32Array(WIN);for(let i=0;i<WIN;i++)SPKC.win[i]=0.54-0.46*Math.cos(2*Math.PI*i/(WIN-1));
  SPKC.dct=[];for(let c=1;c<=NC;c++){const r=new Float32Array(NM);for(let k=0;k<NM;k++)r[k]=Math.cos(Math.PI*c*(k+0.5)/NM);SPKC.dct.push(r)}}
// in-place radix-2 FFT
function spkcFFT(re,im){const n=re.length;
  for(let i=1,j=0;i<n;i++){let b=n>>1;for(;j&b;b>>=1)j^=b;j^=b;if(i<j){let t=re[i];re[i]=re[j];re[j]=t;t=im[i];im[i]=im[j];im[j]=t}}
  for(let len=2;len<=n;len<<=1){const a=-2*Math.PI/len,wr=Math.cos(a),wi=Math.sin(a);
    for(let i=0;i<n;i+=len){let cr=1,ci=0;for(let k=0;k<len/2;k++){const p=i+k,q=p+len/2,xr=re[q]*cr-im[q]*ci,xi=re[q]*ci+im[q]*cr;
      re[q]=re[p]-xr;im[q]=im[p]-xi;re[p]+=xr;im[p]+=xi;const t=cr*wr-ci*wi;ci=cr*wi+ci*wr;cr=t}}}}
// x: Float32Array at 16 kHz -> {k:'ok'|'quiet'|'loud', f:[Float32Array(NC)] (the trimmed, normalised MFCC frames), fw:[f, one per
// warp in SPKC.WARPS] (only with warp true: the child's side), sec}
function spkcFeat(x,warp){spkcInit();const {WIN,HOP,NFFT,NM,NC}=SPKC,n=x.length;
  if(n<WIN)return{k:'quiet',f:[],sec:0};
  let clip=0;for(let i=0;i<n;i++)if(Math.abs(x[i])>=0.985)clip++;
  const nf=Math.floor((n-WIN)/HOP)+1,en=new Float32Array(nf);let emax=-1e9;
  for(let t=0;t<nf;t++){let s=0;for(let i=0;i<WIN;i++){const v=x[t*HOP+i];s+=v*v}en[t]=10*Math.log10(s/WIN+1e-12);if(en[t]>emax)emax=en[t]}
  const floor=20*Math.log10(SPKC.QUIET),cut=Math.max(emax-SPKC.DROP,floor);let a=-1,b=-1,voiced=0;
  for(let t=0;t<nf;t++)if(en[t]>cut){voiced++;if(a<0)a=t;b=t}
  if(a<0||voiced<SPKC.MINV)return{k:'quiet',f:[],sec:voiced*HOP/SPKC.SR};
  if(clip/n>SPKC.CLIP)return{k:'loud',f:[],sec:(b-a+1)*HOP/SPKC.SR};
  a=Math.max(0,a-2);b=Math.min(nf-1,b+2);
  const re=new Float32Array(NFFT),im=new Float32Array(NFFT),lm=new Float32Array(NM),als=[1].concat(warp?SPKC.WARPS:[]),fs=als.map(()=>[]),pws=[];
  for(let t=a;t<=b;t++){re.fill(0);im.fill(0);const o=t*HOP,pw=new Float32Array(NFFT/2+1);
    for(let i=0;i<WIN;i++)re[i]=(x[o+i]-0.97*(o+i>0?x[o+i-1]:0))*SPKC.win[i];
    spkcFFT(re,im);for(let j=0;j<=NFFT/2;j++)pw[j]=re[j]*re[j]+im[j]*im[j];
    als.forEach((al,w)=>{const M=spkcMel(al);for(let k=0;k<NM;k++){let s=0;for(const [j,v] of M[k])s+=pw[j]*v;lm[k]=Math.log(s+1e-10)}
      const c=new Float32Array(NC);for(let q=0;q<NC;q++){let s=0;const r=SPKC.dct[q];for(let k=0;k<NM;k++)s+=r[k]*lm[k];c[q]=s}fs[w].push(c)})}
  for(const f of fs){const mu=new Float32Array(NC);for(const c of f)for(let q=0;q<NC;q++)mu[q]+=c[q]/f.length;
    for(const c of f)for(let q=0;q<NC;q++)c[q]=(c[q]-mu[q])/10}
  return{k:'ok',f:fs[0],fw:fs.slice(1),sec:fs[0].length*HOP/SPKC.SR}}
// DTW distance between two frame lists (lower = closer); Infinity when one is more than 3 times as long as the other
function spkcDTW(A,B){const n=A.length,m=B.length;if(!n||!m)return Infinity;if(n>3*m||m>3*n)return Infinity;
  const w=Math.max(Math.abs(n-m),Math.ceil(0.25*Math.max(n,m)))+2,NC=A[0].length;let p=new Float64Array(m+1).fill(Infinity),c=new Float64Array(m+1);p[0]=0;
  for(let i=1;i<=n;i++){c.fill(Infinity);const ci=i*m/n,a=A[i-1];
    for(let j=Math.max(1,Math.floor(ci-w));j<=Math.min(m,Math.ceil(ci+w));j++){const b=B[j-1];let d=0;for(let q=0;q<NC;q++){const e=a[q]-b[q];d+=e*e}
      c[j]=Math.sqrt(d)+Math.min(p[j],c[j-1],p[j-1])}
    const t=p;p=c;c=t}
  return p[m]/(n+m)}
// the child's distance to a recorded line: the closest of the child's warps
const spkcDist=(kid,ref)=>Math.min(spkcDTW(kid.f,ref.f),...(kid.fw||[]).map(f=>spkcDTW(f,ref.f)));
// the decision from the child's features and the target's and distractors' (pure; tools/test.js and tools/spk-calib.js use it)
function spkcDecide(kid,tgt,dis){if(kid.k!='ok')return{k:kid.k,d:Infinity,dk:Infinity};
  const d=spkcDist(kid,tgt),dk=Math.min(Infinity,...dis.map(x=>spkcDist(kid,x)));
  return{k:d<=SPKC.ABS&&d<=dk*SPKC.RATIO?'great':'again',d,dk}}
/* the distractors of a line: up to 3 other recorded lines spelled most like it (letters, articles left out), each a different word, a
   line the matcher would accept left out, lines of the same voice first (so the voice never decides), then by name; deterministic */
function spkcNear(text,k=3){if(typeof ES_AUDIO=='undefined')return[];const L=ES_AUDIO.lines,key=esKey(text),me=L[key];if(!me)return[];
  const t=spkNorm(text).replace(/ /g,''),out=[];
  for(const s in L){if(s==key||L[s][0]==me[0])continue;const h=spkNorm(s).replace(/ /g,'');if(!h||spkMatch(text,s)||spkMatch(s,text))continue;
    const sc=spkDist(t,h)/Math.max(t.length,h.length)+(L[s][1]==me[1]?0:0.15);out.push([sc,s])}
  const seen=new Set(),pick=[];for(const [,s] of out.sort((a,b)=>a[0]-b[0]||(a[1]<b[1]?-1:1))){const w=spkNorm(s);if(seen.has(w))continue;seen.add(w);pick.push(s);if(pick.length>=k)break}
  return pick} // one line per word: el pato, pato and un pato count once
const spkcYield=()=>new Promise(r=>setTimeout(r,0));
// decode an audio file's bytes to 16 kHz mono samples (Web Audio)
async function spkcDecode(buf){const C=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!C)throw new Error('no Web Audio');
  const ctx=new C(1,1,SPKC.SR),ab=await new Promise((res,rej)=>{const p=ctx.decodeAudioData(buf,res,rej);if(p&&p.then)p.then(res,rej)});
  if(ab.numberOfChannels==1)return ab.getChannelData(0);const x=new Float32Array(ab.length);
  for(let c=0;c<ab.numberOfChannels;c++){const d=ab.getChannelData(c);for(let i=0;i<x.length;i++)x[i]+=d[i]/ab.numberOfChannels}return x}
// a recorded line's features (cached for the session): the app's own file, from the service worker's cache when offline
async function spkcLine(text){const fs=esFiles(text);if(!fs||fs.length!=1||location.protocol=='file:')return null;const f=fs[0][0]; // file:// (a page opened from a file) cannot read its own files: no check
  if(SPKC.cache.has(f))return SPKC.cache.get(f);
  const r=await fetch(ES_AUDIO.dir+f+ES_AUDIO.ext);if(!r.ok)return null;
  const ft=spkcFeat(await spkcDecode(await r.arrayBuffer()));if(SPKC.cache.size>40)SPKC.cache.delete(SPKC.cache.keys().next().value);
  SPKC.cache.set(f,ft);return ft}
// the whole check: the child's recording (a Blob) against the line -> {k:'great'|'again'|'quiet'|'loud', ms} or null (no check here)
async function spkcJudge(blob,text){const t0=performance.now();let at='model';
  try{const tg=await spkcLine(text);if(!tg||tg.k!='ok')return null;await spkcYield();at='recording '+blob.type+' '+blob.size;
    let x;try{x=await spkcDecode(await blob.arrayBuffer())}catch(e){return{k:'quiet',ms:performance.now()-t0}} // no sound in it at all
    const kid=spkcFeat(x,true);await spkcYield();
    if(kid.k!='ok')return{k:kid.k,ms:performance.now()-t0};at='similar words';
    const dis=[];for(const s of spkcNear(text)){const x=await spkcLine(s);if(x&&x.k=='ok')dis.push(x);await spkcYield()}
    return Object.assign(spkcDecide(kid,tg,dis),{ms:performance.now()-t0})}catch(e){SPKC.err=at+': '+e;return null}} // SPKC.err: the last failure (no check then)
