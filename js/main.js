/* ══════════════════════════════════════════════════════════
   AbhinuDev — site interactions
   ══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Mobile nav ────────────────────────────────────────── */
  var menuBtn = document.getElementById('menu-button');
  var navLinks = document.getElementById('nav-links');

  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('nav-open');
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('nav-open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('nav-open');
    }
  });

  /* ── Hero typewriter ───────────────────────────────────── */
  var LINES = [
    'Builder of the Basic ICTL language, keeper of the AstralyxPvP stack, and a very stubborn OS learner.',
    'I turn ideas into sites, bots and interpreters.',
    'From bare-metal kernels in C to beginner-friendly coding languages.',
    'The one who never quits Minecraft (or debugging).'
  ];

  var typedEl = document.getElementById('typed');
  var li = 0, ci = 0, deleting = false;

  function tick() {
    if (!typedEl) return;
    var line = LINES[li];

    if (!deleting) {
      typedEl.textContent = line.slice(0, ci + 1);
      ci++;
      if (ci === line.length) {
        deleting = true;
        return window.setTimeout(tick, 2400);
      }
      window.setTimeout(tick, 34);
    } else {
      typedEl.textContent = line.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        li = (li + 1) % LINES.length;
        return window.setTimeout(tick, 450);
      }
      window.setTimeout(tick, 18);
    }
  }

  if (typedEl) {
    window.setTimeout(tick, 650);
  }

  /* ── Scroll reveal ─────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Project filter tabs ───────────────────────────────── */
  var tabs = document.querySelectorAll('#filter-tabs button');
  var rows = document.querySelectorAll('.project-row');
  var counts = {
    all: rows.length,
    featured: 0,
    astralyx: 0,
    personal: 0
  };

  rows.forEach(function (row) {
    var cats = row.getAttribute('data-cat').split(/\s+/);
    if (cats.indexOf('featured') !== -1) counts.featured++;
    if (cats.indexOf('astralyx') !== -1) counts.astralyx++;
    if (cats.indexOf('personal') !== -1) counts.personal++;
  });

  document.getElementById('count-all').textContent = counts.all;
  document.getElementById('count-featured').textContent = counts.featured;
  document.getElementById('count-astralyx').textContent = counts.astralyx;
  document.getElementById('count-personal').textContent = counts.personal;

  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabs.forEach(function (b) { b.classList.remove('filter-active'); });
      btn.classList.add('filter-active');

      var filter = btn.getAttribute('data-filter');
      rows.forEach(function (row) {
        var cats = row.getAttribute('data-cat').split(/\s+/);
        var show = filter === 'all' || cats.indexOf(filter) !== -1;
        row.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Copy server IP ────────────────────────────────────── */
  var ipEl = document.getElementById('java-ip');
  if (ipEl) {
    ipEl.addEventListener('click', function () {
      var ip = 'java.astralyxpvp.int.yt';
      var done = function () {
        var original = ipEl.textContent;
        ipEl.textContent = 'copied!';
        window.setTimeout(function () { ipEl.textContent = original; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ip).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = ip;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ── Scrollspy (nav active section) ────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navAnchors.forEach(function (a) {
            if (a.getAttribute('href') === '#' + id) a.style.color = 'var(--rust)';
            else a.style.color = '';
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();