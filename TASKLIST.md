# 📋 TASKLIST COMPLETA - Lake Como in Car

**Data creazione:** 20 Gennaio 2026  
**Riferimenti:** ROADMAP.md + Riferimento sito vecchio.md

---

## 🎯 PRIORITÀ ASSOLUTA - DA FARE SUBITO

### ✅ TASK GRUPPO A - Dati Aziendali Corretti (COMPLETATO ✅)
**Deadline:** Oggi/Domani | **Tempo stimato:** 1 ora

- [x] **A1.** Aggiornare telefoni in tutto il sito
  - File: `app/contatti/page.tsx` ✅
  - File: `components/layout/Footer.tsx` ✅
  - Telefono Principale: `+39 338 405 6027` ✅

- [x] **A2.** Aggiornare email in tutto il sito
  - File: `app/contatti/page.tsx` ✅
  - File: `components/layout/Footer.tsx` ✅
  - Email: `lakecomoincar@gmail.com` ✅

- [x] **A3.** Aggiungere P.IVA e Ragione Sociale nel footer
  - File: `components/layout/Footer.tsx` ✅
  - Ragione Sociale: AUTOSERVIZI PASQUILLO SRL ✅
  - P.IVA: 04193150135 ✅

- [x] **A4.** Aggiungere Powered By nel footer
  - Link: https://jaderdaniotti.netlify.app/ ✅
  - Credits: Jader Daniotti ✅

- [x] **A5.** Verificare indirizzi sedi
  - Corte Re: Località Corte del Rè, 264, 22041 Corte Re CO ✅
  - Como: Via Francesco Benzi, 14, 22100 Como CO ✅

**Output:** ✅ Dati aziendali corretti e completi in tutto il sito - COMPLETATO!

---

### ✅ TASK GRUPPO B - WhatsApp Integration (COMPLETATO ✅)
**Deadline:** Questa settimana | **Tempo stimato:** 2-3 ore

