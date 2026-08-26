# Apartmani Dada — Astro Migration Execution Plan

LAST UPDATED AT: 2026-08-26 (Europe/Zagreb)

Status: Planning only. This document is complete enough to review before implementation. No application implementation is authorized by this plan alone.

## 1. Ticket Intake Checklist

- Ticket ID and title: Unassigned — migrate the existing Apartmani Dada website to Astro using the supplied Google Stitch design as the new visual direction, while retiring the obsolete `apartmani-krapinske-toplice` landing-page URL from search/deployment.
- User-visible behavior: Preserve the existing Croatian-first website, content, apartment listings, galleries, navigation, bilingual toggle, contact form, booking flow, maps, analytics, external links, and public URLs while replacing the static implementation with Astro and applying the Stitch visual system.
- Pages/routes involved: `/`, `/book-now`, `/book-now/`, `/book-now.html` compatibility, the obsolete indexed `apartmani-krapinske-toplice` URL and its variants, `/success` configuration review, and static asset routes.
- Components to create or modify: Base layout, shared header/navigation, language control, hero, feature highlights, location overview, apartment data/cards/galleries, maps, about, FAQ, testimonials, contact form, booking embed, and footer.
- Design reference: User-supplied Google Stitch HTML at `/Users/ivansafranko/.codex/attachments/d0991e19-fcf4-47b5-bf2d-57940b52ba8f/pasted-text.txt`.
- Content source: Existing static HTML in `index.html`, `book-now/index.html`, `book-now.html`, and translations in `script.js`; no CMS or API content source.
- SEO requirements: Preserve and improve existing canonical URLs, hreflang intent, metadata, Open Graph/Twitter tags, lodging JSON-LD, robots, sitemap, and heading hierarchy without inventing unapproved content.
- Responsive/accessibility requirements: Preserve mobile navigation and keyboard usability; support 320px, 375px, 768px, 1024px, and 1280px+; use semantic HTML, visible focus, meaningful labels/alt text, sufficient contrast, and touch targets of at least 44×44px.
- Performance constraints: One hero image plus 19 apartment WebP images; preserve LCP priority, reserve image/embed dimensions, avoid unnecessary client JavaScript, and do not add `astro-critters`, compression tools, Tailwind, React, or other dependencies without approval and justification.
- Deployment target: Netlify, currently publishing the repository root with `netlify.toml`; production Node version is configured as 18.

## 2. Summary & Scope

The repository is currently a dependency-free static site. The migration will introduce the minimum Astro project structure needed to generate the same public site, then restyle the rendered pages toward the Stitch reference. The first implementation checkpoint is route parity on a Netlify preview; visual migration and cleanup must not make the legacy site unrecoverable before that checkpoint passes.

In scope:

- Add Astro project configuration and scripts.
- Convert the homepage and booking page to Astro routes.
- Extract duplicated structure into shared Astro components.
- Move apartment metadata and translations into maintainable data modules.
- Use the existing local WebP images rather than the Stitch preview image URLs.
- Preserve the current external integrations and Netlify deployment behavior.
- Rebuild interactive behavior with small browser scripts or Astro client islands only when required.
- Preserve existing text and functionality first; treat Stitch copy/layout additions as a design layer, not permission to remove content.
- Retire the obsolete `apartmani-krapinske-toplice` landing-page URL so it cannot render or compete in search; return `410 Gone` for the exact URL and known variants, then use Google Search Console for recrawl/removal follow-up.

Out of scope unless separately approved:

- React, Vue, Svelte, Tailwind, a CMS, a server/API, a database, or a new booking provider.
- Replacing Netlify Forms, WebBookingPro, Google Analytics, Google Maps, Booking.com, or Facebook.
- Removing legacy files, changing public URLs, changing language URL strategy, or creating legal policy content.
- Adding new images from remote Stitch URLs.

## 3. Repository Context

