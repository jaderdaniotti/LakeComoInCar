# ✅ CHECKLIST TEST EMAIL - LakeComoInCar

**Data:** 21 Gennaio 2026  
**Sistema:** Gmail + Nodemailer + Backend API

---

## 📋 VERIFICA CONFIGURAZIONE

### ✅ **Step 1: Variabili d'Ambiente**

Controlla che `.env.local` contenga:

```env
GMAIL_USER=lakecomoincar@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop  # <-- Password 16 caratteri da Gmail
ADMIN_EMAIL=lakecomoincar@gmail.com
COMPANY_NAME=LakeComoInCar
COMPANY_PHONE=+39 338 405 6027
COMPANY_EMAIL=lakecomoincar@gmail.com
```

**⚠️ IMPORTANTE:**
- La password NON è la password normale di Gmail
- È la "Password per le app" generata da Google Account > Sicurezza
- Deve essere 16 caratteri (con o senza spazi va bene)

---

### ✅ **Step 2: Server Riavviato**

Dopo aver modificato `.env.local`, **DEVI riavviare** il server:

```bash
# Ferma il server (CTRL+C)
# Riavvialo:
npm run dev
```

---

### ✅ **Step 3: Verifica Console**

Quando il server si avvia, dovresti vedere nella console:

```
✅ Server email pronto per inviare messaggi
```

Se vedi questo ✅ → La configurazione Gmail è corretta!

Se vedi ❌ → Controlla password o credenziali Gmail.

---

## 🧪 TEST 1: PREVENTIVO

### **Procedura:**

1. **Apri il form preventivo:**
   ```
   http://localhost:3000/preventivo
   ```

2. **Compila con dati reali:**
   - Nome: Il tuo nome
   - Email: **USA LA TUA EMAIL PERSONALE** (per ricevere la conferma)
   - Telefono: Un numero qualsiasi
   - Partenza: Como
   - Destinazione: Milano
   - Data: Una data futura
   - Passeggeri: 2
   - (altri campi opzionali)

3. **Seleziona GDPR** (checkbox in fondo)

4. **Click "Invia Richiesta Preventivo"**

---

### **Cosa aspettarsi:**

#### **A) Console Browser (F12):**
- Nessun errore rosso
- Richiesta POST a `/api/quotes` con status 200

#### **B) Console Server (terminale npm run dev):**
Dovresti vedere questi log:

```bash
✅ Email di notifica preventivo inviata a: lakecomoincar@gmail.com
✅ Email di conferma preventivo inviata a: tua-email@example.com
```

#### **C) Email Ricevute:**

**1. Email a `lakecomoincar@gmail.com` (admin):**
- **Oggetto:** 🔔 Nuova Richiesta Preventivo - LakeComoInCar
- **Contenuto:**
  - Nome cliente
  - Email cliente
  - Telefono cliente
  - Partenza → Destinazione
  - Data, ora, passeggeri
  - Note
  - Call to action: "Rispondi entro 24 ore"

**2. Email alla tua email personale (cliente):**
- **Oggetto:** ✅ Richiesta Preventivo Ricevuta - LakeComoInCar
- **Contenuto:**
  - Saluto personalizzato con il nome
  - Conferma ricezione
  - Riepilogo della richiesta
  - Tempi di risposta (24 ore)
  - Contatti per urgenze
  - Footer con P.IVA e dati aziendali

#### **D) Database Supabase:**
Vai su Supabase Dashboard → Tabella `quotes`:
- Dovresti vedere il nuovo preventivo salvato
- Status: `new`
- Tutti i dati del cliente presenti

#### **E) Dashboard Admin:**
Vai su `/admin/dashboard` → Tab "Preventivi":
- Il preventivo dovrebbe apparire nella lista
- Badge blu "Nuovo"
- Click per espandere e vedere tutti i dettagli

---

### **✅ Test SUPERATO se:**
- ✅ Nessun errore nella console
- ✅ 2 log "✅ Email inviata" nel terminale
- ✅ 2 email ricevute (admin + cliente)
- ✅ Preventivo salvato in Supabase
- ✅ Preventivo visibile nella dashboard

---

## 🧪 TEST 2: PRENOTAZIONE

### **Procedura:**

1. **Apri il form prenotazione:**
   ```
   http://localhost:3000/prenota
   ```

