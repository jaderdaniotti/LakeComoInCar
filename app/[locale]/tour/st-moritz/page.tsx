'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Mountain, Snowflake, Camera } from 'lucide-react';

export default function StMoritzPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <Mountain className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            St. Moritz
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Eleganza alpina nel cuore delle Alpi svizzere
          </p>
        </div>
      </SectionWrapper>

      {/* Immagine Placeholder Hero */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">Immagine St. Moritz</span>
      </div>

      {/* Descrizione */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            St. Moritz è sinonimo di eleganza alpina, una delle località di montagna più esclusive al mondo. 
            Situata a 1.856 metri di altitudine nell&apos;Alta Engadina, ti accompagniamo in questa perla 
            delle Alpi svizzere per un&apos;esperienza indimenticabile.
          </p>
        </div>
      </SectionWrapper>

      {/* Attrazioni */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            Cosa Vedere
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Lago */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Lago</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Lago di St. Moritz
                </h3>
                <p className="text-gray-300">
                  Il lago alpino simbolo della città, d&apos;inverno si congela completamente 
                  ospitando eventi esclusivi.
                </p>
              </div>
            </div>

            {/* Shopping */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Via Serlas</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Via Serlas
                </h3>
                <p className="text-gray-300">
                  La via dello shopping di lusso con boutique dei brand più prestigiosi al mondo.
                </p>
              </div>
            </div>

            {/* Panorami */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Panorama</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Muottas Muragl
                </h3>
                <p className="text-gray-300">
                  Terrazza panoramica raggiungibile con funicolare per viste spettacolari sui laghi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Stagionalità */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black uppercase">
            Inverno & Estate
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inverno */}
            <div className="border-2 border-black p-8">
              <div className="flex items-center gap-4 mb-6">
                <Snowflake className="w-12 h-12" />
                <h3 className="text-3xl font-bold uppercase">Inverno</h3>
              </div>
              <div className="relative w-full h-64 bg-gray-100 border-2 border-black mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-sm uppercase">Immagine Inverno</span>
              </div>
              <p className="text-gray-700">
                St. Moritz d&apos;inverno è pura magia. Paesaggi innevati spettacolari, 
                il lago ghiacciato con eventi esclusivi e un&apos;atmosfera unica.
              </p>
            </div>

            {/* Estate */}
            <div className="border-2 border-black p-8 bg-black text-white">
              <div className="flex items-center gap-4 mb-6">
                <Camera className="w-12 h-12" />
                <h3 className="text-3xl font-bold uppercase">Estate</h3>
              </div>
              <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                <span className="text-gray-600 text-sm uppercase">Immagine Estate</span>
              </div>
              <p className="text-gray-300">
                L&apos;estate svela prati fioriti, laghi cristallini balneabili e 
                un&apos;atmosfera rilassata ma sempre raffinata.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Galleria */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            Galleria
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
          Interessato al Tour?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contattaci per maggiori informazioni e per organizzare il tuo viaggio a St. Moritz
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="tel:+393384056027" variant="primary">
            Chiama Ora
          </Button>
          <Button href="/contatti" variant="outline">
            Contattaci
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
