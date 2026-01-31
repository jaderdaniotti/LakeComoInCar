import type { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseUrl = 'https://www.lakecomoincar.eu';

const titles: Record<string, string> = {
  it: 'Tour Bernina Express | NCC Como - Transfer Trenino Rosso',
  en: 'Bernina Express Tour | NCC Como - Red Train Transfer',
  fr: 'Tour Bernina Express | NCC Como - Transfer Train Rouge',
  es: 'Tour Bernina Express | NCC Como - Transfer Tren Rojo',
};

const descriptions: Record<string, string> = {
  it: 'Transfer per il Bernina Express. Tour panoramico in treno da Como a Tirano con NCC Como.',
  en: 'Transfer to Bernina Express. Panoramic train tour from Como to Tirano with NCC Como.',
  fr: 'Transfert pour le Bernina Express. Tour panoramique en train de Como à Tirano.',
  es: 'Transfer al Bernina Express. Tour panorámico en tren de Como a Tirano.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/bernina-express`;

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/tour/bernina-express`,
        'en': `${baseUrl}/en/tour/bernina-express`,
        'fr': `${baseUrl}/fr/tour/bernina-express`,
        'es': `${baseUrl}/es/tour/bernina-express`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Tour Bernina Express' }],
    },
    twitter: { card: 'summary_large_image', title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en, images: [`${baseUrl}/og-image.jpg`] },
    robots: { index: true, follow: true },
  };
}

export default function BerninaExpressLayout({ children }: Props) {
  return <>{children}</>;
}
