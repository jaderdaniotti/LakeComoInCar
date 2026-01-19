import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/src/lib/supabase';
import LoginForm from '@/components/admin/LoginForm';

async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin_session')?.value;

    if (!sessionId) {
      return null;
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, role, is_active')
      .eq('id', sessionId)
      .eq('is_active', true)
      .single();

    if (error || !user || user.role !== 'admin') {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export default async function AdminPage() {
  const user = await getCurrentUser();

  // Se non è autenticato o non è admin, mostra il form di login
  if (!user) {
    return <LoginForm />;
  }

  // Se è autenticato e admin, reindirizza alla dashboard
  redirect('/admin/dashboard');
}
