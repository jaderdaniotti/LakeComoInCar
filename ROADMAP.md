# 🗺️ Roadmap Completa - Lake Como in Car

## 📋 Panoramica Progetto

**Obiettivo:** Sito web multilingua con sistema prenotazioni e preventivi completo

**Timeline Totale:** 6-8 settimane (Release 1 + Release 2)

**Stato Attuale:** 
- ✅ UI/Design base (80%)
- ✅ Form frontend prenotazione/preventivo (70%)
- ✅ Schema database progettato
- ⏳ Backend e integrazioni da implementare

---

## 🎯 RELEASE 1 - Go-Live Rapido (4-5 settimane)

### FASE 1: Setup e Infrastruttura Base (3-4 giorni)

#### Task 1.1: Setup Supabase
- [ ] Creare progetto Supabase
- [ ] Eseguire `schema.sql` nel SQL Editor
- [ ] Verificare creazione tabelle e viste
- [ ] Testare inserimento dati seed (vehicles, routes)
- [ ] Configurare variabili ambiente (`.env.local`)
- **Tempo:** 0.5 giorni

#### Task 1.2: Installazione Dipendenze
- [ ] Installare `@supabase/supabase-js`
- [ ] Installare `next-intl` o `next-i18next` (multilingua)
- [ ] Installare `resend` o `nodemailer` (email)
- [ ] Installare `bcryptjs` (hashing password admin)
- [ ] Installare `next-auth` o `@supabase/auth-helpers` (autenticazione)
- [ ] Aggiornare `package.json`
- **Tempo:** 0.5 giorni

#### Task 1.3: Configurazione Base
- [ ] Creare `src/lib/supabase.ts` (client Supabase)
- [ ] Creare `src/lib/supabase-admin.ts` (client admin)
- [ ] Configurare variabili ambiente
- [ ] Testare connessione database
- [ ] Setup struttura cartelle (`src/lib`, `src/types`, `app/api`)
- **Tempo:** 1 giorno

#### Task 1.4: Fix Schema Database
- [ ] Correggere `destination_es` in schema (già fatto)
- [ ] Verificare tutti i campi multilingua
- [ ] Testare inserimenti base
- **Tempo:** 0.5 giorni

**Totale Fase 1:** 2.5 giorni

---

### FASE 2: Sistema Multilingua (3-4 giorni)

#### Task 2.1: Setup i18n Routing
- [ ] Installare e configurare `next-intl`
- [ ] Creare struttura cartelle `messages/` (it, en, fr, es)
- [ ] Configurare middleware per routing multilingua
- [ ] Setup URL structure (`/it/`, `/en/`, `/fr/`, `/es/`)
- [ ] Testare navigazione tra lingue
- **Tempo:** 1.5 giorni

#### Task 2.2: Traduzione Contenuti Statici
- [ ] Tradurre homepage (IT → EN/FR/ES)
- [ ] Tradurre pagina servizi
- [ ] Tradurre pagina contatti
- [ ] Tradurre footer e navbar
- [ ] Tradurre messaggi di errore/successo
- [ ] Tradurre meta tag e SEO
- **Tempo:** 1.5 giorni

#### Task 2.3: Traduzione Form
- [ ] Tradurre form prenotazione (tutti i campi)
- [ ] Tradurre form preventivo
- [ ] Tradurre messaggi validazione
- [ ] Tradurre messaggi conferma invio
- [ ] Testare form in tutte le lingue
- **Tempo:** 1 giorno

**Totale Fase 2:** 4 giorni

---

### FASE 3: Backend API e Database Integration (4-5 giorni)

#### Task 3.1: API Routes Base
- [ ] Creare `app/api/bookings/route.ts` (POST)
- [ ] Creare `app/api/quotes/route.ts` (POST)
- [ ] Creare `app/api/vehicles/route.ts` (GET)
- [ ] Creare `app/api/routes/route.ts` (GET)
- [ ] Implementare validazione input
- [ ] Implementare gestione errori
- **Tempo:** 2 giorni

