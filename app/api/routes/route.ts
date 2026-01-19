import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// GET - Lista rotte pubbliche (solo attive)
export async function GET(request: NextRequest) {
  try {
    const { data: routes, error } = await supabaseAdmin
      .from('routes')
      .select('id, code, origin_it, origin_en, origin_fr, origin_es, destination_it, destination_en, destination_fr, destination_es, base_price, distance_km, duration_minutes')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ routes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json(
      { error: 'Errore durante il caricamento delle rotte' },
      { status: 500 }
    );
  }
}
