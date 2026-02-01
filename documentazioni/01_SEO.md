# SEO – Guida completa per progetti Next.js (App Router)

Processo dettagliato per ottenere lo stesso livello di SEO: meta tag, canonical, Open Graph, Google Search Console, Structured Data (Schema.org).

---

## 1. Cosa implementare (panoramica)

| Elemento | Dove | Scopo |
|----------|------|--------|
| metadataBase | Root layout | Base per tutti gli URL relativi (immagini, canonical) |
| title, description, keywords | Root layout + ogni pagina | Snippet Google e tab browser |
| openGraph | Root layout + ogni pagina | Anteprime social (Facebook, WhatsApp, LinkedIn) |
| twitter | Root layout | Anteprime Twitter/X |
| robots | Root layout | Indicizzazione e follow link |
| verification | Root layout | Verifica proprietà Google/Bing |
| alternates.canonical | Ogni pagina | URL canonico (evita duplicati) |
| alternates.languages | Ogni pagina multilingua | hreflang per le lingue |
| Structured Data (JSON-LD) | Componente in layout | LocalBusiness, Organization, WebSite, BreadcrumbList |

---

## 2. Layout root – `app/layout.tsx`

### 2.1 Import e tipi

```tsx
import type { Metadata } from "next";
```

### 2.2 Oggetto `metadata` esportato

Tutti i campi sotto sono da adattare al dominio e ai testi del progetto.

```tsx
export const metadata: Metadata = {
  // Base per URL relativi (obbligatorio per Open Graph e canonical)
  metadataBase: new URL('https://www.tuosito.eu'),

  title: {
    default: "Titolo Sito | Sottotitolo Principale",
    template: "%s | Nome Sito",  // template per le pagine figlie
  },

  description: "Descrizione unica della homepage, 150-160 caratteri, con parole chiave.",

  keywords: [
    "keyword1",
    "keyword2",
    "keyword3",
    // ... 10-15 keyword rilevanti
  ],

  authors: [{ name: "Nome Azienda o Autore" }],
  creator: "Nome Azienda",
  publisher: "Nome Sito",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },

  openGraph: {
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US", "fr_FR", "es_ES"],
    url: "https://www.tuosito.eu",
    siteName: "Nome Sito",
    title: "Titolo per i social",
    description: "Descrizione per anteprime social.",
    images: [
      {
        url: "/favicon.webp",
        width: 1200,
        height: 630,
        alt: "Nome Sito",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Titolo Twitter",
    description: "Descrizione breve.",
    images: ["/favicon.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'CODICE_GOOGLE_SEARCH_CONSOLE',
    // yandex: '...',
    // bing: '...',
  },
};
```

### 2.3 Dove prendere il codice Google

