# Dada Apartments - Mobile UX, Booking, and SEO Fixes ExecPlan
LAST UPDATED AT: 2026-02-28 13:24:00 UTC

This plan defines how to fix the current mobile UX issues (booking page scrolling, hamburger behavior, footer overscroll color, gallery image loading) and improve SEO targeting for key phrases while preserving current architecture and visual identity.

---

## 1. Ticket Intake Checklist
- Ticket ID and title: UX-SEO-MOBILE-02 - Mobile UX + booking scroll + keyword SEO fixes.
- User-visible behavior:
  - `book-now` must not show double-scroll behavior on mobile.
  - Mobile hamburger menu closes on outside tap and on scroll.
  - Bottom overscroll area color behind footer matches footer color.
  - Apartment gallery loads all images reliably on mobile.
  - Booking CTA link updated to provided URL.
- Pages/routes involved:
  - `/`, `/en/`
  - `/book-now`, `/en/book-now`
  - `/apartmani-krapinske-toplice`, `/en/apartmani-krapinske-toplice`
- Components to create or modify:
  - `src/components/layout/Header.astro`
  - `src/components/sections/BookingEmbedSection.astro`
  - `src/pages/booking-widget-embed.astro`
  - `src/styles/global.css`
  - `src/components/islands/ApartmentGallery.tsx`
  - `src/data/site.ts`
  - `src/data/locales/hr.ts`
  - `src/data/locales/en.ts`
  - `src/lib/structured-data.ts`
- Design reference: keep existing Dada style and spacing.
- Content source: local typed locale content + existing booking provider.
- SEO requirements: improve on-page targeting for:
  - `Apartmani Krapinske Toplice`
  - `Apartman Krapinske Toplice`
  - `Apartments Krapinske Toplice`
  - `Apartment Krapinske Toplice`
- Responsive/accessibility requirements:
  - maintain keyboard accessibility and 44x44 touch targets.
  - menu behavior must remain accessible.
- Performance constraints:
  - preserve current performance work; avoid regressions in Lighthouse.
- Deployment target: Netlify production (`dada-apartments-astro.netlify.app`).

---

## 2. Summary & Scope
Goal: resolve all reported mobile UX blockers and apply targeted SEO improvements without introducing regressions in booking behavior, accessibility, or performance architecture.

In scope:
- Booking embed scroll behavior refactor for mobile.
- Header mobile menu interaction improvements.
- Footer overscroll background fix.
- Gallery preload/navigation reliability fix.
- Booking fallback URL update.
- Keyword-focused SEO copy and schema refinements.

Out of scope:
- CMS/content model redesign.
- Full visual redesign.
- Replacing booking provider.

---

## 3. Locked Constraints
1) `book-now` booking calendar still loads immediately when page loads.
2) Preserve existing bilingual routes and canonical/hreflang setup.
3) No duplicate behavior paths; remove replaced logic in same change.
4) Keep Lighthouse stability in mind while implementing UX fixes.

---

## 4. Affected Pages, Components & Routes
| Type | File | Planned change |
|---|---|---|
| Layout component | `src/components/layout/Header.astro` | Close mobile menu on outside tap + scroll + link click |
| Section component | `src/components/sections/BookingEmbedSection.astro` | Parent frame behavior tuned for single-scroll UX |
| Page | `src/pages/booking-widget-embed.astro` | Height sync strategy to prevent nested scroll traps |
| Styles | `src/styles/global.css` | Footer overscroll background treatment + booking frame polish |
| Island | `src/components/islands/ApartmentGallery.tsx` | Reliable preload/navigation state for all images |
| Data | `src/data/site.ts` | Update booking fallback URL to provided link |
| Locale data | `src/data/locales/hr.ts` | SEO title/description phrase tuning (HR keywords) |
| Locale data | `src/data/locales/en.ts` | SEO title/description phrase tuning (EN keywords) |
| SEO helpers | `src/lib/structured-data.ts` | Improve schema text relevance for target phrases |

---

## 4A. Plan Quality Review (Second Pass)
Improvements applied in this revision:
- Progress section expanded into granular file-level checkboxes to prevent ambiguous completion.
- Acceptance criteria now include explicit verification for:
  - no dual-scroll behavior on `book-now`,
  - exact fallback URL update,
  - mobile gallery reliability through full image set.
- Added explicit evidence storage path and naming guidance for repeatable verification.
- Added keyword placement checklist to keep SEO improvements targeted and non-spammy.

---

## 5. Plan of Work
### Milestone A - Mobile Menu UX
- Add deterministic close behavior for mobile nav when:
  - user taps outside menu,
  - user starts scrolling,
  - user taps a menu link.
