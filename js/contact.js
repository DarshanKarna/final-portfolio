/* ═══════════════════════════════════════════════════════
   CONTACT — Form validation & submission + Toast popup
   ═══════════════════════════════════════════════════════ */

(function () {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');

  if (!form) return;

  /* ── Inject toast styles once ── */
  const toastStyles = document.createElement('style');
  toastStyles.textContent = `
    .toast-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(5, 5, 5, 0.7);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      opacity: 0;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }
    .toast-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }
    .toast-popup {
      background: #0D0D0D;
      border: 1px solid rgba(184, 169, 232, 0.25);
      border-radius: 16px;
      padding: 2.5rem 3rem;
      text-align: center;
      transform: translateY(30px) scale(0.95);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      box-shadow: 0 0 60px rgba(184, 169, 232, 0.12),
                  0 0 120px rgba(184, 169, 232, 0.05);
      max-width: 380px;
      width: 90vw;
    }
    .toast-overlay.visible .toast-popup {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    .toast-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 1.25rem;
      border-radius: 50%;
      background: rgba(184, 169, 232, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .toast-icon svg {
      width: 28px;
      height: 28px;
      stroke: #B8A9E8;
      fill: none;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .toast-icon.error svg { stroke: #E88A8A; }
    .toast-icon.error { background: rgba(232, 138, 138, 0.12); }
    .toast-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: #F5F5F5;
      margin-bottom: 0.4rem;
      letter-spacing: -0.02em;
    }
    .toast-message {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      color: #888888;
      line-height: 1.5;
    }
    .toast-bar {
      margin-top: 1.5rem;
      height: 3px;
      border-radius: 3px;
      background: rgba(184, 169, 232, 0.15);
      overflow: hidden;
    }
    .toast-bar-fill {
      height: 100%;
      width: 100%;
      background: #B8A9E8;
      border-radius: 3px;
      transform-origin: left;
      animation: toastCountdown 3s linear forwards;
    }
    .toast-icon.error + .toast-title ~ .toast-bar .toast-bar-fill,
    .toast-bar.error .toast-bar-fill { background: #E88A8A; }
    @keyframes toastCountdown {
      from { transform: scaleX(1); }
      to   { transform: scaleX(0); }
    }
  `;
  document.head.appendChild(toastStyles);

  /* ── Toast helper ── */
  function showToast(success) {
    // Remove any existing toast
    const existing = document.querySelector('.toast-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'toast-overlay';

    const checkSVG = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
    const crossSVG = `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    overlay.innerHTML = `
      <div class="toast-popup">
        <div class="toast-icon ${success ? '' : 'error'}">
          ${success ? checkSVG : crossSVG}
        </div>
        <p class="toast-title">${success ? 'Message Sent!' : 'Something Went Wrong'}</p>
        <p class="toast-message">${success
          ? "Thanks for reaching out. I'll get back to you soon."
          : 'Please try again or email me directly.'}</p>
        <div class="toast-bar ${success ? '' : 'error'}">
          <div class="toast-bar-fill"></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Trigger reflow then show
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add('visible');
      });
    });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 500);
    }, 3000);

    // Also dismiss on click
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 500);
    });
  }

  /* ── Form submit handler ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) return;

    // Update button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    }).then(res => {
      if (res.ok) {
        form.reset();
        showToast(true);
      } else {
        showToast(false);
      }
    }).catch(() => {
      showToast(false);
    }).finally(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    });
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
