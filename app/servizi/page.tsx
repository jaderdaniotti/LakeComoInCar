import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Plane, Briefcase, Heart, MapPin, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servizi - Como Lake Car | Trasferimenti e Noleggio con Conducente',
  description: 'Scopri tutti i nostri servizi: trasferimenti aeroportuali, servizi business, eventi e matrimoni. Servizio NCC professionale per Como, Milano e Svizzera.',
};

export default function ServiziPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            I Nostri Servizi
          </h1>
          <p className="text-xl text-gray-300">
            Soluzioni di trasporto premium personalizzate per ogni esigenza
          </p>
        </div>
      </SectionWrapper>

      {/* Servizio NCC */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Servizio Noleggio con Conducente (NCC)
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Il nostro servizio di noleggio auto con conducente offre un'esperienza di trasporto 
            di alto livello, caratterizzata da professionalità, puntualità e massimo comfort. 
            I nostri autisti esperti conoscono perfettamente il territorio di Como, Milano e 
            la Svizzera, garantendo trasferimenti sicuri ed efficienti.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            I nostri veicoli sono premium, sempre impeccabili e perfettamente 
            mantenuti e dotati di tutti i comfort necessari per rendere il tuo viaggio 
            piacevole e rilassante.
          </p>
        </div>
      </SectionWrapper>

      {/* Tipologie di Servizio */}
      <SectionWrapper className="bg-black text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tipologie di Servizio
          </h2>
        </div>

        <div className="space-y-16">
          {/* Trasferimenti Aeroportuali */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mr-4">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                  Trasferimenti Aeroportuali
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Servizio dedicato per trasferimenti da e verso gli aeroporti principali:
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Aeroporto di Milano Malpensa (MXP)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Aeroporto di Milano Linate (LIN)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Aeroporto di Bergamo Orio al Serio (BGY)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Aeroporti svizzeri (Zurigo, Lugano)</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed">
                Monitoraggio voli in tempo reale, assistenza bagagli e massima puntualità garantita.
              </p>
            </div>
            <div className="border-2 border-white p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <Clock className="w-16 h-16 mx-auto mb-4 text-white" />
                <p className="text-gray-300">Servizio 24/7</p>
              </div>
            </div>
          </div>

          {/* Servizi Business */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 border-2 border-white p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-white" />
                <p className="text-gray-300">Professionalità garantita</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                  Servizi Business
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Soluzioni dedicate per professionisti e aziende:
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Trasferimenti per meeting e conferenze</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Servizi per fiere ed eventi aziendali</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Viaggi di lavoro multi-tappa</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Fatturazione dedicata e conti correnti</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed">
                Discrezione, efficienza e massima professionalità per i tuoi clienti e collaboratori.
              </p>
            </div>
          </div>

          {/* Eventi e Matrimoni */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                  Eventi e Matrimoni
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Per rendere indimenticabile il tuo giorno speciale:
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Trasferimenti per cerimonie e ricevimenti</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Servizi per eventi e celebrazioni</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Veicoli decorati su richiesta</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>Pacchetti personalizzati per gli ospiti</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed">
                Eleganza, stile e attenzione ai dettagli per il tuo evento perfetto.
              </p>
            </div>
            <div className="border-2 border-white p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-white" />
                <p className="text-gray-300">Servizio su misura</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Pronto a Viaggiare?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Scegli il servizio più adatto alle tue esigenze e prenota il tuo trasferimento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/prenota" variant="primary">
              Prenota Online
            </Button>
            <Button href="/preventivo" variant="outline">
              Richiedi Preventivo
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
