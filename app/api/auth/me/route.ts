import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/src/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Leggi il cookie della sessione
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin_session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Non autenticato' },
        { status: 401 }
      );
    }

    // Decodifica la sessione (in produzione usa JWT)
    // Per ora, assumiamo che sessionId sia l'ID utente
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, role, is_active')
      .eq('id', sessionId)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Sessione non valida' },
        { status: 401 }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Accesso negato' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Errore durante la verifica' },
      { status: 500 }
    );
  }
}
