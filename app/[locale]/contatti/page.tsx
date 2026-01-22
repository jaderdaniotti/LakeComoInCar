import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contacts.metadata' });

  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/contatti`;

  const keywords = locale === 'it'
    ? [
        'contatti ncc como', 'telefono ncc como', 'ncc como indirizzo',
        'autoservizi pasquillo contatti', 'ncc como email', 'prenota ncc como'
      ]
    : [];

  return {
    title: locale === 'it'
      ? "Contatti NCC Como | Autoservizi Pasquillo"
      : t('title'),
    description: locale === 'it'
      ? "Contatti Autoservizi Pasquillo - NCC Como. Telefono: +39 338 405 6027. Email: lakecomoincar@gmail.com. Disponibili 24/7 per prenotazioni e informazioni."
      : t('description'),
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/contatti`,
        'en': `${baseUrl}/en/contatti`,
        'fr': `${baseUrl}/fr/contatti`,
        'es': `${baseUrl}/es/contatti`,
      },
    },
    openGraph: {
      title: locale === 'it'
        ? "Contatti NCC Como | Autoservizi Pasquillo"
        : t('title'),
      description: locale === 'it'
        ? "Contatti Autoservizi Pasquillo - NCC Como. Disponibili 24/7."
        : t('description'),
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale: locale,
      type: 'website',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contatti NCC Como - Autoservizi Pasquillo',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'it'
        ? "Contatti NCC Como | Autoservizi Pasquillo"
        : t('title'),
      description: locale === 'it'
        ? "Contatti Autoservizi Pasquillo - NCC Como. Disponibili 24/7."
        : t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ContattiPage() {
  const t = useTranslations('contacts');
  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto pt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-300">
            {t('hero.subtitle')}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Informazioni Generali */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black text-center">
              {t('companyData.title')}
            </h2>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                  {t('info.phone.title')}
                </h3>
                <a
                  href="tel:+393384056027"
                  className="text-lg text-gray-600 hover:text-black transition-colors duration-200"
                >
                  +39 338 405 6027
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  {t('info.phone.available')}
                </p>
                  </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                  {t('info.email.title')}
                </h3>
                <a
                  href="mailto:lakecomoincar@gmail.com"
                  className="text-lg text-gray-600 hover:text-black transition-colors duration-200"
                >
                  lakecomoincar@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  {t('info.email.response')}
                </p>
                  </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                  {t('info.hours.title')}
                </h3>
                <p className="text-lg text-gray-600">
                  {t('info.hours.service')}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('info.hours.office')}
                </p>
                </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wider">
                  {t('info.areaService.title')}
                </h3>
                <p className="text-lg text-red-500">
                  {/* {t('info.areaService.region')} */} Da mettere sedi
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('info.areaService.offices')}
                </p>
              </div>
            </div>
          </div>

          {/* Le Nostre Sedi */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black text-center">
              {t('offices.title')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sede Corte Re */}
              <div className="border-2 border-black overflow-hidden">
                <div className="bg-black text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">
                    {t('offices.corteRe.title')}
                  </h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      {t('offices.corteRe.address')}<br />
                      {t('offices.corteRe.city')}
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
                    title={t('offices.corteRe.mapTitle')}
                  ></iframe>
                </div>
                  </div>

              {/* Sede Como */}
              <div className="border-2 border-black overflow-hidden">
                <div className="bg-black text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">
                    {t('offices.como.title')}
                  </h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      {t('offices.como.address')}<br />
                      {t('offices.como.city')}
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
                    title={t('offices.como.mapTitle')}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('cta.subtitle')}
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
        </div>
      </SectionWrapper>
    </>
  );
}
