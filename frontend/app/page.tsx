'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  location: string;
}

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error communicating with backend API:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700 border-green-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Closed":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // Fixed: Fallback empty array prevents crash, matching 'job.category' fixes sorting visibility
  const filteredJobs = (Array.isArray(jobs) ? jobs : []).filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-5xl mx-auto">

        {/* HEADER BLOCK */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">🛠 Service Requests</h1>
            <p className="text-gray-600 mt-1">
              Manage and track all homeowner job postings
            </p>
          </div>

          <Link
            href="/new"
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            + Post New Request
          </Link>
        </div>

        {/* CONTROLS: SEARCH + CATEGORY FILTER DROPDOWN */}
        <div className="flex gap-3 mb-8">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 flex-1 shadow-sm">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 outline-none bg-transparent"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm font-medium outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

        {/* SKELETON LOADING UI STATES */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border animate-pulse"
              >
                <div className="h-5 bg-gray-300 w-1/3 mb-3 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
                No matching service requests found.
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200"
                >
                  {/* SERVICE DATA CARD TOP LINE */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        📌 <Link 
                          href={`/jobs/${job._id}`} 
                          className="hover:underline text-blue-600 hover:text-blue-800 transition"
                        >
                          {job.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 mt-2 max-w-3xl line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border uppercase tracking-wider ${statusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  {/* BOTTOM INFO DATA LINE */}
                  <div className="flex gap-5 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">📍 {job.location}</span>
                    <span className="flex items-center gap-1">🏷️ {job.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}