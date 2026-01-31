import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "animate.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lakecomoincar.eu'),
  title: {
    default: "LakeComoInCar - NCC Como | Taxi Como | Noleggio con Conducente Lombardia",
    template: "%s | LakeComoInCar - NCC Como"
  },
  description: "Autoservizi Pasquillo: NCC Como, taxi privato Lombardia e Svizzera. Transfer aeroporti Milano Malpensa, Linate, Bergamo. Noleggio con conducente 24/7. Prenota il tuo taxi Como ora!",
  keywords: [
    "ncc como",
    "taxi como",
    "ncc lombardia", 
    "taxi lombardia",
    "ncc svizzera",
    "taxi svizzera",
    "noleggio con conducente",
    "noleggio con conducente como",
    "noleggio auto con conducente",
    "taxi privato como",
    "transfer aeroporto malpensa",
    "transfer aeroporto linate",
    "taxi lago di como",
    "ncc cernobbio",
    "taxi cernobbio",
    "autoservizi pasquillo",
    "transfer milano como",
    "taxi aeroporto como",
    "servizio ncc como"
  ],
  authors: [{ name: "Autoservizi Pasquillo" }],
  creator: "Autoservizi Pasquillo",
  publisher: "LakeComoInCar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US", "fr_FR", "es_ES"],
    url: "https://lakecomoincar.eu",
    siteName: "LakeComoInCar",
    title: "LakeComoInCar - NCC Como | Taxi Como | Noleggio con Conducente",
    description: "Servizio NCC Como 24/7. Transfer aeroporti Milano, taxi privato Lombardia e Svizzera. Noleggio con conducente professionale. Prenota ora!",
    images: [
      {
        url: "/favicon.webp",
        width: 1200,
        height: 630,
        alt: "LakeComoInCar - NCC Como",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LakeComoInCar - NCC Como | Taxi Como",
    description: "Servizio NCC Como 24/7. Transfer aeroporti, taxi privato Lombardia e Svizzera.",
    images: ["/favicon.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Aggiungerai questi dopo aver verificato su Google Search Console
    google: 'E-enLeorDhInGXjBkcvgjYpiKywKCdqeCS2xm6VMrxQ',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR&components=buttons`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-white text-black`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}