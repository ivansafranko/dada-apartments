# Dada Apartments - Mobile 90+ Performance Remediation ExecPlan
LAST UPDATED AT: 2026-02-28 12:48:00 UTC

This plan defines the implementation sequence to raise mobile Lighthouse scores to 90+ across canonical routes while preserving current behavior, including immediate booking calendar loading on `book-now`.

---

## 1. Ticket Intake Checklist
- Ticket ID and title: PERF-90-MOBILE - Reach mobile 90+ Lighthouse on canonical routes.
- User-visible behavior:
  - Site remains visually unchanged except faster load.
  - `Book-now` booking calendar still loads immediately when page loads.
- Pages/routes involved:
  - `/`, `/en/`
  - `/apartmani-krapinske-toplice`, `/en/apartmani-krapinske-toplice`
  - `/book-now`, `/en/book-now`
- Components to create or modify:
  - `src/components/sections/HeroSection.astro`
  - `src/components/sections/ApartmentsSection.astro`
  - `src/components/islands/ApartmentGallery.tsx`
  - `src/components/islands/ContactForm.tsx`
  - `src/pages/booking-widget-embed.astro`
  - `src/layouts/BaseLayout.astro`
  - `src/data/apartments.ts`
  - `src/styles/global.css`
- Design reference: Keep current Dada design system.
- Content source: Local static images/content.
- SEO requirements: Keep current canonical/hreflang/meta/schema.
- Responsive/accessibility requirements: No regressions in keyboard, contrast, touch target behavior.
- Performance constraints: Mobile 90+ in Perf/A11y/Best Practices/SEO for each canonical route.
- Deployment target: Netlify (`dada-apartments-astro.netlify.app`).

---

## 2. Summary & Scope
Goal: close the current mobile Lighthouse gap (reported around 71) and iterate until each canonical route reaches 90+ in all required categories.

In scope:
- Image right-sizing and responsive delivery.
- JavaScript critical-path reduction.
- Map embed weight reduction.
- Forced-reflow mitigation in booking embed script.
- Re-audit loop with recorded evidence.

Out of scope:
- Rebuild of booking provider internals.
- Design or copy rewrites unrelated to performance.

---

## 3. Locked Constraints
1) `book-now` booking calendar must load immediately on page load.
2) No fallback to delayed booking load (`client:visible`/click-to-load) for `book-now`.
3) No SEO regressions (titles/meta/canonical/hreflang/schema remain valid).
4) No dual implementations; remove replaced code in same PR.

---

## 4. Baseline Findings (From PSI)
- Oversized images are the largest opportunity:
  - Apartment/gallery AVIF files are source-resolution images (e.g., 4898x3264) rendered near card size (~329x218), causing major transfer waste.
  - Hero AVIF is also oversized relative to rendered mobile size.
- Significant unused JavaScript from Google Maps resources.
- Critical request chain includes Astro client runtime + island chunks on initial navigation.
- Forced reflow observed (~46ms unattributed), likely from geometry reads after DOM mutation.

## 4A. Audit Method & Evidence (Required)
- Use the same route matrix for every audit pass:
  - `/`, `/en/`, `/apartmani-krapinske-toplice`, `/en/apartmani-krapinske-toplice`, `/book-now`, `/en/book-now`
- Capture two evidence sets per pass:
  1) local preview Lighthouse mobile (for fast iteration)
  2) live URL checks (Lighthouse/PSI) after deploy
- Store artifacts under:
  - `docs/plans/plans/verification/perf-90plus-YYYYMMDD/`
- Naming convention:
  - `<route-slug>.local.mobile.json`
  - `<route-slug>.live.mobile.json`
  - `<route-slug>.live.mobile.png` (optional screenshot evidence)

### Route Score Tracker (Fill During Execution)
| Route | Baseline Perf | Current Perf | Current A11y | Current Best | Current SEO | Gate 90+ Status |
|---|---:|---:|---:|---:|---:|---|
| `/` | 71 (reported PSI) | 84 | 96 | 100 | 100 | Fail (Perf) |
| `/en/` | - | 87 | 96 | 100 | 100 | Fail (Perf) |
| `/apartmani-krapinske-toplice` | - | 100 | 100 | 100 | 100 | Pass |
| `/en/apartmani-krapinske-toplice` | - | 100 | 100 | 100 | 100 | Pass |
| `/book-now` | - | 71 | 100 | 96 | 100 | Fail (Perf) |
| `/en/book-now` | - | 71 | 100 | 96 | 100 | Fail (Perf) |

---