| Area | Current convention/evidence | Migration decision |
|---|---|---|
| Framework | No framework or `package.json`; plain HTML/CSS/JS | Add Astro with the smallest supported project setup; pin versions in the new manifest and verify Node 18 compatibility. |
| Styling | One global `styles.css` (2,022 lines) plus `design-system.json` | Start from existing CSS behavior, then consolidate Stitch tokens into global CSS custom properties. Do not introduce Tailwind. |
| Islands | None | Prefer server-rendered `.astro` components. Use vanilla browser scripts or narrowly scoped Astro client behavior for galleries, menu, language toggle, form, FAQ, and booking bootstrap. No React. |
| Structure | Root HTML files, root `script.js`, root `styles.css`, static `images/` | Create `src/pages`, `src/layouts`, `src/components`, `src/data`, `src/scripts`, and either `public/` or imported assets after validating the chosen image strategy. |
| Build integrations | None; Netlify publishes `.` | Use Astro static output, set Netlify build command to `npm run build`, and publish Astro's generated directory only after preview validation. No critters/compression integration initially. |
| Fonts | Inter/Poppins from Google Fonts; Stitch references Playfair Display/Plus Jakarta Sans | Adopt Stitch fonts only after confirming the requested visual direction; retain `display=swap`, preconnect, and fallback stacks. |
| Images | Manual relative `<img>` tags; 20 local WebP images; homepage hero is currently a CSS background (`.hero-building`) | Preserve local images, add explicit dimensions/aspect ratios, convert the hero to a measurable image element or equivalently dimensioned background only after LCP testing, and use Astro image processing only if it does not add unnecessary deployment complexity. |
| i18n | Croatian and English text in `script.js`; `localStorage` key `preferredLanguage`; English uses `?lang=en` metadata intent | Preserve runtime toggle and current URL behavior unless the user approves route-based i18n. Make server-rendered default Croatian. |
| Forms | Netlify Forms, `data-netlify="true"`, POST via `fetch('/')`, inline success state | Preserve form name/fields/honeypot and Netlify-compatible markup; verify Netlify detects the form in Astro's generated output; keep inline loading, error, success, and retry states. |
| Analytics | Google Analytics tag `G-8QBRR4GF05` in homepage HTML | Preserve measurement ID and deferred loading; review consent requirements before altering behavior. |
| Deployment | Netlify; publish `.`; HTTPS and www redirects; Node 18 | Keep Netlify and redirects, update only the publish/build settings required by Astro. |
| CMS | None | None planned. |
| SEO | Manual metadata, JSON-LD, `robots.txt`, `sitemap.xml`, web manifest | Move shared metadata to the layout and keep route-specific values explicit; generate/update sitemap only if the chosen Astro setup warrants it. |
| Dev commands | No commands currently exist | Add `dev`, `build`, `preview`, and `check` scripts after Astro setup; document exact commands in README. Initially retain CDN Flatpickr behavior to preserve date-picker functionality; replace it only after an explicit test-backed decision. |

### Plan audit corrections

- Astro's `src/pages/book-now/index.astro` naturally produces a directory route. The implementation must explicitly configure and test trailing-slash behavior so `/book-now`, `/book-now/`, and the canonical URL remain compatible; do not rely on the current rewrite accidentally surviving a changed publish directory.
- Netlify must build from Astro output rather than publishing the repository root. The exact `command`, `publish` directory, redirect order, and generated `book-now` output must be tested together before any legacy file is retired.
- The current homepage hero is a CSS background in `styles.css`, not an HTML `<img>`. The implementation must preserve its appearance while making the LCP resource observable, dimensioned, and properly prioritized.
- Flatpickr is part of the current date-input behavior. Retaining it through the first parity milestone is the default; removing or replacing it is an explicit decision, not an incidental cleanup.
- Netlify Forms are discovered from deployed/generated HTML. The generated form must retain a stable `name`/`form-name`, `data-netlify`, honeypot metadata, field names, and a valid fallback submission path; this must be tested on a deploy preview, not only in local development.
- The legacy root files remain the recovery source until route, form, booking, SEO, and visual parity are accepted. “No deletion” includes avoiding accidental removal from the deploy artifact before approval.

## 4. Affected Pages, Components & Routes

| Type | Current/source | Planned Astro target | What changes |
|---|---|---|---|
| Homepage | `index.html` | `src/pages/index.astro` | Render the full single-page site with Stitch visual direction and existing content/anchors. |
| Booking page | `book-now/index.html`, `book-now.html` | `src/pages/book-now/index.astro` | One source of truth for the single public `/book-now` URL; preserve WebBookingPro bootstrap and booking metadata. |
| Booking aliases | `/book-now/`, `/book-now.html` | Explicit redirects to `/book-now` | Do not serve separate booking pages; verify status/location and canonical output. |
| Legacy file | `book-now.html` | Compatibility decision during implementation | Do not delete during planning or migration setup. Keep or redirect only after build output and Netlify behavior are verified. |
| Obsolete indexed landing page | Reported `apartmani-krapinske-toplice` URL; no matching local file found | No Astro page; explicit Netlify 410 status | Identify the exact deployed/indexed URL and variants, ensure none render, and return `410 Gone`. The real homepage remains the only landing page; use Google Search Console for recrawl/removal. |
| Missing route target | `netlify.toml` `/success` → `/success.html` | No success page planned | Retain the current inline form success state; remove/disable the broken success target only in an approved configuration change. |
| Legal placeholder routes | None currently | `src/pages/terms.astro`, `src/pages/privacy.astro`, `src/pages/cookies.astro` | Add clearly labelled placeholder pages so Stitch footer links have real destinations. |
| Shared layout | Duplicated `<head>`/body shell | `src/layouts/BaseLayout.astro` | Centralize document language, metadata, favicon, manifest, fonts, analytics, and page slot. |
| Header | Duplicated in both HTML pages | `src/components/Header.astro` | Preserve navigation destinations, mobile menu, language toggle, sticky behavior, and CTA. |
| Footer | Duplicated in both HTML pages | `src/components/Footer.astro` | Preserve brand, Facebook, copyright, and back-to-top behavior. |
| Static asset routes | `images/`, `icon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml` | `public/` or validated equivalent | Preserve URLs and metadata references. Do not rename assets without redirect/verification plan. |

