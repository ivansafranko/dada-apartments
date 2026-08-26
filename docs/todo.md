# Apartmani Dada — Astro Migration TODO

Branch: `astro-migration`  
Source plan: [`astro-migration-exec_plan.md`](./astro-migration-exec_plan.md)  
Status: Backlog only. Do not begin implementation until the review-gate tickets are approved.

## Working rules

- Preserve content, public URLs, forms, analytics, maps, Booking.com links, WebBookingPro, local images, and existing bilingual behavior unless explicitly approved otherwise.
- The obsolete `apartmani-krapinske-toplice` landing-page URL must not remain as a competing landing page in the deployed Astro output or search signals; the real homepage at `/` is the sole landing page.
- Do not delete legacy files during migration. Keep the current static site recoverable until route and integration parity is accepted.
- Do not add React, Tailwind, `astro-critters`, compression tools, a CMS, or unrelated dependencies. Any dependency addition requires a written reason and approval.
- Keep one implementation path in the final deployed Astro site; legacy files are a temporary recovery source, not a parallel production application.
- Mark tickets complete only after their acceptance criteria and the relevant plan checks pass.

## Milestone 0 — Review gate and baseline

### ASTRO-001 — Approve migration decisions

Status: `[x]`  Priority: P0  Depends on: —

Resolve before implementation:

- Croatian/English URL strategy: approved — preserve `?lang=en` plus `localStorage`.
- Booking URL: approved — `/book-now` is the one public URL; redirect `/book-now/` and `/book-now.html` to `/book-now`.
- Success handling: approved — retain the current inline success state; do not create `success.html`.
- FAQ: approved — use the answers provided in the current project.
- Legal links: approved — add placeholder legal pages with real routes.
- Fonts: approved — adopt Playfair Display and Plus Jakarta Sans from Stitch.
- Flatpickr: approved — retain it.
- Copyright: approved — update the displayed year to 2026.
- Obsolete landing page: approved — it must not render; use 410 Gone for the exact `apartmani-krapinske-toplice` URL and known variants.
- Search cleanup: approved — use Google Search Console for URL inspection, recrawl, and removal follow-up.

Acceptance:

- [x] Decisions are recorded in the execution plan’s Decision Log.
- [x] No implementation ticket is started while a P0 decision blocks it.

### ASTRO-003 — Identify and retire the obsolete landing-page URL

Status: `[/]`  Priority: P0  Depends on: ASTRO-001, ASTRO-002

Investigate the reported `apartmani-krapinske-toplice` page across the current deployment, Netlify redirects/artifacts, all branches available to the project, sitemap/internal links, and Google Search Console. Live inspection confirmed `https://apartments-dada.com/apartmani-krapinske-toplice`; the current repository contains no matching source file.

Implement the approved retirement behavior during the route/configuration phase: remove the obsolete page from Astro output, prevent it from being generated or discoverable, and return `410 Gone` for the exact obsolete URL and known variants. Do not redirect it or render an alternate landing page.

Acceptance:

- [x] Exact live URL `https://apartments-dada.com/apartmani-krapinske-toplice` identified; exact and trailing-slash variants are recorded in the execution plan.
- [x] No Astro page, static artifact, sitemap entry, canonical, hreflang, internal link, or structured-data URL points to the obsolete landing page.
- [ ] The obsolete URL returns `410 Gone` and never renders a landing page (Netlify preview verification pending).
- [x] The real homepage at `/` is the only landing page in the generated site; the obsolete URL has no 3xx redirect destination.
- [x] The 410 rule does not shadow `/`, `/book-now`, or approved static assets.
- [ ] Google Search Console URL inspection/recrawl or removal request is submitted when access is available, and the request/date is recorded.
- [ ] The expected delay for Google’s index refresh is communicated; deployment cannot guarantee immediate disappearance from search results.

### ASTRO-002 — Capture the static baseline

Status: `[x]`  Priority: P0  Depends on: —

Record the current rendered route behavior, metadata, links, form fields, integration URLs, image paths, and important screenshots before changing the application.

Acceptance:

- [x] Baseline captured for `/` and booking page.
- [x] Existing `index.html`, `book-now/index.html`, `book-now.html`, `styles.css`, `script.js`, and `netlify.toml` are referenced.
- [x] Baseline is committed or otherwise recoverable on `astro-migration`.

## Milestone 1 — Astro foundation

### ASTRO-010 — Create minimal Astro project foundation

Status: `[x]`  Priority: P0  Depends on: ASTRO-001, ASTRO-002

Add `package.json`, Astro configuration, scripts, and optional TypeScript configuration. Use static output and verify Node 18 compatibility. Do not add UI frameworks or optimization integrations.

Acceptance:

