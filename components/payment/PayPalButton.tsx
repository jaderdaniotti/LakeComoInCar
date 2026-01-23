'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  description: string;
  onSuccess: (orderId: string, details: any) => void;
  onError: (error: any) => void;
  onCancel?: () => void;
}

export default function PayPalButton({
  amount,
  currency = 'EUR',
  description,
  onSuccess,
  onError,
  onCancel,
}: PayPalButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="text-center py-8 text-red-600">
        <p className="font-medium">Errore configurazione PayPal</p>
        <p className="text-sm mt-2">Client ID mancante</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: currency,
        intent: 'capture',
      }}
    >
      <div className="max-w-md mx-auto">
        {isProcessing && (
          <div className="text-center py-4 mb-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-black"></div>
            <p className="mt-2 text-sm text-gray-600">Elaborazione pagamento...</p>
          </div>
        )}
        
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'black',
            shape: 'rect',
            label: 'pay',
            height: 48,
          }}
          disabled={isProcessing}
          createOrder={async () => {
            try {
              setIsProcessing(true);
              
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

              console.log('✅ PayPal order created:', data.orderId);
              return data.orderId;
            } catch (error) {
              console.error('❌ Error creating PayPal order:', error);
              setIsProcessing(false);
              onError(error);
              throw error;
            }
          }}
          onApprove={async (data) => {
            try {
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

              console.log('✅ PayPal payment captured:', captureData);
              setIsProcessing(false);
              onSuccess(data.orderID, captureData);
            } catch (error) {
              console.error('❌ Error capturing PayPal payment:', error);
              setIsProcessing(false);
              onError(error);
            }
          }}
          onError={(err) => {
            console.error('❌ PayPal Button Error:', err);
            setIsProcessing(false);
            onError(err);
          }}
          onCancel={() => {
            console.log('ℹ️ PayPal payment cancelled by user');
            setIsProcessing(false);
            if (onCancel) {
              onCancel();
            }
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
