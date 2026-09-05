const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { preparePreview } = require('./prepare-preview.cjs');

for (const script of ['maintain-pages.cjs', 'maintain-footer.cjs']) {
  test(`${script}: help and invalid arguments never run updates`, () => {
    const help = spawnSync(process.execPath, [path.join(__dirname, script), '--help'], { encoding: 'utf8' });
    assert.equal(help.status, 0);
    assert.ok(help.stdout.includes(`node ${script}`));
    for (const args of [['typo'], ['all', 'unexpected']]) {
      const result = spawnSync(process.execPath, [path.join(__dirname, script), ...args], { encoding: 'utf8' });
      assert.equal(result.status, 1);
      assert.doesNotMatch(result.stdout, /completed|Processing/);
    }
  });
}

test('preview staging excludes tooling and has preview-only noindex headers', t => {
  const output = preparePreview();
  t.after(() => fs.rmSync(output, { recursive: true, force: true }));
  for (const file of ['nl/support.html', 'en/map.html', 'fy/index.html', 'nl/index.html.md', 'nl/blog/rss.xml', 'assets/main.js']) {
    assert.ok(fs.existsSync(path.join(output, file)), file);
  }
  for (const file of ['AGENTS.md', '.git', '.netlify', 'audit-site.cjs', 'supporter-flow.test.cjs', 'nl/blog/HOW-TO-ADD-A-POST.md']) {
    assert.equal(fs.existsSync(path.join(output, file)), false, file);
  }
  assert.match(fs.readFileSync(path.join(output, '_headers'), 'utf8'), /X-Robots-Tag: noindex, nofollow/);
  assert.equal(fs.readFileSync(path.join(output, 'robots.txt'), 'utf8'), fs.readFileSync(path.join(__dirname, 'robots.txt'), 'utf8'));
});
