import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Richiedi Preventivo - Como Lake Car | Preventivo Personalizzato',
  description: 'Richiedi un preventivo personalizzato per il tuo trasferimento. Servizio NCC su misura per Como, Milano e Svizzera. Risposta entro 24 ore.',
};

export default function PreventivoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
