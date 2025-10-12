import { cities } from '../data/localSeoData';
import prestationService from '../services/prestationService';

export const generateLocalSeoUrls = async () => {
  const baseUrl = 'https://kaydidicoiffure.fr'; // Remplacez par votre vraie URL
  const urls: string[] = [];

  // Pages principales
  urls.push(baseUrl);
  urls.push(`${baseUrl}/reservation`);

  // Récupérer les prestations depuis l'API
  const response = await prestationService.getPrestations();
  const allSubPrestations: any[] = [];

  response.data.prestation.forEach((prestation: any) => {
    if (prestation.subprestations) {
      prestation.subprestations.forEach((subPrestation: any) => {
        allSubPrestations.push({
          slug: subPrestation.name.toLowerCase().replace(/[\s/]+/g, "-"),
          name: subPrestation.name,
        });
      });
    }
  });

  // Pages par ville (ville uniquement)
  cities.forEach(city => {
    urls.push(`${baseUrl}/${city.slug}`);
  });

  // Pages service-ville (ville/service)
  allSubPrestations.forEach(service => {
    cities.forEach(city => {
      urls.push(`${baseUrl}/${city.slug}/${service.slug}`);
    });
  });

  return urls;
};

export const generateSitemapXml = async () => {
  const urls = await generateLocalSeoUrls();
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    // Déterminer la priorité en fonction du type d'URL
    let priority = '1.0'; // Page d'accueil
    if (url.includes('/reservation')) {
      priority = '0.9';
    } else if (url.match(/\/[^/]+\/[^/]+$/)) {
      // URL de type ville/service
      priority = '0.8';
    } else if (url.match(/\/[^/]+$/)) {
      // URL de type ville uniquement
      priority = '0.7';
    }

    sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Fonction pour afficher toutes les URLs générées
export const logAllUrls = async () => {
  const urls = await generateLocalSeoUrls();
  console.log('=== URLs SEO Locales Générées ===');
  console.log(`Total: ${urls.length} pages`);
  console.log('\nPages principales:');
  console.log(`  - /`);
  console.log(`  - /reservation`);

  console.log('\nPages par ville:');
  cities.forEach(city => {
    console.log(`  - /${city.slug} (${city.name})`);
  });

  console.log('\nPages service-ville (exemples - 5 premiers):');
  const exampleUrls = urls.filter(url => url.match(/\/[^/]+\/[^/]+$/)).slice(0, 5);
  exampleUrls.forEach(url => {
    console.log(`  - ${url}`);
  });

  return urls;
};
