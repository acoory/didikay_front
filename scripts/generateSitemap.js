/**
 * Script de génération du sitemap XML pour les pages SEO locales
 * Utilise l'API pour récupérer les prestations dynamiquement
 */

import fs from "fs";
import axios from "axios";

// Charger les variables d'environnement

// Données des villes (synchronisées avec localSeoData.ts)
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
  { name: "Martigues", slug: "martigues" },
  { name: "Salon-de-Provence", slug: "salon-de-provence" },
  { name: "Fuveau", slug: "fuveau" },
  { name: "Marignane", slug: "marignane" },
  { name: "Berre-l'Étang", slug: "berre-l-etang" },
  { name: "Istres", slug: "istres" },
  { name: "Rognac", slug: "rognac" },
];

async function fetchPrestationsFromAPI() {
  try {
    // Utiliser l'URL de l'API depuis les variables d'environnement
    const API_URL = process.env.VITE_API_URL_PROD || "https://api.kaydidicoiffure.fr/api";
    const response = await axios.get(`${API_URL}/client/prestation`);

    const allSubPrestations = [];

    response.data.prestation.forEach((prestation) => {
      if (prestation.subprestations) {
        prestation.subprestations.forEach((subPrestation) => {
          allSubPrestations.push({
            slug: subPrestation.name.toLowerCase().replace(/[\s/]+/g, "-"),
            name: subPrestation.name,
          });
        });
      }
    });

    return allSubPrestations;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des prestations:", error.message);
    console.log("⚠️  Utilisation des données de secours...");
    return [];
  }
}

async function generateSitemapXml() {
  const baseUrl = "https://kaydidicoiffure.fr"; // À modifier selon votre domaine
  const currentDate = new Date().toISOString().split("T")[0];

  // Récupérer les prestations depuis l'API
  const prestations = await fetchPrestationsFromAPI();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Pages principales
  const mainPages = [
    { url: baseUrl, priority: "1.0" },
    { url: `${baseUrl}/reservation`, priority: "0.9" },
  ];

  mainPages.forEach((page) => {
    sitemap += `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Pages par ville
  cities.forEach((city) => {
    sitemap += `
  <url>
    <loc>${baseUrl}/${city.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Pages service-ville (ville/service)
  prestations.forEach((service) => {
    cities.forEach((city) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${city.slug}/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  return { sitemap, prestationsCount: prestations.length };
}

// Génération du sitemap
(async () => {
  try {
    console.log("🚀 Génération du sitemap depuis l'API...\n");

    const { sitemap, prestationsCount } = await generateSitemapXml();

    // Écriture dans le fichier public
    fs.writeFileSync("./public/sitemap.xml", sitemap);

    console.log("✅ Sitemap généré avec succès !");
    console.log("📄 Fichier: public/sitemap.xml");
    console.log("🔗 URLs générées:");
    console.log(`   - 2 pages principales`);
    console.log(`   - ${cities.length} pages par ville`);
    console.log(`   - ${prestationsCount * cities.length} pages service-ville`);
    console.log(`   - Total: ${2 + cities.length + prestationsCount * cities.length} URLs`);

    // Affichage d'exemples
    console.log("\n📋 Exemples d'URLs générées:");
    console.log("   - https://kaydidicoiffure.fr/");
    console.log("   - https://kaydidicoiffure.fr/reservation");
    console.log("   - https://kaydidicoiffure.fr/marseille");
    console.log("   - https://kaydidicoiffure.fr/marseille/coupe-adulte");
    console.log("   - https://kaydidicoiffure.fr/aix-en-provence/coupe-adulte");

    console.log("\n✨ Sitemap prêt pour le déploiement !");
  } catch (error) {
    console.error("❌ Erreur lors de la génération:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