#### Task 3.2: Funzioni Database Helper
- [ ] Creare `src/lib/db/bookings.ts` (createBooking, getBookings, updateBooking)
- [ ] Creare `src/lib/db/quotes.ts` (createQuote, getQuotes, updateQuote)
- [ ] Creare `src/lib/db/notifications.ts` (logNotification, updateNotificationStatus)
- [ ] Creare `src/lib/db/stats.ts` (getDashboardStats)
- [ ] Testare tutte le funzioni
- **Tempo:** 1.5 giorni

#### Task 3.3: Integrazione Form → Database
- [ ] Collegare form prenotazione a API
- [ ] Collegare form preventivo a API
- [ ] Gestire loading states
- [ ] Gestire errori e successo
- [ ] Testare inserimenti end-to-end
- **Tempo:** 1 giorno

#### Task 3.4: Validazione e Sanitizzazione
- [ ] Validare email formato
- [ ] Validare telefono (prefisso internazionale)
- [ ] Validare date (non passate)
- [ ] Sanitizzare input utente
- [ ] Prevenire SQL injection (Supabase già protegge)
- **Tempo:** 0.5 giorni

**Totale Fase 3:** 5 giorni

---

### FASE 4: Sistema Email (2-3 giorni)

#### Task 4.1: Setup Provider Email
- [ ] Creare account Resend (o configurare SMTP)
- [ ] Configurare dominio email (opzionale)
- [ ] Testare invio email base
- [ ] Configurare variabili ambiente
- **Tempo:** 0.5 giorni

#### Task 4.2: Template Email Multilingua
- [ ] Creare template email conferma cliente (IT/EN/FR/ES)
- [ ] Creare template email notifica admin (IT/EN/FR/ES)
- [ ] Creare template email preventivo inviato (IT/EN/FR/ES)
- [ ] Usare variabili dinamiche (nome, tratta, data, ecc.)
- [ ] Testare rendering template
- **Tempo:** 1.5 giorni

#### Task 4.3: Integrazione Invio Email
- [ ] Creare `src/lib/email/send.ts`
- [ ] Implementare invio email cliente (dopo booking/quote)
- [ ] Implementare invio email admin (notifica)
- [ ] Loggare esito in `notification_logs`
- [ ] Gestire errori invio
- [ ] Testare invio in tutte le lingue
- **Tempo:** 1 giorno

**Totale Fase 4:** 3 giorni

---

### FASE 5: Sistema WhatsApp (1 giorno)

#### Task 5.1: Click-to-WhatsApp
- [ ] Creare funzione generazione link WhatsApp
- [ ] Formattare messaggio precompilato
- [ ] Implementare in API booking/quote
- [ ] Loggare generazione link in `notification_logs`
- [ ] Testare link generati
- **Tempo:** 1 giorno

**Nota:** WhatsApp Business API (Release 2)

**Totale Fase 5:** 1 giorno

---

### FASE 6: Dashboard Admin - Autenticazione (2-3 giorni)

#### Task 6.1: Setup Autenticazione
- [ ] Configurare NextAuth o Supabase Auth
- [ ] Creare pagina login (`app/admin/login/page.tsx`)
- [ ] Creare middleware protezione route admin
- [ ] Implementare logout
- [ ] Creare utente admin iniziale (script)
- [ ] Testare login/logout
- **Tempo:** 1.5 giorni

#### Task 6.2: Layout Dashboard
- [ ] Creare `app/admin/layout.tsx` (protezione route)
- [ ] Creare sidebar/navbar admin
- [ ] Creare dashboard home (`app/admin/page.tsx`)
- [ ] Mostrare statistiche base (conteggi)
- [ ] Styling dashboard
- **Tempo:** 1 giorno

**Totale Fase 6:** 2.5 giorni

---

### FASE 7: Dashboard Admin - Gestione Prenotazioni (3-4 giorni)

#### Task 7.1: Lista Prenotazioni
- [ ] Creare `app/admin/bookings/page.tsx`
- [ ] Implementare tabella lista prenotazioni
- [ ] Mostrare: nome, email, tratta, data, stato
- [ ] Implementare paginazione
- [ ] Styling tabella
- **Tempo:** 1.5 giorni

