// Essential JavaScript functions for Bitcoin Friesland website

// Force show desktop menu on desktop
function updateMenuVisibility() {
  const desktopMenu = document.querySelector('.nav-menu');
  if (desktopMenu) {
    desktopMenu.style.display = window.innerWidth >= 1200 ? 'flex' : '';
  }
}

// Run on load and resize
window.addEventListener('load', updateMenuVisibility);
window.addEventListener('resize', updateMenuVisibility);

// Language dropdown toggle
function toggleLanguageDropdown() {
  const dropdown = document.getElementById('language-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
    const trigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
    if (trigger) {
      trigger.setAttribute('aria-expanded', dropdown.classList.contains('hidden') ? 'false' : 'true');
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('language-dropdown');
  const trigger = event.target.closest('[onclick="toggleLanguageDropdown()"]');
  
  if (!trigger && dropdown && !dropdown.contains(event.target)) {
    dropdown.classList.add('hidden');
    const languageTrigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
    if (languageTrigger) languageTrigger.setAttribute('aria-expanded', 'false');
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
    const trigger = document.querySelector('[onclick="toggleMobileMenu()"]');
    if (trigger) {
      trigger.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
    }
  }
}

// FAQ toggle functionality
function toggleFAQ(element) {
  const content = element.nextElementSibling;
  const arrow = element.querySelector('svg');
  
  if (content.style.display === 'none' || content.style.display === '') {
    content.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
    element.setAttribute('aria-expanded', 'true');
  } else {
    content.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    element.setAttribute('aria-expanded', 'false');
  }
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
    if (!el.getAttribute('role')) el.setAttribute('role', 'button');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (expandable && !el.hasAttribute('aria-expanded')) el.setAttribute('aria-expanded', 'false');
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  }
  // Language selector trigger
  const langTrigger = document.querySelector('[onclick="toggleLanguageDropdown()"]');
  if (langTrigger) {
    langTrigger.setAttribute('aria-haspopup', 'true');
    langTrigger.setAttribute('aria-label', 'Select language');
    makeAccessible(langTrigger, true);
  }
  // Mobile navigation trigger
  const mobileTrigger = document.querySelector('[onclick="toggleMobileMenu()"]');
  if (mobileTrigger) {
    mobileTrigger.setAttribute('aria-controls', 'mobile-menu');
    makeAccessible(mobileTrigger, true);
  }
  // FAQ question headers
  document.querySelectorAll('[onclick="toggleFAQ(this)"]').forEach(function(el) {
    makeAccessible(el, true);
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

// Scroll shadow for header
window.addEventListener('scroll', function() {
  const header = document.querySelector('nav');
  if (window.scrollY > 0) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
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
    
    if (newDirection === 'asc') {
      return aText.localeCompare(bText);
    } else {
      return bText.localeCompare(aText);
    }
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
    headers.forEach((header, index) => {
      if (header.textContent.trim() && !header.querySelector('.sort-indicator')) {
        header.style.cursor = 'pointer';
        header.innerHTML += '<span class="sort-indicator"></span>';
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-sort', 'none');
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

// Support page: preselect the chosen contribution type and show form confirmation.
document.addEventListener('DOMContentLoaded', function() {
  var interestSelect = document.getElementById('support-interest-type');

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
  var success = dialog.querySelector('[data-supporter-flow-success]');
  var error = dialog.querySelector('[data-supporter-error]');
  var currentStep = 1;

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
    currentStep = Math.max(1, Math.min(3, step));
    dialog.querySelectorAll('[data-supporter-step]').forEach(function(panel) {
      panel.hidden = Number(panel.getAttribute('data-supporter-step')) !== currentStep;
    });
    dialog.querySelectorAll('[data-supporter-step-indicator]').forEach(function(item) {
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

  function validateDetails() {
    var name = form.elements.name;
    var email = form.elements.email;
    if (!name.checkValidity()) { name.reportValidity(); return false; }
    if (!email.checkValidity()) { email.reportValidity(); return false; }
    if (!form.elements.telegram_username.value.trim() && !form.elements.signal_username.value.trim()) {
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
        showError(dialog.getAttribute('data-choice-error'), form.querySelector('input[name="' + groups[i] + '"]'));
        return false;
      }
    }
    if (checkedValue('sticker_delivery').value === 'mail') {
      var addressFields = form.querySelectorAll('[data-address-required]');
      for (var j = 0; j < addressFields.length; j += 1) {
        if (!addressFields[j].checkValidity()) {
          addressFields[j].reportValidity();
          return false;
        }
      }
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
    address.querySelectorAll('[data-address-required]').forEach(function(field) {
      field.required = Boolean(showAddress);
    });
  }

  document.querySelectorAll('[data-supporter-open]').forEach(function(trigger) {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      if (!success || success.hidden) setStep(1, false);
      openDialog();
      window.setTimeout(function() {
        var firstField = dialog.querySelector('[data-supporter-step="1"] input');
        if (firstField && (!success || success.hidden)) firstField.focus();
      }, 50);
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

  dialog.querySelectorAll('[data-supporter-next]').forEach(function(button) {
    button.addEventListener('click', function() {
      if (currentStep === 1 && !validateDetails()) return;
      if (currentStep === 2 && !validatePreferences()) return;
      if (currentStep === 2) updateReview();
      setStep(currentStep + 1, true);
    });
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
    if (currentStep < 3) {
      event.preventDefault();
      if (currentStep === 1 && validateDetails()) setStep(2, true);
      else if (currentStep === 2 && validatePreferences()) { updateReview(); setStep(3, true); }
      return;
    }
    if (!validateDetails() || !validatePreferences()) {
      event.preventDefault();
      return;
    }
    form.elements.submitted_at.value = new Date().toISOString();
    var submitButton = form.querySelector('[data-supporter-submit]');
    if (submitButton) submitButton.disabled = true;
  });

  updateAddressFields();
  setStep(1, false);

  var supporterSubmitted = new URLSearchParams(window.location.search).get('supporter-submitted') === 'true';
  if (supporterSubmitted && success) {
    form.hidden = true;
    success.hidden = false;
    openDialog();
    success.focus();
  }
});