Current homepage anchors that must remain valid: `#home`, `#apartments`, `#about`, and `#contact`.

External URLs that must remain functional include both Booking.com share links, two Google Maps embeds, Facebook, Google Analytics, Google Fonts, Lucide/Flatpickr only if retained, and WebBookingPro.

## 5. Component Architecture & Client Boundaries

### Static Astro components

- `src/layouts/BaseLayout.astro`
  - Props: `title`, `description`, `canonical`, `ogImage`, `lang`, optional `structuredData`.
  - Owns `<html>`, `<head>`, metadata, favicon, manifest, font links, and page `<slot />`.
- `src/components/Header.astro`
  - Props: optional active section and language labels.
  - Renders semantic `header`/`nav`, desktop links, mobile controls, and the booking/contact CTAs.
- `src/components/Hero.astro`
  - Renders Stitch split layout, local hero image, three feature highlights, and anchor CTA.
- `src/components/LocationOverview.astro`
  - Renders the new Stitch SEO-oriented bento content while retaining existing location information.
- `src/components/ApartmentSection.astro`
  - Props: location title, description, apartments, map configuration.
  - Renders each location heading, cards, highlights, and map.
- `src/components/ApartmentCard.astro`
  - Props interface should include `name`, `area`, `address`, `rating`, `amenities`, `images`, `bookingUrl`, and accessible image alt text.
- `src/components/ApartmentGallery.astro`
  - Server-renders all images and controls with stable dimensions and accessible button labels.
- `src/components/LocationMap.astro`
  - Props: embed URL and title; reserves a fixed aspect ratio and uses lazy loading below the fold.
- `src/components/AboutSection.astro`, `Testimonials.astro`, and `Footer.astro`
  - Static content and semantic structure, with no framework dependency.
- `src/components/ContactForm.astro`
  - Netlify-compatible form markup, labels, hidden form name, honeypot, status region, and no-JS-compatible submission intent.
- `src/pages/book-now/index.astro`
  - Uses the shared layout/header/footer and renders the WebBookingPro mount point.

### Client-side behavior

Use a small vanilla TypeScript/JavaScript module or scoped `<script>` modules. Hydration should be limited to the element that needs behavior; the page must remain useful before scripts run.

- `src/scripts/navigation.ts`: mobile menu, outside-click/escape close, focus handling, smooth section navigation, back-to-top.
- `src/scripts/language.ts`: preserve `preferredLanguage`, update translatable text and metadata, update `document.documentElement.lang`, and keep both desktop/mobile toggles synchronized.
- `src/scripts/gallery.ts`: previous/next/indicator controls, keyboard operation, image decode/loading state, and no layout shift.
- `src/scripts/contact-form.ts`: client validation, loading state, Netlify POST, inline success/error state, retry without losing entered values on failure.
- `src/scripts/faq.ts`: progressive enhancement for Stitch FAQ. Questions must not imply answers until approved copy exists.
- `src/scripts/booking.ts`: browser-only `localStorage` language read and WebBookingPro asset-manifest loading after the mount point exists. Preserve the current `hotelId: '33781'`, EUR currency, language selection, and remote entrypoint order.

No entire-page framework island is planned. Astro server rendering remains the default.

## 6. Styling & Responsive Design

The Stitch reference becomes the visual source of truth for the new implementation:

- Warm cream background and surface colors.
- Deep teal primary color and orange secondary accent.
- Playfair Display headings and Plus Jakarta Sans body/labels, subject to font-loading validation.
- Editorial split hero with prominent local photography.
- Sticky translucent header with desktop navigation and a responsive mobile menu.
- Feature highlights, SEO bento section, FAQ, larger rounded property cards, testimonials, and redesigned contact/footer sections.

