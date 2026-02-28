# Dada Apartments Astro Migration - Implementation Exec Plan
LAST UPDATED AT: 2026-02-28 09:12:00 UTC

## 1. Ticket Intake Checklist
- Ticket ID and title: Astro migration for Dada Apartments website (single cutover)
- User-visible behavior: Same routes, same content intent, improved performance/accessibility/SEO reliability
- Pages/routes involved: `/`, `/en/`, `/book-now`, `/en/book-now`, `/apartmani-krapinske-toplice`, `/en/apartmani-krapinske-toplice`
- Components to create or modify: Base layout, SEO head, header/footer, page sections, React islands (gallery/contact/booking)
- Design reference: Existing production website visual language and `design-system.json`
- Content source: Local typed data files (`src/data/*`), no CMS in this phase
- SEO requirements: Unique title/description/OG per page, canonical + hreflang, JSON-LD, sitemap and robots parity
- Responsive/accessibility requirements: 320/375/768/1024/1280+, keyboard support, heading order, WCAG AA contrast, 44x44 tap targets
- Performance constraints: Image-heavy galleries + third-party booking widget, target 90+ Lighthouse in all categories
- Deployment target: Netlify

## 2. Summary & Scope
Migrate from static HTML/CSS/JS to Astro + React islands + Tailwind v4 + strict TypeScript with single cutover.

In scope:
- Astro project scaffolding and route parity
- Shared typed content model for HR/EN locales
- SEO and structured-data centralization
- Performance stack (`astro-critters`, `@playform/compress`)
- Netlify config migration for Astro build output and legacy URL redirects

Out of scope:
- CMS integration
- Redesign beyond parity-level UI refinements
- New marketing pages/content cluster expansion

Locked implementation decisions:
- Rollout: single cutover
- i18n model: typed locale data files
- Booking: keep WebBookingPro via lazy React island (`client:visible`) with fallback CTA
- Styling: Tailwind v4 + `@theme` tokens
- TypeScript: strict

Canonical URL policy (locked):
- Keep locale roots with trailing slash: `/` and `/en/`
- Keep content pages without trailing slash: `/book-now`, `/en/book-now`, `/apartmani-krapinske-toplice`, `/en/apartmani-krapinske-toplice`
- Enforce with 301 normalization:
  - `/en` -> `/en/`
  - `/book-now/` -> `/book-now`
  - `/apartmani-krapinske-toplice/` -> `/apartmani-krapinske-toplice`
  - `/en/book-now/` -> `/en/book-now`
  - `/en/apartmani-krapinske-toplice/` -> `/en/apartmani-krapinske-toplice`
  - Legacy `.html` routes -> canonical routes

## 3. Affected Pages, Components & Routes
| Type | File | What changes |
|---|---|---|
| Page | `src/pages/index.astro` | HR homepage migrated from `index.html` |
| Page | `src/pages/en/index.astro` | EN homepage migrated from `en/index.html` |
| Page | `src/pages/book-now.astro` | HR booking page + lazy booking island |
| Page | `src/pages/en/book-now.astro` | EN booking page + lazy booking island |
| Page | `src/pages/apartmani-krapinske-toplice.astro` | HR SEO landing page |
| Page | `src/pages/en/apartmani-krapinske-toplice.astro` | EN SEO landing page |
| Page | `src/pages/404.astro` | New custom 404 page |
| Page | `src/pages/thank-you.astro` | New post-submit success page (replaces missing `/success.html`) |
| Layout | `src/layouts/BaseLayout.astro` | Head, fonts, preload/preconnect, skip link, deferred scripts |
| Component | `src/components/seo/SeoHead.astro` | Centralized SEO tags + JSON-LD injection |
| Components | `src/components/layout/*` | Header/Footer shared across routes |
| Components | `src/components/sections/*` | Hero/About/Apartments/Process/Testimonials/Contact/FAQ sections |
| Island | `src/components/islands/ApartmentGallery.tsx` | Interactive gallery (`client:visible`) |
| Island | `src/components/islands/ContactForm.tsx` | Inline validation + loading/error/success (`client:idle`) |
| Island | `src/components/islands/BookingWidget.tsx` | Third-party widget lazy loader (`client:visible`) |
| Styles | `src/styles/global.css` | `@theme` tokens + minimal custom CSS |
| Config | `astro.config.mjs` | Integrations, output behavior, perf settings |
| Config | `netlify.toml` | Astro build output + redirect strategy |
| Removed | legacy html/css/js files | Remove duplicate behavior paths after parity verification |

