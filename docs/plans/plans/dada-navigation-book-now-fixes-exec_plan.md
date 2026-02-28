# Dada Apartments - Navigation + Book-Now UI Fixes ExecPlan
LAST UPDATED AT: 2026-02-28 11:27:00 UTC

## 1) Ticket Intake Checklist
- Ticket ID and title: NAV-BOOK-01 - Anchor navigation accuracy + book-now layout consistency.
- User-visible behavior:
  - Header links (`O nama`, `Apartmani`, `Kontakt`) must scroll to section titles.
  - `Book now` page must keep the same site header/footer styling as landing pages.
  - Booking content must have left/right breathing room and not appear edge-to-edge.
- Pages/routes involved:
  - `/`, `/en/`
  - `/book-now`, `/en/book-now`
- Components to create or modify:
  - `src/components/sections/AboutSection.astro`
  - `src/components/sections/ApartmentsSection.astro`
  - `src/components/sections/ContactSection.astro`
  - `src/components/sections/BookingEmbedSection.astro` (new)
  - `src/pages/booking-widget-embed.astro` (new)
  - `src/pages/book-now.astro`
  - `src/pages/en/book-now.astro`
  - `src/styles/global.css`
- Design reference: Existing Dada visual language from landing page.
- Content source: Existing locale strings and site data.
- SEO requirements: Preserve existing canonical/hreflang/meta.
- Responsive/accessibility requirements:
  - Anchor jumps should remain usable with sticky header.
  - Embedded booking remains keyboard reachable and readable on mobile/desktop.
- Performance constraints: Keep vendor booking script isolated to avoid site-wide style/perf regression.
- Deployment target: Netlify (Astro site on `dada-astro` branch).

## 2) Summary & Scope
This plan fixes two regressions:
1. Anchor navigation alignment to section title tops.
2. Book-now visual consistency and container spacing.

Out of scope:
- Rewriting booking provider UX internals.
- Changing route structure or locale architecture.

## 3) Affected Pages, Components & Routes
| Type | File | What changes |
|---|---|---|
| Page | `src/pages/book-now.astro` | Replace direct booking mount with isolated embed section and tighter page container |
| Page | `src/pages/en/book-now.astro` | Same as HR page |
| New route | `src/pages/booking-widget-embed.astro` | Isolated host page for booking provider assets/scripts |
| Component | `src/components/sections/BookingEmbedSection.astro` | Booking iframe shell + auto-height messaging + fallback CTA |
| Component | `src/components/sections/AboutSection.astro` | Add scroll offset class on title anchor |
| Component | `src/components/sections/ApartmentsSection.astro` | Add scroll offset class on title anchor |
| Component | `src/components/sections/ContactSection.astro` | Add scroll offset class on title anchor |
| Styles | `src/styles/global.css` | Add book-now container/embed spacing styles |
| Removed | `src/components/islands/BookingWidget.tsx` | Retire old direct-injection booking path |

## 4) Component Architecture & Islands
- Booking integration path:
  - Parent page uses static Astro component (`BookingEmbedSection.astro`).
  - Booking vendor assets load only inside `booking-widget-embed.astro`.
  - Parent/child communicate via `postMessage` for height sync.
- No full-page framework wrapping introduced.
- Single behavior path enforced (old direct mount removed).

## 5) Styling & Responsive Design
- Use `book-now-shell` (`max-w-6xl`, `px-4 sm:px-6 lg:px-8`) for book-now horizontal breathing room.
- Use `booking-frame-shell` card wrapper for visual consistency.
- Use responsive iframe min-heights:
  - Desktop: 1600px
  - Tablet: 1900px
  - Mobile: 2300px
- Title anchors get `scroll-mt-28` so sticky header does not cover the title.

## 6) SEO & Meta Tags
- No SEO metadata changes required.
- Canonical/hreflang/OG/JSON-LD remain unchanged in current page implementations.

## 7) Performance & Core Web Vitals
- Keep third-party booking CSS/JS isolated in iframe route to prevent global style invalidation.
- Parent pages remain slim static Astro pages with minimal JS.

## 8) Error Handling & UX States
- Booking embed route shows inline error message when manifest/assets fail.
- Parent book-now page always shows external booking fallback CTA.
- Iframe gets fallback min-height even before first height message.

## 9) Plan of Work
### Anchor Accuracy
- Edit section title anchors to include sticky-header-safe scroll offset.

### Book-Now Consistency
- Add isolated booking embed route.
- Add reusable booking embed section component.
- Replace HR/EN book-now pages to use embed component.
- Add scoped CSS for margins and frame card shell.
- Remove previous direct booking component path.

## 10) Concrete Steps
```bash
npm install
npm run dev
npm run build
npx astro check
```

Manual checks:
- `/` and `/en/`: nav anchors land with title visible.
- `/book-now` and `/en/book-now`: header/footer style parity with landing page.
- Book-now content has consistent left/right spacing on 320/768/1280 widths.
- No inner-scrollbar requirement in booking area.

## 11) Testing & Acceptance
### Functional
- [x] Header links from all pages jump to correct section title positions.
- [x] Book-now still loads booking calendar.
- [x] Fallback CTA remains present below booking embed.

### Visual
- [x] Header/footer on book-now match home page visual language.
- [x] Book-now content has balanced horizontal padding.
- [x] No horizontal overflow observed during local verification.

### Build
- [x] `npx astro check` passes without errors.
- [x] `npm run build` succeeds.

## 12) Risks & Mitigations
- Risk: Booking provider changes embed structure/height.
  - Mitigation: Keep min-height fallbacks + periodic height sync.
- Risk: Anchor offsets differ by viewport/header height.
  - Mitigation: Use `scroll-mt-28` and validate on mobile + desktop.

## 13) Idempotence & Recovery
- Safe to re-run: `npm install`, `npm run dev`, `npm run build`, `npx astro check`.
- If booking embed fails unexpectedly: keep CTA fallback and inspect `booking-widget-embed` console errors.

## 14) Progress
- [x] (2026-02-28 11:27Z) Added section-title scroll offsets for anchors (`src/components/sections/AboutSection.astro`, `src/components/sections/ApartmentsSection.astro`, `src/components/sections/ContactSection.astro`)
- [x] (2026-02-28 11:27Z) Added isolated booking embed route and parent embed component (`src/pages/booking-widget-embed.astro`, `src/components/sections/BookingEmbedSection.astro`)
- [x] (2026-02-28 11:27Z) Switched HR/EN book-now pages to embed section with consistent container spacing (`src/pages/book-now.astro`, `src/pages/en/book-now.astro`, `src/styles/global.css`)
- [x] (2026-02-28 11:27Z) Removed old direct booking widget path (`src/components/islands/BookingWidget.tsx`)
- [x] (2026-02-28 12:30Z) Completed local QA sweep for anchor jumps, book-now spacing, and build/astro-check (`src/components/sections/*.astro`, `src/pages/book-now.astro`, `src/pages/en/book-now.astro`)
- [ ] (pending) Run deployed Netlify QA sweep and log outcomes.

## 15) Decision Log / Surprises
- Decision: Isolate booking provider in dedicated embed route.
  - Rationale: Prevent third-party style collisions with site header/footer/layout.
  - Date: 2026-02-28

- Decision: Keep nav link targets on section title IDs and add `scroll-mt-28`.
  - Rationale: Ensure jumps land at visible title top under sticky header.
  - Date: 2026-02-28

## 16) Plan Revision Note
- 2026-02-28: Created for anchor-navigation and book-now layout parity fixes.
