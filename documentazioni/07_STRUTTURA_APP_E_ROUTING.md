# Struttura app e routing – Next.js App Router

Processo per replicare la struttura delle cartelle e il routing del progetto: App Router, layout gerarchici, middleware, redirect e convenzioni.

---

## 1. Panoramica cartelle

```
app/
  layout.tsx              # Root: font, metadata base, script PayPal
  page.tsx                # Redirect / → /it
  globals.css
  favicon.ico
  robots.ts               # /robots.txt
  sitemap.ts              # /sitemap.xml

  [locale]/               # Segmento dinamico lingua
    layout.tsx            # Provider i18n, Navbar, Footer, StructuredData
    page.tsx              # Homepage per lingua

    servizi/page.tsx
    veicoli/page.tsx
    contatti/page.tsx
    prenota/
      layout.tsx          # Metadata prenota (page è client)
      page.tsx
    preventivo/
      layout.tsx
      page.tsx
    privacy/page.tsx
    cookie/page.tsx
    tour/
      lago-como/layout.tsx + page.tsx
      st-moritz/...
      bernina-express/...
      shopping/...

  admin/                  # Area admin (fuori da [locale])
    layout.tsx
    page.tsx
    dashboard/page.tsx

  api/                    # API Route
    bookings/route.ts
    bookings/[id]/route.ts
    quotes/route.ts
    quotes/[id]/route.ts
    calculate-price/route.ts
    paypal/create-order/route.ts
    paypal/capture-order/route.ts
    stripe/create-payment-intent/route.ts
    stripe/verify-payment/route.ts
    admin/routes/route.ts
    admin/routes/[id]/route.ts
    auth/login/route.ts
    ...

  payment-success/page.tsx
  payment-cancel/page.tsx
```

---

## 2. Layout gerarchici

- **app/layout.tsx**: avvolge tutto (html, body), non contiene Navbar/Footer (sono nel layout locale). Qui: metadata globale, font, script esterni (es. PayPal).
- **app/[locale]/layout.tsx**: avvolge tutte le pagine pubbliche per lingua; qui Navbar, Footer, NextIntlClientProvider, StructuredData.
- **app/[locale]/prenota/layout.tsx** (e simili): solo per fornire `generateMetadata` quando la page è client; il default export renderizza `{children}`.

Regola: **un layout non deve essere vuoto**. Se non serve struttura aggiuntiva, esporta almeno:

```tsx
export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

e, se la page è client, aggiungi `generateMetadata` nello stesso layout.

---

## 3. Routing e middleware

- **Middleware** (next-intl): intercetta le richieste alle route “pubbliche” (tranne quelle nel matcher exclude). Imposta il locale e gestisce il prefisso (es. /it, /en).
- **Matcher**: escludere sempre `api`, `admin`, `_next`, `_vercel`, `favicon.ico`, `robots.txt`, `sitemap.xml` e, se vuoi, tutti i path con un punto `.*\\..*` per file statici.
- **app/page.tsx**: unica route senza prefisso lingua; deve fare redirect a `/${defaultLocale}` (es. `/it`).

Le API non passano dal middleware next-intl perché `api` è nel negative lookahead.

---

## 4. Convenzioni file

- **Page**: `page.tsx` in una cartella = route pubblica per quella path.
- **Layout**: `layout.tsx` avvolge i figli (stesso livello e sottocartelle).
- **API**: `route.ts` in `app/api/...` con export `GET`, `POST`, `PATCH`, `DELETE` a seconda di ciò che serve.
- **Params**: in Next.js 15+ i params sono una Promise: `const { id } = await params;` o `const { locale } = await params;`.

---

## 5. Segmenti dinamici

- **`[locale]`**: lingua (it, en, fr, es). Validare in layout con `locales.includes(locale)` e `notFound()` se non valido.
- **`[id]`**: nelle API per risorsa singola (es. `app/api/bookings/[id]/route.ts`). Leggere con `const { id } = await params;`.

---

## 6. Route “speciali”

- **payment-success / payment-cancel**: fuori da `[locale]` se vuoi URL semplici; altrimenti puoi metterle sotto `[locale]` (es. `/it/payment-success`). Coerente con return_url/cancel_url di PayPal/Stripe.
- **admin**: fuori da `[locale]`, così l’URL è sempre `/admin` e `/admin/dashboard` senza prefisso lingua.

---

## 7. Checklist struttura e routing

- [ ] Root layout con metadata e script globali; root page con redirect a default locale.
- [ ] Layout `[locale]` con validazione locale e provider i18n; nessun layout vuoto.
- [ ] Per ogni pagina client che ha bisogno di metadata: layout figlio con `generateMetadata` e default export con `{children}`.
- [ ] Middleware con matcher che esclude api, admin, sitemap, robots, favicon, file con estensione.
- [ ] API sotto `app/api/` con `route.ts` e `[id]/route.ts` dove serve; params usati con `await params`.
- [ ] Convenzioni nomi: page.tsx, layout.tsx, route.ts; segmenti dinamici [locale], [id].

Seguendo questo processo la struttura app e il routing saranno allineati al progetto di riferimento e riutilizzabili nei prossimi progetti.
