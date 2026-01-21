import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById, updateQuote, deleteQuote } from '@/src/lib/db/quotes';

// GET - Recupera un singolo preventivo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Aggiungere verifica autenticazione admin
    const { id } = await params;
    const { data, error } = await getQuoteById(id);

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Preventivo non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json({ quote: data }, { status: 200 });
  } catch (error) {
    console.error('❌ Errore GET quote:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero del preventivo' },
      { status: 500 }
    );
  }
}

// PATCH - Aggiorna un preventivo
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
    if (body.quoted_price !== undefined) updates.quoted_price = body.quoted_price;
    if (body.quote_valid_until) updates.quote_valid_until = body.quote_valid_until;
    if (body.quote_notes !== undefined) updates.quote_notes = body.quote_notes;

    const { data, error } = await updateQuote(id, updates);

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Preventivo non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        quote: data,
        message: 'Preventivo aggiornato con successo'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Errore PATCH quote:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento del preventivo' },
      { status: 500 }
    );
  }
}

// DELETE - Elimina un preventivo (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Aggiungere verifica autenticazione admin
    const { id } = await params;
    const { data, error } = await deleteQuote(id);

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Preventivo non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Preventivo archiviato con successo'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Errore DELETE quote:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione del preventivo' },
      { status: 500 }
    );
  }
}
