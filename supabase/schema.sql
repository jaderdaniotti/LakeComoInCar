-- ============================================
-- TABELLA: routes (Tratte Standard - Release 2)
-- ============================================
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL, -- es: 'como-malpensa'
  origin_it TEXT NOT NULL,
  origin_en TEXT,
  origin_fr TEXT,
  origin_es TEXT,
  destination_it TEXT NOT NULL,
  destination_en TEXT,
  destination_fr TEXT,
  destination_es TEXT,
  base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
  distance_km INTEGER,
  duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  rule_name TEXT NOT NULL,
  rule_type TEXT CHECK (rule_type IN ('passenger_based', 'season_based', 'time_based', 'date_based', 'day_of_week', 'combined')),
  
  -- Condizioni (JSONB per flessibilità)
  conditions JSONB NOT NULL,
  /* Esempio:
  {
    "passengers_min": 2,
    "passengers_max": 4,
    "date_from": "2024-06-01",
    "date_to": "2024-09-30",
    "days_of_week": [6, 7],
    "time_from": "22:00",
    "time_to": "06:00"
  }
  */
  
  -- Prezzo
  price_type TEXT CHECK (price_type IN ('fixed', 'modifier')),
  price_value DECIMAL(10,2),
  price_modifier_type TEXT CHECK (price_modifier_type IN ('percentage', 'fixed_amount')),
  
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE global_pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_name TEXT NOT NULL,
  rule_type TEXT CHECK (rule_type IN ('percentage', 'fixed_amount')),
  
  -- Condizioni (stesso formato delle pricing_rules)
  conditions JSONB NOT NULL,
  /* Esempio:
  {
    "date_from": "2024-12-20",
    "date_to": "2024-01-06",
    "days_of_week": [6, 7],  // Weekend
    "time_from": "22:00",
    "time_to": "06:00"
  }
  */
  
  -- Modifica prezzo
  modifier_type TEXT CHECK (modifier_type IN ('percentage', 'fixed_amount')),
  modifier_value DECIMAL(10,2) NOT NULL,
  
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_global_pricing_rules_active ON global_pricing_rules(is_active);
CREATE INDEX idx_global_pricing_rules_priority ON global_pricing_rules(priority DESC);
CREATE INDEX idx_routes_active ON routes(is_active);
CREATE INDEX idx_routes_code ON routes(code);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- TABELLA: global_pricing_rules (Regole Globali Prezzi)
-- ============================================
CREATE TABLE global_pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_name TEXT NOT NULL,
  rule_type TEXT CHECK (rule_type IN ('percentage', 'fixed_amount')),
  
  -- Condizioni (stesso formato delle pricing_rules)
  conditions JSONB NOT NULL,
  /* Esempio:
  {
    "passengers_min": 5,
    "passengers_max": 8,
    "date_from": "2024-12-20",
    "date_to": "2024-01-06",
    "days_of_week": [6, 7],
    "time_from": "22:00",
    "time_to": "06:00"
  }
  */
  
  -- Modifica prezzo
  modifier_type TEXT CHECK (modifier_type IN ('percentage', 'fixed_amount')),
  modifier_value DECIMAL(10,2) NOT NULL,
  
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_global_pricing_rules_active ON global_pricing_rules(is_active);
CREATE INDEX idx_global_pricing_rules_priority ON global_pricing_rules(priority DESC); 

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- Hash bcrypt
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
**********************************************************************************
-- Indici per users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

-- ============================================
-- TABELLA: vehicles (Veicoli)
-- ============================================
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL, -- es: 'carbianca1', 'carnera1'
  name_it TEXT NOT NULL,
  name_en TEXT,
  name_fr TEXT,
  name_es TEXT,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  price_multiplier DECIMAL(5,2) DEFAULT 1.00, -- Moltiplicatore prezzo base
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per vehicles
CREATE INDEX idx_vehicles_active ON vehicles(is_active);
CREATE INDEX idx_vehicles_code ON vehicles(code);