#### Task 7.2: Filtri e Ricerca
- [ ] Filtro per stato (new/in_progress/confirmed/completed/cancelled)
- [ ] Filtro per data creazione
- [ ] Filtro per data servizio
- [ ] Ricerca per nome/email/telefono
- [ ] Reset filtri
- **Tempo:** 1 giorno

#### Task 7.3: Dettaglio Prenotazione
- [ ] Creare `app/admin/bookings/[id]/page.tsx`
- [ ] Mostrare tutti i dettagli prenotazione
- [ ] Mostrare log notifiche
- [ ] Implementare cambio stato
- [ ] Implementare aggiunta note
- [ ] Styling dettaglio
- **Tempo:** 1.5 giorni

**Totale Fase 7:** 4 giorni

---

### FASE 8: Dashboard Admin - Gestione Preventivi (2-3 giorni)

#### Task 8.1: Lista Preventivi
- [ ] Creare `app/admin/quotes/page.tsx`
- [ ] Implementare tabella lista preventivi
- [ ] Mostrare: nome, email, origine, destinazione, stato
- [ ] Implementare paginazione
- [ ] Filtri simili a bookings
- **Tempo:** 1.5 giorni

#### Task 8.2: Dettaglio e Gestione Preventivo
- [ ] Creare `app/admin/quotes/[id]/page.tsx`
- [ ] Mostrare dettagli richiesta
- [ ] Form per inserire prezzo preventivo
- [ ] Form per note interne
- [ ] Implementare invio preventivo via email
- [ ] Cambio stato (new → quote_sent → confirmed)
- **Tempo:** 1.5 giorni

**Totale Fase 8:** 3 giorni

---

### FASE 9: SEO Multilingua (1-2 giorni)

#### Task 9.1: Meta Tag per Lingua
- [ ] Configurare `generateMetadata` in ogni pagina
- [ ] Meta title/description per IT/EN/FR/ES
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Canonical URLs
- **Tempo:** 1 giorno

#### Task 9.2: Sitemap e Robots.txt
- [ ] Generare sitemap dinamica multilingua
- [ ] Configurare `robots.txt`
- [ ] Hreflang tags per multilingua
- [ ] Testare indicizzazione
- **Tempo:** 0.5 giorni

#### Task 9.3: Performance e Core Web Vitals
- [ ] Ottimizzare immagini (Next.js Image)
- [ ] Lazy loading componenti
- [ ] Ottimizzare bundle size
- [ ] Testare Lighthouse score
- **Tempo:** 0.5 giorni

**Totale Fase 9:** 2 giorni

---

### FASE 10: Testing e Bug Fix (2-3 giorni)

#### Task 10.1: Test Funzionali
- [ ] Test inserimento prenotazione (tutte le lingue)
- [ ] Test inserimento preventivo (tutte le lingue)
- [ ] Test invio email (tutte le lingue)
- [ ] Test generazione link WhatsApp
- [ ] Test login/logout admin
- [ ] Test filtri dashboard
- [ ] Test cambio stato prenotazioni/preventivi
- **Tempo:** 1.5 giorni

#### Task 10.2: Test UI/UX
- [ ] Test responsive (mobile/tablet/desktop)
- [ ] Test accessibilità base
- [ ] Test form validazione
- [ ] Test messaggi errore/successo
- [ ] Test navigazione multilingua
- **Tempo:** 1 giorno

#### Task 10.3: Bug Fix e Ottimizzazioni
- [ ] Correggere bug trovati
- [ ] Ottimizzare query database
- [ ] Migliorare error handling
- [ ] Aggiungere loading states mancanti
- **Tempo:** 0.5 giorni

**Totale Fase 10:** 3 giorni

---

### FASE 11: Deploy e Go-Live (1-2 giorni)

#### Task 11.1: Preparazione Deploy
- [ ] Setup Vercel (o hosting scelto)
- [ ] Configurare variabili ambiente produzione
- [ ] Testare build produzione
- [ ] Configurare dominio
- [ ] Setup SSL/HTTPS
- **Tempo:** 1 giorno

