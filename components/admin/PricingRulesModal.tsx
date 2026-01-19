'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit } from 'lucide-react';
import Button from '@/components/ui/Button';
import PricingRuleForm from './PricingRuleForm';

interface PricingRulesModalProps {
  routeId: string;
  onClose: () => void;
}

interface PricingRule {
  id: string;
  rule_name: string;
  rule_type: string;
  conditions: any;
  price_type: string;
  price_value: number;
  priority: number;
  is_active: boolean;
}

export default function PricingRulesModal({ routeId, onClose }: PricingRulesModalProps) {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);

  useEffect(() => {
    loadRules();
  }, [routeId]);

  const loadRules = async () => {
    try {
      const response = await fetch(`/api/admin/pricing-rules?route_id=${routeId}`);
      if (response.ok) {
        const data = await response.json();
        setRules(data.rules || []);
      }
    } catch (error) {
      console.error('Error loading pricing rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questa regola di prezzo?')) return;

    try {
      const response = await fetch(`/api/admin/pricing-rules/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadRules();
      }
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  const getRuleTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      passenger_based: 'Numero Passeggeri',
      season_based: 'Stagionalità',
      time_based: 'Orario',
      date_based: 'Data Specifica',
      day_of_week: 'Giorno Settimana',
    };
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-2 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b-2 border-black p-6 flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-black">Regole di Prezzo</h2>
            <p className="text-sm text-gray-600 mt-1">
              Gestisci i prezzi dinamici per questo percorso
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Button */}
          <div className="mb-6">
            <Button
              onClick={() => {
                setEditingRule(null);
                setShowForm(true);
              }}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuova Regola di Prezzo
            </Button>
          </div>

          {/* Rules List */}
          {loading ? (
            <p className="text-center text-gray-600 py-8">Caricamento...</p>
          ) : rules.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-600 mb-4">Nessuna regola di prezzo configurata</p>
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
              >
                Crea la prima regola
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="border-2 border-black p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-black">{rule.rule_name}</h3>
                        <span className="text-xs px-2 py-1 border border-black bg-gray-50">
                          {getRuleTypeLabel(rule.rule_type)}
                        </span>
                        {!rule.is_active && (
                          <span className="text-xs px-2 py-1 border border-gray-400 text-gray-600">
                            Disattivato
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>Prezzo:</strong>{' '}
                          {rule.price_type === 'fixed'
                            ? `${rule.price_value}€ (fisso)`
                            : `${rule.price_value > 0 ? '+' : ''}${rule.price_value}% (modificatore)`}
                        </p>
                        <p><strong>Priorità:</strong> {rule.priority}</p>
                        {rule.conditions && (
                          <p className="mt-1 text-xs font-mono bg-gray-50 p-2 rounded">
                            {JSON.stringify(rule.conditions)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingRule(rule);
                          setShowForm(true);
                        }}
                        className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <PricingRuleForm
          routeId={routeId}
          rule={editingRule}
          onClose={() => {
            setShowForm(false);
            setEditingRule(null);
            loadRules();
          }}
        />
      )}
    </div>
  );
}