2. **Compila con dati reali:**
   - Seleziona una **tratta** dal menu (es: Como → Malpensa)
   - Data: Una data futura
   - Ora: Un orario
   - Passeggeri: 2
   - Nome: Il tuo nome
   - Email: **USA LA TUA EMAIL PERSONALE**
   - Telefono: Un numero qualsiasi
   - (Opzionale) Seleziona un veicolo

3. **Aspetta che il prezzo venga calcolato** (appare in basso)

4. **Seleziona GDPR** (checkbox)

5. **Click "Scegli Metodo di Pagamento →"**

6. **Seleziona un metodo** (es: "Pagamento completo online")

---

### **Cosa aspettarsi:**

#### **A) Console Browser (F12):**
- Nessun errore rosso
- Richiesta POST a `/api/bookings` con status 200

#### **B) Console Server (terminale npm run dev):**
Dovresti vedere questi log:

```bash
✅ Email di notifica prenotazione inviata a: lakecomoincar@gmail.com
✅ Email di conferma prenotazione inviata a: tua-email@example.com
```

#### **C) Email Ricevute:**

**1. Email a `lakecomoincar@gmail.com` (admin):**
- **Oggetto:** 🚗 Nuova Prenotazione - LakeComoInCar
- **Contenuto:**
  - Dati cliente completi
  - Tratta, data, ora
  - Numero passeggeri
  - Veicolo selezionato
  - Prezzo totale
  - Note/richieste speciali
  - Call to action: "Conferma entro 2 ore"

**2. Email alla tua email personale (cliente):**
- **Oggetto:** ✅ Prenotazione Ricevuta - LakeComoInCar
- **Contenuto:**
  - Saluto personalizzato
  - Conferma prenotazione
  - Riepilogo completo servizio
  - Prezzo
  - Tempi di conferma (2 ore)
  - Contatti per urgenze
  - Footer con dati aziendali

#### **D) Database Supabase:**
Vai su Supabase Dashboard → Tabella `bookings`:
- Dovresti vedere la nuova prenotazione salvata
- Status: `new`
- Payment_status: `pending`
- Tutti i dati presenti

#### **E) Dashboard Admin:**
Vai su `/admin/dashboard` → Tab "Prenotazioni":
- La prenotazione dovrebbe apparire nella lista
- Badge blu "Nuovo"
- Prezzo visibile in alto a destra
- Click per espandere e vedere tutti i dettagli

---

### **✅ Test SUPERATO se:**
- ✅ Nessun errore nella console
- ✅ 2 log "✅ Email inviata" nel terminale
- ✅ 2 email ricevute (admin + cliente)
- ✅ Prenotazione salvata in Supabase
- ✅ Prenotazione visibile nella dashboard
- ✅ Puoi confermare/completare/annullare dalla dashboard

---

## 🐛 TROUBLESHOOTING

### ❌ **Errore: "Missing Supabase environment variables"**

**Problema:** Variabili Supabase non configurate in `.env.local`

