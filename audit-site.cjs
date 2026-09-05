#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = __dirname;
const languages = ['nl', 'en', 'fy'];
const openGraphLocales = { nl: 'nl_NL', en: 'en_GB', fy: 'fy_NL' };
const siteOrigin = 'https://bitcoinfriesland.com/';
const errors = [];
// These existing editorial pages intentionally have no EN/FY counterpart.
// Keep this explicit: a missing translation elsewhere must fail the audit.
const untranslatedPages = new Set([
  'nl/blog/index.html',
  'nl/blog/beginnen-met-bitcoin-in-friesland.html',
  'nl/evenementen/bitcoin-bbq-meat-the-resistance-drachten.html',
]);

function isFile(file) {
  return fs.existsSync(file) && fs.statSync(file).isFile();
}

function checkCommunityIdentity(node, file) {
  if (!node || typeof node !== 'object') return;
  if (node['@type'] === 'Organization' && ['Bitcoin Friesland', 'Bitcoin Fryslân'].includes(node.name)) {
    if (node['@id'] !== `${siteOrigin}#organization`) report(file, 'community Organization must use the shared @id');
    if (node.url !== siteOrigin) report(file, 'community Organization must use the shared homepage URL');
  }
  for (const child of Object.values(node)) checkCommunityIdentity(child, file);
}

function walkHtml(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkHtml(absolute);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolute] : [];
  });
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function report(file, message) {
  errors.push(`${relative(file)}: ${message}`);
}

function matchContent(source, attribute, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+${attribute}="${escaped}"\\s+content="([^"]+)"`, 'i');
  return source.match(pattern)?.[1] || '';
}

const pages = languages.flatMap((language) => walkHtml(path.join(root, language)));
const canonicalToFile = new Map();
const enhancementVersions = new Set();
const scriptVersions = new Set();

for (const file of pages) {
  const source = fs.readFileSync(file, 'utf8');
  const canonical = source.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const title = source.match(/<title>([^<]+)<\/title>/i)?.[1].trim();
  const description = matchContent(source, 'name', 'description');
  const robots = matchContent(source, 'name', 'robots');

  if (!title) report(file, 'missing or empty title');
  if (!description) report(file, 'missing meta description');
  if (robots !== 'index, follow, max-image-preview:large') report(file, 'unexpected robots preview policy');
  if (!canonical) report(file, 'missing canonical URL');
  if (!source.includes('rel="describedby" href="https://bitcoinfriesland.com/llms.txt"')) report(file, 'missing llms.txt discovery link');

  for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) {
    if (!matchContent(source, 'property', property)) report(file, `missing ${property}`);
  }
  for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
    if (!matchContent(source, 'name', name)) report(file, `missing ${name}`);
  }

  const h1Count = (source.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) report(file, `expected one h1, found ${h1Count}`);

  for (const image of source.match(/<img\b[^>]*>/gis) || []) {
    if (!/\balt="[^"]*"/i.test(image)) report(file, 'image without alt attribute');
    if (!/\bwidth="\d+"/i.test(image) || !/\bheight="\d+"/i.test(image)) report(file, 'image without explicit dimensions');
  }

  for (const attribute of source.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    const value = attribute[1];
    if (!value || value.startsWith('#') || /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(value)) continue;
    const cleanValue = value.split('#')[0].split('?')[0];
    if (!cleanValue) continue;
    let decoded;
    try {
      decoded = decodeURIComponent(cleanValue);
    } catch {
      report(file, `malformed local reference: ${value}`);
      continue;
    }
    const target = decoded.startsWith('/')
      ? path.join(root, decoded.slice(1))
      : path.resolve(path.dirname(file), decoded);
    const candidates = [target, `${target}.html`, path.join(target, 'index.html')];
    if (!candidates.some(isFile)) report(file, `broken local reference: ${value}`);
  }

  const jsonLdBlocks = [...source.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!jsonLdBlocks.length) report(file, 'missing JSON-LD');
  for (const block of jsonLdBlocks) {
    try {
      checkCommunityIdentity(JSON.parse(block[1]), file);
    } catch (error) {
      report(file, `invalid JSON-LD (${error.message})`);
    }
  }

  if (canonical) {
    if (canonicalToFile.has(canonical)) report(file, `canonical duplicates ${relative(canonicalToFile.get(canonical))}`);
    canonicalToFile.set(canonical, file);
  }

  const pagePath = relative(file);
  const localPath = pagePath.split('/').slice(1).join('/');
  if (!untranslatedPages.has(pagePath)) {
    for (const language of languages) {
      if (!isFile(path.join(root, language, localPath))) report(file, `missing ${language} translation: ${language}/${localPath}`);
      if (!source.includes(`hreflang="${language}"`)) report(file, `missing ${language} hreflang`);
    }
    if (!source.includes('hreflang="x-default"')) report(file, 'missing x-default hreflang');
    const pageLanguage = pagePath.split('/')[0];
    for (const language of languages.filter((language) => language !== pageLanguage)) {
      if (!source.includes(`property="og:locale:alternate" content="${openGraphLocales[language]}"`)) {
        report(file, `missing ${openGraphLocales[language]} Open Graph locale alternate`);
      }
    }
  }

  if (fs.existsSync(`${file}.md`)) {
    const markdownUrl = `${siteOrigin}${pagePath}.md`;
    if (!source.includes(`rel="alternate" type="text/markdown" href="${markdownUrl}"`)) {
      report(file, 'missing Markdown alternate link');
    }
  }
  for (const markdownLink of source.matchAll(/rel="alternate"\s+type="text\/markdown"\s+href="https:\/\/bitcoinfriesland\.com\/([^"]+)"/gi)) {
    if (!fs.existsSync(path.join(root, markdownLink[1]))) report(file, `Markdown alternate does not exist: ${markdownLink[1]}`);
  }

  const enhancementVersion = source.match(/assets\/enhancements\.css\?v=([0-9a-z]+)/i)?.[1];
  const scriptVersion = source.match(/assets\/main\.js\?v=([0-9a-z]+)/i)?.[1];
  if (enhancementVersion) enhancementVersions.add(enhancementVersion);
  else report(file, 'missing versioned enhancements.css reference');
  if (scriptVersion) scriptVersions.add(scriptVersion);
  else report(file, 'missing versioned main.js reference');
}

