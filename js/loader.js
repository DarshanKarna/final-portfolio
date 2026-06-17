/* ═══════════════════════════════════════════════════════
   LOADER — Percentage counter + text cycling
   ═══════════════════════════════════════════════════════ */

(function () {
  const loader = document.getElementById('loader');
  const counter = document.getElementById('loader-counter');
  const textEl = document.getElementById('loader-text');
  const barFill = document.getElementById('loader-bar-fill');

  if (!loader || !counter) return;

  const roles = ['AI Developer', 'Digital Marketer', 'Creative Coder', 'Welcome'];
  let roleIndex = 0;

  // Text cycling
  const cycleText = () => {
    if (roleIndex < roles.length) {
      anime({
        targets: textEl.querySelector('span'),
        translateY: [0, -20],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
          textEl.querySelector('span').textContent = roles[roleIndex];
          anime({
            targets: textEl.querySelector('span'),
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad',
          });
          roleIndex++;
        },
      });
    }
  };

  // Counter animation
  const counterObj = { value: 0 };

  anime({
    targets: counterObj,
    value: 100,
    round: 1,
    duration: 2200,
    easing: 'easeInOutQuart',
    update: () => {
      counter.textContent = counterObj.value;
      barFill.style.width = counterObj.value + '%';

      // Cycle text at specific percentages
      if (counterObj.value >= 25 && roleIndex === 0) cycleText();
      if (counterObj.value >= 50 && roleIndex === 1) cycleText();
      if (counterObj.value >= 75 && roleIndex === 2) cycleText();
      if (counterObj.value >= 95 && roleIndex === 3) cycleText();
    },
    complete: () => {
      // Exit animation
      anime({
        targets: loader,
        translateY: '-100%',
        duration: 800,
        easing: 'easeInOutQuart',
        delay: 300,
        complete: () => {
          loader.style.display = 'none';
          document.body.style.overflow = '';
          // Trigger hero animations
          window.dispatchEvent(new CustomEvent('loaderComplete'));
        },
      });
    },
  });

  // Prevent scroll during loader
  document.body.style.overflow = 'hidden';
})();
