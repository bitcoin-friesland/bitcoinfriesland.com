const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

// Exercise the CLI against isolated copies; never modify the working website.
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bf-audit-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  for (const name of ['nl', 'en', 'fy', 'audit-site.cjs', 'sitemap.xml', 'robots.txt', 'llms.txt', 'index.html', '404.html']) {
    fs.cpSync(path.join(__dirname, name), path.join(directory, name), { recursive: true });
  }
  // The audit only reads assets. Avoid copying image binaries for each test.
  fs.symlinkSync(path.join(__dirname, 'assets'), path.join(directory, 'assets'), 'dir');
  return directory;
}

function audit(directory) {
  const result = spawnSync(process.execPath, [path.join(directory, 'audit-site.cjs')], {
    cwd: os.tmpdir(),
    encoding: 'utf8',
  });
  if (result.error) throw result.error;
  return { status: result.status, output: result.stdout + result.stderr };
}

function edit(directory, file, transform) {
  const target = path.join(directory, file);
  fs.writeFileSync(target, transform(fs.readFileSync(target, 'utf8')));
}

test('current site passes even when invoked outside the repository', (t) => {
  const result = audit(fixture(t));
  assert.equal(result.status, 0, result.output);
});

test('missing translation is explicitly reported', (t) => {
  const directory = fixture(t);
  fs.unlinkSync(path.join(directory, 'fy/about.html'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /missing fy translation: fy\/about.html/);
});

test('empty directory is not accepted as a working page', (t) => {
  const directory = fixture(t);
  fs.mkdirSync(path.join(directory, 'empty'));
  edit(directory, 'nl/about.html', (html) => html.replace('</body>', '<a href="/empty/">Empty</a></body>'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /broken local reference: \/empty\//);
});

test('malformed URLs produce a useful failure instead of a stack trace', (t) => {
  const directory = fixture(t);
  edit(directory, 'nl/about.html', (html) => html.replace('</body>', '<a href="/%invalid">Invalid</a></body>'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /nl\/about.html: malformed local reference: \/%invalid/);
  assert.doesNotMatch(result.output, /URIError/);
});

test('missing cache version is reported on the affected page', (t) => {
  const directory = fixture(t);
  edit(directory, 'nl/about.html', (html) => html.replace(/main\.js\?v=[0-9a-z]+/i, 'main.js'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /nl\/about.html: missing versioned main.js reference/);
});

test('duplicate sitemap entries are rejected', (t) => {
  const directory = fixture(t);
  edit(directory, 'sitemap.xml', (xml) => xml.replace('</urlset>', `${xml.match(/<url>[\s\S]*?<\/url>/)[0]}</urlset>`));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /sitemap.xml: duplicate URL entries/);
});

test('community identity cannot diverge between language pages', (t) => {
  const directory = fixture(t);
  edit(directory, 'fy/about.html', (html) => html.replace('https://bitcoinfriesland.com/#organization', 'https://bitcoinfriesland.com/fy/#organization'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /fy\/about.html: community Organization must use the shared @id/);
});

test('shared script must not block HTML parsing', (t) => {
  const directory = fixture(t);
  edit(directory, 'nl/about.html', (html) => html.replace('<script defer src=', '<script src='));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /main.js must be deferred in the head/);
});

test('duplicate IDs and broken fragment links are reported', (t) => {
  const directory = fixture(t);
  edit(directory, 'nl/about.html', html => html.replace('</body>', '<div id="main-content"></div><a href="#missing-section">Missing</a></body>'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /duplicate id: main-content/);
  assert.match(result.output, /broken same-page link: #missing-section/);
});

test('new-tab links retain opener protection', (t) => {
  const directory = fixture(t);
  edit(directory, 'nl/about.html', html => html.replace('</body>', '<a href="https://example.com" target="_blank">External</a></body>'));
  const result = audit(directory);
  assert.equal(result.status, 1);
  assert.match(result.output, /new-tab link must include/);
});
