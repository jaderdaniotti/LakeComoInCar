'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'staff' as 'admin' | 'staff',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validazione
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non corrispondono');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Errore durante la registrazione');
        setLoading(false);
        return;
      }

      setSuccess('Utente creato con successo!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'staff',
      });

      // Callback opzionale
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err) {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-8 space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-black mb-2">
          Registra Nuovo Utente
        </h2>
        <p className="text-sm text-gray-600">
          Crea un nuovo account per accedere alla dashboard
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-2 border-green-500 p-4 text-green-700">
          {success}
        </div>
      )}

      <Input
        type="text"
        label="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        placeholder="Nome completo"
      />

      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        placeholder="email@example.com"
        autoComplete="email"
      />

      <Input
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        placeholder="Minimo 6 caratteri"
        autoComplete="new-password"
      />

      <Input
        type="password"
        label="Conferma Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        required
        placeholder="Ripeti la password"
        autoComplete="new-password"
      />

      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Ruolo <span className="text-black ml-1">*</span>
        </label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'staff' })}
          required
          className="w-full px-4 py-3 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Admin: accesso completo | Staff: accesso limitato
        </p>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Registrazione in corso...' : 'Registra Utente'}
      </Button>
    </form>
  );
}
