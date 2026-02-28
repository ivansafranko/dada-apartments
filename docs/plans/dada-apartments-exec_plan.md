# Dada Apartments Website - Execution Plans (ExecPlans)
LAST UPDATED AT: 2026-02-28 13:00:00 UTC

This document defines how execution plans are authored and executed in Astro web projects. The reader has only the current working tree and this plan - there is no memory of prior work.

---

## How to Use ExecPlans

- **Storage:** `docs/plans/` - filenames must include `exec_plan` (e.g., `hero-redesign-exec_plan.md`).
- **Authoring:** Start from the skeleton. Keep the plan self-contained and updated as work evolves.
- **Executing:** Proceed milestone-by-milestone. Update `Progress` and `Decision Log` at each stopping point.
- **Handoffs:** A reviewer should be able to restart from the plan alone.

---

## Guardrails - Non-Negotiable

1) **Single Behavior Path:** No dual paths or parallel implementations. Remove dead code in the same change.

2) **Islands Architecture:** Interactive parts use React islands via `client:*` directives. Static content stays as `.astro` components. Never wrap an entire page in a framework.

3) **No Layout Shift:** Reserve explicit dimensions for images, videos, and embeds. Use `width`/`height` or CSS `aspect-ratio`.

4) **Graceful Failure:** Forms, API calls, and dynamic content handle errors without breaking the page. Show loading/error states where applicable.

5) **Performance by Default:** Lighthouse 90+ is a release gate, not a nice-to-have. Every canonical route must hit **90+ on mobile** for Performance, Accessibility, Best Practices, and SEO before release. Use `astro-critters` for critical CSS, `@playform/compress` for minification, and optimized images.

6) **Responsive First:** Layouts work at 320px, 768px, and 1280px+. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) consistently.

7) **No Render-Blocking Resources:** Fonts use `display=swap`/`display=block` with preconnect. Third-party scripts are deferred. Critical CSS is inlined at build time.

8) **Semantic HTML & Accessibility:** Use proper HTML5 elements. Keyboard-accessible interactives. Meaningful `alt` text. Logical heading hierarchy. WCAG AA color contrast (4.5:1 text, 3:1 large text). Touch targets >= 44x44px.

9) **SEO Is Not Optional:** Every page needs unique `<title>`, meta description, Open Graph tags, and structured data where applicable.

10) **Asset Optimization:** Modern image formats (WebP/AVIF). `loading="lazy"` below the fold. `fetchpriority="high"` for LCP images.

11) **Design Tokens:** Colors, fonts, and spacing live in `@theme` or CSS custom properties - no magic numbers in components.

12) **Security Basics:** No secrets in client code. External links use `rel="noopener noreferrer"`. Forms validate input. Sensitive config uses environment variables.

---

## Repo Context (Fill First)

Record the repo's conventions before planning. This prevents accidental "rewrite-by-plan".

| Area | Convention |
|---|---|
| **Framework** | Astro version, TypeScript mode (strict/relaxed) |
| **Styling** | Tailwind version (v3 config vs v4 `@theme`), custom CSS approach |
| **Islands** | React / Vue / Svelte - version, `client:` directive patterns |
| **Structure** | Pages, layouts, components, styles - naming conventions |
| **Build Integrations** | astro-critters, @playform/compress, sitemap, etc. |
| **Fonts** | Google Fonts / @fontsource / local - loading strategy |
| **Images** | Astro `<Image>` / manual `<img>` / CDN |
| **i18n** | Single language or multi-language routing |
| **Forms** | Netlify Forms / Formspree / custom API |
| **Analytics** | GA / Plausible / none - loading strategy |
| **Deployment** | Netlify / Vercel / Cloudflare - build command, env vars |
| **CMS** | Decap / Strapi / content collections / none |
| **SEO** | Sitemap, robots.txt, structured data, OG defaults |
| **Dev Commands** | `npm run dev`, `npm run build`, `npm run preview`, custom |

---

## Skeleton (Section Order)

Delete unused sections rather than leaving them empty.

