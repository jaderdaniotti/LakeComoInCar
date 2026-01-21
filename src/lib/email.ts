import nodemailer from 'nodemailer';

// Configurazione transporter Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verifica connessione (opzionale, per debug)
transporter.verify(function (error: Error | null) {
  if (error) {
    console.error('❌ Errore configurazione email:', error);
  } else {
    console.log('✅ Server email pronto per inviare messaggi');
  }
});

// ==========================================
// TEMPLATE EMAIL HTML
// ==========================================

const emailStyles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 30px; border: 2px solid #000; }
    .info-row { margin: 15px 0; padding: 10px; background-color: #fff; border-left: 4px solid #000; }
    .label { font-weight: bold; color: #000; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; padding: 12px 30px; background-color: #000; color: #fff; text-decoration: none; margin: 20px 0; }
  </style>
`;

// ==========================================
// FUNZIONE: Invia Notifica Preventivo
// ==========================================

interface QuoteData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  serviceDate?: string;
  serviceTime?: string;
  passengers?: number;
  notes?: string;
  language?: string;
}

export async function sendQuoteNotification(data: QuoteData) {
  const {
    customerName,
    customerEmail,
    customerPhone,
    origin,
    destination,
    serviceDate,
    serviceTime,
    passengers,
    notes,
    language = 'it',
  } = data;

  // ===== EMAIL PER L'ADMIN (te) =====
  const adminSubject = '🔔 Nuova Richiesta Preventivo - LakeComoInCar';
  const adminHtml = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>📋 NUOVA RICHIESTA PREVENTIVO</h1>
      </div>
      <div class="content">
        <h2>Dettagli Cliente</h2>
        <div class="info-row">
          <span class="label">Nome:</span> ${customerName}
        </div>
        <div class="info-row">
          <span class="label">Email:</span> <a href="mailto:${customerEmail}">${customerEmail}</a>
        </div>
        <div class="info-row">
          <span class="label">Telefono:</span> <a href="tel:${customerPhone}">${customerPhone}</a>
        </div>
        
        <h2 style="margin-top: 30px;">Dettagli Servizio</h2>
        <div class="info-row">
          <span class="label">Partenza:</span> ${origin}
        </div>
        <div class="info-row">
          <span class="label">Destinazione:</span> ${destination}
        </div>
        ${serviceDate ? `<div class="info-row"><span class="label">Data:</span> ${serviceDate}</div>` : ''}
        ${serviceTime ? `<div class="info-row"><span class="label">Orario:</span> ${serviceTime}</div>` : ''}
        ${passengers ? `<div class="info-row"><span class="label">Passeggeri:</span> ${passengers}</div>` : ''}
        ${notes ? `<div class="info-row"><span class="label">Note:</span> ${notes}</div>` : ''}
        
        <div style="margin-top: 30px; padding: 15px; background-color: #fffacd; border: 2px solid #000;">
          <strong>⚡ Azione Richiesta:</strong><br>
          Rispondi al cliente entro 24 ore a: <a href="mailto:${customerEmail}">${customerEmail}</a><br>
          oppure chiama: <a href="tel:${customerPhone}">${customerPhone}</a>
        </div>
      </div>
      <div class="footer">
        <p>Questa è una notifica automatica dal sito LakeComoInCar</p>
        <p>Non rispondere a questa email</p>
      </div>
    </div>
  `;

  // ===== EMAIL DI CONFERMA PER IL CLIENTE =====
  const customerSubjects = {
    it: '✅ Richiesta Preventivo Ricevuta - LakeComoInCar',
    en: '✅ Quote Request Received - LakeComoInCar',
    fr: '✅ Demande de Devis Reçue - LakeComoInCar',
    es: '✅ Solicitud de Presupuesto Recibida - LakeComoInCar',
  };

  const customerMessages = {
    it: {
      greeting: `Ciao ${customerName},`,
      message: 'Grazie per aver richiesto un preventivo a LakeComoInCar!',
      confirmation: 'Abbiamo ricevuto la tua richiesta e ti risponderemo entro 24 ore con un preventivo personalizzato.',
      details: 'Dettagli della tua richiesta:',
      from: 'Da:',
      to: 'A:',
      date: 'Data:',
      time: 'Orario:',
      passengers: 'Passeggeri:',
      notes: 'Note:',
      contact: 'Nel frattempo, se hai domande urgenti, puoi contattarci:',
      phone: 'Telefono:',
      email: 'Email:',
      footer: 'Ti ringraziamo per la fiducia e non vediamo l\'ora di servirti!',
      team: 'Il Team di LakeComoInCar',
    },
    en: {
      greeting: `Hello ${customerName},`,
      message: 'Thank you for requesting a quote from LakeComoInCar!',
      confirmation: 'We have received your request and will respond within 24 hours with a personalized quote.',
      details: 'Your request details:',
      from: 'From:',
      to: 'To:',
      date: 'Date:',
      time: 'Time:',
      passengers: 'Passengers:',
      notes: 'Notes:',
      contact: 'In the meantime, if you have urgent questions, you can contact us:',
      phone: 'Phone:',
      email: 'Email:',
      footer: 'Thank you for your trust and we look forward to serving you!',
      team: 'The LakeComoInCar Team',
    },
    fr: {
      greeting: `Bonjour ${customerName},`,
      message: 'Merci d\'avoir demandé un devis à LakeComoInCar!',
      confirmation: 'Nous avons reçu votre demande et nous vous répondrons dans les 24 heures avec un devis personnalisé.',
      details: 'Détails de votre demande:',
      from: 'De:',
      to: 'À:',
      date: 'Date:',
      time: 'Heure:',
      passengers: 'Passagers:',
      notes: 'Notes:',
      contact: 'En attendant, si vous avez des questions urgentes, vous pouvez nous contacter:',
      phone: 'Téléphone:',
      email: 'Email:',
      footer: 'Merci pour votre confiance et nous avons hâte de vous servir!',
      team: 'L\'Équipe LakeComoInCar',
    },
    es: {
      greeting: `Hola ${customerName},`,
      message: '¡Gracias por solicitar un presupuesto a LakeComoInCar!',
      confirmation: 'Hemos recibido su solicitud y le responderemos en 24 horas con un presupuesto personalizado.',
      details: 'Detalles de su solicitud:',
      from: 'Desde:',
      to: 'Hasta:',
      date: 'Fecha:',
      time: 'Hora:',
      passengers: 'Pasajeros:',
      notes: 'Notas:',
      contact: 'Mientras tanto, si tiene preguntas urgentes, puede contactarnos:',
      phone: 'Teléfono:',
      email: 'Email:',
      footer: '¡Gracias por su confianza y esperamos poder servirle!',
      team: 'El Equipo de LakeComoInCar',
    },
  };

  const lang = (language as keyof typeof customerMessages) || 'it';
  const msg = customerMessages[lang];

  const customerHtml = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>LakeComoInCar</h1>
        <p>${msg.message}</p>
      </div>
      <div class="content">
        <h2>${msg.greeting}</h2>
        <p style="font-size: 16px; margin: 20px 0;">
          ${msg.confirmation}
        </p>
        
        <h3>${msg.details}</h3>
        <div class="info-row">
          <span class="label">${msg.from}</span> ${origin}
        </div>
        <div class="info-row">
          <span class="label">${msg.to}</span> ${destination}
        </div>
        ${serviceDate ? `<div class="info-row"><span class="label">${msg.date}</span> ${serviceDate}</div>` : ''}
        ${serviceTime ? `<div class="info-row"><span class="label">${msg.time}</span> ${serviceTime}</div>` : ''}
        ${passengers ? `<div class="info-row"><span class="label">${msg.passengers}</span> ${passengers}</div>` : ''}
        ${notes ? `<div class="info-row"><span class="label">${msg.notes}</span> ${notes}</div>` : ''}
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; text-align: center;">
          <p><strong>${msg.contact}</strong></p>
          <p>
            ${msg.phone} <a href="tel:+393384056027">+39 338 405 6027</a><br>
            ${msg.email} <a href="mailto:lakecomoincar@gmail.com">lakecomoincar@gmail.com</a>
          </p>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px;">
          ${msg.footer}
        </p>
        <p style="font-weight: bold; margin-top: 20px;">
          ${msg.team}
        </p>
      </div>
      <div class="footer">
        <p><strong>LakeComoInCar</strong> - Autoservizi Pasquillo SRL</p>
        <p>P.IVA: 04193150135</p>
        <p>Tel: +39 338 405 6027 | Email: lakecomoincar@gmail.com</p>
      </div>
    </div>
  `;

  try {
    // Invia email all'admin
    await transporter.sendMail({
      from: `"LakeComoInCar" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'lakecomoincar@gmail.com',
      subject: adminSubject,
      html: adminHtml,
    });
    console.log('✅ Email di notifica preventivo inviata a:', process.env.ADMIN_EMAIL);

    // Invia email di conferma al cliente
    await transporter.sendMail({
      from: `"LakeComoInCar" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: customerSubjects[lang],
      html: customerHtml,
    });
    console.log('✅ Email di conferma preventivo inviata a:', customerEmail);

    return { success: true };
  } catch (error) {
    console.error('❌ Errore invio email preventivo:', error);
    throw error;
  }
}

// ==========================================
// FUNZIONE: Invia Notifica Prenotazione
// ==========================================

interface BookingData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  serviceDate: string;
  serviceTime: string;
  passengers: number;
  vehicle?: string;
  totalPrice?: number;
  paymentType?: string;
  notes?: string;
  language?: string;
}

export async function sendBookingNotification(data: BookingData) {
  const {
    customerName,
    customerEmail,
    customerPhone,
    origin,
    destination,
    serviceDate,
    serviceTime,
    passengers,
    vehicle,
    totalPrice,
    paymentType,
    notes,
    language = 'it',
  } = data;

  // ===== EMAIL PER L'ADMIN (te) =====
  const adminSubject = '🚗 Nuova Prenotazione - LakeComoInCar';
  const adminHtml = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>🚗 NUOVA PRENOTAZIONE</h1>
      </div>
      <div class="content">
        <h2>Dettagli Cliente</h2>
        <div class="info-row">
          <span class="label">Nome:</span> ${customerName}
        </div>
        <div class="info-row">
          <span class="label">Email:</span> <a href="mailto:${customerEmail}">${customerEmail}</a>
        </div>
        <div class="info-row">
          <span class="label">Telefono:</span> <a href="tel:${customerPhone}">${customerPhone}</a>
        </div>
        
        <h2 style="margin-top: 30px;">Dettagli Servizio</h2>
        <div class="info-row">
          <span class="label">Partenza:</span> ${origin}
        </div>
        <div class="info-row">
          <span class="label">Destinazione:</span> ${destination}
        </div>
        <div class="info-row">
          <span class="label">Data:</span> ${serviceDate}
        </div>
        <div class="info-row">
          <span class="label">Orario:</span> ${serviceTime}
        </div>
        <div class="info-row">
          <span class="label">Passeggeri:</span> ${passengers}
        </div>
        ${vehicle ? `<div class="info-row"><span class="label">Veicolo:</span> ${vehicle}</div>` : ''}
        ${totalPrice ? `<div class="info-row"><span class="label">Prezzo Totale:</span> €${totalPrice.toFixed(2)}</div>` : ''}
        ${paymentType ? `<div class="info-row"><span class="label">Tipo Pagamento:</span> ${paymentType}</div>` : ''}
        ${notes ? `<div class="info-row"><span class="label">Note:<br> ${notes}</span> </div>` : ''}
        
        <div style="margin-top: 30px; padding: 15px; background-color: #d4edda; border: 2px solid #28a745;">
          <strong>⚡ Azione Richiesta:</strong><br>
          Conferma la prenotazione al cliente entro 2 ore<br>
          Contatto: <a href="mailto:${customerEmail}">${customerEmail}</a> o <a href="tel:${customerPhone}">${customerPhone}</a>
        </div>
      </div>
      <div class="footer">
        <p>Questa è una notifica automatica dal sito LakeComoInCar</p>
        <p>Non rispondere a questa email</p>
      </div>
    </div>
  `;

  // ===== EMAIL DI CONFERMA PER IL CLIENTE =====
  const customerSubjects = {
    it: '✅ Prenotazione Ricevuta - LakeComoInCar',
    en: '✅ Booking Received - LakeComoInCar',
    fr: '✅ Réservation Reçue - LakeComoInCar',
    es: '✅ Reserva Recibida - LakeComoInCar',
  };

  const customerMessages = {
    it: {
      greeting: `Ciao ${customerName},`,
      message: 'La tua prenotazione è stata ricevuta!',
      confirmation: 'Grazie per aver scelto LakeComoInCar. Confermeremo la tua prenotazione entro 2 ore.',
      details: 'Riepilogo della prenotazione:',
      from: 'Da:',
      to: 'A:',
      date: 'Data:',
      time: 'Orario:',
      passengers: 'Passeggeri:',
      vehicle: 'Veicolo:',
      price: 'Prezzo:',
      notes: 'Note:',
      contact: 'Per qualsiasi domanda, contattaci:',
      phone: 'Telefono:',
      email: 'Email:',
      footer: 'A presto!',
      team: 'Il Team di LakeComoInCar',
    },
    en: {
      greeting: `Hello ${customerName},`,
      message: 'Your booking has been received!',
      confirmation: 'Thank you for choosing LakeComoInCar. We will confirm your booking within 2 hours.',
      details: 'Booking summary:',
      from: 'From:',
      to: 'To:',
      date: 'Date:',
      time: 'Time:',
      passengers: 'Passengers:',
      vehicle: 'Vehicle:',
      price: 'Price:',
      notes: 'Notes:',
      contact: 'For any questions, contact us:',
      phone: 'Phone:',
      email: 'Email:',
      footer: 'See you soon!',
      team: 'The LakeComoInCar Team',
    },
    fr: {
      greeting: `Bonjour ${customerName},`,
      message: 'Votre réservation a été reçue!',
      confirmation: 'Merci d\'avoir choisi LakeComoInCar. Nous confirmerons votre réservation dans les 2 heures.',
      details: 'Résumé de la réservation:',
      from: 'De:',
      to: 'À:',
      date: 'Date:',
      time: 'Heure:',
      passengers: 'Passagers:',
      vehicle: 'Véhicule:',
      price: 'Prix:',
      notes: 'Notes:',
      contact: 'Pour toute question, contactez-nous:',
      phone: 'Téléphone:',
      email: 'Email:',
      footer: 'À bientôt!',
      team: 'L\'Équipe LakeComoInCar',
    },
    es: {
      greeting: `Hola ${customerName},`,
      message: '¡Su reserva ha sido recibida!',
      confirmation: 'Gracias por elegir LakeComoInCar. Confirmaremos su reserva en 2 horas.',
      details: 'Resumen de la reserva:',
      from: 'Desde:',
      to: 'Hasta:',
      date: 'Fecha:',
      time: 'Hora:',
      passengers: 'Pasajeros:',
      vehicle: 'Vehículo:',
      price: 'Precio:',
      notes: 'Notas:',
      contact: 'Para cualquier pregunta, contáctenos:',
      phone: 'Teléfono:',
      email: 'Email:',
      footer: '¡Hasta pronto!',
      team: 'El Equipo de LakeComoInCar',
    },
  };

  const lang = (language as keyof typeof customerMessages) || 'it';
  const msg = customerMessages[lang];

  const customerHtml = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>LakeComoInCar</h1>
        <p>${msg.message}</p>
      </div>
      <div class="content">
        <h2>${msg.greeting}</h2>
        <p style="font-size: 16px; margin: 20px 0;">
          ${msg.confirmation}
        </p>
        
        <h3>${msg.details}</h3>
        <div class="info-row">
          <span class="label">${msg.from}</span> ${origin}
        </div>
        <div class="info-row">
          <span class="label">${msg.to}</span> ${destination}
        </div>
        <div class="info-row">
          <span class="label">${msg.date}</span> ${serviceDate}
        </div>
        <div class="info-row">
          <span class="label">${msg.time}</span> ${serviceTime}
        </div>
        <div class="info-row">
          <span class="label">${msg.passengers}</span> ${passengers}
        </div>
        ${vehicle ? `<div class="info-row"><span class="label">${msg.vehicle}</span> ${vehicle}</div>` : ''}
        ${totalPrice ? `<div class="info-row"><span class="label">${msg.price}</span> €${totalPrice.toFixed(2)}</div>` : ''}
        
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; text-align: center;">
          <p><strong>${msg.contact}</strong></p>
          <p>
            ${msg.phone} <a href="tel:+393384056027">+39 338 405 6027</a><br>
            ${msg.email} <a href="mailto:lakecomoincar@gmail.com">lakecomoincar@gmail.com</a>
          </p>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px;">
          ${msg.footer}
        </p>
        <p style="font-weight: bold; margin-top: 20px;">
          ${msg.team}
        </p>
      </div>
      <div class="footer">
        <p><strong>LakeComoInCar</strong> - Autoservizi Pasquillo SRL</p>
        <p>P.IVA: 04193150135</p>
        <p>Tel: +39 338 405 6027 | Email: lakecomoincar@gmail.com</p>
      </div>
    </div>
  `;

  try {
    // Invia email all'admin
    await transporter.sendMail({
      from: `"LakeComoInCar" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'lakecomoincar@gmail.com',
      subject: adminSubject,
      html: adminHtml,
    });
    console.log('✅ Email di notifica prenotazione inviata a:', process.env.ADMIN_EMAIL);

    // Invia email di conferma al cliente
    await transporter.sendMail({
      from: `"LakeComoInCar" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: customerSubjects[lang],
      html: customerHtml,
    });
    console.log('✅ Email di conferma prenotazione inviata a:', customerEmail);

    return { success: true };
  } catch (error) {
    console.error('❌ Errore invio email prenotazione:', error);
    throw error;
  }
}