#### Task 11.2: Migrazione Dati e Test Finale
- [ ] Verificare connessione Supabase produzione
- [ ] Testare inserimenti in produzione
- [ ] Testare email in produzione
- [ ] Testare dashboard admin
- [ ] Testare tutte le funzionalità
- **Tempo:** 0.5 giorni

#### Task 11.3: Documentazione Utente
- [ ] Creare guida uso dashboard (per cliente)
- [ ] Documentare funzionalità
- [ ] Creare FAQ
- **Tempo:** 0.5 giorni

**Totale Fase 11:** 2 giorni

---

## 📊 Riepilogo Release 1

| Fase | Descrizione | Tempo |
|------|-------------|-------|
| 1 | Setup e Infrastruttura | 2.5 giorni |
| 2 | Sistema Multilingua | 4 giorni |
| 3 | Backend API e Database | 5 giorni |
| 4 | Sistema Email | 3 giorni |
| 5 | Sistema WhatsApp | 1 giorno |
| 6 | Dashboard - Autenticazione | 2.5 giorni |
| 7 | Dashboard - Prenotazioni | 4 giorni |
| 8 | Dashboard - Preventivi | 3 giorni |
| 9 | SEO Multilingua | 2 giorni |
| 10 | Testing e Bug Fix | 3 giorni |
| 11 | Deploy e Go-Live | 2 giorni |
| **TOTALE** | | **32 giorni** (~6.5 settimane) |

**Timeline Realistica:** 4-5 settimane (considerando imprevisti e iterazioni)

---

## 🚀 RELEASE 2 - Potenziamento (2-3 settimane)

### FASE 12: WhatsApp Business API (2-3 giorni)

#### Task 12.1: Setup Provider
- [ ] Scegliere provider (Twilio/360dialog/Meta)
- [ ] Creare account e configurare
- [ ] Ottenere credenziali API
- [ ] Testare connessione
- **Tempo:** 1 giorno

#### Task 12.2: Integrazione API
- [ ] Creare `src/lib/whatsapp/send.ts`
- [ ] Implementare invio automatico messaggi
- [ ] Gestire template messaggi multilingua
- [ ] Loggare esito in `notification_logs`
- [ ] Gestire errori e retry
- **Tempo:** 1.5 giorni

#### Task 12.3: Sostituzione Click-to-WA
- [ ] Sostituire click-to-wa con API automatica
- [ ] Testare invio automatico
- [ ] Aggiornare dashboard (mostrare esito API)
- **Tempo:** 0.5 giorni

**Totale Fase 12:** 3 giorni

---

### FASE 13: Sistema Pagamenti Stripe (3-4 giorni)

#### Task 13.1: Setup Stripe
- [ ] Creare account Stripe
- [ ] Configurare prodotti/prezzi
- [ ] Installare `stripe` e `@stripe/stripe-js`
- [ ] Configurare webhook
- [ ] Testare connessione
- **Tempo:** 1 giorno

#### Task 13.2: Integrazione Checkout
- [ ] Creare API route `/api/payments/create-intent`
- [ ] Implementare checkout session
- [ ] Gestire acconto (fisso o percentuale)
- [ ] Creare pagina successo/errore pagamento
- [ ] Testare pagamento test
- **Tempo:** 1.5 giorni

#### Task 13.3: Webhook e Aggiornamento DB
- [ ] Creare API route `/api/webhooks/stripe`
- [ ] Gestire eventi Stripe (payment success/failed)
- [ ] Aggiornare `payment_status` in bookings
- [ ] Loggare transazioni
- [ ] Testare webhook end-to-end
- **Tempo:** 1 giorno

#### Task 13.4: UI Pagamento
- [ ] Aggiungere pulsante "Paga Acconto" in email
- [ ] Creare pagina checkout
- [ ] Mostrare importo e dettagli
- [ ] Gestire stati pagamento
- **Tempo:** 0.5 giorni

**Totale Fase 13:** 4 giorni

---