-- ============================================
-- TABELLA: bookings (Prenotazioni Standard)
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Lingua e tipo
  language TEXT NOT NULL CHECK (language IN ('it', 'en', 'fr', 'es')),
  type TEXT DEFAULT 'standard' CHECK (type IN ('standard')),
  
  -- Dati cliente
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Dettagli corsa
  route_id UUID REFERENCES routes(id) ON DELETE SET NULL, -- NULL se tratta custom
  route_code TEXT, -- Backup se route_id è NULL
  route_description TEXT, -- Descrizione tratta (per compatibilità)
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_code TEXT, -- Backup se vehicle_id è NULL
  
  -- Data/ora servizio
  service_date DATE NOT NULL,
  service_time TIME NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers > 0),
  
  -- Note e dettagli aggiuntivi
  notes TEXT,
  special_requirements TEXT,
  
  -- Prezzo e pagamento
  total_price DECIMAL(10,2),
  deposit_amount DECIMAL(10,2) CHECK (deposit_amount >= 0),
  deposit_percentage DECIMAL(5,2) CHECK (deposit_percentage >= 0 AND deposit_percentage <= 100),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded', 'cancelled')),
  stripe_payment_intent_id TEXT, -- ID Stripe se pagamento online
  payment_method TEXT CHECK (payment_method IN ('online', 'cash', 'mixed')),
  
  -- Stato prenotazione
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'confirmed', 'completed', 'cancelled')),
  
  -- Consensi
  privacy_consent BOOLEAN DEFAULT false,
  terms_accepted BOOLEAN DEFAULT false,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  cancelled_reason TEXT
);

-- Indici per bookings
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_service_date ON bookings(service_date);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_customer_phone ON bookings(customer_phone);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_language ON bookings(language);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_route_id ON bookings(route_id);
CREATE INDEX idx_bookings_vehicle_id ON bookings(vehicle_id);

-- Indice composito per ricerca
CREATE INDEX idx_bookings_search ON bookings USING gin(
  to_tsvector('italian', 
    coalesce(customer_name, '') || ' ' || 
    coalesce(customer_email, '') || ' ' || 
    coalesce(customer_phone, '')
  )
);

-- ============================================
-- TABELLA: quotes (Preventivi/Richieste Personalizzate)
-- ============================================
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Lingua e tipo
  language TEXT NOT NULL CHECK (language IN ('it', 'en', 'fr', 'es')),
  type TEXT DEFAULT 'quote' CHECK (type IN ('quote')),
  
  -- Dati cliente
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Dettagli richiesta
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  route_description TEXT, -- Descrizione completa tratta/tappe
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_code TEXT,
  
  -- Data/ora (opzionale per preventivi)
  service_date DATE,
  service_time TIME,
  estimated_arrival_time TIME,
  passengers INTEGER CHECK (passengers > 0),
  
  -- Note e requisiti
  notes TEXT,
  special_requirements TEXT, -- Bagagli, bambini, ecc.
  
  -- Preventivo (compilato dall'admin)
  quoted_price DECIMAL(10,2),
  quote_valid_until DATE,
  quote_notes TEXT, -- Note interne admin
  
  -- Stato preventivo
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'quote_sent', 'confirmed', 'archived')),
  
  -- Consensi
  privacy_consent BOOLEAN DEFAULT false,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  quote_sent_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);

-- Indici per quotes
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_service_date ON quotes(service_date);
CREATE INDEX idx_quotes_customer_email ON quotes(customer_email);
CREATE INDEX idx_quotes_customer_phone ON quotes(customer_phone);
CREATE INDEX idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX idx_quotes_language ON quotes(language);

-- Indice composito per ricerca
CREATE INDEX idx_quotes_search ON quotes USING gin(
  to_tsvector('italian', 
    coalesce(customer_name, '') || ' ' || 
    coalesce(customer_email, '') || ' ' || 
    coalesce(customer_phone, '') || ' ' ||
    coalesce(origin, '') || ' ' ||
    coalesce(destination, '')
  )
);

