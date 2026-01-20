import type { Metadata } from "next";
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Car, Users, Shield, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'I Nostri Veicoli - LakeComoInCar | Flotta Premium NCC',
  description: 'Flotta di veicoli premium per il tuo trasporto: Mercedes, BMW e van di lusso. Veicoli moderni, eleganti e perfettamente manutenuti per il massimo comfort.',
};

const vehicles = [
  {
    id: 1,
    name: 'Mercedes Classe E',
    category: 'Berlina Premium',
    passengers: '1-4',
    luggage: '3-4',
    features: [
      'Aria condizionata',
      'Wi-Fi a bordo',
      'Sedili in pelle',
      'Sistema audio premium',
    ],
    ideal: 'Transfer aeroporti, servizi business, eventi',
  },
  {
    id: 2,
    name: 'BMW Serie 5',
    category: 'Berlina Executive',
    passengers: '1-4',
    luggage: '3-4',
    features: [
      'Interni in pelle',
      'Sistema audio premium',
      'Sedili riscaldati',
      'Climatizzatore automatico',
    ],
    ideal: 'Clienti business, transfer executive, occasioni speciali',
  },
  {
    id: 3,
    name: 'Mercedes Viano/Vito',
    category: 'Van Premium',
    passengers: '5-8',
    luggage: '6-8',
    features: [
      'Ampio bagagliaio',
      'Sedute confortevoli',
      'Climatizzatore',
      'Spazio per gruppi',
    ],
    ideal: 'Gruppi, famiglie, tour, trasferimenti aeroporti con bagagli',
  },
];

export default function VeicoliPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <Car className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            I Nostri Veicoli
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Flotta moderna e confortevole per ogni esigenza di trasporto
          </p>
        </div>
      </SectionWrapper>

      {/* Immagine Hero */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">Immagine Flotta</span>
      </div>

      {/* Descrizione */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            La nostra flotta è composta da veicoli di ultima generazione, selezionati per garantire 
            il massimo comfort, sicurezza ed eleganza in ogni viaggio. Ogni veicolo è perfettamente 
            manutenuto e dotato di tutti i comfort moderni.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold mb-2">Sempre Sicuri</h3>
              <p className="text-gray-600">Manutenzione regolare e controlli costanti</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold mb-2">Premium Comfort</h3>
              <p className="text-gray-600">Interni curati e dotazioni di lusso</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold mb-2">Ogni Esigenza</h3>
              <p className="text-gray-600">Dal singolo passeggero ai gruppi numerosi</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Galleria Veicoli */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            La Nostra Flotta
          </h2>
          <div className="space-y-12">
            {vehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id}
                className={`border-2 border-white p-1 ${index % 2 === 0 ? '' : 'bg-white'}`}
              >
                <div className={`border-2 border-${index % 2 === 0 ? 'white' : 'black'} p-8`}>
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? 'text-white' : 'text-black'}`}>
                    {/* Immagine */}
                    <div className={`relative w-full h-80 bg-${index % 2 === 0 ? 'gray-800' : 'gray-100'} border-2 border-${index % 2 === 0 ? 'white' : 'black'} flex items-center justify-center order-${index % 2 === 0 ? '1' : '2'}`}>
                      <span className={`${index % 2 === 0 ? 'text-gray-500' : 'text-gray-400'} uppercase text-sm`}>
                        Immagine {vehicle.name}
                      </span>
                    </div>

                    {/* Dettagli */}
                    <div className={`flex flex-col justify-center order-${index % 2 === 0 ? '2' : '1'}`}>
                      <div className="mb-6">
                        <p className={`text-sm uppercase tracking-wider mb-2 ${index % 2 === 0 ? 'text-gray-400' : 'text-gray-600'}`}>
                          {vehicle.category}
                        </p>
                        <h3 className="text-4xl font-bold mb-4 uppercase">
                          {vehicle.name}
                        </h3>
                      </div>

                      {/* Info Capacità */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className={`border-2 border-${index % 2 === 0 ? 'white' : 'black'} p-4`}>
                          <Users className="w-8 h-8 mb-2" />
                          <p className="text-sm uppercase mb-1">Passeggeri</p>
                          <p className="text-2xl font-bold">{vehicle.passengers}</p>
                        </div>
                        <div className={`border-2 border-${index % 2 === 0 ? 'white' : 'black'} p-4`}>
                          <Car className="w-8 h-8 mb-2" />
                          <p className="text-sm uppercase mb-1">Bagagli</p>
                          <p className="text-2xl font-bold">{vehicle.luggage}</p>
                        </div>
                      </div>

                      {/* Caratteristiche */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-3 uppercase">Caratteristiche</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {vehicle.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Star size={16} className={index % 2 === 0 ? 'text-white' : 'text-black'} />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ideale per */}
                      <div>
                        <h4 className="text-lg font-bold mb-2 uppercase">Ideale per</h4>
                        <p className={index % 2 === 0 ? 'text-gray-300' : 'text-gray-700'}>
                          {vehicle.ideal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Perché Scegliere i Nostri Veicoli */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black uppercase">
            Perché Scegliere i Nostri Veicoli
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-2 border-black p-6 text-center">
              <div className="text-4xl font-bold mb-3">100%</div>
              <p className="uppercase font-bold">Manutenzione Garantita</p>
            </div>
            <div className="border-2 border-black p-6 text-center bg-black text-white">
              <div className="text-4xl font-bold mb-3">2023+</div>
              <p className="uppercase font-bold">Modelli Recenti</p>
            </div>
            <div className="border-2 border-black p-6 text-center">
              <div className="text-4xl font-bold mb-3">24/7</div>
              <p className="uppercase font-bold">Sempre Disponibili</p>
            </div>
            <div className="border-2 border-black p-6 text-center bg-black text-white">
              <div className="text-4xl font-bold mb-3">TOP</div>
              <p className="uppercase font-bold">Comfort Premium</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Galleria Immagini */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            Galleria Veicoli
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="relative w-full h-64 bg-gray-800 border-2 border-white flex items-center justify-center">
                <span className="text-gray-600 uppercase text-sm">Immagine {i}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase text-black">
          Prenota il Tuo Viaggio
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Scegli il veicolo perfetto per le tue esigenze e viaggia con comfort e stile
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/prenota" variant="primary">
            Prenota Online
          </Button>
          <Button href="tel:+393384056027" variant="outline">
            Chiama Ora
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
