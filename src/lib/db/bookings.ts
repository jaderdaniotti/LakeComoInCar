import { supabaseAdmin } from '@/src/lib/supabase';

// Types
export interface CreateBookingData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  route_id?: string;
  route_code?: string;
  route_description?: string;
  vehicle_id?: string;
  vehicle_code?: string;
  service_date: string;
  service_time: string;
  passengers: number;
  notes?: string;
  special_requirements?: string;
  total_price?: number;
  payment_method?: 'online' | 'cash' | 'mixed';
  language?: string;
  privacy_consent?: boolean;
  terms_accepted?: boolean;
  ip_address?: string;
  user_agent?: string;
}

export interface UpdateBookingData {
  status?: 'new' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled';
  payment_status?: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded' | 'cancelled';
  total_price?: number;
  notes?: string;
  cancelled_reason?: string;
}

// Create a new booking
export async function createBooking(bookingData: CreateBookingData) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([{
        ...bookingData,
        status: 'new',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { data: null, error };
  }
}

// Get all bookings with optional filters
export async function getBookings(filters?: {
  status?: string;
  payment_status?: string;
  service_date_from?: string;
  service_date_to?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.payment_status) {
      query = query.eq('payment_status', filters.payment_status);
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
    console.error('Error fetching bookings:', error);
    return { data: null, error, count: 0 };
  }
}

// Get a single booking by ID
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

// Update a booking
export async function updateBooking(id: string, updates: UpdateBookingData) {
  try {
    const updateData: any = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // Se lo stato è cancelled, aggiungi il timestamp
    if (updates.status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { data: null, error };
  }
}

// Delete a booking (soft delete by setting status to cancelled)
export async function deleteBooking(id: string, reason?: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancelled_reason: reason || 'Deleted by admin',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { data: null, error };
  }
}

// Get booking statistics
export async function getBookingStats() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Total bookings
    const { count: totalCount } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    // New bookings (status: new)
    const { count: newCount } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    // Confirmed bookings
    const { count: confirmedCount } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed');

    // Today's bookings
    const { count: todayCount } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('service_date', today);

    // Upcoming bookings (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const { count: upcomingCount } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .gte('service_date', today)
      .lte('service_date', nextWeek.toISOString().split('T')[0]);

    // Total revenue (sum of total_price for fully_paid bookings)
    const { data: revenueData } = await supabaseAdmin
      .from('bookings')
      .select('total_price')
      .eq('payment_status', 'fully_paid');

    const totalRevenue = revenueData?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;

    return {
      data: {
        total: totalCount || 0,
        new: newCount || 0,
        confirmed: confirmedCount || 0,
        today: todayCount || 0,
        upcoming: upcomingCount || 0,
        totalRevenue,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    return {
      data: {
        total: 0,
        new: 0,
        confirmed: 0,
        today: 0,
        upcoming: 0,
        totalRevenue: 0,
      },
      error,
    };
  }
}

// Search bookings by customer name, email or phone
export async function searchBookings(searchTerm: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .or(`customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%,customer_phone.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching bookings:', error);
    return { data: null, error };
  }
}
