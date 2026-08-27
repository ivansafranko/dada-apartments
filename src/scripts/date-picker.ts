type Locale = 'hr' | 'en';

interface FlatpickrInstance {
  set: (key: string, value: unknown) => void;
  redraw: () => void;
}

const flatpickrBaseUrl = 'https://cdn.jsdelivr.net/npm/flatpickr';
let datePickerInitialization: Promise<void> | undefined;
let flatpickrLoader: Promise<void> | undefined;

declare global {
  interface Window {
    flatpickr?: ((element: HTMLInputElement, options: Record<string, unknown>) => FlatpickrInstance) & {
      l10ns?: { hr?: unknown };
    };
  }
}

const dateFormat = (locale: Locale) => (locale === 'hr' ? 'd.m.Y' : 'd/m/Y');

const loadStylesheet = (href: string) => new Promise<void>((resolve, reject) => {
  const existing = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);
  if (existing) return existing.sheet ? resolve() : existing.addEventListener('load', () => resolve(), { once: true });

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = href;
  stylesheet.addEventListener('load', () => resolve(), { once: true });
  stylesheet.addEventListener('error', () => reject(new Error('Could not load the date-picker stylesheet.')), { once: true });
  document.head.appendChild(stylesheet);
});

const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) return window.flatpickr ? resolve() : existing.addEventListener('load', () => resolve(), { once: true });

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.addEventListener('load', () => resolve(), { once: true });
  script.addEventListener('error', () => reject(new Error('Could not load the date-picker script.')), { once: true });
  document.head.appendChild(script);
});

const loadFlatpickr = () => {
  if (window.flatpickr) return Promise.resolve();
  flatpickrLoader ??= Promise.all([
    loadStylesheet(`${flatpickrBaseUrl}/dist/flatpickr.min.css`),
    loadScript(flatpickrBaseUrl),
  ]).then(() => loadScript(`${flatpickrBaseUrl}/dist/l10n/hr.js`));
  return flatpickrLoader;
};

async function configureDatePickers() {
  const inputs = [...document.querySelectorAll<HTMLInputElement>('input[type="date"]')];
  if (!inputs.length) return;

  await loadFlatpickr();
  if (!window.flatpickr) return;

  const locale = (): Locale => document.documentElement.lang === 'en' ? 'en' : 'hr';
  const configure = (instance: FlatpickrInstance, language: Locale) => {
    instance.set('locale', language === 'hr' ? window.flatpickr?.l10ns?.hr : 'default');
    instance.set('dateFormat', dateFormat(language));
    instance.set('altFormat', dateFormat(language));
    instance.redraw();
  };

  const instances = inputs.map((input) => {
    const language = locale();
    return window.flatpickr!(input, {
      altInput: true,
      allowInput: true,
      locale: language === 'hr' ? window.flatpickr?.l10ns?.hr : 'default',
      dateFormat: dateFormat(language),
      altFormat: dateFormat(language),
    });
  });

  window.addEventListener('apartmani-dada:language-change', ((event: CustomEvent<Locale>) => {
    instances.forEach((instance) => configure(instance, event.detail));
  }) as EventListener);
}

export function initDatePickers() {
  datePickerInitialization ??= configureDatePickers();
  return datePickerInitialization;
}
