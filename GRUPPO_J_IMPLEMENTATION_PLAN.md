# 🌍 PIANO IMPLEMENTAZIONE GRUPPO J - Sistema Multilingua

**Data inizio:** 21 Gennaio 2026  
**Soluzione scelta:** `next-intl` v3.x  
**Lingue target:** IT (default), EN, FR, ES

---

## 📋 FASI IMPLEMENTAZIONE

### ✅ FASE 1: Setup & Configurazione (2-3 ore)

#### Step 1.1: Installazione dipendenze

```bash
npm install next-intl
```

#### Step 1.2: Creare file configurazione `i18n.ts`

```typescript
// i18n.ts (root)
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Lingue supportate
export const locales = ['it', 'en', 'fr', 'es'] as const;
export const defaultLocale = 'it' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Valida che la locale sia supportata
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

#### Step 1.3: Creare middleware per locale detection

```typescript
// middleware.ts (root)
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista delle lingue supportate
  locales,
  
  // Lingua di default
  defaultLocale,
  
  // Strategia per rilevare la lingua preferita dell'utente
  localeDetection: true,
  
  // Prefix per le URL (default 'as-needed' = solo /en, /fr, /es, non /it)
  localePrefix: 'as-needed',
});

export const config = {
  // Matcher: applica middleware a tutte le route TRANNE admin e api
  matcher: [
    // Match tutte le route pubbliche
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
};
```

#### Step 1.4: Creare struttura file traduzioni

```
messages/
├── it.json   (principale, da compilare per primo)
├── en.json   (traduzione inglese)
├── fr.json   (traduzione francese)
└── es.json   (traduzione spagnolo)
```

**Struttura esempio `it.json`:**

```json
{
  "common": {
    "siteName": "LakeComoInCar",
    "phone": "+39 338 405 6027",
    "email": "lakecomoincar@gmail.com",
    "bookNow": "Prenota Ora",
    "requestQuote": "Richiedi Preventivo",
    "contactUs": "Contattaci",
    "learnMore": "Scopri di più"
  },
  "nav": {
    "home": "Home",
    "services": "Servizi",
    "tours": "Tour",
    "vehicles": "Veicoli",
    "quote": "Preventivo",
    "booking": "Prenota",
    "contacts": "Contatti",
    "privacy": "Privacy",
    "cookies": "Cookie"
  },
  "home": {
    "hero": {
      "title": "LakeComoInCar",
      "subtitle": "Autoservizi Pasquillo",
      "tagline": "Servizio NCC Professionale • Disponibile 24/7",
      "cta": "Prenota il Tuo Viaggio"
    },
    "about": {
      "title": "Chi Siamo",
      "description": "Autoservizi Pasquillo è un'azienda NCC specializzata..."
    }
  }
}
```

---

### ✅ FASE 2: Ristrutturazione App Router (3-4 ore)

#### Step 2.1: Creare nuovo layout con `[locale]`

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieConsent from '@/components/ui/CookieConsent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Valida locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Carica messaggi per la locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### Step 2.2: Spostare tutte le pagine in `[locale]/`

**Azioni:**
1. Creare cartella `app/[locale]/`
2. Spostare (non copiare) tutte le pagine pubbliche:
   - `page.tsx` (home)
   - `servizi/`
   - `tour/`
   - `veicoli/`
   - `preventivo/`
   - `prenota/`
   - `contatti/`
   - `privacy/`
   - `cookie/`

**⚠️ NON spostare:**
- `admin/` - Rimane in `app/admin/` (solo italiano)
- `api/` - Rimane in `app/api/` (non localizzate)

#### Step 2.3: Aggiornare import nei file spostati

Ogni pagina avrà accesso a `params.locale`:

```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.tagline')}</p>
    </div>
  );
}
```

---

### ✅ FASE 3: Conversione Componenti (4-6 ore)

#### Step 3.1: Convertire Navbar

```typescript
// components/layout/Navbar.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // Genera link localizzati
  const localizedPath = (path: string) => `/${locale}${path}`;

  return (
    <nav>
      <Link href={localizedPath('/')}>{t('home')}</Link>
      <Link href={localizedPath('/servizi')}>{t('services')}</Link>
      <Link href={localizedPath('/tour')}>{t('tours')}</Link>
      <Link href={localizedPath('/veicoli')}>{t('vehicles')}</Link>
      <Link href={localizedPath('/preventivo')}>{t('quote')}</Link>
      <Link href={localizedPath('/prenota')}>{t('booking')}</Link>
      <Link href={localizedPath('/contatti')}>{t('contacts')}</Link>
      
      {/* Language Switcher */}
      <LocaleSwitcher />
    </nav>
  );
}
```

#### Step 3.2: Creare Language Switcher

```typescript
// components/ui/LocaleSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    // Rimuovi locale corrente dal path
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Naviga alla nuova locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-3 py-1 rounded ${
            locale === loc ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

#### Step 3.3: Convertire Footer

```typescript
// components/layout/Footer.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer>
      <p>{t('copyright', { year: new Date().getFullYear() })}</p>
      <p>{t('company')}: Autoservizi Pasquillo SRL</p>
      <p>{t('vat')}: 04193150135</p>
    </footer>
  );
}
```

#### Step 3.4: Aggiornare Form con traduzioni

```typescript
// app/[locale]/preventivo/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function QuotePage() {
  const t = useTranslations('quote');
  
  return (
    <form>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      
      <label>{t('form.name')}</label>
      <input type="text" placeholder={t('form.namePlaceholder')} />
      
      <label>{t('form.email')}</label>
      <input type="email" placeholder={t('form.emailPlaceholder')} />
      
      <button type="submit">{t('form.submit')}</button>
    </form>
  );
}
```

---

### ✅ FASE 4: File Traduzioni Completi (6-8 ore)

#### Step 4.1: Compilare `it.json` completo

Estrarre **TUTTI** i testi dal sito attuale e organizzarli per sezioni:

```json
{
  "common": { ... },
  "nav": { ... },
  "footer": { ... },
  "home": { ... },
  "services": { ... },
  "tours": {
    "shopping": { ... },
    "bernina": { ... },
    "stMoritz": { ... },
    "lakeComo": { ... }
  },
  "vehicles": { ... },
  "quote": {
    "form": { ... }
  },
  "booking": {
    "form": { ... }
  },
  "contacts": { ... },
  "privacy": { ... },
  "cookies": { ... }
}
```

#### Step 4.2: Tradurre in EN, FR, ES

**Opzioni:**
1. **Manuale** (più accurato per contenuti marketing)
2. **AI-assisted** (DeepL API / ChatGPT per prima bozza, poi revisione manuale)
3. **Servizio professionale** (per massima qualità)

**Consiglio:** Usa AI per prima bozza, poi revisione manuale per:
- Tagline marketing
- CTA importanti
- Terminologia tecnica NCC

---

### ✅ FASE 5: Metadata & SEO Localizzati (2-3 ore)

#### Step 5.1: Metadata dinamici per locale

```typescript
// app/[locale]/page.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home.metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        'it': 'https://yourdomain.com/it',
        'en': 'https://yourdomain.com/en',
        'fr': 'https://yourdomain.com/fr',
        'es': 'https://yourdomain.com/es',
      },
    },
  };
}
```

#### Step 5.2: Hreflang tags automatici

```typescript
// app/[locale]/layout.tsx
export default async function LocaleLayout({ params: { locale } }) {
  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="it" href="https://yourdomain.com/it" />
        <link rel="alternate" hrefLang="en" href="https://yourdomain.com/en" />
        <link rel="alternate" hrefLang="fr" href="https://yourdomain.com/fr" />
        <link rel="alternate" hrefLang="es" href="https://yourdomain.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://yourdomain.com/it" />
      </head>
      {/* ... */}
    </html>
  );
}
```

---

### ✅ FASE 6: Email Multilingua (già implementato! ✅)

**Buone notizie:** Il sistema email è **già pronto** per multilingua!

```typescript
// src/lib/email.ts (già esistente)
const getEmailContent = (language: string) => {
  switch (language) {
    case 'en': return { subject: '...', body: '...' };
    case 'fr': return { subject: '...', body: '...' };
    case 'es': return { subject: '...', body: '...' };
    default: return { subject: '...', body: '...' };
  }
};
```

**Da fare:**
- ✅ Integrare con `locale` dal form
- ✅ Passare `locale` alle API routes

```typescript
// app/[locale]/preventivo/page.tsx
const handleSubmit = async (e) => {
  const locale = useLocale(); // Ottieni locale corrente
  
  await fetch('/api/quotes', {
    method: 'POST',
    body: JSON.stringify({
      ...formData,
      language: locale, // 📧 Passa locale per email
    }),
  });
};
```

---

### ✅ FASE 7: Testing (2-3 ore)

#### Checklist Test:

- [ ] **Homepage IT** - Verifica tutti i testi
- [ ] **Homepage EN** - Verifica traduzione
- [ ] **Homepage FR** - Verifica traduzione
- [ ] **Homepage ES** - Verifica traduzione
- [ ] **Navbar** - Language switcher funzionante
- [ ] **Footer** - Traduzioni corrette
- [ ] **Form Preventivo** - Tutte le lingue
- [ ] **Form Prenotazione** - Tutte le lingue
- [ ] **Email** - Invio con lingua corretta
- [ ] **Tour pages** - Tutte le lingue
- [ ] **Veicoli page** - Tutte le lingue
- [ ] **Privacy/Cookie** - Tutte le lingue
- [ ] **WhatsApp button** - Messaggi localizzati (già fatto! ✅)
- [ ] **URL structure** - `/it`, `/en`, `/fr`, `/es`
- [ ] **SEO metadata** - Hreflang tags
- [ ] **Admin dashboard** - Funziona (solo IT, non localizzata)

---

## 📊 STIMA TEMPI

| Fase | Tempo Stimato | Difficoltà |
|------|---------------|------------|
| 1. Setup | 2-3 ore | ⭐ Facile |
| 2. Ristrutturazione | 3-4 ore | ⭐⭐ Media |
| 3. Conversione Componenti | 4-6 ore | ⭐⭐ Media |
| 4. File Traduzioni | 6-8 ore | ⭐⭐⭐ Alta (manuale) |
| 5. Metadata SEO | 2-3 ore | ⭐⭐ Media |
| 6. Email Integration | 1 ora | ⭐ Facile (già pronto!) |
| 7. Testing | 2-3 ore | ⭐⭐ Media |

**TOTALE:** 20-28 ore (~3-4 giorni lavorativi)

---

## 🎯 ALTERNATIVE CONSIDERATE

### ❌ `next-translate`
- Pro: Leggero, semplice
- Contro: Non ottimizzato per App Router, meno features

### ❌ `react-i18next`
- Pro: Standard React, flessibile
- Contro: Più complesso, meno integrato con Next.js routing

### ❌ Soluzione Custom
- Pro: Controllo totale
- Contro: Troppo tempo, reinventare la ruota, manutenzione

---

## 🚀 PROSSIMI STEP IMMEDIATI

### Da fare SUBITO:

1. ✅ **Installare `next-intl`**
   ```bash
   npm install next-intl
   ```

2. ✅ **Creare `i18n.ts` e `middleware.ts`**

3. ✅ **Creare cartella `messages/` con `it.json` base**

4. ✅ **Testare con homepage**
   - Spostare `app/page.tsx` → `app/[locale]/page.tsx`
   - Convertire 2-3 testi statici con `useTranslations()`
   - Verificare che funzioni

5. ✅ **Una volta confermato il funzionamento, procedere con tutte le pagine**

---

## ⚠️ NOTE IMPORTANTI

### Admin Dashboard:
**NON localizzare** `/admin` - rimane solo in italiano.
- Middleware esclude `/admin` dal locale routing
- Admin ha sempre testi IT fissi
- Nessun language switcher in admin

### API Routes:
**NON localizzate** - rimangono in `/api`
- Ricevono parametro `language` dal frontend
- Usano `language` per email templates
- Response sempre JSON, non HTML tradotto

### WhatsApp Button:
**GIÀ PRONTO!** ✅
- Usa `usePathname()` per rilevare lingua
- Messaggi già multilingua
- Funziona automaticamente con nuovo routing

---

## 📚 RISORSE

- **Documentazione:** https://next-intl-docs.vercel.app/
- **Examples:** https://github.com/amannn/next-intl/tree/main/examples
- **Migration Guide:** https://next-intl-docs.vercel.app/docs/getting-started/app-router

---

**Pronto per iniziare?** 🚀

Posso procedere con:
1. Installazione `next-intl`
2. Setup configurazione base
3. Creazione primo file traduzioni `it.json`
4. Test con homepage

**Vuoi che inizi ora?** 😊
