# Documentazioni – Indice e checklist per progetti simili

Questa cartella contiene processi dettagliati per replicare le funzionalità del progetto su nuovi siti (Next.js, multilingua, prenotazioni, pagamenti, admin). **Usa questi documenti come riferimento unico** e segui l’ordine consigliato.

---

## Ordine consigliato di lettura/implementazione

| # | Documento | Contenuto | Quando usarlo |
|---|-----------|-----------|----------------|
| 1 | [01_SEO.md](./01_SEO.md) | Meta tag, canonical, Open Graph, Google Search Console, Structured Data (Schema.org) | Sempre, dalla fase iniziale |
| 2 | [02_SITEMAP_E_ROBOTS.md](./02_SITEMAP_E_ROBOTS.md) | Sitemap XML, robots.txt, header Content-Type, middleware | Dopo le pagine principali |
| 3 | [03_DATABASE.md](./03_DATABASE.md) | Schema Supabase, tabelle, RLS, tipi TypeScript | Prima di CRUD e form |
| 4 | [04_CRUD_E_API.md](./04_CRUD_E_API.md) | API Route (GET/POST/PATCH/DELETE), lib db, componenti admin | Dopo il database |
| 5 | [05_PAGAMENTI.md](./05_PAGAMENTI.md) | PayPal e Stripe: create order, capture, payment intent, verify | Se servono pagamenti online |
| 6 | [06_I18N_E_LAYOUT.md](./06_I18N_E_LAYOUT.md) | next-intl, middleware, [locale], messaggi, layout per lingua | Se il sito è multilingua |
| 7 | [07_STRUTTURA_APP_E_ROUTING.md](./07_STRUTTURA_APP_E_ROUTING.md) | App Router, layout gerarchici, middleware matcher, redirect | Per struttura e routing |
| 8 | [08_EMAIL_E_NOTIFICHE.md](./08_EMAIL_E_NOTIFICHE.md) | Nodemailer, template, notifiche prenotazione/preventivo | Se servono email transazionali |
| 9 | [09_VARIABILI_AMBIENTE.md](./09_VARIABILI_AMBIENTE.md) | .env, env.example, variabili per Supabase/PayPal/Stripe/Email | Setup iniziale e deploy |

---

## Checklist “Progetto simile” (da seguire in ordine)

### Fase 1 – Setup e struttura
- [ ] Next.js (App Router) creato, dipendenze installate
- [ ] Cartelle `app/`, `components/`, `src/lib/`, `src/types/`, `messages/` definite
- [ ] File `i18n.ts` e middleware next-intl (se multilingua) → vedi [06_I18N_E_LAYOUT.md](./06_I18N_E_LAYOUT.md)
- [ ] Variabili d’ambiente configurate → vedi [09_VARIABILI_AMBIENTE.md](./09_VARIABILI_AMBIENTE.md)

### Fase 2 – SEO
- [ ] `app/layout.tsx`: metadataBase, title, description, keywords, openGraph, twitter, robots, verification
- [ ] Ogni pagina/layout con `generateMetadata` (title, description, canonical, alternates.languages, openGraph)
- [ ] Componente Structured Data (LocalBusiness, Organization, WebSite, BreadcrumbList) → vedi [01_SEO.md](./01_SEO.md)
- [ ] Google Search Console: verifica proprietà (tag HTML o file), sitemap inviata

### Fase 3 – Sitemap e robots
- [ ] `app/sitemap.ts` con baseUrl, locales, routes, priorità e changeFrequency
- [ ] `app/robots.ts` con allow/disallow e URL sitemap
- [ ] `next.config.ts`: header `Content-Type: application/xml` per `/sitemap.xml`
- [ ] Middleware: esclusione esplicita di `sitemap.xml` e `robots.txt` → vedi [02_SITEMAP_E_ROBOTS.md](./02_SITEMAP_E_ROBOTS.md)

### Fase 4 – Database
- [ ] Progetto Supabase creato, schema applicato (tabelle, indici, RLS, trigger)
- [ ] `src/lib/supabase.ts`: client anonimo + client admin (service role)
- [ ] `src/types/database.ts`: interfacce TypeScript per tutte le tabelle e Insert/Update
- [ ] Funzioni in `src/lib/db/` (es. bookings.ts, quotes.ts) per ogni entità → vedi [03_DATABASE.md](./03_DATABASE.md)

