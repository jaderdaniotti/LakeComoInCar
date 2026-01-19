'use client';

import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface PricingRuleFormProps {
  routeId: string;
  rule?: any;
  onClose: () => void;
}

export default function PricingRuleForm({ routeId, rule, onClose }: PricingRuleFormProps) {
  const [formData, setFormData] = useState({
    rule_name: '',
    rule_type: 'passenger_based',
    price_type: 'fixed',
    price_value: '',
    priority: '10',
    is_active: true,
    // Condizioni
    passengers_min: '',
    passengers_max: '',
    date_from: '',
    date_to: '',
    days_of_week: [] as number[],
    time_from: '',
    time_to: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (rule) {
      const conditions = rule.conditions || {};
      setFormData({
        rule_name: rule.rule_name || '',
        rule_type: rule.rule_type || 'passenger_based',
        price_type: rule.price_type || 'fixed',
        price_value: rule.price_value?.toString() || '',
        priority: rule.priority?.toString() || '10',
        is_active: rule.is_active ?? true,
        passengers_min: conditions.passengers_min?.toString() || '',
        passengers_max: conditions.passengers_max?.toString() || '',
        date_from: conditions.date_from || '',
        date_to: conditions.date_to || '',
        days_of_week: conditions.days_of_week || [],
        time_from: conditions.time_from || '',
        time_to: conditions.time_to || '',
      });
    }
  }, [rule]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Costruisci le condizioni basate sul tipo di regola
      const conditions: any = {};
      
      if (formData.rule_type === 'passenger_based') {
        if (formData.passengers_min) conditions.passengers_min = parseInt(formData.passengers_min);
        if (formData.passengers_max) conditions.passengers_max = parseInt(formData.passengers_max);
      }
      
      if (formData.rule_type === 'season_based' || formData.rule_type === 'date_based') {
        if (formData.date_from) conditions.date_from = formData.date_from;
        if (formData.date_to) conditions.date_to = formData.date_to;
      }
      
      if (formData.rule_type === 'day_of_week') {
        conditions.days_of_week = formData.days_of_week;
      }
      
      if (formData.rule_type === 'time_based') {
        if (formData.time_from) conditions.time_from = formData.time_from;
        if (formData.time_to) conditions.time_to = formData.time_to;
      }

      const payload = {
        route_id: routeId,
        rule_name: formData.rule_name,
        rule_type: formData.rule_type,
        price_type: formData.price_type,
        price_value: parseFloat(formData.price_value),
        priority: parseInt(formData.priority),
        is_active: formData.is_active,
        conditions,
      };

      const url = rule
        ? `/api/admin/pricing-rules/${rule.id}`
        : '/api/admin/pricing-rules';
      
      const method = rule ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore durante il salvataggio');
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDayOfWeek = (day: number) => {
    setFormData(prev => ({
      ...prev,
      days_of_week: prev.days_of_week.includes(day)
        ? prev.days_of_week.filter(d => d !== day)
        : [...prev.days_of_week, day]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b-2 border-black p-6 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-black">
            {rule ? 'Modifica Regola' : 'Nuova Regola di Prezzo'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}

          <Input
            label="Nome Regola"
            value={formData.rule_name}
            onChange={(e) => setFormData({ ...formData, rule_name: e.target.value })}
            required
            placeholder="es: Alta Stagione 2-4 Passeggeri"
          />

          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Tipo Regola <span className="text-black ml-1">*</span>
            </label>
            <select
              value={formData.rule_type}
              onChange={(e) => setFormData({ ...formData, rule_type: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="passenger_based">Numero Passeggeri</option>
              <option value="season_based">Stagionalità</option>
              <option value="date_based">Data Specifica</option>
              <option value="day_of_week">Giorno Settimana</option>
              <option value="time_based">Orario</option>
            </select>
          </div>

          {/* Condizioni basate sul tipo */}
          {formData.rule_type === 'passenger_based' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Passeggeri Min"
                type="number"
                value={formData.passengers_min}
                onChange={(e) => setFormData({ ...formData, passengers_min: e.target.value })}
                min="1"
                placeholder="1"
              />
              <Input
                label="Passeggeri Max"
                type="number"
                value={formData.passengers_max}
                onChange={(e) => setFormData({ ...formData, passengers_max: e.target.value })}
                min="1"
                placeholder="4"
              />
            </div>
          )}

          {(formData.rule_type === 'season_based' || formData.rule_type === 'date_based') && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data Inizio"
                type="date"
                value={formData.date_from}
                onChange={(e) => setFormData({ ...formData, date_from: e.target.value })}
              />
              <Input
                label="Data Fine"
                type="date"
                value={formData.date_to}
                onChange={(e) => setFormData({ ...formData, date_to: e.target.value })}
              />
            </div>
          )}

          {formData.rule_type === 'day_of_week' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Giorni della Settimana
              </label>
              <div className="flex gap-2">
                {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDayOfWeek(idx + 1)}
                    className={`px-3 py-2 border-2 transition-all ${
                      formData.days_of_week.includes(idx + 1)
                        ? 'border-black bg-black text-white'
                        : 'border-black text-black hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {formData.rule_type === 'time_based' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Ora Inizio"
                type="time"
                value={formData.time_from}
                onChange={(e) => setFormData({ ...formData, time_from: e.target.value })}
              />
              <Input
                label="Ora Fine"
                type="time"
                value={formData.time_to}
                onChange={(e) => setFormData({ ...formData, time_to: e.target.value })}
              />
            </div>
          )}

          {/* Prezzo */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Tipo Prezzo <span className="text-black ml-1">*</span>
            </label>
            <select
              value={formData.price_type}
              onChange={(e) => setFormData({ ...formData, price_type: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="fixed">Prezzo Fisso</option>
              <option value="modifier">Modificatore (%)</option>
            </select>
          </div>

          <Input
            label={formData.price_type === 'fixed' ? 'Prezzo (€)' : 'Percentuale (%)'}
            type="number"
            step="0.01"
            value={formData.price_value}
            onChange={(e) => setFormData({ ...formData, price_value: e.target.value })}
            required
            placeholder={formData.price_type === 'fixed' ? '180.00' : '20'}
          />

          <Input
            label="Priorità"
            type="number"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            required
            placeholder="10"
            help="Più alto = maggiore precedenza (100 = massima)"
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active_rule"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 border-2 border-black"
            />
            <label htmlFor="is_active_rule" className="font-medium text-black">
              Regola attiva
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
              {loading ? 'Salvataggio...' : rule ? 'Aggiorna' : 'Crea Regola'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
