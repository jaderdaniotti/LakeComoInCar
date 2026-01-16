import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "animate.css";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  title: "Como Lake Car - Noleggio Auto con Conducente | Como, Milano, Svizzera",
  description: "Servizio professionale di noleggio auto con conducente per Como, Milano e Svizzera. Trasferimenti aeroportuali, servizi business, eventi e matrimoni.",
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
      </body>
    </html>
  );
}