## 4. Component Architecture & Islands
- Static-first Astro components for all non-interactive content.
- React islands only for interactivity and only where needed.

Props/interfaces:
- `src/types/i18n.ts`
  - `export type LocaleCode = 'hr' | 'en'`
  - `export interface LocaleStrings { ... }`
- `src/types/content.ts`
  - `Apartment`, `ApartmentImage`, `Amenity`, `Testimonial`, `FaqItem`, `ContactInfo`
- `src/types/seo.ts`
  - `SeoMeta`, `AlternateLocaleLink`, `StructuredDataPayload`

Island directives:
- `ApartmentGallery.tsx` -> `client:visible`
- `ContactForm.tsx` -> `client:idle`
- `BookingWidget.tsx` -> `client:visible`
- Avoid `client:load` unless there is above-fold UX breakage without it

Single behavior path rule:
- Remove old runtime language mutation and old global JS translation/meta mutation.
- Render HR/EN server-side via separate pages and locale data.

## 5. Styling & Responsive Design
Tailwind Patterns decisions:
- Page container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `py-16 sm:py-24`
- Responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Forms/buttons use semantic token classes; avoid raw palette utility classes where token exists

Token strategy:
- Put colors, typography, spacing in `@theme` inside `src/styles/global.css`
- Map existing `design-system.json` values into semantic tokens (`--color-primary`, `--color-accent`, etc.)
- Keep custom CSS only for:
  - gallery transitions
  - complex pseudo-element effects
  - utility gaps not practical in Tailwind classes

Responsive checklist:
- [ ] 320px
- [ ] 375px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px+

## 6. Data & Content
Planned data files:
- `src/data/locales/hr.ts`
- `src/data/locales/en.ts`
- `src/data/apartments.ts`
- `src/data/site.ts` (brand, contact, social URLs, analytics defaults)

Content rules:
- Keep existing copy parity first; fix encoding artifacts during migration (`UTF-8` only)
- Add explicit image metadata per gallery image (`src`, `alt`, `width`, `height`, `loading`, `fetchpriority?`)
- No secrets in client-side data files

## 7. SEO & Meta Tags
Roier SEO requirements applied:
- Unique `<title>` (<= 60 chars target)
- Unique meta description (<= 160 chars target)
- Full OG + Twitter tags per page
- Canonical URLs aligned with route output
- `hreflang` pairs for HR/EN + `x-default`
- Structured data per relevant page:
  - `WebSite`
  - `Organization`
  - `LodgingBusiness`
  - `FAQPage` (where FAQ exists)
  - `BreadcrumbList` on landing pages

Crawl/index assets:
- Preserve and validate `robots.txt`
- Generate sitemap via `@astrojs/sitemap` and verify canonical URLs only

## 8. Performance & Core Web Vitals
Perf Astro requirements applied:
- Add `astro-critters` integration
- Add `@playform/compress` integration
- Keep non-blocking font pattern (preconnect + `media="print" onload` + noscript fallback)
- Preload LCP hero image on homepage
- Lazy-load below-fold images and embeds
- Ensure explicit image dimensions to prevent CLS
- Defer non-critical third-party scripts

Metrics targets:
- LCP < 2.5s (mobile target environment)
- CLS < 0.1
- INP < 200ms
- Lighthouse >= 90 (Performance/Accessibility/Best Practices/SEO)

