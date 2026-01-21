# 📧 GUIDA COMPLETA: Setup Email con Nodemailer

## 📋 INDICE
1. [Configurazione Gmail](#1-configurazione-gmail)
2. [Configurazione Variabili d'Ambiente](#2-configurazione-variabili-dambiente)
3. [Implementazione Codice](#3-implementazione-codice)
4. [Testing](#4-testing)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. CONFIGURAZIONE GMAIL

### Step 1.1: Attivare la Verifica in Due Passaggi

1. **Vai su Google Account:**
   - Apri [myaccount.google.com](https://myaccount.google.com)
   - Accedi con **lakecomoincar@gmail.com**

2. **Sicurezza:**
   - Nel menu laterale sinistro, clicca su **"Sicurezza"**
   - Scorri fino a trovare **"Accesso a Google"**
   - Clicca su **"Verifica in due passaggi"**

3. **Attiva la Verifica:**
   - Se non è già attiva, clicca su **"Inizia"**
   - Segui la procedura (inserisci password, numero di telefono, ricevi SMS)
   - Conferma l'attivazione

### Step 1.2: Creare una Password per l'App

1. **Torna alla pagina Sicurezza:**
   - [myaccount.google.com/security](https://myaccount.google.com/security)

2. **Cerca "Password per le app":**
   - Scorri fino a **"Accesso a Google"**
   - Clicca su **"Password per le app"** (appare solo se la verifica in 2 passaggi è attiva)

3. **Genera la Password:**
   - Seleziona **"Posta"** dal menu a tendina
   - Seleziona **"Altro (nome personalizzato)"**
   - Scrivi: **"LakeComoInCar Website"**
   - Clicca su **"Genera"**

4. **Copia la Password:**
   - Google ti mostrerà una password di 16 caratteri (es: `abcd efgh ijkl mnop`)
   - **COPIALA SUBITO** (la userai nel prossimo step)
   - ⚠️ **Non potrai più vederla dopo aver chiuso la finestra**

---

## 2. CONFIGURAZIONE VARIABILI D'AMBIENTE

### Step 2.1: Aggiornare .env.local

1. **Apri il file `.env.local`** nella root del progetto (se non esiste, crealo)

2. **Aggiungi queste variabili:**

```env
# Gmail Configuration (per Nodemailer)
GMAIL_USER=lakecomoincar@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Email di destinazione per notifiche admin
ADMIN_EMAIL=lakecomoincar@gmail.com

# Informazioni azienda (per email)
COMPANY_NAME=LakeComoInCar
COMPANY_PHONE=+39 338 405 6027
COMPANY_EMAIL=lakecomoincar@gmail.com
```

3. **Sostituisci `abcd efgh ijkl mnop`** con la password che hai copiato da Gmail

4. **Salva il file**

### Step 2.2: Aggiornare env.example

Per documentare le variabili necessarie, aggiorna anche `env.example`:

```env
# Gmail Configuration (per Nodemailer)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# Email di destinazione per notifiche admin
ADMIN_EMAIL=your-email@gmail.com

# Informazioni azienda
COMPANY_NAME=Your Company Name
COMPANY_PHONE=+39 xxx xxx xxxx
COMPANY_EMAIL=your-email@gmail.com
```

---

## 3. IMPLEMENTAZIONE CODICE

### Step 3.1: Creare il File Email Service

Il file `src/lib/email.ts` conterrà tutte le funzioni per inviare email.

**File già creato:** `src/lib/email.ts`

Questo file include:
- ✅ Configurazione transporter Nodemailer
- ✅ Template HTML professionali per email
- ✅ Funzione `sendQuoteNotification()` per preventivi
- ✅ Funzione `sendBookingNotification()` per prenotazioni
- ✅ Email sia per admin che per clienti

### Step 3.2: Creare API Route per Preventivi

**File:** `app/api/quotes/route.ts`

Questa API:
- ✅ Riceve i dati del form preventivo
- ✅ Li salva nel database Supabase (se configurato)
- ✅ Invia email di notifica a te
- ✅ Invia email di conferma al cliente

### Step 3.3: Creare API Route per Prenotazioni

**File:** `app/api/bookings/route.ts`

Questa API:
- ✅ Riceve i dati del form prenotazione
- ✅ Li salva nel database Supabase (se configurato)
- ✅ Invia email di notifica a te
- ✅ Invia email di conferma al cliente

### Step 3.4: Aggiornare il Form Preventivi

Il form in `app/preventivo/page.tsx` deve essere aggiornato per chiamare la nuova API.

### Step 3.5: Aggiornare il Form Prenotazioni

Il form in `app/prenota/page.tsx` deve essere aggiornato per chiamare la nuova API.

---

## 4. TESTING

### Step 4.1: Riavviare il Server

Dopo aver modificato `.env.local`, **DEVI riavviare** il server Next.js:

```bash
# Premi CTRL+C per fermare il server
# Poi riavvialo:
npm run dev
```

### Step 4.2: Test Preventivo

1. Apri il browser: [http://localhost:3000/preventivo](http://localhost:3000/preventivo)
2. Compila il form con dati di test:
   - Nome: `Test Cliente`
   - Email: `tua-email-personale@gmail.com` (usa una tua email per vedere la conferma)
   - Telefono: `1234567890`
   - Compila tutti gli altri campi
3. Clicca **"Invia Richiesta Preventivo"**
4. Controlla la console del browser (F12) per eventuali errori
5. **Controlla la tua Gmail** (lakecomoincar@gmail.com):
   - Dovresti ricevere un'email con i dettagli del preventivo
6. **Controlla anche l'email del cliente** (quella che hai inserito nel form):
   - Dovrebbe arrivare un'email di conferma

### Step 4.3: Test Prenotazione

1. Apri: [http://localhost:3000/prenota](http://localhost:3000/prenota)
2. Compila il form di prenotazione
3. Verifica che arrivino entrambe le email

### Step 4.4: Verifica Console

Nella console del terminale dove gira `npm run dev`, dovresti vedere:

```
✅ Email di notifica preventivo inviata
✅ Email di conferma cliente inviata
```

Se vedi errori, vai alla sezione [Troubleshooting](#5-troubleshooting).

---

## 5. TROUBLESHOOTING

### ❌ Errore: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Causa:** Password app Gmail errata o non configurata.

**Soluzione:**
1. Verifica che la verifica in 2 passaggi sia attiva
2. Rigenera una nuova password app Gmail
3. Copia la password **SENZA SPAZI**: `abcdefghijklmnop` (non `abcd efgh ijkl mnop`)
4. Aggiorna `.env.local`
5. Riavvia il server Next.js

---

### ❌ Errore: "Missing credentials for PLAIN"

**Causa:** Le variabili d'ambiente non sono state caricate.

**Soluzione:**
1. Verifica che `.env.local` esista nella **root del progetto**
2. Verifica che le variabili siano scritte correttamente (senza spazi extra)
3. **Riavvia completamente il server** (CTRL+C e poi `npm run dev`)

---

### ❌ Le email non arrivano (nessun errore)

**Causa:** Email finite nello SPAM o ritardi di Gmail.

**Soluzione:**
1. Controlla la cartella **SPAM** in Gmail
2. Aspetta 1-2 minuti (Gmail può avere ritardi)
3. Controlla i log nella console del terminale per confermare l'invio
4. Verifica che `ADMIN_EMAIL` in `.env.local` sia corretta

---

### ❌ Errore: "fetch failed" o "ECONNREFUSED"

**Causa:** Il server Next.js non è raggiungibile o la route API non esiste.

**Soluzione:**
1. Verifica che il server sia in esecuzione (`npm run dev`)
2. Controlla che i file API esistano:
   - `app/api/quotes/route.ts`
   - `app/api/bookings/route.ts`
3. Controlla la console del browser (F12) per vedere l'URL chiamato

---

### ❌ Errore 500 dalla API

**Causa:** Errore nel codice server-side.

**Soluzione:**
1. Controlla la **console del terminale** (dove gira `npm run dev`)
2. Leggi il messaggio di errore completo
3. Verifica che `src/lib/email.ts` non abbia errori di sintassi
4. Verifica che tutte le variabili d'ambiente siano definite

---

## 6. CHECKLIST FINALE

Prima di andare in produzione, verifica:

- [x] ✅ Password app Gmail creata e copiata
- [x] ✅ `.env.local` configurato con tutte le variabili
- [x] ✅ Server riavviato dopo modifiche a `.env.local`
- [x] ✅ Test preventivo: email ricevuta
- [x] ✅ Test prenotazione: email ricevuta
- [x] ✅ Email di conferma cliente ricevuta
- [x] ✅ Template email verificati (nomi, telefono, email aziendali corretti)
- [x] ✅ Nessun errore nella console del browser
- [x] ✅ Nessun errore nella console del terminale

---

## 7. PROSSIMI PASSI (Release 2)

Quando il database Supabase sarà configurato:

1. ✅ Le richieste verranno salvate nel database oltre che inviate via email
2. ✅ Potrai gestire preventivi e prenotazioni dalla dashboard admin
3. ✅ Avrai storico completo di tutte le richieste
4. ✅ Potrai inviare preventivi personalizzati direttamente dalla dashboard

Per ora, con questa configurazione:
- ✅ Ricevi email per ogni preventivo
- ✅ Ricevi email per ogni prenotazione
- ✅ I clienti ricevono conferma automatica
- ✅ Puoi rispondere direttamente alle email

---

## 📞 SUPPORTO

Se riscontri problemi non coperti da questa guida:

1. Controlla i log della console (browser e terminale)
2. Verifica che tutte le variabili d'ambiente siano configurate
3. Prova a rigenerare la password app Gmail
4. Assicurati che Gmail non blocchi l'accesso alle app meno sicure

---

**Ultimo aggiornamento:** 21 Gennaio 2026
**Versione:** 1.0
