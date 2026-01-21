# Guida Configurazione PayPal

## 📋 Panoramica

L'integrazione PayPal permette ai clienti di pagare le prenotazioni utilizzando il loro account PayPal o carte di credito/debito tramite PayPal.

## 🔧 Setup Iniziale

### 1. Creare un Account PayPal Business

1. Vai su [paypal.com/business](https://www.paypal.com/business)
2. Clicca su "Apri un conto business"
3. Completa la registrazione con i dati della tua azienda
4. Verifica il tuo account (email, telefono, documenti azienda)

### 2. Creare un'App PayPal (Sandbox per Test)

1. Vai al [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Accedi con il tuo account PayPal Business
3. Vai su "Apps & Credentials"
4. Nella tab "Sandbox", clicca "Create App"
5. Assegna un nome all'app (es. "LakeComoInCar Sandbox")
6. Copia il **Client ID** e il **Secret**

### 3. Configurare le Variabili d'Ambiente

Copia il file `env.example` in `.env.local` e compila:

```env
# PayPal Sandbox (per test)
PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret_here
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_MODE=sandbox

# URL base del sito
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Testare con Account Sandbox

PayPal crea automaticamente account di test:

1. Vai su "Sandbox" > "Accounts" nel Developer Dashboard
2. Troverai:
   - **Business Account**: Il tuo account venditore di test
   - **Personal Account**: Account acquirente di test
3. Usa l'account Personal per testare i pagamenti

**Credenziali Test (esempio):**
```
Email: sb-buyer@personal.example.com
Password: vedi nel dashboard PayPal
```

## 🚀 Passaggio a Produzione

### 1. Creare App Live

1. Nel Developer Dashboard, vai su "Apps & Credentials"
2. Passa alla tab **"Live"**
3. Clicca "Create App"
4. Assegna un nome (es. "LakeComoInCar Live")
5. Copia il **Live Client ID** e **Live Secret**

### 2. Aggiornare Variabili d'Ambiente

Aggiorna `.env.local` con le credenziali live:

```env
# PayPal Live (produzione)
PAYPAL_CLIENT_ID=your_live_client_id_here
PAYPAL_CLIENT_SECRET=your_live_client_secret_here
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id_here
PAYPAL_MODE=live

# URL base del sito in produzione
NEXT_PUBLIC_BASE_URL=https://www.lakecomoincar.com
```

### 3. Verificare Account Business

Prima di andare live, assicurati che il tuo account PayPal Business sia:
- ✅ Completamente verificato
- ✅ Con email confermata
- ✅ Con metodo di pagamento collegato (per ricevere fondi)
- ✅ Con tutti i documenti aziendali caricati

## 💳 Flusso Pagamento

### Come Funziona

1. **Utente seleziona PayPal** nella pagina prenota
2. **Conferma prenotazione** e clicca su "Paga con PayPal"
3. **Si apre il popup PayPal** dove l'utente:
   - Effettua login al suo account PayPal, OPPURE
   - Paga come ospite con carta di credito/debito
4. **Completa il pagamento** su PayPal
5. **Viene reindirizzato** alla pagina di conferma
6. **Email di conferma** inviata automaticamente

### Importo Pagato

- **PayPal**: 100% dell'importo totale pagato online
- **Contanti**: Solo 40% online (60% al driver)
- **Stripe**: 100% dell'importo totale pagato online

## 🔍 Monitoraggio Pagamenti

### Dashboard PayPal

1. Accedi a [paypal.com](https://www.paypal.com)
2. Vai su "Attività" per vedere tutte le transazioni
3. Ogni pagamento mostra:
   - Nome cliente
   - Importo
   - Stato (Completato, In sospeso, Rimborsato)
   - Order ID
   - Capture ID

### Dati Salvati nel Database

Ogni prenotazione include nelle note:
```
Pagamento PayPal completato
Order ID: XXXXXXXXXXXX
Capture ID: YYYYYYYYYYYY
```

## 💰 Commissioni PayPal

**PayPal addebita una commissione su ogni transazione:**
- **Standard**: 3,4% + €0,35 per transazione
- **Micropagamenti**: 5% + €0,05 (per importi < €10)

**Esempio:**
- Prenotazione €100,00
- Commissione PayPal: €3,75
- Tu ricevi: €96,25

💡 **Consiglio**: Considera di incorporare le commissioni nel prezzo oppure comunicare chiaramente al cliente.

## 🛡️ Sicurezza

### Protezione Acquirente PayPal

PayPal offre protezione sia per acquirente che venditore:
- Transazioni crittografate
- Protezione contro frodi
- Dispute management system

### Best Practices

1. ✅ Mantieni **sempre segreti** Client ID e Secret (nel .env.local, mai committarli)
2. ✅ Usa **HTTPS** in produzione (obbligatorio per PayPal)
3. ✅ Verifica **sempre** lo stato del pagamento lato server
4. ✅ Salva **Order ID** e **Capture ID** nel database per ogni transazione

## 🐛 Troubleshooting

### Errore: "PayPal SDK failed to load"

**Causa**: Lo script PayPal non si è caricato correttamente.

**Soluzione**:
1. Verifica che `NEXT_PUBLIC_PAYPAL_CLIENT_ID` sia nel `.env.local`
2. Riavvia il server Next.js: `npm run dev`
3. Controlla la console del browser per errori di rete
4. Verifica che non ci siano ad-blocker che bloccano PayPal

### Errore: "Missing PayPal credentials"

**Causa**: Le variabili d'ambiente non sono configurate.

**Soluzione**:
1. Copia `env.example` in `.env.local`
2. Compila tutte le variabili PayPal
3. Riavvia il server: `npm run dev`

### Pagamento non catturato

**Causa**: L'ordine è stato creato ma non catturato.

**Soluzione**:
1. Controlla i log del server: errori nell'API `/api/paypal/capture-order`
2. Verifica che il Client Secret sia corretto
3. Nel dashboard PayPal, cerca l'ordine e vedi lo stato

### Test Sandbox non funziona

**Causa**: Account sandbox non configurati o disabilitati.

**Soluzione**:
1. Vai su Developer Dashboard > Sandbox > Accounts
2. Verifica che gli account siano "Active"
3. Prova con un account Personal diverso
4. Resetta la password dell'account test

## 📧 Email Conferma

Quando un pagamento PayPal è completato:
1. ✅ Cliente riceve email con conferma prenotazione
2. ✅ Admin riceve notifica con dettagli pagamento
3. ✅ Nel database vengono salvati Order ID e Capture ID

## 🔄 Rimborsi

Per rimborsare un pagamento:

1. Vai su [paypal.com](https://www.paypal.com)
2. Cerca la transazione in "Attività"
3. Clicca sulla transazione
4. Seleziona "Rimborsa questa transazione"
5. Scegli importo (totale o parziale)
6. Conferma il rimborso

💡 **Nota**: I rimborsi possono richiedere 3-5 giorni lavorativi.

## 📞 Supporto

- **PayPal Help Center**: [paypal.com/help](https://www.paypal.com/help)
- **Developer Docs**: [developer.paypal.com/docs](https://developer.paypal.com/docs)
- **Status PayPal**: [status.paypal.com](https://www.paypal.com/status)

---

## ✅ Checklist Go-Live

Prima di mettere in produzione:

- [ ] Account PayPal Business completamente verificato
- [ ] App Live creata nel Developer Dashboard
- [ ] Credenziali Live configurate in `.env.local`
- [ ] `PAYPAL_MODE=live` impostato
- [ ] `NEXT_PUBLIC_BASE_URL` punta al dominio di produzione
- [ ] Testato pagamento completo in sandbox
- [ ] Testato pagamento reale (piccolo importo) in live
- [ ] Email di conferma funzionanti
- [ ] Dashboard PayPal monitorato per prime transazioni
- [ ] Cliente service pronto per gestire eventuali problemi

---

**Ultimo aggiornamento**: Gennaio 2025
**Versione SDK**: @paypal/checkout-server-sdk v1.0.3
