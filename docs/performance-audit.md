# Performance audit — ASTRO-052

Date: 2026-08-26 (Europe/Zagreb)

## Local production-artifact checks

- Homepage hero is a local 4446 × 2945 WebP (588 KB), rendered as an `<img>` with explicit `width`/`height`, `loading="eager"`, and `fetchpriority="high"`.
- The same hero asset is preloaded from the document head, so it is discoverable before the body is parsed.
- All apartment-gallery images and both map iframes are lazy-loaded and include stable dimensions or an explicit aspect-ratio container.
- The generated homepage CSS is 28 KB and its shared client module is 14.18 KB (4.89 KB gzip).
- The unused Flag Icons CDN stylesheet was removed. Google Fonts and Flatpickr CSS now load non-blockingly, with `<noscript>` fallbacks.

## Lighthouse measurement

No local Chrome/Chromium or Lighthouse installation is available in this workspace. A temporary Playwright Chromium download was attempted but its runner requires Playwright to be installed as a project dependency; adding that dependency is outside the approved migration scope. Therefore no synthetic Lighthouse score is recorded locally.

## Third-party exceptions for deploy-preview measurement

- Google Analytics (`googletagmanager.com`) remains async to preserve the approved measurement ID.
- Google Fonts, Flatpickr, Lucide, Google Maps, and WebBookingPro are retained approved integrations. Maps and booking are deferred/lazy or route-specific where possible.

Run mobile and desktop Lighthouse against the Netlify deploy preview during ASTRO-053, recording the scores and these third-party requests as expected exceptions.
