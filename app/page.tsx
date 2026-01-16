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
        <div className="absolute inset-0 bg-white/30 z-10"></div>
        <div className="pt-20 relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl poppins tracking-tight font-bold text-black mb-6 animate__animated animate__fadeIn">
            Como Lake Car
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-black mb-8 font-normal animate__animated animate__fadeIn animate__delay-1s">
            Servizio di noleggio auto con conducente
          </p>
          <p className="text-lg md:text-xl text-black mb-12 animate__animated animate__fadeIn animate__delay-2s">
            Como • Milano • Svizzera
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeIn animate__delay-3s">
            <Button href="/prenota" variant="primary" className="min-w-[200px]">
              Prenota Ora
            </Button>
            <Button
              href="/preventivo"
              variant="secondary"
              className="min-w-[200px]"
            >
              Richiedi Preventivo
            </Button>
          </div>
        </div>
      </section>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-2 p-1">
            <div className="border-2 border-black p-8 text-center hover:shadow-lg transition-shadow duration-300 hovercard">
              <Plane className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
                Aereoporti
              </h3>
              <p className="text-gray-600">
                Servizio puntuale e professionale da e per gli aeroporti di
                Milano, Bergamo e Svizzera.
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
                professionalità.
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
                Per rendere indimenticabile il tuo giorno speciale con eleganza
                e stile.
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
            Soluzioni personalizzate per ogni tipo di cliente
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
                con il massimo comfort.
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
                territorio.
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
                fatturazione dedicata.
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
            Esperienza, puntualità e comfort al servizio della tua mobilità
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="border-2 p-1 ">
            <div className="text-center border-2 border-black p-3 hovercolor">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 " />
              </div>
              <h3 className="text-2xl font-bold mb-4  uppercase tracking-wider">
                Puntualità
              </h3>
              <p className="">
                Monitoraggio in tempo reale e servizio sempre puntuale,
                garantito.
              </p>
            </div>
          </div>
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-3 hovercolor">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 " />
              </div>
              <h3 className="text-2xl font-bold mb-4  uppercase tracking-wider">
                Affidabilità
              </h3>
              <p className="">
                Oltre 15 anni di esperienza nel settore con migliaia di clienti
                soddisfatti.
              </p>
            </div>
          </div>
          <div className="border-2 p-1">
            <div className="text-center border-2 border-black p-3 hovercolor">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 " />
              </div>
              <h3 className="text-2xl font-bold mb-4  uppercase tracking-wider">
                Comfort
              </h3>
              <p className="">
                Flotta di veicoli premium sempre impeccabili per il massimo
                comfort.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
