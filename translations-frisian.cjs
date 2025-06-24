const fs = require('fs');

console.log('🔄 Completing Frisian translations...');

// Complete Frisian translation mappings
const frisianTranslations = {
  // Main content paragraphs
  'De Bitcoin Kaart toant alle bedriuwen en locaties in Friesland die Bitcoin-betalingen accepteren. Deze interactieve kaart helpt je om gemakkelijk plekken te vinden waar je met Bitcoin kunt betalen.': 'De Bitcoin Kaart toant alle bedriuwen en lokaasjes yn Fryslân dy\'t Bitcoin-betellingen akseptearje. Dizze ynteraktive kaart helpt jo maklik plakken te finen dêr\'t jo mei Bitcoin betelje kinne.',
  
  'De kaart wordt regelmatig bijgewerkt met nieuwe bedrijven die Bitcoin accepteren. Help ons de kaart compleet te maken door nieuwe Bitcoin-vriendelijke bedrijven aan te melden.': 'De kaart wurdt regelmjittich bywurke mei nije bedriuwen dy\'t Bitcoin akseptearje. Help ús de kaart kompleet te meitsjen troch nije Bitcoin-freonlike bedriuwen oan te melden.',
  
  'Hoe gebruik je de kaart?': 'Hoe brûkje de kaart?',
  
  'Klik op de kaart om in te zoomen op een specifiek gebied': 'Klik op de kaart om yn te zoomen op in spesifyk gebiet',
  
  'Gebruik de zoekfunctie om een specifieke stad of bedrijf te vinden': 'Brûk de sykfunksje om in spesifike stêd of bedriuw te finen',
  
  'Klik op de markeringen om meer informatie over een bedrijf te zien': 'Klik op de markearrings om mear ynformaasje oer in bedriuw te sjen',
  
  'Gebruik de filters om te zoeken op type betaling (Lightning, On-chain)': 'Brûk de filters om te sykjen op type betelling (Lightning, On-chain)',
  
  // Business types that still need translation
  'Telefoon reparatie': 'Telefoan reparaasje',
  'Installatiebedrijf': 'Ynstallaasje bedriuw',
  'Bio supermarkt': 'Bio supermerkt',
  'Boot- en Appartement verhuur': 'Boat- en Appartement ferhier',
  'Interieur': 'Ynterieur',
  'Kapper & salon': 'Kapper & salon',
  
  // Footer translations
  'It befoarderjen fan Bitcoin-adopsy en edûkaasje yn Fryslân. Wurde diel fan de Bitcoin-beweging yn Fryslân': 'It befoarderjen fan Bitcoin-adopsy en edûkaasje yn Fryslân. Wurde diel fan de Bitcoin-beweging yn Fryslân',
  
  'Oan de slach →': 'Oan de slach →',
  
  'NAVIGAASJE': 'NAVIGAASJE',
  'Thús': 'Thús',
  'Gearkomsten': 'Gearkomsten',
  'Keppelings': 'Keppelings',
  'Oer ús': 'Oer ús',
  
  'FERBINE': 'FERBINE',
  
  '© 2025 www.bitcoinfriesland.com is makke mei 🧡 troch entûsjaste Bitcoin Fryslân mienskip bydragen.': '© 2025 www.bitcoinfriesland.com is makke mei 🧡 troch entûsjaste Bitcoin Fryslân mienskip bydragen.',
  
  // JavaScript function name
  'sortBusinessTable': 'sortBedriuwTable'
};

console.log('📝 Processing FY version with complete translations...');
let fyContent = fs.readFileSync('fy/map.html', 'utf8');

// Apply all Frisian translations
Object.entries(frisianTranslations).forEach(([dutch, frisian]) => {
  // Use global replace with proper escaping
  const escapedDutch = dutch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  fyContent = fyContent.replace(new RegExp(escapedDutch, 'g'), frisian);
});

fs.writeFileSync('fy/map.html', fyContent, 'utf8');
console.log('✅ FY version complete translations applied');

console.log('🎉 Complete Frisian translations finished!');
