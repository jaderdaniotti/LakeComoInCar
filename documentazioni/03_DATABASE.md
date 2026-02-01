# Database – Struttura Supabase e tipi TypeScript

Processo per replicare la struttura database del progetto: schema PostgreSQL su Supabase, RLS, tipi TypeScript e funzioni di accesso in `src/lib/db/`.

---

## 1. Panoramica

| Elemento | Dove | Ruolo |
|----------|------|--------|
| Schema SQL | `supabase/schema.sql` | Tabelle, indici, RLS, trigger, seed |
| Client Supabase | `src/lib/supabase.ts` | Client anonimo (frontend) + client admin (service role) |
| Tipi TypeScript | `src/types/database.ts` | Interfacce per tabelle, Insert, Update, filtri |
| Funzioni CRUD | `src/lib/db/bookings.ts`, `quotes.ts`, ecc. | Create, read, update, delete e statistiche |

---

## 2. Supabase – setup progetto

1. Crea progetto su [Supabase](https://app.supabase.com).
2. In **Settings → API** copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (solo server, mai esposta al client)
3. In **SQL Editor** esegui lo schema (vedi sotto) in ordine: estensioni, tabelle, indici, trigger, RLS, policy, viste, seed.

---

## 3. Schema SQL – struttura tipo

### 3.1 Estensioni

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

### 3.2 Tabelle principali (esempio: routes, vehicles, bookings, quotes)

**routes** (tratte/prezzi base):

```sql
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  origin_it TEXT NOT NULL,
  origin_en TEXT, origin_fr TEXT, origin_es TEXT,
  destination_it TEXT NOT NULL,
  destination_en TEXT, destination_fr TEXT, destination_es TEXT,
  base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
  distance_km INTEGER, duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_routes_active ON routes(is_active);
CREATE INDEX idx_routes_code ON routes(code);
```

**vehicles** (veicoli):

```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name_it TEXT NOT NULL,
  name_en TEXT, name_fr TEXT, name_es TEXT,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  price_multiplier DECIMAL(5,2) DEFAULT 1.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_vehicles_active ON vehicles(is_active);
CREATE INDEX idx_vehicles_code ON vehicles(code);
```

**bookings** (prenotazioni):

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('it', 'en', 'fr', 'es')),
  type TEXT DEFAULT 'standard',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  route_id UUID REFERENCES routes(id) ON DELETE SET NULL,
  route_code TEXT, route_description TEXT,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_code TEXT,
  service_date DATE NOT NULL,
  service_time TIME NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers > 0),
  notes TEXT, special_requirements TEXT,
  total_price DECIMAL(10,2),
  deposit_amount DECIMAL(10,2), deposit_percentage DECIMAL(5,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded', 'cancelled')),
  stripe_payment_intent_id TEXT,
  payment_method TEXT CHECK (payment_method IN ('online', 'cash', 'mixed')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'confirmed', 'completed', 'cancelled')),
  privacy_consent BOOLEAN DEFAULT false,
  terms_accepted BOOLEAN DEFAULT false,
  ip_address INET, user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ, cancelled_reason TEXT
);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_service_date ON bookings(service_date);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
```

**quotes** (preventivi):

```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('it', 'en', 'fr', 'es')),
  type TEXT DEFAULT 'quote',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  route_description TEXT,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_code TEXT,
  service_date DATE, service_time TIME, estimated_arrival_time TIME,
  passengers INTEGER CHECK (passengers > 0),
  notes TEXT, special_requirements TEXT,
  quoted_price DECIMAL(10,2), quote_valid_until DATE, quote_notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'quote_sent', 'confirmed', 'archived')),
  privacy_consent BOOLEAN DEFAULT false,
  ip_address INET, user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  quote_sent_at TIMESTAMPTZ, archived_at TIMESTAMPTZ
);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created_at ON quotes(created_at DESC);
```

### 3.3 Tabella users (admin)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);
```