- [x] `npm run dev`, `npm run build`, `npm run preview`, and `npm run check` are defined and documented.
- [x] Astro build succeeds without application content migration yet.
- [x] No unapproved dependencies are present; only Astro, `@astrojs/check`, and TypeScript were added.

### ASTRO-011 — Define Netlify build and route strategy

Status: `[/]`  Priority: P0  Depends on: ASTRO-003, ASTRO-010

Set the verified Astro build command and publish directory. Decide explicit handling for `/book-now`, `/book-now/`, `/book-now.html`, `/success`, the obsolete `apartmani-krapinske-toplice` URL, HTTP→HTTPS, and www→non-www redirects.

Acceptance:

- [x] Local generated output contains the intended page paths (`/` and `/book-now`).
- [ ] Netlify preview does not create rewrite loops or silently select the old root files.
- [x] Existing redirect behavior is preserved or each approved change is documented.
- [x] Obsolete landing-page 410 status is included in the Netlify configuration.
- [x] Netlify build command is `npm run build` and publish directory is `dist`.
- [x] `/book-now/` and `/book-now.html` redirect to the single `/book-now` URL in configuration.

## Milestone 2 — Assets, data, and shared shell

### ASTRO-020 — Migrate static assets without URL regressions

Status: `[x]`  Priority: P0  Depends on: ASTRO-010

Place the 20 local WebP images, `icon.svg`, manifest, robots, and sitemap in the Astro asset/public strategy while preserving their public URLs.

Acceptance:

- [x] All current image URLs resolve in the production artifact.
- [x] Favicon, manifest, robots, and sitemap resolve.
- [x] No Stitch preview image URL is shipped.
- [x] No asset is deleted from the repository.
- [x] No obsolete landing-page HTML artifact is emitted.

### ASTRO-021 — Extract apartment and translation data

Status: `[x]`  Priority: P0  Depends on: ASTRO-010

Create typed apartment/location data and Croatian/English translations from the current HTML and `script.js`.

Acceptance:

- [x] All four properties retain names, sizes, addresses, ratings, amenities, image order, and Booking.com URLs.
- [x] Both language dictionaries include current page text, form text, testimonials, metadata, and booking intro.
- [x] No content is silently removed or rewritten.

### ASTRO-022 — Build shared BaseLayout, Header, and Footer

Status: `[x]`  Priority: P0  Depends on: ASTRO-010, ASTRO-021

Create shared layout and shell components with route-aware links, metadata props, sticky navigation, mobile menu controls, language controls, footer links, and back-to-top control.

Acceptance:

- [x] Header/footer are no longer duplicated in Astro source.
- [x] Existing anchors `#home`, `#apartments`, `#about`, and `#contact` remain valid.
- [x] Desktop and mobile controls have accessible names/states.

## Milestone 3 — Stitch visual migration

### ASTRO-030 — Establish Stitch design tokens and global styles

Status: `[x]`  Priority: P1  Depends on: ASTRO-022

Create CSS custom properties for the Stitch palette, typography, spacing, radii, shadows, and container sizes. Do not add Tailwind or its CDN script.

Acceptance:

- [x] Stitch teal/cream/orange visual direction is represented through reusable tokens.
- [x] Font loading uses appropriate preconnect/fallback/`display=swap` behavior.
- [x] Existing responsive behavior is not regressed at 320px and 768px.

### ASTRO-031 — Implement homepage static sections

Status: `[x]`  Priority: P1  Depends on: ASTRO-020, ASTRO-021, ASTRO-022, ASTRO-030

Build the Astro homepage sections: Stitch hero, feature highlights, SEO/location bento, apartment sections, maps, about, testimonials, contact, and footer while preserving existing content and anchors.

Acceptance:

- [x] One valid page-level `h1` and logical heading hierarchy exist.
- [x] All existing visible content and external destinations remain available.
- [x] Stitch reference layout is represented without remote generated images or placeholder links.

### ASTRO-032 — Implement apartment cards and galleries

Status: `[x]`  Priority: P1  Depends on: ASTRO-020, ASTRO-021, ASTRO-031

Create data-driven apartment cards, location groups, local image galleries, ratings, amenities, Booking.com links, and map blocks.

Acceptance:

- [x] Four cards render from shared data.
- [x] Gallery controls work with keyboard and pointer input.
- [x] Images have descriptive alt text and stable dimensions/aspect ratios.
- [x] Maps retain titles, addresses, URLs, and lazy loading.

### ASTRO-032A — Align remaining homepage sections to the approved Stitch design

Status: `[/]`  Priority: P1  Depends on: ASTRO-032

Bring the remaining homepage sections into direct visual and interaction parity with the supplied Stitch reference. Keep the approved header/navigation, feature highlights, “Mali grad. Veliki predah.” location bento, and “Otkrijte Krapinske Toplice” section unchanged. Focus only on the sections below.

