const BOOKING_ORIGIN = 'https://booking.webbookingpro.com/';

declare global {
  interface Window {
    wbpSettings?: Record<string, string | number>;
  }
}

const preferredLanguage = () => {
  try { return localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'hr'; }
  catch { return 'hr'; }
};

export async function initBookingWidget() {
  const root = document.querySelector<HTMLElement>('#wbproot');
  const loading = document.querySelector<HTMLElement>('#booking-loading');
  const fallback = document.querySelector<HTMLElement>('#booking-fallback');
  if (!root || !loading || !fallback) return;

  const showFallback = () => {
    loading.hidden = true;
    fallback.hidden = false;
  };
  const markLoaded = () => {
    loading.hidden = true;
    fallback.hidden = true;
  };

  window.wbpSettings = {
    hotelId: '33781',
    language: preferredLanguage(),
    currency: 'EUR',
    showLogo: '0',
    showProperty: 0,
    showFooter: '0',
    darktheme: '0',
  };

  const observer = new MutationObserver(() => {
    if (root.childElementCount > 1 || [...root.children].some((child) => child.id !== 'booking-loading')) {
      markLoaded();
      observer.disconnect();
    }
  });
  observer.observe(root, { childList: true, subtree: true });

  const timeout = window.setTimeout(() => {
    observer.disconnect();
    if (!root.querySelector('iframe, form, [class*="booking"], [class*="wbp"]')) showFallback();
  }, 15000);

  try {
    const response = await fetch(`${BOOKING_ORIGIN}asset-manifest.json`);
    if (!response.ok) throw new Error(`Booking manifest request failed: ${response.status}`);
    const manifest = await response.json() as { entrypoints?: unknown };
    if (!Array.isArray(manifest.entrypoints)) throw new Error('Booking manifest does not contain entrypoints');

    for (const entrypoint of manifest.entrypoints) {
      if (typeof entrypoint !== 'string') continue;
      const source = new URL(entrypoint, BOOKING_ORIGIN);
      if (source.origin !== new URL(BOOKING_ORIGIN).origin) throw new Error('Booking manifest contains an untrusted entrypoint');
      if (entrypoint.endsWith('.css')) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = source.href;
        document.head.appendChild(stylesheet);
      } else if (entrypoint.endsWith('.js')) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = source.href;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Booking script failed: ${entrypoint}`));
          document.body.appendChild(script);
        });
      }
    }
  } catch {
    window.clearTimeout(timeout);
    observer.disconnect();
    showFallback();
  }
}