### Fase 5 – CRUD e API
- [ ] API Route per ogni risorsa: `app/api/bookings/route.ts` (GET, POST), `app/api/bookings/[id]/route.ts` (GET, PATCH, DELETE)
- [ ] Validazione body (campi obbligatori, tipi), gestione errori e status HTTP
- [ ] Integrazione con funzioni in `src/lib/db/` e, se previsto, invio email
- [ ] Componenti admin (lista, form, modale) che chiamano queste API → vedi [04_CRUD_E_API.md](./04_CRUD_E_API.md)

### Fase 6 – Pagamenti (se richiesti)
- [ ] PayPal: create-order, capture-order, variabili env, componente bottone
- [ ] Stripe: create-payment-intent, verify-payment, variabili env, componente checkout
- [ ] Pagine payment-success e payment-cancel, aggiornamento stato prenotazione dopo pagamento → vedi [05_PAGAMENTI.md](./05_PAGAMENTI.md)

### Fase 7 – Contenuti e layout
- [ ] Layout root e layout `[locale]` con Navbar, Footer, provider next-intl
- [ ] File `messages/{locale}.json` per ogni lingua, chiavi allineate tra i file
- [ ] Pagine con `generateMetadata` o metadata nel layout figlio (client component)
- [ ] Link e navigazione con prefisso lingua coerente → vedi [06_I18N_E_LAYOUT.md](./06_I18N_E_LAYOUT.md) e [07_STRUTTURA_APP_E_ROUTING.md](./07_STRUTTURA_APP_E_ROUTING.md)

### Fase 8 – Email (se richieste)
- [ ] Configurazione Nodemailer (o altro provider), template testi e HTML
- [ ] Invio notifica admin e conferma cliente su prenotazione/preventivo
- [ ] Log o gestione errori invio → vedi [08_EMAIL_E_NOTIFICHE.md](./08_EMAIL_E_NOTIFICHE.md)

### Fase 9 – Deploy e verifica
- [ ] Build senza errori (`npm run build`)
- [ ] Variabili d’ambiente impostate in produzione (Vercel/hosting)
- [ ] Dominio e HTTPS configurati, redirect HTTP → HTTPS
- [ ] Google Search Console: verifica, sitemap, controllo URL su pagine principali

---

## Convenzioni usate in questa documentazione

- **Percorsi**: `app/` = App Router Next.js; `src/lib/` = logica e accesso dati; `components/` = UI riutilizzabile.
- **Naming**: API in minuscolo con trattino (`/api/bookings`, `/api/calculate-price`); tipi TypeScript in PascalCase; file di route `route.ts`.
- **Lingue**: locale come segmento `[locale]`, valori `it`, `en`, `fr`, `es`; lingua di default `it`.
- **Database**: Supabase (PostgreSQL); RLS abilitato; operazioni “admin” con client service role.

---

## Riferimento rapido file chiave (progetto di riferimento)

| Area | File / cartella |
|------|------------------|
| SEO | `app/layout.tsx`, `app/[locale]/*/layout.tsx`, `components/seo/StructuredData.tsx` |
| Sitemap | `app/sitemap.ts`, `app/robots.ts`, `next.config.ts` (headers) |
| Database | `supabase/schema.sql`, `src/lib/supabase.ts`, `src/types/database.ts`, `src/lib/db/*.ts` |
| CRUD | `app/api/bookings/`, `app/api/quotes/`, `app/api/admin/*/`, `components/admin/*` |
| Pagamenti | `app/api/paypal/`, `app/api/stripe/`, `src/lib/paypal.ts`, `src/lib/stripe.ts`, `components/payment/*` |
| i18n | `i18n.ts`, `middleware.ts`, `messages/*.json`, `app/[locale]/layout.tsx` |
| Routing | `app/page.tsx` (redirect), `app/[locale]/**/page.tsx`, `middleware.ts` (config.matcher) |

Usa questo indice e la checklist per ogni nuovo progetto simile e adatta nomi e percorsi al contesto (es. altro dominio, altre entità oltre a bookings/quotes).