## 9. Error Handling & UX States
- Contact form:
  - Inline validation errors (no blocking `alert()` UX)
  - Loading state on submit
  - Success state routed or in-page without losing context
  - Network/server error retry guidance while preserving user input
- Booking widget island:
  - Loading placeholder skeleton
  - Timeout/error fallback with visible CTA to booking/contact channel
- Images:
  - Valid alt text
  - Stable layout with width/height
- 404:
  - `src/pages/404.astro` with link back to home and key routes

## 10. Plan of Work
### Foundation
- Add Astro + React + Tailwind v4 + strict TS project scaffolding
- Configure `astro.config.mjs` integrations and output behavior
- Keep Astro routing in neutral mode (`trailingSlash: 'ignore'`) and enforce canonical slash policy via explicit Netlify 301 redirects

### Data + SEO Core
- Add typed data and locale model
- Add `SeoHead.astro` and JSON-LD helpers

### Page Migration
- Implement six canonical pages in Astro
- Migrate common sections into reusable components

### Interactive Islands
- Implement gallery island
- Implement contact form island with robust states
- Implement booking widget island lazy loader and fallback

### Netlify and Redirects
- Update Netlify build output to `dist`
- Keep 301 legacy `.html` redirects
- Remove 200 rewrites to old html files
- Replace old `/success` and `/success.html` behavior with 301 redirects to `/thank-you`

### Cleanup
- Remove legacy duplicate static implementation files after parity checks

## 11. Concrete Steps
```bash
npm install
npm run dev
npm run build
npm run preview
npx astro check
```

Lighthouse check:
```bash
npx lighthouse http://localhost:4321 --form-factor=mobile
```

Validation checklist:
- JSON-LD validator for structured data
- Manual route checks for canonical/hreflang
- Netlify redirect checks for old `.html` URLs
- Browser console checks in dev and preview (no errors/warnings from shipped code)

## 12. Testing & Acceptance
Visual:
- [x] Dev and preview render correctly
- [ ] No horizontal scroll or overlap
- [ ] Responsive checklist passes all target widths
- [ ] Tested in Chrome + one other browser

Functional:
- [x] All canonical routes return 200
- [x] Legacy `.html` routes return 301 to canonical routes
- [x] Slash normalization redirects are correct (`/en` -> `/en/`, content pages with trailing slash -> no trailing slash)
- [ ] Language switch routes correctly between HR and EN counterparts
- [ ] Gallery island works (next/prev/indicator)
- [ ] Contact form states work (validate/loading/success/error)
- [ ] Booking widget island loads when visible and falls back on failure
- [ ] Contact form works with JavaScript disabled (graceful fallback submit path)

Accessibility:
- [ ] Keyboard nav/focus order/visible focus
- [ ] Skip link works
- [x] Heading hierarchy valid (single `h1` per page)
- [ ] Color contrast WCAG AA
- [ ] Touch targets >= 44x44

SEO:
- [x] Unique title/meta per page
- [x] Canonical and hreflang tags correct on all 6 routes
- [x] Structured data validates
- [x] Sitemap contains canonical URLs only
- [x] Robots references sitemap and allows crawl
- [x] `/success` and `/success.html` both 301 to `/thank-you`

Performance:
- [x] LCP image preloaded and not lazy
- [x] Below-fold media lazy
- [x] No CLS from media/fonts/embeds
- [x] Lighthouse scores >= 90 in all four key categories

Best practices/security:
- [x] All `target="_blank"` links include `rel="noopener noreferrer"`
- [x] Analytics ID is environment-driven and no secrets are exposed in client bundles
- [ ] No mixed-content requests and no CSP-breaking inline script regressions after migration

Pre-deploy:
- [x] `npm run build` succeeds with no fatal warnings
- [x] Preview smoke test passed for all 6 canonical routes
- [x] Redirect matrix validated (`.html`, slash normalization, `/success` -> `/thank-you`)

