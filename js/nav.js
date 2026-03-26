/**
 * Shared Navigation Component
 * Injected on all pages for consistent dropdown menus
 */
(function() {
  // Detect if we're in a subfolder (uslugi/ or reshenia/)
  const path = window.location.pathname;
  const inSubfolder = path.includes('/uslugi/') || path.includes('/reshenia/');
  const prefix = inSubfolder ? '../' : '';

  // Detect current page for active state
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';

  function isActive(page) {
    if (page === 'index' && currentPage === 'index') return true;
    if (currentPage === page) return true;
    // Check if we're on a service subpage
    if (path.includes('/uslugi/') && page === 'uslugi') return true;
    if (path.includes('/reshenia/') && page === 'reshenia') return true;
    return false;
  }

  function linkClass(page) {
    if (isActive(page)) {
      return 'text-secondary font-bold border-b-2 border-secondary pb-1 text-sm tracking-tight cursor-pointer flex items-center gap-1';
    }
    return 'text-on-surface-variant hover:text-primary transition-colors text-sm font-medium cursor-pointer flex items-center gap-1';
  }

  function plainLinkClass(page) {
    if (isActive(page)) {
      return 'text-secondary font-bold border-b-2 border-secondary pb-1 text-sm tracking-tight';
    }
    return 'text-on-surface-variant hover:text-primary transition-colors text-sm font-medium';
  }

  const navHTML = `
  <nav class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm" id="main-nav">
    <div class="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
      <a href="${prefix}index.html" class="text-xl font-bold text-primary tracking-tighter font-headline">Д-р Иво Костов</a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center space-x-8">
        <!-- Услуги dropdown -->
        <div class="relative group" id="nav-uslugi">
          <a class="${linkClass('uslugi')}" href="${prefix}uslugi.html">
            Услуги <span class="material-symbols-outlined text-xs transition-transform group-hover:rotate-180">expand_more</span>
          </a>
          <div class="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-outline-variant/10 p-2 min-w-[280px]">
              <a href="${prefix}uslugi/personalizirano-dalgoletie.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">genetics</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Персонализирано дълголетие</span>
                  <span class="text-[11px] text-on-surface-variant">Епигенетика и AI диагностика</span>
                </div>
              </a>
              <a href="${prefix}uslugi/bolnitsa-vkashti.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">home_health</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Болница вкъщи</span>
                  <span class="text-[11px] text-on-surface-variant">24/7 интензивно лечение от дома</span>
                </div>
              </a>
              <a href="${prefix}uslugi/peptidna-terapia-nad.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">science</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Пептиди и NAD+</span>
                  <span class="text-[11px] text-on-surface-variant">Клетъчна регенерация</span>
                </div>
              </a>
              <a href="${prefix}uslugi/hormonalna-optimizacia.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">balance</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Хормонална оптимизация</span>
                  <span class="text-[11px] text-on-surface-variant">Тестостерон, щитовидна жлеза</span>
                </div>
              </a>
              <a href="${prefix}uslugi/telemedicina.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">monitor_heart</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Телемедицина</span>
                  <span class="text-[11px] text-on-surface-variant">TaVIE платформа 24/7</span>
                </div>
              </a>
              <a href="${prefix}uslugi/lechenie-na-zavisimosti.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">psychology</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Лечение на зависимости</span>
                  <span class="text-[11px] text-on-surface-variant">Структурирана програма</span>
                </div>
              </a>
              <a href="${prefix}uslugi/vagusov-nerv-avns.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors group/item">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-white transition-colors">
                  <span class="material-symbols-outlined text-secondary text-lg group-hover/item:text-white" style="font-variation-settings:'FILL' 1">bolt</span>
                </div>
                <div>
                  <span class="text-sm font-semibold text-on-surface block">Вагусова стимулация</span>
                  <span class="text-[11px] text-on-surface-variant">Неинвазивна aVNS терапия</span>
                </div>
              </a>
              <div class="border-t border-outline-variant/10 mt-1 pt-1">
                <a href="${prefix}uslugi.html" class="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-secondary/5 transition-colors text-secondary font-semibold text-sm">
                  Вижте всички услуги <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Решения dropdown -->
        <div class="relative group" id="nav-reshenia">
          <a class="${linkClass('reshenia')}" href="${prefix}reshenia/korporativno-zdrave.html">
            Решения <span class="material-symbols-outlined text-xs transition-transform group-hover:rotate-180">expand_more</span>
          </a>
          <div class="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden min-w-[420px]">
              <div class="grid grid-cols-2 gap-0">
                <a href="${prefix}reshenia/zdrav-kiosk.html" class="p-5 hover:bg-secondary/5 transition-all group/card border-r border-outline-variant/10">
                  <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover/card:bg-primary group-hover/card:scale-110 transition-all">
                    <span class="material-symbols-outlined text-primary text-xl group-hover/card:text-white" style="font-variation-settings:'FILL' 1">health_metrics</span>
                  </div>
                  <h4 class="font-headline font-bold text-primary text-sm mb-1">Мобилен здравен киоск</h4>
                  <p class="text-[11px] text-on-surface-variant leading-relaxed">AI скрининг за събития, офиси и обществени пространства.</p>
                </a>
                <a href="${prefix}reshenia/korporativno-zdrave.html" class="p-5 hover:bg-secondary/5 transition-all group/card">
                  <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3 group-hover/card:bg-secondary group-hover/card:scale-110 transition-all">
                    <span class="material-symbols-outlined text-secondary text-xl group-hover/card:text-white" style="font-variation-settings:'FILL' 1">corporate_fare</span>
                  </div>
                  <h4 class="font-headline font-bold text-primary text-sm mb-1">Корпоративно здраве</h4>
                  <p class="text-[11px] text-on-surface-variant leading-relaxed">Програми за здраве, превенция и продуктивност на служители.</p>
                </a>
              </div>
              <div class="border-t border-outline-variant/10 px-5 py-3 bg-surface-container-low/50">
                <p class="text-[11px] text-on-surface-variant"><span class="material-symbols-outlined text-xs align-middle mr-1">info</span> Всички решения се адаптират към нуждите на вашата организация.</p>
              </div>
            </div>
          </div>
        </div>

        <a class="${plainLinkClass('kak-rabotim')}" href="${prefix}kak-rabotim.html">Как работя</a>
        <a class="${plainLinkClass('tseni')}" href="${prefix}tseni.html">Цени</a>
        <a class="${plainLinkClass('za-nas')}" href="${prefix}za-nas.html">За мен</a>
      </div>

      <div class="flex items-center gap-3">
        <a href="${prefix}kontakt.html" class="hidden lg:block bg-primary text-on-primary px-6 py-2.5 rounded-xl font-headline font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-200 shadow-lg shadow-primary/20">
          Резервирайте час
        </a>
        <!-- Mobile hamburger -->
        <button id="mobile-toggle" class="md:hidden flex flex-col gap-1.5 p-2 min-w-[44px] min-h-[44px] items-center justify-center" aria-label="Меню">
          <span class="block w-5 h-0.5 bg-primary transition-all" id="bar1"></span>
          <span class="block w-5 h-0.5 bg-primary transition-all" id="bar2"></span>
          <span class="block w-5 h-0.5 bg-primary transition-all" id="bar3"></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="md:hidden hidden bg-white/95 backdrop-blur-xl border-t border-outline-variant/10 shadow-xl">
      <div class="px-6 py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
        <a href="${prefix}uslugi.html" class="block px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-secondary/5 transition-colors">Услуги</a>
        <div class="pl-4 space-y-1">
          <a href="${prefix}uslugi/personalizirano-dalgoletie.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">genetics</span> Персонализирано дълголетие
          </a>
          <a href="${prefix}uslugi/bolnitsa-vkashti.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">home_health</span> Болница вкъщи
          </a>
          <a href="${prefix}uslugi/peptidna-terapia-nad.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">science</span> Пептиди и NAD+
          </a>
          <a href="${prefix}uslugi/hormonalna-optimizacia.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">balance</span> Хормонална оптимизация
          </a>
          <a href="${prefix}uslugi/telemedicina.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">monitor_heart</span> Телемедицина
          </a>
          <a href="${prefix}uslugi/lechenie-na-zavisimosti.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">psychology</span> Лечение на зависимости
          </a>
          <a href="${prefix}uslugi/vagusov-nerv-avns.html" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-secondary/5">
            <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings:'FILL' 1">bolt</span> Вагусова стимулация
          </a>
        </div>
        <div class="h-px bg-outline-variant/10 my-2"></div>
        <a href="${prefix}reshenia/zdrav-kiosk.html" class="block px-4 py-3 rounded-xl text-on-surface hover:bg-secondary/5 transition-colors text-sm">Мобилен здравен киоск</a>
        <a href="${prefix}reshenia/korporativno-zdrave.html" class="block px-4 py-3 rounded-xl text-on-surface hover:bg-secondary/5 transition-colors text-sm">Корпоративно здраве</a>
        <div class="h-px bg-outline-variant/10 my-2"></div>
        <a href="${prefix}kak-rabotim.html" class="block px-4 py-3 rounded-xl text-on-surface hover:bg-secondary/5 transition-colors text-sm">Как работя</a>
        <a href="${prefix}tseni.html" class="block px-4 py-3 rounded-xl text-on-surface hover:bg-secondary/5 transition-colors text-sm">Цени</a>
        <a href="${prefix}za-nas.html" class="block px-4 py-3 rounded-xl text-on-surface hover:bg-secondary/5 transition-colors text-sm">За мен</a>
        <div class="pt-2">
          <a href="${prefix}kontakt.html" class="block bg-primary text-on-primary px-6 py-3 rounded-xl font-headline font-semibold text-sm text-center">Резервирайте час</a>
        </div>
      </div>
    </div>
  </nav>`;

  // Find existing nav and replace it, or insert at top of body
  const existingNav = document.querySelector('nav');
  if (existingNav) {
    existingNav.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  // Mobile menu toggle
  const toggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const bars = toggle.querySelectorAll('span');
      if (!mobileMenu.classList.contains('hidden')) {
        bars[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });
  }
})();
