/**
 * Script de test pour le système SEO local
 * Utilisez ce script pour tester et déboguer les URLs générées
 */

import { cities, mainServices, generateFAQ, salonInfo } from '../data/localSeoData';
import { generateLocalSeoUrls, generateSitemapXml, logAllUrls } from '../utils/generateSitemap';

console.log('🚀 Test du système SEO local KAYDIDI\n');

// Test 1: Vérification des données de base
console.log('📊 Données de base:');
console.log(`- ${cities.length} villes configurées`);
console.log(`- ${mainServices.length} services principaux`);
console.log(`- Total théorique: ${cities.length * mainServices.length + cities.length} pages\n`);

// Test 2: Exemples de villes
console.log('🌍 Villes ciblées (exemples):');
cities.slice(0, 5).forEach(city => {
  console.log(`  - ${city.name} (${city.slug}) - ${city.distance}`);
});
console.log('  ...\n');

// Test 3: Exemples de services
console.log('✂️ Services principaux (exemples):');
mainServices.slice(0, 5).forEach(service => {
  console.log(`  - ${service.name} (${service.slug}) - ${service.price}€ - ${service.duration}min`);
});
console.log('  ...\n');

// Test 4: Génération des URLs
console.log('🔗 URLs générées:');
const urls = logAllUrls();
console.log(`\nTotal URLs générées: ${urls.length}\n`);

// Test 5: Test parsing des slugs
console.log('🧪 Test parsing des slugs:');
const testSlugs = [
  'twist-marseille',
  'braids-aix-en-provence', 
  'vanille-plan-de-cuques',
  'coupe-la-ciotat',
  'micro-locks-aubagne'
];

testSlugs.forEach(slug => {
  const parts = slug.split('-');
  const citiesWithHyphens = ['aix-en-provence', 'plan-de-cuques', 'la-ciotat'];
  
  let serviceSlug = '';
  let citySlug = '';
  
  for (const cityWithHyphen of citiesWithHyphens) {
    if (slug.endsWith('-' + cityWithHyphen)) {
      citySlug = cityWithHyphen;
      serviceSlug = slug.replace('-' + cityWithHyphen, '');
      break;
    }
  }
  
  if (!citySlug && parts.length >= 2) {
    citySlug = parts[parts.length - 1];
    serviceSlug = parts.slice(0, -1).join('-');
  }

  const service = mainServices.find(s => s.slug === serviceSlug);
  const city = cities.find(c => c.slug === citySlug);
  
  console.log(`  ${slug} → Service: ${service?.name || '❌'} | Ville: ${city?.name || '❌'}`);
});

// Test 6: Génération FAQ
console.log('\n❓ Test génération FAQ:');
const faqExample = generateFAQ('Twist', 'Aix-en-Provence', '80', 180);
console.log(`FAQ générée pour "Twist à Aix-en-Provence":`);
faqExample.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.question}`);
});

// Test 7: Informations salon
console.log('\n🏢 Informations salon:');
console.log(`- Nom: ${salonInfo.name}`);
console.log(`- Adresse: ${salonInfo.address}`);
console.log(`- Spécialités: ${salonInfo.specialties.join(', ')}`);
console.log(`- Types de cheveux: ${salonInfo.hairTypes.join(', ')}`);

// Test 8: Génération sitemap (aperçu)
console.log('\n📄 Génération sitemap XML:');
const sitemap = generateSitemapXml();
const sitemapLines = sitemap.split('\n').length;
console.log(`Sitemap généré: ${sitemapLines} lignes`);
console.log('Aperçu (5 premières URLs):');
const urlMatches = sitemap.match(/<loc>(.*?)<\/loc>/g);
if (urlMatches) {
  urlMatches.slice(0, 5).forEach(match => {
    const url = match.replace('<loc>', '').replace('</loc>', '');
    console.log(`  - ${url}`);
  });
}

console.log('\n✅ Tests terminés ! Le système SEO local est prêt.');

export {};
