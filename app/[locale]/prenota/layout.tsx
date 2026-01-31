import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseUrl = 'https://www.lakecomoincar.eu';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking.metadata' });

  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/prenota`;

  return {
    title: t('title'),
    description: t('description'),
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
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Prenota NCC Como' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export default function PrenotaLayout({ children }: Props) {
  return <>{children}</>;
}