1. Vai su [Google Search Console](https://search.google.com/search-console).
2. Aggiungi proprietà → Prefisso URL → `https://www.tuosito.eu`.
3. Verifica con **Tag HTML**: copia il valore di `content` del meta tag.
4. Incollalo in `verification.google` (solo il valore, senza virgolette nel meta).

---

## 3. Metadata per ogni pagina (e layout)

### 3.1 Pagine server (senza `'use client'`)

Puoi esportare `generateMetadata` dalla **page** stessa:

```tsx
// app/[locale]/servizi/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Nome Sito',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Servizi' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export default function ServiziPage() {
  // ...
}
```

### 3.2 Pagine client (`'use client'`)

Se la page è client non può esportare `generateMetadata`. Usa un **layout** nella stessa cartella e metti lì la metadata.

Esempio: `app/[locale]/prenota/page.tsx` è client → crea `app/[locale]/prenota/layout.tsx`:

```tsx
// app/[locale]/prenota/layout.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseUrl = 'https://www.tuosito.eu';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking.metadata' });
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/prenota`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        it: `${baseUrl}/prenota`,
        en: `${baseUrl}/en/prenota`,
        fr: `${baseUrl}/fr/prenota`,
        es: `${baseUrl}/es/prenota`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Nome Sito',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Prenota' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export default function PrenotaLayout({ children }: Props) {
  return <>{children}</>;
}
```

Regola: **una sola fonte di metadata per route** (o dalla page o dal layout figlio più vicino).

---

## 4. Structured Data (Schema.org) – componente

### 4.1 Dove mettere il componente

Nel layout che avvolge le pagine pubbliche (es. `app/[locale]/layout.tsx`), così ogni pagina ha gli stessi schema globali (LocalBusiness, Organization, WebSite). Il BreadcrumbList può essere fisso o generato per pagina.

### 4.2 File: `components/seo/StructuredData.tsx`

Il componente è **client** (`'use client'`) e renderizza script `application/ld+json`:

```tsx
'use client';

export default function StructuredData() {
  const baseUrl = 'https://www.tuosito.eu';

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    "name": "Nome Sito - Nome Azienda",
    "alternateName": "Nome Azienda",
    "description": "Descrizione breve servizi.",
    "url": baseUrl,
    "telephone": "+39-XXXXXXXXXX",
    "email": "email@dominio.it",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Example 1",
      "addressLocality": "Città",
      "addressRegion": "XX",
      "postalCode": "12345",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.8080",
      "longitude": "9.0852"
    },
    "priceRange": "€€",
    "areaServed": [
      { "@type": "City", "name": "Città1" },
      { "@type": "AdministrativeArea", "name": "Regione" },
      { "@type": "Country", "name": "Svizzera" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/...",
      "https://www.instagram.com/..."
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Nome Sito",
    "legalName": "Ragione Sociale",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.webp`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-XXXXXXXXXX",
      "contactType": "customer service",
      "email": "email@dominio.it",
      "availableLanguage": ["Italian", "English", "French", "Spanish"],
      "areaServed": ["IT", "CH"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Nome Sito",
    "description": "Descrizione sito",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/it/servizi?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["it-IT", "en-US", "fr-FR", "es-ES"]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/it` },
      { "@type": "ListItem", "position": 2, "name": "Servizi", "item": `${baseUrl}/it/servizi` },
      { "@type": "ListItem", "position": 3, "name": "Prenota", "item": `${baseUrl}/it/prenota` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
```

Sostituisci `baseUrl`, nomi, indirizzo, telefono, email, social e voci breadcrumb con i dati del progetto.

---

## 5. Google Search Console – passi operativi

1. **Verifica proprietà**
   - Proprietà → Prefisso URL: `https://www.tuosito.eu`
   - Metodo: Tag HTML → copia `content` → incolla in `metadata.verification.google` nel layout root → deploy → Verifica.

2. **Sitemap**
   - Indicizzazione → Sitemap → Aggiungi: `https://www.tuosito.eu/sitemap.xml` (o `sitemap.xml/` con slash se serve forzare un nuovo fetch).

3. **Controllo URL**
   - Usa “Controlla URL” sulle pagine importanti; se la proprietà è senza `www`, inserisci URL senza `www` (o aggiungi la proprietà con `www`).

4. **Richiedi indicizzazione**
   - Per le pagine principali usa “Richiedi indicizzazione” dopo aver verificato che la pagina sia pubblicata in HTTPS.

---

## 6. Checklist SEO

- [ ] `metadataBase` nel layout root con URL finale (con o senza `www` in base alla scelta).
- [ ] Ogni pagina pubblica ha title e description unici (da page o da layout).
- [ ] canonical e `languages` (hreflang) su ogni pagina multilingua.
- [ ] openGraph e twitter compilati (titolo, descrizione, immagine).
- [ ] verification.google compilato e verificato in GSC.
- [ ] Componente Structured Data incluso nel layout locale con dati reali (telefono, indirizzo, email).
- [ ] Nessun layout vuoto: se la page è client, il layout figlio esporta `generateMetadata`.
- [ ] Dopo il deploy: GSC verificata, sitemap inviata, controllo URL su homepage e 2–3 pagine chiave.

---

## 7. Errori comuni da evitare

1. **URL misti**  
   Decidi un solo dominio canonico (es. `https://www.tuosito.eu`) e usalo ovunque: metadataBase, canonical, alternates.languages, Structured Data, sitemap.

2. **Layout vuoto**  
   Un file `layout.tsx` vuoto non è un modulo valido e rompe il build. Se non serve struttura aggiuntiva, esporta almeno un default che renderizza `{children}` e, se necessario, `generateMetadata`.

3. **Verification**  
   Il valore in `verification.google` deve essere **solo** il codice che Google ti dà (stringa), senza `<meta ...>`.

4. **Structured Data**  
   Usa sempre `https://` negli URL negli schema e controlla che numeri di telefono e indirizzi siano corretti (Google può mostrarli in Knowledge Panel).

Seguendo questo processo avrai SEO allineata al progetto di riferimento e pronta per i prossimi progetti.
