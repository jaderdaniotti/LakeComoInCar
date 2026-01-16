import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contatti - Como Lake Car | Contattaci per il Tuo Trasferimento',
  description: 'Contatta Como Lake Car per informazioni, prenotazioni e preventivi. Telefono, email e informazioni per il servizio NCC a Como, Milano e Svizzera.',
};

export default function ContattiPage() {
  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Contatti
          </h1>
          <p className="text-xl text-gray-300">
            Siamo a tua disposizione per qualsiasi informazione o richiesta
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Informazioni Contatto */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-black">
                Dati Aziendali
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-black uppercase tracking-wider">
                      Telefono
                    </h3>
                    <a
                      href="tel:+390314123456"
                      className="text-lg text-gray-600 hover:text-black transition-colors duration-200"
                    >
                      +39 031 412 3456
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Disponibile 24/7 per emergenze
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-black uppercase tracking-wider">
                      Email
                    </h3>
                    <a
                      href="mailto:info@comolakecar.it"
                      className="text-lg text-gray-600 hover:text-black transition-colors duration-200"
                    >
                      info@comolakecar.it
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Rispondiamo entro 24 ore
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-black uppercase tracking-wider">
                      Sede
                    </h3>
                    <p className="text-lg text-gray-600">
                      Como, Lombardia, Italia
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Servizio disponibile in tutta la Lombardia e Svizzera
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-black uppercase tracking-wider">
                      Orari
                    </h3>
                    <p className="text-lg text-gray-600">
                      Servizio 24/7
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ufficio: Lun-Ven 9:00-18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mappa Placeholder */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-black">
                La Nostra Zona
              </h2>
              <div className="border-2 border-black h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">
                    Mappa interattiva
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {/* TODO: Integrare Google Maps o Mapbox */}
                    Integrazione mappa da implementare
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Pronto a Prenotare?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Scegli il metodo più comodo per te
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
        </div>
      </SectionWrapper>
    </>
  );
}
