# Bitcoin Friesland - Technical Context

## Project Overview
Static website promoting Bitcoin adoption and education in Friesland, Netherlands. Live at bitcoinfriesland.com.

## Architecture & Structure

### File Organization
```
static-site-final-perfect/
├── nl/en/fy/          # Language-specific HTML files
├── css/               # Styling (Tailwind-based)
├── js/                # JavaScript functionality
└── assets/            # Static assets (optimized images, icons, JS/CSS)
```

### Pages Structure
- **index.html**: Homepage with hero, features, CTA
- **business.html**: Bitcoin for businesses (coinos.io guide, FAQ)
- **consumers.html**: Bitcoin for consumers (education, steps)
- **treasure-hunt.html**: Bitcoin treasure hunt event
- **meetings.html**: Community meetups and events
- **map.html**: Bitcoin-accepting businesses map
- **links.html**: Curated Bitcoin resources

## Technical Stack

### Frontend
- **HTML5**: Semantic markup, accessibility considerations
- **Tailwind CSS**: Utility-first styling framework
- **Vanilla JavaScript**: No frameworks, progressive enhancement
- **Responsive Design**: Mobile-first approach

### Styling System
- **Primary Colors**: 
  - `friesland-blue` (#1e40af)
  - `bitcoin-orange` (#f7931a)
- **Typography**: System fonts, readable hierarchy
- **Components**: Cards, buttons, navigation, forms
- **Responsive**: Breakpoints for mobile/tablet/desktop

### JavaScript Patterns
- **Module Pattern**: Organized functionality
- **Event Delegation**: Efficient event handling
- **Progressive Enhancement**: Works without JS
- **Mobile Menu**: Toggle-based navigation

## Internationalization

### Languages
- **Dutch (nl)**: Primary language
- **English (en)**: International audience
- **Frisian (fy)**: Local Frisian community

### Implementation
- **Directory Structure**: Language prefix (nl/, en/, fy/)
- **Language Switcher**: Dropdown in header
- **Content Translation**: Full page translations
- **URL Structure**: domain.com/[lang]/page.html

### **CRITICAL: Three-Language Requirements**
**ALL future changes MUST maintain three-language support:**
- **Mandatory**: NL, EN, FY for all new features/content
- **Translation Scripts**: Use restore-translations.cjs and complete-frisian-translation.cjs
- **JavaScript Functions**: Unique names per language (sortBusinessTable vs sortBedriuwTable)
- **Testing**: Always verify all three language versions

## Content Strategy

### Key Information
- **Community**: 100+ Telegram members
- **Contact**: hoi@bitcoinfriesland.com
- **Telegram**: https://t.me/bitcoinfriesland
- **Focus**: Bitcoin education and local adoption

### External Resources
- Bitcoin School Podcast
- Bitcoin Wiki (bitcoinwiki.nl)
- Saving Satoshi educational game
- Local business directory

## Development Patterns

### HTML Structure
- Semantic markup with proper heading hierarchy
- Consistent navigation across all pages
- Mobile-responsive meta tags
- SEO-optimized structure

### CSS Conventions
- Tailwind utility classes
- Custom CSS for specific components
- Consistent spacing and typography
- Hover states and transitions

### JavaScript Organization
- Feature-based modules
- Event listener management
- Mobile menu functionality
- Language switching logic

## Component Library

### Navigation
- **Desktop**: Horizontal menu with dropdowns
- **Mobile**: Hamburger menu with overlay
- **Language Switcher**: Flag-based dropdown

### Content Blocks
- **Hero Sections**: Large headers with CTAs
- **Feature Cards**: Icon + title + description
- **FAQ Accordions**: Expandable Q&A sections
- **CTA Sections**: Call-to-action blocks

### Interactive Elements
- **Buttons**: Primary (blue) and secondary (orange)
- **Links**: Hover effects and external indicators
- **Forms**: Contact and submission forms
- **Modals**: Overlay content (if needed)

## Performance Considerations

### Optimization
- **Images**: Optimized file sizes with responsive variants
- **CSS**: Minimal custom styles with image size constraints
- **JavaScript**: Lightweight, no dependencies
- **Loading**: Fast static file serving

### **CRITICAL: Image Optimization Standards**
**ALL new images MUST follow these optimization guidelines:**

#### Size Guidelines by Usage:
- **Navigation logos**: 32x32px, <2KB (use `-small` variants)
- **Language flags**: 24x16px, <2KB (frisian-flag-small.png)
- **Bitcoin icons**: 24x24px, <2KB
- **Hero section**: 256x256px max, <10KB
- **Content images**: 800x600px max, <50KB

#### Implementation Requirements:
- **Create optimized variants**: Use ffmpeg to create `-small`, `-medium`, `-large` versions
- **Update HTML references**: Point to appropriately sized variants
- **Add CSS constraints**: Force explicit sizing with `!important` rules
- **Add explicit dimensions**: Include `width` and `height` attributes on all `<img>` tags
- **Test PageSpeed**: Verify "Properly size images" and CLS warnings are resolved

#### Optimization Commands:
```bash
# Create small version (24x24 or 32x32)
ffmpeg -i input.png -vf scale=32:32 -y output-small.png

# Create medium version (64x64 or 128x128)  
ffmpeg -i input.png -vf scale=128:128 -y output-medium.png

# Create large version (256x256)
ffmpeg -i input.png -vf scale=256:256 -y output-large.png
```

#### CSS Template for New Images:
```css
/* Force appropriate sizing for new image types */
img[src*="new-image-name"] {
  width: [TARGET_WIDTH]px !important;
  height: [TARGET_HEIGHT]px !important;
  max-width: [TARGET_WIDTH]px !important;
  max-height: [TARGET_HEIGHT]px !important;
  object-fit: cover;
}
```

#### Current Optimized Images:
- `frisian-flag-small.png`: 1.5KB (was 94KB - 98.4% reduction)
- `bitcoin-friesland-logo-small.png`: 1.5KB (was 161KB - 97.4% reduction)
- All navigation and flag references updated to use small variants

#### **WebP Next-Gen Format Implementation:**
- `frisian-flag-small.webp`: 0.8KB (44.4% smaller than PNG)
- `bitcoin-friesland-logo-small.webp`: 1.1KB (29.2% smaller than PNG)
- `bitcoin-friesland-logo-large.webp`: 7.9KB (73.4% smaller than PNG)
- **Progressive enhancement**: `<picture>` tags with WebP + PNG fallback
- **51 HTML implementations** across all pages and languages
- **Total additional savings**: 22.7KB from WebP conversion

#### **WebP Implementation Pattern:**
```html
<picture>
  <source srcset="../assets/images/image-name.webp" type="image/webp">
  <img src="../assets/images/image-name.png" alt="Description" width="32" height="32">
</picture>
```

#### **WebP Creation Commands:**
```bash
# Convert PNG to WebP with quality setting
cwebp -q 90 input-small.png -o output-small.webp
cwebp -q 85 input-large.png -o output-large.webp
```

#### **Comprehensive Image Optimization Results:**
**Major file size reductions achieved:**
- `de94ca07-7ee7-434c-87a4-ebd316738659.png`: 2.1MB → 73KB WebP (96.5% reduction)
- `bitcoin-meeting-heerenveen.jpg`: 262KB → 110KB (58% reduction)
- `63bd8854-f912-4a28-87f7-83262ecebc1d.png`: 255KB → 31KB WebP (88% reduction)
- `b8247402-8397-4c36-bb52-ec3cb4444872.png`: 93KB → 9KB WebP (90% reduction)
- `12232760-ecc6-491a-8e75-866eb9c50cb9.png`: 82KB → 9KB WebP (89% reduction)

**Total optimization savings: 1.583MB**

#### **Responsive Image Variants System:**
**Complete variant system implemented:**
- **Small variants (64x64)**: For thumbnails, icons, list items
- **Medium variants (128x128)**: For content cards, feature sections  
- **Large variants (256x256)**: For hero sections, detailed views
- **WebP versions**: Created for all variants with 25-35% additional compression
- **Progressive enhancement**: `<picture>` tags with WebP + PNG fallback

**Naming convention:**
- `image-name-small.png` / `image-name-small.webp`
- `image-name-medium.png` / `image-name-medium.webp`
- `image-name-large.png` / `image-name-large.webp`

#### **Available Optimization Tools:**
- `ffmpeg`: Image resizing and format conversion
- `cwebp`: WebP conversion with quality control
- `pngquant`: Advanced PNG compression (65-80% quality)
- `identify`: Image dimension analysis

#### **SEO-Friendly Image Naming:**
**ALL images MUST use descriptive, keyword-rich filenames:**
- **Format**: `bitcoin-[purpose]-[type].png` (lowercase, hyphens)
- **Examples**: `bitcoin-education-infographic.png`, `bitcoin-merchant-acceptance.png`
- **Avoid**: UUID strings, generic names like `image1.png`
- **Keywords**: Include relevant terms (bitcoin, friesland, community, education, etc.)

#### **Optimization Workflow for New Images:**
```bash
# 1. Choose SEO-friendly name
# Good: bitcoin-education-guide.png
# Bad: a1b2c3d4-e5f6-7890.png

# 2. Resize large images
ffmpeg -i bitcoin-education-guide.png -vf scale=800:600 bitcoin-education-guide-resized.png

# 3. Compress PNG with pngquant
pngquant --quality=65-80 --output bitcoin-education-guide-compressed.png --force bitcoin-education-guide-resized.png

# 4. Create responsive variants
ffmpeg -i bitcoin-education-guide-compressed.png -vf scale=64:64 bitcoin-education-guide-small.png
ffmpeg -i bitcoin-education-guide-compressed.png -vf scale=128:128 bitcoin-education-guide-medium.png
ffmpeg -i bitcoin-education-guide-compressed.png -vf scale=256:256 bitcoin-education-guide-large.png

# 5. Create WebP versions
cwebp -q 90 bitcoin-education-guide-small.png -o bitcoin-education-guide-small.webp
cwebp -q 85 bitcoin-education-guide-medium.png -o bitcoin-education-guide-medium.webp
cwebp -q 80 bitcoin-education-guide-large.png -o bitcoin-education-guide-large.webp

# 6. Implement in HTML with progressive enhancement
<picture>
  <source srcset="../assets/images/bitcoin-education-guide-medium.webp" type="image/webp">
  <img src="../assets/images/bitcoin-education-guide-medium.png" alt="Bitcoin Education Guide" width="128" height="128">
</picture>
```

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Fallbacks**: Progressive enhancement

## Deployment & Hosting

### Static Hosting
- **Files**: Ready for any static host
- **Structure**: Self-contained directories
- **Assets**: Relative path references
- **Configuration**: No server-side requirements

## Future Considerations

### Potential Enhancements
- **Backend Integration**: User accounts, dynamic content
- **API Endpoints**: Real-time data, payments
- **Database**: User data, content management
- **Interactive Features**: Maps, quizzes, games

### Scalability
- **Modular Structure**: Easy to extend
- **Component System**: Reusable patterns
- **Content Management**: Structured for CMS integration
- **Performance**: Optimized for growth

## Key Decisions

### Technology Choices
- **Static First**: Fast, secure, simple deployment
- **Tailwind CSS**: Rapid development, consistent design
- **Multi-language**: Inclusive community approach
- **Progressive Enhancement**: Accessible to all users

### Content Strategy
- **Educational Focus**: Bitcoin knowledge sharing
- **Local Community**: Friesland-specific content
- **Business Support**: Local Bitcoin economy
- **Event Promotion**: Community engagement

This context serves as the foundation for understanding the Bitcoin Friesland website architecture and development patterns.