1. Ticket Intake Checklist
2. Summary & Scope
3. Affected Pages, Components & Routes
4. Component Architecture & Islands
5. Styling & Responsive Design
6. Data & Content
7. SEO & Meta Tags
8. Performance & Core Web Vitals
9. Error Handling & UX States
10. Plan of Work
11. Concrete Steps
12. Testing & Acceptance
13. Risks & Mitigations
14. Idempotence & Recovery
15. Progress
16. Decision Log / Surprises
17. Outcomes & Retrospective
18. Plan Revision Note

---

## Ticket Intake Checklist (Fill before planning)

- Ticket ID and title:
- User-visible behavior:
- Pages/routes involved:
- Components to create or modify:
- Design reference (Figma/screenshot/description):
- Content source (CMS, static, API):
- SEO requirements:
- Responsive/accessibility requirements:
- Performance constraints (image-heavy? animation-heavy?):
- Deployment target:

---

## Affected Pages, Components & Routes

| Type | File | What changes |
|---|---|---|
| Page | `src/pages/index.astro` | |
| Layout | `src/layouts/Layout.astro` | |
| Component | `src/components/Hero.astro` | |
| New route | `src/pages/about.astro` | |
| Removed | - | Redirect needed? |

---

## Component Architecture & Islands

- **Props interfaces:** Document TypeScript interfaces for components that accept props
- **Slot usage:** Document `<slot />` patterns for composition
- **Island directives** (only for interactive components):
  - `client:load` - needed immediately (above-fold interactivity)
  - `client:idle` - needed after page idle (forms, non-critical)
  - `client:visible` - needed when scrolled into view
  - `client:media` - needed at specific viewport sizes

---

## Styling & Responsive Design

- **Utilities first:** Tailwind classes in markup; `@apply` only for reusable patterns in `global.css`
- **Tokens:** Colors, fonts, spacing in `@theme` block in `global.css`
- **Breakpoints:** Mobile-first - `sm:` -> `md:` -> `lg:` -> `xl:`
- **Custom CSS:** Only for patterns Tailwind can't handle (complex animations, pseudo-elements)

### Responsive Checklist
- [ ] 320px (small mobile)
- [ ] 375px (standard mobile)
- [ ] 768px (tablet)
- [ ] 1024px (laptop)
- [ ] 1280px+ (desktop)

---

## SEO & Meta Tags

For every new or modified page:

- **Title:** unique, under 60 characters
- **Meta description:** under 160 characters
- **Open Graph:** `og:title`, `og:description`, `og:image`, `og:url`
- **Heading hierarchy:** single `h1`, logical nesting
- **Structured data:** JSON-LD where applicable
- **Image alt text:** descriptive, keyword-aware

---

## Performance & Core Web Vitals

| Metric | What to check |
|---|---|
| **LCP** | Identify LCP element. Preload with `fetchpriority="high"`. Don't lazy-load above-fold images. |
| **CLS** | Reserve dimensions for images/embeds. Font loading doesn't cause layout shift. |
| **INP** | Minimize client JS (islands). Defer non-critical scripts. No long synchronous operations. |
| **Build** | `astro-critters` inlines critical CSS. `@playform/compress` minifies output. Images use modern formats. |

---

## Error Handling & UX States

- **Form failure:** inline error, preserve input, allow retry
- **Image failure:** `alt` text shown, no broken icons
- **API error:** user-friendly message with retry
- **404:** custom `src/pages/404.astro` with navigation back

---

## Plan of Work

For each change: exact file path, what to modify, and why. Use repo-relative paths.

> **Example format** (replace with ticket-specific work):

### Pages
- Edit `src/pages/index.astro` - add/reorder component imports

### Layout
- Edit `src/layouts/Layout.astro` - update `<head>` meta or preload hints

### Components
- Edit `src/components/Hero.astro` - update markup, responsive classes, image optimization
- Add `src/components/NewSection.astro` - define props, markup, Tailwind classes

### Islands
- Add `src/components/ContactForm.tsx` - validation, loading/error states, use `client:visible`

### Styles
- Edit `src/styles/global.css` - add/modify `@theme` tokens or component CSS

### Config & Assets
- Edit `astro.config.mjs` - add integrations or Vite plugins
- Add files to `public/` - images, favicon, robots.txt

---

## Concrete Steps

### Build & Verify
```
npm install                    # Install dependencies
npm run dev                    # Dev server -> http://localhost:4321
npm run build                  # Production build -> dist/
npm run preview                # Preview production build
npx astro check                # TypeScript check (if applicable)
```

