// Essential JavaScript functions for Bitcoin Friesland website

// CSS can hide and blur a navigation link before the breakpoint callback runs.
let lastNavigationFocus = null;
document.addEventListener('focusin', function(event) {
  lastNavigationFocus = event.target.closest('nav') ? event.target : null;
});

// Force show desktop menu on desktop
function updateMenuVisibility() {
  const desktopMenu = document.querySelector('.nav-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileTrigger = document.querySelector('[onclick="toggleMobileMenu()"]');
  const focused = document.activeElement === document.body && lastNavigationFocus && !lastNavigationFocus.getClientRects().length
    ? lastNavigationFocus : document.activeElement;
  const isDesktop = window.innerWidth >= 1200;
  // Move focus before the currently focused navigation becomes hidden.
  if (isDesktop && desktopMenu && (mobileMenu?.contains(focused) || focused === mobileTrigger)) {
    const destination = Array.from(desktopMenu.querySelectorAll('a[href]'))
      .find(link => link.href === focused.href) || desktopMenu.querySelector('a[href]');
    desktopMenu.style.display = 'flex';
    if (destination) destination.focus();
  } else if (!isDesktop && desktopMenu?.contains(focused) && mobileTrigger) {
    mobileTrigger.focus();
  }
  if (desktopMenu) {
    desktopMenu.style.display = window.innerWidth >= 1200 ? 'flex' : '';
  }
  if (window.innerWidth >= 1200) {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    if (mobileTrigger) mobileTrigger.setAttribute('aria-expanded', 'false');
  }
}

// Initialize without waiting for images/embeds, then update only at the breakpoint.
document.addEventListener('DOMContentLoaded', updateMenuVisibility);
window.matchMedia('(min-width: 1200px)').addEventListener('change', updateMenuVisibility);

// Language dropdown toggle
function toggleLanguageDropdown() {
  const dropdown = document.getElementById('language-dropdown');
  if (dropdown) {
    const willOpen = dropdown.classList.contains('hidden');
    dropdown.classList.toggle('hidden');
    const trigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
    if (trigger) {
      trigger.setAttribute('aria-expanded', dropdown.classList.contains('hidden') ? 'false' : 'true');
    }
    if (willOpen) {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileTrigger = document.querySelector('[onclick="toggleMobileMenu()"]');
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (mobileTrigger) mobileTrigger.setAttribute('aria-expanded', 'false');
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('language-dropdown');
  const trigger = event.target.closest('[onclick="toggleLanguageDropdown()"]');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileTrigger = event.target.closest('[onclick="toggleMobileMenu()"]');
  
  if (!trigger && dropdown && !dropdown.contains(event.target)) {
    dropdown.classList.add('hidden');
    const languageTrigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
    if (languageTrigger) languageTrigger.setAttribute('aria-expanded', 'false');
  }
  if (!mobileTrigger && mobileMenu && !mobileMenu.contains(event.target)) {
    mobileMenu.classList.add('hidden');
    const menuTrigger = document.querySelector('[onclick="toggleMobileMenu()"]');
    if (menuTrigger) menuTrigger.setAttribute('aria-expanded', 'false');
  }
});

// Keyboard focus leaving a disclosure should dismiss it just like an outside click.
document.addEventListener('focusin', function(event) {
  for (const [id, handler] of [['language-dropdown', 'toggleLanguageDropdown()'], ['mobile-menu', 'toggleMobileMenu()']]) {
    const menu = document.getElementById(id);
    const trigger = document.querySelector('[onclick="' + handler + '"]');
    if (menu && !menu.contains(event.target) && !trigger?.contains(event.target)) {
      menu.classList.add('hidden');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    const willOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    const trigger = document.querySelector('[onclick="toggleMobileMenu()"]');
    if (trigger) {
      trigger.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
    }
    if (willOpen) {
      const languageDropdown = document.getElementById('language-dropdown');
      const languageTrigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
      if (languageDropdown) languageDropdown.classList.add('hidden');
      if (languageTrigger) languageTrigger.setAttribute('aria-expanded', 'false');
    }
  }
}

// FAQ toggle functionality
function toggleFAQ(element) {
  const content = element.nextElementSibling;
  const arrow = element.querySelector('svg');
  if (!content) return;

  const shouldOpen = content.hidden;
  content.hidden = !shouldOpen;
  content.style.display = shouldOpen ? 'block' : 'none';
  if (arrow) arrow.style.transform = shouldOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  element.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
}

// Noderunners promo: copy discount code to clipboard
function copyPromoCode(button) {
  var code = 'BITCOINFRIESLAND';
  var label = button.querySelector('span');
  function markCopied() {
    button.classList.add('nr-copied');
    if (label) label.textContent = button.getAttribute('data-copied-text');
    setTimeout(function() {
      button.classList.remove('nr-copied');
      if (label) label.textContent = button.getAttribute('data-copy-text');
    }, 2000);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(markCopied).catch(function() {});
  } else {
    var ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); markCopied(); } catch (e) {}
    document.body.removeChild(ta);
  }
}

// Keyboard accessibility: make click-only controls operable with Enter/Space
document.addEventListener('DOMContentLoaded', function() {
  function makeAccessible(el, expandable) {
    if (!el) return;
    var isNativeControl = el.matches('button, a[href], input, select, textarea, summary');
    if (!isNativeControl && !el.getAttribute('role')) el.setAttribute('role', 'button');
    if (!isNativeControl && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (expandable && !el.hasAttribute('aria-expanded')) el.setAttribute('aria-expanded', 'false');
    if (!isNativeControl) {
      el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    }
  }
  // Language selector trigger
  const langTrigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
  if (langTrigger) {
    var languageLabels = { nl: 'Taal kiezen', en: 'Select language', fy: 'Taal kieze' };
    var pageLanguage = document.documentElement.lang || 'en';
    langTrigger.setAttribute('aria-haspopup', 'true');
    langTrigger.setAttribute('aria-controls', 'language-dropdown');
    if (!langTrigger.hasAttribute('aria-label')) {
      langTrigger.setAttribute('aria-label', languageLabels[pageLanguage] || languageLabels.en);
    }
    makeAccessible(langTrigger, true);
  }
  // Mobile navigation trigger
  const mobileTrigger = document.querySelector('[onclick="toggleMobileMenu()"]');
  if (mobileTrigger) {
    mobileTrigger.setAttribute('aria-controls', 'mobile-menu');
    makeAccessible(mobileTrigger, true);
  }
  // FAQ question headers
  document.querySelectorAll('[onclick="toggleFAQ(this)"]').forEach(function(el, index) {
    var content = el.nextElementSibling;
    if (el.tagName === 'BUTTON' && !el.hasAttribute('type')) el.setAttribute('type', 'button');
    if (content) {
      var contentId = content.id || 'faq-answer-' + (index + 1);
      content.id = contentId;
      content.hidden = true;
      content.style.display = 'none';
      el.setAttribute('aria-controls', contentId);
    }
    makeAccessible(el, true);
  });

  // Mark the current navigation destination, including clean Netlify URLs.
  function normalizedPath(pathname) {
    return pathname.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  }
  var currentPath = normalizedPath(window.location.pathname);
  document.querySelectorAll('nav a[href]').forEach(function(link) {
    var destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    var destinationPath = normalizedPath(destination.pathname);
    var isCurrent = destinationPath === currentPath;
    var isBlogSection = destinationPath.endsWith('/blog') && currentPath.indexOf(destinationPath + '/') === 0;
    if (isCurrent || isBlogSection) link.setAttribute('aria-current', 'page');
  });

  // Escape closes open navigation menus and returns focus to their trigger.
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    const languageDropdown = document.getElementById('language-dropdown');
    const mobileMenu = document.getElementById('mobile-menu');
    if (languageDropdown && !languageDropdown.classList.contains('hidden')) {
      languageDropdown.classList.add('hidden');
      if (langTrigger) {
        langTrigger.setAttribute('aria-expanded', 'false');
        langTrigger.focus();
      }
    }
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (mobileTrigger) {
        mobileTrigger.setAttribute('aria-expanded', 'false');
        mobileTrigger.focus();
      }
    }
  });
});

