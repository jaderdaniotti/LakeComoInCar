'use client';

import { useState, useEffect, FormEvent } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface GlobalRuleFormProps {
  rule?: any;
  onClose: () => void;
}

export default function GlobalRuleForm({ rule, onClose }: GlobalRuleFormProps) {
  const [formData, setFormData] = useState({
    rule_name: '',
    modifier_type: 'percentage' as 'percentage' | 'fixed_amount',
    modifier_value: '',
    priority: '10',
    is_active: true,
    passengers_min: '',
    passengers_max: '',
    date_from: '',
    date_to: '',
    time_from: '',
    time_to: '',
    days_of_week: [] as number[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (rule) {
      setFormData({
        rule_name: rule.rule_name || '',
        modifier_type: rule.modifier_type || 'percentage',
        modifier_value: rule.modifier_value?.toString() || '',
        priority: rule.priority?.toString() || '10',
        is_active: rule.is_active ?? true,
        passengers_min: rule.conditions?.passengers_min?.toString() || '',
        passengers_max: rule.conditions?.passengers_max?.toString() || '',
        date_from: rule.conditions?.date_from || '',
        date_to: rule.conditions?.date_to || '',
        time_from: rule.conditions?.time_from || '',
        time_to: rule.conditions?.time_to || '',
        days_of_week: rule.conditions?.days_of_week || [],
      });
    }
  }, [rule]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepara le condizioni
      const conditions: any = {};
      if (formData.passengers_min) conditions.passengers_min = parseInt(formData.passengers_min);
      if (formData.passengers_max) conditions.passengers_max = parseInt(formData.passengers_max);
      if (formData.date_from) conditions.date_from = formData.date_from;
      if (formData.date_to) conditions.date_to = formData.date_to;
      if (formData.time_from) conditions.time_from = formData.time_from;
      if (formData.time_to) conditions.time_to = formData.time_to;
      if (formData.days_of_week.length > 0) conditions.days_of_week = formData.days_of_week;

      const payload = {
        rule_name: formData.rule_name,
        rule_type: formData.modifier_type, // Usa lo stesso valore
        modifier_type: formData.modifier_type,
        modifier_value: parseFloat(formData.modifier_value),
        priority: parseInt(formData.priority),
        is_active: formData.is_active,
        conditions,
      };

      const url = rule
        ? `/api/admin/global-rules/${rule.id}`
        : '/api/admin/global-rules';
      
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
    setFormData({
      ...formData,
      days_of_week: formData.days_of_week.includes(day)
        ? formData.days_of_week.filter(d => d !== day)
        : [...formData.days_of_week, day],
    });
  };

  return (
    <div className="bg-white border-2 border-black">
      {/* Header */}
      <div className="border-b-2 border-black p-6">
        <h2 className="text-2xl font-bold text-black">
          {rule ? 'Modifica Regola Globale' : 'Nuova Regola Globale'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Questa regola si applicherà a tutte le rotte che soddisfano le condizioni
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
          
          <div className="space-y-6">
            <Input
              label="Nome Regola"
              value={formData.rule_name}
              onChange={(e) => setFormData({ ...formData, rule_name: e.target.value })}
              required
              placeholder="es: Supplemento Notturno, Weekend Premium, Festività"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">
                  Tipo Modifica <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.modifier_type}
                  onChange={(e) => setFormData({ ...formData, modifier_type: e.target.value as any })}
                  required
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="percentage">Percentuale (%)</option>
                  <option value="fixed_amount">Importo Fisso (€)</option>
                </select>
              </div>

              <Input
                label={`Valore ${formData.modifier_type === 'percentage' ? '(%)' : '(€)'}`}
                type="number"
                step="0.01"
                value={formData.modifier_value}
                onChange={(e) => setFormData({ ...formData, modifier_value: e.target.value })}
                required
                placeholder={formData.modifier_type === 'percentage' ? '20' : '50'}
                help={formData.modifier_type === 'percentage' ? 'Es: 20 = +20% sul prezzo' : 'Es: 50 = +50€ sul prezzo'}
              />
            </div>

            <Input
              label="Priorità"
              type="number"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              required
              placeholder="10"
              help="Maggiore = più priorità. Se più regole corrispondono, viene applicata quella con priorità più alta"
            />
          </div>
        </div>

        {/* Condizioni (Opzionali) */}
        <div className="bg-blue-50 p-6 border-2 border-black">
          <h3 className="text-xl font-bold text-black mb-2">Condizioni di Applicazione</h3>
          <p className="text-sm text-gray-600 mb-4">
            Specifica quando questa regola deve essere applicata. Se non specifichi nulla, si applica sempre.
          </p>

          <div className="space-y-6">
            {/* Numero Passeggeri */}
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Numero Passeggeri (Opzionale)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Minimo"
                  value={formData.passengers_min}
                  onChange={(e) => setFormData({ ...formData, passengers_min: e.target.value })}
                  min="1"
                  placeholder="es: 5"
                  help="Lascia vuoto per nessun minimo"
                />
                <Input
                  type="number"
                  label="Massimo"
                  value={formData.passengers_max}
                  onChange={(e) => setFormData({ ...formData, passengers_max: e.target.value })}
                  min="1"
                  placeholder="es: 8"
                  help="Lascia vuoto per nessun massimo"
                />
              </div>
            </div>

            {/* Periodo */}
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Periodo (Opzionale)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Data Inizio"
                  value={formData.date_from}
                  onChange={(e) => setFormData({ ...formData, date_from: e.target.value })}
                />
                <Input
                  type="date"
                  label="Data Fine"
                  value={formData.date_to}
                  onChange={(e) => setFormData({ ...formData, date_to: e.target.value })}
                />
              </div>
            </div>

            {/* Orario */}
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Orario (Opzionale)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="time"
                  label="Ora Inizio"
                  value={formData.time_from}
                  onChange={(e) => setFormData({ ...formData, time_from: e.target.value })}
                />
                <Input
                  type="time"
                  label="Ora Fine"
                  value={formData.time_to}
                  onChange={(e) => setFormData({ ...formData, time_to: e.target.value })}
                />
              </div>
            </div>

            {/* Giorni Settimana */}
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Giorni Settimana (Opzionale)
              </label>
              <div className="flex gap-2 flex-wrap">
                {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDayOfWeek(idx + 1)}
                    className={`px-4 py-2 border-2 transition-all ${
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
          </div>
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
            {loading ? 'Salvataggio...' : rule ? 'Aggiorna Regola' : 'Crea Regola'}
          </Button>
        </div>
      </form>
    </div>
  );
}
