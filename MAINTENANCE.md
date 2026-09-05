# Maintenance guide

This is a hand-maintained static website. There is no generator, package manifest or build step. HTML files are the source, not generated output.

## Where to make changes

| Change | Source of truth | Keep in sync |
| --- | --- | --- |
| Page content and shared navigation/footer | HTML in `nl/`, `en/`, `fy/` | All three languages, including nested pages for shared elements |
| Interactive behavior | `assets/main.js` | Matching HTML hooks and localized labels |
| Custom styles | `assets/enhancements.css` | Leave compiled `assets/styles.css` untouched |
| Search and social metadata | Each HTML document's head | Canonical URL, language alternatives, social cards and visible content |
| Public URL inventory | `sitemap.xml` | Canonical, indexable pages only |
| AI-readable summaries | `llms.txt` and `*.html.md` | Actual visible HTML content and alternate links |

When shared assets change, update their date-based `?v=` references across all language pages. Keep each asset's version consistent across pages. Do not change sitemap dates for unrelated tooling or documentation changes.

Dutch blog and event pages currently have no English or Frisian translations. `audit-site.cjs` explicitly lists these existing exceptions; other pages must have all three translations. Do not add an exception merely to silence a missing-translation failure.

## Verification

Use Node.js 20 or newer. No dependency installation is necessary:

```sh
node audit-site.cjs
node --test audit-site.test.cjs
node --check assets/main.js
git diff --check
```

The audit is read-only and resolves files relative to its own location, not the terminal's working directory. It checks all HTML under the three language folders. It reports missing translations, metadata, local file references, image attributes, JSON-LD syntax, duplicate sitemap URLs, versioned shared assets and LLM discovery links.

The regression tests copy relevant site files into temporary directories and intentionally introduce failures. Assets are linked, not copied; neither the tests nor audit writes to them. Temporary fixtures are removed after each test; the working site is not edited.

### What the audit does not prove

- It uses targeted patterns for this site's HTML conventions, not a full HTML/XML parser. Metadata attribute order and double quotes matter to some checks.
- It does not validate external URLs, fragment targets, `srcset` candidates, or the meaning of structured data.
- It does not exercise JavaScript, verify translation accuracy, or measure accessibility, performance or search ranking.
- Root redirect and 404 pages are outside its language-page checks.
- It does not verify deployed redirects, form delivery, payment status or any backend service.

For visitor-facing changes, serve the root with `python3 -m http.server 8000`. Open the changed NL/EN/FY pages on desktop and mobile. Check navigation, language switching, keyboard focus and affected interactions. Local static serving does not reproduce hosted form processing.

## Legacy editing scripts

`maintain-*.cjs` and `translations-*.cjs` are historical text-replacement helpers, not general-purpose formatters or safe automatic synchronization. Run them from the repository root on a clean feature branch, inspect their code first, and review `git diff` afterward.

- `maintain-footer.cjs text` only updates matching old copyright strings in the three **map** pages; it does not synchronize every footer.
- `maintain-footer.cjs warning` recursively scans language HTML but relies on specific text and markup. Its success message is not proof that every footer was changed.
- `maintain-pages.cjs` applies terminology and link substitutions. Do not repeatedly run it as a routine check: regex replacements can interact with existing markup.
- Translation scripts replace known strings; they do not translate new content or verify language quality.

Both maintenance helpers support `--help` and reject unknown or extra arguments with exit code 1. Their generated new-tab links include opener protection. Valid editing commands still write files and have no dry-run mode. Run the read-only audit after any use, then inspect the affected pages in a browser.

## Supporter flow regression tests

`supporter-flow.test.cjs` is an optional Playwright browser suite; Playwright is a development tool only, not a site dependency. With Playwright and its Chromium browser available in your development environment, run `node --test supporter-flow.test.cjs`. You can point `BROWSER_EXECUTABLE` at an installed Chrome/Chromium executable instead. The dependency-free audit tests remain separate.

The suite intercepts all network requests, serves local fixture files and prevents real submissions. It tests Enter navigation, required email and chat contact, whitespace-only names/addresses, missing preferences, switching delivery methods and pickup payloads in all three languages. It does not prove Netlify delivery, payment success or backend activation. Keep the static form names, honeypot and declared inputs intact for Netlify detection.

