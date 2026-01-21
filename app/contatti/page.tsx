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
          {/* Informazioni Generali */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-black text-center">
                Dati Aziendali
              </h2>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                      Telefono
                    </h3>
                    <a
                  href="tel:+393384056027"
                      className="text-lg text-gray-600 hover:text-black transition-colors duration-200"
                    >
                  +39 338 405 6027
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                  Disponibile 24/7
                    </p>
                  </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                      Email
                    </h3>
                    <a
                  href="mailto:lakecomoincar@gmail.com"
                      className="text-lg text-gray-600 hover:text-black transition-colors duration-200"
                    >
                  lakecomoincar@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                  Risposta in 24h
                    </p>
                  </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                  Orari
                </h3>
                <p className="text-lg text-gray-600">
                  Servizio 24/7
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Ufficio: Lun-Ven 9-18
                </p>
                </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                  Area Servizio
                    </h3>
                    <p className="text-lg text-gray-600">
                  Lombardia e Svizzera
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                  2 sedi operative
                </p>
              </div>
            </div>
          </div>

          {/* Le Nostre Sedi */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-black text-center">
              Le Nostre Sedi
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sede Corte Re */}
              <div className="border-2 border-black overflow-hidden">
                <div className="bg-black text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">
                    Sede Corte Re
                  </h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      Località Corte del Re, 264<br />
                      22041 Corte Re (CO)
                    </p>
                  </div>
                </div>
                <div className="relative w-full h-96">
                  <iframe
                    src="https://maps.google.com/maps?q=Localit%C3%A0%20Corte%20del%20Re%2C%20264%2C%2022041%20Corte%20Re%20CO&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa Sede Corte Re"
                  ></iframe>
                </div>
                  </div>

              {/* Sede Como */}
              <div className="border-2 border-black overflow-hidden">
                <div className="bg-black text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">
                    Sede Como
                    </h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      Via Francesco Benzi, 14<br />
                      22100 Como (CO)
                    </p>
                  </div>
                </div>
                <div className="relative w-full h-96">
                  <iframe
                    src="https://maps.google.com/maps?q=Via%20Francesco%20Benzi%2C%2014%2C%2022100%20Como%20CO&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa Sede Como"
                  ></iframe>
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
