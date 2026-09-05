// Optional browser tests: requires Playwright, not a website runtime dependency.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

let browser;
before(async () => {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}),
  });
});
after(async () => { if (browser) await browser.close(); });

async function openPage(t, pathname, javaScriptEnabled = true) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled });
  page.setDefaultTimeout(5000);
  t.after(() => page.close());
  // All requests stay in this fixture. No personal data reaches a live service.
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== 'https://fixture.test' || route.request().method() !== 'GET') return route.abort();
    const file = path.resolve(__dirname, '.' + url.pathname);
    if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.abort();
    await route.fulfill({ path: file });
  });
  await page.goto(`https://fixture.test/${pathname}`);
  return page;
}

async function openFlow(t, language) {
  const page = await openPage(t, `${language}/support.html`);
  await page.locator('[data-supporter-open]').first().click();
  const form = page.locator('form[name="supporter-signup"]');
  await form.locator('[name="name"]').fill('Test Supporter');
  await form.locator('[name="email"]').fill('supporter@example.invalid');
  await form.locator('[name="telegram_username"]').fill('@test_supporter');
  return { page, form };
}

for (const language of ['nl', 'en', 'fy']) {
  test(`${language}: keyboard skip link reaches the homepage content`, async (t) => {
    const page = await openPage(t, `${language}/index.html`);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.bf-skip-link').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#main-content').evaluate(el => el === document.activeElement), true);
  });

  test(`${language}: business search filters, survives sorting, clears and reports no matches`, async (t) => {
    const page = await openPage(t, `${language}/map.html`);
    const rows = page.locator('#businessTable tbody tr');
    const total = await rows.count();
    assert.ok(total > 0);
    const town = (await rows.first().locator('td').nth(3).textContent()).trim();
    const search = page.locator('[data-business-search]');
    await search.fill(town.toUpperCase());
    const visible = page.locator('#businessTable tbody tr:not([hidden])');
    const count = await visible.count();
    assert.ok(count > 0 && count <= total);
    await page.locator('#businessTable th').first().click();
    assert.equal(await visible.count(), count);
    await search.fill('zz-no-such-business-zz');
    assert.equal(await visible.count(), 0);
    assert.equal(await page.locator('[data-business-search-empty]').isVisible(), true);
    await search.fill('');
    assert.equal(await visible.count(), total);
    assert.equal(await page.locator('[data-business-search-empty]').isVisible(), false);
  });

  test(`${language}: business listings remain visible without JavaScript`, async (t) => {
    const page = await openPage(t, `${language}/map.html`, false);
    assert.equal(await page.locator('[data-business-search-controls]').isVisible(), false);
    assert.ok(await page.locator('#businessTable tbody tr:not([hidden])').count() > 0);
  });

  test(`${language}: generic form uses the shared localized busy state`, async (t) => {
    const { page } = await openFlow(t, language);
    await page.locator('[data-supporter-close]').first().click();
    const form = page.locator('form[name="support-interest"]');
    await form.locator('[name="name"]').fill('Test Supporter');
    await form.locator('[name="email"]').fill('supporter@example.invalid');
    await form.locator('[name="interest"]').selectOption('other');
    await form.evaluate(f => f.addEventListener('submit', event => event.preventDefault()));
    const button = form.locator('[type="submit"]');
    const originalText = await button.textContent();
    const busyText = await button.getAttribute('data-submitting-text');
    await button.click();
    assert.equal(await button.isDisabled(), true);
    assert.equal(await button.getAttribute('aria-busy'), 'true');
    assert.equal(await button.textContent(), busyText);
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    assert.equal(await button.isEnabled(), true);
    assert.equal(await button.textContent(), originalText);
    assert.equal(await button.getAttribute('aria-busy'), null);
  });

  test(`${language}: Enter and buttons share mail review and back navigation`, async (t) => {
    const { page, form } = await openFlow(t, language);
    await form.locator('[name="email"]').press('Enter');
    await form.locator('label:has([name="payment_timing"][value="next_meetup"])').click();
    await form.locator('label:has([name="sticker_delivery"][value="mail"])').click();
    for (const [name, value] of Object.entries({ address_line1: 'Teststraat 1', postal_code: '1234 AB', city: 'Teststad' })) {
      await form.locator(`[name="${name}"]`).fill(value);
    }
    await form.locator('[name="city"]').press('Enter');
    assert.equal(await page.locator('[data-supporter-step="3"]').isVisible(), true);
    assert.match(await page.locator('[data-review="address"]').textContent(), /Teststraat 1/);
    await page.locator('[data-supporter-step="3"] [data-supporter-back]').click();
    await form.locator('[name="city"]').fill('Andere stad');
    await page.locator('[data-supporter-step="2"] [data-supporter-next]').click();
    assert.match(await page.locator('[data-review="address"]').textContent(), /Andere stad/);
    await form.evaluate(f => f.addEventListener('submit', event => {
      event.preventDefault();
      window.testSubmission = Object.fromEntries(new FormData(f));
    }));
    const button = page.locator('[data-supporter-submit]');
    const busyText = await button.getAttribute('data-submitting-text');
    await button.click();
    const payload = await page.evaluate(() => window.testSubmission);
    assert.equal(payload.address_line1, 'Teststraat 1');
    assert.equal(payload.city, 'Andere stad');
    assert.equal(payload.payment_timing, 'next_meetup');
    assert.equal(await button.isDisabled(), true);
    assert.equal(await button.getAttribute('aria-busy'), 'true');
    assert.equal(await button.textContent(), busyText);
  });

  test(`${language}: invalid details and missing preferences still block progress`, async (t) => {
    const { page, form } = await openFlow(t, language);
    const next = page.locator('[data-supporter-step="1"] [data-supporter-next]');
    await form.locator('[name="email"]').fill('invalid');
    await next.click();
    assert.equal(await page.locator('[data-supporter-step="1"]').isVisible(), true);
    await form.locator('[name="email"]').fill('supporter@example.invalid');
    await form.locator('[name="telegram_username"]').fill(' ');
    await next.click();
    assert.equal(await page.locator('[data-supporter-error]').isVisible(), true);
    await form.locator('[name="signal_username"]').fill('test.00');
    await next.click();
    await page.locator('[data-supporter-step="2"] [data-supporter-next]').click();
    assert.equal(await page.locator('[data-supporter-step="2"]').isVisible(), true);
    assert.equal(await page.locator('[data-supporter-error]').isVisible(), true);
  });

  test(`${language}: Enter advances details without validating hidden preferences`, async (t) => {
    const { page, form } = await openFlow(t, language);
    await form.locator('[name="email"]').press('Enter');
    assert.equal(await page.locator('[data-supporter-step="2"]').isVisible(), true);
  });

  test(`${language}: whitespace-only names are rejected`, async (t) => {
    const { page, form } = await openFlow(t, language);
    await form.locator('[name="name"]').fill('   ');
    await page.locator('[data-supporter-step="1"] [data-supporter-next]').click();
    assert.equal(await page.locator('[data-supporter-step="1"]').isVisible(), true);
  });

  test(`${language}: pickup excludes a previously entered postal address`, async (t) => {
    const { page, form } = await openFlow(t, language);
    await page.locator('[data-supporter-step="1"] [data-supporter-next]').click();
    await form.locator('label:has([name="payment_timing"][value="online"])').click();
    await form.locator('label:has([name="sticker_delivery"][value="mail"])').click();
    for (const [name, value] of Object.entries({ address_line1: 'Teststraat 1', postal_code: '1234 AB', city: 'Teststad' })) {
      await form.locator(`[name="${name}"]`).fill(value);
    }
    assert.equal(await form.evaluate(f => new FormData(f).get('address_line1')), 'Teststraat 1');
    await form.locator('label:has([name="sticker_delivery"][value="pickup"])').click();
    await form.locator('label:has([name="sticker_delivery"][value="mail"])').click();
    assert.equal(await form.locator('[name="address_line1"]').inputValue(), 'Teststraat 1');
    assert.equal(await form.locator('[name="address_line1"]').isEnabled(), true);
    await form.locator('[name="address_line1"]').fill('   ');
    await page.locator('[data-supporter-step="2"] [data-supporter-next]').click();
    assert.equal(await page.locator('[data-supporter-step="2"]').isVisible(), true);
    await form.locator('label:has([name="sticker_delivery"][value="pickup"])').click();
    await page.locator('[data-supporter-step="2"] [data-supporter-next]').click();
    await form.evaluate(f => f.addEventListener('submit', event => {
      event.preventDefault();
      window.testSubmission = Object.fromEntries(new FormData(f));
    }));
    await page.locator('[data-supporter-submit]').click();
    const payload = await page.evaluate(() => window.testSubmission);
    assert.equal(payload.sticker_delivery, 'pickup');
    for (const name of ['address_line1', 'postal_code', 'city', 'country']) assert.equal(name in payload, false, name);
    assert.equal(payload['form-name'], 'supporter-signup');
    assert.equal(payload.email, 'supporter@example.invalid');
    assert.equal(payload.payment_currency, 'sats');
    assert.ok(payload.submitted_at);
  });
}
