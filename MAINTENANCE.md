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

Use the actual filenames above, even though some legacy help messages show older names. These scripts write files and have no dry-run mode. Run the read-only audit after any use, then inspect the affected pages in a browser.

## Search and AI visibility

Use `https://bitcoinfriesland.com/#organization` for every structured-data reference to the community, including article authors/publishers and event organizers. The organization homepage is `https://bitcoinfriesland.com/`; individual page canonicals remain language-specific. Do not attach this identity to external event organizers. Organization descriptions should describe the community, not the page's subject. The site audit guards the shared identifier and homepage.

Prioritize useful, verifiable local information: actual meetup reports, organizer links, accurate business listings and clear contact/correction routes. Never fabricate reviews, authors, verification dates or first-hand experience. Keep Markdown summaries subordinate to the visible HTML and update both when facts change. `llms.txt` is an optional discovery aid, not a ranking promise; [Google explicitly says it does not use it for Search visibility](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

After a human approves and publishes changes, a verified site owner can inspect indexing in Search Console and review URL citations in [Bing Webmaster Tools AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview). Record a baseline and compare the same date ranges, URLs and queries over time. Track citations and useful visits separately; audit passes do not demonstrate increased AI visibility. Account verification, reporting access and real-world business/event facts require the maintainers; this repository cannot establish them automatically.

## Branch and deployment handoff

Work on a feature branch; `main` publishes the live site. Include changed pages/languages, checks performed and anything unverified in the PR. A preview is separate from production: never assume a local edit or pushed branch has deployed. Record the actual preview URL only after a successful deployment. Never put supporter personal data, credentials or payment records in this public repository.
