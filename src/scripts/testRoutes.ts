/**
 * Script de test pour débugger les routes SEO locales
 */

import { cities, mainServices } from '../data/localSeoData';

console.log('🧪 Test des Routes SEO Locales\n');

// Test des données de base
console.log('📊 Données disponibles:');
console.log(`- ${cities.length} villes`);
console.log(`- ${mainServices.length} services`);

// Test des slugs de services
console.log('\n✂️ Services et leurs slugs:');
mainServices.forEach(service => {
  console.log(`  - ${service.name} → slug: "${service.slug}"`);
});

// Test des villes et leurs slugs
console.log('\n🌍 Villes et leurs slugs:');
cities.forEach(city => {
  console.log(`  - ${city.name} → slug: "${city.slug}"`);
});

// Test des routes générées
console.log('\n🔗 Exemples de routes:');

// Routes par ville
console.log('\nPages par ville:');
cities.slice(0, 3).forEach(city => {
  console.log(`  /coiffeur-${city.slug} → ${city.name}`);
});

// Routes service-ville simples
console.log('\nPages service-ville (villes simples):');
const simpleServices = ['twist', 'vanille', 'braids'];
const simpleCities = ['marseille', 'aubagne', 'vitrolles'];

simpleServices.forEach(serviceSlug => {
  simpleCities.forEach(citySlug => {
    const service = mainServices.find(s => s.slug === serviceSlug);
    const city = cities.find(c => c.slug === citySlug);
    if (service && city) {
      console.log(`  /${serviceSlug}-${citySlug} → ${service.name} à ${city.name}`);
    }
  });
});

// Routes service-ville complexes (villes avec tirets)
console.log('\nPages service-ville (villes avec tirets):');
const complexCities = ['aix-en-provence', 'plan-de-cuques', 'la-ciotat'];

simpleServices.forEach(serviceSlug => {
  complexCities.forEach(citySlug => {
    const service = mainServices.find(s => s.slug === serviceSlug);
    const city = cities.find(c => c.slug === citySlug);
    if (service && city) {
      console.log(`  /${serviceSlug}-${citySlug} → ${service.name} à ${city.name}`);
    }
  });
});

// Test du parsing d'URLs
console.log('\n🔍 Test du parsing d\'URLs:');

const testUrls = [
  '/vanille-marseille',
  '/twist-aix-en-provence',
  '/braids-plan-de-cuques',
  '/micro-locks-la-ciotat',
  '/knotless-braids-aubagne'
];

testUrls.forEach(url => {
  console.log(`\nURL: ${url}`);
  
  const pathWithoutSlash = url.replace('/', '');
  const servicesSlugs = mainServices.map(s => s.slug);
  
  let serviceSlug = '';
  let citySlug = '';
  
  // Trouve quel service correspond au début du path
  for (const slug of servicesSlugs) {
    if (pathWithoutSlash.startsWith(slug + '-')) {
      serviceSlug = slug;
      citySlug = pathWithoutSlash.replace(slug + '-', '');
      break;
    }
  }
  
  const service = mainServices.find(s => s.slug === serviceSlug);
  const city = cities.find(c => c.slug === citySlug);
  
  console.log(`  → Service trouvé: ${service?.name || '❌ NON TROUVÉ'}`);
  console.log(`  → Ville trouvée: ${city?.name || '❌ NON TROUVÉE'}`);
  console.log(`  → serviceSlug: "${serviceSlug}"`);
  console.log(`  → citySlug: "${citySlug}"`);
});

console.log('\n✅ Test terminé !');

export {};
