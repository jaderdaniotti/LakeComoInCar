'use client';

import { useState, useEffect, FormEvent } from 'react';
import {  Plus, Trash2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface RouteFormProps {
  route?: any;
  onClose: () => void;
}

interface PriceCondition {
  id: string;
  name: string;
  passengers_min?: number;
  passengers_max?: number;
  date_from?: string;
  date_to?: string;
  days_of_week?: number[];
  time_from?: string;
  time_to?: string;
  price: number;
}

export default function RouteForm({ route, onClose }: RouteFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    origin_it: '',
    origin_en: '',
    origin_fr: '',
    origin_es: '',
    destination_it: '',
    destination_en: '',
    destination_fr: '',
    destination_es: '',
    base_price: '',
    distance_km: '',
    duration_minutes: '',
    is_active: true,
  });
  const [priceConditions, setPriceConditions] = useState<PriceCondition[]>([
    {
      id: '1',
      name: 'Prezzo Base',
      passengers_min: 1,
      passengers_max: 4,
      price: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (route) {
      setFormData({
        code: route.code || '',
        origin_it: route.origin_it || '',
        origin_en: route.origin_en || '',
        origin_fr: route.origin_fr || '',
        origin_es: route.origin_es || '',
        destination_it: route.destination_it || '',
        destination_en: route.destination_en || '',
        destination_fr: route.destination_fr || '',
        destination_es: route.destination_es || '',
        base_price: route.base_price?.toString() || '',
        distance_km: route.distance_km?.toString() || '',
        duration_minutes: route.duration_minutes?.toString() || '',
        is_active: route.is_active ?? true,
      });
      
      // Carica le condizioni di prezzo esistenti
      loadPricingRules(route.id);
    }
  }, [route]);

  const loadPricingRules = async (routeId: string) => {
    try {
      const response = await fetch(`/api/admin/pricing-rules?route_id=${routeId}`);
      if (response.ok) {
        const data = await response.json();
        const rules = data.rules || [];
        
        if (rules.length > 0) {
          // Converti le pricing rules in PriceCondition
          const conditions: PriceCondition[] = rules.map((rule: any) => ({
            id: rule.id,
            name: rule.rule_name,
            passengers_min: rule.conditions?.passengers_min,
            passengers_max: rule.conditions?.passengers_max,
            date_from: rule.conditions?.date_from,
            date_to: rule.conditions?.date_to,
            days_of_week: rule.conditions?.days_of_week || [],
            time_from: rule.conditions?.time_from,
            time_to: rule.conditions?.time_to,
            price: parseFloat(rule.price_value) || 0,
          }));
          
          setPriceConditions(conditions);
        }
      }
    } catch (error) {
      console.error('Error loading pricing rules:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Salva la rotta
      const routeUrl = route
        ? `/api/admin/routes/${route.id}`
        : '/api/admin/routes';
      
      const routeMethod = route ? 'PUT' : 'POST';

      const routeResponse = await fetch(routeUrl, {
        method: routeMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          base_price: parseFloat(formData.base_price),
          distance_km: formData.distance_km ? parseInt(formData.distance_km) : null,
          duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
        }),
      });

      if (!routeResponse.ok) {
        const data = await routeResponse.json();
        throw new Error(data.error || 'Errore durante il salvataggio della rotta');
      }

      const { route: savedRoute } = await routeResponse.json();
      const routeId = savedRoute.id;

      // 2. Salva tutte le condizioni di prezzo
      // Prima elimina le vecchie (se in modifica)
      if (route) {
        await fetch(`/api/admin/pricing-rules?route_id=${routeId}`, {
          method: 'DELETE',
        });
      }

      // Poi crea le nuove
      for (const condition of priceConditions) {
        const conditions: any = {};
        
        if (condition.passengers_min) conditions.passengers_min = condition.passengers_min;
        if (condition.passengers_max) conditions.passengers_max = condition.passengers_max;
        if (condition.date_from) conditions.date_from = condition.date_from;
        if (condition.date_to) conditions.date_to = condition.date_to;
        if (condition.days_of_week && condition.days_of_week.length > 0) {
          conditions.days_of_week = condition.days_of_week;
        }
        if (condition.time_from) conditions.time_from = condition.time_from;
        if (condition.time_to) conditions.time_to = condition.time_to;

        const rulePayload = {
          route_id: routeId,
          rule_name: condition.name,
          rule_type: 'combined', // Tipo combinato per tutte le condizioni
          conditions: conditions,
          price_type: 'fixed',
          price_value: condition.price,
          priority: 10,
          is_active: true,
        };

        console.log('Creating pricing rule:', rulePayload);

        const ruleResponse = await fetch('/api/admin/pricing-rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rulePayload),
        });

        if (!ruleResponse.ok) {
          const ruleError = await ruleResponse.json();
          console.error('Error creating pricing rule:', ruleError);
          throw new Error(ruleError.error || 'le condizioni aggiuntive della corsa non sono state salvate');
        }

        const ruleResult = await ruleResponse.json();
        console.log('Pricing rule created:', ruleResult);
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPriceCondition = () => {
    setPriceConditions([
      ...priceConditions,
      {
        id: Date.now().toString(),
        name: `Condizione ${priceConditions.length + 1}`,
        price: 0,
      },
    ]);
  };

  const removePriceCondition = (id: string) => {
    if (priceConditions.length <= 1) {
      alert('Devi avere almeno una condizione di prezzo');
      return;
    }
    setPriceConditions(priceConditions.filter((c) => c.id !== id));
  };

  const updatePriceCondition = (id: string, updates: Partial<PriceCondition>) => {
    setPriceConditions(
      priceConditions.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const toggleDayOfWeek = (conditionId: string, day: number) => {
    setPriceConditions(
      priceConditions.map((c) => {
        if (c.id !== conditionId) return c;
        const currentDays = c.days_of_week || [];
        return {
          ...c,
          days_of_week: currentDays.includes(day)
            ? currentDays.filter((d) => d !== day)
            : [...currentDays, day],
        };
      })
    );
  };

  return (
    <div className="bg-white border-2 border-black">
      {/* Header */}
      <div className="border-b-2 border-black p-6">
        <h2 className="text-2xl font-bold text-black">
          {route ? 'Modifica Percorso' : 'Nuovo Percorso'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Compila tutti i campi e definisci le condizioni di prezzo
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Informazioni Base */}
          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-xl font-bold text-black mb-4">Informazioni Base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Codice Percorso"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                placeholder="es: como-milano"
              />
              <Input
                label="Prezzo Base Riferimento (€)"
                type="number"
                step="0.01"
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                required
                placeholder="150.00"
                help="Prezzo di riferimento, verrà sovrascritto dalle condizioni"
              />
            </div>
          </div>

          {/* Origine Multilingua */}
          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-xl font-bold text-black mb-4">Origine</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Italiano"
                value={formData.origin_it}
                onChange={(e) => setFormData({ ...formData, origin_it: e.target.value })}
                required
                placeholder="Como"
              />
              <Input
                label="Inglese"
                value={formData.origin_en}
                onChange={(e) => setFormData({ ...formData, origin_en: e.target.value })}
                placeholder="Como"
              />
              <Input
                label="Francese"
                value={formData.origin_fr}
                onChange={(e) => setFormData({ ...formData, origin_fr: e.target.value })}
                placeholder="Côme"
              />
              <Input
                label="Spagnolo"
                value={formData.origin_es}
                onChange={(e) => setFormData({ ...formData, origin_es: e.target.value })}
                placeholder="Como"
              />
            </div>
          </div>

          {/* Destinazione Multilingua */}
          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-xl font-bold text-black mb-4">Destinazione</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Italiano"
                value={formData.destination_it}
                onChange={(e) => setFormData({ ...formData, destination_it: e.target.value })}
                required
                placeholder="Milano"
              />
              <Input
                label="Inglese"
                value={formData.destination_en}
                onChange={(e) => setFormData({ ...formData, destination_en: e.target.value })}
                placeholder="Milan"
              />
              <Input
                label="Francese"
                value={formData.destination_fr}
                onChange={(e) => setFormData({ ...formData, destination_fr: e.target.value })}
                placeholder="Milan"
              />
              <Input
                label="Spagnolo"
                value={formData.destination_es}
                onChange={(e) => setFormData({ ...formData, destination_es: e.target.value })}
                placeholder="Milán"
              />
            </div>
          </div>

          {/* Condizioni di Prezzo */}
          <div className="bg-blue-50 p-6 border-2 border-black">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-black">Condizioni di Prezzo</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Definisci il prezzo in base a numero persone, periodo, giorni e orari
                </p>
              </div>
              <Button
                type="button"
                onClick={addPriceCondition}
                variant="primary"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Aggiungi Condizione
              </Button>
            </div>

            <div className="space-y-4">
              {priceConditions.map((condition) => (
                <div key={condition.id} className="bg-white border-2 border-black p-4">
                  <div className="flex justify-between items-start gap-1 mb-4">
                    <Input
                      label="Nome Condizione"
                      value={condition.name}
                      onChange={(e) =>
                        updatePriceCondition(condition.id, { name: e.target.value })
                      }
                      placeholder="es: 2-4 Persone Alta Stagione"
                      className="flex-1 mr-4"
                    />
                    {priceConditions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePriceCondition(condition.id)}
                        className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all mt-7"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Numero Passeggeri */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2 text-black">
                        Numero Passeggeri
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={condition.passengers_min || ''}
                          onChange={(e) =>
                            updatePriceCondition(condition.id, {
                              passengers_min: e.target.value ? parseInt(e.target.value) : undefined,
                            })
                          }
                          min="1"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={condition.passengers_max || ''}
                          onChange={(e) =>
                            updatePriceCondition(condition.id, {
                              passengers_max: e.target.value ? parseInt(e.target.value) : undefined,
                            })
                          }
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Periodo */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2 text-black">
                        Periodo (Opzionale)
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          placeholder="Da"
                          value={condition.date_from || ''}
                          onChange={(e) =>
                            updatePriceCondition(condition.id, { date_from: e.target.value })
                          }
                        />
                        <Input
                          type="date"
                          placeholder="A"
                          value={condition.date_to || ''}
                          onChange={(e) =>
                            updatePriceCondition(condition.id, { date_to: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Orario */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2 text-black">
                        Orario (Opzionale)
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="time"
                          placeholder="Da"
                          value={condition.time_from || ''}
                          onChange={(e) =>
                            updatePriceCondition(condition.id, { time_from: e.target.value })
                          }
                        />
                        <Input
                          type="time"
                          placeholder="A"
                          value={condition.time_to || ''}
                          onChange={(e) =>
                            updatePriceCondition(condition.id, { time_to: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Giorni Settimana */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                      Giorni Settimana (Opzionale)
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleDayOfWeek(condition.id, idx + 1)}
                          className={`px-3 py-2 border-2 transition-all text-sm ${
                            (condition.days_of_week || []).includes(idx + 1)
                              ? 'border-black bg-black text-white'
                              : 'border-black text-black hover:bg-gray-100'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prezzo */}
                  <div className="mt-4">
                    <Input
                      label="Prezzo (€)"
                      type="number"
                      step="0.01"
                      value={condition.price || ''}
                      onChange={(e) =>
                        updatePriceCondition(condition.id, {
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      required
                      placeholder="180.00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dettagli Aggiuntivi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Distanza (km)"
              type="number"
              value={formData.distance_km}
              onChange={(e) => setFormData({ ...formData, distance_km: e.target.value })}
              placeholder="50"
            />
            <Input
              label="Durata (minuti)"
              type="number"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
              placeholder="45"
            />
          </div>

          {/* Stato */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 border-2 border-black"
            />
            <label htmlFor="is_active" className="font-medium text-black">
              Percorso attivo
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t-2 border-black">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Salvataggio...' : route ? 'Aggiorna Percorso' : 'Crea Percorso'}
            </Button>
          </div>
        </form>
    </div>
  );
}