// Cache the header and only change its class when the shadow state changes.
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('nav');
  if (!header) return;
  let hasShadow;
  function updateHeaderShadow() {
    const shouldHaveShadow = window.scrollY > 0;
    if (hasShadow === shouldHaveShadow) return;
    header.classList.toggle('shadow-md', shouldHaveShadow);
    hasShadow = shouldHaveShadow;
  }
  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
});

// Sortable table functionality for map pages
function sortTable(columnIndex, tableId = 'businessTable') {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  
  // Determine sort direction
  const currentDirection = table.dataset.sortDirection;
  const currentColumn = table.dataset.sortColumn;
  const newDirection = currentColumn === String(columnIndex) && currentDirection === 'asc' ? 'desc' : 'asc';
  table.dataset.sortDirection = newDirection;
  table.dataset.sortColumn = String(columnIndex);
  
  // Sort rows
  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();
    
    var locale = document.documentElement.lang || undefined;
    var comparison = aText.localeCompare(bText, locale, { numeric: true, sensitivity: 'base' });
    return newDirection === 'asc' ? comparison : -comparison;
  });
  
  // Clear tbody and append sorted rows
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
  
  // Update sort indicators
  const headers = table.querySelectorAll('th');
  headers.forEach((header, index) => {
    const indicator = header.querySelector('.sort-indicator');
    if (indicator) {
      if (index === columnIndex) {
        indicator.textContent = newDirection === 'asc' ? ' ↑' : ' ↓';
        header.setAttribute('aria-sort', newDirection === 'asc' ? 'ascending' : 'descending');
      } else {
        indicator.textContent = '';
        header.setAttribute('aria-sort', 'none');
      }
    }
  });
}

