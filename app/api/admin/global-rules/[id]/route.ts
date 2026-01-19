import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// GET - Singola global rule
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: rule, error } = await supabaseAdmin
      .from('global_pricing_rules')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({ rule }, { status: 200 });
  } catch (error) {
    console.error('Error fetching global rule:', error);
    return NextResponse.json(
      { error: 'Regola non trovata' },
      { status: 404 }
    );
  }
}

// PUT - Aggiorna global rule
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data: rule, error } = await supabaseAdmin
      .from('global_pricing_rules')
      .update({
        rule_name: body.rule_name,
        rule_type: body.rule_type,
        conditions: body.conditions,
        modifier_type: body.modifier_type,
        modifier_value: body.modifier_value,
        priority: body.priority,
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating global rule:', error);
      return NextResponse.json(
        { error: 'Errore durante l\'aggiornamento' },
        { status: 500 }
      );
    }

    return NextResponse.json({ rule }, { status: 200 });
  } catch (error) {
    console.error('Error updating global rule:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento' },
      { status: 500 }
    );
  }
}

// DELETE - Elimina global rule
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabaseAdmin
      .from('global_pricing_rules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting global rule:', error);
      return NextResponse.json(
        { error: 'Errore durante l\'eliminazione' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Regola eliminata con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting global rule:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione' },
      { status: 500 }
    );
  }
}