Implementation constraints:

- Use CSS custom properties in `src/styles/global.css` for colors, type, spacing, radii, shadows, and container widths.
- Do not add Tailwind or a utility compiler; the supplied Stitch Tailwind CDN is a design reference and must not be shipped as a runtime dependency.
- Preserve existing anchor IDs and content while changing presentation.
- Keep controls at least 44×44px, including gallery controls, hamburger, language toggle, FAQ controls, and back-to-top.
- Use semantic buttons for actions and anchors for navigation.
- Verify 320px, 375px, 414px, 768px, 1024px, 1280px, and wide desktop layouts.
- Avoid CSS/HTML that requires JavaScript to display the core content.

## 7. Data & Content

Create `src/data/apartments.ts` as the single source of property data. Preserve the current four property records, addresses, ratings, Booking.com URLs, amenities, image order, and location map URLs.

Create `src/data/translations.ts` from the existing `translations` object in `script.js`. Preserve both Croatian and English values, including form labels, testimonials, metadata, amenity labels, and booking-page intro text. Any new Stitch-only text must be reviewed against the instruction to preserve existing content before replacing or adding it.

Use local image paths from `images/` (or their unchanged public URLs). Do not use the remote `lh3.googleusercontent.com` preview URLs from the Stitch HTML.

Approved content decisions for implementation:

- Use the FAQ answers provided in the current project when implementing the Stitch FAQ; do not invent or omit approved answers.
- Add placeholder legal pages for the Stitch legal links, with clear placeholder status and real routes rather than `href="#"` links.
- The Stitch design and current source contain slightly different wording and location labels. Current content wins unless the user approves editorial changes.

## 8. SEO & Meta Tags

Preserve these public SEO requirements:

- Homepage canonical: `https://apartments-dada.com/`.
- Booking canonical: `https://apartments-dada.com/book-now`.
- Croatian default language with existing English `?lang=en` intent unless route-based i18n is approved.
- Existing Open Graph/Twitter image URL, using the local hero asset in generated output.
- `robots.txt`, sitemap coverage for `/` and `/book-now`, favicon, manifest, and theme color.
- The obsolete `apartmani-krapinske-toplice` URL must not be generated, listed, canonically referenced, linked internally, or represented in structured data. Its exact deployed/indexed variant must return `410 Gone` and never render a page.
- One meaningful `h1` per page with logical `h2`/`h3` nesting. The current homepage uses a header logo `h1` and hero `h2`; implementation should resolve this to a correct hierarchy without changing visible content.
- Preserve both `LodgingBusiness` JSON-LD records, validating names, addresses, phone, email, ratings, amenities, and image URLs.
- Add FAQ JSON-LD only for the approved answers that are visible on the page.
- Add `rel="noopener noreferrer"` to all new/existing external links opened in a new tab.
- Keep metadata route-specific and avoid blindly applying homepage descriptions to the booking route.

Potential SEO ambiguities to resolve:

- No remaining decision: English remains the current query-parameter/localStorage behavior.
- No remaining decision: `/book-now` is the single public booking URL; `/book-now/` and `/book-now.html` must redirect to `/book-now`.
- No remaining decision: retain the current inline form success state; do not create `success.html`.
- No remaining decision: update the displayed copyright year to 2026.
- No remaining decision: adopt Stitch fonts, retain Flatpickr, and use Google Search Console for recrawl/removal follow-up.
- Implementation detail still required: identify every exact deployed/indexed `apartmani-krapinske-toplice` variant. The route must not render a page; use 410 Gone for the obsolete URL and known variants, then request recrawl/removal in Google Search Console.

## 9. Accessibility

- Use semantic `header`, `nav`, `main`, `section`, `form`, and `footer` landmarks.
- Keep navigation labels and visible focus indicators.
- Give the hamburger button `aria-expanded`, `aria-controls`, and a changing accessible label.
- Give language controls an accessible name and announce the active language.
- Make gallery controls keyboard accessible and expose current image state; indicators must not be non-semantic clickable spans.
- Use `<button>` plus `aria-expanded`/`aria-controls` for FAQ items if the section is approved.
- Associate every form input with a visible `<label>` and provide an `aria-live` status for loading/error/success.
- Preserve the honeypot without exposing it to normal keyboard users.
- Provide descriptive alt text for all property images; decorative imagery must use empty alt only when appropriate.
- Preserve map titles and lazy loading; provide nearby textual location/address information.
- Check Stitch colors against WCAG AA, especially orange text, muted teal/gray text, and translucent header states.
- Respect `prefers-reduced-motion` for smooth scrolling, hover transitions, and gallery fades.
- Test keyboard navigation, screen-reader landmarks, zoom to 200%, and narrow viewport overflow.

