const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { preparePreview } = require('./prepare-preview.cjs');

for (const locale of ['nl', 'en', 'fy']) {
  test(`${locale}: finished conference is archived without expired ticket promotions`, () => {
    const read = file => fs.readFileSync(path.join(__dirname, locale, file), 'utf8');
    const meetings = read('meetings.html');
    const upcoming = meetings.split('id="upcoming-events"')[1].split('id="past-events"')[0];
    const past = meetings.split('id="past-events"')[1];
    assert.doesNotMatch(upcoming, /Noderunners Conference|<h3/);
    assert.match(past, /data-event-end="2026-09-19T18:00:00\+02:00"/);
    assert.match(past, /Noderunners Conference 2026/);
    for (const file of ['index.html', 'meetings.html', 'meetings.html.md']) {
      assert.doesNotMatch(read(file), /conf2026\.noderunners\.network\/BITCOINFRIESLAND|nr-discount-tag|nr-promo-code/);
    }
  });
}

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

// The map hero shows counts and a dot per town. Keep them in step with the business table.
test('map hero numbers and town dots match the business list', () => {
  const towns = (html) => {
    const body = html.match(/<tbody[\s\S]*?<\/tbody>/)[0];
    return [...body.matchAll(/<tr\b[\s\S]*?<\/tr>/g)].map((row) => {
      const cells = [...row[0].matchAll(/<td\b[\s\S]*?<\/td>/g)].map((cell) => cell[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      return cells[3].replace(' (SWF)', '');
    });
  };
  const dutch = towns(fs.readFileSync(path.join(__dirname, 'nl', 'map.html'), 'utf8'));
  const unique = new Set(dutch);
  for (const language of ['nl', 'en', 'fy']) {
    const html = fs.readFileSync(path.join(__dirname, language, 'map.html'), 'utf8');
    const stat = (name) => Number(html.match(new RegExp(`data-stat="${name}">(\\d+)<`))[1]);
    assert.equal(towns(html).length, dutch.length, `${language}: same number of businesses as the Dutch list`);
    assert.equal(stat('places'), dutch.length, `${language}: places count`);
    assert.equal(stat('towns'), unique.size, `${language}: towns count`);
    assert.equal(stat('sneek'), dutch.filter((town) => town === 'Sneek').length, `${language}: Sneek count`);
    const dots = new Set([...html.matchAll(/data-town="([^"]+)"/g)].map((match) => match[1]));
    for (const town of unique) assert.ok(dots.has(town), `${language}: no map dot for ${town}; add its coordinates to the hero map`);
  }
});
