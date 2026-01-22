import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Car, Users, Shield, Star } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vehicles.metadata' });

  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/veicoli`;

  const keywords = locale === 'it'
    ? [
        'veicoli ncc como', 'mercedes classe e', 'bmw serie 5',
        'mercedes viano', 'ncc milano veicoli', 'auto con conducente',
        'flotta ncc como', 'veicoli lusso como'
      ]
    : [];

  return {
    title: locale === 'it'
      ? "Veicoli NCC Como | Mercedes, BMW | Flotta Premium | Autoservizi Pasquillo"
      : t('title'),
    description: locale === 'it'
      ? "Flotta veicoli NCC Como: Mercedes Classe E, BMW Serie 5, Mercedes Viano. Veicoli moderni e confortevoli per transfer aeroporti, business ed eventi. Scopri la nostra flotta!"
      : t('description'),
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/veicoli`,
        'en': `${baseUrl}/en/veicoli`,
        'fr': `${baseUrl}/fr/veicoli`,
        'es': `${baseUrl}/es/veicoli`,
      },
    },
    openGraph: {
      title: locale === 'it'
        ? "Veicoli NCC Como | Mercedes, BMW | Flotta Premium"
        : t('title'),
      description: locale === 'it'
        ? "Flotta veicoli NCC Como: Mercedes, BMW, veicoli moderni per ogni esigenza."
        : t('description'),
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale: locale,
      type: 'website',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Veicoli NCC Como - Autoservizi Pasquillo',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'it'
        ? "Veicoli NCC Como | Mercedes, BMW | Flotta Premium"
        : t('title'),
      description: locale === 'it'
        ? "Flotta veicoli NCC Como: Mercedes, BMW, veicoli moderni."
        : t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function VeicoliPage() {
  const t = useTranslations('vehicles');
  
  // Build vehicles array from translations
  const vehicles = [
    {
      id: 1,
      name: t('vehicleList.mercedesE.name'),
      category: t('vehicleList.mercedesE.category'),
      passengers: t('vehicleList.mercedesE.passengers'),
      luggage: t('vehicleList.mercedesE.luggage'),
      features: [
        t('vehicleList.mercedesE.features.ac'),
        t('vehicleList.mercedesE.features.wifi'),
        t('vehicleList.mercedesE.features.leather'),
        t('vehicleList.mercedesE.features.audio'),
      ],
      ideal: t('vehicleList.mercedesE.ideal'),
    },
    {
      id: 2,
      name: t('vehicleList.bmw5.name'),
      category: t('vehicleList.bmw5.category'),
      passengers: t('vehicleList.bmw5.passengers'),
      luggage: t('vehicleList.bmw5.luggage'),
      features: [
        t('vehicleList.bmw5.features.leather'),
        t('vehicleList.bmw5.features.audio'),
        t('vehicleList.bmw5.features.heated'),
        t('vehicleList.bmw5.features.climate'),
      ],
      ideal: t('vehicleList.bmw5.ideal'),
    },
    {
      id: 3,
      name: t('vehicleList.viano.name'),
      category: t('vehicleList.viano.category'),
      passengers: t('vehicleList.viano.passengers'),
      luggage: t('vehicleList.viano.luggage'),
      features: [
        t('vehicleList.viano.features.trunk'),
        t('vehicleList.viano.features.seats'),
        t('vehicleList.viano.features.ac'),
        t('vehicleList.viano.features.space'),
      ],
      ideal: t('vehicleList.viano.ideal'),
    },
  ];
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto pt-20 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>
        </div>
      </SectionWrapper>

      {/* Immagine Hero */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">{t('imagePlaceholder')}</span>
      </div>

      {/* Descrizione */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {t('description.text')}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold mb-2">{t('description.alwaysSafe.title')}</h3>
              <p className="text-gray-600">{t('description.alwaysSafe.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold mb-2">{t('description.premiumComfort.title')}</h3>
              <p className="text-gray-600">{t('description.premiumComfort.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold mb-2">{t('description.everyNeed.title')}</h3>
              <p className="text-gray-600">{t('description.everyNeed.description')}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Galleria Veicoli */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            {t('gallery.title')}
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
                        {t('gallery.imagePlaceholder', { name: vehicle.name })}
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
                          <p className="text-sm uppercase mb-1">{t('gallery.passengers')}</p>
                          <p className="text-2xl font-bold">{vehicle.passengers}</p>
                        </div>
                        <div className={`border-2 border-${index % 2 === 0 ? 'white' : 'black'} p-4`}>
                          <Car className="w-8 h-8 mb-2" />
                          <p className="text-sm uppercase mb-1">{t('gallery.luggage')}</p>
                          <p className="text-2xl font-bold">{vehicle.luggage}</p>
                        </div>
                      </div>

                      {/* Caratteristiche */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-3 uppercase">{t('gallery.features')}</h4>
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
                        <h4 className="text-lg font-bold mb-2 uppercase">{t('gallery.idealFor')}</h4>
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
            {t('whyChoose.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-2 border-black p-6 text-center">
              <div className="text-4xl font-bold mb-3">{t('whyChoose.maintenance.value')}</div>
              <p className="uppercase font-bold">{t('whyChoose.maintenance.label')}</p>
            </div>
            <div className="border-2 border-black p-6 text-center bg-black text-white">
              <div className="text-4xl font-bold mb-3">{t('whyChoose.models.value')}</div>
              <p className="uppercase font-bold">{t('whyChoose.models.label')}</p>
            </div>
            <div className="border-2 border-black p-6 text-center">
              <div className="text-4xl font-bold mb-3">{t('whyChoose.availability.value')}</div>
              <p className="uppercase font-bold">{t('whyChoose.availability.label')}</p>
            </div>
            <div className="border-2 border-black p-6 text-center bg-black text-white">
              <div className="text-4xl font-bold mb-3">{t('whyChoose.comfort.value')}</div>
              <p className="uppercase font-bold">{t('whyChoose.comfort.label')}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Galleria Immagini */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase">
            {t('gallerySection.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="relative w-full h-64 bg-gray-800 border-2 border-white flex items-center justify-center">
                <span className="text-gray-600 uppercase text-sm">{t('gallerySection.imagePlaceholder', { number: i })}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase text-black">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/prenota" variant="primary">
            {t('cta.bookOnline')}
          </Button>
          <Button href="tel:+393384056027" variant="outline">
            {t('cta.callNow')}
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
