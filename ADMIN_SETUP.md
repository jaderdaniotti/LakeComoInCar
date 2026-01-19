# 🔐 Setup Autenticazione Admin

## Dipendenze Necessarie

Prima di usare l'area admin, installa le dipendenze mancanti:

```bash
npm install @supabase/supabase-js bcryptjs
npm install --save-dev @types/bcryptjs
```

## Configurazione

1. **Assicurati che `.env.local` sia configurato** con:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **Crea un utente admin** nel database Supabase:

```sql
-- Genera hash password (usa un tool online o Node.js)
-- Esempio: password "admin123" -> hash bcrypt

INSERT INTO users (email, password_hash, name, role, is_active)
VALUES (
  'admin@comolakecar.it',
  '$2a$10$...', -- Sostituisci con hash bcrypt della password
  'Admin',
  'admin',
  true
);
```

### Generare Hash Password

Puoi usare Node.js per generare l'hash:

```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('tua-password', 10);
console.log(hash);
```

Oppure usa uno script:

```bash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10))"
```

## Funzionalità Implementate

✅ **Login Form** - Form di autenticazione
✅ **Controllo Admin** - Solo utenti con role='admin' possono accedere
✅ **Dashboard Base** - Pagina admin con statistiche (da implementare)
✅ **Logout** - Funzionalità di logout

## Struttura File

```
app/
├── admin/
│   ├── page.tsx          # Pagina principale (controlla auth)
│   └── layout.tsx        # Layout senza navbar/footer
├── api/
│   └── auth/
│       ├── login/route.ts    # API login
│       ├── logout/route.ts  # API logout
│       └── me/route.ts       # API verifica sessione

components/
└── admin/
    ├── LoginForm.tsx     # Form login
    └── LogoutButton.tsx  # Pulsante logout
```

## Come Funziona

1. **Utente non autenticato** → Vede form login
2. **Utente inserisce credenziali** → API `/api/auth/login` verifica:
   - Email esiste nel database
   - Password è corretta (bcrypt)
   - Utente è attivo (`is_active = true`)
   - Utente ha role='admin'
3. **Login successo** → Cookie `admin_session` viene impostato
4. **Utente autenticato** → Vede dashboard admin
5. **Logout** → Cookie viene rimosso

## Prossimi Passi

- [ ] Implementare statistiche dashboard
- [ ] Creare pagina `/admin/bookings`
- [ ] Creare pagina `/admin/quotes`
- [ ] Aggiungere protezione route (middleware)
- [ ] Migliorare sicurezza (JWT invece di cookie semplice)
