# Bitcoin Friesland – AI Context
# Language note: keep documentation and comments in English unless a user explicitly requests otherwise.

## Quick facts
- Static multilingual site for Bitcoin Friesland; no build step required (serve HTML/CSS/JS directly). Root `index.html` redirects to Dutch `nl/`.
- Languages live in sibling folders `nl/`, `en/`, `fy/` with matching pages: `index.html`, `business.html`, `consumers.html`, `meetings.html`, `map.html`, `links.html`, `about.html`, `support.html`, `treasure-hunt.html`.
- Brand assets and optimized images live in `assets/images/`; logos/flags use `<picture>` with WebP + PNG fallbacks and explicit width/height.
- `assets/styles.css` is a minified Tailwind output plus a few custom blocks (links page, telegram CTA, etc.). `assets/main.js` holds all runtime behavior.

## Runtime behavior (assets/main.js)
- Initializes desktop navigation at DOMContentLoaded and updates only when crossing the 1200px desktop breakpoint (not on every resize event).
- Toggles language dropdown (`#language-dropdown`) and mobile menu (`#mobile-menu`), keeps their expanded state and controls accessible in the page language, prevents the two menus from overlapping, and closes them with outside clicks or Escape.
- Adds accessible FAQ accordion toggling (show/hide content, answer relationships, expanded state and arrow rotation) where used.
- Caches the header and updates its shadow only when crossing the top-of-page boundary, using a passive scroll listener.
- Makes tables sortable by clicking headers or using Enter/Space (adds localized accessible labels, `.sort-indicator` spans and `aria-sort` on DOMContentLoaded; first use sorts ascending and respects the page language).
- Runs the supporter signup popup and routes the generic form's supporter choice into that complete flow.
- Supporter validation is step-aware: JS sets noValidate, then explicitly validates details/preferences and reveals invalid steps before focusing fields. Trim required names/addresses. Postal fields are disabled for pickup so FormData excludes them, but values remain available if mail is reselected.
- Keep form logic centralized: `advanceStep` handles both Enter and next buttons, `validateFields` handles normalization/native validity/focus, and `markFormSubmitting` supplies both forms' localized busy state. Named step constants and cached static panels/address fields live inside the supporter initializer.
- Marks matching navigation links as the current page and shows an accessible busy state while support forms are being submitted.
- A pageshow handler restores pending submit buttons after Back/forward navigation. A localized, diacritic-insensitive search filters the first four columns of the existing business table; all rows remain visible without JavaScript. Static skip links target main-content on every language page.

## Content rules and patterns
- Always update all three languages together; keep navigation, hero blocks, CTA buttons, and footers structurally identical across languages.
- Footer must include the risk warning block (NL/EN/FY translations) and the GitHub “Fork” link. Avoid page-specific footer edits—update all pages together.
- Images:
  - Logos/flags/icons: PNG is fine (single size) with explicit width/height; wrap in `<picture>` only if WebP is available.
  - Photos/illustrations: generate width variants 320/480/640/960/1280 in both WebP and JPEG, named `...-<width>.webp|jpg`. Use `<picture>` with WebP `srcset` + JPEG `srcset` and `sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"`. Fallback `src` can be the 640 variant. Always set dimensions on `<img>`.
- Navigation: desktop `.nav-menu` (hidden on mobile), mobile hamburger with `#mobile-menu`, and a flag-based language dropdown.
- Workflow: commit and push to the working feature branch, then open a pull request. Never push directly to main; AGENTS.md is the authoritative workflow.

## Maintenance scripts (Node, no deps required)
- `maintain-pages.cjs`: `node maintain-pages.cjs consumer|business|all` tweaks consumer/business pages (terminology, Coinos links, translation phrasing).
- `maintain-footer.cjs`: `text` replaces old strings in map pages only; `warning` scans all language HTML using markup-specific replacements. See MAINTENANCE.md before running legacy editing scripts.
- `translations-restore.cjs`: Restores EN/FY translations for `map.html` strings and business type labels.
- `translations-frisian.cjs`: Applies additional Frisian translations to `fy/map.html`.
- `audit-site.cjs`: Read-only audit for SEO/social metadata, JSON-LD syntax, image dimensions and alt text, local references, language parity, canonical sitemap URLs, shared asset versions and LLM discovery files.
- `node --test audit-site.test.cjs`: Regression tests for the audit using temporary site copies (Node.js 20+). See MAINTENANCE.md for coverage and limitations.
- `node --test maintenance.test.cjs`: CLI safety and preview staging checks. The Site quality GitHub workflow runs these with the audit tests on PRs and pushes to the working branch/main.
- `node prepare-preview.cjs`: Creates a fresh temporary public-file staging directory with preview-only noindex headers. Deploy that directory to the existing preview site; never deploy it to production.

## Source layout notes
- The three about pages contain the community introduction, joining information and contact links. Their Organization and AboutPage JSON-LD nodes share a stable organization identifier across languages.
- Every community Organization node, including nested article authors/publishers and event organizers, uses `https://bitcoinfriesland.com/#organization` and the root homepage URL. Keep external organizers separate. About pages explain how to check changing information and report corrections; MAINTENANCE.md records the GEO maintenance and measurement approach.
- CSS: `assets/styles.css` (minified Tailwind + a few custom rules) is linked by all pages.
- Supporter page styling uses prefixed `.support-*` classes at the bottom of `assets/enhancements.css`. The three support pages include the same spam-protected Netlify Form named `support-interest`, with a hidden language field and localized feedback.
- JS: `assets/main.js` holds runtime behavior; no other bundles are used. HTML references to `main.js` and `enhancements.css` use a shared date-based cache-busting query and should be bumped together after asset changes.
- Load main.js with `defer` in the head: it downloads early and runs after parsing, before DOMContentLoaded. Do not use `async`; initialization depends on the DOM. Map iframes use native lazy loading; the first visible meeting poster uses high fetch priority and eager loading.
- `robots.txt` and `sitemap.xml` exist in the repo root; update if adding/removing public pages. Keep only canonical, indexable URLs in the sitemap.
- `llms.txt` follows the v2 proposal and links to concise `.html.md` counterparts for core pages. Core HTML pages expose them with `rel="alternate" type="text/markdown"`; all public HTML pages expose `/llms.txt` with `rel="describedby"`.

## How to work on the site
- No build pipeline needed; edit HTML/CSS/JS directly in language folders and `assets/`.
- When adding sections or pages, copy an existing page as a template to preserve nav/footer/risk warning and then translate content for NL/EN/FY.
- Keep tables and CTA blocks consistent across languages. Current map listings are maintained in HTML; there is no `data-businesses.js` source in this repository.
- Test by serving the repository root over HTTP; verify language dropdown, mobile nav, table sorting, and `<picture>` fallbacks.
