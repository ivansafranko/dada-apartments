# Apartments Dada

Static Astro site for Apartments Dada in Krapinske Toplice, Croatia. Production is hosted on Netlify at `https://apartments-dada.com`.

## Prerequisites

- Node.js 18.17 or later
- npm (the committed `package-lock.json` is the dependency source of truth)

## Local development

Install dependencies once, then use the project scripts:

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

`npm run dev` starts the local development server. `npm run check` runs Astro and TypeScript diagnostics. `npm run build` writes the deployable static site to `dist/`; `npm run preview` serves that built output for a local production check.

## Architecture and ownership

| Location | Responsibility |
| --- | --- |
| `src/pages/` | Route entry points and page-specific scripts |
| `src/layouts/BaseLayout.astro` | Document metadata, shared head assets, analytics, header, and footer |
| `src/components/` | Shared header and footer UI |
| `src/data/apartments.ts` | Apartment details, gallery images, and booking links |
| `src/data/translations.ts` | Croatian-default and English runtime copy |
| `src/scripts/` | Browser enhancements for site navigation/language, dates, contact form, and booking widget |
| `src/styles/global.css` | Global design tokens and site styles |
| `public/` | Stable static URLs copied unchanged into `dist/`, including images, favicon, manifest, robots, sitemap, and the 410 document |
| `netlify.toml` | Build settings and public redirect/status behavior |

Use `/images/...` paths for assets that must retain stable public URLs; their source files belong in `public/images/`. Do not add legacy root-published HTML, CSS, JavaScript, or image copies—Netlify deploys only Astro’s generated `dist/` output.

## Routes and URL behavior

- `/` — homepage
- `/book-now/` — canonical booking route
- `/book-now` — normalized to `/book-now/` by Netlify Pretty URLs
- `/book-now.html` — 301 redirect to `/book-now/`
- `/cookies/`, `/privacy/`, `/terms/` — legal pages
- `/apartmani-krapinske-toplice` and its trailing-slash variant — `410 Gone`

Croatian is server-rendered by default. The language control retains the existing runtime English experience using `?lang=en` and `localStorage` (`preferredLanguage`); it does not create separate localized routes.

## Deploying to Netlify

The repository already declares the production build:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Connect the repository in Netlify and use the checked-in `netlify.toml`; no separate publish directory setting should override it. Confirm a deploy preview with `npm run check` and `npm run build` first, then verify `/`, `/book-now/`, `/book-now.html`, the 410 URL, forms, and the third-party booking widget before promoting production.

Netlify Forms notifications are configured in the Netlify site settings, not in source control. The booking widget, Google Analytics, Google Maps, Booking.com links, Lucide icons, Google Fonts, and Flatpickr depend on external services and should be smoke-tested on a deploy preview.

## Recovery

The pre-Astro static implementation was retired under approved cleanup ticket ASTRO-060. Git history is the recovery source: restore a prior revision if comparison or rollback is required. Do not restore legacy files into the current deployment root; a production rollback should instead deploy a known-good Git revision with its matching Netlify configuration.
