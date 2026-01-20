# Database Schema - Lake Como in Car

## Setup Supabase

### 1. Creazione Progetto Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Crea un nuovo progetto
3. Salva le credenziali:
   - Project URL
   - Anon/Public Key
   - Service Role Key (per operazioni server-side)

### 2. Esecuzione Schema

1. Vai su **SQL Editor** nel dashboard Supabase
2. Copia e incolla il contenuto di `schema.sql`
3. Esegui lo script

Oppure usa la CLI:

```bash
# Installa Supabase CLI
npm install -g supabase

# Login
supabase login

# Link al progetto
supabase link --project-ref your-project-ref

# Esegui migrazione
supabase db push
```

### 3. Configurazione Variabili Ambiente

Crea un file `.env.local` nella root del progetto:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Struttura Database

### Tabelle Principali

1. **users** - Utenti admin per dashboard
2. **vehicles** - Veicoli disponibili
3. **routes** - Tratte standard (Release 2)
4. **bookings** - Prenotazioni standard
5. **quotes** - Richieste preventivi
6. **notification_logs** - Log notifiche email/WhatsApp
7. **settings** - Configurazioni globali

### Relazioni

```
users (1) ──┐
            │
vehicles (1) ──┐
              │
routes (1) ───┼──> bookings (N)
              │
              └──> quotes (N)
                    │
                    └──> notification_logs (N)
```

## Row Level Security (RLS)

Il database usa RLS per sicurezza:

- **Pubblico**: Inserimento bookings/quotes, lettura vehicles/routes attivi
- **Admin**: Lettura/modifica completa di tutte le tabelle

## Viste Utili

- `bookings_detailed` - Bookings con route e vehicle joinati
- `quotes_detailed` - Quotes con vehicle joinato

## Seed Data

Lo schema include dati iniziali:
- 6 veicoli (carbianca1-3, carnera1-3)
- 8 tratte standard (Como-Malpensa, Como-Linate, ecc.)
- Settings di default

## Query Utili

### Ottenere tutte le prenotazioni con dettagli
```sql
SELECT * FROM bookings_detailed 
WHERE status = 'new' 
ORDER BY created_at DESC;
```

### Statistiche prenotazioni per mese
```sql
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed
FROM bookings
GROUP BY month
ORDER BY month DESC;
```

### Ricerca prenotazioni per cliente
```sql
SELECT * FROM bookings_detailed
WHERE 
  customer_name ILIKE '%nome%' OR
  customer_email ILIKE '%email%' OR
  customer_phone ILIKE '%telefono%'
ORDER BY created_at DESC;
```

## Migrazioni Future

Per aggiungere nuove colonne o modifiche:

1. Crea un nuovo file `supabase/migrations/YYYYMMDDHHMMSS_description.sql`
2. Esegui la migrazione tramite SQL Editor o CLI

## Note Importanti

- Tutti i timestamp usano `TIMESTAMPTZ` (timezone-aware)
- Gli ID sono UUID v4
- I prezzi sono `DECIMAL(10,2)` per precisione
- Gli indici sono ottimizzati per query comuni
- La ricerca full-text usa `pg_trgm` extension
