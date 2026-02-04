# Bitcoin Friesland – AI Context

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
- Images must stay optimized (small/logo variants for nav/flags; WebP preferred). Maintain explicit dimensions on `<img>` and keep using `<picture>` wrappers for WebP + PNG.
- Navigation: desktop `.nav-menu` (hidden on mobile), mobile hamburger with `#mobile-menu`, and a flag-based language dropdown.

## Maintenance scripts (Node, no deps required)
- `maintain-pages.cjs`: `node maintain-pages.cjs consumer|business|all` tweaks consumer/business pages (terminology, Coinos links, translation phrasing).
- `maintain-footer.cjs`: `node maintain-footer.cjs text|warning|all` updates footer copyright/GitHub link and injects risk warnings into every page.
- `translations-restore.cjs`: Restores EN/FY translations for `map.html` strings and business type labels.
- `translations-frisian.cjs`: Applies additional Frisian translations to `fy/map.html`.
- `data-businesses.js`: Structured list of Bitcoin-accepting businesses (name, URL, type, address, city, btcmap/onchain/lightning flags); currently used as reference data for the map tables.

## Source layout notes
- `assets/index-*.js` and `assets/index-*.css` are generated/minified bundles referenced by some pages; `assets/styles.css` is the primary stylesheet linked throughout.
- `robots.txt` and `sitemap.xml` exist in the repo root; update if adding/removing public pages.
- `systemPatterns.md` and `techContext.md` capture historical patterns and image guidelines (three-language rule, image sizing/optimization commands). Keep new changes consistent with those expectations.

## How to work on the site
- No build pipeline needed; edit HTML/CSS/JS directly in language folders and `assets/`.
- When adding sections or pages, copy an existing page as a template to preserve nav/footer/risk warning and then translate content for NL/EN/FY.
- Keep tables and CTA blocks consistent across languages; if adding data-driven sections (e.g., map listings), prefer generating HTML from structured data (see `data-businesses.js`) and apply translation scripts afterward.
- Test by opening the HTML files in a browser; verify language dropdown, mobile nav, table sorting, and `<picture>` fallbacks.
