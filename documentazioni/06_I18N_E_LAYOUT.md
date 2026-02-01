# i18n e layout multilingua – next-intl (Next.js App Router)

Processo per replicare multilingua e layout del progetto: next-intl, middleware, segmento `[locale]`, messaggi e metadata per lingua.

---

## 1. Panoramica

| Elemento | Dove | Ruolo |
|----------|------|--------|
| Configurazione locale | `i18n.ts` | Lingue supportate, default, caricamento messaggi |
| Middleware | `middleware.ts` | next-intl: routing per locale, prefisso URL, esclusioni |
| Layout locale | `app/[locale]/layout.tsx` | Provider messaggi, Navbar, Footer, StructuredData |
| Messaggi | `messages/it.json`, `en.json`, … | Chiavi per traduzioni |
| Pagine | `app/[locale]/**/page.tsx` | Contenuto per ogni route e lingua |
| Metadata per lingua | `generateMetadata` in page o layout | title, description, canonical, hreflang |

---

## 2. Dipendenze

```bash
npm install next-intl
```

Plugin in `next.config.ts`:

```ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = { /* ... */ };
export default withNextIntl(nextConfig);
```

---

## 3. Configurazione lingue – `i18n.ts`

```ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['it', 'en', 'fr', 'es'] as const;
export const defaultLocale = 'it' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

Aggiungi o togli lingue in `locales` e in `localeNames`; mantieni coerenza con le cartelle in `messages/`.

---

## 4. Middleware – `middleware.ts`

```ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',  // sempre /it, /en, ... anche per la lingua di default
});

export const config = {
  matcher: [
    '/((?!api|admin|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/',
  ],
};
```

- **localePrefix: 'always'**: ogni URL ha il prefisso lingua (es. `/it/servizi`, `/en/servizi`).
- **matcher**: esclude api, admin, file statici, robots, sitemap (vedi [02_SITEMAP_E_ROBOTS.md](./02_SITEMAP_E_ROBOTS.md)).

---

## 5. Root e redirect – `app/page.tsx`

La root senza locale deve reindirizzare alla lingua di default:

```ts
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/it');
}
```

---

## 6. Layout locale – `app/[locale]/layout.tsx`

- Valida `locale` (se non in `locales` → notFound).
- Carica messaggi con `getMessages()`.
- Avvolge i figli in `NextIntlClientProvider` e inserisce Navbar, Footer, StructuredData, cookie/WhatsApp se previsti.

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales, type Locale } from '@/i18n';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/seo/StructuredData';
// CookieConsent, WhatsAppButton, ecc.

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <StructuredData />
      <Navbar />
      <main className="bg-white">
        {children}
      </main>
      <Footer />
      {/* CookieConsent, WhatsAppButton */}
    </NextIntlClientProvider>
  );
}
```

---

## 7. Messaggi – `messages/{locale}.json`

Struttura a namespace (es. per form e metadata):

```json
{
  "common": {
    "home": "Home",
    "services": "Servizi",
    "booking": "Prenota",
    "quote": "Preventivo",
    "contacts": "Contatti"
  },
  "home": {
    "hero": {
      "title": "Titolo hero",
      "tagline": "Sottotitolo",
      "locations": "Città1 • Città2 • ..."
    }
  },
  "services": {
    "metadata": {
      "title": "Servizi | Nome Sito",
      "description": "Descrizione pagina servizi."
    }
  },
  "booking": {
    "metadata": {
      "title": "Prenota | Nome Sito",
      "description": "Prenota il tuo servizio."
    }
  }
}
```

Mantieni le stesse chiavi in tutti i file `messages/*.json`; cambia solo i valori per lingua.

---

## 8. Uso nelle pagine

### 8.1 Server component

```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServiziPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return <h1>{t('metadata.title')}</h1>;
}
```

### 8.2 Client component

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function BookingForm() {
  const t = useTranslations('booking');
  return <button>{t('submit')}</button>;
}
```

### 8.3 Metadata (server)

In page o in layout figlio (per pagine client):

```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.metadata' });
  const baseUrl = 'https://www.tuosito.eu';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/servizi`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        it: `${baseUrl}/servizi`,
        en: `${baseUrl}/en/servizi`,
        fr: `${baseUrl}/fr/servizi`,
        es: `${baseUrl}/es/servizi`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url, /* ... */ },
    robots: { index: true, follow: true },
  };
}
```

---

## 9. Link e navigazione

Usa il prefisso lingua nell’href (es. `/it/servizi`, `/en/prenota`) oppure il componente `Link` di next-intl se previsto dalla tua configurazione. Il middleware gestisce il prefisso in base a `localePrefix`.

---

## 10. Layout per sezione (es. prenota)

Se una page è client e non può esportare `generateMetadata`, crea un layout nella stessa cartella:

- `app/[locale]/prenota/layout.tsx`: esporta `generateMetadata` (usa namespace es. `booking.metadata`) e default export che renderizza `{children}`.

Stessa cosa per preventivo, tour, ecc.: un layout per sezione con metadata e, se serve, titoli/descrizioni da messaggi.

---

## 11. Checklist i18n e layout

- [ ] `next-intl` installato e plugin in `next.config.ts`.
- [ ] `i18n.ts` con locales, defaultLocale, getRequestConfig e caricamento messaggi.
- [ ] `middleware.ts` con createMiddleware(next-intl) e matcher che esclude api, admin, sitemap, robots.
- [ ] `app/page.tsx` che fa redirect a `/${defaultLocale}`.
- [ ] `app/[locale]/layout.tsx` con validazione locale, getMessages, NextIntlClientProvider, Navbar, Footer, StructuredData.
- [ ] `messages/{it,en,fr,es}.json` con stesse chiavi; namespace per metadata e form.
- [ ] Ogni pagina pubblica ha title/description (da page o da layout figlio) con canonical e languages.
- [ ] Link e sitemap usano lo stesso prefisso lingua (es. sempre /it, /en).

Seguendo questo processo i18n e layout saranno allineati al progetto di riferimento e riutilizzabili nei prossimi progetti.