// Initialize sortable tables when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add sort indicators to table headers
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const headers = table.querySelectorAll('th');
    var sortLabels = { nl: 'Sorteer op', en: 'Sort by', fy: 'Sortearje op' };
    var pageLanguage = document.documentElement.lang || 'en';
    headers.forEach((header, index) => {
      if (header.textContent.trim() && !header.querySelector('.sort-indicator')) {
        var headerText = header.textContent.trim();
        header.style.cursor = 'pointer';
        header.innerHTML += '<span class="sort-indicator"></span>';
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-sort', 'none');
        header.setAttribute('aria-label', (sortLabels[pageLanguage] || sortLabels.en) + ' ' + headerText);
        header.addEventListener('click', () => sortTable(index, table.id));
        header.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            sortTable(index, table.id);
          }
        });
      }
    });
  });
});

// Scroll reveal (v4): gentle fade+rise for cards as they enter the viewport.
// Mirrors the staggered entrances of the old React site. No-JS = fully visible.
document.addEventListener('DOMContentLoaded', function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  var targets = document.querySelectorAll('.max-w-md.rounded-2xl, article[class*="border"], .link-category');
  if (!targets.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);
      el.classList.add('in');
      // after the reveal finishes, hand the element back to its CSS hover transitions
      setTimeout(function() {
        el.classList.remove('bf-reveal', 'in');
        el.style.transitionDelay = '';
      }, 750);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  targets.forEach(function(el, i) {
    el.classList.add('bf-reveal');
    el.style.transitionDelay = (i % 3) * 70 + 'ms'; // small stagger within rows
    observer.observe(el);
  });
});

// Shared submission presentation. Validation remains the responsibility of each form.
function markFormSubmitting(form) {
  const button = form.querySelector('[type="submit"]');
  if (!button) return;
  if (!pendingFormButtons.has(button)) {
    pendingFormButtons.set(button, { text: button.textContent, disabled: button.disabled });
  }
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  if (button.dataset.submittingText) button.textContent = button.dataset.submittingText;
}

// Back/forward cache restores the DOM, including a previously disabled button.
const pendingFormButtons = new Map();
window.addEventListener('pageshow', function() {
  pendingFormButtons.forEach(function(original, button) {
    button.disabled = original.disabled;
    button.textContent = original.text;
    button.removeAttribute('aria-busy');
  });
  pendingFormButtons.clear();
});

// Filter the existing HTML table; all listings remain available without JS.
document.addEventListener('DOMContentLoaded', function() {
  const search = document.querySelector('[data-business-search]');
  const table = document.getElementById('businessTable');
  const status = document.querySelector('[data-business-search-status]');
  const controls = document.querySelector('[data-business-search-controls]');
  if (!search || !table || !status || !controls) return;
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const rows = Array.from(table.tBodies[0].rows).map(row => ({
    element: row,
    text: normalize(Array.from(row.cells).slice(0, 4).map(cell => cell.textContent).join(' ')),
  }));
  function filterBusinesses() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    rows.forEach(function(row) {
      row.element.hidden = !terms.every(term => row.text.includes(term));
      if (!row.element.hidden) visible += 1;
    });
    status.textContent = status.dataset.countText.replace('{count}', visible).replace('{total}', rows.length);
    const empty = document.querySelector('[data-business-search-empty]');
    if (empty) empty.hidden = visible !== 0;
  }
  controls.hidden = false;
  search.addEventListener('input', filterBusinesses);
  filterBusinesses();
});

