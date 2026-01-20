'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import GDPRDisclaimer from '@/components/ui/GDPRDisclaimer';
import { Briefcase, Clock, Users, MapPin, Euro, Building2, CheckCircle, FileText, Star } from 'lucide-react';

export default function CorporatePage() {
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    azienda: '',
    referente: '',
    email: '',
    telefono: '',
    servizio: '',
    frequenza: '',
    passeggeri: '',
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementare invio form
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-black text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            Servizi Corporate
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Soluzioni di trasporto professionale per aziende ed enti
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 border-2 border-white">
              <Clock size={20} />
              <span>Disponibili 24/7</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 border-2 border-white">
              <Users size={20} />
              <span>Flotta dedicata</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 border-2 border-white">
              <FileText size={20} />
              <span>Fatturazione dedicata</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Immagine Placeholder */}
      <div className="relative w-full h-96 bg-gray-100 border-b-4 border-black flex items-center justify-center">
        <span className="text-gray-400 text-xl uppercase tracking-wider">Placeholder Immagine Corporate</span>
      </div>

      {/* Descrizione */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-black uppercase">
                La Nostra Proposta
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Autoservizi Pasquillo offre soluzioni di trasporto dedicate al mondo business, 
                con servizi personalizzati per aziende, studi professionali ed enti che necessitano 
                di transfer affidabili e professionali.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Dalla gestione dei transfer aeroportuali per i vostri clienti e dipendenti, 
                ai collegamenti per meeting e fiere, fino ai servizi continuativi con convenzioni 
                personalizzate. Ogni servizio è gestito con massima professionalità e discrezione.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Con oltre 15 anni di esperienza nel settore, garantiamo puntualità, comfort 
                e una gestione amministrativa semplificata con fatturazione dedicata.
              </p>
            </div>
            <div className="space-y-6">
              <div className="border-2 border-black p-6">
                <h3 className="text-2xl font-bold mb-4 uppercase">Vantaggi Corporate</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Fatturazione mensile unificata</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Tariffe corporate dedicate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Gestione centralizzata prenotazioni</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Referente dedicato</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Reportistica dettagliata viaggi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Priorità nelle prenotazioni</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Servizio disponibile 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Servizi */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center text-black uppercase">
              I Nostri Servizi Corporate
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="relative w-full h-48 bg-gray-100 border-2 border-black group-hover:border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:text-gray-600 text-sm uppercase">Immagine Transfer Aeroporti</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-10 h-10 flex-shrink-0" />
                  <h3 className="text-2xl font-bold uppercase">
                    Transfer Aeroportuali
                  </h3>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                  Servizio dedicato per transfer da e verso tutti gli aeroporti lombardi: 
                  Malpensa, Linate, Orio al Serio. Monitoraggio voli in tempo reale e 
                  assistenza con bagagli.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Monitoraggio voli in tempo reale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Meet & Greet personalizzato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Assistenza bagagli e pratiche</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="relative w-full h-48 bg-gray-100 border-2 border-black group-hover:border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:text-gray-600 text-sm uppercase">Immagine Meeting</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Briefcase className="w-10 h-10 flex-shrink-0" />
                  <h3 className="text-2xl font-bold uppercase">
                    Meeting & Eventi
                  </h3>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                  Trasporto per meeting aziendali, eventi corporate e convention. 
                  Coordinamento di più veicoli per gruppi numerosi con gestione 
                  centralizzata.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Gestione gruppi e flotte multiple</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Coordinamento eventi complessi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Personale dedicato all'evento</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="relative w-full h-48 bg-gray-100 border-2 border-black group-hover:border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:text-gray-600 text-sm uppercase">Immagine Executive</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-10 h-10 flex-shrink-0" />
                  <h3 className="text-2xl font-bold uppercase">
                    Trasporti Executive
                  </h3>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                  Servizio riservato per CEO, manager e ospiti VIP. Massima discrezione, 
                  puntualità assoluta e veicoli di rappresentanza di alto livello.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Autisti multilingue selezionati</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Massima riservatezza garantita</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Veicoli premium top di gamma</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="relative w-full h-48 bg-gray-100 border-2 border-black group-hover:border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:text-gray-600 text-sm uppercase">Immagine Fiere</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Building2 className="w-10 h-10 flex-shrink-0" />
                  <h3 className="text-2xl font-bold uppercase">
                    Fiere & Convention
                  </h3>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                  Servizio dedicato per fiere Milano (Rho Fiera, Fieramilanocity) e convention. 
                  Transfer multipli coordinati per espositori e ospiti.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Esperienza con grandi eventi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Gestione logistica complessa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Tariffe speciali multi-giorno</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="relative w-full h-48 bg-gray-100 border-2 border-black group-hover:border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:text-gray-600 text-sm uppercase">Immagine Roadshow</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-10 h-10 flex-shrink-0" />
                  <h3 className="text-2xl font-bold uppercase">
                    Roadshow & Tour
                  </h3>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                  Organizzazione transfer per roadshow aziendali, visite cliente multi-città 
                  e tour commerciali con itinerari complessi.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Pianificazione itinerari complessi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Autista-assistente dedicato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Supporto logistico completo</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="relative w-full h-48 bg-gray-100 border-2 border-black group-hover:border-white mb-6 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:text-gray-600 text-sm uppercase">Immagine Dipendenti</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-10 h-10 flex-shrink-0" />
                  <h3 className="text-2xl font-bold uppercase">
                    Servizi Continuativi
                  </h3>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                  Transfer ricorrenti per dipendenti, trasferte regolari o servizi quotidiani. 
                  Convenzioni personalizzate con tariffe agevolate.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Tariffe speciali long-term</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Pianificazione anticipata garantita</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="mt-1 flex-shrink-0" />
                    <span>Fatturazione mensile riepilogativa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Come Funziona */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center text-black uppercase">
              Come Attivare il Servizio
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="border-2 border-black p-6 text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Contatto</h3>
                <p className="text-gray-700">
                  Compila il form o contattaci per illustrarci le vostre esigenze di trasporto
                </p>
              </div>

              <div className="border-2 border-black p-6 text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Proposta</h3>
                <p className="text-gray-700">
                  Elaboriamo una proposta personalizzata con tariffe e servizi dedicati
                </p>
              </div>

              <div className="border-2 border-black p-6 text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Convenzione</h3>
                <p className="text-gray-700">
                  Stipuliamo una convenzione con condizioni chiare e vantaggi dedicati
                </p>
              </div>

              <div className="border-2 border-black p-6 text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Operatività</h3>
                <p className="text-gray-700">
                  Iniziate subito ad usufruire dei servizi con il vostro referente dedicato
                </p>
              </div>
            </div>
          </div>

          {/* Clienti Tipo */}
          <div className="border-2 border-black p-8 bg-gray-50 mb-16">
            <h2 className="text-3xl font-bold mb-6 uppercase text-center">
              Chi Può Beneficiare dei Servizi Corporate
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 uppercase">Aziende</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• PMI e multinazionali</li>
                  <li>• Studi professionali</li>
                  <li>• Società di consulenza</li>
                  <li>• Agenzie comunicazione</li>
                  <li>• Start-up innovative</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 uppercase">Hospitality</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Hotel e resort</li>
                  <li>• Relais di lusso</li>
                  <li>• B&B premium</li>
                  <li>• Agenzie viaggi</li>
                  <li>• Tour operator</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 uppercase">Organizzatori</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Event planner</li>
                  <li>• Wedding planner</li>
                  <li>• Organizzatori fiere</li>
                  <li>• DMC</li>
                  <li>• Location per eventi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Perché Sceglierci */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center text-black uppercase">
              Perché Scegliere Autoservizi Pasquillo
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-2 border-black p-6 text-center">
                <div className="text-4xl font-bold mb-3">15+</div>
                <p className="uppercase font-bold">Anni di Esperienza</p>
              </div>
              <div className="border-2 border-black p-6 text-center bg-black text-white">
                <div className="text-4xl font-bold mb-3">24/7</div>
                <p className="uppercase font-bold">Disponibilità</p>
              </div>
              <div className="border-2 border-black p-6 text-center">
                <div className="text-4xl font-bold mb-3">100%</div>
                <p className="uppercase font-bold">Puntualità</p>
              </div>
              <div className="border-2 border-black p-6 text-center bg-black text-white">
                <div className="text-4xl font-bold mb-3">TOP</div>
                <p className="uppercase font-bold">Flotta Premium</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Form Richiesta Corporate */}
      <SectionWrapper className="bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">
              Richiedi una Proposta Corporate
            </h2>
            <p className="text-xl text-gray-300">
              Compila il form per ricevere una proposta personalizzata per la tua azienda
            </p>
          </div>

          {isSubmitted && (
            <div className="mb-8 p-6 bg-green-500 border-2 border-white text-white flex items-center gap-4">
              <CheckCircle size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Richiesta Inviata!</h3>
                <p>Il nostro team corporate ti contatterà entro 24 ore.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Nome Azienda / Ente"
                type="text"
                name="azienda"
                value={formData.azienda}
                onChange={handleInputChange}
                required
                placeholder="Es: Acme S.r.l."
              />
              <Input
                label="Nome Referente"
                type="text"
                name="referente"
                value={formData.referente}
                onChange={handleInputChange}
                required
                placeholder="Mario Rossi"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Email Aziendale"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="mario.rossi@azienda.com"
              />
              <Input
                label="Telefono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                placeholder="+39 333 1234567"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Tipo di Servizio
                </label>
                <select
                  name="servizio"
                  value={formData.servizio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-white bg-black text-white focus:outline-none focus:border-gray-400"
                >
                  <option value="">Seleziona</option>
                  <option value="aeroporti">Transfer Aeroportuali</option>
                  <option value="meeting">Meeting & Eventi</option>
                  <option value="executive">Trasporti Executive</option>
                  <option value="fiere">Fiere & Convention</option>
                  <option value="roadshow">Roadshow & Tour</option>
                  <option value="continuativo">Servizio Continuativo</option>
                  <option value="misto">Servizi Misti</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Frequenza Stimata
                </label>
                <select
                  name="frequenza"
                  value={formData.frequenza}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-white bg-black text-white focus:outline-none focus:border-gray-400"
                >
                  <option value="">Seleziona</option>
                  <option value="occasionale">Occasionale (1-2 volte/mese)</option>
                  <option value="regolare">Regolare (1-2 volte/settimana)</option>
                  <option value="frequente">Frequente (3+ volte/settimana)</option>
                  <option value="quotidiano">Quotidiano</option>
                  <option value="evento">Evento singolo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                Numero Passeggeri Medio
              </label>
              <select
                name="passeggeri"
                value={formData.passeggeri}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-white bg-black text-white focus:outline-none focus:border-gray-400"
              >
                <option value="">Seleziona</option>
                <option value="1-2">1-2 persone</option>
                <option value="3-4">3-4 persone</option>
                <option value="5-8">5-8 persone (Van)</option>
                <option value="multiple">Veicoli multipli</option>
                <option value="variabile">Variabile</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                Dettagli delle Vostre Esigenze
              </label>
              <Textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={5}
                required
                placeholder="Descrivi le esigenze specifiche della tua azienda: tratte più frequenti, orari preferenziali, esigenze particolari, budget orientativo, eventuali servizi aggiuntivi richiesti..."
                className="w-full px-4 py-3 border-2 border-white bg-black text-white focus:outline-none focus:border-gray-400"
              />
            </div>

            <GDPRDisclaimer checked={gdprConsent} onChange={setGdprConsent} />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!gdprConsent}
            >
              Richiedi Proposta Corporate
            </Button>

            <p className="text-sm text-gray-400 text-center">
              Il nostro team corporate ti contatterà entro 24 ore lavorative per discutere 
              una soluzione personalizzata per la tua azienda.
            </p>
          </form>
        </div>
      </SectionWrapper>

      {/* CTA Contatti */}
      <SectionWrapper className="bg-white text-center">
        <h2 className="text-3xl font-bold mb-4 uppercase">Preferisci parlare direttamente?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Contatta il nostro team corporate per una consulenza immediata
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="tel:+393384056027" variant="primary">
            Chiama Ora
          </Button>
          <Button href="mailto:lakecomoincar@gmail.com" variant="outline">
            Email Corporate
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
