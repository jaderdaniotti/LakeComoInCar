'use client';

import { useState, useEffect, FormEvent } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import images from '@/src/data/images';
import Image from 'next/image';

// Note: Metadata non può essere esportato da componenti client
// Verrà gestito tramite layout o head

interface Route {
  id: string;
  code: string;
  origin_it: string;
  destination_it: string;
  base_price: number;
  is_active: boolean;
}

const macchine = [
  { value: 'carbianca1', label: 'Car Bianca 1', src: images.carbianca1 },
  { value: 'carbianca2', label: 'Car Bianca 2', src: images.carbianca2 },
  { value: 'carbianca3', label: 'Car Bianca 3', src: images.carbianca3 },
  { value: 'carnera1', label: 'Car Nera 1', src: images.carnera1 },
  { value: 'carnera2', label: 'Car Nera 2', src: images.carnera2 },
  { value: 'carnera3', label: 'Car Nera 3', src: images.carnera3 },
];

export default function PrenotaPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [macchinaSelezionata, setMacchinaSelezionata] = useState<string | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [appliedRules, setAppliedRules] = useState<string[]>([]);
  const [priceLoading, setPriceLoading] = useState(false);
  const [formData, setFormData] = useState({
    tratta: '',
    data: '',
    ora: '',
    passeggeri: '',
    nome: '',
    email: '',
    telefono: '',
  });

  // Carica le rotte al mount
  useEffect(() => {
    loadRoutes();
  }, []);

  // Calcola il prezzo quando cambiano i parametri
  useEffect(() => {
    if (formData.tratta && formData.passeggeri && formData.data && formData.ora) {
      calculatePrice();
    } else {
      setCalculatedPrice(null);
    }
  }, [formData.tratta, formData.passeggeri, formData.data, formData.ora]);

  const loadRoutes = async () => {
    try {
      const response = await fetch('/api/routes');
      if (response.ok) {
        const data = await response.json();
        setRoutes(data.routes || []);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    } finally {
      setLoadingRoutes(false);
    }
  };

  const calculatePrice = async () => {
    setPriceLoading(true);
    try {
      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route_id: formData.tratta,
          passengers: formData.passeggeri,
          date: formData.data,
          time: formData.ora,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCalculatedPrice(data.price);
        setAppliedRules(data.applied_rules || []);
      } else {
        const selectedRoute = routes.find(r => r.id === formData.tratta);
        setCalculatedPrice(selectedRoute?.base_price || null);
      }
    } catch (error) {
      console.error('Error calculating price:', error);
      const selectedRoute = routes.find(r => r.id === formData.tratta);
      setCalculatedPrice(selectedRoute?.base_price || null);
    } finally {
      setPriceLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mostra la schermata di selezione pagamento
    setShowPaymentSelection(true);
  };

  const handlePaymentSelection = async (paymentType: 'full' | 'deposit') => {
    // TODO: Integrazione backend
    // Qui verrà implementata l'integrazione con:
    // - Invio email di conferma
    // - Salvataggio su database (Supabase/PostgreSQL)
    // - Integrazione Stripe/PayPal per pagamento online
    
    console.log('Dati prenotazione:', formData);
    console.log('Tipo pagamento:', paymentType);
    console.log('Prezzo totale:', calculatedPrice);
    console.log('Importo da pagare:', paymentType === 'full' ? calculatedPrice : (calculatedPrice || 0) * 0.4);
    
    // Simulazione invio
    setIsSubmitted(true);
    setShowPaymentSelection(false);
    
    // Reset form dopo 5 secondi (per demo)
    setTimeout(() => {
      setIsSubmitted(false);
      setMacchinaSelezionata(null);
      setFormData({
        tratta: '',
        data: '',
        ora: '',
        passeggeri: '',
        nome: '',
        email: '',
        telefono: '',
      });
      setCalculatedPrice(null);
      setAppliedRules([]);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Schermata conferma prenotazione inviata
  if (isSubmitted) {
    return (
      <SectionWrapper className="bg-white min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-black">
            Prenotazione Confermata!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Grazie per la tua prenotazione. Ti abbiamo inviato una email di conferma con tutti i dettagli e il link per il pagamento.
          </p>
          <Button href="/" variant="primary">
            Torna alla Home
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  // Schermata selezione metodo di pagamento
  if (showPaymentSelection && calculatedPrice) {
    const depositAmount = Math.round(calculatedPrice * 0.4 * 100) / 100;
    const remainingAmount = Math.round(calculatedPrice * 0.6 * 100) / 100;
    const selectedRoute = routes.find(r => r.id === formData.tratta);

    return (
      <>
        <SectionWrapper className="bg-black text-white pt-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Scegli il Metodo di Pagamento
            </h1>
            <p className="text-xl text-gray-300">
              Completa la tua prenotazione scegliendo come preferisci pagare
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper className="bg-white">
          <div className="max-w-5xl mx-auto">
            {/* Riepilogo Prenotazione */}
            <div className="bg-gray-50 border-2 border-black p-8 mb-8">
              <h2 className="text-2xl font-bold text-black mb-6 uppercase">
                Riepilogo Prenotazione
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tratta</p>
                  <p className="text-xl font-semibold  text-black">
                    {selectedRoute?.origin_it} → {selectedRoute?.destination_it}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Data e Ora</p>
                  <p className="text-lg font-bold text-black">
                    {new Date(formData.data).toLocaleDateString('it-IT')} alle {formData.ora}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Passeggeri</p>
                  <p className="text-lg font-bold text-black">{formData.passeggeri} persone</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Passeggero</p>
                  <p className="text-lg font-bold text-black">{formData.nome}</p>
                </div>
              </div>


              {/* Prezzo Totale */}
              <div className="border-t-2 border-black pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-black">Prezzo Totale:</span>
                  <span className="text-4xl font-bold text-black">
                    €{calculatedPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Opzioni di Pagamento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Opzione 1: Pagamento Completo */}
              <div className="border-2 border-black p-8 hover:shadow-xl transition-all bg-white">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Pagamento Completo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Paga il 100% ora e viaggia senza pensieri
                  </p>
                </div>

                <div className="border-2 border-black p-6 mb-6">
                  <p className="text-md text-gray-600 mb-3">Importo da pagare ora:</p>
                  <hr />
                  <p className="text-4xl font-bold pt-3 border-t border-gray-300">€{calculatedPrice.toFixed(2)}</p>
                </div>

                <div className="space-y-3 mb-6 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Nessun pagamento al driver
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Prenotazione garantita
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Pagamento sicuro con Stripe/PayPal
                  </p>
                </div>

                <Button
                  onClick={() => handlePaymentSelection('full')}
                  variant="primary"
                  className="w-full"
                >
                  Paga €{calculatedPrice.toFixed(2)}
                </Button>
              </div>

              {/* Opzione 2: Acconto + Contanti */}
              <div className="border-2 border-black p-8 hover:shadow-xl transition-all bg-white">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Acconto + Contanti
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Paga il 40% ora, il resto al driver
                  </p>
                </div>

                <div className="bg-gray-100 border-2 border-black p-6 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Acconto online (40%):</span>
                    <span className="text-2xl font-bold text-black">€{depositAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                    <span className="text-sm text-gray-600">Al driver (60%):</span>
                    <span className="text-xl font-bold text-gray-700">€{remainingAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Paga meno ora
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Resto in contanti al driver
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Prenotazione garantita
                  </p>
                </div>

                <Button
                  onClick={() => handlePaymentSelection('deposit')}
                  variant="outline"
                  className="w-full"
                >
                  Paga Acconto €{depositAmount.toFixed(2)}
                </Button>
              </div>
            </div>

            {/* Pulsante Indietro */}
            <div className="text-center">
              <button
                onClick={() => setShowPaymentSelection(false)}
                className="text-gray-600 hover:text-black transition-colors underline"
              >
                ← Torna al form
              </button>
            </div>
          </div>
        </SectionWrapper>
      </>
    );
  }


  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Prenota Online
          </h1>
          <p className="text-xl text-gray-300">
            Compila il form per prenotare una tratta standard. Riceverai conferma immediata via email.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <FormWrapper
          title="Prenotazione Trasferimento"
          subtitle="Compila tutti i campi per completare la prenotazione"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {macchine.map((macchina) => (
              <div
                onClick={() => setMacchinaSelezionata(macchina.value)}
                className={`flex flex-col items-center justify-center border-2 p-4 cursor-pointer hover:shadow-lg hover:translate-y-[-5px] transition-all duration-200 overflow-hidden ${
                  macchinaSelezionata === macchina.value
                    ? " scale-105 shadow-lg transition-all translate-y-[-10px] hover:translate-y-[-10px]"
                    : "border-gray-300 hover:border-black"
                }`}
                key={macchina.value}
              >
                <Image
                  src={macchina.src}
                  alt={macchina.label}
                  className={`w-full h-full object-contain ${
                    macchinaSelezionata === macchina.value ? "partenza" : ""
                  }`}
                />
                <p
                  className="text-sm mt-2 text-gray-700"
                    
                >
                  {macchina.label}
                </p>
              </div>
            ))}
          
          </div>
          {/* Tratta */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Tratta <span className="text-black ml-1">*</span>
            </label>
            <select
              name="tratta"
              value={formData.tratta}
              onChange={handleChange}
              required
              disabled={loadingRoutes}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 disabled:opacity-50"
            >
              <option value="">
                {loadingRoutes ? 'Caricamento tratte...' : 'Seleziona una tratta'}
              </option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.origin_it} → {route.destination_it}
                </option>
              ))}
            </select>
          </div>

          {/* Data e Ora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="date"
              name="data"
              label="Data"
              value={formData.data}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
            <Input
              type="time"
              name="ora"
              label="Ora"
              value={formData.ora}
              onChange={handleChange}
              required
            />
          </div>

          {/* Numero Passeggeri */}
          <Input
            type="number"
            name="passeggeri"
            label="Numero Passeggeri"
            value={formData.passeggeri}
            onChange={handleChange}
            required
            min="1"
            max="8"
          />

          {/* Dati Personali */}
          <div className="border-t-2 border-black pt-6">
            <h3 className="text-xl font-bold mb-6 text-black uppercase tracking-wider">
              Dati Personali
            </h3>
            <div className="space-y-6">
              <Input
                type="text"
                name="nome"
                label="Nome e Cognome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="telefono"
                label="Telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Riepilogo e Prezzo */}
          {formData.tratta && formData.data && (
            <div className="border-2 border-black p-6 bg-gray-50">
              <h3 className="text-lg font-bold mb-4 text-black uppercase">
                Riepilogo Prenotazione
              </h3>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>Tratta:</strong> {routes.find(r => r.id === formData.tratta)?.origin_it} → {routes.find(r => r.id === formData.tratta)?.destination_it}</p>
                <p><strong>Data:</strong> {new Date(formData.data).toLocaleDateString('it-IT')}</p>
                <p><strong>Ora:</strong> {formData.ora}</p>
                <p><strong>Passeggeri:</strong> {formData.passeggeri}</p>
              </div>
              
              {/* Prezzo Calcolato */}
              <div className="border-t-2 border-black pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Prezzo Totale:</span>
                  {priceLoading ? (
                    <span className="text-lg text-gray-500">Calcolando...</span>
                  ) : calculatedPrice !== null ? (
                    <span className="text-3xl font-bold text-black">
                      €{calculatedPrice.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-lg text-gray-500">-</span>
                  )}
                </div>
                {calculatedPrice !== null && !priceLoading && (
                  <p className="text-xs text-gray-600 mt-2">
                    * Prezzo calcolato in base a passeggeri, data e orario selezionati
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Note Pagamento */}
          <div className="bg-black text-white p-6">
            <p className="text-sm">
              <strong>Nota:</strong> Nel prossimo step potrai scegliere se pagare il 100% online 
              o pagare un acconto del 40% online e il restante 60% in contanti al driver.
            </p>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={!calculatedPrice || priceLoading}
          >
            {priceLoading ? 'Calcolo in corso...' : 'Scegli Metodo di Pagamento →'}
          </Button>
        </FormWrapper>
      </SectionWrapper>
    </>
  );
}
