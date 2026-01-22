import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/preventivo`;

  const title = locale === 'it'
    ? "Preventivo NCC Como | Richiedi Preventivo Gratuito | Autoservizi Pasquillo"
    : "Request Quote | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Richiedi un preventivo gratuito per il tuo servizio NCC Como. Transfer aeroporti, servizi business, eventi. Risposta veloce e preventivo personalizzato!"
    : "Request a free quote for your NCC service. Fast response and personalized quote!";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? [
          'preventivo ncc como', 'richiedi preventivo', 'preventivo transfer',
          'preventivo taxi como', 'preventivo gratuito ncc', 'preventivo online'
        ]
      : [],
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/preventivo`,
        'en': `${baseUrl}/en/preventivo`,
        'fr': `${baseUrl}/fr/preventivo`,
        'es': `${baseUrl}/es/preventivo`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale: locale,
      type: 'website',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Preventivo NCC Como - Autoservizi Pasquillo',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PreventivoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
