// Cloudflare Pages Function for POST /nl/support, /en/support and /fy/support.
//
// The two support forms on those pages post here as ordinary HTML forms (no
// JavaScript needed). Each valid submission is sent to a private Telegram chat and
// the visitor is redirected back to the page, which shows the confirmation.
// GET requests are not handled here and fall through to the static page.
//
// Required in Cloudflare Pages > Settings > Variables and Secrets:
//   TELEGRAM_BOT_TOKEN  (secret)  token of the bot that posts the notification
//   TELEGRAM_CHAT_ID              private chat or group that receives it
// Optional:
//   TELEGRAM_THREAD_ID            topic id when the chat is a forum group
//   TELEGRAM_API_BASE             only for local tests against a mock server
//
// Nothing is stored and submitted values are never logged. See MAINTENANCE.md.

const LANGUAGES = ['nl', 'en', 'fy'];
const MAX_BODY_BYTES = 20000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field limits mirror the maxlength attributes in the HTML forms.
export const FORMS = {
  'support-interest': {
    title: 'Ondersteuningsaanvraag',
    redirect: (language) => `/${language}/support?submitted=true#support-form`,
    required: ['name', 'email', 'interest'],
    fields: {
      name: 100,
      email: 254,
      interest: 30,
      company: 120,
      message: 1500,
    },
    choices: { interest: ['supporter', 'business', 'donation', 'stickers', 'feedback', 'other'] },
  },
  // Paused: the three-step signup dialog is off the pages until payment and organisation
  // are in place. Kept so it can return without changing the function.
  'supporter-signup': {
    title: 'Supporter-aanvraag',
    redirect: (language) => `/${language}/support?supporter-submitted=true`,
    required: ['name', 'email', 'payment_timing', 'sticker_delivery'],
    fields: {
      name: 100,
      email: 254,
      telegram_username: 64,
      signal_username: 64,
      payment_timing: 30,
      sticker_delivery: 30,
      address_line1: 150,
      postal_code: 20,
      city: 100,
      country: 100,
      interest: 30,
      support_status: 30,
      source: 30,
      payment_currency: 10,
      submitted_at: 40,
    },
    choices: {
      payment_timing: ['online', 'next_meetup'],
      sticker_delivery: ['mail', 'pickup'],
    },
  },
};

const ERROR_TEXT = {
  nl: {
    title: 'Je aanvraag is niet verstuurd',
    body: 'Er ging iets mis, waardoor we je aanvraag niet hebben ontvangen. Probeer het over enkele minuten opnieuw of mail ons via',
    back: 'Terug naar de aanvraag',
  },
  en: {
    title: 'Your request was not sent',
    body: 'Something went wrong and we did not receive your request. Please try again in a few minutes or email us at',
    back: 'Back to the request',
  },
  fy: {
    title: 'Jo oanfraach is net ferstjoerd',
    body: 'Der gie wat mis, dêrtroch hawwe wy jo oanfraach net ûntfongen. Besykje it oer inkele minuten opnij of mail ús fia',
    back: 'Werom nei de oanfraach',
  },
};

function clean(value, maxLength) {
  if (typeof value !== 'string') return '';
  // Keep line breaks (message field) but drop other control characters.
  return value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '').trim().slice(0, maxLength);
}

function errorPage(language, status) {
  const text = ERROR_TEXT[language] || ERROR_TEXT.nl;
  const html = `<!DOCTYPE html>
<html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${text.title}</title></head>
<body style="font-family:system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;line-height:1.6">
<h1>${text.title}</h1>
<p>${text.body} <a href="mailto:info@bitcoinfriesland.com">info@bitcoinfriesland.com</a>.</p>
<p><a href="/${language}/support">${text.back}</a></p>
</body></html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function validate(form, values) {
  for (const name of form.required) if (!values[name]) return false;
  if (!EMAIL_PATTERN.test(values.email)) return false;
  for (const [name, allowed] of Object.entries(form.choices)) {
    if (values[name] && !allowed.includes(values[name])) return false;
  }
  if (values.sticker_delivery === 'mail') {
    for (const name of ['address_line1', 'postal_code', 'city', 'country']) if (!values[name]) return false;
  }
  return true;
}

function buildMessage(form, language, values) {
  const lines = [`Bitcoin Friesland: ${form.title} (${language})`, ''];
  for (const name of Object.keys(form.fields)) {
    if (values[name]) lines.push(`${name}: ${values[name]}`);
  }
  lines.push('', `ontvangen: ${new Date().toISOString()}`);
  return lines.join('\n').slice(0, 4000);
}

async function sendToTelegram(env, text) {
  const body = { chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true };
  if (env.TELEGRAM_THREAD_ID) body.message_thread_id = Number(env.TELEGRAM_THREAD_ID);
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(`${env.TELEGRAM_API_BASE || 'https://api.telegram.org'}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) return true;
      // Bad token, wrong chat or bot removed: retrying cannot help.
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        console.error(`support form: Telegram rejected the message (HTTP ${response.status})`);
        return false;
      }
      console.error(`support form: Telegram attempt ${attempt} failed (HTTP ${response.status})`);
    } catch (error) {
      console.error(`support form: Telegram attempt ${attempt} failed (${error.name})`);
    }
  }
  return false;
}

export async function handleSupportPost(request, env, language) {
  if (!LANGUAGES.includes(language)) return new Response('Not found', { status: 404 });

  const origin = request.headers.get('Origin');
  if (origin) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === new URL(request.url).host;
    } catch {
      // "null" or malformed origins are treated as cross-site.
    }
    if (!sameSite) return errorPage(language, 403);
  }

  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > MAX_BODY_BYTES) return errorPage(language, 413);

  let data;
  try {
    data = await request.formData();
  } catch {
    return errorPage(language, 400);
  }

  const form = FORMS[data.get('form-name')];
  if (!form) return errorPage(language, 400);

  // Honeypot: real visitors never see this field. Pretend success, send nothing.
  if (clean(data.get('bot-field'), 200)) {
    return new Response(null, { status: 303, headers: { Location: form.redirect(language) } });
  }

  const values = {};
  for (const [name, maxLength] of Object.entries(form.fields)) values[name] = clean(data.get(name), maxLength);
  if (!validate(form, values)) return errorPage(language, 400);

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error('support form: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured');
    return errorPage(language, 503);
  }

  const delivered = await sendToTelegram(env, buildMessage(form, language, values));
  if (!delivered) return errorPage(language, 502);

  return new Response(null, { status: 303, headers: { Location: form.redirect(language) } });
}

export function onRequestPost({ request, env, params }) {
  return handleSupportPost(request, env, params.lang);
}
