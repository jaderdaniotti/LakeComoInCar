import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://www.lakecomoincar.eu';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/prenota`;

  const title = locale === 'it'
    ? "Prenota NCC Como | Prenotazione Online | Transfer Aeroporti | Autoservizi Pasquillo"
    : "Book Now | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Prenota il tuo servizio NCC Como online. Transfer aeroporti Milano, servizi business, eventi. Disponibili 24/7. Prenotazione semplice e veloce!"
    : "Book your NCC service online. Available 24/7. Simple and fast booking!";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? [
          'prenota ncc como', 'prenotazione online ncc', 'prenota taxi como',
          'prenota transfer aeroporto', 'ncc como prenotazione', 'prenota online'
        ]
      : [],
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/prenota`,
        'en': `${baseUrl}/en/prenota`,
        'fr': `${baseUrl}/fr/prenota`,
        'es': `${baseUrl}/es/prenota`,
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
        alt: 'Prenota NCC Como - Autoservizi Pasquillo',
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

export default function PrenotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
