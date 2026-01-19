import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// PUT - Aggiorna pricing rule
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data: rule, error } = await supabaseAdmin
      .from('pricing_rules')
      .update({
        rule_name: body.rule_name,
        rule_type: body.rule_type,
        conditions: body.conditions,
        price_type: body.price_type,
        price_value: body.price_value,
        price_modifier_type: body.price_type === 'modifier' ? 'percentage' : null,
        priority: body.priority,
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pricing rule:', error);
      return NextResponse.json(
        { error: 'Errore durante l\'aggiornamento' },
        { status: 500 }
      );
    }

    return NextResponse.json({ rule }, { status: 200 });
  } catch (error) {
    console.error('Error updating pricing rule:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento' },
      { status: 500 }
    );
  }
}

// DELETE - Elimina pricing rule
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabaseAdmin
      .from('pricing_rules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting pricing rule:', error);
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
    console.error('Error deleting pricing rule:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'eliminazione' },
      { status: 500 }
    );
  }
}
