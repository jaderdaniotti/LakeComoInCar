'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { ShoppingBag, Star } from 'lucide-react';

export default function ShoppingTourPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            Shopping Tour
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Esperienze di shopping esclusive a Milano e outlet premium
          </p>
        </div>
      </SectionWrapper>

      {/* Immagine Placeholder Hero */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">Immagine Shopping</span>
      </div>

      {/* Descrizione Breve */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            Scopri il meglio dello shopping di lusso italiano con il nostro servizio esclusivo. 
            Ti accompagniamo nelle destinazioni più prestigiose, dai boutique del Quadrilatero 
            della Moda agli outlet più rinomati.
          </p>
        </div>
      </SectionWrapper>

      {/* Destinazioni Shopping */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            Le Destinazioni
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quadrilatero Milano */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Quadrilatero</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Quadrilatero della Moda
                </h3>
                <p className="text-gray-300 mb-4">
                  Il cuore dello shopping di lusso a Milano. Via Montenapoleone, Via della Spiga, 
                  Via Manzoni e Via Sant&apos;Andrea.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Boutique alta moda</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Gioiellerie esclusive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Flagship internazionali</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Serravalle */}
            <div className="border-2 border-white p-1">
              <div className="border-2 h-full border-white p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Serravalle</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Serravalle Outlet
                </h3>
                <p className="text-gray-300 mb-4">
                  Il più grande outlet d&apos;Europa con oltre 300 boutique e sconti eccezionali 
                  sui migliori brand.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>300+ brand di lusso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Sconti fino al 70%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Personal shopper</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FoxTown */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine FoxTown</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  FoxTown Svizzera
                </h3>
                <p className="text-gray-300 mb-4">
                  Outlet svizzero a pochi km dal confine, con brand premium e tax-free shopping.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>160+ brand internazionali</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Tax-free shopping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={16} />
                    <span>A 30 min da Como</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Galleria Immagini Placeholder */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black uppercase">
            Galleria
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative w-full h-64 bg-gray-100 border-2 border-black flex items-center justify-center">
                <span className="text-gray-400 uppercase text-sm">Immagine {i}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Contatti */}
      <SectionWrapper className="bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
          Interessato al Tour?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Contattaci per maggiori informazioni e per organizzare il tuo shopping tour personalizzato
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
