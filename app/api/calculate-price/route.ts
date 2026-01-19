import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { route_id, passengers, date, time } = body;

    if (!route_id || !passengers || !date || !time) {
      return NextResponse.json(
        { error: 'Parametri mancanti' },
        { status: 400 }
      );
    }

    // Carica la rotta
    const { data: route, error: routeError } = await supabaseAdmin
      .from('routes')
      .select('*')
      .eq('id', route_id)
      .eq('is_active', true)
      .single();

    if (routeError || !route) {
      return NextResponse.json(
        { error: 'Rotta non trovata' },
        { status: 404 }
      );
    }

    // Carica le pricing rules per questa rotta
    const { data: rules, error: rulesError } = await supabaseAdmin
      .from('pricing_rules')
      .select('*')
      .eq('route_id', route_id)
      .eq('is_active', true);

    if (rulesError) {
      console.error('Error loading pricing rules:', rulesError);
      return NextResponse.json(
        { price: route.base_price, applied_rule: null },
        { status: 200 }
      );
    }

    // Se non ci sono regole, usa il prezzo base
    if (!rules || rules.length === 0) {
      return NextResponse.json(
        { price: route.base_price, applied_rule: null },
        { status: 200 }
      );
    }

    // Trova la regola specifica della rotta
    const matchingRule = findMatchingRule(rules, {
      passengers: parseInt(passengers),
      date,
      time,
    });

    // Determina il prezzo base o specifico
    let finalPrice = matchingRule 
      ? parseFloat(matchingRule.price_value) 
      : route.base_price;
    
    const appliedRules: string[] = [];
    if (matchingRule) {
      appliedRules.push(matchingRule.rule_name);
    }

    // Carica e applica TUTTE le regole globali che corrispondono
    const { data: globalRules, error: globalRulesError } = await supabaseAdmin
      .from('global_pricing_rules')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (!globalRulesError && globalRules && globalRules.length > 0) {
      // Trova TUTTE le regole globali che si applicano
      const matchingGlobalRules = findAllMatchingRules(globalRules, {
        passengers: parseInt(passengers),
        date,
        time,
      });

      // Applica TUTTE le regole che corrispondono
      for (const globalRule of matchingGlobalRules) {
        if (globalRule.modifier_type === 'percentage') {
          finalPrice = finalPrice * (1 + parseFloat(globalRule.modifier_value) / 100);
        } else {
          finalPrice = finalPrice + parseFloat(globalRule.modifier_value);
        }
        appliedRules.push(globalRule.rule_name);
      }
    }

    return NextResponse.json(
      {
        price: Math.round(finalPrice * 100) / 100, // Arrotonda a 2 decimali
        applied_rules: appliedRules,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating price:', error);
    return NextResponse.json(
      { error: 'Errore durante il calcolo del prezzo' },
      { status: 500 }
    );
  }
}

// Helper per verificare se una regola corrisponde
function ruleMatches(
  rule: any,
  booking: { passengers: number; date: string; time: string }
): boolean {
  const conditions = rule.conditions;

  // Check passeggeri
  if (conditions.passengers_min && booking.passengers < conditions.passengers_min) {
    return false;
  }
  if (conditions.passengers_max && booking.passengers > conditions.passengers_max) {
    return false;
  }

  // Check periodo
  if (conditions.date_from && booking.date < conditions.date_from) {
    return false;
  }
  if (conditions.date_to && booking.date > conditions.date_to) {
    return false;
  }

  // Check giorno settimana (1 = Lunedì, 7 = Domenica)
  if (conditions.days_of_week && conditions.days_of_week.length > 0) {
    const dayOfWeek = new Date(booking.date).getDay();
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Converti domenica da 0 a 7
    if (!conditions.days_of_week.includes(adjustedDay)) {
      return false;
    }
  }

  // Check orario (gestisce orari notturni che attraversano la mezzanotte)
  if (conditions.time_from && conditions.time_to) {
    // Caso 1: Orario normale (es: 09:00-18:00)
    if (conditions.time_from < conditions.time_to) {
      if (booking.time < conditions.time_from || booking.time > conditions.time_to) {
        return false;
      }
    }
    // Caso 2: Orario notturno che attraversa la mezzanotte (es: 20:00-06:00)
    else if (conditions.time_from > conditions.time_to) {
      if (booking.time < conditions.time_from && booking.time > conditions.time_to) {
        return false;
      }
    }
  } else {
    // Se è specificato solo time_from o time_to (senza l'altro)
    if (conditions.time_from && booking.time < conditions.time_from) {
      return false;
    }
    if (conditions.time_to && booking.time > conditions.time_to) {
      return false;
    }
  }

  return true;
}

// Trova una singola regola (per le regole specifiche delle rotte)
function findMatchingRule(
  rules: any[],
  booking: { passengers: number; date: string; time: string }
): any | null {
  const matchingRules = rules.filter((rule) => ruleMatches(rule, booking));

  // Se ci sono più regole che corrispondono, prendi quella con più condizioni specificate
  if (matchingRules.length > 0) {
    return matchingRules.reduce((prev, current) => {
      const prevConditions = Object.keys(prev.conditions).length;
      const currentConditions = Object.keys(current.conditions).length;
      return currentConditions > prevConditions ? current : prev;
    });
  }

  return null;
}

// Trova TUTTE le regole che corrispondono (per le regole globali)
function findAllMatchingRules(
  rules: any[],
  booking: { passengers: number; date: string; time: string }
): any[] {
  return rules.filter((rule) => ruleMatches(rule, booking));
}
