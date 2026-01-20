# 📊 Struttura Database - Lake Como in Car

## Panoramica

Schema database ottimizzato per Supabase (PostgreSQL) che supporta:
- ✅ Prenotazioni standard con gestione pagamenti
- ✅ Richieste preventivi personalizzati
- ✅ Sistema multilingua (IT/EN/FR/ES)
- ✅ Log completo notifiche (email/WhatsApp)
- ✅ Dashboard admin con filtri avanzati
- ✅ Gestione veicoli e tratte (Release 2)

---

## 🗂️ Tabelle Principali

### 1. **users** - Utenti Admin
Gestisce accessi alla dashboard privata.

**Campi chiave:**
- `id` (UUID)
- `email`, `password_hash`
- `role` ('admin' | 'staff')
- `is_active`

**Uso:** Autenticazione dashboard, gestione permessi

---

### 2. **vehicles** - Veicoli
Catalogo veicoli disponibili con supporto multilingua.

**Campi chiave:**
- `code` (es: 'carbianca1', 'carnera1')
- `name_it`, `name_en`, `name_fr`, `name_es`
- `capacity` (numero passeggeri)
- `price_multiplier` (moltiplicatore prezzo base)

**Uso:** Selezione veicolo nei form, calcolo prezzi

---

### 3. **routes** - Tratte Standard (Release 2)
Tratte predefinite con prezzi base.

**Campi chiave:**
- `code` (es: 'como-malpensa')
- `origin_it/en/fr/es`, `destination_it/en/fr/es`
- `base_price`
- `distance_km`, `duration_minutes`

**Uso:** Lista tratte nei form prenotazione, calcolo automatico prezzi

---

### 4. **bookings** - Prenotazioni Standard
Record principale per prenotazioni corse standard.

**Campi chiave:**
- `language` (it/en/fr/es)
- `customer_name`, `customer_email`, `customer_phone`
- `route_id` / `route_code` (riferimento tratta)
- `vehicle_id` / `vehicle_code` (veicolo selezionato)
- `service_date`, `service_time`
- `passengers`
- `total_price`, `deposit_amount`, `deposit_percentage`
- `payment_status` (pending/deposit_paid/fully_paid/refunded/cancelled)
- `status` (new/in_progress/confirmed/completed/cancelled)
- `stripe_payment_intent_id` (per integrazione Stripe)

**Relazioni:**
- `route_id` → `routes.id`
- `vehicle_id` → `vehicles.id`

**Indici ottimizzati:**
- Status, data servizio, email, telefono, creazione
- Ricerca full-text su nome/email/telefono

---

### 5. **quotes** - Preventivi Personalizzati
Richieste preventivi per tratte non standard.

