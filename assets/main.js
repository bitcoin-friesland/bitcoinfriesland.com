// Essential JavaScript functions for Bitcoin Friesland website

// Force show desktop menu on desktop
function updateMenuVisibility() {
  const desktopMenu = document.querySelector('.nav-menu');
  if (desktopMenu && window.innerWidth >= 768) {
    desktopMenu.style.display = 'flex';
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
  } else {
    content.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  }
}

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