- Keep `details/summary` semantics and keyboard behavior.

### Milestone B - Book-now Single-Scroll Behavior
- Refine booking frame sizing/sync between parent page and embed host.
- Eliminate double-scroll feel on mobile while preserving immediate widget load.
- Validate no layout break in desktop/tablet.

### Milestone C - Footer Overscroll Color
- Implement bottom-only overscroll background treatment so:
  - bottom bounce area matches footer color,
  - top scroll state and top-area look remain unchanged.

### Milestone D - Gallery Reliability on Mobile
- Fix image preload/navigation state machine so carousel never gets stuck in loading state.
- Ensure users can navigate through all photos repeatedly on mobile.

### Milestone E - Booking URL Update
- Replace booking fallback URL with:
  - `https://www.booking.com/Share-tyYI7S1`

### Milestone F - SEO Keyword Improvements
- Tune page titles/meta descriptions and key body copy to naturally include target phrases.
- Strengthen relevant structured-data text fields.
- Keep titles/descriptions readable and not spammy.
- Apply phrase placement intentionally:
  - home title/description (HR + EN),
  - landing title/description (HR + EN),
  - one prominent body mention on landing content per locale,
  - lodging/business schema description fields.

### Milestone G - Verification
- Run build/type checks.
- Run route-level Lighthouse checks (local + live subset).
- Verify UX behavior manually on mobile viewport.

---

## 6. Concrete Steps
```bash
npm run check
npm run build
npm run preview

# Optional local mobile lighthouse samples
npx lighthouse http://127.0.0.1:4321 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo
npx lighthouse http://127.0.0.1:4321/book-now --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo
```

Evidence path:
- `docs/plans/plans/verification/mobile-ux-seo-YYYYMMDD-HHMM/`

---

## 7. Testing & Acceptance
### UX Acceptance
- [ ] On mobile, `book-now` has no double-scroll UX issue.
- [ ] Booking calendar still appears immediately on page load.
- [ ] No internal iframe scroll area is required for primary booking interaction on mobile.
- [ ] Hamburger menu closes on outside tap.
- [ ] Hamburger menu closes when scrolling.
- [ ] Hamburger menu closes after selecting a navigation item.
- [ ] Bottom overscroll behind footer uses footer color.
- [ ] Top scroll/start-of-page background behavior remains unchanged.
- [ ] Mobile apartment gallery can navigate through all images without stalling.
- [ ] Booking fallback CTA opens exactly: `https://www.booking.com/Share-tyYI7S1`.

### Mobile Viewport Matrix
- [ ] 320px verified (`/`, `/book-now`, `/apartmani-krapinske-toplice`)
- [ ] 375px verified (`/`, `/book-now`, `/apartmani-krapinske-toplice`)
- [ ] 768px verified (`/`, `/book-now`, `/apartmani-krapinske-toplice`)

### SEO Acceptance
- [ ] HR home/landing metadata include `Apartmani Krapinske Toplice` and `Apartman Krapinske Toplice` naturally.
- [ ] EN home/landing metadata include `Apartments Krapinske Toplice` and `Apartment Krapinske Toplice` naturally.
- [ ] Landing body copy includes target phrases naturally (no keyword stuffing).
- [ ] Structured data remains valid and relevant.
- [ ] Canonical/hreflang unchanged and valid.

### Technical Acceptance
- [x] `npm run check` passes.
- [x] `npm run build` passes.
- [ ] No console errors on core routes.

### Performance Guard
- [x] No major Lighthouse regression on `/` and `/book-now` (mobile).

---

## 8. Risks & Mitigations
- Booking provider dynamic height can reintroduce scroll issues.
  - Mitigation: use debounced/event-driven height sync and fallback min-heights.
- Menu outside-click handlers can conflict with `details`.
  - Mitigation: strictly scope handlers to one mobile nav instance and preserve native behavior.
- Aggressive preloading can hurt performance.
  - Mitigation: fix preload state correctness first; keep loading strategy bounded.
- SEO keyword stuffing risk.
  - Mitigation: use natural phrasing and targeted placement only.

---

## 9. Idempotence & Recovery
- Safe to rerun:
  - `npm run check`
  - `npm run build`
  - `npm run preview`
- If booking UX regresses:
  - revert booking sizing patch and reapply incrementally.

---

## 10. Progress
- [x] (2026-02-28 12:52Z) New exec plan created (`docs/plans/plans/dada-mobile-ux-booking-seo-fixes-exec_plan.md`)
- [x] (2026-02-28 13:01Z) Plan quality pass completed: refined acceptance gates and expanded progress ticks (`docs/plans/plans/dada-mobile-ux-booking-seo-fixes-exec_plan.md`)

