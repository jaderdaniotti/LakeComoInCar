import type { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Plane, Briefcase, Heart, Clock, Users } from 'lucide-react';
import data from '@/src/data/images';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.metadata' });

  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/servizi`;

  const keywords = locale === 'it'
    ? [
        'ncc como', 'servizi ncc', 'transfer aeroporto milano',
        'ncc milano', 'servizi business como', 'ncc eventi',
        'transfer malpensa', 'transfer linate', 'ncc matrimoni'
      ]
    : [];

  return {
    title: locale === 'it'
      ? "Servizi NCC Como | Transfer Aeroporti | Business & Eventi | Autoservizi Pasquillo"
      : t('title'),
    description: locale === 'it'
      ? "Servizi NCC Como professionali: transfer aeroporti Milano (Malpensa, Linate), servizi business, eventi e matrimoni. Disponibili 24/7. Scopri tutti i nostri servizi!"
      : t('description'),
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/servizi`,
        'en': `${baseUrl}/en/servizi`,
        'fr': `${baseUrl}/fr/servizi`,
        'es': `${baseUrl}/es/servizi`,
      },
    },
    openGraph: {
      title: locale === 'it'
        ? "Servizi NCC Como | Transfer Aeroporti | Business & Eventi"
        : t('title'),
      description: locale === 'it'
        ? "Servizi NCC Como professionali: transfer aeroporti, business, eventi. Disponibili 24/7."
        : t('description'),
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale: locale,
      type: 'website',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Servizi NCC Como - Autoservizi Pasquillo',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'it'
        ? "Servizi NCC Como | Transfer Aeroporti | Business & Eventi"
        : t('title'),
      description: locale === 'it'
        ? "Servizi NCC Como professionali: transfer aeroporti, business, eventi."
        : t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ServiziPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl pt-20 mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-300">
            {t('hero.subtitle')}
          </p>
        </div>
      </SectionWrapper>

      {/* Servizio NCC */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-black">
            {t('ncc.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {t('ncc.paragraph1')}
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {t('ncc.paragraph2')}
          </p>
          {locale === 'it' && (
            <p className="text-lg text-gray-600 leading-relaxed">
              Il nostro servizio <strong>NCC Como</strong> è disponibile per <strong>transfer aeroporto Milano</strong>, 
              servizi business e eventi. Scopri la nostra <Link href="/veicoli" className="text-black underline hover:text-gray-600 mx-1 font-semibold">
                flotta veicoli
              </Link> e 
              <Link href="/prenota" className="text-black underline hover:text-gray-600 mx-1 font-semibold">
                prenota online
              </Link> il tuo <strong>NCC Como</strong>.
            </p>
          )}
        </div>
      </SectionWrapper>

      {/* Tipologie di Servizio */}
      <SectionWrapper className="bg-black text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('serviceTypes.title')}
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
                  {t('airport.title')}
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {t('airport.description')}
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('airport.airports.malpensa')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('airport.airports.linate')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('airport.airports.bergamo')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('airport.airports.swiss')}</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('airport.features')}
              </p>
            </div>
            <div className="border-2 border-white  h-full flex items-center justify-center">
                <Image src={data.aereo} alt='Transfer aeroporto Milano - Servizio NCC Como per aeroporti Malpensa, Linate e Bergamo' className='w-full h-full object-cover'/>
            </div>
          </div>

          {/* Servizi Business */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 border-2 border-white  h-full flex items-center justify-center">
                <Image src={data.meeting} alt='Servizi business NCC Como - Transfer per meeting, fiere e viaggi di lavoro' className='w-full h-full object-cover'/>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                  {t('business.title')}
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {t('business.description')}
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('business.features.meetings')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('business.features.fairs')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('business.features.multistop')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('business.features.billing')}</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('business.conclusion')}
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
                  {t('events.title')}
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {t('events.description')}
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('events.features.ceremonies')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('events.features.celebrations')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('events.features.decorated')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{t('events.features.packages')}</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('events.conclusion')}
              </p>
            </div>
            <div className="border-2 border-white  h-full flex items-center justify-center">
              <Image src={data.wedding} alt='NCC Como per eventi e matrimoni - Servizio transfer elegante per cerimonie' className='w-full h-full object-cover'/>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-black">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/prenota" variant="primary">
              {t('cta.bookOnline')}
            </Button>
            <Button href="/preventivo" variant="outline">
              {t('cta.requestQuote')}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
