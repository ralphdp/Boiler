import { i18n } from '@/i18n.config';

export async function GET() {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';
  const currentDate = new Date().toISOString();

  // Define your routes here
  const routes = ['/', '/login', '/register'];

  // Generate sitemap entries for all locales
  const sitemapEntries = i18n.locales.flatMap((locale) =>
    routes.map(
      (route) => `
  <url>
    <loc>${baseUrl}${locale === i18n.defaultLocale ? '' : `/${locale}`}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
