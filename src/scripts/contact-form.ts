const message = (kind: 'sending' | 'error', locale: string) => {
  const english = locale === 'en';
  return {
    sending: english ? 'Sending your message…' : 'Šaljemo vašu poruku…',
    error: english ? 'We could not send your message. Please check your connection and try again.' : 'Nismo mogli poslati vašu poruku. Provjerite vezu i pokušajte ponovno.',
  }[kind];
};

const submitLabel = (locale: string) => locale === 'en' ? 'Send Message' : 'Pošaljite poruku';

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('.contact-form');
  const submit = form?.querySelector<HTMLButtonElement>('.contact-submit');
  const status = document.querySelector<HTMLElement>('#form-status');
  const success = document.querySelector<HTMLElement>('#form-success-message');
  const error = document.querySelector<HTMLElement>('#form-error');
  const retry = document.querySelector<HTMLButtonElement>('#form-retry');
  if (!form || !submit || !status || !success || !error || !retry) return;

  const locale = () => document.documentElement.lang;
  const show = (element: HTMLElement, text?: string) => {
    if (text) element.textContent = text;
    element.hidden = false;
  };
  const hide = (element: HTMLElement) => { element.hidden = true; };
  const resetSubmissionState = () => {
    submit.disabled = false;
    submit.textContent = submitLabel(locale());
    form.setAttribute('aria-busy', 'false');
    hide(status);
  };
  const showError = () => {
    resetSubmissionState();
    show(error, message('error', locale()));
    retry.textContent = locale() === 'en' ? 'Try again' : 'Pokušajte ponovno';
    retry.hidden = false;
    error.focus();
  };

  retry.addEventListener('click', () => {
    hide(error);
    retry.hidden = true;
    form.requestSubmit();
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hide(error);
    retry.hidden = true;
    hide(success);
    if (!form.reportValidity()) return;

    submit.disabled = true;
    submit.textContent = message('sending', locale());
    form.setAttribute('aria-busy', 'true');
    show(status, message('sending', locale()));

    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, value.toString()));
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      form.hidden = true;
      form.setAttribute('aria-busy', 'false');
      hide(status);
      show(success);
      success.focus();
      form.reset();
    } catch {
      // Keep entered values in place so retrying never loses the guest's message.
      showError();
    }
  });
}
