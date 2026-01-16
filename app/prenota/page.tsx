'use client';

import { useState, FormEvent } from 'react';
import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';
import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

// Note: Metadata non può essere esportato da componenti client
// Verrà gestito tramite layout o head

const tratte = [
  { value: 'como-malpensa', label: 'Como - Aeroporto Malpensa' },
  { value: 'como-linate', label: 'Como - Aeroporto Linate' },
  { value: 'como-bergamo', label: 'Como - Aeroporto Bergamo' },
  { value: 'como-milano-centro', label: 'Como - Milano Centro' },
  { value: 'como-lugano', label: 'Como - Lugano' },
  { value: 'como-zurigo', label: 'Como - Zurigo' },
  { value: 'milano-centro-malpensa', label: 'Milano Centro - Malpensa' },
  { value: 'milano-centro-linate', label: 'Milano Centro - Linate' },
];

export default function PrenotaPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    tratta: '',
    data: '',
    ora: '',
    passeggeri: '',
    nome: '',
    email: '',
    telefono: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // TODO: Integrazione backend
    // Qui verrà implementata l'integrazione con:
    // - Invio email di conferma
    // - Salvataggio su database (Supabase/PostgreSQL)
    // - Integrazione Stripe per pagamento online
    
    console.log('Dati prenotazione:', formData);
    
    // Simulazione invio
    setIsSubmitted(true);
    
    // Reset form dopo 5 secondi (per demo)
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        tratta: '',
        data: '',
        ora: '',
        passeggeri: '',
        nome: '',
        email: '',
        telefono: '',
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            Prenotazione Inviata
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Grazie per la tua prenotazione. Ti abbiamo inviato una email di conferma con tutti i dettagli.
          </p>
          <p className="text-base text-gray-500 mb-8">
            <strong>Nota:</strong> Per completare la prenotazione, sarà necessario effettuare il pagamento online. 
            Riceverai un link per il pagamento via Stripe nella email di conferma.
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
            Prenota Online
          </h1>
          <p className="text-xl text-gray-300">
            Compila il form per prenotare una tratta standard. Riceverai conferma immediata via email.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <FormWrapper
          title="Prenotazione Trasferimento"
          subtitle="Compila tutti i campi per completare la prenotazione"
          onSubmit={handleSubmit}
        >
          {/* Tratta */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Tratta <span className="text-black ml-1">*</span>
            </label>
            <select
              name="tratta"
              value={formData.tratta}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
            >
              <option value="">Seleziona una tratta</option>
              {tratte.map((tratta) => (
                <option key={tratta.value} value={tratta.value}>
                  {tratta.label}
                </option>
              ))}
            </select>
          </div>

          {/* Data e Ora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              name="ora"
              label="Ora"
              value={formData.ora}
              onChange={handleChange}
              required
            />
          </div>

          {/* Numero Passeggeri */}
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

          {/* Riepilogo (mostrato solo se compilato) */}
          {formData.tratta && formData.data && (
            <div className="border-2 border-black p-6 bg-gray-50">
              <h3 className="text-lg font-bold mb-4 text-black uppercase">
                Riepilogo Prenotazione
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Tratta:</strong> {tratte.find(t => t.value === formData.tratta)?.label}</p>
                <p><strong>Data:</strong> {new Date(formData.data).toLocaleDateString('it-IT')}</p>
                <p><strong>Ora:</strong> {formData.ora}</p>
                <p><strong>Passeggeri:</strong> {formData.passeggeri}</p>
              </div>
            </div>
          )}

          {/* Note Pagamento */}
          <div className="bg-black text-white p-6">
            <p className="text-sm">
              <strong>Nota:</strong> Dopo l'invio, riceverai una email con il link per completare 
              il pagamento online tramite Stripe. La prenotazione sarà confermata solo dopo 
              il pagamento.
            </p>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Invia Prenotazione
          </Button>
        </FormWrapper>
      </SectionWrapper>
    </>
  );
}
