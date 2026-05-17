'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewJob() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: '',
  });

  // Fixed: Replaced 'any' with proper HTML change event type
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fixed: Replaced 'any' with proper HTML form submission event type
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      router.push("/");
    } catch (err) {
      console.error("Failed to submit job:", err);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Create Job</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="contactName" placeholder="Name" value={form.contactName} onChange={handleChange} />
        <input
          name="contactEmail"
          placeholder="Email"
          value={form.contactEmail}
          onChange={handleChange}
        />

        <button type="submit">Create</button>
      </form>
    </main>
  );
}