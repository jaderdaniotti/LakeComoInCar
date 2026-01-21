'use client';

import { useState, useEffect } from 'react';
import { FileText, Mail, Phone, User, MapPin, Clock, Users, Trash2, Check, Send } from 'lucide-react';

interface Quote {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  origin: string;
  destination: string;
  route_description?: string;
  service_date?: string;
  service_time?: string;
  passengers?: number;
  notes?: string;
  special_requirements?: string;
  status: 'new' | 'quote_sent' | 'confirmed' | 'archived';
  quoted_price?: number;
  quote_notes?: string;
  language: string;
  created_at: string;
}

export default function QuotesManager() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');

  useEffect(() => {
    loadQuotes();
  }, [selectedStatus]);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const url = selectedStatus === 'all' 
        ? '/api/quotes'
        : `/api/quotes?status=${selectedStatus}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.quotes) {
        setQuotes(data.quotes);
      }
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        loadQuotes();
      }
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const saveQuote = async (id: string) => {
    try {
      const updates: any = { status: 'quote_sent' };
      if (editPrice) updates.quoted_price = parseFloat(editPrice);
      if (editNotes) updates.quote_notes = editNotes;

      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setEditingId(null);
        setEditPrice('');
        setEditNotes('');
        loadQuotes();
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm('Sei sicuro di voler archiviare questo preventivo?')) return;

    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadQuotes();
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const startEditing = (quote: Quote) => {
    setEditingId(quote.id);
    setEditPrice(quote.quoted_price?.toString() || '');
    setEditNotes(quote.quote_notes || '');
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 border-blue-300',
    quote_sent: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-green-100 text-green-800 border-green-300',
    archived: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const statusLabels = {
    new: 'Nuovo',
    quote_sent: 'Preventivo Inviato',
    confirmed: 'Confermato',
    archived: 'Archiviato',
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Caricamento preventivi...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-black">Preventivi</h2>
          <p className="text-gray-600">Gestisci tutte le richieste di preventivo</p>
        </div>
        <button
          onClick={loadQuotes}
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Ricarica
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'quote_sent', 'confirmed', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 border-2 transition-colors ${
              selectedStatus === status
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            {status === 'all' ? 'Tutti' : statusLabels[status as keyof typeof statusLabels]}
          </button>
        ))}
      </div>

      {/* Quotes List */}
      {quotes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border-2 border-gray-200">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">Nessun preventivo trovato</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="border-2 border-black bg-white overflow-hidden"
            >
              {/* Header compatto */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === quote.id ? null : quote.id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-bold border-2 ${statusColors[quote.status]}`}>
                        {statusLabels[quote.status]}
                      </span>
                      {quote.service_date && (
                        <span className="text-sm text-gray-600">
                          {new Date(quote.service_date).toLocaleDateString('it-IT')}
                          {quote.service_time && ` • ${quote.service_time}`}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-black">{quote.customer_name}</h3>
                    <p className="text-sm text-gray-600">{quote.origin} → {quote.destination}</p>
                  </div>
                  {quote.quoted_price && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">€{quote.quoted_price.toFixed(2)}</p>
                      <p className="text-xs text-gray-600">Preventivo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dettagli espandibili */}
              {expandedId === quote.id && (
                <div className="p-4 bg-gray-50 border-t-2 border-black space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cliente */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700">Cliente</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-500" />
                          <span>{quote.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-500" />
                          <a href={`mailto:${quote.customer_email}`} className="hover:underline">
                            {quote.customer_email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-500" />
                          <a href={`tel:${quote.customer_phone}`} className="hover:underline">
                            {quote.customer_phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Servizio */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700">Dettagli Richiesta</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-500" />
                          <span>{quote.origin} → {quote.destination}</span>
                        </div>
                        {quote.service_date && (
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-500" />
                            <span>{new Date(quote.service_date).toLocaleDateString('it-IT')}</span>
                            {quote.service_time && <span>• {quote.service_time}</span>}
                          </div>
                        )}
                        {quote.passengers && (
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-500" />
                            <span>{quote.passengers} passeggeri</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Note cliente */}
                  {quote.notes && (
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-2">Note Cliente</h4>
                      <p className="text-sm  text-gray-700 bg-white p-3 border-2 border-gray-200">
                        {quote.notes}
                      </p>
                    </div>
                  )}

                  {/* Preventivo (editing) */}
                  {editingId === quote.id ? (
                    <div className="bg-yellow-50 p-4 border-2 border-yellow-300 space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700">Compila Preventivo</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold mb-1">Prezzo (€)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="150.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1">Note Preventivo (opzionale)</label>
                          <textarea
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Dettagli aggiuntivi per il cliente..."
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveQuote(quote.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Send size={16} />
                          Salva e Invia
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditPrice('');
                            setEditNotes('');
                          }}
                          className="px-4 py-2 border-2 border-gray-300 hover:border-black transition-colors"
                        >
                          Annulla
                        </button>
                      </div>
                    </div>
                  ) : quote.quoted_price ? (
                    <div className="bg-green-50 p-4 border-2 border-green-300">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-2">Preventivo Inviato</h4>
                      <p className="text-2xl font-bold text-green-800 mb-2">€{quote.quoted_price.toFixed(2)}</p>
                      {quote.quote_notes && (
                        <p className="text-sm text-gray-700">{quote.quote_notes}</p>
                      )}
                    </div>
                  ) : null}

                  {/* Azioni */}
                  <div className="flex gap-2 flex-wrap pt-4 border-t-2 border-gray-200">
                    {quote.status === 'new' && (
                      <button
                        onClick={() => startEditing(quote)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
                      >
                        <Send size={16} />
                        Invia Preventivo
                      </button>
                    )}
                    {quote.status === 'quote_sent' && (
                      <button
                        onClick={() => updateQuoteStatus(quote.id, 'confirmed')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        <Check size={16} />
                        Conferma
                      </button>
                    )}
                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors ml-auto"
                    >
                      <Trash2 size={16} />
                      Archivia
                    </button>
                  </div>

                  {/* Meta */}
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                    ID: {quote.id} • Lingua: {quote.language.toUpperCase()} • Creato: {new Date(quote.created_at).toLocaleString('it-IT')}
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