### 3.4 Trigger updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ripeti per routes, vehicles, users
```

(Nota: in alcune versioni di Postgres la sintassi è `EXECUTE PROCEDURE` invece di `EXECUTE FUNCTION`.)

### 3.5 Row Level Security (RLS)

- **routes** e **vehicles**: lettura pubblica (solo `is_active = true` se vuoi).
- **bookings** e **quotes**: INSERT pubblico, SELECT/UPDATE solo per utenti autenticati (admin).
- **users**: solo autenticati.

Esempio policy:

```sql
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bookings are insertable by everyone" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Bookings are viewable by admins" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Bookings are updatable by admins" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');
```

Per le API Next.js che usano **service_role** il client bypassa RLS; le policy servono se usi anche l’auth Supabase dal frontend.

---

## 4. Client Supabase – `src/lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client pubblico (frontend, rispetta RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (solo server, bypassa RLS)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
```

Le API Route che leggono/scrivono dati “admin” (bookings, quotes, routes, ecc.) devono usare **supabaseAdmin**; il frontend pubblico può usare **supabase** solo per letture consentite dalle policy.

---

## 5. Tipi TypeScript – `src/types/database.ts`

Definisci interfacce per:

- Ogni tabella: `Booking`, `Quote`, `Route`, `Vehicle`, `User`, ecc.
- Insert: `BookingInsert`, `QuoteInsert`, …
- Update parziale: `BookingUpdate`, `QuoteUpdate`, …
- Filtri/query: `BookingFilters`, `QuoteFilters` (opzionale).
- Viste/dettaglio: `BookingDetailed`, `QuoteDetailed` (se usi viste SQL).

Esempio per bookings:

```ts
export type Language = 'it' | 'en' | 'fr' | 'es';
export type BookingStatus = 'new' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded' | 'cancelled';

export interface Booking {
  id: string;
  language: Language;
  type: 'standard';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  route_id: string | null;
  route_code: string | null;
  route_description: string | null;
  vehicle_id: string | null;
  vehicle_code: string | null;
  service_date: string;
  service_time: string;
  passengers: number;
  notes: string | null;
  special_requirements: string | null;
  total_price: number | null;
  deposit_amount: number | null;
  deposit_percentage: number | null;
  payment_status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  payment_method: 'online' | 'cash' | 'mixed' | null;
  status: BookingStatus;
  privacy_consent: boolean;
  terms_accepted: boolean;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
  cancelled_at: string | null;
  cancelled_reason: string | null;
}

export interface BookingInsert {
  language: Language;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  route_id?: string | null;
  route_code?: string | null;
  route_description?: string | null;
  vehicle_id?: string | null;
  vehicle_code?: string | null;
  service_date: string;
  service_time: string;
  passengers: number;
  notes?: string | null;
  special_requirements?: string | null;
  total_price?: number | null;
  deposit_amount?: number | null;
  deposit_percentage?: number | null;
  payment_status?: PaymentStatus;
  stripe_payment_intent_id?: string | null;
  payment_method?: 'online' | 'cash' | 'mixed' | null;
  status?: BookingStatus;
  privacy_consent: boolean;
  terms_accepted?: boolean;
  ip_address?: string | null;
  user_agent?: string | null;
}

export interface BookingUpdate {
  status?: BookingStatus;
  payment_status?: PaymentStatus;
  total_price?: number;
  deposit_amount?: number;
  notes?: string;
  cancelled_at?: string;
  cancelled_reason?: string;
}
```

Ripeti lo stesso schema per Quote, Route, Vehicle, User in base alle colonne reali.

---

## 6. Funzioni CRUD – `src/lib/db/bookings.ts`

Pattern da replicare per ogni entità:

- **createBooking(data)** → insert con `.select().single()`, ritorna `{ data, error }`.
- **getBookings(filters?)** → select con order, filtri opzionali (status, date, limit, offset), ritorna `{ data, error, count }`.
- **getBookingById(id)** → select by id, `.single()`, ritorna `{ data, error }`.
- **updateBooking(id, updates)** → update solo campi presenti in `updates`, ritorna `{ data, error }`.
- **deleteBooking(id, reason?)** → soft delete (es. status = 'cancelled', cancelled_at, cancelled_reason) o hard delete, ritorna `{ data, error }`.
- **getBookingStats()** (opzionale) → conteggi e somme per dashboard.

Usa sempre **supabaseAdmin** da `@/src/lib/supabase` per queste funzioni, così le API Next.js possono leggere/scrivere anche con RLS attivo.

Esempio create + getById:

```ts
import { supabaseAdmin } from '@/src/lib/supabase';

export async function createBooking(bookingData: CreateBookingData) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([{ ...bookingData, status: 'new', payment_status: 'pending' }])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { data: null, error };
  }
}

export async function getBookingById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return { data: null, error };
  }
}
```

---

## 7. Checklist database

- [ ] Progetto Supabase creato, variabili URL e chiavi in `.env`.
- [ ] Schema SQL eseguito (tabelle, indici, trigger, RLS, policy).
- [ ] `src/lib/supabase.ts` con client anonimo e admin.
- [ ] `src/types/database.ts` con interfacce per tutte le tabelle usate dall’app.
- [ ] Per ogni entità (bookings, quotes, routes, …): file in `src/lib/db/` con create, get, getById, update, delete (e filtri/stats se servono).
- [ ] API Route che chiamano queste funzioni usano `supabaseAdmin` (vedi [04_CRUD_E_API.md](./04_CRUD_E_API.md)).

Seguendo questo processo la struttura database e l’accesso dati saranno allineati al progetto di riferimento e riutilizzabili nei prossimi progetti.
