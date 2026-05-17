'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Job {
  _id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
}

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);

        if (!res.ok) {
          setJob(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setJob(data);
      } catch (err) {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: 'DELETE',
    });

    router.push('/');
  };

  const handleStatusChange = async (newStatus: string) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    setJob((prev) =>
      prev ? { ...prev, status: newStatus } : null
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600">
        Job not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-xl mx-auto bg-white border rounded-2xl p-6 shadow-sm">

        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="text-sm text-gray-600 hover:text-black mb-4"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">
          {job.title}
        </h1>

        {/* Details */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Contact:</strong> {job.contactName} ({job.contactEmail})</p>
        </div>

        {/* Status */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-medium">Status:</span>

          <select
            value={job.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border px-3 py-1 rounded bg-white text-gray-900"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="mt-6 text-red-600 font-semibold hover:text-red-800"
        >
          Delete
        </button>

      </div>
    </main>
  );
}