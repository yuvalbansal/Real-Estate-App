'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, accountType }),
      });

      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Invalid credentials');
        return;
      }

      setSuccess('Logged In');

      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        if (accountType === 'buyer') {
          router.push('/buyer');
        } else if (accountType === 'builder') {
          router.push('/builder');
        } else if (accountType === 'individual') {
          router.push('/individual');
        }
      }, 1000);
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg border">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-full border p-2 rounded"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select type of account
          </option>
          <option value="buyer">Buyer</option>
          <option value="individual">Individual Owner</option>
          <option value="builder">Builder/Colonizer</option>
        </select>

        {loading && <p className="text-blue-500 text-sm">Logging in...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {"Don't have an account?"}{' '}
        <Link href="/signup" className="text-green-600 hover:underline">
          Create an account as buyer or seller
        </Link>
      </p>
    </div>
  );
}
