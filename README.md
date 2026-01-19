Progetto: Nuovo sito web “Lake Como in Car” + Sistema Prenotazioni e Preventivi
1) Contesto e motivazione

Lake Como in Car necessita di un nuovo sito web moderno, performante e di piena proprietà del cliente, in sostituzione dell’attuale soluzione gestita da terzi (Italiaonline) che ha generato criticità operative e reputazionali (inclusa perdita di dati/recensioni e incongruenze anagrafiche).
Il nuovo sito dovrà diventare il canale principale per:

presentare il servizio in modo professionale e chiaro,

acquisire richieste (prenotazioni standard e preventivi),

inviare notifiche immediate via email e WhatsApp,

centralizzare tutte le richieste in un pannello di controllo privato.

È già disponibile una bozza in Next.js:
https://como-lake-suite.vercel.app/

che verrà usata come base UI/UX e struttura iniziale.

2) Obiettivi funzionali (cosa deve permettere di fare il sito)

Il sito deve consentire a un visitatore di:

A) Navigare l’intero sito in 4 lingue

Italiano

Inglese

Francese

Spagnolo

Tutti i contenuti principali devono essere disponibili in tutte le lingue, incluse:

pagine e sezioni,

testi dei moduli,

messaggi di conferma,

email automatiche,

(se attivato) testo delle notifiche WhatsApp.

B) Prenotare corse standard (a tariffa predefinita)

Il visitatore deve poter selezionare una corsa “standard” (prezzi e tratte forniti dal cliente) e inviare la prenotazione tramite un modulo semplice e guidato.

C) Inviare una richiesta di preventivo personalizzato

Il visitatore deve poter compilare un modulo per tratte non standard o richieste particolari (es. multi-destinazione, esigenze specifiche).

D) Generare notifiche e registrazioni

Ogni prenotazione o richiesta preventivo deve:

generare una notifica email verso l’azienda,

generare una notifica WhatsApp verso l’azienda (vedi sezione integrazioni),

essere salvata in un pannello di controllo accessibile solo al cliente.

3) Requisiti di contenuto (aree geografiche e destinazioni)

Il sito dovrà includere in modo esplicito e ben visibile le destinazioni/aree servite, includendo:

Como / Lago di Como

Milano

Bergamo

Varese

Sondrio

Svizzera

Queste destinazioni devono comparire:

nei testi descrittivi dei servizi,

nelle sezioni SEO,

come opzioni selezionabili (ove pertinente) nei moduli di prenotazione/preventivo.

4) Requisiti SEO (indicizzazione e parole chiave)

L’ottimizzazione SEO è requisito centrale, con focus su parole chiave coerenti con il comportamento dei turisti, inclusa la keyword “taxi” oltre a “NCC”.

Keyword / Intent principali (da gestire nei contenuti)

“NCC Como”

“Taxi Como”

“Taxi Lake Como”

“Private transfer Como / Lake Como”

varianti per aeroporti/stazioni (se incluse nelle tratte standard)

Requisiti tecnici SEO

Struttura multilingua indicizzabile (URL per lingua, meta tag per lingua)

Titoli H1/H2 coerenti

Meta title/description per ogni lingua

Performance elevate (Core Web Vitals) e caricamento rapido

Schema base (opzionale) per LocalBusiness/Service (da valutare)

5) Moduli e flussi (prenotazioni e preventivi)
5.1 Prenotazioni corse standard

Scopo: prenotare tratte predefinite con prezzo definito.

Input richiesti (minimo consigliato)

Lingua corrente (automatica)

Nome e cognome

Email

Telefono (con prefisso internazionale)

Data e ora del servizio

Numero passeggeri

Scelta tratta (lista corsi standard)

Scelta veicolo (se previsto: es. berlina/van o flotta)

Note aggiuntive (opzionale)

Consenso privacy (obbligatorio)

Accettazione termini (se presenti, consigliato)

Pagamento / acconto

È richiesto un sistema di acconto per mitigare “no-show” o annullamenti:

Opzione 1: acconto fisso (es. 70€)

Opzione 2: acconto percentuale (es. 40%)

Regola operativa:

acconto online (pagamento digitale)

saldo rimanente eventualmente in contanti all’autista (se previsto dal cliente)

Nota: la parte “pagamento online” è un modulo separato (es. Stripe) e deve essere pianificata come fase dedicata se richiesta in release 1.

Output e post-invio

Dopo l’invio:

comparsa messaggio di conferma in lingua

invio email (conferma cliente + notifica admin)

invio WhatsApp (notifica admin)

salvataggio record in database e visibilità in dashboard

5.2 Richiesta preventivo personalizzato

Scopo: catturare richieste non prezzate a listino.

Input richiesti

Lingua corrente (automatica)

Nome e cognome

Email

Telefono

Tratta / descrizione richiesta (testo libero o da/ a + tappe)

Data indicativa (opzionale)

Passeggeri

Note / esigenze (bagagli, bambini, ecc.)

Consenso privacy

Output e post-invio

messaggio conferma in lingua

invio email (conferma cliente + notifica admin)

invio WhatsApp (notifica admin)

