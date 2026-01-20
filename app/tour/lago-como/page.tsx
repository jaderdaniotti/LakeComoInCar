'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Waves } from 'lucide-react';

export default function LagoComoPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <Waves className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            Lago di Como
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Scopri le meraviglie del lago più bello d&apos;Italia
          </p>
        </div>
      </SectionWrapper>

      {/* Immagine Placeholder Hero */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">Immagine Lago di Como</span>
      </div>

      {/* Descrizione */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            Il Lago di Como è una delle destinazioni più iconiche d&apos;Italia. Con il nostro tour privato, 
            ti portiamo a scoprire le perle del lago: borghi pittoreschi, ville storiche e panorami mozzafiato.
          </p>
        </div>
      </SectionWrapper>

      {/* Le Perle del Lago */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            Le Perle del Lago
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bellagio */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Bellagio</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Bellagio
                </h3>
                <p className="text-gray-300">
                  La &quot;Perla del Lago&quot;, il borgo più famoso e fotografato con le sue viuzze eleganti.
                </p>
              </div>
            </div>

            {/* Varenna */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Varenna</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Varenna
                </h3>
                <p className="text-gray-300">
                  Borgo medievale autentico con il Castello di Vezio e viuzze fiorite.
                </p>
              </div>
            </div>

            {/* Como */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Como</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Como Città
                </h3>
                <p className="text-gray-300">
                  La città con il Duomo gotico, la funicolare panoramica e il lungolago elegante.
                </p>
              </div>
            </div>

            {/* Cernobbio */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Cernobbio</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Cernobbio
                </h3>
                <p className="text-gray-300">
                  Località esclusiva con Villa d&apos;Este, uno degli hotel più lussuosi al mondo.
                </p>
              </div>
            </div>

            {/* Menaggio */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Menaggio</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Menaggio
                </h3>
                <p className="text-gray-300">
                  Borgo vivace e solare con un lungolago animato e Villa Carlotta vicina.
                </p>
              </div>
            </div>

            {/* Lenno */}
            <div className="border-2 border-white p-1">
              <div className="border-2 border-white h-full p-6">
                <div className="relative w-full h-64 bg-gray-800 border-2 border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm uppercase">Immagine Lenno</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase">
                  Villa Balbianello
                </h3>
                <p className="text-gray-300">
                  Villa spettacolare, location di Star Wars e 007 Casino Royale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Ville Storiche */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black uppercase">
            Le Ville Storiche
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Villa Balbianello */}
            <div className="border-2 border-black p-8">
              <div className="relative w-full h-64 bg-gray-100 border-2 border-black mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-sm uppercase">Immagine Balbianello</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Villa del Balbianello</h3>
              <p className="text-gray-700">
                Giardini a terrazza mozzafiato e viste panoramiche sul lago. 
                Location cinematografica di fama mondiale.
              </p>
            </div>

            {/* Villa Carlotta */}
            <div className="border-2 border-black p-8">
              <div className="relative w-full h-64 bg-gray-100 border-2 border-black mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-sm uppercase">Immagine Carlotta</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Villa Carlotta</h3>
              <p className="text-gray-700">
                Museo e giardini botanici spettacolari con azalee, rododendri e collezione d&apos;arte.
              </p>
            </div>

            {/* Villa Monastero */}
            <div className="border-2 border-black p-8">
              <div className="relative w-full h-64 bg-gray-100 border-2 border-black mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-sm uppercase">Immagine Monastero</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Villa Monastero</h3>
              <p className="text-gray-700">
                Ex monastero con giardini botanici di 2 km lungo il lago e museo scientifico.
              </p>
            </div>

            {/* Villa Melzi */}
            <div className="border-2 border-black p-8">
              <div className="relative w-full h-64 bg-gray-100 border-2 border-black mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-sm uppercase">Immagine Melzi</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Villa Melzi</h3>
              <p className="text-gray-700">
                Giardini all&apos;inglese romantici con sculture neoclassiche e lago giapponese.
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
          Interessato al Tour?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contattaci per maggiori informazioni e per organizzare il tuo tour del Lago di Como
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
