import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/lago-como`;

  const title = locale === 'it'
    ? "Tour Lago di Como | Escursioni Private | Bellagio, Varenna, Como | Autoservizi Pasquillo"
    : "Lake Como Tour | Private Tours | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Tour privato del Lago di Como: Bellagio, Varenna, Como, Cernobbio. Scopri le perle del lago con il nostro servizio NCC. Tour personalizzati e confortevoli!"
    : "Private Lake Como tour: Bellagio, Varenna, Como. Discover the pearls of the lake with our NCC service.";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? [
          'tour lago di como', 'tour bellagio', 'tour varenna', 'escursioni lago como',
          'tour privato como', 'ncc tour lago', 'visita lago di como'
        ]
      : [],
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
        alt: 'Tour Lago di Como - Autoservizi Pasquillo',
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

export default function LagoComoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
