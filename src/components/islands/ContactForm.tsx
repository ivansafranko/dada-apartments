import { useMemo, useState } from "react";
import type { FormEventHandler } from "react";

interface Props {
  actionUrl: string;
  labels: {
    name: string;
    email: string;
    checkin: string;
    checkout: string;
    message: string;
    submit: string;
    loading: string;
  };
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  validation: {
    required: string;
    submitError: string;
    successTitle: string;
    successText: string;
  };
}

type FormValues = {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  message: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  checkin: "",
  checkout: "",
  message: ""
};

export default function ContactForm({ actionUrl, labels, placeholders, validation }: Props) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const requiredMissing = useMemo(() => {
    return (
      !values.name.trim() ||
      !values.email.trim() ||
      !values.checkin.trim() ||
      !values.checkout.trim() ||
      !values.message.trim()
    );
  }, [values]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (requiredMissing) {
      setError(validation.required);
      return;
    }

    setLoading(true);

    const payload = new URLSearchParams();
    payload.set("form-name", "contact");
    payload.set("name", values.name);
    payload.set("email", values.email);
    payload.set("checkin", values.checkin);
    payload.set("checkout", values.checkout);
    payload.set("message", values.message);
    payload.set("bot-field", "");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload.toString()
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      setSuccess(true);
      setValues(INITIAL_VALUES);
    } catch (submitError) {
      setError(validation.submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface-card">
      <form
        name="contact"
        method="POST"
        action={actionUrl}
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-primary">
            <span>{labels.name}</span>
            <input
              type="text"
              name="name"
              required
              value={values.name}
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              placeholder={placeholders.name}
              className="min-h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none ring-primary transition focus:ring-2"
            />
          </label>

          <label className="space-y-2 text-sm text-primary">
            <span>{labels.email}</span>
            <input
              type="email"
              name="email"
              required
              value={values.email}
              onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
              placeholder={placeholders.email}
              className="min-h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none ring-primary transition focus:ring-2"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-primary">
            <span>{labels.checkin}</span>
            <input
              type="date"
              name="checkin"
              required
              value={values.checkin}
              onChange={(event) => setValues((prev) => ({ ...prev, checkin: event.target.value }))}
              className="min-h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none ring-primary transition focus:ring-2"
            />
          </label>

          <label className="space-y-2 text-sm text-primary">
            <span>{labels.checkout}</span>
            <input
              type="date"
              name="checkout"
              required
              value={values.checkout}
              onChange={(event) => setValues((prev) => ({ ...prev, checkout: event.target.value }))}
              className="min-h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none ring-primary transition focus:ring-2"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-primary">
          <span>{labels.message}</span>
          <textarea
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
            placeholder={placeholders.message}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none ring-primary transition focus:ring-2"
          />
        </label>

        {error && (
          <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {success && (
          <div className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800" role="status">
            <p className="font-semibold">{validation.successTitle}</p>
            <p>{validation.successText}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary min-h-11 w-full disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? labels.loading : labels.submit}
        </button>
      </form>
    </div>
  );
}
