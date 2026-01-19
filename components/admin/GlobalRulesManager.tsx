'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlobalRuleForm from './GlobalRuleForm';

interface GlobalRule {
  id: string;
  rule_name: string;
  rule_type: string;
  modifier_type: 'percentage' | 'fixed_amount';
  modifier_value: number;
  priority: number;
  is_active: boolean;
  conditions: {
    passengers_min?: number;
    passengers_max?: number;
    date_from?: string;
    date_to?: string;
    days_of_week?: number[];
    time_from?: string;
    time_to?: string;
  };
}

export default function GlobalRulesManager() {
  const [rules, setRules] = useState<GlobalRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState<GlobalRule | null>(null);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await fetch('/api/admin/global-rules');
      if (response.ok) {
        const data = await response.json();
        setRules(data.rules || []);
      }
    } catch (error) {
      console.error('Error loading global rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa regola globale?')) return;

    try {
      const response = await fetch(`/api/admin/global-rules/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadRules();
      } else {
        alert('Errore durante l\'eliminazione');
      }
    } catch (error) {
      console.error('Error deleting rule:', error);
      alert('Errore durante l\'eliminazione');
    }
  };

  const handleEdit = (rule: GlobalRule) => {
    setEditingRule(rule);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingRule(null);
    loadRules();
  };

  const handleNewRule = () => {
    setEditingRule(null);
    setShowForm(true);
  };

  const formatDaysOfWeek = (days?: number[]) => {
    if (!days || days.length === 0) return 'Tutti i giorni';
    const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    return days.map(d => dayNames[d - 1]).join(', ');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Caricamento regole globali...</p>
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
            Torna alla lista regole globali
          </button>
        </div>
        <GlobalRuleForm rule={editingRule} onClose={handleFormClose} />
      </div>
    );
  }

  // Altrimenti mostra la lista
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">Condizioni Generali</h2>
          <p className="text-gray-600 text-sm mt-1">
            Regole che si applicano a tutte le rotte (es: notturno, weekend, festività)
          </p>
        </div>
        <Button
          onClick={handleNewRule}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuova Regola
        </Button>
      </div>

      {/* Lista Regole */}
      {rules.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center">
          <p className="text-gray-600 mb-4">Nessuna regola globale configurata</p>
          <Button onClick={handleNewRule} variant="primary">
            Crea la prima regola
          </Button>
        </div>
      ) : (
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-auto">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white h-full border-2 border-black p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-black">
                      {rule.rule_name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 border ${
                        rule.is_active
                          ? 'border-green-500 text-green-700 bg-green-50'
                          : 'border-gray-400 text-gray-600 bg-gray-50'
                      }`}
                    >
                      {rule.is_active ? 'Attiva' : 'Disattivata'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>Modifica:</p>{' '}
                      {rule.modifier_type === 'percentage' 
                        ? `+${rule.modifier_value}%`
                        : `+€${rule.modifier_value}`}
                    </div>
                    <div>
                      <strong>Priorità:</strong> {rule.priority}
                    </div>
                  </div>

                  {/* Condizioni */}
                  <div className="bg-gray-50 p-3 border border-gray-300 text-sm">
                    <strong className="block mb-2 text-black">Condizioni:</strong>
                    <div className="space-y-1 text-gray-700">
                      {(rule.conditions.passengers_min || rule.conditions.passengers_max) && (
                        <p>👥 Passeggeri: {rule.conditions.passengers_min || 'Min'} - {rule.conditions.passengers_max || 'Max'}</p>
                      )}
                      {rule.conditions.date_from && rule.conditions.date_to && (
                        <p>📅 Periodo: {new Date(rule.conditions.date_from).toLocaleDateString('it-IT')} - {new Date(rule.conditions.date_to).toLocaleDateString('it-IT')}</p>
                      )}
                      {rule.conditions.time_from && rule.conditions.time_to && (
                        <p>🕐 Orario: {rule.conditions.time_from} - {rule.conditions.time_to}</p>
                      )}
                      {rule.conditions.days_of_week && rule.conditions.days_of_week.length > 0 && (
                        <p>📆 Giorni: {formatDaysOfWeek(rule.conditions.days_of_week)}</p>
                      )}
                      {!rule.conditions.passengers_min && !rule.conditions.passengers_max && !rule.conditions.date_from && !rule.conditions.time_from && !rule.conditions.days_of_week && (
                        <p className="text-gray-500 italic">Nessuna condizione specifica - si applica sempre</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(rule)}
                    className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                    title="Modifica"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rule.id)}
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
