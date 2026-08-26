# Apartmani Dada — Pre-Astro Static Baseline

Captured: 2026-08-26 (Europe/Zagreb)  
Branch: `astro-migration`  
Purpose: Reference point for the Astro migration before application implementation.

## Repository state

- The project is a dependency-free static HTML/CSS/JavaScript site.
- No `package.json`, lockfile, Astro config, TypeScript config, build script, or test setup exists.
- Current branch: `astro-migration`.
- The working tree contained no tracked application modifications at capture time; this baseline document is the only new capture artifact.
- `main` remains the recovery baseline.

## Public route baseline

| Request/path | Current behavior/source | Expected migration preservation |
|---|---|---|
| `/` | Homepage from root `index.html` | Real homepage and sole landing page. |
| `/index.html` | Direct static-file URL may be served by root publishing | Decide whether to preserve or redirect after Astro output is verified. |
| `/book-now` | Netlify status-200 rewrite to `/book-now.html` | One public booking URL: `/book-now`. |
| `/book-now/` | Directory index at `book-now/index.html` under root publishing | Redirect to `/book-now`; do not serve a second booking page. |
| `/book-now.html` | Root duplicate of booking page | Redirect to `/book-now`; retire only after preview verification. |
| `/success` | Netlify status-200 rewrite to missing `/success.html` | Keep inline form success behavior; do not create `success.html` unless separately approved. |
| `/apartmani-krapinske-toplice` and variants | Live inspection found a separate landing page at `https://apartments-dada.com/apartmani-krapinske-toplice`; no matching local source found | Must not render; local Netlify 410 rules now cover exact and trailing-slash paths. Verify after deployment and follow up in Google Search Console. |

Existing homepage anchors: `#home`, `#apartments`, `#about`, `#contact`.

## Current page structure

### Homepage (`index.html`)

1. Header/navigation with desktop and mobile modes, language buttons, booking link, and contact link.
2. Hero with Croatian-first heading, descriptive copy, CTA, and CSS-background hero image.
3. Apartment section with four properties in two location groups.
4. Two location descriptions and Google Maps embeds.
5. About section with three benefit cards.
6. Testimonials for Jana, Tamara, and Darko.
7. Contact section with Netlify form and phone/email/location details.
8. Footer with Facebook link, copyright, and back-to-top control.

### Booking page (`book-now/index.html` and `book-now.html`)

- Shared header and footer.
- Booking heading and intro.
- `#wbproot` WebBookingPro mount point.
- WebBookingPro browser bootstrap and shared `script.js`.

The two booking files are identical by SHA-1 and size at capture time.

## Content and data baseline

- Four properties:
  - Dada Apartment 1 — 50m² — rating 9.8 — Ul. Antuna Mihanovića 3H.
  - Dada Apartment 2 — 70m² — rating 9.8 — Ul. Antuna Mihanovića 3H.
  - Studio Apartman Šafranko — 25m² — rating 9.4 — Ul. Ksavera Šandora Đalskog 2.
  - Soba Šafranko — 17m² — rating 9.4 — Ul. Ksavera Šandora Đalskog 2.
- Each property has a local WebP gallery, amenities, descriptive alt text, and Booking.com link.
- Current translations are Croatian (`hr`, default) and English (`en`) in `script.js`.
- Current language preference key: `preferredLanguage` in `localStorage`.
- Current testimonials, contact text, location text, form labels, metadata, and amenity labels are all sourced from the HTML/translation object.
- FAQ answers are to be sourced from the current project as confirmed by the user; do not invent replacement copy.
- Stitch legal links will use placeholder pages at `/terms`, `/privacy`, and `/cookies`.

## Integration baseline

- Google Analytics: `G-8QBRR4GF05` loaded from Google Tag Manager script on the homepage.
- Netlify Forms: form name `contact-form`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, fields `name`, `email`, `checkin`, `checkout`, and `message`.
- Current form submission: JavaScript `fetch('/')` with URL-encoded `FormData`; inline success message; alert-based error/validation messages.
- Flatpickr: loaded from jsDelivr with Croatian locale; used for date fields and language locale changes.
- Lucide: loaded from unpkg for icons.
- Flag Icons: loaded from jsDelivr for language controls.
- WebBookingPro: `https://booking.webbookingpro.com/asset-manifest.json`; hotel ID `33781`; EUR; browser language `hr`/`en`; mount point `#wbproot`.
- Booking.com: two existing share URLs, one for the city-center properties and one for Šafranko properties.
- Google Maps: two lazy-loaded iframe embeds, one for each location.
- Facebook: `https://www.facebook.com/apartman.dada`.
- Fonts currently used: Inter and Poppins. Stitch reference uses Playfair Display and Plus Jakarta Sans; migration decision is to adopt the Stitch fonts.

## SEO baseline

- Homepage canonical: `https://apartments-dada.com/`.
- Booking canonical: `https://apartments-dada.com/book-now`.
- Hreflang intent: Croatian default, English `?lang=en`, and `x-default`.
- Homepage has title, description, keywords, author, robots, Open Graph, Twitter metadata, manifest, favicon, and two `LodgingBusiness` JSON-LD records.
- Booking page has route-specific title, description, canonical, hreflang, Open Graph, and Twitter metadata.
- Sitemap contains `/` and `/book-now`.
- `robots.txt` allows crawling and points to the sitemap.
- Current homepage heading semantics need correction during migration: logo uses `h1`, while the hero uses `h2`.
- No local or repository reference to `apartmani-krapinske-toplice` was found during capture.

## Asset baseline

- 20 local WebP images: one hero image and 19 apartment images.
- `icon.svg`, `site.webmanifest`, `robots.txt`, and `sitemap.xml` are present.
- Current hero image is referenced as a CSS background in `styles.css`; apartment images are HTML `<img>` elements.
- Existing image files must remain recoverable and public URLs must not change without approval.

## Behavior baseline

`script.js` currently provides language switching and persistence, metadata updates, Flatpickr initialization/localization, smooth scrolling, hero CTA scrolling, gallery controls, testimonial styling, Netlify form validation/submission/status, header scroll styling, image loading behavior, back-to-top, mobile menu, and mobile/desktop language-toggle synchronization.

## Source checksums

SHA-1 checksums captured before Astro implementation:

```text
02aa152c0272a81017c02940ba65c7116e9f41a4  index.html
1c50399cf7131751092b2bf646aa2f84df282b80  book-now/index.html
1c50399cf7131751092b2bf646aa2f84df282b80  book-now.html
db8a908b379466b1db1c00be7e916c6aa1cd1192  styles.css
1b5a0c2ac2bb80ee0b8843b3dff928335eb4ed6c  script.js
3b908275c84c61a734099919dfd717bef55f662a  netlify.toml
3df3e578b044ca185b3399ecaaa6363d8822968d  robots.txt
0d92e646127c598065d66370a7b7519727b6d7bd  sitemap.xml
e58d9c0ba8e4d077b50840bd04f967b77fb1d12d  site.webmanifest
1cb10288c424123d09fc5bfb33e9548f568fa225  icon.svg
```

The 20 image checksums are captured in the command history for this baseline and should be regenerated before any asset transformation. The source inventory contains 20 WebP images and no local fonts.

## Baseline limitations

- This is a repository/configuration baseline; Google Search Console was not accessed during this ticket.
- Live public inspection confirmed the obsolete landing page URL; production status after the new local 410 rules deploy remains an ASTRO-003 verification task.
- Browser screenshots and live form/booking submissions require a running/deployed site and are acceptance tasks after the Astro foundation exists.