## 10. Performance & Core Web Vitals

- LCP candidate: the current `.hero-building` CSS background/photo. Prefer an `<img>` with `width`, `height`, `fetchpriority="high"`, and `decoding="async"`; if the Stitch composition requires a background, retain an explicit aspect ratio and preload the exact local image after measuring the result.
- Below-fold apartment images and maps should be lazy-loaded with reserved dimensions/aspect ratios.
- Avoid loading all third-party scripts on the booking page unless required by the widget.
- Defer analytics, icon, date-picker, and booking scripts where compatibility allows.
- Prefer inline SVG or CSS for simple icons where that avoids Lucide CDN cost; do not change visual/functionality without verification.
- Optimize existing large WebP files only if quality can be preserved and the process is reversible. Do not add compression tooling by default.
- Use font `display=swap`, preconnect only for domains actually used, and avoid four competing font families.
- Keep client JS limited to the interactions listed above; static apartment/SEO content must be emitted by Astro.
- Validate output with production build and Lighthouse. Initial target is 90+ where realistic, but preserving third-party integrations may limit individual scores.
- Do not add `astro-critters`, `@playform/compress`, Tailwind CDN, or other optimization packages unless a measured production problem demonstrates the need and the dependency is separately explained/approved.

## 11. Error Handling & UX States

- Contact form: preserve field values on failure, show inline error, disable/label the submit button while sending, restore retry state, and show an inline success state after Netlify accepts the request.
- Form no-JS fallback: maintain Netlify attributes and a valid POST action/encoding strategy so the form remains usable without the client script where Netlify supports it; verify Netlify form detection from the generated `dist` HTML.
- Booking widget: show a stable loading state in `#wbproot`; show a user-friendly fallback link/contact option if the asset manifest or third-party scripts fail.
- Gallery: show the first local image if enhancement fails; controls must not leave the card blank.
- Maps: keep textual addresses visible if an iframe is blocked.
- Fonts/icons/analytics failure: content and controls must remain usable without remote fonts or icon replacement.
- Add a custom `src/pages/404.astro` only if approved as part of the implementation scope; do not assume it replaces the configured `/success` behavior.

## 12. Plan of Work

### Phase 0 — Review gate

- Review this plan and resolve URL, language, FAQ, legal-link, success-route, copyright, font, and dependency decisions.
- Confirm that the work may proceed on `astro-migration`.

### Phase 1 — Astro foundation

- Add `package.json`, lockfile, Astro config, TypeScript config if needed, and scripts.
- Choose static output and establish the generated output directory.
- Preserve the existing root static files until the new build is proven; do not delete files.
- Update Netlify build/publish settings to the verified Astro output only after confirming local output and preserving a recovery copy of the current root-publish configuration. Replace the current `/book-now` rewrite-to-HTML behavior with one `/book-now` URL and explicit aliases redirecting to it.

### Phase 2 — Assets, data, and layout

- Add the shared layout and global CSS tokens.
- Add local static assets without changing public URLs; ensure `images/...`, `/icon.svg`, `/site.webmanifest`, `/robots.txt`, and `/sitemap.xml` are present in the generated artifact.
- Extract apartment records and translations.
- Add shared header/footer and route-aware navigation.

### Phase 3 — Homepage structure

- Build the Stitch hero, feature highlights, location overview, apartment sections, maps, about, testimonials, contact, and footer.
- Preserve all existing text, anchors, external URLs, structured data, and form field names.
- Add FAQ only once content is approved.

### Phase 4 — Client behavior and integrations

- Reimplement language toggle, mobile menu, galleries, smooth scrolling/back-to-top, form submission, date picker behavior if retained, and booking bootstrap.
- Keep scripts browser-only and scoped; test with JavaScript disabled where applicable.

### Phase 5 — SEO, compatibility, and visual validation

- Verify generated canonical/hreflang/meta/JSON-LD output.
- Verify `/`, `/book-now`, `/book-now/`, `/book-now.html`, and legacy compatibility behavior on a Netlify preview, including redirect status/location and canonical output.
- Verify every known `apartmani-krapinske-toplice` URL variant on a Netlify preview: it must never render a page and must return `410 Gone`; request Google Search Console recrawl/removal after deployment.
- Compare the implementation against the Stitch reference at mobile and desktop sizes.
- Confirm all existing assets, forms, analytics, maps, Booking.com links, WebBookingPro, robots, sitemap, and manifest behavior.

