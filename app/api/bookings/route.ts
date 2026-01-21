import { NextRequest, NextResponse } from 'next/server';
import { sendBookingNotification } from '@/src/lib/email';
import { createBooking } from '@/src/lib/db/bookings';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validazione base dei dati
    if (!body.customerName || !body.customerEmail || !body.customerPhone || 
        !body.origin || !body.destination || !body.serviceDate || !body.serviceTime) {
      return NextResponse.json(
        { error: 'Dati mancanti. Compila tutti i campi obbligatori.' },
        { status: 400 }
      );
    }

    // Estrai i dati dal body per email
    const emailData = {
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      origin: body.origin,
      destination: body.destination,
      serviceDate: body.serviceDate || body.data,
      serviceTime: body.serviceTime || body.ora,
      passengers: body.passengers || body.passeggeri || 1,
      vehicle: body.vehicle || body.veicolo,
      totalPrice: body.totalPrice || body.prezzoTotale,
      notes: body.notes || body.note,
      language: body.language || 'it',
    };

    // Prepara i dati per il database
    const dbData = {
      customer_name: emailData.customerName,
      customer_email: emailData.customerEmail,
      customer_phone: emailData.customerPhone,
      route_id: body.routeId || body.route_id,
      route_code: body.routeCode || body.route_code,
      route_description: `${emailData.origin} → ${emailData.destination}`,
      vehicle_code: emailData.vehicle,
      service_date: emailData.serviceDate,
      service_time: emailData.serviceTime,
      passengers: emailData.passengers,
      notes: emailData.notes,
      total_price: emailData.totalPrice,
      payment_method: body.paymentMethod || 'cash',
      language: emailData.language,
      privacy_consent: true,
      terms_accepted: true,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
    };

    // Salva nel database
    const { data: booking, error: dbError } = await createBooking(dbData);
    
    if (dbError) {
      console.error('❌ Errore salvataggio database:', dbError);
      // Continua comunque con l'invio email anche se il DB fallisce
    }

    // Invia le email (admin + cliente)
    try {
      await sendBookingNotification(emailData);
    } catch (emailError) {
      console.error('❌ Errore invio email:', emailError);
      // Se l'email fallisce ma il DB ha salvato, comunque considera successo
      if (booking) {
        return NextResponse.json(
          { 
            success: true,
            bookingId: booking.id,
            message: 'Prenotazione salvata. Email in ritardo, ti contatteremo presto.',
            warning: 'Email notification delayed'
          },
          { status: 200 }
        );
      }
      throw emailError; // Se entrambi falliscono, propaga l'errore
    }

    return NextResponse.json(
      { 
        success: true,
        bookingId: booking?.id,
        message: 'Prenotazione inviata con successo. Riceverai una conferma via email.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Errore API bookings:', error);
    return NextResponse.json(
      { 
        error: 'Errore durante l\'invio della prenotazione. Riprova più tardi o contattaci direttamente.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET - Recupera le prenotazioni (solo per admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // TODO: Aggiungere verifica autenticazione admin
    // const session = await getServerSession();
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { getBookings } = await import('@/src/lib/db/bookings');
    const { data, error, count } = await getBookings({
      status,
      limit,
      offset,
    });

    if (error) throw error;

    return NextResponse.json(
      { 
        bookings: data,
        total: count,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Errore GET bookings:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero delle prenotazioni' },
      { status: 500 }
    );
  }
}
