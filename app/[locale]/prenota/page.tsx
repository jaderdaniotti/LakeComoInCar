'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/layout/SectionWrapper';
import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import GDPRDisclaimer from '@/components/ui/GDPRDisclaimer';
import PayPalButton from '@/components/payment/PayPalButton';
import StripeCheckout from '@/components/payment/StripeCheckout';
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
  const t = useTranslations('booking');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'stripe-methods' | 'confirm'>('method');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'paypal' | 'stripe'>('cash');
  const [selectedStripeMethod, setSelectedStripeMethod] = useState<string | null>(null);
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
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
  const [gdprConsent, setGdprConsent] = useState(false);

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
    
    console.log('📝 Form submitted!', {
      calculatedPrice,
      gdprConsent,
      formData,
      macchinaSelezionata
    });
    
    // Mostra lo step di selezione metodo pagamento
    setShowPaymentSelection(true);
    setPaymentStep('method');
  };

  const handlePaymentSelection = async (paymentType: 'full' | 'deposit', paymentDetails?: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Trova la tratta selezionata per ottenere origine e destinazione
      const selectedRoute = routes.find(r => r.id === formData.tratta);
      const routeDescription = selectedRoute 
        ? `${selectedRoute.origin_it} → ${selectedRoute.destination_it}`
        : 'Tratta personalizzata';

      // Costruisci le note con informazioni pagamento
      let paymentNotes = '';
      if (paymentDetails?.paymentMethod === 'paypal') {
        paymentNotes = `\nPagamento PayPal completato\nOrder ID: ${paymentDetails.paypalOrderId}\nCapture ID: ${paymentDetails.paypalDetails.paymentDetails?.captureId || 'N/A'}`;
      } else if (paymentDetails?.paymentMethod === 'stripe') {
        paymentNotes = `\nPagamento Stripe completato\nPayment Intent ID: ${paymentDetails.stripePaymentIntentId}`;
      }

      // Prepara i dati da inviare all'API
      const bookingData = {
        customerName: formData.nome,
        customerEmail: formData.email,
        customerPhone: formData.telefono,
        origin: selectedRoute?.origin_it || 'Non specificato',
        destination: selectedRoute?.destination_it || 'Non specificato',
        serviceDate: formData.data,
        serviceTime: formData.ora,
        passengers: parseInt(formData.passeggeri),
        vehicle: macchinaSelezionata || 'Non specificato',
        totalPrice: calculatedPrice,
        paymentType: `${paymentType === 'full' ? t('payment.fullPayment.title') : t('payment.deposit.title')}`,
        notes: `${appliedRules.length > 0 ? `\nRegole applicate: ${appliedRules.join(', ')}` : ''}${paymentNotes}`,
        language: 'it',
      };

      // Chiama l'API per inviare le email
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Errore durante l\'invio della prenotazione');
      }

      // Successo! Mostra la pagina di conferma
      setIsSubmitted(true);
      setShowPaymentSelection(false);
      
      // Reset form dopo 3 secondi
      setTimeout(() => {
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
        setGdprConsent(false);
      }, 3000);

    } catch (err) {
      console.error('Errore invio prenotazione:', err);
      setError(err instanceof Error ? err.message : 'Errore durante l\'invio. Riprova più tardi.');
      setShowPaymentSelection(false); // Torna al form per mostrare l'errore
    } finally {
      setIsSubmitting(false);
    }
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
      <SectionWrapper className="bg-white pt-20 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-black">
            {t('success.title')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('success.message')}
          </p>
          <Button href="/" variant="primary">
            {t('success.backToHome')}
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

    // STEP 1: Selezione Metodo di Pagamento
    if (paymentStep === 'method') {
      return (
        <>
          <SectionWrapper className="bg-black text-white pt-24 pb-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                {t('payment.method.title')}
              </h1>
              <p className="text-base md:text-lg text-gray-300">
                {t('payment.method.subtitle')}
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper className="bg-white py-6 md:py-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Colonna Sinistra: Tabella Riepilogo */}
                <div className="bg-gray-50 border-2 border-black p-6">
                  <h2 className="text-2xl font-bold text-black mb-6 uppercase flex items-center gap-2">
                    {t('payment.confirm.summary.title')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.route')}</p>
                      <p className="text-lg font-semibold text-black">
                        {selectedRoute?.origin_it} → {selectedRoute?.destination_it}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.dateTime')}</p>
                      <p className="text-lg font-semibold text-black">
                        {new Date(formData.data).toLocaleDateString('it-IT')} • {formData.ora}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.passengers')}</p>
                      <p className="text-lg font-semibold text-black">{formData.passeggeri}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.passenger')}</p>
                      <p className="text-lg font-semibold text-black">{formData.nome}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.email')}</p>
                      <p className="text-lg font-semibold text-black">{formData.email}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.phone')}</p>
                      <p className="text-lg font-semibold text-black">{formData.telefono}</p>
                    </div>
                    
                    {macchinaSelezionata && (
                      <div className="border-b border-gray-300 pb-3">
                        <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.vehicle')}</p>
                        <p className="text-lg font-semibold text-black">
                          {macchine.find(m => m.value === macchinaSelezionata)?.label}
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t-2 border-black">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-black">{t('payment.confirm.summary.totalPrice')}:</span>
                        <span className="text-3xl font-semibold text-black">
                          €{calculatedPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonna Destra: Metodi di Pagamento */}
                <div>
                  <h2 className="text-xl font-bold text-black mb-4">
                    {t('payment.confirm.paymentMethod.title')}
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    {/* Opzione 1: Contanti + Carta (40% Online) */}
                    <div
                      onClick={() => setSelectedPaymentMethod('cash')}
                      className={`border-2 p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'cash'
                          ? 'border-black bg-black text-white shadow-lg '
                          : 'border-gray-300 bg-white hover:border-black'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={selectedPaymentMethod === 'cash'}
                            onChange={() => setSelectedPaymentMethod('cash')}
                            className="w-4 h-4 cursor-pointer shrink-0"
                          />
                          <h3 className="text-lg font-bold leading-tight">
                            {t('payment.method.cash.title')}
                          </h3>
                        </div>
                        <p className={`text-xs mb-3 ${
                          selectedPaymentMethod === 'cash' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {t('payment.method.cash.description')}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div className={`p-2 rounded ${
                            selectedPaymentMethod === 'cash' ? 'bg-white/10' : 'bg-gray-100'
                          }`}>
                            <p className={selectedPaymentMethod === 'cash' ? 'text-gray-300' : 'text-gray-600'}>
                              {t('payment.method.cash.payNow')}
                            </p>
                            <p className="text-lg font-bold">€{depositAmount.toFixed(2)}</p>
                          </div>
                          <div className={`p-2 rounded ${
                            selectedPaymentMethod === 'cash' ? 'bg-white/10' : 'bg-gray-100'
                          }`}>
                            <p className={selectedPaymentMethod === 'cash' ? 'text-gray-300' : 'text-gray-600'}>
                              {t('payment.method.cash.toDriver')}
                            </p>
                            <p className="text-lg font-bold">€{remainingAmount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Opzione 2: PayPal */}
                    <div
                      onClick={() => setSelectedPaymentMethod('paypal')}
                      className={`border-2 p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'paypal'
                          ? 'border-black bg-black text-white shadow-lg '
                          : 'border-gray-300 bg-white hover:border-black'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={selectedPaymentMethod === 'paypal'}
                            onChange={() => setSelectedPaymentMethod('paypal')}
                            className="w-4 h-4 cursor-pointer flex-shrink-0"
                          />
                          <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold leading-tight">
                            {t('payment.method.paypal.title')}
                          </h3>
                          <span 
                              className="size-10 flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: images.paypal }}
                            />
                          </div>
                        </div>
                        <p className={`text-xs mb-3 ${
                          selectedPaymentMethod === 'paypal' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {t('payment.method.paypal.description')}
                        </p>
                        <div className={`p-2 rounded mb-3 ${
                          selectedPaymentMethod === 'paypal' ? 'bg-white/10' : 'bg-gray-100'
                        }`}>
                          <p className={`text-xs ${
                            selectedPaymentMethod === 'paypal' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {t('payment.method.paypal.totalToPay')}
                          </p>
                          <p className="text-xl font-bold">€{calculatedPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Opzione 3: Stripe / Carta di Credito */}
                    <div
                      onClick={() => setSelectedPaymentMethod('stripe')}
                      className={`border-2 p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'stripe'
                          ? 'border-black bg-black text-white shadow-lg '
                          : 'border-gray-300 bg-white hover:border-black'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="stripe"
                            checked={selectedPaymentMethod === 'stripe'}
                            onChange={() => setSelectedPaymentMethod('stripe')}
                            className="w-4 h-4 cursor-pointer shrink-0"
                          />
                          <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold leading-tight">
                            {t('payment.method.stripe.title')}
                          </h3>
                          <span className="size-10 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: images.cb }} />
                          </div>
                        </div>
                        <p className={`text-xs mb-3 ${
                          selectedPaymentMethod === 'stripe' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {t('payment.method.stripe.description')}
                        </p>
                        <div className={`p-2 rounded mb-3 ${
                          selectedPaymentMethod === 'stripe' ? 'bg-white/10' : 'bg-gray-100'
                        }`}>
                          <p className={`text-xs ${
                            selectedPaymentMethod === 'stripe' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {t('payment.method.stripe.totalToPay')}
                          </p>
                          <p className="text-xl font-bold">€{calculatedPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Sicurezza */}
                  <div className="bg-green-50 border-2 border-green-600 p-3 mb-4">
                    <p className="text-xs text-green-800 flex items-start gap-2">
                      <span className="text-base">🔒</span>
                      <span>
                        <strong>{t('payment.method.securityInfo.title')}</strong> {t('payment.method.securityInfo.description')}
                      </span>
                    </p>
                  </div>

                  {/* Pulsanti Azione */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowPaymentSelection(false)}
                      className="px-4 py-3 border-2 border-black bg-white text-black font-bold hover:bg-gray-50 transition-all text-sm md:text-base"
                    >
                      {t('payment.method.backToForm')}
                    </button>
                    <Button
                      onClick={() => {
                        if (selectedPaymentMethod === 'stripe' || selectedPaymentMethod === 'cash') {
                          setPaymentStep('stripe-methods');
                        } else {
                          setPaymentStep('confirm');
                        }
                      }}
                      variant="primary"
                      className="text-sm md:text-base"
                      disabled={!selectedPaymentMethod}
                    >
                      {t('payment.method.continue')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </>
      );
    }

    // STEP 1.5: Selezione Metodi Stripe (Carta, Klarna, Amazon Pay, ecc.)
    if (paymentStep === 'stripe-methods') {
      const stripeMethods = [
        { id: 'card', name: 'Carta', description: 'Visa, Mastercard, Amex e altre', icon: images.cb },
        { id: 'klarna', name: 'Klarna', description: 'Paga a rate o più tardi', icon: images.klarna },
        { id: 'amazon_pay', name: 'Amazon Pay', description: 'Paga con il tuo account Amazon', icon: images.amazon },
        { id: 'bancontact', name: 'Bancontact', description: 'Pagamento diretto online', icon: images.bancontact },
        { id: 'eps', name: 'EPS', description: 'Pagamento bancario online', icon: images.eps },
      ];

      return (
        <>
          <SectionWrapper className="bg-black text-white pt-24 pb-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                Scegli Metodo di Pagamento
              </h1>
              <p className="text-base md:text-lg text-gray-300">
                Seleziona come preferisci pagare con carta
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper className="bg-white py-6 md:py-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Colonna Sinistra: Tabella Riepilogo (stessa di prima) */}
                <div className="bg-gray-50 border-2 border-black p-6">
                  <h2 className="text-2xl font-bold text-black mb-6 uppercase flex items-center gap-2">
                    <span></span> {t('payment.confirm.summary.title')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.route')}</p>
                      <p className="text-lg font-bold text-black">
                        {selectedRoute?.origin_it} → {selectedRoute?.destination_it}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.dateTime')}</p>
                      <p className="text-lg font-bold text-black">
                        {new Date(formData.data).toLocaleDateString('it-IT')} • {formData.ora}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.passengers')}</p>
                      <p className="text-lg font-bold text-black">{formData.passeggeri}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.passenger')}</p>
                      <p className="text-lg font-bold text-black">{formData.nome}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.email')}</p>
                      <p className="text-lg font-bold text-black">{formData.email}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.phone')}</p>
                      <p className="text-lg font-bold text-black">{formData.telefono}</p>
                    </div>
                    
                    {macchinaSelezionata && (
                      <div className="border-b border-gray-300 pb-3">
                        <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.vehicle')}</p>
                        <p className="text-lg font-bold text-black">
                          {macchine.find(m => m.value === macchinaSelezionata)?.label}
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t-2 border-black">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-black">{t('payment.confirm.summary.totalPrice')}:</span>
                        <span className="text-3xl font-bold text-black">
                          €{calculatedPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonna Destra: Metodi Stripe */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-black">
                      Metodo di Pagamento
                    </h2>
                    <button
                      onClick={() => setPaymentStep('method')}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Cambia metodo
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {stripeMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedStripeMethod(method.id)}
                        className={`border-2 p-4 cursor-pointer transition-all ${
                          selectedStripeMethod === method.id
                            ? 'border-black bg-black text-white shadow-lg '
                            : 'border-gray-300 bg-white hover:border-black'
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-3">
                            <input
                              type="radio"
                              name="stripeMethod"
                              value={method.id}
                              checked={selectedStripeMethod === method.id}
                              onChange={() => setSelectedStripeMethod(method.id)}
                              className="w-4 h-4 cursor-pointer shrink-0"
                            />
                            <span 
                              className="size-10 flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: method.icon }}
                            />
                            <h3 className="text-lg font-bold leading-tight">
                              {method.name}
                            </h3>
                          </div>
                          <p className={`text-xs mb-3 ${
                            selectedStripeMethod === method.id ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {method.description}
                          </p>
                          <div className={`p-2 rounded mb-3 ${
                            selectedStripeMethod === method.id ? 'bg-white/10' : 'bg-gray-100'
                          }`}>
                            <p className={`text-xs ${
                              selectedStripeMethod === method.id ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Totale da pagare
                            </p>
                            <p className="text-xl font-bold">
                              €{selectedPaymentMethod === 'cash' ? depositAmount.toFixed(2) : calculatedPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info Sicurezza */}
                  <div className="bg-green-50 border-2 border-green-600 p-3 mb-4">
                    <p className="text-xs text-green-800 flex items-start gap-2">
                      <span className="text-base">🔒</span>
                      <span>
                        <strong>{t('payment.method.securityInfo.title')}</strong> {t('payment.method.securityInfo.description')}
                      </span>
                    </p>
                  </div>

                  {/* Pulsanti Azione */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentStep('method')}
                      className="px-4 py-3 border-2 border-black bg-white text-black font-bold hover:bg-gray-50 transition-all text-sm md:text-base"
                    >
                      ← Indietro
                    </button>
                    <Button
                      onClick={() => {
                        setPaymentStep('confirm');
                        // Non mostrare subito StripeCheckout, verrà mostrato nel confirm quando si clicca "Paga"
                      }}
                      variant="primary"
                      className="text-sm md:text-base"
                      disabled={!selectedStripeMethod}
                    >
                      {t('payment.method.continue')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </>
      );
    }

    // STEP 2: Conferma e Riepilogo Finale
    if (paymentStep === 'confirm') {
      return (
        <>
          <SectionWrapper className="bg-black text-white pt-32">
            <div className="text-center max-w-3xl mx-auto pt-20">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                {t('payment.confirm.title')}
              </h1>
              <p className="text-xl text-gray-300">
                {t('payment.confirm.subtitle')}
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper className="bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Colonna Sinistra: Tabella Riepilogo */}
                <div className="bg-gray-50 border-2 border-black p-6">
                  <h2 className="text-2xl font-bold text-black mb-6 uppercase flex items-center gap-2">
                    <span>📋</span> {t('payment.confirm.summary.title')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.route')}</p>
                      <p className="text-lg font-bold text-black">
                        {selectedRoute?.origin_it} → {selectedRoute?.destination_it}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.dateTime')}</p>
                      <p className="text-lg font-bold text-black">
                        {new Date(formData.data).toLocaleDateString('it-IT')} • {formData.ora}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.passengers')}</p>
                      <p className="text-lg font-bold text-black">{formData.passeggeri}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.passenger')}</p>
                      <p className="text-lg font-bold text-black">{formData.nome}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.email')}</p>
                      <p className="text-lg font-bold text-black">{formData.email}</p>
                    </div>
                    
                    <div className="border-b border-gray-300 pb-3">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.phone')}</p>
                      <p className="text-lg font-bold text-black">{formData.telefono}</p>
                    </div>
                    
                    {macchinaSelezionata && (
                      <div className="border-b border-gray-300 pb-3">
                        <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.summary.vehicle')}</p>
                        <p className="text-lg font-bold text-black">
                          {macchine.find(m => m.value === macchinaSelezionata)?.label}
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t-2 border-black">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-black">{t('payment.confirm.summary.totalPrice')}:</span>
                        <span className="text-3xl font-bold text-black">
                          €{calculatedPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonna Destra: Metodo di Pagamento Selezionato */}
                <div>
                  <div className="border-2 border-black p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-black">{t('payment.confirm.paymentMethod.title')}</h3>
                      <button
                        onClick={() => {
                          if (selectedPaymentMethod === 'stripe') {
                            setPaymentStep('stripe-methods');
                          } else {
                            setPaymentStep('method');
                          }
                        }}
                        className="text-sm text-gray-600 hover:text-black underline"
                      >
                        {t('payment.confirm.paymentMethod.change')}
                      </button>
                    </div>

                {selectedPaymentMethod === 'cash' && (
                  <div className="bg-white border-2 border-gray-300 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-lg font-bold">{t('payment.confirm.paymentMethod.cash.title')}</p>
                        <p className="text-sm text-gray-600">{t('payment.confirm.paymentMethod.cash.subtitle')}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.paymentMethod.cash.payNow')}</p>
                        <p className="text-2xl font-bold text-black">€{depositAmount.toFixed(2)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.paymentMethod.cash.toDriverCash')}</p>
                        <p className="text-2xl font-bold text-gray-700">€{remainingAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'paypal' && (
                  <div className="bg-white border-2 border-gray-300 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-lg font-bold">{t('payment.confirm.paymentMethod.paypal.title')}</p>
                        <p className="text-sm text-gray-600">{t('payment.confirm.paymentMethod.paypal.subtitle')}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded mt-4">
                      <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.paymentMethod.paypal.totalToPay')}</p>
                      <p className="text-2xl font-bold text-black">€{calculatedPrice.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                    {selectedPaymentMethod === 'stripe' && (
                      <div className="bg-white border-2 border-gray-300 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div>
                            <p className="text-lg font-bold">
                              {selectedStripeMethod === 'card' && '💳 Carta di Credito / Debito'}
                              {selectedStripeMethod === 'klarna' && '🛒 Klarna'}
                              {selectedStripeMethod === 'amazon_pay' && '📦 Amazon Pay'}
                              {selectedStripeMethod === 'bancontact' && '🏦 Bancontact'}
                              {selectedStripeMethod === 'eps' && '🏛️ EPS'}
                              {!selectedStripeMethod && t('payment.confirm.paymentMethod.stripe.title')}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedStripeMethod === 'card' && t('payment.confirm.paymentMethod.stripe.subtitle')}
                              {selectedStripeMethod === 'klarna' && 'Paga a rate o più tardi'}
                              {selectedStripeMethod === 'amazon_pay' && 'Paga con il tuo account Amazon'}
                              {selectedStripeMethod === 'bancontact' && 'Pagamento diretto online'}
                              {selectedStripeMethod === 'eps' && 'Pagamento bancario online'}
                              {!selectedStripeMethod && t('payment.confirm.paymentMethod.stripe.subtitle')}
                            </p>
                          </div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded mt-4">
                          <p className="text-sm text-gray-600 mb-1">{t('payment.confirm.paymentMethod.stripe.totalToPay')}</p>
                          <p className="text-2xl font-bold text-black">€{calculatedPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Note Importanti */}
                  <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mb-6">
                    <p className="text-sm text-yellow-800 flex items-start gap-2">
                      <span className="text-lg">ℹ️</span>
                      <span>
                        <strong>{t('payment.confirm.importantNote.title')}</strong> {t('payment.confirm.importantNote.description')}
                      </span>
                    </p>
                  </div>

                  {/* Messaggio di errore */}
                  {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700 mb-6">
                      <p className="font-semibold">❌ {t('payment.confirm.error')}</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {/* Pulsanti Azione */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        if (selectedPaymentMethod === 'stripe') {
                          setPaymentStep('stripe-methods');
                        } else {
                          setPaymentStep('method');
                        }
                        setShowPayPalButton(false);
                        setShowStripeCheckout(false);
                      }}
                      className="flex-1 px-6 py-4 border-2 border-black bg-white text-black font-bold hover:bg-gray-50 transition-all"
                      disabled={isSubmitting || showPayPalButton || showStripeCheckout}
                    >
                      {t('payment.confirm.back')}
                    </button>
                
                {/* Mostra pulsante PayPal se selezionato PayPal e il flag è attivo */}
                {selectedPaymentMethod === 'paypal' && showPayPalButton ? (
                  <div className="flex-1">
                    <PayPalButton
                      amount={calculatedPrice}
                      description={`Prenotazione LakeComoInCar - ${formData.nome}`}
                      onSuccess={async (orderId, details) => {
                        console.log('PayPal payment successful:', orderId, details);
                        // Invia la prenotazione con i dettagli del pagamento
                        await handlePaymentSelection('full', {
                          paymentMethod: 'paypal',
                          paypalOrderId: orderId,
                          paypalDetails: details,
                        });
                      }}
                      onError={(error) => {
                        console.error('PayPal payment error:', error);
                        setError('Errore durante il pagamento PayPal. Riprova.');
                        setShowPayPalButton(false);
                      }}
                      onCancel={() => {
                        console.log('PayPal payment cancelled');
                        setShowPayPalButton(false);
                      }}
                    />
                  </div>
                ) : (selectedPaymentMethod === 'stripe' || selectedPaymentMethod === 'cash') && showStripeCheckout ? (
                  <div className="flex-1">
                    <StripeCheckout
                      amount={selectedPaymentMethod === 'cash' ? depositAmount : calculatedPrice}
                      description={`Prenotazione LakeComoInCar - ${formData.nome}${selectedPaymentMethod === 'cash' ? ' (Acconto 40%)' : ''}`}
                      paymentMethod={selectedStripeMethod || 'card'}
                      metadata={{
                        customerName: formData.nome,
                        customerEmail: formData.email,
                        route: `${routes.find(r => r.id === formData.tratta)?.origin_it} → ${routes.find(r => r.id === formData.tratta)?.destination_it}`,
                        stripePaymentMethod: selectedStripeMethod || 'card',
                        paymentType: selectedPaymentMethod === 'cash' ? 'deposit' : 'full',
                      }}
                      onSuccess={async (paymentIntentId) => {
                        console.log('Stripe payment successful:', paymentIntentId);
                        // Invia la prenotazione con i dettagli del pagamento
                        await handlePaymentSelection(selectedPaymentMethod === 'cash' ? 'deposit' : 'full', {
                          paymentMethod: selectedPaymentMethod === 'cash' ? 'cash' : 'stripe',
                          stripePaymentIntentId: paymentIntentId,
                          stripeMethod: selectedStripeMethod || 'card',
                        });
                      }}
                      onError={(error) => {
                        console.error('Stripe payment error:', error);
                        setError('Errore durante il pagamento con carta. Riprova.');
                        setShowStripeCheckout(false);
                      }}
                    />
                  </div>
                    ) : (
                    <Button
                      onClick={() => {
                        if (selectedPaymentMethod === 'cash') {
                          // Per l'acconto, va allo step stripe-methods per selezionare il metodo di pagamento
                          if (!selectedStripeMethod) {
                            setPaymentStep('stripe-methods');
                          } else {
                            setShowStripeCheckout(true);
                          }
                        } else if (selectedPaymentMethod === 'paypal') {
                          setShowPayPalButton(true);
                        } else if (selectedPaymentMethod === 'stripe') {
                          if (!selectedStripeMethod) {
                            setPaymentStep('stripe-methods');
                          } else {
                            setShowStripeCheckout(true);
                          }
                        }
                      }}
                      variant="primary"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                          t('payment.confirm.processing')
                        ) : (
                          <>
                        {selectedPaymentMethod === 'cash' && (selectedStripeMethod ? t('payment.confirm.payButton.cash', { amount: depositAmount.toFixed(2) }) : t('payment.method.continue'))}
                        {selectedPaymentMethod === 'paypal' && t('payment.confirm.payButton.paypal', { amount: calculatedPrice.toFixed(2) })}
                        {selectedPaymentMethod === 'stripe' && (selectedStripeMethod ? t('payment.confirm.payButton.stripe', { amount: calculatedPrice.toFixed(2) }) : t('payment.method.continue'))}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </>
      );
    }
  }


  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto pt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-300">
            {t('hero.subtitle')}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <FormWrapper
          title={t('form.title')}
          subtitle={t('form.subtitle')}
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
              {t('form.routeLabel')} <span className="text-black ml-1">*</span>
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
                {loadingRoutes ? t('form.loadingRoutes') : t('form.routePlaceholder')}
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
              label={t('form.dateLabel')}
              value={formData.data}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
            <Input
              type="time"
              name="ora"
              label={t('form.timeLabel')}
              value={formData.ora}
              onChange={handleChange}
              required
            />
          </div>

          {/* Numero Passeggeri */}
          <Input
            type="number"
            name="passeggeri"
            label={t('form.passengersLabel')}
            value={formData.passeggeri}
            onChange={handleChange}
            required
            min="1"
            max="8"
          />

          {/* Dati Personali */}
          <div className="border-t-2 border-black pt-6">
            <h3 className="text-xl font-bold mb-6 text-black uppercase tracking-wider">
              {t('form.personalData')}
            </h3>
            <div className="space-y-6">
              <Input
                type="text"
                name="nome"
                label={t('form.nameLabel')}
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label={t('form.emailLabel')}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="telefono"
                label={t('form.phoneLabel')}
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
                {t('form.summary.title')}
              </h3>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>{t('form.summary.route')}:</strong> {routes.find(r => r.id === formData.tratta)?.origin_it} → {routes.find(r => r.id === formData.tratta)?.destination_it}</p>
                <p><strong>{t('form.summary.date')}:</strong> {new Date(formData.data).toLocaleDateString('it-IT')}</p>
                <p><strong>{t('form.summary.time')}:</strong> {formData.ora}</p>
                <p><strong>{t('form.summary.passengers')}:</strong> {formData.passeggeri}</p>
              </div>
              
              {/* Prezzo Calcolato */}
              <div className="border-t-2 border-black pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{t('form.summary.totalPrice')}:</span>
                  {priceLoading ? (
                    <span className="text-lg text-gray-500">{t('form.summary.calculating')}</span>
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
                    {t('form.summary.priceNote')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Note Pagamento */}
          <div className="bg-black text-white p-6">
            <p className="text-sm">
              <strong>Nota:</strong> {t('form.paymentNote')}
            </p>
          </div>

          {/* GDPR Disclaimer */}
          <GDPRDisclaimer 
            checked={gdprConsent}
            onChange={setGdprConsent}
          />

          {/* Messaggio di errore */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700">
              <p className="font-semibold">❌ {t('form.error')}</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-2">{t('form.errorContact')}</p>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={!calculatedPrice || priceLoading || !gdprConsent || isSubmitting}
          >
            {priceLoading ? t('form.calculating') : isSubmitting ? t('form.submitting') : t('form.submit')}
          </Button>
        </FormWrapper>
      </SectionWrapper>
    </>
  );
}
