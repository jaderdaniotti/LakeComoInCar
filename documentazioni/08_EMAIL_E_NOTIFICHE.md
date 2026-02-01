# Email e notifiche – Nodemailer (Gmail)

Processo per replicare l’invio email del progetto: notifiche admin e conferma cliente su prenotazione e preventivo, con Nodemailer e Gmail.

---

## 1. Panoramica

| Elemento | Dove | Ruolo |
|----------|------|--------|
| Configurazione | `src/lib/email.ts` | Transporter Nodemailer (Gmail), template HTML |
| Funzioni invio | `sendBookingNotification`, `sendQuoteNotification` | Notifica admin + email cliente |
| Chiamate | API Route `app/api/bookings/route.ts`, `app/api/quotes/route.ts` | Dopo salvataggio DB, prima di rispondere al client |
| Variabili | `.env` | GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL, COMPANY_* |

---

## 2. Dipendenze

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

---

## 3. Variabili d’ambiente

- **GMAIL_USER**: indirizzo Gmail (es. `tuo@gmail.com`).
- **GMAIL_APP_PASSWORD**: “Password per le app” generata da Google (Account → Sicurezza → Verifica in 2 passaggi → Password per le app). Non usare la password normale.
- **ADMIN_EMAIL**: email che riceve le notifiche (può essere uguale a GMAIL_USER o altro).
- **COMPANY_NAME**, **COMPANY_PHONE**, **COMPANY_EMAIL**: usati nei template (footer, firma).

---

## 4. Transporter – `src/lib/email.ts`

```ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify(function (error: Error | null) {
  if (error) {
    console.error('Errore configurazione email:', error);
  } else {
    console.log('Server email pronto');
  }
});
```

Verifica che in produzione le variabili siano impostate; altrimenti `verify` fallirà a runtime.

---

## 5. Template HTML

Definisci uno stile base (es. `emailStyles`) con tag `<style>`: font, container, header, content, footer, bottoni. Poi per ogni tipo di email costruisci una stringa HTML che include:

- Header con titolo (es. “Nuova prenotazione” / “Conferma prenotazione”).
- Blocco “Dettagli cliente” (nome, email, telefono).
- Blocco “Dettagli servizio” (data, ora, tratta, veicolo, passeggeri, prezzo, note).
- Footer con COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL.

Usa variabili nel template (es. `${customerName}`, `${serviceDate}`) e sostituisci con i dati passati alla funzione.

---

## 6. Funzioni di invio

### 6.1 Notifica prenotazione

- **Admin**: oggetto tipo “Nuova Prenotazione - Nome Sito”, HTML con tutti i dati della prenotazione, destinatario `ADMIN_EMAIL`.
- **Cliente**: oggetto tipo “Conferma prenotazione - Nome Sito”, HTML con riepilogo e dati di contatto, destinatario `customerEmail`.

Parametri: almeno customerName, customerEmail, customerPhone, origin, destination, serviceDate, serviceTime, passengers, vehicle, totalPrice, notes, language. Stesso set usato dall’API bookings.

```ts
export async function sendBookingNotification(data: BookingEmailData) {
  const { customerName, customerEmail, ... } = data;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'Nuova Prenotazione - Nome Sito',
    html: adminHtml,
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: customerEmail,
    subject: 'Conferma prenotazione - Nome Sito',
    html: customerHtml,
  });
}
```

Gestisci errori con try/catch; se l’invio fallisce puoi loggare e/o ritornare un errore, ma in molti casi si preferisce comunque rispondere 200 al client se il DB è stato salvato e solo l’email è fallita (con messaggio “email in ritardo”).

### 6.2 Notifica preventivo

Stessa logica: email ad admin “Nuova richiesta preventivo” con tutti i campi del form preventivo; opzionale email al cliente “Richiesta ricevuta, ti contatteremo entro X ore”.

Parametri: customerName, customerEmail, customerPhone, origin, destination, serviceDate, serviceTime, passengers, notes, language.

---

## 7. Integrazione con le API

In `app/api/bookings/route.ts` dopo `createBooking`:

```ts
const { data: booking, error: dbError } = await createBooking(dbData);

if (dbError) {
  return NextResponse.json({ error: '...' }, { status: 500 });
}

try {
  await sendBookingNotification({
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    // ... tutti i campi per il template
  });
} catch (emailError) {
  console.error('Email error:', emailError);
  // Opzionale: ritorna comunque 200 con messaggio “prenotazione salvata, email in ritardo”
}

return NextResponse.json({ success: true, bookingId: booking?.id }, { status: 200 });
```

Stesso pattern in `app/api/quotes/route.ts` con `sendQuoteNotification`.

---

## 8. Lingua e template

Se i template sono multilingua, passa `language` alla funzione e scegli soggetto/testo in base a `language` (es. oggetto e corpo in italiano o inglese). Puoi avere stringhe per it/en/fr/es nello stesso file o in un oggetto di messaggi.

---

## 9. Checklist email

- [ ] Nodemailer installato, transporter configurato con Gmail (GMAIL_USER, GMAIL_APP_PASSWORD).
- [ ] Variabili ADMIN_EMAIL, COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL in `.env`.
- [ ] Template HTML per notifica admin prenotazione e per conferma cliente prenotazione.
- [ ] Template per notifica admin preventivo (e opzionale conferma cliente preventivo).
- [ ] Funzioni `sendBookingNotification` e `sendQuoteNotification` esportate e chiamate dalle API dopo il salvataggio DB.
- [ ] Gestione errori: log e risposta client coerente (es. 200 con messaggio “email in ritardo” se solo l’email fallisce).

Seguendo questo processo le email saranno allineate al progetto di riferimento e riutilizzabili nei prossimi progetti.
