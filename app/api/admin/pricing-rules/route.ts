import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// GET - Lista pricing rules
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const routeId = searchParams.get('route_id');

    let query = supabaseAdmin
      .from('pricing_rules')
      .select('*')
      .order('priority', { ascending: false });

    if (routeId) {
      query = query.eq('route_id', routeId);
    }

    const { data: rules, error } = await query;

    if (error) throw error;

    return NextResponse.json({ rules }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pricing rules:', error);
    return NextResponse.json(
      { error: 'Errore durante il caricamento delle regole' },
      { status: 500 }
    );
  }
}

// POST - Crea pricing rule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Creating pricing rule:', body); // Debug

    const { data: rule, error } = await supabaseAdmin
      .from('pricing_rules')
      .insert({
        route_id: body.route_id,
        rule_name: body.rule_name,
        rule_type: body.rule_type,
        conditions: body.conditions,
        price_type: body.price_type,
        price_value: body.price_value,
        price_modifier_type: body.price_type === 'modifier' ? 'percentage' : null,
        priority: body.priority,
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating pricing rule:', error);
      return NextResponse.json(
        { error: 'Errore durante la creazione della regola', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ rule }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating pricing rule:', error);
    return NextResponse.json(
      { error: 'Errore durante la creazione della regola', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Elimina tutte le pricing rules di una rotta
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const routeId = searchParams.get('route_id');

    if (!routeId) {
      return NextResponse.json(
        { error: 'route_id è obbligatorio' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('pricing_rules')
      .delete()
      .eq('route_id', routeId);

    if (error) {
      console.error('Error deleting pricing rules:', error);
      return NextResponse.json(
        { error: 'Errore durante l\'eliminazione delle regole' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Regole eliminate con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting pricing rules:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione delle regole' },
      { status: 500 }
    );
  }
}
