/* ============================================================
   @IndianCoder3 — Portfolio JS
   ============================================================ */

// ── Page routing ─────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) { page.classList.add('active'); }
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Highlight active nav link
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });

  // Close mobile nav
  navLinks.classList.remove('open');
  burger.classList.remove('open');

  // Trigger reveals on the newly visible page
  setTimeout(checkReveals, 80);
}

// ── Navbar scroll glass ───────────────────────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const burger   = document.getElementById('burger');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

// Close nav if clicking outside on mobile
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  }
});

// Prevent default on all nav <a> tags
document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});

// ── Typewriter ───────────────────────────────────────────────
const LINES = [
  'Architect of AbhinuOS and Basic ICTL',
  'A Cool Indian Coder \u{1F1EE}\u{1F1F3}',
  'App Crafter'
];

let li = 0, ci = 0, deleting = false;
const tyEl = document.getElementById('typed-text');

function tick() {
  if (!tyEl) return;
  const line = LINES[li];
  if (!deleting) {
    tyEl.textContent = line.slice(0, ci + 1);
    ci++;
    if (ci === line.length) {
      deleting = true;
      return setTimeout(tick, 1800);
    }
    setTimeout(tick, 54);
  } else {
    tyEl.textContent = line.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      li = (li + 1) % LINES.length;
      return setTimeout(tick, 380);
    }
    setTimeout(tick, 28);
  }
}
setTimeout(tick, 700);

// ── Scroll reveal ─────────────────────────────────────────────
function checkReveals() {
  const vh = window.innerHeight;
  document.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < vh - 30) {
      setTimeout(() => el.classList.add('visible'), i * 55);
    }
  });
}
window.addEventListener('scroll', checkReveals, { passive: true });
setTimeout(checkReveals, 200);