- Rework **Moderni apartmani** into the Stitch two-column card layout: image gallery at the top, compact circular gallery controls, title/address and rating/Booking.com action row, amenity chips, and correct responsive stacking. Repair gallery keyboard and pointer behavior so each card changes only its own images.
- Rework **Iskustva gostiju** into the Stitch three-card, centered testimonial treatment with dark-teal initial avatars, centered names, italic feedback, surface cards, and responsive single-column layout.
- Rework **Kontaktirajte nas** into the Stitch paired-panel layout: surface-container form panel with outlined fields and orange full-width submit action; separate contact-detail panel with icon circles, labels, and clear phone/email/location values.
- Rebuild the **footer** as the Stitch dark-teal, three-part footer with brand copy, real legal-route links, and a separated copyright line. It must remain readable and unbroken at narrow widths.

Acceptance:

- [x] Header/navigation, feature highlights, “Mali grad. Veliki predah.” bento, and “Otkrijte Krapinske Toplice” remain visually unchanged by this ticket.
- [ ] All four apartment cards match the approved Stitch hierarchy, use local images, retain Booking.com destinations, and remain usable at 320px through desktop widths.
- [ ] Every gallery previous/next/indicator control works with pointer and keyboard input without affecting another card; controls expose correct accessible labels/state.
- [ ] Testimonials match the centered Stitch card treatment and preserve all guest names and text.
- [x] Contact form and contact details match the paired Stitch panel composition while preserving all fields, labels, Netlify form attributes, and no-JavaScript submission behavior.
- [x] Footer contains working `/terms`, `/privacy`, and `/cookies` destinations once ASTRO-033 is complete; until then, no placeholder `#` links are introduced.
- [ ] Desktop and mobile screenshots are compared against the supplied Stitch reference, with no overflow, broken footer layout, or missing content.

### ASTRO-033 — Decide and implement approved FAQ/legal content

Status: `[x]`  Priority: P1  Depends on: ASTRO-001, ASTRO-031

Add FAQ interaction using the answers approved in the current project. Create placeholder legal pages at `/terms`, `/privacy`, and `/cookies`, and map Stitch legal links to those real routes.

Acceptance:

- [x] No empty or invented FAQ answers are published.
- [x] FAQ controls expose expanded/collapsed state if implemented.
- [x] `/terms`, `/privacy`, and `/cookies` exist as clearly labelled placeholder pages.
- [x] Every shipped link has a real destination.

## Milestone 4 — Functionality and integrations

### ASTRO-040 — Port mobile navigation, language, scrolling, and back-to-top

Status: `[x]`  Priority: P0  Depends on: ASTRO-022, ASTRO-031

Port existing `script.js` behavior into scoped browser modules. Preserve Croatian default, English toggle, `preferredLanguage`, metadata updates, smooth scrolling, mobile menu, and back-to-top.

Acceptance:

- [x] Works on homepage and booking page where shared controls exist.
- [x] Escape/outside click/navigation close the mobile menu.
- [x] Language preference persists and both toggles stay synchronized.
- [x] Core content remains readable with JavaScript disabled.

### ASTRO-041 — Preserve date inputs and Flatpickr behavior

Status: `[x]`  Priority: P1  Depends on: ASTRO-040

Retain Flatpickr initially through the existing CDN or an approved package strategy. Preserve Croatian/English locale changes and date-input accessibility.

Acceptance:

- [x] Check-in/check-out controls render and localize correctly.
- [x] Required validation remains present.
- [x] No date-picker script runs on routes without date fields.

### ASTRO-042 — Port contact form and Netlify Forms integration

Status: `[/]`  Priority: P0  Depends on: ASTRO-031, ASTRO-040, ASTRO-011

Implement validation, loading, inline success/error/retry states, exact field names, hidden form name, honeypot, and Netlify-compatible fallback submission.

Acceptance:

- [ ] Netlify detects the form from generated/deployed HTML.
- [ ] Valid preview submission arrives in Netlify Forms.
- [x] Failed submission preserves entered values and provides retry.
- [x] Success state remains usable and accessible.

### ASTRO-043 — Port WebBookingPro booking page

Status: `[/]`  Priority: P0  Depends on: ASTRO-020, ASTRO-022, ASTRO-011

Build `/book-now` using the shared shell and preserve `#wbproot`, hotel ID `33781`, EUR, selected language, asset-manifest loading, remote entrypoint order, and fallback messaging.

Acceptance:

- [ ] `/book-now` and `/book-now/` resolve according to the approved URL strategy.
- [ ] Widget loads in production preview.
- [x] Failure of the remote manifest shows a usable booking/contact fallback.
- [x] No booking page duplicate is accidentally served from the old root publish path.

### ASTRO-044 — Preserve analytics and external integrations

Status: `[x]`  Priority: P1  Depends on: ASTRO-022, ASTRO-031

