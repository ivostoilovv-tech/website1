/* ============================================
   Д-р Иво Костов — Shared Components & Interactions v2.0
   Design Intelligence: ui-ux-pro-max applied
   - Smooth scroll animations with stagger
   - Accessible nav with ARIA
   - Scroll-based nav shadow
   - Counter animation for stats
   - Enhanced FAQ with smooth height
   ============================================ */

(function () {
  'use strict';

  const path = window.location.pathname;
  const isSubfolder = path.includes('/uslugi/') || path.includes('/reshenia/');
  const base = isSubfolder ? '../' : '';

  /* ============================================
     SVG ICON LIBRARY (replaces all emoji)
     Lucide-style, 24x24, stroke 1.75
     ============================================ */
  const icons = {
    dna: '<svg viewBox="0 0 24 24"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.8-4 6.2-4 8 0"/><path d="M15 2c-1.8 4-6.2 4-8 0"/><path d="M2 9c6.667 6 13.333 0 20 6"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M9 22V12h6v10"/></svg>',
    hospital: '<svg viewBox="0 0 24 24"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9 12 3l9 6"/><path d="M12 13v4"/><path d="M10 15h4"/></svg>',
    molecule: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="19" r="2"/><path d="M14.5 9.5 17.5 7"/><path d="M9.5 9.5 6.5 7"/><path d="M14.5 14.5l3 2"/><path d="M9.5 14.5l-3 2"/></svg>',
    balance: '<svg viewBox="0 0 24 24"><path d="M12 3v19"/><path d="M5 8h14"/><path d="M5 8 3 14c0 1.7 1.3 2 2 2s2-.3 2-2L5 8Z"/><path d="M19 8l-2 6c0 1.7 1.3 2 2 2s2-.3 2-2l-2-6Z"/></svg>',
    monitor: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7.5 10.5 10 13l4-4 2.5 2.5"/></svg>',
    handshake: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    zap: '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    mapPin: '<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    kiosk: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="16" rx="2"/><path d="M4 10h16"/><path d="M8 22h8"/><path d="M12 18v4"/><circle cx="12" cy="6" r="1.5"/></svg>',
    building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  };

  window.siteIcons = icons;

  /* ============================================
     NAVIGATION
     ============================================ */
  function renderNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    nav.innerHTML = `
      <a href="#main-content" class="skip-link">Преминете към съдържанието</a>
      <nav class="nav" role="navigation" aria-label="Основна навигация">
        <div class="nav-logo"><a href="${base}index.html">Д-р Иво Костов</a></div>
        <div class="nav-links" id="nav-links">
          <div class="nav-dropdown">
            <span class="nav-dropdown-trigger" role="button" tabindex="0" aria-expanded="false" aria-haspopup="true">Услуги</span>
            <div class="nav-dropdown-menu" role="menu">
              <a href="${base}uslugi.html" role="menuitem">Всички услуги</a>
              <a href="${base}uslugi/personalizirano-dalgoletie.html" role="menuitem">Персонализирано дълголетие</a>
              <a href="${base}uslugi/bolnitsa-vkashti.html" role="menuitem">Болница вкъщи</a>
              <a href="${base}uslugi/peptidna-terapia-nad.html" role="menuitem">Пептиди и NAD+</a>
              <a href="${base}uslugi/hormonalna-optimizacia.html" role="menuitem">Хормонална оптимизация</a>
              <a href="${base}uslugi/telemedicina.html" role="menuitem">Телемедицина</a>
              <a href="${base}uslugi/lechenie-na-zavisimosti.html" role="menuitem">Лечение на зависимости</a>
              <a href="${base}uslugi/vagusov-nerv-avns.html" role="menuitem">Вагусова стимулация</a>
            </div>
          </div>
          <div class="nav-dropdown">
            <span class="nav-dropdown-trigger" role="button" tabindex="0" aria-expanded="false" aria-haspopup="true">Решения за бизнеса</span>
            <div class="nav-dropdown-menu" role="menu">
              <a href="${base}reshenia/zdrav-kiosk.html" role="menuitem">Мобилен здравен киоск</a>
              <a href="${base}reshenia/korporativno-zdrave.html" role="menuitem">Корпоративно здраве</a>
            </div>
          </div>
          <a href="${base}kak-rabotim.html">Как работим</a>
          <a href="${base}tseni.html">Цени</a>
          <a href="${base}kontakt.html">Резервирайте час</a>
          <a class="nav-cta-mobile" href="${base}kontakt.html">Резервирайте час</a>
        </div>
        <a href="${base}kontakt.html" class="nav-cta">Резервирайте час</a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Отваряне на менюто" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
    `;

    // Mobile menu toggle
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.setAttribute('aria-label', isOpen ? 'Затваряне на менюто' : 'Отваряне на менюто');
      });
    }

    // Mobile & keyboard dropdown toggles
    document.querySelectorAll('.nav-dropdown-trigger').forEach(function (trigger) {
      function toggleDropdown(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dd = trigger.parentElement;
          const isOpen = dd.classList.toggle('open');
          trigger.setAttribute('aria-expanded', isOpen);
        }
      }
      trigger.addEventListener('click', toggleDropdown);
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDropdown(e);
        }
      });
    });

    // Close menu on link click (mobile)
    if (links) {
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          if (toggle) {
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    // Nav shadow on scroll
    const navEl = document.querySelector('.nav');
    if (navEl) {
      let ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(function () {
            if (window.scrollY > 10) {
              navEl.style.boxShadow = '0 1px 12px rgba(15,43,28,0.06)';
            } else {
              navEl.style.boxShadow = 'none';
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  /* ============================================
     FOOTER
     ============================================ */
  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <footer class="footer" role="contentinfo">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">Д-р Иво Костов</div>
            <p class="footer-desc">Персонализирана медицина за дълголетие. Прецизна диагностика, клетъчни терапии и непрекъснат мониторинг с подкрепата на изкуствен интелект.</p>
          </div>
          <div>
            <h4>Услуги</h4>
            <ul>
              <li><a href="${base}uslugi/personalizirano-dalgoletie.html">Персонализирано дълголетие</a></li>
              <li><a href="${base}uslugi/bolnitsa-vkashti.html">Болница вкъщи</a></li>
              <li><a href="${base}uslugi/peptidna-terapia-nad.html">Пептиди и NAD+</a></li>
              <li><a href="${base}uslugi/hormonalna-optimizacia.html">Хормонална оптимизация</a></li>
              <li><a href="${base}uslugi/telemedicina.html">Телемедицина</a></li>
              <li><a href="${base}uslugi/lechenie-na-zavisimosti.html">Лечение на зависимости</a></li>
              <li><a href="${base}uslugi/vagusov-nerv-avns.html">Вагусова стимулация</a></li>
            </ul>
          </div>
          <div>
            <h4>Компания</h4>
            <ul>
              <li><a href="${base}za-nas.html">За нас</a></li>
              <li><a href="${base}kak-rabotim.html">Как работим</a></li>
              <li><a href="${base}tseni.html">Цени</a></li>
              <li><a href="${base}kontakt.html">Контакт</a></li>
            </ul>
          </div>
          <div>
            <h4>Решения</h4>
            <ul>
              <li><a href="${base}reshenia/zdrav-kiosk.html">Здравен киоск</a></li>
              <li><a href="${base}reshenia/korporativno-zdrave.html">Корпоративно здраве</a></li>
            </ul>
            <h4 style="margin-top: var(--space-6)">Правна информация</h4>
            <ul>
              <li><a href="#">Политика за поверителност</a></li>
              <li><a href="#">Общи условия</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; ${new Date().getFullYear()} Д-р Иво Костов. Всички права запазени.
        </div>
      </footer>
    `;
  }

  /* ============================================
     FAQ ACCORDION (accessible)
     ============================================ */
  function initFaq() {
    document.querySelectorAll('.faq-question').forEach(function (q) {
      q.setAttribute('role', 'button');
      q.setAttribute('tabindex', '0');
      q.setAttribute('aria-expanded', 'false');

      function toggle() {
        const item = q.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          q.setAttribute('aria-expanded', 'true');
        }
      }

      q.addEventListener('click', toggle);
      q.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ============================================
     SCROLL ANIMATIONS (staggered)
     ============================================ */
  function initScrollAnimations() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================
     COUNTER ANIMATION (for stats)
     ============================================ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counters.forEach(function (c) {
        c.textContent = c.getAttribute('data-count');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var duration = 1200;
          var start = 0;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = prefix + target + suffix;
            }
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ============================================
     CONTACT FORM
     ============================================ */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Изпращане...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(function () {
        btn.textContent = 'Изпратено ✓';
        btn.style.background = 'var(--color-primary)';
        btn.style.opacity = '1';
        form.reset();
        setTimeout(function () {
          btn.textContent = origText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  /* ============================================
     SMOOTH SCROLL for anchor links
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================
     INIT
     ============================================ */
  document.addEventListener('DOMContentLoaded', function () {
    renderNav();
    renderFooter();
    initFaq();
    initScrollAnimations();
    initCounters();
    initContactForm();
    initSmoothScroll();

    // Mark main content
    var main = document.querySelector('main, section:first-of-type');
    if (main && !document.getElementById('main-content')) {
      main.id = 'main-content';
    }
  });
})();
