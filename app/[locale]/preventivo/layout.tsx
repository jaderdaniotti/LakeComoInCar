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
  const t = await getTranslations({ locale, namespace: 'quote.metadata' });

  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/preventivo`;

  return {
    title: t('title'),
    description: t('description'),
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
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale,
      type: 'website',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: 'Preventivo NCC Como' }],
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

export default function PreventivoLayout({ children }: Props) {
  return <>{children}</>;
}
