'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Carica Stripe con la publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface StripeCheckoutFormProps {
  clientSecret: string;
  amount: number;
  paymentMethod?: string | null;
  onSuccess: (paymentIntentId: string, details: any) => void;
  onError: (error: any) => void;
}

// Form interno che usa gli hooks di Stripe
function CheckoutForm({
  clientSecret,
  amount,
  paymentMethod,
  onSuccess,
  onError,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Conferma il pagamento
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required', // Non fare redirect se non necessario
      });

      if (error) {
        setErrorMessage(error.message || 'Errore durante il pagamento');
        onError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Pagamento riuscito!
        onSuccess(paymentIntent.id, { paymentIntent });
      }
    } catch (err) {
      console.error('Stripe payment error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Errore sconosciuto';
      setErrorMessage(errorMsg);
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Stripe Payment Element */}
      <div className="bg-white p-4 border-2 border-gray-300 rounded">
        <PaymentElement />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border-2 border-red-500 text-red-700 text-sm">
          <p className="font-semibold">❌ Errore</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full px-6 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            Elaborazione in corso...
          </span>
        ) : (
          `Paga €${amount.toFixed(2)}`
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        Pagamento sicuro processato da Stripe
      </p>
    </form>
  );
}

interface StripeCheckoutProps {
  amount: number;
  description: string;
  metadata?: Record<string, string>;
  paymentMethod?: string | null;
  onSuccess: (paymentIntentId: string, details: any) => void;
  onError: (error: any) => void;
}

export default function StripeCheckout({
  amount,
  description,
  metadata,
  paymentMethod,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Crea il Payment Intent quando il componente viene montato
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'eur',
            description,
            metadata,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        const errorMsg = err instanceof Error ? err.message : 'Errore sconosciuto';
        setError(errorMsg);
        onError(err);
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, description, metadata, onError]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
        <p className="mt-2 text-sm text-gray-600">Caricamento pagamento sicuro...</p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="text-center py-8 text-red-600">
        <p className="font-semibold mb-2">Errore nel caricamento del pagamento</p>
        <p className="text-sm">{error || 'Client secret mancante'}</p>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#000000',
        colorBackground: '#ffffff',
        colorText: '#000000',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '0px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        clientSecret={clientSecret}
        amount={amount}
        paymentMethod={paymentMethod}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}