## 5. Affected Pages, Components & Routes
| Type | File | What changes |
|---|---|---|
| Layout | `src/layouts/BaseLayout.astro` | Add/adjust preload/preconnect strategy and reduce non-critical early work |
| Component | `src/components/sections/HeroSection.astro` | Responsive image strategy (`srcset`/sizes or Astro image pipeline) |
| Component | `src/components/sections/ApartmentsSection.astro` | Replace always-live map embeds with lighter progressive map loading strategy |
| Island | `src/components/islands/ApartmentGallery.tsx` | Ensure responsive image candidates and avoid layout/reflow issues |
| Island | `src/components/islands/ContactForm.tsx` | Defer hydration further from critical path if safe (`client:visible`) |
| Page | `src/pages/booking-widget-embed.astro` | Remove polling reflow loop and keep event-driven height sync |
| Data | `src/data/apartments.ts` | Add responsive image metadata if needed |
| Styles | `src/styles/global.css` | Any supporting responsive/perf-safe class updates |

---

## 6. Plan of Work
### Milestone A - Measurement Baseline
- Run mobile Lighthouse on preview for all canonical routes.
- Save JSON/HTML artifacts under `docs/plans/plans/verification/perf-90plus-YYYYMMDD/`.
- Record per-route scores and top blocking audits.
- Exit criteria:
  - Baseline scores for all six routes are logged in the score tracker.
  - Top 3 blockers per route are documented.

### Milestone B - Image Payload Reduction
- Convert hero and apartment card/gallery delivery to responsive-sized assets.
- Ensure rendered card images are served close to displayed dimensions (not full-resolution originals).
- Keep explicit width/height to preserve CLS safety.
- Verify LCP image has correct `fetchpriority="high"` and preload only where needed.
- Exit criteria:
  - PSI/Lighthouse no longer reports oversized hero/apartment card images as top offenders.

### Milestone C - JS Critical Path Reduction
- Move non-critical islands further off critical path when possible (without UX regression).
- Confirm `ContactForm` hydration does not sit on initial critical chain for home route.
- Reduce early module loading where possible while preserving behavior.
- Exit criteria:
  - Initial JS chain length/impact reduced vs baseline on `/` and `/en/`.

### Milestone D - Maps Weight Reduction
- Replace always-loaded map embeds on listing/landing sections with a progressive pattern:
  - Static map image + "Open map" CTA by default.
  - Optional on-demand iframe load only after explicit interaction.
- Preserve accessibility labels and link fallback.
- Exit criteria:
  - Unused Google Maps JS drops substantially on home/landing routes in mobile audits.

### Milestone E - Booking Embed Reflow Mitigation
- Keep immediate booking load on `book-now`.
- Remove/replace fixed-interval height polling in `booking-widget-embed` with event-driven updates (mutation/resize + throttled `requestAnimationFrame`).
- Ensure no nested-scroll UX regression.
- Exit criteria:
  - Booking still appears immediately.
  - Forced reflow warning is reduced or eliminated for `book-now`.

### Milestone F - Re-Audit Loop (Until 90+)
- Re-run Lighthouse mobile on all canonical routes after each milestone.
- Continue optimization loop until every route passes 90+ (Perf/A11y/Best Practices/SEO).
- Log final evidence in verification folder and in plan `Progress`.
- Exit criteria:
  - All six routes pass 90+ in Perf/A11y/Best/SEO on the live site.

---

## 7. Concrete Steps
```bash
npm install
npm run build
npx astro check
npm run preview

# Example audit command (mobile)
npx lighthouse http://127.0.0.1:4321 --form-factor=mobile --output=json --output-path=docs/plans/plans/verification/perf-90plus-YYYYMMDD/home.mobile.json
```

---

## 8. Testing & Acceptance
### Performance Gate (Required)
- [ ] `/` mobile Lighthouse: Perf/A11y/Best Practices/SEO all >= 90
- [ ] `/en/` mobile Lighthouse: Perf/A11y/Best Practices/SEO all >= 90
- [ ] `/apartmani-krapinske-toplice` mobile Lighthouse: all >= 90
- [ ] `/en/apartmani-krapinske-toplice` mobile Lighthouse: all >= 90
- [ ] `/book-now` mobile Lighthouse: all >= 90
- [ ] `/en/book-now` mobile Lighthouse: all >= 90

### Behavioral Guardrails
- [ ] `book-now` booking calendar still loads immediately on page load.
- [ ] Navigation/anchors/forms/book-now still function as before.
- [ ] No CLS regressions from image/map strategy changes.

### Deployment Verification
- [ ] Netlify production deploy completed.
- [ ] Local and live score tracker table fully filled.
- [ ] Live URL Lighthouse evidence saved and linked in `Progress`.

---

## 9. Risks & Mitigations
- Risk: Third-party booking/map assets cap achievable score.
  - Mitigation: isolate and defer everything except booking immediate-load requirement; remove non-essential third-party work from non-booking routes.
- Risk: Over-optimization breaks UX/content fidelity.
  - Mitigation: parity screenshots and route-by-route functional checks.
- Risk: Image changes regress visual quality.
  - Mitigation: define minimum quality floor and compare before/after.

---

## 10. Idempotence & Recovery
- Safe to rerun: `npm install`, `npm run build`, `npm run preview`, Lighthouse commands.
- If scores regress after a change: revert last performance patch and re-audit before proceeding.

