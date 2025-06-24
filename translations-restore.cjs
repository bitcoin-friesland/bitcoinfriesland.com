const fs = require('fs');

console.log('🔄 Restoring translations for EN and FY versions...');

// Translation mappings
const translations = {
  en: {
    // Page content
    'De Bitcoin Map toont alle bedrijven en locaties in Friesland die Bitcoin-betalingen accepteren. Deze interactieve kaart helpt je om gemakkelijk plekken te vinden waar je met Bitcoin kunt betalen.': 'The Bitcoin Map shows all businesses and locations in Friesland that accept Bitcoin payments. This interactive map helps you easily find places where you can pay with Bitcoin.',
    'De kaart wordt regelmatig bijgewerkt met nieuwe bedrijven die Bitcoin accepteren. Help ons de kaart compleet te maken door nieuwe Bitcoin-vriendelijke bedrijven aan te melden.': 'The map is regularly updated with new businesses that accept Bitcoin. Help us make the map complete by reporting new Bitcoin-friendly businesses.',
    'Hoe gebruik je de kaart?': 'How to use the map?',
    'Klik op de kaart om in te zoomen op een specifiek gebied': 'Click on the map to zoom in on a specific area',
    'Gebruik de zoekfunctie om een specifieke stad of bedrijf te vinden': 'Use the search function to find a specific city or business',
    'Klik op de markeringen om meer informatie over een bedrijf te zien': 'Click on the markers to see more information about a business',
    'Gebruik de filters om te zoeken op type betaling (Lightning, On-chain)': 'Use the filters to search by payment type (Lightning, On-chain)',
    'Bezoek Officiële BTC Kaart': 'Visit Official BTC Map',
    
    // Business types
    'Telefoon reparatie': 'Phone Repair',
    'Installatiebedrijf': 'Installation Company',
    'Kapper': 'Barber',
    'Kapper & salon': 'Barber & Salon',
    'Bio supermarkt': 'Organic Supermarket',
    'Boot- en Appartement verhuur': 'Boat & Apartment Rental',
    'Interieur': 'Interior Design'
  },
  fy: {
    // Page content
    'Bitcoin Map': 'Bitcoin Kaart',
    'Discover Bitcoin-friendly businesses in Friesland': 'Untdek Bitcoin-freonlike bedriuwen yn Fryslân',
    'Find Bitcoin-friendly places in Friesland': 'Fyn Bitcoin-freonlike plakken yn Fryslân',
    'About the BTC Map': 'Oer de BTC Kaart',
    'The Bitcoin Map shows all businesses and locations in Friesland that accept Bitcoin payments. This interactive map helps you easily find places where you can pay with Bitcoin.': 'De Bitcoin Kaart toant alle bedriuwen en lokaasjes yn Fryslân dy\'t Bitcoin-betellingen akseptearje. Dizze ynteraktive kaart helpt jo maklik plakken te finen dêr\'t jo mei Bitcoin betelje kinne.',
    'The map is regularly updated with new businesses that accept Bitcoin. Help us make the map complete by reporting new Bitcoin-friendly businesses.': 'De kaart wurdt regelmjittich bywurke mei nije bedriuwen dy\'t Bitcoin akseptearje. Help ús de kaart kompleet te meitsjen troch nije Bitcoin-freonlike bedriuwen oan te melden.',
    'How to use the map?': 'Hoe brûkje de kaart?',
    'Click on the map to zoom in on a specific area': 'Klik op de kaart om yn te zoomen op in spesifyk gebiet',
    'Use the search function to find a specific city or business': 'Brûk de sykfunksje om in spesifike stêd of bedriuw te finen',
    'Click on the markers to see more information about a business': 'Klik op de markearrings om mear ynformaasje oer in bedriuw te sjen',
    'Use the filters to search by payment type (Lightning, On-chain)': 'Brûk de filters om te sykjen op type betelling (Lightning, On-chain)',
    'Visit Official BTC Map': 'Besykje Offisjele BTC Kaart',
    'Bitcoin-friendly Businesses in Friesland': 'Bitcoin-freonlike Bedriuwen yn Fryslân',
    'Last updated: 23 June 2025': 'Lêst bywurke: 23 juny 2025',
    'Business': 'Bedriuw',
    'Type': 'Type',
    'Address': 'Adres',
    'City': 'Stêd',
    'Available': 'Beskikber',
    
    // Business types
    'Garage': 'Garage',
    'Construction': 'Bou',
    'Restaurant, Café, Hotel': 'Restaurant, Kafee, Hotel',
    'Computers and Maintenance': 'Kompjûters en Ûnderhâld',
    'Printing': 'Drukkerij',
    'Street Musician': 'Strjitmusikant',
    'Shiatsu, Acupuncture': 'Shiatsu, Akupunktuer',
    'Sandwich Shop': 'Brocheswinkel',
    'Museum': 'Museum',
    'Phone Repair': 'Telefoan reparaasje',
    'Interior Design': 'Ynterieur',
    'Electrical & Security Tech': 'Elektro & Feilichtechnyk',
    'Installation Company': 'Ynstallaasje bedriuw',
    'Ice Cream Shop': 'Iiswinkel',
    'Restaurant': 'Restaurant',
    'Boat & Apartment Rental': 'Boat- en Appartement ferhier',
    'Organic Supermarket': 'Bio supermerkt',
    'Gemstones': 'Edelstienten',
    'Venue Rental': 'Saalferhier',
    'Barber': 'Kapper',
    'Barber & Salon': 'Kapper & Salon',
    'Boat building & storage': 'Boatbou & opslach',
    'Café, Brewery': 'Kafee, Brouwerij',
    'Supermarket': 'Supermerkt',
    'LEGO Rental': 'LEGO Ferhier',
    'Charter Flights': 'Charter fluchten'
  }
};

// Process EN version
console.log('📝 Processing EN version...');
let enContent = fs.readFileSync('en/map.html', 'utf8');

// Apply EN translations
Object.entries(translations.en).forEach(([dutch, english]) => {
  enContent = enContent.replace(new RegExp(dutch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), english);
});

fs.writeFileSync('en/map.html', enContent, 'utf8');
console.log('✅ EN version translations restored');

// Process FY version
console.log('📝 Processing FY version...');
let fyContent = fs.readFileSync('fy/map.html', 'utf8');

// Apply FY translations
Object.entries(translations.fy).forEach(([english, frisian]) => {
  fyContent = fyContent.replace(new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), frisian);
});

fs.writeFileSync('fy/map.html', fyContent, 'utf8');
console.log('✅ FY version translations restored');

console.log('🎉 All translations restored successfully!');
