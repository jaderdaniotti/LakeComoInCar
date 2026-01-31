import type { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseUrl = 'https://www.lakecomoincar.eu';

const titles: Record<string, string> = {
  it: 'Tour St. Moritz | NCC Como - Transfer Como St. Moritz',
  en: 'St. Moritz Tour | NCC Como - Transfer Como St. Moritz',
  fr: 'Tour St. Moritz | NCC Como - Transfer Como St. Moritz',
  es: 'Tour St. Moritz | NCC Como - Transfer Como St. Moritz',
};

const descriptions: Record<string, string> = {
  it: 'Transfer e tour privato da Como a St. Moritz. Eleganza svizzera con NCC Como.',
  en: 'Private transfer and tour from Como to St. Moritz. Swiss elegance with NCC Como.',
  fr: 'Transfert et tour privé de Como à St. Moritz. Élégance suisse.',
  es: 'Transfer y tour privado de Como a St. Moritz. Elegancia suiza.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/st-moritz`;

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/tour/st-moritz`,
        'en': `${baseUrl}/en/tour/st-moritz`,
        'fr': `${baseUrl}/fr/tour/st-moritz`,
        'es': `${baseUrl}/es/tour/st-moritz`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Tour St. Moritz' }],
    },
    twitter: { card: 'summary_large_image', title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en, images: [`${baseUrl}/og-image.jpg`] },
    robots: { index: true, follow: true },
  };
}

export default function StMoritzLayout({ children }: Props) {
  return <>{children}</>;
}
