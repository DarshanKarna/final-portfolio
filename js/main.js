/* ═══════════════════════════════════════════════════════
   MAIN — Entry point: Lenis, bento hover, init
   ═══════════════════════════════════════════════════════ */

(function () {
  // ── Lenis Smooth Scroll ──
  let lenis;

  const initLenis = () => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };

  // Initialize Lenis after loader completes
  window.addEventListener('loaderComplete', initLenis);

  // ── Bento Card Radial Gradient Follow ──
  const bentoCards = document.querySelectorAll('.bento-card');

  bentoCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ── Nav Link Smooth Scroll via Lenis ──
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target && lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  // ── Parallax-like effect for hero glow ──
  const heroGlow = document.querySelector('.hero-profile-glow');
  if (heroGlow) {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroGlow.style.transform = `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.15}px)`;
        }
      },
      { passive: true }
    );
  }

  // ── Cursor dot (subtle) ──
  const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--color-accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      transition: transform 0.15s ease-out, opacity 0.15s;
      opacity: 0;
    `;
    document.body.appendChild(cursor);

    // Only show on desktop
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';
        cursor.style.opacity = '1';
      });

      document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
      });

      // Scale up on interactive elements
      const interactiveEls = document.querySelectorAll('a, button, .project-card, .bento-card');
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(3)';
          cursor.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.opacity = '1';
        });
      });
    }
  };

  window.addEventListener('loaderComplete', createCursor);
})();
