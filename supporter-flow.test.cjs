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

async function openFlow(t, language) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
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
  await page.goto(`https://fixture.test/${language}/support.html`);
  await page.locator('[data-supporter-open]').first().click();
  const form = page.locator('form[name="supporter-signup"]');
  await form.locator('[name="name"]').fill('Test Supporter');
  await form.locator('[name="email"]').fill('supporter@example.invalid');
  await form.locator('[name="telegram_username"]').fill('@test_supporter');
  return { page, form };
}

for (const language of ['nl', 'en', 'fy']) {
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
