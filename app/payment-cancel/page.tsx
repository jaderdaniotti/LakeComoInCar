'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect automaticamente alla pagina prenota dopo 10 secondi
    const timeout = setTimeout(() => {
      router.push('/prenota');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <SectionWrapper className="bg-white pt-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <XCircle className="w-24 h-24 mx-auto text-yellow-600" />
        </div>
        <h1 className="text-4xl font-bold mb-6 text-black">
          Pagamento Annullato
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Hai annullato il pagamento.
        </p>
        <p className="text-base text-gray-600 mb-8">
          Nessun addebito è stato effettuato. Puoi riprovare quando vuoi.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/prenota" variant="primary">
            Riprova
          </Button>
          <Button href="/" variant="secondary">
            Torna alla Home
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          Verrai reindirizzato automaticamente tra pochi secondi...
        </p>
      </div>
    </SectionWrapper>
  );
}
