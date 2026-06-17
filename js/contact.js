/* ═══════════════════════════════════════════════════════
   CONTACT — Form validation & submission
   ═══════════════════════════════════════════════════════ */

(function () {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    // Basic validation is handled by HTML5 required attributes
    // Add visual feedback
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      return;
    }

    // Update button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    // Note: Formspree handles the actual submission and redirect.
    // If using JS fetch instead:
    // e.preventDefault();
    // fetch(form.action, {
    //   method: 'POST',
    //   body: new FormData(form),
    //   headers: { 'Accept': 'application/json' },
    // }).then(res => { ... });
  });

  // Magnetic button effect
  const magneticWrap = document.querySelector('.magnetic-wrap');
  if (magneticWrap) {
    magneticWrap.addEventListener('mousemove', (e) => {
      const rect = magneticWrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magneticWrap.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    magneticWrap.addEventListener('mouseleave', () => {
      magneticWrap.style.transform = 'translate(0, 0)';
    });
  }
})();
