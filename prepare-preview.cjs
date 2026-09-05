#!/usr/bin/env node
// Stage only public website files, never a repository root or developer tooling.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function preparePreview(root = __dirname) {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'bitcoin-friesland-preview-'));
  for (const name of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'assets', 'nl', 'en', 'fy']) {
    fs.cpSync(path.join(root, name), path.join(output, name), {
      recursive: true,
      filter: source => {
        const stat = fs.lstatSync(source);
        if (stat.isSymbolicLink()) return false;
        if (stat.isDirectory()) return true;
        return /\.(html|html\.md|xml|txt|css|js|png|webp|jpe?g|svg|ico|woff2?)$/i.test(source);
      },
    });
  }
  // Allow crawling so engines can read noindex. This file is preview-only.
  fs.writeFileSync(path.join(output, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n');
  return output;
}

if (require.main === module) console.log(preparePreview());
module.exports = { preparePreview };
