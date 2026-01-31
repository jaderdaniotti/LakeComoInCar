import type { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseUrl = 'https://www.lakecomoincar.eu';

const titles: Record<string, string> = {
  it: 'Tour Lago di Como | NCC Como - Bellagio, Varenna',
  en: 'Lake Como Tour | NCC Como - Bellagio, Varenna',
  fr: 'Tour Lac de Côme | NCC Como - Bellagio, Varenna',
  es: 'Tour Lago de Como | NCC Como - Bellagio, Varenna',
};

const descriptions: Record<string, string> = {
  it: 'Tour privato del Lago di Como. Scopri Bellagio, Varenna e le perle del lago con NCC Como.',
  en: 'Private Lake Como tour. Discover Bellagio, Varenna and the pearls of the lake with NCC Como.',
  fr: 'Tour privé du Lac de Côme. Découvrez Bellagio, Varenna et les perles du lac.',
  es: 'Tour privado del Lago de Como. Descubre Bellagio, Varenna y las perlas del lago.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/lago-como`;

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/tour/lago-como`,
        'en': `${baseUrl}/en/tour/lago-como`,
        'fr': `${baseUrl}/fr/tour/lago-como`,
        'es': `${baseUrl}/es/tour/lago-como`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Tour Lago di Como' }],
    },
    twitter: { card: 'summary_large_image', title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en, images: [`${baseUrl}/og-image.jpg`] },
    robots: { index: true, follow: true },
  };
}

export default function LagoComoLayout({ children }: Props) {
  return <>{children}</>;
}