### Lighthouse Audit
Run on production preview (Incognito mode) or:
```
npx lighthouse http://localhost:4321 --form-factor=mobile
```
Target: **90+ mobile** across Performance, Accessibility, Best Practices, SEO for each canonical route.

---

## Testing & Acceptance

### Visual Testing
- [ ] Site loads in dev (`npm run dev`) and production preview (`npm run preview`)
- [ ] No horizontal scroll, overlapping elements, or broken images
- [ ] Responsive checklist passes (320px, 768px, 1280px)
- [ ] Tested in Chrome + one other browser

### Functional Testing
- [ ] All navigation links work
- [ ] Smooth scroll anchors hit correct sections
- [ ] Mobile menu opens/closes correctly
- [ ] Forms submit and show feedback
- [ ] Interactive islands hydrate and work

### Accessibility Testing
- [ ] Tab through page - logical focus order
- [ ] Browser zoom 200% - nothing breaks
- [ ] Color contrast verified (DevTools or axe)
- [ ] Heading hierarchy checked

### Lighthouse Scores
- [ ] Performance: 90+ (mobile, each canonical route)
- [ ] Accessibility: 90+ (mobile, each canonical route)
- [ ] Best Practices: 90+ (mobile, each canonical route)
- [ ] SEO: 90+ (mobile, each canonical route)

### Pre-Deploy
- [ ] `npm run build` succeeds, no errors
- [ ] Production preview verified in browser
- [ ] No console errors in DevTools
- [ ] Meta tags and SEO verified

### Post-Deploy
- [ ] Live URL loads correctly
- [ ] Forms/interactivity work in production
- [ ] Lighthouse on live URL meets 90+ mobile targets for every canonical route

---

## Risks & Mitigations

> **Example entries** (replace with ticket-specific risks):

- **Tailwind class conflicts** -> use specific classes, avoid `!important`, test all breakpoints
- **Critical CSS breaks above-fold** -> verify with `npm run preview`; temporarily disable critters to debug
- **Large images slow LCP** -> optimize before adding; WebP/AVIF; explicit dimensions; preload LCP
- **Island hydration mismatch** -> ensure server HTML matches client render; test in production preview
- **Font flash (FOUT/FOIT)** -> `display=swap`/`display=block` + preconnect; inline font-face fallback

---

## Idempotence & Recovery

- **Safe to re-run:** `npm install`, `npm run dev`, `npm run build`, `npm run preview`
- **Build fails:** check terminal for specific errors; fix and rebuild
- **Corrupted node_modules:** delete `node_modules` + `package-lock.json`, then `npm install`
- **Bad dist output:** delete `dist/`, rebuild

---

## Progress (Required Format)

Checkboxes with timestamps. Reference at least one file path per item. Split partial work into done vs remaining.

> **EXAMPLE - replace with ticket-specific progress.**

- [x] (2026-02-25 14:00Z) Plan drafted (`docs/plans/WEB-01-hero-exec_plan.md`)
- [/] Hero section (done: layout + responsive; remaining: animations) (`src/components/Hero.astro`)
- [ ] Contact form validation (`src/components/Contact.astro`)

---

## Decision Log / Surprises

> **EXAMPLE - replace with ticket-specific entries.**

- **Decision:** Use Astro `<Image>` instead of `<img>` for hero
  **Rationale:** Automatic WebP/AVIF + responsive srcset
  **Date:** 2026-02-25

- **Observation:** `<fill after inspection>`
  **Evidence:** `<file path + note>`

---

## Plan Revision Note

- 2026-02-25: Created - adapted from Android/Kotlin ExecPlan for Astro web projects.
- 2026-02-25: v2 - merged duplicate sections (Validation into Testing & Acceptance, Security into guardrail #8 + testing checklist), consolidated Lighthouse targets to one location, reordered sections to match skeleton, simplified Repo Context to table format, removed redundant accessibility section (covered by guardrail #8 + testing checklist).
- 2026-02-28: Renamed for Dada Apartments website and added to `docs/plans/`.
- 2026-02-28: Elevated Lighthouse 90+ mobile from guideline to mandatory release gate for every canonical route.