// Support page: preselect the chosen contribution type and show form confirmation.
document.addEventListener('DOMContentLoaded', function() {
  var interestSelect = document.getElementById('support-interest-type');
  var supportForm = document.querySelector('form[name="support-interest"]');

  document.querySelectorAll('[data-support-choice]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (!interestSelect) return;
      interestSelect.value = link.getAttribute('data-support-choice') || '';
    });
  });

  if (interestSelect) {
    interestSelect.addEventListener('change', function() {
      if (interestSelect.value !== 'supporter') return;
      var supporterTrigger = document.querySelector('[data-supporter-open]');
      if (!supporterTrigger) return;
      interestSelect.value = '';
      supporterTrigger.click();
    });
  }

  if (supportForm) {
    supportForm.addEventListener('submit', function() {
      markFormSubmitting(supportForm);
    });
  }

  var submitted = new URLSearchParams(window.location.search).get('submitted') === 'true';
  var confirmation = document.querySelector('[data-support-success]');
  if (submitted && confirmation) {
    confirmation.hidden = false;
    confirmation.focus();
  }
});

// Supporter signup: accessible three-step preference flow.
document.addEventListener('DOMContentLoaded', function() {
  var dialog = document.getElementById('supporter-flow');
  if (!dialog) return;

  var form = dialog.querySelector('form[name="supporter-signup"]');
  if (!form) return;
  // Validate the active step ourselves: native whole-form validation tries to
  // focus required controls in hidden steps before the submit handler runs.
  form.noValidate = true;
  var success = dialog.querySelector('[data-supporter-flow-success]');
  var error = dialog.querySelector('[data-supporter-error]');
  const steps = { details: 1, preferences: 2, review: 3 };
  let currentStep = steps.details;
  const panels = dialog.querySelectorAll('[data-supporter-step]');
  const indicators = dialog.querySelectorAll('[data-supporter-step-indicator]');
  const addressFields = Array.from(form.querySelectorAll('[data-address-required]'));

  function openDialog() {
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.documentElement.classList.add('supporter-flow-open');
  }

  function closeDialog() {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    document.documentElement.classList.remove('supporter-flow-open');
  }

  function showError(message, focusTarget) {
    error.textContent = message;
    error.hidden = false;
    if (focusTarget) focusTarget.focus();
  }

  function clearError() {
    error.hidden = true;
    error.textContent = '';
  }

  function setStep(step, shouldFocus) {
    currentStep = Math.max(steps.details, Math.min(steps.review, step));
    panels.forEach(function(panel) {
      panel.hidden = Number(panel.getAttribute('data-supporter-step')) !== currentStep;
    });
    indicators.forEach(function(item) {
      if (Number(item.getAttribute('data-supporter-step-indicator')) === currentStep) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    clearError();
    dialog.querySelector('.supporter-flow-card').scrollTop = 0;
    if (shouldFocus) {
      var heading = dialog.querySelector('[data-supporter-step="' + currentStep + '"] h3');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }
    }
  }

  function validateFields(fields, step) {
    fields.forEach(function(field) { field.value = field.value.trim(); });
    const invalid = fields.find(function(field) { return !field.checkValidity(); });
    if (!invalid) return true;
    setStep(step, false);
    invalid.reportValidity();
    return false;
  }

  function validateDetails() {
    if (!validateFields([form.elements.name, form.elements.email], steps.details)) return false;
    if (!form.elements.telegram_username.value.trim() && !form.elements.signal_username.value.trim()) {
      setStep(steps.details, false);
      showError(dialog.getAttribute('data-contact-error'), form.elements.telegram_username);
      return false;
    }
    return true;
  }

  function checkedValue(name) {
    return form.querySelector('input[name="' + name + '"]:checked');
  }

  function validatePreferences() {
    var groups = ['payment_timing', 'sticker_delivery'];
    for (var i = 0; i < groups.length; i += 1) {
      if (!checkedValue(groups[i])) {
        setStep(steps.preferences, false);
        showError(dialog.getAttribute('data-choice-error'), form.querySelector('input[name="' + groups[i] + '"]'));
        return false;
      }
    }
    if (checkedValue('sticker_delivery').value === 'mail') {
      return validateFields(addressFields, steps.preferences);
    }
    return true;
  }

  function selectedLabel(name) {
    var selected = checkedValue(name);
    if (!selected) return dialog.getAttribute('data-not-provided');
    var label = selected.closest('.supporter-choice');
    var strong = label ? label.querySelector('strong') : null;
    return strong ? strong.textContent.trim() : selected.value;
  }

  function setReview(key, value) {
    var target = dialog.querySelector('[data-review="' + key + '"]');
    if (target) target.textContent = value || dialog.getAttribute('data-not-provided');
  }

  function updateReview() {
    setReview('name', form.elements.name.value.trim());
    setReview('email', form.elements.email.value.trim());
    setReview('telegram_username', form.elements.telegram_username.value.trim());
    setReview('signal_username', form.elements.signal_username.value.trim());
    setReview('payment_timing', selectedLabel('payment_timing'));
    setReview('sticker_delivery', selectedLabel('sticker_delivery'));

    var addressRow = dialog.querySelector('[data-review-address-row]');
    var mailSelected = checkedValue('sticker_delivery') && checkedValue('sticker_delivery').value === 'mail';
    addressRow.hidden = !mailSelected;
    if (mailSelected) {
      setReview('address', [form.elements.address_line1.value, form.elements.postal_code.value, form.elements.city.value, form.elements.country.value].filter(Boolean).join(', '));
    }
  }

  function updateAddressFields() {
    var selected = checkedValue('sticker_delivery');
    var showAddress = selected && selected.value === 'mail';
    var address = dialog.querySelector('[data-supporter-address]');
    address.hidden = !showAddress;
    addressFields.forEach(function(field) {
      field.required = Boolean(showAddress);
      // Preserve edits if the user switches back to mail, but do not submit
      // unnecessary personal address data when pickup is selected.
      field.disabled = !showAddress;
    });
  }

  document.querySelectorAll('[data-supporter-open]').forEach(function(trigger) {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      if (!success || success.hidden) setStep(steps.details, false);
      openDialog();
      var firstField = dialog.querySelector('[data-supporter-step="1"] input');
      if (firstField && (!success || success.hidden)) firstField.focus();
    });
  });

  dialog.querySelectorAll('[data-supporter-close]').forEach(function(button) {
    button.addEventListener('click', closeDialog);
  });

  dialog.addEventListener('close', function() {
    document.documentElement.classList.remove('supporter-flow-open');
  });

  dialog.addEventListener('click', function(event) {
    if (event.target === dialog) closeDialog();
  });

  // Buttons and Enter use the same transition and validation rules.
  function advanceStep() {
    if (currentStep === steps.details) {
      if (validateDetails()) setStep(steps.preferences, true);
    } else if (currentStep === steps.preferences && validatePreferences()) {
      updateReview();
      setStep(steps.review, true);
    }
  }

  dialog.querySelectorAll('[data-supporter-next]').forEach(function(button) {
    button.addEventListener('click', advanceStep);
  });

  dialog.querySelectorAll('[data-supporter-back]').forEach(function(button) {
    button.addEventListener('click', function() { setStep(currentStep - 1, true); });
  });

  form.querySelectorAll('input').forEach(function(input) {
    input.addEventListener('input', clearError);
  });

  form.querySelectorAll('input[name="sticker_delivery"]').forEach(function(input) {
    input.addEventListener('change', updateAddressFields);
  });

  form.addEventListener('submit', function(event) {
    if (currentStep !== steps.review) {
      event.preventDefault();
      advanceStep();
      return;
    }
    if (!validateDetails() || !validatePreferences()) {
      event.preventDefault();
      return;
    }
    form.elements.submitted_at.value = new Date().toISOString();
    markFormSubmitting(form);
  });

  updateAddressFields();
  setStep(steps.details, false);

  var supporterSubmitted = new URLSearchParams(window.location.search).get('supporter-submitted') === 'true';
  if (supporterSubmitted && success) {
    form.hidden = true;
    success.hidden = false;
    openDialog();
    success.focus();
  }
});

