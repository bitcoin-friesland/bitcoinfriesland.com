// Essential JavaScript functions for Bitcoin Friesland website

// Force show desktop menu on desktop
function updateMenuVisibility() {
  const desktopMenu = document.querySelector('.nav-menu');
  if (desktopMenu) {
    desktopMenu.style.display = window.innerWidth >= 1200 ? 'flex' : '';
  }
  if (window.innerWidth >= 1200) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileTrigger = document.querySelector('[onclick="toggleMobileMenu()"]');
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
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  if (button.dataset.submittingText) button.textContent = button.dataset.submittingText;
}

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
