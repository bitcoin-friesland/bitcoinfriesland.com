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
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
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
  // FAQ question headers
  document.querySelectorAll('[onclick="toggleFAQ(this)"]').forEach(function(el) {
    makeAccessible(el, true);
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
  const currentDirection = table.dataset.sortDirection || 'asc';
  const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
  table.dataset.sortDirection = newDirection;
  
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
      } else {
        indicator.textContent = '';
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
        header.addEventListener('click', () => sortTable(index, table.id));
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