// Sats calculator: converts sats to euro or dollar and back with a live bitcoin price.
// Prices come from mempool.space, with CoinGecko as a fallback. Nothing is stored.
document.addEventListener('DOMContentLoaded', function() {
  var root = document.querySelector('[data-sats-calculator]');
  if (!root) return;

  var locale = root.getAttribute('data-locale') || 'nl-NL';
  var satsInput = root.querySelector('[data-field="sats"]');
  var fiatInput = root.querySelector('[data-field="fiat"]');
  var priceLine = root.querySelector('[data-price-line]');
  var rateLine = root.querySelector('[data-rate-line]');
  var btcLine = root.querySelector('[data-btc-line]');
  var fiatLabel = root.querySelector('[data-fiat-label]');
  var refreshButton = root.querySelector('[data-refresh]');
  var currency = 'EUR';
  var prices = null;
  var lastEdited = 'sats';
  var decimalSeparator = (1.1).toLocaleString(locale).charAt(1);

  function number(value, digits) {
    return new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  }
  function money(value, digits) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  }
  function fiatDigits(value) {
    if (value === 0) return 2;
    if (value < 0.01) return 5;
    if (value < 1) return 4;
    return 2;
  }
  function parseSats(text) {
    var digits = String(text).replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : null;
  }
  function parseFiat(text) {
    var cleaned = String(text).replace(/[\s ]/g, '');
    if (decimalSeparator === ',') cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    else cleaned = cleaned.replace(/,/g, '');
    var value = parseFloat(cleaned.replace(/[^\d.]/g, ''));
    return isNaN(value) ? null : value;
  }
  function price() {
    return prices ? prices[currency] : null;
  }

  function showBtc(sats) {
    if (!btcLine) return;
    if (sats === null) { btcLine.textContent = ''; return; }
    var btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 8 }).format(sats / 1e8);
    btcLine.textContent = '= ' + btc + ' BTC';
  }

  function recalculate() {
    var p = price();
    if (lastEdited === 'sats') {
      var sats = parseSats(satsInput.value);
      showBtc(sats);
      if (!p || sats === null) { fiatInput.value = ''; return; }
      var fiat = sats / 1e8 * p;
      fiatInput.value = number(fiat, fiatDigits(fiat));
    } else {
      var amount = parseFiat(fiatInput.value);
      if (!p || amount === null) { satsInput.value = ''; showBtc(null); return; }
      var result = Math.round(amount / p * 1e8);
      satsInput.value = number(result, 0);
      showBtc(result);
    }
  }

  function showPrice() {
    var p = price();
    if (!p) return;
    priceLine.textContent = root.getAttribute('data-text-price').replace('{price}', money(p, 0));
    if (rateLine) {
      rateLine.textContent = root.getAttribute('data-text-rate')
        .replace('{one}', money(1, 0))
        .replace('{sats}', number(Math.round(1e8 / p), 0))
        .replace('{time}', new Date(prices.time).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }));
    }
  }

  function fetchJson(url) {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function() { controller.abort(); }, 8000) : null;
    return fetch(url, controller ? { signal: controller.signal } : {}).then(function(response) {
      if (timer) clearTimeout(timer);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    });
  }

  function loadPrices() {
    root.classList.add('is-loading');
    return fetchJson('https://mempool.space/api/v1/prices')
      .then(function(data) {
        if (!data.EUR || !data.USD) throw new Error('missing price');
        return { EUR: data.EUR, USD: data.USD, time: Date.now() };
      })
      .catch(function() {
        return fetchJson('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd').then(function(data) {
          return { EUR: data.bitcoin.eur, USD: data.bitcoin.usd, time: Date.now() };
        });
      })
      .then(function(result) {
        prices = result;
        root.classList.remove('is-error');
        showPrice();
        recalculate();
      })
      .catch(function() {
        root.classList.add('is-error');
        priceLine.textContent = root.getAttribute('data-text-error');
        if (rateLine) rateLine.textContent = '';
      })
      .then(function() {
        root.classList.remove('is-loading');
      });
  }

  function setCurrency(next) {
    currency = next;
    root.querySelectorAll('[data-currency]').forEach(function(button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-currency') === next ? 'true' : 'false');
    });
    if (fiatLabel) fiatLabel.textContent = fiatLabel.getAttribute(next === 'EUR' ? 'data-label-eur' : 'data-label-usd');
    root.querySelectorAll('[data-fiat]').forEach(function(chip) {
      chip.textContent = money(parseFloat(chip.getAttribute('data-fiat')), 0);
    });
    showPrice();
    recalculate();
  }

  satsInput.addEventListener('input', function() { lastEdited = 'sats'; recalculate(); });
  fiatInput.addEventListener('input', function() { lastEdited = 'fiat'; recalculate(); });
  satsInput.addEventListener('blur', function() {
    var sats = parseSats(satsInput.value);
    if (sats !== null) satsInput.value = number(sats, 0);
  });
  root.querySelectorAll('[data-currency]').forEach(function(button) {
    button.addEventListener('click', function() { setCurrency(button.getAttribute('data-currency')); });
  });
  root.querySelectorAll('[data-sats]').forEach(function(chip) {
    chip.addEventListener('click', function() {
      lastEdited = 'sats';
      satsInput.value = number(parseInt(chip.getAttribute('data-sats'), 10), 0);
      recalculate();
    });
  });
  root.querySelectorAll('[data-fiat]').forEach(function(chip) {
    chip.addEventListener('click', function() {
      lastEdited = 'fiat';
      fiatInput.value = number(parseFloat(chip.getAttribute('data-fiat')), 0);
      recalculate();
    });
  });
  if (refreshButton) refreshButton.addEventListener('click', loadPrices);

  root.hidden = false;
  setCurrency('EUR');
  loadPrices();
  setInterval(function() { if (!document.hidden) loadPrices(); }, 60000);
});

