/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
   ═══════════════════════════════════════════════════════ */

(function () {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements after loader completes
  const startObserving = () => {
    revealElements.forEach((el) => observer.observe(el));
  };

  // Listen for loader complete
  window.addEventListener('loaderComplete', startObserving);

  // Fallback if loader is already done
  if (document.getElementById('loader')?.style.display === 'none') {
    startObserving();
  }

  // Also handle text-reveal-wrap elements
  const textReveals = document.querySelectorAll('.text-reveal-wrap');
  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          textObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  window.addEventListener('loaderComplete', () => {
    // Stagger hero text reveals
    textReveals.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, i * 150);
    });
  });
})();
