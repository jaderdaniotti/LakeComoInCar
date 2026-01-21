import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBooking, deleteBooking } from '@/src/lib/db/bookings';

// GET - Recupera una singola prenotazione
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Aggiungere verifica autenticazione admin
    const { id } = await params;
    const { data, error } = await getBookingById(id);

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Prenotazione non trovata' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking: data }, { status: 200 });
  } catch (error) {
    console.error('❌ Errore GET booking:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero della prenotazione' },
      { status: 500 }
    );
  }
}

// PATCH - Aggiorna una prenotazione
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Aggiungere verifica autenticazione admin
    const { id } = await params;
    const body = await request.json();

    const updates: any = {};
    if (body.status) updates.status = body.status;
    if (body.payment_status) updates.payment_status = body.payment_status;
    if (body.total_price !== undefined) updates.total_price = body.total_price;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.cancelled_reason) updates.cancelled_reason = body.cancelled_reason;

    const { data, error } = await updateBooking(id, updates);

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Prenotazione non trovata' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        booking: data,
        message: 'Prenotazione aggiornata con successo'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Errore PATCH booking:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento della prenotazione' },
      { status: 500 }
    );
  }
}

// DELETE - Elimina una prenotazione (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Aggiungere verifica autenticazione admin
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const reason = searchParams.get('reason') || 'Deleted by admin';

    const { data, error } = await deleteBooking(id, reason);

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Prenotazione non trovata' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Prenotazione eliminata con successo'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Errore DELETE booking:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione della prenotazione' },
      { status: 500 }
    );
  }
}