// Footer: live Bitcoin block height from mempool.space (Blockstream as fallback).
// A new block arrives roughly every ten minutes; checking each minute shows it promptly.
document.addEventListener('DOMContentLoaded', function() {
  var badge = document.querySelector('[data-block-height]');
  if (!badge || typeof fetch !== 'function') return;
  var number = badge.querySelector('[data-block-number]');
  var locale = document.documentElement.lang === 'en' ? 'en-GB' : 'nl-NL';
  var current = null;

  function height(url) {
    return fetch(url, { cache: 'no-store' }).then(function(response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.text();
    }).then(function(text) {
      var value = parseInt(text, 10);
      if (!value) throw new Error('bad height');
      return value;
    });
  }

  function update() {
    height('https://mempool.space/api/blocks/tip/height')
      .catch(function() { return height('https://blockstream.info/api/blocks/tip/height'); })
      .then(function(value) {
        if (value === current) return;
        var isNew = current !== null;
        current = value;
        number.textContent = new Intl.NumberFormat(locale).format(value);
        badge.hidden = false;
        if (isNew) {
          badge.classList.remove('is-new');
          void badge.offsetWidth;
          badge.classList.add('is-new');
        }
      })
      .catch(function() {});
  }

  update();
  setInterval(function() { if (!document.hidden) update(); }, 60000);
});

