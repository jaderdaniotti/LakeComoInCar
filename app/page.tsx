import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import data from "@/src/data/images";
import SectionWrapper from "@/components/layout/SectionWrapper";
import {
  Car,
  Clock,
  Shield,
  Users,
  Building2,
  Hotel,
  Plane,
  Briefcase,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "LakeComoInCar | NCC Como-Milano-Svizzera 24/7 - Transfer Aeroporti Malpensa Linate",
  description: "Autoservizi Pasquillo: NCC professionale Como-Milano-Svizzera. Transfer aeroporti Malpensa, Linate, Bergamo. Collegamenti business Como-Milano e Svizzera (St. Moritz, Lugano). Disponibili 24/7!",
  keywords: [
    "NCC Como Milano",
    "Transfer aeroporto Malpensa",
    "Transfer Linate Como",
    "NCC Como Svizzera",
    "Transfer St. Moritz",
    "Noleggio auto con conducente Milano",
    "Transfer Bergamo Orio",
    "Chauffeur service Como Milano",
    "Autoservizi Pasquillo",
    "Transfer business Como Milano",
    "NCC Lombardia Svizzera",
    "Taxi Como Milano 24/7",
    "Collegamenti Como Lugano"
  ],
  openGraph: {
    title: "LakeComoInCar - NCC Como-Milano-Svizzera Professionale 24/7",
    description: "Transfer aeroporti Milano, collegamenti Como-Milano-Svizzera e servizi NCC professionali in tutta la Lombardia. Autoservizi Pasquillo.",
    type: "website",
    locale: "it_IT",
    siteName: "LakeComoInCar",
  },
  alternates: {
    canonical: "https://lakecomoincar.com",
    languages: {
      'it': 'https://lakecomoincar.com',
      'en': 'https://lakecomoincar.com/en',
      'fr': 'https://lakecomoincar.com/fr',
      'es': 'https://lakecomoincar.com/es',
    },
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          src={data.videobackground}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-white/60 z-10"></div>
        <div className="pt-20 relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl lg:text-8xl poppins tracking-tight font-bold text-black mb-6 animate__animated animate__fadeIn">
            LakeComo<span className="italic">InCar</span>
          </h1>
          <p className="text-2xl md:text-5xl lg:text-6xl poppins tracking-tight font-semibold text-black mb-6 animate__animated animate__fadeIn">
            Autoservizi Pasquillo
          </p>
          <p className="text-lg md:text-2xl lg:text-3xl poppins tracking-tight font-semibold text-black mb-6 animate__animated animate__fadeIn">
            Servizio NCC Professionale • Disponibile 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeIn animate__delay-1s">
            <Button href="/prenota" variant="primary" className="min-w-[200px]">
              Prenota Subito
            </Button>
            <Button
              href="/preventivo"
              variant="secondary"
              className="min-w-[200px]"
            >
              Richiedi Preventivo
            </Button>
          </div>
          <p className="text-sm md:text-base text-black mt-6 font-semibold animate__animated animate__fadeIn animate__delay-3s">
            Como • Milano • Cernobbio • Svizzera
          </p>
        </div>
      </section>

      {/* Chi Siamo */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Chi Siamo
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
            Autoservizi Pasquillo è il punto di riferimento per trasferimenti 
            professionali tra Como, Milano e Svizzera, offrendo un servizio NCC 
            di eccellenza in tutta la Lombardia.
          </p>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Specializzati in transfer aeroportuali Milano (Malpensa, Linate, Orio al Serio), 
            collegamenti con la Svizzera (St. Moritz, Lugano, confine) e servizi business 
            tra Como e Milano. Con oltre 15 anni di esperienza, garantiamo professionalità, 
            puntualità e comfort in ogni spostamento.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Disponibilità</div>
            </div>
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Anni Esperienza</div>
            </div>
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Professionalità</div>
            </div>
            <div className="border-2 border-white h-full p-6">
              <div className="text-4xl font-bold text-white mb-2">2</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Sedi Operative</div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Servizi Principali */}
      <SectionWrapper className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            I Nostri Servizi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluzioni di trasporto premium per ogni esigenza
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="border-2 p-1">
            <div className="border-2 border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Plane className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                Transfer 
              </h3>
              <p className="text-gray-600">
                Servizio puntuale e professionale da e per tutti i principali 
                aeroporti. Disponibili 24/7 per ogni destinazione.
              </p>
            </div>
          </div>

          <div className="border-2 p-1">
            <div className="border-2 border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                Servizi Business
              </h3>
              <p className="text-gray-600">
                Trasferimenti per meeting, fiere e viaggi di lavoro con massima 
                professionalità e discrezione.
              </p>
            </div>
          </div>
          <div className="border-2 p-1">
            <div className="border-2 border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Heart className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                Eventi e Matrimoni
              </h3>
              <p className="text-gray-600">
                Per rendere indimenticabile il tuo giorno speciale con eleganza, 
                stile e attenzione ai dettagli.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button href="/servizi" variant="outline">
            Scopri Tutti i Servizi
          </Button>
        </div>
      </SectionWrapper>

      {/* Target Clienti */}
      <SectionWrapper className="bg-black text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Per Chi Lavoriamo
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Soluzioni personalizzate per privati, aziende e strutture ricettive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-2 p-1">
            <div className="border-2 border-white p-8 text-center bg-black hovercardup">
              <Users className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                Privati
              </h3>
              <p className="text-gray-300">
                Trasferimenti personali, viaggi di piacere e occasioni speciali 
                con il massimo comfort e attenzione.
              </p>
            </div>
          </div>

          <div className="border-2 p-1">
            <div className="border-2 border-white p-8 text-center bg-black hovercardup">
              <Hotel className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                Hotel e Strutture
              </h3>
              <p className="text-gray-300">
                Servizi dedicati per strutture ricettive e tour operator del 
                territorio, con gestione completa degli ospiti.
              </p>
            </div>
          </div>

          <div className="border-2 p-1">
            <div className="border-2 border-white p-8 text-center bg-black hovercardup">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                Aziende
              </h3>
              <p className="text-gray-300">
                Soluzioni corporate per trasferimenti dipendenti e clienti con 
                fatturazione dedicata e gestione centralizzata.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Affidabilità */}
      <SectionWrapper className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Perché Sceglierci
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Esperienza, professionalità e comfort al servizio della tua mobilità
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                Servizio 24/7
              </h3>
              <p className="text-sm">
                Disponibilità continua, giorno e notte. Servizio puntuale e 
                affidabile in qualsiasi momento.
              </p>
            </div>
          </div>

          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                Autisti Esperti
              </h3>
              <p className="text-sm">
                Autisti professionisti del settore, esperti del territorio e 
                sempre disponibili per ogni esigenza.
              </p>
            </div>
          </div>

          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                Veicoli Moderni
              </h3>
              <p className="text-sm">
                Flotta di veicoli moderni e confortevoli, dotati di ogni comfort 
                per un viaggio in totale relax.
              </p>
            </div>
          </div>

          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-6 hovercolor h-full">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
                Massima Sicurezza
              </h3>
              <p className="text-sm">
                Massimo comfort e sicurezza durante il viaggio. Flessibilità e 
                personalizzazione per ogni esigenza.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* La Nostra Flotta */}
      <SectionWrapper className="bg-black text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            I nostri mezzi
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Veicoli moderni, eleganti e perfettamente manutenuti per garantire 
            il massimo comfort in ogni viaggio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Placeholder Veicolo 1 */}
          <div className="border-2 border-white p-1">
            <div className="border-2 border-white bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <div className="aspect-video bg-gray-800 border-2 border-white flex items-center justify-center">
                <div className="text-center p-8">
                  <Car className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-500 text-sm uppercase tracking-wider">
                    Immagine Veicolo
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-wider">
                  Mercedes Classe E
                </h3>
                <p className="text-gray-300 mb-4">
                  Eleganza e comfort per transfer aeroportuali e servizi business. 
                  La scelta ideale per viaggi di lavoro.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>✓ Fino a 4 passeggeri</li>
                  <li>✓ Aria condizionata</li>
                  <li>✓ Wi-Fi a bordo</li>
                  <li>✓ Spazio bagagli</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Placeholder Veicolo 2 */}
          <div className="border-2 border-white p-1">
            <div className="border-2 border-white bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <div className="aspect-video bg-gray-800 border-2 border-white flex items-center justify-center">
                <div className="text-center p-8">
                  <Car className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-500 text-sm uppercase tracking-wider">
                    Immagine Veicolo
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-wider">
                  BMW Serie 5
                </h3>
                <p className="text-gray-300 mb-4">
                  Lusso e tecnologia al servizio del tuo viaggio. Perfetto per 
                  clienti business e occasioni speciali.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>✓ Fino a 4 passeggeri</li>
                  <li>✓ Interni in pelle</li>
                  <li>✓ Sistema audio premium</li>
                  <li>✓ Sedili riscaldati</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Placeholder Veicolo 3 */}
          <div className="border-2 border-white p-1">
            <div className="border-2 border-white bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <div className="aspect-video bg-gray-800 border-2 border-white flex items-center justify-center">
                <div className="text-center p-8">
                  <Car className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-500 text-sm uppercase tracking-wider">
                    Immagine Veicolo
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-wider">
                  Mercedes Viano/Vito
                </h3>
                <p className="text-gray-300 mb-4">
                  Spazio e versatilità per gruppi e famiglie. Ideale per tour, 
                  trasferimenti di gruppo e eventi.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>✓ Fino a 8 passeggeri</li>
                  <li>✓ Ampio bagagliaio</li>
                  <li>✓ Sedute confortevoli</li>
                  <li>✓ Climatizzatore</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Tutti i nostri veicoli sono sottoposti a manutenzione regolare e sanificazione completa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/veicoli" variant="primary">
              Scopri Tutti i Veicoli
            </Button>
            <Button href="/contatti" variant="outline">
              Contattaci per Info
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* Call to Action Finale */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto text-center border-4 border-black p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Prenota il Tuo Viaggio Oggi
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Chiama ora! +39 338 405 6027 • Disponibile 24/7
          </p>
          <p className="text-lg text-gray-600 mb-10">
            Non perdere tempo, prenota subito il tuo trasferimento e viaggia in 
            totale comfort e sicurezza con Autoservizi Pasquillo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/prenota" variant="outline" className="min-w-[200px]">
              Prenota Online
            </Button>
            <Button href="tel:+393384056027" variant="primary" className="min-w-[200px]">
              Chiama Ora
            </Button>
            <Button href="/preventivo" variant="outline" className="min-w-[200px]">
              Richiedi Preventivo
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
