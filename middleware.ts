import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista delle lingue supportate
  locales,
  
  // Lingua di default (italiano)
  defaultLocale,
  
  // Strategia per rilevare la lingua preferita dell'utente
  localeDetection: true,
  
  // Prefix per le URL: 'always' = sempre prefisso per tutte le lingue, incluso /it
  localePrefix: 'always',
});

export const config = {
  // Matcher: applica middleware a tutte le route TRANNE api, admin, file statici e SEO (sitemap, robots)
  matcher: [
    '/((?!api|admin|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/',
  ],
};
