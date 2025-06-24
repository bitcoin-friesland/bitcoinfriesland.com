# Bitcoin Friesland - System Patterns

## Code Organization Patterns

### File Naming Conventions
- **HTML Files**: lowercase with hyphens (e.g., `treasure-hunt.html`)
- **CSS Files**: descriptive names (e.g., `main.css`, `components.css`)
- **JavaScript Files**: feature-based (e.g., `language.js`, `router.js`)
- **Images**: descriptive with UUIDs for uploads

### Directory Structure Pattern
```
[lang]/
├── index.html          # Homepage
├── business.html       # Business-focused content
├── consumers.html      # Consumer-focused content
├── treasure-hunt.html  # Event-specific content
├── meetings.html       # Community events
├── map.html           # Business directory
└── links.html         # Resource collection
```

## HTML Patterns

### Page Structure Template
```html
<!DOCTYPE html>
<html lang="[lang]">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bitcoin Friesland - [Page Title]</title>
  <meta name="description" content="[Page Description]" />
  <link rel="stylesheet" href="../assets/index-[hash].css">
  <link rel="icon" href="../lovable-uploads/[logo-hash].png" />
</head>
<body>
  <div id="root">
    <nav><!-- Navigation --></nav>
    <main><!-- Page Content --></main>
    <footer><!-- Footer --></footer>
  </div>
  <script><!-- Page Scripts --></script>
</body>
</html>
```

### Navigation Pattern
- **Consistent across all pages**
- **Mobile-first responsive design**
- **Language switcher in header**
- **Active page styling**

### Content Section Pattern
```html
<section class="py-20 bg-[background]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">
      [Section Title]
    </h2>
    <div class="[content-layout]">
      <!-- Section content -->
    </div>
  </div>
</section>
```

## CSS Patterns

### Tailwind Utility Classes
- **Spacing**: Consistent padding/margin (py-20, px-4, mb-10)
- **Typography**: Hierarchical sizing (text-3xl, text-lg, text-sm)
- **Colors**: Brand colors (friesland-blue, bitcoin-orange)
- **Layout**: Flexbox and grid utilities

### Responsive Design Pattern
```css
/* Mobile first approach */
.element {
  /* Mobile styles (default) */
}

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Component Styling Pattern
- **Cards**: `bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md`
- **Buttons**: `px-8 py-4 rounded-xl font-semibold transition-all duration-300`
- **Sections**: `py-20` for vertical spacing

## JavaScript Patterns

### Module Organization
```javascript
// Feature-based modules
function toggleMobileMenu() { /* ... */ }
function toggleLanguageDropdown() { /* ... */ }
function toggleFAQ(element) { /* ... */ }

// Event listeners
document.addEventListener('click', function(event) {
  // Event delegation pattern
});

window.addEventListener('scroll', function() {
  // Scroll-based functionality
});
```

### Mobile Menu Pattern
```javascript
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}
```

### Language Switching Pattern
- **Direct HTML links** between language versions
- **Dropdown with flags** for visual identification
- **Consistent URL structure** across languages

## Content Patterns

### Multilingual Content Structure
- **Consistent messaging** across languages
- **Cultural adaptation** for Frisian content
- **Professional tone** for business content
- **Educational approach** for consumer content

### Call-to-Action Pattern
```html
<div class="flex flex-col sm:flex-row gap-6 justify-center">
  <a href="[primary-action]" class="bg-friesland-blue hover:bg-friesland-blue/90 text-white [button-classes]">
    [Primary Action]
  </a>
  <a href="[secondary-action]" class="text-friesland-blue hover:text-friesland-blue/80 [link-classes]">
    [Secondary Action]
  </a>
</div>
```

### FAQ Pattern
```html
<div class="space-y-4">
  <div class="border border-gray-200 rounded-lg">
    <button onclick="toggleFAQ(this)" class="w-full px-6 py-4 text-left">
      <div class="flex justify-between items-center">
        <h3 class="font-semibold">[Question]</h3>
        <svg class="transform transition-transform"><!-- Arrow --></svg>
      </div>
    </button>
    <div class="px-6 pb-4 hidden">
      <p class="text-gray-600">[Answer]</p>
    </div>
  </div>
</div>
```

## Development Workflow Patterns

### File Creation Process
1. **Copy existing page** as template
2. **Update language-specific content**
3. **Maintain consistent structure**
4. **Test responsive behavior**
5. **Verify navigation links**

### Content Update Process
1. **Update primary language** (Dutch)
2. **Translate to other languages**
3. **Maintain consistent messaging**
4. **Update navigation if needed**

### **CRITICAL: Three-Language Maintenance**
**MANDATORY for ALL future updates:**
- **Always update NL, EN, FY simultaneously**
- **Use translation scripts**: restore-translations.cjs, complete-frisian-translation.cjs
- **Unique JavaScript function names per language** (avoid conflicts)
- **Test all three versions before deployment**
- **Never deploy single-language updates**

### **Communication Guidelines**
**For task completion and reporting:**
- **Brief summaries only**: Focus on latest changes from current prompt
- **No complete project overviews**: Avoid lengthy comprehensive reports
- **Concise updates**: What was changed, not entire project history
- **Context preservation**: Important details saved in these .md files, not in responses

### **Footer Consistency Requirements**
**MANDATORY: All pages must have identical footer structure:**
- **Risk Warning Section**: Required on ALL pages in ALL languages
  - NL: "Risicowaarschuwing" with volatility and deposit guarantee warning
  - EN: "Risk Warning" with same content translated
  - FY: "Risikowierskôging" with same content in Frisian
- **Footer Structure**: Navigation links, social links, copyright, Github link
- **Consistent styling**: Same colors, spacing, and layout across all pages
- **Script available**: `add-risk-warning-all-pages.cjs` for bulk updates
- **Never modify footer individually**: Always update all pages simultaneously

### Data-Driven Content Updates
**Key Success Factor**: Store structured data in JavaScript objects within scripts

**Pattern for Complex Content (e.g., Business Lists)**:
```javascript
// Define structured data array
const businessData = [
  {
    name: 'Business Name',
    type: 'Business Type',
    address: 'Street Address',
    city: 'City Name',
    onBTCMap: true,
    acceptsOnChain: false,
    acceptsLightning: true,
    website: 'https://example.com'
  }
  // ... more businesses
];

