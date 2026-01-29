import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import data from "@/src/data/images";
import SectionWrapper from "@/components/layout/SectionWrapper";
import {
  Car,
  Clock,
  Shield,
  Users,
  Plane,
  Briefcase,
  Heart,
  Hotel,
  Building2,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}`;

  // Keywords ottimizzate per SEO
  const keywords = locale === 'it'
    ? [
        'taxi como', 'ncc como', 'ncc milano', 'taxi milano',
        'transfer aeroporto milano', 'taxi privato como',
        'ncc cernobbio', 'transfer como svizzera', 'taxi lago di como',
        'ncc milano malpensa', 'taxi como 24 ore', 'autoservizi pasquillo',
        'transfer malpensa como', 'transfer linate como', 'ncc como milano'
      ]
    : t('keywords').split(', ');

  return {
    title: locale === 'it'
      ? "Taxi Como 24/7 | NCC Como Milano | Transfer Aeroporti | Autoservizi Pasquillo"
      : t('title'),
    description: locale === 'it'
      ? "Servizio Taxi Como e NCC Como professionale. Transfer aeroporti Milano (Malpensa, Linate), taxi privato Cernobbio, collegamenti Como-Milano-Svizzera. Disponibili 24/7. Prenota ora!"
      : t('description'),
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}`,
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
        'es': `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: locale === 'it'
        ? "Taxi Como | NCC Como Milano | Transfer Aeroporti 24/7"
        : t('title'),
      description: locale === 'it'
        ? "Servizio Taxi Como e NCC Como professionale. Transfer aeroporti Milano, taxi privato Cernobbio, collegamenti Como-Milano-Svizzera."
        : t('description'),
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale: locale,
      type: 'website',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'LakeComoInCar - Taxi Como NCC Como',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'it'
        ? "Taxi Como | NCC Como Milano | Transfer Aeroporti 24/7"
        : t('title'),
      description: locale === 'it'
        ? "Servizio Taxi Como e NCC Como professionale. Transfer aeroporti Milano, taxi privato Cernobbio."
        : t('description'),
      images: [`${baseUrl}/og-image.jpg`],
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
  };
}

export default function HomePage() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          src={data.videobg}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-white/20 z-10"></div>
        <div className="pt-20 relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl lg:text-8xl poppins tracking-tight font-bold text-black mb-6 animate__animated animate__fadeIn">
            {t('hero.title')}
          </h1>
          <p className="text-2xl md:text-5xl lg:text-6xl poppins tracking-tight font-semibold text-black mb-6 animate__animated animate__fadeIn">
            {t('hero.company')}
          </p>
          <p className="text-lg md:text-2xl lg:text-3xl poppins tracking-tight font-semibold text-black mb-6 animate__animated animate__fadeIn">
            {t('hero.tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeIn animate__delay-1s">
            <Button href="/prenota" variant="primary" className="min-w-[200px]">
              {tCommon('bookNow')}
            </Button>
            <Button href="/preventivo" variant="secondary" className="min-w-[200px]">
              {tCommon('requestQuote')}
            </Button>
          </div>
          <p className="text-sm md:text-base text-black mt-6 font-semibold animate__animated animate__fadeIn animate__delay-3s">
            {t('hero.locations')}
          </p>
        </div>
      </section>

      {/* Chi Siamo / About Us */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            {t('about.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
            {t('about.description')}
          </p>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            {t('about.expertise')}
          </p>
          
          {/* SEO Content Section - Taxi Como e NCC Como */}
          {locale === 'it' && (
            <div className="mt-12 text-left bg-white/5 p-8 border-2 border-white">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Taxi Como e NCC Como: Il Tuo Servizio di Trasporto Professionale
              </h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Cerchi un <strong>taxi Como</strong> affidabile o un servizio <strong>NCC Como</strong> professionale? 
                Autoservizi Pasquillo offre servizi di <strong>taxi privato Como</strong> e <strong>NCC Como </strong> 
                disponibili 24 ore su 24, 7 giorni su 7. Il nostro servizio <strong>NCC Milano</strong> garantisce 
                collegamenti rapidi e confortevoli tra Como, Milano e la Svizzera.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Specializzati in <strong>transfer aeroporto Milano</strong> (Malpensa, Linate, Bergamo), 
                offriamo collegamenti efficienti per <strong>taxi Como</strong>, <strong>NCC Como</strong> e 
                <strong> taxi Milano</strong>. Per prenotazioni e informazioni, visita la nostra pagina 
                <Link href="/servizi" className="text-white underline hover:text-gray-300 mx-1 font-semibold">
                  servizi NCC
                </Link> o 
                <Link href="/contatti" className="text-white underline hover:text-gray-300 mx-1 font-semibold">
                  contattaci
                </Link> direttamente.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Per <strong>taxi Como</strong>, <strong>NCC Como</strong> o <strong>taxi Milano</strong>, 
                contattaci al +39 338 405 6027 o 
                <Link href="/prenota" className="text-white underline hover:text-gray-300 mx-1 font-semibold">
                  prenota online
                </Link> il tuo servizio.
              </p>
            </div>
          )}
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">
                {t('about.stats.availability')}
              </div>
            </div>
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">
                {t('about.stats.experience')}
              </div>
            </div>
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">
                {t('about.stats.professionalism')}
              </div>
            </div>
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">2</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">
                {t('about.stats.offices')}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* I Nostri Servizi */}
      <SectionWrapper className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transfer */}
          <div className="border-2 p-1">
            <div className="border-2 h-full border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Plane size={48} className="mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                {t('services.transfer.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.transfer.description')}
              </p>
            </div>
          </div>

          {/* Business */}
          <div className="border-2 p-1">
            <div className="border-2 h-full border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Briefcase size={48} className="mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                {t('services.business.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.business.description')}
              </p>
            </div>
          </div>

          {/* Eventi */}
          <div className="border-2 p-1">
            <div className="border-2 h-full border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Heart size={48} className="mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                {t('services.events.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.events.description')}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button href="/servizi" variant="outline">
            {t('services.seeAll')}
          </Button>
        </div>
      </SectionWrapper>

      {/* Per Chi Lavoriamo */}
      <SectionWrapper className="bg-black text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('forWho.title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('forWho.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Privati */}
          <div className="border-2 p-1">
            <div className="border-2 border-white p-8 text-center bg-black hovercardup h-full">
              <Users size={48} className="mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                {t('forWho.individuals.title')}
              </h3>
              <p className="text-gray-300">
                {t('forWho.individuals.description')}
              </p>
            </div>
          </div>

          {/* Hotel */}
          <div className="border-2 p-1">
            <div className="border-2 border-white p-8 text-center bg-black hovercardup h-full">
              <Hotel size={48} className="mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                {t('forWho.hotels.title')}
              </h3>
              <p className="text-gray-300">
                {t('forWho.hotels.description')}
              </p>
            </div>
          </div>

          {/* Aziende */}
          <div className="border-2 p-1">
            <div className="border-2 border-white p-8 text-center bg-black hovercardup h-full">
              <Building2 size={48} className="mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                {t('forWho.companies.title')}
              </h3>
              <p className="text-gray-300">
                {t('forWho.companies.description')}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            {t('whyUs.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('whyUs.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Servizio 24/7 */}
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                {t('whyUs.service247.title')}
              </h3>
              <p className="text-sm">
                {t('whyUs.service247.description')}
              </p>
            </div>
          </div>

          {/* Autisti Esperti */}
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                {t('whyUs.experiencedDrivers.title')}
              </h3>
              <p className="text-sm">
                {t('whyUs.experiencedDrivers.description')}
              </p>
            </div>
          </div>

          {/* Veicoli Moderni */}
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Car size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                {t('whyUs.modernVehicles.title')}
              </h3>
              <p className="text-sm">
                {t('whyUs.modernVehicles.description')}
              </p>
            </div>
          </div>

          {/* Massima Sicurezza */}
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                {t('whyUs.maxSafety.title')}
              </h3>
              <p className="text-sm">
                {t('whyUs.maxSafety.description')}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* I Nostri Mezzi */}
      <SectionWrapper className="bg-black text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('vehicles.title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('vehicles.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mercedes V-Class 4MATIC */}
          <div className="border-2 border-white p-1">
            <div className="border-2 border-white bg-white/5 hover:bg-white/10 transition-colors duration-300 h-full">
              <div className="aspect-video border-2 border-white relative overflow-hidden">
                <Image 
                  src={data.vclass} 
                  alt="Mercedes V-Class 4MATIC nero - Autoservizi Pasquillo NCC Como"
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-wider">
                  {t('vehicles.vclass4matic.name')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('vehicles.vclass4matic.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {t('vehicles.vclass4matic.features').split('|').map((feature: string, idx: number) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mercedes V-Class 2WD */}
          <div className="border-2 border-white p-1">
            <div className="border-2 border-white bg-white/5 hover:bg-white/10 transition-colors duration-300 h-full">
              <div className="aspect-video border-2 border-white relative overflow-hidden">
                <Image 
                  src={data.vclass} 
                  alt="Mercedes V-Class 2WD nero - Autoservizi Pasquillo NCC Como"
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-wider">
                  {t('vehicles.vclass2wd.name')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('vehicles.vclass2wd.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {t('vehicles.vclass2wd.features').split('|').map((feature: string, idx: number) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            {t('vehicles.maintenance')}
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/veicoli" variant="secondary">
              {t('vehicles.seeAll')}
            </Button>
            <Button href="/contatti" variant="secondary">
              {t('vehicles.contactInfo')}
            </Button>
          </div> */}
        </div>
      </SectionWrapper>

      {/* CTA Section Finale */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center border-4 border-black p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('cta.phone')}
          </p>
          <p className="text-lg text-gray-600 mb-10">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/prenota" variant="outline" className="min-w-[200px]">
              {t('cta.bookOnline')}
            </Button>
            <Button href="tel:+393384056027" variant="primary" className="min-w-[200px]">
              {t('cta.callNow')}
            </Button>
            <Button href="/preventivo" variant="outline" className="min-w-[200px]">
              {t('cta.requestQuote')}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
