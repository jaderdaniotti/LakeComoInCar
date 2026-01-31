import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://www.lakecomoincar.eu';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/tour/shopping`;

  const title = locale === 'it'
    ? "Shopping Tour Milano | Quadrilatero della Moda | Outlet Serravalle | FoxTown"
    : "Shopping Tour Milan | Luxury Shopping | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Shopping Tour Milano: Quadrilatero della Moda, Outlet Serravalle, FoxTown Svizzera. Tour personalizzati per lo shopping di lusso. Transfer confortevoli e professionali!"
    : "Shopping Tour Milan: Fashion Quadrilateral, Serravalle Outlet, FoxTown Switzerland. Personalized luxury shopping tours.";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? [
          'shopping tour milano', 'quadrilatero della moda', 'outlet serravalle',
          'foxtown svizzera', 'shopping lusso milano', 'tour shopping como'
        ]
      : [],
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
        alt: 'Shopping Tour Milano - Autoservizi Pasquillo',
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

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
