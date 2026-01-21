'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Train, Mountain } from 'lucide-react';

export default function BerninaExpressPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <Train className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            Bernina Express
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Il treno panoramico più spettacolare delle Alpi
          </p>
        </div>
      </SectionWrapper>

      {/* Immagine Placeholder Hero */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">Immagine Bernina Express</span>
      </div>

      {/* Descrizione Breve */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            Il Bernina Express è uno dei viaggi in treno più spettacolari al mondo, Patrimonio UNESCO. 
            Ti accompagniamo da Como/Milano a Tirano, dove salirai sul leggendario treno panoramico 
            che attraversa le Alpi svizzere fino a St. Moritz.
          </p>
        </div>
      </SectionWrapper>

      {/* Highlights */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            Highlights del Viaggio
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Viadotto */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Viadotto</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Viadotto di Brusio
                </h3>
                <p className="text-gray-300">
                  Il celebre viadotto elicoidale, capolavoro dell&apos;ingegneria con nove arcate 
                  in curva a spirale.
                </p>
              </div>
            </div>

            {/* Ghiacciai */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Ghiacciai</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Ghiacciai Alpini
                </h3>
                <p className="text-gray-300">
                  Vista mozzafiato sui ghiacciai perenni delle Alpi, incluso il maestoso 
                  ghiacciaio del Morteratsch.
                </p>
              </div>
            </div>

            {/* St. Moritz */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine St. Moritz</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  St. Moritz
                </h3>
                <p className="text-gray-300">
                  Destinazione finale: una delle località alpine più esclusive al mondo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Il Percorso */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-black uppercase">
            Il Percorso
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 border-2 border-black">
              <Mountain className="w-10 h-10 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Passo del Bernina</h3>
                <p className="text-gray-700">
                  Il punto più alto del percorso a 2.253 metri di altitudine
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 border-2 border-black">
              <Mountain className="w-10 h-10 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">55 Gallerie e 196 Ponti</h3>
                <p className="text-gray-700">
                  Un capolavoro di ingegneria ferroviaria attraverso le Alpi
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 border-2 border-black">
              <Mountain className="w-10 h-10 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Patrimonio UNESCO</h3>
                <p className="text-gray-700">
                  Riconosciuto come Patrimonio dell&apos;Umanità per la sua bellezza unica
                </p>
              </div>
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
          Contattaci per maggiori informazioni e per organizzare il tuo viaggio sul Bernina Express
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
