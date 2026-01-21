import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy - Como Lake Car',
  description: 'Informativa sulla privacy di Como Lake Car - Trattamento dei dati personali.',
};

export default function PrivacyPage() {
  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300">
            Informativa sul trattamento dei dati personali
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                1. Titolare del Trattamento
              </h2>
              <p>
                Il titolare del trattamento dei dati personali è Autoservizi Pasquillo SRL (Como Lake Car), 
                P.IVA 04193150135, con sede in Como, Lombardia, Italia.<br />
                Email: lakecomoincar@gmail.com | Tel: +39 338 405 6027
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                2. Dati Raccolti
              </h2>
              <p>
                Raccogliamo i seguenti dati personali:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nome e cognome</li>
                <li>Indirizzo email</li>
                <li>Numero di telefono</li>
                <li>Dettagli delle prenotazioni (date, orari, tratte)</li>
                <li>Dati di pagamento (gestiti tramite Stripe, non conservati sui nostri server)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                3. Finalità del Trattamento
              </h2>
              <p>
                I dati personali vengono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestione delle prenotazioni e dei servizi richiesti</li>
                <li>Comunicazione con il cliente per conferme e aggiornamenti</li>
                <li>Emissione di fatture e documenti fiscali</li>
                <li>Adempimento degli obblighi di legge</li>
                <li>Invio di comunicazioni commerciali (solo con consenso esplicito)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                4. Base Giuridica
              </h2>
              <p>
                Il trattamento dei dati si basa su:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Esecuzione di un contratto di servizio</li>
                <li>Consenso dell'interessato</li>
                <li>Adempimento di obblighi di legge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                5. Conservazione dei Dati
              </h2>
              <p>
                I dati personali vengono conservati per il tempo necessario alle finalità per cui 
                sono stati raccolti e in conformità agli obblighi di legge. I dati relativi alle 
                prenotazioni vengono conservati per 10 anni ai fini fiscali.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                6. Diritti dell'Interessato
              </h2>
              <p>
                In conformità al GDPR, l'interessato ha diritto a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accesso ai propri dati personali</li>
                <li>Rettifica dei dati inesatti</li>
                <li>Cancellazione dei dati ("diritto all'oblio")</li>
                <li>Limitazione del trattamento</li>
                <li>Portabilità dei dati</li>
                <li>Opposizione al trattamento</li>
                <li>Revoca del consenso</li>
              </ul>
              <p className="mt-4">
                Per esercitare questi diritti, contattare: lakecomoincar@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                7. Sicurezza dei Dati
              </h2>
              <p>
                Adottiamo misure tecniche e organizzative appropriate per proteggere i dati personali 
                da accesso non autorizzato, perdita, distruzione o alterazione.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                8. Modifiche alla Privacy Policy
              </h2>
              <p>
                Questa privacy policy può essere aggiornata periodicamente. La versione aggiornata 
                sarà sempre disponibile su questa pagina con indicazione della data di ultima modifica.
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-500 mt-8">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
              </p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