Post-deploy:
- [ ] Live URL smoke test on all canonical routes
- [ ] Form submission and booking widget behavior verified on production domain
- [ ] Live Lighthouse run recorded for homepage + landing + booking pages

## 13. Risks & Mitigations
- Third-party booking script hurts CWV
  - Mitigation: `client:visible`, placeholder, fallback CTA, defer and preconnect only
- SEO regression during cutover
  - Mitigation: route parity matrix + 301 mapping + pre-deploy crawl checks
- Encoding issues in Croatian text
  - Mitigation: enforce UTF-8 and verify all locale strings manually
- Over-scoped migration
  - Mitigation: parity-first milestones; defer enhancements not required for cutover

## 14. Idempotence & Recovery
Safe to rerun:
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npx astro check`

Recovery:
- Build fail: inspect first error and fix forward
- Dependency corruption: remove `node_modules` + lockfile and reinstall
- Bad output: remove `dist/` and rebuild

## 15. Progress (Required Format)
- [x] (2026-02-28 16:10Z) Created nested plans folder and drafted this implementation plan (`docs/plans/plans/dada-apartments-astro-implementation-exec_plan.md`)
- [x] (2026-02-28 16:35Z) Completed second plan analysis pass and resolved planning gaps (canonical URL policy, `/success` redirect strategy, JS-disabled form acceptance, security checks) (`docs/plans/plans/dada-apartments-astro-implementation-exec_plan.md`)
- [x] (2026-02-28 16:55Z) Completed third plan analysis pass; added framework-vs-edge slash enforcement rule, pre/post-deploy acceptance gates, browser-console and cross-browser checks (`docs/plans/plans/dada-apartments-astro-implementation-exec_plan.md`)
- [x] (2026-02-28 08:27Z) Scaffolded Astro project config (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`, `.gitignore`)
- [x] (2026-02-28 08:28Z) Implemented Tailwind v4 tokenized global styling (`src/styles/global.css`)
- [x] (2026-02-28 08:31Z) Added typed data/content and locale layer (`src/types/*`, `src/data/*`, `src/lib/*`)
- [x] (2026-02-28 08:34Z) Implemented layout and SEO system (`src/layouts/BaseLayout.astro`, `src/components/seo/SeoHead.astro`)
- [x] (2026-02-28 08:36Z) Built shared sections and canonical route pages (`src/components/sections/*`, `src/pages/*`)
- [x] (2026-02-28 08:36Z) Implemented interactive islands (`src/components/islands/ApartmentGallery.tsx`, `src/components/islands/ContactForm.tsx`, `src/components/islands/BookingWidget.tsx`)
- [x] (2026-02-28 08:37Z) Updated Netlify build/redirect policy for Astro + canonical strategy (`netlify.toml`)
- [x] (2026-02-28 08:28Z) Migrated static assets to Astro public directory (`public/images/*`, `public/icon.svg`, `public/robots.txt`, `public/site.webmanifest`)
- [x] (2026-02-28 08:29Z) Removed legacy static duplicate behavior files (`index.html`, `book-now.html`, `apartmani-krapinske-toplice.html`, `en/*.html`, `book-now/index.html`, `styles.css`, `script.js`)
- [x] (2026-02-28 09:10Z) Completed local QA and verification (done: `npm run build`, `npx astro check`, Lighthouse on home/landing/booking, structured-data + canonical/hreflang validation, sitemap/robots audit, redirect matrix and security checks) (`dist/*`, `docs/plans/plans/verification/*`, `netlify.toml`)
- [/] (2026-02-28 09:10Z) Deployment verification remaining (live URL smoke test, production form + booking widget behavior, live Lighthouse capture) (`docs/plans/plans/dada-apartments-astro-implementation-exec_plan.md`)

