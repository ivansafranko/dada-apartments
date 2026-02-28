# Dada Apartments - Astro Website

Astro migration of the Apartments Dada website with:
- Astro static pages
- React islands for interactive UI (`client:visible` / `client:idle`)
- Tailwind CSS v4 with tokenized `@theme` styling
- SEO + structured data centralization
- Performance integrations (`astro-critters`, `@playform/compress`)

## Routes
- `/`
- `/en/`
- `/book-now`
- `/en/book-now`
- `/apartmani-krapinske-toplice`
- `/en/apartmani-krapinske-toplice`
- `/thank-you`
- `/en/thank-you`

## Project structure
- `src/pages` - route pages
- `src/layouts` - layout shell
- `src/components` - layout/sections/seo/islands
- `src/data` - typed locale and content data
- `src/styles` - global Tailwind v4 styles and design tokens
- `public` - static assets (`images`, `icon.svg`, `robots.txt`, `site.webmanifest`)

## Commands
```bash
npm install
npm run dev
npm run build
npm run preview
npx astro check
```

## Notes
- Canonical and legacy redirects are controlled in `netlify.toml`.
- `PUBLIC_GA_MEASUREMENT_ID` can be set to enable deferred analytics loading.