// Homepage: a different Bitcoin or cypherpunk quote every day (same quote for everyone on a given day).
// Original wording only, each with its source and date.
var BF_QUOTES = [
  ['The root problem with conventional currency is all the trust that’s required to make it work.', 'Satoshi Nakamoto', 'P2P Foundation', '2009-02-11'],
  ['I’ve been working on a new electronic cash system that’s fully peer-to-peer, with no trusted third party.', 'Satoshi Nakamoto', 'Cryptography mailing list', '2008-10-31'],
  ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks', 'Satoshi Nakamoto', 'Bitcoin genesis block', '2009-01-03'],
  ['It might make sense just to get some in case it catches on.', 'Satoshi Nakamoto', 'Cryptography mailing list', '2009-01'],
  ['Lost coins only make everyone else’s coins worth slightly more. Think of it as a donation to everyone.', 'Satoshi Nakamoto', 'Bitcointalk', '2010-06-21'],
  ['If you don’t believe it or don’t get it, I don’t have the time to try to convince you, sorry.', 'Satoshi Nakamoto', 'Bitcointalk', '2010-07-29'],
  ['Writing a description for this thing for general audiences is bloody hard. There’s nothing to relate it to.', 'Satoshi Nakamoto', 'Bitcointalk', '2010-07-05'],
  ['The nature of Bitcoin is such that once version 0.1 was released, the core design was set in stone for the rest of its lifetime.', 'Satoshi Nakamoto', 'Bitcointalk', '2010-06-17'],
  ['In a few decades when the reward gets too small, the transaction fee will become the main compensation for nodes.', 'Satoshi Nakamoto', 'Bitcointalk', '2010-02'],
  ['I’m sure that in 20 years there will either be very large transaction volume or no volume.', 'Satoshi Nakamoto', 'Bitcointalk', '2010-02'],
  ['It’s very attractive to the libertarian viewpoint if we can explain it properly. I’m better with code than with words though.', 'Satoshi Nakamoto', 'Cryptography mailing list', '2008-11'],
  ['…we can win a major battle in the arms race and gain a new territory of freedom for several years.', 'Satoshi Nakamoto', 'Cryptography mailing list', '2008-11'],
  ['Bitcoin is an implementation of Wei Dai’s b-money proposal on Cypherpunks in 1998 and Nick Szabo’s Bitgold proposal.', 'Satoshi Nakamoto', 'Bitcointalk', '2010'],
  ['Running bitcoin', 'Hal Finney', 'Twitter', '2009-01'],
  ['Bitcoin seems to be a very promising idea.', 'Hal Finney', 'Cryptography mailing list', '2008-11'],
  ['Privacy is necessary for an open society in the electronic age.', 'Eric Hughes', 'A Cypherpunk’s Manifesto', '1993-03-09'],
  ['Cypherpunks write code.', 'Eric Hughes', 'A Cypherpunk’s Manifesto', '1993-03-09'],
  ['We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence.', 'Eric Hughes', 'A Cypherpunk’s Manifesto', '1993-03-09'],
  ['A specter is haunting the modern world, the specter of crypto anarchy.', 'Timothy C. May', 'The Crypto Anarchist Manifesto', '1988'],
  ['Trusted third parties are security holes.', 'Nick Szabo', 'Trusted Third Parties Are Security Holes', '2001'],
  ['I am fascinated by Tim May’s crypto-anarchy.', 'Wei Dai', 'b-money', '1998']
];