Preserve Google Analytics `G-8QBRR4GF05`, both Google Maps embeds, Booking.com links, Facebook, fonts, and any retained Lucide/Flatpickr resources. Review consent requirements without changing scope implicitly.

Acceptance:

- [x] Existing integration URLs and identifiers match the baseline.
- [x] Third-party scripts are deferred where safe and do not block core content.
- [x] No secrets are introduced into client code.

## Milestone 5 — Quality gates

### ASTRO-050 — Accessibility and responsive verification

Status: `[x]`  Priority: P0  Depends on: ASTRO-031, ASTRO-032, ASTRO-033, ASTRO-040, ASTRO-042

Test keyboard/focus behavior, headings/landmarks, labels/statuses, contrast, reduced motion, zoom, touch targets, and narrow/wide layouts.

Acceptance:

- [x] 320px, 375px, 414px, 768px, 1024px, and 1280px+ pass without overflow or overlap.
- [x] Keyboard-only and 200% zoom checks pass.
- [x] No critical axe/accessibility findings remain.

### ASTRO-051 — SEO and metadata verification

Status: `[ ]`  Priority: P0  Depends on: ASTRO-022, ASTRO-031, ASTRO-033, ASTRO-011

Verify titles, descriptions, canonical URLs, hreflang behavior, Open Graph/Twitter tags, JSON-LD, sitemap, robots, manifest, and the corrected heading hierarchy.

Acceptance:

- [ ] Homepage and booking metadata are unique and correct.
- [ ] Lodging JSON-LD matches visible data and validates.
- [ ] No placeholder `#` links or Stitch preview URLs remain.
- [ ] The obsolete landing-page URL is absent from sitemap, internal links, canonical/hreflang values, generated output, and structured data.
- [ ] Approved URL strategy is reflected consistently in canonical, hreflang, sitemap, and redirects.

### ASTRO-052 — Performance and LCP verification

Status: `[ ]`  Priority: P1  Depends on: ASTRO-020, ASTRO-031, ASTRO-032, ASTRO-044

Measure hero LCP, image loading, layout stability, font behavior, third-party scripts, and client JS. Make the current CSS-background hero observable/dimensioned or replace it with an equivalent local image element.

Acceptance:

- [ ] Hero is not lazy-loaded and is prioritized appropriately.
- [ ] Below-fold images/maps are lazy and dimensioned.
- [ ] No avoidable render-blocking CDN resources remain.
- [ ] Lighthouse mobile/desktop results and third-party exceptions are recorded.

### ASTRO-053 — Production preview and deployment verification

Status: `[ ]`  Priority: P0  Depends on: ASTRO-011, ASTRO-041, ASTRO-042, ASTRO-043, ASTRO-044, ASTRO-050, ASTRO-051, ASTRO-052

Run production build/preview and a Netlify deploy preview. Compare route behavior and critical functionality with the baseline.

Acceptance:

- [ ] Build, preview, and deploy preview succeed.
- [ ] No console errors occur on `/` or booking routes.
- [ ] Forms, booking widget, maps, analytics, links, galleries, and language switching work in preview.
- [ ] Opening the obsolete Google-indexed URL reaches the real homepage through the approved response and never renders a competing landing page.
- [ ] The legacy root-publish fallback remains recoverable until explicit cleanup approval.

## Milestone 6 — Approved cleanup and documentation

### ASTRO-060 — Retire duplicate legacy files only after approval

Status: `[ ]`  Priority: P2  Depends on: ASTRO-053 and explicit user approval

Remove or redirect `book-now.html`, duplicate static booking source, old root scripts/styles, or other files only after route parity and production-preview acceptance.

Acceptance:

- [ ] Every removed public URL has an intentional replacement/redirect.
- [ ] No required asset, form, integration, or SEO file is removed.
- [ ] Recovery instructions remain accurate.

### ASTRO-061 — Update project documentation

Status: `[ ]`  Priority: P2  Depends on: ASTRO-053

Update README with Astro setup, commands, routes, architecture, asset/content ownership, and deployment instructions. Update the execution plan Progress, Decision Log, Outcomes, and Retrospective.

Acceptance:

- [ ] A new contributor can install, run, build, preview, and deploy the project.
- [ ] Plan and TODO statuses match the actual implementation.

## Suggested execution order

`ASTRO-001 → ASTRO-002 → ASTRO-003 → ASTRO-010 → ASTRO-011 → ASTRO-020/021 → ASTRO-022 → ASTRO-030 → ASTRO-031/032 → ASTRO-032A → ASTRO-040/041/042/043/044 → ASTRO-033 → ASTRO-050/051/052 → ASTRO-053 → ASTRO-060/061`

Parallel work is safe only within a milestone when ticket dependencies are satisfied and changes do not overlap the same files without coordination.
