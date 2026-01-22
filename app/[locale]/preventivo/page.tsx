"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/layout/SectionWrapper";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import GDPRDisclaimer from "@/components/ui/GDPRDisclaimer";
import { CheckCircle } from "lucide-react";
import images from "@/src/data/images";
import Image from "next/image";

export default function PreventivoPage() {
  const t = useTranslations('quote');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [macchinaSelezionata, setMacchinaSelezionata] = useState<string | null>(
    null
  );
  const [gdprConsent, setGdprConsent] = useState(false);
  const [formData, setFormData] = useState({
    partenza: "",
    destinazione: "",
    data: "",
    oraPartenza: "",
    oraArrivo: "",
    passeggeri: "",
    note: "",
    nome: "",
    email: "",
    telefono: "",
  });

  const macchine = [
    { value: 'Vclass2Matic', label: 'V-Class 2Matic', src: images.vclass },
    { value: 'VclassMatic', label: 'V-Class 4Matic', src: images.vclass },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepara i dati da inviare all'API
      const quoteData = {
        customerName: formData.nome,
        customerEmail: formData.email,
        customerPhone: formData.telefono,
        origin: formData.partenza,
        destination: formData.destinazione,
        serviceDate: formData.data,
        serviceTime: formData.oraPartenza,
        passengers: parseInt(formData.passeggeri),
        notes: `${formData.note || ''}${formData.oraArrivo ? `\nOra arrivo prevista: ${formData.oraArrivo}` : ''}`,
        vehicle: `${macchinaSelezionata} ? ${macchinaSelezionata} : ''`,
        language: 'it',
      };

      // Chiama l'API per inviare le email
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Errore durante l\'invio della richiesta');
      }

      // Successo! Mostra la pagina di conferma
      setIsSubmitted(true);
      
      // Reset form dopo 3 secondi
      setTimeout(() => {
        setFormData({
          partenza: "",
          destinazione: "",
          data: "",
          oraPartenza: "",
          oraArrivo: "",
          passeggeri: "",
          note: "",
          nome: "",
          email: "",
          telefono: "",
        });
        setMacchinaSelezionata(null);
        setGdprConsent(false);
      }, 3000);

    } catch (err) {
      console.error('Errore invio preventivo:', err);
      setError(err instanceof Error ? err.message : 'Errore durante l\'invio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
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
      <SectionWrapper className="bg-white min-h-screen pt-20 flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-black">
            {t('success.title')}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {t('success.message')}
          </p>
          <p className="text-base text-gray-500 mb-8">
            {t('success.details')}
          </p>
          <Button href="/" variant="primary">
            {t('success.backToHome')}
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl pt-20 mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-300">
            {t('hero.subtitle')}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <FormWrapper
          title={t('form.title')}
          subtitle={t('form.subtitle')}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {macchine.map((macchina) => (
              <div
                onClick={() => setMacchinaSelezionata(macchina.value)}
                className={`flex flex-col items-center justify-center border-2 p-4 cursor-pointer hover:shadow-lg hover:translate-y-[-5px] transition-all duration-200 overflow-hidden ${
                  macchinaSelezionata === macchina.value
                    ? " scale-105 shadow-lg transition-all translate-y-[-10px] hover:translate-y-[-10px]"
                    : "border-gray-300 hover:border-black"
                }`}
                key={macchina.value}
              >
                <Image
                  src={macchina.src}
                  alt={macchina.label}
                  className={`w-full h-full object-contain ${
                    macchinaSelezionata === macchina.value ? "partenza" : ""
                  }`}
                />
                <p
                  className="text-sm mt-2 text-gray-700"
                    
                >
                  {macchina.label}
                </p>
              </div>
            ))}
          </div>
          {/* Dettagli Trasferimento */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black uppercase tracking-wider">
              {t('form.transferDetails')}
            </h3>

            <Input
              type="text"
              name="partenza"
              label={t('form.departureLabel')}
              value={formData.partenza}
              onChange={handleChange}
              required
              placeholder={t('form.departurePlaceholder')}
            />

            <Input
              type="text"
              name="destinazione"
              label={t('form.destinationLabel')}
              value={formData.destinazione}
              onChange={handleChange}
              required
              placeholder={t('form.destinationPlaceholder')}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="date"
                name="data"
                label={t('form.dateLabel')}
                value={formData.data}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
              <Input
                type="time"
                name="oraPartenza"
                label={t('form.departureTimeLabel')}
                value={formData.oraPartenza}
                onChange={handleChange}
              />
              <Input
                type="time"
                name="oraArrivo"
                label={t('form.arrivalTimeLabel')}
                value={formData.oraArrivo}
                onChange={handleChange}
              />
            </div>

            <Input
              type="number"
              name="passeggeri"
              label={t('form.passengersLabel')}
              value={formData.passeggeri}
              onChange={handleChange}
              required
              min="1"
              max="8"
            />

            <Textarea
              name="note"
              label={t('form.notesLabel')}
              value={formData.note}
              onChange={handleChange}
              rows={4}
              placeholder={t('form.notesPlaceholder')}
            />
          </div>

          {/* Dati Personali */}
          <div className="border-t-2 border-black pt-6">
            <h3 className="text-xl font-bold mb-6 text-black uppercase tracking-wider">
              {t('form.personalData')}
            </h3>
            <div className="space-y-6">
              <Input
                type="text"
                name="nome"
                label={t('form.nameLabel')}
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label={t('form.emailLabel')}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="telefono"
                label={t('form.phoneLabel')}
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Info Preventivo */}
          <div className="bg-black text-white p-6">
            <p className="text-sm">
              <strong>Come funziona:</strong> {t('form.howItWorks')}
            </p>
          </div>

          {/* GDPR Disclaimer */}
          <GDPRDisclaimer 
            checked={gdprConsent}
            onChange={setGdprConsent}
          />

          {/* Messaggio di errore */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700">
              <p className="font-semibold">❌ {t('form.error')}</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-2">{t('form.errorContact')}</p>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={!gdprConsent || isSubmitting}
          >
            {isSubmitting ? t('form.submitting') : t('form.submit')}
          </Button>
        </FormWrapper>
      </SectionWrapper>
    </>
  );
}
