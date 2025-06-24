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
├── assets/            # Static assets
└── lovable-uploads/   # Image uploads
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
- **Images**: Optimized file sizes
- **CSS**: Minimal custom styles
- **JavaScript**: Lightweight, no dependencies
- **Loading**: Fast static file serving

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
