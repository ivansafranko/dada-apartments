import { useEffect, useState } from "react";

declare global {
  interface Window {
    wbpSettings?: Record<string, string | number>;
  }
}

interface Props {
  hotelId: string;
  language: "hr" | "en";
  currency: string;
  loadLabel: string;
  fallbackBookingUrl: string;
  fallbackTitle: string;
  fallbackText: string;
  fallbackCta: string;
}

type Status = "loading" | "ready" | "error";

const WBP_ROOT_ID = "wbproot";
const WBP_ORIGIN = "https://booking.webbookingpro.com";

function parseEntrypoints(payload: unknown): string[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }
  const rawEntrypoints = (payload as { entrypoints?: unknown }).entrypoints;
  if (!Array.isArray(rawEntrypoints)) {
    return [];
  }
  return rawEntrypoints.filter((item): item is string => typeof item === "string");
}

function preferredFrameHeight(): number {
  if (typeof window === "undefined") {
    return 1500;
  }
  if (window.innerWidth < 640) {
    return 2200;
  }
  if (window.innerWidth < 1024) {
    return 1900;
  }
  return 1600;
}

function enforceInlineWidgetSizing(root: HTMLElement): boolean {
  const frame = root.querySelector("iframe");
  if (!frame) {
    return false;
  }
  const frameHeight = preferredFrameHeight();
  frame.setAttribute("scrolling", "no");
  frame.style.display = "block";
  frame.style.width = "100%";
  frame.style.maxWidth = "100%";
  frame.style.border = "0";
  frame.style.height = `${frameHeight}px`;
  frame.style.minHeight = `${frameHeight}px`;
  return true;
}

export default function BookingWidget({
  hotelId,
  language,
  currency,
  loadLabel,
  fallbackBookingUrl,
  fallbackTitle,
  fallbackText,
  fallbackCta
}: Props) {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let timeoutId: number | null = null;

    const resizeHandler = () => {
      const root = document.getElementById(WBP_ROOT_ID);
      if (root) {
        enforceInlineWidgetSizing(root);
      }
    };

    async function mountWidget() {
      try {
        setStatus("loading");

        window.wbpSettings = {
          hotelId,
          language,
          currency,
          showLogo: "0",
          showProperty: 0,
          showFooter: "0",
          darktheme: "0"
        };

        const response = await fetch(`${WBP_ORIGIN}/asset-manifest.json`);
        if (!response.ok) {
          throw new Error("Manifest request failed");
        }

        const data = await response.json();
        const entrypoints = parseEntrypoints(data);
        if (!entrypoints.length) {
          throw new Error("No entrypoints returned");
        }

        for (const file of entrypoints) {
          const normalized = file.replace(/^\/+/, "");
          const assetUrl = `${WBP_ORIGIN}/${normalized}`;

          // Booking engine ultimately renders inside its own iframe.
          // Skipping vendor global CSS avoids style bleed into our page.
          if (normalized.endsWith(".css")) continue;

          if (normalized.endsWith(".js")) {
            if (document.querySelector(`script[src="${assetUrl}"]`)) {
              continue;
            }

            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script");
              script.src = assetUrl;
              script.async = false;
              script.onload = () => resolve();
              script.onerror = () => reject(new Error(`Failed to load ${normalized}`));
              document.head.appendChild(script);
            });
          }
        }

        if (cancelled) {
          return;
        }

        const root = document.getElementById(WBP_ROOT_ID);
        if (!root) {
          throw new Error("Widget root was not found");
        }

        const checkMounted = (): boolean => {
          const frameMounted = !!root.querySelector("iframe");
          const widgetMounted = root.querySelector("[class*='mbsc-'], [class*='DatePicker'], [class*='wbp']") !== null;
          const mounted = frameMounted || widgetMounted;
          if (!mounted) {
            return false;
          }
          enforceInlineWidgetSizing(root);
          setStatus("ready");
          return true;
        };

        if (checkMounted()) {
          return;
        }

        observer = new MutationObserver(() => {
          if (cancelled) {
            return;
          }
          if (checkMounted() && observer) {
            observer.disconnect();
            observer = null;
          }
        });
        observer.observe(root, { childList: true, subtree: true });

        window.addEventListener("resize", resizeHandler, { passive: true });

        timeoutId = window.setTimeout(() => {
          if (cancelled) {
            return;
          }
          if (checkMounted()) {
            if (observer) {
              observer.disconnect();
              observer = null;
            }
            return;
          }
          setStatus("error");
        }, 15000);
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    mountWidget();

    return () => {
      cancelled = true;
      if (observer) {
        observer.disconnect();
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", resizeHandler);
    };
  }, [hotelId, language, currency]);

  return (
    <div className="booking-widget-host space-y-4">
      {status === "loading" && (
        <div className="rounded-xl border border-border bg-card px-4 py-3 animate-pulse">
          <p className="text-sm text-muted-foreground">{loadLabel}</p>
        </div>
      )}

      <div id={WBP_ROOT_ID} className="booking-widget-root notranslate min-h-[75vh]" />

      {status === "error" && (
        <div className="surface-card border-amber-300 bg-amber-50">
          <h2 className="text-lg font-semibold text-primary">{fallbackTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{fallbackText}</p>
          <a
            href={fallbackBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-4"
          >
            {fallbackCta}
          </a>
        </div>
      )}
    </div>
  );
}
