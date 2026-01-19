import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// GET - Singolo route
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: route, error } = await supabaseAdmin
      .from('routes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({ route }, { status: 200 });
  } catch (error) {
    console.error('Error fetching route:', error);
    return NextResponse.json(
      { error: 'Percorso non trovato' },
      { status: 404 }
    );
  }
}

// PUT - Aggiorna route
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data: route, error } = await supabaseAdmin
      .from('routes')
      .update({
        code: body.code,
        origin_it: body.origin_it,
        origin_en: body.origin_en || null,
        origin_fr: body.origin_fr || null,
        origin_es: body.origin_es || null,
        destination_it: body.destination_it,
        destination_en: body.destination_en || null,
        destination_fr: body.destination_fr || null,
        destination_es: body.destination_es || null,
        base_price: body.base_price,
        distance_km: body.distance_km || null,
        duration_minutes: body.duration_minutes || null,
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating route:', error);
      return NextResponse.json(
        { error: 'Errore durante l\'aggiornamento' },
        { status: 500 }
      );
    }

    return NextResponse.json({ route }, { status: 200 });
  } catch (error) {
    console.error('Error updating route:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento' },
      { status: 500 }
    );
  }
}

// DELETE - Elimina route
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabaseAdmin
      .from('routes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting route:', error);
      return NextResponse.json(
        { error: 'Errore durante l\'eliminazione' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Percorso eliminato con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting route:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione' },
      { status: 500 }
    );
  }
}
