# SEO Execution Plan (Ticket-Style)

**Project:** Apartments Dada (`apartments-dada.com`)  
**Primary goal:** Improve rankings for **“apartmani krapinske toplice”** (and close variants) while keeping UX fast and clean.  
**Last updated:** 2026-01-29

---

## Assumptions / Notes

- Site is deployed on Netlify with branch deploys and redirects configured in `netlify.toml`.
- The website currently has both “pretty” routes and “.html” files (e.g. `/book-now` → `/book-now.html`, `/apartmani-krapinske-toplice` → `/apartmani-krapinske-toplice.html`).
- English is currently implemented via client-side language switching; this is **not ideal** for indexable EN SEO.

---

## P0 — Critical (Do first)

### [x] P0-1 Canonical URL consolidation (remove duplicates)
**Problem:** Same content can be accessed via multiple URLs (e.g. `/index.html` vs `/`, `/apartmani-krapinske-toplice` vs `/apartmani-krapinske-toplice.html`, etc.).  
**Impact:** Dilutes ranking signals, increases duplicate indexing risk, wastes crawl budget.  
**Effort:** S (1–2h)

**Work items**
- Add Netlify **301** redirects to enforce one canonical URL per page:
  - `/index.html` → `/` (301)
  - `/apartmani-krapinske-toplice.html` → `/apartmani-krapinske-toplice` (301)
  - `/book-now.html` → `/book-now` (301)
  - Decide canonical trailing slash behavior and redirect consistently:
    - Prefer no trailing slash for these routes: `/book-now` and `/apartmani-krapinske-toplice`
    - Redirect `/book-now/` → `/book-now` (301) (and same for landing)
- Ensure internal links point to canonical URLs (not “.html” variants).

**Acceptance criteria**
- Opening all duplicate variants ends at the canonical URL (301, not 200 rewrite).
- Only one indexable URL per page is discoverable via internal links.
- Canonical tags match the chosen canonical URLs.

---

### [x] P0-2 Sitemap + robots verification and completeness
**Problem:** If sitemap/robots are incomplete, Google may crawl/index slower; new pages can be missed.  
**Impact:** Slower indexing, weaker internal structure signals.  
**Effort:** S (1–2h)

**Work items**
- Ensure `robots.txt` contains:
  - `User-agent: *`
  - `Allow: /`
  - `Sitemap: https://apartments-dada.com/sitemap.xml`
- Expand `sitemap.xml` to include **all** indexable pages:
  - `/`
  - `/apartmani-krapinske-toplice`
  - `/book-now`
  - (add others you want indexed; avoid thin/duplicate utility pages)
- Update `<lastmod>` on meaningful content changes.

**Acceptance criteria**
- `https://apartments-dada.com/robots.txt` loads and references the sitemap.
- `https://apartments-dada.com/sitemap.xml` loads and includes canonical URLs.

---

### [x] P0-3 Fix “anchor hidden under header” globally
**Problem:** Fixed header can hide anchor targets after clicking nav or deep links.  
**Impact:** UX friction → worse engagement signals, higher bounce risk.  
**Effort:** S (30–60m)

**Work items**
- Add `scroll-margin-top` to anchor sections:
  - `#about`, `#apartments`, `#contact`, and any other `id` used in nav

**Acceptance criteria**
- Clicking header links lands with the target heading visible (not under header) on desktop and mobile.

---

## P1 — High priority (Next)

### [x] P1-1 Split English into crawlable URLs (i18n done “right”)
**Problem:** English content is currently JS-switched on the same URL; search engines may not index the EN variant reliably.  
**Impact:** Weak EN SEO; potential confusion for locale targeting.  
**Effort:** M–L (2–5 days depending on scope)

**Work items**
- Create `/en/` versions of key pages (server-delivered HTML):
  - `/en/` (homepage)
  - `/en/apartments-krapinske-toplice` (landing)
  - `/en/book-now` (booking info + widget)
- Add correct `hreflang` pairs:
  - HR page → EN page and EN page → HR page
  - Include `x-default`
- Decide whether to keep JS language toggle:
  - Option A: Keep, but change it to navigate between `/` and `/en/`
  - Option B: Keep only on HR and link to EN explicitly

**Acceptance criteria**
- Each language has its own unique URL and HTML source (title/description/body) without relying on JS for first render.
- `hreflang` is present and correct on both sides.

---

### [ ] P1-2 Strengthen “book-now” page as an SEO-safe transactional page
**Problem:** Widget-only pages can be thin/slow; third-party scripts can hurt CWV and indexability.  
**Impact:** Lower quality signals; weaker conversions if the widget loads slowly.  
**Effort:** M (0.5–1 day)

**Work items**
- Add a short content block above the widget:
  - What guests can book here (apartments + room)
  - What’s included (WiFi, AC, parking)
  - How to book (online + phone)
  - Location note (Aquae Vivae + hospital proximity)
- Ensure it’s translated for EN (when P1-1 is done).

**Acceptance criteria**
- Booking page has meaningful text content and clear CTAs even if the widget is slow.

---

## P2 — Medium priority (Improvements)

### [ ] P2-1 Structured data upgrades
**Problem:** You have LodgingBusiness + FAQ; there are more schema types that can strengthen understanding.  
**Impact:** Better entity clarity; possible richer results.  
**Effort:** S–M

**Work items**
- Add `Organization` + `WebSite` schema (logo, contact, social `sameAs`).
- Add `BreadcrumbList` schema on the landing page.
- Confirm NAP consistency (phone/address) across schema blocks and page content.

**Acceptance criteria**
- Schemas validate (Rich Results Test / Schema Validator).

---

### [ ] P2-2 Content improvements for topical authority (cluster strategy)
**Problem:** Competitive query; one landing page may not be enough long-term.  
**Impact:** Builds authority and long-tail traffic; supports primary keyword.  
**Effort:** M–L (ongoing)

**Work items (recommended cluster pages)**
- “Aquae Vivae Krapinske Toplice – vodič za posjet” (and EN version later)
- “Smještaj blizu bolnice u Krapinskim Toplicama – praktične informacije”
- “Krapinske Toplice: što raditi / restorani / parking”

**Acceptance criteria**
- Each page internally links back to the main landing page with descriptive anchor text.

---

## P3 — Low priority / Ongoing

### [ ] P3-1 Backlink & citation plan (without paid tools)
**Problem:** Ranking improvements often require stronger off-site signals.  
**Impact:** Higher authority and stable rankings.  
**Effort:** Ongoing

**Work items**
- Ensure Google Business Profile is complete, updated, and consistently matches NAP.
- Acquire local citations (Croatian directories, tourism portals).
- Ask for reviews and respond to them; add fresh photos regularly.
- Where possible, add links back to your site from partner listings (Booking profiles, local partners).

---

## Execution checklist (recommended order)

1. **P0-1** Canonical 301 redirects + internal link cleanup  
2. **P0-2** Verify robots + expand sitemap  
3. **P0-3** Anchor/scroll-margin fix  
4. **P1-2** Add content block to `/book-now`  
5. **P2-1** Add Organization/WebSite/Breadcrumb schema  
6. **P1-1** Proper EN URLs + hreflang (bigger change; schedule separately)  
7. **P2-2 / P3-1** Content cluster + citations/backlinks

---

## Definition of Done (SEO)

- Canonical URL set is clean, consistent, and enforced via 301s.
- Sitemap lists all canonical indexable pages and updates `lastmod`.
- HR pages rank improvements tracked for: “apartmani krapinske toplice”.
- EN pages (if implemented) are separately indexable and correctly `hreflang` linked.
- CWV monitored and improved for the homepage and landing page.