## 16. Decision Log / Surprises
- Decision: Single cutover instead of phased migration
  Rationale: eliminate dual-path maintenance and reduce SEO drift
  Date: 2026-02-28

- Decision: Use typed locale files instead of runtime translation JS
  Rationale: better SSR SEO reliability, simpler long-term maintenance
  Date: 2026-02-28

- Decision: Keep booking provider but lazy-load via island
  Rationale: preserve conversion path while protecting CWV
  Date: 2026-02-28

- Decision: Normalize URL shape with mixed slash policy (`/en/` root preserved; content routes no trailing slash)
  Rationale: preserve current SEO behavior while removing canonical ambiguity in migration
  Date: 2026-02-28

- Decision: Enforce slash canonicalization at Netlify edge while keeping Astro `trailingSlash: 'ignore'`
  Rationale: prevents framework-level route conflicts and keeps redirect behavior explicit and testable
  Date: 2026-02-28

- Observation: Existing `/success` rewrite targets missing `success.html`
  Evidence: `netlify.toml` rewrite exists with no corresponding file

- Observation: Generated sitemap URLs initially used trailing slashes for content routes while page canonicals used no-trailing-slash format
  Evidence: `dist/sitemap-0.xml` vs canonical tags in `dist/book-now/index.html` and `dist/apartmani-krapinske-toplice/index.html`

- Decision: Normalize sitemap output with `@astrojs/sitemap` `serialize` hook and keep only `/` and `/en/` with trailing slashes
  Rationale: remove canonical/sitemap URL-shape drift and reduce redirect hops for crawlers
  Date: 2026-02-28

## 17. Outcomes & Retrospective
Expected outcomes after implementation:
- Astro architecture with explicit islands and no duplicate behavior paths
- Improved maintainability via typed content and centralized SEO
- Better Core Web Vitals and stronger Lighthouse consistency
- Reduced SEO risk through canonical/hreflang/schema standardization

Retrospective checkpoint (post-implementation):
- Compare pre/post Lighthouse and route crawl output
- Record residual debt and follow-up tickets only if outside cutover scope

## 18. Plan Revision Note
- 2026-02-28: Created implementation plan from `docs/plans/dada-apartments-exec_plan.md` and user-provided migration constraints.
- 2026-02-28: Self-review pass completed; integrated improvements/simplifications:
  - Added `rel="noopener noreferrer"` requirement for all `target="_blank"` links
  - Enforced explicit media dimensions in typed image data
  - Added real `thank-you` route to replace missing `/success` target
  - Removed runtime translation/meta mutation from target architecture
  - Replaced inline style usage with Tailwind/stateful component behavior where practical
- 2026-02-28: Second analysis pass completed; tightened implementation checks:
  - Locked canonical slash normalization policy and explicit redirect set
  - Added acceptance checks for JS-disabled form fallback and `/success` redirect migration
  - Added explicit best-practice/security validation checks to testing
- 2026-02-28: Third analysis pass completed; added execution hardening updates:
  - Clarified Astro/Netlify slash handling split (`trailingSlash: 'ignore'` + edge redirects)
  - Restored pre-deploy and post-deploy verification gates
  - Added cross-browser and console-clean checks to acceptance criteria
- 2026-02-28: Implementation executed:
  - Delivered Astro + React islands + Tailwind v4 migration with strict TypeScript
  - Added public asset migration and removed legacy static HTML/CSS/JS duplicates
  - Build and Astro check completed successfully; Lighthouse/schema live validation pending
- 2026-02-28: Final local verification pass completed:
  - Fixed sitemap canonicalization drift in `astro.config.mjs` (`sitemap.serialize`) and updated robots sitemap target to `sitemap-index.xml`
  - Re-ran build/check and local Lighthouse suite (`docs/plans/plans/verification/lighthouse_127_0_0_1_4399*.json`)
  - Verified canonical/hreflang/schema coverage and redirect matrix against `dist/*` and `netlify.toml`
  - Remaining work is limited to post-deploy production checks
