'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import RouteForm from './RouteForm';

interface Route {
  id: string;
  code: string;
  origin_it: string;
  origin_en?: string;
  destination_it: string;
  destination_en?: string;
  base_price: number;
  distance_km?: number;
  duration_minutes?: number;
  is_active: boolean;
  pricing_rules_count?: number;
}

export default function RoutesManager() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const response = await fetch('/api/admin/routes');
      if (response.ok) {
        const data = await response.json();
        const routesData = data.routes || [];
        
        // Carica il conteggio delle pricing rules per ogni rotta
        const routesWithCounts = await Promise.all(
          routesData.map(async (route: Route) => {
            try {
              const rulesResponse = await fetch(`/api/admin/pricing-rules?route_id=${route.id}`);
              if (rulesResponse.ok) {
                const rulesData = await rulesResponse.json();
                return {
                  ...route,
                  pricing_rules_count: rulesData.rules?.length || 0,
                };
              }
            } catch (error) {
              console.error('Error loading pricing rules count:', error);
            }
            return { ...route, pricing_rules_count: 0 };
          })
        );
        
        setRoutes(routesWithCounts);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo percorso?')) return;

    try {
      const response = await fetch(`/api/admin/routes/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        loadRoutes();
      } else {
        const details = data.details ? `\n\nDettaglio: ${data.details}` : '';
        const code = data.code ? ` (codice: ${data.code})` : '';
        alert(`Errore durante l'eliminazione${code}${details}`);
      }
    } catch (error) {
      console.error('Error deleting route:', error);
      alert('Errore durante l\'eliminazione');
    }
  };

  const handleEdit = (route: Route) => {
    setEditingRoute(route);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingRoute(null);
    loadRoutes();
  };

  const handleNewRoute = () => {
    setEditingRoute(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Caricamento percorsi...</p>
      </div>
    );
  }

  // Se il form è aperto, mostra solo il form
  if (showForm) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={handleFormClose}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna alla lista percorsi
          </button>
        </div>
        <RouteForm route={editingRoute} onClose={handleFormClose} />
      </div>
    );
  }

  // Altrimenti mostra la lista
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">Gestione Percorsi</h2>
          <p className="text-gray-600 text-sm mt-1">
            Gestisci tratte e condizioni di prezzo
          </p>
        </div>
        <Button
          onClick={handleNewRoute}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuovo Percorso
        </Button>
      </div>

      {/* Lista Percorsi */}
      {routes.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center">
          <p className="text-gray-600 mb-4">Nessun percorso configurato</p>
          <Button onClick={handleNewRoute} variant="primary">
            Crea il primo percorso
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white border-2 border-black p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-black">
                      {route.origin_it} → {route.destination_it}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 border ${
                        route.is_active
                          ? 'border-green-500 text-green-700 bg-green-50'
                          : 'border-gray-400 text-gray-600 bg-gray-50'
                      }`}
                    >
                      {route.is_active ? 'Attivo' : 'Disattivato'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Codice: <span className="font-mono">{route.code}</span>
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Prezzo base: <strong>{route.base_price}€</strong></span>
                    {route.distance_km && (
                      <span>Distanza: {route.distance_km} km</span>
                    )}
                    {route.duration_minutes && (
                      <span>Durata: {route.duration_minutes} min</span>
                    )}
                  </div>
                  {route.pricing_rules_count !== undefined && (
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 border border-blue-300">
                        {route.pricing_rules_count} {route.pricing_rules_count === 1 ? 'condizione' : 'condizioni'} di prezzo
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(route)}
                    className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                    title="Modifica"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(route.id)}
                    className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Elimina"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
