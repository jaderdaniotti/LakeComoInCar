# Variabili d’ambiente – Setup e deploy

Elenco delle variabili usate dal progetto e come configurarle in sviluppo e produzione.

---

## 1. File e convenzioni

- **env.example**: copia di riferimento con tutte le chiavi (senza valori sensibili). Da committare.
- **.env.local** (sviluppo) e variabili in piattaforma (produzione): mai committare `.env.local`; deve essere in `.gitignore`.
- **NEXT_PUBLIC_***: esposte al browser; usare solo per dati non segreti (URL, client id pubblici).
- **Senza prefisso**: solo lato server (API Route, lib); mai usate nel client.

---

## 2. Supabase

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Client + Server | URL progetto (es. https://xxx.supabase.co) |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Client + Server | Chiave anonima (pubblica) |
| SUPABASE_SERVICE_ROLE_KEY | Solo Server | Chiave service role (admin, bypassa RLS). **Mai esporre al client.** |

Ottenere da: Supabase Dashboard → Project Settings → API.

---

## 3. Email (Nodemailer / Gmail)

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| GMAIL_USER | Server | Indirizzo Gmail (es. tuo@gmail.com) |
| GMAIL_APP_PASSWORD | Server | Password per le app (Google Account → Sicurezza) |
| ADMIN_EMAIL | Server | Email che riceve notifiche (nuove prenotazioni/preventivi) |
| COMPANY_NAME | Server | Nome azienda (template email) |
| COMPANY_PHONE | Server | Telefono (template email) |
| COMPANY_EMAIL | Server | Email azienda (template email) |

---

## 4. PayPal

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| PAYPAL_CLIENT_ID | Server | Client ID (Sandbox o Live) |
| PAYPAL_CLIENT_SECRET | Server | Secret (Sandbox o Live). **Mai esporre.** |
| NEXT_PUBLIC_PAYPAL_CLIENT_ID | Client | Stesso valore di PAYPAL_CLIENT_ID (per SDK frontend) |
| PAYPAL_MODE | Server | `sandbox` o `live` |
| NEXT_PUBLIC_BASE_URL | Client + Server | Base URL sito (es. https://www.tuosito.eu) per return/cancel URL |

Ottenere da: [PayPal Developer](https://developer.paypal.com) → Applications (Sandbox/Live).

---

## 5. Stripe

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| STRIPE_SECRET_KEY | Server | Secret key (sk_test_* o sk_live_*). **Mai esporre.** |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Client | Publishable key (pk_test_* o pk_live_*) |
| STRIPE_WEBHOOK_SECRET | Server | Opzionale; per verificare eventi webhook |
| NEXT_PUBLIC_BASE_URL | Client + Server | Base URL per redirect post-pagamento |

Ottenere da: [Stripe Dashboard](https://dashboard.stripe.com) → API Keys (Test/Live).

---

## 6. Autenticazione admin (NextAuth o custom)

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| NEXTAUTH_URL | Server | URL dell’app (http://localhost:3000 in dev, https://www.tuosito.eu in prod) |
| NEXTAUTH_SECRET | Server | Secret per JWT/session (es. `openssl rand -base64 32`) |

Se non usi NextAuth, potresti avere variabili per JWT o cookie (es. JWT_SECRET, ADMIN_SESSION_COOKIE).

---

## 7. Dominio e hosting

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| NEXT_PUBLIC_BASE_URL | Client + Server | Base URL pubblico (es. https://www.tuosito.eu) |
| SITE_URL | Server | Stesso valore, per redirect o email |
| DOMAIN | Server | Dominio (es. tuosito.eu) |
| ALLOWED_ORIGINS | Server | Origini CORS consentite (opzionale) |

In produzione: usare sempre HTTPS e lo stesso dominio (con o senza www) ovunque.

---

## 8. WhatsApp (opzionale)

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| WHATSAPP_NUMBER | Server | Numero in formato internazionale (es. +393381234567) |
| WHATSAPP_MODE | Server | `click-to-wa` (solo link) o `api` (invio messaggi) |

Per API: provider-specific (TWILIO_*, 360DIALOG_*, ecc.).

---

## 9. Regole acconto / business

| Variabile | Dove | Descrizione |
|-----------|------|-------------|
| DEPOSIT_TYPE | Server | `fixed` o `percentage` |
| DEPOSIT_AMOUNT | Server | Importo fisso (es. 70) |
| DEPOSIT_PERCENTAGE | Server | Percentuale (es. 40) |
| DEPOSIT_CURRENCY | Server | Es. EUR |

Usate da calculate-price e da logica prenotazione.

---

## 10. Checklist setup

- [ ] File `env.example` aggiornato con tutte le chiavi (valori placeholder).
- [ ] `.env.local` creato da env.example e compilato per sviluppo; `.env.local` in `.gitignore`.
- [ ] In produzione (Vercel/hosting): tutte le variabili impostate nell’ambiente, senza committare secret.
- [ ] NEXT_PUBLIC_BASE_URL e NEXTAUTH_URL (se usato) con dominio reale e HTTPS in produzione.
- [ ] PayPal/Stripe: sandbox in dev, live in prod; PAYPAL_MODE e chiavi corrette per l’ambiente.

Seguendo questo processo le variabili d’ambiente saranno allineate al progetto di riferimento e pronte per i prossimi progetti.
