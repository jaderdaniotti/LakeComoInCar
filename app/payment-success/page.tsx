'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect automaticamente alla home dopo 10 secondi
    const timeout = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <SectionWrapper className="bg-white pt-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 mx-auto text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-6 text-black">
          Pagamento Completato con Successo!
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Il tuo pagamento è stato processato correttamente.
        </p>
        <p className="text-base text-gray-600 mb-8">
          Riceverai una email di conferma con tutti i dettagli della tua prenotazione.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/" variant="primary">
            Torna alla Home
          </Button>
          <Button href="/prenota" variant="secondary">
            Nuova Prenotazione
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          Verrai reindirizzato automaticamente tra pochi secondi...
        </p>
      </div>
    </SectionWrapper>
  );
}
