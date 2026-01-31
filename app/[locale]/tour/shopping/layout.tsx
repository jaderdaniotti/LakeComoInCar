import type { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseUrl = 'https://www.lakecomoincar.eu';

const titles: Record<string, string> = {
  it: 'Shopping Tour | NCC Como - Tour Shopping di Lusso',
  en: 'Shopping Tour | NCC Como - Luxury Shopping Tour',
  fr: 'Tour Shopping | NCC Como - Tour Shopping de Luxe',
  es: 'Tour de Compras | NCC Como - Tour de Compras de Lujo',
};

const descriptions: Record<string, string> = {
  it: 'Tour shopping di lusso con NCC Como. Milano, Outlet e boutique esclusive.',
  en: 'Luxury shopping tour with NCC Como. Milan, outlets and exclusive boutiques.',
  fr: 'Tour shopping de luxe avec NCC Como. Milan, outlets et boutiques exclusives.',
  es: 'Tour de compras de lujo con NCC Como. Milán, outlets y boutiques exclusivas.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/shopping`;

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/tour/shopping`,
        'en': `${baseUrl}/en/tour/shopping`,
        'fr': `${baseUrl}/fr/tour/shopping`,
        'es': `${baseUrl}/es/tour/shopping`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Shopping Tour' }],
    },
    twitter: { card: 'summary_large_image', title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en, images: [`${baseUrl}/og-image.jpg`] },
    robots: { index: true, follow: true },
  };
}

export default function ShoppingLayout({ children }: Props) {
  return <>{children}</>;
}