---

## 11. Progress
- [x] (2026-02-28 12:00Z) Plan drafted with PSI-derived bottlenecks and route-level 90+ gate (`docs/plans/plans/dada-mobile-90plus-performance-exec_plan.md`)
- [x] (2026-02-28 12:09Z) Plan quality pass completed: added audit method, per-route score tracker, milestone exit criteria, and granular progress gates (`docs/plans/plans/dada-mobile-90plus-performance-exec_plan.md`)
- [x] (2026-02-28 13:30Z) Baseline local mobile audit captured for `/` (`docs/plans/plans/verification/perf-90plus-20260228-132832/home.local.mobile.json`)
- [x] (2026-02-28 13:30Z) Baseline local mobile audit captured for `/en/` (`docs/plans/plans/verification/perf-90plus-20260228-132832/en-home.local.mobile.json`)
- [x] (2026-02-28 13:30Z) Baseline local mobile audit captured for `/apartmani-krapinske-toplice` + `/en/apartmani-krapinske-toplice` (`docs/plans/plans/verification/perf-90plus-20260228-132832/*.json`)
- [x] (2026-02-28 13:30Z) Baseline local mobile audit captured for `/book-now` + `/en/book-now` (`docs/plans/plans/verification/perf-90plus-20260228-132832/*.json`)
- [x] (2026-02-28 13:25Z) Hero + apartment image right-sizing implemented and verified (`public/images/**/*.avif`, `src/components/islands/ApartmentGallery.tsx`)
- [x] (2026-02-28 13:22Z) JS critical-chain reductions implemented and verified (`src/components/sections/ContactSection.astro`, `src/components/islands/ApartmentGallery.tsx`)
- [x] (2026-02-28 13:20Z) Progressive map loading implemented and verified (`src/components/sections/ApartmentsSection.astro`, `src/data/apartments.ts`, `src/types/content.ts`)
- [x] (2026-02-28 13:34Z) Booking embed reflow optimization implemented with immediate-load preserved (`src/components/sections/BookingEmbedSection.astro`, `src/pages/booking-widget-embed.astro`, `src/styles/global.css`)
- [x] (2026-02-28 13:30Z) Re-audit iteration #1 complete; score tracker updated for all routes (`docs/plans/plans/verification/perf-90plus-20260228-132832/*.json`)
- [/] (2026-02-28 13:35Z) Re-audit iteration #2 complete; 4/6 routes at full gate, `book-now` and `/en/book-now` remain below Perf 90 due third-party immediate-load booking runtime (`docs/plans/plans/verification/perf-90plus-20260228-133411/*.json`)
- [x] (2026-02-28 12:43Z) Netlify production deploy completed (`deployId=69a2e30441c1ef94c5379212`) and live URL verified (`https://dada-apartments-astro.netlify.app`)
- [x] (2026-02-28 12:47Z) Live Lighthouse evidence archived for all canonical routes (`docs/plans/plans/verification/perf-90plus-live-20260228-134435/*.live.lighthouse.mobile.json`)
- [x] (2026-02-28 12:47Z) Live PSI API evidence archived (quota-exceeded responses recorded) (`docs/plans/plans/verification/perf-90plus-live-20260228-134435/*.live.psi.mobile.json`)
- [ ] Final sign-off: all six routes >= 90 in Perf/A11y/Best/SEO

---

## 12. Decision Log / Surprises
- Decision: Keep immediate booking calendar load on `book-now` despite performance cost.
  Rationale: Explicit product requirement from user.
  Date: 2026-02-28

- Decision: Prioritize oversized image remediation first.
  Rationale: Largest PSI savings and best LCP impact with low UX risk.
  Date: 2026-02-28

- Observation: `book-now` perf remains capped (70/72 local mobile) with high TBT from WebBookingPro bundles despite immediate-load and reflow reductions.
  Evidence: `docs/plans/plans/verification/perf-90plus-20260228-133411/book-now.local.mobile.json`, `docs/plans/plans/verification/perf-90plus-20260228-133411/en-book-now.local.mobile.json`
  Date: 2026-02-28

- Observation: Live audits remain below Perf 90 on `/`, `/en/`, `/book-now`, `/en/book-now`; PSI API returned daily quota-exceeded responses for anonymous requests.
  Evidence: `docs/plans/plans/verification/perf-90plus-live-20260228-134435/live-audit-summary.md`
  Date: 2026-02-28

---

## 13. Plan Revision Note
- 2026-02-28: Created from current PSI findings and mandatory mobile 90+ requirement.
- 2026-02-28: Added strict audit evidence workflow, score tracker, milestone exit criteria, and granular tickable progress gates.
- 2026-02-28: Implemented remediation milestones, logged two local audit iterations, and recorded `book-now` third-party performance cap under immediate-load constraint.
- 2026-02-28: Deployed production, archived live Lighthouse + PSI evidence, and recorded live score outcomes/remaining gaps.