- [x] (2026-02-28 13:15Z) A1 Add mobile nav outside-tap close behavior (`src/components/layout/Header.astro`)
- [x] (2026-02-28 13:15Z) A2 Add mobile nav close-on-scroll behavior (`src/components/layout/Header.astro`)
- [x] (2026-02-28 13:15Z) A3 Add mobile nav close-on-link-click behavior (`src/components/layout/Header.astro`)
- [/] (2026-02-28 13:24Z) A4 Keyboard/a11y smoke-check for updated mobile nav (done: preserved `details/summary` semantics; remaining: manual keyboard pass on device) (`src/components/layout/Header.astro`)

- [x] (2026-02-28 13:17Z) B1 Remove nested scroll trap in parent booking section (`src/components/sections/BookingEmbedSection.astro`)
- [x] (2026-02-28 13:18Z) B2 Align embed host sizing for mobile single-scroll UX (`src/pages/booking-widget-embed.astro`)
- [x] (2026-02-28 13:19Z) B3 Tune booking frame CSS for consistent mobile height behavior (`src/styles/global.css`)
- [/] (2026-02-28 13:24Z) B4 Verify immediate booking load preserved on HR and EN book pages (done: eager iframe load path unchanged; remaining: manual device confirmation) (`src/pages/book-now.astro`, `src/pages/en/book-now.astro`)

- [x] (2026-02-28 13:20Z) C1 Implement bottom overscroll color treatment matching footer (`src/styles/global.css`)
- [/] (2026-02-28 13:24Z) C2 Verify top-of-page background remains unchanged (remaining: manual mobile viewport check) (`src/styles/global.css`)

- [x] (2026-02-28 13:20Z) D1 Fix gallery preload/index transition stalling path (`src/components/islands/ApartmentGallery.tsx`)
- [/] (2026-02-28 13:24Z) D2 Verify full gallery cycling for all apartment cards on mobile (done: callback/timeout reliability guard added; remaining: manual device cycle test) (`src/components/islands/ApartmentGallery.tsx`)

- [x] (2026-02-28 13:21Z) E1 Update booking fallback URL constant (`src/data/site.ts`)
- [x] (2026-02-28 13:21Z) E2 Verify fallback CTA resolves to provided Booking.com share link (`src/components/sections/BookingEmbedSection.astro`)

- [x] (2026-02-28 13:23Z) F1 Update HR SEO home metadata with target phrase coverage (`src/data/locales/hr.ts`)
- [x] (2026-02-28 13:23Z) F2 Update HR SEO landing metadata with target phrase coverage (`src/data/locales/hr.ts`)
- [x] (2026-02-28 13:23Z) F3 Update EN SEO home metadata with target phrase coverage (`src/data/locales/en.ts`)
- [x] (2026-02-28 13:23Z) F4 Update EN SEO landing metadata with target phrase coverage (`src/data/locales/en.ts`)
- [x] (2026-02-28 13:23Z) F5 Update structured data descriptions for phrase relevance (`src/lib/structured-data.ts`)

- [x] (2026-02-28 13:21Z) G1 Run type check (`npm run check`)
- [x] (2026-02-28 13:22Z) G2 Run production build (`npm run build`)
- [x] (2026-02-28 13:22Z) G3 Capture local Lighthouse evidence for `/` and `/book-now` (`docs/plans/plans/verification/mobile-ux-seo-20260228-1422/`)
- [ ] G4 Capture live Lighthouse evidence for `/`, `/book-now`, `/apartmani-krapinske-toplice` (`docs/plans/plans/verification/mobile-ux-seo-*/`)
- [x] (2026-02-28 13:24Z) G5 Record outcome summary and residual risks in this plan (`docs/plans/plans/dada-mobile-ux-booking-seo-fixes-exec_plan.md`)

Execution outcome snapshot:
- Local Lighthouse mobile: `/` Perf 100, `/book-now` Perf 72, `/apartmani-krapinske-toplice` Perf 100 (`docs/plans/plans/verification/mobile-ux-seo-20260228-1422/`).
- Residual risks: remaining manual mobile-device verification for scroll/menu/gallery behavior and top overscroll color parity.

---

## 11. Decision Log / Surprises
- Decision: Keep immediate booking calendar load on `book-now`.
  - Rationale: explicit requirement from user.
  - Date: 2026-02-28

---

## 12. Plan Revision Note
- 2026-02-28: Created initial implementation plan for mobile UX + booking + SEO fixes.
- 2026-02-28: Second-pass plan review completed; added clearer acceptance gates, keyword placement checks, and granular progress tracking.
- 2026-02-28: Implemented core code fixes, captured local audit evidence, and updated progress with partial/manual verification status.