salvataggio record in database e visibilità in dashboard

6) Notifiche (Email + WhatsApp)
6.1 Email (obbligatorio in Release 1)

Il sistema deve inviare:

Email di conferma al cliente (opzionale ma consigliato)

Email di notifica all’azienda (obbligatorio)

Requisiti:

template email multilingua

oggetto chiaro e standardizzato (es. “Nuova prenotazione – [Tratta] – [Data]”)

recap completo dei dati inseriti

eventuale ID richiesta/prenotazione

6.2 WhatsApp (due modalità possibili)

Modalità A (professionale, automatica – consigliata): WhatsApp Business API

Invio automatico di messaggi al numero aziendale

Richiede provider (Twilio/Meta/360dialog), setup e costi per messaggio

Più stabile e scalabile

Modalità B (semplice, immediata – alternativa): Click-to-WhatsApp

Il sistema genera un link WhatsApp con testo precompilato

Notifica “manuale” (apertura chat) ma senza costi/approvazioni API

Ottima come fase iniziale se si vuole andare live rapidamente

Decisione da fissare a progetto: se WhatsApp deve essere “100% automatico” in Release 1, si usa Modalità A.

7) Pannello di controllo (Dashboard privata)
7.1 Accesso e sicurezza

Accesso riservato al cliente (Barbara/Domenico o account aziendale)

Login protetto (autenticazione con credenziali)

Nessun accesso pubblico ai dati

7.2 Funzionalità minime dashboard

Sezioni principali:

Prenotazioni standard

lista richieste

dettaglio richiesta

stato (Nuova / In lavorazione / Confermata / Completata / Annullata)

timestamp creazione

Preventivi

lista richieste

dettaglio richiesta

stato (Nuova / Risposta inviata / Confermata / Archiviata)

Archivio e filtri

filtro per data

filtro per stato

ricerca per nome/email/telefono

Log notifiche

evidenza invio email riuscito/non riuscito

evidenza invio WhatsApp (se API) o link generato (se click-to-wa)

7.3 Funzionalità opzionali evolutive

gestione listino corse standard (CRUD tratte, prezzi, veicoli)

gestione testi multilingua da pannello (richiede CMS o struttura dedicata)

esportazione CSV

analytics richieste (conteggi per mese)

8) Dati e struttura informativa (cosa va salvato)

Per ogni record prenotazione/preventivo, salvare almeno:

id

lingua (it/en/fr/es)

tipo (prenotazione_standard | preventivo)

nome/cognome

email

telefono

dettagli corsa (tratta, data/ora, passeggeri, veicolo, note)

stato

data creazione

esito notifiche (email/whatsapp)

eventuale importo acconto e stato pagamento (se attivo)

9) Requisiti tecnici e vincoli

Il sito deve essere sviluppato in codice (Next.js) per garantire:

performance

piena proprietà del cliente

flessibilità futura

Non deve dipendere da piattaforme vincolanti tipo builder “a canone” che limitano portabilità.

Design: moderno, pulito, “fresco/giovanile”, coerente con bozza attuale.

Accessibilità base: testi leggibili, CTA chiare, moduli semplici.

Mobile-first: il pubblico turistico usa molto smartphone.

10) Materiali necessari dal cliente (input obbligatori)

Per completare correttamente il progetto servono:

Listino corse standard

elenco tratte (da → a)

prezzi

eventuali regole (notturno, festivi, extra passeggeri)

elenco veicoli + capienza + eventuale prezzo differenziato

Regola acconto

fisso (es. 70€) o percentuale (es. 40%)

Credenziali dominio/hosting

recupero credenziali da Italiaonline

definizione gestione DNS e puntamento

Materiale fotografico

foto esterni veicoli

foto interni

eventuali foto team/servizio (se desiderate)

eventuali contenuti recuperabili dal vecchio sito

Canali ricezione notifiche

email aziendale definitiva

numero WhatsApp definitivo (e scelta modalità WhatsApp API vs link)

11) Pianificazione consigliata (release)

Per evitare blocchi e andare live in tempi rapidi:

Release 1 (go-live rapido)

Sito multilingua completo

Modulo prenotazione standard (senza pagamento o con acconto solo se già deciso e pronto)

Modulo preventivo

Email automatiche

Dashboard con liste e dettagli

WhatsApp: click-to-wa (se non si vuole attendere setup API)

Release 2 (potenziamento)

WhatsApp Business API automatica

gestione listino tratte da pannello

pagamenti acconto online (se richiesto)

miglioramenti SEO avanzati e landing dedicate

12) Criteri di accettazione (come si considera “finito”)

Il progetto è considerato completato quando:

Il sito è navigabile in IT/EN/FR/ES con contenuti coerenti

Prenotazione standard invia correttamente:

salvataggio in dashboard

email inviata

WhatsApp inviato (o link generato)

Preventivo invia correttamente:

salvataggio in dashboard

email inviata

WhatsApp inviato (o link generato)

La dashboard è accessibile solo al cliente e mostra tutte le richieste con filtri/stati

SEO base impostata per lingua (meta + struttura URL) e performance adeguate