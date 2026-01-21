import { supabaseAdmin } from '@/src/lib/supabase';

// Types
export interface CreateQuoteData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  origin: string;
  destination: string;
  route_description?: string;
  vehicle_id?: string;
  vehicle_code?: string;
  service_date?: string;
  service_time?: string;
  estimated_arrival_time?: string;
  passengers?: number;
  notes?: string;
  special_requirements?: string;
  language?: string;
  privacy_consent?: boolean;
  ip_address?: string;
  user_agent?: string;
}

export interface UpdateQuoteData {
  status?: 'new' | 'quote_sent' | 'confirmed' | 'archived';
  quoted_price?: number;
  quote_valid_until?: string;
  quote_notes?: string;
  quote_sent_at?: string;
}

// Create a new quote
export async function createQuote(quoteData: CreateQuoteData) {
  try {
    const { data, error } = await supabaseAdmin
      .from('quotes')
      .insert([{
        ...quoteData,
        status: 'new',
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating quote:', error);
    return { data: null, error };
  }
}

// Get all quotes with optional filters
export async function getQuotes(filters?: {
  status?: string;
  service_date_from?: string;
  service_date_to?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabaseAdmin
      .from('quotes')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.service_date_from) {
      query = query.gte('service_date', filters.service_date_from);
    }
    if (filters?.service_date_to) {
      query = query.lte('service_date', filters.service_date_to);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { data, error: null, count };
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return { data: null, error, count: 0 };
  }
}

// Get a single quote by ID
export async function getQuoteById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { data: null, error };
  }
}

// Update a quote
export async function updateQuote(id: string, updates: UpdateQuoteData) {
  try {
    const updateData: any = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // Se lo stato è quote_sent, aggiungi il timestamp
    if (updates.status === 'quote_sent' && !updates.quote_sent_at) {
      updateData.quote_sent_at = new Date().toISOString();
    }

    // Se lo stato è archived, aggiungi il timestamp
    if (updates.status === 'archived') {
      updateData.archived_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('quotes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating quote:', error);
    return { data: null, error };
  }
}

// Delete a quote (soft delete by setting status to archived)
export async function deleteQuote(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('quotes')
      .update({
        status: 'archived',
        archived_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error deleting quote:', error);
    return { data: null, error };
  }
}

// Get quote statistics
export async function getQuoteStats() {
  try {
    // Total quotes
    const { count: totalCount } = await supabaseAdmin
      .from('quotes')
      .select('*', { count: 'exact', head: true });

    // New quotes (status: new)
    const { count: newCount } = await supabaseAdmin
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    // Quote sent
    const { count: sentCount } = await supabaseAdmin
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'quote_sent');

    // Confirmed quotes
    const { count: confirmedCount } = await supabaseAdmin
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed');

    // Pending quotes (new or quote_sent)
    const { count: pendingCount } = await supabaseAdmin
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .in('status', ['new', 'quote_sent']);

    return {
      data: {
        total: totalCount || 0,
        new: newCount || 0,
        sent: sentCount || 0,
        confirmed: confirmedCount || 0,
        pending: pendingCount || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching quote stats:', error);
    return {
      data: {
        total: 0,
        new: 0,
        sent: 0,
        confirmed: 0,
        pending: 0,
      },
      error,
    };
  }
}

// Search quotes by customer name, email or phone
export async function searchQuotes(searchTerm: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('quotes')
      .select('*')
      .or(`customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%,customer_phone.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching quotes:', error);
    return { data: null, error };
  }
}

// Convert a quote to a booking
export async function convertQuoteToBooking(quoteId: string, bookingData: {
  route_id?: string;
  route_code?: string;
  vehicle_id?: string;
  vehicle_code?: string;
  total_price?: number;
  payment_method?: 'online' | 'cash' | 'mixed';
}) {
  try {
    // Get the quote
    const { data: quote, error: quoteError } = await getQuoteById(quoteId);
    if (quoteError || !quote) {
      throw new Error('Quote not found');
    }

    // Create the booking from the quote
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert([{
        customer_name: quote.customer_name,
        customer_email: quote.customer_email,
        customer_phone: quote.customer_phone,
        route_id: bookingData.route_id,
        route_code: bookingData.route_code,
        route_description: quote.route_description || `${quote.origin} → ${quote.destination}`,
        vehicle_id: bookingData.vehicle_id,
        vehicle_code: bookingData.vehicle_code,
        service_date: quote.service_date,
        service_time: quote.service_time,
        passengers: quote.passengers || 1,
        notes: quote.notes,
        special_requirements: quote.special_requirements,
        total_price: bookingData.total_price || quote.quoted_price,
        payment_method: bookingData.payment_method || 'pending',
        language: quote.language,
        privacy_consent: quote.privacy_consent,
        status: 'new',
        payment_status: 'pending',
      }])
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Update the quote status to confirmed
    await updateQuote(quoteId, { status: 'confirmed' });

    return { data: booking, error: null };
  } catch (error) {
    console.error('Error converting quote to booking:', error);
    return { data: null, error };
  }
}
