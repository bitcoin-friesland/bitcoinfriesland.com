const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { test } = require('node:test');

// The Pages Function uses ES module syntax; import it dynamically from this CommonJS test.
const load = () => import(pathToFileURL(path.join(__dirname, 'functions', '[lang]', 'support.js')).href);
const env = { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: '-100123' };

const interest = {
  'form-name': 'support-interest',
  language: 'nl',
  'bot-field': '',
  name: 'Test Persoon',
  email: 'test@example.com',
  interest: 'donation',
  company: '',
  message: 'Hallo <b>wereld</b>',
};
const signup = {
  'form-name': 'supporter-signup',
  name: 'Test Persoon',
  email: 'test@example.com',
  telegram_username: '@test',
  payment_timing: 'online',
  sticker_delivery: 'pickup',
  interest: 'supporter',
  support_status: 'new_request',
  source: 'supporter_popup',
  payment_currency: 'sats',
};

function post(fields, headers = {}) {
  const body = new URLSearchParams(fields);
  return new Request('https://bitcoinfriesland.com/nl/support?submitted=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: 'https://bitcoinfriesland.com', ...headers },
    body,
  });
}

// Replace fetch for one test and record what would have been sent to Telegram.
function mockTelegram(t, responses) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return new Response('{}', { status: next });
  };
  t.after(() => { globalThis.fetch = original; });
  return calls;
}

test('interest form is delivered to Telegram and redirects to the confirmation', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [200]);
  const response = await handleSupportPost(post(interest), env, 'nl');
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), '/nl/support?submitted=true#support-form');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.telegram.org/bottest-token/sendMessage');
  assert.equal(calls[0].body.chat_id, '-100123');
  assert.match(calls[0].body.text, /name: Test Persoon/);
  assert.match(calls[0].body.text, /message: Hallo <b>wereld<\/b>/);
  assert.equal(calls[0].body.parse_mode, undefined, 'plain text avoids markup injection');
});

test('supporter signup keeps its own confirmation query and language', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [200]);
  const response = await handleSupportPost(post(signup), { ...env, TELEGRAM_THREAD_ID: '7' }, 'fy');
  assert.equal(response.headers.get('Location'), '/fy/support?supporter-submitted=true');
  assert.equal(calls[0].body.message_thread_id, 7);
  assert.match(calls[0].body.text, /\(fy\)/);
});

test('postal address is required only when stickers are mailed', async (t) => {
  const { handleSupportPost } = await load();
  mockTelegram(t, [200]);
  const missing = await handleSupportPost(post({ ...signup, sticker_delivery: 'mail' }), env, 'nl');
  assert.equal(missing.status, 400);
  const complete = await handleSupportPost(post({
    ...signup, sticker_delivery: 'mail', address_line1: 'Straat 1', postal_code: '9001 AA', city: 'Grou', country: 'Nederland',
  }), env, 'nl');
  assert.equal(complete.status, 303);
});

test('honeypot submissions look successful but send nothing', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [200]);
  const response = await handleSupportPost(post({ ...interest, 'bot-field': 'spam' }), env, 'nl');
  assert.equal(response.status, 303);
  assert.equal(calls.length, 0);
});

test('invalid, unknown and cross-site submissions are rejected without contacting Telegram', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [200]);
  assert.equal((await handleSupportPost(post({ ...interest, email: 'not-an-email' }), env, 'nl')).status, 400);
  assert.equal((await handleSupportPost(post({ ...interest, name: '' }), env, 'nl')).status, 400);
  assert.equal((await handleSupportPost(post({ ...interest, interest: 'hack' }), env, 'nl')).status, 400);
  assert.equal((await handleSupportPost(post({ ...interest, 'form-name': 'other' }), env, 'nl')).status, 400);
  assert.equal((await handleSupportPost(post(interest, { Origin: 'https://evil.example' }), env, 'nl')).status, 403);
  assert.equal((await handleSupportPost(post(interest, { Origin: 'null' }), env, 'nl')).status, 403);
  assert.equal((await handleSupportPost(post(interest), env, 'de')).status, 404);
  assert.equal(calls.length, 0);
});