### FASE 14: CRUD Tratte da Dashboard (2-3 giorni)

#### Task 14.1: Gestione Routes
- [ ] Creare `app/admin/routes/page.tsx` (lista)
- [ ] Creare form creazione/modifica tratta
- [ ] Implementare CRUD completo
- [ ] Validazione input
- [ ] Testare creazione/modifica/eliminazione
- **Tempo:** 2 giorni

#### Task 14.2: Gestione Veicoli
- [ ] Creare `app/admin/vehicles/page.tsx` (lista)
- [ ] Creare form creazione/modifica veicolo
- [ ] Upload immagini veicoli
- [ ] Implementare CRUD completo
- **Tempo:** 1 giorno

**Totale Fase 14:** 3 giorni

---

### FASE 15: Funzionalità Avanzate Dashboard (2-3 giorni)

#### Task 15.1: Export CSV
- [ ] Implementare export prenotazioni CSV
- [ ] Implementare export preventivi CSV
- [ ] Filtri applicati all'export
- [ ] Testare export
- **Tempo:** 1 giorno

#### Task 15.2: Analytics e Statistiche
- [ ] Grafico prenotazioni per mese
- [ ] Grafico revenue per mese
- [ ] Statistiche per stato
- [ ] Statistiche per lingua
- [ ] Dashboard analytics page
- **Tempo:** 1.5 giorni

#### Task 15.3: Miglioramenti UX
- [ ] Notifiche toast per azioni
- [ ] Conferme prima di azioni critiche
- [ ] Migliorare filtri (date range picker)
- [ ] Ricerca avanzata
- **Tempo:** 0.5 giorni

**Totale Fase 15:** 3 giorni

---

### FASE 16: SEO Avanzato e Landing (1-2 giorni)

#### Task 16.1: Schema Markup
- [ ] Implementare LocalBusiness schema
- [ ] Implementare Service schema
- [ ] Testare con Google Rich Results
- **Tempo:** 0.5 giorni

#### Task 16.2: Landing Pages SEO
- [ ] Creare landing "NCC Como"
- [ ] Creare landing "Taxi Como"
- [ ] Creare landing "Taxi Lake Como"
- [ ] Ottimizzare contenuti per keyword
- **Tempo:** 1 giorno

#### Task 16.3: Blog/Contenuti (Opzionale)
- [ ] Valutare se necessario
- [ ] Se sì, struttura base blog
- **Tempo:** 0.5 giorni (se necessario)

**Totale Fase 16:** 2 giorni

---

### FASE 17: Testing Release 2 e Deploy (1-2 giorni)

#### Task 17.1: Test Integrazioni
- [ ] Test WhatsApp API end-to-end
- [ ] Test pagamenti Stripe end-to-end
- [ ] Test CRUD routes/vehicles
- [ ] Test export CSV
- [ ] Test analytics
- **Tempo:** 1 giorno

#### Task 17.2: Deploy e Monitoraggio
- [ ] Deploy aggiornamenti
- [ ] Monitorare errori produzione
- [ ] Verificare performance
- **Tempo:** 0.5 giorni

**Totale Fase 17:** 1.5 giorni

---

## 📊 Rieplogo Release 2

| Fase | Descrizione | Tempo |
|------|-------------|-------|
| 12 | WhatsApp Business API | 3 giorni |
| 13 | Sistema Pagamenti Stripe | 4 giorni |
| 14 | CRUD Tratte/Veicoli | 3 giorni |
| 15 | Funzionalità Avanzate | 3 giorni |
| 16 | SEO Avanzato | 2 giorni |
| 17 | Testing e Deploy | 1.5 giorni |
| **TOTALE** | | **16.5 giorni** (~3 settimane) |

**Timeline Realistica:** 2.5-3 settimane

---

## 📈 Timeline Complessiva

### Release 1: 4-5 settimane
### Release 2: 2.5-3 settimane

**TOTALE PROGETTO: 6.5-8 settimane**

---

## 🎯 Milestone Chiave

### Milestone 1: Database e Backend (Settimana 1-2)
- ✅ Database configurato e funzionante
- ✅ API routes create
- ✅ Form collegati al database

