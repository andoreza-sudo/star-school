// A fake Brain Teasers type for the screens and the smoke test of the framework (P3-01). install() runs inside the page.
// "Tap the 3 star tiles": every tap on the lit tile counts; mistakes are taps elsewhere. The state is {taps, miss}.
function install() {
  if (BT.get('zzfake')) return;
  BT.reg({
    id: 'zzfake', name: 'Star Taps', icon: 'target', bands: 'ABCD', rules: 'Tap the lit tile three times.',
    make: (band, level, rnd) => ({ lit: Math.floor(rnd() * 9), need: 3 }),
    mount(el, p, api) {
      const st = api.loadState() || { taps: 0, miss: 0 };
      el.innerHTML = '<div class="fk"><div class="fkg" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:320px;margin:0 auto">' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<button class="btn soft fkt" style="min-height:72px" data-i="${i}">${i == p.lit ? 'lit' : ''}</button>`).join('') +
        `</div><p class="fkn" style="text-align:center;font-weight:700">${st.taps} of ${p.need}</p></div>`;
      el.querySelectorAll('.fkt').forEach(b => b.onclick = () => {
        if (+b.dataset.i === p.lit) st.taps++; else st.miss++;
        api.saveState(st);
        el.querySelector('.fkn').textContent = st.taps + ' of ' + p.need;
        if (st.taps >= p.need) api.win({ mistakes: st.miss });
      });
      return { hint(tier) { el.querySelector('.fkn').textContent = 'hint ' + tier; }, destroy() {} };
    },
    solve: p => [p.lit, p.lit, p.lit],
  });
}
module.exports = { install };
