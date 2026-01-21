import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteNotification } from '@/src/lib/email';
import { createQuote } from '@/src/lib/db/quotes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validazione base dei dati
    if (!body.customerName || !body.customerEmail || !body.customerPhone || !body.origin || !body.destination) {
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
      serviceTime: body.serviceTime || body.oraPartenza,
      passengers: body.passengers || body.passeggeri,
      notes: body.notes || body.note,
      language: body.language || 'it',
    };

    // Prepara i dati per il database
    const dbData = {
      customer_name: emailData.customerName,
      customer_email: emailData.customerEmail,
      customer_phone: emailData.customerPhone,
      origin: emailData.origin,
      destination: emailData.destination,
      route_description: `${emailData.origin} → ${emailData.destination}`,
      service_date: emailData.serviceDate,
      service_time: emailData.serviceTime,
      passengers: emailData.passengers,
      notes: emailData.notes,
      language: emailData.language,
      privacy_consent: true,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
    };

    // Salva nel database
    const { data: quote, error: dbError } = await createQuote(dbData);
    
    if (dbError) {
      console.error('❌ Errore salvataggio database:', dbError);
      // Continua comunque con l'invio email anche se il DB fallisce
    }

    // Invia le email (admin + cliente)
    try {
      await sendQuoteNotification(emailData);
    } catch (emailError) {
      console.error('❌ Errore invio email:', emailError);
      // Se l'email fallisce ma il DB ha salvato, comunque considera successo
      if (quote) {
        return NextResponse.json(
          { 
            success: true,
            quoteId: quote.id,
            message: 'Richiesta salvata. Email in ritardo, ti contatteremo presto.',
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
        quoteId: quote?.id,
        message: 'Richiesta preventivo inviata con successo. Riceverai una conferma via email.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Errore API quotes:', error);
    return NextResponse.json(
      { 
        error: 'Errore durante l\'invio della richiesta. Riprova più tardi o contattaci direttamente.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET - Recupera i preventivi (solo per admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // TODO: Aggiungere verifica autenticazione admin
    // const session = await getServerSession();
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { getQuotes } = await import('@/src/lib/db/quotes');
    const { data, error, count } = await getQuotes({
      status,
      limit,
      offset,
    });

    if (error) throw error;

    return NextResponse.json(
      { 
        quotes: data,
        total: count,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Errore GET quotes:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero dei preventivi' },
      { status: 500 }
    );
  }
}