- [x] **B1.** Creare componente WhatsApp Floating Button
  - File: `components/ui/WhatsAppButton.tsx` ✅
  - Posizione: Fixed bottom-right ✅
  - Icona verde WhatsApp (#25D366) ✅
  - Responsive (mobile e desktop) ✅
  - Animazione pulse ✅
  - Tooltip hover ✅

- [x] **B2.** Implementare link WhatsApp con messaggi multilingua
  - Link WhatsApp: `https://wa.me/393384056027` ✅
  - Messaggi precompilati in 4 lingue (IT/EN/FR/ES) ✅
  - Rilevamento automatico lingua da URL ✅
  - Encoding corretto messaggio ✅

- [x] **B3.** Integrare in layout principale
  - File: `app/layout.tsx` ✅
  - Renderizzato su tutte le pagine ✅
  - Z-index corretto (z-50) ✅
  - Non interferisce con altri elementi ✅

- [x] **B4.** Features aggiuntive implementate
  - Pulsante chiudi (opzionale) ✅
  - Effetto hover scale ✅
  - Shadow e border per visibilità ✅
  - Accessibilità (aria-label) ✅

**Output:** ✅ Pulsante WhatsApp floating completamente funzionante con supporto multilingua!

---

### ✅ TASK GRUPPO C - Legal/Privacy (COMPLETATO ✅)
**Deadline:** Prima del deploy | **Tempo stimato:** 3-4 ore

- [x] **C1.** Privacy Policy aggiornata
  - File: `app/privacy/page.tsx` ✅
  - Contenuto completo GDPR conforme ✅
  - Dati aziendali corretti (P.IVA, contatti) ✅
  - Diritti utente GDPR completi ✅

- [x] **C2.** Creare pagina Cookie Policy
  - File: `app/cookie/page.tsx` ✅
  - 4 tipologie cookie dettagliate (Necessari, Funzionali, Analitici, Marketing) ✅
  - Gestione e disattivazione cookie ✅
  - Link a servizi terze parti (Google Maps, Stripe, WhatsApp) ✅
  - Collegamenti utili (Garante Privacy, opt-out) ✅

- [x] **C3.** Implementare Cookie Consent Banner
  - Componente: `components/ui/CookieConsent.tsx` ✅
  - Banner professionale con overlay ✅
  - Pulsanti: Accetta Tutti, Solo Necessari, Personalizza ✅
  - Pannello preferenze dettagliato con toggle ✅
  - 4 Categorie: Necessari (sempre attivi), Funzionali, Analitici, Marketing ✅
  - Salvataggio preferenze in localStorage ✅
  - Mostra al primo accesso (delay 1s) ✅
  - Design coerente con brand (black/white) ✅

- [x] **C4.** Aggiungere disclaimer GDPR ai form
  - Componente riutilizzabile: `components/ui/GDPRDisclaimer.tsx` ✅
  - Integrato in `app/prenota/page.tsx` ✅
  - Integrato in `app/preventivo/page.tsx` ✅
  - Checkbox obbligatoria (required) ✅
  - Button disabilitato senza consenso ✅
  - Link a Privacy Policy e Cookie Policy ✅
  - Testo conforme GDPR completo ✅

- [x] **C5.** Link Privacy/Cookie nel footer
  - File: `components/layout/Footer.tsx` ✅
  - Link a `/privacy` ✅
  - Link a `/cookie` ✅
  - Stile coerente con design ✅

**Output:** ✅ Compliance GDPR completa al 100%! Sito conforme alla normativa europea sulla privacy.

---

## 🎨 PRIORITÀ ALTA - CONTENUTI E SERVIZI

### ✅ TASK GRUPPO D - Miglioramenti Contenuti (COMPLETATO ✅)
**Deadline:** Questa settimana | **Tempo stimato:** 2-3 ore

- [x] **D1.** Aggiornare Homepage con contenuti sito vecchio
  - File: `app/page.tsx` ✅
  - Tagline aggiunta: "Vivi la magia del Lago di Como: tour panoramici e momenti indimenticabili ti aspettano!" ✅
  - Hero migliorato con "Autoservizi Pasquillo" ✅
  - Enfatizzato servizio 24/7 ✅
  - Sezione "Chi Siamo" con descrizione aziendale completa ✅
  - Statistiche visuali (24/7, 15+ anni, 100%, 2 sedi) ✅

- [x] **D2.** Migliorare sezione Punti di Forza
  - Espansa da 3 a 4 punti ✅
  - "Servizio 24/7" - Disponibilità continua ✅
  - "Autisti Esperti" - Professionisti del settore ✅
  - "Veicoli Moderni" - Flotta confortevole ✅
  - "Massima Sicurezza" - Comfort e personalizzazione ✅
  - Layout responsive migliorato ✅

- [x] **D3.** Aggiornare Meta Description e SEO
  - File: `app/layout.tsx` ✅
  - File: `app/page.tsx` (metadata specifici) ✅
  - Keywords principali: NCC Como, Transfer Como, Taxi privato Cernobbio ✅
  - Keywords secondarie: Transfer Malpensa, Linate, Tour Lago ✅
  - Open Graph tags completi ✅
  - Twitter Cards ✅
  - Canonical URLs e hreflang ✅
  - SEO ottimizzato per Google ✅

- [x] **D4.** Migliorare Call-to-Action
  - Hero: "Prenota Subito" invece di "Prenota Ora" ✅
  - Aggiunto "Disponibile 24/7" nell'hero ✅
  - Sezione CTA finale con 3 opzioni ✅
  - "Chiama Ora" con link diretto tel: ✅
  - "Non perdere tempo, prenota subito!" ✅
  - Telefono visibile: +39 338 405 6027 ✅

- [x] **D5.** Sezione "La Nostra Flotta" (BONUS)
  - Placeholder per 3 veicoli ✅
  - Mercedes Classe E ✅
  - BMW Serie 5 ✅
  - Mercedes Viano/Vito ✅
  - Caratteristiche dettagliate per ogni veicolo ✅
  - Design coerente con brand (black/white) ✅
  - Pronto per inserimento immagini reali ✅

**Output:** ✅ Homepage completamente rinnovata, SEO-optimized e content-rich!

---

### ✅ TASK GRUPPO E - Nuovi Servizi da Aggiungere (COMPLETATO ✅)
**Deadline:** Prossima settimana | **Tempo stimato:** 4-6 ore

- [x] **E1.** Creare pagina Shopping Tour
  - File: `app/tour/shopping/page.tsx` ✅
  - Descrizione servizio completa ✅
  - Destinazioni (Quadrilatero Milano, Serravalle, FoxTown) ✅
  - Form prenotazione dedicato con GDPR ✅
  - Placeholder immagini implementati ✅

- [x] **E2.** Creare pagina Tour Bernina Express
  - File: `app/tour/bernina-express/page.tsx` ✅
  - Descrizione tour panoramico dettagliata ✅
  - Itinerario completo con orari ✅
  - Durata e info pratiche ✅
  - Form prenotazione ✅

- [x] **E3.** Creare pagina Tour St. Moritz
  - File: `app/tour/st-moritz/page.tsx` ✅
  - Descrizione tour Svizzera ✅
  - Attrazioni principali (lago, shopping, Muottas Muragl) ✅
  - Informazioni pratiche (documenti, valuta, stagionalità) ✅
  - Form prenotazione ✅

- [x] **E4.** Creare pagina Visite Guidate Lago di Como
  - File: `app/tour/lago-como/page.tsx` ✅
  - Tour completo del lago ✅
  - Località: Bellagio, Varenna, Menaggio, Como, Cernobbio, Lenno ✅
  - Opzioni tour (mezza giornata, giornata intera) ✅
  - Ville storiche dettagliate ✅
  - Form prenotazione ✅

- [x] **E5.** Creare pagina Servizi Corporate/Aziendali
  - File: `app/servizi/corporate/page.tsx` ✅
  - Trasporti business e executive ✅
  - Eventi aziendali, fiere, roadshow ✅
  - Servizi su misura con convenzioni ✅
  - Vantaggi corporate (fatturazione, referente, tariffe) ✅
  - Form richiesta proposta ✅

- [x] **E6.** Menu navigazione già presente
  - File: `components/layout/Navbar.tsx` ✅
  - Dropdown "Tour" già implementato ✅
  - Sotto-menu: Shopping, Bernina, St. Moritz, Lago di Como ✅

**Output:** ✅ 5 nuove pagine servizi/tour complete con placeholder immagini, form GDPR-compliant e contenuti dettagliati!

---

### ✅ TASK GRUPPO F - Sezione "I Nostri Veicoli" (COMPLETATO ✅)
**Deadline:** Prossima settimana | **Tempo stimato:** 3-4 ore

- [x] **F1.** Creare pagina I Nostri Veicoli
  - File: `app/veicoli/page.tsx` ✅
  - Sezione dedicata ai veicoli completa ✅
  - Layout a griglia con alternanza bianco/nero ✅
  - Metadata SEO ottimizzato ✅

- [x] **F2.** Aggiungere galleria veicoli
  - Componente: `components/sections/VehicleGallery.tsx` ✅
  - Card per ogni veicolo con dettagli ✅
  - Placeholder foto pronte ✅
  - Caratteristiche e capacità passeggeri/bagagli ✅

- [x] **F3.** Preparare contenuti veicoli
  - Mercedes Classe E (Berlina Premium) ✅
  - BMW Serie 5 (Berlina Executive) ✅
  - Mercedes Viano/Vito (Van Premium 5-8 pax) ✅
  - Descrizioni complete per ogni veicolo ✅
  - Sezione "Ideale per" per ogni modello ✅

- [x] **F4.** Integrare in homepage
  - Sezione preview "I nostri mezzi" già presente ✅
  - Aggiunto link "Scopri Tutti i Veicoli" ✅
  - Button primary per chiamare all'azione ✅

- [x] **F5.** Aggiungere link navbar
  - Voce "Veicoli" aggiunta al menu principale ✅

**Output:** ✅ Sezione veicoli completa con pagina dedicata, galleria, statistiche e integrazione homepage/navbar!

---

## 📱 PRIORITÀ ALTA - FORM E FUNZIONALITÀ

### 📋 TASK GRUPPO G - Miglioramenti Form
**Deadline:** Prossima settimana | **Tempo stimato:** 2-3 ore

- [ ] **G1.** Aggiungere campo Data ai form
  - File: `app/prenota/page.tsx`
  - File: `app/preventivo/page.tsx`
  - Input type="date"
  - Validazione: solo date future
  - Required field

- [ ] **G2.** Aggiungere campo Orario ai form
  - Input type="time"
  - Validazione formato HH:MM
  - Required field

- [ ] **G3.** Migliorare validazione form
  - Email: regex validazione formato
  - Telefono: validazione prefisso internazionale (+39, +41, etc.)
  - Date: non permettere date passate
  - Campi required evidenziati

- [ ] **G4.** Aggiungere checkbox Privacy
  - Checkbox obbligatoria
  - Link a Privacy Policy
  - Messaggio GDPR (vedi Task C4)

- [ ] **G5.** Migliorare messaggi conferma/errore
  - Successo: messaggio chiaro e rassicurante
  - Errore: messaggi specifici per tipo di errore
  - Loading state: spinner durante invio

**Output:** Form più completi e user-friendly

---

## 🔧 PRIORITÀ MEDIA - SETUP TECNICO

### 🗄️ TASK GRUPPO H - Database Setup (Settimana 2)
**Tempo stimato:** 2-3 giorni

- [ ] **H1.** Creare progetto Supabase
  - Account Supabase
  - Nuovo progetto "lakecomoincar"
  - Annotare URL e API Keys

- [ ] **H2.** Eseguire schema.sql
  - File: `supabase/schema.sql`
  - SQL Editor di Supabase
  - Verificare creazione tabelle

- [ ] **H3.** Verificare tabelle create
  - bookings
  - quotes
  - vehicles
  - routes
  - notification_logs
  - admins

- [ ] **H4.** Inserire dati seed
  - Veicoli base (da definire con cliente)
  - Route standard (da listino cliente)
  - Admin user iniziale

- [ ] **H5.** Configurare .env.local
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

- [ ] **H6.** Creare client Supabase
  - File: `src/lib/supabase.ts`
  - File: `src/lib/supabase-admin.ts`
  - Testare connessione

**Output:** Database Supabase configurato e funzionante

---

### 📦 TASK GRUPPO I - Installazione Dipendenze (Settimana 2)
**Tempo stimato:** 1 ora

- [ ] **I1.** Installare dipendenze core
  ```bash
  npm install @supabase/supabase-js
  npm install next-intl
  npm install zod
  ```

- [ ] **I2.** Installare dipendenze email
  ```bash
  npm install resend
  # o alternativamente
  npm install nodemailer
  ```

- [ ] **I3.** Installare dipendenze auth
  ```bash
  npm install next-auth
  npm install bcryptjs
  npm install @types/bcryptjs --save-dev
  ```

- [ ] **I4.** Installare dipendenze UI (opzionali)
  ```bash
  npm install react-hot-toast  # per notifiche
  npm install date-fns  # per gestione date
  ```

- [ ] **I5.** Verificare package.json aggiornato
  - Controllare tutte le versioni
  - Eseguire `npm install`
  - Testare build: `npm run build`

**Output:** Tutte le dipendenze installate

---

### 🌍 TASK GRUPPO J - Sistema Multilingua (Settimana 2-3)
**Tempo stimato:** 4-5 giorni

- [ ] **J1.** Setup next-intl
  - Configurare middleware
  - Struttura URL: `/it/`, `/en/`, `/fr/`, `/es/`
  - File: `middleware.ts`

- [ ] **J2.** Creare cartelle messages
  - `messages/it.json`
  - `messages/en.json`
  - `messages/fr.json`
  - `messages/es.json`

- [ ] **J3.** Tradurre Homepage
  - Tutti i testi in 4 lingue
  - Hero, servizi, CTA, footer

- [ ] **J4.** Tradurre pagina Servizi
  - Tutti i servizi tradotti
  - Descrizioni complete

- [ ] **J5.** Tradurre pagina Contatti
  - Mantenere indirizzi in italiano
  - Tradurre testi introduttivi

- [ ] **J6.** Tradurre Form
  - Label campi
  - Placeholder
  - Messaggi validazione
  - Messaggi conferma/errore

- [ ] **J7.** Tradurre Navbar e Footer
  - Menu navigazione
  - Link footer
  - Copyright

- [ ] **J8.** Aggiungere Language Switcher
  - Componente: `components/ui/LanguageSwitcher.tsx`
  - Dropdown con bandiere
  - Posizione: navbar (desktop) e mobile menu

- [ ] **J9.** Testare navigazione multilingua
  - Verificare switch lingua
  - Verificare URL corretti
  - Testare tutte le pagine

**Output:** Sito completamente multilingua (IT/EN/FR/ES)

---

## 🔌 PRIORITÀ MEDIA - BACKEND E API

### 🛠️ TASK GRUPPO K - API Routes (Settimana 3)
**Tempo stimato:** 2-3 giorni

- [ ] **K1.** Creare API Bookings
  - File: `app/api/bookings/route.ts`
  - POST: creare prenotazione
  - Validazione input con Zod
  - Salvataggio in Supabase

- [ ] **K2.** Creare API Quotes
  - File: `app/api/quotes/route.ts`
  - POST: creare richiesta preventivo
  - Validazione input
  - Salvataggio in Supabase

- [ ] **K3.** Creare API Vehicles
  - File: `app/api/vehicles/route.ts`
  - GET: recuperare lista veicoli
  - Filtrare per disponibilità

- [ ] **K4.** Creare API Routes
  - File: `app/api/routes/route.ts`
  - GET: recuperare tratte disponibili
  - Filtrare per lingua

- [ ] **K5.** Implementare error handling
  - Try-catch in tutte le API
  - Messaggi errore standardizzati
  - Status code corretti (400, 500, etc.)

- [ ] **K6.** Creare funzioni helper database
  - File: `src/lib/db/bookings.ts`
  - createBooking, getBookings, updateBooking
  - File: `src/lib/db/quotes.ts`
  - createQuote, getQuotes, updateQuote

**Output:** API backend funzionanti

---

### 📧 TASK GRUPPO L - Sistema Email (Settimana 3-4)
**Tempo stimato:** 3-4 giorni

- [ ] **L1.** Setup account Resend
  - Creare account su resend.com
  - Ottenere API key
  - Configurare in .env: `RESEND_API_KEY`

- [ ] **L2.** Configurare dominio email (opzionale)
  - DNS records per dominio
  - Verificare dominio in Resend
  - Usare: noreply@lakecomoincar.com

- [ ] **L3.** Creare template email cliente (IT)
  - File: `src/lib/email/templates/booking-confirmation-it.tsx`
  - Conferma prenotazione
  - Dettagli: data, orario, tratta, veicolo
  - Link WhatsApp per contatto rapido

- [ ] **L4.** Creare template email cliente (EN/FR/ES)
  - Traduzioni complete template
  - Variabili dinamiche

- [ ] **L5.** Creare template email admin (IT)
  - File: `src/lib/email/templates/admin-notification-it.tsx`
  - Notifica nuova prenotazione/preventivo
  - Tutti i dettagli cliente
  - Link diretto a dashboard

- [ ] **L6.** Creare template preventivo (IT/EN/FR/ES)
  - Template invio preventivo
  - Prezzo, dettagli servizio
  - Link per conferma/pagamento

- [ ] **L7.** Implementare funzione invio email
  - File: `src/lib/email/send.ts`
  - sendBookingConfirmation()
  - sendQuoteRequest()
  - sendAdminNotification()
  - Gestione errori

- [ ] **L8.** Integrare con API
  - Inviare email dopo creazione booking
  - Inviare email dopo richiesta preventivo
  - Loggare in notification_logs

- [ ] **L9.** Testare invio email
  - Test in tutte le lingue
  - Verificare ricezione
  - Verificare formattazione

**Output:** Sistema email multilingua funzionante

---

## 👨‍💼 PRIORITÀ MEDIA - DASHBOARD ADMIN

### 🔐 TASK GRUPPO M - Autenticazione Admin (Settimana 4)
**Tempo stimato:** 2-3 giorni

- [ ] **M1.** Configurare NextAuth
  - File: `app/api/auth/[...nextauth]/route.ts`
  - Provider: Credentials
  - Session strategy: JWT

- [ ] **M2.** Creare pagina Login
  - File: `app/admin/login/page.tsx`
  - Form email + password
  - Styling elegante
  - Redirect dopo login

- [ ] **M3.** Creare middleware protezione
  - Proteggere tutte le route `/admin/*`
  - Redirect a `/admin/login` se non autenticato

- [ ] **M4.** Implementare logout
  - Pulsante logout in dashboard
  - Distruggere sessione

- [ ] **M5.** Creare script utente admin
  - Script per hash password
  - Inserire admin in tabella `admins`
  - Email e password iniziali

**Output:** Sistema autenticazione funzionante

---

### 📊 TASK GRUPPO N - Dashboard Layout (Settimana 4)
**Tempo stimato:** 1-2 giorni

- [ ] **N1.** Creare layout dashboard
  - File: `app/admin/layout.tsx`
  - Sidebar navigazione
  - Header con logout
  - Area contenuto principale

- [ ] **N2.** Creare dashboard home
  - File: `app/admin/page.tsx`
  - Statistiche overview
  - Contatori: prenotazioni totali, in attesa, confermate
  - Contatori: preventivi totali, da evadere
  - Grafici base (opzionale)

- [ ] **N3.** Styling dashboard
  - Design pulito e professionale
  - Responsive
  - Dark mode (opzionale)

**Output:** Layout dashboard completo

---

### 📅 TASK GRUPPO O - Gestione Prenotazioni (Settimana 4-5)
**Tempo stimato:** 3-4 giorni

- [ ] **O1.** Creare lista prenotazioni
  - File: `app/admin/bookings/page.tsx`
  - Tabella con colonne: ID, Nome, Email, Tratta, Data, Stato
  - Paginazione (20 per pagina)
  - Ordinamento per data

- [ ] **O2.** Implementare filtri
  - Filtro per stato (new, confirmed, completed, cancelled)
  - Filtro per data creazione (date range)
  - Filtro per data servizio
  - Ricerca per nome/email/telefono

- [ ] **O3.** Creare dettaglio prenotazione
  - File: `app/admin/bookings/[id]/page.tsx`
  - Mostrare tutti i dettagli
  - Dati cliente completi
  - Log notifiche inviate

- [ ] **O4.** Implementare cambio stato
  - Dropdown per cambiare stato
  - Conferma prima di cambiare
  - Aggiornamento immediato

- [ ] **O5.** Implementare note interne
  - Campo textarea per note admin
  - Salvataggio in database
  - Storico note

**Output:** Gestione prenotazioni completa

---

### 💰 TASK GRUPPO P - Gestione Preventivi (Settimana 5)
**Tempo stimato:** 3-4 giorni

- [ ] **P1.** Creare lista preventivi
  - File: `app/admin/quotes/page.tsx`
  - Tabella simile a bookings
  - Colonne: ID, Nome, Email, Origine, Destinazione, Stato

- [ ] **P2.** Implementare filtri preventivi
  - Filtro per stato
  - Date range
  - Ricerca

- [ ] **P3.** Creare dettaglio preventivo
  - File: `app/admin/quotes/[id]/page.tsx`
  - Dettagli richiesta
  - Dati cliente

- [ ] **P4.** Form inserimento prezzo
  - Campo per inserire importo preventivo
  - Campo valuta (EUR)
  - Campo note/dettagli preventivo

- [ ] **P5.** Implementare invio preventivo
  - Pulsante "Invia Preventivo"
  - Invia email con prezzo
  - Cambia stato: new → quote_sent
  - Log in notification_logs

- [ ] **P6.** Gestione conferma preventivo
  - Pulsante "Segna come Confermato"
  - Stato: quote_sent → confirmed
  - Opzionale: converti in prenotazione

**Output:** Gestione preventivi completa

---

## 🚀 PRIORITÀ BASSA - OTTIMIZZAZIONI

### 🔍 TASK GRUPPO Q - SEO Avanzato (Settimana 5-6)
**Tempo stimato:** 2-3 giorni

- [ ] **Q1.** Ottimizzare meta tag per ogni lingua
  - generateMetadata in ogni page.tsx
  - Title e description unici per lingua
  - Keywords localizzate

- [ ] **Q2.** Implementare Open Graph tags
  - og:title, og:description, og:image
  - Per tutte le pagine principali

- [ ] **Q3.** Implementare Twitter Cards
  - twitter:card, twitter:title, twitter:description

- [ ] **Q4.** Configurare Canonical URLs
  - URL canonici per evitare duplicati
  - Hreflang tags per multilingua

- [ ] **Q5.** Generare sitemap dinamica
  - File: `app/sitemap.ts`
  - Includere tutte le lingue
  - Includere tutte le pagine

- [ ] **Q6.** Configurare robots.txt
  - File: `app/robots.ts`
  - Allow/Disallow appropriati

- [ ] **Q7.** Implementare Schema.org markup
  - LocalBusiness schema
  - Service schema
  - Review schema (futuro)

- [ ] **Q8.** Creare landing pages SEO
  - `/servizi/ncc-como`
  - `/servizi/taxi-como`
  - `/servizi/taxi-cernobbio`
  - Ottimizzate per keyword specifiche

**Output:** SEO ottimizzato per motori di ricerca

---

### ⚡ TASK GRUPPO R - Performance (Settimana 6)
**Tempo stimato:** 1-2 giorni

- [ ] **R1.** Ottimizzare immagini
  - Usare Next.js Image component
  - Formato WebP
  - Lazy loading
  - Dimensioni appropriate

- [ ] **R2.** Ottimizzare bundle JavaScript
  - Dynamic imports per componenti pesanti
  - Code splitting
  - Tree shaking

- [ ] **R3.** Implementare lazy loading
  - Componenti non critici
  - Immagini below the fold

- [ ] **R4.** Test Lighthouse
  - Performance score > 90
  - Accessibility score > 90
  - Best Practices score > 90
  - SEO score > 90

- [ ] **R5.** Ottimizzare Core Web Vitals
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

**Output:** Performance ottimali

---

## 🧪 PRIORITÀ ALTA - TESTING

### ✅ TASK GRUPPO S - Testing Completo (Settimana 6)
**Tempo stimato:** 2-3 giorni

- [ ] **S1.** Test funzionali prenotazione
  - Inserire prenotazione in IT
  - Inserire prenotazione in EN/FR/ES
  - Verificare salvataggio DB
  - Verificare ricezione email

- [ ] **S2.** Test funzionali preventivo
  - Inserire preventivo in tutte le lingue
  - Verificare salvataggio DB
  - Verificare email ricevute

- [ ] **S3.** Test WhatsApp
  - Cliccare pulsante WhatsApp
  - Verificare apertura app
  - Verificare messaggio precompilato
  - Test per entrambe le sedi

- [ ] **S4.** Test login/logout admin
  - Login con credenziali corrette
  - Login con credenziali errate
  - Logout
  - Protezione route

- [ ] **S5.** Test dashboard
  - Visualizzare lista prenotazioni
  - Applicare filtri
  - Cambiare stato prenotazione
  - Aggiungere note
  - Inviare preventivo

- [ ] **S6.** Test responsive
  - Mobile (320px, 375px, 414px)
  - Tablet (768px, 1024px)
  - Desktop (1280px, 1920px)
  - Verificare layout corretto

- [ ] **S7.** Test accessibilità
  - Navigazione da tastiera
  - Screen reader
  - Contrasto colori
  - Alt text immagini

- [ ] **S8.** Test multilingua
  - Switch tra lingue
  - Verificare traduzioni complete
  - Verificare form in tutte le lingue
  - Verificare email tradotte

- [ ] **S9.** Test cross-browser
  - Chrome
  - Firefox
  - Safari
  - Edge
  - Mobile Safari
  - Mobile Chrome

**Output:** Tutti i test passati, bug risolti

---

## 🚢 PRIORITÀ ALTA - DEPLOY

### 🌐 TASK GRUPPO T - Deploy Produzione (Settimana 6-7)
**Tempo stimato:** 1-2 giorni

- [ ] **T1.** Setup Vercel
  - Creare account Vercel
  - Collegare repository GitHub
  - Configurare progetto

- [ ] **T2.** Configurare variabili ambiente produzione
  - Tutte le variabili .env
  - Supabase produzione
  - Resend API key
  - NextAuth secret

- [ ] **T3.** Testare build produzione
  - `npm run build` localmente
  - Verificare zero errori
  - Verificare bundle size

- [ ] **T4.** Configurare dominio
  - Dominio: lakecomoincar.com (o nuovo)
  - DNS settings
  - Collegare a Vercel

- [ ] **T5.** Setup SSL/HTTPS
  - Certificato automatico Vercel
  - Redirect HTTP → HTTPS

- [ ] **T6.** Deploy e test finale
  - Deploy su Vercel
  - Testare tutte le funzionalità in produzione
  - Verificare email inviate
  - Verificare database

- [ ] **T7.** Monitoraggio
  - Setup Vercel Analytics
  - Setup Sentry (error tracking)
  - Monitorare log

**Output:** Sito in produzione funzionante

---

## 📚 DOCUMENTAZIONE

### 📖 TASK GRUPPO U - Documentazione (Settimana 7)
**Tempo stimato:** 1 giorno

- [ ] **U1.** Creare guida uso dashboard
  - Documento PDF o pagina web
  - Come accedere
  - Come gestire prenotazioni
  - Come gestire preventivi
  - Come inviare preventivi

- [ ] **U2.** Documentazione tecnica
  - README.md completo
  - Struttura progetto
  - Comandi principali
  - Variabili ambiente

- [ ] **U3.** Creare FAQ cliente
  - Domande frequenti
  - Problemi comuni
  - Soluzioni

**Output:** Documentazione completa per cliente

---

## 🎯 MATERIALI DA RICHIEDERE AL CLIENTE

### 📦 GRUPPO V - Materiali Necessari
**Da richiedere SUBITO:**

- [ ] **V1.** Listino corse standard
  - Tratte predefinite con prezzi
  - Aeroporti (Malpensa, Linate, Orio, etc.)
  - Città principali (Milano, Como, St. Moritz)

- [ ] **V2.** Foto veicoli di alta qualità
  - Almeno 3-4 foto per veicolo
  - Esterni e interni
  - Formato JPG/PNG ad alta risoluzione

- [ ] **V3.** Logo aziendale
  - Formato vettoriale (SVG, AI) o PNG alta risoluzione
  - Versioni: colore, bianco, nero

- [ ] **V4.** Contenuti aggiuntivi (se disponibili)
  - Foto autisti (opzionale)
  - Foto location Como/Lago
  - Testimonianze clienti (opzionale)

- [ ] **V5.** Regole acconto pagamenti (per Release 2)
  - Percentuale acconto (es. 30%)
  - O importo fisso

- [ ] **V6.** Credenziali
  - Accesso dominio (se già esistente)
  - Accesso hosting (se già esistente)
  - Email aziendali configurate

**Output:** Tutti i materiali raccolti

---

## 📊 RIEPILOGO PRIORITÀ

### 🔥 URGENTE (Questa settimana):
1. ✅ **Gruppo A** - Dati aziendali corretti - COMPLETATO!
2. ✅ **Gruppo B** - WhatsApp button - COMPLETATO!
3. ✅ **Gruppo C** - Privacy/Cookie Policy - COMPLETATO!
4. ✅ **Gruppo D** - Contenuti migliorati - COMPLETATO!

### 🚀 ALTA (Settimana 2-3):
5. **Gruppo E** - Nuovi servizi 🚗
6. **Gruppo F** - Sezione mezzi 🚙
7. **Gruppo G** - Miglioramenti form 📋
8. **Gruppo H** - Database setup 🗄️
9. **Gruppo I** - Installazione dipendenze 📦
10. **Gruppo J** - Multilingua 🌍

### 📈 MEDIA (Settimana 3-5):
11. **Gruppo K** - API Routes 🛠️
12. **Gruppo L** - Sistema email 📧
13. **Gruppo M** - Autenticazione admin 🔐
14. **Gruppo N** - Dashboard layout 📊
15. **Gruppo O** - Gestione prenotazioni 📅
16. **Gruppo P** - Gestione preventivi 💰

### 🎨 BASSA (Settimana 5-7):
17. **Gruppo Q** - SEO avanzato 🔍
18. **Gruppo R** - Performance ⚡

### ✅ FINALE (Settimana 6-7):
19. **Gruppo S** - Testing completo 🧪
20. **Gruppo T** - Deploy produzione 🚢
21. **Gruppo U** - Documentazione 📖

### 📦 PARALLELO (Continuo):
22. **Gruppo V** - Raccolta materiali dal cliente

---

## 📅 TIMELINE RIASSUNTIVA

| Settimana | Focus Principale | Gruppi Task |
|-----------|------------------|-------------|
| **1** | Correzioni urgenti + WhatsApp + Privacy | A, B, C, D |
| **2** | Nuovi servizi + Setup tecnico | E, F, G, H, I |
| **3** | Multilingua + Backend API | J, K, L (inizio) |
| **4** | Email + Dashboard Admin | L (fine), M, N, O (inizio) |
| **5** | Dashboard completa + Preventivi | O (fine), P |
| **6** | SEO + Performance + Testing | Q, R, S |
| **7** | Deploy + Documentazione | T, U |

**TOTALE TEMPO STIMATO:** 6-7 settimane per Release 1

---

## ✅ CRITERI DI COMPLETAMENTO

Il sito è considerato PRONTO PER IL LANCIO quando:

### Must-Have (Obbligatori):
- [x] Tutti i dati aziendali corretti (Gruppo A)
- [x] WhatsApp button funzionante (Gruppo B)
- [x] Privacy e Cookie Policy presenti (Gruppo C)
- [x] Form con tutti i campi richiesti (Gruppo G)
- [x] Database configurato e funzionante (Gruppo H)
- [x] API backend funzionanti (Gruppo K)
- [x] Sistema email multilingua (Gruppo L)
- [x] Dashboard admin completa (Gruppi M, N, O, P)
- [x] Multilingua IT/EN/FR/ES (Gruppo J)
- [x] Testing completato (Gruppo S)
- [x] Deploy in produzione (Gruppo T)

### Nice-to-Have (Consigliati ma non bloccanti):
- [ ] Nuovi servizi (Gruppo E)
- [ ] Sezione mezzi (Gruppo F)
- [ ] SEO avanzato (Gruppo Q)
- [ ] Performance ottimizzate (Gruppo R)

---

## 🎯 PROSSIMI 5 STEP IMMEDIATI

### ✅ COMPLETATI OGGI:

1. ✅ **TASK A1-A5:** Aggiornare tutti i dati aziendali (telefono, email, P.IVA, Powered By) - COMPLETATO!
2. ✅ **TASK B1-B4:** Creare WhatsApp floating button multilingua - COMPLETATO!
3. ✅ **TASK C1-C5:** Privacy/Cookie Policy + Banner + GDPR forms - COMPLETATO!
4. ✅ **TASK D1-D5:** Homepage rinnovata + SEO + Contenuti + Flotta - COMPLETATO!

### 🎉 4 GRUPPI COMPLETATI! PROSSIMI TASK:
5. ⏳ **TASK E1-E6:** Nuovi servizi (Shopping Tour, Bernina, St. Moritz, Lago Como, Corporate)
6. ⏳ **TASK F1-F4:** Sezione "I Nostri Mezzi" (galleria fotografica)
7. ⏳ **TASK V1-V6:** Richiedere al cliente: listino, foto veicoli, logo

---

**Buon lavoro! 💪🚀**

**Ultimo aggiornamento:** 20 Gennaio 2026
