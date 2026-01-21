# Sistema Pagamenti LakeComoInCar - Guida Completa

## 📋 Panoramica

Il sistema di prenotazione LakeComoInCar ora supporta **3 metodi di pagamento**:

1. 💵 **Contanti** - 40% online + 60% al driver
2. 🅿️ **PayPal** - 100% online tramite account PayPal
3. 💳 **Stripe** - 100% online con carta di credito/debito

---

## 🚀 Quick Start

### 1. Installa le Dipendenze

```bash
npm install @paypal/checkout-server-sdk stripe @stripe/stripe-js
```

✅ **Già installato**

### 2. Configura le Variabili d'Ambiente

Crea il file `.env.local` (copia da `env.example`):

```env
# PAYPAL
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_MODE=sandbox  # o 'live' per produzione

# STRIPE
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# BASE URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Testa in Locale

```bash
npm run dev
```

Vai su http://localhost:3000/prenota e testa tutti e 3 i metodi di pagamento.

---

## 💳 Metodo 1: Contanti

### Come Funziona
- Cliente paga **40% online** come deposito
- **60% restante** pagato in contanti all'autista

### Commissioni
- ❌ Nessuna commissione esterna
- ✅ Massimo profitto

### Configurazione
Nessuna configurazione necessaria! Funziona immediatamente.

### Test
1. Seleziona "Contanti"
2. Conferma prenotazione
3. Email di conferma inviata con istruzioni

---

## 🅿️ Metodo 2: PayPal

### Come Funziona
- Cliente paga **100% online** tramite PayPal
- Può usare account PayPal o carta come ospite

### Commissioni PayPal
- **Standard**: 3,4% + €0,35 per transazione
- Esempio: €100 → commissione €3,75 → netto €96,25

### Setup PayPal

#### A. Crea Account Business (se non ce l'hai)
1. Vai su [paypal.com/business](https://www.paypal.com/business)
2. Registrati e verifica account

#### B. Ottieni Credenziali Sandbox (Test)
1. Vai su [developer.paypal.com](https://developer.paypal.com/dashboard/)
2. "Apps & Credentials" > "Sandbox"
3. Crea un'app
4. Copia **Client ID** e **Secret**

#### C. Configura .env.local
```env
PAYPAL_CLIENT_ID=AbiU5OdLBXXXXXXXXX
PAYPAL_CLIENT_SECRET=EMYJXxxxxxxxxxxxxxXXXXX
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AbiU5OdLBXXXXXXXXX
PAYPAL_MODE=sandbox
```

#### D. Testa con Account Sandbox
PayPal crea automaticamente account di test nel Developer Dashboard.

### Test PayPal
1. Seleziona "PayPal"
2. Clicca "Paga con PayPal"
3. Si apre popup PayPal
4. Login con account test sandbox
5. Conferma pagamento
6. Verifica email di conferma

### Passaggio a Live
1. Crea app "Live" nel Developer Dashboard
2. Aggiorna `.env.local`:
   ```env
   PAYPAL_MODE=live
   PAYPAL_CLIENT_ID=live_client_id
   PAYPAL_CLIENT_SECRET=live_secret
   ```

📚 **Guida dettagliata**: [PAYPAL_SETUP_GUIDE.md](PAYPAL_SETUP_GUIDE.md)

---

## 💳 Metodo 3: Stripe

### Come Funziona
- Cliente paga **100% online** con carta di credito/debito
- Form integrato direttamente nella pagina
- Supporta 3D Secure automaticamente

### Commissioni Stripe
- **Carte EU**: 1,5% + €0,25 per transazione
- **Carte Extra-EU**: 2,5% + €0,25 per transazione
- Esempio: €100 → commissione €1,75 → netto €98,25

### Setup Stripe

#### A. Crea Account Stripe
1. Vai su [stripe.com](https://stripe.com)
2. Registrati con email aziendale
3. Verifica email

#### B. Ottieni API Keys (Test Mode)
1. Vai su [Dashboard Stripe](https://dashboard.stripe.com)
2. "Developers" > "API keys"
3. Copia **Publishable key** (pk_test_...) e **Secret key** (sk_test_...)

#### C. Configura .env.local
```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

#### D. Testa con Carte di Prova
Stripe fornisce carte di test:

**Successo:**
```
Numero: 4242 4242 4242 4242
Scadenza: 12/34 (qualsiasi futura)
CVC: 123 (qualsiasi 3 cifre)
```