document.addEventListener('DOMContentLoaded', function() {
  var box = document.querySelector('[data-quote-of-the-day]');
  if (!box) return;
  var locale = document.documentElement.lang === 'en' ? 'en-GB' : (document.documentElement.lang === 'fy' ? 'fy-NL' : 'nl-NL');
  var now = new Date();
  var day = Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
  var quote = BF_QUOTES[day % BF_QUOTES.length];
  var parts = quote[3].split('-');
  var date;
  if (parts.length === 1) {
    date = parts[0];
  } else if (document.documentElement.lang === 'fy') {
    // Browsers have no Frisian month names, so spell them out.
    var months = ['jannewaris', 'febrewaris', 'maart', 'april', 'maaie', 'juny', 'july', 'augustus', 'septimber', 'oktober', 'novimber', 'desimber'];
    date = (parts[2] ? +parts[2] + ' ' : '') + months[+parts[1] - 1] + ' ' + parts[0];
  } else {
    date = new Intl.DateTimeFormat(locale, parts.length === 3 ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' } : { month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(Date.UTC(+parts[0], +parts[1] - 1, +(parts[2] || 1))));
  }
  box.querySelector('[data-quote-text]').textContent = quote[0];
  box.querySelector('[data-quote-author]').textContent = quote[1];
  box.querySelector('[data-quote-source]').textContent = quote[2] + ', ' + date;
});

// Follow us: copy the Nostr npub, and show the latest Nostr note when one exists.
// The relays are asked for one kind-1 note of our pubkey; with no answer the
// note box simply stays hidden and the card still works as a follow link.
(function() {
  document.querySelectorAll('[data-copy]').forEach(function(button) {
    button.addEventListener('click', function() {
      var value = button.getAttribute('data-copy');
      var label = button.querySelector('span');
      var original = label ? label.textContent : '';
      function done() {
        if (!label) return;
        label.textContent = button.getAttribute('data-copied-text') || original;
        setTimeout(function() { label.textContent = original; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function() {});
      }
    });
  });

  var feed = document.querySelector('[data-nostr-feed]');
  if (!feed || typeof WebSocket === 'undefined') return;
  var pubkey = feed.getAttribute('data-pubkey');
  var relays = ['wss://relay.damus.io', 'wss://nos.lol', 'wss://relay.primal.net'];
  var newest = null;
  var sockets = [];

  function render(event) {
    var text = String(event.content || '').replace(/nostr:\S+/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    feed.querySelector('[data-nostr-text]').textContent = text.length > 280 ? text.slice(0, 277) + '…' : text;
    var time = feed.querySelector('[data-nostr-time]');
    try {
      time.textContent = new Date(event.created_at * 1000).toLocaleDateString(feed.getAttribute('data-locale') || 'nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { time.textContent = ''; }
    feed.hidden = false;
  }

  relays.forEach(function(url) {
    try {
      var socket = new WebSocket(url);
      sockets.push(socket);
      socket.onopen = function() {
        socket.send(JSON.stringify(['REQ', 'bf-latest', { authors: [pubkey], kinds: [1], limit: 1 }]));
      };
      socket.onmessage = function(message) {
        var data;
        try { data = JSON.parse(message.data); } catch (e) { return; }
        if (data[0] === 'EVENT' && data[2] && data[2].pubkey === pubkey && data[2].kind === 1) {
          if (!newest || data[2].created_at > newest.created_at) { newest = data[2]; render(newest); }
        } else if (data[0] === 'EOSE') {
          socket.close();
        }
      };
      socket.onerror = function() {};
    } catch (e) {}
  });
  setTimeout(function() { sockets.forEach(function(s) { try { s.close(); } catch (e) {} }); }, 8000);
})();
