'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/');
      router.refresh();
    } catch {
      setError('Cannot connect to authorization server');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">Sign In</h1>
        <p className="text-sm text-slate-500 text-center mb-6">Access dashboard administration credentials</p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm font-medium text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="admin@globaltna.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white p-3.5 rounded-lg font-bold hover:bg-indigo-700 transition shadow-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-slate-500 hover:text-indigo-600 transition font-medium"
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
