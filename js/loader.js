/* ═══════════════════════════════════════════════════════
   X-MASK LOADER — Two-phase intro sequence
   ═══════════════════════════════════════════════════════
   t=0.0s   Phase 1: Photo-bleed text scrolls
   t=2.0s   Phase 1 fades out
   t=2.8s   Phase 2: Single "X" with photo bleed appears
   t=3.3s   X scales up + fades, circle morphs in
   t=3.8s   Circle fully visible, centered
   t=4.0s   Circle flies to hero-profile position
   t=4.5s   Loader bg fades, site revealed
   t=4.7s   Cleanup, dispatch loaderComplete
   ═══════════════════════════════════════════════════════ */

(function () {
  var loader  = document.getElementById('x-loader');
  var phase1  = document.getElementById('xl-phase1');
  var xChar   = document.getElementById('xl-x');
  var circle  = document.getElementById('xl-circle');

  if (!loader) return;

  /* ── Lock scroll ── */
  document.body.style.overflow = 'hidden';

  /* ── t=2.0s — Fade out Phase 1 marquee ── */
  setTimeout(function () {
    phase1.classList.add('fade-out');
  }, 2000);

  /* ── t=3.3s — X morphs: scale up + fade out ── */
  setTimeout(function () {
    xChar.classList.add('morph');
  }, 3300);

  /* ── t=3.5s — Circle scales in from center ── */
  setTimeout(function () {
    circle.classList.add('visible');
  }, 3500);

  /* ── t=4.0s — FLIP: Circle flies to hero-profile position ── */
  setTimeout(function () {
    var heroProfile = document.querySelector('.hero-profile');
    if (!heroProfile) return;

    var heroRect   = heroProfile.getBoundingClientRect();
    var circleRect = circle.getBoundingClientRect();

    var dx = (heroRect.left + heroRect.width  / 2)
           - (circleRect.left + circleRect.width  / 2);
    var dy = (heroRect.top  + heroRect.height / 2)
           - (circleRect.top  + circleRect.height / 2);
    var scale = heroRect.width / 140;   /* 140 = circle's CSS width */

    circle.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    circle.style.transform  = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';
  }, 4000);

  /* ── t=4.3s — Fade out loader background ── */
  setTimeout(function () {
    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity    = '0';
  }, 4300);

  /* ── t=4.5s — Fade out the flying circle ── */
  setTimeout(function () {
    circle.style.transition = 'opacity 0.2s ease';
    circle.style.opacity    = '0';
  }, 4500);

  /* ── t=4.7s — Cleanup: remove loader, unlock scroll, signal site ── */
  setTimeout(function () {
    loader.style.display = 'none';
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('loaderComplete'));
  }, 4700);
})();
