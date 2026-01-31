import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://www.lakecomoincar.eu';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/bernina-express`;

  const title = locale === 'it'
    ? "Tour Bernina Express | Transfer Como-Tirano | Trenino Rosso Patrimonio UNESCO"
    : "Bernina Express Tour | UNESCO Heritage Train | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Tour Bernina Express: transfer da Como/Milano a Tirano per salire sul leggendario treno panoramico Patrimonio UNESCO. Viaggio spettacolare attraverso le Alpi fino a St. Moritz!"
    : "Bernina Express tour: transfer from Como/Milan to Tirano for the legendary UNESCO Heritage panoramic train. Spectacular journey through the Alps to St. Moritz!";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? [
          'bernina express', 'trenino rosso', 'tour bernina express', 'transfer tirano',
          'treno panoramico alpi', 'st moritz tour', 'bernina express como'
        ]
      : [],
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
        alt: 'Tour Bernina Express - Autoservizi Pasquillo',
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

export default function BerninaExpressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
