import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "animate.css";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";

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
  title: "LakeComoInCar - NCC Como | Transfer Aeroporti | Taxi Privato Cernobbio",
  description: "Autoservizi Pasquillo: servizio NCC Como 24/7. Transfer aeroporti Milano, taxi privato Cernobbio, noleggio auto con conducente. Tour Lago di Como e Svizzera. Prenota ora!",
  keywords: ["NCC Como", "Transfer Como", "Taxi privato Cernobbio", "Noleggio auto con conducente Como", "Transfer aeroporto Milano", "Taxi Lago di Como", "Chauffeur service Lake Como", "Transfer Malpensa", "NCC Lombardia", "Autoservizi Pasquillo"],
  openGraph: {
    title: "LakeComoInCar - Servizio NCC Professionale Como",
    description: "Trasferimenti aeroportuali, tour panoramici e servizi NCC per Como, Milano e Svizzera. Disponibili 24/7.",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "LakeComoInCar - NCC Como 24/7",
    description: "Servizio professionale di noleggio auto con conducente. Transfer, tour e matrimoni.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-white text-black`}
      >
        <Navbar />
        <main className=" bg-white">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