### Phase 6 — Cleanup only after approval

- Remove or redirect duplicate implementation files only after production output has been verified and the user approves cleanup.
- Update README with Astro commands and architecture.

## 13. Concrete Steps

Expected files to add or edit during implementation, subject to review:

```text
package.json
astro.config.mjs
tsconfig.json                    # only if TypeScript is adopted
src/layouts/BaseLayout.astro
src/pages/index.astro
src/pages/book-now/index.astro
src/components/Header.astro
src/components/Hero.astro
src/components/FeatureHighlights.astro
src/components/LocationOverview.astro
src/components/ApartmentSection.astro
src/components/ApartmentCard.astro
src/components/ApartmentGallery.astro
src/components/LocationMap.astro
src/components/AboutSection.astro
src/components/FaqAccordion.astro  # only if FAQ answers are approved
src/components/Testimonials.astro
src/components/ContactForm.astro
src/components/Footer.astro
src/data/apartments.ts
src/data/translations.ts
src/scripts/navigation.ts
src/scripts/language.ts
src/scripts/gallery.ts
src/scripts/contact-form.ts
src/scripts/booking.ts
src/styles/global.css
public/images/...                 # only if required by chosen asset strategy
public/icon.svg
public/site.webmanifest
public/robots.txt
public/sitemap.xml
```

Commands after the foundation exists:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

Do not run implementation commands that create or overwrite application files before the review gate is approved.

## 14. Testing & Acceptance

### Build and route acceptance

- [ ] `npm run dev` serves the homepage without console errors.
- [ ] `npm run build` succeeds on the configured Node 18 environment.
- [ ] `npm run preview` serves production output.
- [ ] `/`, `/book-now`, `/book-now/`, and any approved legacy URL behavior resolve correctly.
- [ ] `/book-now` slash behavior is explicitly documented and tested; no Netlify rewrite loops or duplicate booking documents remain in the deployed artifact unless intentionally preserved.
- [ ] The obsolete `apartmani-krapinske-toplice` URL and known variants are absent from generated output and return `410 Gone`.
- [ ] Netlify detects the contact form from generated output and receives a real preview submission.
- [ ] No existing files were deleted without explicit approval.

### Functional acceptance

- [ ] Header links reach the same sections/routes as before.
- [ ] Mobile menu opens, closes via control/outside click/Escape, and closes after navigation.
- [ ] Croatian is the default; language toggle updates content, metadata, date locale, and persists as before.
- [ ] All four apartment galleries work with previous/next/indicator controls.
- [ ] Booking.com links open the same property URLs.
- [ ] Both Google Maps embeds or approved fallbacks work.
- [ ] Contact form preserves exact field names, Netlify form name, honeypot, validation, loading, success, and error behavior.
- [ ] WebBookingPro mounts and uses hotel ID `33781`, EUR, and selected language.
- [ ] Google Analytics loads with the existing measurement ID if analytics is still approved.
- [ ] Facebook link, favicon, manifest, robots, and sitemap remain valid.

### Visual/responsive acceptance

- [ ] Stitch visual direction is recognizable: typography, palette, spacing, sticky header, split hero, bento content, card treatment, testimonials, contact, and footer.
- [ ] Existing content and functionality remain present.
- [ ] Tested at 320px, 375px, 414px, 768px, 1024px, 1280px, and wide desktop.
- [ ] No horizontal scrolling, overlap, broken images, or layout jumps.

### Accessibility acceptance

- [ ] Keyboard-only traversal has logical order and visible focus.
- [ ] Interactive controls have accessible names/states.
- [ ] Forms have labels and status announcements.
- [ ] Heading/landmark structure is valid.
- [ ] 200% zoom remains usable.
- [ ] Contrast and reduced-motion behavior are checked.

### SEO/performance acceptance

- [ ] Each page has correct unique title, description, canonical, Open Graph/Twitter metadata, and language attributes.
- [ ] JSON-LD validates and matches visible content.
- [ ] Sitemap and robots reference the final canonical URLs.
- [ ] Hero is prioritized; below-fold assets/maps are lazy and dimensioned.
- [ ] Production preview has no avoidable third-party or hydration errors.
- [ ] Lighthouse audit is run for mobile and desktop; record results and any third-party-caused exceptions.

## 15. Risks & Mitigations