**Soluzione:**
```env
# Aggiungi queste righe a .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

Prendi questi valori da:
- Supabase Dashboard → Settings → API

Poi **riavvia il server**: `npm run dev`

---

### ❌ **Errore: "Invalid login: 535-5.7.8 Username and Password not accepted"**

**Problema:** Password Gmail errata o non configurata correttamente.

**Soluzione:**
1. Vai su [myaccount.google.com/security](https://myaccount.google.com/security)
2. Verifica che "Verifica in due passaggi" sia **attiva**
3. Vai su "Password per le app"
4. Genera una **nuova** password
5. Copiala (16 caratteri)
6. Sostituisci in `.env.local`:
   ```env
   GMAIL_APP_PASSWORD=nuovapassword16caratteri
   ```
7. **Riavvia il server**: CTRL+C poi `npm run dev`

---

### ❌ **Errore: "Missing credentials for PLAIN"**

**Problema:** `.env.local` non caricato o variabili mancanti.

**Soluzione:**
1. Verifica che `.env.local` esista nella **root del progetto**
2. Verifica che contenga:
   ```env
   GMAIL_USER=lakecomoincar@gmail.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```
3. **Riavvia il server** completamente: CTRL+C poi `npm run dev`

---

### ⚠️ **Email non arrivano (ma nessun errore)**

**Possibili cause:**

1. **Email nello SPAM:**
   - Controlla la cartella SPAM/Posta indesiderata
   - Segna come "Non spam"

2. **Ritardo Gmail:**
   - Aspetta 1-2 minuti
   - Gmail può avere ritardi

3. **Email sbagliata:**
   - Verifica `ADMIN_EMAIL` in `.env.local`
   - Verifica l'email inserita nel form

4. **Log nel terminale:**
   - Se vedi "✅ Email inviata" → L'invio è riuscito
   - Se vedi "❌ Errore invio email" → C'è un problema

---

### 📧 **Solo 1 email arriva invece di 2**

**Problema:** Una delle due email (admin o cliente) non arriva.

**Verifica:**
1. Controlla i log nel terminale:
   - Devono esserci **2 log** "✅ Email inviata"
   - Se ne manca uno, c'è un errore

2. Se l'email admin non arriva:
   - Verifica `ADMIN_EMAIL` in `.env.local`
   - Deve essere `lakecomoincar@gmail.com`

3. Se l'email cliente non arriva:
   - Verifica l'email inserita nel form
   - Controlla lo SPAM

---

### 🗄️ **Dati non salvati in Supabase**

**Problema:** Email inviate ma dati non nel database.

**Verifica:**
1. Controlla la console del terminale per errori:
   ```
   ❌ Errore salvataggio database: ...
   ```

2. Verifica che Supabase sia configurato:
   - URL e chiavi in `.env.local`
   - Tabelle create (esegui `supabase/schema.sql`)

3. Controlla le policy RLS in Supabase:
   - Tabelle `bookings` e `quotes` devono avere INSERT pubblico

**Nota:** Anche se il DB fallisce, le email vengono inviate comunque!

---

## 📊 **STATO ATTUALE SISTEMA**

### ✅ **Cosa funziona:**
- ✅ Form preventivo frontend
- ✅ Form prenotazione frontend
- ✅ API POST /api/quotes
- ✅ API POST /api/bookings
- ✅ Salvataggio database Supabase
- ✅ Invio email admin
- ✅ Invio email cliente
- ✅ Template HTML professionali
- ✅ Supporto multilingua (IT/EN/FR/ES) nei template
- ✅ Dashboard admin per gestire tutto
- ✅ Azioni: conferma, completa, annulla, elimina
- ✅ Form inline per inviare preventivi con prezzo

### ⚠️ **Cosa manca (opzionale):**
- 🔒 Autenticazione API (middleware NextAuth)
- 💳 Integrazione pagamenti Stripe
- 🌍 Traduzioni complete sito (Gruppo J)
- 📧 Email preventivi personalizzate avanzate

---

## 🎯 **CHECKLIST FINALE**

Prima di considerare il sistema pronto:

- [ ] ✅ `.env.local` configurato con credenziali Gmail
- [ ] ✅ Server riavviato dopo configurazione
- [ ] ✅ Console mostra "✅ Server email pronto"
- [ ] ✅ Test preventivo: form inviato
- [ ] ✅ Test preventivo: 2 email ricevute
- [ ] ✅ Test preventivo: dati in Supabase
- [ ] ✅ Test preventivo: visibile in dashboard
- [ ] ✅ Test prenotazione: form inviato
- [ ] ✅ Test prenotazione: 2 email ricevute
- [ ] ✅ Test prenotazione: dati in Supabase
- [ ] ✅ Test prenotazione: visibile in dashboard
- [ ] ✅ Dashboard: posso confermare prenotazioni
- [ ] ✅ Dashboard: posso inviare preventivi con prezzo
- [ ] ✅ Nessun errore nella console browser
- [ ] ✅ Nessun errore nella console terminale

---

## 📞 **CONTATTI SUPPORTO**

Se tutto funziona:
- 🎉 **Sistema pronto per produzione!**
- 📧 Ogni richiesta arriva via email + si salva nel database
- 🎛️ Gestisci tutto dalla dashboard

Se qualcosa non funziona:
1. Leggi attentamente i log di errore
2. Controlla questa checklist
3. Verifica le credenziali Gmail
4. Riavvia il server

---

**Ultimo aggiornamento:** 21 Gennaio 2026  
**Versione:** 1.0
