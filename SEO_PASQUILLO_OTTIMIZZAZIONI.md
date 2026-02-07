# Ottimizzazioni SEO per "Pasquillo" e "Autoservizi Pasquillo"

## Problema
Cercando **autoservizi pasquillo** o **pasquillo** su Google il sito non compariva, nonostante Google Search Console configurato.

## Modifiche applicate

### 1. Titoli e meta (brand-first)
- **Root layout** (`app/layout.tsx`): titolo di default ora inizia con **"Autoservizi Pasquillo"**; template `"%s | Autoservizi Pasquillo - LakeComoInCar"`; keyword **"pasquillo"** aggiunta in cima alla lista; Open Graph e Twitter con "Autoservizi Pasquillo" in title/description/siteName.
- **Homepage** (`app/[locale]/page.tsx`): titolo IT **"Autoservizi Pasquillo | Taxi Como 24/7 | ..."**; description che inizia con **"Autoservizi Pasquillo:"**; keyword **"pasquillo"** e **"autoservizi pasquillo"** in testa; OG/twitter allineati.

### 2. Canonical e hreflang
- **Alternates lingua**: `languages.it` era `baseUrl` (senza `/it`); corretto in **`baseUrl/it`** perché con `localePrefix: 'always'` l’italiano è su `/it`.
- Aggiunto **`x-default`** → `baseUrl/it` così Google sa quale versione usare come predefinita.

### 3. Structured Data (Schema.org)
- **LocalBusiness**: `name` → **"Autoservizi Pasquillo - LakeComoInCar"**; `alternateName` con **"Pasquillo"**, **"Autoservizi Pasquillo"**, **"Autoservizi Pasquillo SRL"**; description con "Autoservizi Pasquillo" e "Pasquillo".
- **Organization**: `name` con Pasquillo; `legalName` → **"Autoservizi Pasquillo SRL"**; aggiunto `alternateName` (Pasquillo, Autoservizi Pasquillo).
- **WebSite**: `name` e `alternateName` con Pasquillo; description che inizia con "Autoservizi Pasquillo".

### 4. Contenuti in pagina (IT)
- **Homepage**: blocco SEO con H3 **"Pasquillo – Autoservizi Pasquillo: Taxi Como e NCC Como"** e primo periodo che inizia con **"Pasquillo – Autoservizi Pasquillo"**.
- **Servizi** (`messages/it.json`): hero title **"Servizi Autoservizi Pasquillo | NCC Como | ..."**; subtitle con "Autoservizi Pasquillo" e "Pasquillo - LakeComoInCar".
- **Contatti**: già con "Autoservizi Pasquillo" in title/description (confermato).

### 5. Metadata pagine (IT)
- **Servizi**: metadata title/description con "Autoservizi Pasquillo" e "Pasquillo"; aggiunti `alternates` (canonical + languages), Open Graph, robots.
- **Contatti** (it.json): title **"Contatti Autoservizi Pasquillo | NCC Como - Telefono e Email"**; description con "Contatti Autoservizi Pasquillo" e "Pasquillo - LakeComoInCar".

### 6. Correzioni minori
- **Copyright**: rimosso doppio "SRL" (es. "Autoservizi Pasquillo SRL SRL" → "Autoservizi Pasquillo SRL") in `it`, `en`, `fr`, `es`.
- **Privacy** (it/en): stessa correzione nella frase che cita la ragione sociale.

---

## Cosa controllare ancora (tu / operativo)

### Google Search Console
1. **Verifica proprietà**: dominio o prefisso URL corretti; meta tag o file HTML già presenti (es. `google: E-enLeorDhInGXjBkcvgjYpiKywKCdqeCS2xm6VMrxQ`).
2. **Sitemap**: invia/aggiorna `https://www.lakecomoincar.eu/sitemap.xml` (in Sitemap in GSC).
3. **Richiedi indicizzazione**: per le URL principali (home `/it`, `/it/servizi`, `/it/contatti`, `/it/prenota`) usa "Controlla URL" → "Richiedi indicizzazione".
4. **Copertura**: controlla che non ci siano "Esclusi" o errori di crawling; se il sito è nuovo, l’indicizzazione può richiedere giorni/settimane.

### Tecnico già ok
- **robots.txt**: consente `/` e punta a `sitemap.xml`; blocca solo `/api/`, `/admin/`, pagine payment.
- **middleware**: esclude `sitemap.xml` e `robots.txt` dal middleware next-intl (nessun redirect su questi file).
- **Sitemap**: genera URL per tutti i locale (`/it`, `/en`, `/fr`, `/es`) e le route principali; `lastModified` e `priority` impostati.

### Consigli extra (opzionali)
- **Google Business Profile**: se esiste una scheda "Autoservizi Pasquillo" / LakeComoInCar, assicurati che il sito web sia `https://www.lakecomoincar.eu` e che NAP (nome, indirizzo, telefono) siano identici a sito e Schema.org.
- **Backlink**: qualche link da siti locali (Como, Lombardia, turismo, NCC) verso il dominio aiuta l’autorità e le ricerche brand "Pasquillo".
- **Velocità e Core Web Vitals**: in GSC controlla "Esperienza" → "Core Web Vitals"; miglioramenti lato performance aiutano il ranking.

---

## Riepilogo file modificati

| File | Modifiche |
|------|-----------|
| `app/layout.tsx` | Title/default/template, description, keywords, OG, Twitter con Pasquillo |
| `app/[locale]/page.tsx` | Title/description IT, keywords, alternates (canonical + languages + x-default), OG/twitter, blocco SEO H3 e testo |
| `app/[locale]/servizi/page.tsx` | generateMetadata con alternates, OG, robots |
| `components/seo/StructuredData.tsx` | LocalBusiness, Organization, WebSite: name/alternateName/description con Pasquillo |
| `messages/it.json` | metadata home/servizi/contatti, hero servizi, copyright e privacy (fix SRL SRL) |
| `messages/en.json` | copyright e privacy (fix SRL SRL) |
| `messages/es.json` | copyright (fix SRL SRL) |
| `messages/fr.json` | copyright (fix SRL SRL) |

Dopo il deploy, in Google Search Console: invia di nuovo la sitemap e richiedi l’indicizzazione delle URL principali. I risultati per "pasquillo" e "autoservizi pasquillo" possono richiedere qualche settimana.
