# Sitemap e robots.txt – Guida completa Next.js (App Router)

Processo per avere sitemap XML e robots.txt come nel progetto di riferimento, con Google Search Console che legge la sitemap senza errori.

---

## 1. Cosa serve

| File / config | Ruolo |
|---------------|--------|
| `app/sitemap.ts` | Genera `/sitemap.xml` con tutti gli URL (per ogni locale e route). |
| `app/robots.ts` | Genera `/robots.txt` con allow/disallow e URL della sitemap. |
| `next.config.ts` | Header `Content-Type: application/xml` per `/sitemap.xml`. |
| `middleware.ts` | Escludere `sitemap.xml` e `robots.txt` dal middleware (next-intl). |

---

## 2. Sitemap – `app/sitemap.ts`

### 2.1 Struttura

- **baseUrl**: dominio finale (es. `https://www.tuosito.eu`).
- **locales**: stesse lingue del sito (es. `['it', 'en', 'fr', 'es']`).
- **routes**: elenco di path senza locale (la homepage è `''`).

Per ogni coppia (locale, route) si aggiunge un elemento alla sitemap con:

- `url`: `baseUrl` + `/${locale}` + route
- `lastModified`: `new Date()`
- `changeFrequency`: `'daily'` o `'weekly'`
- `priority`: tra 0 e 1

### 2.2 Esempio completo

```ts
import { MetadataRoute } from 'next';

const baseUrl = 'https://www.tuosito.eu';
const locales = ['it', 'en', 'fr', 'es'];

const routes = [
  '',
  '/servizi',
  '/veicoli',
  '/contatti',
  '/prenota',
  '/preventivo',
  '/privacy',
  '/cookie',
  '/tour/lago-como',
  '/tour/st-moritz',
  // ... tutte le route pubbliche
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/prenota' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/prenota' || route === '/preventivo' ? 0.9 : 0.8,
      });
    });
  });

  return sitemap;
}
```

### 2.3 Note

- **Niente `alternates`** nell’oggetto sitemap se in passato hai avuto “Impossibile leggere” in GSC; puoi aggiungerli in seguito se la sitemap viene letta correttamente.
- **baseUrl** deve essere uguale al dominio usato in SEO (stesso di metadataBase e canonical).
- La sitemap è generata a ogni richiesta; non serve un file fisico in `public/`.

---

## 3. Robots – `app/robots.ts`

### 3.1 Esempio

```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/payment-cancel/',
          '/payment-success/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://www.tuosito.eu/sitemap.xml',
  };
}
```

Sostituisci l’URL della sitemap con il tuo dominio. Non aggiungere trailing slash all’URL della sitemap qui.

---

## 4. Header Content-Type per la sitemap – `next.config.ts`

Google si aspetta `Content-Type: application/xml` (o `text/xml`). Senza questo header, GSC può dare “Impossibile leggere la Sitemap”.

```ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Content-Type', value: 'application/xml; charset=utf-8' }],
      },
    ];
  },
  // ... rest of config
};
```

Se usi un plugin (es. `withNextIntl`), mantieni la catena di wrap e aggiungi `headers` dentro lo stesso `nextConfig`.

---

## 5. Middleware – escludere sitemap e robots

Il middleware (es. next-intl) non deve intercettare le richieste a `sitemap.xml` e `robots.txt`, altrimenti Google potrebbe ricevere redirect o HTML invece dell’XML/testo.

Nel matcher, escludi esplicitamente questi path:

```ts
export const config = {
  matcher: [
    '/((?!api|admin|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/',
  ],
};
```

Cosa fa:

- `(?!...)` = negative lookahead: non matchare se il path inizia con uno di questi.
- `api`, `admin`, `_next`, `_vercel`: route di sistema.
- `favicon.ico`, `robots.txt`, `sitemap.xml`: file SEO/statici.
- `.*\\..*`: qualsiasi path che contiene un punto (estensione), così altri file statici non passano dal middleware.

Risultato: richieste a `/sitemap.xml` e `/robots.txt` non passano dal middleware e Next le gestisce con `sitemap.ts` e `robots.ts`.

---

## 6. Google Search Console – se la sitemap non viene letta

1. **Controlla l’URL**
   - Apri in browser: `https://www.tuosito.eu/sitemap.xml`.
   - Deve restituire XML con `<urlset>` e `<url><loc>...</loc></url>`.

2. **Forza un nuovo tentativo (cache)**
   - In GSC, invece di `https://www.tuosito.eu/sitemap.xml`, invia:
   - `https://www.tuosito.eu/sitemap.xml/` (con **slash finale**).
   - Così GSC può fare un nuovo fetch invece di usare un vecchio errore in cache.

3. **Proprietà giusta**
   - Se la proprietà è `https://tuosito.eu` (senza www), la sitemap deve essere raggiungibile da lì (stesso dominio o redirect corretto).
   - Oppure aggiungi la proprietà `https://www.tuosito.eu` e invia lì la sitemap.

4. **Header e middleware**
   - Verifica che `next.config.ts` abbia l’header `Content-Type: application/xml` per `/sitemap.xml`.
   - Verifica che il middleware escluda `sitemap.xml` (e `robots.txt`) come sopra.

---

## 7. Checklist

- [ ] `app/sitemap.ts` esiste, esporta `default function sitemap()` e restituisce un array di `{ url, lastModified, changeFrequency, priority }`.
- [ ] `baseUrl` e `routes` in `sitemap.ts` coincidono con il sito reale e con le lingue in `[locale]`.
- [ ] `app/robots.ts` esiste, esporta `default function robots()` con `rules` e `sitemap` (URL assoluto).
- [ ] In `next.config.ts` è configurato l’header `Content-Type: application/xml` per `source: '/sitemap.xml'`.
- [ ] Nel middleware il matcher esclude `robots.txt` e `sitemap.xml` (e opzionalmente `.*\\..*`).
- [ ] Dopo il deploy: apertura di `/sitemap.xml` e `/robots.txt` nel browser; invio sitemap in GSC (con o senza slash finale se serve).

Seguendo questo processo la sitemap e i robots saranno allineati al progetto di riferimento e compatibili con Google Search Console.
