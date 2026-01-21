'use client';

import { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, User, MapPin, Clock, Users, Car, Euro, Trash2, Check, X } from 'lucide-react';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  route_description: string;
  service_date: string;
  service_time: string;
  passengers: number;
  vehicle_code?: string;
  total_price?: number;
  notes?: string;
  status: 'new' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded' | 'cancelled';
  language: string;
  created_at: string;
}

export default function BookingsManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, [selectedStatus]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const url = selectedStatus === 'all' 
        ? '/api/bookings'
        : `/api/bookings?status=${selectedStatus}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        loadBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa prenotazione?')) return;

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 border-blue-300',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-green-100 text-green-800 border-green-300',
    completed: 'bg-gray-100 text-gray-800 border-gray-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
  };

  const statusLabels = {
    new: 'Nuovo',
    in_progress: 'In Lavorazione',
    confirmed: 'Confermato',
    completed: 'Completato',
    cancelled: 'Cancellato',
  };

  const paymentStatusLabels = {
    pending: 'In Attesa',
    deposit_paid: 'Acconto Pagato',
    fully_paid: 'Pagato',
    refunded: 'Rimborsato',
    cancelled: 'Annullato',
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Caricamento prenotazioni...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-black">Prenotazioni</h2>
          <p className="text-gray-600">Gestisci tutte le prenotazioni ricevute</p>
        </div>
        <button
          onClick={loadBookings}
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Ricarica
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'in_progress', 'confirmed', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 border-2 transition-colors ${
              selectedStatus === status
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            {status === 'all' ? 'Tutte' : statusLabels[status as keyof typeof statusLabels]}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border-2 border-gray-200">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">Nessuna prenotazione trovata</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border-2 border-black bg-white overflow-hidden"
            >
              {/* Header compatto */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-bold border-2 ${statusColors[booking.status]}`}>
                        {statusLabels[booking.status]}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(booking.service_date).toLocaleDateString('it-IT')} • {booking.service_time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-black">{booking.customer_name}</h3>
                    <p className="text-sm text-gray-600">{booking.route_description}</p>
                  </div>
                  {booking.total_price && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">€{booking.total_price.toFixed(2)}</p>
                      <p className="text-xs text-gray-600">{paymentStatusLabels[booking.payment_status]}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dettagli espandibili */}
              {expandedId === booking.id && (
                <div className="p-4 bg-gray-50 border-t-2 border-black space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cliente */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700">Cliente</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-500" />
                          <span>{booking.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-500" />
                          <a href={`mailto:${booking.customer_email}`} className="hover:underline">
                            {booking.customer_email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-500" />
                          <a href={`tel:${booking.customer_phone}`} className="hover:underline">
                            {booking.customer_phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Servizio */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700">Servizio</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-500" />
                          <span>{booking.route_description}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-500" />
                          <span>{new Date(booking.service_date).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-500" />
                          <span>{booking.service_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-gray-500" />
                          <span>{booking.passengers} passeggeri</span>
                        </div>
                        {booking.vehicle_code && (
                          <div className="flex items-center gap-2">
                            <Car size={16} className="text-gray-500" />
                            <span>{booking.vehicle_code}</span>
                          </div>
                        )}
                        {booking.total_price && (
                          <div className="flex items-center gap-2">
                            <Euro size={16} className="text-gray-500" />
                            <span className="font-bold">€{booking.total_price.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  {booking.notes && (
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-2">Note</h4>
                      <p className="text-sm text-gray-700 bg-white p-3 border-2 border-gray-200">
                        {booking.notes}
                      </p>
                    </div>
                  )}

                  {/* Azioni */}
                  <div className="flex gap-2 flex-wrap pt-4 border-t-2 border-gray-200">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      disabled={booking.status === 'confirmed'}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Check size={16} />
                      Conferma
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      disabled={booking.status === 'completed'}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Check size={16} />
                      Completa
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      disabled={booking.status === 'cancelled'}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <X size={16} />
                      Annulla
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors ml-auto"
                    >
                      <Trash2 size={16} />
                      Elimina
                    </button>
                  </div>

                  {/* Meta */}
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                    ID: {booking.id} • Lingua: {booking.language.toUpperCase()} • Creato: {new Date(booking.created_at).toLocaleString('it-IT')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
