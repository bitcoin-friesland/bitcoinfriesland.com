const fs = require('fs');

console.log('🔄 Bitcoin Friesland - Footer Maintenance Script');
console.log('This script handles all footer-related updates across all languages');

// ============================================================================
// FOOTER TEXT UPDATES (e.g., copyright, github links)
// ============================================================================

function updateFooterText() {
  console.log('\n📝 Updating footer text in all three languages...');

  // Footer translations for all languages
  const footerTranslations = {
    nl: {
      old: '© 2025 www.bitcoinfriesland.com is gemaakt met 🧡 door enthousiaste Bitcoin Friesland community bijdragers.',
      new: '© Public Domain & UNLICENSED 2025 www.bitcoinfriesland.com is gemaakt met 🧡 door enthousiaste Bitcoin Friesland community bijdragers. - <a href="https://github.com/bitcoin-friesland/bitcoinfriesland.com" target="_blank" rel="noopener noreferrer" class="text-friesland-blue hover:text-friesland-blue/80 transition-colors">Fork mij op Github</a>'
    },
    en: {
      old: '© 2025 www.bitcoinfriesland.com is made with 🧡 by enthusiastic Bitcoin Friesland community contributors.',
      new: '© Public Domain & UNLICENSED 2025 www.bitcoinfriesland.com is made with 🧡 by enthusiastic Bitcoin Friesland community contributors. - <a href="https://github.com/bitcoin-friesland/bitcoinfriesland.com" target="_blank" rel="noopener noreferrer" class="text-friesland-blue hover:text-friesland-blue/80 transition-colors">Fork me on Github</a>'
    },
    fy: {
      old: '© 2025 www.bitcoinfriesland.com is makke mei 🧡 troch entûsjaste Bitcoin Fryslân mienskip bydragen.',
      new: '© Public Domain & UNLICENSED 2025 www.bitcoinfriesland.com is makke mei 🧡 troch entûsjaste Bitcoin Fryslân mienskip bydragen. - <a href="https://github.com/bitcoin-friesland/bitcoinfriesland.com" target="_blank" rel="noopener noreferrer" class="text-friesland-blue hover:text-friesland-blue/80 transition-colors">Fork my op Github</a>'
    }
  };

  // Process all three language versions
  ['nl', 'en', 'fy'].forEach(lang => {
    console.log(`📝 Processing ${lang} version...`);
    
    const filePath = `${lang}/map.html`;
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File ${filePath} not found, skipping...`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace footer text
    const translation = footerTranslations[lang];
    const escapedOld = translation.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(escapedOld, 'g'), translation.new);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang} version footer updated`);
  });

  console.log('🎉 Footer text updated in all three languages!');
}

// ============================================================================
// RISK WARNING FOOTER
// ============================================================================

function addRiskWarningToAllPages() {
  console.log('\n📝 Adding risk warning footer to all pages in all languages...');

  // Risk warning translations
  const riskWarnings = {
    nl: {
      title: 'Risicowaarschuwing',
      text: 'Ja, die moet er echt in. De bitcoinkoers kan flink schommelen: soms richting de maan, soms richting de kelder. Raak je je sleutels kwijt of laat je je bitcoin bij een ander staan, dan kun je alles kwijtraken, en er is geen klantenservice die het terugzet. Bitcoin valt niet onder een Europees depositogarantiestelsel. Deze site is informatief en geen financieel advies. We zijn Friese Bitcoiners, geen beleggingsadviseurs.'
    },
    en: {
      title: 'Risk warning',
      text: 'Yes, we have to say this. The bitcoin price can swing wildly: sometimes towards the moon, sometimes towards the basement. Lose your keys, or leave your bitcoin with someone else, and you can lose all of it, with no helpdesk to undo it. Bitcoin is not covered by a European deposit guarantee scheme. This site is for information only and is not financial advice. We are Frisian Bitcoiners, not investment advisers.'
    },
    fy: {
      title: 'Risikowierskôging',
      text: 'Ja, dizze moat der echt yn. De bitcoinkoers kin flink skommelje: soms rjochting de moanne, soms rjochting de kelder. Reitsje jo jo kaaien kwyt of litte jo jo bitcoin by in oar stean, dan kinne jo alles kwytreitsje, en der is gjin klanteservice dy\'t it weromset. Bitcoin falt net ûnder in Europeesk depositgarânsjestelsel. Dizze side is ynformatyf en gjin finansjeel advys. Wy binne Fryske Bitcoiners, gjin beleggingsadviseurs.'
    }
  };

  function getHtmlFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const filePath = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return getHtmlFiles(filePath);
      return entry.isFile() && entry.name.endsWith('.html') ? [filePath] : [];
    });
  }

  // Get every HTML file, including nested blog and event pages.
  const languages = ['nl', 'en', 'fy'];

  languages.forEach(lang => {
    console.log(`\n📝 Processing ${lang.toUpperCase()} pages...`);

    getHtmlFiles(lang).forEach(filePath => {
      let content = fs.readFileSync(filePath, 'utf8');

      // Check if risk warning already exists
      if (content.includes('Risicowaarschuwing') || /Risk [Ww]arning/.test(content) || content.includes('Risikowierskôging')) {
        const updatedContent = content.replace(
          /<div class="(?!bf-risk-note )(bg-red-50 border border-red-200 rounded-lg p-6 mt-8)">(?=\s*<h3[^>]*>(?:Risicowaarschuwing|Risk [Ww]arning|Risikowierskôging)[^<]*<\/h3>)/g,
          '<div class="bf-risk-note $1">'
        );

        if (updatedContent !== content) {
          fs.writeFileSync(filePath, updatedContent, 'utf8');
          console.log(`  ✅ ${filePath} risk warning restyled`);
        } else {
          console.log(`  ✅ ${filePath} already has the current risk warning`);
        }
        return;
      }

      const warning = riskWarnings[lang];

      // Add risk warning before the copyright footer
      const riskWarningHtml = `        <!-- Risk Warning Footer -->
        <div class="bf-risk-note bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
          <h3 class="text-lg font-semibold text-red-800 mb-3">${warning.title}</h3>
          <p class="text-red-700 text-sm leading-relaxed">
            ${warning.text}
          </p>
        </div>
        
        `;
      
      // Insert before the copyright section
      content = content.replace(
        /(<div class="border-t border-gray-200 mt-8 pt-8 text-center">)/,
        riskWarningHtml + '$1'
      );

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ ${filePath} updated with risk warning`);
    });
  });

  console.log('\n🎉 Risk warning added to all pages in all languages!');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || (args.length === 1 && args[0] === '--help')) {
    console.log('\n📋 Available commands:');
    console.log('  node maintain-footer.cjs text     - Update matching map footer text');
    console.log('  node maintain-footer.cjs warning  - Add risk warnings to all pages');
    console.log('  node maintain-footer.cjs all      - Run both footer replacements');
    return;
  }
  
  const command = args[0].toLowerCase();
  if (args.length !== 1 || !['text', 'warning', 'all'].includes(command)) {
    console.error('Unknown command. Use: text, warning, or all');
    process.exitCode = 1;
    return;
  }
  
  switch (command) {
    case 'text':
      updateFooterText();
      break;
    case 'warning':
      addRiskWarningToAllPages();
      break;
    case 'all':
      updateFooterText();
      addRiskWarningToAllPages();
      break;
    default:
      console.log('❌ Unknown command. Use: text, warning, or all');
  }
  
  console.log('\n🎉 Footer maintenance completed!');
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export functions for use in other scripts
module.exports = {
  updateFooterText,
  addRiskWarningToAllPages
};