- **No package/build baseline:** Establish a minimal Astro setup first and verify Node 18 before moving content.
- **Duplicate booking implementations:** Keep one Astro source and preserve legacy behavior until Netlify preview proves safe; test `/book-now`, `/book-now/`, and `/book-now.html` explicitly before any retirement.
- **WebBookingPro depends on browser globals and remote manifest:** isolate it to the booking route, preserve `#wbproot`, handle loading/failure, and test on production preview.
- **Netlify Forms can depend on generated/static form markup:** retain `data-netlify`, `netlify-honeypot`, hidden `form-name`, field names, and a no-JS-compatible fallback; verify form discovery and submission on a Netlify preview.
- **Language toggle is client-only today:** retain Croatian server-rendered content and progressively enhance; do not claim true localized SEO routes without an explicit decision.
- **Stitch reference uses temporary remote images and Tailwind CDN:** use local images and CSS tokens; do not ship preview URLs or CDN Tailwind.
- **Large image payload and CSS-background LCP:** preserve visual quality while measuring LCP; make the hero resource observable and dimensioned, then optimize only through a reversible, justified change.
- **Obsolete indexed landing page:** the repository has no matching local source, so the page may exist only in the deployed site, an old branch, a Netlify artifact, or Google's index. Identify the exact URL/source first, return 410 Gone for all known variants, remove all sitemap/internal/canonical signals, and request recrawling/removal in Google Search Console.
- **SEO regression from heading changes or URLs:** snapshot rendered metadata/links and compare against current canonical/hreflang/sitemap intent.
- **Accessibility regression from custom controls:** use semantic buttons, ARIA states, focus management, and keyboard tests for each interactive feature.
- **Third-party privacy/performance impact:** keep integrations unchanged for functionality, defer where safe, and flag consent/performance decisions for approval.
- **FAQ/legal content:** use the FAQ answers confirmed as existing in the current project and create only clearly labelled placeholder legal pages; do not invent substantive legal policy text.

## 16. Idempotence & Recovery

- Work occurs on `astro-migration`; preserve the current clean `main` branch as the rollback baseline.
- Before each migration phase, inspect `git status` and commit only logically complete, reviewable changes.
- Do not delete or overwrite legacy HTML/CSS/JS/assets until a verified Astro build and route comparison exists.
- Keep the old static site recoverable by retaining legacy files or moving them only through an approved, reversible Git change.
- If the Astro build fails, use the terminal error to correct the smallest affected change and rerun `npm run build`; do not bypass errors by removing routes or integrations.
- If generated output is wrong, remove only the generated output directory and rebuild; never remove source assets broadly.
- If deployment fails, revert Netlify build/publish configuration to the last known working setting and use the legacy static path until the preview is fixed.
- If WebBookingPro, Netlify Forms, or analytics fails after migration, compare generated HTML and script timing with the preserved originals before changing integration behavior.
- Recovery point: the pre-implementation commit on `astro-migration`, with `main` unchanged.

## 17. Progress

- [x] (2026-08-26 Europe/Zagreb) Repository inspected: static HTML/CSS/JS, 20 local WebP images, duplicated booking page, Netlify config, SEO, integrations, and current interactive behavior recorded.
- [x] (2026-08-26 Europe/Zagreb) Stitch reference inspected: new typography, palette, hero, bento content, FAQ, apartment cards, testimonials, contact, and footer direction recorded.
- [x] (2026-08-26 Europe/Zagreb) Plan drafted at `docs/plans/astro-migration-exec_plan.md`.
- [x] (2026-08-26 Europe/Zagreb) User decisions recorded: current language behavior, one `/book-now` URL, 410 retirement of obsolete landing page, inline success, existing FAQ answers, placeholder legal pages, Stitch fonts, Flatpickr, 2026 copyright, Google Search Console, and no unapproved dependencies.
- [x] (2026-08-26 Europe/Zagreb) Static baseline captured at `docs/astro-migration-baseline.md`, including route/configuration behavior, source inventory, integration details, content structure, and source checksums.
- [/] (2026-08-26 Europe/Zagreb) Obsolete URL identified and local 410 rules added with a dedicated non-homepage error body; Netlify production verification and Google Search Console recrawl/removal remain pending.
- [x] (2026-08-26 Europe/Zagreb) Astro foundation and configuration added: package scripts, static Astro config, strict TypeScript config, lockfile, and ignore rules; `npm run build` and `npm run check` pass.
- [/] (2026-08-26 Europe/Zagreb) Netlify build command/publish directory and redirect rules configured; local Astro output now contains `/` and `/book-now`, while live preview verification remains pending.
- [ ] Shared layout, data, components, and styling.
- [ ] Client behavior and third-party integration verification.
- [ ] Route, SEO, accessibility, performance, and production-preview acceptance.
- [ ] Cleanup or legacy-file retirement, only after explicit approval.