// Generate HTML from data
function createBusinessTable(businesses, lang) {
  return businesses.map(business => `
    <tr class="border-b border-gray-100 hover:bg-gray-50">
      <td class="py-3 px-4 font-medium">
        ${business.website ? `
          <a href="${business.website}" target="_blank">
            ${business.name}
          </a>
        ` : business.name}
      </td>
      <!-- More columns -->
    </tr>
  `).join('');
}
```

**Why This Works**:
- ✅ **Single source of truth**: Data defined once, used everywhere
- ✅ **Easy sorting**: `businesses.sort((a, b) => a.city.localeCompare(b.city))`
- ✅ **Consistent structure**: Template ensures uniform HTML
- ✅ **Bulk updates**: Change data array, regenerate all pages
- ✅ **Complex logic**: Conditional rendering, formatting, etc.

**Contrast with Manual HTML Editing**:
- ❌ **Error-prone**: Manual copy-paste across languages
- ❌ **Inconsistent**: Different formatting between pages
- ❌ **Hard to sort**: Manual reordering of HTML rows
- ❌ **Maintenance nightmare**: Updates require touching multiple files

### Critical Success Factors for Script-Based Updates

**Why Scripts Work Here vs. Failing in Other Projects**:

#### **1. Complete Content Replacement Strategy**
```javascript
// ✅ WORKS: Replace entire main content block
const newMainContent = `<main class="flex-grow bg-gray-50 py-12">
  <!-- Complete new content including data -->
</main>`;

const mainPattern = /<main class="flex-grow bg-gray-50 py-12">[\s\S]*?<\/main>/;
content = content.replace(mainPattern, newMainContent);
```

**vs. Partial Updates (often fail)**:
```javascript
// ❌ FRAGILE: Try to find and replace specific table rows
content = content.replace(/<tr>.*?Business Name.*?<\/tr>/, newRow);
```

#### **2. Robust Pattern Matching**
```javascript
// ✅ RELIABLE: Use broad, stable patterns
const mainPattern = /<main class="flex-grow bg-gray-50 py-12">[\s\S]*?<\/main>/;

// ❌ FRAGILE: Rely on specific content that might change
const tablePattern = /<table>.*specific business.*<\/table>/;
```

#### **3. Self-Contained Data + Template**
```javascript
// ✅ COMPLETE: Everything needed is in the script
const businessData = [...]; // All data
const mapData = {...}; // All translations
function createBusinessTable() {...} // Template function

// ❌ INCOMPLETE: Relies on external state or partial data
const newBusiness = {...}; // Only new item, not full list
```

#### **4. Predictable File Structure**
```javascript
// ✅ WORKS: Files have consistent, predictable structure
const currentFile = `static-site-final-perfect/${lang}/map.html`;
let content = fs.readFileSync(currentFile, 'utf8');

// ❌ FAILS: Inconsistent file structure or missing files
```

#### **5. Comprehensive Error Handling**
```javascript
// ✅ ROBUST: Handle all edge cases
Object.keys(mapData).forEach(lang => {
  console.log(`\nFinaliseren van ${lang} map pagina...`);
  
  const currentFile = `static-site-final-perfect/${lang}/map.html`;
  let content = fs.readFileSync(currentFile, 'utf8');
  
  // ... process content ...
  
  fs.writeFileSync(currentFile, content, 'utf8');
  console.log(`✅ ${lang} map pagina gefinaliseerd`);
});
```

**Why Other Projects Fail**:
1. **Partial Updates**: Try to modify existing HTML instead of replacing
2. **Fragile Patterns**: Depend on specific content that changes
3. **Missing Data**: Don't include complete dataset in script
4. **Inconsistent Structure**: Files don't match expected patterns
5. **No Error Recovery**: Scripts break on first failure

**Success Recipe**:
1. **Complete Replacement**: Replace entire content sections
2. **Stable Patterns**: Use structural HTML patterns, not content
3. **Self-Contained**: Include all data and templates in script
4. **Consistent Structure**: Ensure predictable file organization
5. **Robust Execution**: Handle errors gracefully with logging

### Testing Pattern
- **Cross-browser compatibility**
- **Mobile responsiveness**
- **Language switching functionality**
- **External link validation**

## Error Handling Patterns

### Graceful Degradation
- **JavaScript optional** for core functionality
- **CSS fallbacks** for older browsers
- **Progressive enhancement** approach

### Accessibility Patterns
- **Semantic HTML** structure
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** compliance

## Performance Patterns

### Asset Optimization
- **Minimal JavaScript** dependencies
- **Optimized images** with appropriate formats
- **CSS minification** for production
- **Static file** serving optimization

### Loading Patterns
- **Critical CSS** inline for above-fold content
- **Lazy loading** for images below fold
- **Minimal HTTP** requests
- **CDN-ready** static assets

These patterns ensure consistency, maintainability, and scalability across the Bitcoin Friesland website.
