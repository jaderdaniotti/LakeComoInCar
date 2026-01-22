import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/st-moritz`;

  const title = locale === 'it'
    ? "Tour St. Moritz | Transfer Como-St. Moritz | Eleganza Alpina Svizzera"
    : "St. Moritz Tour | Alpine Elegance | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Tour St. Moritz: transfer da Como/Milano alla perla delle Alpi svizzere. Eleganza alpina, shopping di lusso, panorami mozzafiato. Esperienza indimenticabile!"
    : "St. Moritz tour: transfer from Como/Milan to the pearl of the Swiss Alps. Alpine elegance, luxury shopping, breathtaking views.";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? [
          'tour st moritz', 'transfer st moritz', 'st moritz como', 'transfer svizzera',
          'tour svizzera', 'st moritz shopping', 'transfer como st moritz'
        ]
      : [],
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
        alt: 'Tour St. Moritz - Autoservizi Pasquillo',
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

export default function StMoritzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
