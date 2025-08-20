import { cities, mainServices } from '../data/localSeoData';

export const generateLocalSeoUrls = () => {
  const baseUrl = 'https://kaydidicoiffure.fr'; // Remplacez par votre vraie URL
  const urls: string[] = [];

  // Pages principales
  urls.push(baseUrl);
  urls.push(`${baseUrl}/reservation`);

  // Pages par ville (coiffeur-ville)
  cities.forEach(city => {
    urls.push(`${baseUrl}/coiffeur-${city.slug}`);
  });

  // Pages service-ville
  mainServices.forEach(service => {
    cities.forEach(city => {
      urls.push(`${baseUrl}/${service.slug}-${city.slug}`);
    });
  });

  return urls;
};

export const generateSitemapXml = () => {
  const urls = generateLocalSeoUrls();
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.includes('/coiffeur-') || url.includes('-') ? '0.8' : '1.0'}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Fonction pour afficher toutes les URLs générées
export const logAllUrls = () => {
  const urls = generateLocalSeoUrls();
  console.log('=== URLs SEO Locales Générées ===');
  console.log(`Total: ${urls.length} pages`);
  console.log('\nPages par ville:');
  cities.forEach(city => {
    console.log(`  - /coiffeur-${city.slug} (${city.name})`);
  });
  
  console.log('\nPages service-ville (exemples):');
  mainServices.slice(0, 3).forEach(service => {
    cities.slice(0, 3).forEach(city => {
      console.log(`  - /${service.slug}-${city.slug} (${service.name} à ${city.name})`);
    });
  });
  
  return urls;
};