if (enhancementVersions.size !== 1) errors.push(`HTML pages use multiple enhancements.css versions: ${[...enhancementVersions].join(', ')}`);
if (scriptVersions.size !== 1) errors.push(`HTML pages use multiple main.js versions: ${[...scriptVersions].join(', ')}`);

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapEntries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapUrls = new Set(sitemapEntries);
if (sitemapUrls.size !== sitemapEntries.length) errors.push('sitemap.xml: duplicate URL entries');
const canonicalUrls = new Set(canonicalToFile.keys());
for (const url of canonicalUrls) if (!sitemapUrls.has(url)) errors.push(`sitemap.xml: missing canonical ${url}`);
for (const url of sitemapUrls) if (!canonicalUrls.has(url)) errors.push(`sitemap.xml: non-canonical or unknown URL ${url}`);

const llms = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
if (!/^# Bitcoin Friesland\s*$/m.test(llms)) errors.push('llms.txt: missing required H1');
if (!/^>\s+\S/m.test(llms)) errors.push('llms.txt: missing summary blockquote');
const firstSection = llms.search(/^##\s/m);
if (firstSection < 0) {
  errors.push('llms.txt: missing file-list sections');
} else {
  for (const line of llms.slice(firstSection).split('\n')) {
    if (line.startsWith('- ') && !line.startsWith('- [')) errors.push(`llms.txt: section list item is not a Markdown link: ${line}`);
  }
}
for (const match of llms.matchAll(/\]\(https:\/\/bitcoinfriesland\.com\/([^\s)]+\.md)\)/g)) {
  if (!fs.existsSync(path.join(root, match[1]))) errors.push(`llms.txt: missing linked Markdown file ${match[1]}`);
}

const robotsTxt = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (/^Crawl-delay:/im.test(robotsTxt)) errors.push('robots.txt: Crawl-delay is not part of Google robots.txt rules');
if ((robotsTxt.match(/^User-agent:/gim) || []).length !== 1) errors.push('robots.txt: use one shared crawler group unless a specific exception is required');

if (errors.length) {
  console.error(`Site audit failed with ${errors.length} issue${errors.length === 1 ? '' : 's'}:\n`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site audit passed: ${pages.length} HTML pages, ${sitemapUrls.size} canonical sitemap URLs and ${[...llms.matchAll(/\.html\.md\)/g)].length} LLM Markdown links.`);
