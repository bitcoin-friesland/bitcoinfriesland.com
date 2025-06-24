const fs = require('fs');

console.log('🔄 Bitcoin Friesland - Page Maintenance Script');
console.log('This script handles updates for consumer and business pages across all languages');

// ============================================================================
// CONSUMER PAGE UPDATES
// ============================================================================

function updateConsumerPages() {
  console.log('\n📝 Updating consumer pages...');
  
  // Process all three languages
  ['nl', 'en', 'fy'].forEach(lang => {
    console.log(`  📝 Processing ${lang.toUpperCase()} consumer page...`);
    
    const filePath = `${lang}/consumers.html`;
    if (!fs.existsSync(filePath)) {
      console.log(`    ⚠️  ${filePath} not found, skipping...`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Common updates for all languages
    // Add custodial warnings, self-custodian mentions, etc.
    
    // Language-specific updates
    if (lang === 'en') {
      content = content.replace(/Kies een wallet/g, 'Choose a wallet');
      content = content.replace(/Koop je eerste Bitcoin/g, 'Buy your first Bitcoin');
    } else if (lang === 'fy') {
      content = content.replace(/Kies een wallet/g, 'Kies in wallet');
      content = content.replace(/Koop je eerste Bitcoin/g, 'Keapje jo earste Bitcoin');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`    ✅ ${lang.toUpperCase()} consumer page updated`);
  });
}

// ============================================================================
// BUSINESS PAGE UPDATES
// ============================================================================

function updateBusinessPages() {
  console.log('\n📝 Updating business pages...');
  
  // Process all three languages
  ['nl', 'en', 'fy'].forEach(lang => {
    console.log(`  📝 Processing ${lang.toUpperCase()} business page...`);
    
    const filePath = `${lang}/business.html`;
    if (!fs.existsSync(filePath)) {
      console.log(`    ⚠️  ${filePath} not found, skipping...`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add Coinos links for all languages
    content = content.replace(/\bCoinos\b(?![^<]*>)/g, '<a href="https://coinos.io/" target="_blank" class="text-friesland-blue hover:underline">Coinos</a>');
    
    // Language-specific updates
    if (lang === 'en') {
      content = content.replace(/Lightning transaction costs are very low/g, 'Lightning transaction costs are generally low, but can vary depending on network conditions');
      content = content.replace(/Coinos, BT Pay or Wallet of Satoshi/g, 'Coinos, BTCPay Server or Wallet of Satoshi');
    } else if (lang === 'fy') {
      content = content.replace(/Lightning-transaksjekosten binne tige leech/g, 'Lightning-transaksjekosten binne meastentiids leech, mar kinne ferskille ôfhinklik fan netwurkstannen');
      content = content.replace(/Coinos, BT Pay of Wallet of Satoshi/g, 'Coinos, BTCPay Server of Wallet of Satoshi');
    } else if (lang === 'nl') {
      content = content.replace(/Lightning-transactiekosten zijn zeer laag/g, 'Lightning-transactiekosten zijn doorgaans laag, maar kunnen variëren afhankelijk van netwerkomstandigheden');
      content = content.replace(/Coinos, BT Pay of Wallet of Satoshi/g, 'Coinos, BTCPay Server of Wallet of Satoshi');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`    ✅ ${lang.toUpperCase()} business page updated`);
  });
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('\n📋 Available commands:');
    console.log('  node page-maintenance.cjs consumer  - Update consumer pages');
    console.log('  node page-maintenance.cjs business  - Update business pages');
    console.log('  node page-maintenance.cjs all       - Update all pages');
    return;
  }
  
  const command = args[0].toLowerCase();
  
  switch (command) {
    case 'consumer':
      updateConsumerPages();
      break;
    case 'business':
      updateBusinessPages();
      break;
    case 'all':
      updateConsumerPages();
      updateBusinessPages();
      break;
    default:
      console.log('❌ Unknown command. Use: consumer, business, or all');
  }
  
  console.log('\n🎉 Page maintenance completed!');
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export functions for use in other scripts
module.exports = {
  updateConsumerPages,
  updateBusinessPages
};