-- ============================================
-- TABELLA: notification_logs (Log Notifiche)
-- ============================================
CREATE TABLE notification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Riferimento record
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Tipo notifica
  notification_type TEXT NOT NULL CHECK (notification_type IN ('email', 'whatsapp')),
  notification_subtype TEXT, -- 'customer_confirmation', 'admin_notification', 'quote_sent', ecc.
  
  -- Destinatario
  recipient_email TEXT,
  recipient_phone TEXT,
  
  -- Dettagli invio
  subject TEXT, -- Per email
  message_preview TEXT, -- Anteprima messaggio
  language TEXT CHECK (language IN ('it', 'en', 'fr', 'es')),
  
  -- Esito
  status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'failed', 'delivered')),
  error_message TEXT,
  
  -- Provider specifico
  provider TEXT, -- 'resend', 'nodemailer', 'twilio', '360dialog', 'click-to-wa'
  external_id TEXT, -- ID messaggio dal provider
  
  -- Metadata
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per notification_logs
CREATE INDEX idx_notification_logs_booking_id ON notification_logs(booking_id);
CREATE INDEX idx_notification_logs_quote_id ON notification_logs(quote_id);
CREATE INDEX idx_notification_logs_type ON notification_logs(notification_type);
CREATE INDEX idx_notification_logs_status ON notification_logs(status);
CREATE INDEX idx_notification_logs_created_at ON notification_logs(created_at DESC);

-- ============================================
-- TABELLA: settings (Configurazioni Globali)
-- ============================================
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES users(id)
);

-- Inserimento settings iniziali
INSERT INTO settings (key, value, description) VALUES
('deposit_rules', '{"type": "fixed", "amount": 70, "currency": "EUR"}'::jsonb, 'Regole acconto prenotazioni'),
('whatsapp_mode', '"click-to-wa"'::jsonb, 'Modalità WhatsApp: click-to-wa o api'),
('email_notifications', '{"admin_enabled": true, "customer_enabled": true, "admin_email": ""}'::jsonb, 'Configurazione notifiche email'),
('whatsapp_number', '""'::jsonb, 'Numero WhatsApp aziendale');

-- ============================================
-- FUNZIONI E TRIGGER
-- ============================================

-- Funzione per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per updated_at su tutte le tabelle
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON routes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Funzione per generare codice riferimento univoco
CREATE OR REPLACE FUNCTION generate_reference_code(prefix TEXT)
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    new_code := prefix || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 8));
    SELECT EXISTS(SELECT 1 FROM bookings WHERE id::TEXT = new_code) INTO exists_check;
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Supabase
-- ============================================

-- Abilita RLS su tutte le tabelle
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy: Solo admin possono vedere/modificare users
CREATE POLICY "Users are viewable by admins" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users are editable by admins" ON users
  FOR ALL USING (auth.role() = 'authenticated');

-- Policy: Vehicles e Routes sono pubblicamente leggibili (per form)
CREATE POLICY "Vehicles are viewable by everyone" ON vehicles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Routes are viewable by everyone" ON routes
  FOR SELECT USING (is_active = true);

-- Policy: Bookings - inserimento pubblico, lettura/modifica solo admin
CREATE POLICY "Bookings are insertable by everyone" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Bookings are viewable by admins" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Bookings are updatable by admins" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Quotes - inserimento pubblico, lettura/modifica solo admin
CREATE POLICY "Quotes are insertable by everyone" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Quotes are viewable by admins" ON quotes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Quotes are updatable by admins" ON quotes
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Notification logs solo admin
CREATE POLICY "Notification logs are viewable by admins" ON notification_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Notification logs are insertable by service" ON notification_logs
  FOR INSERT WITH CHECK (true);

-- Policy: Settings solo admin
CREATE POLICY "Settings are viewable by admins" ON settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Settings are editable by admins" ON settings
  FOR ALL USING (auth.role() = 'authenticated');



///////////////////////DA FARE//////////////////////////////
-- ============================================
-- VISTE UTILI
-- ============================================

-- Vista: Bookings con dettagli completi
CREATE OR REPLACE VIEW bookings_detailed AS
SELECT 
  b.*,
  r.code as route_code_full,
  r.origin_it as route_origin,
  r.destination_it as route_destination,
  r.base_price as route_base_price,
  v.code as vehicle_code_full,
  v.name_it as vehicle_name,
  v.capacity as vehicle_capacity,
  (SELECT COUNT(*) FROM notification_logs WHERE booking_id = b.id AND notification_type = 'email' AND status = 'sent') as emails_sent,
  (SELECT COUNT(*) FROM notification_logs WHERE booking_id = b.id AND notification_type = 'whatsapp' AND status = 'sent') as whatsapp_sent
