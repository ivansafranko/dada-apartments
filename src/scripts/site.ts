import { defaultLocale, translations, type Locale } from '../data/translations';

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

let currentLanguage: Locale = defaultLocale;

const getSavedLanguage = (): Locale => {
  try {
    return localStorage.getItem('preferredLanguage') === 'en' ? 'en' : defaultLocale;
  } catch {
    return defaultLocale;
  }
};

const scrollToTarget = (target: Element) => {
  const headerHeight = document.querySelector<HTMLElement>('.header')?.offsetHeight ?? 0;
  const top = window.scrollY + target.getBoundingClientRect().top - headerHeight;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
};

const refreshIcons = () => window.lucide?.createIcons();

function updateLanguage(locale: Locale) {
  currentLanguage = locale;
  const dictionary: Record<string, string> = translations[locale];

  document.querySelectorAll<HTMLElement>('[data-translate]').forEach((element) => {
    const value = dictionary[element.dataset.translate ?? ''];
    if (value) element.textContent = value;
  });
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-translate-placeholder]').forEach((element) => {
    const value = dictionary[element.dataset.translatePlaceholder ?? ''];
    if (value) element.placeholder = value;
  });

  document.documentElement.lang = locale;
  document.body.classList.toggle('english-locale', locale === 'en');
  document.body.classList.toggle('croatian-locale', locale === 'hr');
  document.querySelector('meta[data-translate="page-description"]')?.setAttribute('content', dictionary['page-description']);

  document.querySelectorAll<HTMLButtonElement>('.language-toggle').forEach((toggle) => {
    const isEnglish = locale === 'en';
    toggle.setAttribute('aria-pressed', String(isEnglish));
    toggle.setAttribute('aria-label', isEnglish ? 'Prebaci na hrvatski' : 'Switch to English');
    const label = toggle.querySelector('.lang-text');
    if (label) label.textContent = isEnglish ? 'EN' : 'HR';
  });

  try { localStorage.setItem('preferredLanguage', locale); } catch { /* Storage may be unavailable. */ }
  window.dispatchEvent(new CustomEvent('apartmani-dada:language-change', { detail: locale }));
  refreshIcons();
}

function initLanguage() {
  updateLanguage(getSavedLanguage());
  document.querySelectorAll<HTMLButtonElement>('.language-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => updateLanguage(currentLanguage === 'hr' ? 'en' : 'hr'));
  });
}

function initScrolling() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href') ?? '');
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
    });
  });
}

function initMobileMenu() {
  const button = document.querySelector<HTMLButtonElement>('#hamburgerMenu');
  const menu = document.querySelector<HTMLElement>('#mobileMenu');
  if (!button || !menu) return;

  const close = () => {
    button.classList.remove('active');
    menu.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation menu');
    menu.setAttribute('aria-hidden', 'true');
  };
  const toggle = () => {
    const opening = !menu.classList.contains('active');
    if (!opening) return close();
    button.classList.add('active');
    menu.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close navigation menu');
    menu.setAttribute('aria-hidden', 'false');
  };

  button.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('pointerdown', (event) => {
    if (!menu.contains(event.target as Node) && !button.contains(event.target as Node)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('active')) {
      close();
      button.focus();
    }
  });
}

function initHeaderAndBackToTop() {
  const header = document.querySelector('.header');
  const backToTop = document.querySelector<HTMLButtonElement>('#backToTop');
  const update = () => {
    const isScrolled = window.scrollY > 12;
    header?.classList.toggle('is-scrolled', isScrolled);
    backToTop?.classList.toggle('visible', window.scrollY > 300);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
}

function initGalleries() {
  document.querySelectorAll<HTMLElement>('.apartment-gallery').forEach((gallery) => {
    const images = [...gallery.querySelectorAll<HTMLElement>('.gallery-image')];
    const indicators = [...gallery.querySelectorAll<HTMLButtonElement>('.gallery-indicator')];
    const status = gallery.querySelector<HTMLElement>('.gallery-status');
    if (!images.length) return;
    let currentIndex = 0;
    let swipeStart: { x: number; y: number; pointerId: number } | undefined;
    const show = (index: number) => {
      currentIndex = (index + images.length) % images.length;
      images.forEach((image, imageIndex) => {
        const active = imageIndex === currentIndex;
        image.classList.toggle('active', active);
        image.setAttribute('aria-hidden', String(!active));
      });
      indicators.forEach((indicator, indicatorIndex) => {
        const active = indicatorIndex === currentIndex;
        indicator.classList.toggle('active', active);
        indicator.setAttribute('aria-pressed', String(active));
      });
      const name = gallery.dataset.galleryName ?? 'Apartment';
      gallery.setAttribute('aria-label', `${name} photo gallery, image ${currentIndex + 1} of ${images.length}`);
      if (status) status.textContent = `Image ${currentIndex + 1} of ${images.length}`;
    };
    gallery.querySelector('.gallery-prev')?.addEventListener('click', () => show(currentIndex - 1));
    gallery.querySelector('.gallery-next')?.addEventListener('click', () => show(currentIndex + 1));
    indicators.forEach((indicator, index) => indicator.addEventListener('click', () => show(index)));
    gallery.addEventListener('keydown', (event) => {
      // Buttons retain their native keyboard behaviour. Arrow-key navigation is
      // reserved for the carousel region itself, preventing a focused control
      // from unexpectedly changing the current image.
      if (event.target !== gallery) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(currentIndex - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); show(currentIndex + 1); }
      if (event.key === 'Home') { event.preventDefault(); show(0); }
      if (event.key === 'End') { event.preventDefault(); show(images.length - 1); }
    });
    gallery.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch' || (event.target as Element).closest('button')) return;
      swipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
      gallery.setPointerCapture?.(event.pointerId);
    });
    gallery.addEventListener('pointerup', (event) => {
      if (!swipeStart || event.pointerId !== swipeStart.pointerId) return;
      const horizontal = event.clientX - swipeStart.x;
      const vertical = event.clientY - swipeStart.y;
      swipeStart = undefined;
      if (Math.abs(horizontal) >= 40 && Math.abs(horizontal) > Math.abs(vertical)) show(currentIndex + (horizontal < 0 ? 1 : -1));
    });
    gallery.addEventListener('pointercancel', () => { swipeStart = undefined; });
    gallery.addEventListener('lostpointercapture', () => { swipeStart = undefined; });
    show(0);
  });
}

export function initSite() {
  initLanguage();
  initScrolling();
  initMobileMenu();
  initHeaderAndBackToTop();
  initGalleries();
  window.setTimeout(refreshIcons, 0);
}