## 18. Decision Log / Surprises

- **Decision:** Use Astro static rendering with vanilla client behavior rather than React islands.
  **Rationale:** The repository has no framework and the user explicitly requested no React; only a small set of existing interactions need browser JavaScript.
  **Date:** 2026-08-26.

- **Decision:** Do not use Tailwind, `astro-critters`, compression packages, or other new optimization dependencies by default.
  **Rationale:** The Stitch HTML uses Tailwind CDN only as a design artifact, and the user requested that dependencies not be added without explanation/approval.
  **Date:** 2026-08-26.

- **Decision:** Preserve existing local images instead of Stitch preview URLs.
  **Rationale:** Local assets are part of the current site and remote generated URLs are not a stable content source.
  **Date:** 2026-08-26.

- **Observation:** There is no `package.json`, Astro config, lockfile, or test setup.
  **Evidence:** Repository root contains `index.html`, `styles.css`, `script.js`, static assets, and Netlify files only.
  **Date:** 2026-08-26.

- **Observation:** `book-now/index.html` and `book-now.html` are byte-for-byte-sized duplicate booking documents, while Netlify rewrites `/book-now` to `book-now.html`.
  **Evidence:** Both files are 152 lines/7,137 bytes; `netlify.toml` contains the rewrite.
  **Date:** 2026-08-26.

- **Observation:** `/success` points to a missing `success.html`.
  **Evidence:** `netlify.toml` contains the redirect but no `success.html` appears in the repository file inventory.
  **Date:** 2026-08-26.

- **Observation:** The current language system is runtime-based and not equivalent to route-based localized pages.
  **Evidence:** `script.js` uses `localStorage.getItem('preferredLanguage')`, toggles DOM translations, and changes metadata client-side.
  **Date:** 2026-08-26.

- **Decision:** Use the FAQ answers supplied by the current project and add placeholder legal pages for the Stitch legal links.
  **Rationale:** The user confirmed the FAQ content exists in the project and requested real placeholder destinations instead of dead `#` links.
  **Date:** 2026-08-26.

- **Observation:** No `apartmani-krapinske-toplice` route or source file exists in the current repository, despite the user reporting that Google sometimes opens it.
  **Evidence:** Repository file inventory and case-insensitive search found no matching route/file. Public search/live inspection found `https://apartments-dada.com/apartmani-krapinske-toplice`, a separate deployed landing page with its own SEO copy; local Netlify 410 rules now cover the exact and trailing-slash paths.
  **Decision:** Identify the exact indexed URL and known variants, return 410 Gone so the obsolete page does not exist, and request Google recrawl/removal through Search Console after deployment.
  **Date:** 2026-08-26.

- **Decision:** Keep the current language behavior, make `/book-now` the single booking URL, retain inline form success and Flatpickr, adopt Stitch fonts, update copyright to 2026, and use Google Search Console for search cleanup.
  **Rationale:** Confirmed by the user before implementation.
  **Date:** 2026-08-26.

- **Decision:** Add only Astro, `@astrojs/check`, and TypeScript for the foundation.
  **Rationale:** Astro is the required framework; the official checker and TypeScript support the planned typed Astro code without adding UI frameworks or optimization tools.
  **Date:** 2026-08-26.

- **Observation:** Foundation validation ran under Node v24.14.0, while the deployment target remains Node 18.
  **Evidence:** `npm run build` and `npm run check` pass with zero errors; `astro check` reports five hints from legacy `script.js`. npm reported three dependency-tree vulnerabilities, and no automatic audit fix was applied.
  **Follow-up:** Verify the same build under the Netlify Node 18 environment before deployment.
  **Date:** 2026-08-26.

- **Decision:** Netlify will run `npm run build` and publish `dist`; `/book-now` is canonical, its slash/HTML aliases permanently redirect to it, and the obsolete landing-page variants return 410.
  **Rationale:** Implements the approved one-booking-URL and obsolete-page retirement decisions while moving deployment from root static publishing to Astro output.
  **Date:** 2026-08-26.

## 19. Outcomes & Retrospective

Complete after implementation and review. Record:

- Actual files and routes changed.
- Dependency additions and the reason for each.
- Final Lighthouse/accessibility results and known third-party exceptions.
- Form, booking, analytics, maps, and URL verification results.
- Any approved deviations from preserved content/functionality.

## 20. Plan Revision Note

- 2026-08-26: Created from `docs/plans/astro-migration-plan.md`, adapted to the dependency-free Apartmani Dada repository and the supplied Google Stitch design reference. Explicitly overrode generic template defaults that would add React, Tailwind, critters, or compression tooling.
