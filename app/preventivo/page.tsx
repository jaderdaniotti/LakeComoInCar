'use client';

import { useState, FormEvent } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import images from '@/src/data/images';
import Image from 'next/image';

export default function PreventivoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [macchinaSelezionata, setMacchinaSelezionata] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    partenza: '',
    destinazione: '',
    data: '',
    oraPartenza: '',
    oraArrivo: '',
    passeggeri: '',
    note: '',
    nome: '',
    email: '',
    telefono: '',
  });

  const macchine = [
    { value: 'carbianca1', label: 'Car Bianca 1', src: images.carbianca1 },
    { value: 'carbianca2', label: 'Car Bianca 2', src: images.carbianca2 },
    { value: 'carbianca3', label: 'Car Bianca 3', src: images.carbianca3 },
    { value: 'carnera1', label: 'Car Nera 1', src: images.carnera1 },
    { value: 'carnera2', label: 'Car Nera 2', src: images.carnera2 },
    { value: 'carnera3', label: 'Car Nera 3', src: images.carnera3 },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // TODO: Integrazione backend
    // Qui verrà implementata l'integrazione con:
    // - Invio email con richiesta preventivo
    // - Salvataggio su database (Supabase/PostgreSQL)
    // - Notifica all'amministratore per elaborazione preventivo
    
    console.log('Richiesta preventivo:', formData);
    
    // Simulazione invio
    setIsSubmitted(true);
    
    // Reset form dopo 5 secondi (per demo)
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        partenza: '',
        destinazione: '',
        data: '',
        oraPartenza: '',
        oraArrivo: '',
        passeggeri: '',
        note: '',
        nome: '',
        email: '',
        telefono: '',
      });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <SectionWrapper className="bg-white min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-black">
            Richiesta Inviata
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Grazie per la tua richiesta di preventivo. L'abbiamo ricevuta e la stiamo elaborando.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Ti invieremo il preventivo personalizzato via email entro 24 ore lavorative. 
            Per richieste urgenti, ti contatteremo telefonicamente.
          </p>
          <Button href="/" variant="primary">
            Torna alla Home
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Richiedi Preventivo
          </h1>
          <p className="text-xl text-gray-300">
            Compila il form per richiedere un preventivo personalizzato per la tua tratta.
            Ti risponderemo entro 24 ore lavorative.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <FormWrapper
          title="Richiesta Preventivo Personalizzato"
          subtitle="Fornisci tutti i dettagli per ricevere un preventivo su misura"
          onSubmit={handleSubmit}
        >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {macchine.map((macchina) => (
              <div 
                onClick={() => setMacchinaSelezionata(macchina.value)}
                className={`flex flex-col items-center justify-center border-2 p-4 cursor-pointer transition-all duration-200 ${
                  macchinaSelezionata === macchina.value 
                    ? 'border-black bg-black text-white scale-105 shadow-lg transition-all translate-y-[-10px]'  
                    : 'border-gray-300 hover:border-black'
                }`}
                key={macchina.value}
              > 
                <Image src={macchina.src} alt={macchina.label} className="w-full h-full object-contain" />
                <p className={`text-sm mt-2 ${
                  macchinaSelezionata === macchina.value 
                    ? 'text-white' 
                    : 'text-gray-500'
                }`}>{macchina.label}</p>
              </div>
            ))}
          
          </div>
          {/* Dettagli Trasferimento */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black uppercase tracking-wider">
              Dettagli Trasferimento
            </h3>
            
            <Input
              type="text"
              name="partenza"
              label="Luogo di Partenza"
              value={formData.partenza}
              onChange={handleChange}
              required
              placeholder="Es: Hotel, indirizzo, aeroporto..."
            />

            <Input
              type="text"
              name="destinazione"
              label="Destinazione"
              value={formData.destinazione}
              onChange={handleChange}
              required
              placeholder="Es: Hotel, indirizzo, aeroporto..."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="date"
                name="data"
                label="Data"
                value={formData.data}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <Input
                type="time"
                name="oraPartenza"
                label="Ora Partenza"
                value={formData.oraPartenza}
                onChange={handleChange}
              />
              <Input
                type="time"
                name="oraArrivo"
                label="Ora Arrivo Prevista"
                value={formData.oraArrivo}
                onChange={handleChange}
              />
            </div>

            <Input
              type="number"
              name="passeggeri"
              label="Numero Passeggeri"
              value={formData.passeggeri}
              onChange={handleChange}
              required
              min="1"
              max="8"
            />

            <Textarea
              name="note"
              label="Note Aggiuntive"
              value={formData.note}
              onChange={handleChange}
              rows={4}
              placeholder="Eventuali richieste speciali, bagagli extra, soste intermedie..."
            />
          </div>

          {/* Dati Personali */}
          <div className="border-t-2 border-black pt-6">
            <h3 className="text-xl font-bold mb-6 text-black uppercase tracking-wider">
              Dati Personali
            </h3>
            <div className="space-y-6">
              <Input
                type="text"
                name="nome"
                label="Nome e Cognome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="telefono"
                label="Telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Info Preventivo */}
          <div className="bg-black text-white p-6">
            <p className="text-sm">
              <strong>Come funziona:</strong> Riceverai il preventivo personalizzato via email 
              entro 24 ore lavorative. Il preventivo includerà tutti i dettagli del servizio 
              e il prezzo finale. Potrai confermare la prenotazione rispondendo all'email o 
              contattandoci telefonicamente.
            </p>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Invia Richiesta Preventivo
          </Button>
        </FormWrapper>
      </SectionWrapper>
    </>
  );
}
