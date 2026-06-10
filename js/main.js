/* ============================================================
   @IndianCoder3 — Portfolio JS
   ============================================================ */

// ── Custom Cursor ────────────────────────────────────────────
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let outlineX = window.innerWidth / 2, outlineY = window.innerHeight / 2;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  if (!dot || !outline) return;
  
  // Update dot position directly
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
  
  // Smoothly interpolate outline position
  outlineX += (mouseX - outlineX) * 0.2;
  outlineY += (mouseY - outlineY) * 0.2;
  
  outline.style.left = `${outlineX}px`;
  outline.style.top = `${outlineY}px`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .feature-card, .pc-inner').forEach(el => {
  el.addEventListener('mouseenter', () => {
    outline.style.width = '50px';
    outline.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    outline.style.width = '30px';
    outline.style.height = '30px';
  });
});


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
  'App Crafter',
  'Jai Shree Krishna',
  'You are right! They don\'t like me, they love me',
  'Building the future, one line at a time',
  'Debugging life, one coffee at a time',
  'Innovating the web, OS, and everything in between'
];

const RARE_LINES = ['The one who never quits MineCraft'];

let li = 0, ci = 0, deleting = false, showingRare = false, rareLine = '';
const tyEl = document.getElementById('typed-text');

function tick() {
  if (!tyEl) return;
  
  let line = showingRare ? rareLine : LINES[li];
  
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
      showingRare = false;
      
      // 10% chance to show a rare line
      if (Math.random() < 0.1) {
        showingRare = true;
        rareLine = RARE_LINES[Math.floor(Math.random() * RARE_LINES.length)];
      } else {
        li = (li + 1) % LINES.length;
      }
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