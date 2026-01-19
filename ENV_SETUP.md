# 🔐 Guida Configurazione Variabili Ambiente

## Setup Rapido

### 1. Crea il file `.env.local`

```bash
# Copia il template
cp env.example .env.local
```

### 2. Compila le variabili obbligatorie

#### ✅ OBBLIGATORIE per Release 1:

```env
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://tuo-progetto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Email (Resend)
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=admin@comolakecar.it

# NextAuth (Autenticazione)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-con-openssl-rand-base64-32

# WhatsApp
WHATSAPP_NUMBER=+393491234567
WHATSAPP_MODE=click-to-wa
```

#### ⏳ OPZIONALI (per Release 2):

```env
# Stripe (Pagamenti)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# WhatsApp Business API
WHATSAPP_PROVIDER=twilio
WHATSAPP_API_KEY=xxxxx
```

---

## 📝 Come Ottenere i Valori

### Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Crea/Seleziona progetto
3. Vai su **Settings** > **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Resend (Email)

1. Vai su [resend.com](https://resend.com)
2. Crea account
3. Vai su **API Keys**
4. Crea nuova API key
5. Copia → `RESEND_API_KEY`

**Nota:** Per inviare email, configura il dominio o usa il dominio di test di Resend.

### NextAuth Secret

Genera una chiave sicura:

```bash
openssl rand -base64 32
```

Copia l'output → `NEXTAUTH_SECRET`

### Stripe (Release 2)

1. Vai su [stripe.com](https://stripe.com)
2. Crea account
3. Vai su **Developers** > **API keys**
4. Copia:
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Per webhook:
1. Vai su **Developers** > **Webhooks**
2. Aggiungi endpoint
3. Copia **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## 🔒 Sicurezza

### ✅ DO:
- ✅ Usa `.env.local` (già in `.gitignore`)
- ✅ Usa chiavi diverse per sviluppo/produzione
- ✅ Ruota le chiavi periodicamente
- ✅ Limita permessi API keys

### ❌ DON'T:
- ❌ Non committare `.env.local`
- ❌ Non condividere chiavi in chat/email
- ❌ Non usare chiavi produzione in sviluppo
- ❌ Non hardcodare chiavi nel codice

---

## 🌍 Ambiente Produzione

### Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Seleziona progetto
3. Vai su **Settings** > **Environment Variables**
4. Aggiungi tutte le variabili
5. Seleziona ambiente (Production/Preview/Development)

### Altri Hosting

Configura le variabili nel pannello di controllo del tuo hosting provider.

---

## 🧪 Test Configurazione

Dopo aver configurato `.env.local`, testa la connessione:

```bash
# Test Supabase
npm run test:db

# Test Email (se implementato)
npm run test:email
```

---

## 📋 Checklist Setup

- [ ] File `.env.local` creato
- [ ] Supabase configurato
- [ ] Resend configurato
- [ ] NextAuth secret generato
- [ ] WhatsApp number configurato
- [ ] Test connessioni OK
- [ ] Variabili produzione configurate (quando pronto)

---

## 🆘 Troubleshooting

### "Cannot read property of undefined"
- Verifica che tutte le variabili siano definite
- Riavvia il server dev dopo modifiche a `.env.local`

### "Invalid API key"
- Verifica che le chiavi siano corrette
- Controlla che non ci siano spazi extra
- Verifica che le variabili inizino con `NEXT_PUBLIC_` se usate nel client

### "Environment variable not found"
- Assicurati che il file si chiami esattamente `.env.local`
- Verifica che sia nella root del progetto
- Riavvia il server dev

---

## 📚 Riferimenti

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Stripe Docs](https://stripe.com/docs)
