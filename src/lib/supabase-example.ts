// ============================================
// ESEMPIO INTEGRAZIONE SUPABASE
// File di riferimento per implementazione
// ============================================

import { createClient } from '@supabase/supabase-js';
import type { 
  Booking, 
  BookingInsert, 
  Quote, 
  QuoteInsert,
  NotificationLogInsert,
  BookingFilters,
  QuoteFilters 
} from '@/types/database';

// ============================================
// CLIENT SUPABASE
// ============================================

// Client pubblico (per operazioni frontend)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client server-side (per operazioni admin - usa Service Role Key)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// ============================================
// BOOKINGS - Esempi di utilizzo
// ============================================

/**
 * Crea una nuova prenotazione
 */
export async function createBooking(data: BookingInsert): Promise<Booking> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return booking;
}

/**
 * Ottiene una prenotazione per ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

/**
 * Ottiene prenotazioni con filtri (per dashboard admin)
 */
export async function getBookings(filters: BookingFilters = {}) {
  let query = supabaseAdmin
    .from('bookings_detailed')
    .select('*');

  // Filtri
  if (filters.status) {
    if (Array.isArray(filters.status)) {
      query = query.in('status', filters.status);
    } else {
      query = query.eq('status', filters.status);
    }
  }

  if (filters.payment_status) {
    if (Array.isArray(filters.payment_status)) {
      query = query.in('payment_status', filters.payment_status);
    } else {
      query = query.eq('payment_status', filters.payment_status);
    }
  }

  if (filters.date_from) {
    query = query.gte('created_at', filters.date_from);
  }

  if (filters.date_to) {
    query = query.lte('created_at', filters.date_to);
  }

  if (filters.service_date_from) {
    query = query.gte('service_date', filters.service_date_from);
  }

  if (filters.service_date_to) {
    query = query.lte('service_date', filters.service_date_to);
  }

  if (filters.search) {
    query = query.or(`customer_name.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%,customer_phone.ilike.%${filters.search}%`);
  }

  // Ordinamento
  const orderBy = filters.order_by || 'created_at';
  const order = filters.order || 'desc';
  query = query.order(orderBy, { ascending: order === 'asc' });

  // Paginazione
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Aggiorna stato prenotazione
 */
export async function updateBookingStatus(
  id: string, 
  status: Booking['status'],
  notes?: string
) {
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .update({ 
      status,
      notes: notes || undefined,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// QUOTES - Esempi di utilizzo
// ============================================

/**
 * Crea una nuova richiesta preventivo
 */
export async function createQuote(data: QuoteInsert): Promise<Quote> {
  const { data: quote, error } = await supabase
    .from('quotes')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return quote;
}

/**
 * Ottiene preventivi con filtri (per dashboard admin)
 */
export async function getQuotes(filters: QuoteFilters = {}) {
  let query = supabaseAdmin
    .from('quotes_detailed')
    .select('*');

  // Applica filtri simili a bookings
  if (filters.status) {
    if (Array.isArray(filters.status)) {
      query = query.in('status', filters.status);
    } else {
      query = query.eq('status', filters.status);
    }
  }

  if (filters.search) {
    query = query.or(`customer_name.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%,customer_phone.ilike.%${filters.search}%,origin.ilike.%${filters.search}%,destination.ilike.%${filters.search}%`);
  }

  const orderBy = filters.order_by || 'created_at';
  const order = filters.order || 'desc';
  query = query.order(orderBy, { ascending: order === 'asc' });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Aggiorna preventivo (quando admin invia quote)
 */
export async function updateQuote(
  id: string,
  quotedPrice: number,
  quoteNotes?: string,
  validUntil?: string
) {
  const { data, error } = await supabaseAdmin
    .from('quotes')
    .update({
      quoted_price: quotedPrice,
      quote_notes: quoteNotes,
      quote_valid_until: validUntil,
      status: 'quote_sent',
      quote_sent_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// NOTIFICATION LOGS
// ============================================

/**
 * Registra un tentativo di notifica
 */
export async function logNotification(data: NotificationLogInsert) {
  const { data: log, error } = await supabaseAdmin
    .from('notification_logs')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return log;
}

/**
 * Aggiorna stato notifica (es. dopo invio email)
 */
export async function updateNotificationStatus(
  id: string,
  status: 'sent' | 'failed' | 'delivered',
  externalId?: string,
  errorMessage?: string
) {
  const updateData: any = {
    status,
    updated_at: new Date().toISOString()
  };

  if (status === 'sent' || status === 'delivered') {
    updateData.sent_at = new Date().toISOString();
  }

  if (status === 'delivered') {
    updateData.delivered_at = new Date().toISOString();
  }

  if (externalId) {
    updateData.external_id = externalId;
  }

  if (errorMessage) {
    updateData.error_message = errorMessage;
  }

  const { data, error } = await supabaseAdmin
    .from('notification_logs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// VEHICLES & ROUTES (Pubblici)
// ============================================

/**
 * Ottiene tutti i veicoli attivi
 */
export async function getActiveVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .order('code');

  if (error) throw error;
  return data;
}

/**
 * Ottiene tutte le tratte attive
 */
export async function getActiveRoutes() {
  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data;
}

// ============================================
// STATISTICHE DASHBOARD
// ============================================

/**
 * Ottiene statistiche per dashboard
 */
export async function getDashboardStats() {
  // Conta prenotazioni per stato
  const { data: bookingsByStatus } = await supabaseAdmin
    .from('bookings')
    .select('status');

  // Conta preventivi per stato
  const { data: quotesByStatus } = await supabaseAdmin
    .from('quotes')
    .select('status');

  // Revenue totale
  const { data: revenue } = await supabaseAdmin
    .from('bookings')
    .select('total_price, deposit_amount, payment_status');

  // Ultime prenotazioni
  const { data: recentBookings } = await supabaseAdmin
    .from('bookings_detailed')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // Ultimi preventivi
  const { data: recentQuotes } = await supabaseAdmin
    .from('quotes_detailed')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // Elabora statistiche
  const bookings = {
    total: bookingsByStatus?.length || 0,
    new: bookingsByStatus?.filter(b => b.status === 'new').length || 0,
    in_progress: bookingsByStatus?.filter(b => b.status === 'in_progress').length || 0,
    confirmed: bookingsByStatus?.filter(b => b.status === 'confirmed').length || 0,
    completed: bookingsByStatus?.filter(b => b.status === 'completed').length || 0,
    cancelled: bookingsByStatus?.filter(b => b.status === 'cancelled').length || 0,
  };

  const quotes = {
    total: quotesByStatus?.length || 0,
    new: quotesByStatus?.filter(q => q.status === 'new').length || 0,
    quote_sent: quotesByStatus?.filter(q => q.status === 'quote_sent').length || 0,
    confirmed: quotesByStatus?.filter(q => q.status === 'confirmed').length || 0,
    archived: quotesByStatus?.filter(q => q.status === 'archived').length || 0,
  };

  const totalRevenue = revenue?.reduce((sum, r) => sum + (r.total_price || 0), 0) || 0;
  const totalDeposit = revenue?.reduce((sum, r) => sum + (r.deposit_amount || 0), 0) || 0;
  const pendingRevenue = revenue?.filter(r => r.payment_status === 'pending').reduce((sum, r) => sum + (r.total_price || 0), 0) || 0;

  return {
    bookings,
    quotes,
    revenue: {
      total: totalRevenue,
      deposit: totalDeposit,
      pending: pendingRevenue,
    },
    recent_bookings: recentBookings || [],
    recent_quotes: recentQuotes || [],
  };
}

// ============================================
// ESEMPIO: Creazione prenotazione completa
// ============================================

export async function createBookingWithNotifications(
  bookingData: BookingInsert,
  customerEmail: string,
  customerPhone: string
) {
  // 1. Crea prenotazione
  const booking = await createBooking(bookingData);

  // 2. Log tentativo email cliente
  await logNotification({
    booking_id: booking.id,
    notification_type: 'email',
    notification_subtype: 'customer_confirmation',
    recipient_email: customerEmail,
    language: booking.language,
    status: 'pending',
    provider: 'resend', // o il tuo provider
  });

  // 3. Log tentativo email admin
  await logNotification({
    booking_id: booking.id,
    notification_type: 'email',
    notification_subtype: 'admin_notification',
    recipient_email: process.env.ADMIN_EMAIL!,
    language: booking.language,
    status: 'pending',
    provider: 'resend',
  });

  // 4. Log tentativo WhatsApp (click-to-wa)
  await logNotification({
    booking_id: booking.id,
    notification_type: 'whatsapp',
    notification_subtype: 'admin_notification',
    recipient_phone: customerPhone,
    language: booking.language,
    status: 'pending',
    provider: 'click-to-wa',
  });

  return booking;
}
