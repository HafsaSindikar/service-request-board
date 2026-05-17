'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewJob() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    location: '',
    contactName: '',
    contactEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Submission failed');
        return;
      }

      router.push("/");
    } catch (err) {
      setError('Cannot connect to backend API server');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Create Service Request</h1>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <textarea className="border border-slate-200 p-3 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          
          <select className="border border-slate-200 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="category" value={form.category} onChange={handleChange}>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>

          <input className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="location" placeholder="Location (e.g. Glasgow)" value={form.location} onChange={handleChange} required />
          <input className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="contactName" placeholder="Your Name" value={form.contactName} onChange={handleChange} required />
          <input className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" type="email" name="contactEmail" placeholder="Your Email" value={form.contactEmail} onChange={handleChange} required />

          <button type="submit" className="bg-indigo-600 text-white p-3.5 rounded-lg font-bold hover:bg-indigo-700 transition shadow-sm mt-2">
            Submit Request
          </button>
        </form>
      </div>
    </main>
  );
}