FROM bookings b
LEFT JOIN routes r ON b.route_id = r.id
LEFT JOIN vehicles v ON b.vehicle_id = v.id;

-- Vista: Quotes con dettagli completi
CREATE OR REPLACE VIEW quotes_detailed AS
SELECT 
  q.*,
  v.code as vehicle_code_full,
  v.name_it as vehicle_name,
  v.capacity as vehicle_capacity,
  (SELECT COUNT(*) FROM notification_logs WHERE quote_id = q.id AND notification_type = 'email' AND status = 'sent') as emails_sent,
  (SELECT COUNT(*) FROM notification_logs WHERE quote_id = q.id AND notification_type = 'whatsapp' AND status = 'sent') as whatsapp_sent
FROM quotes q
LEFT JOIN vehicles v ON q.vehicle_id = v.id;

-- ============================================
-- DATI INIZIALI (Seed)
-- ============================================

-- Inserimento veicoli di esempio (basati sul codice esistente)
INSERT INTO vehicles (code, name_it, name_en, name_fr, name_es, capacity, is_active) VALUES
('carbianca1', 'Car Bianca 1', 'White Car 1', 'Voiture Blanche 1', 'Coche Blanco 1', 4, true),
('carbianca2', 'Car Bianca 2', 'White Car 2', 'Voiture Blanche 2', 'Coche Blanco 2', 4, true),
('carbianca3', 'Car Bianca 3', 'White Car 3', 'Voiture Blanche 3', 'Coche Blanco 3', 4, true),
('carnera1', 'Car Nera 1', 'Black Car 1', 'Voiture Noire 1', 'Coche Negro 1', 4, true),
('carnera2', 'Car Nera 2', 'Black Car 2', 'Voiture Noire 2', 'Coche Negro 2', 4, true),
('carnera3', 'Car Nera 3', 'Black Car 3', 'Voiture Noire 3', 'Coche Negro 3', 4, true);

-- Inserimento tratte standard di esempio (basate sul codice esistente)
INSERT INTO routes (code, origin_it, origin_en, destination_it, destination_en, base_price, is_active, sort_order) VALUES
('como-malpensa', 'Como', 'Como', 'Aeroporto Malpensa', 'Malpensa Airport', 120.00, true, 1),
('como-linate', 'Como', 'Como', 'Aeroporto Linate', 'Linate Airport', 100.00, true, 2),
('como-bergamo', 'Como', 'Como', 'Aeroporto Bergamo', 'Bergamo Airport', 80.00, true, 3),
('como-milano-centro', 'Como', 'Como', 'Milano Centro', 'Milan City Center', 90.00, true, 4),
('como-lugano', 'Como', 'Como', 'Lugano', 'Lugano', 150.00, true, 5),
('como-zurigo', 'Como', 'Como', 'Zurigo', 'Zurich', 250.00, true, 6),
('milano-centro-malpensa', 'Milano Centro', 'Milan City Center', 'Aeroporto Malpensa', 'Malpensa Airport', 60.00, true, 7),
('milano-centro-linate', 'Milano Centro', 'Milan City Center', 'Aeroporto Linate', 'Linate Airport', 50.00, true, 8);

-- ============================================
-- COMMENTI TABELLE (Documentazione)
-- ============================================

COMMENT ON TABLE users IS 'Utenti admin per accesso dashboard';
COMMENT ON TABLE vehicles IS 'Veicoli disponibili';
COMMENT ON TABLE routes IS 'Tratte standard predefinite con prezzi';
COMMENT ON TABLE bookings IS 'Prenotazioni corse standard';
COMMENT ON TABLE quotes IS 'Richieste preventivi personalizzati';
COMMENT ON TABLE notification_logs IS 'Log di tutte le notifiche inviate (email/WhatsApp)';
COMMENT ON TABLE settings IS 'Configurazioni globali sistema';
