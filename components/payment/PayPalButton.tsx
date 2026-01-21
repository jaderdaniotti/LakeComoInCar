'use client';

import { useEffect, useRef, useState } from 'react';

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  description: string;
  onSuccess: (orderId: string, details: any) => void;
  onError: (error: any) => void;
  onCancel?: () => void;
}

// Definizione tipo PayPal
declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton({
  amount,
  currency = 'EUR',
  description,
  onSuccess,
  onError,
  onCancel,
}: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Verifica se PayPal SDK è già caricato
    const checkPayPalSdk = () => {
      if (window.paypal) {
        setSdkReady(true);
        setIsLoading(false);
        return true;
      }
      return false;
    };

    // Controlla immediatamente
    if (!checkPayPalSdk()) {
      // Se non è pronto, controlla ogni 100ms per max 5 secondi
      const interval = setInterval(() => {
        if (checkPayPalSdk()) {
          clearInterval(interval);
        }
      }, 100);

      // Timeout dopo 5 secondi
      setTimeout(() => {
        clearInterval(interval);
        if (!window.paypal) {
          setIsLoading(false);
          onError(new Error('PayPal SDK failed to load'));
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [onError]);

  useEffect(() => {
    if (!sdkReady || !paypalRef.current || !window.paypal) {
      return;
    }

    // Pulisci il container prima di renderizzare
    if (paypalRef.current) {
      paypalRef.current.innerHTML = '';
    }

    try {
      window.paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'black',
            shape: 'rect',
            label: 'pay',
            height: 48,
          },
          createOrder: async () => {
            try {
              // Chiama l'API per creare l'ordine PayPal
              const response = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount,
                  currency,
                  description,
                }),
              });

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
              }

              return data.orderId;
            } catch (error) {
              console.error('Error creating PayPal order:', error);
              onError(error);
              throw error;
            }
          },
          onApprove: async (data: any) => {
            try {
              // Cattura il pagamento
              const response = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: data.orderID,
                }),
              });

              const captureData = await response.json();

              if (!response.ok) {
                throw new Error(captureData.error || 'Failed to capture payment');
              }

              // Successo!
              onSuccess(data.orderID, captureData);
            } catch (error) {
              console.error('Error capturing PayPal payment:', error);
              onError(error);
            }
          },
          onError: (err: any) => {
            console.error('PayPal Button Error:', err);
            onError(err);
          },
          onCancel: () => {
            console.log('PayPal payment cancelled by user');
            if (onCancel) {
              onCancel();
            }
          },
        })
        .render(paypalRef.current);
    } catch (error) {
      console.error('Error rendering PayPal buttons:', error);
      onError(error);
    }
  }, [sdkReady, amount, currency, description, onSuccess, onError, onCancel]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
        <p className="mt-2 text-sm text-gray-600">Caricamento PayPal...</p>
      </div>
    );
  }

  if (!sdkReady) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Errore nel caricamento di PayPal. Riprova più tardi.</p>
      </div>
    );
  }

  return <div ref={paypalRef} className="paypal-button-container" />;
}
