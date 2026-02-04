# Bitcoin Friesland – AI Context
# Language note: keep documentation and comments in English unless a user explicitly requests otherwise.

## Quick facts
- Static multilingual site for Bitcoin Friesland; no build step required (serve HTML/CSS/JS directly). Root `index.html` redirects to Dutch `nl/`.
- Languages live in sibling folders `nl/`, `en/`, `fy/` with matching pages: `index.html`, `business.html`, `consumers.html`, `meetings.html`, `map.html`, `links.html`, `about.html`, `treasure-hunt.html`.
- Brand assets and optimized images live in `assets/images/`; logos/flags use `<picture>` with WebP + PNG fallbacks and explicit width/height.
- `assets/styles.css` is a minified Tailwind output plus a few custom blocks (links page, telegram CTA, etc.). `assets/main.js` holds all runtime behavior.

## Runtime behavior (assets/main.js)
- Forces the desktop nav menu visible on widths >= 768px.
- Toggles language dropdown (`#language-dropdown`) and mobile menu (`#mobile-menu`); closes dropdown on outside click.
- Adds FAQ accordion toggling (show/hide content + arrow rotation) where used.
- Adds header shadow on scroll.
- Makes tables sortable by clicking headers (adds `.sort-indicator` spans on DOMContentLoaded; defaults to toggling asc/desc).

## Content rules and patterns
- Always update all three languages together; keep navigation, hero blocks, CTA buttons, and footers structurally identical across languages.
- Footer must include the risk warning block (NL/EN/FY translations) and the GitHub “Fork” link. Avoid page-specific footer edits—update all pages together.
- Images:
  - Logos/flags/icons: PNG is fine (single size) with explicit width/height; wrap in `<picture>` only if WebP is available.
  - Photos/illustrations: generate width variants 320/480/640/960/1280 in both WebP and JPEG, named `...-<width>.webp|jpg`. Use `<picture>` with WebP `srcset` + JPEG `srcset` and `sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"`. Fallback `src` can be the 640 variant. Always set dimensions on `<img>`.
- Navigation: desktop `.nav-menu` (hidden on mobile), mobile hamburger with `#mobile-menu`, and a flag-based language dropdown.

## Maintenance scripts (Node, no deps required)
- `maintain-pages.cjs`: `node maintain-pages.cjs consumer|business|all` tweaks consumer/business pages (terminology, Coinos links, translation phrasing).
- `maintain-footer.cjs`: `node maintain-footer.cjs text|warning|all` updates footer copyright/GitHub link and injects risk warnings into every page.
- `translations-restore.cjs`: Restores EN/FY translations for `map.html` strings and business type labels.
- `translations-frisian.cjs`: Applies additional Frisian translations to `fy/map.html`.
- `data-businesses.js`: Structured list of Bitcoin-accepting businesses (name, URL, type, address, city, btcmap/onchain/lightning flags); currently used as reference data for the map tables.

## Source layout notes
- CSS: `assets/styles.css` (minified Tailwind + a few custom rules) is linked by all pages.
- JS: `assets/main.js` holds runtime behavior; no other bundles are used.
- `robots.txt` and `sitemap.xml` exist in the repo root; update if adding/removing public pages.
- (Historic references `systemPatterns.md` and `techContext.md` were removed; keep AI guidance here.)

## How to work on the site
- No build pipeline needed; edit HTML/CSS/JS directly in language folders and `assets/`.
- When adding sections or pages, copy an existing page as a template to preserve nav/footer/risk warning and then translate content for NL/EN/FY.
- Keep tables and CTA blocks consistent across languages; if adding data-driven sections (e.g., map listings), prefer generating HTML from structured data (see `data-businesses.js`) and apply translation scripts afterward.
- Test by opening the HTML files in a browser; verify language dropdown, mobile nav, table sorting, and `<picture>` fallbacks.
