import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// GET - Lista routes
export async function GET() {
  try {
    const { data: routes, error } = await supabaseAdmin
      .from('routes')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ routes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json(
      { error: 'Errore durante il caricamento dei percorsi' },
      { status: 500 }
    );
  }
}

// POST - Crea route
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data: route, error } = await supabaseAdmin
      .from('routes')
      .insert({
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
        is_active: body.is_active ?? true,
        sort_order: body.sort_order || 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating route:', error);
      return NextResponse.json(
        { error: 'Errore durante la creazione del percorso' },
        { status: 500 }
      );
    }

    return NextResponse.json({ route }, { status: 201 });
  } catch (error) {
    console.error('Error creating route:', error);
    return NextResponse.json(
      { error: 'Errore durante la creazione del percorso' },
      { status: 500 }
    );
  }
}
