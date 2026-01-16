import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';

export const metadata: Metadata = {
  title: 'Cookie Policy - Como Lake Car',
  description: 'Informativa sui cookie utilizzati dal sito web Como Lake Car.',
};

export default function CookiePage() {
  return (
    <>
      <SectionWrapper className="bg-black text-white pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-300">
            Informativa sull'utilizzo dei cookie
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                1. Cosa sono i Cookie
              </h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente 
                quando visita un sito web. I cookie permettono al sito di ricordare le azioni e le 
                preferenze dell'utente per un determinato periodo di tempo.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                2. Tipi di Cookie Utilizzati
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    Cookie Tecnici (Necessari)
                  </h3>
                  <p>
                    Questi cookie sono essenziali per il funzionamento del sito e non possono essere 
                    disattivati. Includono cookie di sessione e di sicurezza necessari per garantire 
                    il corretto funzionamento delle funzionalità del sito.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    Cookie di Prestazione
                  </h3>
                  <p>
                    Questi cookie raccolgono informazioni su come gli utenti utilizzano il sito web, 
                    come le pagine visitate più frequentemente. Questi dati vengono utilizzati per 
                    migliorare le prestazioni del sito.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    Cookie di Funzionalità
                  </h3>
                  <p>
                    Questi cookie permettono al sito di ricordare le scelte dell'utente (come lingua 
                    o regione) per fornire funzionalità migliorate e personalizzate.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                3. Cookie di Terze Parti
              </h2>
              <p>
                Il nostro sito può utilizzare servizi di terze parti che impostano cookie. Questi 
                includono:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Stripe:</strong> Per il processing dei pagamenti online. 
                  I cookie di Stripe sono necessari per completare le transazioni.
                </li>
                <li>
                  <strong>Google Analytics:</strong> Per analizzare il traffico del sito 
                  (se implementato in futuro, con consenso dell'utente).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                4. Gestione dei Cookie
              </h2>
              <p>
                È possibile gestire o eliminare i cookie attraverso le impostazioni del browser. 
                Tuttavia, la disattivazione di alcuni cookie potrebbe limitare la funzionalità del sito.
              </p>
              <p className="mt-4">
                Per maggiori informazioni su come gestire i cookie nei principali browser:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Safari</li>
                <li>Microsoft Edge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                5. Consenso
              </h2>
              <p>
                Continuando a navigare sul sito dopo la visualizzazione del banner informativo sui 
                cookie, l'utente accetta l'utilizzo dei cookie secondo quanto descritto in questa policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                6. Modifiche alla Cookie Policy
              </h2>
              <p>
                Questa cookie policy può essere aggiornata periodicamente. La versione aggiornata 
                sarà sempre disponibile su questa pagina.
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
