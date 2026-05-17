"use client";

import { useEffect, useState } from "react";

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
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    };

    loadJobs();
  }, []);

  const deleteJob = async (id: string) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    });

    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setJobs((prev) =>
      prev.map((job) =>
        job._id === id ? { ...job, status } : job
      )
    );
  };

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">🛠 Service Requests</h1>
            <p className="text-gray-600 mt-1">
              Manage and track all job requests
            </p>
          </div>

          <a
            href="/new"
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + New Job
          </a>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-3 mb-8">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 flex-1">
            🔍
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 outline-none"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3"
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border animate-pulse"
              >
                <div className="h-5 bg-gray-300 w-1/2 mb-3 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* TITLE ROW */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      📌 {job.title}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {job.description}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${statusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* META */}
                <div className="flex gap-4 text-sm text-gray-600 mt-4">
                  <span>📍 {job.location}</span>
                  <span>🏷 {job.category}</span>
                </div>

                {/* ACTION ROW */}
                <div className="flex justify-between items-center mt-5">
                  <select
                    value={job.status}
                    onChange={(e) =>
                      updateStatus(job._id, e.target.value)
                    }
                    className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <button
                    onClick={() => deleteJob(job._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}