// ============================================
// TIPI DATABASE - Lake Como in Car
// TypeScript types per Supabase
// ============================================

export type Language = 'it' | 'en' | 'fr' | 'es';

export type BookingStatus = 'new' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled';
export type QuoteStatus = 'new' | 'quote_sent' | 'confirmed' | 'archived';
export type PaymentStatus = 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded' | 'cancelled';
export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'delivered';
export type NotificationType = 'email' | 'whatsapp';

// ============================================
// TABELLA: users
// ============================================
export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'staff';
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserInsert {
  email: string;
  password_hash: string;
  name: string;
  role?: 'admin' | 'staff';
  is_active?: boolean;
}

// ============================================
// TABELLA: vehicles
// ============================================
export interface Vehicle {
  id: string;
  code: string;
  name_it: string;
  name_en: string | null;
  name_fr: string | null;
  name_es: string | null;
  capacity: number;
  image_url: string | null;
  is_active: boolean;
  price_multiplier: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleInsert {
  code: string;
  name_it: string;
  name_en?: string;
  name_fr?: string;
  name_es?: string;
  capacity: number;
  image_url?: string;
  is_active?: boolean;
  price_multiplier?: number;
}

// ============================================
// TABELLA: routes
// ============================================
export interface Route {
  id: string;
  code: string;
  origin_it: string;
  origin_en: string | null;
  origin_fr: string | null;
  origin_es: string | null;
  destination_it: string;
  destination_en: string | null;
  destination_fr: string | null;
  destination_es: string | null;
  base_price: number;
  distance_km: number | null;
  duration_minutes: number | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface RouteInsert {
  code: string;
  origin_it: string;
  origin_en?: string;
  origin_fr?: string;
  origin_es?: string;
  destination_it: string;
  destination_en?: string;
  destination_fr?: string;
  destination_es?: string;
  base_price: number;
  distance_km?: number;
  duration_minutes?: number;
  is_active?: boolean;
  sort_order?: number;
}

// ============================================
// TABELLA: bookings
// ============================================
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
  service_date: string; // DATE format YYYY-MM-DD
  service_time: string; // TIME format HH:MM
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

// Vista: Booking con dettagli
export interface BookingDetailed extends Booking {
  route_code_full: string | null;
  route_origin: string | null;
  route_destination: string | null;
  route_base_price: number | null;
  vehicle_code_full: string | null;
  vehicle_name: string | null;
  vehicle_capacity: number | null;
  emails_sent: number;
  whatsapp_sent: number;
}

// ============================================
// TABELLA: quotes
// ============================================
export interface Quote {
  id: string;
  language: Language;
  type: 'quote';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  origin: string;
  destination: string;
  route_description: string | null;
  vehicle_id: string | null;
  vehicle_code: string | null;
  service_date: string | null;
  service_time: string | null;
  estimated_arrival_time: string | null;
  passengers: number | null;
  notes: string | null;
  special_requirements: string | null;
  quoted_price: number | null;
  quote_valid_until: string | null;
  quote_notes: string | null;
  status: QuoteStatus;
  privacy_consent: boolean;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
  quote_sent_at: string | null;
  archived_at: string | null;
}

export interface QuoteInsert {
  language: Language;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  origin: string;
  destination: string;
  route_description?: string | null;
  vehicle_id?: string | null;
  vehicle_code?: string | null;
  service_date?: string | null;
  service_time?: string | null;
  estimated_arrival_time?: string | null;
  passengers?: number | null;
  notes?: string | null;
  special_requirements?: string | null;
  privacy_consent: boolean;
  ip_address?: string | null;
  user_agent?: string | null;
}

export interface QuoteUpdate {
  status?: QuoteStatus;
  quoted_price?: number | null;
  quote_valid_until?: string | null;
  quote_notes?: string | null;
  quote_sent_at?: string | null;
  archived_at?: string | null;
}

// Vista: Quote con dettagli
export interface QuoteDetailed extends Quote {
  vehicle_code_full: string | null;
  vehicle_name: string | null;
  vehicle_capacity: number | null;
  emails_sent: number;
  whatsapp_sent: number;
}

// ============================================
// TABELLA: notification_logs
// ============================================
export interface NotificationLog {
  id: string;
  booking_id: string | null;
  quote_id: string | null;
  notification_type: NotificationType;
  notification_subtype: string | null;
  recipient_email: string | null;
  recipient_phone: string | null;
  subject: string | null;
  message_preview: string | null;
  language: Language | null;
  status: NotificationStatus;
  error_message: string | null;
  provider: string | null;
  external_id: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

export interface NotificationLogInsert {
  booking_id?: string | null;
  quote_id?: string | null;
  notification_type: NotificationType;
  notification_subtype?: string | null;
  recipient_email?: string | null;
  recipient_phone?: string | null;
  subject?: string | null;
  message_preview?: string | null;
  language?: Language | null;
  status: NotificationStatus;
  error_message?: string | null;
  provider?: string | null;
  external_id?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
}

// ============================================
// TABELLA: settings
// ============================================
export interface Setting {
  key: string;
  value: Record<string, any>;
  description: string | null;
  updated_at: string;
  updated_by: string | null;
}

export interface DepositRules {
  type: 'fixed' | 'percentage';
  amount?: number;
  percentage?: number;
  currency: string;
}

export interface EmailNotifications {
  admin_enabled: boolean;
  customer_enabled: boolean;
  admin_email: string;
}

export interface Settings {
  deposit_rules: DepositRules;
  whatsapp_mode: 'click-to-wa' | 'api';
  email_notifications: EmailNotifications;
  whatsapp_number: string;
}

// ============================================
// UTILITY TYPES
// ============================================

// Filtri per ricerca bookings
export interface BookingFilters {
  status?: BookingStatus | BookingStatus[];
  payment_status?: PaymentStatus | PaymentStatus[];
  language?: Language | Language[];
  date_from?: string;
  date_to?: string;
  service_date_from?: string;
  service_date_to?: string;
  search?: string; // Ricerca per nome/email/telefono
  limit?: number;
  offset?: number;
  order_by?: 'created_at' | 'service_date' | 'customer_name';
  order?: 'asc' | 'desc';
}

// Filtri per ricerca quotes
export interface QuoteFilters {
  status?: QuoteStatus | QuoteStatus[];
  language?: Language | Language[];
  date_from?: string;
  date_to?: string;
  search?: string;
  limit?: number;
  offset?: number;
  order_by?: 'created_at' | 'service_date' | 'customer_name';
  order?: 'asc' | 'desc';
}

// Statistiche dashboard
export interface DashboardStats {
  bookings: {
    total: number;
    new: number;
    in_progress: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  quotes: {
    total: number;
    new: number;
    quote_sent: number;
    confirmed: number;
    archived: number;
  };
  revenue: {
    total: number;
    deposit: number;
    pending: number;
  };
  recent_bookings: BookingDetailed[];
  recent_quotes: QuoteDetailed[];
}