### Milestone 2: Notifiche (Settimana 2-3)
- ✅ Email funzionanti (tutte le lingue)
- ✅ WhatsApp click-to-wa funzionante

### Milestone 3: Dashboard Base (Settimana 3-4)
- ✅ Autenticazione funzionante
- ✅ Lista e dettaglio prenotazioni/preventivi
- ✅ Filtri e ricerca

### Milestone 4: Go-Live Release 1 (Settimana 4-5)
- ✅ Sito deployato
- ✅ Tutte le funzionalità base testate
- ✅ Multilingua completo

### Milestone 5: Release 2 Completa (Settimana 6-8)
- ✅ Pagamenti online
- ✅ WhatsApp API
- ✅ CRUD admin
- ✅ Analytics

---

## 📝 Checklist Materiali Necessari dal Cliente

Prima di iniziare, assicurarsi di avere:

### Obbligatori per Release 1:
- [ ] Listino corse standard (tratte, prezzi)
- [ ] Email aziendale definitiva
- [ ] Numero WhatsApp definitivo
- [ ] Credenziali dominio/hosting
- [ ] Contenuti testuali (se diversi da bozza)

### Opzionali ma Consigliati:
- [ ] Foto veicoli (se non già presenti)
- [ ] Logo aziendale
- [ ] Regola acconto (fisso o percentuale)

### Per Release 2:
- [ ] Account Stripe (se pagamenti online)
- [ ] Account provider WhatsApp Business API
- [ ] Contenuti aggiuntivi per SEO

---

## 🔧 Dipendenze Tecniche

### Dipendenze da Installare:

```bash
# Core
npm install @supabase/supabase-js
npm install next-intl  # o next-i18next

# Email
npm install resend  # o nodemailer

# Auth
npm install next-auth  # o @supabase/auth-helpers-nextjs

# Utils
npm install bcryptjs
npm install zod  # validazione

# Release 2
npm install stripe @stripe/stripe-js
npm install recharts  # grafici dashboard
```

---

## 🚨 Rischi e Mitigazioni

### Rischio 1: Ritardi Materiali Cliente
**Mitigazione:** Iniziare con dati mock, integrare dati reali quando disponibili

### Rischio 2: Complessità Integrazioni
**Mitigazione:** Usare provider affidabili (Resend, Stripe), documentazione chiara

### Rischio 3: Performance Database
**Mitigazione:** Indici già ottimizzati, monitorare query lente

### Rischio 4: Test Multilingua
**Mitigazione:** Testare ogni funzionalità in tutte le lingue fin dall'inizio

---

## 📚 Risorse Utili

### Documentazione:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Resend Docs](https://resend.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### Tools:
- [Supabase Dashboard](https://app.supabase.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## ✅ Criteri di Accettazione Finale

Il progetto è considerato completato quando:

### Release 1:
- [x] Sito navigabile in IT/EN/FR/ES
- [x] Prenotazione salva in DB, invia email, genera link WhatsApp
- [x] Preventivo salva in DB, invia email, genera link WhatsApp
- [x] Dashboard accessibile solo ad admin
- [x] Dashboard mostra tutte le richieste con filtri
- [x] SEO base configurato

### Release 2:
- [x] WhatsApp API automatica funzionante
- [x] Pagamenti online Stripe funzionanti
- [x] CRUD tratte/veicoli da dashboard
- [x] Export CSV funzionante
- [x] Analytics dashboard
- [x] SEO avanzato implementato

---

## 🎉 Prossimi Passi Immediati

1. **Oggi:**
   - [ ] Creare progetto Supabase
   - [ ] Eseguire schema.sql
   - [ ] Installare dipendenze base

2. **Questa Settimana:**
   - [ ] Completare Fase 1-2 (Setup + Multilingua)
   - [ ] Iniziare Fase 3 (Backend API)

3. **Prossima Settimana:**
   - [ ] Completare Backend e Email
   - [ ] Iniziare Dashboard

---

**Buon lavoro! 🚀**