It also covers successful postal submissions, back-and-edit review updates and localized busy states for both forms. When changing the flow, keep `advanceStep` as the single next-step path for buttons and Enter. Required-field normalization and focus belong in `validateFields`; submission presentation belongs in `markFormSubmitting`. Business validation stays in the individual form handlers. No framework, build pipeline or production dependency is needed for this separation.

## Loading and runtime performance

The shared script is deferred in the head on all 30 language pages. This lets the browser discover it early without blocking HTML parsing. Keep initialization on DOMContentLoaded; do not change it to `async`. The audit checks this loading convention.

Only the first visible meeting poster has high fetch priority. Keep below-the-fold photos lazy; do not preload every image. Map iframes use native lazy loading, which browsers may still load immediately when near the viewport. Header shadow updates avoid repeated DOM queries/class changes; navigation updates on breakpoint transitions rather than every resize event.

Verification for this change: local Chromium tests at 390px and 1300px passed for NL/EN/FY navigation, scroll state and supporter-dialog opening. A burst of 100 same-state scroll events caused zero header class mutations. The shared-script tag moved from byte 52,910 to 7,457 on the Dutch homepage and from byte 126,791 to 3,734 on the Dutch map page. These are discovery/work reductions, not measured real-world load-time improvements. Font requests were stubbed for deterministic interaction checks; external map behavior and live Core Web Vitals were not tested.

Remaining font bottleneck: HTML loads Inter from Google Fonts, and compiled `assets/styles.css` also imports a different Inter weight set. The compiled file is protected by repository rules. Removing that import or regenerating the stylesheet needs an explicitly approved workflow; do not silently edit the compiled file or drop the 800 weight used by headings. [Font-loading guidance](https://web.dev/articles/font-best-practices) explains the tradeoffs. Compare cold-cache mobile runs and field data after deployment before claiming a timing or score improvement.

## Search and AI visibility

Use `https://bitcoinfriesland.com/#organization` for every structured-data reference to the community, including article authors/publishers and event organizers. The organization homepage is `https://bitcoinfriesland.com/`; individual page canonicals remain language-specific. Do not attach this identity to external event organizers. Organization descriptions should describe the community, not the page's subject. The site audit guards the shared identifier and homepage.

Prioritize useful, verifiable local information: actual meetup reports, organizer links, accurate business listings and clear contact/correction routes. Never fabricate reviews, authors, verification dates or first-hand experience. Keep Markdown summaries subordinate to the visible HTML and update both when facts change. `llms.txt` is an optional discovery aid, not a ranking promise; [Google explicitly says it does not use it for Search visibility](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

After a human approves and publishes changes, a verified site owner can inspect indexing in Search Console and review URL citations in [Bing Webmaster Tools AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview). Record a baseline and compare the same date ranges, URLs and queries over time. Track citations and useful visits separately; audit passes do not demonstrate increased AI visibility. Account verification, reporting access and real-world business/event facts require the maintainers; this repository cannot establish them automatically.

## Branch and deployment handoff

The `Site quality` GitHub Actions workflow runs the site audit, dependency-free regression tests and runtime syntax check on pull requests, pushes to main/the current working branch, and manual dispatch. It uses pinned action commits and read-only repository permissions. It does not deploy or test external services. Making its status a required merge check is a repository-owner setting.

For preview deployment, run `node prepare-preview.cjs` after the checks. It prints a new temporary directory containing only public site assets and pages, excluding repository metadata, scripts and contributor documentation. Deploy that directory to the existing `bitcoinfriesland-preview` site. Its `_headers` sets `X-Robots-Tag: noindex, nofollow` on every response; verify the deployed header with an HTTP request. The repository's production robots and metadata remain unchanged. Noindex prevents indexing, not access: never put secrets or personal data in a preview. This staging command is preview-only, not a production build requirement.

Work on a feature branch; `main` publishes the live site. Include changed pages/languages, checks performed and anything unverified in the PR. A preview is separate from production: never assume a local edit or pushed branch has deployed. Record the actual preview URL only after a successful deployment. Never put supporter personal data, credentials or payment records in this public repository.
