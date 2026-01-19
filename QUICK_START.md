# 🚀 Quick Start Guide - Lake Como in Car

## Setup Iniziale Rapido

### 1. Installazione Dipendenze

```bash
# Dipendenze core
npm install @supabase/supabase-js
npm install next-intl
npm install resend
npm install next-auth
npm install bcryptjs
npm install zod

# Types (se necessario)
npm install --save-dev @types/bcryptjs
```

### 2. Setup Supabase

1. Vai su [supabase.com](https://supabase.com) e crea un nuovo progetto
2. Copia le credenziali:
   - Project URL
   - Anon/Public Key
   - Service Role Key

3. Esegui lo schema:
   - Vai su **SQL Editor** nel dashboard Supabase
   - Copia e incolla il contenuto di `supabase/schema.sql`
   - Esegui lo script

4. Verifica:
   - Controlla che tutte le tabelle siano create
   - Verifica che i dati seed (vehicles, routes) siano inseriti

### 3. Configurazione Variabili Ambiente

Crea `.env.local` nella root del progetto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=admin@comolakecar.it

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# WhatsApp (per Release 2)
WHATSAPP_NUMBER=+39xxxxxxxxxx
```

**Genera NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Struttura File da Creare

```
src/
├── lib/
│   ├── supabase.ts          # Client pubblico
│   ├── supabase-admin.ts    # Client admin
│   ├── db/
│   │   ├── bookings.ts
│   │   ├── quotes.ts
│   │   ├── notifications.ts
│   │   └── stats.ts
│   └── email/
│       └── send.ts
├── types/
│   └── database.ts          # ✅ Già creato
└── i18n/
    └── config.ts

app/
├── api/
│   ├── bookings/
│   │   └── route.ts
│   ├── quotes/
│   │   └── route.ts
│   ├── vehicles/
│   │   └── route.ts
│   └── routes/
│       └── route.ts
└── admin/
    ├── layout.tsx
    ├── login/
    │   └── page.tsx
    ├── bookings/
    │   ├── page.tsx
    │   └── [id]/
    │       └── page.tsx
    └── quotes/
        ├── page.tsx
        └── [id]/
            └── page.tsx

messages/
├── it.json
├── en.json
├── fr.json
└── es.json
```

### 5. Comandi Utili

```bash
# Sviluppo
npm run dev

# Build produzione
npm run build

# Start produzione
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

### 6. Test Connessione Database

Crea un file di test `test-db.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Errore connessione:', error);
  } else {
    console.log('✅ Connessione OK!', data);
  }
}

testConnection();
```

Esegui:
```bash
npx tsx test-db.ts
```

### 7. Creare Utente Admin Iniziale

Crea uno script `scripts/create-admin.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createAdmin() {
  const email = 'admin@comolakecar.it';
  const password = 'ChangeThisPassword123!';
  const name = 'Admin';

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
      password_hash: passwordHash,
      name,
      role: 'admin',
      is_active: true
    })
    .select()
    .single();

  if (error) {
    console.error('❌ Errore:', error);
  } else {
    console.log('✅ Admin creato:', data);
    console.log('Email:', email);
    console.log('Password:', password);
  }
}

createAdmin();
```

**⚠️ IMPORTANTE:** Cambia password dopo il primo login!

### 8. Checklist Setup Iniziale

- [ ] Progetto Supabase creato
- [ ] Schema.sql eseguito
- [ ] Dipendenze installate
- [ ] .env.local configurato
- [ ] Test connessione DB OK
- [ ] Utente admin creato
- [ ] Progetto compila senza errori

### 9. Prossimi Passi

1. **Oggi:**
   - [ ] Completare setup base
   - [ ] Testare connessione database
   - [ ] Creare struttura cartelle

2. **Domani:**
   - [ ] Iniziare Fase 2 (Multilingua)
   - [ ] Setup next-intl
   - [ ] Traduzione homepage

3. **Questa Settimana:**
   - [ ] Completare multilingua
   - [ ] Iniziare backend API

---

## 🆘 Troubleshooting

### Errore: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Errore: "Invalid API key"
- Verifica che le variabili in `.env.local` siano corrette
- Assicurati di usare `NEXT_PUBLIC_` per variabili pubbliche
- Riavvia il server dev dopo modifiche a `.env.local`

### Errore: "Row Level Security policy violation"
- Verifica che le policy RLS siano state create correttamente
- Controlla che stai usando il client corretto (pubblico vs admin)

### Errore: "Table does not exist"
- Verifica che `schema.sql` sia stato eseguito completamente
- Controlla nel dashboard Supabase che le tabelle esistano

---

## 📚 Risorse

- [Roadmap Completa](./ROADMAP.md)
- [Checklist Progresso](./CHECKLIST.md)
- [Struttura Database](./DATABASE_STRUCTURE.md)
- [Schema SQL](./supabase/schema.sql)

---

**Pronto per iniziare! 🚀**
