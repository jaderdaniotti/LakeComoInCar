import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://lakecomoincar.com';
  const localePrefix = locale === 'it' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePrefix}/cookie`;

  const title = locale === 'it'
    ? "Cookie Policy | Informativa Cookie | Autoservizi Pasquillo"
    : "Cookie Policy | LakeComoInCar";
  
  const description = locale === 'it'
    ? "Informativa sui cookie utilizzati da Autoservizi Pasquillo - LakeComoInCar. Scopri quali cookie utilizziamo e come gestirli."
    : "Cookie Policy - LakeComoInCar. Information about cookies used on our website.";

  return {
    title,
    description,
    keywords: locale === 'it'
      ? ['cookie policy', 'informativa cookie', 'cookie sito web', 'gestione cookie', 'autoservizi pasquillo cookie']
      : [],
    alternates: {
      canonical: url,
      languages: {
        'it': `${baseUrl}/cookie`,
        'en': `${baseUrl}/en/cookie`,
        'fr': `${baseUrl}/fr/cookie`,
        'es': `${baseUrl}/es/cookie`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'LakeComoInCar - Autoservizi Pasquillo',
      locale: locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

type CookiePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CookiePage({ params }: CookiePageProps) {
  const { locale } = await params;
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
            
            {/* Introduzione */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Cosa sono i Cookie
              </h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo 
                (computer, tablet, smartphone) quando visiti un sito web. Vengono utilizzati per 
                migliorare l'esperienza di navigazione, ricordare le preferenze e analizzare il 
                traffico del sito.
              </p>
              <p className="mt-4">
                Questo sito utilizza cookie per garantire il corretto funzionamento delle sue 
                funzionalità e per migliorare la tua esperienza di navigazione.
              </p>
            </section>

            {/* Titolare */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Titolare del Trattamento
              </h2>
              <p>
                Il titolare del trattamento è <strong>Autoservizi Pasquillo SRL</strong> 
                (LakeComoInCar)<br />
                P.IVA: 04193150135<br />
                Sede: Como, Lombardia, Italia<br />
                Email: <a href="mailto:lakecomoincar@gmail.com" className="text-black underline hover:text-gray-600">lakecomoincar@gmail.com</a><br />
                Tel: <a href="tel:+393384056027" className="text-black underline hover:text-gray-600">+39 338 405 6027</a>
              </p>
            </section>

            {/* Tipologie di Cookie */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Tipologie di Cookie Utilizzati
              </h2>
              
              <div className="space-y-6">
                {/* Cookie Tecnici */}
                <div className="border-l-4 border-black pl-4">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    1. Cookie Tecnici (Necessari)
                  </h3>
                  <p className="mb-2">
                    Questi cookie sono essenziali per il funzionamento del sito e non possono 
                    essere disattivati. Non richiedono il consenso dell'utente.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Cookie di sessione:</strong> Mantengono la sessione attiva durante la navigazione</li>
                    <li><strong>Cookie di sicurezza:</strong> Proteggono da accessi non autorizzati</li>
                    <li><strong>Cookie di preferenze:</strong> Memorizzano scelte linguistiche e preferenze utente</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <strong>Durata:</strong> Sessione o fino a 1 anno<br />
                    <strong>Base giuridica:</strong> Legittimo interesse (art. 6 par. 1 lett. f GDPR)
                  </p>
                </div>

                {/* Cookie di Funzionalità */}
                <div className="border-l-4 border-gray-400 pl-4">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    2. Cookie di Funzionalità
                  </h3>
                  <p className="mb-2">
                    Permettono al sito di ricordare le scelte effettuate dall'utente per 
                    fornire funzionalità avanzate e personalizzate.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Cookie consenso:</strong> Memorizzano le preferenze sui cookie</li>
                    <li><strong>Cookie lingua:</strong> Ricordano la lingua selezionata (IT/EN/FR/ES)</li>
                    <li><strong>Cookie form:</strong> Mantengono i dati inseriti nei moduli</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <strong>Durata:</strong> Da 30 giorni a 1 anno<br />
                    <strong>Base giuridica:</strong> Consenso dell'utente (art. 6 par. 1 lett. a GDPR)
                  </p>
                </div>

                {/* Cookie Analitici */}
                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    3. Cookie Analitici
                  </h3>
                  <p className="mb-2">
                    Raccolgono informazioni su come gli utenti utilizzano il sito, permettendoci 
                    di migliorare il servizio offerto.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Google Analytics:</strong> Analisi del traffico e comportamento utenti (se implementato)</li>
                    <li><strong>Vercel Analytics:</strong> Metriche di performance e utilizzo</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <strong>Durata:</strong> Da 1 giorno a 2 anni<br />
                    <strong>Base giuridica:</strong> Consenso dell'utente (art. 6 par. 1 lett. a GDPR)
                  </p>
                  <p className="mt-2 text-sm italic">
                    Nota: I dati raccolti sono anonimi e aggregati. Non permettono 
                    l'identificazione personale dell'utente.
                  </p>
                </div>

                {/* Cookie di Marketing */}
                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    4. Cookie di Marketing (Terze Parti)
                  </h3>
                  <p className="mb-2">
                    Utilizzati per mostrare annunci pubblicitari personalizzati e misurare 
                    l'efficacia delle campagne marketing.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Cookie social media:</strong> Pulsanti di condivisione (Facebook, Instagram)</li>
                    <li><strong>Cookie remarketing:</strong> Pubblicità personalizzata (se attivato)</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <strong>Durata:</strong> Fino a 2 anni<br />
                    <strong>Base giuridica:</strong> Consenso esplicito dell'utente
                  </p>
                </div>
              </div>
            </section>

            {/* Cookie di Terze Parti */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Cookie di Terze Parti
              </h2>
              <p className="mb-4">
                Il nostro sito può contenere collegamenti a servizi di terze parti che 
                utilizzano i propri cookie. Questi cookie sono gestiti direttamente dalle 
                terze parti e non sono sotto il nostro controllo.
              </p>
              
              <div className="bg-gray-50 p-6 border-2 border-black">
                <h3 className="text-xl font-bold mb-3 text-black">Servizi di Terze Parti:</h3>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-black">Google Maps:</strong> Visualizzazione mappe interattive<br />
                    <span className="text-sm">
                      Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://policies.google.com/privacy</a>
                    </span>
                  </li>
                  <li>
                    <strong className="text-black">Stripe:</strong> Elaborazione pagamenti (futuro)<br />
                    <span className="text-sm">
                      Privacy Policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://stripe.com/privacy</a>
                    </span>
                  </li>
                  <li>
                    <strong className="text-black">WhatsApp:</strong> Servizio messaggistica<br />
                    <span className="text-sm">
                      Privacy Policy: <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.whatsapp.com/legal/privacy-policy</a>
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Gestione Cookie */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Come Gestire i Cookie
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">1. Banner di Consenso</h3>
                  <p>
                    Al primo accesso al sito, ti verrà mostrato un banner per la gestione 
                    delle preferenze sui cookie. Puoi accettare tutti i cookie, rifiutare 
                    quelli non essenziali o personalizzare le tue scelte.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">2. Impostazioni Browser</h3>
                  <p className="mb-2">
                    Puoi gestire i cookie direttamente dalle impostazioni del tuo browser:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                    <li><strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie</li>
                    <li><strong>Safari:</strong> Preferenze → Privacy → Cookie e dati dei siti web</li>
                    <li><strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">3. Disattivare Cookie Specifici</h3>
                  <p className="mb-2">
                    Per disattivare cookie di servizi specifici:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <strong>Google Analytics:</strong>{' '}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Plugin di disattivazione
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-sm">
                    <strong>⚠️ Attenzione:</strong> La disattivazione di alcuni cookie potrebbe 
                    limitare la funzionalità del sito e impedire l'accesso a determinati servizi.
                  </p>
                </div>
              </div>
            </section>

            {/* Diritti Utente */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                I Tuoi Diritti
              </h2>
              <p className="mb-4">
                In conformità al Regolamento UE 2016/679 (GDPR), hai diritto a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Richiedere informazioni sui cookie utilizzati</li>
                <li>Modificare le tue preferenze sui cookie in qualsiasi momento</li>
                <li>Revocare il consenso precedentemente espresso</li>
                <li>Richiedere la cancellazione dei dati raccolti tramite cookie</li>
                <li>Presentare reclamo all'Autorità Garante per la Protezione dei Dati Personali</li>
              </ul>
              <p className="mt-4">
                Per esercitare questi diritti o per maggiori informazioni, contatta:{' '}
                <a href="mailto:lakecomoincar@gmail.com" className="text-black underline hover:text-gray-600">
                  lakecomoincar@gmail.com
                </a>
              </p>
            </section>

            {/* Collegamenti Utili */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Collegamenti Utili
              </h2>
              <div className="space-y-2">
                <p>
                  <Link href="/privacy" className="text-black underline hover:text-gray-600 font-semibold">
                    → Privacy Policy
                  </Link>
                </p>
                <p>
                  <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-600">
                    → Garante per la Protezione dei Dati Personali
                  </a>
                </p>
                <p>
                  <a href="https://www.youronlinechoices.com/it/" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-600">
                    → Your Online Choices (opt-out pubblicità)
                  </a>
                </p>
              </div>
            </section>

            {/* Modifiche */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-black">
                Modifiche alla Cookie Policy
              </h2>
              <p>
                Questa Cookie Policy può essere aggiornata periodicamente per riflettere 
                modifiche nella normativa o nei servizi offerti. La versione aggiornata 
                sarà sempre disponibile su questa pagina con indicazione della data di 
                ultima modifica.
              </p>
            </section>

            {/* Footer */}
            <section className="border-t-2 border-gray-300 pt-6 mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-sm text-gray-500">
                  <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Versione:</strong> 1.0
                </p>
              </div>
            </section>

          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
