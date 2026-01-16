import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prenota Online - Como Lake Car | Trasferimenti e NCC',
  description: 'Prenota online il tuo trasferimento con Como Lake Car. Servizio NCC professionale per Como, Milano e Svizzera. Prenotazione semplice e veloce.',
};

export default function PrenotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
