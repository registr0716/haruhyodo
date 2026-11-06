// 하루효도 사이트 공통 스크립트: 스크롤 등장, 주소 복사
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...document.querySelectorAll('.reveal')].filter(el => el.getBoundingClientRect().top > innerHeight * 0.92);
  els.forEach(el => el.classList.add('pending'));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.remove('pending'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();

document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy');
    try { await navigator.clipboard.writeText(text); btn.textContent = '복사했어요'; }
    catch (_) {
      const target = btn.previousElementSibling;
      if (target) { const r = document.createRange(); r.selectNodeContents(target); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      btn.textContent = '주소를 선택했어요';
    }
  });
});
