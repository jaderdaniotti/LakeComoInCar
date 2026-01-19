import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

// GET - Lista global rules
export async function GET(request: NextRequest) {
  try {
    const { data: rules, error } = await supabaseAdmin
      .from('global_pricing_rules')
      .select('*')
      .order('priority', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ rules }, { status: 200 });
  } catch (error) {
    console.error('Error fetching global rules:', error);
    return NextResponse.json(
      { error: 'Errore durante il caricamento delle regole globali' },
      { status: 500 }
    );
  }
}

// POST - Crea global rule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data: rule, error } = await supabaseAdmin
      .from('global_pricing_rules')
      .insert({
        rule_name: body.rule_name,
        rule_type: body.rule_type,
        conditions: body.conditions,
        modifier_type: body.modifier_type,
        modifier_value: body.modifier_value,
        priority: body.priority,
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating global rule:', error);
      return NextResponse.json(
        { error: 'Errore durante la creazione della regola', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ rule }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating global rule:', error);
    return NextResponse.json(
      { error: 'Errore durante la creazione della regola', details: error.message },
      { status: 500 }
    );
  }
}
