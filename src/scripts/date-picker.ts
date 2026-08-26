type Locale = 'hr' | 'en';

interface FlatpickrInstance {
  set: (key: string, value: unknown) => void;
  redraw: () => void;
}

declare global {
  interface Window {
    flatpickr?: ((element: HTMLInputElement, options: Record<string, unknown>) => FlatpickrInstance) & {
      l10ns?: { hr?: unknown };
    };
  }
}

const dateFormat = (locale: Locale) => (locale === 'hr' ? 'd.m.Y' : 'd/m/Y');

export function initDatePickers() {
  const inputs = [...document.querySelectorAll<HTMLInputElement>('input[type="date"]')];
  if (!inputs.length || !window.flatpickr) return;

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