test('oversized values are truncated to the form limits', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [200]);
  await handleSupportPost(post({ ...interest, message: 'x'.repeat(5000) }), env, 'nl');
  assert.ok(calls[0].body.text.length < 1800);
});

test('missing configuration or a failing Telegram never reports success', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [500, 500]);
  const errors = t.mock.method(console, 'error', () => {});
  const unconfigured = await handleSupportPost(post(interest), {}, 'nl');
  assert.equal(unconfigured.status, 503);
  assert.equal(calls.length, 0);

  const failed = await handleSupportPost(post(interest), env, 'en');
  assert.equal(failed.status, 502);
  assert.equal(calls.length, 2, 'one retry for server errors');
  const page = await failed.text();
  assert.match(page, /info@bitcoinfriesland.com/);
  assert.match(page, /lang="en"/);
  assert.equal(failed.headers.get('Cache-Control'), 'no-store');
  // Submitted personal data must not reach the logs.
  assert.ok(errors.mock.calls.every((call) => !/test@example.com|Test Persoon/.test(String(call.arguments))));
});

test('a temporary Telegram error is retried once and then succeeds', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [new Error('network'), 200]);
  t.mock.method(console, 'error', () => {});
  const response = await handleSupportPost(post(interest), env, 'nl');
  assert.equal(response.status, 303);
  assert.equal(calls.length, 2);
});

test('a rejected token is not retried', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [401, 200]);
  t.mock.method(console, 'error', () => {});
  const response = await handleSupportPost(post(interest), env, 'nl');
  assert.equal(response.status, 502);
  assert.equal(calls.length, 1);
});

// Keeps the HTML forms and the function in agreement: renaming a field or changing an
// action in only one place would silently lose submissions.
test('every support form matches the function contract in all languages', async () => {
  const { FORMS } = await load();
  const ignored = new Set(['form-name', 'language', 'subject', 'bot-field']);
  for (const language of ['nl', 'en', 'fy']) {
    const html = fs.readFileSync(path.join(__dirname, language, 'support.html'), 'utf8');
    const forms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/gi)].map((match) => match[0]);
    // The three-step supporter-signup dialog is paused until payment is in place;
    // the waitlist form must always be there.
    assert.ok(forms.some((form) => /name="support-interest"/.test(form)), `${language}: waitlist form missing`);
    for (const source of forms) {
      const tag = source.match(/<form\b[^>]*>/i)[0];
      const name = tag.match(/\bname="([^"]+)"/)[1];
      const contract = FORMS[name];
      assert.ok(contract, `${language}: unknown form ${name}`);
      assert.match(tag, /method="POST"/i);
      const action = tag.match(/\baction="([^"]+)"/)[1];
      assert.equal(action, contract.redirect(language), `${language}/${name}: action must match the redirect`);
      assert.match(source, new RegExp(`name="form-name"\\s+value="${name}"`), `${language}/${name}: hidden form-name`);
      assert.match(source, /name="bot-field"/, `${language}/${name}: honeypot`);
      for (const [, field] of source.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/gi)) {
        assert.ok(ignored.has(field) || field in contract.fields, `${language}/${name}: field ${field} is not accepted by the function`);
      }
      for (const required of contract.required) {
        assert.match(source, new RegExp(`name="${required}"`), `${language}/${name}: missing required field ${required}`);
      }
    }
  }
});

test('waitlist feedback choice is accepted', async (t) => {
  const { handleSupportPost } = await load();
  const calls = mockTelegram(t, [200]);
  const response = await handleSupportPost(post({ ...interest, interest: 'feedback' }), env, 'nl');
  assert.equal(response.status, 303);
  assert.match(calls[0].body.text, /interest: feedback/);
});
