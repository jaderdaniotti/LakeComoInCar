import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Car, Users, Shield, Star } from 'lucide-react';
import data from '@/src/data/images';

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
        'veicoli ncc como', 'mercedes v-class', 'mercedes v-class 4matic',
        'mercedes v-class 2wd', 'ncc milano veicoli', 'auto con conducente',
        'veicoli lusso como', 'van premium como'
      ]
    : [];

  return {
    title: locale === 'it'
      ? "Veicoli NCC Como | Mercedes V-Class 4MATIC e 2WD | Premium"
      : t('title'),
    description: locale === 'it'
      ? "Veicoli NCC Como: Mercedes V-Class 4MATIC e V-Class 2WD. Van premium con spazio per 8 passeggeri, ideali per gruppi, famiglie e trasferimenti aeroporti. Scopri i nostri veicoli!"
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
        ? "Veicoli NCC Como | Mercedes V-Class 4MATIC e 2WD"
        : t('title'),
      description: locale === 'it'
        ? "Veicoli NCC Como: Mercedes V-Class 4MATIC e 2WD. Van premium per gruppi e trasferimenti."
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
        ? "Veicoli NCC Como | Mercedes V-Class 4MATIC e 2WD"
        : t('title'),
      description: locale === 'it'
        ? "Veicoli NCC Como: Mercedes V-Class 4MATIC e 2WD."
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
      name: t('vehicleList.vclass4matic.name'),
      category: t('vehicleList.vclass4matic.category'),
      passengers: t('vehicleList.vclass4matic.passengers'),
      luggage: t('vehicleList.vclass4matic.luggage'),
      features: [
        t('vehicleList.vclass4matic.features.traction'),
        t('vehicleList.vclass4matic.features.space'),
        t('vehicleList.vclass4matic.features.comfort'),
        t('vehicleList.vclass4matic.features.safety'),
      ],
      ideal: t('vehicleList.vclass4matic.ideal'),
    },
    {
      id: 2,
      name: t('vehicleList.vclass2wd.name'),
      category: t('vehicleList.vclass2wd.category'),
      passengers: t('vehicleList.vclass2wd.passengers'),
      luggage: t('vehicleList.vclass2wd.luggage'),
      features: [
        t('vehicleList.vclass2wd.features.efficiency'),
        t('vehicleList.vclass2wd.features.space'),
        t('vehicleList.vclass2wd.features.luxury'),
        t('vehicleList.vclass2wd.features.technology'),
      ],
      ideal: t('vehicleList.vclass2wd.ideal'),
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
                <div className={index % 2 === 0 ? 'border-2 border-white p-8' : 'border-2 border-black p-8'}>
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? 'text-white' : 'text-black'}`}>
                    {/* Immagine */}
                    <div className={`relative w-full h-80 flex items-center justify-center overflow-hidden ${index % 2 === 0 ? 'border-2 border-white order-1' : 'border-2 border-black order-2'}`}>
                      <Image 
                        src={data.vclass} 
                        alt={`${vehicle.name} - ${vehicle.category} - Autoservizi Pasquillo NCC Como`}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Dettagli */}
                    <div className={`flex flex-col justify-center ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
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
                        <div className={index % 2 === 0 ? 'border-2 border-white p-4' : 'border-2 border-black p-4'}>
                          <Users className="w-8 h-8 mb-2" />
                          <p className="text-sm uppercase mb-1">{t('gallery.passengers')}</p>
                          <p className="text-2xl font-bold">{vehicle.passengers}</p>
                        </div>
                        <div className={index % 2 === 0 ? 'border-2 border-white p-4' : 'border-2 border-black p-4'}>
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
