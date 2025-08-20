/**
 * Script de génération du sitemap XML pour les pages SEO locales
 */

const fs = require('fs');

// Données des villes
const cities = [
  { name: "Marseille", slug: "marseille" },
  { name: "Aix-en-Provence", slug: "aix-en-provence" },
  { name: "Aubagne", slug: "aubagne" },
  { name: "Vitrolles", slug: "vitrolles" },
  { name: "Allauch", slug: "allauch" },
  { name: "Plan-de-Cuques", slug: "plan-de-cuques" },
  { name: "Cassis", slug: "cassis" },
  { name: "La Ciotat", slug: "la-ciotat" },
  { name: "Gardanne", slug: "gardanne" },
  { name: "Martigues", slug: "martigues" }
];

// Services complets (synchronisés avec localSeoData.ts - 28 services)
const mainServices = [
  { name: "Twist", slug: "twist" },
  { name: "Vanille", slug: "vanille" },
  { name: "Braids", slug: "braids" },
  { name: "Micro Locks", slug: "micro-locks" },
  { name: "Knotless Braids", slug: "knotless-braids" },
  { name: "Passion Twist", slug: "passion-twist" },
  { name: "Faux Locks", slug: "faux-locks" },
  { name: "Coupe", slug: "coupe" },
  { name: "Coupe Enfant", slug: "coupe-enfant" },
  { name: "Reprise Racines", slug: "reprise-racines" },
  { name: "Défrisage", slug: "defrisage" },
  { name: "Lissage Brésilien", slug: "lissage-bresilien" },
  { name: "Coiffure Cheveux Crépus", slug: "coiffure-cheveux-crepus" },
  { name: "Coiffure Cheveux Bouclés", slug: "coiffure-cheveux-boucles" },
  { name: "Coiffure Cheveux Lisses", slug: "coiffure-cheveux-lisses" },
  { name: "Salon Cheveux Afro", slug: "salon-cheveux-afro" },
  { name: "Box Braids", slug: "box-braids" },
  { name: "Cornrows", slug: "cornrows" },
  { name: "Tissage", slug: "tissage" },
  { name: "Perruque", slug: "perruque" },
  { name: "Soin Cheveux Crépus", slug: "soin-cheveux-crepus" },
  { name: "Soin Cheveux Bouclés", slug: "soin-cheveux-boucles" },
  { name: "Coiffeur Afro", slug: "coiffeur-afro" },
  { name: "Tresses Africaines", slug: "tresses-africaines" },
  { name: "Locks Naturelles", slug: "locks-naturelles" },
  { name: "Cheveux Métissés", slug: "cheveux-metisses" },
  { name: "Entretien Locks", slug: "entretien-locks" },
  { name: "Coiffure Protectrice", slug: "coiffure-protectrice" }
];

function generateSitemapXml() {
  const baseUrl = 'https://kaydidicoiffure.fr'; // À modifier selon votre domaine
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Pages principales
  const mainPages = [
    { url: baseUrl, priority: '1.0' },
    { url: `${baseUrl}/reservation`, priority: '0.9' }
  ];

  mainPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Pages par ville
  cities.forEach(city => {
    // Page coiffeur-ville (ancienne structure)
    sitemap += `
  <url>
    <loc>${baseUrl}/coiffeur-${city.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    
    // Page ville (nouvelle structure simplifiée)
    sitemap += `
  <url>
    <loc>${baseUrl}/${city.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Pages service-ville (nouvelle structure /ville/service)
  cities.forEach(city => {
    mainServices.forEach(service => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${city.slug}/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Génération du sitemap
try {
  const sitemap = generateSitemapXml();
  
  // Écriture dans le fichier public
  fs.writeFileSync('public/sitemap.xml', sitemap);
  
  console.log('✅ Sitemap généré avec succès !');
  console.log('📄 Fichier: public/sitemap.xml');
  console.log('🔗 URLs générées:');
  console.log(`   - 2 pages principales`);
  console.log(`   - ${cities.length * 2} pages par ville (coiffeur-ville + ville)`);
  console.log(`   - ${mainServices.length * cities.length} pages service-ville`);
  console.log(`   - Total: ${2 + (cities.length * 2) + (mainServices.length * cities.length)} URLs`);
  
  // Affichage d'exemples
  console.log('\n📋 Exemples d\'URLs générées:');
  console.log('   - https://kaydidicoiffure.fr/coiffeur-marseille');
  console.log('   - https://kaydidicoiffure.fr/marseille (nouvelle)');
  console.log('   - https://kaydidicoiffure.fr/marseille/twist');
  console.log('   - https://kaydidicoiffure.fr/aix-en-provence/braids');
  
} catch (error) {
  console.error('❌ Erreur lors de la génération:', error.message);
  process.exit(1);
}
