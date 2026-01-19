import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e password sono obbligatorie' },
        { status: 400 }
      );
    }

    // Cerca utente nel database
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .eq('is_active', true)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Verifica password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Verifica che sia admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Accesso negato. Solo gli admin possono accedere.' },
        { status: 403 }
      );
    }

    // Aggiorna last_login
    await supabaseAdmin
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Crea sessione (puoi usare JWT o session storage)
    // Per semplicità, restituiamo i dati utente (in produzione usa JWT)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return NextResponse.json(
      { 
        success: true,
        user: userData,
        message: 'Login effettuato con successo'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Errore durante il login' },
      { status: 500 }
    );
  }
}
