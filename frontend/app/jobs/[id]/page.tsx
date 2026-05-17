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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    if (!id) return;

    const loadJob = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/jobs/${id}`);

        if (!res.ok) {
          setJob(null);
          return;
        }

        const data = await res.json();
        setJob(data);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) return;

      router.push('/');
    } catch {
      alert("Delete failed");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) return;

      setJob((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    } catch {
      alert("Status update failed");
    }
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
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <button
            onClick={() => router.push('/')}
            className="text-sm text-slate-500 hover:text-indigo-600 transition mb-6 font-medium"
          >
            ← Back to dashboard
          </button>

          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            {job.title}
          </h1>

          <div className="space-y-4 text-slate-700">
            <p><span className="font-semibold text-slate-900">Description:</span> {job.description}</p>
            <p><span className="font-semibold text-slate-900">Category:</span> {job.category}</p>
            <p><span className="font-semibold text-slate-900">Location:</span> {job.location}</p>
            <p>
              <span className="font-semibold text-slate-900">Contact:</span>{" "}
              {job.contactName} <span className="text-slate-500">({job.contactEmail})</span>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">

            <div className="flex items-center gap-3">
              <span className="font-medium text-slate-900">Status:</span>

              <select
                value={job.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="border border-slate-200 px-3 py-1.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>
            </div>

            {isAuthenticated && (
              <button
                onClick={handleDelete}
                className="text-red-600 font-medium hover:text-red-800 cursor-pointer"
              >
                Delete
              </button>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}