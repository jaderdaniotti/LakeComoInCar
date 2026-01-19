'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import RegisterForm from './RegisterForm';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Errore durante il login');
        setLoading(false);
        return;
      }

      // Salva sessione in cookie
      document.cookie = `admin_session=${data.user.id}; path=/; max-age=86400; SameSite=Lax`;

      // Ricarica la pagina per mostrare la dashboard
      router.refresh();
    } catch (err) {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Accedi o registra un nuovo utente per gestire prenotazioni e preventivi
          </p>
        </div>

        {/* Forms Container */}
        <div className="grid w-full max-w-2xl mx-auto gap-6">
          {/* Login Form */}
          <div className={showRegister ? 'hidden lg:block' : ''}>
            <form
              onSubmit={handleSubmit}
              className="bg-white border-2 border-black p-8 space-y-6 h-full"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Accedi
                </h2>
                <p className="text-sm text-gray-600">
                  Inserisci le tue credenziali per accedere
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700">
                  {error}
                </div>
              )}

              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@comolakecar.it"
                autoComplete="email"
              />

              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Accesso in corso...' : 'Accedi'}
              </Button>
            </form>
          </div>

          
        </div>

        <p className="text-center text-sm text-gray-500">
          {showRegister
            ? 'Crea un nuovo account per accedere alla dashboard'
            : 'Solo gli amministratori possono accedere a questa area'}
        </p>
      </div>
    </div>
  );
}
