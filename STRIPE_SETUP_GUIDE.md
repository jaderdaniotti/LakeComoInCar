# Guida Configurazione Stripe

## 📋 Panoramica

L'integrazione Stripe permette ai clienti di pagare le prenotazioni con carte di credito/debito direttamente sul sito, con un'interfaccia moderna e sicura.

## 🔧 Setup Iniziale

### 1. Creare un Account Stripe

1. Vai su [stripe.com](https://stripe.com)
2. Clicca su "Start now" per creare un account
3. Completa la registrazione con email aziendale
4. Verifica l'email

### 2. Ottenere le API Keys (Test Mode)

1. Vai su [Dashboard Stripe](https://dashboard.stripe.com/test/dashboard)
2. Clicca su **"Developers"** nel menu in alto
3. Vai su **"API keys"**
4. Troverai due chiavi:
   - **Publishable key** (pk_test_...) - Sicura da usare nel frontend
   - **Secret key** (sk_test_...) - Da tenere segreta, solo server-side

💡 **Nota**: Di default sei in "Test mode" (angolo in alto a destra mostra "TEST DATA")

### 3. Configurare le Variabili d'Ambiente

Copia il file `env.example` in `.env.local` e compila:

```env
# Stripe Test Keys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# URL base del sito
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Testare con Carte di Test

Stripe fornisce carte di credito di test:

**Successo:**
```
Numero: 4242 4242 4242 4242
Scadenza: Qualsiasi data futura (es. 12/34)
CVC: Qualsiasi 3 cifre (es. 123)
```

**Errore - Carta Rifiutata:**
```
Numero: 4000 0000 0000 0002
Scadenza: Qualsiasi data futura
CVC: Qualsiasi 3 cifre
```

**Richiede Autenticazione 3D Secure:**
```
Numero: 4000 0025 0000 3155
Scadenza: Qualsiasi data futura
CVC: Qualsiasi 3 cifre
```

📚 [Lista completa carte di test](https://stripe.com/docs/testing)

## 🚀 Passaggio a Produzione

### 1. Attivare l'Account Stripe

Prima di accettare pagamenti reali:

1. Vai su Dashboard Stripe
2. Clicca su **"Activate your account"** (banner in alto)
3. Compila le informazioni richieste:
   - Dettagli azienda
   - Informazioni legali
   - Informazioni bancarie (per ricevere i fondi)
   - Documenti di identità

⏱️ **Tempo di attivazione**: Di solito 1-2 giorni lavorativi

### 2. Ottenere le Live API Keys

1. Toggle "Test mode" OFF (angolo alto a destra)
2. Vai su "Developers" > "API keys"
3. Copia le **Live keys**:
   - **Publishable key** (pk_live_...)
   - **Secret key** (sk_live_...)

### 3. Aggiornare Variabili d'Ambiente

Aggiorna `.env.local` con le credenziali live:

```env
# Stripe Live Keys (produzione)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx

# URL base del sito in produzione
NEXT_PUBLIC_BASE_URL=https://www.lakecomoincar.com
```

### 4. Configurare Webhook (Opzionale ma Consigliato)

I webhook permettono a Stripe di notificarti degli eventi di pagamento:

1. Vai su "Developers" > "Webhooks"
2. Clicca "Add endpoint"
3. URL: `https://www.lakecomoincar.com/api/stripe/webhook`
4. Eventi da ascoltare:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copia il **Webhook signing secret** (whsec_...)
6. Aggiungilo a `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

## 💳 Flusso Pagamento

### Come Funziona

1. **Utente seleziona Stripe** nella pagina prenota
2. **Conferma prenotazione** e clicca su "Paga con Carta"
3. **Si carica il form Stripe** direttamente nella pagina
4. **Utente inserisce** dati carta di credito
5. **Stripe processa il pagamento** in modo sicuro
6. **Conferma immediata** e redirect alla pagina successo
7. **Email di conferma** inviata automaticamente

### Metodi di Pagamento Supportati

Stripe Elements supporta automaticamente:
- 💳 Carte di credito (Visa, Mastercard, Amex, Discover)
- 💳 Carte di debito
- 🌍 Metodi locali (es. Bancontact, iDEAL, etc.)

### Importo

- **Stripe**: Cliente paga 100% online
- **Contanti**: Cliente paga 40% online + 60% al driver
- **PayPal**: Cliente paga 100% online

## 🔍 Monitoraggio Pagamenti

### Dashboard Stripe

1. Accedi a [dashboard.stripe.com](https://dashboard.stripe.com)
2. Vai su "Payments" per vedere tutte le transazioni
3. Ogni pagamento mostra:
   - Nome cliente
   - Importo
   - Stato (Succeeded, Failed, Pending)
   - Payment Intent ID
   - Ultimi 4 cifre carta
   - Email cliente

### Dati Salvati nel Database

Ogni prenotazione include nelle note:
```
Pagamento Stripe completato
Payment Intent ID: pi_XXXXXXXXXXXX
```

### Riconciliazione

Puoi cercare un pagamento su Stripe usando:
- Payment Intent ID salvato nel database
- Email del cliente
- Importo e data

## 💰 Commissioni Stripe

**Stripe addebita una commissione su ogni transazione:**

**Europa (carte europee):**
- 1,5% + €0,25 per transazione

**Europa (carte non-europee):**
- 2,5% + €0,25 per transazione

**Esempio:**
- Prenotazione €100,00
- Commissione Stripe (carta EU): €1,75
- Tu ricevi: €98,25

💡 **Nota**: Le commissioni vengono dedotte automaticamente prima del deposito sul tuo conto.

## 🛡️ Sicurezza

### Certificazione PCI-DSS

Stripe è certificato PCI Level 1 - il più alto livello di sicurezza per le carte di pagamento.

**Cosa significa per te:**
- ✅ I dati delle carte **non passano mai** dal tuo server
- ✅ Stripe gestisce tutti gli aspetti di sicurezza
- ✅ Non devi preoccuparti della conformità PCI

### 3D Secure 2 (SCA)

Stripe supporta automaticamente la Strong Customer Authentication (SCA) richiesta in Europa:
- Autenticazione biometrica (impronta, FaceID)
- One-Time Password via SMS
- App bancaria

### Best Practices

1. ✅ Mantieni **sempre segreto** il Secret Key (nel .env.local, mai committarlo)
2. ✅ Usa **HTTPS** in produzione (obbligatorio per Stripe)
3. ✅ Verifica **sempre** lo stato del pagamento lato server
4. ✅ Salva **Payment Intent ID** nel database per ogni transazione
5. ✅ Implementa **webhook** per gestire eventi asincroni

## 🐛 Troubleshooting

### Errore: "Missing Stripe secret key"

**Causa**: Le variabili d'ambiente non sono configurate.

**Soluzione**:
1. Copia `env.example` in `.env.local`
2. Compila tutte le variabili Stripe
3. Riavvia il server: `npm run dev`

### Errore: "Stripe.js failed to load"

**Causa**: Lo script Stripe non si è caricato correttamente.

**Soluzione**:
1. Verifica che `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` sia nel `.env.local`
2. Riavvia il server Next.js
3. Controlla la console del browser per errori di rete
4. Verifica che non ci siano ad-blocker che bloccano Stripe

### Pagamento rifiutato

**Causa**: Carta non valida, fondi insufficienti, o banca ha rifiutato.

**Soluzione**:
1. In test mode: Usa carte di test ufficiali Stripe
2. In live mode: Chiedi al cliente di:
   - Verificare i dati della carta
   - Provare con un'altra carta
   - Contattare la propria banca

### Errore: "Payment Intent cannot be confirmed"

**Causa**: Il Payment Intent è in uno stato non valido.

**Soluzione**:
1. Controlla i log del server per dettagli
2. Verifica che il Payment Intent non sia già stato confermato
3. Crea un nuovo Payment Intent per un nuovo tentativo

## 📧 Email Conferma

Quando un pagamento Stripe è completato:
1. ✅ Cliente riceve email con conferma prenotazione
2. ✅ Admin riceve notifica con dettagli pagamento
3. ✅ Nel database viene salvato il Payment Intent ID

## 🔄 Rimborsi

Per rimborsare un pagamento:

### Via Dashboard

1. Vai su [dashboard.stripe.com](https://dashboard.stripe.com)
2. Cerca il pagamento in "Payments"
3. Clicca sul pagamento
4. Clicca "Refund payment" in alto a destra
5. Scegli importo (totale o parziale)
6. Aggiungi una nota (opzionale)
7. Conferma il rimborso

### Via API (Avanzato)

```typescript
const refund = await stripe.refunds.create({
  payment_intent: 'pi_XXXXXXXXXXXX',
  amount: 10000, // In centesimi (€100.00)
  reason: 'requested_by_customer',
});
```

💡 **Nota**: I rimborsi appaiono sulla carta del cliente in 5-10 giorni lavorativi.

## 📊 Report e Analisi

### Dashboard Stripe

Stripe fornisce report dettagliati:
- 📈 Grafici vendite
- 💰 Volumi di pagamento
- 📉 Tasso di successo/fallimento
- 🌍 Distribuzione geografica
- 💳 Breakdown per tipo di carta

### Esportare Dati

1. Vai su "Payments"
2. Clicca "Export" in alto a destra
3. Scegli formato (CSV, Excel)
4. Seleziona periodo
5. Scarica

## 🌍 Supporto Multi-Valuta

Stripe supporta oltre 135 valute. Per abilitare altre valute:

1. Vai su "Settings" > "Payment methods"
2. Scorri a "Currencies"
3. Aggiungi le valute desiderate

Attualmente configurato: **EUR (€)**

## 📞 Supporto

- **Stripe Help Center**: [support.stripe.com](https://support.stripe.com)
- **Developer Docs**: [stripe.com/docs](https://stripe.com/docs)
- **API Reference**: [stripe.com/docs/api](https://stripe.com/docs/api)
- **Status Page**: [status.stripe.com](https://status.stripe.com)

## ✅ Checklist Go-Live

Prima di mettere in produzione:

- [ ] Account Stripe completamente attivato
- [ ] Informazioni bancarie verificate
- [ ] Live API keys ottenute dalla dashboard
- [ ] Credenziali Live configurate in `.env.local`
- [ ] `NEXT_PUBLIC_BASE_URL` punta al dominio di produzione
- [ ] Testato pagamento completo in test mode con carte di test
- [ ] Testato pagamento reale (piccolo importo) in live mode
- [ ] Testato pagamento con 3D Secure
- [ ] Email di conferma funzionanti
- [ ] Webhook configurato e testato (opzionale)
- [ ] Dashboard Stripe monitorata per prime transazioni
- [ ] Team preparato per gestire eventuali problemi

## 🎨 Personalizzazione UI

Il componente Stripe Elements è già personalizzato con:
- ⚫ Colore primario: Nero (#000000)
- ⚪ Background: Bianco (#ffffff)
- 🔲 Border radius: 0px (stile minimale)
- 📱 Completamente responsive

Per modificare l'aspetto, edita `components/payment/StripeCheckout.tsx`:

```typescript
appearance: {
  theme: 'stripe',
  variables: {
    colorPrimary: '#000000', // Cambia qui
    colorBackground: '#ffffff',
    // ... altre variabili
  },
}
```

## 🚨 Gestione Dispute

Se un cliente contesta un pagamento:

1. Riceverai una notifica email da Stripe
2. Vai su Dashboard > "Disputes"
3. Visualizza i dettagli della disputa
4. Carica la documentazione (conferma prenotazione, email, ecc.)
5. Rispondi entro il termine indicato

💡 **Tip**: Mantieni sempre documentazione completa di ogni prenotazione.

---

## 🆚 Confronto: Stripe vs PayPal

| Feature | Stripe | PayPal |
|---------|--------|--------|
| **Commissioni EU** | 1,5% + €0,25 | 3,4% + €0,35 |
| **UI** | Integrata nel sito | Popup/redirect |
| **Setup** | Medio | Facile |
| **Carte supportate** | Tutte | Tutte + account PayPal |
| **3D Secure** | Automatico | Automatico |
| **Tempi accredito** | 2-7 giorni | Immediato (su account PayPal) |
| **Developer Experience** | Eccellente | Buona |

---

**Ultimo aggiornamento**: Gennaio 2025
**Versione SDK**: stripe v17.5.0, @stripe/stripe-js v4.15.0
**API Version**: 2024-12-18.acacia