**Con 3D Secure:**
```
Numero: 4000 0025 0000 3155
Scadenza: 12/34
CVC: 123
```

**Carta Rifiutata:**
```
Numero: 4000 0000 0000 0002
Scadenza: 12/34
CVC: 123
```

### Test Stripe
1. Seleziona "Stripe / Carta di Credito"
2. Inserisci carta test: `4242 4242 4242 4242`
3. Scadenza: `12/34`
4. CVC: `123`
5. Clicca "Paga"
6. Verifica email di conferma

### Passaggio a Live
1. Dashboard Stripe > "Activate your account"
2. Compila informazioni azienda e bancarie
3. Ottieni Live API keys
4. Aggiorna `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
   ```

📚 **Guida dettagliata**: [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

## 📊 Confronto Metodi Pagamento

| Feature | Contanti | PayPal | Stripe |
|---------|----------|--------|--------|
| **% Pagato Online** | 40% | 100% | 100% |
| **Commissioni** | €0 | 3,4% + €0,35 | 1,5% + €0,25 |
| **Setup Difficoltà** | Nessuno | Medio | Medio |
| **UX Cliente** | Semplice | Popup | Form integrato |
| **Tempo Accredito** | Immediato | Immediato | 2-7 giorni |
| **Sicurezza** | Bassa | Alta | Altissima (PCI-L1) |
| **3D Secure** | N/A | ✅ Sì | ✅ Sì |
| **Account Richiesto** | No | No* | No |
| **Mobile Friendly** | ✅ | ✅ | ✅ |

*Con PayPal il cliente può pagare come ospite con carta

### Quale Scegliere?

**Consigliato per te:**
- 🥇 **Stripe** - Commissioni più basse, miglior UX, massima sicurezza
- 🥈 **PayPal** - Riconoscibilità del brand, alcuni clienti preferiscono
- 🥉 **Contanti** - Zero commissioni ma solo 40% anticipato

**Consigliato per clienti:**
- Lascia scegliere al cliente! Ognuno ha le sue preferenze.

---

## 🔧 Architettura Tecnica

### File Struttura
```
app/
├── api/
│   ├── paypal/
│   │   ├── create-order/route.ts      # Crea ordine PayPal
│   │   └── capture-order/route.ts     # Cattura pagamento PayPal
│   └── stripe/
│       ├── create-payment-intent/route.ts  # Crea Payment Intent
│       └── verify-payment/route.ts         # Verifica pagamento
├── payment-success/page.tsx           # Conferma pagamento
├── payment-cancel/page.tsx            # Pagamento annullato
└── [locale]/prenota/page.tsx          # Pagina prenotazione

components/
└── payment/
    ├── PayPalButton.tsx               # Componente PayPal
    └── StripeCheckout.tsx             # Componente Stripe

src/lib/
├── paypal.ts                          # Client PayPal
└── stripe.ts                          # Client Stripe
```

### API Endpoints

**PayPal:**
- `POST /api/paypal/create-order` - Crea ordine
- `POST /api/paypal/capture-order` - Cattura pagamento
- `GET /api/paypal/capture-order?orderId=XXX` - Verifica ordine

**Stripe:**
- `POST /api/stripe/create-payment-intent` - Crea Payment Intent
- `GET /api/stripe/verify-payment?paymentIntentId=XXX` - Verifica pagamento

### Database
Ogni prenotazione salva nel campo `notes`:

**PayPal:**
```
Pagamento PayPal completato
Order ID: 8XB12345ABCD6789
Capture ID: 1AB23456CD789012E
```

**Stripe:**
```
Pagamento Stripe completato
Payment Intent ID: pi_3ABC123DEF456GHI
```

---

## 🔍 Monitoraggio Pagamenti

### Dashboard PayPal
1. [paypal.com](https://www.paypal.com) > "Attività"
2. Cerca per Order ID o email cliente
3. Vedi dettagli transazione, stato, rimborsi

### Dashboard Stripe
1. [dashboard.stripe.com](https://dashboard.stripe.com) > "Payments"
2. Cerca per Payment Intent ID o email
3. Vedi dettagli carta, stato, timeline

### Report
Entrambi offrono export CSV/Excel per contabilità.

---

## 🔄 Rimborsi

### PayPal
1. Dashboard PayPal > "Attività"
2. Trova transazione
3. "Rimborsa questa transazione"
4. Scegli importo (totale/parziale)
5. Conferma

### Stripe
1. Dashboard Stripe > "Payments"
2. Trova pagamento
3. "Refund payment"
4. Scegli importo
5. Conferma

⏱️ **Tempi**: 3-10 giorni lavorativi per vedere i fondi sulla carta del cliente

---

## 🐛 Troubleshooting Comune

### "Missing PayPal credentials"
- ✅ Verifica che `.env.local` contenga tutte le variabili PayPal
- ✅ Riavvia il server: `npm run dev`

### "Stripe.js failed to load"
- ✅ Verifica `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`
- ✅ Controlla console browser per errori
- ✅ Disabilita ad-blocker

### "PayPal popup blocked"
- ✅ Chiedi al cliente di consentire popup per il sito
- ✅ In test, usa incognito mode

### Pagamento non catturato
- ✅ Controlla log server per errori API
- ✅ Verifica Secret keys corrette
- ✅ Controlla dashboard provider per stato ordine

### Email non arrivano
- ✅ Verifica configurazione Gmail in `.env.local`
- ✅ Controlla spam/junk folder
- ✅ Vedi [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)

---

## 📧 Email Conferma

Per tutti i metodi di pagamento:
- ✅ Cliente riceve email con conferma prenotazione
- ✅ Admin riceve notifica con dettagli pagamento
- ✅ Include Order/Payment ID per tracking

---

## 🔒 Sicurezza

### Dati Sensibili
- ❌ **MAI** committare `.env.local` nel repository
- ✅ Solo `env.example` con placeholder
- ✅ Secret keys solo lato server

### HTTPS
- ⚠️ **Obbligatorio** in produzione per PayPal e Stripe
- ✅ Let's Encrypt gratuito per SSL

### PCI Compliance
- ✅ PayPal e Stripe gestiscono tutto
- ✅ Dati carte non passano mai dal tuo server
- ✅ Non devi certificarti PCI-DSS

---

## ✅ Checklist Produzione

Prima di andare live:

### PayPal
- [ ] Account Business verificato
- [ ] App Live creata
- [ ] Live credentials in `.env.local`
- [ ] `PAYPAL_MODE=live`
- [ ] Testato pagamento reale (piccolo importo)

### Stripe
- [ ] Account Stripe attivato
- [ ] Informazioni bancarie verificate
- [ ] Live API keys in `.env.local`
- [ ] Testato pagamento reale
- [ ] Testato 3D Secure

### Generale
- [ ] `NEXT_PUBLIC_BASE_URL` punta al dominio produzione
- [ ] HTTPS configurato e funzionante
- [ ] Email di conferma testate
- [ ] Dashboard monitorate
- [ ] Team pronto per supporto clienti

---

## 📚 Documentazione Completa

- 📄 [PAYPAL_SETUP_GUIDE.md](PAYPAL_SETUP_GUIDE.md) - Guida dettagliata PayPal
- 📄 [PAYPAL_IMPLEMENTATION.md](PAYPAL_IMPLEMENTATION.md) - Dettagli tecnici PayPal
- 📄 [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md) - Guida dettagliata Stripe
- 📄 [STRIPE_IMPLEMENTATION.md](STRIPE_IMPLEMENTATION.md) - Dettagli tecnici Stripe
- 📄 [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md) - Configurazione email

---

## 📞 Supporto

### PayPal
- Help: https://www.paypal.com/help
- Developer Docs: https://developer.paypal.com/docs
- Status: https://www.paypal.com/status

### Stripe
- Help: https://support.stripe.com
- Developer Docs: https://stripe.com/docs
- Status: https://status.stripe.com

---

## 🎯 Prossimi Step

1. **Configura PayPal** (vedi [PAYPAL_SETUP_GUIDE.md](PAYPAL_SETUP_GUIDE.md))
2. **Configura Stripe** (vedi [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md))
3. **Testa tutti e 3 i metodi** in locale
4. **Attiva account** PayPal Business e Stripe
5. **Passa a Live** quando pronto
6. **Monitora** prime transazioni reali
7. **Ottimizza** in base a preferenze clienti

---

**Sistema Pagamenti**: ✅ Completo e Funzionante
**Ultimo aggiornamento**: Gennaio 2025
**Metodi Supportati**: 3 (Contanti, PayPal, Stripe)