**Campi chiave:**
- `language` (it/en/fr/es)
- `customer_name`, `customer_email`, `customer_phone`
- `origin`, `destination` (testo libero)
- `route_description` (descrizione completa)
- `service_date`, `service_time` (opzionali)
- `quoted_price` (compilato dall'admin)
- `quote_valid_until`
- `status` (new/quote_sent/confirmed/archived)

**Differenze da bookings:**
- Tratta libera (non predefinita)
- Prezzo compilato manualmente dall'admin
- Data/ora opzionali

---

### 6. **notification_logs** - Log Notifiche
Traccia completa di tutte le notifiche inviate.

**Campi chiave:**
- `booking_id` / `quote_id` (riferimento)
- `notification_type` ('email' | 'whatsapp')
- `notification_subtype` (es: 'customer_confirmation', 'admin_notification')
- `recipient_email` / `recipient_phone`
- `status` (pending/sent/failed/delivered)
- `provider` (resend/nodemailer/twilio/360dialog/click-to-wa)
- `external_id` (ID dal provider esterno)
- `error_message`

**Uso:**
- Dashboard: vedere esito notifiche
- Debug: capire perché una notifica è fallita
- Analytics: statistiche invii

---

### 7. **settings** - Configurazioni Globali
Impostazioni sistema salvate come JSONB.

**Chiavi principali:**
- `deposit_rules`: `{type: "fixed"|"percentage", amount: 70, percentage: 40}`
- `whatsapp_mode`: `"click-to-wa"` | `"api"`
- `email_notifications`: `{admin_enabled: true, customer_enabled: true, admin_email: ""}`
- `whatsapp_number`: numero WhatsApp aziendale

**Vantaggio:** Modifiche configurazione senza deploy

---

## 🔗 Relazioni e Viste

### Relazioni
```
routes (1) ──┐
             │
vehicles (1) ┼──> bookings (N)
             │
             └──> quotes (N)
                   │
                   └──> notification_logs (N)
```

### Viste Predefinite

**`bookings_detailed`**
- Booking + route + vehicle joinati
- Contatori notifiche inviate
- Query ottimizzata per dashboard

**`quotes_detailed`**
- Quote + vehicle joinato
- Contatori notifiche inviate

---

## 🔒 Sicurezza (Row Level Security)

### Accesso Pubblico (Senza autenticazione)
- ✅ **INSERT** su `bookings` e `quotes`
- ✅ **SELECT** su `vehicles` e `routes` (solo attivi)

### Accesso Admin (Autenticato)
- ✅ **SELECT/UPDATE/DELETE** su tutte le tabelle
- ✅ Gestione completa dashboard

**Nota:** Supabase gestisce RLS automaticamente. Le policy sono definite nello schema.

---

## 📈 Indici e Performance

### Indici Principali
- **bookings**: status, service_date, customer_email, customer_phone, created_at
- **quotes**: status, customer_email, created_at
- **notification_logs**: booking_id, quote_id, status, created_at
- **Ricerca full-text**: `pg_trgm` extension per ricerca fuzzy

### Query Ottimizzate
- Lista prenotazioni con filtri multipli
- Ricerca per nome/email/telefono
- Statistiche dashboard (aggregazioni)
- Log notifiche per booking/quote

---

## 🚀 Utilizzo Pratico

### Esempio: Creare Prenotazione

```typescript
import { createBooking } from '@/lib/supabase';

const booking = await createBooking({
  language: 'it',
  customer_name: 'Mario Rossi',
  customer_email: 'mario@example.com',
  customer_phone: '+39 123 456 7890',
  route_code: 'como-malpensa',
  vehicle_code: 'carbianca1',
  service_date: '2024-06-15',
  service_time: '10:00',
  passengers: 2,
  privacy_consent: true,
  terms_accepted: true,
});
```

### Esempio: Filtrare Prenotazioni (Dashboard)

```typescript
import { getBookings } from '@/lib/supabase';

const bookings = await getBookings({
  status: ['new', 'in_progress'],
  date_from: '2024-01-01',
  search: 'mario',
  limit: 20,
  order_by: 'created_at',
  order: 'desc'
});
```

---

## 📋 Checklist Implementazione

### Release 1
- [x] Schema database completo
- [ ] Setup Supabase progetto
- [ ] Esecuzione schema.sql
- [ ] Configurazione variabili ambiente
- [ ] Test inserimento booking/quote
- [ ] Test query dashboard

### Release 2
- [ ] CRUD routes (tratte) da dashboard
- [ ] CRUD vehicles da dashboard
- [ ] Integrazione Stripe (payment_status)
- [ ] Analytics avanzate

---

## 🔧 Manutenzione

### Backup
Supabase gestisce backup automatici. Per backup manuale:
```sql
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### Migrazioni
Per modifiche future, crea file in `supabase/migrations/`:
```
YYYYMMDDHHMMSS_add_column.sql
```

### Monitoraggio
- Dashboard Supabase: statistiche query
- Logs: vedere query lente
- Indici: verificare utilizzo

---

## 📝 Note Importanti

1. **UUID vs ID numerici**: Usati UUID per sicurezza e distribuzione
2. **Timestamps**: Tutti `TIMESTAMPTZ` (timezone-aware)
3. **Prezzi**: `DECIMAL(10,2)` per precisione monetaria
4. **Multilingua**: Campi separati per ogni lingua (non JSONB) per query più veloci
5. **Soft delete**: Usare `status = 'cancelled'` invece di DELETE fisico
6. **Backup dati**: `route_code` e `vehicle_code` salvati anche se route/vehicle eliminati

---

## 🎯 Prossimi Passi

1. **Setup Supabase**: Crea progetto e esegui schema
2. **Installazione client**: `npm install @supabase/supabase-js`
3. **Configurazione env**: Aggiungi variabili `.env.local`
4. **Test base**: Inserisci booking di test
5. **Integrazione form**: Collega form prenotazione/preventivo al DB

---

**File creati:**
- `supabase/schema.sql` - Schema completo database
- `src/types/database.ts` - Tipi TypeScript
- `src/lib/supabase-example.ts` - Esempi utilizzo
- `supabase/README.md` - Guida setup
