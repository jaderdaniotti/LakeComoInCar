import { MetadataRoute } from 'next';

const baseUrl = 'https://lakecomoincar.eu';
const locales = ['it', 'en', 'fr', 'es'];

// Definizione di tutte le route del sito
const routes = [
  '', // homepage
  '/servizi',
  '/veicoli',
  '/contatti',
  '/prenota',
  '/preventivo',
  '/privacy',
  '/cookie',
  '/tour/lago-como',
  '/tour/st-moritz',
  '/tour/bernina-express',
  '/tour/shopping',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Per ogni locale, crea tutte le route
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/prenota' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/prenota' || route === '/preventivo' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    });
  });

  return sitemap;
}
